'use strict';

/**
 * runner.js — Kódem TCG Battle Simulator CLI
 * Hardcoded Alpha vs Beta, both using aggressiveStrategy.
 */

const { simulate } = require('./engine');
const { aggressiveStrategy } = require('./strategies');

// ─────────────────────────────────────────────────────────────────────────────
// DECK CONFIGS
// ─────────────────────────────────────────────────────────────────────────────

const deckAlpha = {
  name: 'Alpha ⚡🔥',
  mazo: [
    'MLBU-006','LGRO-034','LGRO-006','DOOC-024','RAMI-016','LGRO-078',
    'TCOO-050','LGRO-016','MLBU-002','TCOO-037','TCOO-043','DOOC-001',
    'LGRO-045','LGRO-044','TCDE-001','LGRO-010','TCOO-084','LGRO-026','DOOC-002',
  ],
  protector: 'LGRO-067',
  bio: 'TCOO-061',
  equips: ['LGRO-036','LGRO-035','LGRO-014','LGRO-040'],
};

const deckBeta = {
  name: 'Beta 🐾👻',
  mazo: [
    'FYTE-059','DOOC-020','FYTE-060','FYTE-058','FYTE-061','FYTE-070',
    'FYTE-063','FYTE-065','FYTE-066','FYTE-071','FYTE-072','FYTE-079',
    'FYTE-068','FYTE-046','FYTE-075','DOOC-015','DOOC-021','FYTE-041','FYTE-054',
  ],
  protector: 'FYTE-023',
  bio: 'DOOC-017',
  equips: ['LGRO-022','TCDE-013'],
};

// ─────────────────────────────────────────────────────────────────────────────
// RUN
// ─────────────────────────────────────────────────────────────────────────────

console.log('═══════════════════════════════════════════════════════════');
console.log('  Kódem TCG Battle Simulator');
console.log(`  ${deckAlpha.name}  vs  ${deckBeta.name}`);
console.log('  Strategy: Aggressive vs Aggressive');
console.log('═══════════════════════════════════════════════════════════\n');

const result = simulate(deckAlpha, deckBeta, aggressiveStrategy, aggressiveStrategy, 100);

// ─────────────────────────────────────────────────────────────────────────────
// PRINT TURN-BY-TURN LOG
// ─────────────────────────────────────────────────────────────────────────────

for (const turnEntry of result.log) {
  console.log(`\n─── Turn ${turnEntry.turn} ───`);
  for (const entry of turnEntry.log) {
    const actionStr = JSON.stringify(entry.action);
    console.log(`  [${entry.phase}] ${entry.player}: ${actionStr}`);
    for (const ev of entry.events) {
      if (!ev.startsWith('UNRESOLVED')) {
        console.log(`    → ${ev}`);
      }
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// FINAL RESULT
// ─────────────────────────────────────────────────────────────────────────────

console.log('\n═══════════════════════════════════════════════════════════');
console.log('  GAME OVER');
console.log('═══════════════════════════════════════════════════════════');

if (result.winner) {
  const winnerName = result.winner === 'p1' ? deckAlpha.name : deckBeta.name;
  console.log(`  Winner: ${winnerName} (${result.winner})`);
} else {
  console.log('  Result: Draw / Max turns reached');
}

console.log(`  Turns played: ${result.turns}`);

const fs = result.finalState;
console.log(`\n  Final State:`);
console.log(`    ${deckAlpha.name} (p1): ${fs.p1.extinction.length} in extinction`);
console.log(`    ${deckBeta.name} (p2): ${fs.p2.extinction.length} in extinction`);

if (result.unresolvedEffects > 0) {
  console.log(`\n  ⚠ Unresolved effects: ${result.unresolvedEffects}`);
}
