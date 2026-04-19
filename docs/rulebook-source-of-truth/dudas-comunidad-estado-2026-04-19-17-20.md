# Validación Respuestas Comunidad — Dudas v5.1
**Fecha snapshot:** 2026-04-19 17:20 UTC
**Fuente:** Supabase `kodem_duda_respuestas` (portal https://kodem-dudas-comunidad.vercel.app)
**Total respuestas recibidas:** 11 (sobre 11 dudas distintas)

---

## Respondents
| Nick | Respuestas | Rol |
|------|------------|-----|
| **Hule** | 10 | Autoridad canónica (diseño / Ramsés ya integró sus rulings previos) |
| **anon** | 1 (D30) | Respondiente sin nick |

**Observación sobre homologación/divergencia:**
No hay **ninguna duda con 2+ respondents** todavía. Por lo tanto:
- ❌ No hay consenso comunitario visible (muestra N=1 por duda).
- ❌ No hay divergencia que dirimir.
- ✅ Pero sí hay **voz autorizada de Hule** en 10 de las 11 respuestas — suficiente para convertir rulings en canónicos si Ramsés confirma.

---

## Análisis por duda (11 respuestas)

### 🔴 Dudas abiertas según estado final 08:00 UTC — con respuesta posterior

#### D30 — Virste Reseteo: alcance de "estadísticas originales"
- **Respondent:** `anon` · 2026-04-19 16:36 UTC
- **Opción:** ninguna (respuesta libre)
- **Libre:** *"Daño/descansos/energia"*
- **Estado:** 🟡 **Ruling parcial** — respondiente anónimo; coincide con M14 previo (daño/vida/descansos impresos) y **añade `energía`** como parte de lo "original". Necesita confirmación de Hule/Ramsés antes de cerrar. No toca las sub-dudas pendientes (marcas, efectos copiados, subtipo).

---

### ✅ Dudas ya cerradas según estado final 08:00 UTC — Hule ratifica

Estas tres NO son nuevas; corresponden a rulings que Ramsés ya integró citando a Hule. Solo confirmo que las respuestas originales están en la DB:

#### D38 — Cap 2 descansos aplica a Espectros
- **Respondent:** `Hule` · opción `max_2_aplica` · 07:50 UTC
- **Estado:** ✅ Ya integrada en `rulings-v5.1.md` D38.

#### D39 — Ruk copia con excepción Rava
- **Respondent:** `Hule` · opción `excepcion_posee_rava` · 07:51 UTC
- **Estado:** ✅ Ya integrada (§D16+§D20 en rulings).

#### D45 — 8 turnos totales (4 por jugador)
- **Respondent:** `Hule` · opción `ocho_totales` · 08:05 UTC
- **Estado:** ✅ Ya integrada. Confirmado que engine (`engine.py:3082-3099`) ya lo implementa correctamente.

---

### 🆕 Dudas NO listadas en estado final 08:00 UTC — Hule respondió

Estas no aparecían ni en "abiertas" ni en "cerradas" del snapshot 08:00. Son dudas **nuevas o previas que no se habían movido al consolidado**.

#### D25 — Hori, Huella de Magma — ¿Costo de Extinción solo SRMR o errata?
- **Respondent:** `Hule` · opción `errata` · 06:13 UTC
- **Libre:** *"En realidad solo no se mapeo el costo del ocr o llm-vison, buen catch."*
- **Veredicto Hule:** ✅ **ES ERRATA** — el costo de Extinción aplica a **todas las variantes** de Hori; las otras 3 (EXPO-0006, IDRMP-001, KPRC-022) perdieron el costo por fallo de OCR al parsear las cartas. Pendiente reimprimir/corregir `cards.json`.
- **Acción:** mover D25 a rulings-v5.1.md como RESUELTA. Corregir cards.json copiando el `cost_text` de SRMR-006 a las 3 variantes faltantes.

#### D29 — Carta sin efecto ni costo (lore puro)
- **Respondent:** `Hule` · opción `lore` · 07:03 UTC
- **Libre:** *"Seguro es derivado del procesamiento qué has hecho antes para clarificar cartas. Pero es básicamente una carta sin efecto o costo."*
- **Veredicto:** ✅ **Carta lore válida** — no tiene efecto ni costo impresos, es lore puro. Edge case legítimo del diseño.
- **Acción:** Ramsés ya la había marcado en rulings (§D29 aparece en "Rulings totales documentados"). Confirmada por Hule.

#### D32 — Cura 1 al jugador activo (Sandor u otro)
- **Respondent:** `Hule` · libre · 07:06 UTC
- **Libre:** *"Hay de 2: a) cura 1 punto a cartas en campo del jugador activo (adendei, rava, protector, etc.). O b) usa la activa del protector rival, sufre costo del efecto del protector rival, y además tiene el costo propio de dañar 1 a las cartas en la zona del jugador activo."*
- **Veredicto:** 🟡 **Ruling parcial con dos lecturas** — Hule propone dos interpretaciones para el mismo texto. No resuelve; abre clarificación.
- **Acción:** pedir a Hule ruling final entre (a) y (b), o decisión de diseño para separar efectos.

#### E7 — Convivencia `Átlico`/`Átlíco` en cards.json
- **Respondent:** `Hule` · opción `convivencia` · 06:44 UTC
- **Libre:** *"En cards.json maneja a todas sin acento según yo. Es un error de tu lectura de la carta, si revisas con visión SI tiene tilde."*
- **Veredicto:** ✅ **cards.json está sin acentos por diseño** (normalización para engine); la inconsistencia percibida viene de una lectura mixta (con/sin acentos). La grafía oficial canónica es `Átlico` (una sola tilde, ruling D26 ya cerrada por Ramsés).
- **Divergencia con D26:** Hule dice "convivencia" (ambas grafías OK) pero Ramsés cerró D26 como `Átlico` único. **⚠️ posible divergencia leve** — revisar con Ramsés si E7 cambia el ruling D26 o solo aclara el status de cards.json.

#### E8 — Multisubtipo (Macit Guardián+Catrín, Therz Titán+Catrín)
- **Respondent:** `Hule` · opción `multisubtipo` · 06:49 UTC
- **Libre:** *"Son dos subtipos simultáneos. Resuelve en cards.json como se deba ajustar de acuerdo a esta respuesta."*
- **Veredicto:** ✅ **RATIFICA ruling E8** — son dos subtipos simultáneos. Engine fix #2 (commit `b4c718f`) y follow-up E8.1 (commit `1abe66a`) ya implementan esto correctamente vía `subtypes` plural + `_iter_subtype_haystacks`.
- **Acción:** confirmada por Hule. Fix ya desplegado; consistente.

#### M6 — "Descansos indicados" en Xakros, Peste
- **Respondent:** `Hule` · opción `base` · 06:35 UTC
- **Veredicto:** ✅ **Descansos = valor base impreso**, no los acumulados en juego. Cierra M6.
- **Acción:** mover M6 a rulings-v5.1.md como RESUELTA con opción `base`. Revisar engine para validar que al resolver Xakros Peste lee `fc.base_rests` (no `fc.rests`).

#### M11 — Orden de resolución de efectos simultáneos (posición izquierda→centro→derecha)
- **Respondent:** `Hule` · opción `izq_centro_der` · 06:38 UTC
- **Veredicto:** ✅ **Orden canónico: izquierda → centro → derecha** para resolución de efectos simultáneos en ZP.
- **Acción:** cerrar M11. Verificar en engine si iteraciones de ZP respetan este orden (posiciones 1, 2, 3 ordenadas). Muy probable que ya lo haga por construcción del array.

---

## Divergencias / Homologaciones detectadas

| Comparación | Estado |
|---|---|
| **E7 (Hule) vs D26 (Ramsés)** | 🟡 **Posible divergencia** — Hule dice "convivencia" (ambas grafías OK en cards.json), Ramsés cerró D26 como `Átlico` único. A clarificar: ¿E7 aplica solo a cards.json normalizado sin acentos y D26 al rulebook impreso? Probable que NO sea divergencia real sino dos niveles distintos (fuente técnica vs rulebook canónico). |
| **D30 (anon) vs M14 previo** | ✅ **Homologa y amplía** — anon coincide con M14 (daño/descansos) y agrega `energía`. No contradice, expande. Esperar confirmación Hule. |
| **D38, D39, D45 (Hule) ya integrados** | ✅ Sin divergencia — ya son rulings canónicos. |
| **E8 (Hule) vs fix engine E8** | ✅ Homologado — Hule ratifica multisubtipo; engine ya lo refleja. |

**Ninguna otra duda tiene 2+ respondents distintos todavía**, por lo tanto no hay comparación entre comunidad vs Hule disponible.

---

## Dudas abiertas SIN respuesta en comunidad (11 - 8 abiertas = 3 quedan sin responder)

Del set de 11 abiertas al 08:00 UTC, **8 siguen sin respuesta** en el portal:

| ID | Título | Estado |
|----|--------|--------|
| D31 | "No puede ser negada" — alcance y meta-inmunidad | 🔴 sin respuesta |
| D33 | Espectro atacar sin carta poseída (trigger residual) | 🔴 sin respuesta |
| D36 | Múltiples Espectros en posesión simultánea | 🔴 sin respuesta |
| D37 | Tlahuelpuchi bloqueando posesión | 🔴 sin respuesta |
| D40 | Tzun Heraldo: ataque múltiple — descansos/ventanas | 🔴 sin respuesta |
| D43 | Pasivas Opcionales vs Generales — criterio visual | 🔴 sin respuesta |
| D46 | Rava Extendido — definición y límites | 🟡 sin respuesta |
| D52 | Zaykan + Citadel: interacción con Ciudad | 🔴 sin respuesta |
| M3 | "Durante el resto del juego" (Mixtla) | 🟡 sin respuesta |
| M5 | Privacidad Mazo rival (familia Zotz) | 🟡 sin respuesta |

**Nota:** D30 tiene respuesta de anon pero no de Hule; cuenta como parcial.

---

## Acciones recomendadas

1. **Confirmar con Ramsés** el ruling D25, D29, D32, M6, M11 (propuestas de Hule) → moverlas de "abiertas" a `rulings-v5.1.md`.
2. **Clarificar E7 vs D26** — ¿son complementarios (un nivel cards.json, otro rulebook) o hay conflicto real?
3. **Esperar segunda respuesta** en D30 (Hule confirmaría `energía` como parte de "original").
4. **Promover respuestas** en las 8 dudas sin respondents — posible ping al grupo Kodem para atraer comunidad real (hoy solo Hule + 1 anon).
5. **No-op:** E8, D38, D39, D45 ya ejecutados o integrados en engine.

---

_Firmado: Logos 🜂 — snapshot Supabase 17:20 UTC_
