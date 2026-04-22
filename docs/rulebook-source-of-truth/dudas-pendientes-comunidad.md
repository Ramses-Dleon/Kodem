# Kódem TCG v5.1 — Tracker de Dudas

**Última actualización:** 2026-04-22 20:44 UTC
**Documento canónico de estado:** `rulings-v5.1.md` v2.1 (este archivo sólo es espejo para la comunidad con estado resumido).

---

## Estado general al 2026-04-22 20:44 UTC

- **Rulings cerrados totales:** 62 (D1–D52 con variantes incluido D51 y D37 v2, M1–M23, E1–E8, L-5, FAQ-01..07)
- **Pendientes de aval de juez:** ninguno al momento
- **Residuales abiertos:** ninguno al momento
- **Últimas certificaciones aprobadas (2026-04-22 tarde):** D51, D37 v2, D46 v2, D47 v2, D48 v2, D49 v2, D50 v2 — todas por Ambir.

---

## ✅ Sesión 2026-04-22 20:44 UTC — Ambir avala PDF v2 completo

Tras la certificación `certificacion-ambir-v2.pdf`, Ambir avala los 6 rulings consultados + habilita 1 extensión:

### Rulings promovidos de `logos-derivado` → `juez/Ambir`
- **D47 v2** — Tlahuelpuchi + múltiples Espectros: sí pueden poseer en misma Fase Previa si cumplen requisitos.
- **D48 v2** — Re-vivificación acumula efectos según redacción. De acuerdo.
- **D49 v2** — Sin pago de costo → no puedes atacar. Confirmado.
- **D50 v2** — "Rival" por default = uno sólo, a menos que la carta indique X jugadores o todos.

### Rulings nuevos certificados
- **D51** — Unicidad en campo: NO 2 cartas con mismo nombre en Zona Principal del mismo jugador. Aplica sólo al mismo jugador; entre jugadores distintos en Multijugador sí pueden coexistir.
- **D46 v2** — Matiz confirmado: copias libres en mazo (límite 3 en Extendido), pero unicidad en campo (1) según D51.
- **D37 v2** — Extensión: si en el futuro hay 2 Ariam-Espectros con mismo requisito, ambos pueden poseer en misma Fase Previa **pero no a la misma carta**.

**Cita verbatim de Ambir (2026-04-22 20:44 UTC):**
> "De los que no comenté es por qué no es necesario opinar, ya son correctos."

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
