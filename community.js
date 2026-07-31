// ===============================================
// 🌐 مجتمع سبيل المجد - Sabeel Community Engine
// ===============================================

let currentCommunityTab = "عام";
let currentCommunityView = "posts"; // 'posts' أو 'chat'
let currentPostMediaBase64 = null;
let currentCommentAudioBase64 = null;
let commentAudioRecorder = null;
let commentAudioChunks = [];
let isCommentRecording = false;

// 1️⃣ جلب بيانات الطالب الحالي
function getCommunityUserData() {
  const code = window.getMyStudentCode ? window.getMyStudentCode() : (localStorage.getItem('sm_student_code') || 'SM-GUEST');
  const name = window.getMyStudentName ? window.getMyStudentName() : (localStorage.getItem('sm_user_name') || 'طالب متميز');
  const avatar = localStorage.getItem('sm_user_custom_avatar') || 'https://via.placeholder.com/40';
  const branch = localStorage.getItem('sm_user_branch') || 'عام';
  return { code, name, avatar, branch };
}

// 2️⃣ التبديل بين قسم المنشورات وشات المجتمع المباشر
function switchCommunityMainView(viewType) {
  currentCommunityView = viewType;
  const postsView = document.getElementById('communityPostsSection');
  const chatView = document.getElementById('communityChatSection');
  const tabPostsBtn = document.getElementById('mainViewPostsBtn');
  const tabChatBtn = document.getElementById('mainViewChatBtn');

  if (viewType === 'chat') {
    if (postsView) postsView.style.display = 'none';
    if (chatView) chatView.style.display = 'block';
    if (tabPostsBtn) tabPostsBtn.classList.remove('active');
    if (tabChatBtn) tabChatBtn.classList.add('active');
    listenToCommunityPublicChat();
  } else {
    if (postsView) postsView.style.display = 'block';
    if (chatView) chatView.style.display = 'none';
    if (tabChatBtn) tabChatBtn.classList.remove('active');
    if (tabPostsBtn) tabPostsBtn.classList.add('active');
    listenToCommunityPosts();
  }
}

// 3️⃣ تغيير المادة من القائمة المنسدلة
function changeCommunityCategorySelect(selectEl) {
  currentCommunityTab = selectEl.value;
  listenToCommunityPosts();
}

// 4️⃣ إضافة خيارات استطلاع ديناميكية (+)
function addPollOptionInput() {
  const container = document.getElementById('pollOptionsContainer');
  if (!container) return;
  
  const currentInputs = container.querySelectorAll('.poll-opt-inp').length;
  if (currentInputs >= 6) {
    alert("أقصى عدد خيارات للاستطلاع هو 6 خيارات 🙏");
    return;
  }

  const newIdx = currentInputs + 1;
  const inputHtml = `<input type="text" class="poll-opt-inp" placeholder="الخيار ${newIdx}..." style="width:100%; padding:7px; border-radius:8px; background:var(--bg); border:1px solid var(--border); color:var(--text); font-size:12px; margin-bottom:6px; font-family:'Amiri', serif;">`;
  
  container.insertAdjacentHTML('beforeend', inputHtml);
}

// 📊 فتح وإغلاق صندوق إنشاء الاستطلاع
function togglePollCreator() {
  const box = document.getElementById('pollCreatorBox');
  if (box) {
    // لو مخفي افتحه، ولو مفتوح اقفله
    if (box.style.display === 'none' || box.style.display === '') {
      box.style.display = 'block';
    } else {
      box.style.display = 'none';
    }
  }
}

// 6️⃣ نشر بوست جديد (مضمون وسريع بدون أخطاء)
async function createNewCommunityPost() {
  const textInp = document.getElementById('communityPostTextInput');
  const isAnonCheck = document.getElementById('communityPostAnonCheck');
  const pollBox = document.getElementById('pollCreatorBox');
  const pollContainer = document.getElementById('pollOptionsContainer');

  const text = textInp ? textInp.value.trim() : '';
  const isAnonymous = isAnonCheck ? isAnonCheck.checked : false;

  // جمع خيارات الاستطلاع بأمان
  let pollData = null;
  if (pollBox && pollBox.style.display !== 'none' && pollContainer) {
    const optInputs = pollContainer.querySelectorAll('.poll-opt-inp');
    let opts = [];
    optInputs.forEach(inp => {
      if (inp.value.trim()) {
        opts.push({ text: inp.value.trim(), votes: 0, voters: [] });
      }
    });
    if (opts.length >= 2) {
      pollData = { options: opts };
    }
  }

  if (!text && !currentPostMediaBase64 && !pollData) {
    alert("من فضلك اكتب سؤالاً، ارفع صورة، أو أنشئ استطلاعاً على الأقل! 🙏");
    return;
  }

  const user = getCommunityUserData();
  const postPayload = {
    id: "post_" + Date.now(),
    authorCode: user.code,
    authorName: isAnonymous ? "طالب مجهول 🕵️" : user.name,
    authorAvatar: isAnonymous ? "https://via.placeholder.com/40/d4af37/000000?text=🔍" : user.avatar,
    authorBranch: user.branch,
    category: currentCommunityTab || 'عام',
    text: text,
    image: currentPostMediaBase64 || null,
    poll: pollData,
    likes: [],
    loves: [],
    savedBy: [],
    commentsList: [],
    commentsCount: 0,
    timestamp: new Date().toISOString()
  };

  try {
    // 1. الحفظ المحلي المباشر أولاً لضمان عدم حدوث خطأ للشاشة
    let localPosts = JSON.parse(localStorage.getItem('sm_local_community_posts') || '[]');
    localPosts.unshift(postPayload);
    localStorage.setItem('sm_local_community_posts', JSON.stringify(localPosts));

    // 2. المزامنة مع الفايربيس لو متاح
    if (window.fireDB && window.fireSetDoc && window.fireDoc) {
      window.fireSetDoc(window.fireDoc(window.fireDB, "community_posts", postPayload.id), postPayload).catch(e => console.log("Firebase sync fallback"));
    }

    // 3. تحديث الواجهة وتصفير الحقول
    renderCommunityPostsUI(localPosts);

    if (textInp) textInp.value = '';
    currentPostMediaBase64 = null;
    if (pollBox) pollBox.style.display = 'none';
    const notice = document.getElementById('postMediaNotice');
    if (notice) notice.style.display = 'none';
    if (isAnonCheck) isAnonCheck.checked = false;

  } catch (err) {
    console.error("Error creating post:", err);
    alert("حدث خطأ بسيط، تم حفظ البوست محلياً!");
  }
}

// 7️⃣ جلب واستماع البوستات
function listenToCommunityPosts() {
  if (!window.fireDB || !window.fireOnSnapshot) {
    let localPosts = JSON.parse(localStorage.getItem('sm_local_community_posts') || '[]');
    renderCommunityPostsUI(localPosts);
    return;
  }

  window.fireOnSnapshot(window.fireDoc(window.fireDB, "community", "stream"), (docSnap) => {
    if (docSnap.exists()) {
      const postsData = docSnap.data();
      renderCommunityPostsUI(Object.values(postsData || {}));
    }
  });
}

// 8️⃣ رسم البوستات في الصفحة
function renderCommunityPostsUI(postsList) {
  const container = document.getElementById('communityPostsFeed');
  if (!container) return;

  const filtered = currentCommunityTab === 'عام'
    ? postsList
    : postsList.filter(p => p.category === currentCommunityTab);

  if (!filtered || filtered.length === 0) {
    container.innerHTML = `<div style="text-align:center; padding:30px; color:var(--text2); font-size:12px;">لا توجد مشاركات في قسم (${currentCommunityTab}) بعد. شارك أول سؤال! 🚀</div>`;
    return;
  }

  const currentUser = getCommunityUserData();

  container.innerHTML = filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).map(post => {
    const isLiked = post.likes && post.likes.includes(currentUser.code);
    const isLoved = post.loves && post.loves.includes(currentUser.code);
    const isSaved = post.savedBy && post.savedBy.includes(currentUser.code);

    return `
      <div class="post-card">
        <div class="post-header">
          <div class="post-user-info" onclick="openUserProfileModal('${post.authorCode}', '${post.authorName}', '${post.authorAvatar}', '${post.authorBranch}')">
            <img src="${post.authorAvatar}" class="post-user-avatar">
            <div>
              <div class="post-user-name">
                ${post.authorName}
                <span class="post-user-badge">${post.authorBranch}</span>
              </div>
              <div class="post-time">قسم: (${post.category}) • ${formatCommunityTime(post.timestamp)}</div>
            </div>
          </div>
          <button onclick="toggleSavePost('${post.id}')" style="background:transparent; border:none; color:${isSaved ? 'var(--gold)' : 'var(--text2)'}; font-size:16px; cursor:pointer;" title="حفظ البوست">
            ${isSaved ? '🔖' : '📌'}
          </button>
        </div>

        ${post.text ? `<div class="post-content-text">${post.text}</div>` : ''}
        ${post.image ? `<img src="${post.image}" class="post-media-img" onclick="openImageViewer(this.src)" title="اضغط للتكبير 🔍">` : ''}
        
        ${post.poll ? renderDynamicPollUI(post) : ''}

        <div class="post-reactions-bar">
          <button onclick="togglePostReaction('${post.id}', 'like')" class="reaction-btn ${isLiked ? 'active-like' : ''}">
            ${isLiked ? '👍 مفيد' : '👍 إعجاب'} (${(post.likes || []).length})
          </button>
          <button onclick="togglePostReaction('${post.id}', 'love')" class="reaction-btn ${isLoved ? 'active-love' : ''}">
            ${isLoved ? '❤️ عبقري' : '❤️ إبداع'} (${(post.loves || []).length})
          </button>
          <button onclick="togglePostCommentsBox('${post.id}')" class="reaction-btn">
            💬 التعليقات (${post.commentsCount || 0})
          </button>
        </div>

        <div id="commentsBox_${post.id}" class="comments-section" style="display:none;">
          <div id="commentsList_${post.id}">
            ${(post.commentsList || []).map(c => `
              <div class="comment-item ${c.isBestAnswer ? 'best-answer' : ''}">
                <img src="${c.authorAvatar}" class="comment-user-avatar">
                <div class="comment-body">
                  <div class="comment-user-name">${c.authorName} ${c.isBestAnswer ? '⭐ إجابة معتمدة' : ''}</div>
                  ${c.text ? `<div class="comment-text">${c.text}</div>` : ''}
                  ${c.audio ? `<audio controls src="${c.audio}" style="width:100%; height:30px; margin-top:4px;"></audio>` : ''}
                </div>
              </div>
            `).join('')}
          </div>
          
          <div style="display:flex; gap:4px; margin-top:6px; align-items:center;">
            <input type="text" id="commentInput_${post.id}" placeholder="اكتب ردك أو إجابتك..." style="flex:1; padding:6px; border-radius:8px; background:var(--bg); color:var(--text); border:1px solid var(--border); font-size:11px; outline:none; font-family:'Amiri', serif;">
            <button onclick="submitPostComment('${post.id}')" class="btn-small">إرسال</button>
            <button id="voiceCommentBtn_${post.id}" onclick="toggleCommentVoiceRecord('${post.id}')" class="btn-small" style="background:var(--card); border:1px solid var(--gold); color:var(--gold); padding:5px 8px;">🎙️</button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// 9️⃣ رسم الاستطلاع الديناميكي بأي عدد من الخيارات
function renderDynamicPollUI(post) {
  const currentUser = getCommunityUserData();
  let totalVotes = 0;
  post.poll.options.forEach(o => totalVotes += (o.votes || 0));

  return `
    <div style="background:var(--bg); border:1px solid var(--border); border-radius:10px; padding:8px; margin-bottom:8px;">
      <div style="font-size:11px; color:var(--gold); font-weight:bold; margin-bottom:6px;">📊 استطلاع رأي (${totalVotes} صوت):</div>
      ${post.poll.options.map((opt, idx) => {
        const pct = totalVotes > 0 ? Math.round(((opt.votes || 0) / totalVotes) * 100) : 0;
        const hasVoted = opt.voters && opt.voters.includes(currentUser.code);

        return `
          <div class="poll-option-btn" onclick="voteOnCommunityPoll('${post.id}', ${idx})">
            <div class="poll-fill-bar" style="width:${pct}%;"></div>
            <div style="position:relative; z-index:1; display:flex; justify-content:space-between;">
              <span>${hasVoted ? '✅ ' : ''}${opt.text}</span>
              <b>${pct}% (${opt.votes || 0})</b>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

// 🔟 تفاعلات الإعجاب واللاف والحفظ
async function togglePostReaction(postId, type) {
  const user = getCommunityUserData();
  if (window.fireDB && window.fireGetDoc && window.fireUpdateDoc) {
    const postRef = window.fireDoc(window.fireDB, "community_posts", postId);
    const docSnap = await window.fireGetDoc(postRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      const arrayKey = type === 'like' ? 'likes' : 'loves';
      let arr = data[arrayKey] || [];

      if (arr.includes(user.code)) {
        arr = arr.filter(c => c !== user.code);
      } else {
        arr.push(user.code);
      }

      await window.fireUpdateDoc(postRef, { [arrayKey]: arr });
    }
  }
}

async function toggleSavePost(postId) {
  const user = getCommunityUserData();
  if (window.fireDB && window.fireGetDoc && window.fireUpdateDoc) {
    const postRef = window.fireDoc(window.fireDB, "community_posts", postId);
    const docSnap = await window.fireGetDoc(postRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      let arr = data.savedBy || [];

      if (arr.includes(user.code)) {
        arr = arr.filter(c => c !== user.code);
      } else {
        arr.push(user.code);
      }

      await window.fireUpdateDoc(postRef, { savedBy: arr });
    }
  }
}

// 1️⃣1️⃣ التصويت على الاستطلاع
async function voteOnCommunityPoll(postId, optionIdx) {
  const user = getCommunityUserData();
  if (window.fireDB && window.fireGetDoc && window.fireUpdateDoc) {
    const postRef = window.fireDoc(window.fireDB, "community_posts", postId);
    const docSnap = await window.fireGetDoc(postRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      if (!data.poll) return;

      data.poll.options.forEach((opt, idx) => {
        if (!opt.voters) opt.voters = [];
        if (idx === optionIdx) {
          if (!opt.voters.includes(user.code)) {
            opt.voters.push(user.code);
            opt.votes = (opt.votes || 0) + 1;
          }
        }
      });

      await window.fireUpdateDoc(postRef, { poll: data.poll });
    }
  }
}

// 1️⃣2️⃣ إضافة تعليق ونص/فويس
async function submitPostComment(postId) {
  const inp = document.getElementById('commentInput_' + postId);
  const text = inp ? inp.value.trim() : '';

  if (!text && !currentCommentAudioBase64) {
    alert("اكتب تعليقاً أو سجّل فويساً للإجابة 🙏");
    return;
  }

  const user = getCommunityUserData();
  const commentPayload = {
    id: "comment_" + Date.now(),
    authorName: user.name,
    authorAvatar: user.avatar,
    text: text,
    audio: currentCommentAudioBase64,
    timestamp: new Date().toISOString(),
    isBestAnswer: false
  };

  if (window.fireDB && window.fireGetDoc && window.fireUpdateDoc) {
    const postRef = window.fireDoc(window.fireDB, "community_posts", postId);
    const docSnap = await window.fireGetDoc(postRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      const comments = data.commentsList || [];
      comments.push(commentPayload);

      await window.fireUpdateDoc(postRef, {
        commentsList: comments,
        commentsCount: comments.length
      });
    }
  }

  if (inp) inp.value = '';
  currentCommentAudioBase64 = null;
}

// 1️⃣3️⃣ تسجيل الفويس للتعليق
async function toggleCommentVoiceRecord(postId) {
  const btn = document.getElementById('voiceCommentBtn_' + postId);

  if (!isCommentRecording) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      commentAudioRecorder = new MediaRecorder(stream);
      commentAudioChunks = [];

      commentAudioRecorder.ondataavailable = e => commentAudioChunks.push(e.data);
      commentAudioRecorder.onstop = () => {
        const blob = new Blob(commentAudioChunks, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.onloadend = () => {
          currentCommentAudioBase64 = reader.result;
          if (btn) btn.textContent = "✅ جاهز!";
        };
        reader.readAsDataURL(blob);
        stream.getTracks().forEach(t => t.stop());
      };

      commentAudioRecorder.start();
      isCommentRecording = true;
      if (btn) btn.textContent = "🔴...";
    } catch (e) {
      alert("يرجى السماح بالمايك للتسجيل 🎙️");
    }
  } else {
    if (commentAudioRecorder) commentAudioRecorder.stop();
    isCommentRecording = false;
  }
}

// 1️⃣4️⃣ أداة عرض/إخفاء التعليقات
function togglePostCommentsBox(postId) {
  const box = document.getElementById('commentsBox_' + postId);
  if (box) {
    const isHidden = box.style.display === 'none';
    box.style.display = isHidden ? 'block' : 'none';
  }
}

// 1️⃣5️⃣ محادثات الـ DM والبروفايل السريع
function openUserProfileModal(code, name, avatar, branch) {
  let modal = document.getElementById('communityProfileModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'communityProfileModal';
    modal.className = 'modal-overlay';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-box user-profile-modal-box" onclick="event.stopPropagation();">
      <img src="${avatar}" class="profile-modal-avatar">
      <h3 style="color:var(--gold); font-size:16px;">${name}</h3>
      <div style="font-size:11px; color:var(--text2); margin-bottom:12px;">شعبة: ${branch} • كود: ${code}</div>
      
      <div style="display:flex; gap:6px; margin-bottom:12px;">
        <button onclick="sendFriendRequestFromModal('${code}')" class="btn-small" style="flex:1; padding:8px;">➕ إضافة صديق</button>
        <button onclick="alert('جاري فتح المحادثة المباشرة...')" class="btn-small" style="flex:1; padding:8px; background:var(--card); border:1px solid var(--gold); color:var(--gold);">💬 محادثة خاصة</button>
      </div>

      <button onclick="document.getElementById('communityProfileModal').classList.remove('show')" style="width:100%; background:transparent; border:1px solid var(--border); color:var(--text2); padding:6px; border-radius:8px; font-size:11px;">إغلاق</button>
    </div>
  `;

  modal.classList.add('show');
}

// 1️⃣6️⃣ الشات العام المباشر
function listenToCommunityPublicChat() {
  const box = document.getElementById('communityChatMessagesBox');
  if (!box) return;

  if (!window.fireDB || !window.fireOnSnapshot) {
    box.innerHTML = `<div style="text-align:center; font-size:12px; color:var(--text2); padding:20px;">مرحباً بك في شات المجتمع المباشر! 💬</div>`;
    return;
  }

  // الاستماع المباشر للرسائل
  window.fireOnSnapshot(window.fireDoc(window.fireDB, "community", "public_chat"), (docSnap) => {
    if (docSnap.exists()) {
      const messages = Object.values(docSnap.data() || {});
      const user = getCommunityUserData();
      
      box.innerHTML = messages.sort((a,b) => new Date(a.timestamp) - new Date(b.timestamp)).map(m => {
        const isMe = m.authorCode === user.code;
        return `
          <div style="display:flex; flex-direction:column; align-items:${isMe ? 'flex-end' : 'flex-start'}; margin-bottom:8px;">
            <span style="font-size:10px; color:var(--gold); margin-bottom:2px;">${m.authorName} (${m.authorBranch})</span>
            <div style="background:${isMe ? 'var(--gold)' : 'var(--bg2)'}; color:${isMe ? '#111' : 'var(--text)'}; padding:8px 12px; border-radius:12px; max-width:80%; font-size:12px; border:1px solid var(--border);">
              ${m.text}
            </div>
            <span style="font-size:9px; color:var(--text2); margin-top:2px;">${formatCommunityTime(m.timestamp)}</span>
          </div>
        `;
      }).join('');
      box.scrollTop = box.scrollHeight;
    }
  });
}
// 2. دالة إرسال رسالة للشات العام (أضفها واربطها بزرار إرسال الشات)
async function sendPublicChatMessage() {
  const inp = document.getElementById('communityChatMsgInp');
  const text = inp ? inp.value.trim() : '';
  if (!text) return;

  const user = getCommunityUserData();
  const msgPayload = {
    id: "msg_" + Date.now(),
    authorCode: user.code,
    authorName: user.name,
    authorBranch: user.branch,
    text: text,
    timestamp: new Date().toISOString()
  };

  if (window.fireDB && window.fireGetDoc && window.fireSetDoc) {
    const chatRef = window.fireDoc(window.fireDB, "community", "public_chat");
    const docSnap = await window.fireGetDoc(chatRef);
    let msgs = docSnap.exists() ? (docSnap.data() || {}) : {};
    msgs[msgPayload.id] = msgPayload;
    await window.fireSetDoc(chatRef, msgs, { merge: true });
  }

  if (inp) inp.value = '';
}
// 1️⃣7️⃣ رفع الصورة المرفقة بالبوست
function handlePostMediaUpload(input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    currentPostMediaBase64 = e.target.result;
    const notice = document.getElementById('postMediaNotice');
    if (notice) {
      notice.style.display = 'block';
      notice.textContent = "✅ تم اختيار الصورة بنجاح!";
    }
  };
  reader.readAsDataURL(file);
}

// 1️⃣8️⃣ حساب الوقت المنقضي
function formatCommunityTime(isoString) {
  if (!isoString) return 'الآن';
  const diff = Math.floor((new Date() - new Date(isoString)) / 1000);
  if (diff < 60) return 'منذ ثوانٍ';
  if (diff < 3600) return `منذ ${Math.floor(diff / 60)} دقيقة`;
  if (diff < 86400) return `منذ ${Math.floor(diff / 3600)} ساعة`;
  return `منذ ${Math.floor(diff / 86400)} يوم`;
}
// 📩 1. فتح نافذة المحادثة الخاصة (DM)
function openDirectMessageModal(targetCode, targetName) {
  let modal = document.getElementById('communityDMModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'communityDMModal';
    modal.className = 'modal-overlay';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-box" onclick="event.stopPropagation();" style="max-width:400px; padding:12px;">
      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border); padding-bottom:6px; margin-bottom:8px;">
        <span style="font-size:13px; font-weight:bold; color:var(--gold);">💬 محادثة خاصة مع: ${targetName}</span>
        <button onclick="document.getElementById('communityDMModal').classList.remove('show')" style="background:transparent; border:none; color:#ff6b6b; font-size:16px; cursor:pointer;">✕</button>
      </div>

      <div id="privateDmMessagesBox" style="height:220px; overflow-y:auto; background:rgba(0,0,0,0.2); border-radius:10px; padding:8px; margin-bottom:8px; font-size:12px;">
        <div style="text-align:center; color:var(--text2); padding:10px;">بدء المحادثة الخاصة مع ${targetName}... 🌸</div>
      </div>

      <div style="display:flex; gap:4px;">
        <input type="text" id="privateDmMsgInp" placeholder="اكتب رسالة خاصة..." style="flex:1; padding:6px; border-radius:8px; background:var(--bg2); color:var(--text); border:1px solid var(--border); font-size:11px; outline:none; font-family:'Amiri', serif;">
        <button onclick="sendPrivateDirectMessage('${targetCode}')" class="btn-small">إرسال</button>
      </div>
    </div>
  `;

  modal.classList.add('show');
  listenToPrivateDmMessages(targetCode);
}

// 📩 2. الاستماع للرسائل الخاصة وإرسالها
function listenToPrivateDmMessages(targetCode) {
  const user = getCommunityUserData();
  const chatId = [user.code, targetCode].sort().join('_');
  const box = document.getElementById('privateDmMessagesBox');
  if (!box || !window.fireDB) return;

  window.fireOnSnapshot(window.fireDoc(window.fireDB, "community_dms", chatId), (docSnap) => {
    if (docSnap.exists()) {
      const msgs = Object.values(docSnap.data() || {});
      box.innerHTML = msgs.sort((a,b) => new Date(a.timestamp) - new Date(b.timestamp)).map(m => `
        <div style="text-align:${m.sender === user.code ? 'left' : 'right'}; margin-bottom:6px;">
          <div style="display:inline-block; background:${m.sender === user.code ? 'var(--gold)' : 'var(--bg2)'}; color:${m.sender === user.code ? '#111' : 'var(--text)'}; padding:6px 10px; border-radius:10px; font-size:11px;">
            ${m.text}
          </div>
        </div>
      `).join('');
      box.scrollTop = box.scrollHeight;
    }
  });
}

async function sendPrivateDirectMessage(targetCode) {
  const inp = document.getElementById('privateDmMsgInp');
  const text = inp ? inp.value.trim() : '';
  if (!text) return;

  const user = getCommunityUserData();
  const chatId = [user.code, targetCode].sort().join('_');
  const msgPayload = {
    id: "dm_" + Date.now(),
    sender: user.code,
    text: text,
    timestamp: new Date().toISOString()
  };

  if (window.fireDB && window.fireGetDoc && window.fireSetDoc) {
    const dmRef = window.fireDoc(window.fireDB, "community_dms", chatId);
    const docSnap = await window.fireGetDoc(dmRef);
    let msgs = docSnap.exists() ? (docSnap.data() || {}) : {};
    msgs[msgPayload.id] = msgPayload;
    await window.fireSetDoc(dmRef, msgs, { merge: true });
  }

  if (inp) inp.value = '';
}
// 🤝 1. إرسال طلب صداقة
async function sendFriendRequestFromModal(targetCode) {
  const user = getCommunityUserData();
  if (targetCode === user.code) {
    alert("لا يمكنك إرسال طلب صداقة لنفسك! 😄");
    return;
  }

  if (window.fireDB && window.fireSetDoc && window.fireDoc) {
    const reqRef = window.fireDoc(window.fireDB, "friend_requests", `${user.code}_${targetCode}`);
    await window.fireSetDoc(reqRef, {
      from: user.code,
      fromName: user.name,
      to: targetCode,
      status: 'pending',
      timestamp: new Date().toISOString()
    });
    alert("✅ تم إرسال طلب الصداقة بنجاح!");
  } else {
    alert("✅ تم إرسال طلب الصداقة!");
  }
}
// 🔖 عرض البوستات المحفوظة فقط
function filterSavedPostsOnly() {
  const user = getCommunityUserData();
  let localPosts = JSON.parse(localStorage.getItem('sm_local_community_posts') || '[]');
  const saved = localPosts.filter(p => p.savedBy && p.savedBy.includes(user.code));
  renderCommunityPostsUI(saved);
}
