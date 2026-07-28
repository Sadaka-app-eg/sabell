/**
 * =========================================================
 * 📅 نظام جدول المذاكرة الذكي - تطبيق سبيل المجد
 * بيمشي بالساعة والدقيقة واليوم + ربط ديناميكي مع الشعبة
 * =========================================================
 */

// 1. مصفوفة أيام الأسبوع
const WEEK_DAYS = [
  "السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة"
];

// 2. جلب المواد بناءً على الشعبة المختارة
function getBranchSubjects() {
  const branch = localStorage.getItem('sm_user_branch') || 'علمي علوم';
  const mapping = {
    "علمي علوم": ["اللغة العربية", "اللغة الإنجليزية", "الفيزياء", "الكيمياء", "الأحياء"],
    "علمي رياضة": ["اللغة العربية", "اللغة الإنجليزية", "الفيزياء", "الكيمياء", "الرياضيات (تفاضل وتكامل)", "الرياضيات (جبر وهندسة فراغية)", "الرياضيات (استاتيكا وديناميكا)"]
  };
  return mapping[branch] || mapping["علمي علوم"];
}

// 3. إدارة بيانات الجدول في LocalStorage
function getScheduleData() {
  return JSON.parse(localStorage.getItem('sm_schedule_tasks') || '[]');
}

function saveScheduleData(tasks) {
  localStorage.setItem('sm_schedule_tasks', JSON.stringify(tasks));
}

// 4. إضافة جلسة مذاكرة جديدة
function addNewTask(day, subject, startTime, endTime, type, notes) {
  const tasks = getScheduleData();
  const newTask = {
    id: Date.now(),
    day: day,
    subject: subject,
    startTime: startTime, // صيغة "14:30"
    endTime: endTime,     // صيغة "16:00"
    type: type || "شرح وفهم 📖",
    notes: notes || "",
    completed: false
  };

  tasks.push(newTask);
  saveScheduleData(tasks);
  renderScheduleUI();
}

// 5. تغيير حالة المهمة أو حذفها
function toggleTaskComplete(id) {
  let tasks = getScheduleData();
  tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
  saveScheduleData(tasks);
  renderScheduleUI();
}

function deleteTask(id) {
  let tasks = getScheduleData();
  tasks = tasks.filter(t => t.id !== id);
  saveScheduleData(tasks);
  renderScheduleUI();
}

// 6. العداد الحي والمؤشر بالساعة والدقيقة للواجهة الرئيسية وفي صفحة الجدول
function updateLiveTracker() {
  const now = new Date();
  const currentDayIndex = (now.getDay() + 1) % 7; // ضبط يوم الأسبوع للغة العربية (السبت = 0)
  const currentDayName = WEEK_DAYS[currentDayIndex];
  
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const tasks = getScheduleData();

  const todayTasks = tasks.filter(t => t.day === currentDayName);
  let activeTask = null;
  
  todayTasks.forEach(task => {
    const [startH, startM] = task.startTime.split(':').map(Number);
    const [endH, endM] = task.endTime.split(':').map(Number);
    
    const startTotal = startH * 60 + startM;
    const endTotal = endH * 60 + endM;

    if (currentMinutes >= startTotal && currentMinutes < endTotal) {
      activeTask = {
        ...task,
        startTotal,
        endTotal,
        progress: Math.min(100, Math.max(0, ((currentMinutes - startTotal) / (endTotal - startTotal)) * 100)),
        remainingMins: endTotal - currentMinutes
      };
    }
  });

  // تحديث كارت الرئيسية
  const homeActiveEl = document.getElementById('homeActiveSession');
  if (homeActiveEl) {
    if (activeTask) {
      homeActiveEl.innerHTML = `
        <div style="color:var(--gold); font-weight:bold; font-size:14px; margin-bottom:4px;">
          ⚡ ${activeTask.subject} — ${activeTask.type}
        </div>
        <div style="font-size:12px; color:var(--text2);">
          ⏱️ من ${activeTask.startTime} إلى ${activeTask.endTime} (متبقي ${activeTask.remainingMins} دقيقة)
        </div>
        <div style="width:100%; background:var(--bg2); height:6px; border-radius:3px; overflow:hidden; margin-top:8px;">
          <div style="width:${activeTask.progress}%; background:var(--gold); height:100%;"></div>
        </div>
      `;
    } else {
      homeActiveEl.innerHTML = `لا توجد فترة مذاكرة نشطة في هذا الوقت. استغل وقتك بالراحة أو المراجعة! ☕`;
    }
  }

  // تحديث وعاء التتبع في صفحة الجدول
  const liveTrackerEl = document.getElementById('liveTaskTracker');
  if (liveTrackerEl) {
    if (activeTask) {
      liveTrackerEl.innerHTML = `
        <div class="athr-card" style="border: 1px solid var(--gold); margin-bottom: 14px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
            <span style="color:var(--gold); font-weight:bold; font-size:13px;">⚡ الجلسة الشغالة حالياً (${activeTask.startTime} - ${activeTask.endTime})</span>
            <span style="background:var(--gold); color:#111; padding:2px 8px; border-radius:10px; font-size:10px; font-weight:bold;">متبقي ${activeTask.remainingMins} دقيقة</span>
          </div>
          <div style="font-size:16px; font-weight:bold; color:var(--text); margin-bottom:4px;">${activeTask.subject} — ${activeTask.type}</div>
          <p style="font-size:12px; color:var(--text2); margin-bottom:8px;">${activeTask.notes || 'لا يوجد ملاحظات إضافية'}</p>
          <div style="width:100%; background:var(--bg2); height:8px; border-radius:4px; overflow:hidden;">
            <div style="width:${activeTask.progress}%; background:var(--gold); height:100%;"></div>
          </div>
        </div>
      `;
    } else {
      liveTrackerEl.innerHTML = `
        <div style="background:var(--card); border:1px solid var(--border); border-radius:12px; padding:10px; text-align:center; color:var(--text2); font-size:12px; margin-bottom:14px;">
          ☕ مفيش جلسة شغال فيها دلوقتي.. استغل الوقت في راحة أو مراجعة سريعة!
        </div>
      `;
    }
  }
}

// 7. رسم واجهة الجدول بالكامل
function renderScheduleUI() {
  const container = document.getElementById('scheduleContainer');
  if (!container) return;

  const subjects = getBranchSubjects();
  const tasks = getScheduleData();
  const selectedDay = window.currentSelectedScheduleDay || WEEK_DAYS[0];

  let html = `
    <!-- وعاء التتبع الحي بالدقيقة -->
    <div id="liveTaskTracker"></div>

    <!-- أزرار أيام الأسبوع -->
    <div style="display:flex; gap:6px; overflow-x:auto; scrollbar-width:none; margin-bottom:14px;">
      ${WEEK_DAYS.map(day => `
        <button onclick="window.currentSelectedScheduleDay='${day}'; renderScheduleUI();" 
                class="day-btn ${selectedDay === day ? 'active' : ''}">
          ${day}
        </button>
      `).join('')}
    </div>

    <!-- نموذج إضافة فترة مذاكرة بالساعة والدقيقة -->
    <div class="athr-card">
      <div style="font-size:13px; font-weight:bold; color:var(--gold); margin-bottom:8px;">➕ إضافة فترة مذاكرة ليوم (${selectedDay})</div>
      
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:8px;">
        <div>
          <label style="font-size:11px; color:var(--text2);">المادة:</label>
          <select id="inpSubj" style="width:100%; padding:8px; border-radius:8px; background:var(--bg2); color:var(--text); border:1px solid var(--border); font-family:'Amiri', serif; outline:none; font-size:12px;">
            ${subjects.map(s => `<option value="${s}">${s}</option>`).join('')}
          </select>
        </div>

        <div>
          <label style="font-size:11px; color:var(--text2);">نوع المذاكرة:</label>
          <select id="inpType" style="width:100%; padding:8px; border-radius:8px; background:var(--bg2); color:var(--text); border:1px solid var(--border); font-family:'Amiri', serif; outline:none; font-size:12px;">
            <option value="شرح وفهم 📖">شرح وفهم 📖</option>
            <option value="حل أسئلة 📝">حل أسئلة 📝</option>
            <option value="مراجعة شاملة 🔄">مراجعة شاملة 🔄</option>
            <option value="امتحان جزئي ⏱️">امتحان جزئي ⏱️</option>
          </select>
        </div>
      </div>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:8px;">
        <div>
          <label style="font-size:11px; color:var(--text2);">من الساعة:</label>
          <input type="time" id="inpStart" value="16:00" style="width:100%; padding:7px; border-radius:8px; background:var(--bg2); color:var(--text); border:1px solid var(--border); font-family:sans-serif; outline:none; font-size:12px;">
        </div>
        <div>
          <label style="font-size:11px; color:var(--text2);">إلى الساعة:</label>
          <input type="time" id="inpEnd" value="17:30" style="width:100%; padding:7px; border-radius:8px; background:var(--bg2); color:var(--text); border:1px solid var(--border); font-family:sans-serif; outline:none; font-size:12px;">
        </div>
      </div>

      <input type="text" id="inpNotes" placeholder="ملاحظات أو الأبواب المحددة (اختياري)..." style="width:100%; padding:8px; border-radius:8px; background:var(--bg2); color:var(--text); border:1px solid var(--border); font-family:'Amiri', serif; margin-bottom:10px; font-size:12px; outline:none;">

      <button onclick="
        const s = document.getElementById('inpSubj').value;
        const t = document.getElementById('inpType').value;
        const st = document.getElementById('inpStart').value;
        const et = document.getElementById('inpEnd').value;
        const n = document.getElementById('inpNotes').value;
        if(!st || !et) { alert('من فضلك حدد الوقت المظبوط'); return; }
        addNewTask('${selectedDay}', s, st, et, t, n);
      " style="width:100%; background:var(--gold); color:#111; border:none; padding:10px; border-radius:10px; font-weight:bold; cursor:pointer; font-family:'Amiri', serif;">
        📌 تثبيت الفترة في الجدول
      </button>
    </div>

    <!-- قائمة فترات اليوم المحدد -->
    <div style="font-size:13px; font-weight:bold; color:var(--gold); margin:12px 0 8px; border-right:3px solid var(--gold); padding-right:8px;">
      📋 جدول يوم (${selectedDay}):
    </div>
  `;

  const dayTasks = tasks.filter(t => t.day === selectedDay).sort((a,b) => a.startTime.localeCompare(b.startTime));

  if (dayTasks.length === 0) {
    html += `
      <div style="text-align:center; padding:18px; color:var(--text2); font-size:12px; background:var(--card); border-radius:12px; border:1px dashed var(--border);">
        لا توجد فترات ذاكرة محددة ليوم ${selectedDay} بعد 🕊️
      </div>
    `;
  } else {
    html += `<div style="display:grid; gap:6px;">`;
    dayTasks.forEach(t => {
      html += `
        <div class="task-item ${t.completed ? 'done' : ''}">
          <div style="display:flex; align-items:center; gap:8px;">
            <input type="checkbox" ${t.completed ? 'checked' : ''} onchange="toggleTaskComplete(${t.id})" style="width:18px; height:18px; accent-color:var(--gold); cursor:pointer;">
            <div>
              <div style="font-size:14px; font-weight:bold; color:var(--text);">${t.subject} <span style="font-size:11px; color:var(--gold);">(${t.type})</span></div>
              <div style="font-size:11px; color:var(--text2);">⏱️ من ${t.startTime} إلى ${t.endTime} ${t.notes ? '• ' + t.notes : ''}</div>
            </div>
          </div>
          <button onclick="deleteTask(${t.id})" style="background:transparent; border:none; color:#ff6b6b; font-size:15px; cursor:pointer;">✕</button>
        </div>
      `;
    });
    html += `</div>`;
  }

  container.innerHTML = html;
  updateLiveTracker();
}

// 8. تشغيل التحديث التلقائي للوقت كل 30 ثانية
setInterval(updateLiveTracker, 30000);

// 9. تهيئة التظبيط فور تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
  window.currentSelectedScheduleDay = WEEK_DAYS[0];
  renderScheduleUI();
});
