const currentUser = JSON.parse(localStorage.getItem('currentUser'));

if (!currentUser) {
  window.location.href = '../index.html';
} else {
  const headerUser = document.getElementById('headerUser');
  const welcomeMessage = document.getElementById('welcomeMessage');
  
  if (headerUser) {
    headerUser.textContent = `مرحباً ${currentUser.fullname || currentUser.username}`;
  }
  
  if (welcomeMessage) {
    welcomeMessage.textContent = `مرحباً ${currentUser.fullname || currentUser.username}! نتمنى لك رحلة برمجية ممتعة`;
  }
}

const logoutBtn = document.getElementById('logoutBtn');

if (logoutBtn) {
  logoutBtn.addEventListener('click', function() {
    localStorage.removeItem('currentUser');
    window.location.href = '../index.html';
  });
}
