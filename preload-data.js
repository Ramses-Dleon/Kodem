/**
 * Kódem Companion — Ramsés' Persistent Data Preloader
 * Pre-loads collection and 12 decks into localStorage on first visit.
 * Data survives across sessions (same browser/domain).
 */
(function() {
  // Only preload if no collection exists yet
  if (localStorage.getItem('kodem_collection') && localStorage.getItem('kodem_decks')) {
    console.log('[Preload] Data already present, skipping');
    return;
  }

  console.log('[Preload] Loading Ramsés collection + 12 decks...');

  fetch('ramses-collection.json')
    .then(r => r.json())
    .then(data => {
      // Collection: array of folios
      if (data.cards) {
        localStorage.setItem('kodem_collection', JSON.stringify(data.cards));
        console.log('[Preload] Collection loaded:', data.cards.length, 'cards');
      }
    })
    .catch(e => console.warn('[Preload] Collection load failed:', e));

  fetch('ramses-decks.json')
    .then(r => r.json())
    .then(rawDecks => {
      // Convert to webapp format: { deckId: { name, cards: [folio] } }
      const webDecks = {};
      Object.entries(rawDecks).forEach(([id, d]) => {
        const cards = [...d.mazo, d.protector, d.bio, ...d.equips];
        webDecks[id] = { name: d.name, cards };
      });
      localStorage.setItem('kodem_decks', JSON.stringify(webDecks));
      console.log('[Preload] Decks loaded:', Object.keys(webDecks).length, 'decks');
    })
    .catch(e => console.warn('[Preload] Decks load failed:', e));
})();
