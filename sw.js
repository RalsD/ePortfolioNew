//Importing the cache-polyfill file
importScripts('/libs/cache-polyfill.js');

//On install event saving all required files in the cache
self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open('ePortfolio').then(function(cache) {
            return cache.addAll([
                '/',
                '/index.html',
                '/styles/main.css',
                '/styles/home.css',
                '/libs/jquery-3.4.1.js',
                '/scripts/java.js',
                '/scripts/jQuery.js',
                '/images/Belle.jpg',
                '/images/SVGs/cv.svg',
                '/images/back2.jpg',
                '/images/back.jpg',
                '/csv/cakes.csv',
                '/images/Poppy.jpg',
                '/images/SVGs/undraw_making_art_759c.svg',
                '/images/SVGs/undraw_birthday_cake_7df8.svg',
                '/images/SVGs/undraw_camera_mg5h.svg',
                '/images/PNGs/skype.png',
                '/images/PNGs/pin.png',
                '/images/PNGs/youtube1.png',
                '/images/PNGs/linked.png',
                '/images/PNGs/facebook.png',
                '/images/mail.png'
            ]);
        })
    );
});

//Fetching the requested files from the cache to facilitate offline support
self.addEventListener('fetch', function(event) {
    console.log(event.request.url);

    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});