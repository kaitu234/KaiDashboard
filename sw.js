/* Service worker Kai Café Dashboard
 * - Trang (index.html): lấy mạng trước, mất mạng thì dùng bản đã lưu → luôn có code mới khi online.
 * - Chart.js, font, icon: lưu sẵn, dùng bản lưu (đổi phiên bản thì tải lại).
 * - API Apps Script, thời tiết: KHÔNG lưu ở đây (số liệu lần trước do trang tự giữ). */
const CACHE = 'kai-v2';
const SHELL = ['./', 'index.html', 'manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/icon-180.png',
  'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== 'GET') return;
  if (/script\.google(usercontent)?\.com$|open-meteo\.com$/.test(url.hostname)) return;   // số liệu: luôn đi mạng

  if (req.mode === 'navigate'){   // trang chính: mạng trước
    e.respondWith(fetch(req).then(r => { const c = r.clone(); caches.open(CACHE).then(x => x.put('index.html', c)); return r; })
      .catch(() => caches.match('index.html')));
    return;
  }
  // tài nguyên tĩnh: bản lưu trước, chưa có thì tải và lưu (font Google, Chart.js, icon)
  if (url.origin === location.origin || /cdnjs\.cloudflare\.com$|fonts\.(googleapis|gstatic)\.com$/.test(url.hostname)){
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => {
      if (r.ok || r.type === 'opaque'){ const c = r.clone(); caches.open(CACHE).then(x => x.put(req, c)); }
      return r; })));
  }
});
