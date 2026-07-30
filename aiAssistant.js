// ===============================================
// 🎯 المساعد الشخصي والموجه الدراسي - aiAssistant.js
// ===============================================

const GROQ_API_KEY = "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";

// دالة تجميع بيانات الطالب الحالية من LocalStorage
function getStudentContextPrompt() {
  const branch = localStorage.getItem('sm_user_branch') || 'غير محددة';
  const plan = JSON.parse(localStorage.getItem('sm_active_plan') || 'null');
  const mistakes = JSON.parse(localStorage.getItem('sm_user_mistakes') || '[]');
  const focusStats = JSON.parse(localStorage.getItem('sm_focus_stats') || '{}');
  
  // حساب نسبة الالتزام والدقائق
  let commitmentPct = 0;
  if (plan && plan.matrix) {
    let total = 0, done = 0;
    Object.keys(plan.matrix).forEach(t => {
      Object.keys(plan.matrix[t]).forEach(d => {
        total++;
        if (plan.matrix[t][d] === 1) done++;
      });
    });
    commitmentPct = total > 0 ? Math.round((done / total) * 100) : 0;
  }

  const today = new Date().toLocaleDateString('en-CA');
  const todayFocus = focusStats[today]?.mins || 0;

  // ملخص الأخطاء حسب المواد
  const mistakesSummary = mistakes.map(m => `${m.subj} (${m.chapter})`).join(', ') || 'لا توجد أخطاء مسجلة بعد';

  return `
[بيانات الطالب الحالية في التطبيق]:
- الشعبة: ${branch}
- نسبة الالتزام بالجدول: ${commitmentPct}%
- دقائق التركيز اليوم: ${todayFocus} دقيقة
- عدد الأخطاء المسجلة في دفتر الأخطاء: ${mistakes.length} سؤال.
- تفاصيل الأخطاء والدروس الضعيف فيها: ${mistakesSummary}
`;
}

// دالة تنظيف الردود
function cleanAiResponse(text) {
  if (!text) return "";
  let cleaned = text.replace(/<thought>[\s\S]*?<\/thought>/gi, "");
  cleaned = cleaned.replace(/<think>[\s\S]*?<\/think>/gi, "");
  cleaned = cleaned.replace(/[\u4e00-\u9fa5]/g, ""); // مسح أي حروف صينية فوراً لو خرجت بالخطأ
  return cleaned.trim();
}

// دالة إرسال السؤال عبر Llama 3.3 الخرافي على Groq
async function askSmartTeacher(userPrompt) {
  const studentData = getStudentContextPrompt();
  
  const systemInstruction = `
أنت "المساعد الشخصي والموجه الدراسي" للطالب في تطبيق "سبيل المجد" للثانوية العامة المصرية.
لديك البيانات التالية الخاصة بالطالب:
${studentData}

دورك:
1. تقديم تقييم شخصي صادق ومشجع لمستوى الطالب بناءً على التزامه وأخطائه المسجلة.
2. توجييهه وتحديد نقاط ضعفه في المواد (استناداً لدفتر أخطائه) وتقديم خطة علاجية عملة.
3. التحدث معه كأخ أكبر وموجه نفسي ودراسي مخلص، بإجابات ملخصة وواضحة جداً وبأسلوب مشجع.
`;

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemInstruction },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.6
      })
    });

    const data = await response.json();
    if (data.choices && data.choices[0]?.message?.content) {
      return cleanAiResponse(data.choices[0].message.content);
    } else {
      return "⚠️ الموجه الشخصي مشغول حالياً، أعد إرسال سؤالك بعد ثوانٍ!";
    }
  } catch (err) {
    return "❌ يتعذر الاتصال بالموجه الشخصي. تأكد من اتصالك بالإنترنت!";
  }
}

// 💬 واجهة الشات
async function sendAiMessage() {
  const inp = document.getElementById('aiMsgInput');
  const val = inp.value.trim();
  if (!val) return;

  const chatBox = document.getElementById('aiChatMessages');
  
  let userHtml = `<div style="align-self: flex-start; background: rgba(212,175,55,0.15); border: 1px solid var(--gold); padding: 8px 12px; border-radius: 12px; max-width: 85%; margin-bottom: 8px; font-size: 13px;">${val}</div>`;
  chatBox.insertAdjacentHTML('beforeend', userHtml);
  
  inp.value = '';

  const loadingId = 'loading_' + Date.now();
  chatBox.insertAdjacentHTML('beforeend', `
    <div id="${loadingId}" style="align-self: flex-end; background: rgba(255,255,255,0.05); border: 1px solid var(--border); padding: 8px 12px; border-radius: 12px; max-width: 85%; margin-bottom: 8px; font-size: 12px; color: var(--gold);">
      🎯 المساعد الشخصي يحلل بياناتك ويكتب التوجيه... ☕
    </div>
  `);
  chatBox.scrollTop = chatBox.scrollHeight;

  const reply = await askSmartTeacher(val);

  const loadingEl = document.getElementById(loadingId);
  if (loadingEl) {
    loadingEl.style.background = "rgba(111,191,115,0.12)";
    loadingEl.style.borderColor = "var(--green)";
    loadingEl.style.color = "var(--text)";
    loadingEl.style.fontSize = "13px";
    loadingEl.style.lineHeight = "1.6";
    loadingEl.innerHTML = `<b style="color:var(--green); display:block; margin-bottom:4px;">🎯 المساعد الشخصي:</b>` + reply.replace(/\n/g, '<br>');
  }
  chatBox.scrollTop = chatBox.scrollHeight;
  saveAiChatHistory(); // 👈 حفظ الشات بعد كل إجابة
}

// 🌐 دالة فتح النماذج الخارجية ونقل السؤال إليها فوراً
function openExternalAi(service) {
  const inp = document.getElementById('aiMsgInput');
  const query = encodeURIComponent(inp.value.trim() || "اشرح لي منهج الثانوية العامة والمسائل الصعبة خطوة بخطوة.");
  
  let url = "";
  if (service === 'chatgpt') {
    url = `https://chatgpt.com/?q=${query}`;
  } else if (service === 'claude') {
    url = `https://claude.ai/new`;
  } else if (service === 'gemini') {
    url = `https://gemini.google.com/app`;
  }

  window.open(url, '_blank');
}
// 💾 حفظ واسترجاع المحادثة تلقائياً
function saveAiChatHistory() {
  const chatBox = document.getElementById('aiChatMessages');
  if (chatBox) {
    localStorage.setItem('sm_ai_chat_history', chatBox.innerHTML);
  }
}

function loadAiChatHistory() {
  const saved = localStorage.getItem('sm_ai_chat_history');
  const chatBox = document.getElementById('aiChatMessages');
  if (saved && chatBox) {
    chatBox.innerHTML = saved;
    chatBox.scrollTop = chatBox.scrollHeight;
  }
}

// استرجاع التاريخ أول ما الصفحة تحمل
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(loadAiChatHistory, 500);
});
function clearAiChat() {
  if (confirm("هل تريد مسح المحادثة مع المساعد الشخصي وبدء شات جديد؟")) {
    localStorage.removeItem('sm_ai_chat_history');
    location.reload();
  }
}
