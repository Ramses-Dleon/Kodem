# Kódem TCG Companion

A single-page web application for managing your Kódem Trading Card Game collection and building decks.

## Features

### Card Browser
- Browse all 786 cards with images
- Filter by set, type, energy, and subtype
- Search by name
- Sort by name, damage, rests, or set
- Click any card for detailed view with full stats and artwork

### My Collection
- Track which cards you own
- Collection statistics (total owned, completion percentage)
- Stats breakdown by type and set
- Filter to show only owned or missing cards
- Persistent storage using localStorage

### Deck Builder
- Create, save, and manage multiple decks
- Automatic deck validation for Formato Estándar:
  - 15-24 Adendei
  - 1-2 Protector
  - 0-2 Rava
  - 0-1 Bio
  - 0-10 Equipo total (Ixim + Rot)
  - Only 1 copy per card
- Visual deck composition with energy distribution
- Calculate average damage and rests
- Export deck as text list
- Persistent storage using localStorage

## Setup

1. Copy or symlink the `kodem-cartas` directory into this folder:
   ```bash
   ln -s ~/workspace/kodem-cartas ./kodem-cartas
   ```

2. Copy the generated `all-cards.json` from `~/workspace/kodem-cartas/data/` to this directory as `cards.json`:
   ```bash
   cp ~/workspace/kodem-cartas/data/all-cards.json ./cards.json
   ```

3. Open `index.html` in a web browser, or serve with a simple HTTP server:
   ```bash
   python3 -m http.server 8000
   # or
   npx serve
   ```

## Card Data Schema

The app expects `cards.json` with the following structure:

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
  "effect_text": "...",
  "cost_text": null,
  "flavor_text": "...",
  "species": "Cyclura lewisi",
  "artist": "Attoz",
  "rarity_variants": ["K", "R", "S", "U"],
  "image": "kodem-cartas/LGRO/LGRO-001.webp"
}
```

## Technology

- Pure HTML/CSS/JavaScript (no build tools required)
- Dark theme with Mexican TCG aesthetic
- Responsive design (works on mobile)
- Lazy-loaded images for performance
- localStorage for persistence

## Deck Format Rules (Formato Estándar)

- **Adendei**: 15-24 cards (main creatures)
- **Protector**: 1-2 cards
- **Rava**: 0-2 cards (spells)
- **Bio**: 0-1 card (field card)
- **Equipo** (Ixim + Rot): 0-10 total (equipment)
- **Duplicates**: Only 1 copy of each card allowed

## Browser Compatibility

Works in all modern browsers that support:
- ES6+ JavaScript
- CSS Grid
- localStorage
- Fetch API
