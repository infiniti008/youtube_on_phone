importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

workbox.precaching.precacheAndRoute([
    '../styles/style.css',
    'index.js',
    '../favicon.ico',
    '../index.html',
]);

workbox.routing.registerRoute(
    new RegExp('**.js'),
    workbox.strategies.networkFirst()
);

workbox.routing.registerRoute(
    new RegExp('**.html'),
    workbox.strategies.networkFirst()
);

workbox.routing.registerRoute(
    // Cache image files
    /.*\.(?:png|jpg|jpeg|svg|gif|ico)/,
    // Use the cache if it's available
    workbox.strategies.cacheFirst({
      // Use a custom cache name
      cacheName: 'image-cache',
      plugins: [
        new workbox.expiration.Plugin({
          // Cache only 20 images
          maxEntries: 20,
          // Cache for a maximum of a week
          maxAgeSeconds: 7 * 24 * 60 * 60,
        })
      ],
    })
  );