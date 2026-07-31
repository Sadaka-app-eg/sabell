// ===============================================
// 🚨 غرفة إدارة الأزمات وحاسبة الإنقاذ من التراكمات - emergency.js
// ===============================================

// 1️⃣ متغيرة التراكمات المؤقتة أثناء الإضافة
let pendingBacklogs = [];
let currentEmergencyMode = 'stealth'; // 'stealth' (تسلل) أو 'blitz' (معسكر)

// أوزان الدروس بالساعات التقديرية بناءً على الحالة والنوع
const TASK_WEIGHTS = {
  status: {
    unopened: { label: "🔴 ما اتفتحش أصلاً", hours: 2.5, factor: 1.0 },
    unsolved: { label: "🟡 مشروح بس محتاج حل", hours: 1.5, factor: 0.6 },
    review: { label: "🟠 محتاج مراجعة وتثبيت", hours: 1.0, factor: 0.4 }
  },
  difficulty: {
    heavy: { label: "🐘 ثقيل ودسم (زي العضوية/كيرشوف)", multiplier: 1.3 },
    medium: { label: "⚖️ متوسط الحجم", multiplier: 1.0 },
    light: { label: "feather خفيف ولطيف", multiplier: 0.7 }
  }
};

// ================= 💾 إدارة البيانات والتخزين =================

// جلب مفتاح المستخدم الموحد لضمان مزامنة البيانات
function getEmergencyUserKey() {
  const user = (window.firebase && window.firebase.auth) ? window.firebase.auth().currentUser : null;
  return user ? `sm_backlog_plan_${user.uid}` : 'sm_backlog_plan_guest';
}

// حفظ الخطة النشطة
async function saveEmergencyPlan(planData) {
  const key = getEmergencyUserKey();
  await localforage.setItem(key, planData);
  if (window.syncStudentDataToCloud) window.syncStudentDataToCloud();
}

// استرجاع الخطة النشطة
async function getEmergencyPlan() {
  const key = getEmergencyUserKey();
  return await localforage.getItem(key) || null;
}

// ================= 🧮 محرك حساب وتوزيع التراكمات =================

// إضافة درس متراكم للقائمة المؤقتة
function addBacklogItem(subject, chapter, lessonName, statusKey, diffKey) {
  if (!subject || !lessonName) {
    alert("من فضلك أدخل اسم المادة والدرس المتراكم 🙏");
    return;
  }

  const baseHours = TASK_WEIGHTS.status[statusKey].hours;
  const mult = TASK_WEIGHTS.difficulty[diffKey].multiplier;
  const estimatedHours = Math.round((baseHours * mult) * 10) / 10;

  const item = {
    id: Date.now() + Math.random().toString(36).substr(2, 4),
    subject,
    chapter: chapter || "عام",
    lessonName,
    statusKey,
    diffKey,
    estimatedHours,
    completed: false
  };

  pendingBacklogs.push(item);
  renderPendingBacklogsUI();
}

// حذف عنصر من القائمة المؤقتة
function removePendingBacklogItem(itemId) {
  pendingBacklogs = pendingBacklogs.filter(i => i.id !== itemId);
  renderPendingBacklogsUI();
}

// حساب إجمالي ساعات التراكم الصافية
function calculateTotalBacklogHours(itemsList) {
  return itemsList.reduce((sum, item) => sum + (item.completed ? 0 : item.estimatedHours), 0);
}

// 🚀 توليد خطة الإنقاذ الذكية
async function generateEmergencyRescuePlan(availableDays, dailyExtraHours = 1) {
  if (pendingBacklogs.length === 0) {
    alert("القائمة فارغة! أضف بضعة دروس متراكمة أولاً لبناء الخطة 🌿");
    return;
  }

  const totalHours = calculateTotalBacklogHours(pendingBacklogs);
  const totalItems = pendingBacklogs.length;

  // خوارزمية التوزيع على الأيام
  let scheduleDays = [];
  let currentDayIndex = 1;
  let currentDayHours = 0;
  let currentDayTasks = [];

  // ترتيب التراكمات (من الأسفل للأعلى أو الأثقل أولاً)
  let sortedItems = [...pendingBacklogs].sort((a, b) => b.estimatedHours - a.estimatedHours);

  sortedItems.forEach(item => {
    // إذا كانت الساعات المضافة تتجاوز المتاح لليوم، ننتقل لليوم التالي
    if (currentDayHours + item.estimatedHours > dailyExtraHours && currentDayTasks.length > 0) {
      scheduleDays.push({
        dayNumber: currentDayIndex,
        targetHours: currentDayHours,
        tasks: currentDayTasks
      });
      currentDayIndex++;
      currentDayHours = 0;
      currentDayTasks = [];
    }

    currentDayHours += item.estimatedHours;
    currentDayTasks.push(item);
  });

  // إضافة باقي المهام لليوم الأخير
  if (currentDayTasks.length > 0) {
    scheduleDays.push({
      dayNumber: currentDayIndex,
      targetHours: currentDayHours,
      tasks: currentDayTasks
    });
  }

  const planPayload = {
    id: "rescue_" + Date.now(),
    createdAt: new Date().toISOString(),
    mode: currentEmergencyMode,
    totalHours: Math.round(totalHours * 10) / 10,
    totalTasksCount: totalItems,
    completedTasksCount: 0,
    dailyExtraHours: dailyExtraHours,
    schedule: scheduleDays,
    rawTasks: pendingBacklogs
  };

  await saveEmergencyPlan(planPayload);
  pendingBacklogs = []; // تفريغ المؤقت
  renderActiveEmergencyPlanUI();
}

// ================= 🎯 التفاعل وتغيير حالة الإنجاز =================

// تغيير حالة درس متراكم (تم التخلص منه / لم يتم)
async function toggleBacklogTaskCompletion(taskId) {
  let plan = await getEmergencyPlan();
  if (!plan) return;

  let found = false;
  plan.schedule.forEach(day => {
    day.tasks.forEach(task => {
      if (task.id === taskId) {
        task.completed = !task.completed;
        found = true;
      }
    });
  });

  if (found) {
    // إعادة حساب المهام المكتملة
    let done = 0;
    plan.schedule.forEach(d => {
      d.tasks.forEach(t => { if (t.completed) done++; });
    });
    plan.completedTasksCount = done;

    await saveEmergencyPlan(plan);
    renderActiveEmergencyPlanUI();
  }
}

// إلغاء خطة الإنقاذ وبدء واحدة جديدة
async function resetEmergencyPlan() {
  if (confirm("هل أنت متأكد من إلغاء خطة الإنقاذ الحالية والبدء من جديد؟")) {
    const key = getEmergencyUserKey();
    await localforage.removeItem(key);
    renderActiveEmergencyPlanUI();
  }
}

// ================= 🎨 عرض الواجهات والـ UI =================

// رسم قائمة الدروس المضافة مؤقتاً قبل الاعتماد
function renderPendingBacklogsUI() {
  const container = document.getElementById('pendingBacklogsList');
  const countEl = document.getElementById('pendingBacklogCount');
  const hoursEl = document.getElementById('pendingBacklogHours');

  if (!container) return;

  const totalHours = calculateTotalBacklogHours(pendingBacklogs);
  if (countEl) countEl.textContent = pendingBacklogs.length;
  if (hoursEl) hoursEl.textContent = Math.round(totalHours * 10) / 10;

  if (pendingBacklogs.length === 0) {
    container.innerHTML = `<div style="text-align:center; color:var(--text2); font-size:12px; padding:15px;">لم تضف أي دروس متراكمة بعد. أضف درساً لبدء الخطة 🌿</div>`;
    return;
  }

  container.innerHTML = pendingBacklogs.map(item => `
    <div class="athr-card" style="margin-bottom:8px; padding:10px; display:flex; justify-content:space-between; align-items:center;">
      <div>
        <div style="font-size:13px; font-weight:bold; color:var(--gold);">${item.subject} • <span style="color:var(--text);">${item.lessonName}</span></div>
        <div style="font-size:11px; color:var(--text2); margin-top:3px;">
          ${TASK_WEIGHTS.status[item.statusKey].label} | ⏱️ جهد تقديري: ${item.estimatedHours} ساعة
        </div>
      </div>
      <button onclick="removePendingBacklogItem('${item.id}')" style="background:transparent; border:none; color:#ff6b6b; font-size:16px; cursor:pointer;">✕</button>
    </div>
  `).join('');
}

// رسم خطة الإنقاذ المعتمدة والشغالة
async function renderActiveEmergencyPlanUI() {
  const wizardBox = document.getElementById('emergencySetupWizard');
  const activeBox = document.getElementById('emergencyActiveDisplay');

  if (!wizardBox || !activeBox) return;

  const plan = await getEmergencyPlan();

  if (!plan) {
    wizardBox.style.display = 'block';
    activeBox.style.display = 'none';
    renderPendingBacklogsUI();
    return;
  }

  wizardBox.style.display = 'none';
  activeBox.style.display = 'block';

  // حساب نسبة الإنجاز
  const pct = plan.totalTasksCount > 0 ? Math.round((plan.completedTasksCount / plan.totalTasksCount) * 100) : 0;

  // تحديث كروت الإحصائيات
  document.getElementById('emergencyProgressPct').textContent = pct + "%";
  document.getElementById('emergencyProgressBarFill').style.width = pct + "%";
  document.getElementById('emergencyTotalHoursDisplay').textContent = plan.totalHours;
  document.getElementById('emergencyDoneTasksDisplay').textContent = `${plan.completedTasksCount} من ${plan.totalTasksCount}`;

  // رسالة الدعم النفسي والحسابي
  const messageEl = document.getElementById('emergencyPsychMessage');
  if (messageEl) {
    if (pct === 100) {
      messageEl.innerHTML = `🎉 <b>عاش يا بطل!</b> قفلت كل التراكمات ورجعت للمضمار بقوة أسطورية!`;
    } else if (pct >= 50) {
      messageEl.innerHTML = `⚡ <b>عديت النص!</b> فاضلك ساعات قليلة وتتخلص من كابوس التراكم تماماً. استمر!`;
    } else {
      messageEl.innerHTML = `اطمئن! التراكمات دي محتاجة <b>${plan.totalHours} ساعة صافية</b> فقط.. امشي على الخطوة دي وهتلم القديم بدون ما تعطل جدولك! 🌿`;
    }
  }

  // رسم جدول الأيام والمهام
  const scheduleContainer = document.getElementById('emergencyDaysScheduleContainer');
  if (scheduleContainer) {
    scheduleContainer.innerHTML = plan.schedule.map(day => `
      <div class="athr-card" style="margin-bottom:12px; border-right:4px solid var(--gold);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <span style="font-size:14px; font-weight:bold; color:var(--gold);">🗓️ اليوم ${day.dayNumber} (جرعة الإنقاذ)</span>
          <span style="font-size:11px; color:var(--text2);">⏱️ إجمالي: ${Math.round(day.targetHours * 10) / 10} ساعة</span>
        </div>
        <div>
          ${day.tasks.map(t => `
            <div onclick="toggleBacklogTaskCompletion('${t.id}')" style="display:flex; justify-content:space-between; align-items:center; background:var(--bg2); border:1px solid var(--border); border-radius:10px; padding:8px 10px; margin-bottom:6px; cursor:pointer; ${t.completed ? 'opacity:0.5; text-decoration:line-through;' : ''}">
              <div>
                <span style="font-size:12px; font-weight:bold; color:var(--text);">${t.completed ? '✅' : '⚪'} ${t.subject}: ${t.lessonName}</span>
                <div style="font-size:10px; color:var(--text2);">${TASK_WEIGHTS.status[t.statusKey].label}</div>
              </div>
              <span class="btn-small" style="font-size:10px; padding:3px 8px; background:${t.completed ? 'var(--green)' : 'var(--card)'}; color:${t.completed ? '#fff' : 'var(--gold)'};">
                ${t.completed ? 'تم التخلص' : t.estimatedHours + ' ساعة ⏱️'}
              </span>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
  }
}

// تشغيل الواجهة المبدئية عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    renderActiveEmergencyPlanUI();
  }, 500);
});
