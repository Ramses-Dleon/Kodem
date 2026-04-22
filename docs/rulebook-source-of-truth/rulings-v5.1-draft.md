# Rulings oficiales — Master Rulebook v5.1

Resoluciones de dudas sobre ambigüedades e inconsistencias detectadas durante la revisión completa del master-rulebook v5.1.

Fuente: Ramsés D'León (autor/mantenedor), Telegram "Logos: Kodem" (chat `-1003700827993`).

---

---
id: D1
canonical_id: D1
version: 1
parent: null

type: aclaracion
status: resuelto
status_method: autor

date_created: 2026-04-19
date_revised: null

authority:
  role: autor
  name: Ramsés
  validated_by: []

tags: [energias, glosario, numeracion]

cards_explicit: []

rulebook_refs:
  - p06
  - p07/b08
  - p09/b01

derived_from: []
supersedes: []
related: []
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

---
id: D3
canonical_id: D3
version: 1
parent: null

type: aclaracion
status: resuelto
status_method: autor

date_created: 2026-04-19
date_revised: null

authority:
  role: autor
  name: Ramsés
  validated_by: []

tags: [rava, zona-principal, ataques, targeting, vida]

cards_explicit: []

rulebook_refs: []

derived_from: []
supersedes: []
related: []
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
---
id: D5
canonical_id: D5
version: 1
parent: null

type: meta-regla
status: resuelto
status_method: autor

date_created: 2026-04-19
date_revised: null

authority:
  role: autor
  name: Ramsés
  validated_by: []

tags: [fuera-de-juego, zona-principal, extincion, glosario, visibilidad]

cards_explicit:
  - folio: TCOO-006U
    name: "Quam, Detrás de la Materia"
    role: carta-central

rulebook_refs:
  - p20/b07
  - p25/b06

derived_from: []
supersedes: []
related: [D18]
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
---
id: D6
canonical_id: D6
version: 1
parent: null

type: meta-regla
status: resuelto
status_method: autor

date_created: 2026-04-19
date_revised: null

authority:
  role: autor
  name: Ramsés
  validated_by: []

tags: [descansos, adendei, rava, tokens, protector, zona-principal, prerrequisito]

cards_explicit: []

rulebook_refs:
  - p27/b09

derived_from: []
supersedes: []
related: [D4]
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
---
id: D7
canonical_id: D7
version: 1
parent: null

type: meta-regla
status: resuelto
status_method: autor

date_created: 2026-04-19
date_revised: null

authority:
  role: autor
  name: Ramsés
  validated_by: []

tags: [limitadas, formato-estandar, extendido, multijugador, numeracion]

cards_explicit:
  - folio: FYTE-Zotz
    name: "Zotz (Limitada 0)"
    role: ejemplo
  - folio: FYTE-Tekei
    name: "Tekei (Limitada 1)"
    role: ejemplo

rulebook_refs:
  - p14/b11
  - p36
  - p37
  - p40

derived_from: []
supersedes: []
related: [D51]
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
---
id: D10
canonical_id: D10
version: 1
parent: null

type: meta-regla
status: resuelto
status_method: autor

date_created: 2026-04-19
date_revised: null

authority:
  role: autor
  name: Ramsés
  validated_by: []

tags: [turno, fase-previa, costos, prerrequisito]

cards_explicit:
  - folio: LGRO-065
    name: "Yakerr, Hogar"
    role: carta-central

rulebook_refs: []

derived_from: []
supersedes: []
related: []
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
---
id: D8
canonical_id: D8
version: 1
parent: null

type: meta-regla
status: resuelto
status_method: autor

date_created: 2026-04-19
date_revised: null

authority:
  role: autor
  name: Ramsés
  validated_by: []

tags: [ataques, targeting, visibilidad, zona-principal]

cards_explicit: []

rulebook_refs:
  - p31/b06

derived_from: []
supersedes: []
related: []
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
---
id: D2
canonical_id: D2
version: 1
parent: null

type: meta-regla
status: resuelto
status_method: autor

date_created: 2026-04-19
date_revised: null

authority:
  role: autor
  name: Ramsés
  validated_by: []

tags: [turno, fase-batalla, activas, numeracion, cross-ref]

cards_explicit: []

rulebook_refs:
  - p17/b01

derived_from: []
supersedes: []
related: []
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
---
id: D9
canonical_id: D9
version: 1
parent: null

type: meta-regla
status: resuelto
status_method: autor

date_created: 2026-04-19
date_revised: null

authority:
  role: autor
  name: Ramsés
  validated_by: []

tags: [tokens, vida, copia]

cards_explicit:
  - folio: TCDE-015
    name: "Gloku, Trituración"
    role: ejemplo
  - folio: TCDE-008
    name: "Dagg, Abismo Feral"
    role: ejemplo

rulebook_refs: []

derived_from: []
supersedes: []
related: [D16, M7]
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
---
id: D4
canonical_id: D4
version: 1
parent: null

type: meta-regla
status: resuelto
status_method: autor

date_created: 2026-04-19
date_revised: null

authority:
  role: autor
  name: Ramsés
  validated_by: []

tags: [protector, descansos, extincion, vida]

cards_explicit: []

rulebook_refs:
  - p08/b08
  - p20/b05

derived_from: []
supersedes: []
related: [D6]
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
---
id: D11
canonical_id: D11
version: 1
parent: null

type: aclaracion
status: resuelto
status_method: autor

date_created: 2026-04-19
date_revised: null

authority:
  role: autor
  name: Ramsés
  validated_by: []

tags: [espectros, adendei, numeracion]

cards_explicit: []

rulebook_refs:
  - p14/b21

derived_from: []
supersedes: []
related: [D20]
---
## D11. Espectros: límite recomendado

**Fecha:** 2026-04-19
**Status:** ✅ RESUELTO

**Ruling:** La recomendación de "máximo 4" en p14/b21 se refiere a **4 cartas Espectro específicamente**, dentro del total de 24 cartas Adendei + Espectros en el Mazo Principal.

**Sugerencia v5.2:** reescribir p14/b21 para eliminar ambigüedad:
> "Se podrán incluir cualquier número de cartas Espectro en el Mazo, respetando un máximo de 24 cartas Adendei y Espectros en el Mazo Principal, aunque se recomienda llevar máximo **4 Espectros** dentro de ese total."

---

---
id: D12
canonical_id: D12
version: 1
parent: null

type: aclaracion
status: resuelto
status_method: autor

date_created: 2026-04-19
date_revised: null

authority:
  role: autor
  name: Ramsés
  validated_by: []

tags: [numeracion, glosario]

cards_explicit: []

rulebook_refs:
  - p30
  - p31
  - p32
  - p33

derived_from: []
supersedes: []
related: []
---
## D12. Numeración de Restricciones (p30-p33)

**Fecha:** 2026-04-19
**Status:** ✅ RESUELTO

**Ruling:** Las listas en p30-p33 son **dos listas conceptualmente separadas**, no una lista continua mal numerada:

1. **Generalidades de las Restricciones e Interacciones** (p30-p31): puntos 1-17.
2. **Tipos de Restricciones** (p31-p33): puntos 1-8. La numeración reinicia intencionalmente porque es una nueva lista temática.

**Sugerencia v5.2:** agregar separación visual más clara (encabezado H2 con más aire, regla horizontal, cambio tipográfico) entre ambas secciones para evitar que el lector las perciba como continuas.

---
---
id: D13
canonical_id: D13
version: 1
parent: null

type: aclaracion
status: resuelto
status_method: autor

date_created: 2026-04-19
date_revised: null

authority:
  role: autor
  name: Ramsés
  validated_by: []

tags: [glosario, cross-ref, numeracion]

cards_explicit: []

rulebook_refs:
  - p19
  - p24
  - p25
  - p39

derived_from: []
supersedes: []
related: [D14]
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
---
id: D14
canonical_id: D14
version: 1
parent: null

type: errata
status: resuelto
status_method: autor

date_created: 2026-04-19
date_revised: null

authority:
  role: autor
  name: Ramsés
  validated_by: []

tags: [numeracion, cross-ref, errata]

cards_explicit: []

rulebook_refs:
  - p03
  - p16/b06
  - p16/b09
  - p16/b10
  - p16/b11

derived_from: []
supersedes: []
related: [D13]
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
---
id: D17
canonical_id: D17
version: 1
parent: null

type: meta-regla
status: resuelto
status_method: autor

date_created: 2026-04-19
date_revised: null

authority:
  role: autor
  name: Ramsés
  validated_by: []

tags: [meta-regla, efectos, extincion, costos]

cards_explicit:
  - folio: TCOO-006U
    name: "Quam, Detrás de la Materia"
    role: ejemplo

rulebook_refs:
  - p20/b10
  - p25/b06

derived_from: []
supersedes: []
related: [D5, D48]
---
## D17. Efectos que persisten post-Extinción

**Fecha:** 2026-04-19
**Status:** ✅ RESUELTO

**Ruling (principio meta):** El efecto o costo de una carta **supercede las reglas generales del rulebook cuando lo declara explícitamente**. Esta regla ya está establecida en p20/b10 del rulebook:

> "Se aplicarán en todo momento los lineamientos de este documento a menos que el texto de una carta indique explícitamente lo contrario."

**Aplicación a Quam, Detrás de la Materia (TCOO-006U):** la cláusula *"aún si esta carta ya no está en el campo"* es una excepción legal al principio general de p25/b06 (*"Si una carta deja el campo y su efecto está condicionado a 'estar disponible', el efecto no continuará en uso"*), porque Quam lo declara explícitamente.

**Implicancia:** este patrón es extensible a cualquier carta actual o futura que incluya cláusulas similares ("aún si", "aunque", "a pesar de", etc.) para anular reglas generales. El equipo de diseño puede usarlo como recurso de diseño documentado.

---

---
id: D18
canonical_id: D18
version: 1
parent: null

type: aclaracion
status: resuelto
status_method: autor

date_created: 2026-04-19
date_revised: null

authority:
  role: autor
  name: Ramsés
  validated_by: []

tags: [fuera-de-juego, visibilidad, extincion]

cards_explicit: []

rulebook_refs: []

derived_from: []
supersedes: []
related: [D5]
---
## D18. Inspección de la Zona Fuera del Juego

**Fecha:** 2026-04-19
**Status:** ✅ RESUELTO

**Ruling:** La Zona Fuera del Juego es **inspeccionable en cualquier momento por ambos jugadores**. Es información pública, equivalente a Extinción en términos de visibilidad.

**Implicación práctica:** un jugador puede solicitar en cualquier momento de la partida revisar qué cartas están acumuladas en Fuera del Juego (rival o propias).

---

---
id: D19
canonical_id: D19
version: 1
parent: null

type: aclaracion
status: resuelto
status_method: autor

date_created: 2026-04-19
date_revised: 2026-04-22

authority:
  role: autor
  name: Ramsés
  validated_by: []

tags: [turno, descansos, pasivas, activas, bio, sinergia]

cards_explicit:
  - folio: IDRMP-022
    name: "Xakros, Peste"
    role: ejemplo

rulebook_refs: []

derived_from: []
supersedes: []
related: [D10, D17, M6]
---
## D19. ¿Existen cartas que fuerzan "pasar turno"?

**Fecha:** 2026-04-19
**Status:** ✅ RESUELTO (con reserva: área de diseño emergente)

**Ruling:** Actualmente **no existe una carta que fuerce explícitamente al rival a "pasar turno"** como efecto declarado. Sin embargo:

- En la **práctica** sí puede ocurrir un estado de **parálisis de facto**: si todos los Adendei y el Protector del jugador activo están en descanso al inicio del turno, ese jugador tiene opciones muy limitadas para declarar ataque o Activa de Adendei/Protector.
- El **rival puede inducir este estado** con efectos que dan descansos masivos (ejemplo: Xakros, Peste — "Todos los Adendei en el campo reciben descansos iguales a los indicados en su respectiva carta").
- Es un **caso emergente del sistema**, no una mecánica declarada explícitamente.
- **Diseño futuro:** cartas en próximas expansiones que digan "el rival debe pasar turno" serían válidas bajo el principio meta establecido en D17 (efecto de carta supercede reglas generales).

**⚠️ Aclaración crítica — el jugador paralizado NO está sin opciones (aclarado por Ramsés 2026-04-22):**

Aunque todas sus cartas estén en descanso, el jugador activo conserva varias vías de interacción y de escape:

1. **Escape vía Bioma (Bio) → Extinción:** puede mandar su Bioma a extinción para **actualizar 1 descanso a TODAS sus cartas**. Esto lo saca del estado de parálisis y le devuelve capacidad de acción en el mismo turno.
2. **Pasivas de Adendei:** las habilidades pasivas siguen operando aunque el Adendei esté en descanso (salvo que el texto de la pasiva diga lo contrario).
3. **Pasivas de Equipos:** las pasivas de Equipos también siguen activas sin importar el estado de descanso del Adendei portador.
4. **Activas de Equipos:** las Activas de Equipos **sí se pueden utilizar** aunque el Adendei portador esté en descanso (el estado de descanso afecta a la carta Adendei/Protector, no al Equipo como fuente de Activa).

Por eso "pasar turno de facto" es impreciso: en Kodem el jugador paralizado sigue teniendo agencia a través del Bioma, pasivas y Activas de Equipos. Solo queda verdaderamente bloqueado si además ya gastó/perdió su Bioma y no tiene Equipos con Activas disponibles.

**Sugerencia v5.2:** enriquecer la definición de "Pasar Turno" en el glosario:
> "**Pasar Turno:** acción voluntaria del jugador activo al inicio de su turno para saltar directamente a Fin de Turno. Un jugador con todas sus cartas en descanso **no está obligado a pasar turno**: puede aún mandar su Bioma a extinción (actualiza 1 descanso a todas sus cartas), activar pasivas de Adendei/Equipos y usar Activas de Equipos. Efectos futuros podrían hacer "pasar turno" obligatorio por texto de carta."

---
---
id: D16
canonical_id: D16
version: 1
parent: null

type: ruling-carta
status: resuelto
status_method: autor

date_created: 2026-04-19
date_revised: 2026-04-22

authority:
  role: autor
  name: Ramsés
  validated_by: [Ambir]

tags: [copia, tokens, extincion, stacking, espectros, pasivas]

cards_explicit:
  - folio: TCDE-015
    name: "Gloku, Trituración"
    role: carta-central
  - folio: FYTE-048
    name: "Ruk, Espectro Draconiano"
    role: ejemplo

rulebook_refs: []

derived_from: []
supersedes: []
related: [D9, D22, M7, D51]
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

---
id: D20
canonical_id: D20
version: 1
parent: null

type: meta-regla
status: resuelto
status_method: autor

date_created: 2026-04-19
date_revised: 2026-04-22

authority:
  role: autor
  name: Ramsés
  validated_by: []

tags: [espectros, posesion, vida, extincion, adendei, vivificacion]

cards_explicit:
  - folio: FYTE-003K
    name: "Ariam, Axoloespectro"
    role: ejemplo
  - folio: FYTE-005U
    name: "Zaykan, Lagarto Fantasma"
    role: ejemplo
  - folio: FYTE-013R
    name: "Aki, Brinco Espectral"
    role: ejemplo
  - folio: FYTE-014R
    name: "Yakerr, Aullido Espectral"
    role: ejemplo
  - folio: FYTE-015R
    name: "Nanuk, Garras Heladas"
    role: ejemplo
  - folio: FYTE-048
    name: "Ruk, Espectro Draconiano"
    role: ejemplo
  - folio: FYTE-007R
    name: "Tlahuelpuchi, Invocación Espectral"
    role: referencia
  - folio: FYTE-021R
    name: "Espectrosaurios"
    role: contraejemplo

rulebook_refs: []

derived_from: []
supersedes: []
related: [D11, D21, D22, D36, D37, D47]
---
## D20. Espectros — vida máxima, posesión y requisitos

**Fecha:** 2026-04-19
**Status:** ✅ RESUELTO (+ D21 cerrada, D22 v3 resuelta con herencia dinámica 2026-04-22)

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
- **D22:** ¿El Espectro hereda alguna stat del Adendei poseído? → **✅ RESUELTA 2026-04-22 — herencia dinámica de 5 atributos (Efecto/Daño/Descanso/Costo/Energía). Vida y Subtipo conservados por el Espectro. Ver D22 v3 + D22b (distinción con copia).**

**Sugerencia v5.2:** agregar sección formal §3.7 Espectros con:
- Declaración de que vida se lee de cada carta
- Mecánica de posesión como VIVIFICACIÓN (ver D21)
- Adendei poseído se coloca BAJO el Espectro en Zona Principal
- Al llegar a 0 de vida, ambos a Extinción
- Intercambio instantáneo como operación atómica
- Que la mecánica de copia de Ruk sigue D16 (snapshot único)

---

---
id: D21
canonical_id: D21
version: 1
parent: null

type: meta-regla
status: resuelto
status_method: autor

date_created: 2026-04-19
date_revised: null

authority:
  role: autor
  name: Ramsés
  validated_by: []

tags: [espectros, posesion, vivificacion, extincion, zona-principal, adendei, glosario]

cards_explicit:
  - folio: FYTE-007R
    name: "Tlahuelpuchi, Invocación Espectral"
    role: referencia
  - folio: TCOO-006U
    name: "Quam, Detrás de la Materia"
    role: contraejemplo

rulebook_refs: []

derived_from: []
supersedes: []
related: [D5, D20, D22, D36, D47, M2]
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

---
id: D22
display_id: "D22 v3"
canonical_id: D22
version: 3
parent: null

type: meta-regla
status: resuelto
status_method: autor

date_created: 2026-04-19
date_revised: 2026-04-22

authority:
  role: autor
  name: Ramsés
  validated_by: []

tags: [espectros, posesion, copia, sinergia, efectos, descansos, energias, costos]

cards_explicit:
  - folio: FYTE-003K
    name: "Ariam, Axoloespectro"
    role: ejemplo
  - folio: FYTE-048
    name: "Ruk, Espectro Draconiano"
    role: ejemplo

rulebook_refs:
  - p14/b10
  - p14/b12
  - p14/b13
  - p14/b16
  - p14/b21

derived_from: []
supersedes: []
related: [D16, D17, D20, D21, D22b, D22c]
---
## D22. Herencia de stats del Adendei poseído — ✅ HERENCIA DINÁMICA DE 5 ATRIBUTOS (RESUELTA 2026-04-22)

**Fecha:** 2026-04-19 (revisión 1: 2026-04-22 AM; revisión 2 final: 2026-04-22 14:15 UTC)
**Status:** ✅ RESUELTA — herencia dinámica de 5 atributos

> ⚠️ **Historial de revisiones:**
> - v1 (2026-04-19): "NO hay herencia" — incorrecto.
> - v2 (2026-04-22 AM): herencia parcial de 3 atributos (Efecto/Daño/Descanso), snapshot — parcialmente incorrecto.
> - **v3 (2026-04-22 PM, esta versión):** herencia dinámica de 5 atributos. El master rulebook `p14/b16 b4` es canon; las dos fuentes se reconcilian con respuestas de Ramsés a P1–P3.

**Ruling canonical:**

Al poseer un Adendei, el Espectro **hereda dinámicamente** del poseído los siguientes atributos:

| Atributo | ¿Hereda? | Fuente |
|----------|:---:|--------|
| **Efecto** (Pasiva / Activa) | ✅ Sí | Adendei poseído (+ el Espectro suma el suyo propio si lo tiene) |
| **Daño** | ✅ Sí | Adendei poseído (dinámico: escalas/descensos lo modifican en tiempo real) |
| **Descansos** | ✅ Sí | Adendei poseído |
| **Costo** | ✅ Sí | Adendei poseído |
| **Energía** | ✅ Sí | Adendei poseído |
| **Vida** | ❌ No | Espectro conserva la propia (marcada en su texto, per p14/b21) |
| **Subtipo** | ❌ No | Espectro conserva el propio (típicamente "Sin subtipo" per callout p14/b13) |

### Reconciliación con el master rulebook

El texto `p14/b16 bullet 4` dice: *"El Espectro deberá usar su propio Efecto, así como el Efecto, Daño, Descanso, Costo y Energía de la carta Poseída como si fueran suyos. Sin embargo, no se considera que el efecto esté siendo copiado."*

La frase *"no se considera que el efecto esté siendo copiado"* es la **clave conceptual**: la herencia **NO es copia**. Es por eso que D17 (meta-regla de copia = snapshot) **no aplica** a la posesión de Espectros. Ver distinción en D22b abajo.

Los callouts de anatomía `p14/b10 (Descanso: 0)`, `p14/b12 (Energía: Sin energía)` y `p14/b13 (Subtipo: Sin subtipo)` describen el **estado base del Espectro sin poseer**. Al poseer, los 3 primeros (Descanso + Energía) son reemplazados por los del poseído; Subtipo se conserva como propio del Espectro.

### P1 — Energía sí se hereda

Ramsés (2026-04-22 14:15 UTC): *"P1 me auto corrijo si hereda la energia, más bien es que actual mente no hay ningún impacto en si es de x energía o no pues no hay efectos que potencien espectros de x energía. La respuesta es SI."*

**Implicación:** el Espectro adopta la energía del poseído. Por ahora no hay cartas que filtren por energía en Espectros, pero la regla queda establecida para diseño futuro.

### P2 — Costo sí se hereda (con co-envío a Extinción)

Ramsés (2026-04-22 14:15 UTC): *"si, el adendei poseído tiene costo siempre se paga el costo del adendei poseído si el costo para usar su activa o pasiva es mandarse a extinción se paga y se va a extinción el espectro y el adendei poseído"*

**Implicación crítica:** si el Costo del poseído es "enviar esta carta a Extinción" (o similar self-sacrifice), al pagarlo **se van AMBAS cartas a Extinción** (Espectro + poseído). Esto se alinea con D21 (al morir el Espectro, co-envío a Extinción del stack completo): el costo de auto-destrucción rompe la unión de posesión y arrastra a ambos.

### P3 — Herencia **dinámica**, no snapshot

Ramsés (2026-04-22 14:15 UTC): *"si te refieres a las escalas o descensos? La respuesta es B) dinámica pues el espectro ya tiene un daño fijo a la hora de poseer daño que puede ser afectado por escalas y/o decensos. Osea por ejemplo tengo ariam,axolospectro si poseyo a ariam modo catrin un 4-2 y luego por efecto de otra carta lo modifican ya sea escala o decensos si se puede cambiar como 3-2 o 5-2"*

**Ejemplo canónico:**

1. `Ariam, Axoloespectro` (FYTE-003K) posee a `Ariam, Modo Catrín` (4/2).
2. El Espectro opera con stats 4/2 heredados.
3. Llega un efecto que aplica +1 daño (escala) al Adendei poseído. → El Espectro pasa a **5/2 en tiempo real**.
4. Llega un descenso de -1 daño. → El Espectro pasa a **3/2**.
5. Estos cambios son **persistentes mientras el Espectro posea a ese Adendei**.

**Implicación:** los efectos que modifiquen el Adendei poseído (escalas/descensos/alteraciones de daño o descansos) **sí afectan al Espectro en tiempo real**. El Espectro es una ventana funcional sobre el poseído, no una copia estática.

---

---
id: D22b
display_id: "D22b"
canonical_id: D22
version: 1
parent: D22

type: meta-regla
status: resuelto
status_method: derivacion

date_created: 2026-04-22
date_revised: null

authority:
  role: logos-derivado
  name: Logos
  validated_by: [Ramsés]

tags: [copia, posesion, espectros, glosario, meta-regla]

cards_explicit:
  - folio: TCDE-015
    name: "Gloku, Trituración"
    role: contraejemplo
  - folio: TCDE-008
    name: "Dagg, Abismo Feral"
    role: contraejemplo
  - folio: FYTE-048
    name: "Ruk, Espectro Draconiano"
    role: ejemplo
  - folio: FYTE-003K
    name: "Ariam, Axoloespectro"
    role: ejemplo

rulebook_refs:
  - p14/b16

derived_from: [D22, D16, D17]
supersedes: []
related: [D9, M7]
---
## D22b. Herencia (posesión) ≠ Copia (mecánica general) — Distinción formal

**Fecha:** 2026-04-22
**Status:** ✅ RESUELTA (derivada de D22 v3)

**Ruling:** Existen dos mecánicas conceptualmente distintas en Kodem que comparten superficialmente la idea de "tomar stats de otra carta", pero operan con reglas opuestas:

| Mecánica | Fuente | Temporalidad | Regla | Ejemplos |
|----------|--------|-------------|-------|----------|
| **Copia** | D17, D16 (meta-regla) | Snapshot único | Los cambios posteriores NO se propagan | Gloku (TCDE-015), Dagg (TCDE-008) |
| **Herencia (posesión)** | D22 | Dinámica en tiempo real | Los cambios al poseído Sí se propagan al Espectro | Todos los Espectros poseyendo |

**Por qué son distintas:**

El master `p14/b16 b4` dice literalmente *"no se considera que el efecto esté siendo copiado"*. Esta frase **excluye explícitamente** a la posesión del dominio de la mecánica de copia. Por tanto:

- **Ruk, Espectro Draconiano** (FYTE-048) es un caso híbrido documentado en D39: su Pasiva propia **sí copia** (snapshot único vs una Rava) Y además **hereda** (dinámica) de la Rava poseída. Dos mecánicas conviviendo en la misma carta.
- **Gloku** (token con stats copiadas) queda congelado aunque el Adendei fuente cambie después.
- **Ariam Axoloespectro** poseyendo a Ariam Catrín → cambia en tiempo real con cada escala/descenso aplicada al Catrín.

**Implicación v5.2:**

Agregar al glosario §9:

> **Copia:** Snapshot único al momento de activación. Cambios posteriores en la fuente NO se propagan. Ejemplo: Gloku crea un Token con stats copiadas.
>
> **Herencia (posesión):** Unión dinámica entre Espectro y Adendei poseído. El Espectro usa en tiempo real el Efecto, Daño, Descanso, Costo y Energía del poseído (ver D22). Los cambios al poseído se propagan al Espectro mientras dure la posesión. No es copia.

---

---
id: D22c
display_id: "D22c"
canonical_id: D22
version: 1
parent: D22

type: ruling-carta
status: resuelto
status_method: autor

date_created: 2026-04-22
date_revised: null

authority:
  role: autor
  name: Ramsés
  validated_by: []

tags: [espectros, posesion, ataques, efectos, vida, stacking]

cards_explicit: []

rulebook_refs:
  - p14/b19

derived_from: []
supersedes: []
related: [D21, D22, D22b, D49]
---
## D22c. Absorción total — TODO daño al stack entra al Espectro — CERRADA

**Fecha:** 2026-04-22 16:53 UTC
**Status:** ✅ RESUELTA por Ramsés (autor/diseño)

**Ruling de Ramsés (verbatim):**
> *"En cualquier caso ese daño siempre entra al espectro."*

**Cubre ambos escenarios:**
1. **Ataque dirigido al Espectro** (target-Espectro).
2. **Daño genérico "sobre la carta poseída"** (o cualquier fraseo que no distinga bando del stack).

En los dos casos **el daño entra a la vida del Espectro**. La carta poseída no acumula daño propio mientras esté bajo el Espectro; está inerte como pila física debajo del stack.

**Fundamento textual (`p14/b19 b1`):**
> *"Las cartas que hayan sido poseídas se consideran de este tipo (poseídas) perdiendo su tipo y subtipo original mientras se encuentren sobre un Espectro."*

El poseído pierde su identidad propia como objetivo independiente, por tanto los efectos de daño no lo reconocen como carta separada con vida propia. El Espectro es la **superficie funcional única** del stack para recibir daño.

**Relación con D22 v3 (herencia dinámica):**
- Las **escalas/descensos** sobre el poseído (modificadores de stats) sí afectan al Espectro vía herencia (ejemplo Axoloespectro + Catrín 4-2 → 3-2 / 5-2 en tiempo real).
- El **daño directo** va siempre al Espectro (este ruling, D22c).
- No hay contradicción: modificadores de stat ≠ daño. Son dos mecánicas distintas sobre la misma unión.

**Consecuencias operativas:**
- Un efecto "daña 3 a la carta poseída por el Espectro" = daña 3 al Espectro.
- Un ataque dirigido al Espectro = daño normal al Espectro.
- Cuando el Espectro llega a 0 de vida → Espectro + poseído a Extinción juntos (D21).

**Implicaciones para el engine:**
- Cualquier handler de daño que apunte a un `FieldCard` tipo-poseída debe redirigir al `FieldCard` del Espectro que lo contiene.
- No se mantiene "vida del poseído" como estado rastreable mientras esté bajo el Espectro.

---

### Triada Espectros — CERRADA COMPLETA

Con D22c, la triada de herencia de Espectros queda sellada:

| Ruling | Qué resuelve | Status |
|--------|--------------|:-----:|
| **D22 v3** | Qué hereda (5 atributos dinámicos) | ✅ |
| **D22b** | Herencia ≠ Copia (mecánicas distintas) | ✅ |
| **D22c** | Todo daño entra al Espectro | ✅ |

---

---
id: D46
canonical_id: D46
version: 1
parent: null

type: aclaracion
status: resuelto
status_method: autor

date_created: 2026-04-22
date_revised: null

authority:
  role: autor
  name: Ramsés
  validated_by: []

tags: [rava, extendido, limitadas, unicidad-campo]

cards_explicit: []

rulebook_refs:
  - p14/b11
  - p36
  - p37
  - p40

derived_from: [D7]
supersedes: []
related: [D7, D51]
---
## D46. Formato Extendido — Rava admite copias libres — CERRADA

**Fecha:** 2026-04-22 16:53 UTC
**Status:** ✅ RESUELTA por Ramsés (autor/diseño)

**Ruling verbatim:** *"Copias libres de Rava."*

**Implicación:**
- En Formato Extendido, un mazo puede incluir **múltiples copias del mismo Rava** (3 copias del mismo folio con mismo nombre completo).
- Los Ravas no están en la lista de Cartas Limitadas (`p36-p37/p40`), por tanto no aplica restricción ahí; y la regla universal de "1 copia por nombre completo" (D7) sólo aplica al Formato Estándar, no al Extendido.
- El único límite que aplica a Ravas en Extendido es el **límite de tipo** ya establecido en `p14/b11`: máximo **2 Ravas** por mazo. 2 copias del mismo Rava satura ese límite.

**Relación con D7:**
- D7 estableció: "1 copia por carta" en Estándar, pero en Extendido aplica sólo la lista de Limitadas.
- D46 confirma la lectura permisiva: lo que no está prohibido en la lista de Limitadas está permitido en Extendido.

**Diseño de decks Extendido:**
- Viable incluir 2 Ravas idénticos (ej. 2× Ariam Protector, o 2× un Rava temático del arquetipo).
- Crea sinergias de redundancia: si se extingue 1 Rava, el duplicado sigue disponible en mazo.
- Stack de 2 Ravas idénticos en Extinción no es posible mientras sólo haya 2 en el mazo total — cuando ambos salen al campo, cambian roles de protección/mazo.

**Pendiente v5.2:**
- Formalizar en sección §Formato Extendido: *"En Formato Extendido se permiten múltiples copias de la misma carta salvo que aparezca en la lista de Cartas Limitadas. Aplican los límites de tipo del Mazo Principal (24 Adendei+Espectros, 2 Ravas, 1 Protector, 5 Ixim, 5 Rot, 1 Bio)."*

---

---
id: M12 residual
display_id: "M12 residual"
canonical_id: M12
version: 1
parent: M12

type: meta-regla
status: resuelto
status_method: autor

date_created: 2026-04-22
date_revised: null

authority:
  role: autor
  name: Ramsés
  validated_by: []

tags: [pasivas, activas, descansos, meta-regla]

cards_explicit:
  - folio: LGRO-065
    name: "Yakerr (Vínculo Odémico)"
    role: ejemplo

rulebook_refs:
  - p20/b10
  - p29/b06
  - p29/b09

derived_from: []
supersedes: []
related: [M12]
---
## M12 residual — Pasiva-Rápida promovida a Activa-Rápida: sólo velocidad — CERRADA

**Fecha:** 2026-04-22 16:57 UTC
**Status:** ✅ RESUELTA por Ramsés (autor/diseño)

**Ruling verbatim:**
> *"Una pasiva rápida sólo da velocidad, correcto."*

**Ruling:**
- Cuando un efecto promueve una Pasiva a Pasiva-Rápida, o cuando una carta tiene Pasiva-Rápida impresa (Ryptor Jugada Veloz, Yakerr Vínculo Odémico, etc.), la promoción **sólo altera la ventana de uso** (permite respuesta en turno rival + resolución inmediata según `p29/b09`).
- **No altera la mecánica de descansos.** La carta sigue siendo Pasiva en su naturaleza y por tanto sigue aplicando `p29/b06`: *"una carta no descansará al final del turno por declarar una Pasiva."*

**Consecuencia operativa:**
- Declarar una Pasiva-Rápida (o una Pasiva promovida a rápida) **no genera descanso automático** para la carta que la declara.
- Si la carta tiene costos de descanso **impresos** en el texto de la Pasiva, esos sí se pagan (son costos declarados, no automáticos).

**Diferencia con Activa-Rápida:**
- Activa-Rápida sí descansa al Fin de Turno (es Activa en su naturaleza, sólo tiene ventana de uso ampliada).
- Pasiva-Rápida no descansa al Fin de Turno (es Pasiva en su naturaleza).
- La **velocidad** es la única propiedad que comparten; el comportamiento de descanso se determina por el **tipo base** (Activa vs Pasiva).

**Aplicación a Ryptor y Yakerr:**
- Ryptor Jugada Veloz (LGRO-xxx) y Yakerr Vínculo Odémico (LGRO-065) conservan economía de descansos ligera al usar sus Pasivas-Rápidas.
- No hay double-cost (descanso automático + costo impreso). Sólo el costo impreso se paga.

**Fundamento textual:**
- `p29/b06`: *"A diferencia de las Activas, una carta no descansará al final del turno por declarar una Pasiva."*
- `p29/b09`: *"Pasivas-Rápidas: Se usan durante cualquier turno, únicamente en respuesta a revelación, eliminación de cartas o declaración de otras Pasivas. Se resuelven tan pronto son declaradas."*
- La regla de no-descanso aplica a Pasivas en general; `p29/b09` define la ventana de rápida pero no crea excepción a la regla de descanso.

**Meta-regla `p20/b10`** aplica: lo general (no descanso por Pasiva) prevalece salvo texto de carta que lo contradíga explícitamente.

---

---
id: D33 residual
display_id: "D33 residual"
canonical_id: D33
version: 1
parent: D33

type: aclaracion
status: resuelto
status_method: autor

date_created: 2026-04-22
date_revised: null

authority:
  role: autor
  name: Ramsés
  validated_by: []

tags: [espectros, ataques, triggers, posesion, costos]

cards_explicit: []

rulebook_refs:
  - p14/b16

derived_from: [D33]
supersedes: []
related: [D33, D49, FAQ-03]
---
## D33 residual — Ataque sin poseído SÍ puede disparar triggers — CERRADA

**Fecha:** 2026-04-22 16:57 UTC
**Status:** ✅ RESUELTA por Ramsés (autor/diseño)

**Ruling verbatim:**
> *"Correcto, también sí puede llegar a disparar algunos triggers."*

**Ruling:**
- Cuando un Espectro sin carta poseída ataca pagando doble vida aliada (per `p14/b16 b6`), el ataque **sí sucede** y por tanto **puede disparar triggers** tipo *"si esta carta ataca"*.
- El modo-pobre de ataque es un **pago alternativo del costo de daño**, no un ataque degénero distinto. El evento "ataque" se instancia normalmente.

**Confirmación por simetría con FAQ-03:**
- FAQ-03 establece que un ataque **negado** no dispara triggers porque *"el ataque no sucedió"*.
- Por simetría: un ataque que **sí sucedió** (aunque sea pagando vida aliada) cumple el evento-disparador.
- El pago alternativo no cambia la naturaleza del evento, sólo el costo.

**Matiz "algunos triggers":**
Ramsés añade *"algunos triggers"* (no todos), lo que sugiere que el disparo depende de la redacción específica del trigger:
- **Triggers genéricos "si ataca"** → disparan normalmente (el ataque sucedió).
- **Triggers condicionados al daño infligido** → dependen de si el ataque logró daño (puede no hacerlo si el Espectro es bloqueado/negado en la fase de resolución posterior).
- **Triggers que exigen "con una carta poseída"** → no disparan si el texto lo condiciona explícitamente a la posesión.

**Fundamento textual:**
- `p14/b16 b6`: *"Si una carta Espectro no tiene poseída a una carta para causar daño, deberá pagar el doble de puntos de vida a las cartas aliadas en su Zona Principal original por cada punto de daño que intente infligir."* (Confirma que el ataque es posible, sólo el costo cambia.)
- FAQ-03: marco de triggers de ataque (negación invalida evento, suceso confirma evento).

**Implicancias estratégicas:**
- Un Espectro sin poseído puede ser víctima sacrificial útil: pagar vida aliada para disparar una Pasiva aliada condicionada a *"cuando un aliado ataque"* (si existe).
- Para evitar disparos hostiles (triggers rivales que se beneficien de "si un Espectro rival ataca"), hay que evaluar antes de atacar sin poseído.

**Cierra D33 completo:**
- D33 base: resuelto 2026-04-20 (*p14/b16 b6* confirma que sí puede atacar).
- D33 residual (triggers): resuelto 2026-04-22 (sí puede disparar triggers, depende de redacción).

---

---
id: M3 residual
display_id: "M3 residual"
canonical_id: M3
version: 1
parent: M3

type: meta-regla
status: resuelto
status_method: autor

date_created: 2026-04-22
date_revised: null

authority:
  role: autor
  name: Ramsés
  validated_by: []

tags: [vivificacion, acumulacion, efectos, stacking, meta-regla]

cards_explicit:
  - folio: FYTE-Marok
    name: "Marok (Flores y Tumbas)"
    role: ejemplo

rulebook_refs:
  - p25/b06

derived_from: [D17, M3]
supersedes: []
related: [D48, M3]
---
## M3 residual — Resurrectos: acumulación depende de la redacción — CERRADA

**Fecha:** 2026-04-22 16:56 UTC
**Status:** ✅ RESUELTA por Ramsés (autor/diseño)

**Ruling verbatim:**
> *"Si los resurrectos sí pueden acumular sus efectos pero depende de la redacción de cada efecto. Un ejemplo: Marok de Flores y Tumbas puede acumular su efecto si lo vivificas varias veces."*

**Ruling:**
- Cuando un Adendei con efecto tipo "durante el resto del juego" o "mientras esté en el campo" es **vivificado múltiples veces** (sale + regresa), la acumulación de efectos **depende enteramente del texto de la carta**. No hay regla general de "siempre se acumula" o "nunca se acumula".
- El criterio es la **redacción literal**: si el texto permite interpretación acumulativa (modificadores stat-like, buffs persistentes) → acumula. Si el texto es de efecto singular activado una vez → no acumula.

**Ejemplo canónico provisto por Ramsés:**
- **Marok de Flores y Tumbas** → sí acumula si lo vivificas varias veces.
- Su redacción tipo-stat (modificador persistente) permite que cada vivificación genere una instancia independiente del buff.

**Aplicación a Mixtla (M3 original):**
- Mixtla: *"durante el resto del juego, tu rival tendrá 2 Activas-Rápidas adicionales y tú 2 menos."*
- Si Mixtla es vivificada 2 veces → **sí se acumulan los efectos** (+2 +2 = +4 rival, −2 −2 = −4 propias).
- Consistente con el criterio: el texto otorga un modificador numérico que no especifica "máximo una vez".

**Relación con D17:**
- D17 (el texto de la carta supersede reglas generales) es el fundamento meta-regla: cada carta define su propia lógica de acumulación vía redacción.
- Reglas de no-persistencia post-campo (M3 base, `p25/b06`) aplican a efectos **terminados** — mientras esté en campo en la re-vivificación, el efecto está "vivo" y se suma al remanente textual, si la redacción lo permite.

**Implicancia de diseño:**
- Redactores deben ser explícitos: *"sólo una vez por partida"* o *"no acumulable"* si se busca evitar stacking.
- Sin cláusula restrictiva → stacking natural permitido.

---

---
id: M5
canonical_id: M5
version: 1
parent: null

type: meta-regla
status: resuelto
status_method: autor

date_created: 2026-04-22
date_revised: null

authority:
  role: autor
  name: Ramsés
  validated_by: []

tags: [visibilidad, formato-estandar, extendido, multijugador, meta-regla]

cards_explicit: []

rulebook_refs: []

derived_from: []
supersedes: []
related: []
---
## M5 — Visibilidad del Mazo rival: depende del formato/contexto — CERRADA

**Fecha:** 2026-04-22 16:56 UTC
**Status:** ✅ RESUELTA por Ramsés (autor/diseño)

**Ruling verbatim:**
> *"En realidad no hay una regla para eso pero más que nada depende de dónde se juega, nivel de seriedad y cosas así."*

**Tabla por contexto:**

| Contexto | Ambos ven | Orden preservado | Rival reorganiza después |
|----------|:---------:|:---------------:|:-----------------------:|
| **CdC (Campeonato de Campeones)** | ✅ sí | ✅ sí | ❌ no |
| **Bio Combate / Tezcatlipoca** | ✅ sí (default CdC) | ✅ sí (default CdC) | ❌ no (default; organizador puede flexibilizar) |
| **Torneos de tienda / chill** | ✅ sí | ✅ sí | depende de rival/organizador |

**Regla operativa:**
- **Competitivo (CdC/Bio/Tez):** transparencia total cuando un Zotz "ve" el Mazo rival — ambos jugadores observan, el orden original del Mazo se conserva, no se permite reorganización.
- **Casual/tienda:** la transparencia y el orden se mantienen por default, pero el organizador/rival puede permitir reorganización si lo pactan previamente.

**Fundamento:**
- No hay regla de rulebook formal; la norma competitiva se deriva del estándar CdC.
- Formatos casuales heredan el default competitivo pero admiten flexibilidad.

**Aplicación a familia Zotz (13 cartas):**
- Cualquier efecto Zotz que revele/vea el Mazo rival (ej. KPRC Zotz variants, efectos tipo *"mira las primeras N cartas"*) → ambos jugadores observan, orden intacto, no reorganizable en CdC.
- Efectos que **manipulan** el Mazo (reordenan, roban, entierran) sí modifican orden por su propio texto — este ruling sólo cubre la visibilidad pasiva.

**Pendiente v5.2:**
- Agregar sección breve §"Manejo del Mazo rival" en reglas de formato competitivo (CdC) con las 3 reglas (ambos ven, orden preserva, no reorganiza).

---

---
id: M9
canonical_id: M9
version: 1
parent: null

type: meta-regla
status: resuelto
status_method: autor

date_created: 2026-04-22
date_revised: null

authority:
  role: autor
  name: Ramsés
  validated_by: []

tags: [multijugador, formato-estandar, extendido, limitadas, turno]

cards_explicit: []

rulebook_refs:
  - p36
  - p37

derived_from: []
supersedes: []
related: [D7, D50, D51]
---
## M9 — Multijugador: formato oficial escalable — CERRADA

**Fecha:** 2026-04-22 16:56 UTC
**Status:** ✅ RESUELTA por Ramsés (autor/diseño)

**Ruling verbatim:**
> *"Multijugador sí es un formato oficial, básicamente es un formato 1v1 pero la diferencia es que va aumentando para ser de 4 o hasta 20 de ahí en más es todo lo mismo que el 1v1."*

**Ruling:**
- **Multijugador ES formato oficial Kodem.** Soporta **4 hasta 20 jugadores** simultáneos en la misma partida.
- **Todas las reglas del 1v1 aplican idénticamente en multijugador.** No hay cambios en fases, descansos, Extinción, condiciones de victoria individuales, ni en la mecánica de ataques/pasivas.
- La única diferencia es el **número de oponentes simultáneos**.

**Aplicación a cartas "hasta N jugadores" (Maiz, Vesta Ignia, Enjambre Pírico, Ulmor, etc.):**
- En **1v1**: el efecto se aplica al único rival sin penalización; N en ese contexto = 1 (o el máximo aplicable a un solo jugador).
- En **multijugador 4+**: el jugador activo elige hasta N rivales como objetivo según texto de la carta.
- El diseño "hasta N" está pensado explícitamente para escalar entre 1v1 y multijugador sin re-impresión.

**Implicancias:**
- Victoria: cada jugador tiene condición independiente (vida Rava/Protector); último jugador con recursos gana, pero puede haber eliminaciones secuenciales.
- Descansos/Extinciones: iguales al 1v1.
- Cartas Limitadas (lista p36-p37): aplica a multijugador (ya resuelto en D7).
- Orden de turno: seguir regla de formato (no especificada; asumida rotación estándar horaria).

**Relación con D7:**
- D7 ya estableció que la lista de Limitadas aplica a Multijugador y Extendido, no a Estándar. Confirma que Multijugador es formato reconocido y regulado.

**Pendiente v5.2:**
- Formalizar sección §Formato Multijugador con rango (4-20), hereda reglas 1v1 salvo Limitadas, orden de turno.

---

---
id: D43
canonical_id: D43
version: 1
parent: null

type: meta-regla
status: resuelto
status_method: autor

date_created: 2026-04-22
date_revised: null

authority:
  role: autor
  name: Ramsés
  validated_by: []

tags: [pasivas, glosario, meta-regla, prerrequisito]

cards_explicit: []

rulebook_refs:
  - p20/b10

derived_from: []
supersedes: []
related: [D17, M12]
---
## D43 — Pasivas Opcionales vs Generales — CERRADA

**Fecha:** 2026-04-22 16:56 UTC
**Status:** ✅ RESUELTA por Ramsés (autor/diseño)

**Ruling verbatim:**
> *"Las pasivas opcionales no son obligaciones a diferencia de las pasivas no opcionales, la única diferencia es que al ser pasivas se te puede olvidar declararla y por lo tanto no la usas."*

**Ruling:**

| Tipo de Pasiva | Obligación | Consecuencia si se olvida |
|----------------|:----------:|---------------------------|
| **Pasiva NO opcional** (sin texto de eleccion) | Sí obligatoria | Se aplica automáticamente; el sistema/rival puede recordarla |
| **Pasiva opcional** (con *"puedes"*, *"si quieres"*, etc.) | No obligatoria | Si el jugador olvida declararla, **no se usa** (se pierde el efecto para ese disparo) |

**Dos diferencias críticas:**
1. **Obligatoriedad:** las opcionales requieren **declaración activa**; las no-opcionales se aplican automáticamente.
2. **Penalización por olvido:** las opcionales simplemente **no surten efecto** si no se declaran en ventana; las no-opcionales no tienen este problema porque se aplican automáticas.

**Criterio de distinción en la carta:**
- Texto con *"puedes"*, *"si lo deseas"*, *"opcionalmente"* o fraseo condicional electivo → **opcional**.
- Texto con fraseo directo (*"los Adendei aliados tienen"*, *"cada vez que X, haz Y"*) sin opción → **no opcional**.
- No hay regla de formato tipográfico (ej. "negrita = obligatoria") — el criterio es **semántico del texto**. (Descarta la tentativa previa de "criterio negrita".)

**Implicancia operativa:**
- Jugador que usa Pasiva opcional debe **declararla en la ventana correcta** (al momento del disparo). Si pasa la ventana sin declarar → efecto perdido para ese disparo; puede re-intentar en disparos futuros si la condición se repite.
- Jugador con Pasiva no opcional no necesita declarar; el efecto corre.

**Relación con D17:**
- Consistente: el texto de la carta define el comportamiento. Meta-regla `p20/b10` aplica.

**Pendiente v5.2:**
- Agregar sección breve §Glosario clarificando "Pasivas opcionales" como sub-tipo con estas dos reglas: no-obligatoria + pierde efecto si se olvida en ventana.
- **Descarta** el criterio tentativo previo *"negrita = obligatoria"* — el criterio real es semántico.

---

---
id: D23
canonical_id: D23
version: 1
parent: null

type: errata
status: resuelto
status_method: autor

date_created: 2026-04-19
date_revised: null

authority:
  role: autor
  name: Ramsés
  validated_by: []

tags: [errata, limitadas, protector]

cards_explicit:
  - folio: BETA-001
    name: "Ariam, Dualidad (BETA)"
    role: carta-central
  - folio: FAFT-005
    name: "Ariam, Dualidad (FAFT)"
    role: ejemplo
  - folio: IDRMA-020
    name: "Ariam, Dualidad (IDRMA)"
    role: ejemplo
  - folio: RMR-012
    name: "Ariam, Dualidad (RMR)"
    role: ejemplo

rulebook_refs: []

derived_from: []
supersedes: []
related: []
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

---
id: D24
canonical_id: D24
version: 1
parent: null

type: meta-regla
status: resuelto
status_method: autor

date_created: 2026-04-19
date_revised: null

authority:
  role: autor
  name: Ramsés
  validated_by: []

tags: [vida, adendei, rava, tokens, protector, espectros, glosario, meta-regla]

cards_explicit:
  - folio: IDRMA-007
    name: "Zaren, El Inicio del Viaje (IDRMA)"
    role: ejemplo
  - folio: KEXC-001
    name: "Zaren, El Inicio del Viaje (KEXC)"
    role: ejemplo
  - folio: KPRC-103
    name: "Zaren, El Inicio del Viaje (KPRC)"
    role: ejemplo

rulebook_refs:
  - p06/b02
  - p07/b03
  - p08/b03
  - p09/b03
  - p37

derived_from: []
supersedes: []
related: [D3, D9, D20]
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
**Rulings resueltos (20/23):**

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
| D19 | Pasar turno forzado (emergente + parálisis con escape vía Bio/pasivas/Activas Equipos) | ✅ |
| D20 | Espectros vida + posesión (por carta + consumo Extinción) | ✅ |
| D21 | Posesión = Vivificación atómica (stack físico, co-envío a Extinción) | ✅ |
| D22 | Herencia dinámica 5 attrs (efecto/daño/descanso/costo/energía sí; vida/subtipo no) | ✅ |
| D22b | Herencia (posesión dinámica) ≠ Copia (snapshot) — mecánicas distintas | ✅ |
| D22c | Daño al stack poseído: TODO entra al Espectro (absorción total) | ✅ |
| D23 | BETA-001 pieza histórica | ✅ |
| D24 | Cap de vida máxima por tipo (regla meta dispersa) | ✅ |

**Dudas derivadas pendientes (1):**
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
- **Espectros**: convergencia de D20, D21, D22 v3, D22b, T1 (Ruk copia), T3 (Tokens paramétricos) → sección §3.7 propuesta para v5.2 con tabla de herencia dinámica + distinción herencia vs copia

### ✅ Fase 5 — Entregables para comunidad (COMPLETADA)
- ✅ **PDF dudas pendientes para comunidad** generado: `dudas-pendientes-comunidad.pdf` (22 KB, 7+ páginas)
  - 4 reglas ambiguas D21, D22, D25, D26 → **las 4 cerradas al 2026-04-22**
  - 10 mecánicas sin definición M1-M10 → M1, M2, M4, M6, M7, M8, M10 cerradas; M3, M5, M9 abiertas
  - 6 erratas masivas E1-E6 → catalogadas en erratas-batch-v5.2.md
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
  - D21 (Espectro-consumo) → ✅ cerrada 2026-04-19
  - D22 (Espectro-herencia stats) → ✅ cerrada 2026-04-22 (v3 herencia dinámica 5 atributos)
  - D25 (Hori costo aplicable a toda) → ✅ cerrada 2026-04-19 por Hule (errata)
  - D26 (Atlico grafia oficial) → ✅ cerrada 2026-04-19 por Ramsés
  - M1-M10 → parcialmente cerradas (ver ruling-índice)
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

**Estado emocional/técnico:** sesión larga y fructífera. 23/26 dudas resueltas al cierre 2026-04-19 (D1-D24 menos D21, D22, D25, D26). 3 sub-agentes completaron sin timeouts. Ramses satisfecho con el flujo de preguntas + documentación paralela. No hay blockers.

**Update 2026-04-22:** D21, D22 (v3 con herencia dinámica), D25, D26 todas cerradas. 26/26 de las dudas rulebook originales resueltas.

**Update 2026-04-22 16:53 UTC — cierre triada 🔴:** D22c (absorción total al Espectro), D37 residual (Tlahuelpuchi = sin-sacrificio, no bloqueo), D46 (copias libres de Rava en Extendido) — las 3 críticas cerradas por Ramsés.

**Update 2026-04-22 16:56 UTC — cierre 4 🟡 medias:** M3 residual (resurrectos acumulan según redacción; Marok ejemplo), M5 (visibilidad Mazo rival depende del formato/contexto; CdC = ambos ven + orden preservado + no reorganiza), M9 (Multijugador es formato oficial 4-20 jugadores con reglas de 1v1), D43 (pasivas opcionales vs no-opcionales = semántica del texto, no tipográfico; opcional pierde efecto si se olvida).

**Update 2026-04-22 16:57 UTC — cierre 2 🟡 residuales:** M12 residual (Pasiva-Rápida sólo da velocidad; mantiene la regla de no-descanso por Pasiva), D33 residual (ataque Espectro sin poseído sí puede disparar triggers; "algunos triggers" según redacción).

**Update 2026-04-22 17:15 UTC — BATCH M15–M23 APROBADO por Ramsés (8 rulings 🟢 a ✅):** M15 (errata E23), M16 (errata tipográfica "Activa-Rápida" con guión), M17 (Pasiva-Rápida ⊂ Pasiva, Ixim válidos), M19 (Ixim SÍ descansan por Activa), M20 (3 intentos totales), M21 (aclarar "automáticamente"), M22 (texto canon de p29/b09), M23 ("mano" = estado transitorio). M18 queda como ✅ desde antes (reconciliado con D22 v3). **Todos escalan a v5.2.**

**Update 2026-04-22 17:18 UTC — cierre 4 emergentes por derivación (Logos):** D47 (Tlahuelpuchi + múltiples Espectros: sí, hasta agotar objetivos; compone D36+D37+p14/b16 b3), D48 (M3 residual acumulación: B pausa-reanudación con acumulación por redacción; compone p25/b06+D17+M3res), D49 (Espectro sin poseído sin aliados: A, ataque ni se declara; aplica principio general costo impagable+p20/b10), D50 (semántica "rival" en multi: híbrido narrow/wide según verbo electivo; compone D52+M9). **Única duda abierta:** D16 residual (apilación inmunidades Ruk) — requiere decisión de diseño, no derivable.

---

---
id: M4
canonical_id: M4
version: 1
parent: null

type: meta-regla
status: resuelto
status_method: autor

date_created: 2026-04-19
date_revised: null

authority:
  role: autor
  name: Ramsés
  validated_by: []

tags: [pasivas, triggers, glosario, meta-regla]

cards_explicit:
  - folio: KPRC-017
    name: "Kap, Lluvia de Ranas"
    role: ejemplo
  - folio: KPRC-037
    name: "Nepthis, Rey Coral"
    role: ejemplo
  - folio: FYTE-004U
    name: "Ariam, Escudo de Cempasúchil"
    role: ejemplo
  - folio: TCOO-007S
    name: "Kaykac, Sorpresa Pírica"
    role: ejemplo
  - folio: FAFT-001
    name: "Nirge, Los Ocultos"
    role: contraejemplo

rulebook_refs:
  - p20/b08

derived_from: []
supersedes: []
related: [D31]
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

---
id: M2.5
display_id: "M2.5"
canonical_id: M2
version: 1
parent: M2

type: meta-regla
status: resuelto
status_method: autor

date_created: 2026-04-19
date_revised: null

authority:
  role: autor
  name: Ramsés
  validated_by: []

tags: [visibilidad, extincion, fuera-de-juego, glosario]

cards_explicit:
  - folio: FYTE-075
    name: "Mizthe, Arconte"
    role: carta-central

rulebook_refs: []

derived_from: []
supersedes: []
related: [M2, M5, D5, D18]
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

---
id: M6
canonical_id: M6
version: 1
parent: null

type: aclaracion
status: resuelto
status_method: comunidad

date_created: 2026-04-19
date_revised: null

authority:
  role: comunidad
  name: Hule
  validated_by: []

tags: [descansos, glosario]

cards_explicit:
  - folio: IDRMP-022
    name: "Xakros, Peste (IDRMP)"
    role: carta-central
  - folio: RAMI-007
    name: "Xakros, Peste (RAMI)"
    role: ejemplo
  - folio: RMR-017
    name: "Xakros, Peste (RMR)"
    role: ejemplo

rulebook_refs: []

derived_from: []
supersedes: []
related: [D6, D19]
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

---
id: M11
canonical_id: M11
version: 1
parent: null

type: aclaracion
status: resuelto
status_method: comunidad

date_created: 2026-04-19
date_revised: null

authority:
  role: comunidad
  name: Hule
  validated_by: []

tags: [zona-principal, targeting, glosario]

cards_explicit: []

rulebook_refs: []

derived_from: []
supersedes: []
related: [D50]
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

---
id: D27
canonical_id: D27
version: 1
parent: null

type: ruling-carta
status: resuelto
status_method: autor

date_created: 2026-04-19
date_revised: null

authority:
  role: autor
  name: Ramsés
  validated_by: []

tags: [ataques, efectos, meta-regla]

cards_explicit:
  - folio: TCEO-009
    name: "Draxes, Último Aliento"
    role: carta-central
  - folio: TCOO-009
    name: "Draxes, Último Aliento (TCOO)"
    role: ejemplo
  - folio: KPRC-Makua
    name: "Makua, Venganza Abisal"
    role: contraejemplo

rulebook_refs:
  - p15/b12
  - p39/b06

derived_from: []
supersedes: []
related: [D17, D31]
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

---
id: D28
canonical_id: D28
version: 1
parent: null

type: meta-regla
status: resuelto
status_method: evidencia-textual

date_created: 2026-04-19
date_revised: null

authority:
  role: evidencia-textual
  name: rulebook
  validated_by: [Ramsés]

tags: [zona-principal, glosario, meta-regla, vivificacion]

cards_explicit:
  - folio: LGRO-077
    name: "Kuyovi, Salto Eléctrico"
    role: ejemplo
  - folio: FYTE-022R
    name: "Ariam, Resurrección"
    role: ejemplo

rulebook_refs:
  - p23/b17
  - p23/b18
  - p23/b22

derived_from: []
supersedes: []
related: [M2, M2.3, M2.4, M2.5, M2.6]
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

---
id: M2.3
display_id: "M2.3"
canonical_id: M2
version: 1
parent: M2

type: aclaracion
status: resuelto
status_method: derivacion

date_created: 2026-04-19
date_revised: null

authority:
  role: logos-derivado
  name: Logos
  validated_by: [Ramsés]

tags: [zona-principal, efectos, prerrequisito]

cards_explicit:
  - folio: FYTE-022R
    name: "Ariam, Resurrección"
    role: ejemplo

rulebook_refs: []

derived_from: [D28]
supersedes: []
related: [M2, D28]
---
## M2.3. Anti-cambio aplica a intercambio (Planta Carnívora)

**Fecha:** 2026-04-19
**Status:** ✅ RESUELTO (por D28)

**Ruling:** Sí. "Intercambiar" = "cambiar" = "cambiar de lugar" (todos §6.5). La restricción de Planta Carnívora ("no puede equiparse a Adendei cambiados de lugar por efectos de cartas aliadas") aplica cuando el Adendei llegó a ZP por cualquier operación de §6.5, incluyendo intercambios como Ariam Resurrección.

---

---
id: M2.6
display_id: "M2.6"
canonical_id: M2
version: 1
parent: M2

type: aclaracion
status: resuelto
status_method: derivacion

date_created: 2026-04-19
date_revised: null

authority:
  role: logos-derivado
  name: Logos
  validated_by: [Ramsés]

tags: [zona-principal, efectos, vida]

cards_explicit: []

rulebook_refs:
  - p23/b18

derived_from: [D28]
supersedes: []
related: [D28, M2]
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

---
id: M2.4
display_id: "M2.4"
canonical_id: M2
version: 1
parent: M2

type: aclaracion
status: resuelto
status_method: evidencia-textual

date_created: 2026-04-19
date_revised: null

authority:
  role: evidencia-textual
  name: rulebook
  validated_by: [Ramsés]

tags: [zona-principal, glosario]

cards_explicit:
  - folio: FYTE-022R
    name: "Ariam, Resurrección"
    role: carta-central

rulebook_refs:
  - p14
  - p24

derived_from: []
supersedes: []
related: [D28, M2, D20, D21]
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

---
id: E8
canonical_id: E8
version: 1
parent: null

type: errata
status: resuelto
status_method: comunidad

date_created: 2026-04-19
date_revised: null

authority:
  role: comunidad
  name: Hule
  validated_by: [Ramsés]

tags: [subtipos, errata, adendei]

cards_explicit:
  - folio: FYTE-008R
    name: "Macit, Resguardo Divino"
    role: ejemplo
  - folio: FYTE-020R
    name: "Therz, de Vuelta a la Tumba"
    role: ejemplo

rulebook_refs:
  - p07/b04
  - p11/b19

derived_from: []
supersedes: []
related: []
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

---
id: M12
canonical_id: M12
version: 1
parent: null

type: meta-regla
status: resuelto
status_method: autor

date_created: 2026-04-19
date_revised: 2026-04-22

authority:
  role: autor
  name: Ramsés
  validated_by: []

tags: [activas, pasivas, descansos, glosario, meta-regla]

cards_explicit:
  - folio: LGRO-xxx
    name: "Ryptor (Jugada Veloz)"
    role: ejemplo
  - folio: LGRO-065
    name: "Yakerr (Vínculo Odémico)"
    role: ejemplo

rulebook_refs:
  - p29/b04
  - p29/b06
  - p29/b09

derived_from: []
supersedes: []
related: [M12 residual, M17]
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

---
id: M13
canonical_id: M13
version: 1
parent: null

type: aclaracion
status: resuelto
status_method: evidencia-textual

date_created: 2026-04-19
date_revised: null

authority:
  role: evidencia-textual
  name: rulebook
  validated_by: [Ramsés]

tags: [turno, fase-batalla, glosario]

cards_explicit: []

rulebook_refs:
  - p16/b07

derived_from: []
supersedes: []
related: [D2]
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

---
id: M14
canonical_id: M14
version: 1
parent: null

type: meta-regla
status: resuelto
status_method: evidencia-textual

date_created: 2026-04-19
date_revised: null

authority:
  role: evidencia-textual
  name: rulebook
  validated_by: [Ramsés]

tags: [glosario, tokens, copia, meta-regla]

cards_explicit:
  - folio: TCOO-Virste
    name: "Virste (Reseteo/Cordyceps)"
    role: carta-central

rulebook_refs:
  - p22/b01
  - p31/b03

derived_from: []
supersedes: []
related: [D16, M2.4, M7]
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

---
id: E7
canonical_id: E7
version: 1
parent: null

type: errata
status: resuelto
status_method: autor

date_created: 2026-04-19
date_revised: null

authority:
  role: autor
  name: Ramsés
  validated_by: []

tags: [errata, subtipos]

cards_explicit:
  - folio: KPRC-072
    name: "Zinawe, Vacío Etéreo"
    role: carta-central

rulebook_refs:
  - p05/b12
  - p07/b04
  - p11/b19

derived_from: []
supersedes: []
related: [E8]
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

---
id: D29
canonical_id: D29
version: 1
parent: null

type: errata
status: resuelto
status_method: comunidad

date_created: 2026-04-19
date_revised: null

authority:
  role: comunidad
  name: Hule
  validated_by: []

tags: [errata, glosario]

cards_explicit:
  - folio: KPRC-049
    name: "(carta lore-only ejemplo)"
    role: ejemplo

rulebook_refs: []

derived_from: []
supersedes: []
related: []
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

---
id: D32
canonical_id: D32
version: 1
parent: null

type: ruling-carta
status: resuelto
status_method: comunidad

date_created: 2026-04-19
date_revised: null

authority:
  role: comunidad
  name: Hule
  validated_by: []

tags: [protector, activas, costos, copia, targeting]

cards_explicit:
  - folio: FYTE-012S
    name: "Nahual, Máscara"
    role: carta-central
  - folio: FYTE-083
    name: "Nahual, Máscara (v2)"
    role: carta-central

rulebook_refs:
  - p16/b08
  - p20/b10

derived_from: []
supersedes: []
related: [D16, D17, D22b]
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

**Fecha:** 2026-04-19 | **Status:** ✅ APROBADA (Ramsés, 2026-04-22 17:15 UTC) — errata confirmada (E23 consolidado)

**Anchor:** p07/b11 — la cross-reference lleva a §Protección, no a §Tipos de Daño.

**Ruling tentativo:** Errata editorial pura. La numeración canon (TOC p03) establece §6.4 = Tipos de Daño. Incluir en el batch E23 (renumeraciones parciales v5.0→v5.1). Sin impacto mecánico.

**Acción v5.2:** Parche editorial en lote. No requiere ruling separado — absorbido por E23.

---

### M16. "Activas Rápidas" vs "Activa-Rápida" — inconsistencia de guión

**Fecha:** 2026-04-19 | **Status:** ✅ APROBADA (Ramsés, 2026-04-22 17:15 UTC) — errata tipográfica; canon = con guión (glosario = autoridad terminológica)

**Anchors:** p16/b11 (sin guión) vs. p16/b06b, p27/b15, p27/b16, glosario p39 (con guión).

**Evidencia:** El glosario §9 usa consistentemente **"Activa-Rápida"** (con guión). El glosario es autoridad terminológica.

**Ruling tentativo:** La forma canónica es **Activa-Rápida** con guión. Las instancias sin guión son erratas tipográficas (quedan agregadas al catálogo E24). La mecánica es idéntica independientemente del fraseo impreso.

**Acción v5.2:** Unificar ortografía en todas las ocurrencias (patch en bloque).

---

### M17. "Los Ixim siempre tendrán Pasivas" vs. Pasiva-Rápida impresa en el pool

**Fecha:** 2026-04-19 | **Status:** ✅ APROBADA (Ramsés, 2026-04-22 17:15 UTC) — Pasiva-Rápida es sub-tipo de Pasiva; las 3 cartas Ixim con Pasiva-Rápida son legalmente válidas

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

**Evidencia:** D22 v3 (2026-04-22 14:15 UTC) estableció **herencia dinámica de 5 atributos** (Efecto, Daño, Descanso, Costo, Energía). El callout `Descanso: 0` describe el **estado base del Espectro sin poseer**. Al poseer, el Descanso es reemplazado por el del poseído (herencia dinámica, no snapshot).

**Ruling:** El callout **es correcto** como descripción anatómica del Espectro **sin posesión activa**. La anatomía del Espectro puro es: Descanso 0, Energía sin energía, Subtipo sin subtipo. Al poseer, Descanso + Energía se reemplazan por los del poseído; Subtipo se conserva como propio del Espectro. No hay inconsistencia con `p14/b16`.

**Acción v5.2:** Agregar nota pedagógica en §3.7: *"El callout `Descanso: 0` (y `Energía: Sin energía`, `Subtipo: Sin subtipo`) describe al Espectro sin poseer. Al poseer, Descanso + Energía se reemplazan por los del Adendei poseído en tiempo real (ver D22). Subtipo se conserva como propio del Espectro."*

---

### M19. Ixim y descansos al usar Activa — ausencia de regla simétrica a Rot

**Fecha:** 2026-04-19 | **Status:** ✅ APROBADA (Ramsés, 2026-04-22 17:15 UTC) — Ixim SÍ generan descanso al usar Activa; no son excepción (solo Rot lo es, p18/b09)

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

**Fecha:** 2026-04-19 | **Status:** ✅ APROBADA (Ramsés, 2026-04-22 17:15 UTC) — 3 intentos totales (1 original + 2 repeticiones); redacción v5.2 debe eliminar ambigüedad

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

**Fecha:** 2026-04-19 | **Status:** ✅ APROBADA (Ramsés, 2026-04-22 17:15 UTC) — aclarar "automáticamente" en glosario v5.2; costos impresos de descanso son pagos declarados (D17 supersede)

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

**Fecha:** 2026-04-19 | **Status:** ✅ APROBADA (Ramsés, 2026-04-22 17:15 UTC) — glosario v5.2 debe usar texto canon de p29/b09 (incluye "declaración de" + cláusula de uso único por turno)

**Anchors:** p39/b09 (glosario) vs. p29/b09 (cuerpo §6.7.2).

**Problema:** El glosario omite: (a) la cláusula *"una vez por turno en Fase Previa si no se especifica momento"*, (b) dice *"otras Pasivas"* donde el cuerpo dice *"declaración de otras Pasivas"*.

**Evidencia:** El cuerpo del rulebook es la autoridad normativa; el glosario es un resumen. La frase *"declaración de"* es mecánicamente relevante: la Pasiva-Rápida responde en la **ventana de declaración**, antes de la resolución.

**Ruling tentativo:** El texto autoritativo es p29/b09. La entrada de glosario se expande en v5.2 para incluir:
1. Que responde a la *declaración* de Pasivas (no a su resolución).
2. La cláusula de uso único en Fase Previa cuando no hay momento especificado.

**Acción v5.2:** Reemplazar entrada del glosario con texto completo del cuerpo.

---

### M23. Zona "mano" — estado no declarado en §4

**Fecha:** 2026-04-19 | **Status:** ✅ APROBADA (Ramsés, 2026-04-22 17:15 UTC) — "mano" es estado transitorio (no zona permanente); HandTraps operan en esta ventana transitoria (M4)

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
- **D37** (Tlahuelpuchi bloqueando posesión): ✅ **CERRADA 2026-04-22 por Ramsés.** Ruling verbatim: *"No bloquea, hace que no se requiera un sacrificio para poseer."* Es decir: Tlahuelpuchi **no impide la posesión** — elimina el requisito de sacrificar un Adendei aliado. Los Espectros aliados pueden poseer Adendei disponibles en Extinción sin enviar aliado al Extinción como parte del acto. Permite strategies Tlahuelpuchi + Espectros sin pérdida de recursos propios.

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

---
id: D30
canonical_id: D30
version: 1
parent: null

type: meta-regla
status: resuelto
status_method: comunidad

date_created: 2026-04-19
date_revised: null

authority:
  role: comunidad
  name: u_62a2ebfd
  validated_by: []

tags: [glosario, adendei, copia, meta-regla]

cards_explicit:
  - folio: TCOO-Virste
    name: "Virste (Reseteo)"
    role: ejemplo
  - folio: TCDE-015
    name: "Gloku"
    role: ejemplo

rulebook_refs:
  - p06

derived_from: []
supersedes: []
related: [D16, M14, D22]
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

---
id: D31
canonical_id: D31
version: 1
parent: null

type: meta-regla
status: resuelto
status_method: comunidad

date_created: 2026-04-19
date_revised: null

authority:
  role: comunidad
  name: u_62a2ebfd
  validated_by: []

tags: [innegable, ataques, efectos, glosario, meta-regla]

cards_explicit:
  - folio: KPRC-PC
    name: "Pruebas de Campo"
    role: contraejemplo
  - folio: KPRC-PS
    name: "Protección Selectiva"
    role: contraejemplo
  - folio: KPRC-RV
    name: "Recipiente de Vida"
    role: contraejemplo
  - folio: KPRC-ZA
    name: "Zaykan, Anulación"
    role: contraejemplo

rulebook_refs: []

derived_from: []
supersedes: []
related: [D17, D27, M4]
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

---
id: D52
canonical_id: D52
version: 1
parent: null

type: meta-regla
status: resuelto
status_method: comunidad

date_created: 2026-04-19
date_revised: null

authority:
  role: comunidad
  name: u_62a2ebfd
  validated_by: []

tags: [targeting, glosario, meta-regla, prerrequisito]

cards_explicit:
  - folio: KPRC-ZC
    name: "Zaykan, Citadel (átlicos)"
    role: ejemplo

rulebook_refs: []

derived_from: []
supersedes: []
related: [D50, D17]
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

---

---
id: D47
canonical_id: D47
version: 1
parent: null

type: ruling-carta
status: resuelto
status_method: derivacion

date_created: 2026-04-22
date_revised: null

authority:
  role: logos-derivado
  name: Logos
  validated_by: [Ambir]

tags: [espectros, extincion, posesion, fase-previa, unicidad-campo]

cards_explicit:
  - folio: FYTE-Tlahuelpuchi
    name: "Tlahuelpuchi"
    role: carta-central

rulebook_refs:
  - p14/b16

derived_from: [D21, D36, D37]
supersedes: []
related: [D20, D48, D49]
---
## D47. Tlahuelpuchi + múltiples Espectros en misma Fase Previa — CERRADA POR DERIVACIÓN

**Fecha:** 2026-04-22 17:18 UTC
**Status:** ✅ RESUELTA por derivación (Logos, con base en rulings de autoridad existentes)

**Pregunta:** Con Tlahuelpuchi eliminando el sacrificio y varios Espectros aliados, ¿cada uno puede poseer un Adendei de Extinción "gratis" en la misma Fase Previa (mientras haya objetivos)? ¿O hay límite adicional tipo "1 posesión por turno"?

**Ruling:** Sí, cada Espectro puede poseer en la misma Fase Previa sin límite adicional, hasta agotar objetivos disponibles en Extinción. No existe cláusula de "1 posesión por turno" a nivel global.

**Fundamento textual (`p14/b16 b3`):**
> *"En tu Fase Previa, un Espectro puede poseer una (solo una) de las cartas mencionadas en su Requisito, enviando a un Adendei aliado en Zona Principal original a Extinción sin que esto se considere un costo."*

El *"(solo una)"* aplica **por Espectro**, no por turno global. La unicidad está enlazada gramaticalmente al sujeto *"un Espectro"*, no al turno.

**Composición de rulings:**
- *D36* (Aldo, 2026-04-20): *"1 objetivo de posesión por Espectro, consumido al resolver"*. Múltiples Espectros pueden poseer en misma Fase Previa si hay objetivos suficientes.
- *D37* (Ramsés, 2026-04-22): *"No bloquea, hace que no se requiera un sacrificio para poseer"*. Tlahuelpuchi sólo altera el costo, no la mecánica de unicidad.
- *D21* (vivificación atómica): posesión = acto único por Espectro.

Los tres rulings son consistentes: ninguno introduce un límite global de posesiones por turno. La conclusión se sigue por composición directa.

**Derivación lógica:**
- Espectro A posee Adendei X (`p14/b16 b3`): OK.
- Tlahuelpuchi exime el sacrificio (*D37*).
- Espectro B posee Adendei Y distinto (D36): OK, objetivo separado.
- Ningún ruling restringe este encadenamiento dentro de una misma Fase Previa.

**Caso límite:** Si Espectro A y B requieren al mismo Adendei Z (único objetivo de su tipo), se aplica *D36 caso 1*: sólo A puede poseerlo; B queda sin objetivo.

**Implicancia estratégica:**
- Tlahuelpuchi + 2-4 Espectros aliados = combo poderoso: hasta 4 posesiones gratuitas por turno si hay objetivos diversos en Extinción.
- Contra-estrategia rival: quemar/remover el pool de Extinción (cartas como KPRC-Fytl tipo *"vacía Extinción"*) para cortar la línea.

**Pendiente v5.2:** ninguna edición al rulebook necesaria; la regla existente es suficiente. Registrar en glosario como ejemplo de composición de rulings.

---

---
id: D48
canonical_id: D48
version: 1
parent: null

type: meta-regla
status: resuelto
status_method: derivacion

date_created: 2026-04-22
date_revised: null

authority:
  role: logos-derivado
  name: Logos
  validated_by: [Ambir]

tags: [vivificacion, efectos, stacking, meta-regla]

cards_explicit:
  - folio: FYTE-Marok
    name: "Marok de Flores y Tumbas"
    role: carta-central
  - folio: FYTE-Mixtla
    name: "Mixtla"
    role: ejemplo

rulebook_refs:
  - p25/b06

derived_from: [D17]
supersedes: []
related: [D16, D22b, D47]
---
## D48. M3 residual: acumulación de efectos al re-vivificar — CERRADA POR DERIVACIÓN

**Fecha:** 2026-04-22 17:18 UTC
**Status:** ✅ RESUELTA por derivación (Logos, con base en rulings de autoridad existentes)

**Pregunta:** Si Marok se vivifica 3 veces en una partida, ¿sus modificadores stat-like son:
- **A)** permanentes (se quedan aunque Marok salga del campo),
- **B)** pausados al salir y reanudados al volver (sumando nueva instancia al re-entrar),
- **C)** reseteados cada vez que Marok va a Extinción?

**Ruling: B — pausa-y-reanudación con acumulación al re-entrar.**

En cada salida del campo, el efecto persistente se **apaga** (no sigue aplicando mientras la carta esté en Extinción). Al re-vivificar, se **genera una nueva instancia** del efecto que se suma a las instancias activas previas (si las hay).

**Fundamento textual (*`p25/b06`*):**
> *"Si una carta deja el campo y su efecto está condicionado a 'estar disponible', el efecto no continuará en uso."*

Esto descarta la interpretación A (permanentes). Los efectos persistentes se apagan al salir.

**Composición con *M3 residual* (Ramsés, 2026-04-22):**
> *"Los resurrectos sí pueden acumular sus efectos pero depende de la redacción de cada efecto. Un ejemplo: Marok de Flores y Tumbas puede acumular su efecto si lo vivificas varias veces."*

Esto descarta la interpretación C (reseteo completo cada vez). El ruling confirma que la acumulación **sí existe** cuando la redacción lo permite.

**Por eliminación queda B:**
- El efecto se apaga fuera de campo (`p25/b06`).
- Al re-entrar en campo, se reactiva como **nueva instancia** (no recupera la anterior ya apagada).
- Si el efecto es modificador acumulativo por redacción (Marok), las instancias activas se suman.
- Si hay efectos de instancias previas que quedaron "congelados" — por ejemplo, buffs que ya se aplicaron y no son condicionales a *"estar disponible"* — esos sí persisten. Pero cualquier efecto con cláusula *"mientras"* se apaga al salir.

**Regla general derivada:**
- Efectos con fraseo *"mientras esté en campo"* / *"durante el resto del juego"* + dependencia de *"estar disponible"* → se apagan al salir, se reactivan al entrar, acumulables si la redacción no restringe.
- Efectos tipo **modificador numérico persistente** sin cláusula restrictiva → acumulables por vivificación.
- Efectos con cláusula *"sólo una vez por partida"* → no acumulables aunque la carta se re-vivifique (redacción restrictiva explicita).

**Ejemplo Marok vivificado 3 veces:**
1. Vivificación 1: efecto activo. Al salir a Extinción, apagado.
2. Vivificación 2: nueva instancia. Si la redacción es acumulable (Marok), el stat-buff del 1 que persistió (por ejemplo, daño ya infligido) se suma al nuevo. Pero el buff *"mientras esté en campo"* del 1 ya murió.
3. Vivificación 3: otra instancia, mismo razonamiento.

Neto: **en campo simultáneamente sólo hay una instancia activa** (Marok es una sola carta); las "vidas" previas aportaron lo que ya aportaron antes de apagarse.

**Matiz crítico:** la acumulación de *M3 residual* aplica cuando los **efectos de instancias separadas generan estados acumulables** (por ejemplo, Mixtla *"tu rival tiene 2 Activas-Rápidas adicionales durante el resto del juego"* ; si Mixtla se vivifica 2 veces consecutivas sin quedarse en Extinción *siempre*, las dos instancias del efecto pueden coexistir en el estado del juego). Pero si la redacción se ata a *"mientras esté disponible"*, *`p25/b06`* apaga cada instancia al salir.

**Conclusión operativa:**
- La acumulación práctica depende de si los efectos generan estado global (Mixtla: sí acumula +2/-2 por vivificación porque modifica estado persistente del rival) o estado local condicionado (Marok-mientras-disponible: no acumula tras salir, pero cada re-entrada vale por sí sola).
- **Criterio simple:** si el efecto dice *"mientras"* → no persiste fuera de campo. Si dice *"durante el resto del juego"* (como Mixtla) → persiste como estado global y acumula.

**Pendiente v5.2:** formalizar en §6.7 sección de Efectos persistentes la distinción entre *"mientras"* (condicional a estar en campo) vs *"durante el resto del juego"* (estado global, no condicional).

---

---
id: D49
canonical_id: D49
version: 1
parent: null

type: ruling-carta
status: resuelto
status_method: derivacion

date_created: 2026-04-22
date_revised: null

authority:
  role: logos-derivado
  name: Logos
  validated_by: [Ambir]

tags: [espectros, ataques, costos, prerrequisito]

cards_explicit: []

rulebook_refs:
  - p14/b16
  - p20/b10

derived_from: [D21, D33]
supersedes: []
related: [D20, D47]
---
## D49. Espectro sin poseído sin aliados para pagar el ataque — CERRADA POR DERIVACIÓN

**Fecha:** 2026-04-22 17:18 UTC
**Status:** ✅ RESUELTA por derivación (Logos, con base en reglas existentes)

**Pregunta:** Si un Espectro sin poseído intenta atacar pero no tiene aliados suficientes en Zona Principal para pagar doble vida, ¿el ataque se declara, se cancela, o el jugador pierde?

**Ruling: A — el ataque ni se declara.** Sin recursos para pagar el costo, la acción no puede iniciarse.

**Fundamento textual (`p14/b16 b6`):**
> *"Si una carta Espectro no tiene poseída a una carta para causar daño, deberá pagar el doble de puntos de vida a las cartas aliadas en su Zona Principal original por cada punto de daño que intente infligir."*

La cláusula *"deberá pagar"* es prerrequisito absoluto. Si el pago no es posible (no hay aliados o aliados suficientes), el verbo *"intente infligir"* no puede completarse — la declaración del ataque no puede instanciarse.

**Principio general (meta-regla `p20/b10`):**
> *"Importante: Se aplicarán en todo momento los lineamientos de este documento a menos que el texto de una carta indique explícitamente lo contrario."*

Aplicando el principio general TCG de costos impagables: si el costo no puede pagarse, la acción no se declara. No hay carta ni ruling que abra excepción aquí.

**Composición con *D33 residual* (2026-04-22):**
- *D33 residual* confirma: *"el ataque sí puede llegar a disparar algunos triggers"* cuando el pago Sí sucede.
- *FAQ-03*: un ataque **negado** no dispara triggers porque *"no sucedió"*.
- D49 cubre un caso anterior: el ataque **ni siquiera llega al punto de ser declarado**. Sin declaración, no hay evento "ataque" para ser disparado ni negado.

**Consecuencia:**
- No se dispara ningún trigger tipo *"cuando declara ataque"*, *"cuando ataca"*, ni *"cuando es negado"*.
- No se paga vida aliada (no se inició el pago).
- El Espectro queda inerte hasta que recupere un poseído válido o haya aliados suficientes para el pago.

**Caso límite: aliados insuficientes para el daño completo.**
Si el Espectro quiere infligir 3 de daño (requiere 6 de vida aliada) pero sólo hay 4 de vida aliada disponible:
- **Opción a:** ataque reducido a 2 de daño (pagando 4 de vida). Texto no lo dice explícitamente.
- **Opción b:** ataque no se declara porque el daño completo no puede pagarse.

La redacción de `p14/b16 b6` dice *"por cada punto de daño que intente infligir"*, lo que sugiere modularidad punto-por-punto. Conservando coherencia con atomicidad (*D21* + *FAQ-03*), **recomiendo opción b: declaración entera o nada** (atomicidad del ataque como evento unitario).

**Pendiente v5.2:** si Ramsés prefiere modularidad punto-por-punto, debe aclararse en rulebook. Por ahora, interpretación conservadora → ataque íntegro o no se declara.

---

---
id: D50
canonical_id: D50
version: 1
parent: null

type: meta-regla
status: resuelto
status_method: derivacion

date_created: 2026-04-22
date_revised: null

authority:
  role: logos-derivado
  name: Logos
  validated_by: [Ambir]

tags: [targeting, formato-extendido, glosario, meta-regla]

cards_explicit:
  - folio: KPRC-Maiz
    name: "Maiz"
    role: ejemplo
  - folio: KPRC-VestaIgnia
    name: "Vesta Ignia"
    role: ejemplo
  - folio: KPRC-EnjambrePirico
    name: "Enjambre Pírico"
    role: ejemplo
  - folio: KPRC-Ulmor
    name: "Ulmor"
    role: ejemplo

rulebook_refs: []

derived_from: [D52, M9]
supersedes: []
related: [M11, D7]
---
## D50. Semántica de "rival" en Multijugador — CERRADA POR DERIVACIÓN

**Fecha:** 2026-04-22 17:18 UTC
**Status:** ✅ RESUELTA por derivación (Logos, con base en *D52* + *M9*)

**Pregunta:** En Multijugador (formato oficial 4-20 jugadores, *M9*), cuando una carta dice *"Elige un rival"* o *"tu rival"*:
- **A)** *"rival"* singular = 1 elegido específicamente por el activo.
- **B)** *"rival"* = cualquier rival a efectos de condiciones/disparos (wide implícito).

**Ruling: HÍBRIDO dependiente del verbo de la cláusula.**

| Fraseo | Semántica | Justificación |
|--------|-----------|---------------|
| *"Elige un rival y..."* (verbo electivo) | **A** — narrow 1-target, el activo elige | Verbo *"elegir"* fuerza selección única |
| *"Daña a tu rival por X"* (posesivo singular en 1v1) | **A** — en 1v1 aplica al único; en multi el activo elige 1 | Posesivo implica 1 interlocutor, extendible a 1-elegido en multi |
| *"Si un rival tiene X..."* (condicional pasivo) | **B** — cualquier rival dispara | Sin verbo electivo, se aplica *D52* (omisión wide implícita) |
| *"Todos los rivales"* (explícito wide) | Todos los oponentes | Lectura literal |
| *"Cada rival recibe..."* (distributivo) | Cada oponente individualmente | Distributivo explícito |

**Fundamento textual (*D52*, u_62a2ebfd 2026-04-19):**
> *"Omisión explícita = alcance universal."* *"Explícito narrow: 'Un Adendei-Átlico aliado' → solo tu campo. Explícito wide: 'Todos los Adendei-Átlicos en ambos campos' → ambos lados. Omisión = wide implícito."*

**Fundamento textual (*M9*, Ramsés 2026-04-22):**
> *"Multijugador sí es un formato oficial, básicamente es un formato 1v1 pero la diferencia es que va aumentando para ser de 4 o hasta 20 de ahí en más es todo lo mismo que el 1v1."*

Es decir: reglas idénticas. El término *"rival"* en cartas de 1v1 debe preservar su semántica original cuando se juega en multi. En 1v1 *"tu rival"* es tautológicamente el único oponente; en multi se vuelve ambiguo sin regla de selección.

**Derivación:**
- Verbos electivos (*"elige"*, *"selecciona"*, *"apunta a"*) fuerzan narrow-1: el activo decide cuál. Consistente con principio TCG general de selección activa.
- Fraseos condicionales pasivos (*"si un rival tiene..."*, *"cuando un rival haga..."*) aplican *D52*: wide implícito, cualquier rival cumple la condición.
- Posesivos *"tu rival"* en contexto electivo se comportan como narrow (el activo elige 1); en contexto de condición pasiva se comportan como wide (cualquier oponente).

**Criterio práctico:** *¿el verbo obliga a elegir?*
- Sí → narrow-1 (el activo elige).
- No → aplicar *D52* (wide implícito por default).

**Cartas "hasta N jugadores"** (Maiz, Vesta Ignia, Enjambre Pírico, Ulmor):
- Escalan naturalmente en multijugador. El activo elige hasta N rivales según texto.
- En 1v1, N se satura a 1 o al límite aplicable.

**Pendiente v5.2:** agregar sección §Glosario "Rival en Multijugador" con la tabla de semánticas arriba.

---

## SESIÓN 2026-04-20 19:45 CDMX — Rulings derivados para portal dudas

Tras re-leer rulings-v5.1.md + reglas.md completos, 9 dudas abiertas en el portal se resolvieron por derivación directa del rulebook o ya tenían respuesta en Supabase.

**Dudas marcadas como `resolved: true` en portal (deploy v2026-04-20):**

| ID | Título | Fuente del ruling | Status actual |
|---|---|---|:--:|
| D30 | Virste Reseteo: alcance de "estadísticas" | 2 respuestas Supabase + M14 | ✅ |
| D31 | "No puede ser negada" — alcance | Respuesta Supabase u_62a2ebfd | ✅ |
| D52 | Zaykan Citadel: omisión = wide implícito | Respuesta Supabase u_62a2ebfd | ✅ |
| D33 | Espectro sin poseída: sí puede atacar | p14/b16 bullet 6 + FAQ-03 + Ramsés (residual 2026-04-22) | ✅ |
| D37 | Tlahuelpuchi: sin-sacrificio (NO bloquea posesión) | **Revisado 2026-04-22 por Ramsés** — supersede interpretación 2026-04-20 | ✅ |
| D40 | Ataque múltiple: 1 ataque = 1 descanso | p24/b07 + p25/b01 + FAQ-03 | ✅ |
| D43 | Pasivas Opcionales vs No-Opcionales (semántico, no tipográfico) | **Revisado 2026-04-22 por Ramsés** — supersede criterio "negrita" 2026-04-20 | ✅ |
| M3 | Mixtla post-campo + resurrectos acumulan según redacción (Marok) | D17 + p25/b06 + **Ramsés residual 2026-04-22** | ✅ |
| M5 | Mazo rival visibilidad depende formato (CdC default) | M2.5 + §4 + **Ramsés 2026-04-22** | ✅ |

**Dudas abiertas al 2026-04-22 cierre vespertino (aclaración de estado):**
- **D16 residual:** apilación de efectos idénticos (generalizado más allá de Ruk). **2026-04-22 18:05 UTC:** propuesta de Logos enviada a juez externo para aval. Principio propuesto: stacking por naturaleza del efecto (4 tipos: booleano/contador/evento-disparo/modificador), coherente con *M3 residual* (Ramés 2026-04-22) y meta-regla `p20/b10`. Esperando feedback.
- **M15-M23:** 8 tentativos derivados con evidencia textual directa, esperan aprobación en lote. — **APROBADOS 2026-04-22 17:15 UTC.**

**Batch cerrados 2026-04-22 cierre vespertino (por derivación de Logos):**
- **D47** Tlahuelpuchi + múltiples Espectros: sí, hasta agotar objetivos. Compone D36+D37+`p14/b16 b3`.
- **D48** M3 residual acumulación: pausa-reanudación con acumulación por redacción. Compone `p25/b06`+D17+M3 residual.
- **D49** Espectro sin poseído sin aliados: ataque no se declara. Compone `p14/b16 b6`+`p20/b10`.
- **D50** Semántica "rival" en multi: híbrido narrow/wide por verbo electivo. Compone D52+M9.

**Descartadas como pseudo-problemas:**
- **D51 tentativa:** Ruk poseyendo Rava = violación límite 2 Ravas por mazo. **DESCARTADA 2026-04-22** por Ramés: el límite 0-2 Ravas es regla de composición de Mazo General, no restricción en tiempo real. Poseer un Rava no incrementa el conteo en el mazo.

**Dudas resueltas 2026-04-20/21/22 (antes abiertas):**
- **D36** Pool compartido entre Espectros: ✅ RESUELTA 2026-04-20 por Aldo (Juez Kodem).
- **D46** Rava en Extendido: ✅ RESUELTA 2026-04-22 por Ramsés (copias libres).
- **L5** Naywa Quemadura Catrín: ✅ RESUELTA 2026-04-21 por Ramsés (4 puntos aclarados).
- **M9** Multijugador: ✅ RESUELTA 2026-04-22 por Ramsés (formato oficial 4-20 jugadores).
- **D22c + D37 residual + M12 residual + D33 residual:** ✅ RESUELTOS 2026-04-22 por Ramsés.

### Metodología aplicada

1. Relectura completa de `rulings-v5.1.md` (1629 líneas) + `reglas.md` (591 líneas).
2. Cross-check de cada duda abierta con:
   - Rulings previamente resueltos (D1-D52).
   - Respuestas de comunidad en Supabase.
   - Texto literal del rulebook v5.1.
3. Derivación de ruling solo cuando había evidencia textual directa o regla meta aplicable (D17).
4. Dudas sin ruling derivable → quedan abiertas con pregunta clara para diseño.

_Registrado: 2026-04-20 19:45 CDMX. Portal: kodem-dudas-comunidad.vercel.app. Suite engine: 573 PASS._

---

---
id: M8
canonical_id: M8
version: 1
parent: null

type: aclaracion
status: resuelto
status_method: autor

date_created: 2026-04-20
date_revised: null

authority:
  role: autor
  name: Ramsés
  validated_by: []

tags: [glosario, bio, aclaracion]

cards_explicit:
  - folio: TCOO-001
    name: "Morx, Descarga Átlica"
    role: carta-central
  - folio: TCOO-001R
    name: "Morx, Descarga Átlica (R)"
    role: ejemplo
  - folio: TCEO-001
    name: "Morx, Descarga Átlica (TCEO)"
    role: ejemplo
  - folio: TCEO-001R
    name: "Morx, Descarga Átlica (TCEO-R)"
    role: ejemplo
  - folio: LGRO-007
    name: "Consejo de Hielo"
    role: carta-central
  - folio: LGRO-010R
    name: "Consejo de Hielo (LGRO-R)"
    role: ejemplo
  - folio: TRWA-007
    name: "Consejo de Hielo (TRWA)"
    role: ejemplo
  - folio: TRWA-010R
    name: "Consejo de Hielo (TRWA-R)"
    role: ejemplo

rulebook_refs: []

derived_from: []
supersedes: []
related: []
---
## M8 — "Consejo" en Morx, Descarga Átlica — ¿término mecánico o carta específica?

**Status:** ✅ RESUELTA 2026-04-20 por Ramsés (autor)
**Cartas relevantes:** TCOO-001, TCOO-001R, TCEO-001, TCEO-001R (Morx) + LGRO-007, LGRO-010R, TRWA-007, TRWA-010R (Consejo de Hielo)

### Pregunta original
Las 4 variantes de Morx, Descarga Átlica mencionan "Consejo" en su texto sin definición en rulebook ni glosario. ¿Es término mecánico nuevo, subtipo, zona, o lore?

### Ruling
**Es la carta Bio "Consejo de Hielo" (LGRO-007 / LGRO-010R / TRWA-007 / TRWA-010R) mencionada por nombre corto.**

Texto Morx: *"Si 'Consejo de Hielo' está en el campo, esta carta puede atacar a todos los Adendei rivales."*

Texto Consejo de Hielo: *"Pasiva: Los Adendei aliados son considerados Adendei-Átlico."*

No es término mecánico, ni subtipo, ni zona. Es una **referencia directa a una carta Bio específica por nombre** (legal según meta-regla del rulebook: las cartas pueden referenciarse por nombre).

### Implicancias
- Morx solo activa su ataque múltiple cuando "Consejo de Hielo" (cualquier variante) está en campo aliado/rival y activa.
- Interacción dependiente de synergy: Consejo de Hielo convierte Adendei aliados a Átlico, creando condición favorable para Morx Átlico.
- No hay necesidad de definir "Consejo" en glosario — es nombre propio de carta.

### Acción
- Eliminar M8 del portal dudas (no era duda real).
- Registrar en rulings como referencia futura para evitar duplicación del análisis.

---

---
id: M7
canonical_id: M7
version: 1
parent: null

type: meta-regla
status: resuelto
status_method: autor

date_created: 2026-04-20
date_revised: null

authority:
  role: autor
  name: Ramsés
  validated_by: []

tags: [tokens, copia, glosario, meta-regla, vida]

cards_explicit:
  - folio: TCDE-015
    name: "Gloku"
    role: ejemplo
  - folio: TCDE-008
    name: "Dagg"
    role: ejemplo
  - folio: KPRC-019
    name: "Zaren"
    role: ejemplo

rulebook_refs:
  - p20/b10

derived_from: []
supersedes: []
related: [D9, D16, D30, M14]
---
## M7 — Tokens con stats copiadas/variables — ¿qué define las stats?

**Status:** ✅ RESUELTA 2026-04-20 por Ramsés (autor)
**Cartas relevantes:** TCDE-015 Gloku, TCDE-008 Dagg, KPRC-019 Zaren, y cualquier invocadora de Token.

### Ruling
**"Cada carta invocadora declara las stats del Token; no hay regla general más allá del vida-max = 6."**

### Implicancias
- **Vida máxima = 6 pts** siempre (regla general fija, ya establecida en D9).
- **Resto de stats** (daño, descansos, energía, Activa, costo, subtipo): las que declare el texto de la invocadora.
- **Tokens con stats copiadas** (Gloku, Zaren): el texto de la invocadora define qué se copia y cómo.
- **No existe "estadísticas originales del Token"** como concepto genérico — solo existe lo que dice la invocadora.
- Si la invocadora calla sobre una stat → default implícito (0 daño, 0 descansos, etc.).

### Fundamento
Meta-regla rulebook p20/b10: *"Se aplicarán en todo momento los lineamientos de este documento a menos que el texto de una carta indique explícitamente lo contrario."*

El texto de la carta invocadora es la autoridad sobre las stats del Token que invoca. Rulings previos D9 (vida-max) y D16 (snapshot Gloku) quedan consistentes con esta regla general.

### Acción
- Marcar M7 como resuelta en portal dudas.

---

---
id: M10
canonical_id: M10
version: 1
parent: null

type: ruling-carta
status: resuelto
status_method: juez

date_created: 2026-04-20
date_revised: null

authority:
  role: juez
  name: Ambir
  validated_by: []

tags: [efectos, costos, prerrequisito]

cards_explicit:
  - folio: NAVD-001
    name: "Ariam, Regalo Navideño"
    role: carta-central
  - folio: SNVL-001
    name: "Ariam, Día del Amor y la Amistad"
    role: carta-central

rulebook_refs:
  - p20/b10

derived_from: []
supersedes: []
related: [D17]
---
## M10 — Gestos sociales como requisito de efecto (Ariam Navideño, Día del Amor)

**Status:** ✅ RESUELTA 2026-04-20 por Ambir (Juez Kodem)
**Cartas relevantes:** NAVD-001 Ariam, Regalo Navideño / SNVL-001 Ariam, Día del Amor y la Amistad.

### Ruling
**"La interacción social es obligatoria. No hay forma de evitarla."**

### Por carta

**SNVL-001 — Ariam, Día del Amor y la Amistad**
- *"Se pierde el efecto si no chocan los puños."*
- Si el rival rechaza chocar puños → el efecto simplemente no se resuelve.
- Sin daño colateral, solo falla la activación.

**NAVD-001 — Ariam, Regalo Navideño**
- *"Te dañas 3 si no dices 'Feliz Navidad'."*
- El gesto verbal es costo/condición obligatoria del jugador activo.
- Omitir la frase → auto-daño de 3 pts al jugador activo.

### Implicancias
- Los gestos son **requisito mecánico real**, no decoración temática.
- Diferencia clave:
  - **NAVD** depende solo del jugador activo (auto-sanción).
  - **SNVL** requiere participación del rival (rival puede bloquear gratis rechazando el gesto).
- El rival **no puede "rechazar" tácticamente** para bloquear NAVD — la frase es responsabilidad del activo.
- El rival **sí puede bloquear SNVL** simplemente no chocando puños (ningún mecanismo lo obliga).

### Fundamento
Rulebook p20/b10: *"Se aplicarán en todo momento los lineamientos de este documento a menos que el texto de una carta indique explícitamente lo contrario."* El texto de estas cartas es explícito y vinculante.

### Autoridad del ruling
**Ambir** — Juez Kodem (autoridad oficial de arbitraje comunitario), 2026-04-20 21:49-21:50 CDMX.

---

---
id: D36
canonical_id: D36
version: 1
parent: null

type: ruling-carta
status: resuelto
status_method: juez

date_created: 2026-04-20
date_revised: null

authority:
  role: juez
  name: Aldo
  validated_by: []

tags: [espectros, extincion, posesion, unicidad-campo]

cards_explicit:
  - folio: FYTE-003K
    name: "Espectro (Ariam)"
    role: carta-central
  - folio: FYTE-022R
    name: "Ariam, Resurrección"
    role: ejemplo

rulebook_refs:
  - p14/b16

derived_from: []
supersedes: []
related: [D20, D21, D22, D22b, D22c, D47]
---
## D36 — Múltiples Espectros compitiendo por posesión de Ariam en Extinción

**Status:** ✅ RESUELTA 2026-04-20 por Aldo (Juez Kodem)
**Cartas relevantes:** FYTE-003K Espectro (Ariam) y cualquier variante con Requisito de poseer 2+ Adendei "Ariam" en Extinción.

### Ruling
**Caso 1 (único Ariam disponible, 2 Espectros): NO — solo un Espectro puede poseerlo.**
Si el Espectro A ya poseyó el único Ariam disponible, esa carta queda debajo de A y ya no está en Extinción. El Espectro B no tiene objetivo válido y no puede poseer nada.

**Caso 2 (2 Ariam en Extinción, 2 Espectros): SÍ — ambos pueden poseer en la misma Fase Previa.**
Cada Espectro toma un Ariam distinto; no hay conflicto porque hay objetivos suficientes.

### Implicancias
- La posesión consume la carta objetivo: una vez debajo del Espectro poseedor, deja de estar "disponible en Extinción".
- El Requisito del Espectro se evalúa al momento de resolver su efecto; si no hay Ariam disponible en ese instante, el Requisito falla.
- No hay "compartir" posesión entre Espectros — cada carta poseída pertenece a un solo Espectro.
- Regla general: **1 objetivo de posesión por Espectro, consumido al resolver**.

### Fundamento
Consistente con §Posesión / Espectros del rulebook v5.1 — la carta poseída se desplaza físicamente debajo del Espectro, saliendo de Extinción.

### Rulings relacionados
- **D20** (Espectros — vida máxima, posesión y requisitos) — marco general de posesión.
- **D21** (Posesión de Espectros = Vivificación atómica) — naturaleza de la posesión.
- **D22 v3** (Herencia dinámica de 5 atributos del Adendei poseído) — consecuencia de la posesión.
- **D22b** (Herencia ≠ Copia) — distinción formal de mecánicas.
- **D22c** (Daño al stack poseído) — 🟡 tentativo, pendiente.

### Autoridad del ruling
**Aldo** — Juez Kodem (autoridad oficial de arbitraje comunitario), 2026-04-20 23:01 CDMX. Reportado en grupo Kódem TCG Community por Ramsés D'León.

---

---
id: L-5
canonical_id: L-5
version: 1
parent: null

type: ruling-carta
status: resuelto
status_method: autor

date_created: 2026-04-21
date_revised: null

authority:
  role: autor
  name: Ramsés
  validated_by: []

tags: [pasivas, costos, extincion, stacking, prerrequisito, subtipos]

cards_explicit:
  - folio: FYTE-044
    name: "Naywa, Quemadura Catrín"
    role: carta-central

rulebook_refs:
  - p20/b10

derived_from: []
supersedes: []
related: [D17, D43, M3]
---
## L-5 — Naywa, Quemadura Catrín (FYTE-044) — tres mecánicas entrelazadas

**Status:** ✅ RESUELTA 2026-04-21 por Ramsés (autor/diseño)
**Carta:** FYTE-044 Naywa, Quemadura Catrín — Adendei Catrín / Pírica.

**Texto de la carta:**
- *Pasiva:* «Los Adendei Catrín aliados con 1 pto. de daño pueden quemar 1 carta rival al atacar. Si 1 Adendei Catrín o Pírico es enviado a Extinción, daña 1 pto. a todas las cartas quemadas.»
- *Costo:* «Quema 1 carta aliada para quemar 1 carta rival por esta Pasiva.»

### Ruling

**① «Adendei Catrín aliados con 1 pto. de daño»**
Significa: **exactamente 1 de daño (stat) Y subtipo Catrín**. Los dos requisitos son conjuntivos. Un Catrín con 0 o 2+ de daño no califica; un no-Catrín con 1 de daño tampoco.

**② Costo obligatorio — sin aliadas quemables, no hay Pasiva**
Para quemar 1 carta rival vía esta Pasiva, **debes primero quemar 1 carta aliada** como costo. Si no tienes cartas aliadas que puedas quemar, **no puedes cumplir el costo y la Pasiva no se activa**. El costo es prerrequisito, no opcional.

**③ Disparo por cada envío a Extinción**
El efecto *"daña 1 pto. a todas las cartas quemadas"* se dispara **cada vez que un Adendei Catrín o Pírico es enviado a Extinción**, no una sola vez. Si en un mismo evento se envían 2 Catrines/Píricos → 2 disparos independientes de 1 pto. cada uno.

**④ Alcance del daño: todas las cartas quemadas en Zona Principal, aliadas y rivales**
«Todas las cartas quemadas» = sin distinción de bando. Incluye cartas quemadas aliadas y rivales que estén en Zona Principal al momento del disparo. Fratricidio confirmado.

### Implicancias estratégicas
- El costo es una válvula de auto-desgaste: quemar aliadas propias acumula objetivos para el efecto de Extinción (③+④).
- Combo clave: quemar Catrines/Píricos aliados como costo → al extinguirse, disparan daño a todas las quemadas (incluso aliadas), cascada de daño.
- Si todas tus aliadas están ya quemadas, la Pasiva se vuelve inaccesible (no puedes pagar costo).
- El efecto de Extinción (③) es independiente de la Pasiva de ataque — se dispara aunque nunca hayas usado la Pasiva.

### Fundamento
Meta-regla rulebook p20/b10: *"Se aplicarán en todo momento los lineamientos de este documento a menos que el texto de una carta indique explícitamente lo contrario."* El texto de Naywa es vinculante en sus 4 puntos resueltos arriba.

### Autoridad del ruling
**Ramsés D'León** — autor/diseño de Kódem TCG, 2026-04-21 00:38-00:43 CDMX. Reportado y resuelto en grupo Kódem TCG Community.
