# Auditoría Kódem TCG v5.1 — Parte 2 de 3 (páginas 16-28)

**Alcance:** p16-p28 — Fases del Turno, Descansos, Diagrama de Turno, Reemplazo de Cartas, Interacciones y Efectos (§6.1-§6.5), Cambios entre Zonas, Ataque (§6.6), Vivificar.
**Subagente:** kodem-audit-v3-part2-pages-16-28
**Fecha:** 2026-04-19

---

## D33. "Activas Rápidas" vs "Activa-Rápida" — inconsistencia de guión en misma página

**Categoría:** errata | inconsistencia
**Anchor:** p16/b11 y p16/b06b — cita textual

- `p16/b11`: "el rival puede revelar cartas y/o usar *Activas Rápidas*" (SIN guión)
- `p16/b06b`: "solo puede revelar cartas con **Pasiva-Rápida**" y "*(Ver Pasivas-Rápidas en 6.6.2 Pasivas)*" (CON guión)

**Problema:** En la misma página 16 el rulebook usa dos convenciones tipográficas distintas para el mismo tipo de efecto. `p16/b11` escribe "Activas Rápidas" (dos palabras separadas, ambas en cursiva). `p16/b06b` escribe "Pasiva-Rápida" / "Pasivas-Rápidas" (con guión). Esta inconsistencia reaparece en p27/b15 (Zaykan: "Activa Rápida" sin guión) vs p27/b16 (Brazalete de Rotanio: "Activa-Rápida" con guión) en el texto de dos cartas impresas en la misma página. El rulebook no establece si el guión es canónico o no.

**Cartas implicadas:** Cualquier carta con "Activa Rápida" / "Activa-Rápida" en su texto — afecta búsquedas y consistencia editorial.

**Opciones de ruling:**
1. La forma CON guión (`Activa-Rápida`) es la canónica — todas las instancias sin guión son erratas tipográficas. Normalizar en v5.2.
2. Ambas formas son válidas (guión opcional, misma mecánica) — no requiere corrección mecánica, solo nota editorial de equivalencia.
3. Sin guión = nombre informal/coloquial; CON guión = nombre oficial (como "Activa-Rápida") — distinguir en glosario §9.

---

## D34. Zona "mano" — zona no declarada usada en regla de §6.5

**Categoría:** mech | ambig
**Anchor:** p24/b03 — cita textual

> "Solo se considera que una carta está **en mano** cuando se toma del Mazo, por reemplazo o por efecto de alguna carta."

**Problema:** El rulebook menciona "en mano" como estado/zona diferenciado, pero la zona "Mano" no aparece en la lista de zonas de §4 (Preparación del Ecosistema). Las zonas listadas son Zona Principal, Zona de Equipo, Bio, Mazo Principal, Extinción (y Fuera de Juego según D5). "Mano" se menciona como estado transitorio al momento de tomar cartas del mazo. Esta regla en §6.5 implica que "en mano" tiene relevancia mecánica concreta (p. ej. cartas "en mano" pueden interactuar con efectos que mencionen esa condición), pero no tiene definición formal ni aparece en el glosario §9.

**Cartas implicadas:** Cualquier carta que mencione "en mano", "carta tomada", o interacciones al momento de reemplazo.

**Opciones de ruling:**
1. "En mano" es un estado momentáneo (no una zona), que existe solo durante la ventana de reemplazo — no requiere listarse como zona, pero debe definirse en glosario como "estado transitorio".
2. "En mano" es una zona real adicional (como Fuera de Juego) — debe formalizarse en §4 y glosario.
3. La regla de p24/b03 describe únicamente el contexto de §6.5 (cambios entre zonas) y no declara una zona global — su alcance es local a esa sección.

---

## D35. Vivificar — definición solo negativa, mecánica positiva ausente

**Categoría:** mech | ambig
**Anchor:** p28/b07-b10 — cita textual

> `p28/b07`: "Vivificar"
> `p28/b08`: "Algunas cartas en Kódem son variantes resurecctas, de los personajes, es decir, que fueron traídas de regreso del Reino de la muerte. Esta cartas normalmente se relaacionan con el fecto de 'VIVIFICAR'"
> `p28/b10`: "Vivificar: Las cartas que **explícitamente** no mencionen en sus textos, que pueden vivificar, enviar cartas de Extinción a otras Zonas o Intercambiar cartas con cartas en Extinción, **no** podrán sacar cartas de Extinción a otras Zonas."

**Problema:** La sección Vivificar en p28 define el mecanismo únicamente por lo que **no** pueden hacer cartas sin el texto adecuado. No existe una definición positiva de qué es Vivificar mecánicamente: cómo se declara, en qué Fase se puede usar, si requiere pago de costo adicional, si la carta vivificada entra revelada u oculta, con cuántos puntos de vida, ni cómo interactúa con Reemplazo de Cartas (§5.3). La sección se centra en el lore ("variantes resurrectas", "Reino de la muerte") más que en la mecánica concreta.

Adicionalmente, p28/b10 equipara tres acciones distintas como si fueran equivalentes: "vivificar", "enviar cartas de Extinción a otras Zonas", e "Intercambiar cartas con cartas en Extinción". No queda claro si estas son sinónimas o si son variantes de distinto alcance.

**Cartas implicadas:** Mixtla, Regreso; Ketzz, Plumas Inmortales; Ariam, Resurgimiento Fangoso; cualquier carta con efecto de vivificar.

**Opciones de ruling:**
1. "Vivificar" = cualquier efecto que regresa una carta de Extinción al campo (zona activa). Las tres frases de p28/b10 son expresiones equivalentes del mismo mecanismo. La mecánica completa se gobierna por §5.3 (carta entra con 6 ptos. de vida, se coloca como en reemplazo normal).
2. "Vivificar" = mecanismo específico distinto de "enviar a otra zona" o "intercambiar" — cada uno tiene reglas distintas de vida al entrar, posición en ZP y compatibilidad de reemplazo.
3. La sección actual es incompleta y requiere subsección formal en v5.2 que especifique: (a) vida al entrar, (b) posición en ZP, (c) Fases en las que se puede declarar, (d) interacción con Reemplazo.

---

## D36. Condición simultánea de activación — ¿una vez absoluto o una vez por fuente?

**Categoría:** ambig
**Anchor:** p28/b12 — cita textual

> "Si la condición para activar un efecto se cumple varias veces simultáneamente, el efecto sólo se activará una vez."

**Problema:** La regla de p28/b12 dice que si una condición se cumple múltiples veces en simultáneo, el efecto se activa solo una vez. No queda claro si esto aplica:
- (A) Solo a la misma carta (su efecto no se apila si su condición se cumple N veces a la vez).
- (B) A todas las cartas con la misma condición — si dos cartas distintas tienen el mismo trigger simultáneo, ¿solo se activa una de las dos?

**Caso concreto:** Si hay 2 Adendei revelados al mismo tiempo (p. ej. por efecto masivo de revelación) y ambos tienen "Pasiva: Si este Adendei es revelado, [efecto]", ¿cada uno activa su pasiva individualmente o solo uno puede activar?

**Cartas implicadas:** Cualquier carta con Pasiva disparada por revelación masiva o eventos simultáneos.

**Opciones de ruling:**
1. La regla aplica PER CARTA: cada carta activa su efecto máximo una vez por trigger simultáneo, pero cartas distintas con la misma condición activan independientemente.
2. La regla aplica GLOBALMENTE: si la condición se cumple simultáneamente para múltiples cartas, el jugador elige cual se activa y las demás no.
3. La regla aplica solo a efectos de UNA MISMA CARTA que podrían apilarse — no limita activaciones de cartas distintas con condiciones similares.

---

## D37. Ataque múltiple — "se considera como 1 solo ataque" vs multi-objetivo con daños distintos

**Categoría:** ambig | mech
**Anchor:** p25/b01 — cita textual

> "También existen cartas que pueden atacar a más de **1** carta durante la Fase de Batalla, sin embargo, se considerará como **1** solo ataque."

**Problema:** La regla de p25/b01 dice que el ataque múltiple "se considera como 1 solo ataque". No se especifica qué implica mecánicamente ser "1 solo ataque" cuando ataca múltiples objetivos:
- ¿El rival puede usar solo UNA Activa-Rápida como respuesta, o puede usar una por cada carta atacada?
- ¿Los costos de la carta atacante se pagan una vez o por cada objetivo?
- ¿Los "gatillos de efecto" de cartas defensivas (ej. "Si esta carta es atacada…") se disparan por cada carta atacada, o solo una vez?
- ¿El daño por quemadura (si aplica) se paga una vez o por cada declaración?

La carta ejemplo Ulmor (p25/fig-01) tiene "Pasiva: Ataca a todos los Adendei rivales" y "Costo: Esta carta se daña 1 pts antes de atacar" — ¿el costo de 1 daño es total o por objetivo?

**Cartas implicadas:** Ulmor, Ataque Fugaz; cualquier carta con texto "ataca a todos", "ataca a X Adendei", o similar.

**Opciones de ruling:**
1. "1 solo ataque" = una declaración, una ventana de Respuesta Rival, costos pagados una vez. Los gatillos defensivos se activan por cada carta atacada individualmente.
2. "1 solo ataque" = todo ocurre en bloque: una respuesta del rival, costos una vez, gatillos defensivos también una sola vez total.
3. Depende del texto de la carta: si el costo dice "antes de atacar" (singular) es una vez; si dice "por cada carta atacada" es múltiple.

---

## D38. "Efectos reemplazados" por ataque múltiple — daño que reemplaza vs suma

**Categoría:** ambig | mech
**Anchor:** p24/b07 — cita textual

> "Los efectos que permiten 'Atacar' o 'atacar adicionalmente' a múltiples cartas y que mencionan el número de puntos de daño a realizar dicho daño reemplazara el ataque base de la carta. Ej Yanzi, precisión."

**Problema:** Esta regla establece que cuando un efecto indica atacar a múltiples cartas con un número de puntos específico, ese número **reemplaza** (no suma) el daño base. No hay un ejemplo funcional completo: "Ej Yanzi, precisión" menciona la carta pero no explica el texto de la carta ni cómo se aplica el reemplazo.

Quedan sin resolver:
- ¿El daño aumentado (escalar) se suma al daño del efecto o también queda reemplazado?
- ¿El daño adicional de otras fuentes se suma al daño del efecto reemplazado?
- ¿"Reemplazar el ataque base" significa que la fórmula pasa de (Daño Base + Aumentado + Adicional) a (Daño Efecto + Adicional), o todo queda reemplazado?

**Cartas implicadas:** Yanzi, Precisión; cualquier carta con "ataca a X cartas haciendo Y puntos de daño".

**Opciones de ruling:**
1. El daño del efecto reemplaza SOLO el Daño Base. La fórmula queda: Daño Efecto + Daño Aumentado + Daño Adicional.
2. El daño del efecto reemplaza el Daño Base + Aumentado. La fórmula queda: Daño Efecto + Daño Adicional.
3. El daño del efecto reemplaza el daño total de ataque. La fórmula queda: solo Daño Efecto (ninguna suma aplica).

---

## D39. Efectos declarados en zona distinta — alcance de la regla de persistencia

**Categoría:** ambig | inconsistencia
**Anchor:** p25/b06 — cita textual

> "Los efectos declarados en cualquier Zona o fuera de ellas (Ej. cartas *tomadas* o *vivificadas*) se considerarán que resuelven como si la carta aún estuviera en dicho lugar aun si la carta ya no se encuentra en la misma zona o lugar donde se declaró el efecto."
>
> [Más adelante en misma sección:]
>
> "Si una carta no menciona en su texto cuando termina su efecto, terminará cuando la carta ya no se encuentre en campo."
>
> [Y también:]
>
> "Sólo las cartas reveladas en el campo podrán hacer uso de sus efectos."

**Problema:** Existe tensión entre tres reglas en p25/b06:
1. Efectos ya declarados resuelven aunque la carta cambie de zona (persistencia de resolución).
2. Efectos sin cláusula de duración terminan cuando la carta deja el campo.
3. Solo cartas reveladas EN CAMPO pueden usar sus efectos.

La regla 3 parece contradecir a los HandTraps (p20/b08) que se disparan cuando la carta es tomada del mazo (NO está en campo). La regla 1 parece contradecir a la regla 2 para efectos duraderos. No queda claro si la regla 3 se aplica solo a la *declaración* de efectos nuevos (no a la *resolución* de efectos ya declarados), o si los HandTraps son una excepción explícita a la regla 3.

**Cartas implicadas:** HandTraps (Ariam Escudo, Kap Lluvia de Ranas, Kaykac Sorpresa Pírica, etc.); Quam Detrás de la Materia; cualquier efecto declarado bajo condición de cambio de zona.

**Opciones de ruling:**
1. La regla 3 aplica solo a efectos declarables voluntariamente; los HandTraps son una excepción explícita por texto de carta (D17 aplica: efecto de carta supercede). No hay contradicción real.
2. La regla 3 aplica solo a la declaración de NUEVOS efectos; la regla 1 rige para efectos YA declarados que continúan resolviendo. HandTraps se declaran antes de entrar al campo → aplica regla 1.
3. Hay una inconsistencia real que requiere aclaración en v5.2: diferenciar "uso/declaración de efectos" vs "resolución de efectos ya declarados" vs "efectos que se disparan fuera del campo".

---

## M15. Ixim y descansos — ausencia de regla simétrica a Rot

**Categoría:** mech
**Anchor:** p18/b09 — cita textual

> "La declaración de Activa de las cartas equipo Rot NO aplicarán descansos para la carta Rot ni para su carta equipada en Fin de Turno."

**Problema:** Esta regla establece explícitamente que los Rot NO generan descansos al usar su Activa. Sin embargo, no existe una regla equivalente para Ixim. El rulebook describe en §3.4 (p10-p11) las diferencias entre Ixim y Rot, pero no especifica si la Activa de un Ixim genera o no descansos para el Ixim ni para la carta equipada.

Dado que Ixim SÍ puede equiparse a Adendei y tiene estadísticas y costos propios, es relevante saber si al declarar la Activa del Ixim, el Ixim descansa, el Adendei equipado descansa, o ninguno descansa.

La regla de p16/b08 dice: "se puede considerar su Activa y la de la carta equipada como 1 sola Activa" — pero no especifica los efectos en descanso cuando son tratadas como una sola.

**Cartas implicadas:** Todas las cartas Ixim equipadas a Adendei.

**Opciones de ruling:**
1. Las Activas de cartas Ixim SÍ generan descansos (aplican la regla general): la carta equipada entra a sus descansos al usar la Activa del Ixim como parte del "1 solo turno de uso".
2. Las cartas Ixim siguen la misma regla que Rot: NO generan descansos al usar su Activa (la exención de Rot se extiende a Ixim por analogía de diseño).
3. Solo la carta que DECLARA la Activa descansa; si se usa la Activa del Ixim, solo el Ixim descansaría (pero Ixim no tiene estadística de descanso propia), entonces nadie descansa.

---

## M16. Reemplazo fallido — "tercer reemplazo" vs "dos veces"

**Categoría:** ambig
**Anchor:** p20/b06 — cita textual

> "Esta acción puede repetirse un máximo de **2 veces**. Si después del **tercer reemplazo** el jugador aún no puede colocar una carta en el campo, perderá la partida inmediatamente."

**Problema:** El texto es internamente contradictorio en el conteo:
- "puede repetirse un máximo de **2 veces**" = el proceso de tomar 3 cartas y no poder colocar ninguna se repite hasta 2 veces adicionales → total de 3 intentos.
- "Si después del **tercer reemplazo**..." — esto sugiere que el contador llega a 3.

Sin embargo, "repetirse 2 veces" podría leerse como "además del intento original, puede repetirse 2 veces más" = 3 intentos totales, lo que sería consistente con "tercer reemplazo". Pero también podría leerse literalmente como "el proceso se repite solo 2 veces" = 2 intentos totales, haciendo que "tercer reemplazo" sea errata (debería decir "segundo reemplazo").

**Opciones de ruling:**
1. La lógica correcta es 3 intentos totales: intento 1 → falló → repite (intento 2) → falló → repite (intento 3, "tercer reemplazo") → falla → pierde. "Máximo 2 veces" = 2 repeticiones después del primer intento.
2. La lógica correcta es 2 intentos totales: intento 1 → falló → repite 1 vez (único) → falla → pierde. "Tercer reemplazo" es una errata, debería decir "segundo reemplazo".
3. El texto tiene una errata de consistencia; la intención es 3 intentos totales (inferida por "tercer reemplazo"), y "máximo de 2 veces" debería decir "puede realizarse hasta 3 veces en total" o "puede repetirse 2 veces adicionales".

---

## M17. Feralizar — "1 de sus energías originales" — ¿cuál energía pierde si tiene múltiples?

**Categoría:** ambig | mech
**Anchor:** p22/b08 — cita textual

> "FERALIZAR: Es un efecto que hace que una carta pierda **1 de sus energías originales** y se considera Feral (que no es considerada una Energía)."

**Problema:** El rulebook dice que la carta pierde "1 de sus energías originales" al feralizar. No especifica:
1. ¿Qué ocurre si la carta tiene múltiples energías originales (subtipos compuestos, ej. una carta hipotética con dos energías)? ¿Quién elige qué energía pierde?
2. "Originales" vs. "actual": si una carta ya fue ferralizada antes (perdió una energía), ¿puede ser feralizada de nuevo? ¿Perdería su segunda energía?
3. Si la carta pierde su única energía y se considera "Feral", ¿qué pasa con efectos que filtren por la energía perdida? ¿La carta deja de cumplir esos filtros?
4. ¿La feralización es permanente o temporal? (§6.2 no lo aclara, aunque "Feralizar" está en la sección de Cambios de Estadísticas, no en Marcas).

**Cartas implicadas:** Yakerr, Encuentro (LGRO-065); cualquier carta con efecto "Feraliza".

**Opciones de ruling:**
1. La carta pierde su energía principal (la indicada en su tipo). Si la carta tiene solo una energía, esa es la que pierde. El efecto que feraliza elige si hay ambigüedad. La feralización es permanente hasta efecto de reversión.
2. El jugador dueño de la carta ferralizada elige qué energía pierde (cuando aplique). La feralización es permanente.
3. Una carta ya ferralizada (sin energía original) no puede ser ferralizada de nuevo (la condición "pierde 1 energía original" no se puede cumplir si ya no tiene). Requiere formalización en glosario.

---

## E9. Typos en §Vivificar (p28/b08) — 5 errores en un párrafo

**Categoría:** errata
**Anchor:** p28/b08 — cita textual

> "Algunas cartas en Kódem son variantes **resurecctas**, de los personajes, es decir, que fueron traídas de regreso del Reino de la muerte. **Esta** cartas normalmente se **relaacionan** con el **fecto** de 'VIVIFICAR'"

**Problema:** 4 erratas tipográficas en 2 oraciones:
1. `resurecctas` → debería ser `resurrectas` (doble c incorrecta)
2. `Esta cartas` → debería ser `Estas cartas` (falta concordancia, falta "s")
3. `relaacionan` → debería ser `relacionan` (doble "a" incorrecta)
4. `fecto` → debería ser `efecto` (falta la "e" inicial)

Adicionalmente en p28/b04: `Extincion` → debería ser `Extinción` (falta acento).

**Opciones de ruling:** Correcciones directas en v5.2 — sin ambigüedad mecánica, solo erratas ortográficas.

---

## E10. Typos en §Generalidades de Efectos (p26/b03) — 4 errores

**Categoría:** errata
**Anchor:** p26/b03 — cita textual

> "no podrá recibir ptos. de daño negativos, no serán acumulativos para la carta que reemplace a la **eliminadan** ni transferibles a otras cartas aliadas o rivales."
> "sin embargo de los 2 ptos. de daño. que 'Ariam' tiene en su estadística de **atque** solo recibirá 1 pto. de daño y 'Enis' será enviada a Extinción."
> "podrá ser atacada por 'Ariam, Escudo de **Cempasúchi**'"

**Problema:** 3 erratas tipográficas en p26/b03:
1. `eliminadan` → debería ser `eliminada` (letra extra "n")
2. `atque` → debería ser `ataque` (falta la "a")
3. `Cempasúchi` → debería ser `Cempasúchil` (falta la "l" final; el nombre completo de la carta impreso en p26/fig-04 es `Cempasúchil` CON L)

Adicionalmente en p26/b02: asterisco mal colocado en `E*jemplo` y espacio extra antes de coma en `efecto ,`.

**Opciones de ruling:** Correcciones directas en v5.2 — sin ambigüedad mecánica.

---

## E11. Typos misceláneos páginas 16-28 (catálogo menor)

**Categoría:** errata
**Anchor:** múltiples

| Ubicación | Texto incorrecto | Corrección | Tipo |
|-----------|------------------|------------|------|
| p20/b02 | `Prinicipal` | `Principal` | typo |
| p23/b04 | `regresara` | `regresará` | acento faltante |
| p24/b07 | `reemplazara` | `reemplazará` | acento faltante |
| p24/b07 | `Ej Yanzi, precisión` | `Ej. Yanzi, Precisión` | punto faltante + capitalización |
| p27/b10 | `descansos máximo` | `descansos máximos` | concordancia de número |
| p27/b11 | `Ejemplo:"Zaykan,Emboscada"` | `Ejemplo: "Zaykan, Emboscada"` | espacios faltantes |
| p27/b11 | `este disponible` | `esté disponible` | acento faltante |
| p28/b01 | `considerara` | `considerará` | acento faltante |
| p28/b04 | `Extincion` | `Extinción` | acento faltante |
| p28/b04 | `si cumple` (en paréntesis) | `sí cumple` | acento faltante (adverbio afirmativo) |

**Opciones de ruling:** Correcciones directas en v5.2 — sin ambigüedad mecánica.

---

## M18. Pasivas durante Fase de Batalla — regla general vs nota p19/b02

**Categoría:** ambig | inconsistencia
**Anchor:** p19/b02 y p17/b03 — cita textual

`p19/b02` (nota sobre el diagrama):
> "Las Pasivas que cumplan su condición, podrán declararse en **todas las Fases** a excepción de la Fase de Batalla."

`p17/b03` (Fase Post):
> "Primero se envía a Extinción y reemplaza cualquier carta que haya llegado a 0 puntos de vida durante la Fase de Batalla. Se pueden declarar y resolver las Pasivas que cumplan sus condiciones de activación durante Batalla y cualquier otro momento."

**Problema:** Existe una aparente contradicción: la nota del diagrama (p19/b02) dice que las Pasivas NO pueden declararse en Fase de Batalla. Sin embargo, la descripción de Fase Post (p17/b03) dice que en Fase Post "se pueden declarar y resolver las Pasivas que cumplan sus condiciones de activación **durante Batalla**" — lo que implica que algunas Pasivas sí se activan durante Batalla pero se RESUELVEN en Fase Post.

No queda claro si:
1. Las Pasivas con condición que se cumple durante Batalla se DECLARAN en Batalla y se RESUELVEN en Post.
2. Las Pasivas con condición de Batalla se declaran y resuelven SOLO en Fase Post.
3. Ninguna Pasiva puede declararse en Batalla (confirmando p19/b02), pero sus condiciones pueden evaluarse retroactivamente en Fase Post.

**Cartas implicadas:** Cualquier carta con Pasiva disparada por condiciones que ocurren durante la Fase de Batalla (daño recibido, eliminación, ataque declarado).

**Opciones de ruling:**
1. Las Pasivas NO se declaran durante Batalla, pero si su condición se cumplió durante Batalla, el jugador puede declararlas en Fase Post. Regla p17/b03 es aclaración de p19/b02, no contradicción.
2. Hay una excepción implícita: Pasivas-Rápidas sí pueden declararse durante Batalla (como confirma p16/b06b — rival puede usarlas como respuesta). Las "Pasivas" de p19/b02 son Pasivas normales, no Pasivas-Rápidas.
3. Es una contradicción real que requiere aclaración en v5.2: especificar exactamente qué tipo de Pasivas aplican en cada Fase.

---

## M19. Rava — reversión al mazo y condiciones de la acción de Fase Previa

**Categoría:** mech | ambig
**Anchor:** p16/b06 (bullet 7 y 8) — cita textual

> "• **Regresar 1** *Rava* de *Zona Principal* al fondo del Mazo."
> "• **Enviar 2** cartas de *Zona Principal* a Extinción para regresar **1** *Rava* de Extinción a *Zona Principal*."

**Problema:** Estas dos acciones de Fase Previa sobre Rava no especifican si son voluntarias u obligatorias, ni si tienen restricciones adicionales:

1. **Bullet 7** — ¿Puede el jugador elegir NO regresar un Rava al mazo aunque tenga uno en ZP? El texto dice "puedes" en otros bullets pero no aquí. ¿Es obligatorio o opcional?
2. **Bullet 8** — Las "2 cartas de Zona Principal" enviadas a Extinción, ¿pueden ser Adendei, Tokens, Ravas, o cualquier combinación? ¿Puede el jugador enviar 2 Tokens y traer un Rava?
3. ¿Pueden realizarse ambas acciones en el mismo turno (primero regresar 1 Rava al mazo del bullet 7 y luego traer 1 Rava de Extinción con el bullet 8)?
4. El Rava regresado del bullet 8, ¿entra con 6 pts de vida (como el reemplazo de §5.3) o con la vida que tenía cuando fue enviado a Extinción?

**Cartas implicadas:** Todas las cartas tipo Rava.

**Opciones de ruling:**
1. Ambas acciones son voluntarias (opcionales), el jugador elige si las usa. Las 2 cartas enviadas pueden ser de cualquier tipo en ZP. Ambas acciones pueden usarse en el mismo turno (son acciones independientes de la Fase Previa). El Rava regresado entra con 6 pts (regla general de §5.3).
2. Bullet 7 es obligatorio si hay un Rava en ZP; Bullet 8 es voluntario. Las "2 cartas" incluyen restricciones de tipo (solo Adendei, no Tokens ni otros Ravas). El Rava entra con vida que tenía al ser enviado.
3. Las acciones son mutuamente excluyentes: no se pueden usar ambas en el mismo turno.

---

## Resumen

### Conteo por categoría

| Categoría | IDs | Cantidad |
|-----------|-----|----------|
| **ambig** | D33 (parte), D34, D35, D36, D37, D38, D39, M16, M17, M18, M19 | 11 |
| **mech** | D37 (parte), D38 (parte), D39 (parte), M15, M16, M17, M18, M19 | 5 nuevas mecánicas |
| **errata** | D33 (parte), E9, E10, E11 | 3 erratas (catálogo) |
| **inconsistencia** | D33, D39, M18 | 3 |

### Dudas nuevas generadas: 14

| ID | Título | Categoría | Prioridad |
|----|--------|-----------|----------|
| D33 | Guión en "Activa-Rápida" — inconsistencia tipográfica | errata/inconsistencia | 🟡 Media |
| D34 | Zona "mano" no declarada en §4 | mech/ambig | 🟡 Media |
| D35 | Vivificar — definición incompleta | mech/ambig | 🔴 Alta |
| D36 | Condición simultánea — ¿una vez por carta o global? | ambig | 🟡 Media |
| D37 | Ataque múltiple — mecánica de "1 solo ataque" | mech/ambig | 🔴 Alta |
| D38 | Ataque múltiple — daño que "reemplaza" el base | mech/ambig | 🔴 Alta |
| D39 | Efectos declarados en zona distinta — tensión entre 3 reglas | ambig/inconsistencia | 🔴 Alta |
| M15 | Ixim y descansos — ausencia de regla simétrica a Rot | mech | 🟡 Media |
| M16 | Reemplazo fallido — conteo "2 veces" vs "tercer reemplazo" | ambig | 🟠 Media-Alta |
| M17 | Feralizar — ¿cuál energía pierde si tiene múltiples? | mech/ambig | 🟡 Media |
| M18 | Pasivas durante Fase de Batalla — contradicción p19/b02 vs p17/b03 | ambig/inconsistencia | 🔴 Alta |
| M19 | Rava — condiciones de acciones de Fase Previa | mech/ambig | 🟡 Media |
| E9 | Typos §Vivificar p28/b08 (5 errores) | errata | 🟢 Baja |
| E10 | Typos §Generalidades Efectos p26/b03 (4 errores) | errata | 🟢 Baja |
| E11 | Typos misceláneos p16-p28 (10 instancias) | errata | 🟢 Baja |

### Notas de filtrado

Los siguientes hallazgos potenciales fueron descartados por ya estar cubiertos en rulings previos:
- **Referencias cruzadas erróneas p16** (Ver 6.5/6.6.3/6.6.1) → ya resuelto en **D14**
- **Descansos máximos (ZP=2, Prot=3)** → ya resuelto en **D6**
- **CURAR "(6 puntos)" hardcoded en p22/b05** → ya cubierto en **D24** (glosario p37; la instancia de p22/b05 es la misma ambigüedad, ya documentada)
- **HandTraps (p20/b08)** → ya resuelto en **M4**
- **Subfase Resolución como 4a subfase** → ya resuelto en **D2**
- **Protector suplente con descansos** → ya resuelto en **D4** (p20/b05)

---

_Reporte generado por subagente kodem-audit-v3-part2-pages-16-28 · 2026-04-19_