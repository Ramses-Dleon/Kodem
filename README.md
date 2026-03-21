# 🎴 Kódem TCG Companion

> La primera herramienta digital para **Kódem TCG** — el juego de cartas coleccionable mexicano inspirado en la naturaleza, alebrijes y fauna endémica.

**[🌐 Abrir la App](https://ramses-dleon.github.io/Kodem/)** · **[🎴 Sitio Oficial](https://kodem-tcg.com)**

![Cartas](https://img.shields.io/badge/cartas-785-f59e0b?style=flat-square) ![Sets](https://img.shields.io/badge/sets-12-0d6efd?style=flat-square) ![License](https://img.shields.io/badge/fan--made-no%20oficial-dc2626?style=flat-square)

---

## ✨ Features

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
- 🎯 Want List directamente en el grid
- Dashboard completo:
  - Anillo de progreso + estadísticas generales
  - Pie chart de cartas únicas (448 nombres distintos)
  - Donut de distribución por rareza (8 categorías: Común, Rara, Súper Rara, Ultra Rara, Kósmica/Titánica, Full Art, Secreta, Evento)
  - Quick stats: sets completos, más completo, más faltantes
  - Barras de progreso por set
  - Acordeón de cartas faltantes por set
- Export/import colección vía JSON para backup
- Todo en localStorage — tu colección es tuya, privada en tu navegador

### 🏗️ Constructor de Mazos
- Reglas Kódem v5.0: 15-24 Adendei + Protector + Bio + Ixim/Rot
- Validación automática de estructura de mazo
- Guardar y cargar múltiples mazos

### ⚡ Sinergias
- Mapa de sinergias por energía y mecánicas de juego

## 📊 Base de Datos

| Stat | Valor |
|------|-------|
| Total cartas | 785 |
| Sets | 12 |
| Energías | 8 (Átlica, Pírica, Gélida, Lítica, Demótica, Feral, Húumica, Cháaktica) |
| Rarezas | 8 (Común, Rara, Súper Rara, Ultra Rara, Kósmica/Titánica, Full Art, Secreta, Evento) |
| Tipos de efecto | 6 |
| Cartas con Costo | 247 |
| Nombres únicos | 448 |

Datos verificados contra [kodem-tcg.com](https://kodem-tcg.com) + cartas físicas.

## 🛠️ Tech

- **Vanilla JS** — sin frameworks, sin build step
- **CSS** custom properties con dark/light mode
- **Service Worker** para uso offline (PWA)
- **Sin servidor** — todo corre en el navegador

## 📱 Responsive

Diseñado mobile-first. Modal con flechas táctiles, grid adaptable, dashboard responsive.

## ⚠️ Disclaimer

Este es un proyecto **fan-made** no oficial. Kódem TCG es propiedad de sus creadores. Las imágenes de las cartas pertenecen a Kódem TCG y sus artistas.

---

Hecho con 🜂 por la comunidad Kódem.
