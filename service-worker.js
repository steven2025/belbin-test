
const CACHE_NAME = 'belbin-cache-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './sw-register.js',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './favicon.ico'
];

self.addEventListener('install', (evt) => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (evt) => {
  evt.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => (k !== CACHE_NAME ? caches.delete(k) : null)))).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (evt) => {
  const req = evt.request;
  // Only handle GET
  if (req.method !== 'GET') return;
  evt.respondWith(
    caches.match(req).then(cached => {
      if (cached) return cached;
      return fetch(req).then(res => {
        // Cache a clone for future
        const resClone = res.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(req, resClone));
        return res;
      }).catch(() => caches.match('./index.html'));
    })
  );
});
