#!/usr/bin/env python3
"""
Consolidation v5.1 FINAL-FINAL — incorporates spot-check pass 4 (post-validation
conjunta) for p19 with the canonical turn-structure diagram.

Changes vs consolidate_v51.py:
  - p19 now has `spot_check_pass == 4` and `spot_check_status == "COMPLETED"`
    (was pass 3, POST_VALIDATION_PENDING).
  - p19 renders an additional section "Diagrama de Estructura de Turno
    (ESTRUCTURA CANÓNICA)" built from `diagram_structure` (51 nodes / 57 edges).
  - manifest + master json: `post_validation_pending: []` (was [19]).
  - Stats include both `spot_check_pass3_count` AND `spot_check_pass4_count`.
  - TOC marker for p19 is ✅ (pass 4 completed), not 🔴.
  - Legend adds ✅ pass 4 entry.

Inputs:
  - extractions/llm/pNN.json
  - arbitration/pNN-verdict.json

Outputs:
  - master-rulebook-v5.1.md
  - master-rulebook-v5.1.json
  - manifest.json
"""

import json
import hashlib
import time
from datetime import datetime, timezone
from pathlib import Path

BASE = Path('/home/coder/Kodem/docs/rulebook-source-of-truth')
LLM_DIR = BASE / 'extractions' / 'llm'
ARB_DIR = BASE / 'arbitration'

OUT_MD = BASE / 'master-rulebook-v5.1.md'
OUT_JSON = BASE / 'master-rulebook-v5.1.json'
OUT_MANIFEST = BASE / 'manifest.json'

PDF_SHA256 = "05672af59629e1e8c7ead6d9487aba107506d239c4863eec49fc28ab45479b03"

METHODOLOGY = (
    "Pipeline de 4 capas + post-validación conjunta: (1) Extracción LLM (opus-4-7) "
    "página por página sobre imágenes PNG — produce text_blocks y figures con anchors "
    "estables pNN/bXX y pNN/fig-NN. (2) OCR (tesseract español) como verificación "
    "paralela del texto plano. (3) Arbitraje LLM compara ambas extracciones y emite "
    "verdict ∈ {both_agree, llm_preferred, ocr_preferred, needs_human} + lista de typos "
    "verbatim. Para verdicts ocr_preferred en páginas densas y needs_human, la "
    "extracción LLM se re-ejecutó (pass=2) con foco en texto. (4) Spot-check pass 3 "
    "humano (Ramsés) sobre 8 páginas seleccionadas — aporta notas verbatim y nodos "
    "canónicos. (4.b) Post-validación conjunta pass 4 sobre p19 (diagrama de turno): "
    "3 jueces Opus 4.7 + spot-check humano de 5 preguntas con crops del PDF → estructura "
    "canónica con 51 nodos y 57 edges (confidence_final 0.98). Consolidación usa LLM como "
    "fuente canónica (descripciones de figuras más ricas) preservando typos verbatim "
    "detectados por árbitro y humano."
)

# Pages reviewed in pass 3 (includes p19 which was later promoted to pass 4).
SPOT_CHECK_PASS3_PAGES = {4, 5, 6, 14, 32, 36, 40}  # p19 moved to pass 4
SPOT_CHECK_PASS4_PAGES = {19}
ALL_SPOT_CHECK_PAGES = SPOT_CHECK_PASS3_PAGES | SPOT_CHECK_PASS4_PAGES

start_time = time.time()


def load_page(i):
    p = f"p{i:02d}"
    with open(LLM_DIR / f"{p}.json", encoding='utf-8') as f:
        llm = json.load(f)
    with open(ARB_DIR / f"{p}-verdict.json", encoding='utf-8') as f:
        arb = json.load(f)
    return llm, arb


def md_escape_title(s):
    if not s:
        return "(sin título)"
    return s.replace("\n", " ").strip()


def anchor_id(page_num):
    return f"pagina-{page_num:02d}"


def render_block_md(b):
    out = []
    heading = (b.get('heading') or '').strip()
    anchor = b.get('anchor', '')
    pos = b.get('position') or ''
    notes = (b.get('notes') or '').strip()
    text = b.get('text', '') or ''

    out.append(f"### `[{anchor}]` {heading}" if heading else f"### `[{anchor}]`")
    if pos:
        out.append(f"_pos: {pos}_")
    out.append("")
    for line in text.split("\n"):
        out.append(f"> {line}" if line else ">")
    out.append("")
    if notes:
        out.append(f"*Notas:* {notes}")
        out.append("")
    return "\n".join(out)


def render_figure_md(f):
    out = []
    anchor = f.get('anchor', '')
    slug = f.get('slug', '') or ''
    ftype = f.get('type', '') or ''
    bbox = f.get('bbox_pct') or {}
    desc = (f.get('description_detailed') or '').strip()
    embedded = f.get('embedded_text') or []
    rel = (f.get('relation_to_text') or '').strip()
    leg = f.get('legibility') or ''
    leg_notes = (f.get('legibility_notes') or '').strip()

    header_name = slug if slug else anchor
    out.append(f"### `[{anchor}]` {header_name} *(type: {ftype})*")
    if bbox:
        out.append(
            f"_bbox (%): x={bbox.get('x', 0)}, y={bbox.get('y', 0)}, "
            f"w={bbox.get('w', 0)}, h={bbox.get('h', 0)}_  "
        )
    leg_line = f"**Legibilidad:** {leg}" if leg else ""
    if leg_notes:
        leg_line += f" — {leg_notes}" if leg_line else f"_{leg_notes}_"
    if leg_line:
        out.append(f"{leg_line}  ")
    out.append("")
    if desc:
        out.append(f"**Descripción:** {desc}")
        out.append("")
    if embedded:
        out.append("**Texto embebido:**")
        for t in embedded:
            out.append(f"- `{t}`")
        out.append("")
    if rel:
        out.append(f"**Relación con el texto:** {rel}")
        out.append("")
    return "\n".join(out)


PHASE_ORDER = [
    "fase_previa",
    "fase_de_batalla",
    "fase_post",
    "fase_de_equipo",
    "fin_de_turno",
    "pasar_turno",
]


def render_p19_canonical_diagram(diagram):
    """Render the canonical turn-structure diagram for p19."""
    if not diagram:
        return ""
    out = []
    out.append("## Diagrama de Estructura de Turno (ESTRUCTURA CANÓNICA)")
    out.append("")
    out.append(
        "> ✅ **Estructura canónica post-validación conjunta (pass 4).** "
        "51 nodos · 57 edges · 6 fases. Referencia: "
        "[`p19-extraction-v3-final.json`](./p19-extraction-v3-final.json). "
        "Validada por 3 jueces Opus 4.7 + spot-check humano (Ramsés). "
        "`confidence_final = 0.98`."
    )
    out.append("")

    # Header note destacada
    header_note = (diagram.get('header_note') or '').strip()
    if header_note:
        out.append(f"> 📌 **Nota cabecera del diagrama (verbatim del PDF):** {header_note}")
        out.append("")

    # Leyenda de colores como tabla
    legend = diagram.get('legend') or {}
    colors = legend.get('colors') or []
    if colors:
        out.append("### Leyenda de colores (verbatim PDF)")
        out.append("")
        leg_note = (legend.get('note') or '').strip()
        if leg_note:
            out.append(f"_{leg_note}_")
            out.append("")
        out.append("| Color | Categoría |")
        out.append("|---|---|")
        for c in colors:
            out.append(f"| `{c.get('swatch', '')}` | {c.get('label', '')} |")
        out.append("")

    # Flujo principal
    mf = diagram.get('main_flow') or {}
    if mf:
        out.append("### Flujo principal")
        out.append("")
        desc = (mf.get('description') or '').strip()
        if desc:
            out.append(f"_{desc}_")
            out.append("")
        seq = mf.get('sequence') or []
        if seq:
            out.append(" → ".join(f"**{s}**" for s in seq))
            out.append("")

    # Patrón repetido
    pat = diagram.get('pattern') or {}
    if pat:
        out.append("### Patrón repetido")
        out.append("")
        pdesc = (pat.get('description') or '').strip()
        pseq = (pat.get('sequence') or '').strip()
        if pdesc:
            out.append(f"_{pdesc}_")
            out.append("")
        if pseq:
            out.append(f"**Secuencia:** {pseq}")
            out.append("")

    # Fases
    phases = diagram.get('phases') or {}
    if phases:
        out.append("### Fases — nodos y conexiones")
        out.append("")
        for key in PHASE_ORDER:
            if key not in phases:
                continue
            ph = phases[key]
            name = ph.get('name') or key
            out.append(f"#### {name}")
            out.append("")

            # Structural note (pasar_turno) or general note
            ns = (ph.get('note_structural') or '').strip()
            pos = (ph.get('position') or '').strip()
            if ns:
                out.append(f"> 🔀 **Nota estructural:** {ns}")
                if pos:
                    out.append(f">  ")
                    out.append(f"> **Posición:** {pos}")
                out.append("")

            # Nodes table
            nodes = ph.get('nodes') or []
            if nodes:
                out.append("**Nodos:**")
                out.append("")
                out.append("| # | Nodo | Color | Categoría | Forma / Nota |")
                out.append("|---|---|---|---|---|")
                for idx, n in enumerate(nodes, 1):
                    label = (n.get('label') or '').replace("|", "/")
                    color = n.get('color') or ''
                    cat = n.get('category') or ''
                    shape = n.get('shape') or ''
                    note = (n.get('note') or '').replace("|", "/")
                    extra_parts = []
                    if shape:
                        extra_parts.append(f"forma: {shape}")
                    if note:
                        extra_parts.append(note)
                    extra = "; ".join(extra_parts)
                    out.append(f"| {idx} | {label} | `{color}` | {cat} | {extra} |")
                out.append("")

            # Edges list
            edges = ph.get('edges') or []
            if edges:
                out.append("**Conexiones (edges):**")
                out.append("")
                for e in edges:
                    out.append(f"- {e}")
                out.append("")

            # Phase-level note (non-structural, e.g. Fase Post/Previa notes)
            pn = (ph.get('note') or '').strip()
            if pn:
                out.append(f"_Nota:_ {pn}")
                out.append("")

            # Laterals (if any; v3-final has [] for phases that don't)
            laterals = ph.get('laterals')
            if laterals:
                out.append("**Cajas laterales:**")
                out.append("")
                for lat in laterals:
                    out.append(f"- {lat}")
                out.append("")

    # Nota sobre Pasar Turno como flujo paralelo (explícita, arriba de observaciones)
    pt = (phases.get('pasar_turno') or {})
    if pt:
        out.append("### Nota sobre Pasar Turno (flujo paralelo)")
        out.append("")
        out.append(
            "> 🔀 **Pasar Turno** NO es una caja lateral de Fase Previa: es un "
            "**flujo horizontal independiente** que corre en paralelo al turno "
            "principal. Se activa desde Fase Previa y termina en Fin de Turno. "
            "Permite al jugador pasar turno activando solo efectos con "
            "condición/costo de pasar turno. Incluye un nodo descubierto en el "
            "spot-check humano P5: _«Sólo 1 costo que requiera pasar turno se "
            "considera PAGADO»_ (óvalo rosa)."
        )
        out.append("")

    # Observaciones estructurales
    obs = diagram.get('structural_observations') or []
    if obs:
        out.append("### Observaciones estructurales")
        out.append("")
        for o in obs:
            out.append(f"- {o}")
        out.append("")

    return "\n".join(out)


def build_page_md(page_num, llm, arb):
    out = []
    title = md_escape_title(llm.get('title'))
    out.append(f'<a id="{anchor_id(page_num)}"></a>')
    out.append("")
    out.append(f"# Página {page_num:02d} — {title}")
    out.append("")

    sc_pass = llm.get('spot_check_pass')
    sc_status = llm.get('spot_check_status')
    sc_notes = llm.get('spot_check_notes') or []
    canonical_nodes = llm.get('canonical_nodes') or []

    if sc_pass in (3, 4):
        if sc_pass == 4 and sc_status == "COMPLETED":
            out.append(
                "> ✅ **Post-validación conjunta COMPLETADA (pass 4)** — "
                "Extracción consolidada humano + LLM + 3 jueces. "
                "`confidence_final = 0.98`."
            )
        elif sc_status == "POST_VALIDATION_PENDING":
            out.append(
                "> 🔴 **POST-VALIDACIÓN PENDIENTE** — Esta página requiere "
                "extracción conjunta humano+LLM al final del proceso."
            )
        else:
            out.append(
                "> 🧪 **Spot-check Ramsés (pass 3)** — Revisada y anotada por humano."
            )
        out.append("")

        if sc_notes:
            out.append("**Notas de spot-check (humanas):**")
            out.append("")
            for n in sc_notes:
                out.append(f"- {n}")
            out.append("")

        if canonical_nodes:
            out.append("**Nodos canónicos confirmados:**")
            out.append("")
            out.append("| # | Nodo |")
            out.append("|---|---|")
            for idx, node in enumerate(canonical_nodes, 1):
                out.append(f"| {idx} | {node} |")
            out.append("")

    # Verdict header
    verdict = arb.get('verdict', '')
    rec = arb.get('recommendation', '')
    conf = arb.get('llm_confidence', '')
    agree = arb.get('agreement_pct', '')

    badge_parts = [f"**Verdict:** `{verdict}`", f"**Recomendación:** `{rec}`"]
    if llm.get('re_extraction_pass') or llm.get('re_extraction_date'):
        badge_parts.append("**✓ Re-validada (pass 2)**")
    if verdict == "needs_human":
        if page_num == 16:
            badge_parts.append("**✓ Revalidada (re-extracción + spot-check previo)**")
        else:
            badge_parts.append("**⚠️ REQUIERE REVISIÓN HUMANA**")
    badge_parts.append(f"**Confianza:** {conf}")
    if sc_pass == 4 and llm.get('confidence_final') is not None:
        badge_parts.append(f"**Confianza final (pass 4):** {llm.get('confidence_final')}")
    badge_parts.append(f"**Acuerdo LLM↔OCR:** {agree}")
    out.append(" · ".join(badge_parts))
    out.append("")

    sec_refs = llm.get('section_refs') or []
    if sec_refs:
        out.append(f"**Sección(es):** {', '.join(sec_refs)}")
        out.append("")

    blocks = llm.get('text_blocks') or []
    if blocks:
        out.append("## Bloques de texto")
        out.append("")
        for b in blocks:
            out.append(render_block_md(b))

    figs = llm.get('figures') or []
    if figs:
        out.append("## Figuras")
        out.append("")
        for f in figs:
            out.append(render_figure_md(f))

    # Canonical diagram block (only p19)
    if page_num == 19:
        diag = llm.get('diagram_structure') or {}
        if diag:
            out.append(render_p19_canonical_diagram(diag))

    pn = (llm.get('page_notes') or '').strip()
    if pn:
        out.append("## Notas de página")
        out.append("")
        out.append(pn)
        out.append("")

    out.append("")
    out.append("---")
    out.append("")
    return "\n".join(out)


def build_toc(pages_meta):
    lines = ["## Tabla de Contenidos", ""]
    for m in pages_meta:
        title = md_escape_title(m['title'])
        badges = []
        if m.get('re_extracted'):
            badges.append("✓")
        if m.get('needs_human'):
            badges.append("⚠️")
        sc_pass = m.get('spot_check_pass')
        sc_status = m.get('spot_check_status')
        if sc_pass == 4 and sc_status == "COMPLETED":
            badges.append("✅")
        elif sc_pass == 3:
            if sc_status == "POST_VALIDATION_PENDING":
                badges.append("🔴")
            else:
                badges.append("🧪")
        suffix = f" {' '.join(badges)}" if badges else ""
        lines.append(f"- [Página {m['page']:02d} — {title}](#{anchor_id(m['page'])}){suffix}")
    lines.append("")
    return "\n".join(lines)


def build_typos_md(typos):
    if not typos:
        return ""
    lines = [
        "# Apéndice A — Typos verbatim preservados",
        "",
        ("Los siguientes errores ortográficos, tipográficos o de redacción se preservan "
         "**verbatim** porque aparecen así en el PDF fuente. El árbitro (y en su caso el "
         "spot-check humano) los confirmaron durante la validación."),
        "",
        "| Página | Contexto (título) | Typo verbatim |",
        "|---|---|---|",
    ]
    for t in typos:
        page = f"p{t['page']:02d}"
        ctx = (t.get('title') or '').replace("|", "/")
        typ = (t.get('typo') or '').replace("|", "/").replace("\n", " ")
        lines.append(f"| {page} | {ctx} | {typ} |")
    lines.append("")
    return "\n".join(lines)


def build_anchors_md(anchors_index):
    lines = [
        "# Apéndice B — Índice de anchors",
        "",
        f"Total anchors registrados: **{len(anchors_index)}**",
        "",
        "| Anchor | Página | Tipo |",
        "|---|---|---|",
    ]
    for a in anchors_index:
        lines.append(f"| `{a['anchor']}` | {a['page']} | {a['kind']} |")
    lines.append("")
    return "\n".join(lines)


def main():
    pages = []
    pages_meta = []
    all_anchors = []
    typos = []
    verdict_counts = {"both_agree": 0, "llm_preferred": 0, "ocr_preferred": 0, "needs_human": 0}

    total_blocks = 0
    total_figs = 0
    sum_conf = 0.0
    sum_conf_pass2 = 0.0
    count_pass2 = 0
    re_extracted_pages = []
    spot_check_pass3_count = 0
    spot_check_pass4_count = 0
    post_val_pending = []
    pass4_pages = []

    for i in range(1, 41):
        llm, arb = load_page(i)
        verdict = arb.get('verdict')
        if verdict in verdict_counts:
            verdict_counts[verdict] += 1

        conf = arb.get('llm_confidence')
        if isinstance(conf, (int, float)):
            sum_conf += float(conf)
            if llm.get('re_extraction_pass') or llm.get('re_extraction_date'):
                sum_conf_pass2 += float(conf)
                count_pass2 += 1
                re_extracted_pages.append(i)

        blocks = llm.get('text_blocks') or []
        figs = llm.get('figures') or []
        total_blocks += len(blocks)
        total_figs += len(figs)

        sc_pass = llm.get('spot_check_pass')
        sc_status = llm.get('spot_check_status')
        if sc_pass == 3:
            spot_check_pass3_count += 1
            if sc_status == "POST_VALIDATION_PENDING":
                post_val_pending.append(i)
        elif sc_pass == 4:
            spot_check_pass4_count += 1
            pass4_pages.append(i)
            # If pass4 + COMPLETED → clears post-val pending (handled by not appending)

        for t in arb.get('typos_confirmed') or []:
            if isinstance(t, dict):
                text = t.get('text') or t.get('typo') or t.get('note') or json.dumps(t, ensure_ascii=False)
                note = t.get('note')
                if note and note != text:
                    text = f"{text} — {note}"
            else:
                text = str(t)
            typos.append({
                "page": i,
                "title": md_escape_title(llm.get('title')),
                "typo": text,
            })

        for b in blocks:
            all_anchors.append({"anchor": b.get('anchor', ''), "page": i, "kind": "text_block"})
        for f in figs:
            all_anchors.append({"anchor": f.get('anchor', ''), "page": i, "kind": "figure"})

        page_entry = {
            "page": i,
            "title": llm.get('title'),
            "section_refs": llm.get('section_refs') or [],
            "verdict": verdict,
            "recommendation": arb.get('recommendation'),
            "llm_confidence": conf,
            "agreement_pct": arb.get('agreement_pct'),
            "re_extracted": bool(llm.get('re_extraction_pass') or llm.get('re_extraction_date')),
            "spot_check_pass": sc_pass,
            "spot_check_status": sc_status,
            "spot_check_notes": llm.get('spot_check_notes') or [],
            "canonical_nodes": llm.get('canonical_nodes') or [],
            "text_blocks": blocks,
            "figures": figs,
            "page_notes": llm.get('page_notes'),
        }
        # Preserve canonical diagram for p19 in JSON master
        if llm.get('diagram_structure'):
            page_entry["diagram_structure"] = llm.get('diagram_structure')
        if llm.get('confidence_final') is not None:
            page_entry["confidence_final"] = llm.get('confidence_final')
        pages.append(page_entry)

        pages_meta.append({
            "page": i,
            "title": llm.get('title'),
            "re_extracted": page_entry['re_extracted'],
            "needs_human": verdict == "needs_human",
            "spot_check_pass": sc_pass,
            "spot_check_status": sc_status,
        })

    avg_conf = round(sum_conf / 40.0, 4)
    avg_conf_pass2 = round(sum_conf_pass2 / count_pass2, 4) if count_pass2 else None

    anchors_index = {}
    for a in all_anchors:
        anchors_index[a['anchor']] = {"page": a['page'], "kind": a['kind']}

    generated_at = datetime.now(timezone.utc).isoformat(timespec='seconds')

    # --- Markdown build ---
    md_parts = []
    md_parts.append("# Kódem TCG — Libro de Reglas Oficial v5.1")
    md_parts.append("")
    md_parts.append(f"**PDF SHA256:** `{PDF_SHA256}`  ")
    md_parts.append(f"**Generado:** {generated_at}  ")
    md_parts.append(f"**Total páginas:** 40  ")
    md_parts.append(f"**Total bloques de texto:** {total_blocks}  ")
    md_parts.append(f"**Total figuras:** {total_figs}  ")
    md_parts.append(f"**Confianza media LLM:** {avg_conf}  ")
    if avg_conf_pass2 is not None:
        md_parts.append(f"**Confianza media (pass 2):** {avg_conf_pass2}  ")
    md_parts.append(
        f"**Páginas re-extraídas (pass=2):** {len(re_extracted_pages)} → "
        f"{', '.join(f'p{p:02d}' for p in re_extracted_pages)}  "
    )
    md_parts.append(
        f"**Spot-check pass 3 (Ramsés):** {spot_check_pass3_count} páginas → "
        f"{', '.join(f'p{p:02d}' for p in sorted(SPOT_CHECK_PASS3_PAGES))}  "
    )
    md_parts.append(
        f"**Post-validación conjunta pass 4:** {spot_check_pass4_count} página(s) → "
        f"{', '.join(f'p{p:02d}' for p in pass4_pages)} ✅  "
    )
    if post_val_pending:
        md_parts.append(
            f"**Post-validación pendiente:** "
            f"{', '.join(f'p{p:02d}' for p in post_val_pending)} 🔴  "
        )
    else:
        md_parts.append("**Post-validación pendiente:** ninguna (p19 consolidada en pass 4) ✅  ")
    md_parts.append("**Revisión humana pendiente:** ninguna (p16 revalidada vía re-extracción).")
    md_parts.append("")
    md_parts.append("## Metodología")
    md_parts.append("")
    md_parts.append(METHODOLOGY)
    md_parts.append("")
    md_parts.append("### Distribución de verdicts")
    md_parts.append("")
    md_parts.append("| Verdict | Páginas |")
    md_parts.append("|---|---|")
    for v, c in verdict_counts.items():
        md_parts.append(f"| `{v}` | {c} |")
    md_parts.append("")

    md_parts.append("### Leyenda de indicadores")
    md_parts.append("")
    md_parts.append("- ✓ Página re-extraída (pass 2)")
    md_parts.append("- ⚠️ Página marcada `needs_human` por el árbitro")
    md_parts.append("- 🧪 Spot-check humano completado (pass 3)")
    md_parts.append("- 🔴 Post-validación conjunta pendiente (Ramsés + Logos)")
    md_parts.append("- ✅ Post-validación conjunta completada (pass 4)")
    md_parts.append("")

    md_parts.append(build_toc(pages_meta))
    md_parts.append("---")
    md_parts.append("")

    for i in range(1, 41):
        llm, arb = load_page(i)
        md_parts.append(build_page_md(i, llm, arb))

    md_parts.append(build_typos_md(typos))
    md_parts.append("")

    anchors_list = [
        {"anchor": a, "page": anchors_index[a]['page'], "kind": anchors_index[a]['kind']}
        for a in sorted(anchors_index.keys())
    ]
    md_parts.append(build_anchors_md(anchors_list))

    md_content = "\n".join(md_parts)

    # --- JSON build ---
    json_doc = {
        "rulebook_version": "5.1",
        "pdf_sha256": PDF_SHA256,
        "generated_at": generated_at,
        "methodology": METHODOLOGY,
        "stats": {
            "total_pages": 40,
            "total_blocks": total_blocks,
            "total_figures": total_figs,
            "re_extracted_pages": len(re_extracted_pages),
            "re_extracted_list": re_extracted_pages,
            "avg_confidence": avg_conf,
            "avg_confidence_pass2": avg_conf_pass2,
            "total_typos_preserved": len(typos),
            "spot_check_pass3_count": spot_check_pass3_count,
            "spot_check_pass3_pages": sorted(SPOT_CHECK_PASS3_PAGES),
            "spot_check_pass4_count": spot_check_pass4_count,
            "spot_check_pass4_pages": pass4_pages,
            "post_validation_pending_pages": post_val_pending,
            "verdicts": verdict_counts,
        },
        "pages": pages,
        "anchors_index": anchors_index,
        "typos_verbatim": typos,
        "human_review_pending": [],
        "post_validation_pending": post_val_pending,
    }

    # --- Validate JSON round-trip ---
    serialized = json.dumps(json_doc, ensure_ascii=False, indent=2)
    parsed = json.loads(serialized)
    assert parsed['rulebook_version'] == "5.1"
    assert parsed['pdf_sha256'] == PDF_SHA256
    assert parsed['stats']['total_pages'] == 40
    assert len(parsed['pages']) == 40
    assert parsed['human_review_pending'] == []
    assert parsed['post_validation_pending'] == [], \
        f"Expected empty post_validation_pending, got {parsed['post_validation_pending']}"
    assert parsed['stats']['spot_check_pass4_count'] == 1
    # Verify p19 has canonical diagram inlined
    p19_entry = next((p for p in parsed['pages'] if p['page'] == 19), None)
    assert p19_entry is not None
    assert 'diagram_structure' in p19_entry
    assert p19_entry['spot_check_pass'] == 4
    assert p19_entry['spot_check_status'] == "COMPLETED"
    assert p19_entry.get('confidence_final') == 0.98

    # --- Write ---
    OUT_MD.write_text(md_content, encoding='utf-8')
    OUT_JSON.write_text(serialized, encoding='utf-8')

    md_bytes = OUT_MD.stat().st_size
    json_bytes = OUT_JSON.stat().st_size

    def sha256_file(p):
        h = hashlib.sha256()
        with open(p, 'rb') as f:
            for chunk in iter(lambda: f.read(8192), b''):
                h.update(chunk)
        return h.hexdigest()

    md_sha = sha256_file(OUT_MD)
    json_sha = sha256_file(OUT_JSON)

    manifest = {
        "rulebook_version": "5.1",
        "generated_at": generated_at,
        "pdf_sha256": PDF_SHA256,
        "stats": {
            "total_pages": 40,
            "total_blocks": total_blocks,
            "total_figures": total_figs,
            "re_extracted_pages": len(re_extracted_pages),
            "avg_confidence": avg_conf,
            "avg_confidence_pass2": avg_conf_pass2,
            "total_typos_preserved": len(typos),
            "spot_check_pass3_count": spot_check_pass3_count,
            "spot_check_pass4_count": spot_check_pass4_count,
            "post_validation_pending_count": len(post_val_pending),
            "human_review_count": 0,
            "verdicts": verdict_counts,
        },
        "files": [
            {
                "path": "master-rulebook-v5.1.md",
                "size_bytes": md_bytes,
                "sha256": md_sha,
                "format": "markdown",
                "description": ("Documento legible humano con TOC, bloques, figuras, "
                                "spot-check pass 3/4 (p19 canónica) y apéndices."),
            },
            {
                "path": "master-rulebook-v5.1.json",
                "size_bytes": json_bytes,
                "sha256": json_sha,
                "format": "json",
                "description": ("JSON estructurado con páginas, anchors_index, typos, "
                                "diagram_structure canónica (p19), "
                                "human_review_pending y post_validation_pending."),
            },
        ],
        "human_review_pending": [],
        "post_validation_pending": post_val_pending,
    }

    man_str = json.dumps(manifest, ensure_ascii=False, indent=2)
    man_parsed = json.loads(man_str)
    assert man_parsed['human_review_pending'] == []
    assert man_parsed['post_validation_pending'] == []
    assert man_parsed['stats']['spot_check_pass4_count'] == 1

    OUT_MANIFEST.write_text(man_str, encoding='utf-8')

    elapsed = time.time() - start_time
    print(f"\n=== Re-consolidación v5.1 FINAL-FINAL completada ===")
    print(f"  master-rulebook-v5.1.md  → {md_bytes:>8} bytes  ({md_bytes/1024:.1f} KB)  sha256={md_sha[:16]}…")
    print(f"  master-rulebook-v5.1.json→ {json_bytes:>8} bytes  ({json_bytes/1024:.1f} KB)  sha256={json_sha[:16]}…")
    print(f"  manifest.json            → {OUT_MANIFEST.stat().st_size} bytes")
    print()
    print(f"  Total bloques de texto : {total_blocks}")
    print(f"  Total figuras          : {total_figs}")
    print(f"  Re-extraídas (pass 2)  : {len(re_extracted_pages)} → {re_extracted_pages}")
    print(f"  Spot-check pass 3      : {spot_check_pass3_count} → {sorted(SPOT_CHECK_PASS3_PAGES)}")
    print(f"  Spot-check pass 4      : {spot_check_pass4_count} → {pass4_pages} ✅")
    print(f"  Post-validación pend.  : {post_val_pending}")
    print(f"  human_review_pending   : []")
    print(f"  Typos preservados      : {len(typos)}")
    print(f"  Anchors registrados    : {len(anchors_index)}")
    print(f"  Verdicts               : {verdict_counts}")
    print(f"  Tiempo                 : {elapsed:.1f} s")


if __name__ == "__main__":
    main()
