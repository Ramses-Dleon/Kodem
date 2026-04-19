# Auditoría v3 — PARTE 1: Páginas 1-15
**Scope:** `master-rulebook-v5.1.md` páginas 1-15 (aprox. líneas 1-3310)
**Generado:** 2026-04-19 — Subagente `kodem-audit-v3-part1-pages-1-15`
**Numeración continua:** D33+, M15+, E9+

---

## Resumen ejecutivo

Se auditaron las páginas 1-15 del rulebook v5.1 cruzando contra `rulings-v5.1.md` (D1-D28, M1-M14, E7-E8) y el portal de dudas (D21, D22, D29-D32, M3, M5). Se encontraron **3 ambigüedades jugables**, **3 mecánicas sin definición/inconsistentes**, y **10 erratas editoriales** (4 con impacto normativo, 6 ortográficas/de concordancia).

---

## AMBIGÜEDADES JUGABLES

---

## D33. Rango de Adendei: Step 1 vs Step 3 en Preparación del Ecosistema

**Categoría:** inconsistencia  
**Anchor:** p15/b05 — `·15-24 Adendei` (Step 1) vs p15/b07 — `Selecciona 15-21 Adendei, 0-2 Rava y 0 o más Espectros: Este será tu Mazo Principal` (Step 3)  
**Problema:** Los rangos son matemáticamente incompatibles. Step 2 pide colocar 3 Adendei en Zona Principal. Si un jugador elige el mínimo de 15 Adendei en Step 1 y 3 van a ZP (Step 2), quedan 12 para el Mazo, violando el mínimo de 15 que exige Step 3. La reconciliación requiere que "15-24" en Step 1 se refiera solo a cartas del Mazo (sin contar las 3 de ZP), pero eso no está escrito así, y elevaría el total real a 18-27 Adendei.

Además: Step 1 no menciona Espectros en absoluto, pero Step 3 sí los incluye en el Mazo Principal.

**Cartas implicadas:** Toda construcción de mazo.  
**Opciones de ruling:**  
1) Step 1 "15-24 Adendei" = total incluyendo los 3 de ZP → mínimo real para Mazo = 12 (Step 3 debe corregirse a 12-21)  
2) Step 1 "15-24 Adendei" = solo los del Mazo, los 3 de ZP son adicionales → total real = 18-27 Adendei (Step 1 debe corregirse a 18-27 o redactarse "15-21 para Mazo + 3 para ZP")  
3) Intención del diseño: el mínimo funcional es 18 Adendei (15 mazo + 3 ZP), y los rangos actuales son erratas; corregir en v5.2 con nota explícita separando los 3 de ZP del Mazo Principal

---

## D34. Espectros omitidos de la Condición de Victoria

**Categoría:** ambig  
**Anchor:** p15/b12 — `Todas las cartas en Extinción cuentan: Adendei, Rava, Bio, Rot, Ixim y Protectores a excepción de los Token.`  
**Problema:** Los Espectros no aparecen en el listado de cartas que cuentan para la Condición de Victoria (10 cartas en Extinción del rival). El listado es exhaustivo (incluye incluso Ixim/Rot que son equipos) y explicita la excepción de los Token. La ausencia de Espectros es ambigua: ¿excluidos intencionalmente (como los Token) o errata de omisión?

El impacto es significativo: cuando un Espectro muere, tanto el Espectro como la carta Poseída van a Extinción (p14/b03 + p14/b19). Si el Espectro no cuenta, solo la carta Poseída suma al marcador de victoria. Si ambos cuentan, la muerte de un Espectro vale potencialmente 2 puntos de victoria.

**Cartas implicadas:** Todos los Espectros del set FYTE (21 cartas en pool).  
**Opciones de ruling:**  
1) Intencional — Espectros no cuentan (como Tokens, son "formas especiales" temporales); solo la carta Poseída (un Adendei) cuenta al ir a Extinción  
2) Errata — Espectros sí deben contar; agregar "Espectros" a la lista en v5.2  
3) Doble conteo intencional — Espectro Y carta Poseída cuentan por separado al ir a Extinción (ventaja/penalización por usar Espectros)

---

## D35. Callout vs Regla: efecto propio del Espectro vs. el de la carta poseída

**Categoría:** inconsistencia  
**Anchor:** p14/b05 — `Efecto y Costo: Se añadirá de forma obligatoria el de la carta poseída por el Espectro.` (callout anatómico) vs p14/b16 bullet 4 — `El Espectro deberá usar su propio Efecto, así como el Efecto, Daño, Descanso, Costo y Energía de la carta Poseída como si fueran suyos.`  
**Problema:** El callout anatómico (b05) implica que el Efecto y Costo del Espectro son los de la carta poseída (como si el Espectro no tuviera efecto propio). La regla completa (b16) dice que el Espectro usa *su propio efecto* más los atributos (Efecto, Daño, Descanso, Costo, Energía) de la carta poseída.

Estas son lecturas divergentes para un jugador leyendo el callout sin leer la regla completa. El pool actual confirma que varios Espectros tienen efectos propios (Flora Espectral — Pasiva de equipo, Trote Espectral — descanso adicional al atacar, Ruk — copia Pasiva de Rava). El callout es pedagógicamente engañoso para estos casos.

**Cartas implicadas:** Flora Espectral (FYTE-010S/054), Trote Espectral (FYTE-015S/068), Espectrosaurios (FYTE-021R/073), Ruk, Espectro Draconiano (FYTE-048/ST1).  
**Opciones de ruling:**  
1) El callout es un simplificación pedagógica para la carta ejemplo (Nánuk, que no tiene efecto propio) — regla b16 es autoridad. Sugerencia v5.2: reescribir callout b05: "Efecto y Costo: el Espectro usa su propio efecto (si lo tiene) más el Efecto, Daño, Descanso, Costo y Energía de la carta Poseída."  
2) El callout es canónico: Espectros sin efecto propio impreso usan solo los de la carta poseída; los que tienen efecto propio (Flora, Trote, Ruk) lo conservan además — b16 es la regla general, el callout es el caso base  
3) Ruling explícito: el callout aplica a Espectros sin efecto propio; los Espectros con efecto propio (como Ruk) usan ambos — documentar explícitamente en §3.7

---

## MECÁNICAS SIN DEFINICIÓN FORMAL / INCONSISTENTES

---

## M15. Referencia cruzada incorrecta: "Ver 6.3 Tipos de daño" (p07/b11)

**Categoría:** errata  
**Anchor:** p07/b11 — `Daño: Indicado en su estadística, el daño puede variar por efectos que modifiquen la estadística de daño como escalar o descender (Ver 6.3 Tipos de daño).`  
**Problema:** El TOC (p03) establece que §6.3 = Protección y §6.4 = Tipos de Daño. La referencia "Ver 6.3 Tipos de daño" apunta a la sección incorrecta. Este es el mismo patrón de renumeración parcial identificado en D14 (referencias obsoletas en p16), pero ubicado en p07 y no detectado en la auditoría anterior.

Este es el **5.º cross-reference incorrecto detectado** relacionado con la renumeración v5.0→v5.1:

| Ubicación | Dice (incorrecto) | Debe decir |
|---|---|---|
| p16/b06b | Ver 6.6.2 Pasivas | Ver 6.7.2 Pasivas |
| p16/b09 | Ver 6.5. Ataque | Ver 6.6. Ataque |
| p16/b10 | Ver 6.6.3 Costos | Ver 6.7.3 Costos |
| p16/b11 | Ver 6.6.1 Activas | Ver 6.7.1 Activas |
| **p07/b11** | **Ver 6.3 Tipos de daño** | **Ver 6.4 Tipos de daño** |

**Cartas implicadas:** N/A (referencia estructural).  
**Opciones de ruling:**  
1) Errata — corregir a "Ver 6.4 Tipos de daño" en v5.2 (única opción correcta)

---

## M16. "Ixim siempre tendrán Pasivas" vs. Pasiva-Rápida en el pool

**Categoría:** inconsistencia  
**Anchor:** p10/b05 — `Efecto: Los Ixim siempre tendrán Pasivas y los Rot siempre tendrán Activas.`  
**Problema:** El pool actual (`cards.json` v5.1, 1074 cartas) contiene **3 Ixim con Pasiva-Rápida**:
- Copal Blanco, Resina Depuradora (FYTE-008)
- Planta Carnívora (RAMI-008S)
- Planta Carnívora (RAMI-023)

La regla dice "Pasivas" sin mencionar "Pasiva-Rápida" como variante permitida. Una lectura estricta excluiría Pasiva-Rápida de los Ixim. Una lectura flexible lo incluiría (Pasiva-Rápida es un subtipo de Pasiva).

**Impacto:** Un jugador podría cuestionar si Copal Blanco o Planta Carnívora tienen un tipo de efecto "inválido" para Ixim. En la práctica no tiene consecuencias de juego porque el efecto funciona igual, pero la definición formal es incompleta.

**Cartas implicadas:** Copal Blanco, Resina Depuradora (FYTE-008), Planta Carnívora (RAMI-008S, RAMI-023).  
**Opciones de ruling:**  
1) "Pasiva" en la regla incluye implícitamente "Pasiva-Rápida" (subtipo) — corregir en v5.2 a "Los Ixim siempre tendrán Pasivas (incluyendo Pasiva-Rápida)"  
2) La regla es incompleta; "Pasiva" excluye "Pasiva-Rápida" — las 3 cartas son erratas en el pool  
3) Ruling meta: "Pasiva" en reglas de tipo de carta = cualquier efecto cuya palabra clave inicie con "Pasiva" (Pasiva, Pasiva-Rápida) — documentar en §3.4

---

## M17. "Descanso: 0" en callout de Espectro vs. herencia de descanso al poseer

**Categoría:** ambig  
**Anchor:** p14/b10 — callout anatómico `Descanso: 0` (apunta a la carta Nánuk ejemplo) vs p14/b16 bullet 4 — `El Espectro deberá usar su propio Efecto, así como el Efecto, Daño, Descanso, Costo y Energía de la carta Poseída como si fueran suyos.`  
**Problema:** El callout anatómico establece "Descanso: 0" como el stat impreso del Espectro. Sin embargo, la regla ordena que el Espectro use el Descanso de la carta Poseída. Esto significa que un Espectro poseyendo a un Adendei con 2 descansos operaría con 2 descansos, no con 0.

El callout es correcto para el estado base (Espectro sin carta poseída), pero la presentación como stat estático "Descanso: 0" puede llevar a jugadores a creer que los Espectros siempre descansan 0 incluso al atacar con carta poseída.

Todos los Espectros del pool tienen `rests: 0` en cards.json, lo que refleja solo el valor base impreso, no el comportamiento en juego.

**Cartas implicadas:** Todos los Espectros (21 cartas).  
**Opciones de ruling:**  
1) Callout correcto = estado base (sin posesión): el Espectro tiene 0 descansos propios. En posesión usa el descanso de la carta poseída → agregar nota al callout en v5.2: "Descanso: 0 (sin posesión) / Descanso: el de la carta Poseída (con posesión)"  
2) El Espectro siempre descansa 0 y la regla b16 sobre "Descanso" no aplica al descanso-stat sino a otra interpretación  
3) El "0" del callout es errata; debería decir "? (depende de carta poseída)" como lo hace el callout de Daño (b09)

---

## ERRATAS EDITORIALES

---

## E9. "expasión" — typo recurrente en dos páginas

**Categoría:** errata  
**Anchors:**  
- p05/b09 — `Folio: Te ayuda a saber el número de carta dentro de la expasión.`  
- p14/b06 — `Folio: Te ayuda a saber el número de carta dentro de la expasión.`  
**Problema:** La palabra "expansión" aparece como "expasión" (sin la 'n' de la primera sílaba) en ambas páginas, en el mismo callout de Folio. El texto es idéntico en ambas páginas, lo que sugiere que el callout fue copiado con el typo ya presente.  
**Cartas implicadas:** N/A.  
**Opciones de ruling:** Corregir "expasión" → "expansión" en ambas páginas para v5.2.

---

## E10. "Fases del de Turno" — 'de' redundante

**Categoría:** errata  
**Anchor:** p07/b15 — `Nota: Para saber más sobre el uso de efectos de los Adendei te recomendamos que leas las selecciones 5. Fases del de Turno y 6. Interacciones y Efectos.`  
**Problema:** La frase "Fases del de Turno" contiene un "de" redundante. El texto correcto sería "Fases del Turno". Typo confirmado verbatim en el spot-check humano (pass 3).  
**Opciones de ruling:** Corregir a "Fases del Turno" en v5.2.

---

## E11. "selecciones" en lugar de "secciones"

**Categoría:** errata  
**Anchor:** p07/b15 — `...te recomendamos que leas las selecciones 5. Fases del de Turno...`  
**Problema:** La palabra "selecciones" es un typo de "secciones". El texto correcto es "te recomendamos que leas las secciones 5 y 6."  
**Opciones de ruling:** Corregir a "secciones" en v5.2.

---

## E12. "Las carta poseída" — falta la 's' en "cartas"

**Categoría:** errata  
**Anchor:** p14/b18 — `Las carta poseída se colocará debajo del Espectro en Zona Principal.`  
**Problema:** Falta la 's' en "carta" (debería ser "Las cartas poseídas"). Typo confirmado verbatim.  
**Opciones de ruling:** Corregir a "La carta poseída se colocará..." (singular, si aplica) o "Las cartas poseídas se colocarán..." (plural) en v5.2.

---

## E13. "pueden disparan" — verbo mal conjugado

**Categoría:** errata  
**Anchor:** p14/b19 — `...por lo tanto, pueden disparan los efectos normales que requieran que Adendei, Ixim, Rot, etc. sean enviados a Extinción.`  
**Problema:** "pueden disparan" es gramaticalmente incorrecto. La forma correcta es "pueden disparar" (infinitivo). Typo confirmado verbatim.  
**Opciones de ruling:** Corregir a "pueden disparar" en v5.2.

---

## E14. "Algunos efectos de sólo afectan" — 'de' extraneous

**Categoría:** errata  
**Anchor:** p06/b03 — `Algunos efectos de sólo afectan a un tipo específico de carta (Ej. "Activa: Daña a 1 Adendei disponible."), mientras que otros pueden afectar a cualquier tipo de carta.`  
**Problema:** La palabra "de" es extraneous después de "efectos". El texto correcto sería "Algunos efectos sólo afectan..." Typo confirmado en el spot-check (pass 3 detectó anomalías en p06).  
**Opciones de ruling:** Eliminar la "de" extraneous en v5.2.

---

## E15. Portada dice "Versión 5.0" — discrepancia con v5.1

**Categoría:** errata  
**Anchor:** p01/b03 — `Versión 5.0`  
**Problema:** La portada del rulebook indica "Versión 5.0" aunque todo el documento es v5.1 (confirmado por el PDF SHA256, metodología de extracción y todas las referencias internas al documento).  
**Opciones de ruling:** Actualizar portada a "Versión 5.1" en v5.2.

---

## E16. "añadiendoles" — tilde faltante

**Categoría:** errata  
**Anchor:** p06/b12 — `Controla el aire frío y el hielo. Aunque sus ataques son bajos, tiene un poderoso efecto que limita los movimientos rivales, añadiendoles descansos.`  
**Problema:** "añadiendoles" debe llevar tilde en la é: "añadiéndoles".  
**Opciones de ruling:** Corregir en v5.2.

---

## E17. "efectos estratégico" — concordancia rota

**Categoría:** errata  
**Anchor:** p06/b16 — `Reposiciona tus cartas para potenciar sus efectos estratégico.`  
**Problema:** "estratégico" (singular) no concuerda con "efectos" (plural). La forma correcta es "efectos estratégicos".  
**Opciones de ruling:** Corregir a "estratégicos" en v5.2.

---

## E18. "ataques alta y medianamente fuertes" — concordancia rota

**Categoría:** errata  
**Anchor:** p06/b11 — `Es potencia y agresión puras, brindándote ataques alta y medianamente fuertes junto a marcas de quemadura...`  
**Problema:** "alta" debe ser "altamente" para concordar con el adverbio "medianamente". La forma correcta es "ataques altamente y medianamente fuertes" o preferiblemente "ataques de potencia media-alta".  
**Opciones de ruling:** Corregir a "altamente" o reformular en v5.2.

---

## Resumen por categoría

| Categoría | IDs | Cantidad |
|---|---|---|
| **Ambigüedad jugable** | D33, D34, D35 | 3 |
| **Mecánica inconsistente/no definida** | M15, M16, M17 | 3 |
| **Errata con impacto normativo** | E9, E10, E11, E12, E13, E14, E15 | 7 |
| **Errata ortográfica/concordancia** | E16, E17, E18 | 3 |
| **TOTAL** | | **16** |

## Prioridad de resolución

| Prioridad | ID | Motivo |
|---|---|---|
| 🔴 ALTA | D33 | Afecta construcción de mazos; jugadores no saben cuántos Adendei necesitan |
| 🔴 ALTA | D34 | Afecta condición de victoria; ¿los Espectros cuentan o no? |
| 🟠 MEDIA-ALTA | D35 | Confunde el comportamiento de efectos propios del Espectro |
| 🟠 MEDIA | M15 | Cross-reference lleva a sección incorrecta; hallazgo nuevo (no estaba en D14) |
| 🟡 MEDIA | M16 | Ixim con Pasiva-Rápida son técnicamente "ilegales" según la regla textual |
| 🟡 MEDIA | M17 | Puede causar que jugadores no apliquen el descanso correcto a Espectros |
| 🟢 BAJA | E9-E18 | Erratas editoriales; no afectan jugabilidad pero sí claridad |

---

*Auditoría realizada sobre páginas 1-15 únicamente (aprox. líneas 1-3310 del master-rulebook-v5.1.md). Para páginas 16-28 ver Part 2; para páginas 29-40 ver Part 3.*
