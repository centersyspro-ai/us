const CACHE_NAME = 'centersys-cache-v1';
const urlsToCache = [
  'index.html',
  'styles.css',
  'script.js',
  'fotos/logo_cen_removed.png',
  'fotos/icon-192.png',
  'fotos/icon-512.png'
];

// Instalar el Service Worker y almacenar archivos en caché
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Abriendo caché y guardando recursos activos');
        return cache.addAll(urlsToCache);
      })
  );
});

// Interceptar las peticiones para buscar en el caché primero
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si el archivo está en el caché, lo devuelve; si no, va a la red
        return response || fetch(event.request);
      })
  );
});

// Activar y limpiar cachés antiguos
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // Eliminar cachés obsoletos
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});