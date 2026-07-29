// ===============================================
// 🤝 شريك المذاكرة - studyBuddy.js
// ===============================================
// الفكرة: كل طالب عنده كود فريد (SM-XXXX) موجود أصلاً في نظامك.
// الطالب بيبعت دعوة لكود صاحبه، لو قبلها، بيتربطوا في تحدي أسبوعي
// على دقائق التركيز، ويقدروا يبعتوا لبعض تحفيز سريع (إيموجي).
//
// ⚠️ مهم: ده بيعتمد على إن Firestore Rules بتاعتك بتسمح بالقراءة
// والكتابة على مستند students/{code} بدون قيود ownerId صارمة،
// بالظبط زي نظام رسائل ولي الأمر الشغال عندك حالياً. لو حطيت Rules
// أضيق، هتحتاج تسمح بالكتابة على الحقول: buddyRequestsIncoming,
// buddyCode, weeklyFocus, buddyCheers, buddyHistory تحديداً.
// ===============================================

let myBuddyCode = null;   // كود الشريك المربوط بيا حالياً (لو موجود)
let myOwnCode = null;
let myOwnName = null;
let unsubMyDoc = null;
let unsubBuddyDoc = null;
let lastKnownBuddyMins = 0; // آخر رقم معروف لدقائق الشريك (نستخدمه وقت الأرشفة)

// ================= 🗓️ حساب رقم الأسبوع الحالي (ISO Week) =================
function getCurrentWeekId() {
  const now = new Date();
  const d = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(weekNo).padStart(2, '0')}`;
}

// ================= 🚀 نقطة الدخول: عرض الصفحة =================
function renderStudyBuddyPage() {
  myOwnCode = window.getMyStudentCode ? window.getMyStudentCode() : null;
  myOwnName = window.getMyStudentName ? window.getMyStudentName() : "الطالب";

  if (!myOwnCode || myOwnCode === "SM-GUEST") {
    document.getElementById('noBuddyState').innerHTML = `
      <div style="text-align:center; color:var(--text2); font-size:13px; padding:10px;">
        لازم تسجّل دخولك بجوجل الأول عشان تقدر تستخدم شريك المذاكرة 🙏
      </div>`;
    return;
  }

  document.getElementById('myOwnCodeDisplay').textContent = "كودك انت: " + myOwnCode + " (ابعته لصاحبك)";

  attachMyDocListener();
}

// ================= 👂 الاستماع الحي لمستندي الشخصي =================
function attachMyDocListener() {
  if (unsubMyDoc) unsubMyDoc(); // فصل أي استماع قديم

  const myRef = window.fireDoc(window.fireDB, "students", myOwnCode);

  unsubMyDoc = window.fireOnSnapshot(myRef, (docSnap) => {
    if (!docSnap.exists()) return;
    const data = docSnap.data();
    handleMyDocUpdate(data);
  });
}

function handleMyDocUpdate(data) {
  const requests = data.buddyRequestsIncoming || [];
  renderIncomingRequests(requests);

  const cheers = data.buddyCheers || [];
  renderCheersInbox(cheers);

  if (data.buddyCode) {
    myBuddyCode = data.buddyCode;
    document.getElementById('noBuddyState').style.display = 'none';
    document.getElementById('activeBuddyState').style.display = 'block';
    document.getElementById('buddyNameDisplay').textContent = data.buddyName || "شريكك";

    checkWeeklyResetAndArchive(data);
    updateMyWeeklyUI(data);
    attachBuddyDocListener(myBuddyCode);
    renderBuddyHistory(data.buddyHistory || []);
  } else {
    myBuddyCode = null;
    document.getElementById('noBuddyState').style.display = 'block';
    document.getElementById('activeBuddyState').style.display = 'none';
    if (unsubBuddyDoc) { unsubBuddyDoc(); unsubBuddyDoc = null; }
  }
}

// ================= 👂 الاستماع الحي لمستند الشريك =================
function attachBuddyDocListener(buddyCode) {
  if (unsubBuddyDoc) unsubBuddyDoc();

  const buddyRef = window.fireDoc(window.fireDB, "students", buddyCode);
  unsubBuddyDoc = window.fireOnSnapshot(buddyRef, (docSnap) => {
    if (!docSnap.exists()) return;
    const buddyData = docSnap.data();
    const weekId = getCurrentWeekId();
    const buddyMins = (buddyData.weeklyFocus && buddyData.weeklyFocus.weekId === weekId)
      ? buddyData.weeklyFocus.mins : 0;

    lastKnownBuddyMins = buddyMins;
    updateBuddyWeeklyUI(buddyMins);
    updateWeeklyLeadBadge();
  });
}

// ================= 📊 عرض بيانات التحدي الأسبوعي =================
let cachedMyMins = 0;

function updateMyWeeklyUI(data) {
  const weekId = getCurrentWeekId();
  document.getElementById('weekIdDisplay').textContent = weekId;

  const myMins = (data.weeklyFocus && data.weeklyFocus.weekId === weekId) ? data.weeklyFocus.mins : 0;
  cachedMyMins = myMins;

  document.getElementById('myWeeklyMins').textContent = myMins;
  const maxRef = Math.max(myMins, lastKnownBuddyMins, 60); // مرجع نسبي لعرض الأشرطة
  document.getElementById('myWeeklyBar').style.width = Math.min(100, Math.round((myMins / maxRef) * 100)) + '%';

  updateWeeklyLeadBadge();
}

function updateBuddyWeeklyUI(buddyMins) {
  document.getElementById('buddyWeeklyMins').textContent = buddyMins;
  const maxRef = Math.max(cachedMyMins, buddyMins, 60);
  document.getElementById('buddyWeeklyBar').style.width = Math.min(100, Math.round((buddyMins / maxRef) * 100)) + '%';
}

function updateWeeklyLeadBadge() {
  const badge = document.getElementById('weeklyLeadBadge');
  if (!badge) return;

  if (cachedMyMins === 0 && lastKnownBuddyMins === 0) {
    badge.textContent = "🌿 الأسبوع لسه بادئ، يلا ابدأ أول جلسة تركيز!";
    return;
  }
  if (cachedMyMins > lastKnownBuddyMins) {
    badge.innerHTML = `🥇 إنت قدام بفارق <b>${cachedMyMins - lastKnownBuddyMins}</b> دقيقة! كمّل كده.`;
  } else if (lastKnownBuddyMins > cachedMyMins) {
    badge.innerHTML = `⚡ شريكك قدامك بفارق <b>${lastKnownBuddyMins - cachedMyMins}</b> دقيقة، اقفل الفجوة!`;
  } else {
    badge.textContent = "🤝 إنتم متعادلين تماماً دلوقتي، مين هياخد الصدارة؟";
  }
}

// ================= 🔄 أرشفة الأسبوع القديم لو خلص =================
function checkWeeklyResetAndArchive(data) {
  const currentWeekId = getCurrentWeekId();
  const storedWeekId = data.weeklyFocus ? data.weeklyFocus.weekId : null;

  if (storedWeekId && storedWeekId !== currentWeekId) {
    const oldMyMins = data.weeklyFocus.mins || 0;
    const oldBuddyMins = lastKnownBuddyMins; // أفضل تقدير متاح
    let result = 'tie';
    if (oldMyMins > oldBuddyMins) result = 'win';
    else if (oldBuddyMins > oldMyMins) result = 'lose';

    const historyEntry = { weekId: storedWeekId, myMins: oldMyMins, buddyMins: oldBuddyMins, result: result };
    const myRef = window.fireDoc(window.fireDB, "students", myOwnCode);

    window.fireUpdateDoc(myRef, {
      weeklyFocus: { weekId: currentWeekId, mins: 0, sessions: 0 },
      buddyHistory: window.fireArrayUnion(historyEntry)
    });
  } else if (!storedWeekId) {
    const myRef = window.fireDoc(window.fireDB, "students", myOwnCode);
    window.fireUpdateDoc(myRef, {
      weeklyFocus: { weekId: currentWeekId, mins: 0, sessions: 0 }
    });
  }
}

// ================= 📨 نظام الدعوات =================
async function sendBuddyRequest() {
  const inp = document.getElementById('buddyCodeInput');
  const targetCode = inp.value.trim().toUpperCase();

  if (!targetCode || !targetCode.startsWith('SM-')) {
    alert("اكتب كود صحيح زي: SM-4921");
    return;
  }
  if (targetCode === myOwnCode) {
    alert("متقدرش تبعت دعوة لنفسك 😄");
    return;
  }

  const targetRef = window.fireDoc(window.fireDB, "students", targetCode);
  const targetSnap = await window.fireGetDoc(targetRef);

  if (!targetSnap.exists()) {
    alert("مفيش طالب بالكود ده، تأكد منه مع صاحبك 🙏");
    return;
  }

  await window.fireUpdateDoc(targetRef, {
    buddyRequestsIncoming: window.fireArrayUnion({
      code: myOwnCode,
      name: myOwnName,
      sentAt: Date.now()
    })
  });

  inp.value = '';
  alert("تم إرسال الدعوة! هتلاقيها لما صاحبك يفتح التطبيق ويقبلها.");
}

function renderIncomingRequests(requests) {
  const box = document.getElementById('incomingRequestsBox');
  if (!requests || requests.length === 0) {
    box.innerHTML = '';
    return;
  }

  box.innerHTML = requests.map(r => `
    <div class="athr-card" style="display:flex; justify-content:space-between; align-items:center;">
      <div style="font-size:13px;">
        <b style="color:var(--gold);">${r.name}</b>
        <div style="font-size:11px; color:var(--text2);">عايز يبقى شريك مذاكرتك (${r.code})</div>
      </div>
      <div style="display:flex; gap:6px;">
        <button onclick='acceptBuddyRequest(${JSON.stringify(r.code)}, ${JSON.stringify(r.name)})' class="btn-small" style="background:var(--green); color:#fff;">✔ قبول</button>
        <button onclick='rejectBuddyRequest(${JSON.stringify(r.code)})' style="background:transparent; border:1px solid #ff6b6b; color:#ff6b6b; padding:5px 10px; border-radius:12px; font-size:12px; cursor:pointer;">✕ رفض</button>
      </div>
    </div>
  `).join('');
}

async function acceptBuddyRequest(code, name) {
  const myRef = window.fireDoc(window.fireDB, "students", myOwnCode);
  const buddyRef = window.fireDoc(window.fireDB, "students", code);

  const mySnap = await window.fireGetDoc(myRef);
  const myData = mySnap.data() || {};
  const remainingRequests = (myData.buddyRequestsIncoming || []).filter(r => r.code !== code);

  await window.fireUpdateDoc(myRef, {
    buddyCode: code,
    buddyName: name,
    buddyRequestsIncoming: remainingRequests,
    weeklyFocus: { weekId: getCurrentWeekId(), mins: 0, sessions: 0 }
  });

  await window.fireUpdateDoc(buddyRef, {
    buddyCode: myOwnCode,
    buddyName: myOwnName
  });
}

async function rejectBuddyRequest(code) {
  const myRef = window.fireDoc(window.fireDB, "students", myOwnCode);
  const mySnap = await window.fireGetDoc(myRef);
  const myData = mySnap.data() || {};
  const remainingRequests = (myData.buddyRequestsIncoming || []).filter(r => r.code !== code);

  await window.fireUpdateDoc(myRef, { buddyRequestsIncoming: remainingRequests });
}

// ================= 💔 فسخ الشراكة =================
async function removeBuddy() {
  if (!confirm("متأكد إنك عايز تفسخ الشراكة مع شريكك؟")) return;

  const myRef = window.fireDoc(window.fireDB, "students", myOwnCode);
  await window.fireUpdateDoc(myRef, {
    buddyCode: null,
    buddyName: null
  });

  if (myBuddyCode) {
    try {
      const buddyRef = window.fireDoc(window.fireDB, "students", myBuddyCode);
      await window.fireUpdateDoc(buddyRef, { buddyCode: null, buddyName: null });
    } catch (e) {}
  }
}

// ================= 📣 التحفيز السريع (Cheers) =================
async function sendQuickCheer(emoji) {
  if (!myBuddyCode) return;
  const buddyRef = window.fireDoc(window.fireDB, "students", myBuddyCode);

  await window.fireUpdateDoc(buddyRef, {
    buddyCheers: window.fireArrayUnion({
      from: myOwnName,
      emoji: emoji,
      at: Date.now()
    })
  });

  const badge = document.getElementById('weeklyLeadBadge');
  const original = badge.innerHTML;
  badge.innerHTML = `✅ اتبعتت التحفيزة ${emoji} لشريكك!`;
  setTimeout(() => { updateWeeklyLeadBadge(); }, 1800);
}

function renderCheersInbox(cheers) {
  const box = document.getElementById('cheersInboxBox');
  if (!box) return;

  if (!cheers || cheers.length === 0) {
    box.innerHTML = `<div style="font-size:12px; color:var(--text2); text-align:center;">لسه مفيش تحفيز وصلك من شريكك 🌿</div>`;
    return;
  }

  const recent = cheers.slice(-5).reverse();
  box.innerHTML = `
    <div style="font-size:13px; font-weight:bold; color:var(--gold); margin-bottom:8px;">💌 آخر تحفيزات وصلتك:</div>
    ${recent.map(c => `
      <div style="font-size:13px; color:var(--text); margin-bottom:4px;">
        ${c.emoji} من <b>${c.from}</b>
        <span style="font-size:10px; color:var(--text2);"> - ${new Date(c.at).toLocaleTimeString('ar-EG', {hour:'2-digit', minute:'2-digit'})}</span>
      </div>
    `).join('')}
  `;
}

// ================= 🏆 سجل الأسابيع =================
function renderBuddyHistory(history) {
  const box = document.getElementById('buddyHistoryList');
  if (!box) return;

  if (!history || history.length === 0) {
    box.textContent = "لسه مفيش أسابيع سابقة.";
    return;
  }

  const resultLabel = { win: "🥇 فزت", lose: "😅 خسرت", tie: "🤝 تعادل" };

  box.innerHTML = history.slice().reverse().map(h => `
    <div style="display:flex; justify-content:space-between; padding:6px 0; border-bottom:1px dashed var(--border); font-size:12px;">
      <span>${h.weekId}</span>
      <span>إنت: ${h.myMins}د - شريكك: ${h.buddyMins}د</span>
      <span style="font-weight:bold; color:var(--gold);">${resultLabel[h.result] || h.result}</span>
    </div>
  `).join('');
}

// ================= ⏱️ استقبال دقائق التركيز (بيتنادى من app.js/index.html) =================
async function recordFocusSessionForBuddy(minsAdded) {
  if (!myOwnCode || minsAdded <= 0) return;

  const weekId = getCurrentWeekId();
  const myRef = window.fireDoc(window.fireDB, "students", myOwnCode);

  try {
    const mySnap = await window.fireGetDoc(myRef);
    const data = mySnap.data() || {};
    const currentWeekly = (data.weeklyFocus && data.weeklyFocus.weekId === weekId)
      ? data.weeklyFocus
      : { weekId: weekId, mins: 0, sessions: 0 };

    await window.fireUpdateDoc(myRef, {
      weeklyFocus: {
        weekId: weekId,
        mins: currentWeekly.mins + minsAdded,
        sessions: currentWeekly.sessions + 1
      }
    });
  } catch (e) {
    console.error("تعذّر تسجيل دقائق شريك المذاكرة:", e);
  }
}

// إتاحة الدالة للنداء من مكان تايمر التركيز
window.recordFocusSessionForBuddy = recordFocusSessionForBuddy;
