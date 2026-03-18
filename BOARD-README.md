# Kódem Board Viewer 🎴

Visualizador interactivo del estado de una partida de Kódem TCG en vivo.

## Qué es

Una página HTML estática que renderiza el tablero de una partida con:
- **Arte real de las cartas** (`.webp` del repositorio)
- **Dados de PV** sobre cada carta
- **Rotaciones de descanso** fieles al juego real:
  - 1 descanso = 90° (horizontal)
  - 2 descansos = 180° (de cabeza)
  - 3 descansos = reverso + 180° (boca abajo de cabeza)
- **Equipos alineados** debajo de su Adendei correspondiente
- **Popups interactivos** — click en cualquier carta o equipo para ver:
  - Arte completo
  - Nombre, folio, set
  - Tipo, energía, stats (daño, descansos)
  - Efecto completo
  - **Costo** (restricciones de equipamiento resaltadas en rojo)
  - Estado actual (en campo, oculta, extinción)
  - Flavor text y artista
- **Zona de Extinción** con cartas sombreadas y 💀
- **Protectores** con representación de descansos

## Cómo funciona

1. `board.html` carga `cards.json` (la misma DB de la webapp principal)
2. Las imágenes vienen de `images/` (mismos assets)
3. El estado del juego (PV, descansos, posiciones) está hardcodeado en el HTML
4. Cada turno, Logos actualiza el HTML con el nuevo estado
5. Se genera un screenshot vía Puppeteer para enviar por Telegram
6. La versión interactiva está disponible en el Cloudflare tunnel

## Archivos

| Archivo | Descripción |
|---------|-------------|
| `board.html` | Tablero interactivo (actualizado cada turno) |
| `cards.json` | Base de datos de 609 cartas (compartida con webapp) |
| `images/*.webp` | Arte de cartas (608 imágenes) |

## Stack

- HTML + CSS + vanilla JS (zero dependencies, igual que la webapp)
- Puppeteer para screenshots estáticos
- Cloudflare tunnel para acceso remoto

## Uso

### Ver en navegador
```
https://[tunnel-url]/board.html
```

### Generar screenshot
```bash
node -e "
const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({headless:'new', args:['--no-sandbox']});
  const page = await browser.newPage();
  await page.setViewport({width:960, height:1200});
  await page.goto('http://127.0.0.1:8787/board.html', {waitUntil:'networkidle0'});
  await page.screenshot({path:'kodem-board.png', fullPage:true});
  await browser.close();
})();
"
```

## Representación de descansos

| Descansos | Visual | Descripción |
|-----------|--------|-------------|
| 0 | Normal | Carta vertical, disponible |
| 1 | 90° | Carta horizontal |
| 2 | 180° | Carta de cabeza |
| 3 | 180° + reverso | Boca abajo y de cabeza (protectores iniciales) |

## Roadmap

- [ ] Actualización automática del estado vía JSON (sin hardcodear HTML)
- [ ] Animaciones de ataque/daño
- [ ] Historial de turnos con replay
- [ ] Integración con el simulador de batallas (Phase 2)
- [ ] Responsive mobile layout

## Contexto

Este viewer se creó durante la primera partida real de Kódem TCG entre Ramsés (Alpha ⚡🔥) y Logos (Beta 🐾👻), el 18 de marzo de 2026. Nació de la necesidad de tener una representación visual clara del estado del tablero mientras jugábamos por Telegram.

---
*Parte del proyecto [Kódem Companion](https://ramses-dleon.github.io/Kodem/)*
