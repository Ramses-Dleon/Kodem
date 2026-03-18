'use strict';

/**
 * strategies.js — Decision strategies for Kódem simulator
 */

/**
 * Always pass — does nothing.
 */
function passStrategy(state, playerKey, actions) {
  return { type: 'pass' };
}

/**
 * Aggressive strategy:
 * - previa: reveal all (field, protector, equips, bio)
 * - batalla: attack weakest-HP enemy first; equip when possible
 * - post/equipo/fin: equip if available, else pass
 */
function aggressiveStrategy(state, playerKey, actions) {
  const phase = state.phase;

  // Handle pending replacement: pick first option (first card in tercia)
  const replaceAction = actions.find(a => a.type === 'replace');
  if (replaceAction) return replaceAction;

  if (phase === 'previa') {
    // Reveal in order: field cards, protector, equips, bio
    const reveal = actions.find(a => a.type === 'reveal');
    if (reveal) return reveal;
    const revProt = actions.find(a => a.type === 'revealProtector');
    if (revProt) return revProt;
    const revEquip = actions.find(a => a.type === 'revealEquip');
    if (revEquip) return revEquip;
    const revBio = actions.find(a => a.type === 'revealBio');
    if (revBio) return revBio;
    return { type: 'pass' };
  }

  if (phase === 'batalla') {
    // Attack the weakest-HP opponent field card; tie-break by highest damage threat.
    // Never attack with a 0-damage attacker when a non-zero-damage attacker exists.
    const attacks = actions.filter(a => a.type === 'attack');
    if (attacks.length > 0) {
      const oppKey = playerKey === 'p1' ? 'p2' : 'p1';
      const opp = state[oppKey];
      const me = state[playerKey];

      // Prefer field targets over protector
      const fieldAttacks = attacks.filter(a => a.targetPos !== 'protector');
      if (fieldAttacks.length > 0) {
        // Filter out 0-damage attacker moves if a non-zero-damage attacker is available
        const nonZeroAttacks = fieldAttacks.filter(a => {
          const attacker = me.field.find(fc => fc.pos === a.attackerPos);
          return attacker && ((attacker._damage || 0) + (attacker._damageBonus || 0)) > 0;
        });
        const candidateAttacks = nonZeroAttacks.length > 0 ? nonZeroAttacks : fieldAttacks;

        // Sort: primary = lowest target HP (to kill faster), secondary = highest target damage (bigger threat first)
        candidateAttacks.sort((a, b) => {
          const ta = opp.field.find(fc => fc.pos === a.targetPos);
          const tb = opp.field.find(fc => fc.pos === b.targetPos);
          const hpa = ta ? ta.hp : 999;
          const hpb = tb ? tb.hp : 999;
          if (hpa !== hpb) return hpa - hpb;
          // Tie: prefer higher-damage targets (bigger threats)
          const dma = ta ? ((ta._damage || 0) + (ta._damageBonus || 0)) : 0;
          const dmb = tb ? ((tb._damage || 0) + (tb._damageBonus || 0)) : 0;
          return dmb - dma;
        });
        return candidateAttacks[0];
      }
      return attacks[0];
    }

    // Use Activa if available
    const activa = actions.find(a => a.type === 'useActiva');
    if (activa) return activa;

    return { type: 'pass' };
  }

  if (phase === 'equipo') {
    // Equip if available
    const equip = actions.find(a => a.type === 'equip');
    if (equip) return equip;
    return { type: 'pass' };
  }

  // post / fin / default
  return { type: 'pass' };
}

module.exports = { aggressiveStrategy, passStrategy };
