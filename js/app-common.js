// Common JS for all app pages
const currentUser = JSON.parse(localStorage.getItem('currentUser'));

if (!currentUser) {
  window.location.href = 'login.html';
} else {
  const navbarUser = document.getElementById('navbarUser');
  const heroTitle = document.getElementById('heroTitle');
  
  if (navbarUser) {
    navbarUser.textContent = `مرحباً ${currentUser.fullname || currentUser.username}`;
  }
  
  if (heroTitle) {
    heroTitle.textContent = `مرحباً ${currentUser.fullname || currentUser.username}!`;
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
