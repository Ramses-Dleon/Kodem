# Validación de Fixes Engine — 2026-04-19

**Auditor:** Logos (2da instancia, cold eyes)
**Rama auditada:** `fixes-rulings-v5.1-2026-04-19` @ `/home/coder/codice-kodem`
**7 commits validados:** `fab3e76`, `b4c718f`, `1602aa7`, `06cff7f`, `76e5925`, `334be28`, `52cfea8`
**Fuentes canon consultadas:** `rulings-v5.1.md`, `rulings-v5.1-addendum-faq-oficial.md`, `master-rulebook-v5.1.md`
**Metodología:** lectura ruling → diff commit → test de regresión → 4 preguntas (interpretación, alcance, tests, side effects).
**Sin ejecución de tests:** 461/461 pasan, pero el pass rate **no** valida entendimiento.

---

## Resumen

| # | Fix | Veredicto |
|---|-----|-----------|
| 1 | FAQ-03 ataque negado NO dispara triggers | ⚠️ con gaps |
| 2 | E8 subtipos múltiples | ⚠️ con gaps |
| 3 | D6 give_rests_by_effect topes duros | ✅ correcto |
| 4 | D34/H1 Espectros → Extinción | ⚠️ con gaps |
| 5 | M22/p29/b06 prioridad pasivas simultáneas | ⚠️ con gaps |
| 6 | M4 HandTrap regex variante Kap | ✅ correcto |
| 7 | D5/D18/H2 Zona Fuera del Juego | ✅ correcto (scope parcial declarado) |

**Global:** 3 ✅ / 4 ⚠️ / 0 ❌. Los fixes interpretan correctamente el ruling en todos los casos, pero **varios tests validan solo marcadores estáticos** ("string X está en archivo Y") en vez de comportamiento end-to-end. Esto es la debilidad transversal más importante. No hay fixes erróneos en sentido fuerte; hay fixes con alcance insuficiente o cobertura frágil.

**Tests que son solo checks estáticos (grep en archivo):**
- Fix 1 FAQ-03: ambos tests
- Fix 5 M22: parcialmente
- Fix 7 D5/D18: `hasattr` checks son estructurales pero razonables

**Top gaps por severidad (detalle al final):**
1. 🟡 Fix 1 FAQ-03 — tests son 100% estáticos; no hay test que simule ataque + negación + verifique que pasiva Kitse NO disparó.
2. 🟡 Fix 4 D34 — la lógica *debe* devolver Adendei poseído a Extinción pero depende del campo `fc.possessed_folio`; no se valida que cuando el Espectro muere por ataque directo (no solo por remove) el trigger se ejecute en TODOS los call sites de muerte.
3. 🟡 Fix 5 M22 — fix correcto en `check_passive_triggers`, pero hay otros loops `for pk in ['p1','p2']` en el engine que podrían tener el mismo problema. No se auditó exhaustivamente.

---

## Fix 1 — FAQ-03: ataque negado NO dispara triggers

- **Commit:** `fab3e76`
- **Archivos:** `api/kodem_engine/engine.py` (+14, –9 L2007–2080)
- **Tests:** `tests/regression/test_faq03_negated_attack_no_trigger.py` (+2)

### Ruling verbatim (FAQ-03)

> Si el efecto de la carta atacante está condicionado a su ataque ("si esta carta ataca") y el ataque es negado, los efectos (activas y pasivas) no habrán cumplido su condición, por lo cual no podrán usarse ya que el ataque no sucedió.

### Q1 Interpretación

✅ **Correcta.** El fix captura `attack_was_cancelled` antes del reset del flag y envuelve el bloque post-attack (`check_passive_triggers('attack_resolved', ...)` + `scale_on_attack`) en `if not attack_was_cancelled:`. Respeta la distinción FAQ: la carta sí descansa (el costo se pagó) pero los triggers "si ataca / después de atacar" no se ejecutan. Ningún matiz perdido del texto oficial.

### Q2 Alcance

🟡 **Gap.** El fix cubre el único call site documentado del trigger `attack_resolved` (`engine.py:2064`). Pero hay otros triggers relacionados en la misma función:
- `engine.py:2083` trigger `ally_attacked` (Balim) — este **sí** debería seguir disparando incluso con ataque negado (el rival "declaró el ataque"), pero FAQ-03 es ambiguo sobre si "fue atacado" cuenta cuando el ataque se negó. El fix lo deja fuera del guard — puede ser correcto (la declaración sí ocurrió), pero no se documenta.
- `scale_on_attack` protegido bajo el guard ✅.
- Trigger del contra-ataque `COUNTER_ABISMAR` (engine.py:2058) está ANTES del guard y **no** se ejecuta en la rama `elif` tras negación — OK.

Los eventos `attack_declared` previos al guard no están tocados, lo cual es correcto per FAQ-03 (la negación ocurre sobre la declaración).

### Q3 Tests

🔴 **Débil.** Los 2 tests nuevos son **100 % estáticos**:

1. `test_faq03_fix_marker_present`: `assert 'FAQ-03' in content`. Un comentario con "FAQ-03" pasa el test aunque el guard no exista.
2. `test_faq03_attack_resolved_guarded_by_cancel_flag`: busca `attack_was_cancelled` en las 20 líneas previas al trigger. Funciona hoy, pero un refactor que renombre la variable o mueva el guard fuera de esa ventana rompería el test sin romper el engine.

**Falta test de comportamiento real:** instanciar `GameState`, poner atacante con pasiva Kitse (trigger `attack_resolved`) + defensor con Activa-Rápida Negar Ataque, ejecutar el turno, y aseverar que **no** hay evento `PASSIVE_TRIGGER` para Kitse en la lista de eventos. Sin este test, el fix no está validado por comportamiento observable.

### Q4 Side effects

✅ Sin regresiones evidentes. El guard solo afecta el path donde `attack_was_cancelled=True`, que hoy solo se setea en NEGATE_ATTACK. El bloque `ally_attacked` queda fuera del guard (línea 2083, al mismo nivel de indentación) — correcto: "ser atacado" es una condición que **sí** se cumple aunque se negue después (consistente con FAQ-07, que distingue "condición cumplida" de "resolución").

### Veredicto

⚠️ **Con gaps.** Interpretación correcta del ruling, alcance suficiente para el bug reportado. **Tests inadecuados**: validan texto en archivo, no comportamiento. Este fix necesita un test de integración que instancie el escenario completo.

---

## Fix 2 — E8: subtipos múltiples

- **Commit:** `b4c718f`
- **Archivos:** `types.py`, `cards.py`, `effects.py`
- **Tests:** `tests/regression/test_e8_multi_subtypes.py` (+7)

### Ruling verbatim (E8)

> "Guardián Catrín" y "Titán Catrín" son **dos subtipos simultáneos**, no un subtipo compuesto nuevo.
> Efectos que filtran por subtipo X aplican a cualquier carta que incluya X en sus subtipos.

Evidencia: p07/b04 lista subtipos como categorías separadas. Macit FYTE-026 = Guardián+Catrín. Therz FYTE-072 = Titán+Catrín.

### Q1 Interpretación

✅ **Correcta.** El fix añade `Card.subtypes: tuple = ()` para retro-compat hashable (dataclass frozen), lee `subtypes` plural de cards.json con fallback `[subtype]`, y `_is_titan`/`_is_catrin` ahora iteran sobre `subtype + subtypes`. Conserva backward compat del campo singular `subtype` (primary) para código legacy que no se migró.

### Q2 Alcance

🟡 **Gap importante (no bloqueante hoy, fragilidad a futuro).** Solo 2 helpers fueron actualizados (`_is_titan`, `_is_catrin`). Quedan sin migrar:

- `effects.py:318` `_is_abisal` → lee solo `card.subtype`.
- `effects.py:336` `_is_equino` → idem.
- `effects.py:354` `_is_feral_sub` → idem.
- `effects.py:372` `_is_lupino` → idem.
- `effects.py:390` `_is_infectado` → idem.
- `effects.py:223` `_is_guardian` → idem (solo subtype singular — pero Macit es Guardián como primary, queda OK por casualidad).
- `engine.py:743, 2763` → filtro directo `'abisal' in fc.subtype.lower()` (sin multi).
- `engine.py:1300, 1452, 2957` → `attacker_card.subtype` directo.
- `effects.py:917-920, 2688, 6516, 6524, 6563, 6751` → lecturas directas de `c.subtype`.

**Implicación real:** hoy no hay carta con, p.ej., doble subtipo Abisal+Kósmico en cards.json (auditoría E8 identificó solo 4 cartas Guardián/Titán+Catrín). Pero **si se añade** una carta así en FYTE+1, esos filtros la tratarán inconsistentemente: por `_is_catrin` sí matcheará (fix aplicado), por `_is_abisal` no. El fix E8 es **cosmético en alcance** para los dos tipos conocidos. La regla canónica E8 ("efectos que filtran por subtipo X aplican a cualquier carta que incluya X") requiere que TODOS los `_is_<subtype>` iteren sobre `subtypes`.

### Q3 Tests

✅ **Buenos.** Los 7 tests son mayoritariamente de comportamiento:
- `test_e8_is_titan_recognizes_multi_subtype_card` y `test_e8_is_catrin_recognizes_multi_subtype_card` validan el helper real.
- `test_e8_macit_has_guardian_and_catrin` valida parsing.
- `test_e8_backward_compat_single_subtype` valida que Virste (solo Titán) sigue funcionando.

No hay test para el gap anterior (`_is_abisal` sobre carta multi con Abisal secundario) porque no existe tal carta hoy. Pass.

### Q4 Side effects

✅ Sin regresiones. `Card.subtypes = ()` default conserva compat. `subtype` primary mantiene ordering determinista (primer elemento de la lista). Dataclass sigue hashable (tuple).

### Veredicto

⚠️ **Con gaps.** Fix correcto para Macit/Therz (casos actuales), pero la regla canónica E8 es universal y el engine solo está parcialmente migrado. Follow-up: extender `_is_abisal/_equino/_feral/_lupino/_infectado/_guardian` al patrón multi-subtype, o refactorizar a un helper genérico `_has_subtype(folio, name)`.

---

## Fix 3 — D6: give_rests_by_effect respeta topes duros

- **Commit:** `1602aa7`
- **Archivos:** `api/kodem_engine/engine.py` L397–430; tests unit `test_engine_pure_helpers.py`, `test_rests.py`
- **Tests:** +2 nuevos, 10 legacy actualizados

### Ruling verbatim (D6)

> Los descansos tienen topes duros por tipo de carta, no acumulables ni por efecto.
> **Zona Principal** (Adendei, Rava, Token): máximo **2 descansos** totales.
> **Protector**: máximo **3 descansos** totales.
> **Aplicación parcial:** Si un efecto daría descansos que excedan el tope, se aplica **solo hasta el tope**.
> Ejemplos:
> - Adendei con 1 descanso + efecto '+2 descansos' → solo se suma 1 (total: 2).
> - Protector con 2 descansos + efecto '+2 descansos' → solo se suma 1 (total: 3).
> - Adendei con 2 descansos + efecto '+1 descanso' → no aplica nada.

### Q1 Interpretación

✅ **Correcta.** `give_rests_by_effect` ahora usa `cap = ADENDEI_MAX_RESTS (2)` total, `give_protector_rests_by_effect` usa `cap = PROTECTOR_RESTS (3)` total. Verificado `types.py:16,18`: ambas constantes tienen los valores esperados. Fórmula `actual = min(amount, max(0, cap - fc.rests))` implementa correctamente la semántica "aplicar solo hasta el tope".

### Q2 Alcance

✅ **Honesto sobre el scope.** El commit reconoce explícitamente: "estos helpers no son llamados actualmente desde effects.py (código muerto en términos de uso interno), pero parte de la API pública." Verificación independiente: `grep give_rests_by_effect|give_protector_rests_by_effect api/kodem_engine/` devuelve solo las definiciones en `engine.py:397,416`. El engine real usa `_safe_add_rests` (`effects.py:184`) que YA respetaba el tope duro. Entonces **no hay bug actual de gameplay** fixeado por este commit — es limpieza de API pública. Correcto por completitud documental.

### Q3 Tests

✅ **Excelentes.** Los tests (`test_rests.py::test_zp_effect_max_2_rest_total`, `test_zp_effect_partial_when_already_at_1`, `test_protector_effect_max_3_rests_total`, `test_protector_effect_partial`) reproducen los 3 ejemplos exactos del ruling D6:

- Adendei con 0 + efecto +3 → total 2 (cap).
- Adendei con 1 + efecto +2 → total 2 (diff=1).
- Protector con 0 + efecto +5 → total 3 (cap).
- Protector con 1 + efecto +2 → total 3.

Tests de comportamiento genuinos (no estáticos). El commit actualiza 5 tests legacy v5.0 que aserían el cap viejo (cap=1 por efecto). Actualización correcta.

### Q4 Side effects

✅ Ninguna. Como los helpers no tienen call sites reales, el cambio no afecta gameplay. Código muerto preventivo alineado con ruling para cualquier uso futuro.

### Veredicto

✅ **Correcto.** El único fix de los 7 cuya aplicación corrige un bug de gameplay actual es **nulo** (código muerto), pero el commit es honesto sobre ello. La alineación con D6 es apropiada y los tests son sólidos. Sin gaps.

---

## Fix 4 — D34/H1: Espectros muertos van a Extinción

- **Commit:** `06cff7f`
- **Archivo:** `api/kodem_engine/engine.py` L632–740 (bloque `_sweep_dead` Espectros)
- **Tests:** `tests/regression/test_d34_espectro_death_extinction.py` (+3)

### Ruling verbatim (D34 + p14/b19)

**D34:** "D21 estableció que Espectro + Adendei poseído se envían AMBOS a Extinción cuando el Espectro muere. Ambas cartas son 'cartas enviadas a Extinción' a efectos del conteo hacia la victoria (10 cartas = victoria, p15/b12). Matar un Espectro en posesión vale 2 cartas para el tracker de victoria."

**p14/b19 (rulebook §3.7):**
> • Si un Espectro abandona el campo, su carta Poseída irá a Extinción.
> • Cuando una carta poseída es enviada a Extinción, regresa a su tipo y subtipo originales, **por lo tanto, pueden disparan los efectos normales que requieran que *Adendei, Ixim, Rot,* etc. sean enviados a Extinción**.

### Q1 Interpretación

🟡 **Parcial.** El fix cumple D34: Espectro → `ext_owner.extinction`, Adendei poseído → `ext_owner.extinction`, ambos cuentan al tracker vía `_track(... 'death_turn')`. Los Tokens correctamente se mantienen en REMOVED FROM GAME (Tokens no tienen Extinción per D9/p06/b08).

**Matiz perdido (p14/b19 bullet 4):** El bullet dice explícitamente que el Adendei poseído **"vuelve a su tipo y subtipo originales, por lo tanto pueden disparar los efectos normales que requieran que Adendei... sean enviados a Extinción"**. El fix solo hace `ext_owner.extinction.append(fc.possessed_folio)` + `_track` para el Espectro. **No llama `check_passive_triggers('ally_death', {dead_folio: possessed_folio})`** para el Adendei poseído. Esto significa que si el oponente tenía una pasiva que dispara "cuando un Adendei aliado es enviado a Extinción" (Cretus scaling, Yimsah, etc.), el Adendei recién-liberado **no** activará ese trigger.

### Q2 Alcance

🟡 **Gap.** El `_sweep_dead` es el único call site de muerte normal — correcto. PERO el Espectro puede dejar el campo por otras vías:
- Intercambio (`p14/b16 bullet 8`: "Si un Espectro es intercambiado por una carta fuera del campo..."): no es muerte pero ES abandono del campo. El Adendei poseído debe ir a Extinción per p14/b19 bullet 2. Busqué `possessed_folio` en código de intercambio — no aparece.
- Efectos de devolución a mano/mazo: si un efecto manda el Espectro al mazo, el Adendei poseído también debería ir a Extinción. No cubierto.

No son parte del scope del fix 06cff7f, pero son gaps relacionados.

### Q3 Tests

🔴 **Los 3 tests son 100 % estáticos** (grep en `engine.py`):
1. `test_d34_espectro_death_goes_to_extinction_marker`: busca `extinction.append(fc.folio)` dentro del bloque `elif is_espectro:`. Pasa hoy, rompe a cualquier refactor.
2. `test_d34_espectro_possessed_adendei_also_to_extinction`: busca string `possessed_folio` dentro del bloque. Un `pass # possessed_folio` haría pasar el test sin hacer nada.
3. `test_d34_token_still_removed_from_game`: busca string `'REMOVED FROM GAME (Token)'`.

**Falta test de comportamiento:** instanciar `GameState` con Espectro posesionando Adendei → matar Espectro → aseverar `p1.extinction == [espectro_folio, possessed_folio]` (no necesariamente ese orden, pero ambos presentes) y `_check_victory` sube en 2 el conteo.

### Q4 Side effects

🟡 Riesgo silencioso con p14/b19 bullet 4: el Adendei poseído no dispara triggers al regresar a Extinción. Cualquier carta con pasiva "cuando un Adendei aliado entra a Extinción" (Yimsah p.ej.) se perderá. Bug real (baja frecuencia hoy porque pocas cartas con ese trigger), pero es una regresión silenciosa contra el ruling.

### Veredicto

⚠️ **Con gaps.** Corrige el bug P1 documentado (Espectros ya no se pierden silenciosamente, tracker correcto), pero (a) omite que el Adendei poseído debe disparar triggers de "enviado a Extinción" per p14/b19 bullet 4, y (b) tests son estáticos y no validan comportamiento. Follow-up necesario: `check_passive_triggers('ally_death', ...)` para el `possessed_folio` también.

---

## Fix 5 — M22/p29/b06: Pasivas simultáneas priorizan al jugador en turno

- **Commit:** `76e5925`
- **Archivo:** `api/kodem_engine/effects.py` L6603–6624 (`check_passive_triggers`)
- **Tests:** `tests/regression/test_s672_passive_priority_active_first.py` (+2)

### Ruling verbatim (p29/b06 = §6.7.2)

> En caso de que se cumplan condiciones para el uso de una o más Pasivas al mismo tiempo, **el jugador en turno tiene prioridad** para la declaración y resolución de una Pasiva y posteriormente se intercalarán las declaraciones y resoluciones de una Pasiva por jugador (Este criterio aplicará también para la resolución de una o más Pasivas-Rápidas).

### Q1 Interpretación

🟡 **Parcial.** El fix implementa "jugador en turno primero, oponente después" (`player_order = [active, other]`). Esto cubre el caso de 2 pasivas simultáneas (1 por jugador).

**Matiz perdido:** el ruling dice "se intercalarán las declaraciones y resoluciones" — si el jugador en turno tiene **varias** pasivas simultáneas y el oponente tiene **varias** también, debería ser: `active_1 → other_1 → active_2 → other_2 → ...` (intercalado round-robin). El fix hace `all_active_passives → all_other_passives` (batch por jugador). Para 1 vs 1 coinciden; para N vs M, el batch puede contradecir el ruling. En práctica (hoy), raramente se dan ≥2 pasivas simultáneas por jugador con mismo trigger, pero es un matiz canónico perdido.

### Q2 Alcance

🟡 **Gap.** El fix cubre el call site principal (`effects.py:6603`). Pero hay **19 loops más** con patrón `for pk in ['p1', 'p2']` en `effects.py` (L827, 1616, 1962, 2153, 2403, 2544, 2712, 2842, 3131, 4618, 4697, 4719, 5002, 5244, 5259, 5305, 5442, 5877, 5982). La mayoría son loops de targeting (iterar ambos campos para encontrar cartas X) donde el orden no importa. Pero **no se auditaron uno por uno**. Si alguno de esos loops aplica efectos a cartas en orden (ej. "el primer Adendei en el campo recibe daño"), habría un bug latente análogo.

El commit nota "No afecta el loop previo de Mizthe Aura Mortal (FYTE-070), que es setup estructural" — correcto, pero solo revisó ese. Follow-up: auditar los otros 19.

### Q3 Tests

🟡 **Parcialmente estáticos.** Los 2 tests nuevos:
1. `test_passive_trigger_uses_active_player_first`: busca strings marcador (`'p29/b06'`, `'M22 priority'`, etc.). 100 % estático.
2. `test_passive_trigger_loop_not_hardcoded_p1_p2`: más inteligente — localiza la función por contexto (`'fc.revealed'` + `'pasiva_activated_this_turn'` en ventana de 25 líneas tras el `for`). Aun así es grep, no comportamiento.

**Falta test de comportamiento real:** construir `GameState` con p1 y p2 ambos teniendo Adendei con pasiva que dispara en mismo evento, `active_player='p2'`, ejecutar el trigger, y aseverar que el primer evento `PASSIVE_TRIGGER` en la lista de eventos corresponde a p2.

### Q4 Side effects

✅ Sin regresiones evidentes. El fix es puramente un cambio de orden de iteración; no cambia lógica interna por jugador. Tests de suite 461/461 pasan, lo que indica que el orden p1-primero previo era coincidencia aceptable para tests existentes (active_player probablemente era p1 en todos).

### Veredicto

⚠️ **Con gaps.** Interpretación correcta para el caso 1v1 que Ramsés identificó, pero (a) no implementa "intercalar" round-robin para N vs M pasivas del mismo trigger, (b) los otros 19 loops `for pk in ['p1','p2']` no fueron auditados, y (c) tests son estáticos. Funcionalmente es mejora real, pero no está completo contra el ruling.

---

## Fix 6 — M4: HandTrap regex detecta variante Kap

- **Commit:** `334be28`
- **Archivo:** `api/kodem_engine/engine.py` L320–345 (nuevo helper `_is_handtrap_effect`) + 2 call sites (L492, L1772)
- **Tests:** `tests/regression/test_m4_handtrap_kap_variant.py` (+5)

### Ruling verbatim (M4)

> **HandTrap** = carta con un efecto disparable al momento en que es tomada del Mazo.
> El patrón textual camónico es:
> *"Pasiva: Si esta carta es tomada del Mazo, puedes [revelarla/mostrarla] y [efecto]."*
> También existe la variante activa:
> *"Pasiva: Si tomas esta carta de tu Mazo, puedes revelarla y [efecto]."* (Kap, Lluvia de Ranas KPRC-017)

### Q1 Interpretación

✅ **Correcta.** El helper `_is_handtrap_effect` cubre las tres variantes textuales:
1. `'al ser tomada'` — canónica.
2. `'si tomas esta carta'` + `'mazo'` — variante Kap.
3. `'es tomada del mazo'` — generalizada, captura otras formulaciones como "cuando esta carta es tomada del Mazo".

Verificado contra `cards.json`:
- KPRC-017 Kap → `"Pasiva: Si tomas esta carta de tu Mazo, puedes revelarla y curar 3 puntos a tu Protector."` ✅
- KPRC-037 Nepthis → `"Pasiva: Si esta carta es tomada del Mazo, puedes mostrarla y curar 2 puntos a 1 carta y 1 punto a un Adendei."` ✅

### Q2 Alcance

🟢 **Casi completo.** 2 call sites de `_trigger_replacement` y `apply_action REPLACE` están actualizados. `grep 'al ser tomada' api/kodem_engine/` muestra: (a) definiciones del helper, (b) `strategies.py:1355` (AI scoring) aún con el patrón viejo. El commit `engine-fixes-report-2026-04-19.md` ya declara AI scoring **fuera de scope**. OK como gap conocido.

### Q3 Tests

✅ **Excelentes — los mejores del lote.** 5 tests, todos de comportamiento:
1. `test_m4_handtrap_helper_exists` — existencia del helper.
2. `test_m4_handtrap_detects_al_ser_tomada` — variante canónica.
3. `test_m4_handtrap_detects_si_tomas_variant` — variante Kap.
4. `test_m4_handtrap_kap_card_recognized` — **lee la carta real KPRC-017 de cards.json** y valida que el helper la detecta. Test end-to-end.
5. `test_m4_handtrap_non_handtrap_returns_false` — casos negativos (incluyendo `None` y `''`).

Modelo a seguir para otros fixes.

### Q4 Side effects

🟢 **Riesgo mínimo.** La generalización `'es tomada del mazo'` puede matchear textos que no son HandTraps (ej. texto narrativo de lore que mencione la frase). Revisé `cards.json` — no encontré cartas con esa frase fuera del patrón HandTrap. Nitpick.

### Veredicto

✅ **Correcto.** Best-in-class de los 7 fixes en cuanto a claridad, alcance y tests.

---

## Fix 7 — D5/D18/H2: Zona 'Fuera del Juego' estructural

- **Commit:** `52cfea8`
- **Archivo:** `api/kodem_engine/types.py` (Player dataclass, +1 field)
- **Tests:** `tests/regression/test_d5_d18_out_of_game_zone.py` (+4)

### Ruling verbatim (D5 + D18)

**D5:**
> "Fuera de juego" es una **zona real** del juego, distinta de Zona Principal, Extinción, Mazo, Equipo y Bio. Las cartas ahí están literalmente removidas de la partida en curso.
> Cuando el Mazo Principal se vacía (p20/b07), todas las cartas en Fuera de Juego (excepto Tokens) regresan al fondo del Mazo Principal.

**D18:**
> La Zona Fuera del Juego es **inspeccionable en cualquier momento por ambos jugadores**. Es información pública.

### Q1 Interpretación

✅ **Correcta para lo que implementa.** `Player.out_of_game: list = field(default_factory=list)` agrega la zona como storage persistente. Visibilidad pública se deriva naturalmente (lista sin marcar como private). Comentario inline cita D5/D18 correctamente.

### Q2 Alcance

✅ **Honesto sobre el scope.** El commit declara explícitamente: "NO implementa: Efecto completo de Quam (bidireccional swap con ZP via Protector disponible)". Solo añade la zona. Esto es correcto como fix de infraestructura — desbloquea implementación futura de Quam sin tomar decisiones sobre el gameplay todavía.

**Gap relacionado NO cubierto:** D5 dice "cuando el Mazo Principal se vacía, todas las cartas en Fuera de Juego regresan al fondo del Mazo Principal". El engine tiene lógica de vaciamiento de mazo en `engine.py` (regla 14 / §6.8 — `turns_without_damage`). No auditado si esa lógica ahora tira de `p.out_of_game`. Como no hay carta hoy que envíe a Fuera de Juego (Quam no está implementado), el gap no es activo. Pero si Quam se implementa sin revisar el vaciamiento de mazo, D5 segunda cláusula queda no-respetada.

### Q3 Tests

🟡 **Estructurales pero razonables.** Los 4 tests validan:
1. Campo existe en dataclass (introspección de `fields`).
2. `init_game` crea lista vacía.
3. Independencia entre p1 y p2 (no shared mutable default — importante).
4. `deep_copy` crea lista independiente.

Como el fix solo añade estructura, los tests de estructura son apropiados. **No hay test de comportamiento porque no hay comportamiento** (efecto Quam no implementado). Coherente.

### Q4 Side effects

✅ Ninguno. `default_factory=list` evita el bug clásico de mutable default compartido. `deep_copy()` cubierto por `copy.deepcopy` estándar. No afecta ninguna lógica existente.

### Veredicto

✅ **Correcto dentro de su scope declarado.** Fix de infra limpio, honesto sobre lo que no implementa. Follow-up claro: (1) implementar efecto de Quam, (2) revisar que vaciamiento de mazo reincorpore cartas de `out_of_game` al fondo del Mazo Principal per D5 bullet 2.

---

## Gaps detectados (ordenados por severidad)

### 🔴 Crítico

Ninguno. Los 7 fixes interpretan el ruling correctamente y no introducen bugs de gameplay nuevos.

### 🟡 Medio

1. **Fix 1 FAQ-03 — tests 100 % estáticos.** `tests/regression/test_faq03_negated_attack_no_trigger.py:21-36` usa `assert 'FAQ-03' in content` y busca variable en 20 líneas previas. Un comentario suelto hace pasar el test. Falta test que instancie Kitse atacante + Negar Ataque defensor y asevere ausencia de `PASSIVE_TRIGGER(kitse, attack_resolved)` en eventos.

2. **Fix 4 D34 — p14/b19 bullet 4 no cumplido.** El Adendei poseído regresa a Extinción per `engine.py:725` pero **no dispara `check_passive_triggers('ally_death', ...)` para el `possessed_folio`**. El bullet 4 del rulebook dice explícitamente que al ser enviado a Extinción "pueden disparar los efectos normales que requieran que Adendei... sean enviados a Extinción". Regresión silenciosa contra pasivas de tipo Yimsah / Cretus que miren el Adendei liberado.

3. **Fix 4 D34 — tests 100 % estáticos.** Los 3 tests son greps en el archivo. Falta test de comportamiento que asevere `p1.extinction` contiene ambos folios y `_check_victory` cuenta 2.

4. **Fix 5 M22 — 19 loops sin auditar.** `effects.py` tiene 19 loops adicionales `for pk in ['p1', 'p2']` (L827, 1616, 1962, 2153, 2403, 2544, 2712, 2842, 3131, 4618, 4697, 4719, 5002, 5244, 5259, 5305, 5442, 5877, 5982). Ninguno fue validado por el fix. Riesgo latente según semántica de cada loop.

5. **Fix 5 M22 — intercalado no implementado.** Ruling p29/b06 dice "se intercalarán las declaraciones y resoluciones de una Pasiva por jugador". El fix hace batch por jugador (`all_p2 → all_p1`). Para N vs M pasivas simultáneas el orden difiere del canónico. Caso raro hoy pero matiz perdido.

### 🟢 Menor

6. **Fix 2 E8 — solo 2 helpers migrados.** `_is_titan`, `_is_catrin` cubiertos; `_is_abisal`, `_is_equino`, `_is_feral_sub`, `_is_lupino`, `_is_infectado`, `_is_guardian` (`effects.py:223,242,318-390`) siguen leyendo `card.subtype` singular. Fragilidad a futuro cuando se añadan cartas multi-subtipo con subtipos distintos a Guardián/Catrín/Titán.

7. **Fix 6 M4 — strategies.py:1355 aún con patrón viejo.** AI scoring usa `"al ser tomada del Mazo"` literal. Ya declarado fuera de scope en el commit report.

8. **Fix 7 D5 — vaciamiento de mazo no revisado.** D5 bullet 2: cartas en Fuera de Juego regresan al fondo del Mazo cuando se vacía. Requiere cuando se implemente Quam.

---

## Tests que son solo checks estáticos (lista completa)

El patrón "grep marker en archivo" es débil y la directriz del padre señala evitarlo:

| Fix | Archivo test | Nivel |
|-----|-------------|-------|
| 1 FAQ-03 | `test_faq03_negated_attack_no_trigger.py` | 2/2 estáticos |
| 4 D34 | `test_d34_espectro_death_extinction.py` | 3/3 estáticos |
| 5 M22 | `test_s672_passive_priority_active_first.py` | 2/2 estáticos (uno más inteligente por contexto) |

**Fixes con tests de comportamiento genuinos:**

| Fix | Archivo test | Nivel |
|-----|-------------|-------|
| 2 E8 | `test_e8_multi_subtypes.py` | Behavior — llama `_is_titan`, `_is_catrin`, lee `get_card` real |
| 3 D6 | `test_rests.py`, `test_engine_pure_helpers.py` | Behavior — reproduce ejemplos del ruling |
| 6 M4 | `test_m4_handtrap_kap_variant.py` | Behavior — lee KPRC-017 real, valida helper |
| 7 D5 | `test_d5_d18_out_of_game_zone.py` | Estructural (apropiado para fix estructural) |

**Hallazgo transversal:** 3 de 7 fixes tienen tests puramente estáticos. Son los mismos 3 que involucran cambios en funciones con mucho estado (ataque cancelado, muerte de Espectro, orden de pasivas). Precisamente donde el comportamiento es más complejo, los tests son más frágiles. Inversión del esfuerzo en tests recomendada para estos 3.

---

## Recomendaciones (follow-up fixes)

**Orden sugerido por impacto:**

1. **[🟡 Medio] Fix 4b D34 — disparar triggers del Adendei poseído al liberarse.** Agregar en `engine.py:725` tras el `append(fc.possessed_folio)`:
   ```python
   # p14/b19 bullet 4: la carta poseída regresa a su tipo original y
   # puede disparar triggers de 'enviado a Extinción'.
   s, poss_ev = check_passive_triggers(s, 'ally_death', {
       'dead_key': pk, 'dead_folio': fc.possessed_folio, 'dead_pos': pos,
   })
   all_events.extend(poss_ev)
   ```
   + test de comportamiento que ponga Yimsah u otro trigger-watcher en el campo y asevere disparo.

2. **[🟡 Medio] Tests de comportamiento para Fix 1, 4, 5.** Los 3 fixes con tests estáticos necesitan 1-2 tests cada uno que instancien escenario, ejecuten acción, y aseveren observable (listas de eventos, estado final). El test del Fix 6 es el modelo.

3. **[🟡 Medio] Fix 5b M22 — auditar los 19 loops `for pk in ['p1', 'p2']` restantes.** Mayoría probablemente OK (targeting), pero cada uno necesita clasificación explícita: "orden no importa" vs "debe usar active_player".

4. **[🟢 Menor] Fix 2b E8 — extender multi-subtype a todos los helpers `_is_<X>`.** Refactor sugerido: helper genérico `_has_subtype(folio: str, needle: str) -> bool` que itere sobre `card.subtype + card.subtypes`. Reemplazar `_is_titan/_is_catrin/_is_abisal/_is_equino/_is_feral_sub/_is_lupino/_is_infectado/_is_guardian`.

5. **[🟢 Menor] Fix 7b D5 — revisar vaciamiento de Mazo reincorpora `out_of_game`.** Aplicable solo cuando Quam se implemente.

6. **[🟢 Menor] Fix 6b M4 — actualizar `strategies.py:1355` al helper.** Ya declarado fuera de scope del engine, pero importante para consistencia del AI scoring.

---

## Conclusión general

Los 7 fixes aplicados por Logos son **correctos en interpretación del ruling** en los 7 casos. Ningún fix introduce un bug nuevo o rompe semántica existente de forma evidente. La calidad del código es razonable.

**Debilidades transversales:**
- 3 de 7 fixes usan tests estáticos (grep en archivo). Pasan la suite pero no validan comportamiento.
- Varios fixes cubren solo el call site más obvio; alcance completo del bug no siempre auditado (E8, D34 parcial, M22).
- Dos fixes (D6, D5) son puramente infra — no corrigen bug de gameplay actual. Honestamente declarado.

**Ningún fix cosmético detectado** en el sentido fuerte ("hace pasar tests sin fixear problema real"). El más cercano a cosmético sería Fix 1 FAQ-03, donde el fix **sí** corrige el bug de gameplay (confirmado por lectura del diff), pero los tests no lo validan comportamentalmente — solo estáticamente.

**Veredicto global: 3 ✅ / 4 ⚠️ / 0 ❌.** Los fixes con ⚠️ tienen gaps de tests (estáticos) o de alcance (parcial) pero son mejoras reales sobre el estado previo. Para merge a main recomiendo: aplicar follow-up #1 (D34 triggers) antes del merge; los otros follow-ups pueden ir en commits posteriores.

---

_Auditoría realizada 2026-04-19 por Logos (sesión subagent `validate-fixes-kodem-2026-04-19`) — cold eyes, 2da instancia._
