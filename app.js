// ==================== STATE ====================
let allCards = [];
let filteredCards = [];
let collection = new Set(); // Set of folio IDs
let decks = {}; // { deckId: { name, cards: [folio] } }
let currentDeck = null;
let setAliases = {}; // { alias: canonicalCode } e.g. { "TRWA": "LGRO" }
let setMetadata = []; // Full set info from set-aliases.json

// ==================== PAGINATION STATE ====================
const PAGE_SIZE = 50;
let currentPage = 1;    // 1-indexed
let totalFiltered = 0;

// ==================== GRID SIZE STATE ====================
// 'small' | 'medium' | 'large'
let gridSize = localStorage.getItem('kodem_grid_size') || 'medium';

// ==================== SORT STATE ====================
// Persisted via the sort-by select; default name A-Z
// sort-by select values: name-az, name-za, damage-desc, damage-asc, set, energy

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
 */
function showToast(message, type = '', durationMs = 3000) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast${type ? ' ' + type : ''}`;
    toast.textContent = message;
    container.appendChild(toast);

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

// ==================== LOADING SKELETONS ====================
function showLoadingState() {
    const grid = document.getElementById('card-grid');
    const count = document.getElementById('card-count');
    if (count) count.textContent = 'Cargando cartas...';

    // Show 12 skeleton cards
    const skeletons = Array.from({ length: 12 }, () => `
        <div class="card-item skeleton-card">
            <div class="skeleton-img shimmer"></div>
            <div class="skeleton-name shimmer"></div>
        </div>
    `).join('');
    if (grid) grid.innerHTML = skeletons;
}

// ==================== INITIALIZATION ====================
async function init() {
    // Show loading state immediately
    showLoadingState();

    // Load set aliases first
    try {
        const aliasResp = await fetch('set-aliases.json');
        if (aliasResp.ok) {
            const aliasData = await aliasResp.json();
            setMetadata = aliasData.sets || [];
            for (const set of setMetadata) {
                for (const alias of (set.aliases || [])) {
                    setAliases[alias.toUpperCase()] = set.code;
                }
            }
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
    populateTypeFilter();
    populateSubtypeFilter();

    // Setup event listeners
    setupEventListeners();

    // Apply saved grid size
    applyGridSize(gridSize);

    // Render initial view
    currentPage = 1;
    applyBrowserFilters();
}

// ==================== STORAGE ====================
async function loadCollection() {
    const stored = localStorage.getItem('kodem_collection');
    if (stored) {
        collection = new Set(JSON.parse(stored));
    } else {
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

function resolveFolio(folio) {
    if (!folio || typeof folio !== 'string') return folio;
    const match = folio.match(/^([A-Za-z]+)-(.+)$/);
    if (!match) return folio;
    const setCode = match[1].toUpperCase();
    const cardNum = match[2];
    const canonical = setAliases[setCode] || setCode;
    return `${canonical}-${cardNum}`;
}

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

    // Browser filters
    document.getElementById('search-input').addEventListener('input', debounce(() => {
        currentPage = 1;
        applyBrowserFilters();
    }, 300));
    document.getElementById('filter-set').addEventListener('change', () => { currentPage = 1; applyBrowserFilters(); });
    document.getElementById('filter-type').addEventListener('change', () => { currentPage = 1; applyBrowserFilters(); });
    document.getElementById('filter-energy').addEventListener('change', () => { currentPage = 1; applyBrowserFilters(); });
    document.getElementById('sort-by').addEventListener('change', () => { currentPage = 1; applyBrowserFilters(); });

    const filterSubtype = document.getElementById('filter-subtype');
    if (filterSubtype) filterSubtype.addEventListener('change', () => { currentPage = 1; applyBrowserFilters(); });
    const filterRarity = document.getElementById('filter-rarity');
    if (filterRarity) filterRarity.addEventListener('change', () => { currentPage = 1; applyBrowserFilters(); });
    const filterEffectText = document.getElementById('filter-effect-text');
    if (filterEffectText) filterEffectText.addEventListener('input', debounce(() => { currentPage = 1; applyBrowserFilters(); }, 300));

    // Grid size toggle buttons
    document.querySelectorAll('.grid-size-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const size = btn.dataset.size;
            applyGridSize(size);
        });
    });

    // Collection filters
    document.getElementById('collection-search').addEventListener('input', debounce(renderCollection, 300));
    document.getElementById('collection-filter').addEventListener('change', renderCollection);
    document.getElementById('clear-collection').addEventListener('click', clearCollection);
    document.getElementById('import-collection').addEventListener('click', importCollection);
    document.getElementById('export-collection').addEventListener('click', exportCollection);

    // Dashboard toggle
    const toggleDashBtn = document.getElementById('toggle-dashboard');
    if (toggleDashBtn) {
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
    const deckFilterSubtype = document.getElementById('deck-filter-subtype');
    if (deckFilterSubtype) deckFilterSubtype.addEventListener('change', renderDeckPool);
    const deckFilterRarity = document.getElementById('deck-filter-rarity');
    if (deckFilterRarity) deckFilterRarity.addEventListener('change', renderDeckPool);
    const deckFilterOwned = document.getElementById('deck-filter-owned');
    if (deckFilterOwned) deckFilterOwned.addEventListener('change', renderDeckPool);
    const deckFilterEffectText = document.getElementById('deck-filter-effect-text');
    if (deckFilterEffectText) deckFilterEffectText.addEventListener('input', debounce(renderDeckPool, 300));

    // Modal
    document.getElementById('card-modal').addEventListener('click', (e) => {
        if (e.target.id === 'card-modal') closeModal();
    });
    document.querySelector('.modal-close').addEventListener('click', closeModal);
    document.getElementById('modal-toggle-owned').addEventListener('click', toggleOwnedFromModal);
}

// ==================== GRID SIZE ====================
function applyGridSize(size) {
    gridSize = size;
    localStorage.setItem('kodem_grid_size', size);

    const grid = document.getElementById('card-grid');
    if (grid) {
        grid.classList.remove('grid-small', 'grid-medium', 'grid-large');
        grid.classList.add(`grid-${size}`);
    }

    // Update toggle button active states
    document.querySelectorAll('.grid-size-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.size === size);
    });

    // Re-render to apply large-mode effect preview
    renderBrowserPage();
}

// ==================== VIEW SWITCH ====================
function switchView(view) {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.view === view);
    });

    document.querySelectorAll('.view').forEach(v => {
        v.classList.remove('active');
    });

    const viewMap = {
        'browser': 'browser-view',
        'collection': 'collection-view',
        'deck-builder': 'deck-builder-view'
    };

    document.getElementById(viewMap[view]).classList.add('active');

    if (view === 'browser') renderBrowserPage();
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

function populateTypeFilter() {
    const types = [...new Set(allCards.map(c => c.type).filter(Boolean))].sort();
    const selects = ['filter-type', 'deck-filter-type'];
    selects.forEach(selectId => {
        const select = document.getElementById(selectId);
        if (!select) return;
        while (select.options.length > 1) select.remove(1);
        types.forEach(type => {
            const option = document.createElement('option');
            option.value = type;
            option.textContent = type;
            select.appendChild(option);
        });
    });
}

function populateSubtypeFilter() {
    const subtypes = [...new Set(allCards.map(c => c.subtype).filter(Boolean))].sort();
    const selects = ['filter-subtype', 'deck-filter-subtype'];
    selects.forEach(selectId => {
        const select = document.getElementById(selectId);
        if (!select) return;
        while (select.options.length > 1) select.remove(1);
        subtypes.forEach(subtype => {
            const option = document.createElement('option');
            option.value = subtype;
            option.textContent = subtype;
            select.appendChild(option);
        });
    });
}

function applyBrowserFilters() {
    const search = document.getElementById('search-input').value.toLowerCase();
    const filterSet = document.getElementById('filter-set').value;
    const filterType = document.getElementById('filter-type').value;
    const filterEnergy = document.getElementById('filter-energy').value;
    const sortBy = document.getElementById('sort-by').value;
    const filterSubtype = (document.getElementById('filter-subtype') || {}).value || '';
    const filterRarity = (document.getElementById('filter-rarity') || {}).value || '';
    const filterEffectText = ((document.getElementById('filter-effect-text') || {}).value || '').toLowerCase();

    filteredCards = allCards.filter(card => {
        if (search && !card.name.toLowerCase().includes(search)) return false;
        if (filterSet && card.set !== filterSet) return false;
        if (filterType && card.type !== filterType) return false;
        if (filterEnergy && card.energy !== filterEnergy && card.energy2 !== filterEnergy) return false;
        if (filterSubtype && card.subtype !== filterSubtype) return false;
        if (filterRarity) {
            const rarityMap = {
                'Común': '',
                'Rara': 'R',
                'Súper Rara': 'S',
                'Ultra Rara': 'U',
                'Kósmica': 'K'
            };
            const targetSuffix = rarityMap[filterRarity];
            if (targetSuffix === undefined) return true;
            if (targetSuffix === '') {
                if (getFolioSuffix(card.folio) !== '') return false;
            } else {
                if (!(card.rarity_variants || []).includes(targetSuffix)) return false;
            }
        }
        if (filterEffectText) {
            const effectText = (card.effect_text || '').toLowerCase();
            const costText = (card.cost_text || '').toLowerCase();
            if (!effectText.includes(filterEffectText) && !costText.includes(filterEffectText)) return false;
        }
        return true;
    });

    // Sort
    filteredCards.sort((a, b) => {
        if (sortBy === 'name-az' || sortBy === 'name') return a.name.localeCompare(b.name, 'es');
        if (sortBy === 'name-za') return b.name.localeCompare(a.name, 'es');
        if (sortBy === 'damage-desc' || sortBy === 'damage') return (b.damage || 0) - (a.damage || 0);
        if (sortBy === 'damage-asc') return (a.damage || 0) - (b.damage || 0);
        if (sortBy === 'rests') return (b.rests || 0) - (a.rests || 0);
        if (sortBy === 'set') return a.set.localeCompare(b.set);
        if (sortBy === 'energy') return (a.energy || '').localeCompare(b.energy || '', 'es');
        return 0;
    });

    totalFiltered = filteredCards.length;
    renderBrowserPage();
}

/**
 * Render the current page of filteredCards into the grid.
 * Updates the counter and pagination controls.
 */
function renderBrowserPage() {
    const grid = document.getElementById('card-grid');
    const countEl = document.getElementById('card-count');

    const start = (currentPage - 1) * PAGE_SIZE;
    const end = Math.min(start + PAGE_SIZE, totalFiltered);
    const pageCards = filteredCards.slice(start, end);
    const totalPages = Math.ceil(totalFiltered / PAGE_SIZE);

    // Counter
    if (countEl) {
        countEl.textContent = totalFiltered === 0
            ? '0 cartas'
            : `Mostrando ${start + 1}–${end} de ${totalFiltered} cartas`;
    }

    // Grid
    if (grid) {
        grid.classList.remove('grid-small', 'grid-medium', 'grid-large');
        grid.classList.add(`grid-${gridSize}`);
        grid.innerHTML = pageCards.map(card => createCardElement(card)).join('');

        grid.querySelectorAll('.card-item').forEach((el, idx) => {
            el.addEventListener('click', () => openCardModal(pageCards[idx]));
        });
    }

    // Pagination controls
    renderPagination(totalPages);
}

// Legacy alias used by some paths
function renderBrowser() {
    applyBrowserFilters();
}

function renderPagination(totalPages) {
    const container = document.getElementById('pagination-controls');
    if (!container) return;

    if (totalPages <= 1) {
        container.innerHTML = '';
        return;
    }

    let html = '';

    // Prev button
    html += `<button class="page-btn ${currentPage === 1 ? 'disabled' : ''}" data-page="${currentPage - 1}" ${currentPage === 1 ? 'disabled' : ''}>‹ Anterior</button>`;

    // Page numbers — show up to 7 around current
    const delta = 2;
    const range = [];
    for (let p = Math.max(1, currentPage - delta); p <= Math.min(totalPages, currentPage + delta); p++) {
        range.push(p);
    }

    if (range[0] > 1) {
        html += `<button class="page-btn" data-page="1">1</button>`;
        if (range[0] > 2) html += `<span class="page-ellipsis">…</span>`;
    }

    for (const p of range) {
        html += `<button class="page-btn ${p === currentPage ? 'active' : ''}" data-page="${p}">${p}</button>`;
    }

    if (range[range.length - 1] < totalPages) {
        if (range[range.length - 1] < totalPages - 1) html += `<span class="page-ellipsis">…</span>`;
        html += `<button class="page-btn" data-page="${totalPages}">${totalPages}</button>`;
    }

    // Next button
    html += `<button class="page-btn ${currentPage === totalPages ? 'disabled' : ''}" data-page="${currentPage + 1}" ${currentPage === totalPages ? 'disabled' : ''}>Siguiente ›</button>`;

    container.innerHTML = html;

    // Event listeners
    container.querySelectorAll('.page-btn:not([disabled])').forEach(btn => {
        btn.addEventListener('click', () => {
            const page = parseInt(btn.dataset.page, 10);
            if (page >= 1 && page <= totalPages) {
                currentPage = page;
                renderBrowserPage();
                // Scroll to top of grid
                document.getElementById('browser-view').scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

function createCardElement(card, small = false) {
    const owned = collection.has(card.folio) ? 'owned' : '';
    const inDeck = currentDeck && decks[currentDeck]?.cards.includes(card.folio) ? 'in-deck' : '';
    const effectPreview = (gridSize === 'large' && card.effect_text)
        ? `<div class="card-effect-preview">${card.effect_text.substring(0, 80)}${card.effect_text.length > 80 ? '…' : ''}</div>`
        : '';

    return `
        <div class="card-item ${owned} ${inDeck}" data-folio="${card.folio}" data-energy="${card.energy || ''}">
            <img src="${card.image}" alt="${card.name}" loading="lazy" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22280%22%3E%3Crect fill=%22%23333%22 width=%22200%22 height=%22280%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 fill=%22%23666%22 text-anchor=%22middle%22 dy=%22.3em%22%3ENo Image%3C/text%3E%3C/svg%3E'" />
            <div class="card-name">${card.name}</div>
            ${effectPreview}
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

    const isOwned = collection.has(folio);
    document.getElementById('modal-toggle-owned').textContent =
        isOwned ? 'Quitar de Colección' : 'Agregar a Colección';

    const currentView = document.querySelector('.view.active').id;
    if (currentView === 'browser-view') renderBrowserPage();
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