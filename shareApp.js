// ===============================================
// 🚀 ملف مشاركة التطبيق ودعم التواصل - shareApp.js
// ===============================================

const MY_WHATSAPP_NUMBER = "201069168725"; // رقم الواتساب

// 1. فتح محادثة الواتساب المباشرة
function openWhatsAppSupport(reasonType) {
  let message = "";
  
  if (reasonType === 'feature') {
    message = encodeURIComponent("أهلاً بك، عندي اقتراح ميزة جديدة لتطبيق سبيل المجد: ");
  } else if (reasonType === 'bug') {
    message = encodeURIComponent("أهلاً بك، صادفتني مشكلة/خطأ في تطبيق سبيل المجد: ");
  } else {
    message = encodeURIComponent("السلام عليكم، حابب أتواصل معاك بشأن تطبيق سبيل المجد ✨");
  }

  const whatsappUrl = `https://wa.me/${MY_WHATSAPP_NUMBER}?text=${message}`;
  window.open(whatsappUrl, '_blank');
}

// 2. مشاركة رابط التطبيق المباشر
function shareAppNative() {
  const shareData = {
    title: 'تطبيق سبيل المجد | الثانوية العامة',
    text: '🚀 انضم معنا في تطبيق "سبيل المجد" لمتابعة خطة التفوق، تايمر التركيز، ودفتر الأخطاء مع شريك المذاكرة! دعواتكم بالتوفيق ✨',
    url: 'https://sabell.vercel.app/'
  };

  if (navigator.share) {
    navigator.share(shareData).catch(() => {});
  } else {
    navigator.clipboard.writeText('https://sabell.vercel.app/');
    alert("تم نسخ رابط تطبيق سبيل المجد بنجاح! يمكنك مشاركته مع أصدقائك 🚀");
  }
}

// 3. فتح وإغلاق النافذة
function openShareModal() {
  const modal = document.getElementById('shareAppModal');
  if (modal) modal.style.display = 'flex';
}

function closeShareModal() {
  const modal = document.getElementById('shareAppModal');
  if (modal) modal.style.display = 'none';
}
