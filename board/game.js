/**
 * Kódem TCG — Interactive Board Game Engine (Level 1 + Level 2: Rule Validation)
 * Handles turn phases, actions, combat resolution, state management,
 * and enforces Kódem rules from Rulebook v5.0.
 */

// ── State ──────────────────────────────────────────────────────────────────
let GAME = null;
let PHASE = 'previa';
let TURN_PLAYER = null;
let SELECTED = null;
let ACTION_MODE = null; // null | 'attack-target' | 'equip-select' | 'tercia' | 'reveal-select' | 'manual-equip-target'
let MANUAL_EQUIP = null;
let TERCIA = [];
let TERCIA_SLOT = -1;
let ATTACKED_THIS_TURN = null;
let HAS_ATTACKED = false;
let HAS_EQUIPPED = false;
let VINCULO_USED = false;
let VINCULO_LINKED_INDEX = null; // Index of Adendei linked via Vínculo Odémico
let UNDO_STACK = [];
let BIO_SENT_THIS_TURN = false;
let RAVA_RETURNED_THIS_GAME = {};  // { side: true/false }
let TURN_LOG = [];
let GAME_LOG = [];  // Persistent across turns — last N entries
let VIOLATIONS = [];  // Rule violations detected

const PHASES = ['previa', 'batalla', 'post', 'equipo', 'fin'];

// ── Init ───────────────────────────────────────────────────────────────────
function initGame(state) {
  GAME = JSON.parse(JSON.stringify(state));
  TURN_PLAYER = GAME.activePlayer || 'alpha';
  PHASE = 'previa';
  SELECTED = null;
  ACTION_MODE = null;
  HAS_ATTACKED = false;
  HAS_EQUIPPED = false;
  VINCULO_USED = false;
  VINCULO_LINKED_INDEX = null;
  BIO_SENT_THIS_TURN = false;
  ATTACKED_THIS_TURN = null;
  TURN_LOG = [];
  VIOLATIONS = [];
  RAVA_RETURNED_THIS_GAME = {};

  // Normalize null field slots → empty objects (prevents crashes on .folio/.marks access)
  for (const side of ['alpha', 'beta']) {
    const p = GAME[side];
    if (p && p.field) {
      p.field = p.field.map((card, i) => card || { pos: i + 1 });
    }
  }
  
  // Load game log from state if present (server-side turns)
  if (state.gameLog && Array.isArray(state.gameLog)) {
    GAME_LOG = state.gameLog;
  }
  
  // Normalize equipment field name: server uses 'equipment', board uses 'equipZone'
  for (const side of ['alpha', 'beta']) {
    const p = GAME[side];
    if (p.equipment && !p.equipZone) {
      p.equipZone = p.equipment;
    }
    if (!p.equipZone) p.equipZone = [];
  }

  // Normalize extinctionCards: strings → {folio, name} objects
  for (const side of ['alpha', 'beta']) {
    const p = GAME[side];
    if (p.extinctionCards) {
      p.extinctionCards = p.extinctionCards.map(item => {
        if (typeof item === 'string') {
          return { folio: item, name: cardName(item) || item };
        }
        return item;
      });
    } else {
      p.extinctionCards = [];
    }
  }
  
  // Normalize marks: compact import uses marks:{burn,poison,abysm}, game uses flat burned/poisoned/abyssed
  for (const side of ['alpha', 'beta']) {
    const p = GAME[side];
    if (p.field) {
      p.field.forEach(card => {
        if (card.marks) {
          if (card.marks.burn && !card.burned) card.burned = true;
          if (card.marks.poison && !card.poisoned) card.poisoned = true;
          if (card.marks.abysm && !card.abyssed) card.abyssed = true;
        }
        // Also sync flat → marks object
        if (!card.marks) card.marks = {};
        if (card.burned) card.marks.burn = true;
        if (card.poisoned) card.marks.poison = true;
        if (card.abyssed) card.marks.abysm = true;
      });
    }
  }

  // Fix HP: Adendei/Rava=6, Protector=12 (damage field is attack, not HP)
  const HP_BY_TYPE = {'Adendei':6,'Rava':6,'Espectro':6,'Token':6};
  for (const side of ['alpha', 'beta']) {
    const p = getPlayer(side);
    p.field.forEach(card => {
      if (card.folio && CARDS[card.folio]) {
        const t = CARDS[card.folio].type || 'Adendei';
        const maxHp = HP_BY_TYPE[t] || 6;
        if (!card.maxHp || card.maxHp < maxHp) { card.maxHp = maxHp; }
        if (!card.hp || card.hp <= 0 || card.hp > card.maxHp) { card.hp = card.maxHp; }
      }
    });
  }
  
  // Auto-trigger tercia if active player has a needsReplacement slot
  // §6.2 adapted for async: replacement happens at start of owner's turn
  const activeP = getPlayer(TURN_PLAYER);
  activeP.field.forEach((card, i) => {
    if (card.needsReplacement && !card.folio) {
      startReplacement(TURN_PLAYER, i);
    }
  });
  
  saveState();
  renderInteractive();
}

// ── Save/Load ──────────────────────────────────────────────────────────────
function pushUndo() {
  UNDO_STACK.push(JSON.stringify({
    game: GAME, turnPlayer: TURN_PLAYER, phase: PHASE,
    hasAttacked: HAS_ATTACKED, hasEquipped: HAS_EQUIPPED,
    vinculoUsed: VINCULO_USED, vinculoLinkedIndex: VINCULO_LINKED_INDEX, bioSent: BIO_SENT_THIS_TURN,
    attackedThisTurn: ATTACKED_THIS_TURN,
    ravaReturned: RAVA_RETURNED_THIS_GAME,
    turnLog: TURN_LOG, gameLog: GAME_LOG, violations: VIOLATIONS
  }));
  if (UNDO_STACK.length > 20) UNDO_STACK.shift(); // max 20 states
}

function saveState() {
  pushUndo();
  localStorage.setItem('kodem_board_state', JSON.stringify({
    game: GAME, turnPlayer: TURN_PLAYER, phase: PHASE,
    hasAttacked: HAS_ATTACKED, hasEquipped: HAS_EQUIPPED,
    vinculoUsed: VINCULO_USED, vinculoLinkedIndex: VINCULO_LINKED_INDEX, bioSent: BIO_SENT_THIS_TURN,
    attackedThisTurn: ATTACKED_THIS_TURN,
    ravaReturned: RAVA_RETURNED_THIS_GAME,
    turnLog: TURN_LOG, gameLog: GAME_LOG, violations: VIOLATIONS
  }));
}

function loadState() {
  const raw = localStorage.getItem('kodem_board_state');
  if (!raw) return false;
  try {
    const d = JSON.parse(raw);
    GAME = d.game; TURN_PLAYER = d.turnPlayer; PHASE = d.phase;
    HAS_ATTACKED = d.hasAttacked || false;
    HAS_EQUIPPED = d.hasEquipped || false;
    VINCULO_USED = d.vinculoUsed || false;
    VINCULO_LINKED_INDEX = d.vinculoLinkedIndex ?? null;
    BIO_SENT_THIS_TURN = d.bioSent || false;
    ATTACKED_THIS_TURN = d.attackedThisTurn || null;
    RAVA_RETURNED_THIS_GAME = d.ravaReturned || {};
    TURN_LOG = d.turnLog || [];
    GAME_LOG = d.gameLog || [];
    VIOLATIONS = d.violations || [];
    return true;
  } catch { return false; }
}

// ── Helpers ────────────────────────────────────────────────────────────────
function getPlayer(side) { return GAME[side]; }
function getRival(side) { return side === 'alpha' ? GAME.beta : GAME.alpha; }
function getRivalSide(side) { return side === 'alpha' ? 'beta' : 'alpha'; }
function isAvailable(card) {
  return card.revealed && (card.rests || 0) === 0 && (card.hp || 0) > 0;
}
function cardName(folio) { const c = CARDS[folio]; return c ? c.name.split(',')[0].trim() : folio; }
function fullCardName(folio) { const c = CARDS[folio]; return c ? c.name : folio; }
function getCardData(folio) { return CARDS[folio] || {}; }
function safeInt(v) { if (typeof v === 'number') return Math.floor(v); const n = Number(v); return isNaN(n) ? 0 : Math.floor(n); }
function logAction(msg) {
  TURN_LOG.push(msg);
  GAME_LOG.push({ turn: GAME ? GAME.turn : 0, msg });
  if (GAME_LOG.length > 100) GAME_LOG.shift();
  saveState();
}

function warn(msg) {
  VIOLATIONS.push(msg);
  TURN_LOG.push('⚠️ ' + msg);
  saveState();
  renderInteractive();
}

function isRava(folio) {
  const cd = getCardData(folio);
  return cd.type === 'Rava';
}

function isProtector(card) {
  return card && getCardData(card.folio || '').type === 'Protector';
}

// ── Rule Validation: §5.2 — Only 1 attack/activa per turn ─────────────────
function canAttack(side, index) {
  if (side !== TURN_PLAYER) { warn('Solo puedes atacar en tu turno'); return false; }
  if (PHASE !== 'batalla') { warn('Solo puedes atacar en Fase de Batalla'); return false; }
  if (HAS_ATTACKED) { warn('§5.2: Solo 1 carta puede atacar/usar Activa por turno'); return false; }
  if (VINCULO_USED) { warn('§6.3: Usaste Vínculo — no puedes atacar este turno'); return false; }
  
  const card = getPlayer(side).field[index];
  if (!card || !card.folio) { warn('No hay carta en esta posición'); return false; }
  if (!card.revealed) { warn('Cartas ocultas no pueden atacar (§6.5)'); return false; }
  if ((card.rests || 0) > 0) { warn(`${cardName(card.folio)} está en descanso (${card.rests} turnos)`); return false; }
  if ((card.hp || 0) <= 0) { warn(`${cardName(card.folio)} tiene 0 PV`); return false; }
  
  // §2.3: Rava — check if it has damage to attack with
  const cd = getCardData(card.folio);
  if (cd.type === 'Rava' && safeInt(cd.damage) === 0 && !(card.scaledDmg > 0)) {
    warn(`${cardName(card.folio)} es Rava con 0 daño — no puede atacar`);
    return false;
  }
  
  return true;
}

// ── Rule Validation: Attack target ─────────────────────────────────────────
function canBeAttacked(targetSide, targetIndex) {
  const card = getPlayer(targetSide).field[targetIndex];
  if (!card || !card.folio) { warn('No hay carta en esa posición'); return false; }
  if ((card.hp || 0) <= 0) { warn(`${cardName(card.folio)} ya tiene 0 PV`); return false; }
  // Can attack hidden cards (§5.2 — puede atacar ocultas)
  return true;
}

function canAttackProtector(targetSide) {
  const prot = getPlayer(targetSide).protector;
  if (!prot || (prot.hp || 0) <= 0) { warn('Protector ya destruido'); return false; }
  // §2.2: Protector solo puede ser dañado por cartas que lo especifiquen
  // For Level 2 we allow it but warn
  const attacker = SELECTED ? getPlayer(SELECTED.side).field[SELECTED.index] : null;
  if (attacker) {
    const cd = getCardData(attacker.folio);
    const et = (cd.effect_text || '').toLowerCase();
    const hasProtAttack = et.includes('protector') || et.includes('cartas rivales');
    if (!hasProtAttack) {
      warn(`§2.2: ${cardName(attacker.folio)} no tiene efecto para dañar al Protector — verificar manualmente`);
      // Don't block — just warn, because cost_text might enable it
    }
  }
  return true;
}

// ── Rule Validation: Equip ─────────────────────────────────────────────────
function canEquip(side, eqIndex) {
  if (side !== TURN_PLAYER) return false;
  if (PHASE !== 'equipo') { warn('Solo se equipa en Fase de Equipo (§5.4)'); return false; }
  if (HAS_EQUIPPED) { warn('Ya equipaste este turno'); return false; }
  if (!ATTACKED_THIS_TURN) { warn('§5.4: Solo puedes equipar a la carta que atacó/usó Activa'); return false; }
  
  const p = getPlayer(side);
  const eq = p.equipZone[eqIndex];
  if (!eq) return false;
  
  const target = p.field[ATTACKED_THIS_TURN.index];
  if (!target || !target.folio) { warn('La carta que atacó ya no está en campo'); return false; }
  
  const eqData = getCardData(eq.folio);
  const eqType = normalizeEquipType(eqData.type || eq.type);
  
  // §2.1: Solo Adendei pueden ser equipados
  const targetData = getCardData(target.folio);
  if (targetData.type !== 'Adendei') {
    warn(`§11: Solo Adendei pueden ser equipados (${cardName(target.folio)} es ${targetData.type})`);
    return false;
  }
  
  // §11: Max 1 Ixim + 1 Rot
  if (!target.equips) target.equips = [];
  const existing = target.equips.map(e => normalizeEquipType(getCardData(e.folio).type || e.type));
  if (eqType === 'Ixim' && existing.filter(t => t === 'Ixim').length >= 1) {
    warn('§11: Máximo 1 Ixim revelado por carta');
    return false;
  }
  if (eqType === 'Rot' && existing.filter(t => t === 'Rot').length >= 1) {
    warn('§11: Máximo 1 Rot revelado por carta');
    return false;
  }
  
  // Check name restriction in cost_text
  const costText = (eqData.cost_text || '') + ' ' + (eqData.effect_text || '');
  const nameMatch = costText.match(/[Ss]olo puede ser equipad[ao] a un Adendei\s*[\u201c""]([^"""\u201d]+)/);
  if (nameMatch) {
    const reqName = nameMatch[1];
    if (!target.name || !target.name.includes(reqName)) {
      warn(`§11: ${eqData.name} solo se equipa a "${reqName}" — ${cardName(target.folio)} no califica`);
      return false;
    }
  }
  
  return true;
}

// ── Rule Validation: Reveal ────────────────────────────────────────────────
function canReveal(side, index) {
  const card = getPlayer(side).field[index];
  if (!card || !card.folio) return false;
  if (card.revealed) { warn('Carta ya está revelada'); return false; }
  
  // §5.1: Reveal happens in Fase Previa (or as response)
  if (side === TURN_PLAYER && PHASE !== 'previa' && PHASE !== 'batalla') {
    warn('Revelar solo en Fase Previa (o como respuesta en Batalla)');
    return false;
  }
  
  // §2.3: Rava cannot start in Zona Principal — but if already there, can be revealed
  return true;
}

// ── Rule Validation: Bio ───────────────────────────────────────────────────
function canSendBioToExtinction(side) {
  if (side !== TURN_PLAYER) return false;
  if (PHASE !== 'previa') { warn('Bio solo se envía a Extinción en Fase Previa (§2.6)'); return false; }
  if (BIO_SENT_THIS_TURN) { warn('§2.6: Solo 1 Bio a Extinción por turno'); return false; }
  const p = getPlayer(side);
  if (!p.bio || !p.bio.folio) { warn('No hay Bio'); return false; }
  return true;
}

// ── Actions ────────────────────────────────────────────────────────────────

function hideCard(side, index) {
  pushUndo();
  const p = getPlayer(side);
  const card = p.field[index];
  if (!card || !card.folio) return;
  card.revealed = false;
  // §6.5: hidden card returns to base stats (6 PV)
  card.hp = 6;
  card.maxHp = 6;
  // Clear marks and scale changes per rules
  card.burned = false;
  card.poisoned = false;
  card.abyssed = false;
  logAction(`🎴 ${p.name} oculta ${fullCardName(card.folio)}`);
  saveState();
  renderInteractive();
}

function revealCard(side, index) {
  if (!canReveal(side, index)) return;
  pushUndo();
  const p = getPlayer(side);
  const card = p.field[index];
  card.revealed = true;
  const cd = getCardData(card.folio);
  card.energy = cd.energy || null;
  card.name = cd.name || card.folio;
  card.maxHp = card.maxHp || 6;
  // Clear reveal-select mode after revealing
  if (ACTION_MODE === 'reveal-select') {
    ACTION_MODE = null;
    SELECTED = null;
  }
  logAction(`👁️ ${p.name} revela ${fullCardName(card.folio)}`);
  
  // §Bio trigger: check if Bio should fire on reveal (e.g. Caldera Submarina)
  saveState();
  renderInteractive();
}

function startRevealSelect(side) {
  if (PHASE !== 'previa') { warn('Revelar solo en Fase Previa'); return; }
  const p = getPlayer(side);
  const hidden = p.field.filter(c => c.folio && !c.revealed);
  if (hidden.length === 0) { warn('No hay cartas ocultas'); return; }
  ACTION_MODE = 'reveal-select';
  SELECTED = { side };
  renderInteractive();
}

function startAttack(side, index) {
  if (!canAttack(side, index)) return;
  SELECTED = { side, index, folio: getPlayer(side).field[index].folio };
  ACTION_MODE = 'attack-target';
  logAction(`⚔️ ${cardName(SELECTED.folio)} prepara ataque...`);
  renderInteractive();
}

function resolveAttack(targetSide, targetIndex) {
  if (!SELECTED || ACTION_MODE !== 'attack-target') return;
  if (!canBeAttacked(targetSide, targetIndex)) return;
  pushUndo();
  const attacker = getPlayer(SELECTED.side).field[SELECTED.index];
  const defender = getPlayer(targetSide).field[targetIndex];
  const cd = getCardData(attacker.folio);
  let dmg = safeInt(cd.damage) + (attacker.scaledDmg || 0);
  
  // §7: Burn damage to attacker BEFORE attack resolves
  if (attacker.burned) {
    attacker.hp = Math.max(0, attacker.hp - 1);
    logAction(`🔥 Quemadura: ${cardName(attacker.folio)} se daña 1 (${attacker.hp} PV)`);
  }
  
  // §9: Damage types — this is damage by attack
  const prevHp = defender.hp;
  defender.hp = Math.max(0, defender.hp - dmg);
  logAction(`⚔️ ${cardName(attacker.folio)} → ${defender.revealed ? cardName(defender.folio) : 'Oculta'}: ${dmg} dmg (${prevHp}→${defender.hp} PV)`);
  
  ATTACKED_THIS_TURN = { side: SELECTED.side, index: SELECTED.index };
  HAS_ATTACKED = true;
  
  // §5.5.6: Apply attacker's printed rests immediately (visual feedback)
  // This matches what happens on a physical board — you rotate the card after attacking
  const attackerBaseRests = safeInt(cd.rests);
  if (attackerBaseRests > 0) {
    attacker.rests = attackerBaseRests;
    logAction(`💤 ${cardName(attacker.folio)} → ${attackerBaseRests} descanso(s)`);
  }
  
  if (defender.hp <= 0) logAction(`💀 ${defender.revealed ? cardName(defender.folio) : 'Carta'} cae a 0 PV`);
  if (attacker.hp <= 0) logAction(`💀 ${cardName(attacker.folio)} muere por quemadura`);
  
  clearSelection();
  saveState();
  renderInteractive();
}

function attackProtector(targetSide) {
  if (!SELECTED || ACTION_MODE !== 'attack-target') return;
  if (!canAttackProtector(targetSide)) return;
  pushUndo();
  const attacker = getPlayer(SELECTED.side).field[SELECTED.index];
  const prot = getPlayer(targetSide).protector;
  const cd = getCardData(attacker.folio);
  let dmg = safeInt(cd.damage) + (attacker.scaledDmg || 0);
  
  if (attacker.burned) {
    attacker.hp = Math.max(0, attacker.hp - 1);
    logAction(`🔥 Quemadura: ${cardName(attacker.folio)} se daña 1 (${attacker.hp} PV)`);
  }
  
  const prevHp = prot.hp;
  prot.hp = Math.max(0, prot.hp - dmg);
  logAction(`⚔️ ${cardName(attacker.folio)} → Protector ${prot.name}: ${dmg} dmg (${prevHp}→${prot.hp} PV)`);
  
  ATTACKED_THIS_TURN = { side: SELECTED.side, index: SELECTED.index };
  HAS_ATTACKED = true;
  
  // §5.5.6: Apply attacker's printed rests immediately
  const attackerBaseRests = safeInt(cd.rests);
  if (attackerBaseRests > 0) {
    attacker.rests = attackerBaseRests;
    logAction(`💤 ${cardName(attacker.folio)} → ${attackerBaseRests} descanso(s)`);
  }
  
  if (prot.hp <= 0) {
    logAction(`💀 Protector ${prot.name} destruido — va a Extinción + 3 del tope del Mazo`);
    // §2.2: Protector death → Extinción + 3 cards from Mazo top
    const p = getPlayer(targetSide);
    p.extinctionCards.push({ folio: prot.folio, name: prot.name });
    p.extinction = (p.extinction || 0) + 1;
    
    if (p.mazoCards && p.mazoCards.length > 0) {
      const penalty = p.mazoCards.splice(0, Math.min(3, p.mazoCards.length));
      penalty.forEach(f => {
        const pcd = getCardData(f);
        p.extinctionCards.push({ folio: f, name: pcd.name || f });
        p.extinction++;
        logAction(`💀 ${pcd.name || f} (del Mazo) → Extinción`);
      });
      p.mazo = p.mazoCards.length;
    }
    
    // TODO: Suplente protector entry
    logAction(`📢 Suplente Protector debe entrar con 12 PV (implementar manualmente)`);
    checkVictory(targetSide);
  }
  
  clearSelection();
  saveState();
  renderInteractive();
}

function sendToExtinction(side, index) {
  const p = getPlayer(side);
  const card = p.field[index];
  if (!card || !card.folio) return;
  if (card.hp > 0 && !confirm(`¿Enviar ${card.folio} a Extinción?`)) return;
  pushUndo();
  
  // §6.4: Count equips too
  if (card.equips && card.equips.length > 0) {
    card.equips.forEach(eq => {
      p.extinctionCards.push({ folio: eq.folio, name: eq.name });
      p.extinction++;
      logAction(`💀 Equipo ${eq.name} → Extinción`);
    });
  }
  
  p.extinctionCards.push({ folio: card.folio, name: card.name || cardName(card.folio) });
  p.extinction++;
  logAction(`💀 ${fullCardName(card.folio)} → Extinción`);
  
  card.folio = null; card.name = null; card.revealed = false;
  card.hp = 0; card.rests = 0; card.equips = [];
  card.burned = false; card.poisoned = false; card.abyssed = false;
  
  if (checkVictory(side)) return;
  
  // §6.2 adapted for async: mark slot for replacement
  // If it's the owner's turn → tercia immediately
  // If it's the opponent's turn → defer to owner's next turn start
  if (side === TURN_PLAYER) {
    startReplacement(side, index);
  } else {
    card.needsReplacement = true;
    logAction(`⏳ ${getPlayer(side).name} elegirá reemplazo al inicio de su turno`);
  }
  saveState();
  renderInteractive();
}

function revealBio(side) {
  const p = getPlayer(side);
  if (!p.bio || !p.bio.folio || p.bio.revealed) return;
  pushUndo();
  p.bio.revealed = true;
  BIO_SENT_THIS_TURN = true;  // Can only reveal OR send to Ext once per turn
  logAction(`👁️ ${p.name} revela Bio: ${p.bio.name}`);
  saveState();
  renderInteractive();
}

function sendBioToExtinction(side) {
  if (!canSendBioToExtinction(side)) return;
  pushUndo();
  const p = getPlayer(side);
  const bio = p.bio;
  
  p.extinctionCards.push({ folio: bio.folio, name: bio.name });
  p.extinction++;
  BIO_SENT_THIS_TURN = true;
  
  // §2.6: Bio to Extinción → update 1 rest on all your cards
  let updated = [];
  p.field.forEach(card => {
    if (card.folio && (card.rests || 0) > 0) {
      card.rests = Math.max(0, card.rests - 1);
      updated.push(cardName(card.folio));
    }
  });
  if (p.protector && (p.protector.rests || 0) > 0) {
    p.protector.rests = Math.max(0, p.protector.rests - 1);
    updated.push('Protector');
  }
  
  logAction(`🌿 ${bio.name} → Extinción. Actualiza 1 descanso: ${updated.join(', ') || 'ninguna'}`);
  p.bio = null;
  
  checkVictory(side);
  saveState();
  renderInteractive();
}

function requestReplacement(side, index) {
  if (ACTION_MODE === 'tercia') return; // Already in tercia mode
  const p = getPlayer(side);
  const card = p.field[index];
  if (card && card.folio) return; // Slot not empty
  if (!p.mazoCards || p.mazoCards.length === 0) {
    warn('Mazo vacío — no hay reemplazo');
    return;
  }
  startReplacement(side, index);
}

// ── Replacement (Tercia) §6.2 ──────────────────────────────────────────────
function startReplacement(side, index) {
  const p = getPlayer(side);
  if (!p.mazoCards || p.mazoCards.length === 0) {
    logAction(`📦 Mazo vacío — no hay reemplazo`);
    return;
  }
  
  const drawn = p.mazoCards.splice(0, Math.min(3, p.mazoCards.length));
  p.mazo = p.mazoCards.length;
  
  TERCIA = drawn;
  TERCIA_SLOT = index;
  ACTION_MODE = 'tercia';
  SELECTED = { side, index };
  logAction(`📥 ${p.name} toma tercia: ${drawn.map(f => cardName(f)).join(', ')}`);
  renderInteractive();
}

function chooseTercia(choiceIndex) {
  if (ACTION_MODE !== 'tercia' || !SELECTED) return;
  pushUndo();
  const side = SELECTED.side;
  const p = getPlayer(side);
  const slot = TERCIA_SLOT;
  const chosen = TERCIA[choiceIndex];
  const cd = getCardData(chosen);
  
  // §6.2: Place with 6 PV
  const pos = p.field[slot].pos || slot + 1;
  p.field[slot] = {
    pos, folio: chosen, name: cd.name || chosen, energy: cd.energy || null,
    revealed: false, hp: 6, maxHp: 6, rests: 0, equips: [],
    burned: false, poisoned: false, abyssed: false
  };
  
  // §6.2: Return other 2 to bottom in chosen order (for now, auto)
  TERCIA.forEach((f, i) => {
    if (i !== choiceIndex) p.mazoCards.push(f);
  });
  p.mazo = p.mazoCards.length;
  
  logAction(`📥 ${p.name} coloca ${cd.name || chosen} (oculta, 6 PV). 2 al fondo del Mazo.`);
  
  TERCIA = [];
  TERCIA_SLOT = -1;
  clearSelection();
  saveState();
  renderInteractive();
}

// ── Equip §5.4 + §11 ──────────────────────────────────────────────────────
function startEquip(side) {
  if (PHASE !== 'equipo') { warn('Solo en Fase de Equipo'); return; }
  if (HAS_EQUIPPED) { warn('Ya equipaste este turno'); return; }
  if (!ATTACKED_THIS_TURN) { warn('§5.4: Solo puedes equipar a la carta que atacó'); return; }
  ACTION_MODE = 'equip-select';
  renderInteractive();
}

function selectEquipCard(eqIndex) {
  if (ACTION_MODE !== 'equip-select') return;
  if (!canEquip(TURN_PLAYER, eqIndex)) return;
  
  const p = getPlayer(TURN_PLAYER);
  const eq = p.equipZone[eqIndex];
  const target = p.field[ATTACKED_THIS_TURN.index];
  const eqData = getCardData(eq.folio);
  const eqType = normalizeEquipType(eqData.type || eq.type);
  
  if (!target.equips) target.equips = [];
  target.equips.push({ folio: eq.folio, name: eq.name || eqData.name, type: eqType });
  p.equipZone.splice(eqIndex, 1);
  HAS_EQUIPPED = true;
  
  logAction(`🔧 ${eq.name || eqData.name} (${eqType}) equipado a ${cardName(target.folio)}`);
  clearSelection();
  saveState();
  renderInteractive();
}

function startManualEquip(side, eqIndex) {
  MANUAL_EQUIP = { side, eqIndex };
  ACTION_MODE = 'manual-equip-target';
  logAction(`🔧 Selecciona Adendei para equipar...`);
  renderInteractive();
}

function manualEquipTarget(side, fieldIndex) {
  if (ACTION_MODE !== 'manual-equip-target' || !MANUAL_EQUIP) return;
  const p = getPlayer(MANUAL_EQUIP.side);
  const card = p.field[fieldIndex];
  if (!card || !card.folio) { warn('Slot vacío'); return; }

  pushUndo();
  const eq = p.equipZone[MANUAL_EQUIP.eqIndex];
  const eqData = getCardData(eq.folio);
  const eqType = normalizeEquipType(eqData.type || eq.type);

  if (!card.equips) card.equips = [];
  card.equips.push({ folio: eq.folio, name: eq.name || eqData.name, type: eqType });
  p.equipZone.splice(MANUAL_EQUIP.eqIndex, 1);

  logAction(`🔧 ${eq.name || eqData.name} (${eqType}) equipado manualmente a ${cardName(card.folio)}`);
  MANUAL_EQUIP = null;
  clearSelection();
  saveState();
  renderInteractive();
}

function normalizeEquipType(t) {
  if (t === 'Equipo-Rot' || t === 'Rot') return 'Rot';
  return 'Ixim';
}

// ── Vínculo Odémico §6.3 ──────────────────────────────────────────────────
function startVinculo(side) {
  if (side !== TURN_PLAYER) return;
  if (PHASE !== 'batalla') { warn('Vínculo solo en Fase de Batalla'); return; }
  if (HAS_ATTACKED) { warn('§6.3: Ya atacaste — no puedes usar Vínculo'); return; }
  if (VINCULO_USED) { warn('Ya usaste Vínculo este turno'); return; }
  
  const prot = getPlayer(side).protector;
  if (!prot || (prot.rests || 0) > 0) { warn('Protector no disponible (en descanso)'); return; }
  if ((prot.hp || 0) <= 0) { warn('Protector destruido'); return; }
  
  ACTION_MODE = 'vinculo-select';
  logAction(`🔗 Selecciona Adendei disponible para Vínculo Odémico...`);
  renderInteractive();
}

function resolveVinculo(side, index) {
  if (ACTION_MODE !== 'vinculo-select') return;
  const card = getPlayer(side).field[index];
  if (!card || !isAvailable(card)) { warn('Carta no disponible para Vínculo'); return; }
  pushUndo();
  const prot = getPlayer(side).protector;
  VINCULO_USED = true;
  VINCULO_LINKED_INDEX = index; // Track which Adendei was linked
  HAS_ATTACKED = true; // §6.3: Can't attack after vinculo
  
  logAction(`🔗 Vínculo Odémico: ${prot.name} ↔ ${cardName(card.folio)} — efecto del Protector aplicado`);
  logAction(`📢 Aplicar efecto del Protector manualmente`);
  
  clearSelection();
  saveState();
  renderInteractive();
}

// ── Phase Navigation ───────────────────────────────────────────────────────
// Auto-toggle equip sections: open on equipo phase, collapse on all others
function _autoToggleEquip() {
  if (PHASE === 'equipo') {
    const key = `equip-${TURN_PLAYER}`;
    if (!_openSections.has(key)) {
      _openSections.add(key);
    }
  } else {
    ['equip-alpha', 'equip-beta'].forEach(key => _openSections.delete(key));
  }
  localStorage.setItem('kodem_open_sections', JSON.stringify([..._openSections]));
}

function goToPhase(phaseId) {
  const idx = PHASES.indexOf(phaseId);
  if (idx < 0) return;
  pushUndo();
  clearSelection();
  PHASE = phaseId;
  if (PHASE === 'post') autoSweepDead();
  if (PHASE === 'fin') resolveEndOfTurn();
  _autoToggleEquip();
  VIOLATIONS = [];
  saveState();
  renderInteractive();
  logAction(`➡️ Fase: ${PHASE}`);
}

function prevPhase() {
  const idx = PHASES.indexOf(PHASE);
  if (idx <= 0) { logAction('⚠️ Ya estás en la primera fase'); renderInteractive(); return; }
  pushUndo();
  clearSelection();
  PHASE = PHASES[idx - 1];
  // Auto-collapse/expand equip based on phase
  _autoToggleEquip();
  VIOLATIONS = [];
  saveState();
  renderInteractive();
  logAction(`◀️ Regresando a fase: ${PHASE}`);
}

function nextPhase() {
  pushUndo();
  clearSelection();
  
  // Validate phase transition
  if (PHASE === 'batalla' && !HAS_ATTACKED && !VINCULO_USED) {
    // OK to skip — not mandatory
  }
  
  const idx = PHASES.indexOf(PHASE);
  if (idx < PHASES.length - 1) {
    PHASE = PHASES[idx + 1];
    if (PHASE === 'post') autoSweepDead();
    _autoToggleEquip();
    if (PHASE === 'fin') resolveEndOfTurn();
  } else {
    endTurn();
  }
  VIOLATIONS = []; // Clear violations for new phase
  saveState();
  renderInteractive();
}

function endTurn() {
  pushUndo();
  const p = getPlayer(TURN_PLAYER);
  
  // §5.5.6: Update rests
  p.field.forEach((card, i) => {
    if (!card.folio || card.hp <= 0) return;
    const wasAttacker = ATTACKED_THIS_TURN && ATTACKED_THIS_TURN.side === TURN_PLAYER && ATTACKED_THIS_TURN.index === i;
    if (wasAttacker) {
      // Attacker rests already applied on attack — skip
      return;
    }
    if ((card.rests || 0) > 0) {
      card.rests = Math.max(0, card.rests - 1);
      if (card.rests === 0) logAction(`✅ ${cardName(card.folio)} disponible`);
    }
  });
  
  // §6.3: Vínculo → Protector 3 rests, linked Adendei 1 rest
  if (VINCULO_USED) {
    p.protector.rests = 3;
    logAction(`💤 Protector → 3 descansos`);
    if (VINCULO_LINKED_INDEX != null && p.field[VINCULO_LINKED_INDEX] && p.field[VINCULO_LINKED_INDEX].folio) {
      p.field[VINCULO_LINKED_INDEX].rests = (p.field[VINCULO_LINKED_INDEX].rests || 0) + 1;
      logAction(`💤 ${cardName(p.field[VINCULO_LINKED_INDEX].folio)} → +1 descanso (Vínculo)`);
    }
  }
  
  // §2.2: Protector rest update
  if (p.protector && (p.protector.rests || 0) > 0 && !VINCULO_USED) {
    p.protector.rests = Math.max(0, p.protector.rests - 1);
    if (p.protector.rests === 0) logAction(`✅ Protector disponible`);
  }
  
  // §5.5.4: Poison damage
  p.field.forEach(card => {
    if (card.folio && card.poisoned && card.hp > 0) {
      card.hp = Math.max(0, card.hp - 1);
      logAction(`☠️ Veneno: ${cardName(card.folio)} −1 (${card.hp} PV)`);
      if (card.hp <= 0) logAction(`💀 ${cardName(card.folio)} muere por veneno`);
    }
  });
  
  // Switch turn
  GAME.turn = (GAME.turn || 1) + 1;
  TURN_PLAYER = getRivalSide(TURN_PLAYER);
  GAME.activePlayer = TURN_PLAYER;
  PHASE = 'previa';
  SELECTED = null; ACTION_MODE = null;
  HAS_ATTACKED = false; HAS_EQUIPPED = false;
  VINCULO_USED = false; BIO_SENT_THIS_TURN = false;
  ATTACKED_THIS_TURN = null; VIOLATIONS = [];
  
  TURN_LOG = [];
  logAction(`═══ Turno ${GAME.turn} — ${getPlayer(TURN_PLAYER).name} ═══`);
}

// ── Auto-sweep: send all 0-HP cards to Extinción on Post phase ─────────────
function autoSweepDead() {
  for (const side of ['alpha', 'beta']) {
    const p = getPlayer(side);
    for (let i = 0; i < p.field.length; i++) {
      const card = p.field[i];
      if (!card.folio || card.hp > 0) continue;
      
      // Send equips to extinction
      if (card.equips && card.equips.length > 0) {
        card.equips.forEach(eq => {
          p.extinctionCards.push({ folio: eq.folio, name: eq.name });
          p.extinction++;
          logAction(`💀 Equipo ${eq.name} → Extinción`);
        });
      }
      
      p.extinctionCards.push({ folio: card.folio, name: card.name || cardName(card.folio) });
      p.extinction++;
      logAction(`💀 ${fullCardName(card.folio)} → Extinción (0 PV)`);
      
      // Clear slot
      const pos = card.pos;
      card.folio = null; card.name = null; card.revealed = false;
      card.hp = 0; card.rests = 0; card.equips = [];
      card.burned = false; card.poisoned = false; card.abyssed = false;
      
      if (checkVictory(side)) return;
      
      // §6.2 async: immediate tercia if owner's turn, defer otherwise
      if (side === TURN_PLAYER) {
        startReplacement(side, i);
        if (ACTION_MODE === 'tercia') return; // Wait for user to choose
      } else {
        card.needsReplacement = true;
        logAction(`⏳ ${p.name} elegirá reemplazo al inicio de su turno`);
      }
    }
  }
}

function resolveEndOfTurn() {
  const p = getPlayer(TURN_PLAYER);
  // Auto-check for 0 HP cards
  p.field.forEach((card, i) => {
    if (card.folio && card.hp <= 0) {
      logAction(`⚠️ ${cardName(card.folio)} tiene 0 PV — enviar a Extinción en Fase Post`);
    }
  });
}

// ── Victory Check §6.4 ────────────────────────────────────────────────────
function checkVictory(side) {
  const p = getPlayer(side);
  if (p.extinction >= 10) {
    const winner = getRival(side);
    GAME.phase = `🏆 ${winner.name} GANA`;
    logAction(`🏆 ¡${winner.name} GANA! ${p.name} tiene ${p.extinction} en Extinción`);
    return true;
  }
  return false;
}

// ── Manual Adjustments ─────────────────────────────────────────────────────
function manualDamage(side, index, amount) {
  const card = getPlayer(side).field[index];
  if (!card || !card.folio) return;
  pushUndo();
  
  // §8: Can't heal above max (6), can't heal at 0 PV
  if (amount > 0) {
    if (card.hp <= 0) { warn('§8: No se puede curar a carta con 0 PV'); return; }
    if (card.hp >= (card.maxHp || 6)) { warn('§8: Ya tiene vida máxima'); return; }
  }
  
  const prev = card.hp;
  card.hp = Math.max(0, Math.min(card.maxHp || 6, card.hp + amount));
  const action = amount > 0 ? `+${amount} PV` : `${amount} PV`;
  logAction(`✏️ ${cardName(card.folio)} ${action} (${prev}→${card.hp})`);
  saveState();
  renderInteractive();
}

function revealProtector(side) {
  pushUndo();
  const prot = getPlayer(side).protector;
  if (!prot || prot.revealed) return;
  prot.revealed = true;
  logAction(`👁️ ${prot.name} revelado`);
  saveState();
  renderInteractive();
}

function manualProtDamage(side, amount) {
  pushUndo();
  const prot = getPlayer(side).protector;
  if (!prot) return;
  const prev = prot.hp;
  prot.hp = Math.max(0, Math.min(prot.maxHp || 12, prot.hp + amount));
  logAction(`✏️ Protector ${prot.name} ${amount > 0 ? '+' : ''}${amount} PV (${prev}→${prot.hp})`);
  saveState();
  renderInteractive();
}

function adjustProtRest(side, delta) {
  pushUndo();
  const prot = getPlayer(side).protector;
  if (!prot) return;
  const prev = prot.rests;
  prot.rests = Math.max(0, prot.rests + delta);
  logAction(`🛡️ Protector ${prot.name} ${delta > 0 ? '+' : ''}${delta}R (${prev}→${prot.rests}R)`);
  if (prot.rests === 0 && prev > 0) logAction(`✅ Protector disponible`);
  saveState();
  renderInteractive();
}

function clearMarks(side, index) {
  const card = getPlayer(side).field[index];
  if (!card || !card.folio) return;
  pushUndo();
  const removed = [];
  if (card.burned) { card.burned = false; removed.push('🔥'); }
  if (card.poisoned) { card.poisoned = false; removed.push('☠️'); }
  if (card.abyssed) { card.abyssed = false; removed.push('🌀'); }
  if (card.marks) { card.marks.burn = false; card.marks.poison = false; card.marks.abysm = false; }
  if (removed.length > 0) {
    logAction(`🧹 ${cardName(card.folio)} pierde marcas: ${removed.join(' ')}`);
  }
  saveState();
  renderInteractive();
}

function toggleMark(side, index, mark) {
  const card = getPlayer(side).field[index];
  if (!card || !card.folio) return;
  pushUndo();
  
  // Map mark names to marks object keys
  const markMap = { 'burned': 'burn', 'poisoned': 'poison', 'abyssed': 'abysm' };
  const markKey = markMap[mark] || mark;
  
  // §7: Can't receive same mark twice
  if (card[mark]) {
    card[mark] = false;
    if (card.marks) card.marks[markKey] = false;
    const emoji = mark === 'burned' ? '🔥' : mark === 'poisoned' ? '☠️' : '🌀';
    logAction(`${emoji} ${cardName(card.folio)} pierde ${mark === 'burned' ? 'quemadura' : mark === 'poisoned' ? 'veneno' : 'abismar'}`);
  } else {
    card[mark] = true;
    if (!card.marks) card.marks = { burn: false, poison: false, abysm: false };
    card.marks[markKey] = true;
    const emoji = mark === 'burned' ? '🔥' : mark === 'poisoned' ? '☠️' : '🌀';
    logAction(`${emoji} ${cardName(card.folio)} recibe ${mark === 'burned' ? 'quemadura' : mark === 'poisoned' ? 'veneno' : 'abismar'}`);
  }
  saveState();
  renderInteractive();
}

function manualScale(side, index, amount) {
  const card = getPlayer(side).field[index];
  if (!card || !card.folio) return;
  pushUndo();
  
  const cd = getCardData(card.folio);
  const baseDmg = safeInt(cd.damage);
  if (baseDmg === 0 && amount > 0) { warn('§8: Escalar solo aplica a cartas con ≥1 daño'); return; }
  
  card.scaledDmg = (card.scaledDmg || 0) + amount;
  const total = baseDmg + card.scaledDmg;
  logAction(`${amount > 0 ? '⬆️' : '⬇️'} ${cardName(card.folio)} ${amount > 0 ? 'escala' : 'desciende'} ${Math.abs(amount)} (daño: ${total})`);
  saveState();
  renderInteractive();
}

function passTurn() {
  pushUndo();
  logAction(`⏭️ ${getPlayer(TURN_PLAYER).name} pasa el turno`);
  PHASE = 'fin';
  resolveEndOfTurn();
  saveState();
  renderInteractive();
}

function clearSelection() {
  SELECTED = null;
  ACTION_MODE = null;
  MANUAL_EQUIP = null;
}

function closeTercia() {
  // Return drawn cards to top of mazo (undo the draw)
  if (TERCIA.length > 0 && SELECTED) {
    const p = getPlayer(SELECTED.side);
    p.mazoCards.unshift(...TERCIA);
    p.mazo = p.mazoCards.length;
  }
  TERCIA = [];
  TERCIA_SLOT = -1;
  clearSelection();
  saveState();
  renderInteractive();
}

function undoAction() {
  if (UNDO_STACK.length === 0) { logAction('⚠️ No hay acciones para deshacer'); renderInteractive(); return; }
  const prev = JSON.parse(UNDO_STACK.pop());
  GAME = prev.game; TURN_PLAYER = prev.turnPlayer; PHASE = prev.phase;
  HAS_ATTACKED = prev.hasAttacked || false;
  HAS_EQUIPPED = prev.hasEquipped || false;
  VINCULO_USED = prev.vinculoUsed || false;
  VINCULO_LINKED_INDEX = prev.vinculoLinkedIndex ?? null;
  BIO_SENT_THIS_TURN = prev.bioSent || false;
  ATTACKED_THIS_TURN = prev.attackedThisTurn;
  RAVA_RETURNED_THIS_GAME = prev.ravaReturned || {};
  TURN_LOG = prev.turnLog || [];
  GAME_LOG = prev.gameLog || GAME_LOG;
  VIOLATIONS = prev.violations || [];
  SELECTED = null; ACTION_MODE = null;
  logAction('↩️ Acción deshecha');
  localStorage.setItem('kodem_board_state', JSON.stringify(prev));
  renderInteractive();
}