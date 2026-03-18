'use strict';

/**
 * basic.test.js — Core mechanic tests (no external dependencies)
 */

const {
  initGame,
  getLegalActions,
  applyAction,
  advancePhase,
  checkVictory,
  countExtinction,
  VICTORY_THRESHOLD,
} = require('../engine');

// ─────────────────────────────────────────────────────────────────────────────
// Test harness
// ─────────────────────────────────────────────────────────────────────────────

let passed = 0;
let failed = 0;

function assert(condition, label) {
  if (condition) {
    console.log(`  ✓ ${label}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${label}`);
    failed++;
  }
}

function assertEqual(a, b, label) {
  if (a === b) {
    console.log(`  ✓ ${label} (${a})`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${label} — expected ${b}, got ${a}`);
    failed++;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Minimal decks for testing
// ─────────────────────────────────────────────────────────────────────────────

const deck1 = {
  name: 'TestP1',
  mazo: [
    'LGRO-034','LGRO-006','DOOC-024',   // field (pos 1-3)
    'RAMI-016','LGRO-078','TCOO-050',   // next 3 (for replacement)
    'LGRO-016','MLBU-002','TCOO-037',
    'TCOO-043','DOOC-001','LGRO-045','LGRO-044',
  ],
  protector: 'LGRO-067',
  bio: null,
  equips: [],
};

const deck2 = {
  name: 'TestP2',
  mazo: [
    'FYTE-059','FYTE-060','FYTE-058',
    'FYTE-061','FYTE-070','FYTE-063',
    'FYTE-065','FYTE-066','FYTE-071',
    'FYTE-072','FYTE-079','FYTE-068','FYTE-046',
  ],
  protector: 'FYTE-023',
  bio: null,
  equips: [],
};

// ─────────────────────────────────────────────────────────────────────────────
// TEST 1: initGame creates valid state with 3 field cards per player
// ─────────────────────────────────────────────────────────────────────────────

console.log('\nTest 1: initGame creates valid state');
{
  const state = initGame(deck1, deck2);

  assertEqual(state.phase, 'previa', 'Initial phase is previa');
  assertEqual(state.turn, 1, 'Initial turn is 1');
  assertEqual(state.activePlayer, 'p1', 'p1 starts as active player');
  assertEqual(state.p1.field.length, 3, 'p1 has 3 field cards');
  assertEqual(state.p2.field.length, 3, 'p2 has 3 field cards');

  assert(state.p1.field.every(fc => !fc.revealed), 'p1 field cards start hidden');
  assert(state.p2.field.every(fc => !fc.revealed), 'p2 field cards start hidden');
  assert(state.p1.field.every(fc => fc.hp === 6), 'p1 field cards start at 6 HP');
  assert(state.p1.protector.hp === 12, 'p1 protector starts at 12 HP');
  assert(state.p1.protector.rests === 3, 'p1 protector starts with 3 rests');
  assertEqual(state.winner, null, 'No winner at start');

  // First 3 of mazo become field
  assertEqual(state.p1.field[0].folio, deck1.mazo[0], 'p1 field[0] is first mazo card');
  assertEqual(state.p1.field[1].folio, deck1.mazo[1], 'p1 field[1] is second mazo card');
  assertEqual(state.p1.field[2].folio, deck1.mazo[2], 'p1 field[2] is third mazo card');
}

// ─────────────────────────────────────────────────────────────────────────────
// TEST 2: Attack reduces target HP
// ─────────────────────────────────────────────────────────────────────────────

console.log('\nTest 2: Attack reduces target HP');
{
  let state = initGame(deck1, deck2);
  state.phase = 'batalla';

  // Manually reveal attacker and target and give attacker damage
  state.p1.field[0].revealed = true;
  state.p1.field[0].rests = 0;
  state.p1.field[0]._damage = 2;
  state.p2.field[0].revealed = true;
  state.p2.field[0].hp = 6;
  const targetPos = state.p2.field[0].pos;

  const action = { type: 'attack', attackerPos: state.p1.field[0].pos, targetPos };
  const { newState, events } = applyAction(state, action, 'p1');

  const target = newState.p2.field.find(fc => fc.pos === targetPos);
  // target might be removed if hp hit 0, check for that
  if (target) {
    assert(target.hp < 6, 'Target HP reduced after attack');
    assert(target.hp === 4, 'Target HP is 4 (6 - 2 damage)');
  } else {
    // Card was killed (damage >= 6)
    assert(newState.p2.extinction.length > 0, 'Card sent to extinction on 0 HP');
  }
  assert(events.some(e => e.startsWith('ATTACK')), 'ATTACK event fired');
}

// ─────────────────────────────────────────────────────────────────────────────
// TEST 3: Card at 0 HP goes to extinction
// ─────────────────────────────────────────────────────────────────────────────

console.log('\nTest 3: Card at 0 HP goes to extinction');
{
  let state = initGame(deck1, deck2);
  state.phase = 'batalla';

  state.p1.field[0].revealed = true;
  state.p1.field[0].rests = 0;
  state.p1.field[0]._damage = 6; // Enough to kill

  const targetFolio = state.p2.field[0].folio;
  const targetPos = state.p2.field[0].pos;
  state.p2.field[0].revealed = true;
  state.p2.field[0].hp = 6;

  const action = { type: 'attack', attackerPos: state.p1.field[0].pos, targetPos };
  const { newState, events } = applyAction(state, action, 'p1');

  assert(newState.p2.extinction.includes(targetFolio), 'Dead card in p2 extinction');
  const stillOnField = newState.p2.field.find(fc => fc.pos === targetPos && fc.hp > 0);
  assert(!stillOnField, 'Dead card removed from field');
  assert(events.some(e => e.startsWith('DEATH')), 'DEATH event fired');
}

// ─────────────────────────────────────────────────────────────────────────────
// TEST 4: Rest update works correctly
// ─────────────────────────────────────────────────────────────────────────────

console.log('\nTest 4: Rest update at end of turn');
{
  let state = initGame(deck1, deck2);
  state.phase = 'fin';

  // p1 card at 2 rests (was in rest, didn't attack) → should become 1
  state.p1.field[0].rests = 2;
  state.p1.field[0].startsRest = 2;
  state.p1.field[0].attackedThisTurn = false;

  // p1 card that attacked (rests = 0, _rests = 1) → should become 1
  state.p1.field[1].rests = 0;
  state.p1.field[1].startsRest = 0;
  state.p1.field[1].attackedThisTurn = true;
  state.p1.field[1]._rests = 1;

  // p1 card at 0 rests, didn't attack → stays 0
  state.p1.field[2].rests = 0;
  state.p1.field[2].startsRest = 0;
  state.p1.field[2].attackedThisTurn = false;

  const nextState = advancePhase(state); // fin → endOfTurn → new turn

  // Card 0 was in rest, didn't attack → -1 rest: 2 → 1
  assertEqual(nextState.p1.field[0].rests, 1, 'Resting card decrements rest by 1');
  // Card 1 attacked → gets _rests: 1
  assertEqual(nextState.p1.field[1].rests, 1, 'Attacked card gets stat rests');
  // Card 2 was at 0, didn't attack → stays 0
  assertEqual(nextState.p1.field[2].rests, 0, 'Card at 0 rest stays at 0');
  // Turn advanced
  assertEqual(nextState.turn, 2, 'Turn advances to 2');
  assertEqual(nextState.phase, 'previa', 'Phase resets to previa');
}

// ─────────────────────────────────────────────────────────────────────────────
// TEST 5: Victory at 10 extinction
// ─────────────────────────────────────────────────────────────────────────────

console.log('\nTest 5: Victory at 10 non-token cards in extinction');
{
  let state = initGame(deck1, deck2);

  // Put 9 cards in p2 extinction
  state.p2.extinction = [
    'FYTE-059','FYTE-060','FYTE-058','FYTE-061','FYTE-070',
    'FYTE-063','FYTE-065','FYTE-066','FYTE-071',
  ];
  assert(checkVictory(state) === null, 'No victory at 9 extinction');

  // Add 10th
  state.p2.extinction.push('FYTE-072');
  assertEqual(checkVictory(state), 'p1', 'p1 wins when p2 has 10 in extinction');

  // Check p1 winning
  let state2 = initGame(deck1, deck2);
  state2.p1.extinction = [
    'C1','C2','C3','C4','C5','C6','C7','C8','C9','C10',
  ];
  assertEqual(checkVictory(state2), 'p2', 'p2 wins when p1 has 10 in extinction');
}

// ─────────────────────────────────────────────────────────────────────────────
// SUMMARY
// ─────────────────────────────────────────────────────────────────────────────

console.log(`\n${'─'.repeat(50)}`);
console.log(`Tests: ${passed + failed} | Passed: ${passed} | Failed: ${failed}`);
if (failed === 0) {
  console.log('All tests passed ✓');
  process.exit(0);
} else {
  console.log('Some tests failed ✗');
  process.exit(1);
}
