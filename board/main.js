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
  if (loadState()) {
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
function resetGame() {
  if (!confirm('¿Iniciar nueva partida? Se perderá el progreso actual.')) return;
  // Populate deck selects
  const keys = Object.keys(DECKS).filter(k => {
    const d = parseDeck(DECKS[k]);
    return d.protector && d.mazo && d.mazo.length > 0;
  });
  for (const selId of ['ngAlphaDeck', 'ngBetaDeck']) {
    const sel = document.getElementById(selId);
    sel.innerHTML = keys.map(k => `<option value="${k}">${DECKS[k].name}</option>`).join('');
  }
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

// syncFromServer removed (public version)

// pushToServer removed (public version)

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
