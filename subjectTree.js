// ===============================================
// 🌳 شجرة المواد والدروس - subjectTree.js
// ===============================================
// عشان تضيف دروس جديدة: زوّد عنصر جديد جوه مصفوفة lessons
// بنفس الشكل ده بالظبط: { id: "معرف_فريد", name: "اسم الدرس" }
// المعرف (id) لازم يكون فريد جوه نفس الباب، وما يتكررش
// ===============================================

const subjectLessonsTree = {
  "اللغة العربية": [
    { id: "ar_nahw", name: "النحو", lessons: [
      { id: "ar_nahw_1", name: "الدرس 1 - الأساليب النحوية" },
      { id: "ar_nahw_2", name: "الدرس 2 - الإعراب التقديري والمحلي" }
    ]},
    { id: "ar_balagha", name: "البلاغة", lessons: [
      { id: "ar_bal_1", name: "الدرس 1 - علم البيان" },
      { id: "ar_bal_2", name: "الدرس 2 - علم البديع" }
    ]},
    { id: "ar_adab", name: "الأدب", lessons: [
      { id: "ar_adab_1", name: "الدرس 1 - المدرسة الكلاسيكية" }
    ]},
    { id: "ar_nosos", name: "النصوص والقراءة", lessons: [
      { id: "ar_nosos_1", name: "الدرس 1 - النص الأول" }
    ]}
  ],
  "اللغة الإنجليزية": [
    { id: "en_grammar", name: "الجرامر (Grammar)", lessons: [
      { id: "en_gr_1", name: "Unit 1" }
    ]},
    { id: "en_vocab", name: "الكلمات (Vocabulary)", lessons: [
      { id: "en_vo_1", name: "Unit 1" }
    ]},
    { id: "en_skills", name: "المهارات (Skills)", lessons: [
      { id: "en_sk_1", name: "Translation" }
    ]}
  ],
  "الفيزياء": [
    { id: "ph_electric", name: "الفيزياء الكهربية", lessons: [
      { id: "ph_el_1", name: "قانون أوم" },
      { id: "ph_el_2", name: "قوانين كيرشوف" }
    ]},
    { id: "ph_modern", name: "الفيزياء الحديثة", lessons: [
      { id: "ph_mo_1", name: "إشعاع الجسم الأسود" }
    ]}
  ],
  "الكيمياء": [
    { id: "ch_inorganic", name: "الكيمياء غير العضوية", lessons: [
      { id: "ch_in_1", name: "العناصر الانتقالية" }
    ]},
    { id: "ch_organic", name: "الكيمياء العضوية", lessons: [
      { id: "ch_or_1", name: "الهيدروكربونات" }
    ]}
  ],
  "الأحياء": [
    { id: "bi_function", name: "التركيب الوظيفي", lessons: [
      { id: "bi_fn_1", name: "الدعامة والحركة" }
    ]},
    { id: "bi_molecular", name: "البيولوجيا الجزئية", lessons: [
      { id: "bi_mo_1", name: "DNA" }
    ]}
  ],
  "الرياضيات (تفاضل وتكامل)": [
    { id: "ma_calc", name: "التفاضل والتكامل", lessons: [
      { id: "ma_c_1", name: "اشتقاق الدوال" }
    ]}
  ],
  "الرياضيات (جبر وهندسة فراغية)": [
    { id: "ma_algebra", name: "الجبر والهندسة الفراغية", lessons: [
      { id: "ma_a_1", name: "المحددات" }
    ]}
  ],
  "الرياضيات (استاتيكا وديناميكا)": [
    { id: "ma_static", name: "الاستاتيكا", lessons: [
      { id: "ma_s_1", name: "الاحتكاك" }
    ]},
    { id: "ma_dynamic", name: "الديناميكا", lessons: [
      { id: "ma_d_1", name: "قوانين نيوتن" }
    ]}
  ]
};

let currentTreeSubject = null;
let currentTreeChapter = null;
let activeMediaRecorder = null;
let recordedAudioChunks = [];
let currentToolTarget = null; // { subject, chapterId, lessonId|null }

// ================= 💾 تخزين الملخصات =================
function getLessonSummaries(key) {
  const all = JSON.parse(localStorage.getItem('sm_summaries') || '{}');
  return all[key] || [];
}

function saveSummaryEntry(key, entry) {
  const all = JSON.parse(localStorage.getItem('sm_summaries') || '{}');
  if (!all[key]) all[key] = [];
  all[key].push(entry);
  try {
    localStorage.setItem('sm_summaries', JSON.stringify(all));
  } catch (e) {
    alert("مساحة التخزين قربت تخلص 😅 امسح بعض الملخصات القديمة (خصوصاً الصوتية) وجرب تاني.");
  }
}

function deleteSummaryEntry(key, entryId) {
  const all = JSON.parse(localStorage.getItem('sm_summaries') || '{}');
  if (!all[key]) return;
  all[key] = all[key].filter(e => e.id !== entryId);
  localStorage.setItem('sm_summaries', JSON.stringify(all));
}

function lessonKey(subject, chapterId, lessonId) {
  return `${subject}::${chapterId}::${lessonId}`;
}
function chapterKey(subject, chapterId) {
  return `${subject}::${chapterId}::__chapter__`;
}

// ================= 🌳 الصفحة الرئيسية للشجرة (المواد) =================
function renderSubjectTreePage() {
  currentTreeSubject = null;
  currentTreeChapter = null;

  const subjs = branchSubjectsMapping[userBranch] || branchSubjectsMapping["علمي علوم"];
  const container = document.getElementById('treeSubjectsGrid');
  if (!container) return;

  container.innerHTML = subjs.map(sName => {
    const chapters = subjectLessonsTree[sName] || [];
    let totalLessons = 0, doneLessons = 0;
    chapters.forEach(ch => {
      ch.lessons.forEach(ls => {
        totalLessons++;
        if (getLessonSummaries(lessonKey(sName, ch.id, ls.id)).length > 0) doneLessons++;
      });
    });
    const pct = totalLessons > 0 ? Math.round((doneLessons / totalLessons) * 100) : 0;
    const icon = (subjectFullDetailsData[sName] && subjectFullDetailsData[sName].icon) || "📘";

    return `
      <div class="tree-subject-chip" onclick="openSubjectChapters('${sName.replace(/'/g, "\\'")}')">
        <div style="font-size:26px;">${icon}</div>
        <div style="font-size:13px; font-weight:bold; color:var(--text); margin-top:6px;">${sName}</div>
        <div class="tree-progress-bar"><div class="tree-progress-fill" style="width:${pct}%;"></div></div>
        <div style="font-size:11px; color:var(--gold); margin-top:4px;">${pct}% مُلخّص</div>
      </div>
    `;
  }).join('');

  document.getElementById('treeBreadcrumb').textContent = "اختر المادة اللي عايز تشتغل عليها 👇";
  document.getElementById('treeChaptersView').style.display = 'none';
  document.getElementById('treeSubjectsGrid').style.display = 'grid';
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

function renderLessonsList(chapterId) {
  const chapters = subjectLessonsTree[currentTreeSubject] || [];
  const ch = chapters.find(c => c.id === chapterId);
  if (!ch) return;

  const listEl = document.getElementById('lessonsList_' + chapterId);
  listEl.innerHTML = ch.lessons.map(ls => {
    const entries = getLessonSummaries(lessonKey(currentTreeSubject, chapterId, ls.id));
    const hasSummary = entries.length > 0;
    return `
      <div class="lesson-row" onclick="openLessonTools('${chapterId}', '${ls.id}')">
        <span>${hasSummary ? '✅' : '⬜'} ${ls.name}</span>
        <span style="font-size:11px; color:var(--gold);">${hasSummary ? entries.length + ' ملخص' : 'لخّص الدرس'}</span>
      </div>
    `;
  }).join('');
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

function renderToolEntries(key) {
  const entries = getLessonSummaries(key);
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
      ${e.type === 'image' ? `<img src="${e.content}" style="width:100%; border-radius:10px; border:1px solid var(--border);">` : ''}
      ${e.type === 'audio' ? `<audio controls style="width:100%;" src="${e.content}"></audio>` : ''}
    </div>
  `).join('');
}

function removeToolEntry(entryId) {
  const key = getCurrentKey();
  deleteSummaryEntry(key, entryId);
  renderToolEntries(key);
  if (currentTreeChapter) renderLessonsList(currentTreeChapter);
}

function closeLessonToolsModal() {
  document.getElementById('lessonToolsModal').classList.remove('show');
  stopRecordingIfActive();
}

// ---- إضافة نص ----
function submitTextSummary() {
  const val = document.getElementById('toolTextInput').value.trim();
  if (!val) return;
  saveSummaryEntry(getCurrentKey(), { id: Date.now(), type: 'text', content: val, date: new Date().toLocaleDateString('ar-EG') });
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
  reader.onload = (e) => {
    saveSummaryEntry(getCurrentKey(), { id: Date.now(), type: 'image', content: e.target.result, date: new Date().toLocaleDateString('ar-EG') });
    renderToolEntries(getCurrentKey());
    if (currentTreeChapter) renderLessonsList(currentTreeChapter);
    inputEl.value = '';
  };
  reader.readAsDataURL(file);
}

// ---- تسجيل فويس ----
async function toggleVoiceRecording() {
  const btn = document.getElementById('toolRecordBtn');

  if (activeMediaRecorder && activeMediaRecorder.state === 'recording') {
    activeMediaRecorder.stop();
    return;
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    recordedAudioChunks = [];
    activeMediaRecorder = new MediaRecorder(stream);

    activeMediaRecorder.ondataavailable = (e) => recordedAudioChunks.push(e.data);
    activeMediaRecorder.onstop = () => {
      const blob = new Blob(recordedAudioChunks, { type: 'audio/webm' });
      const reader = new FileReader();
      reader.onload = (e) => {
        saveSummaryEntry(getCurrentKey(), { id: Date.now(), type: 'audio', content: e.target.result, date: new Date().toLocaleDateString('ar-EG') });
        renderToolEntries(getCurrentKey());
        if (currentTreeChapter) renderLessonsList(currentTreeChapter);
      };
      reader.readAsDataURL(blob);
      stream.getTracks().forEach(t => t.stop());
      btn.textContent = "🎙️ سجّل فويس";
      btn.style.background = "var(--card)";
    };

    activeMediaRecorder.start();
    btn.textContent = "⏹️ إيقاف التسجيل";
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
