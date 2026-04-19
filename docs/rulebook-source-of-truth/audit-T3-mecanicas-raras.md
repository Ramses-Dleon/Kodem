# Auditoría T3 — Mecánicas raras y únicas
_Generado: 2026-04-19 · Sub-agente Logos (Opus 4.7)_
_Corpus: 1074 cartas (`cards-slim.json`) · Rulebook: `master-rulebook-v5.1.md`_

> **Objetivo.** Detectar mecánicas que aparecen en muy pocas cartas (≤3 _conceptos únicos_, dedupe por nombre/ES+EN) y cruzar cada una con el rulebook v5.1 para marcar su estado de documentación. Cada mecánica rara es candidato a ruling especial para v5.2 porque su baja frecuencia suele correlacionarse con ambigüedad de reglas.
>
> **Convenciones.** "Conceptos únicos" = cartas distintas por nombre tras quitar `[ENGLISH]` y reimpresiones con mismo texto. Los contadores crudos (`N folios`) se indican entre paréntesis cuando difieren.
>
> **Leyenda de documentación.**
> - ✅ Documentada (glosario o capítulo propio)
> - ⚠️ Mencionada de paso / no formalizada como regla
> - 🚩 NO documentada en el rulebook

---

## Resumen ejecutivo

| Dimensión | Conteo |
|---|---|
| Mecánicas ÚNICAS (1 concepto) | **13** |
| Mecánicas RARAS (2–3 conceptos) | **11** |
| 🚩 No documentadas en rulebook | **9** |
| ⚠️ Mencionadas sin formalizar | **6** |
| Candidatas prioritarias a ruling v5.2 | **12** |

**Top hallazgos**
1. 🎯 **"Fuera del Juego"** (Quam, TCOO-006U) — zona no documentada y con texto que se auto-refiere tras dejar el campo. **Alta prioridad.**
2. 🎯 **"Cyra gasta X puntos"** (INMX-001 y KSPC-001) — término indefinido; probable typo histórico por "Cura" no corregido en producción.
3. 🎯 **"Efectos de cartas tomadas"** (FAFT-001, FYTE-005S, FYTE-010) — mecánica que ya tiene edge-cases publicadas pero cuyo alcance nunca se define.
4. 🎯 **"Intercambiar"** (Ariam Resurrección, Mizthe Arconte, Therz Guardian) — acción no documentada que mueve cartas entre zonas con preservación de vida.
5. 🎯 **"Feliz Navidad / choque de puños"** (NAVD-001, SNVL-001) — requisitos sociales fuera del estado del juego; no hay marco formal para condiciones no-mecánicas.

---

## Mecánicas ÚNICAS 🎯 (1 concepto único)

### 1. "Fuera del Juego" 🚩
- **Cartas:** `TCOO-006U` / `TCEO-006U` (ES/EN) + reimpresiones 081 = **Quam, Detrás de la Materia** (único concepto).
- **Texto:** *"Pasiva: Revela 1 carta de tu Mazo y colócala fuera del juego. Si tu Protector está disponible, puedes regresar 1 Adendei en tu Zona Principal al fondo de tu Mazo y colocar la carta fuera del juego en su lugar con 6 ptos. de vida (aún si esta carta ya no está en el campo)."*
- **Rulebook:** 🚩 **No documentada.** La única mención literal de "fuera del juego" en v5.1 (p20 §5.3 punto 6) se refiere a cartas que se retiran al agotar el Mazo, no a una zona operativa mientras el juego está en curso.
- **Ambigüedades:**
  - ¿La carta "fuera del juego" es un objetivo válido de otros efectos (e.g. intercambiar, copiar, vivificar)?
  - ¿Cuenta como Extinción para efectos que buscan "cartas en Extinción"? (Intuitivamente no, pero no lo dice.)
  - El paréntesis "(aún si esta carta ya no está en el campo)" crea un efecto latente persistente sobre la carta de Quam — ¿cómo interactúa con negaciones retroactivas?
- **Sugerencia v5.2:** Formalizar como **§4.X — Zona Fuera del Juego** con reglas de: (a) objetivo/no-objetivo, (b) no cuenta como Extinción ni Mazo, (c) efectos latentes declarados antes de abandonar el campo (anclar al glosario "Declarar un efecto" p38/b20 que ya contempla el caso).

### 2. "Cyra" (verbo indefinido) 🚩
- **Cartas:** `INMX-001` Kopit y Jokokan, Libertad · `KSPC-001` Ariam, 1st Anniversary.
- **Texto:** *"Activa: Cyra gasta 6 puntos a un Adendei aliado."*
- **Rulebook:** 🚩 No aparece la palabra "Cyra".
- **Diagnóstico:** casi con seguridad **typo de "Cura"** (y probablemente "gasta" por "a" o similar) perpetuado por dos impresiones independientes. El texto "gasta 6 puntos a un Adendei aliado" no tiene interpretación coherente en las reglas actuales.
- **Sugerencia v5.2:** errata de reimpresión + FAQ oficial normalizando el texto canónico. NO crear una mecánica nueva.

### 3. Efecto persistente "durante el resto del juego" 🚩
- **Carta:** `FYTE-078` / `KPRC-086` **Mixtla, Regreso** — *"Si esta carta es vivificada, puedes usar 1 Activa-Rápida adicional en turno rival durante el resto del juego."* Costo: *"No podrás usar Activas-Rápidas en tu turno durante el resto del juego."*
- **Rulebook:** 🚩 No hay marco para modificadores de estructura de turno de duración "partida completa".
- **Ambigüedades:** ¿El costo sigue vivo si Mixtla es eliminada? ¿Qué pasa si Mixtla es vivificada dos veces?
- **Sugerencia v5.2:** cláusula en §6.6 (Efectos) sobre **efectos de duración persistente** y su interacción con negación/reemplazo. Aclarar que el costo se paga una sola vez al activar.

### 4. "Actualiza X descanso adicional" ⚠️
- **Carta:** `PASE-005` **Carga Arsenal** — *"Al final de ese turno actualiza 1 descanso adicional a tu Protector."*
- **Rulebook:** §5.1 Descansos documenta actualizar descansos, pero no el modificador "**adicional**" al flujo normal de actualización de Fase Previa.
- **Sugerencia v5.2:** nota en §5.1 que "adicional" suma al `update` estándar de Fase Previa (no lo reemplaza).

### 5. "Aun si esta carta deja el campo" ⚠️
- **Carta:** `PASE-005` Carga Arsenal — *"Esta Activa debe cumplirse aun si esta carta deja el campo."*
- **Rulebook:** El glosario (p38/b20 "Declarar un efecto") ya contempla resoluciones después de que la carta abandona la zona. Pero Carga Arsenal **obliga** a cumplir el efecto en una ventana futura (próxima Previa + final de ese turno), no lo resuelve al declarar.
- **Sugerencia v5.2:** extender la regla del glosario a "efectos de cumplimiento diferido": mantener el estado de obligación incluso tras eliminación.

### 6. "Cambiar energía" de un Adendei 🚩
- **Carta:** `LGRO-037` **Amanecer** — *"Pasiva: Selecciona 1 Adendei en el campo y cambia su energia hasta el final del turno rival."*
- **Rulebook:** §6.2 documenta **Feralizar** (pierde 1 energía → pasa a Feral) pero no un cambio libre a cualquier tipo. Nota: KPRC-018 Zaykan Cambio de Energía usa *"Selecciona un tipo de Energía y todos los Adendei rivales serán considerados ese tipo"* — otro patrón distinto.
- **Sugerencia v5.2:** distinguir explícitamente 3 operaciones: **Feralizar**, **Cambiar** (sustitución), **Considerar como** (añade tipo para fines de referencia). Kepler de interacción con "Consejo de Hielo" (LGRO-007/010R) también cae aquí.

### 7. "Copia y usa el efecto y costo de [X] en Extinción" ⚠️
- **Carta:** `RAMI-007S / RAPB-0075` **Brazalete de Rotanio** — *"Copia y usa el efecto y costo de cualquier Rot en Extinción."*
- **Rulebook:** p38/b11 define **Copiar** pero habla de "otra carta especificada"; no clarifica **copiar desde Extinción** ni copiar el **costo** (que no es efecto y p38/b12 lo reafirma).
- **Sugerencia v5.2:** adendum al glosario Copiar — "copiar costo" convierte el costo en una obligación que el jugador debe pagar al resolver el efecto copiado.

### 8. "Cura toda la vida" 🚩
- **Carta:** `IKRW-001 / TCDE-026` **Jane, Maniobra** — *"Cura toda la vida del Adendei vinculado."*
- **Rulebook:** p38/b13 define **Curar** como "incrementa los puntos de vida… sin exceder su máximo". "Toda la vida" no está formalizado como sinónimo de "hasta su vida máxima".
- **Sugerencia v5.2:** glosario — agregar nota: *"cura toda la vida" ≡ curar hasta vida máxima impresa*.

### 9. "Descansos iguales a los indicados en su respectiva carta" 🚩
- **Carta:** `IDRMP-022 / KPRC / RMR-017` **Xakros, Peste** — *"Todos los Adendei en el campo reciben descansos iguales a los indicados en su respectiva carta."*
- **Rulebook:** 🚩 Ningún texto explica "estadística de descansos impresa" como una **fuente de descansos activables por efecto**.
- **Ambigüedad clave:** ¿Cuenta la estadística **base** o la actual (modificada por escalar/descender)? ¿Los Tokens creados por efecto qué valor toman?
- **Sugerencia v5.2:** glosario — agregar entrada **"Descanso impreso"** y aclarar que efectos que hablan de "descansos indicados" toman el valor base.

### 10. "Reciben descansos iguales" y no puede actualizar 🚩
- Mismas cartas que (9). Misma sugerencia.

### 11. "Esta carta siempre estará abismada" ⚠️
- **Carta:** `TCEO-003U` **Nepthis, Entre las Sombras** — efecto y costo idénticos: *"Esta carta siempre estara abismada."*
- **Rulebook:** §6.1 dice que las marcas solo se remueven por "remover marca, curación o Extinción". Una carta con la marca **permanente por diseño** requiere ruling: ¿el efecto es una marca o un estado especial?
- **Sugerencia v5.2:** considerar como "estado innato" — no es una marca-colocada y por tanto no se puede remover por "remover marcas". Aclarar explícitamente.

### 12. "Efecto rápido durante este turno" ⚠️
- **Carta:** `CAMP-0017UV / TCEO-002S` **Ryptor, Jugada Veloz** — *"Si 1 Adendei-Chaaktico Titan aliado es revelado, el efecto de ese Adendei se considera efecto rápido durante este turno."*
- **Rulebook:** "Activa-Rápida" y "Pasiva-Rápida" están definidas; **"efecto rápido"** es terminología distinta que **no está en el glosario**.
- **Sugerencia v5.2:** normalizar a "Activa-Rápida"/"Pasiva-Rápida" en FAQ, o añadir entrada "efecto rápido" = convierte cualquier Activa/Pasiva en su variante rápida.

### 13. "Escalar 1-5 ptos. una vez mientras esté en el campo" 🚩
- **Carta:** `CAMP-0003 / RAMI-012 / PRT-2022-07` **Xilan, Calma** — *"Esta carta puede escalar 1-5 ptos. una vez mientras esté en el campo."*
- **Rulebook:** Escalar (§6.2 + p38/b27) siempre es de monto fijo. **Rango 1-5 elegible por el jugador** es único.
- **Sugerencia v5.2:** aclarar que el valor se elige al declarar, es permanente y se aplica a la estadística base.

---

## Mecánicas RARAS ⭐ (2–3 conceptos únicos)

### "Fuera de la Zona Principal" (objetivo de efecto) ⚠️
- **Cartas:** `FAFT-001` Nirge Los Ocultos · `FYTE-005S` Zotz, Videncia Vital · `FYTE-010` El Lago del Adiós Eterno.
- **Texto común:** *"efectos de cartas tomadas"* / *"efecto de carta tomada que el rival use"* / *"los Adendei Catrín están protegidos de marcas y de efectos de cartas tomadas"*.
- **Rulebook:** p38/b20 menciona "cartas tomadas o vivificadas" como ejemplo de lugares donde se puede declarar un efecto, pero no formaliza **"efecto de carta tomada"** como una categoría.
- **Sugerencia v5.2:** glosario — *"Efecto de carta tomada: efecto declarado desde la mano (ver Tomar) o al momento de ser tomada del Mazo. Se considera categoría objetivo para protecciones y negaciones específicas."*

### "Intercambiar" (cambio entre zonas con preservación) 🚩
- **Cartas:** `FYTE-022R / FYTE-074` Ariam, Resurrección · `FYTE-071` Therz, Guardián de Ultratumba · `FYTE-075` Mizthe, Arconte del Más Allá.
- **Textos:** intercambios entre Extinción ↔ Zona Principal, con conservación de vida (máx 6 puntos) y condición de no-vivificado.
- **Rulebook:** 🚩 "Intercambiar" no está en el glosario. Se usa **Cambiar** (p38/b07) para movimiento intra-campo, no para swaps con Extinción.
- **Sugerencia v5.2:** añadir **Intercambiar** al glosario: acción simultánea que mueve dos cartas entre zonas; cada una aplica sus reglas de colocación (p.ej. vivificación) según la zona destino.

### "Protector suplente" (cambio de Protector) ⚠️
- **Cartas:** `FYTE-024R` Therz, Garras Óseas · `LGRO-060` Zaykan, Primer Peldaño · `TCEO-015R` Ulmor Vínculo Odémico · `TCEO-062` Migración Defensiva.
- **Textos:** *"cambia 1 Protector por su Protector suplente"* / *"puedes cambiar al Protector aliado, por un Protector suplente"*.
- **Rulebook:** §3.2 + p40/b08 documentan el Protector suplente como reemplazo tras abandonar el campo **involuntariamente**. El cambio **voluntario por efecto** no está cubierto.
- **Sugerencia v5.2:** aclarar que el cambio por efecto mantiene los descansos actuales y la vida máxima del Protector suplente (o regla alternativa que Ramsés decida).

### "No puede ser vivificada" ⚠️
- **Cartas:** `FYTE-002S` Caverna de los Lamentos · `FYTE-005` Terciopelo, Flor de Dos Tierras · `MLBU-001S` Árbol, Leyendas.
- **Rulebook:** Vivificar está en p28 y p40/b04, pero no existe una cláusula sobre **inmunidad a vivificación**.
- **Sugerencia v5.2:** aclarar que la restricción se evalúa al momento en que otra carta declara vivificar sobre la restringida.

### Token-[Energía] con estadísticas elegibles 🚩
- **Cartas:** `TCDE-008` Dagg, Abismo Feral · `TCDE-015` Gloku, Trituración.
- **Textos:** colocar Token-Feral / Token-Lítico con estadísticas elegibles (4/2 o 2/0) o copiadas de un Adendei rival.
- **Rulebook:** §3.6 Token documenta qué es un Token, pero **no** que los Tokens puedan **nacer con estadísticas variables** o **copiadas de un rival**.
- **Sugerencia v5.2:** cláusula en §3.6 — *"Algunos efectos crean Tokens con parámetros derivados; los parámetros se congelan al momento de la creación y no se actualizan si la fuente cambia."*

### "Token con tipo de Energía X, 2 ptos. de daño y 0 descansos" 🚩
- **Carta única:** `KPRC-019` Zaren, Union.
- Patrón específico del anterior. Cruza con (^^).

### "Mazo rival" como objetivo 🚩
- **Cartas:** `DOOC-003S` Therz, Manifestación Fantasmal · `FYTE-005S` Zotz, Videncia Vital · `LGRO-011` Zotz, Rechazo.
- **Textos:** *"Muestra las 3 cartas del tope del Mazo rival"*, *"al fondo del Mazo rival"*, *"revela las 3 cartas del tope del Mazo rival y envía 1 a Extinción"*.
- **Rulebook:** 🚩 Ningún texto hace explícito que un jugador puede **manipular el Mazo rival**. Es terreno nuevo.
- **Sugerencia v5.2:** regla §4.X — *"Los efectos que afectan al Mazo rival se declaran públicamente; las cartas vistas se muestran a ambos jugadores salvo indicación contraria."*

### Social mechanics (gesto obligatorio) 🚩
- **Cartas:** `NAVD-001` Ariam, Regalo Navideño (Feliz Navidad en diciembre) · `SNVL-001` Ariam, Día del Amor y la Amistad (choque de puños).
- **Rulebook:** 🚩 Sin marco para **condiciones sociales** (saludos, fechas reales).
- **Sugerencia v5.2:** nota de diseño / FAQ — *"efectos temáticos con requisitos sociales deben resolverse de buena fe; si el rival rechaza la interacción, el efecto se considera no-declarado."* Probablemente no merece entrada en el rulebook principal.

### "Hasta 3 jugadores" / Multijugador 🚩
- **Cartas:** `KPRC-052` Maíz Multicolor · `KPRC-054` Vesta Ignia · `KPRC-058` Enjambre Pírico · `KPRC-060` Ulmor Tinta Cegadora.
- **Textos:** daño/quema/abismo simultáneo a hasta 2-3 **jugadores** rivales.
- **Rulebook:** v5.1 supone 1v1; **formato multijugador** no está documentado.
- **Sugerencia v5.2:** reconocer formalmente modos multiplayer. Si no hay intención de oficializarlos, añadir nota: *"en 1v1 estos efectos se aplican solo al único rival disponible."*

### "Regresar equipo a la Zona de Equipo por efecto" ⚠️
- **Cartas:** `IDRMA-015 / LGRO-001R` Pruebas de Campo · `TCDE-014` Desviación Pétrea.
- **Rulebook:** §3.4 Equipos sí permite regresar equipos cuando abandonan sin ir a Extinción. Pero el caso **efecto explícito que los regresa como parte de su resolución** no está pintado con reglas claras respecto a si el equipo puede re-equiparse el mismo turno.
- **Sugerencia v5.2:** clarificar que un equipo regresado a Zona de Equipo puede re-equiparse en Fase Previa siguiente siguiendo reglas normales.

### "Desde la Zona de Equipo" (disparador fuera del Adendei equipado) ⚠️
- **Cartas:** `TCDE-012` Bomba de Clorofila · `TCEO-015` Árbol Jurásico.
- **Textos:** efectos que se declaran **estando aún en la Zona de Equipo** (antes de equiparse o sin equiparse), cosa inusual en el juego.
- **Rulebook:** §3.4 asume que los equipos actúan equipados; no hay regla para efectos declarados desde la Zona de Equipo.
- **Sugerencia v5.2:** cláusula en §3.4 — *"Algunos Ixim/Rot declaran su efecto sin estar equipados. Dichos efectos se declaran desde la Zona de Equipo como si fueran Pasivas y consumen la carta (Extinción) salvo indicación."*

### "Ataque con costo de dañarse antes" ⚠️
- **Cartas:** `IDRMA-003` Ulmor, Ataque Fugaz · `IDRMG-004 / RAMI-011` Xilan, Báculo de Poder · `LGRO-012` Zaykan, Reclutamiento.
- **Texto:** *"Esta carta se daña 1 pto. antes de atacar"*.
- **Rulebook:** §6.6.3 Costos documenta costos pre-ataque en general. "Dañarse a sí mismo antes de atacar" es un caso específico donde el orden (¿cuándo se aplica la reducción de vida?) puede afectar el daño si la carta escaló o descendió.
- **Sugerencia v5.2:** confirmar que el auto-daño se resuelve **antes** de la Declaración de Ataque y que si el auto-daño manda la carta a 0, el ataque no se declara.

---

## Cartas con texto huérfano (1 mención en todo el corpus)

Estas se detectaron durante la revisión; requieren decisión editorial más que ruling:
- **`IDRMA-023` Rot** (carta narrativa) — mención de *"Los Lox"* (subclase no implementada en cartas jugables).
- **`IDRMG-023` Ixim** (carta narrativa) — mención de *"Yaxis"* y *"Kuxum"* como subclases.
- **`TCEO-003U` Nepthis** — *"siempre estará abismada"* (ver #11).
- **`FAFT-001` Nirge, Los Ocultos** — concepto *"efecto de carta tomada"*.
- **`KPRC-091` Yakerr, Colmillos Eléctricos** — *"Ningún jugador podrá regresar equipos a la Zona de Equipo hasta el final del turno"* — efecto global que afecta ambos lados; patrón raro.

---

## Candidatas a ruling v5.2 (prioridad ordenada)

Ranking: (rareza × ausencia en rulebook × potencial de interacción competitiva).

| # | Mecánica | Cartas | Docs | Razón prioridad |
|---|---|---|---|---|
| 1 | **Fuera del Juego** (zona) | Quam 006U/081 | 🚩 | Zona nueva no documentada + efecto latente post-campo. |
| 2 | **Intercambiar** (acción) | 3 cartas Resurrecto/Espectro | 🚩 | Mueve cartas entre Extinción y campo, con transferencia de vida. Clave en arquetipos Resurrecto/Espectro. |
| 3 | **Efectos de cartas tomadas** | 3 cartas (Nirge, Zotz, Lago) | ⚠️ | Ya hay cartas que se *protegen* contra esta categoría → la categoría necesita definición formal. |
| 4 | **Mazo rival** como objetivo | 3 cartas Zotz/Therz | 🚩 | Reglas sociales de visibilidad (privacidad del Mazo rival) no definidas. |
| 5 | **Descansos indicados (impresos)** | Xakros, Peste (3 imprs.) | 🚩 | "Estadística base vs actual" puede romper combos con escalar/descender. |
| 6 | **Tokens con estadísticas variables/copiadas** | Dagg, Gloku, Zaren Unión | 🚩 | §3.6 actual no contempla creación paramétrica. |
| 7 | **Efectos persistentes "durante el resto del juego"** | Mixtla Regreso | 🚩 | Impacto estructural de turno; interacción con eliminación/negación ambigua. |
| 8 | **Cambiar energía vs Feralizar vs Considerar como** | Amanecer, KPRC-018, Consejo de Hielo | ⚠️ | 3 operaciones similares con reglas distintas deben separarse. |
| 9 | **Protector suplente por efecto** | 4 cartas | ⚠️ | §3.2 solo cubre reemplazo involuntario. |
| 10 | **Copiar efecto Y costo desde Extinción** | Brazalete de Rotanio | ⚠️ | p38/b11 Copiar no habla de costos ni Extinción. |
| 11 | **Efecto rápido** (terminología alterna) | Ryptor Jugada Veloz | ⚠️ | Limpiar jerga vs "Activa-Rápida" formal. |
| 12 | **Cyra gasta…** (typo histórico) | INMX-001, KSPC-001 | 🚩 | Errata oficial + FAQ; no crear mecánica. |

### Secundarias (errata o alcance menor)
13. "Cura toda la vida" → aclaración mínima en glosario Curar.
14. "Siempre estará abismada" → distinguir marca-colocada vs estado-innato.
15. "No puede ser vivificada" → nota en entrada Vivificar.
16. "Escalar 1-5 elegible" → nota en entrada Escalar.
17. "Actualiza descanso adicional" → nota en §5.1.
18. Multijugador (hasta 3 jugadores) → decisión de alcance de formato.
19. Gestos sociales (navidad / choque de puños) → nota de diseño, no reglamento.

---

## Apéndice A — Dataset

- Archivo de conteos completos por patrón: `/tmp/kodem-audit/mechanics-report.json`.
- Script reproducible: `/tmp/kodem-audit/analyze_mechanics.py` + `/tmp/kodem-audit/find_exotic.py`.
- Total de patrones evaluados: **59** mecánicas + **64** frases exóticas.

## Apéndice B — Cruce con glosario v5.1

Mecánicas **confirmadas documentadas** que no entraron al top por estar bien descritas:
Abismar, Envenenar, Quemar, Curar, Escalar, Descender, Feralizar, Vivificar, Cambiar, Copiar, Desviar, Negar (ataque y efecto), Ocultar, Mostrar, Proteger, Reemplazar, Tomar, Usar, Vincular, Restricción, Poseer (Espectro). Todas referenciadas a p38–p40 del master rulebook.

---

_Fin de auditoría T3._
