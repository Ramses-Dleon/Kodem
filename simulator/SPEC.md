# Kódem Battle Simulator — Specification v1

## Overview
Deterministic battle simulator for Kódem TCG. No shuffle = every game is reproducible.
Given two decks with defined card order + a decision strategy, simulate the full game.

## Architecture

### Core Engine (`engine.js`)
Pure functions, no side effects, no DOM, no dependencies.

#### Game State Object
```js
{
  turn: 1,
  activePlayer: 'p1', // alternates
  phase: 'previa', // previa|batalla|post|equipo|fin
  winner: null,
  p1: {
    name: 'Alpha',
    protector: { folio, hp: 12, maxHp: 12, rests: 3, revealed: false, equips: [] },
    field: [
      { pos: 1, folio, hp: 6, maxHp: 6, rests: 0, revealed: false, equips: [], marks: [], available: true }
    ], // 3 slots
    mazo: ['FOLIO-001', ...], // ordered, index 0 = top
    equipZone: [{ folio, revealed: false }],
    bio: { folio, revealed: false } | null,
    extinction: ['FOLIO-X', ...],
    usedBioExtinction: false, // 1x per game: send bio to ext
    usedRavaReturn: false, // 1x per game: return rava to mazo
  },
  p2: { ... },
  log: [] // turn-by-turn action log
}
```

#### Decision Interface
Each player has a `decide(gameState, playerKey, legalActions)` function that returns an action.

```js
// Legal actions computed by engine based on phase + rules
// Examples:
{ type: 'reveal', pos: 1 }
{ type: 'attack', attackerPos: 1, targetPos: 2 }
{ type: 'useActiva', pos: 1, target: { pos: 2 } }
{ type: 'activaRapida', pos: 1, target: { pos: 2 } } // response
{ type: 'equip', equipFolio: 'X', targetPos: 1 }
{ type: 'pass' }
{ type: 'replace', chosen: 'FOLIO', returnOrder: ['A', 'B'] }
{ type: 'vinculo', adendeiPos: 1 }
```

#### Core Functions
```
initGame(deck1, deck2) → GameState
getLegalActions(state, playerKey) → Action[]
applyAction(state, action) → { newState, events }
runTurn(state, decideP1, decideP2) → { newState, turnLog }
simulate(deck1, deck2, strategyP1, strategyP2, maxTurns=100) → GameResult
```

#### Rules Implementation Priority
1. **Phase flow**: Previa → Batalla → Post → Equipo → Fin
2. **Attack resolution**: damage, rests, HP tracking
3. **Death + replacement**: tercia draw, choose 1, return 2
4. **Rest mechanics**: update at end of turn, max by effect
5. **Activa / Activa-Rápida**: declaration + response window
6. **Pasiva**: trigger conditions, priority rules
7. **Equipment**: equip rules, compatibility, Ixim/Rot limits
8. **cost_text parsing**: restrictions, self-damage costs
9. **Marks**: quemar, envenenar, abismar
10. **Special**: Bio extinction, Vínculo Odémico, Rava rules
11. **Victory**: 10 cards in extinction

### Card Database Integration
Load `cards.json` — all 609 cards with effects, costs, stats.

### Strategy Layer (v2)
- `aggressiveStrategy`: always attack lowest HP
- `defensiveStrategy`: prioritize survival
- `optimalStrategy`: brute-force best ordering (only feasible with small decks)

### Constraints
- Zero dependencies (vanilla JS, runs in Node.js)
- Deterministic: same inputs → same outputs (no Math.random except abismar)
- Abismar: use seeded PRNG for reproducibility
- Must handle: all 8 energies, all effect types, all card types
- Effect text parsing: structured matching, not NLP

## File Structure
```
simulator/
  SPEC.md          — this file
  engine.js        — core game engine
  cards-loader.js  — load + index cards.json
  strategies.js    — decision functions
  effects.js       — effect text → game action mapping
  runner.js        — CLI to run simulations
  tests/
    basic.test.js  — core mechanic tests
```

## MVP Scope (v1)
- [x] Game state init from 2 decks
- [ ] Phase flow (all 5 phases)
- [ ] Attack + damage resolution
- [ ] Rest mechanics
- [ ] Death + tercia replacement
- [ ] Activa-Rápida response window
- [ ] Equipment (equip to attacker)
- [ ] Victory condition (10 in extinction)
- [ ] Simple aggressive strategy
- [ ] CLI runner: `node runner.js deck1.json deck2.json`

## Non-MVP (v2+)
- Pasiva trigger chains
- Effect text parser for all 609 cards
- Mark mechanics (quemar, envenenar, abismar)
- Vínculo Odémico
- Bio mechanics
- Espectro possession
- Token creation
- Rava special rules
- Brute-force deck ordering optimizer
- Web UI integration with board.html
