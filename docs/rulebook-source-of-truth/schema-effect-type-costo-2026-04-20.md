# Schema: `effect_type='Costo'` — cartas solo-costo (sin efecto activable)

**Fecha:** 2026-04-20
**Decisión de:** Ramsés D'León
**Contexto:** P4 audit de `cards.json` detectó 24 cartas con `effect_text` vacío. Tras categorizar:

- **15 Espectros FYTE** con `effect_type='Ninguno'` → vanilla, correcto.
- **3 CUSTOM** con `effect_type=''` → solo lore, sin efectos. **Fix aplicado:** cambiar a `effect_type='Sin efecto'`.
- **6 cartas con `effect_type='Costo'`** → **NO es errata, es diseño intencional.**

---

## Las 6 cartas "solo-costo"

| Carta | Variantes | Costo (texto impreso) | Interpretación |
|---|---|---|---|
| **Yakerr, Hogar** | `LGRO-065`, `ISPMR-020`, `TRWA-065` | "Debes pasar 1 turno antes de atacar con esta carta." | Restricción de turno post-revelado |
| **Jokokan, Guardián de la Corteza** | `RMR-002` | "Después de atacar, esta carta desciende 1 pto. y es dañada 1 pto." | Auto-descenso + auto-daño post-ataque |
| **Ariam, Modo Catrín** | `RMR-005`, `SRMR-002` | "Antes de atacar, daña 1 pto. a los Adendei aliados." | Pre-attack ally-sacrifice |

**Ruling de Ramsés (2026-04-20):**
> "Son cartas con sólo costo, y no efectos (justo tienen mucho poder, por eso sólo tienen costo)."

El costo funciona como **condición permanente mientras la carta esté en el campo** — no es un efecto que se activa ni se paga al usar una Activa, sino una penalización ineludible que balancea estadísticas altas.

---

## Patrón de schema

Para cartas solo-costo, el schema válido es:

```json
{
  "folio": "LGRO-065",
  "effect_type": "Costo",   // marker canónico para "solo costo, sin efecto"
  "effect_text": "",        // VACÍO (no hay efecto a resolver)
  "cost_text": "Debes pasar 1 turno antes de atacar con esta carta."
}
```

**Invariantes:**
1. `effect_type == 'Costo'` ⟹ `effect_text.strip() == ''`
2. `effect_type == 'Costo'` ⟹ `cost_text.strip() != ''`
3. `effect_type == 'Costo'` NO es equivalente a `effect_type == 'Sin efecto'` — tiene semántica de restricción permanente activa.

---

## Status engine

⚠ **Gap conocido:** `api/kodem_engine/` no tiene handler para `effect_type='Costo'`. Hoy:
- Las 6 cartas cargan correctamente (`get_card` OK)
- `validate_deck` las acepta como legales
- Pero sus restricciones permanentes **no se aplican en simulación**

### Implementación pendiente (backlog, no hoy)

Cada carta necesita un handler específico:

| Carta | Handler necesario | Ventana de activación |
|---|---|---|
| Yakerr, Hogar | `cannot_attack_first_turn_after_reveal` | `placed_on_turn + 1` |
| Jokokan, Guardián | `post_attack_self_descend_and_damage` | después de cada ataque exitoso |
| Ariam, Modo Catrín | `pre_attack_damage_allies` | antes de resolver el ataque |

**Estimado:** ~2-3h con tests de regresión (3 handlers + 6-9 tests).

**Prioridad:** Media — no son cartas centrales del meta actual, pero están en colección real y se pueden jugar.

---

## Acción ejecutada (2026-04-20)

1. ✅ 3 CUSTOM normalizadas a `effect_type='Sin efecto'` (commit `fix/p4-empty-effect-text-schema`)
2. ✅ Test de regresión agregado que valida invariantes del schema
3. 📌 Backlog: handlers del engine para las 6 cartas solo-costo

---

## Addendum 2026-04-20 19:00 CDMX — Aclaraciones de Ramsés

### Cyra vs Cura (INMX-001, KSPC-001)
**Ramsés confirmó:** era error de OCR. El texto correcto es "Cura 6 puntos a un Adendei aliado". Verificación en `cards.json`: 0 ocurrencias de `\bCyra\b` en effect_text/cost_text. Ya está normalizado (probablemente durante P4 normalization del mismo día). **No action required.**

### Jane Dalgood (KPRC-020)
**Ramsés confirmó:** es una **Protectora** cuyo texto/efecto sale en la próxima expansión. El placeholder "TBA" en cost_text es intencional hasta el lanzamiento oficial. **Status:** bloqueado por diseño, no por datos. No requiere handler hasta que Camilo/Tochcalli liberen la expansión.
