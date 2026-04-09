# Kódem TCG — Tag System v2 Design Document

> Diseño del sistema de etiquetado que mapea el reglamento oficial (Rulebook v5.0)
> al engine de simulación. Cada tag corresponde a un punto específico del diagrama
> de flujo de resolución de turnos.
>
> **v2.2** — Refinado con validación empírica de 60 cartas (12% del total).

## Fuentes

- Rulebook v5.0 (Feb 2026)
- Diagrama de flujo oficial (6 fases + Pasar Turno)
- Reglas v5.0 consolidadas: `/docs/reglas.md`
- Engine actual: `codice-kodem/api/kodem_engine/`
- Validación empírica: 60 cartas en orden de folio (§6)

---

## 1. Arquitectura: El Pipeline de Efecto

Cada efecto se modela como un **pipeline** de 6 capas:

```
TRIGGER → PREREQUISITE → COST → OPERATION(params) → TARGET(filter, count) → RESTRICTION(duration)
```

Una carta puede tener **múltiples pipelines** (ej: Activa + Pasiva + on-death = 3 pipelines).

### 1.1 TRIGGER — ¿Cuándo se activa? (27 tags)

#### Eventos propios
| Tag | Descripción | Ejemplo |
|-----|-------------|---------|
| `trg:on-attack` | Esta carta declara ataque | Ariam Dualidad |
| `trg:on-activate` | Esta carta usa su Activa | Enis Coma, Hierro |
| `trg:on-damaged` | Esta carta recibe daño | Navi Dequak |
| `trg:on-reveal` | Esta carta es revelada | Zaykan Retorno |
| `trg:on-death` | Esta carta va a Extinción | Nok Frío Magno |
| `trg:on-equip` | Esta carta es equipada | Adasi |
| `trg:on-healed` | Esta carta es curada | Zilit Luz Líquida |

#### Eventos de aliadas
| Tag | Descripción | Ejemplo |
|-----|-------------|---------|
| `trg:on-ally-attack` | Aliada (con filter) ataca | Nok Frío, Hogg, Muz |
| `trg:on-ally-damaged` | Aliada es atacada | Zaykan Emboscada |
| `trg:on-ally-reveal` | Aliada es revelada | Draxes, Rasvel, Ryptor |
| `trg:on-ally-death` | Aliada va a Extinción | Ariam Fuerza |
| `trg:on-ally-hide` | Aliada es ocultada | Makua Mandíbula |
| `trg:on-ally-leaves-field` | Aliada sale del campo (cualquier forma) | Dagg Reflejos |

#### Eventos globales
| Tag | Descripción | Ejemplo |
|-----|-------------|---------|
| `trg:on-any-reveal` | Cualquier carta es revelada | Bio: Caldera |
| `trg:on-any-healed` | Cualquier carta es curada | Yogg Rencor |

#### Eventos de equipo
| Tag | Descripción | Ejemplo |
|-----|-------------|---------|
| `trg:on-equipped-attack` | La carta a la que estoy equipado ataca | Nenúfar Blanco |

#### Fase de turno
| Tag | Descripción | Ejemplo |
|-----|-------------|---------|
| `trg:end-of-turn` | Fin de turno (paso 2-3) | Ariam Nigromante |
| `trg:end-of-turn-expire` | Efectos temporales expiran | Ariam Carga Pírica |
| `trg:on-poison` | Veneno (paso 4) | Daño de veneno |
| `trg:on-rest-update` | Actualización descansos | Descansos normales |
| `trg:on-pass-turn` | Al pasar turno | Aki |
| `trg:on-draw` | Al ser tomada del Mazo | Reemplazo triggers |
| `trg:on-bio-extinct` | Bio enviado a Extinción | Kumba |
| `trg:on-link` | Al usar Vínculo Odémico | Protector |

#### Estado continuo
| Tag | Descripción | Ejemplo |
|-----|-------------|---------|
| `trg:while-on-field` | Mientras esté en campo (aura) | Nok, Deidades |
| `trg:unconditional` | Siempre activo | Stats base |
| `trg:conditional-self-destruct` | Se destruye si condición falla | Necroalga, Zona Feral |

### 1.2 PREREQUISITE — ¿Se puede activar? (26 tags)

#### Frecuencia
| Tag | Descripción | Ejemplo |
|-----|-------------|---------|
| `pre:independent` | Sin requisitos | Mayoría |
| `pre:once-per-game` | 1 vez por juego | Xilan Aniversario |
| `pre:once-per-turn` | 1 vez por turno | Zilit |
| `pre:once-per-field` | 1 vez mientras esté en campo | Kumba, Xilan Calma |

#### Estado del campo propio
| Tag | Descripción | Ejemplo |
|-----|-------------|---------|
| `pre:needs-ally` | Requiere aliada(s) | Protección Selectiva |
| `pre:needs-ally:FILTER` | Requiere aliada de tipo X | Nok (Gélido) |
| `pre:needs-same-name` | Requiere carta con mismo nombre | Pétalos de Fuego |
| `pre:needs-equip` | Requiere equipo | La Cúspide |
| `pre:needs-equip:TYPE` | Requiere Ixim/Rot específico | — |
| `pre:needs-rava` | Requiere Rava en campo | Zaykan |
| `pre:needs-protector` | Requiere Protector vivo | Ulmor |
| `pre:needs-protector-available` | Protector sin descansos | Ariam Fuerza |
| `pre:needs-bio` | Requiere Bio | — |
| `pre:self-hidden` | Esta carta está boca abajo | Zenam Chispazo |
| `pre:no-own:TYPE` | NO tener carta de tipo X | Zotz (no tener Bio) |

#### Estado de Extinción
| Tag | Descripción | Ejemplo |
|-----|-------------|---------|
| `pre:min-extinction:N` | N+ cartas en Extinción propia | Espectros |
| `pre:min-ext-type:TYPE:N` | N+ de tipo/energía X en Ext. | Ariam (Pírica) |
| `pre:min-ext-name:NAME:N` | N+ cartas con nombre X en Ext. | Ariam Fuerza del Más Allá |
| `pre:min-ext-same-energy:N` | N+ de la misma energía en Ext. | Mizthe Día de Muertos |
| `pre:min-count:TYPE:N:ZONES` | N+ de tipo X en zonas múltiples | Máscara de Pétalos |

#### Estado del target/rival
| Tag | Descripción | Ejemplo |
|-----|-------------|---------|
| `pre:target-has-mark:MARK` | Target tiene marca específica | Hori (burn) |
| `pre:target-has-rests` | Target tiene descansos > 0 | Nok Deidad |
| `pre:total-damage-this-turn:N` | N+ daño recibido este turno | Ariam Nigromante |

#### Otros
| Tag | Descripción | Ejemplo |
|-----|-------------|---------|
| `pre:needs-mark` | Requiere marca en rival | Shugg |
| `pre:needs-link` | Requiere vinculado | Tlahuelpuchi |

### 1.3 COST — ¿Qué pagas? (19 tags)

#### Daño
| Tag | Descripción | Ejemplo |
|-----|-------------|---------|
| `cost:none` | Sin costo | Mayoría |
| `cost:self-damage:N` | Esta carta se daña N | Ulmor |
| `cost:ally-damage:N` | 1 aliada se daña N | Protección Selectiva |
| `cost:ally-damage-all:N` | Todas aliadas se dañan N | Ariam Dualidad |
| `cost:field-damage-all:N` | Todas en campo (con filter) | Xilan Calma |

#### Sacrificio
| Tag | Descripción | Ejemplo |
|-----|-------------|---------|
| `cost:self-extinct` | Envía esta carta a Extinción | Hierro, Therz |
| `cost:self-return-deck:POS` | Envía esta carta al Mazo | Xilan Aniversario |
| `cost:ally-extinct` | Envía aliada a Extinción | — |
| `cost:ally-extinct:N` | Envía N aliadas a Extinción | El Gran Cataclismo |
| `cost:equip-extinct` | Envía equipo a Extinción | — |
| `cost:bio-extinct` | Envía Bio a Extinción | — |

#### Restricción como costo
| Tag | Descripción | Ejemplo |
|-----|-------------|---------|
| `cost:no-attack-this-turn` | No puede atacar este turno | Kumba |
| `cost:lose-turn` | Pierde próximo turno | Yakerr |
| `cost:extra-rest:N` | N descansos adicionales | — |
| `cost:protector-damage:N` | Daña N al propio Protector | — |
| `cost:protector-rest:N` | N descansos al propio Protector | Ariam Fuerza |
| `cost:pass-turn` | Requiere pasar turno previo | Aki |
| `cost:bio-passive-disabled` | Tu Bio pierde su Pasiva | Shugg Serpiente |

#### Especial
| Tag | Descripción | Ejemplo |
|-----|-------------|---------|
| `cost:mirror` | Costo = valor elegido en operación | Xilan Calma |

### 1.4 OPERATION — ¿Qué hace? (51 tags)

#### Daño
| Tag | Descripción |
|-----|-------------|
| `op:damage:N` | Daña N pts |
| `op:damage-all:N` | Daña N a todas (con filter) |
| `op:damage-multi:N:COUNT` | Daña N a hasta COUNT cartas |
| `op:damage-per:CONDITION` | Daño = f(condición) |
| `op:damage-as-revealed:N` | Daño = stat de carta revelada del Mazo |
| `op:damage-protector:N` | Daña N al Protector rival |

#### Curación
| Tag | Descripción |
|-----|-------------|
| `op:heal:N` | Cura N pts |
| `op:heal-all:N` | Cura N a todas |
| `op:remove-marks` | Quita todas las marcas |

#### Marcas (§7)
| Tag | Descripción |
|-----|-------------|
| `op:burn` | Quemar 🔥 |
| `op:poison` | Envenenar ☠️ |
| `op:abyss` | Abismar 🌀 |
| `op:mark-persist:MARK` | Marca no se quita al curar |

#### Estadísticas (§8)
| Tag | Descripción |
|-----|-------------|
| `op:scale:N` | Escalar +N permanente |
| `op:scale:CHOICE` | Escalar con elección (ej: 1-5) |
| `op:scale-per:CONDITION` | Escalar por condición |
| `op:descend:N` | Descender -N permanente |
| `op:reset-stats` | Regresar a stats originales |
| `op:grant-double-damage` | Otorgar doble daño temporal |
| `op:attack-as:FORMULA` | Atacar con daño calculado |

#### Descansos (§6.1)
| Tag | Descripción |
|-----|-------------|
| `op:rest-add:N` | Añadir N descansos |
| `op:rest-remove:N` | Actualizar/quitar N descansos |
| `op:no-rest` | No descansa al atacar |

#### Negación y Protección (§13-14)
| Tag | Descripción |
|-----|-------------|
| `op:negate-effect` | Niega efecto |
| `op:negate-attack` | Niega ataque |
| `op:conditional-negate:CONDITION` | Niega si condición se cumple |
| `op:protect-attack` | Protege de ataques |
| `op:protect-effect` | Protege de efectos |
| `op:immune-marks` | Inmune a marcas |

#### Movimiento
| Tag | Descripción |
|-----|-------------|
| `op:hide` | Ocultar carta |
| `op:reveal` | Revelar carta |
| `op:reveal-all` | Revelar todas en ZP |
| `op:swap` | Intercambiar posiciones |
| `op:swap-field-extinction` | Swap entre campo y Extinción |
| `op:return-deck:POS` | Regresar al Mazo |
| `op:send-extinction` | Enviar a Extinción |
| `op:vivify:HP` | Vivificar con HP puntos |
| `op:enhanced-replace:N` | Super-reemplazo (toma N) |

#### Equipamiento
| Tag | Descripción |
|-----|-------------|
| `op:equip-from-extinct` | Equipar desde Extinción |
| `op:equip-self` | Auto-equiparse |
| `op:equip-destroy` | Destruir equipo rival |
| `op:unequip-all` | Desquipar todos |
| `op:extra-equip-slot:TYPE` | Slot extra de equipo |

#### Identidad y Buff
| Tag | Descripción |
|-----|-------------|
| `op:change-subtype:SUBTYPE` | Cambiar subtipo |
| `op:promote-to-fast` | Efecto se vuelve rápido |
| `op:grant-mark-on-attack:MARK` | Marca en próximo ataque |

#### Especial
| Tag | Descripción |
|-----|-------------|
| `op:create-token` | Crear Token |
| `op:copy` | Copiar efecto |
| `op:peek-enemy-deck:N` | Mirar N del Mazo rival |
| `op:feralizar` | Cambiar a Feral |
| `op:redirect` | Redirigir daño/ataque |
| `op:link` | Vincular al Protector |
| `op:possess` | Poseer Adendei |
| `op:attack-all` | Atacar a todas |
| `op:attack-protector` | Puede atacar Protector |
| `op:multi-attack:N` | Atacar N veces |

### 1.5 TARGET — ¿A quién afecta? (9 tags)

| Tag | Descripción | Ejemplo |
|-----|-------------|---------|
| `tgt:self` | A sí misma | Navi Dequak |
| `tgt:ally` | A aliada(s) | Ariam Balance |
| `tgt:enemy` | A rival(es) | Enis Coma |
| `tgt:both` | Ambos jugadores | Virste, Tarus |
| `tgt:facing` | Carta de enfrente | Ariam Carga Pírica |
| `tgt:protector` | Al Protector | Makua Mandíbula |
| `tgt:any` | Cualquiera (elección) | Rasvel |
| `tgt:triggering` | La que disparó el trigger | Ryptor, Zona Feral |
| `tgt:equipped` | Carta equipada | Nenúfar Blanco |

### 1.6 RESTRICTION — ¿Qué limitaciones? (17 tags)

| Tag | Descripción | Ejemplo |
|-----|-------------|---------|
| `rst:cant-attack` | No puede atacar | — |
| `rst:cant-attack-protector` | No atacar Protector | Makua Aguas |
| `rst:cant-attack-on-reveal-turn` | No atacar turno de revelación | Ruinas Abisales |
| `rst:cant-be-attacked` | No puede ser atacada | — |
| `rst:cant-be-damaged-effect` | No dañada por efectos | Necroalga |
| `rst:cant-equip` | No puede equiparse | — |
| `rst:cant-heal` | No puede ser curada | Ariam Carga Pírica |
| `rst:cant-be-protected` | No puede ser protegida | Xilan Poder |
| `rst:cant-hide` | Nadie puede ocultarse | Zaykan Retorno |
| `rst:cant-rest-update` | No actualizar descansos | — |
| `rst:cant-link` | No puede vincularse | — |
| `rst:cant-negate` | No puede ser negada | — |
| `rst:cant-negate:passive` | Pasiva no negable | Dagg Apetito |
| `rst:cant-negate:active` | Activa no negable | — |
| `rst:cant-be-copied` | No puede ser copiada | Retis, Mizthe |
| `rst:immune-extinction-by-effect` | No a Ext. por efecto | Enis Escudo |
| `rst:target-filter:EXPR` | Solo afecta cartas con filtro | Varios |

---

## 2. Modificadores Transversales (17 conceptos)

| Modificador | Descripción | Ejemplo |
|-------------|-------------|---------|
| `count:N` | Cuántos targets | count:2 (Enis Coma) |
| `count:all` | Todos los targets | count:all (Virste) |
| `choice:MIN-MAX` | Elige valor numérico | choice:1-5 (Xilan Calma) |
| `choice:op` | Elige entre operaciones | Draxes Planeo, Aurex |
| `filter:TYPE` | Tipo/energía | filter:gelida |
| `filter:SUBTYPE` | Subtipo | filter:abisal |
| `filter:A+B` | Filtro compuesto AND | filter:pirica+titan |
| `filter:A\|B` | Filtro OR | filter:abisal\|infectado |
| `filter:NOT-X` | Filtro negativo | filter:NOT-abisal |
| `duration:turn` | Este turno | Ryptor |
| `duration:next-turn` | Hasta siguiente turno | Ariam Carga |
| `duration:while-on-field` | Mientras en campo | Therz copy |
| `duration:next-attack` | Hasta próximo ataque | Sumergido |
| `duration:permanent` | Permanente | Escalar |
| `optional` | Puede no usar | "Puedes..." |
| `fast` | Activa-Rápida | Dagg, Therz |
| `mirror:cost` | Costo refleja operación | Xilan Calma |

---

## 3. Patterns Descubiertos

### Pattern "Rava Deidad" (5 cartas)
```
P1: trg:while-on-field → op:scale:1 → tgt:ally [filter:ENERGY]
P2: trg:on-ally-attack [filter:ENERGY] → op:heal:1 → tgt:ally [filter:ENERGY]
P3: trg:on-death → op:damage-all:1 → tgt:both [filter:ENERGY]
```

### Pattern "On-ally-reveal" (set DOOC)
```
trg:on-ally-reveal [filter:SUBTYPE] → op:EFFECT → tgt:enemy
```

### Pattern "Conditional self-destruct" (Bios/equipos)
```
trg:conditional-self-destruct → pre:no-own-field:TYPE → op:send-extinction(self)
```

### Pattern "Scale-per" (buffs por conteo)
```
trg:while-on-field → op:scale-per:ZONE-count [filter:TYPE] → tgt:self
```

---

## 4. Estadísticas de Validación (60 cartas)

| Resultado | Count | % |
|-----------|-------|---|
| ✅ Limpio | 15 | 25% |
| ⚠️ Refinamiento | 17 | 28% |
| ❌ Tags nuevos | 28 | 47% |

### Convergencia por ronda
| Ronda | Tags nuevos descubiertos |
|-------|-------------------------|
| 1-10 | 18 |
| 11-20 | 8 |
| 21-30 | 7 |
| 31-40 | 14 |
| 41-50 | 11 |
| 51-60 | 6 |

### Totales del sistema

| Capa | Count |
|------|-------|
| Triggers | 27 |
| Prerequisites | 26 |
| Costs | 19 |
| Operations | 51 |
| Targets | 9 |
| Restrictions | 17 |
| **Total mecánico** | **149** |
| Modificadores | 17 |
| Roles (meta) | 7 |
| Afinidad (meta) | 16 |
| **Total sistema** | **~189** |

---

## 5. Próximos Pasos

1. [ ] Validar 60 cartas más → 120 total (~25% cobertura)
2. [ ] Schema JSON para pipelines
3. [ ] Script auto-migración v1 → v2
4. [ ] UI de validación v2 en kodem-lab
5. [ ] Handlers atómicos en engine

---

_Diseño: 2026-04-08 | v2.2 — 60 cartas validadas_
_Fuentes: Rulebook v5.0 + Diagrama de flujo oficial_
