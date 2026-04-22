# Kódem TCG — Libro de Reglas Oficial v5.1

**PDF SHA256:** `05672af59629e1e8c7ead6d9487aba107506d239c4863eec49fc28ab45479b03`  
**Generado:** 2026-04-19T00:36:52+00:00  
**Total páginas:** 40  
**Total bloques de texto:** 562  
**Total figuras:** 207  
**Confianza media LLM:** 0.9008  
**Confianza media (pass 2):** 0.89  
**Páginas re-extraídas (pass=2):** 9 → p07, p11, p16, p21, p22, p23, p24, p26, p27  
**Spot-check pass 3 (Ramsés):** 7 páginas → p04, p05, p06, p14, p32, p36, p40  
**Pass 5 FINAL-ULTRA (imágenes segmentadas):** 1 página(s) → p19 ✅  
**Total correcciones aplicadas a p19:** 9 (3 en pass 4 + 6 en pass 5)  
**Post-validación pendiente:** ninguna (p19 consolidada en pass 5 FINAL-ULTRA) ✅  
**Revisión humana pendiente:** ninguna (p16 revalidada vía re-extracción).

## Metodología

Pipeline de 4 capas + post-validación iterativa: (1) Extracción LLM (opus-4-7) página por página sobre imágenes PNG — produce text_blocks y figures con anchors estables pNN/bXX y pNN/fig-NN. (2) OCR (tesseract español) como verificación paralela del texto plano. (3) Arbitraje LLM compara ambas extracciones y emite verdict ∈ {both_agree, llm_preferred, ocr_preferred, needs_human} + lista de typos verbatim. Para verdicts ocr_preferred en páginas densas y needs_human, la extracción LLM se re-ejecutó (pass=2) con foco en texto. (4) Spot-check pass 3 humano (Ramsés) sobre 8 páginas seleccionadas — aporta notas verbatim y nodos canónicos. (4.b) Post-validación conjunta pass 4 sobre p19 (diagrama de turno): 3 jueces Opus 4.7 + spot-check humano de 5 preguntas con crops del PDF → estructura canónica con 51 nodos y 57 edges. (4.c) Pass 5 FINAL-ULTRA sobre p19: Ramsés envió 6 imágenes segmentadas (una por fase) que permitieron 6 correcciones adicionales: Veneno = rosa (no amarillo), múltiples shapes a óvalo, typo 'Exinción' preservado verbatim, Revelar = amarillo óvalo, INICIO DEL TURNO RIVAL agregado como nodo gris rectángulo, nuevo nodo 'Sólo 1 costo pagado' descubierto en Pasar Turno → estructura canónica final con 52 nodos y 58 edges (confidence_final 0.98). Consolidación usa LLM como fuente canónica (descripciones de figuras más ricas) preservando typos verbatim detectados por árbitro y humano.

### Distribución de verdicts

| Verdict | Páginas |
|---|---|
| `both_agree` | 14 |
| `llm_preferred` | 13 |
| `ocr_preferred` | 12 |
| `needs_human` | 1 |

### Leyenda de indicadores

- ✓ Página re-extraída (pass 2)
- ⚠️ Página marcada `needs_human` por el árbitro
- 🧪 Spot-check humano completado (pass 3)
- 🔴 Post-validación conjunta pendiente (Ramsés + Logos)
- ✅ Post-validación conjunta completada (pass 4 o pass 5 FINAL-ULTRA)

## Tabla de Contenidos

- [Página 01 — Kódem Trading Card Game – Libro de Reglas Oficial Versión 5.0 (Portada)](#pagina-01)
- [Página 02 — CONTENIDO](#pagina-02)
- [Página 03 — Tabla de Contenidos (continuación)](#pagina-03)
- [Página 04 — 1. ¿Qué es Kódem TCG?](#pagina-04) 🧪
- [Página 05 — 2. Partes de la carta](#pagina-05) 🧪
- [Página 06 — 2.2 Estadísticas de la carta](#pagina-06) 🧪
- [Página 07 — 3. Tipos de Cartas — 3.1 Adendei](#pagina-07) ✓
- [Página 08 — 3.2 Protector — Uso del Protector: Generalidades — Vínculo Odémico](#pagina-08)
- [Página 09 — 3.3 RAVA](#pagina-09)
- [Página 10 — 3.4 Equipos: Ixim y Rot](#pagina-10)
- [Página 11 — EQUIPOS COMPATIBLES / EQUIPOS MÚLTIPLES](#pagina-11) ✓
- [Página 12 — 3.5 BIO](#pagina-12)
- [Página 13 — 3.6 Token](#pagina-13)
- [Página 14 — 3.7 Espectros](#pagina-14) 🧪
- [Página 15 — 4. Preparación del Ecosistema](#pagina-15)
- [Página 16 — 5. Fases del Turno](#pagina-16) ✓ ⚠️
- [Página 17 — (sin título)](#pagina-17)
- [Página 18 — 5.1 DESCANSOS](#pagina-18)
- [Página 19 — 5.2 Diagrama Estructura de turno](#pagina-19) ✅
- [Página 20 — 5.3 Reemplazo de cartas](#pagina-20)
- [Página 21 — 6.1 Marcas](#pagina-21) ✓
- [Página 22 — 6.2 CAMBIOS DE ESTADÍSTICAS](#pagina-22) ✓
- [Página 23 — 6.3 Protección](#pagina-23) ✓
- [Página 24 — 6.6 ATAQUE](#pagina-24) ✓
- [Página 25 — (sin título)](#pagina-25)
- [Página 26 — (sin título)](#pagina-26) ✓
- [Página 27 — (sin título)](#pagina-27) ✓
- [Página 28 — (sin título)](#pagina-28)
- [Página 29 — (sin título)](#pagina-29)
- [Página 30 — (sin título)](#pagina-30)
- [Página 31 — (sin título)](#pagina-31)
- [Página 32 — (sin título)](#pagina-32) 🧪
- [Página 33 — (sin título)](#pagina-33)
- [Página 34 — (sin título)](#pagina-34)
- [Página 35 — (sin título)](#pagina-35)
- [Página 36 — (sin título)](#pagina-36) 🧪
- [Página 37 — 9. GLOSARIO](#pagina-37)
- [Página 38 — 9. GLOSARIO (continuación)](#pagina-38)
- [Página 39 — 9. GLOSARIO (continuación)](#pagina-39)
- [Página 40 — 9. GLOSARIO (cierre) + Contacto + Créditos](#pagina-40) 🧪

---

<a id="pagina-01"></a>

# Página 01 — Kódem Trading Card Game – Libro de Reglas Oficial Versión 5.0 (Portada)

**Verdict:** `llm_preferred` · **Recomendación:** `accept` · **Confianza:** 0.97 · **Acuerdo LLM↔OCR:** 1.0

## Bloques de texto

### `[p01/b01]` Nombre del juego
_pos: bottom-center_

> KÓDEM
> TRADING CARD GAME

*Notas:* Logotipo principal con tipografía estilizada en blanco; incluye ícono de criatura/máscara dentro de la letra O

### `[p01/b02]` Título del documento
_pos: bottom-center_

> Libro de Reglas Oficial

*Notas:* Tipografía grande en blanco, debajo del logotipo

### `[p01/b03]` Versión
_pos: bottom-center_

> Versión 5.0

*Notas:* Texto en blanco, debajo del título del documento

### `[p01/b04]` Copyright
_pos: bottom_

> ©2026 Adender Entretenimiento S.A. de C.V. Todos los derechos reservados

*Notas:* Texto pequeño en la franja inferior de la página

### `[p01/b05]` Número de página
_pos: bottom-right_

> 1

*Notas:* Número de página en recuadro azul pequeño en la esquina inferior derecha

## Figuras

### `[p01/fig-01]` portada-ilustracion-criatura *(type: illustration)*
_bbox (%): x=0, y=0, w=100, h=85_  
**Legibilidad:** clear  

**Descripción:** Ilustración de portada digital de gran formato que ocupa aproximadamente el 85% superior de la página. Representa a una criatura fantástica de apariencia feroz y oscura, con cuerpo robusto de pelaje oscuro/negro. La criatura tiene dos cabezas visibles o una cabeza grande con múltiples rasgos: ojos que emiten un brillo amarillo-dorado intenso. Sobre su cabeza/cuerpo brotan llamas de colores variados: llamas anaranjadas y rojas predominantes a la izquierda, una llama de color azul turquesa en el centro superior, y llamas magenta/rosa en la parte derecha superior. La criatura tiene marcas o runas de color azul cian en su cuerpo, incluyendo un símbolo de luna creciente en el flanco izquierdo y pequeños glifos cuadrados. El fondo es de tonos cálidos marrones y naranjas que sugieren fuego o explosión en la parte baja. La paleta general combina oscuros profundos con acentos brillantes de fuego. El estilo es digital painting de alta calidad, reminiscente de arte de TCG japonés o coreano. La criatura parece estar en postura agresiva o de ataque, con una pata delantera extendida hacia el espectador.

**Relación con el texto:** Ilustración de portada del Libro de Reglas Oficial de Kódem TCG; establece la identidad visual del juego y presenta una criatura característica del universo del juego

### `[p01/fig-02]` logotipo-kodem-tcg *(type: icon)*
_bbox (%): x=15, y=78, w=70, h=12_  
**Legibilidad:** clear  

**Descripción:** Logotipo oficial de Kódem Trading Card Game. La palabra 'KÓDEM' aparece en tipografía sans-serif bold estilizada de color blanco con borde/sombra oscura. La letra O central contiene integrado un ícono de una máscara o cara de criatura con cuernos y rasgos de fuego, en color blanco. Debajo del nombre principal, en letras más pequeñas y espaciadas, aparece 'TRADING CARD GAME' en el mismo color blanco, flanqueado por líneas decorativas horizontales que forman una especie de escudo o banner en forma de trapecio invertido. El conjunto tiene un diseño dinámico que evoca energía y fantasía.

**Texto embebido:**
- `KÓDEM`
- `TRADING CARD GAME`

**Relación con el texto:** Logotipo oficial del juego, elemento de identidad de marca en la portada

## Notas de página

Página de portada del Libro de Reglas Oficial de Kódem TCG versión 5.0. No contiene secciones numeradas ni referencias §X.Y. El número de página '1' aparece en la esquina inferior derecha dentro de un pequeño recuadro azul. El año de copyright es 2026. NOTA: El título del documento dice 'Versión 5.0' aunque el proyecto se referencia como v5.1 — discrepancia verbatim.


---

<a id="pagina-02"></a>

# Página 02 — CONTENIDO

**Verdict:** `llm_preferred` · **Recomendación:** `accept` · **Confianza:** 0.97 · **Acuerdo LLM↔OCR:** 0.85

**Sección(es):** §1, §1.2, §1.3, §2, §2.1, §2.1.1, §2.2, §2.2.1, §3, §3.1, §3.2, §3.3, §3.4, §3.5, §3.6, §3.7, §4, §5, §5.1, §5.2

## Bloques de texto

### `[p02/b01]` CONTENIDO
_pos: top to bottom_

> 1. ¿Qué es Kódem TCG?..........................................................................................................4
> 1.2. Abriendo tu producto y conociendo tu juego .................................................................4
> 1.3. Componentes de Juego ...................................................................................................4
>
> 2. Partes de la Carta .............................................................................................................5
> 2.1. Características Generales ...............................................................................................5
> 2.1.1. Rarezas ..........................................................................................................................5
> 2.2. Estadísticas de la carta ...................................................................................................6
> 2.2.1. Energías .........................................................................................................................6
>
> 3. Tipos de Cartas ..................................................................................................................7
> 3.1 Adendei ..............................................................................................................................7
> Características .........................................................................................................................7
> Uso de los Adendei .................................................................................................................7
> 3.2 Protector.............................................................................................................................8
> Características .........................................................................................................................8
> Uso del Protector .....................................................................................................................8
> Vínculo Odémico ......................................................................................................................8
> 3.3 Rava ....................................................................................................................................9
> Características .........................................................................................................................9
> Uso del Rava ............................................................................................................................9
> 3.4 Equipos: Ixim y Rot ..........................................................................................................10
> Características .........................................................................................................................10
> Uso de Equipos: Generalidades ............................................................................................10
> Equipar .....................................................................................................................................10
> Equipos Compatible ................................................................................................................11
> Equipos Múltiples ....................................................................................................................11
> 3.5 Bio .....................................................................................................................................12
> Características .........................................................................................................................12
> Uso del Bio ...............................................................................................................................12
> 3.6 Cartas Token .....................................................................................................................13
> Características .........................................................................................................................13
> Uso del Token ..........................................................................................................................13
> Generalidades ..........................................................................................................................13
> 3.7 Espectros ..........................................................................................................................14
> Características .........................................................................................................................14
> Uso del los Espectros .............................................................................................................14
> Carta Poseídas ........................................................................................................................14
> Generalidades ..........................................................................................................................14
>
> 4. Preparación del Ecosistema .............................................................................................15
>
> 5. Fases de Turno ..................................................................................................................16
> Fase de Inicio ..........................................................................................................................16
> Fase Previa ..............................................................................................................................16
> Fase de Batalla ........................................................................................................................16
> Fase Post .................................................................................................................................17
> Fase de Equipo ........................................................................................................................17
> Fin de Turno ............................................................................................................................17
> Criterios de Resolución de Múltiples Pasivas ......................................................................18
> 5.1 Descansos .........................................................................................................................18
> Generalidades ..........................................................................................................................18
> Actualización de Descansos ..................................................................................................18
> 5.2 Diagrama Estructura de Turno .......................................................................................19

*Notas:* Página de tabla de contenidos completa. Números de página al final de cada línea de puntos. Los encabezados principales (1., 2., 3., 4., 5.) están en negrita. Las subsecciones tienen sangría.

## Figuras

### `[p02/fig-01]` header-contenido-banner *(type: infographic)*
_bbox (%): x=10, y=0, w=80, h=8_  
**Legibilidad:** clear  

**Descripción:** Encabezado decorativo con la palabra 'CONTENIDO' en letras blancas mayúsculas grandes, sobre un fondo de color azul oscuro a azul mediano con degradado. A ambos lados del texto central hay elementos geométricos decorativos con forma de líneas diagonales o barras en ángulo, también de color azul pero con distintas tonalidades, que enmarcan el título y le dan un aspecto dinámico y estilizado propio del diseño gráfico de un juego de cartas. El banner ocupa toda la parte superior de la página y sirve como título de sección.

**Texto embebido:**
- `CONTENIDO`

**Relación con el texto:** Encabezado que identifica la página como tabla de contenidos del rulebook.

## Notas de página

Página 2 del rulebook Kódem TCG v5.1 en español. Es la tabla de contenidos completa del documento (primera mitad; continúa en p03). El número de página '2' aparece en la esquina inferior derecha. Los encabezados principales de sección están en negrita y algunos en versalitas (ej. '2. Partes de la Carta', '3. Tipos de Cartas'). Las subsecciones están en texto normal con sangría. Todas las entradas van seguidas de una línea de puntos y un número de página.


---

<a id="pagina-03"></a>

# Página 03 — Tabla de Contenidos (continuación)

**Verdict:** `llm_preferred` · **Recomendación:** `accept` · **Confianza:** 0.97 · **Acuerdo LLM↔OCR:** 0.85

**Sección(es):** §5.3, §6, §6.1, §6.2, §6.3, §6.4, §6.5, §6.6, §6.7, §6.7.1, §6.7.2, §6.7.3, §6.8, §7, §8, §8.1, §8.2, §9

## Bloques de texto

### `[p03/b01]` Tabla de Contenidos – continuación
_pos: top_

> 5.3 Reemplazo de cartas....................................................................................................................................20
>
> 6. Interacciones y Efectos ................................................................................................................................20
> 6.1 Marcas .............................................................................................................................................................21
> Generalidades ......................................................................................................................................................21
> 6.2 Cambios de Estadística ..............................................................................................................................22
> 6.3 Protección .......................................................................................................................................................23
> 6.4 Tipos de Daño ................................................................................................................................................23
> 6.5 Cambios entre Zonas ..................................................................................................................................23
> 6.6 Ataque ..............................................................................................................................................................24
> 6.7 Efectos ..............................................................................................................................................................25
> Generalidades ......................................................................................................................................................25
> Vivificar....................................................................................................................................................................28
> 6.7.1 Activas ...........................................................................................................................................................29
> 6.7.2 Pasivas ...........................................................................................................................................................29
> 6.7.3 Costos ............................................................................................................................................................30
> 6.8. Restricciones e Interacciones .................................................................................................................30
> Generalidades de las Restricciones e Interacciones ...............................................................................30
> Tipos de Restricciones ......................................................................................................................................31
> Penalizaciones por incumplir Restricciones ..............................................................................................33
>
> 7. ¿Cómo armar mi mazo? ..............................................................................................................................33
>
> 8. Formatos de Juego .......................................................................................................................................34
> 8.1 Formato Multijugador .................................................................................................................................35
> Reglas Generales .................................................................................................................................................35
> Variantes .................................................................................................................................................................35
> 8.2 Formato Extendido ......................................................................................................................................36
> Cartas Limitadas ...................................................................................................................................................36
>
> 9. Glosario .............................................................................................................................................................37

*Notas:* Tabla de contenidos parcial, continúa desde página anterior. Números de página alineados a la derecha con puntos suspensivos.

## Figuras

### `[p03/fig-01]` criatura-adendei-alada-decorativa *(type: illustration)*
_bbox (%): x=10, y=52, w=85, h=46_  
**Legibilidad:** clear  

**Descripción:** Ilustración de gran formato de una criatura fantástica tipo Adendei del universo Kódem. La criatura ocupa la mitad inferior de la página y presenta una anatomía híbrida que combina rasgos de dinosaurio terópodo (cabeza alargada con mandíbulas abiertas mostrando dientes afilados, cuello robusto) con elementos de équido o mamífero cuadrúpedo (cuerpo voluminoso con patas fuertes, una de las cuales termina en garras/cascos curvos visibles en el extremo inferior derecho).

La criatura posee alas azul-celeste con tonos lilas en la base, visibles a ambos lados del cuerpo, lo que le otorga un aspecto de criatura voladora. El pelaje o plumaje que rodea la cabeza y el cuello es blanco grisáceo con reflejos azulados, creando una especie de melena o collar de plumas.

La paleta cromática general del cuerpo es rosado-salmón con degradados hacia púrpura en las extremidades y alas. Rodea a la criatura una energía o aura mágica de color rosa fucsia brillante y violeta, con trazos de humo o neblina que emanan desde su espalda y costados, sugiriendo poderes sobrenaturales o un estado de activación de efecto.

El fondo es blanco puro, lo que contrasta fuertemente con los colores vibrantes de la criatura. La composición es dinámica: la criatura parece estar en movimiento o rugiendo, con la cabeza girada hacia la izquierda y la boca abierta. El estilo artístico es digital, con alto detalle en texturas de plumas y piel, iluminación volumétrica y uso de colores saturados típicos del arte de cartas coleccionables.

**Relación con el texto:** Ilustración decorativa de una criatura del juego (posiblemente un Adendei del universo Kódem), sin referencia directa a ningún bloque de texto de la tabla de contenidos. Sirve como elemento visual de ambientación al final de la página de índice.

## Notas de página

Esta es la página 3 del rulebook Kódem TCG v5.1. Contiene exclusivamente la continuación de la tabla de contenidos (desde §5.3 hasta §9) y una ilustración decorativa de una criatura fantástica híbrida alada en la mitad inferior. No hay reglas desarrolladas en esta página, solo entradas de índice con números de página.


---

<a id="pagina-04"></a>

# Página 04 — 1. ¿Qué es Kódem TCG?

> 🧪 **Spot-check Ramsés (pass 3)** — Revisada y anotada por humano.

**Notas de spot-check (humanas):**

- Slogan "EVOCA, PROTEGE Y VENCE" NO existe en el PDF (alucinación OCR confirmada por humano).

**Verdict:** `ocr_preferred` · **Recomendación:** `spot_check_human` · **Confianza:** 0.93 · **Acuerdo LLM↔OCR:** 0.88

**Sección(es):** §1, §1.2, §1.3

## Bloques de texto

### `[p04/b01]` 1. ¿Qué es Kódem TCG?
_pos: top_

> Kódem TCG© es un juego de cartas único en su clase donde crearás tu estrategia antes de iniciar tu partida.
> En Kódem decidirás el destino del mundo convirtiéndote en un Protector y lucharás contra otros Protectores haciendo un mazo con un ejército de criaturas mágicas; los Adendei, equipadas con el poder del reino fungi, vegetal y mineral además podrás incluir lugares ancestrales de poder en la partida, enfrentándote en emocionantes batallas donde tu estrategia será la clave para la victoria.
>
> ¡Bienvenido a esta gran aventura!

*Notas:* Sección introductoria de la sección 1.

### `[p04/b02]` 1.2 Abriendo tu producto y conociendo tu juego
_pos: middle_

> En el producto de Kódem TCG podrás encontrar una gran variedad de cartas y estrategias. Ya sea que eres novato o un experto veterano, te recomendamos revisar este libro de reglas que podrá ayudarte a empezar a jugar o a consultar dudas particulares.

### `[p04/b03]` 1.3 Componentes de Juego
_pos: bottom_

> • Mazo GENERAL de juego: Como todo juego de cartas estratégico, en Kódem TCG llevarás un mazo general compuesto por diferentes tipos de cartas. Este mazo general será tu componente principal y con el que jugarás tus partidas.
>
> •Contadores de vida: Se puede usar cualquier método para contar la vida de tus cartas principales, como 6 dados de seis caras, un tablero con contadores de vida, etc.
>
> • Tapete de juego (opcional): A pesar de que no es necesario para el desarrollo de tu partida, recomendamos llevar 1 tapete oficial de neopreno o de papel de Kódem TCG para proteger tus cartas.
>
> •Monedas o indicadores de estado (opcional): Algunas cartas colocarán marcas en el juego, por lo que a través de monedas o algún indicador de tu preferencia, podrás indicar el estado de tus cartas para recordar aplicar sus efectos correspondientes.

*Notas:* Lista de componentes del juego con bullets. Notar el espaciado irregular en algunos bullets (ej. '•Contadores', '•Monedas' sin espacio después del bullet).

## Figuras

### `[p04/fig-01]` personaje-protector-mujer-cabello-azul *(type: illustration)*
_bbox (%): x=62, y=5, w=36, h=22_  
**Legibilidad:** clear  

**Descripción:** Ilustración estilo anime/manga de un personaje femenino que representa a un Protector del universo Kódem TCG. La figura es una mujer joven con cabello largo de color azul brillante que le cae sobre los hombros. Lleva gogles o lentes protectores sobre la frente y viste un atuendo futurista o de aventurera con detalles tecnológicos/místicos. Sostiene en sus manos una esfera u orbe que emite un resplandor azul luminoso, sugiriendo energía mágica o elemento místico conectado al mundo del juego. El estilo es anime contemporáneo con línea limpia, sombreado suave y colores saturados. La paleta predominante es azul claro y celeste.

**Relación con el texto:** Representación visual del concepto de 'Protector' introducido en el texto §1, donde se menciona que el jugador se convertirá en un Protector para luchar contra otros Protectores.

### `[p04/fig-02]` caja-mazo-estructura-y-sobres *(type: photo)*
_bbox (%): x=2, y=28, w=38, h=18_  
**Legibilidad:** clear  

**Descripción:** Imagen de producto que muestra una caja de Mazo Estructura de Kódem TCG (color azul oscuro con ilustración de una criatura verde/turquesa en el frente y el logo KÓDEM en la parte superior). Junto a la caja aparecen tres sobres o booster packs con diseño rojo y elementos gráficos de calavera/luna. La caja incluye una etiqueta de clasificación por edad '8+'. El conjunto representa el producto físico inicial que el jugador abre para comenzar a jugar.

**Texto embebido:**
- `KÓDEM`
- `Mazo Estructura`
- `8+`

**Relación con el texto:** Ilustra los productos mencionados en §1.2 'Abriendo tu producto y conociendo tu juego'.

### `[p04/fig-03]` dorso-cartas-kodem *(type: photo)*
_bbox (%): x=62, y=48, w=34, h=12_  
**Legibilidad:** clear  

**Descripción:** Dos cartas de Kódem TCG mostradas de dorso, en abanico. El dorso es de color negro intenso con el logotipo KÓDEM estampado en azul brillante al centro. Representa el componente 'Mazo GENERAL de juego'.

**Texto embebido:**
- `KÓDEM`

**Relación con el texto:** Ilustración del componente 'Mazo GENERAL de juego' descrito en §1.3.

### `[p04/fig-04]` dado-d6-contador-vida *(type: illustration)*
_bbox (%): x=2, y=62, w=12, h=8_  
**Legibilidad:** clear  

**Descripción:** Un dado de seis caras (d6) de color púrpura o violeta, mostrado en perspectiva 3D con varias caras visibles. Representa los contadores de vida que pueden usarse durante el juego.

**Relación con el texto:** Ilustración del componente 'Contadores de vida' descrito en §1.3.

### `[p04/fig-05]` tapete-de-juego-neopreno *(type: photo)*
_bbox (%): x=60, y=73, w=38, h=12_  
**Legibilidad:** clear  

**Descripción:** Tapete de juego oficial de Kódem TCG en neopreno que muestra las zonas de juego oficiales delimitadas con marcos y etiquetas: área del PROTECTOR, ZONA PRINCIPAL (donde se juegan las criaturas), EXTINCIÓN (zona de descarte) y sección de EQUIPO. El arte del tapete incluye una criatura azul ilustrada de fondo y los textos de las zonas en blanco sobre fondo oscuro.

**Texto embebido:**
- `PROTECTOR`
- `ZONA PRINCIPAL`
- `EXTINCIÓN`
- `EQUIPO`

**Relación con el texto:** Ilustración del componente 'Tapete de juego (opcional)' descrito en §1.3.

### `[p04/fig-06]` moneda-indicador-estado *(type: illustration)*
_bbox (%): x=2, y=85, w=12, h=10_  
**Legibilidad:** clear  

**Descripción:** Moneda o ficha circular de color púrpura/violeta con un símbolo o criatura estilizada grabada en relieve en la parte central. Representa los indicadores de estado/marcas que se colocan sobre las cartas.

**Relación con el texto:** Ilustración del componente 'Monedas o indicadores de estado (opcional)' descrito en §1.3.

## Notas de página

Página 4 del rulebook Kódem TCG v5.1. Contiene la sección introductoria §1 (¿Qué es Kódem TCG?) junto con §1.2 (Abriendo tu producto) y §1.3 (Componentes de Juego). Incluye múltiples ilustraciones/fotos de componentes físicos del producto distribuidas alrededor del texto. El número de página '4' aparece en la esquina inferior derecha.


---

<a id="pagina-05"></a>

# Página 05 — 2. Partes de la carta

> 🧪 **Spot-check Ramsés (pass 3)** — Revisada y anotada por humano.

**Verdict:** `ocr_preferred` · **Recomendación:** `spot_check_human` · **Confianza:** 0.88 · **Acuerdo LLM↔OCR:** 0.85

**Sección(es):** §2, §2.1, §2.1.1, §6

## Bloques de texto

### `[p05/b01]` 2. Partes de la carta
_pos: top_

> 2. Partes de la carta

*Notas:* Encabezado principal de sección.

### `[p05/b02]` 2.1 Características Generales
_pos: top_

> 2.1 Características Generales

*Notas:* Subsección de la página.

### `[p05/b03]` Ícono de expansión:
_pos: top-left_

> Ícono de expansión:
> Te ayuda a identificar la expansión a la cuál pertenece tu carta así como su rareza.
> (Consultar sección 2.1.1 Rarezas)

*Notas:* Callout con línea hacia la carta ejemplo.

### `[p05/b04]` Nombre de la carta:
_pos: top-right_

> Nombre de la carta: El nombre de cada carta es lo que la distingue de las demás. En la mayoría de los casos comienza con el nombre del personaje, seguido del complemento del nombre de la carta. El nombre del personaje no se considera por sí mismo el nombre de la carta. Por ejemplo, en la carta "Ozet, Amante Lunar", el nombre del personaje es "Ozet" y el nombre completo de la carta es:
> "Ozet, Amante Lunar".

*Notas:* Callout que señala la franja del nombre en la carta ejemplo.

### `[p05/b05]` Texto:
_pos: middle-left_

> Texto: El texto describe la habilidad de tu carta y la fase en la que se puede declarar con palabras específicas en negritas:
> •Activa
> •Pasiva
> •Activa-Rápida
> •Pasiva-Rápida
>
> También aquí se indica el costo que una carta deberá pagar para usar su efecto o atacar (Ver 6. Interacciones y efectos). Algunas cartas no cuentan con efectos o costos.

*Notas:* Bullet list con los cuatro tipos de palabras clave de fase.

### `[p05/b06]` Flavor Text:
_pos: middle-right_

> Flavor Text:
> Texto de complemento narrativo (no afecta la jugabilidad).

*Notas:* Callout corto.

### `[p05/b07]` Nombre científico del animal, planta o mineral:
_pos: middle-right_

> Nombre científico del animal, planta o mineral

*Notas:* Nota: aquí la marca se escribe 'Kodem' sin tilde, distinto a 'Kódem' del título del manual. [spot-check fix: texto corregido por Ramsés]

### `[p05/b08]` Créditos del Artista
_pos: bottom-center_

> Créditos del Artista

*Notas:* Callout pequeño apuntando al crédito en la parte baja de la carta.

### `[p05/b09]` Folio:
_pos: bottom-center_

> Folio: Te ayuda a saber el número de carta dentro de la expasión.

*Notas:* Typo preservado: 'expasión' en lugar de 'expansión'.

### `[p05/b10]` 2.1.1 Rarezas
_pos: middle_

> 2.1.1 Rarezas

*Notas:* Subsección que introduce los seis niveles de rareza.

### `[p05/b11]`
_pos: bottom_

> Algunas cartas producidas por Kódem tienen un tiraje mucho mayor o menor que otras. Las cartas raras tienen patrones holográficos que las distinguen y su nivel de rareza se puede identificar por el color del ícono de expansión o por el folio.

*Notas:* Párrafo introductorio a la lista de rarezas.

### `[p05/b12]`
_pos: bottom_

> Carta común
>
> Carta Rara
>
> Carta Súper Rara
>
> Carta Ultra Rara
>
> Carta Kósmica
>
> Carta Titán Kósmica
> *Aplica sólo para la expansión "Titanes de la Corteza"

*Notas:* Lista vertical de rarezas acompañada por los iconos de expansión coloreados. Nota al pie marcada con asterisco para la Titán Kósmica.

### `[p05/b13]` Ozet — Costo
_pos: card-example_

> Costo: Daña 1 pto. a otra carta aliada.

*Notas:* [spot-check pass 3] Agregado por Ramsés — texto impreso en carta ejemplo Ozet, omitido por LLM pass 1.

## Figuras

### `[p05/fig-01]` card-ozet-amante-lunar-anatomia *(type: illustration)*
_bbox (%): x=28, y=12, w=44, h=52_  
**Legibilidad:** clear — El render principal está nítido; los valores numéricos pequeños dentro de la caja inferior se leen pero podrían confirmarse con zoom adicional en la página fuente original.  

**Descripción:** La figura central y protagonista de la página es un render a tamaño grande de una carta de Kódem TCG utilizada como ejemplo anatómico. La carta se titula 'Ozet, Amante Lunar' y representa a un felino tipo ocelote (Leopardus pardalis) estilizado con una estética mística y nocturna. La carta aparece ligeramente desplazada del centro, ocupando aproximadamente la mitad vertical izquierda del área de contenido, dejando espacio en ambos lados para los callouts explicativos que apuntan hacia distintas regiones del diseño.

El borde exterior de la carta es negro azabache con acabado metalizado, y un listón dorado recorre la parte superior sosteniendo el nombre 'Ozet, Amante Lunar' en tipografía serif dorada con ligeras sombras. En la esquina superior izquierda, dentro del listón, se observa el ícono de expansión (un disco estilizado con huella de pata) acompañado por la letra inicial del set. En la esquina superior derecha está el complemento simétrico del listón con un ornamento geométrico azul-turquesa.

La ilustración principal muestra al felino en pose sigilosa, recostado sobre una rama o roca, con la cabeza ligeramente girada hacia el espectador. El pelaje exhibe rosetones oscuros clásicos del ocelote pero con detalles luminiscentes azul turquesa que simulan constelaciones o marcas lunares, reforzando el epíteto 'Amante Lunar'. Los ojos son dorados-ambar con brillo intenso. El fondo muestra un paisaje nocturno con vegetación selvática en silueta, una luna llena brillante arriba a la derecha y partículas luminosas flotando como polvo estelar.

Debajo de la ilustración se encuentra la caja de reglas con el texto (Activa/Pasiva/Activa-Rápida/Pasiva-Rápida) —la parte donde se describirían las habilidades— y, más abajo, el flavor text en itálicas. En la franja inferior de la caja de texto aparecen dos iconos circulares a los lados (una huella de pata a la izquierda y un símbolo en espiral/remolino a la derecha) que flanquean los valores numéricos de estadísticas centrales (se ven dos dígitos pequeños, consistentes con valores de ataque/defensa o costo/Bio propios del sistema Kódem).

En la base de la carta, integrado al marco, se lee el nombre científico ('Leopardus pardalis' implícito por el texto del manual), seguido por el folio de colección (número de carta dentro de la expansión) y los créditos del artista en letra pequeña. Este render está rodeado por líneas guía delgadas en gris que conectan cada región anatómica con un callout numerado o titulado en la periferia de la página: ícono de expansión, nombre, texto, flavor text, nombre científico, créditos y folio.

**Texto embebido:**
- `Ozet, Amante Lunar`

**Relación con el texto:** Es la carta pivote de toda la sección 2.1 'Características Generales'. Cada callout de texto (b03 a b09) apunta a una zona distinta del render para enseñar al lector la anatomía y las partes normativas de cualquier carta del juego.

### `[p05/fig-02]` iconos-rareza-expansion *(type: infographic)*
_bbox (%): x=30, y=76, w=20, h=22_  
**Legibilidad:** clear — Colores distinguibles; el ícono Titán Kósmica podría confundirse con el dorado Rara si no se observa la saturación extra.  

**Descripción:** Bloque visual de seis filas verticales que cataloga los niveles de rareza de las cartas de Kódem TCG. Cada fila está compuesta por un ícono circular del sello de expansión en un color distintivo, acompañado a la derecha por el texto que nombra el nivel correspondiente. El conjunto está alineado en columna con interlineado uniforme y con el mismo tamaño de punto para cada nombre, reforzando una jerarquía horizontal.

El primer ícono es gris plateado mate, con la silueta característica del sello del set y la huella de pata Kódem integrada; lo acompaña la leyenda 'Carta común'. El segundo ícono es dorado-naranja brillante con reflejos cálidos y corresponde a 'Carta Rara'. El tercero es azul cian/aqua con un acabado vidrioso, correspondiente a 'Carta Súper Rara'.

El cuarto es rojo intenso escarlata y se vincula con 'Carta Ultra Rara'. El quinto es morado/violeta con leves destellos (sugiriendo holografía cósmica) y está etiquetado como 'Carta Kósmica'. El sexto y último es un dorado especial más luminoso y saturado que el de la rara común, acompañado por la leyenda 'Carta Titán Kósmica' y, debajo, una nota al pie en tipografía menor e itálicas que aclara '*Aplica sólo para la expansión "Titanes de la Corteza"'.

Todos los iconos mantienen la misma silueta base, variando únicamente el color, lo que ilustra visualmente el principio explicado en el párrafo B11: 'su nivel de rareza se puede identificar por el color del ícono de expansión o por el folio'. La infografía funciona como leyenda visual normativa para que el jugador aprenda a reconocer la rareza en cualquier carta del juego.

**Texto embebido:**
- `Carta común`
- `Carta Rara`
- `Carta Súper Rara`
- `Carta Ultra Rara`
- `Carta Kósmica`
- `Carta Titán Kósmica`
- `*Aplica sólo para la expansión "Titanes de la Corteza"`

**Relación con el texto:** Leyenda visual que acompaña a los bloques b10-b12 (sección 2.1.1 Rarezas). Cada ícono es el referente cromático que el texto describe.

### `[p05/fig-03]` chevrones-decorativos-cabecera *(type: icon)*
_bbox (%): x=2, y=2, w=96, h=5_  
**Legibilidad:** clear  

**Descripción:** A lo largo de la franja superior de la página corre una banda decorativa compuesta por tres chevrones (ángulos cuneiformes) a cada lado que flanquean el título de sección. Los chevrones son de color azul oscuro con un ligero degradado hacia azul medio, dando sensación de profundidad.

La banda funciona como firma gráfica recurrente del rulebook Kódem: delimita visualmente el encabezado, separa la marca/numeración de sección del cuerpo de la página y aporta un ritmo visual tribal/geométrico alineado con la estética mesoamericana del juego. Detrás de los chevrones se percibe un patrón tenue de textura que puede ser ruido o motivos vegetales estilizados.

En el centro de la banda se ubica la numeración '2.' seguida del título 'Partes de la carta' en tipografía de palo seco condensada. Los chevrones de la izquierda apuntan hacia adentro (hacia el texto) y los de la derecha también apuntan hacia el texto, creando una composición simétrica y equilibrada.

**Relación con el texto:** Decoración estructural del encabezado de la sección 2; no aporta reglas pero marca la jerarquía del documento.

## Notas de página

Página 5 del rulebook: introducción a la anatomía de las cartas (sección 2 Partes de la carta). Layout a dos columnas implícitas con una carta central muy grande como pivote visual y callouts radiales con líneas guía que apuntan a cada parte. Tipografía mixta: títulos con serif decorativa y cuerpo en palo seco. Fondo blanco cremoso con sutiles vetas claras. Incluye un typo preservado ('expasión' en b09) y una variación de marca ('Kodem' sin tilde en b07). La sección 2.1.1 Rarezas se inicia en la mitad baja de la página y continúa con la infografía cromática de seis niveles. Contexto del juego (Adendei, Protector, Rava, Ixim/Rot, Bio, Token, ZP, Extinción, Descansos, Marcas, Fases) no aparece explícitamente en esta página; la página es puramente didáctica sobre lectura de cartas.


---

<a id="pagina-06"></a>

# Página 06 — 2.2 Estadísticas de la carta

> 🧪 **Spot-check Ramsés (pass 3)** — Revisada y anotada por humano.

**Notas de spot-check (humanas):**

- Confirmado 'Energía' (LLM correcto, OCR alucinó typo eEnergla).

**Verdict:** `ocr_preferred` · **Recomendación:** `spot_check_human` · **Confianza:** 0.9 · **Acuerdo LLM↔OCR:** 0.88

**Sección(es):** §2.2, §2.2.1, §5.1, §6.2

## Bloques de texto

### `[p06/b01]` 2.2 Estadísticas de la carta
_pos: top_

> 2.2 Estadísticas de la carta

*Notas:* Subsección principal que introduce las estadísticas impresas en cada carta.

### `[p06/b02]` Vida Máxima:
_pos: top-left_

> Vida Máxima: Son los puntos máximos de vida que puede tener una carta. Al llegar a 0, la carta se enviará a Extinción. La vida máxima de una carta se considera una estadística. El valor de vida de una carta en un momento dado durante el juego NO se considera una estadística.

*Notas:* Callout con 'NO' enfatizado en mayúsculas/negritas. Referencia a 'Extinción' como mecánica de descarte.

### `[p06/b03]` Tipo de carta:
_pos: top-right_

> Tipo de carta:
> Ej. Adendei, Ixim, Rot, Bio, Token o Protector. Algunos efectos de sólo afectan a un tipo específico de carta (Ej. "Activa: Daña a 1 Adendei disponible."), mientras que otros pueden afectar a cualquier tipo de carta. (Ej. "Activa: Daña a 3 cartas en el campo rival").

*Notas:* Typo preservado: 'Algunos efectos de sólo afectan' (parece faltar una palabra o sobrar 'de'). Lista taxonómica de tipos: Adendei, Ixim, Rot, Bio, Token, Protector.

### `[p06/b04]` Subtipo de carta:
_pos: middle-right_

> Subtipo de carta:
> Ej. Adendei Equino, Adendei Abisal, Adendei Titán, etc.

*Notas:* Callout breve con ejemplos de subtipos Adendei.

### `[p06/b05]` Energía:
_pos: middle_

> Energía: Átlica, Pírica, Gélida, Lítica, Cháaktica, Húumica, Demótica o Feral (Ver 2.2.1 Energías)

*Notas:* Enumeración canónica de las ocho energías con referencia cruzada a 2.2.1.

### `[p06/b06]` Daño:
_pos: middle-left_

> Daño: Indica cuántos puntos de vida se reducirá la carta atacada por esta carta. Si una carta tiene un signo de interrogación "?" en este apartado; el daño no tiene un valor fijo y el efecto de la carta proporcionará más información respecto a esta estadística. El daño puede modificarse por efectos que lo cambien como escalar o descender (Ver 6.2. Cambios de Estadísticas).

*Notas:* Referencia cruzada a §6.2. Introduce verbos 'escalar' y 'descender' como modificadores de estadística.

### `[p06/b07]` Descanso:
_pos: middle-left_

> Descanso: Número de turnos que una carta tiene que esperar después de atacar o usar una Activa para estar nuevamente disponible (Ver 5.1. Descansos). Se puede encontrar un signo de interrogación "?" en este apartado; no tendrá un valor fijo y el efecto de la carta proporcionará más información respecto a esta estadística.

*Notas:* Referencia cruzada a §5.1 Descansos.

### `[p06/b08]` 2.2.1 ENERGÍAS
_pos: middle_

> 2.2.1 ENERGÍAS

*Notas:* Encabezado en versalitas que abre la subsección de energías.

### `[p06/b09]`
_pos: middle_

> En Kódem, puedes combinar cualquier tipo de energía para jugar, así que ¡experimenta y encuentra tu estilo!. Aunque cada Energía se relaciona con un estilo de juego distinto, el juego no restringe su uso.

*Notas:* Párrafo introductorio a las energías. Signo '¡' inicial y punto después del cierre '!' preservados.

### `[p06/b10]` ÁTLICA:
_pos: middle-left_

> ÁTLICA:
> Representa el control sobre la materia líquida. Su juego es fluido y adaptable, enfocándose en habilidades curativas y defensivas.

*Notas:* Primera energía. Palabras clave en negritas: 'materia líquida', 'curativas', 'defensivas'.

### `[p06/b11]` PÍRICA:
_pos: middle-right_

> PÍRICA:
> Dominio del calor y el fuego.
> Es potencia y agresión puras, brindándote ataques alta y medianamente fuertes junto a marcas de quemadura que debilitan a tus rivales con cada golpe que intentan dar.

*Notas:* Typo preservado: 'ataques alta y medianamente fuertes' (concordancia rota). Introduce marcas de 'quemadura'.

### `[p06/b12]` GÉLIDA:
_pos: middle-left_

> GÉLIDA:
> Controla el aire frío y el hielo. Aunque sus ataques son bajos, tiene un poderoso efecto que limita los movimientos rivales, añadiendoles descansos.

*Notas:* Typo preservado: 'añadiendoles' (sin tilde, debería ser 'añadiéndoles').

### `[p06/b13]` LÍTICA:
_pos: middle-right_

> LÍTICA:
> Representa el poder de la materia sólida. Con alta cadencia de ataque y poder físico, esta energía puede neutralizar efectos rivales, aunque suelen ser cartas lentas.

*Notas:* Énfasis en 'alta cadencia', 'ataque', 'cartas lentas'.

### `[p06/b14]` CHÁAKTICA:
_pos: bottom-left_

> CHÁAKTICA:
> El dominio de la electricidad. Reflejos y velocidad caracterizan a esta energía, que permite responder ágilmente a los ataques y lanzar ofensivas constantes con descansos mínimos o nulos.

*Notas:* Nombre con doble 'a' preservado: 'CHÁAKTICA'.

### `[p06/b15]` HÚUMICA:
_pos: bottom-right_

> HÚUMICA:
> Conecta con la vibración y dominio de los cuatro elementos. La paciencia es clave aquí; esta energía potencia tus cartas progresivamente, aumentando sus estadísticas de ataque mediante el efecto escalar, también suelen tener efectos de control.

*Notas:* Nombre con doble 'u' preservado: 'HÚUMICA'. Introduce efecto 'escalar'.

### `[p06/b16]` DEMÓTICA:
_pos: bottom-left_

> DEMÓTICA:
> Manipula la densidad de la materia. Reposiciona tus cartas para potenciar sus efectos estratégico.
> Si eres principiante no sugerimos crear un mazo demótico ya que la energía sirve más como soporte para estrategias previas.

*Notas:* Typo preservado: 'efectos estratégico' (concordancia rota, debería ser 'estratégicos').

### `[p06/b17]` FERAL:
_pos: bottom-right_

> FERAL:
> Aquellos Adendei con ausencia de dominio elemental, a pesar de ello, compensan esto con poder de manada, y reacciones rápidas o altas cadencias de ataque. Dentro del juego, también se considera una Energía.

*Notas:* Cierra la enumeración aclarando que Feral, aunque es 'ausencia de energía elemental', cuenta como una Energía a efectos de reglas.

### `[p06/b18]` Shugg — Pasiva-Rápida
_pos: card-example_

> Pasiva-Rápida: Si 1 Adendei Abisal aliado es revelado, revela (coloca boca arriba) 1 carta rival y niega la Pasiva de 1 carta rival hasta el fin del turno.

*Notas:* [spot-check pass 3] Agregado por Ramsés (texto enviado vía imagen) — omitido por LLM pass 1.

### `[p06/b19]` Shugg — Costo
_pos: card-example_

> Costo: No podrás usar la Pasiva de tu Bio mientras esta carta esté en el campo.

*Notas:* [spot-check pass 3] Agregado por Ramsés (texto enviado vía imagen) — omitido por LLM pass 1.

## Figuras

### `[p06/fig-01]` card-shugg-serpiente-voraz-anatomia-stats *(type: illustration)*
_bbox (%): x=32, y=10, w=40, h=38_  
**Legibilidad:** clear — Valores numéricos y el folio legibles; los iconos pequeños de energía en la franja inferior se distinguen por color pero podrían requerir enhance para lectura ultra-precisa del símbolo interno.  

**Descripción:** La página presenta como eje visual de la sección 2.2 un render grande de la carta 'Shugg, Serpiente Voraz', ubicada en la franja superior central. Funciona como pivote anatómico: líneas guía delgadas la conectan con los callouts periféricos que explican cada estadística (Vida Máxima, Tipo, Subtipo, Energía, Daño, Descanso).

El marco de la carta utiliza tonos grises oscuros con vetas plateadas y detalles dorados sutiles, consistente con la identidad visual de la expansión. En la franja superior hay un listón gris claro con el nombre 'Shugg, Serpiente Voraz' en tipografía serif oscura y decorativa. En la esquina superior izquierda del listón se observa el ícono de expansión (sello circular con huella); en la superior derecha, el complemento ornamental.

La ilustración principal representa a una criatura serpentiforme monumental, de tonalidades verde-azuladas con reflejos turquesas, de aspecto abisal y amenazante. Su cabeza domina el encuadre: ojos dorados brillantes, mandíbulas entreabiertas revelando colmillos y una lengua bífida insinuada; el cuerpo emerge del fondo como volutas serpenteantes. El fondo es oscuro, con destellos anaranjados/dorados que sugieren magma o luminiscencia profunda, sumando sensación de caverna abisal.

Bajo la ilustración, la caja de texto de la carta muestra una habilidad marcada como 'Pasiva-Rápida' con un costo asociado, seguida del flavor text en itálicas. En la franja inferior de la caja se aprecian dos iconos circulares de energía (sugiriendo combinación Abisal/Feral) flanqueando dos valores numéricos: '2' (daño) a la izquierda y '1' (descanso) a la derecha, más un símbolo adicional que corresponde a la ranura de descanso.

En la base del marco se lee el nombre científico (asociado al concepto de serpiente abisal), el folio de colección ('DOOC-015') y los créditos del artista en tipografía pequeña. Toda la carta funciona como ejemplo pedagógico: cada callout textual alrededor apunta con una flecha fina a la zona específica donde aparece impresa la estadística correspondiente.

**Texto embebido:**
- `Shugg, Serpiente Voraz`
- `Pasiva-Rápida`
- `DOOC-015`

**Relación con el texto:** Es la carta de ejemplo para TODA la sección 2.2 'Estadísticas de la carta'. Cada callout (b02-b07) está conectado por una línea guía a la parte correspondiente del render.

### `[p06/fig-02]` iconos-ocho-energias *(type: infographic)*
_bbox (%): x=6, y=52, w=88, h=44_  
**Legibilidad:** clear — El contraste en los iconos permite diferenciarlos por color; los símbolos internos son legibles aunque reducidos.  

**Descripción:** Conjunto de ocho bloques distribuidos en dos columnas (izquierda y derecha) y cuatro filas, cada uno dedicado a una Energía del juego. Cada bloque combina un ícono circular coloreado, el nombre de la energía en versalitas (p. ej. ÁTLICA) y un breve párrafo descriptivo. Los iconos comparten una silueta circular uniforme, diferenciándose por color dominante y símbolo interior; esta uniformidad funciona como leyenda visual para que el jugador reconozca el tipo de energía en cualquier carta.

ÁTLICA (columna izquierda, fila 1): disco azul medio con destellos celestes, símbolo interior que sugiere una gota o espiral líquida. Representa materia líquida, juego fluido, habilidades curativas y defensivas.

PÍRICA (columna derecha, fila 1): disco rojo intenso con halo anaranjado, símbolo de llama estilizada. Representa fuego y calor; agresión y marcas de quemadura.

GÉLIDA (columna izquierda, fila 2): disco azul pálido casi blanco con destellos plateados, símbolo de copo de nieve o cristal de hielo. Representa aire frío y hielo; limita movimientos rivales.

LÍTICA (columna derecha, fila 2): disco marrón-rojizo terroso con texturas pétreas, símbolo de roca o fragmento mineral. Representa materia sólida; cartas lentas pero poderosas.

CHÁAKTICA (columna izquierda, fila 3): disco violeta/púrpura eléctrico con halos luminosos, símbolo de rayo o zigzag eléctrico. Representa electricidad; reflejos, velocidad y descansos mínimos.

HÚUMICA (columna derecha, fila 3): disco dorado/amarillo con destellos cálidos, símbolo que remite a los cuatro elementos o vibración (ondas concéntricas o espiral). Representa vibración y cuatro elementos; efecto escalar y control.

DEMÓTICA (columna izquierda, fila 4): disco verde oscuro con matices turquesa/azulado, símbolo que sugiere densidad, átomo o espiral densa. Reposiciona cartas; recomendada para jugadores avanzados.

FERAL (columna derecha, fila 4): disco gris-beige neutro, más sobrio, símbolo de huella/garra animal. Carece de dominio elemental; poder de manada y altas cadencias; cuenta como Energía.

Los ocho iconos mantienen proporción idéntica y comparten una misma plantilla de marco, lo que refuerza la lectura comparativa. En conjunto constituyen el lexicón cromático que el jugador debe memorizar para identificar afiliación elemental en cualquier carta del juego.

**Texto embebido:**
- `ÁTLICA`
- `PÍRICA`
- `GÉLIDA`
- `LÍTICA`
- `CHÁAKTICA`
- `HÚUMICA`
- `DEMÓTICA`
- `FERAL`

**Relación con el texto:** Cada ícono acompaña al bloque de texto descriptivo correspondiente (b10 a b17), formando pares icono+descripción que permiten identificar visualmente cada energía.

### `[p06/fig-03]` chevrones-decorativos-cabecera *(type: icon)*
_bbox (%): x=2, y=2, w=96, h=5_  
**Legibilidad:** clear  

**Descripción:** Banda decorativa superior idéntica en estilo a la de la página 5: chevrones azules cuneiformes flanquean el número y título de la sección '2.2 Estadísticas de la carta'. La decoración refuerza la identidad gráfica mesoamericana del manual y delimita la jerarquía visual del documento.

Los chevrones son tres a cada lado del título, con color azul oscuro degradado hacia azul medio, apuntando hacia el centro del encabezado. El fondo detrás de ellos es crema-blanco con posibles texturas sutiles.

**Relación con el texto:** Elemento estructural/decorativo del encabezado de página; no aporta contenido normativo.

## Notas de página

Página 6 del rulebook: cubre la sección 2.2 'Estadísticas de la carta' y la subsección 2.2.1 'Energías'. La mitad superior organiza callouts anatómicos alrededor de la carta ejemplo 'Shugg, Serpiente Voraz' para enseñar las seis estadísticas (Vida Máxima, Tipo, Subtipo, Energía, Daño, Descanso). La mitad inferior presenta una retícula 2×4 con los ocho tipos de Energía del juego, cada uno con ícono cromático y descripción breve de su estilo de juego. Se preservan varios typos/rupturas de concordancia: 'Algunos efectos de sólo afectan' (b03), 'ataques alta y medianamente fuertes' (b11), 'añadiendoles' sin tilde (b12), 'efectos estratégico' (b16). Layout de dos columnas en la parte inferior con fondo blanco-crema y chevrones azules en la cabecera. Contexto del juego presente explícitamente: Adendei, Ixim, Rot, Bio, Token, Protector, Extinción, Descansos, Activa, Pasiva-Rápida, escalar/descender como modificadores de estadística, marcas de quemadura.


---

<a id="pagina-07"></a>

# Página 07 — 3. Tipos de Cartas — 3.1 Adendei

**Verdict:** `ocr_preferred` · **Recomendación:** `re_extract` · **✓ Re-validada (pass 2)** · **Confianza:** 0.94 · **Acuerdo LLM↔OCR:** 0.9

**Sección(es):** §3, §3.1

## Bloques de texto

### `[p07/b01]` 3. Tipos de cartas
_pos: top-header_

> 3. Tipos de cartas

*Notas:* Encabezado principal de sección dentro de banner azul con ornamentación triangular en ambos extremos.

### `[p07/b02]` 3.1 Adendei
_pos: top-left_

> 3.1 Adendei

*Notas:* Encabezado de subsección 3.1 dentro de cápsula/pastilla azul, acompañado a la derecha por un ícono de huella animal (pata) en color azul que identifica al tipo de carta Adendei.

### `[p07/b03]`
_pos: top_

> Los "Jardineros" del planeta; guían todo aquello que no puede guiarse a sí mismo. Esta raza mística ha existido desde el inicio de formación del planeta, siendo llamados "nahuales", "compañeros", "Kalan" o "animales espirituales" por diferentes civilizaciones humanas.

*Notas:* Párrafo introductorio narrativo sobre los Adendei.

### `[p07/b04]`
_pos: top_

> Los Adendei se consideran tus cartas principales durante tu combate, con ellas atacarás, harás efectos y podrás reforzarlas para vencer a tu rival.

*Notas:* Párrafo de rol mecánico de las cartas Adendei; la palabra 'Adendei' aparece en cursiva.

### `[p07/b05]` Nombre del Adendei
_pos: middle-left (callout superior izquierdo)_

> Nombre del Adendei: Cada carta de Adendei es una faceta o poder del personaje, por lo que primero se indicará el nombre de este y posteriormente el resto del nombre de la carta. Algunas cartas requieren Adendei específicos para poder utilizarse.

*Notas:* Callout morado conectado por línea al nombre en la parte superior de la carta ejemplo. 'Adendei' en cursiva.

### `[p07/b06]` Vida
_pos: middle-right (callout superior derecho)_

> Vida: Cada Adendei tiene 6 puntos de vida máxima, aunque este valor no se encuentra impreso en la carta.

*Notas:* Callout celeste/turquesa. 'vida máxima' en negrita cursiva; '6' en negrita. Apunta hacia la zona superior/retrato de la carta ejemplo.

### `[p07/b07]` Subtipo Tipo de Adendei
_pos: middle-left (callout medio izquierdo)_

> Subtipo Tipo de Adendei: Algunos de los Adendei se categorizan de acuerdo con su rol, su poder, su antigüedad, etc. Este apartado indica qué subtipo de Adendei es tu carta. Ej. Titán, Abisal, Equino, Lupino, Infectado, Guardián, Kósmico, Catrin, etc.

*Notas:* Callout naranja. Lista de ejemplos de subtipos en negrita cursiva. Apunta al banner medio de la carta donde aparece 'Adendei Titán / Demótica'. 'Catrin' sin tilde (verbatim).

### `[p07/b08]` Energía
_pos: middle-right (callout medio derecho)_

> Energía: Para cumplir su resguardo de la vida, cada Adendei fue dotado con el poder de dominio sobre una (o más) de las 7 energías primordiales de la naturaleza en nuestro planeta, en algunos casos estas energías determinan su forma de juego durante la partida.

*Notas:* Callout naranja. '7' en negrita. Apunta al ícono circular de energía en la banda media-derecha de la carta.

### `[p07/b09]` Efecto
_pos: middle-left (callout inferior izquierdo)_

> Efecto: En la caja de texto de las cartas, podremos encontrar los efectos de los Adendei: se dividen entre efectos Pasivos y Activos. Algunos Adendei no cuentan con efecto.

*Notas:* Callout morado. 'Pasivos y Activos' mencionados como categorías. Apunta a la caja de texto de efectos de la carta.

### `[p07/b10]` Costo
_pos: middle-right (callout inferior derecho)_

> Costo: Algunos Adendei requieren pagar un costo para poder atacar o usar su habilidad Activa.

*Notas:* Callout morado. Apunta al círculo de costo (1) en la parte inferior-central de la carta, junto al valor de daño.

### `[p07/b11]` Daño
_pos: bottom-left (callout inferior)_

> Daño: Indicado en su estadística, el daño puede variar por efectos que modifiquen la estadística de daño como escalar o descender (Ver 6.3 Tipos de daño).

*Notas:* Callout naranja. 'escalar o descender' en cursiva. 'Ver 6.3 Tipos de daño' en cursiva más pequeña. Apunta al valor numérico '2' (daño) en la parte inferior de la carta.

### `[p07/b12]` Descanso
_pos: bottom-right (callout inferior)_

> Descanso: Indicado en su estadística, un Adendei puede tener desde 0 hasta un máximo de 2 descansos.

*Notas:* Callout naranja. '0' y '2' en negrita. Apunta al ícono circular con flecha curva (símbolo de descanso) junto al valor '1' en la parte inferior derecha de la carta.

### `[p07/b13]` Uso de los Adendei
_pos: bottom-center (header)_

> USO DE LOS ADENDEI

*Notas:* Encabezado en cápsula con bordes redondeados azul, texto en versalitas (small caps). Preservado tal como aparece impreso.

### `[p07/b14]` Uso de los Adendei (lista)
_pos: bottom_

> 1. Oculta (coloca boca abajo) tus Adendei en Zona Principal al inicio del juego.
> 2. En Fase Previa revela el número de Adendei que quieras.
> 3. En Fase de Batalla puedes atacar a cartas rivales con 1 de tus Adendei.
> 4. Si un Adendei atacó y/o utilizó Activa, al final de tu turno irá a descanso (Ver 5.1 Descansos).
> 5. Cuando un Adendei llega a 0 puntos de vida, irá a Extinción y se reemplazará por una carta suplente (Ver 5.3 Reemplazo de cartas).

*Notas:* Lista numerada centrada. Palabras en cursiva: Oculta, Adendei, Fase Previa, Fase de Batalla, Activa, descanso, Extinción. Referencias entre paréntesis en cursiva más pequeña.

### `[p07/b15]` Nota
_pos: bottom_

> Nota: Para saber más sobre el uso de efectos de los Adendei te recomendamos que leas las selecciones 5. Fases del de Turno y 6. Interacciones y Efectos.

*Notas:* VERBATIM: La fuente imprime 'Fases del de Turno' con 'de' redundante entre 'del' y 'Turno'. Typo confirmado en OCR y vision. LLM pass 1 silenciosamente 'corrigió' a 'Fases del Turno' — violación verbatim. '5. Fases del de Turno' y '6. Interacciones y Efectos' en versalitas/small caps cursivas. 'Nota:' en versalitas negritas. También usa 'selecciones' (probable typo de 'secciones') — preservado verbatim.

### `[p07/b16]`
_pos: bottom-right-corner_

> 7

*Notas:* Número de página en cápsula azul con esquina recortada.

### `[p07/b17]` Carta ejemplo — Nombre
_pos: card-example/title-banner_

> Therz, Manifestación Fantasmal

*Notas:* Banner superior de la carta Adendei de ejemplo. 'Manifestación Fantasmal' aparece UNA sola vez (verificado por vision). El OCR capturó duplicado 'Manifestación Fantasmal Fantasmal' — artefacto OCR, no typo de fuente.

### `[p07/b18]` Carta ejemplo — Tipo/Subtipo
_pos: card-example/middle-banner_

> Adendei Titán / Demótica

*Notas:* Banda media del tipo/subtipo. Incluye ícono de huella a la izquierda e ícono circular de energía a la derecha.

### `[p07/b19]` Carta ejemplo — Activa
_pos: card-example/text-box_

> Activa: Muestra las primeras 3 cartas del Mazo rival, copia la Activa y costo de 1 de esas cartas mientras esta carta este en el campo. Esas cartas no podran usar sus efectos al ser mostradas y regresaran al fondo del Mazo rival.

*Notas:* VERBATIM: 'este' sin tilde (debería ser 'esté'), 'podran' sin tilde (debería ser 'podrán'), 'regresaran' sin tilde (debería ser 'regresarán'). Typos confirmados en OCR. LLM pass 1 silenciosamente corrigió acentos — violación verbatim.

### `[p07/b20]` Carta ejemplo — Costo
_pos: card-example/text-box_

> Costo: Sólo puedes usar este efecto una vez por juego.

*Notas:* VERBATIM: 'Sólo' con tilde (preservado tal como aparece).

### `[p07/b21]` Carta ejemplo — Código
_pos: card-example/bottom-left_

> DOOC-011

*Notas:* Código de set/carta.

### `[p07/b22]` Carta ejemplo — Ilustrador
_pos: card-example/bottom-left_

> Kundu del Castillo

*Notas:* Crédito de ilustración.

### `[p07/b23]` Carta ejemplo — Daño
_pos: card-example/bottom-center_

> 2

*Notas:* Valor de daño en círculo.

### `[p07/b24]` Carta ejemplo — Descanso
_pos: card-example/bottom-center_

> 1

*Notas:* Valor de descanso en círculo con flecha curva.

### `[p07/b25]` Carta ejemplo — Nombre científico
_pos: card-example/bottom-right_

> Therizinosaurus cheloniformis

*Notas:* CORRECCIÓN pass 1: Primera extracción escribió 'ctelophorus' — incorrecto. Nombre científico correcto verificado por OCR y vision: 'cheloniformis'. Texto en itálica pequeña al pie de la carta.

### `[p07/b26]` Carta ejemplo — Sello
_pos: card-example/bottom-right_

> Kódem TCG ©

*Notas:* Sello de copyright.

## Figuras

### `[p07/fig-01]` banner-seccion-3-tipos-cartas *(type: illustration)*
_bbox (%): x=0, y=0, w=100, h=6_  
**Legibilidad:** clear — Texto blanco sobre fondo azul oscuro, contraste alto.  

**Descripción:** Banner horizontal decorativo en la parte superior de la página que contiene el título de la sección. El banner tiene un fondo azul marino oscuro con ornamentaciones geométricas: a ambos lados del texto central se extienden patrones de rayas diagonales blancas/azul claro en forma de triángulos escalonados que evocan motivos prehispánicos o art-decó. En el centro, dentro de un contorno azul más claro con esquinas cortadas y redondeadas, aparece el texto '3. TIPOS DE CARTAS' en versalitas blancas con tipografía serif robusta, donde la 'T' y la letra inicial de cada palabra principal son ligeramente más grandes.

El diseño del banner es coherente con el lenguaje visual del libro de reglas Kódem, funcionando como separador visual fuerte que indica el inicio de un capítulo completo dedicado a la tipología de cartas del juego. Los ornamentos laterales dan sensación de anchura y autoridad, como un estandarte ceremonial.

**Texto embebido:**
- `3. TIPOS DE CARTAS`

**Relación con el texto:** Encabezado de la sección 3 completa, que abarcará los tipos de cartas del juego (Adendei, Protector, etc.).

### `[p07/fig-02]` icono-seccion-3-1-pata-adendei *(type: icon)*
_bbox (%): x=23, y=8, w=8, h=4_  
**Legibilidad:** clear  

**Descripción:** Ícono vectorial de una huella animal (pata) en color azul vibrante, compuesto por cuatro almohadillas digitales pequeñas en forma oval dispuestas en arco sobre una almohadilla plantar central más grande de forma trapezoidal redondeada. La figura aparece justo a la derecha de la cápsula azul que contiene '3.1 ADENDEI', funcionando como símbolo/glifo identificador del tipo de carta Adendei (dado su carácter de 'animales espirituales' y 'nahuales' según la narrativa). El color es un azul cian saturado, coherente con la paleta de encabezados de Kódem.

**Relación con el texto:** Refuerza visualmente la sección 3.1 Adendei; el glifo de pata simboliza a los 'animales espirituales'/'nahuales' descritos en el texto introductorio.

### `[p07/fig-03]` cabecera-3-1-adendei *(type: icon)*
_bbox (%): x=4, y=8, w=20, h=4_  
**Legibilidad:** clear  

**Descripción:** Cápsula/pastilla alargada horizontal con fondo azul marino sólido y bordes redondeados. En la parte izquierda de la cápsula hay un pequeño rectángulo celeste/turquesa más claro que contiene el número '3.1' en negritas blancas. Después del número, separados por una línea diagonal decorativa, aparece la palabra 'ADENDEI' en versalitas blancas con tipografía ligeramente estilizada (serif condensada). El conjunto funciona como encabezado de nivel 2 para la subsección 3.1 sobre Adendei.

**Texto embebido:**
- `3.1`
- `ADENDEI`

**Relación con el texto:** Encabezado de la subsección 3.1 dedicada al tipo de carta Adendei.

### `[p07/fig-04]` carta-ejemplo-therz-manifestacion-fantasmal *(type: illustration)*
_bbox (%): x=30, y=28, w=40, h=48_  
**Legibilidad:** clear — CORREGIDO pass 2: Nombre científico es 'cheloniformis' (no 'ctelophorus' como pass 1). Verificado por vision y OCR. Typos de fuente en caja de texto preservados verbatim ('este', 'podran', 'regresaran' sin tildes).  

**Descripción:** Carta Adendei de ejemplo completa, centrada en la página y rodeada por callouts explicativos que señalan cada uno de sus componentes mediante líneas conectoras. La carta muestra el layout estándar de los Adendei en Kódem TCG.

En la parte superior, dentro de un banner oscuro con bordes ornamentados tipo cartucho (con terminaciones triangulares hacia adentro), aparece el nombre de la carta: 'Therz, Manifestación Fantasmal'. El nombre del personaje 'Therz' va seguido de una coma y el subtítulo descriptivo 'Manifestación Fantasmal' (una sola vez).

El arte central ocupa la mayor parte de la carta y muestra una figura etérea/espectral de tonos rosados y magenta sobre un fondo oscuro morado-negro. La criatura parece un ser fantasmagórico con rasgos animales-humanoides estilizados: se perciben formas alargadas, posiblemente cuernos o apéndices puntiagudos, líneas fluidas que sugieren un cuerpo inmaterial desvaneciéndose en humo/niebla. Las tonalidades van desde rosa fucsia brillante hasta magenta oscuro y toques negros. Transmite una atmósfera mística, fantasmal y algo ominosa.

Debajo del arte hay una banda horizontal oscura donde, a la izquierda, hay un pequeño ícono circular de huella/pata, luego el texto 'Adendei Titán / Demótica' indicando el tipo y subtipo(s) de la carta, y a la derecha un ícono circular con el símbolo de energía (aparentemente dos puntos/ojos o símbolo de energía demótica).

En la caja de texto inferior, sobre fondo gris-azulado oscuro, aparece el efecto de la carta (VERBATIM con typos de fuente):
'Activa: Muestra las primeras 3 cartas del Mazo rival, copia la Activa y costo de 1 de esas cartas mientras esta carta este en el campo. Esas cartas no podran usar sus efectos al ser mostradas y regresaran al fondo del Mazo rival.
Costo: Sólo puedes usar este efecto una vez por juego.'

En el pie de la carta aparecen: a la izquierda el código 'DOOC-011' y el nombre del ilustrador 'Kundu del Castillo'; en el centro los valores de estadísticas: un círculo con '2' (daño) y un círculo con '1' (descanso, con flecha curva indicando descanso); a la derecha el nombre científico en itálica pequeña 'Therizinosaurus cheloniformis' y el sello 'Kódem TCG ©'.

**Texto embebido:**
- `Therz, Manifestación Fantasmal`
- `Adendei Titán / Demótica`
- `Activa: Muestra las primeras 3 cartas del Mazo rival, copia la Activa y costo de 1 de esas cartas mientras esta carta este en el campo. Esas cartas no podran usar sus efectos al ser mostradas y regresaran al fondo del Mazo rival.`
- `Costo: Sólo puedes usar este efecto una vez por juego.`
- `DOOC-011`
- `Kundu del Castillo`
- `2`
- `1`
- `Therizinosaurus cheloniformis`
- `Kódem TCG ©`

**Relación con el texto:** Carta anatómica de referencia para todos los callouts de la página 7 (Nombre, Vida, Subtipo, Energía, Efecto, Costo, Daño, Descanso). Es el ejemplo visual sobre el que se apoyan las definiciones de cada componente del Adendei.

### `[p07/fig-05]` callouts-anatomia-adendei *(type: infographic)*
_bbox (%): x=3, y=28, w=94, h=52_  
**Legibilidad:** clear — Todos los textos de los callouts son legibles; líneas conectoras finas pero visibles.  

**Descripción:** Sistema de callouts anatómicos alrededor de la carta ejemplo, organizados en pares a ambos lados, con líneas conectoras de colores que llegan a puntos específicos de la carta.

Lado izquierdo (de arriba hacia abajo):
- Callout 'Nombre del Adendei' — recuadro con borde morado y fondo blanco, conectado por línea morada a la franja superior del nombre de la carta.
- Callout 'Subtipo Tipo de Adendei' — recuadro con borde naranja y fondo blanco, conectado por línea naranja a la banda media con 'Adendei Titán / Demótica'.
- Callout 'Efecto' — recuadro con borde morado y fondo blanco, conectado por línea morada a la caja de texto de efectos de la carta.

Lado derecho (de arriba hacia abajo):
- Callout 'Vida' — recuadro con borde celeste/turquesa y fondo blanco, conectado por línea celeste a la zona superior del retrato de la carta.
- Callout 'Energía' — recuadro con borde naranja y fondo blanco, conectado por línea naranja al ícono circular de energía en la banda media derecha.
- Callout 'Costo' — recuadro con borde morado y fondo blanco, conectado por línea morada al círculo de costo ('1') en la parte inferior.

Parte inferior (bajo la carta):
- Callout 'Daño' — recuadro con borde naranja, conectado al número '2' (daño) con línea naranja.
- Callout 'Descanso' — recuadro con borde naranja, conectado al ícono de descanso con línea naranja.

El sistema de codificación por color (morado, naranja, turquesa) parece agrupar conceptualmente: morado para identidad/reglas (nombre, efecto, costo), naranja para estadísticas/atributos mecánicos (subtipo, energía, daño, descanso), turquesa para un atributo único (vida máxima).

**Texto embebido:**
- `Nombre del Adendei:`
- `Subtipo Tipo de Adendei:`
- `Efecto:`
- `Vida:`
- `Energía:`
- `Costo:`
- `Daño:`
- `Descanso:`

**Relación con el texto:** Visualización anatómica de cada componente del Adendei descrito en los bloques de texto b05 a b12.

### `[p07/fig-06]` cabecera-uso-adendei *(type: icon)*
_bbox (%): x=28, y=83, w=44, h=4_  
**Legibilidad:** clear  

**Descripción:** Cápsula/pastilla ovalada horizontal con borde azul marino grueso y fondo blanco. En el centro aparece el texto 'USO DE LOS ADENDEI' en versalitas azul marino, tipografía serif con trazos robustos. Funciona como encabezado de la subsección sobre cómo se juegan mecánicamente los Adendei. La forma redondeada y el contorno distintivo evocan un botón o etiqueta ceremonial.

**Texto embebido:**
- `USO DE LOS ADENDEI`

**Relación con el texto:** Encabezado de la lista numerada (b14) que explica el flujo de uso de Adendei en el juego.

### `[p07/fig-07]` numero-pagina-7 *(type: icon)*
_bbox (%): x=93, y=96, w=6, h=3_  
**Legibilidad:** clear  

**Descripción:** Número de página '7' en blanco sobre una etiqueta/cápsula azul marino con la esquina superior izquierda recortada diagonalmente. Colocado en la esquina inferior derecha. Forma parte del sistema de numeración consistente del libro de reglas Kódem.

**Texto embebido:**
- `7`

**Relación con el texto:** Numeración de página.

## Notas de página

Página de referencia anatómica para el tipo de carta Adendei. Estructura: título de sección 3, subsección 3.1, dos párrafos introductorios narrativos/mecánicos, carta ejemplo central con 8 callouts anatómicos codificados por color (morado=identidad/efectos/costo, naranja=estadísticas, turquesa=vida), y al pie una lista de 5 pasos numerados sobre el uso mecánico en el flujo de turno. Se mencionan conceptos clave: Fase Previa, Fase de Batalla, Activa, descanso, Extinción, reemplazo, subtipos (Titán, Abisal, Equino, Lupino, Infectado, Guardián, Kósmico, Catrin), 7 energías primordiales. La carta ejemplo es 'Therz, Manifestación Fantasmal' (Adendei Titán/Demótica). Se referencian las secciones 5. Fases del de Turno (verbatim), 5.1 Descansos, 5.3 Reemplazo de cartas, 6. Interacciones y Efectos, 6.3 Tipos de daño.

PASS 2 NOTES: (1) Nota al pie (b15) preserva typo de fuente 'Fases del de Turno' (con 'de' redundante) — pass 1 silenciosamente había escrito 'Fases del Turno'. (2) Nombre científico (b25, fig-04) corregido a 'cheloniformis' — pass 1 había escrito 'ctelophorus'. (3) Caja de texto de la carta (b19) preserva typos verbatim: 'este' (sin tilde), 'podran' (sin tilde), 'regresaran' (sin tilde). (4) Se agregaron bloques b17-b26 con el texto impreso en la carta ejemplo como bloques separados (nombre, tipo, activa, costo, código, ilustrador, estadísticas, nombre científico, sello).


---

<a id="pagina-08"></a>

# Página 08 — 3.2 Protector — Uso del Protector: Generalidades — Vínculo Odémico

**Verdict:** `both_agree` · **Recomendación:** `accept` · **Confianza:** 0.93 · **Acuerdo LLM↔OCR:** 0.96

**Sección(es):** §3.2

## Bloques de texto

### `[p08/b01]` 3.2 Protector
_pos: top-left_

> 3.2 Protector

*Notas:* Encabezado de subsección 3.2 dentro de cápsula/pastilla azul, acompañado a la derecha por un ícono de ojo estilizado en color azul (símbolo de los Protectores).

### `[p08/b02]`
_pos: top_

> Los Protectores son humanos y otras razas conscientes que han logrado encontrar su vínculo con un Adendei. En el juego, tu carta de Protector tendrá un poderoso efecto que podrá usarse a través de una carta de Adendei.

*Notas:* Párrafo introductorio. 'Protectores', 'Adendei', 'Protector' en cursiva.

### `[p08/b03]` Nombre del Protector
_pos: middle-left (callout superior izquierdo)_

> Nombre del Protector: Cada carta de Protector es una faceta o poder del personaje, por lo que primero se indicará el nombre de este y posteriormente el resto del nombre de la carta. Algunas cartas requieren Protectores específicos para poder utilizarse.

*Notas:* Callout morado. 'Protector' y 'Protectores' en cursiva. Apunta al banner superior de la carta ejemplo donde aparece 'Yanzi, Precisión'.

### `[p08/b04]` Vida
_pos: middle-right (callout superior derecho)_

> Vida: Cada Protector tiene 12 puntos de vida máxima (Aunque este valor no se encuentra impreso en la carta).

*Notas:* Callout celeste/turquesa. '12' en negrita, 'vida máxima' en negrita cursiva. 'Protector' en cursiva. Apunta a la zona superior del retrato de la carta.

### `[p08/b05]` Descansos
_pos: middle-right (callout medio derecho)_

> Descansos: Tu Protector tendrá 3 descansos e iniciará el juego de esta forma. Aunque este valor no se encuentre impreso en la carta, todos los Protectores tienen un máximo 3 descansos. (Ver 5.1 Descansos).

*Notas:* Callout naranja. '3' en negrita. 'Protector', 'Protectores', 'descansos' en cursiva. Referencia '(Ver 5.1 Descansos)' en cursiva pequeña. Apunta al área media-derecha de la carta.

### `[p08/b06]` Efecto
_pos: middle-left (callout medio izquierdo)_

> Efecto: El Protector posee un efecto que podrá ser usado a través del vínculo con un Adendei disponible.

*Notas:* Callout morado. 'Protector' y 'Adendei' en cursiva. Apunta a la caja de texto de efectos de la carta.

### `[p08/b07]` Uso del Protector: Generalidades
_pos: middle_

> Uso del Protector: Generalidades

*Notas:* Encabezado en cápsula con contorno azul marino y fondo blanco; texto en versalitas azul marino.

### `[p08/b08]` Generalidades del Protector (lista)
_pos: middle_

> ·Tu Protector no se considerará oculto o revelado en ningún momento, y no puede ser ocultado ni relevado por ningún efecto.
> ·Sólo pueden ser dañados por cartas que lo especifiquen en su texto, al decir que pueden dañar al Protector o a cualquier carta sin especificar el tipo.
> ·Si un Protector llega a 0 puntos de vida deberá ir a Extinción y una vez que esté en Extinción, se enviarán a esta Zona las 3 cartas del tope de tu Mazo.
> ·Si un Protector abandona el campo sin ser enviado a Extinción, podrá ingresar tu Protector suplente conservando la vida y los mismos descansos que tenía tu Protector anterior.
> ·Si un Protector es enviado a Extinción, podrá ingresar tu Protector suplente con 12 puntos de vida, conservando los mismos descansos que tenía tu Protector anterior.

*Notas:* Lista con 5 viñetas de punto medio (·). Palabras en cursiva: Protector, oculto, revelado, ocultado, relevado, dañados, dañar, Extinción, Mazo, descansos. Números en negrita: 0, 3, 12.

### `[p08/b09]` Vínculo Odémico
_pos: middle-bottom_

> Vínculo Odémico

*Notas:* Encabezado de subsección en cápsula con contorno azul y fondo blanco, texto en versalitas azul marino.

### `[p08/b10]`
_pos: bottom_

> Durante la Fase de Batalla, si tu Protector está disponible, puedes vincularlo a un Adendei disponible, a menos de que el texto del Protector o Adendei indiquen lo contrario (Ver 5. Fases del Turno).

*Notas:* Párrafo introductorio de Vínculo Odémico. 'Fase de Batalla', 'Protector', 'Adendei' en cursiva. 'vincularlo' en negrita. Referencia en cursiva pequeña.

### `[p08/b11]` Vínculo Odémico (lista)
_pos: bottom_

> ·Selecciona el Adendei para vincular.
> ·Usa el efecto de tu Protector.
> ·Al final del turno, el Protector recibe 3 descansos y el Adendei vinculado recibe 1 descanso (Ver 5.1 Descansos).

*Notas:* Lista de 3 viñetas con punto medio (·). 'Adendei', 'Protector', 'descansos', 'descanso' en cursiva. '3' y '1' en negrita. Referencia '(Ver 5.1 Descansos)' en cursiva pequeña.

### `[p08/b12]` Importante
_pos: bottom_

> Importante: En el turno que utilizas tu vínculo NO podrás atacar o utilizar la Activa de ninguna otra carta en Zona Principal.

*Notas:* Nota al pie de página en formato destacado. 'Importante:' en versalitas negrita azul marino. 'NO' en mayúsculas/negrita. 'Activa' y 'Zona Principal' en cursiva.

### `[p08/b13]`
_pos: bottom-right-corner_

> 8

*Notas:* Número de página en cápsula azul con esquina recortada.

## Figuras

### `[p08/fig-01]` cabecera-3-2-protector *(type: icon)*
_bbox (%): x=4, y=4, w=20, h=4_  
**Legibilidad:** clear  

**Descripción:** Cápsula/pastilla alargada horizontal con fondo azul marino sólido y bordes redondeados. En la parte izquierda de la cápsula hay un pequeño rectángulo celeste/turquesa más claro que contiene el número '3.2' en negritas blancas. Después del número, separados por una línea diagonal decorativa, aparece la palabra 'PROTECTOR' en versalitas blancas con tipografía serif condensada estilizada. El conjunto funciona como encabezado de nivel 2 para la subsección 3.2 sobre Protectores, siguiendo el mismo patrón visual que el encabezado '3.1 ADENDEI' de la página 7.

**Texto embebido:**
- `3.2`
- `PROTECTOR`

**Relación con el texto:** Encabezado de la subsección 3.2 dedicada al tipo de carta Protector.

### `[p08/fig-02]` icono-ojo-protector *(type: icon)*
_bbox (%): x=24, y=4, w=7, h=4_  
**Legibilidad:** clear  

**Descripción:** Ícono vectorial de un ojo estilizado en color azul saturado. Compuesto por una forma almendrada/ojival que representa el contorno del ojo, con un círculo concéntrico más pequeño en el centro (iris/pupila). El diseño es limpio, geométrico, sin sombreados. Funciona como símbolo identificador de los Protectores, posiblemente aludiendo a su rol de 'guardianes' que observan y protegen, y a la temática de consciencia/percepción que define a esta raza según la narrativa del juego.

**Relación con el texto:** Glifo visual del tipo de carta Protector, análogo a la pata para Adendei.

### `[p08/fig-03]` carta-ejemplo-yanzi-precision *(type: illustration)*
_bbox (%): x=28, y=14, w=40, h=50_  
**Legibilidad:** clear — El nombre del ilustrador es muy pequeño y está interpretado como 'cripticus' por proximidad visual.  

**Descripción:** Carta Protector de ejemplo completa, centrada en la parte superior de la página y rodeada por callouts explicativos que señalan sus componentes mediante líneas conectoras.

En la parte superior, dentro de un banner oscuro con bordes ornamentados (cartucho con terminaciones triangulares), aparece el nombre de la carta: 'Yanzi, Precisión'. Sigue el mismo patrón del Adendei: primero el nombre del personaje (Yanzi), coma, y luego el rasgo/faceta (Precisión).

El arte central ocupa la mayor parte de la carta y muestra a una mujer joven de cabello castaño-rojizo corto y ondulado, de piel clara, vestida con una blusa amarilla/ocre de mangas cortas y shorts/falda corta en tono verde oliva. Está en pose dinámica, con los brazos extendidos a los lados en una postura de equilibrio o lanzamiento; su mirada está enfocada hacia adelante con expresión concentrada, sugiriendo que es una arquera o lanzadora de cuchillos/proyectiles. Alrededor de ella se ven varios proyectiles negros/plumados (flechas o dardos) volando en distintas direcciones y una estela dinámica. El fondo es una selva/jungla brumosa de tonos verde azulado con troncos de árboles oscuros y vegetación difuminada. La iluminación es cinematográfica con contraluz.

Debajo del arte, una banda oscura horizontal con el texto 'Protector' centrado (etiquetando el tipo de carta) y a los lados íconos decorativos (aparentemente pequeñas formas ojivales/ojos).

En la caja de texto inferior, sobre fondo gris-azulado oscuro, aparece el efecto:
'Activa: El Adendei vinculado no recibe descanso al vincularse, y podrá atacar con 6 ptos. a un Adendei rival en tu siguiente turno.'

En el pie de la carta aparecen: a la izquierda el código 'LGRO-067' y el nombre del ilustrador o referencia ('cripticus' o similar, en itálica pequeña); en el centro un ícono circular grande con el símbolo del ojo (de los Protectores), sin valores numéricos visibles de daño/costo como los Adendei; a la derecha el sello 'Kódem TCG ©'.

**Texto embebido:**
- `Yanzi, Precisión`
- `Protector`
- `Activa: El Adendei vinculado no recibe descanso al vincularse, y podrá atacar con 6 ptos. a un Adendei rival en tu siguiente turno.`
- `LGRO-067`
- `cripticus`
- `Kódem TCG ©`

**Relación con el texto:** Carta anatómica de referencia para los callouts 'Nombre del Protector', 'Vida', 'Descansos' y 'Efecto' en la página 8.

### `[p08/fig-04]` callouts-anatomia-protector *(type: infographic)*
_bbox (%): x=3, y=14, w=94, h=50_  
**Legibilidad:** clear  

**Descripción:** Sistema de callouts anatómicos alrededor de la carta Protector ejemplo, siguiendo el mismo patrón de codificación por color que la página 7.

Lado izquierdo (de arriba hacia abajo):
- Callout 'Nombre del Protector' — recuadro con borde morado y fondo blanco, línea conectora morada hacia el banner superior del nombre.
- Callout 'Efecto' — recuadro con borde morado y fondo blanco, línea morada hacia la caja de texto de efectos.

Lado derecho (de arriba hacia abajo):
- Callout 'Vida' — recuadro con borde celeste/turquesa y fondo blanco, línea celeste hacia la zona superior del retrato.
- Callout 'Descansos' — recuadro con borde naranja y fondo blanco, línea naranja hacia la zona media de la carta.

Se observa que a diferencia del Adendei (página 7), el Protector no tiene callouts para Subtipo, Energía, Costo o Daño — solo tiene 4 componentes anatómicos (Nombre, Vida, Descansos, Efecto), lo cual es coherente con su rol mecánico distinto (no ataca directamente, actúa mediante vínculo).

**Texto embebido:**
- `Nombre del Protector:`
- `Efecto:`
- `Vida:`
- `Descansos:`

**Relación con el texto:** Anatomía visual del tipo Protector descrito en los bloques b03 a b06.

### `[p08/fig-05]` cabecera-uso-protector-generalidades *(type: icon)*
_bbox (%): x=5, y=66, w=40, h=4_  
**Legibilidad:** clear  

**Descripción:** Cápsula/pastilla ovalada horizontal con contorno azul marino grueso y fondo blanco. En su interior, el texto 'USO DEL PROTECTOR: GENERALIDADES' en versalitas azul marino con tipografía serif robusta. Mantiene consistencia visual con la cápsula 'USO DE LOS ADENDEI' de la página 7 pero más ancha para acomodar el texto más largo.

**Texto embebido:**
- `USO DEL PROTECTOR: GENERALIDADES`

**Relación con el texto:** Encabezado de la lista con viñetas (b08) que describe reglas mecánicas específicas del Protector.

### `[p08/fig-06]` cabecera-vinculo-odemico *(type: icon)*
_bbox (%): x=5, y=86, w=28, h=4_  
**Legibilidad:** clear  

**Descripción:** Cápsula/pastilla ovalada horizontal con contorno azul marino grueso y fondo blanco. Contiene el texto 'VÍNCULO ODÉMICO' en versalitas azul marino con tipografía serif consistente con los otros encabezados de la página. La palabra 'Odémico' es un término propio del universo Kódem, posiblemente relacionado con la raíz de Kódem mismo y el concepto de vínculo espiritual entre Protector y Adendei.

**Texto embebido:**
- `VÍNCULO ODÉMICO`

**Relación con el texto:** Encabezado de la subsección final que explica la mecánica de vínculo entre Protector y Adendei (b10-b12).

### `[p08/fig-07]` ilustracion-protector-adendei-silueta *(type: illustration)*
_bbox (%): x=70, y=87, w=28, h=12_  
**Legibilidad:** clear — Los detalles específicos del personaje y la criatura están algo difuminados por el efecto de aura/silueta; interpretación basada en siluetas y contexto narrativo.  

**Descripción:** Ilustración artística en la esquina inferior derecha de la página que muestra a un humano (Protector) con una criatura animal (Adendei), recortada como silueta semi-transparente con efecto de aura rosa/magenta luminosa.

Se distingue una figura humana masculina o andrógina de pie, con ropa urbana (chaqueta, pantalones), cabeza con cabello corto o capucha y una tela/bandana oscura cubriendo la parte inferior del rostro. A sus pies, hacia el lado derecho, aparece una criatura cuadrúpeda tipo félido/cánido pequeño con orejas puntiagudas, mirada directa al frente y expresión alerta — posiblemente un Adendei de subtipo lupino o felino.

La escena parece envuelta en un halo/aura de luz rosa magenta vibrante que se desvanece en los bordes, evocando el 'vínculo odémico' del que habla el texto adyacente. Es una ilustración temática que refuerza visualmente el concepto de pareja Protector-Adendei vinculados por energía mística.

**Relación con el texto:** Ilustración decorativa que refuerza visualmente el concepto de 'Vínculo Odémico' entre Protector y Adendei tratado en los bloques b09-b12.

### `[p08/fig-08]` numero-pagina-8 *(type: icon)*
_bbox (%): x=93, y=96, w=6, h=3_  
**Legibilidad:** clear  

**Descripción:** Número de página '8' en blanco sobre etiqueta/cápsula azul marino con esquina superior izquierda recortada diagonalmente. Colocado en la esquina inferior derecha, consistente con el sistema de numeración del libro.

**Texto embebido:**
- `8`

**Relación con el texto:** Numeración de página.

## Notas de página

Página dedicada al tipo de carta Protector (sección 3.2). Estructura: encabezado 3.2, párrafo introductorio narrativo/mecánico, carta ejemplo central 'Yanzi, Precisión' con 4 callouts anatómicos (Nombre del Protector, Vida, Descansos, Efecto — menos componentes que el Adendei porque el Protector no tiene Subtipo/Energía/Costo/Daño directos), sección 'Uso del Protector: Generalidades' con lista de 5 viñetas sobre reglas mecánicas (oculto/revelado, daños, Extinción con envío de 3 cartas del Mazo, suplentes), y sección final 'Vínculo Odémico' con párrafo introductorio + lista de 3 pasos + nota Importante. Conceptos clave: vínculo odémico, Adendei vinculado, descansos (3 máx para Protector, +1 al Adendei vinculado), 12 puntos de vida máxima, Protector suplente, Extinción, Zona Principal, Fase de Batalla, Activa. Referencias a secciones 5.1 Descansos y 5. Fases del Turno. Ilustración decorativa de pareja humano+animal con aura magenta en esquina inferior derecha refuerza el tema.


---

<a id="pagina-09"></a>

# Página 09 — 3.3 RAVA

**Verdict:** `both_agree` · **Recomendación:** `accept` · **Confianza:** 0.93 · **Acuerdo LLM↔OCR:** 0.95

**Sección(es):** §3.3

## Bloques de texto

### `[p09/b01]` 3.3 RAVA
_pos: top-left_

> Los Rava son poderosas manifestaciones de las 7 energías del universo de Kódem, ellos son las energías materializadas en colosales dragones. Dentro de la batalla darán soporte a las cartas que posean el mismo tipo de energía.

*Notas:* Heading con número de sección 3.3 en píldora azul/cian. '7 energías', 'materializadas' y 'colosales dragones' en negrita.

### `[p09/b02]` Nombre del Rava
_pos: top-left_

> Nombre del Rava: Cada carta de Rava es una faceta o poder del personaje, por lo que primero se indicará el nombre de este y posteriormente el resto del nombre de la carta.

*Notas:* Callout morado conectado a la carta de ejemplo Nok, Frío Magno (banner superior de la carta).

### `[p09/b03]` Efecto
_pos: middle-left_

> Efecto: Los Rava tienen mayormente habilidades Pasivas. Por su naturaleza neutral, sus ventajas o desventajas se aplicarán a las cartas de ambos jugadores siempre que no mencionen "cartas aliadas" o "cartas rivales" de forma específica.

*Notas:* Callout morado. 'Pasivas' en negrita.

### `[p09/b04]` Vida
_pos: middle-right_

> Vida: Cada Rava tiene 6 puntos de vida máxima, aunque este valor no se encuentra impreso en la carta.

*Notas:* Callout cian apuntando a la zona superior de la carta. '6' y 'vida máxima' en negrita.

### `[p09/b05]` Energía
_pos: middle-right_

> Energía: Cada Rava está diseñado para dar soporte a los Adendei de su misma Energía.

*Notas:* Callout naranja apuntando al icono de energía en la carta.

### `[p09/b06]` Costo
_pos: bottom-right_

> Costo: Algunos Rava requieren pagar un costo para poder atacar o usar su efecto.

*Notas:* Callout naranja.

### `[p09/b07]` Daño
_pos: bottom-center_

> Daño

*Notas:* Etiqueta corta naranja apuntando a un número (0) de la parte inferior de la carta.

### `[p09/b08]` Descanso
_pos: bottom-right_

> Descanso: Pueden tener de 0 a 2 descansos máximos.

*Notas:* Callout naranja. '0 a 2' en negrita.

### `[p09/b09]` USO DEL RAVA
_pos: bottom_

> • Los Rava se colocarán en el Mazo Principal.
> • No podrás iniciar el juego con un Rava en tu Zona Principal.
> • Cada Rava podrá regresar de Zona Principal al fondo del Mazo Principal una vez por juego en Fase Previa (Ver 5. Fases del Turno).
> • El jugador podrá regresar 1 Rava de Extinción a la Zona Principal, enviando 2 cartas de su Zona Principal a Extinción en Previa (Ver 5. Fases del Turno).
> • Los Ravas no pueden ser equipados con cartas que no lo indiquen en su texto.

*Notas:* Título 'USO DEL RAVA' en píldora cian. 'Mazo Principal', 'No', 'iniciar', 'juego', 'equipados' en negrita. Referencias a sección 5.

## Figuras

### `[p09/fig-01]` encabezado-seccion-3-3-rava *(type: infographic)*
_bbox (%): x=3, y=1, w=27, h=8_  
**Legibilidad:** clear  

**Descripción:** Encabezado decorativo de sección con formato de doble píldora horizontal en color azul oscuro/cian. La primera píldora contiene el número de sección '3.3' en tipografía blanca bold; la segunda píldora, conectada visualmente, contiene el título 'RAVA' también en blanco mayúscula. A la derecha del conjunto aparece un pequeño icono circular azul con un símbolo estilizado interpretable como la cabeza/silueta de un dragón o lobo en blanco. Este elemento se usa consistentemente como marca de apertura de subsección dentro del capítulo 3 del rulebook.

El icono circular funciona como glifo de navegación visual que distingue la subsección dentro del libro.

El estilo tipográfico coincide con los encabezados de otras subsecciones del capítulo 3 (Adendei, Protector, etc.), indicando consistencia de diseño.

**Texto embebido:**
- `3.3`
- `RAVA`

**Relación con el texto:** Marca el inicio de la subsección 3.3 sobre los Rava y conecta con el bloque b01 que describe qué son los Rava.

### `[p09/fig-02]` carta-ejemplo-nok-frio-magno *(type: illustration)*
_bbox (%): x=30, y=18, w=68, h=58_  
**Legibilidad:** clear  

**Descripción:** Carta de ejemplo 'Nok, Frío Magno' — un Rava de energía Gélida mostrado a gran tamaño como ejemplo de layout de carta Rava. El marco de la carta presenta un patrón de escamas en degradado de colores cálidos intensos (naranja, rojo, amarillo, con toques morados y azules), lo cual es notable porque la energía del Rava es Gélida, sugiriendo que el marco es decorativo/neutral en lugar de atado a la energía.

En el centro superior se observa una ilustración de un dragón colosal: cabeza verde-turquesa con fauces abiertas mostrando dientes afilados blancos, ojo rojo brillante, cuerpo largo serpentino cubierto de escamas, garras y detalles en tonos naranjas/dorados, todo sobre un fondo de cielo con nubes.

Banner blanco superior con el nombre del Rava 'Nok, Frío Magno'. Debajo del arte, una caja de texto blanca semitransparente contiene la descripción de habilidades: subtipo 'Rava / Gélida', la Pasiva y el Costo.

En la parte inferior izquierda y derecha hay dos círculos con el número '0' (costo/ataque y daño acumulado); entre ellos, en la franja inferior, símbolos de energía e iconos de descanso. El pie inferior incluye código de colección y metadatos.

El conjunto se usa como referencia para apuntar con callouts a los campos anatómicos de una carta Rava: nombre, efecto, vida (oculta), energía, costo, daño, descanso.

**Texto embebido:**
- `Nok, Frío Magno`
- `Rava / Gélida`
- `Pasiva: Aumenta 1 pto. de ataque a los Adendei-Gélido mientras esta carta esté en campo. Si un Adendei-Gélido aliado atacó, cura 1 pto. a un Adendei-Gélido aliado.`
- `Costo: Si esta carta es enviada a Extinción, daña 1 pto. a todos los Adendei-Gélido en campo.`
- `IDRMA-001`
- `Kódem TCG ©`
- `Edgaritual_re`
- `0`
- `0`

**Relación con el texto:** Carta anatómica base para los callouts b02-b08 que describen cada componente de una carta Rava (Nombre, Efecto, Vida, Energía, Costo, Daño, Descanso).

### `[p09/fig-03]` arte-decorativo-etereo *(type: illustration)*
_bbox (%): x=0, y=58, w=45, h=42_  
**Legibilidad:** clear  

**Descripción:** Ilustración decorativa ambiental a sangrado de página izquierda con figura etérea/espectral. Se distinguen tonos verdes, turquesa y morados/magenta que forman una silueta encapuchada o criatura envuelta en humo/niebla con destellos luminosos rosados y verdes.

El arte tiene apariencia mística con efectos de partículas y bruma que se difuminan hacia los bordes, sugiriendo una entidad espiritual o un dragón en forma espectral, consistente con el tema de los Rava como manifestaciones de energía.

Funcionalmente, actúa como fondo temático para el bloque de USO DEL RAVA y separador visual entre la anatomía de la carta y las reglas de uso.

**Relación con el texto:** Ambientación decorativa que acompaña al bloque 'USO DEL RAVA'. No contiene información reglamentaria.

### `[p09/fig-04]` titulo-uso-del-rava *(type: infographic)*
_bbox (%): x=60, y=78, w=30, h=5_  
**Legibilidad:** clear  

**Descripción:** Banner/encabezado estilizado para el bloque de reglas. Texto en mayúsculas tipo versalitas 'USO DEL RAVA' dentro de un marco/píldora con bordes curvos en color cian/azul claro, consistente con el estilo de subtítulos del rulebook.

**Texto embebido:**
- `USO DEL RAVA`

**Relación con el texto:** Introduce las reglas de uso descritas en el bloque b09.

### `[p09/fig-05]` numero-de-pagina-9 *(type: icon)*
_bbox (%): x=95, y=97, w=4, h=3_  
**Legibilidad:** clear  

**Descripción:** Folio de paginación en la esquina inferior derecha. Caja pequeña en color azul cian con el número '9' en blanco, siguiendo el estilo de numeración del rulebook.

**Texto embebido:**
- `9`

**Relación con el texto:** Indica número de página.

## Notas de página

Subsección 3.3 RAVA. La página usa una carta anatómica (Nok, Frío Magno) con callouts de colores (morado, cian, naranja) que apuntan a los campos: Nombre, Efecto, Vida, Energía, Costo, Daño, Descanso. Incluye reglas de USO DEL RAVA con 5 bullets.


---

<a id="pagina-10"></a>

# Página 10 — 3.4 Equipos: Ixim y Rot

**Verdict:** `both_agree` · **Recomendación:** `accept` · **Confianza:** 0.93 · **Acuerdo LLM↔OCR:** 0.97

**Sección(es):** §3.4

## Bloques de texto

### `[p10/b01]` 3.4 Equipos: Ixim y Rot
_pos: top-left_

> Los Adendei tienen la capacidad de dominar el reino animal, fungi, vegetal y mineral, por lo que podrán invocar las contrapartes mágicas o naturales de cada reino como un equipo. Durante el juego, tus cartas Equipo serán los Ixim y Rot.

*Notas:* 'equipo', 'Ixim' y 'Rot' en énfasis/negrita.

### `[p10/b02]`
_pos: top_

> • Ixim: Son la manifestación en el reino fungi y vegetal del ser supremo del planeta: "El Árbol de la Savia Sagrada".
> • Rot: Son la manifestación del "Árbol de la Savia Sagrada" en el reino mineral y podrás encontrarlos en bruto, durmientes o refinados como poderosas armaduras.

*Notas:* Lista bullets con bullets cuadrados. 'Ixim', 'Rot', 'reino fungi', 'vegetal', 'mineral' en negrita.

### `[p10/b03]` Nombre
_pos: middle-left_

> Nombre: En la mayoría de los casos, las cartas Equipo no tienen nombre de personaje, por lo que sólo se considera el nombre de la carta. Existen algunas excepciones.

*Notas:* Callout morado. 'nombre de la carta' en negrita.

### `[p10/b04]` Subtipo de carta
_pos: middle-center_

> Subtipo de carta

*Notas:* Etiqueta que conecta con líneas al subtipo (Ixim / Rot) de ambas cartas de ejemplo.

### `[p10/b05]` Efecto
_pos: middle_

> Efecto: Los Ixim siempre tendrán Pasivas y los Rot siempre tendrán Activas.

*Notas:* Callout naranja. 'Pasivas' y 'Activas' en negrita.

### `[p10/b06]` Costo
_pos: middle-bottom_

> Costo: Algunos equipos requieren pagar un costo para poder usar sus efectos.

*Notas:* Callout naranja.

### `[p10/b07]` Uso de Equipos: Generalidades
_pos: bottom_

> Colocar un Ixim o Rot oculto o revelado debajo de una carta hace que esa carta se considere "equipada".
> • Sólo los Adendei pueden ser equipados (a menos que la carta indique lo contrario).
> • Cada carta puede ser equipada con un máximo de 1 Ixim y 1 Rot o un máximo de 2 equipos ya sea que estén ocultos o revelados.
> • Si un equipo se equipa oculto, se considera "equipo" en lugar de Ixim o Rot específicamente.
> • Una carta puede ser equipada con 2 Ixim o 2 Rot siempre que uno de ellos se encuentre oculto.
> • Si una carta equipada es ocultada (colocada boca abajo) sus equipos regresan a la Zona de Equipos.

*Notas:* Subtítulo en píldora azul. 'Colocar', 'equipada', '1 Ixim', '1 Rot', '2 equipos', 'oculto', 'equipo', '2 Ixim', '2 Rot', 'oculto', 'ocultada' en negrita. Bullets cuadrados.

### `[p10/b08]` Equipar
_pos: bottom_

> Durante la Fase de Equipo (Ver 5. Fases de Turno):
> 1. Elige el equipo que quieras de tu Zona de Equipos.
> 2. Selecciona una carta que haya atacado o usado su Activa en Batalla.
> 3. Coloca el equipo debajo de esa carta (oculto o revelado).
> 4. Si una carta equipada se envía a Extinción, los equipos también son enviados a Extinción.

*Notas:* Subtítulo en píldora azul. Lista numerada. 'Fase de Equipo', 'Batalla', 'equipo' en negrita/énfasis. Referencia a sección 5.

## Figuras

### `[p10/fig-01]` encabezado-3-4-equipos-ixim-rot *(type: infographic)*
_bbox (%): x=4, y=3, w=41, h=5_  
**Legibilidad:** clear  

**Descripción:** Encabezado de sección con formato de píldora azul/cian que contiene el número '3.4' y el título 'Equipos: Ixim y Rot'. Acompañado por dos pequeños iconos simbólicos a la derecha: uno azul interpretable como copo de nieve/hoja (para Ixim) y un cristal/diamante azul (para Rot), que evocan el reino vegetal/fungi y el reino mineral respectivamente.

**Texto embebido:**
- `3.4`
- `Equipos: Ixim y Rot`

**Relación con el texto:** Inicio de la subsección, ligado al bloque b01.

### `[p10/fig-02]` carta-ejemplo-ixim-ceiba-raices-cosmicas *(type: illustration)*
_bbox (%): x=5, y=28, w=28, h=38_  
**Legibilidad:** clear  

**Descripción:** Carta Ixim de ejemplo 'Ceiba, Raíces Cósmicas' con código RMR-014. Ilustración de un árbol ceiba místico con un tronco imponente y copa amplia, rodeado de luces/partículas azules y cósmicas que sugieren raíces al inframundo y copa al cosmos.

La carta muestra el layout anatómico de un Ixim: banner de nombre en la parte superior, arte centrado, caja de texto inferior con subtipo 'Ixim' y habilidad Pasiva, con cita de lore en cursiva al final.

Marco en tonos vegetales/verdes consistente con el tema fungi/vegetal del Ixim. Metadata inferior con código de colección, artista (Nether_art31), copyright Kódem TCG, y nombre científico 'Ceiba pentandra'.

Alrededor de la carta hay callouts: uno morado superior etiquetado 'Nombre del Ixim' apuntando al banner de nombre; uno naranja inferior apuntando al subtipo 'Ixim'.

**Texto embebido:**
- `Ceiba, Raíces Cósmicas`
- `Ixim`
- `Pasiva: Durante tu Previa, puedes enviar este equipo a Extinción. La carta que estaba equipada escala 1 pto.`
- `Sus raíces, al inframundo, y su copa, al cosmos...`
- `RMR-014`
- `Nether_art31`
- `Kódem TCG ©`
- `Ceiba pentandra`

**Relación con el texto:** Carta anatómica de referencia para el subtipo Ixim. Demuestra que los Ixim tienen Pasiva (b05).

### `[p10/fig-03]` carta-ejemplo-rot-pruebas-de-campo *(type: illustration)*
_bbox (%): x=63, y=28, w=29, h=38_  
**Legibilidad:** clear  

**Descripción:** Carta Rot de ejemplo 'Pruebas de Campo' con código LGRO-001R. Ilustración de una figura/pieza cristalina/mineral de obsidiana con destellos púrpuras, sugiriendo una armadura o mineral bruto.

La carta muestra el layout anatómico de un Rot: banner superior de nombre, arte central, caja de texto con subtipo 'Rot' y habilidad Activa Rápida con su Costo.

Marco en tonos mineral/oscuros consistente con el tema del reino mineral. Metadata inferior con código de colección, artista 'AbuShield', copyright y 'Obsidiano' como referencia al material.

Alrededor de la carta hay callouts: uno morado superior etiquetado 'Nombre de la carta' apuntando al banner; uno naranja inferior apuntando al subtipo 'Rot'.

**Texto embebido:**
- `Pruebas de Campo`
- `Rot`
- `Activa Rápida: Si una carta aliada es atacada, puedes regresar esta carta a la Zona de Equipo y negar el ataque.`
- `Costo: Solo puedes usar esta carta 1 vez por juego.`
- `LGRO-001R`
- `AbuShield`
- `Kódem TCG ©`
- `Obsidiano`

**Relación con el texto:** Carta anatómica de referencia para el subtipo Rot. Demuestra que los Rot tienen Activa (b05).

### `[p10/fig-04]` callouts-anatomicos-centrales *(type: infographic)*
_bbox (%): x=34, y=31, w=30, h=45_  
**Legibilidad:** clear  

**Descripción:** Conjunto de cuadros/callouts centrales que conectan visualmente (mediante líneas delgadas) las dos cartas (Ixim a la izquierda, Rot a la derecha) con las explicaciones anatómicas compartidas.

Los callouts se diferencian por color: los morados identifican el nombre (b03 'Nombre') y los naranjas identifican el subtipo (b04 'Subtipo de carta'), el efecto (b05 'Efecto') y el costo (b06 'Costo'). Cada callout tiene contornos redondeados y flechas/líneas apuntando al elemento correspondiente en las cartas.

**Texto embebido:**
- `Nombre del Ixim`
- `Nombre de la carta`
- `Nombre`
- `Subtipo de carta`
- `Ixim`
- `Rot`
- `Efecto`
- `Costo`

**Relación con el texto:** Conectan los bloques b03-b06 con las cartas anatómicas fig-02 y fig-03.

### `[p10/fig-05]` titulo-uso-equipos-generalidades *(type: infographic)*
_bbox (%): x=5, y=73, w=38, h=4_  
**Legibilidad:** clear  

**Descripción:** Banner/título de subsección 'Uso de Equipos: Generalidades' en píldora azul/cian, estilo consistente con los subtítulos del rulebook.

**Texto embebido:**
- `Uso de Equipos: Generalidades`

**Relación con el texto:** Introduce el bloque de reglas b07.

### `[p10/fig-06]` titulo-equipar *(type: infographic)*
_bbox (%): x=5, y=86, w=15, h=4_  
**Legibilidad:** clear  

**Descripción:** Banner/título de subsección 'Equipar' en píldora azul/cian.

**Texto embebido:**
- `Equipar`

**Relación con el texto:** Introduce el procedimiento b08.

### `[p10/fig-07]` ejemplo-visual-equipar-aram *(type: photo)*
_bbox (%): x=63, y=85, w=32, h=14_  
**Legibilidad:** clear  

**Descripción:** Composición/render 3D de cartas físicas mostrando una carta Adendei (personaje Aram) con una carta de equipo colocada parcialmente debajo sobre un tapete de juego. Ilustra el acto físico de 'equipar' descrito en b08, con la carta del equipo deslizándose por debajo del borde inferior de la carta del Adendei.

La composición incluye efectos de iluminación/sombra para dar sensación de realismo y la perspectiva es ligeramente en diagonal, dejando ver el arte tanto del Adendei como del equipo.

**Relación con el texto:** Apoya visualmente el procedimiento del bloque b08.

### `[p10/fig-08]` numero-de-pagina-10 *(type: icon)*
_bbox (%): x=93, y=97, w=4, h=3_  
**Legibilidad:** clear  

**Descripción:** Folio de paginación. Caja azul con el número '10' en blanco en la esquina inferior derecha.

**Texto embebido:**
- `10`

**Relación con el texto:** Número de página.

## Notas de página

Subsección 3.4. Presenta dos cartas ejemplo (Ixim 'Ceiba, Raíces Cósmicas' y Rot 'Pruebas de Campo') con callouts anatómicos compartidos. Incluye 'Uso de Equipos: Generalidades' y el procedimiento 'Equipar'. Nota importante: los Ixim siempre tienen Pasivas y los Rot siempre tienen Activas.


---

<a id="pagina-11"></a>

# Página 11 — EQUIPOS COMPATIBLES / EQUIPOS MÚLTIPLES

**Verdict:** `ocr_preferred` · **Recomendación:** `re_extract` · **✓ Re-validada (pass 2)** · **Confianza:** 0.88 · **Acuerdo LLM↔OCR:** 0.88

**Sección(es):** §3.4

## Bloques de texto

### `[p11/b01]` EQUIPOS COMPATIBLES
_pos: top_

> Existen algunas cartas de equipo que funcionan como armaduras o equipos únicos por lo que sólo podrán equiparse a Adendei o cartas específicas, es decir, a cartas compatibles, estos equipos especifican en su texto a qué cartas pueden ser equipadas.

*Notas:* Título en píldora azul. 'armaduras', 'equipos únicos', 'sólo', 'cartas específicas', 'compatibles' en negrita.

### `[p11/b02]`
_pos: top_

> · Una carta solo podrá ser equipada con equipos que sean compatibles.
> · Si un equipo se pretende cambiar de carta, el equipo debe ser compatible con la carta nueva.
> · Si una carta equipada abandona el campo sin ser enviada a Extinción (por ejemplo, si regresa al Mazo o se envía al campo rival), debe colocarse una carta suplente compatible revelada en el campo para mantener el equipo; de lo contrario, el equipo volverá a la Zona de Equipo.

*Notas:* Bullets con reglas de compatibilidad. 'compatibles', 'compatible', 'revelada' en negrita. Primer bullet usa 'solo' sin tilde; el párrafo intro (b01) usa 'sólo' con tilde — inconsistencia de la fuente preservada verbatim.

### `[p11/b03]`
_pos: middle_

> Si una carta tiene equipado un Ixim o Rot no compatible que está oculto y un efecto revela dicho equipo, este equipo irá a la Extinción y no podrá usar su efecto.

*Notas:* 'Ixim', 'Rot', 'no compatible', 'oculto', 'Extinción', 'no podrá usar' en énfasis/negrita.

### `[p11/b04]`
_pos: middle-left_

> Ejemplo de equipo compatible con un personaje específico.

*Notas:* Pie de ejemplo en cursiva.

### `[p11/b05]`
_pos: middle-right_

> Ejemplo de equipo compatible con una energía específica.

*Notas:* Pie de ejemplo en cursiva.

### `[p11/b06]`
_pos: bottom-center_

> Ejemplo de equipo compatible con un tipo de carta específico.

*Notas:* Pie de ejemplo en cursiva.

### `[p11/b07]` EQUIPOS MÚLTIPLES
_pos: bottom_

> Un jugador puede equipar 2 Ixim o 2 Rot ocultos a una carta por decisión propia, pero, si dichos equipos son revelados y no existe una condición que lo permita, el jugador deberá enviar uno de ellos a Extinción y no podrá declarar el efecto de ninguno de ellos por el resto del turno.

*Notas:* Título en píldora azul. '2', 'Ixim', '2', 'Rot', 'ocultos' en negrita.

### `[p11/b08]` Carta Zaykan — Nombre
_pos: card-zaykan/title-banner_

> Zaykan, Retorno del Ermitaño

*Notas:* Banner superior de la carta Adendei del par A (superior izquierdo).

### `[p11/b09]` Carta Zaykan — Tipo/Subtipo
_pos: card-zaykan/middle-banner_

> Adendei / Lítica

*Notas:* Banda media del tipo/subtipo.

### `[p11/b10]` Carta Zaykan — Pasiva
_pos: card-zaykan/text-box_

> Pasiva: Si esta carta es revelada, revela todas las cartas en Zona Principal. Ninguna Zona Principal puede estar boca abajo.

*Notas:* Reconstrucción con alto grado de confianza combinando OCR fragmentario + vision. Algunas palabras parcialmente tapadas por la superposición con Protección Selectiva; se marca legibility needs_enhance para el detalle exacto. El OCR capturó 'Si esta carta es revelada, re...' y 'las cartas en Zona Principal. Ninguna Zona Principal puede estar boca ab...'.

### `[p11/b11]` Carta Zaykan — Flavor text
_pos: card-zaykan/flavor_

> El portal se cerró tras de sí, el ojo abierto y su luz a la oscuridad.

*Notas:* Texto en cursiva debajo de la caja de efectos. Verbatim del OCR (verificado). CORRECCIÓN pass 2: Pass 1 omitió este flavor text completamente.

### `[p11/b12]` Carta Protección Selectiva — Nombre
_pos: card-proteccion-selectiva/title-banner_

> Protección Selectiva

*Notas:* Banner superior carta equipo del par A.

### `[p11/b13]` Carta Protección Selectiva — Tipo
_pos: card-proteccion-selectiva/middle-banner_

> Rot

*Notas:* Subtipo de equipo.

### `[p11/b14]` Carta Protección Selectiva — Activa Rápida
_pos: card-proteccion-selectiva/text-box_

> Activa Rápida: Si un Adendei aliado es atacado, niega el ataque.

*Notas:* Verbatim por vision + OCR.

### `[p11/b15]` Carta Protección Selectiva — Costo
_pos: card-proteccion-selectiva/text-box_

> Costo: La carta equipada se daña 1 pto. si niega el ataque. La carta equipada no podrá atacar, ni ser curada.

*Notas:* Verbatim por vision + OCR. 'pto.' abreviatura preservada.

### `[p11/b16]` Carta Protección Selectiva — Restricción
_pos: card-proteccion-selectiva/restriction_

> Solo puede ser equipada a un Adendei "Zaykan".

*Notas:* Línea resaltada en rojo que define la compatibilidad del equipo. 'Solo' sin tilde (verbatim).

### `[p11/b17]` Carta Draxes — Nombre
_pos: card-draxes/title-banner_

> Draxes, Instinto Draconiano

*Notas:* Banner superior carta Adendei del par B (superior derecho).

### `[p11/b18]` Carta Draxes — Tipo/Subtipo
_pos: card-draxes/middle-banner_

> Adendei Titán / Pírica

*Notas:* 'Pírica' con tilde (verificado por vision). 'Pírica' resaltada visualmente en rojo (indica la energía que hace compatible el equipo).

### `[p11/b19]` Carta Draxes — Pasiva
_pos: card-draxes/text-box_

> Pasiva: Si 1 Adendei-Pírico Titán aliado es revelado, quema 1 carta en Zona Principal...

*Notas:* CORRECCIÓN CRÍTICA pass 2: Pass 1 escribió 'Si 1 Adendei-Pírico Titán es revelado' OMITIENDO la palabra 'aliado'. Verificado por vision + OCR: la palabra 'aliado' SÍ aparece. El resto de la Pasiva queda parcialmente tapado por la superposición con la carta Cascada de Lava; texto visible termina con '...quema 1 carta en Zona Principal'. Probable continuación: '...del rival' o similar, pero marcado como elipsis por legibilidad parcial.

### `[p11/b20]` Carta Draxes — Flavor text
_pos: card-draxes/flavor_

> No es un dragón, es más bien un carnotaurus con alas pterodáctilo que escupe fuego... Bueno, sí es algo así como un dragón...

*Notas:* Texto en cursiva debajo de la caja de efectos. Verbatim del OCR (verificado). CORRECCIÓN pass 2: Pass 1 omitió este flavor text completamente.

### `[p11/b21]` Carta Cascada de Lava — Nombre
_pos: card-cascada-lava/title-banner_

> Cascada de Lava

*Notas:* Banner superior carta equipo del par B.

### `[p11/b22]` Carta Cascada de Lava — Tipo
_pos: card-cascada-lava/middle-banner_

> Rot

*Notas:* Subtipo de equipo.

### `[p11/b23]` Carta Cascada de Lava — Activa-Rápida
_pos: card-cascada-lava/text-box_

> Activa-Rápida: Si 1 Adendei-Pírico aliado es atacado, quema a 1 Adendei rival.

*Notas:* Verbatim por vision + OCR. Nótese el guión en 'Activa-Rápida' (diferente de 'Activa Rápida' en Protección Selectiva — preservado verbatim).

### `[p11/b24]` Carta Cascada de Lava — Costo/Restricción
_pos: card-cascada-lava/text-box_

> Costo: Esta carta sólo puede ser equipada a 1 Adendei-Pírico.

*Notas:* Verbatim por vision + OCR. 'sólo' con tilde (preservado). Línea resaltada en rojo.

### `[p11/b25]` Carta Cascada de Lava — Flavor text
_pos: card-cascada-lava/flavor_

> Se trataba de un Rot con un núcleo hirviente que con sus saltos, convertía el magma en lava.

*Notas:* Texto en cursiva debajo de la caja de efectos. Verbatim del OCR (verificado). CORRECCIÓN pass 2: Pass 1 omitió este flavor text completamente.

### `[p11/b26]` Carta Jane — Nombre
_pos: card-jane/title-banner_

> Jane, Maniobra

*Notas:* Banner superior carta Protector del par C (centro-inferior).

### `[p11/b27]` Carta Jane — Tipo
_pos: card-jane/middle-banner_

> Protector

*Notas:* Tipo resaltado en rojo (indica el tipo compatible con el equipo Proliferación).

### `[p11/b28]` Carta Jane — Activa
_pos: card-jane/text-box_

> Activa: Cura toda la vida del Adendei vinculado. Si ese Adendei es enviado a Extinción, un aliado escala 1 pto. y cura 1 pto. a todas las cartas en tu Zona Principal.

*Notas:* Verbatim por OCR (consistente con reporte de árbitro).

### `[p11/b29]` Carta Proliferación — Nombre
_pos: card-proliferacion/title-banner_

> Proliferación

*Notas:* Banner superior carta equipo del par C.

### `[p11/b30]` Carta Proliferación — Tipo
_pos: card-proliferacion/middle-banner_

> Ixim

*Notas:* Subtipo de equipo.

### `[p11/b31]` Carta Proliferación — Pasiva
_pos: card-proliferacion/text-box_

> Pasiva: Si el Protector equipado es vinculado, se cura 2 ptos.

*Notas:* Verbatim por OCR.

### `[p11/b32]` Carta Proliferación — Restricción
_pos: card-proliferacion/restriction_

> Solo puedes equipar esta carta a un Protector.

*Notas:* Línea resaltada en rojo que define la compatibilidad del equipo. 'Solo' sin tilde (verbatim).

### `[p11/b33]` Carta Proliferación — Flavor/Lore
_pos: card-proliferacion/flavor_

> Lograr el vínculo con tu Adendei era tener también el dominio de algunos Ixim.

*Notas:* Texto en cursiva debajo de la caja de efectos. Verbatim del OCR (verificado, la vision alucinó variantes como 'abre bien también' — se prefiere OCR que es más fiel al texto pequeño).

### `[p11/b34]`
_pos: bottom-right-corner_

> 11

*Notas:* Número de página.

## Figuras

### `[p11/fig-01]` titulo-equipos-compatibles *(type: infographic)*
_bbox (%): x=4, y=2, w=35, h=5_  
**Legibilidad:** clear  

**Descripción:** Banner/título 'EQUIPOS COMPATIBLES' en píldora azul/cian con el estilo característico de encabezados del rulebook Kódem.

**Texto embebido:**
- `EQUIPOS COMPATIBLES`

**Relación con el texto:** Introduce el bloque b01.

### `[p11/fig-02]` ejemplo-compatible-personaje-zaykan *(type: illustration)*
_bbox (%): x=8, y=35, w=37, h=33_  
**Legibilidad:** needs_enhance — Algunas líneas de la Pasiva de Zaykan están parcialmente tapadas por la superposición con Protección Selectiva. El flavor text fue recuperado del OCR. El resto (restricción roja, Activa Rápida, Costo) se lee con alta confianza.  

**Descripción:** Par de cartas superpuestas que ejemplifican un equipo compatible con un personaje específico. La carta izquierda/principal es un Adendei encapuchado (figura con capucha, aspecto ermitaño, atmósfera mística/nocturna) y a su derecha/superpuesta una carta de equipo con ilustración de criatura reptil humanoide con armadura.

La carta Adendei se identifica como 'Zaykan, Retorno del Ermitaño', subtipo 'Adendei / Lítica'. Su Pasiva (parcialmente tapada por superposición) dice: 'Pasiva: Si esta carta es revelada, revela todas las cartas en Zona Principal. Ninguna Zona Principal puede estar boca abajo.' Debajo de la caja de efectos, en cursiva, aparece el flavor text: 'El portal se cerró tras de sí, el ojo abierto y su luz a la oscuridad.'

La carta de equipo se identifica como 'Protección Selectiva', subtipo 'Rot', con una Activa Rápida que permite negar un ataque a un Adendei aliado: 'Activa Rápida: Si un Adendei aliado es atacado, niega el ataque.' y Costo: 'La carta equipada se daña 1 pto. si niega el ataque. La carta equipada no podrá atacar, ni ser curada.' La última línea, resaltada en rojo, indica la restricción de compatibilidad: 'Solo puede ser equipada a un Adendei "Zaykan"'.

Los resaltados en rojo destacan el nombre de la compatibilidad ('Zaykan') en la carta Adendei y la cláusula de restricción en la carta equipo.

Este conjunto ilustra un 'equipo compatible con un personaje específico'.

**Texto embebido:**
- `Zaykan, Retorno del Ermitaño`
- `Adendei / Lítica`
- `Pasiva: Si esta carta es revelada, revela todas las cartas en Zona Principal. Ninguna Zona Principal puede estar boca abajo.`
- `El portal se cerró tras de sí, el ojo abierto y su luz a la oscuridad.`
- `Protección Selectiva`
- `Rot`
- `Activa Rápida: Si un Adendei aliado es atacado, niega el ataque.`
- `Costo: La carta equipada se daña 1 pto. si niega el ataque. La carta equipada no podrá atacar, ni ser curada.`
- `Solo puede ser equipada a un Adendei "Zaykan"`

**Relación con el texto:** Ejemplo referenciado por el pie b04 'Ejemplo de equipo compatible con un personaje específico'.

### `[p11/fig-03]` ejemplo-compatible-energia-draxes *(type: illustration)*
_bbox (%): x=50, y=35, w=42, h=33_  
**Legibilidad:** needs_enhance — CORRECCIÓN CRÍTICA pass 2: Pasiva de Draxes incluye 'aliado' (pass 1 omitió la palabra). Los dos flavor texts (Draxes y Cascada de Lava) fueron recuperados del OCR — pass 1 los omitió completamente. 'Pírica'/'Pírico' con tilde en todas las ocurrencias (verificado por vision).  

**Descripción:** Par de cartas superpuestas que ejemplifican un equipo compatible con una energía específica. La carta izquierda/principal muestra un dragón/carnotauro de tonos rojos intensos y la carta derecha/superpuesta muestra una escena de cascada de lava fluyendo.

La carta Adendei es 'Draxes, Instinto Draconiano', subtipo 'Adendei Titán / Pírica' (con 'Pírica' destacado en rojo). Su Pasiva: 'Pasiva: Si 1 Adendei-Pírico Titán aliado es revelado, quema 1 carta en Zona Principal...' (el resto de la Pasiva queda parcialmente tapado por la superposición). Debajo aparece el flavor text en cursiva: 'No es un dragón, es más bien un carnotaurus con alas pterodáctilo que escupe fuego... Bueno, sí es algo así como un dragón...'

La carta de equipo es 'Cascada de Lava', subtipo 'Rot', con Activa-Rápida: 'Si 1 Adendei-Pírico aliado es atacado, quema a 1 Adendei rival.' y Costo con la restricción resaltada en rojo: 'Costo: Esta carta sólo puede ser equipada a 1 Adendei-Pírico.' Debajo aparece el flavor text en cursiva: 'Se trataba de un Rot con un núcleo hirviente que con sus saltos, convertía el magma en lava.'

Este conjunto ilustra un 'equipo compatible con una energía específica' (Pírica).

**Texto embebido:**
- `Draxes, Instinto Draconiano`
- `Adendei Titán / Pírica`
- `Pasiva: Si 1 Adendei-Pírico Titán aliado es revelado, quema 1 carta en Zona Principal...`
- `No es un dragón, es más bien un carnotaurus con alas pterodáctilo que escupe fuego... Bueno, sí es algo así como un dragón...`
- `Cascada de Lava`
- `Rot`
- `Activa-Rápida: Si 1 Adendei-Pírico aliado es atacado, quema a 1 Adendei rival.`
- `Costo: Esta carta sólo puede ser equipada a 1 Adendei-Pírico.`
- `Se trataba de un Rot con un núcleo hirviente que con sus saltos, convertía el magma en lava.`

**Relación con el texto:** Ejemplo referenciado por el pie b05 'Ejemplo de equipo compatible con una energía específica'.

### `[p11/fig-04]` ejemplo-compatible-tipo-carta-jane-proliferacion *(type: illustration)*
_bbox (%): x=28, y=68, w=42, h=24_  
**Legibilidad:** needs_enhance — Texto de habilidades parcialmente pequeño; elementos resaltados en rojo (restricciones de compatibilidad y tipo 'Protector') se leen con alta confianza. Flavor text recuperado del OCR.  

**Descripción:** Par de cartas superpuestas que ejemplifican un equipo compatible con un tipo de carta específico. La carta izquierda/principal muestra a una mujer con cabello sobre una motocicleta roja en actitud dinámica; la carta derecha/superpuesta muestra a una mujer de cabello oscuro rodeada de vegetación densa.

La carta izquierda es 'Jane, Maniobra', subtipo 'Protector' (destacado en rojo). Su Activa: 'Cura toda la vida del Adendei vinculado. Si ese Adendei es enviado a Extinción, un aliado escala 1 pto. y cura 1 pto. a todas las cartas en tu Zona Principal.'

La carta derecha es 'Proliferación', subtipo 'Ixim', con Pasiva: 'Si el Protector equipado es vinculado, se cura 2 ptos.' y restricción resaltada en rojo: 'Solo puedes equipar esta carta a un Protector.' Debajo aparece el flavor text en cursiva: 'Lograr el vínculo con tu Adendei era tener también el dominio de algunos Ixim.'

Este conjunto ilustra un 'equipo compatible con un tipo de carta específico' (tipo Protector).

**Texto embebido:**
- `Jane, Maniobra`
- `Protector`
- `Activa: Cura toda la vida del Adendei vinculado. Si ese Adendei es enviado a Extinción, un aliado escala 1 pto. y cura 1 pto. a todas las cartas en tu Zona Principal.`
- `Proliferación`
- `Ixim`
- `Pasiva: Si el Protector equipado es vinculado, se cura 2 ptos.`
- `Solo puedes equipar esta carta a un Protector.`
- `Lograr el vínculo con tu Adendei era tener también el dominio de algunos Ixim.`

**Relación con el texto:** Ejemplo referenciado por el pie b06 'Ejemplo de equipo compatible con un tipo de carta específico'.

### `[p11/fig-05]` titulo-equipos-multiples *(type: infographic)*
_bbox (%): x=4, y=86, w=32, h=5_  
**Legibilidad:** clear  

**Descripción:** Banner/título 'EQUIPOS MÚLTIPLES' en píldora azul/cian, estilo consistente con los encabezados del rulebook.

**Texto embebido:**
- `EQUIPOS MÚLTIPLES`

**Relación con el texto:** Introduce el bloque b07.

### `[p11/fig-06]` numero-de-pagina-11 *(type: icon)*
_bbox (%): x=95, y=97, w=4, h=3_  
**Legibilidad:** clear  

**Descripción:** Folio de paginación. Caja azul con número '11' en blanco en la esquina inferior derecha.

**Texto embebido:**
- `11`

**Relación con el texto:** Número de página.

## Notas de página

Página continúa §3.4 con reglas de compatibilidad (armaduras/equipos únicos) y equipos múltiples. Presenta tres pares de cartas como ejemplos de compatibilidad: por personaje (Zaykan + Protección Selectiva), por energía (Draxes + Cascada de Lava), por tipo de carta (Jane + Proliferación). Las restricciones están resaltadas en rojo sobre las cartas.

PASS 2 NOTES: (1) CRÍTICO — Pasiva de Draxes (b19, fig-03) corregida para incluir 'aliado': 'Adendei-Pírico Titán aliado es revelado' (pass 1 omitió la palabra). (2) Se agregaron flavor texts que pass 1 había omitido: Zaykan 'El portal se cerró tras de sí, el ojo abierto y su luz a la oscuridad.' (b11), Draxes 'No es un dragón, es más bien un carnotaurus con alas pterodáctilo que escupe fuego... Bueno, sí es algo así como un dragón...' (b20), Cascada de Lava 'Se trataba de un Rot con un núcleo hirviente que con sus saltos, convertía el magma en lava.' (b25), Proliferación 'Lograr el vínculo con tu Adendei era tener también el dominio de algunos Ixim.' (b33). (3) Se agregaron bloques separados b08-b33 para cada texto impreso en las 6 cartas ejemplo (nombres, tipos/subtipos, habilidades, costos, restricciones, flavor). (4) Variabilidad 'sólo/solo' con/sin tilde preservada verbatim (párrafo intro usa 'sólo', bullet 1 usa 'solo', restricciones de cartas usan 'Solo'/'sólo' según cómo están impresas).


---

<a id="pagina-12"></a>

# Página 12 — 3.5 BIO

**Verdict:** `both_agree` · **Recomendación:** `accept` · **Confianza:** 0.9 · **Acuerdo LLM↔OCR:** 0.95

**Sección(es):** §3.4, §3.5

## Bloques de texto

### `[p12/b01]`
_pos: top_

> Esto no aplicará si dicha situación se produjo por un cambio de cartas entre la Zona Principal rival y la del jugador; en este caso se enviará uno de esos equipos a Zona de Equipos y se podrá declarar el efecto del otro si se desea.

*Notas:* Continuación del texto de Equipos Múltiples de la página anterior. Texto asociado a dos diagramas/ilustraciones: EXTINCIÓN (✗) y EQUIPO (✓).

### `[p12/b02]`
_pos: middle-top_

> • El jugador que tenga una carta equipada con 2 Ixim o 2 Rot no podrá revelar por decisión propia el segundo equipo si uno de ellos ya se encuentra revelado a menos que un efecto permita tener Ixim o Rot adicionales en una misma carta.

*Notas:* Bullet con regla. '2 Ixim', '2 Rot', 'Ixim', 'Rot' en negrita.

### `[p12/b03]`
_pos: middle_

> Si una carta fue equipada con 2 Ixim o 2 Rot no se podrá declarar el efecto de ambos equipos en un mismo turno (aún si estas cartas se encuentran ocultas).

*Notas:* '2 Ixim', '2 Rot', 'ocultas' en énfasis/negrita.

### `[p12/b04]` 3.5 BIO
_pos: middle-left_

> 3.5 BIO

*Notas:* Título de subsección en píldora azul con icono.

### `[p12/b05]` Nombre del Bio
_pos: middle-left_

> Nombre del Bio

*Notas:* Callout morado apuntando al banner de nombre de la carta Bio de la izquierda (Askame Reino de Vida).

### `[p12/b06]` Nombre
_pos: middle-center_

> Nombre: En la mayoría de los casos, las cartas Bio no tienen nombre propio, por lo que sólo se considera el nombre de la carta. Existen algunas excepciones.

*Notas:* Callout morado. 'Bio', 'nombre de la carta' en negrita.

### `[p12/b07]` Nombre de la carta
_pos: middle-right_

> Nombre de la carta

*Notas:* Callout morado apuntando al banner de nombre de la carta Bio de la derecha (Laberinto de Arrecife).

### `[p12/b08]` Efecto
_pos: middle-center_

> Efecto: Estos efectos son Pasivas. Al ser lugares de poder sus ventajas o desventajas se aplicarán muchas veces a las cartas de ambos jugadores, siempre que no se especifique si su efecto afecta a "cartas rivales" o "cartas aliadas".

*Notas:* Callout. 'Pasivas', 'ventajas o desventajas', 'cartas de ambos jugadores' en negrita.

### `[p12/b09]` Costo
_pos: middle-center_

> Costo: Algunos Bio requieren pagar un costo para poder usar su efecto.

*Notas:* Callout. 'Bio' en negrita.

### `[p12/b10]` USO DEL BIO
_pos: bottom_

> (Ver 5. Fases de Turno)
> • La carta Bio se coloca oculta (boca abajo) en la Zona de Bio al iniciar la partida.
> • Podrás revelar tu Bio durante la Fase Previa (Opcional).
> • Podrás enviar tu Bio a Extinción una vez por turno durante la Fase Previa (Opcional).
> • Si tu Bio es enviado a Extinción por cualquier motivo puedes actualizar 1 descanso de todas tus cartas.
> . Una carta de Bio que está boca abajo se considera simplemente una carta, no un Bio. Por lo tanto, los efectos que se refieran a un Bio no podrán aplicarse a esa carta si se encuentra en esa posición.

*Notas:* Título en píldora azul. 'Bio', 'oculta', 'boca abajo', 'Zona de Bio', 'Fase Previa', 'Extinción', '1 descanso' en negrita. Referencia a sección 5. Último bullet usa '.' en lugar de '•' (posible error tipográfico del rulebook).

## Figuras

### `[p12/fig-01]` diagrama-extincion-caso-negativo *(type: infographic)*
_bbox (%): x=3, y=3, w=95, h=24_  
**Legibilidad:** clear — Textos pequeños de las cartas dentro del diagrama son difíciles de leer a resolución reducida, pero los elementos de interpretación (EXTINCIÓN, ✗) son claros.  

**Descripción:** Diagrama explicativo horizontal de tres paneles que ilustra un caso NO válido (resultado: uno va a EXTINCIÓN) dentro del contexto de Equipos Múltiples. A la derecha aparece un gran rótulo 'EXTINCIÓN' sobre fondo rojo/naranja flamígero, con un símbolo '✗' rojo en la esquina superior derecha que marca claramente este escenario como no permitido por decisión propia.

Panel izquierdo (bbox interno aprox 4-32%): Muestra una Zona Principal con una carta Adendei revelada (Draxes, Instinto Draconiano - dragón rojo) y dos cartas boca abajo (con el reverso del juego que muestra el logotipo 'KODEM TCG'), representando cartas ocultas en la zona del jugador.

Panel central (bbox interno aprox 32-60%): Muestra la carta Draxes con dos cartas de equipo superpuestas/equipadas: 'Cascada de Lava' (escena de lava cayendo) y otra carta con imagen de dragón/escamas rojas ('Escamas de Lava'), ambas debajo del Adendei como equipos.

Panel derecho (bbox interno aprox 60-95%): Fondo rojo/naranja flamígero con la palabra 'EXTINCIÓN' en grande, con una carta de equipo saliendo/siendo expulsada y la cruz roja ✗ marcando el resultado como caso negativo (va a Extinción forzosamente porque los dos Rot fueron revelados sin efecto habilitante).

**Texto embebido:**
- `EXTINCIÓN`
- `✗`
- `Draxes, Instinto Draconiano`
- `Cascada de Lava`
- `Escamas de Lava`
- `KODEM TCG`

**Relación con el texto:** Ilustra visualmente la regla del bloque b01: cuando no hay efecto que lo permita, uno de los dos equipos revelados va a Extinción y no se puede declarar efecto. Contrasta con fig-02 que muestra el caso válido.

### `[p12/fig-02]` diagrama-equipo-caso-positivo *(type: infographic)*
_bbox (%): x=3, y=28, w=95, h=22_  
**Legibilidad:** clear — Textos pequeños de las cartas son difíciles de leer a resolución reducida, pero los elementos de interpretación (EQUIPO, ✓) son claros.  

**Descripción:** Diagrama explicativo horizontal de tres paneles que ilustra el caso VÁLIDO/alternativo por cambio de cartas entre Zona Principal rival y del jugador. A la derecha aparece un rótulo 'EQUIPO' sobre fondo rojo con un símbolo '✓' verde en la esquina superior derecha que marca este escenario como permitido (va a Zona de Equipos, no a Extinción).

Panel izquierdo: misma configuración que fig-01: carta Draxes revelada junto a cartas boca abajo con logo KODEM.

Panel central: misma imagen de las cartas 'Cascada de Lava' y 'Escamas de Lava' equipadas sobre Draxes.

Panel derecho: Fondo rojo con la palabra 'EQUIPO', una carta (escamas de lava) siendo movida a zona de equipos, y el check verde ✓ marcando el resultado como caso positivo (en lugar de Extinción, se envía a Zona de Equipos y se puede declarar el efecto del otro si se desea).

**Texto embebido:**
- `EQUIPO`
- `✓`
- `Draxes, Instinto Draconiano`
- `Cascada de Lava`
- `Escamas de Lava`
- `KODEM TCG`

**Relación con el texto:** Ilustra visualmente la excepción del bloque b01: cuando la situación se produjo por un cambio de cartas entre Zonas Principales rivales, uno de los equipos va a Zona de Equipos (no a Extinción) y se puede declarar el efecto del otro.

### `[p12/fig-03]` encabezado-3-5-bio *(type: infographic)*
_bbox (%): x=4, y=62, w=25, h=6_  
**Legibilidad:** clear  

**Descripción:** Encabezado de subsección con formato de píldora azul/cian que contiene '3.5 BIO'. Incluye un pequeño icono (forma triangular/pirámide azul) que simboliza el concepto de 'Bio' (lugar de poder/terreno).

**Texto embebido:**
- `3.5`
- `BIO`

**Relación con el texto:** Marca inicio de la subsección 3.5 sobre cartas Bio.

### `[p12/fig-04]` carta-ejemplo-bio-askame *(type: illustration)*
_bbox (%): x=4, y=72, w=30, h=23_  
**Legibilidad:** clear  

**Descripción:** Carta Bio de ejemplo 'Askame, Reino de Vida' (caso con nombre propio). Ilustración de un paisaje natural verde con montañas, vegetación exuberante y cielo despejado, evocando un lugar de poder vital/fértil.

La carta muestra layout de Bio: banner superior con nombre, arte paisajístico central, caja de texto inferior con subtipo 'Bio' y habilidad Pasiva. Incluye texto de lore al final.

Pasiva visible: 'Ninguna carta en el campo puede recibir 5 o más ptos. de daño por ataque o efecto en un solo turno.' Lore: 'En estas tierras florece la vida eterna; el corazón del mundo.'

Etiqueta morada (callout) apunta al banner de nombre con el texto 'Nombre del Bio', demostrando la excepción en la que un Bio sí tiene nombre propio ('Askame').

**Texto embebido:**
- `Askame Reino de Vida`
- `Bio`
- `Pasiva: Ninguna carta en el campo puede recibir 5 o más ptos. de daño por ataque o efecto en un solo turno.`
- `En estas tierras florece la vida eterna; el corazón del mundo.`

**Relación con el texto:** Ejemplo anatómico para los bloques b05, b06, b08 y b09. Ejemplifica que algunos Bio tienen nombre propio.

### `[p12/fig-05]` carta-ejemplo-bio-laberinto-arrecife *(type: illustration)*
_bbox (%): x=62, y=72, w=33, h=23_  
**Legibilidad:** clear  

**Descripción:** Carta Bio de ejemplo 'Laberinto de Arrecife' (caso con nombre de carta estándar, sin nombre propio de personaje). Ilustración de un arrecife coralino submarino multicolor con tonos rosa, verde y azul que crean un ambiente marino vibrante y complejo como un laberinto bajo el agua.

La carta muestra layout de Bio: banner superior con el nombre de la carta, arte central del arrecife, caja de texto con subtipo 'Bio' y habilidad Pasiva + Costo.

Pasiva visible: 'Los Adendei no-Abisales, no podrán escoger la carta que atacarán.' Costo: 'Si no tienes ningún Adendei Abisal en tu Zona Principal, envía esta carta a Extinción.'

Etiqueta morada (callout) apunta al banner de nombre con el texto 'Nombre de la carta', demostrando el caso típico donde la Bio no tiene nombre de personaje.

**Texto embebido:**
- `Laberinto de Arrecife`
- `Bio`
- `Pasiva: Los Adendei no-Abisales, no podrán escoger la carta que atacarán.`
- `Costo: Si no tienes ningún Adendei Abisal en tu Zona Principal, envía esta carta a Extinción.`

**Relación con el texto:** Ejemplo anatómico complementario de fig-04. Apoya b07 y b09 mostrando un Bio con Costo.

### `[p12/fig-06]` callouts-anatomicos-bio *(type: infographic)*
_bbox (%): x=36, y=70, w=28, h=25_  
**Legibilidad:** clear  

**Descripción:** Conjunto de callouts/cuadros explicativos morados centrales que conectan las dos cartas Bio (fig-04 y fig-05) con las explicaciones anatómicas compartidas. Incluye los callouts para 'Nombre' (caso con nombre propio vs. caso sin nombre), 'Efecto' y 'Costo' en forma de cuadros de texto con bordes redondeados.

Las líneas de conexión (delgadas, estilo morado) se extienden hacia ambas cartas laterales para indicar qué campo específico está siendo descrito por cada callout.

**Texto embebido:**
- `Nombre del Bio`
- `Nombre`
- `Nombre de la carta`
- `Efecto`
- `Costo`

**Relación con el texto:** Conectan los bloques b05-b09 con las cartas fig-04 y fig-05.

### `[p12/fig-07]` titulo-uso-del-bio *(type: infographic)*
_bbox (%): x=4, y=96, w=20, h=3_  
**Legibilidad:** clear  

**Descripción:** Banner/título 'USO DEL BIO' en píldora azul/cian con bordes redondeados, estilo consistente con los subtítulos de reglas del rulebook.

**Texto embebido:**
- `USO DEL BIO`

**Relación con el texto:** Introduce el bloque b10 con las reglas de uso.

### `[p12/fig-08]` numero-de-pagina-12 *(type: icon)*
_bbox (%): x=95, y=97, w=4, h=3_  
**Legibilidad:** clear  

**Descripción:** Folio de paginación. Caja azul con el número '12' en blanco en la esquina inferior derecha.

**Texto embebido:**
- `12`

**Relación con el texto:** Número de página.

## Notas de página

Página de transición: cierra §3.4 Equipos (con un contraste visual EXTINCIÓN ✗ vs EQUIPO ✓ sobre el mismo escenario de Draxes + Cascada de Lava + Escamas de Lava) y abre §3.5 BIO con dos cartas anatómicas (Askame Reino de Vida con nombre propio, Laberinto de Arrecife sin nombre propio) y bloque de USO DEL BIO con 4 bullets + nota sobre bios boca abajo. Nota: el último bullet usa un punto '.' en lugar de '•' en el original transcrito.

### ⚡ Rulings aplicables a esta página (ver `rulings-v5.1.md`)

- **D19** (revisada 2026-04-22) — La mecánica *"Si tu Bio es enviado a Extinción, puedes actualizar 1 descanso de todas tus cartas"* (bullet en p12) es una vía de escape crítica cuando un jugador está en **parálisis de facto** (todas sus cartas en descanso). Ver D19 en rulings: un jugador paralizado NO está obligado a pasar turno — puede mandar su Bio a Extinción + usar pasivas + usar Activas de Equipos.

---

<a id="pagina-13"></a>

# Página 13 — 3.6 Token

**Verdict:** `both_agree` · **Recomendación:** `accept` · **Confianza:** 0.92 · **Acuerdo LLM↔OCR:** 0.96

**Sección(es):** §3.6

## Bloques de texto

### `[p13/b01]` 3.6 Token
_pos: top-left_

> 3.6 Token

*Notas:* Section header badge, teal/cyan rounded rectangle with '3.6' in darker teal circle and 'TOKEN' in bold white uppercase.

### `[p13/b02]`
_pos: top_

> Algunas cartas tienen la capacidad de invocar criaturas o seres, como *Token*, a la Zona Principal durante el juego. Estos *Token* representan cartas que no están en tu Mazo Principal, como animales u otro tipo de criaturas.

*Notas:* Intro paragraph below the section header.

### `[p13/b03]` Características
_pos: middle-left_

> Características

*Notas:* Subsection header.

### `[p13/b04]`
_pos: middle-left_

> Las características de los *Token* son definidas por el efecto de la carta que los invoca; a diferencia de otras cartas, sus estadísticas pueden variar.
> **Si el efecto invocador no especifica lo contrario**, un **Token** tiene las siguientes **estadísticas**:

*Notas:* Introductory paragraph to the stat list.

### `[p13/b05]`
_pos: middle-left_

> •Vida Máxima: **6** puntos
> •**Efecto:** Sin efecto
> •**Costo:** Sin costo

*Notas:* Bullet list inside purple-bordered stats box (left column, upper).

### `[p13/b06]`
_pos: middle-left_

> • **Daño: 0**
> • **Descanso: 0**
> • **Energía:** Sin Energía.
> • **Subtipo:** Sin subtipo.

*Notas:* Bullet list inside orange-bordered stats box (left column, lower).

### `[p13/b07]`
_pos: middle-right_

> *Nombre del Token:* No se refiere al nombre de la carta o del personaje.
> En este caso el nombre *"Token"* sólo indica el tipo de carta.

*Notas:* Purple annotation callout box pointing to the card's name bar.

### `[p13/b08]` Uso del Token
_pos: middle-left_

> Uso del Token

*Notas:* Subsection header badge (white rounded rectangle with teal border).

### `[p13/b09]`
_pos: middle_

> Las cartas *Token* funcionan de forma similar a los *Adendei*; pueden atacar en *Batalla* y si lo hacen, descansan al final del turno. En tu partida, cuando una carta abandone el campo puede colocarse un *Token* en su lugar si el efecto de una carta en juego lo especifica.

*Notas:* First paragraph of 'Uso del Token' section.

### `[p13/b10]`
_pos: middle_

> Si la *vida* de un *Token* se reduce a **0** irá a *Extinción*, también puede ir a *Extinción* por *efectos* de otras cartas pero posteriormente saldrá del juego y en **ningún momento contará** como carta en *Extinción* para la **condición de victoria**.

*Notas:* Second paragraph of 'Uso del Token'.

### `[p13/b11]` Generalidades
_pos: bottom-left_

> Generalidades

*Notas:* Subsection header badge.

### `[p13/b12]`
_pos: bottom_

> · Los *Token* son también considerados cartas (al igual que los *Protectores* y cartas boca abajo).
> · **No** tienen una Zona dentro del campo antes de entrar en juego.
> · **No** pueden ser *ocultados* ni pueden ingresar al juego *ocultos*.
> - Cada jugador puede tener un **máximo** de **2 cartas** Token en su campo.

*Notas:* Bullet list under 'Generalidades'.

### `[p13/b13]`
_pos: bottom-right_

> 13

*Notas:* Page number in dark rounded badge.

## Figuras

### `[p13/fig-01]` section-header-badge-token *(type: icon)*
_bbox (%): x=3, y=1, w=22, h=4_  
**Legibilidad:** clear — High contrast white text on cyan background.  

**Descripción:** Teal/cyan rounded rectangle section-header badge located at the top-left corner of the page. The badge is divided in two visual regions: on the left, a darker teal circular disc contains the section number '3.6' rendered in white bold numerals; on the right, the word 'TOKEN' is set in bold white uppercase letters on the cyan field. The overall palette uses two tones of teal that match the rulebook's section-header system. The badge has soft rounded corners and no drop-shadow.

The badge is functional and decorative simultaneously: it serves as the visual anchor for the Token subsection (§3.6) while introducing the chapter's teal color accent. Its compact size keeps the top-left margin clean and lets the intro paragraph run at full width beneath it.

**Texto embebido:**
- `3.6`
- `TOKEN`

**Relación con el texto:** Opens the §3.6 Token subsection and sets the color accent for the whole page.

### `[p13/fig-02]` token-card-dinosaur-hydra *(type: illustration)*
_bbox (%): x=27, y=22, w=46, h=42_  
**Legibilidad:** clear — Main illustration and name bar are fully legible; bottom credits text (TCOO-013S / colmillo_azul_studio / Kódem TCG ©) is small but readable.  

**Descripción:** A full Kódem TCG card illustration occupies the central zone of the page. The card depicts a multi-headed green scaled dinosaur-like or hydra-like creature with several open-mouthed necks emerging from a volcanic landscape. The background shows red-orange lava flows, dark rocks, glowing embers and a smoky sky, producing a high-contrast scene dominated by emerald greens, oranges and reds.

The card itself follows standard Kódem TCG card anatomy: a name bar along the top reads 'Token', the central art panel contains the creature illustration framed by a warm beige/tan border, and there is a bottom bar with small card-credits text. Because the bottom stats area is intentionally minimal, this card is used as the canonical example of the default Token card (no effect, no cost, no energy, no subtype).

The card works as the visual anchor that the surrounding annotation boxes and callouts reference: the purple 'Nombre del Token' callout points to the name bar, and the left-column stats boxes correspond to the stats block that would normally appear on the card's frame.

**Texto embebido:**
- `Token`
- `TCOO-013S`
- `colmillo_azul_studio`
- `Kódem TCG ©`

**Relación con el texto:** Primary example of a default Token card, referenced by every callout on the page.

### `[p13/fig-03]` callout-nombre-del-token *(type: infographic)*
_bbox (%): x=62, y=26, w=35, h=14_  
**Legibilidad:** clear — Text is sharp; pointer line clearly visible.  

**Descripción:** A light purple/lavender rectangular annotation box sits to the upper-right of the card illustration. A thin pointer/leader line connects the box to the card's 'Token' name bar, explicitly tying the note to the card-name field. The box uses a soft lavender fill with rounded corners and black body copy.

Its content clarifies a common misconception for new players: the word 'Token' shown on the card is a card-type label, not the name of the depicted creature. The callout therefore couples visual pointer + explanatory text to make the rules distinction concrete.

**Texto embebido:**
- `*Nombre del Token:* No se refiere al nombre de la carta o del personaje.`
- `En este caso el nombre *"Token"* sólo indica el tipo de carta.`

**Relación con el texto:** Supports the 'Características' section by anchoring the 'sin nombre propio' concept to the example card.

### `[p13/fig-04]` stats-box-purple-vida-efecto-costo *(type: infographic)*
_bbox (%): x=3, y=37, w=28, h=12_  
**Legibilidad:** clear — All three bullets fully legible.  

**Descripción:** A purple-bordered rounded rectangle on the left column containing a bulleted list of three default Token statistics. The box uses a white interior with purple outline, and the bullets are rendered as small dots. Labels are set in bold, values follow in regular weight.

This is one of two paired stat-boxes (purple + orange) that together present the complete default statline of a Token. The purple/orange pairing color-codes the stats into two groups, mirroring the rulebook's broader stat-color convention.

**Texto embebido:**
- `•Vida Máxima: 6 puntos`
- `•Efecto: Sin efecto`
- `•Costo: Sin costo`

**Relación con el texto:** Provides the upper half of the default Token stat list referenced in 'Características'.

### `[p13/fig-05]` stats-box-orange-dano-descanso-energia-subtipo *(type: infographic)*
_bbox (%): x=3, y=50, w=28, h=14_  
**Legibilidad:** clear — All four bullets fully legible.  

**Descripción:** An orange-bordered rounded rectangle on the left column directly below the purple stats box. It follows the same visual grammar: white interior, colored outline, bulleted list with bold labels and regular-weight values. The orange accent differentiates it from the purple box above.

Together with fig-04, this box completes the default Token stat block. The ordering (Daño → Descanso → Energía → Subtipo) mirrors the stat order used elsewhere in the rulebook for Adendei and Equipment cards.

**Texto embebido:**
- `• Daño: 0`
- `• Descanso: 0`
- `• Energía: Sin Energía.`
- `• Subtipo: Sin subtipo.`

**Relación con el texto:** Completes the default Token stat list referenced in 'Características'.

### `[p13/fig-06]` subsection-badge-uso-del-token *(type: icon)*
_bbox (%): x=3, y=68, w=25, h=3_  
**Legibilidad:** clear  

**Descripción:** A white rounded-rectangle badge outlined in teal containing bold dark-teal uppercase text. Matches the styling of the 'Generalidades' badge below, establishing a consistent visual rhythm for subsection dividers on this page.

**Texto embebido:**
- `USO DEL TOKEN`

**Relación con el texto:** Marks the start of the 'Uso del Token' rules block.

### `[p13/fig-07]` token-cards-fan-decoration *(type: illustration)*
_bbox (%): x=62, y=68, w=36, h=28_  
**Legibilidad:** needs_enhance — Card name bars are visible but internal card text, credits and folios are too small to read reliably.  

**Descripción:** Three overlapping Token cards fanned out decoratively on the right side of the page. The fan shows partial card faces rather than full cards: one card shows a teal/turquoise desert scene with multiple small creatures, another shows a pink/salmon crocodilian creature in a blue water environment, and a third peeks from behind.

Each visible card carries the 'Token' card-name bar along its top and the beige/tan Kódem card frame. Because the cards are overlapped at an angle, only fragments of their art and borders are visible, giving the impression of a small collection of diverse Tokens that a player could have in play.

The fan has no textual callout lines and functions primarily as visual flavor reinforcing the idea that Tokens can take many creature forms.

**Texto embebido:**
- `Token`

**Relación con el texto:** Illustrates the 'Uso del Token' rules by showing that Token cards come in different creature designs.

### `[p13/fig-08]` subsection-badge-generalidades *(type: icon)*
_bbox (%): x=3, y=87, w=25, h=3_  
**Legibilidad:** clear  

**Descripción:** White rounded-rectangle badge with teal outline and bold dark uppercase text, identical in style to the 'Uso del Token' badge. Serves as the divider for the final subsection of the page.

**Texto embebido:**
- `GENERALIDADES`

**Relación con el texto:** Marks the 'Generalidades' bullet list that closes the §3.6 Token section.

### `[p13/fig-09]` page-number-13 *(type: icon)*
_bbox (%): x=93, y=95, w=5, h=4_  
**Legibilidad:** clear  

**Descripción:** Small dark navy/teal rounded rectangle in the bottom-right corner containing the page number '13' in bold white. Matches the pagination style used across the rulebook.

**Texto embebido:**
- `13`

**Relación con el texto:** Page number indicator.

## Notas de página

Full page describes §3.6 Token: what Tokens represent, their default statline (Vida 6, Daño 0, Descanso 0, sin efecto/costo/energía/subtipo), rules for usage (similar to Adendei, attacks use descanso, removed from game and NOT counted toward Extinción victory condition), and generalities (max 2 Tokens per player, counted as cards, cannot be hidden). Layout follows a stats-on-left / example-card-center / callouts-on-right pattern with subsection badges marking the three blocks.


---

<a id="pagina-14"></a>

# Página 14 — 3.7 Espectros

> 🧪 **Spot-check Ramsés (pass 3)** — Revisada y anotada por humano.

**Notas de spot-check (humanas):**

- Confirmado 'Morféica' con acento (LLM correcto).

**Verdict:** `both_agree` · **Recomendación:** `spot_check_human` · **Confianza:** 0.9 · **Acuerdo LLM↔OCR:** 0.95

**Sección(es):** §3.7

## Bloques de texto

### `[p14/b01]` 3.7 Espectros
_pos: top-left_

> 3.7 ESPECTROS

*Notas:* Section header badge with ghost icon to its right.

### `[p14/b02]`
_pos: top_

> Algunas criaturas en el universo de Kódem TCG logran manifestarse a través de diferentes *Esferas*, una de ellas es la forma espectral que se encuentra ligada a la *Esfera Morféica*. Las cartas *Espectro* funcionarán como dobles espectrales de personajes en el campo, poseyendo cartas para jugar con sus atributos.

*Notas:* Intro paragraph below the section header.

### `[p14/b03]`
_pos: middle-left_

> *Vida Máxima:* Son los puntos máximos de vida que puede tener una carta. Al llegar a **0**, la carta se enviará a Extinción. La vida máxima de una carta se considera una **estadística**. El valor de vida de una carta en un momento dado durante el juego NO se considera una **estadística**.

*Notas:* Orange annotation callout box (top-left) tied to card anatomy.

### `[p14/b04]`
_pos: middle-left_

> **Requisito:** Condición que se necesita cumplir para colocar al Espectro en el campo.

*Notas:* Purple annotation callout box (left column, middle) tied to card's requisito field.

### `[p14/b05]`
_pos: middle-left_

> **Efecto y Costo:** Se añadirá de forma obligatoria el de la carta poseída por el Espectro.

*Notas:* Purple annotation callout (continues with the box above).

### `[p14/b06]`
_pos: middle-left_

> *Folio:* Te ayuda a saber el número de carta dentro de la expasión.

*Notas:* Small annotation callout for the card's folio/number field. Note: 'expasión' printed as shown (typo for 'expansión').

### `[p14/b07]`
_pos: middle-left_

> *Créditos del Artista*

*Notas:* Small label pointing to artist credits line on the card.

### `[p14/b08]`
_pos: center_

> Nánuk, Garras Heladas
> Vida máx. 9 Espectro
> **Requisito: 2** o más *Adendei* "Nánuk" en tu Extinción.
> FYTE-052  ?  0   Kódem TCG ©
> cabritosentado   Ursus maritimus

*Notas:* Embedded text on the 'Nánuk, Garras Heladas' sample card. '?' and '0' are cost/damage glyphs rendered as small icons on the card footer.

### `[p14/b09]`
_pos: middle-right_

> **Daño:** Dependerá de la carta poseída.

*Notas:* Annotation callout on the right side for the Daño stat.

### `[p14/b10]`
_pos: middle-right_

> *Descanso:* 0

*Notas:* Annotation callout for Descanso stat.

### `[p14/b11]`
_pos: middle-right_

> *Nombre de la Carta:* El nombre de cada carta es lo que la distingue de las demás. En la mayoría de los casos comienza con el nombre del personaje, seguido del complemento del nombre de la carta. El nombre del personaje no se considera por sí mismo el nombre de la carta. Por ejemplo, en la carta *"Nánuk, Garras Heladas"*, el nombre del personaje es "Nánuk" y el nombre la carta es: *"Garras Heladas"*.

*Notas:* Large orange annotation callout box on the right column.

### `[p14/b12]`
_pos: middle-right_

> *Energía:* Sin energía

*Notas:* Small annotation box below 'Nombre de la Carta'.

### `[p14/b13]`
_pos: middle-right_

> *Subtipo:* Sin subtipo

*Notas:* Small annotation box, parallel to Energía.

### `[p14/b14]`
_pos: middle-right_

> *Nombre científico del animal, planta o mineral:* Los personajes de Kodem están inspirados en flora, fauna y minerales principalmente en peligro de extinción, en este apartado podrá conocer la base científica del personaje.

*Notas:* Annotation callout box for the scientific-name line on the card. Note: 'Kodem' printed without accent as shown.

### `[p14/b15]` Uso de los Espectros
_pos: middle_

> Uso de los Espectros

*Notas:* Subsection header (near the vertical midpoint of the page).

### `[p14/b16]`
_pos: middle_

> • Una carta *Espectro* solo podrá ser colocada en el campo si los Requisitos de cartas en Extinción marcadas en su texto se cumplen.
> • Las cartas *Espectro* deberán entrar reveladas al campo y no podrán ser ocultadas.
> • En tu Fase Previa, un *Espectro* puede poseer una (solo una) de las cartas mencionadas en su Requisito, enviando a un *Adendei* aliado en Zona Principal original a Extinción sin que esto se considere un costo.
> • El *Espectro* deberá usar su propio Efecto, así como el Efecto, Daño, Descanso, Costo y Energía de la carta Poseída como si fueran suyos. Sin embargo, no se considera que el efecto esté siendo copiado.
> • Las cartas *Espectro* no tienen un daño definido más que el de la carta que posean.
> • Si una carta *Espectro* no tiene poseída a una carta para causar daño, deberá pagar el doble de puntos de vida a las cartas aliadas en su Zona Principal original por cada punto de daño que intente infligir.
> • Las cartas *Espectro* **no** se pueden cambiar de jugador.
> • Si un *Espectro* es intercambiado por una carta fuera del campo que no sea un *Espectro*, la nueva carta tendrá los mismos puntos de vida que el *Espectro*, hasta un máximo de 6 puntos.

*Notas:* Bulleted rules list for 'Uso de los Espectros'.

### `[p14/b17]` Cartas Poseídas
_pos: bottom-left_

> Cartas Poseídas

*Notas:* Subsection header badge.

### `[p14/b18]`
_pos: bottom_

> Poseer significa colocar una carta de Extinción bajo una carta en el campo.
> Las carta poseída se colocará debajo del *Espectro* en Zona Principal.

*Notas:* Intro paragraph for 'Cartas Poseídas'. Note: 'Las carta' as printed (lacks 's' on 'carta'). Transcribed verbatim.

### `[p14/b19]`
_pos: bottom_

> • Las cartas que hayan sido poseídas se consideran de este tipo (poseídas) perdiendo su tipo y subtipo original mientras se encuentren sobre un Espectro.
> • Si un Espectro abandona el campo, su carta Poseída irá a Extinción.
> • La única zona donde pueden existir cartas poseídas es la Zona Principal.
> • Cuando una carta poseída es enviada a Extinción, regresa a su tipo y subtipo originales, por lo tanto, pueden disparan los efectos normales que requieran que *Adendei, Ixim, Rot,* etc. sean enviados a Extinción.

*Notas:* Bulleted rules for 'Cartas Poseídas'. 'pueden disparan' printed as shown (grammatical inconsistency in source).

### `[p14/b20]` Generalidades
_pos: bottom-left_

> Generalidades

*Notas:* Subsection header badge.

### `[p14/b21]`
_pos: bottom_

> • Se podrán incluir cualquier número de cartas Espectro en el Mazo, respetando un máximo de 24 cartas Adendei y Espectros en el Mazo Principal, aunque se recomienda llevar máximo 4.
> • Una carta Espectro tendrá la vida máxima marcada en su texto.

*Notas:* Bulleted 'Generalidades' rules.

### `[p14/b22]`
_pos: bottom-right_

> 14

*Notas:* Page number in dark rounded badge.

## Figuras

### `[p14/fig-01]` section-header-badge-espectros *(type: icon)*
_bbox (%): x=1, y=1, w=22, h=5_  
**Legibilidad:** clear  

**Descripción:** Teal rounded rectangle section-header badge at the top-left. Left side shows '3.7' in white bold, right side shows 'ESPECTROS' in bold dark uppercase. Matches the visual grammar of other §3 subsection headers.

**Texto embebido:**
- `3.7`
- `ESPECTROS`

**Relación con el texto:** Opens §3.7 Espectros.

### `[p14/fig-02]` ghost-icon-espectro *(type: icon)*
_bbox (%): x=23, y=1, w=5, h=5_  
**Legibilidad:** clear  

**Descripción:** Small stylized ghost/spirit creature icon in teal-blue tones positioned immediately to the right of the section-header badge. Its rounded body and wispy tail reinforce the 'spectral' theme of the subsection and serve as the thematic marker for §3.7.

**Relación con el texto:** Thematic decoration that emphasizes the 'Espectro' subject.

### `[p14/fig-03]` card-anatomy-espectro-nanuk *(type: illustration)*
_bbox (%): x=33, y=14, w=34, h=55_  
**Legibilidad:** clear — Main labels and art are clear; some very small icons in the card footer (damage/cost glyphs) rendered as '?' and '0' in the extraction.  

**Descripción:** Central card illustration used as the canonical anatomy example for Espectro cards. The card depicts 'Nánuk, Garras Heladas' — a glowing teal/green spectral wolf or bear-like creature made of swirling ethereal energy on a dark background. The card follows standard Kódem TCG layout: vida máxima indicator in the top-left, name bar across the upper area, central art panel with beige/tan border, requisito text block, and a footer row with folio code, damage icon, rest icon and credits.

Around the card, annotation callout boxes (orange and purple) fan outward with connector lines pointing at specific anatomy regions: vida máxima, nombre de la carta, requisito, efecto y costo, folio, créditos del artista, daño, descanso, energía, subtipo and nombre científico. The orange lines connect stats callouts, while purple lines connect mechanical callouts — a deliberate color-coded system to guide reading.

This is the most information-dense figure on the page: it doubles as a card-anatomy reference and as a living example of an Espectro with a concrete Requisito ('2 o más Adendei "Nánuk" en tu Extinción').

**Texto embebido:**
- `Nánuk, Garras Heladas`
- `Vida máx. 9`
- `Espectro`
- `Requisito: 2 o más Adendei "Nánuk" en tu Extinción.`
- `FYTE-052`
- `Kódem TCG ©`
- `cabritosentado`
- `Ursus maritimus`

**Relación con el texto:** Central reference that every surrounding callout annotates; supports the Espectro card-anatomy teaching layer of the page.

### `[p14/fig-04]` callout-vida-maxima *(type: infographic)*
_bbox (%): x=2, y=17, w=28, h=21_  
**Legibilidad:** clear  

**Descripción:** Orange-outlined rounded rectangle on the upper-left connected by an orange diagonal leader line to the card's top-left vida-máxima icon. White interior with justified black body copy. Labels 'Vida Máxima' in italic/bold and explains its mechanical status (a stat that triggers Extinción at 0 and is considered a stat for rule lookups).

**Texto embebido:**
- `Vida Máxima: Son los puntos máximos de vida que puede tener una carta. Al llegar a 0, la carta se enviará a Extinción. La vida máxima de una carta se considera una estadística. El valor de vida de una carta en un momento dado durante el juego NO se considera una estadística.`

**Relación con el texto:** Supports the card-anatomy explanation of vida máxima.

### `[p14/fig-05]` callout-requisito-efecto-costo *(type: infographic)*
_bbox (%): x=2, y=40, w=28, h=13_  
**Legibilidad:** clear  

**Descripción:** Purple-outlined rounded rectangle annotation box linked by a purple leader line to the requisito/efecto area of the card. Contains two labeled entries: 'Requisito' and 'Efecto y Costo', each in bold followed by one-line explanations.

**Texto embebido:**
- `Requisito: Condición que se necesita cumplir para colocar al Espectro en el campo.`
- `Efecto y Costo: Se añadirá de forma obligatoria el de la carta poseída por el Espectro.`

**Relación con el texto:** Teaches two interlocked Espectro-specific mechanics: the placement prerequisite and the fact that possession carries the victim's effect/cost.

### `[p14/fig-06]` callout-folio *(type: infographic)*
_bbox (%): x=2, y=55, w=28, h=6_  
**Legibilidad:** clear — Source typo 'expasión' transcribed verbatim.  

**Descripción:** Small rounded-rectangle callout pointing to the folio number on the card. White interior with a short italic/bold explanatory sentence.

**Texto embebido:**
- `Folio: Te ayuda a saber el número de carta dentro de la expasión.`

**Relación con el texto:** Explains the folio field on every card, using FYTE-052 on the example card.

### `[p14/fig-07]` callout-creditos-del-artista *(type: infographic)*
_bbox (%): x=2, y=62, w=28, h=5_  
**Legibilidad:** clear  

**Descripción:** Small callout label pointing to the artist credits row on the card's footer. Minimal content — just a labeled line.

**Texto embebido:**
- `Créditos del Artista`

**Relación con el texto:** Identifies the artist credit line (here 'cabritosentado').

### `[p14/fig-08]` callout-dano *(type: infographic)*
_bbox (%): x=68, y=16, w=28, h=6_  
**Legibilidad:** clear  

**Descripción:** Small annotation box in the right column referencing the Daño stat on the card. Bold label followed by a short sentence that makes the Espectro-specific rule explicit.

**Texto embebido:**
- `Daño: Dependerá de la carta poseída.`

**Relación con el texto:** Teaches that an Espectro's damage is inherited from the possessed card.

### `[p14/fig-09]` callout-descanso *(type: infographic)*
_bbox (%): x=68, y=23, w=28, h=5_  
**Legibilidad:** clear  

**Descripción:** Compact annotation near the upper-right of the card pointing at the Descanso indicator. Single-line content.

**Texto embebido:**
- `Descanso: 0`

**Relación con el texto:** States the base descanso for this example Espectro.

### `[p14/fig-10]` callout-nombre-de-la-carta *(type: infographic)*
_bbox (%): x=68, y=30, w=30, h=22_  
**Legibilidad:** clear  

**Descripción:** Large orange-outlined callout box on the right column. Contains the most text of any callout on the page: a multi-line explanation of how card names are constructed (personaje + complemento), using 'Nánuk, Garras Heladas' as a worked example where 'Nánuk' is the character and 'Garras Heladas' is the card name.

**Texto embebido:**
- `Nombre de la Carta: El nombre de cada carta es lo que la distingue de las demás. En la mayoría de los casos comienza con el nombre del personaje, seguido del complemento del nombre de la carta. El nombre del personaje no se considera por sí mismo el nombre de la carta. Por ejemplo, en la carta 'Nánuk, Garras Heladas', el nombre del personaje es 'Nánuk' y el nombre la carta es: 'Garras Heladas'.`

**Relación con el texto:** Clarifies the card-name convention used throughout the game.

### `[p14/fig-11]` callout-energia *(type: infographic)*
_bbox (%): x=68, y=53, w=28, h=5_  
**Legibilidad:** clear  

**Descripción:** Small orange-outlined box, italic/bold label followed by value. Compact inline design.

**Texto embebido:**
- `Energía: Sin energía`

**Relación con el texto:** States the base Energía of the example Espectro card.

### `[p14/fig-12]` callout-subtipo *(type: infographic)*
_bbox (%): x=68, y=59, w=28, h=5_  
**Legibilidad:** clear  

**Descripción:** Orange-outlined small callout parallel to Energía. Same visual style.

**Texto embebido:**
- `Subtipo: Sin subtipo`

**Relación con el texto:** States the base Subtipo of the example Espectro card.

### `[p14/fig-13]` callout-nombre-cientifico *(type: infographic)*
_bbox (%): x=68, y=64, w=30, h=9_  
**Legibilidad:** clear — Source uses 'Kodem' without accent; transcribed verbatim.  

**Descripción:** Callout at the lower-right that explains the scientific-name footer line of cards. References the broader design intention: Kódem characters are inspired by flora, fauna and minerals, often in danger of extinction, and the scientific name anchors each card to a real species.

**Texto embebido:**
- `Nombre científico del animal, planta o mineral: Los personajes de Kodem están inspirados en flora, fauna y minerales principalmente en peligro de extinción, en este apartado podrá conocer la base científica del personaje.`

**Relación con el texto:** Links the card footer (here 'Ursus maritimus' for Nánuk) to the ecological/educational angle of Kódem.

### `[p14/fig-14]` subsection-badge-uso-de-los-espectros *(type: icon)*
_bbox (%): x=2, y=72, w=28, h=3_  
**Legibilidad:** clear  

**Descripción:** White rounded-rectangle badge outlined in teal with bold dark uppercase text 'USO DE LOS ESPECTROS'. Matches the other subsection badges on this and other §3 pages.

**Texto embebido:**
- `USO DE LOS ESPECTROS`

**Relación con el texto:** Introduces the bulleted rules list on how Espectros are used in play.

### `[p14/fig-15]` subsection-badge-cartas-poseidas *(type: icon)*
_bbox (%): x=2, y=85, w=22, h=3_  
**Legibilidad:** clear  

**Descripción:** White rounded-rectangle badge with teal outline and bold dark uppercase text. Same visual style as the other subsection dividers.

**Texto embebido:**
- `CARTAS POSEÍDAS`

**Relación con el texto:** Marks the 'Cartas Poseídas' rules block.

### `[p14/fig-16]` subsection-badge-generalidades *(type: icon)*
_bbox (%): x=2, y=94, w=19, h=3_  
**Legibilidad:** clear  

**Descripción:** White rounded-rectangle badge with teal outline and bold dark uppercase text for 'GENERALIDADES'. Closing subsection divider of the page.

**Texto embebido:**
- `GENERALIDADES`

**Relación con el texto:** Marks the final Generalidades bullet list (deck-building limits, vida máxima).

### `[p14/fig-17]` annotation-connector-lines *(type: diagram)*
_bbox (%): x=30, y=15, w=40, h=55_  
**Legibilidad:** clear  

**Descripción:** A system of thin diagonal leader lines that connect each annotation box to the corresponding region of the Nánuk card. Orange lines tie the 'stat' callouts (Vida Máxima, Nombre de la Carta, Energía, Subtipo, Nombre científico, Daño, Descanso) to their card regions. Purple lines tie the 'mechanic' callouts (Requisito, Efecto y Costo, Folio) to the respective card fields.

The two-color line system visually separates stats-reading annotations from mechanical-rules annotations, helping the reader distinguish 'what the symbol means' vs 'how the rule works'.

**Relación con el texto:** Pedagogical connector system for the card-anatomy infographic.

### `[p14/fig-18]` page-number-14 *(type: icon)*
_bbox (%): x=91, y=95, w=6, h=4_  
**Legibilidad:** clear  

**Descripción:** Dark navy/teal filled rounded rectangle with white bold page number '14' in the bottom-right corner.

**Texto embebido:**
- `14`

**Relación con el texto:** Page number indicator.

## Notas de página

Page presents §3.7 Espectros in two layers: (1) a full card-anatomy infographic using 'Nánuk, Garras Heladas' as the example, annotated by ~10 color-coded callouts explaining card fields (Vida Máxima, Nombre de la Carta, Requisito, Efecto y Costo, Folio, Créditos, Daño, Descanso, Energía, Subtipo, Nombre científico); and (2) a trio of bulleted rules blocks for 'Uso de los Espectros', 'Cartas Poseídas' and 'Generalidades'. Source has minor typos preserved verbatim: 'expasión' (fig-06), 'Kodem' without accent (fig-13), 'Las carta poseída' (b18), 'pueden disparan' (b19).

### ⚡ Rulings aplicables a esta página (ver `rulings-v5.1.md`)

- **D11** — Máximo 4 Espectros dentro del total de 24 Adendei+Espectros en Mazo Principal.
- **D20** — Vida máxima y requisitos: cada Espectro declara su vida en su carta; posee Adendei en Extinción que cumplan su Requisito.
- **D21** — Posesión = Vivificación atómica. El Adendei poseído se coloca **bajo** el Espectro (stack físico). Al morir el Espectro, **ambas cartas** (Espectro + poseído) van a Extinción.
- **D22 v3** (2026-04-22) — **Herencia dinámica de 5 atributos:** el Espectro hereda del poseído `Efecto + Daño + Descanso + Costo + Energía` en tiempo real (escalas/descensos al poseído modifican al Espectro mientras dure la posesión). El Espectro conserva su propia `Vida` y `Subtipo`. La herencia NO es copia — ver D22b.
- **D22b** — Distinción formal: **Herencia (posesión) ≠ Copia (mecánica general, D17)**. Copia = snapshot único (Gloku/Dagg). Herencia = dinámica en tiempo real (Espectros). Ruk es caso híbrido.
- **D22c** (2026-04-22) — **Absorción total:** TODO daño al stack (sea dirigido al Espectro o al poseído genéricamente) entra a la vida del Espectro. La carta poseída está inerte bajo el stack; no acumula daño propio. Las escalas/descensos de stat al poseído sí se propagan al Espectro (vía D22 v3); el daño directo siempre al Espectro (D22c). Fundamento: `p14/b19 b1` (el poseído pierde tipo/subtipo propios).
- **D33** (2026-04-22) — Un Espectro sin poseído puede atacar pagando doble vida aliada (`p14/b16 b6`). Ese ataque **sí dispara triggers** tipo *"si esta carta ataca"* (por simetría con FAQ-03: el ataque sí sucede). Matiz "algunos triggers" según redacción: genéricos sí, los que exigen "con poseída" no.
- **D34** — Al morir el Espectro, las 2 cartas cuentan para el tracker de victoria (10 cartas a Extinción).
- **D35** — El efecto del Espectro y el efecto del poseído son **aditivos** (no excluyentes).
- **D36** (2026-04-20 Aldo juez) — Posesión consume el objetivo en Extinción. Varios Espectros pueden poseer en la misma Fase Previa sólo si hay objetivos suficientes (1 por Espectro).
- **D37** (2026-04-22) — **Tlahuelpuchi NO bloquea posesión; elimina el requisito de sacrificar aliado.** Los Espectros aliados pueden poseer Adendei en Extinción sin enviar aliado propio al Extinción. Habilita strategies Tlahuelpuchi + Espectros.
- **D47** (2026-04-22, Logos por derivación) — **Tlahuelpuchi + múltiples Espectros en misma Fase Previa:** cada Espectro puede poseer sin límite adicional, hasta agotar objetivos disponibles. El *"(solo una)"* de `p14/b16 b3` aplica **por Espectro**, no por turno global. Composición directa D36 + D37 + `p14/b16 b3`.
- **D49** (2026-04-22, Logos por derivación) — **Espectro sin poseído sin aliados para pagar el ataque:** el ataque **ni se declara**. La cláusula *"deberá pagar"* de `p14/b16 b6` es prerrequisito absoluto; sin recursos, la acción no se instancia. No dispara triggers tipo *"cuando declara ataque"*. Aplica meta-regla `p20/b10` + principio general TCG de costo impagable. Recomendación atómica: ataque íntegro o nada.
- **M18** — Los callouts anatómicos `Descanso: 0`, `Energía: Sin energía`, `Subtipo: Sin subtipo` describen el estado base del Espectro **sin poseer**. Al poseer, Descanso+Energía se reemplazan por los del poseído.

**Página 14 es donde v5.2 debe agregar una tabla consolidada de herencia** (ver D22 v3) y la distinción herencia/copia formalizada en glosario.

---

<a id="pagina-15"></a>

# Página 15 — 4. Preparación del Ecosistema

**Verdict:** `llm_preferred` · **Recomendación:** `accept` · **Confianza:** 0.89 · **Acuerdo LLM↔OCR:** 0.97

**Sección(es):** §4

## Bloques de texto

### `[p15/b01]` 4. Preparación del Ecosistema
_pos: top_

> 4. Preparación del Ecosistema

*Notas:* Large blue banner header with diagonal chevron decorations on both sides.

### `[p15/b02]`
_pos: top_

> **¡Prepara tu Ecosistema para el combate!** Tu *Ecosistema* de juego incluye todos los elementos de tu tablero y las **Zonas** que lo conforman. En **ningún momento**, las cartas podrán colocarse en otros espacios fuera de sus zonas designadas. **Ejemplo:** los Token no pueden ir en el Mazo Principal, ni los *Adendei* en la Zona de Equipo.

*Notas:* Intro paragraph below the banner.

### `[p15/b03]`
_pos: top_

> ¡En Kódem **cada carta es única, así que no puedes llevar copias**! (En el Modo de Juego Estándar).

*Notas:* Emphasis line continuing the intro.

### `[p15/b04]` 1. Elige:
_pos: middle-left_

> **1. Elige:**

*Notas:* Numbered step header, top step of the preparation sequence.

### `[p15/b05]`
_pos: middle-left_

> · **15-24** *Adendei*
> · **0-2** *Rava*
> · **1-2** *Protectores*
> · **0-1** *Bio*
> · **0-5** *Ixim*
> · **0-5** *Rot*
> · Los *Token* que quieras

*Notas:* Bullet list of deck-component ranges for step 1.

### `[p15/b06]`
_pos: middle_

> **2.** Selecciona **3** cartas de *Adendei* y colócalas *ocultas* (boca abajo) en los **3** espacios de tu *Zona Principal*. Estas serán las cartas con las que iniciarás tu partida.

*Notas:* Step 2 instruction block.

### `[p15/b07]`
_pos: middle-right_

> **3.** Selecciona **15-21** *Adendei*, **0** - **2** *Rava* **y 0 o más Espectros**: Este será tu *Mazo Principal* e irá colocado boca abajo en el orden que desees en la *Zona de Mazo*, considerando que las cartas se tomarán en **tercias** desde su tope para elegir una carta de reemplazo para cuando una de tus cartas deje la *Zona Principal*. Su tamaño no podrá rebasar el límite de 24 cartas totales entre *Adendei* y Espectros.

*Notas:* Step 3 instruction block.

### `[p15/b08]`
_pos: middle-left_

> **4.** Selecciona **1** o **2** *Protectores* y colócalos boca abajo y girado 180° en la zona de *Protector*, esto indica que tu *Protector* comenzará con **3** *descansos*. Ten en cuenta que harás más uso del *Protector* que coloques en el tope.

*Notas:* Step 4 instruction block.

### `[p15/b09]`
_pos: bottom_

> **5.** Selecciona **0** o **1** *Bio* y colócalo boca abajo en la Zona de Bio. Ten en cuenta que solamente podrás llevar uno en todo el juego.

*Notas:* Step 5 instruction (paired with ecosystem board diagram).

### `[p15/b10]`
_pos: bottom_

> **6.** Selecciona **0** a **10** *Equipos* (máximo **5** *Ixim* y máximo **5** *Rot*) y colócalos boca abajo en la *Zona de Equipo*. Estos no se tomarán del tope, sino que los seleccionarás cuando llegue el momento de equipar tus cartas *(Ver 5. Fases del Turno)*.

*Notas:* Step 6 instruction.

### `[p15/b11]`
_pos: bottom_

> **7.** La Extinción será la Zona a la que irán tus cartas una vez que se hayan llegado a **0** puntos de vida o cuando una carta lo indique. Las cartas en Extinción se consideran de información pública por lo que las cartas en Extinción deberán estar reveladas.

*Notas:* Step 7 instruction about Extinción zone.

### `[p15/b12]` Condición de Victoria
_pos: bottom_

> **Condición de Victoria:** Si logras enviar **10** cartas del rival a su Zona de Extinción o cumplir condiciones de victoria que se indiquen el texto de las cartas: *¡GANARÁS EL JUEGO!*
> Todas las cartas en Extinción cuentan: *Adendei, Rava, Bio, Rot, Ixim y Protectores* a excepción de los *Token*.

*Notas:* Victory condition block closing the page.

### `[p15/b13]`
_pos: diagram_

> PROTECTOR

*Notas:* Zone label on the ecosystem board diagram (left side).

### `[p15/b14]`
_pos: diagram_

> ADENDEI

*Notas:* Zone label on the ecosystem board diagram (upper-center).

### `[p15/b15]`
_pos: diagram_

> MAZO

*Notas:* Zone label on the ecosystem board diagram (upper-right).

### `[p15/b16]`
_pos: diagram_

> ZONA PRINCIPAL

*Notas:* Zone label on the ecosystem board diagram (center).

### `[p15/b17]`
_pos: diagram_

> BIO

*Notas:* Zone label on the ecosystem board diagram (center, below Adendei).

### `[p15/b18]`
_pos: diagram_

> EXTINCIÓN

*Notas:* Zone label on the ecosystem board diagram (lower-left).

### `[p15/b19]`
_pos: diagram_

> EQUIPO

*Notas:* Zone label on the ecosystem board diagram (lower-right).

### `[p15/b20]`
_pos: bottom-right_

> 15

*Notas:* Page number in dark rounded badge.

## Figuras

### `[p15/fig-01]` chapter-banner-preparacion-del-ecosistema *(type: infographic)*
_bbox (%): x=0, y=0, w=100, h=6_  
**Legibilidad:** clear  

**Descripción:** Full-width horizontal chapter banner with a blue-to-dark-blue gradient background. Both ends carry diagonal chevron/slash decorative motifs in varying tones of blue and cyan creating a dynamic speed-line effect. The centered title '4. Preparación del Ecosistema' is set in bold white serif text.

Banner style is more emphatic than the rounded §3.x sub-badges used on previous pages, signaling that Chapter 4 is a higher-level division of the rulebook than the subsections. The slash motif is repeated on page 16 ('5. Fases del Turno') confirming it is the Chapter-level visual mark.

**Texto embebido:**
- `4. Preparación del Ecosistema`

**Relación con el texto:** Opens Chapter 4.

### `[p15/fig-02]` card-deck-3d-stack *(type: illustration)*
_bbox (%): x=40, y=19, w=35, h=20_  
**Legibilidad:** needs_enhance — Logo visible but card texture details are dark and small.  

**Descripción:** A 3D rendered stack of Kódem cards shown in perspective, fanned to suggest depth. The topmost card is dark (near-black) with a textured stone-like surface and displays the 'KÓDEM' game logo in teal/cyan at its center along with a small emblem.

The stack is paired with a large cyan curly bracket on its left, visually grouping it with the bulleted deck-composition list and suggesting that the list defines what goes into 'this' deck of cards. The stack acts as flavor illustration for the deck-building step (step 1).

**Texto embebido:**
- `KÓDEM`

**Relación con el texto:** Supports step 1 ('Elige:') by visualizing the physical deck produced by the selected card counts.

### `[p15/fig-03]` cyan-curly-bracket *(type: icon)*
_bbox (%): x=36, y=19, w=4, h=22_  
**Legibilidad:** clear  

**Descripción:** Large cyan/teal curly brace '{' rendered as a bold typographic/illustrative element connecting the step-1 bullet list on the left to the card-deck illustration on the right. Acts as a visual equals-sign: bullet totals on the left 'equal' the deck illustration on the right.

**Relación con el texto:** Visual connector between the numeric bullet list and the deck illustration.

### `[p15/fig-04]` ecosystem-board-diagram *(type: diagram)*
_bbox (%): x=11, y=48, w=85, h=34_  
**Legibilidad:** clear — Zone labels all legible; numeric descanso scales on Protector (1–12) and Adendei (1–6) visible but small.  

**Descripción:** Large ecosystem-board diagram showing the full Kódem TCG play mat in a deep purple/magenta background with orange accents. A fantasy dragon-like silhouette provides atmospheric background art.

Zone layout (as labeled in white bold caps):
- PROTECTOR — left side, upper-left area, outlined with a bracket and a numbered scale (1–12) indicating descanso track positions
- ADENDEI — three card slots side by side in the upper-center, each with its own 1–6 numbered descanso scale
- MAZO — right side, upper-right area, with simple label and bracket outline
- BIO — center, just below the Adendei slots, marked with a small blue dot indicator
- ZONA PRINCIPAL — large rectangular central area outlined in cyan/teal containing the Adendei slots and Bio position
- EXTINCIÓN — lower-left corner, orange bracket outline
- EQUIPO — lower-right corner, orange bracket outline

Blue dot callouts connect several zone labels to explanatory text paragraphs (steps 5, 6 and 7) distributed around the diagram. The overall aesthetic uses purple base with cyan and orange accent strokes; all zone names are rendered in bold white caps for maximum legibility against the dark backdrop.

The diagram is the physical counterpart to the numbered-steps list: each step on the page (2 through 7) corresponds to one or more zones highlighted on the board.

**Texto embebido:**
- `PROTECTOR`
- `ADENDEI`
- `MAZO`
- `ZONA PRINCIPAL`
- `BIO`
- `EXTINCIÓN`
- `EQUIPO`

**Relación con el texto:** Primary visual reference for the entire preparation procedure; every numbered step (2–7) ties to one of the labeled zones.

### `[p15/fig-05]` step-number-badge-1 *(type: icon)*
_bbox (%): x=5, y=17, w=4, h=3_  
**Legibilidad:** clear  

**Descripción:** Bold dark numeral '1.' serving as the step indicator header above the first bullet list.

**Texto embebido:**
- `1.`

**Relación con el texto:** Marks step 1 of the preparation sequence.

### `[p15/fig-06]` step-number-badge-2 *(type: icon)*
_bbox (%): x=38, y=32, w=4, h=3_  
**Legibilidad:** clear  

**Descripción:** Bold dark numeral '2.' marking step 2 of the preparation sequence.

**Texto embebido:**
- `2.`

**Relación con el texto:** Marks step 2.

### `[p15/fig-07]` step-number-badge-3 *(type: icon)*
_bbox (%): x=63, y=28, w=4, h=3_  
**Legibilidad:** clear  

**Descripción:** Bold dark numeral '3.' marking step 3 of the preparation sequence.

**Texto embebido:**
- `3.`

**Relación con el texto:** Marks step 3.

### `[p15/fig-08]` step-number-badge-4 *(type: icon)*
_bbox (%): x=2, y=33, w=4, h=3_  
**Legibilidad:** clear  

**Descripción:** Bold dark numeral '4.' marking step 4 of the preparation sequence.

**Texto embebido:**
- `4.`

**Relación con el texto:** Marks step 4.

### `[p15/fig-09]` page-number-15 *(type: icon)*
_bbox (%): x=92, y=95, w=6, h=4_  
**Legibilidad:** clear  

**Descripción:** Dark navy/teal filled rounded rectangle with white bold page number '15' in the bottom-right corner.

**Texto embebido:**
- `15`

**Relación con el texto:** Page number indicator.

## Notas de página

Chapter 4 opener: 'Preparación del Ecosistema'. The page is split vertically into two regions. Upper region: chapter banner, intro paragraph, and four numbered setup steps (1-4) paired with a 3D card-deck illustration and a cyan curly-brace connector. Lower region: the full ecosystem-board diagram showing 7 zones (Protector, Adendei ×3, Mazo, Zona Principal, Bio, Extinción, Equipo), paired with steps 5-7 and the 'Condición de Victoria' block. Step 2 appears visually between steps 3 and 4 in the layout grid. The diagram's descanso scales (Protector 1-12, Adendei 1-6) are visible but small. Source note: 'se indiquen el texto' (b12) transcribed verbatim (should be 'se indiquen en el texto').


---

<a id="pagina-16"></a>

# Página 16 — 5. Fases del Turno

**Verdict:** `needs_human` · **Recomendación:** `re_extract` · **✓ Re-validada (pass 2)** · **✓ Revalidada (re-extracción + spot-check previo)** · **Confianza:** 0.88 · **Acuerdo LLM↔OCR:** 0.78

**Sección(es):** §5, §6.6.2, §3.4, §6.5, §6.6.3, §6.6.1

## Bloques de texto

### `[p16/b01]` 5. Fases del Turno
_pos: top_

> 5. Fases del Turno

*Notas:* Chapter banner header with diagonal chevron decorations (same style as p15). Typographically set in small caps so it visually reads '5. FASES DEL TURNO'.

### `[p16/b02]` Fase de Inicio
_pos: top-right_

> Fase de Inicio:

*Notas:* Subsection heading with colon. Small-caps styling.

### `[p16/b03]`
_pos: top-right_

> Comienza el turno del jugador.
> El primer turno se decide al jugador inicial de forma aleatoria.

*Notas:* Description of Fase de Inicio.

### `[p16/b04]` Fase Previa
_pos: middle-left_

> Fase Previa:

*Notas:* Subsection heading with colon. Small-caps styling.

### `[p16/b05]`
_pos: middle-left_

> Durante la Fase Previa, puedes realizar las siguientes acciones:

*Notas:* Intro line for Fase Previa bullet list.

### `[p16/b06]`
_pos: middle-left_

> • **Pasar turno:** Ir a Fin de Turno saltándote todas las Fases intermedias y sin activar efectos a excepción de los *efectos* con el costo, condición o indicación de "*pasar turno*" que deberán declararse en esta Fase. También puedes indicar en la Fase Previa que "*pasas turno*" y saltar a "Fin de Turno" para cumplir con el costo de "*pasar turno*" de 1 carta que lo establezca como condición para atacar.
> • **Revelar** las cartas que desees.
> • Declarar y resolver **Pasivas** (que cumplan su condición y/o Pasivas Opcionales).
> • **Enviar cartas a Extinción** cuya vida llegue a **0** ptos. o por *efecto* o *costo* de alguna carta.
> • **Reemplazar** cartas que dejen el campo.
> • **Enviar** tu *Bio* a Extinción y actualizar **1** *descanso* de cada una de tus cartas.
> • **Regresar 1** *Rava* de *Zona Principal* al fondo del Mazo.
> • **Enviar 2** cartas de *Zona Principal* a Extinción para regresar **1** *Rava* de Extinción a *Zona Principal*.

*Notas:* Bulleted list of Fase Previa actions — 8 bullets total. Pass-2 fix: added 8th bullet (Rava swap) that was omitted in pass-1.

### `[p16/b06b]`
_pos: middle-left_

> **Nota:** El jugador rival solo puede revelar cartas con **Pasiva-Rápida** durante esta fase y usarlas como respuesta, también puede usar las pasivas de cartas que cumplan su condición si ya se encuentran reveladas.
> *(Ver Pasivas-Rápidas en 6.6.2 Pasivas).*

*Notas:* NOTA block following Fase Previa bullets, with cross-reference on its own line. Pass-2 fix: entire block was omitted in pass-1. 'Nota:' is printed in small-caps styling (reads visually as 'NOTA:'). 'Pasiva-Rápida' is hyphenated; 'Pasivas-Rápidas' in the cross-reference is also hyphenated.

### `[p16/b07]` Fase de Batalla
_pos: middle-right_

> Fase de Batalla:

*Notas:* Subsection heading with colon. Small-caps styling.

### `[p16/b08]`
_pos: middle-right_

> En esta Fase sólo se podrá atacar y/o usar la Activa de 1 carta por turno (excepción de cartas equipadas con Rot ya que se puede considerar su Activa y la de la carta equipada como 1 sola Activa. *(Ver 3.4. Equipos)* y se compone de las siguientes subfases:

*Notas:* Intro paragraph for Fase de Batalla. Source has unbalanced parentheses (opens '(excepción ...' and never explicitly closes before '*(Ver 3.4. Equipos)*'). Transcribed verbatim — 'sólo' with accent as printed.

### `[p16/b09]` Declaración
_pos: middle-right_

> **Declaración:** Elige un Adendei o Protector disponible y declara ataque *(Ver 6.5. Ataque)* y/o Activa hacia una de las cartas rivales, podrás atacar cartas rivales ocultas (boca abajo). En esta subfase debes indicar las cartas involucradas, daños y Activas a realizar.

*Notas:* First subphase of Fase de Batalla.

### `[p16/b10]` Pago de costos
_pos: middle-right_

> **Pago de costos:** Algunas cartas requieren un *costo* para atacar o usar su *Activa*, el cual debe pagarse en esta *subfase*, también se realiza el daño de *quemadura* (aunque el daño por quemadura no se considera un costo*(Ver 6.6.3 Costos).*

*Notas:* Second subphase. Source has unbalanced parentheses / missing space between 'costo' and '(Ver 6.6.3 Costos)' — printed as 'costo(Ver' with no space. Transcribed verbatim.

### `[p16/b11]` Respuesta Rival
_pos: middle-right_

> **Respuesta Rival:** El rival puede revelar cartas y/o usar *Activas Rápidas* que tengan interacción en ataque o Activa *(Ver 6.6.1 Activas).*

*Notas:* Third subphase of Fase de Batalla. Note: 'Activas Rápidas' here is WITHOUT hyphen (two separate italicized words); contrast with 'Pasiva-Rápida' / 'Pasivas-Rápidas' in the NOTA which are hyphenated.

### `[p16/b12]`
_pos: bottom-right_

> 16

*Notas:* Page number in dark rounded badge.

## Figuras

### `[p16/fig-01]` chapter-banner-fases-del-turno *(type: infographic)*
_bbox (%): x=0, y=0, w=100, h=6_  
**Legibilidad:** clear  

**Descripción:** Full-width horizontal chapter banner identical in style to the one on p15. Blue-to-dark-blue gradient background with diagonal chevron/slash decorations on both ends in varying tones of blue and cyan. The centered white bold title reads '5. Fases del Turno', signaling the beginning of Chapter 5.

**Texto embebido:**
- `5. Fases del Turno`

**Relación con el texto:** Opens Chapter 5 (turn phases).

### `[p16/fig-02]` left-slash-decoration *(type: illustration)*
_bbox (%): x=0, y=0, w=12, h=6_  
**Legibilidad:** clear  

**Descripción:** Cluster of diagonal parallel slash marks in varying shades of blue and cyan forming a dynamic chevron/speed-lines motif on the left side of the chapter banner. Bold strokes angled ~45°.

**Relación con el texto:** Decorative element of the chapter banner.

### `[p16/fig-03]` right-slash-decoration *(type: illustration)*
_bbox (%): x=88, y=0, w=12, h=6_  
**Legibilidad:** clear  

**Descripción:** Mirror of fig-02: diagonal parallel lines in blue and cyan on the right side of the banner, pointing inward toward the title.

**Relación con el texto:** Decorative element of the chapter banner.

### `[p16/fig-04]` hand-holding-crystal-die *(type: photo)*
_bbox (%): x=22, y=6, w=22, h=11_  
**Legibilidad:** clear  

**Descripción:** Photograph of an open human palm facing upward holding a small translucent blue gemstone or crystal die. The photograph uses soft natural lighting and is placed beside the 'Fase de Inicio' block.

The image illustrates the randomness mechanic used to decide which player starts — 'El primer turno se decide al jugador inicial de forma aleatoria.' The choice of a crystal/die rather than a coin gives the image a thematic flavor consistent with Kódem's fantasy-naturalist aesthetic.

**Relación con el texto:** Illustrates the Fase de Inicio random-start mechanic.

### `[p16/fig-05]` card-fan-back-photo-upper *(type: photo)*
_bbox (%): x=58, y=20, w=40, h=11_  
**Legibilidad:** needs_enhance — Logo on card backs recognizable but small.  

**Descripción:** Photograph of a hand reaching toward three face-down dark-gray Kódem cards arranged in a fan or spread on a surface. The card backs display the 'KÓDEM' game logo in teal/cyan. Lighting is warm and overhead.

This image accompanies the 'Fase Previa' intro and visually echoes the player's options to reveal, draw or reorganize hidden cards during the phase.

**Texto embebido:**
- `KÓDEM`

**Relación con el texto:** Visual flavor for the Fase Previa / 'Revelar cartas' action.

### `[p16/fig-06]` card-fan-reveal-photo-lower *(type: photo)*
_bbox (%): x=58, y=36, w=40, h=13_  
**Legibilidad:** needs_enhance — Face-up art is visible but small; backs are clearer than faces.  

**Descripción:** Photograph of a hand holding or placing three cards, one face-up revealing colorful fantasy artwork (creature/dragon illustration), with the others face-down showing the 'KÓDEM' logo. Represents the moment of revealing a card from an ocultar state during the Fase Previa.

**Texto embebido:**
- `KÓDEM`

**Relación con el texto:** Illustrates the 'Revelar las cartas que desees' action of Fase Previa.

### `[p16/fig-07]` card-layout-board-photo *(type: photo)*
_bbox (%): x=3, y=67, w=45, h=30_  
**Legibilidad:** needs_enhance — Cards visible but their names and text are too small to read; dice and gesture clearly visible.  

**Descripción:** Photograph of a hand pointing at an arrangement of dark Kódem cards laid out on a white surface, with several cyan/teal dice scattered among them. The scene simulates an active play board with cards placed in their zones and dice used as descanso/life markers.

The image accompanies the 'Fase de Batalla' block on the right side of the page and gives a real-table view of an in-combat layout, complementing the abstract board diagram shown on page 15.

**Relación con el texto:** Real-table visual reference for the Fase de Batalla section.

### `[p16/fig-08]` page-number-16 *(type: icon)*
_bbox (%): x=92, y=95, w=6, h=4_  
**Legibilidad:** clear  

**Descripción:** Dark navy/teal filled rounded rectangle with white bold page number '16' in the bottom-right corner.

**Texto embebido:**
- `16`

**Relación con el texto:** Page number indicator.

## Notas de página

Chapter 5 opener: 'Fases del Turno'. The page introduces three of the five phases: Fase de Inicio (top-right, short description + crystal photo), Fase Previa (middle-left, bulleted action list of 8 items + NOTA block + two card photographs), Fase de Batalla (middle-right, intro + three subphases Declaración / Pago de costos / Respuesta Rival + board photograph). The remaining phases (Post-Batalla and Fin) are not on this page (likely continue on p17). Source has several unbalanced parentheses and minor punctuation quirks in blocks b08 and b10; all transcribed verbatim. PASS-2 FIX: added missing 8th bullet in Fase Previa (Rava swap mechanic) and the NOTA block about Pasiva-Rápida with its cross-reference '(Ver Pasivas-Rápidas en 6.6.2 Pasivas)' — both were reglamentario content omitted in pass-1.


---

<a id="pagina-17"></a>

# Página 17 — (sin título)

**Verdict:** `both_agree` · **Recomendación:** `accept` · **Confianza:** 0.92 · **Acuerdo LLM↔OCR:** 0.98

**Sección(es):** §3.4, §5.1

## Bloques de texto

### `[p17/b01]` Orden de resolución
_pos: top_

> Orden de resolución:
> 1. Activas-Rápidas del jugador en turno.
> 2. Activas-Rápidas del jugador rival.
> 3. Daños por ataque.
> 4. Activas del jugador en turno.

*Notas:* Continuación de la sección de Fase de Batalla iniciada en página anterior.

### `[p17/b02]`
_pos: top_

> Nota: Una carta solo va a Extinción durante la Fase de Batalla para pagar un costo o si su Activa lo indica (las cartas que lleguen a 0 puntos de vida irán a Extinción hasta la Fase Post).

*Notas:* Nota aclaratoria en cursiva.

### `[p17/b03]` Fase Post
_pos: middle_

> Fase Post:
> Primero se envía a Extinción y reemplaza cualquier carta que haya llegado a 0 puntos de vida durante la Fase de Batalla. Se pueden declarar y resolver las Pasivas que cumplan sus condiciones de activación durante Batalla y cualquier otro momento.

### `[p17/b04]` Fase de Equipo
_pos: middle_

> Fase de Equipo:
> El jugador puede equipar (oculta o revelada) 1 carta de su Zona de Equipo a la carta que haya atacado o usado Activa durante este turno. Las cartas pueden equiparse con máximo 2 equipos o 1 Ixim y 1 Rot (Ver 3.4 Equipos).

*Notas:* Referencia explícita a sección 3.4.

### `[p17/b05]` Fin de Turno
_pos: bottom_

> Fin de Turno:
> El orden de prioridad de las interacciones y efectos que se apliquen en el Fin de Turno será el siguiente:
> 1. Pago de costos que se hayan declarado en turnos o Fases anteriores cuyo costo deba pagarse al final del turno.
> 2. Resolución de Activas y Pasivas que se hayan declarado en turnos o Fases anteriores cuyo efecto aplique en Fin de Turno (primero Activas, posteriormente Pasivas).
> 3. Fin de Activas y/o Pasivas que se hayan declarado en turnos o Fases anteriores cuyo efecto finalice en Fin de Turno (primero Activas, posteriormente Pasivas).
> 4. Daño de "Veneno".
> 5. Declaración y resolución de Pasivas.
> 6. Actualización de descansos: Actualiza 1 descanso de las cartas que comenzaron el turno en descanso y que no atacaron, usaron Activa o recibieron descansos por efecto. Las cartas que atacaron o usaron Activa se colocarán en el número de descansos que indica la carta por lo cual no podrán atacar o usar Activas hasta volver a estar disponibles (Ver 5.1. Descansos).

*Notas:* Referencia explícita a sección 5.1.

### `[p17/b06]`
_pos: bottom_

> 17

*Notas:* Número de página.

## Figuras

### `[p17/fig-01]` foto-tablero-juego-iluminacion-neon *(type: photo)*
_bbox (%): x=55, y=18, w=42, h=18_  
**Legibilidad:** needs_enhance — Las etiquetas son legibles a simple vista pero el texto de cartas individuales es difuso por efecto de iluminación.  

**Descripción:** Fotografía ambiental que muestra una porción de un tablero o mesa de juego en acción. Se observan cartas dispuestas sobre una superficie con iluminación dramática en tonos neón: azules, rosados/magenta y púrpuras bañan la escena, dando un aspecto cinematográfico/ambiental. Las cartas muestran bordes brillantes con reflejos azulados.

Aparecen etiquetas impresas sobre el área de juego que identifican zonas del tablero: 'ADENDEI' (aparentemente repetida en más de un lugar), 'EXTINCIÓN', 'BIO', 'SECTOR' y lo que parece ser 'ERA'. Estas etiquetas sirven de referencia visual para que el lector ubique las zonas descritas en el texto (Fase Post habla de envío a Extinción, por ejemplo).

La composición es horizontal, ocupa la esquina superior derecha de la página y funciona como imagen decorativa/ilustrativa, no como diagrama normativo.

**Texto embebido:**
- `ADENDEI`
- `EXTINCIÓN`
- `BIO`
- `SECTOR`
- `ERA`

**Relación con el texto:** Ilustra ambientalmente las zonas del tablero mencionadas en las Fases (Post, Equipo, Fin de Turno).

### `[p17/fig-02]` foto-mano-abanico-cartas *(type: photo)*
_bbox (%): x=2, y=38, w=30, h=18_  
**Legibilidad:** needs_enhance — Imagen general clara; textos internos de las cartas ilegibles a esta escala.  

**Descripción:** Fotografía decorativa: una mano humana de tez clara sostiene un abanico de aproximadamente 3 cartas de juego con la cara hacia el espectador. Las cartas presentan ilustraciones fantásticas en una paleta fría: predominan azules, verdes y acentos blancos. Detrás del abanico o al borde se aprecia el dorso ornamental característico del juego en tonos marrones y dorados.

El fondo es neutro (blanco/crema) para destacar las cartas. La imagen es ilustrativa del acto de 'mantener cartas en mano' durante las fases del turno descritas en la página.

Los textos y estadísticas de las cartas son muy pequeños y no se leen con claridad a la escala de la página.

**Relación con el texto:** Decorativa. Acompaña la explicación de cómo el jugador gestiona sus cartas durante las Fases Post / Equipo / Fin de Turno.

### `[p17/fig-03]` foto-carta-individual-marco-dorado *(type: photo)*
_bbox (%): x=2, y=83, w=22, h=13_  
**Legibilidad:** needs_enhance — Se ve clara la carta, pero el texto y estadísticas internas son ilegibles.  

**Descripción:** Fotografía de una carta individual mostrada frontalmente, apoyada/flotando sobre fondo neutro. El marco decorativo es elaborado en tonos marrones y dorados, con ornamentación característica del estilo visual del juego. La ilustración central usa colores cálidos: rojos, naranjas y dorados.

La carta muestra la estructura típica: marco, ilustración central, posibles estadísticas y texto, pero a la escala impresa el texto interno no es legible.

**Relación con el texto:** Decorativa. Refuerza el concepto de 'carta' en la explicación de Fases.

### `[p17/fig-04]` foto-mano-sosteniendo-cartas-centro *(type: photo)*
_bbox (%): x=35, y=83, w=28, h=13_  
**Legibilidad:** needs_enhance — Imagen general clara; texto en cartas ilegible.  

**Descripción:** Fotografía de una mano humana sosteniendo una o dos cartas del juego, posiblemente una con la cara hacia el espectador y otra vista parcialmente. El dorso visible muestra el patrón ornamental en marrones y dorados del reverso de las cartas Kódem. Fondo neutro blanco.

Composición horizontal, como imagen decorativa que rompe la monotonía del texto.

**Relación con el texto:** Decorativa. Ilustra la interacción física con las cartas durante el turno.

### `[p17/fig-05]` foto-mano-sosteniendo-carta-detalle *(type: photo)*
_bbox (%): x=68, y=83, w=28, h=13_  
**Legibilidad:** needs_enhance — Números de estadísticas en esquinas ilegibles a esta escala.  

**Descripción:** Fotografía de una mano humana sosteniendo una sola carta con la cara visible. El marco es ornamental en dorado/marrón y la ilustración interna presenta la paleta cálida característica (rojos, dorados). En las esquinas de la carta se distinguen números pequeños que corresponden a estadísticas del juego (no legibles con precisión).

La imagen cierra la página por el lado inferior derecho, junto al número de página '17' sobre fondo oscuro.

**Relación con el texto:** Decorativa. Refuerza visualmente las acciones de la Fase de Equipo / Fin de Turno.

## Notas de página

Página cierra las descripciones del Orden de Resolución de Fase de Batalla, Fase Post, Fase de Equipo y Fin de Turno. Contiene dos referencias cruzadas (§3.4 Equipos y §5.1 Descansos). Las cinco figuras son fotografías decorativas/ambientales, no diagramas normativos.


---

<a id="pagina-18"></a>

# Página 18 — 5.1 DESCANSOS

**Verdict:** `llm_preferred` · **Recomendación:** `accept` · **Confianza:** 0.94 · **Acuerdo LLM↔OCR:** 0.96

**Sección(es):** §5.1, §6.6

## Bloques de texto

### `[p18/b01]` CRITERIOS DE RESOLUCIÓN DE MÚLTIPLES PASIVAS
_pos: top_

> CRITERIOS DE RESOLUCIÓN DE MÚLTIPLES PASIVAS

*Notas:* Encabezado enmarcado.

### `[p18/b02]`
_pos: top_

> Si múltiples Pasivas en cartas de ambos jugadores pueden usarse en la misma Fase y al mismo tiempo, la activación y resolución de los efectos alternará entre jugadores, comenzando con el jugador en turno.

### `[p18/b03]`
_pos: top_

> Nota: Durante las Fases Previa, Post, Equipos y Fin de turno, el jugador rival solo puede revelar cartas con Pasiva-Rápida y usarlas como respuesta (Ver Pasivas Rápidas en 6.6. Efectos), también puede usar las Pasivas de cartas que cumplan su condición si ya se encuentran reveladas.

*Notas:* Referencia explícita a §6.6.

### `[p18/b04]` 5.1 DESCANSOS
_pos: middle_

> 5.1 DESCANSOS

*Notas:* Encabezado de sección numerada.

### `[p18/b05]`
_pos: middle_

> Después de utilizar tus cartas, la carta deberá esperar un número de turnos determinado por el número de la estadística de "Descansos" en la carta. Una carta en descanso no podrá usar su ataque ni Activa, pero sí podrá usar las Pasivas que se cumplan y podrá ser atacada. Cuando una carta no se encuentra en descanso se denomina "disponible".

### `[p18/b06]` GENERALIDADES
_pos: middle_

> GENERALIDADES

*Notas:* Encabezado enmarcado.

### `[p18/b07]`
_pos: middle_

> ·Las cartas Adendei, Rava y Token poseen una estadística de descanso de 0 a 2 máximo y no podrán añadirse más de 2 descansos.

*Notas:* Viñeta 1.

### `[p18/b08]`
_pos: middle_

> ·Los Protectores siempre tendrán 3 turnos de descanso (aunque no tengan indicador de esta estadística) y comenzarán el juego de esta forma.

*Notas:* Viñeta 2.

### `[p18/b09]`
_pos: bottom_

> ·La declaración de Activa de las cartas equipo Rot NO aplicarán descansos para la carta Rot ni para su carta equipada en Fin de Turno.

*Notas:* Viñeta 3.

### `[p18/b10]` ACTUALIZACIÓN DE DESCANSOS
_pos: bottom_

> ACTUALIZACIÓN DE DESCANSOS

*Notas:* Encabezado enmarcado.

### `[p18/b11]`
_pos: bottom_

> Al final del turno si se declaró ataque o Activa de una carta, esa carta deberá colocarse en los descansos especificados en la Fase de Fin de Turno y las cartas que hayan iniciado el turno en descanso actualizarán 1 descanso durante esta misma Fase hasta estar disponibles.

### `[p18/b12]`
_pos: bottom_

> 18

*Notas:* Número de página.

## Figuras

### `[p18/fig-01]` diagrama-aplicar-actualizar-descansos-adendei-rava-token *(type: infographic)*
_bbox (%): x=15, y=42, w=70, h=18_  
**Legibilidad:** clear — Títulos y etiquetas claros; el texto interno de las cartas (estadísticas y efectos) es pequeño y requiere zoom para leerse.  

**Descripción:** Diagrama ilustrativo de los descansos para cartas con estadística máxima de 2 (Adendei, Rava, Token). Muestra una secuencia horizontal de tres cartas del juego en estados progresivos de rotación, conectadas por flechas curvas rojas que indican la dirección del flujo 'APLICAR DESCANSOS' (de izquierda a derecha, de disponible a 2 descansos).

Carta 1 (izquierda): La carta aparece en posición vertical recta ('disponible'). La ilustración interna muestra un personaje dinámico con colores rojos, naranjas y azules, consistente con el estilo visual de Kódem. Se ven estadísticas y texto en la carta.

Carta 2 (centro): La misma carta girada aproximadamente 45° en sentido horario (quedando inclinada), que representa '1 descanso'. La inclinación diagonal es el símbolo visual estándar de 'tapped'/descansado.

Carta 3 (derecha): La misma carta girada aproximadamente 90° hasta quedar horizontal ('2 descansos').

Debajo de cada carta hay etiquetas en azul oscuro en mayúsculas indicando el estado. Iconos circulares verdes (flechas de rotación) aparecen entre cada par de cartas indicando el movimiento. Debajo del diagrama aparece un segundo rótulo rojo 'ACTUALIZAR DESCANSOS' para indicar que el proceso puede invertirse en cada Fin de Turno.

El fondo es blanco y la composición es limpia/editorial.

**Texto embebido:**
- `APLICAR DESCANSOS`
- `DISPONIBLE`
- `1 DESCANSO`
- `2 DESCANSOS`
- `ACTUALIZAR DESCANSOS`

**Relación con el texto:** Ilustra visualmente la viñeta 'Las cartas Adendei, Rava y Token poseen una estadística de descanso de 0 a 2 máximo'.

### `[p18/fig-02]` diagrama-aplicar-actualizar-descansos-protector *(type: infographic)*
_bbox (%): x=10, y=67, w=82, h=18_  
**Legibilidad:** needs_enhance — Etiquetas y títulos legibles; el texto interno de la carta Protectora requiere ampliación para leerse con detalle.  

**Descripción:** Diagrama ilustrativo de los descansos para cartas Protectoras (que siempre tienen 3 turnos de descanso). Muestra una secuencia horizontal de cuatro cartas con rotaciones progresivas conectadas por flechas curvas rojas, ilustrando el paso de 'DISPONIBLE' a '3 DESCANSOS'.

Carta 1 (izquierda): Carta vertical disponible. La ilustración muestra un personaje femenino con traje oscuro/negro sobre fondo rojo/magenta intenso, consistente con una carta Protectora. Se aprecian estadísticas y texto.

Carta 2: La misma carta girada 45° (1 descanso).

Carta 3: La misma carta girada 90° horizontal (2 descansos).

Carta 4 (derecha): La carta completamente dada vuelta mostrando el reverso (no solo rotada). El reverso es oscuro con el logo del juego (marrón/dorado ornamental). Esto representa '3 DESCANSOS'.

Debajo de cada carta etiquetas en azul oscuro indican el estado. Entre cada par de cartas hay iconos circulares verdes de rotación. El título superior dice 'APLICAR DESCANSOS' en rojo; debajo aparece un segundo rótulo 'ACTUALIZAR DESCANSOS' en rojo.

Fondo blanco, composición editorial.

**Texto embebido:**
- `APLICAR DESCANSOS`
- `DISPONIBLE`
- `1 DESCANSO`
- `2 DESCANSOS`
- `3 DESCANSOS`
- `ACTUALIZAR DESCANSOS`

**Relación con el texto:** Ilustra visualmente la viñeta 'Los Protectores siempre tendrán 3 turnos de descanso'.

## Notas de página

La página introduce formalmente la sección 5.1 DESCANSOS con su explicación conceptual, tres viñetas de Generalidades y dos diagramas paralelos que muestran respectivamente el ciclo de descansos para cartas con máximo 2 descansos (Adendei/Rava/Token) y para Protectores (con 3 descansos). Cierra con el bloque 'ACTUALIZACIÓN DE DESCANSOS'.


---

<a id="pagina-19"></a>

# Página 19 — 5.2 Diagrama Estructura de turno

> ✅ **Pass 5: imágenes segmentadas validadas por Ramsés** — CANONICAL_FINAL. Extracción FINAL-ULTRA consolidada humano + LLM + 3 jueces + 6 imágenes segmentadas (una por fase). `confidence_final = 0.98`.

**Notas de spot-check (humanas):**

- ✅ POST-VALIDACIÓN CONJUNTA COMPLETADA (Ramsés + Logos + 3 jueces Opus 4.7)
- Diagrama extraído con 51 nodos y 57 conexiones
- Referencia canónica: p19-extraction-v3-final.json
- Leyenda de colores extraída verbatim del PDF
- Confianza final: 0.98
- Pass 5 (2026-04-19): Ramsés envió 6 imágenes segmentadas por fase. Correcciones: Veneno ROSA no amarillo, shapes corregidos (óvalos), typo 'Exinción' preservado.

**Nodos canónicos confirmados:**

| # | Nodo |
|---|---|
| 1 | Inicio del Turno |
| 2 | Fase Previa |
| 3 | Fase de Batalla |
| 4 | Fase Post |
| 5 | Fase de Equipo |
| 6 | Fin de Turno |
| 7 | Inicio del Turno Rival |
| 8 | Pasar Turno (lateral) |

**Verdict:** `llm_preferred` · **Recomendación:** `spot_check_human` · **Confianza:** 0.88 · **Confianza final (pass 5):** 0.98 · **Acuerdo LLM↔OCR:** 0.7

**Sección(es):** §5.2

## Bloques de texto

### `[p19/b01]` 5.2 Diagrama Estructura de turno
_pos: top_

> 5.2 Diagrama Estructura de turno

*Notas:* Título de sección.

### `[p19/b02]`
_pos: top_

> Nota: Las Pasivas que cumplan su condición, podrán declararse en todas las Fases a excepción de la Fase de Batalla.

### `[p19/b03]`
_pos: bottom_

> 19

*Notas:* Número de página.

## Figuras

### `[p19/fig-01]` leyenda-colores-estructura-turno *(type: table)*
_bbox (%): x=3, y=16, w=16, h=20_  
**Legibilidad:** clear — Colores y etiquetas perfectamente legibles.  

**Descripción:** Leyenda cromática vertical ubicada en el lateral izquierdo superior que explica el código de colores usado en el diagrama principal de estructura de turno. Consiste en una lista de seis pares 'rectángulo de color + etiqueta de texto'.

De arriba a abajo: (1) cuadrado azul → 'Declaración'; (2) cuadrado rosa/magenta → 'Acción'; (3) cuadrado rojo → 'Resolución'; (4) cuadrado negro → 'Fin de efecto'; (5) cuadrado amarillo → 'Efectos del rival'; (6) cuadrado verde → 'Efectos que pueden usar jugador en turno y rival'.

La leyenda es esencial para interpretar cada nodo coloreado del flowchart principal, ya que el tipo de efecto se codifica por color.

**Texto embebido:**
- `Declaración`
- `Acción`
- `Resolución`
- `Fin de efecto`
- `Efectos del rival`
- `Efectos que pueden usar jugador en turno y rival`

**Relación con el texto:** Indispensable para leer el diagrama principal (fig-02). Codifica el significado de cada color usado en los nodos del flowchart.

### `[p19/fig-02]` flowchart-estructura-completa-turno *(type: flowchart)*
_bbox (%): x=13, y=8, w=82, h=58_  
**Legibilidad:** needs_enhance — El flujo general es claro, pero el texto pequeño dentro de cada nodo y las marcas de agua tenues en Fase de Batalla requieren ampliación para leerse con precisión. Posible presencia de watermark 'AZTIIIA' no confirmable.  

**Descripción:** Diagrama de flujo principal que describe la estructura completa de un turno de Kódem TCG. Se organiza como una secuencia vertical de bandas grises (Fases) con nodos coloreados en su interior, interconectados por flechas y líneas punteadas que muestran flujos principales y alternativos.

Estructura jerárquica: El diagrama arranca en un óvalo gris superior etiquetado 'Inicio del turno' y culmina en otro óvalo gris etiquetado 'Inicio del Turno Rival'.

Fase Previa (banda gris): contiene nodos — Pasivas (azul: Declaración), Revelar Cartas (azul), Pasivas Opcionales (azul), Costo (rosa: Acción), Pasivas Rápidas (verde: efectos compartidos), Pasivas (rojo: Resolución), Pasivas Opcionales (rojo), Reemplazo (rosa).

Fase de Batalla (banda gris): nodos — Daño (azul), Activas (azul), Activas Rápidas (azul), Vínculo Odémico (azul), Costo y/o Quemadura (rosa), Revelar (amarillo: Efectos del rival), Activa Rápida Rival (amarillo), Reemplazo (rosa), Daño (rojo), Activa (rojo).

Fase Post (banda gris): nodos — 'Cartas con 0 ptos. de vida van a Extinción' (verde), Pasivas (azul), Costo (rosa), Pasivas Rápidas (verde), Pasivas (rojo), Reemplazo (rosa).

Fase de Equipo (banda gris): nodos — Equipa (azul), Pasivas (azul), Costo (rosa), Pasivas Rápidas (verde), Pasivas (rojo), Reemplazo (rosa).

Fin de Turno (banda gris): nodos en dos subfilas — Costo de Fin de Turno (rosa), Activas de Fin de Turno (rosa), Pasivas de Fin de Turno (rosa), Fin de Activas de Fin de Turno (negro: Fin de efecto), Fin de Pasivas de Fin de Turno (negro), Veneno (rosa), Pasivas (verde/otra subfila con Costo, Pasivas Rápidas, Pasivas, Reemplazo, Descansos).

Conexiones: flechas sólidas negras describen el flujo principal. Líneas punteadas rojas y verdes muestran bucles y flujos alternativos (respuesta del rival, retornos a Pasivas).

En el lateral derecho aparecen óvalos/cajas adicionales con texto que describe casos de 'Pasar Turno' (ver fig-03). Dentro de la banda de Fase de Batalla puede apreciarse una marca de agua tenue con texto tipo 'AZTIIIA' o similar (probablemente marca visual/watermark, no normativa).

**Texto embebido:**
- `Inicio del turno`
- `Fase Previa`
- `Fase de Batalla`
- `Fase Post`
- `Fase de Equipo`
- `Fin de Turno`
- `Inicio del Turno Rival`
- `Pasivas`
- `Revelar Cartas`
- `Pasivas Opcionales`
- `Costo`
- `Pasivas Rápidas`
- `Reemplazo`
- `Daño`
- `Activas`
- `Activas Rápidas`
- `Vínculo Odémico`
- `Costo y/o Quemadura`
- `Revelar`
- `Activa Rápida Rival`
- `Cartas con 0 ptos. de vida van a Extinción`
- `Equipa`
- `Costo de Fin de Turno`
- `Activas de Fin de Turno`
- `Pasivas de Fin de Turno`
- `Fin de Activas de Fin de Turno`
- `Fin de Pasivas de Fin de Turno`
- `Veneno`
- `Descansos`

**Relación con el texto:** Es el contenido central de la página: el diagrama visual que formaliza el orden y las transiciones de las Fases descritas en las secciones 4 y 5 del rulebook. La nota del texto (b02) aclara que las Pasivas pueden declararse en todas las Fases salvo Batalla, lo que se refleja en el flujo de nodos.

### `[p19/fig-03]` flowchart-pasar-turno *(type: flowchart)*
_bbox (%): x=13, y=63, w=80, h=35_  
**Legibilidad:** needs_enhance — Diagrama claro en general; el texto del rectángulo azul es pequeño y requiere ampliación para leerse con precisión.  

**Descripción:** Diagrama de flujo secundario ubicado en la parte inferior de la página, que ilustra el caso particular de 'Pasar Turno'. Es independiente del flujo principal (fig-02) y describe la ruta abreviada cuando el jugador decide pasar.

Estructura: arranca en un óvalo gris 'Pasar Turno' y culmina en otro óvalo gris 'Fin de turno'. Entre ambos aparecen los siguientes nodos y bloques de texto:

- Rectángulo azul: 'Revelar Cartas: únicamente cartas con costo y/o Pasivas que indiquen pasar turno.'
- Rectángulo azul: 'Pasivas que requieran pasar Turno'
- Nodos coloreados en secuencia: Costo (rosa), Pasivas Rápidas (amarillo), Pasivas (rojo), Reemplazo (rosa/óvalo).

Se conectan mediante flechas sólidas negras para el flujo principal y líneas punteadas rojas/verdes para flujos alternativos (respuesta del rival o bucles).

En el lateral derecho aparecen conectores verticales con texto adicional que refuerza la lógica del 'pasar turno' (se menciona condiciones de revelar cartas con costo y/o pasivas, y pasivas que requieren pasar turno).

**Texto embebido:**
- `Pasar Turno`
- `Revelar Cartas: únicamente cartas con costo y/o Pasivas que indiquen pasar turno.`
- `Pasivas que requieran pasar Turno`
- `Costo`
- `Pasivas Rápidas`
- `Pasivas`
- `Reemplazo`
- `Fin de turno`

**Relación con el texto:** Complementa fig-02 describiendo el camino alternativo cuando un jugador opta por pasar el turno sin ejecutar la estructura completa. Se relaciona con el concepto 'Pasar Turno' mencionado en otras secciones del rulebook.

## Diagrama Estructura de Turno (CANONICAL_FINAL)

> ✅ **Pass 5: imágenes segmentadas validadas por Ramsés** — Estructura canónica FINAL-ULTRA. **52 nodos · 58 edges · 6 fases.** Referencia: [`p19-extraction-v3-final.json`](./p19-extraction-v3-final.json). Validada por 3 jueces Opus 4.7 + spot-check humano (Ramsés) + 6 imágenes segmentadas (una por fase). `confidence_final = 0.98`.

> 🎯 **Corrección crítica pass 5:** **Veneno = ROSA (acción), no amarillo** — confirmado por imagen segmentada de Fin de Turno. Esta corrección invalida la categorización previa como 'efectos del rival' y reubica Veneno como acción del jugador en turno.

> 📌 **Nota cabecera del diagrama (verbatim del PDF):** Las Pasivas que cumplan su condición, podrán declararse en todas las Fases a excepción de la Fase de Batalla.

### Leyenda de colores (verbatim PDF)

_Códigos por colores extraídos verbatim del PDF (imagen enviada por Ramsés)_

| Color | Categoría |
|---|---|
| `cian` | Declaración |
| `rosa` | Acción |
| `rojo` | Resolución |
| `negro` | Fin de efecto |
| `amarillo` | Efectos del rival |
| `verde` | Efectos que pueden usar jugador en turno y rival |

### Flujo principal

_Flujo principal secuencial por fases del turno de un jugador_

**Inicio del Turno** → **Fase Previa** → **Fase de Batalla** → **Fase Post** → **Fase de Equipo** → **Fin de Turno** → **Inicio del Turno Rival**

### Patrón repetido

_Patrón repetido en casi todas las fases_

**Secuencia:** Declaración (cian) → Costo (rosa) → Pasivas Rápidas (verde) → Pasivas resolución (rojo) → Reemplazo (rosa)

### Resumen por fase

| Fase | Nodos | Edges |
|---|---:|---:|
| Fase Previa | 8 | 12 |
| Fase de Batalla | 10 | 11 |
| Fase Post | 6 | 7 |
| Fase de Equipo | 6 | 7 |
| Fin de Turno | 13 | 12 |
| Pasar Turno (flujo horizontal alternativo) | 9 | 9 |
| **TOTAL** | **52** | **58** |

### Fases — nodos y conexiones

#### Fase Previa

**Nodos:**

| # | Nodo | Color | Categoría | Forma / Nota |
|---|---|---|---|---|
| 1 | Revelar Cartas | `cian` | declaracion |  |
| 2 | Pasivas Opcionales | `cian` | declaracion | primera instancia — junto a Revelar Cartas |
| 3 | Pasivas | `verde` | accion-mutua | primera instancia |
| 4 | Costo | `rosa` | accion |  |
| 5 | Pasivas Rápidas | `verde` | accion-mutua |  |
| 6 | Pasivas | `rojo` | resolucion |  |
| 7 | Pasivas Opcionales | `rojo` | resolucion |  |
| 8 | Reemplazo | `rosa` | accion | forma: óvalo |

**Conexiones (edges):**

- Inicio del Turno → Revelar Cartas
- Revelar Cartas → Pasivas (verde, arriba)
- Revelar Cartas → Pasivas Opcionales (cian, abajo)
- Pasivas (verde) → Costo
- Pasivas Opcionales (cian) → Costo
- Costo → Pasivas Rápidas
- Pasivas Rápidas → Pasivas (rojo)
- Pasivas Rápidas → Pasivas Opcionales (rojo)
- Pasivas (rojo) → Reemplazo
- Pasivas Opcionales (rojo) → Reemplazo
- (Reemplazo sale al siguiente nodo del turno)
- Reemplazo ↔ bucle retorno hacia Pasivas Rápidas

_Nota Ramsés (pass 5):_ Imagen final enviada por Ramsés confirma que NO hay cajas laterales. La confusión de Judge-B era el flujo horizontal de Pasar Turno corriendo paralelo.

#### Fase de Batalla

**Nodos:**

| # | Nodo | Color | Categoría | Forma / Nota |
|---|---|---|---|---|
| 1 | Daño | `cian` | declaracion |  |
| 2 | Activas | `cian` | declaracion |  |
| 3 | Activas Rápidas | `cian` | declaracion |  |
| 4 | Vínculo Odémico | `cian` | declaracion |  |
| 5 | Costo y/o Quemadura | `rosa` | accion | forma: óvalo |
| 6 | Revelar | `amarillo` | rival | forma: óvalo; amarillo óvalo según imagen segmentada |
| 7 | Activa Rápida Rival | `amarillo` | rival |  |
| 8 | Reemplazo | `rosa` | accion | forma: óvalo |
| 9 | Daño | `rojo` | resolucion |  |
| 10 | Activa | `rojo` | resolucion |  |

**Conexiones (edges):**

- Daño (cian) → Costo y/o Quemadura
- Activas → Costo y/o Quemadura
- Activas Rápidas → Costo y/o Quemadura
- Vínculo Odémico → Costo y/o Quemadura
- Costo y/o Quemadura → Revelar (BIFURCACIÓN)
- Costo y/o Quemadura → Reemplazo (BIFURCACIÓN)
- Costo y/o Quemadura → Activa Rápida Rival (BIFURCACIÓN)
- Revelar → flujo resolución
- Activa Rápida Rival → flujo resolución
- Daño (rojo) → Activa (rojo)
- (Fase de Batalla) → Fase Post

_Nota:_ P4 corrección (Ramsés): Costo y/o Quemadura BIFURCA simultáneamente a 3 nodos: Revelar, Reemplazo, Activa Rápida Rival.

#### Fase Post

> 🔤 **Typo verbatim preservado:** el PDF escribe **«Exinción»** (sin la _c_) en el nodo «Cartas con 0 ptos. de vida van a Exinción». Se preserva tal cual aparece en el fuente.

**Nodos:**

| # | Nodo | Color | Categoría | Forma / Nota |
|---|---|---|---|---|
| 1 | Cartas con 0 ptos. de vida van a Exinción | `verde` | accion-mutua | ⚠️ VERBATIM: PDF dice "Exinción" (sin c) — typo preservado |
| 2 | Pasivas | `verde` | accion-mutua |  |
| 3 | Costo | `rosa` | accion | forma: óvalo |
| 4 | Pasivas Rápidas | `verde` | accion-mutua |  |
| 5 | Pasivas | `rojo` | resolucion |  |
| 6 | Reemplazo | `rosa` | accion | forma: óvalo |

**Conexiones (edges):**

- Cartas 0 ptos → Pasivas (verde)
- Pasivas (verde) → Costo
- Costo → Pasivas Rápidas
- Pasivas Rápidas → Pasivas (rojo)
- Pasivas (rojo) → Reemplazo
- Reemplazo → bucle retorno
- (Fase Post) → Fase de Equipo

_Nota:_ P2 clarificación: NO tiene caja lateral. Judge-C se equivocó confundiendo los colores del patrón interno con una caja lateral.

#### Fase de Equipo

**Nodos:**

| # | Nodo | Color | Categoría | Forma / Nota |
|---|---|---|---|---|
| 1 | Equipa | `cian` | declaracion |  |
| 2 | Pasivas | `verde` | accion-mutua |  |
| 3 | Costo | `rosa` | accion | forma: óvalo |
| 4 | Pasivas Rápidas | `verde` | accion-mutua |  |
| 5 | Pasivas | `rojo` | resolucion |  |
| 6 | Reemplazo | `rosa` | accion | forma: óvalo |

**Conexiones (edges):**

- Equipa → Costo
- Pasivas (verde) → Costo
- Costo → Pasivas Rápidas
- Pasivas Rápidas → Pasivas (rojo)
- Pasivas (rojo) → Reemplazo
- Reemplazo → bucle retorno
- (Fase de Equipo) → Fin de Turno

#### Fin de Turno

**Nodos:**

| # | Nodo | Color | Categoría | Forma / Nota |
|---|---|---|---|---|
| 1 | Costo de Fin de Turno | `rosa` | accion | forma: óvalo |
| 2 | Activas de Fin de Turno | `rojo` | resolucion |  |
| 3 | Pasivas de Fin de Turno | `rojo` | resolucion |  |
| 4 | Fin de Activas de Fin de Turno | `negro` | fin-efecto |  |
| 5 | Fin de Pasivas de Fin de Turno | `negro` | fin-efecto |  |
| 6 | Veneno | `rosa` | accion | forma: óvalo; ✅ Imagen segmentada confirma ROSA (acción), no amarillo (rival) |
| 7 | Pasivas | `verde` | accion-mutua |  |
| 8 | Costo | `rosa` | accion | forma: óvalo |
| 9 | Pasivas Rápidas | `verde` | accion-mutua |  |
| 10 | Pasivas | `rojo` | resolucion |  |
| 11 | Reemplazo | `rosa` | accion | forma: óvalo |
| 12 | Descansos | `rosa` | accion | forma: óvalo |
| 13 | INICIO DEL TURNO RIVAL | `gris` | transicion | forma: rectángulo; Nodo de transición final que cede control al rival |

**Conexiones (edges):**

- Costo Fin de Turno → Activas Fin de Turno
- Activas Fin de Turno → Pasivas Fin de Turno
- Pasivas Fin de Turno → Fin de Activas
- Fin de Activas → Fin de Pasivas
- Fin de Pasivas → Veneno
- Veneno → Pasivas (verde)
- Pasivas (verde) → Costo
- Costo → Pasivas Rápidas
- Pasivas Rápidas → Pasivas (rojo)
- Pasivas (rojo) → Reemplazo
- Reemplazo → bucle retorno
- Descansos → Inicio del Turno Rival

#### Pasar Turno (flujo horizontal alternativo)

> 🔀 **Nota estructural:** P5 clarificación: este flujo NO es una caja lateral de Fase Previa; es un FLUJO HORIZONTAL INDEPENDIENTE que corre en paralelo al turno normal, activándose desde Fase Previa y terminando en Fin de Turno. Su función: permitir al jugador 'pasar turno' activando solo efectos con condición/costo de pasar turno.
>  
> **Posición:** paralelo al turno principal, no lateral

**Nodos:**

| # | Nodo | Color | Categoría | Forma / Nota |
|---|---|---|---|---|
| 1 | PASAR TURNO | `rosa` | entrada | forma: óvalo; Nodo de entrada al flujo |
| 2 | Revelar cartas: únicamente cartas con costo y/o Pasivas que indiquen pasar turno. | `cian` | declaracion |  |
| 3 | Sólo 1 costo que requiera pasar turno se considera PAGADO | `rosa` | accion | forma: óvalo; NODO NUEVO descubierto en P5 — faltaba en v1/v2 |
| 4 | Pasivas que requieren pasar turno | `cian` | declaracion |  |
| 5 | Costo | `rosa` | accion |  |
| 6 | Pasivas Rápidas | `amarillo` | rival |  |
| 7 | Pasivas | `rojo` | resolucion |  |
| 8 | Reemplazo | `rosa` | accion |  |
| 9 | Fin de Turno | `rosa` | accion | forma: óvalo; Conecta al flujo principal Fin de Turno |

**Conexiones (edges):**

- PASAR TURNO → Revelar cartas (pasar turno)
- Revelar cartas (pasar turno) → Sólo 1 costo pagado (rosa)
- Sólo 1 costo pagado → Pasivas que requieren pasar turno
- Pasivas que requieren pasar turno → Costo
- Costo → Pasivas Rápidas (amarillo)
- Pasivas Rápidas (amarillo) → Pasivas (rojo)
- Pasivas (rojo) → Reemplazo
- Reemplazo → Fin de Turno (rosa)
- Pasivas que requieren pasar turno → Fin de Turno (directo)

### Nota sobre Pasar Turno (flujo paralelo)

> 🔀 **Pasar Turno** NO es una caja lateral de Fase Previa: es un **flujo horizontal independiente** que corre en paralelo al turno principal. Se activa desde Fase Previa y termina en Fin de Turno. Permite al jugador pasar turno activando solo efectos con condición/costo de pasar turno. Incluye un nodo descubierto en el spot-check humano P5: _«Sólo 1 costo que requiera pasar turno se considera PAGADO»_ (óvalo rosa).

### Observaciones estructurales

- El patrón [Declaración → Costo → Pasivas Rápidas → Resolución → Reemplazo] se repite en casi todas las fases principales
- El rival interactúa principalmente mediante color amarillo (Revelar, Activa Rápida Rival, Veneno, Pasivas Rápidas en Pasar Turno)
- 'Reemplazo' es ROSA (Acción) en todas las fases, no verde (corrección clave del pass 3)
- Fase de Batalla es la más compleja: 'Costo y/o Quemadura' bifurca a 3 nodos simultáneos
- 'Descansos' es el último nodo antes del cambio de turno
- Pasar Turno es un flujo horizontal completo paralelo al turno principal, con nodos propios y entrada/salida específica

## Notas de página

Página dedicada casi exclusivamente a la sección 5.2 'Diagrama Estructura de turno'. El contenido visual (el flowchart completo + leyenda + flowchart de 'Pasar Turno') es el núcleo normativo; el texto verbatim es mínimo (título + nota). La transcripción completa de cada nodo requiere zoom sobre el PNG original y probablemente una segunda pasada de validación.


---

<a id="pagina-20"></a>

# Página 20 — 5.3 Reemplazo de cartas

**Verdict:** `both_agree` · **Recomendación:** `accept` · **Confianza:** 0.94 · **Acuerdo LLM↔OCR:** 0.98

**Sección(es):** §5.3, §6

## Bloques de texto

### `[p20/b01]` 5.3 Reemplazo de cartas
_pos: top_

> 5.3 Reemplazo de cartas

### `[p20/b02]`
_pos: top_

> 1. Cuando una carta deja su espacio en la Zona Principal, el jugador tomará 3 cartas del Mazo Principal, y elegirá 1 para reemplazarla. La carta elegida se colocará en el espacio vacío, revelada (boca arriba) u oculta (boca abajo), y con 6 puntos de vida. Las 2 cartas restantes se regresarán al fondo del Mazo Prinicipal en cualquier orden. Esta acción se repetirá por cada carta que haya dejado el campo.

*Notas:* Typo presente en el original: 'Prinicipal' en lugar de 'Principal'. Preservado verbatim.

### `[p20/b03]`
_pos: middle_

> 2. Siempre que una carta (que no sea un equipo) deje la Zona Principal, deberá colocarse una carta suplente inmediatamente, antes de declarar cualquier otro efecto, excepto si se trata de un efecto que haya sido declarado antes de que la carta dejase el campo, en cuyo caso podrá terminar de resolverse antes de realizar el reemplazo.

### `[p20/b04]`
_pos: middle_

> 3. En ningún momento se pueden usar como suplentes cartas rivales.

### `[p20/b05]`
_pos: middle_

> 4. Si un Protector es enviado a Extinción, podrá ingresar tu Protector suplente conservando los mismos descansos que tenía el Protector anterior y 12 puntos de vida.

### `[p20/b06]`
_pos: middle_

> 5. Si un jugador no puede colocar ninguna carta en el campo al realizar un reemplazo, deberá mostrar las cartas tomadas al oponente y colocarlas en la parte inferior del mazo. Los efectos de esas cartas tomadas no podrán usarse durante ese turno. Luego, el jugador realizará la acción de reemplazo nuevamente. Esta acción puede repetirse un máximo de 2 veces. Si después del tercer reemplazo el jugador aún no puede colocar una carta en el campo, perderá la partida inmediatamente.

### `[p20/b07]`
_pos: middle_

> 6. Si un jugador se queda sin cartas en su Mazo Principal, deberá colocar todas las cartas fuera del juego (excepto Tokens) que originalmente estaban en la Zona Principal, en la parte inferior del Mazo Principal.

### `[p20/b08]`
_pos: middle_

> 7. En Kódem, algunas cartas tienen efectos válidos al ser tomadas. Un efecto de este tipo solo puede usarse una vez por cada reemplazo de cartas.

### `[p20/b09]` 6. Interacciones y Efectos
_pos: middle_

> 6. Interacciones y Efectos

*Notas:* Banner de sección.

### `[p20/b10]`
_pos: bottom_

> Importante: Se aplicarán en todo momento los lineamientos de este documento a menos que el texto de una carta indique explícitamente lo contrario.

### `[p20/b11]`
_pos: bottom_

> Ejemplos donde sí aplica:
> •Libro de Reglas: Los Tokens no pueden ser ocultados. / Efecto de carta: Oculta un Token rival.
> •Libro de Reglas: No se puede curar una carta con 0 puntos de vida. / Efecto de Carta: Cura 1 pto. a 1 carta con 0 ptos de vida.

### `[p20/b12]`
_pos: bottom_

> Ejemplos donde no aplica:
> •Libro de Reglas: Los Tokens no pueden ser ocultados. / Efecto de carta: Oculta 1 carta rival.
> •Libro de Reglas: No se puede curar una carta con 0 puntos de vida. / Efecto de Carta: Cura 1 pto. a 1 carta.

### `[p20/b13]`
_pos: bottom_

> 20

*Notas:* Número de página.

## Figuras

### `[p20/fig-01]` foto-mano-tomando-cartas-mazo *(type: photo)*
_bbox (%): x=2, y=12, w=30, h=18_  
**Legibilidad:** clear — La etiqueta 'MAZO' es perfectamente legible.  

**Descripción:** Fotografía ilustrativa en el encabezado visual de la sección 5.3. Muestra una mano humana de tez clara tomando cartas del tope de un mazo apilado sobre una superficie neutra. El mazo lleva una etiqueta visible con la palabra 'MAZO' en letras rojas/anaranjadas, probablemente rotulada sobre la pila para efectos didácticos.

Las cartas muestran el reverso oscuro (patrón ornamental típico de Kódem en tonos marrones/dorados). Fondo blanco/crema que contrasta con el mazo.

La imagen ilustra el acto físico descrito en el punto 1 del texto: 'el jugador tomará 3 cartas del Mazo Principal'.

**Texto embebido:**
- `MAZO`

**Relación con el texto:** Ilustra directamente la acción de tomar cartas del Mazo Principal descrita en el primer punto de 5.3 Reemplazo de cartas.

### `[p20/fig-02]` foto-mano-abanico-tres-cartas *(type: photo)*
_bbox (%): x=33, y=12, w=33, h=18_  
**Legibilidad:** needs_enhance — Las imágenes son claras; el texto interno de las cartas requiere ampliación para leerse.  

**Descripción:** Fotografía ilustrativa en el encabezado de la sección, que muestra una mano humana sosteniendo 3 cartas en abanico con las caras visibles al espectador. Las cartas presentan el estilo visual de Kódem, con ilustraciones de personajes/criaturas en tonalidades frías (azules, verdes, oscuros) y acentos cálidos.

Esta imagen representa visualmente el 'abanico de 3 cartas tomadas' del que el jugador debe elegir 1 para el reemplazo según el punto 1 del texto. Fondo neutro blanco/crema.

El texto dentro de cada carta (nombre, estadísticas, efectos) no es legible a la escala impresa.

**Relación con el texto:** Ilustra el paso intermedio del reemplazo: las 3 cartas que el jugador sostiene antes de elegir 1 para ocupar el espacio vacío.

### `[p20/fig-03]` foto-mano-sosteniendo-mazo-logo-kodem *(type: photo)*
_bbox (%): x=66, y=12, w=31, h=18_  
**Legibilidad:** clear — El logo 'KÓDEM' es perfectamente legible.  

**Descripción:** Fotografía ilustrativa que cierra el encabezado visual. Una mano humana sostiene un mazo completo de cartas boca abajo, mostrando el reverso al espectador. El reverso presenta el logo 'KÓDEM' en letras doradas/metálicas con acabado ornamental sobre fondo oscuro (negro/marrón profundo).

La imagen refuerza la marca del juego y representa visualmente 'las 2 cartas restantes que se regresarán al fondo del Mazo Principal'.

**Texto embebido:**
- `KÓDEM`

**Relación con el texto:** Ilustra el acto de devolver cartas al Mazo Principal y refuerza visualmente la identidad de marca del juego.

### `[p20/fig-04]` banner-interacciones-y-efectos *(type: illustration)*
_bbox (%): x=5, y=72, w=90, h=5_  
**Legibilidad:** clear — Título perfectamente legible.  

**Descripción:** Banner decorativo horizontal que funciona como separador y título de la sección 6. Tiene fondo negro con sutil degradado. A ambos lados (izquierdo y derecho) presenta elementos ornamentales en forma de chevrons/triángulos apuntando hacia el centro, dibujados en color blanco/gris claro.

En el centro del banner se lee el título 'INTERACCIONES Y EFECTOS' (precedido por un '6.') en tipografía serif elegante, en color blanco, probablemente con kerning amplio para efecto editorial.

Este banner es consistente con el estilo visual de encabezados de sección del rulebook.

**Texto embebido:**
- `6. INTERACCIONES Y EFECTOS`

**Relación con el texto:** Marca el inicio de la sección 6 del rulebook, que continúa en las páginas siguientes con el bloque 'Importante' y ejemplos.

## Notas de página

Página contiene el cierre de la sección 5 con 5.3 Reemplazo de cartas (7 puntos normativos) y el arranque de la sección 6 Interacciones y Efectos con un banner decorativo y el bloque 'Importante' + dos tablas de ejemplos (sí aplica / no aplica). Se preservan typos del original ('Prinicipal' en b02). Fotografías del encabezado son ilustrativas, no normativas.


---

<a id="pagina-21"></a>

# Página 21 — 6.1 Marcas

**Verdict:** `ocr_preferred` · **Recomendación:** `re_extract` · **✓ Re-validada (pass 2)** · **Confianza:** 0.92 · **Acuerdo LLM↔OCR:** 0.85

**Sección(es):** §6.1

## Bloques de texto

### `[p21/b01]` 6.1 Marcas
_pos: top-left_

> 6.1 Marcas

*Notas:* título de sección, numeración destacada

### `[p21/b02]`
_pos: top_

> Algunas de tus cartas podrán colocar "marcas" sobre sí mismas u otras cartas en el campo. Las marcas no se consideran efectos y podrán ser eliminadas con los efectos de curación y remover marcas aplicados sobre las cartas marcadas.

### `[p21/b03]`
_pos: top-middle_

> En Kódem TCG© encontrarás 3 marcas:

### `[p21/b04]` QUEMAR
_pos: middle_

> QUEMAR: Una carta quemada recibe 1 punto de daño cada vez que declare ataque o Activa. No se considera un daño por costo.

*Notas:* entrada de lista asociada a icono/ilustración de la marca Quemar

### `[p21/b05]` ENVENENAR
_pos: middle_

> ENVENENAR: Una carta envenenada recibe 1 punto de daño en Fin del Turno de la carta envenenada.

*Notas:* entrada de lista asociada a icono/ilustración de la marca Envenenar

### `[p21/b06]` ABISMAR
_pos: middle_

> ABISMAR: Una carta abismada ha sido cegada, por lo que no podrá determinar a quién atacará durante la Subfase de Declaración; deberá atacar de forma aleatoria, para ello se sugiere que, el portador asigne un valor para cada carta y se lance un dado para determinar el objetivo del ataque.

*Notas:* entrada de lista asociada a icono/ilustración de la marca Abismar

### `[p21/b07]` GENERALIDADES
_pos: middle-bottom_

> GENERALIDADES

*Notas:* subtítulo de sección en mayúsculas

### `[p21/b08]`
_pos: middle-bottom_

> •Una carta no puede tener 2 marcas del mismo tipo, pero sí puede tener 1 marca de cada tipo.

*Notas:* viñeta

### `[p21/b09]`
_pos: middle-bottom_

> •Mientras una carta tenga una marca no podrá ser objetivo de efectos o costos que coloquen la misma marca.

*Notas:* viñeta

### `[p21/b10]`
_pos: middle-bottom_

> •A pesar de que existen efectos que colocan marcas, una marca ya colocada en una carta NO se considera un efecto.

*Notas:* viñeta

### `[p21/b11]`
_pos: bottom_

> •Poner una marca sobre una carta a menudo requiere una condición especificada en su efecto, pero cuando se coloca, la marca persistirá aunque la condición inicial haya cambiado.

*Notas:* viñeta

### `[p21/b12]` EJEMPLO
_pos: bottom_

> EJEMPLO: Activa: Quema 1 Adendei rival.

*Notas:* ejemplo en cuadro/callout

### `[p21/b13]` SITUACIÓN
_pos: bottom_

> SITUACIÓN: Si el Adendei quemado se coloca oculto (boca abajo), la marca permanece activa. La condición sólo es necesaria para la colocación inicial de la marca y esta sólo se removerá por un efecto específico (remover marca, curación) o si la carta es enviada a Extinción.

*Notas:* cierre de ejemplo, posiblemente en callout/ejemplo destacado

### `[p21/b14]`
_pos: bottom-center_

> 21

*Notas:* número de página (folio)

### `[p21/b15]` Draxes, Instinto Draconiano — Nombre
_pos: carta-ejemplo-superior-derecha_

> Draxes, Instinto Draconiano

*Notas:* nombre impreso en la carta ejemplo asociada a QUEMAR

### `[p21/b16]` Draxes, Instinto Draconiano — Subtipo
_pos: carta-ejemplo-superior-derecha_

> Adendei Titán / Pírica

*Notas:* subtipo/clasificación en letra pequeña debajo del nombre

### `[p21/b17]` Draxes, Instinto Draconiano — Pasiva
_pos: carta-ejemplo-superior-derecha_

> Pasiva: Si 1 Adendei-Pírico Titán aliado es revelado, quema 1 carta en Zona Principal.

*Notas:* texto de regla Pasiva impreso en la carta ejemplo

### `[p21/b18]` Draxes, Instinto Draconiano — Flavor
_pos: carta-ejemplo-superior-derecha_

> No es un dragón, es más bien un carnotaurus con alas de pterodáctilo que escupe fuego... Bueno, si es algo así como un dragón.

*Notas:* flavor text en cursiva, posiblemente parcialmente legible

### `[p21/b19]` Zenith, Veneno Susurrante — Nombre
_pos: carta-ejemplo-izquierda-media_

> Zenith, Veneno Susurrante

*Notas:* nombre impreso en la carta ejemplo asociada a ENVENENAR

### `[p21/b20]` Zenith, Veneno Susurrante — Subtipo
_pos: carta-ejemplo-izquierda-media_

> Adendei / Chíaktica

*Notas:* subtipo en letra pequeña bajo el nombre; transcripción aproximada, podría requerir revisión a 300dpi

### `[p21/b21]` Zenith, Veneno Susurrante — Activa
_pos: carta-ejemplo-izquierda-media_

> Activa: Envenena un Adendei rival.

*Notas:* texto de regla Activa impreso en la carta ejemplo

### `[p21/b22]` Zenith, Veneno Susurrante — Flavor
_pos: carta-ejemplo-izquierda-media_

> Aún hay quien resguarda los mares de los Abisales fugitivos...

*Notas:* flavor text en cursiva

### `[p21/b23]` Yogg, Surgimiento — Nombre
_pos: carta-ejemplo-derecha-media_

> Yogg, Surgimiento

*Notas:* nombre impreso en la carta ejemplo asociada a ABISMAR

### `[p21/b24]` Yogg, Surgimiento — Subtipo
_pos: carta-ejemplo-derecha-media_

> Adendei Abisal / Átlica

*Notas:* subtipo en letra pequeña bajo el nombre

### `[p21/b25]` Yogg, Surgimiento — Pasiva-Rápida
_pos: carta-ejemplo-derecha-media_

> Pasiva-Rápida: Si esta carta es revelada, abisma 1 Adendei en Zona Principal.

*Notas:* texto de regla Pasiva-Rápida impreso en la carta ejemplo

### `[p21/b26]` Yogg, Surgimiento — Flavor
_pos: carta-ejemplo-derecha-media_

> En sus escamas percibió la extraña sensación del aire tocándolo por primera vez... y eso que despertó en Yogg.

*Notas:* flavor text en cursiva

### `[p21/b27]` Shuge, Invulnerabilidad — Nombre
_pos: carta-ejemplo-inferior-derecha_

> Shuge, Invulnerabilidad

*Notas:* nombre impreso en la carta ejemplo asociada a 'una carta puede portar las 3 marcas'

### `[p21/b28]` Shuge, Invulnerabilidad — Subtipo
_pos: carta-ejemplo-inferior-derecha_

> Adendei Abisal / Feral

*Notas:* subtipo en letra pequeña (transcripción aproximada)

### `[p21/b29]` Shuge, Invulnerabilidad — Pasiva
_pos: carta-ejemplo-inferior-derecha_

> Pasiva: Si este Adendei está protegido, no puede ser atacado.

*Notas:* texto de regla Pasiva impreso en la carta ejemplo

### `[p21/b30]` Shuge, Invulnerabilidad — Flavor
_pos: carta-ejemplo-inferior-derecha_

> Piel escamada aparentemente interminable, con la dureza de un diamante.

*Notas:* flavor text en cursiva

## Figuras

### `[p21/fig-01]` draxes-instinto-draconiano-marca-quemar *(type: illustration)*
_bbox (%): x=62, y=14, w=30, h=22_  
**Legibilidad:** clear  

**Descripción:** Ilustración de la carta del juego titulada 'Draxes, Instinto Draconiano'. La imagen muestra una criatura reptiliana/draconiana en tonos rojizos y anaranjados vívidos que dominan toda la composición. La criatura presenta rasgos imponentes propios de un dragón, con piel escamosa y silueta agresiva, enmarcada por el borde superior derecho de la página.

La carta está envuelta en un efecto visual de llamas y chispas que salen hacia los lados, representando gráficamente la marca de Quemar. El halo de fuego naranja-rojo rodea el arte central y se desdibuja hacia el fondo claro de la página, creando una sensación de combustión activa. En la esquina superior derecha de la propia carta se observa el icono identificativo de la marca Quemar (una llama estilizada sobre fondo rojo circular) que conecta visualmente el arte con la regla descrita.

El estilo artístico es ilustración digital de alta saturación cromática, con iluminación dramática y contrastes fuertes entre los rojos cálidos de la criatura y el halo ígneo. La carta sirve como ejemplo visual inmediato y complementario del texto del bullet 'Quemar', mostrando a un Adendei/criatura bajo el efecto de la marca de fuego.

**Texto embebido:**
- `Draxes, Instinto Draconiano`
- `Adendei Titán / Pírica`
- `Pasiva: Si 1 Adendei-Pírico Titán aliado es revelado, quema 1 carta en Zona Principal.`
- `No es un dragón, es más bien un carnotaurus con alas de pterodáctilo que escupe fuego... Bueno, si es algo así como un dragón.`

**Relación con el texto:** Acompaña directamente la explicación del bullet 'QUEMAR' (b04), ilustrando visualmente cómo se ve una carta afectada por la marca Quemar mediante su icono rojo y efecto de llamas.

### `[p21/fig-02]` zenith-veneno-susurrante-marca-envenenar *(type: illustration)*
_bbox (%): x=4, y=34, w=30, h=22_  
**Legibilidad:** clear  

**Descripción:** Ilustración de la carta 'Zenith, Veneno Susurrante'. Presenta una criatura de aspecto acuático o tentacular con morfología orgánica y serpentina, renderizada en una paleta dominada por morados, violetas y magentas profundos que refuerzan la temática tóxica/venenosa.

La carta aparece envuelta en un halo de humo o niebla púrpura que se esparce desde el arte central hacia los bordes, simulando emanaciones tóxicas. La bruma violácea presenta remolinos y partículas suspendidas, creando una atmósfera densa y amenazante. En la esquina superior derecha de la carta se aprecia el icono de la marca Envenenar (una gota/veneno de color púrpura), que referencia directamente el estado aplicado.

El estilo artístico es ilustración digital detallada con gradientes suaves entre violetas claros y oscuros, y contraste con el fondo blanco de la página que hace destacar la criatura y su aura. La imagen cumple función didáctica: sirve de referencia visual al bullet 'Envenenar', mostrando la apariencia característica de una carta bajo esa marca.

**Texto embebido:**
- `Zenith, Veneno Susurrante`
- `Adendei / Chíaktica`
- `Activa: Envenena un Adendei rival.`
- `Aún hay quien resguarda los mares de los Abisales fugitivos...`

**Relación con el texto:** Acompaña la explicación del bullet 'ENVENENAR' (b05), mostrando visualmente el estado de Envenenado con el icono morado y la niebla púrpura alrededor de la criatura.

### `[p21/fig-03]` yogg-surgimiento-marca-abismar *(type: illustration)*
_bbox (%): x=62, y=40, w=30, h=22_  
**Legibilidad:** clear  

**Descripción:** Ilustración de la carta 'Yogg, Surgimiento'. Muestra una criatura oscura de aspecto abisal y enigmático, con morfología que sugiere origen en profundidades marinas o dimensionales. La paleta dominante combina azules oscuros, negros y grises fríos, evocando profundidad y penumbra.

Alrededor de la carta se extiende un efecto de humo o niebla grisácea-oscura con matices apenas perceptibles, que simulan sombras vivas o emanaciones abisales. Los bordes del efecto son difusos, mezclándose con el fondo blanco de la página de forma gradual. En la esquina superior derecha de la carta aparece el icono de la marca Abismar (un ojo/símbolo abismal negro sobre fondo circular), identificando el estado aplicado.

El estilo artístico mantiene coherencia con las otras cartas: ilustración digital detallada, pero en este caso con una paleta notablemente más fría y oscura para subrayar el tema del abismo y la ceguera que la marca provoca. Sirve como referencia visual al bullet 'Abismar', vinculando la iconografía, el nombre de la carta y el efecto narrativo de cegamiento descrito en el texto.

**Texto embebido:**
- `Yogg, Surgimiento`
- `Adendei Abisal / Átlica`
- `Pasiva-Rápida: Si esta carta es revelada, abisma 1 Adendei en Zona Principal.`
- `En sus escamas percibió la extraña sensación del aire tocándolo por primera vez... y eso que despertó en Yogg.`

**Relación con el texto:** Acompaña la explicación del bullet 'ABISMAR' (b06), representando gráficamente el estado Abismado con el icono negro y atmósfera oscura.

### `[p21/fig-04]` shuge-invulnerabilidad-tres-marcas *(type: illustration)*
_bbox (%): x=60, y=72, w=32, h=24_  
**Legibilidad:** clear  

**Descripción:** Ilustración de la carta 'Shuge, Invulnerabilidad'. Representa una criatura de aspecto abisal o acuático con estética consistente con el resto del set: tonos oscuros azulados combinados con reflejos y destellos en tonos más cálidos que crean contraste dramático.

El elemento clave de esta figura son los tres tokens/fichas circulares visibles sobre la carta, uno de cada color correspondiente a las tres marcas del juego: un token rojo (Quemar), un token morado/púrpura (Envenenar) y un token negro/gris oscuro (Abismar). Los tokens están distribuidos sobre el borde o área superior de la carta, funcionando como indicadores del estado del Adendei. Esta superposición visual es el punto didáctico central: demuestra de forma concreta que una carta puede portar las tres marcas distintas al mismo tiempo.

El estilo artístico combina la ilustración digital de la carta con la superposición de elementos de juego (los tokens), dejando clara la diferencia entre el arte de la carta y los marcadores físicos/visuales que se colocan durante una partida. Esta figura sirve específicamente como ilustración de la regla del bullet 'Una carta no puede tener 2 marcas del mismo tipo, pero sí puede tener 1 marca de cada tipo' y refuerza el concepto de acumulación de marcas heterogéneas.

**Texto embebido:**
- `Shuge, Invulnerabilidad`
- `Adendei Abisal / Feral`
- `Pasiva: Si este Adendei está protegido, no puede ser atacado.`
- `Piel escamada aparentemente interminable, con la dureza de un diamante.`

**Relación con el texto:** Ilustra la regla del bullet b08 ('una carta puede tener 1 marca de cada tipo'), mostrando la coexistencia simultánea de las 3 marcas sobre una misma carta.

## Notas de página

Página de regla 6.1 Marcas. Layout típico del rulebook Kódem: texto a la izquierda en bloques, ilustraciones de cartas alternadas a la derecha/izquierda como ejemplos visuales. Usa iconografía de colores distintos (rojo Quemar, morado Envenenar, negro Abismar). El último ejemplo (Shuge, Invulnerabilidad) destaca visualmente porque porta las tres marcas a la vez. Folio '21' en el pie de página. Re-extracción pass 2: se agregaron 16 bloques correspondientes al texto impreso en las 4 cartas ejemplo (nombre, subtipo, regla Activa/Pasiva/Pasiva-Rápida y flavor text).


---

<a id="pagina-22"></a>

# Página 22 — 6.2 CAMBIOS DE ESTADÍSTICAS

**Verdict:** `ocr_preferred` · **Recomendación:** `re_extract` · **✓ Re-validada (pass 2)** · **Confianza:** 0.84 · **Acuerdo LLM↔OCR:** 0.75

**Sección(es):** §6.2

## Bloques de texto

### `[p22/b01]` 6.2 CAMBIOS DE ESTADÍSTICAS
_pos: top_

> 6.2 CAMBIOS DE ESTADÍSTICAS

*Notas:* título de sección en mayúsculas, numeración destacada

### `[p22/b02]`
_pos: top_

> Algunas cartas también podrán modificar las estadísticas de tus cartas. Aquí te compartimos cómo funcionan dichos efectos:

### `[p22/b03]` ESCALAR
_pos: top-middle_

> •ESCALAR: Incrementar los puntos de daño de una carta permanentemente.

*Notas:* viñeta, término en mayúsculas

### `[p22/b04]`
_pos: middle-left_

> ⌀ = 3

*Notas:* anotación/ejemplo numérico asociado al bullet ESCALAR; el símbolo '⌀' NO es un glifo tipográfico sino el ICONO DE DAÑO del juego (círculo estilizado con diagonal), representado inline como anotación de ejemplo. Convenciones: usar '⌀' como placeholder Unicode del icono de daño.

### `[p22/b05]` CURAR
_pos: middle_

> •CURAR: Incrementa los puntos de vida de una carta. No se puede curar a una carta con 0 puntos de vida o a una carta que tenga completos sus puntos de vida máxima (6 puntos). Curar no incrementa la vida máxima de una carta.

*Notas:* viñeta, término en mayúsculas

### `[p22/b06]` DESCENDER
_pos: middle_

> •DESCENDER: Disminuir los puntos de daño de una carta permanentemente.

*Notas:* viñeta, término en mayúsculas

### `[p22/b07]`
_pos: middle-right_

> ⌀ = 2

*Notas:* anotación/ejemplo numérico asociado al bullet DESCENDER; el símbolo '⌀' es el ICONO DE DAÑO del juego (círculo con diagonal), no un glifo tipográfico

### `[p22/b08]` FERALIZAR
_pos: middle-bottom_

> •FERALIZAR: Es un efecto que hace que una carta pierda 1 de sus energías originales y se considera Feral (que no es considerada una Energía).

*Notas:* viñeta, término en mayúsculas

### `[p22/b09]` DAÑAR
_pos: bottom_

> •DAÑAR: Disminuir los puntos de vida de una carta. Dañar no disminuye la vida máxima de una carta.

*Notas:* viñeta, término en mayúsculas

### `[p22/b10]`
_pos: bottom-center_

> 22

*Notas:* número de página (folio)

### `[p22/b11]` Jokokan, Guardián de la Corteza — Nombre
_pos: carta-ejemplo-superior-izquierda_

> Jokokan, Guardián de la Corteza

*Notas:* nombre impreso en la carta ejemplo asociada a ESCALAR

### `[p22/b12]` Jokokan, Guardián de la Corteza — Subtipo
_pos: carta-ejemplo-superior-izquierda_

> Adendei Guardián / Lítica

*Notas:* subtipo/clasificación en letra pequeña debajo del nombre

### `[p22/b13]` Jokokan, Guardián de la Corteza — Costo
_pos: carta-ejemplo-superior-izquierda_

> Costo: Después de atacar, esta carta desciende 1 pto. y es dañada 1 pto.

*Notas:* texto de regla Costo impreso en la carta ejemplo

### `[p22/b14]` Jokokan, Guardián de la Corteza — Flavor
_pos: carta-ejemplo-superior-izquierda_

> Fauces y un infinito vacío esperan a aquel que coloque un solo pie en los dominos del Árbol...

*Notas:* flavor text en cursiva; preservar 'dominos' tal como aparece (sin tilde/sin s final, transcripción verbatim)

### `[p22/b15]` Xilan, Calma — Nombre
_pos: carta-ejemplo-superior-derecha_

> Xilan, Calma

*Notas:* nombre impreso en la carta ejemplo asociada a ESCALAR (ejemplo de la regla)

### `[p22/b16]` Xilan, Calma — Subtipo
_pos: carta-ejemplo-superior-derecha_

> Adendei / Húumica

*Notas:* subtipo en letra pequeña (transcripción aproximada; podría requerir revisión a 300dpi)

### `[p22/b17]` Xilan, Calma — Activa
_pos: carta-ejemplo-superior-derecha_

> Activa: Esta carta puede escalar 1-5 ptos. una vez mientras esté en el campo.

*Notas:* texto de regla Activa impreso en la carta ejemplo

### `[p22/b18]` Xilan, Calma — Costo
_pos: carta-ejemplo-superior-derecha_

> Costo: Para usar su Activa, daña los mismos ptos. escalados a todos los Adendei en tu campo.

*Notas:* texto de regla Costo impreso en la carta ejemplo

### `[p22/b19]` Ariem, Balance — Nombre
_pos: carta-ejemplo-izquierda-media-baja_

> Ariem, Balance

*Notas:* nombre impreso en la carta ejemplo asociada probablemente a CURAR

### `[p22/b20]` Ariem, Balance — Subtipo
_pos: carta-ejemplo-izquierda-media-baja_

> Adendei / Átlica

*Notas:* subtipo en letra pequeña debajo del nombre

### `[p22/b21]` Ariem, Balance — Activa
_pos: carta-ejemplo-izquierda-media-baja_

> Activa: Si esta carta ataca, cura 1 pto. a una carta aliada.

*Notas:* texto de regla Activa impreso en la carta ejemplo

### `[p22/b22]` Ariem, Balance — Flavor
_pos: carta-ejemplo-izquierda-media-baja_

> Silencia tu mente y escucha la sinfonía de tu interior.

*Notas:* flavor text en cursiva

### `[p22/b23]` Yakerr, Encuentro — Nombre
_pos: carta-ejemplo-derecha-media-baja_

> Yakerr, Encuentro

*Notas:* nombre impreso en la carta ejemplo asociada a FERALIZAR

### `[p22/b24]` Yakerr, Encuentro — Subtipo
_pos: carta-ejemplo-derecha-media-baja_

> Adendei / Feral

*Notas:* subtipo en letra pequeña debajo del nombre

### `[p22/b25]` Yakerr, Encuentro — Activa Rápida
_pos: carta-ejemplo-derecha-media-baja_

> Activa Rápida: Feraliza un Adendei rival mientras esta carta está en el campo.

*Notas:* texto de regla Activa Rápida impreso en la carta ejemplo

### `[p22/b26]` Yakerr, Encuentro — Costo
_pos: carta-ejemplo-derecha-media-baja_

> Costo: Esta carta podrá atacar solo a Adendei-Feral.

*Notas:* texto de regla Costo impreso en la carta ejemplo

### `[p22/b27]` Boras, Poder Kósmico — Nombre
_pos: carta-ejemplo-inferior-derecha_

> Boras, Poder Kósmico

*Notas:* nombre impreso en la carta ejemplo asociada a DAÑAR

### `[p22/b28]` Boras, Poder Kósmico — Subtipo
_pos: carta-ejemplo-inferior-derecha_

> Adendei Kósmico / Gélida

*Notas:* subtipo en letra pequeña debajo del nombre (transcripción aproximada)

### `[p22/b29]` Boras, Poder Kósmico — Activa
_pos: carta-ejemplo-inferior-derecha_

> Activa: Esta carta da 1 pto. adicional por cada carta rival en descenso.

*Notas:* texto de regla Activa impreso en la carta ejemplo

## Figuras

### `[p22/fig-01]` icono-escalar-flecha-roja *(type: icon)*
_bbox (%): x=60, y=18, w=14, h=12_  
**Legibilidad:** clear — Confirmado en re-extracción pass 2: el símbolo '⌀' es una representación del icono de daño del juego, no un glifo Unicode estándar. Se preserva como '⌀' para mantener compatibilidad textual.  

**Descripción:** Icono asociado al término ESCALAR. Consiste en una flecha estilizada con dirección ascendente (o descendente con rayas, según lectura) en tonos rojos intensos, renderizada con un estilo dinámico que sugiere movimiento y poder ofensivo. Las líneas son limpias, con gradientes del rojo claro al rojo oscuro.

El icono aparece al lado o por encima de la notación '⌀ = 3' y funciona como símbolo visual de la acción de incrementar permanentemente los puntos de daño de una carta. El fondo blanco de la página hace destacar el icono, que tiene una presencia gráfica fuerte.

El estilo coincide con la iconografía general del rulebook Kódem: iconos planos/semi-planos, colores saturados, con función identificativa inmediata del mecanismo de cambio de estadística.

**Texto embebido:**
- `⌀ = 3`

**Relación con el texto:** Refuerza visualmente el bullet 'ESCALAR' (b03); la cifra acompañante ('3') indica ejemplo del incremento aplicado. Nota: el símbolo '⌀' es el icono de DAÑO del juego (círculo con diagonal), no un glifo tipográfico.

### `[p22/fig-02]` icono-descender-flecha-azul *(type: icon)*
_bbox (%): x=60, y=48, w=14, h=12_  
**Legibilidad:** clear — Confirmado en re-extracción pass 2: el símbolo '⌀' es una representación del icono de daño del juego.  

**Descripción:** Icono asociado al término DESCENDER. Es una flecha estilizada de dirección descendente en tonos azules, con trazos que sugieren velocidad o caída controlada. Los colores fríos contrastan con el icono rojo de ESCALAR, marcando visualmente la oposición de funciones (incrementar vs disminuir daño).

Acompaña a la notación '⌀ = 2'. La presencia conjunta de ambos iconos (ESCALAR/DESCENDER) crea un par visual que comunica la idea de modificación permanente del daño en direcciones opuestas.

Estilo plano/semi-plano, con gradientes suaves, consistente con el lenguaje visual del rulebook. El icono destaca sobre el fondo blanco.

**Texto embebido:**
- `⌀ = 2`

**Relación con el texto:** Refuerza visualmente el bullet 'DESCENDER' (b06); la cifra '2' indica ejemplo del decremento aplicado. Nota: el símbolo '⌀' es el icono de DAÑO del juego, no un glifo tipográfico.

### `[p22/fig-03]` icono-curar-corazon-verde *(type: icon)*
_bbox (%): x=60, y=30, w=12, h=12_  
**Legibilidad:** needs_enhance — Composición exacta (corazón + cruz vs otro símbolo) podría confirmarse con mayor resolución.  

**Descripción:** Icono asociado al término CURAR. Se compone de un corazón de color verde con un signo '+' (cruz médica) en el centro o superpuesto, simbolizando sanación y restitución de vida. Los tonos verdes son brillantes y saturados, fácilmente identificables como categoría de beneficio/curación.

El icono funciona como marcador visual del mecanismo CURAR, indicando al lector que un efecto con esta iconografía restaura puntos de vida. La cruz del signo '+' refuerza la lectura de 'incremento' o 'sanación'.

Estilo plano, coherente con el resto del conjunto de iconos de la página (ESCALAR, DESCENDER, FERALIZAR, DAÑAR), con función didáctica clara.

**Relación con el texto:** Acompaña y refuerza el bullet 'CURAR' (b05) que describe el incremento de puntos de vida.

### `[p22/fig-04]` icono-feralizar-circulo-gris *(type: icon)*
_bbox (%): x=60, y=64, w=12, h=12_  
**Legibilidad:** needs_enhance — Interpretación del símbolo interior (garras vs marca alternativa) requiere validación a 300dpi.  

**Descripción:** Icono asociado al término FERALIZAR. Consiste en un círculo gris con un símbolo de garras/ondas o marca estilizada en su interior, indicando degradación a estado feral. Los tonos grises fríos transmiten neutralidad o pérdida, coherente con el efecto descrito (pérdida de una energía original).

El icono funciona como marcador del mecanismo FERALIZAR y visualmente se distingue de los iconos de estadísticas (ESCALAR/DESCENDER) por su forma circular y paleta desaturada.

Estilo plano, con detalles interiores que sugieren naturaleza salvaje o transformación. Coherente con el resto del conjunto iconográfico del rulebook.

**Relación con el texto:** Refuerza el bullet 'FERALIZAR' (b08) que describe la pérdida de una energía original.

### `[p22/fig-05]` icono-danar-corazon-roto *(type: icon)*
_bbox (%): x=60, y=80, w=12, h=12_  
**Legibilidad:** needs_enhance — Composición exacta del corazón (grieta, rayo, otro elemento) podría precisarse con mayor resolución.  

**Descripción:** Icono asociado al término DAÑAR. Muestra un corazón parcialmente roto o agrietado, posiblemente con un elemento de rayo o marca de impacto, en tonos naranjas o rojo-anaranjados, simbolizando pérdida de puntos de vida.

El icono contrasta con el corazón verde de CURAR: mientras este último representa sanación (verde, cruz +), DAÑAR representa pérdida (naranja/rojo, corazón roto/rayo). Este par visual refuerza la dualidad de efectos sobre la vida de la carta.

Estilo plano, consistente con el lenguaje gráfico de la página. Función didáctica evidente: identificar rápidamente el mecanismo de daño sin costo por ataque.

**Relación con el texto:** Refuerza el bullet 'DAÑAR' (b09) que describe la disminución de puntos de vida sin afectar vida máxima.

### `[p22/fig-06]` jokokan-guardian-corteza-ilustracion *(type: illustration)*
_bbox (%): x=23, y=28, w=22, h=28_  
**Legibilidad:** clear  

**Descripción:** Ilustración de la carta 'Jokokan, Guardián de la Corteza'. La imagen presenta una criatura reptiliana o anfibia grande y robusta, con postura erguida, texturas rugosas en la piel que recuerdan a corteza de árbol. Los tonos dominantes son verdes y marrones terrosos, coherentes con el nombre 'Guardián de la Corteza'.

El fondo muestra un bosque denso con luz filtrada entre los árboles, creando una atmósfera de misterio selvático y profundidad natural. La composición enfatiza la imponencia de la criatura en su hábitat.

Estilo de ilustración digital con colores saturados, contornos definidos y contraste alto entre la criatura y el fondo forestal. Encuadre vertical tipo carta. La carta lleva impreso el texto 'Costo: Después de atacar, esta carta desciende 1 pto. y es dañada 1 pto.' y el flavor 'Fauces y un infinito vacío esperan a aquel que coloque un solo pie en los dominos del Árbol...'. Asociada visualmente al mecanismo ESCALAR/DESCENDER.

**Texto embebido:**
- `Jokokan, Guardián de la Corteza`
- `Adendei Guardián / Lítica`
- `Costo: Después de atacar, esta carta desciende 1 pto. y es dañada 1 pto.`
- `Fauces y un infinito vacío esperan a aquel que coloque un solo pie en los dominos del Árbol...`

**Relación con el texto:** Ejemplo visual de carta asociada al mecanismo ESCALAR/DESCENDER (Costo que implica descender y dañar tras atacar).

### `[p22/fig-07]` xilan-calma-ilustracion *(type: illustration)*
_bbox (%): x=54, y=14, w=22, h=28_  
**Legibilidad:** clear  

**Descripción:** Ilustración de la carta 'Xilan, Calma'. Muestra una criatura pequeña y redondeada tipo armadillo o tatú, con concha dorsal prominente en colores cálidos anaranjados y marrones. La criatura interactúa con un pequeño elemento vegetal (flor), transmitiendo tranquilidad y docilidad.

El fondo presenta tonos azules y verdes vibrantes con hierbas altas y cielo despejado, creando un ambiente sereno y campestre. El estilo es ilustración digital colorida con líneas suaves y alta saturación.

La carta lleva impreso el texto 'Activa: Esta carta puede escalar 1-5 ptos. una vez mientras esté en el campo.' y 'Costo: Para usar su Activa, daña los mismos ptos. escalados a todos los Adendei en tu campo.'. Es el ejemplo didáctico central del mecanismo ESCALAR.

**Texto embebido:**
- `Xilan, Calma`
- `Adendei / Húumica`
- `Activa: Esta carta puede escalar 1-5 ptos. una vez mientras esté en el campo.`
- `Costo: Para usar su Activa, daña los mismos ptos. escalados a todos los Adendei en tu campo.`

**Relación con el texto:** Ejemplo visual principal del mecanismo ESCALAR, con texto impreso que demuestra la mecánica.

### `[p22/fig-08]` ariem-balance-ilustracion *(type: illustration)*
_bbox (%): x=54, y=49, w=22, h=28_  
**Legibilidad:** clear  

**Descripción:** Ilustración de la carta 'Ariem, Balance'. Muestra una criatura acuática elegante tipo plesiosaurio o serpiente marina, con cuerpo alargado y cuello esbelto. Colores predominantes: azules turquesa y violetas profundos, con destellos bioluminiscentes.

El ambiente es subacuático o de transición agua-aire, con burbujas y ondulaciones que envuelven a la criatura. Estilo digital con fondos oscuros y criatura luminosa en primer plano.

La carta lleva impreso el texto 'Activa: Si esta carta ataca, cura 1 pto. a una carta aliada.' y el flavor 'Silencia tu mente y escucha la sinfonía de tu interior.'. Asociada al mecanismo CURAR.

**Texto embebido:**
- `Ariem, Balance`
- `Adendei / Átlica`
- `Activa: Si esta carta ataca, cura 1 pto. a una carta aliada.`
- `Silencia tu mente y escucha la sinfonía de tu interior.`

**Relación con el texto:** Ejemplo visual del mecanismo CURAR (restauración de vida).

### `[p22/fig-09]` yakerr-encuentro-ilustracion *(type: illustration)*
_bbox (%): x=23, y=62, w=22, h=28_  
**Legibilidad:** clear  

**Descripción:** Ilustración de la carta 'Yakerr, Encuentro'. Escena nocturna en tonos azul-negros profundos, iluminada por una luna llena en el horizonte. Criatura protagonista tipo felino/cánido grande de pelaje oscuro, en movimiento con dinamismo.

Ambiente: claro o paisaje nocturno abierto, con siluetas de árboles y atmósfera misteriosa feral. La iluminación lunar crea halo dramático detrás de la criatura, enfatizando su naturaleza salvaje.

La carta lleva impreso el texto 'Activa Rápida: Feraliza un Adendei rival mientras esta carta está en el campo.' y 'Costo: Esta carta podrá atacar solo a Adendei-Feral.'. Es el ejemplo visual principal del mecanismo FERALIZAR.

**Texto embebido:**
- `Yakerr, Encuentro`
- `Adendei / Feral`
- `Activa Rápida: Feraliza un Adendei rival mientras esta carta está en el campo.`
- `Costo: Esta carta podrá atacar solo a Adendei-Feral.`

**Relación con el texto:** Ejemplo visual principal del mecanismo FERALIZAR (pérdida de energía original → estado feral).

### `[p22/fig-10]` boras-poder-kosmico-ilustracion *(type: illustration)*
_bbox (%): x=54, y=76, w=22, h=20_  
**Legibilidad:** needs_enhance — Texto parcialmente legible a 1600px; algunas palabras del subtipo podrían requerir inspección a mayor resolución.  

**Descripción:** Ilustración de la carta 'Boras, Poder Kósmico'. Criatura voladora etérea y poderosa, tipo dragón o ser alado de gran envergadura, con alas y cuerpo compuestos de elementos naturales como nubes, nieve y rayos de luz. Tonos blancos, plateados y azules fríos que evocan hielo, viento y energía cósmica.

Fondo: cielo dramático con fenómeno celeste, nubes dinámicas y destellos de luz que refuerzan el 'Poder Kósmico'. Estilo digital de alta energía, colores fríos y explosivos.

La carta lleva impreso el texto 'Activa: Esta carta da 1 pto. adicional por cada carta rival en descenso.'. Transmite escala épica y poder sobrenatural. Posición en la zona inferior de la página la asocia visualmente al mecanismo DAÑAR.

**Texto embebido:**
- `Boras, Poder Kósmico`
- `Adendei Kósmico / Gélida`
- `Activa: Esta carta da 1 pto. adicional por cada carta rival en descenso.`

**Relación con el texto:** Ejemplo visual del mecanismo DAÑAR, dada su energía agresiva y posición inferior en la página.

## Notas de página

Página de la sección 6.2 CAMBIOS DE ESTADÍSTICAS. Lista 5 mecanismos en el orden: ESCALAR, CURAR, DESCENDER, FERALIZAR, DAÑAR. Cada uno con icono y, en algunos casos, ilustración de carta ejemplo. Dos notaciones '⌀ = 3' (asociada a ESCALAR) y '⌀ = 2' (asociada a DESCENDER) funcionan como ejemplos numéricos; el símbolo '⌀' es el ICONO DE DAÑO del juego (círculo con diagonal), no un glifo tipográfico Unicode estándar. Cartas ejemplo: Jokokan, Guardián de la Corteza (sup izq, Lítica/Guardián); Xilan, Calma (sup der, Húumica); Ariem, Balance (izq media-baja, Átlica); Yakerr, Encuentro (der media-baja, Feral); Boras, Poder Kósmico (inf der, Kósmico/Gélida). Folio '22' en el pie. Re-extracción pass 2: se corrigió el orden de los bullets (el bullet CURAR aparece ANTES de DESCENDER en la página, no después), se capturaron 19 bloques nuevos con el texto impreso en las 5 cartas ejemplo (nombre, subtipo, reglas Activa/Activa Rápida/Costo, flavor text) y se clarificó que '⌀' es el icono de daño del juego.


---

<a id="pagina-23"></a>

# Página 23 — 6.3 Protección

**Verdict:** `ocr_preferred` · **Recomendación:** `re_extract` · **✓ Re-validada (pass 2)** · **Confianza:** 0.9 · **Acuerdo LLM↔OCR:** 0.94

**Sección(es):** §6.3, §6.4, §6.5

## Bloques de texto

### `[p23/b01]` 6.3 Protección
_pos: top_

> 6.3 Protección

*Notas:* título de subsección, renderizado en small caps dentro de pastilla

### `[p23/b02]`
_pos: top_

> Una carta está protegida si el efecto de otra carta lo indica. También se considera "proteger", cualquier carta que evite ataques y/o efectos de otras cartas hacia la carta protegida. Las cartas protegidas no podrán ser objetivo de ataques incluyendo los ataques de cartas abismadas, desvios de ataques y daños por ataque.

### `[p23/b03]`
_pos: top-middle_

> • Si el efecto de carta A que protege a carta B, es negado entonces la carta B deja de estar protegida.

*Notas:* viñeta con espacio después de •

### `[p23/b04]`
_pos: top-middle_

> • Si un protector equipado es cambiado por el protector suplente y el protector suplente no es compatible con el equipo, el equipo regresara a Zona de equipos.

*Notas:* viñeta con espacio después de •

### `[p23/b05]` 6.4 Tipos de Daño
_pos: middle_

> 6.4 Tipos de Daño

*Notas:* título de subsección, renderizado en small caps dentro de pastilla

### `[p23/b06]`
_pos: middle_

> Existen diferentes tipos de daño, es importante saber distinguirlos ya que pueden interactuar de formas distintas con los efectos de tus cartas, en esta sección analizaremos cada uno de ellos:

### `[p23/b07]` Daño por Ataque
_pos: middle_

> 1. Daño por Ataque: El total de daños que se declara durante un ataque, incluyendo daño aumentado y daño adicional siempre que el efecto de una carta mencione "ataca", "aumenta el daño" o "daña adicionalmente".

*Notas:* entrada numerada, etiqueta en small caps negrita

### `[p23/b08]`
_pos: middle_

> El orden para considerar el daño (base, aumentado y adicional) es el siguiente:

### `[p23/b09]`
_pos: middle_

> •Primero, el daño base, que es el daño indicado en las estadísticas.

*Notas:* viñeta SIN espacio después de •

### `[p23/b10]`
_pos: middle_

> •Segundo, el daño aumentado, que incrementa temporalmente el daño base y se añade a este.

*Notas:* viñeta SIN espacio después de •

### `[p23/b11]`
_pos: middle-bottom_

> •Tercero, los multiplicadores de daño, que se consideran daño aumentado y se aplican al daño base más el daño aumentado. Los multiplicadores de daño pueden ser acumulativos.

*Notas:* viñeta SIN espacio después de •

### `[p23/b12]`
_pos: middle-bottom_

> • Por último, el daño adicional, que se suma después del daño aumentado y no modifica el daño base ni se considera parte del daño aumentado.

*Notas:* viñeta CON espacio después de •

### `[p23/b13]` Daño por Efecto
_pos: middle-bottom_

> 2. Daño por Efecto: Cualquier daño que no provenga directamente de la estadística de daño de una carta o que provenga de cualquier efecto que no mencione "ataca", "aumenta el daño" o "daña adicionalmente" en su texto. Si una carta no menciona a qué carta se aplica el daño por efecto, aplicará sólo a la carta declarada para el ataque.

*Notas:* entrada numerada

### `[p23/b14]` Daño por Costo
_pos: bottom_

> 3. Daño por Costo: Daños que se realizan para poder resolver la declaración de un ataque y/o efecto.

*Notas:* entrada numerada

### `[p23/b15]` Daño por Marca
_pos: bottom_

> 4. Daño por Marca: Daño que se realiza como parte de una marca.

*Notas:* entrada numerada

### `[p23/b16]` 6.5 Cambios entre Zonas
_pos: bottom_

> 6.5 Cambios entre Zonas

*Notas:* título de subsección

### `[p23/b17]`
_pos: bottom_

> En Kódem TCG©, la posición de tus cartas con respecto a las cartas rivales es importante, por lo que existen cartas que permiten cambiar su lugar en el campo.

### `[p23/b18]`
_pos: bottom_

> • Si una o más cartas son intercambiadas en la Zona Principal, las cartas cambiadas conservarán las mismas estadísticas y condiciones que tenían originalmente antes del cambio (incluyendo equipos y vida).

*Notas:* viñeta

### `[p23/b19]`
_pos: bottom_

> • Si la situación de juego impide que una carta conserve sus estadísticas y condiciones actuales, no se podrá realizar el cambio.

*Notas:* viñeta

### `[p23/b20]`
_pos: bottom_

> • Si una carta aliada que ha sido cambiada, se encuentra en el campo del rival y llega a 0 puntos de vida, se colocará en la Extinción de su jugador original.

*Notas:* viñeta

### `[p23/b21]`
_pos: bottom_

> • Cualquier equipo intercambiado a una carta, debe poder ser equipado a ese tipo de carta, de lo contrario no se podrá realizar el cambio.

*Notas:* viñeta

### `[p23/b22]`
_pos: card-bottom-right-name_

> Kuyovi, Salto Eléctrico

*Notas:* nombre impreso en carta de ejemplo (esquina inferior derecha)

### `[p23/b23]`
_pos: card-bottom-right-scientific_

> Adelphobates galactonotus

*Notas:* nombre científico en cursiva bajo el nombre de la carta Kuyovi

### `[p23/b24]`
_pos: card-bottom-right-type_

> Adendei / Demótica

*Notas:* tipo/categoría de la carta Kuyovi

### `[p23/b25]`
_pos: card-bottom-right-active_

> Activa: Cambia de lugar esta carta con cualquier carta en tu Zona Principal.

*Notas:* texto ACTIVA de la carta Kuyovi, Salto Eléctrico

### `[p23/b26]`
_pos: card-bottom-right-passive_

> Pasiva: Si esta carta atacó a una carta frente a ella, esa carta recibe 1 descanso.

*Notas:* texto PASIVA de la carta Kuyovi, Salto Eléctrico — nota: 'descanso' (singular)

### `[p23/b27]`
_pos: card-bottom-right-code_

> LGRO-077

*Notas:* código de carta Kuyovi

### `[p23/b28]`
_pos: bottom-center_

> 23

*Notas:* número de página (folio)

## Figuras

### `[p23/fig-01]` kuyovi-salto-electrico-ilustracion *(type: illustration)*
_bbox (%): x=60, y=68, w=36, h=28_  
**Legibilidad:** clear — Texto de Activa y Pasiva legible tras re-extracción a crop de alta resolución.  

**Descripción:** Ilustración de la carta 'Kuyovi, Salto Eléctrico' en orientación vertical. El marco de la carta es oscuro, con tonos negros y grises y acabado elegante. En la parte superior aparece el nombre 'Kuyovi, Salto Eléctrico' en fuente decorativa estilizada sobre un banner/banda horizontal, con el nombre científico 'Adelphobates galactonotus' en cursiva más pequeña debajo.

La ilustración central representa una rana estilizada (Adelphobates galactonotus / rana dardo) de aspecto fantástico/mágico en postura erguida y majestuosa. El cuerpo es de color azul oscuro/negro con marcas luminosas de color púrpura/violeta neón que recorren la piel formando patrones geométricos y orgánicos, evocando energía eléctrica o bioluminiscencia. El fondo muestra un entorno selvático/tropical en tonos verdes oscuros con agua o reflejos, atmósfera misteriosa y nocturna.

En la parte inferior de la carta se leen el tipo 'Adendei / Demótica' y dos habilidades: Activa ('Cambia de lugar esta carta con cualquier carta en tu Zona Principal.') y Pasiva ('Si esta carta atacó a una carta frente a ella, esa carta recibe 1 descanso.'). Estadísticas numéricas con valores 2 y 1 visibles, código 'LGRO-077' y el logo de Kódem TCG.

El estilo artístico es ilustración digital de alta calidad coherente con el resto del set, con énfasis en la bioluminiscencia y el contraste violeta/azul oscuro.

**Texto embebido:**
- `Kuyovi, Salto Eléctrico`
- `Adelphobates galactonotus`
- `Adendei / Demótica`
- `Activa: Cambia de lugar esta carta con cualquier carta en tu Zona Principal.`
- `Pasiva: Si esta carta atacó a una carta frente a ella, esa carta recibe 1 descanso.`
- `LGRO-077`
- `Kódem TCG`
- `2`
- `1`

**Relación con el texto:** Carta de ejemplo visual. Su Activa ('Cambia de lugar esta carta con cualquier carta en tu Zona Principal') ilustra directamente el tema de la subsección 6.5 'Cambios entre Zonas', mostrando un efecto que cambia la posición de una carta en el campo. Su Pasiva ejemplifica interacción de ataque con la víctima.

## Notas de página

Página densa con tres subsecciones: 6.3 Protección, 6.4 Tipos de Daño, 6.5 Cambios entre Zonas (inicio). Distingue 4 tipos de daño (Ataque, Efecto, Costo, Marca) y el orden de aplicación de daño en ataques (base → aumentado → multiplicadores → adicional). Ilustración de carta Kuyovi (Adendei / Demótica, LGRO-077) con Activa y Pasiva transcritas textualmente. Folio '23' al pie. Nota verbatim: los encabezados 6.3/6.4/6.5 están renderizados en small caps dentro de pastillas de color; las entradas numeradas usan el mismo estilo small caps. Texto capturado en Title Case para preservar contenido; la estilización visual es tipográfica.


---

<a id="pagina-24"></a>

# Página 24 — 6.6 ATAQUE

**Verdict:** `ocr_preferred` · **Recomendación:** `re_extract` · **✓ Re-validada (pass 2)** · **Confianza:** 0.88 · **Acuerdo LLM↔OCR:** 0.8

**Sección(es):** §6.5, §6.6

## Bloques de texto

### `[p24/b01]`
_pos: top_

> · Si una carta es cambiada por una carta suplente (es decir, sin ser enviada a Extinción), la nueva carta se colocará con los mismos puntos de vida que tenía la carta anterior.

*Notas:* viñeta, continuación de §6.5 desde página anterior

### `[p24/b02]`
_pos: top_

> · En ningún momento se pueden usar cartas rivales como suplentes.

*Notas:* viñeta

### `[p24/b03]`
_pos: top_

> - Solo se considera que una carta está en mano cuando se toma del Mazo, por reemplazo o por efecto de alguna carta.

*Notas:* viñeta (guion como marca)

### `[p24/b04]`
_pos: top-middle_

> -- Una carta revelada que cambia entre Zona Principal original y Zona Principal rival no se considera que esté siendo revelada nuevamente.

*Notas:* viñeta anidada (doble guion)

### `[p24/b05]` 6.6 ATAQUE
_pos: middle_

> 6.6 ATAQUE

*Notas:* título de subsección en mayúsculas, numeración destacada

### `[p24/b06]`
_pos: middle_

> El ataque es el principal medio que tendrás para ir eliminando cartas rivales durante el juego. Su potencia está definida en la estadística de "daño" de tu carta más los daños aumentados y los daños adicionales (Daños de Ataque = Daño Base + Daño Aumentado + Daño Adicional).

### `[p24/b07]`
_pos: middle_

> Los efectos que permiten "Atacar" o "atacar adicionalmente" a múltiples cartas y que mencionan el número de puntos de daño a realizar dicho daño reemplazara el ataque base de la carta. Ej Yanzi, precisión.

### `[p24/b08]` Atacar
_pos: middle_

> 1. Atacar: Se considera que una carta está atacando cuando se declara que va realizar daño (de ataque) a otra carta.

*Notas:* entrada numerada

### `[p24/b09]`
_pos: middle_

> 1.1 El efecto de una carta está condicionado a su ataque sólo si la carta lo indica. Ej: "Si esta carta ataca/atacó..."

*Notas:* sub-entrada numerada

### `[p24/b10]` Declarar un ataque
_pos: middle-bottom_

> 2. Declarar un ataque: Es la acción de decirle a tu oponente que vas a dañar una de sus cartas por el daño indicado en la estadística de una de tus cartas, también incluye el daño aumentado y/o el daño adicional que la carta tuviera en ese momento.

*Notas:* entrada numerada

### `[p24/b11]` Resolver un ataque
_pos: middle-bottom_

> 3. Resolver un ataque: Es la acción de reducir la vida de la carta rival por el daño del ataque declarado.

*Notas:* entrada numerada

### `[p24/b12]`
_pos: middle-bottom_

> Ejemplo: Efecto NO condicionado al ataque

*Notas:* caption / etiqueta de ilustración (cursiva o estilo destacado)

### `[p24/b13]`
_pos: middle-bottom_

> Ejemplo: Efecto CONDICIONADO al ataque

*Notas:* caption / etiqueta de ilustración (cursiva o estilo destacado)

### `[p24/b14]` Respuestas al ataque
_pos: bottom_

> Respuestas al ataque: El jugador rival puede realizar diferentes acciones como respuesta al ataque, por ejemplo: revelar cartas y usar Activas-Rápidas. Se considera que una carta está siendo atacada cuando un jugador rival declara un ataque sobre ella.

### `[p24/b15]`
_pos: card-xakros-name_

> Xakros, Peste

*Notas:* nombre impreso en carta de ejemplo Xakros, Peste (ejemplo NO condicionado)

### `[p24/b16]`
_pos: card-xakros-type_

> Adendei Equino / Feral

*Notas:* tipo/categoría de la carta Xakros. VERBATIM: 'Adendei' (no 'Adendo')

### `[p24/b17]`
_pos: card-xakros-active_

> Activa: Todos los Adendei en el campo reciben descansos iguales a los indicados en su respectiva carta.

*Notas:* texto ACTIVA de Xakros. VERBATIM: 'Adendei' (plural) y 'descansos' (no 'decesos'/'dócimas')

### `[p24/b18]`
_pos: card-xakros-flavor_

> "Toda voz se debilita con su lento trote..."

*Notas:* flavor text en cursiva, carta Xakros, Peste

### `[p24/b19]`
_pos: card-xakros-code_

> 1DRMP-022

*Notas:* código de carta Xakros

### `[p24/b20]`
_pos: card-ariam-name_

> Ariam, Dualidad

*Notas:* nombre impreso en carta de ejemplo Ariam, Dualidad (ejemplo CONDICIONADO)

### `[p24/b21]`
_pos: card-ariam-type_

> Adendei / Átlica

*Notas:* tipo/categoría carta Ariam. VERBATIM: 'Adendei' (no 'Adendo'), 'Átlica' (no 'Ártica')

### `[p24/b22]`
_pos: card-ariam-active_

> Activa: Si esta carta ataca, protege a un Adendei aliado de ataques y efectos hasta el final de tu siguiente turno.

*Notas:* texto ACTIVA de Ariam. VERBATIM CRÍTICO: 'Adendei aliado' — NO 'Adendo aliado'. El PDF consistentemente usa 'Adendei' en esta sección.

### `[p24/b23]`
_pos: card-ariam-flavor_

> "Agua y fuego, vida y muerte..."

*Notas:* flavor text en cursiva, carta Ariam, Dualidad

### `[p24/b24]`
_pos: card-ariam-code_

> 1DRMA-020

*Notas:* código de carta Ariam

### `[p24/b25]`
_pos: card-zoadon-name_

> Zoadon, Filtración

*Notas:* nombre impreso en carta de ejemplo Zoadon, Filtración

### `[p24/b26]`
_pos: card-zoadon-type_

> Adendei Titán / Lítica

*Notas:* tipo/categoría carta Zoadon. VERBATIM: 'Adendei' (no 'Adendo'), 'Lítica' (no 'Lútica')

### `[p24/b27]`
_pos: card-zoadon-activa-rapida_

> Activa-Rápida: Puedes desviar 1 pto. de daño de cada carta aliada atacada a esta carta.

*Notas:* texto ACTIVA-RÁPIDA de Zoadon

### `[p24/b28]`
_pos: card-zoadon-flavor_

> "A través de su cuerpo, depura el mar."

*Notas:* flavor text en cursiva, carta Zoadon, Filtración

### `[p24/b29]`
_pos: card-zoadon-code_

> TC00-012R

*Notas:* código de carta Zoadon

### `[p24/b30]`
_pos: bottom-center_

> 24

*Notas:* número de página (folio)

## Figuras

### `[p24/fig-01]` icono-ataque-garras-rojas *(type: icon)*
_bbox (%): x=72, y=28, w=12, h=10_  
**Legibilidad:** clear  

**Descripción:** Icono decorativo asociado al título de sección 6.6 ATAQUE. Consiste en dos formas curvas alargadas, similares a garras o plumas estilizadas, orientadas en diagonal. Los trazos son de color rojo intenso con degradados hacia tonos más oscuros en los extremos, sobre fondo blanco.

El estilo es moderno y dinámico, evocando movimiento o velocidad, coherente con la temática de ataque. No contiene texto embebido. Funciona como elemento decorativo/identificativo de la sección.

Color rojo saturado consistente con la iconografía del rulebook para acciones ofensivas; sirve como ancla visual para que el lector reconozca rápidamente la sección de 'Ataque'.

**Relación con el texto:** Elemento decorativo que acompaña el título '6.6 ATAQUE' (b05), reforzando visualmente la temática ofensiva.

### `[p24/fig-02]` xakros-peste-ejemplo-no-condicionado *(type: illustration)*
_bbox (%): x=52, y=42, w=22, h=22_  
**Legibilidad:** clear — Texto completo extraído vía crop a resolución nativa.  

**Descripción:** Ilustración de la carta 'Xakros, Peste'. Muestra un caballo oscuro de aspecto misterioso y amenazante, con crines que se dispersan como humo o energía. Fondo en tonos púrpura y magenta intensos. Estilo digital, alto contraste, atmosférico.

En la parte inferior de la carta se ven estadísticas del juego con iconos de energías y valores numéricos 2/2, junto con tipo 'Adendei Equino / Feral' y texto de efecto ACTIVA: 'Todos los Adendei en el campo reciben descansos iguales a los indicados en su respectiva carta.' Flavor text: '"Toda voz se debilita con su lento trote..."'. Código de carta: 1DRMP-022. Marco oscuro típico de TCG.

Debajo de la carta aparece la leyenda 'Ejemplo: Efecto NO condicionado al ataque' en cursiva, usando esta carta como ilustración del concepto de efecto independiente del acto de atacar (contraparte al ejemplo condicionado).

**Texto embebido:**
- `Xakros, Peste`
- `Adendei Equino / Feral`
- `Activa: Todos los Adendei en el campo reciben descansos iguales a los indicados en su respectiva carta.`
- `"Toda voz se debilita con su lento trote..."`
- `1DRMP-022`
- `2`
- `2`

**Relación con el texto:** Ejemplo visual para la regla §6.6 (Atacar), específicamente caption b12 'Ejemplo: Efecto NO condicionado al ataque'. Ilustra un efecto que NO está condicionado al ataque de la carta (su Activa se dispara sin requerir declaración de ataque).

### `[p24/fig-03]` ariam-dualidad-ejemplo-condicionado *(type: illustration)*
_bbox (%): x=68, y=52, w=22, h=22_  
**Legibilidad:** clear — Texto completo extraído vía crop a resolución nativa. Palabra 'Adendei' confirmada verbatim — NO es 'Adendo'.  

**Descripción:** Ilustración de la carta 'Ariam, Dualidad'. Presenta un personaje femenino rodeado de elementos mágicos y luminosos, con destellos naranjas, rojos y dorados que evocan fuego o energía explosiva. Fondo en tonos azules oscuros que contrastan con los brillos cálidos alrededor del personaje. Estilo digital de alta calidad, muy dinámico visualmente.

En la parte inferior se leen estadísticas con valores 2/1, tipo 'Adendei / Átlica' y texto ACTIVA: 'Si esta carta ataca, protege a un Adendei aliado de ataques y efectos hasta el final de tu siguiente turno.'. Flavor text: '"Agua y fuego, vida y muerte..."'. Código: 1DRMA-020. Marco oscuro típico de TCG.

Debajo de la carta aparece la leyenda 'Ejemplo: Efecto CONDICIONADO al ataque' en cursiva. Sirve como ejemplo visual del concepto opuesto a la figura anterior: un efecto que sí está condicionado al acto de atacar de la carta (disparador 'Si esta carta ataca').

Nota verbatim crítica: tanto el tipo como el texto de Activa usan 'Adendei' (no 'Adendo'). Esta es la ortografía consistente del PDF en esta página, aunque parezca irregular.

**Texto embebido:**
- `Ariam, Dualidad`
- `Adendei / Átlica`
- `Activa: Si esta carta ataca, protege a un Adendei aliado de ataques y efectos hasta el final de tu siguiente turno.`
- `"Agua y fuego, vida y muerte..."`
- `1DRMA-020`
- `2`
- `1`

**Relación con el texto:** Ejemplo visual para la regla §6.6, específicamente caption b13 'Ejemplo: Efecto CONDICIONADO al ataque'. Ilustra un efecto que SÍ está condicionado al ataque, con el clásico disparador 'Si esta carta ataca'.

### `[p24/fig-04]` zoadon-filtracion-ilustracion *(type: illustration)*
_bbox (%): x=5, y=68, w=25, h=25_  
**Legibilidad:** clear — Texto completo extraído vía crop a resolución nativa.  

**Descripción:** Ilustración de la carta 'Zoadon, Filtración'. Muestra una criatura acuática titánica y tentacular, inspirada en seres del abismo marino. Estilo digital oscuro con tonos azules profundos, verdes y negros que simulan las profundidades del océano. La criatura presenta múltiples apéndices y una presencia imponente.

En la parte inferior de la carta se lee el tipo 'Adendei Titán / Lítica', con habilidad ACTIVA-RÁPIDA: 'Puedes desviar 1 pto. de daño de cada carta aliada atacada a esta carta.'. Flavor text: '"A través de su cuerpo, depura el mar."'. Estadísticas 2/0. Código TC00-012R. Marco oscuro elegante.

Posicionada en la zona inferior izquierda de la página, se vincula al concepto 'Respuestas al ataque' (b14), específicamente el uso de Activa-Rápida para desviar daño cuando una carta aliada está siendo atacada.

**Texto embebido:**
- `Zoadon, Filtración`
- `Adendei Titán / Lítica`
- `Activa-Rápida: Puedes desviar 1 pto. de daño de cada carta aliada atacada a esta carta.`
- `"A través de su cuerpo, depura el mar."`
- `TC00-012R`
- `2`
- `0`

**Relación con el texto:** Ejemplo visual vinculado al bloque b14 'Respuestas al ataque', mostrando una Activa-Rápida como herramienta de respuesta (desvío de daño a un titán).

## Notas de página

Página que completa §6.5 (Cambios entre Zonas, últimas 4 viñetas) e inicia §6.6 ATAQUE. Introduce la fórmula de daño total (Daños de Ataque = Daño Base + Daño Aumentado + Daño Adicional) y distingue tres conceptos numerados: Atacar, Declarar un ataque, Resolver un ataque. Contiene tres ilustraciones-carta con texto transcrito verbatim: Xakros (ejemplo NO condicionado, 1DRMP-022), Ariam (ejemplo CONDICIONADO, 1DRMA-020), Zoadon (respuesta al ataque, TC00-012R). Hallazgo verbatim crítico: el PDF usa consistentemente 'Adendei' (no 'Adendo') en los tipos y textos de habilidad de estas tres cartas. Folio '24' al pie.


---

<a id="pagina-25"></a>

# Página 25 — (sin título)

**Verdict:** `llm_preferred` · **Recomendación:** `accept` · **Confianza:** 0.88 · **Acuerdo LLM↔OCR:** 0.88

**Sección(es):** §6.7

## Bloques de texto

### `[p25/b01]`
_pos: top_

> ***Ataque Múltiple:*** También existen cartas que pueden *atacar* a más de **1** carta durante la Fase de Batalla, sin embargo, se considerará como **1** solo ataque.

*Notas:* Continuación de explicación de ataque desde página previa.

### `[p25/b02]`
_pos: top_

> ***Gatillo de Efectos:*** El ataque también puede activar determinados efectos que lo indiquen en su texto *"Si esta carta ataca / atacó..."*.

### `[p25/b03]` 6.7 EFECTOS
_pos: middle_

> Tus cartas tendrán diferentes efectos en el juego descritos por su texto. El texto iniciará en **negritas**, indicando su tipo de efecto. Existen dos efectos principales: **Activas** y **Pasivas**.

*Notas:* Encabezado de sección con badge naranja '6.7 EFECTOS'.

### `[p25/b04]`
_pos: middle_

> **Activa:** Todos los *Adendei* en el campo reciben *descansos* iguales a los indicados en su respectiva carta.

*Notas:* Ejemplo de efecto Activa (recuadro con borde rojo).

### `[p25/b05]`
_pos: middle_

> **Pasiva:** Los *Adendei* rivales solo pueden ser curados por efectos de *Adendei*.

*Notas:* Ejemplo de efecto Pasiva (recuadro con borde rojo).

### `[p25/b06]` GENERALIDADES
_pos: bottom_

> **• Declarar un efecto:** Es la acción de decirle a tu rival que vas a utilizar el *efecto* de una carta.
>
> Si la condición de uso de un *efecto* no se cumple el *efecto* no podrá ser declarado.
>
> Los *efectos* declarados en cualquier Zona o fuera de ellas (*Ej.* cartas *tomadas* o *vivificadas*) se considerarán que resuelven como si la carta aún estuviera en dicho lugar aun si la carta ya no se encuentra en la misma zona o lugar donde se declaró el efecto.
>
> Si una carta no menciona en su texto cuando termina su efecto, terminará cuando la carta ya no se encuentre en campo.
>
> **• Resolver un efecto:** Es la acción de llevar a cabo lo que dice el efecto de la carta.
>
> Las cartas que no especifiquen **explícitamente** que su efecto se aplica cuando ellas mismas sean enviadas a Extinción, no podrán activar sus efectos cuando sean enviadas a Extinción.
>
> Si una carta deja el campo y su efecto está condicionado a "*estar disponible*", el efecto no continuará en uso.
>
> Sólo las cartas reveladas en el campo podrán hacer uso de sus efectos.

*Notas:* Subsección GENERALIDADES dentro de §6.7. La frase 'Si una carta no menciona...' aparece subrayada en el original.

## Figuras

### `[p25/fig-01]` card-ulmor-ataque-fugaz *(type: illustration)*
_bbox (%): x=68, y=4, w=28, h=26_  
**Legibilidad:** clear — Frase de sabor en cursiva parcialmente legible por tamaño.  

**Descripción:** Carta ilustrativa de Adendei titulada 'Ulmor, Ataque Fugaz', ubicada en la esquina superior derecha de la página. El marco de la carta es gris oscuro casi negro con acabados que evocan un marco estándar del TCG Kódem.

La ilustración central muestra una criatura acuática tentaculada de tipo pulpo/calamar, con tentáculos curvados y oscuros. En el centro de la composición destaca una forma luminosa similar a una mariposa o flor en tonos rosa-magenta brillante que contrasta con el fondo azul marino profundo. Hay partículas de luz y burbujas dispersas que sugieren un entorno submarino.

La carta incluye texto de reglas con dos efectos: una habilidad **Pasiva** que indica 'Ataca a todos los Adendei rivales' y un **Costo** que señala 'Esta carta se daña 1 pts antes de atacar'. Abajo aparece una frase de sabor en cursiva parcialmente legible. En la esquina superior izquierda se ve un icono de pata característico del tipo Adendei.

Las estadísticas visibles en la parte inferior son **1** (ataque) y **0** (defensa), representadas con iconos tipo dado/escudo. La etiqueta de tipo indica 'Adendei / Ártica'.

**Texto embebido:**
- `Ulmor, Ataque Fugaz`
- `Adendei / Ártica`
- `Pasiva: Ataca a todos los Adendei rivales.`
- `Costo: Esta carta se daña 1 pts antes de atacar.`
- `1`
- `0`

**Relación con el texto:** Ejemplifica visualmente el concepto de 'Ataque Múltiple' descrito en p25/b01, ya que es una carta que ataca a más de un objetivo pero se considera un solo ataque.

### `[p25/fig-02]` card-ungan-aleteo-glacial *(type: illustration)*
_bbox (%): x=8, y=14, w=28, h=28_  
**Legibilidad:** clear  

**Descripción:** Carta ilustrativa de Adendei titulada 'Ungan, Aleteo Glacial', situada en la zona central-izquierda de la página. Su marco es gris oscuro al estilo de las otras cartas Kódem.

La ilustración presenta una criatura alada con aletas translúcidas en tonos azules y violetas, con un cuerpo oscuro central. La figura aparece rodeada por espirales de energía luminosa rosa-magenta y azul que sugieren movimiento giratorio rápido. El fondo es violeta/rosa intenso con destellos azules y blancos que evocan una tormenta de hielo o magia glacial.

El texto de reglas muestra un efecto **Activa** que lee 'Si esta carta ataca, tu rival no puede actualizar descansos durante su siguiente turno'. La etiqueta de tipo indica 'Adendei / Gélida'. En la esquina superior izquierda se ve el icono de pata del tipo Adendei, y hay un código/indicador de rareza en la esquina inferior.

Las estadísticas visibles son **1** (ataque) y **2** (defensa). Esta carta ilustra el concepto de 'Gatillo de Efectos' porque su efecto se activa con la frase 'Si esta carta ataca...'.

**Texto embebido:**
- `Ungan, Aleteo Glacial`
- `Adendei / Gélida`
- `Activa: Si esta carta ataca, tu rival no puede actualizar descansos durante su siguiente turno.`
- `1`
- `2`

**Relación con el texto:** Ejemplifica el 'Gatillo de Efectos' (p25/b02) ya que su texto usa el patrón 'Si esta carta ataca...' que activa un efecto.

### `[p25/fig-03]` badge-seccion-6-7-efectos *(type: icon)*
_bbox (%): x=6, y=46, w=20, h=4_  
**Legibilidad:** clear  

**Descripción:** Etiqueta/badge bicolor de sección con forma de píldora redondeada. El lado izquierdo es un cuadrado naranja oscuro con el número '6.7' en blanco; el lado derecho es un rectángulo naranja más claro con el texto 'EFECTOS' en blanco mayúsculas. Este badge marca el inicio de la subsección 6.7 del rulebook.

Es el estilo gráfico consistente usado en todo el manual para introducir secciones numeradas, con la paleta naranja/coral característica de la identidad visual de Kódem TCG.

**Texto embebido:**
- `6.7`
- `EFECTOS`

**Relación con el texto:** Marca el inicio de la sección §6.7 EFECTOS (p25/b03).

### `[p25/fig-04]` ejemplo-efecto-activa *(type: infographic)*
_bbox (%): x=8, y=52, w=40, h=8_  
**Legibilidad:** clear  

**Descripción:** Recuadro rectangular con bordes redondeados que ilustra un ejemplo de efecto 'Activa' tal como aparecería en una carta real. El fondo es blanco/gris muy claro y el borde izquierdo tiene una línea o marca roja que resalta la palabra 'Activa:'.

La palabra 'Activa:' aparece en negritas al inicio, destacada con un contorno/subrayado rojo, seguido del texto explicativo del efecto. Este formato replica visualmente cómo se muestran los textos de efecto en las cartas del juego.

**Texto embebido:**
- `Activa: Todos los Adendei en el campo reciben descansos iguales a los indicados en su respectiva carta.`

**Relación con el texto:** Corresponde al text_block p25/b04; es la representación visual del ejemplo de efecto Activa.

### `[p25/fig-05]` ejemplo-efecto-pasiva *(type: infographic)*
_bbox (%): x=52, y=52, w=40, h=8_  
**Legibilidad:** clear  

**Descripción:** Recuadro rectangular con bordes redondeados que ilustra un ejemplo de efecto 'Pasiva'. Mismo estilo gráfico que el ejemplo 'Activa': fondo blanco/gris claro con borde izquierdo marcado en rojo que resalta la palabra 'Pasiva:'.

La palabra 'Pasiva:' aparece en negritas con contorno/subrayado rojo al inicio, seguida del texto descriptivo. El formato imita la apariencia del texto de efecto en las cartas de juego reales.

**Texto embebido:**
- `Pasiva: Los Adendei rivales solo pueden ser curados por efectos de Adendei.`

**Relación con el texto:** Corresponde al text_block p25/b05; es la representación visual del ejemplo de efecto Pasiva.

### `[p25/fig-06]` badge-generalidades *(type: icon)*
_bbox (%): x=38, y=62, w=24, h=4_  
**Legibilidad:** clear  

**Descripción:** Etiqueta/badge de subsección 'GENERALIDADES' con forma de píldora/cápsula alargada de bordes redondeados. A diferencia del badge de §6.7, este tiene solo contorno en naranja/coral sin relleno sólido (fondo blanco).

El texto 'GENERALIDADES' está centrado en tipografía serif mayúsculas, en color negro o naranja oscuro. Este estilo 'outline only' parece ser el formato estándar para subsecciones dentro de una sección numerada.

**Texto embebido:**
- `GENERALIDADES`

**Relación con el texto:** Introduce la subsección de generalidades dentro de §6.7 EFECTOS (p25/b06).

### `[p25/fig-07]` paginador-25 *(type: icon)*
_bbox (%): x=92, y=95, w=6, h=4_  
**Legibilidad:** clear  

**Descripción:** Pequeño recuadro cuadrado con esquinas redondeadas en color naranja/coral que contiene el número '25' centrado en blanco. Es el foliador/paginador estándar del rulebook, ubicado en la esquina inferior derecha de la página.

**Texto embebido:**
- `25`

**Relación con el texto:** Número de página.

## Notas de página

Página del rulebook Kódem TCG v5.1 que cierra el tema de Ataque Múltiple y Gatillo de Efectos, e inicia la sección §6.7 EFECTOS con la introducción al sistema Activa/Pasiva y la subsección GENERALIDADES sobre cómo declarar y resolver efectos. Incluye dos cartas de ejemplo (Ulmor y Ungan) y dos recuadros de ejemplo de texto de efecto.

### ⚡ Rulings aplicables a esta página (ver `rulings-v5.1.md`)

- **D17** (meta-regla) — `p25/b06`: *"Si una carta deja el campo y su efecto está condicionado a 'estar disponible', el efecto no continuará en uso."* Fundamento de M3 y de varios rulings subsiguientes.
- **M3 base** (2026-04-20) — Mixtla *"durante el resto del juego"* **no persiste post-campo** (D17 + `p25/b06`).
- **M3 residual** (2026-04-22) — **Resurrectos SÍ acumulan según redacción.** Si un Adendei con efecto persistente se vivifica múltiples veces, sus instancias se suman siempre que el texto lo permita (Marok de Flores y Tumbas = ejemplo canónico). Mixtla vivificada 2× → acumula +2/-2 cada vez. Sin cláusula restrictiva tipo *"sólo una vez por partida"*, stacking natural permitido.
- **D48** (2026-04-22, Logos por derivación) — **Re-vivificación múltiple: pausa-reanudación con acumulación.** Al salir del campo, el efecto se apaga (`p25/b06`). Al re-entrar, se genera nueva instancia que se suma a las activas. Criterio de redacción: *"mientras"* = condicional no-persiste; *"durante el resto del juego"* = estado global persiste y acumula. Compone `p25/b06` + D17 + M3 residual.

---

<a id="pagina-26"></a>

# Página 26 — (sin título)

**Verdict:** `ocr_preferred` · **Recomendación:** `re_extract` · **✓ Re-validada (pass 2)** · **Confianza:** 0.85 · **Acuerdo LLM↔OCR:** 0.82

**Sección(es):** §6.7

## Bloques de texto

### `[p26/b01]`
_pos: top_

> • Siempre que una carta menciona en su efecto una serie de acciones a realizar, será necesario que se cumplan por lo menos la primera de ellas en el orden en que dichas acciones se encuentran escritas en el texto de la carta.
>
> *(Ejemplo: Boras, Sacrificio).*

*Notas:* Continúa sección GENERALIDADES de §6.7 EFECTOS desde p25.

### `[p26/b02]`
_pos: middle_

> • Si una carta menciona en su efecto dos o más acciones con la conjunción "**y**", ambas acciones se consideran como un mismo efecto. E*jemplo: "Activa: Realiza acción A* **y** *B"*. Si no se puede resolver cualquiera de las dos acciones (sea A o B), no se puede declarar su efecto.
>
> *(Ejemplo: Sangre Pétrea, Rot Ígneo, Planta Carnívora)*
>
> *Ejemplo: Para que "Sangre pétrea" PUEDA declarar su efecto , debes poder hacer ambas acciones: abismar 1 Adendei rival* **y** *regresar todos los equipos en Zona Principal a Zona de equipos.*

*Notas:* Typo preservado: 'E*jemplo' (asterisco mal colocado). Espacio extra antes de coma en 'efecto ,'.

### `[p26/b03]`
_pos: middle_

> •Los efectos que indiquen: *"Daña "x" ptos. ..."*, se podrán aplicar a cartas que tengan menos ptos. de vida que los ptos. de daño a realizar, siempre y cuando tengan al menos **1** pto. de vida.
>
> Sin embargo no podrá recibir ptos. de daño negativos, no serán acumulativos para la carta que reemplace a la eliminadan ni transferibles a otras cartas aliadas o rivales.
>
> *Ejemplo: Si "Enis, Giro Gélido" tiene 1 pto. de vida podrá ser atacada por "Ariam, Escudo de Cempasúchi", sin embargo de los 2 ptos. de daño. que "Ariam" tiene en su estadística de atque solo recibirá 1 pto. de daño y "Enis" será enviada a Extinción.*

*Notas:* Typos preservados verbatim: '•Los' (sin espacio), 'eliminadan' (debería ser 'eliminada'), 'Cempasúchi' (falta la l final — en el texto corrido, no en el título de la carta), 'atque' (debería ser 'ataque'), 'daño.' con punto extra.

### `[p26/b04]`
_pos: bottom_

> •Efectos que indiquen: *"Cura "x" ptos. a una carta..."*, solo podrán aplicarse a cartas que tengan al menos **1** pto. de vida menos que la vida máxima de la carta.
>
> *Ejemplo: Para que "Ariam, Balance" PUEDA curar 1 pto. a una carta aliada, la carta aliada debe tener 5 ptos. o menos de vida al momento de ser curada (ya que la vida máxima de un Adendei es de 6 ptos.).*

*Notas:* Typo preservado: '•Efectos' (sin espacio después de bullet).

### `[p26/b05]`
_pos: top-right_

> Boras, Sacrificio
>
> Adendei Kósmico / Gélida
>
> **Pasiva:** Si esta carta es revelada, una carta rival recibe **2** *descansos*. Esa carta tiene su pasiva negada hasta volver a estar disponible.
>
> *Su final fue anunciado; Bóras tenía una última tarea pendiente.*
>
> 2 / 1
>
> 1DRMG-018

*Notas:* Carta ilustrativa. Palabra clave verificada letra por letra: 'descansos' (NO dócimas/décimas). Nombre de carta: 'Boras' (sin tilde en primera lectura; el flavor usa 'Bóras' con tilde).

### `[p26/b06]`
_pos: middle-left_

> Sangre Pétrea
>
> Rot
>
> **Activa-Rápida:** Abismo 1 Adendei rival y regresa todos los equipos en Zona Principal a Zona de Equipo.
>
> *Los secretos murmurados por el fluido iridiscente de los Rot.*
>
> D0OC-008

*Notas:* Carta ilustrativa. El texto usa 'Abismo' (1a persona) no 'Abisma' (imperativo) — verbatim.

### `[p26/b07]`
_pos: middle-center_

> Enis, Giro Gélido
>
> Adendei Catrín / Gélida
>
> **Pasiva:** Los Adendei Catrín reciben 1 descanso menos al atacar o usar Activa.
>
> *Remolinos de frío viento fueron convocados por la voluntad de Enis para proteger lugares ancestrales en los Geodomas.*
>
> 1 / 2
>
> FYTE-031

*Notas:* Carta ilustrativa. Confirma que 'descanso' (singular) es el término reglamentario. En el ejemplo esta carta aparece con vida actual 1 (corazón rojo sobre la carta).

### `[p26/b08]`
_pos: middle-right_

> Ariam, Escudo de Cempasúchil
>
> Adendei Catrín / Átlica
>
> **Pasiva:** Si esta carta es tomada del Mazo, protege 1 carta en el campo hasta el fin del siguiente turno.
>
> *Aún se habla entre los Adendei de un héroe invocando flores sagradas y elevando espíritus durante la Guerra Roja.*
>
> 2 / 1
>
> FYTE-030

*Notas:* Carta ilustrativa. Nombre CON L final: 'Cempasúchil'. Palabra clave verificada letra por letra: 'tomada' (NO turnada). Tipo 'Átlica' (no 'Atlos' como versión anterior).

### `[p26/b09]`
_pos: bottom-left_

> Ariam, Balance
>
> Adendei / Átlica
>
> **Activa:** Si esta carta ataca, cura 1 pto. a una carta aliada.
>
> *Toda gran historia tiene un inicio, la tuya comienza en estos vestigios secretos y ¿Quién sabe?... tal vez este camino podría ser tu primer paso en un viaje más grande de lo que imaginas...*
>
> 1 / 0
>
> 1COS-001

*Notas:* Carta ilustrativa. Stats 1/0 (ataque/vida).

## Figuras

### `[p26/fig-01]` card-boras-sacrificio *(type: illustration)*
_bbox (%): x=30, y=5, w=40, h=25_  
**Legibilidad:** clear — Texto de efecto y flavor verificados letra por letra con crop HD.  

**Descripción:** Carta ilustrativa de Adendei titulada 'Boras, Sacrificio' ubicada en la zona superior-central de la página. Marco estándar gris oscuro del TCG Kódem.

La ilustración muestra una criatura grande y peluda al estilo de un oso o bestia ártica, situada en un paisaje nevado/ártico. El fondo presenta una paleta fría dominada por azules y blancos con un acento naranja que sugiere un sol o luna en el horizonte, creando contraste cálido-frío característico del entorno Gélido.

El texto de reglas incluye una habilidad Pasiva: 'Si esta carta es revelada, una carta rival recibe 2 descansos. Esa carta tiene su pasiva negada hasta volver a estar disponible.' Incluye también una frase de sabor: 'Su final fue anunciado; Bóras tenía una última tarea pendiente.'

La etiqueta de tipo indica 'Adendei Kósmico / Gélida'. Las estadísticas visibles son 2 (ataque) y 1 (vida). Código de carta 1DRMG-018.

**Texto embebido:**
- `Boras, Sacrificio`
- `Adendei Kósmico / Gélida`
- `Pasiva`
- `descansos`
- `2`
- `1`
- `1DRMG-018`

**Relación con el texto:** Ejemplifica la regla de p26/b01: efectos con serie de acciones en orden específico.

### `[p26/fig-02]` card-sangre-petrea *(type: illustration)*
_bbox (%): x=25, y=35, w=30, h=22_  
**Legibilidad:** clear — Texto verificado con crop HD.  

**Descripción:** Carta de tipo Rot titulada 'Sangre Pétrea' situada en la zona media-izquierda de la página. Marco gris oscuro.

La ilustración presenta una criatura oscura/bestial con elementos viscosos y orgánicos, paleta dominada por verdes oscuros y negros con tonos terrosos. El aire es sombrío y orgánico, consistente con la estética del recurso Rot en el juego.

El texto de reglas muestra un efecto 'Activa-Rápida: Abismo 1 Adendei rival y regresa todos los equipos en Zona Principal a Zona de Equipo.' Este efecto ilustra la regla de la conjunción 'y' descrita en p26/b02. Flavor: 'Los secretos murmurados por el fluido iridiscente de los Rot.'

Como carta Rot no tiene estadísticas de ataque/vida. Código D0OC-008.

**Texto embebido:**
- `Sangre Pétrea`
- `Rot`
- `Activa-Rápida`
- `D0OC-008`

**Relación con el texto:** Ejemplifica la regla de p26/b02: efectos con conjunción 'y' que requieren ambas acciones para declararse.

### `[p26/fig-03]` card-enis-giro-gelido *(type: illustration)*
_bbox (%): x=33, y=58, w=26, h=22_  
**Legibilidad:** clear — Texto verificado con crop HD.  

**Descripción:** Carta Adendei titulada 'Enis, Giro Gélido' ubicada en la zona central-media de la página. Marco gris oscuro.

La ilustración muestra una criatura acuática tipo pez con elementos de hielo giratorio a su alrededor. La paleta es dominada por azules, cyan y verdes agua, evocando movimiento y frescura glacial.

En el recuadro de la carta se observa un marcador rojo sobre la vida, indicando que la carta tiene 1 pto. de vida actual (lesionada), lo cual es clave para ilustrar el ejemplo del texto. Las estadísticas base muestran 1 (ataque) y 2 (vida máxima).

La etiqueta de tipo indica 'Adendei Catrín / Gélida'. El texto Pasiva: 'Los Adendei Catrín reciben 1 descanso menos al atacar o usar Activa.' Flavor: 'Remolinos de frío viento fueron convocados por la voluntad de Enis para proteger lugares ancestrales en los Geodomas.' Código FYTE-031.

**Texto embebido:**
- `Enis, Giro Gélido`
- `Adendei Catrín / Gélida`
- `Pasiva`
- `descanso`
- `1`
- `2`
- `FYTE-031`

**Relación con el texto:** Ejemplifica la regla de p26/b03 sobre daño a cartas con vida menor que el daño entrante.

### `[p26/fig-04]` card-ariam-escudo-cempasuchil *(type: illustration)*
_bbox (%): x=60, y=58, w=26, h=22_  
**Legibilidad:** clear — Verificación CRÍTICA completada letra por letra: la palabra es 'tomada' (NO 'turnada'), nombre termina en 'Cempasúchil' (CON L). Discrepancia con el texto corrido de b03 que escribe 'Cempasúchi' sin L (typo del reglamento).  

**Descripción:** Carta Adendei titulada 'Ariam, Escudo de Cempasúchil' ubicada junto a 'Enis, Giro Gélido' en la zona central-derecha inferior de la página. Marco gris oscuro.

La ilustración presenta una criatura con temática floral de muerte (flores de cempasúchil y elementos protectores). La paleta combina morados, naranjas vibrantes (por el cempasúchil) y negros, evocando la iconografía mexicana del Día de Muertos.

La etiqueta de tipo indica 'Adendei Catrín / Átlica'. El texto Pasiva: 'Si esta carta es tomada del Mazo, protege 1 carta en el campo hasta el fin del siguiente turno.' Flavor: 'Aún se habla entre los Adendei de un héroe invocando flores sagradas y elevando espíritus durante la Guerra Roja.'

Las estadísticas visibles son 2 (ataque) y 1 (vida). Código FYTE-030.

**Texto embebido:**
- `Ariam, Escudo de Cempasúchil`
- `Adendei Catrín / Átlica`
- `Pasiva`
- `tomada`
- `2`
- `1`
- `FYTE-030`

**Relación con el texto:** Atacante del ejemplo en p26/b03; demuestra cómo un atacante con 2 ptos. de ataque solo inflige 1 pto. de daño cuando su objetivo (Enis) tiene solo 1 pto. de vida.

### `[p26/fig-05]` card-ariam-balance *(type: illustration)*
_bbox (%): x=25, y=78, w=32, h=20_  
**Legibilidad:** clear — Texto verificado con crop HD.  

**Descripción:** Carta Adendei titulada 'Ariam, Balance' ubicada en la zona inferior-izquierda de la página. Marco gris oscuro.

La ilustración muestra una criatura felina/mística con elementos de balance o dualidad. La paleta es dominada por rosas, magentas y morados oscuros con acentos negros, evocando una estética espiritual/elegante.

La etiqueta de tipo indica 'Adendei / Átlica'. El texto Activa: 'Si esta carta ataca, cura 1 pto. a una carta aliada.' Flavor: 'Toda gran historia tiene un inicio, la tuya comienza en estos vestigios secretos y ¿Quién sabe?... tal vez este camino podría ser tu primer paso en un viaje más grande de lo que imaginas...'

Las estadísticas visibles son 1 (ataque) y 0 (vida mostrada). Código 1COS-001.

**Texto embebido:**
- `Ariam, Balance`
- `Adendei / Átlica`
- `Activa`
- `cura`
- `1`
- `0`
- `1COS-001`

**Relación con el texto:** Ejemplifica la regla de p26/b04 sobre curación: solo aplicable a cartas con al menos 1 pto. menos de su vida máxima.

### `[p26/fig-06]` paginador-26 *(type: icon)*
_bbox (%): x=8, y=95, w=6, h=4_  
**Legibilidad:** clear  

**Descripción:** Pequeño recuadro cuadrado con esquinas redondeadas en color naranja/coral que contiene el número '26' centrado en blanco. Foliador/paginador estándar del rulebook, ubicado en la esquina inferior izquierda de la página.

**Texto embebido:**
- `26`

**Relación con el texto:** Número de página.

## Notas de página

Página del rulebook Kódem TCG v5.1 que continúa la subsección GENERALIDADES de §6.7 EFECTOS con cuatro reglas sobre: orden de acciones (ejemplificado con Boras, Sacrificio), conjunción 'y' para efectos múltiples (Sangre Pétrea), aplicación de daño con vida insuficiente (Enis vs Ariam Escudo de Cempasúchil), y aplicación de curación con vida máxima (Ariam, Balance). Contiene 5 cartas ilustrativas acompañando los textos. Se preservan typos: 'eliminadan', 'Cempasúchi' (falta la l — en texto corrido de b03 únicamente; el título de la carta SÍ lleva L final 'Cempasúchil'), 'atque', espacios faltantes en bullets '•Los' y '•Efectos', y un asterisco mal colocado en 'E*jemplo'. VERIFICACIONES CRÍTICAS re-extraction pass 2: (1) 'descansos' confirmado (NO dócimas/décimas) en efecto de Boras; (2) 'tomada' confirmado (NO turnada) en efecto de Ariam Escudo; (3) nombre de Ariam Escudo termina en 'Cempasúchil' CON L, pero el texto corrido del reglamento b03 la escribe 'Cempasúchi' SIN L (typo preservado verbatim); (4) 'eliminadan' confirmado en b03; (5) 'atque' confirmado en b03; (6) 'E*jemplo' con asterisco mal puesto confirmado en b02.


---

<a id="pagina-27"></a>

# Página 27 — (sin título)

**Verdict:** `ocr_preferred` · **Recomendación:** `re_extract` · **✓ Re-validada (pass 2)** · **Confianza:** 0.92 · **Acuerdo LLM↔OCR:** 0.88

**Sección(es):** §5.1, §6.7

## Bloques de texto

### `[p27/b01]`
_pos: top_

> Los puntos de curación que una carta recibe, están limitados por los ptos. de vida máxima que tiene la carta.

*Notas:* Regla de curación limitada a vida máxima. Continuación de tema iniciado en página anterior.

### `[p27/b02]`
_pos: top_

> *Ejemplo: Si "Enis, Giro Gélido" tiene 5 ptos. de vida, "Ariam, Curación Catrín" puede curar a "Enis" sin embargo, aunque "Ariam" cure 3 ptos. a un Adendei Catrín aliado, "Enis" solo recibirá 1 pto. de curación dejando la carta en 6 ptos de vida, ya que es la cantidad de ptos. de vida máxima que puede tener un Adendei.*

*Notas:* Ejemplo en cursiva. Typo preservado: '6 ptos de vida' sin punto después de 'ptos'.

### `[p27/b03]`
_pos: middle_

> •Efectos que indiquen: *"Desciende "x" ptos. de daño..."*, solo podrán aplicarse a cartas que al menos tengan **1** pto. de *daño* en su estadística de ataque.

*Notas:* Viñeta con bullet. '1' en negrita, 'daño' y frase entre comillas en cursiva.

### `[p27/b04]`
_pos: middle_

> *Ejemplo: Si estas son las 3 cartas que están en tu Zona Principal, para que "Brazalete de Rotanio" PUEDA pagar su costo y por ende utilizar su Activa-Rápida, debe descender 1 pto. a una carta aliada.*

*Notas:* Ejemplo en cursiva. 'PUEDA' en mayúsculas para énfasis.

### `[p27/b05]`
_pos: middle_

> *La carta aliada elegida para descender debe ser "Nánuk, Fiereza Kósmica" ya que tiene 3 ptos. de daño en su estadística de ataque, contrario a "Mizthe, Guía de Almas" y "Rhymir, Rayo Doble" que no tienen ptos. de daño en su estadística de ataque.*

*Notas:* Continuación del ejemplo anterior, en cursiva.

### `[p27/b06]`
_pos: middle_

> •Efectos que indiquen: *"Recibe "x" descansos..."*, solo podrán aplicarse a cartas en el campo siempre y cuando no se encuentren en sus descansos máximos por estadística.

*Notas:* Viñeta con bullet. Frase entre comillas en cursiva.

### `[p27/b07]`
_pos: middle_

> Una carta NO podrá recibir descansos por efecto si ya se encuentra en sus descansos máximos por estadística.

*Notas:* 'NO' en mayúsculas para énfasis.

### `[p27/b08]`
_pos: middle_

> Los descansos que una carta recibe están limitados por los descansos máximos que tiene la carta.

### `[p27/b09]` -Cartas en Zona Principal:
_pos: middle_

> **-Cartas en Zona Principal:** Podrán recibir descanso por efecto mientras estén en 1 descanso máximo *(Ver 5.1. Descansos)*.

*Notas:* Subtítulo en negrita. Referencia cruzada '(Ver 5.1. Descansos)' en cursiva.

### `[p27/b10]` -Protector:
_pos: middle_

> **-Protector:** Podrán recibir descanso por efecto mientras esté en 2 descansos máximo *(Ver 5.1. Descansos)*.

*Notas:* Subtítulo en negrita. Typo preservado: 'descansos máximo' (debería ser 'descansos máximos'). Referencia cruzada en cursiva.

### `[p27/b11]`
_pos: bottom_

> *Ejemplo:"Zaykan,Emboscada" puede recibir descanso siempre y cuando este disponible o en 1 descanso al momento de recibir el efecto, ya que el máximo de descansos que puede tener un Adendei es 2. Si "Zaykan" se encuentra en 1 descanso y recibe por efecto de una carta 2 descansos más, solo 1 se hará efectivo, llegando a su máximo de 2 descansos totales.*

*Notas:* Ejemplo en cursiva. Typos preservados: 'Ejemplo:"Zaykan,Emboscada"' sin espacios tras dos puntos y tras coma. Falta acento en 'este' (debería ser 'esté'). Establece que Adendei máx 2 descansos.

### `[p27/b12]`
_pos: bottom_

> *Ejemplo: "Karyn, Restauración" puede recibir descanso siempre y cuando esté disponible o en 2 descansos al momento de recibir el efecto, ya que el máximo de descansos que puede tener un Protector es 3.*

*Notas:* Ejemplo en cursiva. Establece que Protector máx 3 descansos.

### `[p27/b13]`
_pos: bottom_

> *Si Karyn se encuentra en 2 descansos y recibe por efecto de una carta 2 descansos más, solo 1 se hará efectivo llegando a su máximo de 3 descansos totales.*

*Notas:* Continuación del ejemplo anterior, en cursiva.

### `[p27/b14]`
_pos: middle-right_

> Nánuk, Fiereza Kósmica
>
> Adendei Kósmico / Gélida
>
> **Pasiva:** Esta carta no puede recibir marcas.
>
> *El poder había sido moldeado por Nánuk tanto tiempo, que ahora era solo suya.*
>
> 3 / 2
>
> BASE-003

*Notas:* Carta ilustrativa. Texto completo verbatim capturado con crop HD. 3 ptos. de ataque clave para ejemplo de b05.

### `[p27/b15]`
_pos: bottom-left_

> Zaykan, Emboscada
>
> Adendei / Lítica
>
> **Activa Rápida:** Si una carta aliada es atacada, esta carta y una carta rival en Zona Principal reciben 1 *descanso.*
>
> *La ambición rinde sus frutos.*
>
> 2 / 1
>
> KPRC-0005

*Notas:* Carta ilustrativa. Texto completo verbatim. Tipo 'Lítica'. Activa Rápida SIN guión (a diferencia de Brazalete que usa 'Activa-Rápida' con guión).

### `[p27/b16]`
_pos: middle-center_

> Brazalete de Rotanio
>
> Rot
>
> **Activa-Rápida:** Copia y usa el efecto y costo de cualquier Rot en Extinción.
>
> **Costo:** El *Adendei* equipado se daña 1 pto. y 1 carta aliada con más de **0** ptos. de ataque desciende (disminuye su ataque permanentemente) 1 pto. para usar esta Activa-Rápida.
>
> RAPB-0075

*Notas:* Carta ilustrativa. Texto completo verbatim. Activa-Rápida CON guión. Costo con paréntesis explicativo sobre 'descender'.

### `[p27/b17]`
_pos: bottom_

> 27

*Notas:* Número de página en negrita, pie de página.

## Figuras

### `[p27/fig-01]` carta-ariam-curacion-catrin *(type: illustration)*
_bbox (%): x=8, y=10, w=20, h=22_  
**Legibilidad:** clear — Nombre legible; detalles de estadísticas numéricas pequeños pero visibles.  

**Descripción:** Carta del juego Kódem titulada 'Ariam, Curación Catrín' ubicada en la parte superior izquierda de la página. Presenta un marco con estética vegetal/natural en tonos verdes oscuros y dorados, característico de la facción Catrín o afinidad curativa. La ilustración central muestra una criatura o personaje antropomorfo de tonos verdes con elementos mágicos brillantes alrededor, sugiriendo un efecto de curación o restauración.

En la parte superior de la carta aparece el nombre 'Ariam, Curación Catrín' junto con el coste de invocación. Las estadísticas inferiores incluyen valores de ataque/vida en cajas separadas en la parte baja del marco.

Esta carta es usada como ejemplo textual del bloque b02 para ilustrar la regla de que la curación está limitada por los puntos de vida máxima de la carta objetivo. Se menciona que 'Ariam' cura 3 puntos pero solo se aplica el máximo permitido.

**Texto embebido:**
- `Ariam, Curación Catrín`

**Relación con el texto:** Ilustra el ejemplo del bloque b02 sobre límite de curación. Muestra la carta que realiza el efecto de curación.

### `[p27/fig-02]` carta-enis-giro-gelido *(type: illustration)*
_bbox (%): x=32, y=10, w=20, h=22_  
**Legibilidad:** clear — Nombre y número de vida (5) legibles claramente.  

**Descripción:** Carta del juego Kódem titulada 'Enis, Giro Gélido' ubicada en la parte superior central-derecha. Presenta un marco en tonos azul-turquesa y verde claro, con estética de hielo o frío, característico de cartas con afinidad gélida. La ilustración central muestra una criatura turquesa con movimiento giratorio, evocando una tormenta de hielo o remolino congelante.

Sobre la carta, en la esquina superior derecha o superpuesto a la ilustración, hay un icono de corazón rojo con el número '5' dentro, que representa los puntos de vida actual de esta carta específica (5 ptos. de vida), elemento clave para el ejemplo textual.

Esta carta se usa como ejemplo receptor de curación en el bloque b02, donde se establece que aunque Ariam cure 3 puntos, Enis solo recibirá 1 punto porque ya tiene 5 de vida (máximo 6).

**Texto embebido:**
- `Enis, Giro Gélido`
- `5`

**Relación con el texto:** Ilustra el ejemplo del bloque b02, sirviendo como receptor de curación con vida 5/6. El '5' en el corazón indica vida actual.

### `[p27/fig-03]` carta-rhymir-rayo-doble *(type: illustration)*
_bbox (%): x=10, y=35, w=18, h=20_  
**Legibilidad:** clear — Legible aunque tonos oscuros dificultan ligeramente los detalles.  

**Descripción:** Carta del juego Kódem titulada 'Rhymir, Rayo Doble' ubicada en la zona media de la página. Presenta un marco en tonos oscuros/negros con detalles metálicos, característico de cartas sin afinidad específica o con elementos eléctricos. La ilustración central muestra una criatura o personaje asociado con rayos o energía eléctrica, con efectos visuales de descargas dobles.

Las estadísticas inferiores muestran valores donde el ataque aparece sin puntos de daño (0 ptos. de daño en ataque), lo cual es crucial para el ejemplo del bloque b05. Esto significa que no puede ser objetivo de efectos tipo 'Desciende x ptos. de daño'.

**Texto embebido:**
- `Rhymir, Rayo Doble`

**Relación con el texto:** Ejemplo negativo en bloque b05: no puede ser descendida porque no tiene puntos de daño en su estadística.

### `[p27/fig-04]` carta-mizthe-guia-de-almas *(type: illustration)*
_bbox (%): x=32, y=35, w=18, h=20_  
**Legibilidad:** clear — Bien visible, colores distintivos ayudan a identificarla.  

**Descripción:** Carta del juego Kódem titulada 'Mizthe, Guía de Almas' ubicada en la zona media de la página. Presenta un marco en tonos rosa-morado con acentos verdes y amarillos, una combinación cromática vívida y floral que sugiere afinidad espiritual o de almas. La ilustración central muestra una criatura o personaje colorido con elementos florales y etéreos, evocando el concepto de guía de almas al más allá.

Las estadísticas inferiores muestran valores donde el ataque no tiene puntos de daño, igual que Rhymir, lo cual la hace inelegible para efectos de descenso de daño.

**Texto embebido:**
- `Mizthe, Guía de Almas`

**Relación con el texto:** Ejemplo negativo en bloque b05: al igual que Rhymir, no tiene puntos de daño y no puede ser objetivo del efecto.

### `[p27/fig-05]` carta-nanuk-fiereza-kosmica *(type: illustration)*
_bbox (%): x=63, y=25, w=30, h=25_  
**Legibilidad:** clear — Texto completo verbatim capturado con crop HD.  

**Descripción:** Carta del juego Kódem titulada 'Nánuk, Fiereza Kósmica' ubicada en la zona media-derecha. Presenta un marco en tonos rojo-anaranjado oscuro con elementos cósmicos, característico de cartas con afinidad de daño o fiereza. La ilustración central muestra una criatura cósmica oscura con detalles rojos brillantes, evocando una energía fiera y agresiva.

La etiqueta de tipo indica 'Adendei Kósmico / Gélida'. El texto Pasiva dice: 'Esta carta no puede recibir marcas.' Flavor: 'El poder había sido moldeado por Nánuk tanto tiempo, que ahora era solo suya.'

Las estadísticas muestran 3 (ataque) / 2 (vida), dato crucial mencionado explícitamente en el bloque b05 (tiene 3 ptos. de daño en estadística de ataque). Esto la convierte en la única carta válida para ser objetivo del efecto 'Desciende x ptos. de daño' del Brazalete de Rotanio. Código BASE-003.

**Texto embebido:**
- `Nánuk, Fiereza Kósmica`
- `Adendei Kósmico / Gélida`
- `Pasiva`
- `marcas`
- `3`
- `2`
- `BASE-003`

**Relación con el texto:** Ejemplo positivo en bloque b05: única carta válida para descender porque tiene 3 ptos. de daño en ataque.

### `[p27/fig-06]` carta-brazalete-de-rotanio *(type: illustration)*
_bbox (%): x=50, y=40, w=25, h=22_  
**Legibilidad:** clear — Texto completo verbatim capturado con crop HD.  

**Descripción:** Carta del juego Kódem titulada 'Brazalete de Rotanio' ubicada en la zona derecha de la página. Presenta un marco en tonos dorados/neutros/grises, característico de cartas de tipo Rot/equipamiento. La ilustración central muestra una mano o brazo portando un brazalete dorado sobre un fondo oscuro, con detalles metalizados que refuerzan su carácter de objeto mágico.

Su tipo es 'Rot'. El texto Activa-Rápida: 'Copia y usa el efecto y costo de cualquier Rot en Extinción.' Costo: 'El Adendei equipado se daña 1 pto. y 1 carta aliada con más de 0 ptos. de ataque desciende (disminuye su ataque permanentemente) 1 pto. para usar esta Activa-Rápida.' Código RAPB-0075.

**Texto embebido:**
- `Brazalete de Rotanio`
- `Rot`
- `Activa-Rápida`
- `Copia`
- `Extinción`
- `Costo`
- `Adendei`
- `descender`
- `RAPB-0075`

**Relación con el texto:** Carta central del ejemplo en bloques b04 y b05: su costo requiere descender puntos de daño a una carta aliada.

### `[p27/fig-07]` carta-zaykan-emboscada *(type: illustration)*
_bbox (%): x=2, y=75, w=18, h=22_  
**Legibilidad:** clear — Texto completo verbatim capturado con crop HD.  

**Descripción:** Carta del juego Kódem titulada 'Zaykan, Emboscada' ubicada en la zona inferior izquierda. Presenta un marco en tonos verdes oscuros con detalles naturales. La ilustración central muestra un personaje en posición de emboscada, evocando el concepto de ataque sorpresa.

La etiqueta de tipo indica 'Adendei / Lítica'. El texto 'Activa Rápida: Si una carta aliada es atacada, esta carta y una carta rival en Zona Principal reciben 1 descanso.' Flavor: 'La ambición rinde sus frutos.'

Estadísticas: 2 / 1. Código KPRC-0005. En el contexto del ejemplo del bloque b11, Zaykan representa un Adendei con máximo 2 descansos.

**Texto embebido:**
- `Zaykan, Emboscada`
- `Adendei / Lítica`
- `Activa Rápida`
- `descanso`
- `2`
- `1`
- `KPRC-0005`

**Relación con el texto:** Ejemplo en bloque b11 que ilustra el máximo de descansos (2) para un Adendei.

### `[p27/fig-08]` carta-karyn-restauracion *(type: illustration)*
_bbox (%): x=53, y=65, w=20, h=22_  
**Legibilidad:** clear — Nombre y diseño claramente legibles.  

**Descripción:** Carta del juego Kódem titulada 'Karyn, Restauración' ubicada en la zona inferior central-derecha. Presenta un marco en tonos azul-celeste con acentos blancos y dorados, característico de cartas de tipo Protector con afinidad curativa o defensiva. La ilustración central muestra un personaje femenino en posición dinámica, posiblemente realizando un gesto de restauración o protección, con efectos visuales luminosos alrededor.

En la carta aparece el símbolo de escudo o icono distintivo del tipo Protector, que la diferencia de los Adendei estándar. En el contexto del ejemplo del bloque b12, Karyn representa un Protector que tiene un máximo de 3 descansos.

**Texto embebido:**
- `Karyn, Restauración`

**Relación con el texto:** Ejemplo en bloque b12 y b13 que ilustra el máximo de descansos (3) para un Protector.

## Notas de página

Página continúa temas de reglas generales de efectos sobre cartas: curación, descenso de puntos de daño y descansos por efecto. Establece dos reglas clave: (1) Adendei máximo 2 descansos, (2) Protector máximo 3 descansos. Incluye 8 cartas como ilustraciones de ejemplos. Múltiples typos preservados: 'este' sin acento en b11, 'ptos de vida' sin punto tras 'ptos' en b02, 'descansos máximo' (falta 's') en b10, espacios faltantes tras dos puntos y comas en ejemplos b11. RE-EXTRACTION PASS 2: agregados los textos completos verbatim de las 3 cartas clave — Nánuk Fiereza Kósmica (b14), Zaykan Emboscada (b15), Brazalete de Rotanio (b16) — que faltaban en la extracción previa. Detalle importante: 'Activa Rápida' (sin guión) en Zaykan vs 'Activa-Rápida' (con guión) en Brazalete — diferencia tipográfica del reglamento preservada verbatim.


---

<a id="pagina-28"></a>

# Página 28 — (sin título)

**Verdict:** `llm_preferred` · **Recomendación:** `accept` · **Confianza:** 0.92 · **Acuerdo LLM↔OCR:** 0.93

## Bloques de texto

### `[p28/b01]` Cartas con condiciones específicas:
_pos: top_

> Cartas con condiciones específicas: Una carta que tenga una condición ligada a un número de cartas (1,2,3, etc) en cuyo texto no especifique con palabras "exactamente", "solo", "Si y solo si", se considerara como que ese número es el número mínimo necesario para cumplir o no cumplir la condición mencionada en su texto, es decir como si fuera un "1 o más", "2 o más", "3 o más, etc.

*Notas:* Subtítulo en negrita. Typos: 'considerara' sin acento (debería ser 'considerará'), '3 o más, etc.' falta comilla de cierre tras 'más'.

### `[p28/b02]`
_pos: top_

> Ejemplo: "Zaren, Unión"

*Notas:* Ejemplo en cursiva, introduce la carta Zaren, Unión.

### `[p28/b03]` Activa:
_pos: top_

> Activa: Si tu rival no tiene 1 Token en Zona Principal, regresa un Adendei rival al tope del Mazo, y coloca… (en este caso si el rival tiene 1 o más Token se considera que no cumple la condición)

*Notas:* 'Activa:' en negrita. 'Token' y 'Adendei' en cursiva. 'no' en negrita dentro de la aclaración parentética en cursiva.

### `[p28/b04]` Costo:
_pos: middle_

> Costo: Debes tener 2 Rot en Extinción para usar su Activa. (En este caso si tiene 2 o más Rot en Extincion se considera que si cumple la condición).

*Notas:* 'Costo:' en negrita. 'Rot' en cursiva. 'si' en negrita dentro de la aclaración. Typo: 'Extincion' sin acento (debería ser 'Extinción').

### `[p28/b05]`
_pos: middle_

> Ejemplo: "Greah, Mazo Pétreo"

*Notas:* Ejemplo en cursiva, introduce la carta Greah, Mazo Pétreo.

### `[p28/b06]` Efectos de un solo uso:
_pos: middle_

> Efectos de un solo uso: Los efectos de un "solo uso por juego", se podrán usar una vez por jugador y si uno de esos efectos ya fue usado por algún jugador, ese jugador no podrá volver a declararlo aún si ese efecto es copiado por alguna de sus cartas.

*Notas:* Subtítulo en negrita. 'una vez por jugador' en negrita.

### `[p28/b07]` Vivificar
_pos: middle_

> Vivificar

*Notas:* Encabezado de sección en negrita.

### `[p28/b08]`
_pos: middle_

> Algunas cartas en Kódem son variantes resurecctas, de los personajes, es decir, que fueron traídas de regreso del Reino de la muerte. Esta cartas normalmente se relaacionan con el fecto de "VIVIFICAR"

*Notas:* Múltiples typos: 'resurecctas' (debería ser 'resurrectas'), 'Esta cartas' (debería ser 'Estas cartas'), 'relaacionan' con doble 'a' (debería ser 'relacionan'), 'fecto' (debería ser 'efecto'). 'VIVIFICAR' en mayúsculas.

### `[p28/b09]`
_pos: middle_

> Mixtla, Regreso | Ketzz, Plumas Inmortales | Ariam, Resurgimiento Fangoso

*Notas:* Nombres de cartas en cursiva separados por pipes '|', como pie de figura agrupando las 3 cartas de ejemplo mostradas abajo.

### `[p28/b10]` Vivificar:
_pos: bottom_

> Vivificar: Las cartas que explícitamente no mencionen en sus textos, que pueden vivificar, enviar cartas de Extinción a otras Zonas o Intercambiar cartas con cartas en Extinción, no podrán sacar cartas de Extinción a otras Zonas.

*Notas:* Subtítulo 'Vivificar:' en negrita. 'no' en negrita.

### `[p28/b11]`
_pos: bottom_

> Si una carta cuyo efecto se haya activado en campo no especifica cuándo termina, este terminará cuando la carta ya no se encuentre revelada en el campo.

### `[p28/b12]`
_pos: bottom_

> Si la condición para activar un efecto se cumple varias veces simultáneamente, el efecto sólo se activará una vez.

*Notas:* 'sólo' con acento (uso tradicional).

### `[p28/b13]`
_pos: bottom_

> 28

*Notas:* Número de página en negrita.

## Figuras

### `[p28/fig-01]` carta-zaren-union *(type: illustration)*
_bbox (%): x=10, y=12, w=22, h=28_  
**Legibilidad:** clear — Nombre y elementos principales bien visibles.  

**Descripción:** Carta del juego Kódem titulada 'Zaren, Unión' ubicada en la zona superior izquierda-central de la página. Presenta un marco característico de tipo Protector, con bordes distintivos y un esquema cromático que combina tonos azules oscuros con acentos rojos en la capa del personaje. La ilustración central muestra a un personaje masculino vistiendo una capa roja dramática, acompañado o controlando una criatura oscura a su lado, proyectando una estética de unión mágica entre humano y entidad.

El fondo de la ilustración presenta tonos azul oscuro y elementos atmosféricos que refuerzan el sentido místico del personaje. Al ser tipo Protector, la carta muestra el icono/símbolo distintivo de escudo o marca característica de Protectores en la parte superior.

Las estadísticas inferiores siguen el layout estándar de Kódem con cajas para ataque, coste y vida. En el contexto textual, esta carta se usa como ejemplo de 'condiciones específicas' en los bloques b02-b04, donde se analizan sus efectos 'Activa' y 'Costo' para ilustrar la regla de interpretación numérica (1 o más, 2 o más, etc.).

La composición visual enfatiza la capa roja como elemento focal contra el fondo oscuro, creando un contraste narrativo potente.

**Texto embebido:**
- `Zaren, Unión`

**Relación con el texto:** Ejemplo central del bloque b02, b03 y b04 sobre condiciones específicas. Su texto 'Activa' y 'Costo' ilustran la regla.

### `[p28/fig-02]` carta-greah-mazo-petreo *(type: illustration)*
_bbox (%): x=55, y=18, w=22, h=28_  
**Legibilidad:** clear — Legible con claridad; tonos cálidos y ornamentación llamativa.  

**Descripción:** Carta del juego Kódem titulada 'Greah, Mazo Pétreo' ubicada en la zona superior derecha-central. Presenta un marco de tipo Adendei con estética lítica/pétrea, característica de afinidad Titán o roca. La ilustración central muestra una criatura grande y robusta en tonos naranja y marrón, con elementos botánicos atípicos: flores o hongos púrpuras creciendo de su espalda/cuerpo, sugiriendo una simbiosis entre roca y naturaleza.

El fondo es oscuro, lo cual resalta los tonos cálidos de la criatura principal y los destellos púrpuras de las flores/hongos. El diseño comunica fuerza bruta y conexión con el entorno natural rocoso.

En el contexto textual, Greah se usa como ejemplo en el bloque b05 para ilustrar la sección de 'Cartas con condiciones específicas' referenciada en b01-b04. Probablemente tiene un costo o efecto ligado a una cantidad específica de cartas.

Las estadísticas inferiores siguen el layout estándar con recuadros de stats. El marco y colores la identifican claramente como Adendei pétreo o de afinidad Lítica.

**Texto embebido:**
- `Greah, Mazo Pétreo`

**Relación con el texto:** Segundo ejemplo del bloque b05 en la sección de condiciones específicas. Ilustra casos donde el número mínimo aplica.

### `[p28/fig-03]` carta-mixtla-regreso *(type: illustration)*
_bbox (%): x=8, y=58, w=20, h=26_  
**Legibilidad:** clear — Bien visible; nombre legible.  

**Descripción:** Carta del juego Kódem titulada 'Mixtla, Regreso' ubicada en la zona inferior izquierda. Presenta un marco de tipo Adendei con estética resurrecta o espectral, asociada probablemente a la afinidad Chiádesca o similar. La ilustración central muestra un murciélago o criatura voladora de tonos marrones y oscuros sobre un fondo verde-boscoso, con atmósfera nocturna y misteriosa, evocando el concepto de regreso desde el Reino de la muerte.

El fondo verde-oscuro genera un contraste que realza la silueta del personaje volador, mientras que la textura boscosa refuerza la sensación de retorno desde un reino oscuro. Las estadísticas inferiores muestran valores aproximados 2/1 u otros pequeños, típicos de cartas de soporte o baja inversión.

Esta carta funciona como una de las tres ilustraciones del concepto 'Vivificar' mencionado en bloques b07-b10, representando una variante resurrecta del personaje original Mixtla. Su aparición aquí ilustra visualmente cómo el juego crea variantes resurrectas de personajes existentes, un tema central de la sección Vivificar.

**Texto embebido:**
- `Mixtla, Regreso`

**Relación con el texto:** Una de las tres cartas del bloque b09 que ilustran el concepto de Vivificar como variante resurrecta.

### `[p28/fig-04]` carta-ketzz-plumas-inmortales *(type: illustration)*
_bbox (%): x=40, y=58, w=20, h=26_  
**Legibilidad:** clear — Nombre claro; ilustración vívida.  

**Descripción:** Carta del juego Kódem titulada 'Ketzz, Plumas Inmortales' ubicada en la zona inferior central. Presenta un marco de tipo Adendei con estética resurrecta, asociada probablemente a la afinidad Háumca o similar (alada/inmortal). La ilustración central muestra una criatura híbrida entre reptil y ave con plumas verdes brillantes y ojos rojos intensos, sobre un fondo oscuro con efectos de luz verde o energía mística, evocando el regreso desde la muerte con poder sobrenatural.

El contraste entre las plumas verdes luminosas y el fondo oscuro crea una composición visualmente impactante que refuerza el concepto de inmortalidad resurrecta. Los ojos rojos brillantes aportan un elemento siniestro pero poderoso.

Las estadísticas inferiores muestran valores típicos de Adendei resurrecto (aproximadamente 2/1). Esta carta forma parte del trío de ejemplos visuales del concepto Vivificar descrito en los bloques b07-b10, mostrando cómo las variantes resurrectas reciben nuevos nombres y atributos.

**Texto embebido:**
- `Ketzz, Plumas Inmortales`

**Relación con el texto:** Una de las tres cartas del bloque b09 que ejemplifican variantes resurrectas ligadas al efecto Vivificar.

### `[p28/fig-05]` carta-ariam-resurgimiento-fangoso *(type: illustration)*
_bbox (%): x=72, y=58, w=20, h=26_  
**Legibilidad:** clear — Nombre legible, atmósfera visual distintiva.  

**Descripción:** Carta del juego Kódem titulada 'Ariam, Resurgimiento Fangoso' ubicada en la zona inferior derecha. Presenta un marco de tipo Adendei con estética resurrecta y fangosa, asociada probablemente a la afinidad Pirca o Catrín corrompida. La ilustración central muestra una criatura verde fantasmal o espectral emergiendo entre vegetación oscura, con tonos verdes y negros dominantes que sugieren putrefacción o resurgimiento desde lo pantanoso.

Esta es claramente una variante resurrecta del personaje Ariam (originalmente mostrado en la página 27 como 'Ariam, Curación Catrín'), lo que refuerza el concepto narrativo de que los personajes regresan del Reino de la muerte con nuevas formas y afinidades. La transformación de una curandera Catrín a una entidad fangosa resurrecta es un elemento narrativo potente.

El contraste visual con la versión anterior de Ariam es notable: de colores verdes vivos/luminosos a tonos oscuros y putrefactos. Las estadísticas inferiores muestran valores típicos de Adendei resurrecto (aproximadamente 2/1).

**Texto embebido:**
- `Ariam, Resurgimiento Fangoso`

**Relación con el texto:** Una de las tres cartas del bloque b09 que ejemplifican el concepto Vivificar. Variante resurrecta de la Ariam mostrada en p27.

## Notas de página

Página con tres secciones reguladas: (1) Cartas con condiciones específicas (interpretación numérica como 'N o más' salvo palabras clave 'exactamente', 'solo', 'Si y solo si'), (2) Efectos de un solo uso (una vez por jugador, no duplicables por copia), (3) Vivificar (mecánica de variantes resurrectas que regresan del Reino de la muerte). También contiene dos reglas finales sin heading explícito: duración de efectos sin especificación y activación única cuando condición se cumple simultáneamente. Múltiples typos detectados: 'considerara' sin acento, 'Extincion' sin acento, 'resurecctas' con doble c, 'Esta cartas' (falta s), 'relaacionan' con doble a, 'fecto' (falta e). Cinco cartas ilustradas: Zaren Unión y Greah Mazo Pétreo (arriba, ejemplos de condiciones), Mixtla Regreso, Ketzz Plumas Inmortales y Ariam Resurgimiento Fangoso (abajo, ejemplos de Vivificar).


---

<a id="pagina-29"></a>

# Página 29 — (sin título)

**Verdict:** `llm_preferred` · **Recomendación:** `accept` · **Confianza:** 0.88 · **Acuerdo LLM↔OCR:** 0.94

**Sección(es):** §6.7.1, §6.7.2

## Bloques de texto

### `[p29/b01]` 6.7.1 ACTIVAS
_pos: top-left_

> 6.7.1 ACTIVAS

*Notas:* Encabezado de sección en color azul/destacado

### `[p29/b02]`
_pos: top-left-column_

> · Se usan una vez por turno.
> · Se declaran solamente durante la Fase de Batalla.
> · Son opcionales sólo si en su texto se especifica "puede", de otra forma se deben declarar al momento de declarar ataque durante la Subfase de Declaración.
> · Se puede declarar una Activa sin atacar sólo cuando su efecto no esté condicionado a su ataque.
> · Si la Activa tiene condiciones y no se cumplen, se podrá atacar sin usar dicha Activa.
> · La Activa de una carta y la de sus cartas Equipo pueden considerarse una única Activa. Esto permite usar ambas cartas en el mismo turno o sólo 1 de ellas (respetando los tiempos de uso individualmente).
> · Las cartas con estadística de descanso entran a sus descansos respectivos al final del turno si usaron su Activa.

*Notas:* Lista de reglas con viñetas sobre las Activas. 'opcionales' en negritas; 'puede' en cursiva; 'atacar', 'descanso(s)' en cursiva.

### `[p29/b03]`
_pos: middle-left_

> Activa-Rápida: Si 1 carta aliada es atacada, desvia el ataque a esta carta.

*Notas:* Recuadro destacado mostrando un ejemplo de texto tal como aparecería en una carta. 'Activa-Rápida' en negritas.

### `[p29/b04]`
_pos: middle-center_

> · Las Activas-Rápidas funcionan igual que las Activas, pero también se pueden usar durante el turno del rival (como respuesta) y se resuelven tan pronto son declaradas.

*Notas:* 'Activas-Rápidas', 'también' y 'se resuelven tan pronto son declaradas' en negritas.

### `[p29/b05]` 6.7.2 PASIVAS
_pos: middle-left_

> 6.7.2 PASIVAS

*Notas:* Encabezado de sección en color azul/destacado

### `[p29/b06]`
_pos: middle-left-column_

> · Se pueden usar varias y múltiples veces por turno.
> · A diferencia de las Activas, una carta no descansará al final del turno por declarar una Pasiva.
> · En caso de que se cumplan condiciones para el uso de una o más Pasivas al mismo tiempo, el jugador en turno tiene prioridad para la declaración y resolución de una Pasiva y posteriormente se intercalarán las declaraciones y resoluciones de una Pasiva por jugador (Este criterio aplicará también para la resolución de una o más Pasivas-Rápidas).

*Notas:* 'no descansará', 'por declarar', 'mismo tiempo', 'jugador en turno tiene prioridad' en negritas.

### `[p29/b07]` Cartas Tomadas
_pos: bottom-left_

> Cartas Tomadas: Las Pasivas de cartas tomadas en Fase de Batalla podrán ser declaradas en Fase Post siempre y cuando las cartas hayan cumplido sus condiciones durante Batalla y no podrán ser declaradas si son colocadas en el campo.

*Notas:* 'Cartas Tomadas' en negritas como subsección.

### `[p29/b08]` Pasivas Opcionales
_pos: bottom-left_

> Pasivas Opcionales: Estas no se encuentran indicadas en negritas, pero se identifican porque no indican un momento preciso de uso y pueden ser declaradas exclusivamente durante tu Fase Previa una vez por turno.

*Notas:* 'Pasivas Opcionales' en negritas como subsección.

### `[p29/b09]` Pasivas-Rápidas
_pos: bottom-left_

> Pasivas-Rápidas: Se usan durante cualquier turno, únicamente en respuesta a revelación, eliminación de cartas o declaración de otras Pasivas.
> Se resuelven tan pronto son declaradas.
> Si no indican el momento preciso de uso, solo podrán ser declaradas una vez por turno, en fase previa o en cualquier fase posterior a Fase de Batalla.

*Notas:* 'Pasivas-Rápidas' en negritas como subsección.

### `[p29/b10]`
_pos: bottom-footer_

> 29

*Notas:* Número de página

## Figuras

### `[p29/fig-01]` carta-yogg-vs-rhymir-rayo-contra-luz *(type: illustration)*
_bbox (%): x=62, y=4, w=36, h=22_  
**Legibilidad:** needs_enhance — El texto interno de la carta es pequeño y difícil de leer completamente en la resolución disponible; los valores de estadísticas son aproximaciones.  

**Descripción:** Ilustración de una carta del juego Kódem TCG, colocada en la esquina superior derecha de la página como ejemplo visual de la sección 6.7.1 ACTIVAS. La carta muestra un combate épico entre dos figuras mitológicas o divinas en medio de un choque de energías contrastantes: un rayo de luz dorada/blanca enfrentándose a una energía oscura/violeta, evocando la naturaleza dualista del título 'Rayo Contra Luz'.

La composición presenta a las dos entidades (Yogg y Rhymir) en planos opuestos, separadas por una explosión de energía central que actúa como punto focal. El estilo artístico es dramático y detallado, con contrastes fuertes entre luces y sombras que refuerzan la temática de oposición. Los colores dominantes son dorados, blancos y azules luminosos para la sección de luz, contrastando con morados oscuros, negros y rojizos para la sección de oscuridad/energía.

En la parte inferior de la carta se observan las estadísticas típicas del juego: valores de ataque, descansos y vida separados por iconos característicos. El nombre de la carta aparece en la parte superior en tipografía estilizada, junto con el tipo/subtipo de carta (Adendei-Activa o similar, probablemente 'Adendei/Chakrica-Activa').

La carta incluye texto de habilidad tipo Activa que ilustra cómo funciona esta mecánica en la práctica, complementando visualmente las reglas escritas sobre Activas que se exponen en la página. El borde de la carta tiene el diseño estándar del juego con marcos decorativos y frames propios del TCG Kódem.

La iluminación dramática y el estilo pictórico sugieren una estética de fantasía épica/mitológica consistente con la ambientación del juego. La carta sirve como referencia visual para que los jugadores puedan identificar cómo se presenta una habilidad Activa en una carta real.

**Texto embebido:**
- `Yogg vs Rhymir, Rayo Contra Luz`
- `Adendei / Chakrica-Activa`
- `Activa`
- `Costo`
- `1 | 0 | 4`

**Relación con el texto:** Ejemplo visual de la sección 6.7.1 ACTIVAS. Muestra cómo aparece una habilidad Activa en una carta real del juego.

### `[p29/fig-02]` recuadro-ejemplo-activa-rapida *(type: infographic)*
_bbox (%): x=3, y=35, w=42, h=10_  
**Legibilidad:** clear  

**Descripción:** Recuadro destacado con borde decorativo (posiblemente rojo o con elementos de marco de carta) que muestra un ejemplo literal de cómo se imprime el texto de una habilidad Activa-Rápida en una carta del juego. Funciona como pieza didáctica para que el lector identifique la sintaxis exacta de este tipo de habilidad cuando la vea en el campo de juego.

El contenido del recuadro es exclusivamente textual, presentando 'Activa-Rápida:' como cabecera en negritas seguida del efecto descrito. El formato emula fielmente cómo aparece el texto en una carta real del TCG, con 'Activa-Rápida' resaltada tipográficamente para diferenciarla del resto del texto de habilidad.

Este tipo de recuadro es común en manuales de juegos de cartas para mostrar ejemplos sin necesidad de reproducir la carta completa. Se coloca estratégicamente entre los párrafos de reglas para reforzar el entendimiento visual inmediato.

La tipografía es consistente con el estilo del rulebook y probablemente usa la misma fuente que el cuerpo del documento, diferenciándose solo en el fondo/borde que lo delimita como un ejemplo.

**Texto embebido:**
- `Activa-Rápida: Si 1 carta aliada es atacada, desvia el ataque a esta carta.`

**Relación con el texto:** Apoya visualmente el párrafo b04 sobre Activas-Rápidas, mostrando cómo se ve este texto en una carta.

### `[p29/fig-03]` carta-kaykas-sorpresa-pirica *(type: illustration)*
_bbox (%): x=62, y=50, w=36, h=22_  
**Legibilidad:** needs_enhance — Texto interno de la carta difícil de leer con precisión en resolución reducida.  

**Descripción:** Carta del juego Kódem TCG que muestra a 'Kaykas, Sorpresa Pirica', una criatura relacionada con el elemento fuego/pirotecnia. La ilustración presenta una figura felina, ígnea o dragónica rodeada por un aura de llamas intensas en tonos rojizos, anaranjados y amarillos brillantes, que sugiere explosividad y movimiento.

La criatura aparece en una pose dinámica, posiblemente saltando o atacando, con estelas de fuego que refuerzan la sensación de sorpresa y velocidad implícita en su nombre 'Sorpresa Pirica'. El fondo contrasta con los tonos cálidos del sujeto central, mostrando probablemente un ambiente oscuro que hace resaltar el resplandor del fuego.

El estilo artístico es característico del TCG: ilustración digital o pintura detallada con iluminación dramática y énfasis en los elementos de poder mágico/elemental. Los efectos de partículas de fuego y chispas alrededor del personaje le dan profundidad y dinamismo.

La carta muestra en su tipo/subtipo 'Adendei / Pirca' (o similar), marcando su pertenencia a la familia de cartas Adendei relacionadas con el elemento pirico. Incluye una habilidad Pasiva que se activa cuando la carta es tomada del Mazo, con efecto de ganar cartas rivales.

En la parte inferior se aprecian las estadísticas estándar de la carta y el texto de sabor en cursiva que da contexto narrativo al personaje. La composición es vertical estándar del formato TCG.

**Texto embebido:**
- `Kaykas, Sorpresa Pirica`
- `Adendei / Pirca`
- `Pasiva`
- `1 | 0 | 4`

**Relación con el texto:** Ejemplo visual para la sección 6.7.2 PASIVAS, mostrando una carta con habilidad Pasiva.

### `[p29/fig-04]` carta-curacion-vegetal *(type: illustration)*
_bbox (%): x=3, y=60, w=35, h=20_  
**Legibilidad:** needs_enhance — Texto interno pequeño y difícil de leer con precisión.  

**Descripción:** Carta del juego Kódem TCG titulada 'Curación Vegetal', que representa un hechizo o efecto de soporte de tipo vegetal/naturaleza. La ilustración principal muestra un gran árbol luminoso, majestuoso y antiguo, en medio de un bosque místico iluminado por luces suaves y doradas que atraviesan las ramas.

Las tonalidades dominantes son verdes esmeralda, dorados cálidos y toques de ámbar, creando una atmósfera etérea y sanadora. Pequeñas partículas luminosas o esporas flotan alrededor del árbol, reforzando el concepto de curación natural y energía vital. El follaje del árbol parece brillar con luz propia.

El estilo artístico combina fantasía natural con un toque onírico: el bosque tiene profundidad visual con capas de vegetación y atmósfera brumosa. La composición guía el ojo hacia el tronco central del árbol, que actúa como fuente de energía curativa.

La carta, al ser de tipo hechizo/apoyo, probablemente no tiene estadísticas de combate sino únicamente texto de habilidad Pasiva describiendo su efecto curativo. Incluye un texto de sabor en cursiva que contextualiza narrativamente la relación del personaje/efecto con los bosques.

El estilo del arte es consistente con la estética general del juego: ilustración detallada, profesional, con narrativa visual clara. Se coloca en la columna izquierda inferior como contrapeso visual a la carta Kaykas del lado derecho.

**Texto embebido:**
- `Curación Vegetal`
- `Pasiva`

**Relación con el texto:** Ejemplo visual para la sección 6.7.2 PASIVAS, mostrando una carta con efecto de Pasiva tipo curación.

### `[p29/fig-05]` carta-chapalob-el-anciano *(type: illustration)*
_bbox (%): x=62, y=78, w=36, h=20_  
**Legibilidad:** needs_enhance — Texto de la habilidad y texto de sabor difíciles de leer con precisión en resolución reducida.  

**Descripción:** Carta del juego Kódem TCG titulada 'Chapalob, El Anciano', que muestra a un personaje de aspecto chamánico o sabio anciano, vinculado con el tipo 'Adendei Tejón / Feral'. La ilustración presenta a una figura envejecida con rasgos que combinan lo humano con elementos animales, particularmente del tejón (característica del subtipo Tejón).

El personaje lleva adornos tribales, incluyendo un collar de piedras ancestrales que aparece mencionado en el texto de sabor de la carta. Los tonos predominantes son oscuros: marrones, grises, negros y algún destello de energía mágica (azul, verde o violeta) que indica la presencia de magia ancestral o shamánica.

La composición enfatiza el rostro del anciano, con expresión de sabiduría o solemnidad, y sus manos posiblemente sosteniendo artefactos mágicos o ejecutando gestos rituales. La iluminación es de bajo contraste con luces puntuales que destacan elementos clave como los ojos y el collar.

El estilo artístico es más sombrío y místico que otras cartas de la página, transmitiendo la seriedad y profundidad que caracteriza al personaje como figura de poder espiritual. La ambientación sugiere una choza, cueva o bosque nocturno, con elementos que evocan tradición indígena o tribal.

La habilidad de la carta es una Pasiva-Rápida que niega la Pasiva de otra carta hasta el final del turno rival, siendo un ejemplo visual directo de la subsección 'Pasivas-Rápidas' descrita en el bloque b09.

**Texto embebido:**
- `Chapalob, El Anciano`
- `Adendei Tejón / Feral`
- `Pasiva-Rápida`
- `1 | 0 | 4`

**Relación con el texto:** Ejemplo visual clave para la subsección 'Pasivas-Rápidas', mostrando una carta real con este tipo de habilidad.

## Notas de página

Página dedicada a las reglas de ACTIVAS (§6.7.1) y PASIVAS (§6.7.2). Contiene 5 elementos visuales: una carta principal Yogg vs Rhymir arriba-derecha, un recuadro textual con ejemplo de Activa-Rápida, y tres cartas más distribuidas (Kaykas, Curación Vegetal, Chapalob) como ejemplos visuales de las reglas expuestas. El diseño alterna columnas de texto con cartas ilustrativas. Los encabezados de sección (6.7.1 y 6.7.2) usan un color distintivo (azul/destacado).

### ⚡ Rulings aplicables a esta página (ver `rulings-v5.1.md`)

- **D43** (2026-04-22) — **Pasivas opcionales vs no-opcionales** se distinguen **semánticamente** (texto con *"puedes"*/*"si quieres"* = opcional). Opcional: si se olvida declarar en ventana, se pierde el efecto para ese disparo. No hay criterio tipográfico. Aplica a `p29/b08`.
- **M12 residual** (2026-04-22) — **Pasiva-Rápida sólo da velocidad.** No altera la regla de no-descanso de `p29/b06`: *"una carta no descansará al final del turno por declarar una Pasiva."* La promoción a "rápida" cambia la ventana de uso, no la economía de descansos. Diferencia vs Activa-Rápida: el tipo base determina descanso (Activa descansa, Pasiva no).
- **M21** (tentativo 2026-04-19) — El glosario "Pasiva no actualizan descansos" aplica a descansos automáticos; los costos de descanso impresos son pagos declarados (D17 supersede).
- **M22** (tentativo 2026-04-19) — Glosario v5.2 debe usar el texto completo de `p29/b09` para Pasivas-Rápidas (incluye *"declaración de"* + cláusula de uso único por turno).

---

<a id="pagina-30"></a>

# Página 30 — (sin título)

**Verdict:** `llm_preferred` · **Recomendación:** `accept` · **Confianza:** 0.9 · **Acuerdo LLM↔OCR:** 0.95

**Sección(es):** §6.7.3, §6.8

## Bloques de texto

### `[p30/b01]` 6.7.3 Costos
_pos: top-left_

> 6.7.3 Costos

*Notas:* Encabezado de sección. 'Costos' en negritas.

### `[p30/b02]`
_pos: top-left-column_

> Los costos son requisitos para usar efectos o atacar y se pagan al declarar el efecto o ataque.
> · No se consideran efectos.
> · Un costo no puede ser pagado para más de 1 efecto al mismo tiempo.
> · Si el costo especifica dañar puntos de vida, las cartas deben tener al menos 1 punto de vida para que se considere pagado.
> · Los costos son pagados posterior a la Subfase de Declaración, antes de llevar a cabo el efecto/ataque.
> · Si un costo no especifica si se paga al atacar o al usar su efecto, se entenderá que el costo aplica al declarar cualquiera de las dos acciones. Si ambas acciones se declaran simultáneamente, el costo se pagará solo una vez.
> · Para pagar un costo que permita declarar un ataque y/o Activa, la carta deberá estar disponible.

*Notas:* Lista de reglas con viñetas sobre Costos. 'no' en negritas en 'Un costo no puede'; 'dañar' en cursiva; '1' en negritas; 'Activa' en negritas.

### `[p30/b03]`
_pos: middle-left_

> Los costos siempre deben pagarse de forma íntegra, si por algún motivo no hay posibilidad de pagar un costo en su totalidad no se puede declarar la acción o el efecto en cuestión.

*Notas:* Recuadro destacado con texto entero en negritas.

### `[p30/b04]` 6.8 Restricciones e Interacciones
_pos: middle-left_

> 6.8 Restricciones e Interacciones

*Notas:* Encabezado de sección. 'Restricciones e Interacciones' en negritas.

### `[p30/b05]`
_pos: middle-left_

> Existen situaciones en el juego que no permiten determinadas jugadas.
> Estas restricciones se dan principalmente por las interacciones de los efectos, costos o por las características particulares de cierto tipo de cartas por ejemplo Tokens, Protectores, etc. Dichas restricciones no pueden ser ignoradas una vez que se establecen. En caso de que existan 2 o más situaciones donde estas restricciones se contrapongan, predominará aquella restricción que se haya puesto primero en juego.
> Restringir: Bajo ciertas condiciones, se limita el uso de los efectos o condiciones de la(s) carta(s) restringida(s).

*Notas:* 'Tokens', 'Protectores' y 'Restringir:' en cursiva. '2' en negritas.

### `[p30/b06]` Generalidades de las Restricciones e Interacciones
_pos: middle-center_

> Generalidades de las Restricciones e Interacciones

*Notas:* Encabezado de subsección en recuadro/destacado en negritas.

### `[p30/b07]`
_pos: middle-left_

> 1. No pueden existir 2 o más cartas con el mismo nombre, arte y/o efecto impreso en tu Mazo General.

*Notas:* Regla 1 de la sección. '1.' y 'No' en negritas.

### `[p30/b08]`
_pos: middle-center_

> Ejemplo: Carta impresa con diferente arte, pero mismo nombre y efecto.

*Notas:* Pie de imagen en cursiva para la figura de las dos cartas Arian: Balance.

### `[p30/b09]`
_pos: bottom-left_

> 2. Si un jugador tiene 2 cartas con el mismo nombre, arte y/o efecto reveladas en su Ecosistema, debe seleccionar una de ellas y enviarla al fondo del Mazo (Generalmente esta situación se da al realizar cambio de cartas entre tú Zona Principal y la del rival).
> 3. Ninguna carta ajena al jugador puede estar en su Mazo o en su Extinción.
> 4. No se pueden seleccionar como objetivo de ataques o efectos a cartas que no tengan la característica o estadística necesaria para aplicarlos. Ejemplos:

*Notas:* Reglas 2, 3 y 4. '2.', '3.', '4.' y '2' en negritas. 'Ejemplos:' en cursiva.

### `[p30/b10]`
_pos: bottom-footer_

> 30

*Notas:* Número de página

## Figuras

### `[p30/fig-01]` dos-cartas-arian-balance-mismo-nombre-diferente-arte *(type: illustration)*
_bbox (%): x=28, y=58, w=44, h=24_  
**Legibilidad:** needs_enhance — El texto interno de las cartas (efectos, estadísticas exactas) es difícil de leer con precisión en la resolución disponible; el nombre y los elementos principales son legibles.  

**Descripción:** Ilustración comparativa que muestra dos cartas del juego Kódem TCG colocadas una al lado de la otra. Ambas tienen exactamente el mismo nombre 'Arian: Balance' y comparten el mismo efecto impreso, pero presentan ilustraciones artísticas completamente diferentes. Esta figura funciona como ejemplo didáctico directo de la regla 1 del apartado 'Generalidades de las Restricciones e Interacciones'.

La carta de la izquierda muestra a una criatura de apariencia marina/acuática con cuerpo serpentino o dragónico en tonos azulados y turquesa, emergiendo de o nadando en un entorno acuático con ondulaciones azules. La iluminación es fría y sugiere profundidad marina. El arte tiene estilo orgánico fluido con énfasis en movimiento acuático.

La carta de la derecha presenta al mismo personaje o entidad 'Arian: Balance' pero con una ilustración radicalmente distinta: una criatura alada, posiblemente dracónica, con alas extendidas en un fondo vibrante con tonalidades moradas, rojizas y ámbar, sugiriendo un ambiente más cálido o etéreo/celestial. La pose es más imponente y frontal.

Ambas cartas comparten el mismo diseño de frame/borde, tipografía del nombre, tipo/subtipo (Adendei/Ático o similar), y probablemente las mismas estadísticas numéricas en la parte inferior (ataque, descansos, vida). El único elemento que varía entre ellas es la ilustración artística central.

La composición de la figura refuerza visualmente el mensaje de la regla: aunque el arte sea distinto, mientras el nombre y el efecto sean idénticos, la regla de 'no puede haber dos cartas iguales en el Mazo General' se aplica. Es una imagen de alto valor pedagógico porque muestra un caso concreto que podría generar confusión a jugadores principiantes.

Las dos cartas están centradas en la página horizontalmente, ligeramente inclinadas o en pose frontal, con separación visual clara entre ellas. Debajo aparece el pie de imagen que explicita la lectura correcta del ejemplo.

**Texto embebido:**
- `Arian: Balance`
- `Adendei / Ático`
- `Activa`

**Relación con el texto:** Ejemplo visual directo de la regla 1 de §6.8 (Generalidades de las Restricciones e Interacciones): ilustra que dos cartas con mismo nombre y efecto pero distinto arte siguen considerándose la misma carta y no pueden coexistir en el Mazo General.

## Notas de página

Página que cierra la subsección §6.7.3 sobre Costos y abre §6.8 Restricciones e Interacciones, con sus Generalidades enumeradas. Contiene un único bloque visual importante: dos cartas Arian: Balance con distinto arte pero mismo nombre, usado como ejemplo de la regla 1. El layout es mayormente textual con listas numeradas y con viñetas, y un recuadro de énfasis para la regla de pago íntegro de costos.


---

<a id="pagina-31"></a>

# Página 31 — (sin título)

**Verdict:** `both_agree` · **Recomendación:** `accept` · **Confianza:** 0.88 · **Acuerdo LLM↔OCR:** 0.96

**Sección(es):** §6.8

## Bloques de texto

### `[p31/b01]`
_pos: top-left_

> 4.1 No se pueden declarar ataques a carta que no tengan estadística de vida máxima.
> 4.2 No se puede dar descansos a cartas que no tengan estadística de descanso. Sin embargo, sí se pueden dar descansos a cartas que se encuentren ocultas en Zona Principal siempre que no sean equipos.
> 4.3 No se puede Feralizar a una carta que no tiene Energía.
> 4.4 No es posible negar un efecto de una carta que no tenga efecto.

*Notas:* Subreglas 4.1 a 4.4 (continuación del punto 4 de la página anterior). Los números '4.1', '4.2', '4.3', '4.4' en cursiva; 'descansos', 'descanso', 'negar' en cursiva.

### `[p31/b02]`
_pos: top-left_

> 5. Sólo las cartas reveladas en el campo pueden hacer uso de sus efectos.

*Notas:* Regla 5. '5.' en negritas.

### `[p31/b03]`
_pos: top-left_

> 6. Si una carta es ocultada por efecto, vuelve a sus a estadísticas base y finalizará la negación de su efecto si se encuentra negado.

*Notas:* Regla 6. '6.' en negritas; 'ocultada', 'negación' en cursiva. Nota: 'vuelve a sus a estadísticas' parece un typo en el original (doble 'a').

### `[p31/b04]`
_pos: top-left_

> 7. Aún si una carta fue ocultada se debe resolver la declaración de su ataque.

*Notas:* Regla 7. '7.' en negritas; 'ocultada' en cursiva.

### `[p31/b05]`
_pos: middle-left_

> 8. Las cartas ocultas no podrán resolver efectos excepto si su declaración se hizo ese turno y su resolución durará máximo hasta el final del mismo turno.

*Notas:* Regla 8. '8.' en negritas; 'ocultas' en cursiva.

### `[p31/b06]`
_pos: middle-left_

> 9. Las cartas ocultas no se podrán considerar un tipo de carta en específico.

*Notas:* Regla 9. '9.' en negritas; 'ocultas' en cursiva.

### `[p31/b07]`
_pos: middle-left_

> 10. Una carta que fue ocultada por efecto en el turno anterior deberá volver a declarar su efecto para que resuelva.

*Notas:* Regla 10. '10.' en negritas; 'ocultada' en cursiva.

### `[p31/b08]`
_pos: middle-left_

> 11. Una carta en mano puede ser mostrada y se considerarán todas sus características y estadísticas impresas, una vez que la carta vuelve al Mazo Principal, o es colocada oculta en el campo, estas características y estadísticas impresas dejan de considerarse.

*Notas:* Regla 11. '11.' en negritas; 'oculta' en cursiva.

### `[p31/b09]`
_pos: middle-left_

> 12. Los efectos y ataques no pueden usarse ignorando las restricciones presentes en ese momento.

*Notas:* Regla 12. '12.' en negritas.

### `[p31/b10]`
_pos: middle-left_

> 13. Mientras una carta tenga una marca no podrá ser objetivo de efectos o costos que coloquen la misma marca.

*Notas:* Regla 13. '13.' en negritas.

### `[p31/b11]`
_pos: middle-left_

> 14. Si hay restricciones en el campo que impidan a ambos jugadores hacer daños (de cualquier tipo) y donde además ambos jugadores no puedan usar efectos para salir de esta situación por más de 8 turnos, ambos jugadores enviarán todas sus cartas en Zona Principal al fondo del Mazo y Zona de Equipos, cada jugador reemplazará sus cartas de forma normal.

*Notas:* Regla 14. '14.' y '8' en negritas; 'daños' en cursiva.

### `[p31/b12]`
_pos: middle-left_

> 15. Es muy común el olvido de la actualización de descansos de las cartas, por lo que cuando un jugador haga notar que olvidó actualizar los descansos de alguna de sus cartas, podrá actualizar en ese momento dichos descansos.

*Notas:* Regla 15. '15.' en negritas; 'descansos' en cursiva.

### `[p31/b13]`
_pos: middle-left_

> 16. En Torneos y partidas competitivas si un jugador olvida actualizar en reiteradas ocasiones los descansos de sus cartas, es posible comentar de esta situación al juez en turno y quedará a discreción del juez aplicar o no alguna penalización.

*Notas:* Regla 16. '16.' en negritas; 'descansos' en cursiva.

### `[p31/b14]`
_pos: middle-left_

> 17. Las cartas en el Mazo Principal, no se pueden revelar (solamente se pueden mostrar) y no pueden tener ninguna característica o estadística particular.

*Notas:* Regla 17. '17.' en negritas; 'revelar' y 'mostrar' en cursiva.

### `[p31/b15]` Tipos de Restricciones
_pos: bottom-left_

> Tipos de Restricciones

*Notas:* Encabezado de subsección en negritas.

### `[p31/b16]`
_pos: bottom-left_

> 1. Restricciones a declarar ataques: Esta clase de limitación imposibilita que algunas cartas sean objetivo de ataques provenientes de otras. Algunas frases y cartas que indican esta restricción son:
> · "No puede ser atacada/o..."
> · "Sólo puede atacar..."
> · "No puede atacar..."
> · "No puede ser dañado..."

*Notas:* Tipo 1 de restricción. '1. Restricciones a declarar ataques:' en negritas; las frases-ejemplo en cursiva entre comillas.

### `[p31/b17]`
_pos: bottom-center_

> Ejemplos de cartas con restricciones al declarar ataque

*Notas:* Pie de imagen para las cartas del grupo de figuras. En cursiva.

### `[p31/b18]`
_pos: bottom-footer_

> 31

*Notas:* Número de página

## Figuras

### `[p31/fig-01]` carta-kayloc-explosion-marina *(type: illustration)*
_bbox (%): x=22, y=80, w=20, h=18_  
**Legibilidad:** needs_enhance — Texto interno de habilidad y estadísticas difícil de leer con precisión.  

**Descripción:** Carta del juego Kódem TCG titulada 'Kayloc, Explosión Marina'. Muestra a una criatura marina en plena acción explosiva, con tonos predominantes rojos, naranjas y amarillos brillantes que sugieren fuego o explosión submarina, un contraste inusual con el entorno acuático. La ilustración transmite energía, agresividad y movimiento violento.

La composición presenta a la criatura en una pose dinámica, con destellos de luz y posiblemente chorros de agua o lava elevándose alrededor. El fondo mezcla azules profundos (para el agua/océano) con estallidos cálidos que centran la atención en el personaje principal. El estilo artístico es detallado y cinemático, típico del TCG.

La carta pertenece al tipo 'Adendei / Pesca' (o similar clasificación), indicando su pertenencia al ecosistema acuático del juego. Su texto de habilidad o costo incluye una restricción específica: esta carta solo puede atacar a ciertos tipos ('Adendei-Acuáticos' u otro subtipo), lo que la hace perfecta como ejemplo visual de 'Restricciones a declarar ataques' de la subsección 'Tipos de Restricciones'.

Las estadísticas visibles en la parte inferior muestran valores de ataque y vida del tipo usual en cartas de criatura. La tipografía del nombre aparece en la parte superior con estilo estilizado característico del juego.

La carta se encuentra en la fila inferior de la página junto con otras dos cartas ejemplo (Raptors, Ladrón; Razcel, ¡Congelado!) bajo el pie de imagen que las agrupa.

**Texto embebido:**
- `Kayloc, Explosión Marina`
- `Adendei / Pesca`
- `5 / 2`

**Relación con el texto:** Ejemplo visual del tipo 1 de restricciones: 'Restricciones a declarar ataques'. Muestra una carta con restricción de objetivo de ataque.

### `[p31/fig-02]` carta-raptors-ladron *(type: illustration)*
_bbox (%): x=40, y=80, w=20, h=18_  
**Legibilidad:** needs_enhance — Texto interno de habilidad y estadísticas difícil de leer con precisión.  

**Descripción:** Carta del juego Kódem TCG titulada 'Raptors, Ladrón'. La ilustración presenta a una criatura de apariencia reptiliana o dinosaurio (raptor) con tonalidades vibrantes que combinan verdes selváticos, azules y acentos morados/rosas, creando una paleta exótica. La pose de la criatura sugiere sigilo, agilidad y naturaleza astuta, acorde a su nombre 'Ladrón'.

El fondo muestra un entorno selvático, posiblemente con follaje denso o jungla prehistórica, que refuerza la estética jurásica y silvestre del personaje. La iluminación es dramática con contrastes entre sombras y luces vibrantes que destacan los músculos y texturas de la piel/escamas del raptor.

La carta pertenece al subtipo 'Adendei Tejón / Charisma' (o clasificación similar) y su texto incluye un costo o restricción relacionada con la capacidad de atacar ('Esta carta no puede atacar...' seguido de alguna condición). Esto la convierte en un ejemplo representativo de la regla de 'Restricciones a declarar ataques'.

Las estadísticas en la base muestran tres valores numéricos (3, 1, 0 aprox.) que corresponden a ataque, descansos y vida u otras mecánicas del juego. El marco de la carta es el estándar del TCG Kódem, con espacios claros para nombre, arte, efecto y estadísticas.

Está colocada en el centro del grupo inferior de cartas ejemplo, flanqueada por Kayloc a la izquierda y Razcel a la derecha.

**Texto embebido:**
- `Raptors, Ladrón`
- `Adendei Tejón / Charisma`
- `3 / 1 / 0`

**Relación con el texto:** Ejemplo visual del tipo 1 de restricciones: 'Restricciones a declarar ataques'.

### `[p31/fig-03]` carta-razcel-congelado *(type: illustration)*
_bbox (%): x=58, y=80, w=20, h=18_  
**Legibilidad:** needs_enhance — Texto interno de habilidad y estadísticas difícil de leer con precisión.  

**Descripción:** Carta del juego Kódem TCG titulada 'Razcel, ¡Congelado!'. Muestra a una criatura alada, posiblemente un ave o dragón de aspecto majestuoso, en pose imponente con alas extendidas. La paleta cromática está dominada por tonos fríos: blancos, azules hielo, grises y celestes luminosos, reforzando la temática del congelamiento y el hielo señalada por el título.

El fondo presenta cielos nublados, probablemente montañas nevadas o atmósfera glacial, con partículas de hielo o escarcha flotando alrededor del personaje. La iluminación es limpia y etérea, con destellos plateados que refuerzan la sensación de frío intenso.

El estilo artístico es detallado y dinámico, con énfasis en la majestuosidad del personaje. Las alas parecen extenderse hacia los bordes de la ilustración, ocupando el espacio de forma imponente. La criatura proyecta poder sobrenatural y una presencia de guardián o ente divino del hielo.

La carta pertenece al subtipo 'Adendei Tejón / Golde' (o similar) y presenta un efecto de tipo 'Pulso' o 'Pasiva' relacionado con la mecánica 'Protector', sugiriendo que esta carta interactúa con el rol defensivo de los Protectores en el campo. Su restricción hace referencia a limitaciones en cuanto a ataques o interacciones defensivas, coherente con su colocación como ejemplo de restricciones al declarar ataque.

Las estadísticas muestran valores bajos (1, 0), lo que sugiere que es una carta más utilitaria que ofensiva. Está en la esquina inferior derecha del grupo de tres cartas ejemplo, completando la ilustración de la sección.

**Texto embebido:**
- `Razcel, ¡Congelado!`
- `Adendei Tejón / Golde`
- `Pulso`
- `1 / 0`

**Relación con el texto:** Ejemplo visual del tipo 1 de restricciones: 'Restricciones a declarar ataques'. Ilustra una carta con efecto que interactúa con Protectores.

## Notas de página

Página densa en reglas numeradas (4.1-4.4, luego 5-17) que extiende las 'Generalidades de las Restricciones e Interacciones' iniciadas en p30. Abre la subsección 'Tipos de Restricciones' con el tipo 1 ('Restricciones a declarar ataques'). Incluye tres cartas ejemplo en la parte inferior (Kayloc, Raptors, Razcel) bajo un pie de imagen agrupador. Se detectó un probable typo en la regla 6: 'vuelve a sus a estadísticas base' (doble preposición 'a').


---

<a id="pagina-32"></a>

# Página 32 — (sin título)

> 🧪 **Spot-check Ramsés (pass 3)** — Revisada y anotada por humano.

**Notas de spot-check (humanas):**

- Carta corregida a 'Tekei, Responsabilidad' (LLM tenía Tekei, OCR/verificación humana inicial tenía Telei). 0 bloques actualizados.
- Confirmado 'enviar' sin tilde (LLM correcto).

**Verdict:** `llm_preferred` · **Recomendación:** `spot_check_human` · **Confianza:** 0.85 · **Acuerdo LLM↔OCR:** 0.9

**Sección(es):** §6.8

## Bloques de texto

### `[p32/b01]`
_pos: top-left_

> 2. Restricciones para la declaración de efectos: Este tipo de restricción impide que algunas cartas sean objetivo de efectos de otras, o que ciertas cartas puedan usar sus propios efectos. Algunas frases y cartas que identifican estas restricciones son:
> · "No puede ser dañados por efectos"
> · "No puede usar efectos/Pasiva/Activa"
> · "No puede ser Curada/Protegida/Dañada"
> · "Solo puedes usar este efecto/Pasiva/Activa"
> · "No puede escalar/descender"
> · "No puede ser copiada/o"

*Notas:* Tipo 2 de restricción. '2. Restricciones para la declaración de efectos:' en negritas; las frases-ejemplo en cursiva entre comillas.

### `[p32/b02]`
_pos: middle-center_

> Ejemplos de cartas con restricciones para la declaración de efectos

*Notas:* Pie de imagen para el grupo de cartas de la sección 2 (Arion, Hypos, Mizhe). En cursiva.

### `[p32/b03]`
_pos: middle-left_

> 3. Restricción para ocultar: Impide que ciertas cartas estén ocultas en el campo, ya sea por su tipo específico de carta como los Tokens y Protectores o por consecuencia de algún efecto o costo.

*Notas:* Tipo 3 de restricción. '3. Restricción para ocultar:' en negritas; 'Tokens' y 'Protectores' en cursiva.

### `[p32/b04]`
_pos: middle-right_

> Ejemplo de carta con restricción para ocultar

*Notas:* Pie de imagen para la carta Zekan, Retorno del Ermitaño. En cursiva.

### `[p32/b05]`
_pos: middle-right_

> 4. Restricción a enviar a Extinción: Impide que ciertas cartas vayan a Extinción, aún cuando su vida sea reducida a 0.

*Notas:* Tipo 4 de restricción. '4. Restricción a enviar a Extinción:' en negritas; '0' en negritas.

### `[p32/b06]`
_pos: middle-left_

> Ejemplo de carta con restricción para enviar a Extinción

*Notas:* Pie de imagen para la carta Tekei, Responsabilidad. En cursiva.

### `[p32/b07]`
_pos: bottom-left_

> 5. Restricción para equipar: Hace que algunas cartas no se puedan equipar o sólo se puedan equipar a cartas específicas. Algunas frases para identificar la restricción: "No puede ser equipada/o", "Sólo puede ser equipado a…" (Ver 3.4 Equipos)

*Notas:* Tipo 5 de restricción. '5. Restricción para equipar:' en negritas; frases-ejemplo en cursiva entre comillas; '(Ver 3.4 Equipos)' en cursiva como referencia cruzada.

### `[p32/b08]`
_pos: bottom-right_

> Ejemplo de carta con restricción para equipar

*Notas:* Pie de imagen para la carta Zekan, Reclutamiento. En cursiva.

### `[p32/b09]`
_pos: bottom-right_

> 6. Restricción para actualizar descansos: Este tipo de restricciones hacen que ciertas cartas no puedan actualizar sus descansos. Algunas frases para identificar la restricción: "No puede/podrá actualizar descanso(s)".

*Notas:* Tipo 6 de restricción. '6. Restricción para actualizar descansos:' en negritas; 'descansos' en cursiva; frase-ejemplo en cursiva.

### `[p32/b10]`
_pos: bottom-left_

> Ejemplo de carta con restricción para actualizar descansos

*Notas:* Pie de imagen para la carta Ungos, Aleteo Glacial. En cursiva.

### `[p32/b11]`
_pos: bottom-footer_

> 32

*Notas:* Número de página en negritas.

## Figuras

### `[p32/fig-01]` carta-arion-jugada-maestra *(type: illustration)*
_bbox (%): x=43, y=5, w=19, h=23_  
**Legibilidad:** needs_enhance — Texto interno difícil de leer con precisión en resolución reducida.  

**Descripción:** Carta del juego Kódem TCG titulada 'Arion, Jugada Maestra'. La ilustración muestra una figura de apariencia tentaculada o multibrazos con elementos mágicos azules, evocando un aire siniestro o estratégico. Los tonos predominantes son oscuros (azul profundo, violeta, negro) con destellos de energía brillante en tonalidades cian o turquesa, lo que sugiere una temática arcana y táctica, alineada con 'Jugada Maestra'.

El personaje tiene una pose dinámica, posiblemente moviendo varias extremidades simultáneamente para representar la idea de múltiples jugadas o movimientos estratégicos. El fondo es oscuro con chispas o destellos de energía mágica que refuerzan la atmósfera sobrenatural.

La carta pertenece a los subtipos 'Adendei / Ático' (o similar) y posee una habilidad Pasiva que afecta a Adendei aliados equipados, relacionada con protección o daño por efectos. Esta habilidad la convierte en un ejemplo perfecto del tipo 2 de restricciones: 'Restricciones para la declaración de efectos'.

Las estadísticas muestran valores de 2 de ataque, 1 de descanso y 0 de vida (o configuración similar). El marco es el estándar del TCG Kódem, con el nombre en la parte superior y el espacio para efecto debajo de la ilustración.

Está colocada en la fila superior de ejemplos de la sección 2, junto a Hypos y Mizhe.

**Texto embebido:**
- `Arion, Jugada Maestra`
- `Adendei / Ático`
- `Pasiva`
- `2 / 1 / 0`

**Relación con el texto:** Ejemplo visual del tipo 2 de restricciones: 'Restricciones para la declaración de efectos'.

### `[p32/fig-02]` carta-hypos-guia-jurasico *(type: illustration)*
_bbox (%): x=62, y=5, w=19, h=23_  
**Legibilidad:** needs_enhance — Texto interno difícil de leer con precisión.  

**Descripción:** Carta del juego Kódem TCG titulada 'Hypos, Guía Jurásico'. Representa a una criatura titánica de aspecto jurásico o dinosáurico, con una postura imponente y fuerte presencia. La paleta de colores combina marrones tierra, naranjas cálidos, amarillos y algunos acentos verdes, todo en un ambiente que evoca paisajes prehistóricos, posiblemente volcánicos o desérticos.

La criatura tiene características reminiscentes de un gran titán: cuerpo robusto, posiblemente con armaduras naturales (escamas gruesas, placas óseas), y una cabeza prominente. El estilo artístico es detallado con énfasis en la anatomía imponente del ser. El fondo muestra posiblemente un cielo al atardecer con tonos cálidos que destacan la silueta del titán.

La carta pertenece a los subtipos 'Adendei / Titán / Huanca' (o similar, combinando varias clases). Su texto incluye una restricción con la palabra 'Contra:' relacionada con escalar/descender o con la protección, alineándose con el tipo 2 de restricciones.

Las estadísticas muestran 4 de ataque, 1 de descanso y 0 de vida (o configuración comparable). Es una carta de alto poder ofensivo que se restringe en ciertas interacciones.

Está en el centro de la fila superior de cartas ejemplo de la sección 2, entre Arion y Mizhe, completando una tríada visual que ilustra distintas restricciones de efecto.

**Texto embebido:**
- `Hypos, Guía Jurásico`
- `Adendei / Titán / Huanca`
- `Contra`
- `4 / 1 / 0`

**Relación con el texto:** Ejemplo visual del tipo 2 de restricciones: 'Restricciones para la declaración de efectos'. Incluye restricciones sobre escalar/descender.

### `[p32/fig-03]` carta-mizhe-guia-de-almas *(type: illustration)*
_bbox (%): x=80, y=5, w=19, h=23_  
**Legibilidad:** needs_enhance — Texto interno difícil de leer con precisión.  

**Descripción:** Carta del juego Kódem TCG titulada 'Mizhe, Guía de Almas'. Muestra a una criatura o entidad de aspecto floral/espiritual con predominancia de tonos rosados, magenta y violetas luminosos, transmitiendo una estética etérea, onírica y mágica. La figura sugiere una naturaleza más espiritual o divina, coherente con el rol de 'Guía de Almas'.

La composición central resalta a la entidad como una figura iluminada desde adentro, con destellos de luz y posibles pétalos, hojas o energías que flotan a su alrededor. El fondo es soñador, con colores difuminados y atmosférico, lo que refuerza la temática mística.

El estilo artístico es más suave y luminoso que otras cartas ejemplificadas en la página, lo que la diferencia visualmente. Hay elementos que podrían interpretarse como flores espirituales, rostros angelicales o siluetas espectrales.

La carta pertenece a los subtipos 'Adendei / Guardián / Peral' (o similar) y posee una habilidad Activa que no puede ser copiada, más un 'Contra' que reitera la restricción de no ser copiada. Esto la hace un ejemplo excelente del tipo 2 de restricciones, específicamente 'No puede ser copiada/o'.

Las estadísticas muestran valores bajos (0, 0, 0 aproximadamente), lo que sugiere que es una carta de apoyo o utilidad más que de combate directo. Completa la tríada superior de cartas de la sección 2.

**Texto embebido:**
- `Mizhe, Guía de Almas`
- `Adendei / Guardián / Peral`
- `Activa`
- `Este efecto no puede ser copiado`
- `Contra`
- `Esta carta no puede ser copiada`
- `0 / 0 / 0`

**Relación con el texto:** Ejemplo visual del tipo 2 de restricciones: 'Restricciones para la declaración de efectos'. Ilustra 'No puede ser copiada/o'.

### `[p32/fig-04]` carta-zekan-retorno-del-ermitano *(type: illustration)*
_bbox (%): x=55, y=33, w=25, h=22_  
**Legibilidad:** needs_enhance — Texto interno difícil de leer con precisión; la habilidad completa se infiere del contexto.  

**Descripción:** Carta del juego Kódem TCG titulada 'Zekan, Retorno del Ermitaño'. La ilustración presenta a una criatura o personaje místico con tonalidades púrpuras, violetas y magenta, con destellos luminosos de energía que le otorgan un aura sobrenatural y etérea. La figura transmite poder arcano, sabiduría ancestral y un aire de misterio propio de un ermitaño poderoso que regresa al campo de batalla.

La composición muestra al personaje en pose dramática con elementos de energía a su alrededor, posiblemente con cabello o tela flotante, bastones o artefactos mágicos, sugiriendo su naturaleza de maestro arcano retirado que vuelve. El fondo es oscuro con brillos de energía violeta que resaltan el contorno del personaje.

El estilo artístico enfatiza la iluminación interna y los contrastes dramáticos entre luz y sombra, dándole un aspecto casi espectral. La criatura tiene rasgos que combinan elementos humanos con elementos feéricos o demoníacos.

La carta pertenece a los subtipos 'Adendei / Linco' (o similar). Su habilidad Pasiva afecta la zona del rival impidiendo que ciertas cartas estén Boca Abajo (ocultas) en Zona Principal, lo que la convierte en un ejemplo claro del tipo 3 de restricciones: 'Restricción para ocultar'.

Las estadísticas muestran 2 de ataque, 2 de descanso y 0 de vida (o configuración similar). Se encuentra en el centro-derecha de la página como ejemplo asociado al tipo 3 de restricción.

**Texto embebido:**
- `Zekan, Retorno del Ermitaño`
- `Adendei / Linco`
- `Pasiva`
- `Ninguna carta en Zona Principal podrá estar Boca abajo`
- `2 / 2 / 0`

**Relación con el texto:** Ejemplo visual del tipo 3 de restricciones: 'Restricción para ocultar'.

### `[p32/fig-05]` carta-tolei-responsabilidad *(type: illustration)*
_bbox (%): x=8, y=48, w=30, h=24_  
**Legibilidad:** needs_enhance — Texto interno difícil de leer con precisión.  

**Descripción:** Carta del juego Kódem TCG titulada 'Tekei, Responsabilidad'. La ilustración presenta a un ciervo/venado majestuoso con cornamenta prominente, situado en un ambiente invernal con tonos predominantemente rojos, blancos y grises. La paleta transmite solemnidad, protección y majestuosidad, consistente con el concepto de 'Responsabilidad' del nombre.

La composición centra al ciervo con pose erguida y noble, probablemente mirando de frente o ligeramente de perfil, con la cornamenta detallada que le da un aire de guardián del bosque o protector espiritual. El fondo evoca un paisaje invernal con nieve, posibles árboles desnudos o cielos crepusculares en tonos rojizos.

El estilo artístico es detallado y dramático, con énfasis en la textura del pelaje, la estructura ósea de las astas y la iluminación ambiental que da profundidad al paisaje. Los destellos de luz sobre el pelaje del ciervo sugieren su naturaleza sagrada o protectora.

La carta pertenece a los subtipos 'Adendei / Huanca' (o similar) y su habilidad Pasiva protege a los Adendei aliados de ser enviados a Extinción, siendo un ejemplo ideal del tipo 4 de restricciones: 'Restricción a enviar a Extinción'.

Las estadísticas muestran 1 de ataque, 0 de descanso y 0 de vida (o configuración similar). Está ubicada en el centro-izquierda de la página, junto al pie de imagen que la identifica como ejemplo del tipo 4.

**Texto embebido:**
- `Tekei, Responsabilidad`
- `Adendei / Huanca`
- `Pasiva`
- `Adendei aliados no pueden ser enviados a Extinción`
- `1 / 0 / 0`

**Relación con el texto:** Ejemplo visual del tipo 4 de restricciones: 'Restricción a enviar a Extinción'.

### `[p32/fig-06]` carta-zekan-reclutamiento *(type: illustration)*
_bbox (%): x=55, y=63, w=27, h=22_  
**Legibilidad:** needs_enhance — Texto interno difícil de leer con precisión.  

**Descripción:** Carta del juego Kódem TCG titulada 'Zekan, Reclutamiento'. La ilustración muestra una criatura azul/teal, posiblemente con rasgos reptilianos o anfibios, en una pose firme y autoritaria que sugiere liderazgo o convocatoria. La paleta fría de azules y verdes se combina con un fondo nevado o ambiente invernal, creando un ambiente de acción disciplinada y fría.

La composición centra a la criatura con postura erguida, posiblemente con brazos o extremidades extendidas en gesto de reclutar o convocar. El estilo artístico es detallado y dramático, con atención a la anatomía única del personaje y a los detalles del entorno invernal. Los contrastes fríos refuerzan la sensación de disciplina y convocatoria forzada.

El fondo nevado, posibles montañas al fondo y la iluminación uniforme crean una atmósfera de campaña militar o reunión táctica. Es una carta de la misma serie 'Zekan' que la de 'Retorno del Ermitaño', compartiendo estilo y linaje visual aunque con arte distinto.

La carta pertenece a los subtipos 'Adendei / Linco' y tiene una habilidad Pasiva que otorga puntos a Adendei cuando se revelan, además de restricciones tipo 'Contra' que indican que la carta no puede ser atacada ni equipada. La restricción a equipar la hace ejemplo adecuado del tipo 5 de restricciones: 'Restricción para equipar'.

Las estadísticas muestran 3 de ataque, 1 de descanso y 0 de vida. Está posicionada en el centro-derecha de la página como ejemplo del tipo 5.

**Texto embebido:**
- `Zekan, Reclutamiento`
- `Adendei / Linco`
- `Pasiva`
- `Contra`
- `Esta carta no puede ser atacada`
- `Esta carta no puede ser equipada`
- `3 / 1 / 0`

**Relación con el texto:** Ejemplo visual del tipo 5 de restricciones: 'Restricción para equipar'.

### `[p32/fig-07]` carta-ungos-aleteo-glacial *(type: illustration)*
_bbox (%): x=8, y=80, w=28, h=19_  
**Legibilidad:** needs_enhance — Texto interno difícil de leer con precisión.  

**Descripción:** Carta del juego Kódem TCG titulada 'Ungos, Aleteo Glacial'. La ilustración presenta a una criatura alada con apariencia galáctica/cósmica, cuyas alas parecen formadas por energía o polvo estelar en tonos azules y morados brillantes. El fondo es un ambiente estelar o cósmico con destellos de luz, lo que crea una atmósfera etérea y sobrenatural.

La composición muestra a la criatura en pleno vuelo o aleteo, con las alas extendidas ocupando gran parte de la ilustración. Los colores fríos (azul, morado, violeta) se combinan con toques brillantes que sugieren energía glacial cósmica, consistente con el nombre 'Aleteo Glacial'. El estilo artístico es onírico, con énfasis en la luminosidad y las texturas etéreas de las alas.

El personaje tiene características que combinan elementos aviares con algo más abstracto o espiritual, como si fuera una entidad planetaria o astral. Posibles partículas de hielo o estrellas flotan alrededor, reforzando la temática.

La carta pertenece a los subtipos 'Adendei / Galos' (o similar) y su habilidad Activa afecta al rival haciendo que sus descansos no puedan ser actualizados, siendo un ejemplo ideal del tipo 6 de restricciones: 'Restricción para actualizar descansos'. Incluye además una sección 'Contra' con restricciones adicionales.

Las estadísticas muestran 1 de ataque, 2 de descanso y 0 de vida (o configuración similar). Está colocada en la parte inferior izquierda de la página como ejemplo del tipo 6.

**Texto embebido:**
- `Ungos, Aleteo Glacial`
- `Adendei / Galos`
- `Activa`
- `Sus descansos no pueden ser actualizados`
- `Contra`
- `1 / 2 / 0`

**Relación con el texto:** Ejemplo visual del tipo 6 de restricciones: 'Restricción para actualizar descansos'.

## Notas de página

Página muy visual que enumera los tipos 2 al 6 de 'Tipos de Restricciones' (continuación del tipo 1 iniciado en p31). Cada tipo tiene su propia carta(s) ejemplo y pie de imagen en cursiva. Layout complejo con cartas distribuidas en varias filas y columnas entrelazadas con el texto de reglas. Total de 7 cartas ejemplo en la página (Arion, Hypos, Mizhe arriba; Zekan Retorno y Tekei en medio; Zekan Reclutamiento y Ungos abajo). Incluye referencia cruzada a §3.4 Equipos.


---

<a id="pagina-33"></a>

# Página 33 — (sin título)

**Verdict:** `both_agree` · **Recomendación:** `accept` · **Confianza:** 0.9 · **Acuerdo LLM↔OCR:** 0.96

**Sección(es):** §7

## Bloques de texto

### `[p33/b01]` 7. Restricciones para vinvular
_pos: top_

> 7. Restricciones para vinvular: Este tipo de restricciones hacen que ciertas cartas no se puedan vincular. Algunas frases para identificar la restricción: "Sólo puede/podrá vincularse con…", "Se vincula sólo con…".

*Notas:* Typo intencional preservado: 'vinvular' (debería ser 'vincular') en el heading según aparece en el texto original.

### `[p33/b02]`
_pos: top_

> Ejemplo de restricción para vincular

*Notas:* Caption/pie de figura

### `[p33/b03]` 8. Restricciones para resolver Efectos
_pos: middle_

> 8. Restricciones para resolver Efectos: A diferencia de las restricciones para declarar efecto, una restricción para resolver efecto sí permite que lo declares, pero su restricción no permite resolver. Por lo general aquí se encuentran todas las negaciones de efectos, las cartas con efectos negados por definición no pueden resolver sus efectos mientras se encuentren negados, también en esta categoría se encuentran las protecciones.

### `[p33/b04]`
_pos: middle_

> Ejemplo de negación de efecto          Ejemplo de protección

*Notas:* Dos captions contiguos lado a lado

### `[p33/b05]` PENALIZACIONES POR INCUMPLIR RESTRICCIONES
_pos: middle_

> PENALIZACIONES POR INCUMPLIR RESTRICCIONES
>
> 1. Si un jugador declara un efecto o ataque ignorando una restricción, no resolverá y se perderá, es decir, no se podrá declarar nuevamente a otra carta durante ese turno. Además, si la carta declaró un ataque o Activa, no podrá equiparse durante la fase de equipos y deberá descansar al final del turno.
>
> 2 .Si un jugador incumple una restricción, el jugador debe notificarlo al rival (y/o juez en partidas competitivas); se aplicará el punto 1 o 4, según corresponda.
>
> 3. Los jugadores tienen como máximo el siguiente turno para señalar el incumplimiento de una restricción.
>
> 4.Si se ignora una restricción en el turno actual o anterior, las acciones posteriores se cancelan, los Ecosistemas retroceden al momento previo a la infracción, y se aplica la sanción del punto 1 (si aplica).
>
> 5.El incumplimiento de una restricción no reclamada durante 2 turnos (el turno de la infracción y el siguiente a este), hace que la acción prescriba, eximiendo de penalización (excepto en torneos/juegos competitivos, donde el juez puede intervenir y penalizar a su criterio), ya que es responsabilidad de los jugadores conocer las restricciones.
>
> 6.En torneos oficiales, cuando un jugador ignore restricciones reiteradamente se puede informar al juez, quien a su criterio decidirá si resuelve alguna penalización adicional; que podrá ir desde amonestación verbal, carta en Extinción, pérdida de turno, pérdida de partida o hasta descalificación.

*Notas:* Typos preservados: '2 .Si' (espacio antes del punto), '4.Si', '5.El', '6.En' (sin espacio tras el punto).

### `[p33/b06]` 7. ¿CÓMO ARMAR MI MAZO?
_pos: bottom_

> 7.¿Cómo armar mi mazo?
>
> Al comenzar a construir tu mazo de juego es importante que conozcas que existen diferentes estrategias que puedes contemplar para poder armarlo de una forma más rápida y eficiente. Si estás buscando recomendaciones para empezar a jugar, esta sección es para ti.

*Notas:* Banner de sección + párrafo introductorio

## Figuras

### `[p33/fig-01]` ejemplo-restriccion-vincular-juan-galgo *(type: illustration)*
_bbox (%): x=10, y=12, w=35, h=22_  
**Legibilidad:** needs_enhance — Texto de la Activa parcialmente ilegible al final; parte del bloque de texto aparece recortado o borroso.  

**Descripción:** Ejemplo de carta física de Kódem TCG mostrado como referencia visual de una restricción para vincular. La carta está titulada 'Juan Galgo, Motín' y pertenece al tipo Protector. Presenta la ilustración de un personaje masculino de aspecto desafiante y urbano, con ropas ajustadas y postura combativa: levanta uno de los brazos con gesto retador mientras el otro se mantiene cerca del torso, sobre un fondo de escenario nocturno urbano con tonos oscuros, azulados y destellos de luz que sugieren una atmósfera de disturbio o motín ciudadano.

El marco de la carta es característico del tipo Protector, con un diseño metálico/gris y detalles ornamentales en las esquinas. La parte superior muestra el nombre del personaje en tipografía bold, mientras que la parte media-baja contiene el bloque de habilidades. Un recuadro rojo dibujado sobre la carta destaca específicamente la línea de 'Costo' donde aparece la restricción para vincularse, señalando visualmente al lector qué parte del texto constituye este tipo de restricción.

En la zona inferior del marco se observan los indicadores numéricos de estadísticas y posiblemente el costo energético del Protector, junto con iconografía del juego. La estética de la carta combina elementos modernos-urbanos con el estilo fantástico propio del universo Kódem TCG. Esta ilustración sirve como apoyo visual inmediato al texto del punto 7 que explica las restricciones de vinculación entre cartas.

**Texto embebido:**
- `Juan Galgo, Motín`
- `Protector`
- `Activa: El Adende vinculado podrá atacar con doble daño a cartas que no estén frente a ella, hasta que esta carta esté (ilegible).`
- `Costo: Esta carta sólo puede vincularse con Adende-Feral.`

**Relación con el texto:** Sirve como ejemplo visual directo al punto 7 'Restricciones para vincular'. El recuadro rojo destaca la línea de Costo que contiene la frase restrictiva 'Esta carta sólo puede vincularse con Adende-Feral'.

### `[p33/fig-02]` ejemplo-negacion-efecto-chapalab *(type: illustration)*
_bbox (%): x=8, y=40, w=30, h=20_  
**Legibilidad:** clear  

**Descripción:** Ejemplo de carta de Kódem TCG usada como referencia para ilustrar 'negación de efecto'. La carta está titulada 'Chapalab, El Anciano' y pertenece a la clasificación 'Adende Titán / Feral'. La ilustración central muestra una criatura oscura, masiva y amenazante con múltiples tentáculos o apéndices alargados que emergen de su cuerpo, con una silueta que recuerda a un ser lovecraftiano o a un monstruo ancestral.

El fondo predominante es verde oscuro con matices pantanosos y áreas de sombra profunda, lo que refuerza la sensación de antigüedad y peligro asociada al subtipo Titán/Feral del universo Kódem. La composición enfatiza la escala colosal de la criatura al ocupar gran parte del marco ilustrado de la carta, con los apéndices extendiéndose hacia los bordes.

Un recuadro rojo destaca la zona inferior de la carta donde se encuentra el texto de habilidad 'Pasiva-Rápida', que es precisamente donde se describe el efecto de negación referido en el texto del reglamento. Bajo el texto de habilidad aparece una cita narrativa en cursiva que complementa el lore del personaje. El marco de la carta presenta los indicadores numéricos y el icono de tipo característicos del formato Kódem TCG.

**Texto embebido:**
- `Chapalab, El Anciano`
- `Adende Titán / Feral`
- `Pasiva-Rápida: Niega la Pasiva de 1 carta hasta el Fin del turno rival.`
- `Un millar de patas amenazantes acelera el andar de su atleta.`

**Relación con el texto:** Ejemplo visual del primer tipo de restricción para resolver efectos descrito en el punto 8: negaciones de efecto. El recuadro rojo destaca la habilidad Pasiva-Rápida que niega la Pasiva de otra carta.

### `[p33/fig-03]` ejemplo-proteccion-ariam-dualidad *(type: illustration)*
_bbox (%): x=55, y=40, w=30, h=20_  
**Legibilidad:** clear  

**Descripción:** Ejemplo de carta de Kódem TCG titulada 'Ariam, Dualidad', perteneciente a la clasificación 'Adende / Ática', utilizada como referencia del concepto de 'protección' como restricción para resolver efectos. La ilustración central muestra una criatura dracónica o bestia mística con coloración dual: una mitad del cuerpo es predominantemente roja (asociada al elemento fuego) y la otra mitad es azul (asociada al elemento agua), lo que refleja directamente el epíteto 'Dualidad'.

El entorno representa una escena submarina con tonalidades azul profundo en el fondo, al tiempo que la parte roja del cuerpo genera explosiones o burbujas de fuego y lava que contrastan dramáticamente con el agua circundante. Este choque visual entre los dos elementos refuerza el tema de dualidad. La criatura está en una pose dinámica, aparentemente en acción o movimiento, con alas o apéndices extendidos.

Un recuadro rojo destaca específicamente el bloque de texto de la habilidad Activa, que es donde se describe el efecto de protección. En la zona inferior aparece una cita narrativa en cursiva ('Agua y fuego, solo y nuestro...') que da color temático al personaje. El marco mantiene la estética estándar del juego con indicadores de estadísticas en la parte inferior y el icono de tipo correspondiente.

**Texto embebido:**
- `Ariam, Dualidad`
- `Adende / Ática`
- `Activa: Si esta carta ataca, protege a un Adende aliado de ataques y efectos hasta el final de tu siguiente turno.`
- `Agua y fuego, solo y nuestro...`

**Relación con el texto:** Ejemplo visual del segundo tipo de restricción para resolver efectos (protecciones) según el punto 8. El recuadro rojo destaca la Activa que otorga protección.

### `[p33/fig-04]` banner-seccion-7-como-armar-mi-mazo *(type: infographic)*
_bbox (%): x=8, y=85, w=85, h=7_  
**Legibilidad:** clear  

**Descripción:** Banner rectangular utilizado como encabezado de sección principal en el reglamento. El fondo presenta un degradado azul (azul medio a azul más oscuro) con detalles decorativos en los extremos izquierdo y derecho formados por líneas diagonales paralelas de color azul más oscuro combinadas con tonos celestes, que generan un efecto visual de profundidad, dinamismo o movimiento.

El texto central se muestra en blanco puro con tipografía bold en mayúsculas, con un tamaño prominente que lo convierte en el elemento focal del banner. El diseño sigue la línea gráfica consistente del manual Kódem TCG v5.1 para los encabezados de secciones numeradas principales.

Funciona como separador visual entre la sección 6 (penalizaciones) y la nueva sección 7 dedicada a la construcción de mazos, anunciando un cambio de tema del contenido legalista/reglamentario hacia contenido estratégico/constructivo para el jugador.

**Texto embebido:**
- `7.¿CÓMO ARMAR MI MAZO?`

**Relación con el texto:** Encabezado principal que introduce la sección 7 del reglamento.

## Notas de página

Página mixta que cierra la sección de restricciones y penalizaciones (puntos 7-8 de restricciones y lista de 6 penalizaciones) y abre la sección 7 general '¿Cómo armar mi mazo?'. Contiene 3 cartas de ejemplo (Juan Galgo, Chapalab, Ariam Dualidad) con recuadros rojos destacando las habilidades relevantes. Preservados los typos originales: 'vinvular' en el heading del punto 7, espaciado irregular tras puntos numerados ('2 .Si', '4.Si', '5.El', '6.En').


---

<a id="pagina-34"></a>

# Página 34 — (sin título)

**Verdict:** `both_agree` · **Recomendación:** `accept` · **Confianza:** 0.88 · **Acuerdo LLM↔OCR:** 0.94

**Sección(es):** §7

## Bloques de texto

### `[p34/b01]` Mazo por Energías
_pos: top_

> Mazo por Energías
>
> Al construir tu mazo, tienes la opción estratégica de seleccionar un atributo de energía específico para potenciarlo y convertirlo en la base de tu estrategia. Para complementar y fortalecer este enfoque, puedes incluir otras energías que actúen como apoyo y brinden versatilidad a tu juego (Ver 2.2.1. Energías). Es importante destacar que no estás limitado a una sola energía; tienes la libertad de combinar todas las energías que consideres necesarias y estratégicas dentro de tu Mazo Principal, lo que te permite crear sinergias poderosas y adaptarte a diferentes situaciones de juego.

*Notas:* Referencia interna: Ver 2.2.1. Energías

### `[p34/b02]`
_pos: top_

> Ejemplo de un mazo de energía pírica

*Notas:* Pie de figura

### `[p34/b03]` Mazo por Subtipos de Adendei
_pos: middle_

> Mazo por Subtipos de Adendei
>
> Dinosaurios - Adendei Titán
>
> En el universo de Kódem TCG©, los Adendei han estado presentes en todas las Eras del planeta. Durante el Mesozoico, estos Adendei fueron conocidos como Adendei Titanes, debido a su tamaño colosal. Este subtipo destaca por su inmenso poder y agresividad.
> ¡La opción perfecta para los amantes de los dinosaurios!

*Notas:* Incluye símbolo de copyright ©

### `[p34/b04]`
_pos: middle_

> Ejemplo de un mazo de Adendei Titanes

*Notas:* Pie de figura

### `[p34/b05]` Peces abisales - Adendei Abisal
_pos: middle_

> Peces abisales - Adendei Abisal
>
> Los Adendei Abisales emergen de las profundidades del océano, donde han permanecido ocultos durante millones de años. Su poder devastador los mantiene recluidos en los abismos marinos. Inspirados en los mitos de H. P. Lovecraft, estos Adendei son criaturas destructivas que carecen de empatía y conexión con la naturaleza, habiendo sido moldeados en el frío vacío abisal. Si te atrae el caos y la destrucción sin límites, los Adendei Abisales son una excelente adición para tu Mazo.

*Notas:* Referencia cultural a H. P. Lovecraft

### `[p34/b06]`
_pos: middle_

> Ejemplo de un mazo de Adendei Abisales

*Notas:* Pie de figura

### `[p34/b07]` MAZO TEMÁTICO
_pos: bottom_

> MAZO TEMÁTICO
>
> ¿Te gustan los ajolotes? ¿Los lobos? ¿Los reptiles feroces? ¡Encuentra un mazo más afín a tu animal favorito! ¡Es lo más cercano que tendrás en el juego a personalizar tu propia experiencia de juego combinándola como quieras!

### `[p34/b08]`
_pos: bottom_

> Ejemplo de un mazo temático de "Ariam" el ajolote

*Notas:* Pie de figura

## Figuras

### `[p34/fig-01]` mazo-energia-pirica-7-cartas *(type: photo)*
_bbox (%): x=5, y=15, w=90, h=15_  
**Legibilidad:** clear — Los nombres de algunas cartas requieren contexto del universo del juego para confirmar ortografía exacta.  

**Descripción:** Fila horizontal compuesta por siete cartas físicas del juego Kódem TCG dispuestas con ligera superposición, ilustrando un ejemplo de mazo construido en torno a la energía pírica (fuego). Las cartas muestran personajes y criaturas con temática claramente ígnea: dragones, bestias de fuego, deidades piricas y elementos como llamas, lava y magma dominan tanto las ilustraciones centrales como los fondos.

La paleta cromática del conjunto es cálida y cohesiva: predominan los rojos intensos, naranjas vibrantes, dorados y negros que refuerzan visualmente la identidad de la energía pírica. Los marcos de las cartas (principalmente tipo Adende) presentan bordes oscuros con detalles metálicos, mientras que en algunas cartas de equipo/efecto los marcos son más claros. Los nombres de las cartas aparecen en la parte superior de cada una en tipografía bold.

La composición incluye tanto Adendei (personajes-criatura de combate) como cartas de equipo/efecto al final de la fila, representando la mezcla típica de un mazo funcional: criaturas principales para atacar y respaldo con equipos o efectos temáticos. Bajo la fila hay una leyenda en cursiva que identifica el ejemplo.

**Texto embebido:**
- `Eisen, Ardienia Vergaza`
- `Draven, Ancestral`
- `Draven, Rugido de Poder`
- `Pyrodon, Aura Pírica`
- `Hori, Deidad Pírica`
- `Escamas de Lava`
- `Cascada de Lava`
- `Ejemplo de un mazo de energía pírica`

**Relación con el texto:** Ejemplifica visualmente la estrategia 'Mazo por Energías' descrita en el bloque superior, mostrando una selección coherente de cartas con energía pírica.

### `[p34/fig-02]` mazo-adendei-titanes-7-cartas *(type: photo)*
_bbox (%): x=5, y=42, w=90, h=15_  
**Legibilidad:** clear — Algunos nombres de cartas pueden requerir validación (p. ej. 'Desviación Pétres' podría ser 'Pétrea').  

**Descripción:** Fila horizontal de siete cartas del juego Kódem TCG que representa un ejemplo de mazo construido con Adendei Titanes, el subtipo de dinosaurios del universo Kódem. Las ilustraciones muestran criaturas de gran tamaño con morfologías claramente dinosaurianas o bestias prehistóricas: formas masivas, posturas agresivas, pieles escamosas o coriáceas, y detalles que evocan al Mesozoico descrito en el texto.

La paleta cromática es variada pero distinta a la del mazo pírico: incluye púrpuras profundos, verdes selváticos, azules metálicos, naranjas y tonos de marrón-tierra. Las ilustraciones transmiten sensación de poder bruto y agresividad, alineadas con la descripción textual del subtipo Titán.

Algunas cartas presentan etiquetas de subtipo híbrido visibles (como 'Titán/Chásmica' o similares), reflejando la mecánica del juego donde los Adendei pueden combinar múltiples categorías. La fila también incluye cartas de equipo/efecto al final (p. ej. 'Bomba de Clorofila', 'Desviación Pétres') que complementan la estrategia del mazo temático. Debajo del arreglo aparece el pie de figura en cursiva que identifica el ejemplo.

**Texto embebido:**
- `Ni-Nirgi, Inimante`
- `Grolon, Versatilidad`
- `Drigel, Refracción`
- `Rapsoc, Velocidad Prehistórica`
- `Hypex, Atardecer`
- `Bomba de Clorofila`
- `Desviación Pétres`
- `Ejemplo de un mazo de Adendei Titanes`

**Relación con el texto:** Ejemplifica visualmente la estrategia 'Mazo por Subtipos de Adendei' en su variante de Adendei Titanes (dinosaurios).

### `[p34/fig-03]` mazo-adendei-abisales-7-cartas *(type: photo)*
_bbox (%): x=5, y=70, w=90, h=15_  
**Legibilidad:** clear — Nombres con nomenclatura lovecraftiana (Shugg, Yogg, Urogg) y con consonantes inusuales que podrían contener errores tipográficos.  

**Descripción:** Fila horizontal de siete cartas del juego correspondientes al mazo de Adendei Abisales. Las ilustraciones muestran criaturas marinas de apariencia terrorífica y claramente inspiradas en la estética lovecraftiana mencionada en el texto: pulpos gigantes, seres con múltiples tentáculos, criaturas de las profundidades con ojos luminiscentes, estrellas de mar abisales bioluminiscentes, monstruos amorfos de las tinieblas oceánicas y seres coralinos retorcidos.

La paleta cromática es dramáticamente oscura, con tonos predominantes de azul profundo, morado/violeta, negro abisal y destellos puntuales de luz neón bioluminiscente (verde, cian, magenta) que evocan las profundidades del océano donde la luz solar no penetra. Esta elección cromática refuerza la atmósfera de caos y destrucción sin empatía descrita textualmente.

Cada carta presenta su marco característico con estadísticas numéricas en la parte inferior y texto de habilidades. Algunas cartas muestran subtipos combinados (p. ej. 'Adendei Abisal / Feral', 'Adendei Abisal / Pirata', 'Adendei Abisal / Altea', 'Adendei Abisal / Demoníaco'), indicando la variedad de fusiones posibles dentro del subtipo Abisal. Debajo aparece el pie de figura en cursiva.

**Texto embebido:**
- `Shugg, Fuga`
- `Urogg, Coloso del Terror`
- `Shugg, Acecho Submarino`
- `Digg, Reflejos Abisales`
- `Yogg, Oscuridad`
- `Digg, Apetito Abisal`
- `Atshln, Desde las Profundidades`
- `Adendei Abisal / Feral`
- `Adendei Abisal / Pirata`
- `Adendei Abisal / Altea`
- `Adendei Abisal / Demoníaco`
- `Ejemplo de un mazo de Adendei Abisales`

**Relación con el texto:** Ejemplifica visualmente la variante 'Peces abisales - Adendei Abisal' de la estrategia 'Mazo por Subtipos de Adendei'.

### `[p34/fig-04]` mazo-tematico-ariam-ajolote-7-cartas *(type: photo)*
_bbox (%): x=5, y=90, w=90, h=8_  
**Legibilidad:** clear — La cercanía entre cartas puede dificultar leer algunos subtipos con precisión.  

**Descripción:** Fila horizontal de siete cartas del juego correspondientes al mazo temático centrado en 'Ariam', el personaje ajolote del universo Kódem TCG. Cada carta representa una versión o variante distinta del mismo personaje, ilustrando cómo se puede construir un mazo personalizado alrededor de una figura favorita del jugador.

Las ilustraciones muestran al ajolote con colores vibrantes y variados: rosas (asociado tradicionalmente con el ajolote mexicano), verdes, naranjas, azules, tonos pastel y combinaciones más dramáticas. Las poses y atuendos varían considerablemente: algunas versiones muestran a Ariam en posturas combativas con efectos de fuego ('Carga Física'), otra versión especial celebra el primer aniversario del juego con un pastel de cumpleaños ('1st Anniversary'), una variante presenta un diseño de inspiración azteca/prehispánica con máscara ornamental ('Leyenda'), y una versión final muestra a Ariam en una forma más pequeña y tierna en tonos rosados ('Vitalidad').

Cada carta muestra subtipos distintos que reflejan la diversidad de roles posibles para un solo personaje: 'Adendei Cosm / Altea', 'Adendei / Pirata', 'Adendei / Altea', 'Adendei / Carga', 'Adendei / Pirata recargada'. Esta figura ilustra de forma clara la idea de personalización por animal/personaje favorito.

**Texto embebido:**
- `Ariam, Nigromante`
- `Ariam, Fuerza del Más Allá`
- `Ariam, 1st Anniversary`
- `Ariam, Carga Física`
- `Ariam, Carga Física`
- `Ariam, Leyenda`
- `Ariam, Vitalidad`
- `Adendei Cosm / Altea`
- `Adendei / Pirata`
- `Adendei / Altea`
- `Adendei / Carga`
- `Adendei / Pirata recargada`
- `Ejemplo de un mazo temático de "Ariam" el ajolote`

**Relación con el texto:** Ejemplifica visualmente la estrategia 'MAZO TEMÁTICO' descrita en el bloque inferior, usando al personaje Ariam (ajolote) como eje temático.

## Notas de página

Página de estrategias de construcción de mazos. Presenta tres enfoques: Mazo por Energías (ejemplo: pírica), Mazo por Subtipos de Adendei (ejemplos: Titanes/dinosaurios y Abisales/lovecraftianos) y Mazo Temático (ejemplo: Ariam el ajolote). Cada enfoque tiene una fila horizontal de 7 cartas como ejemplo visual. Se menciona expresamente a H. P. Lovecraft como inspiración de los Adendei Abisales. El símbolo de copyright © aparece tras 'Kódem TCG' en una de las menciones.


---

<a id="pagina-35"></a>

# Página 35 — (sin título)

**Verdict:** `both_agree` · **Recomendación:** `accept` · **Confianza:** 0.9 · **Acuerdo LLM↔OCR:** 0.97

**Sección(es):** §7, §8, §8.1

## Bloques de texto

### `[p35/b01]` Mazo por Mecánica
_pos: top_

> Mazo por Mecánica
>
> Elige tu estrategia favorita. Reúne las cartas que tengan tu mecánica favorita y ¡Manos a la obra! Algunos mazos creados por mecánica de juego son los mazos de ataque al Protector, de juego con cartas en Extinción o de juego con equipos aunque hay muchísimos más dentro de Kódem TCG©.

*Notas:* Incluye símbolo de copyright ©

### `[p35/b02]`
_pos: top_

> Ejemplo de un mazo con estrategia de Ataque al Protector

*Notas:* Pie de figura

### `[p35/b03]` 8. Formatos de Juego
_pos: middle_

> 8. Formatos de Juego

*Notas:* Banner de sección principal

### `[p35/b04]` 8.1 Formato Multijugador
_pos: middle_

> 8.1 Formato Multijugador
>
> Este modo de juego permite enfrentamientos estratégicos entre varios jugadores, hasta un máximo de 8 y se estima que el juego tomará 10 minutos por cada jugador en la partida.

### `[p35/b05]` Reglas Generales
_pos: middle_

> Reglas Generales
>
> 1. Orden de Juego: Al iniciar la partida, el orden de turnos se determina de forma aleatoria.
>
> 2. Interacción por Turno: Al comienzo de cada turno, el jugador en turno elige un jugador rival con el que interactuará exclusivamente durante ese turno y podrá elegir jugadores rivales diferentes cada turno. Los efectos de cartas y mecánicas se aplicarán únicamente entre ambos jugadores y sólo las cartas que mencionan en su texto "jugador(es)" , podrán interactuar con otros jugadores fuera del rival elegido al inicio de turno.
>
> 3. Selección de Rivales: Cada turno, los jugadores pueden escoger a un rival diferente.
>
> 4. Aplicación de Cartas y Efectos: Cualquier carta o efecto que interactúe con múltiples cartas rivales se aplicará solo al jugador rival elegido ese turno.

*Notas:* Espacio irregular preservado antes de coma: '"jugador(es)" ,'

### `[p35/b06]` Variantes
_pos: bottom_

> Variantes
>
> • Jungla: Todos los jugadores lucharán entre sí y ganará el último en pie.
>
> a) Condición de Eliminación: Un jugador queda fuera de la partida al acumular 6 cartas en Extinción.
>
> b) Condición de Victoria: El último jugador en pie es el ganador de la partida.
>
>
> • Cazador: Al inicio de la partida, los jugadores elegirán un número de cartas rivales a vencer.
>
> a) Condición de Victoria: El primer jugador que envíe a Extinción el número de cartas rivales acordado, será el vencedor.

## Figuras

### `[p35/fig-01]` mazo-ataque-al-protector-7-cartas *(type: photo)*
_bbox (%): x=5, y=10, w=90, h=15_  
**Legibilidad:** clear — Algunos nombres como 'Urugg' podrían ser 'Urogg' (coherente con otras menciones en p34).  

**Descripción:** Fila horizontal compuesta por siete cartas del juego Kódem TCG dispuestas a modo de ejemplo de un mazo con estrategia de 'Ataque al Protector'. Las cartas muestran una variedad intencional de tipos que se complementan para ejercer presión directa sobre el Protector rival: al menos una carta Protector propia al inicio, varias cartas Adendei de distintos subtipos (Equino, Perro en varias versiones, un monstruo abismal grande), una carta de mecánica especial y una carta de aspecto vegetal/criatura roja enroscada.

Cada carta exhibe ilustraciones coloridas con fondos variados y distintos: escenario urbano/ciudad, fondo de fuego, naturaleza selvática, oscuridad submarina, fondo tecnológico azul y fondo verde selvático. Esta variedad visual refuerza el mensaje de que un mazo por mecánica no requiere homogeneidad temática sino coherencia funcional alrededor de una estrategia común.

Los marcos de las cartas alternan entre blanco/gris (característico del tipo Protector) y oscuros/negros (característicos de Adendei), con indicadores numéricos de ataque y defensa visibles en las esquinas inferiores. Debajo de la fila aparece el pie de figura en cursiva que identifica este arreglo.

**Texto embebido:**
- `Dars, Inspiración`
- `Zagil, Ramas`
- `Kitze, Cola de Fuego`
- `Alc, Venas de Lava`
- `Urugg, Coloso del Terror`
- `Petrología Emergente`
- `Enroscada Escarlata`
- `Ejemplo de un mazo con estrategia de Ataque al Protector`

**Relación con el texto:** Ejemplifica visualmente la estrategia 'Mazo por Mecánica' usando el ataque al Protector como caso. Los nombres sugieren mezcla de varios subtipos pero coherentes en función.

### `[p35/fig-02]` banner-seccion-8-formatos-de-juego *(type: infographic)*
_bbox (%): x=8, y=28, w=85, h=6_  
**Legibilidad:** clear  

**Descripción:** Banner rectangular utilizado como encabezado de sección principal. Mantiene la misma estética de los banners de sección usados en el manual: fondo azul en degradado (azul medio a oscuro) con líneas decorativas diagonales paralelas en blanco o celeste a ambos extremos, que generan una sensación de dinamismo y modernidad.

El texto central está en blanco con tipografía elegante en mayúsculas y un tamaño prominente. El '8.' inicial y el texto 'Formatos de Juego' están alineados horizontalmente en un solo renglón. El banner funciona como separador claro entre la sección 7 (Cómo armar mi mazo) y la nueva sección 8 dedicada a los formatos de juego alternativos.

La consistencia gráfica con otros banners del manual (como el de la sección 7) refuerza la jerarquía visual del documento y facilita la navegación al lector.

**Texto embebido:**
- `8. Formatos de Juego`

**Relación con el texto:** Encabezado principal que introduce la sección 8 del reglamento.

### `[p35/fig-03]` etiqueta-8-1-formato-multijugador *(type: infographic)*
_bbox (%): x=8, y=36, w=40, h=4_  
**Legibilidad:** clear  

**Descripción:** Etiqueta o pestaña ovalada/redondeada de color azul intenso con texto en blanco que marca la subsección 8.1 del reglamento. El diseño es compacto y más pequeño que los banners de sección principal, actuando como etiqueta de nivel secundario en la jerarquía visual del manual.

La tipografía es en mayúsculas/versalitas, con la pequeña numeración '8.1' a la izquierda del título 'Formato Multijugador'. El relleno azul contrasta con el blanco del texto, manteniendo alto nivel de legibilidad. Este estilo de etiqueta se repite a lo largo del manual para introducir las subsecciones.

**Texto embebido:**
- `8.1 Formato Multijugador`

**Relación con el texto:** Encabezado visual para la primera subsección de Formatos de Juego.

### `[p35/fig-04]` etiqueta-reglas-generales *(type: infographic)*
_bbox (%): x=8, y=45, w=35, h=4_  
**Legibilidad:** clear  

**Descripción:** Etiqueta secundaria con diseño de contorno redondeado, borde visible y fondo blanco o muy claro, que contiene el texto 'Reglas Generales' en tipografía negrita con mayúsculas versales. Actúa como separador visual dentro de la subsección 8.1 para introducir específicamente las reglas del formato multijugador.

A diferencia de las etiquetas de subsección principal (como 8.1), esta etiqueta tiene un estilo más sobrio: solo contorno azul sin relleno pleno, lo que indica una jerarquía visual inferior. Sirve para agrupar las 4 reglas numeradas que vienen a continuación.

**Texto embebido:**
- `Reglas Generales`

**Relación con el texto:** Introduce el bloque de 4 reglas generales del Formato Multijugador.

### `[p35/fig-05]` iguana-azul-decorativa *(type: illustration)*
_bbox (%): x=70, y=80, w=28, h=18_  
**Legibilidad:** clear  

**Descripción:** Ilustración decorativa ubicada en el margen inferior derecho de la página que muestra una criatura fantástica con apariencia de iguana o lagarto de gran tamaño en tonos azul turquesa brillante. La criatura está representada en posición semierguida, con una cresta de púas doradas o amarillas que corre por su cabeza y espalda, y marcas ornamentales anaranjadas/doradas distribuidas por el cuerpo que sugieren bioluminiscencia o decoración ritual.

La expresión del personaje es feroz e intimidante, con ojos amarillos intensos, fauces abiertas mostrando dientes afilados y una musculatura bien definida que transmite poder físico. Las escamas o pelaje azulado están renderizados con efectos de luz que generan volumen y realismo.

El estilo es artístico y estilizado, coherente con la estética general de las ilustraciones de personajes del universo Kódem TCG. Al estar posicionada en el margen derecho y ocupando parcialmente el fondo inferior, la figura funciona como elemento decorativo para enriquecer visualmente la página del reglamento, más que como contenido informativo directo. No tiene texto embebido visible.

**Relación con el texto:** Elemento decorativo sin relación directa con el texto de reglas; probablemente un arte de un Adendei del juego usado como adorno de página.

## Notas de página

Página de transición: cierra la sección 7 (Mazo por Mecánica, con ejemplo de Ataque al Protector) y abre la sección 8 'Formatos de Juego', desarrollando 8.1 'Formato Multijugador' con 4 reglas generales y dos variantes (Jungla y Cazador). La página termina con la variante 'Cazador' incompleta (continúa en p36). Decoración con ilustración de iguana/lagarto azul en margen inferior derecho.


---

<a id="pagina-36"></a>

# Página 36 — (sin título)

> 🧪 **Spot-check Ramsés (pass 3)** — Revisada y anotada por humano.

**Notas de spot-check (humanas):**

- Adendei → Adendei en 0 ocurrencias (LLM alucinó 'Adendei').
- Confirmado: la carta 'Tekei' de p36 es la misma que aparece en p32 (no cartas distintas).

**Verdict:** `llm_preferred` · **Recomendación:** `spot_check_human` · **Confianza:** 0.87 · **Acuerdo LLM↔OCR:** 0.93

**Sección(es):** §8.1, §8.2

## Bloques de texto

### `[p36/b01]` • Manada
_pos: top_

> • Manada:
>
> Los jugadores realizarán equipos (Manadas) con el mismo número de integrantes y compartirán Extinción, al inicio de la partida decidirán el total de cartas en Extinción como condición de victoria. Las cartas y efectos aplican únicamente para cada jugador individual, por lo cual no se pueden utilizar para todos los jugadores de un equipo.
>
> a) Condición de Victoria: El primer jugador que envíe a Extinción el número de cartas rivales acordado, será el vencedor.

*Notas:* Tercera variante del Formato Multijugador (continuación de p35)

### `[p36/b02]` 8.2 Formato Extendido
_pos: middle_

> 8.2 Formato Extendido
>
> Este formato de juego expande las posibilidades estratégicas, ofreciendo una experiencia que evoca la mecánica más tradicional de los juegos de cartas coleccionables tradicionales. A diferencia del Formato Estándar que explicamos a lo largo de este Libro de Reglas, en el Formato Extendido puedes llevar múltiples copias de tus cartas Adendei y Rava.

*Notas:* Redundancia preservada: 'juegos de cartas coleccionables tradicionales'

### `[p36/b03]`
_pos: middle_

> a) Composición del Mazo:
> El Mazo debe tener exactamente 50 cartas, pudiendo incluir hasta 3 Ravas.
> Puedes llevar hasta 3 copias de cada carta Adendei.
> Se permiten hasta 12 cartas de equipo en la Zona de Equipo (Estas cartas no podrán tener múltiples copias).

### `[p36/b04]`
_pos: middle_

> b) Selección de Cartas Suplentes:
> Cuando una carta es enviada a la Zona de Extinción, toma 3 cartas de tu Mazo Principal y elige 1 como carta suplente para reemplazarla.
> Puedes optar por sacar 1 o 2 cartas adicionales a cambio de dañar esa misma cantidad de puntos de vida de tu Protector. Esta decisión debe hacerse al momento de tomar las primeras 3 cartas y no puede realizarse después.

*Notas:* El texto original tiene partido 'Protec-tor' y 'pri-meras' por guiones de fin de línea; se reconstruye sin el guión para lectura fluida pero preservando el contenido.

### `[p36/b05]`
_pos: middle_

> c) Condición de Victoria:
> Enviar 10 cartas rivales a la Zona de Extinción, o enviar 3 cartas rivales con el mismo nombre y/o ilustración a la Zona de Extinción.

### `[p36/b06]` CARTAS LIMITADAS
_pos: bottom_

> CARTAS LIMITADAS
>
> NOMBRE DE LA CARTA                    No. DE COPIAS
>
> Zotz, Absorción de Energía
>                                                           0
>
> Tekei, Responsabilidad
>                                                           1

*Notas:* Encabezado de tabla con dos columnas: nombre de carta y número de copias permitidas. Solo se muestran 2 entradas en la tabla visible en esta página; podría continuar en p37.

## Figuras

### `[p36/fig-01]` tres-copias-tun-mensajero-celestial *(type: photo)*
_bbox (%): x=60, y=30, w=35, h=25_  
**Legibilidad:** clear — Los indicadores numéricos y el texto de habilidad se leen bien; el saborcito narrativo de la parte inferior no es visible con claridad debido al escalonamiento.  

**Descripción:** Fotografía en perspectiva que muestra tres cartas físicas del juego Kódem TCG idénticas superpuestas y ligeramente escalonadas en abanico, ilustrando visualmente la regla del Formato Extendido que permite llevar hasta 3 copias de cada carta Adendei. La carta repetida es 'Tun, Mensajero Celestial'.

La ilustración central de cada copia muestra un colibrí o ave mitológica con plumaje de colores vibrantes: verdes iridiscentes, morados, dorados y anaranjados que se combinan en efectos de luz dramáticos. El ave aparece en movimiento o vuelo, con las alas desplegadas y una silueta elegante. El fondo es cálido, con tonos anaranjados y rojos que generan destellos y efectos de aura, sugiriendo un entorno celestial o divino coherente con el epíteto 'Mensajero Celestial'.

El diseño de la carta sigue el formato estándar de Kódem TCG: marco ornamentado con iconografía del juego, nombre en la parte superior ('Tun, Mensajero Celestial'), clasificación de tipo debajo del nombre ('Adendei / Chaskita'), texto de habilidad en la parte media-baja (Pasiva: 'Esta carta no puede recibir daño por elección'), y en la esquina inferior los indicadores numéricos de estadísticas (aparecen los valores 2, 1 y 4, que probablemente corresponden a costos/ataque/defensa según la mecánica del juego).

La disposición escalonada de las tres copias refuerza visualmente el mensaje principal del texto adyacente: en Formato Extendido, a diferencia del Estándar, se permiten múltiples copias de Adendei. El ligero desplazamiento entre cartas permite leer parcialmente los nombres y confirmar que se trata de la misma carta repetida tres veces.

**Texto embebido:**
- `Tun, Mensajero Celestial`
- `Adendei / Chaskita`
- `Pasiva: Esta carta no puede recibir daño por elección`
- `2`
- `1`
- `4`

**Relación con el texto:** Ilustra directamente la regla 'Puedes llevar hasta 3 copias de cada carta Adendei' del Formato Extendido. La imagen muestra exactamente 3 copias de la misma carta.

### `[p36/fig-02]` carta-zotz-absorcion-de-energia *(type: illustration)*
_bbox (%): x=12, y=78, w=22, h=18_  
**Legibilidad:** needs_enhance — El texto narrativo de la parte inferior contiene grafías poco legibles ('Áhntzi', 'Āhn Zotz') que podrían ser errores de lectura del OCR o nombres propios del universo Kódem. La clasificación de tipo 'Adendei' podría ser 'Adende' (variante ortográfica).  

**Descripción:** Ilustración de la carta 'Zotz, Absorción de Energía' del juego Kódem TCG, mostrada como referencia visual en la tabla de cartas limitadas con 0 copias permitidas en Formato Extendido. La ilustración central muestra una criatura tipo dragón o murciélago de gran tamaño con alas extendidas, de coloración marrón-rojiza oscura, posado sobre una superficie oscura y rocosa.

La criatura está rodeada de una energía azul brillante que emana de sus garras o del entorno inmediato, generando un efecto luminoso dramático que contrasta con la atmósfera oscura general. El fondo combina tonos púrpura profundo, azul oscuro y negro, creando una escena de aire nocturno y sobrenatural, coherente con el nombre 'Absorción de Energía' que sugiere un acto mágico-vampírico.

En la parte inferior de la carta se aprecia el marco estándar con iconos de estadísticas y el texto de habilidad. La clasificación de tipo parece indicar 'Adendei / Háumsca' (posible variante ortográfica o error de lectura del OCR). La Pasiva descrita permite copiar la Activa y el Combo de una carta en Extinción una vez por turno, lo que explica por qué está limitada a 0 copias en Formato Extendido (es demasiado poderosa). En la parte inferior aparece un texto narrativo en cursiva sobre la absorción de energía de seres vencidos.

**Texto embebido:**
- `Zotz, Absorción de Energía`
- `Adendei / Háumsca`
- `Pasiva: Esta carta puede copiar la Activa y el Combo de una carta en Extinción, una vez en el turno.`
- `Absorbe la energía de los seres que caen vencidos y establece para volverse Áhntzi... sin ser Āhn Zotz algo pasó por ahí.`

**Relación con el texto:** Referencia visual para la entrada 'Zotz, Absorción de Energía' en la tabla de CARTAS LIMITADAS con 0 copias.

### `[p36/fig-03]` carta-tekei-responsabilidad *(type: illustration)*
_bbox (%): x=38, y=78, w=22, h=18_  
**Legibilidad:** needs_enhance — El texto narrativo de la parte inferior tiene construcción gramatical extraña ('Controla a los demás de Tekei...') que sugiere posible error de lectura del OCR o estilo narrativo estilizado del juego. La clasificación 'Adendei' probablemente debería ser 'Adende'.  

**Descripción:** Ilustración de la carta 'Tekei, Responsabilidad' del juego Kódem TCG, mostrada como referencia visual para la entrada de la tabla de cartas limitadas con 1 copia permitida en Formato Extendido. La ilustración central presenta una criatura elegante con apariencia de ciervo, antílope o ser etéreo con grandes astas ramificadas, de pie en pose noble y solemne.

El personaje irradia una aura blanca-azulada luminosa que contrasta dramáticamente con el fondo, generando una sensación de divinidad o poder espiritual. El fondo está compuesto por tonos rosados y rojos cálidos que evocan pétalos de flores cayendo, llamas ritualísticas o partículas mágicas flotando alrededor del personaje.

La atmósfera general es mística y solemne, coherente con el epíteto 'Responsabilidad' que sugiere un rol de liderazgo o carga sagrada en la narrativa del juego. El estilo artístico es más pictórico y etéreo que otras cartas del manual, reforzando su estatus especial (solo 1 copia permitida).

En la parte inferior de la carta se ven los iconos de estadísticas y texto de habilidades. La clasificación de tipo aparece como 'Adendei / Háumsca' (coherente con la carta Zotz de la misma sección). La Pasiva protege a todas las cartas aliadas de ser enviadas a Extinción, y el Costo indica que la carta misma no puede ser enviada ni protegida, reforzando su naturaleza de 'ancla' protectora. El texto narrativo final hace referencia al 'antiguo Linaje de Mák'.

**Texto embebido:**
- `Tekei, Responsabilidad`
- `Adendei / Háumsca`
- `Pasiva: Las cartas aliadas no pueden ser enviadas a Extinción.`
- `Costo: Esta carta no puede ser enviada ni protegida.`
- `Controla a los demás de Tekei del origen fino del antiguo Linaje de Mák.`

**Relación con el texto:** Referencia visual para la entrada 'Tekei, Responsabilidad' en la tabla de CARTAS LIMITADAS con 1 copia permitida.

## Notas de página

Página con tres secciones: cierre de variantes del Formato Multijugador con la variante 'Manada' (inicio de p36), subsección 8.2 Formato Extendido completa (composición del mazo, suplentes, condición de victoria) y el inicio de una tabla de CARTAS LIMITADAS que muestra 2 entradas (Zotz: 0 copias, Tekei: 1 copia) con ilustraciones de referencia de ambas cartas. El texto original tenía palabras partidas por guiones de fin de línea ('Protec-tor', 'pri-meras') que fueron reconstruidas conservando el contenido. La clasificación 'Adendei / Háumsca' aparece dos veces pero probablemente debería ser 'Adende' (posible variante ortográfica del manual o error de transcripción OCR).

### ⚡ Rulings aplicables a esta página (ver `rulings-v5.1.md`)

- **D7** — "1 copia por nombre" aplica sólo a Formato Estándar. En Multijugador y Extendido aplica la lista de Cartas Limitadas de esta página.
- **D46** (2026-04-22) — **Copias libres de Rava en Formato Extendido.** Los Ravas NO están en la lista de Limitadas → se permiten múltiples copias del mismo Rava. Único límite aplicable: 2 Ravas por mazo (límite de tipo `p14/b11`).
- **M9** (2026-04-22) — **Multijugador es formato oficial.** Rango 4-20 jugadores. Todas las reglas del 1v1 aplican idénticamente. Las cartas *"hasta N jugadores"* (Maiz, Vesta Ignia, Enjambre Pírico, Ulmor) están diseñadas para escalar sin re-impresión.
- **D50** (2026-04-22, Logos por derivación) — **Semántica de "rival" en Multijugador:** híbrido narrow/wide según verbo electivo. Verbo electivo (*"elige un rival"*) → narrow 1-target, el activo elige. Condicional pasivo (*"si un rival tiene X"*) → wide implícito por D52 (cualquier rival dispara). *"Todos los rivales"* explícito → todos. *"Hasta N jugadores"* → activo elige hasta N. Compone D52 + M9. Criterio simple: *¿el verbo obliga a elegir?* → sí→narrow; no→wide por default.

---

<a id="pagina-37"></a>

# Página 37 — 9. GLOSARIO

**Verdict:** `llm_preferred` · **Recomendación:** `accept` · **Confianza:** 0.78 · **Acuerdo LLM↔OCR:** 0.88

**Sección(es):** §9, §6.1, §6.3

## Bloques de texto

### `[p37/b01]`
_pos: top_

> NOMBRE DE LA CARTA   NO. DE COPIAS

*Notas:* Encabezados de la tabla de cartas en la mitad superior de la página. Continúa una tabla iniciada en páginas anteriores con el listado de cartas del mazo de muestra o set de inicio.

### `[p37/b02]` 9. GLOSARIO
_pos: middle_

> 9. GLOSARIO

*Notas:* Encabezado de sección del glosario, presentado dentro de un banner decorativo azul con chevrones hacia el centro.

### `[p37/b03]`
_pos: bottom-left_

> •Abismar: Marca. Una carta abismada ataca al azar; lanza un dado para determinar el objetivo del ataque. (Ver 6.1. Marcas).

*Notas:* Primera entrada del glosario. 'Marca' aparece en cursiva/itálica. 'abismada' y '(Ver 6.1. Marcas)' también en cursiva. Viñeta especial con bullet pegado a la palabra.

### `[p37/b04]`
_pos: bottom-right_

> •Daño por costo: Daños que se realizan para poder resolver la declaración de un ataque y/o efecto (Ver 6.3. Tipos de Daño).

*Notas:* Segunda entrada del glosario. '(Ver 6.3. Tipos de Daño)' en cursiva. El glosario aparenta estar organizado en dos columnas.

### `[p37/b05]`
_pos: bottom-right_

> 37

*Notas:* Número de página en la esquina inferior derecha sobre fondo azul.

## Figuras

### `[p37/fig-01]` tabla-cartas-mazo-continuacion *(type: table)*
_bbox (%): x=5, y=3, w=90, h=55_  
**Legibilidad:** needs_enhance — Los nombres de cartas y el número de copias son claros. El texto de habilidades dentro de las miniaturas de cartas no es completamente legible a resolución reducida; los tipos exactos de cartas (Adendei/Protector/Rava/etc.) no pueden confirmarse sin imagen de mayor resolución.  

**Descripción:** Tabla de cartas del mazo de muestra que ocupa la mitad superior de la página. Encabezado con fondo azul oscuro institucional y texto blanco en mayúsculas: 'NOMBRE DE LA CARTA' en la columna izquierda y 'NO. DE COPIAS' en la columna derecha. La tabla contiene cinco filas de cartas, cada una con una imagen de carta impresa en formato miniatura a la izquierda y el número de copias (siempre 1) centrado a la derecha.

Primera fila — 'Zots, Rechazo' (1 copia): Carta con ilustración de una criatura reptiliana/dracónica en tonos azul oscuro y morado, con postura agresiva orientada hacia la izquierda, rasgos afilados y extremidades extendidas. Ambientada en un entorno oscuro y cavernoso con fondos rojizos y anaranjados que sugieren fuego o energía en la parte superior. El marco de la carta sigue el diseño estándar de Kódem TCG con nombre y tipo en la parte superior e iconos de costo en la parte inferior.

Segunda fila — 'Zaykan, Anulación' (1 copia): Carta con ilustración de una criatura grande de tipo dinosaurio/dragón predominantemente en azul profundo y negro con detalles violetas. Postura erguida y dominante, mirando hacia adelante. Fondo oscuro con tonos azulados, efectos de energía o agua rodeando la figura y destellos luminosos azules alrededor. La carta muestra habilidad pasiva según su marco.

Tercera fila — 'Retis, Superficie' (1 copia): Carta con ilustración de una criatura verde colorida de aspecto dinámico y ágil, con tonos verdes, rosas y amarillos. Pose de salto o carrera. Fondo con colores turquesa y azul celeste, efectos de agua o energía arremolinada alrededor transmitiendo sensación de velocidad y fluidez. Marco de carta con iconos de coste visibles en la parte inferior.

Cuarta fila — 'Ariam, Límite' (1 copia): Carta con ilustración de una criatura en tonos amarillos, dorados y negros con aspecto poderoso. Pose de ataque o impulso con extremidades en movimiento. Fondo con destellos de luz blanca y amarilla intensa, contrastes oscuros que resaltan la figura. Transmite energía explosiva y dinamismo. Tres iconos de coste en la parte inferior de la carta.

Quinta fila — 'Chapalab, El Anciano' (1 copia): Carta con ilustración de una criatura de aspecto oscuro y misterioso en tonos morados, negros y verdes. Apariencia antigua y sombría con tentáculos o apéndices extendidos. Fondo completamente oscuro/negro con pequeños detalles de luz verde que acentúan su carácter abismal y amenazante. Icono de habilidad en la carta.

La tabla utiliza filas alternadas con fondo claro/blanco para separar visualmente cada carta. Los bordes de la tabla son finos con líneas negras, y el encabezado azul contrasta fuertemente con el contenido blanco del cuerpo.

**Texto embebido:**
- `NOMBRE DE LA CARTA`
- `NO. DE COPIAS`
- `Zots, Rechazo`
- `1`
- `Zaykan, Anulación`
- `1`
- `Retis, Superficie`
- `1`
- `Ariam, Límite`
- `1`
- `Chapalab, El Anciano`
- `1`

**Relación con el texto:** Es la continuación de la tabla de composición del mazo de muestra/inicio que comenzó en páginas anteriores del rulebook. Lista las últimas cinco cartas del mazo con su número de copias.

### `[p37/fig-02]` banner-seccion-9-glosario *(type: infographic)*
_bbox (%): x=5, y=60, w=90, h=10_  
**Legibilidad:** clear — Texto completamente legible.  

**Descripción:** Banner decorativo de sección horizontal que atraviesa el ancho útil de la página. Fondo azul oscuro institucional del rulebook con elementos decorativos en forma de chevrones o flechas apuntando hacia el centro desde ambos extremos. Texto centrado en color blanco con tipografía en mayúsculas y estilo editorial: '9. GLOSARIO'. Los chevrones a los lados crean un efecto visual de banda ceremonial que marca el inicio de la sección final del rulebook. El banner mantiene la consistencia visual con otros banners de sección del documento (secciones anteriores usan el mismo patrón de diseño).

**Texto embebido:**
- `9. GLOSARIO`

**Relación con el texto:** Marca el inicio de la sección 9 del rulebook, el glosario de términos del juego Kódem TCG.

### `[p37/fig-03]` numero-pagina-37 *(type: icon)*
_bbox (%): x=90, y=95, w=8, h=4_  
**Legibilidad:** clear  

**Descripción:** Número de página '37' en la esquina inferior derecha sobre un fondo azul oscuro institucional con forma posiblemente rectangular o redondeada. Texto en blanco, tipografía consistente con la paginación del resto del rulebook. Elemento gráfico repetitivo de diseño editorial.

**Texto embebido:**
- `37`

**Relación con el texto:** Indicador de paginación del documento.

## Notas de página

Página de transición: la mitad superior cierra la tabla de cartas del mazo de muestra (filas finales de una tabla multi-página) y la mitad inferior inaugura la sección 9 del glosario con un banner de sección y las primeras dos entradas organizadas en dos columnas. Los tipos específicos de las cartas (Adendei/Protector/Rava/Bio/etc.) no son legibles a la resolución procesada.


---

<a id="pagina-38"></a>

# Página 38 — 9. GLOSARIO (continuación)

**Verdict:** `both_agree` · **Recomendación:** `accept` · **Confianza:** 0.88 · **Acuerdo LLM↔OCR:** 0.97

**Sección(es):** §9, §3.1, §3.4, §3.5, §4, §5, §6.1, §6.2, §6.3, §6.4, §6.5, §6.6

## Bloques de texto

### `[p38/b01]`
_pos: top-left_

> •Activa: Efecto. Puede estar ligado al ataque si indica "cuando esta carta ataca.../ si esta carta atacó..." Su uso es obligatorio cuando no indica "puede". Su uso requiere aplicación de descansos. (Ver 6.6 Efectos).

*Notas:* Palabras 'Efecto', 'cuando esta carta ataca...', 'si esta carta atacó...' y '(Ver 6.6 Efectos)' en cursiva.

### `[p38/b02]`
_pos: top-left_

> •Activa-Rápida: Efecto. A diferencia de la Activa también puede usarse durante el turno del rival como respuesta y resuelve tan pronto se declara. Su uso requiere aplicación de descansos. (Ver 6.6 Efectos).

*Notas:* 'Efecto' y '(Ver 6.6 Efectos)' en cursiva.

### `[p38/b03]`
_pos: top-left_

> •Adendei: Carta. Carta Principal en el juego. Cada una cuenta con 6 puntos de vida. (Ver 3.1. Adendei).

*Notas:* 'Carta' y '(Ver 3.1. Adendei)' en cursiva.

### `[p38/b04]`
_pos: left_

> •Atacar: Se considera que una carta está atacando cuando se declara que va realizar daño (de ataque) a otra carta (ver 6.5. Ataques). El efecto de una carta está condicionado a su ataque solo si la carta lo indica. Ej: Efecto: Si esta carta ataca/atacó...

*Notas:* '(ver 6.5. Ataques)' y el ejemplo en cursiva.

### `[p38/b05]`
_pos: left_

> •Bio: Carta. Carta de campo. No posee puntos de vida ni descansos. (Ver 3.5. Bio).

*Notas:* 'Carta' y '(Ver 3.5. Bio)' en cursiva.

### `[p38/b06]`
_pos: left_

> •Campo: Conjunto de zonas que incluye: Zona de Protector, Zona Principal y Zona de Bio. (Ver 4.Preparación del Ecosistema).

*Notas:* Referencia cruzada en cursiva.

### `[p38/b07]`
_pos: middle-left_

> •Cambiar: Efecto. Movimiento de una carta de un espacio a otro dentro del campo de un jugador, así como el movimiento entre los campos de diferentes jugadores. (Ver 6.4. Cambios entre Zonas).

*Notas:* 'Efecto' y referencia cruzada en cursiva.

### `[p38/b08]`
_pos: middle-left_

> •Carta Aliada: Carta. Cuando una carta especifica "aliado", significa que su efecto aplica para cualquier carta del lado de su campo pero no para ella misma. Si el efecto de la carta no especifica "aliada" o "rival", su efecto puede aplicarse a cualquier carta.

*Notas:* 'Carta' en cursiva.

### `[p38/b09]`
_pos: middle-left_

> •Carta Rival: Cualquier carta del jugador rival que esté en su Ecosistema.

### `[p38/b10]`
_pos: middle-left_

> •Colocar en campo: Efecto. Acción de turno. Una carta se considera colocada en el campo al entrar a este desde cualquier otra Zona.

*Notas:* 'Efecto. Acción de turno.' en cursiva.

### `[p38/b11]`
_pos: middle-left_

> •Copiar: Efecto. Añade temporalmente el efecto de otra carta especificada a su efecto original. El efecto copiado no es acumulativo. Si se copia un nuevo efecto, el efecto copiado anterior se reemplaza por el nuevo.

*Notas:* 'Efecto' en cursiva.

### `[p38/b12]`
_pos: middle-left_

> •Costo: No se considera efecto. Son acciones que se deben pagar al declarar el efecto o ataque para usar efectos o atacar (Ver 6.6 Efectos).

*Notas:* Referencia cruzada en cursiva.

### `[p38/b13]`
_pos: bottom-left_

> •Curar: Efecto. Incrementa los puntos de vida de una carta, sin exceder su máximo (Ver 6.2. Cambios de Estadísticas).

*Notas:* 'Efecto' y referencia cruzada en cursiva.

### `[p38/b14]`
_pos: bottom-left_

> •Daño: Reduce los puntos de vida de una carta (Ver 6.2. Cambios de Estadísticas).

*Notas:* Referencia cruzada en cursiva.

### `[p38/b15]`
_pos: bottom-left_

> •Daño por Ataque: Total de daño de un ataque declarado (incluye escalas y daños adicionales) (Ver 6.3. Tipos de Daño).

*Notas:* Referencia cruzada en cursiva.

### `[p38/b16]`
_pos: top-right_

> •Daño por efecto: Cualquier daño que no provenga directamente de la estadística de daño de una carta o que provenga de cualquier efecto que no mencione "ataca", "aumenta el daño" o "daña adicionalmente" en su texto. Si una carta no menciona a qué carta se aplica el daño por efecto, aplicará sólo a la carta declarada para el ataque (Ver 6.3. Tipos de Daño).

*Notas:* Referencia cruzada en cursiva.

### `[p38/b17]`
_pos: top-right_

> •Daño por marca: Los daños que se realizan como parte de una marca (Ver 6.1. Marcas).

*Notas:* Referencia cruzada en cursiva.

### `[p38/b18]`
_pos: top-right_

> •Declaración: Subfase. Se declara el ataque a la(s) carta(s) rival(es) deseadas por el portador del turno (Ver 5. Fases de Turno).

*Notas:* 'Subfase' y referencia cruzada en cursiva.

### `[p38/b19]`
_pos: middle-right_

> •Declarar un ataque: Es la acción de decirle a tu rival que vas a dañar una de sus cartas por el daño marcado en la estadística de una de tus cartas, también incluye el daño aumentado y/o el daño adicional que la carta tuviera en ese momento (Ver 5. Fases de Turno).

*Notas:* Referencia cruzada en cursiva.

### `[p38/b20]`
_pos: middle-right_

> •Declarar un efecto: Es la acción de decirle a tu rival que vas a utilizar el efecto de una carta. Si la condición de uso de un efecto no se cumple el efecto no podrá ser declarado. Los efectos declarados en cualquier zona o fuera de ellas (Ej. cartas tomadas o vivificadas) se considerarán que resuelven como si la carta aun estuviera en dicho lugar aun si la carta ya no se encuentra en la misma zona o lugar donde se declaró el efecto (Ver 5. Fases de Turno).

*Notas:* '(Ej. cartas tomadas o vivificadas)' y referencia cruzada en cursiva.

### `[p38/b21]`
_pos: middle-right_

> •Descender: Efecto. Disminuye permanentemente los puntos de daño de una carta (Ver 6.2. Cambios de Estadísticas).

*Notas:* 'Efecto' y referencia cruzada en cursiva.

### `[p38/b22]`
_pos: middle-right_

> •Desviar: Efecto. Redirige el daño, Ataque o efecto respectivo a la carta especificada en el texto. Si una carta desvía daño, se considera que desvía tipo de daño original (de ataque o efecto).

*Notas:* 'Efecto' en cursiva.

### `[p38/b23]`
_pos: middle-right_

> •Eliminar: Acción de Turno. Una carta es enviada a la Zona de Extinción (Ver 5. Fases de Turno).

*Notas:* 'Acción de Turno' y referencia cruzada en cursiva.

### `[p38/b24]`
_pos: middle-right_

> •Ecosistema: Espacio de juego que incluye todos los elementos de tu tablero y las Zonas que lo conforman (Ver 4.Preparación del Ecosistema).

*Notas:* Referencia cruzada en cursiva.

### `[p38/b25]`
_pos: bottom-right_

> •Envenenar: Marca. Una carta envenenada recibe 1 punto de daño al final del turno del portador (Ver 6.1. Marcas).

*Notas:* 'Marca', 'envenenada' y referencia cruzada en cursiva.

### `[p38/b26]`
_pos: bottom-right_

> •Equipo: Carta. Son cartas "Ixim" o "Rot" que puedes equipar a Adendei o cartas que especifiquen dichos equipos por su texto para añadir efectos durante el juego (Ver 3.4. Equipos).

*Notas:* 'Carta', '"Ixim"', '"Rot"', 'Adendei' y referencia cruzada en cursiva.

### `[p38/b27]`
_pos: bottom-right_

> •Escalar: Efecto. Aumenta permanentemente los puntos de daño de una carta (Ver 6.2. Cambios de Estadísticas).

*Notas:* 'Efecto' y referencia cruzada en cursiva.

### `[p38/b28]`
_pos: bottom-right_

> •Feralizar: Efecto. Una carta feralizada pierde 1 de sus energías originales y se considera energía Feral (Ver 6.2. Cambios de Estadísticas).

*Notas:* 'Efecto' y referencia cruzada en cursiva.

### `[p38/b29]`
_pos: bottom-right_

> •Ixim: Equipo. Basados en los reinos vegetal y fungi. Posee efectos "Pasiva" o "Pasiva Rápida" en su mayoría (Ver 3.4. Equipos).

*Notas:* 'Equipo' y referencia cruzada en cursiva.

### `[p38/b30]`
_pos: bottom-right_

> •Marca: "Quemar", "Abismar" y "Envenenar" se consideran Marcas. Las Marcas pueden eliminarse con el efecto de "Remover" y "Curar" (Ver 6.1. Marcas).

*Notas:* Las palabras de marcas entre comillas en cursiva. Referencia cruzada en cursiva.

### `[p38/b31]`
_pos: bottom-right_

> 38

*Notas:* Número de página.

## Figuras

### `[p38/fig-01]` glosario-doble-columna-A-a-M *(type: infographic)*
_bbox (%): x=5, y=3, w=90, h=92_  
**Legibilidad:** clear — Texto plenamente legible en la extracción.  

**Descripción:** La página entera está dedicada al glosario de términos del juego Kódem TCG, organizado en dos columnas verticales de igual ancho con separación central. Tipografía sans-serif en negro sobre fondo blanco/cremoso del papel. Cada entrada inicia con una viñeta circular sólida (•) pegada a la palabra definida, la cual aparece en negrita. Después viene el tipo de término en cursiva ('Efecto', 'Carta', 'Marca', 'Acción de Turno', 'Subfase', 'Equipo'), seguido de la definición en texto normal. Las referencias cruzadas aparecen siempre al final entre paréntesis en cursiva con formato '(Ver X.Y. Nombre)'.

La columna izquierda abarca desde la letra A (Activa, Activa-Rápida, Adendei, Atacar) pasa por B (Bio) y C (Campo, Cambiar, Carta Aliada, Carta Rival, Colocar en campo, Copiar, Costo, Curar) hasta llegar al inicio de D (Daño, Daño por Ataque).

La columna derecha continúa con D (Daño por efecto, Daño por marca, Declaración, Declarar un ataque, Declarar un efecto, Descender, Desviar), E (Eliminar, Ecosistema, Envenenar, Equipo, Escalar), F (Feralizar), I (Ixim) y termina con M (Marca).

El diseño del glosario mantiene la consistencia visual del rulebook con márgenes amplios y ninguna ilustración o icono adicional dentro del contenido del glosario. No hay banners de sección en esta página ya que la sección 9 fue introducida en la página 37.

En la esquina inferior derecha se observa el número de página '38' sobre fondo azul institucional, manteniendo el patrón de paginación del documento.

**Texto embebido:**
- `Activa`
- `Activa-Rápida`
- `Adendei`
- `Atacar`
- `Bio`
- `Campo`
- `Cambiar`
- `Carta Aliada`
- `Carta Rival`
- `Colocar en campo`
- `Copiar`
- `Costo`
- `Curar`
- `Daño`
- `Daño por Ataque`
- `Daño por efecto`
- `Daño por marca`
- `Declaración`
- `Declarar un ataque`
- `Declarar un efecto`
- `Descender`
- `Desviar`
- `Eliminar`
- `Ecosistema`
- `Envenenar`
- `Equipo`
- `Escalar`
- `Feralizar`
- `Ixim`
- `Marca`
- `38`

**Relación con el texto:** Esta figura ES el texto principal de la página; es el cuerpo del glosario organizado visualmente en dos columnas.

### `[p38/fig-02]` numero-pagina-38 *(type: icon)*
_bbox (%): x=90, y=95, w=8, h=4_  
**Legibilidad:** clear  

**Descripción:** Número de página '38' en la esquina inferior derecha sobre fondo azul oscuro institucional. Elemento gráfico repetitivo del diseño editorial del rulebook.

**Texto embebido:**
- `38`

**Relación con el texto:** Indicador de paginación.

## Notas de página

Página íntegra de glosario en doble columna. Abarca desde 'Activa' hasta 'Marca'. Todas las entradas siguen patrón: viñeta • + término en negrita + tipo en cursiva + definición + referencia cruzada en cursiva.


---

<a id="pagina-39"></a>

# Página 39 — 9. GLOSARIO (continuación)

**Verdict:** `both_agree` · **Recomendación:** `accept` · **Confianza:** 0.9 · **Acuerdo LLM↔OCR:** 0.98

**Sección(es):** §9, §1.3, §3.2, §3.3, §3.4, §4, §5, §5.2, §5.3, §6.1, §6.6, §6.7

## Bloques de texto

### `[p39/b01]`
_pos: top-left_

> •Mazo (Mazo Principal): Zona. Las cartas de Adendei y/o Rava que no se encuentren en la Zona de Extinción o en la Zona Principal irán aquí y entrarán en juego como cartas suplentes. Estas cartas irán estructuradas, no revueltas. Si una carta se devuelve al Mazo por efecto de alguna otra carta, la nueva carta se colocará en la Zona Principal con los mismos puntos de vida que tenía la carta devuelta (Ver 4. Preparación del Ecosistema).

*Notas:* 'Zona', 'Adendei', 'Rava' y la referencia cruzada en cursiva.

### `[p39/b02]`
_pos: top-left_

> •Mazo General: Conjunto de cartas compuesto por los diferentes tipos de cartas de Kódem (Adendei, Ravas, Protectores, Equipos, Bio y Tokens) (Ver 1.3. Componentes de Juego).

*Notas:* Lista de tipos de cartas y referencia cruzada en cursiva.

### `[p39/b03]`
_pos: top-left_

> •Mostrar: Acción de Turno. Enseñar la carta al rival. Mostrar una carta no implica revelar una carta. Algunas cartas pueden declarar sus efectos al ser mostradas. Ej. "Si esta carta es tomada del mazo muestrala y cura 1 pto. a una carta aliada".

*Notas:* 'Acción de Turno', 'revelar', 'mostradas' y el ejemplo en cursiva. Typo: 'muestrala' sin tilde.

### `[p39/b04]`
_pos: middle-left_

> •Negar: Efecto. Su significado cambia dependiendo de si se niega un ataque o un efecto.

*Notas:* 'Efecto' en cursiva.

### `[p39/b05]`
_pos: middle-left_

> •Negar un ataque: Es un efecto que hace que la declaración de un ataque resuelva como si el ataque y/o múltiples ataques no se hubieran declarado, sin embargo, la carta deberá descansar al final del turno.

### `[p39/b06]`
_pos: middle-left_

> •Negar un efecto: Significa que un efecto declarado no podrá resolver mientras se encuentre negado. Si la duración de un efecto dura más de un turno y es negado, se considerará que el efecto no puede resolver mientras este negado, sin embargo, al terminarse el efecto de la negación ya no será necesario volver a declarar el efecto para que resuelva.

*Notas:* Typo: 'este negado' (debería ser 'esté negado').

### `[p39/b07]`
_pos: middle-left_

> •Ocultar: Efecto. Acción de turno. Colocar boca abajo una carta. Los Token y Protectores no pueden ser ocultos por efecto. Las cartas ocultas no podrán resolver efectos excepto si su declaración se hizo ese turno y su resolución durará máximo hasta el final del mismo turno. Aún si una carta fue ocultada se debe resolver la declaración de su ataque. Si una carta es ocultada por efecto, vuelve a sus a estadísticas base y finalizará la negación de su efecto si se encuentra negado. Las cartas ocultas no se podrán considerar un tipo de carta en específico. Una carta que fue ocultada por efecto en el turno anterior deberá volver a declarar su efecto para que resuelva. Las cartas en Zona de Extinción no pueden ser ocultadas.

*Notas:* Typo: 'vuelve a sus a estadísticas base' (repetición de preposición 'a'). Varias palabras en cursiva: 'Efecto. Acción de turno', 'Token', 'Protectores', 'ocultos', 'ocultas', 'ocultada', 'negación', 'negado'.

### `[p39/b08]`
_pos: bottom-left_

> •Pasiva: Efecto. Se pueden usar múltiples veces por turno, no se actualizan descansos al usarlos (Ver 6.6 Efectos). Si no especifica tiempo de Activación, es opcional y se Activa una vez por turno durante Fase Previa.

*Notas:* 'Efecto' y referencia cruzada en cursiva.

### `[p39/b09]`
_pos: bottom-left_

> •Pasiva-Rápida: Efecto. A diferencia de las Pasivas, mlas Pasivas-Rápidas sólo se pueden declarar en respuesta a otras Pasivas, revelación de cartas o eliminación de cartas, también se pueden usar en turno rival y resuelven tan pronto se declaran (Ver 6.6 Efectos).

*Notas:* TYPO preservado: 'mlas Pasivas-Rápidas' (debería ser 'las'). 'Efecto' y referencia cruzada en cursiva.

### `[p39/b10]`
_pos: top-right_

> •Poseer: Acción. Enviar un Adendei a Extinción para colocar una carta de Extinción debajo de un Espectro.

*Notas:* 'Acción', 'Adendei', 'Espectro' en cursiva.

### `[p39/b11]`
_pos: top-right_

> •Pagar: Son acciones especificadas en un costo que se deben de realizar (Ver 6.6 Efectos).

*Notas:* 'costo' y referencia cruzada en cursiva.

### `[p39/b12]`
_pos: top-right_

> •Protector: Carta. Carta con 12 puntos de vida. Inicia con 3 descansos, en la Zona de equipos. Para usar su efecto debe usar el vínculo con algún Adendei disponible (Ver 3.2 Protector).

*Notas:* 'Carta', 'vínculo', 'Adendei' y referencia cruzada en cursiva.

### `[p39/b13]`
_pos: middle-right_

> •Proteger: Efecto. Efecto que se aplica a una carta la carta protegida es inmune a ataques y/o efectos de otras cartas hacia ella, también se considera proteger una carta el hecho de evitar (una vez que ya han sido declarados) ataques, todos los daños y/o efectos de otras cartas hacia ella.

*Notas:* 'Efecto' y 'proteger' en cursiva. Redacción redundante 'Efecto. Efecto que se aplica...'.

### `[p39/b14]`
_pos: middle-right_

> •Quemar: Marca. Una carta quemada recibe 1 punto de daño cada vez que ataque o use su Activa (Ver 6.1. Marcas).

*Notas:* 'Marca', 'quemada' y referencia cruzada en cursiva.

### `[p39/b15]`
_pos: middle-right_

> •Rava: Carta. Manifestaciones de las energías. Puedes llevar 0-2 Rava en tu Mazo General (Ver 3.3. Rava).

*Notas:* 'Carta', 'Rava', 'Mazo General' y referencia cruzada en cursiva.

### `[p39/b16]`
_pos: middle-right_

> •Reemplazar: Acción. Sustituir la carta que haya abandonado el campo, tomando 3 cartas del tope del Mazo Principal, eligiendo 1 y colocándola oculta o revelada sustituyendo a la carta eliminada (Ver 5.3. Reemplazo de Cartas).

*Notas:* 'Acción', 'Mazo Principal', 'oculta', 'revelada' y referencia cruzada en cursiva.

### `[p39/b17]`
_pos: middle-right_

> •Resolver el ataque: Es la acción de reducir la vida de la carta rival por el daño del ataque declarado (Ver Sección 5.2.).

*Notas:* Referencia cruzada en cursiva.

### `[p39/b18]`
_pos: middle-right_

> •Resolver un efecto: Es la acción de ejecutar/llevar a cabo dentro del juego lo que el efecto de la carta dice (Ver Sección 5.2.).

*Notas:* Referencia cruzada en cursiva.

### `[p39/b19]`
_pos: bottom-right_

> •Restricción: Efecto. Las cartas con restricciones indican que una carta no puede realizar determinadas acciones o efectos (Ver 6.7. Restricciones e interacciones).

*Notas:* 'Efecto' y referencia cruzada en cursiva.

### `[p39/b20]`
_pos: bottom-right_

> •Revelar: Efecto. Acción de Turno. Se considera "revelar" una carta si se coloca boca arriba en el campo (Ver 5. Fases de Turno).

*Notas:* 'Efecto. Acción de Turno' y referencia cruzada en cursiva.

### `[p39/b21]`
_pos: bottom-right_

> •Rot: Equipo. Basado en el reino mineral. Posee efectos "Activa" o "Activa Rápida" en su mayoría (Ver 3.4. Equipos).

*Notas:* 'Equipo' y referencia cruzada en cursiva.

### `[p39/b22]`
_pos: bottom-right_

> •Tomar: Acción de Turno. Cuando una carta deja la Zona Principal o por indicación de algún efecto, deberás reemplazar tu carta. Esta acción también puede gatillar efectos que indiquen toma o involucren a la(s) carta(s) to-mada(s). Solo se considera que una carta está en mano cuando se toma del Mazo, por reemplazo o por efecto de alguna carta.

*Notas:* 'Acción de Turno', 'toma', 'to-mada(s)' en cursiva. Guion 'to-mada(s)' preservado como aparece por corte de línea posible.

### `[p39/b23]`
_pos: bottom-right_

> •Turno: Conjunto de acciones que el jugador puede realizar en cierto orden. Cada turno se divide en diferentes fases (Ver 5. Fases del Turno).

*Notas:* Referencia cruzada en cursiva.

### `[p39/b24]`
_pos: bottom-right_

> •Usar: Acción. Su significado cambia dependiendo si se usa una carta o un efecto.

*Notas:* 'Acción' en cursiva.

### `[p39/b25]`
_pos: bottom-right_

> 39

*Notas:* Número de página.

## Figuras

### `[p39/fig-01]` glosario-doble-columna-M-a-U *(type: infographic)*
_bbox (%): x=5, y=3, w=90, h=92_  
**Legibilidad:** clear — Todo el texto es legible. Se detectaron typos que se preservan verbatim: 'mlas' (por 'las'), 'muestrala' (sin tilde), 'este negado' (falta tilde), 'vuelve a sus a estadísticas' (preposición repetida).  

**Descripción:** La página entera es continuación del glosario iniciado en la página 37, organizada en dos columnas verticales. Tipografía sans-serif negra sobre fondo blanco/cremoso. Cada entrada inicia con viñeta redonda (•) pegada a la palabra en negrita, seguida de tipo del término en cursiva ('Efecto', 'Carta', 'Zona', 'Acción', 'Acción de Turno', 'Marca', 'Equipo') y luego la definición en texto normal. Las referencias cruzadas aparecen en cursiva entre paréntesis al final.

La columna izquierda cubre desde M hasta P: Mazo (Mazo Principal) — entrada extensa con información sobre reposición de cartas en Zona Principal —, Mazo General, Mostrar (con ejemplo de uso entre comillas), Negar, Negar un ataque, Negar un efecto, Ocultar (entrada especialmente larga con múltiples reglas sobre cartas boca abajo), Pasiva y Pasiva-Rápida. Hay un typo notable en 'mlas' (por 'las') en la entrada de Pasiva-Rápida.

La columna derecha continúa desde P hasta U: Poseer (acción de enviar un Adendei a Extinción para colocar una carta debajo de un Espectro), Pagar, Protector, Proteger, Quemar, Rava (con el detalle de llevar 0-2 en el Mazo General), Reemplazar, Resolver el ataque, Resolver un efecto, Restricción, Revelar, Rot, Tomar (con el corte de palabra 'to-mada(s)'), Turno, Usar.

La página mantiene consistencia visual con la página 38 del glosario. No hay banners ni ilustraciones adicionales. Número de página '39' en esquina inferior derecha sobre fondo azul institucional.

**Texto embebido:**
- `Mazo (Mazo Principal)`
- `Mazo General`
- `Mostrar`
- `Negar`
- `Negar un ataque`
- `Negar un efecto`
- `Ocultar`
- `Pasiva`
- `Pasiva-Rápida`
- `Poseer`
- `Pagar`
- `Protector`
- `Proteger`
- `Quemar`
- `Rava`
- `Reemplazar`
- `Resolver el ataque`
- `Resolver un efecto`
- `Restricción`
- `Revelar`
- `Rot`
- `Tomar`
- `Turno`
- `Usar`
- `39`

**Relación con el texto:** Esta figura es el cuerpo del glosario de la página y a la vez su estructura visual en doble columna.

### `[p39/fig-02]` numero-pagina-39 *(type: icon)*
_bbox (%): x=90, y=95, w=8, h=4_  
**Legibilidad:** clear  

**Descripción:** Número de página '39' en la esquina inferior derecha sobre fondo azul oscuro institucional.

**Texto embebido:**
- `39`

**Relación con el texto:** Indicador de paginación.

## Notas de página

Página completa de glosario M-U. Preservar typos: 'mlas Pasivas-Rápidas', 'muestrala', 'este negado', 'vuelve a sus a estadísticas', 'to-mada(s)'. Las entradas 'Ocultar' y 'Mazo (Mazo Principal)' son las más extensas.


---

<a id="pagina-40"></a>

# Página 40 — 9. GLOSARIO (cierre) + Contacto + Créditos

> 🧪 **Spot-check Ramsés (pass 3)** — Revisada y anotada por humano.

**Notas de spot-check (humanas):**

- Encabezado 'Créditos' confirmado (Ramsés).
- Copyright correcto: 'Kodem TCG' (no TCC, OCR alucinó).

**Verdict:** `ocr_preferred` · **Recomendación:** `spot_check_human` · **Confianza:** 0.9 · **Acuerdo LLM↔OCR:** 0.95

**Sección(es):** §9, §4

## Bloques de texto

### `[p40/b01]`
_pos: top-left_

> •Usar una carta: Se considera usar una carta al momento de declarar su efecto desde cualquier Zona o de declarar su ataque.

*Notas:* 'usar' en cursiva.

### `[p40/b02]`
_pos: top-left_

> •Usar un efecto: Se considera que un efecto está en uso si se está resolviendo en ese momento.

*Notas:* 'uso' en cursiva.

### `[p40/b03]`
_pos: top-left_

> •Vincular: Uso del efecto del Protector a través de un Adendei disponible. También conocido como "Vínculo Odémico".

*Notas:* '"Vínculo Odémico"' en cursiva.

### `[p40/b04]`
_pos: top-left_

> •Vivificar: Efecto. Es un efecto que hace que una carta deje la zona Extinción, cualquier carta que deje la zona de extinción se considera que está siendo vivificada.

*Notas:* 'Efecto' en cursiva. Inconsistencia en capitalización: 'zona Extinción' vs 'zona de extinción'.

### `[p40/b05]`
_pos: top-right_

> •Zona de Bio: Zona. Lugar donde va la carta Bio.

*Notas:* 'Zona' en cursiva.

### `[p40/b06]`
_pos: top-right_

> •Zona de Equipo: Zona. Lugar donde se colocan tus cartas de Equipo (Ixim y Rot) al inicio del juego (Ver 4. Preparación del Ecosistema).

*Notas:* 'Zona', 'Equipo (Ixim y Rot)' y referencia cruzada en cursiva.

### `[p40/b07]`
_pos: top-right_

> •Zona de Extinción: Zona. Lugar del Ecosistema donde se colocan las cartas eliminadas. Cuando una carta llegue a 0 puntos de vida, irá a Extinción (Ver 4. Preparación del Ecosistema).

*Notas:* 'Zona' y referencia cruzada en cursiva.

### `[p40/b08]`
_pos: middle-right_

> •Zona de Protector: Zona. Lugar del Ecosistema donde se coloca la carta Protector con 12 puntos de vida y 3 descansos al inicio del juego (Ver 4. Preparación del Ecosistema).

*Notas:* 'Zona', 'Protector' y referencia cruzada en cursiva.

### `[p40/b09]`
_pos: middle-right_

> •Zona Principal: Zona. Lugar del Ecosistema con 3 espacios de carta, en estos espacios irán Adendei boca abajo con 6 puntos de vida al inicio del juego (Ver 4. Preparación del Ecosistema).

*Notas:* 'Zona', 'Adendei' y referencia cruzada en cursiva.

### `[p40/b10]` ¿Dudas?
_pos: middle-center_

> ¿Dudas?

*Notas:* Encabezado de la sección de contacto, en tipografía negrita con pequeños elementos decorativos.

### `[p40/b11]`
_pos: middle-center_

> E-MAIL: admin@kodem.com.mx

*Notas:* Línea de contacto por correo electrónico.

### `[p40/b12]`
_pos: middle-center_

> ATENCIÓN AL CLIENTE: +521 55 64 91 21 59

*Notas:* Línea de contacto telefónico con clave de país +52 y prefijo móvil 1.

### `[p40/b13]`
_pos: middle-center_

> ¡Escríbenos a Redes Sociales!

*Notas:* Llamada a redes sociales, precede la fila de 4 íconos (Facebook, Instagram, YouTube, TikTok).

### `[p40/b14]`
_pos: bottom-center_

> Diseño de Mecánicas de Juego: Sergio Mora Camargo y Wenceslao Rodríguez

*Notas:* Línea de créditos. 'Diseño de Mecánicas de Juego:' en negrita.

### `[p40/b15]`
_pos: bottom-center_

> Personajes y universo creados por: Alan Mac Donald

*Notas:* Línea de créditos.

### `[p40/b16]`
_pos: bottom-center_

> Edición y Diseño Gráfico: Itzel Soto

*Notas:* Línea de créditos.

### `[p40/b17]`
_pos: bottom-center_

> Agradecimientos especiales a: El equipo de arte e ilustración de Kódem TCG©, el equipo de Testeo, Nayeli Hernández y Regina Rodríguez; con su apoyo este proyecto sea ha hecho posible y se fortalece día a día.

*Notas:* TYPO preservado: 'sea ha hecho posible' (debería ser 'se ha hecho posible'). 'Kódem TCG©' con símbolo de copyright.

### `[p40/b18]`
_pos: bottom_

> Este reglamento es publicado en febrero de 2026. ©2026 Adendei Entretenimiento S.A. de C.V., Del. Cuauhtémoc, Ciudad de México, 01180. México. Diseñado, conceptualizado y administrado en México. 'Kódem TCG', sus logotipos, símbolos y el aspecto distintivo de sus personajes son propiedad de Adendei Entretenimiento S.A. de C.V. en México y en otros países

*Notas:* Bloque de copyright y declaración de propiedad intelectual.

### `[p40/b19]`
_pos: bottom-right_

> 40

*Notas:* Número de página.

### `[p40/b20]` Créditos
_pos: between-social-and-team-names_

> Créditos

*Notas:* [spot-check pass 3] Agregado por Ramsés — encabezado entre redes sociales y nombres del equipo, omitido por LLM.

## Figuras

### `[p40/fig-01]` glosario-cierre-doble-columna-U-a-Z *(type: infographic)*
_bbox (%): x=5, y=3, w=90, h=28_  
**Legibilidad:** clear  

**Descripción:** Cierre del glosario organizado en dos columnas verticales en la parte superior de la página. La columna izquierda contiene cuatro entradas finales de la letra U y V: 'Usar una carta', 'Usar un efecto', 'Vincular' (con referencia a 'Vínculo Odémico' entre comillas) y 'Vivificar' (efecto relacionado con la zona de Extinción). La columna derecha contiene las cinco entradas de la letra Z que cubren todas las zonas del tablero de juego: 'Zona de Bio', 'Zona de Equipo', 'Zona de Extinción', 'Zona de Protector' y 'Zona Principal'.

Cada entrada mantiene el formato visual consistente del glosario: viñeta circular (•) pegada a la palabra en negrita, seguida del tipo de término en cursiva ('Zona' para todas las entradas del lado derecho, 'Efecto' para 'Vivificar') y la definición con referencias cruzadas en cursiva entre paréntesis al final. Las cinco entradas de zonas comparten la referencia '(Ver 4. Preparación del Ecosistema)' lo que consolida visualmente la información del tablero.

La tipografía es sans-serif sobre fondo blanco/cremoso, idéntica al resto del glosario. El separador entre columnas es espacio blanco, sin líneas visibles.

**Texto embebido:**
- `Usar una carta`
- `Usar un efecto`
- `Vincular`
- `Vivificar`
- `Zona de Bio`
- `Zona de Equipo`
- `Zona de Extinción`
- `Zona de Protector`
- `Zona Principal`

**Relación con el texto:** Es el cierre del glosario de la sección 9 que inició en la página 37.

### `[p40/fig-02]` seccion-contacto-dudas *(type: infographic)*
_bbox (%): x=15, y=35, w=70, h=20_  
**Legibilidad:** clear  

**Descripción:** Sección de contacto centrada horizontalmente. Encabezado '¿Dudas?' en tipografía negrita con pequeños elementos decorativos (posibles florituras o asteriscos) a los costados del título. Debajo del encabezado se presentan dos líneas de contacto: 'E-MAIL: admin@kodem.com.mx' y 'ATENCIÓN AL CLIENTE: +521 55 64 91 21 59' en tipografía limpia alineada al centro.

Más abajo, con un pequeño separador visual, aparece la invitación '¡Escríbenos a Redes Sociales!' seguida de una fila horizontal de cuatro íconos de redes sociales con estética personalizada incorporando mascotas/criaturas del juego Kódem TCG encima del ícono estándar de cada plataforma.

Los íconos corresponden en orden a: 1) Facebook — círculo/cuadrado azul con la letra 'f'; 2) Instagram — cuadrado con degradado característico naranja-rosa-morado; 3) YouTube — rectángulo rojo con triángulo blanco de reproducción; 4) TikTok — fondo oscuro con la nota musical estilizada en cian/magenta. Cada ícono lleva una ilustración pequeña de criatura del juego en la parte superior, personalizando la identidad visual de Kódem.

La paleta de colores es variada en los íconos pero el texto de la sección mantiene negro sobre blanco como el resto del documento.

**Texto embebido:**
- `¿Dudas?`
- `E-MAIL: admin@kodem.com.mx`
- `ATENCIÓN AL CLIENTE: +521 55 64 91 21 59`
- `¡Escríbenos a Redes Sociales!`

**Relación con el texto:** Proporciona canales de atención al cliente y redes sociales oficiales del juego.

### `[p40/fig-03]` iconos-redes-sociales *(type: icon)*
_bbox (%): x=30, y=50, w=40, h=8_  
**Legibilidad:** clear  

**Descripción:** Fila horizontal de cuatro íconos de redes sociales con estética personalizada Kódem TCG. Cada ícono combina el logo estándar de la plataforma con una pequeña ilustración de criatura/mascota del juego superpuesta, creando una identidad visual única.

De izquierda a derecha:
1. Facebook: fondo azul clásico de Facebook (#1877F2 aproximado) con la 'f' blanca, coronado por una figura de criatura Kódem.
2. Instagram: cuadrado con degradado característico amarillo-naranja-rosa-morado de la marca, con silueta de cámara blanca en el centro y criatura encima.
3. YouTube: rectángulo rojo brillante con triángulo blanco de 'play' al centro, criatura Kódem encima.
4. TikTok: fondo negro con la nota musical estilizada en cian (#25F4EE) y magenta (#FE2C55), criatura Kódem encima.

Estas mascotas personalizadas refuerzan la identidad de Kódem TCG en cada canal social.

**Relación con el texto:** Visualiza las cuatro plataformas de redes sociales oficiales del juego: Facebook, Instagram, YouTube, TikTok.

### `[p40/fig-04]` ilustracion-criatura-creditos *(type: illustration)*
_bbox (%): x=45, y=62, w=10, h=15_  
**Legibilidad:** clear  

**Descripción:** Ilustración central ornamental en la sección de créditos: figura de criatura tipo dragón/serpiente estilizada en tonos morados/lila, de aspecto minimalista y trazo artístico fluido. Orientación vertical con cuerpo sinuoso que sugiere movimiento. Actúa como elemento decorativo separador entre el bloque de créditos y el copyright. El color morado-lila contrasta con el fondo blanco y la tipografía negra de la página, aportando un acento visual de la identidad del juego sin competir con la jerarquía de lectura.

**Relación con el texto:** Elemento decorativo de cierre del rulebook que refuerza la identidad visual del juego Kódem TCG en la última página.

### `[p40/fig-05]` bloque-creditos *(type: infographic)*
_bbox (%): x=10, y=60, w=80, h=25_  
**Legibilidad:** clear — Typo 'sea ha hecho posible' preservado.  

**Descripción:** Bloque de créditos centrado verticalmente al pie del glosario, en la sección inferior de la página. Tres líneas principales de créditos con los roles en negrita y los nombres en texto regular:

- 'Diseño de Mecánicas de Juego:' — Sergio Mora Camargo y Wenceslao Rodríguez.
- 'Personajes y universo creados por:' — Alan Mac Donald.
- 'Edición y Diseño Gráfico:' — Itzel Soto.

Debajo de los créditos principales aparece un párrafo de agradecimientos especiales: 'Agradecimientos especiales a: El equipo de arte e ilustración de Kódem TCG©, el equipo de Testeo, Nayeli Hernández y Regina Rodríguez; con su apoyo este proyecto sea ha hecho posible y se fortalece día a día.' (incluye typo 'sea ha hecho' por 'se ha hecho'). El símbolo © aparece junto al nombre del juego.

Tipografía sans-serif legible, centrada, con espaciado generoso entre líneas. No hay marcos ni líneas divisorias; la separación es puramente por espacio en blanco.

**Texto embebido:**
- `Diseño de Mecánicas de Juego: Sergio Mora Camargo y Wenceslao Rodríguez`
- `Personajes y universo creados por: Alan Mac Donald`
- `Edición y Diseño Gráfico: Itzel Soto`
- `Agradecimientos especiales a: El equipo de arte e ilustración de Kódem TCG©, el equipo de Testeo, Nayeli Hernández y Regina Rodríguez; con su apoyo este proyecto sea ha hecho posible y se fortalece día a día.`

**Relación con el texto:** Reconoce autoría y colaboradores del rulebook y del juego Kódem TCG v5.1.

### `[p40/fig-06]` bloque-copyright *(type: infographic)*
_bbox (%): x=8, y=85, w=84, h=10_  
**Legibilidad:** clear  

**Descripción:** Bloque de copyright centrado al pie de página, en tipografía más pequeña que el resto del contenido, justificado al centro. Incluye fecha de publicación ('febrero de 2026'), símbolo de copyright y año ('©2026'), razón social completa ('Adendei Entretenimiento S.A. de C.V.'), dirección ('Del. Cuauhtémoc, Ciudad de México, 01180. México'), declaración de producción nacional ('Diseñado, conceptualizado y administrado en México') y reserva de derechos sobre 'Kódem TCG', sus logotipos, símbolos y aspecto distintivo de personajes como propiedad de Adendei Entretenimiento S.A. de C.V. en México y en otros países.

Tipografía sans-serif en negro sobre blanco, texto compacto que cierra la página y el documento.

**Texto embebido:**
- `Este reglamento es publicado en febrero de 2026.`
- `©2026 Adendei Entretenimiento S.A. de C.V., Del. Cuauhtémoc, Ciudad de México, 01180. México.`
- `Diseñado, conceptualizado y administrado en México.`
- `'Kódem TCG', sus logotipos, símbolos y el aspecto distintivo de sus personajes son propiedad de Adendei Entretenimiento S.A. de C.V. en México y en otros países`

**Relación con el texto:** Declaración legal de copyright y propiedad intelectual que cierra el rulebook.

### `[p40/fig-07]` numero-pagina-40 *(type: icon)*
_bbox (%): x=90, y=95, w=8, h=4_  
**Legibilidad:** clear  

**Descripción:** Número de página '40' en la esquina inferior derecha dentro de un recuadro oscuro (negro/azul oscuro) con el número en color blanco. Mantiene el patrón de paginación del resto del rulebook.

**Texto embebido:**
- `40`

**Relación con el texto:** Indicador de paginación final del documento.

## Notas de página

Última página del rulebook Kódem TCG v5.1. Cierra el glosario (sección 9) con 4 entradas de la letra U/V en columna izquierda y 5 entradas de la letra Z (zonas del ecosistema) en columna derecha. La mitad inferior contiene tres bloques: contacto con íconos de redes sociales personalizados, créditos del equipo y copyright. Typos preservados: 'sea ha hecho posible' (por 'se ha hecho posible'). Fecha de publicación: febrero de 2026. Razón social: Adendei Entretenimiento S.A. de C.V.


---

# Apéndice A — Typos verbatim preservados

Los siguientes errores ortográficos, tipográficos o de redacción se preservan **verbatim** porque aparecen así en el PDF fuente. El árbitro (y en su caso el spot-check humano) los confirmaron durante la validación.

| Página | Contexto (título) | Typo verbatim |
|---|---|---|
| p01 | Kódem Trading Card Game – Libro de Reglas Oficial Versión 5.0 (Portada) | Título indica 'Versión 5.0' pero proyecto se referencia como v5.1 (preservar verbatim como 5.0) |
| p02 | CONTENIDO | 'Uso de los Espectros' escrito como 'Uso del los Espectros' (preservado verbatim en LLM) |
| p02 | CONTENIDO | 'Equipos Compatible' sin 's' final (preservado verbatim) |
| p02 | CONTENIDO | 'Carta Poseídas' en lugar de 'Cartas Poseídas' (preservado verbatim) |
| p05 | 2. Partes de la carta | 'expasión' en b09 (preservado correctamente) |
| p05 | 2. Partes de la carta | 'Dana' (sic) en lugar de 'Daña' según OCR — preservar si es literal |
| p06 | 2.2 Estadísticas de la carta | 'Algunos efectos de sólo afectan' (b03) |
| p06 | 2.2 Estadísticas de la carta | 'ataques alta y medianamente fuertes' (b11) |
| p06 | 2.2 Estadísticas de la carta | 'añadiendoles' sin tilde (b12) |
| p06 | 2.2 Estadísticas de la carta | 'efectos estratégico' (b16) |
| p06 | 2.2 Estadísticas de la carta | 'podras' sin tilde en Costo de Shugg (OCR) |
| p07 | 3. Tipos de Cartas — 3.1 Adendei | 'FASES DEL DE TURNO' (b15, preservar 'DE' extra) |
| p07 | 3. Tipos de Cartas — 3.1 Adendei | 'Manifestación Fantasmal Fantasmal' (OCR duplicado — probable artefacto OCR, no typo de fuente) |
| p07 | 3. Tipos de Cartas — 3.1 Adendei | 'este' sin tilde en card text (Therz: 'mientras esta carta este') |
| p07 | 3. Tipos de Cartas — 3.1 Adendei | 'podran' sin tilde |
| p07 | 3. Tipos de Cartas — 3.1 Adendei | 'Sólo/Solo' variabilidad en card text |
| p08 | 3.2 Protector — Uso del Protector: Generalidades — Vínculo Odémico | 'relevado' en vez de 'revelado' (b08, preservado en ambos) |
| p08 | 3.2 Protector — Uso del Protector: Generalidades — Vínculo Odémico | 'máximo 3 descansos' (falta 'de', b05) |
| p08 | 3.2 Protector — Uso del Protector: Generalidades — Vínculo Odémico | 'a menos de que' (en vez de 'a menos que', b10) |
| p09 | 3.3 RAVA | 'Ravas' plural anglicizado en la última viñeta (ambos preservan) |
| p09 | 3.3 RAVA | Texto Nok: 'Adendei-Gélido' con guion (formato del juego) |
| p11 | EQUIPOS COMPATIBLES / EQUIPOS MÚLTIPLES | 'Pirico' sin tilde en flavor/restricción de Cascada de Lava (OCR) |
| p12 | 3.5 BIO | 'aun' sin tilde en b03 según OCR |
| p12 | 3.5 BIO | Último bullet USO DEL BIO usa '.' en lugar de '•' (preservado en ambos) |
| p13 | 3.6 Token | 'varlar' en OCR (por 'variar') — artefacto OCR, no typo fuente |
| p13 | 3.6 Token | 'Energia' sin tilde en OCR — artefacto OCR |
| p14 | 3.7 Espectros | 'expasión' en b06 (Folio callout) |
| p14 | 3.7 Espectros | 'Kodem' sin tilde en b14 (Nombre científico callout) |
| p14 | 3.7 Espectros | 'Las carta poseída' en b18 (falta 's') |
| p14 | 3.7 Espectros | 'pueden disparan' en b19 (concordancia rota) |
| p14 | 3.7 Espectros | 'el nombre la carta es' en b11 (falta 'de') |
| p15 | 4. Preparación del Ecosistema | 'se indiquen el texto' (debería ser 'se indiquen en el texto') - verbatim en ambas fuentes, preservar |
| p16 | 5. Fases del Turno | 'costO(Ver 6.6.3 Costos)' - falta espacio entre 'costo' y paréntesis, verbatim en ambas fuentes |
| p20 | 5.3 Reemplazo de cartas | 'Prinicipal' (debería ser 'Principal') en b02 - verbatim en ambas fuentes |
| p20 | 5.3 Reemplazo de cartas | 'EXPLICITAMENTE LO CONTRARIO' en mayúsculas editoriales en b10 - confirmado por OCR |
| p21 | 6.1 Marcas | 'Adender' (probable OCR-error por 'Adendei') - verificar en PNG original |
| p21 | 6.1 Marcas | 'Pítico Tirón' / 'Pitico Tirón' - nombre de subtipo probable |
| p22 | 6.2 CAMBIOS DE ESTADÍSTICAS | 'Yakerr' (¿vs 'Yakert'?) - OCR dice 'Yakerr', LLM dice 'Yakert'. Verificar PNG |
| p22 | 6.2 CAMBIOS DE ESTADÍSTICAS | 'Bora' vs 'Boras' - inconsistencia entre OCR y LLM |
| p23 | 6.3 Protección | OCR tiene 'TIPOS DE DANO' (sin Ñ) y 'DAÑO POR ATAQUE' mezclado - OCR-errors de tilde, LLM correcto |
| p24 | 6.6 ATAQUE | 'reemplazara' sin tilde en ambos fuentes (debería ser 'reemplazará') |
| p24 | 6.6 ATAQUE | 'Yanzi, precision' sin tilde en OCR, LLM tiene 'precisión' |
| p25 | (sin título) | Ulmor Costo: OCR dice 'se daño' (posible typo del original) vs LLM 'se daña'. Verificar PNG - probable typo verbatim |
| p25 | (sin título) | 'pto.' (OCR) vs 'pts' (LLM) - verificar PNG |
| p26 | (sin título) | 'eliminadan' (debería ser 'eliminada') - verbatim en ambas fuentes |
| p26 | (sin título) | 'Cempasuchi'/'Cempasúchil' inconsistencia en el original (falta 'l' a veces) |
| p26 | (sin título) | 'atque' (debería 'ataque') - verbatim en ambas |
| p26 | (sin título) | Espacios faltantes '•Los', '•Efectos' |
| p27 | (sin título) | '6 ptos de vida' (falta punto tras ptos) - verbatim ambos |
| p27 | (sin título) | 'descansos máximo' (falta s) - verbatim ambos |
| p27 | (sin título) | 'este' sin acento (debería 'esté') en ejemplo Zaykan - verbatim |
| p27 | (sin título) | 'Ejemplo:"Zaykan,Emboscada"' espacios faltantes - verbatim |
| p27 | (sin título) | 'ño' en OCR (debería 'no') en b06 - probable OCR-error solo |
| p28 | (sin título) | considerara (falta acento) |
| p28 | (sin título) | Extincion (falta acento) |
| p28 | (sin título) | resurecctas (doble c) |
| p28 | (sin título) | Esta cartas (debería 'Estas') |
| p28 | (sin título) | relaacionan (doble a) |
| p28 | (sin título) | fecto (falta 'e' inicial) |
| p29 | (sin título) | desvia (sin acento, debería ser 'desvía') |
| p30 | (sin título) | tú Zona Principal (tilde incorrecta sobre 'tu') |
| p30 | (sin título) | desvia (ya visto en p29 pero no aquí) |
| p31 | (sin título) | 'vuelve a sus a estadísticas base' (doble preposición en regla 6) |
| p32 | (sin título) | envíar (tilde incorrecta en Extinción, pies de figura y regla 4) — verbatim preservar |
| p33 | (sin título) | vinvular (por 'vincular' en heading §7) |
| p33 | (sin título) | '2 .Si' (espacio antes del punto) |
| p33 | (sin título) | '4.Si', '5.El', '6.En' (sin espacio tras punto numerado) |
| p35 | (sin título) | espacio irregular antes de coma: '"jugador(es)" ,' |
| p39 | 9. GLOSARIO (continuación) | 'mlas Pasivas-Rápidas' (por 'las') — b09 |
| p39 | 9. GLOSARIO (continuación) | 'muestrala' (sin tilde) — b03 |
| p39 | 9. GLOSARIO (continuación) | 'este negado' (sin tilde, debería 'esté') — b06 |
| p39 | 9. GLOSARIO (continuación) | 'vuelve a sus a estadísticas' (preposición repetida) — b07 |
| p39 | 9. GLOSARIO (continuación) | 'to-mada(s)' (guion dentro del ejemplo) — b22 |
| p40 | 9. GLOSARIO (cierre) + Contacto + Créditos | 'sea ha hecho posible' (por 'se ha hecho posible') — b17 |
| p40 | 9. GLOSARIO (cierre) + Contacto + Créditos | inconsistencia 'zona Extinción' vs 'zona de extinción' en entrada Vivificar — b04 |


# Apéndice B — Índice de anchors

Total anchors registrados: **769**

| Anchor | Página | Tipo |
|---|---|---|
| `p01/b01` | 1 | text_block |
| `p01/b02` | 1 | text_block |
| `p01/b03` | 1 | text_block |
| `p01/b04` | 1 | text_block |
| `p01/b05` | 1 | text_block |
| `p01/fig-01` | 1 | figure |
| `p01/fig-02` | 1 | figure |
| `p02/b01` | 2 | text_block |
| `p02/fig-01` | 2 | figure |
| `p03/b01` | 3 | text_block |
| `p03/fig-01` | 3 | figure |
| `p04/b01` | 4 | text_block |
| `p04/b02` | 4 | text_block |
| `p04/b03` | 4 | text_block |
| `p04/fig-01` | 4 | figure |
| `p04/fig-02` | 4 | figure |
| `p04/fig-03` | 4 | figure |
| `p04/fig-04` | 4 | figure |
| `p04/fig-05` | 4 | figure |
| `p04/fig-06` | 4 | figure |
| `p05/b01` | 5 | text_block |
| `p05/b02` | 5 | text_block |
| `p05/b03` | 5 | text_block |
| `p05/b04` | 5 | text_block |
| `p05/b05` | 5 | text_block |
| `p05/b06` | 5 | text_block |
| `p05/b07` | 5 | text_block |
| `p05/b08` | 5 | text_block |
| `p05/b09` | 5 | text_block |
| `p05/b10` | 5 | text_block |
| `p05/b11` | 5 | text_block |
| `p05/b12` | 5 | text_block |
| `p05/b13` | 5 | text_block |
| `p05/fig-01` | 5 | figure |
| `p05/fig-02` | 5 | figure |
| `p05/fig-03` | 5 | figure |
| `p06/b01` | 6 | text_block |
| `p06/b02` | 6 | text_block |
| `p06/b03` | 6 | text_block |
| `p06/b04` | 6 | text_block |
| `p06/b05` | 6 | text_block |
| `p06/b06` | 6 | text_block |
| `p06/b07` | 6 | text_block |
| `p06/b08` | 6 | text_block |
| `p06/b09` | 6 | text_block |
| `p06/b10` | 6 | text_block |
| `p06/b11` | 6 | text_block |
| `p06/b12` | 6 | text_block |
| `p06/b13` | 6 | text_block |
| `p06/b14` | 6 | text_block |
| `p06/b15` | 6 | text_block |
| `p06/b16` | 6 | text_block |
| `p06/b17` | 6 | text_block |
| `p06/b18` | 6 | text_block |
| `p06/b19` | 6 | text_block |
| `p06/fig-01` | 6 | figure |
| `p06/fig-02` | 6 | figure |
| `p06/fig-03` | 6 | figure |
| `p07/b01` | 7 | text_block |
| `p07/b02` | 7 | text_block |
| `p07/b03` | 7 | text_block |
| `p07/b04` | 7 | text_block |
| `p07/b05` | 7 | text_block |
| `p07/b06` | 7 | text_block |
| `p07/b07` | 7 | text_block |
| `p07/b08` | 7 | text_block |
| `p07/b09` | 7 | text_block |
| `p07/b10` | 7 | text_block |
| `p07/b11` | 7 | text_block |
| `p07/b12` | 7 | text_block |
| `p07/b13` | 7 | text_block |
| `p07/b14` | 7 | text_block |
| `p07/b15` | 7 | text_block |
| `p07/b16` | 7 | text_block |
| `p07/b17` | 7 | text_block |
| `p07/b18` | 7 | text_block |
| `p07/b19` | 7 | text_block |
| `p07/b20` | 7 | text_block |
| `p07/b21` | 7 | text_block |
| `p07/b22` | 7 | text_block |
| `p07/b23` | 7 | text_block |
| `p07/b24` | 7 | text_block |
| `p07/b25` | 7 | text_block |
| `p07/b26` | 7 | text_block |
| `p07/fig-01` | 7 | figure |
| `p07/fig-02` | 7 | figure |
| `p07/fig-03` | 7 | figure |
| `p07/fig-04` | 7 | figure |
| `p07/fig-05` | 7 | figure |
| `p07/fig-06` | 7 | figure |
| `p07/fig-07` | 7 | figure |
| `p08/b01` | 8 | text_block |
| `p08/b02` | 8 | text_block |
| `p08/b03` | 8 | text_block |
| `p08/b04` | 8 | text_block |
| `p08/b05` | 8 | text_block |
| `p08/b06` | 8 | text_block |
| `p08/b07` | 8 | text_block |
| `p08/b08` | 8 | text_block |
| `p08/b09` | 8 | text_block |
| `p08/b10` | 8 | text_block |
| `p08/b11` | 8 | text_block |
| `p08/b12` | 8 | text_block |
| `p08/b13` | 8 | text_block |
| `p08/fig-01` | 8 | figure |
| `p08/fig-02` | 8 | figure |
| `p08/fig-03` | 8 | figure |
| `p08/fig-04` | 8 | figure |
| `p08/fig-05` | 8 | figure |
| `p08/fig-06` | 8 | figure |
| `p08/fig-07` | 8 | figure |
| `p08/fig-08` | 8 | figure |
| `p09/b01` | 9 | text_block |
| `p09/b02` | 9 | text_block |
| `p09/b03` | 9 | text_block |
| `p09/b04` | 9 | text_block |
| `p09/b05` | 9 | text_block |
| `p09/b06` | 9 | text_block |
| `p09/b07` | 9 | text_block |
| `p09/b08` | 9 | text_block |
| `p09/b09` | 9 | text_block |
| `p09/fig-01` | 9 | figure |
| `p09/fig-02` | 9 | figure |
| `p09/fig-03` | 9 | figure |
| `p09/fig-04` | 9 | figure |
| `p09/fig-05` | 9 | figure |
| `p10/b01` | 10 | text_block |
| `p10/b02` | 10 | text_block |
| `p10/b03` | 10 | text_block |
| `p10/b04` | 10 | text_block |
| `p10/b05` | 10 | text_block |
| `p10/b06` | 10 | text_block |
| `p10/b07` | 10 | text_block |
| `p10/b08` | 10 | text_block |
| `p10/fig-01` | 10 | figure |
| `p10/fig-02` | 10 | figure |
| `p10/fig-03` | 10 | figure |
| `p10/fig-04` | 10 | figure |
| `p10/fig-05` | 10 | figure |
| `p10/fig-06` | 10 | figure |
| `p10/fig-07` | 10 | figure |
| `p10/fig-08` | 10 | figure |
| `p11/b01` | 11 | text_block |
| `p11/b02` | 11 | text_block |
| `p11/b03` | 11 | text_block |
| `p11/b04` | 11 | text_block |
| `p11/b05` | 11 | text_block |
| `p11/b06` | 11 | text_block |
| `p11/b07` | 11 | text_block |
| `p11/b08` | 11 | text_block |
| `p11/b09` | 11 | text_block |
| `p11/b10` | 11 | text_block |
| `p11/b11` | 11 | text_block |
| `p11/b12` | 11 | text_block |
| `p11/b13` | 11 | text_block |
| `p11/b14` | 11 | text_block |
| `p11/b15` | 11 | text_block |
| `p11/b16` | 11 | text_block |
| `p11/b17` | 11 | text_block |
| `p11/b18` | 11 | text_block |
| `p11/b19` | 11 | text_block |
| `p11/b20` | 11 | text_block |
| `p11/b21` | 11 | text_block |
| `p11/b22` | 11 | text_block |
| `p11/b23` | 11 | text_block |
| `p11/b24` | 11 | text_block |
| `p11/b25` | 11 | text_block |
| `p11/b26` | 11 | text_block |
| `p11/b27` | 11 | text_block |
| `p11/b28` | 11 | text_block |
| `p11/b29` | 11 | text_block |
| `p11/b30` | 11 | text_block |
| `p11/b31` | 11 | text_block |
| `p11/b32` | 11 | text_block |
| `p11/b33` | 11 | text_block |
| `p11/b34` | 11 | text_block |
| `p11/fig-01` | 11 | figure |
| `p11/fig-02` | 11 | figure |
| `p11/fig-03` | 11 | figure |
| `p11/fig-04` | 11 | figure |
| `p11/fig-05` | 11 | figure |
| `p11/fig-06` | 11 | figure |
| `p12/b01` | 12 | text_block |
| `p12/b02` | 12 | text_block |
| `p12/b03` | 12 | text_block |
| `p12/b04` | 12 | text_block |
| `p12/b05` | 12 | text_block |
| `p12/b06` | 12 | text_block |
| `p12/b07` | 12 | text_block |
| `p12/b08` | 12 | text_block |
| `p12/b09` | 12 | text_block |
| `p12/b10` | 12 | text_block |
| `p12/fig-01` | 12 | figure |
| `p12/fig-02` | 12 | figure |
| `p12/fig-03` | 12 | figure |
| `p12/fig-04` | 12 | figure |
| `p12/fig-05` | 12 | figure |
| `p12/fig-06` | 12 | figure |
| `p12/fig-07` | 12 | figure |
| `p12/fig-08` | 12 | figure |
| `p13/b01` | 13 | text_block |
| `p13/b02` | 13 | text_block |
| `p13/b03` | 13 | text_block |
| `p13/b04` | 13 | text_block |
| `p13/b05` | 13 | text_block |
| `p13/b06` | 13 | text_block |
| `p13/b07` | 13 | text_block |
| `p13/b08` | 13 | text_block |
| `p13/b09` | 13 | text_block |
| `p13/b10` | 13 | text_block |
| `p13/b11` | 13 | text_block |
| `p13/b12` | 13 | text_block |
| `p13/b13` | 13 | text_block |
| `p13/fig-01` | 13 | figure |
| `p13/fig-02` | 13 | figure |
| `p13/fig-03` | 13 | figure |
| `p13/fig-04` | 13 | figure |
| `p13/fig-05` | 13 | figure |
| `p13/fig-06` | 13 | figure |
| `p13/fig-07` | 13 | figure |
| `p13/fig-08` | 13 | figure |
| `p13/fig-09` | 13 | figure |
| `p14/b01` | 14 | text_block |
| `p14/b02` | 14 | text_block |
| `p14/b03` | 14 | text_block |
| `p14/b04` | 14 | text_block |
| `p14/b05` | 14 | text_block |
| `p14/b06` | 14 | text_block |
| `p14/b07` | 14 | text_block |
| `p14/b08` | 14 | text_block |
| `p14/b09` | 14 | text_block |
| `p14/b10` | 14 | text_block |
| `p14/b11` | 14 | text_block |
| `p14/b12` | 14 | text_block |
| `p14/b13` | 14 | text_block |
| `p14/b14` | 14 | text_block |
| `p14/b15` | 14 | text_block |
| `p14/b16` | 14 | text_block |
| `p14/b17` | 14 | text_block |
| `p14/b18` | 14 | text_block |
| `p14/b19` | 14 | text_block |
| `p14/b20` | 14 | text_block |
| `p14/b21` | 14 | text_block |
| `p14/b22` | 14 | text_block |
| `p14/fig-01` | 14 | figure |
| `p14/fig-02` | 14 | figure |
| `p14/fig-03` | 14 | figure |
| `p14/fig-04` | 14 | figure |
| `p14/fig-05` | 14 | figure |
| `p14/fig-06` | 14 | figure |
| `p14/fig-07` | 14 | figure |
| `p14/fig-08` | 14 | figure |
| `p14/fig-09` | 14 | figure |
| `p14/fig-10` | 14 | figure |
| `p14/fig-11` | 14 | figure |
| `p14/fig-12` | 14 | figure |
| `p14/fig-13` | 14 | figure |
| `p14/fig-14` | 14 | figure |
| `p14/fig-15` | 14 | figure |
| `p14/fig-16` | 14 | figure |
| `p14/fig-17` | 14 | figure |
| `p14/fig-18` | 14 | figure |
| `p15/b01` | 15 | text_block |
| `p15/b02` | 15 | text_block |
| `p15/b03` | 15 | text_block |
| `p15/b04` | 15 | text_block |
| `p15/b05` | 15 | text_block |
| `p15/b06` | 15 | text_block |
| `p15/b07` | 15 | text_block |
| `p15/b08` | 15 | text_block |
| `p15/b09` | 15 | text_block |
| `p15/b10` | 15 | text_block |
| `p15/b11` | 15 | text_block |
| `p15/b12` | 15 | text_block |
| `p15/b13` | 15 | text_block |
| `p15/b14` | 15 | text_block |
| `p15/b15` | 15 | text_block |
| `p15/b16` | 15 | text_block |
| `p15/b17` | 15 | text_block |
| `p15/b18` | 15 | text_block |
| `p15/b19` | 15 | text_block |
| `p15/b20` | 15 | text_block |
| `p15/fig-01` | 15 | figure |
| `p15/fig-02` | 15 | figure |
| `p15/fig-03` | 15 | figure |
| `p15/fig-04` | 15 | figure |
| `p15/fig-05` | 15 | figure |
| `p15/fig-06` | 15 | figure |
| `p15/fig-07` | 15 | figure |
| `p15/fig-08` | 15 | figure |
| `p15/fig-09` | 15 | figure |
| `p16/b01` | 16 | text_block |
| `p16/b02` | 16 | text_block |
| `p16/b03` | 16 | text_block |
| `p16/b04` | 16 | text_block |
| `p16/b05` | 16 | text_block |
| `p16/b06` | 16 | text_block |
| `p16/b06b` | 16 | text_block |
| `p16/b07` | 16 | text_block |
| `p16/b08` | 16 | text_block |
| `p16/b09` | 16 | text_block |
| `p16/b10` | 16 | text_block |
| `p16/b11` | 16 | text_block |
| `p16/b12` | 16 | text_block |
| `p16/fig-01` | 16 | figure |
| `p16/fig-02` | 16 | figure |
| `p16/fig-03` | 16 | figure |
| `p16/fig-04` | 16 | figure |
| `p16/fig-05` | 16 | figure |
| `p16/fig-06` | 16 | figure |
| `p16/fig-07` | 16 | figure |
| `p16/fig-08` | 16 | figure |
| `p17/b01` | 17 | text_block |
| `p17/b02` | 17 | text_block |
| `p17/b03` | 17 | text_block |
| `p17/b04` | 17 | text_block |
| `p17/b05` | 17 | text_block |
| `p17/b06` | 17 | text_block |
| `p17/fig-01` | 17 | figure |
| `p17/fig-02` | 17 | figure |
| `p17/fig-03` | 17 | figure |
| `p17/fig-04` | 17 | figure |
| `p17/fig-05` | 17 | figure |
| `p18/b01` | 18 | text_block |
| `p18/b02` | 18 | text_block |
| `p18/b03` | 18 | text_block |
| `p18/b04` | 18 | text_block |
| `p18/b05` | 18 | text_block |
| `p18/b06` | 18 | text_block |
| `p18/b07` | 18 | text_block |
| `p18/b08` | 18 | text_block |
| `p18/b09` | 18 | text_block |
| `p18/b10` | 18 | text_block |
| `p18/b11` | 18 | text_block |
| `p18/b12` | 18 | text_block |
| `p18/fig-01` | 18 | figure |
| `p18/fig-02` | 18 | figure |
| `p19/b01` | 19 | text_block |
| `p19/b02` | 19 | text_block |
| `p19/b03` | 19 | text_block |
| `p19/fig-01` | 19 | figure |
| `p19/fig-02` | 19 | figure |
| `p19/fig-03` | 19 | figure |
| `p20/b01` | 20 | text_block |
| `p20/b02` | 20 | text_block |
| `p20/b03` | 20 | text_block |
| `p20/b04` | 20 | text_block |
| `p20/b05` | 20 | text_block |
| `p20/b06` | 20 | text_block |
| `p20/b07` | 20 | text_block |
| `p20/b08` | 20 | text_block |
| `p20/b09` | 20 | text_block |
| `p20/b10` | 20 | text_block |
| `p20/b11` | 20 | text_block |
| `p20/b12` | 20 | text_block |
| `p20/b13` | 20 | text_block |
| `p20/fig-01` | 20 | figure |
| `p20/fig-02` | 20 | figure |
| `p20/fig-03` | 20 | figure |
| `p20/fig-04` | 20 | figure |
| `p21/b01` | 21 | text_block |
| `p21/b02` | 21 | text_block |
| `p21/b03` | 21 | text_block |
| `p21/b04` | 21 | text_block |
| `p21/b05` | 21 | text_block |
| `p21/b06` | 21 | text_block |
| `p21/b07` | 21 | text_block |
| `p21/b08` | 21 | text_block |
| `p21/b09` | 21 | text_block |
| `p21/b10` | 21 | text_block |
| `p21/b11` | 21 | text_block |
| `p21/b12` | 21 | text_block |
| `p21/b13` | 21 | text_block |
| `p21/b14` | 21 | text_block |
| `p21/b15` | 21 | text_block |
| `p21/b16` | 21 | text_block |
| `p21/b17` | 21 | text_block |
| `p21/b18` | 21 | text_block |
| `p21/b19` | 21 | text_block |
| `p21/b20` | 21 | text_block |
| `p21/b21` | 21 | text_block |
| `p21/b22` | 21 | text_block |
| `p21/b23` | 21 | text_block |
| `p21/b24` | 21 | text_block |
| `p21/b25` | 21 | text_block |
| `p21/b26` | 21 | text_block |
| `p21/b27` | 21 | text_block |
| `p21/b28` | 21 | text_block |
| `p21/b29` | 21 | text_block |
| `p21/b30` | 21 | text_block |
| `p21/fig-01` | 21 | figure |
| `p21/fig-02` | 21 | figure |
| `p21/fig-03` | 21 | figure |
| `p21/fig-04` | 21 | figure |
| `p22/b01` | 22 | text_block |
| `p22/b02` | 22 | text_block |
| `p22/b03` | 22 | text_block |
| `p22/b04` | 22 | text_block |
| `p22/b05` | 22 | text_block |
| `p22/b06` | 22 | text_block |
| `p22/b07` | 22 | text_block |
| `p22/b08` | 22 | text_block |
| `p22/b09` | 22 | text_block |
| `p22/b10` | 22 | text_block |
| `p22/b11` | 22 | text_block |
| `p22/b12` | 22 | text_block |
| `p22/b13` | 22 | text_block |
| `p22/b14` | 22 | text_block |
| `p22/b15` | 22 | text_block |
| `p22/b16` | 22 | text_block |
| `p22/b17` | 22 | text_block |
| `p22/b18` | 22 | text_block |
| `p22/b19` | 22 | text_block |
| `p22/b20` | 22 | text_block |
| `p22/b21` | 22 | text_block |
| `p22/b22` | 22 | text_block |
| `p22/b23` | 22 | text_block |
| `p22/b24` | 22 | text_block |
| `p22/b25` | 22 | text_block |
| `p22/b26` | 22 | text_block |
| `p22/b27` | 22 | text_block |
| `p22/b28` | 22 | text_block |
| `p22/b29` | 22 | text_block |
| `p22/fig-01` | 22 | figure |
| `p22/fig-02` | 22 | figure |
| `p22/fig-03` | 22 | figure |
| `p22/fig-04` | 22 | figure |
| `p22/fig-05` | 22 | figure |
| `p22/fig-06` | 22 | figure |
| `p22/fig-07` | 22 | figure |
| `p22/fig-08` | 22 | figure |
| `p22/fig-09` | 22 | figure |
| `p22/fig-10` | 22 | figure |
| `p23/b01` | 23 | text_block |
| `p23/b02` | 23 | text_block |
| `p23/b03` | 23 | text_block |
| `p23/b04` | 23 | text_block |
| `p23/b05` | 23 | text_block |
| `p23/b06` | 23 | text_block |
| `p23/b07` | 23 | text_block |
| `p23/b08` | 23 | text_block |
| `p23/b09` | 23 | text_block |
| `p23/b10` | 23 | text_block |
| `p23/b11` | 23 | text_block |
| `p23/b12` | 23 | text_block |
| `p23/b13` | 23 | text_block |
| `p23/b14` | 23 | text_block |
| `p23/b15` | 23 | text_block |
| `p23/b16` | 23 | text_block |
| `p23/b17` | 23 | text_block |
| `p23/b18` | 23 | text_block |
| `p23/b19` | 23 | text_block |
| `p23/b20` | 23 | text_block |
| `p23/b21` | 23 | text_block |
| `p23/b22` | 23 | text_block |
| `p23/b23` | 23 | text_block |
| `p23/b24` | 23 | text_block |
| `p23/b25` | 23 | text_block |
| `p23/b26` | 23 | text_block |
| `p23/b27` | 23 | text_block |
| `p23/b28` | 23 | text_block |
| `p23/fig-01` | 23 | figure |
| `p24/b01` | 24 | text_block |
| `p24/b02` | 24 | text_block |
| `p24/b03` | 24 | text_block |
| `p24/b04` | 24 | text_block |
| `p24/b05` | 24 | text_block |
| `p24/b06` | 24 | text_block |
| `p24/b07` | 24 | text_block |
| `p24/b08` | 24 | text_block |
| `p24/b09` | 24 | text_block |
| `p24/b10` | 24 | text_block |
| `p24/b11` | 24 | text_block |
| `p24/b12` | 24 | text_block |
| `p24/b13` | 24 | text_block |
| `p24/b14` | 24 | text_block |
| `p24/b15` | 24 | text_block |
| `p24/b16` | 24 | text_block |
| `p24/b17` | 24 | text_block |
| `p24/b18` | 24 | text_block |
| `p24/b19` | 24 | text_block |
| `p24/b20` | 24 | text_block |
| `p24/b21` | 24 | text_block |
| `p24/b22` | 24 | text_block |
| `p24/b23` | 24 | text_block |
| `p24/b24` | 24 | text_block |
| `p24/b25` | 24 | text_block |
| `p24/b26` | 24 | text_block |
| `p24/b27` | 24 | text_block |
| `p24/b28` | 24 | text_block |
| `p24/b29` | 24 | text_block |
| `p24/b30` | 24 | text_block |
| `p24/fig-01` | 24 | figure |
| `p24/fig-02` | 24 | figure |
| `p24/fig-03` | 24 | figure |
| `p24/fig-04` | 24 | figure |
| `p25/b01` | 25 | text_block |
| `p25/b02` | 25 | text_block |
| `p25/b03` | 25 | text_block |
| `p25/b04` | 25 | text_block |
| `p25/b05` | 25 | text_block |
| `p25/b06` | 25 | text_block |
| `p25/fig-01` | 25 | figure |
| `p25/fig-02` | 25 | figure |
| `p25/fig-03` | 25 | figure |
| `p25/fig-04` | 25 | figure |
| `p25/fig-05` | 25 | figure |
| `p25/fig-06` | 25 | figure |
| `p25/fig-07` | 25 | figure |
| `p26/b01` | 26 | text_block |
| `p26/b02` | 26 | text_block |
| `p26/b03` | 26 | text_block |
| `p26/b04` | 26 | text_block |
| `p26/b05` | 26 | text_block |
| `p26/b06` | 26 | text_block |
| `p26/b07` | 26 | text_block |
| `p26/b08` | 26 | text_block |
| `p26/b09` | 26 | text_block |
| `p26/fig-01` | 26 | figure |
| `p26/fig-02` | 26 | figure |
| `p26/fig-03` | 26 | figure |
| `p26/fig-04` | 26 | figure |
| `p26/fig-05` | 26 | figure |
| `p26/fig-06` | 26 | figure |
| `p27/b01` | 27 | text_block |
| `p27/b02` | 27 | text_block |
| `p27/b03` | 27 | text_block |
| `p27/b04` | 27 | text_block |
| `p27/b05` | 27 | text_block |
| `p27/b06` | 27 | text_block |
| `p27/b07` | 27 | text_block |
| `p27/b08` | 27 | text_block |
| `p27/b09` | 27 | text_block |
| `p27/b10` | 27 | text_block |
| `p27/b11` | 27 | text_block |
| `p27/b12` | 27 | text_block |
| `p27/b13` | 27 | text_block |
| `p27/b14` | 27 | text_block |
| `p27/b15` | 27 | text_block |
| `p27/b16` | 27 | text_block |
| `p27/b17` | 27 | text_block |
| `p27/fig-01` | 27 | figure |
| `p27/fig-02` | 27 | figure |
| `p27/fig-03` | 27 | figure |
| `p27/fig-04` | 27 | figure |
| `p27/fig-05` | 27 | figure |
| `p27/fig-06` | 27 | figure |
| `p27/fig-07` | 27 | figure |
| `p27/fig-08` | 27 | figure |
| `p28/b01` | 28 | text_block |
| `p28/b02` | 28 | text_block |
| `p28/b03` | 28 | text_block |
| `p28/b04` | 28 | text_block |
| `p28/b05` | 28 | text_block |
| `p28/b06` | 28 | text_block |
| `p28/b07` | 28 | text_block |
| `p28/b08` | 28 | text_block |
| `p28/b09` | 28 | text_block |
| `p28/b10` | 28 | text_block |
| `p28/b11` | 28 | text_block |
| `p28/b12` | 28 | text_block |
| `p28/b13` | 28 | text_block |
| `p28/fig-01` | 28 | figure |
| `p28/fig-02` | 28 | figure |
| `p28/fig-03` | 28 | figure |
| `p28/fig-04` | 28 | figure |
| `p28/fig-05` | 28 | figure |
| `p29/b01` | 29 | text_block |
| `p29/b02` | 29 | text_block |
| `p29/b03` | 29 | text_block |
| `p29/b04` | 29 | text_block |
| `p29/b05` | 29 | text_block |
| `p29/b06` | 29 | text_block |
| `p29/b07` | 29 | text_block |
| `p29/b08` | 29 | text_block |
| `p29/b09` | 29 | text_block |
| `p29/b10` | 29 | text_block |
| `p29/fig-01` | 29 | figure |
| `p29/fig-02` | 29 | figure |
| `p29/fig-03` | 29 | figure |
| `p29/fig-04` | 29 | figure |
| `p29/fig-05` | 29 | figure |
| `p30/b01` | 30 | text_block |
| `p30/b02` | 30 | text_block |
| `p30/b03` | 30 | text_block |
| `p30/b04` | 30 | text_block |
| `p30/b05` | 30 | text_block |
| `p30/b06` | 30 | text_block |
| `p30/b07` | 30 | text_block |
| `p30/b08` | 30 | text_block |
| `p30/b09` | 30 | text_block |
| `p30/b10` | 30 | text_block |
| `p30/fig-01` | 30 | figure |
| `p31/b01` | 31 | text_block |
| `p31/b02` | 31 | text_block |
| `p31/b03` | 31 | text_block |
| `p31/b04` | 31 | text_block |
| `p31/b05` | 31 | text_block |
| `p31/b06` | 31 | text_block |
| `p31/b07` | 31 | text_block |
| `p31/b08` | 31 | text_block |
| `p31/b09` | 31 | text_block |
| `p31/b10` | 31 | text_block |
| `p31/b11` | 31 | text_block |
| `p31/b12` | 31 | text_block |
| `p31/b13` | 31 | text_block |
| `p31/b14` | 31 | text_block |
| `p31/b15` | 31 | text_block |
| `p31/b16` | 31 | text_block |
| `p31/b17` | 31 | text_block |
| `p31/b18` | 31 | text_block |
| `p31/fig-01` | 31 | figure |
| `p31/fig-02` | 31 | figure |
| `p31/fig-03` | 31 | figure |
| `p32/b01` | 32 | text_block |
| `p32/b02` | 32 | text_block |
| `p32/b03` | 32 | text_block |
| `p32/b04` | 32 | text_block |
| `p32/b05` | 32 | text_block |
| `p32/b06` | 32 | text_block |
| `p32/b07` | 32 | text_block |
| `p32/b08` | 32 | text_block |
| `p32/b09` | 32 | text_block |
| `p32/b10` | 32 | text_block |
| `p32/b11` | 32 | text_block |
| `p32/fig-01` | 32 | figure |
| `p32/fig-02` | 32 | figure |
| `p32/fig-03` | 32 | figure |
| `p32/fig-04` | 32 | figure |
| `p32/fig-05` | 32 | figure |
| `p32/fig-06` | 32 | figure |
| `p32/fig-07` | 32 | figure |
| `p33/b01` | 33 | text_block |
| `p33/b02` | 33 | text_block |
| `p33/b03` | 33 | text_block |
| `p33/b04` | 33 | text_block |
| `p33/b05` | 33 | text_block |
| `p33/b06` | 33 | text_block |
| `p33/fig-01` | 33 | figure |
| `p33/fig-02` | 33 | figure |
| `p33/fig-03` | 33 | figure |
| `p33/fig-04` | 33 | figure |
| `p34/b01` | 34 | text_block |
| `p34/b02` | 34 | text_block |
| `p34/b03` | 34 | text_block |
| `p34/b04` | 34 | text_block |
| `p34/b05` | 34 | text_block |
| `p34/b06` | 34 | text_block |
| `p34/b07` | 34 | text_block |
| `p34/b08` | 34 | text_block |
| `p34/fig-01` | 34 | figure |
| `p34/fig-02` | 34 | figure |
| `p34/fig-03` | 34 | figure |
| `p34/fig-04` | 34 | figure |
| `p35/b01` | 35 | text_block |
| `p35/b02` | 35 | text_block |
| `p35/b03` | 35 | text_block |
| `p35/b04` | 35 | text_block |
| `p35/b05` | 35 | text_block |
| `p35/b06` | 35 | text_block |
| `p35/fig-01` | 35 | figure |
| `p35/fig-02` | 35 | figure |
| `p35/fig-03` | 35 | figure |
| `p35/fig-04` | 35 | figure |
| `p35/fig-05` | 35 | figure |
| `p36/b01` | 36 | text_block |
| `p36/b02` | 36 | text_block |
| `p36/b03` | 36 | text_block |
| `p36/b04` | 36 | text_block |
| `p36/b05` | 36 | text_block |
| `p36/b06` | 36 | text_block |
| `p36/fig-01` | 36 | figure |
| `p36/fig-02` | 36 | figure |
| `p36/fig-03` | 36 | figure |
| `p37/b01` | 37 | text_block |
| `p37/b02` | 37 | text_block |
| `p37/b03` | 37 | text_block |
| `p37/b04` | 37 | text_block |
| `p37/b05` | 37 | text_block |
| `p37/fig-01` | 37 | figure |
| `p37/fig-02` | 37 | figure |
| `p37/fig-03` | 37 | figure |
| `p38/b01` | 38 | text_block |
| `p38/b02` | 38 | text_block |
| `p38/b03` | 38 | text_block |
| `p38/b04` | 38 | text_block |
| `p38/b05` | 38 | text_block |
| `p38/b06` | 38 | text_block |
| `p38/b07` | 38 | text_block |
| `p38/b08` | 38 | text_block |
| `p38/b09` | 38 | text_block |
| `p38/b10` | 38 | text_block |
| `p38/b11` | 38 | text_block |
| `p38/b12` | 38 | text_block |
| `p38/b13` | 38 | text_block |
| `p38/b14` | 38 | text_block |
| `p38/b15` | 38 | text_block |
| `p38/b16` | 38 | text_block |
| `p38/b17` | 38 | text_block |
| `p38/b18` | 38 | text_block |
| `p38/b19` | 38 | text_block |
| `p38/b20` | 38 | text_block |
| `p38/b21` | 38 | text_block |
| `p38/b22` | 38 | text_block |
| `p38/b23` | 38 | text_block |
| `p38/b24` | 38 | text_block |
| `p38/b25` | 38 | text_block |
| `p38/b26` | 38 | text_block |
| `p38/b27` | 38 | text_block |
| `p38/b28` | 38 | text_block |
| `p38/b29` | 38 | text_block |
| `p38/b30` | 38 | text_block |
| `p38/b31` | 38 | text_block |
| `p38/fig-01` | 38 | figure |
| `p38/fig-02` | 38 | figure |
| `p39/b01` | 39 | text_block |
| `p39/b02` | 39 | text_block |
| `p39/b03` | 39 | text_block |
| `p39/b04` | 39 | text_block |
| `p39/b05` | 39 | text_block |
| `p39/b06` | 39 | text_block |
| `p39/b07` | 39 | text_block |
| `p39/b08` | 39 | text_block |
| `p39/b09` | 39 | text_block |
| `p39/b10` | 39 | text_block |
| `p39/b11` | 39 | text_block |
| `p39/b12` | 39 | text_block |
| `p39/b13` | 39 | text_block |
| `p39/b14` | 39 | text_block |
| `p39/b15` | 39 | text_block |
| `p39/b16` | 39 | text_block |
| `p39/b17` | 39 | text_block |
| `p39/b18` | 39 | text_block |
| `p39/b19` | 39 | text_block |
| `p39/b20` | 39 | text_block |
| `p39/b21` | 39 | text_block |
| `p39/b22` | 39 | text_block |
| `p39/b23` | 39 | text_block |
| `p39/b24` | 39 | text_block |
| `p39/b25` | 39 | text_block |
| `p39/fig-01` | 39 | figure |
| `p39/fig-02` | 39 | figure |
| `p40/b01` | 40 | text_block |
| `p40/b02` | 40 | text_block |
| `p40/b03` | 40 | text_block |
| `p40/b04` | 40 | text_block |
| `p40/b05` | 40 | text_block |
| `p40/b06` | 40 | text_block |
| `p40/b07` | 40 | text_block |
| `p40/b08` | 40 | text_block |
| `p40/b09` | 40 | text_block |
| `p40/b10` | 40 | text_block |
| `p40/b11` | 40 | text_block |
| `p40/b12` | 40 | text_block |
| `p40/b13` | 40 | text_block |
| `p40/b14` | 40 | text_block |
| `p40/b15` | 40 | text_block |
| `p40/b16` | 40 | text_block |
| `p40/b17` | 40 | text_block |
| `p40/b18` | 40 | text_block |
| `p40/b19` | 40 | text_block |
| `p40/b20` | 40 | text_block |
| `p40/fig-01` | 40 | figure |
| `p40/fig-02` | 40 | figure |
| `p40/fig-03` | 40 | figure |
| `p40/fig-04` | 40 | figure |
| `p40/fig-05` | 40 | figure |
| `p40/fig-06` | 40 | figure |
| `p40/fig-07` | 40 | figure |
