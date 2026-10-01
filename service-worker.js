const CACHE="connect-plus-3-mona-v5";
const CORE=[
  "./","./index.html","./styles.css","./cover-assets-v4.js","./app-data.js","./app.js","./cloud-progress-bridge.js","./manifest.json",
  "./assets/icons/app-icon.svg","./assets/icons/icon-192.png","./assets/icons/icon-512.png","./assets/icons/apple-touch-icon.png",
  "./assets/covers/app-cover.webp","./assets/covers/teacher-cover.webp",
  ...Array.from({length:6},(_,index)=>`./assets/covers/unit-${index+1}.webp`),
  ...Array.from({length:24},(_,index)=>`./assets/covers/lesson-${Math.floor(index/4)+1}-${index%4+1}.webp`),
  "./assets/covers/hospital-cover.webp","./assets/covers/story-cover.webp",
  ...Array.from({length:4},(_,index)=>`./assets/covers/hospital-${index+1}.webp`),
  ...Array.from({length:5},(_,index)=>`./assets/covers/story-${index+1}.webp`)
];
self.addEventListener("install",event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener("activate",event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",event=>{
  if(event.request.method!=="GET")return;
  if(event.request.mode==="navigate"){
    event.respondWith(fetch(event.request).then(response=>{const copy=response.clone();caches.open(CACHE).then(cache=>cache.put("./index.html",copy));return response;}).catch(()=>caches.match("./index.html")));
    return;
  }
  event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).then(response=>{const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));return response;}).catch(()=>caches.match("./index.html"))));
});
