# Kódem TCG — Tag System v2 Design Document

> Diseño del sistema de etiquetado que mapea el reglamento oficial (Rulebook v5.0)
> al engine de simulación. Cada tag corresponde a un punto específico del diagrama
> de flujo de resolución de turnos.
>
> **v2.1** — Actualizado con hallazgos de validación empírica (20 cartas analizadas).

## Fuentes

- Rulebook v5.0 (Feb 2026)
- Diagrama de flujo oficial (6 fases + Pasar Turno)
- Reglas v5.0 consolidadas: `/docs/reglas.md`
- Engine actual: `codice-kodem/api/kodem_engine/`
- **Validación empírica: 20 cartas en orden de folio** (§8)

---

## 1. Arquitectura: El Pipeline de Efecto

Cada efecto de carta se modela como un **pipeline** de 6 capas que se ejecutan en orden:

```
TRIGGER → PREREQUISITE → COST → OPERATION(count, choice) → TARGET(filter) → RESTRICTION(duration)
```

Una carta puede tener **múltiples pipelines** (ej: Activa + Pasiva + on-death).

### Conceptos transversales (descubiertos en validación)

Estos no son capas del pipeline sino **modificadores** que pueden aplicar a cualquier capa:

| Concepto | Descripción | Ejemplo |
|----------|-------------|---------|
| `count:N` | Cuántos targets afecta | "2 Adendei rivales" → count:2 |
| `count:all` | Afecta a todos | "todos los Adendei" → count:all |
| `choice:MIN-MAX` | Jugador elige valor | "escala 1-5 ptos" → choice:1-5 |
| `filter:TYPE` | Solo cartas de tipo/energía/subtipo | "Adendei-Gélido" → filter:gelida |
| `filter:SUBTYPE` | Solo cartas de subtipo | "Titán aliado" → filter:titan |
| `duration:turn` | Efecto dura 1 turno | "hasta el final de tu turno" |
| `duration:next-turn` | Efecto dura hasta tu siguiente turno | "hasta el final de tu siguiente turno" |
| `duration:permanent` | Efecto permanente | Escalar, descansos |
| `duration:while-on-field` | Mientras la carta esté en campo | Auras |
| `optional:true` | Jugador puede elegir no usar | "Puedes..." |
| `mirror:cost` | Costo = valor de la operación | Xilan Calma |

### 1.1 TRIGGER (¿cuándo se activa?)

Define en qué punto del diagrama de flujo el efecto puede activarse.

| Tag | Fase | Descripción | Ejemplo |
|-----|------|-------------|---------|
| `trg:on-attack` | Batalla | Esta carta declara ataque | Ariam Dualidad |
| `trg:on-activate` | Batalla | Esta carta usa su Activa | Enis Coma, Hierro |
| `trg:on-damaged` | Batalla | Esta carta recibe daño | Navi Dequak (Pasiva) |
| `trg:on-ally-attack` | Batalla | Aliada de energía/tipo X ataca | Nok Frío Magno |
| `trg:on-ally-damaged` | Batalla | Aliada es atacada | Zaykan Emboscada |
| `trg:on-reveal` | Previa/Post | Esta carta es revelada | Zaykan Retorno |
| `trg:on-ally-reveal` | Previa/Post | Aliada de tipo X es revelada | Draxes, Rasvel, Ryptor |
| `trg:on-any-reveal` | Cualquiera | Cualquier carta es revelada | Bio: Caldera Submarina |
| `trg:on-death` | Post | Esta carta va a Extinción | Nok Frío Magno (cost_text) |
| `trg:on-ally-death` | Post | Aliada muere | Ariam, Fuerza del Más Allá |
| `trg:on-equip` | Equipo | Esta carta es equipada | Adasi, Amparo Vegetal |
| `trg:on-healed` | Cualquiera | Esta carta es curada | Zilit, Luz Líquida |
| `trg:end-of-turn` | Fin | Fin de turno (paso 2-3) | Efectos "fin de turno" |
| `trg:end-of-turn-expire` | Fin | Efectos temporales expiran (paso 3) | Ariam Carga Pírica |
| `trg:on-poison` | Fin | Veneno (paso 4) | Daño de veneno |
| `trg:on-rest-update` | Fin | Actualización descansos (paso 6) | Descansos normales |
| `trg:while-on-field` | Continuo | Mientras esté en campo (aura) | Nok Frío Magno (pipeline 1) |
| `trg:on-pass-turn` | Previa | Al pasar turno | Aki, Venas de Lava |
| `trg:on-draw` | Reemplazo | Al ser tomada del Mazo | Efectos "al ser tomada" |
| `trg:on-bio-extinct` | Previa | Bio enviado a Extinción | Kumba Despertar |
| `trg:on-link` | Batalla | Al usar Vínculo Odémico | Efectos de Protector |
| `trg:unconditional` | Siempre | Efecto siempre activo | Stats base |

**Total: 22 triggers** (era 17, +5 de validación)

### 1.2 PREREQUISITE (¿se puede activar?)

Condiciones que deben cumplirse ANTES de pagar el costo.

| Tag | Descripción | Ejemplo |
|-----|-------------|---------|
| `pre:independent` | Sin requisitos | Mayoría de cartas |
| `pre:once-per-game` | 1 vez por juego | Xilan Tercer Aniversario |
| `pre:once-per-turn` | 1 vez por turno | Zilit, Pasivas Opcionales |
| `pre:once-per-field` | 1 vez mientras esté en campo | Kumba Despertar, Xilan Calma |
| `pre:min-extinction:N` | N+ cartas en propia Extinción | Espectros |
| `pre:min-ext-type:TYPE:N` | N+ cartas de tipo X en Extinción | Ariam, Fuerza (Pírica) |
| `pre:needs-equip` | Requiere Ixim o Rot equipado | La Cúspide |
| `pre:needs-equip:ixim` | Requiere Ixim específico | — |
| `pre:needs-equip:rot` | Requiere Rot específico | — |
| `pre:needs-ally` | Requiere aliada(s) en campo | Protección Selectiva |
| `pre:needs-ally:FILTER` | Requiere aliada de tipo específico | Nok (Gélido) |
| `pre:needs-same-name` | Requiere carta con mismo nombre | Pétalos de Fuego |
| `pre:needs-rava` | Requiere Rava en campo | Zaykan, Cambio de Energía |
| `pre:needs-protector` | Requiere Protector vivo | Ulmor, Vínculo Odémico |
| `pre:needs-bio` | Requiere Bio en campo | — |
| `pre:needs-titan` | Requiere Titán en campo | — |
| `pre:needs-token` | Requiere Token en campo | — |
| `pre:needs-mark` | Requiere marca en rival | Shugg, Fuga |
| `pre:needs-rests` | Depende de descansos rivales | Karus, Pinchazo Doble |
| `pre:needs-link` | Requiere Adendei vinculado | Tlahuelpuchi |
| `pre:needs-revive` | Requiere vivificar | Enis, Plumas de la Muerte |
| `pre:no-own:TYPE` | **NO tener** carta de tipo X | Zotz Aislamiento (no tener Bio) |
| `pre:needs-same-energy` | Requiere cartas misma energía | — |

**Total: 23 prerequisitos** (era 22, +1 negativo)

### 1.3 COST (¿qué pagas?)

Se paga DESPUÉS de verificar prerequisitos, ANTES de ejecutar.
En Batalla: se paga junto con Quemadura (subfase Pago de Costos).

| Tag | Descripción | Ejemplo |
|-----|-------------|---------|
| `cost:none` | Sin costo | Mayoría |
| `cost:self-damage:N` | Esta carta se daña N pts | Ulmor, Ataque Fugaz |
| `cost:ally-damage:N` | 1 aliada se daña N pts | Protección Selectiva |
| `cost:ally-damage-all:N` | Todas las aliadas se dañan N pts | Ariam Dualidad |
| `cost:field-damage-all:N` | Todas aliadas en campo (con filter) | Xilan Calma |
| `cost:self-extinct` | Envía esta carta a Extinción | Hierro, Therz |
| `cost:self-return-deck:POS` | Envía esta carta al Mazo (top/bottom) | Xilan Tercer Aniversario |
| `cost:ally-extinct` | Envía aliada a Extinción | — |
| `cost:ally-extinct:N` | Envía N aliadas a Extinción | Revivir Rava (2 cartas) |
| `cost:equip-extinct` | Envía equipo a Extinción | — |
| `cost:bio-extinct` | Envía Bio a Extinción | — |
| `cost:lose-turn` | Pierde próximo turno | Yakerr, Hogar |
| `cost:no-attack-this-turn` | No puede atacar este turno | Kumba Despertar |
| `cost:extra-rest:N` | N descansos adicionales | — |
| `cost:protector-damage:N` | Daña N pts al propio Protector | — |
| `cost:pass-turn` | Requiere pasar turno previo | Aki, Venas de Lava |
| `cost:mirror` | Costo = valor elegido en operación | Xilan Calma |

**Total: 17 costos** (era 12, +5 de validación)

### 1.4 OPERATION (¿qué hace?)

Acciones atómicas que el engine ejecuta. Se ejecutan en orden secuencial.
En Batalla: Daño se resuelve en ventana 3, Activas en ventana 4.

#### 1.4.1 Daño

| Tag | Descripción |
|-----|-------------|
| `op:damage:N` | Daña N pts (por efecto) |
| `op:damage-protector:N` | Daña N pts al Protector rival |
| `op:damage-all:N` | Daña N pts a todas (con filter/target) |
| `op:damage-multi:N:COUNT` | Daña N pts hasta a COUNT cartas |
| `op:damage-per:CONDITION` | Daño escalable (por extinción, marcas, etc.) |
| `op:damage-double:rests` | Daño = doble de sus descansos | Xilan Poder del Árbol |

#### 1.4.2 Curación

| Tag | Descripción |
|-----|-------------|
| `op:heal:N` | Cura N pts |
| `op:heal-all:N` | Cura a todas las aliadas N pts |
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
| `op:scale:CHOICE` | Escalar con elección (ej: 1-5) |
| `op:scale-per:CONDITION` | Escalar condicional |
| `op:descend:N` | Descender -N daño permanente |
| `op:reset-stats` | Regresa estadísticas a valor original | Virste Reseteo |
| `op:attack-as:double-rests` | Atacar con doble daño = descansos | Xilan Poder del Árbol |

#### 1.4.5 Descansos (§6.1)

| Tag | Descripción |
|-----|-------------|
| `op:rest-add:N` | Añadir N descansos |
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
| `op:reveal-all` | Revelar todas en Zona Principal | Zaykan Retorno |
| `op:swap` | Intercambiar posiciones |
| `op:return-deck:POS` | Regresar al Mazo (top/bottom) |
| `op:send-extinction` | Enviar a Extinción |
| `op:vivify:HP` | Vivificar con HP puntos de vida | Xilan Aniv. (vivify:3) |
| `op:enhanced-replace:N` | Super-reemplazo: toma N, elige 1 | Hierro (toma 6) |

#### 1.4.8 Equipamiento

| Tag | Descripción |
|-----|-------------|
| `op:equip-from-extinct` | Equipar desde Extinción | Therz Invocación |
| `op:equip-destroy` | Destruir equipo rival |

#### 1.4.9 Especial

| Tag | Descripción |
|-----|-------------|
| `op:create-token` | Crear Token (§2.7, máx 2) |
| `op:copy` | Copiar efecto de otra carta |
| `op:feralizar` | Cambiar energía a Feral (§8) |
| `op:redirect` | Redirigir daño/ataque |
| `op:link` | Vincular al Protector (§6.3) |
| `op:possess` | Poseer Adendei (Espectro, §2.8) |
| `op:attack-all` | Atacar a todas las rivales |
| `op:attack-protector` | Puede atacar Protector directamente |
| `op:multi-attack:N` | Atacar N veces |
| `op:promote-to-fast` | Efecto se vuelve rápido este turno | Ryptor Jugada Veloz |

**Total: 42 operaciones** (era 28, +14 de validación)

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
| `tgt:triggering` | A la carta que disparó el trigger | Zaykan Emboscada (self + rival) |

**Total: 8 targets** (era 7, +1)

### 1.6 RESTRICTION (¿qué limitaciones tiene?)

Restricciones sobre qué puede/no puede hacer una carta.

| Tag | Descripción |
|-----|-------------|
| `rst:cant-attack` | No puede atacar |
| `rst:cant-be-attacked` | No puede ser atacada |
| `rst:cant-be-damaged-effect` | No puede ser dañada por efectos |
| `rst:cant-equip` | No puede ser equipada |
| `rst:cant-heal` | No puede ser curada (por efecto) | Ariam Carga Pírica |
| `rst:cant-rest-update` | No puede actualizar descansos |
| `rst:cant-link` | No puede vincularse |
| `rst:cant-negate` | No puede ser negada |
| `rst:cant-be-protected` | No puede ser protegida | Xilan Poder del Árbol |
| `rst:cant-hide` | Ninguna carta puede ocultarse | Zaykan Retorno |
| `rst:target-filter:ENERGY` | Solo afecta energía X |
| `rst:target-filter:SUBTYPE` | Solo afecta subtipo X |
| `rst:target-filter:TYPE` | Solo afecta tipo (Adendei, Rot, etc.) |
| `rst:compatible:CARD` | Equipo compatible solo con carta X |

**Total: 14 restricciones** (era 11, +3)

---

## 2. Mapeo: Diagrama de Flujo → Tags

### 2.1 Fase Previa

```
                    ┌─────────────────────────────────┐
                    │          FASE PREVIA              │
                    │                                   │
 trg:on-reveal ────→│  Revelar cartas                   │
 trg:on-ally-reveal │  (propias o aliadas)              │
                    │       ↓                           │
 trg:while-on-field─│  Pasivas (obligatorias)           │──→ pre:* check
 trg:unconditional  │  Pasivas Opcionales               │──→ pre:once-per-turn, optional
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
│ trg:on-activate    │    │ + Quemadura  │    │    trg:on-activate  │
│ trg:on-link        │    │ (§7, no es   │    │    (fast effects)   │
│                    │    │  costo)      │    │                     │
│ Elige carta        │    │              │    │ 2. A-Rápida rival   │
│ Elige objetivo     │    │              │    │    trg:on-ally-     │
│ Declara Activa     │    │              │    │    damaged (response)│
│ o Vínculo          │    │              │    │                     │
│                    │    │              │    │ 3. DAÑO por ataque  │
│                    │    │              │    │    (stats de carta)  │
│                    │    │              │    │                     │
│                    │    │              │    │ 4. ACTIVA            │
│                    │    │              │    │    trg:on-activate   │
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
│     (efectos temporales expiran)       duration:turn   │
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

## 3. Resumen de Tags v2

| Capa | Count | Ejemplo |
|------|-------|---------|
| Trigger | 22 | `trg:on-attack`, `trg:on-ally-reveal`, `trg:on-healed` |
| Prerequisite | 23 | `pre:once-per-field`, `pre:no-own:bio` |
| Cost | 17 | `cost:ally-damage-all:1`, `cost:mirror`, `cost:self-return-deck` |
| Operation | 42 | `op:reset-stats`, `op:vivify:3`, `op:promote-to-fast` |
| Target | 8 | `tgt:triggering` |
| Restriction | 14 | `rst:cant-be-protected`, `rst:cant-hide` |
| **Total mecánico** | **126** | |
| Modificadores | 11 | `count:N`, `choice:1-5`, `filter:TYPE`, `duration:turn`, `optional`, `mirror` |
| Roles (meta) | 7 | `opener`, `closer`, `hitter`, `support`, `engine`, `disruptor`, `tech` |
| Afinidad (meta) | 16 | `aff:atlica`...`aff:catrin` |
| **Total sistema** | **~160** | |

---

## 4. Comparativa: Tags v1 (actual) vs Tags v2

| Concepto | Tags v1 (actual) | Tags v2 (propuesto) |
|----------|-------------------|---------------------|
| Cuándo se activa | `timing:immediate/passive/response` (3) | 22 triggers específicos por fase |
| Requisitos | `needs:allies`, `self:independent` (13) | 23 prereqs con negación y parametrización |
| Costo | ❌ No existe | 17 costos incluyendo mirror y restricción |
| Qué hace | `does:damage/heal` (17) | 42 operaciones con parámetros y compuestas |
| A quién | `target:ally/enemy` (4) | 8 targets incluyendo triggering |
| Restricciones | ❌ No existe | 14 restricciones |
| Rol estratégico | 7 roles | Se mantiene (meta-tag) |
| Afinidad | 16 tags | Se mantiene (meta-tag) |
| Modificadores | ❌ No existe | 11 conceptos transversales |

---

## 5. Validación Empírica: 20 Cartas

### Resumen de cobertura

| Resultado | Cartas | % |
|-----------|--------|---|
| ✅ Mapea limpiamente | 2 | 10% |
| ⚠️ Mapea con tags nuevos (ya añadidos) | 18 | 90% |
| ❌ No mapeable | 0 | 0% |

### Carta por carta

#### 1. `009/066` — Nok, Frío Magno (Rava Gélida)
**Texto:** "Pasiva: Aumenta 1 punto de ataque a los Adendei-Gélido mientras esta carta esté en campo. Si un Adendei-Gélido aliado atacó, cura 1 punto a un Adendei-Gélido aliado."
**Costo:** "Si esta carta es enviada a Extinción, daña 1 punto a todos los Adendei-Gélido en campo."

**3 pipelines:**
```
P1 (Aura):       trg:while-on-field → pre:independent → cost:none → op:scale:1 → tgt:ally [filter:gelida]
P2 (Curación):   trg:on-ally-attack [filter:gelida] → pre:independent → cost:none → op:heal:1 → tgt:ally [filter:gelida]
P3 (On-death):   trg:on-death → pre:independent → cost:none → op:damage-all:1 → tgt:both [filter:gelida]
```
**Tags descubiertos:** `trg:on-ally-attack`, cost_text como trigger (on-death disfrazado)

#### 2. `ANIV-001` — Xilan, Tercer Aniversario (Adendei Húumica)
**Texto:** "Pasiva: Puedes enviar esta carta al fondo de tu Mazo y regresar 1 Rava de tu Extinción a tu ZP con 3 PV."
**Costo:** "Solo 1 vez por juego"
```
trg:while-on-field → pre:once-per-game → cost:self-return-deck:bottom → op:vivify:3 → tgt:ally [filter:rava, optional]
```
**Tags descubiertos:** `cost:self-return-deck:POS`, `op:vivify:HP` (parametrizado), `optional`

#### 3. `BETA-001` — Ariam, Dualidad (Adendei Pírica)
**Texto:** "Costo: Antes de atacar, esta carta quita 1 pto. de vida a los Adendei aliados."
```
trg:on-attack → pre:independent → cost:ally-damage-all:1 → (ataque normal) → tgt:enemy
```
**Tags descubiertos:** `cost:ally-damage-all:N`

#### 4. `CAMP-001` — Kumba, Despertar (Adendei Lítica)
**Texto:** "Pasiva: Si el Bio aliado es enviado a Extinción, puedes enviar a Extinción 1 Adendei rival."
**Costo:** "No puedes atacar este turno. Solo 1 vez mientras esté en campo."
```
trg:on-bio-extinct → pre:once-per-field → cost:no-attack-this-turn → op:send-extinction → tgt:enemy [filter:adendei, optional]
```
**Tags descubiertos:** `pre:once-per-field`, `cost:no-attack-this-turn`

#### 5. `CAMP-002` — Zotz, Aislamiento (Adendei Húumica)
**Texto:** "Activa: Si no tienes Bio, envía esta carta y el Bio rival a Extinción."
```
trg:on-activate → pre:no-own:bio → cost:self-extinct → op:send-extinction → tgt:enemy [filter:bio]
```
**Tags descubiertos:** `pre:no-own:TYPE` (prerequisito negativo)

#### 6. `CAMP-003` — Xilan, Calma (Adendei Húumica)
**Texto:** "Esta carta puede escalar 1-5 ptos. una vez mientras esté en el campo."
**Costo:** "Daña los mismos ptos. escalados a todos los Adendei en tu campo."
```
trg:on-activate → pre:once-per-field → cost:field-damage-all:MIRROR [filter:adendei] → op:scale:CHOICE(1-5) → tgt:self
```
**Tags descubiertos:** `choice:MIN-MAX`, `cost:mirror`, `cost:field-damage-all:N`

#### 7. `CAMP-004` — Enis, Coma (Adendei Gélida) ✅
**Texto:** "Activa: 2 Adendei rivales reciben 1 descanso."
```
trg:on-activate → pre:independent → cost:none → op:rest-add:1 → tgt:enemy [count:2, filter:adendei]
```
✅ Mapea limpiamente con `count:N`

#### 8. `CAMP-005` — Zenam, Veneno Siseante (Adendei Cháaktica) ✅
**Texto:** "Activa: Envenena un Adendei rival."
```
trg:on-activate → pre:independent → cost:none → op:poison → tgt:enemy [count:1, filter:adendei]
```
✅ Mapea limpiamente

#### 9. `CAMP-006` — Hierro (Rot)
**Texto:** "Activa: Toma 6 del Mazo, elige 1, cambia por carta en ZP con 6 PV. Resto al fondo."
**Costo:** "Esta carta debe ser enviada a Extinción."
```
trg:on-activate → pre:independent → cost:self-extinct → op:enhanced-replace:6 → tgt:ally
```
**Tags descubiertos:** `op:enhanced-replace:N` (super-reemplazo)

#### 10. `CAMP-007UV` — Virste, Reseteo (Adendei Átlica Titán)
**Texto:** "Activa: Regresa las estadísticas de todas las cartas en el campo a su valor original."
```
trg:on-activate → pre:independent → cost:none → op:reset-stats → tgt:both [count:all]
```
**Tags descubiertos:** `op:reset-stats`

#### 11. `CAMP-008UV` — Dagg, Estrella del Abismo (Adendei Feral Titán)
**Texto:** "Activa-Rápida: Coloca 1 Adendei-Feral boca abajo."
```
trg:on-activate [fast] → pre:independent → cost:none → op:hide → tgt:ally [count:1, filter:feral]
```
✅ Mapea bien. Nota: Activa-Rápida se modela como `trg:on-activate` con flag `fast`

#### 12. `CAMP-009UV` — Therz, Invocación (Adendei Demótica Titán)
**Texto:** "Activa-Rápida: Equipa a 1 Adendei en ZP con 1 Ixim o Rot en Extinción."
**Costo:** "Enviar esta carta a Extinción."
```
trg:on-activate [fast] → pre:independent → cost:self-extinct → op:equip-from-extinct → tgt:ally [filter:adendei]
```
**Tags descubiertos:** `op:equip-from-extinct`

#### 13. `CAMP-010UV` — Zaykan, Emboscada (Adendei Lítica)
**Texto:** "A-Rápida: Si una carta aliada es atacada, esta carta y una carta rival en ZP reciben 1 descanso."
```
trg:on-ally-damaged [fast] → pre:independent → cost:none → op:rest-add:1 → tgt:self + tgt:enemy [count:1]
```
**Tags descubiertos:** `trg:on-ally-damaged`, multi-target (self + enemy)

#### 14. `CAMP-011UV` — Draxes, Instinto Draconiano (Adendei Pírica Titán)
**Texto:** "Pasiva: Si 1 Adendei-Pírico Titán aliado es revelado, quema 1 carta en ZP."
```
trg:on-ally-reveal [filter:pirica+titan] → pre:independent → cost:none → op:burn → tgt:enemy [count:1]
```
**Tags descubiertos:** `trg:on-ally-reveal`, filter compuesto (energía+subtipo)

#### 15. `CAMP-012UV` — Rasvel, ¡Descongelado! (Adendei Gélida Titán)
**Texto:** "Pasiva: Si 1 Adendei-Gélido Titán aliado es revelado, actualiza 1 descanso de 1 carta en ZP."
```
trg:on-ally-reveal [filter:gelida+titan] → pre:independent → cost:none → op:rest-remove:1 → tgt:any [count:1]
```
✅ Usa mismo trigger que Draxes con diferente filter

#### 16. `CAMP-013UV` — Zilit, Luz Líquida (Adendei Húumica Titán)
**Texto:** "Si esta carta es curada, esta carta escala 1 pto."
**Costo:** "Solo 1 vez por turno."
```
trg:on-healed → pre:once-per-turn → cost:none → op:scale:1 → tgt:self
```
**Tags descubiertos:** `trg:on-healed`

#### 17. `CAMP-014UV` — Xilan, Poder del Árbol Sagrado (Adendei Húumica Catrín)
**Texto:** "Pasiva: Esta carta puede atacar con doble daño igual a los descansos que recibirá. No puede ser protegida."
```
trg:while-on-field → pre:independent → cost:none → op:attack-as:double-rests → tgt:self [rst:cant-be-protected]
```
**Tags descubiertos:** `op:attack-as:double-rests`, `rst:cant-be-protected`

#### 18. `CAMP-015UV` — Zaykan, Retorno del Ermitaño (Adendei Lítica)
**Texto:** "Pasiva: Si esta carta es revelada, revela todas las cartas en ZP. Ninguna carta en ZP puede estar boca abajo."
```
P1: trg:on-reveal → pre:independent → cost:none → op:reveal-all → tgt:both
P2: trg:while-on-field → pre:independent → cost:none → rst:cant-hide → tgt:both
```
**Tags descubiertos:** `op:reveal-all`, `rst:cant-hide`

#### 19. `CAMP-016` — Ariam, Carga Pírica (Adendei Pírica)
**Texto:** "Activa: Si esta carta ataca, la carta atacada no puede ser curada hasta el final de tu siguiente turno."
```
trg:on-attack → pre:independent → cost:none → rst:cant-heal → tgt:facing [duration:next-turn]
```
**Tags descubiertos:** `duration:next-turn` (efecto temporal que expira en trg:end-of-turn-expire)

#### 20. `CAMP-017` — Ryptor, Jugada Veloz (Adendei Cháaktica Titán)
**Texto:** "Pasiva: Si 1 Adendei-Cháaktico Titán aliado es revelado, el efecto de ese Adendei se considera efecto rápido durante este turno."
```
trg:on-ally-reveal [filter:chaaktica+titan] → pre:independent → cost:none → op:promote-to-fast → tgt:triggering [duration:turn]
```
**Tags descubiertos:** `op:promote-to-fast`, `tgt:triggering`, `duration:turn`

---

## 6. Tags Descubiertos en Validación (Changelog v2.0 → v2.1)

### Triggers nuevos (+5)
| Tag | Descubierto en |
|-----|----------------|
| `trg:on-activate` | 6 cartas — diferente a on-attack |
| `trg:on-ally-attack` | Nok Frío Magno |
| `trg:on-ally-damaged` | Zaykan Emboscada |
| `trg:on-ally-reveal` | Draxes, Rasvel, Ryptor |
| `trg:on-healed` | Zilit Luz Líquida |

### Prerequisitos nuevos (+1)
| Tag | Descubierto en |
|-----|----------------|
| `pre:no-own:TYPE` | Zotz Aislamiento |

### Costos nuevos (+5)
| Tag | Descubierto en |
|-----|----------------|
| `cost:ally-damage-all:N` | Ariam Dualidad |
| `cost:field-damage-all:N` | Xilan Calma |
| `cost:self-return-deck:POS` | Xilan Aniversario |
| `cost:no-attack-this-turn` | Kumba Despertar |
| `cost:mirror` | Xilan Calma |

### Operaciones nuevas (+8)
| Tag | Descubierto en |
|-----|----------------|
| `op:reset-stats` | Virste Reseteo |
| `op:enhanced-replace:N` | Hierro |
| `op:equip-from-extinct` | Therz Invocación |
| `op:reveal-all` | Zaykan Retorno |
| `op:vivify:HP` | Xilan Aniversario (vivify con HP variable) |
| `op:attack-as:double-rests` | Xilan Poder del Árbol |
| `op:promote-to-fast` | Ryptor Jugada Veloz |
| `op:damage-double:STAT` | Xilan Poder del Árbol |

### Targets nuevos (+1)
| Tag | Descubierto en |
|-----|----------------|
| `tgt:triggering` | Ryptor Jugada Veloz |

### Restricciones nuevas (+3)
| Tag | Descubierto en |
|-----|----------------|
| `rst:cant-be-protected` | Xilan Poder del Árbol |
| `rst:cant-hide` | Zaykan Retorno |
| `rst:cant-heal` (con duration) | Ariam Carga Pírica |

### Modificadores nuevos (+6)
| Concepto | Descubierto en |
|----------|----------------|
| `count:N` | Enis Coma (count:2), Zenam (count:1) |
| `count:all` | Virste (todas), Zaykan Retorno (todas) |
| `choice:MIN-MAX` | Xilan Calma (1-5) |
| `filter:ENERGY+SUBTYPE` | Draxes (pirica+titan) |
| `duration:turn/next-turn` | Ariam Carga Pírica, Ryptor |
| `optional:true` | Xilan Aniversario, Kumba |
| `mirror:cost` | Xilan Calma |
| `fast` (flag en trigger) | Dagg, Therz, Zaykan Emboscada |

---

## 7. Migración: v1 → v2

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
- Pipeline: trigger → prereq → cost → operation(target, count, filter) → restriction(duration)
- Fallback a regex para cartas sin tags v2
- effect_definitions.json se genera desde tags v2 validados

---

## 8. Impacto en UI (kodem-lab)

### Examen
- Preguntas por capa: "¿Cuál es el TRIGGER de esta carta?" vs "¿Qué HACE?"
- Niveles: Básico = operaciones, Intermedio = triggers+costos, Avanzado = pipeline completo

### Validación
- Editor muestra pipeline visual: TRIGGER → PREREQ → COST → OP → TARGET
- Cada carta puede tener múltiples pipelines (Activa + Pasiva + on-death)
- Validar = confirmar que cada pipeline es correcto

### Guía > Explorar
- Filtros por trigger, por costo, por restricción
- "¿Qué cartas se activan on-death?" → filtro directo
- "¿Qué cartas tienen costo de auto-daño?" → filtro directo

### Guía > Diagrama
- Diagrama interactivo del flujo de resolución (ya desplegado)
- Link al documento completo en GitHub

---

## 9. Próximos Pasos

1. **Validar 30 cartas más** para estabilizar el catálogo de tags
2. **Crear schema JSON** para pipelines (estructura de datos, no solo tags planos)
3. **Script de migración** v1 → v2 automático
4. **UI de validación** v2 en kodem-lab/examen
5. **Engine handlers** que lean pipelines v2 directamente

---

_Diseño: 2026-04-08 | Actualizado: 2026-04-08 (v2.1 con validación empírica)_
_Fuentes: Rulebook v5.0 + Diagrama de flujo oficial + 20 cartas validadas_