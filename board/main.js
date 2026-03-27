/**
 * Kódem Board — Main init + board rendering
 */
let CARDS = {};
let DECKS = {};
const IMG_BASE = '/images/';
const SYNC_API = '';  // disabled — using Vercel static sync
let LAST_SYNC = null;

const ENERGY_MAP = {
  'Cháaktica': { emoji: '⚡', css: 'e-chaak', color: '#facc15' },
  'Chaaktica': { emoji: '⚡', css: 'e-chaak', color: '#facc15' },
  'Pírica': { emoji: '🔥', css: 'e-piric', color: '#ef4444' },
  'Pirica': { emoji: '🔥', css: 'e-piric', color: '#ef4444' },
  'Feral': { emoji: '🐾', css: 'e-feral', color: '#a855f7' },
  'Demótica': { emoji: '👻', css: 'e-demo', color: '#6b7280' },
  'Demotica': { emoji: '👻', css: 'e-demo', color: '#6b7280' },
  'Gélida': { emoji: '❄️', css: 'e-gelid', color: '#38bdf8' },
  'Gelida': { emoji: '❄️', css: 'e-gelid', color: '#38bdf8' },
  'Húumica': { emoji: '🌿', css: 'e-huumic', color: '#22c55e' },
  'Huumica': { emoji: '🌿', css: 'e-huumic', color: '#22c55e' },
  'Lítica': { emoji: '🪨', css: 'e-litic', color: '#d97706' },
  'Litica': { emoji: '🪨', css: 'e-litic', color: '#d97706' },
  'Átlica': { emoji: '💧', css: 'e-atlic', color: '#3b82f6' },
  'Atlica': { emoji: '💧', css: 'e-atlic', color: '#3b82f6' }
};
const TYPE_EMOJI = { 'Adendei':'🦎','Rava':'👑','Espectro':'👻','Protector':'🛡️','Ixim':'🌽','Rot':'🪨','Bio':'🌿','Equipo-Ixim':'🌽','Equipo-Rot':'🪨' };

/** Resolve energy string (including dual/triple like "Atlica-Litica") to primary ENERGY_MAP entry */
function resolveEnergy(energyStr) {
  if (!energyStr) return {};
  // Direct match first
  if (ENERGY_MAP[energyStr]) return ENERGY_MAP[energyStr];
  // Dual/triple: take first component
  const primary = energyStr.split('-')[0];
  return ENERGY_MAP[primary] || {};
}

async function init() {
  // ?reset=1 clears local state and reloads from server
  if (new URLSearchParams(location.search).has('reset')) {
    localStorage.removeItem('kodem_board_state');
    localStorage.removeItem('kodem-board-state');
    location.replace(location.pathname);
    return;
  }
  const cardsData = await fetch('cards.json?v=' + Date.now()).then(r => r.json());
  cardsData.forEach(c => CARDS[c.folio] = c);
  // Decks from localStorage only (user-built in constructor)
  const localDecks = localStorage.getItem('kodem_decks');
  if (localDecks) {
    try { DECKS = JSON.parse(localDecks); } catch(e) { DECKS = {}; }
  } else {
    DECKS = {};
  }
  // Always populate action buttons
  const bb = document.getElementById('bbActions');
  if (bb) {
    bb.innerHTML = `<button class="action-btn" onclick="location.href='../'" style="border-color:#6b7280;color:#6b7280">← Inicio</button>` +
      `<button class="action-btn sync" onclick="syncPush()">📋 Copiar</button>` +
      `<button class="action-btn sync" onclick="syncPull()">📎 Pegar</button>` +
      `<button class="action-btn" onclick="toggleViewMode()" style="border-color:#6b7280;color:#6b7280">📱/🖥️</button>` +
      `<button class="action-btn sync danger" onclick="resetGame()">🆕 Nueva</button>`;
  }
  if (loadState()) {
    renderInteractive();
    return;
  }
  // No saved game — try game-state.json, else show new game overlay
  try {
    const state = await fetch('game-state.json?t=' + Date.now()).then(r => r.json());
    if (state && state.alpha && state.beta) { initGame(state); return; }
  } catch(e) {}
  // Populate deck selects and show new game overlay
  populateDeckSelects();
  document.getElementById('newGameOverlay').classList.add('active');
}

function renderInteractive() {
  renderPhaseBar();
  renderTurnInfo();
  renderActionBar();
  renderBoard();
  renderTercia();
  renderLog();
  restoreOpenSections();
  repositionLog();
  renderMobileActions();
  checkGameOver();
}

function checkGameOver() {
  const a = GAME.alpha, b = GAME.beta;
  let winner = null, loser = null;
  if (a.extinction >= 10) { winner = b; loser = a; }
  else if (b.extinction >= 10) { winner = a; loser = b; }
  if (!winner) return;

  // Show victory overlay
  let overlay = document.getElementById('victoryOverlay');
  if (overlay) return; // already showing

  overlay = document.createElement('div');
  overlay.id = 'victoryOverlay';
  overlay.className = 'victory-overlay';
  overlay.innerHTML = `
    <div class="victory-modal">
      <div class="victory-trophy">🏆</div>
      <div class="victory-title">¡${winner.name} GANA!</div>
      <div class="victory-detail">${loser.name} alcanzó ${loser.extinction}/10 en Extinción</div>
      <div class="victory-turn">Turno ${GAME.turn}</div>
      <div class="victory-actions">
        <button class="action-btn sync danger" onclick="document.getElementById('victoryOverlay').remove()">📋 Ver tablero</button>
        <button class="action-btn next" onclick="document.getElementById('victoryOverlay').remove();resetGame()">🆕 Nueva partida</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  logAction(`🏆 ¡${winner.name} GANA! ${loser.name} tiene ${loser.extinction}/10 en Extinción — Turno ${GAME.turn}`);
}

function repositionLog() {
  const isDesktopMode = (localStorage.getItem('kodem_view_mode') === 'desktop');
  const isMobileLandscape = !isDesktopMode && window.matchMedia('(orientation: landscape) and (min-width: 600px)').matches;
  const logSidebar = document.querySelector('.log-sidebar');
  const ctrlPanel = document.querySelector('.ctrl-panel');
  const boardLayout = document.querySelector('.board-layout');
  if (!logSidebar || !ctrlPanel || !boardLayout) return;

  if (isMobileLandscape) {
    // Move log to bottom of ctrl-panel
    if (!ctrlPanel.contains(logSidebar)) {
      ctrlPanel.appendChild(logSidebar);
    }
  } else {
    // Restore log to board-layout
    if (!boardLayout.contains(logSidebar)) {
      boardLayout.appendChild(logSidebar);
    }
  }
}

function renderPhaseBar() {
  const bar = document.getElementById('phaseBar');
  const phases = [
    { id: 'previa', label: '🔮 Previa' },
    { id: 'batalla', label: '⚔️ Batalla' },
    { id: 'post', label: '📋 Post' },
    { id: 'equipo', label: '🛡️ Equipo' },
    { id: 'fin', label: '🏁 Fin' }
  ];
  const currentIdx = PHASES.indexOf(PHASE);
  bar.innerHTML = phases.map((p, i) => {
    const phaseIdx = PHASES.indexOf(p.id);
    let cls = '';
    if (p.id === PHASE) cls = 'active';
    else if (phaseIdx < currentIdx) cls = 'done';
    else cls = 'future';
    return `<button class="phase-btn ${cls}" onclick="goToPhase('${p.id}')">${p.label}</button>`;
  }).join('');

  // Update mobile bottom bar contextual buttons
  renderMobileActions();

  // Phase flash animation
  requestAnimationFrame(() => {
    const activeBtn = bar.querySelector('.phase-btn.active');
    if (activeBtn) {
      activeBtn.classList.add('just-activated');
      activeBtn.addEventListener('animationend', () => activeBtn.classList.remove('just-activated'), { once: true });
    }
  });
}

function renderMobileActions() {
  // ── Contextual buttons → center of bottom bar (#bbContext) ──
  const ctx = document.getElementById('bbContext');
  if (ctx) {
    let ch = '';
    if (PHASE === 'previa') {
      ch += `<button class="bb-ctx-btn" onclick="startRevealSelect('${TURN_PLAYER}')" style="border-color:#f59e0b;color:#f59e0b">👁️ Revelar</button>`;
      const tp = getPlayer(TURN_PLAYER);
      if (tp.bio && tp.bio.folio && !tp.bio.revealed) {
        ch += `<button class="bb-ctx-btn" onclick="revealBio('${TURN_PLAYER}')" style="border-color:#3b82f6;color:#3b82f6">🌿 Bio</button>`;
      }
    }
    if (PHASE === 'equipo' && typeof ATTACKED_THIS_TURN !== 'undefined' && ATTACKED_THIS_TURN && !HAS_EQUIPPED) {
      ch += `<button class="bb-ctx-btn" onclick="startEquip('${TURN_PLAYER}')" style="border-color:#22c55e;color:#22c55e">🔧 Equipar</button>`;
    }
    ctx.innerHTML = ch;
  }

  // ── Utility buttons → ⚡ menu (#bbActions) ──
  const bb = document.getElementById('bbActions');
  if (!bb) return;
  let html = '';
  html += `<button class="action-btn" onclick="location.href='../'" style="border-color:#6b7280;color:#6b7280">← Inicio</button>`;
  html += `<button class="action-btn sync" onclick="syncPush()">📋 Copiar</button>`;
  html += `<button class="action-btn sync" onclick="syncPull()">📎 Pegar</button>`;
  html += `<button class="action-btn" onclick="toggleViewMode()" style="border-color:#6b7280;color:#6b7280">📱/🖥️</button>`;
  html += `<button class="action-btn sync danger" onclick="resetGame()">🆕 Nueva</button>`;
  bb.innerHTML = html;
}

function renderTurnInfo() {
  const p = getPlayer(TURN_PLAYER);
  const a = GAME.alpha, b = GAME.beta;
  const phaseLabels = { previa: '🔮 Previa', batalla: '⚔️ Batalla', post: '📋 Post', equipo: '🛡️ Equipo', fin: '🏁 Fin' };
  const phaseIdx = PHASES.indexOf(PHASE) + 1;
  document.getElementById('turnInfo').innerHTML =
    `Turno <strong>${GAME.turn}</strong> — <span style="color:${p.color}">${p.emoji} ${p.name}</span> · ` +
    `<span style="color:#f59e0b">${phaseLabels[PHASE] || PHASE} (${phaseIdx}/5)</span>`;
}

function renderActionBar() {
  const bar = document.getElementById('actionBar');
  let html = '<div class="action-row">';
  if (ACTION_MODE === 'attack-target') {
    html += `<button class="action-btn cancel" onclick="clearSelection();renderInteractive()">✕ Cancelar</button>`;
    html += `<span style="color:#ef4444;font-size:0.75rem">⚔️ Selecciona carta rival para atacar</span>`;
  } else if (ACTION_MODE === 'equip-select') {
    html += `<button class="action-btn cancel" onclick="clearSelection();renderInteractive()">✕ Cancelar</button>`;
    html += `<span style="color:#22c55e;font-size:0.75rem">🛡️ Selecciona equipo</span>`;
  } else if (ACTION_MODE === 'vinculo-select') {
    html += `<button class="action-btn cancel" onclick="clearSelection();renderInteractive()">✕ Cancelar</button>`;
    html += `<span style="color:#a855f7;font-size:0.75rem">🔗 Selecciona Adendei disponible para Vínculo</span>`;
  } else if (ACTION_MODE === 'reveal-select') {
    html += `<button class="action-btn cancel" onclick="clearSelection();renderInteractive()">✕ Cancelar</button>`;
    html += `<span style="color:#f59e0b;font-size:0.75rem">👁️ Selecciona una carta oculta para revelar</span>`;
  } else if (ACTION_MODE !== 'tercia') {
    // ── Phase nav buttons (fixed) ──
    if (PHASES.indexOf(PHASE) > 0) {
      html += `<button class="action-btn prev" onclick="prevPhase()" title="Fase anterior">◀️ Fase</button>`;
    }
    html += `<button class="action-btn next" onclick="nextPhase()">▶️ Fase</button>`;
    html += `</div><div class="action-row">`;
    // ── Phase-specific action buttons (contextual) ──
    if (PHASE === 'previa') {
      const tp = getPlayer(TURN_PLAYER);
      const hiddenCards = tp.field.filter(c => c && c.folio && !c.revealed);
      if (hiddenCards.length > 0) {
        html += `<button class="action-btn" onclick="startRevealSelect('${TURN_PLAYER}')" style="background:#f59e0b;color:#000;font-weight:bold">👁️ Revelar Carta</button>`;
      }
      if (!BIO_SENT_THIS_TURN) {
        const bio = tp.bio;
        if (bio && bio.folio) {
          if (!bio.revealed) {
            html += `<button class="action-btn manual" onclick="revealBio('${TURN_PLAYER}')" style="background:#3b82f6;color:#fff">🌿 Revelar Bio</button>`;
          }
          html += `<button class="action-btn manual" onclick="sendBioToExtinction('${TURN_PLAYER}')">🌿 Bio→Ext</button>`;
        }
      }
    }
    if (PHASE === 'batalla') {
      if (!HAS_ATTACKED) {
        const tp = getPlayer(TURN_PLAYER);
        const availableAttackers = tp.field.filter(c => c && c.folio && c.revealed && (c.rests || 0) === 0 && (c.hp || 0) > 0);
        if (availableAttackers.length > 0) {
          html += `<span style="color:#ef4444;font-size:0.7rem;margin-right:4px">⚔️ Toca una carta tuya para atacar</span>`;
        } else {
          html += `<span style="color:#666;font-size:0.7rem;margin-right:4px">No hay cartas disponibles para atacar</span>`;
        }
      }
      if (!HAS_ATTACKED && !VINCULO_USED) {
        const prot = getPlayer(TURN_PLAYER).protector;
        if (prot && (prot.rests || 0) === 0 && (prot.hp || 0) > 0) {
          html += `<button class="action-btn manual" onclick="startVinculo('${TURN_PLAYER}')">🔗 Vínculo</button>`;
        }
      }
    }
    if (PHASE === 'equipo') {
      const p = getPlayer(TURN_PLAYER);
      if (ATTACKED_THIS_TURN && !HAS_EQUIPPED && p.equipZone && p.equipZone.length > 0) {
        html += `<button class="action-btn equip" onclick="startEquip('${TURN_PLAYER}')">🔧 Equipar</button>`;
      } else if (!ATTACKED_THIS_TURN) {
        html += `<span style="color:#666;font-size:0.7rem">Necesitas atacar primero para equipar</span>`;
      }
    }
  }
  html += `</div>`;
  bar.innerHTML = html;

  // Sync + view toggle: render into logTools (right panel bottom) in landscape, or into actionBar in portrait
  const syncHtml =
    `<button class="action-btn sync clip" onclick="syncPush()" title="Copiar estado">📋</button>` +
    `<button class="action-btn sync clip" onclick="syncPull()" title="Pegar estado">📎</button>` +
    `<button class="action-btn sync danger" onclick="resetGame()" title="Nueva partida">🆕</button>`;

  const isDesktopMode = (localStorage.getItem('kodem_view_mode') === 'desktop');
  const isLandscape = isDesktopMode || window.matchMedia('(orientation: landscape) and (min-width: 600px)').matches;
  const logTools = document.getElementById('logTools');
  const viewBtn = document.getElementById('view-toggle');

  if (isLandscape && logTools) {
    // Move sync + view toggle to bottom of right panel
    logTools.innerHTML = `<div class="action-row sync-row" style="justify-content:center;margin-top:6px">${syncHtml}</div>`;
    if (viewBtn) logTools.appendChild(viewBtn);
  } else {
    // Portrait: sync row stays in actionBar
    bar.innerHTML += `<div class="action-row sync-row">${syncHtml}</div>`;
    // Ensure view-toggle is back in ctrl-panel header
    const ctrlHeader = document.querySelector('.ctrl-panel > div:first-child');
    if (viewBtn && ctrlHeader && !ctrlHeader.contains(viewBtn)) {
      ctrlHeader.appendChild(viewBtn);
    }
  }
}

function renderBoard() {
  const board = document.getElementById('board');
  const isDesktopMode = (localStorage.getItem('kodem_view_mode') === 'desktop');
  if (isDesktopMode) {
    // Desktop: active player on bottom, rival on top
    const rival = TURN_PLAYER === 'alpha' ? 'beta' : 'alpha';
    board.innerHTML = renderPlayerSide(rival, 'top') + '<div class="divider"></div>' + renderPlayerSide(TURN_PLAYER, 'bottom');
  } else {
    // Mobile: alpha always on top, beta always on bottom
    board.innerHTML = renderPlayerSide('alpha', 'top') + '<div class="divider"></div>' + renderPlayerSide('beta', 'bottom');
  }
}

function renderPlayerSide(side, position) {
  const p = getPlayer(side);
  const isActive = side === TURN_PLAYER;
  let html = `<div class="player-side ${isActive ? 'active-turn' : ''}">`;

  const headerHtml = `<div class="player-header">
    <span class="player-name" style="color:${p.color}">${p.emoji} ${p.name} — ${p.deck}</span>
    <span class="ext-count">💀 ${p.extinction}/10</span></div>`;

  // Build auxiliary zones (Equipo, Bio, Extinción, Mazo)
  let auxZones = buildAuxZones(p, side);

  // Top player: header → aux → field
  // Bottom player: field → aux → header
  if (position === 'top') {
    html += headerHtml;
    html += auxZones;
  }

  html += '<div class="field-row">';

  // Field
  p.field.forEach((card, i) => {
    // Null-safe: treat null/undefined as empty slot
    if (!card) card = { pos: i + 1 };
    html += '<div class="card-slot">';
    if (!card.folio) html += `<div class="zone-label">Pos ${card.pos || i+1}</div>`;
    html += '<div class="equip-stack">';

    const isTarget = ACTION_MODE === 'attack-target' && side !== TURN_PLAYER;
    const isSelected = SELECTED && SELECTED.side === side && SELECTED.index === i;

    const isVinculo = ACTION_MODE === 'vinculo-select' && side === TURN_PLAYER;

    html += '<div class="card-wrapper">';
    if (!card.folio) {
      html += `<div class="card-frame empty-slot" onclick="requestReplacement('${side}',${i})"><div class="empty-slot-text">Vacío</div></div>`;
    } else if (card.revealed) {
      html += renderFieldCard([], card, i, side, isTarget, isSelected, isVinculo);
    } else {
      // Hidden cards — can be attacked (§5.2), targeted, or revealed
      const isRevealable = ACTION_MODE === 'reveal-select' && side === TURN_PLAYER && SELECTED && SELECTED.side === side;
      const tarClass = isTarget ? 'target-mode' : isRevealable ? 'target-mode reveal-glow' : '';
      const click = isTarget
        ? `resolveAttack('${side}', ${i})`
        : isRevealable
        ? `revealCard('${side}', ${i})`
        : `showCard('${card.folio}','hidden',${card.hp||6},${card.rests||0},'${side}',${i})`;
      const hiddenRestClass = card.rests >= 3 ? 'rest-3' : card.rests === 2 ? 'rest-2' : card.rests === 1 ? 'rest-1' : '';
      html += `<div class="card-frame hidden-card ${hiddenRestClass} ${tarClass}" onclick="${click}">`;
      html += '<span class="card-back">🎴</span>';
      if (isRevealable) html += '<div class="reveal-hint">👁️ Revelar</div>';
      // Rest dots on hidden cards
      if (card.rests > 0) html += '<div class="rest-dots">' + '<div class="rdot"></div>'.repeat(card.rests) + '</div>';
      // Marks on hidden cards (§7: placing a mark is NOT an effect — can target hidden cards)
      const hiddenMarks = [];
      if (card.burned) hiddenMarks.push('🔥');
      if (card.poisoned) hiddenMarks.push('☠️');
      if (card.abyssed) hiddenMarks.push('🌀');
      if (hiddenMarks.length > 0) {
        const mHtml = hiddenMarks.map(m => `<span class="mark">${m}</span>`).join('');
        html += `<div class="mark-dots">${mHtml}</div>`;
        html += `<div class="mark-dots mark-dots-bl">${mHtml}</div>`;
      }
      html += renderHPBar(card.hp, card.maxHp || 6);
      html += `</div>`;
    }
    html += '</div>'; // card-wrapper

    // Equipped cards peeking
    if (card.equips && card.equips.length > 0) {
      card.equips.forEach((eq, eqi) => {
        const et = normalizeEquipType(eq.type);
        const cls = et === 'Rot' ? 'rot' : 'ixim';
        html += `<div class="equip-peek ${cls}" onclick="showEquippedCard('${eq.folio}','${side}',${i},${eqi});event.stopPropagation()">`;
        html += `<img src="${IMG_BASE}${eq.folio}.webp" alt="${eq.name}">`;
        html += `<div class="equip-peek-label">${et==='Rot'?'🪨':'🌽'} ${eq.name}</div></div>`;
      });
    }

    html += '</div>'; // equip-stack
    if (card.folio && !card.revealed) html += `<div style="font-size:0.5rem;color:#555">Oculta</div>`;
    if (card.folio && card.revealed && (card.scaledDamage || card.scaledDmg)) {
      const sd = card.scaledDamage || card.scaledDmg || 0;
      const baseDmg = CARDS[card.folio] ? CARDS[card.folio].damage : 0;
      html += `<div style="font-size:0.55rem;color:#f59e0b;font-weight:bold">⚔️ ${baseDmg}+${sd}⬆️ = ${baseDmg + sd} dmg</div>`;
    }
    html += '</div>'; // card-slot
  });

  html += '</div>'; // field-row

  // Bottom player: field → aux → header (mirrored)
  if (position === 'bottom') {
    html += auxZones;
    html += headerHtml;
  }

  html += '</div>'; // player-side

  return html;
}

function buildAuxZones(p, side) {
  let html = '<div class="bottom-zones">';

  // All zone labels in one row (Protector + Equipo + Mazo + Ext + Bio)
  const pr = p.protector;
  const equipCount = (p.equipZone || []).length;
  const mazoCount = p.mazo || (p.mazoCards || []).length;
  const protIcon = pr.revealed ? '👁️' : '🎴';
  const bioIcon = p.bio ? (p.bio.revealed ? '👁️' : '🎴') : '';
  html += '<div class="aux-labels-row">';
  const protReady = (pr.rests || 0) === 0 && (pr.hp || 0) > 0;
  const protCls = protReady ? 'aux-label tappable prot-ready' : 'aux-label tappable';
  html += `<div class="${protCls}" onclick="toggleSection('prot-${side}')">${protIcon} Prot: ${pr.hp}PV · ${pr.rests || 0}💤 ▸</div>`;
  html += `<div class="aux-label tappable" onclick="toggleSection('equip-${side}')">⚔️ Eq: ${equipCount} ▸</div>`;
  html += `<div class="aux-label tappable" onclick="toggleMazo('${side}')">📦 Mazo: ${mazoCount} ▸</div>`;
  html += `<div class="aux-label tappable" onclick="toggleSection('ext-${side}')">💀 Ext: ${p.extinction}/10 ▸</div>`;
  html += `<div class="aux-label tappable" onclick="toggleSection('bio-${side}')">${bioIcon} Bio ▸</div>`;
  html += '</div>';

  // Protector content (collapsible)
  const prTarget = ACTION_MODE === 'attack-target' && side !== TURN_PLAYER;
  const prTarClass = prTarget ? 'target-mode' : '';
  const prClick = prTarget ? `attackProtector('${side}')` : `showCard('${pr.folio}','${pr.revealed?"alive":"hidden"}',${pr.hp},${pr.rests},'${side}',-1)`;
  html += `<div id="prot-${side}" style="display:none"><div class="protector-inline">`;
  if (pr.revealed) {
    const eMap = resolveEnergy(getCardEnergy(pr.folio));
    const protReadyCls = (pr.rests || 0) === 0 ? 'prot-frame-ready' : '';
    html += `<div class="card-frame prot-frame ${eMap.css} ${prTarClass} ${protReadyCls}" onclick="${prClick}">`;
    html += `<img src="${IMG_BASE}${pr.folio}.webp" alt="${pr.name}">`;
  } else {
    const rc = pr.rests >= 3 ? 'rest-3' : pr.rests === 2 ? 'rest-2' : pr.rests === 1 ? 'rest-1' : '';
    const hiddenProtReady = (pr.rests || 0) === 0 ? 'prot-frame-ready' : '';
    html += `<div class="card-frame prot-frame hidden-card ${rc} ${prTarClass} ${hiddenProtReady}" onclick="${prClick}">`;
    html += '<span class="card-back">🛡️</span>';
  }
  if (pr.rests > 0) html += '<div class="rest-dots">' + '<div class="rdot"></div>'.repeat(pr.rests) + '</div>';
  html += renderHPBar(pr.hp, pr.maxHp || 12);
  html += `</div><div style="font-size:0.5rem;color:#666">${pr.name} · ${pr.hp}PV</div>`;
  html += '</div></div>';

  // Equipment content (collapsible)
  html += `<div id="equip-${side}" style="display:none">`;
  if (p.equipZone && p.equipZone.length > 0) {
    html += '<div class="equip-zone">';
    p.equipZone.forEach((eq, ei) => {
      const et = normalizeEquipType(eq.type);
      const cls = et === 'Rot' ? 'rot' : 'ixim';
      const click = ACTION_MODE === 'equip-select' && side === TURN_PLAYER ? `selectEquipCard(${ei})` : `showEquipCard('${eq.folio}','${side}',${ei})`;
      html += `<div><div class="equip-zone-card ${cls}" onclick="${click}">`;
      html += `<img src="${IMG_BASE}${eq.folio}.webp" alt="${eq.name}"></div>`;
      html += `<div class="equip-zone-label">${et==='Rot'?'🪨':'🌽'} ${eq.name}</div></div>`;
    });
    html += '</div>';
  } else {
    html += '<div style="font-size:0.6rem;color:#444">Vacía</div>';
  }
  html += '</div>';

  // Mazo content (collapsible)
  html += `<div class="mazo-list" id="mazo-${side}" style="display:none">`;
  if (p.mazoCards && p.mazoCards.length > 0) {
    const emptySlots = p.field.map((c, i) => (!c || !c.folio) ? i : -1).filter(i => i >= 0);
    p.mazoCards.forEach((f, idx) => {
      const cd = CARDS[f] || {};
      const en = resolveEnergy(cd.energy);
      html += `<div class="mazo-item">`;
      html += `<span class="mazo-num">${idx+1}</span>`;
      html += `<img src="${IMG_BASE}${f}.webp" class="mazo-thumb" alt="" onclick="showCard('${f}','hidden',undefined,undefined,undefined,undefined,'${side}',${idx})">`;
      html += `<span class="mazo-name" onclick="showCard('${f}','hidden',undefined,undefined,undefined,undefined,'${side}',${idx})">${cd.name || f}</span>`;
      html += `<span class="mazo-energy" style="color:${en.color || '#888'}">${en.emoji || ''}</span>`;
      html += `<span class="mazo-actions">`;
      if (emptySlots.length > 0) {
        html += `<button class="mazo-btn place" onclick="event.stopPropagation();mazoPlaceInField('${side}',${idx})" title="Colocar en campo">⬆️</button>`;
      }
      html += `<button class="mazo-btn bottom" onclick="event.stopPropagation();mazoSendToBottom('${side}',${idx})" title="Mandar al fondo">⬇️</button>`;
      html += `</span>`;
      html += `</div>`;
    });
  }
  html += '</div>'; // mazo-list

  // Extinción content (collapsible)
  html += `<div id="ext-${side}" style="display:none">`;
  if (p.extinctionCards.length > 0) {
    html += '<div class="ext-row">';
    p.extinctionCards.forEach(ec => {
      const cd = CARDS[ec.folio] || {};
      const shortName = (cd.name || ec.folio || '').split(',')[0].trim();
      html += `<div class="ext-card" onclick="showCard('${ec.folio}','dead')">`;
      html += `<img src="${IMG_BASE}${ec.folio}.webp" alt="${shortName}">`;
      html += `<div class="ext-card-skull">💀</div>`;
      html += `<div class="ext-card-name">${shortName}</div>`;
      html += `</div>`;
    });
    html += '</div>';
  } else {
    html += '<div style="font-size:0.6rem;color:#444">Vacía</div>';
  }
  html += '</div>';

  // Bio content (collapsible)
  html += `<div id="bio-${side}" style="display:none">`;
  if (p.bio) {
    html += '<div class="bio-wrapper">';
    html += `<div class="equip-zone-card bio-card" onclick="showCard('${p.bio.folio}','equip')">`;
    if (p.bio.revealed) {
      html += `<img src="${IMG_BASE}${p.bio.folio}.webp" alt="${p.bio.name}">`;
    } else {
      html += '<div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;font-size:1.5rem;opacity:0.3">🌿</div>';
    }
    html += '</div>';
    html += `<div class="bio-info"><div style="font-size:0.55rem;color:#93c5fd">${p.bio.name}</div><div style="font-size:0.5rem;color:#555">${p.bio.revealed ? '✓ Revelada' : '🎴 Oculta'}</div></div>`;
    html += '</div>';
  }
  html += '</div>';

  html += '</div>'; // bottom-zones
  return html;
}

function clearSavedGame() {
  localStorage.removeItem('kodem_board_state');
  localStorage.removeItem('kodem-board-state');
  resetGame();
}

const _openSections = new Set(); // Track which sections are expanded
function toggleSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  if (el.style.display === 'none') {
    el.style.display = '';
    _openSections.add(id);
    requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth', block: 'nearest' }));
  } else {
    el.style.display = 'none';
    _openSections.delete(id);
  }
}
function toggleMazo(side) { toggleSection('mazo-' + side); }

// Restore open sections after re-render
function restoreOpenSections() {
  _openSections.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = '';
  });
}

function mazoPlaceInField(side, mazoIndex) {
  const p = getPlayer(side);
  if (!p.mazoCards || mazoIndex >= p.mazoCards.length) return;
  // Find first empty slot
  const slotIdx = p.field.findIndex(c => !c || !c.folio);
  if (slotIdx < 0) { warn('No hay espacio vacío en Zona Principal'); return; }
  pushUndo();
  const folio = p.mazoCards.splice(mazoIndex, 1)[0];
  p.mazo = p.mazoCards.length;
  const cd = getCardData(folio);
  const pos = p.field[slotIdx].pos || slotIdx + 1;
  p.field[slotIdx] = {
    pos, folio, name: cd.name || folio, energy: cd.energy || null,
    revealed: false, hp: 6, maxHp: 6, rests: 0, equips: [],
    burned: false, poisoned: false, abyssed: false,
    needsReplacement: false
  };
  logAction(`📥 ${p.name} coloca ${cd.name || folio} (oculta, 6 PV) en Pos${pos}`);
  saveState();
  renderInteractive();
}

function mazoSendToBottom(side, mazoIndex) {
  const p = getPlayer(side);
  if (!p.mazoCards || mazoIndex >= p.mazoCards.length) return;
  pushUndo();
  const folio = p.mazoCards.splice(mazoIndex, 1)[0];
  p.mazoCards.push(folio);
  // mazo count stays the same (just reordered)
  const cd = getCardData(folio);
  logAction(`📥 ${cd.name || folio} → fondo del Mazo`);
  saveState();
  renderInteractive();
}

/* ─── Deck Parser (flat → structured) ─── */
function parseDeck(deck) {
  // If already structured (has .mazo), return as-is
  if (deck.mazo && Array.isArray(deck.mazo)) return deck;
  // Parse flat format: cards[] → mazo/protector/bio/equips by card type
  const parsed = { name: deck.name, mazo: [], protector: null, bio: null, equips: [] };
  for (const f of (deck.cards || [])) {
    const cd = CARDS[f];
    if (!cd) { parsed.mazo.push(f); continue; }
    const t = (cd.type || '').toLowerCase();
    if (t === 'protector') parsed.protector = f;
    else if (t === 'bio') parsed.bio = f;
    else if (t === 'rot' || t === 'ixim') parsed.equips.push(f);
    else parsed.mazo.push(f);
  }
  return parsed;
}

/* ─── New Game ─── */
function populateDeckSelects() {
  // Show all decks that have at least 1 card (relaxed filter for user-built decks)
  const keys = Object.keys(DECKS).filter(k => {
    const d = DECKS[k];
    const cards = d.cards || d.mazo || [];
    return cards.length > 0;
  });
  const emptyMsg = keys.length === 0 ? '<option value="">— Crea un mazo en el Constructor —</option>' : '';
  for (const selId of ['ngAlphaDeck', 'ngBetaDeck']) {
    const sel = document.getElementById(selId);
    if (!sel) continue;
    sel.innerHTML = emptyMsg + keys.map(k => `<option value="${k}">${DECKS[k].name}</option>`).join('');
  }
}

function resetGame() {
  if (!confirm('¿Iniciar nueva partida? Se perderá el progreso actual.')) return;
  populateDeckSelects();
  document.getElementById('newGameOverlay').classList.add('active');
}

function closeNewGame() {
  document.getElementById('newGameOverlay').classList.remove('active');
}

function startNewGame() {
  const alphaKey = document.getElementById('ngAlphaDeck').value;
  const betaKey = document.getElementById('ngBetaDeck').value;
  const alphaName = document.getElementById('ngAlphaName').value || 'Alpha';
  const betaName = document.getElementById('ngBetaName').value || 'Beta';
  if (!alphaKey || !betaKey) { alert('Selecciona mazos para ambos jugadores'); return; }

  function buildPlayer(deckKey, name, emoji, color) {
    const deck = parseDeck(DECKS[deckKey]);
    const mazo = [...deck.mazo];
    const initial3 = mazo.splice(0, 3);
    return {
      name, deck: deck.name || DECKS[deckKey].name, emoji, color,
      field: initial3.map((f, i) => {
        const cd = CARDS[f] || {};
        return {
          pos: i + 1, folio: f, name: cd.name || f, energy: cd.energy || null,
          revealed: false, hp: 6, maxHp: 6, rests: 0, equips: [],
          burned: false, poisoned: false, abyssed: false, scaledDmg: 0
        };
      }),
      protector: { folio: deck.protector, name: (CARDS[deck.protector] || {}).name || deck.protector, hp: 12, maxHp: 12, rests: 3, revealed: false },
      bio: deck.bio ? { folio: deck.bio, name: (CARDS[deck.bio] || {}).name || deck.bio, revealed: false } : null,
      equipZone: (deck.equips || []).map(f => {
        const cd = CARDS[f] || {};
        return { folio: f, name: cd.name || f, type: cd.subtype || cd.type || 'Ixim' };
      }),
      mazoCards: mazo,
      mazo: mazo.length,
      extinction: 0,
      extinctionCards: []
    };
  }

  const state = {
    turn: 1,
    activePlayer: 'alpha',
    alpha: buildPlayer(alphaKey, alphaName, '🔥', '#ef4444'),
    beta: buildPlayer(betaKey, betaName, '🐾', '#22c55e'),
    gameLog: [{ turn: 1, msg: `⚔️ Nueva partida: ${alphaName} vs ${betaName}` }]
  };

  closeNewGame();
  localStorage.removeItem('kodem-board-state');
  UNDO_STACK = [];
  GAME_LOG = state.gameLog;
  initGame(state);
}

/* ─── Sync ─── */
async function syncPush() {
  // Export state to clipboard as compact code (~800 chars vs ~7000)
  const compact = compactExport();
  const json = JSON.stringify(compact);
  const code = 'KBOARD-' + btoa(unescape(encodeURIComponent(json)));
  try {
    await navigator.clipboard.writeText(code);
    logAction(`📤 Estado copiado (turno ${compact.t}, ${code.length} chars)`);
    alert(`✅ Copiado (${code.length} chars).\nPégalo en el chat.`);
  } catch(e) {
    prompt('Copia este código:', code);
    logAction(`📤 Estado exportado (turno ${compact.t})`);
  }
  renderInteractive();
}

async function syncPull() {
  const code = prompt('Pega el código del oponente (KBOARD-...):');
  if (!code || !code.startsWith('KBOARD-')) { 
    if (code) alert('Código inválido — debe empezar con KBOARD-'); 
    return; 
  }
  try {
    const json = decodeURIComponent(escape(atob(code.slice(7))));
    const raw = JSON.parse(json);
    // Detect compact (v2) vs full format
    const state = raw.v === 2 ? compactImport(raw) : raw;
    if (!state.alpha || !state.beta) { alert('Estado inválido'); return; }
    initGame(state);
    logAction(`📥 Estado cargado (turno ${state.turn})`);
  } catch(e) {
    alert('Error al decodificar: ' + e.message);
  }
  renderInteractive();
}

// API sync removed (public version — clipboard only)

function exportState() {
  return {
    turn: GAME.turn,
    phase: PHASE,
    activePlayer: TURN_PLAYER,
    alpha: GAME.alpha,
    beta: GAME.beta
  };
}

// ── Compact sync: only dynamic data, ~500-800 chars vs 7000+ ──
function compactExport() {
  const s = exportState();
  const packSide = (p) => ({
    n: p.name, d: p.deck, j: p.emoji, co: p.color,
    x: p.extinction, m: p.mazo, mc: p.mazoCards,
    pr: { f: p.protector.folio, h: p.protector.hp, r: p.protector.rests, v: p.protector.revealed ? 1 : 0 },
    bi: { f: p.bio.folio, v: p.bio.revealed ? 1 : 0 },
    fld: p.field.map(c => c ? ({
      f: c.folio || null, h: c.hp || 0, r: c.rests || 0, v: c.revealed ? 1 : 0,
      eq: (c.equips || []).map(e => e.folio),
      mk: [(c.marks||{}).burn?1:0, (c.marks||{}).poison?1:0, (c.marks||{}).abysm?1:0],
      sd: c.scaledDmg || 0,
      nr: c.needsReplacement ? 1 : 0
    }) : ({ f: null, h: 0, r: 0, v: 0, eq: [], mk: [0,0,0], sd: 0, nr: 0 })),
    ez: (p.equipZone || []).map(e => e.folio),
    xc: (p.extinctionCards || []).map(e => e.folio || e)
  });
  return { v:2, t: s.turn, p: s.phase, a: s.activePlayer, al: packSide(s.alpha), be: packSide(s.beta), gl: GAME_LOG.slice(-30) };
}

function compactImport(c) {
  const unpackSide = (p) => {
    const getCard = (folio) => CARDS[folio] || { folio, name: folio };
    const makeEquip = (folio) => {
      const cd = getCard(folio);
      return { folio, name: cd.name, type: cd.type, effect_text: cd.effect_text, cost_text: cd.cost_text };
    };
    return {
      name: p.n, deck: p.d, emoji: p.j, color: p.co,
      extinction: p.x, mazo: p.m, mazoCards: p.mc,
      protector: { folio: p.pr.f, name: getCard(p.pr.f).name, hp: p.pr.h, maxHp: 12, rests: p.pr.r, revealed: !!p.pr.v },
      bio: { folio: p.bi.f, name: getCard(p.bi.f).name, revealed: !!p.bi.v },
      field: p.fld.map((fc, i) => {
        const cd = getCard(fc.f);
        return {
          pos: i + 1, folio: fc.f, name: cd.name, energy: cd.energy,
          hp: fc.h, maxHp: 6, damage: Number(cd.damage) || 0,
          rests: fc.r, maxRests: Number(cd.rests) || 0,
          revealed: !!fc.v,
          equipment: [], equips: (fc.eq || []).map(makeEquip),
          marks: { burn: !!fc.mk[0], poison: !!fc.mk[1], abysm: !!fc.mk[2] },
          scaledDmg: fc.sd || 0,
          needsReplacement: !!fc.nr
        };
      }),
      equipment: p.ez.map(makeEquip),
      extinctionCards: p.xc.map(f => typeof f === 'string' ? makeEquip(f) : f),
      equipZone: p.ez.map(makeEquip)
    };
  };
  const state = { turn: c.t, phase: c.p, activePlayer: c.a, alpha: unpackSide(c.al), beta: unpackSide(c.be) };
  if (c.gl) {
    GAME_LOG = c.gl;
    state.gameLog = c.gl;
  }
  return state;
}

init();
