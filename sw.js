// Service worker: cache de l'app shell + tipografia (offline) + previsió en network-first.
const CACHE = "vacances-temps-v21";
const FONT_CACHE = "vacances-fonts-v1";
const MANTENIR = [CACHE, FONT_CACHE];

const SHELL = [
  "./",
  "./index.html",
  "./css/styles.css",
  "./js/app.js",
  "./js/ui.js",
  "./js/weather.js",
  "./js/clothing.js",
  "./js/itinerary.js",
  "./js/fx.js",
  "./js/phrases.js",
  "./js/game.js",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((claus) =>
      Promise.all(claus.filter((k) => !MANTENIR.includes(k)).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);

  // Tipografia (Google Fonts): cache-first en una cache pròpia, perquè es vegi offline.
  if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") {
    e.respondWith(
      caches.open(FONT_CACHE).then((cache) =>
        cache.match(e.request).then(
          (hit) =>
            hit ||
            fetch(e.request).then((resp) => {
              cache.put(e.request, resp.clone());
              return resp;
            }).catch(() => hit)
        )
      )
    );
    return;
  }

  // Previsió Open-Meteo: network-first (l'app ja gestiona el seu propi cache a localStorage).
  if (url.hostname.endsWith("open-meteo.com")) {
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
    return;
  }

  // App shell: cache-first.
  e.respondWith(caches.match(e.request).then((r) => r || fetch(e.request)));
});
