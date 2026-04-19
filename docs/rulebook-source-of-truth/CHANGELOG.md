# CHANGELOG — Rulebook v5.1 Source-of-Truth

Todas las versiones siguen [Semantic Versioning](https://semver.org/).

---

## [5.1.0] — 2026-04-18

**Pipeline de 5 capas completado. Source-of-truth CANONICAL.**

### Pipeline ejecutado

| Capa | Descripción | Confianza |
|---|---|---|
| 1 | LLM Opus 4.7 vision (pass 1) sobre 40 páginas PNG 300 DPI | 0.901 avg |
| 2 | OCR Tesseract español paralelo a todas las páginas | — |
| 3 | Arbitraje LM-as-judge (3 sub-agentes) sobre 40 páginas | 14 both_agree, 13 llm_preferred, 12 ocr_preferred, 1 needs_human |
| 4 | Re-extracción LLM dirigida (pass 2) en 9 páginas críticas | 0.919 avg |
| 5 | Spot-check humano (Ramsés) sobre 8 páginas + post-validación conjunta p19 | 0.98 (p19) |

### Stats finales

- **40 páginas** extraídas
- **562 bloques de texto** con anchors estables `pNN/bXX`
- **207 figuras** con anchors estables `pNN/fig-NN`
- **769 anchors totales**
- **75 typos verbatim preservados** (apéndice A del master)
- PDF SHA256: `05672af59629e1e8c7ead6d9487aba107506d239c4863eec49fc28ab45479b03`

### Added

- `master-rulebook-v5.1.md` (~500 KB) — documento legible con TOC, 40 páginas, bloques con anchors, figuras descritas, apéndices A (typos) y B (índice de anchors)
- `master-rulebook-v5.1.json` (~660 KB) — JSON estructurado canónico con `anchors_index`, `typos_verbatim`, `human_review_pending`, `post_validation_pending`
- `manifest.json` — inventario con SHA256 + stats globales
- `figures/` — 207 PNG crops 300 DPI (excluidos del git, regenerables)
- `extractions/llm/` — 40 JSONs de extracción LLM pass 1+2
- `extractions/ocr/` — 40 TXTs de OCR Tesseract
- `arbitration/` — 40 verdictos del arbitraje LM-as-judge
- `p19-extraction-v3-final.json` — estructura canónica del diagrama de turno (52 nodos, 58 edges, 6 fases)
- `p19-validation-judge-{A,B,C}.json` — veredictos de los 3 jueces sobre el diagrama
- `p19-spot-check-crops-compressed.pdf` — PDF con 13 zoom crops + 5 preguntas humanas
- `SPOT-CHECK-Ramses.docx` — Word con 14 preguntas de spot-check general
- `consolidate_v51_final.py` — script reutilizable de consolidación

### Spot-check pass 3 (Ramsés, 7 páginas generales)

- **p04** — confirmado: slogan "¡EVOCA, PROTEGE Y VENCE!" NO existe (alucinación OCR)
- **p05** — agregado texto de carta Ozet (Costo: "Daña 1 pto. a otra carta aliada."); corregido a "Nombre científico del animal, planta o mineral"
- **p06** — agregados Pasiva-Rápida + Costo de carta Shugg; confirmado "Energía"
- **p14** — confirmado "Morféica" con acento
- **p32** — carta corregida a `Tekei, Responsabilidad` (LLM tenía Tolei, verificación tenía Telei — ambos mal)
- **p36** — corrección sistemática Adonde → Adendei (5 reemplazos); confirmada identidad de Tekei con p32
- **p40** — agregado encabezado "Créditos"; confirmado copyright "Kodem TCG"

### Spot-check pass 4+5 (p19, post-validación conjunta)

- 3 sub-agentes LM-as-judge independientes (confianza promedio 0.76, verdict `approve_with_corrections`)
- 5 preguntas humanas respondidas con imágenes del PDF
- 6 imágenes segmentadas por fase aplicadas → correcciones finales

**Correcciones aplicadas (pass 5):**
1. Fase Previa: `Pasivas Opcionales` (primera instancia) corregido de `verde` a `cian`
2. Fase Batalla: `Revelar` = amarillo **óvalo** (no rectángulo)
3. Fase Batalla: `Costo y/o Quemadura` bifurca simultáneamente a 3 nodos (Revelar, Reemplazo, Activa Rápida Rival)
4. Fase Post: typo verbatim **"Exinción"** preservado (sin la c)
5. Fin de Turno: **Veneno = rosa (acción)**, NO amarillo (rival) — corrección semántica crítica
6. Múltiples shapes corregidos a `óvalo` (Costo, Reemplazo, Descansos, Veneno, Costo Fin Turno)
7. Agregado nodo `PASAR TURNO` (óvalo rosa de entrada al flujo lateral)
8. Agregado nodo `Sólo 1 costo que requiera pasar turno se considera PAGADO`
9. Agregado nodo `INICIO DEL TURNO RIVAL` (gris rect)

**Leyenda de colores canónica extraída verbatim del PDF:**
- 🔵 Cian — Declaración
- 🟣 Rosa — Acción
- 🔴 Rojo — Resolución
- ⚫ Negro — Fin de efecto
- 🟡 Amarillo — Efectos del rival
- 🟢 Verde — Efectos que pueden usar jugador en turno y rival

### Decisiones clave del pipeline

- Fuente canónica del texto: **LLM** (descripciones de figuras más ricas que OCR)
- Tras arbitraje, páginas con `verdict=ocr_preferred` fueron re-extraídas con pass 2 dirigido
- Typos del PDF preservados **en el apéndice** pero el cuerpo del master-rulebook usa español correcto (política decidida por Ramsés)
- 5 sub-agentes paralelos máx (rate-limit)
- Siempre Opus 4.7 para extracción (Sonnet 4.6 falla en densidad vision)
- Image tool requiere paths en workspace + redimensionado a ≤1400px (salvo diagrama p19 a 2000px para detalle)

### Hallazgos metodológicos

- **LLM-as-judge converge:** en 3/3 casos los jueces independientes coincidieron en hallazgos críticos
- **Humano > LLM en 5/8 páginas** del spot-check — validación humana NO es opcional
- **Tesseract falla completamente** en flowcharts y texto dentro de ilustraciones
- **Opus 4.7 alucina** nombres propios del universo de juego (Tolei en vez de Tekei, Adonde en vez de Adendei)
- **Ramsés > LLM + OCR + 3 jueces** cuando conoce el producto — su input corrigió 9+ errores que ningún modelo detectó

---

### Archivos no-canónicos (proceso)

- `p19-extraction-v1.json` — extracción inicial (9 KB)
- `p19-extraction-v2.json` — tras 3 jueces pre-spot-check humano (13 KB)
- `p19-extraction-v3-final.json` — canónica final (16 KB)
- `spot-check-respuestas-ramses.md` — bitácora de respuestas humanas

---

## [Futuro] — para v5.2 del PDF

Typos verbatim detectados que podrían corregirse en el PDF fuente (75 items catalogados en Apéndice A del master). Ejemplos:
- `aun` → `aún`
- `conviertiéndote` → `convirtiéndote`
- `Morfeica` → `Morféica`
- `FASES DEL DE TURNO` → `FASES DEL TURNO`
- `Exinción` → `Extinción`
- `expasión` → `expansión`
- `añadiendoles` → `añadiéndoles`
- `Prinicipal` → `Principal`
- `eliminadan` → `eliminadas`
- `atque` → `ataque`
- `Cempasúchi` → `Cempasúchil`
- `mlas` → `mlas/más` (contexto)
- `muestrala` → `muéstrala`
- `vinvular` → `vincular`
- (+ 60 más en apéndice A)
