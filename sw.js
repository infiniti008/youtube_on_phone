importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js');

if (workbox) {
    console.log(`Yay! Workbox is loaded 🎉`);

    workbox.precaching.precacheAndRoute([
  {
    "url": "style/main.css"
  },
  {
    "url": "index.html"
  },
  {
    "url": "js/animation.js"
  },
  {
    "url": "images/home/business.jpg"
  },
  {
    "url": "images/icon/icon.svg"
  },
  {
    "url": "pages/offline.html"
  },
  {
    "url": "pages/404.html"
  },
  {
    "url": "favicon.ico"
  },
  {
    "url": "manifest.webmanifest"
  }
]);

    workbox.routing.registerRoute(
        /(.*)articles(.*)\.(?:png|gif|jpg)/,
        workbox.strategies.cacheFirst({
        cacheName: 'images-cache',
        plugins: [
            new workbox.expiration.Plugin({
            maxEntries: 100,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
            })
        ]
        })
    );

    const articleHandler = workbox.strategies.networkFirst({
        cacheName: 'articles-cache',
        plugins: [
            new workbox.expiration.Plugin({
            maxEntries: 100,
            })
        ]
    });

    workbox.routing.registerRoute(/(.*)article(.*)\.html/, args => {
        return articleHandler.handle(args).then(response => {
            if (!response) {
                return caches.match('pages/offline.html');
            } else if (response.status === 404) {
                return caches.match('pages/404.html');
            }
            return response;
        });
    });

    const postsHandler = workbox.strategies.cacheFirst({
        cacheName: 'posts-cache',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 100,
            })
        ]
    });

    workbox.routing.registerRoute(/(.*)post(.*)\.html/, args => {
        return postsHandler.handle(args)
        .then(response => {
            if (response.status === 404) {
                return caches.match('pages/404.html');
            }
            return response;
        })
        .catch(response => {
            return caches.match('pages/offline.html');
        });
    });

} else {
  console.log(`Boo! Workbox didn't load 😬`);
}