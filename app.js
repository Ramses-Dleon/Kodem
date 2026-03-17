// ==================== STATE ====================
let allCards = [];
let filteredCards = [];
let collection = new Set(); // Set of folio IDs
let decks = {}; // { deckId: { name, cards: [folio] } }
let currentDeck = null;
let setAliases = {}; // { alias: canonicalCode } e.g. { "TRWA": "LGRO" }
let setMetadata = []; // Full set info from set-aliases.json

// ==================== UI UTILITIES ====================

/**
 * Debounce — waits `waitMs` after the last call before executing fn.
 */
function debounce(fn, waitMs = 300) {
    let timer;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), waitMs);
    };
}

/**
 * Show a non-blocking toast notification.
 * @param {string} message
 * @param {'success'|'error'|'info'|''} type
 * @param {number} durationMs
 */
function showToast(message, type = '', durationMs = 3000) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast${type ? ' ' + type : ''}`;
    toast.textContent = message;
    container.appendChild(toast);

    // Trigger slide-in transition on next frame
    requestAnimationFrame(() => {
        requestAnimationFrame(() => toast.classList.add('show'));
    });

    setTimeout(() => {
        toast.classList.remove('show');
        toast.addEventListener('transitionend', () => toast.remove(), { once: true });
    }, durationMs);
}

/**
 * Show a promise-based confirm dialog.
 * Resolves to true (confirmed) or false (cancelled).
 */
function showConfirm(message) {
    return new Promise((resolve) => {
        const overlay = document.createElement('div');
        overlay.className = 'confirm-dialog-overlay';
        overlay.innerHTML = `
            <div class="confirm-dialog" role="alertdialog" aria-modal="true">
                <p>${message}</p>
                <div class="confirm-dialog-actions">
                    <button class="btn-danger" id="confirm-yes">Confirmar</button>
                    <button class="btn-secondary" id="confirm-no">Cancelar</button>
                </div>
            </div>`;
        document.body.appendChild(overlay);

        const cleanup = (result) => { overlay.remove(); resolve(result); };
        overlay.querySelector('#confirm-yes').addEventListener('click', () => cleanup(true));
        overlay.querySelector('#confirm-no').addEventListener('click', () => cleanup(false));
        overlay.querySelector('#confirm-no').focus();
    });
}

/**
 * Show a promise-based choice dialog with named options.
 * Resolves to the chosen option key, or null if no option selected.
 * @param {string} message
 * @param {Array<{label:string, key:string, className:string}>} options
 */
function showChoice(message, options) {
    return new Promise((resolve) => {
        const overlay = document.createElement('div');
        overlay.className = 'confirm-dialog-overlay';
        const btns = options.map(o =>
            `<button class="${o.className}" data-key="${o.key}">${o.label}</button>`
        ).join('');
        overlay.innerHTML = `
            <div class="confirm-dialog" role="alertdialog" aria-modal="true">
                <p>${message}</p>
                <div class="confirm-dialog-actions">${btns}</div>
            </div>`;
        document.body.appendChild(overlay);

        overlay.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', () => {
                overlay.remove();
                resolve(btn.dataset.key);
            });
        });
        overlay.querySelector('button').focus();
    });
}

// ==================== INITIALIZATION ====================
async function init() {
    // Load set aliases first
    try {
        const aliasResp = await fetch('set-aliases.json');
        if (aliasResp.ok) {
            const aliasData = await aliasResp.json();
            setMetadata = aliasData.sets || [];
            // Build alias lookup: every alias → canonical code
            for (const set of setMetadata) {
                for (const alias of (set.aliases || [])) {
                    setAliases[alias.toUpperCase()] = set.code;
                }
            }
            // Add explicit alias_lookup entries
            if (aliasData._alias_lookup) {
                for (const [alias, code] of Object.entries(aliasData._alias_lookup)) {
                    setAliases[alias.toUpperCase()] = code;
                }
            }
            console.log(`Loaded ${Object.keys(setAliases).length} set aliases`);
        }
    } catch (e) {
        console.log('No set-aliases.json found');
    }

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
                    collection = new Set(data.cards.map(c => resolveFolio(c)));
                    saveCollection();
                    console.log(`Auto-imported ${collection.size} cards from collection.json`);
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

// Resolve a folio like "TRWA-042" → "LGRO-042" using set aliases
function resolveFolio(folio) {
    if (!folio || typeof folio !== 'string') return folio;
    const match = folio.match(/^([A-Za-z]+)-(.+)$/);
    if (!match) return folio;
    const setCode = match[1].toUpperCase();
    const cardNum = match[2];
    const canonical = setAliases[setCode] || setCode;
    return `${canonical}-${cardNum}`;
}

// Get set info (names, type) for a code or alias
function getSetInfo(codeOrAlias) {
    const canonical = setAliases[(codeOrAlias || '').toUpperCase()] || codeOrAlias;
    return setMetadata.find(s => s.code === canonical) || null;
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
        reader.onload = async (ev) => {
            try {
                const data = JSON.parse(ev.target.result);
                let cards = [];
                if (Array.isArray(data)) {
                    cards = data;
                } else if (data.cards && Array.isArray(data.cards)) {
                    cards = data.cards;
                }
                if (cards.length === 0) {
                    showToast('No se encontraron cartas en el archivo', 'error');
                    return;
                }
                const mode = await showChoice(
                    `Se encontraron ${cards.length} cartas. ¿Qué deseas hacer?`,
                    [
                        { label: '🔄 Reemplazar colección', key: 'replace', className: 'btn-danger' },
                        { label: '➕ Agregar a existente',  key: 'merge',   className: 'btn-primary' },
                    ]
                );
                if (!mode) return;

                // Resolve aliases (e.g. TRWA-042 → LGRO-042)
                const resolvedCards = cards.map(c => resolveFolio(c));
                if (mode === 'replace') {
                    collection = new Set(resolvedCards);
                } else {
                    resolvedCards.forEach(c => collection.add(c));
                }
                saveCollection();
                renderCollection();
                showToast(`Colección actualizada: ${collection.size} cartas ✅`, 'success');
            } catch (err) {
                showToast('Error leyendo archivo: ' + err.message, 'error');
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

    // Browser filters — debounce text input, instant on selects
    document.getElementById('search-input').addEventListener('input', debounce(applyBrowserFilters, 300));
    document.getElementById('filter-set').addEventListener('change', applyBrowserFilters);
    document.getElementById('filter-type').addEventListener('change', applyBrowserFilters);
    document.getElementById('filter-energy').addEventListener('change', applyBrowserFilters);
    document.getElementById('sort-by').addEventListener('change', applyBrowserFilters);

    // Collection filters — debounce text input
    document.getElementById('collection-search').addEventListener('input', debounce(renderCollection, 300));
    document.getElementById('collection-filter').addEventListener('change', renderCollection);
    document.getElementById('clear-collection').addEventListener('click', clearCollection);
    document.getElementById('import-collection').addEventListener('click', importCollection);
    document.getElementById('export-collection').addEventListener('click', exportCollection);

    // Dashboard toggle (Fix 4)
    const toggleDashBtn = document.getElementById('toggle-dashboard');
    if (toggleDashBtn) {
        // Restore saved state
        const savedHidden = localStorage.getItem('kodem_dashboard_hidden') === 'true';
        const dash = document.getElementById('collection-dashboard');
        if (savedHidden && dash) {
            dash.style.display = 'none';
            toggleDashBtn.textContent = '📊 Ver Dashboard';
        }
        toggleDashBtn.addEventListener('click', () => {
            const dashEl = document.getElementById('collection-dashboard');
            const isHidden = dashEl.style.display === 'none';
            dashEl.style.display = isHidden ? '' : 'none';
            toggleDashBtn.textContent = isHidden ? '📊 Ocultar Dashboard' : '📊 Ver Dashboard';
            localStorage.setItem('kodem_dashboard_hidden', !isHidden);
        });
    }

    // Deck builder
    document.getElementById('new-deck-btn').addEventListener('click', createNewDeck);
    document.getElementById('save-deck-btn').addEventListener('click', saveCurrentDeck);
    document.getElementById('export-deck-btn').addEventListener('click', exportDeck);
    document.getElementById('delete-deck-btn').addEventListener('click', deleteCurrentDeck);
    document.getElementById('deck-name').addEventListener('input', updateDeckName);
    document.getElementById('deck-search').addEventListener('input', debounce(renderDeckPool, 300));
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

async function clearCollection() {
    const confirmed = await showConfirm('¿Estás seguro de que quieres limpiar toda tu colección?');
    if (confirmed) {
        collection.clear();
        saveCollection();
        renderCollection();
        showToast('Colección limpiada 🗑️', 'info');
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

    // Update dashboard
    renderDashboard();
}

// updateCollectionStats is now handled by renderDashboard()
function updateCollectionStats() {
    renderDashboard();
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
        showToast('No hay mazo seleccionado', 'error');
        return;
    }

    saveDecks();
    showToast('Mazo guardado correctamente ✅', 'success');
    renderDeckList();
}

async function deleteCurrentDeck() {
    if (!currentDeck) return;

    const confirmed = await showConfirm(`¿Eliminar el mazo "${decks[currentDeck].name}"?`);
    if (confirmed) {
        const name = decks[currentDeck].name;
        delete decks[currentDeck];
        currentDeck = null;
        saveDecks();
        renderDeckBuilder();
        showToast(`Mazo "${name}" eliminado`, 'info');
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
        showToast('Mazo copiado al portapapeles 📋', 'success');
    }).catch(() => {
        showToast('No se pudo copiar al portapapeles', 'error');
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
        showToast('Selecciona o crea un mazo primero', 'error');
        return;
    }

    const deck = decks[currentDeck];

    // Check if already in deck
    if (deck.cards.includes(folio)) {
        showToast('Esta carta ya está en el mazo. Solo se permite 1 copia de cada carta.', 'error');
        return;
    }

    deck.cards.push(folio);
    const card = allCards.find(c => c.folio === folio);
    if (card) showToast(`${card.name} añadida al mazo`, 'success', 1500);
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

// ==================== COLLECTION DASHBOARD ====================

// Rarity config: folio suffix → display info
const RARITY_CONFIG = [
    { suffix: 'R',  label: 'Rara',       emoji: '💎', color: '#60a5fa' },
    { suffix: 'S',  label: 'Súper Rara', emoji: '⭐', color: '#a78bfa' },
    { suffix: 'U',  label: 'Ultra Rara', emoji: '🌟', color: '#f59e0b' },
    { suffix: 'K',  label: 'Kósmica',    emoji: '👑', color: '#f97316' },
    { suffix: 'UV', label: 'UV',         emoji: '✨', color: '#34d399' },
];

/**
 * Determine if a folio is a base card or a variant.
 * Returns '' for base, or the suffix string (R, S, U, K, UV).
 */
function getFolioSuffix(folio) {
    if (!folio) return '';
    const m = folio.match(/^[A-Z0-9]+-\d+([A-Z]*)$/);
    if (!m) return '';
    return m[1]; // '' = base, 'R' = Rara, etc.
}

/**
 * Compute set-level completion data using setMetadata and cards.json.
 * Returns array of { code, name, total, owned, missing[] }
 * sorted by pct desc.
 */
function computeSetStats() {
    // Build per-set data from cards.json (base cards only)
    const setData = {}; // code → { total, ownedSet: Set of folios, cards: [] }

    for (const card of allCards) {
        const code = card.set;
        if (!setData[code]) {
            setData[code] = { total: 0, ownedFolios: new Set(), cards: [] };
        }
        setData[code].total++;
        setData[code].cards.push(card);
        if (collection.has(card.folio)) {
            setData[code].ownedFolios.add(card.folio);
        }
    }

    // Build result with display names from setMetadata
    const result = [];
    for (const [code, data] of Object.entries(setData)) {
        const meta = setMetadata.find(s => s.code === code);
        const name = meta ? (meta.name_es || meta.name_en || code) : code;
        const owned = data.ownedFolios.size;
        const total = data.total;
        const missing = data.cards
            .filter(c => !collection.has(c.folio))
            .map(c => c.folio);

        result.push({ code, name, total, owned, missing });
    }

    result.sort((a, b) => {
        const pa = a.total > 0 ? a.owned / a.total : 0;
        const pb = b.total > 0 ? b.owned / b.total : 0;
        return pb - pa;
    });

    return result;
}

/** Render the circular progress ring in the hero section */
function renderHeroRing(pct) {
    const circumference = 2 * Math.PI * 50; // 314.16
    const offset = circumference - (pct / 100) * circumference;
    const fill = document.getElementById('hero-ring-fill');
    if (fill) {
        fill.style.strokeDashoffset = offset;
        // Color based on pct
        if (pct >= 100) fill.style.stroke = '#10b981';
        else if (pct >= 50) fill.style.stroke = '#f59e0b';
        else fill.style.stroke = '#ef4444';
    }
    const heroLbl = document.getElementById('hero-pct');
    if (heroLbl) heroLbl.textContent = pct + '%';
}

/** Render set completion horizontal bars */
function renderSetCompletionChart(setStats) {
    const container = document.getElementById('set-completion-chart');
    if (!container) return;

    const complete = setStats.filter(s => s.total > 0 && s.owned === s.total);
    const inProgress = setStats.filter(s => s.total > 0 && s.owned > 0 && s.owned < s.total);
    const notStarted = setStats.filter(s => s.total > 0 && s.owned === 0);

    let html = '';

    function renderGroup(label, sets) {
        if (sets.length === 0) return '';
        let g = `<div class="set-group-header">${label}</div>`;
        for (const s of sets) {
            const pct = Math.round((s.owned / s.total) * 100);
            let fillClass = pct >= 100 ? 'complete' : pct >= 50 ? 'good' : 'poor';
            g += `
                <div class="set-bar-row">
                    <div class="set-bar-name" title="${s.name} (${s.code})">${s.name}</div>
                    <div class="set-bar-track">
                        <div class="set-bar-fill ${fillClass}" style="width:${pct}%"></div>
                    </div>
                    <div class="set-bar-count">${s.owned}/${s.total}</div>
                </div>`;
        }
        return g;
    }

    html += renderGroup('Sets Completos ✅', complete);
    html += renderGroup('En Progreso 🔄', inProgress);
    html += renderGroup('Sin Iniciar ❌', notStarted);

    container.innerHTML = html || '<p class="empty-state">No hay datos de sets</p>';
}

/** Render rarity donut chart (pure CSS conic-gradient) */
function renderRarityDonut() {
    const donut = document.getElementById('rarity-donut');
    const legend = document.getElementById('rarity-legend');
    if (!donut || !legend) return;

    // Count variants in the collection by suffix
    const counts = {};
    for (const rc of RARITY_CONFIG) counts[rc.suffix] = 0;

    for (const folio of collection) {
        const suffix = getFolioSuffix(folio);
        if (suffix && counts.hasOwnProperty(suffix)) {
            counts[suffix]++;
        }
    }

    const total = Object.values(counts).reduce((a, b) => a + b, 0);

    if (total === 0) {
        donut.style.background = 'var(--bg-darker)';
        legend.innerHTML = '<p style="color:var(--text-secondary);font-size:0.85rem">Sin variantes en colección</p>';
        return;
    }

    // Build conic-gradient segments
    let gradientParts = [];
    let currentAngle = 0;
    let legendHtml = '';

    for (const rc of RARITY_CONFIG) {
        const count = counts[rc.suffix];
        if (count === 0) continue;
        const deg = (count / total) * 360;
        gradientParts.push(`${rc.color} ${currentAngle.toFixed(1)}deg ${(currentAngle + deg).toFixed(1)}deg`);
        currentAngle += deg;

        const pct = ((count / total) * 100).toFixed(1);
        legendHtml += `
            <div class="rarity-legend-item">
                <div class="rarity-legend-dot" style="background:${rc.color}"></div>
                <span class="rarity-legend-name">${rc.emoji} ${rc.label}</span>
                <span class="rarity-legend-count">${count} <small style="color:var(--text-secondary)">(${pct}%)</small></span>
            </div>`;
    }

    donut.style.background = `conic-gradient(${gradientParts.join(', ')})`;
    legend.innerHTML = legendHtml;
}

/** Render missing cards accordion per set */
function renderMissingCardsAccordion(setStats) {
    const container = document.getElementById('missing-cards-accordion');
    if (!container) return;

    // Only show sets that have cards
    const setsWithCards = setStats.filter(s => s.total > 0);
    // Sort: sets with missing cards first (most missing first), then complete sets
    const withMissing = setsWithCards.filter(s => s.missing.length > 0)
        .sort((a, b) => b.missing.length - a.missing.length);
    const complete = setsWithCards.filter(s => s.missing.length === 0);

    const all = [...withMissing, ...complete];

    let html = '';
    for (const s of all) {
        const missingCount = s.missing.length;
        const badgeClass = missingCount === 0 ? 'zero' : '';
        const badgeText = missingCount === 0 ? '¡Completo! ✅' : `${missingCount} faltantes`;

        const chipsHtml = missingCount === 0
            ? '<span class="missing-empty">¡Tienes todas las cartas de este set! 🎉</span>'
            : s.missing.map(f => `<span class="missing-card-chip">${f}</span>`).join('');

        html += `
            <div class="missing-set-section" data-set="${s.code}">
                <div class="missing-set-header" onclick="toggleMissingSet(this)">
                    <span class="missing-set-title">Te faltan ${missingCount} cartas de ${s.name} (${s.code})</span>
                    <div style="display:flex;align-items:center;gap:0.5rem">
                        <span class="missing-set-badge ${badgeClass}">${badgeText}</span>
                        <span class="missing-set-chevron">▼</span>
                    </div>
                </div>
                <div class="missing-set-body">
                    <div class="missing-cards-grid">${chipsHtml}</div>
                </div>
            </div>`;
    }

    container.innerHTML = html || '<p class="empty-state">Sin datos disponibles</p>';
}

function toggleMissingSet(headerEl) {
    const section = headerEl.closest('.missing-set-section');
    if (section) section.classList.toggle('open');
}

/** Update quick stat cards */
function renderQuickStats(setStats) {
    // Complete sets (from cards.json sets only)
    const completeSets = setStats.filter(s => s.total > 0 && s.owned === s.total);
    const incompleteSets = setStats.filter(s => s.total > 0 && s.owned > 0 && s.owned < s.total);
    const withMissing = setStats.filter(s => s.total > 0 && s.owned < s.total);

    const qsComplete = document.getElementById('qs-complete-sets');
    if (qsComplete) qsComplete.textContent = completeSets.length;

    const qsBest = document.getElementById('qs-best-incomplete');
    if (qsBest) {
        if (incompleteSets.length > 0) {
            const best = incompleteSets[0]; // already sorted by pct desc
            const pct = Math.round((best.owned / best.total) * 100);
            qsBest.textContent = `${best.code} (${pct}%)`;
        } else {
            qsBest.textContent = '—';
        }
    }

    const qsMissing = document.getElementById('qs-most-missing');
    if (qsMissing) {
        if (withMissing.length > 0) {
            const worst = withMissing.reduce((a, b) => b.missing.length > a.missing.length ? b : a);
            qsMissing.textContent = `${worst.code} (${worst.missing.length})`;
        } else {
            qsMissing.textContent = '—';
        }
    }

    const qsDate = document.getElementById('qs-last-updated');
    if (qsDate) {
        const today = new Date();
        qsDate.textContent = today.toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' });
    }
}

/** Main function: render the full dashboard */
function renderDashboard() {
    const setStats = computeSetStats();

    // Count base vs variant in collection
    let baseOwned = 0;
    let variantOwned = 0;
    for (const folio of collection) {
        const suffix = getFolioSuffix(folio);
        if (suffix === '') baseOwned++;
        else variantOwned++;
    }

    // Total base cards in cards.json
    const totalBase = allCards.length;

    // Total variants from cards.json rarity_variants field
    // Each card can have variants (R, S, U, K) — count them
    let totalVariants = 0;
    for (const card of allCards) {
        const rv = card.rarity_variants || [];
        totalVariants += rv.length;
    }
    // Also count UV cards (folio ends in UV) in cards.json
    for (const card of allCards) {
        if (getFolioSuffix(card.folio) === 'UV') totalVariants++;
    }

    const totalAll = collection.size;
    const totalCards = totalBase + totalVariants;
    const pctAll = totalCards > 0 ? Math.round((totalAll / totalCards) * 100) : 0;
    const pctBase = totalBase > 0 ? Math.round((baseOwned / totalBase) * 100) : 0;

    // Hero stats
    const heroEl = document.getElementById('total-owned');
    if (heroEl) heroEl.textContent = `${totalAll} / ${totalCards}`;

    const baseEl = document.getElementById('base-owned');
    if (baseEl) baseEl.textContent = `${baseOwned} / ${totalBase}`;

    const varEl = document.getElementById('variants-owned');
    if (varEl) varEl.textContent = `${variantOwned} / ${totalVariants}`;

    const pctEl = document.getElementById('completion-percent');
    if (pctEl) pctEl.textContent = `${pctBase}%`;

    renderHeroRing(pctBase);
    renderQuickStats(setStats);
    renderSetCompletionChart(setStats);
    renderRarityDonut();
    renderMissingCardsAccordion(setStats);
}

// ==================== START APP ====================
init();
