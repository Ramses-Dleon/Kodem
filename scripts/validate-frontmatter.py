#!/usr/bin/env python3
"""
validate-frontmatter.py

Validador estructural del canon rulings-v5.1.md. Pensado como pre-commit hook
y como herramienta de auditoría ocasional.

Checks:
  1. Cada ruling tiene frontmatter parseable (---...---).
  2. IDs únicos (no duplicados).
  3. Types en set válido: meta-regla, aclaracion, ruling-carta, errata, faq.
  4. authority.role en set válido.
  5. Tags del vocabulario cerrado (§3 del SCHEMA.md).
  6. Referential integrity: derived_from / related / supersedes apuntan a
     IDs existentes (tolerando referencias parciales que matchean el prefijo).
  7. Campos obligatorios presentes: id, type, status, authority.

Uso:
  python3 scripts/validate-frontmatter.py [--file <path>] [--strict]

Exit codes:
  0: OK (warnings permitidas salvo --strict)
  1: errores estructurales
  2: vocabulario de tags violado en modo --strict
"""
import argparse
import re
import sys
from pathlib import Path
from collections import Counter, defaultdict


def parse_frontmatter_blocks(text):
    """Split por --- y extraer bloques de frontmatter YAML.
    Un bloque es frontmatter si contiene 'id:' y 'type:'.
    """
    rulings = []
    blocks = re.split(r'^---$', text, flags=re.MULTILINE)
    for block in blocks:
        if 'id:' not in block or 'type:' not in block:
            continue

        data = {
            'tags': [],
            'cards_explicit': [],
            'derived_from': [],
            'related': [],
            'supersedes': [],
            'validated_by': [],
        }

        for line in block.split('\n'):
            stripped = line.strip()
            # Top-level scalar fields (no indent)
            if not line.startswith(' '):
                m = re.match(r'^([a-z_]+): (.+)$', stripped)
                if m:
                    k, v = m.group(1), m.group(2).strip()
                    if k in ('id', 'canonical_id', 'type', 'status', 'status_method',
                             'date_created', 'date_revised', 'parent', 'version',
                             'display_id'):
                        data[k] = v
            # Indented under authority:
            m = re.match(r'^  (role|name): (.+)$', line)
            if m:
                k, v = m.group(1), m.group(2).strip()
                data[f'authority_{k}'] = v

        # Inline list fields: tags: [a, b, c]
        for field in ('tags', 'derived_from', 'related', 'supersedes'):
            m = re.search(rf'^{field}: \[(.*?)\]', block, re.MULTILINE)
            if m and m.group(1).strip():
                items = [t.strip() for t in m.group(1).split(',')]
                data[field] = [i for i in items if i]

        # validated_by: [X, Y]
        m = re.search(r'validated_by: \[(.*?)\]', block)
        if m and m.group(1).strip():
            data['validated_by'] = [t.strip() for t in m.group(1).split(',')]

        if 'id' in data:
            rulings.append(data)

    return rulings


def load_vocab_tags(schema_path):
    """Extrae vocabulario cerrado §3 del SCHEMA.md."""
    if not schema_path.exists():
        return set()
    schema = schema_path.read_text()
    # Find section "## 3." through next "## "
    m = re.search(r'## 3\..*?(?=^## |\Z)', schema, re.MULTILINE | re.DOTALL)
    if not m:
        return set()
    section = m.group()
    # All backtick-quoted tokens
    return set(re.findall(r'`([a-z-]+)`', section))


def validate(rulings, vocab_tags, strict=False):
    errors = []
    warnings = []

    all_ids = {r['id'] for r in rulings}

    # Check 1: IDs únicos
    id_counts = Counter(r['id'] for r in rulings)
    for rid, count in id_counts.items():
        if count > 1:
            errors.append(f"DUPLICATE_ID: '{rid}' aparece {count} veces")

    # Check 2: types válidos
    valid_types = {'meta-regla', 'aclaracion', 'ruling-carta', 'errata', 'faq', 'duda'}
    for r in rulings:
        t = r.get('type')
        if t not in valid_types:
            errors.append(f"INVALID_TYPE: {r['id']} tiene type='{t}'")

    # Check 3: authority.role válidos
    valid_roles = {'autor', 'juez', 'comunidad', 'logos-derivado', 'evidencia-textual'}
    for r in rulings:
        role = r.get('authority_role')
        if role and role not in valid_roles:
            errors.append(f"INVALID_ROLE: {r['id']} tiene role='{role}'")

    # Check 4: tags vocabulario
    unknown_tags = defaultdict(list)
    for r in rulings:
        for tag in r.get('tags', []):
            if tag and tag not in vocab_tags:
                unknown_tags[tag].append(r['id'])

    level = errors if strict else warnings
    for tag, ids in sorted(unknown_tags.items()):
        level.append(f"UNKNOWN_TAG: '{tag}' usado en {ids}")

    # Check 5: referential integrity
    for r in rulings:
        for field in ('derived_from', 'related', 'supersedes'):
            for ref in r.get(field, []):
                if not ref:
                    continue
                if ref in all_ids:
                    continue
                # Accept prefix match (D33 → D33 residual, M2 → M2.3, etc.)
                prefix_match = any(
                    existing.startswith(ref + ' ') or existing.startswith(ref + '.')
                    or existing == ref + 'b' or existing == ref + 'c'
                    or existing == ref + '-ext' or existing == ref + ' v2'
                    for existing in all_ids
                )
                if prefix_match:
                    warnings.append(f"LOOSE_REF: {r['id']}.{field} → '{ref}' (matcheado por prefijo)")
                else:
                    errors.append(f"BROKEN_REF: {r['id']}.{field} → '{ref}' (no existe)")

    # Check 6: campos obligatorios
    required = ['id', 'type', 'status', 'authority_role']
    for r in rulings:
        for field in required:
            if field not in r or not r[field]:
                errors.append(f"MISSING_FIELD: {r.get('id', '?')} falta '{field}'")

    return errors, warnings


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--file", default="docs/rulebook-source-of-truth/rulings-v5.1.md")
    parser.add_argument("--schema", default="docs/rulebook-source-of-truth/SCHEMA.md")
    parser.add_argument("--strict", action="store_true",
                        help="Tratar warnings como errores (exit 2 si hay tags desconocidos)")
    parser.add_argument("--quiet", action="store_true",
                        help="Sólo reportar errores, no warnings")
    args = parser.parse_args()

    canon_path = Path(args.file)
    if not canon_path.exists():
        print(f"ERROR: {canon_path} no existe", file=sys.stderr)
        sys.exit(1)

    text = canon_path.read_text()
    rulings = parse_frontmatter_blocks(text)
    vocab = load_vocab_tags(Path(args.schema))

    print(f"📋 Validando {canon_path}")
    print(f"   Rulings detectados: {len(rulings)}")
    print(f"   Vocabulario de tags: {len(vocab)} válidos")
    print()

    errors, warnings = validate(rulings, vocab, strict=args.strict)

    if errors:
        print(f"❌ {len(errors)} ERRORES:")
        for e in errors:
            print(f"   {e}")
        print()

    if warnings and not args.quiet:
        print(f"⚠️  {len(warnings)} WARNINGS:")
        for w in warnings[:30]:
            print(f"   {w}")
        if len(warnings) > 30:
            print(f"   ... y {len(warnings) - 30} más")
        print()

    # Stats resumidas
    types = Counter(r.get('type', 'NONE') for r in rulings)
    roles = Counter(r.get('authority_role', 'NONE') for r in rulings)
    print("📊 Distribución:")
    print(f"   types: {dict(types)}")
    print(f"   authority: {dict(roles)}")

    if errors:
        sys.exit(1)
    print("\n✅ Validación OK")
    sys.exit(0)


if __name__ == "__main__":
    main()
