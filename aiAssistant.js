// ===============================================
// 🤖 المساعد الذكي لتطبيق سبيل المجد - aiAssistant.js
// ===============================================

// المفاتيح الخاصة بك
const GEMINI_API_KEY = "AQ.Ab8RN6J_y4LqG6IcnUYq6hUmKd0eliT8xvwj8EwCIHcwn2DQyw"; 
const GROQ_API_KEY = "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";

// تعليمات شخصية المعلم الذكي
const SYSTEM_INSTRUCTION = `
أنت "المعلم الذكي" في تطبيق "سبيل المجد" للثانوية العامة المصرية. 
دورك مساعدة الطالب في فهم دروسه، شرح الأسئلة الصعبة، تحليل أخطائه، وتقديم نصائح دراسية وتحفيزية.
إجاباتك ملخصة، واضحة، سهلة الفهم، مبهجة، وبأسلوب مشجع جداً.
`;

let currentAiImgBase64 = null;

// الدالة الرئيسية للتوجيه حسب الموديل
async function askSmartTeacher(userPrompt, imageBase64 = null) {
  const selectedModel = document.getElementById('aiModelSelect')?.value || "gemini-1.5-flash";

  // لو فيه صورة مرفقة أو الموديل من عائلة Gemini، يروح لـ Gemini فوراً
  if (imageBase64 || selectedModel.startsWith("gemini")) {
    return await fetchFromGemini(selectedModel, userPrompt, imageBase64);
  }

  // المحركات الأخرى تشغل عبر Groq
  if (GROQ_API_KEY) {
    return await fetchFromGroq(selectedModel, userPrompt);
  } else {
    return await fetchFromGemini("gemini-1.5-flash", userPrompt, imageBase64);
  }
}

// 🌐 1. استدعاء نماذج Groq (Llama 3 / Mixtral / DeepSeek)
async function fetchFromGroq(modelType, userPrompt) {
  let groqModelName = "llama-3.3-70b-versatile"; 

  if (modelType === "mixtral-8x7b") groqModelName = "mixtral-8x7b-32768";
  else if (modelType === "deepseek-r1") groqModelName = "deepseek-r1-distill-llama-70b";

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
        temperature: 0.6
      })
    });

    const data = await response.json();
    if (data.choices && data.choices[0].message.content) {
      return data.choices[0].message.content;
    } else {
      return await fetchFromGemini("gemini-1.5-flash", userPrompt, null);
    }
  } catch (err) {
    console.error("Groq Error:", err);
    return await fetchFromGemini("gemini-1.5-flash", userPrompt, null);
  }
}

// 🌐 2. استدعاء نماذج Gemini (Google)
async function fetchFromGemini(modelName, userPrompt, imageBase64) {
  let apiModel = (modelName === "gemini-1.5-pro") ? "gemini-1.5-pro" : "gemini-1.5-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${apiModel}:generateContent?key=${GEMINI_API_KEY}`;

  let contentsParts = [];
  if (imageBase64) {
    const base64Data = imageBase64.split(',')[1] || imageBase64;
    contentsParts.push({ inline_data: { mime_type: "image/jpeg", data: base64Data } });
  }
  contentsParts.push({ text: userPrompt });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: contentsParts }],
        systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] }
      })
    });
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "عذراً يا بطل، حاول مرة أخرى!";
  } catch (err) {
    return "❌ يتعذر الاتصال بالسيرفر حالياً. تأكد من اتصالك بالإنترنت!";
  }
}

// 💬 3. التحكم في واجهة الشات
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
  
  const promptText = val || "اشرح لي هذه الصورة أو السؤال المرفق بالتفصيل.";
  const imgData = currentAiImgBase64;
  inp.value = '';
  document.getElementById('aiImgPreview').style.display = 'none';
  currentAiImgBase64 = null;

  const loadingId = 'loading_' + Date.now();
  chatBox.insertAdjacentHTML('beforeend', `
    <div id="${loadingId}" style="align-self: flex-end; background: rgba(255,255,255,0.05); border: 1px solid var(--border); padding: 8px 12px; border-radius: 12px; max-width: 85%; margin-bottom: 8px; font-size: 12px; color: var(--gold);">
      🤖 المعلم الذكي يفكر ويكتب الإجابة... ☕
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
