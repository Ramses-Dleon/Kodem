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
