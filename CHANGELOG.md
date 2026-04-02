# Changelog

Todos los cambios notables del Kódem TCG Companion.

## [1.0.0] — 2026-04-02 — Snapshot Final (GitHub Pages)

> Última versión estática en GitHub Pages. La app migra a Vercel con backend (auth, marketplace de precios).

### Desde v0.9.0
- **785 cartas** (+176 desde lanzamiento) de 12 sets verificados
- **848 imágenes** webp de cartas
- **Tablero interactivo** — practica partidas en el navegador con fases de turno, combate, equipo, sync KBOARD
- **Deck format v2** — campos separados: `cards[]`, `protector`, `protector_suplente`, `bio`, `rava`, `equips[]`
- **KDECK export/import** con soporte completo para support cards
- **32 bugs corregidos** en auditoría profunda (2026-04-01):
  - `addToDeck()` enruta por tipo a slots dedicados
  - `removeFromDeck()` limpia todos los slots independientemente
  - Exports (texto, JSON, URL, KDECK) incluyen support slots
  - KSYNC Push serializa correctamente
  - Touch targets ≥44px en mobile
  - `:focus-visible` global para accesibilidad
  - Board: veneno/descansos del rival, tokens, equipo al ocultar
- **Sort secundario por folio** en ordenar por set
- **Filtro de subtipo exacto** (ya no matchea parcial)
- **importDeckFromHash()** soporta formato KDECK con todos los campos
- **importDeckSyncCode()** fix double-decode base64

### Stats finales v1.0
| Stat | Valor |
|------|-------|
| Cartas | 785 |
| Imágenes | 848 |
| Sets | 12 |
| Commits | 231 |
| Archivos JS | app.js (3,599 líneas), sw.js (153 líneas) |
| CSS | style.css (3,730 líneas) |
| Board | game.js (~1,395), main.js (908), render.js (421), effects-ui.js (412) |

---

## [0.9.0] — 2026-03-17

### 🎉 Primera versión pública

#### Explorador de Cartas
- 609 cartas de 22 sets con imágenes
- Filtros: set, tipo, energía, rareza, subtipo, texto de efecto
- Búsqueda por nombre y texto de efecto
- Ordenar por nombre, daño, rests, set
- Grid con 3 tamaños (S/M/L)
- Modal detallado con layout mobile-first (acciones arriba, lore colapsable)

#### Mi Colección
- Tracker con dashboard (anillo de progreso, stats por set)
- Tabs: 📦 Mi Colección / 🎯 Want List
- Paginación (50/página)
- Filtros avanzados con toggle mobile
- Sync codes (KDM-xxx) para importar/exportar
- Export/import JSON

#### Constructor de Mazos
- Crear, guardar, eliminar mazos
- Validación automática (Formato Estándar)
- Gráficas: energía, histograma de daño, promedios
- Indicador de cartas no-owned (borde rojo + ⚠️)
- Filtro "Solo mi colección"
- Tabs mobile: Mi Mazo / Cartas Disponibles
- Sync codes (KDECK-xxx) y URL directa (#deck=...)
- Export JSON

#### Sinergias
- Mapa visual de 8 energías con interacciones
- Fortalezas, debilidades, combos recomendados

#### Diseño
- Dark "Cosmic Night" + Light "Ancient Parchment" (toggle persistente)
- Tipografías Cinzel + Outfit
- Paleta de 8 colores por energía
- Mobile-first: touch targets 44px, collapsible filters
- SVG favicon 🜂

#### Datos
- 609 cartas, 608 con imagen
- OCR de textos de efecto (535 con texto, 74 vacíos confirmados)
- 22 sets con aliases de nombres completos
- Variantes foil: R (Rara), S (Súper Rara), U (Ultra Rara), K (Kósmica)

### Correcciones de datos
- 57 energías incorrectas limpiadas (Rot/Ixim/Bio/Protector no tienen energía)
- CAMP-009UV → Demótica, CAMP-010UV → Lítica (UVs sin energía visible)
- ISPMR cards marcadas como art prints (sin datos de juego)
- 18 nombres null corregidos
