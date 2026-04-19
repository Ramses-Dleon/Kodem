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
_Plan actualizado: 2026-04-19 03:25 UTC — cierre de sesión nocturna._
