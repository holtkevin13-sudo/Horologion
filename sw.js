/* Horologion service worker.
   Bump CACHE whenever you change any file below, or phones will
   keep serving the old copy. That is the one maintenance chore. */
const CACHE = 'prayerbook-v13';

const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './psalter.js',
  './prayers.js',
  './feast.js',
  './app.js',
  './calendar-engine-v2.js',
  './manifest.json',
  './favicon.ico',
  './favicon-32.png',
  './apple-touch-icon.png',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-192.png',
  './icon-maskable-512.png'
];

/* Optional. Cached if present; a 404 here must not break install. */
const OPTIONAL = [
  './lectionary-full.json'      // add this file for saints and readings
];

/* Launch images and the remaining icon sizes are not precached: iOS keeps its
   own copy after install, and the fetch handler below caches anything else the
   first time it is requested. Precaching 300KB of splash screens would slow
   every install to save nothing. */

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(c =>
      c.addAll(ASSETS).then(() =>
        Promise.all(OPTIONAL.map(u => c.add(u).catch(() => {})))
      )
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* Cache-first: the prayers never change between deploys, and the
   app must open with no signal at all. Navigations fall back to
   the shell so a deep link still works offline. */
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;   // let API calls pass through

  event.respondWith(
    caches.match(req).then(hit => {
      if (hit) return hit;
      return fetch(req).then(res => {
        if (res && res.status === 200 && res.type === 'basic') {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy));
        }
        return res;
      }).catch(() => {
        if (req.mode === 'navigate') return caches.match('./index.html');
      });
    })
  );
});
