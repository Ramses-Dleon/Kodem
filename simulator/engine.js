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
  // Safely parse damage — some cards have damage:"?" (Espectro) or null (Bio)
  function safeDamage(val) {
    if (val === null || val === undefined) return 0;
    const n = Number(val);
    return isNaN(n) ? 0 : n;
  }
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
    _damage: cardData ? safeDamage(cardData.damage) : 0,
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

// ─────────────────────────────────────────────────────────────────────────────
// SWEEP DEAD — remove 0-HP cards from field, send to extinction, trigger replacement
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Scan field for any card with hp <= 0. For each:
 *  - Add folio (and equips) to extinction
 *  - Remove from field
 *  - Trigger replacement
 * Also checks victory after each death.
 * Returns { newState, events }.
 */
function sweepDead(state, playerKey) {
  let s = clone(state);
  const events = [];

  // Process both players each sweep call (effects can damage either side)
  for (const pk of [playerKey, opponent(playerKey)]) {
    let changed = true;
    while (changed) {
      changed = false;
      const dead = s[pk].field.filter(fc => fc.hp <= 0);
      for (const fc of dead) {
        changed = true;
        // Add to extinction (folio + equip folios)
        s[pk].extinction = [...s[pk].extinction, fc.folio];
        for (const eq of fc.equips) {
          s[pk].extinction = [...s[pk].extinction, eq.folio];
        }
        events.push(`DEATH: ${pk}:${fc.pos} (${fc.folio}) → extinction (swept)`);
        // Trigger replacement (removes dead card from field internally)
        const repResult = triggerReplacement(s, pk, fc.pos);
        s = repResult.newState;
        events.push(...repResult.events);
        // Check victory after each death
        const vic = checkVictory(s);
        if (vic) {
          s.winner = vic;
          events.push(`VICTORY: ${vic} wins!`);
          return { newState: s, events };
        }
      }
    }
  }

  return { newState: s, events };
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

  // ── "el ataque de esta carta no puede ser negado" → flag unnegatable ──
  if (text.includes('no puede ser negado')) {
    // Find source card and flag it
    const srcIdx = s[sourceKey].field.findIndex(fc => fc.pos === sourcePos);
    if (srcIdx !== -1) {
      s[sourceKey].field[srcIdx] = { ...s[sourceKey].field[srcIdx], unnegatable: true };
      events.push(`EFFECT: ${sourceKey}:${sourcePos} attack is unnegatable`);
    }
    return { newState: s, events };
  }

  // ── "si [X] adendei [energy] aliado atacó" → conditional trigger (Rhymir pattern) ──
  const adendeiAttackedMatch = text.match(/si\s+(?:\d+\s+)?adendei\s+(?:\w+\s+)?aliado\s+atac[oó]/i);
  if (adendeiAttackedMatch) {
    // Check if an allied Adendei attacked this turn
    const allied = s[sourceKey];
    const attacked = allied.field.some(fc => fc.attackedThisTurn && fc.hp > 0);
    if (attacked) {
      // The condition is met — apply any bonus damage or effect in remaining text
      const bonusDmg = text.match(/\+(\d+)\s+pto[^s]/);
      if (bonusDmg) {
        const srcIdx = s[sourceKey].field.findIndex(fc => fc.pos === sourcePos);
        if (srcIdx !== -1) {
          s[sourceKey].field[srcIdx]._damageBonus = (s[sourceKey].field[srcIdx]._damageBonus || 0) + parseInt(bonusDmg[1]);
          events.push(`EFFECT: Rhymir conditional +${bonusDmg[1]} damage (allied attacked)`);
        }
      }
    }
    return { newState: s, events };
  }

  // ── "si la carta equipada atacó a una carta en descanso" → Embestida bonus ──
  if (text.includes('carta equipada atacó') && text.includes('descanso')) {
    // This is handled at equip-time in the attack block; log as resolved here
    events.push(`EFFECT: Embestida conditional — evaluated at attack time`);
    return { newState: s, events };
  }

  // ── "si esta carta es enviada a extinción" → register death trigger ──
  if (text.includes('enviada a extinción') || text.includes('enviada a extincion')) {
    // Register as a deathTrigger on the source card so Post phase can fire it
    const srcIdx = s[sourceKey].field.findIndex(fc => fc.pos === sourcePos);
    if (srcIdx !== -1) {
      s[sourceKey].field[srcIdx] = {
        ...s[sourceKey].field[srcIdx],
        deathTrigger: effectText,
      };
      events.push(`EFFECT: Death trigger registered on ${sourceKey}:${sourcePos}`);
    }
    return { newState: s, events };
  }

  // ── "protector rival recibe X descanso" ──
  const protRestMatch = text.match(/protector\s+rival\s+recibe\s+(\d+)\s+descanso/);
  if (protRestMatch) {
    const rests = parseInt(protRestMatch[1]);
    if (s[oppKey].protector.hp > 0) {
      const newR = Math.min(PROTECTOR_RESTS, s[oppKey].protector.rests + rests);
      s[oppKey].protector = {
        ...s[oppKey].protector,
        rests: newR,
        available: newR === 0,
      };
      events.push(`EFFECT: ${oppKey} protector +${rests} rests`);
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
        const newHp = Math.max(0, player.field[attackerIdx].hp - 1);
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
        }
      }

      // Sweep dead cards from both sides (handles attacker quemar death + target death)
      {
        const sweepResult = sweepDead(s, playerKey);
        s = sweepResult.newState;
        events.push(...sweepResult.events);
      }

      // Check victory
      if (!s.winner) {
        const vic = checkVictory(s);
        if (vic) {
          s.winner = vic;
          events.push(`VICTORY: ${vic} wins!`);
        }
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
      const isRotActiva = s[playerKey].field.find(fc2 => fc2.pos === action.pos) &&
        s[playerKey].field.find(fc2 => fc2.pos === action.pos).equips.some(eq => {
          const ec = getCard(eq.folio);
          return ec && ec.type === 'Rot';
        });
      if (!isRotActiva && cardData._rests) {
        const fIdx2 = s[playerKey].field.findIndex(fc2 => fc2.pos === action.pos);
        if (fIdx2 !== -1) {
          const r = Math.min(ADENDEI_MAX_RESTS, (s[playerKey].field[fIdx2].rests || 0) + cardData._rests);
          s[playerKey].field[fIdx2] = { ...s[playerKey].field[fIdx2], rests: r, available: r === 0 };
        }
      }

      // Sweep any cards killed by the effect
      {
        const sweepResult = sweepDead(s, playerKey);
        s = sweepResult.newState;
        events.push(...sweepResult.events);
        if (!s.winner) {
          const vic = checkVictory(s);
          if (vic) { s.winner = vic; events.push(`VICTORY: ${vic} wins!`); }
        }
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

      const effectResult2 = resolveEffect(s, cardData.effect_text, playerKey, action.pos, action.opts || {});
      s = effectResult2.newState;
      events.push(...effectResult2.events);

      // Sweep any cards killed by the rapid effect
      {
        const sweepResult = sweepDead(s, playerKey);
        s = sweepResult.newState;
        events.push(...sweepResult.events);
        if (!s.winner) {
          const vic = checkVictory(s);
          if (vic) { s.winner = vic; events.push(`VICTORY: ${vic} wins!`); }
        }
      }

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
 *
 * Rule §13.1: No duplicate folios — a card whose folio is already on the field
 * or in extinction cannot be placed. Try the next card in tercia; if none fit,
 * return all drawn cards to the bottom of mazo and retry (max 2 retries →
 * 3rd failure = the player loses the ability to replace this slot).
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

  // Remove the dead card from field
  const deadIdx = player.field.findIndex(fc => fc.pos === pos);
  if (deadIdx !== -1) {
    player.field = player.field.filter((_, i) => i !== deadIdx);
  }

  // Helper: set of folios currently forbidden (already on field or in extinction)
  function forbiddenFolios() {
    const onField = new Set(player.field.filter(fc => fc.hp > 0).map(fc => fc.folio));
    const inExt = new Set(player.extinction);
    return { onField, inExt };
  }

  const MAX_RETRIES = 2;
  let attempt = 0;

  while (attempt <= MAX_RETRIES) {
    if (player.mazo.length === 0) {
      events.push(`NO_REPLACE: ${playerKey}:${pos} — mazo empty after retries`);
      return { newState: s, events };
    }

    const tercia = player.mazo.slice(0, FIELD_SIZE);
    const { onField, inExt } = forbiddenFolios();

    // Find first card in tercia that is not a duplicate
    const validIdx = tercia.findIndex(f => !onField.has(f) && !inExt.has(f));

    if (validIdx !== -1) {
      // We have a valid card to place
      const chosen = tercia[validIdx];
      // Remove entire tercia window from mazo, return the others to bottom
      player.mazo = player.mazo.slice(tercia.length);
      const others = tercia.filter((_, i) => i !== validIdx);
      player.mazo = [...player.mazo, ...others];

      if (tercia.length === 1) {
        // Only 1 card available — auto-place (no choice)
        const newCard = makeFieldCard(chosen, pos);
        player.field = [...player.field, newCard];
        events.push(`AUTO_REPLACE: ${playerKey}:${pos} ← ${chosen}`);
      } else {
        // Multiple cards — set pending so strategy can pick
        // Build the pending tercia as only the valid non-duplicate options
        const validTercia = tercia.filter(f => !onField.has(f) && !inExt.has(f));
        // Return the duplicates immediately to bottom of mazo
        const dupeFolios = tercia.filter(f => onField.has(f) || inExt.has(f));
        // Undo the others we already returned above, redo properly:
        // (already pushed others=non-chosen remaining; now also push dupes)
        // Actually let's redo: remove all tercia from mazo, return non-valid to bottom
        // We already did player.mazo = player.mazo.slice(tercia.length) above,
        // and pushed `others` (all but chosen). But chosen hasn't been placed yet
        // (pendingReplacement path). Let's rebuild:
        // Reset: put everything back, redo cleanly
        player.mazo = [chosen, ...others, ...player.mazo]; // undo our slice+push
        // Now cleanly: remove tercia from mazo top
        player.mazo = player.mazo.slice(tercia.length);
        // Return duplicates to mazo bottom (they can't be placed)
        player.mazo = [...player.mazo, ...dupeFolios];
        // The valid choices go to pendingReplacement
        s.pendingReplacement = {
          playerKey,
          pos,
          tercia: validTercia,
        };
        events.push(`TERCIA: ${playerKey}:${pos} draws [${validTercia.join(', ')}] (${dupeFolios.length} dupes returned)`);
      }
      return { newState: s, events };
    }

    // All cards in this tercia are duplicates — return them to bottom and retry
    events.push(`TERCIA_RETRY: ${playerKey}:${pos} attempt ${attempt + 1} — all [${tercia.join(', ')}] are dupes`);
    player.mazo = player.mazo.slice(tercia.length);
    player.mazo = [...player.mazo, ...tercia];
    attempt++;
  }

  // Max retries exceeded — slot remains empty (player forfeits replacement)
  events.push(`NO_REPLACE: ${playerKey}:${pos} — max retries exceeded, slot lost`);
  return { newState: s, events };
}

// ─────────────────────────────────────────────────────────────────────────────
// PASIVA RESOLUTION (Post phase §5.3)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Scan all revealed cards for Pasiva conditions met during the batalla phase.
 * Called after batalla resolves, before advancing to post.
 *
 * Key patterns:
 *  - "si 1 adendei aliado es enviado a extinción" → fired if ally died this turn
 *  - "si vida de carta reducida a 0 por ataque"   → fired when any card died via attack
 *  - deathTrigger registered cards (Therz, Yimsah)
 */
function resolvePostPasivas(state, extinctionsThisTurn) {
  let s = clone(state);
  const events = [];

  for (const pk of ['p1', 'p2']) {
    const oppKey = opponent(pk);
    for (let i = 0; i < s[pk].field.length; i++) {
      const fc = s[pk].field[i];
      if (!fc.revealed || fc.hp <= 0) continue;
      const cardData = getCard(fc.folio);
      if (!cardData || !cardData.effect_type) continue;
      if (!cardData.effect_type.includes('Pasiva')) continue;

      const effectText = cardData.effect_text || '';
      const text = effectText.toLowerCase();

      // Pattern: "si 1 adendei aliado es enviado a extinción"
      const allyDied = extinctionsThisTurn[pk] && extinctionsThisTurn[pk].length > 0;
      if (allyDied && (text.includes('aliado') && text.includes('extinción') || text.includes('aliado') && text.includes('extincion'))) {
        const result = resolveEffect(s, effectText, pk, fc.pos, {});
        s = result.newState;
        events.push(`PASIVA: ${pk}:${fc.pos} (${fc.folio}) triggered — ally to extinction`);
        events.push(...result.events);
        continue;
      }

      // Pattern: "si vida de carta reducida a 0 por ataque"
      const anyDied = (extinctionsThisTurn.p1 && extinctionsThisTurn.p1.length > 0) ||
                      (extinctionsThisTurn.p2 && extinctionsThisTurn.p2.length > 0);
      if (anyDied && text.includes('reducida a 0')) {
        const result = resolveEffect(s, effectText, pk, fc.pos, {});
        s = result.newState;
        events.push(`PASIVA: ${pk}:${fc.pos} (${fc.folio}) triggered — card reduced to 0`);
        events.push(...result.events);
        continue;
      }
    }
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

  // At start of 'post' phase: sweep any 0-HP cards that weren't caught during batalla
  if (s.phase === 'post' && !s.winner) {
    for (const pk of ['p1', 'p2']) {
      const sweepResult = sweepDead(s, pk);
      s = sweepResult.newState;
      if (s.winner) break;
    }
  }

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

  // Final sweep: remove any 0-HP cards that somehow survived to end of turn
  if (!s.winner) {
    for (const pk of ['p1', 'p2']) {
      const sweepResult = sweepDead(s, pk);
      s = sweepResult.newState;
      if (s.winner) return s;
    }
  }

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

  // Track extinctions that happen during batalla for Pasiva triggers
  const extinctionsThisTurn = { p1: [], p2: [] };
  const extBefore = { p1: s.p1.extinction.length, p2: s.p2.extinction.length };

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
      // Before advancing FROM batalla phase, resolve Post Pasivas
      if (s.phase === 'batalla') {
        // Compute which folios went to extinction during batalla
        extinctionsThisTurn.p1 = s.p1.extinction.slice(extBefore.p1);
        extinctionsThisTurn.p2 = s.p2.extinction.slice(extBefore.p2);
        if (extinctionsThisTurn.p1.length > 0 || extinctionsThisTurn.p2.length > 0) {
          const pasivaResult = resolvePostPasivas(s, extinctionsThisTurn);
          s = pasivaResult.newState;
          if (pasivaResult.events.length > 0) {
            turnLog.push({ phase: 'batalla->post:pasiva', player: 'engine', action: { type: 'pasiva' }, events: pasivaResult.events });
          }
        }
      }
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