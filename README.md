# Códice Kódem — Catálogo Público

**Catálogo digital público para Kódem TCG** — el juego de cartas coleccionable mexicano inspirado en la naturaleza, alebrijes y fauna endémica.

🌐 **Live:** https://ramses-dleon.github.io/Kodem/
🎮 **Tablero:** https://ramses-dleon.github.io/Kodem/board/
🎴 **Sitio oficial:** https://kodem-tcg.com
☕ **Apóyanos:** https://ko-fi.com/hule88

## Arquitectura

```
ramses-dleon.github.io/Kodem/
├── index.html ............... Catálogo de cartas (explorar, colección, mazos local)
├── board/ ................... Tablero interactivo v1 (JS engine local, sin API)
├── kg/ ...................... Knowledge Graph (kg-full.json)
├── images/ .................. 956 imágenes de cartas (.webp) — CDN para todo el ecosistema
├── data/
│   └── pipelines/ ........... Datos de pipelines por batch
├── docs/
│   ├── reglas.md ............ Reglas del juego
│   ├── pipeline-schema.json . Schema de pipelines
│   └── tag-system-v2-design.md
├── sinergias.html ........... Explorador de sinergias
├── cards.json ............... 893 cartas (sync desde Codice)
├── set-aliases.json ......... Mapeo de folios a sets
├── app.js ................... App JS (versión pública, sin auth/sync/tags/precios)
├── style.css ................ Estilos
└── sw.js .................... Service Worker
```

## Rol en el ecosistema

Este repo tiene **2 funciones**:

### 1. Catálogo público
App standalone con explorador de cartas, colección local (localStorage), deck builder básico, tablero v1. **Sin autenticación, sin backend.** Todo local en el navegador del usuario.

### 2. CDN de imágenes
**Todas las apps del ecosistema** cargan imágenes desde aquí:
```
https://ramses-dleon.github.io/Kodem/images/{folio}.webp
```
- 956 imágenes (785 originales + 108 TRWA + variantes K/R/S/U + extras)
- Codice y Lab apuntan aquí — si falta una imagen aquí, no se ve en ningún lado.

## Datos

| Archivo | Cartas | Sync |
|---------|--------|------|
| `cards.json` | 893 | ← Codice |
| `set-aliases.json` | 13 sets | ← Codice |
| `images/` | 956 imágenes | ← kodem-app |

## Diferencias con Codice Kódem

| Aspecto | GitHub Pages | Codice Kódem |
|---------|-------------|--------------|
| Auth | Ninguna | Google OAuth + Supabase |
| Backend | Ninguno | Supabase (12 tablas) |
| Cartas | 893 (sync) | 893 (fuente) |
| app.js | 156KB (100 funciones) | 336KB (196 funciones) |
| Cloud sync | No | Sí (Pull/Push) |
| Tags/Clasificación | No | Sí (6 capas) |
| Precios | No | Sí (marketplace) |
| Board | v1 (local JS) | v1 + v2 + v3 (API) |
| Deploy | `git push` (auto) | Vercel CLI |

## Reglas de sincronización

- **cards.json y set-aliases.json:** Copiar desde Codice cuando se actualizan
- **images/:** Copiar desde kodem-app cuando hay cartas nuevas
- **app.js:** Ya NO se sincroniza con Codice (divergieron demasiado, 96 funciones de diferencia)
- **Deploy:** Automático con `git push origin main`

## Contribuir

Este es un proyecto fan-made autorizado. Ver [CONTRIBUTING.md](CONTRIBUTING.md).

## Licencia

Ver [LICENSE](LICENSE).

---
_Actualizado: 2026-04-10_
