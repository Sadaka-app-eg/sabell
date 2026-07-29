import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// ⚠️ ضع بيانات مشروعك هنا من Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD6lUURZNqgsHnjZaVz-T5Ww19TAjq6hjE",
  authDomain: "sabeel-almajd.firebaseapp.com",
  projectId: "sabeel-almajd",
  storageBucket: "sabeel-almajd.firebasestorage.app",
  messagingSenderId: "511150067201",
  appId: "1:511150067201:web:b249f496b9f5df5e6c7a00",
  measurementId: "G-205TS725KB"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

let currentUser = null;

// التحقق من وضع الأدمن
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('admin') === 'true') {
  const adminSec = document.getElementById('adminSection');
  if (adminSec) adminSec.style.display = 'block';
}

// 📚 داتا المدرسين الشاملة (دليل المنصات والقنوات)
const teachersDatabase = {
  "اللغة العربية": [
    {
      name: "أ/ رضا الفاروق",
      img: "https://via.placeholder.com/150", // استبدلها برابط صورة المدرس
      bio: "أسطورة اللغة العربية للثانوية العامة، متخصص في التأسيس الشامل للنحو والأدب.",
      platformUrl: "https://www.youtube.com/@RedaElFarouk",
      platformType: "منصة يوتيوب / المنصة الرسمية",
      rating: "⭐ 4.9"
    },
    {
      name: "أ/ محمد صلاح",
      img: "https://via.placeholder.com/150",
      bio: "صاحب أسلوب الخرائط الذهنية والشرح السريع الممتع بدون تعقيد.",
      platformUrl: "https://www.youtube.com/@mohamedsalah",
      platformType: "منصة طليق / يوتيوب",
      rating: "⭐ 4.8"
    }
  ],
  "الفيزياء": [
    {
      name: "م/ محمود مجدي",
      img: "https://via.placeholder.com/150",
      bio: "عبقري الفيزياء وتفكيك أفكار كيرشوف ومسائل المستويات العليا.",
      platformUrl: "https://www.youtube.com",
      platformType: "المنصة الرسمية",
      rating: "⭐ 4.9"
    },
    {
      name: "أ/ محمد عبد المعبود",
      img: "https://via.placeholder.com/150",
      bio: "خبرة السنين في تبسيط الفيزياء وإزالة الرهبة منها تماماً.",
      platformUrl: "https://www.youtube.com",
      platformType: "منصة عبد المعبود",
      rating: "⭐ 4.9"
    }
  ],
  "الكيمياء": [
    {
      name: "د/ محمد عبد الجواد",
      img: "https://via.placeholder.com/150",
      bio: "ملك الكيمياء العضوية ومعادلاتها بدون منازع بحماس وتفاعل جبار.",
      platformUrl: "https://www.youtube.com",
      platformType: "منصة عبد الجواد",
      rating: "⭐ 5.0"
    }
  ]
};

document.addEventListener('DOMContentLoaded', () => {
  // تفعيل العناصر إن وجدت في DOM
  const loginBtn = document.getElementById('googleLoginBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  const subjSelect = document.getElementById('subjSelect');
  const fetchBtn = document.getElementById('fetchTeachersBtn');
  const addTeacherBtn = document.getElementById('uploadTeacherBtn');

  if (loginBtn) loginBtn.addEventListener('click', loginWithGoogle);
  if (logoutBtn) logoutBtn.addEventListener('click', logoutGoogle);
  if (subjSelect) subjSelect.addEventListener('change', loadTeachersList);
  if (fetchBtn) fetchBtn.addEventListener('click', loadTeachersList);
  if (addTeacherBtn) addTeacherBtn.addEventListener('click', uploadTeacherToFirebase);

  // متابعة حالة تسجيل الدخول
  onAuthStateChanged(auth, (user) => {
    const loginBtnEl = document.getElementById('googleLoginBtn');
    const userProfile = document.getElementById('userProfileInfo');
    
    if (user) {
      if (loginBtnEl) loginBtnEl.style.display = 'none';
      if (userProfile) {
        userProfile.style.display = 'flex';
        document.getElementById('userNameDisplay').textContent = user.displayName;
        document.getElementById('userImgDisplay').src = user.photoURL;
      }
      currentUser = user;
    } else {
      if (loginBtnEl) loginBtnEl.style.display = 'flex';
      if (userProfile) userProfile.style.display = 'none';
      currentUser = null;
    }
  });

  // عرض المدرسين لأول مادة عند البدء
  loadTeachersList();
});

// عرض قائمة المدرسين للمادة المحددة
async function loadTeachersList() {
  const subjSelect = document.getElementById('subjSelect');
  const subj = subjSelect ? subjSelect.value : "اللغة العربية";
  const container = document.getElementById('teachersListContainer') || document.getElementById('lessonsListContainer');

  if (!container) return;

  container.innerHTML = `<div style="text-align:center; padding:20px; color:var(--gold);">جاري تحميل دليل المدرسين... ⏳</div>`;

  // 1. المدرسين المكتوبين بالـ Local Data
  let teachersList = teachersDatabase[subj] || [];

  // 2. جلب المدرسين المضافين حديثاً عبر Firebase Firestore
  try {
    const q = query(collection(db, "teachers"), where("subject", "==", subj));
    const querySnapshot = await getDocs(q);
    
    querySnapshot.forEach((doc) => {
      teachersList.push(doc.data());
    });
  } catch (err) {
    console.log("Firebase fetching note: ", err.message);
  }

  if (teachersList.length === 0) {
    container.innerHTML = `<div style="text-align:center; padding:20px; color:var(--text2); font-size:13px;">لا يوجد مدرسين مسجلين لهذه المادة بعد.</div>`;
    return;
  }

  // 3. رسم كروت المدرسين الشيك (مثل المنصات)
  let html = '';
  teachersList.forEach((t) => {
    html += `
      <div class="athr-card" style="display:flex; flex-direction:column; gap:10px; padding:14px; margin-bottom:12px; border:1px solid var(--border);">
        <div style="display:flex; align-items:center; gap:12px;">
          <img src="${t.img || 'https://via.placeholder.com/80'}" style="width:65px; height:65px; border-radius:50%; object-fit:cover; border:2px solid var(--gold);">
          <div>
            <div style="font-size:16px; font-weight:bold; color:var(--gold);">${t.name}</div>
            <div style="font-size:11px; color:var(--green); font-weight:bold; margin-top:2px;">${t.platformType || 'منصة تعليمية'} • ${t.rating || '⭐ ممتاز'}</div>
          </div>
        </div>

        <p style="font-size:12px; color:var(--text); line-height:1.6;">${t.bio}</p>

        <a href="${t.platformUrl}" target="_blank" class="btn-small" style="text-align:center; text-decoration:none; padding:10px; background:var(--gold); color:#111; font-weight:bold; border-radius:10px; font-size:13px;">
          🚀 الانتقال لمنصة / قناة المدرس
        </a>
      </div>
    `;
  });

  container.innerHTML = html;
}

// دالة إضافة مدرس جديد كـ Admin حفظاً في Firebase
async function uploadTeacherToFirebase() {
  if (!currentUser) {
    alert("من فضلك سجل الدخول بحساب جوجل كـ أدمن أولاً 🙏");
    return;
  }

  const subj = document.getElementById('subjSelect').value;
  const name = document.getElementById('teacherNameInp').value.trim();
  const bio = document.getElementById('teacherBioInp').value.trim();
  const url = document.getElementById('teacherUrlInp').value.trim();
  const imgUrl = document.getElementById('teacherImgInp').value.trim();

  if (!subj || !name || !url) {
    alert("يرجى إدخال اسم المدرس، المادة، ورابط المنصة على الأقل!");
    return;
  }

  try {
    await addDoc(collection(db, "teachers"), {
      subject: subj,
      name: name,
      bio: bio || "مدرس معتمد للثانوية العامة.",
      platformUrl: url,
      img: imgUrl || "https://via.placeholder.com/80",
      addedBy: currentUser.email,
      createdAt: new Date().toISOString()
    });

    alert("🎉 تم إضافة المدرس ودليله بنجاح في Firebase!");
    loadTeachersList();
  } catch (err) {
    alert("خطأ أثناء الحفظ: " + err.message);
  }
}

async function loginWithGoogle() {
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    alert("حدث خطأ في تسجيل الدخول: " + error.message);
  }
}

function logoutGoogle() {
  signOut(auth);
}
