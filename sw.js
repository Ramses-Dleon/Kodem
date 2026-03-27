// Códice Kódem — Service Worker
// Cache version: bump this to force cache refresh on deploy
const CACHE_NAME = 'kodem-v40';

// Static assets to pre-cache on install
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/app.js',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

// JSON data files — network-first (personal/dynamic data)
const NETWORK_FIRST_PATTERNS = [
  /\/cards\.json(\?.*)?$/,
  /\/collection\.json(\?.*)?$/,
  /\/wantlist\.json(\?.*)?$/,
  /\/decks\.json(\?.*)?$/,
  /\/set-aliases\.json(\?.*)?$/,
  /\/cards-ocr\.json(\?.*)?$/,
  /\/ocr-progress\.json(\?.*)?$/
];

// Cache-first patterns (images and static assets)
const CACHE_FIRST_PATTERNS = [
  /\/images\//,
  /\/icons\//,
  /\/kodem-cartas\//,
  /\.png(\?.*)?$/,
  /\.jpg(\?.*)?$/,
  /\.jpeg(\?.*)?$/,
  /\.gif(\?.*)?$/,
  /\.webp(\?.*)?$/,
  /\.svg(\?.*)?$/,
  /\.woff2?(\?.*)?$/,
  /fonts\.googleapis\.com/,
  /fonts\.gstatic\.com/
];

// ─── INSTALL ───────────────────────────────────────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting())
      .catch(err => console.warn('[SW] Pre-cache failed (some assets may be missing):', err))
  );
});

// ─── ACTIVATE ──────────────────────────────────────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => {
            console.log('[SW] Deleting old cache:', key);
            return caches.delete(key);
          })
      )
    ).then(() => self.clients.claim())
  );
});

// ─── FETCH ─────────────────────────────────────────────────────────────────
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = request.url;

  // Skip non-GET and cross-origin (except fonts)
  if (request.method !== 'GET') return;
  if (!url.startsWith(self.location.origin) &&
      !url.includes('fonts.googleapis.com') &&
      !url.includes('fonts.gstatic.com')) return;

  // Network-first: JSON data files
  if (NETWORK_FIRST_PATTERNS.some(p => p.test(url))) {
    event.respondWith(networkFirst(request));
    return;
  }

  // Cache-first: images, fonts, static assets
  if (CACHE_FIRST_PATTERNS.some(p => p.test(url))) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // Default: network-first with cache fallback (HTML, JS, CSS)
  event.respondWith(networkFirst(request));
});

// ─── STRATEGIES ────────────────────────────────────────────────────────────

/**
 * Network-first: try network, fall back to cache on failure.
 * Updates the cache whenever the network succeeds.
 */
async function networkFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok || networkResponse.status === 0) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch {
    const cached = await cache.match(request);
    if (cached) return cached;
    // Offline fallback: return index.html for navigation requests
    if (request.mode === 'navigate') {
      const fallback = await cache.match('/index.html') || await cache.match('/');
      if (fallback) return fallback;
    }
    return new Response('Offline — contenido no disponible', {
      status: 503,
      statusText: 'Service Unavailable',
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });
  }
}

/**
 * Cache-first: serve from cache, fetch & update in background if missing.
 */
async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  if (cached) return cached;
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok || networkResponse.status === 0) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch {
    return new Response('Offline — recurso no disponible', {
      status: 503,
      statusText: 'Service Unavailable',
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });
  }
}
