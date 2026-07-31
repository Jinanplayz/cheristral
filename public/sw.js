// Bump this version on each deploy to invalidate old caches.
// v3: images moved from Unsplash to self-hosted /images/, so the old
// multi-megabyte cached copies need to be evicted.
const CACHE_NAME = 'cheristral-cache-v4';

// Only precache the app shell. (manifest.json was removed — it never existed and
// caused the install step to reject.)
const STATIC_ASSETS = ['/', '/index.html'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only handle GET; let the browser deal with everything else (e.g. form POSTs).
  if (request.method !== 'GET') return;

  // Navigation requests (SPA routes): network-first so users get fresh deploys,
  // falling back to the cached shell when offline.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() => caches.match('/index.html'))
    );
    return;
  }

  // Images: stale-while-revalidate for snappy repeat views.
  if (request.destination === 'image') {
    event.respondWith(
      caches.match(request).then((cached) => {
        const network = fetch(request)
          .then((response) => {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
            return response;
          })
          .catch(() => cached);
        return cached || network;
      })
    );
    return;
  }

  // Hashed static assets (JS/CSS): cache-first, they're immutable.
  event.respondWith(
    caches.match(request).then((cached) => cached || fetch(request))
  );
});