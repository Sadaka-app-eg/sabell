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
// 🔐 التحقق من أن المستخدم مسجل دخول بجوجل

// 🔒 فتح صفحة المجتمع بأمان (حظر الزوار من الرؤية كلياً)
function openCommunityPageSecure(el) {
  if (!checkUserIsLoggedIn()) {
    return; // يوقف الفتح ويطلع الـ alert ورسالة الدخول فوراً
  }
  
  // لو مسجل دخول يفتح الصفحة عادي
  if (window.showPage) {
    window.showPage('communityPage', el);
  }
  listenToCommunityPosts();
}


function checkUserIsLoggedIn() {
  const code = localStorage.getItem('sm_student_code') || (window.getMyStudentCode ? window.getMyStudentCode() : 'SM-GUEST');
  if (!code || code === 'SM-GUEST' || code.includes('GUEST')) {
    alert("🔒 عفواً يا بطل! يجب تسجيل الدخول بجوجل أولاً لتتمكن من النشر والتفاعل في المجتمع.");
    if (window.loginWithGoogle) window.loginWithGoogle();
    return false;
  }
  return true;
}
// 1️⃣ جلب بيانات الطالب الحالي
function getCommunityUserData() {
  const code = window.getMyStudentCode ? window.getMyStudentCode() : (localStorage.getItem('sm_student_code') || 'SM-GUEST');
  const name = window.getMyStudentName ? window.getMyStudentName() : (localStorage.getItem('sm_user_name') || 'طالب متميز');
  const avatar = localStorage.getItem('sm_user_custom_avatar') || 'https://via.placeholder.com/40';
  const branch = localStorage.getItem('sm_user_branch') || 'عام';
  return { code, name, avatar, branch };
}

function switchCommunityMainView(viewType) {
  currentCommunityView = viewType;
  const postsView = document.getElementById('communityPostsSection');
  const chatView = document.getElementById('communityChatSection');
  const createPostCard = document.querySelector('.create-post-card');
  const categoryFilterBox = document.querySelector('#communityPostsSection > div:first-child');

  document.querySelectorAll('#communityPage .day-btn').forEach(b => b.classList.remove('active'));

  if (viewType === 'chat') {
    if (postsView) postsView.style.display = 'none';
    if (chatView) chatView.style.display = 'block';
    const btn = document.getElementById('mainViewChatBtn');
    if (btn) btn.classList.add('active');
    listenToCommunityPublicChat();
  } else {
    if (postsView) postsView.style.display = 'block';
    if (chatView) chatView.style.display = 'none';

    if (viewType === 'saved') {
      const btn = document.getElementById('mainViewSavedBtn');
      if (btn) btn.classList.add('active');
      if (createPostCard) createPostCard.style.display = 'none';
      if (categoryFilterBox) categoryFilterBox.style.display = 'none';
      filterSavedPostsOnly();
    } 
    else if (viewType === 'unanswered') {
      const btn = document.getElementById('mainViewUnansweredBtn');
      if (btn) btn.classList.add('active');
      if (createPostCard) createPostCard.style.display = 'none';
      if (categoryFilterBox) categoryFilterBox.style.display = 'none';
      filterUnansweredPostsOnly();
    } 
else if (viewType === 'dms') {
  const btn = document.getElementById('mainViewDmsBtn');
  if (btn) btn.classList.add('active');
  if (createPostCard) createPostCard.style.display = 'none';
  if (categoryFilterBox) categoryFilterBox.style.display = 'none';
  renderMyPrivateDmsOnlyUI(); // استدعاء العرض الخاص للـ DMs فقط
}
        else if (viewType === 'friends') {
  const btn = document.getElementById('mainViewFriendsBtn');
  if (btn) btn.classList.add('active');
  if (createPostCard) createPostCard.style.display = 'none';
  if (categoryFilterBox) categoryFilterBox.style.display = 'none';
  renderSeparateFriendsSectionUI(); // عرض تبويب الأصدقاء المنفصل
}
    else {
      const btn = document.getElementById('mainViewPostsBtn');
      if (btn) btn.classList.add('active');
      if (createPostCard) createPostCard.style.display = 'block';
      if (categoryFilterBox) categoryFilterBox.style.display = 'flex';
      listenToCommunityPosts();
    }
    
  }
}

// 🔖 عرض الأسئلة المحفوظة فقط
function filterSavedPostsOnly() {
  const user = getCommunityUserData();
  let localPosts = JSON.parse(localStorage.getItem('sm_local_community_posts') || '[]');
  const saved = localPosts.filter(p => p.savedBy && p.savedBy.includes(user.code));

  const container = document.getElementById('communityPostsFeed');
  if (!container) return;

  if (saved.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:40px 20px; color:var(--text2); font-size:13px;">
        <div style="font-size:35px; margin-bottom:8px;">📌</div>
        لم تقم بحفظ أي أسئلة لليلة الامتحان بعد!<br>
        <small style="font-size:11px; color:var(--gold);">اضغط على علامة الدبوس 📌 فوق أي بوست ليتحفظ هنا.</small>
      </div>`;
  } else {
    renderCommunityPostsUI(saved);
  }
}

// 🎯 عرض الأسئلة بدون إجابات
function filterUnansweredPostsOnly() {
  let localPosts = JSON.parse(localStorage.getItem('sm_local_community_posts') || '[]');
  const unanswered = localPosts.filter(p => !p.commentsCount || p.commentsCount === 0 || !p.commentsList || p.commentsList.length === 0);

  const container = document.getElementById('communityPostsFeed');
  if (!container) return;

  if (unanswered.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:40px 20px; color:var(--text2); font-size:13px;">
        <div style="font-size:35px; margin-bottom:8px;">🎯</div>
        لا توجد أسئلة معلقة بدون إجابات حالياً! 🚀
      </div>`;
  } else {
    renderCommunityPostsUI(unanswered);
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
// 6️⃣ نشر بوست جديد وحفظه محلياً وسحابياً فوراً
async function createNewCommunityPost() {
  if (!checkUserIsLoggedIn()) return; // 🔒 منع غير المسجلين من النشر
  const textInp = document.getElementById('communityPostTextInput');
  const isAnonCheck = document.getElementById('communityPostAnonCheck');
  const pollBox = document.getElementById('pollCreatorBox');
  const pollContainer = document.getElementById('pollOptionsContainer');

  const text = textInp ? textInp.value.trim() : '';
  const isAnonymous = isAnonCheck ? isAnonCheck.checked : false;

  let pollData = null;
  if (pollBox && pollBox.style.display !== 'none' && pollContainer) {
    const optInputs = pollContainer.querySelectorAll('.poll-opt-inp');
    let opts = [];
    optInputs.forEach(inp => {
      if (inp.value.trim()) {
        opts.push({ text: inp.value.trim(), votes: 0, voters: [] });
      }
    });
    if (opts.length >= 2) pollData = { options: opts };
  }

  if (!text && !currentPostMediaBase64 && !pollData) {
    alert("من فضلك اكتب سؤالاً، ارفع صورة، أو أنشئ استطلاعاً! 🙏");
    return;
  }

  const user = getCommunityUserData();
  const postId = "post_" + Date.now();
  const postPayload = {
    id: postId,
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

  // 1. التحديث المحلي الفوري عشان ما يختفيش إطلاقاً
  let localPosts = JSON.parse(localStorage.getItem('sm_local_community_posts') || '[]');
  localPosts.unshift(postPayload);
  localStorage.setItem('sm_local_community_posts', JSON.stringify(localPosts));
  renderCommunityPostsUI(localPosts);

  // تصفيرة المدخلات
  if (textInp) textInp.value = '';
  currentPostMediaBase64 = null;
  if (pollBox) pollBox.style.display = 'none';
  const notice = document.getElementById('postMediaNotice');
  if (notice) notice.style.display = 'none';
  if (isAnonCheck) isAnonCheck.checked = false;

  // 2. الرفع المباشر للفايربيس عشان يسمّع عند باقي الموبايلات
  if (window.fireDB && window.fireSetDoc && window.fireDoc) {
    try {
      await window.fireSetDoc(window.fireDoc(window.fireDB, "community_posts", postId), postPayload);
    } catch (e) {
      console.log("تم الحفظ محلياً بانتظار مزامنة السحاب.");
    }
  }
}

// 4️⃣ الاستماع الحي المظبوط (يحدّث فقط إذا كان المستخدم واقفاً في تبويب المنشورات)
function listenToCommunityPosts() {
  let localPosts = JSON.parse(localStorage.getItem('sm_local_community_posts') || '[]');
  
  // 1️⃣ تحديث العرض محلياً فقط لو المستخدم واقف في تبويب المنشورات الرئيسي
  if (localPosts.length > 0 && currentCommunityView === 'posts') {
    renderCommunityPostsUI(localPosts);
  }

  if (!window.fireDB || !window.fireOnSnapshot || !window.fireCollection) return;

  try {
    const postsColl = window.fireCollection(window.fireDB, "community_posts");
    window.fireOnSnapshot(postsColl, (querySnap) => {
      let cloudPosts = [];
      querySnap.forEach(docSnap => {
        cloudPosts.push(docSnap.data());
      });

      if (cloudPosts.length > 0) {
        // تحديث الذاكرة المحلية دائماً بالبيانات الجديدة
        localStorage.setItem('sm_local_community_posts', JSON.stringify(cloudPosts));
        
        // 🚨 الشرط الذهبي: لا تقم بإعادة رسم واجهة البوستات إطلاقاً إلا لو كان الطالب واقف عند "منشورات وأسئلة الطلاب"!
        if (currentCommunityView === 'posts') {
          renderCommunityPostsUI(cloudPosts);
        }
      }
    });
  } catch(e) {
    console.error(e);
  }
}

// 5️⃣ رسم البوستات في الصفحة بشكل متكامل
function renderCommunityPostsUI(postsList) {
  const container = document.getElementById('communityPostsFeed');
  if (!container) return;

  const filtered = currentCommunityTab === 'عام'
    ? postsList
    : postsList.filter(p => p.category === currentCommunityTab);

  if (!filtered || filtered.length === 0) {
    container.innerHTML = `<div style="text-align:center; padding:30px; color:var(--text2); font-size:12px;">لا توجد مشاركات في قسم (${currentCommunityTab}) بعد. كن أول من ينشر! 🚀</div>`;
    return;
  }

  const currentUser = getCommunityUserData();

  container.innerHTML = filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).map(post => {
    const isLiked = post.likes && post.likes.includes(currentUser.code);
    const isSaved = post.savedBy && post.savedBy.includes(currentUser.code);
const isMyPost = (post.authorCode === currentUser.code) || (post.authorName === currentUser.name);
    return `
      <div class="post-card ${post.pinned ? 'pinned-post' : ''}">
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

          <div style="display:flex; gap:6px; align-items:center;">
            <button onclick="toggleSavePost('${post.id}')" style="background:transparent; border:none; color:${isSaved ? 'var(--gold)' : 'var(--text2)'}; font-size:15px; cursor:pointer;" title="حفظ البوست">
              ${isSaved ? '🔖' : '📌'}
            </button>
            <button onclick="shareSinglePost('${post.id}')" style="background:transparent; border:none; color:var(--gold); font-size:14px; cursor:pointer;" title="مشاركة البوست">🚀</button>
            ${isMyPost ? `<button onclick="deleteCommunityPost('${post.id}')" style="background:transparent; border:none; color:#ff6b6b; font-size:14px; cursor:pointer;" title="حذف البوست">🗑️</button>` : ''}
          </div>
        </div>

        ${post.text ? `<div class="post-content-text">${post.text}</div>` : ''}
        ${post.image ? `<img src="${post.image}" class="post-media-img" onclick="openImageViewer(this.src)" title="اضغط للتكبير 🔍">` : ''}
        
        ${post.poll ? renderDynamicPollUI(post) : ''}

        <!-- شريط التفاعلات المنقح -->
        <div class="post-reactions-bar" style="position:relative;">
          <button onclick="togglePostReaction('${post.id}', 'like')" oncontextmenu="event.preventDefault(); toggleReactionsPopover('${post.id}')" class="reaction-btn ${isLiked ? 'active-like' : ''}">
            ${isLiked ? '👍 مفيد' : '👍 إعجاب'} (${(post.likes || []).length})
          </button>

          <!-- قائمة التفاعلات المنسدلة عند الضغط المطول -->
          <div id="reactionsPop_${post.id}" class="reactions-popover">
            <button class="reaction-emoji-btn" onclick="togglePostReaction('${post.id}', 'like')">👍</button>
            <button class="reaction-emoji-btn" onclick="togglePostReaction('${post.id}', 'love')">❤️</button>
            <button class="reaction-emoji-btn" onclick="togglePostReaction('${post.id}', 'idea')">💡</button>
            <button class="reaction-emoji-btn" onclick="togglePostReaction('${post.id}', 'clap')">👏</button>
          </div>

          <button onclick="togglePostCommentsBox('${post.id}')" class="reaction-btn">
            💬 التعليقات (${post.commentsCount || (post.commentsList ? post.commentsList.length : 0)})
          </button>
        </div>

        <!-- صندوق التعليقات المطوي -->
        <div id="commentsBox_${post.id}" class="comments-section" style="display:none;">
          <div id="commentsList_${post.id}">
            ${(post.commentsList || []).map(c => `
              <div class="comment-item ${c.isBestAnswer ? 'best-answer' : ''}">
                <img src="${c.authorAvatar}" class="comment-user-avatar">
                <div class="comment-body">
                  <div class="comment-user-name">${c.authorName} ${c.isBestAnswer ? '⭐ إجابة معتمدة' : ''}</div>
                  ${c.text ? `<div class="comment-text">${c.text}</div>` : ''}
                  ${c.image ? `<img src="${c.image}" onclick="openImageViewer(this.src)" style="max-height:120px; border-radius:8px; margin-top:4px; cursor:pointer;">` : ''}
                  ${c.audio ? `<audio controls src="${c.audio}" style="width:100%; height:30px; margin-top:4px;"></audio>` : ''}
                </div>
              </div>
            `).join('')}
          </div>
          
          <!-- مدخلات التعليق النصي والمايك والصورة -->
          <div style="display:flex; gap:4px; margin-top:6px; align-items:center;">
            <input type="text" id="commentInput_${post.id}" placeholder="اكتب ردك أو إجابتك..." style="flex:1; padding:6px; border-radius:8px; background:var(--bg); color:var(--text); border:1px solid var(--border); font-size:11px; outline:none; font-family:'Amiri', serif;">
            <button onclick="submitPostComment('${post.id}')" class="btn-small">إرسال</button>
            <button onclick="document.getElementById('commentImgInp_${post.id}').click()" class="btn-small" style="background:var(--card); border:1px solid var(--border); color:var(--text); padding:5px 7px;" title="إرفاق صورة">📷</button>
            <button id="voiceCommentBtn_${post.id}" onclick="toggleCommentVoiceRecord('${post.id}')" class="btn-small" style="background:var(--card); border:1px solid var(--gold); color:var(--gold); padding:5px 7px;" title="تسجيل فويس">🎙️</button>
            <input type="file" id="commentImgInp_${post.id}" accept="image/*" style="display:none;" onchange="handleCommentImageUpload('${post.id}', this)">
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

async function togglePostReaction(postId, type) {
  if (!checkUserIsLoggedIn()) return;
  const user = getCommunityUserData();
  let localPosts = JSON.parse(localStorage.getItem('sm_local_community_posts') || '[]');
  const postIdx = localPosts.findIndex(p => p.id === postId);

  if (postIdx > -1) {
    const arrayKey = type === 'like' ? 'likes' : 'loves';
    if (!Array.isArray(localPosts[postIdx][arrayKey])) {
      localPosts[postIdx][arrayKey] = [];
    }

    let arr = localPosts[postIdx][arrayKey];
    const userIndex = arr.indexOf(user.code);

    if (userIndex > -1) {
      arr.splice(userIndex, 1);
    } else {
      arr.push(user.code);
    }

    localStorage.setItem('sm_local_community_posts', JSON.stringify(localPosts));
    renderCommunityPostsUI(localPosts);

    if (window.fireDB && window.fireUpdateDoc && window.fireDoc) {
      try {
        const postRef = window.fireDoc(window.fireDB, "community_posts", postId);
        await window.fireUpdateDoc(postRef, {
          [arrayKey]: arr
        });
      } catch(e) {}
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
<img src="${avatar}" class="profile-modal-avatar" onclick="openImageViewer(this.src)" style="cursor:pointer;" title="اضغط لتكبير الصورة 🔍">      
      <h3 style="color:var(--gold); font-size:16px;">${name}</h3>
<div style="font-size:11px; color:var(--text2); margin-bottom:12px;">الشعبة: ${branch}</div>      
      <div style="display:flex; gap:6px; margin-bottom:12px;">
        <button onclick="sendFriendRequestFromModal('${code}')" class="btn-small" style="flex:1; padding:8px;">➕ إضافة صديق</button>
<button onclick="document.getElementById('communityProfileModal').classList.remove('show'); openDirectMessageModal('${code}', '${name}');" class="btn-small" style="flex:1; padding:8px; background:var(--card); border:1px solid var(--gold); color:var(--gold);">💬 محادثة خاصة</button>
        
      </div>

      <button onclick="document.getElementById('communityProfileModal').classList.remove('show')" style="width:100%; background:transparent; border:1px solid var(--border); color:var(--text2); padding:6px; border-radius:8px; font-size:11px;">إغلاق</button>
    </div>
  `;

  modal.classList.add('show');
}

// 💬 1. الاستماع الحي للشات العام + التفاعل بالقلب وإظهار الصور والفويسات
function listenToCommunityPublicChat() {
  const box = document.getElementById('communityChatMessagesBox');
  if (!box) return;

  if (!window.fireDB || !window.fireOnSnapshot) {
    box.innerHTML = `<div style="text-align:center; font-size:12px; color:var(--text2); padding:20px;">مرحباً بك في شات المجتمع المباشر! 💬</div>`;
    return;
  }

  window.fireOnSnapshot(window.fireDoc(window.fireDB, "community", "public_chat"), (docSnap) => {
    if (docSnap.exists()) {
      const messages = Object.values(docSnap.data() || {});
      const user = getCommunityUserData();
      
      box.innerHTML = messages.sort((a,b) => new Date(a.timestamp) - new Date(b.timestamp)).map(m => {
        const isMe = m.authorCode === user.code;
        const lovesCount = (m.loves || []).length;
        const hasLoved = m.loves && m.loves.includes(user.code);

        return `
          <div style="display:flex; flex-direction:column; align-items:${isMe ? 'flex-end' : 'flex-start'}; margin-bottom:10px;">
            <span style="font-size:10px; color:var(--gold); margin-bottom:2px;">${m.authorName} (${m.authorBranch})</span>
            <div style="background:${isMe ? 'var(--gold)' : 'var(--bg2)'}; color:${isMe ? '#111' : 'var(--text)'}; padding:8px 12px; border-radius:12px; max-width:80%; font-size:12px; border:1px solid var(--border); position:relative;">
              ${m.text ? `<div>${m.text}</div>` : ''}
              ${m.image ? `<img src="${m.image}" onclick="openImageViewer(this.src)" style="max-width:180px; max-height:160px; border-radius:8px; margin-top:4px; cursor:pointer;">` : ''}
              ${m.audio ? `<audio controls src="${m.audio}" style="width:100%; height:32px; margin-top:4px;"></audio>` : ''}

              <!-- ❤️ زرار التفاعل بالقلب على الرسالة -->
              <button onclick="togglePublicChatMessageLove('${m.id}')" style="position:absolute; bottom:-8px; ${isMe ? 'left:-8px' : 'right:-8px'}; background:var(--bg2); border:1px solid var(--gold); border-radius:12px; padding:1px 6px; font-size:10px; cursor:pointer; color:var(--text);">
                ${hasLoved ? '❤️' : '🤍'} ${lovesCount > 0 ? lovesCount : ''}
              </button>
            </div>
            <span style="font-size:9px; color:var(--text2); margin-top:4px;">${formatCommunityTime(m.timestamp)}</span>
          </div>
        `;
      }).join('');
      box.scrollTop = box.scrollHeight;
    }
  });
}

// 📩 2. إرسال النص/الصورة/الفويس للشات العام مع حماية تسجيل الدخول
let publicChatImageBase64 = null;
let publicChatAudioBase64 = null;
let publicChatAudioRecorder = null;
let publicChatAudioChunks = [];
let isPublicChatRecording = false;

async function sendPublicChatMessage() {
  if (!checkUserIsLoggedIn()) return; // 🔒 منع الزوار

  const inp = document.getElementById('communityChatMsgInp');
  const text = inp ? inp.value.trim() : '';
  
  if (!text && !publicChatImageBase64 && !publicChatAudioBase64) return;

  const user = getCommunityUserData();
  const msgPayload = {
    id: "msg_" + Date.now(),
    authorCode: user.code,
    authorName: user.name,
    authorBranch: user.branch,
    text: text,
    image: publicChatImageBase64,
    audio: publicChatAudioBase64,
    loves: [],
    timestamp: new Date().toISOString()
  };

  if (window.fireDB && window.fireGetDoc && window.fireSetDoc) {
    const chatRef = window.fireDoc(window.fireDB, "community", "public_chat");
    const docSnap = await window.fireGetDoc(chatRef);
    let msgs = docSnap.exists() ? (docSnap.data() || {}) : {};
    msgs[msgPayload.id] = msgPayload;
    await window.fireSetDoc(chatRef, msgs, { merge: true });
  }

  // تصفيرة
  if (inp) inp.value = '';
  publicChatImageBase64 = null;
  publicChatAudioBase64 = null;
  const btn = document.getElementById('publicChatVoiceBtn');
  if (btn) btn.textContent = '🎙️';
}

// 📷 3. رفع صورة بالشات العام
function handlePublicChatImageSend(input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    publicChatImageBase64 = e.target.result;
    sendPublicChatMessage(); // إرسال فور اختيار الصورة
  };
  reader.readAsDataURL(file);
}

// 🎙️ 4. تسجيل فويس للشات العام
async function togglePublicChatVoiceRecord() {
  if (!checkUserIsLoggedIn()) return;
  const btn = document.getElementById('publicChatVoiceBtn');

  if (!isPublicChatRecording) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      publicChatAudioRecorder = new MediaRecorder(stream);
      publicChatAudioChunks = [];

      publicChatAudioRecorder.ondataavailable = e => publicChatAudioChunks.push(e.data);
      publicChatAudioRecorder.onstop = () => {
        const blob = new Blob(publicChatAudioChunks, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.onloadend = () => {
          publicChatAudioBase64 = reader.result;
          sendPublicChatMessage(); // إرسال الفويس فوراً عند الانتهاء
        };
        reader.readAsDataURL(blob);
        stream.getTracks().forEach(t => t.stop());
      };

      publicChatAudioRecorder.start();
      isPublicChatRecording = true;
      if (btn) btn.textContent = "🔴...";
    } catch (e) {
      alert("يرجى السماح بالمايك للتسجيل 🎙️");
    }
  } else {
    if (publicChatAudioRecorder) publicChatAudioRecorder.stop();
    isPublicChatRecording = false;
  }
}

// ❤️ 5. التفاعل بالقلب على أي رسالة شات عام
async function togglePublicChatMessageLove(msgId) {
  if (!checkUserIsLoggedIn()) return;
  const user = getCommunityUserData();

  if (window.fireDB && window.fireGetDoc && window.fireSetDoc) {
    const chatRef = window.fireDoc(window.fireDB, "community", "public_chat");
    const docSnap = await window.fireGetDoc(chatRef);
    if (docSnap.exists()) {
      let msgs = docSnap.data() || {};
      if (msgs[msgId]) {
        let loves = msgs[msgId].loves || [];
        if (loves.includes(user.code)) {
          loves = loves.filter(c => c !== user.code);
        } else {
          loves.push(user.code);
        }
        msgs[msgId].loves = loves;
        await window.fireSetDoc(chatRef, msgs, { merge: true });
      }
    }
  }
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
// 💬 نافذة المحادثة الخاصة المطابقة لتصميم أثر
function openDirectMessageModal(targetCode, targetName) {
  if (!checkUserIsLoggedIn()) return;

  let modal = document.getElementById('communityDMModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'communityDMModal';
    modal.className = 'modal-overlay';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-box" onclick="event.stopPropagation();" style="width:95vw; max-width:900px; height:85vh; padding:16px; display:flex; flex-direction:column; justify-content:space-between; background:var(--bg); border:1px solid var(--border); border-radius:18px;">
      
      <!-- الهيدر العلوي -->
      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border); padding-bottom:10px; margin-bottom:10px;">
        <span style="font-size:14px; font-weight:bold; color:var(--gold);">💬 المحادثة الخاصة مع: <b style="color:var(--text);">${targetName}</b></span>
        <button onclick="document.getElementById('communityDMModal').classList.remove('show')" style="background:transparent; border:none; color:var(--gold); font-size:12px; cursor:pointer; text-decoration:underline;">رجوع للصندوق</button>
      </div>

      <!-- منطقة عرض الرسائل -->
      <div id="privateDmMessagesBox" style="flex:1; overflow-y:auto; padding:12px; display:flex; flex-direction:column; gap:10px; background:rgba(0,0,0,0.2); border-radius:12px; margin-bottom:10px;">
        <div style="text-align:center; color:var(--text2); font-size:12px;">جاري تحميل المحادثة... ☕</div>
      </div>

      <!-- شريط الإدخال المطور مع أزرار الميديا -->
      <div style="display:flex; gap:8px; align-items:center; background:var(--bg2); border:1px solid var(--border); border-radius:30px; padding:6px 12px;">
        <button onclick="sendPrivateDirectMessage('${targetCode}', '${targetName}')" style="background:var(--gold); border:none; width:34px; height:34px; border-radius:50%; display:flex; align-items:center; justify-content:center; cursor:pointer; font-size:16px; flex-shrink:0;">🕊️</button>
        
        <input type="text" id="privateDmMsgInp" placeholder="اكتب رسالة خاصة آمنة..." onkeypress="if(event.key==='Enter') sendPrivateDirectMessage('${targetCode}', '${targetName}')" style="flex:1; background:transparent; border:none; color:var(--text); font-family:'Amiri', serif; font-size:13px; outline:none; padding:0 6px;">

        <div style="display:flex; gap:6px; align-items:center;">
          <button id="dmVoiceBtn" onclick="alert('جاري تجهيز الفويس...')" style="background:transparent; border:none; color:var(--text2); font-size:16px; cursor:pointer;" title="تسجيل صوتي">🎙️</button>
          <button onclick="document.getElementById('dmImgInp').click()" style="background:transparent; border:none; color:var(--text2); font-size:16px; cursor:pointer;" title="إرفاق صورة">🖼️</button>
        </div>
        <input type="file" id="dmImgInp" accept="image/*" style="display:none;" onchange="handleDmImageSend('${targetCode}', '${targetName}', this)">
      </div>

    </div>
  `;

  modal.classList.add('show');
  listenToPrivateDmMessages(targetCode);
}

// 📩 2. الاستماع للرسائل الخاصة وإرسالها
// 📩 رسم الفقاعات المماثلة لتطبيق أثر
function listenToPrivateDmMessages(targetCode) {
  const user = getCommunityUserData();
  const chatId = [user.code, targetCode].sort().join('_');
  const box = document.getElementById('privateDmMessagesBox');
  if (!box || !window.fireDB) return;

  window.fireOnSnapshot(window.fireDoc(window.fireDB, "community_dms", chatId), (docSnap) => {
    if (docSnap.exists()) {
      const msgs = Object.values(docSnap.data() || {});
      box.innerHTML = msgs.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)).map(m => {
        const isMe = m.sender === user.code;
        return `
          <div style="display:flex; flex-direction:column; align-items:${isMe ? 'flex-end' : 'flex-start'};">
            <div style="background:${isMe ? 'rgba(212, 175, 55, 0.15)' : 'var(--bg2)'}; border:1px solid ${isMe ? 'var(--gold)' : 'var(--border)'}; color:var(--text); padding:8px 14px; border-radius:14px; max-width:75%; font-size:13px; line-height:1.5;">
              <div style="font-size:10px; color:var(--gold); margin-bottom:2px; font-weight:bold;">${isMe ? user.name : (m.senderName || 'الصديق')}</div>
              ${m.text ? `<div>${m.text}</div>` : ''}
              ${m.image ? `<img src="${m.image}" onclick="openImageViewer(this.src)" style="max-width:200px; border-radius:8px; margin-top:4px; cursor:pointer;">` : ''}
            </div>
            <span style="font-size:9px; color:var(--text2); margin-top:2px; padding:0 4px;">${formatCommunityTime(m.timestamp)}</span>
          </div>
        `;
      }).join('');
      box.scrollTop = box.scrollHeight;
    }
  });
}

async function sendPrivateDirectMessage(targetCode, targetName) {
  if (!checkUserIsLoggedIn()) return;
  const inp = document.getElementById('privateDmMsgInp');
  const text = inp ? inp.value.trim() : '';
  if (!text) return;

  const user = getCommunityUserData();
  const chatId = [user.code, targetCode].sort().join('_');
  const msgPayload = {
    id: "dm_" + Date.now(),
    sender: user.code,
    senderName: user.name,
    senderAvatar: user.avatar,
    text: text,
    timestamp: new Date().toISOString()
  };

  if (window.fireDB && window.fireGetDoc && window.fireSetDoc) {
    try {
      const dmRef = window.fireDoc(window.fireDB, "community_dms", chatId);
      const docSnap = await window.fireGetDoc(dmRef);
      let msgs = docSnap.exists() ? (docSnap.data() || {}) : {};
      msgs[msgPayload.id] = msgPayload;
      await window.fireSetDoc(dmRef, msgs, { merge: true });
    } catch (e) {}
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
// 🗑️ 1. دالة حذف البوست
async function deleteCommunityPost(postId) {
  if (!confirm("هل أنت متأكد من حذف هذا البوست؟")) return;

  let localPosts = JSON.parse(localStorage.getItem('sm_local_community_posts') || '[]');
  localPosts = localPosts.filter(p => p.id !== postId);
  localStorage.setItem('sm_local_community_posts', JSON.stringify(localPosts));
  renderCommunityPostsUI(localPosts);

  if (window.fireDB && window.fireDeleteDoc && window.fireDoc) {
    try {
      await window.fireDeleteDoc(window.fireDoc(window.fireDB, "community_posts", postId));
    } catch(e) {}
  }
}

// 🚀 2. دالة مشاركة البوست
function shareSinglePost(postId) {
  const text = `شوف السؤال ده على تطبيق سبيل المجد! 🚀`;
  if (navigator.share) {
    navigator.share({ title: 'مشاركة سؤال', text: text, url: window.location.href });
  } else {
    navigator.clipboard.writeText(window.location.href);
    alert("✅ تم نسخ رابط المشاركة!");
  }
}

// 🎭 3. فتح قائمة التفاعلات عند الضغط المطول
function toggleReactionsPopover(postId) {
  const pop = document.getElementById('reactionsPop_' + postId);
  if (pop) pop.classList.toggle('show');
}

// 📷 4. رفع صورة داخل التعليق
let commentImagesMap = {};
function handleCommentImageUpload(postId, input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    commentImagesMap[postId] = e.target.result;
    alert("✅ تم تجهيز الصورة المرفقة بالتعليق!");
  };
  reader.readAsDataURL(file);
}

// 💬 5. تعديل دالة إضافة التعليق لدعم الصور فوراً
async function submitPostComment(postId) {
  const inp = document.getElementById('commentInput_' + postId);
  const text = inp ? inp.value.trim() : '';
  const commentImg = commentImagesMap[postId] || null;

  if (!text && !currentCommentAudioBase64 && !commentImg) {
    alert("اكتب تعليقاً، ارفع صورة، أو سجّل فويساً للإجابة 🙏");
    return;
  }

  const user = getCommunityUserData();
  const commentPayload = {
    id: "comment_" + Date.now(),
    authorName: user.name,
    authorAvatar: user.avatar,
    text: text,
    image: commentImg,
    audio: currentCommentAudioBase64,
    timestamp: new Date().toISOString(),
    isBestAnswer: false
  };

  // 1. التحديث المحلي المباشر
  let localPosts = JSON.parse(localStorage.getItem('sm_local_community_posts') || '[]');
  const postIdx = localPosts.findIndex(p => p.id === postId);
  if (postIdx > -1) {
    if (!localPosts[postIdx].commentsList) localPosts[postIdx].commentsList = [];
    localPosts[postIdx].commentsList.push(commentPayload);
    localPosts[postIdx].commentsCount = localPosts[postIdx].commentsList.length;
    localStorage.setItem('sm_local_community_posts', JSON.stringify(localPosts));
    renderCommunityPostsUI(localPosts);
  }

  // تصفيرة الحقول
  if (inp) inp.value = '';
  currentCommentAudioBase64 = null;
  delete commentImagesMap[postId];

  // 2. المزامنة مع السحاب
  if (window.fireDB && window.fireGetDoc && window.fireUpdateDoc) {
    try {
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
    } catch(e) {}
  }
}
// 👥 عرض تبويب الأصدقاء وطلبات الصداقة المنفصل
async function renderSeparateFriendsSectionUI() {
  const container = document.getElementById('communityPostsFeed');
  if (!container) return;

  const user = getCommunityUserData();

  container.innerHTML = `
    <!-- 1. وعاء طلبات الصداقة الواردة -->
    <div class="athr-card" style="margin-bottom:12px;">
      <div style="font-size:13px; font-weight:bold; color:var(--gold); margin-bottom:10px; border-right:3px solid var(--gold); padding-right:6px;">
        📩 طلبات الصداقة الواردة:
      </div>
      <div id="friendsRequestsFeedBox" style="font-size:12px; color:var(--text2);">
        جاري تحميل الطلبات...
      </div>
    </div>

    <!-- 2. وعاء قائمة الأصدقاء الحاليين -->
    <div class="athr-card">
      <div style="font-size:13px; font-weight:bold; color:var(--gold); margin-bottom:10px; border-right:3px solid var(--gold); padding-right:6px;">
        👥 قائمة أصدقائك:
      </div>
      <div id="myFriendsListFeedBox" style="font-size:12px; color:var(--text2);">
        جاري جلب قائمة الأصدقاء...
      </div>
    </div>
  `;

  if (!window.fireDB || !window.fireOnSnapshot || !window.fireCollection) {
    document.getElementById('friendsRequestsFeedBox').innerHTML = "يرجى الاتصال بالإنترنت لعرض الطلبات.";
    document.getElementById('myFriendsListFeedBox').innerHTML = "لا يوجد أصدقاء مسجلين محلياً.";
    return;
  }

  // 1️⃣ الاستماع الحي لطلبات الصداقة الواردة
  try {
    const reqColl = window.fireCollection(window.fireDB, "friend_requests");
    window.fireOnSnapshot(reqColl, (snap) => {
      let incomingReqs = [];
      let myFriendsSet = new Set();

      snap.forEach(d => {
        const data = d.data();
        if (data.to === user.code && data.status === 'pending') {
          incomingReqs.push(data);
        }
   if ((data.from === user.code || data.to === user.code) && data.status === 'accepted') {
  const isSender = data.from === user.code;
  const friendCode = isSender ? data.to : data.from;
  const friendName = isSender 
    ? (data.toName && data.toName !== data.to ? data.toName : "طالب متميز") 
    : (data.fromName && data.fromName !== data.from ? data.fromName : "طالب متميز");

  myFriendsSet.add(JSON.stringify({ code: friendCode, name: friendName }));
}
      });

      // رسم طلبات الصداقة
      const reqBox = document.getElementById('friendsRequestsFeedBox');
      if (reqBox) {
        if (incomingReqs.length === 0) {
          reqBox.innerHTML = "<div style='text-align:center; padding:10px; color:var(--text2);'>لا توجد طلبات صداقة جديدة حالياً. 🌸</div>";
        } else {
          reqBox.innerHTML = incomingReqs.map(r => `
            <div style="display:flex; justify-content:space-between; align-items:center; background:var(--bg2); padding:10px; border-radius:12px; margin-bottom:8px; border:1px solid var(--border);">
              <div>
                <b style="color:var(--text); font-size:13px;">${r.fromName}</b>
                
              </div>
              <div style="display:flex; gap:6px;">
                <button onclick="acceptFriendRequest('${r.from}', '${r.fromName}')" class="btn-small" style="padding:5px 12px;">قبول ✅</button>
                <button onclick="rejectFriendRequest('${r.from}')" class="btn-small" style="background:transparent; border:1px solid #ff6b6b; color:#ff6b6b; padding:5px 10px;">رفض</button>
              </div>
            </div>
          `).join('');
        }
      }

      // رسم قائمة الأصدقاء
      const friendsBox = document.getElementById('myFriendsListFeedBox');
      if (friendsBox) {
        const friendsList = Array.from(myFriendsSet).map(s => JSON.parse(s));
        if (friendsList.length === 0) {
          friendsBox.innerHTML = "<div style='text-align:center; padding:10px; color:var(--text2);'>لم تضف أصدقاء بعد. اضغط على اسم أي طالب في المنشورات لإرسال طلب صداقة! 🚀</div>";
        } else {
          friendsBox.innerHTML = friendsList.map(f => `
            <div style="display:flex; justify-content:space-between; align-items:center; background:var(--bg2); padding:10px; border-radius:12px; margin-bottom:8px; border:1px solid var(--border);">
              <div>
                <b style="color:var(--gold); font-size:13px;">🟢 ${f.name}</b>
              </div>
              <button onclick="openDirectMessageModal('${f.code}', '${f.name}')" class="btn-small" style="background:var(--card); border:1px solid var(--gold); color:var(--gold); padding:6px 12px;">💬 محادثة</button>
            </div>
          `).join('');
        }
      }
    });
  } catch(e) {
    console.error(e);
  }
}

// 🤝 قبول طلب الصداقة
async function acceptFriendRequest(fromCode, fromName) {
  if (!checkUserIsLoggedIn()) return;
  const user = getCommunityUserData();

  if (window.fireDB && window.fireSetDoc && window.fireDoc) {
    try {
      // 1️⃣ تحديث مستند الطلب الأصلي
      const reqRef1 = window.fireDoc(window.fireDB, "friend_requests", `${fromCode}_${user.code}`);
      await window.fireSetDoc(reqRef1, {
        from: fromCode,
        fromName: fromName,
        to: user.code,
        toName: user.name,
        status: 'accepted',
        timestamp: new Date().toISOString()
      }, { merge: true });

      // 2️⃣ إنشاء مستند التأكيد العكسي لضمان ظهور الصداقة فوراً عند الطالب الآخر
      const reqRef2 = window.fireDoc(window.fireDB, "friend_requests", `${user.code}_${fromCode}`);
      await window.fireSetDoc(reqRef2, {
        from: user.code,
        fromName: user.name,
        to: fromCode,
        toName: fromName,
        status: 'accepted',
        timestamp: new Date().toISOString()
      }, { merge: true });

      alert("✅ تم قبول طلب الصداقة بنجاح وأصبحتم أصدقاء الآن!");
    } catch(e) {
      alert("حدث خطأ في القبول، حاول مجدداً.");
    }
  }
}

// ❌ رفض طلب الصداقة
async function rejectFriendRequest(fromCode) {
  if (!checkUserIsLoggedIn()) return;
  const user = getCommunityUserData();

  if (window.fireDB && window.fireDeleteDoc && window.fireDoc) {
    try {
      const reqRef = window.fireDoc(window.fireDB, "friend_requests", `${fromCode}_${user.code}`);
      await window.fireDeleteDoc(reqRef);
      alert("تم رفض طلب الصداقة.");
    } catch(e) {}
  }
}
// 📩 صندوق الرسائل الخاصة المطور (تصميم أثر)
async function renderMyPrivateDmsOnlyUI() {
  const container = document.getElementById('communityPostsFeed');
  if (!container) return;

  const user = getCommunityUserData();

  container.innerHTML = `
    <div style="direction: rtl; font-family: 'Amiri', serif;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
        <span style="font-size:14px; font-weight:bold; color:var(--gold);">📬 صندوق رسائلك الخاصة</span>
      </div>
      <div id="privateDmsFeedList" style="display:flex; flex-direction:column; gap:8px;">
        <div style="text-align:center; padding:20px; color:var(--text2); font-size:12px;">جاري جلب الرسائل...</div>
      </div>
    </div>
  `;

  if (!window.fireDB || !window.fireOnSnapshot || !window.fireCollection) return;

  try {
    const dmsColl = window.fireCollection(window.fireDB, "community_dms");
    window.fireOnSnapshot(dmsColl, (snap) => {
      let myDms = [];

      snap.forEach(docSnap => {
        const chatId = docSnap.id;
        if (chatId.includes(user.code)) {
          const msgsObj = docSnap.data() || {};
          const msgsArray = Object.values(msgsObj);
          if (msgsArray.length > 0) {
            msgsArray.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            const lastMsg = msgsArray[0];
            const otherCode = chatId.replace(user.code, '').replace('_', '');

            const isMeLast = lastMsg.sender === user.code;
            const otherName = isMeLast ? (lastMsg.targetName || "Ahmed Mohamed") : (lastMsg.senderName || "Ahmed Mohamed");

            myDms.push({
              chatId: chatId,
              otherCode: otherCode,
              otherName: otherName,
              lastMsgText: (isMeLast ? "أنت: " : "") + (lastMsg.text || 'مرفق ميديا'),
              lastTime: lastMsg.timestamp
            });
          }
        }
      });

      const dmsBox = document.getElementById('privateDmsFeedList');
      if (dmsBox) {
        if (myDms.length === 0) {
          dmsBox.innerHTML = `<div style="text-align:center; padding:30px; color:var(--text2); border:1px solid var(--border); border-radius:12px; background:var(--bg2);">لا توجد رسائل خاصة حتى الآن. 🌸</div>`;
        } else {
          dmsBox.innerHTML = myDms.map(d => `
            <div onclick="openDirectMessageModal('${d.otherCode}', '${d.otherName}')" style="display:flex; justify-content:space-between; align-items:center; background:rgba(255,255,255,0.02); border:1px solid var(--border); padding:14px 18px; border-radius:12px; cursor:pointer; transition:0.2s;">
              <div>
                <div style="font-size:14px; font-weight:bold; color:var(--text); margin-bottom:4px;">${d.otherName}</div>
                <div style="font-size:12px; color:var(--text2);">${d.lastMsgText}</div>
              </div>
              <span style="font-size:11px; color:var(--gold); display:flex; align-items:center; gap:3px;">
                ✨ ${formatCommunityTime(d.lastTime)}
              </span>
            </div>
          `).join('');
        }
      }
    });
  } catch (e) {
    console.error(e);
  }
}
