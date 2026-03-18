# 🜂 Kódem TCG Companion

> La primera herramienta digital para **Kódem TCG** — el juego de cartas coleccionable mexicano inspirado en la naturaleza, alebrijes y fauna endémica.

**[🌐 Abrir la App](https://ramses-dleon.github.io/Kodem/)** · **[⚡ Sinergias](https://ramses-dleon.github.io/Kodem/sinergias.html)** · **[🎴 Sitio Oficial](https://kodem-tcg.com)**

![Status](https://img.shields.io/badge/cartas-609-f59e0b?style=flat-square) ![Sets](https://img.shields.io/badge/sets-22-0d6efd?style=flat-square) ![License](https://img.shields.io/badge/fan--made-no%20oficial-dc2626?style=flat-square)

---

## ✨ Features

### 🔍 Explorador de Cartas
- **609 cartas** de 22 sets con imágenes de alta calidad
- Filtros: set, tipo, energía, rareza, subtipo, texto de efecto
- Búsqueda por nombre Y texto de efecto
- Ordenar por nombre, daño, rests o set
- Grid con 3 tamaños (S/M/L)
- Modal detallado con stats, efecto, lore colapsable

### 📦 Mi Colección
- Tracker de colección con estadísticas (total, %, sets completos)
- Dashboard con anillo de progreso y breakdown por set
- Filtros: todas / en colección / me faltan
- Paginación (50 por página)
- **🎯 Want List** — tab dedicada para cartas que buscas
- Importar/exportar colección vía **códigos sync** (`KDM-xxx`)
- Export/import JSON para backup completo

### 🏗️ Constructor de Mazos
- Crear, guardar y gestionar múltiples mazos
- **Validación automática** (Formato Estándar):
  - 15-24 Adendei, 1-2 Protector, 0-2 Rava, 0-1 Bio, 0-10 Equipo
  - 1 copia por carta
- Gráficas: distribución de energía, histograma de daño
- Promedio de daño y rests
- **⚠️ Indicador de cartas no-owned** (borde rojo + badge)
- Filtro "Solo mi colección" en el pool
- Tabs mobile: Mi Mazo / Cartas Disponibles
- Compartir mazos vía **códigos sync** (`KDECK-xxx`) o URL directa
- Export JSON

### ⚡ Mapa de Sinergias
- Diagrama visual de las 8 energías y sus interacciones
- Fortalezas y debilidades de cada energía
- Combos recomendados con cartas ejemplo
- Fully responsive, mismo sistema de temas

### 📖 Guía Rápida
- Tablero de juego visual con zonas explicadas
- 7 secciones: Tablero, Fases, Tipos, Energías, Victoria, Reglas 80/20, Glosario
- Aprender Kódem en 5 minutos

### 📬 Contacto
- 4 categorías: reportar error, sugerir feature, datos de cartas, otro
- Formulario vía mailto (sin tracking)

### 🎨 Diseño
- **Dark mode** "Cosmic Night" (default) + **Light mode** "Ancient Parchment"
- Estética Mesoamericana: tipografías Cinzel + Outfit
- Paleta de colores por energía (8 colores temáticos)
- Mobile-first: touch targets 44px, collapsible filters
- SVG favicon con glifo alquímico 🜂

---

## 🚀 Uso

### Online
Abre **https://ramses-dleon.github.io/Kodem/** — no necesitas instalar nada.

### Local
```bash
git clone https://github.com/Ramses-Dleon/Kodem.git
cd Kodem
python3 -m http.server 8787
# Abre http://localhost:8787
```

No requiere build tools, npm, ni dependencias. HTML + CSS + JS puro.

---

## 📊 Datos

| Campo | Cobertura |
|-------|-----------|
| Folio | 609/609 (100%) |
| Nombre | 609/609 (100%) |
| Tipo | 609/609 (100%) |
| Energía | 552/609 (97%) — nulls intencionales en Ixim/Rot/Bio/Protector |
| Daño | 584/609 (96%) |
| Texto de efecto | 535 con texto, 74 vacíos confirmados, 0 sin revisar |
| Imagen | 608/609 (99.8%) — solo KPRC-064 sin imagen |

**Validación**: 608/609 cartas verificadas por visión AI (Sonnet 4.6) contra las imágenes originales. 10 errores corregidos. Accuracy post-validación: ~99.5%.

### Sets incluidos (22)
LGRO, TCOO, FYTE, KPRC, TCDE, DOOC, RAMI, MLBU, CMFT, CAMP, SPMR, RMFT, INMX, 1DRMA, 1DRMG, 1DRMP, IDRMA, IDRMG, IDRMP, ISPMR, LGROK, MINICONJ

### Schema de `cards.json`
```json
{
  "folio": "LGRO-001",
  "name": "Zaykan, Retorno del Ermitaño",
  "set": "LGRO",
  "type": "Adendei",
  "subtype": null,
  "energy": "Lítica",
  "energy2": null,
  "damage": 2,
  "rests": 2,
  "effect_type": "Pasiva",
  "effect_text": "Si esta carta es revelada...",
  "cost_text": null,
  "flavor_text": "El portal se cerró tras de sí...",
  "species": "Cyclura lewisi",
  "artist": "Attoz",
  "rarity_variants": ["K", "R", "S", "U"],
  "image": "images/LGRO/LGRO-001.webp"
}
```

---

## 🔄 Sync Codes

Toda la data vive en tu navegador (`localStorage`). Para compartir:

- **Colección**: `KDM-xxx` — codifica tus folios en base64 comprimido
- **Mazos**: `KDECK-xxx` — codifica las cartas del mazo
- **URL directa**: `#deck=FOLIO1,FOLIO2,...` abre el deck builder con esas cartas

No hay servidor, no hay cuentas, no hay tracking. Tu data es tuya.

---

## 🎮 Sobre Kódem TCG

**Kódem** es un juego de cartas coleccionable mexicano creado por Alan y publicado por **Adendei Entretenimiento S.A. de C.V.** Las criaturas del juego (_Adendei_) son guardianes de la naturaleza inspirados en flora y fauna endémica mexicana, alebrijes y mitología.

**Mecánica única**: El deck NO se baraja. Tú decides el orden de tus cartas, lo que permite una planificación estratégica imposible en otros TCGs.

**Formato Estándar**: 15-24 Adendei + 1-2 Protector + 0-2 Rava + 0-1 Bio + 0-10 Equipo. Victoria: enviar 10 cartas rivales a Extinción.

**8 Energías**: Átlica 💧 · Pírica 🔥 · Gélida ❄️ · Lítica 🪨 · Cháaktica ⚡ · Húumica 🍄 · Demótica 💀 · Feral 🐾

### Links oficiales
- 🌐 [kodem-tcg.com](https://kodem-tcg.com)
- 📷 [@kodem_tcg](https://instagram.com/kodem_tcg)
- 💬 [Discord](https://discord.gg/AUJxEGWMbF)
- 🎥 [El Kanal de Kalan](https://www.youtube.com/@ElKanaldeKalan) (fan)

---

## 🛠️ Tech Stack

| Componente | Tecnología |
|-----------|-----------|
| Frontend | HTML5 + CSS3 + Vanilla JS |
| Fuentes | Google Fonts (Cinzel + Outfit) |
| Imágenes | WebP, lazy-loaded |
| Storage | localStorage (client-side) |
| Hosting | GitHub Pages |
| Build | Ninguno — zero dependencies |

---

## 📝 Contribuir

Este es un proyecto fan-made en desarrollo. Si juegas Kódem y quieres ayudar:

1. **Reportar errores** en las cartas (texto, energía, imagen)
2. **Sugerir features** via Issues
3. **Datos de cartas nuevas** cuando salgan expansiones
4. **Correcciones de reglas** si algo no cuadra con el rulebook oficial

---

## ⚖️ Disclaimer

Este es un proyecto **fan-made, no oficial**. Kódem TCG © [Adendei Entretenimiento S.A. de C.V.](https://kodem-tcg.com) Todas las imágenes y nombres de cartas son propiedad de sus respectivos dueños. Este proyecto no está afiliado ni respaldado por Adendei Entretenimiento.

---

Hecho con 🔥 por un fan de Kódem TCG
