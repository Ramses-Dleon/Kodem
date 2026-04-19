# Audit A: effect_text de cards.json vs engine vs rulings v5.1

**Fecha:** 2026-04-19 ~18:10 UTC
**Auditor:** Subagente Logos (Opus 4.7) — audit-A-effect-text
**Cartas analizadas:** 1074
**Cartas con effect_text no trivial:** 1068
**Cartas verdaderamente lore/TBA/vacías:** 6

> ⚠️ Este documento es análisis estático. Cubrí el catálogo en una sola pasada y muestreé 50+ cartas con deep-dive. No modifiqué código. Los heurísticos de "IMPL / PARTIAL / MISSING" son *cobertura de patrón*, no prueba de corrección semántica.

---

## Resumen ejecutivo

| Categoría | Cartas | % |
|---|---|---|
| **IMPL** (engine tiene handler de patrón o folio-específico) | 1,065 | 99.2% |
| **PARTIAL** (cobertura parcial / aproximación) | 2 | 0.2% |
| **MISSING** (sin handler reconocible) | 1 | 0.1% |
| **TRIVIAL** (lore puro, `TBA`, vacío) | 6 | 0.5% |

### Fortalezas detectadas
- **42 folios con handler folio-específico** en `effects.py` (DOOC-002, FYTE-023/029/054/058/063/065/066/070/071/072, IDRMG-022, KPRC-014/050, LGRO-025/030/045/054/062/067/077, MLBU-006, RAMI-005S/011/016/017, TCDE-001/008, etc.).
- Sistema de patrones con **355 regex** y **117 `'x' in text`** checks — cobertura amplia por idiomas del juego.
- Gates universales por `cost_text` (extinción count, Adendei count, Ixim count, campo+extinción combinado).
- Zona `out_of_game` ya declarada estructuralmente en `types.py` (D5/D18).

### Debilidades críticas detectadas
1. **Fuera de Juego (D5) tiene zona pero sin handler**: Quam (TCOO-006U/081, TCEO-006U/081) no resuelve bidireccionalidad en `effects.py`.
2. **Copy Effect chain**: el fallback `Z15_COPY` sólo emite `"complex effect approximated"` → efecto **no se materializa** sobre state. Afecta 9 cartas copiadoras.
3. **Posesión de Espectros (D21/D22/D34/D35)**: ninguna función `vivify_atomic` / `possess_handler` visible; sólo Tlahuelpuchi (FYTE-023) aparece como folio ref. Los 13 Espectros con `Requisito: N Adendei [Nombre] en Extinción` dependen de gates — OK — pero la mecánica atómica de vivificación D21 parece implementada sólo implícitamente.
4. **Cards con `effect_type: Ninguno` pero `effect_text: "Requisito: ..."`** (13 Espectros + FAFT-003/KPRC-028 Zagal): engine usa `cost_text` gates pero el `effect_text` mismo arranca con "Requisito" — inconsistencia de modelo de datos (debería ir a `cost_text`).
5. **Carta con `TBA` en producción**: `KPRC-020 Jane Dalgood, Capitana` (Protector). Bloqueante si entra a tornear.
6. **Texto ilegal / roto**: `INMX-001 Kopit y Jokokan, Libertad`: `effect_type: Pasiva` pero `effect_text: "Activa: Cyra gasta 6 puntos a un Adendei aliado."` — usa verbo inexistente ("Cyra gasta") y contradicción tipo/prefix.
7. **Cartas con lore en effect_text**: `IDRMA-023 Rot`, `IDRMG-023 Ixim`, `IDRMP-023 Adendei` — son fichas de especie, no cartas jugables, pero ocupan espacio y enturbian tooling.
8. **Erratas tipográficas productivas**: `ccon` (IDRMA-007), `Pricipal` (FYTE-038), `carta aliadas` (FYTE-001K/019), `retorna a a la Zona` (PASE-005), `añn` en varias.

---

## Top 20 findings priorizados

| # | Folio | Carta | effect_text (extracto) | Severidad | Esfuerzo | Acción sugerida | Ref ruling |
|---|---|---|---|---|---|---|---|
| 1 | `KPRC-020` | Jane Dalgood, Capitana (Protector) | `TBA` | 🔴 | S | Completar diseño antes de print/torneo. Si ya se imprimió, publicar errata oficial. | — |
| 2 | `TCOO-006U`/`-081` + `TCEO-006U`/`-081` | Quam, Detrás de la Materia | "...colócala fuera del juego... regresar 1 Adendei al fondo de tu Mazo y colocar la carta fuera del juego en su lugar con 6 ptos. de vida" | 🔴 | L | Implementar handler bidireccional Quam (push to `out_of_game`, pull back con 6 HP, persistencia del efecto post-extinción). Zona ya existe en types. | D5, D17, D18 |
| 3 | `INMX-001` | Kopit y Jokokan, Libertad | `effect_type: Pasiva` vs `effect_text: "Activa: Cyra gasta 6 puntos..."` | 🔴 | S | Errata urgente: el texto no es parseable (verbo "gasta" + sujeto "Cyra" desconocido). Reescribir o declarar carta histórica no-torneo. | — |
| 4 | `CMFT-004`, `DOOC-003S`/`-011`, `FAFT-003`/`KPRC-028`, `RAMI-007S`/`-021`, `TCOO-035`/`TCEO-035`, `FYTE-048`/`-ST1` | Copiadoras (9 cartas) | "Copia el efecto y costo de..." | 🔴 | L | `Z15_COPY` hoy sólo logea; implementar resolución real: recursión a `resolve_effect` con el texto de la carta copiada, gates de copyable y reentrancy protection. TCOO-035 y RAMI-007S ya tienen handler específico (W1a/X3). Resto cae al fallback aproximado. | FAQ-07, D16 |
| 5 | `FYTE-007R`/`-023` | Tlahuelpuchi, Invocación Espectral | "Los Espectros aliados no envían a Extinción al Adendei poseído..." (parte no citada arriba) | 🔴 | M | Verificar que el handler Tlahuelpuchi respete D21 (vivificación atómica) y D22 (no herencia de stats). | D21, D22, D34, D35 |
| 6 | `FYTE-033` | Enis, Transmisión de Poder | "...ese Adendei se considerará Adendei Catrín mientras esté en el campo... Solo puedes usar esta Activa una vez por juego." | 🟡 | M | Engine tiene `once_per_game_limit` + `effects_used_game` pero el re-tipado *subtype* durante ciclo de vida del Adendei aliado (no de la propia carta) requiere validación. | D7, D28 |
| 7 | `KPRC-018` | Zaykan, Cambio de Energía | "...todos los Adendei rivales serán considerados ese tipo de Energía hasta el final del turno. Activa: Esta carta puede atacar a Adendei rivales con el mismo tipo de Energía." | 🟡 | M | Re-tipado de energía temporal afecta targeting — confirmar que filtros por energía (`_is_pirico` etc.) respetan overrides de estado. | D1 |
| 8 | `IDRMP-022`, `RAMI-007`, `RMR-017` | Xakros, Peste | "Todos los Adendei en el campo reciben descansos iguales a los indicados en su respectiva carta." | 🟡 | S | Verificar handler usa `base_rests` (valor impreso) y NO `current rests`. | M6 |
| 9 | `IDRMP-017` | Baobab, Inmortal | "Ningún Adendei en campo puede ser curado." | 🟡 | M | Aura global restrictiva — confirmar que bloquea heals from ALL sources, incluyendo self-heal por pasivas. | — |
| 10 | `DOOC-006` | Necroalga Abisal | "Las cartas en tu Zona Principal no pueden ser dañadas por efectos." | 🟡 | M | Aura local restrictiva sobre `DMG_EFFECT` (no `DMG_ATTACK`). Verificar que `_apply_typed_damage` la respeta cuando `dmg_type==DMG_EFFECT`. | §9 damage types |
| 11 | `IDRMG-016` | Nanuk, Fiereza Kósmica | "Esta carta no puede recibir marcas." | 🟡 | S | Verificar `_safe_add_mark` rechaza por pasiva flag, no sólo por tipo de carta. | §7, M6 |
| 12 | `IDRMP-005` | Tzun, Mensajero Celestial | "Esta carta no puede recibir descansos por efectos." | 🟡 | S | Verificar `_safe_add_rests` con flag `by_effect=True` es bloqueado. | D6 |
| 13 | `CAMP-0007UV` | Virste, Reseteo | "Regresa las estadísticas de todas las cartas en el campo a su valor original." | 🟡 | M | Requiere reset de `damage_bonus`, marks, bonos de subtipo — confirmar handler completo (M14). | M14, D30 |
| 14 | `DOOC-003` | Tarus, Equilibrio Vital | "Remueve todas las marcas en el campo." | 🟡 | S | AoE mark-removal sobre ambos lados — verificar que envenenar/quemar/abismar se limpian en todas las cartas. | §7 |
| 15 | `LGRO-004U`/`-057`, `TRWA-004U`/`-057` | Hog, Terremoto | "Los Adendei-Lítico aliados no pueden ser atacados por cartas frente a ellos." | 🟡 | M | Restricción de targeting por posición (adjacency) + filtro subtipo. Confirmar `_check_facing` se combina con restricción pasiva. | M11 |
| 16 | `FYTE-064` | Establo Morfeico (Bio) | "daña a 1 Adendei rival de 1 a 6 ptos. de acuerdo al número total de Adendei Equino aliados revelados" | 🟡 | M | Bio con escala condicional 1→1, 2→3, 3→6 pts. Confirmar handler maneja tabla de valores (NO linear). | — |
| 17 | `FYTE-003S`/`-012` | Anton, Escuadro Catrín | "Daña a 2 Adendei rivales la misma cantidad de ptos. de daño que el Adendei vinculado." | 🟡 | M | Efecto lee *base_damage* del Adendei vinculado al Protector aliado — verificar dirección correcta del vínculo. | D32, M14 |
| 18 | `FYTE-006` | Tlite, Cráneo Ornamental | "Si el rival declara 4 ptos. o más de daño, redistribuye como quieras el total..." | 🟡 | L | Handler `redistribute_damage=True` setea flag (Q3 bloque W2.4/Q3) — pero la *resolución real* del flag en el pipeline de ataque requiere confirmación. | FAQ-06 |
| 19 | `FYTE-005S`/`-032` | Zotz, Videncia Vital | "Muestra las 3 cartas del tope del Mazo rival... No se podrán usar efectos de cartas tomadas por el resto del turno." | 🟡 | M | Requiere flag temporal `opp_drawn_cards_effects_disabled` que interactúa con M4 (HandTraps). | M4 |
| 20 | `KPRC-110` | Zaykan, Dominio Vegetal | "Mientras esta carta esté en el campo, ningún equipo puede dejar el campo ni cambiar de carta equipada por efectos." | 🟡 | M | Aura global sobre zona de equipos — verificar bloquea `equip_remove`, `equip_swap`, y `equip_destroy`. | — |

---

## Detalles por categoría

### Categoría 1: Efectos con handlers aproximados (PARTIAL/genéricos)

Estos NO son efectivamente funcionales — emiten eventos cosméticos pero no mutan state:

| Folio | Carta | Problema |
|---|---|---|
| `Z15_COPY` generic | Cualquier "copia la pasiva/efecto" que no matchea W1a/X3 | Emite `"Z15_COPY: complex effect approximated"` y retorna sin resolver. |
| `Z23_KEYWORD` fallback | Cualquier texto con `descanso/protege/oculta/revela/vivific/retorna/descien/token` no ya capturado | Sólo registra `Z23_KEYWORD: <flag> registered` sin acción. |
| `UNRESOLVED` | Cualquier texto que no matcheó NADA (línea 6600) | `events.append(f"UNRESOLVED: {effect_text[:60]}")` |

**Acción:** Recomendable instrumentar test que ejecute `resolve_effect` sobre las 1,068 cartas no-triviales y cuente cuántas terminan en `Z15_COPY`, `Z23_KEYWORD` o `UNRESOLVED`. Es el KPI más directo de cobertura real.

### Categoría 2: Inconsistencias con rulings cerrados

| # | Carta | Inconsistencia | Ruling |
|---|---|---|---|
| 2.1 | **Quam (4 variantes)** | Texto dice "aún si esta carta ya no está en el campo" — crea excepción a p25/b06 (efectos no persisten post-extinción). D17 ya reconoce esto como excepción legítima, pero el engine carece de soporte estructural para efectos "flotantes" tras extinción. | D5, D17, D18 |
| 2.2 | **FYTE-048/ST1 Ruk, Espectro Draconiano** | `effect_type: Pasiva` pero el texto empieza con `"1 o más Rava en tu Extinción."` — estructura típica de `cost_text` mezclada con `effect_text`. | M4, D7 |
| 2.3 | **13 Espectros FYTE** (Ariam/Aki/Yakerr/Zaykan/Xilan/Nanuk variantes) | Tienen `effect_type: Ninguno` pero `effect_text: "Requisito: N o más Adendei '[Nombre]' en tu Extinción."` — requisito está mal ubicado (debería ser `cost_text`). | D20, D21 |
| 2.4 | **FYTE-001K/019 Yeoce + FYTE-003R/016 Omekis + KPRC-019 Zaren (y 4 variantes más)** | Efectos menu "Usa 1 de los siguientes efectos" — FAQ oficial no fija ruling canónico de orden / obligatoriedad de declarar la elección antes de ver resultado. | Pendiente FAQ-NEW |
| 2.5 | **FYTE-038 Xilan, Desde el Más Allá** | `effect_type: Pasiva-Rápida` interactúa con M4 (HandTraps) — si rival usa efecto de carta tomada, esta carta reacciona. Confirmar que cadena no viola FAQ-03 (ataques negados) y FAQ-07 (negación de Pasivas). | M4, FAQ-03, FAQ-07 |
| 2.6 | **CAMP-0021 Nok, Deidad Gélida** | "Los Adendei rivales reciben 1 descanso adicional al atacar o usar Activa **por primera vez después de vincularse**" — ambigüedad: ¿cuenta reset tras desvinculación? Sin ruling. | Pendiente |
| 2.7 | **FYTE-064 Establo Morfeico** (Bio) | Contador de "revelados durante este turno" — debe limpiarse al inicio del turno. FAQ-07 aclara que cartas negadas no disparan sus pasivas, pero ¿cuentan como "reveladas" para triggers externos? Confirmar. | FAQ-07 |
| 2.8 | **IDRMA-007 Zaren, El Inicio del Viaje** | Texto: `"ccon 6 puntos de vida"` (errata tipográfica). Además, "cura a 6 puntos todos tus Adendei aliados" — ¿respeta cap de vida máxima por tipo? | D24 |
| 2.9 | **BETA-001 Ariam, Dualidad** | Carta histórica pieza de colección — D23 dice "no es legal en torneo". Confirmar engine NO carga BETA-001 en mazos legales (o devuelve error). | D23 |

### Categoría 3: Ambigüedades que requieren nueva ruling

| # | Mecánica | Cartas afectadas | Pregunta |
|---|---|---|---|
| 3.1 | **Copy chain recursion depth** | CMFT-004, DOOC-003S/-011, TCOO-035, RAMI-007S/-021, FAFT-003, KPRC-028, FYTE-048/ST1 | Si carta A copia efecto de carta B, y B a su vez copia de C, ¿se ejecuta C o se corta la cadena? No hay ruling. Recomendado: max depth = 1 (sólo copia de "hojas"). |
| 3.2 | **Copy + costo del objetivo** | Mismas cartas | Al copiar "efecto y costo", ¿debe pagarse el costo del objetivo copiado, del lanzador, o de ambos? Textos ambiguos. |
| 3.3 | **Zotz Videncia + HandTraps (M4)** | FYTE-005S/-032 | Si Zotz muestra cartas del mazo rival, ¿M4 (HandTraps pasivas al ser tomadas) se activa? Texto dice "No se podrán usar efectos de cartas tomadas" — pero HandTraps son pasivas automáticas. Conflicto potencial. |
| 3.4 | **Xilan Desde el Más Allá — timing** | FYTE-038 | "Si el rival usa 1 efecto de 1 carta tomada, coloca esa carta en la Zona Principal rival enviando 1 Adendei de la Zona Principal rival al fondo del Mazo." ¿Se ejecuta antes o después del efecto rival? ¿Se puede responder con Activa-Rápida propia? |
| 3.5 | **Zaren Unión "Zona Principal original"** | KPRC-019 y 4 variantes | M2.4 menciona "Zona Principal original" para Ariam Resurrección. ¿Aplica la misma definición? Confirmar. |
| 3.6 | **PASE-005 Carga Arsenal — persistencia** | PASE-005 | "Esta Activa debe cumplirse aun si esta carta deja el campo." — similar a Quam D17. ¿Engine soporta efectos diferidos tras extinción? |
| 3.7 | **KPRC-110 Zaykan Dominio Vegetal — FYTE-007S Marok** | Ambas | Ambas aura-bloquean cambios de equipo. ¿Se acumulan? ¿Una cancela a otra? Sin ruling. |
| 3.8 | **FYTE-033 Enis Transmisión — duración del re-tipado** | FYTE-033 | "Ese Adendei se considerará Adendei Catrín mientras esté en el campo." — pero Enis se va a Extinción como costo. ¿Persiste el efecto? Dice que sí ("mientras esté en el campo [el aliado]"). Confirmar contra p25/b06. |
| 3.9 | **KPRC-018 Zaykan Cambio de Energía — stacking** | KPRC-018 | Si se usa dos veces en el mismo turno (dos copias), ¿se sobrescribe la energía o se acumulan? Sin ruling. |
| 3.10 | **IDRMP-022 Xakros, Peste — aplicación a Espectros** | IDRMP-022 | M6 aclara "descansos indicados" = valor base impreso, pero D38 aplicó cap 2 a Espectros. ¿Un Espectro con valor base 3 impreso recibe 3 o 2 (cap)? Lectura estricta: 3 aplica pero cap 2 lo frena al aplicarlo. Confirmar. |

---

## Sugerencias de fix al engine (específicas)

### Fix 1: Resolver `Z15_COPY` real (no aproximación)

**Signature propuesta:**
```python
def _resolve_copy_effect(
    state,
    source_key: str,
    source_pos: int,
    target_folio: str,
    target_zone: str,  # 'extinction', 'field', 'deck_top'
    copy_scope: str,   # 'activa', 'pasiva', 'efecto_y_costo'
    opts: dict,
    _depth: int = 0,
) -> tuple:
    """Resolve copy-effect by recursing into resolve_effect with target's text.
    Depth-limited to prevent infinite recursion (A copies B copies A)."""
    if _depth > 1:
        return state, [f"COPY_DEPTH_LIMIT: refused recursion beyond depth 1"]
    from .cards import get_card
    target_card = get_card(target_folio)
    if not target_card or not target_card.effect_text:
        return state, [f"COPY_NO_TARGET: {target_folio}"]
    # Build effect_text slice by scope
    et = target_card.effect_text
    # Recurse
    opts_copy = {**opts, 'copied': True, '_copy_depth': _depth + 1}
    return resolve_effect(state, et, source_key, source_pos, opts_copy)
```
Ubicar en el bloque Z15 actual, reemplazando el log cosmético. Cubre 7 de las 9 cartas que hoy caen al fallback (TCOO-035 y RAMI-007S ya tienen handler específico W1a/X3).

### Fix 2: Handler estructural para Quam (Fuera de Juego bidireccional)

**Signature propuesta:**
```python
def _handle_quam_ooj_passive(state, source_key: str, source_pos: int, opts: dict) -> tuple:
    """Quam (TCOO-006U/081): reveal top of deck → out_of_game.
    If Protector available + opts.chosen_swap: return Adendei in ZP to bottom of deck,
    bring OOJ card to that slot with 6 HP. Effect persists post-extinction (D17)."""
    # ... revelación, movimiento de zona, restauración atómica de HP, persistencia flag
```
Requiere también flag `effect_persists_post_extinction` en `FieldCard` o `PlayerState` para cumplir D17.

### Fix 3: Consistencia de modelo de datos en Espectros FYTE

**No es fix de código sino de datos.** Mover los 13 Espectros con `effect_text` que arranca con "Requisito:" → migrar ese texto a `cost_text` y dejar `effect_text` vacío o con la pasiva real (si tiene). 

**Folios afectados:** FYTE-003K, FYTE-005U, FYTE-013R, FYTE-014R, FYTE-015R, FYTE-046, FYTE-047, FYTE-049, FYTE-050, FYTE-051, FYTE-052, KPRC-065, KPRC-067.

Script propuesto:
```python
# scripts/fix-espectro-requisitos.py
import json
with open('cards.json') as f:
    cards = json.load(f)
for c in cards:
    et = (c.get('effect_text') or '').strip()
    if c['type'] == 'Espectro' and et.lower().startswith('requisito:') and not c.get('cost_text'):
        c['cost_text'] = et
        c['effect_text'] = ''
        c['effect_type'] = ''
with open('cards.json','w') as f:
    json.dump(cards, f, ensure_ascii=False, indent=2)
```
Validar después que tests pasen (488/488).

### Fix 4: Reset de stats base (Virste Reseteo, M14)

**Signature:**
```python
def _reset_card_to_base_stats(state, player_key: str, pos: int) -> list[str]:
    """M14/D30: reset to 'original' stats (printed damage/hp/rests).
    Clears: damage_bonus, marks, subtype_bonuses, effect_flags.
    Preserves: position, revealed state, folio identity."""
```
Importante para Virste (CAMP-0007UV) y cualquier otra mecánica similar.

### Fix 5: Flags de aura/restricción faltantes

Agregar a `FieldCard` o `PlayerState`:
- `cannot_be_healed_aura: bool` (Baobab IDRMP-017)
- `cannot_receive_marks: bool` (Nanuk IDRMG-016)
- `cannot_receive_rests_by_effect: bool` (Tzun IDRMP-005)
- `cannot_be_damaged_by_effects: bool` (Necroalga DOOC-006 — sobre ZP del jugador)
- `equips_locked_on_field: bool` (Zaykan Dominio Vegetal KPRC-110 + Marok FYTE-007S/041)

Cada uno como condición en los helpers existentes (`_safe_heal`, `_safe_add_mark`, `_safe_add_rests`, `_apply_typed_damage`).

### Fix 6: TBA y cartas rotas

- `KPRC-020 Jane Dalgood` → marcar `tournament_legal: false` hasta publicar errata oficial.
- `INMX-001 Kopit y Jokokan` → mismo tratamiento.
- `KPRC-033 Retis, Nado Prehistórico` → `effect_text: ''` pero `effect_type: Ninguno` sin `cost_text` tampoco. Validar si es lore-only o falta texto.

### Fix 7: Instrumentar coverage real

Agregar test batch:
```python
# tests/test_effect_coverage.py
def test_all_cards_resolve_without_unresolved():
    from kodem_engine.cards import ALL_CARDS
    from kodem_engine.effects import resolve_effect
    from kodem_engine.types import make_empty_state  # helper needed
    unresolved = []
    for card in ALL_CARDS:
        if not card.effect_text: continue
        state = make_empty_state()
        _, events = resolve_effect(state, card.effect_text, 'p1', 0, {})
        if any('UNRESOLVED' in e or 'Z15_COPY:' in e or 'Z23_KEYWORD:' in e for e in events):
            unresolved.append(card.folio)
    assert len(unresolved) < 20, f"Too many unresolved: {unresolved}"
```
Esto da un número concreto de cobertura REAL vs mi heurístico.

---

## Apéndice: cartas verdaderamente TRIVIAL/lore-only

| Folio | Nombre | Razón |
|---|---|---|
| `CUSTOM-002` | Tzun, Catrin | `effect_text` vacío, `effect_type: ''` |
| `CUSTOM-005` | Ninuh, Plumas Hipnóticas | Vacío |
| `CUSTOM-006` | Tzun, Propuesta | Vacío |
| `KPRC-033` | Retis, Nado Prehistórico | Vacío |
| `IDRMA-023` | Rot | Ficha de especie (lore) |
| `IDRMG-023` | Ixim | Ficha de especie (lore) |
| `IDRMP-023` | Adendei | Ficha de especie (lore) |
| `KPRC-035` | Turix vs Chapalab, Enfrentamiento Insectoide | `effect_text: "Dos grandes colosos del carbonífero enfrentados cara a cara."` — lore puro en carta jugable, bug de datos probable. |

---

## Apéndice: diff de datos propuesto (resumen)

- Migrar 13 Espectros FYTE: `effect_text (Requisito)` → `cost_text`
- Marcar como no-torneo: `KPRC-020`, `INMX-001`, `BETA-001`
- Resolver lore-en-effect: `IDRMA-023`, `IDRMG-023`, `IDRMP-023`, `KPRC-035` → mover a `lore_text` si ya no existe ahí
- Completar o remover: `CUSTOM-002`, `CUSTOM-005`, `CUSTOM-006`, `KPRC-033`

---

## Notas de metodología

- Análisis ejecutado con Python scripts ad-hoc sobre `cards.json` (1 pasada) y `effects.py` (grep + regex extraction).
- Clasificación IMPL/PARTIAL/MISSING es **optimista** (asume handler coverage si keyword aparece en src). La métrica real de cobertura requiere corrida del test propuesto en Fix 7.
- No se ejecutaron tests del engine ni se modificó código.
- Rulings v5.1 leídos: D1, D3, D5-D10, D13-D35, M1-M14, FAQ-01..08. No todos fueron citados; sólo los conectados a findings específicos.

---

_Fin del reporte._
