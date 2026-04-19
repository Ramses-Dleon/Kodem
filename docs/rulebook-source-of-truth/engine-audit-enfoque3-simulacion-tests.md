# Engine Audit — Enfoque 3: Simulación + AI + Tests

**Fecha:** 2026-04-19
**Scope:** `strategies.py` + `suggest_turn.py` + `engine.simulate/apply_action` + tests coverage
**Baseline:** 436/436 tests passing (ya verificado por Ramsés).
**Sources of truth:** `rulings-v5.1.md` (40+ rulings), `rulings-v5.1-addendum-faq-oficial.md` (FAQ 01–08), `master-rulebook-v5.1.md`, `dudas-pendientes-comunidad-2026-04-19-estado-final.md` (11 abiertas).

---

## Resumen ejecutivo

- **Coverage de tests vs rulings resueltos ≈ 40%.** Mecánicas fundamentales (marcas, descansos, reemplazo, victoria, negación) están bien cubiertas; rulings nuevos (D16 Gloku, D20–D22 Espectros, D34 conteo Espectro, D41 ventana AR, D44 HandTrap negable, D45 empate 8 turnos, E8 subtipos múltiples) tienen cobertura parcial, indirecta (grep en engine.py) o nula.
- **Desviación crítica del engine respecto a D21/D22:** al poseer, `engine.py:2753-2790` **copia `base_damage`/`base_rests`** del Adendei poseído al Espectro y **envía al poseído a Extinción inmediatamente** (con trigger de replacement). D21 dice "stack físico bajo el Espectro" y D22 dice "no hay herencia de stats" → engine tiene la semántica invertida. Impacta D34 y el conteo de victoria.
- **D45 empate (8 turnos totales) NO se implementa como empate**: `engine.py:3086` usa `turns_without_damage >= 8` para hacer **field reset** (ambos mazos regresan cartas al fondo), no para declarar tie/draw. `_check_victory` no devuelve `'draw'`. No existe el concepto `state.winner == 'draw'`.
- **FAQ-03 (ataque negado no dispara triggers "si ataca") parcialmente violada**: cuando `s.attack_cancelled=True` (`engine.py:2012-2016`), el engine marca `attacker.attacked_this_turn = True`, lo que dispara post-hoc triggers "si atacó" (Kitse, Xilan scale_on_attack en `engine.py:2069`, block Z1 en `effects.py:5498`). Los bonuses `Z1_CONDITIONAL_ATK_DMG` se aplican como buff permanente a `damage_bonus` antes del ataque — si el ataque se niega, el buff permanece aplicado.
- **D16 Gloku (TCDE-015) no está implementado**: existe el helper `_can_create_token` (`effects.py:117-126`) con comentario "future Gloku (TCDE-015)" pero **no hay handler**. Sin test. Efecto de copia snapshot inexistente.
- **M4 HandTrap variante "Si tomas esta carta" (Kap KPRC-017) no detectada**: engine dispara `on_draw` solo si `'al ser tomada' in effect_text.lower()` (`engine.py:447, 1713`). La variante de Kap con "Si tomas esta carta de tu Mazo" no está cubierta. Sin test específico.
- **AI respeta snapshot D16/D22 por accidente**: `strategies._espectro_effective_damage` (líneas 8-24) calcula damage como "max de Adendei aliado" (coincide con D22 al leer damage desde carta aliada), pero luego el engine al ejecutar `possess` override con base_damage del poseído, creando inconsistencia entre scoring AI y estado real.

---

## Capa A — Coverage de tests por ruling

Mapeo ruling ↔ tests existentes en `tests/` (unit + integration + regression + e2e).

### Rulings cerrados documentados en `rulings-v5.1.md` + FAQ

| Ruling | Título corto | Test(s) que cubre | Cobertura | Gap / Comentario |
|--------|-------------|-------------------|-----------|------------------|
| **D1** | Energías 7 u 8 | (config-data, no mecánica) | — | No aplica a engine |
| **D2** | Subfase Resolución §Batalla | `test_phases.py` (12 tests fase) | 🟡 Parcial | No prueba orden AR→daño→Activa de p29/b04 explícitamente |
| **D3** | Rava puede ser atacado | `test_rava.py` (5 tests, flags mutables) | 🔴 Gap | Ningún test valida **que Rava sea target válido en ataque**; solo valida HP caps y flag `used_rava_return`. `test_rava_not_in_initial_field` no cubre target. |
| **D4** | Protector suplente hereda descansos | `test_protector_death.py::test_suplente_gets_12_hp_and_old_rests` (L88–101) | ✅ Cubierto | Valida 12 HP nuevos + descansos heredados. FALTA caso "cambio sin extinción" (p08/b08 bullet 4): suplente conserva vida+descansos del anterior (NO 12 HP nuevos). |
| **D5** | Cartas Fuera del Juego | — | 🔴 Gap | No hay tests de zona "Fuera del Juego" (Quam TCOO-006U). Sin `out_of_game` en código (grep vacío). |
| **D6** | Descansos máximos 2 | `test_setup.py::test_protector_initial_3_rests`, `test_rests.py` (11 tests) | ✅ Cubierto | OK. `ADENDEI_MAX_RESTS=2` validado en `test_rava_shares_adendei_hp_and_rest_caps`. |
| **D7** | Cartas Limitadas ámbito | `test_deck_validation.py` (7 tests) | 🟡 Parcial | Valida duplicados máx, pero no ámbito "Adendei+Rava+Espectro". |
| **D8** | Targeting ocultas en ataque | `test_reveal_hide.py` (7 tests) | 🟡 Parcial | Valida stateful reveal/hide, pero no prueba que ataque pueda targetear carta oculta rival. |
| **D9** | Vida máxima Tokens | `test_eng29_max_2_tokens.py` (5) | ✅ Cubierto (tokens cap). Gap: **vida máxima Token = 6** no validada explícitamente. |
| **D10** | Pasar turno | `test_phases.py`, `test_multi_turn_flow.py::test_pass_only_game_has_no_winner_early` | ✅ Cubierto | Flujo de pass + EOT. FAQ-02 "saltar turno = saltar a EOT" no testeado explícitamente. |
| **D11** | Espectros límite recomendado | — | 🟢 No aplica | Meta-regla de deck building, no runtime. |
| **D12–D15** | Numeración rulebook | — | 🟢 No aplica | Documental. |
| **D16** | Gloku snapshot único copia | — | 🔴 **GAP CRÍTICO** | No existe handler Gloku en `effects.py` (solo menciones en comentarios `_can_create_token`). Sin test. D16 principio "copia=snapshot" tampoco testeado para otras cartas (Ruk Espectro Draconiano). |
| **D17** | Efectos persisten post-Extinción | `test_eng03_burn_permanent.py` (4) | 🟡 Parcial | Cubre solo caso quemar persistente (Hori). No valida principio general "texto de carta supercede rulebook" (p20/b10). |
| **D18** | Inspección zona Fuera del Juego | — | 🔴 Gap | No aplica directamente a runtime. Si hay UI debería testearse separado. |
| **D19** | Forzar pasar turno | — | 🟢 No aplica (reserva de diseño) |
| **D20** | Espectros vida/posesión/requisitos | `test_engine_pure_helpers.py::test_compute_damage_possessed` (L98–104) + `test_eng25_espectro_multi_attack.py` (3 tests código estático) + regex parsing en engine | 🟡 Parcial | Compute damage con possessed_folio, ENG-25 doble HP sin poseer. **Gaps:** requisito "N o más X en Extinción" testeado solo por regex de replacement (línea 382-405 engine), no hay test unitario de `possess` action con/sin requisito cumplido. |
| **D21** | Posesión = vivificación atómica; Adendei bajo Espectro | `test_engine_pure_helpers.py::test_compute_damage_possessed` | 🔴 **GAP CRÍTICO** | Ningún test valida: (a) Adendei queda en el campo BAJO el Espectro (engine lo envía a Extinción directamente L2765), (b) disparo de triggers "si es vivificada" al poseer, (c) atomicidad (no se dispara trigger "si X va a Extinción"). **Engine viola D21 estructuralmente.** |
| **D22** | Espectro NO hereda stats del Adendei | `test_engine_pure_helpers.py::test_compute_damage_possessed` (contrario: compute_damage usa damage **del poseído**, NO del Espectro) | 🔴 **GAP CRÍTICO** | Engine copia `base_damage = _safe_damage(target_card.damage)` y `base_rests = _safe_damage(target_card.rests)` al poseer (L2772-2774). `_compute_damage` (L197-206) usa `possessed_card.damage`, no el del Espectro. D22 dice lo contrario. Sin test que valide la regla correcta. |
| **D23** | Ariam BETA-001 histórica | — | 🟢 No aplica (legalidad) |
| **D24** | Cap de vida por tipo | `test_stats.py::test_adendei_max_hp_6`, `test_protector_max_hp_12`, `test_heal_caps_at_max_hp` (9 tests) | ✅ Cubierto (Adendei=6, Protector=12). Gap: cap Token=6, cap Rava=10. |
| **D27** | Draxes "GANAS EL JUEGO" | — | 🔴 Gap | Engine detecta "ganas el juego" en `engine.py:551` solo durante protector_death con kill del protector atacante. No hay test que valide: (a) condición alternativa vs 10-ext, (b) que la victoria sea negable, (c) que requiera que la Pasiva cumpla condición Y resuelva. |
| **D28** | Cambiar/Intercambiar = §6.5 | `test_engine_sweep_and_actions.py` (15 tests) + `test_effects_actions.py` (24) | 🟡 Parcial | Cubre acciones intercambio/cambio de forma indirecta pero no hay test específico para preservación de marcas+equipos+vida+`frente a`. |
| **D29** | "Neutral" effect_text | (saneamiento de datos) | 🟢 No aplica |
| **D32** | Nahual copia Activa rival con doble costo | — | 🔴 Gap | Sin test de Nahual (FYTE-012S). Engine: grep vacío para "Nahual" handler específico. |
| **D33** | Espectro sin poseer ataca pagando doble HP aliado | `test_eng25_espectro_multi_attack.py` (3 tests — indirectos, por grep código) | 🟡 Parcial | Solo valida que existen los eventos `ESPECTRO_MULTI_COST`/`ESPECTRO_MULTI_DRAIN` y que la fórmula sea `dmg_extra * 2`. NO valida comportamiento runtime (sin state de Espectro real). |
| **D34** | Espectro muere +2 cartas a Extinción | — | 🔴 **GAP CRÍTICO** | No hay test que valide: matar Espectro poseyendo = 2 cartas a Extinción. Impactado por bug D21: engine envía Adendei poseído **al poseer**, no al morir, así que D34 se cumple "accidentalmente" por mecánica errónea (duplica el conteo). |
| **D35** | Espectro = efecto propio + efecto poseído (aditivo) | — | 🔴 Gap | Sin test. Engine no implementa el efecto adicional heredado del poseído (porque el poseído ya no está en campo para disparar Pasivas). |
| **D38** | Límite 2 descansos aplica a Espectros | `test_rests.py` (11 tests) | 🟡 Parcial | Cap `ADENDEI_MAX_RESTS=2` aplica transversalmente en engine (L2064), pero no hay test que fuerce Espectro específicamente. |
| **D39** | Ruk snapshot único al copiar Rava | — | 🔴 Gap | Regex X2 en `effects.py:5226` detecta "copia la pasiva y costo de 1 rava en extinción" pero no hay test. D16 principio no probado para Ruk. |
| **D40** | Tzun Heraldo ataque múltiple (🟡 abierta) | `test_eng25_espectro_multi_attack.py` (genérico multi-attack) | 🟡 Parcial | Abierta en comunidad. Engine usa `bonus_attacks` / `multi_attack` / `attack_all_rivals` (L2165-2192). Sin test específico para Tzun costo+triggers por ataque. |
| **D41** | Activas-Rápidas ventana abierta turno rival | — | 🔴 Gap | Engine permite `activa_rapida` en `pending_activa_rapida` (`engine.py:2400-2432`). Sin test que valide: (a) ventana abierta en cualquier subfase, (b) resolución inmediata al declarar, (c) no hay ventana de respuesta intermedia. |
| **D43** | Pasivas Opcionales vs Generales (🟡 abierta) | `test_pasiva_once_per_turn.py` (5) | 🟡 Parcial | `_is_optional_pasiva` existe (L244 engine) con detección por keywords. Sin test específico. |
| **D44** | HandTraps negables | — | 🔴 Gap | Sin test que valide negación de HandTrap. Engine dispara `on_draw` (L447, 1713) pero no interconecta con efectos de negación. |
| **D45** | 8 turnos = empate total (4 por jugador) | — | 🔴 **GAP CRÍTICO** | Engine implementa `turns_without_damage >= 8` (L3086) como **field reset**, NO como empate. No existe `winner='draw'` en código. `_check_victory` (L349) solo devuelve 'p1'/'p2'/None. |
| **E7** | Titán con tilde | `test_eng36_subtype_checkers.py` (8) | ✅ Cubierto | Normalización de acentos validada. |
| **E8** | Subtipos compuestos = multisubtipo | `test_eng36_subtype_checkers.py` (8) | ✅ Cubierto | `subtypes: [primary, secondary]` validado. |
| **M2.3** | Anti-cambio aplica intercambio | — | 🔴 Gap | Sin test Planta Carnívora + intercambio. |
| **M2.4** | "Zona Principal original" = lado propio | — | 🔴 Gap | Sin test Ariam Resurrección + intercambio aliado↔rival. |
| **M2.5** | Mazo propio abierto al dueño | — | 🟢 No aplica (semántica de UI) |
| **M2.6** | Marcas preservadas al intercambiar | `test_eng36_subtype_checkers.py` (indirecto) + `test_marks_lifecycle.py` (6) | 🟡 Parcial | `test_marks_persist_across_turns` sí; **pero no test de marca tras `cambiar`/`intercambiar`**. |
| **M3** | "Durante el resto del juego" (🟡 abierta) | — | 🟢 No aplica (abierta) |
| **M4** | HandTraps — patrón "al ser tomada" | — | 🔴 Gap | Engine dispara `on_draw` pero sin test. Variante "Si tomas esta carta" (Kap KPRC-017) **no detectada por el regex**. |
| **M5** | Privacidad mazo rival (🟡 abierta) | — | 🟢 No aplica (abierta) |
| **M6** | Descansos indicados = impresos | `test_rests.py` (11 tests base) | 🟡 Parcial | Cap base impreso validado. Xakros Peste (IDRMP-022/RAMI-007/RMR-017) sin test específico. |
| **M11** | "Frente a" = espejo posicional | — | 🔴 Gap | Sin test explícito de adyacencia espejo (Satélite V.E.L.O., Hali, Hog Terremoto, Kuyovi, Tekei). |
| **M12** | Efecto rápido = promoción velocidad | — | 🔴 Gap | Sin test Ryptor / Yakerr Vínculo Odémico. |
| **M13** | Fase de Batalla como ventana | `test_phases.py` (12) | 🟡 Parcial | Valida transición fases pero no "durante Fase de Batalla" scope (Escudos I.C.A.R.O., Balim Anochecer). |
| **M14** | "Original/estadísticas originales" = impreso | `test_stats.py` (9) + `test_engine_pure_helpers.py` (38) | 🟡 Parcial | `base_damage`/`base_rests` existen y se usan. Sin test de Virste Reseteo revirtiendo modificadores. |
| **M15–M23** | Tentativos rulebook (erratas + clarificaciones) | — | 🟢 No aplica (editorial) |
| **FAQ-01** | Boca abajo + descanso sin revelar | `test_reveal_hide.py` (7) | 🟡 Parcial | `test_hide_card_flips_revealed_false`, `test_hide_card_clears_damage_bonus`. No prueba "acumular descansos estando oculta". |
| **FAQ-02** | Saltar turno = saltar a EOT | `test_end_of_turn.py` (11) + `test_phases.py` (12) | 🟡 Parcial | Pass válido pero no caso "debe pasar 1 turno" (Yakerr Hogar LGRO-065). |
| **FAQ-03** | Ataque negado NO dispara triggers "si ataca" | — | 🔴 **GAP CRÍTICO** | Sin test. `attack_cancelled=True` (L2012) marca `attacked_this_turn=True` de todos modos → dispara post-attack triggers (Kitse L551, check_passive_triggers L2066). Block Z1 `damage_bonus += bonus` se aplica como buff de stat, no como condición del ataque. |
| **FAQ-04** | Yanzi Precisión errata 6 puntos | `test_eng23_yanzi_vinculo.py` (3) | 🟡 Parcial | Valida vínculo, no el caso "6 puntos se pierden si ataque negado". |
| **FAQ-05** | Orden resolución Activas-Rápidas | — | 🔴 Gap | Sin test para 2 AR simultáneas + prioridad del jugador en turno. |
| **FAQ-06** | Daño extra vs daño efecto (Voracidad Natural) | `test_damage.py` (17) | 🟡 Parcial | Valida tipos DMG_ATTACK/DMG_MARK/DMG_COST. No hay test Voracidad Natural con daño extra. |
| **FAQ-07** | Revelar al atacar + Pasivas difieren a Post | `test_pasiva_once_per_turn.py` (5) | 🟡 Parcial | Sin test Bóras Sacrificio o equivalente "Pasiva dispara en Batalla, resuelve en Post". |
| **FAQ-08** | Ixim revelación + Pasivas | `test_bio.py`, `test_equipment.py` | 🟡 Parcial | Sin test Copal Blanco (FYTE-008) / Planta Carnívora (RAMI-008S) como ejemplos canónicos. |

### Resumen numérico Capa A

| Estado | Count | % |
|--------|-------|---|
| ✅ Cubierto | 7 | ~18% |
| 🟡 Parcial | 19 | ~49% |
| 🔴 Gap | 13 | ~33% |
| 🟢 No aplica | 9 | — |

De los **7 gaps críticos**: D16 Gloku, D21 stack físico, D22 no-herencia stats, D34 conteo +2, D45 empate, D27 Draxes, FAQ-03 triggers.

---

## Capa B — Auditoría `strategies.py`

**Ubicación:** `/home/coder/codice-kodem/api/kodem_engine/strategies.py` (1942 líneas).

### Estrategias existentes (6)

| Estrategia | Líneas | Propósito |
|-----------|--------|-----------|
| `aggressive_strategy` | 79–395 | Revelar todo, atacar débil, equipar |
| `defensive_strategy` | 396–475 | Proteger, atacar amenazas |
| `balanced_strategy` | 476–620 | Mix |
| `smart_strategy` | 621–1385 | Scoring + heurísticas deep |
| `pass_strategy` | 1386–1393 | Always pass (testing) |
| `adaptive_strategy` | 1531–1942 | Deck-aware router |

Helpers globales: `_espectro_effective_damage` (8), `_rava_effective_value` (26), `_pick_best_rot` (63), `_analyze_deck_traits` (1395), `_get_deck_traits` (1495).

### Gaps vs rulings nuevos

1. **D16/D22 `_espectro_effective_damage` (L8-24):**
   - Calcula "max damage de Adendei aliado en campo" como estimación para posesión.
   - **Consistente con D22 conceptualmente** (Espectro tomaría valor de stat del mejor aliado), pero **no refleja D21 stack**: se asume que el Espectro "ganará" el damage al poseer, lo cual coincide con el bug actual del engine (copia stats), no con D22 real (Espectro usa sus propios stats).
   - **Gap:** la AI no distingue "Espectro con efecto propio + efecto poseído aditivo" (D35). Solo valora damage output.

2. **D17 pasivas post-Extinción:** no hay lógica en strategies para proyectar efectos de Quam TCOO-006U ("aún si esta carta ya no está en el campo"). La AI no anticipa valor de sacrificar Quam.

3. **D27 Draxes "GANAS EL JUEGO":** `score_state` (suggest_turn.py:181) NO considera condiciones de victoria alternativas. Solo extinción count + HP diffs. **Gap estratégico:** AI puede sub-valorar un ataque letal al Protector rival cuando Draxes está en campo, porque no reconoce alt_win de `engine.py:551`.

4. **D34 Espectro +2 a Extinción:** `score_state` usa `_count_extinction` pero por el bug D21, matar un Espectro poseyendo solo envía 1 carta (el Espectro) a Extinción en ese momento (el Adendei ya fue a Extinción al poseer, contabilizado previamente). Scoring se auto-corrige por casualidad.

5. **D41/FAQ-05 AR priority:** `smart_strategy` (673-689) evalúa `activa_rapida` como respuesta defensiva basándose en `pending_activa_rapida` y damage incoming. **No respeta prioridad del "jugador en turno"** cuando 2 AR son simultáneas (la AI asume que su AR resolverá primero, lo cual solo es cierto si es su turno). Engine mismo no maneja explícitamente dos AR simultáneas.

6. **D44 HandTraps negables:** AI no considera HandTrap como opción al evaluar reveal de cartas. No hay acción `trigger_handtrap` en `get_legal_actions`. El engine dispara automáticamente en draw → AI no decide.

7. **D45 empate 8 turnos:** AI no tiene conciencia de `turns_without_damage`. `score_state` no penaliza estados sin progreso hacia ninguna victoria. `smart_strategy.desperate/closing/winning/losing` están basados en extinction count (winning:>2, desperate:>=7), no en turn-clock. **Posible comportamiento emergente:** la AI puede quedarse pasiva hasta el field reset, permitiendo loops improductivos.

8. **D20 requisitos de posesión:**
   - `engine.py:1070-1101` parsea "N o más Adendei/Rava 'Name' en tu Extinción" con regex.
   - `strategies.aggressive_strategy:145-154` llama `actions.possess` sin validar requisito (confía en get_legal_actions).
   - `adaptive_strategy` (Espectro archetype) hace igual.
   - **Gap:** si hay múltiples Espectros disponibles con distintos requisitos, AI elige el primero por `target.hp` ascendente, no por valor estratégico del Espectro.

9. **Dudas abiertas D36/D37 reflejadas sin juzgar:**
   - D36 (múltiples Espectros posesión simultánea): engine permite acción `possess` por cada Espectro sin poseer, independientemente. AI no detecta pool compartido de Extinción.
   - D37 (Tlahuelpuchi bloquea posesión): flag `no_espectro_sacrifice` (si existe) no aparece en `strategies.py`. Grep vacío.

10. **M14 stats originales:** `strategies` usa `base_damage + damage_bonus` correctamente. Virste Reseteo (revierte modificadores a impresos) no tiene estrategia específica — la AI no prioriza usarla cuando tiene `damage_bonus` negativo.

11. **E8 subtipos múltiples:** `_analyze_deck_traits` (1395) filtra por `c.energy` y `c.name.lower()` — no usa `subtypes: []`. Riesgo: Macit (Guardián+Catrín), Therz (Titán+Catrín) pueden no ser contados en tribales específicos.

---

## Capa C — `suggest_turn.py` + engine.simulate

**Ubicación:** `/home/coder/codice-kodem/api/kodem_engine/suggest_turn.py` (594 líneas).

### `score_state` (L181-245)

Factores ponderados:
- Win/loss: ±10000.
- Extinción diff: `(opp_ext - my_ext) * 100`.
- HP field: `* 5`.
- Protector HP: `* 3`.
- Damage potential (available cards): `* 8`.
- Opponent rests: `* 6` (tempo).
- Marks on opp: `* 10`.
- Cards near death: `* 15`.
- Vínculo availability: `± 20`.
- Equip zone resources: `* 3`.

**Rava devuelta al Mazo:** `_count_extinction` (engine.py:339) filtra Tokens pero NO Ravas. Rava en Extinción cuenta hacia victoria (correcto por rulebook p15/b12). Al devolverse al Mazo por `rava_return` (una vez por juego, flag `used_rava_return`), sale de extinction → scoring baja → consistente.

**Fuera del Juego:** `Player.out_of_game` no existe en `types.py` (grep vacío). Quam (TCOO-006U "Fuera del Juego") no está implementado como zona separada; probablemente va a un "out_of_play" fake o se pierde silenciosamente. Scoring no la considera.

**Espectros poseídos:**
- Con el bug D21, al poseer: Adendei → Extinción + Espectro queda solo con base_damage copiado.
- `score_state` contabiliza: HP del Espectro (que es su hp impreso), `_compute_damage` lee damage del poseído (via `possessed_folio`). Scoring funcional aunque semántica del engine está invertida vs D22.

### `describe_action` (L246-338)

Cubre: `pass`, `reveal`, `reveal_protector`, `reveal_bio`, `send_bio_to_extinction`, `attack` (incluye `⚠️ Costo:` si existe), `use_activa`, `vinculo`, `equip`, `replace`. **No cubre:** `activa_rapida`, `rot_activa`, `rot_activa_rapida`, `possess`, `apply_mark` — caen al fallback genérico `f'{action.type} pos={action.pos}...'`.

- **Gap FAQ-03 (visibilidad de ataque negado vs resuelto):** `describe_action` no expone "si este ataque es negado, perderás los 6 puntos de Yanzi / el trigger 'si ataca' no disparará". Usuario no ve el riesgo.

### `evaluate_actions` (L339-362)

- Simula cada acción vía `apply_action`.
- Score delta = `new_score - base_score`.
- Ordena desc.
- **Gap D45:** no considera turnos sin daño como penalty (AI no "teme" al empate).
- **Gap FAQ-05:** evalúa cada AR independientemente, no el **escenario de cadena** (si tu AR se activa y luego rival activa otra AR en respuesta, cómo resuelven).

### Ventana AR en simulación (D41)

`engine.py:2400-2432` maneja `activa_rapida` creando `pending_activa_rapida` y re-ejecutando el ataque. Flag `_ar_phase_done` previene re-entrada infinita. **No se valida explícitamente la ventana abierta durante TODO el turno rival** — la AR solo puede dispararse cuando existe `pending_activa_rapida` (creado por un ataque). Si un jugador quisiera activar AR durante Fase Previa rival (no en respuesta a ataque), la legalidad actual la bloquea. D41 dice "como respuesta" pero el rulebook p29/b04 permite "durante el turno del rival" sin restricción a respuesta. **Interpretación engine: estricta (solo respuesta a ataque).**

### Condiciones de victoria

- **10 cartas Extinción:** `_check_victory` L349. ✅ implementada correctamente (Token excluded).
- **Draxes "GANAS EL JUEGO":** `engine.py:551`. Validada en `_sweep_dead` tras protector_death. 🟡 solo se dispara si el killer atacó el protector; no vía efectos alternativos.
- **Empate D45:** 🔴 NO implementado. `turns_without_damage >= 8` = field reset, no tie. El `return type` de `_check_victory` es `Optional[str]` con values 'p1'/'p2' → no hay 'draw'.

---

## Capa D — 10 casos críticos (comportamiento observado)

Lectura estática del código. Cada caso cita archivo:línea.

### 1. Deck con 2 Espectros Ariam + 3 Ariam Ext → ambos pueden poseer (D36 abierta)

- `engine.py:1063-1101`: `get_legal_actions` itera cada Espectro en field sin tracking global de pool Ext.
- Para cada Espectro, verifica requisito (N Ariam en Ext). 2 Espectros, 3 Ariam → ambos cumplen `ext_count >= 2`.
- **Ambos generan acciones `possess`**. Si el jugador las ejecuta secuencialmente, el primer `possess` envía 1 Adendei a Ext (no Ariam), pero el requisito **se verifica contra la Ext del momento** → el segundo Espectro probablemente encuentra 3 Ariam aún (no se sacrifica Ariam en el acto de posesión).
- **Comportamiento:** sí, ambos pueden poseer simultáneamente. No hay contador compartido. Consistente con interpretación permisiva de D36 abierta.

### 2. Virste Reseteo con efectos activos → qué revierte (D30 abierta)

- `effects.py` grep "Virste" → no hay handler específico.
- Regex genérico de reseteo: no encontrado por grep `reseteo|reset.*stats`.
- **Comportamiento:** engine probablemente NO implementa Virste Reseteo. Sin test. Impacto indeterminado.

### 3. Ruk copia Pasiva de Rava → snapshot único respetado (D16/D39)

- `effects.py:5226-5252` (X2): regex `copia\s+la\s+pasiva\s+y\s+costo\s+de\s+1\s+rava\s+en\s+extinción`.
- Al resolver: copia `effect_text` y `cost_text` al estado del Espectro (probablemente como cache en el field card).
- **Snapshot único**: sí, se ejecuta una vez al revelar/invocar. No se re-lee si la Rava fuente se modifica después. ✅ coherente con D16/D39.
- **Gap:** sin test que lo valide.

### 4. Protector muere, suplente entra → descansos heredados (D4)

- `engine.py:509-558` (death handler).
- `test_protector_death.py::test_suplente_gets_12_hp_and_old_rests`: valida 12 HP + descansos heredados.
- **Comportamiento:** cumple D4 para el escenario "muerte→suplente". Falta test "cambio sin muerte" (p08/b08 bullet 4): aquí el suplente debe conservar **vida + descansos** (no 12 HP nuevos). Grep `_protector_leave_alive` (engine.py:208) existe pero sin test.

### 5. Intercambio aliado↔rival (Hali) → marcas/equipos/vida (M2.6, D28)

- `engine.py` grep "Hali|intercambia.*rival": hay patrones en `effects.py` block Y/Z.
- Rulebook p23/b18: "las cartas cambiadas conservarán las mismas estadísticas y condiciones que tenían originalmente antes del cambio (incluyendo equipos y vida)".
- Sin test explícito para el caso aliado↔rival con marcas.
- **Comportamiento indeterminado:** depende de si el handler copia `marks`, `equips`, `hp`, `damage_bonus` al hacer el swap. `FieldCard.deep_copy` preserva todo, pero el swap manual puede perder estado si solo se cambian folios.

### 6. Tzun Heraldo ataque múltiple → costo rests + triggers (D40 abierta)

- `engine.py:2155-2248` (multi-attack block): usa `bonus_attacks`, `multi_attack`, etc.
- `attacked_this_turn` se setea solo una vez (en primera ejecución).
- Costo de descanso: regla general `fc.rests = fc.base_rests` en EOT (L3024-3041), independiente del número de ataques.
- **Comportamiento:** Tzun paga **1 descanso** al final, no N. Consistente con "attack_this_turn" lógica base. Cada ataque individual dispara `check_passive_triggers('attack_resolved', ...)` (L2066), así que triggers SÍ se disparan por ataque (consistente con FAQ-03 aplicado a cada ataque como condición independiente).
- **Pendiente:** ¿Tzun debería pagar N descansos (uno por ataque)? D40 abierta. Engine: no.

### 7. Draxes "GANAS EL JUEGO" → condición alternativa, negable (D27)

- `engine.py:551`: detecta 'ganas el juego' en effect_text del atacante DURANTE `_sweep_dead` del protector_death. Solo activa si protector rival murió Y atacante tiene esa frase.
- **Bypasea 10 cartas Ext**: sí (se setea `s.winner` directamente).
- **Negable**: depende de si la Pasiva del Draxes fue negada **antes** del ataque resolver. `fc.negated_until_turn` check existe (L1401, L3034). Si Draxes revelada + negated → Pasiva no resuelve → no dispara 'ganas el juego'. ✅ coherente con D27.
- **Gap:** no hay test del camino negado vs no-negado.

### 8. Ataque negado por Yakerr → triggers "si ataca" (FAQ-03)

- `engine.py:2012-2016`: cuando `s.attack_cancelled=True`, marca `attacker.attacked_this_turn = True` (la carta descansa pero el ataque no ocurre).
- `check_passive_triggers('attack_resolved', ...)` en L2066 se ejecuta SIEMPRE después del bloque de daño (incluso si fue negado, porque el código sale del `elif action.target_pos` pero entra al post-attack block).
- **Comportamiento observado:** triggers "si atacó" (Kitse engine.py:551, Xilan scale_on_attack L2069) **se disparan igual**.
- **VIOLACIÓN FAQ-03:** un ataque negado no debería disparar triggers "si ataca"/"si atacó". Engine los dispara.

### 9. HandTrap Kap (KPRC-017) al ser tomada (M4, variante "Si tomas")

- `engine.py:447`: `if 'al ser tomada' in drawn_card.effect_text.lower()`.
- Ruling M4: patrón canónico `"Pasiva: Si esta carta es tomada del Mazo..."` **+ variante activa** `"Pasiva: Si tomas esta carta de tu Mazo..."` (Kap).
- **Kap KPRC-017** usa "Si tomas esta carta" → **NO detectado** por regex `'al ser tomada'`.
- **Comportamiento:** el HandTrap de Kap NO dispara. **VIOLACIÓN M4.**

### 10. 8 turnos bloqueo → empate detectado (D45)

- `engine.py:3075-3117`: `turns_without_damage >= 8` → **field reset**, NO empate.
- No existe `s.winner = 'draw'` ni equivalente.
- D45 cerrada: "8 turnos totales = 4 por jugador alternados" → debería declararse empate.
- **Comportamiento:** engine **NO** detecta empate. Hace reseteo físico de tablero y continúa. **VIOLACIÓN D45.**

---

## Dudas abiertas reflejadas en AI (sin juzgar)

- **D30** (Virste Reseteo alcance): engine probablemente no implementa Virste → AI no tiene que decidir sobre marcas/energía/copias.
- **D31** (no puede ser negada alcance): `cant_be_negated` flag existe (`effects.py:492`). AI en smart_strategy considera "cards with no puede ser negad" para reveal priority (L1394 en deck_traits `no_negate_count`). No distingue entre "este ataque no puede ser negado" vs "este efecto no puede ser negado" — usa un solo flag booleano.
- **D33** (Espectro sin poseer + triggers): engine dispara `check_passive_triggers('attack_resolved')` en multi-attack también; por tanto ataques de Espectro sin poseer SÍ disparan triggers. Interpretación permisiva.
- **D36** (múltiples Espectros simultáneos): permisivo, ambos pueden poseer (ver caso 1).
- **D37** (Tlahuelpuchi bloqueando posesión): no encontrado flag en código. Probablemente no implementado.
- **D40** (Tzun ataque múltiple costos): 1 descanso total (ver caso 6), no N.
- **D43** (Pasivas Opcionales vs Generales criterio visual): `_is_optional_pasiva` usa keywords "puedes" / "pueden" en effect_text (`engine.py:244`). AI no distingue visualmente (no hay flag `is_general` vs `is_optional`).
- **D46** (Rava Extendido): sin tratamiento especial en engine.
- **D52** (Zaykan Citadel AoE): desconocido.
- **M3** (Mixtla "durante el resto del juego"): sin tratamiento.
- **M5** (privacidad mazo rival): semántica de UI, no runtime.

---

## Top 10 tests nuevos recomendados

Prioridad P0 = crítico (gap + violación), P1 = importante (gap en regla resuelta), P2 = nice-to-have.

1. **[P0] `test_d21_possessed_stack_preservation`** — Espectro posee Adendei aliado: validar que el Adendei **permanece en el campo bajo el Espectro** (no va a Extinción al poseer). Actualmente el engine envía al poseído a Extinción (`engine.py:2764-2765`). **Este test hoy FALLA → confirma bug D21.**

2. **[P0] `test_d22_espectro_no_hereda_stats`** — Espectro con damage impreso 3, posee Adendei con damage 5: validar que `_compute_damage` devuelve **3** (del Espectro), no 5. Hoy devuelve 5 (`engine.py:200-203`). **Confirma bug D22.**

3. **[P0] `test_d34_espectro_dies_sends_2_to_extinction`** — Matar Espectro poseyendo Adendei: validar que **al morir el Espectro** (no al poseer) se envían **2 cartas** a Extinción simultáneamente. Hoy el Adendei ya está en Ext desde el `possess`, por lo que se duplica la mecánica.

4. **[P0] `test_d45_draw_on_8_turns_without_damage`** — Forzar 8 turnos alternados sin daño: validar que `state.winner == 'draw'` (actualmente `None` + field reset).

5. **[P0] `test_faq03_attack_negated_does_not_trigger_si_ataca`** — Carta X con Pasiva "si esta carta ataca, daña 2 a Y" atacando → `attack_cancelled=True` (via Yakerr/O4) → validar que **damage_bonus NO se aplicó** y Y **no recibió daño**. Hoy Z1 L5498 suma `damage_bonus += bonus` en resolve_effect antes del ataque → daño Y se aplica aunque ataque sea negado después.

6. **[P0] `test_m4_kap_handtrap_variant_si_tomas`** — Colocar KPRC-017 (Kap, Lluvia de Ranas) en top del mazo, forzar draw → validar que Protector recibe +3 HP. Hoy el regex `'al ser tomada'` **NO matchea** "Si tomas esta carta". **Test fallará.**

7. **[P0] `test_d27_draxes_victory_negable`** — Draxes en campo, Pasiva revelada, rival niega Pasiva con Yailok antes del ataque → validar que matar Protector rival **NO dispara** `ganas el juego`. Y caso inverso (sin negación) → sí.

8. **[P1] `test_d4_suplente_cambio_sin_muerte`** — Protector vivo cambiado por efecto (p08/b08 bullet 4): suplente entra con **vida + descansos del anterior** (no 12 HP nuevos). Hoy no hay test.

9. **[P1] `test_d16_gloku_snapshot_token`** — Invocar Gloku (TCDE-015) con Adendei X en campo de 1/1: crear Token con stats 1/1. Buff X a 3/3 → Token sigue en 1/1. `possessed_folio` del Token queda desligado. Hoy no hay handler.

10. **[P1] `test_faq05_two_activas_rapidas_priority`** — Ambos jugadores intentan activar AR simultáneamente durante turno del jugador A: validar que la AR de A se resuelve primero, y la de B espera. Hoy engine no maneja esto explícitamente.

### Tests adicionales recomendados (siguientes 10)

11. `test_d39_ruk_copies_rava_snapshot` — Ruk copia Pasiva de Rava X en Extinción; modificar Rava X (ej. cambiar effect) → Ruk preserva snapshot original.
12. `test_d44_handtrap_negable` — HandTrap dispara, rival con "niega efecto pasivo" → HandTrap no resuelve.
13. `test_faq07_boras_pasiva_resuelve_en_post` — Bóras Sacrificio atacada en Batalla → Pasiva resuelve en Post, no durante Batalla.
14. `test_d41_activa_rapida_window_open_all_rival_turn` — AR activable en Fase Previa/Post del rival (no solo en respuesta a ataque).
15. `test_m11_frente_a_adyacencia_espejo` — Satélite V.E.L.O. targeting carta `frente_a` rival vacía → efecto falla.
16. `test_d32_nahual_copia_activa_doble_costo` — Nahual elige rama (a): paga costo del Protector rival + auto-daño.
17. `test_m14_virste_resets_modifiers` — Virste revierte damage_bonus/heal a valores impresos, preserva marcas.
18. `test_faq06_voracidad_natural_vs_daño_extra` — Daño extra (de Yanzi +6) afecta Voracidad Natural (es daño de ataque aumentado, no daño por efecto).
19. `test_e8_subtypes_multi_filter` — Efecto "todos los Adendei Titán" incluye Therz (Titán+Catrín via `subtypes: ["Titán", "Catrín"]`).
20. `test_d38_limite_descansos_aplica_espectros` — Espectro con rests impresos 3 → cap a 2 igual que Adendei.

---

## Top 5 mejoras estratégicas (Pasada 2-3)

1. **Reestructurar `possess` en engine para respetar D21/D22.** Cambiar `apply_action` caso `'possess'` (`engine.py:2753-2790`):
   - **NO** copiar `base_damage`/`base_rests` del poseído al Espectro (borrar L2772-2774).
   - **NO** enviar el poseído a Extinción al poseer (borrar L2764-2765).
   - **SÍ** agregar `FieldCard.possessed_card: FieldCard | None` como stack físico (el poseído queda "bajo" el Espectro, inactivo: no recibe daño, no ataca, no dispara Pasivas).
   - Al morir el Espectro (`_sweep_dead`): enviar **ambos** (Espectro + possessed_card) a Extinción atómicamente (D34).
   - Update `_compute_damage` para usar **el damage impreso del Espectro**, no del poseído (revertir L197-206).
   - Impacto: `score_state` valuation de Espectros cambia (su damage real es menor; pero su efecto propio + efecto poseído aditivo D35 los mantiene fuertes). Strategies `_espectro_effective_damage` debe repensarse como "damage impreso del Espectro + bonus por efecto copiado".
   - Impacto AI: `adaptive_strategy` Espectro archetype prioriza "high damage ally" para poseer; esto debe cambiar a "ally cuyo nombre cumpla requisito para vivificarlo como ancla". Cambio de heurística no trivial.

2. **Implementar empate D45 como condición de terminación.** `engine.py:3086`:
   - Cambiar `_check_victory` signature a `-> Optional[Literal['p1', 'p2', 'draw']]`.
   - Agregar check: `if s.turns_without_damage >= 8: return 'draw'`.
   - Opcional: mantener field reset como mecánica **alternativa** (opt-in por flag), pero D45 dice claro "8 turnos totales → empate".
   - `score_state`: añadir `if state.winner == 'draw': return 0` (neutral).
   - AI debe evitar empates cuando va ganando (penalty por turns_without_damage cuando `opp_ext > my_ext`) y buscar empates cuando va perdiendo (bonus por turns_without_damage cuando `my_ext > opp_ext + 2`). Es **estrategia nueva** que actualmente no existe.
   - Considerar regression: field reset puede ser la intención original de diseño y D45 la reinterpretación. Validar con Ramsés antes de cambiar.

3. **Arreglar triggers "si ataca" con ataque negado (FAQ-03).** Dos cambios:
   - **Capa resolve_effect:** cambiar Z1 (`effects.py:5498`) para **NO** aplicar `damage_bonus += bonus` de forma estática al leer la Pasiva. En su lugar, encolar un `pending_on_attack_trigger` que se dispara **solo al resolver el daño del ataque** (post-verificación `attack_cancelled`).
   - **Capa apply_action:** en `engine.py:2012-2016` cuando `s.attack_cancelled=True`:
     - NO setear `attacked_this_turn = True` (o separar los conceptos: `declared_attack_this_turn` para descanso, `resolved_attack_this_turn` para triggers).
     - NO llamar `check_passive_triggers('attack_resolved')` (L2066).
   - Aislar el efecto de Yanzi Precisión (FAQ-04): cuando ataque negado, los 6 puntos se pierden → el buff no debe persistir al siguiente turno.
   - AI impact: `score_state` ya considera marks/HP post-acción vía `evaluate_actions` simulación; al corregir esto, delta real de acciones bloqueadas por AR rival será más negativo, AI aprenderá a evitar ataques predecibles cuando rival tiene AR defensivas.

4. **Expandir regex HandTrap para cubrir variante "Si tomas esta carta" (M4).** `engine.py:447, 1713`:
   - Cambiar: `if 'al ser tomada' in et` → `if re.search(r'(al\s+ser\s+tomada|si\s+tomas\s+esta\s+carta)', et)`.
   - Agregar test de Kap KPRC-017 → verificar que cura 3 HP al protector al tomarse.
   - Mejorar handler `on_draw` para respetar D44 (HandTrap negable): antes de aplicar efecto, check `fc.cant_be_negated` en la carta tomada y estado de negación activa del rival.
   - AI impact: `smart_strategy` podría aprender a sacrificar HandTrap como carta "de draw" (si tiene ventaja en la tercia, preferir tomar HandTrap para disparar el efecto). Hoy la AI no ve HandTrap como ventaja.

5. **Implementar scoring de condiciones de victoria alternativas (D27 Draxes) + penalty por turnos sin daño (D45-aware).** `suggest_turn.py:181 score_state`:
   - Añadir check: si `player.protector.hp <= my_lethal_damage` Y un Adendei revelado aliado tiene "ganas el juego" en su effect_text Y la Pasiva no está negada → bonus `+5000` (prácticamente priorizar ese ataque letal).
   - Añadir penalty: `score -= state.turns_without_damage * 50 * sign(opp_ext - my_ext)` — castiga turnos pasivos cuando va ganando, recompensa cuando va perdiendo.
   - Exponer en `describe_action`: marcar ataques que pueden activar `¡GANAS EL JUEGO!` con emoji distintivo (e.g. `👑`) para telemetría/debug.
   - Integrar con `adaptive_strategy`: si el deck tiene Draxes (`deck_traits['has_alt_victory'] = True`), priorizar reveal Draxes + setup ataque al Protector.

---

## Recap de hallazgos accionables

| Severidad | Hallazgo | Archivo:línea | Acción |
|-----------|----------|---------------|--------|
| 🔴 Crítico | D21 Adendei poseído va a Extinción prematuramente | `engine.py:2764-2765` | Refactor `possess` |
| 🔴 Crítico | D22 Espectro hereda stats del poseído | `engine.py:2772-2774`, `engine.py:197-206` | Revertir herencia stats |
| 🔴 Crítico | D45 empate 8 turnos no implementado | `engine.py:3075-3117` | Añadir `winner='draw'` |
| 🔴 Crítico | FAQ-03 ataque negado dispara triggers | `engine.py:2012-2016`, `effects.py:5498` | Separar declared vs resolved attack |
| 🔴 Crítico | M4 Kap HandTrap variante no detectada | `engine.py:447, 1713` | Expandir regex |
| 🟠 Alto | D16 Gloku sin handler | `effects.py` (ninguno) | Implementar + test |
| 🟠 Alto | D27 Draxes negación sin test | `engine.py:551` | Añadir test |
| 🟠 Alto | D34 conteo duplicado vía bug D21 | N/A (derivado) | Resuelve con #1 |
| 🟡 Medio | D32 Nahual sin handler | `effects.py` (grep vacío) | Implementar |
| 🟡 Medio | M11 "frente a" sin test | — | Añadir |
| 🟡 Medio | FAQ-05 AR priority simultánea sin test | — | Añadir |
| 🟡 Medio | D4 suplente cambio sin muerte sin test | `engine.py:208` | Añadir |
| 🟡 Medio | D41 ventana AR solo en respuesta a ataque | `engine.py:2400-2432` | Revisar con Ramsés |
| 🟢 Bajo | E8 subtypes: AI usa name.lower() en vez de subtypes[] | `strategies.py:1395` | Migrar filtros |

---

## Notas finales

- El engine pasa 436/436 tests, lo cual indica **baseline funcional**, pero la suite no cubre los rulings resueltos el 2026-04-19. La deuda de tests es concentrada en Espectros (D20-D22, D34, D36-D39), empate D45, triggers FAQ-03, y HandTraps M4/D44.
- La AI (strategies) **respeta la semántica actual del engine**, no la semántica oficial del rulebook. Cuando se corrijan los bugs D21/D22, varias heurísticas de `adaptive_strategy` Espectro archetype fallarán hasta ajustarse.
- `score_state` es consistente internamente pero no incorpora (a) condiciones alternativas de victoria, (b) penalty por turnos sin progreso, (c) valor de cartas Fuera del Juego (Quam).
- Prioridad sugerida para siguiente sprint:
  1. Implementar los 10 tests nuevos (P0 especialmente).
  2. Corregir bugs D21/D22/D34 con refactor de `possess`.
  3. Implementar empate D45.
  4. Arreglar FAQ-03 triggers.
  5. Expandir regex HandTrap (M4 Kap).

---

_Audit generado 2026-04-19 por subagente Logos. Baseline de referencia: commit previo a este documento, 436/436 tests passing._
