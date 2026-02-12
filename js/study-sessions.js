// Study Groups - Create Meeting Session
function createStudySession() {
  // Generate unique session ID
  const sessionId = generateSessionId();
  const sessionLink = `${window.location.origin}${window.location.pathname.split('pages')[0]}pages/study-session-live.html?session=${sessionId}`;
  
  // Show modal with the link
  showSessionModal(sessionId, sessionLink);
  
  // Save session to localStorage
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const sessions = JSON.parse(localStorage.getItem("studySessions")) || [];
  
  const session = {
    id: sessionId,
    createdBy: currentUser ? currentUser.username : "Anonymous",
    createdAt: new Date().toISOString(),
    link: sessionLink,
    members: [currentUser ? currentUser.username : "Anonymous"]
  };
  
  sessions.push(session);
  localStorage.setItem("studySessions", JSON.stringify(sessions));
}

function generateSessionId() {
  return 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
}

function showSessionModal(sessionId, sessionLink) {
  // Remove existing modal if any
  const existingModal = document.getElementById('sessionModal');
  if (existingModal) {
    existingModal.remove();
  }

  const modalHTML = `
    <div id="sessionModal" class="session-modal-overlay">
      <div class="session-modal-content">
        <button class="session-modal-close" onclick="closeSessionModal()">✕</button>
        
        <div class="session-modal-header">
          <div class="session-modal-icon">📹</div>
          <h2>تم إنشاء جلسة دراسة جديدة! 🎉</h2>
          <p>شارك هذا الرابط مع أصدقائك</p>
        </div>
        
        <div class="session-modal-body">
          <div class="session-info">
            <label>رقم الجلسة:</label>
            <div class="session-id-box">${sessionId}</div>
          </div>
          
          <div class="session-link-container">
            <label>رابط الدخول:</label>
            <div class="link-box">
              <input 
                type="text" 
                id="sessionLinkInput" 
                readonly 
                value="${sessionLink}"
                class="session-link-input"
              />
              <button class="copy-btn" onclick="copyToClipboard('${sessionLink}')">
                📋 نسخ
              </button>
            </div>
          </div>
          
          <p class="session-note">
            ℹ️ شارك هذا الرابط مع أصدقائك ليدخلوا الجلسة معك
          </p>
        </div>
        
        <div class="session-modal-footer">
          <button class="session-btn-primary" onclick="startLiveSession('${sessionLink}')">
            ▶️ ابدأ الجلسة الآن
          </button>
          <button class="session-btn-primary" onclick="shareViaWhatsApp('${sessionLink}')">
            📱 شارك عبر WhatsApp
          </button>
          <button class="session-btn-secondary" onclick="closeSessionModal()">
            ✓ تم، سأشاركه يدويًا
          </button>
        </div>
      </div>
    </div>
  `;

  const styleHTML = `
    <style id="sessionModalStyle">
      .session-modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10001;
        direction: rtl;
      }

      .session-modal-content {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 25px;
        padding: 0;
        width: 95%;
        max-width: 500px;
        box-shadow: 0 30px 80px rgba(0, 0, 0, 0.4);
        animation: sessionSlideIn 0.4s ease;
        position: relative;
        overflow: hidden;
      }

      @keyframes sessionSlideIn {
        from {
          opacity: 0;
          transform: scale(0.9) translateY(30px);
        }
        to {
          opacity: 1;
          transform: scale(1) translateY(0);
        }
      }

      .session-modal-close {
        position: absolute;
        top: 15px;
        left: 15px;
        width: 35px;
        height: 35px;
        border: none;
        background: rgba(255, 255, 255, 0.2);
        color: white;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        transition: all 0.3s;
        z-index: 10002;
      }

      .session-modal-close:hover {
        background: rgba(255, 255, 255, 0.4);
        transform: rotate(90deg);
      }

      .session-modal-header {
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        padding: 40px 30px 30px;
        text-align: center;
        color: white;
        border-bottom: 2px solid rgba(255, 255, 255, 0.1);
      }

      .session-modal-icon {
        font-size: 50px;
        margin-bottom: 15px;
      }

      .session-modal-header h2 {
        font-size: 28px;
        margin-bottom: 10px;
        font-weight: 700;
      }

      .session-modal-header p {
        font-size: 16px;
        opacity: 0.95;
      }

      .session-modal-body {
        padding: 30px;
        color: white;
      }

      .session-info {
        margin-bottom: 25px;
      }

      .session-info label {
        display: block;
        margin-bottom: 10px;
        font-size: 14px;
        font-weight: 600;
        opacity: 0.9;
      }

      .session-id-box {
        background: rgba(255, 255, 255, 0.2);
        border: 2px solid rgba(255, 255, 255, 0.3);
        padding: 12px 15px;
        border-radius: 10px;
        font-family: 'Courier New', monospace;
        font-size: 14px;
        word-break: break-all;
        font-weight: 600;
      }

      .session-link-container {
        margin-bottom: 20px;
      }

      .session-link-container label {
        display: block;
        margin-bottom: 10px;
        font-size: 14px;
        font-weight: 600;
        opacity: 0.9;
      }

      .link-box {
        display: flex;
        gap: 8px;
        align-items: stretch;
      }

      .session-link-input {
        flex: 1;
        background: rgba(255, 255, 255, 0.2);
        border: 2px solid rgba(255, 255, 255, 0.3);
        padding: 12px 15px;
        border-radius: 10px;
        font-family: 'Courier New', monospace;
        font-size: 13px;
        color: white;
        font-weight: 500;
        transition: all 0.3s;
      }

      .session-link-input::selection {
        background: rgba(255, 255, 255, 0.3);
      }

      .session-link-input:focus {
        outline: none;
        border-color: rgba(255, 255, 255, 0.6);
        box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
      }

      .copy-btn {
        background: rgba(255, 255, 255, 0.3);
        border: 2px solid rgba(255, 255, 255, 0.4);
        color: white;
        padding: 12px 20px;
        border-radius: 10px;
        cursor: pointer;
        font-weight: 600;
        font-size: 13px;
        transition: all 0.3s;
        white-space: nowrap;
      }

      .copy-btn:hover {
        background: rgba(255, 255, 255, 0.5);
        border-color: rgba(255, 255, 255, 0.6);
      }

      .copy-btn:active {
        transform: scale(0.95);
      }

      .session-note {
        background: rgba(255, 255, 255, 0.1);
        padding: 12px 15px;
        border-radius: 10px;
        font-size: 13px;
        opacity: 0.95;
        margin-bottom: 0;
      }

      .session-modal-footer {
        padding: 20px 30px;
        border-top: 2px solid rgba(255, 255, 255, 0.1);
        display: flex;
        gap: 12px;
        flex-direction: column;
      }

      .session-btn-primary,
      .session-btn-secondary {
        padding: 14px 20px;
        border: none;
        border-radius: 10px;
        font-size: 15px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;
        font-family: "IBM Plex Sans Arabic";
      }

      .session-btn-primary {
        background: white;
        color: #667eea;
      }

      .session-btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(255, 255, 255, 0.3);
      }

      .session-btn-secondary {
        background: rgba(255, 255, 255, 0.2);
        color: white;
        border: 2px solid rgba(255, 255, 255, 0.4);
      }

      .session-btn-secondary:hover {
        background: rgba(255, 255, 255, 0.3);
        border-color: rgba(255, 255, 255, 0.6);
      }

      @media (max-width: 500px) {
        .session-modal-content {
          width: 98%;
          margin: 20px;
        }

        .session-modal-header {
          padding: 25px 20px 20px;
        }

        .session-modal-header h2 {
          font-size: 22px;
        }

        .session-modal-body {
          padding: 20px;
        }

        .session-modal-footer {
          padding: 15px 20px;
        }

        .link-box {
          flex-direction: column;
        }

        .copy-btn {
          width: 100%;
        }
      }
    </style>
  `;

  document.body.insertAdjacentHTML('beforeend', styleHTML);
  document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function closeSessionModal() {
  const modal = document.getElementById('sessionModal');
  const style = document.getElementById('sessionModalStyle');
  if (modal) modal.remove();
  if (style) style.remove();
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    // Show feedback
    const btn = event.target;
    const originalText = btn.textContent;
    btn.textContent = '✓ تم النسخ!';
    setTimeout(() => {
      btn.textContent = originalText;
    }, 2000);
  }).catch(err => {
    // Fallback for older browsers
    const input = document.getElementById('sessionLinkInput');
    input.select();
    document.execCommand('copy');
    
    const btn = event.target;
    const originalText = btn.textContent;
    btn.textContent = '✓ تم النسخ!';
    setTimeout(() => {
      btn.textContent = originalText;
    }, 2000);
  });
}

function shareViaWhatsApp(link) {
  const text = encodeURIComponent(`هل تريد أن تذاكر معي؟ 📚\n\nرابط الجلسة:\n${link}`);
  window.open(`https://wa.me/?text=${text}`, '_blank');
}

function startLiveSession(link) {
  window.location.href = link;
}

// Load existing sessions
function loadStudySessions() {
  const sessions = JSON.parse(localStorage.getItem("studySessions")) || [];
  return sessions;
}

// Join existing session by sessionId in URL
function joinStudySession() {
  const urlParams = new URLSearchParams(window.location.search);
  const sessionId = urlParams.get('session');
  
  if (sessionId) {
    const sessions = loadStudySessions();
    const session = sessions.find(s => s.id === sessionId);
    
    if (session) {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (currentUser && !session.members.includes(currentUser.username)) {
        session.members.push(currentUser.username);
        localStorage.setItem("studySessions", JSON.stringify(sessions));
      }
      
      // You can add code here to notify that user joined
      console.log('User joined session:', sessionId);
    }
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  joinStudySession();
});
