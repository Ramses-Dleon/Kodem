# Engine Audit — 4ta pasada (Logos 🜂)
**Fecha:** 2026-04-19 18:10 UTC
**Modelo:** Claude Opus 4.7
**Baseline:** commit `4ef46b2` (rama `fixes-rulings-v5.1-2026-04-19`), 488/488 tests PASS

---

## Contexto

Tras los 11 fixes aplicados hoy (H6, D34/D34.1, E8/E8.1, D6, M22/M22.1, D25, M11, FAQ-03), releo el rulebook v5.1 + rulings-v5.1.md completo buscando **gaps de implementación restantes** en el engine.

Este reporte es complementario a los 3 subagentes que corren en paralelo:
- **Audit A** — effect_text ↔ engine ↔ rulings
- **Audit B** — cost_text ↔ engine ↔ rulings
- **Audit C** — cross-check rulebook ↔ cards ↔ rulings

## Señales rojas detectadas

### 🔴 SR-1: "Fuera del Juego" — cero implementación pese a ruling M1 cerrado

| Aspecto | Estado |
|---|---|
| Ruling M1 (zona aislada, no objetivable, público) | ✅ cerrado |
| `Player.out_of_game` en `types.py` | ✅ existe (`list = field(default_factory=list)`) |
| Handler en `effects.py` para patrón "fuera del juego" | ❌ **0 ocurrencias literales** |
| Handler para Quam, Detrás de la Materia (4 folios: TCOO-006U, TCOO-081, TCEO-006U, TCEO-081) | ❌ MISSING |
| Test de comportamiento para Quam o zona Fuera del Juego | ❌ AUSENTE |

**Impacto:** Quam (Rava/Demótica, carta única que interactúa con Fuera del Juego) no tiene comportamiento mecánico implementado. Cualquier partida con Quam en el mazo produce **silencio mecánico** en su pasiva — el engine simplemente no la resuelve.

**Propuesta de fix (requiere diseño):**
1. Añadir handler en `resolve_effect` que detecte patrón `"colócala fuera del juego"` o `"fuera del juego"` → llama a helper `_send_to_out_of_game(state, player, folio, source_ref=None, latent=False)`.
2. Para Quam parte 2 (intercambio con ZP vía Protector disponible), requiere mecanismo de **pending_action** similar a otros efectos interactivos. El efecto latente "(aún si esta carta ya no está en el campo)" requiere almacenar la referencia en state separadamente.
3. Implementar el return path de p20/b07 (mazo vacío → regresar Fuera del Juego al fondo del Mazo, excepto Tokens).

**Esfuerzo:** L (diseño + implementación + tests; 2-4h).

---

### 🟡 SR-2: "Descender" descansos — cero soporte

| Aspecto | Estado |
|---|---|
| Keyword "escalar" en effects.py | 5 ocurrencias (implementado parcialmente) |
| Keyword "descender" en effects.py | **0 ocurrencias** |
| Cartas con `descender` en effect_text | **0** |

**Diagnóstico:** 0 cartas lo usan hoy. M14 lo menciona como conceptualmente pareja de "escalar" pero el pool actual no requiere handler. **No es bug real — es no-issue validado.** No procede fix.

---

### 🟡 SR-3: "Consejo" — término no documentado (M8 abierto)

- 4 cartas con el término: TCEO-001, TCEO-001R, TCOO-001, TCOO-001R (Morx, Descarga Átlica).
- 0 ocurrencias en effects.py.
- M8 sigue abierto en `dudas-pendientes-comunidad.md`.

**Acción:** pendiente ruling oficial. Mientras no exista, el engine no puede implementar.

---

### 🟡 SR-4: "Rava Extendido" — D46 abierto

- 0 ocurrencias en effects.py.
- D46 sigue abierta.

**Acción:** pendiente ruling.

---

### 🟢 SR-5: Bias de mi propia clasificación — 488 tests pasan, pero con gaps

El hecho de que 488 tests pasen NO significa cobertura completa. Los fixes de hoy añadieron tests específicos para las dudas cerradas; zonas del engine sin ruling conocido (como Quam/Fuera del Juego) no tienen test que las fuerce a fallar. **Esto es bias de "lo que se mide pasa".**

Recomendación: después de los reportes de A/B/C, priorizar tests de integración que ejerciten flows completos con cartas no-triviales (Quam, Morx Consejo, Mizthe Aura, etc.).

---

## Estado de los 11 fixes de hoy — verificación de completeness

| # | Fix | Completo | Pendientes colaterales |
|---|-----|----------|------------------------|
| 1 | FAQ-03 guard | ✅ | — |
| 2 | E8 subtypes | ✅ | — (E8.1 ya cubrió 6 helpers más) |
| 3 | D6 caps descansos | ✅ | `give_rests_by_effect` legacy sigue exportada aunque no se usa (tech debt) |
| 4 | D34 Espectro→extinction | ✅ | — |
| 5 | M22 player_order | ✅ | — (M22.1 clasificó 19 loops restantes) |
| 6 | D34.1 ally_death poseído | ✅ | — |
| 7 | E8.1 _iter_subtype_haystacks | ✅ | — |
| 8 | H6 validate_deck §4 p15 | ✅ | — |
| 9 | D25 Hori cost_text | ✅ | — |
| 10 | M11 orden ZP | ✅ | test defensivo agregado |
| 11 | M22.1 audit 19 loops | ✅ | — |

---

## TODO pendientes confirmados (no tocar hoy)

1. **Quam + Fuera del Juego** (SR-1) — requiere diseño de pending_action y efecto latente.
2. **D32** (Cura 1 al jugador activo) — Hule dio dos lecturas a/b; necesita final.
3. **D30** (Virste Reseteo alcance) — esperando 2do respondent o confirmación Hule.
4. **D21 Espectro vs p14/b16** — bloqueado por decisión de diseño.
5. **`give_rests_by_effect` tech debt** — función legacy sin uso, considerar `@deprecated` o remover en v5.2.
6. **Handler Xakros Peste** (M6 cerrado) — cuando se implemente, leer `base_rests`.

---

## Estadísticas del engine (snapshot)

- **Tests:** 488/488 PASS (~87s)
- **effects.py:** 7,009 líneas
- **engine.py:** 3,430 líneas
- **Commits en rama:** 11 (b0d2f94, 51d3b2f, 1abe66a, 4ca6540, 4ef46b2, y anteriores)
- **Cartas totales:** 1,074
- **Con effect_text no trivial:** 1,070
- **Con cost_text no vacío:** 332

---

_Firmado: Logos 🜂 — 4ta pasada engine audit 2026-04-19 18:15 UTC_
_Espera reportes paralelos A, B, C para consolidar plan de siguiente iteración._
