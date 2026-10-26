// BLINDNESS SECTOR 0.12.2 — généré au build
const CACHE = 'bs-0.12.2';
const FICHIERS = ["./","./assets/barlow-condensed-latin-700-normal-B9NQhHK3.woff2","./assets/ibm-plex-mono-latin-400-normal-Dm_PoFIZ.woff2","./assets/barlow-condensed-latin-500-normal-BZhxI-S8.woff2","./assets/ibm-plex-mono-latin-600-normal-rgB1DpUr.woff2","./assets/barlow-condensed-latin-700-normal-IaWpoxiT.woff","./assets/barlow-condensed-latin-500-normal-CgFv4DbK.woff","./assets/ibm-plex-mono-latin-400-normal-O6-GRVqx.woff","./assets/ibm-plex-mono-latin-600-normal-DeXYNBV7.woff","./assets/index-DsCZpScK.css","./assets/index-CtQqYDG2.js","./assets/hote.worker-DJezQmIV.js","./icone-192.png","./icone-512.png","./icone-masque-512.png","./manifest.webmanifest"];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FICHIERS))); self.skipWaiting(); });
self.addEventListener('activate', e => e.waitUntil(caches.keys()
  .then(k => Promise.all(k.filter(n => n.startsWith('bs-') && n !== CACHE).map(n => caches.delete(n))))
  .then(() => self.clients.claim())));
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET' || new URL(r.url).origin !== location.origin) return;
  if (r.mode === 'navigate') { e.respondWith(fetch(r).catch(() => caches.match('./', { ignoreSearch: true }))); return; }
  // sons enregistrés : chargés à la demande puis gardés d'une version à l'autre (cache « sons ») ; manifeste réseau d'abord
  if (new URL(r.url).pathname.includes('/sons/')) {
    const manif = r.url.endsWith('manifeste.json');
    e.respondWith(caches.open('sons').then(c => (manif ? Promise.reject() : c.match(r)).then(m => m || Promise.reject())
      .catch(() => fetch(r).then(rep => {
        if (rep.ok) {
          const chemin = new URL(r.url).pathname;
          c.keys().then(k => k.filter(q => new URL(q.url).pathname === chemin && q.url !== r.url).forEach(q => c.delete(q)));
          c.put(r, rep.clone());
        }
        return rep;
      }).catch(() => c.match(r, { ignoreSearch: true })))));
    return;
  }
  e.respondWith(caches.match(r).then(m => m || fetch(r)));
});
