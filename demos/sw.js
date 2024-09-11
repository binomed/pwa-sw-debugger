console.log('Service worker ok =D');

const cacheAppShellStatic = [
  '/',
  '/index.html',
  ];

self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open('cache-static')
      .then(cache => cache.addAll(cacheAppShellStatic))
      .then(_ => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.delete('cache-dynamic').finally(self.clients.claim()));
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return (
        response ||
        fetch(event.request)
          .then(responseFetch =>
            caches.open('cache-dynamic').then(cache => {
              cache.put(event.request, responseFetch.clone());
              return responseFetch;
            })
          )          
      );
    })
  );
});