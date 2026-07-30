// ===============================================
// 🤖 المساعد الذكي لتطبيق سبيل المجد - aiAssistant.js
// ===============================================

// المفاتيح المحدثة والجاهزة للعمل
const GEMINI_API_KEY = "AQ.Ab8RN6LSJfTjj_r_sAwCsAfA7bsPYcmQiB2gWiObnK9s3o94Ww"; 
const GROQ_API_KEY = "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";

const SYSTEM_INSTRUCTION = `
أنت "المعلم الذكي" في تطبيق "سبيل المجد" للثانوية العامة المصرية. 
دورك هو شرح المفاهيم الصعبة، استخراج القوانين الفيزيائية والرياضية وحل المسائل خطوة بخطوة، مع تقديم النصائح الدراسية والتحفيز.
إجاباتك يجب أن تكون دقيقة، منسقة، واضحة، سهلة الفهم، وبأسلوب مشجع جداً.
`;

let currentAiImgBase64 = null;

// الدالة الرئيسية لتوزيع الأسئلة
async function askSmartTeacher(userPrompt, imageBase64 = null) {
  const selectedModel = document.getElementById('aiModelSelect')?.value || "gemini-1.5-flash";

  // لو في صورة أو الطالب اختار موديلات Gemini -> نروح لـ Gemini API
  if (imageBase64 || selectedModel.startsWith("gemini")) {
    return await fetchFromGemini(selectedModel, userPrompt, imageBase64);
  }

  // باقي النماذج النصية (Llama, Mixtral, DeepSeek) تروح لـ Groq API
  return await fetchFromGroq(selectedModel, userPrompt);
}

// 🌐 1. دالة Gemini (للصور والنصوص)
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
      return data.candidates[0].content.parts[0].text;
    } else {
      console.error("Gemini Response Error:", data);
      return "عذراً يا بطل، حدث ضغط بسيط على السيرفر. جرب نماذج Llama أو DeepSeek من القائمة بالأعلى! ⚡";
    }
  } catch (err) {
    console.error("Gemini Fetch Error:", err);
    return "❌ يتعذر الاتصال بمحرك Gemini حالياً. تأكد من اتصالك بالإنترنت!";
  }
}

// 🌐 2. دالة Groq النصية (Llama 3 / Mixtral / DeepSeek)
async function fetchFromGroq(modelType, userPrompt) {
  let groqModelName = "llama-3.3-70b-versatile"; 

  if (modelType === "mixtral-8x7b") {
    groqModelName = "mixtral-8x7b-32768";
  } else if (modelType === "deepseek-r1") {
    groqModelName = "deepseek-r1-distill-llama-70b";
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
        temperature: 0.6
      })
    });

    const data = await response.json();
    if (data.choices && data.choices[0]?.message?.content) {
      return data.choices[0].message.content;
    } else {
      console.error("Groq Response Error:", data);
      return await fetchFromGemini("gemini-1.5-flash", userPrompt, null);
    }
  } catch (err) {
    console.error("Groq Network Error:", err);
    return await fetchFromGemini("gemini-1.5-flash", userPrompt, null);
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
