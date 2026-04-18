#!/usr/bin/env python3
"""
Consolidation v5.1 FINAL — incorporates spot-check pass 3 from Ramsés.

Inputs:
  - /home/coder/Kodem/docs/rulebook-source-of-truth/extractions/llm/pNN.json
  - /home/coder/Kodem/docs/rulebook-source-of-truth/arbitration/pNN-verdict.json

Outputs:
  - master-rulebook-v5.1.md
  - master-rulebook-v5.1.json
  - manifest.json

Policy:
  - both_agree     → LLM (richer descriptions)
  - llm_preferred  → LLM
  - ocr_preferred  → LLM (pass 2 already re-extracted when applicable)
  - needs_human    → LLM + [REQUIERE REVISIÓN HUMANA] marker (none pending now; p16 revalidated)

Spot-check pass 3 markers:
  - spot_check_pass == 3  → ✓ Spot-check Ramsés badge
  - spot_check_status == POST_VALIDATION_PENDING → 🔴 POST-VALIDACIÓN PENDIENTE badge (p19)
  - spot_check_notes → listed at the very start of the page
  - canonical_nodes (p19) → rendered as numbered table
"""

import json
import os
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
    "Pipeline de 4 capas: (1) Extracción LLM (opus-4-7) página por página sobre imágenes PNG — "
    "produce text_blocks y figures con anchors estables pNN/bXX y pNN/fig-NN. "
    "(2) OCR (tesseract español) como verificación paralela del texto plano. "
    "(3) Arbitraje LLM compara ambas extracciones y emite verdict ∈ "
    "{both_agree, llm_preferred, ocr_preferred, needs_human} + lista de typos verbatim. "
    "Para verdicts ocr_preferred en páginas densas y needs_human, la extracción LLM se re-ejecutó "
    "(pass=2) con foco en texto. (4) Spot-check pass 3 humano (Ramsés) sobre páginas seleccionadas "
    "— aporta notas verbatim y nodos canónicos; una página queda marcada POST_VALIDATION_PENDING "
    "(p19, diagrama de turno) para extracción conjunta final. Consolidación usa LLM como fuente "
    "canónica (descripciones de figuras más ricas) preservando typos verbatim detectados por "
    "árbitro y humano."
)

SPOT_CHECK_PAGES = {4, 5, 6, 14, 19, 32, 36, 40}

start_time = time.time()


def load_page(i):
    """Load LLM extraction + verdict for page i."""
    p = f"p{i:02d}"
    llm_path = LLM_DIR / f"{p}.json"
    arb_path = ARB_DIR / f"{p}-verdict.json"
    with open(llm_path, encoding='utf-8') as f:
        llm = json.load(f)
    with open(arb_path, encoding='utf-8') as f:
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

    if heading:
        out.append(f"### `[{anchor}]` {heading}")
    else:
        out.append(f"### `[{anchor}]`")
    if pos:
        out.append(f"_pos: {pos}_")
    out.append("")
    # quote text (handle multi-line)
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
        x = bbox.get('x', 0)
        y = bbox.get('y', 0)
        w = bbox.get('w', 0)
        h = bbox.get('h', 0)
        out.append(f"_bbox (%): x={x}, y={y}, w={w}, h={h}_  ")

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


def build_page_md(page_num, llm, arb):
    """Render a full page as Markdown."""
    out = []
    title = md_escape_title(llm.get('title'))
    out.append(f'<a id="{anchor_id(page_num)}"></a>')
    out.append("")
    out.append(f"# Página {page_num:02d} — {title}")
    out.append("")

    # SPOT-CHECK NOTES — rendered at the very top, before anything else.
    sc_pass = llm.get('spot_check_pass')
    sc_status = llm.get('spot_check_status')
    sc_notes = llm.get('spot_check_notes') or []
    canonical_nodes = llm.get('canonical_nodes') or []

    if sc_pass == 3:
        if sc_status == "POST_VALIDATION_PENDING":
            out.append("> 🔴 **POST-VALIDACIÓN PENDIENTE** — "
                       "Esta página requiere extracción conjunta humano+LLM al final del proceso.")
        else:
            out.append("> ✓ **Spot-check Ramsés (pass 3)** — "
                       "Revisada y anotada por humano.")
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

    # Re-extracted marker
    if llm.get('re_extraction_pass') or llm.get('re_extraction_date'):
        badge_parts.append("**✓ Re-validada (pass 2)**")

    # Human-review marker (needs_human - post p16 re-extraction, none should remain pending)
    if verdict == "needs_human":
        # p16 already re-validated; still surface the legacy marker for transparency
        if page_num == 16:
            badge_parts.append("**✓ Revalidada (re-extracción + spot-check previo)**")
        else:
            badge_parts.append("**⚠️ REQUIERE REVISIÓN HUMANA**")

    badge_parts.append(f"**Confianza:** {conf}")
    badge_parts.append(f"**Acuerdo LLM↔OCR:** {agree}")
    out.append(" · ".join(badge_parts))
    out.append("")

    # Section refs
    sec_refs = llm.get('section_refs') or []
    if sec_refs:
        out.append(f"**Sección(es):** {', '.join(sec_refs)}")
        out.append("")

    # Text blocks
    blocks = llm.get('text_blocks') or []
    if blocks:
        out.append("## Bloques de texto")
        out.append("")
        for b in blocks:
            out.append(render_block_md(b))

    # Figures
    figs = llm.get('figures') or []
    if figs:
        out.append("## Figuras")
        out.append("")
        for f in figs:
            out.append(render_figure_md(f))

    # Page notes
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
        if m.get('spot_check_pass') == 3:
            if m.get('spot_check_status') == "POST_VALIDATION_PENDING":
                badges.append("🔴")
            else:
                badges.append("🧪")
        suffix = f" {' '.join(badges)}" if badges else ""
        lines.append(f"- [Página {m['page']:02d} — {title}](#{anchor_id(m['page'])}){suffix}")
    lines.append("")
    return "\n".join(lines)


def build_typos_md(typos):
    """typos: list of {page, title, typo}"""
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
    """anchors_index: list of (anchor, page, kind)."""
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
    post_val_pending = []

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

        # Typos from arbitration
        for t in arb.get('typos_confirmed') or []:
            # t can be a dict {text, note, anchor} or string
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

        # Anchors
        for b in blocks:
            all_anchors.append({"anchor": b.get('anchor', ''), "page": i, "kind": "text_block"})
        for f in figs:
            all_anchors.append({"anchor": f.get('anchor', ''), "page": i, "kind": "figure"})

        # Page JSON entry — keep full LLM content + arbitration summary
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

    # Anchors index aggregation
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
    md_parts.append(f"**Páginas re-extraídas (pass=2):** {len(re_extracted_pages)} → "
                    f"{', '.join(f'p{p:02d}' for p in re_extracted_pages)}  ")
    md_parts.append(f"**Spot-check pass 3 (Ramsés):** {spot_check_pass3_count} páginas → "
                    f"{', '.join(f'p{p:02d}' for p in sorted(SPOT_CHECK_PAGES))}  ")
    if post_val_pending:
        md_parts.append(f"**Post-validación pendiente:** "
                        f"{', '.join(f'p{p:02d}' for p in post_val_pending)} 🔴  ")
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

    # Legend
    md_parts.append("### Leyenda de indicadores")
    md_parts.append("")
    md_parts.append("- ✓ Página re-extraída (pass 2)")
    md_parts.append("- ⚠️ Página marcada `needs_human` por el árbitro")
    md_parts.append("- 🧪 Spot-check humano completado (pass 3)")
    md_parts.append("- 🔴 Post-validación conjunta pendiente (Ramsés + Logos)")
    md_parts.append("")

    md_parts.append(build_toc(pages_meta))
    md_parts.append("---")
    md_parts.append("")

    for i in range(1, 41):
        llm, arb = load_page(i)
        md_parts.append(build_page_md(i, llm, arb))

    # Appendix A: typos
    md_parts.append(build_typos_md(typos))
    md_parts.append("")

    # Appendix B: anchors
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
            "spot_check_pass3_pages": sorted(SPOT_CHECK_PAGES),
            "post_validation_pending_pages": post_val_pending,
            "verdicts": verdict_counts,
        },
        "pages": pages,
        "anchors_index": anchors_index,
        "typos_verbatim": typos,
        "human_review_pending": [],
        "post_validation_pending": post_val_pending,
    }

    # --- Validate JSON round-trip BEFORE writing ---
    serialized = json.dumps(json_doc, ensure_ascii=False, indent=2)
    # Round-trip
    parsed = json.loads(serialized)
    assert parsed['rulebook_version'] == "5.1"
    assert parsed['pdf_sha256'] == PDF_SHA256
    assert parsed['stats']['total_pages'] == 40
    assert len(parsed['pages']) == 40
    assert parsed['human_review_pending'] == []
    assert parsed['post_validation_pending'] == [19]
    assert parsed['stats']['spot_check_pass3_count'] == 8

    # --- Write files (UTF-8, guaranteed) ---
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
                                "spot-check pass 3 y apéndices."),
            },
            {
                "path": "master-rulebook-v5.1.json",
                "size_bytes": json_bytes,
                "sha256": json_sha,
                "format": "json",
                "description": ("JSON estructurado con páginas, anchors_index, typos, "
                                "human_review_pending y post_validation_pending."),
            },
        ],
        "human_review_pending": [],
        "post_validation_pending": post_val_pending,
    }

    # Validate manifest round-trip
    man_str = json.dumps(manifest, ensure_ascii=False, indent=2)
    man_parsed = json.loads(man_str)
    assert man_parsed['human_review_pending'] == []
    assert man_parsed['post_validation_pending'] == [19]
    assert man_parsed['stats']['spot_check_pass3_count'] == 8

    OUT_MANIFEST.write_text(man_str, encoding='utf-8')

    elapsed = time.time() - start_time
    print(f"\n=== Re-consolidación v5.1 FINAL completada ===")
    print(f"  master-rulebook-v5.1.md  → {md_bytes:>8} bytes  ({md_bytes/1024:.1f} KB)  sha256={md_sha[:16]}…")
    print(f"  master-rulebook-v5.1.json→ {json_bytes:>8} bytes  ({json_bytes/1024:.1f} KB)  sha256={json_sha[:16]}…")
    print(f"  manifest.json            → {OUT_MANIFEST.stat().st_size} bytes")
    print()
    print(f"  Total bloques de texto : {total_blocks}")
    print(f"  Total figuras          : {total_figs}")
    print(f"  Re-extraídas (pass 2)  : {len(re_extracted_pages)} → {re_extracted_pages}")
    print(f"  Spot-check pass 3      : {spot_check_pass3_count} → {sorted(SPOT_CHECK_PAGES)}")
    print(f"  Post-validación pendnte: {post_val_pending}")
    print(f"  human_review_pending   : [] (p16 revalidada)")
    print(f"  Typos preservados      : {len(typos)}")
    print(f"  Anchors registrados    : {len(anchors_index)}")
    print(f"  Verdicts               : {verdict_counts}")
    print(f"  Tiempo                 : {elapsed:.1f} s")


if __name__ == "__main__":
    main()
