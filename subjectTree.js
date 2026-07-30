// ===============================================
// 🌳 شجرة المواد والدروس - subjectTree.js
// ===============================================
// عشان تضيف دروس جديدة: زوّد عنصر جديد جوه مصفوفة lessons
// بنفس الشكل ده بالظبط: { id: "معرف_فريد", name: "اسم الدرس" }
// المعرف (id) لازم يكون فريد جوه نفس الباب، وما يتكررش
// ===============================================

// ===============================================
// 🌳 المصفوفة الثلاثية: مادة ➔ وحدة / باب ➔ دروس
// ===============================================

const subjectLessonsTree = {
  "اللغة العربية": [
    {
      id: "ar_unit_1",
      name: "الوحدة الأولى: قواعد الإملاء والهمزات",
      lessons: [
        { id: "ar_u1_l1", name: "همزتا القطع والوصل" },
        { id: "ar_u1_l2", name: "الهمزة المتوسطة والمتطرفة" },
        { id: "ar_u1_l3", name: "الفرق بين التاء المربوطة والهاء والتاء المفتوحة" },
        { id: "ar_u1_l4", name: "أنواع الواو في آخر الكلمة" }
      ]
    },
    {
      id: "ar_unit_2",
      name: "الوحدة الثانية: المشتقات والمصادر والأبنية",
      lessons: [
        { id: "ar_u2_l1", name: "اسم الفاعل وإعماله" },
        { id: "ar_u2_l2", name: "صيغ المبالغة وإعمالها" },
        { id: "ar_u2_l3", name: "اسم المفعول وإعماله" },
        { id: "ar_u2_l4", name: "اسما الزمان والمكان واسم الآلة" },
        { id: "ar_u2_l5", name: "اسم التفضيل وحالاته" },
        { id: "ar_u2_l6", name: "المصادر الصريحة والمؤولة والقياسية" },
        { id: "ar_u2_l7", name: "الاسم المقصور والمنقوص والممدود" }
      ]
    },
    {
      id: "ar_unit_3",
      name: "الوحدة الثالثة: النواسخ والمبتدأ والخبر",
      lessons: [
        { id: "ar_u3_l1", name: "المبتدأ والخبر وأحكام حذفهما وتأخيرهما" },
        { id: "ar_u3_l2", name: "كان وأخواتها (النامة والناقصة)" },
        { id: "ar_u3_l3", name: "كاد وأخواتها (أفعال المقاربة والرجاء والشروع)" },
        { id: "ar_u3_l4", name: "إن وأخواتها ولا النافية للجنس" }
      ]
    },
    {
      id: "ar_adab_unit",
      name: "وحدة الأدب والشعر",
      lessons: [
        { id: "ar_ad_l1", name: "مدرسة الإحياء والبعث وجيل التطوير" },
        { id: "ar_ad_l2", name: "المدرسة الرومانتيكية (مطران)" },
        { id: "ar_ad_l3", name: "مدرسة الديوان وأبوللو والمهاجر" },
        { id: "ar_ad_l4", name: "المدرسة الواقعية والفنون النثرية" }
      ]
    }
  ],

  "الفيزياء": [
    {
      id: "ph_unit_1",
      name: "الفصل الأول: التيار الكهربي وقانون أوم وكيرشوف",
      lessons: [
        { id: "ph_u1_l1", name: "التيار الكهربي وفرق الجهد والمقاومة" },
        { id: "ph_u1_l2", name: "توصيل المقاومات (توالي وتوازي)" },
        { id: "ph_u1_l3", name: "قانون أوم للدائرة المغلقة" },
        { id: "ph_u1_l4", name: "قانونا كيرشوف" }
      ]
    },
    {
      id: "ph_unit_2",
      name: "الفصل الثاني: التأثير المغناطيسي للتيار الكهربي",
      lessons: [
        { id: "ph_u2_l1", name: "المجال المغناطيسي للسلك المستقيم والملف الدائري والحلزوني" },
        { id: "ph_u2_l2", name: "القوة المغناطيسية وعزم الازدواج" },
        { id: "ph_u2_l3", name: "أجهزة القياس الكهربي (الجلفانو والأميتر والفولتميتر)" }
      ]
    },
    {
      id: "ph_unit_3",
      name: "الفصل الثالث: الحث الكهرومغناطيسي",
      lessons: [
        { id: "ph_u3_l1", name: "قانون فاراداي والحث الذاتي والمتبادل" },
        { id: "ph_u3_l2", name: "المولد الكهربي (الدينامو)" },
        { id: "ph_u3_l3", name: "المحول الكهربي والمحرك" }
      ]
    }
  ],

  "الكيمياء": [
    {
      id: "ch_unit_1",
      name: "الباب الأول: العناصر الانتقالية",
      lessons: [
        { id: "ch_u1_l1", name: "التركيب الإلكتروني وخامات الحديد" },
        { id: "ch_u1_l2", name: "خواص عناصر السلسلة الانتقالية الأولى" },
        { id: "ch_u1_l3", name: "استخلاص الحديد والسبائك وأكاسيد الحديد" }
      ]
    },
    {
      id: "ch_unit_2",
      name: "الباب الثاني: التحليل الكيميائي",
      lessons: [
        { id: "ch_u2_l1", name: "التحليل الكيفي (الكشف عن الأنيونات والكاتيونات)" },
        { id: "ch_u2_l2", name: "التحليل الكمي (المعايرة والتطاير والترسيب)" }
      ]
    },
    {
      id: "ch_unit_5",
      name: "الباب الخامس: الكيمياء العضوية",
      lessons: [
        { id: "ch_u5_l1", name: "الألكانات والألكينات والألكاينات" },
        { id: "ch_u5_l2", name: "البنزين العطري والمشتقات" },
        { id: "ch_u5_l3", name: "الكحولات والفينولات والأحماض والاسترات" }
      ]
    }
  ],

  "الأحياء": [
    {
      id: "bi_unit_1",
      name: "الباب الأول: الدعامة والحركة",
      lessons: [
        { id: "bi_u1_l1", name: "الدعامة في النبات والإنسان" },
        { id: "bi_u1_l2", name: "الحركة في النبات والانقباض العضلي" }
      ]
    },
    {
      id: "bi_unit_2",
      name: "الباب الثاني: التنسيق الهرموني",
      lessons: [
        { id: "bi_u2_l1", name: "الغدة النخامية والدرقية والبارادرقية" },
        { id: "bi_u2_l2", name: "الغدتان الكظريتان والبنكرياس والغدد التناسلية" }
      ]
    },
    {
      id: "bi_unit_3",
      name: "الباب الثالث: التكاثر والمناعة",
      lessons: [
        { id: "bi_u3_l1", name: "طرق التكاثر والتكاثر في الإنسان" },
        { id: "bi_u3_l2", name: "آليات ومكونات الجهاز المناعي" }
      ]
    }
  ]
};
let currentTreeSubject = null;
let currentTreeChapter = null;
let activeMediaRecorder = null;
let recordedAudioChunks = [];
let currentToolTarget = null; // { subject, chapterId, lessonId|null }

// ================= 💾 تخزين الملخصات =================
// جلب الملخصات من IndexedDB
async function getLessonSummaries(key) {
  const all = await localforage.getItem('sm_summaries') || {};
  return all[key] || [];
}

// حفظ الملخص في IndexedDB بدون قلق من المساحة
async function saveSummaryEntry(key, entry) {
  const user = auth.currentUser;
  const userKey = user ? `sm_summaries_${user.uid}` : 'sm_summaries_guest';
  
  let all = await localforage.getItem(userKey) || {};
  if (!all[key]) all[key] = [];
  all[key].push(entry);
  
  await localforage.setItem(userKey, all);
}

// حذف ملخص معين
// جلب دالة المفتاح الموحد
function getSummaryUserKey() {
  const user = (window.firebase && window.firebase.auth) ? window.firebase.auth().currentUser : null;
  return user ? `sm_summaries_${user.uid}` : 'sm_summaries_guest';
}

async function getLessonSummaries(key) {
  const userKey = getSummaryUserKey();
  const all = await localforage.getItem(userKey) || {};
  return all[key] || [];
}

async function saveSummaryEntry(key, entry) {
  const userKey = getSummaryUserKey();
  let all = await localforage.getItem(userKey) || {};
  if (!all[key]) all[key] = [];
  all[key].push(entry);
  await localforage.setItem(userKey, all);
}

async function deleteSummaryEntry(key, entryId) {
  const userKey = getSummaryUserKey();
  let all = await localforage.getItem(userKey) || {};
  if (!all[key]) return;
  all[key] = all[key].filter(e => e.id !== entryId);
  await localforage.setItem(userKey, all);
}

function lessonKey(subject, chapterId, lessonId) {
  return `${subject}::${chapterId}::${lessonId}`;
}
function chapterKey(subject, chapterId) {
  return `${subject}::${chapterId}::__chapter__`;
}

// ================= 🌳 الصفحة الرئيسية للشجرة (مع معالجة الـ Async المظبوطة) =================
async function renderSubjectTreePage() {
  currentTreeSubject = null;
  currentTreeChapter = null;

  const subjs = branchSubjectsMapping[userBranch] || branchSubjectsMapping["علمي علوم"];
  const container = document.getElementById('treeSubjectsGrid');
  if (!container) return;

  let subjectsProgressData = {}; // تجميع الإحصائيات للأب

  let html = "";
  for (const sName of subjs) {
    const chapters = subjectLessonsTree[sName] || [];
    let totalLessons = 0, doneLessons = 0;

    for (const ch of chapters) {
      for (const ls of ch.lessons) {
        totalLessons++;
        const summaries = await getLessonSummaries(lessonKey(sName, ch.id, ls.id));
        if (summaries && summaries.length > 0) doneLessons++;
      }
    }

    const pct = totalLessons > 0 ? Math.round((doneLessons / totalLessons) * 100) : 0;
    const icon = (subjectFullDetailsData[sName] && subjectFullDetailsData[sName].icon) || "📘";

    // حفظ البيانات لرفعها للأب
    subjectsProgressData[sName] = { done: doneLessons, total: totalLessons, pct: pct };

    html += `
      <div class="tree-subject-chip" onclick="openSubjectChapters('${sName.replace(/'/g, "\\'")}')">
        <div style="font-size:26px;">${icon}</div>
        <div style="font-size:13px; font-weight:bold; color:var(--text); margin-top:6px;">${sName}</div>
        <div class="tree-progress-bar"><div class="tree-progress-fill" style="width:${pct}%;"></div></div>
        <div style="font-size:11px; color:var(--gold); margin-top:4px;">${doneLessons} من ${totalLessons} درس (${pct}%)</div>
      </div>
    `;
  }

  container.innerHTML = html;
  document.getElementById('treeBreadcrumb').textContent = "اختر المادة اللي عايز تشتغل عليها 👇";
  document.getElementById('treeChaptersView').style.display = 'none';
  document.getElementById('treeSubjectsGrid').style.display = 'grid';

  // ☁️ مزامنة تقدم شجرة المواد مع السحاب للأب
  syncTreeProgressToCloud(subjectsProgressData);
}

// دالة رفع تقدم شجرة المواد لـ Firestore
async function syncTreeProgressToCloud(treeData) {
  if (!window.fireDB || !window.getMyStudentCode) return;
  const studentCode = window.getMyStudentCode();
  try {
    const studentRef = window.fireDoc(window.fireDB, "students", studentCode);
    await window.fireSetDoc(studentRef, { treeProgress: treeData }, { merge: true });
  } catch (e) {
    console.error("خطأ مزامنة الشجرة:", e);
  }
}

// ================= 📂 أبواب/فصول المادة =================
function openSubjectChapters(sName) {
  currentTreeSubject = sName;
  currentTreeChapter = null;

  document.getElementById('treeSubjectsGrid').style.display = 'none';
  document.getElementById('treeChaptersView').style.display = 'block';
  document.getElementById('treeBreadcrumb').innerHTML =
    `<span onclick="renderSubjectTreePage()" style="cursor:pointer; color:var(--gold);">🌳 الشجرة</span> ← ${sName}`;

  const chapters = subjectLessonsTree[sName] || [];
  const container = document.getElementById('treeChaptersList');

  container.innerHTML = chapters.map(ch => {
    const doneCount = ch.lessons.filter(ls => getLessonSummaries(lessonKey(sName, ch.id, ls.id)).length > 0).length;
    const pct = ch.lessons.length > 0 ? Math.round((doneCount / ch.lessons.length) * 100) : 0;
    const chapterHasSummary = getLessonSummaries(chapterKey(sName, ch.id)).length > 0;

    return `
      <div class="athr-card" style="margin-bottom:10px;">
        <div style="display:flex; justify-content:space-between; align-items:center; cursor:pointer;" onclick="toggleChapterOpen('${ch.id}')">
          <div style="font-weight:bold; color:var(--gold); font-size:14px;">📂 ${ch.name} ${chapterHasSummary ? '✅' : ''}</div>
          <div style="font-size:11px; color:var(--text2);">${pct}%</div>
        </div>
        <div class="tree-progress-bar" style="margin-top:6px;"><div class="tree-progress-fill" style="width:${pct}%;"></div></div>

        <div id="chapterBody_${ch.id}" style="display:none; margin-top:10px; border-top:1px dashed var(--border); padding-top:10px;">
          <div id="lessonsList_${ch.id}"></div>
          <button class="btn-small" style="width:100%; margin-top:8px; background:var(--green); color:#fff;" onclick="openChapterSummaryTools('${sName.replace(/'/g, "\\'")}', '${ch.id}')">
            ✨ اضغط هنا لتلخيص الفصل كله
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function toggleChapterOpen(chapterId) {
  const body = document.getElementById('chapterBody_' + chapterId);
  const isOpen = body.style.display === 'block';
  document.querySelectorAll('[id^="chapterBody_"]').forEach(b => b.style.display = 'none');

  if (!isOpen) {
    body.style.display = 'block';
    renderLessonsList(chapterId);
  }
}

async function renderLessonsList(chapterId) {
  const chapters = subjectLessonsTree[currentTreeSubject] || [];
  const ch = chapters.find(c => c.id === chapterId);
  if (!ch) return;

  const listEl = document.getElementById('lessonsList_' + chapterId);
  
  let html = '';
  for (const ls of ch.lessons) {
    const entries = await getLessonSummaries(lessonKey(currentTreeSubject, chapterId, ls.id));
    const hasSummary = entries.length > 0;
    html += `
      <div class="lesson-row" onclick="openLessonTools('${chapterId}', '${ls.id}')">
        <span>${hasSummary ? '✅' : '⬜'} ${ls.name}</span>
        <span style="font-size:11px; color:var(--gold);">${hasSummary ? entries.length + ' ملخص' : 'لخّص الدرس'}</span>
      </div>
    `;
  }
  listEl.innerHTML = html;
}  

// ================= 🛠️ بوب أب أدوات التلخيص (درس أو فصل) =================
function openLessonTools(chapterId, lessonId) {
  currentTreeChapter = chapterId;
  currentToolTarget = { subject: currentTreeSubject, chapterId, lessonId };

  const chapters = subjectLessonsTree[currentTreeSubject] || [];
  const ch = chapters.find(c => c.id === chapterId);
  const ls = ch.lessons.find(l => l.id === lessonId);

  document.getElementById('toolsModalTitle').textContent = "📝 تلخيص: " + ls.name;
  document.getElementById('toolTextBox').style.display = 'none';
  renderToolEntries(lessonKey(currentTreeSubject, chapterId, lessonId));
  document.getElementById('lessonToolsModal').classList.add('show');
}

function openChapterSummaryTools(sName, chapterId) {
  currentTreeChapter = chapterId;
  currentToolTarget = { subject: sName, chapterId, lessonId: null };

  const chapters = subjectLessonsTree[sName] || [];
  const ch = chapters.find(c => c.id === chapterId);

  document.getElementById('toolsModalTitle').textContent = "✨ تلخيص فصل: " + ch.name;
  document.getElementById('toolTextBox').style.display = 'none';
  renderToolEntries(chapterKey(sName, chapterId));
  document.getElementById('lessonToolsModal').classList.add('show');
}

function getCurrentKey() {
  if (!currentToolTarget) return null;
  return currentToolTarget.lessonId
    ? lessonKey(currentToolTarget.subject, currentToolTarget.chapterId, currentToolTarget.lessonId)
    : chapterKey(currentToolTarget.subject, currentToolTarget.chapterId);
}

async function renderToolEntries(key) {
  const entries = await getLessonSummaries(key); // أضفنا await هنا
  const container = document.getElementById('toolEntriesList');

  if (entries.length === 0) {
    container.innerHTML = `<div style="text-align:center; color:var(--text2); font-size:12px; padding:10px;">لسه معملتش أي تلخيص هنا 🌿</div>`;
    return;
  }

  container.innerHTML = entries.slice().reverse().map(e => `
    <div class="athr-card" style="margin-bottom:8px; padding:10px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
        <span style="font-size:11px; color:var(--gold); font-weight:bold;">
          ${e.type === 'text' ? '📝 نص' : e.type === 'image' ? '🖼️ صورة' : '🎙️ صوت'} • ${e.date}
        </span>
        <button onclick="removeToolEntry(${e.id})" style="background:transparent; border:none; color:#ff6b6b; cursor:pointer;">✕</button>
      </div>
      ${e.type === 'text' ? `<div style="font-size:13px; color:var(--text); line-height:1.7;">${e.content}</div>` : ''}
${e.type === 'image' ? `<img src="${e.content}" onclick="openImageViewer(this.src)" style="width:100%; border-radius:10px; border:1px solid var(--border); cursor:pointer;" title="اضغط للتكبير 🔍">` : ''}
      
      ${e.type === 'audio' ? `<audio controls style="width:100%;" src="${e.content}"></audio>` : ''}
    </div>
  `).join('');
}

async function removeToolEntry(entryId) {
  const key = getCurrentKey();
  await deleteSummaryEntry(key, entryId);
  await renderToolEntries(key);
  if (currentTreeChapter) await renderLessonsList(currentTreeChapter);
}

function closeLessonToolsModal() {
  document.getElementById('lessonToolsModal').classList.remove('show');
  stopRecordingIfActive();
}

// ---- إضافة نص ----
// مثال عند حفظ النص:
async function submitTextSummary() {
  const val = document.getElementById('toolTextInput').value.trim();
  if (!val) return;
  await saveSummaryEntry(getCurrentKey(), { id: Date.now(), type: 'text', content: val, date: new Date().toLocaleDateString('ar-EG') });
  document.getElementById('toolTextInput').value = '';
  document.getElementById('toolTextBox').style.display = 'none';
  renderToolEntries(getCurrentKey());
  if (currentTreeChapter) renderLessonsList(currentTreeChapter);
}

// ---- إضافة صورة ----
function handleToolImageUpload(inputEl) {
  const file = inputEl.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = async (e) => {
    await saveSummaryEntry(getCurrentKey(), { id: Date.now(), type: 'image', content: e.target.result, date: new Date().toLocaleDateString('ar-EG') });
    await renderToolEntries(getCurrentKey());
    if (currentTreeChapter) await renderLessonsList(currentTreeChapter);
    inputEl.value = '';
  };
  reader.readAsDataURL(file);
}

// ---- تسجيل فويس ----
let recordingTimerInterval = null;
let recordingSeconds = 0;

async function toggleVoiceRecording() {
  const btn = document.getElementById('toolRecordBtn');

  if (activeMediaRecorder && activeMediaRecorder.state === 'recording') {
    activeMediaRecorder.stop();
    clearInterval(recordingTimerInterval);
    return;
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    recordedAudioChunks = [];
    activeMediaRecorder = new MediaRecorder(stream);

    activeMediaRecorder.ondataavailable = (e) => recordedAudioChunks.push(e.data);
    activeMediaRecorder.onstop = () => {
      clearInterval(recordingTimerInterval);
      const blob = new Blob(recordedAudioChunks, { type: 'audio/webm' });
      const reader = new FileReader();
      reader.onload = async (e) => {
        await saveSummaryEntry(getCurrentKey(), { id: Date.now(), type: 'audio', content: e.target.result, date: new Date().toLocaleDateString('ar-EG') });
        await renderToolEntries(getCurrentKey());
        if (currentTreeChapter) await renderLessonsList(currentTreeChapter);
      };
      reader.readAsDataURL(blob);
      stream.getTracks().forEach(t => t.stop());
      btn.textContent = "🎙️ سجّل فويس";
      btn.style.background = "var(--card)";
    };

    activeMediaRecorder.start();
    recordingSeconds = 0;
    
    // العداد التفاعلي بالثواني
    recordingTimerInterval = setInterval(() => {
      recordingSeconds++;
      const mins = Math.floor(recordingSeconds / 60);
      const secs = recordingSeconds % 60;
      btn.textContent = `🔴 جاري التسجيل (${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')})`;
    }, 1000);

    btn.style.background = "#ff6b6b";
  } catch (err) {
    alert("مش قادر أوصل للميكروفون، تأكد من إذن الميكروفون في المتصفح 🎙️");
  }
}

function stopRecordingIfActive() {
  if (activeMediaRecorder && activeMediaRecorder.state === 'recording') {
    activeMediaRecorder.stop();
  }
}
// 🔍 دالة فتح الصورة بحجم الشاشة
function openImageViewer(imgSrc) {
  const modal = document.getElementById('imageViewerModal');
  const imgEl = document.getElementById('fullImageView');
  if (modal && imgEl) {
    imgEl.src = imgSrc;
    modal.style.display = 'flex';
  }
}

// ✕ دالة إغلاق الصورة المكبرة
function closeImageViewer() {
  const modal = document.getElementById('imageViewerModal');
  if (modal) modal.style.display = 'none';
}
