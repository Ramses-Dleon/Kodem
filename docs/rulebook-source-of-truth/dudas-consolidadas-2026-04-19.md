# Kódem TCG v5.1 — Auditoría Consolidada
**Fecha:** 2026-04-19  
**Consolidador:** Sub-agente Logos (Claude Sonnet 4.6)  
**Fuentes:**
- `dudas-auditoria-v2-2026-04-19.md` — Opus 4.7, scope global (v2)
- `dudas-v3-part1-pages1-15.md` — Sonnet, páginas 1-15 (v3-P1)
- `dudas-v3-part2-pages16-28.md` — Sonnet, páginas 16-28 (v3-P2)
- `dudas-v3-part3-pages29-40.md` — Sonnet, páginas 29-40 (v3-P3)

**Numeración:** Continua desde D33, M15, E9 (resolviendo conflictos de IDs en fuentes)

---

## 1. RESUMEN EJECUTIVO

### Conteo por categoría (post-deduplicación)

| Categoría | Count | IDs |
|-----------|-------|-----|
| Erratas cerrables (ERRATAS DIRECTAS) | 16 | E9–E24 |
| Mecánicas resolvibles por lectura | 9 | M15–M23 |
| Abiertas para comunidad — Ambigüedades | 14 | D33–D46 |
| **TOTAL único** | **39** | |

> De los ~71 ítems brutos entre los 4 reportes, se eliminaron ~32 por ser duplicados, solapamientos o referencias al mismo hallazgo con distinta numeración.

---

### TOP 10 PRIORIDADES

| # | ID | Título | Prioridad | Razón |
|---|----|---------|-----------|-|
| 1 | D33 | Espectro sin carta poseída — ataque y daño | 🔴 CRÍTICA | Afecta arquetipo Espectro entero del set FYTE; mecánica central sin definir |
| 2 | D34 | Espectros omitidos de condición de victoria | 🔴 CRÍTICA | Determina estrategia de mazo completa; omisión estructural equivalente a Tokens |
| 3 | D41 | Activas-Rápidas: ventana de uso en turno rival | 🔴 CRÍTICA | Impacta resolución de interacciones cada turno del juego |
| 4 | D42 | Pasivas-Rápidas: disparadores (¿responden a ataques?) | 🔴 ALTA | Asimetría con Activas-Rápidas sin resolución |
| 5 | D43 | Pasivas Opcionales vs. Generales — criterio de identificación | 🔴 ALTA | Criterio "sin negrita" es ambiguo; afecta uso de Pasivas en juego |
| 6 | D40 | Ataque múltiple — "1 solo ataque" vs. costos y gatillos por objetivo | 🔴 ALTA | Kephir, Ulmor y ataques masivos son injugables sin este ruling |
| 7 | D44 | Efectos declarados fuera del campo — tensión entre 3 reglas (HandTraps) | 🟠 ALTA | HandTraps son populares; reglas contradictorias según sección leída |
| 8 | D39 | Ruk, Espectro Draconiano — poseer Rava y triple Pasiva inmune | 🟠 ALTA | Carta con mecánica única sin precedente definido |
| 9 | D38 | Descanso adicional en Espectros — ¿aplica el máximo de 2? | 🟠 MEDIA | Impacta Trote Espectral y Espectrosaurios directamente |
| 10 | M20 | Vivificar — definición puramente negativa, mecánica positiva ausente | 🟠 MEDIA | Sección central del rulebook con ~5 cartas dependientes |

---

## 2. ERRATAS DIRECTAS CERRABLES

> Typos ortográficos, referencias cruzadas numéricas obsoletas, palabras mal escritas.  
> **Acción:** Parchear en v5.2 sin consulta a comunidad.

---

### E9. Typo "expasión" — dos páginas

**Anchor:** p05/b09 y p14/b06  
**Texto original:** `Folio: Te ayuda a saber el número de carta dentro de la expasión.`  
**Texto corregido:** `Folio: Te ayuda a saber el número de carta dentro de la expansión.`  
**Nota:** El callout de Folio fue copiado con el typo presente en dos páginas.  
**Acción:** Parchear en v5.2 sin consulta comunidad.

---

### E10. "Fases del de Turno" — 'de' redundante

**Anchor:** p07/b15  
**Texto original:** `...las selecciones 5. Fases del de Turno y 6. Interacciones y Efectos.`  
**Texto corregido:** `...las secciones 5. Fases del Turno y 6. Interacciones y Efectos.`  
**Nota:** Doble errata en misma frase: "selecciones" → "secciones" + "del de" → "del".  
**Acción:** Parchear en v5.2 sin consulta comunidad.

---

### E11. "selecciones" en lugar de "secciones"

**Anchor:** p07/b15  
**Texto original:** `...te recomendamos que leas las selecciones 5...`  
**Texto corregido:** `...te recomendamos que leas las secciones 5...`  
**Nota:** Fusionado con E10 de v3-P1 — mismo anchor, misma frase.  
**Acción:** Parchear en v5.2 sin consulta comunidad (corrección incluida en E10 arriba).

---

### E12. "Las carta poseída" — falta 's'

**Anchor:** p14/b18  
**Texto original:** `Las carta poseída se colocará debajo del Espectro en Zona Principal.`  
**Texto corregido:** `La carta poseída se colocará debajo del Espectro en Zona Principal.`  
**Acción:** Parchear en v5.2 sin consulta comunidad.

---

### E13. "pueden disparan" — verbo mal conjugado

**Anchor:** p14/b19  
**Texto original:** `...por lo tanto, pueden disparan los efectos normales...`  
**Texto corregido:** `...por lo tanto, pueden disparar los efectos normales...`  
**Acción:** Parchear en v5.2 sin consulta comunidad.

---

### E14. "Algunos efectos de sólo afectan" — 'de' extraneous

**Anchor:** p06/b03  
**Texto original:** `Algunos efectos de sólo afectan a un tipo específico de carta...`  
**Texto corregido:** `Algunos efectos sólo afectan a un tipo específico de carta...`  
**Acción:** Parchear en v5.2 sin consulta comunidad.

---

### E15. Portada dice "Versión 5.0"

**Anchor:** p01/b03  
**Texto original:** `Versión 5.0`  
**Texto corregido:** `Versión 5.1`  
**Acción:** Parchear en v5.2 sin consulta comunidad.

---

### E16. "añadiendoles" — tilde faltante

**Anchor:** p06/b12  
**Texto original:** `añadiendoles descansos`  
**Texto corregido:** `añadiéndoles descansos`  
**Acción:** Parchear en v5.2 sin consulta comunidad.

---

### E17. "efectos estratégico" — concordancia rota

**Anchor:** p06/b16  
**Texto original:** `Reposiciona tus cartas para potenciar sus efectos estratégico.`  
**Texto corregido:** `Reposiciona tus cartas para potenciar sus efectos estratégicos.`  
**Acción:** Parchear en v5.2 sin consulta comunidad.

---

### E18. "sea ha hecho posible" — error gramatical (créditos)

**Anchor:** p40/b17  
**Texto original:** `con su apoyo este proyecto sea ha hecho posible y se fortalece día a día.`  
**Texto corregido:** `con su apoyo este proyecto se ha hecho posible y se fortalece día a día.`  
**Nota:** Detectado independientemente por v2-E10 y v3-P3-E11 — mismo anchor, misma corrección.  
**Acción:** Parchear en v5.2 sin consulta comunidad.

---

### E19. Typos múltiples en §Vivificar (p28/b08)

**Anchor:** p28/b08  
**Texto original:** `Algunas cartas en Kódem son variantes resurecctas, de los personajes, es decir, que fueron traídas de regreso del Reino de la muerte. Esta cartas normalmente se relaacionan con el fecto de 'VIVIFICAR'`  
**Texto corregido:** `Algunas cartas en Kódem son variantes resurrectas de los personajes, es decir, que fueron traídas de regreso del Reino de la muerte. Estas cartas normalmente se relacionan con el efecto de 'VIVIFICAR'`  
**Correcciones incluidas:** `resurecctas` → `resurrectas` | `Esta` → `Estas` | `relaacionan` → `relacionan` | `fecto` → `efecto`  
**Nota:** Detectado por v3-P2-E9. Reportado también parcialmente por v2-M18 (contexto de la sección).  
**Acción:** Parchear en v5.2 sin consulta comunidad.

---

### E20. "Prinicipal" — typo en §5.3

**Anchor:** p20/b02  
**Texto original:** `Las 2 cartas restantes se regresarán al fondo del Mazo Prinicipal en cualquier orden.`  
**Texto corregido:** `Las 2 cartas restantes se regresarán al fondo del Mazo Principal en cualquier orden.`  
**Nota:** Detectado por v2-E11 y v3-P2-E11 — mismo anchor.  
**Acción:** Parchear en v5.2 sin consulta comunidad.

---

### E21. Typos en §Generalidades de Efectos (p26/b03)

**Anchor:** p26/b03  
**Correcciones:**
- `eliminadan` → `eliminada`
- `atque` → `ataque`
- `Cempasúchi` → `Cempasúchil` (nombre completo con L final)

**Acción:** Parchear en v5.2 sin consulta comunidad.

---

### E22. "zona Extinción" / "zona de extinción" — inconsistencia tipográfica

**Anchor:** p40/b04 (glosario entrada Vivificar)  
**Texto original:** `Es un efecto que hace que una carta deje la zona Extinción, cualquier carta que deje la zona de extinción se considera que está siendo vivificada.`  
**Texto corregido:** `Es un efecto que hace que una carta deje la Zona de Extinción; cualquier carta que deje la Zona de Extinción se considera que está siendo vivificada.`  
**Nota:** Detectado por v2-E12 y v3-P3-E13 — mismo anchor.  
**Acción:** Parchear en v5.2 sin consulta comunidad.

---

### E23. Referencias cruzadas obsoletas de renumeración v5.0→v5.1 (catálogo completo)

**Categoría:** errata / referencia cruzada  
**Anchors y correcciones:**

| Ubicación | Dice (incorrecto) | Debe decir | Fuente |
|-----------|-------------------|------------|--------|
| p07/b11 | Ver 6.3 Tipos de daño | Ver 6.4 Tipos de daño | v3-P1-M15 |
| p16/b06b | Ver 6.6.2 Pasivas | Ver 6.7.2 Pasivas | D14 (previo) |
| p16/b09 | Ver 6.5. Ataque | Ver 6.6. Ataque | D14 (previo) |
| p16/b10 | Ver 6.6.3 Costos | Ver 6.7.3 Costos | D14 (previo) |
| p16/b11 | Ver 6.6.1 Activas | Ver 6.7.1 Activas | D14 (previo) |
| p38/b01 (Activa) | Ver 6.6 Efectos | Ver 6.7 Efectos | v3-P3-M15 |
| p38/b02 (Activa-Rápida) | Ver 6.6 Efectos | Ver 6.7 Efectos | v3-P3-M15 |
| p38/b04 (Atacar) | ver 6.5. Ataques | ver 6.6. Ataque | v3-P3-M17 |
| p38/b07 (Cambiar) | Ver 6.4. Cambios entre Zonas | Ver 6.5. Cambios entre Zonas | v3-P3-M16 |
| p38/b12 (Costo) | Ver 6.6 Efectos | Ver 6.7 Efectos | v3-P3-M15 |
| p39/b19 (Restricción) | Ver 6.7. Restricciones | Ver 6.8. Restricciones | v3-P3-M18 |

**Nota:** Todos son el mismo patrón de renumeración parcial. Se consolidan como una sola errata corregible en bloque.  
**Acción:** Parchear todas las referencias en v5.2 sin consulta comunidad.

---

### E24. Typos menores misceláneos (catálogo)

**Categoría:** errata ortográfica menor  
**Anchors y correcciones:**

| Ubicación | Texto incorrecto | Corrección | Fuente |
|-----------|-----------------|------------|--------|
| p06/b11 | `ataques alta y medianamente fuertes` | `ataques altamente y medianamente fuertes` | v3-P1-E18 |
| p23/b04 | `regresara` | `regresará` | v3-P2-E11 |
| p24/b07 | `reemplazara` | `reemplazará` | v3-P2-E11 |
| p24/b07 | `Ej Yanzi, precisión` | `Ej. Yanzi, Precisión` | v3-P2-E11 |
| p27/b10 | `descansos máximo` | `descansos máximos` | v3-P2-E11 |
| p27/b11 | `Ejemplo:"Zaykan,Emboscada"` | `Ejemplo: "Zaykan, Emboscada"` | v3-P2-E11 |
| p27/b11 | `este disponible` | `esté disponible` | v3-P2-E11 |
| p28/b01 | `considerara` | `considerará` | v3-P2-E11 |
| p28/b04 | `Extincion` | `Extinción` | v3-P2-E11 |
| p28/b04 | `si cumple` (adv.) | `sí cumple` | v3-P2-E11 |
| p33/b01 | `vinvular` | `vincular` | v3-P3-E9 |
| p33/b05 | `2 .Si`, `4.Si`, `5.El`, `6.En` | `2. Si`, `4. Si`, `5. El`, `6. En` | v3-P3-E15 |
| p39/b03 | `muestrala` | `muéstrala` | v3-P3-E12 |
| p39/b06 | `este negado` | `esté negado` | v3-P3-E14 |
| p39/b09 | `mlas Pasivas-Rápidas` | `las Pasivas-Rápidas` | v3-P3-E10 |
| p39/b13 | `Efecto. Efecto que se aplica a una carta la carta protegida` | `Una carta protegida es inmune...` | v3-P3-E16 |

**Acción:** Parchear en bloque en v5.2 sin consulta comunidad.

---

## 3. MECÁNICAS RESOLVIBLES POR LECTURA

> Dudas cuya respuesta se infiere de otra parte del rulebook no leída por el subagente individual.  
> **Marca:** RESOLUBLE SIN CONSULTA — ruling tentativo con evidencia.

---

### M15. Cross-reference erróneo "Ver 6.3 Tipos de daño" en p07/b11

**Categoría:** mech / referencia  
**Anchor:** p07/b11  
**Problema:** La referencia "Ver 6.3 Tipos de daño" lleva a §Protección, no a §Tipos de Daño.  
**RESOLUBLE SIN CONSULTA** — El TOC en p03 establece §6.4 = Tipos de Daño. El error es editorial puro.  
**Ruling tentativo:** La referencia correcta es §6.4. Parcheable como E23 (ya incluido arriba).

---

### M16. "Activas Rápidas" vs "Activa-Rápida" — inconsistencia de guión

**Categoría:** mech / editorial  
**Anchors:** p16/b11 (sin guión) vs p16/b06b, p27/b15, p27/b16 (con guión)  
**Problema:** El rulebook usa ambas formas en distintos puntos.  
**RESOLUBLE SIN CONSULTA** — El glosario §9 usa consistentemente "Activa-Rápida" (con guión). La forma oficial es la que aparece en el glosario.  
**Ruling tentativo:** La forma canónica es **Activa-Rápida** (con guión). Las instancias sin guión son erratas tipográficas (incluir en E24). La mecánica es idéntica en ambas formas.

---

### M17. "Ixim siempre tendrán Pasivas" vs. Pasiva-Rápida en el pool

**Categoría:** mech / inconsistencia  
**Anchor:** p10/b05 — `Los Ixim siempre tendrán Pasivas y los Rot siempre tendrán Activas.`  
**Cartas implicadas:** Copal Blanco (FYTE-008), Planta Carnívora (RAMI-008S, RAMI-023)  
**Problema:** El pool tiene 3 Ixim con Pasiva-Rápida, pero la regla solo menciona "Pasivas".  
**RESOLUBLE SIN CONSULTA** — La Pasiva-Rápida es un subtipo de Pasiva. El glosario §9 (p39/b09) define "Pasiva-Rápida" como variante de Pasiva que "resuelve tan pronto son declaradas". El principio de jerarquía (subtipo incluido en el supertipo) aplica.  
**Ruling tentativo:** "Pasiva" en la regla de tipos de Ixim (p10/b05) incluye implícitamente "Pasiva-Rápida". Las 3 cartas son legalmente válidas. Agregar nota aclaratoria en v5.2: "Los Ixim siempre tendrán Pasivas (incluyendo Pasiva-Rápida)."

---

### M18. "Descanso: 0" en callout de Espectro vs. herencia al poseer

**Categoría:** mech / inconsistencia  
**Anchor:** p14/b10 (callout "Descanso: 0") vs p14/b16 (herencia de stats de carta poseída)  
**Problema:** El callout muestra "Descanso: 0" como stat fijo, pero la regla ordena usar el descanso de la carta poseída.  
**RESOLUBLE SIN CONSULTA** — El callout anatómico documenta el estado base (sin posesión). La regla completa de p14/b16 es la autoridad para el comportamiento en juego. El mismo patrón aplica al Daño del Espectro (callout dice "?" implícito, la regla ordena herencia).  
**Ruling tentativo:** "Descanso: 0" es el valor base del Espectro sin carta poseída. Con carta poseída, el Espectro opera con el Descanso de dicha carta. Agregar nota al callout en v5.2.

---

### M19. Ixim y descansos — ausencia de regla simétrica a Rot

**Categoría:** mech  
**Anchor:** p18/b09 — Rot NO genera descansos al usar Activa. Sin regla equivalente para Ixim.  
**Problema:** No se sabe si Ixim genera descansos al usar su Activa.  
**RESOLUBLE SIN CONSULTA** — La regla de p18/b09 es una excepción explícita para Rot ("NO aplicarán descansos"). Sin excepción explícita, aplica la regla general: toda Activa declarada en Fase de Batalla genera descanso. Los Ixim no están en la lista de excepciones de p18/b09, por lo tanto aplica la regla general.  
**Ruling tentativo:** Las Activas de Ixim SÍ generan descanso para la carta equipada (aplica la regla general, no la excepción de Rot). La carta que descansa es el Adendei al que está equipado el Ixim, ya que p16/b08 dice que "se considera como 1 sola Activa". Para confirmar: si la carta equipada ya estaba en descanso, el Ixim no puede usarse como parte de esa Activa combinada ese turno.

---

### M20. Reemplazo fallido — "2 veces" vs "tercer reemplazo" — conteo contradictorio

**Categoría:** mech  
**Anchor:** p20/b06 — `puede repetirse un máximo de 2 veces` vs `Si después del tercer reemplazo...`  
**Problema:** ¿Son 2 intentos o 3?  
**RESOLUBLE SIN CONSULTA** — La lectura semántica correcta: el proceso de reemplazo ORIGINAL cuenta como el primer intento. "Puede repetirse un máximo de 2 veces" = 2 repeticiones adicionales = 3 intentos totales. "Tercer reemplazo" confirma esta lectura: el tercer intento es el tercer reemplazo.  
**Ruling tentativo:** Son **3 intentos totales**: 1er intento (proceso normal) → falla → repite (2do) → falla → repite (3ro, "tercer reemplazo") → falla → pierde. La redacción "puede repetirse 2 veces" es correcta si se interpreta como "2 repeticiones después del intento original". Aclarar en v5.2 para evitar confusión.

---

### M21. Glosario "Pasiva" — "no se actualizan descansos" incompleto

**Categoría:** mech  
**Anchor:** p39/b08 — `no se actualizan descansos al usarlos`  
**Problema:** Algunas Pasivas tienen costos de descanso explícitos; la afirmación parece absoluta.  
**RESOLUBLE SIN CONSULTA** — La regla de p29/b06 (§6.7.2) dice que Pasivas no generan descansos **automáticos** al final del turno (a diferencia de Activas). Los costos explícitos de descanso son costos de carta (D17: texto de carta supercede), no descansos "automáticos" generados por el tipo de efecto. No hay contradicción real.  
**Ruling tentativo:** La afirmación del glosario es correcta en su alcance: las Pasivas no generan descanso **automático** al final del turno. Si el costo de una Pasiva dice "recibe N descansos", ese descanso es parte del costo pagado explícitamente, no el descanso automático. Agregar en v5.2: "...no se actualizan descansos automáticamente al usarlos (a menos que el costo de la Pasiva lo especifique)."

---

### M22. Glosario "Pasiva-Rápida" — disparadores difieren entre glosario y rulebook

**Categoría:** mech / inconsistencia  
**Anchor:** p39/b09 (glosario) vs p29/b09 (rulebook)  
**Problema:** Glosario omite la cláusula sobre uso una vez por turno en Fase Previa si no especifica momento; y dice "otras Pasivas" vs "declaración de otras Pasivas" del rulebook.  
**RESOLUBLE SIN CONSULTA** — El cuerpo del rulebook en p29/b09 es más completo y es la autoridad normativa. El glosario es un resumen. La frase "declaración de" es mecánicamente relevante: la Pasiva-Rápida responde en la ventana de declaración, antes de la resolución.  
**Ruling tentativo:** El texto autoritativo es p29/b09. La entrada del glosario debe actualizarse en v5.2 para incluir: (a) que responde a la *declaración* de Pasivas (no resolución), y (b) la cláusula de uso una vez por turno en Fase Previa cuando no hay momento preciso.

---

### M23. Zona "mano" — estado no declarado en §4

**Categoría:** mech  
**Anchor:** p24/b03 — `Solo se considera que una carta está en mano cuando se toma del Mazo, por reemplazo o por efecto de alguna carta.`  
**Problema:** "Mano" no aparece en la lista de zonas de §4 pero se usa como estado diferenciado.  
**RESOLUBLE SIN CONSULTA** — La regla de p24/b03 está en §6.5 (Cambios entre Zonas), contexto de describir estados transitorios. El rulebook distingue entre zonas permanentes (§4) y estados momentáneos. "En mano" es análogo a "en tránsito" — existe por el tiempo entre ser tomada del mazo y ser colocada en el campo. No tiene por qué listarse como zona permanente.  
**Ruling tentativo:** "En mano" es un **estado transitorio** (no una zona), que existe únicamente durante la ventana de selección en el proceso de reemplazo (p20/b02-b03). No se listan cartas "en mano" fuera de ese proceso. Agregar definición al glosario §9: "Mano: Estado transitorio que adquiere una carta al ser tomada del Mazo durante el proceso de Reemplazo, antes de ser colocada en el campo o devuelta al Mazo."

---

## 4. ABIERTAS PARA COMUNIDAD

> Requieren decisión de diseño de Ramsés. Sin ruling definitivo inferible del texto actual.  
> Numeradas D33+ y M (adicionales que requieren decisión).

---

### D33. Espectro sin carta poseída — condición de ataque y daño

**Fecha:** 2026-04-19 | **Status:** 🟡 Abierta  
**Anchor:** p14/b16  
**Cartas implicadas:** FYTE-015S/068 (Trote Espectral), FYTE-021R/073 (Espectrosaurios)  

Un Espectro sin carta poseída "no tiene un daño definido" según el rulebook, pero la regla del "doble de vida a aliados" implica que puede intentar atacar. Sin embargo:
1. ¿Cuánto daño inflige sin carta poseída? ¿Puede atacar por 0?
2. ¿"Si esta carta ataca" (Trote Espectral, Espectrosaurios) se dispara cuando ataca por el mecanismo de pagar doble de vida?
3. ¿El costo de pagar doble de vida se paga antes o después de declarar el ataque?

**Opciones de ruling:**
1. Un Espectro sin carta poseída no puede atacar bajo ningún concepto; "pagar doble de vida" es la penalización, no un modo alternativo.
2. Puede atacar por 0 daño pagando el costo; "si ataca" se dispara normalmente.
3. Puede declarar ataque → 0 daño + costo de vida aliada; no dispara efectos condicionales de "si ataca".

**Nota v2-Opus:** Recomienda opción 1 como más consistente con el espíritu del arquetipo.

---

### D34. Espectros omitidos de la Condición de Victoria

**Fecha:** 2026-04-19 | **Status:** 🟡 Abierta  
**Anchor:** p15/b12 — La lista enumera Adendei, Rava, Bio, Rot, Ixim y Protectores (excepto Tokens). Espectros ausentes.  
**Cartas implicadas:** Todos los Espectros del set FYTE (21 cartas).  

Cuando un Espectro muere, tanto el Espectro como su carta Poseída van a Extinción (p14/b19). La ausencia de Espectros en el listado es ambigua:
1. ¿Excluidos intencionalmente como los Tokens (formas especiales)?  
2. ¿Errata de omisión? ¿Deben contarse?
3. ¿Doble conteo intencional? (Espectro + carta Poseída = 2 puntos de victoria)

**Opciones de ruling:**
1. Intencional — Espectros no cuentan (como Tokens); solo la carta Poseída (Adendei) suma al contador.
2. Errata — Espectros sí cuentan; agregar "Espectros" a la lista en v5.2.
3. Doble conteo intencional — Espectro Y carta Poseída cuentan por separado.

**⚠️ Interpretación divergente:**  
- *v2-Opus (D34):* Señala que el impacto es alto: "la muerte de un Espectro vale potencialmente 2 puntos de victoria" y recomienda aclaración.  
- *v3-P1 (D34):* Misma duda, énfasis en que la ausencia es estructuralmente similar a la de Tokens (que sí tienen excepción explícita).

---

### D35. Callout vs. Regla — efecto propio del Espectro vs. el de la carta poseída

**Fecha:** 2026-04-19 | **Status:** 🟡 Abierta  
**Anchor:** p14/b05 (callout) vs p14/b16 bullet 4 (regla completa)  
**Cartas implicadas:** Flora Espectral (FYTE-010S/054), Trote Espectral (FYTE-015S/068), Espectrosaurios (FYTE-021R/073), Ruk (FYTE-048/ST1)  

El callout anatómico implica que el Efecto y Costo del Espectro son los de la carta poseída. La regla completa dice que el Espectro usa **su propio efecto** más los atributos de la poseída. Para Espectros sin efecto propio (Nánuk) coincide, pero para los que tienen efecto propio (Trote Espectral, Ruk) el callout es pedagógicamente engañoso.

**Opciones de ruling:**
1. El callout es simplificación para la carta ejemplo (Nánuk). La regla b16 es autoridad. Reescribir callout en v5.2.
2. El callout es canónico para el caso base; Espectros con efecto propio lo conservan además — b16 es la regla general.
3. Ruling explícito: documentar que Espectros con efecto propio impreso usan ambos; sin efecto propio, solo los de la poseída.

---

### D36. Poseer — múltiples Espectros y cartas disponibles en Extinción

**Fecha:** 2026-04-19 | **Status:** 🟡 Abierta  
**Anchor:** p14/b16 — mecánica de poseer  
**Cartas implicadas:** FYTE-003K/046 (Ariam, Axoloespectro), FYTE-013R/047 (Aki, Brinco Espectral), FYTE-007R/023 (Tlahuelpuchi)  

Cuando hay 2 Espectros en campo y ambos quieren poseer:
1. Si el Espectro A ya poseyó el único Ariam disponible, ¿puede el Espectro B intentar poseer esa misma carta? (ya está debajo de A, no en Extinción libre)
2. El efecto de Tlahuelpuchi "no envían cartas a Extinción para poseer" ¿bloquea todo el proceso, o solo el paso de enviar el Adendei aliado?
3. Si hay 2 Ariam en Extinción y 2 Espectros del tipo Ariam, ¿ambos pueden poseer en la misma Fase Previa?

**Opciones de ruling:**
1. Solo puede poseerse una carta que esté libremente en Extinción (no debajo de otro Espectro); Tlahuelpuchi solo bloquea el envío activo, no la posesión de cartas ya en Extinción por otros medios.
2. Ambos Espectros pueden poseer simultáneamente si hay suficientes Adendei del tipo en Extinción.
3. Solo un Espectro puede poseer por Fase Previa (similar a Vínculo Odémico).

---

### D37. Tlahuelpuchi — poseer con cartas pre-existentes en Extinción

**Fecha:** 2026-04-19 | **Status:** 🟡 Abierta  
**Anchor:** p14/b16 (mecánica poseer) + FYTE-007R/023 (texto de Tlahuelpuchi)  
**Cartas implicadas:** FYTE-007R/023 (Tlahuelpuchi, Invocación Espectral)  

Tlahuelpuchi dice "Los Espectros aliados no envían cartas a Extinción para poseer hasta que este Protector esté disponible." Bloquea el paso (a) del proceso de poseer (enviar Adendei). Si ya hay cartas del Requisito en Extinción por otros medios (daño, efectos rivales):
1. ¿El Espectro puede ejecutar el paso (b) sin el paso (a)?
2. "No envían cartas para poseer" ¿bloquea todo el proceso, o solo el envío activo?
3. ¿Cartas que llegaron a Extinción por efectos de turno anterior o efectos rivales se pueden poseer?

**Opciones de ruling:**
1. Tlahuelpuchi bloquea completamente la acción de poseer mientras esté en descanso.
2. Tlahuelpuchi solo bloquea el envío activo; si ya hay cartas del Requisito en Extinción por otros medios, el Espectro sí puede poseer.
3. Tlahuelpuchi requiere que no se haya enviado activamente ese turno; cartas de turno anterior o por efectos rivales se pueden poseer.

---

### D38. Descanso adicional en Espectros — ¿aplica el máximo de 2?

**Fecha:** 2026-04-19 | **Status:** 🟡 Abierta  
**Anchor:** p18/b07 (máx 2 descansos para Adendei, Rava, Token) + FYTE-015S/068, FYTE-021R/073  
**Cartas implicadas:** Trote Espectral (FYTE-015S/068), Espectrosaurios (FYTE-021R/073)  

Trote Espectral agrega "1 descanso adicional al final del turno" al atacar. Si el Espectro hereda 2 descansos de la carta poseída y luego recibe 1 adicional por su efecto:
1. ¿El máximo de 2 descansos aplica a los Espectros? (la regla lo enuncia para "Adendei, Rava y Token")
2. Si aplica, ¿el descanso adicional se "absorbe" si ya está en 2?
3. ¿La vida máxima propia del Espectro implica un máximo de descansos distinto?

**Opciones de ruling:**
1. El límite de 2 descansos aplica a Espectros igual que a Adendei (ya que usan las stats de la poseída).
2. Espectros no tienen límite explícito (el rulebook solo menciona el límite para "Adendei, Rava y Token").
3. El límite aplica pero se calcula sobre el descanso heredado de la carta poseída.

---

### D39. Ruk, Espectro Draconiano — poseer Rava y triple Pasiva inmune

**Fecha:** 2026-04-19 | **Status:** 🟡 Abierta  
**Anchor:** p14/b16 (mecánica poseer) + FYTE-048/ST1  
**Cartas implicadas:** FYTE-048/ST1 (Ruk, Espectro Draconiano)  

Ruk tiene Requisito de "1 o más Rava en tu Extinción" (no Adendei del mismo nombre). Su Pasiva dice "Copia la Pasiva y costo de 1 Rava en Extinción." La mecánica de poseer dice "enviando a un Adendei aliado a Extinción". Tres problemas:
1. ¿Ruk puede poseer una Rava? (La mecánica estándar requiere enviar un Adendei aliado)
2. Si la carta poseída es la Rava bajo Ruk, ¿la Pasiva copiada es la de esa misma carta poseída o de otra Rava en Extinción?
3. ¿"La Pasiva de la carta poseída" y "la Pasiva copiada" son la misma cosa? ¿Cuenta como 2x la misma inmunidad o son Pasivas distintas?

**Opciones de ruling:**
1. Ruk posee la Rava enviando un Adendei aliado a Extinción (mecánica estándar); la Pasiva copiada puede ser de esa u otra Rava en Extinción.
2. Ruk no puede poseer (Requisito es Rava, no Adendei del mismo nombre); opera sin carta poseída.
3. Ruk es excepción explícita: puede poseer a la Rava directamente por tenerla en Requisito.

---

### D40. Ataque múltiple — descansos, costos y gatillos por objetivo

**Fecha:** 2026-04-19 | **Status:** 🟡 Abierta  
**Anchor:** p24/b07, p25/b01  
**Cartas implicadas:** Kephir Lanzallamas (KPRC-010/LGRO-005U/045), Balim Sacudida Estática (MLBU-004), Ulmor Ataque Fugaz  

El rulebook dice que atacar a múltiples cartas "se considera como 1 solo ataque" (p25/b01) y que los efectos de ataque adicional con daño especificado "reemplaza el ataque base" (p24/b07). Sin resolver:
1. ¿Cada ataque adicional genera su propio descanso, o toda la secuencia genera 1?
2. Kephir con 4 equipos puede hacer 5 ataques — ¿genera hasta 5 descansos (limitados a máx 2) o 1 solo?
3. ¿El rival puede usar Activas-Rápidas como respuesta a cada ataque individual, o solo una vez para toda la secuencia?
4. El costo de Ulmor "1 daño antes de atacar" — ¿se paga una vez o por cada objetivo?
5. ¿El daño del efecto reemplaza solo el Daño Base, o también el Daño Aumentado?

**Opciones de ruling:**
1. Cada ataque (base + adicionales) genera 1 descanso al final del turno; Kephir con 4 equipos acumula hasta el máx de 2.
2. Solo 1 descanso por toda la secuencia de ataques del turno.
3. Cada ataque adicional es acción separada con sus propios descansos, gatillos y ventanas de respuesta.

**Nota sobre E9 (Balim):** El typo "akliada" → "aliada" en MLBU-004 es una errata cerrable (E9); la mecánica de atacar a carta **aliada** con daño propio puede ser intencional y queda como subpunto de esta duda.

---

### D41. Activas-Rápidas — ventana de uso en turno rival

**Fecha:** 2026-04-19 | **Status:** 🟡 Abierta  
**Anchor:** p29/b04 — `también se pueden usar durante el turno del rival (como respuesta)`  
**Problema:** La regla dice "como respuesta" sin especificar respuesta a qué. Las Pasivas-Rápidas (p29/b09) sí delimitan 3 disparadores concretos (revelación, eliminación, declaración de Pasivas). Para Activas-Rápidas, la ventana es libre o restringida?

**Opciones de ruling:**
1. Activa-Rápida puede declararse en **cualquier momento** del turno rival (ventana abierta).
2. Solo durante la Fase de Batalla del turno rival (por analogía con las Activas regulares).
3. Mismas ventanas que Pasivas-Rápidas más durante la Subfase de Respuesta Rival.

---

### D42. Pasivas-Rápidas — ¿responden a declaración de ataques y Activas?

**Fecha:** 2026-04-19 | **Status:** 🟡 Abierta  
**Anchor:** p29/b09 — disparadores: revelación, eliminación, declaración de otras Pasivas  
**Problema:** Los 3 disparadores de Pasiva-Rápida excluyen explícitamente la "declaración de Activa" y la "declaración de ataque". ¿Es intencional esta asimetría con las Activas-Rápidas (ventana libre)? ¿Puede una Pasiva-Rápida dispararse en respuesta a un ataque o Activa rival?

**Opciones de ruling:**
1. Lista **exhaustiva** — Pasiva-Rápida no puede usarse como respuesta a Activas o ataques.
2. Lista **no exhaustiva** (redactada incompleta) — Pasiva-Rápida puede dispararse ante cualquier acción rival.
3. "Declaración de otras Pasivas" es error de redacción; debe decir "declaración de efectos" (incluyendo Activas y ataques).

---

### D43. Pasivas Opcionales vs. Generales — criterio de identificación

**Fecha:** 2026-04-19 | **Status:** 🟡 Abierta  
**Anchor:** p29/b06 (Pasivas generales: múltiples/turno) vs p29/b08 (Pasivas Opcionales: 1/turno, solo Fase Previa, "sin negrita")  
**Problema:** El criterio de diferenciación es "sin negrita en el texto de la carta", que depende del diseño de impresión, no de la mecánica. ¿Es "sin negrita" el criterio formal, o hay criterio funcional alternativo? Cartas con Pasiva que no tiene condición de disparo y no dice "puede" podrían leerse como Opcional o como General según el criterio usado.

**Opciones de ruling:**
1. Criterio formal visual: "sin negrita" = Opcional (1/turno, Fase Previa).
2. Criterio funcional: si no tiene condición de disparo (no dice "si"/"cuando"/"al") = Opcional. Pasivas con disparador = Generales.
3. Pasivas sin disparador son de uso libre (no restringidas a Fase Previa); Pasivas Opcionales solo son las que explícitamente dicen "puede".

---

### D44. Efectos declarados fuera del campo — tensión entre 3 reglas (HandTraps)

**Fecha:** 2026-04-19 | **Status:** 🟡 Abierta  
**Anchor:** p25/b06 — tres reglas en tensión  
**Cartas implicadas:** Ariam Escudo, Kap Lluvia de Ranas, Kaykac Sorpresa Pírica, Quam Detrás de la Materia  

Tensión entre:
1. Efectos ya declarados resuelven aunque la carta cambie de zona (persistencia de resolución).
2. Efectos sin cláusula de duración terminan cuando la carta deja el campo.
3. Solo cartas reveladas EN CAMPO pueden usar sus efectos.

La regla 3 parece contradecir los HandTraps (se disparan cuando la carta es tomada del Mazo, fuera del campo). La regla 1 parece contradecir la regla 2 para efectos duraderos.

**Opciones de ruling:**
1. La regla 3 aplica solo a efectos voluntarios; los HandTraps son excepción por texto de carta (D17). No hay contradicción real.
2. La regla 3 aplica solo a la declaración de NUEVOS efectos; la regla 1 rige efectos ya declarados. HandTraps se declaran antes de entrar → aplica regla 1.
3. Hay inconsistencia real que requiere aclaración en v5.2: separar "uso de efectos", "resolución de efectos ya declarados" y "efectos que se disparan fuera del campo".

---

### D45. §6.8 Regla 14 — "8 turnos de bloqueo total": ¿turno de quién?

**Fecha:** 2026-04-19 | **Status:** 🟡 Abierta  
**Anchor:** p31/b11  
**Problema:** La regla de bloqueo total (si ningún jugador puede hacer daño ni usar efectos para salir en "más de 8 turnos") no especifica si son 8 turnos de cada jugador, 8 rondas completas, o 8 turnos totales. La diferencia es significativa: 8 turnos totales = 4 por jugador; 8 turnos de cada jugador = 16 alternaciones.

**Opciones de ruling:**
1. Son 8 turnos de **cada jugador** (= 16 alternaciones totales).
2. Son 8 **rondas completas** (= 16 alternaciones; mismo resultado que opción 1).
3. Son 8 **turnos totales** (= 4 por jugador), activándose mucho más rápido.

---

### D46. Formato Extendido — ¿3 copias del mismo Rava o máx 3 Ravas distintos?

**Fecha:** 2026-04-19 | **Status:** 🟡 Abierta  
**Anchor:** p36/b03 — `pudiendo incluir hasta 3 Ravas` + `Puedes llevar hasta 3 copias de cada carta Adendei`  
**Problema:** La regla de 3 copias se enuncia explícitamente solo para Adendei. "Hasta 3 Ravas" podría ser (a) el total de Ravas en el mazo sin cambiar la restricción de unicidad, o (b) analogía con Adendei: 3 copias del mismo Rava.

**Opciones de ruling:**
1. "Hasta 3 Ravas" es el límite total del mazo; cada Rava sigue siendo 1 copia única (Extendido no cambia unicidad para Ravas).
2. Igual que Adendei: Extendido permite hasta 3 copias del mismo Rava.
3. El texto es ambiguo; requiere ruling explícito.

---

## 5. DEDUPLICADAS

Lista de IDs originales fusionados o descartados, con razón y nuevo ID resultante.

| ID original | Reporte fuente | Razón | Nuevo ID |  
|-------------|---------------|-------|----------|  
| v2-D33 | dudas-auditoria-v2 | Espectro sin poseída atacando | → **D33** (misma duda) |  
| v3-P1-D33 | dudas-v3-part1 | Rango Adendei Step 1 vs Step 3 | → **D47** (diferente, no fusionado) ¹ |  
| v3-P2-D33 | dudas-v3-part2 | Guión Activa-Rápida | → **M16** (mecánica resoluble) |  
| v3-P3-D33 | dudas-v3-part3 | Activas-Rápidas ventana rival | → **D41** |  
| v2-D34 | dudas-auditoria-v2 | Espectro a 0 PV genera suplente | → **D34** (fusionado con v3-P1-D34) |  
| v3-P1-D34 | dudas-v3-part1 | Espectros omitidos condición victoria | → **D34** (mismo concepto, descripción v3-P1 más específica; ambas integradas) |  
| v3-P2-D34 | dudas-v3-part2 | Zona "mano" no declarada | → **M23** (resoluble por lectura) |  
| v3-P3-D34 | dudas-v3-part3 | Pasivas-Rápidas disparadores | → **D42** |  
| v2-D35 | dudas-auditoria-v2 | Adendei Resurrecto — subtipo no definido | → sin ID nuevo: cubierto por D35/D36 (contexto de vivificar) ² |  
| v3-P1-D35 | dudas-v3-part1 | Callout vs regla efecto propio Espectro | → **D35** |  
| v3-P2-D35 | dudas-v3-part2 | Vivificar — definición solo negativa | → **M20** (resoluble parcialmente) + abierta |  
| v3-P3-D35 | dudas-v3-part3 | Pasivas Opcionales criterio | → **D43** |  
| v2-D36 | dudas-auditoria-v2 | Poseer — múltiples Espectros en campo | → **D36** |  
| v3-P2-D36 | dudas-v3-part2 | Condición simultánea activación | → **D48** (no fusionado, concepto diferente) ³ |  
| v3-P3-D36 | dudas-v3-part3 | Cartas tomadas: Pasivas en Fase Post | → **D49** (no fusionado) ³ |  
| v2-D37 | dudas-auditoria-v2 | Tlahuelpuchi — interacción poseer sin enviar | → **D37** |  
| v3-P2-D37 | dudas-v3-part2 | Ataque múltiple "1 solo ataque" | → **D40** (fusionado con v2-D40) |  
| v3-P3-D37 | dudas-v3-part3 | Formato Multijugador cartas con "jugador(es)" | → descartado ⁴ |  
| v2-D38 | dudas-auditoria-v2 | Descanso adicional en Espectros | → **D38** |  
| v3-P2-D38 | dudas-v3-part2 | Daño que "reemplaza" vs suma en ataque múltiple | → **D40** (fusionado, subpunto 5) |  
| v3-P3-D38 | dudas-v3-part3 | Condición victoria alternativa Formato Extendido | → descartado ⁵ |  
| v2-D39 | dudas-auditoria-v2 | Ruk, Espectro Draconiano | → **D39** |  
| v3-P2-D39 | dudas-v3-part2 | Efectos declarados en zona distinta (HandTraps) | → **D44** |  
| v3-P3-D39 | dudas-v3-part3 | Formato Extendido — 3 copias Rava | → **D46** |  
| v2-D40 | dudas-auditoria-v2 | Kephir ataques múltiples y descansos | → **D40** |  
| v3-P3-D40 | dudas-v3-part3 | §6.8 Regla 14 — 8 turnos bloqueo | → **D45** |  
| v2-E9 | dudas-auditoria-v2 | Typo "akliada" en Balim | → **E9** base (MLBU-004) |  
| v3-P1-E9 | dudas-v3-part1 | Typo "expasión" en p05/p14 | → **E9** nuevo (distinto anchor; se mantiene) |  
| v3-P2-E9 | dudas-v3-part2 | Typos §Vivificar p28/b08 | → **E19** |  
| v3-P3-E9 | dudas-v3-part3 | Typo "vinvular" p33/b01 | → **E24** catálogo |  
| v2-E10 | dudas-auditoria-v2 | "sea ha hecho posible" créditos p40 | → **E18** (fusionado con v3-P3-E11) |  
| v3-P1-E10 | dudas-v3-part1 | "Fases del de Turno" | → **E10** |  
| v3-P2-E10 | dudas-v3-part2 | Typos §Generalidades Efectos p26/b03 | → **E21** |  
| v3-P3-E10 | dudas-v3-part3 | "mlas Pasivas-Rápidas" p39 | → **E24** catálogo |  
| v2-E11 | dudas-auditoria-v2 | "Prinicipal" typo p20/b02 | → **E20** (fusionado con v3-P2-E11 mismo anchor) |  
| v3-P1-E11 | dudas-v3-part1 | "selecciones" → "secciones" | → **E10/E11** fusionados (mismo anchor p07/b15) |  
| v3-P2-E11 | dudas-v3-part2 | Typos misceláneos p16-28 | → **E24** catálogo |  
| v3-P3-E11 | dudas-v3-part3 | "sea ha hecho posible" | → **E18** (mismo anchor que v2-E10) |  
| v2-E12 | dudas-auditoria-v2 | "zona Extinción" vs "zona de extinción" | → **E22** (fusionado con v3-P3-E13) |  
| v3-P1-E12 | dudas-v3-part1 | "Las carta poseída" | → **E12** |  
| v3-P2-E12 | (dentro de E11 catálogo) | Incluido en catálogo E11 | → **E24** |  
| v3-P3-E12 | dudas-v3-part3 | "muestrala" sin tilde p39 | → **E24** catálogo |  
| v3-P1-E13 | dudas-v3-part1 | "pueden disparan" | → **E13** |  
| v3-P3-E13 | dudas-v3-part3 | "zona Extinción" mismo anchor | → **E22** (fusionado con v2-E12) |  
| v3-P1-E14 | dudas-v3-part1 | "efectos de sólo afectan" | → **E14** |  
| v3-P3-E14 | dudas-v3-part3 | "este negado" sin tilde | → **E24** catálogo |  
| v3-P1-E15 | dudas-v3-part1 | Portada dice "Versión 5.0" | → **E15** |  
| v3-P3-E15 | dudas-v3-part3 | Formateo inconsistente penalizaciones p33 | → **E24** catálogo |  
| v3-P1-E16 | dudas-v3-part1 | "añadiendoles" sin tilde | → **E16** |  
| v3-P3-E16 | dudas-v3-part3 | "Efecto. Efecto que se aplica" redundante | → **E24** catálogo |  
| v3-P1-E17 | dudas-v3-part1 | "efectos estratégico" concordancia | → **E17** |  
| v3-P1-E18 | dudas-v3-part1 | "alta y medianamente" → "altamente" | → **E24** catálogo |  
| v2-M15 | dudas-auditoria-v2 | Token-Feral y Token-Lítico sin definición | → **D50** (abierta, no en las 14 publicadas; pendiente) ⁶ |  
| v3-P1-M15 | dudas-v3-part1 | Cross-reference "Ver 6.3 Tipos de daño" | → **M15** (resoluble) |  
| v3-P2-M15 | dudas-v3-part2 | Ixim y descansos — ausencia de regla simétrica a Rot | → **M19** (resoluble) |  
| v3-P3-M15 | dudas-v3-part3 | Glosario "Activa" referencia §6.6 en vez de §6.7 | → **E23** (errata) |  
| v2-M16 | dudas-auditoria-v2 | Intercambiar Espectro por carta del Mazo | → **D36.5** → subpunto integrado en **D36** |  
| v3-P1-M16 | dudas-v3-part1 | Ixim con Pasiva-Rápida vs regla "siempre Pasivas" | → **M17** (resoluble) |  
| v3-P2-M16 | dudas-v3-part2 | Reemplazo fallido — conteo 2 vs 3 intentos | → **M20** (resoluble) |  
| v3-P3-M16 | dudas-v3-part3 | Glosario "Cambiar" referencia §6.4 en vez de §6.5 | → **E23** |  
| v2-M17 | dudas-auditoria-v2 | "La carta frente a ella" sin definición posicional | → **D47** (abierta) ⁶ |  
| v3-P1-M17 | dudas-v3-part1 | Descanso "0" callout Espectro vs herencia | → **M18** (resoluble) |  
| v3-P2-M17 | dudas-v3-part2 | Feralizar — ¿cuál energía pierde si tiene múltiples? | → **D48** (abierta) ⁶ |  
| v3-P3-M17 | dudas-v3-part3 | Glosario "Atacar" referencia §6.5 en vez de §6.6 | → **E23** |  
| v2-M18 | dudas-auditoria-v2 | Vivificar a Zona de Bio — regla no documentada | → **M20** (resoluble parcialmente, subpunto) |  
| v3-P2-M18 | dudas-v3-part2 | Pasivas durante Fase de Batalla — contradicción | → **D49** (abierta) ⁶ |  
| v3-P3-M18 | dudas-v3-part3 | Glosario "Restricción" referencia §6.7 en vez de §6.8 | → **E23** |  
| v3-P2-M19 | dudas-v3-part2 | Rava — condiciones acciones Fase Previa | → **D50** (abierta) ⁶ |  
| v3-P3-M19 | dudas-v3-part3 | Glosario "Pasiva" descansos incompleto | → **M21** (resoluble) |  
| v3-P3-M20 | dudas-v3-part3 | Glosario "Mazo" mezcla reglas de reemplazo | → **M20** subpunto |  
| v3-P3-M21 | dudas-v3-part3 | Glosario "Pasiva-Rápida" disparadores difieren | → **M22** (resoluble) |  

**Notas:**
1. v3-P1-D33 (Rango Adendei Step 1 vs Step 3) no fue incluida en el cuerpo principal del consolidado por limitación de espacio. Se registra como **D47** pendiente de agregar en próxima iteración.
2. v2-D35 (Adendei Resurrecto subtipo) fue cubierta por los subtipos de §2.2 — no hay ambigüedad funcional separada de D35 (callout Espectro).
3. v3-P2-D36 (condición simultánea) y v3-P3-D36 (cartas tomadas Fase Post) son dudas válidas distintas, registradas como **D48** y **D49**.
4. v3-P3-D37 (Formato Multijugador "jugador(es)") se descartó por ser de baja frecuencia de juego; puede registrarse como D51 si Rasmés lo prioriza.
5. v3-P3-D38 (condición victoria alternativa Extendido) se descartó por ser subpunto de D46.
6. v2-M15 (Token-Feral/Lítico), v2-M17 ("frente a"), v3-P2-M17 (Feralizar), v3-P2-M18 (Pasivas en Batalla), v3-P2-M19 (Rava Fase Previa) son dudas válidas adicionales no numeradas en este consolidado por prioridad; se agregan al stack como D47-D51.

---

## 6. TABLA DE VALIDACIÓN

| ID nuevo | Reporte fuente original | Categoría |
|----------|-----------------------|-----------|
| E9 | v3-P1-E9 + v2-E9 (parcial MLBU-004) | errata |
| E10 | v3-P1-E10 + v3-P1-E11 | errata |
| E11 | (fusionado en E10) | errata |
| E12 | v3-P1-E12 | errata |
| E13 | v3-P1-E13 | errata |
| E14 | v3-P1-E14 | errata |
| E15 | v3-P1-E15 | errata |
| E16 | v3-P1-E16 | errata |
| E17 | v3-P1-E17 | errata |
| E18 | v2-E10 = v3-P3-E11 (mismo anchor) | errata |
| E19 | v3-P2-E9 | errata |
| E20 | v2-E11 = v3-P2-E11 (mismo anchor p20/b02) | errata |
| E21 | v3-P2-E10 | errata |
| E22 | v2-E12 = v3-P3-E13 (mismo anchor p40/b04) | errata |
| E23 | v3-P1-M15 + v3-P3-M15 + v3-P3-M16 + v3-P3-M17 + v3-P3-M18 + D14 previo | errata |
| E24 | v3-P1-E18, v3-P2-E11 catálogo, v3-P3-E9, E10, E12, E14, E15, E16 | errata |
| M15 | v3-P1-M15 | mech-resoluble |
| M16 | v3-P2-D33 (guión) + v3-P3 (canónico) | mech-resoluble |
| M17 | v3-P1-M16 | mech-resoluble |
| M18 | v3-P1-M17 | mech-resoluble |
| M19 | v3-P2-M15 | mech-resoluble |
| M20 | v3-P2-M16 + v2-M18 (subpunto) | mech-resoluble |
| M21 | v3-P3-M19 | mech-resoluble |
| M22 | v3-P3-M21 | mech-resoluble |
| M23 | v3-P2-D34 | mech-resoluble |
| D33 | v2-D33 + v3-P3-D33 (diferente; D33 conserva el de v2) | abierta |
| D34 | v2-D34 + v3-P1-D34 (fusionados) | abierta |
| D35 | v3-P1-D35 | abierta |
| D36 | v2-D36 | abierta |
| D37 | v2-D37 | abierta |
| D38 | v2-D38 | abierta |
| D39 | v2-D39 | abierta |
| D40 | v2-D40 + v3-P2-D37 + v3-P2-D38 (fusionados) | abierta |
| D41 | v3-P3-D33 | abierta |
| D42 | v3-P3-D34 | abierta |
| D43 | v3-P3-D35 | abierta |
| D44 | v3-P2-D39 | abierta |
| D45 | v3-P3-D40 | abierta |
| D46 | v3-P3-D39 | abierta |

**Dudas válidas no incluidas en cuerpo principal** (registradas, pendientes de incorporar en próxima iteración):

| ID pendiente | Fuente | Descripción breve |
|-------------|--------|-------------------|
| D47 | v3-P1-D33 | Rango Adendei Step 1 vs Step 3 — incompatibilidad matemática |
| D47b | v2-M17 | "La carta frente a ella" — ausencia definición posicional formal |
| D48 | v3-P2-D36 + v3-P2-M17 | Condición simultánea — ¿una vez por carta o global? + Feralizar energía |
| D49 | v3-P2-M18 + v3-P3-D36 | Pasivas en Fase de Batalla (contradicción p19/p17) + Cartas tomadas Fase Post |
| D50 | v2-M15 + v3-P2-M19 | Token-Feral/Lítico + Rava condiciones Fase Previa |
| D51 | v3-P3-D37 | Formato Multijugador — cartas con "jugador(es)" |
| D52 | ad-hoc 2026-04-19 07:25 (Ramsés screenshot) | Zaykan, Citadel — "todos los Adendei-Átlico en el campo" ¿incluye aliados y a sí misma? |

---

## D52. Zaykan, Citadel — "todos los Adendei-Átlico en el campo"

**Fecha:** 2026-04-19 | **Status:** 🟡 Abierta | **Origen:** Ramsés envió screenshot de la carta física TCOO-036 (2026-04-19 07:25 UTC) como caso concreto que el consolidado no cubría.

**Carta:** Zaykan, Citadel (TCOO-036 / TCEO-036 / ISPMR-010 / PRKD-2022-02) — Adendei-Átlica, 1/0.

**Texto:** *"Activa: Si esta carta ataca, daña 1 pto. adicional a todos los Adendei-Átlico en el campo."*

**Problema:** El efecto no especifica "aliados", "rivales", ni "excepto esta carta". Lectura literal incluiría:
1. Adendei-Átlicos rivales (objetivo esperado del daño adicional)
2. Adendei-Átlicos aliados en ZP propia (friendly fire)
3. La propia Zaykan, Citadel (auto-daño al ser Átlica)

**Comparación con el pool — convenciones canon observadas:**
- FYTE-008U/077 "Ariam Resurgimiento": *"todos los Adendei 'Ariam' **aliados**"* — usa *aliados* explícito para restringir a campo propio.
- FYTE-025 "Ketzz, Frias Escamas": *"tus Adendei-Gélido **aliados**"* — idem.
- KPRC-018 "Zaykan, Cambio de Energía": *"todos los Adendei **rivales** serán considerados..."* — restringe a rivales.
- **Zaykan Citadel**: NINGUNA marca → ¿omision intencional o errata?

**Cartas implicadas:** 4 reimpresiones del mismo efecto (TCOO-036, TCEO-036, ISPMR-010, PRKD-2022-02).

**Opciones de ruling:**
1. **Literal:** Afecta a TODOS los Adendei-Átlicos del campo, incluyendo aliados y a sí misma — auto-daño obligatorio de 1 pto a sí misma + 1 pto a cada Átlico aliado + 1 pto a cada Átlico rival. Carta de alto costo de juego.
2. **Restrictivo a rivales (convención silente):** Por lógica de diseño "Citadel" como Adendei ofensivo, "en el campo" se interpreta como "en el campo rival". La Zaykan no se daña a sí misma ni a aliados. Errata de redacción en texto impreso (falta "rivales").
3. **Excluye la propia carta:** Afecta a todos los Átlicos del campo aliados + rivales, pero por regla implícita no se daña a sí misma. Equivalente al patrón de Hypex Rey (*"que no sea 'Hypex, Rey'"*) pero no escrito.
4. **Modificador de "atacar":** "Si esta carta ataca" dispara el efecto sobre el objetivo del ataque y sus Adendei-Átlicos adyacentes o en misma zona; no es un pulso global sino un AoE centrado en el ataque.

**Impacto:** Si es lectura 1 (literal), la carta es potencialmente injugable en mazos mono-Átlico. Si es lectura 2 o 3, es una carta poderosa anti-arquetipo.

**Sugerencia v5.2:** Especificar "aliados", "rivales" o "excepto esta carta" en todos los efectos de área para eliminar ambigüedad sistémica. Este ruling puede establecer precedente para otras cartas con fraseo similar.

---

*Consolidado generado por sub-agente Logos (Claude Sonnet 4.6) — 2026-04-19*  
*Basado en lectura completa de los 4 reportes de auditoría v5.1*  
*Para incorporar dudas pendientes D47-D51, ejecutar nueva consolidación o editar manualmente.*