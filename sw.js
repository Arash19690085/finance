const V="fin-v5";
const ASSETS=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(ASSETS)).then(()=>caches.open(V).then(c=>c.add(new Request("https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js",{mode:"no-cors"}))).catch(()=>{}))
 .then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>clients.claim()))});
// network first (always the newest version when online), cache as the offline fallback
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;
 e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(V).then(c=>c.put(r,cp)).catch(()=>{});return res})
  .catch(()=>caches.match(r).then(m=>m||caches.match("index.html"))))});
