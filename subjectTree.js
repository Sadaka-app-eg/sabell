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

// ===============================================
// 🌳 المصفوفة الشاملة والكاملة لشجرة المواد والدروس - subjectTree.js
// ===============================================

const subjectLessonsTree = {
  // ----------------------------------------------------
  // 1️⃣ اللغة العربية (مشتركة)
  // ----------------------------------------------------
  "اللغة العربية": [
    {
      id: "ar_u1",
      name: "الوحدة الأولى: قواعد الإملاء والهمزات",
      lessons: [
        { id: "ar_u1_l1", name: "الدرس 1: همزتا القطع والوصل" },
        { id: "ar_u1_l2", name: "الدرس 2: الهمزة المتوسطة والمتطرفة" },
        { id: "ar_u1_l3", name: "الدرس 3: الفرق بين التاء المربوطة والهاء والتاء المفتوحة" },
        { id: "ar_u1_l4", name: "الدرس 4: أنواع الواو في آخر الكلمة" }
      ]
    },
    {
      id: "ar_u2",
      name: "الوحدة الثانية: المشتقات والمصادر والأبنية",
      lessons: [
        { id: "ar_u2_l1", name: "الدرس 1: اسم الفاعل وصيغ المبالغة واسم المفعول وإعمالهم" },
        { id: "ar_u2_l2", name: "الدرس 2: اسما الزمان والمكان واسم الآلة" },
        { id: "ar_u2_l3", name: "الدرس 3: اسم التفضيل وحالاته وأحكامه" },
        { id: "ar_u2_l4", name: "الدرس 4: المصادر (الصريحة، المؤولة، الميمية، الصناعية)" },
        { id: "ar_u2_l5", name: "الدرس 5: الاسم المقصور والمنقوص والممدود" }
      ]
    },
    {
      id: "ar_u3",
      name: "الوحدة الثالثة: النواسخ والمبتدأ والخبر",
      lessons: [
        { id: "ar_u3_l1", name: "الدرس 1: المبتدأ والخبر وأحكام تقديم الخبر وجوباً وجوازاً" },
        { id: "ar_u3_l2", name: "الدرس 2: كان وأخواتها (التامة والناقصة)" },
        { id: "ar_u3_l3", name: "الدرس 3: كاد وأخواتها (أفعال المقاربة والرجاء والشروع)" },
        { id: "ar_u3_l4", name: "الدرس 4: إن وأخواتها ولا النافية للجنس" }
      ]
    },
    {
      id: "ar_u4",
      name: "الوحدة الرابعة: المنصوبات والمفاعيل",
      lessons: [
        { id: "ar_u4_l1", name: "الدرس 1: المفعول به والمفعول المطلق والنائب عنه" },
        { id: "ar_u4_l2", name: "الدرس 2: المفعول لأجله والمفعول معه والمفعول فيه (الظرف)" },
        { id: "ar_u4_l3", name: "الدرس 3: الحال واستثناء إلا وغير وسوى" },
        { id: "ar_u4_l4", name: "الدرس 4: تمييز الملفوظ والملموظ وأحكام تمييز العدد" }
      ]
    },
    {
      id: "ar_u5",
      name: "الوحدة الخامسة: إعراب وبناء الأفعال",
      lessons: [
        { id: "ar_u5_l1", name: "الدرس 1: بناء الفعل الماضي والأمر والمضارع" },
        { id: "ar_u5_l2", name: "الدرس 2: نصب الفعل المضارع ونواصبه" },
        { id: "ar_u5_l3", name: "الدرس 3: جزم المضارع في الجواب والأدوات الجازمة" },
        { id: "ar_u5_l4", name: "الدرس 4: اقتران جواب الشرط بالفاء وتوكيد الفعل بالنون" }
      ]
    },
    {
      id: "ar_adab",
      name: "وحدة الأدب والشعر والنثر",
      lessons: [
        { id: "ar_ad_l1", name: "الدرس 1: مدرسة الإحياء والبعث وجيل التطوير" },
        { id: "ar_ad_l2", name: "الدرس 2: الاتجاه الوجداني (المدرسة الرومانتيكية مطران)" },
        { id: "ar_ad_l3", name: "الدرس 3: مدرسة الديوان وأبوللو والمهاجر" },
        { id: "ar_ad_l4", name: "الدرس 4: المدرسة الواقعية والفنون النثرية (الرواية والقصة والمسرحية)" }
      ]
    }
  ],

 // ----------------------------------------------------
  // 2️⃣ اللغة الإنجليزية (معدلة: كلمات + جرامر + قصة + مهارات)
  // ----------------------------------------------------
  "اللغة الإنجليزية": [
    {
      id: "en_u1_3",
      name: "الوحدة 1 إلى 3: (Vocab, Grammar & Novel)",
      lessons: [
        { id: "en_u1_voc", name: "Unit 1: Vocabulary & Key Terms (Read all about it)" },
        { id: "en_u1_gra", name: "Unit 1: Grammar (Past Simple, Past Continuous & Past Perfect)" },
        { id: "en_u2_voc", name: "Unit 2: Vocabulary & Collocations (Her story)" },
        { id: "en_u2_gra", name: "Unit 2: Grammar (Present Perfect Simple & Continuous)" },
        { id: "en_u3_voc", name: "Unit 3: Vocabulary & Idioms (Beyond space)" },
        { id: "en_u3_gra", name: "Unit 3: Grammar (Future Forms & Future Perfect)" }
      ]
    },
    {
      id: "en_u4_6",
      name: "الوحدة 4 إلى 6: (Vocab, Grammar & Novel)",
      lessons: [
        { id: "en_u4_voc", name: "Unit 4: Vocabulary (Taking care of ourselves)" },
        { id: "en_u4_gra", name: "Unit 4: Grammar (Modals: Necessity, Deduction & Suggestion)" },
        { id: "en_u5_voc", name: "Unit 5: Vocabulary (Connections & Technology)" },
        { id: "en_u5_gra", name: "Unit 5: Grammar (Phrasal Verbs & Passive Voice)" },
        { id: "en_u6_voc", name: "Unit 6: Vocabulary (Let's get it done)" },
        { id: "en_u6_gra", name: "Unit 6: Grammar (Causative & Reported Speech)" }
      ]
    },
    {
      id: "en_u7_9",
      name: "الوحدة 7 إلى 9: (Vocab & Advanced Grammar)",
      lessons: [
        { id: "en_u7_voc", name: "Unit 7: Vocabulary (Meaningful work)" },
        { id: "en_u7_gra", name: "Unit 7: Grammar (Conditionals & If Alternatives)" },
        { id: "en_u8_voc", name: "Unit 8: Vocabulary (High-tech devices)" },
        { id: "en_u8_gra", name: "Unit 8: Grammar (Relative Clauses: Who, Which, Where, Whose)" },
        { id: "en_u9_voc", name: "Unit 9: Vocabulary (Starting over & Experience)" },
        { id: "en_u9_gra", name: "Unit 9: Grammar (Quantifiers & Articles: a, an, the)" }
      ]
    },
    {
      id: "en_u10_12",
      name: "الوحدة 10 إلى 12: (Vocab & Revision)",
      lessons: [
        { id: "en_u10_voc", name: "Unit 10: Vocabulary (Ancient heritage)" },
        { id: "en_u10_gra", name: "Unit 10: Grammar (Compound Adjectives & Direct/Indirect)" },
        { id: "en_u11_voc", name: "Unit 11: Vocabulary (Finding a job)" },
        { id: "en_u11_gra", name: "Unit 11: Grammar (Inversion & Advanced Structures)" },
        { id: "en_u12_voc", name: "Unit 12: Vocabulary & Comprehensive Final Review" }
      ]
    },
    {
      id: "en_novel",
      name: "قصة التوقعات العظيمة (Great Expectations Novel)",
      lessons: [
        { id: "en_nov_1", name: "Great Expectations: Chapters 1 to 3 (Pip & The Convict)" },
        { id: "en_nov_2", name: "Great Expectations: Chapters 4 to 6 (Miss Havisham & Estella)" },
        { id: "en_nov_3", name: "Great Expectations: Chapters 7 to 9 (London & Secret Benefactor)" },
        { id: "en_nov_4", name: "Great Expectations: Chapters 10 to 12 (Climax, Truth & Redemption)" }
      ]
    },
    {
      id: "en_skills",
      name: "قسم المهارات (Writing, Translation & Passages)",
      lessons: [
        { id: "en_sk_1", name: "مهارات كتابة المقال والإيميل (Essay, Paragraph & Email Writing)" },
        { id: "en_sk_2", name: "علامات الترقيم وأجزاء الكلام (Punctuation Marks & Parts of Speech)" },
        { id: "en_sk_3", name: "فنيات الترجمة والتعامل مع قطع الفهم (Translation & Comprehension)" }
      ]
    }
  ],
  // ----------------------------------------------------
  // 4️⃣ الكيمياء (مشتركة)
  // ----------------------------------------------------
  "الكيمياء": [
    {
      id: "ch_b1",
      name: "الباب الأول: العناصر الانتقالية",
      lessons: [
        { id: "ch_b1_l1", name: "الدرس 1: العناصر الانتقالية والأهمية الاقتصادية والتركيب الإلكتروني" },
        { id: "ch_b1_l2", name: "الدرس 2: الخواص العامة لعناصر السلسلة الانتقالية الأولى" },
        { id: "ch_b1_l3", name: "الدرس 3: الحديد وتجهيز خاماته والسبائك وأكاسيد الحديد" }
      ]
    },
    {
      id: "ch_b2",
      name: "الباب الثاني: التحليل الكيميائي",
      lessons: [
        { id: "ch_b2_l1", name: "الدرس 1: التحليل الكيفي (الكشف عن الأنيونات والكاتيونات)" },
        { id: "ch_b2_l2", name: "الدرس 2: التحليل الكمي (المعايرة والتطاير والترسيب)" }
      ]
    },
    {
      id: "ch_b3",
      name: "الباب الثالث: الاتزان الكيميائي",
      lessons: [
        { id: "ch_b3_l1", name: "الدرس 1: الاتزان الكيميائي وقانون فعل الكتلة وقاعدة لوشاتيليه" },
        { id: "ch_b3_l2", name: "الدرس 2: الاتزان الأيوني وحساب pH والأس الهيدروجيني وحاصل الإذابة" }
      ]
    },
    {
      id: "ch_b4",
      name: "الباب الرابع: الكيمياء الكهربية",
      lessons: [
        { id: "ch_b4_l1", name: "الدرس 1: الخلايا الجلفانية وسلسلة الجهود الكهربية" },
        { id: "ch_b4_l2", name: "الدرس 2: الخلايا الثانوية وتآكل المعادن وقوانين فاراداي" }
      ]
    },
    {
      id: "ch_b5",
      name: "الباب الخامس: الكيمياء العضوية",
      lessons: [
        { id: "ch_b5_l1", name: "الدرس 1: الهيدروكربونات - الألكانات (الميثان)" },
        { id: "ch_b5_l2", name: "الدرس 2: الهيدروكربونات - الألكينات (الإيثيلين)" },
        { id: "ch_b5_l3", name: "الدرس 3: الهيدروكربونات - الألكاينات (الإيثاين)" },
        { id: "ch_b5_l4", name: "الدرس 4: الهيدروكربونات الحلقية والبنزين العطري" },
        { id: "ch_b5_l5", name: "الدرس 5: مشتقات الهيدروكربونات - الكحولات والفينولات" },
        { id: "ch_b5_l6", name: "الدرس 6: مشتقات الهيدروكربونات - الأحماض واستراتها" }
      ]
    }
  ],

  // ----------------------------------------------------
  // 5️⃣ الأحياء (خاص بعلمي علوم)
  // ----------------------------------------------------
  "الأحياء": [
    {
      id: "bio_u1",
      name: "الباب الأول: التركيب الوظيفي - الدعامة والحركة",
      lessons: [
        { id: "bio_u1_l1", name: "الدرس 1: الدعامة في النبات والهيكل العظمي في الإنسان" },
        { id: "bio_u1_l2", name: "الدرس 2: الحركة في النبات والانقباض العضلي في الإنسان" }
      ]
    },
    {
      id: "bio_u2",
      name: "الباب الثاني: التنسيق الهرموني",
      lessons: [
        { id: "bio_u2_l1", name: "الدرس 1: الغدة النخامية والدرقية والبارادرقية" },
        { id: "bio_u2_l2", name: "الدرس 2: الغدتان الكظريتان والبنكرياس والغدد التناسلية" }
      ]
    },
    {
      id: "bio_u3",
      name: "الباب الثالث: التكاثر في الكائنات الحية",
      lessons: [
        { id: "bio_u3_l1", name: "الدرس 1: طرق التكاثر اللاجنسي والجنسي وتعاقب الأجيال" },
        { id: "bio_u3_l2", name: "الدرس 2: التكاثر في النباتات الزهرية" },
        { id: "bio_u3_l3", name: "الدرس 3: الجهاز التناسلي ودورة الطمث والإخصاب والحمل" }
      ]
    },
    {
      id: "bio_u4",
      name: "الباب الرابع: المناعة في الكائنات الحية",
      lessons: [
        { id: "bio_u4_l1", name: "الدرس 1: المناعة التركيبية والبيوكيميائية في النبات" },
        { id: "bio_u4_l2", name: "الدرس 2: مكونات الجهاز المناعي والآليات المناعية في الإنسان" }
      ]
    },
    {
      id: "bio_u5",
      name: "الباب الخامس: البيولوجيا الجزئية (DNA & RNA)",
      lessons: [
        { id: "bio_u5_l1", name: "الدرس 1: DNA أدلة المادة الوراثية وتركيب الشريط والتضاعف" },
        { id: "bio_u5_l2", name: "الدرس 2: RNA وأنواعه وشفرة تخليق البروتين والهندسة الوراثية" }
      ]
    }
  ],

  // ----------------------------------------------------
  // 6️⃣ الرياضيات: تفاضل وتكامل (خاص بعلمي رياضة)
  // ----------------------------------------------------
  "الرياضيات (تفاضل وتكامل)": [
    {
      id: "calc_u1",
      name: "الباب الأول: الاشتقاق وتطبيقاته",
      lessons: [
        { id: "calc_u1_l1", name: "الدرس 1: اشتقاق الدوال المثلثية والضمنية والبارامترية" },
        { id: "calc_u1_l2", name: "الدرس 2: المشتقات العليا ومعادلات المماس والعمودي" },
        { id: "calc_u1_l3", name: "الدرس 3: المعدلات الزمنية المرتبطة" }
      ]
    },
    {
      id: "calc_u2",
      name: "الباب الثاني: تفاضل وتكامل الدوال الأسية واللوغاريتمية",
      lessons: [
        { id: "calc_u2_l1", name: "الدرس 1: العدد النيبيري وتفاضل الدوال الأسية واللوغاريتمية" },
        { id: "calc_u2_l2", name: "الدرس 2: تكامل الدوال الأسية واللوغاريتمية" }
      ]
    },
    {
      id: "calc_u3",
      name: "الباب الثالث: سلوك الدالة ورسم المنحنيات",
      lessons: [
        { id: "calc_u3_l1", name: "الدرس 1: التزايد والتناقص والنقط الحرجة والتحدب ونقط الانقلاب" },
        { id: "calc_u3_l2", name: "الدرس 2: تطبيقات القيم العظمى والصغرى المطلقة" }
      ]
    },
    {
      id: "calc_u4",
      name: "الباب الرابع: التكامل المحدد وتطبيقاته",
      lessons: [
        { id: "calc_u4_l1", name: "الدرس 1: طرق التكامل (التجزئة والتعويض)" },
        { id: "calc_u4_l2", name: "الدرس 2: حساب المساحات بين منحنيين والحجوم الدورانية" }
      ]
    }
  ],

  // ----------------------------------------------------
  // 7️⃣ الرياضيات: جبر وهندسة فراغية (خاص بعلمي رياضة)
  // ----------------------------------------------------
  "الرياضيات (جبر وهندسة فراغية)": [
    {
      id: "alg_u1",
      name: "الباب الأول: التباديل والتوافيق وذات الحدين",
      lessons: [
        { id: "alg_u1_l1", name: "الدرس 1: مبدأ العد الأساسي والتباديل والتوافيق" },
        { id: "alg_u1_l2", name: "الدرس 2: نظرية ذات الحدين ذات الأس الصحيح الموجب" }
      ]
    },
    {
      id: "alg_u2",
      name: "الباب الثاني: الأعداد المركبة والمحددات",
      lessons: [
        { id: "alg_u2_l1", name: "الدرس 1: الصورة المثلثية والأوسية (أويلر) وجذور الأعداد المركبة وأوميقا" },
        { id: "alg_u2_l2", name: "الدرس 2: خواص المحددات والمصفوفات والمعكوس الضربي وحل المعادلات" }
      ]
    },
    {
      id: "geo_u1",
      name: "الباب الثالث: الهندسة الفراغية الثلاثية",
      lessons: [
        { id: "geo_u1_l1", name: "الدرس 1: النظام الإحداثي المتعامد ومتجهات الفراغ والضرب القياسي والاتجاهي" },
        { id: "geo_u1_l2", name: "الدرس 2: معادلات الخط المستقيم والمستوى في الفراغ ومعادلة الكرة" }
      ]
    }
  ],

  // ----------------------------------------------------
  // 8️⃣ الرياضيات: استاتيكا وديناميكا (خاص بعلمي رياضة)
  // ----------------------------------------------------
  "الرياضيات (استاتيكا وديناميكا)": [
    {
      id: "stat_u1",
      name: "الباب الأول: الاستاتيكا (الاحتكاك والعزوم والاتزان)",
      lessons: [
        { id: "stat_u1_l1", name: "الدرس 1: الاحتكاك على المستويات الأفقية والمائلة الخشنة" },
        { id: "stat_u1_l2", name: "الدرس 2: العزوم وقوى المستويات المتوازية والاتزان العام" },
        { id: "stat_u1_l3", name: "الدرس 3: الازدواجات وتكافؤها ومركز الثقل" }
      ]
    },
    {
      id: "dyn_u1",
      name: "الباب الثاني: الديناميكا (قوانين الحركة والطاقة)",
      lessons: [
        { id: "dyn_u1_l1", name: "الدرس 1: تفاضل وتكامل الدوال المتجهة والدفع والزخم" },
        { id: "dyn_u1_l2", name: "الدرس 2: قوانين نيوتن الثلاثة للحركة وحركة البكرات" },
        { id: "dyn_u1_l3", name: "الدرس 3: الشغل والقدرة طاقة الحركة وطاقة الوضع وحفظ الطاقة" }
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
// ================= 📂 1. عرض أبواب/فصول المادة المحددة =================
function openSubjectChapters(sName) {
  currentTreeSubject = sName;
  currentTreeChapter = null;

  document.getElementById('treeSubjectsGrid').style.display = 'none';
  document.getElementById('treeChaptersView').style.display = 'block';
  document.getElementById('treeBreadcrumb').innerHTML = 
    `<span onclick="renderSubjectTreePage()" style="cursor:pointer; color:var(--gold);">🌳 الشجرة</span> ← ${sName}`;

  const chapters = subjectLessonsTree[sName] || [];
  const container = document.getElementById('treeChaptersList');

  // عرض الأبواب على شكل كروت واضحة ومستقلة
  container.innerHTML = `
    <div style="font-size: 13px; color: var(--gold); font-weight: bold; margin-bottom: 10px;">
      📚 اختر الباب / الفصل لمذاكرة وتلخيص دروسه:
    </div>
    <div style="display: flex; flex-direction: column; gap: 10px;">
      ${chapters.map(ch => {
        return `
          <div class="athr-card" style="cursor:pointer; transition:0.2s;" onclick="openChapterLessonsView('${sName.replace(/'/g, "\\'")}', '${ch.id}')">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <div style="font-weight:bold; color:var(--gold); font-size:15px;">📁 ${ch.name}</div>
              <span style="font-size:12px; color:var(--green); font-weight:bold;">${ch.lessons.length} دروس ➔</span>
            </div>
            <div style="font-size:11px; color:var(--text2); margin-top:4px;">اضغط لعرض الدروس وتلخيص الباب</div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

// ================= 📖 2. فتح صفحة دروس الباب المحدد فقط =================
async function openChapterLessonsView(sName, chapterId) {
  currentTreeChapter = chapterId;

  const chapters = subjectLessonsTree[sName] || [];
  const ch = chapters.find(c => c.id === chapterId);
  if (!ch) return;

  document.getElementById('treeBreadcrumb').innerHTML = 
    `<span onclick="renderSubjectTreePage()" style="cursor:pointer; color:var(--gold);">🌳 الشجرة</span> ← 
     <span onclick="openSubjectChapters('${sName.replace(/'/g, "\\'")}')" style="cursor:pointer; color:var(--gold);">${sName}</span> ← ${ch.name}`;

  const container = document.getElementById('treeChaptersList');

  // بناء قائمة الدروس الخاصة بهذا الباب فقط
  let lessonsHtml = '';
  for (const ls of ch.lessons) {
    const entries = await getLessonSummaries(lessonKey(sName, chapterId, ls.id));
    const hasSummary = entries.length > 0;
    lessonsHtml += `
      <div class="lesson-row" onclick="openLessonTools('${chapterId}', '${ls.id}')" style="display:flex; justify-content:space-between; align-items:center; background:var(--card); border:1px solid var(--border); border-radius:10px; padding:10px 12px; margin-bottom:8px; cursor:pointer;">
        <span>${hasSummary ? '✅' : '⚪'} ${ls.name}</span>
        <span class="btn-small" style="font-size:11px; padding:4px 10px;">${hasSummary ? entries.length + ' ملخص 📝' : 'لخّص الدرس ✍️'}</span>
      </div>
    `;
  }

  container.innerHTML = `
    <button onclick="openSubjectChapters('${sName.replace(/'/g, "\\'")}')" class="btn-small" style="margin-bottom:12px; background:var(--card); color:var(--text); border:1px solid var(--border);">
      ← رجوع لأبواب المادة
    </button>

    <div class="athr-card" style="margin-bottom:14px; border:1px solid var(--gold); background:rgba(212,175,55,0.05);">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <div>
          <div style="font-weight:bold; color:var(--gold); font-size:16px;">📂 ${ch.name}</div>
          <div style="font-size:11px; color:var(--text2); margin-top:2px;">يحتوي على ${ch.lessons.length} دروس متتابعة</div>
        </div>
        <button class="btn-small" style="background:var(--green); color:#fff; padding:6px 12px;" onclick="openChapterSummaryTools('${sName.replace(/'/g, "\\'")}', '${ch.id}')">
          ✨ تلخيص الباب ككل
        </button>
      </div>
    </div>

    <div style="font-size:13px; color:var(--text2); margin-bottom:8px; font-weight:bold;">دروس الباب:</div>
    <div>${lessonsHtml}</div>
  `;
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
