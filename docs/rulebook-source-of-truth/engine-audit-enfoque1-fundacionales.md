# Engine Audit — Enfoque 1: Reglas Fundacionales (§1–§5)

**Fecha:** 2026-04-19 (sesión 08:30 UTC)
**Auditor:** Logos (sub-agente, kodem-engine-audit-enfoque1-fundacionales)
**Scope:** `/home/coder/codice-kodem/api/kodem_engine/engine.py` (3,299 LoC) · `types.py` (237 LoC) · `cards.py` (150 LoC) · `effects.py` (6,965 LoC, solo cross-ref)
**Rulebook:** master-rulebook v5.1 · rulings-v5.1.md · rulings-v5.1-addendum-faq-oficial.md
**Alcance:** §1 Generalidades · §2 Componentes de la carta · §3 Tipos de carta · §4 Preparación del ecosistema · §5 Turno y fases
**Modo:** SOLO-LECTURA. Tests baseline 436/436 PASS — no se modificó código.

---

## 1. Resumen ejecutivo

1. **Zona "Fuera del Juego" no existe en el engine.** D5 y D18 exigen una zona real, inspeccionable, con flujo bidireccional (Quam, TCOO-006U). El engine sólo usa el tag `"removed from game"` en eventos de log sin almacenamiento persistente. Quam no tiene implementación específica. *Gap estructural.*
2. **Muerte de Espectros viola D34 y §3.7/p14/b19.** El engine envía los Espectros a `"REMOVED FROM GAME"` (no `extinction`) y descarta silenciosamente al Adendei poseído. El rulebook oficial (p14/b19) + D21 + D34 dictan que **la carta poseída regresa a su tipo/subtipo original y va a Extinción**, y que ambas cartas cuentan al tracker de victoria. *Bug de conteo de victoria con severidad alta.*
3. **Mecánica de posesión invertida respecto a D21.** `apply_action` con `type='possess'` (engine.py:2745) sacrifica un Adendei **en el campo** y lo manda a Extinción, reemplazando por tercia. D21 (ruling Ramsés) establece lo inverso: se **vivifica desde Extinción** bajo el Espectro (stack físico). Hay **tensión textual** entre p14/b16 bullet 3 (rulebook literal) y D21 (ruling autorizado). Se documenta sin juzgar — pendiente de ruling unificador.
4. **`give_rests_by_effect` (engine.py:320) es código legacy con semántica incorrecta vs. D6.** Limita "+rests por efecto" a máximo 1 (Adendei) / 2 (Protector) por invocación. D6 establece caps totales por tipo (2 / 3), no caps por efecto. La función **no se usa** en el flujo actual (effects.py usa `_safe_add_rests` y `min(ADENDEI_MAX_RESTS, ...)` correctamente), pero sigue declarada y exportada. *Tech debt confuso.*
5. **Subtipos múltiples (E8) no están migrados en el engine.** `types.py::Card.subtype: Optional[str]` es un solo string. cards.json migró a `subtypes: [primary, secondary]` en commit `e1cd4fc` para Macit/Therz, pero `cards.py::_parse_card` **no lee el campo `subtypes` plural**. Los efectos que filtren por secundario (ej. "Catrín" en Therz) fallan silenciosamente. *Gap de esquema.*
6. **`validate_deck` no enforza todas las reglas de §4 p15.** Faltan validaciones de cotas inferiores (Protector ≥ 1, check exacto), tipos de los slots dedicados (`protector` debe ser tipo Protector, `bio` debe ser tipo Bio), y count exacto del rango de Adendei-en-mazo vs Rava vs Espectro por separado. El engine agrupa Adendei+Espectro en el rango 15-24 pero no verifica Adendei en rango 15-21 ni Espectros ≤ 4 recomendado (D11 — aceptable como warning, no error).
7. **Los rulings D10 (pasar turno), D2 (3 subfases de Batalla), D4 (Protector suplente herencia), D18 (zona pública), M23 (mano transitoria) y D19 (no existen forzadores explícitos de pasar-turno) están **correctamente implementados** o son **consistentes estructuralmente** con el engine.** Buen estado fundacional en la capa de fases y protector.

---

## 2. Tabla por ruling

| ID | Resumen | Archivo:Línea | Implementado? | Diff potencial | Severidad |
|----|---------|---------------|:-:|----------------|-----------|
| **D1** | 7 energías + Feral (no-energía funcional) | `types.py::Card.energy` (Optional[str]) | ✅ Parcial | Engine no distingue Feral como no-energía; comparaciones son puramente textuales. Funciona por convención. | 🟢 Bajo |
| **D2** | Fase Batalla = 3 subfases, Resolución interna | `engine.py:3131` `advance_phase`; `PHASES=['previa','batalla','post','equipo','fin']` | ✅ Estructural | El engine colapsa subfases en pending_reactiva/pending_activa_rapida. Subfases no son entidades explícitas. Consistente pero opaco. | 🟡 Medio |
| **D3** | Rava atacable, 6 HP, ocupa slot ZP | `engine.py:1063+` Rava es `card_type='Rava'` en `MAZO_TYPES`, entra a field vía `_make_field_card` con `ADENDEI_MAX_HP=6`. Ataques lo targetean. | ✅ OK | Ninguno. | 🟢 Bajo |
| **D4** | Protector suplente hereda descansos (ambos escenarios) | `engine.py:216-240` (_protector_leave_alive) + `engine.py:494-530` (_sweep_dead protector death) | ✅ OK | Ambos paths usan `old_rests`. Consistente. | 🟢 Bajo |
| **D5** | "Fuera del Juego" zona real permanente | *no implementada* | ❌ Missing | No existe campo `out_of_game` / `banished` en Player; los eventos usan tag textual `"removed from game"` sin storage. Quam TCOO-006U no tiene handler específico. | 🔴 Alta |
| **D6** | Caps totales: Adendei/Rava/Token=2, Protector=3 | `types.py:ADENDEI_MAX_RESTS=2, PROTECTOR_RESTS=3` + `effects.py::_safe_add_rests` + multiples `min(ADENDEI_MAX_RESTS, ...)` | ✅ OK (en effects.py) + ⚠️ legacy en engine.py:320 | `give_rests_by_effect` limita por efecto (max 1), no por total — contradice D6. No se usa pero queda declarado. | 🟡 Medio |
| **D7** | Cartas Limitadas solo Multijugador/Extendido, Estándar = 1 copia | `engine.py:89-94` (duplicate folio check) | ✅ OK Estándar | No hay switch de formato. Engine asume Estándar. | 🟢 Bajo (sin Extendido) |
| **D9** | Token HP max 6 (default) | `_make_field_card` → max_hp = ADENDEI_MAX_HP (6) salvo `card.max_hp`. Token sin max_hp override → 6. | ✅ OK | Ninguno. | 🟢 Bajo |
| **D10** | Pasar turno: solo jugador activo, solo Fase Previa | `engine.py:886` (generación `pass_turn` sólo en previa + active) + `engine.py:3221` (aplicación `s.phase='fin'`) | ✅ OK | Ninguno. | 🟢 Bajo |
| **D11** | Max 4 Espectros recomendado (dentro de 24 total) | `validate_deck:71-73` valida total Adendei+Espectro ≤ 24; no valida Espectro ≤ 4 | ⚠️ Parcial | "Recomendado" no es obligatorio — aceptable omitir. Podría añadirse como warning no-bloqueante. | 🟢 Bajo |
| **D18** | Fuera del Juego inspeccionable ambos jugadores | N/A — sin zona | ❌ Missing | Depende de D5. | 🔴 Alta |
| **D19** | No existen cartas que fuerzan "pasar turno" | `engine.py:886` genera `pass_turn` sólo como opción voluntaria. Estado "de facto" (sin acciones legales) puede emerger naturalmente porque `get_legal_actions` devuelve `[Action(type='pass')]` si no hay opciones. | ✅ Estructural | Consistente con D19 (comportamiento emergente, no declarado). | 🟢 Bajo |
| **D20-D22** | Espectros: vida de la carta, posesión atómica, sin herencia de stats | `engine.py:134-140` (max_hp de card.max_hp, damage=0, revealed=True); `engine.py:198-204` `_compute_damage` usa damage del **poseído** (viola D22 literal). `engine.py:2745` `action.type='possess'` | ⚠️ Conflicto | D22 dice "NO hay herencia, Espectro usa SUS PROPIAS stats". Engine (`_compute_damage`) usa damage de la carta poseída. **Esto es correcto según p14/b16 bullet 4** que ordena usar "Daño, Descanso, Costo y Energía de la carta Poseída". D22 contradice el texto oficial del rulebook — Ramsés deberá unificar. Hasta entonces el engine sigue la letra del rulebook. | 🟡 Medio (conflicto de fuentes) |
| **D24** | Caps HP por tipo: Adendei/Rava/Token=6, Protector=12, Espectro=lee carta | `ADENDEI_MAX_HP=6`, `PROTECTOR_MAX_HP=12`, Espectro usa `card.max_hp`. Cura nunca excede max_hp (`_safe_heal` en effects.py). | ✅ OK | Ninguno. | 🟢 Bajo |
| **D34** | Espectro + poseída ambas cuentan en victoria | `engine.py:613-619` Espectro → "REMOVED FROM GAME" (no extinction). Poseído NO se reintroduce a Extinción al morir. | ❌ Incorrecto | Según D34 y p14/b19: Espectro→extinction (y conteo víctima) + poseída regresa a su tipo original y va a extinction. Ninguno se ejecuta. | 🔴 Alta |
| **M2.5** | Mazo propio abierto al dueño, no se baraja | `engine.py::_trigger_replacement:375+` saca del tope del array (ordenado). Las cartas "inválidas" (duplicadas/no cumplen requisito) se devuelven al **fondo**. El usuario no reordena activamente. | ⚠️ Parcial | Engine toma cartas del top de la lista sin permitir al jugador reordenar. No hay API de reorden del mazo. Es consistente con "top-deck sequence" pero no permite la libertad de M2.5. | 🟡 Medio |
| **M17** | "Ixim siempre tiene Pasivas" incluye Pasiva-Rápida | effects.py filtra por `'Pasiva' in effect_type` y `'Pasiva-Rápida' in effect_type`. No bloquea Ixim con Pasiva-Rápida. | ✅ OK | Consistente. | 🟢 Bajo |
| **M23** | "Mano" es estado transitorio en replacement | `engine.py:453-480` `pending_replacement` maneja tercia como estado transitorio sin zona permanente | ✅ OK | Consistente. | 🟢 Bajo |
| **E8** | Subtipos múltiples (Macit=Guardián Catrín, Therz=Titán Catrín) | `types.py::Card.subtype: Optional[str]` — string único. `cards.py::_parse_card:74` NO lee `subtypes` plural. | ❌ Missing | cards.json tiene `subtypes: [primary, secondary]` desde commit `e1cd4fc`; engine lo ignora. Filtros por subtipo secundario fallan. | 🔴 Alta |

---

## 3. Hallazgos críticos (con evidencia)

### H1. Espectros muertos no cuentan al tracker de victoria (contradice D34)

**Evidencia:** `engine.py:613-619`

```python
if is_token:
    all_events.append(f"DEATH: {pk}:{pos} ({fc.folio}) → REMOVED FROM GAME (Token)")
elif is_espectro:
    # Espectros are removed from game entirely (not added to extinction)
    # Equips still go to extinction
    ext_owner.extinction.extend(fc.equips)
    all_events.append(f"DEATH: {pk}:{pos} ({fc.folio}) → REMOVED FROM GAME (Espectro)")
```

**Rulebook/ruling:**
- p14/b19: *"Cuando una carta poseída es enviada a Extinción, regresa a su tipo y subtipo originales, por lo tanto, pueden disparar los efectos normales que requieran que Adendei, Ixim, Rot, etc. sean enviados a Extinción."*
- D34: *"matar un Espectro en posesión vale 2 cartas para el tracker de victoria."*
- D21 corolario: al morir el Espectro, **ambas** cartas van a Extinción.

**Impacto:**
- Victoria por 10 cartas en Extinción infracontada. Una partida con múltiples Espectros caídos puede quedar en stalemate matemáticamente imposible de cerrar por via de conteo.
- Efectos "si es enviado a Extinción" no se disparan para la carta poseída al morir su Espectro (ej. Therz Titán Catrín si hubiera sido poseído — su death trigger nunca se ejecuta).
- `_count_extinction` excluye Tokens intencionalmente (correcto) pero el bucle no ve Espectros porque nunca entran al array.

**Pendiente:** ¿Los Equipos transferidos al Espectro por posesión deben re-heredarse al Adendei poseído cuando éste regresa a Extinción? Sub-duda para ruling.

### H2. Zona Fuera del Juego inexistente — bloquea implementación de Quam (TCOO-006U)

**Evidencia:** Búsqueda global:
```
grep -rn "fuera_del_juego\|out_of_game\|banished" /home/coder/codice-kodem/api/kodem_engine/
# (no matches)
```
Solo `effects.py:4866, 4884` usan tag string `"removed from game"` en logs, sin almacenamiento.

**Rulebook/ruling:**
- D5 + D18 establecen zona real, inspeccionable, con flujo bidireccional.
- Quam, Detrás de la Materia (TCOO-006U) tiene dos ramas de Pasiva que requieren la zona: (1) mover del Mazo a Fuera del Juego; (2) intercambiar una carta de Fuera del Juego con una en ZP.
- p20/b07 obliga a regresar cartas de Fuera del Juego al fondo del Mazo cuando éste se vacía (excepto Tokens).

**Impacto:**
- Quam no puede implementarse sin agregar campo `out_of_game: list[str]` en `Player`.
- Efectos futuros de set FYTE/LGRO que interactúen con Fuera del Juego (si los hay) también bloqueados.
- `_end_of_turn` línea ~3082 refill-from-extinct NO considera Fuera del Juego como fuente (p20/b07 lo exige).

### H3. `give_rests_by_effect` (engine.py:320) tiene semántica legacy contra D6

**Evidencia:**
```python
def give_rests_by_effect(fc: FieldCard, amount: int) -> int:
    """§6.1: Give rests by effect, respecting caps.
    ZP cards: can receive max 1 rest by effect (total).
    Returns actual rests given."""
    max_by_effect = 1
    actual = min(amount, max(0, max_by_effect - fc.rests))
    fc.rests += actual
    return actual
```

**Rulebook/ruling (D6):** Caps son TOTALES por tipo (Adendei=2, Protector=3). No existe regla de "máximo 1 por efecto". D6 explícitamente: *"Adendei con 0 descansos + efecto +2 descansos → se suman 2 (total: 2)."*

**Impacto:**
- La función está declarada y exportada pero **nunca se llama** en el flujo actual (`grep` confirma: solo definición). effects.py usa `_safe_add_rests` (semántica correcta) y `min(ADENDEI_MAX_RESTS, fc.rests + rests)` directamente.
- Si una refactorización futura la usa sin revisarla, introduce el bug silenciosamente.
- Comentario `"""§6.1: Give rests by effect, respecting caps."""` sugiere referencia a regla inexistente.

### H4. Posesión de Espectros: dirección de movimiento contradice D21

**Evidencia:** `engine.py:2745-2785`

```python
elif action.type == 'possess':
    # Espectro possesses allied Adendei
    # ...
    # Send target Adendei to Extinction (with its equips)
    player.extinction.append(target.folio)
    player.extinction.extend(target.equips)
    # Espectro now possesses the target card
    espectro.possessed_folio = target.folio
    # ...
    # Remove the possessed Adendei from the field
    player.field.pop(target_idx)
    # ...
    # Trigger replacement for the now-empty slot
    rep_s, rep_ev = _trigger_replacement(s, player_key, action.target_pos)
```

**Rulebook/ruling:** Existen **dos fuentes oficiales con lecturas distintas**:
- **p14/b16 bullet 3** (texto rulebook): *"...poseer una (solo una) de las cartas mencionadas en su Requisito, **enviando a un Adendei aliado en Zona Principal original a Extinción** sin que esto se considere un costo."* → el engine es **consistente con esta lectura**.
- **D21** (ruling Ramsés 2026-04-19): *"Al poseer, el Espectro está VIVIFICANDO al Adendei. Se coloca el Adendei poseído en Zona Principal y el Espectro encima de él (bajo el Espectro)."* + *"Posesión normal con sacrificio... es un intercambio instantáneo atómico. La carta que sale de Extinción y la que entra se mueven en una misma acción, no secuencialmente. El conteo de cartas en Extinción permanece igual."*

**Impacto:**
- Engine = rulebook literal. Ruling D21 introduce divergencia.
- No es bug del engine — es tensión textual pendiente de unificación en v5.2. **No juzgamos.** Se reporta a Ramsés para decisión.
- Efectos dependientes (Tlahuelpuchi FYTE-007R que bloquea "envía a Extinción para poseer") tienen comportamiento diferente según interpretación. En el engine actual, Tlahuelpuchi bloquea el sacrificio (consistente con la lectura de rulebook).

### H5. Subtipos múltiples (E8) no están leídos por `cards.py`

**Evidencia:** `cards.py:68-81` (función `_parse_card`):
```python
def _parse_card(entry: dict) -> Card:
    return Card(
        ...
        subtype=entry.get('subtype') or None,
        ...
    )
```
No lee `entry.get('subtypes')`. `types.py::Card.subtype: Optional[str]` es un solo string.

**Rulebook/ruling (E8):**
- Ramsés confirmó: "Guardián Catrín" / "Titán Catrín" son dos subtipos simultáneos.
- cards.json commit `e1cd4fc` migró Macit y Therz a `subtypes: [primary, secondary]` preservando `subtype` primario para retro-compat.

**Impacto:**
- Efectos que filtren por subtipo **secundario** (ej. "todos los Adendei Catrín") **fallan silenciosamente** sobre Macit/Therz porque engine sólo ve `subtype = "Guardián"` (primario).
- 4 cartas afectadas hoy (según ruling E8) — crecerá con futuras expansiones.
- Queries por subtipo primario siguen funcionando. La función `_is_equino` y filtros similares en effects.py son operativos pero incompletos.

### H6. `validate_deck` no enforza todas las cotas de §4 p15

**Evidencia:** `engine.py:32-97`

Regla incumplidas vs §4:
- **§4 paso 4** (p15/b08): "1 o 2 Protectores" — engine sólo valida `prot_count > 2` (tope superior). No valida Protector ≥ 1 (cubierto indirectamente por `if not protector`, pero no valida que sea tipo Protector).
- **§4 paso 5** (p15/b09): "0 o 1 Bio" — engine acepta `bio` pero no valida su tipo ni cantidad.
- **§4 paso 3** (p15/b07): "15-21 Adendei" + "0-2 Rava" + "0+ Espectros", cota total 24 Adendei+Espectro. Engine agrupa Adendei+Espectro = 15-24; no valida Adendei-en-rango ni que Rava ≤ 2 sin tope inferior (ok, 0 es aceptable).
- **§4 paso 1** (p15/b05): lista indica "15-24 Adendei" como criterio de composición general. Engine aplica a la suma con Espectro, lo cual es consistente con paso 3 pero no con paso 1 literal. Ambos pasos son inconsistentes entre sí en el propio rulebook (E24-tipo errata pendiente). Engine se queda en la interpretación más restrictiva (paso 3).

**Impacto:**
- Mazos ilegales pasan `validate_deck` si el field `protector` contiene un folio de Adendei.
- No hay validación semántica completa. Los tests baseline asumen mazos bien-formados.

---

## 4. Código legacy detectado (v5.0 → v5.1)

| Archivo:Línea | Comentario/código | Nota |
|---------------|-------------------|------|
| `engine.py:320-328` | `give_rests_by_effect` con `max_by_effect = 1` | Obsoleto por D6. No usado. Candidato a deprecación. |
| `engine.py:331-336` | `give_protector_rests_by_effect` con `max_by_effect = 2` | Misma historia. |
| `engine.py:2013` | `# Card still rests per rules v5.0` | Comentario obsoleto; revisar si la regla aplica en v5.1 igual. |
| `engine.py:525` (effects.py) | `# fc.marks = []  # REMOVED — rules v5.0 say marks persist when hidden` | Cambió de v5.0 a v5.1; el comentario mantiene la referencia para contexto histórico pero el código v5.1 es correcto (no limpia marcas). |
| `engine.py:2177` | `# Priority 7: legacy multi_attack` | `multi_attack` se marca legacy pero sigue en uso. Limpieza pendiente o clarificar. |
| `engine.py:3082-3099` | Refill tras 8 turnos sin daño (ENG-09 fix §14) | Consistente con D45 (8 turnos totales). OK. |
| `effects.py:2627` | `# ENG-24: RB-15 v5.0 dice que vivificar sin tipo debe permitir cualquier tipo` | v5.0 citada; validar si v5.1 cambió semántica de vivificación. D21 amplía "vivificar" a intercambio — posible interacción no verificada. |
| `types.py::Card.subtype` | Un solo campo `subtype` (sin `subtypes`) | Pre-E8. Migración pendiente. |

---

## 5. Dudas abiertas relevantes a §1-§5 — comportamiento observado

> Se describe qué hace el engine, sin juzgar. Pendiente ruling definitivo comunidad/Ramsés.

### D30 — Virste Reseteo: alcance de "estadísticas originales"
**Fuera de alcance §1-§5** (es §6.2). El engine usa `base_damage`, `base_rests` como "originales" — consistente con M14 (valor impreso base). No toca §5.

### D31 — "No puede ser negada": alcance y meta-inmunidad
**Fuera de alcance §1-§5** (es §8.3). El engine tiene `cant_be_negated: bool`. No resuelve meta-casos.

### D33 — Espectro atacar sin carta poseída
**Comportamiento observado:** `engine.py:1924-1935`
```python
if attacker_card and attacker_card.card_type == 'Espectro' and not attacker.possessed_folio:
    espectro_dmg = _compute_damage(fc)
    espectro_cost = espectro_dmg * 2
    if espectro_cost > 0 and fc.hp <= espectro_cost:
        continue  # Can't pay — would die from cost
```
El engine permite que un Espectro sin poseer ataque pagando doble PV a aliados (consistente con p14/b16 bullet 6). No está claro si dispara triggers "si esta carta ataca" — engine los dispara en attack normal. **Pendiente ruling.**

### D36 — Múltiples Espectros en posesión simultánea
**Comportamiento observado:** El engine permite a varios Espectros poseer cartas independientes (cada uno declara su propio `possessed_folio`). No hay regla de pool compartido — cada Espectro consume un target del field (engine) o de Extinción (según D21). **Pendiente ruling sobre pool de Extinción compartido.**

### D37 — Tlahuelpuchi bloqueando posesión
**Comportamiento observado:** El efecto de Tlahuelpuchi bloquea el "envía a Extinción para poseer" (consistente con engine que sacrifica del campo). Si D21 se impone (vivificar desde Ext), Tlahuelpuchi solo bloquearía casos con sacrificio adicional. **Pendiente unificación con D21.**

### D40 — Tzun Heraldo: ataque múltiple
**Fuera de alcance §1-§5** (interacción de efectos).

### D43 — Pasivas Opcionales vs Generales: criterio visual (negrita)
**Comportamiento observado:** `engine.py:244-261` usa heurística textual ("puede"/"puedes") como proxy de "no-negrita/opcional". Consistente con `_is_optional_pasiva` docstring. No es ruling final — Ramsés puede definir criterio distinto. **Pendiente ruling visual.**

### D46 — Rava Extendido: definición y límites
**Fuera de alcance §1-§5** (formato, no §4 preparación estándar). Engine asume Formato Estándar.

### D52 — Zaykan + Citadel: interacción con Ciudad
**Fuera de alcance §1-§5.**

### M3 — "Durante el resto del juego" (Mixtla)
**Fuera de alcance §1-§5.**

### M5 — Privacidad del Mazo rival (familia Zotz)
**Comportamiento observado:** Engine trata ambos mazos como listas. No hay noción de privacidad per-jugador en queries (get_legal_actions lee ambos mazos para cualquier decisión). **Para simulación automática esto no importa; para clientes humanos sí.** No bloquea reglas fundacionales.

---

## 6. Top 5 correcciones priorizadas (Pasada 2)

### Prioridad 1 — [H2] Crear zona "Fuera del Juego" como primitiva

**Qué:**
- Agregar `out_of_game: list[str] = field(default_factory=list)` en `Player` (types.py).
- Poblar al ejecutar efectos con patrón `"coloca fuera del juego"` / `"saca del juego"`.
- Visible en ambos jugadores (D18): exponer en diagnósticos y logs.
- Cuando `len(player.mazo) == 0` en `_end_of_turn` o `_trigger_replacement`, refill desde `out_of_game` (excepto Tokens) ANTES de refill desde Extinción (p20/b07 obliga a esta prioridad).
- Implementar handler para Quam (TCOO-006U) en effects.py.

**Por qué prioritario:** Desbloquea la única carta oficial (Quam) que toca esta zona + cumple D5/D18 declarativamente + corrige p20/b07 explícitamente.

**Severidad:** 🔴 Alta.

### Prioridad 2 — [H1] Corregir muerte de Espectros para D34/p14/b19

**Qué:**
- Cuando un Espectro es enviado a Extinción, **añadir ambos folios** (Espectro + Adendei poseído) a `player.extinction`.
- Adendei poseído "regresa a su tipo original" — ya lo tiene en `possessed_folio`. Actualmente se pierde silenciosamente.
- Disparar death triggers de la carta poseída (ahora Adendei regular en Extinción).
- Confirmar que `_count_extinction` cuenta Espectros (quitar el flag de "removed from game" para Espectros, mantenerlo para Tokens).

**Por qué prioritario:** Afecta directamente la **condición de victoria** del juego. Partidas con Espectros pueden quedar en stalemate matemático.

**Severidad:** 🔴 Alta.

### Prioridad 3 — [H5] Migrar engine a `subtypes: list[str]`

**Qué:**
- Añadir `subtypes: tuple[str, ...] = ()` a `Card` (types.py).
- Actualizar `_parse_card` (cards.py:68) para leer `entry.get('subtypes')` como lista, con fallback a `[subtype]` si sólo está el singular.
- Actualizar helpers `_is_equino`, `_is_abisal` y similares para iterar `card.subtypes` además de `card.subtype`.
- Mantener `card.subtype` como alias del primer elemento para retro-compatibilidad.

**Por qué prioritario:** Hoy falla silenciosamente para 4+ cartas conocidas (Macit, Therz). Efectos que filtren por subtipo secundario no alcanzan las cartas correctas.

**Severidad:** 🔴 Alta.

### Prioridad 4 — [H6] Endurecer `validate_deck` según §4 p15

**Qué:**
- Validar `get_card(protector).card_type == 'Protector'`.
- Validar `get_card(bio).card_type == 'Bio'` si presente.
- Validar Adendei-en-mazo en rango 15-21 (cot exclusivo de Adendei, no Adendei+Espectro).
- Warning (no error) si Espectros > 4 (D11 recomendación).
- Verificar que los 3 Adendei ocultos en ZP (paso 2 §4) se puedan construir del mazo — ya lo hace `build_player` implícitamente, pero debería validarse a priori.

**Por qué prioritario:** Evita estados de juego inválidos tempranos, reduce debug time.

**Severidad:** 🟡 Medio.

### Prioridad 5 — [H3] Deprecar `give_rests_by_effect` / `give_protector_rests_by_effect`

**Qué:**
- Agregar `@deprecated` decorator o comentario explícito `# DEPRECATED — semantics conflict with D6. Use _safe_add_rests (effects.py).`
- Eventualmente eliminar si `grep` confirma cero usos en effects.py, tests, y simulator-js.
- Alternativa mínima-invasiva: arreglar la semántica para que respete el cap total (no el cap por efecto).

**Por qué prioritario:** Tech debt con tripwire — futuro refactor podría introducir el bug.

**Severidad:** 🟡 Medio.

---

## Anexo A — Inventario de funciones relevantes §1-§5 en engine.py

| Función | Línea | Propósito §1-§5 |
|---------|-------|------------------|
| `validate_deck` | 32 | §4 composición de mazo |
| `_safe_damage` | 100 | §2 parsing de stats |
| `_make_field_card` | 129 | §2 instanciación ZP |
| `_make_protector` | 187 | §3.2 Protector |
| `_compute_damage` | 197 | §3.7 Espectro posesión |
| `_protector_leave_alive` | 208 | §3.2 Protector suplente sin Extinción (D4) |
| `_is_optional_pasiva` | 244 | §10 Pasiva opcional vs obligatoria (D43) |
| `_is_available` | 263 | §5.1 Descansos |
| `give_rests_by_effect` | 320 | ⚠️ LEGACY — D6 |
| `give_protector_rests_by_effect` | 331 | ⚠️ LEGACY — D6 |
| `_count_extinction` | 339 | §4 victoria — excluye Token (p15/b12) |
| `_check_victory` | 349 | §4 victoria |
| `_forbidden_folios` | 357 | §5.3 reemplazo |
| `_trigger_replacement` | 375 | §5.3 reemplazo + tercia |
| `_sweep_dead` | 482 | §3.x muerte de cartas → Extinción |
| `init_game` | 719 | §4 setup |
| `get_legal_actions` | 810 | §5 fases + acciones legales |
| `apply_action` | 1259 | §5 ejecución de acciones |
| `_end_of_turn` | 2909 | §5.1 descansos + §7 marcas (veneno) |
| `advance_phase` | 3131 | §5 fases |
| `run_turn` | 3169 | §5 ciclo completo |

---

## Anexo B — Referencias clave del rulebook §1-§5

| Anchor | Contenido |
|--------|-----------|
| p04/b01+ | §1 Generalidades |
| p05/b01+ | §2 Partes de la carta |
| p06/b01+ | §2 Estadísticas (energía, vida, daño, descanso) |
| p07/b01+ | §3.1 Adendei |
| p08/b01+ | §3.2 Protector (incluye p08/b08 herencia descansos) |
| p09/b01+ | §3.3 Rava |
| p10/b05 | §3.4 Ixim/Rot — "Ixim siempre Pasivas" (M17) |
| p13/b10 | §3.6 Token — "no cuenta en victoria" |
| p14/b16 | §3.7 Espectro — uso (posesión) |
| p14/b19 | §3.7 Espectro — carta poseída regresa a tipo original al morir |
| p14/b21 | §3.7 Generalidades — cota 24 con recomendación 4 Espectros (D11) |
| p15/b05 | §4 paso 1 — composición de mazo |
| p15/b07 | §4 paso 3 — mazo principal con cota 24 |
| p15/b11 | §4 paso 7 — Extinción |
| p15/b12 | §4 Condición de Victoria (10 cartas, Tokens excluidos) |
| p16/b07 | §5 Fase de Batalla |
| p17/b01 | §5.2 Orden de Resolución (D2) |
| p18/b04+ | §5.1 Descansos (D6) |
| p19/fig-02 | §5.2 Diagrama turno (CANONICAL_FINAL pass 5) |
| p20/b02-b08 | §5.3 Reemplazo (D4, M20) |
| p20/b07 | Refill del Mazo desde Fuera del Juego (D5) |

---

_Auditoría completada 2026-04-19 08:45 UTC. Tests baseline intactos 436/436 PASS. Trabajo solo-lectura confirmado._
