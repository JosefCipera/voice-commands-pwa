// Service Worker pro PWA
const CACHE_NAME = 'voice-commands-cache-v2';
const URLS_TO_CACHE = [
  '/voice-commands-pwa/',              
  '/voice-commands-pwa/index.html',    
  '/voice-commands-pwa/app.js',        
  '/voice-commands-pwa/manifest.json', 
  '/voice-commands-pwa/microphone-192.webp', 
  '/voice-commands-pwa/microphone-512.webp'
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

// Zpracování požadavků (fetch) + offline fallback
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response; // Pokud soubor existuje v cache, použij ho.
      }
      return fetch(event.request).catch(() => {
        // Pokud jsme offline a soubor není v cache, vrať hlavní stránku
        return caches.match('/voice-commands-pwa/index.html');
      });
    })
  );
});
