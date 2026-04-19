# Addendum — FAQ Oficial Kódem TCG (integración rulings v5.1)

**Fecha:** 2026-04-19
**Fuente:** FAQ publicado en el sitio oficial de Kódem TCG.
**Status:** ✅ **OFICIAL** — con autoridad superior a los rulings tentativos/interpretativos. Este documento es **normativo**.
**Relación con `rulings-v5.1.md`:** resuelve definitivamente varias dudas que estaban abiertas o marcadas como tentativas. Cada entrada indica qué rulings/dudas previas cierra o refina.

---

## FAQ-01. Cartas boca abajo en descanso — no requieren revelación

**Pregunta oficial:** *¿Cuándo una carta boca abajo se coloca en descanso, es necesario revelarla?*

**Ruling oficial:**
> No es necesario. Las cartas se pueden colocar boca abajo en descanso (y así se mantendrán a menos que se deseen revelar). Puedes utilizar un marcador para indicar descansos, en caso de ser necesario.

**Implicancias:**
- Una carta oculta puede acumular descansos sin perder su condición de oculta.
- Se puede usar marcador físico (token, contador) para trackear el descanso de una carta boca abajo sin delatarla.
- La revelación es **siempre voluntaria** por parte del dueño, salvo que un efecto o ataque la fuerce.
- Compatible con D8 (targeting de cartas ocultas en ataque): el rival puede targetear una carta oculta sin conocer su estado, incluyendo descansos.

**Relación con rulings previos:** Complementa D8 (targeting oculto) y D21/D22 (stats propios del Espectro sin revelación forzada).

---

## FAQ-02. "Saltar turno" — definición operativa

**Pregunta oficial:** *¿Qué significa saltar tu turno?*

**Ruling oficial:**
> Saltar turno significa que vas directo hasta tu fase de fin de turno, por lo cual se podrán actualizar descansos y aplicar efectos que indiquen activación a fin de turno.

**Implicancias:**
- "Saltar turno" ≠ "no jugar": sí se ejecuta la Fase de Fin de Turno.
- Se **actualizan descansos** durante la Fase de Fin (avance normal del reloj de descansos).
- Se **disparan efectos con trigger "al final del turno"** (ej. Trote Espectral agregando descanso adicional).
- Se **omiten**: Fase Previa (declaración de Pasivas, Activas no-rápidas), Fase de Batalla (ataques), Fase Post (resoluciones pendientes), Fase de Equipo (reequipar).

**Relación con rulings previos:** Refina **D10** (Pasar Turno: solo al inicio del turno, solo el jugador activo). FAQ-02 aclara el alcance operacional: no se saltan *todas* las fases, sino que se avanza directo a la Fase de Fin. Los efectos "a fin de turno" (descansos, activaciones) sí resuelven.

**Carta canónica:** **Yakerr, Hogar** (LGRO-065) — costo "debes pasar 1 turno antes de atacar" funciona bajo esta definición: el turno saltado ejecuta fin-de-turno, permitiendo actualizar descansos antes del turno siguiente donde Yakerr puede atacar.

---

## FAQ-03. Ataques negados y efectos condicionados a "si esta carta ataca"

**Pregunta oficial:** *Si se niega un ataque, ¿qué pasa con efectos que dicen "si esta carta ataca"?*

**Ruling oficial:**
> Si el efecto de la carta atacante está condicionado a su ataque ("si esta carta ataca") y el ataque es negado, los efectos (activas y pasivas) no habrán cumplido su condición, por lo cual no podrán usarse ya que el ataque no sucedió.

**Implicancias:**
- La negación del ataque **invalida retroactivamente** la condición. El ataque "no sucedió" a efectos de triggers.
- Aplica tanto a Activas como a Pasivas condicionadas al evento `ataca`.
- El coste del ataque (descanso, daño auto-infligido, etc.) ya pagado: ver FAQ-04 para el caso específico de Yanzi (6 puntos).

**Relación con rulings previos:** Resuelve **D33 opción 3** parcialmente (si esta carta ataca dispara o no en un mecanismo alternativo): aquí el ataque **negado** invalida el trigger. Por extensión lógica, un ataque que ni siquiera se resuelve por alguna otra vía tampoco dispararía "si ataca". Este FAQ no cierra D33 (Espectro sin poseer) pero da la regla operativa para el caso de negación.

**Aplicación a D40 (ataque múltiple):** Si una Activa-Rápida niega uno de los ataques adicionales de Kephir/Ulmor, los efectos condicionados a ese ataque particular **no disparan**, aunque los otros ataques sí hayan sucedido. Cada ataque es una condición independiente.

---

## FAQ-04. Yanzi, Precisión — errata: 6 puntos se pierden si ataque negado

**Pregunta oficial:** *Con "Yanzi, Precisión", si se niega el ataque de la carta vinculada, ¿qué ocurre con los 6 puntos?*

**Ruling oficial:**
> "Yanzi, Precisión" tiene una errata (especificada en el ruling). Lo que hace es darle a la carta vinculada la posibilidad de atacar con 6 puntos; al negarse el ataque esos 6 puntos se pierden porque pertenecen al mismo ataque.

**Implicancias:**
- **Yanzi, Precisión tiene errata oficial reconocida** — mecánica correcta: *"la carta vinculada puede atacar con 6 puntos"* (no un daño separado adicional).
- Los 6 puntos son **parte del ataque mismo**, no un efecto independiente.
- Si el ataque es negado, los 6 puntos **se pierden completos** (no se aplican como daño de efecto ni como daño diferido).

**Relación con rulings previos:** Consistente con FAQ-03 (ataque negado anula todos los efectos del ataque). Confirma que el "daño extra" otorgado por cartas-vínculo/equipos/protectores es parte atómica del ataque, no modulable por separado.

**TODO editorial:** Documentar la errata de Yanzi, Precisión en el rulings-v5.1.md propio (lookup cards.json por todas las variantes para validar redacción actual). Verificar que cards.json refleje: *"permite a la carta vinculada atacar con 6 puntos"* (patrón de redacción oficial) en lugar de cualquier redacción alternativa previa.

---

## FAQ-05. Orden de resolución de Activas Rápidas

**Pregunta oficial:** *¿Cuál es el orden de resolución cuando hay Activa Rápida?*

**Ruling oficial:**
> Las cartas con Activa Rápida tienen prioridad en la resolución, por lo cual en el momento en el que una Activa Rápida se activa, inmediatamente resolverá su efecto. Si hay 2 Activas Rápidas, el jugador en turno tiene prioridad para usar la suya; la segunda deberá esperar a que la primera resuelva.

**Implicancias:**
- Activa Rápida = prioridad máxima de resolución.
- Entre dos Activa-Rápidas en la misma ventana, **prioridad del jugador en turno**.
- La segunda Activa-Rápida **espera a que la primera resuelva** — no se "cancelan" entre sí ni se apilan en LIFO.

**Relación con rulings previos:** Este FAQ **cierra parcialmente D41** (ventana de uso de Activas-Rápidas en turno rival) al confirmar:
- Son resolución inmediata (no diferidas).
- El jugador en turno tiene prioridad entre competidoras.

Sin embargo D41 aún queda **parcialmente abierta**: la pregunta de si la ventana es "en cualquier momento" vs "solo Fase de Batalla" no se responde directamente. Este FAQ confirma que **cuando se activan**, resuelven inmediato; no define cuándo es legal activar.

**Orden de resolución confirmado (con FAQ-05 integrado al Orden de p17):**
1. Activa-Rápida del jugador en turno (prioridad).
2. Activa-Rápida del jugador rival (espera a que la 1 resuelva).
3. Daños por ataque.
4. Activa del jugador en turno.

(Este orden ya figuraba en D2 — FAQ-05 lo canoniza.)

---

## FAQ-06. "Daño extra" como daño de ataque vs daño por efecto (Voracidad Natural)

**Pregunta oficial:** *¿El "daño extra" es daño por efecto? ¿Afecta a "Voracidad Natural"?*

**Ruling oficial:**
> Es un daño de ataque que se aumenta sólo temporalmente. A diferencia de la escala (que se aumenta permanentemente), este daño no es daño por efecto; por lo tanto sí afecta al Adendei equipado con "Voracidad Natural", al ser daño de ataque aumentado.

**Implicancias (distinción canónica de 3 tipos de daño):**

| Tipo | Persistencia | Categoría mecánica | Ejemplos |
|------|-------------|-------------------|----------|
| **Escala** | Permanente | Modificador de stat | "escala 1 pto" (Hypex Rey) |
| **Daño extra / aumentado** | Temporal (1 ataque) | Daño de ataque | Yanzi Precisión (+6), equipos que suman al ataque |
| **Daño por efecto** | Puntual (1 resolución) | Daño independiente de ataque | "daña 1 pto a..." sin conectar al ataque |

- **Voracidad Natural** responde a **daño de ataque** (incluye daño extra/aumentado) pero **NO** a daño por efecto.
- La escala **no es** daño extra — es un modifier permanente de la estadística `damage`.

**Relación con rulings previos:** Refina la definición de §6.4 Tipos de Daño del rulebook. Canoniza la taxonomía de 3 categorías para resolver ambigüedades en cartas futuras.

**Aplicación a D52 (Zaykan, Citadel "todos los Adendei-Átlico"):** el "1 pto. adicional" de Zaykan Citadel es **daño de ataque aumentado** (no daño por efecto) según este FAQ. Esto matiza las 4 opciones de D52: el alcance del "1 adicional" se aplica durante el ataque, no como pulso AoE independiente.

---

## FAQ-07. Revelar cartas al ser atacadas — resolución de Pasivas condicionadas

**Pregunta oficial:** *¿Puedo revelar cartas cuando son atacadas? ¿Cuándo resuelven sus pasivas (ej. "Bóras, Sacrificio")?*

**Ruling oficial:**
> Al momento de ser atacadas se podrán responder revelando la carta. En batalla sólo se pueden usar Activas y Activas Rápidas; las pasivas que hayan cumplido sus condiciones durante batalla (si fueron reveladas al ser atacadas) resolverán en la fase Post (después de Batalla). Por lo cual, al concluir la Batalla, "Bóras, Sacrificio" podrá usar su Pasiva.

**Implicancias (clarificación crítica del flujo Batalla → Post):**
- **En Fase de Batalla**: SÍ se permite revelar cartas defensivamente al ser atacadas.
- **En Fase de Batalla**: SOLO se ejecutan Activas y Activas-Rápidas (no Pasivas regulares).
- **Pasivas condicionales que se dispararon en Batalla** (por el evento "ser atacada", "ser enviada a Extinción", etc.): **se resuelven en Fase Post**, no durante la Batalla misma.
- El flujo es:
  1. Rival declara ataque.
  2. Defensor puede revelar su carta (dispara condición de Pasiva "si es atacada").
  3. Batalla resuelve (daños, Activas-Rápidas, Activas).
  4. Post: Pasivas cuyas condiciones se cumplieron en Batalla resuelven aquí.

**Relación con rulings previos:** **Cierra D42** (Pasivas-Rápidas disparadores) parcialmente + refina **D41**. Ahora queda claro que:
- Hay **dos ventanas** diferentes para Pasivas:
  - Pasiva-Rápida: resuelve **inmediata** en la ventana de disparador (incluye durante Batalla si el disparador es eliminación/revelación/declaración).
  - Pasiva regular (no rápida): la condición se cumple en Batalla, pero la **resolución** se difiere a Fase Post.
- Esto **resuelve la tensión** de D42: no es que las Pasivas "respondan a ataques"; es que las condiciones de Pasiva pueden cumplirse durante Batalla (por "ser atacado") y la **resolución** ocurre después, en Post.

**Carta canónica:** **Bóras, Sacrificio** — Pasiva con condición "si esta carta es atacada". Defensor la revela al ser atacada → condición cumplida → resolución en Post.

**Actualización de D42 en portal:** La opción 1 (lista exhaustiva) queda refinada: Pasivas-Rápidas tienen 3 disparadores explícitos (revelación/eliminación/declaración de Pasivas) y esos sí resuelven inmediato. Las Pasivas **regulares** con condiciones disparadas en Batalla (ser atacado, ser dañado) sí pueden cumplir condición en Batalla, pero la resolución se difiere a Post. Ambos tipos coexisten.

---

## FAQ-08. Ixim — revelación y activación de Pasivas

**Pregunta oficial:** *Ixim: ¿cuándo pueden revelarse y activarse sus pasivas?*

**Ruling oficial:**
> Dado que los Ixim cuentan únicamente con Pasivas, pueden ser revelados durante la Previa o durante un ataque; sus pasivas se activan en cualquier momento en que se cumplan las condiciones especificadas, si fuese el caso.

**Implicancias:**
- **Ventanas de revelación de Ixim:** Fase Previa + durante un ataque (defensivo o atacante).
- **Ventana de activación de Pasiva de Ixim:** siempre que se cumpla la condición.
- Los Ixim pueden ser **reactivos** — revelarse en respuesta a un ataque para disparar su Pasiva.

**Relación con rulings previos:** Refina **M17** (Ixim siempre tendrán Pasivas, incluyendo Pasiva-Rápida). Confirma que los Ixim **no están limitados** a Fase Previa para revelar/activar. Hacia **M19** (Ixim y descansos por Activa): este FAQ no toca ese tema, se mantiene tentativo.

**Cartas canónicas (Ixim con Pasiva-Rápida):**
- **Bomba de Clorofila** (TCDE-012) — revela desde Zona de Equipo al negarse un ataque → daña 3 ptos a Adendei equipados en ZP.
- **Copal Blanco** (FYTE-008)
- **Planta Carnívora** (RAMI-008S / RAMI-023)

Estas 3+ cartas son ejemplos de Ixim que se revelan **fuera de Fase Previa** (durante ataques) para activar sus Pasivas-Rápidas.

---

## Resumen de impacto sobre rulings previos

| Ruling previo | Status post-FAQ | FAQ relevante |
|--------------|-----------------|---------------|
| D8 (targeting oculto) | ✅ Complementado | FAQ-01 |
| D10 (pasar turno) | ✅ Refinado | FAQ-02 |
| D33 (Espectro atacar sin poseer) | 🟡 Parcialmente resuelto vía FAQ-03 | FAQ-03 |
| D41 (ventana Activas-Rápidas) | 🟡 Parcialmente cerrado | FAQ-05 |
| D42 (Pasivas-Rápidas) | ✅ Cerrado vía distinción Rápida/Regular | FAQ-07 |
| D40 (ataque múltiple negado) | ✅ Refinado (cada ataque condición independiente) | FAQ-03 |
| D52 (Zaykan Citadel AoE) | 🟡 Matizado — daño extra = ataque aumentado | FAQ-06 |
| M17 (Ixim con Pasiva-Rápida) | ✅ Confirmado + refinado ventanas | FAQ-08 |
| M19 (Ixim descansos por Activa) | 🟡 Sin cambio (fuera del scope FAQ) | — |

---

## Errata oficial reconocida: Yanzi, Precisión (FAQ-04)

El FAQ oficial **reconoce explícitamente** una errata en Yanzi, Precisión. Texto canon:

> "Activa: El Adendei vinculado no recibe descanso al vincularse, y podrá **atacar con 6 puntos** a un Adendei rival en tu siguiente turno."

Los 6 puntos son parte del **ataque mismo** (no un daño por efecto). Por eso al negarse el ataque, los 6 se pierden (FAQ-04).

**Hallazgo en cards.json (2026-04-19):** 4 variantes del mismo nombre con **texto divergente**:

| Folio | Texto previo |
|-------|--------------|
| IDRMP-008 | "podra atacar con 6 puntos" ✅ correcto |
| LGRO-067 | "podra atacar con 6 puntos" ✅ correcto |
| TRWA-067 | "podra atacar con 6 puntos" ✅ correcto |
| **RMR-011** | "podrá **dañar** 6 ptos." ❌ — reflejaba la errata (verbo y mecánica distintos) |

**Fix aplicado:** cards.json commit con RMR-011 normalizada al texto canon ("atacar con 6 puntos"). Las 4 variantes ahora comparten mecánica idéntica (regla fundamental de Kodem: variantes por nombre ≡ mismo efecto).

**Diferencia mecánica resuelta:**
- "Atacar con 6 puntos" = daño de ataque aumentado (FAQ-06 tipo 2) → sujeto a Voracidad Natural, puede negarse con Activa-Rápida (pierde los 6).
- "Dañar 6 puntos" = daño por efecto (FAQ-06 tipo 3) → no afectado por Voracidad Natural, negación de ataque NO lo cancela.

La errata en RMR-011 hubiera hecho la variante estratégicamente distinta. Corregida.

---

## Próximos pasos sugeridos

1. **Actualizar portal D41, D42, D40:** marcar las opciones que este FAQ invalida; agregar nota "resuelto parcialmente por FAQ oficial".
2. **Revisar Yanzi, Precisión** en cards.json y documentar ruling específico (FAQ-04 TODO).
3. **Integrar la taxonomía de 3 tipos de daño** (FAQ-06) en `rulings-v5.1.md` como ruling canónico — útil para resolver cartas futuras.
4. **M17 promoción a ✅ RESUELTO:** el FAQ-08 confirma la interpretación tentativa.

---

_Addendum generado 2026-04-19 a partir del FAQ oficial publicado por Ramsés en el sitio de Kódem TCG._
