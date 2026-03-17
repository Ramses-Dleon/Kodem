// ==================== STATE ====================
let allCards = [];
let filteredCards = [];
let collection = new Set(); // Set of folio IDs
let decks = {}; // { deckId: { name, cards: [folio] } }
let currentDeck = null;

// ==================== INITIALIZATION ====================
async function init() {
    // Load cards
    try {
        const response = await fetch('cards.json');
        allCards = await response.json();
        filteredCards = [...allCards];
        console.log(`Loaded ${allCards.length} cards`);
    } catch (error) {
        console.error('Error loading cards:', error);
        allCards = [];
        filteredCards = [];
    }

    // Load from localStorage
    await loadCollection();
    loadDecks();

    // Populate filter dropdowns
    populateSetFilter();

    // Setup event listeners
    setupEventListeners();

    // Render initial view
    renderBrowser();
}

// ==================== STORAGE ====================
async function loadCollection() {
    const stored = localStorage.getItem('kodem_collection');
    if (stored) {
        collection = new Set(JSON.parse(stored));
    } else {
        // Auto-load from collection.json if no localStorage yet
        try {
            const resp = await fetch('collection.json');
            if (resp.ok) {
                const data = await resp.json();
                if (data.cards && Array.isArray(data.cards)) {
                    collection = new Set(data.cards);
                    saveCollection();
                    console.log(`Auto-imported ${data.cards.length} cards from collection.json`);
                }
            }
        } catch (e) {
            console.log('No collection.json to auto-import');
        }
    }
}

function saveCollection() {
    localStorage.setItem('kodem_collection', JSON.stringify([...collection]));
}

function exportCollection() {
    const data = {
        version: 1,
        exported: new Date().toISOString().split('T')[0],
        total: collection.size,
        cards: [...collection].sort()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kodem-coleccion-${data.exported}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

function importCollection() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            try {
                const data = JSON.parse(ev.target.result);
                let cards = [];
                if (Array.isArray(data)) {
                    cards = data;
                } else if (data.cards && Array.isArray(data.cards)) {
                    cards = data.cards;
                }
                if (cards.length === 0) {
                    alert('No se encontraron cartas en el archivo');
                    return;
                }
                const mode = confirm(
                    `Se encontraron ${cards.length} cartas.\n\nOK = Reemplazar colección\nCancelar = Agregar a existente`
                ) ? 'replace' : 'merge';
                
                if (mode === 'replace') {
                    collection = new Set(cards);
                } else {
                    cards.forEach(c => collection.add(c));
                }
                saveCollection();
                renderCollection();
                alert(`Colección actualizada: ${collection.size} cartas`);
            } catch (err) {
                alert('Error leyendo archivo: ' + err.message);
            }
        };
        reader.readAsText(file);
    };
    input.click();
}

function loadDecks() {
    const stored = localStorage.getItem('kodem_decks');
    if (stored) {
        decks = JSON.parse(stored);
    }
}

function saveDecks() {
    localStorage.setItem('kodem_decks', JSON.stringify(decks));
}

// ==================== NAVIGATION ====================
function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const view = e.target.dataset.view;
            switchView(view);
        });
    });

    // Browser filters
    document.getElementById('search-input').addEventListener('input', applyBrowserFilters);
    document.getElementById('filter-set').addEventListener('change', applyBrowserFilters);
    document.getElementById('filter-type').addEventListener('change', applyBrowserFilters);
    document.getElementById('filter-energy').addEventListener('change', applyBrowserFilters);
    document.getElementById('sort-by').addEventListener('change', applyBrowserFilters);

    // Collection filters
    document.getElementById('collection-search').addEventListener('input', renderCollection);
    document.getElementById('collection-filter').addEventListener('change', renderCollection);
    document.getElementById('clear-collection').addEventListener('click', clearCollection);
    document.getElementById('import-collection').addEventListener('click', importCollection);
    document.getElementById('export-collection').addEventListener('click', exportCollection);

    // Deck builder
    document.getElementById('new-deck-btn').addEventListener('click', createNewDeck);
    document.getElementById('save-deck-btn').addEventListener('click', saveCurrentDeck);
    document.getElementById('export-deck-btn').addEventListener('click', exportDeck);
    document.getElementById('delete-deck-btn').addEventListener('click', deleteCurrentDeck);
    document.getElementById('deck-name').addEventListener('input', updateDeckName);
    document.getElementById('deck-search').addEventListener('input', renderDeckPool);
    document.getElementById('deck-filter-energy').addEventListener('change', renderDeckPool);
    document.getElementById('deck-filter-type').addEventListener('change', renderDeckPool);

    // Modal
    document.getElementById('card-modal').addEventListener('click', (e) => {
        if (e.target.id === 'card-modal') closeModal();
    });
    document.querySelector('.modal-close').addEventListener('click', closeModal);
    document.getElementById('modal-toggle-owned').addEventListener('click', toggleOwnedFromModal);
}

function switchView(view) {
    // Update nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.view === view);
    });

    // Update views
    document.querySelectorAll('.view').forEach(v => {
        v.classList.remove('active');
    });

    const viewMap = {
        'browser': 'browser-view',
        'collection': 'collection-view',
        'deck-builder': 'deck-builder-view'
    };

    document.getElementById(viewMap[view]).classList.add('active');

    // Render appropriate view
    if (view === 'browser') renderBrowser();
    else if (view === 'collection') renderCollection();
    else if (view === 'deck-builder') renderDeckBuilder();
}

// ==================== BROWSER VIEW ====================
function populateSetFilter() {
    const sets = [...new Set(allCards.map(c => c.set))].sort();
    const select = document.getElementById('filter-set');
    sets.forEach(set => {
        const option = document.createElement('option');
        option.value = set;
        option.textContent = set;
        select.appendChild(option);
    });
}

function applyBrowserFilters() {
    const search = document.getElementById('search-input').value.toLowerCase();
    const filterSet = document.getElementById('filter-set').value;
    const filterType = document.getElementById('filter-type').value;
    const filterEnergy = document.getElementById('filter-energy').value;
    const sortBy = document.getElementById('sort-by').value;

    filteredCards = allCards.filter(card => {
        if (search && !card.name.toLowerCase().includes(search)) return false;
        if (filterSet && card.set !== filterSet) return false;
        if (filterType && card.type !== filterType) return false;
        if (filterEnergy && card.energy !== filterEnergy && card.energy2 !== filterEnergy) return false;
        return true;
    });

    // Sort
    filteredCards.sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        if (sortBy === 'damage') return (b.damage || 0) - (a.damage || 0);
        if (sortBy === 'rests') return (b.rests || 0) - (a.rests || 0);
        if (sortBy === 'set') return a.set.localeCompare(b.set);
        return 0;
    });

    renderBrowser();
}

function renderBrowser() {
    const grid = document.getElementById('card-grid');
    const count = document.getElementById('card-count');

    count.textContent = `${filteredCards.length} cartas`;

    grid.innerHTML = filteredCards.map(card => createCardElement(card)).join('');

    // Add click listeners
    grid.querySelectorAll('.card-item').forEach((el, idx) => {
        el.addEventListener('click', () => openCardModal(filteredCards[idx]));
    });
}

function createCardElement(card, small = false) {
    const owned = collection.has(card.folio) ? 'owned' : '';
    const inDeck = currentDeck && decks[currentDeck]?.cards.includes(card.folio) ? 'in-deck' : '';

    return `
        <div class="card-item ${owned} ${inDeck}" data-folio="${card.folio}">
            <img src="${card.image}" alt="${card.name}" loading="lazy" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22280%22%3E%3Crect fill=%22%23333%22 width=%22200%22 height=%22280%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 fill=%22%23666%22 text-anchor=%22middle%22 dy=%22.3em%22%3ENo Image%3C/text%3E%3C/svg%3E'" />
            <div class="card-name">${card.name}</div>
        </div>
    `;
}

// ==================== CARD MODAL ====================
function openCardModal(card) {
    const modal = document.getElementById('card-modal');

    document.getElementById('modal-card-image').src = card.image;
    document.getElementById('modal-card-name').textContent = card.name;
    document.getElementById('modal-card-folio').textContent = card.folio;
    document.getElementById('modal-card-set').textContent = card.set;
    document.getElementById('modal-card-rarity').textContent = card.rarity_variants.join(', ');
    document.getElementById('modal-card-type').textContent = card.subtype ? `${card.type} - ${card.subtype}` : card.type;

    const energies = [card.energy, card.energy2].filter(Boolean).join(' / ');
    document.getElementById('modal-card-energy').textContent = energies || 'N/A';

    document.getElementById('modal-card-damage').textContent = card.damage ?? 'N/A';
    document.getElementById('modal-card-rests').textContent = card.rests ?? 'N/A';

    document.getElementById('modal-effect-type').textContent = card.effect_type || 'Efecto';
    document.getElementById('modal-effect-text').textContent = card.effect_text || 'Sin efecto';

    if (card.cost_text) {
        document.getElementById('modal-cost-section').style.display = 'block';
        document.getElementById('modal-cost-text').textContent = card.cost_text;
    } else {
        document.getElementById('modal-cost-section').style.display = 'none';
    }

    document.getElementById('modal-flavor-text').textContent = card.flavor_text || '';
    document.getElementById('modal-species').textContent = card.species || 'N/A';
    document.getElementById('modal-artist').textContent = card.artist || 'Desconocido';

    const toggleBtn = document.getElementById('modal-toggle-owned');
    const isOwned = collection.has(card.folio);
    toggleBtn.textContent = isOwned ? 'Quitar de Colección' : 'Agregar a Colección';
    toggleBtn.dataset.folio = card.folio;

    modal.classList.add('active');
}

function closeModal() {
    document.getElementById('card-modal').classList.remove('active');
}

function toggleOwnedFromModal() {
    const folio = document.getElementById('modal-toggle-owned').dataset.folio;
    toggleOwned(folio);

    // Update modal button
    const isOwned = collection.has(folio);
    document.getElementById('modal-toggle-owned').textContent =
        isOwned ? 'Quitar de Colección' : 'Agregar a Colección';

    // Update grid if visible
    const currentView = document.querySelector('.view.active').id;
    if (currentView === 'browser-view') renderBrowser();
    else if (currentView === 'collection-view') renderCollection();
}

// ==================== COLLECTION ====================
function toggleOwned(folio) {
    if (collection.has(folio)) {
        collection.delete(folio);
    } else {
        collection.add(folio);
    }
    saveCollection();
}

function clearCollection() {
    if (confirm('¿Estás seguro de que quieres limpiar toda tu colección?')) {
        collection.clear();
        saveCollection();
        renderCollection();
    }
}

function renderCollection() {
    const search = document.getElementById('collection-search').value.toLowerCase();
    const filter = document.getElementById('collection-filter').value;

    let cards = allCards.filter(card => {
        if (search && !card.name.toLowerCase().includes(search)) return false;

        const isOwned = collection.has(card.folio);
        if (filter === 'owned' && !isOwned) return false;
        if (filter === 'missing' && isOwned) return false;

        return true;
    });

    const grid = document.getElementById('collection-grid');
    grid.innerHTML = cards.map(card => createCardElement(card)).join('');

    // Add click listeners
    grid.querySelectorAll('.card-item').forEach((el, idx) => {
        el.addEventListener('click', () => openCardModal(cards[idx]));
    });

    // Update stats
    updateCollectionStats();
}

function updateCollectionStats() {
    const total = allCards.length;
    const owned = collection.size;
    const percent = total > 0 ? Math.round((owned / total) * 100) : 0;

    document.getElementById('total-owned').textContent = `${owned} / ${total}`;
    document.getElementById('completion-percent').textContent = `${percent}%`;

    // Stats by type
    const byType = {};
    const bySet = {};

    allCards.forEach(card => {
        if (!byType[card.type]) byType[card.type] = { total: 0, owned: 0 };
        if (!bySet[card.set]) bySet[card.set] = { total: 0, owned: 0 };

        byType[card.type].total++;
        bySet[card.set].total++;

        if (collection.has(card.folio)) {
            byType[card.type].owned++;
            bySet[card.set].owned++;
        }
    });

    const typeStatsEl = document.getElementById('stats-by-type');
    typeStatsEl.innerHTML = '<h4 style="grid-column: 1/-1; margin-bottom: 0.5rem;">Por Tipo</h4>' +
        Object.entries(byType).map(([type, stats]) => `
            <div class="stat-item">
                <strong>${type}</strong>
                <span>${stats.owned} / ${stats.total}</span>
            </div>
        `).join('');

    const setStatsEl = document.getElementById('stats-by-set');
    setStatsEl.innerHTML = '<h4 style="grid-column: 1/-1; margin-bottom: 0.5rem;">Por Set</h4>' +
        Object.entries(bySet).map(([set, stats]) => `
            <div class="stat-item">
                <strong>${set}</strong>
                <span>${stats.owned} / ${stats.total}</span>
            </div>
        `).join('');
}

// ==================== DECK BUILDER ====================
function createNewDeck() {
    const id = Date.now().toString();
    const name = `Mazo ${Object.keys(decks).length + 1}`;

    decks[id] = {
        name,
        cards: []
    };

    currentDeck = id;
    saveDecks();
    renderDeckBuilder();
}

function saveCurrentDeck() {
    if (!currentDeck) {
        alert('No hay mazo seleccionado');
        return;
    }

    saveDecks();
    alert('Mazo guardado correctamente');
    renderDeckList();
}

function deleteCurrentDeck() {
    if (!currentDeck) return;

    if (confirm(`¿Eliminar el mazo "${decks[currentDeck].name}"?`)) {
        delete decks[currentDeck];
        currentDeck = null;
        saveDecks();
        renderDeckBuilder();
    }
}

function updateDeckName() {
    if (!currentDeck) return;

    const name = document.getElementById('deck-name').value;
    decks[currentDeck].name = name;
}

function exportDeck() {
    if (!currentDeck) return;

    const deck = decks[currentDeck];
    const cards = deck.cards.map(folio => {
        const card = allCards.find(c => c.folio === folio);
        return card ? `1x ${card.name} (${card.folio})` : folio;
    });

    const text = `${deck.name}\n\n${cards.join('\n')}\n\nTotal: ${deck.cards.length} cartas`;

    // Copy to clipboard
    navigator.clipboard.writeText(text).then(() => {
        alert('Mazo copiado al portapapeles');
    }).catch(() => {
        // Fallback: show in alert
        prompt('Copia este texto:', text);
    });
}

function renderDeckBuilder() {
    renderDeckList();
    renderDeckWorkspace();
    renderDeckPool();
}

function renderDeckList() {
    const container = document.getElementById('saved-decks');

    container.innerHTML = Object.entries(decks).map(([id, deck]) => `
        <div class="deck-item ${currentDeck === id ? 'active' : ''}" data-deck-id="${id}">
            ${deck.name} (${deck.cards.length})
        </div>
    `).join('');

    // Add click listeners
    container.querySelectorAll('.deck-item').forEach(el => {
        el.addEventListener('click', () => {
            currentDeck = el.dataset.deckId;
            renderDeckBuilder();
        });
    });
}

function renderDeckWorkspace() {
    if (!currentDeck) {
        document.getElementById('deck-name').value = '';
        document.getElementById('deck-cards').innerHTML = '<p class="empty-state">Crea o selecciona un mazo</p>';
        return;
    }

    const deck = decks[currentDeck];
    document.getElementById('deck-name').value = deck.name;

    // Render deck cards
    const deckCardsEl = document.getElementById('deck-cards');
    if (deck.cards.length === 0) {
        deckCardsEl.innerHTML = '<p class="empty-state">Agrega cartas a tu mazo desde la galería de abajo</p>';
    } else {
        const cards = deck.cards.map(folio => allCards.find(c => c.folio === folio)).filter(Boolean);
        deckCardsEl.innerHTML = cards.map(card => {
            return `
                <div class="card-item small" data-folio="${card.folio}">
                    <img src="${card.image}" alt="${card.name}" loading="lazy" />
                    <button class="remove-from-deck" data-folio="${card.folio}" style="position: absolute; top: 2px; right: 2px; background: var(--accent-crimson); color: white; border: none; border-radius: 50%; width: 20px; height: 20px; cursor: pointer; font-size: 12px;">×</button>
                </div>
            `;
        }).join('');

        // Add remove listeners
        deckCardsEl.querySelectorAll('.remove-from-deck').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                removeFromDeck(btn.dataset.folio);
            });
        });

        // Add view listeners
        deckCardsEl.querySelectorAll('.card-item').forEach((el, idx) => {
            el.addEventListener('click', () => openCardModal(cards[idx]));
        });
    }

    // Update validation
    updateDeckValidation();
}

function updateDeckValidation() {
    if (!currentDeck) return;

    const deck = decks[currentDeck];
    const cards = deck.cards.map(folio => allCards.find(c => c.folio === folio)).filter(Boolean);

    const counts = {
        Adendei: 0,
        Protector: 0,
        Rava: 0,
        Bio: 0,
        Ixim: 0,
        Rot: 0
    };

    const energyDist = {};
    let totalDamage = 0;
    let totalRests = 0;
    let damageCount = 0;
    let restsCount = 0;

    cards.forEach(card => {
        counts[card.type] = (counts[card.type] || 0) + 1;

        if (card.energy) {
            energyDist[card.energy] = (energyDist[card.energy] || 0) + 1;
        }
        if (card.energy2) {
            energyDist[card.energy2] = (energyDist[card.energy2] || 0) + 1;
        }

        if (card.damage != null) {
            totalDamage += card.damage;
            damageCount++;
        }
        if (card.rests != null) {
            totalRests += card.rests;
            restsCount++;
        }
    });

    const total = deck.cards.length;
    const equipo = counts.Ixim + counts.Rot;

    // Update validation UI
    updateValidationItem('val-adendei', counts.Adendei, 15, 24);
    updateValidationItem('val-protector', counts.Protector, 1, 2);
    updateValidationItem('val-rava', counts.Rava, 0, 2);
    updateValidationItem('val-bio', counts.Bio, 0, 1);
    updateValidationItem('val-equipo', equipo, 0, 10);

    document.querySelector('#val-total .count').textContent = total;

    // Energy distribution
    const energyEl = document.getElementById('energy-distribution');
    energyEl.innerHTML = Object.entries(energyDist)
        .sort((a, b) => b[1] - a[1])
        .map(([energy, count]) => `
            <span class="energy-badge">${energy}: ${count}</span>
        `).join('');

    // Averages
    document.getElementById('avg-damage').textContent =
        damageCount > 0 ? (totalDamage / damageCount).toFixed(1) : '0';
    document.getElementById('avg-rests').textContent =
        restsCount > 0 ? (totalRests / restsCount).toFixed(1) : '0';
}

function updateValidationItem(id, count, min, max) {
    const el = document.getElementById(id);
    const countEl = el.querySelector('.count');
    countEl.textContent = count;

    if (count >= min && count <= max) {
        el.classList.add('valid');
        el.classList.remove('invalid');
    } else {
        el.classList.add('invalid');
        el.classList.remove('valid');
    }
}

function addToDeck(folio) {
    if (!currentDeck) {
        alert('Selecciona o crea un mazo primero');
        return;
    }

    const deck = decks[currentDeck];

    // Check if already in deck
    if (deck.cards.includes(folio)) {
        alert('Esta carta ya está en el mazo. Solo se permite 1 copia de cada carta.');
        return;
    }

    deck.cards.push(folio);
    renderDeckWorkspace();
    renderDeckPool();
}

function removeFromDeck(folio) {
    if (!currentDeck) return;

    const deck = decks[currentDeck];
    deck.cards = deck.cards.filter(f => f !== folio);

    renderDeckWorkspace();
    renderDeckPool();
}

function renderDeckPool() {
    const search = document.getElementById('deck-search').value.toLowerCase();
    const filterEnergy = document.getElementById('deck-filter-energy').value;
    const filterType = document.getElementById('deck-filter-type').value;

    let cards = allCards.filter(card => {
        if (search && !card.name.toLowerCase().includes(search)) return false;
        if (filterEnergy && card.energy !== filterEnergy && card.energy2 !== filterEnergy) return false;
        if (filterType && card.type !== filterType) return false;
        return true;
    });

    const grid = document.getElementById('deck-pool-grid');
    grid.innerHTML = cards.map(card => createCardElement(card, true)).join('');

    // Add click listeners to add to deck
    grid.querySelectorAll('.card-item').forEach((el, idx) => {
        el.addEventListener('click', () => {
            addToDeck(cards[idx].folio);
        });
    });
}

// ==================== START APP ====================
init();
