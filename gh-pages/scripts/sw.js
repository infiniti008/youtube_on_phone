importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

workbox.routing.registerRoute(
    'https://infiniti008.github.io/youtube_on_phone/gh-pages/index.html',
    () => {
      console.log('JSSSSS')
    }
);
