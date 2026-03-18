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
    // Attack the weakest-HP opponent field card
    const attacks = actions.filter(a => a.type === 'attack');
    if (attacks.length > 0) {
      // Find target with lowest HP among field targets
      const oppKey = playerKey === 'p1' ? 'p2' : 'p1';
      const opp = state[oppKey];

      // Prefer field targets over protector
      const fieldAttacks = attacks.filter(a => a.targetPos !== 'protector');
      if (fieldAttacks.length > 0) {
        // Sort by target HP ascending
        fieldAttacks.sort((a, b) => {
          const ta = opp.field.find(fc => fc.pos === a.targetPos);
          const tb = opp.field.find(fc => fc.pos === b.targetPos);
          const hpa = ta ? ta.hp : 999;
          const hpb = tb ? tb.hp : 999;
          return hpa - hpb;
        });
        return fieldAttacks[0];
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
