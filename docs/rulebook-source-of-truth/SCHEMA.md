# Schema de Frontmatter — Kódem TCG v5.1 Rulings & Rulebook

**Versión:** 1.0
**Fecha:** 2026-04-22
**Propósito:** Estandarizar metadata YAML al inicio de cada ruling y cada página del rulebook para que el sitio web y cualquier parser consuman datos estructurados en lugar de adivinar por regex/emoji.

**Principio:** el texto narrativo humano queda intacto. El frontmatter se añade al inicio de cada bloque.

---

## 1. Frontmatter de Rulings

Cada ruling (bloque `## Xnn. Título`) debe empezar con un bloque YAML entre `---` y `---`, seguido del título y texto narrativo existente.

### 1.1 Ejemplo canónico

```yaml
---
id: D47
display_id: D47
canonical_id: D47
version: 1
parent: null

type: duda
status: resuelto
status_method: derivacion

date_created: 2026-04-22
date_revised: null

authority:
  role: logos-derivado
  name: Logos
  validated_by: []

tags: [espectros, posesion, tlahuelpuchi, multijugador]

cards_explicit:
  - folio: FYTE-007R
    name: "Tlahuelpuchi, Invocación Espectral"
    role: carta-central
  - folio: FYTE-003K
    name: "Ariam, Axoloespectro"
    role: ejemplo

rulebook_refs:
  - p14/b16/b3
  - p20/b10

derived_from: [D36, D37, D21]
supersedes: []
related: [D46, D51]

---
## D47. Tlahuelpuchi + múltiples Espectros en misma Fase Previa

**Fecha:** 2026-04-22 17:18 UTC
**Status:** ✅ RESUELTA por derivación (Logos, con base en rulings de autoridad existentes)

[texto narrativo humano sigue igual]
```

### 1.2 Campos obligatorios

| Campo | Tipo | Notas |
|:---|:---|:---|
| `id` | string | ID técnico único. Append-only. Ej: `D47`, `M12`, `L-5`, `E8` |
| `display_id` | string | Cómo se muestra al humano. Puede ser igual a `id` o variantes históricas (`D22 v3`, `D22b`) |
| `canonical_id` | string | ID colapsado para agrupación. `D22 v3` → `canonical_id: D22`. Permite al sitio agrupar variantes sin romper links históricos |
| `version` | int | Número de versión. Empieza en `1`. Revisión mayor → incrementa |
| `type` | enum | `duda` \| `meta-regla` \| `aclaracion` \| `ruling-carta` \| `errata` \| `faq` |
| `status` | enum | `resuelto` \| `tentativo` \| `abierto` \| `pendiente-juez` \| `descartado` \| `residual` |
| `status_method` | enum | `autor` \| `juez` \| `comunidad` \| `derivacion` \| `evidencia-textual` \| `no-aplicable` |
| `date_created` | date | ISO 8601 `YYYY-MM-DD` |
| `authority` | object | Ver §1.3 |
| `tags` | array<string> | Del vocabulario cerrado §3 |
| `cards_explicit` | array<object> | Cartas que aplican directamente. NO fuzzy matching. Vacío si no aplica. |
| `rulebook_refs` | array<string> | Anchors `pXX/bYY` o `pXX/bYY/bZZ` que fundamentan el ruling |
| `derived_from` | array<string> | IDs de rulings de los que deriva |
| `supersedes` | array<string> | IDs de rulings que este reemplaza (ej. `D22 v3` supersedes `D22 v2`) |
| `related` | array<string> | IDs de rulings temáticamente conectados pero no derivados |

### 1.3 Campos opcionales

| Campo | Tipo | Notas |
|:---|:---|:---|
| `parent` | string \| null | Para variantes (`D22b` tiene `parent: D22`). Null si es raíz |
| `date_revised` | date \| null | Última revisión sustantiva |

### 1.4 `authority`

```yaml
authority:
  role: juez          # autor | juez | comunidad | logos-derivado | evidencia-textual
  name: Ambir         # Nombre específico
  validated_by:       # Lista de validadores adicionales (puede estar vacía)
    - Ramsés
```

**Roles canónicos:**

- `autor` — Ramsés D'León (diseño/autor del juego)
- `juez` — Jueces oficiales (Ambir, Aldo)
- `comunidad` — Ruling por ID de comunidad verificado (ej. `u_62a2ebfd`)
- `logos-derivado` — Ruling cerrado por Logos componiendo reglas/rulings previos, sin decisión nueva. Requiere `validated_by: []` hasta que un juez/autor lo valide
- `evidencia-textual` — Cerrado por cita directa del rulebook, sin intervención humana

**`validated_by`:** personas/entidades que han avalado el ruling posteriormente. Ej: un ruling derivado por Logos, avalado después por Ambir: `validated_by: [Ambir]`.

### 1.5 `cards_explicit`

```yaml
cards_explicit:
  - folio: FYTE-007R
    name: "Tlahuelpuchi, Invocación Espectral"
    role: carta-central   # carta-central | ejemplo | contraejemplo | referencia
  - folio: LGRO-007
    name: "Consejo de Hielo"
    role: referencia
```

**Roles de carta:**

- `carta-central` — carta que genera la duda/ruling. Usualmente 1, excepcionalmente 2-3.
- `ejemplo` — carta usada para ilustrar la aplicación correcta.
- `contraejemplo` — carta donde el ruling explícitamente NO aplica.
- `referencia` — carta mencionada tangencialmente por interacción (sinergia, lockout).

**Regla dura:** nunca autogenerar `cards_explicit` por keyword/emoji-tag. Siempre declaración manual.

### 1.6 `rulebook_refs`

Formato: `pXX` (página), `pXX/bYY` (bloque), `pXX/bYY/bZZ` (sub-bloque), `pXX/fig-NN` (figura).

Ejemplos válidos:
- `p14/b16/b3` — Página 14, bloque 16, sub-bullet 3
- `p20/b10` — Página 20, bloque 10 (meta-regla)
- `p25/fig-02` — Figura 2 de página 25

---

## 2. Frontmatter de Páginas del Rulebook

Cada página (`### Página NN` o equivalente) lleva también frontmatter al inicio.

### 2.1 Ejemplo

```yaml
---
page: 14
section: "§3.5 Espectros"
chapter: 3

blocks:
  - id: p14/b11
  - id: p14/b16
    sub_blocks: [b1, b2, b3, b4, b5, b6]
  - id: p14/fig-01
    figure_path: figures/p14-fig-01.png

canonical_rulings:
  - D11
  - D20
  - D21
  - D22
  - D36
  - D47

related_cards:
  - folio: FYTE-003K
    name: "Ariam, Axoloespectro"
    reason: ejemplo-canonico
  - folio: FYTE-007R
    name: "Tlahuelpuchi"
    reason: carta-con-regla-propia

related_cards_type:
  - subtipo: Espectro
    note: "todas las cartas con subtipo Espectro aplican las reglas de esta página"

cross_refs_outbound:
  - "§6.4 Tipos de daño"
  - "§6.7 Efectos"

cross_refs_inbound:
  - from: p25/b06
    note: "Efectos post-extinción referencia estas reglas"
---
### Página 14. §3.5 Espectros

[texto de la página intacto]
```

### 2.2 Campos

| Campo | Tipo | Notas |
|:---|:---|:---|
| `page` | int | Número de página (1-40) |
| `section` | string | Sección oficial del rulebook (ej. `"§3.5 Espectros"`) |
| `chapter` | int | Capítulo (1-9) |
| `blocks` | array<object> | Bloques declarados en la página con sus sub-bloques |
| `canonical_rulings` | array<string> | IDs de rulings aplicables — reemplaza la sección `⚡ Rulings aplicables` como dato consultable por máquina |
| `related_cards` | array<object> | Cartas específicas que se mencionan o ilustran — NO fuzzy match |
| `related_cards_type` | array<object> | Cartas aplicables por **subtipo/tipo/mecánica**, no folio. Ej: "todas las Espectros" |
| `cross_refs_outbound` | array<string> | A dónde apunta esta página (corregido — sin referencias rotas) |
| `cross_refs_inbound` | array<object> | Qué páginas apuntan a esta |

### 2.3 `related_cards_type`

Esto resuelve el caso *"esta página aplica a todas las Espectros pero no quiero enumerar 28 folios"*:

```yaml
related_cards_type:
  - subtipo: Espectro
    note: "28 cartas FYTE"
  - tipo: Adendei
    condition: "con vida máxima ≥ 4"
```

El sitio puede resolver esto consultando `cards.json` por subtipo/tipo y aplicando la condición.

---

## 3. Vocabulario cerrado de tags

Tags permitidos para `tags:` en rulings. Lista controlada — agregar requiere edición de este schema.

### 3.1 Por mecánica

- `ataques`
- `efectos`
- `pasivas`
- `activas`
- `costos`
- `descansos`
- `vida`
- `energias`
- `subtipos`
- `extincion`
- `vivificacion`
- `posesion`
- `copia`
- `quemar`
- `fratricidio`
- `triggers`
- `visibilidad`
- `targeting`
- `innegabilidad`

### 3.2 Por tipo de carta

- `adendei`
- `espectros`
- `rava`
- `protector`
- `bio`
- `ixim`
- `rot`
- `tokens`
- `limitadas`

### 3.3 Por fase/estructura

- `turno`
- `fase-previa`
- `fase-batalla`
- `zona-principal`
- `extendido`
- `multijugador`
- `formato-estandar`

### 3.4 Por meta

- `meta-regla`
- `glosario`
- `errata`
- `numeracion`
- `cross-ref`

---

## 4. Normalización de IDs

### 4.1 Regla general

**IDs son append-only.** Nunca renumerar un ID existente, aunque parezca lógico.

### 4.2 Variantes

- `D22b`, `D22c` → mantener `display_id: D22b`, `canonical_id: D22`, `parent: D22`
- `D22 v3` → `display_id: D22 v3`, `canonical_id: D22`, `version: 3`, `supersedes: [D22 v2]`
- `M3 residual` → `display_id: M3 residual`, `canonical_id: M3`, `parent: M3`

El sitio puede agrupar por `canonical_id` sin romper links históricos en commits.

### 4.3 Rangos actuales

| Prefijo | Rango | Significado |
|:---|:---|:---|
| `D` | 1-52+ | Dudas numeradas (duda principal) |
| `M` | 1-23+ | Meta-rulings (reglas que aplican transversalmente) |
| `E` | 1-8+ | Erratas (corrección de texto impreso) |
| `L` | -1 a -N | Lore rulings (subnumeración negativa — ej. `L-5`) |
| `FAQ` | 1-N | FAQ oficial |

---

## 5. Reglas de validación

Un linter (script opcional futuro) debe verificar:

1. **IDs únicos** dentro del archivo.
2. **`derived_from`, `supersedes`, `related`** referencian IDs existentes.
3. **`tags`** todos del vocabulario cerrado.
4. **`cards_explicit.folio`** todos existen en `cards.json`.
5. **`rulebook_refs`** todos apuntan a anchors existentes en `master-rulebook-v5.1.md`.
6. **`authority.role`** de los valores canónicos.
7. **`status`** consistente con `status_method` (ej. `status: tentativo` incompatible con `status_method: juez`).

---

## 6. Reglas de emisión del sitio

El parser del sitio debe:

1. **Conteo:** `len(rulings.filter(status=resuelto))` — NO contar headings.
2. **Autoría:** mostrar `authority.name` + badge según `authority.role`. Si `validated_by` no vacío, mostrar "+ N validadores".
3. **Cartas relacionadas:** sólo mostrar `cards_explicit`. Nunca fuzzy match. Si vacío, omitir sección.
4. **Agrupación:** colapsar por `canonical_id`. Mostrar versiones/variantes como tabs/acordeón.
5. **Cross-refs:** validados bidireccionales. Rotos → flag visual.
6. **Tags:** filtro facetado. Fechas NUNCA como tags — campo separado.

---

## 7. Migración

### 7.1 Estrategia

**Semi-automatizada (opción B en conversación 2026-04-22):**

1. Script `scripts/generate-frontmatter-draft.py` extrae de cada ruling lo que ya existe en prosa: `**Fecha:**`, `**Status:**`, emoji de status, cartas mencionadas con folio reconocible.
2. Genera frontmatter draft al inicio de cada ruling.
3. Ramsés + Logos validan manualmente los campos semánticos: `cards_explicit.role`, `tags`, `derived_from`, `related`.
4. Script linter valida schema antes de commit.

### 7.2 Orden recomendado

1. Aprobar este schema.
2. Generar drafts para los 47-60 rulings (script).
3. Revisar batch por batch (10 rulings por sesión): tags, cards, relaciones.
4. Linter pass → commit.
5. Mismo flujo para las 40 páginas del rulebook.

### 7.3 Compatibilidad

El frontmatter YAML es **invisible** en render de markdown estándar (GitHub, editores) — queda como bloque plegable o ignorado. Herramientas Jekyll/Hugo/Astro lo consumen nativamente. Parser custom (el sitio actual) puede usar `gray-matter` (JS) o `python-frontmatter` (Python).

---

## 8. Invariantes duros

1. **IDs append-only** — nunca renumerar.
2. **Texto narrativo intacto** — YAML sólo agrega, nunca sustituye.
3. **`cards_explicit` nunca autogenerado** — siempre declaración manual.
4. **Vocabulario de tags cerrado** — editar schema = PR.
5. **`authority.role` de conjunto canónico** — sin libertad de texto.
6. **Schema versionado** — breaking changes → incrementar `SCHEMA_VERSION`.

---

## 9. Preguntas abiertas para Ramsés

1. **`id` vs `display_id`:** ¿Ok con mantener ambos siempre, o sólo `id` cuando son iguales?
2. **Multi-version (`D22 v3`):** ¿Mantener como `display_id: D22 v3`, o refactorizar a `D22-v3`?
3. **Vocabulario de tags:** la lista §3 es borrador — ¿agregar/quitar algo?
4. **Archivo por ruling:** ¿Prefieres seguir con un solo `rulings-v5.1.md` gigante, o dividir `rulings/D47-tlahuelpuchi.md`, etc.? (Mi recomendación: mantener archivo único — YAML al inicio de cada bloque es suficiente.)
5. **`L-5`:** ¿Mantener numeración negativa o refactorizar a `L5`?

---

_Last updated: 2026-04-22 — v1.0 inicial_
