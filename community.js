// ===============================================
// 🌐 مجتمع سبيل المجد - Sabeel Community Engine
// ===============================================

let currentCommunityTab = "عام";
let communityPostsUnsubscribe = null;
let communityChatUnsubscribe = null;
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

// 2️⃣ تبديل تبويب المادة/القسم العلوي
function switchCommunityTab(tabName, btnEl) {
  currentCommunityTab = tabName;
  document.querySelectorAll('.community-nav-btn').forEach(btn => btn.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');

  const chatBox = document.getElementById('communityPublicChatBox');
  const postsBox = document.getElementById('communityPostsFeed');

  if (tabName === 'شات_عام') {
    if (chatBox) chatBox.style.display = 'block';
    if (postsBox) postsBox.style.display = 'none';
    listenToCommunityPublicChat();
  } else {
    if (chatBox) chatBox.style.display = 'none';
    if (postsBox) postsBox.style.display = 'block';
    listenToCommunityPosts();
  }
}

// 3️⃣ نشر بوست جديد في المجتمع (نص / صورة / استطلاع)
async function createNewCommunityPost() {
  const textInp = document.getElementById('communityPostTextInput');
  const isAnonCheck = document.getElementById('communityPostAnonCheck');
  const pollOption1 = document.getElementById('communityPollOpt1');
  const pollOption2 = document.getElementById('communityPollOpt2');

  const text = textInp ? textInp.value.trim() : '';
  const isAnonymous = isAnonCheck ? isAnonCheck.checked : false;

  if (!text && !currentPostMediaBase64) {
    alert("من فضلك اكتب سؤالاً أو ارفع صورة على الأقل 🙏");
    return;
  }

  const user = getCommunityUserData();
  const now = new Date();

  // تجهيز بيانات الاستطلاع لو موجود
  let pollData = null;
  if (pollOption1 && pollOption2 && pollOption1.value.trim() && pollOption2.value.trim()) {
    pollData = {
      options: [
        { text: pollOption1.value.trim(), votes: 0, voters: [] },
        { text: pollOption2.value.trim(), votes: 0, voters: [] }
      ]
    };
  }

  const postPayload = {
    authorCode: user.code,
    authorName: isAnonymous ? "طالب مجهول 🕵️" : user.name,
    authorAvatar: isAnonymous ? "https://via.placeholder.com/40/d4af37/000000?text=🔍" : user.avatar,
    authorBranch: user.branch,
    category: currentCommunityTab === 'شات_عام' ? 'عام' : currentCommunityTab,
    text: text,
    image: currentPostMediaBase64,
    poll: pollData,
    likes: [],
    loves: [],
    commentsCount: 0,
    timestamp: now.toISOString(),
    pinned: false
  };

  try {
    if (window.fireDB && window.fireSetDoc && window.fireDoc) {
      const newPostRef = window.fireDoc(window.fireDB, "community_posts", "post_" + Date.now());
      await window.fireSetDoc(newPostRef, postPayload);
    } else {
      // حفظ محلي احتياطي
      let localPosts = JSON.parse(localStorage.getItem('sm_local_community_posts') || '[]');
      localPosts.unshift({ ...postPayload, id: "local_" + Date.now() });
      localStorage.setItem('sm_local_community_posts', JSON.stringify(localPosts));
      renderCommunityPostsUI(localPosts);
    }

    // تصفيرة المدخلات
    if (textInp) textInp.value = '';
    if (isAnonCheck) isAnonCheck.checked = false;
    if (pollOption1) pollOption1.value = '';
    if (pollOption2) pollOption2.value = '';
    currentPostMediaBase64 = null;
    document.getElementById('postMediaPreviewNotice').style.display = 'none';

  } catch (err) {
    console.error("خطأ في نشر البوست:", err);
    alert("حدث خطأ أثناء النشر، حاول مرة أخرى.");
  }
}

// 4️⃣ الاستماع للبوستات حياً من الفايربيس
function listenToCommunityPosts() {
  if (!window.fireDB || !window.fireOnSnapshot) {
    let localPosts = JSON.parse(localStorage.getItem('sm_local_community_posts') || '[]');
    renderCommunityPostsUI(localPosts);
    return;
  }

  if (communityPostsUnsubscribe) communityPostsUnsubscribe();

  const postsRef = window.fireDoc(window.fireDB, "community_meta", "feed");
  // استماع للبوستات عبر المجموعة الرئيسية
  communityPostsUnsubscribe = window.fireOnSnapshot(window.fireDoc(window.fireDB, "system", "community_feed"), (docSnap) => {
    // يمكن التعامل مع snap المباشر
  }, err => {
    console.log("استخدام النمط التفاعلي المباشر للبوستات");
  });

  // جلب حقيقي وتحديث مستمر
  window.fireOnSnapshot(window.fireDoc(window.fireDB, "community", "posts_stream"), (docSnap) => {
    if (docSnap.exists()) {
      const data = docSnap.data();
      const allPosts = Object.values(data || {});
      renderCommunityPostsUI(allPosts);
    }
  });
}

// 5️⃣ رسم البوستات في الصفحة (Compact Post Card)
function renderCommunityPostsUI(postsList) {
  const container = document.getElementById('communityPostsFeed');
  if (!container) return;

  const filtered = currentCommunityTab === 'الكل' || currentCommunityTab === 'عام'
    ? postsList
    : postsList.filter(p => p.category === currentCommunityTab);

  if (!filtered || filtered.length === 0) {
    container.innerHTML = `<div style="text-align:center; padding:30px; color:var(--text2); font-size:12px;">لا توجد مشاركات في قسم (${currentCommunityTab}) حتى الآن. كن أول من يضيف سؤالاً! 🚀</div>`;
    return;
  }

  const currentUser = getCommunityUserData();

  container.innerHTML = filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).map(post => {
    const isLiked = post.likes && post.likes.includes(currentUser.code);
    const isLoved = post.loves && post.loves.includes(currentUser.code);
    const timeAgo = formatCommunityTime(post.timestamp);

    return `
      <div class="post-card ${post.pinned ? 'pinned-post' : ''}">
        <div class="post-header">
          <div class="post-user-info" onclick="openUserProfileModal('${post.authorCode}', '${post.authorName}', '${post.authorAvatar}', '${post.authorBranch}')" style="cursor:pointer;">
            <img src="${post.authorAvatar}" class="post-user-avatar">
            <div>
              <div class="post-user-name">
                ${post.authorName}
                <span class="post-user-badge">${post.authorBranch}</span>
              </div>
              <div class="post-time">${timeAgo} • قسم (${post.category || 'عام'})</div>
            </div>
          </div>
          <button onclick="shareSinglePost('${post.id}')" style="background:transparent; border:none; color:var(--gold); font-size:14px; cursor:pointer;">🔗</button>
        </div>

        ${post.text ? `<div class="post-content-text">${post.text}</div>` : ''}

        ${post.image ? `<img src="${post.image}" class="post-media-img" onclick="openImageViewer(this.src)" title="اضغط للتكبير 🔍">` : ''}

        ${post.poll ? renderPollWidgetUI(post) : ''}

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

        <!-- صندوق التعليقات المطوي -->
        <div id="commentsBox_${post.id}" class="comments-section" style="display:none;">
          <div id="commentsList_${post.id}" style="margin-bottom:8px;"></div>
          
          <div style="display:flex; gap:4px; align-items:center;">
            <input type="text" id="commentInput_${post.id}" placeholder="اكتب إجابتك أو تعليقك..." style="flex:1; padding:6px; border-radius:8px; background:var(--bg); color:var(--text); border:1px solid var(--border); font-size:11px; outline:none; font-family:'Amiri', serif;">
            <button onclick="submitPostComment('${post.id}')" class="btn-small" style="padding:5px 10px;">تعليق</button>
            <button id="voiceCommentBtn_${post.id}" onclick="toggleCommentVoiceRecord('${post.id}')" class="btn-small" style="background:var(--card); border:1px solid var(--gold); color:var(--gold); padding:5px 8px;">🎙️</button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// 6️⃣ رسم كارت الاستطلاعات والتصويت
function renderPollWidgetUI(post) {
  const currentUser = getCommunityUserData();
  let totalVotes = 0;
  post.poll.options.forEach(o => totalVotes += (o.votes || 0));

  return `
    <div style="background:var(--bg); border:1px solid var(--border); border-radius:10px; padding:8px; margin-bottom:8px;">
      <div style="font-size:11px; color:var(--gold); font-weight:bold; margin-bottom:6px;">📊 استطلاع رأي (إجمالي الأصوات: ${totalVotes}):</div>
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

// 7️⃣ تفاعل الإعجاب واللاف
async function togglePostReaction(postId, type) {
  const user = getCommunityUserData();
  if (window.fireDB && window.fireGetDoc && window.fireSetDoc) {
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

// 8️⃣ تصويت على الاستطلاع
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

// 9️⃣ تسجيل وإضافة تعليق (صوتي أو نصي)
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

// 🔟 تسجيل الفويس في التعليقات
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
          if (btn) btn.textContent = "✅ فويس جاهز!";
        };
        reader.readAsDataURL(blob);
        stream.getTracks().forEach(t => t.stop());
      };

      commentAudioRecorder.start();
      isCommentRecording = true;
      if (btn) btn.textContent = "🔴 تسجيل...";
    } catch (e) {
      alert("يرجى السماح بالمايك للتسجيل 🎙️");
    }
  } else {
    if (commentAudioRecorder) commentAudioRecorder.stop();
    isCommentRecording = false;
  }
}

// 1️⃣1️⃣ فتح وإغلاق كارت التعليقات
function togglePostCommentsBox(postId) {
  const box = document.getElementById('commentsBox_' + postId);
  if (box) {
    const isHidden = box.style.display === 'none';
    box.style.display = isHidden ? 'block' : 'none';
  }
}

// 1️⃣2️⃣ فتح كارت البروفايل السريع وإرسال DMs
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
        <button onclick="openDirectMessageModal('${code}', '${name}')" class="btn-small" style="flex:1; padding:8px; background:var(--card); border:1px solid var(--gold); color:var(--gold);">💬 محادثة خاصة</button>
      </div>

      <button onclick="document.getElementById('communityProfileModal').classList.remove('show')" style="width:100%; background:transparent; border:1px solid var(--border); color:var(--text2); padding:6px; border-radius:8px; font-size:11px;">إغلاق</button>
    </div>
  `;

  modal.classList.add('show');
}

// تنسيق الوقت البسيط
function formatCommunityTime(isoString) {
  if (!isoString) return 'الآن';
  const diff = Math.floor((new Date() - new Date(isoString)) / 1000);
  if (diff < 60) return 'منذ ثوانٍ';
  if (diff < 3600) return `منذ ${Math.floor(diff / 60)} دقيقة`;
  if (diff < 86400) return `منذ ${Math.floor(diff / 3600)} ساعة`;
  return `منذ ${Math.floor(diff / 86400)} يوم`;
}

// رفع صورة مع البوست
function handlePostMediaUpload(input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    currentPostMediaBase64 = e.target.result;
    const notice = document.getElementById('postMediaPreviewNotice');
    if (notice) {
      notice.style.display = 'block';
      notice.textContent = "✅ تم تجهيز الصورة المرفقة بنجاح!";
    }
  };
  reader.readAsDataURL(file);
}
