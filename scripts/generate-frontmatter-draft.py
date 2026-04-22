#!/usr/bin/env python3
"""
generate-frontmatter-draft.py

Genera frontmatter YAML draft al inicio de cada ruling en rulings-v5.1.md,
extrayendo lo que ya existe en prosa. Campos semánticos quedan como TODO
para revisión manual.

Schema: docs/rulebook-source-of-truth/SCHEMA.md v1.1

Uso:
    python3 scripts/generate-frontmatter-draft.py --input rulings-v5.1.md --output rulings-v5.1-draft.md
    python3 scripts/generate-frontmatter-draft.py --dry-run  # imprime primer ruling como ejemplo

Invariantes:
    - No toca texto narrativo.
    - NO autogenera cards_explicit (TODO manual).
    - NO autogenera tags (TODO manual).
    - Sólo extrae: id, status, date_created, authority (parcial), rulebook_refs (parcial).
"""
import argparse
import re
import sys
from pathlib import Path
from datetime import date

# Acepta:
#   ## D47. Titulo
#   ## D22 v3. Titulo
#   ## D22b. Titulo
#   ## M2.3. Titulo
#   ## M3 residual. Titulo  (o sin punto final: '## M3 residual — ...')
#   ## L-5 — Titulo (con guion em)
#   ## FAQ-03. Titulo
RULING_HEADER_RE = re.compile(
    r"^##\s+"
    r"([DMELEF]{1,3}-?\d+(?:\.\d+)?[a-zA-Z]?(?:\s+v\d+)?(?:\s+residual)?)"
    r"\s*(?:\.|\u2014|\u2013|-)\s+(.+)$"
)
STATUS_LINE_RE = re.compile(r"\*\*Status:\*\*\s+(.+?)$", re.MULTILINE)
FECHA_LINE_RE = re.compile(r"\*\*Fecha:\*\*\s+(\d{4}-\d{2}-\d{2})", re.MULTILINE)
RESUELTO_POR_RE = re.compile(r"(?:resuelto|resuelta|cerrada|cerrado)\s+por\s+([A-Z][a-zá-úÁ-Ú]+)(?:\s|,|\.|$)", re.IGNORECASE)
RULEBOOK_REF_RE = re.compile(r"`?(p\d{2}/b\d{2}(?:/b\d+)?|p\d{2}/fig-\d{2})`?")
DERIVED_FROM_RE = re.compile(r"(?:compone|deriva de|con base en)\s+((?:[DME]\d+[a-z]?(?:\s+residual)?(?:\s*\+\s*[DME]\d+[a-z]?)*))", re.IGNORECASE)


def parse_id(raw_id):
    """
    Normaliza ID a schema v1.1.

    Returns: dict con id, display_id (opcional), canonical_id, version, parent
    """
    raw = raw_id.strip()
    result = {"id": raw}

    # M2.3, M2.4 (decimales) → canonical=M2, parent=M2
    match_decimal = re.match(r"^([DMEF][A-Z]*)(\d+)\.(\d+)$", raw)
    if match_decimal:
        base = match_decimal.group(1) + match_decimal.group(2)
        result["display_id"] = raw
        result["canonical_id"] = base
        result["parent"] = base
        return result

    # Variantes con letra: D22b → canonical=D22, parent=D22
    match_variant = re.match(r"^([DME]\d+)([a-z])$", raw)
    if match_variant:
        base = match_variant.group(1)
        result["display_id"] = raw
        result["canonical_id"] = base
        result["parent"] = base
        return result

    # Versiones: D22 v3 → canonical=D22, version=3
    match_version = re.match(r"^([DME]\d+)\s+v(\d+)$", raw)
    if match_version:
        base = match_version.group(1)
        ver = int(match_version.group(2))
        result["display_id"] = raw
        result["canonical_id"] = base
        result["version"] = ver
        return result

    # Residuales: M3 residual → canonical=M3, parent=M3
    match_residual = re.match(r"^([DME]\d+)\s+residual$", raw)
    if match_residual:
        base = match_residual.group(1)
        result["display_id"] = raw
        result["canonical_id"] = base
        result["parent"] = base
        return result

    # L-5 literal (histórico, guión parte del ID)
    if re.match(r"^L-\d+$", raw):
        result["canonical_id"] = raw
        return result

    # FAQ-03 literal
    if re.match(r"^FAQ-\d+$", raw):
        result["canonical_id"] = raw
        return result

    # Estándar: D47, M12, E8
    if re.match(r"^[DMEF][A-Z]*\d+$", raw):
        result["canonical_id"] = raw
        return result

    # Desconocido
    result["canonical_id"] = raw
    return result


def infer_status(text_block):
    """Extrae status del bloque desde prosa."""
    lower = text_block.lower()
    if "✅ resuelto" in lower or "✅ resuelta" in lower or "cerrada" in lower:
        return "resuelto"
    if "🟡 tentativo" in lower or "tentativo" in lower:
        return "tentativo"
    if "pendiente de decisión" in lower or "pendiente de juez" in lower or "📌" in text_block:
        return "pendiente-juez"
    if "residual" in lower and "abierto" in lower:
        return "residual"
    if "descartada" in lower or "descartado" in lower:
        return "descartado"
    if "🔴" in text_block:
        return "abierto"
    return "TODO"


def infer_authority(text_block):
    """
    Extrae autoridad del bloque. Orden de precedencia:
    1. Logos-derivado (cuando el ruling actual es derivación)
    2. Juez por atribución explícita ('RESUELTA por Ambir', 'Autoridad del ruling: Aldo')
    3. Autor por atribución explícita
    4. Comunidad (ID supabase)
    5. Evidencia textual
    
    NO usar mera mención del nombre — Aldo aparece en D47 porque se cita D36 de Aldo,
    pero D47 no es ruling de Aldo.
    """
    lower = text_block.lower()

    # 1. Logos-derivado: el ruling mismo dice 'por derivación' / 'cerrada por derivación' / 'cerrada por Logos'
    if re.search(r"cerrada\s+por\s+derivación", lower) or \
       re.search(r"resuelt[ao]\s+por\s+derivación", lower) or \
       re.search(r"cerrada\s+por\s+logos", lower) or \
       "resuelta por derivación (logos" in lower:
        return {"role": "logos-derivado", "name": "Logos", "validated_by": []}

    # 2. Juez por atribución explícita
    for juez in ["Ambir", "Aldo"]:
        patterns = [
            rf"resuelt[ao]\s+\d{{4}}-\d{{2}}-\d{{2}}\s+por\s+{juez}",
            rf"cerrada\s+por\s+{juez}",
            rf"por\s+{juez}\s*\(Juez\s+K[oó]dem\)",
            rf"Autoridad\s+del\s+ruling:.*\*\*{juez}\*\*",
        ]
        for p in patterns:
            if re.search(p, text_block, re.IGNORECASE):
                return {"role": "juez", "name": juez, "validated_by": []}

    # 3. Autor por atribución explícita
    if re.search(r"resuelt[ao]\s+\d{4}-\d{2}-\d{2}\s+por\s+Rams[éè]s", text_block, re.IGNORECASE) or \
       re.search(r"Rams[éè]s\s+D´?Le[óo]n\s+—\s+autor", text_block) or \
       re.search(r"por\s+Rams[éè]s\s+\(autor", text_block, re.IGNORECASE) or \
       re.search(r"Ruling\s+Rams[éè]s", text_block, re.IGNORECASE) or \
       re.search(r"ruling\s+\(ramsi?[éè]s", text_block, re.IGNORECASE):
        return {"role": "autor", "name": "Ramsés", "validated_by": []}

    # 4. Comunidad (ID supabase)
    if re.search(r"u_[a-f0-9]{8}", text_block):
        return {"role": "comunidad", "name": "TODO_consultar_id", "validated_by": []}

    # 5. Evidencia textual
    if "evidencia directa" in lower or "fundamento textual" in lower:
        return {"role": "evidencia-textual", "name": "rulebook", "validated_by": []}

    return {"role": "TODO", "name": "TODO", "validated_by": []}


def infer_status_method(text_block, authority):
    role = authority.get("role", "TODO")
    if role == "autor":
        return "autor"
    if role == "juez":
        return "juez"
    if role == "comunidad":
        return "comunidad"
    if role == "logos-derivado":
        return "derivacion"
    if role == "evidencia-textual":
        return "evidencia-textual"
    return "TODO"


def extract_rulebook_refs(text_block):
    """Extrae referencias pXX/bYY del texto."""
    refs = set()
    for match in RULEBOOK_REF_RE.finditer(text_block):
        refs.add(match.group(1))
    return sorted(refs)


def extract_derived_from(text_block):
    """Extrae IDs mencionados en secciones de composición/derivación."""
    derived = set()

    # A. Bloques 'Composición de rulings:' / 'Composición:' con lista que sigue
    comp_match = re.search(
        r"\*\*Composición(?:\s+(?:de\s+rulings|con))?\*?\*?:?\*\*\s*\n((?:\s*[-*].*\n?)+)",
        text_block, re.MULTILINE
    )
    if comp_match:
        block = comp_match.group(1)
        for rid in re.finditer(r"\*([DMEFL]-?\d+[a-z]?(?:\s+v\d+)?(?:\s+residual)?)\*", block):
            derived.add(rid.group(1).strip())
        # También capturar IDs sin formato italic (M3 residual, D36)
        for rid in re.finditer(r"(?:^|[\s\(])([DMEFL]-?\d+[a-z]?(?:\s+v\d+)?(?:\s+residual)?)(?=[\s,\.\)\:])", block):
            token = rid.group(1).strip()
            if re.match(r"^[DMEFL]-?\d+[a-z]?(\s+v\d+)?(\s+residual)?$", token):
                derived.add(token)

    # B. Patrón inline 'compone X+Y+Z'
    for m in re.finditer(
        r"(?:compone|deriva de|con base en)\s*([DMEFL]\d+[a-z]?(?:\s+residual)?(?:\s*\+\s*[DMEFL]\d+[a-z]?(?:\s+residual)?)*)",
        text_block, re.IGNORECASE
    ):
        chunk = m.group(1)
        for sub in re.split(r"\s*\+\s*|\s*,\s*", chunk):
            sub = sub.strip()
            if re.match(r"^[DMEFL]\d+[a-z]?(\s+residual)?$", sub):
                derived.add(sub)

    # C. 'Rulings relacionados:' / 'Derivación lógica:' — aportan al related_from, no derived
    # (intencionalmente NO se capturan aquí; irán a 'related' manualmente)

    return sorted(derived)


def generate_frontmatter(raw_id, block_text):
    """Genera YAML frontmatter para un ruling."""
    id_data = parse_id(raw_id)
    status = infer_status(block_text)
    authority = infer_authority(block_text)
    status_method = infer_status_method(block_text, authority)
    date_match = FECHA_LINE_RE.search(block_text)
    date_created = date_match.group(1) if date_match else "TODO"
    refs = extract_rulebook_refs(block_text)
    derived = extract_derived_from(block_text)

    lines = ["---"]
    lines.append(f"id: {id_data['id']}")
    if "display_id" in id_data:
        lines.append(f"display_id: \"{id_data['display_id']}\"")
    lines.append(f"canonical_id: {id_data.get('canonical_id', id_data['id'])}")
    if "version" in id_data:
        lines.append(f"version: {id_data['version']}")
    else:
        lines.append("version: 1")
    if "parent" in id_data:
        lines.append(f"parent: {id_data['parent']}")
    else:
        lines.append("parent: null")
    lines.append("")
    lines.append("type: duda  # TODO revisar: duda | meta-regla | aclaracion | ruling-carta | errata | faq")
    lines.append(f"status: {status}")
    lines.append(f"status_method: {status_method}")
    lines.append("")
    lines.append(f"date_created: {date_created}")
    lines.append("date_revised: null")
    lines.append("")
    lines.append("authority:")
    lines.append(f"  role: {authority['role']}")
    lines.append(f"  name: {authority['name']}")
    lines.append(f"  validated_by: {authority['validated_by']}")
    lines.append("")
    lines.append("tags: []  # TODO manual: usar vocabulario cerrado §3 del SCHEMA")
    lines.append("")
    lines.append("cards_explicit: []  # TODO manual: declarar cartas con folio + role")
    lines.append("")
    if refs:
        lines.append("rulebook_refs:")
        for ref in refs:
            lines.append(f"  - {ref}")
    else:
        lines.append("rulebook_refs: []  # TODO: buscar refs pXX/bYY")
    lines.append("")
    if derived:
        lines.append("derived_from:")
        for d in derived:
            lines.append(f"  - {d}")
    else:
        lines.append("derived_from: []")
    lines.append("supersedes: []  # TODO: si reemplaza versiones anteriores")
    lines.append("related: []  # TODO manual: IDs conectados temáticamente")
    lines.append("---")
    lines.append("")
    return "\n".join(lines)


def split_into_rulings(content):
    """
    Divide el archivo en (preamble, [(ruling_id, ruling_title, ruling_text), ...], postamble).

    Un ruling empieza con `## Xnn.` o similar, y termina cuando empieza el siguiente `## Xnn.` o un `## ` que no sea ruling.
    """
    lines = content.split("\n")
    preamble_lines = []
    ruling_blocks = []
    current_id = None
    current_title = None
    current_lines = []
    in_preamble = True

    for line in lines:
        match = RULING_HEADER_RE.match(line)
        if match:
            # Guardar el anterior si había
            if current_id is not None:
                ruling_blocks.append((current_id, current_title, "\n".join(current_lines)))
            elif in_preamble:
                pass  # preamble ya guardado
            current_id = match.group(1).strip()
            current_title = match.group(2).strip()
            current_lines = [line]
            in_preamble = False
        else:
            if in_preamble:
                preamble_lines.append(line)
            else:
                current_lines.append(line)

    # Guardar el último
    if current_id is not None:
        ruling_blocks.append((current_id, current_title, "\n".join(current_lines)))

    return "\n".join(preamble_lines), ruling_blocks


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", default="docs/rulebook-source-of-truth/rulings-v5.1.md")
    parser.add_argument("--output", default="docs/rulebook-source-of-truth/rulings-v5.1-draft.md")
    parser.add_argument("--dry-run", action="store_true", help="Imprime solo el primer ruling con frontmatter")
    parser.add_argument("--limit", type=int, default=None, help="Limitar a N rulings (para pruebas)")
    args = parser.parse_args()

    input_path = Path(args.input)
    if not input_path.is_absolute():
        # Asumir que estamos corriendo desde el repo root
        repo_root = Path(__file__).resolve().parent.parent
        input_path = repo_root / args.input

    if not input_path.exists():
        print(f"❌ No existe: {input_path}", file=sys.stderr)
        sys.exit(1)

    content = input_path.read_text(encoding="utf-8")
    preamble, rulings = split_into_rulings(content)

    print(f"📊 Detectados {len(rulings)} rulings en {input_path.name}", file=sys.stderr)

    if args.dry_run:
        if not rulings:
            print("No se detectó ningún ruling.", file=sys.stderr)
            sys.exit(1)
        rid, title, text = rulings[0]
        fm = generate_frontmatter(rid, text)
        print(f"=== Primer ruling: {rid}. {title} ===")
        print(fm)
        print(text[:500])
        print("...")
        sys.exit(0)

    output_parts = [preamble]
    count = 0
    for rid, title, text in rulings:
        if args.limit and count >= args.limit:
            output_parts.append(text)
            count += 1
            continue
        fm = generate_frontmatter(rid, text)
        output_parts.append(fm + text)
        count += 1

    output_path = Path(args.output)
    if not output_path.is_absolute():
        repo_root = Path(__file__).resolve().parent.parent
        output_path = repo_root / args.output

    output_path.write_text("\n".join(output_parts), encoding="utf-8")
    print(f"✅ Generado: {output_path}", file=sys.stderr)
    print(f"   Rulings procesados: {count}", file=sys.stderr)


if __name__ == "__main__":
    main()
