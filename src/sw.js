const staticCacheName = 'site-static';
const assets = [
  'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
  '/',
  'index.html',
  'js/app.js',
  'js/index.js',
  'css/index.css',
  'Img-favicon/favicon-32x32.png',
  '/Img-favicon/favicon-16x16.png'
];

//install service worker
self.addEventListener('install', evt => {
  //console.log('service worker has been installed');
  evt.waitUntil(
    caches.open(staticCacheName).then(cache => {
        console.log('caching shell assets');
        cache.addAll(assets);
    })
  )
});

//activate service  worker
self.addEventListener('activate', evt => {
  //console.log('service worker activated');
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== staticCacheName)
        .map(key => caches.delete(key))
        )
    })
  );
});

//fetch event
self.addEventListener('fetch', evt => {
    //console.log('fetch event', evt);
    evt.respondWith(
      caches.match(evt.request).then(cacheRes => {
        return cacheRes || fetch(evt.request);
      })
    )
})
