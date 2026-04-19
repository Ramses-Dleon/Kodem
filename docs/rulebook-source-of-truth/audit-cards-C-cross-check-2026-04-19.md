# Audit C — Cross-check rulebook ↔ cards.json ↔ rulings v5.1

**Fecha:** 2026-04-19 ~18:10 UTC
**Sub-agente:** Logos (Opus 4.7) — enfoque cross-check (el "detective de inconsistencias triples")
**Corpus:** `cards.json` (1,074 cartas) · `master-rulebook-v5.1.md` (40 pgs) · `rulings-v5.1.md` + `rulings-v5.1-addendum-faq-oficial.md`
**Alcance exclusivo:** inconsistencias donde al menos DOS de las tres fuentes (rulebook / cards.json / rulings) discrepan. NO duplica el trabajo de los sub-agentes A (effect_text) ni B (cost_text).

---

## Resumen ejecutivo

| Categoría | Hallazgos | Severidad máx |
|---|---|---|
| 1. Cartas que contradicen rulings cerrados | **4 casos** | 🟠 Medio |
| 2. Contradicciones rulebook ↔ rulings | **3 casos** | 🟡 Leve (ajuste editorial) |
| 3. Mecánicas nuevas sin documentación | **4 términos** (fuera de lo ya reportado T3) | 🟠 Medio |
| 4. Erratas masivas por energía/subtipo | **9 grafías coexistentes** | 🔴 Alto (editorial) |
| 5. Divergencias engine↔rulebook↔cards | **2 casos estructurales** | 🟠 Medio |
| 6. Bugs estructurales cards.json | **3 patrones** | 🟠 Medio |

**Top-3 acciones prioritarias:**
1. **Consolidar grafías de energía** en v5.2 (actualmente hay 3 grafías de "Pírico" y hasta 3 de "Átlico" en el texto de cartas).
2. **Corregir 14 cartas con `effect_text == cost_text`** (duplicación patológica — restricciones mal colocadas).
3. **Actualizar texto de Yanzi Precisión** en todas las variantes para reflejar errata oficial reconocida en FAQ-04.

---

## 1. Cartas que contradicen rulings cerrados

| # | Folio(s) | Carta | Ruling violado / tensionado | Severidad | Evidencia textual |
|---|---|---|---|---|---|
| 1 | IDRMP-008, LGRO-067, RMR-011, TRWA-067 | Yanzi, Precisión | **FAQ-04** (errata oficial) — "los 6 puntos pertenecen al ataque mismo, se pierden si el ataque es negado" | 🟠 Media | Texto actual: *"Activa: El Adendei vinculado... podrá atacar con 6 puntos a un Adendei rival en tu siguiente turno."* — **sí** está redactado en la forma "atacar con 6 puntos" (no "+6 daño adicional"), por lo que el texto canónico YA refleja la errata correctamente. ✅ No-issue de redacción. El TODO editorial sugerido por FAQ-04 se puede cerrar. |
| 2 | LGRO-011R, LGRO-029, TRWA-011R, TRWA-029 | Zotz, Absorción de Energía | **D16** (copia = snapshot único) + clausula "una vez en el juego" | 🟡 Leve | *"Pasiva: Esta carta puede copiar la Activa y el Costo de una carta en Extinción, una vez en el juego."* → La cláusula "una vez en el juego" es consistente con D16 (snapshot), pero el rulebook no documenta que copiar capture *también* el costo junto con la Activa. D16 extendido dice "copia de stats/efecto/costo = snapshot". **No hay contradicción**, pero sí hay un gap explicativo: el rulebook debería clarificar que "copiar Activa" por default arrastra el costo ligado. |
| 3 | DOOC-003S, DOOC-011 | Therz, Manifestación Fantasmal | **D16 extendido** — "copia = snapshot único **al momento de activación**" | 🟠 Media | *"Activa: Muestra las primeras 3 cartas del Mazo rival, **copia la Activa y costo de 1 de esas cartas mientras esta carta esté en el campo**. Esas cartas no podrán usar sus efectos al ser mostradas y regresarán al fondo del Mazo rival."* → La frase "mientras esta carta esté en el campo" sugiere **copia con duración** (no snapshot atómico). Esto **contradice** la extensión de D16 ("desligado de la fuente una vez copiado"). **¿Therz es excepción explícita o es una redacción que debe ser refinada en rulings?** Candidato a ruling adicional. |
| 4 | FYTE-078, KPRC-086 | Mixtla, Regreso | **D38** (tope de descansos para Espectros) + **M22** (prioridad pasivas) | 🟡 Leve | *"Si esta carta es vivificada, puedes usar 1 Activa-Rápida adicional en turno rival durante el resto del juego. (Costo) No podrás usar Activas-Rápidas en tu turno durante el resto del juego."* → El costo reduce capacidad de juego por todo el partido. Requiere ruling explícito: ¿se niega el costo si Mixtla es eliminada? (T3 ya lo menciona como "efectos de duración persistente" no documentados). Cross-check: no contradice ruling cerrado, **solicita** uno nuevo. |

**Nota:** ningún Espectro (21 cartas revisadas) incluye texto que contradiga **D34** (Espectros muertos → Extinción, no Fuera del Juego). El engine ya está alineado tras el fix 4 (06cff7f). ✅

---

## 2. Contradicciones rulebook ↔ rulings

| # | §Rulebook | Ruling | Discrepancia | Severidad |
|---|---|---|---|---|
| 1 | §4.X / p20/b07 (no-zona "Fuera del Juego") | **D5/D18** formalizan "Zona Fuera del Juego" como **zona operativa** con reglas de inspección y targetabilidad | El rulebook v5.1 sólo usa "fuera del juego" en p20/b07 para describir cartas retiradas al agotar el Mazo (zona pasiva). Los rulings D5/D18 la elevan a zona estructural con semántica. **Cartas afectadas:** TCEO-006U, TCEO-081, TCOO-006U, TCOO-081 (4 variantes de Quam, Detrás de la Materia) asumen la semántica D5/D18, pero el rulebook NO la formaliza. | 🟠 Media — el engine ya implementó la zona (fix 6, 52bfa78) pero el rulebook sigue en versión anterior. Para v5.2: agregar §4.5 o §9 "Zona Fuera del Juego". |
| 2 | §9 Glosario — "Desviar" (p40) | **Cartas implícitas (25+ cartas):** usan "desviar" con variaciones (desviar daño, desviar ataque, desviar efecto) | El glosario define "Desviar" genéricamente pero no distingue entre: (a) desviar ataque **completo** (Amatista, Dragel, Rhymir — 10+ cartas), (b) desviar **daño** parcial (Zoadon — 3 variantes), (c) desviar **efecto** (Escudos I.C.A.R.O.). Los 3 usos tienen reglas de orden distintas pero el rulebook los agrupa como un solo verbo. | 🟡 Leve — requiere sub-entradas en v5.2. |
| 3 | §3.7 Espectros (ausente del rulebook) | **D20, D21, D22, D33, D34, D38, D39** establecen semántica completa de Espectros | El rulebook v5.1 tiene §3.1-§3.6 (Adendei, Ixim, Rot, Bio, Protector, Rava) pero **no hay §3.7 para Espectros**. Los 21 Espectros de FYTE se rigen por 6+ rulings. | 🔴 Alto — gap documental mayor. |

---

## 3. Mecánicas nuevas sin documentación

Foco en términos **NO cubiertos** por T3 ni dudas-pendientes.

| # | Término | Cartas afectadas | ¿Ya en dudas-pendientes? | Notas |
|---|---|---|---|---|
| 1 | "**Consejo de Hielo**" como carta referenciada por nombre | TCEO-001/TCEO-001R/TCOO-001/TCOO-001R (4 Morx, Descarga Átlica) referencian "Consejo de Hielo"; LGRO-007, LGRO-010R, TRWA-007, TRWA-010R son las cartas **"Consejo de Hielo"** en sí | ❌ **T2 lo reportó como término huérfano, pero era falso positivo** — "Consejo" es parte del **nombre propio** de una carta existente | 🟢 **Corrección a T2:** Consejo NO es una mecánica sin documentar. Recomiendo quitarlo de la lista de "🚩 términos ausentes del rulebook" en T2. |
| 2 | "**es considerado Adendei-X**" (re-tipado dinámico) | LGRO-007/LGRO-010R/TRWA-007/TRWA-010R (Consejo de Hielo: *"Los Adendei aliados son considerados Adendei-Átlico"*) | ❌ No | **Mecánica de re-etiquetado energético** — el rulebook no define si "considerado" es snapshot o dinámico, ni cómo interactúa con Pasivas energéticas (ej. Hori "Aumenta 1 pto. a los Adendei-Pírico"). ¿Morx con "Consejo de Hielo" activo + Hori en campo tiene +1 ataque? Ruling necesario. |
| 3 | "**en Fin de Turno**" / "**al declarar ataque**" (ventanas temporales no glosadas) | TCEO-013/TCOO-013 (Xelbalan: *"reciben 1 descanso adicional **al declarar ataque**"*), varias cartas con *"en Fin de Turno"* | ❌ No | M13 define "Fase de Batalla" pero no distingue entre "al declarar ataque" (inicio), "si esta carta ataca" (resolución) y "en Fin de Turno" (tras ataque). 3 subventanas temporales implícitas que el engine sí maneja pero el rulebook no formaliza. |
| 4 | "**no puede ser copiada**" (anti-copia) | 16 cartas incluyen *"Esta Activa no puede ser copiada"* (FYTE-011S, CMFT-002, etc.) | ❌ No | El rulebook v5.1 **no define** "no puede ser copiada" como estado/marca. Por extensión de D16 (copia=snapshot), una Activa "no copiable" debería resistir efectos tipo Zotz/Retis Mimesis. **Pero:** ¿una Activa no-copiable puede ser **heredada** vía Espectro (Ruk, Ojos de Nirge)? Herencia ≠ copia? Falta ruling. |

**Términos confirmados ya reportados en T3/dudas-pendientes** (no re-reportados aquí):
- "Fuera del Juego" (T3 #1)
- "Cyra gasta" (T3 #2)
- "durante el resto del juego" (T3 #3)
- "Intercambiar" (T3 #4)
- "Feliz Navidad / choque de puños" (T3 #5)
- "Consejo" como mecánica abstracta (T2) — ❌ **reclasificar como falso positivo** (ver #1 arriba).

---

## 4. Erratas masivas por energía/subtipo

Mapa consolidado de normalización. Las grafías en `cards.json` aparecen mezcladas. **Canónico por ruling D26 (2026-04-19):** Átlico con **una sola tilde en la Á**.

### 4.1 Grafías coexistentes en effect_text + cost_text

| Grafía | Ocurrencias | ¿Canónico? | Acción v5.2 |
|---|---|---|---|
| **Pírico** | 28 | ✅ (probablemente) | Mantener |
| Pirico | 17 | ❌ (sin tilde) | Normalizar → Pírico |
| **Piricco** | 3 | ❌ **TYPO** | Corregir → Pírico (EXPO-0006, IDRMP-001, KPRC-022 — Hori, Huella de Magma) |
| **Átlico** | 17 | ✅ (por D26) | Mantener |
| Atlico | 26 | ❌ (sin tildes) | Normalizar → Átlico |
| **Átlíco** (doble tilde) | 16 | ❌ **ERRATA D26** | Corregir → Átlico (EXPO-0004, IDRMA-001, KPRC-023, TKD-2022-008 — Nozi, Corona Marina) |
| **Gélido** | 31 | ✅ | Mantener |
| Gelido | 12 | ❌ | Normalizar → Gélido |
| **Cháaktico** | 6 | ✅ (grafía usada en rulings Rhymir) | Mantener |
| Chaáktico | 0 en texto cartas | — | — |
| Chaaktico | 30 | ❌ | Normalizar → Cháaktico |
| **Lítico** | 20 | ✅ | Mantener |
| Litico | 5 | ❌ | Normalizar → Lítico |
| **Húumico** | 20 | ✅ | Mantener |
| Huumico | 4 | ❌ | Normalizar → Húumico |
| **Demótico** | 0 en texto (solo subtype) | — | — |
| **Feral** | 26 | ✅ (sin tilde, correcto) | Mantener |
| Catrín (texto) | 11 | ✅ | Mantener |
| Catrin (sin tilde, en texto) | 10 | ❌ | Normalizar → Catrín |
| Kósmico / Kosmico (en texto) | 0 / 0 | — | Sólo aparece en subtype (coherente) |
| Guardián / Guardian (en texto) | 0 / 0 | — | Sólo aparece en subtype (coherente) |

### 4.2 Grafías coexistentes en **nombres de personaje**

Hallazgo: patrón sistemático — los sets **RMR** y **SRMR** usan tildes; **IDRM/ISPMR/RAMI/PKMR/KPRC/TCEO/TCOO** NO. Las mismas personas aparecen en ambos con grafías divergentes. Editorial debe decidir política uniforme.

| Personaje (normalizado) | Grafías detectadas | Folios con tilde | Folios sin tilde |
|---|---|---|---|
| Adasi / Adasí | 2 | RMR-007 | IDRMA-008, PASE-006 |
| Boras / Bóras | 2 | SRMR-004 | IDRMG-017, ISPMR-016, PRKD-2022-08, RAMI-001 |
| La Cúspide / La Cuspide | 2 | RMR-018 | IDRMP-010, ISPMR-003, KPRC-111, PKMR-003 |
| Nanuk / Nánuk | 2 | SRMR-001 (nombre); LGRO-039, TRWA-039 (texto) | FYTE-015R, FYTE-052 (nombre); IDRMG-016, PASE-003 (nombre) |
| Ariam, Modo Catrin/Catrín | 2 | RMR-005, SRMR-002 | IDRMP-002, RAMI-009, TDMR-KDM |
| Boras/Bóras, Poder Kósmico/Kosmico | 2 | SRMR-004 | resto |
| Ceiba, Raices/Raíces Cósmicas/Cosmicas | 2 | RMR-014 | IDRMP-007, KPRC-108 |
| Cordyceps, Invasion/Invasión | 2 | RMR-004 | IDRMA-012 |
| Enis, Revelacion/Revelación | 2 | RMR-001 | IDRMG-003 |
| Jokokan, Guardian/Guardián de la Corteza | 2 | RMR-002 | IDRMP-004, ISPMR-004, PKMR-004, RAMI-008 |
| Karus, Aguijon/Aguijón Letal | 2 | RMR-013 | IDRMA-009, RAMI-003 |
| Naywa, Poder Morfeico/Morféico | 2 | RMR-009 | IDRMP-015, PASE-002, PKMR-009 |
| Nok, Frio/Frío Magno | 2 | SRMR-007 | 009/066, EXPO-0005, IDRMG-001, KPRC-021, PromoSigned-001 |
| Yanzi, Precision/Precisión | 2 | RMR-011 | IDRMP-008, LGRO-067, TRWA-067 |
| Xakros / Xacros | **MISMO personaje** (ver §5 debajo) | IDRMP-022, RAMI-007, RMR-017 (Xakros) | FYTE-060, FYTE-061, FYTE-062 (Xacros) |

### 4.3 Referencias cruzadas rotas

| Folio origen | Referencia textual a | Realidad en cards.json | Tipo |
|---|---|---|---|
| KPRC-027 (Cementerio de Dinosaurios) | "Rasvel, Congelado" (sin signos) | Existe como **"Rasvel, ¡Congelado!"** (con signos) | 🟡 Errata de formato — referencia no coincidirá por string-match exacto |
| FYTE-061 (Yimsah y Xacros, Inanición) | "Xakros" (con K) | Personaje llamado en ese folio es "Xacros" (con C) | 🟠 Errata — el mismo folio mezcla grafías |
| IDRMA-023 + IDRMG-023 (Lore) | El Adendei "Ermitaño" | No existe carta "Ermitaño" stand-alone; existe "Zaykan, Ermitaño" | 🟢 Lore-only, sin impacto mecánico |
| LGRO-039, TRWA-039 (Conquista Feroz) | "Nánuk" (con tilde) | 2 variantes `Nanuk` sin tilde vs 1 variante `Nánuk` con tilde | 🟡 Inconsistente grafía |
| EXPO-0009 (Ariam, Alianza) | "Zaren" | Existe ✅ | — |

---

## 5. Divergencias engine↔rulebook↔cards

(Casos donde las 3 fuentes no coinciden — los más peligrosos.)

### 5.1 "Fuera del Juego" como zona operativa

| Fuente | Estado |
|---|---|
| **Cards.json** | Sólo Quam (TCEO-006U, TCEO-081, TCOO-006U, TCOO-081) la referencia, con semántica de zona operativa con latencia persistente ("aún si esta carta ya no está en el campo") |
| **Rulebook v5.1** | 🚩 **No formalizada** como zona operativa. p20/b07 usa el término pero solo para retirada al agotar el Mazo (zona pasiva) |
| **Rulings** | D5, D18 la elevan a zona estructural (inspección, targetabilidad) |
| **Engine** | ✅ Implementada tras fix 6 (52bfa78) |

**Divergencia:** engine ✅, rulings ✅, rulebook ❌, cards ⚠️ (solo 1 personaje la usa).
**Impacto:** si el rulebook no se actualiza, nuevos Espectros/Ravas de sets futuros podrían asumir semánticas distintas.
**Recomendación:** agregar §4.5 "Zona Fuera del Juego" en v5.2 con texto canónico de D5+D18.

### 5.2 Copia = snapshot único (D16 extendido)

| Fuente | Estado |
|---|---|
| **Cards.json** | Therz, Manifestación Fantasmal (DOOC-003S/DOOC-011) dice *"copia... **mientras esta carta esté en el campo**"* — sugiere **copia dinámica** (no snapshot) |
| **Rulebook v5.1** | Define "copia" genéricamente en §9; no distingue snapshot vs dinámica |
| **Rulings** | D16 extendido: **todas las copias son snapshot único** salvo declaración explícita de "copia dinámica" |
| **Engine** | Trataría Therz como dinámica por la frase "mientras esta carta esté en el campo"; no queda claro que exista test de regresión |

**Divergencia:** cards lee ≈ dinámica, rulings dice snapshot por default. Therz quedaría como **excepción implícita no declarada**.
**Recomendación:** agregar ruling "D16.2 — Excepciones a snapshot por redacción explícita" o re-redactar Therz en v5.2 para alinear con el default.

---

## 6. Bugs estructurales en cards.json (no cubiertos por A ni B directamente)

### 6.1 Duplicación `effect_text == cost_text` (14 cartas)

Son cartas con **restricciones** (no efectos positivos) donde el campo `effect_text` y `cost_text` contienen el **mismo texto**. Estructuralmente, una restricción va en `cost_text` y `effect_text` debería estar vacío o tener el efecto real (si lo hay).

| Folio | Carta | Texto duplicado |
|---|---|---|
| KPRC-055 | Hypex, Guía Jurásico | "Esta carta no puede escalar, ser curada ni protegida." |
| RMR-002 | Jokokan, Guardián de la Corteza | "Después de atacar, esta carta desciende 1 pto. y es dañada 1 pto." |
| RMR-005, SRMR-002 | Ariam, Modo Catrín | "Antes de atacar, daña 1 pto. a los Adendei aliados." |
| TCEO-001U, TCEO-002, TCOO-001U, TCOO-002 | Hypex, Guía Jurásico | "Esta carta no puede escalar, ser curada ni protegida." |
| TCEO-003U, TCEO-040, TCOO-003U, TCOO-040 | Nepthis, Entre las Sombras | "Esta carta siempre estará abismada." |
| TCEO-041, TCOO-041 | Kaykac, Explosión Marina | "Esta carta solo puede atacar si los Adendei aliados son Adendei Abisales o Adendei-Átlicos." |

**Impacto:** cualquier loader que concatene `effect_text + cost_text` las cuenta dos veces. El engine podría dispararlas duplicadas. **Requiere test de regresión en engine.**

### 6.2 Yakerr, Hogar — typo + duplicación parcial (3 cartas)

ISPMR-020, LGRO-065, TRWA-065: el **cost_text** contiene `"Debe pasar 1 turno antes de atacar con esta carta."` (sin "s" en "Debes" — typo). Algunas variantes tienen `effect_text` + `cost_text` casi idénticos ("Debes.../Debe..."). Sugerencia: limpiar.

### 6.3 Espectros con `effect_type='Ninguno'` pero `effect_text` con requisito

Los 21 Espectros FYTE tienen `effect_type='Ninguno'` pero el `effect_text` contiene el **requisito de posesión** (*"Requisito: N o más Adendei 'X' en tu Extinción"*). Semánticamente, esto no es un "efecto" sino una **precondición**. Estructuralmente inconsistente.

**Impacto:** un parser ingenuo ignora completamente el requisito al filtrar por `effect_type != 'Ninguno'`. **El engine ya lo maneja** (vía el parser de Espectros), pero el esquema cards.json sigue siendo semánticamente frágil.

**Recomendación v5.2 schema:** agregar campo dedicado `requirement_text` para Espectros (y separar del campo `effect_text`).

---

## 7. Tabla consolidada: hallazgos únicos de Audit C (no cubiertos por T1/T2/T3)

| # | Hallazgo | Tipo | Prioridad |
|---|---|---|---|
| C-01 | **"Consejo"** es falso positivo en T2 — es nombre propio de carta "Consejo de Hielo" | ✏️ Corrección editorial | Baja |
| C-02 | **"es considerado Adendei-X"** — mecánica de re-tipado energético sin documentar | 🟡 Nuevo ruling | Media |
| C-03 | **"no puede ser copiada"** — no definida en rulebook como estado/marca | 🟡 Nuevo ruling | Media |
| C-04 | **"al declarar ataque"** — ventana temporal no glosada (vs "si esta carta ataca" / "en Fin de Turno") | 🟡 Nuevo ruling | Media |
| C-05 | **14 cartas con `effect_text == cost_text`** — duplicación patológica en cards.json | 🟠 Bug estructural | **Alta** |
| C-06 | **Xakros/Xacros** — misma persona con grafía K vs C; mismo folio FYTE-061 los mezcla | 🟠 Errata | **Alta** |
| C-07 | **Yakerr, Hogar** — typo "Debe/Debes" + duplicación effect/cost | 🟠 Errata | Media |
| C-08 | **§3.7 Espectros ausente del rulebook** a pesar de 6+ rulings que definen la familia | 🔴 Gap documental | **Alta** |
| C-09 | **Therz, Manifestación Fantasmal** — "copia mientras esté en campo" contradice D16 snapshot | 🟡 Ruling clarificador | Media |
| C-10 | **Mapa completo de 9 grafías coexistentes** para normalización v5.2 (§4.1) | 🔴 Editorial masivo | **Alta** |
| C-11 | **Espectros con effect_type='Ninguno' + effect_text='Requisito:...'** — schema semánticamente frágil | 🟠 Schema cards.json | Media |
| C-12 | **25+ cartas usan "desviar"** pero el glosario no distingue desviar-ataque vs desviar-daño vs desviar-efecto | 🟡 Clarificación glosario | Baja |

---

## 8. Sugerencias priorizadas — Top 10 acciones recomendadas

En orden de impacto / urgencia:

1. **[v5.2 editorial] Normalizar las 9 grafías de energía** — limpieza de ~200 ocurrencias en `effect_text + cost_text` usando el mapa de §4.1. Especialmente crítico: `Piricco` (3), `Átlíco` (16), `Xakros` (3 vs Xacros 3). Puede automatizarse con sed/python.
2. **[v5.2 rulebook] Agregar §3.7 Espectros** — 6+ rulings ya definen la familia; se debe consolidar en capítulo propio del rulebook.
3. **[v5.2 rulebook] Agregar §4.5 Zona Fuera del Juego** con texto canónico de D5/D18 — el engine ya la implementa pero el rulebook la esconde.
4. **[cards.json fix] Corregir las 14 cartas con `effect_text == cost_text`** — mover texto a `cost_text` y dejar `effect_text` vacío (o con el efecto separado real). Test de regresión en engine.
5. **[cards.json fix] Corregir "Xakros" → "Xacros" (o viceversa) en FYTE-061** para unificar referencias cruzadas con la carta base FYTE-060 "Xacros, Hambre".
6. **[rulings nuevos] Abrir 3 rulings cross-check:**
   - "es considerado Adendei-X" (Consejo de Hielo + Hori stacking)
   - "no puede ser copiada" vs herencia-por-posesión (Espectros)
   - "al declarar ataque" como ventana temporal distinta a "si ataca" / "en Fin de Turno"
7. **[v5.2 editorial] Aclarar DOOC-003S/011 (Therz Manif. Fantasmal)** — o re-redactar para alinear con D16 snapshot, o crear excepción explícita en rulings.
8. **[cards.json schema] Agregar campo `requirement_text`** para Espectros — separar requisitos de posesión del campo `effect_text`.
9. **[corrección editorial T2]** Quitar "Consejo" de la lista de términos ausentes del rulebook en T2 — es falso positivo (es parte del nombre propio de "Consejo de Hielo").
10. **[v5.2 glosario] Sub-entradas en "Desviar"** — distinguir (a) desviar ataque completo, (b) desviar daño parcial, (c) desviar efecto — 25+ cartas usan variantes.

---

## Metodología & limitaciones

- Análisis por regex sobre `effect_text + cost_text` de las 1,074 cartas.
- Cross-check programático contra 27 rulings (rulings-v5.1.md) + 8 FAQ (addendum).
- Sin modificaciones a ningún archivo: solo lectura.
- **No-foco:** prefijos `Activa:/Pasiva:` faltantes (cubierto por A), costos mal estructurados (cubierto por B).
- **Tiempo de auditoría:** ~15 min en contexto Opus 4.7, 2026-04-19 UTC.

---

**Entregable:** este reporte. Para cerrar las acciones #1 (normalización grafías) y #4 (duplicación) se pueden spawnar 2 PRs separados en v5.2.
