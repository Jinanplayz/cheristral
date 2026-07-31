// Bump this version on each deploy to invalidate old caches.
// v3: images moved from Unsplash to self-hosted /images/, so the old
//     multi-megabyte cached copies needed evicting.
// v5: the image handler used to cache ANY response, including 404s. Once a
//     404 was stored it was served forever, which is what broke the logo.
//     Bumping the name evicts those poisoned entries.
const CACHE_NAME = 'cheristral-cache-v5';

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
            // Only cache real successes. Caching a 404 or a 5xx means the
            // browser keeps serving that failure even after the file is fixed
            // on the server, because the request never leaves the device.
            // `response.ok` covers 200-299; opaque cross-origin responses have
            // status 0 and are deliberately excluded.
            if (response.ok) {
              const clone = response.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
            }
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