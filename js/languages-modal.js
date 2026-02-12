const currentUser = JSON.parse(localStorage.getItem('currentUser'));

if (!currentUser) {
  window.location.href = 'login.html';
}

console.log('🔍 Current user:', currentUser);

const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', function() {
    const confirmed = confirm('Caod Says: هل تريد تسجيل الخروج؟');
    if (confirmed) {
      localStorage.removeItem('currentUser');
      window.location.href = '../index.html';
    }
  });
}

const modal = document.getElementById("modal");
const modalText = document.getElementById("modal-text");
const closeBtn = document.querySelector(".close");

// Language pages mapping
const langPages = {
  html: 'lang-html.html',
  css: 'lang-css.html',
  js: 'lang-js.html',
  python: 'lang-python.html',
  java: 'lang-java.html',
  c: 'lang-c.html',
  cpp: 'lang-cpp.html',
  ruby: 'lang-ruby.html',
  php: 'lang-php.html',
  go: 'lang-go.html',
  swift: 'lang-swift.html',
  kotlin: 'lang-kotlin.html',
  rust: 'lang-rust.html',
  typescript: 'lang-typescript.html',
  dart: 'lang-dart.html',
  sql: 'lang-sql.html',
  scratch: 'lang-scratch.html',
  react: 'lang-react.html'
};

// Add click event to all language cards
document.querySelectorAll(".card[data-lang]").forEach((card) => {
  card.addEventListener("click", () => {
    const lang = card.getAttribute("data-lang");
    
    if (lang && langPages[lang]) {
      window.location.href = langPages[lang];
    }
  });
});

// Special card (surprise)
const specialCard = document.getElementById("specialCard");
if (specialCard) {
  specialCard.addEventListener("click", () => {
    console.log('🎁 Special card clicked!');
    
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
      window.location.href = 'login.html';
      return;
    }
    
    console.log('👤 User:', currentUser.username);
    
    const username = currentUser.fullname || currentUser.username;
    const progressKey = 'userProgress_' + currentUser.username;
    
    console.log('🔑 Progress key:', progressKey);
    
    // Load user progress
    let userProgress = JSON.parse(localStorage.getItem(progressKey));
    
    console.log('📊 Current progress BEFORE:', userProgress);
    
    // Initialize if doesn't exist
    if (!userProgress) {
      userProgress = {
        coursesCompleted: 0,
        challengesCompleted: 0,
        totalPoints: 0,
        achievements: ['beginner'],
        level: 1,
        completedChallengeIds: []
      };
      console.log('🆕 Created new progress object');
    }
    
    let isNewAchievement = false;
    
    // Check if already has explorer badge
    if (!userProgress.achievements.includes('explorer')) {
      console.log('✨ Adding explorer badge...');
      
      // Add explorer achievement
      userProgress.achievements.push('explorer');
      
      // Add 100 points
      userProgress.totalPoints = (userProgress.totalPoints || 0) + 100;
      
      isNewAchievement = true;
      
      console.log('📊 Progress AFTER update:', userProgress);
      
      // CRITICAL: Save to localStorage
      localStorage.setItem(progressKey, JSON.stringify(userProgress));
      
      // Verify it was saved
      const savedProgress = JSON.parse(localStorage.getItem(progressKey));
      console.log('✅ Verified saved progress:', savedProgress);
      
      if (savedProgress && savedProgress.achievements.includes('explorer')) {
        console.log('✅✅ EXPLORER BADGE SAVED SUCCESSFULLY!');
      } else {
        console.error('❌ FAILED TO SAVE EXPLORER BADGE!');
      }
    } else {
      console.log('ℹ️ User already has explorer badge');
    }
    
    // Show modal
    modalText.innerHTML = `
      <h1 style="text-align: center; color: #667eea;">🎉 مبروك ${username}! 🎉</h1>
      <div style="text-align: center; padding: 20px;">
        <p style="font-size: 20px; margin: 20px 0;">أنت مبرمج رائع! 💻</p>
        <p style="font-size: 18px; color: #555;">لقد اكتشفت المفاجأة السرية! 🌟</p>
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 20px; margin: 30px 0;">
          <h2>🏆 ${isNewAchievement ? 'إنجاز جديد!' : 'إنجاز سابق!'}</h2>
          <p style="font-size: 24px; margin: 15px 0;">${isNewAchievement ? '+100 نقطة' : 'لديك هذه الشارة'}</p>
          <p style="font-size: 18px;">${isNewAchievement ? '✅ تم إضافة شارة "المستكشف" إلى ملفك الشخصي!' : '✅ لديك شارة "المستكشف" بالفعل!'}</p>
          <p style="margin-top: 15px; font-size: 20px;">مجموع نقاطك الآن: <strong>${userProgress.totalPoints}</strong> ⭐</p>
        </div>
        <p style="font-size: 16px; margin-top: 20px;">
          <a href="profile.html" style="display: inline-block; background: white; color: #667eea; padding: 12px 30px; border-radius: 10px; text-decoration: none; font-weight: bold; box-shadow: 0 4px 10px rgba(0,0,0,0.2);">
            شاهد ملفك الشخصي 👤
          </a>
        </p>
        <p style="font-size: 14px; color: #888; margin-top: 15px;">Caod Says: أنت على الطريق الصحيح! 💪</p>
      </div>
    `;
    
    modal.style.display = "block";
    createConfetti();
  });
}

if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });
}

window.addEventListener("click", (e) => {
  if (e.target == modal) {
    modal.style.display = "none";
  }
});

function createConfetti() {
  const colors = ["#667eea", "#764ba2", "#ffd700", "#ff6b6b", "#4ecdc4"];
  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      const confetti = document.createElement("div");
      confetti.style.position = "fixed";
      confetti.style.width = "10px";
      confetti.style.height = "10px";
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = Math.random() * 100 + "%";
      confetti.style.top = "-10px";
      confetti.style.borderRadius = "50%";
      confetti.style.pointerEvents = "none";
      confetti.style.zIndex = "9999";
      confetti.style.animation = `fall ${2 + Math.random() * 3}s linear`;
      document.body.appendChild(confetti);
      
      setTimeout(() => confetti.remove(), 5000);
    }, i * 30);
  }
  
  const style = document.createElement("style");
  style.textContent = `
    @keyframes fall {
      to {
        transform: translateY(100vh) rotate(360deg);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}
