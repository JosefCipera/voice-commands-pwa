// Service Worker pro PWA
const CACHE_NAME = 'voice-commands-cache-v1';
const URLS_TO_CACHE = [
  '/voice-commands-pwa/',              // Kořenová stránka
  '/voice-commands-pwa/index.html',    // HTML aplikace
  '/voice-commands-pwa/app.js',        // JavaScript aplikace
  '/voice-commands-pwa/manifest.json', // Manifest soubor
  '/voice-commands-pwa/microphone-192.webp', // Ikona 192x192
  '/voice-commands-pwa/microphone-512.webp'  // Ikona 512x512
];

// Instalace Service Workeru
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Service Worker: Soubory byly úspěšně uloženy do cache');
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

// Aktivace Service Workeru
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Starý cache byl odstraněn');
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Zpracování požadavků (fetch)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Pokud existuje odpověď v cache, použij ji, jinak načti z internetu
      return response || fetch(event.request);
    })
  );
});
