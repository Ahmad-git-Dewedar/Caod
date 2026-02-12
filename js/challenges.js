const currentUser = JSON.parse(localStorage.getItem('currentUser'));

if (!currentUser) {
  window.location.href = 'login.html';
} else {
  const navbarUser = document.getElementById('navbarUser');
  if (navbarUser) {
    navbarUser.textContent = `مرحباً ${currentUser.fullname || currentUser.username}`;
  }
}

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

const challenges = [
  {
    id: 1,
    title: 'صفحة ترحيب بسيطة',
    desc: 'أنشئ صفحة HTML تحتوي على عنوان وفقرة ترحيبية',
    icon: '🌐',
    difficulty: 'easy',
    points: 10,
    time: '15 دقيقة',
    language: 'HTML',
    locked: false
  },
  {
    id: 2,
    title: 'تلوين الصفحة',
    desc: 'استخدم CSS لتغيير لون الخلفية والنص',
    icon: '🎨',
    difficulty: 'easy',
    points: 15,
    time: '20 دقيقة',
    language: 'CSS',
    locked: false
  },
  {
    id: 3,
    title: 'زر تفاعلي',
    desc: 'أنشئ زراً يغير النص عند الضغط عليه',
    icon: '⚡',
    difficulty: 'medium',
    points: 25,
    time: '30 دقيقة',
    language: 'JavaScript',
    locked: false
  },
  {
    id: 4,
    title: 'حاسبة بسيطة',
    desc: 'صمم حاسبة تجمع رقمين',
    icon: '🔢',
    difficulty: 'medium',
    points: 30,
    time: '45 دقيقة',
    language: 'JavaScript',
    locked: false
  },
  {
    id: 5,
    title: 'لعبة تخمين الرقم',
    desc: 'اصنع لعبة تخمين رقم عشوائي',
    icon: '🎲',
    difficulty: 'hard',
    points: 50,
    time: '60 دقيقة',
    language: 'JavaScript',
    locked: false
  },
  {
    id: 6,
    title: 'قائمة مهام',
    desc: 'أنشئ تطبيق todo list كامل',
    icon: '📝',
    difficulty: 'hard',
    points: 75,
    time: '90 دقيقة',
    language: 'JavaScript',
    locked: false
  },
  {
    id: 7,
    title: 'بطاقة ملف شخصي',
    desc: 'صمم بطاقة profile card جميلة',
    icon: '👤',
    difficulty: 'easy',
    points: 20,
    time: '25 دقيقة',
    language: 'HTML/CSS',
    locked: false
  },
  {
    id: 8,
    title: 'ساعة رقمية',
    desc: 'أنشئ ساعة رقمية تعمل بالوقت الحقيقي',
    icon: '⏰',
    difficulty: 'medium',
    points: 35,
    time: '40 دقيقة',
    language: 'JavaScript',
    locked: false
  },
  {
    id: 9,
    title: 'آلة حاسبة متقدمة',
    desc: 'اصنع آلة حاسبة علمية',
    icon: '🧮',
    difficulty: 'hard',
    points: 100,
    time: '120 دقيقة',
    language: 'JavaScript',
    locked: false
  },
  {
    id: 10,
    title: 'معرض صور تفاعلي',
    desc: 'اصنع معرض صور مع أزرار التنقل',
    icon: '🖼️',
    difficulty: 'medium',
    points: 40,
    time: '50 دقيقة',
    language: 'HTML/CSS/JS',
    locked: false
  },
  {
    id: 11,
    title: 'نموذج تسجيل',
    desc: 'اصنع نموذج تسجيل مع التحقق من البيانات',
    icon: '📋',
    difficulty: 'medium',
    points: 45,
    time: '55 دقيقة',
    language: 'JavaScript',
    locked: false
  },
  {
    id: 12,
    title: 'لعبة الذاكرة',
    desc: 'اصنع لعبة تطابق الصور والأرقام',
    icon: '🧠',
    difficulty: 'hard',
    points: 80,
    time: '90 دقيقة',
    language: 'JavaScript',
    locked: false
  },
  {
    id: 13,
    title: 'تطبيق الطقس',
    desc: 'اصنع تطبيق عرض درجة حرارة شهرية',
    icon: '🌤️',
    difficulty: 'medium',
    points: 50,
    time: '60 دقيقة',
    language: 'JavaScript',
    locked: false
  },
  {
    id: 14,
    title: 'متجر الملابس',
    desc: 'اصنع موقع متجر بسيط مع السلة',
    icon: '🛒',
    difficulty: 'hard',
    points: 120,
    time: '150 دقيقة',
    language: 'JavaScript',
    locked: false
  },
  {
    id: 15,
    title: 'مشغل موسيقى',
    desc: 'اصنع مشغل موسيقى بسيط',
    icon: '🎵',
    difficulty: 'medium',
    points: 55,
    time: '65 دقيقة',
    language: 'JavaScript',
    locked: false
  },
  {
    id: 16,
    title: 'محرر نصوص',
    desc: 'اصنع محرر نصوص مع حفظ البيانات',
    icon: '✍️',
    difficulty: 'hard',
    points: 110,
    time: '140 دقيقة',
    language: 'JavaScript',
    locked: false
  },
  {
    id: 17,
    title: 'لوحة رسم',
    desc: 'اصنع لوحة رسم باستخدام Canvas',
    icon: '🎨',
    difficulty: 'hard',
    points: 100,
    time: '130 دقيقة',
    language: 'JavaScript',
    locked: false
  },
  {
    id: 18,
    title: 'تطبيق المذكرة',
    desc: 'اصنع تطبيق لحفظ وإدارة المذكرات',
    icon: '📔',
    difficulty: 'medium',
    points: 60,
    time: '70 دقيقة',
    language: 'JavaScript',
    locked: false
  },
  {
    id: 19,
    title: 'لعبة Snake',
    desc: 'اصنع لعبة الثعبان الكلاسيكية',
    icon: '🐍',
    difficulty: 'hard',
    points: 150,
    time: '180 دقيقة',
    language: 'JavaScript',
    locked: false
  },
  {
    id: 20,
    title: 'موقع شخصي',
    desc: 'اصنع موقعك الشخصي بـ Portfolio',
    icon: '🌐',
    difficulty: 'hard',
    points: 200,
    time: '240 دقيقة',
    language: 'HTML/CSS/JS',
    locked: false
  }
];

function renderChallenges() {
  const grid = document.getElementById('challengesGrid');
  const userProgress = JSON.parse(localStorage.getItem('userProgress_' + currentUser.username)) || {
    challengesCompleted: 0,
    completedChallengeIds: []
  };
  
  grid.innerHTML = challenges.map(challenge => {
    const isCompleted = userProgress.completedChallengeIds?.includes(challenge.id);
    const canUnlock = !challenge.locked || userProgress.challengesCompleted >= 3;
    
    return `
      <div class="challenge-card challenge-card--${challenge.difficulty}">
        <div class="challenge-card__badge challenge-card__badge--${challenge.difficulty}">
          ${challenge.difficulty === 'easy' ? 'سهل' : challenge.difficulty === 'medium' ? 'متوسط' : 'صعب'}
        </div>
        <div class="challenge-card__icon">${challenge.icon}</div>
        <h3 class="challenge-card__title">${challenge.title}</h3>
        <p class="challenge-card__desc">${challenge.desc}</p>
        <div class="challenge-card__meta">
          <span>🕐 ${challenge.time}</span>
          <span>💻 ${challenge.language}</span>
        </div>
        <div class="challenge-card__points">
          <span>⭐</span>
          <span>+${challenge.points} نقطة</span>
        </div>
        ${isCompleted ? 
          `<button class="challenge-btn challenge-btn--locked">✅ مكتمل</button>` :
          canUnlock ?
          `<button class="challenge-btn challenge-btn--start" onclick="startChallenge(${challenge.id})">ابدأ التحدي</button>` :
          `<button class="challenge-btn challenge-btn--locked">🔒 ${challenge.unlockRequirement}</button>`
        }
      </div>
    `;
  }).join('');
}

function startChallenge(id) {
  const challenge = challenges.find(c => c.id === id);
  const userProgress = JSON.parse(localStorage.getItem('userProgress_' + currentUser.username)) || {
    completedChallengeIds: []
  };
  
  if (userProgress.completedChallengeIds?.includes(id)) {
    const retry = confirm('Caod Says: لقد أكملت هذا التحدي من قبل! ✅\n\nهل تريد حله مرة أخرى؟');
    if (retry) {
      window.location.href = `challenge-solve.html?id=${id}`;
    }
  } else {
    window.location.href = `challenge-solve.html?id=${id}`;
  }
}

renderChallenges();
