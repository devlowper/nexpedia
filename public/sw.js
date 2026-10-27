// Self-destructing cleanup worker: unregisters any lingering Monetag/popunder service workers cleanly
self.addEventListener('install', function() {
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    self.registration.unregister().then(function() {
      return self.clients.claim();
    })
  );
});
