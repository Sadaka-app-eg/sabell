// ===============================================
// 🤖 المساعد الذكي لتطبيق سبيل المجد - aiAssistant.js
// ===============================================

const GEMINI_API_KEY = "AQ.Ab8RN6J_y4LqG6IcnUYq6hUmKd0eliT8xvwj8EwCIHcwn2DQyw"; // مفتاحك

const SYSTEM_INSTRUCTION = `
أنت "المعلم الذكي" في تطبيق "سبيل المجد" للثانوية العامة المصرية. 
دورك هو مساعدة الطالب في فهم دروسه، شرح الأسئلة الصعبة، تحليل أخطائه في المواد، وتقديم نصائح دراسية وتحفيزية.
إجاباتك يجب أن تكون ملخصة، واضحة، سهلة الفهم، مبهجة، وبأسلوب مشجع جداً.
`;

let currentAiImgBase64 = null;

async function askSmartTeacher(userPrompt, imageBase64 = null) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

  let contentsParts = [];

  if (imageBase64) {
    const base64Data = imageBase64.split(',')[1] || imageBase64;
    contentsParts.push({
      inline_data: {
        mime_type: "image/jpeg",
        data: base64Data
      }
    });
  }

  contentsParts.push({ text: userPrompt });

  const payload = {
    contents: [{ parts: contentsParts }],
    systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] }
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (data.candidates && data.candidates[0].content.parts[0].text) {
      return data.candidates[0].content.parts[0].text;
    } else {
      return "عذراً يا بطل، حدث خطأ أثناء معالجة الإجابة. حاول مرة أخرى!";
    }
  } catch (err) {
    console.error("Gemini Error:", err);
    return "❌ يتعذر الاتصال بالمعلم الذكي حالياً. تأكد من اتصالك بالإنترنت!";
  }
}

// ---- 💬 دوال واجهة الشات ----
async function sendAiMessage() {
  const inp = document.getElementById('aiMsgInput');
  const val = inp.value.trim();
  if (!val && !currentAiImgBase64) return;

  const chatBox = document.getElementById('aiChatMessages');
  
  // 1. عرض رسالة الطالب
  let userHtml = `<div style="align-self: flex-start; background: rgba(212,175,55,0.15); border: 1px solid var(--gold); padding: 8px 12px; border-radius: 12px; max-width: 85%; margin-bottom: 8px; font-size: 13px;">`;
  if (currentAiImgBase64) {
    userHtml += `<img src="${currentAiImgBase64}" style="max-width: 100%; max-height: 150px; border-radius: 8px; margin-bottom: 6px; display: block;">`;
  }
  userHtml += `${val || "شرح الصورة المرفقة"}</div>`;
  
  chatBox.insertAdjacentHTML('beforeend', userHtml);
  
  // تصفير الخانات
  const promptText = val || "اشرح لي هذه الصورة أو السؤال المرفق بالتفصيل.";
  const imgData = currentAiImgBase64;
  inp.value = '';
  document.getElementById('aiImgPreview').style.display = 'none';
  currentAiImgBase64 = null;

  // 2. مؤشر التحميل
  const loadingId = 'loading_' + Date.now();
  chatBox.insertAdjacentHTML('beforeend', `
    <div id="${loadingId}" style="align-self: flex-end; background: rgba(255,255,255,0.05); border: 1px solid var(--border); padding: 8px 12px; border-radius: 12px; max-width: 85%; margin-bottom: 8px; font-size: 12px; color: var(--gold);">
      🤖 المعلم الذكي يفكر ويكتب الإجابة... ☕
    </div>
  `);
  chatBox.scrollTop = chatBox.scrollHeight;

  // 3. جلب الرد من Gemini
  const reply = await askSmartTeacher(promptText, imgData);

  // 4. استبدال التحميل بالإجابة
  const loadingEl = document.getElementById(loadingId);
  if (loadingEl) {
    loadingEl.style.background = "rgba(111,191,115,0.12)";
    loadingEl.style.borderColor = "var(--green)";
    loadingEl.style.color = "var(--text)";
    loadingEl.style.fontSize = "13px";
    loadingEl.style.lineHeight = "1.6";
    // تنسيق الأسطر
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
