# Contribuir al Kódem TCG Companion

¡Gracias por tu interés! Este es un proyecto fan-made para la comunidad de Kódem TCG.

## 🐛 Reportar errores

Si encuentras un error en los datos de una carta (nombre, energía, daño, efecto, imagen):

1. Abre un **Issue** con el folio de la carta (ej: `LGRO-001`)
2. Describe qué está mal y cuál es el valor correcto
3. Si puedes, adjunta foto de la carta física

## 💡 Sugerir features

Abre un Issue con la etiqueta `feature` describiendo:
- Qué quieres que haga
- Por qué sería útil para jugadores de Kódem
- Si tienes referencia de otros TCG companions que lo hagan

## 📊 Datos de cartas nuevas

Cuando salgan nuevas expansiones:
1. Las cartas se agregan a `cards.json`
2. Las imágenes van en `images/SET/FOLIO.webp`
3. El schema está documentado en el README

## 🔧 Código

El proyecto es vanilla HTML/CSS/JS sin dependencias:
- `index.html` — estructura
- `style.css` — estilos (dark/light theme, responsive)
- `app.js` — toda la lógica (~1800 líneas)
- `cards.json` — base de datos de cartas
- `set-aliases.json` — nombres completos de sets
- `sinergias.html` — mapa de sinergias (standalone)

Para desarrollo local:
```bash
python3 -m http.server 8787
```

## 📏 Convenciones

- **Mobile-first**: todo debe funcionar en 412×915
- **Touch targets**: mínimo 44×44px
- **Español**: toda la UI en español
- **Sin build tools**: el proyecto debe funcionar abriendo index.html
- **localStorage only**: sin backend, sin cuentas, sin tracking

## ⚖️ Legal

Este proyecto no está afiliado con Adendei Entretenimiento. No subas contenido que infrinja copyright más allá del uso fair-use para companion tools.
