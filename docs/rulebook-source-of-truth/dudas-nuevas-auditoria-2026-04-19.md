# Auditoría dudas nuevas — 2026-04-19

**Input:** cards.json (1074) + rulebook v5.1 + rulings resueltos (D1-D24, D26, M1, M2) + abiertas (D21-D22, D25, M2.3-M2.6, M3-M10, E1-E6).
**Scope:** dudas que NO están en el tracker actual (`dudas-pendientes-comunidad.md`) ni en auditorías T1/T2/T3.
**Auditor:** Sub-agente Logos (Opus 4.7).

## Resumen ejecutivo

- **Total dudas nuevas detectadas: 12**
- Desglose: **6 ambigüedades jugables** · **4 mecánicas no documentadas** · **2 erratas estructurales**
- Hallazgo de mayor impacto: **D27 — condición de victoria alternativa** en Draxes, Último Aliento (jamás documentada en el rulebook, cambia fundamentalmente cómo se gana).
- 4 de estos hallazgos tocan interacciones con rulings ya resueltos (M1 Fuera del Juego, M2 Intercambiar) y requieren ajuste fino.

---

## 🔴 Ambigüedades jugables nuevas

### D27. Condición de victoria alternativa — "¡GANAS EL JUEGO!"
**Cartas relevantes:** TCEO-009, TCOO-009 (Draxes, Último Aliento).
**Texto relevante:** *"Pasiva: Si esta carta daña y envia a Extincion a un Protector rival, ¡GANAS EL JUEGO!"*
**Contexto:** El rulebook v5.1 §8 (condición de victoria) solo contempla ganar por eliminar Protector rival bajo reglas generales. Esta es la **única carta** del set que declara explícitamente una victoria textual. Sin embargo, cualquier carta que daña al Protector hasta 0 PV también lo elimina — ¿en qué se diferencia?
**Interpretaciones posibles:**
1) Es **redundante**: Draxes solo enfatiza que el daño debe venir de sí misma (no de marcas/efectos de terceros), en cuyo caso basta con la regla general.
2) Es **mecánica especial**: bypasea condiciones (ej. gana aún si el rival tenía efecto tipo "no puedes perder este turno") o se resuelve antes que cualquier respuesta rival.
3) Es un **loss-replacement**: si el rival tiene efecto "si tu Protector sería eliminado, vuelve con N PV", esta cláusula lo anula.
**Impacto:** alto. Afecta reglas meta (gana/pierde) y potencialmente interactúa con negación.

---

### D28. "Cambiar de lugar" vs "Cambiar" (§6.5)
**Cartas relevantes:** LGRO-001S, LGRO-007U, LGRO-077, TC24-001, TCDE-009UV, TCEO-044, TCOO-044, TRWA-001S, TRWA-007U, TRWA-077, XPIX-003, ISPMR-019 (Hali, Ave de Trueno: "Cambia esta carta por la carta rival frente a ella").
**Texto relevante:** *"Activa: Cambia de lugar 2 cartas en Zona Principal"* (Zaykan, Fractura) · *"Cambia esta carta por la carta rival frente a ella"* (Hali).
**Contexto:** El ruling **M2** estableció que **Intercambiar = Cambiar (§6.5)**. Pero "Cambiar de lugar" dentro de la **misma Zona Principal aliada** (Zaykan) y "Cambiar" con carta rival (Hali) son operaciones geométricamente distintas a la definición del glosario (*"movimiento entre espacios o campos"*). ¿Son el mismo efecto formal?
**Interpretaciones posibles:**
1) **Sinónimo total**: "Cambiar de lugar" = "Cambiar" (§6.5), incluye anti-cambio rival y preserva vida/equipos/marcas.
2) **Mecánica menor**: reordenamiento posicional en ZP sin mover entre zonas; no dispara efectos anti-cambio ni de "si una carta deja ZP".
3) **Híbrido**: Zaykan (aliado↔aliado) es menor; Hali (aliado↔rival) es Cambiar formal.
**Impacto:** alto. Relevante para posición "frente a" (ver M11 abajo) y equipos/marcas.

---

### D29. "Neutral" como `effect_text` — ¿valor mecánico o placeholder?
**Cartas relevantes:** KPRC-049, TCEO-002K, TCEO-033, TCOO-002T, TCOO-033 (Hypex vs Draxes, Batalla Prehistórica) · TCEO-034, TCOO-034 (Greifen vs Rasvel, Error Anacrónico).
**Texto relevante:** `effect_text: "Neutral"` (única palabra, sin `Activa:`/`Pasiva:`).
**Contexto:** Type=Adendei, subtype=Titán, energy=Huumica-Pirica, pero "Neutral" NO aparece en glosario §9 ni como Efecto ni como Energía. Todas las variantes "vs" de batalla prehistórica comparten este patrón. En contraste, KPRC-047 Hypex Atardecer usa `"Ninguna (solo lore)"` como effect_text, que SÍ es autoexplicativo.
**Interpretaciones posibles:**
1) **"Neutral" = carta sin efecto**, análogo a "Ninguna (solo lore)" — redacción inconsistente entre diseñadores.
2) **"Neutral" = estado/energía especial** aún no formalizado (ej. inmune a interacciones de energía).
3) **Placeholder de edición** olvidado; debería decir "Ninguna (solo lore)".
**Impacto:** medio. Las cartas son jugables (0 líneas de efecto = no hacen nada), pero el término contamina el vocabulario del juego.

---

### D30. "Regresar estadísticas a su valor original" — alcance
**Cartas relevantes:** CAMP-0007UV, TCEO-001S, TCEO-004, TCOO-001S, TCOO-004 (Virste, Reseteo).
**Texto relevante:** *"Activa: Regresa las estadisticas de todas las cartas en el campo a su valor original."*
**Contexto:** "Estadísticas" no está en glosario. ¿Qué abarca exactamente?
**Interpretaciones posibles:**
1) **Solo daño/vida/descansos impresos** — revierte Escalar/Descender/cura/daño acumulado.
2) **Incluye energía/subtipo/tipo** — revierte conversiones de Feralizar, Enis FYTE-033 "se considerará Catrín", Amanecer LGRO-037 "cambia su energia".
3) **Incluye marcas** — Quemar/Envenenar/Abismar se remueven al "resetear".
4) **Incluye efectos copiados** — Brazalete de Rotanio RAMI-007S pierde su efecto copiado.
**Impacto:** alto. Virste es una Activa de uso común; su alcance decide si es soft-reset o hard-wipe.

---

### D31. "Esta Pasiva no puede ser negada" vs "Esta carta no puede ser negada"
**Cartas relevantes:** KPRC-007 / TRWA-006 (Yakerr), KPRC-039 (Makua, Venganza Abisal), MLBU-001S (Arbol, Leyendas), MLBU-003S (Zaykan, Jungla y Calma), MLBU-009 (Boras), KPRF-0001 / TRWA-034 (Tzun, Heraldo), LGRO-014 / TRWA-014 (Develación), RAMI-004S, TCDE-021 (Rots Andantes) — 29+ cartas totales.
**Texto relevante:** Varias formulaciones coexisten: *"Los ataques de esta carta no pueden ser negados"* (Yakerr) · *"El ataque de esta carta no puede ser negado o desviado"* (Tzun) · *"Esta Pasiva no puede ser negada"* (Makua) · *"Esta Activa no puede ser negada ni desviada"*.
**Contexto:** El glosario (§Negar, §Desviar) define las acciones pero NO si son auto-sobrescribibles. ¿El no-negado aplica recursivamente?
**Interpretaciones posibles:**
1) **Literal**: solo la Pasiva/ataque específico es inmune; otros efectos en la misma carta sí pueden negarse.
2) **Transitivo**: efectos dependientes (costos pagados dentro de la Pasiva, efectos que la Pasiva genera como Quemar) heredan la inmunidad.
3) **Meta-inmune**: "Esta Pasiva no puede ser negada" es una Pasiva en sí misma — ¿puede esa meta-Pasiva ser negada?
**Impacto:** alto. Define el techo de counter-juego contra win-conditions como MLBU-001S o Makua.

---

### D32. Protector Nahual copia Activa del Protector rival
**Cartas relevantes:** FYTE-012S, FYTE-083 (Nahual, Máscara).
**Texto relevante:** *"Usa 1 de los siguientes efectos: -Usa la misma Activa y costo que el Protector rival. -Cura 1 pto. a 3 cartas en tu campo."*
**Contexto:** Combina glosario "Copiar" (p38/b11 "copia otra carta especificada") con reglas de Protector (12 PV, 3 descansos fijos). ¿Qué tan profundo es el copy?
**Interpretaciones posibles:**
1) **Solo el texto del efecto**: Nahual paga su propio costo y resuelve el efecto. Se considera "Usa la Activa de Nahual" para fines de descanso.
2) **Copia texto + costo literal**: si el Protector rival requiere "Envía 1 Adendei Catrín aliado a Extinción", Nahual debe tener Catrín aliado.
3) **Copia vinculación**: ¿Requiere que Nahual esté vinculado a un Adendei que cumpla requisitos de la Activa rival?
Ya hay ruling D?? sobre Brazalete de Rotanio copiando costo (T3 §7) pero Nahual es Protector, no Equipo — regla de Protector bloquea algunas interacciones.
**Impacto:** medio. Pocas interacciones pero resuelve el patrón de "copia de Protector" para el futuro.

---

## 🟡 Mecánicas sin definición formal nuevas

### M11. "Frente a" — adyacencia posicional en Zona Principal
**Cartas que la requieren:** FYTE-001 (Juan Galgo Ceolín, Protector), IDRMA-004 (Zaykan, Luz Celeste), IDRMG-006 (Zaykan, Ermitaño), ISPMR-019 (Hali), KPRF-0004 (Tekei, Destierro), LGRO-004U / TRWA-004U (Hog, Terremoto), LGRO-007U / LGRO-077 / TRWA-007U / TRWA-077 / XPIX-003 (Kuyovi), LGRO-017 / TRWA-017 (Juan Galgo, Motín), LGRO-051 / TRWA-051 (Satélite V.E.L.O.), TCDE-009UV (Ib-Nirge), TRWA-062 (Tekei), TRWA-063 (Hali) — **15+ cartas**.
**Contexto:** "Frente a" implica que ZP del jugador y ZP rival tienen **3 espacios espejados** donde cada carta tiene una contraparte geométrica. El rulebook menciona "3 espacios en ZP" (§Zonas) pero NO formaliza la correspondencia posicional entre ZPs de ambos jugadores ni cómo se asigna "frente a" cuando uno tiene menos de 3 cartas.
**Preguntas abiertas:**
1) ¿Los 3 espacios son fijos (izq/centro/der), y "frente a" es el espejo directo?
2) Si ZP rival tiene huecos, ¿una carta en ese hueco está "frente a" nada (sin objetivo)?
3) ¿Protector está "frente a" alguien? Satélite V.E.L.O. dice *"las cartas rivales no pueden atacar a la carta frente a ellas"* — ¿bloquea ataque a Protector también?
4) Cuando se usa "Cambiar de lugar" (D28), ¿la nueva posición altera las relaciones "frente a" de todas las cartas?
**Sugerencia v5.2:** sección §Zonas.Posiciones con diagrama 3×2, y regla explícita de "frente a" con casos borde (huecos, cartas ocultas, Protector).

---

### M12. "Efecto rápido" / "se considera Activa Rápida" — promoción de velocidad
**Cartas relevantes:**
- CAMP-0017UV, TCEO-002S, TCEO-006, TCOO-002S, TCOO-006 (Ryptor, Jugada Veloz): *"el efecto de ese Adendei se considera efecto rapido durante este turno"*
- LGRO-003S, TRWA-003S (Yakerr, Vínculo Odémico): *"el efecto de esa carta se considera Activa Rapida"*
**Contexto:** Dos fraseos distintos que suben la velocidad de un efecto. El glosario §Activa-Rápida y §Pasiva-Rápida están definidos, pero no existe una regla general de **promoción de velocidad** (convertir Activa→Activa-Rápida).
**Preguntas abiertas:**
1) "Efecto rápido" y "Activa Rápida" ¿son sinónimos o conceptos distintos?
2) ¿Qué pasa con una Pasiva que "se considera Activa Rápida"? (el glosario establece que Pasiva no genera descansos y Activa-Rápida sí).
3) ¿Puede el efecto promovido ser usado en **turno rival** (característica de Activa-Rápida)?
4) ¿Los costos se pagan bajo reglas de velocidad original o promovida?
**Sugerencia v5.2:** formalizar "promoción de velocidad" en §Efectos y clarificar que la conversión incluye todas las propiedades de la velocidad destino (genera descansos, usable en turno rival).

---

### M13. Fase de Batalla como unidad referenciable
**Cartas relevantes:** LGRO-025 / TRWA-025 (Escudos I.C.A.R.O.): *"Si la carta equipada será afectada por un efecto durante la Fase de Batalla, desvía ese efecto"* · LGRO-030 / TRWA-030 (Balim, Anochecer): *"Tu rival no puede activar equipos durante la Fase de Batalla"*.
**Contexto:** El rulebook documenta subfases de batalla (§Declaración) pero "Fase de Batalla" como ventana temporal referenciable NO está en glosario §9. Es clara en §3 (estructura de turno) pero sin entrada formal. Distinta de "Fase Previa" (también sin entrada formal).
**Preguntas abiertas:**
1) ¿"Fase de Batalla" cubre Declaración + Resolución + ambos ataques del turno?
2) ¿Activar equipos "durante Fase de Batalla" incluye la sub-fase Previa inmediatamente anterior?
3) Interacción con efectos "al inicio del turno" / "al final del turno" — ¿caen dentro de Fase de Batalla?
**Sugerencia v5.2:** añadir entradas `Fase Previa`, `Fase de Batalla`, `Fase Final` al glosario §9 con ventana temporal precisa.

---

### M14. "Estadísticas originales" — estado snapshot
**Cartas relevantes:** CAMP-0007UV Virste (ver D30 para alcance) · LGRO-020 Cordyceps (*"las cartas escaladas regresan a su daño original"*) · KPRC-019 Zaren ("Zona Principal original" — ya parcialmente en M2.4).
**Contexto:** "Original" aparece en al menos 3 contextos distintos (stats, daño, zona) sin definición formal. Relacionado con M2.4 pero más amplio: ¿"original" = impreso en carta al inicio del juego, o al inicio del turno, o al momento de entrar al campo?
**Preguntas abiertas:**
1) Si un Adendei fue Escalado permanentemente y después un efecto lo cambió de energía, "regresar a original" ¿revierte ambos?
2) ¿Los Tokens con stats heredados (M7) tienen "estadísticas originales" = las del momento de creación o las de la carta fuente?
**Sugerencia v5.2:** definir `valor original` como "valor impreso en la carta (no modificado por ningún efecto)" y hacer excepción explícita para Tokens.

---

## 🟠 Erratas estructurales nuevas

### E7. Subtipo `Titan` (sin tilde) — única inconsistencia residual
**Carta afectada:** KPRC-072 (1 carta) — `subtype: "Titan"` en vez de `"Titán"`.
**Patrón:** 127 cartas usan `"Titán"` (con tilde); KPRC-072 es la única con `"Titan"`.
**Sugerencia de corrección:** normalizar a `"Titán"` en cards.json. Verificar si el rulebook lista el subtipo oficial con o sin tilde y actualizar consistencia (relacionado con D26 Átlico).

---

### E8. Subtipos compuestos `"Guardián Catrín"` y `"Titán Catrín"` — ¿multisubtipo o string literal?
**Cartas afectadas:**
- `Guardián Catrín`: FYTE-008R, FYTE-026 (Macit, Resguardo Divino)
- `Titán Catrín`: FYTE-020R, FYTE-072 (Therz, de Vuelta a la Tumba)
**Patrón:** El rulebook §p06 lista subtipos individuales (Titán, Catrín, Guardián…). Estas cartas combinan dos subtipos en un solo string. ¿Son **dos subtipos** (la carta es ambos: Titán Y Catrín), o **un subtipo compuesto** (nuevo: "Titán Catrín")?
**Impacto:** efectos como FYTE-033 Enis ("se considerará Adendei Catrín") o "Adendei Titán" (TCDE-021 Rots Andantes: *"los ataques de los Adendei Titanes no pueden ser negados"*) dependen del matching de subtipo. Un Therz "Titán Catrín" — ¿es objetivo de efectos que seleccionan "Titán"?
**Sugerencia de corrección:** (a) migrar a campo `subtypes: ["Titán", "Catrín"]` (array) o (b) agregar regla explícita en §Subtipos: "un string con múltiples subtipos separados por espacio significa que la carta tiene todos esos subtipos simultáneamente".

---

## Cartas / folios no auditables

Ninguna en este scope. Las 1074 cartas en `cards.json` fueron escaneadas completas. Reportes T1/T2/T3 previos ya cubren ambigüedades de engine (normalización sin acentos) y no se re-auditaron aquí.

---

## Falsos positivos descartados

Elementos que inicialmente parecieron dudas pero ya están cubiertos o son por diseño:

| Hallazgo | Razón de descarte |
|---|---|
| "Cyra gasta 6 puntos" (INMX-001, KSPC-001) | Ya en tracker como **E1** (typo histórico de Cura). |
| "Consejo" (TCEO-001, TCOO-001) | Ya en tracker como **M8**. |
| "Fuera del juego" (Quam TCOO-006U) | Ya **RESUELTO** como M1. |
| "Intercambiar" (Ariam Resurrección, Mizthe Arconte) | Ya **RESUELTO** como M2 (intercambiar = cambiar §6.5). |
| "Durante el resto del juego" (Mixtla) | Ya en tracker como **M3**. |
| "Efectos de cartas tomadas" (Nirge) | Ya en tracker como **M4**. |
| "Descansos indicados" (Xakros) | Ya en tracker como **M6**. |
| "Tokens con stats copiados" (Gloku, Zaren) | Ya en tracker como **M7**. |
| "Hasta N jugadores" (Maíz, Vesta Ignia) | Ya en tracker como **M9** (multijugador). |
| "Feliz Navidad" / "choque de puños" (NAVD, SNVL) | Ya en tracker como **M10**. |
| `Piricco` sin tilde / `ccon` duplicación | Ya en tracker como **E2/E3** + por diseño del engine. |
| Efectos con `effect_text: ""` o stats incompletos | Normalización de cards.json; no es duda de reglas. |
| "Pasiva:"/"Activa:" sin prefijo en reimpresiones | Cubierto por T1 (13 grupos 🟡 normalización). |

---

## Notas finales

Todas las dudas listadas son de **complejidad mecánica real** (no typos ni normalización). Los 12 ítems afectan:

- **3 cartas de win-condition** (D27, D31 Makua/MLBU-001S, D30 Virste Reset).
- **15+ cartas dependientes de posición** (M11).
- **7 cartas con promoción de velocidad** (M12).
- **Todo el ecosistema de efectos "copia"** (D32).

Prioridad sugerida para Ramsés: **D27 (alto), M11 (alto), D28 (alto), D30 (alto), M12 (medio), resto (medio-bajo)**.

---

_Reporte generado: 2026-04-19 · Auditor: Sub-agente Logos (Opus 4.7) · Input: cards.json @ 1074 cartas · Cross-check: rulings-v5.1.md + dudas-pendientes-comunidad.md + auditorías T1/T2/T3._
