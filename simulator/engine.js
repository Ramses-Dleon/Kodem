'use strict';

/**
 * engine.js — Kódem TCG Battle Engine
 *
 * Pure functions, immutable state, zero dependencies.
 * Rules source: Rulebook v5.0 + Breve Guía (saved 2026-03-17)
 *
 * Phase flow: previa → batalla → post → equipo → fin
 * Victory: 10 cards in opponent extinction zone
 */

const { getCard } = require('./cards-loader');

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

const PHASES = ['previa', 'batalla', 'post', 'equipo', 'fin'];
const VICTORY_THRESHOLD = 10;
const ADENDEI_MAX_HP = 6;
const PROTECTOR_MAX_HP = 12;
const PROTECTOR_RESTS = 3;
const FIELD_SIZE = 3;
const ADENDEI_MAX_RESTS = 2;

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function clone(obj) {
  return structuredClone(obj);
}

function makeFieldCard(folio, pos) {
  const cardData = getCard(folio);
  return {
    pos,
    folio,
    hp: ADENDEI_MAX_HP,
    maxHp: ADENDEI_MAX_HP,
    rests: 0,
    revealed: false,
    equips: [],           // [{ folio, revealed }]
    marks: [],            // ['quemar','envenenar','abismar']
    available: true,
    attackedThisTurn: false,
    usedActivaThisTurn: false,
    startsRest: 0,        // rests at start of turn (for end-of-turn update)
    _damage: cardData ? (cardData.damage || 0) : 0,
    _rests:  cardData ? (cardData.rests  || 0) : 0,
    _type:   cardData ? cardData.type : 'Adendei',
    _name:   cardData ? cardData.name : folio,
    _damageBonus: 0,      // accumulated stat changes
  };
}

function makeProtector(folio) {
  const cardData = getCard(folio);
  return {
    folio,
    hp: PROTECTOR_MAX_HP,
    maxHp: PROTECTOR_MAX_HP,
    rests: PROTECTOR_RESTS,
    revealed: false,
    equips: [],
    available: false,  // starts with 3 rests
    attackedThisTurn: false,
    usedVinculo: false,
    startsRest: PROTECTOR_RESTS,
    _name: cardData ? cardData.name : folio,
  };
}

function makeEquipEntry(folio) {
  return { folio, revealed: false };
}

function makeBio(folio) {
  if (!folio) return null;
  return { folio, revealed: false };
}

function isAvailable(card) {
  return card.rests === 0 && card.hp > 0;
}

function countExtinction(player) {
  return player.extinction.filter(f => {
    const c = getCard(f);
    return !c || c.type !== 'Token';
  }).length;
}

function checkVictory(state) {
  if (countExtinction(state.p2) >= VICTORY_THRESHOLD) return 'p1';
  if (countExtinction(state.p1) >= VICTORY_THRESHOLD) return 'p2';
  return null;
}

function opponent(playerKey) {
  return playerKey === 'p1' ? 'p2' : 'p1';
}

// Compute effective damage for a field card (base + bonuses)
function computeDamage(fieldCard) {
  return (fieldCard._damage || 0) + (fieldCard._damageBonus || 0);
}

// Draw tercia (up to 3 cards) from top of mazo
function drawTercia(state, playerKey) {
  const player = state[playerKey];
  const drawn = player.mazo.slice(0, FIELD_SIZE);
  return drawn;
}

// Apply the draw (remove from mazo)
function consumeTercia(state, playerKey) {
  const s = clone(state);
  s[playerKey].mazo = s[playerKey].mazo.slice(FIELD_SIZE);
  return s;
}

// ─────────────────────────────────────────────────────────────────────────────
// SEEDED PRNG (for abismar)
// ─────────────────────────────────────────────────────────────────────────────

function mulberry32(seed) {
  let s = seed;
  return function() {
    s |= 0; s = s + 0x6D2B79F5 | 0;
    let t = Math.imul(s ^ s >>> 15, 1 | s);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// UNRESOLVED EFFECT LOG
// ─────────────────────────────────────────────────────────────────────────────

const UNRESOLVED_LOG = [];

function logUnresolved(source, text) {
  const entry = `[${source}]: ${text}`;
  if (!UNRESOLVED_LOG.includes(entry)) UNRESOLVED_LOG.push(entry);
}

// ─────────────────────────────────────────────────────────────────────────────
// EFFECT RESOLVER
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Try to parse and apply simple effect text patterns.
 * Returns { newState, events }.
 */
function resolveEffect(state, effectText, sourceKey, sourcePos, opts) {
  if (!effectText) return { newState: state, events: [] };
  opts = opts || {};
  const events = [];
  let s = clone(state);
  const text = effectText.toLowerCase();
  const oppKey = opponent(sourceKey);

  // ── "daña X pto(s). a [un] [adendei/carta] rival" ──
  const dañaOneMatch = text.match(/da[ñn]a?\s+(\d+)\s+ptos?\.?\s+a\s+(?:un\s+)?(?:adendei|carta)\s+rival/);
  if (dañaOneMatch) {
    const dmg = parseInt(dañaOneMatch[1]);
    let target = null;
    if (opts.targetPos !== undefined) {
      target = s[oppKey].field.find(fc => fc.pos === opts.targetPos && fc.hp > 0);
    } else {
      target = s[oppKey].field.filter(fc => fc.hp > 0).sort((a,b) => a.hp - b.hp)[0];
    }
    if (target) {
      const idx = s[oppKey].field.findIndex(fc => fc.pos === target.pos);
      s[oppKey].field[idx] = { ...s[oppKey].field[idx], hp: Math.max(0, target.hp - dmg) };
      events.push(`EFFECT: ${dmg} damage → ${oppKey}:${target.pos} (${target.folio})`);
    }
    return { newState: s, events };
  }

  // ── "daña X ptos. hasta a N adendei rivales" ──
  const dañaMultiMatch = text.match(/da[ñn]a?\s+(\d+)\s+ptos?\.?\s+hasta\s+a\s+(\d+)\s+adendei\s+rival/);
  if (dañaMultiMatch) {
    const dmg = parseInt(dañaMultiMatch[1]);
    const count = parseInt(dañaMultiMatch[2]);
    const targets = s[oppKey].field.filter(fc => fc.hp > 0).slice(0, count);
    for (const t of targets) {
      const idx = s[oppKey].field.findIndex(fc => fc.pos === t.pos);
      s[oppKey].field[idx] = { ...s[oppKey].field[idx], hp: Math.max(0, t.hp - dmg) };
      events.push(`EFFECT: ${dmg} damage → ${oppKey}:${t.pos}`);
    }
    return { newState: s, events };
  }

  // ── "cura X pto. a [un] adendei/carta aliada" ──
  const curaMatch = text.match(/cura\s+(\d+)\s+pto/);
  if (curaMatch) {
    const heal = parseInt(curaMatch[1]);
    let target = null;
    if (opts.targetPos !== undefined) {
      target = s[sourceKey].field.find(fc => fc.pos === opts.targetPos && fc.hp > 0 && fc.hp < fc.maxHp);
    } else {
      target = s[sourceKey].field.filter(fc => fc.hp > 0 && fc.hp < fc.maxHp).sort((a,b) => a.hp - b.hp)[0];
    }
    if (target) {
      const idx = s[sourceKey].field.findIndex(fc => fc.pos === target.pos);
      s[sourceKey].field[idx] = { ...s[sourceKey].field[idx], hp: Math.min(target.maxHp, target.hp + heal) };
      events.push(`EFFECT: Healed ${heal} → ${sourceKey}:${target.pos}`);
    }
    return { newState: s, events };
  }

  // ── "los adendei rivales reciben X descanso" ──
  const allRestMatch = text.match(/los\s+adendei\s+rivales\s+reciben\s+(\d+)\s+descanso/);
  if (allRestMatch) {
    const rests = parseInt(allRestMatch[1]);
    s[oppKey].field = s[oppKey].field.map(fc => {
      if (fc.hp <= 0) return fc;
      const newR = Math.min(ADENDEI_MAX_RESTS, fc.rests + rests);
      return { ...fc, rests: newR, available: newR === 0 };
    });
    events.push(`EFFECT: All ${oppKey} Adendei +${rests} rests`);
    return { newState: s, events };
  }

  // ── "recibe X descanso(s)" (targeted) ──
  const descMatch = text.match(/recibe\s+(\d+)\s+descanso/);
  if (descMatch && opts.targetKey && opts.targetPos !== undefined) {
    const rests = parseInt(descMatch[1]);
    const tk = opts.targetKey;
    const idx = s[tk].field.findIndex(fc => fc.pos === opts.targetPos);
    if (idx !== -1) {
      const newR = Math.min(ADENDEI_MAX_RESTS, s[tk].field[idx].rests + rests);
      s[tk].field[idx] = { ...s[tk].field[idx], rests: newR, available: newR === 0 };
      events.push(`EFFECT: +${rests} rests → ${tk}:${opts.targetPos}`);
    }
    return { newState: s, events };
  }

  // ── "quema/queme X adendei rival" ──
  const quemaMatch = text.match(/quem[ae]\s+(\d+)?\s*adendei\s+rival/);
  if (quemaMatch) {
    const count = parseInt(quemaMatch[1] || '1');
    const targets = s[oppKey].field
      .filter(fc => fc.hp > 0 && fc.revealed && !fc.marks.includes('quemar'))
      .slice(0, count);
    for (const t of targets) {
      const idx = s[oppKey].field.findIndex(fc => fc.pos === t.pos);
      s[oppKey].field[idx] = { ...s[oppKey].field[idx], marks: [...s[oppKey].field[idx].marks, 'quemar'] };
      events.push(`EFFECT: Burn mark → ${oppKey}:${t.pos}`);
    }
    return { newState: s, events };
  }

  // ── "envenena X carta/adendei rival" ──
  const envMatch = text.match(/envenena\s+(\d+)?\s*(?:carta\s+y\s+\d+\s+)?(?:adendei|carta)\s+rival/);
  if (envMatch) {
    const count = parseInt(envMatch[1] || '1');
    const targets = s[oppKey].field
      .filter(fc => fc.hp > 0 && !fc.marks.includes('envenenar'))
      .slice(0, count);
    for (const t of targets) {
      const idx = s[oppKey].field.findIndex(fc => fc.pos === t.pos);
      s[oppKey].field[idx] = { ...s[oppKey].field[idx], marks: [...s[oppKey].field[idx].marks, 'envenenar'] };
      events.push(`EFFECT: Poison mark → ${oppKey}:${t.pos}`);
    }
    return { newState: s, events };
  }

  // ── Unresolved ──
  logUnresolved(`${sourceKey}:${sourcePos}`, effectText.substring(0, 80));
  events.push(`UNRESOLVED: ${effectText.substring(0, 60)}`);
  return { newState: s, events };
}

// ─────────────────────────────────────────────────────────────────────────────
// INIT GAME
// ─────────────────────────────────────────────────────────────────────────────

/**
 * deckConfig = {
 *   name: string,
 *   mazo: [folios in order],   // first 3 go to field as hidden
 *   protector: folio,
 *   equips: [folios],
 *   bio: folio|null
 * }
 */
function initGame(deckConfig1, deckConfig2) {
  function buildPlayer(cfg, key) {
    const mazo = [...cfg.mazo];
    // Place first 3 as hidden field cards
    const fieldFolios = mazo.splice(0, FIELD_SIZE);
    const field = fieldFolios.map((f, i) => makeFieldCard(f, i + 1));

    return {
      name: cfg.name || key,
      protector: makeProtector(cfg.protector),
      field,
      mazo,
      equipZone: (cfg.equips || []).map(makeEquipEntry),
      bio: makeBio(cfg.bio || null),
      extinction: [],
      usedBioExtinction: false,
      usedRavaReturn: false,
      attackerThisTurn: null,
      vinculoUsed: false,
    };
  }

  const state = {
    turn: 1,
    activePlayer: 'p1',
    phase: 'previa',
    winner: null,
    _prngState: 42,
    p1: buildPlayer(deckConfig1, 'p1'),
    p2: buildPlayer(deckConfig2, 'p2'),
    log: [],
    pendingReplacement: null,
    pendingActivaRapida: null,
    attackDeclared: false,
  };

  // Snapshot start-of-turn rests
  for (const pk of ['p1','p2']) {
    for (const fc of state[pk].field) {
      fc.startsRest = fc.rests;
    }
    state[pk].protector.startsRest = state[pk].protector.rests;
  }

  return state;
}

// ─────────────────────────────────────────────────────────────────────────────
// GET LEGAL ACTIONS
// ─────────────────────────────────────────────────────────────────────────────

function getLegalActions(state, playerKey) {
  if (state.winner) return [{ type: 'pass' }];

  const player = state[playerKey];
  const oppKey = opponent(playerKey);
  const opp = state[oppKey];
  const actions = [];
  const phase = state.phase;

  // ── PREVIA ──
  if (phase === 'previa') {
    // Forced replacement
    if (state.pendingReplacement && state.pendingReplacement.playerKey === playerKey) {
      const pr = state.pendingReplacement;
      for (const f of pr.tercia) {
        const others = pr.tercia.filter(x => x !== f);
        actions.push({ type: 'replace', pos: pr.pos, chosen: f, returnOrder: others });
      }
      if (actions.length === 0) {
        // Mazo empty, pass
        actions.push({ type: 'pass' });
      }
      return actions;
    }

    // Reveal hidden field cards
    for (const fc of player.field) {
      if (!fc.revealed && fc.hp > 0) {
        actions.push({ type: 'reveal', pos: fc.pos });
      }
    }
    // Reveal protector
    if (!player.protector.revealed) {
      actions.push({ type: 'revealProtector' });
    }
    // Reveal equips
    for (const eq of player.equipZone) {
      if (!eq.revealed) {
        actions.push({ type: 'revealEquip', folio: eq.folio });
      }
    }
    // Reveal bio
    if (player.bio && !player.bio.revealed) {
      actions.push({ type: 'revealBio' });
    }
    // Send bio to extinction (once per game, must be revealed)
    if (player.bio && player.bio.revealed && !player.usedBioExtinction) {
      actions.push({ type: 'sendBioToExtinction' });
    }
    // Return Rava from field (once per game)
    if (!player.usedRavaReturn) {
      for (const fc of player.field) {
        const c = getCard(fc.folio);
        if (c && c.type === 'Rava' && fc.hp > 0) {
          actions.push({ type: 'ravaReturn', pos: fc.pos });
        }
      }
    }
    actions.push({ type: 'pass' });
    return actions;
  }

  // ── BATALLA ──
  if (phase === 'batalla') {
    // Activa-Rápida response window
    if (state.pendingActivaRapida && state.pendingActivaRapida.responseKey === playerKey) {
      for (const fc of player.field) {
        if (!fc.revealed || fc.hp <= 0) continue;
        if (!isAvailable(fc)) continue;
        const cardData = getCard(fc.folio);
        if (cardData && cardData.effect_type && cardData.effect_type.includes('Activa-Rápida')) {
          actions.push({ type: 'activaRapida', pos: fc.pos });
        }
      }
      actions.push({ type: 'pass' });
      return actions;
    }

    // Only active player acts in battle
    if (playerKey !== state.activePlayer) {
      return [{ type: 'pass' }];
    }

    const alreadyActed = player.attackerThisTurn !== null || player.vinculoUsed;

    if (!alreadyActed) {
      // Attacks from field cards
      for (const fc of player.field) {
        if (!isAvailable(fc)) continue;

        // Attack field cards
        for (const target of opp.field) {
          if (target.hp <= 0) continue;
          actions.push({ type: 'attack', attackerPos: fc.pos, targetPos: target.pos });
        }
        // Attack protector (only if revealed)
        if (opp.protector.revealed && opp.protector.hp > 0) {
          actions.push({ type: 'attack', attackerPos: fc.pos, targetPos: 'protector' });
        }

        // Use Activa (revealed cards only)
        if (fc.revealed) {
          const cardData = getCard(fc.folio);
          if (cardData && cardData.effect_type) {
            const et = cardData.effect_type;
            if (et.includes('Activa') && !et.includes('Rápida')) {
              actions.push({ type: 'useActiva', pos: fc.pos });
            }
          }
        }
      }

      // Vínculo Odémico
      if (player.protector.revealed && isAvailable(player.protector)) {
        for (const fc of player.field) {
          if (fc.revealed && isAvailable(fc) && fc.hp > 0) {
            const c = getCard(fc.folio);
            if (!c || c.type === 'Adendei') {
              actions.push({ type: 'vinculo', adendeiPos: fc.pos });
            }
          }
        }
      }
    }

    actions.push({ type: 'pass' });
    return actions;
  }

  // ── POST ──
  if (phase === 'post') {
    if (state.pendingReplacement && state.pendingReplacement.playerKey === playerKey) {
      const pr = state.pendingReplacement;
      for (const f of pr.tercia) {
        const others = pr.tercia.filter(x => x !== f);
        actions.push({ type: 'replace', pos: pr.pos, chosen: f, returnOrder: others });
      }
      if (actions.length === 0) actions.push({ type: 'pass' });
      return actions;
    }
    actions.push({ type: 'pass' });
    return actions;
  }

  // ── EQUIPO ──
  if (phase === 'equipo') {
    const attackerPos = player.attackerThisTurn;
    if (attackerPos !== null && attackerPos !== 'protector') {
      const attacker = player.field.find(fc => fc.pos === attackerPos);
      if (attacker && attacker.hp > 0) {
        const ixims = attacker.equips.filter(eq => {
          const c = getCard(eq.folio); return c && c.type === 'Ixim';
        }).length;
        const rots = attacker.equips.filter(eq => {
          const c = getCard(eq.folio); return c && c.type === 'Rot';
        }).length;

        for (const eq of player.equipZone) {
          const eqCard = getCard(eq.folio);
          if (!eqCard) continue;
          if (eqCard.type === 'Ixim' && ixims >= 1) continue;
          if (eqCard.type === 'Rot' && rots >= 1) continue;

          // cost_text name restriction
          const ct = (eqCard.cost_text || '').toLowerCase();
          const nameMatch = ct.match(/solo puede ser equipada?\s+a\s+(?:un\s+)?adendei\s+"([^"]+)"/);
          if (nameMatch) {
            const allowedName = nameMatch[1].toLowerCase();
            const attackerCard = getCard(attacker.folio);
            const attackerName = attackerCard ? attackerCard.name.toLowerCase() : '';
            if (!attackerName.startsWith(allowedName)) continue;
          }

          actions.push({ type: 'equip', equipFolio: eq.folio, targetPos: attackerPos });
        }
      }
    }
    actions.push({ type: 'pass' });
    return actions;
  }

  // ── FIN ──
  actions.push({ type: 'pass' });
  return actions;
}

// ─────────────────────────────────────────────────────────────────────────────
// APPLY ACTION
// ─────────────────────────────────────────────────────────────────────────────

function applyAction(state, action, playerKey) {
  let s = clone(state);
  const events = [];
  const player = s[playerKey];
  const oppKey = opponent(playerKey);
  const opp = s[oppKey];

  switch (action.type) {

    // ── PASS ──
    case 'pass': {
      events.push(`${playerKey} passes ${s.phase}`);
      break;
    }

    // ── PREVIA: REVEALS ──
    case 'reveal': {
      const idx = player.field.findIndex(fc => fc.pos === action.pos);
      if (idx === -1) break;
      player.field[idx] = { ...player.field[idx], revealed: true };
      const fc = player.field[idx];
      events.push(`REVEAL: ${playerKey}:${action.pos} → ${fc.folio} (${fc._name})`);

      // Bio trigger: check Caldera Submarina
      if (player.bio && player.bio.revealed) {
        const bioCard = getCard(player.bio.folio);
        if (bioCard) {
          const bt = (bioCard.effect_text || '').toLowerCase();
          const revCard = getCard(fc.folio);
          if (bt.includes('pírico') && bt.includes('revela') &&
              revCard && revCard.energy === 'Pírica') {
            const target = opp.field.find(tf => tf.hp > 0 && tf.revealed && !tf.marks.includes('quemar'));
            if (target) {
              const ti = s[oppKey].field.findIndex(f => f.pos === target.pos);
              s[oppKey].field[ti] = {
                ...s[oppKey].field[ti],
                marks: [...s[oppKey].field[ti].marks, 'quemar']
              };
              events.push(`BIO: Caldera Submarina burns ${oppKey}:${target.pos}`);
            }
          }
        }
      }
      break;
    }

    case 'revealProtector': {
      player.protector = { ...player.protector, revealed: true };
      events.push(`REVEAL: ${playerKey} Protector ${player.protector.folio}`);
      break;
    }

    case 'revealEquip': {
      const idx = player.equipZone.findIndex(eq => eq.folio === action.folio);
      if (idx !== -1) {
        player.equipZone[idx] = { ...player.equipZone[idx], revealed: true };
        events.push(`REVEAL: ${playerKey} equip ${action.folio}`);
      }
      break;
    }

    case 'revealBio': {
      if (player.bio) {
        player.bio = { ...player.bio, revealed: true };
        events.push(`REVEAL: ${playerKey} Bio ${player.bio.folio}`);
      }
      break;
    }

    // ── SEND BIO TO EXTINCTION ──
    case 'sendBioToExtinction': {
      if (player.bio && player.bio.revealed) {
        const bioFolio = player.bio.folio;
        player.extinction = [...player.extinction, bioFolio];
        player.bio = null;
        player.usedBioExtinction = true;
        // -1 rest from all field cards
        player.field = player.field.map(fc => {
          if (fc.hp <= 0) return fc;
          const newR = Math.max(0, fc.rests - 1);
          return { ...fc, rests: newR, available: newR === 0 };
        });
        events.push(`BIO_EXT: ${playerKey} Bio ${bioFolio} → Extinction. All cards -1 rest`);
      }
      break;
    }

    // ── RAVA RETURN ──
    case 'ravaReturn': {
      if (!player.usedRavaReturn) {
        const idx = player.field.findIndex(fc => fc.pos === action.pos);
        if (idx !== -1) {
          const folio = player.field[idx].folio;
          // Remove from field
          player.field = player.field.filter((_, i) => i !== idx);
          // Add to bottom of mazo
          player.mazo = [...player.mazo, folio];
          player.usedRavaReturn = true;
          events.push(`RAVA_RETURN: ${playerKey}:${action.pos} ${folio} → mazo bottom`);
          // Trigger replacement
          const result = triggerReplacement(s, playerKey, action.pos);
          s = result.newState;
          events.push(...result.events);
        }
      }
      break;
    }

    // ── REPLACE ──
    case 'replace': {
      const pr = s.pendingReplacement;
      if (!pr) break;
      const { chosen, returnOrder, pos } = action;

      const newCard = makeFieldCard(chosen, pos);
      newCard.revealed = action.revealed || false;

      const existingIdx = s[pr.playerKey].field.findIndex(fc => fc.pos === pos);
      if (existingIdx !== -1) {
        s[pr.playerKey].field[existingIdx] = newCard;
      } else {
        s[pr.playerKey].field = [...s[pr.playerKey].field, newCard];
      }

      // Return 2 others to bottom of mazo (in chosen order)
      s[pr.playerKey].mazo = [...s[pr.playerKey].mazo, ...(returnOrder || [])];
      s.pendingReplacement = null;
      events.push(`REPLACE: ${pr.playerKey}:${pos} ← ${chosen}; returns ${(returnOrder||[]).join(',')}`);
      break;
    }

    // ── ATTACK ──
    case 'attack': {
      const attackerIdx = player.field.findIndex(fc => fc.pos === action.attackerPos);
      if (attackerIdx === -1) break;
      const attacker = player.field[attackerIdx];

      player.attackerThisTurn = action.attackerPos;
      player.field[attackerIdx] = { ...attacker, attackedThisTurn: true };

      // Apply quemar mark damage (1 dmg when attacks)
      if (attacker.marks.includes('quemar')) {
        const newHp = Math.max(0, attacker.hp - 1);
        player.field[attackerIdx] = { ...player.field[attackerIdx], hp: newHp };
        events.push(`MARK_QUEMAR: ${playerKey}:${action.attackerPos} takes 1 self-damage`);
      }

      // Compute damage
      let damage = computeDamage(player.field[attackerIdx]);

      // Equip bonus: Embestida Pétrea — +1 if target in descanso
      let embPetActive = false;
      for (const eq of player.field[attackerIdx].equips) {
        const eqCard = getCard(eq.folio);
        if (!eqCard) continue;
        const eqText = (eqCard.effect_text || '').toLowerCase();
        if (eqText.includes('embestida pétrea') || eqText.includes('+1 pto. de daño') && eqText.includes('descanso')) {
          if (action.targetPos !== 'protector') {
            const tfc = opp.field.find(fc => fc.pos === action.targetPos);
            if (tfc && tfc.rests > 0) {
              damage += 1;
              embPetActive = true;
            }
          }
        }
        // Rot Activa — adds damage but no rests
        if (eqCard.type === 'Rot') {
          const rotText = (eqCard.effect_text || '').toLowerCase();
          const rotDmg = rotText.match(/\+(\d+)\s+pto/);
          if (rotDmg) damage += parseInt(rotDmg[1]);
        }
      }

      if (action.targetPos === 'protector') {
        // Attacking protector
        const prot = opp.protector;
        const newHp = Math.max(0, prot.hp - damage);
        opp.protector = { ...prot, hp: newHp };
        events.push(`ATTACK: ${playerKey}:${action.attackerPos} → ${oppKey}:protector for ${damage}. Protector HP: ${prot.hp} → ${newHp}`);
        if (newHp === 0) {
          events.push(`DEFEAT: ${oppKey} Protector destroyed!`);
        }
      } else {
        // Attacking field card
        const targetIdx = opp.field.findIndex(fc => fc.pos === action.targetPos);
        if (targetIdx !== -1) {
          const target = opp.field[targetIdx];
          let newHp = Math.max(0, target.hp - damage);
          opp.field[targetIdx] = { ...target, hp: newHp };
          events.push(`ATTACK: ${playerKey}:${action.attackerPos}(${attacker._name}) → ${oppKey}:${action.targetPos}(${target._name}) for ${damage}. HP: ${target.hp} → ${newHp}`);
          if (newHp <= 0) {
            // Send to extinction
            opp.extinction = [...opp.extinction, target.folio];
            // Also send its equips
            for (const eq of target.equips) {
              opp.extinction = [...opp.extinction, eq.folio];
            }
            events.push(`DEATH: ${oppKey}:${action.targetPos} (${target.folio}) → extinction`);
            // Trigger replacement
            const repResult = triggerReplacement(s, oppKey, action.targetPos);
            s = repResult.newState;
            events.push(...repResult.events);
          }
        }
      }

      // Check victory
      const vic = checkVictory(s);
      if (vic) {
        s.winner = vic;
        events.push(`VICTORY: ${vic} wins!`);
      }
      break;
    }

    // ── USE ACTIVA ──
    case 'useActiva': {
      const idx = player.field.findIndex(fc => fc.pos === action.pos);
      if (idx === -1) break;
      const fc = player.field[idx];
      if (!fc.revealed || fc.usedActivaThisTurn) break;
      const cardData = getCard(fc.folio);
      if (!cardData || !cardData.effect_text) break;

      player.field[idx] = { ...fc, usedActivaThisTurn: true };
      player.attackerThisTurn = action.pos;
      events.push(`ACTIVA: ${playerKey}:${action.pos} uses ${cardData.name}`);

      const effectResult = resolveEffect(s, cardData.effect_text, playerKey, action.pos, action.opts || {});
      s = effectResult.newState;
      events.push(...effectResult.events);

      // Apply rests to attacker (unless Rot Activa)
      const isRotActiva = player.field[idx] && player.field[idx].equips.some(eq => {
        const ec = getCard(eq.folio);
        return ec && ec.type === 'Rot';
      });
      if (!isRotActiva && cardData._rests) {
        const r = Math.min(ADENDEI_MAX_RESTS, (player.field[idx].rests || 0) + cardData._rests);
        player.field[idx] = { ...player.field[idx], rests: r, available: r === 0 };
      }
      break;
    }

    // ── ACTIVA-RÁPIDA ──
    case 'activaRapida': {
      const idx = player.field.findIndex(fc => fc.pos === action.pos);
      if (idx === -1) break;
      const fc = player.field[idx];
      const cardData = getCard(fc.folio);
      if (!cardData || !cardData.effect_text) break;

      player.field[idx] = { ...fc, usedActivaThisTurn: true };
      events.push(`ACTIVA_RAPIDA: ${playerKey}:${action.pos} uses ${cardData.name}`);

      const effectResult = resolveEffect(s, cardData.effect_text, playerKey, action.pos, action.opts || {});
      s = effectResult.newState;
      events.push(...effectResult.events);

      s.pendingActivaRapida = null;
      break;
    }

    // ── VÍNCULO ODÉMICO ──
    case 'vinculo': {
      const adendeiIdx = player.field.findIndex(fc => fc.pos === action.adendeiPos);
      if (adendeiIdx === -1) break;
      const adendei = player.field[adendeiIdx];
      const prot = player.protector;

      // Transfer equips from protector to adendei
      player.field[adendeiIdx] = {
        ...adendei,
        equips: [...adendei.equips, ...prot.equips],
      };
      // Restore HP of adendei (set to maxHp)
      player.field[adendeiIdx].hp = player.field[adendeiIdx].maxHp;
      // Protector leaves the field (destroyed)
      player.protector = { ...prot, hp: 0, equips: [], available: false, rests: PROTECTOR_RESTS };
      player.vinculoUsed = true;
      player.attackerThisTurn = action.adendeiPos;
      events.push(`VINCULO: ${playerKey} Protector fuses with :${action.adendeiPos}`);
      break;
    }

    // ── EQUIP ──
    case 'equip': {
      const targetIdx = player.field.findIndex(fc => fc.pos === action.targetPos);
      const eqIdx = player.equipZone.findIndex(eq => eq.folio === action.equipFolio);
      if (targetIdx === -1 || eqIdx === -1) break;

      const eq = player.equipZone[eqIdx];
      player.field[targetIdx] = {
        ...player.field[targetIdx],
        equips: [...player.field[targetIdx].equips, { folio: eq.folio, revealed: true }],
      };
      player.equipZone = player.equipZone.filter((_, i) => i !== eqIdx);
      events.push(`EQUIP: ${playerKey} equips ${action.equipFolio} → :${action.targetPos}`);

      // Apply Ixim effects (stat boost)
      const eqCard = getCard(eq.folio);
      if (eqCard && eqCard.type === 'Ixim') {
        const dmgMatch = (eqCard.effect_text || '').toLowerCase().match(/\+(\d+)\s+pto[^s]/);
        if (dmgMatch) {
          const bonus = parseInt(dmgMatch[1]);
          player.field[targetIdx]._damageBonus = (player.field[targetIdx]._damageBonus || 0) + bonus;
          events.push(`IXIM: ${playerKey}:${action.targetPos} +${bonus} damage bonus`);
        }
      }
      break;
    }

    default:
      events.push(`UNKNOWN_ACTION: ${action.type}`);
  }

  return { newState: s, events };
}

// ─────────────────────────────────────────────────────────────────────────────
// TRIGGER REPLACEMENT
// ─────────────────────────────────────────────────────────────────────────────

/**
 * When a field slot is emptied, draw tercia and set pendingReplacement.
 * If mazo is empty, no replacement needed.
 */
function triggerReplacement(state, playerKey, pos) {
  const s = clone(state);
  const player = s[playerKey];
  const events = [];

  if (player.mazo.length === 0) {
    // Remove the dead card's slot entirely
    player.field = player.field.filter(fc => fc.pos !== pos || fc.hp > 0);
    events.push(`NO_REPLACE: ${playerKey}:${pos} — mazo empty`);
    return { newState: s, events };
  }

  // Remove the dead card from field (keep slot with hp=0 for reference)
  const deadIdx = player.field.findIndex(fc => fc.pos === pos);
  if (deadIdx !== -1) {
    player.field = player.field.filter((_, i) => i !== deadIdx);
  }

  const tercia = player.mazo.slice(0, FIELD_SIZE);
  if (tercia.length === 1) {
    // Only 1 card — auto-place
    const newCard = makeFieldCard(tercia[0], pos);
    player.mazo = player.mazo.slice(1);
    player.field = [...player.field, newCard];
    events.push(`AUTO_REPLACE: ${playerKey}:${pos} ← ${tercia[0]}`);
  } else if (tercia.length > 1) {
    s.pendingReplacement = {
      playerKey,
      pos,
      tercia,
    };
    events.push(`TERCIA: ${playerKey}:${pos} draws [${tercia.join(', ')}]`);
  }

  return { newState: s, events };
}

// ─────────────────────────────────────────────────────────────────────────────
// ADVANCE PHASE
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Move to the next phase in the cycle. At 'fin', advance turn.
 */
function advancePhase(state) {
  let s = clone(state);
  const currentIdx = PHASES.indexOf(s.phase);
  const nextIdx = currentIdx + 1;

  if (nextIdx >= PHASES.length) {
    // End of turn — advance to next turn
    s = endOfTurn(s);
    return s;
  }

  s.phase = PHASES[nextIdx];
  return s;
}

// ─────────────────────────────────────────────────────────────────────────────
// END OF TURN
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Apply end-of-turn rest updates, then start next turn.
 *
 * Rules:
 * - Cards that attacked → set rests to their stat._rests (unless Rot Activa equipped)
 * - Cards that started in rest and did NOT attack → rests - 1 (min 0)
 * - Protector: if used vínculo → 3 rests; else if in rest → -1
 * - Reset per-turn flags
 */
function endOfTurn(state) {
  let s = clone(state);

  for (const pk of ['p1', 'p2']) {
    const player = s[pk];

    // Update field cards
    player.field = player.field.map(fc => {
      if (fc.hp <= 0) return fc;

      let newRests = fc.rests;

      if (fc.attackedThisTurn) {
        // Check if Rot Activa is equipped (Rot does NOT generate rests)
        const hasRot = fc.equips.some(eq => {
          const ec = getCard(eq.folio);
          return ec && ec.type === 'Rot';
        });
        if (!hasRot) {
          newRests = fc._rests || 0;
        }
        // If has Rot, keep current rests (no new rests from attack)
      } else if (fc.startsRest > 0) {
        // Was in rest and didn't attack → -1
        newRests = Math.max(0, fc.rests - 1);
      }

      return {
        ...fc,
        rests: newRests,
        available: newRests === 0,
        attackedThisTurn: false,
        usedActivaThisTurn: false,
        startsRest: newRests,
      };
    });

    // Update protector rests
    if (player.protector.hp > 0) {
      let protRests = player.protector.rests;
      if (player.vinculoUsed) {
        protRests = PROTECTOR_RESTS;
      } else if (player.protector.startsRest > 0) {
        protRests = Math.max(0, player.protector.rests - 1);
      }
      player.protector = {
        ...player.protector,
        rests: protRests,
        available: protRests === 0,
        attackedThisTurn: false,
        startsRest: protRests,
      };
    }

    // Reset turn flags
    player.attackerThisTurn = null;
    player.vinculoUsed = false;
  }

  // Advance turn, switch active player, reset to previa
  s.turn += 1;
  s.activePlayer = s.activePlayer === 'p1' ? 'p2' : 'p1';
  s.phase = 'previa';
  s.attackDeclared = false;
  s.pendingActivaRapida = null;

  // Snapshot start-of-turn rests for new turn
  for (const pk of ['p1', 'p2']) {
    for (const fc of s[pk].field) {
      fc.startsRest = fc.rests;
    }
    s[pk].protector.startsRest = s[pk].protector.rests;
  }

  return s;
}

// ─────────────────────────────────────────────────────────────────────────────
// RUN TURN
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Run a full turn (all phases) using decision functions.
 * decideP1 / decideP2 = (state, playerKey, legalActions) => action
 */
function runTurn(state, decideP1, decideP2) {
  let s = clone(state);
  const turnLog = [];
  const decide = { p1: decideP1, p2: decideP2 };

  // Safety: limit iterations per turn to prevent infinite loops
  let iterations = 0;
  const MAX_ITER = 200;

  while (s.phase !== 'fin' && !s.winner && iterations < MAX_ITER) {
    iterations++;

    // Determine who acts in this phase
    let actingKey;
    if (s.phase === 'previa') {
      // Both players can act in previa — alternate until both pass
      // Track pass state per player per phase
      actingKey = s.activePlayer; // simplification: active player acts first
    } else if (s.phase === 'batalla') {
      if (s.pendingActivaRapida) {
        actingKey = s.pendingActivaRapida.responseKey;
      } else {
        actingKey = s.activePlayer;
      }
    } else if (s.phase === 'post') {
      if (s.pendingReplacement) {
        actingKey = s.pendingReplacement.playerKey;
      } else {
        actingKey = s.activePlayer;
      }
    } else if (s.phase === 'equipo') {
      actingKey = s.activePlayer;
    } else {
      actingKey = s.activePlayer;
    }

    const actions = getLegalActions(s, actingKey);
    const action = decide[actingKey](s, actingKey, actions);
    const result = applyAction(s, action, actingKey);
    s = result.newState;
    turnLog.push({ phase: s.phase, player: actingKey, action, events: result.events });

    if (result.events.some(e => e.startsWith('VICTORY'))) break;

    // Advance phase logic:
    // In previa: advance only when active player passes AND no pending items
    // In batalla: advance on pass (when no attack declared) or after attack resolves
    // In post: advance on pass (after replacement resolved)
    // In equipo: advance on pass or equip
    // In fin: handled by advancePhase → endOfTurn

    const shouldAdvance = (() => {
      if (action.type !== 'pass') {
        // After a non-pass action, check if we should auto-advance
        if (s.phase === 'batalla' && action.type === 'attack' && !s.pendingActivaRapida) {
          // After attack, move to post
          return true;
        }
        if (s.phase === 'equipo' && action.type === 'equip') {
          // After equip, move to fin
          return true;
        }
        return false;
      }
      // Pass advances phase (if no pending items)
      if (s.pendingReplacement) return false;
      if (s.pendingActivaRapida) return false;
      return true;
    })();

    if (shouldAdvance) {
      s = advancePhase(s);
    }
  }

  // If we hit fin phase, call endOfTurn via advancePhase
  if (s.phase === 'fin' && !s.winner) {
    s = advancePhase(s);
  }

  return { state: s, turnLog };
}

// ─────────────────────────────────────────────────────────────────────────────
// SIMULATE
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Run a full game simulation.
 * stratP1 / stratP2 = (state, playerKey, actions) => action
 */
function simulate(deck1, deck2, stratP1, stratP2, maxTurns) {
  maxTurns = maxTurns || 100;
  let state = initGame(deck1, deck2);
  const allLogs = [];

  for (let t = 0; t < maxTurns; t++) {
    if (state.winner) break;
    const { state: newState, turnLog } = runTurn(state, stratP1, stratP2);
    allLogs.push({ turn: t + 1, log: turnLog });
    state = newState;
    if (state.winner) break;
  }

  return {
    winner: state.winner,
    turns: state.turn - 1,
    finalState: state,
    log: allLogs,
    unresolvedEffects: UNRESOLVED_LOG.length,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// EXPORTS
// ─────────────────────────────────────────────────────────────────────────────

module.exports = {
  initGame,
  getLegalActions,
  applyAction,
  advancePhase,
  runTurn,
  simulate,
  checkVictory,
  countExtinction,
  PHASES,
  VICTORY_THRESHOLD,
};