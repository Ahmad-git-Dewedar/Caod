const currentUser = JSON.parse(localStorage.getItem('currentUser'));

if (!currentUser) {
  window.location.href = '../index.html';
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

const htmlEditor = document.getElementById('htmlEditor');
const cssEditor = document.getElementById('cssEditor');
const jsEditor = document.getElementById('jsEditor');
const preview = document.getElementById('preview');
const runBtn = document.getElementById('runBtn');
const clearBtn = document.getElementById('clearBtn');
const editorTabs = document.querySelectorAll('.editor-tab');

let currentLang = 'html';

editorTabs.forEach(tab => {
  tab.addEventListener('click', function() {
    const lang = this.getAttribute('data-lang');
    
    editorTabs.forEach(t => t.classList.remove('editor-tab--active'));
    this.classList.add('editor-tab--active');
    
    htmlEditor.style.display = 'none';
    cssEditor.style.display = 'none';
    jsEditor.style.display = 'none';
    
    if (lang === 'html') {
      htmlEditor.style.display = 'block';
    } else if (lang === 'css') {
      cssEditor.style.display = 'block';
    } else if (lang === 'js') {
      jsEditor.style.display = 'block';
    }
    
    currentLang = lang;
  });
});

function runCode() {
  const html = htmlEditor.value;
  const css = `<style>${cssEditor.value}</style>`;
  const js = `<script>${jsEditor.value}<\/script>`;
  
  const code = html + css + js;
  
  preview.srcdoc = code;
}

runBtn.addEventListener('click', runCode);

clearBtn.addEventListener('click', function() {
  const confirmed = confirm('Caod Says: هل تريد مسح كل الأكواد؟');
  if (confirmed) {
    if (currentLang === 'html') {
      htmlEditor.value = '';
    } else if (currentLang === 'css') {
      cssEditor.value = '';
    } else if (currentLang === 'js') {
      jsEditor.value = '';
    }
  }
});

runCode();
