// ===============================================
// 🤖 المساعد الذكي لتطبيق سبيل المجد - aiAssistant.js (النسخة المفلترة)
// ===============================================

const GEMINI_API_KEY = "AQ.Ab8RN6LSJfTjj_r_sAwCsAfA7bsPYcmQiB2gWiObnK9s3o94Ww"; 
const GROQ_API_KEY = "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";

const SYSTEM_INSTRUCTION = `
أنت "المعلم الذكي" في تطبيق "سبيل المجد" للثانوية العامة المصرية. 
دورك شرح المفاهيم الصعبة والقوانين الفيزيائية والرياضية وحل المسائل خطوة بخطوة.
تنبيه مهم جداً: اكتب القوانين والرموز الرياضية والفيزيائية بأحرف واضحة ونصوص عادية، ولا تستخدم رموز مشفرة أو لغة LaTeX أو أقواس غريبة. 
اجعل الإجابة دقيقة، منسقة، واضحة، سهلة الفهم، وبأسلوب مشجع ورائع.
`;

let currentAiImgBase64 = null;

// دالة لتنظيف الردود من الرموز الغريبة أو رموز التفكير المسربة
function cleanAiResponse(text) {
  if (!text) return "";
  
  // 1. إزالة أي أقواس تفكير من موديلات DeepSeek أو اللغات الغريبة
  let cleaned = text.replace(/<thought>[\s\S]*?<\/thought>/gi, "");
  cleaned = cleaned.replace(/<think>[\s\S]*?<\/think>/gi, "");

  // 2. تحويل الرموز الرياضية والمعادلات من صيغة LaTeX إلى نص عربي واضح
  cleaned = cleaned.replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, "($1 ÷ $2)");
  cleaned = cleaned.replace(/\\times/g, " × ");
  cleaned = cleaned.replace(/\\cdot/g, " · ");
  cleaned = cleaned.replace(/[\$\\]/g, ""); // إزالة العلامات المفاجئة

  return cleaned.trim();
}

// الدالة الرئيسية للتوجيه
async function askSmartTeacher(userPrompt, imageBase64 = null) {
  const selectedModel = document.getElementById('aiModelSelect')?.value || "gemini-1.5-flash";

  if (imageBase64 || selectedModel.startsWith("gemini")) {
    return await fetchFromGemini(selectedModel, userPrompt, imageBase64);
  }

  return await fetchFromGroq(selectedModel, userPrompt);
}

// 🌐 1. دالة Groq المحدثة
async function fetchFromGroq(modelType, userPrompt) {
  let groqModelName = "llama-3.3-70b-versatile"; 

  if (modelType === "deepseek-r1") {
    groqModelName = "deepseek-r1-distill-llama-70b"; 
  } else if (modelType === "mixtral-8x7b") {
    groqModelName = "qwen-2.5-coder-32b"; 
  } else if (modelType === "llama-3-70b") {
    groqModelName = "llama-3.3-70b-versatile";
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
      return await fetchFromGemini("gemini-1.5-flash", userPrompt, null);
    }
  } catch (err) {
    return await fetchFromGemini("gemini-1.5-flash", userPrompt, null);
  }
}

// 🌐 2. دالة Gemini
async function fetchFromGemini(modelName, userPrompt, imageBase64) {
  const apiModel = (modelName === "gemini-1.5-pro") ? "gemini-1.5-pro" : "gemini-1.5-flash";
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
    if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
      return cleanAiResponse(data.candidates[0].content.parts[0].text);
    } else {
      return "عذراً يا بطل، حاول مرة أخرى خلال لحظات!";
    }
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
  
  const promptText = val || "اشرح لي هذه الصورة بالتفصيل واذكر القوانين إن وجدت.";
  const imgData = currentAiImgBase64;
  inp.value = '';
  document.getElementById('aiImgPreview').style.display = 'none';
  currentAiImgBase64 = null;

  const loadingId = 'loading_' + Date.now();
  chatBox.insertAdjacentHTML('beforeend', `
    <div id="${loadingId}" style="align-self: flex-end; background: rgba(255,255,255,0.05); border: 1px solid var(--border); padding: 8px 12px; border-radius: 12px; max-width: 85%; margin-bottom: 8px; font-size: 12px; color: var(--gold);">
      🤖 المعلم الذكي يكتب الشرح والقوانين... ☕
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
