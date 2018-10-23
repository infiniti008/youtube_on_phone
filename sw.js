importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js');

if (workbox) {
    console.log(`Yay! Workbox is loaded 🎉`);

    workbox.precaching.precacheAndRoute([
        "style/main.css",
        "index.html",
        "js/animation.js",
        "images/home/business.jpg",
        "images/icon/icon.svg",
        "pages/offline.html",
        "pages/404.html",
        "favicon.ico",
        "favicon.png",
        "manifest.webmanifest",
        "style/bootstrap.min.css",
        "js/popper.min.js",
        "js/knockout-min.js",
        "js/jquery-3.2.1.slim.min.js",
        "js/bootstrap.min.js"
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