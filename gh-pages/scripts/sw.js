importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

workbox.precaching.precacheAndRoute([
    'gh-pages/styles/style.css',
    'gh-pages/scripts/index.js',
    'gh-pages/favicon.ico',
    'gh-pages/index.html',
]);