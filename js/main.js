document.addEventListener('DOMContentLoaded', function() {
  const currentUser = localStorage.getItem('currentUser');
  
  if (currentUser) {
    window.location.href = 'pages/home.html';
  }
});
