# Auditoría de Reglas Kódem TCG v5.1 — Segunda Pasada
**Fecha:** 2026-04-19
**Auditor:** Sub-agente Logos (Claude Opus 4.7)
**Scope:** Rulebook completo (p1–p40, 9712 líneas) + cards.json (1074 cartas)
**Excluidos (ya resueltos o en portal):** D1–D24, D26, D27–D32, M1, M2, M2.1, M2.2, M2.5, M4, M6, M11–M14, E7–E8, M3, M5 (portal)
**Numeración continúa desde:** D33, M15, E9

---

## 🔴 Ambigüedades jugables nuevas

---

## D33. Espectro sin carta poseída — condición de ataque ambigua

**Fecha:** 2026-04-19
**Status:** 🟡 Abierta
**Categoría:** ambigüedad

**Contexto en rulebook:**
- p14/b16 — "Si una carta *Espectro* no tiene poseída a una carta para causar daño, deberá pagar el doble de puntos de vida a las cartas aliadas en su Zona Principal original por cada punto de daño que intente infligir."
- p14/b16 — "Las cartas *Espectro* no tienen un daño definido más que el de la carta que posean."

**Cartas implicadas:**
- FYTE-015S: "Trote Espectral — Si esta carta ataca, recibe 1 descanso adicional al final del turno."
- FYTE-068: "Trote Espectral" (reprint idéntico)
- FYTE-021R: "Espectrosaurios — Si esta carta ataca o usa Activa, recibe 1 descanso adicional al final del turno."
- FYTE-073: "Espectrosaurios" (reprint)

**Problema:**
Las cartas Espectro de estas versiones ("Trote Espectral", "Espectrosaurios") tienen efectos que se disparan "si esta carta ataca" pero el rulebook establece que un Espectro sin carta poseída "no tiene un daño definido". La regla del "doble de vida a aliados" como alternativa implica que el Espectro SÍ puede intentar atacar sin poseer, pero el costo es pagar vida a aliados. Sin embargo:
1. ¿Cuánto daño inflige un Espectro sin carta poseída? El rulebook dice que su daño = el de la carta poseída, y sin ella, no tiene daño. ¿Puede atacar por 0 daño?
2. La frase "si esta carta ataca" en Trote Espectral y Espectrosaurios ¿se activa también cuando el Espectro ataca por el mecanismo de "pagar doble de vida"?
3. ¿El costo de pagar "doble de puntos de vida a cartas aliadas" debe pagarse antes o después de declarar el ataque?

**Opciones plausibles de ruling:**
1) Un Espectro sin carta poseída no puede atacar bajo ningún concepto (la regla de "pagar doble de vida" es la penalización por intentarlo, no un modo alternativo de atacar)
2) Un Espectro sin carta poseída puede atacar por 0 daño pagando el costo de doble de vida; "si esta carta ataca" se dispara normalmente
3) Un Espectro sin carta poseída puede declarar ataque y la resolución es 0 daño + costo de vida aliada; no dispara efectos condicionales de "si ataca"

**Recomendación:** Opción 1 parece la más consistente con el espíritu del tipo Espectro, pero requiere texto explícito. Aclarar en §3.7 que el "pago de doble de vida" es una consecuencia del ataque declarado (ya en proceso), no una precondición habilitadora.

---

## D34. Espectro a 0 puntos de vida — ¿genera carta suplente?

**Fecha:** 2026-04-19
**Status:** 🟡 Abierta
**Categoría:** ambigüedad

**Contexto en rulebook:**
- p14/b21 — "Una carta Espectro tendrá la vida máxima marcada en su texto."
- p20/b02 — "Cuando una carta deja su espacio en la Zona Principal, el jugador tomará 3 cartas del Mazo Principal, y elegirá 1 para reemplazarla."
- p20/b03 — "Siempre que una carta (que no sea un equipo) deje la Zona Principal, deberá colocarse una carta suplente inmediatamente."
- p14/b19 — "Si un Espectro abandona el campo, su carta Poseída irá a Extinción."

**Cartas implicadas:**
- FYTE-003K, FYTE-046, FYTE-065 (KPRC): Ariam, Axoloespectro
- FYTE-013R, FYTE-047: Aki, Brinco Espectral
- (todos los Espectros tipo=Espectro)

**Problema:**
El rulebook establece que toda carta que deje la Zona Principal genera un reemplazo, pero los Espectros tienen propiedades únicas:
1. ¿Un Espectro al llegar a 0 PV va a Extinción (como Adendei) o "sale del juego" (como Token)?
2. Si va a Extinción, ¿cuenta para la condición de victoria (10 cartas en Extinción rival)?
3. Si genera suplente, ¿el suplente se selecciona del mazo normal? ¿Puede ser otro Espectro?
4. ¿La carta poseída (que va a Extinción cuando el Espectro abandona el campo) también genera suplente de esa carta?

El rulebook dice explícitamente que Tokens NO cuentan para condición de victoria (p13/b02), pero no hace la misma declaración para Espectros.

**Opciones plausibles de ruling:**
1) Espectro va a Extinción al llegar a 0 PV, genera suplente normal, SÍ cuenta para condición de victoria
2) Espectro va a Extinción pero NO cuenta para condición de victoria (igual que Token)
3) Espectro "abandona el campo" (sin ir a Extinción como zona permanente) y solo genera suplente pero no cuenta

**Recomendación:** Agregar al §3.7 Generalidades: "Cuando un Espectro llega a 0 puntos de vida, irá a Extinción y [sí/no] contará para la condición de victoria. Su carta Poseída irá a Extinción conforme a la regla estándar."

---

## D35. "Adendei Resurrecto" como subtipo — efectos funcionales no definidos

**Fecha:** 2026-04-19
**Status:** 🟡 Abierta
**Categoría:** ambigüedad

**Contexto en rulebook:**
- p28/b08 — "Algunas cartas en Kódem son variantes resurecctas, de los personajes, es decir, que fueron traídas de regreso del Reino de la muerte."
- p28/b10 — "Vivificar: Las cartas que explícitamente no mencionen en sus textos, que pueden vivificar, enviar cartas de Extinción a otras Zonas o Intercambiar cartas con cartas en Extinción, no podrán sacar cartas de Extinción a otras Zonas."

**Cartas implicadas:**
- FYTE-022R / FYTE-074: Ariam, Resurrección — "Debes tener 2 o más Adendei Resurrecto en tu Extinción para usar esta Activa."
- FYTE-002K / FYTE-024: Ketzz, Plumas Inmortales (subtype=Resurrecto)
- FYTE-008U / FYTE-077: Ariam, Resurgimiento Fangoso (subtype=Resurrecto)
- FYTE-024R / FYTE-079: Therz, Garras Oseas (subtype=Resurrecto)

**Problema:**
El subtipo "Resurrecto" es usado en 13 cartas y referenciado como condición de costo/efecto, pero el rulebook:
1. No define "Adendei Resurrecto" como categoría mecánica ni aparece en el glosario §9
2. Solo menciona "variantes resurectas" narrativamente en §Vivificar (p28), sin reglas adjuntas
3. No especifica si "Resurrecto" es un subtipo permanente (como "Titán") o una etiqueta funcional que se adquiere/pierde

¿Un Adendei Resurrecto en Extinción mantiene su subtipo "Resurrecto"? ¿Interactúa con efectos que seleccionan "Catrín" u otros subtipos si la carta tiene multiples subtipos?

**Opciones plausibles de ruling:**
1) "Resurrecto" es un subtipo estático impreso en la carta, siempre aplicable, funciona igual que "Titán" o "Abisal"
2) "Resurrecto" es una etiqueta narrativa sin valor mecánico; solo importa para efectos que explícitamente lo mencionan (como Ariam Resurrección)
3) "Resurrecto" se adquiere cuando una carta es vivificada (cualquier carta vivificada se vuelve "Resurrecto" temporalmente)

**Recomendación:** Aclarar que "Resurrecto" es un subtipo impreso (opción 1) y añadirlo al callout oficial de subtipos en §2.2 o §glosario.

---

## D36. Poseer — ¿se puede poseer carta que ya está en Extinción por otro Espectro?

**Fecha:** 2026-04-19
**Status:** 🟡 Abierta
**Categoría:** ambigüedad

**Contexto en rulebook:**
- p14/b16 — "En tu Fase Previa, un *Espectro* puede poseer una (solo una) de las cartas mencionadas en su Requisito, enviando a un *Adendei* aliado en Zona Principal original a Extinción sin que esto se considere un costo."
- p14/b18 — "Poseer significa colocar una carta de Extinción bajo una carta en el campo."
- p14/b19 — "Las cartas que hayan sido poseídas se consideran de este tipo (poseídas) perdiendo su tipo y subtipo original mientras se encuentren sobre un Espectro."

**Cartas implicadas:**
- FYTE-003K / FYTE-046: Ariam, Axoloespectro — "Requisito: 2 o más Adendei 'Ariam' en tu Extinción."
- FYTE-013R / FYTE-047: Aki, Brinco Espectral — "Requisito: 1 o más Adendei 'Aki' en tu Extinción."
- FYTE-007R / FYTE-023: Tlahuelpuchi — "Los Espectros aliados no envían cartas a Extinción para poseer hasta que este Protector esté disponible."

**Problema:**
Cuando hay 2 Espectros en campo y ambos quieren poseer cartas de Extinción:
1. Si el Espectro A ya poseyó el único "Ariam" disponible en Extinción, ¿puede el Espectro B intentar poseer esa misma carta? (La carta ya está debajo del Espectro A, no en Extinción)
2. El efecto de Tlahuelpuchi "no envían cartas a Extinción para poseer" implica que las cartas que YA están en Extinción sí podrían ser poseídas, o ¿el Espectro queda completamente bloqueado?
3. Si hay 2 Ariam en Extinción y 2 Espectros del tipo Ariam, ¿ambos pueden poseer en la misma Fase Previa?

**Opciones plausibles de ruling:**
1) Solo puede poseerse una carta que esté libremente en Extinción (no debajo de otro Espectro); Tlahuelpuchi solo bloquea el envío del Adendei aliado (costo alternativo), no la acción de poseer
2) Ambos Espectros pueden poseer en la misma Fase Previa siempre que haya suficientes Adendei del tipo requerido en Extinción
3) Solo un Espectro puede poseer por Fase Previa (similar a la restricción de Vínculo Odémico)

---

## D37. Tlahuelpuchi — interacción con poseer sin enviar a Extinción

**Fecha:** 2026-04-19
**Status:** 🟡 Abierta
**Categoría:** ambigüedad

**Contexto en rulebook:**
- p14/b16 — "En tu Fase Previa, un *Espectro* puede poseer una (solo una) de las cartas mencionadas en su Requisito, enviando a un *Adendei* aliado en Zona Principal original a Extinción sin que esto se considere un costo."

**Cartas implicadas:**
- FYTE-007R / FYTE-023: Tlahuelpuchi, Invocación Espectral — "Los Espectros aliados no envían cartas a Extinción para poseer hasta que este Protector esté disponible."

**Problema:**
El mecanismo de "poseer" tiene dos pasos: (a) enviar un Adendei aliado a Extinción, y (b) tomar una carta del Requisito de Extinción para colocarla debajo del Espectro. El efecto de Tlahuelpuchi bloquea el paso (a). Sin embargo:

1. Si ya hay cartas del Requisito en Extinción (colocadas por otro medio, sin haber sido enviadas específicamente para poseer), ¿el Espectro puede ejecutar el paso (b) sin necesidad del paso (a)?
2. La redacción "no envían cartas a Extinción *para* poseer" ¿bloquea todo el proceso de poseer, o solo la acción específica de enviar un Adendei como "costo" de poseer?
3. ¿Un Espectro bajo efecto de Tlahuelpuchi puede poseer usando cartas que llegaron a Extinción por otros efectos (daño, efectos rivales)?

**Opciones plausibles de ruling:**
1) Tlahuelpuchi bloquea completamente la acción de poseer mientras el Protector esté en descanso
2) Tlahuelpuchi solo bloquea el envío activo de Adendei; si ya hay cartas del Requisito en Extinción por otros medios, el Espectro sí puede poseer
3) Tlahuelpuchi requiere que "no haya enviado activamente" cartas ese turno para poseer; si fueron enviadas por efectos rivales o de turno anterior, se puede poseer

---

## D38. Descanso adicional en Espectros — ¿se aplica el máximo de 2?

**Fecha:** 2026-04-19
**Status:** 🟡 Abierta
**Categoría:** ambigüedad

**Contexto en rulebook:**
- p18/b07 — "Las cartas Adendei, Rava y Token poseen una estadística de descanso de 0 a 2 máximo y no podrán añadirse más de 2 descansos."
- p27/b10 — "Cartas en Zona Principal: Podrán recibir descanso por efecto mientras estén en 1 descanso máximo."
- p14/b16 — "El *Espectro* deberá usar su propio Efecto, así como el Efecto, Daño, Descanso, Costo y Energía de la carta Poseída como si fueran suyos."

**Cartas implicadas:**
- FYTE-015S / FYTE-068: Trote Espectral — "Si esta carta ataca, recibe 1 descanso adicional al final del turno."
- FYTE-021R / FYTE-073: Espectrosaurios — "Si esta carta ataca o usa Activa, recibe 1 descanso adicional al final del turno."

**Problema:**
Un Espectro hereda el Descanso de su carta poseída (que puede ser 0, 1 o 2). Trote Espectral agrega "1 descanso adicional al final del turno" al atacar. Si el Espectro hereda 2 descansos de la carta poseída y luego recibe 1 adicional por su propio efecto:
1. ¿El máximo de 2 descansos aplica a los Espectros (que son un tipo de carta distinto al Adendei)?
2. Si el máximo sí aplica, ¿el descanso adicional de Trote Espectral simplemente se "absorbe" sin efecto si ya está en 2?
3. ¿La vida máxima del Espectro (impresa en la carta, ej. 9 PV) implica un máximo de descansos distinto al de Adendei?

**Opciones plausibles de ruling:**
1) El límite de 2 descansos aplica a Espectros igual que a Adendei (ya que usan las stats de la carta poseída)
2) Los Espectros no tienen límite de descansos explícito, ya que el rulebook solo menciona el límite para "Adendei, Rava y Token"
3) El límite aplica pero se calcula sobre el descanso heredado de la carta poseída, no sobre el de la carta Espectro base

---

## D39. Ruk, Espectro Draconiano — "carta poseída" con Pasiva copiada de Rava

**Fecha:** 2026-04-19
**Status:** 🟡 Abierta
**Categoría:** ambigüedad

**Contexto en rulebook:**
- p14/b16 — "El *Espectro* deberá usar su propio Efecto, así como el Efecto, Daño, Descanso, Costo y Energía de la carta Poseída como si fueran suyos. Sin embargo, no se considera que el efecto esté siendo copiado."

**Cartas implicadas:**
- FYTE-048 / FYTE-ST1: Ruk, Espectro Draconiano — "Requisito: 1 o más Rava en tu Extinción. Pasiva: Copia la Pasiva y costo de 1 Rava en Extinción. / Costo: Este Espectro no puede atacar. Esta Pasiva, la Pasiva copiada y la Pasiva de la carta poseída no pueden ser negadas."

**Problema:**
Ruk tiene un Requisito de 1+ Rava en Extinción (en vez del Adendei del mismo nombre, usual en otros Espectros). Su "carta poseída" sería entonces una Rava. Sin embargo:

1. El Requisito de Ruk es "Rava en Extinción", pero la mecánica de poseer dice "enviar un *Adendei* aliado a Extinción" — ¿Ruk puede poseer una Rava o solo una carta del Requisito?
2. Ruk además "copia la Pasiva y costo de 1 Rava en Extinción" por su propio efecto. Si la "carta poseída" es la Rava bajo Ruk, ¿la Pasiva copiada es la de esa misma carta poseída, o puede ser de una Rava diferente en Extinción?
3. El costo dice "la Pasiva de la carta poseída no puede ser negada" — pero si Ruk poseyó una Rava y su Pasiva es la de esa Rava, ¿son la "Pasiva copiada" y la "Pasiva de la carta poseída" la misma cosa?

**Opciones plausibles de ruling:**
1) Ruk posee la Rava enviando un Adendei aliado a Extinción (como mecánica estándar); la "carta poseída" es la Rava; la Pasiva copiada puede ser la de esa misma u otra Rava en Extinción
2) Ruk no puede poseer (requiere Adendei con el mismo nombre, y la Rava no es Adendei); opera sin carta poseída y usa el "pago de doble vida" si quiere atacar
3) Ruk es una excepción: puede poseer a la Rava directamente ya que el Requisito lo especifica

---

## D40. Kephir, Lanzallamas — "atacar adicionalmente" sin descanso adicional definido

**Fecha:** 2026-04-19
**Status:** 🟡 Abierta
**Categoría:** ambigüedad

**Contexto en rulebook:**
- p24/b07 — "Los efectos que permiten 'Atacar' o 'atacar adicionalmente' a múltiples cartas y que mencionan el número de puntos de daño a realizar dicho daño reemplazara el ataque base de la carta."
- p24/b06 — "El ataque es el principal medio que tendrás para ir eliminando cartas rivales durante el juego."
- p18/b07 — "Las cartas Adendei, Rava y Token poseen una estadística de descanso de 0 a 2 máximo."

**Cartas implicadas:**
- KPRC-010 / LGRO-005U / LGRO-045: Kephir, Lanzallamas — "Pasiva: Esta carta puede atacar adicionalmente a Adendei rivales igual al numero de equipos en esta carta."
- MLBU-004: Balim, Sacudida Estática — "Activa: Esta carta puede atacar adicionalmente con 1 o 2 puntos de daño a 1 carta akliada [aliada]."

**Problema:**
El rulebook (p24/b07) explica que "atacar adicionalmente" reemplaza el daño base cuando se especifica número. Pero no define:
1. ¿Cada "ataque adicional" genera un descanso independiente, o todos los ataques del turno comparten un solo descanso?
2. ¿Hay un límite al número de ataques adicionales? Kephir puede tener hasta 4 equipos (4 ataques adicionales), ¿puede hacer 5 ataques en un turno?
3. El descanso después de atacar adicionalmente, ¿se aplica al final de cada ataque individual o solo al final de todos los ataques del turno?

La regla general de descanso indica que "la carta descansará al final del turno", pero múltiples ataques podrían generar múltiples descansos.

**Opciones plausibles de ruling:**
1) Cada ataque (base + adicionales) genera 1 descanso al final del turno; Kephir con 4 equipos acumula hasta 5 descansos pero está limitado al máximo de 2
2) Solo 1 descanso por "secuencia de ataques" (todos los ataques del mismo turno cuentan como una acción)
3) Cada ataque adicional es una acción separada de declarar y resolver; genera su propio descanso si corresponde al tipo de efecto

---

## 🟡 Mecánicas sin definición formal nuevas

---

## M15. Token-Feral y Token-Lítico — Tokens con nombre de subtipo no definidos

**Fecha:** 2026-04-19
**Status:** 🟡 Abierta
**Categoría:** mecánica sin definición

**Contexto en rulebook:**
- p13/b01 — "Algunas cartas tienen la capacidad de invocar criaturas o seres, como *Token*, a la Zona Principal durante el juego."
- p13/b05 — Estadísticas por defecto de Token: Vida 6, Daño 0, Descanso 0, sin efecto/costo/energía/subtipo.
- p13/b06 — "Los Token no pueden ser ocultos."

**Cartas implicadas:**
- TCDE-008: Dagg, Abismo Feral — "Si un Adendei es enviado a Extinción, antes de colocar la carta suplente, puedes colocar un **Token-Feral** en su lugar con alguna de las siguientes estadísticas: - 4 daños y 2 descansos. - 2 daños y 0 descansos."
- TCDE-015: Gloku, Trituracion — "Pasiva-Rápida: Si esta carta es enviada a Extincion, puedes colocar un **Token-Lítico** en tu Zona Principal con el mismo daño, descanso, Activa y costo que un Adendei rival en el campo."

**Problema:**
El rulebook define Token con estadísticas fijas (0 daño, 0 descanso, sin efecto), pero estas cartas crean Tokens con:
- Estadísticas variables (Token-Feral: 4/2 o 2/0 según elige el jugador)
- Copia de stats + efecto + costo de una carta rival (Token-Lítico)
- Nombres de subtipo propios ("Feral", "Lítico") que el §3.6 no contempla

¿Son estos Tokens "especiales" sujetos a las mismas reglas generales (máx 2 por jugador, no se ocultan, salen del juego al morir)? ¿El Token-Lítico que copia un Activa puede usarla? Si copia un costo, ¿debe pagarlo?

**Opciones plausibles de ruling:**
1) Los Tokens especiales siguen todas las reglas generales de §3.6; las stats copiadas son solo estadísticas (daño/descanso); los efectos copiados son activos y funcionales
2) Los Tokens especiales son variantes que solo heredan estadísticas numéricas (daño/descanso/vida), no efectos de carta
3) Token-Lítico es una excepción explícita que funciona como "Adendei disfrazado de Token", con todos los efectos de la carta copiada activos

**Recomendación:** Agregar sección §3.6.1 "Tokens especiales" o actualizar §3.6 con: "Algunos efectos crean Tokens con estadísticas o efectos propios; en ese caso prevalecen las estadísticas/efectos especificados por el efecto generador."

---

## M16. "Intercambiar Espectro por carta del Mazo" — mecánica no documentada

**Fecha:** 2026-04-19
**Status:** 🟡 Abierta
**Categoría:** mecánica sin definición

**Contexto en rulebook:**
- p14/b16 — "Si un *Espectro* es intercambiado por una carta fuera del campo que no sea un *Espectro*, la nueva carta tendrá los mismos puntos de vida que el *Espectro*, hasta un máximo de 6 puntos."
- (No hay regla que explique cómo se toma un Espectro del Mazo ni cómo entra al campo desde el Mazo)

**Cartas implicadas:**
- FYTE-075: Mizthe, Arconte del Más Allá — "Intercambia 1 Espectro aliado de tu campo **o Mazo** por 1 Adendei o Espectro de tu Extinción que no haya sido vivificado."
- (El costo: "Si intercambiaste por un Espectro en tu campo, la carta llegará con 6 ptos. de vida.")

**Problema:**
El rulebook §3.7 explica que un Espectro entra al campo en Fase Previa cumpliendo el Requisito. Mizthe permite intercambiar un Espectro del **Mazo** (no en campo) por una carta en Extinción. Esto crea:
1. Una forma de traer un Espectro al campo **sin cumplir el Requisito** (ya que viene del Mazo directo, no se "coloca" normalmente)
2. Sin la mecánica de poseer: el Espectro entra al campo sin carta poseída
3. La diferencia de costo del efecto de Mizthe sugiere que hay distinción entre "Espectro en campo" vs "Espectro en Mazo", pero no hay regla que la formalice

¿Qué vida tiene el Espectro que llegó desde el Mazo? ¿Puede inmediatamente poseer en la misma Fase Previa?

**Opciones plausibles de ruling:**
1) El Espectro intercambiado desde el Mazo llega con 6 PV (máximo aplicable), sin carta poseída; puede poseer en la misma Fase Previa si cumple Requisito
2) El Espectro intercambiado desde el Mazo llega con su vida máxima impresa (no limitada a 6 PV); puede poseer normalmente
3) El Espectro del Mazo no puede poseer en el turno que entra (igual que Adendei recién revelado que no puede atacar el mismo turno)

**Recomendación:** Agregar cláusula en §3.7: "Un Espectro que entra al campo por efecto que no sea la mecánica de poseer estándar sigue las reglas de §3.7 para poseer, pudiendo hacerlo en la misma Fase Previa si cumple los Requisitos."

---

## M17. "La carta frente a ella" — ausencia de definición posicional formal (extensión de M11)

**Fecha:** 2026-04-19
**Status:** 🟡 Abierta
**Categoría:** mecánica sin definición

**Contexto en rulebook:**
- p40/b09 — Glosario: "Zona Principal: Lugar del Ecosistema con 3 espacios de carta."
- (No hay definición de "frente a", "espacio 1/2/3", ni correspondencia posicional entre ZP aliada y ZP rival)

**Cartas implicadas:**
- IDRMA-004: Zaykan, Luz Celeste — "Activa: Daña 1 punto adicional si ataca a la carta frente a ella."
- IDRMG-006 / IOSC-001: Zaykan, Ermitaño — "Pasiva: Esta carta no puede ser atacada por la carta frente a ella."
- (29 cartas en total usan el concepto "frente a" según cards.json)

**Problema:**
A diferencia de D28/M11 (que cubren el "cambio de lugar" y la adyacencia en general), este ítem específico señala que la definición de qué carta está "frente a" otra requiere que los 3 espacios de la Zona Principal estén **numerados o etiquetados consistentemente** para ambos jugadores.

Sin una definición de qué es el "espacio 1", "espacio 2", "espacio 3" y cómo se corresponden entre las dos ZPs, "la carta frente a ella" es una mecánica visualmente intuitiva pero sin respaldo formal. Esto genera conflictos en:
- Partidas en línea o por correo (sin tablero físico)
- Cuando un jugador rota el tablero
- Cuando hay cartas ocultas en huecos (¿cuál es la carta "frente a" un hueco vacío?)

**Opciones plausibles de ruling:**
1) Formalizar en §Zonas: "Los 3 espacios de ZP se enumeran 1-2-3 de izquierda a derecha desde la perspectiva de su dueño. La carta frente es la del mismo número en la ZP rival."
2) "Frente a" es puramente físico/visual y no requiere formalización; los jugadores acuerdan la disposición al inicio de la partida
3) Agregar al glosario: "'Frente a': La carta en el espacio de Zona Principal rival que corresponde al mismo número posicional que la carta referenciada."

---

## M18. "Vivificar a Zona de Bio" — regla no documentada en §Vivificar

**Fecha:** 2026-04-19
**Status:** 🟡 Abierta
**Categoría:** mecánica sin definición

**Contexto en rulebook:**
- p28/b10 — "Vivificar: Las cartas que explícitamente no mencionen en sus textos, que pueden vivificar [...] no podrán sacar cartas de Extinción a otras Zonas."
- p40/b05 — Glosario: "Zona de Bio: Lugar donde va la carta Bio."
- p40/b07 — "Zona de Extinción: Cuando una carta llegue a 0 puntos de vida, irá a Extinción."

**Cartas implicadas:**
- KPRC-027: Cementerio de Dinosaurios (type=Bio) — "Pasiva: Si tu Protector está disponible y esta carta está en Extinción, puedes **vivificar esta carta a tu Zona de Bio**. / Costo: Tu Protector recibe 2 descansos. Si no hay un Adendei Titán en tu campo envía esta carta a Extinción."

**Problema:**
El rulebook define Vivificar como "efecto que hace que una carta deje la zona Extinción" pero todas las reglas de Vivificar y reemplazo (§5.3) hablan de cartas que van a la **Zona Principal**. Cementerio de Dinosaurios es la única carta que explícitamente vivifica a la **Zona de Bio** (diferente de Zona Principal):

1. ¿Una Bio vivificada a Zona de Bio sigue las reglas de reemplazo (§5.3)? La Bio ya estaba en Zona de Bio al inicio del juego; vivificarla la regresa a su zona original
2. ¿La condición de costo ("Si no hay Adendei Titán en tu campo, envía esta carta a Extinción") se evalúa en el momento de vivificar o al final del turno?
3. ¿Puede una Bio en Extinción ser "Vivificada" a Zona Principal por una regla genérica de Vivificar? (La Bio no es Adendei)

**Opciones plausibles de ruling:**
1) Vivificar a Zona de Bio es una mecánica especial solo disponible para cartas con ese texto explícito; sigue las reglas normales de Vivificar pero con destino Zona de Bio en vez de Zona Principal
2) Vivificar solo aplica a Adendei y cartas similares; Bio vivificada a Zona de Bio es simplemente "regresar la carta a su zona" sin contar como vivificación
3) Vivificar a Zona de Bio activa el glosario de Vivificar completo (incluyendo efectos que se disparan "cuando una carta es vivificada")

**Recomendación:** Agregar en §3.5 Bio o en §Vivificar: "Una Bio puede ser vivificada a su Zona de Bio por efectos que lo indiquen explícitamente; esto cuenta como Vivificar y dispara efectos condicionales de cartas."

---

## 🟠 Erratas estructurales nuevas

---

## E9. Typo "akliada" en Balim, Sacudida Estática

**Fecha:** 2026-04-19
**Status:** 🟡 Abierta
**Categoría:** errata

**Contexto en rulebook:**
- (No aparece en el rulebook; es errata de texto de carta en cards.json)

**Cartas implicadas:**
- MLBU-004: Balim, Sacudida Estática — "Activa: Esta carta puede atacar adicionalmente con 1 o 2 puntos de daño a 1 carta **akliada**."

**Problema:**
La carta impresa/registrada en cards.json tiene el typo "akliada" en lugar de "aliada". Esta errata de tipeo hace que el texto sea semánticamente correcto pero ortográficamente incorrecto, lo que podría causar confusión en reglas basadas en texto exacto.

Adicionalmente, la mecánica de "atacar a 1 carta **aliada**" (no rival) con daño propio es inusual y podría generar dudas sobre si es intencional (ver D40 sobre ataques adicionales).

**Opciones plausibles de ruling:**
1) Corregir "akliada" → "aliada" en cards.json y en el texto impreso de la carta
2) Emitir errata oficial confirmando que el texto correcto es "aliada"

**Recomendación:** Corrección directa. El typo es obvio; no genera ambigüedad de reglas.

---

## E10. Typo "sea ha hecho posible" en créditos del rulebook

**Fecha:** 2026-04-19
**Status:** 🟡 Abierta
**Categoría:** errata

**Contexto en rulebook:**
- p40/b17 — "Agradecimientos especiales a: El equipo de arte e ilustración de Kódem TCG©, el equipo de Testeo, Nayeli Hernández y Regina Rodríguez; con su apoyo este proyecto **sea ha hecho posible** y se fortalece día a día."

**Problema:**
"sea ha hecho" debería ser "se ha hecho" — error gramatical en la página de créditos del rulebook oficial. No tiene impacto en reglas pero afecta la presentación del documento oficial.

**Opciones plausibles de ruling:**
1) Corregir en próxima edición del rulebook: "sea ha hecho" → "se ha hecho"

---

## E11. Inconsistencia tipográfica "Prinicipal" en §5.3

**Fecha:** 2026-04-19
**Status:** 🟡 Abierta
**Categoría:** errata

**Contexto en rulebook:**
- p20/b02 — "Las 2 cartas restantes se regresarán al fondo del Mazo **Prinicipal** en cualquier orden."

**Problema:**
Typo "Prinicipal" (i y c invertidas) en la regla de reemplazo de cartas. Ocurre en una sección normativa activa (§5.3), no en créditos o flavor text.

**Opciones plausibles de ruling:**
1) Corrección directa en próxima versión: "Prinicipal" → "Principal"

---

## E12. Inconsistencia en capitalización de "zona Extinción" vs "zona de extinción"

**Fecha:** 2026-04-19
**Status:** 🟡 Abierta
**Categoría:** errata

**Contexto en rulebook:**
- p40/b04 — Glosario Vivificar: "Es un efecto que hace que una carta deje la **zona Extinción**, cualquier carta que deje la **zona de extinción** se considera que está siendo vivificada."

**Problema:**
En la misma entrada del glosario (una sola oración), el término aparece dos veces con grafías distintas:
- "zona Extinción" (mayúscula en E, sin "de")
- "zona de extinción" (minúscula en z y e, con "de")

La forma canónica en el resto del rulebook es "Zona de Extinción" (con mayúsculas en Z y E). Esta inconsistencia en la definición del glosario puede generar confusión sobre si son dos zonas distintas o la misma.

**Opciones plausibles de ruling:**
1) Corrección en próxima edición: normalizar ambas ocurrencias a "Zona de Extinción"

---

## Cartas huérfanas (mecánicas sin definición formal)

Cartas cuyo efecto depende de mecánicas no definidas formalmente en el rulebook:

| Folio | Nombre | Mecánica huérfana | Duda asociada |
|-------|--------|-------------------|---------------|
| FYTE-015S, FYTE-068 | Trote Espectral | Espectro sin poseída atacando | D33 |
| FYTE-021R, FYTE-073 | Espectrosaurios | Espectro sin poseída atacando | D33 |
| FYTE-048, FYTE-ST1 | Ruk, Espectro Draconiano | Poseer Rava / triple Pasiva inmune | D39 |
| FYTE-007R, FYTE-023 | Tlahuelpuchi, Invocación Espectral | Poseer con cartas pre-existentes en Extinción | D37 |
| FYTE-075 | Mizthe, Arconte del Más Allá | Intercambio de Espectro desde Mazo | M16 |
| KPRC-010, LGRO-005U, LGRO-045 | Kephir, Lanzallamas | Descansos de ataques múltiples | D40 |
| MLBU-004 | Balim, Sacudida Estática | Ataque adicional a carta aliada + typo | D40, E9 |
| TCDE-008 | Dagg, Abismo Feral | Token-Feral con stats variables | M15 |
| TCDE-015 | Gloku, Trituracion | Token-Lítico con efecto copiado | M15 |
| KPRC-027 | Cementerio de Dinosaurios | Vivificar a Zona de Bio | M18 |
| FYTE-022R, FYTE-074 | Ariam, Resurrección | Subtipo "Resurrecto" no definido | D35 |

---

## Falsos positivos descartados en esta pasada

| Hallazgo considerado | Razón de descarte |
|---|---|
| "Solo uso por juego" — ¿aplica al rival? | **CUBIERTO**: p28/b06 explícitamente dice "una vez **por jugador**" |
| Condición de victoria "10 cartas" vs "enviar Protector a Extinción" | **CUBIERTO**: p16/b05 — "Si logras enviar 10 cartas a Extinción..." (o condiciones especiales de carta) |
| Token no cuenta para victoria | **CUBIERTO**: p13/b02 — explícito en rulebook |
| Pasar turno voluntariamente — mecánica no definida | **PARCIALMENTE CUBIERTO** por diagrama §5.2 "Pasar Turno"; no se lista como duda separada porque es visual |
| Efectos de "una vez por juego" de ambos jugadores | **CUBIERTO**: misma regla p28/b06 |
| Adendei Resurrecto subtype="Resurrecto" en E6 (tracker) | E6 cubría "Resurrecto y Magno usados pero no en callout oficial" — D35 es complementario (enfocado en implicaciones mecánicas funcionales) |
| Copycat de Brazalete de Rotanio (Rot en Extinción) | **CUBIERTO** por rulings previos de copia |
| Descanso del Adendei vinculado (Vínculo Odémico) | **CUBIERTO** en §3.2 p08 explícitamente |
| Espectro no puede ser ocultado | **CUBIERTO**: p14/b16 "Las cartas Espectro deberán entrar reveladas al campo y no podrán ser ocultadas" |

---

## Resumen ejecutivo

### Total dudas nuevas: **12**
- **Ambigüedades jugables:** 8 (D33–D40)
- **Mecánicas sin definición:** 4 (M15–M18)
- **Erratas estructurales:** 4 (E9–E12)

*(Nota: E10–E12 son erratas menores sin impacto en reglas; E9 tiene implicación mecánica menor)*

---

### Top 3 más críticas

**1. D33 — Espectro sin carta poseída atacando**
El §3.7 deja en ambigüedad si un Espectro puede declarar ataque sin carta poseída. Con 4 cartas directamente afectadas (Trote Espectral, Espectrosaurios en versiones R/S) y el efecto de Tlahuelpuchi que modifica el acceso a poseer, esta ambigüedad impacta a todo el arquetipo Espectro del set FYTE.

**2. D34 — Espectro a 0 PV: ¿genera suplente y cuenta para victoria?**
La omisión en el rulebook es estructuralmente equivalente a la de Tokens (que sí tienen la aclaración explícita). Sin un ruling claro, los jugadores interpretarán de forma inconsistente si eliminar Espectros cuenta para ganar la partida — lo que determina estrategias de construcción de mazo enteras.

**3. D40 — Kephir y los ataques múltiples (descansos)**
Kephir con 4 equipos puede declarar hasta 5 ataques. El rulebook no define si cada ataque adicional genera descanso independiente o si hay un solo descanso total. Esta ambigüedad permite que Kephir sea injugablemente fuerte (0 descansos si se interpreta sin límite por secuencia) o correctamente balanceado (acumula descansos al máximo).

---

### Cartas huérfanas (resumen)

11 folios únicos (con múltiples reprints) dependen de mecánicas sin definición formal: principalmente el arquetipo Espectro completo de FYTE (D33, D34, D36, D37, D38, D39, M16) y las cartas con Tokens especiales (M15: TCDE-008, TCDE-015).

---

### Secciones del rulebook con más gaps

| Sección | Página | Issues |
|---------|--------|--------|
| §3.7 Espectros | p14 | D33, D34, D36, D37, D38, D39, M16 (7 dudas) |
| §3.6 Tokens | p13 | M15 (1 duda crítica: Token-Feral/Lítico) |
| §Vivificar | p28 | D35, M18 (2 dudas) |
| §6.6 Ataque | p24 | D40 (1 duda crítica: ataques múltiples) |
| §5.3 Reemplazo | p20 | D34 (impacto indirecto), E11 |
| §Zonas/Posiciones | p40 | M17 (posición "frente a" sin definición formal) |

**Sección con más gaps absolutos: §3.7 Espectros** — prácticamente todo el juego con el arquetipo Espectro del set FYTE necesita clarificaciones que van más allá de los rulings D21/D22 ya existentes.

---

*Reporte generado por sub-agente Logos — auditoría completada 2026-04-19*
*Basado en lectura completa del master-rulebook-v5.1.md (9712 líneas, 40 páginas) y cross-check con cards.json (1074 cartas)*
