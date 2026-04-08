# Kódem TCG — Tag System v2 Design Document

> Diseño del sistema de etiquetado que mapea el reglamento oficial (Rulebook v5.0)
> al engine de simulación. Cada tag corresponde a un punto específico del diagrama
> de flujo de resolución de turnos.

## Fuentes

- Rulebook v5.0 (Feb 2026)
- Diagrama de flujo oficial (6 fases + Pasar Turno)
- Reglas v5.0 consolidadas: `/docs/reglas.md`
- Engine actual: `codice-kodem/api/kodem_engine/`

---

## 1. Arquitectura: El Pipeline de Efecto

Cada efecto de carta se modela como un **pipeline** de 5 capas que se ejecutan en orden:

```
TRIGGER → PREREQUISITE → COST → OPERATION → RESTRICTION
```

### 1.1 TRIGGER (¿cuándo se activa?)

Define en qué punto del diagrama de flujo el efecto puede activarse.

| Tag | Fase | Descripción | Ejemplo |
|-----|------|-------------|---------|
| `trg:on-attack` | Batalla | Al declarar ataque | Ariam, Balance |
| `trg:on-damaged` | Batalla | Al recibir daño | Navi Dequak (Pasiva) |
| `trg:on-reveal` | Previa/Post | Al ser revelada | Cretus, Profecía |
| `trg:on-death` | Post | Al ir a Extinción | Adasi, Acecho |
| `trg:on-ally-death` | Post | Cuando aliada muere | Ariam, Fuerza del Más Allá |
| `trg:on-equip` | Equipo | Al ser equipada | Adasi, Amparo Vegetal |
| `trg:end-of-turn` | Fin | Fin de turno (paso 2) | Efectos "fin de turno" |
| `trg:end-of-turn-expire` | Fin | Fin de turno (paso 3) | Efectos temporales que expiran |
| `trg:on-poison` | Fin | Veneno (paso 4) | Daño de veneno |
| `trg:on-rest-update` | Fin | Actualización descansos (paso 6) | Descansos normales |
| `trg:while-on-field` | Continuo | Mientras esté en campo | Auras/Pasivas continuas |
| `trg:on-pass-turn` | Previa | Al pasar turno | Aki, Venas de Lava |
| `trg:on-draw` | Reemplazo | Al ser tomada del Mazo | Efectos "al ser tomada" |
| `trg:on-bio-extinct` | Previa | Bio enviado a Extinción | Actualizar descansos |
| `trg:on-any-reveal` | Cualquiera | Cuando cualquier carta es revelada | Bio: Caldera Submarina |
| `trg:on-link` | Batalla | Al usar Vínculo Odémico | Efectos de Protector |
| `trg:unconditional` | Siempre | Efecto siempre activo | Stats base |

### 1.2 PREREQUISITE (¿se puede activar?)

Condiciones que deben cumplirse ANTES de pagar el costo.

| Tag | Descripción | Ejemplo |
|-----|-------------|---------|
| `pre:independent` | Sin requisitos | Mayoría de cartas |
| `pre:min-extinction:N` | N+ cartas en propia Extinción | Espectros, efectos de Extinción |
| `pre:min-ext-type:ENERGY:N` | N+ cartas de energía X en Extinción | Ariam, Fuerza (Pírica) |
| `pre:min-ext-type:TYPE:N` | N+ cartas de tipo X en Extinción | Espectro (Adendei específico) |
| `pre:needs-equip` | Requiere Ixim o Rot equipado | La Cúspide |
| `pre:needs-equip:ixim` | Requiere Ixim específico | — |
| `pre:needs-equip:rot` | Requiere Rot específico | — |
| `pre:needs-ally` | Requiere aliada(s) en campo | Protección Selectiva |
| `pre:needs-same-name` | Requiere carta con mismo nombre | Pétalos de Fuego |
| `pre:needs-rava` | Requiere Rava en campo | Zaykan, Cambio de Energía |
| `pre:needs-protector` | Requiere Protector vivo | Ulmor, Vínculo Odémico |
| `pre:needs-bio` | Requiere Bio en campo | — |
| `pre:needs-titan` | Requiere Titán en campo | — |
| `pre:needs-token` | Requiere Token en campo | Token (TCOO-082) |
| `pre:needs-mark` | Requiere marca en rival | Shugg, Fuga |
| `pre:needs-rests` | Depende de descansos rivales | Karus, Pinchazo Doble |
| `pre:needs-same-energy` | Requiere cartas misma energía | — |
| `pre:needs-link` | Requiere Adendei vinculado | Tlahuelpuchi |
| `pre:needs-reveal` | Se activa al revelar carta | — |
| `pre:needs-revive` | Requiere vivificar | Enis, Plumas de la Muerte |
| `pre:needs-scale-descend` | Interactúa con escalar/descender | — |
| `pre:once-per-game` | 1 vez por juego | — |
| `pre:once-per-turn` | 1 vez por turno | Pasivas Opcionales |
| `pre:once-per-field` | 1 vez mientras esté en campo | — |

### 1.3 COST (¿qué pagas?)

Se paga DESPUÉS de verificar prerequisitos, ANTES de ejecutar.
En Batalla: se paga junto con Quemadura (subfase Pago de Costos).

| Tag | Descripción | Ejemplo |
|-----|-------------|---------|
| `cost:none` | Sin costo | Mayoría |
| `cost:self-damage:N` | Esta carta se daña N pts | Ulmor, Ataque Fugaz |
| `cost:ally-damage:N` | Aliada se daña N pts | Protección Selectiva |
| `cost:self-extinct` | Envía esta carta a Extinción | Templo Eléctrico |
| `cost:ally-extinct` | Envía aliada a Extinción | — |
| `cost:ally-extinct:N` | Envía N aliadas a Extinción | Revivir Rava (2 cartas) |
| `cost:equip-extinct` | Envía equipo a Extinción | — |
| `cost:bio-extinct` | Envía Bio a Extinción | — |
| `cost:lose-turn` | Pierde próximo turno | Yakerr, Hogar |
| `cost:extra-rest:N` | N descansos adicionales | — |
| `cost:protector-damage:N` | Daña N pts al propio Protector | — |
| `cost:pass-turn` | Requiere pasar turno previo | Aki, Venas de Lava |

### 1.4 OPERATION (¿qué hace?)

Acciones atómicas que el engine ejecuta. Se ejecutan en orden secuencial.
En Batalla: Daño se resuelve en ventana 3, Activas en ventana 4.

#### 1.4.1 Daño

| Tag | Descripción |
|-----|-------------|
| `op:damage:N` | Daña N pts (por efecto) |
| `op:damage-protector:N` | Daña N pts al Protector rival |
| `op:damage-all` | Daña a todas las cartas rivales |
| `op:damage-multi:N:COUNT` | Daña N pts hasta a COUNT cartas |
| `op:damage-per:CONDITION` | Daño escalable (por extinción, marcas, etc.) |

#### 1.4.2 Curación

| Tag | Descripción |
|-----|-------------|
| `op:heal:N` | Cura N pts |
| `op:heal-all` | Cura a todas las aliadas |
| `op:remove-marks` | Quita todas las marcas (implícito en curación §7) |

#### 1.4.3 Marcas (§7)

| Tag | Descripción | Efecto |
|-----|-------------|--------|
| `op:burn` | Aplica Quemar 🔥 | 1 dmg por ataque/Activa |
| `op:poison` | Aplica Envenenar ☠️ | 1 dmg al fin de turno |
| `op:abyss` | Aplica Abismar 🌀 | Ataca al azar |

#### 1.4.4 Estadísticas (§8)

| Tag | Descripción |
|-----|-------------|
| `op:scale:N` | Escalar +N daño permanente |
| `op:scale-per:CONDITION` | Escalar condicional |
| `op:descend:N` | Descender -N daño permanente |

#### 1.4.5 Descansos (§6.1)

| Tag | Descripción |
|-----|-------------|
| `op:rest-add:N` | Añadir N descansos a rival |
| `op:rest-remove:N` | Actualizar/quitar N descansos |
| `op:no-rest` | Esta carta no descansa al atacar |

#### 1.4.6 Negación y Protección (§13-14)

| Tag | Descripción |
|-----|-------------|
| `op:negate-effect` | Niega efecto de carta |
| `op:negate-attack` | Niega ataque |
| `op:protect-attack` | Protege de ataques |
| `op:protect-effect` | Protege de efectos |
| `op:immune-marks` | Inmune a marcas |

#### 1.4.7 Movimiento

| Tag | Descripción |
|-----|-------------|
| `op:hide` | Ocultar carta (§6.5) |
| `op:reveal` | Revelar carta |
| `op:swap` | Intercambiar posiciones |
| `op:return-deck:POS` | Regresar al Mazo (top/bottom) |
| `op:send-extinction` | Enviar a Extinción |
| `op:vivify` | Vivificar (§15) |

#### 1.4.8 Especial

| Tag | Descripción |
|-----|-------------|
| `op:create-token` | Crear Token (§2.7, máx 2) |
| `op:copy` | Copiar efecto de otra carta |
| `op:feralizar` | Cambiar energía a Feral (§8) |
| `op:equip-destroy` | Destruir equipo rival |
| `op:redirect` | Redirigir daño/ataque |
| `op:link` | Vincular al Protector (§6.3) |
| `op:possess` | Poseer Adendei (Espectro, §2.8) |
| `op:attack-all` | Atacar a todas las rivales |
| `op:attack-protector` | Puede atacar Protector directamente |
| `op:multi-attack:N` | Atacar N veces |

### 1.5 TARGET (¿a quién afecta?)

Cada OPERATION tiene un target implícito o explícito.

| Tag | Descripción |
|-----|-------------|
| `tgt:self` | A sí misma |
| `tgt:ally` | A carta(s) aliada(s) |
| `tgt:enemy` | A carta(s) rival(es) |
| `tgt:both` | A cartas de ambos jugadores |
| `tgt:facing` | A la carta de enfrente |
| `tgt:protector` | Al Protector |
| `tgt:any` | A cualquier carta (elección) |

### 1.6 RESTRICTION (¿qué limitaciones tiene?)

Restricciones que se verifican durante resolución (§13).

| Tag | Descripción |
|-----|-------------|
| `rst:cant-attack` | No puede atacar |
| `rst:cant-be-attacked` | No puede ser atacada |
| `rst:cant-be-damaged-effect` | No puede ser dañada por efectos |
| `rst:cant-equip` | No puede ser equipada |
| `rst:cant-heal` | No puede ser curada |
| `rst:cant-rest-update` | No puede actualizar descansos |
| `rst:cant-link` | No puede vincularse (o restricción) |
| `rst:cant-negate` | No puede ser negada |
| `rst:target-filter:ENERGY` | Solo afecta cartas de energía X |
| `rst:target-filter:SUBTYPE` | Solo afecta cartas de subtipo X |
| `rst:compatible:CARD` | Equipo compatible solo con carta X |

---

## 2. Mapeo: Diagrama de Flujo → Tags

### 2.1 Fase Previa

```
                    ┌─────────────────────────────────┐
                    │          FASE PREVIA              │
                    │                                   │
 trg:on-reveal ────→│  Revelar cartas                   │
                    │       ↓                           │
 trg:while-on-field─│  Pasivas (obligatorias)           │──→ pre:* check
 trg:unconditional  │  Pasivas Opcionales               │──→ pre:once-per-turn
                    │       ↓                           │
                    │  Costo ←→ Pasiva-Rápida rival     │──→ cost:* pay
                    │       ↓                           │
                    │  Pasivas rival (ya reveladas)     │
                    │       ↓                           │
                    │  0 PV → Extinción → Reemplazo     │──→ trg:on-death
                    │       ↓                           │
 trg:on-bio-extinct─│  Bio → Extinción (opcional)       │──→ op:rest-remove:1 (ALL)
                    │       ↓                           │
                    │  Rava: regresar/revivir            │
                    │       ↓                           │
 trg:on-pass-turn ─│  Pasar turno → Fin de Turno       │
                    └─────────────────────────────────┘
```

### 2.2 Fase de Batalla

```
┌─── DECLARACIÓN ───┐    ┌──── PAGO ────┐    ┌──── RESOLUCIÓN ────┐
│                    │    │              │    │                     │
│ trg:on-attack      │───→│ cost:*       │───→│ 1. A-Rápida propia  │
│ trg:on-link        │    │ + Quemadura  │    │    trg:on-attack    │
│                    │    │ (§7, no es   │    │    op: de A-Rápida  │
│ Elige carta        │    │  costo)      │    │                     │
│ Elige objetivo     │    │              │    │ 2. A-Rápida rival   │
│ Declara Activa     │    │              │    │    (respuesta)      │
│ o Vínculo          │    │              │    │                     │
│                    │    │              │    │ 3. DAÑO por ataque  │
│                    │    │              │    │    op:damage (attack)│
│                    │    │              │    │                     │
│                    │    │              │    │ 4. ACTIVA            │
│                    │    │              │    │    op:* (effect)     │
└────────────────────┘    └──────────────┘    └─────────────────────┘

NOTA: Cartas con 0 PV NO van a Extinción durante Batalla.
      Esperan a Fase Post.
      Rot + Adendei Activa = cuentan como 1 Activa.
```

### 2.3 Fase Post

```
┌──── FASE POST ────────────────────────┐
│                                        │
│  Cartas con 0 PV → Extinción          │──→ trg:on-death
│       ↓                                │
│  Reemplazo (toma 3, elige 1)          │──→ trg:on-draw
│       ↓                                │
│  Pasivas (condición cumplida en Bat.)  │
│       ↓                                │
│  Sub-loop: Costo → P-Rápidas →        │
│            Pasivas rival → Reemplazo   │
│                                        │
│  (loop hasta estabilizar)              │
└────────────────────────────────────────┘
```

### 2.4 Fase de Equipo

```
┌──── FASE DE EQUIPO ───────────────────┐
│                                        │
│  Equipar 1 Ixim o Rot                  │──→ trg:on-equip
│  (oculta o revelada)                   │
│  a carta que atacó/usó Activa          │
│       ↓                                │
│  Pasivas (on-equip triggers)           │
│       ↓                                │
│  Sub-loop: Costo → P-Rápidas →        │
│            Pasivas rival → Reemplazo   │
│                                        │
│  Máx: 1 Ixim + 1 Rot, o 2 ocultos    │
│  del mismo tipo                        │
└────────────────────────────────────────┘
```

### 2.5 Fin de Turno

```
┌──── FIN DE TURNO ─────────────────────────────────────┐
│                                                        │
│  1. Pago de costos pendientes          cost:* deferred │
│       ↓                                                │
│  2. Activas de "fin de turno"          trg:end-of-turn │
│     (primero Activas, luego Pasivas)   op:* resolve    │
│       ↓                                                │
│  3. FIN de Activas/Pasivas             trg:eot-expire  │
│     (efectos temporales expiran)                       │
│       ↓                                                │
│  4. Veneno ☠️                          trg:on-poison   │
│     (1 dmg a cada carta envenenada)    op:damage:1     │
│       ↓                                                │
│  5. Pasivas                            trg:end-of-turn │
│       ↓                                                │
│     Sub-loop: Costo → P-Rápidas → Pasivas → Reemplazo │
│       ↓                                                │
│  6. Actualización de descansos         trg:on-rest     │
│     - No atacaron/A: -1 descanso                       │
│     - Atacaron/A: entran a sus descansos               │
│       ↓                                                │
│  INICIO DEL TURNO RIVAL                                │
└────────────────────────────────────────────────────────┘
```

### 2.6 Resolución de Múltiples Pasivas

Regla oficial: si ambos jugadores tienen Pasivas simultáneas →
**se alternan**, empezando por el jugador en turno.

Tag relevante: el engine debe trackear `priority:active-player-first`.

---

## 3. Comparativa: Tags v1 (actual) vs Tags v2

| Concepto | Tags v1 (actual) | Tags v2 (propuesto) |
|----------|-------------------|---------------------|
| Cuándo se activa | `timing:immediate`, `timing:passive`, `timing:response` | `trg:on-attack`, `trg:on-death`, `trg:on-reveal`, etc. (17 triggers) |
| Requisitos | `needs:allies`, `self:independent` | `pre:independent`, `pre:needs-ally`, `pre:min-extinction:N` (22 prereqs) |
| Costo | ❌ No existe | `cost:self-damage:N`, `cost:ally-extinct`, etc. (12 costs) |
| Qué hace | `does:damage`, `does:heal` | `op:damage:N`, `op:heal:N` con parámetros (28 ops) |
| A quién | `target:ally`, `target:enemy` | `tgt:self`, `tgt:ally`, `tgt:facing` (7 targets) |
| Restricciones | ❌ No existe | `rst:cant-attack`, `rst:cant-heal`, etc. (11 restrictions) |
| Rol estratégico | `opener`, `closer`, `hitter`, etc. | Se mantiene igual (meta-tag, no mecánico) |
| Afinidad | `aff:atlica`, `aff:titan` | Se mantiene igual (meta-tag, no mecánico) |

### Resumen de cambios

| Capa | v1 | v2 | Delta |
|------|----|----|-------|
| Trigger | 7 tags | 17 tags | +10 (granularidad de fases) |
| Prerequisite | 13 tags | 22 tags | +9 (parámetros) |
| Cost | 0 tags | 12 tags | +12 (capa nueva) |
| Operation | 17 tags | 28 tags | +11 (parámetros) |
| Target | 4 tags | 7 tags | +3 |
| Restriction | 0 tags | 11 tags | +11 (capa nueva) |
| **Total mecánico** | **41 tags** | **97 tags** | **+56** |

Roles (7) y Afinidad (16) se mantienen = 23 tags de clasificación.

**Total v2: 120 tags** (97 mecánicos + 23 clasificación).

---

## 4. Ejemplo Completo: Navi Dequak

**Texto:** "Activa: Si esta carta ataca, se cura 1 punto. Pasiva: Si esta carta fue atacada, escala 1 punto."

### Pipeline 1: Activa
```
trg:on-attack → pre:independent → cost:none → op:heal:1 → tgt:self
```

### Pipeline 2: Pasiva
```
trg:on-damaged → pre:independent → cost:none → op:scale:1 → tgt:self
```

### Tags v2 completos:
```
trg:on-attack, trg:on-damaged,
pre:independent,
cost:none,
op:heal:1, op:scale:1,
tgt:self
```

### Comparar con v1:
```
does:heal, does:scale, self:independent, 
timing:immediate, timing:passive, target:self
```

La v2 captura QUE la curación es on-attack y el escalado es on-damaged.
La v1 no distingue cuál efecto tiene cuál trigger.

---

## 5. Ejemplo Completo: Protección Selectiva (LGRO-038)

**Texto:** "Activa-Rápida: Si esta carta es atacada, niega el ataque y redirige a otra carta aliada con el mismo nombre."
**Costo:** "Daña 1 pto a la carta que recibe el ataque."

### Pipeline:
```
trg:on-damaged → pre:needs-same-name → cost:ally-damage:1 → [op:negate-attack, op:redirect] → tgt:ally
```

### Tags v2:
```
trg:on-damaged,
pre:needs-same-name,
cost:ally-damage:1,
op:negate-attack, op:redirect,
tgt:ally,
rst:target-filter:same-name
```

---

## 6. Migración: v1 → v2

### Fase 1: Compatibilidad (no breaking)
- Agregar tags v2 como capa adicional, sin tocar v1
- UI de validación muestra v2 opcionalmente
- Engine sigue usando v1 + effect_definitions.json

### Fase 2: Migración gradual
- Nuevas validaciones usan v2
- Script de migración: v1 → v2 automático donde sea unambiguo
- Cartas ya validadas en v1 se migran, marcando para re-validación las ambiguas

### Fase 3: Engine v2
- Engine lee tags v2 directamente
- Pipeline: trigger → prereq → cost → operation(target) → restriction
- Fallback a regex para cartas sin tags v2
- effect_definitions.json se genera desde tags v2 validados

---

## 7. Impacto en UI (kodem-lab)

### Examen
- Preguntas pueden ser más específicas: "¿Cuál es el TRIGGER de esta carta?" vs "¿Qué HACE?"
- Niveles de dificultad: Básico = operaciones, Intermedio = triggers+costos, Avanzado = pipeline completo

### Validación
- Editor de tags muestra pipeline visual: TRIGGER → PREREQ → COST → OP → TARGET
- Cada carta puede tener múltiples pipelines (Activa + Pasiva)
- Validar = confirmar que el pipeline es correcto

### Guía > Explorar
- Filtros por trigger, por costo, por restricción
- "¿Qué cartas se activan on-death?" → filtro directo
- "¿Qué cartas tienen costo de auto-daño?" → filtro directo

---

_Diseño: 2026-04-08 | Fuentes: Rulebook v5.0 + Diagrama de flujo oficial_
