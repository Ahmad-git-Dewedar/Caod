const currentUser = JSON.parse(localStorage.getItem('currentUser'));

if (!currentUser) {
  window.location.href = 'login.html';
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

const urlParams = new URLSearchParams(window.location.search);
const challengeId = parseInt(urlParams.get('id'));

const challengesData = {
  1: {
    title: 'صفحة ترحيب بسيطة',
    desc: 'أنشئ صفحة HTML تحتوي على عنوان وفقرة ترحيبية',
    icon: '🌐',
    points: 10,
    requirements: [
      'استخدم عنوان <h1>',
      'أضف فقرة <p>',
      'يجب أن يحتوي العنوان على "مرحب" أو "أهلا"',
      'يجب أن تحتوي الفقرة على نص (على الأقل 10 أحرف)'
    ],
    starterCode: '<!-- اكتب كود HTML هنا -->\n<h1></h1>\n<p></p>',
    validate: function(code) {
      const hasH1 = /<h1>/.test(code) && /<\/h1>/.test(code);
      const h1Content = code.match(/<h1>(.*?)<\/h1>/i);
      const hasWelcomeWord = h1Content && (h1Content[1].includes('مرحب') || h1Content[1].includes('أهلا'));
      
      const hasP = /<p>/.test(code) && /<\/p>/.test(code);
      const pContent = code.match(/<p>(.*?)<\/p>/i);
      const hasValidPContent = pContent && pContent[1].trim().length >= 10;
      
      if (!hasH1) {
        alert('Caod Says: ❌ لم تستخدم عنوان <h1>');
        return false;
      }
      if (!hasWelcomeWord) {
        alert('Caod Says: ❌ العنوان يجب أن يحتوي على كلمة "مرحب" أو "أهلا"');
        return false;
      }
      if (!hasP) {
        alert('Caod Says: ❌ لم تستخدم فقرة <p>');
        return false;
      }
      if (!hasValidPContent) {
        alert('Caod Says: ❌ الفقرة يجب أن تحتوي على نص (على الأقل 10 أحرف)');
        return false;
      }
      
      return true;
    }
  },
  2: {
    title: 'تلوين الصفحة',
    desc: 'استخدم CSS لتغيير لون الخلفية والنص',
    icon: '🎨',
    points: 15,
    requirements: [
      'استخدم CSS داخل <style>',
      'غير لون الخلفية background-color',
      'غير لون النص color',
      'أضف عنوان وفقرة'
    ],
    starterCode: '<style>\n  body {\n    /* أضف لون الخلفية هنا */\n    \n    /* أضف لون النص هنا */\n    \n  }\n</style>\n\n<h1>عنوان ملون</h1>\n<p>فقرة ملونة</p>',
    validate: function(code) {
      const hasStyle = /<style>[\s\S]*<\/style>/i.test(code);
      const hasBackgroundColor = /background-color\s*:\s*[^;]+;/i.test(code);
      const hasColor = /(?:^|[^-])color\s*:\s*[^;]+;/i.test(code);
      const hasH1 = /<h1>/.test(code);
      const hasP = /<p>/.test(code);
      
      if (!hasStyle) {
        alert('Caod Says: ❌ يجب استخدام <style> لإضافة CSS');
        return false;
      }
      if (!hasBackgroundColor) {
        alert('Caod Says: ❌ يجب إضافة background-color للخلفية');
        return false;
      }
      if (!hasColor) {
        alert('Caod Says: ❌ يجب إضافة color للنص');
        return false;
      }
      if (!hasH1 || !hasP) {
        alert('Caod Says: ❌ يجب إضافة عنوان <h1> وفقرة <p>');
        return false;
      }
      
      return true;
    }
  },
  3: {
    title: 'زر تفاعلي',
    desc: 'أنشئ زراً يغير النص عند الضغط عليه',
    icon: '⚡',
    points: 25,
    requirements: [
      'أضف زر <button>',
      'أضف عنصر <p> بـ id="text"',
      'استخدم onclick للزر',
      'غير نص الفقرة عند الضغط باستخدام getElementById'
    ],
    starterCode: '<p id="text">النص الأصلي</p>\n<button onclick="changeText()">اضغط هنا</button>\n\n<script>\n  function changeText() {\n    // اكتب الكود هنا لتغيير النص\n    \n  }\n</script>',
    validate: function(code) {
      const hasButton = /<button.*onclick/.test(code) && /<\/button>/.test(code);
      const hasP = /<p.*id\s*=\s*["\']\w+["\']/i.test(code);
      const hasScript = /<script>[\s\S]*<\/script>/i.test(code);
      const hasFunction = /function\s+\w+\s*\(/i.test(code);
      const hasGetElementById = /getElementById/i.test(code);
      const hasInnerText = /(innerText|textContent|innerHTML)\s*=/i.test(code);
      
      if (!hasP) {
        alert('Caod Says: ❌ يجب إضافة فقرة <p> بـ id');
        return false;
      }
      if (!hasButton) {
        alert('Caod Says: ❌ يجب إضافة زر <button> مع onclick');
        return false;
      }
      if (!hasScript) {
        alert('Caod Says: ❌ يجب إضافة كود JavaScript داخل <script>');
        return false;
      }
      if (!hasFunction) {
        alert('Caod Says: ❌ يجب إنشاء دالة function');
        return false;
      }
      if (!hasGetElementById) {
        alert('Caod Says: ❌ يجب استخدام getElementById للوصول للعنصر');
        return false;
      }
      if (!hasInnerText) {
        alert('Caod Says: ❌ يجب تغيير النص باستخدام innerText أو innerHTML');
        return false;
      }
      
      return true;
    }
  },
  4: {
    title: 'حاسبة بسيطة',
    desc: 'صمم حاسبة تجمع رقمين',
    icon: '🔢',
    points: 30,
    requirements: [
      'أضف input لرقمين type="number"',
      'أضف زر للجمع',
      'أضف عنصر لعرض النتيجة',
      'اجمع الرقمين باستخدام + ثم اعرض النتيجة'
    ],
    starterCode: '<input type="number" id="num1" placeholder="الرقم الأول">\n<input type="number" id="num2" placeholder="الرقم الثاني">\n<button onclick="calculate()">احسب</button>\n<p id="result"></p>\n\n<script>\n  function calculate() {\n    // اكتب الكود هنا\n    \n  }\n</script>',
    validate: function(code) {
      const inputMatches = code.match(/<input[^>]*type\s*=\s*["']number["']/gi);
      const hasInputs = inputMatches && inputMatches.length >= 2;
      const hasButton = /<button.*onclick/.test(code);
      const hasResultElement = /id\s*=\s*["']result["']/i.test(code);
      const hasFunction = /function\s+calculate/i.test(code);
      const hasGetElementById = /getElementById/i.test(code);
      const hasAddition = /\+/.test(code);
      const hasValueAccess = /\.value/i.test(code);
      
      if (!hasInputs) {
        alert('Caod Says: ❌ يجب إضافة input رقمين type="number"');
        return false;
      }
      if (!hasButton) {
        alert('Caod Says: ❌ يجب إضافة زر <button> مع onclick');
        return false;
      }
      if (!hasResultElement) {
        alert('Caod Says: ❌ يجب إضافة عنصر لعرض النتيجة (مثل <p id="result">)');
        return false;
      }
      if (!hasFunction) {
        alert('Caod Says: ❌ يجب إنشاء دالة calculate');
        return false;
      }
      if (!hasGetElementById) {
        alert('Caod Says: ❌ يجب استخدام getElementById للوصول للعناصر');
        return false;
      }
      if (!hasValueAccess) {
        alert('Caod Says: ❌ يجب الحصول على قيمة الـ input باستخدام .value');
        return false;
      }
      if (!hasAddition) {
        alert('Caod Says: ❌ يجب جمع الرقمين باستخدام +');
        return false;
      }
      
      return true;
    }
  },
  5: {
    title: 'لعبة تخمين الرقم',
    desc: 'اصنع لعبة تخمين رقم عشوائي بين 1 و 10',
    icon: '🎲',
    points: 50,
    requirements: [
      'أنشئ رقم عشوائي باستخدام Math.random()',
      'أضف input لإدخال التخمين',
      'قارن التخمين بالرقم باستخدام if',
      'أظهر رسالة نجاح أو محاولة أخرى'
    ],
    starterCode: '<h2>خمن الرقم بين 1 و 10</h2>\n<input type="number" id="guess" placeholder="أدخل تخمينك">\n<button onclick="checkGuess()">تحقق</button>\n<p id="message"></p>\n\n<script>\n  let randomNumber = Math.floor(Math.random() * 10) + 1;\n  \n  function checkGuess() {\n    // اكتب الكود هنا\n    \n  }\n</script>',
    validate: function(code) {
      const hasRandom = /Math\.random/i.test(code);
      const hasMathFloor = /Math\.floor/i.test(code);
      const hasInput = /<input.*type\s*=\s*["']number["']/i.test(code);
      const hasFunction = /function\s+checkGuess/i.test(code);
      const hasIf = /if\s*\(/i.test(code);
      const hasComparison = /(===|==|!=|!==)/i.test(code);
      const hasGetElementById = /getElementById/i.test(code);
      
      if (!hasRandom) {
        alert('Caod Says: ❌ يجب استخدام Math.random() لتوليد رقم عشوائي');
        return false;
      }
      if (!hasMathFloor) {
        alert('Caod Says: ❌ يجب استخدام Math.floor() لتحويل الرقم لعدد صحيح');
        return false;
      }
      if (!hasInput) {
        alert('Caod Says: ❌ يجب إضافة input type="number" للتخمين');
        return false;
      }
      if (!hasFunction) {
        alert('Caod Says: ❌ يجب إنشاء دالة checkGuess');
        return false;
      }
      if (!hasIf) {
        alert('Caod Says: ❌ يجب استخدام if للمقارنة');
        return false;
      }
      if (!hasComparison) {
        alert('Caod Says: ❌ يجب مقارنة التخمين بالرقم العشوائي');
        return false;
      }
      if (!hasGetElementById) {
        alert('Caod Says: ❌ يجب استخدام getElementById للوصول للعناصر');
        return false;
      }
      
      return true;
    }
  },
  6: {
    title: 'قائمة مهام',
    desc: 'أنشئ تطبيق todo list بسيط',
    icon: '📝',
    points: 75,
    requirements: [
      'input لإضافة مهمة جديدة',
      'زر لإضافة المهمة',
      'قائمة <ul> بـ id لعرض المهام',
      'إنشاء <li> جديد وإضافته للقائمة باستخدام createElement و appendChild'
    ],
    starterCode: '<h2>قائمة المهام</h2>\n<input type="text" id="taskInput" placeholder="أضف مهمة جديدة">\n<button onclick="addTask()">إضافة</button>\n<ul id="taskList"></ul>\n\n<script>\n  function addTask() {\n    // اكتب الكود هنا\n    \n  }\n</script>',
    validate: function(code) {
      const hasInput = /<input.*id\s*=\s*["']taskInput["']/i.test(code);
      const hasUl = /<ul.*id\s*=\s*["']taskList["']/i.test(code);
      const hasAddFunction = /function\s+addTask/i.test(code);
      const hasCreateElement = /createElement/i.test(code);
      const hasAppendChild = /appendChild/i.test(code);
      const hasGetElementById = /getElementById/i.test(code);
      const hasValue = /\.value/i.test(code);
      
      if (!hasInput) {
        alert('Caod Says: ❌ يجب إضافة input بـ id="taskInput"');
        return false;
      }
      if (!hasUl) {
        alert('Caod Says: ❌ يجب إضافة قائمة <ul> بـ id="taskList"');
        return false;
      }
      if (!hasAddFunction) {
        alert('Caod Says: ❌ يجب إنشاء دالة addTask');
        return false;
      }
      if (!hasCreateElement) {
        alert('Caod Says: ❌ يجب استخدام createElement لإنشاء عنصر <li>');
        return false;
      }
      if (!hasAppendChild) {
        alert('Caod Says: ❌ يجب استخدام appendChild لإضافة المهمة للقائمة');
        return false;
      }
      if (!hasGetElementById) {
        alert('Caod Says: ❌ يجب استخدام getElementById للوصول للعناصر');
        return false;
      }
      if (!hasValue) {
        alert('Caod Says: ❌ يجب الحصول على قيمة الـ input باستخدام .value');
        return false;
      }
      
      return true;
    }
  }
};

const challenge = challengesData[challengeId];

if (!challenge) {
  alert('Caod Says: التحدي غير موجود!');
  window.location.href = 'challenges.html';
}

document.getElementById('challengeIcon').textContent = challenge.icon;
document.getElementById('challengeTitle').textContent = challenge.title;
document.getElementById('challengeDesc').textContent = challenge.desc;

const requirementsList = document.getElementById('requirementsList');
requirementsList.innerHTML = challenge.requirements.map(req => `<li>${req}</li>`).join('');

const codeEditor = document.getElementById('codeEditor');
const previewFrame = document.getElementById('previewFrame');
const runBtn = document.getElementById('runBtn');
const submitBtn = document.getElementById('submitBtn');

codeEditor.value = challenge.starterCode;

function runCode() {
  const code = codeEditor.value;
  previewFrame.srcdoc = `
    <!DOCTYPE html>
    <html dir="rtl">
    <head>
      <meta charset="UTF-8">
      <style>
        body {
          font-family: Arial, sans-serif;
          padding: 20px;
          direction: rtl;
        }
      </style>
    </head>
    <body>
      ${code}
    </body>
    </html>
  `;
}

runBtn.addEventListener('click', runCode);

submitBtn.addEventListener('click', function() {
  const code = codeEditor.value;
  
  if (challenge.validate(code)) {
    const userProgress = JSON.parse(localStorage.getItem('userProgress_' + currentUser.username)) || {
      coursesCompleted: 0,
      challengesCompleted: 0,
      totalPoints: 0,
      achievements: ['beginner'],
      level: 1,
      completedChallengeIds: []
    };
    
    if (!userProgress.completedChallengeIds) {
      userProgress.completedChallengeIds = [];
    }
    
    if (!userProgress.completedChallengeIds.includes(challengeId)) {
      userProgress.challengesCompleted = (userProgress.challengesCompleted || 0) + 1;
      userProgress.totalPoints = (userProgress.totalPoints || 0) + challenge.points;
      userProgress.completedChallengeIds.push(challengeId);
      
      if (userProgress.totalPoints >= 100 && !userProgress.achievements.includes('excellent')) {
        userProgress.achievements.push('excellent');
        alert('Caod Says: 🎉 مبروك! حصلت على شارة "المتفوق" 💯\n\nوصلت لـ 100 نقطة!');
      }
      
      if (userProgress.challengesCompleted >= 10 && !userProgress.achievements.includes('star')) {
        userProgress.achievements.push('star');
        alert('Caod Says: 🎉 مبروك! حصلت على شارة "النجم" 🚀');
      }
      
      localStorage.setItem('userProgress_' + currentUser.username, JSON.stringify(userProgress));
      
      alert(`Caod Says: 🎉 أحسنت! أكملت التحدي بنجاح!\n\n+${challenge.points} نقطة\n\nمجموع نقاطك: ${userProgress.totalPoints}`);
      
      setTimeout(() => {
        window.location.href = 'challenges.html';
      }, 1000);
    } else {
      alert('Caod Says: لقد أكملت هذا التحدي من قبل! ✅');
    }
  } else {
    alert('Caod Says: ❌ الحل غير مكتمل!\n\nتأكد من:\n' + challenge.requirements.join('\n'));
  }
});

runCode();
,
  7: {
    title: 'بطاقة ملف شخصي',
    desc: 'صمم بطاقة profile card جميلة',
    icon: '👤',
    points: 20,
    requirements: [
      'أضف div رئيسي للبطاقة',
      'أضف عنوان <h2> للاسم',
      'أضف فقرة <p> للوصف',
      'استخدم CSS لتصميم البطاقة'
    ],
    starterCode: '<style>\n  .card {\n    /* أضف التصميم هنا */\n    \n  }\n</style>\n\n<div class="card">\n  <h2>الاسم</h2>\n  <p>الوصف</p>\n</div>',
    validate: function(code) {
      const hasDiv = /<div/.test(code);
      const hasH2 = /<h2>/.test(code);
      const hasP = /<p>/.test(code);
      const hasStyle = /<style>[\s\S]*<\/style>/i.test(code);
      const hasCardClass = /class\s*=\s*["']card["']/i.test(code);
      
      if (!hasStyle) {
        alert('Caod Says: ❌ يجب إضافة <style> للتصميم');
        return false;
      }
      if (!hasDiv) {
        alert('Caod Says: ❌ يجب إضافة <div>');
        return false;
      }
      if (!hasCardClass) {
        alert('Caod Says: ❌ يجب إضافة class="card" للـ div');
        return false;
      }
      if (!hasH2) {
        alert('Caod Says: ❌ يجب إضافة عنوان <h2> للاسم');
        return false;
      }
      if (!hasP) {
        alert('Caod Says: ❌ يجب إضافة فقرة <p> للوصف');
        return false;
      }
      
      return true;
    }
  },
  8: {
    title: 'ساعة رقمية',
    desc: 'أنشئ ساعة رقمية تعمل بالوقت الحقيقي',
    icon: '⏰',
    points: 35,
    requirements: [
      'أضف عنصر لعرض الوقت',
      'استخدم setInterval',
      'استخدم Date() للحصول على الوقت',
      'حدّث الوقت كل ثانية'
    ],
    starterCode: '<h2>الساعة</h2>\n<div id="clock" style="font-size: 48px;"></div>\n\n<script>\n  function updateClock() {\n    // اكتب الكود هنا\n    \n  }\n  \n  // حدّث الساعة كل ثانية\n  \n</script>',
    validate: function(code) {
      const hasClockDiv = /id\s*=\s*["']clock["']/i.test(code);
      const hasFunction = /function\s+updateClock/i.test(code);
      const hasDate = /new\s+Date/i.test(code);
      const hasSetInterval = /setInterval/i.test(code);
      const hasGetElementById = /getElementById/i.test(code);
      
      if (!hasClockDiv) {
        alert('Caod Says: ❌ يجب إضافة div بـ id="clock"');
        return false;
      }
      if (!hasFunction) {
        alert('Caod Says: ❌ يجب إنشاء دالة updateClock');
        return false;
      }
      if (!hasDate) {
        alert('Caod Says: ❌ يجب استخدام new Date() للحصول على الوقت');
        return false;
      }
      if (!hasSetInterval) {
        alert('Caod Says: ❌ يجب استخدام setInterval لتحديث الساعة');
        return false;
      }
      if (!hasGetElementById) {
        alert('Caod Says: ❌ يجب استخدام getElementById لتحديث العرض');
        return false;
      }
      
      return true;
    }
  },
  9: {
    title: 'آلة حاسبة متقدمة',
    desc: 'اصنع آلة حاسبة بكل العمليات',
    icon: '🧮',
    points: 100,
    requirements: [
      'أضف أزرار للأرقام (0-9)',
      'أضف أزرار العمليات (+، -، ×، ÷)',
      'أضف شاشة لعرض النتيجة',
      'اكتب الدوال للعمليات الحسابية'
    ],
    starterCode: '<style>\n  .calculator { padding: 20px; }\n  button { padding: 15px; margin: 5px; font-size: 18px; }\n</style>\n\n<div class="calculator">\n  <input type="text" id="display" readonly style="width: 100%; font-size: 24px; padding: 10px;">\n  <br><br>\n  <!-- أضف الأزرار هنا -->\n</div>\n\n<script>\n  function appendNumber(num) {\n    // اكتب الكود هنا\n    \n  }\n  \n  function calculate() {\n    // اكتب الكود هنا\n    \n  }\n</script>',
    validate: function(code) {
      const hasDisplay = /id\s*=\s*["']display["']/i.test(code);
      const hasButtons = (code.match(/<button/gi) || []).length >= 4;
      const hasAppendFunction = /function\s+appendNumber/i.test(code);
      const hasCalculateFunction = /function\s+calculate/i.test(code);
      const hasGetElementById = /getElementById/i.test(code);
      
      if (!hasDisplay) {
        alert('Caod Says: ❌ يجب إضافة input بـ id="display"');
        return false;
      }
      if (!hasButtons) {
        alert('Caod Says: ❌ يجب إضافة أزرار <button> (على الأقل 4)');
        return false;
      }
      if (!hasAppendFunction) {
        alert('Caod Says: ❌ يجب إنشاء دالة appendNumber');
        return false;
      }
      if (!hasCalculateFunction) {
        alert('Caod Says: ❌ يجب إنشاء دالة calculate');
        return false;
      }
      if (!hasGetElementById) {
        alert('Caod Says: ❌ يجب استخدام getElementById');
        return false;
      }
      
      return true;
    }
  }
};
