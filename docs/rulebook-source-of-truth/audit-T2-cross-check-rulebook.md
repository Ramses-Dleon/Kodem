# Auditoría T2 — Cross-check cartas ↔ rulebook v5.1
_Generado: 2026-04-18 · Sub-agente Logos (Opus)_

## Alcance
- **Rulebook analizado:** `master-rulebook-v5.1.md` (9,712 líneas, p01–p40 + apéndices).
- **Glosario extraído:** 65 entradas formales (p37–p40, sección 9).
- **Cartas analizadas:** 1074 cartas (cards-slim.json), foco en 60 de la muestra diversa.
- **Vocabulario escaneado:** 127 grupos canónicos (tipos, subtipos, energías, verbos, zonas, conceptos).

## Metodología
1. **Fase 1** — Extracción: regex sobre `effect_text + cost_text` de las 1074 cartas, consolidando variantes morfológicas (Feraliza/Feralizar/Feralizado → 1 grupo).
2. **Fase 2** — Cross-check: para cada grupo, medir presencia en (a) cuerpo del rulebook p01–p36 y (b) entradas formales del glosario p37–p40.
3. **Fase 3** — Muestra-60: listar términos problemáticos por carta.

### Clasificación
- ✅ **OK** — entrada formal en glosario §9.
- ⚠️ **WARN_NO_FORMAL** — aparece en cuerpo del rulebook pero NO como entrada de glosario.
- 🚩 **CRIT_MISSING** — aparece en cartas pero NO aparece en el rulebook.
- 🔄 **INCONSISTENT** — dos secciones o usos conflictivos.

## Resumen ejecutivo

| Métrica | Valor |
|---|---|
| Grupos de vocabulario auditados | **120** |
| Grupos con ≥1 carta que los usa | 84 |
| ✅ Bien definidos (en glosario §9) | **45** |
| ⚠️ Usados sin definición formal | **36** |
| 🚩 Ausentes del rulebook | **3** |
| 🔄 Definidos inconsistentemente | **10 casos** (ver sección) |

### Observaciones globales
- **🚩 1 grupo CRÍTICO** aparece en cartas y NO existe en el rulebook: `Consejo` (4 cartas TCEO/TCOO).
- **Todas las 8 energías** (Átlica, Pírica, Gélida, Lítica, Chaáktica, Húumica, Demótica, Feral) se enumeran en `[p06/b05]` y se describen en §2.2.1 pero **ninguna tiene entrada propia en §9**. Cubren 800+ cartas.
- **Todos los subtipos** (Titán, Abisal, Catrín, Kósmico, Equino, Guardián, Resurrecto, Infectado, Magno) aparecen solo como ejemplos en `[p06/b04]` y en un callout en §3; **sin definición formal individual**.
- **Espectro** es un tipo estructural (21 cartas) **sin sección dedicada** (el rulebook tiene §3.1-§3.6 pero no §3.7 Espectro).
- **Lore** existe como `type=Lore` en 5 cartas pero NO aparece en la lista canónica de tipos (`[p06/b03]`: Adendei, Ixim, Rot, Bio, Token, Protector).

---

## 🚩 Términos AUSENTES del rulebook (críticos)

Términos usados por cartas pero que NO aparecen en ninguna sección del rulebook ni en el glosario.

### 🚩 Consejo
- **Cartas que lo usan:** 4 total
  - `TCEO-001` — Morx, Descarga Atlica [ENGLISH]
  - `TCEO-001R` — Morx, Descarga Atlica [ENGLISH]
  - `TCOO-001` — Morx, Descarga Atlica
  - `TCOO-001R` — Morx, Descarga Atlica
- **Hallazgo:** el término `Consejo` aparece en texto de cartas pero el rulebook v5.1 NO lo define ni lo menciona en sección alguna (0 matches en body + 0 en glosario).
- **Sugerencia v5.2:** agregar entrada en glosario §9 o sección dedicada.

### 🚩 Gastar
- **Cartas que lo usan:** 2 total
  - `INMX-001` — Kopit y Jokokan, Libertad
  - `KSPC-001` — Ariam, 1st Anniversary
- **Hallazgo:** el término `Gastar` aparece en texto de cartas pero el rulebook v5.1 NO lo define ni lo menciona en sección alguna (0 matches en body + 0 en glosario).
- **Sugerencia v5.2:** agregar entrada en glosario §9 o sección dedicada.

### 🚩 Puntos de Cyra / Cyra
- **Cartas que lo usan:** 2 total
  - `INMX-001` — Kopit y Jokokan, Libertad
  - `KSPC-001` — Ariam, 1st Anniversary
- **Hallazgo:** el término `Puntos de Cyra` aparece en texto de cartas pero el rulebook v5.1 NO lo define ni lo menciona en sección alguna (0 matches en body + 0 en glosario).
- **Sugerencia v5.2:** agregar entrada en glosario §9 o sección dedicada.

### Notas adicionales sobre 🚩
- **Banca** — término común en TCG (zona de espera). 0 menciones en rulebook, 0 en cartas — no usado, pero es vacío documental si el juego lo necesita en futuro.
- **Reacción** — mecánica de respuesta que en otros TCG se llama así; aparece 0 veces. Kódem usa `Activa-Rápida` y `Pasiva-Rápida` en su lugar.
- **Línea del Destino** y **Descansos Acumulables** — mecánicas mencionadas informalmente en conversación pero NO aparecen en rulebook ni en cartas (0+0).

---

## ⚠️ Términos usados SIN definición formal en glosario

Aparecen en cuerpo del rulebook (secciones, ejemplos, callouts) pero no cuentan con entrada propia en el glosario §9.

### Subgrupo A: ENERGÍAS (8 tipos, 0 entradas en glosario §9)

Las 8 energías aparecen enumeradas en `[p06/b05]` ("Energía: Átlica, Pírica, Gélida, Lítica, Cháaktica, Húumica, Demótica o Feral") y cada una se describe en `§2.2.1 ENERGÍAS` (p06/b08–b17) pero ninguna es entrada del glosario §9 ni tiene definición canónica de reglas (solo flavor/temática).

| Energía | Cartas | Menciones body | Estado |
|---|---|---|---|
| Átlica | 139 | 22 | ⚠️ sólo en §2.2.1 |
| Pírica | 138 | 44 | ⚠️ sólo en §2.2.1 |
| Gélida | 87 | 39 | ⚠️ sólo en §2.2.1 |
| Lítica | 96 | 21 | ⚠️ sólo en §2.2.1 |
| Chaáktica | 106 | 6 | ⚠️ sólo en §2.2.1 |
| Húumica | 106 | 9 | ⚠️ sólo en §2.2.1 |
| Demótica | 32 | 17 | ⚠️ sólo en §2.2.1 |
| Feral | 111 | 31 | ⚠️ sólo en §2.2.1 |

**Sugerencia v5.2:** promover §2.2.1 a entradas de glosario. **Atención:** `Feral` tiene doble función (energía + resultado de Feralizar) — ver sección 🔄.

### Subgrupo B: SUBTIPOS (0 entradas en glosario §9)

Los subtipos aparecen únicamente listados como **ejemplos** en `[p06/b04]` ("Ej. Adendei Equino, Adendei Abisal, Adendei Titán, etc.") y en un callout en §3 que lista "Titán, Abisal, Equino, Lupino, Infectado, Guardián, Kósmico, Catrin". Desincronizaciones:
- **`Lupino` aparece en el callout pero NO en cards.json** (0 cartas).
- **`Magno`, `Resurrecto`, `Hogar`, `Peste`, `Primo` aparecen en cards.json pero NO en ese callout.**

| Subtipo | Cartas | Body mentions | Observación |
|---|---|---|---|
| Titán | 132 | 51 |  |
| Abisal | 89 | 49 |  |
| Catrín | 47 | 21 |  |
| Kósmico | 39 | 34 | mencionado en callout p06 pero sin definición de reglas |
| Equino | 31 | 7 |  |
| Guardián | 25 | 20 |  |
| Resurrecto | 15 | 11 | mencionado en ejemplos p22 pero **no en callout de subtipos** ni en glosario |
| Infectado | 4 | 2 |  |
| Magno | 0 | 6 | solo como nombre de carta (Nok, Frío Magno); **no se define** |
| Primo | 0 | 0 | usado en 1 carta; no documentado |
| Hogar | 0 | 0 | ¿subtipo o concepto?; no se define |
| Peste | 0 | 6 | solo como nombre de carta (Xakros, Peste) |

**Sugerencia v5.2:** dedicar una sección `§3.7 Subtipos` o entradas de glosario para cada subtipo, aclarando interacciones (p.ej. "Adendei no-Abisales" como patrón usado en cartas).

### Subgrupo C: MECÁNICAS y ZONAS (sin entrada en glosario)

| Término | Cartas | Body | Observación |
|---|---|---|---|
| Extinción (zona/estado) | 266 | 128 | ⚠️ CRÍTICO: aparece en 266 cartas; existe **Zona de Extinción** en glosario pero no "Extinción" como concepto/proceso |
| Descansar / Descanso(s) | 209 | 247 | ⚠️ CRÍTICO: 209 cartas; existe §5.1 DESCANSOS pero **no hay entrada formal** "Descanso" en glosario |
| Disponible (Adendei) | 54 | 23 | Se menciona en §5.1 y p08 pero sin entrada formal; concepto central |
| Enviar | 102 | 22 | 102 cartas; común en 'envía a Extinción' pero no se define |
| Regresar | 67 | 12 | 67 cartas; común en 'regresa tu carta Bio al campo' pero no se define |
| Aumentar | 25 | 3 | 25 cartas; 'aumenta el daño' — mencionado en 'Daño por Ataque' pero no definido como verbo |
| Equipar / Desequipar | 147 | 73 | 147 cartas; §3.4 Equipos lo describe pero no hay entrada en §9 |
| Seleccionar / Escoger / Elegir | 35 | 25 | 35 cartas; uso inconsistente de 3 verbos (ver 🔄) |
| Energía (concepto) | 23 | 272 | 23 cartas como concepto; §2.2.1 lo describe pero sin entrada de glosario |
| Puntos de Vida | 15 | 108 | 108 body mentions; solo en `[p06/b02]` Vida Máxima |
| Puntos de Daño | 18 | 25 | 25 body mentions; solo en `[p06/b06]` Daño |
| Fin del Turno | 8 | 6 | 8 cartas; mencionado en §5 pero no es entrada |
| Inicio del Turno / Fase Previa | 0 | 80 | Fase Previa aparece 80 veces en body pero no es entrada |
| Actualizar Descansos | 2 | 34 | 29 cartas + §5.1 ACTUALIZACIÓN DE DESCANSOS pero no entrada |
| Pasar Turno | 0 | 117 | 117 body + flowchart dedicado pero **no es entrada de glosario** |
| Activar / Desactivar | 7 | 4 | 7 cartas; no se define |
| Lore (tipo de carta) | 5 | 5 | 5 cartas con `type=Lore` pero no en lista canónica de tipos |
| Espectro | 28 | 56 | 28 cartas con `type=Espectro`; §9 solo menciona Espectro dentro de Poseer |
| Token | 24 | 88 | 24 cartas; §3.6 Token existe pero no entrada §9 |
| Fuera del Juego | 4 | 2 | 4 cartas; 1 mención en body; no se define |
| Fase | 4 | 122 | 122 body mentions; genérica pero no documentada |
| Contador / Marcador | 0 | 9 | 9 body mentions; Yogg usa 'marca Abismar' — ¿son los mismos contadores? |
| Acumular | 0 | 1 | 0 body / 0 cartas — pero concepto 'Descansos Acumulables' flota |
| Reducir | 1 | 2 | 1 carta; mecánica no documentada |

### Subgrupo D: Verbos adicionales sin entrada en glosario

| Término | Cartas | Body |
|---|---|---|

---

## 🔄 Términos definidos de forma INCONSISTENTE

### 🔄 Feral vs Feralizar vs subtipo Feral
- **§2.2.1** describe Feral como **energía** (`[p06/b17]`).
- **Glosario §9** define `Feralizar: Efecto. Una carta feralizada pierde 1 de sus energías originales y se considera energía Feral`.
- **cards.json** usa `subtype=Feral` en 2 cartas y `energy=Feral` en 103 cartas.
- ❓ **Ambigüedad:** ¿Feral es energía, subtipo, o ambos? El rulebook no distingue. Las cartas con `subtype=Feral` parecen ser Adendei feralizados (post-Feralizar) pero no está documentado.
- **Sugerencia v5.2:** v5.2: clarificar que `Feral` es una energía; una carta con subtipo `Feral` es una carta feralizada.

### 🔄 Mostrar vs Revelar
- **Glosario §9** `Mostrar`: "Acción de Turno. Enseñar la carta al rival. **Mostrar una carta no implica revelar una carta**."
- **Glosario §9** `Revelar`: "Efecto. Acción de Turno. Se considera revelar una carta si se coloca boca arriba en el campo."
- ✅ Distinguidos, pero typo en p39/b03 (`muestrala` sin tilde) y cartas usan `revela` a veces de forma ambigua.
- **Sugerencia v5.2:** Mantener distinción y agregar ejemplos de cartas en cada entrada.

### 🔄 Seleccionar / Escoger / Elegir
- **Cartas** usan 3 verbos indistintamente: `selecciona` (20 cartas), `escoge` (8), `elige` (3).
- **Glosario §9** no define ninguno.
- ❓ ¿Son sinónimos o tienen matices? (ej. ¿'escoger' permite al oponente elegir y 'seleccionar' es el jugador activo?)
- **Sugerencia v5.2:** Uniformar a un solo verbo en v5.2 o definir matices en glosario.

### 🔄 Extinción (zona) vs Extinción (acción)
- **Glosario §9** define `Zona de Extinción` como lugar.
- **Cartas** usan `Extinción` como atajo (266 cartas) y como acción ("enviar a Extinción").
- Typos: 36 cartas escriben `Extincion` sin tilde vs 110 con tilde.
- El verbo `Eliminar` del glosario sí remite: "Una carta es enviada a la Zona de Extinción".
- **Sugerencia v5.2:** Normalizar a `Extinción` (con tilde) y agregar entrada de glosario `Extinción` que remita a `Zona de Extinción` + `Eliminar`.

### 🔄 Adendei-<Energía> — nomenclatura compuesta
- **Cartas** usan: `Adendei-Gélido`, `Adendei-Feral`, `Adendei-Pírico`, `Adendei-Atlico`, `Adendei-Átlico`, `Adendei-Átlíco` (¡doble tilde!), `Adendei-Chaaktico`, `Adendei-Cháaktico`, `Adendei-Lítico`/`Adendei-Litico`, `Adendei-Húumico`/`Adendei-Huumico`.
- **Body rulebook** NO usa esta nomenclatura (0 matches).
- ❌ Misma energía escrita con 2-3 variantes ortográficas (`Atlico`/`Átlico`/`Átlíco`; `Chaaktico`/`Cháaktico`; `Pirico`/`Pírico`).
- **Sugerencia v5.2:** v5.2 debe (a) definir formalmente la nomenclatura `Adendei-<Energía>` o (b) prohibirla y usar `Adendei de energía X`. Errata masiva para normalizar tildes.

### 🔄 Titán / Titan / Catrín / Catrin
- **cards.json** usa `Titán` (127) y `Titan` (1, inconsistencia).
- `Catrín` (40) vs `Catrin` (sin tilde en subtype+texto).
- **Sugerencia v5.2:** Normalizar ortografía: `Titán` y `Catrín` con tilde en todas las cartas. Errata.

### 🔄 Lore — tipo no canónico
- `[p06/b03]` lista tipos canónicos: `Adendei, Ixim, Rot, Bio, Token, Protector`. **Lore NO está.**
- **cards.json** tiene 5 cartas con `type=Lore` (KPRC-047, TCDE-023, etc.).
- **Glosario §9** no menciona Lore.
- 🚩 **Tipo no reconocido por el rulebook.**
- **Sugerencia v5.2:** v5.2 debe agregar Lore a la tabla de tipos o reclasificar esas cartas.

### 🔄 Espectro — tipo estructural sin sección
- **cards.json** tiene 21 cartas con `type=Espectro`.
- **Glosario §9** solo lo menciona **dentro de** la entrada `Poseer`.
- **Body** tiene 47 menciones pero **no hay `§3.x Espectro` dedicada** (existe §3.1–§3.6 pero no §3.7).
- 🚩 Tipo estructural del juego sin sección propia en el rulebook.
- **Sugerencia v5.2:** Agregar `§3.7 Espectro` en v5.2 con mecánica completa y cross-ref a `Poseer`.

### 🔄 Resurrecto — subtipo no listado
- El callout de subtipos en body lista `Titán, Abisal, Equino, Lupino, Infectado, Guardián, Kósmico, Catrin`.
- **cards.json** tiene 13 cartas con `subtype=Resurrecto` (ej. FYTE-022R, FYTE-074, Ariam Resurrecto).
- 🚩 **Resurrecto** es subtipo activo pero no aparece en la lista oficial.
- **Sugerencia v5.2:** Agregar Resurrecto (y Magno) a la lista canónica de subtipos.

### 🔄 Lupino — subtipo inexistente en cartas
- El callout de subtipos menciona `Lupino` pero **0 cartas** tienen `subtype=Lupino`.
- 🔄 **Desincronización rulebook → cartas.**
- **Sugerencia v5.2:** Eliminar `Lupino` del callout si no hay cartas, o publicar las cartas Lupino si existen.

### 🔄 Typos/variantes ortográficas frecuentes

| Forma correcta | Variantes encontradas en cartas |
|---|---|
| Extinción | `Extincion` (36 cartas) |
| Titán | `Titan` (14+ cartas) |
| Catrín | `Catrin` (10+ cartas) |
| Activa-Rápida | `Activa-Rapida` (33 cartas), `Activa Rapida` |
| Pasiva-Rápida | `Pasiva-Rapida` |
| Adendei-Átlico | `Adendei-Atlico`, `Adendei-Átlíco` (doble tilde) |
| Energía | `energia`, `energía` |
| Pírico | `Pirico` |
| Chaáktico | `Cháaktico`, `Chaaktico` |
| Gélido | `Gelido` |
| Lítico | `Litico` |
| Húumico | `Huumico` |
| Zona Principal | `Zona Pricipal` (1 carta) |

**Sugerencia:** linter de cartas + errata en v5.2.

---

## Muestra de 60 cartas — hallazgos por carta

Términos problemáticos por carta (⚠️ sin definición formal; 🚩 ausente del rulebook):

- **`INMX-001` — Kopit y Jokokan, Libertad** _(Adendei, Gelida-Litica)_
  - Efecto: _"Activa: Cyra gasta 6 puntos a un Adendei aliado."_
  - 🚩 Gastar, Puntos de Cyra / Cyra · ⚠️ Gélida (energía), Lítica (energía)
- **`EXPO-0002` — Xilan, Sacrificio** _(Adendei/Catrín, Huumica)_
  - Efecto: _"Activa: Si tienes una carta Bio en Extincion, envia esta carta a Extincion y regresa tu carta Bio al campo."_
  - ⚠️ Extinción (zona/estado), Regresar, Enviar, Catrín (subtipo), Húumica (energía)
- **`FYTE-004` — Yolte, Piedra Ceremonial** _(Rot)_
  - Efecto: _"Activa-Rapida: Si el Adendei equipado sera dañado por 1 ataque o efecto, reduce el daño recibido en 2 puntos y actualiza"_
  - ⚠️ Descansar / Descanso(s), Equipar / Desequipar
- **`FYTE-007U` — Tetrada Inferna** _(Adendei/Equino, Feral)_
  - Efecto: _"Activa: Daña 3 ptos. a 1 Adendei rival y 3 ptos. a 1 carta no Adendei revelada en Zona Principal."_
  - ⚠️ Equino (subtipo), Extinción (zona/estado), Feral (subtipo / energía)
- **`EXPN-001` — Expulsion de Energia I.C.A.R.O.** _(Rot)_
  - Efecto: _"Activa: Si la carta equipada ataca, podrá dañar adicionalmente a una carta rival con el mismo daño que la carta equipada"_
  - ⚠️ Equipar / Desequipar
- **`EXPO-0003` — Kuhna, Resguardo** _(Adendei, Huumica)_
  - Efecto: _"Pasiva: Si un Adendei es equipado con un Ixim o Rot boca arriba, cura 1 punto a ese Adendei."_
  - ⚠️ Equipar / Desequipar, Húumica (energía)
- **`TCEO-052` — Pyrodon, Aura Pirica [ENGLISH]** _(Adendei/Kósmico, Pirica)_
  - Efecto: _"Activa: Si todos los Adendei rivales tienen 5 o mas puntos de vida, quema a todos los Adendei rivales."_
  - ⚠️ Puntos de Vida, Kósmico (subtipo), Pírica (energía)
- **`TCOO-079` — Muz, Deidad Huumica** _(Rava, Huumica)_
  - Efecto: _"Aumenta 1 pto. de daño a los Adendei-Húumico. Si 1 Adendei-Húumico aliado atacó, cura 1 pto. a 1 Adendei-Húumico aliado."_
  - ⚠️ Húumica (energía), Extinción (zona/estado), Aumentar, Puntos de Daño
- **`SRMR-001` — Nánuk, Fiereza Kósmica** _(Adendei/Kósmico, Gelida)_
  - Efecto: _"Esta carta no puede recibir marcas."_
  - ⚠️ Kósmico (subtipo), Gélida (energía)
- **`TCOO-005R` — Escamas de Lava** _(Rot)_
  - Efecto: _"Quema 1 carta y daña 1 pto. a todas las cartas rivales quemadas. El Adendei equipado puede atacar con 1 pto. de daño adi"_
  - ⚠️ Equipar / Desequipar, Puntos de Daño
- **`TCOO-021R` — Rot Igneo** _(Rot)_
  - Efecto: _"Activa: Quema 1 carta y regresa 1 equipo en el campo a la Zona de Equipo."_
  - ⚠️ Regresar
- **`PRKD-2022-05` — Templo Yokoa** _(Bio)_
  - Efecto: _"Pasiva: Si 1 Protector es vinculado, daña 1 punto a 1 carta rival."_
  - ✅ sin flags
- **`FYTE-017` — Tezcayoh, Espejo Nocturno** _(Rot)_
  - Efecto: _"Activa: El Adendei equipado daña 1 pto. adicional a 1 carta en Zona Principal por cada Adendei en el campo de su misma e"_
  - ⚠️ Descansar / Descanso(s), Equipar / Desequipar, Energía (concepto)
- **`TCOO-060` — Zaren, Union** _(Protector)_
  - Efecto: _"Usa 1 de los siguientes efectos. - Regresa todas las cartas en Zona Principal a su Zona Principal original. - Si tu riva"_
  - ⚠️ Token, Descansar / Descanso(s), Regresar, Energía (concepto)
- **`KPRC-031` — Daku, Mandibula Toxica** _(Adendei/Titán, Chaaktica)_
  - Efecto: _"Activa: Daña 1 punto a todas las cartas envenenadas."_
  - ⚠️ Titán (subtipo), Chaáktica (energía)
- **`TRWA-022` — Armaduras I.C.A.R.O. [ENGLISH]** _(Rot)_
  - Efecto: _"Los Adendei rivales reciben 1 descanso. Esta carta debe ser enviada a Extinción para usar su Activa."_
  - ⚠️ Extinción (zona/estado), Descansar / Descanso(s)
- **`DOOC-016` — Ruinas Abisales** _(Bio)_
  - Efecto: _"Los Adendei no-Abisales rivales no pueden atacar en el turno en el que son revelados."_
  - ⚠️ Abisal (subtipo), Extinción (zona/estado)
- **`TCOO-006R` — Cascada de Lava** _(Rot)_
  - Efecto: _"Si 1 Adendei-Pírico aliado es atacado, quema a 1 Adendei rival."_
  - ⚠️ Pírica (energía), Equipar / Desequipar
- **`TCEO-062` — Migracion Defensiva [ENGLISH]** _(Bio)_
  - Efecto: _"Si 1 Adendei aliado es enviado a Extinción, puedes cambiar a tu Protector por tu Protector suplente."_
  - ⚠️ Extinción (zona/estado)
- **`TCEO-020R` — Eixen, Ardiente Venganza [ENGLISH]** _(Protector)_
  - Efecto: _"Los Adendei-Pírico no pueden ser enviados a Extinción hasta que esta carta esté disponible."_
  - ⚠️ Pírica (energía), Extinción (zona/estado), Disponible (Adendei)
- **`TCEO-061` — Caldera Submarina [ENGLISH]** _(Bio)_
  - Efecto: _"Pasiva: Si 1 Adendei-Pirico es revelado, quema 1 Adendei rival."_
  - ⚠️ Pírica (energía)
- **`IDRMP-019` — Escudo Cristalino** _(Rot)_
  - Efecto: _"Activa: Si la carta equipada ataca, la carta atacada tiene su pasiva negada hasta el final del turno."_
  - ⚠️ Equipar / Desequipar
- **`TCOO-040` — Nepthis, Entre las Sombras** _(Adendei, Atlica)_
  - Efecto: _"Esta carta siempre estara abismada."_
  - ⚠️ Átlica (energía)
- **`TCDE-006` — Turix, Aleteo Gelido** _(Adendei/Titán, Gelida)_
  - Efecto: _"Activa: Actualiza 1 descanso de todas tus cartas."_
  - ⚠️ Descansar / Descanso(s), Titán (subtipo), Gélida (energía)
- **`KPRC-057` — Nanuk, Ursupacion** _(Adendei/Kósmico, Gelida)_
  - Efecto: _"Pasiva: Si esta carta es cambiada de lugar en el campo, daña 1 punto a una carta rival en descanso."_
  - ⚠️ Descansar / Descanso(s), Kósmico (subtipo), Gélida (energía)
- **`TCEO-003R` — Ojos de Nirge [ENGLISH]** _(Protector)_
  - Efecto: _"Activa: Puedes copiar y usar la misma Activa y Costo de cualquier Adendei en el campo."_
  - ✅ sin flags
- **`PKMR-001` — Terna Tiniebla** _(Adendei/Equino, Feral)_
  - Efecto: _"Pasiva: Esta carta daña 1 punto adicional por cada Adendei Equino en el campo."_
  - ⚠️ Equino (subtipo), Feral (subtipo / energía)
- **`LGRO-030` — Balim, Anochecer** _(Adendei, Chaaktica)_
  - Efecto: _"Activa Rapida: Tu rival no puede activar equipos durante la Fase de Batalla."_
  - ⚠️ Activar / Desactivar, Fase, Chaáktica (energía)
- **`KPRC-060` — Ulmor, Tinta Cegadora** _(Adendei, Atlica)_
  - Efecto: _"Si 1 carta es revelada, puedes abismar 1 Adendei de hasta 2 jugadores rivales."_
  - ⚠️ Descansar / Descanso(s), Átlica (energía)
- **`TCDE-010` — Hifa Madre** _(Bio)_
  - Efecto: _"Selecciona una carta aliada y una carta rival. Las cartas seleccionadas no podrán atacar hasta el final de tu siguiente "_
  - ⚠️ Descansar / Descanso(s), Seleccionar / Escoger / Elegir, Disponible (Adendei)
- **`IDRMA-005` — Curacion Vetegal** _(Ixim)_
  - Efecto: _"Pasiva: Cura 1 punto a un Adendei aliado equipado con un Ixim"_
  - ⚠️ Equipar / Desequipar
- **`TCEO-001S` — Virste, Reseteo [ENGLISH]** _(Adendei/Titán, Atlica)_
  - Efecto: _"Activa: Regresa las estadisticas de todas las cartas en el campo a su valor original."_
  - ⚠️ Regresar, Titán (subtipo), Átlica (energía)
- **`IDRMA-013` — Navi Dequak** _(Adendei, Atlica)_
  - Efecto: _"Activa: Si esta carta ataca, se cura 1 punto. Pasiva: Si esta carta fue atacada, escala 1 punto."_
  - ⚠️ Átlica (energía)
- **`TCDE-011` — Union Arborea** _(Ixim)_
  - Efecto: _"El Adendei equipado puede vincularse con el Protector rival."_
  - ⚠️ Equipar / Desequipar
- **`KPRC-029` — Nirge, Los Floridos** _(Protector)_
  - Efecto: _"Activa: Regresa 1 Ixim de la Zona Principal a la Zona de Equipo y escala 1 punto a 1 carta aliada."_
  - ⚠️ Regresar
- **`TRWA-037` — Amanecer [ENGLISH]** _(Ixim)_
  - Efecto: _"Pasiva: Selecciona 1 Adendei en el campo y cambia su energia hasta el final del turno rival."_
  - ⚠️ Seleccionar / Escoger / Elegir, Energía (concepto)
- **`KPRC-020` — Jane Dalgood, Capitana** _(Protector)_
  - Efecto: _"TBA"_
  - ✅ sin flags
- **`TCEO-071` — Atalkh, Desde las Profundidades [ENGLISH]** _(Adendei/Abisal, Demotica)_
  - Efecto: _"Coloca cualquier Adendei Abisal de tu Mazo o tu Extinción en lugar de esta carta."_
  - ⚠️ Abisal (subtipo), Extinción (zona/estado), Enviar, Demótica (energía)
- **`TCOO-013` — Xelbalan, Reino de Muerte** _(Bio)_
  - Efecto: _"Pasiva: Los Adendei aliados con 1 punto o menos de daño; aumentan 1 punto de daño al atacar y, si tienen 0 descansos, re"_
  - ⚠️ Descansar / Descanso(s)
- **`FYTE-061` — Yimsah y Xacros, Inanicion** _(Adendei/Equino, Feral)_
  - Efecto: _"Activa: La carta atacada recibe 1 descanso. Pasiva: Si esta carta es enviada a Extinción, daña 2 ptos. a 1 carta rival."_
  - ⚠️ Extinción (zona/estado), Descansar / Descanso(s), Equino (subtipo), Feral (subtipo / energía)
- **`CAMP-0013UV` — Zilit, Luz Liquida** _(Adendei/Titán, Huumica)_
  - Efecto: _"Si esta carta es curada, esta carta escala 1 pto."_
  - ⚠️ Titán (subtipo), Húumica (energía)
- **`KPRC-004` — Petalos de Fuego** _(Ixim)_
  - Efecto: _"Si la carta equipada atacó, cura 1 pto. a un Adendei aliado. Quita todas las marcas de tu Zona Principal."_
  - ⚠️ Equipar / Desequipar
- **`KPRC-054` — Vesta Ignia, Flor de Fuego** _(Ixim)_
  - Efecto: _"Si esta carta es revelada, revela (coloca boca arriba) y quema 1 carta en Zona Principal de hasta 3 jugadores rivales."_
  - ✅ sin flags
- **`LGRO-067` — Yanzi, Precision** _(Protector)_
  - Efecto: _"Activa: El Adendei vinculado no recibe descanso al vincularse, y podra atacar con 6 puntos a un Adendei rival en tu sigu"_
  - ⚠️ Descansar / Descanso(s)
- **`TCDE-012` — Bomba de Clorofila** _(Ixim)_
  - Efecto: _"Pasiva: Si un ataque fue negado, puedes mostrar esta carta desde la Zona de Equipo y dañar 3 ptos. a los Adendei equipad"_
  - ⚠️ Extinción (zona/estado), Enviar, Equipar / Desequipar
- **`TRWA-007U` — Kuyovi, Salto Electrico [ENGLISH]** _(Adendei, Demotica)_
  - Efecto: _"Activa: Cambia de lugar esta carta con cualquier carta en tu Zona Principal. Si esta carta ataco a una carta frente a el"_
  - ⚠️ Descansar / Descanso(s), Demótica (energía)
- **`KPRC-011` — Kiivi, Vibracion** _(Adendei, Huumica)_
  - Efecto: _"Pasiva-Rápida: Si esta carta es revelada, regresa todas las cartas en Zona Principal a su Zona Principal original. Pasiv"_
  - ⚠️ Regresar, Húumica (energía)
- **`TRWA-005R` — Boras, Gigante Polar [ENGLISH]** _(Adendei/Kósmico, Gelida)_
  - Efecto: _"Pasiva: Si esta carta fue atacada mientras esta en descanso, envia a Extincion al Adendei atacante."_
  - ⚠️ Extinción (zona/estado), Descansar / Descanso(s), Enviar, Kósmico (subtipo), Gélida (energía)
- **`RMR-007` — Adasí, Amparo Vegetal** _(Adendei, Litica)_
  - Efecto: _"Si una carta es equipada, esta carta escala 1 pto."_
  - ⚠️ Equipar / Desequipar, Lítica (energía)
- **`RAMI-024` — Estocada Escarlata** _(Ixim)_
  - Efecto: _"Pasiva: Si no hay otras cartas equipadas con Ixim en el campo, la carta equipada puede atacar al Protector rival."_
  - ⚠️ Equipar / Desequipar
- **`MLBU-002S` — Esfera Morfeica, Leyendas** _(Bio)_
  - Efecto: _"Si el rival declara 1 efecto de 1 carta fuera de la Zona Principal, da 2 descansos a 1 carta en Zona Principal."_
  - ⚠️ Descansar / Descanso(s)
- **`TRWA-049` — Abisales, Control [ENGLISH]** _(Adendei/Abisal, Chaaktica)_
  - Efecto: _"Activa Rapida: Regresa un equipo rival a la Zona de Equipo."_
  - ⚠️ Regresar, Abisal (subtipo), Chaáktica (energía)
- **`KPRC-017` — Kap, Lluvia de Ranas** _(Adendei, Atlica)_
  - Efecto: _"Pasiva: Si tomas esta carta de tu Mazo, puedes revelarla y curar 3 puntos a tu Protector."_
  - ⚠️ Átlica (energía)
- **`DOOC-001` — Draxes, Planeo Pirico** _(Adendei/Titán, Pirica)_
  - Efecto: _"Si esta carta es revelada, quema 1 Adendei rival o daña 1 pto. a 1 carta quemada. Activa: Puedes ocultar (colocar boca a"_
  - ⚠️ Titán (subtipo), Pírica (energía)
- **`IDRMG-013` — Macit, Semilla Dorada** _(Adendei/Guardián, Feral)_
  - Efecto: _"Pasiva: Si un Adendei es colocado en el campo mientras esta carta esta revelada, ese Adendei no puede ser atacado en el "_
  - ⚠️ Guardián (subtipo), Feral (subtipo / energía)
- **`IDRMP-010` — La Cuspide** _(Bio)_
  - Efecto: _"Pasiva: Al final de cada turno puedes dañar 1 punto a todos los Adendei equipados."_
  - ⚠️ Equipar / Desequipar
- **`FYTE-010S` — Flora Espectral** _(Espectro)_
  - Efecto: _"En Previa puedes equipar 1 Ixim o Rot de tu Zona de Equipo o Extinción a 1 Adendei aliado."_
  - ⚠️ Extinción (zona/estado), Equipar / Desequipar, Espectro
- **`RAMI-022` — Petrologia Emergente** _(Rot)_
  - Efecto: _"Activa Rapida: Si la carta equipada es atacada, puedes enviar esta carta a Extincion y desvia el daño que esa carta reci"_
  - ⚠️ Extinción (zona/estado), Enviar, Equipar / Desequipar
- **`KPRC-027` — Cementerio de Dinosaurios** _(Bio)_
  - Efecto: _"Pasiva: Si tu Protector está disponible y esta carta está en Extinción, puedes vivificar esta carta a tu Zona de Bio."_
  - ⚠️ Titán (subtipo), Extinción (zona/estado), Descansar / Descanso(s), Enviar, Disponible (Adendei)
- **`TRWA-024` — Expulsion de Energia I.C.A.R.O. [ENGLISH]** _(Rot)_
  - Efecto: _"Activa: Si la carta equipada ataca, podrá dañar adicionalmente a una carta rival con el mismo daño que la carta equipada"_
  - ⚠️ Equipar / Desequipar

---

## Recomendaciones priorizadas para v5.2

### P0 — Bloqueantes (agregar al glosario)
1. **Descanso / Descansos** — término estructural (§5.1 existe pero no hay entrada)
2. **Extinción** como concepto (no solo `Zona de Extinción`)
3. **Disponible** (estado del Adendei, central)
4. **Espectro** (tipo de carta; además crear `§3.7 Espectro`)
5. **Lore** (si se mantiene como tipo oficial) o reclasificar esas 5 cartas
6. **Consejo** (usado en cartas TCEO/TCOO pero no documentado)

### P1 — Mecánicas centrales (verbos sin definición)
- Enviar, Regresar, Aumentar, Reducir, Acumular, Activar/Desactivar, Equipar/Desequipar, Seleccionar/Escoger/Elegir
- Pasar Turno (ya tiene flowchart, promoverlo a entrada)
- Actualizar Descansos (ya tiene sección, promover a entrada)
- Puntos de Vida / Puntos de Daño

### P2 — Subtipos y energías
- Crear `§3.7 Subtipos` o entradas en §9 para: Titán, Abisal, Catrín, Kósmico, Equino, Guardián, Resurrecto, Infectado, Magno, Feral (subtipo)
- Promover §2.2.1 Energías a entradas individuales en §9 con mecánica de reglas (no solo tema)
- Decidir si Lupino se mantiene (no hay cartas) o se elimina
- Aclarar Hogar, Peste, Primo (casos aislados)

### P3 — Normalización ortográfica (errata)
- Normalizar tildes: Titán/Catrín/Pírica/Chaáktica/Átlica/Gélida/Lítica/Húumica
- Normalizar nomenclatura `Adendei-<Energía>` (actualmente 4 variantes ortográficas)
- Estandarizar `Activa-Rápida` y `Pasiva-Rápida` con guión (no espacio, no sin tilde)
- Errata `Zona Pricipal` → `Zona Principal`

### P4 — Coherencia rulebook ↔ cartas
- Añadir `§3.7 Espectro`
- Documentar nomenclatura `Adendei-<Energía>` o prohibirla
- Aclarar doble rol de Feral (energía + estado post-feralización)
- Añadir cartas Lupino o eliminar del callout

---

## Apéndice: conteo completo por grupo (127 grupos)

| Grupo | En glosario | Body N | Cartas | Clase |
|---|---|---|---|---|
| Consejo | — | 0 | 4 | 🚩 |
| Gastar | — | 0 | 2 | 🚩 |
| Puntos de Cyra / Cyra | — | 0 | 2 | 🚩 |
| Primo (subtipo) | — | 0 | 0 | 🚩 |
| Hogar | — | 0 | 0 | 🚩 |
| Adendei-<Energía> (nomenclatura compuesta) | — | 0 | 0 | 🚩 |
| Zona de Ixim (referencia) | — | 0 | 0 | 🚩 |
| Banca | — | 0 | 0 | 🚩 |
| Reacción | — | 0 | 0 | 🚩 |
| Descansos Acumulables | — | 0 | 0 | 🚩 |
| Restablecer | — | 0 | 0 | 🚩 |
| Sacrificar | — | 0 | 0 | 🚩 |
| Descartar | — | 0 | 0 | 🚩 |
| Evolucionar / Evolución | — | 0 | 0 | 🚩 |
| Robar | — | 0 | 0 | 🚩 |
| Barajar | — | 0 | 0 | 🚩 |
| Buscar | — | 0 | 0 | 🚩 |
| Mirar | — | 0 | 0 | 🚩 |
| Mover | — | 0 | 0 | 🚩 |
| Ganar / Perder | — | 0 | 0 | 🚩 |
| Duplicar | — | 0 | 0 | 🚩 |
| Destruir | — | 0 | 0 | 🚩 |
| Extinguir | — | 0 | 0 | 🚩 |
| Rotar | — | 0 | 0 | 🚩 |
| Línea del Destino | — | 0 | 0 | 🚩 |
| Nivel | — | 0 | 0 | 🚩 |
| Acción de Turno | — | 0 | 0 | 🚩 |
| Extinción (zona/estado) | — | 128 | 266 | ⚠️ |
| Descansar / Descanso(s) | — | 247 | 209 | ⚠️ |
| Equipar / Desequipar | — | 73 | 147 | ⚠️ |
| Átlica (energía) | — | 22 | 139 | ⚠️ |
| Pírica (energía) | — | 44 | 138 | ⚠️ |
| Titán (subtipo) | — | 51 | 132 | ⚠️ |
| Feral (subtipo / energía) | — | 31 | 111 | ⚠️ |
| Húumica (energía) | — | 9 | 106 | ⚠️ |
| Chaáktica (energía) | — | 6 | 106 | ⚠️ |
| Enviar | — | 22 | 102 | ⚠️ |
| Lítica (energía) | — | 21 | 96 | ⚠️ |
| Abisal (subtipo) | — | 49 | 89 | ⚠️ |
| Gélida (energía) | — | 39 | 87 | ⚠️ |
| Regresar | — | 12 | 67 | ⚠️ |
| Disponible (Adendei) | — | 23 | 54 | ⚠️ |
| Catrín (subtipo) | — | 21 | 47 | ⚠️ |
| Kósmico (subtipo) | — | 34 | 39 | ⚠️ |
| Seleccionar / Escoger / Elegir | — | 25 | 35 | ⚠️ |
| Demótica (energía) | — | 17 | 32 | ⚠️ |
| Equino (subtipo) | — | 7 | 31 | ⚠️ |
| Espectro | — | 56 | 28 | ⚠️ |
| Guardián (subtipo) | — | 20 | 25 | ⚠️ |
| Aumentar | — | 3 | 25 | ⚠️ |
| Token | — | 88 | 24 | ⚠️ |
| Energía (concepto) | — | 272 | 23 | ⚠️ |
| Puntos de Daño | — | 25 | 18 | ⚠️ |
| Resurrecto (subtipo) | — | 11 | 15 | ⚠️ |
| Puntos de Vida | — | 108 | 15 | ⚠️ |
| Fin del Turno | — | 6 | 8 | ⚠️ |
| Activar / Desactivar | — | 4 | 7 | ⚠️ |
| Lore (tipo de carta) | — | 5 | 5 | ⚠️ |
| Infectado (subtipo) | — | 2 | 4 | ⚠️ |
| Fuera del Juego | — | 2 | 4 | ⚠️ |
| Fase | — | 122 | 4 | ⚠️ |
| Actualizar Descansos | — | 34 | 2 | ⚠️ |
| Reducir | — | 2 | 1 | ⚠️ |
| Magno (subtipo) | — | 6 | 0 | ⚠️ |
| Peste | — | 6 | 0 | ⚠️ |
| Acumular | — | 1 | 0 | ⚠️ |
| Pasar Turno | — | 117 | 0 | ⚠️ |
| Inicio del Turno / Fase Previa | — | 80 | 0 | ⚠️ |
| Contador / Marcador | — | 9 | 0 | ⚠️ |
| Adendei | ✅ | 440 | 952 | ✅ |
| Pasiva | ✅ | 122 | 470 | ✅ |
| Activa | ✅ | 192 | 388 | ✅ |
| Carta Rival / Rival | ✅ | 137 | 386 | ✅ |
| Carta Aliada / Aliado | ✅ | 86 | 355 | ✅ |
| Atacar / Ataque | ✅ | 251 | 338 | ✅ |
| Campo | ✅ | 68 | 213 | ✅ |
| Zona Principal (ZP) | ✅ | 73 | 198 | ✅ |
| Usar | ✅ | 2 | 192 | ✅ |
| Protector | ✅ | 169 | 181 | ✅ |
| Rot | ✅ | 82 | 179 | ✅ |
| Curar | ✅ | 43 | 175 | ✅ |
| Revelar | ✅ | 73 | 114 | ✅ |
| Ixim | ✅ | 61 | 100 | ✅ |
| Mazo / Mazo Principal / Mazo General | ✅ | 97 | 85 | ✅ |
| Bio | ✅ | 71 | 83 | ✅ |
| Activa-Rápida | ✅ | 61 | 79 | ✅ |
| Rava | ✅ | 56 | 70 | ✅ |
| Escalar | ✅ | 43 | 59 | ✅ |
| Zona de Equipo(s) | ✅ | 28 | 54 | ✅ |
| Colocar (en campo) | ✅ | 32 | 54 | ✅ |
| Proteger | ✅ | 22 | 52 | ✅ |
| Negar | ✅ | 18 | 49 | ✅ |
| Cambiar (de zona) | ✅ | 15 | 38 | ✅ |
| Costo | ✅ | 394 | 38 | ✅ |
| Tomar | ✅ | 11 | 30 | ✅ |
| Abismar | ✅ | 16 | 28 | ✅ |
| Vivificar | ✅ | 17 | 21 | ✅ |
| Copiar | ✅ | 14 | 19 | ✅ |
| Marca | ✅ | 14 | 18 | ✅ |
| Desviar | ✅ | 4 | 17 | ✅ |
| Descender | ✅ | 38 | 16 | ✅ |
| Envenenar | ✅ | 15 | 14 | ✅ |
| Quemar | ✅ | 14 | 14 | ✅ |
| Pasiva-Rápida | ✅ | 22 | 13 | ✅ |
| Ocultar | ✅ | 44 | 13 | ✅ |
| Mostrar | ✅ | 99 | 12 | ✅ |
| Zona de Extinción | ✅ | 4 | 9 | ✅ |
| Vincular / Vínculo Odémico | ✅ | 51 | 8 | ✅ |
| Feralizar | ✅ | 15 | 6 | ✅ |
| Reemplazar / Reemplazo | ✅ | 52 | 4 | ✅ |
| Zona de Protector | ✅ | 0 | 2 | ✅ |
| Poseer | ✅ | 6 | 2 | ✅ |
| Daño por Ataque | ✅ | 8 | 2 | ✅ |
| Zona de Bio | ✅ | 3 | 1 | ✅ |
| Eliminar | ✅ | 1 | 0 | ✅ |
| Pagar | ✅ | 11 | 0 | ✅ |
| Daño por costo | ✅ | 3 | 0 | ✅ |
| Daño por efecto | ✅ | 3 | 0 | ✅ |
| Daño por marca | ✅ | 2 | 0 | ✅ |
| Ecosistema | ✅ | 13 | 0 | ✅ |

---

_Fin del reporte T2 — Logos._