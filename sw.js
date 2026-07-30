const CACHE_NAME = 'sabeel-almajd-v1';

// قائمة الأصول والملفات المحلية والخارجية المطلوب تخزينها للأوفلاين
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './parent.html',
  './lessons.html',
  './manifest.json',
  './icon1.png',
  './app.js',
  './schedule.js',
  './subjectTree.js',
  './studyBuddy.js',
  './aiAssistant.js',
  './shareApp.js',

  // الخطوط والمكتبات الخارجية
  'https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Cairo:wght@600;700;800&display=swap',
  'https://cdn.jsdelivr.net/npm/chart.js',
  'https://cdn.jsdelivr.net/npm/localforage@1.10.0/dist/localforage.min.js',
  'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js',
  'https://www.gstatic.com/firebasejs/10.12.0/firebase-analytics.js',
  'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js',
  'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js'
];

// 1. مرحلة التثبيت: كاش كافة الملفات
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Caching all assets for offline use');
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// 2. مرحلة التفعيل: تنظيف أي كاش قديم
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[SW] Removing old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. مرحلة جلب الطلبات (Cache First Strategy)
self.addEventListener('fetch', (event) => {
  // تجنب كاش طلبات غير GET أو الطلبات الخاصة بالـ Extensions
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // إرجاع النسخة المخزنة فوراً لسرعة التحميل بدون إنترنت
        return cachedResponse;
      }

      // إذا لم تكن مخزنة، جلبها من الشبكة وتخزينها للمستقبل
      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }

        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return networkResponse;
      }).catch(() => {
        // في حالة قطع شبكة بالكامل
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
