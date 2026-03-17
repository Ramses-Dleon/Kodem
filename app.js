// ==================== STATE ====================
let allCards = [];
let filteredCards = [];
let collection = new Set(); // Set of folio IDs
let wantList = new Set(JSON.parse(localStorage.getItem('kodem_wantlist') || '[]'));
let currentCollectionTab = 'collection';
let currentCollectionSort = 'set';
let collectionOrder = JSON.parse(localStorage.getItem('kodem_collection_order') || '[]');
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

    // Auto-import deck from URL hash if present
    importDeckFromHash();
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

// ==================== SYNC CODE ====================
function generateSyncCode() {
    if (collection.size === 0) {
        showToast('Tu colección está vacía', 'error');
        return;
    }
    // Compress: join folios with comma, encode to base64, add prefix
    const folios = [...collection].sort().join(',');
    const encoded = btoa(unescape(encodeURIComponent(folios)));
    // Create a shorter hash for display
    const code = 'KDM-' + encoded;
    
    // Copy to clipboard
    if (navigator.clipboard) {
        navigator.clipboard.writeText(code).then(() => {
            showToast(`Código copiado (${collection.size} cartas) 📋`, 'success');
        }).catch(() => {
            promptSyncCode(code);
        });
    } else {
        promptSyncCode(code);
    }
}

function promptSyncCode(code) {
    // Fallback: show in a textarea for manual copy
    const modal = document.createElement('div');
    modal.className = 'sync-modal-overlay';
    modal.innerHTML = `
        <div class="sync-modal">
            <h3 style="font-family:'Cinzel',serif;color:#f59e0b;margin-bottom:12px">📋 Tu Código de Colección</h3>
            <p style="color:#aaa;font-size:0.85rem;margin-bottom:8px">Copia este código y pégalo en otro dispositivo:</p>
            <textarea id="sync-code-text" style="width:100%;height:80px;background:#1a1a1a;color:#e0e0e0;border:1px solid #444;border-radius:6px;padding:8px;font-size:0.75rem;resize:none" readonly>${code}</textarea>
            <button onclick="document.getElementById('sync-code-text').select();document.execCommand('copy');this.textContent='✅ Copiado'" style="margin-top:8px;background:#f59e0b;color:#000;border:none;padding:10px 20px;border-radius:8px;cursor:pointer;width:100%;font-weight:bold">Copiar</button>
            <button onclick="this.closest('.sync-modal-overlay').remove()" style="margin-top:6px;background:#333;color:#e0e0e0;border:none;padding:8px 20px;border-radius:8px;cursor:pointer;width:100%">Cerrar</button>
        </div>
    `;
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
    document.body.appendChild(modal);
}

async function importSyncCode() {
    const modal = document.createElement('div');
    modal.className = 'sync-modal-overlay';
    modal.innerHTML = `
        <div class="sync-modal">
            <h3 style="font-family:'Cinzel',serif;color:#f59e0b;margin-bottom:12px">📥 Importar Colección</h3>
            <p style="color:#aaa;font-size:0.85rem;margin-bottom:8px">Pega tu código KDM-... aquí:</p>
            <textarea id="sync-import-text" style="width:100%;height:80px;background:#1a1a1a;color:#e0e0e0;border:1px solid #444;border-radius:6px;padding:8px;font-size:0.75rem;resize:none" placeholder="KDM-..."></textarea>
            <button id="sync-import-btn" style="margin-top:8px;background:#f59e0b;color:#000;border:none;padding:10px 20px;border-radius:8px;cursor:pointer;width:100%;font-weight:bold">Importar</button>
            <button onclick="this.closest('.sync-modal-overlay').remove()" style="margin-top:6px;background:#333;color:#e0e0e0;border:none;padding:8px 20px;border-radius:8px;cursor:pointer;width:100%">Cancelar</button>
        </div>
    `;
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
    document.body.appendChild(modal);
    
    document.getElementById('sync-import-btn').addEventListener('click', async () => {
        const code = document.getElementById('sync-import-text').value.trim();
        if (!code.startsWith('KDM-')) {
            showToast('Código inválido — debe empezar con KDM-', 'error');
            return;
        }
        try {
            const encoded = code.substring(4); // Remove KDM- prefix
            const foliosStr = decodeURIComponent(escape(atob(encoded)));
            const folios = foliosStr.split(',').filter(f => f.length > 0);
            
            if (folios.length === 0) {
                showToast('Código vacío', 'error');
                return;
            }
            
            // Validate folios against allCards
            const validFolios = new Set(allCards.map(c => c.folio));
            // Accept foils/variants: store both original AND base folio
            const valid = [];
            const seen = new Set();
            for (const f of folios) {
                if (validFolios.has(f)) { 
                    if (!seen.has(f)) { valid.push(f); seen.add(f); }
                    continue; 
                }
                // Strip trailing rarity suffix (S=Súper, R=Rara, U=Ultra)
                const base = f.replace(/[SRU]$/, '');
                if (base !== f && validFolios.has(base)) { 
                    // Add base folio (so dashboard counts it) + original (so we know variant)
                    if (!seen.has(base)) { valid.push(base); seen.add(base); }
                    if (!seen.has(f)) { valid.push(f); seen.add(f); }
                    continue; 
                }
            }
            const invalid = folios.length - valid.length;
            
            const mode = await showChoice(
                `Código tiene ${valid.length} cartas válidas${invalid ? ` (${invalid} no reconocidas)` : ''}. ¿Qué hacer?`,
                [
                    { label: '🔄 Reemplazar colección', key: 'replace', className: 'btn-danger' },
                    { label: '➕ Agregar a existente', key: 'merge', className: 'btn-primary' },
                ]
            );
            if (!mode) return;
            
            if (mode === 'replace') {
                collection = new Set(valid);
            } else {
                valid.forEach(f => collection.add(f));
            }
            saveCollection();
            modal.remove();
            // Force full re-render: switch to collection view and refresh dashboard
            switchView('collection');
            setTimeout(() => {
                renderCollection();
                showToast(`Colección actualizada: ${collection.size} cartas ✅`, 'success');
            }, 300);
        } catch (err) {
            showToast('Error decodificando: ' + err.message, 'error');
        }
    });
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
                switchView('collection');
                setTimeout(() => {
                    renderCollection();
                    showToast(`Colección actualizada: ${collection.size} cartas ✅`, 'success');
                }, 300);
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

    // Reset filters button
    // Toggle advanced filters (mobile)
    const toggleFiltersBtn = document.getElementById('toggle-filters');
    if (toggleFiltersBtn) {
        toggleFiltersBtn.addEventListener('click', () => {
            const af = document.getElementById('advanced-filters');
            if (af) {
                af.classList.toggle('show');
                toggleFiltersBtn.textContent = af.classList.contains('show') ? '🔼 Filtros' : '🔽 Filtros';
            }
        });
    }

    const resetBtn = document.getElementById('reset-filters');
    if (resetBtn) resetBtn.addEventListener('click', () => {
        document.getElementById('search-input').value = '';
        document.getElementById('filter-set').value = '';
        document.getElementById('filter-type').value = '';
        document.getElementById('filter-energy').value = '';
        if (document.getElementById('filter-subtype')) document.getElementById('filter-subtype').value = '';
        if (document.getElementById('filter-rarity')) document.getElementById('filter-rarity').value = '';
        if (document.getElementById('filter-effect-text')) document.getElementById('filter-effect-text').value = '';
        document.getElementById('sort-by').value = 'set';
        currentPage = 1;
        applyBrowserFilters();
        showToast('Filtros reiniciados', 'info');
    });

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
    const syncExportBtn = document.getElementById('sync-export');
    if (syncExportBtn) syncExportBtn.addEventListener('click', generateSyncCode);
    const syncImportBtn = document.getElementById('sync-import');
    if (syncImportBtn) syncImportBtn.addEventListener('click', importSyncCode);

    // Collection sort
    const collectionSort = document.getElementById('collection-sort');
    if (collectionSort) collectionSort.addEventListener('change', (e) => {
        currentCollectionSort = e.target.value;
        renderCollection();
    });

    // Collection tab toggle (Mi Colección | Want List)
    document.querySelectorAll('.collection-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.collection-tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCollectionTab = btn.dataset.tab;
            renderCollection();
        });
    });

    // Bulk add
    const bulkAddBtn = document.getElementById('bulk-add-btn');
    if (bulkAddBtn) bulkAddBtn.addEventListener('click', bulkAddToCollection);

    // Modal want-list toggle
    const modalWantBtn = document.getElementById('modal-toggle-wanted');
    if (modalWantBtn) modalWantBtn.addEventListener('click', toggleWantedFromModal);

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
    document.getElementById('share-deck-btn').addEventListener('click', shareDeck);
    document.getElementById('export-deck-btn').addEventListener('click', exportDeck);
    const deckSyncExport = document.getElementById('deck-sync-export');
    if (deckSyncExport) deckSyncExport.addEventListener('click', generateDeckSyncCode);
    const deckSyncImport = document.getElementById('deck-sync-import');
    if (deckSyncImport) deckSyncImport.addEventListener('click', importDeckSyncCode);
    const deckJsonExport = document.getElementById('deck-json-export');
    if (deckJsonExport) deckJsonExport.addEventListener('click', exportDeckJSON);
    const deckJsonImport = document.getElementById('deck-json-import');
    if (deckJsonImport) deckJsonImport.addEventListener('click', importDeckJSON);
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
    const modalWantBtn2 = document.getElementById('modal-toggle-wanted');
    if (modalWantBtn2) modalWantBtn2.addEventListener('click', toggleWantedFromModal);

    // Modal nav buttons
    const prevBtn = document.getElementById('modal-prev-btn');
    const nextBtn = document.getElementById('modal-next-btn');
    if (prevBtn) prevBtn.addEventListener('click', () => navigateModal(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => navigateModal(1));

    // Keyboard arrow navigation
    document.addEventListener('keydown', (e) => {
        const modal = document.getElementById('card-modal');
        if (!modal.classList.contains('active')) return;
        if (e.key === 'ArrowLeft')  { e.preventDefault(); navigateModal(-1); }
        if (e.key === 'ArrowRight') { e.preventDefault(); navigateModal(1); }
        if (e.key === 'Escape')     { e.preventDefault(); closeModal(); }
    });
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
function getSetDisplayName(code) {
    const meta = setMetadata.find(s => s.code === code);
    return meta ? `${code} — ${meta.name_es}` : code;
}

function populateSetFilter() {
    const sets = [...new Set(allCards.map(c => c.set))].sort();
    const select = document.getElementById('filter-set');
    sets.forEach(set => {
        const option = document.createElement('option');
        option.value = set;
        option.textContent = getSetDisplayName(set);
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

        if (totalFiltered === 0) {
            grid.innerHTML = `
                <div class="card-grid-empty">
                    <span class="empty-icon">🔮</span>
                    <span class="empty-msg">No se encontraron cartas con esos filtros</span>
                    <span class="empty-hint">Intenta con otros criterios de búsqueda</span>
                </div>`;
        } else {
            grid.innerHTML = pageCards.map(card => createCardElement(card)).join('');
            grid.querySelectorAll('.card-item').forEach((el, idx) => {
                // Pass full filteredCards list + absolute index for ← → navigation
                const absIdx = start + idx;
                el.addEventListener('click', () => openCardModal(filteredCards[absIdx], filteredCards, absIdx));
            });
        }
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
    const isWanted = wantList.has(card.folio);
    const wantedClass = isWanted ? 'wanted' : '';
    const inDeck = currentDeck && decks[currentDeck]?.cards.includes(card.folio) ? 'in-deck' : '';
    const effectPreview = (gridSize === 'large' && card.effect_text)
        ? `<div class="card-effect-preview">${card.effect_text.substring(0, 80)}${card.effect_text.length > 80 ? '…' : ''}</div>`
        : '';

    // 🎯 want button (stop propagation so it doesn't open modal)
    const wantBtn = small ? '' : `<button class="card-want-btn ${isWanted ? 'active' : ''}" data-folio="${card.folio}" title="${isWanted ? 'Quitar de Want List' : 'Agregar a Want List'}" onclick="event.stopPropagation();handleWantBtnClick(this,'${card.folio}')">🎯</button>`;

    return `
        <div class="card-item ${owned} ${wantedClass} ${inDeck}" data-folio="${card.folio}" data-energy="${card.energy || ''}">
            <img src="${card.image}" alt="${card.name}" loading="lazy" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22280%22%3E%3Crect fill=%22%23333%22 width=%22200%22 height=%22280%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 fill=%22%23666%22 text-anchor=%22middle%22 dy=%22.3em%22%3ENo Image%3C/text%3E%3C/svg%3E'" />
            ${wantBtn}
            <div class="card-name">${card.name}</div>
            ${effectPreview}
        </div>
    `;
}

function toggleWanted(folio) {
    if (wantList.has(folio)) wantList.delete(folio);
    else wantList.add(folio);
    localStorage.setItem('kodem_wantlist', JSON.stringify([...wantList]));
}

function handleWantBtnClick(btnEl, folio) {
    toggleWanted(folio);
    const isWanted = wantList.has(folio);
    btnEl.classList.toggle('active', isWanted);
    btnEl.title = isWanted ? 'Quitar de Want List' : 'Agregar a Want List';
    // update parent card-item class
    const cardItem = btnEl.closest('.card-item');
    if (cardItem) cardItem.classList.toggle('wanted', isWanted);
    // if want list tab is active, re-render
    if (currentCollectionTab === 'wantlist') renderCollection();
}

// ==================== CARD MODAL ====================

/** Energy emoji map */
const ENERGY_EMOJI = {
    'Átlica':    '💧',
    'Pírica':    '🔥',
    'Gélida':    '❄️',
    'Lítica':    '🪨',
    'Cháaktica': '⚡',
    'Húumica':   '🌿',
    'Demótica':  '💀',
    'Feral':     '🐾',
};

/** CSS color map for energy (matches grid cards) */
const ENERGY_COLOR = {
    'Átlica':    'var(--atlica)',
    'Pírica':    'var(--pirica)',
    'Gélida':    'var(--gelida)',
    'Lítica':    'var(--litica)',
    'Cháaktica': 'var(--chaaktica)',
    'Húumica':   'var(--huumica)',
    'Demótica':  'var(--demotica)',
    'Feral':     'var(--feral)',
};

/**
 * Format effect text: wrap keyword labels in colored spans.
 */
function formatEffectText(text) {
    if (!text) return 'Sin efecto';

    // Order matters: longer/more-specific matches first
    const keywords = [
        { label: 'Activa-Rápida:', color: '#ef4444' },
        { label: 'Pasiva-Rápida:', color: '#3b82f6' },
        { label: 'Activa:',        color: '#ef4444' },
        { label: 'Pasiva:',        color: '#3b82f6' },
        { label: 'Costo:',         color: '#f59e0b' },
        { label: 'Requisito:',     color: '#a855f7' },
    ];

    const escape = (s) => s
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    const lines = text.split('\n');
    const processed = lines.map(line => {
        let out = escape(line);
        for (const kw of keywords) {
            const esc = escape(kw.label);
            const re = new RegExp(esc.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&'), 'g');
            out = out.replace(re,
                `<span class="effect-keyword" style="color:${kw.color};font-weight:700">${esc}</span>`);
        }
        return out;
    });
    return processed.join('<br>');
}

/** Navigation state for modal ← → */
let _modalCardList = [];
let _modalCardIndex = -1;

function openCardModal(card, cardList, cardIndex) {
    // Store navigation context
    if (cardList) {
        _modalCardList = cardList;
        _modalCardIndex = (cardIndex !== undefined) ? cardIndex : cardList.indexOf(card);
    } else {
        const activeView = document.querySelector('.view.active')?.id;
        if (activeView === 'browser-view') {
            _modalCardList = filteredCards;
            _modalCardIndex = filteredCards.indexOf(card);
        } else {
            _modalCardList = [];
            _modalCardIndex = -1;
        }
    }

    const modal = document.getElementById('card-modal');
    const modalContent = modal.querySelector('.modal-content');

    // --- Image ---
    const imgEl = document.getElementById('modal-card-image');
    imgEl.src = card.image;
    imgEl.alt = card.name;

    // --- Energy color border on modal-content ---
    const primaryEnergy = card.energy || '';
    const energyColor = ENERGY_COLOR[primaryEnergy] || 'var(--accent-amber)';
    modalContent.style.borderColor = energyColor;
    modalContent.style.borderLeftWidth = '5px';
    const imgWrapper = modal.querySelector('.modal-image');
    if (imgWrapper) imgWrapper.style.setProperty('--modal-energy-color', energyColor);

    // --- Name ---
    document.getElementById('modal-card-name').textContent = card.name;

    // --- Folio ---
    document.getElementById('modal-card-folio').textContent = card.folio;

    // --- Set: code + display name ---
    const setInfo = getSetInfo(card.set);
    const setName = setInfo ? (setInfo.name_es || setInfo.name_en || '') : '';
    document.getElementById('modal-card-set').textContent =
        setName ? `${card.set} · ${setName}` : card.set;

    // --- Rarity ---
    const rv = card.rarity_variants || [];
    document.getElementById('modal-card-rarity').textContent =
        rv.length > 0 ? rv.join(', ') : 'Común';

    // --- Type ---
    document.getElementById('modal-card-type').textContent =
        card.subtype ? `${card.type} - ${card.subtype}` : card.type;

    // --- Energy with emoji ---
    const energyParts = [card.energy, card.energy2].filter(Boolean).map(e => {
        const em = ENERGY_EMOJI[e] || '';
        return em ? `${em} ${e}` : e;
    });
    document.getElementById('modal-card-energy').textContent =
        energyParts.length ? energyParts.join(' / ') : 'N/A';

    // --- Stats ---
    document.getElementById('modal-card-damage').textContent = card.damage ?? 'N/A';
    document.getElementById('modal-card-rests').textContent = card.rests ?? 'N/A';

    // --- Effect text with keyword formatting ---
    document.getElementById('modal-effect-type').textContent = card.effect_type || 'Efecto';
    document.getElementById('modal-effect-text').innerHTML = formatEffectText(card.effect_text);

    // --- Cost ---
    if (card.cost_text) {
        document.getElementById('modal-cost-section').style.display = 'block';
        document.getElementById('modal-cost-text').innerHTML = formatEffectText(card.cost_text);
    } else {
        document.getElementById('modal-cost-section').style.display = 'none';
    }

    // --- Flavor / Species / Artist ---
    document.getElementById('modal-flavor-text').textContent = card.flavor_text || '';
    document.getElementById('modal-species').textContent = card.species || 'N/A';
    document.getElementById('modal-artist').textContent = card.artist || 'Desconocido';

    // --- Owned toggle ---
    const toggleBtn = document.getElementById('modal-toggle-owned');
    const isOwned = collection.has(card.folio);
    toggleBtn.textContent = isOwned ? '♥ Quitar de Colección' : '♥ Agregar a Colección';
    toggleBtn.dataset.folio = card.folio;

    // --- Want list toggle ---
    const wantBtn = document.getElementById('modal-toggle-wanted');
    if (wantBtn) {
        const isWanted = wantList.has(card.folio);
        wantBtn.textContent = isWanted ? '🎯 Quitar de Want List' : '🎯 Agregar a Want List';
        wantBtn.dataset.folio = card.folio;
        wantBtn.className = isWanted ? 'btn-want active' : 'btn-want';
    }

    // --- Nav buttons ---
    _updateModalNavButtons();

    modal.classList.add('active');
}

function _updateModalNavButtons() {
    const prevBtn = document.getElementById('modal-prev-btn');
    const nextBtn = document.getElementById('modal-next-btn');
    if (!prevBtn || !nextBtn) return;
    const has = _modalCardList.length > 1;
    prevBtn.style.display = has ? '' : 'none';
    nextBtn.style.display = has ? '' : 'none';
    prevBtn.disabled = _modalCardIndex <= 0;
    nextBtn.disabled = _modalCardIndex >= _modalCardList.length - 1;
}

function navigateModal(dir) {
    const idx = _modalCardIndex + dir;
    if (idx < 0 || idx >= _modalCardList.length) return;
    openCardModal(_modalCardList[idx], _modalCardList, idx);
}

function closeModal() {
    document.getElementById('card-modal').classList.remove('active');
}

function toggleOwnedFromModal() {
    const folio = document.getElementById('modal-toggle-owned').dataset.folio;
    toggleOwned(folio);

    const isOwned = collection.has(folio);
    document.getElementById('modal-toggle-owned').textContent =
        isOwned ? '♥ Quitar de Colección' : '♥ Agregar a Colección';

    const currentView = document.querySelector('.view.active').id;
    if (currentView === 'browser-view') renderBrowserPage();
    else if (currentView === 'collection-view') renderCollection();
}

function toggleWantedFromModal() {
    const folio = document.getElementById('modal-toggle-wanted').dataset.folio;
    toggleWanted(folio);

    const isWanted = wantList.has(folio);
    const wantBtn = document.getElementById('modal-toggle-wanted');
    wantBtn.textContent = isWanted ? '🎯 Quitar de Want List' : '🎯 Agregar a Want List';
    wantBtn.className = isWanted ? 'btn-want active' : 'btn-want';

    const currentView = document.querySelector('.view.active').id;
    if (currentView === 'collection-view') renderCollection();
}

// ==================== COLLECTION ====================
function toggleOwned(folio) {
    if (collection.has(folio)) {
        collection.delete(folio);
        collectionOrder = collectionOrder.filter(f => f !== folio);
    } else {
        collection.add(folio);
        collectionOrder.push(folio); // track insertion order
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
    const sort = currentCollectionSort;

    // Update tab count badges
    const ownedTabBtn = document.querySelector('.collection-tab-btn[data-tab="collection"]');
    const wantTabBtn  = document.querySelector('.collection-tab-btn[data-tab="wantlist"]');
    if (ownedTabBtn) { const b = ownedTabBtn.querySelector('.tab-count'); if (b) b.textContent = collection.size; }
    if (wantTabBtn)  { const b = wantTabBtn.querySelector('.tab-count');  if (b) b.textContent = wantList.size;  }

    let cards;

    if (currentCollectionTab === 'wantlist') {
        cards = allCards.filter(card => {
            if (!wantList.has(card.folio)) return false;
            if (search && !card.name.toLowerCase().includes(search)) return false;
            return true;
        });
    } else {
        cards = allCards.filter(card => {
            if (search && !card.name.toLowerCase().includes(search)) return false;
            const isOwned = collection.has(card.folio);
            if (filter === 'owned' && !isOwned) return false;
            if (filter === 'missing' && isOwned) return false;
            return true;
        });
    }

    // Sort
    cards = sortCollectionCards(cards, sort);
}

function sortCollectionCards(cards, sort) {
    const copy = [...cards];
    switch (sort) {
        case 'name-az': return copy.sort((a, b) => (a.name || '').localeCompare(b.name || '', 'es'));
        case 'name-za': return copy.sort((a, b) => (b.name || '').localeCompare(a.name || '', 'es'));
        case 'energy': return copy.sort((a, b) => (a.energy || '').localeCompare(b.energy || ''));
        case 'rarity': return copy.sort((a, b) => (a.rarity || '').localeCompare(b.rarity || ''));
        case 'damage-desc': return copy.sort((a, b) => (b.damage || 0) - (a.damage || 0));
        case 'set': default: return copy.sort((a, b) => (a.set || '').localeCompare(b.set || '') || (a.folio || '').localeCompare(b.folio || ''));
    }

    const grid = document.getElementById('collection-grid');
    grid.innerHTML = cards.map(card => createCardElement(card)).join('');

    // Add click listeners
    grid.querySelectorAll('.card-item').forEach((el, idx) => {
        el.addEventListener('click', () => openCardModal(cards[idx], cards, idx));
    });

    // Update dashboard only when on main collection tab
    if (currentCollectionTab === 'collection') renderDashboard();
}

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

    // Update URL hash with current deck folios
    const deck = decks[currentDeck];
    if (deck && deck.cards.length > 0) {
        const hash = '#deck=' + deck.cards.join(',');
        history.replaceState(null, '', hash);
    }

    showToast('Mazo guardado correctamente ✅', 'success');
    renderDeckList();
}

function shareDeck() {
    if (!currentDeck) {
        showToast('No hay mazo seleccionado', 'error');
        return;
    }

    const deck = decks[currentDeck];
    if (!deck || deck.cards.length === 0) {
        showToast('El mazo está vacío, agrega cartas primero', 'error');
        return;
    }

    const hash = '#deck=' + deck.cards.join(',');
    history.replaceState(null, '', hash);
    const url = window.location.href;

    navigator.clipboard.writeText(url).then(() => {
        showToast('🔗 URL del mazo copiada al portapapeles', 'success');
    }).catch(() => {
        showToast('URL: ' + url, 'info', 6000);
    });
}

/**
 * On page load: if URL has #deck=FOLIO1,FOLIO2,... auto-import that deck.
 */
function importDeckFromHash() {
    const hash = window.location.hash;
    if (!hash.startsWith('#deck=')) return;

    const folioString = hash.slice('#deck='.length);
    if (!folioString) return;

    const folios = folioString.split(',').map(f => f.trim()).filter(Boolean);
    if (folios.length === 0) return;

    // Create a new deck with the imported cards
    const id = Date.now().toString();
    const name = 'Mazo Compartido';
    decks[id] = { name, cards: folios };
    currentDeck = id;
    saveDecks();

    showToast(`Mazo importado desde URL: ${folios.length} cartas`, 'success');
    switchView('deck-builder');
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

    navigator.clipboard.writeText(text).then(() => {
        showToast('Mazo copiado al portapapeles 📋', 'success');
    }).catch(() => {
        showToast('No se pudo copiar al portapapeles', 'error');
    });
}

function exportDeckJSON() {
    if (!currentDeck) { showToast('Selecciona un mazo primero', 'error'); return; }
    const deck = decks[currentDeck];
    const data = { version: 1, name: deck.name, cards: deck.cards, exported: new Date().toISOString().split('T')[0] };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `kodem-deck-${deck.name.replace(/\s+/g, '-')}.json`; a.click();
    URL.revokeObjectURL(url);
    showToast('Mazo exportado como JSON 📄', 'success');
}

function importDeckJSON() {
    const input = document.createElement('input');
    input.type = 'file'; input.accept = '.json';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            try {
                const data = JSON.parse(ev.target.result);
                const name = data.name || file.name.replace('.json', '');
                const cards = data.cards || [];
                if (cards.length === 0) { showToast('No hay cartas en el archivo', 'error'); return; }
                const id = Date.now().toString();
                decks[id] = { name, cards };
                currentDeck = id;
                saveDecks();
                renderDeckBuilder();
                showToast(`Mazo "${name}" importado (${cards.length} cartas) ✅`, 'success');
            } catch (err) { showToast('Error leyendo archivo: ' + err.message, 'error'); }
        };
        reader.readAsText(file);
    };
    input.click();
}

function generateDeckSyncCode() {
    if (!currentDeck) { showToast('Selecciona un mazo primero', 'error'); return; }
    const deck = decks[currentDeck];
    const payload = JSON.stringify({ n: deck.name, c: deck.cards });
    const code = 'KDECK-' + btoa(unescape(encodeURIComponent(payload)));
    if (navigator.clipboard) {
        navigator.clipboard.writeText(code).then(() => {
            showToast(`Código del mazo copiado (${deck.cards.length} cartas) 📋`, 'success');
        }).catch(() => promptSyncCode(code));
    } else { promptSyncCode(code); }
}

function importDeckSyncCode() {
    const modal = document.createElement('div');
    modal.className = 'sync-modal-overlay';
    modal.innerHTML = `
        <div class="sync-modal">
            <h3 style="font-family:'Cinzel',serif;color:#f59e0b;margin-bottom:12px">📥 Importar Mazo</h3>
            <p style="color:#aaa;font-size:0.85rem;margin-bottom:8px">Pega el código KDECK-... aquí:</p>
            <textarea id="deck-sync-text" style="width:100%;height:80px;background:#1a1a1a;color:#e0e0e0;border:1px solid #444;border-radius:6px;padding:8px;font-size:0.75rem;resize:none" placeholder="KDECK-..."></textarea>
            <button id="deck-sync-btn" style="margin-top:8px;background:#f59e0b;color:#000;border:none;padding:10px 20px;border-radius:8px;cursor:pointer;width:100%;font-weight:bold">Importar Mazo</button>
            <button onclick="this.closest('.sync-modal-overlay').remove()" style="margin-top:6px;background:#333;color:#e0e0e0;border:none;padding:8px 20px;border-radius:8px;cursor:pointer;width:100%">Cancelar</button>
        </div>
    `;
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
    document.body.appendChild(modal);
    document.getElementById('deck-sync-btn').addEventListener('click', () => {
        const code = document.getElementById('deck-sync-text').value.trim();
        if (!code.startsWith('KDECK-')) { showToast('Código inválido — debe empezar con KDECK-', 'error'); return; }
        try {
            const json = decodeURIComponent(escape(atob(code.substring(6))));
            const data = JSON.parse(json);
            const id = Date.now().toString();
            decks[id] = { name: data.n || 'Mazo Importado', cards: data.c || [] };
            currentDeck = id;
            saveDecks();
            renderDeckBuilder();
            modal.remove();
            showToast(`Mazo "${decks[id].name}" importado (${decks[id].cards.length} cartas) ✅`, 'success');
        } catch (err) { showToast('Error decodificando: ' + err.message, 'error'); }
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

        deckCardsEl.querySelectorAll('.remove-from-deck').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                removeFromDeck(btn.dataset.folio);
            });
        });

        deckCardsEl.querySelectorAll('.card-item').forEach((el, idx) => {
            el.addEventListener('click', () => openCardModal(cards[idx], cards, idx));
        });
    }

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

    const adendeiCount = (counts.Adendei || 0) + (counts.Espectro || 0);
    const equipoIxim = (counts.Ixim || 0) + (counts['Equipo-Ixim'] || 0);
    const equipoRot = (counts.Rot || 0) + (counts['Equipo-Rot'] || 0);
    const equipo = equipoIxim + equipoRot;

    updateValidationItem('val-adendei', adendeiCount, 15, 24);
    updateValidationItem('val-protector', counts.Protector, 1, 2);
    updateValidationItem('val-rava', counts.Rava, 0, 2);
    updateValidationItem('val-bio', counts.Bio, 0, 1);
    updateValidationItem('val-equipo', equipo, 0, 10);

    document.querySelector('#val-total .count').textContent = total;

    const energyEl = document.getElementById('energy-distribution');
    energyEl.innerHTML = Object.entries(energyDist)
        .sort((a, b) => b[1] - a[1])
        .map(([energy, count]) => `
            <span class="energy-badge">${energy}: ${count}</span>
        `).join('');

    document.getElementById('avg-damage').textContent =
        damageCount > 0 ? (totalDamage / damageCount).toFixed(1) : '0';
    document.getElementById('avg-rests').textContent =
        restsCount > 0 ? (totalRests / restsCount).toFixed(1) : '0';

    // Render visual charts and stats summary
    renderDeckCharts(cards, energyDist, total, damageCount, totalDamage);
}


// ==================== DECK CHARTS ====================

// Energy colors matching the design spec
const ENERGY_COLORS = {
    'Átlica':    '#3b82f6',
    'Pírica':    '#ef4444',
    'Gélida':    '#06b6d4',
    'Lítica':    '#b45309',
    'Cháaktica': '#eab308',
    'Húumica':   '#a855f7',
    'Demótica':  '#9ca3af',
    'Feral':     '#22c55e',
};

/**
 * Render the energy distribution bar chart, damage histogram,
 * and deck stats summary bar. Called from updateDeckValidation.
 */
function renderDeckCharts(cards, energyDist, total, damageCount, totalDamage) {
    // === Stats Summary Bar ===
    const dssTotal = document.getElementById('dss-total');
    const dssAvgDmg = document.getElementById('dss-avg-damage');
    const dssEnergyDots = document.getElementById('dss-energy-dots');
    const dssSubtype = document.getElementById('dss-subtype');

    if (dssTotal) dssTotal.textContent = total;

    if (dssAvgDmg) {
        dssAvgDmg.textContent = (damageCount > 0)
            ? (totalDamage / damageCount).toFixed(1)
            : '—';
    }

    // Energy dots: one dot per card-energy occurrence, grouped by type
    if (dssEnergyDots) {
        if (Object.keys(energyDist).length === 0) {
            dssEnergyDots.innerHTML = '<span style="color:var(--text-secondary);font-size:0.75rem">—</span>';
        } else {
            const sorted = Object.entries(energyDist).sort((a, b) => b[1] - a[1]);
            let dotsHtml = '';
            for (const [energy, count] of sorted) {
                const color = ENERGY_COLORS[energy] || '#888';
                const shown = Math.min(count, 6);
                for (let i = 0; i < shown; i++) {
                    dotsHtml += `<span class="dss-energy-dot" style="background:${color}" title="${energy} (${count})"></span>`;
                }
            }
            dssEnergyDots.innerHTML = dotsHtml;
        }
    }

    // Most common subtype
    if (dssSubtype) {
        const subtypeCounts = {};
        for (const card of cards) {
            if (card.subtype) {
                subtypeCounts[card.subtype] = (subtypeCounts[card.subtype] || 0) + 1;
            }
        }
        const entries = Object.entries(subtypeCounts).sort((a, b) => b[1] - a[1]);
        dssSubtype.textContent = entries.length > 0 ? entries[0][0] : '—';
    }

    // === Energy Distribution Bar Chart ===
    const energyBarsEl = document.getElementById('energy-chart-bars');
    if (energyBarsEl) {
        if (Object.keys(energyDist).length === 0) {
            energyBarsEl.innerHTML = '<div class="deck-chart-empty">Sin cartas en el mazo</div>';
        } else {
            const maxCount = Math.max(...Object.values(energyDist));
            const sorted = Object.entries(energyDist).sort((a, b) => b[1] - a[1]);
            energyBarsEl.innerHTML = sorted.map(([energy, count]) => {
                const pct = maxCount > 0 ? Math.round((count / maxCount) * 100) : 0;
                const color = ENERGY_COLORS[energy] || '#888';
                return `
                    <div class="energy-bar-row">
                        <div class="energy-bar-label" title="${energy}">${energy}</div>
                        <div class="energy-bar-track">
                            <div class="energy-bar-fill" style="width:${pct}%;background:${color}"></div>
                        </div>
                        <div class="energy-bar-count">${count}</div>
                    </div>`;
            }).join('');
        }
    }

    // === Damage Histogram ===
    const damageHistEl = document.getElementById('damage-histogram');
    if (damageHistEl) {
        const dmgBuckets = { '0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6+': 0 };
        for (const card of cards) {
            if (card.damage == null) continue;
            const d = Math.min(Math.floor(card.damage), 6);
            const key = d === 6 ? '6+' : String(d);
            dmgBuckets[key] = (dmgBuckets[key] || 0) + 1;
        }

        const allZero = Object.values(dmgBuckets).every(v => v === 0);
        if (allZero) {
            damageHistEl.innerHTML = '<div class="deck-chart-empty">Sin datos de daño</div>';
        } else {
            const maxBucket = Math.max(...Object.values(dmgBuckets));
            damageHistEl.innerHTML = Object.entries(dmgBuckets).map(([label, count]) => {
                const pct = maxBucket > 0 ? Math.round((count / maxBucket) * 100) : 0;
                return `
                    <div class="damage-bar-row">
                        <div class="damage-bar-label">${label}</div>
                        <div class="damage-bar-track">
                            <div class="damage-bar-fill" style="width:${pct}%"></div>
                        </div>
                        <div class="damage-bar-count">${count > 0 ? count : ''}</div>
                    </div>`;
            }).join('');
        }
    }
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

const EXCLUDED_DECK_TYPES = new Set(['Token', 'Art Print', 'Promo', 'Full Art']);

function renderDeckPool() {
    const search = document.getElementById('deck-search').value.toLowerCase();
    const filterEnergy = document.getElementById('deck-filter-energy').value;
    const filterType = document.getElementById('deck-filter-type').value;
    const filterSubtype = (document.getElementById('deck-filter-subtype') || {}).value || '';
    const filterRarity = (document.getElementById('deck-filter-rarity') || {}).value || '';
    const filterEffectText = ((document.getElementById('deck-filter-effect-text') || {}).value || '').toLowerCase();
    const showOnlyOwned = (document.getElementById('deck-filter-owned') || {}).checked || false;

    let cards = allCards.filter(card => {
        if (!card.type) return false;
        if (EXCLUDED_DECK_TYPES.has(card.type)) return false;

        if (search && !card.name.toLowerCase().includes(search)) return false;
        if (filterEnergy && card.energy !== filterEnergy && card.energy2 !== filterEnergy) return false;
        if (filterType && card.type !== filterType) return false;
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
            if (targetSuffix !== undefined) {
                if (targetSuffix === '') {
                    if (getFolioSuffix(card.folio) !== '') return false;
                } else {
                    if (!(card.rarity_variants || []).includes(targetSuffix)) return false;
                }
            }
        }
        if (filterEffectText) {
            const effectText = (card.effect_text || '').toLowerCase();
            const costText = (card.cost_text || '').toLowerCase();
            if (!effectText.includes(filterEffectText) && !costText.includes(filterEffectText)) return false;
        }
        if (showOnlyOwned && !collection.has(card.folio)) return false;
        return true;
    });

    const grid = document.getElementById('deck-pool-grid');
    grid.innerHTML = cards.map(card => createCardElement(card, true)).join('');

    grid.querySelectorAll('.card-item').forEach((el, idx) => {
        el.addEventListener('click', () => {
            addToDeck(cards[idx].folio);
        });
    });
}

// ==================== COLLECTION DASHBOARD ====================

const RARITY_CONFIG = [
    { suffix: 'R',  label: 'Rara',       emoji: '💎', color: '#60a5fa' },
    { suffix: 'S',  label: 'Súper Rara', emoji: '⭐', color: '#a78bfa' },
    { suffix: 'U',  label: 'Ultra Rara', emoji: '🌟', color: '#f59e0b' },
    { suffix: 'K',  label: 'Kósmica',    emoji: '👑', color: '#f97316' },
    { suffix: 'UV', label: 'UV',         emoji: '✨', color: '#34d399' },
];

function getFolioSuffix(folio) {
    if (!folio) return '';
    const m = folio.match(/^[A-Z0-9]+-\d+([A-Z]*)$/);
    if (!m) return '';
    return m[1];
}

function computeSetStats() {
    const setData = {};

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

function renderHeroRing(pct) {
    const circumference = 2 * Math.PI * 50;
    const offset = circumference - (pct / 100) * circumference;
    const fill = document.getElementById('hero-ring-fill');
    if (fill) {
        fill.style.strokeDashoffset = offset;
        if (pct >= 100) fill.style.stroke = '#10b981';
        else if (pct >= 50) fill.style.stroke = '#f59e0b';
        else fill.style.stroke = '#ef4444';
    }
    const heroLbl = document.getElementById('hero-pct');
    if (heroLbl) heroLbl.textContent = pct + '%';
}

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

function renderRarityDonut() {
    const donut = document.getElementById('rarity-donut');
    const legend = document.getElementById('rarity-legend');
    if (!donut || !legend) return;

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

function renderMissingCardsAccordion(setStats) {
    const container = document.getElementById('missing-cards-accordion');
    if (!container) return;

    const setsWithCards = setStats.filter(s => s.total > 0);
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

function renderQuickStats(setStats) {
    const completeSets = setStats.filter(s => s.total > 0 && s.owned === s.total);
    const incompleteSets = setStats.filter(s => s.total > 0 && s.owned > 0 && s.owned < s.total);
    const withMissing = setStats.filter(s => s.total > 0 && s.owned < s.total);

    const qsComplete = document.getElementById('qs-complete-sets');
    if (qsComplete) qsComplete.textContent = completeSets.length;

    const qsBest = document.getElementById('qs-best-incomplete');
    if (qsBest) {
        if (incompleteSets.length > 0) {
            const best = incompleteSets[0];
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

function renderDashboard() {
    const setStats = computeSetStats();

    let baseOwned = 0;
    let variantOwned = 0;
    for (const folio of collection) {
        const suffix = getFolioSuffix(folio);
        if (suffix === '') baseOwned++;
        else variantOwned++;
    }

    const totalBase = allCards.length;

    let totalVariants = 0;
    for (const card of allCards) {
        const rv = card.rarity_variants || [];
        totalVariants += rv.length;
    }
    for (const card of allCards) {
        if (getFolioSuffix(card.folio) === 'UV') totalVariants++;
    }

    const totalAll = collection.size;
    const totalCards = totalBase + totalVariants;
    const pctAll = totalCards > 0 ? Math.round((totalAll / totalCards) * 100) : 0;
    const pctBase = totalBase > 0 ? Math.round((baseOwned / totalBase) * 100) : 0;

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

// ==================== THEME TOGGLE ====================
(function initTheme() {
    const STORAGE_KEY = 'kodem_theme';
    const htmlEl = document.documentElement;
    const toggleBtn = document.getElementById('theme-toggle');

    // Apply saved theme on load (before paint)
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    if (savedTheme === 'light') {
        htmlEl.setAttribute('data-theme', 'light');
        if (toggleBtn) toggleBtn.textContent = '☀️';
    } else {
        htmlEl.removeAttribute('data-theme');
        if (toggleBtn) toggleBtn.textContent = '🌙';
    }

    // Toggle handler
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function () {
            const isLight = htmlEl.getAttribute('data-theme') === 'light';
            if (isLight) {
                htmlEl.removeAttribute('data-theme');
                toggleBtn.textContent = '🌙';
                localStorage.setItem(STORAGE_KEY, 'dark');
            } else {
                htmlEl.setAttribute('data-theme', 'light');
                toggleBtn.textContent = '☀️';
                localStorage.setItem(STORAGE_KEY, 'light');
            }
        });
    }
})();
