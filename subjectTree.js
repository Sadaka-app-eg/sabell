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
  // 1️⃣ اللغة العربية (كاملة بالتفصيل)
  // ----------------------------------------------------
  "اللغة العربية": [
    {
      id: "ar_u1",
      name: "الوحدة الأولى: قواعد الإملاء والهمزات",
      lessons: [
        { id: "ar_u1_l1", name: "الدرس 1: همزتا القطع والوصل" },
        { id: "ar_u1_l2", name: "الدرس 2: الهمزة المتوسطة والمتطرفة" },
        { id: "ar_u1_l3", name: "الدرس 3: الفرق بين التاء المربوطة والهاء والتاء المفتوحة" },
        { id: "ar_u1_l4", name: "الدرس 4: أنواع الواو في آخر الكلمة و(أل) الشمسية والقمرية" }
      ]
    },
    {
      id: "ar_u2",
      name: "الوحدة الثانية: المشتقات والمصادر والأبنية",
      lessons: [
        { id: "ar_u2_l1", name: "الدرس 1: اسم الفاعل وصيغ المبالغة واسم المفعول وإعمالهم" },
        { id: "ar_u2_l2", name: "الدرس 2: اسما الزمان والمكان واسم الآلة" },
        { id: "ar_u2_l3", name: "الدرس 3: اسم التفضيل (حالاته وأحكامه)" },
        { id: "ar_u2_l4", name: "الدرس 4: المصادر (الصريحة، المؤولة، الميمية، الصناعية، اسم المرة والهيئة)" },
        { id: "ar_u2_l5", name: "الدرس 5: الاسم المقصور والمنقوص والممدود (تثنيتهم وجمعهم)" },
        { id: "ar_u2_l6", name: "الدرس 6: بناء الفعل للمجهول والأفعال الملازمة للمجهول لفظاً" }
      ]
    },
    {
      id: "ar_u3",
      name: "الوحدة الثالثة: النواسخ والمبتدأ والخبر",
      lessons: [
        { id: "ar_u3_l1", name: "الدرس 1: المبتدأ والخبر وأحكام تقديم الخبر وحذف المبتدأ والخبر" },
        { id: "ar_u3_l2", name: "الدرس 2: كان وأخواتها (التامة والناقصة)" },
        { id: "ar_u3_l3", name: "الدرس 3: كاد وأخواتها (أفعال المقاربة والرجاء والشروع)" },
        { id: "ar_u3_l4", name: "الدرس 4: إن وأخواتها وتخفيفها وما الكافة" },
        { id: "ar_u3_l5", name: "الدرس 5: لا النافية للجنس وشروط إعمالها" }
      ]
    },
    {
      id: "ar_u4",
      name: "الوحدة الرابعة: المنصوبات والمفاعيل",
      lessons: [
        { id: "ar_u4_l1", name: "الدرس 1: المفعول به والمفعول المطلق والنائب عن المفعول المطلق" },
        { id: "ar_u4_l2", name: "الدرس 2: المفعول لأجله والمفعول معه والمفعول فيه (الظرف)" },
        { id: "ar_u4_l3", name: "الدرس 3: الحال (أنواعها وأحكامها)" },
        { id: "ar_u4_l4", name: "الدرس 4: الاستثناء (بـ إلا، غير، سوى، خلا، عدا، حاشا)" },
        { id: "ar_u4_l5", name: "الدرس 5: تمييز الملفوظ والملموظ وأحكام تمييز وغرائب العدد" }
      ]
    },
    {
      id: "ar_u5",
      name: "الوحدة الخامسة: إعراب وبناء الأفعال",
      lessons: [
        { id: "ar_u5_l1", name: "الدرس 1: بناء الفعل الماضي والأمر والمضارع" },
        { id: "ar_u5_l2", name: "الدرس 2: نصب الفعل المضارع وإضمار أن" },
        { id: "ar_u5_l3", name: "الدرس 3: جزم المضارع في أسلوب الشرط وفي جواب الطلب" },
        { id: "ar_u5_l4", name: "الدرس 4: اقتران جواب الشرط بالفاء وتوكيد الفعل بالنون" }
      ]
    },
    {
      id: "ar_u6",
      name: "الوحدة السادسة: الأدوات وحروف الجر و(كم)",
      lessons: [
        { id: "ar_u6_l1", name: "الدرس 1: كم الاستفهامية وكم الخبرية والفرق بينهما" },
        { id: "ar_u6_l2", name: "الدرس 2: حروف الجر الأصلية والزائدة وشبيهة بالزائدة (رب)" },
        { id: "ar_u6_l3", name: "الدرس 3: أنواع (ما) و(من) و(لا) و(الواو) في اللغة العربية" }
      ]
    },
    {
      id: "ar_u7",
      name: "الوحدة السابعة: الممنوع من الصرف والأساليب",
      lessons: [
        { id: "ar_u7_l1", name: "الدرس 1: الممنوع من الصرف لسبب واحد ولسبيين وإعرابه" },
        { id: "ar_u7_l2", name: "الدرس 2: أساليب التعجب والإغراء والتحذير والاختصاص والنداء" },
        { id: "ar_u7_l3", name: "الدرس 3: أسلوبا المدح والذم والكشف في المعاجم" }
      ]
    },
    {
      id: "ar_adab",
      name: "الأدب والبلاغة والنصوص والقراءة",
      lessons: [
        { id: "ar_ad_l1", name: "الأدب: المدارس الشعرية (الإحياء، وجداني، ديوان، أبوللو، مهاجر، واقعية)" },
        { id: "ar_ad_l2", name: "الأدب: الفنون النثرية (الرواية، القصة القصيرة، المسرحية، المقال)" },
        { id: "ar_ad_l3", name: "البلاغة: التجربة الشعرية والتعبير والبلاغة المتحررة" },
        { id: "ar_ad_l4", name: "النصوص والقراءة: تطبيقات المهارات المتحررة ونواتج التعلم" }
      ]
    }
  ],
// ----------------------------------------------------
  // 2️⃣ الفيزياء (كاملاً بالتفصيل: كهربية + حديثة)
  // ----------------------------------------------------
  "الفيزياء": [
    {
      id: "ph_ch1",
      name: "الفصل الأول: التيار الكهربي وقانون أوم وكيرشوف",
      lessons: [
        { id: "ph_c1_l1", name: "الدرس 1: التيار الكهربي وفرق الجهد وتأثير درجة الحرارة والمقاومة النوعية" },
        { id: "ph_c1_l2", name: "الدرس 2: طرق توصيل المقاومات (توالي وتوازي وحالات إلغاء المقاومة)" },
        { id: "ph_c1_l3", name: "الدرس 3: قانون أوم للدائرة المغلقة والكفاءة وقدرة المصدر" },
        { id: "ph_c1_l4", name: "الدرس 4: قانونا كيرشوف الأول والثاني وتطبيقات الدوائر المعقدة" }
      ]
    },
    {
      id: "ph_ch2",
      name: "الفصل الثاني: التأثير المغناطيسي للتيار الكهربي وأجهزة القياس",
      lessons: [
        { id: "ph_c2_l1", name: "الدرس 1: الفيض والمجال المغناطيسي للسلك المستقيم والملف الدائري والحلزوني" },
        { id: "ph_c2_l2", name: "الدرس 2: القوة المغناطيسية بين سلكين وعزم الازدواج وعزم دوال القطب" },
        { id: "ph_c2_l3", name: "الدرس 3: أجهزة القياس المناظرة (الجلفانوتر حساس، الأميتر، الفولتميتر، الأوميتر)" }
      ]
    },
    {
      id: "ph_ch3",
      name: "الفصل الثالث: الحث الكهرومغناطيسي",
      lessons: [
        { id: "ph_c3_l1", name: "الدرس 1: قانون فاراداي وقاعدة لينز والسلك المستحث" },
        { id: "ph_c3_l2", name: "الدرس 2: الحث الذاتي والمتبادل بين ملفين والتيارات الدوامية" },
        { id: "ph_c3_l3", name: "الدرس 3: المولد الكهربي (الدينامو) والتقويم الموجي والمتردد" },
        { id: "ph_c3_l4", name: "الدرس 4: المحول الكهربي والمحرك الكهربي (الموتور)" }
      ]
    },
    {
      id: "ph_ch4",
      name: "الفصل الرابع: دوائر التيار المتردد",
      lessons: [
        { id: "ph_c4_l1", name: "الدرس 1: الأميتر الحراري ودوائر المقاومة أومية والملف حث والمكثف" },
        { id: "ph_c4_l2", name: "الدرس 2: دوائر المعاوقة (RL, RC, RLC) وتوصيل المكثفات" },
        { id: "ph_c4_l3", name: "الدرس 3: الدائرة المهتزة ودائرة الرنين خواصها وتطبيقاتها" }
      ]
    },
    {
      id: "ph_ch5",
      name: "الفصل الخامس: ازدواجية الموجة والجسيم",
      lessons: [
        { id: "ph_c5_l1", name: "الدرس 1: إشعاع الجسم الأسود وظاهرة انبعاث الكاثود والإنبعاث الحراري" },
        { id: "ph_c5_l2", name: "الدرس 2: التأثير الكهروضوئي وتأثير كومتون وفرض دي برولي والظاهرة الموجية" }
      ]
    },
    {
      id: "ph_ch6",
      name: "الفصل السادس: الأطياف الذرية",
      lessons: [
        { id: "ph_c6_l1", name: "الدرس 1: نموذج بور وسلاسل طيف الهيدروجين (ليمان، بالمر، باشن...)" },
        { id: "ph_c6_l2", name: "الدرس 2: الأشعة السينية (X-Rays) طرق توليدها وطيفها التطبيقي" }
      ]
    },
    {
      id: "ph_ch7",
      name: "الفصل السابع: الليزر",
      lessons: [
        { id: "ph_c7_l1", name: "الدرس 1: الانبعاث التلقائي والمستحث وخصائص أشعة الليزر" },
        { id: "ph_c7_l2", name: "الدرس 2: نظرية عمل الليزر وتركيب ليزر الهيليوم - نيون والتصوير المجسم" }
      ]
    },
    {
      id: "ph_ch8",
      name: "الفصل الثامن: الإلكترونيات الحديثة",
      lessons: [
        { id: "ph_c8_l1", name: "الدرس 1: أشباه الموصلات المطعمة والوصلة الثنائية (الدايود)" },
        { id: "ph_c8_l2", name: "الدرس 2: الترانزستور (npn / pnp) واستخداماته كمكبر ومفتاح" },
        { id: "ph_c8_l3", name: "الدرس 3: الإلكترونيات الرقمية والتناظرية والبوابات المنطقية (AND, OR, NOT)" }
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
  // 3️⃣ الكيمياء (كاملاً بالتفصيل: غير عضوية + عضوية)
  // ----------------------------------------------------
  "الكيمياء": [
    {
      id: "ch_b1",
      name: "الباب الأول: العناصر الانتقالية",
      lessons: [
        { id: "ch_b1_l1", name: "الدرس 1: العناصر الانتقالية الرئيسية والأهمية الاقتصادية لعناصر السلسلة الأولى" },
        { id: "ch_b1_l2", name: "الدرس 2: التركيب الإلكتروني وحالات التأكسد والخواص العامة للعناصر الانتقالية" },
        { id: "ch_b1_l3", name: "الدرس 3: خامات الحديد وتجهيزها وتفاعلات الأفران" },
        { id: "ch_b1_l4", name: "الدرس 4: السبائك وأنواعها والتفاعلات الكيميائية لأكاسيد الحديد" }
      ]
    },
    {
      id: "ch_b2",
      name: "الباب الثاني: التحليل الكيميائي",
      lessons: [
        { id: "ch_b2_l1", name: "الدرس 1: التحليل الوصفي (الكيفي) - الكشف عن الأنيونات (حمض HCL و H2SO4 وكلوريد الباريوم)" },
        { id: "ch_b2_l2", name: "الدرس 2: التحليل الوصفي - الكشف عن الكاتيونات (الكاتيونات الشائعة والتجارب التأكيدية)" },
        { id: "ch_b2_l3", name: "الدرس 3: التحليل الكمي الحجمي (المعايرة والتعادل والترسيب)" },
        { id: "ch_b2_l4", name: "الدرس 4: التحليل الكمي الكتلي (طريقة التطاير وطريقة الترسيب وقوانين المسائل)" }
      ]
    },
    {
      id: "ch_b3",
      name: "الباب الثالث: الاتزان الكيميائي",
      lessons: [
        { id: "ch_b3_l1", name: "الدرس 1: النظام المتزن والتفاعلات التامة والانعكاسية وسرعة التفاعل الكيميائي" },
        { id: "ch_b3_l2", name: "الدرس 2: العوامل المؤثرة على سرعة التفاعل وقانون فعل الكتلة وقاعدة لوشاتيليه (Kc & Kp)" },
        { id: "ch_b3_l3", name: "الدرس 3: الاتزان الأيوني والكتروليتات القوية والضعيفة واستنتاج قانون أستفالد" },
        { id: "ch_b3_l4", name: "الدرس 4: التأين الذاتي للماء والأس الهيدروجيني (pH & pOH) والتميؤ وحاصل الإذابة (Ksp)" }
      ]
    },
    {
      id: "ch_b4",
      name: "الباب الرابع: الكيمياء الكهربية",
      lessons: [
        { id: "ch_b4_l1", name: "الدرس 1: الخلايا الكهروكيميائية والخلايا الجلفانية وخلية دانيال والقنطرة المسامية" },
        { id: "ch_b4_l2", name: "الدرس 2: قطب الهيدروجين القياسي وسلسلة الجهود الكهربية وحساب القوة الدافعة الكهربية (emf)" },
        { id: "ch_b4_l3", name: "الدرس 3: الخلايا الأولية والثانوية (بطارية الزئبق، الوقود، المركم الرصاصي، بطارية أليون الليثيوم) وتآكل المعادن" },
        { id: "ch_b4_l4", name: "الدرس 4: الخلايا التحليلية (الالكتروليتية) وقوانين فاراداي وتطبيقات التحليل الكهربي" }
      ]
    },
    {
      id: "ch_b5",
      name: "الباب الخامس: الكيمياء العضوية (الهيدروكربونات ومستشقاتها)",
      lessons: [
        { id: "ch_b5_l1", name: "الدرس 1: المقدمة العضوية، الصيغ البنائية، والمشابهة الجزئية (الأيزومريزم)" },
        { id: "ch_b5_l2", name: "الدرس 2: الهيدروكربونات الأليفاتية مفتوحة السلسلة - الألكانات (الميثان تحضيره وخواصه)" },
        { id: "ch_b5_l3", name: "الدرس 3: الألكينات (الإيثيلين تحضيره، تفاعلات الإضافة، وقاعدة ماركونيكوف)" },
        { id: "ch_b5_l4", name: "الدرس 4: الألكاينات (الإيثاين/الأستيلين تحضيره وخواصه الكيميائية)" },
        { id: "ch_b5_l5", name: "الدرس 5: الهيدروكربونات الحلقية والبنزين العطري (تحضيره وتفاعلاته)" },
        { id: "ch_b5_l6", name: "الدرس 6: الكحولات (تصنيفها، تحضيرها، وتفاعلاتها الكيميائية)" },
        { id: "ch_b5_l7", name: "الدرس 7: الفينولات (خواصها والتمييز بينها وبين الكحولات)" },
        { id: "ch_b5_l8", name: "الدرس 8: الأحماض الكاربوكسيلية الأليفاتية والأروماتية (الخواص والاستخدامات)" },
        { id: "ch_b5_l9", name: "الدرس 9: الاسترات (تحضيرها، النواتج، والتصبن واستخداماتها الكيميائية)" }
      ]
    }
  ],

 // ----------------------------------------------------
  // 4️⃣ الأحياء (كاملاً بالتفصيل: التركيب الوظيفي + DNA/RNA)
  // ----------------------------------------------------
  "الأحياء": [
    {
      id: "bio_b1",
      name: "الباب الأول: التركيب الوظيفي - الفصل 1: الدعامة والحركة",
      lessons: [
        { id: "bio_b1_l1", name: "الدرس 1: الدعامة في النبات (الدعامة الفسيولوجية والتركيبية)" },
        { id: "bio_b1_l2", name: "الدرس 2: الدعامة في الإنسان (الهيكل العظمي والمحوري والطرفي)" },
        { id: "bio_b1_l3", name: "الدرس 3: غضاريف ومفاصل وأربطة وأوتار الهيكل العظمي" },
        { id: "bio_b1_l4", name: "الدرس 4: الحركة في النبات (اللمس، النوم، الشد، الانحاء)" },
        { id: "bio_b1_l5", name: "الدرس 5: الحركة في الإنسان وآلية الانقباض العضلي والجهاد العضلي" }
      ]
    },
    {
      id: "bio_b2",
      name: "الباب الأول: التركيب الوظيفي - الفصل 2: التنسيق الهرموني",
      lessons: [
        { id: "bio_b2_l1", name: "الدرس 1: اكتشاف الهرمونات النباتية (الأوكسينات) والتنسيق الهرموني" },
        { id: "bio_b2_l2", name: "الدرس 2: الغدة النخامية (سيدة الغدد الصماء) وهرمونات الفص الأمامي والخلفي" },
        { id: "bio_b2_l3", name: "الدرس 3: الغدة الدرقية والبارادرقية وهرمونات الثايروكسين والكالسيتونين" },
        { id: "bio_b2_l4", name: "الدرس 4: الغدتان الكظريتان والبنكرياس والغدد التناسلية وهرمونات القناة الهضمية" }
      ]
    },
    {
      id: "bio_b3",
      name: "الباب الأول: التركيب الوظيفي - الفصل 3: التكاثر في الكائنات الحية",
      lessons: [
        { id: "bio_b3_l1", name: "الدرس 1: طرق التكاثر اللاجنسي (الانشطار، التبرعم، التجدد، التجرثم، التوالد البكري)" },
        { id: "bio_b3_l2", name: "الدرس 2: التكاثر الجنسي (الاقتران والأمشاج) وظاهرة تعاقب الأجيال (بلازموديوم ودورة بلازموديوم وفوجير)" },
        { id: "bio_b3_l3", name: "الدرس 3: التكاثر في النباتات الزهرية (تركيب الزهرة وتكوين الحبوب وتكوين البويضات والإخصاب)" },
        { id: "bio_b3_l4", name: "الدرس 4: الجهاز التناسلي الذكري وتكوين الحيوانات المنوية" },
        { id: "bio_b3_l5", name: "الدرس 5: الجهاز التناسلي الأنثوي ودورة الطمث ودورة التبويض" },
        { id: "bio_b3_l6", name: "الدرس 6: الإخصاب، الحمل، نمو الجنين، ولادة التوائم، ووسائل منع الحمل وأطفال الأنابيب" }
      ]
    },
    {
      id: "bio_b4",
      name: "الباب الأول: التركيب الوظيفي - الفصل 4: المناعة في الكائنات الحية",
      lessons: [
        { id: "bio_b4_l1", name: "الدرس 1: المناعة في النبات (المناعة التركيبية والمناعة البيوكيميائية)" },
        { id: "bio_b4_l2", name: "الدرس 2: أعضاء الجهاز المناعي في الإنسان (الخلايا اللمفاوية وخلايا الدم البيضاء)" },
        { id: "bio_b4_l3", name: "الدرس 3: المواد الكيميائية المساعدة والأجسام المضادة (تركيبها وأنعاط عملها)" },
        { id: "bio_b4_l4", name: "الدرس 4: آليات عمل الجهاز المناعي (خط الدفاع الأول والثاني والاستجابة بالالتهاب)" },
        { id: "bio_b4_l5", name: "الدرس 5: خط الدفاع الثالث (المناعة الخلطية بالخلايا البائية والمناعة الخلوية بالخلايا التائية)" }
      ]
    },
    {
      id: "bio_b5",
      name: "الباب الثاني: البيولوجيا الجزئية - الفصل 1: الحمض النووي DNA",
      lessons: [
        { id: "bio_b5_l1", name: "الدرس 1: أدلة إثبات أن DNA هو المادة الوراثية (التحول البكتيري، اللقيمات، كمية DNA)" },
        { id: "bio_b5_l2", name: "الدرس 2: تركيب النيوكليوتيدة واللولب المزدوج نموذج واتسون وكريك" },
        { id: "bio_b5_l3", name: "الدرس 3: تضاعف DNA وأنزيمات بلمرة والربط وإصلاح عيوب DNA" },
        { id: "bio_b5_l4", name: "الدرس 4: DNA في أوليات وحقيقيات النواة، النيوكليوسومات، والمحتوى الجيني والطفرات" }
      ]
    },
    {
      id: "bio_b6",
      name: "الباب الثاني: البيولوجيا الجزئية - الفصل 2: الأحماض النووية RNA وتخليق البروتين",
      lessons: [
        { id: "bio_b6_l1", name: "الدرس 1: أنواع الأحماض النووية (mRNA, tRNA, rRNA) والمقارنة بين DNA و RNA" },
        { id: "bio_b6_l2", name: "الدرس 2: عملية النسخ الشفري وشفرة تخليق البروتين وآلية بناء البروتين" },
        { id: "bio_b6_l3", name: "الدرس 3: الهندسة الوراثية والتكنولوجيا الجينية وتطبيقات DNA معزز التركيب والجينوم البشري" }
      ]
    }
  ],
// ----------------------------------------------------
  // 5️⃣ الرياضيات (تفاضل وتكامل) - كاملة بالتفصيل
  // ----------------------------------------------------
  "الرياضيات (تفاضل وتكامل)": [
    {
      id: "calc_b1",
      name: "الباب الأول: الاشتقاق وتطبيقاته",
      lessons: [
        { id: "calc_b1_l1", name: "الدرس 1: اشتقاق الدوال المثلثية (الجا، الجتا، الظا، الظتا، القا، القتا)" },
        { id: "calc_b1_l2", name: "الدرس 2: الاشتقاق الضمني والبارامتري" },
        { id: "calc_b1_l3", name: "الدرس 3: المشتقات العليا للدالة" },
        { id: "calc_b1_l4", name: "الدرس 4: معادلتا المماس والعمودي للمنحنى" },
        { id: "calc_b1_l5", name: "الدرس 5: المعدلات الزمنية المرتبطة" }
      ]
    },
    {
      id: "calc_b2",
      name: "الباب الثاني: تفاضل وتكامل الدوال الأسية واللوغاريتمية",
      lessons: [
        { id: "calc_b2_l1", name: "الدرس 1: العدد النيبيري (e) والدالة الأسية ذات الأساس الطبيعي والمركب" },
        { id: "calc_b2_l2", name: "الدرس 2: تفاضل واشتقاق الدوال الأسية واللوغاريتمية" },
        { id: "calc_b2_l3", name: "الدرس 3: تكامل الدوال الأسية واللوغاريتمية" }
      ]
    },
    {
      id: "calc_b3",
      name: "الباب الثالث: سلوك الدالة ورسم المنحنيات",
      lessons: [
        { id: "calc_b3_l1", name: "الدرس 1: فترات التزايد والتناقص والنقط الحرجة للدالة" },
        { id: "calc_b3_l2", name: "الدرس 2: القيم العظمى والصغرى المحلية والمطلقة" },
        { id: "calc_b3_l3", name: "الدرس 3: تحدب المنحنى لأعلى ولأسفل ونقط الانقلاب" },
        { id: "calc_b3_l4", name: "الدرس 4: رسم المنحنيات وتطبيقات القيم العظمى والصغرى" }
      ]
    },
    {
      id: "calc_b4",
      name: "الباب الرابع: التكامل المحدد وتطبيقاته",
      lessons: [
        { id: "calc_b4_l1", name: "الدرس 1: الطرق المتقدمة للتكامل (التجزيء والتعويض)" },
        { id: "calc_b4_l2", name: "الدرس 2: التكامل المحدد وخواصه" },
        { id: "calc_b4_l3", name: "الدرس 3: حساب المساحات بين منحنيين في المستوى" },
        { id: "calc_b4_l4", name: "الدرس 4: حساب حجوم الأجسام الدورانية الناتجة من الدوران حول المحاور" }
      ]
    }
  ],

 // ----------------------------------------------------
  // 6️⃣ الرياضيات (جبر وهندسة فراغية) - كاملة بالتفصيل
  // ----------------------------------------------------
  "الرياضيات (جبر وهندسة فراغية)": [
    {
      id: "alg_b1",
      name: "الباب الأول (الجبر): التباديل والتوافيق وذات الحدين",
      lessons: [
        { id: "alg_b1_l1", name: "الدرس 1: مبدأ العد الأساسي والتباديل والتوافيق وخواصهم" },
        { id: "alg_b1_l2", name: "الدرس 2: نظرية ذات الحدين بأس صحيح موجب وإيجاد الحد العام والحد الأوسط" }
      ]
    },
    {
      id: "alg_b2",
      name: "الباب الثاني (الجبر): الأعداد المركبة والمحددات والمصفوفات",
      lessons: [
        { id: "alg_b2_l1", name: "الدرس 1: الصورة الجبرية والمثلثية والأسية (أويلر) للعدد المركب" },
        { id: "alg_b2_l2", name: "الدرس 2: نظرية ديموافر والجذور التكعيبية للواحد الصحيح (أوميقا ω)" },
        { id: "alg_b2_l3", name: "الدرس 3: المحددات وخواصها وفك المحدد" },
        { id: "alg_b2_l4", name: "الدرس 4: المصفوفات والمعكوس الضربي للمصفوفة وحل أنظمة المعادلات بكرامر وبالمصفوفات" }
      ]
    },
    {
      id: "geo_b1",
      name: "الباب الثالث (الفراغية): المتجهات والإحداثيات في الفراغ",
      lessons: [
        { id: "geo_b1_l1", name: "الدرس 1: النظام الإحداثي المتعامد في ثلاثة أبعاد ومعادلة الكرة" },
        { id: "geo_b1_l2", name: "الدرس 2: المتجهات في الفراغ وزوايا وجيوب تمام الاتجاه" },
        { id: "geo_b1_l3", name: "الدرس 3: الضرب القياسي والضرب الاتجاهي والقياسي الثلاثي لمتجهات الفراغ" }
      ]
    },
    {
      id: "geo_b2",
      name: "الباب الرابع (الفراغية): الخط المستقيم والمستوى في الفراغ",
      lessons: [
        { id: "geo_b2_l1", name: "الدرس 1: معادلات الخط المستقيم في الفراغ (المتجهة والقياسية والبارامترية) والزاوية بين خطين" },
        { id: "geo_b2_l2", name: "الدرس 2: معادلة المستوى في الفراغ وطول العمود المرسوم من نقطة إلى مستوى" }
      ]
    }
  ],

// ----------------------------------------------------
  // 7️⃣ الرياضيات (استاتيكا وديناميكا) - كاملة بالتفصيل
  // ----------------------------------------------------
  "الرياضيات (استاتيكا وديناميكا)": [
    {
      id: "stat_b1",
      name: "فرع الاستاتيكا: الاحتكاك والعزوم والقوى المتوازية",
      lessons: [
        { id: "stat_b1_l1", name: "الدرس 1: اتزان جسم على مستوى أفقي خشن ومستوى مائل خشن" },
        { id: "stat_b1_l2", name: "الدرس 2: عزم قوة بالنسبة لنقطة في ثنائي وثلاثي الأبعاد" },
        { id: "stat_b1_l3", name: "الدرس 3: محصلة القوى المتوازية المستوية وتطبيقاتها" }
      ]
    },
    {
      id: "stat_b2",
      name: "فرع الاستاتيكا: الاتزان العام والازدواجات ومركز الثقل",
      lessons: [
        { id: "stat_b2_l1", name: "الدرس 1: الاتزان العام للرقائق والسلالم والقضبان" },
        { id: "stat_b2_l2", name: "الدرس 2: الازدواجات القوى وتكافؤ ازدواجين والازدواج المحصل" },
        { id: "stat_b2_l3", name: "الدرس 3: مركز الثقل ومركز الثقل السلبي (طريقة الكتل المضافة والمحذوفة)" }
      ]
    },
    {
      id: "dyn_b1",
      name: "فرع الديناميكا: حركة الجسيم وقوانين نيوتن",
      lessons: [
        { id: "dyn_b1_l1", name: "الدرس 1: تفاضل وتكامل الدوال المتجهة (الموضِع، الإزاحة، السرعة، العجلة)" },
        { id: "dyn_b1_l2", name: "الدرس 2: كمية الحركة (الزخم) وحركة جسم في خط مستقيم" },
        { id: "dyn_b1_l3", name: "الدرس 3: قانون نيوتن الأول وقانون نيوتن الثاني وقانون نيوتن الثالث" },
        { id: "dyn_b1_l4", name: "الدرس 4: حركة المصاعد وحركة الأجسام على المستويات المائلة والبكرات البسيطة" }
      ]
    },
    {
      id: "dyn_b2",
      name: "فرع الديناميكا: الدفع والشغل والقدرة والطاقة",
      lessons: [
        { id: "dyn_b2_l1", name: "الدرس 1: الدفع والتصادم المباشر المرن وغير المرن" },
        { id: "dyn_b2_l2", name: "الدرس 2: الشغل المبذول بواسطة قوة ثابتة وقوة متغيرة" },
        { id: "dyn_b3_l3", name: "الدرس 3: طاقة الحركة وطاقة الوضع ومبدأ الشغل والطاقة" },
        { id: "dyn_b4_l4", name: "الدرس 4: القدرة وقانون بقاء الطاقة الميكانيكية" }
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
