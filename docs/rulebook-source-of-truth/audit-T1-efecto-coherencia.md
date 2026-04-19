# Auditoría T1 — Efecto-coherencia intra-carta
_Generado: 2026-04-19 · Sub-agente Logos (Opus 4.7) · Input: 24 nombres, 96 variantes_

## Resumen ejecutivo

| Clasificación | Conteo | Notas |
|---|---|---|
| 🔴 **Reglas genuinamente distintas** | **1 grupo** | 🚩 Requiere ruling de Ramsés |
| 🟠 **Costos faltantes o mal estructurados** | **5 grupos** | Update olvidado / estructura inconsistente |
| 🟡 **Prefijo Activa/Pasiva/Costo omitido** | **13 grupos** | Normalización mecánica |
| 🟢 **Normalizaciones ortográficas puras** | **3 grupos** | Typos y abreviaturas |
| ⚪ **No-issue (agrupación por nombre genérico)** | **2 grupos** | Token / Token [ENGLISH] — efectos legítimamente distintos |
| **Total** | **24 grupos (96 variantes)** | |

> Nota: muchos grupos tienen **múltiples banderas** (p. ej. Hori combina 🟢 typo + 🟠 costo). El conteo arriba asigna el grupo a su bandera **más severa**.

Patrón dominante observado: las ediciones **IDRM tempranas** y **KPRC** tienden a omitir el prefijo `Activa:`/`Pasiva:` y usar abreviatura `pto./ptos.`, mientras que las reediciones **LGRO**, **RAMI**, **ISPMR**, **TCOO** y los **Full Art TKD-2022** ya traen la redacción canónica con prefijo y "punto(s)". Las variantes **SRMR** (Super Rara IDRM) son un caso especial: suelen tener redacción MÁS larga con Costo inline dentro del effect_text.

---

## 🔴 Grupos críticos (reglas distintas con mismo nombre)

### 1. Ariam, Dualidad  — 🚩 **REQUIERE RULING RAMSÉS**

| Folio | Set | Rarity | Effect text |
|---|---|---|---|
| **BETA-001** | KPRC | Común | `Costo: Antes de atacar, esta carta quita 1 pto. de vida a los Adendei aliados.` |
| FAFT-005 | MFT | Full Art | `Activa: Si esta carta ataca, protege a un Adendei aliado de ataques y efectos hasta el final de tu siguiente turno.` |
| IDRMA-020 | IDRM | Común | `Activa: Si esta carta ataca, protege a un Adendei aliado de ataques y efectos hasta el final de tu siguiente turno.` |
| RMR-012 | IDRM | Rara | `Si esta carta ataca, protege a un Adendei aliado de ataques y efectos hasta el final de tu siguiente turno.` |

**Análisis:**
- 3 de 4 variantes describen un efecto de **protección** ("protege a un Adendei aliado...").
- BETA-001 describe un efecto **completamente distinto** — un **costo de drenaje** ("quita 1 pto. de vida a los Adendei aliados antes de atacar").
- Es plausible que **BETA-001 sea una versión Beta/prototipo** con el efecto original y la carta haya sido **errateada** al lanzarse oficialmente.
- 🚩 **Decisión pendiente**: ¿Beta-001 se deja tal cual como pieza histórica? ¿O se actualiza a la redacción actual? Corresponde a Ramsés confirmar si BETA-001 sigue siendo torneo-legal con su regla original, o si ya usa la redacción canónica.

**Recomendación provisional:** propagar a las 3 variantes post-Beta la redacción de FAFT-005 / IDRMA-020:
> `Activa: Si esta carta ataca, protege a un Adendei aliado de ataques y efectos hasta el final de tu siguiente turno.`

Dejar **BETA-001 anotado** con nota de errata en `cards.json` (campo `errata_note`) hasta recibir ruling.

---

## 🟠 Grupos medios — Costos faltantes / estructura inconsistente

### 2. Hori, Huella de Magma (4 variantes) — 🟠 + 🟢 combinado

| Folio | Set | Rarity | Effect | Cost |
|---|---|---|---|---|
| EXPO-0006 | KPRC | Común | `...Adendei-Piricco ... Pirico aliado ataco...` | *(vacío)* |
| IDRMP-001 | IDRM | Común | `...Adendei-Piricco ... Pirico aliado ataco...` | *(vacío)* |
| KPRC-022 | KPRC | Full Art | `...Adendei-Piricco ... Pirico aliado ataco...` | *(vacío)* |
| **SRMR-006** | IDRM | Super Rara | `Pasiva: ...Adendei-Pírico ... atacó... Costo: Si esta carta es enviada a Extinción, daña 1 pto. a todos los Adendei-Pírico en campo.` | `Si esta carta es enviada a Extinción, daña 1 pto. a todos los Adendei-Pírico en campo.` |

**Análisis:**
- 3/4 variantes carecen del **Costo de Extinción** que sí aparece en SRMR-006.
- 3/4 variantes tienen **typos graves**: `Piricco` (debe ser `Pírico`), `ataco/este/esté` sin tildes, inconsistencia en capitalización (`Aliado`).
- SRMR-006 es la versión canónica (ortografía correcta, prefijo `Pasiva:`, Costo presente).

**Recomendación cards.json:**
- Effect canónico: `Pasiva: Aumenta 1 pto. de ataque a los Adendei-Pírico mientras esta carta esté en campo. Si un Adendei-Pírico aliado atacó, cura 1 pto. a un Adendei-Pírico aliado.`
- Cost canónico: `Si esta carta es enviada a Extinción, daña 1 pto. a todos los Adendei-Pírico en campo.`
- Propagar a EXPO-0006, IDRMP-001, KPRC-022.
- 🚩 **Confirmar con Ramsés** si el Costo de Extinción aplica solo a la versión Super Rara SRMR o a toda la carta (regla de juego, no rareza cosmética).

### 3. Nozi, Corona Marina (5 variantes) — 🟠 + 🟡

| Folio | Set | Rarity | Effect (prefijo) | Cost |
|---|---|---|---|---|
| EXPO-0004 | KPRC | Común | *(sin prefijo)* `...Adendei-Átlíco...` | ✅ presente |
| IDRMA-001 | IDRM | Común | *(sin prefijo)* `...Adendei-Átlíco...` | ✅ presente |
| KPRC-023 | KPRC | Full Art | *(sin prefijo)* `...Adendei-Átlíco...` | ✅ presente |
| **SRMR-005** | IDRM | Super Rara | `Pasiva:` `...Adendei-Átlico...` | ✅ presente |
| TKD-2022-008 | KPRC | Ultra Rara | *(sin prefijo)* `...Adendei-Átlíco...` | ✅ presente |

**Análisis:**
- **Todas** las variantes tienen `cost_text` (Costo de Extinción) — a diferencia de Hori. ✅
- 4/5 **omiten el prefijo `Pasiva:`** del effect_text.
- Tensión ortográfica: 4 usan `Átlíco` (con tilde en la i), 1 usa `Átlico` (sin). Ambas grafías son válidas en el dataset según el mismo linaje de "Átlica/Átlico"; **el rulebook canónico usa `Átlico` sin tilde en la `í`**. 🚩 Confirmar con Ramsés grafía oficial.

**Recomendación cards.json:**
- Añadir prefijo `Pasiva:` al effect_text de EXPO-0004, IDRMA-001, KPRC-023, TKD-2022-008.
- Unificar a grafía que ratifique Ramsés (presunto: `Átlico`).

### 4. Pruebas de Campo (2 variantes) — 🟠 estructura inconsistente

| Folio | Set | Effect | Cost |
|---|---|---|---|
| IDRMA-015 | IDRM | `Activa Rapida: Si una carta aliada es atacada, puedes regresar esta carta a la Zona de Equipo y negar el ataque.` | `Solo puedes usar esta carta 1 vez por juego.` |
| LGRO-001R | LGRO | `Si una carta aliada es atacada, puedes regresar esta carta a la Zona de Equipo y negar el ataque. Solo puedes usar esta carta 1 vez por juego.` | *(vacío — la restricción está inline en effect_text)* |

**Análisis:** Misma regla, pero LGRO-001R **fusionó el Costo dentro del effect_text** y omitió el prefijo `Activa Rapida:`. Además borró el campo `cost_text`. Inconsistencia estructural.

**Recomendación cards.json:**
- Effect canónico: `Activa Rápida: Si una carta aliada es atacada, puedes regresar esta carta a la Zona de Equipo y negar el ataque.`
- Cost canónico: `Solo puedes usar esta carta 1 vez por juego.`
- Actualizar LGRO-001R para usar ambos campos separados (el más reciente se alineó mal).

### 5. Tarus, Guardián del Abismo (3 variantes) — 🟠 costo omitido en 1

| Folio | Set | Rarity | Cost |
|---|---|---|---|
| DOOC-002S | DOOC | Super Rara | ✅ `Sólo puedes revelar (colocar boca arriba) esta carta una vez por turno.` |
| DOOC-009 | DOOC | Común | ✅ *(mismo)* |
| **KPRC-063** | KPRC | Full Art | ❌ *(vacío)* |

**Análisis:** Los 3 effect_text son **idénticos**. La versión KPRC-063 **carece del cost_text** que limita a 1 reveal por turno. Probable update olvidado al reimprimir en TCOO-adyacente. 🚩 Confirmar si la restricción aplica retroactivamente a KPRC-063 (probable sí — es una regla de coherencia, no cosmética).

**Recomendación cards.json:** añadir el cost_text a KPRC-063 (copiar verbatim de DOOC-002S).

### 6. Hierro (3 variantes) — 🟡 prefijo + 🟢 ortografía + cost con tilde inconsistente

| Folio | Set | Rarity | Effect (prefijo) | Cost |
|---|---|---|---|---|
| CAMP-0006 | KPRC | Super Rara | `Activa:` ... `mazo`... `cambiala` ... | `...Extincion.` (sin tilde) |
| IDRMA-011 | IDRM | Común | `Activa:` ... `mazo`... `cambiala` ... | `...Extincion.` (sin tilde) |
| **KPRC-106** | KPRC | Común | *(sin prefijo)* `Mazo` (mayús.) `cámbiala` (con tilde) `ptos.` | `...Extinción.` (con tilde) |

**Análisis:** dos sub-redacciones: la de CAMP-0006/IDRMA-011 tiene prefijo `Activa:` y escribe sin tildes; la de KPRC-106 tiene tildes correctas y usa `ptos.` abreviado pero **omite el prefijo `Activa:`**. Effect text es **sustantivamente idéntico** (misma mecánica: 6 cartas tope, escoger 1, intercambio con Zona Principal 6vida, resto al fondo).

**Recomendación:** unificar a:
- Effect: `Activa: Toma 6 cartas del tope de tu Mazo, escoge 1 y cámbiala por una carta en tu Zona Principal con 6 puntos de vida. Regresa el resto de las cartas y la carta cambiada al fondo de tu Mazo.`
- Cost: `Antes de utilizar su Activa, esta carta debe ser enviada a Extinción.` (con tilde en las 3 variantes)

---

## 🟡 Grupos con prefijo Activa/Pasiva/Costo omitido (subset minoritario)

Patrón común: **una variante más antigua / versión Rara específica omite el prefijo**; la mayoría lo incluye. La recomendación uniforme es **propagar el prefijo** a la variante disidente. Canónica = versión con prefijo.

### 7. Ariam, Balance (13 variantes)
- **Disidente:** `SRMR-008` (IDRM Super Rara) — `Si esta carta ataca, cura 1 pto. a una carta aliada.` (sin `Activa:`, con `pto.`)
- Canónica (12/13): `Activa: Si esta carta ataca, cura 1 punto a una carta aliada.`
- **Fix:** SRMR-008 → añadir prefijo `Activa:`, `pto.` → `punto`.

### 8. Ceiba, Raices Cosmicas (2 variantes)
- IDRMP-007: `Pasiva: Durante tu Previa, puedes enviar este equipo a Extincion. La carta que estaba equipada escala 1 punto.` ← canónica
- KPRC-108: `Durante tu Previa, puedes enviar este equipo a Extinción. La carta que estaba equipada escala 1 pto.` (sin `Pasiva:`, con `pto.`)
- **Fix:** KPRC-108 → añadir `Pasiva:`, `pto.` → `punto` (nota: KPRC-108 tiene `Extinción` con tilde correcta vs IDRMP-007 sin tilde; **mantener grafía con tilde**).
- Redacción final propuesta: `Pasiva: Durante tu Previa, puedes enviar este equipo a Extinción. La carta que estaba equipada escala 1 punto.`

### 9. Erwin, Sopor Felino (3 variantes)
- Canónica (2): `Pasiva: Si esta carta es revelada, cura 2 puntos a un Adendei aliado.` (IDRMG-015, KPRC-059)
- Disidente: `KPRC-105` — `Si esta carta es revelada, cura 2 ptos. a 1 Adendei aliado.` (sin `Pasiva:`, `ptos.`, `1` vs `un`)
- **Fix:** KPRC-105 → propagar redacción canónica.

### 10. Ilith, Fuego Primo (3 variantes) — solo ortografía de "Extinción"
- EXPO-0001: `...Extincion...` (sin tilde)
- KDMOLE-01-2022: `...Extinción...` (con tilde) ← canónica
- LGRO-076: `...Extincion...` (sin tilde)
- **Fix:** propagar `Extinción` con tilde a EXPO-0001 y LGRO-076.

### 11. Jane, Sabotaje (5 variantes)
- 4/5 = canónica con prefijo `Activa:` y sin tildes.
- Disidente: `SRMR-003` — omite `Activa:` y **añade tildes correctamente** (`podrá`, `esté`).
- **Fix:** unificar a `Activa: Escoge un Adendei rival; ese Adendei no podrá atacar hasta que este Protector esté disponible. Este Protector se vincula solo con un Adendei en descanso.` (prefijo + tildes correctas).

### 12. La Cuspide (4 variantes)
- Canónica (3/4): `Pasiva: Al final de cada turno puedes dañar 1 punto a todos los Adendei equipados.`
- Disidente: `KPRC-111` — `Al final de cada turno puedes dañar 1 pto. a todos los Adendei equipados.`
- **Fix:** KPRC-111 → añadir `Pasiva:`, `pto.` → `punto`.

### 13. Maquemura, Desliz (3 variantes)
- Canónica (2/3): `Activa Rapida: Si esta carta ataca, tu rival no puede activar efectos por el resto del turno.`
- Disidente: `RMR-006` — sin prefijo `Activa Rapida:`.
- **Fix:** RMR-006 → añadir prefijo. (Nota: grafía canónica debería ser `Activa Rápida:` con tilde; ver § Observaciones globales.)

### 14. Mizthe, Ancestral (6 variantes)
- Canónica (5/6): `Pasiva: Si un Adendei aliado deja el campo, cura 1 punto a los Adendei aliados.`
- Disidente: `RMR-008` (IDRM Rara) — sin prefijo, `pto.`.
- **Fix:** RMR-008 → añadir prefijo, `pto.` → `punto`.

### 15. Navi Dequak (4 variantes)
- Canónica (3/4): `Activa: Si esta carta ataca, se cura 1 punto. Pasiva: Si esta carta fue atacada, escala 1 punto.`
- Disidente: `RMR-003` — idéntico pero con `pto.` abreviado.
- **Fix:** RMR-003 → `pto.` → `punto` (2 ocurrencias).

### 16. Shugg, Fuga (3 variantes)
- Canónica (2/3): `Pasiva: Si esta carta ataca, daña 1 punto adicional por cada Adendei abismado en el campo.`
- Disidente: `RMR-010` — sin `Pasiva:`, con `pto.`.
- **Fix:** RMR-010 → añadir prefijo + normalizar `pto.`.

### 17. Voracidad Natural (2 variantes)
- IDRMG-008: `Pasiva: La carta equipada no puede ser dañada por efectos.` ← canónica
- KPRC-109: `La carta equipada no puede ser dañada por efectos.` (sin prefijo)
- **Fix:** KPRC-109 → añadir `Pasiva:`.

### 18. Xakros, Peste (3 variantes)
- Canónica (2/3): `Activa: Todos los Adendei en el campo reciben descansos iguales a los indicados en su respectiva carta.`
- Disidente: `RMR-017` — sin `Activa:`.
- **Fix:** RMR-017 → añadir prefijo.

### 19. Yimsah, Voraz (3 variantes)
- Canónica (2/3): `Pasiva: Si solo 1 carta es enviada a Extincion, daña 1 punto a una carta rival.`
- Disidente: `RMR-015` — sin prefijo, `Extinción` con tilde (mejor), `pto.`.
- **Fix:** unificar a `Pasiva: Si solo 1 carta es enviada a Extinción, daña 1 punto a una carta rival.` (prefijo de mayoría + tilde de RMR-015).

### 20. Zagal, Ruinas (3 variantes)
- Canónica (2/3): `Pasiva: Si hay un Adendei aliado en descanso, esta carta puede atacar al Protector rival.`
- Disidente: `RMR-016` — sin prefijo.
- **Fix:** RMR-016 → añadir `Pasiva:`.

### 21. Zaren, El Inicio del Viaje (3 variantes) — 🚩 también typo interno
- Canónica (2/3): `Activa: Si no hay un Adendei aliado ccon 6 puntos de vida, cura a 6 puntos todos tus Adendei aliados.` — **ojo: contiene typo `ccon`**.
- Disidente: `KPRC-103` — `Si no hay 1 Adendei aliado con 6 ptos. de vida, cura 6 ptos. a todos tus Adendei aliados.` (sin `Activa:`, ortográficamente correcta).
- **Fix recomendado:** tomar lo mejor de ambas:
  - `Activa: Si no hay un Adendei aliado con 6 puntos de vida, cura 6 puntos a todos tus Adendei aliados.`
  - Corregir `ccon` → `con` (typo en 2 cartas: IDRMA-007, KEXC-001).
  - Agregar prefijo a KPRC-103.
  - Clarificar "cura 6 puntos" — la versión IDRM dice "cura **a** 6 puntos" (= llevar a 6) mientras que KPRC-103 dice "cura 6 ptos. **a todos**" (= +6 a cada uno). 🚩 **Semánticamente distinto — requiere ruling Ramsés.** Posible 🔴 encubierto.

> ⚠️ **Zaren podría pertenecer a 🔴** si "cura a 6 puntos" ≠ "cura 6 puntos a todos". Marcar para revisión prioritaria de Ramsés.

### 22. Zaykan, Ermitaño (4 variantes)
- Canónica (3/4): `Pasiva: Esta carta no puede ser atacada por la carta frente a ella.`
- Disidente: `SRMR-009` — sin `Pasiva:`.
- **Fix:** SRMR-009 → añadir `Pasiva:`.

---

## 🟢 Grupos solo ortográficos puros (diferencia mínima)

- **(ninguno puro tras análisis)** — todos los grupos "ortográficos" terminan combinados con prefijo faltante o tienen una componente 🟡. Los que más se acercan a 🟢 puro:
  - *Ilith, Fuego Primo* — solo difiere en tilde de `Extinción/Extincion`. Clasificado como 🟡 para conservar consistencia del listado.

---

## ⚪ No-issues (no requieren corrección)

### 23. Token (6 variantes) — ⚪ agrupación espuria
- effect_text legítimamente distintos: `Token Velociraptor`, `Token Compsognathus Longipes`, `Token Carnoturus Sastrei`, `Token Flores Y Tumbas Kickstarter`.
- Son **cartas-token distintas** que comparten el placeholder name "Token". No hay inconsistencia — el dataset debería agruparlas por `effect_text` o por un campo `token_type`, no por `name`.
- **Recomendación:** en cards.json, **renombrar cada variante** a su token específico: `Token — Velociraptor`, `Token — Compsognathus Longipes`, etc. Alternativamente, añadir campo `token_subtype`. Típo: `Carnoturus` (TCOO-015S) debería ser `Carnotaurus` — 🚩 confirmar.

### 24. Token [ENGLISH] (5 variantes) — ⚪ idem
- Mismo caso que Token, pero en inglés.
- **Recomendación:** misma solución — renombrar o añadir subtype.

---

## Propuesta de correcciones cards.json (consolidada)

Ordenadas por severidad. Cada entrada = (folio, acción, razón).

### 🔴 Crítico (pending ruling)
1. **BETA-001** (Ariam, Dualidad) → añadir `errata_note`; no modificar effect_text hasta ruling. Posiblemente propagar `Activa: Si esta carta ataca, protege a un Adendei aliado de ataques y efectos hasta el final de tu siguiente turno.`
2. **RMR-012** (Ariam, Dualidad) → añadir prefijo `Activa:`.
3. **IDRMA-007, KEXC-001, KPRC-103** (Zaren, El Inicio del Viaje) → 🚩 consolidar redacción tras ruling. Mínimo: corregir `ccon` → `con`.

### 🟠 Costo faltante / estructura
4. **EXPO-0006, IDRMP-001, KPRC-022** (Hori, Huella de Magma) → añadir `cost_text`: `Si esta carta es enviada a Extinción, daña 1 pto. a todos los Adendei-Pírico en campo.` + corregir effect_text: `Pasiva: Aumenta 1 pto. de ataque a los Adendei-Pírico mientras esta carta esté en campo. Si un Adendei-Pírico aliado atacó, cura 1 pto. a un Adendei-Pírico aliado.` (fix `Piricco`→`Pírico`, `ataco`→`atacó`, `este`→`esté`, `Aliado`→`aliado`).
5. **KPRC-063** (Tarus, Guardián del Abismo) → añadir `cost_text`: `Sólo puedes revelar (colocar boca arriba) esta carta una vez por turno.`
6. **LGRO-001R** (Pruebas de Campo) → extraer costo inline; dejar effect_text = `Activa Rápida: Si una carta aliada es atacada, puedes regresar esta carta a la Zona de Equipo y negar el ataque.` y cost_text = `Solo puedes usar esta carta 1 vez por juego.`

### 🟡 Prefijo faltante (añadir `Activa:` / `Pasiva:` / `Activa Rapida:`)
7. **SRMR-008** (Ariam, Balance) → prefijo `Activa:`, `pto.` → `punto`.
8. **KPRC-108** (Ceiba, Raíces Cósmicas) → prefijo `Pasiva:`, `pto.` → `punto`.
9. **KPRC-105** (Erwin, Sopor Felino) → prefijo `Pasiva:`, `ptos.` → `puntos`, `1 Adendei` → `un Adendei`.
10. **SRMR-003** (Jane, Sabotaje) → prefijo `Activa:`.
11. **KPRC-111** (La Cuspide) → prefijo `Pasiva:`, `pto.` → `punto`.
12. **RMR-006** (Maquemura, Desliz) → prefijo `Activa Rapida:`.
13. **RMR-008** (Mizthe, Ancestral) → prefijo `Pasiva:`, `pto.` → `punto`.
14. **RMR-003** (Navi Dequak) → `pto.`×2 → `punto`×2.
15. **EXPO-0004, IDRMA-001, KPRC-023, TKD-2022-008** (Nozi, Corona Marina) → añadir prefijo `Pasiva:`. Confirmar grafía `Átlico` vs `Átlíco` con Ramsés.
16. **RMR-010** (Shugg, Fuga) → prefijo `Pasiva:`, `pto.` → `punto`.
17. **KPRC-106** (Hierro) → prefijo `Activa:`; mantener tildes correctas existentes.
18. **CAMP-0006, IDRMA-011** (Hierro) → corregir cost_text `Extincion` → `Extinción`; corregir effect_text `cambiala` → `cámbiala`.
19. **KPRC-109** (Voracidad Natural) → prefijo `Pasiva:`.
20. **RMR-017** (Xakros, Peste) → prefijo `Activa:`.
21. **RMR-015** (Yimsah, Voraz) → prefijo `Pasiva:`.
22. **RMR-016** (Zagal, Ruinas) → prefijo `Pasiva:`.
23. **SRMR-009** (Zaykan, Ermitaño) → prefijo `Pasiva:`.

### 🟢 Ortografía adicional
24. **EXPO-0001, LGRO-076** (Ilith, Fuego Primo) → `Extincion` → `Extinción`.
25. **SRMR-005** (Nozi, Corona Marina) → unificar grafía de `Átlico/Átlíco` según ruling.
26. **IDRMG-015, KPRC-059** (Erwin) — ya canónicos, revisar que `puntos` esté uniforme vs `ptos.`

### ⚪ Renombrado (no es corrección de reglas)
27. **TCOO-013S, TCOO-014S, TCOO-015S, TCOO-082, TCOO-083, TOKEN-KS** — renombrar cada variante con su token subtype en el campo `name` (actualmente todas se llaman `Token`). Confirmar grafía `Carnotaurus` vs `Carnoturus` (typo actual TCOO-015S).
28. **TCEO-013S, TCEO-014S, TCEO-015S, TCEO-082, TCEO-083** — idem para versiones en inglés.

---

## Observaciones globales / patrones

1. **Abreviatura `pto.` / `ptos.`**: presente exclusivamente en las variantes **disidentes** (SRMR-xxx, RMR-xxx, KPRC-xxx más antiguas, IDRM más antiguas). Canónica actual = `punto` / `puntos`. Recomendación: **normalizar global** a palabra completa en todo cards.json.
2. **Tildes en Extinción/Pírico/Átlico/cámbiala/atacó/esté/podrá**: las variantes KPRC/IDRM tempranas y CAMP/EXPO carecen sistemáticamente de tildes. Reediciones LGRO/ISPMR/TCOO y Super Rara SRMR mantienen tildes. **Recomendación global**: pasar corrector ortográfico sobre todo cards.json (fix sistemático, no carta por carta).
3. **Prefijo `Activa Rapida` vs `Activa Rápida`**: ninguna variante en el dataset usa la forma con tilde. 🚩 Confirmar con Ramsés grafía oficial en material actual.
4. **Typo recurrente `ccon`**: aparece en IDRMA-007 y KEXC-001 (Zaren). Error de fuente, probablemente en el texto maestro original.
5. **Canónica mayoritaria**: para la mayoría (13/24) la versión mayoritaria ya es la correcta — la correción es **mecánica** (propagar a 1-2 disidentes).
6. **Inversión SRMR**: en 4 casos (Ariam Balance, Nozi, Hori, Jane) la Super Rara SRMR tiene una redacción *distinta* del resto — a veces mejor (tildes correctas en SRMR-006 Hori, SRMR-005 Nozi, SRMR-003 Jane) y a veces peor (sin prefijo). Sugiere que la línea SRMR fue editada manualmente por alguien distinto del resto del catálogo.

---

_Fin del documento. 24 grupos auditados, 27 recomendaciones de corrección concretas, 3 🚩 items requieren ruling de Ramsés (Ariam Dualidad / Zaren cura-a-6 / grafía Átlico & Activa Rápida)._
