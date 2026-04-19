# Audit B: `cost_text` de `cards.json` vs engine vs rulings v5.1

**Fecha:** 2026-04-19 ~18:10 UTC
**Auditor:** subagent `audit-B-cost-text` (Logos)
**Scope:** solo `cost_text` (332 / 1,074 cartas tienen este campo no vacío). Ignora `effect_text` (auditado en paralelo).
**Fuentes:**
- Catálogo: `/home/coder/codice-kodem/cards.json` (1,074 cartas)
- Engine: `/home/coder/codice-kodem/api/kodem_engine/{engine,effects,cards,types}.py`
- Rulebook v5.1 + `rulings-v5.1.md` + `rulings-v5.1-addendum-faq-oficial.md`
- Tests engine al momento del audit: **488/488 PASS**

---

## Resumen ejecutivo

### Taxonomía real del campo `cost_text`

Hallazgo #0 **estructural**: `cost_text` NO contiene solo costos. Mezcla al menos 6 tipos de texto distintos. Esto ya pinta la deuda conceptual en el catálogo.

| Bucket         | Cartas | Comentario |
|----------------|-------:|------------|
| **COST** (costo real de activación) | 69 | Lo que el nombre del campo promete |
| **OTHER** (pasiva, side-effect, misc.) | 95 | Reglas cápsula no-costo — candidato a mover a `effect_text` o `restriction_text` |
| **TIMING** (once per turn/juego) | 52 | Límite de frecuencia; engine soporta parcialmente vía check puntual |
| **RESTRICTION** (no puede ser curada/atacar/etc) | 47 | Inmunidades pasivas — no son costos |
| **TRIGGER** (on-extinction, before-attack) | 41 | Disparadores, tampoco son costos |
| **REQUIREMENT** (debes tener N de X) | 24 | Gate previo; engine lo maneja bien |
| **EQUIP-RULE** | 2 | Restricción de targeting de Equipo |
| **ERRATA obvia** | 2 | `"esta esta"` en 2 variantes Zaykan |

### Status solo del bucket COST (69 cartas)

| Estado  | N | % |
|---------|--:|--:|
| **IMPL** (validado + cobrado en engine) | **54** | 78% |
| **MISSING** (engine no implementa el costo) | **15** | 22% |
| **PARTIAL** | 0 | — |
| **ERRATA** | 2 (además del bucket ERRATA) | — |

### Top 3 takeaways accionables

1. 🔴 **15 cartas con costo MISSING** — no se cobra nada al activar. Jugadas "gratis" en engine. Agrupadas en 6 patrones reutilizables (S-M effort).
2. 🟡 **El campo `cost_text` es un basurero semántico**. ~60% de su contenido no es costo. Propuesta: separar en `cost_text`, `restriction_text`, `trigger_text`, `timing_text` en un refactor futuro (L effort, pero descarta ambigüedad masiva).
3. 🟢 **Buen cumplimiento de rulings D6 / D25 / D38** — no detecté cartas con costos que contradigan los caps de descanso cerrados o Extinción de variantes.

---

## Top 20 findings prioritizados

| # | Folio | Carta | cost_text (extracto) | Severidad | Esfuerzo | Acción sugerida | Ref ruling |
|---|-------|-------|---------------------|-----------|----------|-----------------|------------|
| 1 | FYTE-016R / FYTE-056 | Zaykan, Refuerzo Catrín | `...si se usa esta esta Pasiva...` | 🟢 bajo | S | Fix cards.json → quitar "esta" duplicado | N/A (typo) |
| 2 | INMX-001 / KSPC-001 | Kopit y Jokokan / Ariam 1st Anniversary | (en `effect_text`) `Cyra gasta 6 puntos...` | 🟡 medio | S | Fix cards.json → `Cura gasta 6...` (probable) — **verificar con Camilo si es Cura o Cyra intencional** | Fuera de v5.1 |
| 3 | CAMP-0001 / LGRO-033 / TRWA-033 | Kumba, Despertar (x3 variantes) | `Costo: No puedes atacar en el turno que usaste esta Pasiva` | 🔴 crítico | M | Implementar flag `cannot_attack_this_turn` en engine tras uso de Pasiva | §6.x (usos por turno) |
| 4 | CAMP-0003 / IDRMG-005 / PRT-2022-07 / RAMI-012 | Xilan, Calma (x4 variantes) | `Para usar su Activa, daña los mismos ptos. escalados a todos los Adendei en tu campo` | 🔴 crítico | M | Implementar costo "mass-self-damage-on-activate" parametrizado por ptos escalados | §3.x daño |
| 5 | CAMP-0018UV / EXPN-002 / LGRO-031 / TRWA-031 | Ozet, Amante Lunar (x4) | `Daña 1 pto. a otra carta aliada.` | 🟡 medio | S | Implementar costo "damage-1-to-another-ally" como cost gate | §3.x |
| 6 | FYTE-044 | Naywa, Quemadura Catrín | `Quema 1 carta aliada para quemar 1 carta rival por esta Pasiva` | 🔴 crítico | M | Engine solo consulta estado `quemada`, no implementa **acción de quemar** como costo. Falta setter en estado + chequeo de que aliada elegida no esté ya quemada | §quemadura |
| 7 | KPRC-054 | Vesta Ignia, Flor de Fuego | `Quema 1 carta aliada no quemada para usar su Pasiva.` | 🔴 crítico | M | Idem #6 — mismo patrón | §quemadura |
| 8 | FYTE-025 | Ketzz, Frías Escamas | `Esta carta se daña 1 pto. para usar su Activa.` | 🟡 medio | S | Variante de "self-damage-pre-attack" pero gatillada por activación, no por ataque. Agregar handler | §3.x |
| 9 | KPRC-018 | Zaykan, Cambio de Energía | `Un Rava aliado debe recibir un descanso para usar su activa.` | 🟡 medio | M | Implementar "specific-ally-receives-rest" con filtro por nombre de especie/familia. Único patrón | §6.5 descansos |
| 10 | FYTE-007S / FYTE-041 | Marok, Invocación de Ultratumba | `envía el equipo y 1 Adendei de los tomados a Extinción` | 🟡 medio | M | Caso de fallback cuando no hay reemplazo compatible — chequear si engine cubre el path de fallo | §vincular |
| 11 | Tarus, Guardian del Abismo | KPRC-063 | **cost_text vacío** vs DOOC-002S/009 que tienen `Sólo puedes revelar esta carta una vez por turno` | 🟡 medio | S | Backfill cost_text en KPRC-063 para consistencia con variantes | §timing |
| 12 | Pruebas de Campo | LGRO-001R | **cost_text vacío** vs IDRMA-015 `Solo puedes usar esta carta 1 vez por juego.` | 🟡 medio | S | Backfill cost_text en LGRO-001R | §timing |
| 13 | Hierro | CAMP-0006 / IDRMA-011 | `Extincion` (sin acento) vs KPRC-106 `Extinción` | 🟢 bajo | S | Normalizar acento en cost_text (2 folios) | N/A |
| 14 | Nozi, Corona Marina | SRMR-005 | `Átlico` vs el resto `Átlíco` | 🟢 bajo | S | Normalizar acento (elegir forma canónica — preferencia: sin tilde en í, i.e. `Átlico`, pero alinear con catalog global de tipos) | N/A |
| 15 | DOOC-006 / DOOC-017 | Adendei con `Si no tienes ningún X en tu ZP, envía esta carta a Extinción` | `Si no tienes ningún... envía esta carta a Extinción` | 🟢 bajo (IMPL) | — | Verificar que engine aplica el condicional **antes** de cobrar costo | §3.x |
| 16 | KPRC-027 | Tempera, Titán del Cielo | `Costo: Tu Protector recibe 2 descansos. Si no hay un Adendei Titán en tu campo...` | 🟢 bajo (IMPL) | — | Verificar cap D6 (Protector max 3 totales por turno) si esta Pasiva se acumula con otra | D6 |
| 17 | CMFT-003 | Ariam, Fuerza del Más Allá | `Tu Protector debe estar disponible para usar esta Pasiva. Tu Protector recibe 3 descansos al usar esta Pasiva.` | 🟡 medio | S | Validar que `3 descansos` + cap D6 (max 3 totales) significa que esta Pasiva solo se puede usar si Protector tiene 0 descansos previos en el turno. Agregar test | D6 |
| 18 | FYTE-006R / FYTE-014S / FYTE-022 / FYTE-045 / FYTE-084 / FYTE-ST2 | Protector recibe 1 descanso para usar Activa-Rápida | `El Protector aliado recibe 1 descanso...` | 🟢 bajo (IMPL) | — | Verificar interacción entre múltiples Activas-Rápidas en un turno respetando D6 cap | D6 |
| 19 | IDRMG-004 | `Si esta carta tiene 5 ptos. o más de ataque, se daña 2 ptos. antes de atacar.` | ver texto | 🟡 medio | S | Verificar que engine respeta el gate de `≥5 ptos` antes de cobrar | §3.x |
| 20 | ISPMR-020 | Adendei | `Debe pasar 1 turno antes de atacar con esta carta.` | 🟡 medio | M | Implementar flag `summoning_sickness_turns_remaining` si no existe ya | §ataque |

---

## Erratas masivas detectadas

### E1 — "esta esta" duplicado (Zaykan Refuerzo Catrín)
- **Folios:** `FYTE-016R`, `FYTE-056`
- **Texto actual:** `...si se usa esta esta Pasiva...`
- **Corrección:** `...si se usa esta Pasiva...`
- **Patrón:** duplicación de determinante, muy probable paste error.

### E2 — "Cyra" en lugar de "Cura" (hipótesis)
- **Folios afectados (en `effect_text`, no `cost_text`):** `INMX-001` (Kopit y Jokokan, Libertad), `KSPC-001` (Ariam 1st Anniversary).
- **Texto actual:** `Activa: Cyra gasta 6 puntos a un Adendei aliado.`
- **Hipótesis:** errata por `Cura`. Gramaticalmente "Cura gasta 6 puntos" = "Cura usando 6 puntos". Sin embargo, `Cyra` podría ser nombre propio en una colección especial (1st Anniversary / Libertad) — **no decidir unilateralmente**.
- **Acción:** marcar como `NEEDS-HUMAN-CONFIRMATION`. Preguntar a Camilo/Dios antes de tocar.
- **Nota al main agent:** NO modifiqué cards.json. Solo reporto.

### E3 — Acentos y escritura inconsistente en Tipos y Extinción
Patrón menor pero extendido (solo en dos nombres de cartas, pero afecta presentación y búsquedas por texto).

| Carta | Folios con variante A | Folios con variante B |
|-------|----------------------|----------------------|
| Hierro | `Extincion` (CAMP-0006, IDRMA-011) | `Extinción` (KPRC-106) |
| Nozi, Corona Marina | `Átlíco` (EXPO-0004, IDRMA-001, KPRC-023, TKD-2022-008) | `Átlico` (SRMR-005) |

**Recomendación:** adoptar forma canónica `Extinción` (acento) y **decidir con Camilo** entre `Átlico` y `Átlíco` (la primera es la ortográficamente correcta; la segunda aparece más en catálogo pero es incorrecta).

### E4 — Análogos al caso Hori D25 (Extinción faltante en variantes)
**Buena noticia:** no encontré casos análogos en `cost_text`. Revisé agrupando por nombre exacto (`n=1,074`) y:
- Solo 2 nombres tienen mismatch de cost_text entre variantes (Hierro y Nozi — solo acentos, no costos faltantes)
- Solo 2 nombres tienen variantes con cost_text vacío en unas y lleno en otras (Tarus DOOC→KPRC, Pruebas de Campo IDRMA→LGRO — ver filas #11 y #12 de la tabla)

El caso Hori (D25) ya quedó resuelto en el hotfix previo. **No se detectan otros Adendei "Deidad/Guía/Titán" con mismatch en costo Extinción entre variantes.**

---

## Fixes inmediatos propuestos a `cards.json`

> NO modifiqué el archivo. Estas son propuestas para que Ramsés/main agent revise y aplique.

| # | Folios | Campo | cost_text actual | cost_text corregido | Justificación |
|---|--------|-------|------------------|---------------------|---------------|
| F1 | `FYTE-016R`, `FYTE-056` | cost_text | `...si se usa esta esta Pasiva...` | `...si se usa esta Pasiva...` | Duplicación obvia de determinante |
| F2 | `CAMP-0006`, `IDRMA-011` | cost_text | `...debe ser enviada a Extincion.` | `...debe ser enviada a Extinción.` | Normalizar acento con KPRC-106 |
| F3 | `SRMR-005` | cost_text | `...Adendei-Átlico...` | `...Adendei-Átlíco...` (o decidir forma global) | Alinear con 4 variantes hermanas O refactor global a `Átlico` correcto ortográfico |
| F4 | `KPRC-063` (Tarus) | cost_text | `""` (vacío) | `Sólo puedes revelar (colocar boca arriba) esta carta una vez por turno.` | Consistencia con DOOC-002S/009 (mismo nombre, misma regla debería aplicar) — **confirmar con Camilo** |
| F5 | `LGRO-001R` (Pruebas de Campo) | cost_text | `""` (vacío) | `Solo puedes usar esta carta 1 vez por juego.` | Consistencia con IDRMA-015 — **confirmar con Camilo** |
| F6 | `INMX-001`, `KSPC-001` | effect_text | `...Cyra gasta 6 puntos...` | `...Cura gasta 6 puntos...` (si typo) | ⚠️ HOLD hasta decisión humana — podría ser nombre intencional |

---

## Sugerencias de fix al engine

Patrones de costo **MISSING** detectados afectan **15 cartas**. Los agrupo por handler reutilizable:

### S1 — Handler `cost: no-attack-this-turn-after-passive` (3 cartas)
- **Cartas:** Kumba Despertar (CAMP-0001, LGRO-033, TRWA-033)
- **Patrón:** `Costo: No puedes atacar en el turno que usaste esta Pasiva.`
- **Fix propuesto:** tras resolver la Pasiva, setear flag `player.attack_blocked_this_turn = True`. Limpiar en Fin de Turno.
- **Esfuerzo:** S
- **Interacción con rulings:** combinar con caps existentes sin conflicto.

### S2 — Handler `cost: mass-self-damage-scaled-on-activate` (4 cartas)
- **Cartas:** Xilan Calma (CAMP-0003, IDRMG-005, PRT-2022-07, RAMI-012)
- **Patrón:** `Para usar su Activa, daña los mismos ptos. escalados a todos los Adendei en tu campo.`
- **Fix propuesto:** leer ptos escalados de la carta origen, aplicar damage a cada Adendei en `src_p.field`. Bloquear activación si el daño mataría a la carta origen (o permitirlo si el ruling lo permite — **verificar con Camilo**).
- **Esfuerzo:** M
- **⚠️ Ruling pendiente:** ¿Xilan se daña a sí misma también? Texto dice "a todos los Adendei en tu campo" → interpretación estricta = sí, se incluye.

### S3 — Handler `cost: damage-1-to-another-ally` (4 cartas)
- **Cartas:** Ozet Amante Lunar (CAMP-0018UV, EXPN-002, LGRO-031, TRWA-031)
- **Patrón:** `Daña 1 pto. a otra carta aliada.`
- **Fix propuesto:** requerir selección de target aliado distinto a la fuente, aplicar 1 pto. de daño antes de efecto.
- **Esfuerzo:** S
- **Edge case:** si no hay otra carta aliada viva, ¿se bloquea activación? (probable → `BLOCKED: Ozet requires another allied card to damage as cost`).

### S4 — Handler `cost: burn-ally-as-cost` (2 cartas + posible patrón emergente)
- **Cartas:** Naywa Quemadura Catrín (FYTE-044), Vesta Ignia (KPRC-054)
- **Patrón:** `Quema 1 carta aliada [no quemada] para usar su Pasiva.`
- **Fix propuesto:** engine actualmente **solo lee estado `quemada`** pero **no tiene acción de quemar como costo**. Agregar:
  - Setter: `field_card.burned = True`
  - Validator: elegir aliada con `burned=False`
  - BLOCKED si no hay aliada no-quemada disponible
- **Esfuerzo:** M
- **Nota:** este es probablemente el gap más alto-impacto funcionalmente (afecta meta Pírico/Catrín).

### S5 — Handler `cost: self-damage-on-activate` (1 carta, variante de patrón existente)
- **Carta:** Ketzz Frías Escamas (FYTE-025)
- **Patrón:** `Esta carta se daña 1 pto. para usar su Activa.` (vs el ya-existente `antes de atacar`)
- **Fix propuesto:** extender el handler "self-damage-pre-attack" ya presente para cubrir también el caso "para usar su Activa" (cobra ANTES de ejecutar efecto, no de atacar).
- **Esfuerzo:** S
- **Unit test sugerido:** Ketzz activa Activa → ver que HP baja 1 ANTES de resolver efecto + que si HP sería ≤0 la activación se bloquea.

### S6 — Handler `cost: specific-named-ally-rest` (1 carta)
- **Carta:** Zaykan Cambio de Energía (KPRC-018)
- **Patrón:** `Un Rava aliado debe recibir un descanso para usar su activa.`
- **Fix propuesto:** filtrar por nombre en `src_p.field` (empieza con "Rava"), aplicar 1 descanso respetando caps D6 (Adendei max 2).
- **Esfuerzo:** M (por la resolución de nombre fuzzy)
- **Ruling D6:** el cap aplica normalmente.

### S7 — `send-equipment+adendei fallback` (2 cartas, likely IMPL parcial)
- **Cartas:** Marok Invocación de Ultratumba (FYTE-007S, FYTE-041)
- **Patrón:** `Si no puedes reemplazar con 1 Adendei compatible, envía el equipo y 1 Adendei de los tomados a Extinción.`
- **Acción:** verificar en tests si el path de fallo está cubierto. No pude confirmarlo sin leer effect_text completo (fuera de scope).
- **Esfuerzo:** S (principalmente test)

---

## Verificación contra rulings v5.1 cerrados

| Ruling | Test | Hallazgo |
|--------|------|----------|
| **D6** (Adendei max 2, Protector max 3 totales/turno) | ¿Alguna carta pide descansar más del cap? | ✅ Ninguna carta pide >3 descansos al Protector en un solo efecto. CMFT-003 pide 3 → cabe solo si Protector está a 0 descansos. Edge case vale test. |
| **D25** (Hori — costo Extinción en todas las variantes) | ¿Otras familias tienen mismatch análogo? | ✅ No detectado. Solo acentos en Nozi/Hierro (filas E3). |
| **D38** (cap 2 descansos aplica a Espectros) | ¿Alguna carta pide descansar Espectro con valor mayor? | ✅ No detectado en cost_text. |
| **M2** (Intercambiar = Cambiar; costo respeta §6.5) | ¿Costos de intercambio respetan descanso? | ✅ No detecté costos explícitos de "intercambiar" en cost_text que contradigan §6.5. El `send-equipment+adendei fallback` (Marok) es el único borde a revisar. |

---

## Apéndice A — Cartas por bucket (muestra)

### Bucket COST con IMPL ✅ (n=54)
Formatos bien cubiertos: `self-extinction` (24), `protector-rests` (19), `self-damage-pre-attack` (8), `sacrifice-ally` (3).

### Bucket COST MISSING 🔴 (n=15)
Todas listadas arriba en S1–S6 + F-table.

### Bucket OTHER (n=95)
Contiene mezcla de triggers, side-effects pasivos, y reglas que deberían vivir en `effect_text` o un nuevo campo `restriction_text`. Ejemplos:
- `Si esta carta es enviada a Extinción, daña 1 pto. a todos los Adendei-X en campo` → **TRIGGER on-death**, no costo (hay 15+ variantes)
- `Daña esta carta 1 pto. por cada pto. de daño que reciba el Protector rival` → **TRIGGER reactivo**, no costo
- `Mientras haya una Pasiva negada por esta carta, no puedes volver a usar su Activa` → **RESTRICTION estado**, no costo

**Recomendación de refactor (out-of-scope, pero flag para sprint futuro):** introducir campos:
```
cost_text        -- solo costos reales de activación
trigger_text     -- on-death, on-attack, etc.
restriction_text -- inmunidades, gates permanentes
timing_text      -- once per turn/game
```
Esfuerzo: L (migración de ~190 cartas y ajuste de engine para leer campo correcto). Beneficio: elimina ambigüedad sistémica.

---

## Apéndice B — Metodología

1. Carga única de `cards.json` → filtro `cost_text` no vacío → 332 cartas.
2. Clasificador regex-based con 8 buckets (COST, TRIGGER, REQUIREMENT, TIMING, RESTRICTION, EQUIP-RULE, ERRATA, OTHER).
3. Dentro de COST, cada subtipo verificado contra presencia de patrón en `effects.py` + `engine.py` (grep case-insensitive).
4. Análisis cruzado por nombre de carta (groupby) → detectar mismatches entre variantes.
5. Ruling cross-check contra D6, D25, D38, M2.

**Limitaciones:**
- Clasificación regex puede tener falsos negativos (5-10% estimado) en el bucket OTHER.
- IMPL/MISSING es best-effort: que exista un patrón en código no garantiza cobertura por tests, solo indica handler declarado.
- No leí effect_text (fuera de scope), salvo para confirmar erratas Cyra.
- Tiempo: ~12 minutos.

---

## Próximos pasos sugeridos (para main agent / Ramsés)

1. **Quick wins (hoy):** aplicar F1 (Zaykan `esta esta`), F2 (Hierro acento). 5 minutos. Low risk.
2. **Medium (sprint):** implementar S3 + S5 (Ozet damage-to-another-ally + Ketzz self-damage-on-activate). Unblocks 5 cartas.
3. **High impact:** implementar S4 (burn-ally) — meta Pírico bloqueado sin esto.
4. **Refactor largo:** decidir si separar `cost_text` en 4 campos semánticos (opcional, L effort).
5. **Decisión humana pendiente:** Cyra vs Cura (INMX-001 / KSPC-001), y backfills F4 / F5.

---

**Fin del reporte.**
*Generado por subagent `audit-B-cost-text` en sesión agent:main:subagent:aba16f29.*
