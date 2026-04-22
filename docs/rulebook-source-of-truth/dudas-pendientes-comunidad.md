# Kódem TCG v5.1 — Tracker de Dudas

**Última actualización:** 2026-04-22
**Documento canónico de estado:** `rulings-v5.1.md` (este archivo sólo es espejo para la comunidad con estado resumido).

---

## Estado general al 2026-04-22 20:10 UTC

- **Rulings cerrados:** ~60 (D1–D52 con variantes, M1–M23, E1–E8, L-5, FAQ-01..07)
- **Pendientes de aval de juez (enviados a Ambir 2026-04-22 20:05):** D47, D48, D49, D50 (aval retroactivo) + D51 (nuevo) + matiz D46
- **Residuales abiertos:** ninguno al momento
- **Última certificación aprobada:** D16 residual — stacking por naturaleza del efecto (Ambir, 2026-04-22 AM)

---

## 🟡 Enviadas a Ambir 2026-04-22 20:05 (esperando respuesta)

Segunda consulta de la jornada tras el aval de D16. Contenido del PDF `certificacion-ambir-v2.pdf`:

### D51 (nueva) — Unicidad en campo del mismo nombre
Derivada de la aclaración de Ambir sobre Extendido. En Zona Principal de un mismo jugador no pueden coexistir simultáneamente 2 cartas con el mismo nombre, incluso en Formato Extendido. Pregunta abierta: ¿aplica también entre jugadores distintos en Multijugador?

### D46 — Matiz Rava en Extendido
Copias libres **en mazo** pero unicidad en campo (D51). Pregunta: ¿confirma o hay excepción?

### D47 — Tlahuelpuchi + múltiples Espectros en misma Fase Previa
Actualmente cerrada por derivación de Logos. Espera aval retroactivo para pasar a autoridad oficial Ambir.

### D48 — Re-vivificación múltiple acumula efectos
Actualmente cerrada por derivación de Logos. Espera aval retroactivo.

### D49 — Espectro sin poseído sin aliados para pagar: ataque ni se declara
Actualmente cerrada por derivación de Logos. Espera aval retroactivo.

### D50 — Semántica "rival" en Multijugador (híbrido narrow/wide)
Actualmente cerrada por derivación de Logos. Espera aval retroactivo.

---

## ✅ Cerradas en jornada 2026-04-22 (no re-consultar)

**Cerradas por Ambir (Juez Kódem):**
- D16 residual (apilación de efectos idénticos — stacking por naturaleza: booleano/contador/evento-disparo/modificador)

**Cerradas por Ramsés (autor):**
- D22 v3 (herencia dinámica de 5 atributos)
- D22b (distinción herencia vs copia)
- D22c (absorción total de daño al stack)
- D33 residual (ataque Espectro sin poseído sí dispara triggers)
- D37 (Tlahuelpuchi no bloquea posesión)
- D43 (pasivas opcionales vs no-opcionales: criterio semántico, no tipográfico)
- D46 (Rava copias libres en Extendido — matiz pendiente Ambir)
- M3 residual (resurrectos acumulan según redacción)
- M5 (visibilidad del mazo rival depende del formato)
- M9 (Multijugador es formato oficial 4-20)
- M12 residual (Pasiva-Rápida sólo da velocidad)
- M15-M23 (batch de 8 aprobados en lote)

**Cerradas por derivación de Logos (pendientes aval retroactivo Ambir):**
- D47, D48, D49, D50

**Descartadas (pseudo-problemas):**
- D51 original (renumerada → D51 actual es distinta)

---

## 📚 Rulings anteriores oficialmente cerrados (referencia histórica)

Para detalle completo consultar `rulings-v5.1.md`. Resumen:

- **D1–D15:** reglas fundamentales, Espectros, descansos, targeting, Tokens. Todas ✅.
- **D17–D20:** efectos post-extinción, inspección, posesión. Todas ✅.
- **D21, D22, D22b, D22c:** stack Espectro-poseído. ✅ (D22 v3 es la versión canónica).
- **D23–D32:** pool amplio de aclaraciones, subtipos, cap de vida, Nahual. Todas ✅.
- **D33–D36:** Espectros sin poseído, conteo victoria, efecto propio+poseído, múltiples Espectros Ariam. Todas ✅.
- **D37–D45:** Tlahuelpuchi, Naywa, normalización Átlico, pasivas. Todas ✅.
- **M1–M14:** meta-rulings. Todas ✅.
- **M15–M23:** batch 2026-04-22. Todas ✅.
- **E1–E8:** erratas identificadas y normalización. Todas ✅.
- **L-5:** Naywa Quemadura Catrín (3 mecánicas entrelazadas). ✅ por Ramsés.
- **FAQ-01..07:** FAQ oficial integrada al rulebook. ✅.

---

## ⚠️ Lecciones operativas (para evitar re-consultar dudas cerradas)

Registradas en `.learnings/LEARNINGS.md` como `LRN-20260422-KODEM-001`.

1. **Antes de generar un PDF de consulta para juez/autor, validar contra el índice activo de `rulings-v5.1.md`.** Cualquier ítem con fecha de cierre ≤ 24 horas es candidato a ser ya resuelto.
2. **Filtrar por `Status:` y por `**Resuelto por**`** antes de incluir en un PDF de consulta. Si tiene autoridad asignada (autor/juez/comunidad), no se incluye aunque esté en el mismo bloque temático.
3. **Re-leer la bitácora del día** en el índice de sesión antes de empaquetar dudas. Las decisiones de las últimas horas no siempre están reflejadas en los archivos de tracker (como este).
4. **Diferenciar "cerrada por derivación de Logos" de "cerrada con aval oficial".** Ambas son cerradas pero sólo las segundas tienen autoridad formal. Agrupar las primeras como "candidatas a aval retroactivo" en vez de "dudas nuevas".

---

## 📝 Notas

Este documento dejó de ser un tracker exhaustivo — los ~60 rulings cerrados viven en `rulings-v5.1.md` con su texto completo. Este archivo ahora sólo refleja:

1. Dudas enviadas a juez externo (esperando).
2. Índice de cierres del día (para no re-consultar).
3. Lecciones operativas.

Para consulta comunitaria pública (portal web), usar `rulings-v5.1.md` como fuente de verdad y filtrar por `status: resuelto`.
