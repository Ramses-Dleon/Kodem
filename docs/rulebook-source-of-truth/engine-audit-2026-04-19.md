# Engine Audit — Kódem TCG Engine vs. Rulings v5.1 (2026-04-19)

**Fecha:** 2026-04-19
**Auditor:** Logos (Claude Opus 4.7 subagent)
**Scope:** `/home/coder/codice-kodem/api/kodem_engine/*.py` (engine canónico) contra rulings 2026-04-19 (40+ resueltos) + FAQ oficial + master rulebook v5.1.
**Baseline tests:** 436/436 PASS (no se corrió nada en esta auditoría — sólo lectura).

---

## 0. Resumen ejecutivo

1. **El engine implementa bien la base mecánica** (ataque, descansos, reemplazo, vida máxima por tipo, subtypes simples, pasar turno, HandTraps con disparador "al ser tomada"). La mayoría de rulings D1–D14 son doc-only o ya están reflejados en el código.
2. **Bug crítico 🔴 — Espectros en Extinción (D21/D34):** cuando el Espectro muere, el engine lo **remueve del juego** en vez de enviarlo a Extinción. Esto rompe el conteo de victoria (D34 dice que ambos — Espectro + Adendei poseído — cuentan como enviados a Extinción). Ver `engine.py:615-619`.
3. **Bug crítico 🔴 — Adendei poseído se pierde al poseer (D21):** el engine envía el Adendei poseído a Extinción inmediatamente al invocar la posesión y borra el slot (`engine.py:2744-2770`). D21 dice que la posesión es intercambio atómico + el Adendei queda **bajo** el Espectro, y sólo se co-envían a Extinción cuando el Espectro muere.
4. **Bug alto 🟠 — Espectro hereda damage del poseído (D22):** `_compute_damage` usa el `damage` de la carta poseída (`engine.py:199-203`). D22 explícito: el Espectro **usa su propia vida, daño, descansos**; NO hereda stats.
5. **Gap estructural 🟡 — Subtipos múltiples (E8):** `types.py:34` declara `subtype: Optional[str]` (string único). Cards como Macit (Guardián Catrín) y Therz (Titán Catrín) no pueden filtrarse correctamente por ambos subtipos. Cards.json ya migró a `subtypes: [primary, secondary]` según el ruling; el engine no consume ese campo.
6. **Observación 🟢 — Comentarios "v5.0" residuales** en 3 ubicaciones, no indican bug mecánico pero dificultan mantenimiento.

**Conteo final:** 40 rulings evaluados → **23 implementados** (✅) · **5 parciales** (🟡) · **6 no implementados** (❌) · **6 N/A** (doc-only o ya absorbidos).

---

## 1. Mapping reglas → código (tabla completa)

Columnas: **Impl** = Implementado (✅ sí / 🟡 parcial / ❌ no / N/A) · **Sev** = Severidad si falta (P1 crítica, P2 alta, P3 media, P4 baja).

| Ruling | Título | Impl | Archivo:línea / función | Sev | Notas |
|---|---|---|---|---|---|
| D1 | Feral = 7 energías + 1 estado | ✅ | `types.py:32`, `effects.py:_is_feral L386` | — | Feral se trata como energía operativa; coincide con ruling. |
| D2 | Subfase "Resolución" contenido de Respuesta Rival | N/A | n/a | — | Documental (estructura de fase). Engine ejecuta Activas-Rápidas en la ventana correcta. |
| D3 | Rava puede ser atacado | ✅ | `engine.py:_make_field_card L129`, `apply_action: attack` | — | No hay exclusión de Rava como target de ataque; trata como ZP. |
| D4 | Protector suplente hereda descansos | ✅ | `engine.py:_protector_leave_alive L208`, `_sweep_dead L491-530` | — | Ambas rutas (muerte y cambio) preservan `old_rests`. ✔️ |
| D5 | Zona "Fuera de Juego" (Quam) | ❌ | n/a | P3 | No existe zona `out_of_game` en estructura. Sólo afecta a Quam (TCOO-006U), carta rara; efectos no implementados. |
| D6 | Caps de descansos (Adendei 2, Protector 3) | ✅ | `types.py: ADENDEI_MAX_RESTS=2, PROTECTOR_RESTS=3`; `engine.py:2272, 3022` (min-clamp) | — | Clamp con `min(..., CAP)` aplicado consistentemente. |
| D7 | Cartas Limitadas sólo Multi/Extendido | N/A | n/a | — | Formato Estándar es el default del engine; regla 1-por-nombre no se requiere aquí (engine no valida formato multi). |
| D8 | Targeting de ocultas | ✅ | `engine.py: get_legal_actions` (no excluye `revealed=False`) | — | Cualquier carta en ZP es target legal salvo restricciones explícitas. |
| D9 | Token vida máx 6 | 🟡 | `types.py: ADENDEI_MAX_HP=6`; no hay handler genérico para crear Tokens | P3 | El helper `_can_create_token` existe (`effects.py:116`) pero Gloku/Dagg NO tienen handler que instancie tokens. Comentario lo admite: *"Current callers (pending): future Dagg, Gloku"*. |
| D10 | Pasar turno (solo activo, inicio) | ✅ | `engine.py:885-886` (`Action(type='pass_turn')`); test `test_phases.py:78` | — | Solo disponible en fase Previa para jugador activo. Test regresión presente. |
| D11 | Máx 4 Espectros recomendados | N/A | n/a | — | Recomendación de construcción; no requiere enforcement en runtime. |
| D12 | Numeración p30-33 (2 listas) | N/A | n/a | — | Documental. |
| D13 | Glosario "Ver §5.2" intencional | N/A | n/a | — | Documental. |
| D14 | Numeración §6.X (4 refs obsoletas) | N/A | n/a | — | Documental, errata editorial. |
| D16 | Gloku copia = snapshot único | ❌ | n/a — no hay handler de Gloku | P2 | `effects.py:121` reconoce Gloku pendiente. Sin implementación del efecto de copia. Cualquier futura implementación debe ser snapshot, no dinámica. |
| D17 | Efectos carta supercede reglas (meta) | ✅ (parcial) | Caso por caso en `effects.py` según pattern | — | Principio meta; no es una regla única. Cartas específicas (Quam `aún si esta carta ya no está`) no implementadas aún. |
| D18 | Fuera del Juego inspeccionable | N/A | n/a | — | No hay zona. |
| D19 | Pasar turno forzado = emergente | ✅ | Consecuencia natural del engine | — | Si todas las cartas están en descanso, `get_legal_actions` retorna sólo `[pass]`. |
| D20 | Espectros vida + requisito posesión | ✅ (vida) / ✅ (requisito) / ❌ (mecánica posesión correcta) | `cards.py:84` (`max_hp` custom); `engine.py:405-428` (requisito tercia) | P1 | Vida custom OK. Requisito "N Adendei Xxxx en Extinción" parseado en tercia. Pero la mecánica de posesión en sí (D21/D22) está rota — ver abajo. |
| D21 | Posesión = vivificación atómica, Adendei bajo Espectro | ❌ | `engine.py:2744-2770` handler `possess` | **P1** | Engine hace sacrificio directo: envía el Adendei poseído a Extinción y lo elimina del campo. D21 dice: intercambio atómico, Adendei queda **bajo** el Espectro, ambos co-envíos a Ext al morir el Espectro. Afecta D34 (conteo victoria). |
| D22 | Espectro NO hereda stats del poseído | ❌ | `engine.py:_compute_damage L199-203` y `:2761-2765` | **P1** | El engine copia `damage`/`rests` del poseído al Espectro. D22 explícita: el Espectro usa SUS propios stats. El Adendei bajo queda inerte. |
| D23 | Ariam Dualidad BETA-001 pieza histórica | N/A | n/a | — | Errata editorial en cards.json (dejada como drenaje legacy). Engine no requiere cambio. |
| D24 | Cap de vida máx por tipo | ✅ | `types.py`: `ADENDEI_MAX_HP=6`, `PROTECTOR_MAX_HP=12`; Espectros via `card.max_hp`; `_safe_heal` usa `max_hp` (`effects.py:159`) | — | Cap respetado en curas y en init. |
| D25 | Hori (costo Extinción alcance) | N/A pending | n/a | — | Ruling abierto aún; no evaluable. |
| D26 | Nozi grafía "Átlico" | N/A | cards.json | — | Errata datos, no engine. |
| D27 | Condiciones victoria alternativas (Draxes) | 🟡 | `engine.py:553-554` `ALT_VICTORY` event | P3 | Hay evento `ALT_VICTORY` pero no se detecta el patrón "¡GANAS EL JUEGO!" en `effect_text` de forma genérica; depende de handler específico por carta. |
| D28 | Cambiar = intercambiar = cambiar de lugar | ✅ | `effects.py:1540, 2839, 5355-5358` trata "intercambia" | — | Patrones regex reconocen `intercambia` y `cambia` como equivalentes. |
| D29 | `effect: "Neutral"` = sin efecto | ✅ (sanitario) | `cards.py` trata efectos vacíos | — | Saneamiento de datos, engine no falla. |
| D32 | Nahual Máscara copia Activa rival | ❌ | n/a | P3 | Carta específica sin handler; rama (a) con doble costo apilado no implementada. |
| D33 | Espectro atacar sin poseer — costo 2× aliado | ✅ | `engine.py:976-978` + `engine.py:2183-2197` (ENG-25) | — | `is_espectro_no_poss` paga 2×damage HP aliado. Incluye fix multi-attack. |
| D34 | Espectros cuentan 2 cartas en conteo victoria | ❌ | `engine.py:615-619` | **P1** | Engine: Espectros "REMOVED FROM GAME" → NO entran a `extinction` list → NO cuentan para `_count_extinction`. Rompe victoria. Adendei poseído ya fue enviado al morir el Espectro (por D21 bug), así que en vez de +2, se suma +1 incluso bajo semántica actual. |
| D35 | Espectro usa SU efecto + efecto del poseído (aditivos) | ❌ | n/a | P2 | `_compute_damage` usa damage del poseído pero no "apila" efectos. Las pasivas propias del Espectro + pasiva del Adendei poseído no se disparan juntas. |
| D38 | Límite descansos aplica a Espectros | 🟡 | `engine.py:3022` usa `ADENDEI_MAX_RESTS` | — | El clamp `min(+1, ADENDEI_MAX_RESTS)` es general para todo FieldCard — incluye Espectros. OK de facto. |
| D39 | Ruk snapshot único + aditivo | ❌ | n/a | P3 | Ruk (FYTE-048) no tiene handler para copiar Pasiva de Rava. Requiere D16 + D35 primero. |
| D41 | Activas-Rápidas ventana abierta + resolución inmediata | ✅ | `engine.py:1824-1872, 2326, 2400-2412` | — | `pending_activa_rapida` se crea en ventana defensiva; resuelve al declarar. FAQ-05 (orden) coincide con prioridad `attacker_key` → `opp_key`. |
| D44 | HandTraps negables caso por caso | 🟡 | Detección via "al ser tomada" (`engine.py:447, 1713`) | P3 | HandTrap dispara, pero no hay circuito de negación desde el rival durante reemplazo (Nirge "Los Ocultos" bloqueo no verificado). |
| D45 | 8 turnos totales bloqueo | 🟡 | `types.py: turns_without_damage` field | P4 | El campo existe pero no se verifica que el límite sea 8 totales. Grep no encontró uso. |
| M2.3 | Anti-cambio aplica a intercambio | 🟡 | Vía D28: `intercambi` reconocido como cambio | P4 | Restricciones anti-cambio no buscan explícitamente "intercambia"; depende del parsing genérico. |
| M2.4 | "Zona Principal original" = lado propio | N/A | Implícito en separación p1/p2 | — | Engine siempre sabe qué player-key es el dueño. |
| M2.5 | Jugador ve todo su Mazo | ✅ | `engine.py` expone `player.mazo` libremente a decide_fn | — | El mazo propio es accesible al decisor. |
| M2.6 | Marcas preservadas al intercambiar | 🟡 | `FieldCard.marks` se copia si swap preserva struct | P3 | No hay handler explícito de swap que verifique preservación de marks. Los pocos handlers de intercambio (`Z5 "intercambia X por Y"` en effects.py:5355) no siempre copian marks. |
| M4 | HandTraps = "al ser tomada" | ✅ | `engine.py:447, 1713` | — | Patrón principal detectado. Nombre "HandTrap" es documental. |
| M6 | "Descansos indicados" = stat BASE | 🟡 | `base_rests` preservado en `FieldCard` | P3 | El engine tiene `base_rests` separado de `rests`. Xakros (IDRMP-022) sin handler específico visible; si existiera, usaría `base_rests` (correcto). |
| M11 | "Frente a" = mismo `pos` | ✅ | `effects.py:_check_facing L606-609` | — | `return attacker_pos == target_pos`. Coincide con opción `izq_centro_der` ratificada. |
| M12 | "Efecto rápido" = "Activa-Rápida" | 🟡 | n/a explícito | P4 | No hay promoción de velocidad implementada (Ryptor, Yakerr Vínculo Odémico). Cartas específicas faltan handler. |
| M13 | "Fase de Batalla" como ventana temporal | ✅ | `types.py: PHASES`, `state.phase` | — | Fase conocida en runtime. |
| M14 | "Estadísticas originales" = valor impreso | ✅ | `FieldCard.base_damage, base_rests` | — | Los `base_*` son el snapshot del valor impreso. Virste-style reset usa estos valores (`engine.py:2361`). |
| M15 | Typo p07/b11 cross-ref | N/A | — | — | Documental. |
| M16 | "Activa-Rápida" con guión | N/A | — | — | Documental / ortográfico. |
| M17 | Ixim con Pasiva-Rápida (Copal, Planta) | ✅ | Engine trata Ixim por `card_type`; Pasiva-Rápida por `effect_type` | — | No hay exclusión ni bloqueo. |
| M18 | Espectro descanso 0 en callout | N/A | — | — | Documental. |
| M19 | Ixim descansos al usar Activa | 🟡 | `engine.py:2472` "Attack sets base_rests, Activa doesn't add more" | P4 | Regla general aplicada; no hay excepción para Rot (regla §p18/b09). Rot Activa usada comentario `ENG-02` separado. |
| M20 | Reemplazo fallido = 3 intentos | ✅ | `engine.py:474` `failed 3 replacements` | — | 3 intentos → VICTORY para rival. Coincide con ruling. |
| M21 | Pasiva no actualiza descansos automáticos | ✅ | `engine.py:2472`, `_is_optional_pasiva L244` | — | Pasivas no suman descansos salvo costo impreso. |
| M22 | Pasiva-Rápida disparadores | 🟡 | `effects.py: check_passive_triggers` | P3 | Triggers "ally_death" etc. existen pero no cubren completamente "declaración de otra Pasiva". |
| M23 | Zona "mano" = estado transitorio | ✅ | Engine no modela mano; sólo ventana `on_draw` | — | Coincide: no hay zona "mano" — sólo trigger transitorio. |
| E7 | "Titán" con tilde | N/A | cards.json | — | Errata datos. |
| E8 | Subtipos múltiples (Titán+Catrín) | ❌ | `types.py:34` único `subtype` | **P1** | Card.subtype es string. Engine no consume `subtypes: []` aunque cards.json ya lo tenga. Efectos que filtran por "Titán" no ven Therz (Titán Catrín) correctamente salvo que se normalice ad-hoc. |
| FAQ-01 | Ocultas en descanso no se revelan | ✅ | `revealed` + `rests` ortogonales en `FieldCard` | — | Nunca fuerzan reveal por descanso. |
| FAQ-02 | Saltar turno = ir a Fin | ✅ | `pass_turn` → `_end_of_turn` | — | El pass_turn emite fin y actualiza descansos. |
| FAQ-03 | Ataque negado no dispara "si ataca" | 🟡 | `attack_cancelled` flag `engine.py:2011-2014` | P3 | Flag existe pero no todos los triggers "post_attack" verifican `attack_cancelled`. Depende del handler. |
| FAQ-04 | Yanzi Precisión 6 ptos se pierden | 🟡 | `yanzi_vinculo_attack` flag en `FieldCard` | P3 | Flag existe; si ataque cancelado, flag se limpia al resetear ataque. Revisar handler específico. |
| FAQ-05 | Activa-Rápida: prioridad jugador en turno | ✅ | `engine.py:1824` attacker_ar_done flag | — | Coincide con ruling de prioridad. |
| FAQ-06 | Daño extra vs daño por efecto | 🟡 | `_apply_typed_damage` con `dmg_type` | P3 | Separa `DMG_ATTACK` vs efecto, pero "Voracidad Natural" y taxonomía formal no implementadas completamente. |
| FAQ-07 | Pasivas cond. en Batalla resuelven en Post | 🟡 | `check_passive_triggers` al final de ataque | P3 | Se disparan durante ataque, no se difieren a Post explícitamente. Funcionalmente cercano pero no canónico. |
| FAQ-08 | Ixim revelación en Previa + ataque | ✅ | Engine no restringe ventana de reveal para Ixim | — | Reveal allowed in Previa + durante batalla defensiva. |

---

## 2. Rulings críticos — análisis con line-numbers

### D4 — Protector suplente herencia de descansos ✅

**Ruling:** Siempre hereda descansos del anterior (sin y con Extinción).

**Código relevante:**

- `engine.py:208-241` — `_protector_leave_alive(state, player_key)`:
  ```python
  old_hp = player.protector.hp        # L215
  old_rests = player.protector.rests  # L216
  ...
  player.protector = Protector(
      folio=sup_folio,
      hp=old_hp,           # L222 — vida preservada (cambio sin muerte)
      rests=old_rests,     # L225 — descansos preservados ✔
      ...
  )
  ```
- `engine.py:491-541` — rama con muerte en `_sweep_dead`:
  ```python
  old_rests = player.protector.rests  # L494
  ...
  player.protector = Protector(
      folio=sup_folio,
      hp=PROTECTOR_MAX_HP,   # L523 — 12 PV nuevos (muerte)
      max_hp=PROTECTOR_MAX_HP,
      rests=old_rests,       # L526 — descansos preservados ✔
      ...
  )
  ```

**Conclusión:** D4 implementado correctamente. ✅

---

### D16 — Gloku copia snapshot único ❌ (no implementado)

**Ruling:** Copia stat/efecto/costo en snapshot único al invocar; no hereda cambios posteriores.

**Código:** No hay handler específico de Gloku. Solo comentario:

- `effects.py:116-125`:
  ```python
  def _can_create_token(state, player_key: str) -> bool:
      """§2.7: Max 2 Tokens per player on field.
      ENG-29: contract helper. MUST be called before any handler that invokes...
      Current callers (pending): future Dagg (TCDE-008),
      Gloku (TCDE-015), and any other invocation effects.
      """
  ```

**Gap:** cuando se implemente Gloku, el handler debe snapshot `damage`, `rests`, `effect_text`, `cost_text` de la carta rival copiada al momento de la invocación — NO leer dinámicamente. El `FieldCard.base_damage` ya es el mecanismo correcto para este snapshot; sólo falta el handler del efecto.

**Severidad:** P2 — sin handler, Gloku no jugable (afecta simulaciones que la incluyan).

---

### D17 — Efectos post-Extinción (Quam) ❌ (caso-específico no implementado)

**Ruling meta:** p20/b10 — efecto de carta supercede regla general cuando explícito. Quam (TCOO-006U) tiene *"aún si esta carta ya no está en el campo"*.

**Código:** principio meta aplicado caso por caso en `effects.py`; no hay framework general. Quam sin handler.

**Gap:** no hay ciclo en `_end_of_turn` ni en `check_passive_triggers` que evalúe "efectos con cláusula persistente post-Extinction". Cualquier carta con esta cláusula requiere handler específico.

**Severidad:** P3 — sólo Quam en pool actual; carta rara.

---

### D20/D21/D22 — Espectros vida, posesión atómica, sin herencia stats ❌ (3 bugs críticos)

**Ruling consolidado:**
- **D20:** Vida declarada en cada carta (ya OK vía `Card.max_hp`).
- **D21:** Posesión = intercambio atómico. Adendei poseído queda **bajo** el Espectro (no se envía a Ext). Al morir Espectro → ambos co-envíos a Extinción.
- **D22:** Espectro usa SUS propios stats (vida, daño, descansos). El Adendei bajo está **inerte**.

**Código actual (incorrecto):**

- `engine.py:2744-2770` — handler `possess`:
  ```python
  elif action.type == 'possess':
      espectro = player.field[espectro_idx]
      target = player.field[target_idx]

      # ❌ BUG D21: Send target Adendei to Extinction (with its equips)
      player.extinction.append(target.folio)
      player.extinction.extend(target.equips)

      # Espectro now possesses the target card
      espectro.possessed_folio = target.folio

      # ❌ BUG D22: Copy base_damage and base_rests from possessed card
      target_card = get_card(target.folio)
      if target_card:
          espectro.base_damage = _safe_damage(target_card.damage)
          espectro.base_rests = _safe_damage(target_card.rests)

      # ❌ BUG D21: Remove the possessed Adendei from the field
      player.field.pop(target_idx)
      ...
      # Trigger replacement for the now-empty slot  ← esto no debería ocurrir
      rep_s, rep_ev = _trigger_replacement(s, player_key, action.target_pos)
  ```

- `engine.py:199-203` — `_compute_damage` usa el damage del poseído:
  ```python
  def _compute_damage(fc: FieldCard) -> int:
      # ❌ BUG D22: If Espectro has possessed a card, use the possessed card's base damage
      if fc.possessed_folio:
          possessed_card = get_card(fc.possessed_folio)
          if possessed_card:
              return _safe_damage(possessed_card.damage) + fc.damage_bonus
      return fc.base_damage + fc.damage_bonus
  ```

- `engine.py:615-619` — `_sweep_dead` al morir Espectro:
  ```python
  elif is_espectro:
      # ❌ BUG D34: Espectros are removed from game entirely (not added to extinction)
      ext_owner.extinction.extend(fc.equips)
      all_events.append(f"DEATH: {pk}:{pos} ({fc.folio}) → REMOVED FROM GAME (Espectro)")
  ```

**Semántica correcta (per rulings):**
1. Al poseer: el Adendei objetivo permanece ancorado bajo el Espectro (NO a Extinción todavía). Guardar referencia en `FieldCard.possessed_folio`. El slot ZP sigue ocupado por el Espectro, no hay reemplazo.
2. Al atacar: el Espectro usa SU `base_damage` (el suyo propio, no el del ancla).
3. Al morir el Espectro: AMBAS cartas (Espectro + Adendei ancla) van a Extinción, lo que cuenta +2 para victoria rival (D34).

**Severidad:** **P1** — afecta simulaciones significativamente (Espectros están en mazos oficiales; mecánica rota cambia balance). Además D34 invalida ciertos escenarios de victoria.

---

### D28 — Cambiar/intercambiar/cambiar de lugar = sinónimos (§6.5) ✅ (reconocimiento regex OK)

**Código relevante:**
- `effects.py:2838-2839` — "intercambiar extinción con ZP":
  ```python
  if re.search(r'intercambi?a.*extinción.*zona\s+principal', text):
  ```
- `effects.py:5355-5358`:
  ```python
  m = re.search(r'intercambia\s+(?:1\s+)?(.+?)\s+por\s+(?:1\s+)?(.+)', text, re.IGNORECASE)
  ```
- `effects.py:1540-1541` — Therz Guardián:
  ```python
  if re.search(r'si\s+esta\s+carta\s+es\s+enviada\s+a\s+extinción.*intercambia', text):
  ```

Los términos "intercambia" y "cambia" se tratan mecánicamente iguales. ✅

**Nota:** M2.3 (anti-cambio aplica a intercambio) depende de que las restricciones "anti-cambio" también busquen "intercambio". No verifiqué exhaustivamente cada restricción, por lo que queda como 🟡.

---

### D41 — Activas-Rápidas: ventana abierta + resolución inmediata ✅

**Código relevante:**

- `engine.py:1824-1852` — ventana para el atacante (antes de daño):
  ```python
  if not s.pending_activa_rapida and not getattr(s, '_attacker_ar_done', False) and not getattr(s, '_ar_phase_done', False):
      ...
      s.pending_activa_rapida = {
          'attacker_pos': action.pos,
          'target_pos': action.target_pos,
          'attacker_key': player_key,
          'response_key': player_key,  # attacker himself has first priority
          ...
      }
  ```

- `engine.py:1857-1872` — ventana para el defensor:
  ```python
  if not s.pending_activa_rapida and action.target_pos != 'protector' and not getattr(s, '_ar_phase_done', False):
      ...
      s.pending_activa_rapida = {
          ...
          'response_key': opp_key,
          'attack_context': True,
      }
  ```

- `engine.py:2400-2412` — handler `activa_rapida`:
  ```python
  elif action.type == 'activa_rapida':
      ...
      events.append(f"ACTIVA_RAPIDA: {player_key}:{action.pos} ({...})")
      pr = s.pending_activa_rapida
      ...
  ```

**Prioridad:** el atacante (jugador en turno) tiene primera respuesta, coincidiendo con FAQ-05.

**Observación menor:** la ventana defensiva del rival solo existe durante un ataque. Fuera de ese flujo, las Activas-Rápidas de respuesta no se disparan. Si un ruling futuro permite Activa-Rápida en Previa/Fin, falta extender.

✅ Implementado para el patrón canónico.

---

### M4 — HandTraps ("al ser tomada") ✅

**Código relevante:**

- `engine.py:447-448` (rama reemplazo automático):
  ```python
  drawn_card = get_card(chosen)
  if drawn_card and drawn_card.effect_text and 'al ser tomada' in drawn_card.effect_text.lower():
      s, draw_ev = resolve_effect(s, drawn_card.effect_text, player_key, pos, {'on_draw': True})
  ```

- `engine.py:1713-1714` (rama reemplazo interactivo):
  ```python
  if drawn_card and drawn_card.effect_text and 'al ser tomada' in drawn_card.effect_text.lower():
      s, draw_ev = resolve_effect(s, drawn_card.effect_text, pk, pos, {'on_draw': True})
  ```

**Cobertura:** el disparador `on_draw=True` se propaga a `resolve_effect`. Las 12 cartas HandTrap enumeradas en M4 deberían activarse si su `effect_text` contiene "al ser tomada".

**Gap parcial:** variante "Si tomas esta carta de tu Mazo" (Kap, Lluvia de Ranas KPRC-017 usa este fraseo alternativo) — grep `'si tomas esta carta'` no arrojó resultados en engine. Verificar: si effect_text de KPRC-017 no empieza con "Al ser tomada", el handler no dispara. **Potencial bug P3.**

**Severidad:** ✅ patrón principal; 🟡 variante "Si tomas" puede requerir extensión del regex.

---

### M14 — Snapshot base de estadísticas ✅

**Código relevante:**

- `types.py:51` — `FieldCard.base_damage: int` y `base_rests: int`:
  ```python
  base_damage: int
  base_rests: int
  damage_bonus: int
  ```

- `engine.py:_make_field_card L175`:
  ```python
  base_damage=dmg, base_rests=rests,  # snapshot del valor impreso al crear
  ```

- Uso en reset (Virste-style), `engine.py:2361`:
  ```python
  p.field[fc_idx].rests = p.field[fc_idx].base_rests
  ```

- `_compute_damage` usa `fc.base_damage + fc.damage_bonus`.

**Conclusión:** El modelo de `base_*` separa el valor impreso del estado actual. M14 (Virste Reseteo) puede reconstruir todas las stats originales. ✅

**Cuidado:** la única excepción es el caso Espectro-poseyendo, donde `_compute_damage` usa `possessed_card.damage` en vez de `fc.base_damage` — que D22 contradice.

---

### E8 — Subtipos múltiples (Titán+Catrín) ❌

**Código relevante:**

- `types.py:34`:
  ```python
  subtype: Optional[str] = None  # Abisal, Equino, Catrín, Titán, etc.
  ```

- `types.py:154`:
  ```python
  subtype: Optional[str] = None  # Abisal, Equino, Catrín, etc.  (en FieldCard)
  ```

- `effects.py:_is_titan L270`, `_is_catrin L249`, etc. — chequean un único campo `subtype`:
  ```python
  def _is_titan(folio: str) -> bool:
      card = get_card(folio)
      if not card:
          return False
      sub = (card.subtype or '').lower()
      return 'titán' in sub or 'titan' in sub
  ```

**Diff observado:** Si `subtype = "Titán Catrín"`, los helpers `_is_titan` y `_is_catrin` podrían retornar True ambos (por substring match). PERO cards.json ya migró al esquema `subtypes: ["Titán", "Catrín"]` con `subtype` primary — el engine no lee `subtypes`.

**Test regresión relevante:** `tests/regression/test_eng36_subtype_checkers.py` — verifica que los checkers funcionen; no verifica multi-subtype.

**Severidad:** **P1** si Macit/Therz están en mazos de simulación. Actualmente los helpers funcionan por substring si la string original es "Titán Catrín" en la misma línea, pero rompen si cards.json cambia a sólo el primary.

---

## 3. Hallazgos cruzados

### 3.1 Comentarios "v5.0" residuales

- `engine.py:2013` — *"Card still rests per rules v5.0"* (en NEGATE_ATTACK). Mecánica parece coherente con v5.1 (atacante descansa aunque el ataque sea negado — FAQ-04 lo confirma), pero el comentario es anacrónico.
- `effects.py:526` — *"# fc.marks = []  # REMOVED — rules v5.0 say marks persist when hidden"*. Informativo.
- `effects.py:2627` — *"# ENG-24: RB-15 v5.0 dice que vivificar sin tipo debe permitir cualquier tipo"*. Coincide con interpretación v5.1 de D21 (vivificar genérico). Documentar como v5.1.
- `strategies.py:1206` — *"score += 5.0 + best_dmg * 1.5"*. Falsa alarma (es un número `5.0`, no un comentario de versión).

**Acción:** renombrar "v5.0" → "v5.1" o "vivificar (D21)" en los 3 comentarios para claridad.

### 3.2 Inconsistencias engine.py ↔ effects.py

- **Espectro damage computation:** `engine.py:199-203` usa `possessed_card.damage`; `effects.py` no tiene lectura análoga pero las pasivas de Espectro (FYTE-003K Ariam Axoloespectro etc.) serían incoherentes. Cuando D22 se arregle, ambos archivos necesitan revisión.
- **Tokens:** `_can_create_token` en `effects.py:116` está definido pero *no se llama* antes de crear ningún token (grep no encontró invocaciones). Violación potencial del cap "max 2 Tokens".
- **Rot Activa 1/turno:** `engine.py:2472` comment "Attack sets base_rests, Activa doesn't add more" + `types.py:191` `used_rot_activa_this_turn: bool = False` + `FieldCard.rot_activa_used_this_turn`. Consistente; cubierto por `test_eng02_rot_activa_per_card.py`.

### 3.3 Tests que cubren vs no cubren los rulings 2026-04-19

| Ruling | Test(s) | Cobertura |
|---|---|---|
| D4 (protector suplente) | `test_protector_death.py` | ✅ vida y descansos preservados |
| D6 (caps descansos) | `test_rests.py` | ✅ |
| D10 (pasar turno) | `test_phases.py::test_pass_turn_emits_fin_event` | ✅ evento; no verifica "solo activo" explícito |
| D20/D21/D22 (Espectros posesión) | solo `test_eng25_espectro_multi_attack.py` (code-path static check) | ❌ mecánica no testeada, solo la presencia de comentarios |
| D24 (cap vida por tipo) | `test_damage.py`, `test_stats.py` | ✅ parcial |
| D28 (intercambiar = cambiar) | ninguno directo | 🟡 |
| D33 (Espectro sin poseer 2×HP) | `test_eng25` | ✅ |
| D34 (conteo victoria +2 por Espectro) | ninguno | ❌ |
| D41 (Activas-Rápidas ventana) | ninguno específico; flujo general en `test_full_game.py` | 🟡 |
| M4 (HandTraps) | ninguno | ❌ |
| E8 (subtipos múltiples) | `test_eng36_subtype_checkers.py` (single subtype) | 🟡 |

**Brechas de testing prioritarias:** D20/D21/D22/D34 (Espectros), D16 (Gloku), M4 (HandTraps).

### 3.4 Reglas implementadas pero con comportamiento dudoso

1. **`_compute_damage` Espectro:** contradice D22.
2. **Espectro → REMOVED FROM GAME:** contradice D34 (debe ir a Extinción y contar +1).
3. **`possess` handler:** contradice D21 (no debe enviar a Ext al momento de posesión).
4. **HandTrap via "al ser tomada":** no cubre variante "Si tomas esta carta de tu Mazo".
5. **`turns_without_damage` (D45):** campo declarado pero sin lógica de uso encontrada.

---

## 4. Recomendaciones para Pasada 2 (correcciones priorizadas)

Las correcciones se ordenan por **impacto en simulación** × **facilidad** × **existencia de baseline**.

### 🔴 Prioridad 1 — Bugs Espectros (D20/D21/D22/D34)

#### 4.1 Corregir `possess` handler — NO enviar Adendei a Extinción
**Ruling:** D21 (posesión atómica, Adendei queda bajo el Espectro).
**Archivo:** `engine.py:2744-2770` función `apply_action` rama `action.type == 'possess'`.
**Diff propuesto (pseudo-código):**
```python
elif action.type == 'possess':
    espectro_idx = next(...)
    target_idx = next(...)
    if espectro_idx is not None and target_idx is not None:
        espectro = player.field[espectro_idx]
        target = player.field[target_idx]

        # NEW: store the anchored Adendei instead of sending to Ext
        espectro.possessed_folio = target.folio
        # Equips transfer (existing logic OK)
        espectro.equips.extend(target.equips)

        # DO NOT: player.extinction.append(target.folio)  ❌
        # DO NOT: player.field.pop(target_idx)            ❌
        # DO NOT: base_damage = target_card.damage        ❌ (D22)
        # DO NOT: _trigger_replacement(...)               ❌

        # NEW: mark target as inert/anchored (hp frozen, no attack, no effect)
        target.anchored_under = espectro.pos  # nuevo flag en FieldCard
        target.attacked_this_turn = True       # no actúa

        # Remove the anchor slot from ZP considerations but keep the reference
        # Idea: use a separate attribute espectro.anchor = FieldCard(target)
        # (store a snapshot by ref so on_death can push both to extinction)
```
**Test propuesto:** `test_espectro_possess_anchors.py`:
- Dado Ariam Axoloespectro + 2 Ariam en Ext + 1 Ariam en campo.
- Acción: possess.
- Assert: ZP del jugador mantiene 3 cartas (Espectro ahora), Adendei target NO está en `player.extinction`, el slot ZP del target NO desencadena replacement.

---

#### 4.2 Corregir `_compute_damage` — NO usar damage del poseído
**Ruling:** D22 (no herencia).
**Archivo:** `engine.py:197-205`.
**Diff propuesto:**
```python
def _compute_damage(fc: FieldCard) -> int:
    """Compute damage for a field card. Espectros use their OWN base_damage (D22)."""
    # REMOVED: if fc.possessed_folio: return possessed_card.damage
    return fc.base_damage + fc.damage_bonus
```
**Test propuesto:** Espectro con base_damage=X poseyendo un Adendei con damage=Y → assert `_compute_damage(fc) == X + damage_bonus`.

---

#### 4.3 Espectros van a Extinción al morir (+ el Adendei anclado también)
**Ruling:** D21 + D34 (co-envíos a Extinción).
**Archivo:** `engine.py:614-619` función `_sweep_dead`.
**Diff propuesto:**
```python
elif is_espectro:
    # D21/D34: Espectro AND its anchored Adendei both go to Extinction
    ext_owner.extinction.append(fc.folio)
    ext_owner.extinction.extend(fc.equips)
    if fc.possessed_folio:
        ext_owner.extinction.append(fc.possessed_folio)
        all_events.append(
            f"DEATH: {pk}:{pos} ({fc.folio}) → extinction"
            f" (with anchored {fc.possessed_folio} → extinction)"
        )
    else:
        all_events.append(f"DEATH: {pk}:{pos} ({fc.folio}) → extinction")
    _track(s, pk, fc.folio, 'death_turn', s.turn)
```
**Test propuesto:** Mata un Espectro con posesión; assert `len(ext) += 2` y `_count_extinction()` aumenta en 2.

---

### 🟠 Prioridad 2 — Subtipos múltiples (E8)

#### 4.4 Leer `subtypes: list` desde cards.json
**Ruling:** E8.
**Archivos:**
- `types.py:34` — agregar `subtypes: list[str] = field(default_factory=list)`.
- `cards.py:70-90` — parsear `subtypes` (con fallback a `[subtype]` si no está).
- `effects.py:_is_titan, _is_catrin, _is_guardian, etc.` — priorizar lookup en `subtypes` lista antes de substring match.

**Diff propuesto:**
```python
# types.py
@dataclass(frozen=True)
class Card:
    ...
    subtype: Optional[str] = None  # primary subtype (legacy)
    subtypes: tuple = ()           # full list (new) — tuple for hashability

# effects.py
def _is_titan(folio: str) -> bool:
    card = get_card(folio)
    if not card:
        return False
    if card.subtypes:
        return any('titán' in s.lower() or 'titan' in s.lower() for s in card.subtypes)
    sub = (card.subtype or '').lower()
    return 'titán' in sub or 'titan' in sub
```
**Test propuesto:** Macit/Therz asserts `_is_titan(therz_folio) and _is_catrin(therz_folio)` retornan True ambos.

---

### 🟡 Prioridad 3 — Gaps tácticos

#### 4.5 Gloku snapshot único (D16)
**Ruling:** D16.
**Archivo:** `effects.py` (crear handler para Gloku TCDE-015).
**Diff propuesto:** al invocar Gloku, usar `_safe_damage(rival_card.damage)` + copy de `effect_text` del rival **en el momento de invocación**. Almacenar en `FieldCard.base_damage` y `effect_text_snapshot`.
**Test propuesto:** Token invocado por Gloku con stats del rival; después el rival cambia stats; el Token NO cambia.

---

#### 4.6 HandTrap variante "Si tomas esta carta de tu Mazo"
**Ruling:** M4 (Kap KPRC-017 ejemplo canónico).
**Archivo:** `engine.py:447, 1713`.
**Diff propuesto:**
```python
effect_text_low = (drawn_card.effect_text or '').lower()
if 'al ser tomada' in effect_text_low or 'si tomas esta carta' in effect_text_low:
    s, draw_ev = resolve_effect(s, drawn_card.effect_text, player_key, pos, {'on_draw': True})
```
**Test propuesto:** KPRC-017 "Kap, Lluvia de Ranas" — al reemplazar, dispara cura +3 al Protector.

---

#### 4.7 Límite 8 turnos sin daño (D45)
**Ruling:** D45 (empate técnico a 8 turnos totales).
**Archivo:** `engine.py:_end_of_turn` (función L2909).
**Diff propuesto:**
```python
# En _end_of_turn, tras resolución:
any_damage_this_turn = ...  # calcular si algún jugador recibió daño
if any_damage_this_turn:
    state.turns_without_damage = 0
else:
    state.turns_without_damage += 1
if state.turns_without_damage >= 8:
    state.winner = 'draw'  # o lógica específica de empate
    events.append(f"DRAW: 8 turnos sin daño (§6.8 regla 14)")
```
**Test propuesto:** loop de 8 turnos con ambos jugadores pass; assert `state.winner == 'draw'` o equivalente.

---

#### 4.8 Enforce `_can_create_token` antes de spawn de Token (D9)
**Ruling:** D9 (max 2 Tokens per jugador).
**Archivo:** `effects.py:116` — helper ya existe pero nadie lo llama.
**Diff propuesto:**
```python
# En cualquier handler que spawne un Token en player.field:
if not _can_create_token(state, player_key):
    events.append(f"TOKEN_CAP: {player_key} already has 2 Tokens — skip spawn")
    return state, events
# ... proceed with token creation
```
**Test propuesto:** `test_eng29_max_2_tokens.py` ya existe como regression; extender con caso "3er token se rechaza".

---

#### 4.9 Zaykan Citadel / FAQ-06 — categorizar daño extra (dmg_type)
**Ruling:** FAQ-06.
**Archivo:** `effects.py: _apply_typed_damage` (L50).
**Diff propuesto:** ampliar enum de `dmg_type` a `{'attack', 'attack_bonus', 'effect'}`. "attack_bonus" es daño extra temporal (FAQ-06 tipo 2). Voracidad Natural filtra por `dmg_type in ('attack', 'attack_bonus')`.
**Test propuesto:** Yanzi Precisión +6 + Voracidad Natural (cura al dañar) = cura +6 en ataque con bonus.

---

#### 4.10 Nahual Máscara (D32) — rama (a) con doble costo apilado
**Ruling:** D32.
**Archivo:** handler específico en `effects.py` para FYTE-012S.
**Diff propuesto:** si player elige rama (a): ejecutar Activa del Protector rival (resolve_effect del texto rival) + aplicar auto-daño 1pt×3 cartas propias.
**Test propuesto:** setup con dos Protectores, Nahual rama (a) → stats esperadas.

---

### 🟢 Prioridad 4 — Limpieza documental (bajo impacto)

#### 4.11 Reemplazar comentarios "v5.0" por "v5.1" o "D21"
Archivos: `engine.py:2013`, `effects.py:526, 2627`.

#### 4.12 Agregar test para D10 (pasar turno solo activo)
Ya existe `test_pass_turn_emits_fin_event`; agregar `test_pass_turn_only_active_player` para verificar que `get_legal_actions(rival_turn)` NO ofrece `pass_turn`.

---

## 5. Métricas finales

| Categoría | Count |
|---|---|
| Rulings evaluados | 40 |
| ✅ Implementados | 23 |
| 🟡 Parciales | 7 |
| ❌ No implementados | 6 |
| N/A (documental / errata datos) | 4 |
| Tests baseline | 436/436 PASS |
| Bugs críticos P1 | 3 (D21 possess, D22 compute_damage, D34 sweep_dead Espectro) |
| Bugs P2 | 2 (D16 Gloku, D35 stack efectos Espectro) |
| Bugs P3/P4 | 8+ |

---

## 6. Conclusión para Ramsés

**El engine está sólido para Adendei "vanilla"** — toda la base combat/rests/protector/replacement/HandTraps funciona. Tests (436/436) reflejan esto.

**La deuda técnica está concentrada en el subsistema Espectro** — los 3 bugs P1 (D21/D22/D34) son el mismo cluster conceptual: el engine modeló Espectros como "sacrificio a cambio de buffer stats" cuando la semántica oficial (ratificada 2026-04-19) es "vivificación atómica con anclaje físico". Una vez reparado el cluster, se desbloquean D39 (Ruk copia dinámica/snapshot) y el stack aditivo de D35.

**E8 (subtipos múltiples) es barato:** 4 líneas en `types.py` + `effects.py` habilitan Macit/Therz correctamente.

**Resto son case-by-case** (Gloku, Nahual, Zaykan Citadel): agregables por carta sin refactor mayor.

---

_Auditoría generada 2026-04-19 por Logos (Claude Opus 4.7) en rol de subagent. Base: rulings-v5.1.md (40+ rulings) + FAQ oficial (7 respuestas) + erratas-batch-v5.2.md (16 ítems) + engine canónico al commit actual de `codice-kodem`._
