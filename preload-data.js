/**
 * Kódem Companion — Ramsés' Persistent Data Preloader + Updater
 * Pre-loads collection and decks on first visit.
 * Update button syncs server data without wiping local changes.
 */
(function() {
  function loadServerData(silent) {
    let loaded = 0;
    if (!silent) console.log('[Update] Fetching server data...');

    fetch('ramses-collection.json?t=' + Date.now())
      .then(r => r.json())
      .then(data => {
        if (data.cards) {
          localStorage.setItem('kodem_collection', JSON.stringify(data.cards));
          loaded++;
          if (!silent) console.log('[Update] Collection:', data.cards.length, 'cards');
        }
      })
      .catch(e => console.warn('[Update] Collection failed:', e))
      .finally(() => checkDone());

    fetch('ramses-decks.json?t=' + Date.now())
      .then(r => r.json())
      .then(rawDecks => {
        // Merge: keep user's custom decks, update server decks
        const existing = JSON.parse(localStorage.getItem('kodem_decks') || '{}');
        const serverKeys = new Set();
        Object.entries(rawDecks).forEach(([id, d]) => {
          const cards = [...d.mazo, d.protector, d.bio, ...d.equips];
          existing[id] = { name: d.name, cards };
          serverKeys.add(id);
        });
        localStorage.setItem('kodem_decks', JSON.stringify(existing));
        loaded++;
        if (!silent) console.log('[Update] Decks:', serverKeys.size, 'updated,', Object.keys(existing).length, 'total');
      })
      .catch(e => console.warn('[Update] Decks failed:', e))
      .finally(() => checkDone());

    function checkDone() {
      if (loaded >= 2 && !silent) {
        console.log('[Update] Done.');
        // Reload views if app is loaded
        if (typeof loadDecks === 'function') loadDecks();
        if (typeof loadCollection === 'function') loadCollection();
        if (typeof renderCurrentView === 'function') renderCurrentView();
      }
    }
  }

  // Auto-load on first visit
  if (!localStorage.getItem('kodem_collection') || !localStorage.getItem('kodem_decks')) {
    console.log('[Preload] First visit — loading data...');
    loadServerData(true);
  }

  // Expose for update button
  window.kodemUpdate = function() { loadServerData(false); };

  // Wire up header update button
  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('update-btn');
    if (btn) {
      btn.style.display = '';
      btn.onclick = () => {
        btn.textContent = '⏳';
        window.kodemUpdate();
        setTimeout(() => { btn.textContent = '🔄'; }, 2500);
      };
    }
  });
})();
