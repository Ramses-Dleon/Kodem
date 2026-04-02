# 📜 Códice Kódem

> La primera herramienta digital para **Kódem TCG** — el juego de cartas coleccionable mexicano inspirado en la naturaleza, alebrijes y fauna endémica.

**[🌐 Abrir la App](https://ramses-dleon.github.io/Kodem/)** · **[🎮 Tablero](https://ramses-dleon.github.io/Kodem/board/)** · **[🎴 Sitio Oficial](https://kodem-tcg.com)** · **[☕ Apóyanos](https://ko-fi.com/hule88)**

![Cartas](https://img.shields.io/badge/cartas-785-f59e0b?style=flat-square) ![Sets](https://img.shields.io/badge/sets-12-0d6efd?style=flat-square) ![Tablero](https://img.shields.io/badge/tablero-interactivo-22c55e?style=flat-square) ![License](https://img.shields.io/badge/fan--made-autorizado-22c55e?style=flat-square)

> ⚠️ **Nota:** Esta versión (v1.0) es el snapshot final en GitHub Pages. La app está migrando a Vercel con backend (auth con Google, marketplace de precios, sync de colección en la nube). La nueva versión estará en [kodem-app.vercel.app](https://kodem-app.vercel.app).

---

## ✨ Funcionalidades

### 🔍 Explorador de Cartas
- **785 cartas** de 12 sets con imágenes oficiales
- 6 tipos de efecto: Activa, Activa-Rápida, Pasiva, Pasiva-Rápida, Activa y Pasiva, Ninguno
- 247 cartas con Costo como campo separado
- Filtros: set, tipo, energía, rareza, subtipo, texto de efecto
- Búsqueda por nombre, efecto y folio
- Grid con 3 tamaños (S/M/L), paginación configurable (20/50/100)
- Modal con stats, efecto, costo, lore y otras versiones de la misma carta
- Navegación ← → con teclado y flechas táctiles (móvil)

### 📦 Mi Colección
- ♥ Agregar/quitar de colección directamente en el grid
- 🎯 Want List para rastrear cartas faltantes
- Dashboard completo con anillo de progreso, distribución por rareza, barras por set
- Export/import vía JSON para backup
- Todo en localStorage — tu colección es privada en tu navegador

### 🃏 Constructor de Mazos
- Reglas Kódem v5.0: 15–24 Adendei + Protector + Bio + Ixim/Rot
- Deck format v2: campos separados para cada tipo de carta
- Validación automática de estructura
- Export/import de mazos vía códigos **KDECK** (compartibles por chat)
- Guardar y cargar múltiples mazos

### ⚡ Sinergias
- Mapa visual de sinergias entre cartas por energía y mecánicas

### 📖 Guía
- Resumen de reglas con referencia rápida de mecánicas Kódem v5.0

### 🎮 Tablero Interactivo
- **Practica partidas** directamente en el navegador
- Fases del turno: Previa → Batalla → Post → Equipo → Fin
- 3 posiciones de campo por jugador + Protector + Bio + Equipo + Extinción
- Revelar cartas, equipar Rot/Ixim, resolver combate
- Marcas visuales: 🔥 quemadura, ☠️ veneno, 🌀 abismo
- Botones de efectos específicos por carta (609 cartas cubiertas)
- **Sincronización entre jugadores** vía códigos KBOARD
- Vista desktop y mobile optimizada

---

## 📊 Base de Datos

| Stat | Valor |
|------|-------|
| Total cartas | 785 |
| Imágenes | 848 (webp) |
| Sets | 12 |
| Energías | 8 (Átlica, Pírica, Gélida, Lítica, Demótica, Feral, Húumica, Cháaktica) |
| Rarezas | 8 (Común 522, Rara 68, Súper Rara 80, Ultra Rara 46, Kósmica/Titánica 8, Full Art 58, Secreta 2, Evento 1) |
| Tipos | Adendei 506, Protector 60, Rot 52, Ixim 50, Bio 48, Rava 39, Espectro 21, Token 6, Lore 3 |
| Subtipos | 10 (Abisal, Catrín, Equino, Guardián, Infectado, Kósmico, Resurrecto, Titán...) |
| Cartas con Costo | 247 |
| Nombres únicos | 448 |

Datos verificados contra [kodem-tcg.com](https://kodem-tcg.com) + cartas físicas.

---

## 📁 Estructura del Proyecto

```
Kodem/
├── index.html          # App principal (982 líneas)
├── app.js              # Lógica completa (3,599 líneas)
├── style.css           # Estilos dark/light theme (3,730 líneas)
├── sw.js               # Service Worker para PWA (153 líneas)
├── cards.json          # Base de datos de 785 cartas
├── set-aliases.json    # Nombres completos de sets
├── sinergias.html      # Mapa de sinergias (standalone)
├── manifest.json       # PWA manifest
├── board/              # Tablero interactivo
│   ├── index.html      # UI del tablero
│   ├── game.js         # Motor de reglas (~1,395 líneas)
│   ├── main.js         # UI/render (908 líneas)
│   ├── render.js       # Renderizado de cartas (421 líneas)
│   ├── effects-ui.js   # Botones de efectos (412 líneas)
│   └── board.css       # Estilos del tablero
├── images/             # 848 imágenes webp (~136MB)
├── icons/              # PWA icons
├── docs/               # Documentación
│   └── reglas.md       # Reglas Kódem v5.0 (510 líneas)
├── CHANGELOG.md        # Historial de cambios
├── CONTRIBUTING.md     # Guía para contribuir
└── LICENSE             # MIT
```

---

## 🛠️ Tech Stack

- **Vanilla JS** — sin frameworks, sin build step
- **CSS** custom properties con dark/light mode
- **Service Worker** para uso offline (PWA instalable)
- **Sin servidor** — todo corre en el navegador
- **localStorage** — colección, mazos, configuración
- **GitHub Pages** — hosting estático gratuito

### Desarrollo local
```bash
git clone https://github.com/Ramses-Dleon/Kodem.git
cd Kodem
python3 -m http.server 8787
# Abrir http://localhost:8787
```

---

## 📱 Responsive

Diseñado mobile-first. Touch targets ≥44px, filtros colapsables, navegación por gestos en modales. El tablero tiene vista mobile dedicada con botones táctiles optimizados.

---

## 🗺️ Roadmap

La app está migrando a una arquitectura con backend:

- [x] Explorador de cartas (785 cartas, 12 sets)
- [x] Colección y want list
- [x] Constructor de mazos con validación
- [x] Tablero interactivo
- [x] PWA offline
- [ ] 🔐 **Login con Google** — tus datos en la nube
- [ ] 💰 **Marketplace de precios** — la comunidad propone y vota precios de cartas
- [ ] 📊 **Valuación de colección** — cuánto vale lo que tienes
- [ ] ☁️ **Sync de colección** — accede desde cualquier dispositivo

---

## ☕ Apóyanos

¿Te gusta la app? [Invítanos un sobre de Kódem en Ko-fi](https://ko-fi.com/hule88) para seguir mejorándola 🃏

---

## ⚠️ Aviso Legal

Proyecto **fan-made** autorizado por el equipo creador de Kódem. Las imágenes de las cartas pertenecen a Kódem TCG y sus artistas. Kódem TCG © [Adendei Entretenimiento S.A. de C.V.](https://kodem-tcg.com)

---

Hecho con 🔥 por fans de Kódem · v1.0.0 · [☕ Apóyanos](https://ko-fi.com/hule88)
