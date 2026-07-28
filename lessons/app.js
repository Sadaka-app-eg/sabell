import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// ⚠️ ضع بيانات مشروعك هنا
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

let currentUser = null;
// إذا فتحت الرابط كذا: yoursite.com/?admin=true
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('admin') === 'true') {
    document.getElementById('adminSection').style.display = 'block';
}
// قائمة أشهر المدرسين
const famousTeachersMap = {
  "اللغة العربية": ["أ/ رضا الفاروق", "أ/ محمد صلاح", "أ/ وليد محسن", ],
  "اللغة الإنجليزية": ["مستر عمرو رجب", "مستر انجلشاوي",  "مستر شريف المصري"],
  "الفيزياء": ["م/ محمود مجدي", "أ/ محمد عبد المعبود", "أ/ حسام خليل", "أ/ كيرلس بارودي"],
  "الكيمياء": ["د/ محمد عبد الجواد", "أ/ خالد صقر", "أ/ عبد الله حبشي"],
  "الأحياء": ["د/ أحمد الجوهري", "د/ محمد أيمن"],
  "الرياضيات": ["م/لطفي زهران", "م/ أحمد عصام"]
};

document.addEventListener('DOMContentLoaded', () => {
  // الأحداث للأزرار
  document.getElementById('googleLoginBtn').addEventListener('click', loginWithGoogle);
  document.getElementById('logoutBtn').addEventListener('click', logoutGoogle);
  document.getElementById('subjSelect').addEventListener('change', updateTeachersDropdown);
  document.getElementById('fetchLessonsBtn').addEventListener('click', fetchLessons);
  document.getElementById('uploadLessonBtn').addEventListener('click', uploadLessonToFirebase);

  // متابعة تسجيل الدخول
  onAuthStateChanged(auth, (user) => {
    const loginBtn = document.getElementById('googleLoginBtn');
    const userProfile = document.getElementById('userProfileInfo');
    
    if (user) {
      if(loginBtn) loginBtn.style.display = 'none';
      if(userProfile) {
        userProfile.style.display = 'flex';
        document.getElementById('userNameDisplay').textContent = user.displayName;
        document.getElementById('userImgDisplay').src = user.photoURL;
      }
      currentUser = user;
    } else {
      if(loginBtn) loginBtn.style.display = 'flex';
      if(userProfile) userProfile.style.display = 'none';
      currentUser = null;
    }
  });
});

function updateTeachersDropdown() {
  const subj = document.getElementById('subjSelect').value;
  const teacherSelect = document.getElementById('teacherSelect');
  
  if (!subj || !famousTeachersMap[subj]) {
    teacherSelect.innerHTML = `<option value="">-- اختر المادة أولاً --</option>`;
    return;
  }

  teacherSelect.innerHTML = famousTeachersMap[subj].map(t => `<option value="${t}">${t}</option>`).join('');
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

async function uploadLessonToFirebase() {
  if (!currentUser) {
    alert("من فضلك سجل الدخول بحساب جوجل أولاً لإضافة درس 🙏");
    return;
  }

  const subj = document.getElementById('subjSelect').value;
  const teacher = document.getElementById('teacherSelect').value;
  const title = document.getElementById('lessonTitleInp').value.trim();
  const ytUrl = document.getElementById('youtubeUrlInp').value.trim();
  const qUrl = document.getElementById('questionsUrlInp').value.trim();
  const examUrl = document.getElementById('examUrlInp').value.trim();

  if (!subj || !teacher || !title || !ytUrl) {
    alert("يرجى ملء المادة والمدرس وعنوان الدرس ورابط الفيديو على الأقل!");
    return;
  }

  const videoId = extractYouTubeID(ytUrl);

  try {
    await addDoc(collection(db, "lessons"), {
      subject: subj,
      teacher: teacher,
      title: title,
      videoId: videoId,
      questionsUrl: qUrl,
      examUrl: examUrl,
      addedBy: currentUser.email,
      createdAt: new Date().toISOString()
    });

    alert("🎉 تم نشر المحاضرة بنجاح وحفظها في Firebase!");
    document.getElementById('lessonTitleInp').value = '';
    document.getElementById('youtubeUrlInp').value = '';
    document.getElementById('questionsUrlInp').value = '';
    document.getElementById('examUrlInp').value = '';
    fetchLessons();
  } catch (err) {
    alert("خطأ في الحفظ: " + err.message);
  }
}

async function fetchLessons() {
  const subj = document.getElementById('subjSelect').value;
  const teacher = document.getElementById('teacherSelect').value;
  const container = document.getElementById('lessonsListContainer');

  if (!subj || !teacher) {
    alert("اختر المادة والمدرس أولاً!");
    return;
  }

  container.innerHTML = `<div style="text-align:center; padding:20px; color:var(--gold);">جاري تحميل الدروس والمحاضرات... ⏳</div>`;

  try {
    const q = query(
      collection(db, "lessons"),
      where("subject", "==", subj),
      where("teacher", "==", teacher)
    );

    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      container.innerHTML = `<div style="text-align:center; padding:20px; color:var(--text2); font-size:12px;">لا توجد دروس مضافة لهذا المدرس بعد. كن أول من يضيفها! 🚀</div>`;
      return;
    }

    let html = '';
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      html += `
        <div class="lesson-item">
          <div class="lesson-title">${data.title}</div>
          <div class="lesson-meta">👨‍🏫 ${data.teacher} • 📚 ${data.subject}</div>

          ${data.videoId ? `
            <div class="video-container">
              <iframe src="https://www.youtube.com/embed/${data.videoId}" allowfullscreen></iframe>
            </div>
          ` : ''}

          <div class="links-grid">
            ${data.questionsUrl ? `<a href="${data.questionsUrl}" target="_blank" class="link-btn">📄 ملزمة الأسئلة والتمارين</a>` : ''}
            ${data.examUrl ? `<a href="${data.examUrl}" target="_blank" class="link-btn" style="border-color:var(--gold); color:var(--gold);">📝 امتحان شامل على الدرس</a>` : ''}
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  } catch (err) {
    container.innerHTML = `<div style="text-align:center; padding:20px; color:#ff6b6b; font-size:12px;">خطأ في جلب البيانات: ${err.message}</div>`;
  }
}

function extractYouTubeID(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : url;
}
