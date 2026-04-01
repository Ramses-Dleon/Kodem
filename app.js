/**
 * Códice Kódem — app.js
 * 
 * Single-page application for browsing, collecting, and deck-building
 * with the Kódem Trading Card Game (786 cards, 22 sets).
 * 
 * Architecture:
 *   - Pure vanilla JS, no framework, no build step
 *   - State lives in module-level variables + localStorage
 *   - Views: Browser (default), Collection, Deck Builder
 *   - Data: cards.json (static), collection/decks/wantlist (localStorage)
 * 
 * Key localStorage keys:
 *   kodem_collection    — Set of owned folio IDs (JSON array)
 *   kodem_wantlist      — Set of wanted folio IDs (JSON array)
 *   kodem_decks         — Map of deck objects { name, cards[] }
 *   kodem_theme         — "dark" | "light"
 *   kodem_grid_size     — "small" | "medium" | "large"
 *   kodem_collection_order — Sort preference for collection view
 * 
 * Sync codes:
 *   KDM-xxx    — base64-encoded collection folios
 *   KDECK-xxx  — base64-encoded deck folios
 * 
 * @author Ramsés D'León
 * @version     3.0.0
 * @see https://github.com/Ramses-Dleon/Kodem
 */

// ==================== HTML ESCAPING ====================
/**
 * Escape HTML special characters to prevent XSS.
 */
function escHtml(s) {
    return String(s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#x27;');
}
/** Normalize string for accent-insensitive comparison (used by energy filters) */
function norm(s) { return (s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase(); }

// ==================== STATE ====================
let allCards = [];
let filteredCards = [];
let collection = new Set(); // Set of folio IDs
let wantList = new Set(JSON.parse(localStorage.getItem('kodem_wantlist') || '[]'));
let currentCollectionTab = 'collection';
let currentCollectionSort = 'set';
let collectionPage = 1;
let collectionOrder = JSON.parse(localStorage.getItem('kodem_collection_order') || '[]');
let decks = {}; // { deckId: { name, cards: [folio] } }
let currentDeck = null;
let setAliases = {}; // { alias: canonicalCode } e.g. { "TRWA": "LGRO" }
let setMetadata = []; // Full set info from set-aliases.json

// ==================== PAGINATION STATE ====================
let PAGE_SIZE = 50;
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
        // Variants are already included in cards.json as separate entries
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
    buildPrefixMap();
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

    // Route to view based on URL hash (from sinergias nav links)
    const hash = window.location.hash;
    if (hash === '#collection') {
        switchView('collection');
    } else if (hash === '#deck-builder') {
        switchView('deck-builder');
    } else if (hash === '#sinergias') {
        switchView('sinergias');
    } else if (hash === '#guide') {
        switchView('guide');
    } else if (hash === '#contact') {
        switchView('contact');
    }
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
                    collection = new Set(data.cards);
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
    try {
        localStorage.setItem('kodem_collection', JSON.stringify([...collection]));
    } catch(e) {
        if(e.name==='QuotaExceededError') showToast('⚠️ Almacenamiento lleno','error');
    }
}

function resolveFolio(folio) {
    // Direct exact-match lookups for compound folios
    const FOLIO_MAP = {
        'INMX-001': 'HOL-INMX-001', 'INMX-002': 'HOL-INMX-002',
        'KPRF-001': 'CONJ-KPRF-001', 'KPRF-002': 'CONJ-KPRF-002', 'KPRF-003': 'CONJ-KPRF-003', 'KPRF-004': 'CONJ-KPRF-004',
        'ODEM-001': 'CONJ-COMIC004-ODEM-001', 'ODEM-002': 'CONJ-COMIC004-ODEM-002',
        'NAVD-001': 'HOL-NAVD-001', 'NYPR-001': 'HOL-NYPR-001',
        'SNVL-001': 'HOL-SNVL-001', 'SNVL-002': 'HOL-SNVL-002',
    };
    if (FOLIO_MAP[folio]) return FOLIO_MAP[folio];

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
    const exported = new Date().toISOString().split('T')[0];
    const data = {
        version: 2,
        exported,
        collection: {
            total: collection.size,
            cards: [...collection].sort()
        },
        wantList: {
            total: wantList.size,
            cards: [...wantList].sort()
        },
        decks: decks
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kodem-backup-${exported}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast(`Backup exportado: ${collection.size} colección, ${wantList.size} want list, ${Object.keys(decks).length} mazos ✅`, 'success');
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
            <textarea id="sync-code-text" class="sync-textarea" readonly>${code}</textarea>
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
            <textarea id="sync-import-text" class="sync-textarea" placeholder="KDM-..."></textarea>
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
                // Strip trailing rarity suffix (S=Súper, R=Rara, U=Ultra, UV, ST, K)
                const base = f.replace(/(?:UV|ST\d*|[SRUK])$/, '');
                if (base !== f && validFolios.has(base)) { 
                    // Add base folio (so dashboard counts it) + original (so we know variant)
                    if (!seen.has(base)) { valid.push(base); seen.add(base); }
                    if (!seen.has(f)) { valid.push(f); seen.add(f); }
                    continue; 
                }
            }
            const invalid = folios.filter(f => !validFolios.has(f) && !validFolios.has(f.replace(/(?:UV|ST\d*|[SRUK])$/, ''))).length;
            
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

                // Detect format: v2 (full backup) vs v1/legacy (collection only)
                const isV2 = data.version >= 2 && data.collection;

                if (isV2) {
                    // ---- V2: Full backup (collection + want list + decks) ----
                    const collCards = (data.collection.cards || []).map(c => resolveFolio(c));
                    const wantCards = (data.wantList && data.wantList.cards || []).map(c => resolveFolio(c));
                    const importDecks = data.decks || {};

                    const parts = [];
                    if (collCards.length) parts.push(collCards.length + ' colección');
                    if (wantCards.length) parts.push(wantCards.length + ' want list');
                    if (Object.keys(importDecks).length) parts.push(Object.keys(importDecks).length + ' mazos');

                    const mode = await showChoice(
                        `Backup encontrado: ${parts.join(', ')}. ¿Qué deseas hacer?`,
                        [
                            { label: '🔄 Reemplazar todo', key: 'replace', className: 'btn-danger' },
                            { label: '➕ Agregar a existente', key: 'merge', className: 'btn-primary' }
                        ]
                    );
                    if (!mode) return;

                    if (mode === 'replace') {
                        collection = new Set(collCards);
                        collectionOrder = [...collCards];
                        wantList = new Set(wantCards);
                        decks = importDecks;
                    } else {
                        collCards.forEach(c => {
                            if (!collection.has(c)) { collection.add(c); collectionOrder.push(c); }
                        });
                        wantCards.forEach(c => wantList.add(c));
                        for (const [name, deck] of Object.entries(importDecks)) {
                            if (!decks[name]) decks[name] = deck;
                        }
                    }

                    saveCollection();
                    saveWantList();
                    saveDecks();
                    switchView('collection');
                    renderCollection();
                    showToast(`Backup restaurado: ${collection.size} colección, ${wantList.size} want list, ${Object.keys(decks).length} mazos ✅`, 'success');

                } else {
                    // ---- V1 / Legacy: collection only ----
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
                        collectionOrder = [...resolvedCards];
                    } else {
                        resolvedCards.forEach(c => {
                            if (!collection.has(c)) { collection.add(c); collectionOrder.push(c); }
                        });
                    }
                    saveCollection();
                    switchView('collection');
                    setTimeout(() => {
                        renderCollection();
                        showToast(`Colección actualizada: ${collection.size} cartas ✅`, 'success');
                    }, 300);
                }
            } catch (err) {
                showToast('Error leyendo archivo: ' + err.message, 'error');
            }
        };
        reader.readAsText(file);
    };
    input.click();
}

function loadDecks() {
    try {
        const stored = localStorage.getItem('kodem_decks');
        if (stored) {
            decks = JSON.parse(stored);
        }
    } catch(e) {
        console.warn('Decks corrupted, resetting', e);
        decks = {};
    }
}

function saveDecks() {
    try {
        localStorage.setItem('kodem_decks', JSON.stringify(decks));
    } catch(e) {
        if(e.name==='QuotaExceededError') showToast('⚠️ Almacenamiento lleno','error');
    }
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
    document.getElementById('filter-set').addEventListener('change', () => { currentPage = 1; updatePrefixFilter('filter-set', 'filter-prefix'); applyBrowserFilters(); });
    document.getElementById('filter-prefix')?.addEventListener('change', () => { currentPage = 1; applyBrowserFilters(); });
    document.getElementById('filter-type').addEventListener('change', () => { currentPage = 1; applyBrowserFilters(); });
    document.getElementById('filter-energy').addEventListener('change', () => { currentPage = 1; updateEnergyComboFilter('filter-energy', 'filter-energy-combo'); applyBrowserFilters(); });
    document.getElementById('filter-energy-combo')?.addEventListener('change', () => { currentPage = 1; applyBrowserFilters(); });
    document.getElementById('sort-by').addEventListener('change', () => { currentPage = 1; applyBrowserFilters(); });

    const filterSubtype = document.getElementById('filter-subtype');
    if (filterSubtype) filterSubtype.addEventListener('change', () => { currentPage = 1; applyBrowserFilters(); });
    const filterRarity = document.getElementById('filter-rarity');
    if (filterRarity) filterRarity.addEventListener('change', () => { currentPage = 1; applyBrowserFilters(); });
    const filterEffectText = document.getElementById('filter-effect-text');
    if (filterEffectText) filterEffectText.addEventListener('input', debounce(() => { currentPage = 1; applyBrowserFilters(); }, 300));

    // Page size selector
    const pageSizeSelect = document.getElementById('page-size-select');
    if (pageSizeSelect) {
        pageSizeSelect.addEventListener('change', () => {
            PAGE_SIZE = parseInt(pageSizeSelect.value, 10);
            currentPage = 1;
            renderBrowserPage();
        });
    }

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
        const prefixEl = document.getElementById('filter-prefix');
        if (prefixEl) { prefixEl.value = ''; prefixEl.style.display = 'none'; }
        document.getElementById('filter-type').value = '';
        document.getElementById('filter-energy').value = '';
        const comboEl = document.getElementById('filter-energy-combo');
        if (comboEl) { comboEl.value = ''; comboEl.style.display = 'none'; }
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
    document.getElementById('collection-search').addEventListener('input', debounce(() => { collectionPage = 1; renderCollection(); }, 300));
    document.getElementById('collection-filter').addEventListener('change', () => { collectionPage = 1; renderCollection(); });

    // Collection advanced filters
    const toggleColFilters = document.getElementById('toggle-collection-filters');
    if (toggleColFilters) {
        toggleColFilters.addEventListener('click', () => {
            const af = document.getElementById('collection-advanced-filters');
            if (af) {
                af.classList.toggle('show');
                toggleColFilters.textContent = af.classList.contains('show') ? '🔼 Filtros' : '🔽 Filtros';
            }
        });
    }
    ['collection-filter-set', 'collection-filter-type', 'collection-filter-energy', 'collection-filter-subtype', 'collection-filter-rarity', 'collection-sort', 'collection-filter-prefix'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('change', () => { collectionPage = 1; renderCollection(); });
    });
    const collEffText = document.getElementById('collection-filter-effect-text');
    if (collEffText) collEffText.addEventListener('input', debounce(() => { collectionPage = 1; renderCollection(); }, 300));
    document.getElementById('collection-filter-set')?.addEventListener('change', () => {
        updatePrefixFilter('collection-filter-set', 'collection-filter-prefix');
    });
    document.getElementById('collection-filter-energy')?.addEventListener('change', () => {
        updateEnergyComboFilter('collection-filter-energy', 'collection-filter-energy-combo');
    });
    document.getElementById('collection-filter-energy-combo')?.addEventListener('change', () => { collectionPage = 1; renderCollection(); });
    document.getElementById('clear-collection').addEventListener('click', clearCollection);
    document.getElementById('import-collection').addEventListener('click', importCollection);
    document.getElementById('export-collection').addEventListener('click', exportCollection);
    const syncExportBtn = document.getElementById('sync-export');
    if (syncExportBtn) syncExportBtn.addEventListener('click', generateSyncCode);
    const syncImportBtn = document.getElementById('sync-import');
    if (syncImportBtn) syncImportBtn.addEventListener('click', importSyncCode);

    // ==================== PULL BUTTON ====================
    const pullBtn = document.getElementById('pull-btn');
    if (pullBtn) pullBtn.addEventListener('click', async () => {
        pullBtn.textContent = '⏳ Pull...';
        try {
            let collOk = false, wantOk = false, decksOk = false;
            const oldCollSize = collection.size;
            const oldWantSize = wantList.size;
            const oldDeckCount = Object.keys(decks).length;

            // Pull collection — REPLACE local with server
            const collResp = await fetch('collection.json?t=' + Date.now());
            if (collResp.ok) {
                collOk = true;
                const data = await collResp.json();
                if (data.cards && Array.isArray(data.cards)) {
                    collection = new Set(data.cards);
                    collectionOrder = [...collection];
                    saveCollection();
                }
            }

            // Pull want list — REPLACE local with server
            try {
                const wantResp = await fetch('wantlist.json?t=' + Date.now());
                if (wantResp.ok) {
                    wantOk = true;
                    const data = await wantResp.json();
                    if (data.cards && Array.isArray(data.cards)) {
                        wantList = new Set(data.cards);
                        saveWantList();
                    }
                }
            } catch (wantErr) {
                console.error('Want list sync error:', wantErr);
            }

            // Pull decks — REPLACE local with server
            try {
                const decksResp = await fetch('decks.json?t=' + Date.now());
                if (decksResp.ok) {
                    decksOk = true;
                    const serverDecks = await decksResp.json();
                    decks = serverDecks;
                    saveDecks();
                }
            } catch (deckErr) {
                console.error('Decks sync error:', deckErr);
            }

            renderCollection();
            pullBtn.textContent = '✅ Pull';
            setTimeout(() => { pullBtn.textContent = '⬇️ Pull'; }, 2000);

            if (collOk || wantOk || decksOk) {
                const collDiff = collection.size - oldCollSize;
                const wantDiff = wantList.size - oldWantSize;
                const deckDiff = Object.keys(decks).length - oldDeckCount;
                const msg = `Pull: ${collection.size} colección (${collDiff >= 0 ? '+' : ''}${collDiff}), ${wantList.size} want list (${wantDiff >= 0 ? '+' : ''}${wantDiff}), ${Object.keys(decks).length} mazos (${deckDiff >= 0 ? '+' : ''}${deckDiff}) ✅`;
                showToast(msg, 'success');
            } else {
                showToast('⚠️ No se pudo conectar', 'error');
            }

        } catch (e) {
            pullBtn.textContent = '❌ Pull';
            setTimeout(() => { pullBtn.textContent = '⬇️ Pull'; }, 2000);
            console.error('Pull error:', e);
        }
    });

    // ==================== PUSH BUTTON ====================
    const pushBtn = document.getElementById('push-btn');
    if (pushBtn) pushBtn.addEventListener('click', () => {
        // Generate copy-paste sync messages for Telegram
        // Compact format: group folios by set prefix (SET:num1,num2,...)
        function compactFolios(folios) {
            const sorted = [...folios].sort();
            const groups = {};
            const specials = [];
            for (const f of sorted) {
                if (f.includes('CONJ') || f.includes('MINICONJ')) {
                    specials.push(f);
                } else {
                    const m = f.match(/^([A-Z]+-?[A-Z]*)-(.+)$/);
                    if (m) {
                        (groups[m[1]] = groups[m[1]] || []).push(m[2]);
                    } else {
                        specials.push(f);
                    }
                }
            }
            const lines = [];
            for (const prefix of Object.keys(groups).sort()) {
                lines.push(`${prefix}:${groups[prefix].join(',')}`);
            }
            if (specials.length) lines.push(`*:${specials.join(',')}`);
            return lines.join('\n');
        }

        const collCompact = compactFolios(collection);
        const wantCompact = compactFolios(wantList);

        // Build deck summaries
        const deckLines = [];
        for (const [id, deck] of Object.entries(decks)) {
            const parts = [];
            if (deck.mazo && deck.mazo.length) parts.push(`mazo:${deck.mazo.join(',')}`);
            if (deck.protector) parts.push(`prot:${deck.protector}`);
            if (deck.bio) parts.push(`bio:${deck.bio}`);
            if (deck.equips && deck.equips.length) parts.push(`equips:${deck.equips.join(',')}`);
            // Fallback: if no mazo but has cards[], use that
            if ((!deck.mazo || !deck.mazo.length) && deck.cards && deck.cards.length) {
                parts.push(`cards:${deck.cards.join(',')}`);
            }
            deckLines.push(`${id}|${deck.name || id}|${parts.join('|')}`);
        }

        // Build individual messages with prompts
        const messages = [];
        messages.push({
            label: 'Colección',
            text: `KSYNC collection.json (${collection.size} cartas):\n${collCompact}`
        });
        messages.push({
            label: 'Want List',
            text: `KSYNC wantlist.json (${wantList.size} cartas):\n${wantCompact}`
        });
        messages.push({
            label: 'Mazos',
            text: `KSYNC decks.json (${Object.keys(decks).length} mazos):\n${deckLines.join('\n')}`
        });

        // Show modal with tabs for each message
        const modal = document.createElement('div');
        modal.className = 'sync-modal-overlay';
        modal.innerHTML = `
            <div class="sync-modal" style="max-width:500px">
                <h3 style="font-family:'Cinzel',serif;color:#f59e0b;margin-bottom:12px">⬆️ Push a Logos</h3>
                <p style="color:#aaa;font-size:0.85rem;margin-bottom:12px">Copia y pega en Telegram. Cada botón copia un mensaje listo:</p>
                <div id="push-buttons" style="display:flex;flex-direction:column;gap:8px"></div>
                <hr style="border-color:#333;margin:12px 0">
                <button id="push-copy-all" style="background:#f59e0b;color:#000;border:none;padding:10px 20px;border-radius:8px;cursor:pointer;width:100%;font-weight:bold">📋 Copiar Todo</button>
                <button onclick="this.closest('.sync-modal-overlay').remove()" style="margin-top:6px;background:#333;color:#e0e0e0;border:none;padding:8px 20px;border-radius:8px;cursor:pointer;width:100%">Cerrar</button>
            </div>
        `;
        modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
        document.body.appendChild(modal);

        const btnContainer = document.getElementById('push-buttons');
        messages.forEach((msg, i) => {
            const btn = document.createElement('button');
            btn.style.cssText = 'background:#1a1a2e;color:#e0e0e0;border:1px solid #333;padding:10px 16px;border-radius:8px;cursor:pointer;text-align:left;font-size:0.9rem';
            btn.innerHTML = `<strong>${msg.label}</strong> <span style="color:#888;font-size:0.8rem">(click para copiar)</span>`;
            btn.addEventListener('click', () => {
                navigator.clipboard.writeText(msg.text).then(() => {
                    btn.innerHTML = `<strong>✅ ${msg.label}</strong> <span style="color:#4ade80;font-size:0.8rem">copiado</span>`;
                    setTimeout(() => {
                        btn.innerHTML = `<strong>${msg.label}</strong> <span style="color:#888;font-size:0.8rem">(click para copiar)</span>`;
                    }, 2000);
                });
            });
            btnContainer.appendChild(btn);
        });

        // Copy all in one message
        document.getElementById('push-copy-all').addEventListener('click', () => {
            const allText = messages.map(m => m.text).join('\n\n---\n\n');
            navigator.clipboard.writeText(allText).then(() => {
                const btn = document.getElementById('push-copy-all');
                btn.textContent = '✅ Todo copiado';
                setTimeout(() => { btn.textContent = '📋 Copiar Todo'; }, 2000);
            });
        });
    });

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
    document.getElementById('deck-filter-set')?.addEventListener('change', renderDeckPool);
    document.getElementById('deck-filter-energy').addEventListener('change', () => { updateEnergyComboFilter('deck-filter-energy', 'deck-filter-energy-combo'); renderDeckPool(); });
    document.getElementById('deck-filter-energy-combo')?.addEventListener('change', renderDeckPool);
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

    // Mobile arrow nav buttons
    const prevMobile = document.getElementById('modal-prev-mobile');
    const nextMobile = document.getElementById('modal-next-mobile');
    if (prevMobile) prevMobile.addEventListener('click', (e) => { e.stopPropagation(); navigateModal(-1); });
    if (nextMobile) nextMobile.addEventListener('click', (e) => { e.stopPropagation(); navigateModal(1); });

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
// Collection / Want List tab switching
function switchCollectionTab(tab) {
    currentCollectionTab = tab;
    collectionPage = 1;
    document.querySelectorAll('.collection-tab-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.tab === tab);
    });
    // Show/hide dashboard only for collection tab
    const dashboard = document.getElementById('collection-dashboard');
    if (tab === 'collection') {
        const hidden = localStorage.getItem('kodem_dashboard_hidden') === 'true';
        if (dashboard) dashboard.style.display = hidden ? 'none' : '';
    } else {
        if (dashboard) dashboard.style.display = 'none';
    }
    const toggleDash = document.getElementById('toggle-dashboard');
    if (toggleDash) toggleDash.style.display = tab === 'collection' ? '' : 'none';
    renderCollection();
}

// Deck builder mobile tab switching
function switchDeckTab(tab) {
    const layout = document.querySelector('.deck-builder-layout');
    if (layout) layout.dataset.activeTab = tab;
    document.querySelectorAll('.deck-tab-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.deckTab === tab);
    });
}

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
        'deck-builder': 'deck-builder-view',
        'sinergias': 'sinergias-view',
        'guide': 'guide-view',
        'contact': 'contact-view'
    };

    const el = document.getElementById(viewMap[view]);
    if (el) el.classList.add('active');

    if (view === 'browser') renderBrowserPage();
    else if (view === 'collection') renderCollection();
    else if (view === 'deck-builder') renderDeckBuilder();
    else if (view === 'sinergias') initSinergias();
}

// ==================== BROWSER VIEW ====================
function getSetDisplayName(code) {
    const meta = setMetadata.find(s => s.code === code);
    return meta ? `${code} — ${meta.name_es}` : code;
}

function populateSetFilter() {
    const sets = [...new Set(allCards.map(c => c.set))].sort();
    ['filter-set', 'collection-filter-set', 'deck-filter-set'].forEach(selectId => {
        const select = document.getElementById(selectId);
        if (!select) return;
        sets.forEach(set => {
            const option = document.createElement('option');
            option.value = set;
            option.textContent = getSetDisplayName(set);
            select.appendChild(option);
        });
    });
}

// Build prefix map: set → {prefix: count}
const _setPrefixMap = {};
function buildPrefixMap() {
    allCards.forEach(c => {
        const prefix = c.folio.split('-')[0];
        if (!_setPrefixMap[c.set]) _setPrefixMap[c.set] = {};
        _setPrefixMap[c.set][prefix] = (_setPrefixMap[c.set][prefix] || 0) + 1;
    });
}

function updatePrefixFilter(setSelectId, prefixSelectId) {
    const setVal = document.getElementById(setSelectId)?.value || '';
    const prefixSelect = document.getElementById(prefixSelectId);
    if (!prefixSelect) return;

    // Clear options
    while (prefixSelect.options.length > 1) prefixSelect.remove(1);
    prefixSelect.value = '';

    const prefixes = _setPrefixMap[setVal];
    if (setVal && prefixes && Object.keys(prefixes).length > 1) {
        Object.entries(prefixes).sort((a,b) => b[1]-a[1]).forEach(([prefix, count]) => {
            const opt = document.createElement('option');
            opt.value = prefix;
            opt.textContent = `${prefix} (${count})`;
            prefixSelect.appendChild(opt);
        });
        prefixSelect.style.display = '';
    } else {
        prefixSelect.style.display = 'none';
    }
}

/** Energy emoji lookup for combo labels */
const ENERGY_EMOJI_SHORT = {
    'Atlica':'💧','Pirica':'🔥','Gelida':'❄️','Litica':'🪨',
    'Chaaktica':'⚡','Huumica':'🌿','Demotica':'💀','Feral':'🐾'
};

/** Build and show/hide the energy combo sub-filter (like prefix for sets) */
function updateEnergyComboFilter(energySelectId, comboSelectId) {
    const energyVal = document.getElementById(energySelectId)?.value || '';
    const comboSelect = document.getElementById(comboSelectId);
    if (!comboSelect) return;

    // Clear options
    while (comboSelect.options.length > 1) comboSelect.remove(1);
    comboSelect.value = '';

    if (energyVal === '__combo__') {
        // Collect all unique combo energies from cards
        const combos = {};
        allCards.forEach(c => {
            const e = c.energy || '';
            if (e.includes('-')) {
                combos[e] = (combos[e] || 0) + 1;
            }
        });
        Object.entries(combos).sort((a,b) => b[1]-a[1]).forEach(([combo, count]) => {
            const parts = combo.split('-');
            const emojis = parts.map(p => ENERGY_EMOJI_SHORT[p] || '').join('');
            const opt = document.createElement('option');
            opt.value = combo;
            opt.textContent = `${emojis} ${parts.join(' + ')} (${count})`;
            comboSelect.appendChild(opt);
        });
        comboSelect.style.display = '';
    } else {
        comboSelect.style.display = 'none';
    }
}

function populateTypeFilter() {
    const types = [...new Set(allCards.map(c => c.type).filter(Boolean))].sort();
    const selects = ['filter-type', 'deck-filter-type', 'collection-filter-type'];
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
    // Extract unique subtype keywords, normalized (accent-insensitive, deduplicated)
    const subtypeKeywords = new Map(); // norm → display
    allCards.forEach(c => {
        if (!c.subtype) return;
        // Split compound subtypes into individual words, skip "Adendei" (it's the type, not subtype)
        c.subtype.split(/[\s\/]+/).forEach(word => {
            if (!word || word === 'Adendei') return;
            const n = norm(word);
            // Keep the accented version as display if available
            if (!subtypeKeywords.has(n) || word.length > subtypeKeywords.get(n).length) {
                subtypeKeywords.set(n, word);
            }
        });
    });
    const sortedKeywords = [...subtypeKeywords.entries()].sort((a, b) => a[1].localeCompare(b[1], 'es'));
    const selects = ['filter-subtype', 'deck-filter-subtype', 'collection-filter-subtype'];
    selects.forEach(selectId => {
        const select = document.getElementById(selectId);
        if (!select) return;
        while (select.options.length > 1) select.remove(1);
        sortedKeywords.forEach(([normKey, display]) => {
            const option = document.createElement('option');
            option.value = normKey; // normalized value for comparison
            option.textContent = display;
            select.appendChild(option);
        });
    });
}

function applyBrowserFilters() {
    const search = document.getElementById('search-input').value.toLowerCase();
    const filterSet = document.getElementById('filter-set').value;
    const filterPrefix = (document.getElementById('filter-prefix') || {}).value || '';
    const filterType = document.getElementById('filter-type').value;
    const filterEnergy = document.getElementById('filter-energy').value;
    const filterEnergyCombo = (document.getElementById('filter-energy-combo') || {}).value || '';
    const sortBy = document.getElementById('sort-by').value;
    const filterSubtype = (document.getElementById('filter-subtype') || {}).value || ''; // normalized keyword
    const filterRarity = (document.getElementById('filter-rarity') || {}).value || '';
    const filterEffectText = ((document.getElementById('filter-effect-text') || {}).value || '').toLowerCase();

    filteredCards = allCards.filter(card => {
        if (search && !card.name.toLowerCase().includes(search) && !(card.effect_text || '').toLowerCase().includes(search) && !card.folio.toLowerCase().includes(search)) return false;
        if (filterSet && card.set !== filterSet) return false;
        if (filterPrefix && !card.folio.startsWith(filterPrefix + '-')) return false;
        if (filterType && card.type !== filterType) return false;
        if (filterEnergy === '__combo__') {
            if (!(card.energy || '').includes('-')) return false;
            if (filterEnergyCombo && card.energy !== filterEnergyCombo) return false;
        } else if (filterEnergy && !norm(card.energy).split('-').includes(norm(filterEnergy)) && !norm(card.energy2 || '').split('-').includes(norm(filterEnergy))) return false;
        if (filterSubtype && !norm(card.subtype || '').split(/[\s\/]+/).some(w => norm(w) === filterSubtype)) return false;
        if (filterRarity) {
            // Map dropdown display values to card.rarity field values
            const rarityFieldMap = {
                'Común': 'Comun', 'Rara': 'Rara', 'Súper Rara': 'Super Rara',
                'Ultra Rara': 'Ultra Rara', 'Kósmica': 'Kosmica/Titanica',
                'Secreta': 'Secreta', 'Full Art': 'Full Art', 'Evento': 'Evento'
            };
            const targetRarity = rarityFieldMap[filterRarity];
            if (targetRarity === undefined) return true;
            if (card.rarity !== targetRarity) return false;
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
        if (sortBy === 'rarity') return (getFolioSuffix(a.folio) || '').localeCompare(getFolioSuffix(b.folio) || '');
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
                el.addEventListener('click', (e) => {
                    // Handle owned button clicks via delegation
                    if (e.target.closest('.card-owned-btn')) {
                        e.stopPropagation();
                        const btn = e.target.closest('.card-owned-btn');
                        const folio = btn.dataset.folio;
                        handleOwnedBtnClick(btn, folio);
                        return;
                    }
                    // Handle want button clicks via delegation
                    if (e.target.closest('.card-want-btn')) {
                        e.stopPropagation();
                        const btn = e.target.closest('.card-want-btn');
                        const folio = btn.dataset.folio;
                        handleWantBtnClick(btn, folio);
                        return;
                    }
                    openCardModal(filteredCards[absIdx], filteredCards, absIdx);
                });
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
        ? `<div class="card-effect-preview">${escHtml(card.effect_text.substring(0, 80))}${card.effect_text.length > 80 ? '…' : ''}</div>`
        : '';


    // ♥ owned button (stop propagation so it doesn't open modal)
    const ownedBtn = small ? '' : `<button class="card-owned-btn ${owned ? 'active' : ''}" data-folio="${escHtml(card.folio)}" title="${owned ? 'Quitar de Colección' : 'Agregar a Colección'}">♥</button>`;

    // 🎯 want button (stop propagation so it doesn't open modal)
    const wantBtn = small ? '' : `<button class="card-want-btn ${isWanted ? 'active' : ''}" data-folio="${escHtml(card.folio)}" title="${isWanted ? 'Quitar de Want List' : 'Agregar a Want List'}">🎯</button>`;

    // Rarity badge — based on card.rarity, not suffix
    const RARITY_BADGE = {
        'Rara': {label:'RARA', color:'#3b82f6'},
        'Super Rara': {label:'SÚPER', color:'#a855f7'},
        'Ultra Rara': {label:'ULTRA', color:'#f59e0b'},
        'Kosmica/Titanica': {label:'KÓSMICA', color:'#ef4444'},
        'Secreta': {label:'SECRETA', color:'#ec4899'},
        'Full Art': {label:'FULL ART', color:'#14b8a6'},
        'Evento': {label:'EVENTO', color:'#8b5cf6'},
    };
    const badge = RARITY_BADGE[card.rarity];
    const rarityBadge = badge ? `<span class="rarity-badge" style="background:${badge.color}">${badge.label}</span>` : '';

    return `
        <div class="card-item ${owned} ${wantedClass} ${inDeck}" data-folio="${escHtml(card.folio)}" data-energy="${escHtml(card.energy || '')}" data-rarity="${escHtml(card.rarity || '')}">
            <img src="${escHtml(card.image)}" alt="${escHtml(card.name)}" loading="lazy" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22280%22%3E%3Crect fill=%22%23333%22 width=%22200%22 height=%22280%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 fill=%22%23666%22 text-anchor=%22middle%22 dy=%22.3em%22%3ENo Image%3C/text%3E%3C/svg%3E'" />
            ${rarityBadge}
            ${ownedBtn}
            ${wantBtn}
            <div class="card-name">${escHtml(card.name)}</div>
            ${effectPreview}
        </div>
    `;
}

function saveWantList() {
    try {
        localStorage.setItem('kodem_wantlist', JSON.stringify([...wantList]));
    } catch(e) {
        if(e.name==='QuotaExceededError') showToast('⚠️ Almacenamiento lleno','error');
    }
}

function toggleWanted(folio) {
    if (wantList.has(folio)) wantList.delete(folio);
    else wantList.add(folio);
    saveWantList();
}

function handleOwnedBtnClick(btnEl, folio) {
    toggleOwned(folio);
    const isOwned = collection.has(folio);
    btnEl.classList.toggle('active', isOwned);
    btnEl.title = isOwned ? 'Quitar de Colección' : 'Agregar a Colección';
    // update parent card-item class
    const cardItem = btnEl.closest('.card-item');
    if (cardItem) cardItem.classList.toggle('owned', isOwned);
    if (currentCollectionTab === 'collection') renderCollection();
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
    'Átlica':    '💧',  'Atlica':    '💧',
    'Pírica':    '🔥',  'Pirica':    '🔥',
    'Gélida':    '❄️',  'Gelida':    '❄️',
    'Lítica':    '🪨',  'Litica':    '🪨',
    'Cháaktica': '⚡',  'Chaaktica': '⚡',
    'Húumica':   '🌿',  'Huumica':   '🌿',
    'Demótica':  '💀',  'Demotica':  '💀',
    'Feral':     '🐾',
    'Combinacion': '🔀',
};

/** CSS color map for energy (matches grid cards) — both accented and plain keys */
const ENERGY_COLOR = {
    'Átlica':    'var(--atlica)',   'Atlica':    'var(--atlica)',
    'Pírica':    'var(--pirica)',   'Pirica':    'var(--pirica)',
    'Gélida':    'var(--gelida)',   'Gelida':    'var(--gelida)',
    'Lítica':    'var(--litica)',   'Litica':    'var(--litica)',
    'Cháaktica': 'var(--chaaktica)','Chaaktica': 'var(--chaaktica)',
    'Húumica':   'var(--huumica)',  'Huumica':   'var(--huumica)',
    'Demótica':  'var(--demotica)', 'Demotica':  'var(--demotica)',
    'Feral':     'var(--feral)',
    'Combinacion': 'var(--accent-amber)',
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
    imgEl.onerror = function() {
        this.onerror = null;
        this.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='560' viewBox='0 0 400 560'%3E%3Crect fill='%231a1a2e' width='400' height='560' rx='12'/%3E%3Ctext x='200' y='240' fill='%23666' font-family='Cinzel,serif' font-size='20' text-anchor='middle'%3E🃏%3C/text%3E%3Ctext x='200' y='280' fill='%23888' font-family='Outfit,sans-serif' font-size='14' text-anchor='middle'%3EImagen no disponible%3C/text%3E%3Ctext x='200' y='310' fill='%23555' font-family='Outfit,sans-serif' font-size='12' text-anchor='middle'%3E" + (card.folio || '') + "%3C/text%3E%3C/svg%3E";
    };
    imgEl.src = card.image;
    imgEl.alt = card.name;

    // --- Energy color border on modal-content ---
    const primaryEnergy = (card.energy || '').split('-')[0];
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
    const RARITY_DISPLAY = { 'Comun': 'Común', 'Super Rara': 'Súper Rara', 'Kosmica/Titanica': 'Kósmica/Titánica' };
    document.getElementById('modal-card-rarity').textContent =
        RARITY_DISPLAY[card.rarity] || card.rarity || 'Común';

    // --- Type ---
    document.getElementById('modal-card-type').textContent =
        card.subtype ? `${card.type} - ${card.subtype}` : card.type;

    // --- Energy with emoji (supports dual/triple via hyphen-separated values) ---
    const rawParts = [card.energy, card.energy2].filter(Boolean).flatMap(e => e.split('-'));
    const energyParts = rawParts.map(e => {
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

    // --- Variants (same name, different sets) ---
    const variantsSection = document.getElementById('modal-variants-section');
    const variantsGrid = document.getElementById('modal-variants-grid');
    if (variantsSection && variantsGrid) {
        const variants = allCards.filter(c => c.name === card.name && c.folio !== card.folio);
        if (variants.length > 0) {
            variantsSection.style.display = 'block';
            variantsGrid.innerHTML = variants.map(v => {
                const isOwned = collection.has(v.folio);
                const classes = ['variant-thumb'];
                if (isOwned) classes.push('owned');
                return `<div class="${classes.join(' ')}" data-folio="${v.folio}" title="${v.folio} · ${getSetInfo(v.set)?.name_es || v.set}${isOwned ? ' ✅' : ''}">
                    <img src="${v.image}" alt="${v.name}" loading="lazy" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2264%22 height=%2290%22%3E%3Crect fill=%22%231a1a2e%22 width=%2264%22 height=%2290%22/%3E%3Ctext x=%2232%22 y=%2250%22 fill=%22%23666%22 font-size=%228%22 text-anchor=%22middle%22%3E🃏%3C/text%3E%3C/svg%3E'" />
                    <span class="variant-folio">${v.folio}</span>
                </div>`;
            }).join('');
            // Click handler: open that variant in the modal
            variantsGrid.querySelectorAll('.variant-thumb').forEach(thumb => {
                thumb.addEventListener('click', () => {
                    const v = allCards.find(c => c.folio === thumb.dataset.folio);
                    if (v) {
                        const varIdx = allCards.findIndex(c => c.folio === v.folio);
                        openCardModal(v, allCards, varIdx >= 0 ? varIdx : 0);
                    }
                });
            });
        } else {
            variantsSection.style.display = 'none';
            variantsGrid.innerHTML = '';
        }
    }

    // --- Nav buttons ---
    _updateModalNavButtons();

    modal.classList.add('active');
}

function _updateModalNavButtons() {
    const prevBtn = document.getElementById('modal-prev-btn');
    const nextBtn = document.getElementById('modal-next-btn');
    const prevMobile = document.getElementById('modal-prev-mobile');
    const nextMobile = document.getElementById('modal-next-mobile');
    const has = _modalCardList.length > 1;
    if (prevBtn) { prevBtn.style.display = has ? '' : 'none'; prevBtn.disabled = _modalCardIndex <= 0; }
    if (nextBtn) { nextBtn.style.display = has ? '' : 'none'; nextBtn.disabled = _modalCardIndex >= _modalCardList.length - 1; }
    if (prevMobile) { prevMobile.style.display = has ? '' : 'none'; prevMobile.disabled = _modalCardIndex <= 0; }
    if (nextMobile) { nextMobile.style.display = has ? '' : 'none'; nextMobile.disabled = _modalCardIndex >= _modalCardList.length - 1; }
}

function navigateModal(dir) {
    const idx = _modalCardIndex + dir;
    if (idx < 0 || idx >= _modalCardList.length) return;
    openCardModal(_modalCardList[idx], _modalCardList, idx);
}

function closeModal() {
    document.getElementById('card-modal').classList.remove('active');
}

// Swipe gesture navigation for modal
(function initModalSwipe() {
    let startX = 0;
    let startY = 0;
    let tracking = false;

    const modal = document.getElementById('card-modal');
    if (!modal) return;

    modal.addEventListener('touchstart', (e) => {
        // Only track single-finger swipes
        if (e.touches.length !== 1) return;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        tracking = true;
    }, { passive: true });

    modal.addEventListener('touchend', (e) => {
        if (!tracking) return;
        tracking = false;
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        const dx = endX - startX;
        const dy = endY - startY;

        // Must be mostly horizontal and at least 60px
        if (Math.abs(dx) < 60 || Math.abs(dy) > Math.abs(dx) * 0.7) return;

        if (dx < 0) {
            // Swipe left → next card
            navigateModal(1);
        } else {
            // Swipe right → previous card
            navigateModal(-1);
        }
    }, { passive: true });
})();

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
        // Reset filter to "all" so user doesn't see 609 "missing" cards
        const filterEl = document.getElementById('collection-filter');
        if (filterEl) filterEl.value = 'all';
        renderCollection();
        showToast('Colección limpiada 🗑️', 'info');
    }
}

function renderCollection() {
    const search = document.getElementById('collection-search').value.toLowerCase();
    const filter = document.getElementById('collection-filter').value;
    const sortEl = document.getElementById('collection-sort');
    const sort = sortEl ? sortEl.value : currentCollectionSort;
    currentCollectionSort = sort;

    // Advanced filters
    const filterSet = (document.getElementById('collection-filter-set')?.value || '');
    const filterPrefix = (document.getElementById('collection-filter-prefix')?.value || '');
    const filterType = (document.getElementById('collection-filter-type')?.value || '');
    const filterEnergy = (document.getElementById('collection-filter-energy')?.value || '');
    const filterEnergyCombo = (document.getElementById('collection-filter-energy-combo')?.value || '');
    const filterSubtype = (document.getElementById('collection-filter-subtype')?.value || '');
    const filterRarity = (document.getElementById('collection-filter-rarity')?.value || '');
    const filterEffectText = (document.getElementById('collection-filter-effect-text')?.value || '').toLowerCase();

    // Update tab count badges
    const ownedTabBtn = document.querySelector('.collection-tab-btn[data-tab="collection"]');
    const wantTabBtn  = document.querySelector('.collection-tab-btn[data-tab="wantlist"]');
    if (ownedTabBtn) { const b = ownedTabBtn.querySelector('.tab-count'); if (b) b.textContent = collection.size; }
    if (wantTabBtn)  { const b = wantTabBtn.querySelector('.tab-count');  if (b) b.textContent = wantList.size;  }

    let cards;

    // Shared filter logic for collection/wantlist
    function applyCollectionFilters(card) {
        if (search && !(card.name || '').toLowerCase().includes(search) && !(card.effect_text || '').toLowerCase().includes(search) && !card.folio.toLowerCase().includes(search)) return false;
        if (filterSet && card.set !== filterSet) return false;
        if (filterPrefix && !card.folio.startsWith(filterPrefix + '-')) return false;
        if (filterType && card.type !== filterType) return false;
        if (filterEnergy === '__combo__') {
            if (!(card.energy || '').includes('-')) return false;
            if (filterEnergyCombo && card.energy !== filterEnergyCombo) return false;
        } else if (filterEnergy && !norm(card.energy).split('-').includes(norm(filterEnergy))) return false;
        if (filterSubtype) {
            const sub = norm(card.subtype || '');
            const kw = norm(filterSubtype);
            if (!sub.includes(kw)) return false;
        }
        if (filterRarity) {
            const rarityFieldMap = { 'Común': 'Comun', 'Rara': 'Rara', 'Súper Rara': 'Super Rara', 'Ultra Rara': 'Ultra Rara', 'Kósmica': 'Kosmica/Titanica', 'Secreta': 'Secreta', 'Full Art': 'Full Art', 'Evento': 'Evento' };
            const targetRarity = rarityFieldMap[filterRarity];
            if (targetRarity && card.rarity !== targetRarity) return false;
        }
        if (filterEffectText) {
            const et = (card.effect_text || '').toLowerCase();
            const ct = (card.cost_text || '').toLowerCase();
            if (!et.includes(filterEffectText) && !ct.includes(filterEffectText)) return false;
        }
        return true;
    }

    if (currentCollectionTab === 'wantlist') {
        cards = allCards.filter(card => {
            if (!wantList.has(card.folio)) return false;
            return applyCollectionFilters(card);
        });
    } else {
        cards = allCards.filter(card => {
            const isOwned = collection.has(card.folio);
            if (filter === 'owned' && !isOwned) return false;
            if (filter === 'missing' && isOwned) return false;
            return applyCollectionFilters(card);
        });
    }

    // Sort
    cards = sortCollectionCards(cards, sort);

    // Counter and grid
    const counter = document.getElementById('collection-counter');
    const grid = document.getElementById('collection-grid');

    // Empty state guard
    if (cards.length === 0) {
        if (counter) counter.textContent = '0 cartas';
        if (grid) grid.innerHTML = '<div class="empty-state"><span class="empty-state-emoji">🔍</span><p>No se encontraron cartas</p></div>';
        document.getElementById('collection-pagination').innerHTML = '';
        if (currentCollectionTab === 'collection') renderDashboard();
        return;
    }

    // Pagination
    const perPage = 50;
    const totalPages = Math.max(1, Math.ceil(cards.length / perPage));
    if (collectionPage > totalPages) collectionPage = totalPages;
    if (collectionPage < 1) collectionPage = 1;
    const start = (collectionPage - 1) * perPage;
    const pageCards = cards.slice(start, start + perPage);

    grid.innerHTML = pageCards.map(card => createCardElement(card)).join('');

    // Add click listeners
    grid.querySelectorAll('.card-item').forEach((el, idx) => {
        el.addEventListener('click', (e) => {
            if (e.target.closest('.card-owned-btn')) {
                e.stopPropagation();
                const btn = e.target.closest('.card-owned-btn');
                handleOwnedBtnClick(btn, btn.dataset.folio);
                return;
            }
            if (e.target.closest('.card-want-btn')) {
                e.stopPropagation();
                const btn = e.target.closest('.card-want-btn');
                handleWantBtnClick(btn, btn.dataset.folio);
                return;
            }
            openCardModal(pageCards[idx], cards, start + idx);
        });
    });

    // Counter
    if (counter) {
        counter.textContent = `Mostrando ${start + 1}–${Math.min(start + perPage, cards.length)} de ${cards.length} cartas`;
    }

    // Pagination controls
    renderCollectionPagination(totalPages);

    // Update dashboard only when on main collection tab
    if (currentCollectionTab === 'collection') renderDashboard();
}

function renderCollectionPagination(totalPages) {
    const container = document.getElementById('collection-pagination');
    if (!container) return;
    if (totalPages <= 1) { container.innerHTML = ''; return; }

    let html = '';
    html += `<button class="page-btn ${collectionPage === 1 ? 'disabled' : ''}" data-colpage="${collectionPage - 1}" ${collectionPage === 1 ? 'disabled' : ''}>‹</button>`;

    const delta = 2;
    const range = [];
    for (let p = Math.max(1, collectionPage - delta); p <= Math.min(totalPages, collectionPage + delta); p++) {
        range.push(p);
    }
    if (range[0] > 1) {
        html += `<button class="page-btn" data-colpage="1">1</button>`;
        if (range[0] > 2) html += `<span class="page-ellipsis">…</span>`;
    }
    for (const p of range) {
        html += `<button class="page-btn ${p === collectionPage ? 'active' : ''}" data-colpage="${p}">${p}</button>`;
    }
    if (range[range.length - 1] < totalPages) {
        if (range[range.length - 1] < totalPages - 1) html += `<span class="page-ellipsis">…</span>`;
        html += `<button class="page-btn" data-colpage="${totalPages}">${totalPages}</button>`;
    }
    html += `<button class="page-btn ${collectionPage === totalPages ? 'disabled' : ''}" data-colpage="${collectionPage + 1}" ${collectionPage === totalPages ? 'disabled' : ''}>›</button>`;

    container.innerHTML = html;
    container.querySelectorAll('.page-btn[data-colpage]').forEach(btn => {
        btn.addEventListener('click', () => {
            const p = parseInt(btn.dataset.colpage);
            if (p >= 1 && p <= totalPages) {
                collectionPage = p;
                renderCollection();
                document.getElementById('collection-grid').scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
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

    // Resolve and validate folios
    const resolved = folios.map(f => resolveFolio(f)).filter(f => allCards.some(c => c.folio === f));
    if (resolved.length < folios.length) {
        showToast(`⚠️ ${folios.length - resolved.length} cartas no reconocidas`, 'warning');
    }

    // Create a new deck with the imported cards
    const id = Date.now().toString();
    const name = 'Mazo Compartido';
    decks[id] = { name, cards: resolved };
    currentDeck = id;
    saveDecks();

    showToast(`Mazo importado desde URL: ${folios.length} cartas`, 'success');
    // Use setTimeout to ensure DOM is ready after init
    setTimeout(() => {
        switchView('deck-builder');
        renderDeckBuilder();
    }, 100);
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
    saveDecks();
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
                // Resolve and validate folios
                const resolved = cards.map(f => resolveFolio(f)).filter(f => allCards.some(c => c.folio === f));
                if (resolved.length < cards.length) {
                    showToast(`⚠️ ${cards.length - resolved.length} cartas no reconocidas`, 'warning');
                }
                const id = Date.now().toString();
                decks[id] = { name, cards: resolved };
                currentDeck = id;
                saveDecks();
                renderDeckBuilder();
                showToast(`Mazo "${name}" importado (${resolved.length} cartas) ✅`, 'success');
            } catch (err) { showToast('Error leyendo archivo: ' + err.message, 'error'); }
        };
        reader.readAsText(file);
    };
    input.click();
}

function generateDeckSyncCode() {
    if (!currentDeck) { showToast('Selecciona un mazo primero', 'error'); return; }
    const deck = decks[currentDeck];
    const data = { n: deck.name, c: deck.cards };
    // Include support slots if present
    if (deck.protector) data.p = deck.protector;
    if (deck.protector_suplente) data.ps = deck.protector_suplente;
    if (deck.bio) data.b = deck.bio;
    if (deck.rava) data.r = deck.rava;
    if (deck.equips && deck.equips.length) data.e = deck.equips;
    const payload = JSON.stringify(data);
    const totalCards = deck.cards.length + (data.p ? 1 : 0) + (data.ps ? 1 : 0) + (data.b ? 1 : 0) + (data.r ? 1 : 0) + (data.e ? data.e.length : 0);
    const code = 'KDECK-' + btoa(unescape(encodeURIComponent(payload)));
    if (navigator.clipboard) {
        navigator.clipboard.writeText(code).then(() => {
            showToast(`Código del mazo copiado (${totalCards} cartas) 📋`, 'success');
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
            <textarea id="deck-sync-text" class="sync-textarea" placeholder="KDECK-..."></textarea>
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
            const decoded = decodeURIComponent(escape(atob(code.substring(6))));
            let name = 'Mazo Importado';
            let cards = [];
            // Try JSON format first {n:"name", c:[folios]}
            try {
                const data = JSON.parse(decoded);
                name = data.n || name;
                cards = data.c || [];
            } catch (_) {
                // Fallback: comma-separated folios
                cards = decoded.split(',').map(f => f.trim()).filter(Boolean);
            }
            if (cards.length === 0) { showToast('Código vacío — no tiene cartas', 'error'); return; }
            const id = Date.now().toString();
            const newDeck = { name, cards };
            // Import support slots if present (KDECK v2 format)
            try {
                const data = JSON.parse(decodeURIComponent(escape(atob(code.substring(6)))));
                if (data.p) newDeck.protector = data.p;
                if (data.ps) newDeck.protector_suplente = data.ps;
                if (data.b) newDeck.bio = data.b;
                if (data.r) newDeck.rava = data.r;
                if (data.e && Array.isArray(data.e)) newDeck.equips = data.e;
            } catch (_) { /* old format, no support slots */ }
            decks[id] = newDeck;
            currentDeck = id;
            saveDecks();
            renderDeckBuilder();
            modal.remove();
            showToast(`Mazo "${name}" importado (${cards.length} cartas) ✅`, 'success');
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
    const deckEntries = Object.entries(decks);

    container.innerHTML = deckEntries.map(([id, deck], idx) => `
        <div class="deck-item ${currentDeck === id ? 'active' : ''}" data-deck-id="${id}">
            <span class="deck-item-name">${deck.name} (${deck.cards.length})${deck.stats ? ` · ${deck.stats.wr}% WR` : ''}</span>
            <span class="deck-item-arrows">
                <button class="deck-order-btn" data-dir="up" data-id="${id}" title="Subir" ${idx === 0 ? 'disabled' : ''}>▲</button>
                <button class="deck-order-btn" data-dir="down" data-id="${id}" title="Bajar" ${idx === deckEntries.length - 1 ? 'disabled' : ''}>▼</button>
            </span>
        </div>
    `).join('');

    container.querySelectorAll('.deck-item-name').forEach(el => {
        el.addEventListener('click', () => {
            currentDeck = el.parentElement.dataset.deckId;
            renderDeckBuilder();
        });
    });

    container.querySelectorAll('.deck-order-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            reorderDeckList(btn.dataset.id, btn.dataset.dir);
        });
    });
}

function reorderDeckList(deckId, dir) {
    const keys = Object.keys(decks);
    const idx = keys.indexOf(deckId);
    if (dir === 'up' && idx > 0) {
        [keys[idx], keys[idx - 1]] = [keys[idx - 1], keys[idx]];
    } else if (dir === 'down' && idx < keys.length - 1) {
        [keys[idx], keys[idx + 1]] = [keys[idx + 1], keys[idx]];
    } else return;
    const reordered = {};
    keys.forEach(k => { reordered[k] = decks[k]; });
    decks = reordered;
    saveDecks();
    renderDeckList();
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
        updateDeckValidation();
        return;
    }

    // Build full card list: mazo cards + structured slots (protector, suplente, bio, rava, equips)
    const allFolios = [...deck.cards];
    // Add structured slots that live outside deck.cards
    for (const slot of [deck.protector, deck.protector_suplente, deck.bio, deck.rava]) {
        if (slot && !allFolios.includes(slot)) allFolios.push(slot);
    }
    for (const eq of (deck.equips || [])) {
        if (eq && !allFolios.includes(eq)) allFolios.push(eq);
    }
    const cards = allFolios.map(folio => allCards.find(c => c.folio === folio)).filter(Boolean);

    // Separate by type: mazo (Adendei/Rava/Espectro) vs support (Protector/Bio/Ixim/Rot)
    const mazoTypes = new Set(['Adendei', 'Rava', 'Espectro']);
    const mazoCards = [];
    const supportCards = [];
    cards.forEach(card => {
        if (mazoTypes.has(card.type)) mazoCards.push(card);
        else supportCards.push(card);
    });

    let html = '';

    // ── Mazo section: grouped in tercias of 3 ──
    if (mazoCards.length > 0) {
        html += '<div class="deck-section-label" onclick="toggleDeckSection(\'mazo\')">📦 Mazo <span class="deck-section-count">' + mazoCards.length + ' cartas</span> <span class="collapse-icon" id="mazo-collapse">▼</span></div>';
        html += '<div class="tercia-grid" id="mazo-section">';
        for (let i = 0; i < mazoCards.length; i += 3) {
            const terciaNum = Math.floor(i / 3) + 1;
            const terciaCards = mazoCards.slice(i, i + 3);
            const isFirst = i === 0;
            const isLast = i + 3 >= mazoCards.length;
            html += `<div class="tercia-row" data-tercia="${terciaNum}">`;
            html += `<div class="tercia-header" onclick="toggleTercia(${terciaNum})"><span class="tercia-label-text">T${terciaNum}</span><span class="tercia-collapse-icon" id="tercia-icon-${terciaNum}">▼</span></div>`;
            html += `<div class="tercia-body" id="tercia-body-${terciaNum}">`;
            html += `<div class="tercia-cards-row">`;
            terciaCards.forEach((card, j) => {
                const globalIdx = i + j;
                const inCollection = collection.has(card.folio);
                html += `
                    <div class="tercia-card-slot">
                        <div class="card-item small ${inCollection ? '' : 'not-owned'}" data-folio="${card.folio}" data-deck-idx="${globalIdx}" data-rarity="${escHtml(card.rarity || '')}" title="${card.name}${inCollection ? '' : ' ⚠️ No la tienes'}">
                            <img src="${card.image}" alt="${card.name}" loading="lazy" />
                            ${inCollection ? '' : '<span class="deck-not-owned-badge">⚠️</span>'}
                            <button class="remove-from-deck" data-folio="${card.folio}" style="position:absolute;top:2px;right:2px;background:var(--accent-crimson);color:white;border:none;border-radius:50%;width:20px;height:20px;cursor:pointer;font-size:12px;">×</button>
                        </div>
                        <div class="card-reorder-btns">
                            <button class="reorder-btn" data-dir="up" data-idx="${globalIdx}" title="Mover arriba" ${globalIdx === 0 ? 'disabled' : ''}>▲</button>
                            <button class="reorder-btn" data-dir="down" data-idx="${globalIdx}" title="Mover abajo" ${globalIdx >= mazoCards.length - 1 ? 'disabled' : ''}>▼</button>
                        </div>
                    </div>`;
            });
            html += `</div>`; // tercia-cards-row

            // Tercia row move buttons
            html += `<div class="tercia-row-btns">`;
            html += `<button class="tercia-move-btn" data-tdir="up" data-tidx="${i}" title="Subir tercia" ${isFirst ? 'disabled' : ''}>⬆️</button>`;
            html += `<button class="tercia-move-btn" data-tdir="down" data-tidx="${i}" title="Bajar tercia" ${isLast ? 'disabled' : ''}>⬇️</button>`;
            html += `</div>`;
            html += `</div>`; // tercia-body
            html += `</div>`; // tercia-row
        }
        html += '</div>'; // tercia-grid
    }

    // ── Support section: Protector, Bio, Equips ──
    if (supportCards.length > 0) {
        html += '<div class="deck-section-label" style="margin-top:12px;" onclick="toggleDeckSection(\'soporte\')">🛡️ Soporte <span class="deck-section-count">' + supportCards.length + ' cartas</span> <span class="collapse-icon" id="soporte-collapse">▼</span></div>';
        html += '<div class="support-grid" id="soporte-section">';
        supportCards.forEach(card => {
            const inCollection = collection.has(card.folio);
            const typeLabel = card.type === 'Ixim' ? '🌽' : card.type === 'Rot' ? '🪨' : card.type === 'Protector' ? '🛡️' : card.type === 'Bio' ? '🌿' : '';
            html += `
                <div class="card-item small ${inCollection ? '' : 'not-owned'}" data-folio="${card.folio}" data-rarity="${escHtml(card.rarity || '')}" title="${typeLabel} ${card.name}${inCollection ? '' : ' ⚠️ No la tienes'}">
                    <img src="${card.image}" alt="${card.name}" loading="lazy" />
                    ${inCollection ? '' : '<span class="deck-not-owned-badge">⚠️</span>'}
                    <span class="support-type-badge">${typeLabel}</span>
                    <button class="remove-from-deck" data-folio="${card.folio}" style="position:absolute;top:2px;right:2px;background:var(--accent-crimson);color:white;border:none;border-radius:50%;width:20px;height:20px;cursor:pointer;font-size:12px;">×</button>
                </div>`;
        });
        html += '</div>';
    }

    deckCardsEl.innerHTML = html;

    // ── Event listeners ──

    // Remove card
    deckCardsEl.querySelectorAll('.remove-from-deck').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            removeFromDeck(btn.dataset.folio);
        });
    });

    // Open modal (skip if tap landed on a remove/reorder button)
    deckCardsEl.querySelectorAll('.card-item').forEach((el) => {
        el.addEventListener('click', (e) => {
            if (e.target.closest('.remove-from-deck, .reorder-btn, .tercia-move-btn')) return;
            const folio = el.dataset.folio;
            const card = allCards.find(c => c.folio === folio);
            if (card) openCardModal(card, cards, cards.indexOf(card));
        });
    });

    // Individual card reorder (▲/▼)
    deckCardsEl.querySelectorAll('.reorder-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const idx = parseInt(btn.dataset.idx);
            const dir = btn.dataset.dir;
            reorderDeckCard(idx, dir);
        });
    });

    // Tercia row move (⬆️/⬇️ — moves 3 cards at once)
    deckCardsEl.querySelectorAll('.tercia-move-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const startIdx = parseInt(btn.dataset.tidx);
            const dir = btn.dataset.tdir;
            reorderTercia(startIdx, dir);
        });
    });

    updateDeckValidation();
}

// ── Collapse/expand pool filters ──

function togglePoolFilters() {
    const el = document.getElementById('pool-filters');
    const icon = document.getElementById('pool-filter-icon');
    if (!el) return;
    if (el.style.display === 'none') {
        el.style.display = '';
        if (icon) icon.textContent = '▼';
    } else {
        el.style.display = 'none';
        if (icon) icon.textContent = '▶ Filtros';
    }
}

// Auto-collapse pool filters on mobile
if (window.innerWidth <= 768) {
    document.addEventListener('DOMContentLoaded', () => {
        const el = document.getElementById('pool-filters');
        const icon = document.getElementById('pool-filter-icon');
        if (el) el.style.display = 'none';
        if (icon) icon.textContent = '▶ Filtros';
    });
}

// ── Collapse/expand individual tercias ──

function toggleTercia(num) {
    const body = document.getElementById('tercia-body-' + num);
    const icon = document.getElementById('tercia-icon-' + num);
    if (!body) return;
    if (body.style.display === 'none') {
        body.style.display = '';
        if (icon) icon.textContent = '▼';
    } else {
        body.style.display = 'none';
        if (icon) icon.textContent = '▶';
    }
}

// ── Collapse/expand deck sections ──

function toggleDeckSection(section) {
    const el = document.getElementById(section + '-section');
    const icon = document.getElementById(section + '-collapse');
    if (!el) return;
    if (el.style.display === 'none') {
        el.style.display = '';
        if (icon) icon.textContent = '▼';
    } else {
        el.style.display = 'none';
        if (icon) icon.textContent = '▶';
    }
}

// ── Reorder helpers ──

function reorderDeckCard(idx, dir) {
    if (!currentDeck) return;
    const deck = decks[currentDeck];
    const cards = deck.cards;
    // Find boundaries of mazo cards (Adendei/Rava/Espectro)
    const mazoTypes = new Set(['Adendei', 'Rava', 'Espectro']);
    const mazoFolios = cards.filter(f => {
        const c = allCards.find(x => x.folio === f);
        return c && mazoTypes.has(c.type);
    });
    // idx is relative to mazo cards
    if (dir === 'up' && idx > 0) {
        // Find actual positions in deck.cards array
        const posA = cards.indexOf(mazoFolios[idx]);
        const posB = cards.indexOf(mazoFolios[idx - 1]);
        [cards[posA], cards[posB]] = [cards[posB], cards[posA]];
    } else if (dir === 'down' && idx < mazoFolios.length - 1) {
        const posA = cards.indexOf(mazoFolios[idx]);
        const posB = cards.indexOf(mazoFolios[idx + 1]);
        [cards[posA], cards[posB]] = [cards[posB], cards[posA]];
    }
    saveDecks();
    renderDeckWorkspace();
}

function reorderTercia(startIdx, dir) {
    if (!currentDeck) return;
    const deck = decks[currentDeck];
    const cards = deck.cards;
    const mazoTypes = new Set(['Adendei', 'Rava', 'Espectro']);
    const mazoFolios = cards.filter(f => {
        const c = allCards.find(x => x.folio === f);
        return c && mazoTypes.has(c.type);
    });
    
    const terciaSize = Math.min(3, mazoFolios.length - startIdx);
    
    if (dir === 'up' && startIdx >= 3) {
        // Swap this tercia with the one above (swap 3 cards with 3 cards)
        for (let i = 0; i < terciaSize; i++) {
            const posA = cards.indexOf(mazoFolios[startIdx + i]);
            const posB = cards.indexOf(mazoFolios[startIdx - 3 + i]);
            [cards[posA], cards[posB]] = [cards[posB], cards[posA]];
        }
    } else if (dir === 'down' && startIdx + 3 < mazoFolios.length) {
        const nextSize = Math.min(3, mazoFolios.length - startIdx - 3);
        for (let i = 0; i < Math.min(terciaSize, nextSize); i++) {
            const posA = cards.indexOf(mazoFolios[startIdx + i]);
            const posB = cards.indexOf(mazoFolios[startIdx + 3 + i]);
            [cards[posA], cards[posB]] = [cards[posB], cards[posA]];
        }
    }
    saveDecks();
    renderDeckWorkspace();
}

function updateDeckValidation() {
    if (!currentDeck) return;

    const deck = decks[currentDeck];
    // Include structured slots (protector, suplente, bio, rava, equips) for validation counts
    const allFolios = [...deck.cards];
    for (const slot of [deck.protector, deck.protector_suplente, deck.bio, deck.rava]) {
        if (slot && !allFolios.includes(slot)) allFolios.push(slot);
    }
    for (const eq of (deck.equips || [])) {
        if (eq && !allFolios.includes(eq)) allFolios.push(eq);
    }
    const cards = allFolios.map(folio => allCards.find(c => c.folio === folio)).filter(Boolean);

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
            card.energy.split('-').forEach(e => { energyDist[e] = (energyDist[e] || 0) + 1; });
        }
        if (card.energy2) {
            card.energy2.split('-').forEach(e => { energyDist[e] = (energyDist[e] || 0) + 1; });
        }

        if (card.damage != null && (card.type === 'Adendei' || card.type === 'Rava')) {
            totalDamage += card.damage;
            damageCount++;
        }
        if (card.rests != null && (card.type === 'Adendei' || card.type === 'Rava')) {
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

    // Not-owned warning
    const notOwnedCount = cards.filter(c => !collection.has(c.folio)).length;
    let notOwnedEl = document.getElementById('val-not-owned');
    if (!notOwnedEl) {
        notOwnedEl = document.createElement('div');
        notOwnedEl.id = 'val-not-owned';
        notOwnedEl.className = 'validation-warning';
        document.querySelector('#val-total')?.parentElement?.appendChild(notOwnedEl);
    }
    if (notOwnedCount > 0) {
        notOwnedEl.innerHTML = `⚠️ <strong>${notOwnedCount} carta${notOwnedCount > 1 ? 's' : ''}</strong> no está${notOwnedCount > 1 ? 'n' : ''} en tu colección`;
        notOwnedEl.style.display = '';
    } else {
        notOwnedEl.style.display = 'none';
    }

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
    saveDecks();
}

function removeFromDeck(folio) {
    if (!currentDeck) return;

    const deck = decks[currentDeck];
    deck.cards = deck.cards.filter(f => f !== folio);

    renderDeckWorkspace();
    renderDeckPool();
    saveDecks();
}

const EXCLUDED_DECK_TYPES = new Set(['Token', 'Art Print', 'Promo', 'Full Art']);

function renderDeckPool() {
    const search = document.getElementById('deck-search').value.toLowerCase();
    const filterSet = (document.getElementById('deck-filter-set') || {}).value || '';
    const filterEnergy = document.getElementById('deck-filter-energy').value;
    const filterEnergyCombo = (document.getElementById('deck-filter-energy-combo') || {}).value || '';
    const filterType = document.getElementById('deck-filter-type').value;
    const filterSubtype = (document.getElementById('deck-filter-subtype') || {}).value || '';
    const filterRarity = (document.getElementById('deck-filter-rarity') || {}).value || '';
    const filterEffectText = ((document.getElementById('deck-filter-effect-text') || {}).value || '').toLowerCase();
    const showOnlyOwned = (document.getElementById('deck-filter-owned') || {}).checked || false;

    let cards = allCards.filter(card => {
        if (!card.type) return false;
        if (EXCLUDED_DECK_TYPES.has(card.type)) return false;

        if (search && !card.name.toLowerCase().includes(search) && !(card.effect_text || '').toLowerCase().includes(search) && !card.folio.toLowerCase().includes(search)) return false;
        if (filterSet && card.set !== filterSet) return false;
        if (filterEnergy === '__combo__') {
            if (!(card.energy || '').includes('-')) return false;
            if (filterEnergyCombo && card.energy !== filterEnergyCombo) return false;
        } else if (filterEnergy && !norm(card.energy).split('-').includes(norm(filterEnergy)) && !norm(card.energy2 || '').split('-').includes(norm(filterEnergy))) return false;
        if (filterType && card.type !== filterType) return false;
        if (filterSubtype && !norm(card.subtype || '').split(/[\s\/]+/).some(w => norm(w) === filterSubtype)) return false;
        if (filterRarity) {
            const rarityFieldMap = {
                'Común': 'Comun', 'Rara': 'Rara', 'Súper Rara': 'Super Rara',
                'Ultra Rara': 'Ultra Rara', 'Kósmica': 'Kosmica/Titanica',
                'Secreta': 'Secreta', 'Full Art': 'Full Art', 'Evento': 'Evento'
            };
            const targetRarity = rarityFieldMap[filterRarity];
            if (targetRarity && card.rarity !== targetRarity) return false;
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
    { suffix: 'ST', label: 'Secreta',    emoji: '🔮', color: '#ec4899' },
    { suffix: 'UV', label: 'UV',         emoji: '✨', color: '#34d399' },
];

function getFolioSuffix(folio) {
    if (!folio) return '';
    // Handle special suffixes: ST1, ST2, etc.
    const st = folio.match(/^[A-Z0-9]+-ST\d+$/);
    if (st) return 'ST';
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
            const displayName = `${s.code} — ${s.name}`;
            g += `
                <div class="set-bar-row">
                    <div class="set-bar-name" title="${displayName}">${displayName}</div>
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

const RARITY_DONUT_CONFIG = [
    { rarity: 'Comun',            label: 'Común',            emoji: '⚪', color: '#6b7280' },
    { rarity: 'Rara',             label: 'Rara',             emoji: '💎', color: '#60a5fa' },
    { rarity: 'Super Rara',       label: 'Súper Rara',       emoji: '⭐', color: '#a78bfa' },
    { rarity: 'Ultra Rara',       label: 'Ultra Rara',       emoji: '🌟', color: '#f59e0b' },
    { rarity: 'Kosmica/Titanica', label: 'Kósmica/Titánica', emoji: '👑', color: '#f97316' },
    { rarity: 'Full Art',         label: 'Full Art',         emoji: '🎨', color: '#34d399' },
    { rarity: 'Secreta',          label: 'Secreta',          emoji: '🔮', color: '#ec4899' },
    { rarity: 'Evento',           label: 'Evento',           emoji: '🎪', color: '#fb923c' },
];

function renderRarityDonut() {
    const donut = document.getElementById('rarity-donut');
    const legend = document.getElementById('rarity-legend');
    if (!donut || !legend) return;

    // Build a folio→rarity lookup
    const cardRarity = {};
    for (const card of allCards) cardRarity[card.folio] = card.rarity || 'Comun';

    // Count owned cards by rarity field
    const counts = {};
    for (const rc of RARITY_DONUT_CONFIG) counts[rc.rarity] = 0;

    for (const folio of collection) {
        const r = cardRarity[folio] || 'Comun';
        if (counts.hasOwnProperty(r)) counts[r]++;
        else counts['Comun']++;
    }

    const total = Object.values(counts).reduce((a, b) => a + b, 0);

    if (total === 0) {
        donut.style.background = 'var(--bg-darker)';
        legend.innerHTML = '<p style="color:var(--text-secondary);font-size:0.85rem">Sin cartas en colección</p>';
        return;
    }

    let gradientParts = [];
    let currentAngle = 0;
    let legendHtml = '';

    for (const rc of RARITY_DONUT_CONFIG) {
        const count = counts[rc.rarity];
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

/** Sort missing card folios: by rarity then folio, except KPRC (folio only) */
function sortMissingFolios(folios, setCode) {
    const RARITY_ORDER = {
        'Comun': 0, 'Rara': 1, 'Super Rara': 2, 'Ultra Rara': 3,
        'Kosmica/Titanica': 4, 'Full Art': 5, 'Secreta': 6, 'Evento': 7
    };
    return [...folios].sort((a, b) => {
        if (setCode !== 'KPRC') {
            const cardA = allCards.find(c => c.folio === a);
            const cardB = allCards.find(c => c.folio === b);
            const rA = RARITY_ORDER[cardA?.rarity] ?? 99;
            const rB = RARITY_ORDER[cardB?.rarity] ?? 99;
            if (rA !== rB) return rA - rB;
        }
        return a.localeCompare(b, 'es');
    });
}

function renderMissingCardsAccordion(setStats) {
    const container = document.getElementById('missing-cards-accordion');
    if (!container) return;

    // Capture currently open sections before rebuilding
    const openSets = new Set(
        [...container.querySelectorAll('.missing-set-section.open')].map(el => el.dataset.set)
    );

    const setsWithCards = setStats.filter(s => s.total > 0);
    const withMissing = setsWithCards.filter(s => s.missing.length > 0)
        .sort((a, b) => b.missing.length - a.missing.length);
    const complete = setsWithCards.filter(s => s.missing.length === 0);

    const all = [...withMissing, ...complete];

    // "ALL missing" combined section at top — sorted by rarity then folio
    const allMissing = sortMissingFolios(withMissing.flatMap(s => s.missing), 'ALL');
    const totalMissingCount = allMissing.length;
    let html = '';
    if (totalMissingCount > 0) {
        const allChipsHtml = allMissing.map(f => {
            const card = allCards.find(c => c.folio === f);
            const name = card ? card.name : f;
            const energy = card ? (card.energy || '').toLowerCase() : '';
            const isWanted = wantList.has(f);
            let borderStyle = '';
            const rarityColorMap = {
                'Comun': '#9ca3af', 'Poco Comun': '#22c55e', 'Rara': '#60a5fa',
                'Super Rara': '#a78bfa', 'Ultra Rara': '#f59e0b', 'Kosmica/Titanica': '#f97316',
                'Secreta': '#ec4899', 'Full Art': '#34d399', 'Evento': '#facc15',
            };
            const cardRarity = card ? card.rarity : '';
            const rarityColor = rarityColorMap[cardRarity] || '#4b5563';
            borderStyle = `border:2px solid ${rarityColor}`;
            const wantClass = isWanted ? ' wanted' : '';
            return `<button class="missing-card-chip clickable${wantClass}" data-folio="${f}" data-energy="${energy}" title="${name}${isWanted ? ' 🎯' : ''}" style="${borderStyle}">${f}</button>`;
        }).join('');

        html += `
            <div class="missing-set-section" data-set="ALL">
                <div class="missing-set-header" onclick="toggleMissingSet(this)">
                    <span class="missing-set-title">📋 TODAS las faltantes (${totalMissingCount} cartas)</span>
                    <div style="display:flex;align-items:center;gap:0.5rem">
                        <span class="missing-set-badge">${totalMissingCount} faltantes</span>
                        <span class="missing-set-chevron">▼</span>
                    </div>
                </div>
                <div class="missing-set-body">
                    <div class="missing-cards-grid">${allChipsHtml}</div>
                </div>
            </div>`;
    }

    for (const s of all) {
        const missingCount = s.missing.length;
        const badgeClass = missingCount === 0 ? 'zero' : '';
        const badgeText = missingCount === 0 ? '¡Completo! ✅' : `${missingCount} faltantes`;

        const chipsHtml = missingCount === 0
            ? '<span class="missing-empty">¡Tienes todas las cartas de este set! 🎉</span>'
            : sortMissingFolios(s.missing, s.code).map(f => {
                const card = allCards.find(c => c.folio === f);
                const name = card ? card.name : f;
                const energy = card ? (card.energy || '').toLowerCase() : '';
                const isWanted = wantList.has(f);
                // Always show rarity border color on missing cards
                let borderStyle = '';
                const rarityColorMap = {
                    'Comun': '#9ca3af',            // gray
                    'Poco Comun': '#22c55e',       // green
                    'Rara': '#60a5fa',             // blue
                    'Super Rara': '#a78bfa',       // purple
                    'Ultra Rara': '#f59e0b',       // orange
                    'Kosmica/Titanica': '#f97316', // deep orange
                    'Secreta': '#ec4899',          // pink
                    'Full Art': '#34d399',         // emerald
                    'Evento': '#facc15',           // yellow
                };
                const cardRarity = card ? card.rarity : '';
                const rarityColor = rarityColorMap[cardRarity] || '#4b5563'; // fallback dark gray
                borderStyle = `border:2px solid ${rarityColor}`;
                const wantClass = isWanted ? ' wanted' : '';
                return `<button class="missing-card-chip clickable${wantClass}" data-folio="${f}" data-energy="${energy}" title="${name}${isWanted ? ' 🎯' : ''}" style="${borderStyle}">${f}</button>`;
            }).join('');

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

    // Restore open states
    openSets.forEach(code => {
        const section = container.querySelector(`.missing-set-section[data-set="${code}"]`);
        if (section) section.classList.add('open');
    });

    // Click handler for missing card chips → open modal
    container.querySelectorAll('.missing-card-chip.clickable').forEach(chip => {
        chip.addEventListener('click', () => {
            const folio = chip.dataset.folio;
            const card = allCards.find(c => c.folio === folio);
            if (card) {
                openCardModal(card, allCards);
            }
        });
    });
}

function toggleMissingSet(headerEl) {
    const section = headerEl.closest('.missing-set-section');
    if (section) section.classList.toggle('open');
}

function toggleDashboardSection(titleEl) {
    const body = titleEl.nextElementSibling;
    if (!body) return;
    const collapsed = body.classList.toggle('collapsed');
    const chevron = titleEl.querySelector('.section-chevron');
    if (chevron) chevron.textContent = collapsed ? '▶' : '▼';
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

    // Count base vs variant cards directly from allCards
    let totalBase = 0;
    let totalVariants = 0;
    for (const card of allCards) {
        if (getFolioSuffix(card.folio) === '') totalBase++;
        else totalVariants++;
    }

    const totalAll = collection.size;
    const totalCards = allCards.length; // 786 = base + variants
    const pctBase = totalBase > 0 ? Math.round((baseOwned / totalBase) * 100) : 0;

    const heroEl = document.getElementById('total-owned');
    if (heroEl) heroEl.textContent = `${totalAll} / ${totalCards}`;

    const baseEl = document.getElementById('base-owned');
    if (baseEl) baseEl.textContent = `${baseOwned} / ${totalBase}`;

    const varEl = document.getElementById('variants-owned');
    if (varEl) varEl.textContent = `${variantOwned} / ${totalVariants}`;

    const pctEl = document.getElementById('completion-percent');
    if (pctEl) pctEl.textContent = `${pctBase}%`;

    // Unique cards: group by name, count how many unique names have at least 1 owned variant
    const byName = {};
    for (const card of allCards) {
        if (!byName[card.name]) byName[card.name] = [];
        byName[card.name].push(card.folio);
    }
    const totalUnique = Object.keys(byName).length;
    let ownedUnique = 0;
    for (const [name, folios] of Object.entries(byName)) {
        if (folios.some(f => collection.has(f))) ownedUnique++;
    }
    const pctUniqueVal = totalUnique > 0 ? Math.round((ownedUnique / totalUnique) * 100) : 0;
    const uniqueEl = document.getElementById('unique-owned');
    if (uniqueEl) uniqueEl.textContent = `${ownedUnique} / ${totalUnique} (${pctUniqueVal}%)`;

    // Render unique donut
    const uniqueDonut = document.getElementById('unique-donut');
    if (uniqueDonut) {
        const missingUnique = totalUnique - ownedUnique;
        if (totalUnique > 0) {
            const ownedDeg = (ownedUnique / totalUnique) * 360;
            uniqueDonut.style.background = `conic-gradient(#f59e0b 0deg ${ownedDeg.toFixed(1)}deg, var(--bg-darker) ${ownedDeg.toFixed(1)}deg 360deg)`;
        }
    }
    const uniqueSub = document.getElementById('unique-sub');
    if (uniqueSub) uniqueSub.textContent = `${totalUnique - ownedUnique} nombres por coleccionar`;

    // Update hero ring to use unique % (more meaningful)
    const pctUnique = totalUnique > 0 ? Math.round((ownedUnique / totalUnique) * 100) : 0;

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
            // Add transitioning class for smooth theme change
            htmlEl.classList.add('theme-transitioning');
            if (isLight) {
                htmlEl.removeAttribute('data-theme');
                toggleBtn.textContent = '🌙';
                localStorage.setItem(STORAGE_KEY, 'dark');
            } else {
                htmlEl.setAttribute('data-theme', 'light');
                toggleBtn.textContent = '☀️';
                localStorage.setItem(STORAGE_KEY, 'light');
            }
            // Remove transitioning class after transition completes
            setTimeout(() => htmlEl.classList.remove('theme-transitioning'), 300);
        });
    }
})();

// ==================== SINERGIAS MAP ====================
let _sinergiasInited = false;
function initSinergias() {
    if (_sinergiasInited) return;
    _sinergiasInited = true;

    var DATA = {
        atlica:{e:'💧',n:'Átlica',c:'var(--atlica)',role:'Defensiva',desc:'Curación, protección, resistencia. Los Adendei Átlicos son los médicos del campo — curan aliados y absorben daño. Contrarrestan a Pírica apagando sus quemaduras.'},
        huumica:{e:'🌀',n:'Húumica',c:'var(--huumica)',role:'Progresiva',desc:'Escalado y evolución. Empiezan débiles pero crecen cada turno. Contrarrestan a Demótica porque no puedes controlar lo que escala más rápido que tú.'},
        demotica:{e:'🔮',n:'Demótica',c:'var(--demotica)',role:'Posicional',desc:'Control de campo y manipulación. Mueven cartas, niegan efectos, cambian posiciones. Contrarrestan a Feral manipulando sus buffs en su contra.'},
        chaaktica:{e:'⚡',n:'Cháaktica',c:'var(--chaaktica)',role:'Velocidad',desc:'Ataques rápidos y burst damage. Golpean antes de que el rival pueda reaccionar. Contrarrestan a Lítica porque la velocidad supera a la resistencia bruta.'},
        gelida:{e:'🧊',n:'Gélida',c:'var(--gelida)',role:'Control',desc:'Congelamiento y ralentización. Ponen descansos extra, congelan ataques. Contrarrestan a Cháaktica frenando su velocidad.'},
        litica:{e:'🪨',n:'Lítica',c:'var(--litica)',role:'Tanque',desc:'Alta vida y resistencia pura. Aguantan todo el daño y siguen en pie. Contrarrestan a Átlica porque no necesitan curarse si no pueden ser derribados.'},
        pirica:{e:'🔥',n:'Pírica',c:'var(--pirica)',role:'Agresiva',desc:'Daño directo y quemaduras. Eliminan amenazas rápidamente con daño masivo. Contrarrestan a Feral quemándolos más rápido de lo que se buffean.'},
        feral:{e:'🐾',n:'Feral',c:'var(--feral)',role:'Auto-buff',desc:'Crecimiento propio y feralización. Se fortalecen a sí mismos acumulando poder. Se counter a sí mismos: Feral vs Feral es puro espejo de quién escala mejor.'}
    };

    var COLORS = {atlica:'#3b82f6',huumica:'#a855f7',demotica:'#9ca3af',chaaktica:'#eab308',gelida:'#06b6d4',litica:'#b45309',pirica:'#ef4444',feral:'#22c55e'};

    var COUNTERS = [
        {f:'feral',t:'feral',l:'Auto-buff (espejo)'},
        {f:'huumica',t:'demotica',l:'Escala > Control'},
        {f:'demotica',t:'feral',l:'Manipula buffs'},
        {f:'pirica',t:'feral',l:'Quema > Buff'},
        {f:'chaaktica',t:'litica',l:'Burst > Tanque'},
        {f:'litica',t:'atlica',l:'Resiste curaciones'},
        {f:'gelida',t:'chaaktica',l:'Congela velocidad'},
        {f:'atlica',t:'pirica',l:'Cura > Daño'}
    ];

    var SYNERGIES = [
        {a:'pirica',b:'chaaktica',l:'🔥⚡ Aggro imparable'},
        {a:'feral',b:'chaaktica',l:'🐾⚡ Buff + velocidad'},
        {a:'demotica',b:'feral',l:'🔮🐾 Control + auto-buff'},
        {a:'demotica',b:'atlica',l:'🔮💧 Posición + defensa'}
    ];

    var container = document.getElementById('sinergias-view');
    var nodes = container.querySelectorAll('.node-group');
    var counterPaths = container.querySelectorAll('.arrow-counter');
    var synergyPaths = container.querySelectorAll('.arrow-synergy');
    var panel = document.getElementById('detail-panel');
    var activeId = null;

    function connectedIds(id) {
        var ids = new Set();
        COUNTERS.forEach(function(c){if(c.f===id)ids.add(c.t);if(c.t===id)ids.add(c.f)});
        SYNERGIES.forEach(function(s){if(s.a===id)ids.add(s.b);if(s.b===id)ids.add(s.a)});
        ids.add(id);
        return ids;
    }

    function highlight(id) {
        var conn = connectedIds(id);
        nodes.forEach(function(n){n.classList.toggle('dimmed',!conn.has(n.getAttribute('data-id')))});
        counterPaths.forEach(function(p){
            var f=p.getAttribute('data-from'),t=p.getAttribute('data-to');
            p.classList.toggle('dimmed',f!==id&&t!==id);
            p.classList.toggle('highlight',f===id||t===id);
        });
        synergyPaths.forEach(function(p){
            var a=p.getAttribute('data-a'),b=p.getAttribute('data-b');
            p.classList.toggle('dimmed',a!==id&&b!==id);
            p.classList.toggle('highlight',a===id||b===id);
        });
    }

    function clearHighlight() {
        nodes.forEach(function(n){n.classList.remove('dimmed','active')});
        counterPaths.forEach(function(p){p.classList.remove('dimmed','highlight')});
        synergyPaths.forEach(function(p){p.classList.remove('dimmed','highlight')});
    }

    function showPanel(id) {
        var d = DATA[id]; if(!d) return;
        var color = COLORS[id]||'#fff';
        var html = '<h2 style="color:'+color+'">'+d.e+' '+d.n+'</h2>';
        html += '<div class="role">'+d.role+'</div>';
        html += '<div class="desc">'+d.desc+'</div>';
        html += '<div class="connections"><strong>Conexiones:</strong>';
        COUNTERS.forEach(function(c){
            if(c.f===id) html += '<div class="conn-item"><span class="conn-counter">⚔️ Counters:</span> '+DATA[c.t].e+' '+DATA[c.t].n+' — '+c.l+'</div>';
            if(c.t===id&&c.f!==id) html += '<div class="conn-item"><span class="conn-counter">🛡️ Countered by:</span> '+DATA[c.f].e+' '+DATA[c.f].n+' — '+c.l+'</div>';
        });
        SYNERGIES.forEach(function(s){
            var other = s.a===id ? s.b : s.b===id ? s.a : null;
            if(other) html += '<div class="conn-item"><span class="conn-synergy">✨ Sinergia:</span> '+DATA[other].e+' '+DATA[other].n+' — '+s.l+'</div>';
        });
        html += '</div>';
        panel.innerHTML = html;
        panel.classList.add('open');
    }

    nodes.forEach(function(n){
        n.addEventListener('mouseenter',function(){if(!activeId)highlight(n.getAttribute('data-id'))});
        n.addEventListener('mouseleave',function(){if(!activeId)clearHighlight()});
        n.addEventListener('click',function(e){
            e.stopPropagation();
            var id = n.getAttribute('data-id');
            if(activeId===id){activeId=null;clearHighlight();panel.classList.remove('open');return}
            activeId = id;
            clearHighlight();
            highlight(id);
            n.classList.add('active');
            showPanel(id);
        });
    });

    container.addEventListener('click',function(e){
        if(!e.target.closest('.node-group')&&!e.target.closest('#detail-panel')){
            activeId=null;clearHighlight();panel.classList.remove('open');
        }
    });
}

// ── PWA Install Prompt ──
let _deferredInstallPrompt = null;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  _deferredInstallPrompt = e;
  const btn = document.getElementById('install-pwa');
  if (btn) btn.style.display = '';
});

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('install-pwa');
  if (btn) {
    btn.addEventListener('click', async () => {
      if (!_deferredInstallPrompt) return;
      _deferredInstallPrompt.prompt();
      const result = await _deferredInstallPrompt.userChoice;
      if (result.outcome === 'accepted') {
        btn.style.display = 'none';
      }
      _deferredInstallPrompt = null;
    });
  }
});

window.addEventListener('appinstalled', () => {
  const btn = document.getElementById('install-pwa');
  if (btn) btn.style.display = 'none';
  _deferredInstallPrompt = null;
});
