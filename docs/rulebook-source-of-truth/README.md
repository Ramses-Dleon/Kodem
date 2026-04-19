# Rulebook Kódem TCG v5.1 — Source-of-Truth

> **Estado:** CANONICAL · Pipeline de 5 capas completado · 2026-04-18
> **Última actualización con ajustes modificados y FH:** 2026-04-19

> ⚠️ **Importante para agentes / sesiones futuras:** La próxima vez que se retome el trabajo del engine Kódem, **leer primero**:
> 1. Este `master-rulebook-v5.1.md` (ya con ajustes modificados y FH aplicados).
> 2. [`rulings-v5.1.md`](./rulings-v5.1.md) (fuente de verdad para dudas resueltas de la comunidad).
> 3. [`rulings-v5.1-addendum-faq-oficial.md`](./rulings-v5.1-addendum-faq-oficial.md) (FAQ oficial complementaria).
> 4. [`dudas-pendientes-comunidad.md`](./dudas-pendientes-comunidad.md) (tracker de dudas abiertas).
>
> ¡No partir de versiones previas! El engine en `codice-kodem` se está alineando a ESTA versión. Ver `codice-kodem/docs/sessions/SESSION-2026-04-19-RESUME.md` para el estado del plan de fixes al engine.

Este directorio contiene la extracción completa y verificada del libro de reglas oficial de Kódem TCG v5.1 en formato estructurado, listo para usar como fuente de verdad en agentes LLM, herramientas de glosario, búsqueda semántica, o auditoría de gameplay.

## Archivos clave

| Archivo | Descripción |
|---|---|
| **`master-rulebook-v5.1.md`** | Documento legible humano con TOC, bloques con anchors, descripciones de figuras y apéndices |
| **`master-rulebook-v5.1.json`** | JSON estructurado canónico con `anchors_index`, `typos_verbatim`, `pages[]`, `diagram_structure` (p19) |
| **`manifest.json`** | Inventario con SHA256, stats globales y lista de archivos |
| **`CHANGELOG.md`** | Historia de versiones, decisiones del pipeline, hallazgos |

## Estructura de anchors

- **Bloques de texto:** `pNN/bXX` (ej. `p16/b06` = bloque 6 de la página 16)
- **Figuras:** `pNN/fig-NN` (ej. `p19/fig-03` = figura 3 de la página 19)
- Desde `01` por página (no global)

## Consumir desde LLM

```python
import json

# Cargar JSON canónico
rulebook = json.load(open("master-rulebook-v5.1.json"))

# Buscar un bloque por anchor
for page in rulebook["pages"]:
    for block in page.get("text_blocks", []):
        if block.get("anchor") == "p16/b06":
            print(block["text"])

# Buscar por anchors_index (más rápido)
idx = rulebook["anchors_index"]
print(idx.get("p16/b06"))  # → {page: 16, text: "...", ...}
```

## Diagrama de Turno (p19)

La página 19 contiene el diagrama de flujo completo del turno con **52 nodos** y **58 edges** en 6 fases + flujo paralelo Pasar Turno.

Archivo estructurado: **`p19-extraction-v3-final.json`**

Leyenda de colores (verbatim del PDF):
- 🔵 **Cian** — Declaración
- 🟣 **Rosa** — Acción
- 🔴 **Rojo** — Resolución
- ⚫ **Negro** — Fin de efecto
- 🟡 **Amarillo** — Efectos del rival
- 🟢 **Verde** — Efectos que pueden usar jugador en turno y rival

Patrón repetido en fases: **Declaración (cian) → Costo (rosa) → Pasivas Rápidas (verde) → Resolución (rojo) → Reemplazo (rosa)**

## Subdirectorios

- `extractions/llm/` — 40 JSONs de extracción LLM (pass 1 + 2, con spot-check)
- `extractions/ocr/` — 40 TXTs de OCR Tesseract (referencia de verificación)
- `arbitration/` — 40 verdictos del arbitraje LM-as-judge (3 jueces)
- `indexes/` — Índices auxiliares (anchors, secciones)

## Excluidos del git (regenerables)

- `pages/` — 40 PNGs 300 DPI del PDF fuente (~442 MB)
- `figures/` — 207 crops PNG de figuras individuales (~250 MB)
- `p19-zooms/` — 13 zoom crops del diagrama de turno (~8 MB)
- `p19-spot-check-crops.pdf` — PDF original no comprimido

Para regenerar crops:
```bash
python3 /home/coder/.openclaw/workspace/scripts/kodem-generate-crops.py
```

## Pipeline ejecutado

```
PDF (16MB, 40 páginas)
  │
  ├─► [Layer 1] pdftoppm → 40 PNGs @ 300 DPI
  │
  ├─► [Layer 2] Tesseract OCR (español) → 40 TXTs
  │
  ├─► [Layer 3] Opus 4.7 vision (pass 1) → 40 JSONs LLM
  │            confidence avg: 0.901
  │
  ├─► [Layer 4] LM-as-judge (3 sub-agentes Opus 4.7) → 40 verdicts
  │            14 both_agree · 13 llm_preferred · 12 ocr_preferred · 1 needs_human
  │
  ├─► [Layer 5] Re-extracción LLM (pass 2) → 9 páginas críticas
  │            confidence avg: 0.919
  │
  └─► [Layer 6] Spot-check humano (Ramsés) → 8 páginas
               3 sub-agentes adicionales LM-as-judge sobre p19
               Post-validación conjunta del diagrama de turno
               Confidence p19: 0.98
```

## Licencia y atribución

Contenido del rulebook: © Kódem TCG (propiedad del editor).
Esta extracción estructurada es una representación técnica generada por pipeline AI con verificación humana por parte del equipo de Kódem.

PDF fuente SHA256: `05672af59629e1e8c7ead6d9487aba107506d239c4863eec49fc28ab45479b03`

---

_Generado por Logos (OpenClaw) — 2026-04-18_
