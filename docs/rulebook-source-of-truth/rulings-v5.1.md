# Rulings oficiales — Master Rulebook v5.1

Resoluciones de dudas sobre ambigüedades e inconsistencias detectadas durante la revisión completa del master-rulebook v5.1.

Fuente: Ramsés D'León (autor/mantenedor), Telegram "Logos: Kodem" (chat `-1003700827993`).

---

## D1. Energías: ¿7 u 8?

**Fecha:** 2026-04-19
**Status:** ✅ RESUELTO

**Ruling:** Feral es la **ausencia de energía**, pero en la práctica se toma como otra energía más.

**Implicancias:**
- Energías primordiales reales: **7** (Átlica, Pírica, Gélida, Lítica, Cháaktica, Húumica, Demótica).
- **Feral**: no-energía que funcionalmente cuenta como energía para interacciones mecánicas (Feralizar, restricciones tipo "cartas con energía X", etc.).
- Los textos que dicen "7 energías" (p07/b08, p09/b01) son semánticamente correctos.
- El listado de 8 en p06 mezcla categorías: 7 energías primordiales + 1 estado-Feral.

**Sugerencia para v5.2:** aclarar en p06 con nota explicativa:
> "Feral no es una energía primordial pero se comporta como tal en las mecánicas del juego. Existen 7 energías y 1 estado-Feral."

---

## D3. ¿Rava puede ser atacado?

**Fecha:** 2026-04-19
**Status:** ✅ RESUELTO

**Ruling:** Sí. Un Rava se despliega en Zona Principal y puede ser atacado como cualquier otra carta de esa zona.

**Implicancias:**
- Rava ocupa 1 espacio en Zona Principal (de los 3 espacios totales).
- Rava tiene 6 pts de vida máxima, puede recibir daño, descansos, marcas y ser objetivo de ataques/efectos.
- Al llegar a 0 pts va a Extinción como cualquier otra carta.

**Sugerencia para v5.2:** agregar línea explícita en §3.2 Rava:
> "Los Ravas ocupan un espacio en Zona Principal y pueden ser objetivo de ataques y efectos como cualquier carta de esa zona."

---
## D5. "Cartas fuera del juego" (p20/b07)

**Fecha:** 2026-04-19
**Status:** ✅ RESUELTO

**Ruling:** "Fuera de juego" es una **zona real** del juego, distinta de Zona Principal, Extinción, Mazo, Equipo y Bio. Las cartas ahí están literalmente removidas de la partida en curso.

**Implicancias:**
- Es una **zona adicional no listada en §4** del rulebook v5.1 — ausencia documental.
- Cartas llegan a Fuera de Juego por efectos específicos (ej. "saca del juego").
- No se consideran en Extinción, Mazo, ni ninguna otra zona declarada.
- Cuando el Mazo Principal se vacía (p20/b07), todas las cartas en Fuera de Juego (excepto Tokens, que no cuentan) regresan al fondo del Mazo Principal.

**Sugerencia crítica para v5.2:**
Agregar **Zona Fuera de Juego** explícitamente en:
1. §4 Preparación del Ecosistema (listado de zonas)
2. Glosario (§9)
3. Diagrama del Ecosistema (si corresponde visualmente)

Definición sugerida:
> "**Zona Fuera de Juego:** Las cartas enviadas a esta zona quedan inaccesibles durante la partida en curso. Son cartas removidas por efectos específicos que mencionan "fuera del juego". No se consideran en Extinción, Mazo ni ninguna otra zona. Cuando el Mazo Principal se vacía, todas las cartas aquí regresan al fondo del Mazo Principal (excepto Tokens)."

**Carta ejemplo:** **Quam, Detrás de la Materia** (TCOO-006U) — Rava / Demótica
- Pasiva: Revela 1 carta de tu Mazo y colócala fuera del juego. Si tu Protector está disponible, puedes regresar 1 Adendei en tu Zona Principal al fondo de tu Mazo y colocar la carta fuera del juego en su lugar con 6 ptos. de vida (aún si esta carta ya no está en el campo).
- Costo: Tu Protector recibe 3 descansos y regresa esta carta al fondo del Mazo para usar su Pasiva.
- **Patrón mecánico:** Quam demuestra flujo bidireccional — entrar a Fuera de Juego (revelar) y salir de Fuera de Juego (intercambio con ZP mediando Protector disponible).
- **Excepción notable:** El efecto persiste "aún si esta carta ya no está en el campo", anulando el principio general de p25/b06.

**Detalles complementarios (ruling 2026-04-19):**

- **Visibilidad:** Las cartas en Fuera del Juego son **información pública** — ambos jugadores pueden verlas.
- **Actividad:** Las cartas en Fuera del Juego **no "juegan"** — no se pueden revelar ni ejecutar ningún tipo de efecto desde esta zona hasta que regresen al juego.
- **Pool actual (hasta última expansión):** la única carta que interactúa con Fuera del Juego es **Quam, Detrás de la Materia** (TCOO-006U). Sirve como vector de entrada (pasiva 1ra parte) y de salida (pasiva 2da parte, intercambio con ZP vía Protector disponible).
- **Implicancia estratégica:** Quam es actualmente única en el pool oficial por su relación con esta zona.

---
## D6. Descansos máximos por estadística

**Fecha:** 2026-04-19
**Status:** ✅ RESUELTO

**Ruling:** Los descansos tienen **topes duros por tipo de carta**, no acumulables ni por efecto.

**Topes por zona/tipo:**
- **Zona Principal** (Adendei, Rava, Token): máximo **2 descansos** totales
- **Protector**: máximo **3 descansos** totales

**Aplicación parcial:** Si un efecto daría descansos que excedan el tope, se aplica **solo hasta el tope**.

**Ejemplos:**
- Adendei con 1 descanso + efecto "+2 descansos" → solo se suma 1 (total: 2). El descanso restante del efecto se pierde.
- Protector con 2 descansos + efecto "+2 descansos" → solo se suma 1 (total: 3).
- Adendei con 2 descansos + efecto "+1 descanso" → no aplica nada (ya está en tope).

**Lectura de p27/b09 clarificada:** "mientras estén en 1 descanso máximo" significa **"puede recibir descansos por efecto mientras su descanso actual sea ≤1, llegando como máximo a 2"**. No hay overflow ni bonus.

---
## D7. Cartas Limitadas: ámbito de aplicación

**Fecha:** 2026-04-19
**Status:** ✅ RESUELTO

**Ruling:** La lista de Cartas Limitadas (Zotz 0 copias, Tekei 1 copia) en p36-p37/p40 **solo aplica a Formato Multijugador (3+ jugadores) y Formato Extendido**. No aplica al Formato Estándar.

**Formato Estándar — regla universal:**
- **1 copia por carta**, donde "carta" = **exactamente el mismo nombre completo** (ej. "Ariam, Carga Pírica").
- Se pueden tener múltiples cartas que compartan el nombre de personaje mientras difieran en el nombre de carta completo. Ejemplo válido: incluir "Ariam, Balance" + "Ariam, Escudo de Cempasúchil" + "Ariam, Carga Pírica" en el mismo mazo.
- Base: p14/b11 ya define "nombre de personaje" ≠ "nombre de carta".

**Zotz "0 copias":** baneada del Formato Multijugador/Extendido. En Estándar ya es 1 copia por default como cualquier otra.

**Sugerencia para v5.2:** encabezado explícito en la tabla de Cartas Limitadas:
> "**CARTAS LIMITADAS** — aplica únicamente a Formato Multijugador y Formato Extendido. En Formato Estándar aplica la regla universal de 1 copia por carta."

---
## D10. Pasar Turno: quién y cuándo

**Fecha:** 2026-04-19
**Status:** ✅ RESUELTO

**Ruling:**

- **Cuándo se puede pasar turno:** solo al **inicio del turno** (durante la Fase Previa).
- **Quién puede pasar turno:** solo el **jugador activo** en su propio turno. El rival nunca puede forzar/pasar turno desde fuera de su turno; cuando le toque su turno él será el jugador activo y entonces sí podrá elegir pasar.
- **Qué omite:** todas las fases intermedias (Batalla, Post, Equipo), saltando directo a Fin de Turno.
- **Excepción:** los efectos/costos/condiciones que mencionen "pasar turno" sí se declaran antes de saltar.

**Carta ejemplo canónico:** **Yakerr, Hogar** (LGRO-065) — Adendei / Cháaktica, daño 6, descanso 1.
- Costo: "Debes pasar 1 turno antes de atacar con esta carta."
- Interpretación: en el turno T el jugador declara "paso turno" → cumple el costo de Yakerr → en el turno T+1 puede declarar ataque con Yakerr.
- Diseño de **tempo trade**: 1 turno de inactividad a cambio de 6 daño con solo 1 descanso (perfil atípicamente alto).

**Implicancia para diagrama p19:** el nodo "PASAR TURNO" como flujo horizontal paralelo es semánticamente correcto. Recomendación: agregar nota al nodo: *"Solo jugador activo, solo al inicio de turno."*

**Observación de diseño:** "pasar turno" es una resource-mechanic distintiva — el costo es **tempo** (unidad de turno), no cartas/vida/descansos. Mecánica potencialmente única en el pool actual de Kodem.

---
## D8. Targeting de cartas ocultas en ataque

**Fecha:** 2026-04-19
**Status:** ✅ RESUELTO

**Ruling:**

- El jugador **puede elegir** cualquier carta en la Zona Principal del rival como objetivo de ataque, incluyendo cartas **ocultas** (boca abajo).
- **Excepción:** equipos (Ixim/Rot) técnicamente no están en ZP sino adheridos a la carta equipada → no son targets directos de ataque.
- La **única condición que fuerza aleatoriedad** en la elección del objetivo es que el Adendei atacante tenga la marca **Abismar** (en cuyo caso se lanza dado).

**Implicancias tácticas:**
- Ocultar cartas **no es escudo de invisibilidad** — el rival puede targetear por posición.
- El beneficio real de ocultar es:
  1. Información asimétrica (rival no conoce stats/efecto).
  2. Proteger efectos/pasivas hasta revelación.
  3. Evitar restricciones de tipo específico (ej. "Solo puede atacar Adendei-Feral"), dado que las cartas ocultas no se consideran un tipo específico (p31/b06).

---
## D2. Subfase "Resolución" en Fase de Batalla

**Fecha:** 2026-04-19
**Status:** ✅ RESUELTO

**Ruling:** La Fase de Batalla tiene exactamente **3 subfases**, no 4. Los 4 pasos del "Orden de Resolución" listados en p17/b01 son **contenido interno de la subfase "Respuesta Rival"**, no una cuarta subfase independiente.

**Estructura correcta:**

1. **Subfase 1: Declaración** — se declara ataque/Activa hacia carta rival.
2. **Subfase 2: Pago de costos** — costos requeridos + daño por quemadura.
3. **Subfase 3: Respuesta Rival** — el rival puede revelar cartas y usar Activas-Rápidas. Dentro de esta subfase se ejecuta el **Orden de Resolución** (4 pasos):
   1. Activas-Rápidas del jugador en turno.
   2. Activas-Rápidas del jugador rival.
   3. Daños por ataque.
   4. Activas del jugador en turno.

**Causa de la confusión en v5.1:** En p17 el "Orden de resolución" aparece tipográficamente al mismo nivel que los encabezados de subfase (Declaración, Pago de costos, Respuesta Rival), lo que sugiere incorrectamente que es una subfase paralela.

**Sugerencia crítica para v5.2:** reestructurar p17/b01 con jerarquía visual clara, anidando el Orden de Resolución explícitamente dentro de Respuesta Rival:

> **Subfase 3: Respuesta Rival**
>
> El rival puede revelar cartas y usar Activas-Rápidas.
>
> _Orden de Resolución (dentro de esta subfase):_
> 1. Activas-Rápidas (jugador en turno).
> 2. Activas-Rápidas (rival).
> 3. Daños por ataque.
> 4. Activas (jugador en turno).

Esto también debe reflejarse en el Diagrama de Estructura de Turno (§5.2) para que no muestre "Resolución" como nodo independiente.

---
## D9. Vida máxima de Tokens

**Fecha:** 2026-04-19
**Status:** ✅ RESUELTO

**Ruling:** La **vida máxima de un Token siempre es 6 pts**, independientemente de la carta invocadora. No existen cartas en el pool actual que alteren este valor.

**Estadísticas que sí pueden variar en un Token según la carta invocadora:**
- Daño
- Descansos
- Energía
- Activa
- Costo

**Implicación mecánica:** un Token puede curarse hasta 6 pts máximos siempre, sin importar con cuánto daño o cuántos descansos haya sido invocado.

**Cartas ejemplo:**

1. **Gloku, Trituración** (TCDE-015) — Adendei Titán / Lítica, 1/1.
   - Pasiva-Rápida: *"Si esta carta es enviada a Extinción, puedes colocar un Token-Lítico en tu Zona Principal con el mismo daño, descanso, Activa y costo que un Adendei rival en el campo."*
   - No menciona vida → default 6.

2. **Dagg, Abismo Feral** (TCDE-008) — Adendei Titán / Feral, 2/0.
   - Pasiva-Rápida: *"Si un Adendei es enviado a Extinción, antes de colocar la carta suplente, puedes colocar un Token-Feral en su lugar con alguna de las siguientes estadísticas: – 4 daños y 2 descansos. – 2 daños y 0 descansos."*
   - Menú de opciones para stats de daño/descanso, pero nunca vida → confirma default 6.

**Sugerencia para v5.2:** agregar línea explícita en §3.3 Token:
> "La vida máxima de un Token siempre es 6 pts, independientemente de la carta invocadora. Otras estadísticas (daño, descansos, energía, Activa, costo) pueden variar según la carta que lo invoque."

**Duda derivada pendiente (no v5.1 directo):** Gloku copia stats de un Adendei rival "en el campo". Si ese Adendei luego cambia stats (escalar/descender/feralizar) o deja el campo, ¿el Token se actualiza dinámicamente o queda congelado en el momento de invocación? Ruling de carta pendiente.

---
## D4. Protector suplente: herencia de descansos

**Fecha:** 2026-04-19
**Status:** ✅ RESUELTO

**Ruling:** Al entrar el Protector suplente, **siempre hereda los descansos** del Protector anterior. Aplica en ambos escenarios de reemplazo:

- **Sin Extinción** (cambio por efecto, p08/b08 bullet 4): el suplente conserva vida + descansos del anterior.
- **Con Extinción** (el anterior murió, p08/b08 bullet 5 y p20/b05): el suplente entra con 12 pts de vida nuevos, pero conserva los descansos del anterior.

**Nunca** se reinician a 0 los descansos cuando ocurre el cambio de Protector.

**Implicancia:** la "línea de Protectores" es una unidad estratégica única — los descansos son un recurso persistente compartido entre el Protector principal y su suplente, no dos tracks independientes.

**Sugerencia para v5.2:** unificar la redacción de p08/b08 y p20/b05 bajo un solo principio:
> "Cuando el Protector es reemplazado por su suplente (sea por Extinción o por cambio), el suplente siempre entra con los mismos descansos que tenía el anterior. La vida del suplente es 12 pts si el anterior fue a Extinción, o conserva la vida del anterior si fue cambiado sin Extinción."

---
## D11. Espectros: límite recomendado

**Fecha:** 2026-04-19
**Status:** ✅ RESUELTO

**Ruling:** La recomendación de "máximo 4" en p14/b21 se refiere a **4 cartas Espectro específicamente**, dentro del total de 24 cartas Adendei + Espectros en el Mazo Principal.

**Sugerencia v5.2:** reescribir p14/b21 para eliminar ambigüedad:
> "Se podrán incluir cualquier número de cartas Espectro en el Mazo, respetando un máximo de 24 cartas Adendei y Espectros en el Mazo Principal, aunque se recomienda llevar máximo **4 Espectros** dentro de ese total."

---

## D12. Numeración de Restricciones (p30-p33)

**Fecha:** 2026-04-19
**Status:** ✅ RESUELTO

**Ruling:** Las listas en p30-p33 son **dos listas conceptualmente separadas**, no una lista continua mal numerada:

1. **Generalidades de las Restricciones e Interacciones** (p30-p31): puntos 1-17.
2. **Tipos de Restricciones** (p31-p33): puntos 1-8. La numeración reinicia intencionalmente porque es una nueva lista temática.

**Sugerencia v5.2:** agregar separación visual más clara (encabezado H2 con más aire, regla horizontal, cambio tipográfico) entre ambas secciones para evitar que el lector las perciba como continuas.

---
## D13. Glosario: "Ver Sección 5.2" es intencional

**Fecha:** 2026-04-19
**Status:** ✅ RESUELTO

**Ruling:** Las dos referencias del Glosario (p39) a "(Ver Sección 5.2.)" son **intencionales y correctas**, no errores.

**Casos:**
- "Resolver el ataque" → (Ver Sección 5.2.)
- "Resolver un efecto" → (Ver Sección 5.2.)

**Justificación:** aunque §5.2 (Diagrama de Estructura de Turno, p19) no contiene definiciones textuales, al ser un diagrama de flujo comunica visualmente **el momento temporal** en que estas acciones se ejecutan dentro del turno. La definición textual de los términos existe en §6.6 (Ataque, p24) y §6.7 (Efectos, p25).

**Sugerencia opcional para v5.2:** cambiar a referencia cruzada múltiple para lectores que prefieran la ruta textual primero:
> "(Ver §5.2 para ubicación temporal en el flujo, y §6.6/§6.7 para definición textual)"

No bloqueante; la referencia actual es correcta y el flowchart es autoridad temporal legítima.

---

## TODO derivado: render del diagrama p19

**Fecha:** 2026-04-19
**Status:** 📌 pendiente de decisión sobre formato (A/B/C)

Ramsés solicitó renderizar la reconstrucción del diagrama p19 (`p19-extraction-v3-final.json`, 52 nodos, 58 edges, pass 5 FINAL-ULTRA) para validarla contra el PDF original. Opciones ofrecidas:

- **A:** Mermaid flowchart interactivo (HTML) — editable, zoom/pan.
- **B:** PNG estático alta resolución — side-by-side rápido con PDF.
- **C:** Documento visual-html completo con diagrama + leyenda + 6 secciones por fase + tabla de correcciones + deploy Vercel.

---
## D14. Numeración de subsecciones §6.X

**Fecha:** 2026-04-19
**Status:** ✅ RESUELTO

**Ruling:** La numeración oficial de v5.1 es la establecida en el TOC (p03). Las referencias cruzadas en p16 que usan numeración distinta son **typos**, residuo de una renumeración parcial entre v5.0 y v5.1.

**Numeración oficial (TOC p03):**
- §6.1 Marcas
- §6.2 Cambios de Estadística
- §6.3 Protección
- §6.4 Tipos de Daño
- §6.5 Cambios entre Zonas
- §6.6 Ataque
- §6.7 Efectos
- §6.7.1 Activas
- §6.7.2 Pasivas
- §6.7.3 Costos
- §6.8 Restricciones e Interacciones

**Referencias cruzadas obsoletas detectadas en p16 (todas a corregir en v5.2):**

| Ubicación | Dice (v5.1, incorrecto) | Debe decir (v5.2) | Contexto |
|---|---|---|---|
| p16/b06b | "Ver Pasivas-Rápidas en **6.6.2 Pasivas**" | **6.7.2 Pasivas** | Fase Previa, nota sobre rival |
| p16/b09  | "declara ataque (Ver **6.5. Ataque**)" | **6.6. Ataque** | Subfase Declaración |
| p16/b10  | "(Ver **6.6.3 Costos**)" | **6.7.3 Costos** | Subfase Pago de costos |
| p16/b11  | "Ver **6.6.1 Activas**" | **6.7.1 Activas** | Subfase Respuesta Rival |

**Patrón detectado:** en la numeración antigua, §6.5 era Ataque y §6.6 era Efectos. En v5.1 se renumeró a §6.6 Ataque y §6.7 Efectos, pero las 4 referencias cruzadas de p16 quedaron sin actualizar.

---
## D17. Efectos que persisten post-Extinción

**Fecha:** 2026-04-19
**Status:** ✅ RESUELTO

**Ruling (principio meta):** El efecto o costo de una carta **supercede las reglas generales del rulebook cuando lo declara explícitamente**. Esta regla ya está establecida en p20/b10 del rulebook:

> "Se aplicarán en todo momento los lineamientos de este documento a menos que el texto de una carta indique explícitamente lo contrario."

**Aplicación a Quam, Detrás de la Materia (TCOO-006U):** la cláusula *"aún si esta carta ya no está en el campo"* es una excepción legal al principio general de p25/b06 (*"Si una carta deja el campo y su efecto está condicionado a 'estar disponible', el efecto no continuará en uso"*), porque Quam lo declara explícitamente.

**Implicancia:** este patrón es extensible a cualquier carta actual o futura que incluya cláusulas similares ("aún si", "aunque", "a pesar de", etc.) para anular reglas generales. El equipo de diseño puede usarlo como recurso de diseño documentado.

---

## D18. Inspección de la Zona Fuera del Juego

**Fecha:** 2026-04-19
**Status:** ✅ RESUELTO

**Ruling:** La Zona Fuera del Juego es **inspeccionable en cualquier momento por ambos jugadores**. Es información pública, equivalente a Extinción en términos de visibilidad.

**Implicación práctica:** un jugador puede solicitar en cualquier momento de la partida revisar qué cartas están acumuladas en Fuera del Juego (rival o propias).

---

## D19. ¿Existen cartas que fuerzan "pasar turno"?

**Fecha:** 2026-04-19
**Status:** ✅ RESUELTO (con reserva: área de diseño emergente)

**Ruling:** Actualmente **no existe una carta que fuerce explícitamente al rival a "pasar turno"** como efecto declarado. Sin embargo:

- En la **práctica** sí ocurre de facto: si todos los Adendei y el Protector del jugador activo están en descanso al inicio del turno, ese jugador no puede declarar ataque ni Activa de una carta disponible; de facto sólo actualiza descansos.
- El **rival puede inducir este estado** con efectos que dan descansos masivos (ejemplo: Xakros, Peste — "Todos los Adendei en el campo reciben descansos iguales a los indicados en su respectiva carta").
- Es un **caso emergente del sistema**, no una mecánica declarada explícitamente.
- **Diseño futuro:** cartas en próximas expansiones que digan "el rival debe pasar turno" serían válidas bajo el principio meta establecido en D17 (efecto de carta supercede reglas generales).

**Sugerencia v5.2:** enriquecer la definición de "Pasar Turno" en el glosario:
> "**Pasar Turno:** acción voluntaria del jugador activo al inicio de su turno para saltar directamente a Fin de Turno. También puede ocurrir *de facto* cuando el jugador no tiene cartas disponibles para declarar ataque o Activa. Efectos futuros podrían hacerlo obligatorio por texto de carta."

---
## D16. Gloku (TCDE-015) — copia de stats: snapshot o dinámica

**Fecha:** 2026-04-19
**Status:** ✅ RESUELTO

**Ruling:** La copia al momento de invocación es **snapshot único** de estadística + efecto + costo. Una vez copiado, el Token queda desligado de la carta fuente y sólo cambia si un efecto NUEVO lo afecta directamente a él.

**Implicancias prácticas:**
- Gloku 1/1 al momento de invocar → Token nace 1/1.
- Si Gloku recibe +1/+1 después → Token NO hereda.
- Si Token recibe efecto directo → solo Token cambia.
- Si la carta-fuente deja el campo (Extinción) → Token permanece con stats congelados.

**Aplicación extendida:** el mismo principio de "copia = snapshot único" aplica a TODOS los efectos de copia en el juego (Espectros como Ruk que copian Pasiva de Rava, etc.), a menos que una carta declare explícitamente "copia dinámica" o "se actualiza mientras esté en campo".

**Sugerencia v5.2:** el efecto de Gloku (y cualquier carta con mecánica de copia) podría clarificar:
> *"con los mismos Puntos de Ataque y Puntos de Vida que [CARTA] **al momento de invocarlo** (la copia es única, no hereda cambios posteriores)"*

O agregar al glosario:
> **Copia (mecánica):** todas las copias de estadísticas, efecto o costo en Kodem son *snapshots únicos* tomados al momento de la invocación/activación. Cambios posteriores en la carta fuente NO se propagan al Token/Espectro salvo que una carta indique explícitamente lo contrario.

---

## D20. Espectros — vida máxima, posesión y requisitos

**Fecha:** 2026-04-19
**Status:** ✅ RESUELTO (+ D21 cerrada, D22 refinada)

**Ruling:**
1. **Vida máxima:** cada carta Espectro declara su vida en la propia carta (no hay regla general, es caso por caso).
2. **Posesión:** los Espectros poseen Adendei disponibles en Extinción que cumplen el requisito del propio Espectro (no son Nanuk-específicos).

**Hallazgos de cards.json (set FYTE — 28 cartas Espectro):**

- Los Espectros declaran un **requisito explícito** de N cartas con nombre específico en Extinción:
  - `Ariam, Axoloespectro` (FYTE-003K) → 2+ Ariam en Extinción
  - `Zaykan, Lagarto Fantasma` (FYTE-005U) → 3+ Zaykan
  - `Aki, Brinco Espectral` (FYTE-013R) → 1+ Aki
  - `Yakerr, Aullido Espectral` (FYTE-014R) → 3+ Yakerr
  - `Nanuk, Garras Heladas` (FYTE-015R) → 2+ Nanuk
  - `Ruk, Espectro Draconiano` (FYTE-048) → 1+ **Rava** (no Adendei) + copia Pasiva/costo
  - `Espectrosaurios` (FYTE-021R) → sin requisito explícito (caso ambiguo)

- `Tlahuelpuchi, Invocación Espectral` (FYTE-007R, Protector) tiene efecto que bloquea a Espectros: *"Los Espectros aliados no envían cartas a Extinción para poseer hasta que este Protector..."* → implica que **poseer envía la carta a Extinción**.

**Dudas derivadas:**
- **D21:** Al poseer, el Adendei de Extinción ¿se consume? → **✅ RESUELTA (ver D21 abajo)**
- **D22:** ¿El Espectro hereda alguna stat del Adendei poseído? → **✅ REFINADA (ver D22 abajo)**

**Sugerencia v5.2:** agregar sección formal §3.7 Espectros con:
- Declaración de que vida se lee de cada carta
- Mecánica de posesión como VIVIFICACIÓN (ver D21)
- Adendei poseído se coloca BAJO el Espectro en Zona Principal
- Al llegar a 0 de vida, ambos a Extinción
- Intercambio instantáneo como operación atómica
- Que la mecánica de copia de Ruk sigue D16 (snapshot único)

---

## D21. Posesión de Espectros = Vivificación atómica

**Fecha:** 2026-04-19
**Status:** ✅ RESUELTO (Ramses)

**Ruling oficial:**

> **Todo efecto que saca, regresa o intercambia una carta desde Extincion al campo es VIVIFICAR** — aunque no use la palabra literalmente. El texto debe indicar expresamente que "saca/regresa/intercambia" para que cuente como vivificación.

> **Al poseer, el Espectro está VIVIFICANDO al Adendei.** Se coloca el Adendei poseído en Zona Principal y el Espectro encima de él (bajo el Espectro).

> **Cuando la vida del Espectro llega a 0**, se rompe la unión de posesión y **ambas cartas (Espectro + Adendei poseído) se envían a Extinción**.

> **Posesión normal con sacrificio** (enviar un Adendei a Extinción para poseer a otro): es un **intercambio instantáneo atómico**. La carta que sale de Extinción y la que entra se mueven en **una misma acción, no secuencialmente**. El conteo de cartas en Extinción permanece igual.

**Ejemplos de efectos que ahora se consideran Vivificar (implicaciones retroactivas):**
- "Regresa 1 carta de tu Extinción al campo" → vivificar
- "Intercambia 1 Adendei en ZP con 1 en Extinción" → vivificar (la carta que entra)
- "Saca 1 Equipo de Extinción" → vivificar equipo
- "Intercambiar" (mecánica de Ariam Resurrección, Mizthe Arconte, Therz Guardián) → vivificar la carta que entra al campo

**Conexiones con otras dudas:**
- **M2 "Intercambiar"** (audit-T3): ya no es mecánica huérfana. Es una forma de vivificación atómica.
- **D5 "Fuera del Juego"**: Quam (TCOO-006U) es distinto del intercambio de posesión; la carta "fuera del juego" NO es vivificable.
- **Tlahuelpuchi (FYTE-007R/023)** *"Los Espectros aliados no envían cartas a Extincion para poseer"*: coherente — bloquea el **sacrificio** como componente del intercambio, dejando la posesión dependiente solo de Adendei ya en Extinción.

**Implicaciones v5.2:**
- Añadir entrada formal al glosario §9: **Vivificar** — expandir definición para incluir "sacar, regresar, intercambiar una carta de Extinción al campo"
- Definir **Intercambio Instantáneo** como operación atómica
- Sección §3.7 Espectros documentar el stack visual (Espectro encima del Adendei) y el co-envio a Extinción al morir
- Regla meta propagable: todos los textos tipo "Regresa / Saca / Intercambia desde Extinción" disparan efectos que respondan a "si es vivificada"

---

## D22. Herencia de stats del Adendei poseído — ✅ REFINADA por D21

**Fecha:** 2026-04-19
**Status:** ✅ CLARIFICADA (no hay herencia)

**Ruling derivado de D21:**

Dado que el Adendei poseído se coloca **BAJO** el Espectro (stack físico), **NO hay herencia de stats**. Las dos cartas coexisten en el mismo slot de Zona Principal pero mantienen sus propias estadísticas:

- **El Espectro usa su propia vida** (declarada en la carta Espectro) — no la del Adendei.
- **El Espectro usa su propio Daño/Descansos** — no los del Adendei.
- **El Adendei sirve como "ancla" física** para: (1) cumplir el requisito de posesión, (2) ser co-enviado a Extinción cuando el Espectro muere.

**Pregunta abierta menor:** cuando el Espectro muere, ¿el Adendei poseído llega a Extinción con vida plena (6 pts) o mantiene el estado que tenía antes de ser poseído? Asumiendo coherencia con "el intercambio de posesión es atómico", el Adendei se mueve al campo al ser poseído y luego a Extinción al morir el Espectro, así que **no interactúa con daño mientras está poseído** — queda inerte bajo el Espectro.

**Implicación v5.2:** clarificar en §3.7 que las cartas bajo un Espectro están en estado INACTIVO (no reciben daño, no atacan, no contribuyen efectos) hasta que el Espectro es eliminado.

---

## D23. Ariam, Dualidad (BETA-001) — pieza histórica

**Fecha:** 2026-04-19
**Status:** ✅ RESUELTO

**Ruling:** BETA-001 **mantiene su regla original como pieza histórica**. NO se actualiza a la redacción canónica (protección de Adendei aliado). La carta BETA-001 es una pieza de coleccionista/histórica con su efecto original de **drenaje**:

> *Costo: Antes de atacar, esta carta quita 1 pto. de vida a los Adendei aliados.*

**Implicaciones:**
- En cards.json, BETA-001 se deja con su texto actual (NO propagar redacción canónica).
- Las otras 3 variantes (FAFT-005, IDRMA-020, RMR-012) usan la redacción canónica de protección.
- Documentar en cards.json que BETA-001 tiene `errata_note: "Pieza histórica, efecto original preservado"` o similar campo.
- Para legalidad de torneo: depende del formato de juego (Estándar/Extendido) — pendiente de definir si BETA-001 es legal competitivamente con su regla original o solo permite la redacción nueva.

---

## D24. Cap de vida máxima por tipo de carta

**Fecha:** 2026-04-19
**Status:** ✅ RESUELTO

**Ruling (regla meta del juego):** Existe un **cap de vida máxima por tipo de carta** que aplica automaticamente a todas las curas y efectos de recuperación:

| Tipo | Vida máxima |
|---|---|
| Adendei | **6** puntos |
| Rava | **6** puntos |
| Token | **6** puntos (default) |
| Protector | **12** puntos |
| Espectro | **12** (cada carta declara su vida base en su propio texto) |

Ninguna cura o efecto de recuperación puede llevar a una carta por encima de su vida máxima. Los excedentes simplemente se pierden.

**Implicación para Zaren, El Inicio del Viaje (resolución de la ambigüedad reportada en T1):**

Las dos redacciones son **funcionalmente equivalentes** por el cap:
- IDRMA-007 / KEXC-001: *"cura a 6 puntos todos tus Adendei aliados"* → lleva a cada Adendei a 6.
- KPRC-103: *"cura 6 puntos a todos tus Adendei aliados"* → suma +6 a cada Adendei, capeado automáticamente a 6.

En cualquier escenario de vida inicial (1, 3, 5 ó 6), el resultado final es **el mismo: 6 puntos**. No hay diferencia jugable. La redacción canónica recomendada es KPRC-103 (más clara, sin typo `ccon`, normalizada a "puntos").

---

## Hallazgo crítico: la regla del cap está DISPERSA en el rulebook v5.1

La regla de vida máxima se menciona en **8+ lugares dispersos** pero nunca consolidada:

| Ubicación | Contenido |
|---|---|
| p06/b02 | Definición genérica de Vida Máxima, sin número |
| p07/b03 | Adendei = 6 puntos |
| p08/b03 | Protector = 12 puntos |
| p09/b03 | Rava = 6 puntos |
| p11 Token | Default 6 puntos |
| p12 Espectro | "Vida máxima marcada en su texto" |
| p17 Reemplazo | "...con 6 puntos de vida" (entrantes) |
| p37 Glosario CURAR | "máximo 6 puntos" — ⚠️ **hardcoded 6 sin distinguir tipo** |

### Ambigüedad detectada 🚩

El Glosario CURAR en p37 dice:
> *"No se puede curar a una carta que tenga completos sus puntos de vida máxima (**6 puntos**). Curar no incrementa la vida máxima de una carta."*

Este "(6 puntos)" está hardcoded como si fuera universal, pero para **Protector y Espectro es 12**. La definición del glosario es **incompleta**.

### Sugerencias para v5.2

**1. Agregar sección consolidada §2.2.X "Vida Máxima por Tipo":**
```
Adendei / Rava / Token: 6 puntos
Protector / Espectro: 12 puntos (Espectro puede declarar menor en su carta)
```

**2. Corregir glosario CURAR en p37:**
Cambiar *"(6 puntos)"* por *"(según el tipo de carta: 6 para Adendei/Rava/Token, 12 para Protector/Espectro)"*.

**3. Regla meta derivada (para redactores de cartas):**
Todas las referencias a "curar X puntos", "cura a X", "curar al máximo" se interpretan con cap automático según tipo de carta. Esto simplifica la redacción de futuras cartas: basta decir "cura X puntos" y el cap se aplica solo.

---

## Plan maestro de la auditoría v5.1 (estado al 2026-04-19 03:05 UTC)

### ✅ Fase 1 — Extracción del rulebook (COMPLETADA)
- Pipeline 5 capas: LLM + OCR + árbitro + spot-check + post-validación
- 40 páginas, 562 bloques, 207 figuras, confianza 0.9008
- Output: `master-rulebook-v5.1.md` (494 KB) + `.json` (651 KB) + manifest
- Commit Kodem `e0c684f` (estable)

### ✅ Fase 2 — Lectura completa + dudas iniciales (COMPLETADA)
- 15 dudas originales enviadas por criticidad (D1-D15)
- 5 cartas ejemplo documentadas (Quam, Yakerr, Gloku, Dagg)

### 🔄 Fase 3 — Resolución rulings con Ramses (EN CURSO)
**Rulings resueltos (18/23):**

| ID | Título | Status |
|---|---|---|
| D1 | Feral (7 energías + 1 estado) | ✅ |
| D2 | Subfase Resolución (contenido de Respuesta Rival) | ✅ |
| D3 | Rava atacable (sí, 6 pts vida) | ✅ |
| D4 | Protector suplente hereda descansos | ✅ |
| D5 | Fuera del Juego (zona, único vector Quam) | ✅ |
| D6 | Descansos máx (ZP:2, Prot:3, overflow descartado) | ✅ |
| D7 | Cartas Limitadas (solo Multi/Ext, Estándar 1 copia) | ✅ |
| D8 | Targeting ocultas (jugador elige) | ✅ |
| D9 | Token vida=6 default | ✅ |
| D10 | Pasar Turno (jugador activo, inicio) | ✅ |
| D11 | Espectros máx (4 cartas específicas) | ✅ |
| D12 | Numeración Restricciones p30-33 (2 listas distintas) | ✅ |
| D13 | Glosario "Ver §5.2" intencional (flowchart infiere) | ✅ |
| D14 | Numeración §6.X (4 refs obsoletas en p16) | ✅ |
| D16 | Gloku copia = snapshot único | ✅ |
| D17 | Efectos carta supercede reglas (p20/b10 meta) | ✅ |
| D18 | Fuera del Juego inspeccionable | ✅ |
| D19 | Pasar turno forzado (emergente, futuro por carta) | ✅ |
| D20 | Espectros vida + posesión (por carta + consumo Extinción) | ✅ |
| D23 | BETA-001 pieza histórica | ✅ |
| D24 | Cap de vida máxima por tipo (regla meta dispersa) | ✅ |

**Dudas derivadas pendientes (3):**
- **D21** Consumo de Adendei al poseer (¿se envía a Fuera del Juego / Extinción?)
- **D22** Herencia de stats al poseer (¿Espectro hereda vida del Adendei poseído?)
- **D25** Hori (¿Costo de Extinción aplica a toda la carta o solo SRMR?) 🚩

**Dudas derivadas resueltas (+2):**
- **D26** ✅ Nozi — grafía oficial: **Átlico** (una tilde, en la Á). Ruling Ramsés 2026-04-19. Las 4 variantes con `Átlíco` son errata; SRMR-005 es canónica.
- **M1** ✅ Fuera del Juego — zona aislada + pública. Ruling Ramsés 2026-04-19:
  - No es objetivo de efectos (intercambiar/copiar/vivificar): **No**
  - No cuenta como Extinción: **No**
  - No cuenta como Mazo: **No**
  - Inspeccionable por ambos jugadores siempre: **Sí**
  - Efecto latente "(aún si esta carta ya no está en el campo)" no se puede negar retroactivamente: **No**
  - Formalizar en glosario v5.2 como zona oficial.
- **M2** ✅ Intercambiar = Cambiar. Ruling Ramsés 2026-04-19:
  - Sinónimos mecánicos, misma definición (§6.5 del rulebook).
  - Efectos anti-cambio aplican a ambos términos.
  - 🚩 Bug doc: glosario "Cambiar" apunta a §6.4 cuando debería ser §6.5 — corregir en v5.2.
  - Sugerencia editorial: unificar en `Cambiar` para diseños futuros.

### 📌 Meta-regla (Ramsés 2026-04-19)

> **El rulebook impreso es canon pero admite erratas editoriales.** Igual que las cartas, el manual puede contener referencias cruzadas erróneas, typos, o puntos obsoletos. Criterio de resolución cuando hay conflicto:
> 1. El **contenido real** de la sección tiene prioridad sobre la **referencia cruzada**.
> 2. Si dos secciones se contradicen: ruling del equipo de diseño.
> 3. Si una carta contradice al rulebook: aplica la meta-regla "efectos de carta superceden reglas generales" (D17).
> 4. Erratas detectadas se acumulan en la lista de correcciones para la próxima versión del rulebook.

**Dudas de proceso pendientes:**
- **P2** ¿Generar doc separado "Inconsistencias v5.1 + Changelog v5.2"?
- **P3** ¿Existe FAQ oficial/rulings previos para integrar?

### ✅ Fase 4 — Auditoría cards.json (3 sub-agentes) — COMPLETADA
- ✅ **T1 Efecto-coherencia** (24 grupos, 96 variantes)
  - 1 🔴 Ariam Dualidad BETA-001 → resuelta como D23
  - 5 🟠 costos faltantes
  - 13 🟡 prefijos omitidos
  - 3 🟢 typos
  - 28 correcciones concretas propuestas
- ✅ **T2 Cross-check rulebook** (120 grupos de vocabulario, 65 entradas glosario)
  - 45 ✅ bien definidos
  - 36 ⚠️ usados sin definición formal (Descanso, Extinción concepto, Espectro, Lore, Pasar Turno, Disponible, Enviar, Regresar, Aumentar, Equipar/Desequipar, subtipos completos, energías completas)
  - 3 🚩 ausentes (Consejo, Gastar, Cyra)
  - 10 🔄 inconsistencias (Feral triple rol, Adendei-<Energía> con 4 variantes ortográficas, Seleccionar/Escoger/Elegir, Lupino-ghost, Resurrecto/Magno no en callout)
- ✅ **T3 Mecánicas raras** (13 únicas, 11 raras)
  - 9 🚩 no documentadas (Fuera del Juego, Cyra, Durante-el-resto-del-juego, Intercambiar, Mazo rival, Descansos indicados, Tokens paramétricos, Consejo, Multijugador)
  - 6 ⚠️ mencionadas sin formalizar
  - 12 candidatas prioritarias ruling v5.2 rankeadas

### 🎯 Correlaciones cruzadas T1+T2+T3 (emergentes)
- **"Cyra → Cura"**: errata histórica confirmada independientemente por T2 y T3 → requiere corrección en 2 folios + FAQ
- **Energías sin definición formal**: T2 lo detecta estructuralmente; T1 reporta variantes ortográficas (Pirico/Pírico/Piricco, Átlico/Átlíco) que son síntoma del mismo problema
- **"Fuera del Juego" + "Intercambiar"**: las 2 zonas/acciones más huérfanas del sistema actual
- **Espectros**: convergencia de D20, D21, D22, T1 (Ruk copia), T3 (Tokens paramétricos) → requieren sección §3.7 completa

### ✅ Fase 5 — Entregables para comunidad (COMPLETADA)
- ✅ **PDF dudas pendientes para comunidad** generado: `dudas-pendientes-comunidad.pdf` (22 KB, 7+ páginas)
  - 4 reglas ambiguas D21, D22, D25, D26
  - 10 mecánicas sin definición M1-M10
  - 6 erratas masivas E1-E6
  - 4 preguntas de proceso P1-P4
  - Folios específicos documentados por cada duda
  - Nota sobre normalización sin acentos en cards.json (contexto engine)
  - Texto 100% copiable para compartir en Discord/WhatsApp/redes

### ⏳ Fase 6 — Pendientes con Ramses (para continuar)
- [ ] **Lista de erratas oficiales** de Ramses → **F6-A** al recibirla:
  - Cruzar con las 28 correcciones T1 (propagar prefijos, normalizar ortografía)
  - Cruzar con D25, D26 (Hori costo, Nozi grafia)
  - Cruzar con E1-E6 (Cyra, Piricco, ccon, Lupino, Resurrecto/Magno)
  - Output esperado: `erratas-consolidadas-v5.1.md`
- [ ] **Validación render p19** (enviado msg 23299, esperando OK)
- [ ] **Rulings comunitarios** cuando Ramses comparta dudas a la comunidad
  - D21 (Espectro-consumo)
  - D22 (Espectro-herencia stats)
  - D25 (Hori costo aplicable a toda)
  - D26 (Atlico grafia oficial)
  - M1-M10 (mecánicas no documentadas)
- [ ] **Decisión P2**: ¿extraer `changelog-v5.2.md` separado o mantener todo en rulings-v5.1.md?
- [ ] **Decisión P3**: Ramses confirmó que preguntará a comunidad si hay FAQ oficial previo

### 🚩 Para continuar mañana — hoja de ruta

**Bloque 1: Integrar erratas oficiales (cuando Ramses las comparta)**
- Leer lista de erratas oficiales
- Cruzar contra `audit-T1-efecto-coherencia.md` (28 correcciones propuestas)
- Cruzar contra D24, D25, D26 (rulings pendientes)
- Generar `erratas-consolidadas-v5.1.md` con:
  - Erratas confirmadas oficiales
  - Propuestas mecánicas (auto-aplicables: prefijos, normalización)
  - Propuestas pending ruling

**Bloque 2: Rulings comunitarios**
- Esperar feedback de comunidad en dudas D21-D26, M1-M10
- Integrar respuestas al `rulings-v5.1.md`
- Actualizar `dudas-pendientes-comunidad.pdf` si hay cambios

**Bloque 3: Consolidación final v5.2 (si P2 = sí)**
- Generar `changelog-v5.2.md` separado con:
  - Nuevas secciones propuestas (§2.2.X Vida Máxima consolidada, §3.7 Espectros, §4.X Fuera del Juego, §6.X.X Copia como snapshot)
  - Correcciones de numeración (§6.X en p16)
  - Correcciones glosario (CURAR con cap por tipo)
  - Lista completa de erratas
- Validar con Ramses antes de commit final
- Commit unificado al repo Kodem

**Bloque 4: Validación final**
- Render p19 → OK de Ramses
- Commit Kodem con todo integrado
- Actualizar memoria diaria con aprendizajes

### 📌 Identificadores de sesión (estado al 2026-04-19 03:25 UTC)
- Repo Kodem: último commit estable `e0c684f` (pre-auditoría)
- Master fuente: `/home/coder/Kodem/docs/rulebook-source-of-truth/master-rulebook-v5.1.md` (494 KB)
- Rulings activos: `/home/coder/Kodem/docs/rulebook-source-of-truth/rulings-v5.1.md` (este archivo)
- Auditorías completas: `audit-T1-efecto-coherencia.md` ✅, `audit-T2-cross-check-rulebook.md` ✅, `audit-T3-mecanicas-raras.md` ✅
- Render p19: `p19-logos-render.png` (3000×6120, 346 KB)
- PDF comunidad: `dudas-pendientes-comunidad.pdf` (22 KB, 7 páginas) ✅
- Datasets auxiliares: `/tmp/kodem-audit/` (inconsistencias-24.json, muestra-diversa-60.json, cards-slim.json, mechanics-report.json, cross_check_v3.json, sample_findings.json, glossary_extracted.json, rulebook-glosario.md)
- Scripts reproducibles sub-agentes: `/tmp/kodem-audit/analyze_mechanics.py`, `find_exotic.py`
- Chat Telegram: `-1003700827993` · Grupo "Logos: Kodem"

### 💡 Context para próxima sesión (Logos mañana)
**Al despertar en grupo Kodem, leer primero:**
1. `rulings-v5.1.md` (este archivo) — estado de dudas
2. `audit-T1/T2/T3-*.md` — bases de datos de inconsistencias
3. Mensaje más reciente de Ramses con lista de erratas oficiales (si llegó)

**Prioridad 1:** integrar erratas oficiales → `erratas-consolidadas-v5.1.md`
**Prioridad 2:** rulings de comunidad cuando los tengamos
**Prioridad 3:** changelog v5.2 consolidado

**Estado emocional/técnico:** sesión larga y fructífera. 23/26 dudas resueltas (D1-D24 menos D21, D22, D25, D26). 3 sub-agentes completaron sin timeouts. Ramses satisfecho con el flujo de preguntas + documentación paralela. No hay blockers.

---

## M4. "Efectos de cartas tomadas" — HandTraps

**Fecha:** 2026-04-19
**Status:** ✅ RESUELTO
**Fuente:** Ramsés D'León, Telegram grupo Logos: Kodem (msg 23462, 06:25 UTC).

**Ruling (verbatim):** *"Se le conocen como HandTraps. El efecto de KPRC-017 y KPRC-037 son ejemplo."*

### Definición formal

**HandTrap** = carta con un efecto disparable **al momento en que es tomada del Mazo** (al ser robada), antes de añadirse a la mano del jugador.

El patrón textual camónico es:
> *"Pasiva: Si esta carta es tomada del Mazo, puedes [revelarla/mostrarla] y [efecto]."*

También existe la variante activa:
> *"Pasiva: Si tomas esta carta de tu Mazo, puedes revelarla y [efecto]."* (Kap, Lluvia de Ranas)

### Implicancias

- El efecto HandTrap **se dispara durante el reemplazo de cartas** (p20/b08 "efectos válidos al ser tomadas, una vez por cada reemplazo"). Esto alinea el término comunidad con la regla formal del rulebook.
- HandTrap = familia de efectos "al ser tomada". No hay mecánica adicional; es nombre de patrón, no nueva regla.
- Cartas que se protegen de HandTraps (ej. Nirge Los Ocultos FAFT-001 / KPRC-030) impiden el disparo de estos efectos.

### Cartas identificadas (12 nombres únicos, 21 variantes)

| Carta | Folios (variantes) | Efecto HandTrap |
|---|---|---|
| Ariam, Escudo de Cempasúchil | FYTE-004U, FYTE-030 | Protege 1 carta en campo hasta el fin del siguiente turno |
| Kap, Lluvia de Ranas | KPRC-017 | Cura 3 pts a tu Protector |
| Kaykac, Sorpresa Pírica | TCOO-007S, TCOO-039 (+ [ENGLISH] TCEO-007S, TCEO-039) | Quema 1 carta rival |
| Kuron, Exhalación | TCOO-009S, TCOO-054 (+ [ENGLISH] TCEO-009S, TCEO-054) | Da 1 descanso hasta a 2 Adendei rivales |
| Nepthis, Rey Coral | KPRC-037 | Cura 2 pts a 1 carta y 1 pt a un Adendei |
| Rhymir, Pararrayos | TCOO-004U, TCOO-051 (+ [ENGLISH] TCEO-004U, TCEO-051) | Actualiza 1 descanso de hasta 2 cartas aliadas |
| Yailok, Contacto Paralizante | TCOO-016R, TCOO-050 (+ [ENGLISH] TCEO-016R, TCEO-050) | Niega el efecto de 1 carta en el campo hasta Fin del Turno |
| Zinawe, Vacío Etéreo | KPRC-072 | Envía 1 Adendei aliado al fondo del Mazo y se coloca en su lugar |

### Preguntas derivadas (abiertas)

- ¿Un HandTrap puede ser negado por efectos en campo en el momento de dispararse? (relacionado con D31)
- Si el rival está reemplazando cartas y toma 3 a la vez (regla estándar), ¿cuántos HandTraps puede activar? Regla rulebook p20/b08: *"una vez por cada reemplazo"* → si son HandTraps distintos, uno por carta tomada.
- Cartas que se protegen (Nirge, Los Ocultos) — ¿bloquea TODOS los HandTraps o solo los del rival?

**Sugerencia para v5.2:** añadir al glosario §9:
> **HandTrap:** Carta cuyo efecto Pasivo se dispara al ser tomada del Mazo. Se revela/muestra al momento del reemplazo (§ReemplazoDeCartas) y resuelve antes de continuar con el turno. Ver p20/b08 para la regla general de "efectos válidos al ser tomadas".

---

## M2.5. Intercambio Mazo↔Extinción (Mizthe, FYTE-075)

**Fecha:** 2026-04-19
**Status:** ✅ RESUELTO

**Ruling:** En Kódem **el jugador ordena su propio mazo como le convenga** y puede **consultarlo libremente en cualquier momento**. Por tanto, para Mizthe (y cualquier otra carta que "busque" algo en el propio mazo), **el jugador mira TODO su mazo y elige**.

**Implicancias:**
- El mazo propio no es zona oculta-aleatoria al estilo MTG/YGO; es una pila **abierta para el dueño** y ordenada a voluntad.
- El mazo rival sí es privado: un efecto que busque/manipule el mazo del rival sí requiere reglas de revelación/aleatoriedad explícitas.
- No se "baraja" después de buscar en el propio mazo (porque nunca estuvo barajado).
- "Fuera del Juego", "Extinción" y "Mazo propio" son las tres zonas donde el jugador tiene vista completa de su propio material.

**Sugerencia para v5.2:** agregar línea en §4 (Preparación del Ecosistema) o glosario:
> "El Mazo Principal propio puede consultarse y reordenarse libremente por su dueño en cualquier momento. No se baraja entre turnos. El mazo del rival es zona privada."

---

## M6. "Descansos indicados" (Xakros, Peste — IDRMP-022, RAMI-007, RMR-017)

**Fecha:** 2026-04-19
**Status:** ✅ RESUELTO (respuesta comunidad — Hule)

**Ruling:** "Descansos indicados" = la **estadística BASE impresa en la carta**, no los descansos actuales acumulados.

**Implicancias:**
- Xakros aplica daño/descansos sobre el valor "rests" original del texto de carta.
- No acumula con descansos ya gastados/recuperados durante el juego.
- Clarifica léxico: "indicados" = impresos, no "actuales".

**Sugerencia para v5.2:** distinguir en glosario:
> **Descansos indicados:** valor base impreso en la carta.
> **Descansos actuales:** estado de descansos de una carta específica en el campo en un momento dado.

---

## M11. "Frente a" como adyacencia posicional

**Fecha:** 2026-04-19
**Status:** ✅ RESUELTO (respuesta comunidad — Hule)

**Ruling:** Los 3 espacios de Zona Principal son fijos **(izquierdo / centro / derecho)** y "frente a" es un **espejo directo**: el espacio izquierdo de un jugador mira al espacio derecho del rival y viceversa (o espejo por convención canonicalizada; la opción seleccionada fue "izq_centro_der").

**Implicancias:**
- Carta en ZP-izq de jugador A está "frente a" carta en ZP-der de jugador B (espejo frontal).
- Si la ZP espejada del rival está vacía: la carta no tiene objetivo "frente a" — efectos que requieran "frente a" fallan o no aplican.
- El Protector sigue reglas específicas del Protector (no necesariamente bloquea "frente a" salvo que el texto de carta lo indique).
- Aplica a: Satélite V.E.L.O., Hog Terremoto, Kuyovi Salto Eléctrico, Tekei Destierro, Ib-Nirge, Hali, y cualquier efecto que use "frente a".

**Sugerencia para v5.2:** formalizar en §4 o §6:
> "Los 3 espacios de Zona Principal (izq/centro/der) se corresponden en espejo con los del rival. 'Frente a' designa esa correspondencia geométrica fija."

---

## D27. Condiciones de victoria alternativas en texto de carta (Draxes)

**Fecha:** 2026-04-19
**Status:** ✅ RESUELTO (con base en lectura del rulebook)

**Ruling:** La única Condición de Victoria formal (p15/b12) dice explícitamente:
> "Si logras enviar **10** cartas del rival a su Zona de Extinción **o cumplir condiciones de victoria que se indiquen el texto de las cartas: ¡GANARÁS EL JUEGO!**"

Draxes, Último Aliento (TCEO-009/TCOO-009) usa exactamente la frase canónica "¡GANAS EL JUEGO!" en su Pasiva. Por lo tanto:
- Es una **condición alternativa pura** habilitada por el rulebook.
- **Bypasea** el requisito de 10 cartas en Extinción: Draxes gana aunque el rival tenga 0 cartas en Extinción al momento de dispararse la Pasiva.
- **NO bypasea** efectos de negación: la Pasiva de Draxes puede ser negada como cualquier otra Pasiva (§8.3 y glosario p39/b06 "Negar un efecto: un efecto declarado no podrá resolver mientras se encuentre negado"). Si el rival protege al Protector o niega la Pasiva, no se dispara la victoria.
- Requiere que la Pasiva **cumpla su condición y resuelva**: Draxes debe dañar Y enviar a Extinción al Protector rival en la misma ventana.

**Implicancias:**
- Otras cartas con "¡GANAS EL JUEGO!" (si aparecen en sets futuros) siguen la misma lógica.
- Efectos tipo "Esta Pasiva no puede ser negada" (ej. Makua, Venganza Abisal) harían la victoria **efectivamente imparable**. Draxes NO tiene esa cláusula, por lo que SI es negable.
- Protecciones del Protector rival (Protector suplente, cura de emergencia, negación) son línea de defensa válida.

**Sugerencia para v5.2:** agregar entrada en glosario:
> **¡GANAS EL JUEGO!** (también "¡GANARÁS EL JUEGO!"): Frase canónica que habilita una condición alternativa de victoria escrita en texto de carta. Sujeta a negación estándar salvo cláusula explícita de inmunidad.

---

## D28. "Cambiar de lugar" vs "Cambiar" vs "Intercambiar" (§6.5)

**Fecha:** 2026-04-19
**Status:** ✅ RESUELTO

**Ruling:** Los tres fraseos son **sinónimos mecánicos** y todos caen bajo §6.5 Cambios entre Zonas.

**Evidencia directa:**
- p23/b17 introduce la sección: "cartas que permiten **cambiar** su lugar en el campo".
- p23/b18 regula: "Si una o más cartas son **intercambiadas** en la Zona Principal, las cartas cambiadas conservarán las mismas estadísticas y condiciones…"
- p23/b22-b27 muestra a **Kuyovi, Salto Eléctrico** (LGRO-077) como la carta de **ejemplo canónica** impresa en §6.5, cuyo texto dice literalmente: "Activa: **Cambia de lugar** esta carta con cualquier carta en tu Zona Principal."

El rulebook usa "cambiar", "intercambiar", "cambiar de lugar" de forma intercambiable en la misma sección — son el mismo verbo mecánico.

**Implicancias:**
- Zaykan, Fractura (aliado↔aliado), Kuyovi Salto Eléctrico (self↔aliado) y Hali Ave de Trueno (aliado↔rival) son todas §6.5.
- Todas preservan estadísticas, vida, equipos y marcas (p23/b18 "condiciones" incluye marcas).
- Todas disparan efectos anti-cambio (ej. Planta Carnívora).
- Todas aplican las 4 sub-reglas de §6.5 (preservación de stats, cancelación si imposibilita, control de PV en campo rival, compatibilidad de equipos).

**Resuelve automáticamente:**
- **M2.3** (anti-cambio aplica a intercambio): Sí, porque intercambio = cambio = §6.5.
- **M2.6** (marcas al cambiar): Se preservan junto con vida y equipos (p23/b18 "condiciones").

**Sugerencia para v5.2:** agregar nota explicativa en §6.5:
> "Los verbos 'cambiar', 'intercambiar' y 'cambiar de lugar' son equivalentes mecánicos y están regulados por esta sección."

---

## M2.3. Anti-cambio aplica a intercambio (Planta Carnívora)

**Fecha:** 2026-04-19
**Status:** ✅ RESUELTO (por D28)

**Ruling:** Sí. "Intercambiar" = "cambiar" = "cambiar de lugar" (todos §6.5). La restricción de Planta Carnívora ("no puede equiparse a Adendei cambiados de lugar por efectos de cartas aliadas") aplica cuando el Adendei llegó a ZP por cualquier operación de §6.5, incluyendo intercambios como Ariam Resurrección.

---

## M2.6. Marcas al intercambiar (Envenenada/Quemada/Abismada)

**Fecha:** 2026-04-19
**Status:** ✅ RESUELTO (por D28 + p23/b18)

**Ruling:** Las marcas **se preservan** en el intercambio. p23/b18 dice: "las cartas cambiadas conservarán las mismas estadísticas y **condiciones** que tenían originalmente antes del cambio (incluyendo equipos y vida)." "Condiciones" abarca marcas (Envenenada, Quemada, Abismada).

**Implicancias:**
- En Mizthe/Ariam/Hali la carta que entra hereda las marcas de la saliente (junto con equipos y vida).
- Therz (máx 6 PV) es la excepción explícita para vida, no para marcas.

**Sugerencia v5.2:** reemplazar "condiciones" por "condiciones (marcas, estados, vida actual)" para eliminar ambigüedad.

---

## M2.4. "Zona Principal original" (Ariam Resurrección)

**Fecha:** 2026-04-19
**Status:** ✅ RESUELTO (parcial) — significado del término

**Ruling:** "Zona Principal original" = **la ZP del jugador dueño de la carta** (el lado propio del tablero), en oposición a "ZP rival" donde una carta puede terminar tras un intercambio aliado↔rival.

**Evidencia:**
- p14/b (Espectros): "un Adendei aliado en Zona Principal original" (tu lado).
- p24/b (Revelado): "Una carta revelada que cambia entre Zona Principal original y Zona Principal rival no se considera que esté siendo revelada nuevamente." Aquí "original" = tu ZP; "rival" = la ZP del otro jugador.

**Para Ariam, Resurrección** (FYTE-022R/074): "1 Adendei, Rava o Espectro aliado en su Zona Principal original" = cualquiera de los 3 espacios de TU ZP (no espacio exacto ni lado del rival).

**Queda abierto:** el sub-caso de "¿qué espacio ocupa la carta que entra del intercambio?" no lo resuelve el rulebook explícitamente. Por simetría con §6.5 y práctica común: **ocupa el espacio que liberó la carta saliente** (swap posicional).

---

## E8. Subtipos compuestos son multisubtipo (Macit, Therz)

**Fecha:** 2026-04-19
**Status:** ✅ RESUELTO (comunidad — Hule + lectura rulebook)

**Patch aplicado:** cards.json commit `e1cd4fc` en codice-kodem — 4 cartas migradas a `subtypes: [primary, secondary]` conservando `subtype` primario para retro-compatibilidad. Todas las demás cartas recibieron `subtypes: [subtype]` para consistencia de esquema.

**Ruling:** "Guardián Catrín" y "Titán Catrín" son **dos subtipos simultáneos**, no un subtipo compuesto nuevo.

**Evidencia:**
- p07/b04 (línea 910): lista canónica de subtipos incluye "Titán, Abisal, Equino, Lupino, Infectado, Guardián, Kósmico, Catrin" como categorías **separadas** en la misma lista.
- p11/b19: ejemplo impreso "1 Adendei-Pírico **Titán** aliado" muestra que subtipos pueden concatenarse con energía.
- Macit, Resguardo Divino (FYTE-008R/026) = Adendei Guardián Catrín: cumple efectos que filtran por Guardián Y por Catrín.
- Therz, de Vuelta a la Tumba (FYTE-020R/072) = Adendei Titán Catrín: cumple efectos que filtran por Titán Y por Catrín.

**Implicancias:**
- Efectos que busquen "Adendei Titán" alcanzan a Therz (FYTE-072).
- Efectos que busquen "Adendei Catrín" también alcanzan a Therz.
- **Acción recomendada:** migrar `subtype: "Titán Catrín"` a `subtypes: ["Titán", "Catrín"]` en cards.json (opcional, pero evita falsos negativos en queries).

**Sugerencia v5.2:** formalizar en glosario:
> **Subtipos múltiples:** Una carta puede tener más de un subtipo. Efectos que filtran por subtipo X aplican a cualquier carta que incluya X en sus subtipos.

---

## M12. "Efecto rápido" vs "Activa Rápida" — promoción de velocidad

**Fecha:** 2026-04-19
**Status:** ✅ RESUELTO (parcial)

**Ruling:** Son **sinónimos funcionales**. El rulebook define:
- **Activa-Rápida** (p29/b04): "Las Activas-Rápidas funcionan igual que las Activas, pero también se pueden usar durante el turno del rival (como respuesta) y se resuelven tan pronto son declaradas."
- **Pasiva-Rápida** (p29/b09): "Se usan durante cualquier turno, únicamente en respuesta… Se resuelven tan pronto son declaradas."

Las dos propiedades canónicas de "rápida" son:
1. Se puede usar en turno rival.
2. Resuelve tan pronto se declara (sin esperar subfase).

Cualquier fraseo que "considera X como rápida" otorga ambas propiedades.

**Implicancias:**
- Ryptor, Jugada Veloz: efecto del Adendei objetivo gana ambas propiedades ese turno.
- Yakerr, Vínculo Odémico: idem, incluso si el efecto original era Pasiva.
- Una Pasiva promovida a "Activa Rápida" **sí puede usarse en turno rival** y resuelve inmediato.
- Una Pasiva promovida **NO** genera descansos automáticamente (p29/b06: "a diferencia de las Activas, una carta no descansará al final del turno por declarar una Pasiva"). La promoción es de **velocidad**, no de categoría mecánica completa.

**Queda abierto:** si una Pasiva-Rápida se promueve a "Activa-Rápida", ¿gana el derecho de generar descansos? Analíticamente no (solo cambia velocidad), pero pendiente confirmación explícita.

---

## M13. "Fase de Batalla" como ventana temporal

**Fecha:** 2026-04-19
**Status:** ✅ RESUELTO

**Ruling:** La **Fase de Batalla** está formalmente definida (p16/b07) y comprende **3 subfases**:
1. Declaración (elegir atacantes, activas, objetivos)
2. Pago de costos
3. Respuesta Rival / Resolución

**Glósario implícito de "durante la Fase de Batalla":**
- Inicia con la Subfase de Declaración.
- Termina al cerrar la Subfase de Resolución del último ataque del turno.
- **NO incluye** Fase Previa (inmediatamente anterior) ni Fase Post (inmediatamente posterior).
- Efectos "al inicio del turno" / "al final del turno" NO caen dentro de Fase de Batalla.

**Implicancias:**
- Escudos I.C.A.R.O.: desvía efectos que impacten a la carta equipada desde Declaración hasta Resolución del último ataque.
- Balim, Anochecer: el rival no puede activar equipos en esa misma ventana.
- Activa-Rápida en turno rival sólo se puede activar **si la condición se cumple dentro de Fase de Batalla** (o fuera de ella, según el texto).

**Sugerencia v5.2:** agregar entrada en glosario:
> **Fase de Batalla:** Tercera fase del turno. Comprende Declaración, Pago de costos y Respuesta Rival/Resolución (Ver §5). Efectos que hacen referencia a "durante la Fase de Batalla" tienen validez desde la primera declaración de ataque hasta la última resolución del turno.

---

## M14. "Original" / "estadísticas originales" — snapshot base

**Fecha:** 2026-04-19
**Status:** ✅ RESUELTO

**Ruling:** "Original" en Virste, Cordyceps y cartas similares refiere al **valor impreso en la carta** (base, sin modificadores de efecto).

**Evidencia:**
- p22/b01 (§6.2 Cambios de Estadísticas) usa "original" con mismo sentido: valor impreso.
- p31/b03 (regla 6): "Si una carta es ocultada por efecto, vuelve a sus estadísticas **base**" — "base" y "original" se usan como sinónimos en este contexto.
- Virste, Reseteo revierte todo modificador (escalar/descender/cura/daño acumulado) a impreso.

**Caso especial — Tokens:** Los Tokens no tienen valor "impreso" (son creados en mesa). Su "original" = valor al momento de su creación, que a menudo hereda de la carta que lo generó.

**Caso especial — "Zona Principal original"** (M2.4): aquí "original" tiene **otro sentido** (lado del dueño), NO se confunde con este ruling.

**Sugerencia v5.2:** distinguir en glosario:
> **Estadística original / base:** Valor impreso en la carta antes de cualquier modificación de efectos.
> **Zona Principal original:** ZP del jugador dueño de la carta (distinta de "ZP rival"). No relacionado con "estadísticas originales".

---

## E7. "Titan" (sin tilde) — errata ortográfica en KPRC-072

**Fecha:** 2026-04-19
**Status:** ✅ RESUELTO (errata confirmada por visión)

**Ruling:** Es una **errata de datos** en cards.json. El rulebook usa consistentemente **"Titán"** con tilde (p07/b04 lista canónica, p05/b12 "Carta Titán Kósmica", p11/b19 "Adendei-Pírico Titán", y 127+ cartas).

KPRC-072 (Zinawe, Vacío Etéreo) tenía `subtype: "Titan"` sin tilde — **confirmado errata** por screenshot de la carta física enviada por Ramses (2026-04-19): la carta impresa dice claramente "Adendei Titán / Demótica" con tilde.

**Ruling inicial de comunidad** (Hule) fue "mantener variante" basado en memoria general de normalización sin acentos, pero los datos concretos mostraban 127 con tilde vs 1 sin. Tras revisión visual, Ramses confirmó la errata y autorizó el patch.

**Patch aplicado:** cards.json commit `c82f... (pending hash)` en codice-kodem. KPRC-072 ahora `subtype: "Titán"`, `subtypes: ["Titán"]`. Estado final: **130/130 Titanes uniformes con tilde, cero outliers.**

**Lección meta:** La meta-regla "cards.json sin acentos por normalización del engine" aplica a Kodem/images/cards.json, NO a codice-kodem/cards.json (que es fuente maestra editorial y sí conserva acentos).

---

## D29. "Neutral" como effect_text

**Fecha:** 2026-04-19
**Status:** ✅ RESUELTO

**Ruling:** `effect: "Neutral"` es **equivalente a "Ninguna (solo lore)"** — marca de carta sin efecto ni costo. Es un residuo de mi propio preprocesamiento de datos (cuando normalicé cartas sin efecto), **no** un término del rulebook.

**Respuesta Hule:** *"Seguro es derivado del procesamiento que has hecho antes para clarificar cartas. Pero es básicamente una carta sin efecto o costo."*

**Cartas afectadas (7):** KPRC-049, TCEO-002K, TCEO-033, TCEO-034, TCOO-002T, TCOO-034K, TCEO-028K (todas son cartas de evento/flash tipo "vs" sin efecto jugable).

**Acción pendiente:** normalizar `effect: "Neutral"` → `effect: ""` (vacío) o `effect: "Ninguna (solo lore)"` para unificar con el resto de cartas lore-only en `codice-kodem/cards.json`.

**Sugerencia v5.2:** N/A (no es regla del rulebook, es saneamiento de datos).

---

## D32. Protector Nahual, Máscara — copia de Activa del Protector rival

**Fecha:** 2026-04-19
**Status:** ✅ RESUELTO

**Contexto:** Nahual, Máscara (FYTE-012S / FYTE-083):
- `effect_text`: "Usa 1 de los siguientes efectos: (a) Usa la misma Activa y costo que el Protector rival. (b) Cura 1 pto. a 3 cartas en tu campo."
- `cost_text`: "Si esta carta usa la misma Activa que el Protector rival, daña 1 pto. a 3 cartas en tu campo."

**Ruling (lectura correcta según Hule):** Son **2 ramas mutuamente excluyentes**, y la rama (a) tiene **doble costo apilado**:

- **Rama (a) — Activa del rival:** Nahual ejecuta la Activa textual del Protector rival. Paga el **costo del rival** (literal, incluyendo cualquier requerimiento como "envía 1 Adendei Catrín aliado"), **más** el `cost_text` propio de Nahual: daña 1 pto. a 3 cartas en tu campo (auto-daño obligatorio).
- **Rama (b) — Cura propia:** Nahual cura 1 pto. a 3 cartas en tu campo. Sin costo adicional (el `cost_text` NO aplica aquí porque la condición es "si usa la misma Activa que el Protector rival").

**Implicancias:**
- Rama (a) es de alto costo (costo rival + auto-daño). Es una "carta camaleón" con peaje.
- Rama (b) es la opción "segura" pero débil (cura 3 cartas × 1 pt).
- Si el rival NO tiene Protector, rama (a) es nula — Nahual queda forzado a rama (b).
- Si el rival tiene Protector sin Activa (algunos Protectores sólo tienen Pasivas), rama (a) también es nula.
- El copy-depth es **textual completo**: si la Activa del rival requiere un Adendei Catrín aliado, Nahual debe tenerlo (o no puede pagar el costo).

**Ninguna opción del portal era exacta.** Las 3 opciones originales asumían solo la rama (a) de Activa rival sin considerar el `cost_text` condicional. La opción más cercana es **(2) Copia texto + costo literal**, pero se complementa con el auto-daño apilado.

**Sugerencia v5.2:** en el glosario, agregar entrada sobre "costos condicionales de carta" para distinguir de `cost_text` siempre-aplicable.

---

_Plan actualizado: 2026-04-19 07:12 UTC — 12 rulings cerrados esta sesión: D27, D28, D29, D32, M2.3, M2.4, M2.6, M12, M13, M14, E7, E8._

---

## Bloque M15–M23 — Mecánicas resolubles por lectura del rulebook

**Fecha:** 2026-04-19 (auditoría consolidada, sesión 07:30 UTC)
**Status:** 🟡 Rulings **tentativos** con evidencia textual directa. Pendientes de confirmación final por Ramsés antes de marcarse como `✅ RESUELTO`.

**Metodología:** los 9 ítems fueron extraídos del consolidado `dudas-consolidadas-2026-04-19.md` (sección 3). Cada uno incluye:
- Evidencia textual del propio rulebook que permite resolverlo sin consulta externa.
- Ruling tentativo propuesto por Logos.
- Sugerencia de parche editorial para v5.2.

Si Ramsés confirma, pasan a ruling cerrado formal. Si disiente en alguno, se reabre como duda comunidad.

---

### M15. Cross-reference erróneo "Ver 6.3 Tipos de daño" en p07/b11

**Fecha:** 2026-04-19 | **Status:** 🟡 Tentativo → **ya es errata** (incluida en E23 del consolidado)

**Anchor:** p07/b11 — la cross-reference lleva a §Protección, no a §Tipos de Daño.

**Ruling tentativo:** Errata editorial pura. La numeración canon (TOC p03) establece §6.4 = Tipos de Daño. Incluir en el batch E23 (renumeraciones parciales v5.0→v5.1). Sin impacto mecánico.

**Acción v5.2:** Parche editorial en lote. No requiere ruling separado — absorbido por E23.

---

### M16. "Activas Rápidas" vs "Activa-Rápida" — inconsistencia de guión

**Fecha:** 2026-04-19 | **Status:** 🟡 Tentativo

**Anchors:** p16/b11 (sin guión) vs. p16/b06b, p27/b15, p27/b16, glosario p39 (con guión).

**Evidencia:** El glosario §9 usa consistentemente **"Activa-Rápida"** (con guión). El glosario es autoridad terminológica.

**Ruling tentativo:** La forma canónica es **Activa-Rápida** con guión. Las instancias sin guión son erratas tipográficas (quedan agregadas al catálogo E24). La mecánica es idéntica independientemente del fraseo impreso.

**Acción v5.2:** Unificar ortografía en todas las ocurrencias (patch en bloque).

---

### M17. "Los Ixim siempre tendrán Pasivas" vs. Pasiva-Rápida impresa en el pool

**Fecha:** 2026-04-19 | **Status:** 🟡 Tentativo

**Anchor:** p10/b05 — *"Los Ixim siempre tendrán Pasivas y los Rot siempre tendrán Activas."*

**Cartas implicadas:** Copal Blanco (FYTE-008), Planta Carnívora (RAMI-008S, RAMI-023) — 3 Ixim con **Pasiva-Rápida** en el pool actual.

**Evidencia:** El glosario §9 (p39/b09) define **Pasiva-Rápida** como *variante* de Pasiva (resuelve tan pronto se declara). Por jerarquía de tipos (subtipo incluido en el supertipo), una Pasiva-Rápida **es** una Pasiva.

**Ruling tentativo:** La regla "Ixim siempre tendrán Pasivas" incluye implícitamente a **Pasiva-Rápida**. Las 3 cartas son legalmente válidas dentro de la regla de tipo.

**Acción v5.2:** Agregar nota aclaratoria en p10/b05: *"Los Ixim siempre tendrán Pasivas (incluyendo Pasiva-Rápida)."*

---

### M18. "Descanso: 0" en callout de Espectro vs. herencia al poseer

**Fecha:** 2026-04-19 | **Status:** 🟡 Tentativo

**Anchors:** p14/b10 (callout "Descanso: 0") vs. p14/b16 bullet 4 (regla: Espectro usa stats de la carta poseída).

**Problema:** El callout anótomico muestra **Descanso: 0** como valor fijo, pero la regla ordena herencia al poseer.

**Evidencia:** D21 (Ramsés) estableció que el Espectro poseído **NO hereda** stats del Adendei poseído (ver D22 refinada). El Espectro usa su propio Descanso impreso. El callout *"Descanso: 0"* describe entonces el valor base del propio Espectro como carta (no cero por estar sin poseer).

**Ruling tentativo:** Corrección a la lectura del consolidado: el callout **es correcto**. "Descanso: 0" es el valor base impreso del Espectro como carta — no es que cambie al poseer. D22 resolvió que NO hay herencia de stats. El callout documenta su propio descanso, que para el Espectro canónico del ejemplo es 0.

**Acción v5.2:** No es inconsistencia real una vez D21+D22 son autoridad. Opcional agregar nota pedagógica: *"El Espectro conserva su propio Descanso impreso (‘Descanso: 0’ en este ejemplo) al poseer; no hereda el del Adendei poseído (ver D22)."*

---

### M19. Ixim y descansos al usar Activa — ausencia de regla simétrica a Rot

**Fecha:** 2026-04-19 | **Status:** 🟡 Tentativo

**Anchor:** p18/b09 — regla excepcional: los Rot NO generan descansos al usar su Activa.

**Problema:** No existe regla simétrica para los Ixim. ¿Las Activas de Ixim generan descanso a la carta equipada?

**Evidencia:**
- p18/b09 es una **excepción explicita** para Rot. Las excepciones no se extienden por analogía sin autorización textual.
- p16/b08 dice que la Activa de un Equipo (Ixim/Rot) *"se considera como 1 sola Activa"* con la del Adendei equipado.
- Regla general de Activas: toda Activa declarada genera descanso automático al final del turno (p29/b06 contrastivo).

**Ruling tentativo:** Las Activas de Ixim **sí generan descanso** para el Adendei equipado (regla general). El Ixim no está en la lista de excepciones de p18/b09, por lo tanto aplica la regla base.

**Implicación táctica:** Si la carta equipada ya estaba en descanso máximo (2), no puede declarar su Activa combinada con el Ixim ese turno.

**Acción v5.2:** Agregar nota explícita en §3.6 Ixim o en p18/b09: *"Los Rot son la única excepción a la regla de generar descanso por Activa; los Ixim siguen la regla general."*

---

### M20. Reemplazo fallido — "2 veces" vs "tercer reemplazo": conteo aparentemente contradictorio

**Fecha:** 2026-04-19 | **Status:** 🟡 Tentativo

**Anchor:** p20/b06 — *"puede repetirse un máximo de 2 veces"* y *"Si después del tercer reemplazo..."*

**Problema aparente:** ¿son 2 intentos o 3?

**Evidencia (lectura semántica):** El proceso ORIGINAL cuenta como el primer intento. "Puede repetirse un máximo de 2 veces" = 2 repeticiones adicionales. "Tercer reemplazo" confirma exactamente esta lectura (el 3° intento = 3º reemplazo).

**Ruling tentativo:** Son **3 intentos totales**:
1. Intento original (1° reemplazo).
2. Repetición tras fallo (2° reemplazo).
3. Última repetición tras segundo fallo (3° reemplazo).
4. Si falla el 3° → pierde la partida.

No hay contradicción real; la ambigüedad es puramente de lectura.

**Acción v5.2:** Reescribir p20/b06 para eliminar confusión: *"El proceso puede repetirse hasta 2 veces adicionales (máximo 3 intentos totales de reemplazo). Si todos fallan, el jugador pierde el juego."*

---

### M21. Glosario "Pasiva" — "no se actualizan descansos" aparenta ser absoluto

**Fecha:** 2026-04-19 | **Status:** 🟡 Tentativo

**Anchor:** p39/b08 — entrada del glosario para "Pasiva".

**Problema:** Algunas Pasivas tienen costos de descanso explícitos; la afirmación del glosario suena categórica.

**Evidencia:**
- p29/b06 (§6.7.2) aclara: las Pasivas **no generan descansos automáticos** al final del turno (a diferencia de Activas).
- D17 (meta-regla): los costos explícitos de una carta supercede la regla general.
- Un costo explícito "recibe N descansos" es parte del **pago** de la Pasiva, no un descanso automático por uso.

**Ruling tentativo:** No hay contradicción real. La afirmación del glosario es correcta en su alcance (descansos automáticos). Los costos de descanso impresos son pagos declarados, no automáticos.

**Acción v5.2:** Reformular la entrada del glosario: *"Pasiva: ...no se actualizan descansos **automáticamente** al usarlas (a menos que el costo impreso de la Pasiva lo especifique)."*

---

### M22. Glosario "Pasiva-Rápida" — disparadores difieren del cuerpo del rulebook

**Fecha:** 2026-04-19 | **Status:** 🟡 Tentativo

**Anchors:** p39/b09 (glosario) vs. p29/b09 (cuerpo §6.7.2).

**Problema:** El glosario omite: (a) la cláusula *"una vez por turno en Fase Previa si no se especifica momento"*, (b) dice *"otras Pasivas"* donde el cuerpo dice *"declaración de otras Pasivas"*.

**Evidencia:** El cuerpo del rulebook es la autoridad normativa; el glosario es un resumen. La frase *"declaración de"* es mecánicamente relevante: la Pasiva-Rápida responde en la **ventana de declaración**, antes de la resolución.

**Ruling tentativo:** El texto autoritativo es p29/b09. La entrada de glosario se expande en v5.2 para incluir:
1. Que responde a la *declaración* de Pasivas (no a su resolución).
2. La cláusula de uso único en Fase Previa cuando no hay momento especificado.

**Acción v5.2:** Reemplazar entrada del glosario con texto completo del cuerpo.

---

### M23. Zona "mano" — estado no declarado en §4

**Fecha:** 2026-04-19 | **Status:** 🟡 Tentativo

**Anchor:** p24/b03 — *"Solo se considera que una carta está en mano cuando se toma del Mazo, por reemplazo o por efecto de alguna carta."*

**Problema:** "Mano" no aparece en la lista de zonas de §4 pero se usa como estado.

**Evidencia:** p24/b03 aparece en §6.5 (Cambios entre Zonas), contexto de describir **estados transitorios**. El rulebook distingue zonas permanentes (§4: ZP, Extinción, Mazo, Equipo, Bio, + Fuera de Juego por D5) de estados momentaneos.

**Ruling tentativo:** "En mano" es un **estado transitorio**, no una zona. Existe únicamente durante la ventana de selección en el proceso de reemplazo (p20/b02-b03), entre tomar del Mazo y colocar en campo/devolver al Mazo. Fuera de ese proceso, no hay cartas "en mano".

**Implicaciones:**
- HandTraps (ver M4 previo) se disparan durante este estado transitorio, resolviendo *antes* de que la carta salga del mismo.
- No hay zona "mano" con capacidad permanente ni ciclo de turno asociado.

**Acción v5.2:** Agregar al glosario §9:
> **Mano:** Estado transitorio de una carta al ser tomada del Mazo durante el proceso de Reemplazo, antes de colocarla en el campo o devolverla al Mazo. No es una zona permanente.

---

_M15–M23 documentados como tentativos 2026-04-19 07:35 UTC. Esperan confirmación final de Ramsés para promoción a ✅ RESUELTO._

---

## SESIÓN 08:00 UTC — Rulings derivados de FAQ oficial + cross-check portal

Después de integrar el FAQ oficial (7 respuestas) al addendum, Ramsés pidió releer rulings-v5.1.md y validar si dudas abiertas en el portal comunidad ya estaban resueltas. Se identificaron **6 cierres por rulings pre-existentes** + **1 cierre nuevo por Ramsés** + **4 refinamientos**.

---

### D33. Espectro atacar sin carta poseída — usa regla del rulebook directa

**Fecha:** 2026-04-19 | **Status:** 🟡 Parcial (evidencia encontrada)

**Cartas:** Todas las Espectro FYTE (28 cartas)

**Evidencia directa:** p14/b16 bullet 6:
> *"Si una carta Espectro no tiene poseída a una carta para causar daño, deberá pagar el doble de puntos de vida a las cartas aliadas en su Zona Principal original por cada punto de daño que intente infligir."*

**Lo que está claro:** SÍ puede atacar sin carta poseída. El costo es pagar doble vida aliada por cada punto de daño.

**Lo que queda abierto (portal D33):** ¿Ese ataque dispara triggers "si esta carta ataca"? FAQ-03 dijo que un ataque NEGADO no dispara triggers (no sucedió). Por simetría, un ataque que SÍ ocurre (aunque sea pagando vida aliada) debería disparar triggers. Pero no hay texto explícito.

**Resuelve:** que el Espectro puede atacar sin poseer (opción 2 del portal original era correcta).
**Queda abierto:** disparo de triggers en ese modo especial.

---

### D34. Espectros en conteo de victoria — CERRADA

**Fecha:** 2026-04-19 | **Status:** ✅ RESUELTO (deriva de D21 + D22)

**Pregunta original:** Al morir un Espectro, ¿cuenta como 1 o 2 cartas enviadas a Extinción (Espectro + Adendei poseído)?

**Ruling:** D21 estableció que Espectro + Adendei poseído se envían AMBOS a Extinción cuando el Espectro muere. Ambas cartas son "cartas enviadas a Extinción" a efectos del conteo hacia la victoria (10 cartas = victoria, p15/b12).

**Implicación:** matar un Espectro en posesión vale 2 cartas para el tracker de victoria.

---

### D35. Efecto propio del Espectro + efecto de la poseída — CERRADA

**Fecha:** 2026-04-19 | **Status:** ✅ RESUELTO (por p14/b16 bullet 4)

**Evidencia directa:** p14/b16 bullet 4:
> *"El Espectro deberá usar su propio Efecto, así como el Efecto, Daño, Descanso, Costo y Energía de la carta Poseída como si fueran suyos. Sin embargo, no se considera que el efecto esté siendo copiado."*

**Ruling:** El Espectro aplica SU propio efecto Y TAMBIÉN el efecto de la poseída. Son aditivos, no excluyentes. Por eso el Espectro puede tener una Pasiva propia (ej. Ariam Axoloespectro) Y además disparar la de la Rava poseída.

**Implicación para D39 (Ruk):** confirma que Ruk tiene Pasiva propia ("copia la Pasiva y costo de 1 Rava") Y además hereda la Pasiva de la Rava poseída. Son 2 Pasivas activas en el Espectro.

---

### D38. Límite de descansos aplica a Espectros — CERRADA por Ramsés

**Fecha:** 2026-04-19 | **Status:** ✅ RESUELTO (ruling Ramsés en Supabase)

**Pregunta:** ¿El límite general de 2 descansos máximos se aplica a Espectros (que a veces tienen stats altas de descanso impresas)?

**Ruling Ramsés:** El límite aplica **igual a Espectros que a Adendei**. No hay excepción por tipo de carta.

**Implicación:** cartas como Kumba (LGRO-033, que es Adendei con efectos basados en descansos) o cualquier Espectro con stat alta de descansos quedan sujetos al techo de 2.

---

### D39. Ruk Espectro Draconiano — snapshot único aplica — CERRADA

**Fecha:** 2026-04-19 | **Status:** ✅ RESUELTO (deriva de D16 + D20)

**Pregunta original:** ¿Cómo funciona la doble Pasiva de Ruk (hereda de poseída + copia su propia Pasiva)?

**Ruling aplicable:**
1. D20 explícitamente menciona: *"la mecánica de copia de Ruk sigue D16 (snapshot único)"*.
2. D16 estableció: toda copia de Pasiva/stats es **snapshot único** al momento de invocación; no hereda cambios posteriores.
3. D35 confirma: el Espectro usa efecto propio + efecto de la poseída (aditivo).

**Implicación resuelta:**
- Ruk posee 1 Rava de Extinción → hereda SU Pasiva (por regla Espectro).
- La Pasiva propia de Ruk ("copia Pasiva y costo de 1 Rava") → apunta a una Rava en Extinción (puede ser otra distinta a la poseída; snapshot único al momento de copiar).
- Si la Pasiva copiada es idéntica a la heredada (misma Rava), ambas fuentes apuntan al mismo efecto pero son instancias separadas que se apilan según reglas generales de apilación de efectos.

**Queda abierta duda de producto:** si 2 inmunidades apiladas cubren 2 ataques o 1 (regla general de apilación, no específica a Ruk).

---

### D44. HandTraps — tensión entre D17 y negación — CERRADA

**Fecha:** 2026-04-19 | **Status:** ✅ RESUELTO (deriva de M4 + D17)

**Pregunta:** ¿Cómo conviven HandTraps con efectos "no pueden ser negados"?

**Ruling:**
- M4 estableció formalmente HandTraps como patrón de p20/b08 (efectos "al ser tomada").
- D17 estableció principio meta: *"el efecto de una carta supercede reglas generales cuando lo declara explícitamente"* (p20/b10).
- Por tanto: una HandTrap puede ser negada por efectos generales de negación (Nirge Los Ocultos, Yailok Contacto Paralizante, etc.) EXCEPTO si la carta declara explícitamente "esta Pasiva no puede ser negada" (ej. Makua Venganza Abisal — no es HandTrap pero sigue la lógica).

**Implicación:** no hay tensión sistémica. Cada HandTrap se evalúa caso por caso según su texto específico.

---

### Refinamientos aplicados al portal comunidad

Las siguientes dudas siguen abiertas pero fueron refinadas con evidencia encontrada al releer rulings existentes:

- **D30** (Virste Reseteo): M14 ya confirmó "original" = valor impreso base. Primera opción cerrada. Duda residual: si "estadísticas" incluye marcas, energía/subtipo, efectos copiados.
- **D36** (múltiples Espectros posesión simultánea): D21 clarificó que la posesión es atómica. Duda residual: si el pool de Extinción se comparte entre Espectros del mismo tipo.
- **D37** (Tlahuelpuchi bloqueando posesión): D21 implica que como la posesión es atómica (sacrificio + vivificación = 1 acción), bloquear el sacrificio bloquea toda la acción. Queda abierta la alternativa de que cartas ya en Extinción puedan poseerse sin pagar sacrificio.

---

### Métricas sesión 2026-04-19

**Dudas totales tracked en sesión:** 52 dudas iniciales (auditoría + consolidación).
**Resueltas:** D1-D14, D16-D24, D27-D29, D32, D34, D35, D38, D39, D44, M2.3-M2.6, M3 parcial, M4, M6, M11, M12, M13, M14, E7, E8, M15-M23 (tentativos) = **40+ rulings**.
**Abiertas (portal comunidad):** 13 — D30, D31, D33, D36, D37, D40, D41, D43, D45, D46, D52, M3, M5.
**Cartas con errata actualizada en cards.json:** 5 (Bomba de Clorofila, Nirge, Ulmor, Kumba, Uragg).
**FAQ oficial integrado:** 7 respuestas (03-07 refinaron dudas del portal, 01-02 agregaron reglas generales).


---

### D41. Activas-Rápidas — ventana de uso en turno rival — CERRADA

**Fecha:** 2026-04-19 | **Status:** ✅ RESUELTO (por p29/b04 del master rulebook)

**Pregunta original:** ¿Cuándo exactamente puede declararse una Activa-Rápida en turno rival? (¿ventana abierta, sólo Fase de Batalla, o análoga a Pasivas-Rápidas?)

**Evidencia directa:** p29/b04 (§6.7.1 Activas):
> *"Las **Activas-Rápidas** funcionan igual que las Activas, pero **también** se pueden usar durante el turno del rival (como respuesta) y **se resuelven tan pronto son declaradas**."*

(Negritas originales del rulebook en: Activas-Rápidas, también, se resuelven tan pronto son declaradas.)

**Ruling:**
- La ventana es **abierta durante TODO el turno rival**, siempre que exista una acción-respuesta disponible ("como respuesta" implica que reactúa a algo del turno rival).
- La resolución es **inmediata** al declararla. No espera ventana de respuesta del rival.
- Es funcionalmente equivalente a una Activa regular + extensión al turno rival.

**Orden de múltiples Activas-Rápidas simultáneas:** aplica por extensión la regla de p29/b06 para Pasivas (ver entrada M22):
> *"el jugador en turno tiene prioridad para la declaración y resolución de una Pasiva y posteriormente se intercalarán las declaraciones y resoluciones de una Pasiva por jugador."*

FAQ-05 oficial lo confirmó para el caso de dos Activas-Rápidas: la segunda espera a que resuelva la primera (no hay "cadena" tipo MTG).

**Implicaciones:**
- No hay fase restringida. Un jugador puede declarar Activa-Rápida en cualquier subfase del turno rival.
- La declaración misma ya ejecuta el efecto (no hay ventana de intervención intermedia para el oponente).
- Entre dos Activas-Rápidas disparadas simultáneamente, el jugador en turno (el rival de quien la usa como respuesta) tiene prioridad.

**Sugerencia v5.2:** p29/b04 ya es clara. Únicamente formalizar en glosario:
> **Activa-Rápida:** Efecto Activo con los mismos costos y consecuencias de descanso que una Activa regular, pero utilizable en cualquier momento del turno rival como respuesta. Se resuelve inmediatamente al declararla. Ante declaraciones simultáneas, el jugador en turno tiene prioridad.


---

### D45. §6.8 Regla 14 "8 turnos de bloqueo" — 8 TOTALES — CERRADA

**Fecha:** 2026-04-19 | **Status:** ✅ RESUELTO (ruling comunidad — Hule vía Supabase)

**Pregunta original:** El rulebook p31/b11 dice *"Si ningún jugador puede hacer daño ni usar efectos para salir en más de 8 turnos..."* — no especifica si son 8 por jugador, 8 rondas o 8 totales.

**Ruling (Hule, 2026-04-19 08:05 UTC):** **8 turnos TOTALES** (= 4 por jugador, alternados).

**Implicación:**
- Condición de cierre por empate técnico se activa más rápido que las otras interpretaciones.
- En una partida bloqueada sin daño mutuo, al turno 9 (contando alternaciones) se declara empate/final según el resto de la regla.
- Pauta rápida para jugadores de mesa: "si pasaron 4 turnos tuyos y 4 míos sin que nadie dañe ni salga del bloqueo, aplica §6.8 #14".

**Sugerencia v5.2:** reescribir p31/b11 eliminando la ambigüedad:
> "Si ningún jugador puede hacer daño ni usar efectos para salir durante **8 turnos consecutivos totales (4 por jugador, alternados)**..."

**Registro Supabase:** tabla `kodem_duda_respuestas`, respuesta id `73cdccc5-3bd3-4f41-80a5-6a0d300e0201`, opción `ocho_totales`, respondent `Hule`.



---

### D25. Hori, Huella de Magma — Costo de Extinción: errata, aplica a TODAS las variantes — CERRADA

**Fecha:** 2026-04-19 | **Status:** ✅ RESUELTO (ruling comunidad — Hule vía Supabase)

**Pregunta original:** SRMR-006 (Super Rara) tiene Costo de Extinción *"Si esta carta es enviada a Extinción, daña 1 pto. a todos los Adendei-Pírico en campo"*. Las otras 3 variantes (EXPO-0006, IDRMP-001, KPRC-022) no lo tienen documentado en `cards.json`. ¿Es errata o diseño deliberado por rareza?

**Ruling (Hule, 2026-04-19 06:13 UTC, opción `errata`):**
> *"En realidad solo no se mapeo el costo del ocr o llm-vision, buen catch."*

**Implicación:**
- El costo de Extinción es una propiedad de la carta "Hori, Huella de Magma", no de la rareza.
- Aplica a **las 4 variantes**: EXPO-0006, IDRMP-001, KPRC-022, SRMR-006.
- `cards.json` se actualizó copiando el `cost_text` de SRMR-006 a las otras 3 (2026-04-19 17:30 UTC).
- Mismo patrón sospechado en Nozi y Zaren SR — pendiente validación similar en siguiente iteración.

**Registro Supabase:** respuesta id `(Hule D25)`, opción `errata`, 2026-04-19 06:13 UTC.


---

### D29. Carta lore puro (sin efecto ni costo) — CERRADA

**Fecha:** 2026-04-19 | **Status:** ✅ RESUELTO (ruling comunidad — Hule vía Supabase)

**Pregunta original:** Existen cartas en `cards.json` sin `effect_text` ni `cost_text`. ¿Edge case válido del diseño o gap de extracción?

**Ruling (Hule, 2026-04-19 07:03 UTC, opción `lore`):**
> *"Seguro es derivado del procesamiento que has hecho antes para clarificar cartas. Pero es básicamente una carta sin efecto o costo."*

**Implicación:**
- Cartas lore puro son válidas por diseño (edge case legítimo).
- El engine no necesita inventar efectos para estos folios — se resuelven como Adendei/Espectros/etc. con solo stats de combate (vida, daño, descansos).
- No son gaps de OCR; son carta intencionalmente vacías de texto de reglas.


---

### M6. "Descansos indicados" en Xakros, Peste — VALOR BASE IMPRESO — CERRADA

**Fecha:** 2026-04-19 | **Status:** ✅ RESUELTO (ruling comunidad — Hule vía Supabase)

**Pregunta original:** *"Todos los Adendei en el campo reciben descansos iguales a los indicados en su respectiva carta"* (Xakros, Peste — IDRMP-022, RAMI-007, RMR-017). ¿"Indicados" = valor base impreso en carta o descansos actuales acumulados?

**Ruling (Hule, 2026-04-19 06:35 UTC, opción `base`):** **Valor base impreso** (estadística original de la carta).

**Implicación:**
- Cuando se resuelva el efecto de Xakros Peste, el engine debe leer `fc.base_rests` (valor impreso), NO `fc.rests` (valor dinámico en juego).
- Esto previene combos abusivos con efectos que reducen/incrementan descansos temporalmente.
- **Implementación:** cuando se añada handler para Xakros Peste en `effects.py`, referenciar `base_rests` del `Card` (vía `get_card(fc.folio).rests`), no del `FieldCard`.

**Registro Supabase:** respuesta id `(Hule M6)`, opción `base`, 2026-04-19 06:35 UTC.


---

### M11. Orden de resolución de efectos simultáneos en ZP — IZQUIERDA → CENTRO → DERECHA — CERRADA

**Fecha:** 2026-04-19 | **Status:** ✅ RESUELTO (ruling comunidad — Hule vía Supabase)

**Pregunta original:** Cuando múltiples cartas en ZP tienen efectos disparados simultáneamente por el mismo trigger, ¿en qué orden se resuelven?

**Ruling (Hule, 2026-04-19 06:38 UTC, opción `izq_centro_der`):** **Izquierda (pos 1) → Centro (pos 2) → Derecha (pos 3)**.

**Implicación:**
- `FieldCard.pos ∈ {1, 2, 3}` donde 1=izquierda, 2=centro, 3=derecha (convención ya establecida en `_make_field_card` del engine).
- El dispatcher `check_passive_triggers` itera `player.field` en orden natural (list iteration), que por construcción respeta 1→2→3. **M11 ✅ satisfecho por construcción.**
- Test de regresión defensivo: `tests/regression/test_m11_field_order_izq_centro_der.py` valida que no se introduzcan `sort/reverse` sobre `player.field` en el dispatcher.
- Combinado con M22/p29/b06: primero jugador en turno resuelve izq→centro→der, luego oponente izq→centro→der.

**Registro Supabase:** respuesta id `(Hule M11)`, opción `izq_centro_der`, 2026-04-19 06:38 UTC.


---

### E7. Grafía `Átlico` en cards.json — convivencia por normalización — CLARIFICACIÓN

**Fecha:** 2026-04-19 | **Status:** 🟢 CLARIFICADA (complementa D26, no la contradice)

**Pregunta original:** ¿Variantes con `Átlíco` (doble tilde) vs `Átlico` (una tilde) en `cards.json` son errata?

**Ruling (Hule, 2026-04-19 06:44 UTC, opción `convivencia`):**
> *"En cards.json maneja a todas sin acento según yo. Es un error de tu lectura de la carta, si revisas con visión SI tiene tilde."*

**Relación con D26 (ruling Ramsés, grafía oficial `Átlico`):**
- **No hay divergencia real.** Son dos niveles distintos:
  - **D26 (Ramsés):** grafía canónica oficial del rulebook impreso y en cartas físicas = `Átlico` (una tilde).
  - **E7 (Hule):** en `cards.json`, los textos están normalizados sin acentos (`Atlico`) por requerimiento del engine. La inconsistencia percibida entre variantes viene de lectura mixta con/sin acentos; el archivo técnico usa la forma sin tilde uniformemente.
- **Fuente de verdad ortográfica:** rulebook v5.1 (con acentos correctos).
- **Fuente de verdad técnica:** `cards.json` (sin acentos por normalización).
- **Pendiente v5.2:** documentar formalmente las 8 Energías en glosario con grafía canónica + nota sobre normalización en `cards.json`.




---

## D30. Definición de "estadísticas" de un Adendei

**Fecha:** 2026-04-19 | **Status:** ✅ RESUELTO (ruling comunidad vía Supabase)

**Pregunta original:** ¿Qué se considera "estadísticas" de una carta Adendei para efectos de copia, modificación o referencia?

**Ruling (u_62a2ebfd, 2026-04-19 20:04 UTC):**
> "Las estadísticas de una carta Adendei están especificadas en el apartado 2.2 en la página 6 del rulebook. Como viene especificado por indicadores de las diferentes partes de la carta que corresponden a una estadística, estas serían: Vida máxima, Tipo, Subtipo, Energía, Ataque, Descanso."

**Ruling complementario (u_8afe616b, 2026-04-19 16:37 UTC):**
> "Daño/descansos/energía" — coincide en el núcleo funcional.

**Implicaciones:**
- **Estadísticas canónicas (6):** Vida máxima, Tipo, Subtipo, Energía, Ataque, Descanso.
- **NO son estadísticas:** efectos copiados (resultado de un efecto, no propiedad de la carta).
- **NO son estadísticas:** los efectos propios de la carta (también se consideran aparte).

**Impacto mecánico:**
- Efectos como "copia las estadísticas" o "comparte estadísticas con X" aplican a las 6 propiedades listadas.
- Efectos copiados (p.ej. por Gloku/D16) NO se propagan recursivamente si el objetivo a su vez copia estadísticas.

**Pendiente v5.2:** consolidar la lista de 6 estadísticas en glosario §9 con referencia a §2.2.

---

## D31. Innegabilidad de ataques y efectos — interpretación y alcance

**Fecha:** 2026-04-19 | **Status:** ✅ RESUELTO (ruling comunidad vía Supabase)

**Pregunta original:** ¿Cómo interpretar las variaciones de formulación de "innegabilidad" en el rulebook (entre expansiones y productos) y qué alcance tiene?

**Ruling (u_62a2ebfd, 2026-04-19 20:36 UTC):**

**1. Origen de la variación de formulación:**
> "La diferencia de formulación ha sido por error en maquetación de redacción o una evolución de la misma a lo largo de las expansiones y productos."

**2. Alcance de la innegabilidad:**
> "La innegabilidad aplica a la variable especificada en esa parte de la frase/efecto, por lo que también se vuelve innegable esa 'declaración'."

**3. Ataques nunca son negables:**
> "Los ataques no pueden ser negados de ninguna manera."
>
> Ejemplos canónicos: **Pruebas de campo**, **Protección Selectiva** — estas cartas NO afectan ataques.

**4. Efectos son protegidos de negación externa:**
> "Los efectos por su parte no son afectados por ningún efecto externo que pueda negar."
>
> Ejemplos canónicos: **Recipiente de vida**, **Zaykan, Anulación** — estas cartas NO niegan efectos de otras cartas.

**Implicancias mecánicas:**
- **Ataques:** siempre se resuelven, no existen mecanismos válidos de negación.
- **Efectos:** inmunes a cartas con cláusulas genéricas de "niega".
- **Declaraciones parciales:** cuando una carta dice "innegable", la innegabilidad se hereda a la parte específica de la frase/efecto referenciada.

**Pendiente v5.2:**
- Unificar la redacción de innegabilidad en todas las cartas que la mencionan.
- Agregar glosario "Innegable" con definición y lista de cartas canónicas que NO aplican (Pruebas de campo, Protección Selectiva, Recipiente de vida, Zaykan Anulación).

---

## D52. Zona y tipo por omisión en efectos/ataques/condiciones

**Fecha:** 2026-04-19 | **Status:** ✅ RESUELTO (ruling comunidad vía Supabase)

**Pregunta original:** Cuando un efecto, ataque o condición no especifica explícitamente tipo de carta ni zona (aliada/rival), ¿a qué aplica?

**Ruling (u_62a2ebfd, 2026-04-19 20:38 UTC):**
> "Cuando un efecto/ataque o en determinados casos condición no indica expresamente algún tipo de carta o zona (ya sea rival o aliada), esa declaración aplica a cualquiera de todas ellas.
>
> En el caso de esta carta, al no indicar si son aliados o la zona principal afectada, se considera tanto a ambas Zonas Principales, como a aliados y rivales que cumplan la condición de ser átlicos."

**Implicancias mecánicas:**
- **Omisión explícita = alcance universal.** Si la carta no nombra aliado/rival/zona, abarca TODO el tablero.
- **Se mantienen las restricciones implícitas por contexto.** Un efecto que lógicamente solo puede aplicarse a cartas en zona X (por verbo o efecto) sigue restringido por esa lógica.
- **Condiciones de tipo/energía se respetan.** "Todos los Adendei-Átlicos" aplica a todos los de esa energía en ambos lados, pero no incluye Adendei de otras energías.

**Patrón de diseño textual:**
- **Explícito narrow:** "Un Adendei-Átlico **aliado**" → solo tu campo.
- **Explícito wide:** "Todos los Adendei-Átlicos en ambos campos" → ambos lados.
- **Omisión = wide implícito:** "Todos los Adendei-Átlicos" → ambos lados (por default según D52).

**Pendiente v5.2:**
- Auditar cartas con patrón de omisión para detectar las que DEBERÍAN ser narrow (aliado/rival específico) y marcarlas como erratas de redacción.
- Agregar nota de interpretación en glosario sobre "alcance por defecto = universal".
