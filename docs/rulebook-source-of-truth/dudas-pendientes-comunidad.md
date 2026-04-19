# Kódem TCG v5.1 — Dudas Pendientes

**Fecha de compilación:** 2026-04-19
**Contexto:** Auditoría completa del rulebook v5.1 + cards.json (1074 cartas). Este documento recopila las dudas, ambigüedades y erratas detectadas que aún requieren ruling del equipo de diseño o retroalimentación de la comunidad.

Si tienes experiencia jugando Kódem TCG o conoces rulings oficiales que resuelvan alguna de estas dudas, nos ayudarías mucho compartiendo tu interpretación o señalando el documento/post donde se aclaró.

---

## Cómo están organizadas

Las dudas están agrupadas por **criticidad** y por **tipo**:

- 🔴 **Reglas genuinamente ambiguas**: dos interpretaciones posibles con efecto jugable distinto.
- 🟡 **Mecánicas no documentadas**: términos/acciones usados en cartas pero sin definición formal en el rulebook.
- 🟢 **Erratas posibles**: typos masivos o redacciones incorrectas detectadas en múltiples cartas.

**Nota importante sobre normalización:** los textos de `effect_text` y `cost_text` en `cards.json` aparecen mayormente **sin acentos** por reglas del engine del simulador. Aunque esto produce typos visuales, no es un reto para interpretación por humanos ni LLMs. Este documento refiere folios y redacciones tal como aparecen en `cards.json`.

---

# 🔴 Reglas con ambigüedad jugable

## D21. Consumo del Adendei al ser poseído por un Espectro

**Cartas relevantes:** cualquier Espectro del set FYTE (2 folios ejemplo: **FYTE-007R**, **FYTE-023** — Tlahuelpuchi Invocación Espectral).

**Contexto:** Los Espectros declaran como requisito "N o más Adendei '[Nombre]' en tu Extinción" para poder poseer. El Protector **Tlahuelpuchi (FYTE-007R / FYTE-023)** tiene efecto que dice: *"Los Espectros aliados no envian cartas a Extincion para poseer hasta que este Protector..."*, lo que sugiere que **el acto de poseer envía el Adendei a algún lado**.

**Duda concreta:**
Cuando un Espectro "posee" un Adendei de Extinción:
1. ¿El Adendei se consume (se va a Fuera del Juego)?
2. ¿Permanece en Extinción pero "marcado" como ya usado?
3. ¿Sale del campo por completo?
4. ¿Puede volver a ser objetivo de otro efecto que recupera de Extinción?

---

## D22. Herencia de stats del Adendei poseído por el Espectro

**Cartas relevantes:** todos los Espectros FYTE. Ejemplos: **FYTE-003K**, **FYTE-005U**, **FYTE-013R**, **FYTE-014R**, **FYTE-015R**, **FYTE-021R**, **FYTE-048**, **FYTE-049**, **FYTE-052**, **FYTE-ST1**.

**Contexto:** Relacionada con D21. Los Espectros declaran su propia vida máxima en su carta (según reglas del rulebook p12). Pero al poseer a un Adendei, ¿qué se hereda?

**Duda concreta:**
¿El Espectro hereda alguna estadística o propiedad del Adendei poseído?
1. ¿Solo usa el nombre del Adendei como "ancla" para el requisito?
2. ¿Hereda su Energía/Subtipo para interacciones con efectos de energía?
3. ¿Hereda Descansos, Daño base, o algún efecto del Adendei?
4. ¿El Adendei poseído queda anclado como referencia (ej. "Este Espectro es Nanuk") para efectos futuros que afecten a "todos los Nanuk"?

---

## D25. Hori, Huella de Magma — ¿Costo de Extinción aplica a toda la carta o solo SRMR?

**Cartas relevantes:** **EXPO-0006**, **IDRMP-001**, **KPRC-022**, **SRMR-006** (4 variantes de "Hori, Huella de Magma").

| Folio | Rarity | Cost declarado |
|---|---|---|
| EXPO-0006 | Común | NO |
| IDRMP-001 | Común | NO |
| KPRC-022 | Full Art | NO |
| **SRMR-006** | Super Rara | SÍ ("Si esta carta es enviada a Extinción, daña 1 pto. a todos los Adendei-Pírico en campo") |

**Duda concreta:**
El Costo de Extinción que aparece solo en SRMR-006:
1. ¿Es una regla de juego que aplica a **toda carta llamada "Hori, Huella de Magma"** y simplemente falta imprimir en las otras variantes (= errata)?
2. ¿Es una variante mecánica específica de la Super Rara (= diseño deliberado)?

El mismo patrón aparece en Nozi y Zaren, sugiriendo que las variantes SRMR de IDRM podrían tener redacciones más completas. **¿Cuál es el criterio oficial?**

---

## D26. Grafía oficial de "Átlico" — ¿con o sin tilde en la í?

**Cartas relevantes:** las 5 variantes de Nozi, Corona Marina: **EXPO-0004**, **IDRMA-001**, **KPRC-023**, **SRMR-005**, **TKD-2022-008**.

| Variantes | Grafía |
|---|---|
| EXPO-0004, IDRMA-001, KPRC-023, TKD-2022-008 | `Adendei-Átlíco` (con tilde en la í) |
| SRMR-005 | `Adendei-Átlico` (sin tilde en la í) |

**Duda concreta:**
- ¿La grafía oficial es `Átlico` o `Átlíco`?
- Relacionado: ¿el rulebook debería documentar formalmente las 8 energías en el glosario con su grafía correcta, para evitar este tipo de inconsistencias?

**Nota:** en cards.json la mayoría de textos están sin tildes por normalización del engine; esta duda aplica a la grafía oficial del rulebook v5.2.

---

# 🟡 Mecánicas sin definición formal en el rulebook

## M1. Zona "Fuera del Juego"

**Carta única:** **TCOO-006U** Quam, Detrás de la Materia (+ reimpresión **TCOO-081**, versión EN: **TCEO-006U** y **TCEO-081**).

Su efecto Pasiva dice:
> *"Revela 1 carta de tu Mazo y colócala fuera del juego. Si tu Protector está disponible, puedes regresar 1 Adendei en tu Zona Principal al fondo de tu Mazo y colocar la carta fuera del juego en su lugar con 6 ptos. de vida (aún si esta carta ya no está en el campo)."*

**Dudas de reglas:**
1. ¿La carta "fuera del juego" es un objetivo válido de otros efectos (intercambiar, copiar, vivificar)?
2. ¿Cuenta como "carta en Extinción" para efectos que buscan cartas en Extinción?
3. ¿Cuenta como "carta en Mazo" para efectos que buscan en el Mazo?
4. ¿Los jugadores pueden inspeccionar esta zona en cualquier momento?
5. ¿El efecto latente "(aún si esta carta ya no está en el campo)" puede ser negado retroactivamente?

---

## M2. "Intercambiar" como acción

**Cartas que usan la mecánica:**
- **FYTE-022R** / **FYTE-074** — Ariam, Resurrección
- **FYTE-075** — Mizthe, Arconte
- **FYTE-071** — Therz, Guardián

**Dudas:**
1. ¿"Intercambiar" es equivalente a "Cambiar" (documentada en glosario) o una acción distinta?
2. Cuando se intercambia una carta de Extinción por una de ZP, ¿qué pasa con la vida? ¿La carta entrante recibe 6 pts nuevos, o conserva la vida de la saliente?
3. ¿El intercambio puede ser negado con efectos anti-cambio?

---

## M3. Efecto persistente "durante el resto del juego"

**Cartas:** **FYTE-078** / **KPRC-086** — Mixtla, Regreso.

Texto:
> Efecto: *"Si esta carta es vivificada, puedes usar 1 Activa-Rápida adicional en turno rival durante el resto del juego."*
> Costo: *"No podrás usar Activas-Rápidas en tu turno durante el resto del juego."*

**Dudas:**
1. ¿El costo sigue vigente si Mixtla es eliminada tras ser vivificada?
2. ¿Qué pasa si Mixtla es vivificada 2 veces? ¿Se acumulan los efectos (+2 Activas-Rápidas rival, -2 propias)?
3. ¿Se puede "resetear" este efecto persistente con algún efecto anti-copia/negación retroactiva?

---

## M4. "Efectos de cartas tomadas"

**Cartas que se protegen explícitamente contra esta categoría:**
- **FAFT-001** / **KPRC-030** — Nirge, Los Ocultos
- **FYTE-005S** (Zaykan, Lagarto Fantasma)
- **FYTE-010** (sin nombre exacto verificado; probable del set FYTE)

**Duda:**
El rulebook no define qué es un "efecto de carta tomada". ¿Qué hace que un efecto pertenezca a esa categoría?

---

## M5. "Mazo rival" como objetivo de efecto

**Cartas afectadas:** varios folios de la familia Zotz (13 cartas en cards.json). Ejemplos: **CAMP-0002**, **FYTE-005S**, **FYTE-032**, **LGRO-011**, **LGRO-029**, **LGRO-064**, **MLBU-004U**.

**Duda:**
¿Cuáles son las reglas de visibilidad y privacidad del Mazo rival? ¿Las cartas vistas se muestran a ambos jugadores? ¿El orden se preserva? ¿El rival puede reorganizar su Mazo después?

---

## M6. "Descansos indicados" en Xakros, Peste

**Cartas:** **IDRMP-022**, **RAMI-007**, **RMR-017** (3 variantes de Xakros, Peste).

**Texto:** *"Todos los Adendei en el campo reciben descansos iguales a los indicados en su respectiva carta"*.

**Duda:**
"Descansos indicados" es **¿la estadística base impresa en la carta, o los descansos actuales que acumuló durante el juego?**. Esta distinción puede romper combos con escalar/descender descansos.

---

## M7. Tokens con estadísticas copiadas/variables

**Cartas:**
- **TCDE-015** Gloku, Trituración (crea Token que copia stats de Gloku)
- **TCDE-002** Gloku variante
- **TCDE-008** Dagg, Abismo Feral (crea Token)
- **KPRC-019** / **TCEO-003K** / **TCEO-060** / **TCOO-003T** / **TCOO-060** — Zaren, Unión (crea Token)

La sección §3.6 del rulebook solo documenta Tokens "genéricos" (6/0/0).

**Duda:**
¿Cómo se formaliza la creación de Tokens con stats heredados? ¿Qué sucede con efectos/costos que hereda el Token de la carta fuente? (Ver ruling D16 como contexto.)

---

## M8. "Consejo" — término no documentado

**Cartas:** **TCEO-001**, **TCEO-001R**, **TCOO-001**, **TCOO-001R** (4 variantes de Morx, Descarga Átlica — probable uso en más cartas del mismo set).

**Duda:**
El término "Consejo" **no aparece una sola vez en el rulebook v5.1**. ¿Qué significa mecánicamente? ¿Es un subtipo? ¿Una acción? ¿Una zona?

---

## M9. Formato multijugador

**Cartas con efectos "hasta N jugadores":**
- **KPRC-052** Maiz, multicolor ("hasta 2 jugadores rivales")
- **KPRC-054** Vesta Ignia, Flor de Fuego ("hasta 3 jugadores")
- **KPRC-058** Enjambre Pirico ("hasta 3 jugadores")
- **KPRC-060** Ulmor, Tinta Cegadora ("hasta 2 jugadores rivales")

El rulebook supone 1v1.

**Duda:**
1. ¿Existe un formato multijugador oficial?
2. En 1v1, ¿estos efectos simplemente se aplican al único rival?
3. ¿Los descansos, Extinciones y condiciones de victoria se modifican en multijugador?

---

## M10. "Gestos sociales" como requisito de efecto

**Cartas:**
- **NAVD-001** Ariam, Regalo Navideño (requiere decir "Feliz Navidad" en diciembre)
- **SNVL-001** Ariam, Día del Amor y la Amistad (requiere choque de puños con el rival)

**Duda:**
Si el rival rechaza la interacción social, ¿el efecto se considera no-declarado, o hay alguna alternativa mecánica?

---

# 🟢 Erratas masivas — requieren confirmación

## E1. "Cyra" → probable typo histórico de "Cura"

**Cartas afectadas:**
- **INMX-001** — Kopit y Jokokan, Libertad
- **KSPC-001** — Ariam, 1st Anniversary

**Texto impreso:** *"Activa: Cyra gasta 6 puntos a un Adendei aliado."*

**Análisis:** El término "Cyra" no aparece en el rulebook. El texto "gasta 6 puntos a un Adendei aliado" no tiene interpretación coherente. Lo más probable es que sea un **typo de "Cura"** perpetuado por 2 reimpresiones independientes.

**Corrección propuesta (requiere ruling oficial):**
`Activa: Cura 6 puntos a un Adendei aliado.`

---

## E2. Inconsistencia "Piricco" en variantes de Hori

**Cartas afectadas:** **EXPO-0006**, **IDRMP-001**, **KPRC-022** (Hori, Huella de Magma) usan `Adendei-Piricco`.

**Nota:** dado que `cards.json` está normalizado sin acentos, la inconsistencia real es entre `Piricco` (con doble c) y `Pirico` (una sola c). SRMR-006 usa `Pirico`. La grafía oficial del rulebook (con acentos) es `Pírico`.

---

## E3. "ccon" (doble c) en Zaren

**Cartas afectadas:** **IDRMA-007**, **KEXC-001** (Zaren, El Inicio del Viaje).

**Texto actual:** *"Si no hay un Adendei aliado ccon 6 puntos de vida..."*

**Corrección:** eliminar la c duplicada.

---

## E4. Normalización sin acentos en cards.json

**Contexto:** la mayoría de textos de `effect_text` y `cost_text` están **sin acentos** debido a reglas del engine del simulador. Ejemplos:
- `ataco` en vez de `atacó`
- `este` en vez de `esté`
- `Extincion` en vez de `Extinción`
- `Pirico` en vez de `Pírico`
- `Atlico` en vez de `Átlico`

**Sugerencia:** documentar explícitamente esta normalización en el engine y asegurar que el **rulebook** (fuente de verdad textual) use siempre acentos correctos. Así, cards.json puede servir como input técnico sin acentos, y rulebook/PDFs públicos usan acentos.

---

## E5. "Subtipo Lupino" — ¿deprecado o futuro?

**Contexto:** El rulebook p06 menciona "Lupino" como ejemplo de subtipo en el callout de anatomía. Sin embargo, **0 cartas** del set completo (1074 cartas) usan el subtipo Lupino.

**Duda:**
¿Lupino es un subtipo deprecado, un placeholder para futuras expansiones, o se olvidó implementar?

---

## E6. Subtipos "Resurrecto" y "Magno" usados pero NO en callout oficial

**Contexto:** Inverso a Lupino. Los subtipos Resurrecto (13+ cartas) y Magno (1+ carta) se usan activamente en cartas pero **no aparecen en el callout oficial** de subtipos del rulebook p06.

**Duda:** ¿Se omitieron por error, son subtipos "oficiales pero no canónicos", o hay un criterio de selección que no se documenta?

---

# 📊 Preguntas de proceso para el equipo

## P1. Lista oficial de erratas

¿Existe un documento interno o público con las erratas oficiales de v5.1? Si sí, ¿pueden compartirlo para cruzar con estos hallazgos?

## P2. FAQ / Rulings anteriores

¿Hay rulings dados en redes sociales (Discord, Instagram, eventos presenciales) que resuelvan alguna de estas dudas? Si la comunidad tiene respuestas, ¿dónde se documentan?

## P3. Multijugador oficial

¿Está contemplado formato multijugador en el roadmap v5.2 o v6? Si sí, algunas mecánicas actuales (ej. KPRC-052/054/058/060) ya lo anticipan.

## P4. Proceso de renumeración de cartas reimprimidas

Detectamos que 24 grupos de cartas reimpresas tienen **redacciones inconsistentes** (prefijo `Activa:/Pasiva:` omitido, typos, costos faltantes). ¿Hay un proceso de normalización entre sets, o cada reimpresión hereda el texto del set original?

---

# 📝 Notas finales

Este documento se genera a partir de una auditoría sistemática de 40 páginas del rulebook v5.1 + 1074 cartas de cards.json, ejecutada el 2026-04-19. Las dudas enumeradas son las que **no pudieron resolverse** a partir del texto disponible de v5.1.

Muchas de ellas tienen **valor pedagógico**: documentan casos límite donde el rulebook actual es ambiguo o silencioso. Resolverlas será insumo directo para v5.2.

**Contacto:** esta investigación forma parte de una colaboración con el equipo de Kódem TCG para consolidar el rulebook y su fuente de verdad.

---

_Documento preparado para compartir con la comunidad — formato optimizado para copia directa._
