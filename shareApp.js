// ================= ===============================
// 🚀 ملف مشاركة التطبيق ودعم التواصل المتقدم - shareApp.js
// ================= ===============================

const MY_WHATSAPP_NUMBER = "201069168725"; // رقم الواتساب بالصيغة الدولية
const SABEEL_APP_URL = "https://sabell.vercel.app/";
const ATHAR_APP_URL = "https://athar-two-pearl.vercel.app/";

// 1. فتح محادثة الواتساب المباشرة مع تفاصيل مخصصة
function openWhatsAppSupport(reasonType) {
  let message = "";
  const userAgent = navigator.userAgent.includes("Mobile") ? "هاتف محمول" : "جهاز كمبيوتر";

  if (reasonType === 'feature') {
    message = encodeURIComponent(`أهلاً أحمد، عندي اقتراح ميزة جديدة لتطبيق سبيل المجد 💡:\n- الميزة المقترحة: `);
  } else if (reasonType === 'bug') {
    message = encodeURIComponent(`أهلاً أحمد، صادفتني مشكلة في تطبيق سبيل المجد ⚠️:\n- وصف المشكلة: \n- نوع الجهاز: ${userAgent}`);
  } else if (reasonType === 'athar') {
    message = encodeURIComponent(`السلام عليكم، حابب أستفسر/أقترح حاجة بخصوص تطبيق أثر 🌙 ✨`);
  } else {
    message = encodeURIComponent(`السلام عليكم، حابب أتواصل معاك يا بطل بشأن تطبيقاتك ✨`);
  }

  const whatsappUrl = `https://wa.me/${MY_WHATSAPP_NUMBER}?text=${message}`;
  window.open(whatsappUrl, '_blank');
}

// 2. مشاركة تطبيق سبيل المجد مع التراجع التلقائي للنسخ
async function shareAppNative() {
  const shareData = {
    title: 'تطبيق سبيل المجد | الثانوية العامة',
    text: '🚀 انضم معنا في تطبيق "سبيل المجد" لمتابعة خطة التفوق، تايمر التركيز، ودفتر الأخطاء مع شريك المذاكرة! دعواتكم بالتوفيق ✨',
    url: SABEEL_APP_URL
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
    } catch (err) {
      // تم إلغاء المشاركة من قبل المستخدم
    }
  } else {
    copyToClipboard(SABEEL_APP_URL, "تم نسخ رابط تطبيق سبيل المجد بنجاح! 🚀");
  }
}

// 3. مشاركة تطبيق أثر المبارك
async function shareAtharApp() {
  const shareData = {
    title: 'تطبيق أثر | رفيقك الإيماني',
    text: '🌙 تطبيق "أثر" المبارك: الأذكار، الأدعية، والقرآن الكريم كاملاً بأجمل الأصوات والتلاوات الخاشعة. لا تحرم نفسك البركة ✨',
    url: ATHAR_APP_URL
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
    } catch (err) {
      // تم إلغاء المشاركة
    }
  } else {
    copyToClipboard(ATHAR_APP_URL, "تم نسخ رابط تطبيق أثر المبارك بنجاح! 📖");
  }
}

// 4. دالة مساعدة لنسخ الرابط مع إشعار أنيق
function copyToClipboard(textToCopy, successMsg) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(textToCopy).then(() => {
      showToastNotification(successMsg);
    });
  } else {
    // طريقة احتياطية للمتصفحات القديمة
    const textArea = document.createElement("textarea");
    textArea.value = textToCopy;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      showToastNotification(successMsg);
    } catch (err) {
      alert(successMsg);
    }
    document.body.removeChild(textArea);
  }
}

// 5. إشعار منبثق سريع (Toast) بدل الـ Alert التقليدي
function showToastNotification(message) {
  let toast = document.getElementById('appToastNotice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'appToastNotice';
    toast.style.cssText = `
      position: fixed; bottom: 25px; left: 50%; transform: translateX(-50%);
      background: var(--gold, #d4af37); color: #111; padding: 10px 20px;
      border-radius: 20px; font-size: 13px; font-weight: bold; font-family: 'Amiri', serif;
      box-shadow: 0 4px 15px rgba(0,0,0,0.4); z-index: 99999999;
      transition: opacity 0.3s ease;
    `;
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.style.opacity = '1';
  setTimeout(() => {
    toast.style.opacity = '0';
  }, 2500);
}

// 6. فتح وإغلاق النافذة
function openShareModal() {
  const modal = document.getElementById('shareAppModal');
  if (modal) modal.style.display = 'flex';
}

function closeShareModal() {
  const modal = document.getElementById('shareAppModal');
  if (modal) modal.style.display = 'none';
}
