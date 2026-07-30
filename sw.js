// ⚠️ كل ما تعمل تحديث جديد للموقع، غيّر الرقم ده فقط (v3, v4, v5...)
const CACHE_NAME = 'sabeel-almajd-v3';

// الملفات المحلية الخاصة بملفك فقط (المضمون تخزينها بدون مشاكل)
const LOCAL_ASSETS = [
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
  './shareApp.js'
];

// 1️⃣ التثبيت الإجباري والسريع
self.addEventListener('install', (event) => {
  self.skipWaiting(); // تجريب التحديث فوراً دون انتظار إغلاق المتصفح
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Caching local assets...');
      return cache.addAll(LOCAL_ASSETS);
    })
  );
});

// 2️⃣ التفعيل وتنظيف الكاش القديم فوراً
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[SW] Clearing old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3️⃣ استراتيجية الاستجابة الذكية (Network First for Documents / Cache First for Assets)
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  // تجنب كاش روابط الفايربيس التفاعلية الخاصة بقواعد البيانات
  const url = event.request.url;
  if (url.includes('firestore.googleapis.com') || url.includes('identitytoolkit')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // إرجاع الملف من الكاش لو موجود، مع جلبه من الشبكة في الخلفية لتحديثه للمرة القادمة
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        // لو مفيش نت خالص، ورابط الملاحة اطلب index.html
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });

      return cachedResponse || fetchPromise;
    })
  );
});
