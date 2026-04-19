# Reporte Final — Fixes Engine Kódem v5.1

**Fecha:** 2026-04-19
**Rama:** `fixes-rulings-v5.1-2026-04-19`
**Baseline tests:** 436/436 PASS
**Final tests:** **461/461 PASS** (+25 tests nuevos)
**Repo:** `/home/coder/codice-kodem`
**PR link (cuando se abra):** https://github.com/Ramses-Dleon/codice-kodem/pull/new/fixes-rulings-v5.1-2026-04-19

---

## Resumen ejecutivo

7 fixes aplicados sobre hallazgos consolidados de 4 auditorías (holística + enfoque1 fundacionales + enfoque2 efectos/combate + enfoque3 simulación/tests). Todos con test de regresión siguiendo TDD (test falla primero, luego fix, luego verde).

El engine canónico (`/home/coder/codice-kodem/api/kodem_engine/`, Python, productivo en Vercel) cierra ahora:

- 3 rulings cerrados en sesión 2026-04-19 (FAQ-03, E8, D6, M4)
- 2 hallazgos críticos de auditoría (D34/H1 Espectros, D5/D18/H2 Zona Fuera del Juego)
- 1 hallazgo arquitectónico (§6.7.2/M22 prioridad pasivas simultáneas)

---

## Fixes aplicados

### Fix 1 — FAQ-03: ataque negado NO dispara triggers 'si esta carta ataca'

- **Commit:** `fab3e76`
- **Ruling:** `rulings-v5.1-addendum-faq-oficial.md` FAQ-03
- **Hallazgo origen:** engine-audit-enfoque2 §6 hallazgo crítico #1
- **Archivo:** `api/kodem_engine/engine.py:2011-2080`
- **Tests nuevos:** 2 (`test_faq03_negated_attack_no_trigger.py`)

**Problema:** tras `NEGATE_ATTACK`, `check_passive_triggers('attack_resolved', ...)` se ejecutaba incondicionalmente. Pasivas tipo Kitse ("si esta carta ataca"), Rhymir (Cháaktico bonus post-ataque) y `scale_on_attack` se disparaban aunque el ataque fuera cancelado.

**Fix:** capturar `attack_was_cancelled` ANTES del reset del flag, envolver bloque post-attack en `if not attack_was_cancelled:`. La carta atacante sigue descansando (el costo del intento se pagó), pero NO dispara triggers.

---

### Fix 2 — E8: subtipos múltiples (Macit/Therz Guardián/Titán+Catrín)

- **Commit:** `b4c718f`
- **Ruling:** `rulings-v5.1.md` E8
- **Hallazgo origen:** engine-audit-enfoque1 H5 + audit-holístico P2
- **Archivos:** `api/kodem_engine/types.py`, `cards.py`, `effects.py`
- **Tests nuevos:** 7 (`test_e8_multi_subtypes.py`)

**Problema:** `cards.json` migró a `subtypes: [primary, secondary]` para 4 cartas con doble subtipo (Macit Guardián+Catrín, Therz Titán+Catrín). El engine solo leía `subtype: str` singular. `_is_catrin`/`_is_titan` no reconocían el subtipo secundario.

**Fix:**
- `types.py` — `Card.subtypes: tuple = ()` agregado (hashable, frozen dataclass)
- `cards.py::_parse_card` — lee `subtypes` plural, fallback a `[subtype]`. `subtype` singular queda como primary para retro-compat.
- `effects.py::_is_titan`/`_is_catrin` — iteran sobre `subtype + subtypes` para reconocer multi-subtype.

---

### Fix 3 — D6: give_rests_by_effect respeta topes duros v5.1

- **Commit:** `1602aa7`
- **Ruling:** `rulings-v5.1.md` D6
- **Hallazgo origen:** engine-audit-enfoque1 código legacy + audit-holístico M5
- **Archivos:** `api/kodem_engine/engine.py:320-345`, `test_engine_pure_helpers.py`, `test_rests.py`
- **Tests nuevos:** 2 nuevos + 10 actualizados

**Problema:** los helpers `give_rests_by_effect` (cap 1 por efecto) y `give_protector_rests_by_effect` (cap 2 por efecto) implementaban semántica v5.0 legacy. D6 v5.1 dice: topes duros TOTALES (ZP=2 total, Protector=3 total), overflow descartado — no son caps por efecto.

**Fix:**
- `give_rests_by_effect`: cap = `ADENDEI_MAX_RESTS` (2) total
- `give_protector_rests_by_effect`: cap = `PROTECTOR_RESTS` (3) total
- Tests legacy actualizados para reflejar D6 con ejemplos explícitos del ruling.

**Nota:** estos helpers no se llaman actualmente desde `effects.py` (código muerto en términos de uso interno), pero son API pública. Ahora alineados con D6 para uso futuro.

---

### Fix 4 — D34/H1: Espectros muertos van a Extinción (no REMOVED FROM GAME)

- **Commit:** `06cff7f`
- **Ruling:** `rulings-v5.1.md` D34 + rulebook p14/b19 (§3.7 Espectros)
- **Hallazgo origen:** engine-audit-enfoque1 H1 crítico + audit-holístico P1
- **Archivo:** `api/kodem_engine/engine.py:635-670` (bloque `_sweep_dead` Espectros)
- **Tests nuevos:** 3 (`test_d34_espectro_death_extinction.py`)

**Problema crítico:** engine enviaba Espectros a `"REMOVED FROM GAME"` silenciosamente. Adendei poseído (`fc.possessed_folio`) se perdía sin registro. Impacto: victoria por 10 cartas infracontada, riesgo de stalemate matemático imposible de cerrar.

**Fix:**
- Espectro va a `ext_owner.extinction` (cuenta al tracker)
- Equips van a extinction (como antes)
- Si `fc.possessed_folio` está seteado, el Adendei poseído vuelve a su forma original y también va a Extinción (per p14/b19)
- `_track()` marca `death_turn` como cualquier otra muerte
- Tokens siguen siendo `REMOVED FROM GAME` (no aplica D34, no tienen zona de extinción)

---

### Fix 5 — M22/p29/b06: Pasivas simultáneas priorizan al jugador en turno

- **Commit:** `76e5925`
- **Ruling:** `rulings-v5.1.md` M22 + p29/b06 (§6.7.2)
- **Hallazgo origen:** engine-audit-enfoque2 hallazgo #3
- **Archivo:** `api/kodem_engine/effects.py:6600-6620`
- **Tests nuevos:** 2 (`test_s672_passive_priority_active_first.py`)

**Problema:** `check_passive_triggers` usaba orden fijo `for pk in ['p1', 'p2']`, ignorando `state.active_player`. Cuando p2 era jugador en turno y ambos tenían pasiva con mismo trigger, se resolvía p1 antes que p2 — contradice p29/b06 ("el jugador en turno tiene prioridad").

**Fix:** derivar `player_order` de `state.active_player`: activo primero, oponente después. No afecta el loop previo de Mizthe Aura Mortal (FYTE-070) que es setup estructural (sanity check de `unnegatable`), no disparo de pasiva.

---

### Fix 6 — M4: HandTrap regex detecta variante Kap 'Si tomas esta carta'

- **Commit:** `334be28`
- **Ruling:** `rulings-v5.1.md` M4 + p20/b08
- **Hallazgo origen:** engine-audit-enfoque3 bonus hallazgo
- **Archivo:** `api/kodem_engine/engine.py:319-345` (nuevo helper) + call sites
- **Tests nuevos:** 5 (`test_m4_handtrap_kap_variant.py`)

**Problema:** el patrón HandTrap tiene DOS variantes textuales según M4:
1. Canónica: `"Si esta carta es tomada del Mazo, puedes..."`
2. Activa (Kap KPRC-017): `"Si tomas esta carta de tu Mazo, puedes..."`

`engine.py:463` y `:1743` usaban regex `'al ser tomada' in effect_text.lower()`. Matcheaba canónica pero NO la variante Kap. Resultado: Kap no disparaba al robar, silenciosamente.

**Fix:** nuevo helper `_is_handtrap_effect()` detecta ambas variantes + `'es tomada del mazo'` generalizada. 2 call sites actualizados.

---

### Fix 7 — D5/D18/H2: Zona 'Fuera del Juego' estructural

- **Commit:** `52cfea8`
- **Ruling:** `rulings-v5.1.md` D5 + D18
- **Hallazgo origen:** engine-audit-enfoque1 H2 crítico
- **Archivo:** `api/kodem_engine/types.py` (Player dataclass)
- **Tests nuevos:** 4 (`test_d5_d18_out_of_game_zone.py`)

**Problema:** engine no tenía storage para "Fuera del Juego". grep confirmó 0 menciones. Bloqueaba Quam (TCOO-006U), única carta actual que interactúa con esta zona.

**Fix estructural:**
- `Player.out_of_game: list[str]` con `default_factory=list`
- Deep_copy respeta independencia (cubierto por `copy.deepcopy`)

**NO implementa** el efecto completo de Quam (bidireccional swap con ZP vía Protector disponible). Queda como siguiente fix una vez estabilizado este y D34.

---

## Bugs pendientes (no tocados)

### Posesión de Espectros (D21 vs p14/b16 bullet 3) — requiere decisión de diseño

Tensión textual entre:
- **D21 ruling:** Espectro vivifica Adendei desde Extinción, el Adendei permanece bajo el Espectro (stack físico).
- **p14/b16 bullet 3 (rulebook):** Espectro sacrifica Adendei del campo hacia Extinción, reemplaza con el Espectro.

El engine implementa p14/b16 (`apply_action type='possess'` en `engine.py:2745`). D21 es ruling comunidad posterior con interpretación inversa. NO toco este fix porque requiere confirmación explícita de Hule/Ramsés sobre cuál interpretación canonizar.

### §6.8/D45 (8 turnos stalemate) — engine YA alineado

Enfoque 3 reportó falta de mecánica de empate. Verifiqué contra rulebook p31/b11: la regla 14 **NO declara empate**, sino **field reset** (ambos envían ZP al mazo + reemplazo normal). El engine ya implementa esto en `engine.py:3082-3099`. D45 solo clarifica que son "8 turnos totales" (4 por jugador), lo que equivale al contador actual `turns_without_damage`. **No hay bug.**

### AI scoring (enfoque 3)

- Draxes D27 scoring ausente en `suggest_turn.py::score_state`
- `_espectro_effective_damage` en `strategies.py` refleja bug viejo de engine (max ally damage), debe reescribirse cuando se fixee D21/D22
- AI ciega a D45 (no penaliza `turns_without_damage`)

Fuera de scope: no es engine bug, es optimización de estrategia.

### Dudas abiertas (no tocadas)

D30, D31, D33, D36, D37, D40, D43, D46, M3, M5 — pendientes ruling comunidad portal. NO implemento conjetura.

---

## Métricas

| Métrica | Baseline | Final | Delta |
|---|---|---|---|
| Tests totales | 436 | 461 | +25 |
| Tests regresión nuevos | 0 | 23 | +23 |
| Tests legacy actualizados | — | 10 (D6 v5.0→v5.1) | — |
| Commits en rama | 0 | 7 | +7 |
| Archivos engine modificados | 0 | 4 | — |
| Bugs críticos (P1) cerrados | — | 3 | — |
| Bugs medios (P2) cerrados | — | 4 | — |

Archivos engine tocados:
- `api/kodem_engine/engine.py` (FAQ-03, D6, D34, M4)
- `api/kodem_engine/effects.py` (E8, M22)
- `api/kodem_engine/types.py` (E8, D5)
- `api/kodem_engine/cards.py` (E8)

---

## Protocolo de cierre

1. **Rama pushed:** `fixes-rulings-v5.1-2026-04-19` → `origin`
2. **PR URL:** https://github.com/Ramses-Dleon/codice-kodem/pull/new/fixes-rulings-v5.1-2026-04-19
3. **Merge a master:** pendiente aprobación de Ramsés
4. **Deploy Vercel:** auto tras merge a master (producción Codice Kódem API)
5. **Próximos pasos sugeridos:**
   - Decisión D21 vs p14/b16 (posesión Espectros) antes de implementar efecto Quam
   - Implementar efecto completo de Quam (bidireccional) una vez estabilizada la Zona Fuera del Juego
   - AI scoring Draxes D27 (fuera de scope engine)

---

## Baseline de confianza

Todos los fixes:
- ✅ Tienen test de regresión que falló ANTES del fix
- ✅ Pasan el test después del fix
- ✅ Mantienen suite completa verde (461/461)
- ✅ Citan ruling + archivo:línea
- ✅ Preservan backward compat donde aplica (E8 `subtype` singular, tokens en `REMOVED FROM GAME`)

Firmado: Logos 🜂 — 2026-04-19 16:10 UTC
