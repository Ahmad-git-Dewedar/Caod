const currentUser = JSON.parse(localStorage.getItem('currentUser'));

if (!currentUser) {
  window.location.href = '../index.html';
} else {
  const navbarUser = document.getElementById('navbarUser');
  const welcomeTitle = document.getElementById('welcomeTitle');
  
  if (navbarUser) {
    navbarUser.textContent = `مرحباً ${currentUser.fullname || currentUser.username}`;
  }
  
  if (welcomeTitle) {
    welcomeTitle.textContent = `مرحباً ${currentUser.fullname || currentUser.username}!`;
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
