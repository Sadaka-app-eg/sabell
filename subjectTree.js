// ===============================================
// 🌳 شجرة المواد والدروس - subjectTree.js
// ===============================================
// عشان تضيف دروس جديدة: زوّد عنصر جديد جوه مصفوفة lessons
// بنفس الشكل ده بالظبط: { id: "معرف_فريد", name: "اسم الدرس" }
// المعرف (id) لازم يكون فريد جوه نفس الباب، وما يتكررش
// ===============================================

// ===============================================
// 🌳 شجرة المواد والدروس - subjectTree.js
// ===============================================

const subjectLessonsTree = {
  "اللغة العربية": [
    {
      id: "ar_nahw",
      name: "النحو",
      lessons: [
        { id: "ar_n_1", name: "الوحدة 1 - الهمزات وقواعد الإملاء" },
        { id: "ar_n_2", name: "الوحدة 2 - الأبنية والمشتقات والمصادر" },
        { id: "ar_n_3", name: "الوحدة 3 - النواسخ (المبتدأ والخبر وكان وإخواتها)" },
        { id: "ar_n_4", name: "الوحدة 4 - المنصوبات والمفاعيل والحال" },
        { id: "ar_n_5", name: "الوحدة 5 - بناء وإعراب الأفعال وجزم المضارع" },
        { id: "ar_n_6", name: "الوحدة 6 - التوابع والأدوات وحروف الجر" },
        { id: "ar_n_7", name: "الوحدة 7 - الممنوع من الصرف والأساليب" }
      ]
    },
    {
      id: "ar_adab",
      name: "الأدب",
      lessons: [
        { id: "ar_a_1", name: "مدرسة الإحياء والبعث وجيل التطوير" },
        { id: "ar_a_2", name: "المدرسة الرومانتيكية (مطران)" },
        { id: "ar_a_3", name: "مدرسة الديوان" },
        { id: "ar_a_4", name: "مدرسة أبوللو" },
        { id: "ar_a_5", name: "مدرسة المهاجر" },
        { id: "ar_a_6", name: "المدرسة الواقعية (الشعر الجديد)" },
        { id: "ar_a_7", name: "الفنون النثرية (القصة والرمان والمسرحية)" }
      ]
    },
    {
      id: "ar_balagha",
      name: "البلاغة",
      lessons: [
        { id: "ar_b_1", name: "الصور البيانية والمحسنات البديعية" },
        { id: "ar_b_2", name: "علم المعاني والأساليب (الخبر والإنشاء)" },
        { id: "ar_b_3", name: "التجربة الشعرية والوحدة العضوية" }
      ]
    }
  ],

  "الفيزياء": [
    {
      id: "ph_electric",
      name: "الفيزياء الكهربية",
      lessons: [
        { id: "ph_e_1", name: "التيار الكهربي وقانون أوم والمقاومة النوعية" },
        { id: "ph_e_2", name: "توصيل المقاومات (توالي وتوازي)" },
        { id: "ph_e_3", name: "قانون أوم للدائرة المغلقة" },
        { id: "ph_e_4", name: "قانونا كيرشوف" },
        { id: "ph_e_5", name: "المجال المغناطيسي للسلك والملف الدائري والحلزوني" },
        { id: "ph_e_6", name: "القوة المغناطيسية وعزم الازدواج" },
        { id: "ph_e_7", name: "أجهزة القياس (الجلفانو، الأميتر، الفولتميتر، الأوميتر)" },
        { id: "ph_e_8", name: "قانون فاراداي والحث الذاتي والمتبادل" },
        { id: "ph_e_9", name: "المولد الكهربي (الدينامو)" },
        { id: "ph_e_10", name: "المحول الكهربي والمحرك (الموتور)" },
        { id: "ph_e_11", name: "الأميتر الحراري ودوائر المقاومة والمكثف والملف" },
        { id: "ph_e_12", name: "دائرة الرنين والدائرة المهتزة" }
      ]
    },
    {
      id: "ph_modern",
      name: "الفيزياء الحديثة",
      lessons: [
        { id: "ph_m_1", name: "الفصل 5 - ازدواجية الموجة والجسيم وتأثير كومتون" },
        { id: "ph_m_2", name: "الفصل 6 - الأطياف الذرية والأشعة السينية" },
        { id: "ph_m_3", name: "الفصل 7 - انبعاث وتركيب وتطبيقات الليزر" },
        { id: "ph_m_4", name: "الفصل 8 - الإلكترونيات وأشباه الموصلات والبوابات" }
      ]
    }
  ],

  "الكيمياء": [
    {
      id: "ch_inorganic",
      name: "الكيمياء غير العضوية",
      lessons: [
        { id: "ch_in_1", name: "الباب 1 - الأهمية الاقتصادية والتركيب الإلكتروني للانتقالية" },
        { id: "ch_in_2", name: "الباب 1 - خواص عناصر السلسلة الانتقالية الأولى" },
        { id: "ch_in_3", name: "الباب 1 - استخلاص الحديد والسبائك وخواص الأكاسيد" },
        { id: "ch_in_4", name: "الباب 2 - التحليل الكيفي (الكشف عن الأنيونات والكاتيونات)" },
        { id: "ch_in_5", name: "الباب 2 - التحليل الكمي (المعايرة والتطاير والترسيب)" },
        { id: "ch_in_6", name: "الباب 3 - الاتزان الكيميائي وقانون فعل الكتلة" },
        { id: "ch_in_7", name: "الباب 3 - الاتزان الأيوني والأس الهيدروجيني pH وحاصل الإذابة" },
        { id: "ch_in_8", name: "الباب 4 - الخلايا الجلفانية وسلسلة الجهود الكهربية" },
        { id: "ch_in_9", name: "الباب 4 - الخلايا الثانوية وتآكل المعادن" },
        { id: "ch_in_10", name: "الباب 4 - خلايا التحليل الكهربي وقوانين فاراداي" }
      ]
    },
    {
      id: "ch_organic",
      name: "الكيمياء العضوية",
      lessons: [
        { id: "ch_or_1", name: "الهيدروكربونات - الألكانات (الميثان)" },
        { id: "ch_or_2", name: "الهيدروكربونات - الألكينات (الإيثيلين)" },
        { id: "ch_or_3", name: "الهيدروكربونات - الألكاينات (الإيثاين)" },
        { id: "ch_or_4", name: "الهيدروكربونات الحلقية والبنزين العطري" },
        { id: "ch_or_5", name: "مشتقات الهيدروكربونات - الكحولات والفينولات" },
        { id: "ch_or_6", name: "مشتقات الهيدروكربونات - الأحماض الكاربوكسيلية والاسترات" }
      ]
    }
  ],

  "الأحياء": [
    {
      id: "bi_function",
      name: "التركيب الوظيفي",
      lessons: [
        { id: "bi_f_1", name: "الفصل 1 - الدعامة في النبات والإنسان" },
        { id: "bi_f_2", name: "الفصل 1 - الحركة في النبات والقطعة العضلية" },
        { id: "bi_f_3", name: "الفصل 2 - الغدة النخامية والدرقية والبارادرقية" },
        { id: "bi_f_4", name: "الفصل 2 - الغدتان الكظريتان والبنكرياس والتناسلية" },
        { id: "bi_f_5", name: "الفصل 3 - طرق التكاثر اللاجنسي والجنسي وتعاقب الأجيال" },
        { id: "bi_f_6", name: "الفصل 3 - التكاثر في النباتات الزهرية" },
        { id: "bi_f_7", name: "الفصل 3 - الجهاز التناسلي الذكري والأنثوي ودورة الطمث" },
        { id: "bi_f_8", name: "الفصل 3 - الإخصاب والحمل والتوائم" },
        { id: "bi_f_9", name: "الفصل 4 - المناعة في النبات" },
        { id: "bi_f_10", name: "الفصل 4 - مكونات الجهاز المناعي في الإنسان" },
        { id: "bi_f_11", name: "الفصل 4 - آليات المناعة (خط الدفاع 1 و 2 و 3)" }
      ]
    },
    {
      id: "bi_molecular",
      name: "البيولوجيا الجزئية",
      lessons: [
        { id: "bi_m_1", name: "DNA - أدلة المادة الوراثية وتركيب الشريط" },
        { id: "bi_m_2", name: "DNA - تضاعف الحمض وإصلاح العيوب" },
        { id: "bi_m_3", name: "DNA - أوليات وحقيقيات النواة والجينوم والفرص" },
        { id: "bi_m_4", name: "RNA - أنواع الحمض وشفرة تخليق البروتين" },
        { id: "bi_m_5", name: "RNA - الهندسة الوراثية والتكنولوجيا الجينية" }
      ]
    }
  ],

  "الرياضيات (تفاضل وتكامل)": [
    {
      id: "ma_calc",
      name: "التفاضل والتكامل",
      lessons: [
        { id: "ma_c_1", name: "الوحدة 1 - اشتقاق الدوال المثلثية والضمنية والبارامترية" },
        { id: "ma_c_2", name: "الوحدة 1 - المشتقات العليا ومعادلات المماس والعمودي" },
        { id: "ma_c_3", name: "الوحدة 2 - الدوال الأسية واللوغاريتمية وتفاضلها وتكاملها" },
        { id: "ma_c_4", name: "الوحدة 3 - التزايد والتناقص والنقط الحرجة ورسم المنحنيات" },
        { id: "ma_c_5", name: "الوحدة 3 - تطبيقات القيم العظمى والصغرى المطلقة" },
        { id: "ma_c_6", name: "الوحدة 4 - طرق التكامل (التجزئة والتعويض والمساحات والحجوم)" }
      ]
    }
  ],

  "الرياضيات (جبر وهندسة فراغية)": [
    {
      id: "ma_algebra",
      name: "الجبر والهندسة الفراغية",
      lessons: [
        { id: "ma_a_1", name: "الجبر - مبدأ العد والتباديل والتوافيق" },
        { id: "ma_a_2", name: "الجبر - نظرية ذات الحدين ذات الأس الصحيح الموجب" },
        { id: "ma_a_3", name: "الجبر - الأعداد المركبة والشكل المثلثي وأوميقا" },
        { id: "ma_a_4", name: "الجبر - المحددات والمصفوفات وأنظمة المعادلات" },
        { id: "ma_a_5", name: "الفراغية - النظام الإحداثي المتعامد ومتجهات الفراغ" },
        { id: "ma_a_6", name: "الفراغية - معادلة الخط المستقيم ومعادلة المستوى في الفراغ" }
      ]
    }
  ],

  "الرياضيات (استاتيكا وديناميكا)": [
    {
      id: "ma_static_dyn",
      name: "الاستاتيكا والديناميكا",
      lessons: [
        { id: "ma_sd_1", name: "استاتيكا - الاحتكاك على المستويات الأفقية والمائلة" },
        { id: "ma_sd_2", name: "استاتيكا - العزوم والقوى المتوازية المستوية" },
        { id: "ma_sd_3", name: "استاتيكا - الاتزان العام والازدواجات ومركز الثقل" },
        { id: "ma_sd_4", name: "ديناميكا - تفاضل وتكامل الدوال المتجهة" },
        { id: "ma_sd_5", name: "ديناميكا - قوانين نيوتن الثلاثة للحركة" },
        { id: "ma_sd_6", name: "ديناميكا - الدفع والزخم والشغل والقدرة والطاقة" }
      ]
    }
  ],

  "اللغة الإنجليزية": [
    {
      id: "en_grammar_skills",
      name: "Grammar & Skills",
      lessons: [
        { id: "en_g_1", name: "Unit 1: Past Tenses & Used to" },
        { id: "en_g_2", name: "Unit 2: Present Perfect Simple & Continuous" },
        { id: "en_g_3", name: "Unit 3: Future Forms & Time Clauses" },
        { id: "en_g_4", name: "Unit 4: Modals of Necessity, Deduction & Suggestion" },
        { id: "en_g_5", name: "Unit 5: Passive Voice (All Tenses)" },
        { id: "en_g_6", name: "Unit 6: Reported Speech (Statements & Questions)" },
        { id: "en_g_7", name: "Unit 7: Conditionals (If / Wish Clauses)" },
        { id: "en_g_8", name: "Unit 8: Relative Clauses (Who, Which, Where, Whose)" },
        { id: "en_g_9", name: "Unit 9: Causative Verbs (Have / Get)" },
        { id: "en_g_10", name: "Unit 10-12: Quantifiers, Articles & Writing Skills" }
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
async function deleteSummaryEntry(key, entryId) {
  const user = auth.currentUser;
  const userKey = user ? `sm_summaries_${user.uid}` : 'sm_summaries_guest';
  
  let all = await localforage.getItem(userKey) || {};
  if (!all[key]) return;
  
  all[key] = all[key].filter(e => e.id !== entryId);
  await localforage.setItem(userKey, all);
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
