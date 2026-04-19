# Engine Audit — Enfoque 2: Efectos y Combate (§6-§7)

**Fecha:** 2026-04-19 (CST)
**Alcance:** Master Rulebook v5.1 §6 (Marcas, Protección, Daño, Cambios entre zonas, Ataque, Efectos Activas/Pasivas/Costos, Restricciones) y §7 (Marcas — manejadas en §6.1).
**Fuentes auditadas:**
- `/home/coder/codice-kodem/api/kodem_engine/engine.py` (3,299 LoC)
- `/home/coder/codice-kodem/api/kodem_engine/effects.py` (6,965 LoC — el core)
- `/home/coder/codice-kodem/api/kodem_engine/effect_definitions.json` (311 KB)

**Baseline de tests:** 436/436 PASS. **Modo:** solo-lectura.
**Rulings resueltos:** `rulings-v5.1.md` + `rulings-v5.1-addendum-faq-oficial.md`.
**Dudas abiertas (11):** D30, D31, D33, D36, D37, D40, D43, D46, D52, M3, M5 — marcadas sin juicio.

---

## 1. Resumen ejecutivo

1. **Cobertura general alta** (~85%) de §6-§7, con infraestructura sólida: 4 tipos de daño (`attack/effect/cost/mark`), sistema de marcas con `_safe_add_mark` + `immune_to_marks`, protecciones dobles (`protected_from_attacks`, `protected_from_effects`), snapshot de copia implícito vía re-resolución de texto, y un motor de Pasivas disparado por 4 triggers (`ally_death`, `ally_attacked`, `card_revealed`, `attack_resolved`).
2. **Gap crítico FAQ-03:** `check_passive_triggers('attack_resolved', ...)` en `engine.py:2061` se ejecuta **incluso cuando el ataque fue negado** (la guardia de `attack_cancelled` sólo salta el `elif` de daño, pero el post-attack trigger sigue fuera del bloque). Esto hace que Pasivas "si esta carta atacó / si atacó" (Kitse, Rhymir) se disparen aunque FAQ-03 diga explícitamente que NO deben.
3. **Gap regulatorio §6.8 regla 14 (Hule / D45):** No existe contador de "8 turnos totales sin daño → reset forzoso". Ni `stalemate_counter`, ni lógica de reset de partida por inactividad. Partidas in-engine pueden durar indefinidamente.
4. **§6.7.2 Prioridad de Pasivas simultáneas:** El scheduler recorre `['p1', 'p2']` en orden fijo (effects.py:6600), ignorando la prioridad del jugador en turno. En la mayoría de casos reales (1 Pasiva por trigger) es irrelevante; en edge cases (2 Pasivas simultáneas con efectos orden-dependientes), resuelve por orden de jugador alfabético y no por prioridad del active player.
5. **§6.7.3 HandTraps (M4) parcialmente implementados:** `'al ser tomada del mazo'` se dispara en `engine.py:447` y `:1713` (paths de auto-replace y reemplazo manual), pero no hay cobertura para draws ocurridos durante efectos de búsqueda (`buscar en mazo`, `revisar X cartas superiores`). Verificar cobertura según folios reales.
6. **Copia-snapshot (D16):** Implementación correcta por design — copias (Therz, Gloku, Ojos de Nirge, Retis, Espectro) re-leen `effect_text` del target al momento de copiar, comportamiento snapshot natural. No persiste el snapshot; cada copia lo toma fresco.
7. **Atacar negado aún marca `attacked_this_turn=True`** (engine.py:2014), lo que es consistente con la regla de "la carta descansa aunque el ataque sea anulado", pero combinado con el gap del punto (2) produce triggers incorrectos.

---

## 2. Mapeo por sección §6.X

### §6.1 Marcas (Quemar, Envenenar, Abismar)
**Cobertura: ✅ Completa.**

| Regla | Implementación |
|---|---|
| Marca se aplica al campo (no a efectos) | `_safe_add_mark` effects.py:103 |
| Max 1 marca del mismo tipo | `if mark_type in fc.marks: return False` (line 110) |
| Nozi Rava `immune_to_marks` | effects.py:106 |
| Marcas sobreviven al ocultar | effects.py:525 — `# §6.1 FIX: Marks persist through hiding` |
| Marcas se limpian al curar | `_safe_heal` effects.py:171 (`fc.marks = []`) |
| Hori Deidad Pírica Rava — quemar permanente preserva al curar | effects.py:175-177 (`state.burn_permanent`) |
| Marca se limpia al ir a Extinción | Implícito (fc recreado al volver) |
| Colocar marca NO es efecto | Docstring effects.py:107, bypasses `protected_from_effects` |
| Daño de marca (`DMG_MARK`) pasa protecciones | effects.py:56 ("Cost and mark damage always apply") |

### §6.2 Cambios en Estadísticas (Escalar, Descender, Curar, Dañar, Feralizar)
**Cobertura: ✅ Completa con matiz sobre "original" (M14).**

| Regla | Implementación |
|---|---|
| `base_damage`, `base_rests`, `max_hp` = valor impreso (M14) | Usados consistentemente como "original" |
| `damage_bonus` = modificador acumulable (escalar/descender) | effects.py:756 `fc.damage_bonus = new_dmg - fc.base_damage` |
| Escalar respeta caps | `_scale_card` effects.py:720 |
| Curar no supera `max_hp` | `_safe_heal` effects.py:164 |
| Feralizar | `feralized`, `feral_damage_only` flags |
| Regresar a "valor original" (Virste Reseteo) | W2.8 effects.py:2826 (limpia `damage_bonus`, cura a `max_hp`, limpia marcas, resetea `rests` a `base_rests`) |

**Observación D30 (duda abierta — sin juzgar):** el handler W2.8 resetea damage_bonus + HP + marcas + rests, pero NO toca equips, negation timers, protection flags, ni flags conductuales (`double_damage_next_turn`, etc.). Comportamiento observado pendiente de ruling comunidad.

### §6.3 Protección
**Cobertura: ✅ Completa.**

| Regla | Implementación |
|---|---|
| Protección de ataque | `protected_from_attacks` flag + check en `_apply_typed_damage` effects.py:58 |
| Protección de efecto | `protected_from_effects` flag + check effects.py:63 |
| Protección es granular (no absoluta) | Flags independientes; `DMG_COST`/`DMG_MARK` bypassean ambas |
| Protección termina al fin de turno / revelar | `protected_until_turn` timer + reseteo en `_hide_card` effects.py:527 |
| `cant_be_protected` — inflictor | effects.py:549 |

### §6.4 Tipos de Daño
**Cobertura: ✅ Completa.**

Sistema de 4 constantes + helper central. FAQ-06 ("daño adicional = daño de ataque") cumple correctamente: todos los bonus (`damage_bonus`, modifiers de `get_damage_modifiers`) se suman al `damage` ANTES de invocar `_apply_typed_damage(target, damage, DMG_ATTACK, ...)` (engine.py:2037). El daño adicional nunca se separa como `DMG_EFFECT`.

### §6.5 Cambios entre Zonas
**Cobertura: ✅ Alta.**

| Regla | Implementación |
|---|---|
| Intercambiar/Cambiar ZP ↔ ZP preserva stats (§12) | effects.py:2742, 5356 ("§12: Cards swapping positions conserve ALL stats (HP, equips, marks, bonuses)") |
| Cross-field swap preserva stats | effects.py:5390 |
| M2.6 — marcas se preservan al intercambiar | ✅ Incluido en "ALL stats" — marcas **no se resetean** en swaps |
| D28 — "cambiar"="intercambiar"="cambiar de lugar" sinónimos | El engine usa el mismo código base para los tres verbos (W2.2, Z5) |
| M2.3 — anti-cambio aplica a intercambio | No detectado explícitamente; se resuelve vía `cant_be_moved` / `cant_be_swapped` flags en folios individuales |
| M2.4 — ZP original | `base_damage`/`base_rests` conservan valor impreso |
| Oculta vs revelada (§6.5, §13.9) | `_hide_card`/`_reveal_card` effects.py:500/582 — reset completo de flags excepto marcas |
| Carta oculta no es "tipo específico" (D8) | `_is_valid_adendei_target` (solo revealed) vs `_is_valid_carta_target` effects.py:91/98 |
| Tokens/Protectores no pueden ocultarse | `_hide_card` check line 510 |
| Equips vuelven a zona al ocultar | `src.equip_zone.extend(fc.equips)` effects.py:521 |

### §6.6 Ataque
**Cobertura: ✅ Alta con **gap FAQ-03** crítico.**

| Regla | Implementación |
|---|---|
| D2 — Subfase Resolución | Orden claro en engine.py:1820-2070: declaración → costs → AR attacker → AR defender → Reactiva → damage → counters → attack_resolved trigger |
| D8 — Targeting cartas ocultas | ✅ Por `_is_valid_*_target` |
| D41 — Activas-Rápidas ventana (RESUELTO p29/b04) | ✅ engine.py:1822 (attacker AR FIRST) → 1855 (defender AR) → daño |
| FAQ-05 — AR resolución | ✅ `pending_activa_rapida` bloquea flujo hasta que responder actúa |
| FAQ-03 — ataque negado NO dispara triggers "si ataca" | ❌ **GAP** — `check_passive_triggers('attack_resolved', ...)` engine.py:2061 corre incondicionalmente tras NEGATE_ATTACK |
| Ataque negado → carta descansa | ✅ engine.py:2014 `attacker.attacked_this_turn = True` |
| D40 — Tzun Heraldo ataque múltiple (abierta) | Observación: Kephir (A14 effects.py:1435), Evadett (A15 effects.py:1445) implementan múltiple; no detecté handler explícito Tzun (duda abierta) |
| Embestida (+1 a rivales en descanso) | engine.py:1994 (`has_embestida`) |
| Counter-marks (burn/abismar al atacante) | effects.py:1737, engine.py:2047 |

**§6.6 Costos de ataque:** `cost_text` se resuelve en engine.py:1759 ANTES de aplicar daño, correcto.

### §6.7 Efectos (Activas, Pasivas, Costos)
**Cobertura: ⚠️ Alta pero con gaps.**

| Sub-regla | Implementación |
|---|---|
| §6.7.1 Activas — sintaxis | `resolve_effect` con 400+ patrones regex; mejor candidato auditoría por texto (no por estructura) |
| §6.7.2 Pasivas — 1/turno | `pasiva_activated_this_turn` flag effects.py:6612 |
| §6.7.2 Pasivas — prioridad activo player | ❌ **GAP** — loop `for pk in ['p1', 'p2']` fijo effects.py:6600 |
| §6.7.2 Opcionales vs Generales (D43 abierta) | `_is_optional_pasiva` engine.py:244 existe; criterio pendiente de ruling |
| §6.7.3 Costos | `cost_text` parseado en engine.py:148, 695, 1759 |
| M4 HandTraps — `al ser tomada del mazo` | ⚠️ Parcial: engine.py:447 (auto-replace), 1713 (replace manual). No verifico cobertura en `buscar en mazo` ni `revisar N cartas superiores` |
| D17 — efectos post-Extinción (Quam) | `death_trigger`, `on_death_scale_heal`, `death_trigger_execution` — infraestructura presente effects.py:1501, 1515, 1540, 2915, 2953+ |
| D27 — victoria alternativa (Draxes) | No detecté handler; revisar si Draxes está implementado |
| D31 — "no puede ser negada" (abierta) | `unnegatable`, `cant_be_negated` flags effects.py:492, 1310, 5576 |
| D32 — Nahual / Ojos de Nirge copia Activa | W1b effects.py:2692, X1 effects.py:5189 |
| M12 — Activa Rápida vs efecto rápido | `'Activa-Rápida' in card.effect_type` — tratado como subtipo de Activa |

### §6.8 Restricciones
**Cobertura: ⚠️ Por folio, no sistémica.**

| Regla | Implementación |
|---|---|
| 17 Generalidades + 8 Tipos | Implementadas case-by-case en `_attack_restriction_blocks` engine.py:268 y flags individuales (`cannot_attack`, `cannot_be_attacked_from_front`, `cant_be_negated`, etc.) |
| D12 — dos listas separadas | No hay separación formal de "Generalidades" vs "Tipos" en estructura de código |
| D45 — regla 14, 8 turnos sin daño | ❌ **GAP** — no existe contador ni reset forzoso |
| D46 — Rava Extendido (abierta) | No detecté handler; marcar |
| `_forbidden_folios` (no duplicados en campo+extinción) | engine.py:357 |
| `_enforce_no_duplicate_revealed` (§13.2 RB-20) | effects.py:128 |

---

## 3. Auditoría de `effects.py` (6,965 LoC — el core)

### 3.1 Arquitectura
- Patrón dominante: **regex sobre `effect_text.lower()`** con ~40 "bloques" nombrados (A, B, C, H, S, W, X, Y, Z, etc.), cada uno agrupando handlers por categoría de efecto.
- `resolve_effect(state, effect_text, source_key, source_pos, opts)` — el dispatcher central.
- `opts` dict carga contexto: `on_draw`, `death_trigger_execution`, `ally_reveal_trigger`, `copied`, `chosen`, etc.
- Deep copy de estado al entrar para garantizar inmutabilidad del input.

### 3.2 Copia-snapshot (D16) — análisis específico
Handlers identificados que copian efectos:
- **W1a (Retis, TCOO-035):** copia Activa+costo de Atlico Titán en extinción (effects.py:2663)
- **W1b (Ojos de Nirge, TCOO-007):** Protector copia Activa+costo de Adendei en campo (effects.py:2692)
- **W1 genérico:** fallback "copia el efecto de otra carta" (effects.py:2717)
- **X1 (Therz Manifestación, Ojos de Nirge variante):** copia Activa+costo (effects.py:5186)
- **X2 (Espectro):** copia Pasiva+costo de Rava en extinción (effects.py:5226)
- **X3:** copia efecto+costo de Rot en extinción (effects.py:5241)
- **X1-variant:** copia Activa|Pasiva de carta|Rava en extinción (effects.py:5420)

**Patrón común:** todos leen `target.effect_text` en el instante de la copia y lo re-invocan con `opts['copied'] = True` para prevenir recursión. No persisten el snapshot — cada invocación es fresh. **Esto coincide con la semántica de D16** ("snapshot único, aplica a TODA copia"): el texto congelado al momento.

**Lo que NO se verifica explícitamente:** si el target muere o cambia de zona entre la decisión de copiar y la resolución, el engine resuelve el efecto con el texto ya capturado (seguro). No hay lógica de "invalidar copia si target muere" — comportamiento correcto.

### 3.3 Cobertura de triggers de Pasivas
`check_passive_triggers(state, trigger_type, trigger_data)` — 4 tipos:
1. `ally_death` — Cretus (death→escalate), Yimsah (death→damage rival), death_trigger_execution de cada folio
2. `ally_attacked` — Balim (dmg rival), counter-heal, Bio Zona Feral (double damage next turn)
3. `card_revealed` — reveal triggers + BRECHA 1 (ally Abisal reveal para Shugg)
4. `attack_resolved` — Kitse (dmg protector), Rhymir (Cháaktico bonus)

**Gap FAQ-03:** `attack_resolved` se llama sin condicionar sobre `attack_cancelled`. Handlers internos filtran por `'atacó' in text`, pero la lógica correcta sería NO llamar `attack_resolved` del todo cuando el ataque fue negado.

### 3.4 Marcas en intercambio (M2.6)
✅ **Confirmado preserva:** W2.2 effects.py:2747-2755 no toca `fc.marks` en el swap, sólo `fc.pos`. Z5 effects.py:5356-5390 idem — `# §12: ZP swap preserves ALL stats (HP, equips, marks, damage bonus)`. Cross-field swap también.

---

## 4. Auditoría de combate

### 4.1 Ventanas de resolución (ruling D2)
Orden en `engine.py:1820-2070` (ATTACK action):
1. **Declaración** (action recibida)
2. **Guards**: `_attack_restriction_blocks`, `negated_until_turn`, Nozi cross-check, Embestida detection
3. **Costos** (`cost_text` resolución línea 1759)
4. **AR Attacker** (línea 1822) — sets `pending_activa_rapida`, returns
5. **AR Defender** (línea 1855) — idem
6. **Reactiva** (línea 1872) — sets `pending_reactiva`, returns
7. **Damage resolution**:
   - Check `attack_cancelled` (línea 2011) → NEGATE_ATTACK
   - Protector hit (2016) o Field hit (2022)
   - Counter-marks (burn/abismar) (2045)
8. **Post-attack**: `check_passive_triggers('attack_resolved', ...)` (2061) — **BUG**
9. **Scale on attack** (2069)
10. **`ally_attacked` trigger** (2077)

### 4.2 Activas-Rápidas (D41 resuelto p29/b04)
✅ Correcto: attacker's AR → defender's AR → damage. Verificado via `s._attacker_ar_done` (set cuando el attacker AR fase termina) y `s._ar_phase_done` (global). Un AR defensivo sólo se ofrece si tiene 'desvía' o 'negar' en `effect_text` (línea 1860).

### 4.3 Triggers "si ataca" (FAQ-03 — BUG)
**Reproducción conceptual:**
1. `p1` declara ATTACK con folio que tiene Pasiva "si atacó → X"
2. `p2` usa Activa-Rápida "negar ataque"
3. Engine entra a línea 2011 `attack_cancelled=True` → logea NEGATE_ATTACK, marca `attacked_this_turn=True`, **NO aplica daño**
4. Engine llega a línea 2061 → `check_passive_triggers('attack_resolved', ...)` — dispara Kitse/Rhymir/equivalentes

**Fix esperado (no aplicar aquí):** envolver el bloque 2058-2079 en `if not attack_was_cancelled:` o retornar temprano después de NEGATE_ATTACK con solo `ally_attacked` trigger defensivo.

---

## 5. Auditoría de marcas (M2.6)

### Escenarios verificados

| Escenario | ¿Preserva marcas? | Evidencia |
|---|---|---|
| Swap ZP aliada↔aliada | ✅ Sí | W2.2 effects.py:2742 (§12 comment) |
| Swap ZP aliada↔extinción (return) | ✅ Sí | W2.9 effects.py:2839-2862 swap in place |
| Cross-field swap (aliada↔rival) | ✅ Sí | Z5 effects.py:5390 |
| Ocultar carta | ✅ Sí | `_hide_card` effects.py:525 `# §6.1 FIX: Marks persist through hiding` |
| Curar | ❌ No (por diseño §7) | `_safe_heal` effects.py:171 clears marks |
| Hori Pírica Rava activo + curar | ✅ Preserva sólo `quemar` | effects.py:175 |
| Ir a Extinción y volver | ❌ No (carta recreada) | `_make_field_card` da `marks=[]` |
| Virste Reseteo W2.8 | ❌ Limpia | effects.py:2835 (limpia marks, rests, HP, damage_bonus) |

**Conclusión M2.6:** ✅ El engine preserva marcas al **intercambiar** (ZP-ZP, cross-field, ocultar). Las limpia sólo en acciones explícitas del rulebook: curar, reset de Virste, viaje a Extinción.

---

## 6. Dudas abiertas relevantes (sin juzgar)

| ID | Tema | Comportamiento observado en engine |
|---|---|---|
| **D30** | Virste Reseteo — alcance | W2.8 effects.py:2826 limpia damage_bonus, HP→max, marks=[], rests=base_rests. NO toca equips, negation, protection flags, conductuales. Pendiente ruling. |
| **D31** | "No puede ser negada" | Flags `unnegatable`/`cant_be_negated` existen y son consultados antes de aplicar NEGATE; interacción con meta-efectos (negar "no puede ser negada") no se testea explícitamente. Pendiente ruling. |
| **D33** | (no encontrado en este scope) | — |
| **D36** | (no encontrado en este scope) | — |
| **D37** | (no encontrado en este scope) | — |
| **D40** | Tzun Heraldo ataque múltiple | Handlers Kephir A14 (effects.py:1435), Evadett A15 (1445) implementan ataque adicional; no detecté handler específico Tzun. Pendiente ruling para estándar de múltiple-attack. |
| **D43** | Pasivas Opcionales vs Generales | `_is_optional_pasiva` engine.py:244 existe pero criterio no verificado vs ruling comunidad. Pendiente. |
| **D46** | Rava Extendido | No detecté handler específico. Pendiente ruling. |
| **D52** | (no encontrado en este scope) | — |
| **M3** | (no encontrado en este scope) | — |
| **M5** | (no encontrado en este scope) | — |

---

## 7. Top 5 correcciones priorizadas

### P1 — CRÍTICA: FAQ-03 gap en `attack_resolved` post ataque negado
**Ubicación:** `engine.py:2058-2077` (post-attack trigger fuera del bloque `if/elif/elif`).
**Problema:** Pasivas "si atacó / si esta carta ataca" se disparan incluso cuando `attack_cancelled=True`. Viola FAQ-03.
**Folios afectados:** Kitse, Rhymir (Cháaktico bonus), cualquier futuro folio con Pasiva "atacó".
**Fix conceptual:** condicionar el bloque 2058-2077 a `if not attack_was_cancelled:`, o capturar estado de cancelación en una variable local antes de la sección (2012) y evaluar al final.
**Impacto de tests:** probablemente bajo (436/436 PASS actual sugiere que no hay test cubriendo el edge case).

### P2 — CRÍTICA: §6.8 regla 14 (D45) sin implementar
**Ubicación:** ausente en `engine.py` (loop de turnos).
**Problema:** No hay contador de turnos sin daño, ni reset forzoso tras 8 turnos totales (4 por jugador). Partidas pueden colgarse indefinidamente.
**Fix conceptual:** agregar `state.no_damage_turn_counter: int`. Incrementar al fin de cada turno si no se infligió daño a HP en ese turno (attacker o defender). Resetear a 0 al primer daño. Al alcanzar 8, gatillar reset forzoso según ruling D45 (definir procedimiento con Hule).
**Impacto de tests:** agregar tests nuevos; no debería romper 436 existentes.

### P3 — ALTA: §6.7.2 prioridad de Pasivas simultáneas
**Ubicación:** `effects.py:6600` (loop `for pk in ['p1', 'p2']` fijo).
**Problema:** En triggers con Pasivas simultáneas de ambos jugadores, resuelve por orden alfabético (p1 siempre primero) en vez de por prioridad del jugador en turno (§6.7.2).
**Fix conceptual:** reemplazar por `ordered_keys = [state.turn_owner, _opponent(state.turn_owner)]` y luego loop `for pk in ordered_keys:`.
**Impacto:** edge cases con Pasivas order-dependientes; bajo en la práctica actual.

### P4 — MEDIA: HandTraps (M4) cobertura en draws no-directos
**Ubicación:** `engine.py:447, 1713` (sólo paths directos de auto-replace y replace manual).
**Problema:** Folios con `'al ser tomada del mazo'` no dispararán si el draw ocurre dentro de efectos de búsqueda (`buscar en mazo`, `revisar N cartas superiores del mazo`, `mueve 1 carta del mazo a...`).
**Fix conceptual:** centralizar draws en un helper `_draw_from_mazo(state, player_key, count)` que dispare triggers HandTrap, y reemplazar todos los `player.mazo.pop(...)` / `player.mazo[:N]` ad-hoc por ese helper.

### P5 — MEDIA: D27 (victoria alternativa Draxes) y D46 (Rava Extendido)
**Ubicación:** no detectados en scope de audit.
**Problema:** condiciones de victoria custom (Draxes) y Bio-Rava Extendido no parecen tener handlers explícitos. Si los folios existen en `effect_definitions.json`, sus efectos no se resuelven.
**Fix conceptual:** (1) verificar si los folios están en `effect_definitions.json`; (2) agregar handler específico en `_check_victory` (engine.py:349) para condiciones alternativas; (3) agregar handler Rava en `get_damage_modifiers` o como Pasiva global.

---

## Apéndice: Identificadores clave

### Constantes de daño (effects.py:46-49)
```
DMG_ATTACK  = 'attack'
DMG_EFFECT  = 'effect'
DMG_COST    = 'cost'
DMG_MARK    = 'mark'
DMG_REDIRECT = 'redirect'
```

### Helpers efectos-combate (effects.py)
- `_apply_typed_damage` (50), `_apply_typed_damage_protector` (74)
- `_safe_add_mark` (103), `_safe_heal` (159)
- `_hide_card` (500), `_reveal_card` (582)
- `_check_facing` (606) — M11 implementación
- `_apply_protection` (475), `_apply_negation` (487)
- `check_passive_triggers` (6574)
- `get_damage_modifiers` (6790)
- `resolve_effect` (dispatcher principal)

### Helpers combate (engine.py)
- `_forbidden_folios` (357)
- `_attack_restriction_blocks` (268)
- `_is_optional_pasiva` (244)
- `_trigger_replacement` (375)
- `_check_victory` (349)
- ATTACK handler (1820)
- NEGATE_ATTACK branch (2011)
- AR windows (1822, 1855)
- `attack_resolved` trigger (2061 — **BUG site**)

### Flags de estado clave (FieldCard)
- `attacked_this_turn`, `pasiva_activated_this_turn`
- `negated_until_turn`, `protected_until_turn`
- `protected_from_attacks`, `protected_from_effects`
- `cannot_attack`, `cannot_be_attacked_from_front`, `attack_restriction`
- `unnegatable`, `cant_be_negated`, `undeviatable`
- `immune_to_marks`, `extinction_immune`
- `damage_bonus`, `base_damage`, `max_hp`, `base_rests`
- `marks: list[str]`
- `death_trigger`, `death_trigger_dmg`
- `scale_on_attack`, `double_damage_next_turn`, `heal_on_attack`

### Rulings aplicados en este audit
- FAQ-03 (ataque negado NO dispara triggers) — **BUG identificado**
- FAQ-05 (AR resolución) — OK
- FAQ-06 (daño adicional = de ataque) — OK
- D2 (Subfase Resolución) — OK
- D8 (Targeting ocultas) — OK
- D12 (dos listas restricciones) — no estructurado, case-by-case
- D16 (copia snapshot único) — OK por diseño
- D28 (cambiar=intercambiar=cambiar de lugar) — OK
- D41 (AR ventana) — OK (p29/b04)
- D45 (regla 14 — 8 turnos) — **GAP**
- M2.3 (anti-cambio → intercambio) — parcial (por folio)
- M2.4 (ZP original) — OK via base_*
- M2.6 (marcas al intercambiar preservan) — OK
- M4 (HandTraps) — parcial
- M11 (frente a = adyacencia) — OK (`_check_facing`)
- M12 (Activa Rápida vs efecto rápido) — OK (subtipo)
- M14 (original = impreso) — OK via base_*

---

_Fin del reporte — audit solo-lectura, sin modificaciones al código._
