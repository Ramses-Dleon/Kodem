/**
 * Kódem Board — Rendering functions (continued from board.html inline script)
 */

function renderFieldCard(html_parts, card, i, side, isTarget, isSelected, isVinculo) {
  const eMap = ENERGY_MAP[card.energy] || { css: '' };
  const restClass = card.rests >= 3 ? 'rest-3' : card.rests === 2 ? 'rest-2' : card.rests === 1 ? 'rest-1' : '';
  const selClass = isSelected ? 'selected' : '';
  const isManualEquip = ACTION_MODE === 'manual-equip-target' && MANUAL_EQUIP && MANUAL_EQUIP.side === side;
  const tarClass = isTarget ? 'target-mode' : isManualEquip ? 'target-mode equip-glow' : '';
  let onclick;
  if (isManualEquip) {
    onclick = `manualEquipTarget('${side}',${i})`;
  } else if (isTarget && card.hp > 0) {
    onclick = `resolveAttack('${side}',${i})`;
  } else if (isVinculo && isAvailable(card)) {
    onclick = `resolveVinculo('${side}',${i})`;
  } else if (side === TURN_PLAYER && PHASE === 'batalla' && !HAS_ATTACKED && !ACTION_MODE) {
    onclick = `startAttack('${side}',${i})`;
  } else {
    onclick = `showCard('${card.folio}','alive',${card.hp},${card.rests},'${side}',${i})`;
  }

  let h = `<div class="card-frame ${eMap.css} ${restClass} ${selClass} ${tarClass}" onclick="${onclick}">`;
  h += `<img src="${IMG_BASE}${card.folio}.webp" alt="${card.name}">`;
  if (card.rests > 0) h += '<div class="rest-dots">' + '<div class="rdot"></div>'.repeat(card.rests) + '</div>';

  // Marks
  let marks = '';
  if (card.burned) marks += '🔥';
  if (card.poisoned) marks += '☠️';
  if (card.abyssed) marks += '🌀';
  if (marks) {
    const markList = [];
    if (card.burned) markList.push('🔥');
    if (card.poisoned) markList.push('☠️');
    if (card.abyssed) markList.push('🌀');
    const markHtml = markList.map(m => `<span class="mark">${m}</span>`).join('');
    h += `<div class="mark-dots">${markHtml}</div>`;
    h += `<div class="mark-dots mark-dots-bl">${markHtml}</div>`;
  }

  h += renderHPBar(card.hp, card.maxHp || 6);
  h += '</div>';
  return h;
}

function renderHPBar(hp, maxHp) {
  let h = '<div class="hp-bar">';
  for (let i = 0; i < maxHp; i++) {
    if (i < hp) h += hp <= 2 ? '<div class="hp crit"></div>' : '<div class="hp"></div>';
    else h += '<div class="hp lost"></div>';
  }
  h += '</div>';
  return h;
}

function getCardEnergy(folio) {
  const c = CARDS[folio];
  return c ? c.energy : null;
}

function renderTercia() {
  const overlay = document.getElementById('terciaOverlay');
  const container = document.getElementById('terciaCards');

  if (ACTION_MODE !== 'tercia' || TERCIA.length === 0) {
    overlay.classList.remove('active');
    return;
  }

  overlay.classList.add('active');
  const side = SELECTED ? SELECTED.side : TURN_PLAYER;
  document.getElementById('terciaTitle').textContent =
    `📥 ${getPlayer(side).name}: Elige 1 carta de la Tercia`;

  container.innerHTML = TERCIA.map((folio, i) => {
    const cd = CARDS[folio] || {};
    return `<div class="tercia-card" onclick="chooseTercia(${i})">
      <img src="${IMG_BASE}${folio}.webp" alt="${cd.name || folio}">
      <div class="tercia-card-name">${cd.name || folio}</div>
    </div>`;
  }).join('');
}

function renderLog() {
  const panel = document.getElementById('logPanel');
  let html = '';
  // Show full game history (all turns)
  if (GAME_LOG.length > 0) {
    const relevant = GAME_LOG;
    let lastTurn = -1;
    relevant.forEach(e => {
      if (e.turn !== lastTurn) {
        html += `<p class="log-turn-header">── Turno ${e.turn} ──</p>`;
        lastTurn = e.turn;
      }
      html += `<p>${e.msg}</p>`;
    });
  }
  // Current turn actions (if any new ones not in GAME_LOG yet)
  if (TURN_LOG.length > 0 && GAME_LOG.length === 0) {
    html += TURN_LOG.map(m => `<p>${m}</p>`).join('');
  }
  if (!html) html = '<p style="opacity:0.5">Sin acciones aún</p>';
  panel.innerHTML = html;
  panel.scrollTop = panel.scrollHeight;

  // Add expand/collapse toggle
  let toggle = document.getElementById('logToggle');
  if (!toggle) {
    toggle = document.createElement('button');
    toggle.id = 'logToggle';
    toggle.className = 'log-toggle';
    toggle.onclick = function() {
      panel.classList.toggle('expanded');
      toggle.textContent = panel.classList.contains('expanded') ? '▲ Colapsar log' : '▼ Ver log completo';
    };
    panel.parentNode.insertBefore(toggle, panel.nextSibling);
  }
  toggle.textContent = panel.classList.contains('expanded') ? '▲ Colapsar log' : '▼ Ver log completo';
  // Sync mobile log sheet if open
  if (typeof syncLogSheet === 'function') syncLogSheet();
}

function showCard(folio, status, currentHP, currentRests, side, index, mazoSide, mazoIndex) {
  const card = CARDS[folio];
  if (!card) return;

  const popupImgWrap = document.querySelector('.popup-img');
  const popupImg = document.getElementById('popupImg');
  // Reset img display in case onerror hid it previously
  popupImg.style.display = '';
  popupImg.src = IMG_BASE + folio + '.webp';
  // Show card art only when card is NOT revealed in field (hidden, dead, equip, mazo)
  if (popupImgWrap) {
    popupImgWrap.style.display = (status === 'alive') ? 'none' : 'flex';
  }
  document.getElementById('popupName').textContent = card.name || folio;
  document.getElementById('popupFolio').textContent = `${card.folio} · ${card.set}`;

  const meta = document.getElementById('popupMeta');
  meta.innerHTML = '';
  if (card.type) {
    const t = document.createElement('span');
    t.className = 'popup-tag';
    t.textContent = (TYPE_EMOJI[card.type] || '') + ' ' + card.type;
    meta.appendChild(t);
  }
  [card.energy, card.energy2].filter(Boolean).forEach(en => {
    const e = document.createElement('span');
    e.className = 'popup-tag';
    const em = ENERGY_MAP[en] || {};
    e.textContent = (em.emoji || '') + ' ' + en;
    e.style.borderColor = em.color || '#444';
    e.style.color = em.color || '#ccc';
    meta.appendChild(e);
  });

  const stats = document.getElementById('popupStats');
  stats.innerHTML = '';
  if (card.damage != null) {
    // Check if card is scaled (find in GAME state)
    let scaledLabel = '';
    if (GAME) {
      for (const s of ['alpha', 'beta']) {
        const p = GAME[s];
        if (p && p.field) {
          const fc = p.field.find(f => f.folio === folio);
          if (fc && (fc.scaledDamage || fc.scaledDmg)) {
            const sd = fc.scaledDamage || fc.scaledDmg;
            scaledLabel = ` <span style="color:#f59e0b">(+${sd}⬆️ = ${card.damage + sd})</span>`;
          }
        }
      }
    }
    stats.innerHTML += `<span class="popup-stat">⚔️ ${card.damage}${scaledLabel}</span>`;
  }
  if (card.rests != null) stats.innerHTML += `<span class="popup-stat">💤 ${card.rests}</span>`;
  if (currentHP !== undefined) stats.innerHTML += `<span class="popup-stat" style="color:#22c55e">❤️ ${currentHP} PV</span>`;

  const et = document.getElementById('popupEffectType');
  et.textContent = card.effect_type || '';
  et.style.display = card.effect_type ? 'block' : 'none';
  document.getElementById('popupEffect').textContent = card.effect_text || '';

  const costWrap = document.getElementById('popupCostWrap');
  if (card.cost_text) {
    costWrap.style.display = 'block';
    document.getElementById('popupCost').textContent = card.cost_text;
  } else {
    costWrap.style.display = 'none';
  }

  const statusEl = document.getElementById('popupStatus');
  if (status === 'dead') { statusEl.className = 'popup-status dead'; statusEl.textContent = '💀 En Extinción'; }
  else if (status === 'hidden') { statusEl.className = 'popup-status hidden-s'; let t = '🎴 Oculta'; if (currentRests) t += ` · ${currentRests} descanso${currentRests>1?'s':''}`; statusEl.textContent = t; }
  else if (status === 'alive') { statusEl.className = 'popup-status alive'; let t = '✅ En campo'; if (currentRests) t += ` · ${currentRests} descanso${currentRests>1?'s':''}`; else t += ' · Disponible'; statusEl.textContent = t; }
  else { statusEl.className = 'popup-status'; statusEl.textContent = '🔧 Equipo'; }

  // Effect-driven action buttons
  const actions = document.getElementById('popupActions');
  actions.innerHTML = '';
  
  if (mazoSide !== undefined && mazoIndex !== undefined) {
    // Card is from mazo — show place/bottom buttons
    const p = getPlayer(mazoSide);
    const hasEmpty = p.field.some(c => !c.folio);
    let btns = '';
    if (hasEmpty) {
      btns += `<button class="popup-act" style="border-color:#22c55e;color:#22c55e" onclick="closePopup();mazoPlaceInField('${mazoSide}',${mazoIndex})">⬆️ Colocar en campo</button>`;
    }
    btns += `<button class="popup-act" style="border-color:#f59e0b;color:#f59e0b" onclick="closePopup();mazoSendToBottom('${mazoSide}',${mazoIndex})">⬇️ Fondo del mazo</button>`;
    actions.innerHTML = btns;
  } else if (side !== undefined && index >= 0) {
    actions.innerHTML = generateCardButtons(folio, side, index, status);
  } else if (side !== undefined && index === -1) {
    actions.innerHTML = generateProtButtons(side, status);
  }

  document.getElementById('popupOverlay').classList.add('active');
}

function showBioCard(side) {
  const p = getPlayer(side);
  const bio = p.bio;
  if (!bio || !bio.folio) return;
  showCard(bio.folio, bio.revealed ? 'alive' : 'equip', bio.hp, bio.rests);
  const actions = document.getElementById('popupActions');
  let btns = '';

  if (!bio.revealed) {
    btns += mkBtn('🌿 Revelar Bio', '#3b82f6', `closePopup();revealBio('${side}')`);
  }
  btns += mkBtn('💀 Enviar Bio a Extinción', '#dc2626', `closePopup();sendBioToExtinction('${side}')`);
  actions.innerHTML = btns;
}

function showEquipCard(folio, equipSide, equipIndex) {
  // Show the card popup, then inject equip-to-field buttons
  showCard(folio, 'equip');
  const actions = document.getElementById('popupActions');
  const p = getPlayer(equipSide);
  if (!p || !p.field) return;

  let btns = '';
  // Show a button to equip this card to each revealed Adendei on that side
  p.field.forEach((fc, fi) => {
    if (!fc || !fc.folio || !fc.revealed || fc.hp <= 0) return;
    const cd = CARDS[fc.folio] || {};
    const en = ENERGY_MAP[fc.energy || cd.energy] || {};
    btns += `<button class="popup-act" style="border-color:#3b82f6;color:#3b82f6" onclick="closePopup();doEquipFromPopup('${equipSide}',${equipIndex},${fi})">`
      + `${en.emoji || '🔧'} Equipar a Pos${fc.pos || fi+1} — ${cd.name || fc.folio}</button>`;
  });

  // Extinction button for unequipped cards in equip zone
  btns += `<button class="popup-act" style="border-color:#ef4444;color:#ef4444" onclick="closePopup();doEquipZoneExtinction('${equipSide}',${equipIndex})">`
    + `💀 Enviar a Extinción</button>`;

  actions.innerHTML = (btns.includes('Equipar a') ? `<div style="font-size:0.7rem;color:#93c5fd;margin-bottom:4px">🔧 Equipar a:</div>` : '') + btns;
}

function doEquipFromPopup(side, equipIndex, fieldIndex) {
  // Equip card from equipZone[equipIndex] to field[fieldIndex]
  pushUndo();
  const p = getPlayer(side);
  const eq = p.equipZone[equipIndex];
  if (!eq) { warn('Equipo no encontrado'); return; }
  const target = p.field[fieldIndex];
  if (!target || !target.folio) { warn('No hay carta en esa posición'); return; }
  if (!target.equips) target.equips = [];
  target.equips.push(eq);
  p.equipZone.splice(equipIndex, 1);
  const et = normalizeEquipType(eq.type);
  logAction(`🔧 ${p.name}: ${eq.name} (${et}) → ${target.name} Pos${target.pos || fieldIndex+1}`);
  HAS_EQUIPPED = true;
  saveState();
  renderInteractive();
}

function doEquipZoneExtinction(side, equipIndex) {
  pushUndo();
  const p = getPlayer(side);
  if (!p.equipZone || !p.equipZone[equipIndex]) { warn('Equipo no encontrado'); return; }
  const eq = p.equipZone.splice(equipIndex, 1)[0];
  if (!p.extinctionCards) p.extinctionCards = [];
  p.extinctionCards.push({ folio: eq.folio, name: eq.name, type: eq.type });
  p.extinction = p.extinctionCards.length;
  const et = normalizeEquipType(eq.type);
  logAction(`💀 ${eq.name} (${et}) de Zona Equipo → Extinción (${p.extinction}/10)`);
  saveState();
  renderInteractive();
}

function showEquippedCard(folio, side, fieldIndex, equipIndex) {
  // Show popup for an equip card that's already attached to a field card
  showCard(folio, 'equip');
  const actions = document.getElementById('popupActions');
  const p = getPlayer(side);
  const fc = p.field[fieldIndex];
  const equipName = (CARDS[folio] || {}).name || folio;
  const hostName = fc ? (fc.name || fc.folio) : `Pos${fieldIndex+1}`;

  // Check current revealed state
  const eqObj = fc.equips[equipIndex];
  const isHidden = eqObj && eqObj.revealed === false;

  let btns = '';
  // Toggle reveal/hide
  if (isHidden) {
    btns += `<button class="popup-act" style="border-color:#3b82f6;color:#3b82f6" onclick="closePopup();doToggleEquipReveal('${side}',${fieldIndex},${equipIndex})">👁️ Revelar equipo</button>`;
  } else {
    btns += `<button class="popup-act" style="border-color:#9ca3af;color:#9ca3af" onclick="closePopup();doToggleEquipReveal('${side}',${fieldIndex},${equipIndex})">🙈 Ocultar equipo</button>`;
  }
  btns += `<button class="popup-act" style="border-color:#f59e0b;color:#f59e0b" onclick="closePopup();doUnequip('${side}',${fieldIndex},${equipIndex})">↩️ Desequipar de ${hostName}</button>`;
  btns += `<button class="popup-act" style="border-color:#ef4444;color:#ef4444" onclick="closePopup();doEquipExtinction('${side}',${fieldIndex},${equipIndex})">💀 Enviar a Extinción</button>`;

  actions.innerHTML = btns;
}

function doToggleEquipReveal(side, fieldIndex, equipIndex) {
  pushUndo();
  const p = getPlayer(side);
  const fc = p.field[fieldIndex];
  if (!fc || !fc.equips || !fc.equips[equipIndex]) { warn('Equipo no encontrado'); return; }
  const eq = fc.equips[equipIndex];
  const wasHidden = eq.revealed === false;
  eq.revealed = wasHidden; // false→true
  if (wasHidden) {
    // Revealing: check §11 limits (max 1 of same type revealed)
    const eqType = normalizeEquipType(eq.type);
    const otherRevealed = fc.equips.filter((e, idx) => idx !== equipIndex && normalizeEquipType(e.type) === eqType && e.revealed !== false);
    if (otherRevealed.length >= 1) {
      eq.revealed = false; // revert
      warn(`§11: Máximo 1 ${eqType} revelado por carta`);
      return;
    }
    eq.revealed = true;
    logAction(`👁️ ${eq.name} revelado en ${cardName(fc.folio)}`);
  } else {
    eq.revealed = false;
    logAction(`🙈 ${eq.name} ocultado en ${cardName(fc.folio)}`);
  }
  saveState();
  renderInteractive();
}

function doUnequip(side, fieldIndex, equipIndex) {
  pushUndo();
  const p = getPlayer(side);
  const fc = p.field[fieldIndex];
  if (!fc || !fc.equips || !fc.equips[equipIndex]) { warn('Equipo no encontrado'); return; }
  const eq = fc.equips.splice(equipIndex, 1)[0];
  if (!p.equipZone) p.equipZone = [];
  p.equipZone.push(eq);
  const et = normalizeEquipType(eq.type);
  logAction(`↩️ ${eq.name} (${et}) desequipado de ${fc.name} → Zona de Equipo`);
  saveState();
  renderInteractive();
}

function doEquipExtinction(side, fieldIndex, equipIndex) {
  pushUndo();
  const p = getPlayer(side);
  const fc = p.field[fieldIndex];
  if (!fc || !fc.equips || !fc.equips[equipIndex]) { warn('Equipo no encontrado'); return; }
  const eq = fc.equips.splice(equipIndex, 1)[0];
  if (!p.extinctionCards) p.extinctionCards = [];
  p.extinctionCards.push({ folio: eq.folio, name: eq.name, type: eq.type });
  p.extinction = p.extinctionCards.length;
  const et = normalizeEquipType(eq.type);
  logAction(`💀 ${eq.name} (${et}) → Extinción (${p.extinction}/10)`);
  saveState();
  renderInteractive();
}

function closePopup() { document.getElementById('popupOverlay').classList.remove('active'); }
document.addEventListener('keydown', e => { if (e.key === 'Escape') closePopup(); });

function resetGame() {
  if (!confirm('¿Reiniciar partida desde el JSON?')) return;
  localStorage.removeItem('kodem_board_state');
  location.reload();
}
