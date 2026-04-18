# Spot-Check — Respuestas de Ramsés

**Fecha:** 2026-04-18 22:40 UTC

## p04
1. **Slogan "¡EVOCA, PROTEGE Y VENCE!"**: ❌ NO existe. Probable alucinación de OCR.
2. **convirtiéndote vs conviertiéndote**: ✅ Es `convirtiéndote` (LLM correcto). NOTA de Ramsés: usar siempre la versión correcta independiente del PDF.

## p05
3. **Carta Ozet "Costo"**: `Daña 1 pto. a otra carta aliada.` (faltaba este bloque)
4. **flora, fauna y minerales**: → en realidad la frase es `"Nombre científico del animal, planta o mineral"` (otra cosa que el LLM omitió/confundió)

## p06
5. **Carta Shugg — Pasiva Rápida + Costo** (verbatim de imagen enviada por Ramsés):

```
**Pasiva-Rápida:** Si 1 *Adendei Abisal* aliado es revelado, revela (coloca boca arriba) **1** carta rival y niega la Pasiva de **1** carta rival hasta el fin del turno.

**Costo:** No podrás usar la Pasiva de tu Bio mientras esta carta esté en el campo.
```

## p06
6. **eEnergla vs Energía**: ✅ `Energía` (LLM correcto, OCR alucinó typo).

## p14
7. **Morfeica vs Morféica**: ✅ `Morféica` (con acento, LLM correcto).

## p19 — Diagrama Estructura de turno
8. **Nodos del flowchart correctos según Ramsés**:
   - Inicio del Turno
   - Fase Previa
   - Fase de Batalla
   - Fase Post
   - Fase de Equipo
   - Fin de Turno
   - Inicio del Turno Rival
   - (lateral) Pasar Turno

   ⚠️ **Ramsés requiere post-validación conjunta de este diagrama** — debe extraerse de manera completa y correcta entre Logos y Ramsés al final del proceso. **PENDIENTE: post-validación conjunta p19**.

## p32
9. **Tolei vs Telei**: ✅ Es `Tekei, Responsabilidad` (no Tolei ni Telei — los dos eran errores).
10. **enviar vs envíar**: ✅ `enviar` (LLM correcto, OCR alucinó tilde).

## p36
11. **Adonde vs Adende**: ✅ Es `Adendei` (LLM alucinó "Adonde" — debe ser Adendei como en el resto del rulebook).
12. **Tekei = Tolei/Telei?**: ✅ Sí, es la misma carta `Tekei, Responsabilidad`. p32 y p36 referencian la misma carta. Ambas deben corregirse a Tekei.

## p40
13. **¿Hay encabezado "Créditos"?**: ✅ Sí, dice `Créditos` entre redes sociales y nombres del equipo (LLM lo omitió, hay que agregarlo).
14. **Kódem TCG vs TCC**: ✅ `Kodem TCG` (sin tilde en Kódem según Ramsés, y TCG — OCR alució TCC).

## Pendientes
- p19: post-validación conjunta del flowchart

---

## ⚠️ Política de typos clarificada por Ramsés
"convirtiéndote debe ser lo correcto, independientemente de como venga en el pdf."

**Implicación:** El principio "verbatim estricto" del pipeline aplicaba para detectar typos del PDF y trazarlos, pero en la consolidación final Ramsés prefiere el español correcto. Los typos se conservan **listados en el apéndice** del master-rulebook como referencia para que él los corrija en v5.2, pero los bloques de texto pueden normalizarse a español correcto.
