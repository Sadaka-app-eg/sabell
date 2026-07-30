// ===============================================
// 🤖 المساعد الذكي لتطبيق سبيل المجد - aiAssistant.js
// ===============================================

// مفتاح Groq المستقر والسريع جداً
const GROQ_API_KEY = "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";

const SYSTEM_INSTRUCTION = `
أنت "المعلم الذكي" في تطبيق "سبيل المجد" للثانوية العامة المصرية.
دورك شرح المفاهيم الصعبة، استخراج القوانين الفيزيائية والرياضية، وحل المسائل خطوة بخطوة.
تنبيه هام جداً: اكتب جميع القوانين والرموز باللغة العربية الواضحة والأرقام العادية دون استخدام رموز مشفرة أو لغة LaTeX أو رموز غريبة.
اجعل الإجابة دقيقة، واضحة، سهلة الفهم، وبأسلوب مشجع جداً.
`;

let currentAiImgBase64 = null;

// دالة تنظيف الردود من أي رموز غريبة أو تفكير مشفر
function cleanAiResponse(text) {
  if (!text) return "";
  let cleaned = text.replace(/<thought>[\s\S]*?<\/thought>/gi, "");
  cleaned = cleaned.replace(/<think>[\s\S]*?<\/think>/gi, "");
  cleaned = cleaned.replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, "($1 ÷ $2)");
  cleaned = cleaned.replace(/\\times/g, " × ");
  cleaned = cleaned.replace(/\\cdot/g, " · ");
  cleaned = cleaned.replace(/[\$\\]/g, ""); 
  return cleaned.trim();
}

// الدالة الرئيسية المستقرة 100% عبر Groq
async function askSmartTeacher(userPrompt, imageBase64 = null) {
  const selectedModel = document.getElementById('aiModelSelect')?.value || "llama-3-70b";

  // تحديد الموديل المناسب المتاح على Groq
  let groqModelName = "llama-3.3-70b-versatile"; 
  if (selectedModel === "deepseek-r1") {
    groqModelName = "deepseek-r1-distill-llama-70b";
  } else if (selectedModel === "mixtral-8x7b") {
    groqModelName = "qwen-2.5-coder-32b";
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: groqModelName,
        messages: [
          { role: "system", content: SYSTEM_INSTRUCTION },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.5
      })
    });

    const data = await response.json();
    if (data.choices && data.choices[0]?.message?.content) {
      return cleanAiResponse(data.choices[0].message.content);
    } else {
      console.error("Groq Error Details:", data);
      return "⚠️ المحرك يمر بتحديث سريع، حاول إرسال السؤال مرة أخرى!";
    }
  } catch (err) {
    console.error("Groq Network Error:", err);
    return "❌ يتعذر الاتصال بالخادم حالياً. تأكد من اتصالك بالإنترنت!";
  }
}

// 💬 واجهة الشات والإرسال
async function sendAiMessage() {
  const inp = document.getElementById('aiMsgInput');
  const val = inp.value.trim();
  if (!val && !currentAiImgBase64) return;

  const chatBox = document.getElementById('aiChatMessages');
  
  let userHtml = `<div style="align-self: flex-start; background: rgba(212,175,55,0.15); border: 1px solid var(--gold); padding: 8px 12px; border-radius: 12px; max-width: 85%; margin-bottom: 8px; font-size: 13px;">`;
  if (currentAiImgBase64) {
    userHtml += `<img src="${currentAiImgBase64}" style="max-width: 100%; max-height: 150px; border-radius: 8px; margin-bottom: 6px; display: block;">`;
  }
  userHtml += `${val || "شرح الصورة المرفقة"}</div>`;
  
  chatBox.insertAdjacentHTML('beforeend', userHtml);
  
  const promptText = val || "اشرح لي هذه المسألة والقوانين الخاصة بها بالتفصيل.";
  const imgData = currentAiImgBase64;
  inp.value = '';
  document.getElementById('aiImgPreview').style.display = 'none';
  currentAiImgBase64 = null;

  const loadingId = 'loading_' + Date.now();
  chatBox.insertAdjacentHTML('beforeend', `
    <div id="${loadingId}" style="align-self: flex-end; background: rgba(255,255,255,0.05); border: 1px solid var(--border); padding: 8px 12px; border-radius: 12px; max-width: 85%; margin-bottom: 8px; font-size: 12px; color: var(--gold);">
      🤖 المعلم الذكي يكتب الإجابة والقوانين... ☕
    </div>
  `);
  chatBox.scrollTop = chatBox.scrollHeight;

  const reply = await askSmartTeacher(promptText, imgData);

  const loadingEl = document.getElementById(loadingId);
  if (loadingEl) {
    loadingEl.style.background = "rgba(111,191,115,0.12)";
    loadingEl.style.borderColor = "var(--green)";
    loadingEl.style.color = "var(--text)";
    loadingEl.style.fontSize = "13px";
    loadingEl.style.lineHeight = "1.6";
    loadingEl.innerHTML = `<b style="color:var(--green); display:block; margin-bottom:4px;">🤖 المعلم الذكي:</b>` + reply.replace(/\n/g, '<br>');
  }
  chatBox.scrollTop = chatBox.scrollHeight;
}

function handleAiImageUpload(inp) {
  const file = inp.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    currentAiImgBase64 = e.target.result;
    const prev = document.getElementById('aiImgPreview');
    if (prev) {
      prev.style.display = 'block';
      prev.textContent = "📸 تم إرفاق الصورة، اكتب سؤالك واضغط إرسال";
    }
  };
  reader.readAsDataURL(file);
}
