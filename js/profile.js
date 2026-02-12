const currentUser = JSON.parse(localStorage.getItem('currentUser'));

if (!currentUser) {
  window.location.href = 'login.html';
} else {
  loadProfileData();
}

function loadProfileData() {
  const navbarUser = document.getElementById('navbarUser');
  const profileName = document.getElementById('profileName');
  const profileUsername = document.getElementById('profileUsername');
  const profileAvatar = document.getElementById('profileAvatar');
  
  if (navbarUser) {
    navbarUser.textContent = `مرحباً ${currentUser.fullname || currentUser.username}`;
  }
  
  if (profileName) {
    profileName.textContent = currentUser.fullname || currentUser.username;
  }
  
  if (profileUsername) {
    profileUsername.textContent = `@${currentUser.username}`;
  }
  
  if (profileAvatar) {
    if (currentUser.avatar) {
      profileAvatar.innerHTML = `
        <img src="${currentUser.avatar}" alt="Avatar" style="width: 100%; height: 100%; object-fit: cover;">
        <input type="file" id="avatarInput" accept="image/*" style="display: none;">
        <div style="position: absolute; bottom: 0; right: 0; background: #667eea; width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 2px 10px rgba(0,0,0,0.2);" id="avatarUploadBtn">
          <span style="font-size: 24px;">📷</span>
        </div>
      `;
    } else {
      const firstLetter = (currentUser.fullname || currentUser.username).charAt(0).toUpperCase();
      profileAvatar.innerHTML = `
        <span style="font-size: 80px;">${firstLetter}</span>
        <input type="file" id="avatarInput" accept="image/*" style="display: none;">
        <div style="position: absolute; bottom: 0; right: 0; background: #667eea; width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 2px 10px rgba(0,0,0,0.2);" id="avatarUploadBtn">
          <span style="font-size: 24px;">📷</span>
        </div>
      `;
    }
  }
  
  const userProgress = JSON.parse(localStorage.getItem('userProgress_' + currentUser.username)) || {
    coursesCompleted: 0,
    challengesCompleted: 0,
    totalPoints: 0,
    achievements: ['beginner'],
    level: 1
  };
  
  document.getElementById('coursesCompleted').textContent = userProgress.coursesCompleted;
  document.getElementById('challengesCompleted').textContent = userProgress.challengesCompleted;
  document.getElementById('totalPoints').textContent = userProgress.totalPoints;
  document.getElementById('achievementsCount').textContent = userProgress.achievements.length;
  document.getElementById('profileLevel').textContent = `المستوى ${userProgress.level}`;
  
  if (userProgress.achievements.includes('explorer')) {
    const explorerBadge = document.getElementById('explorerBadge');
    if (explorerBadge) {
      explorerBadge.classList.remove('locked');
      explorerBadge.classList.add('unlocked');
    }
  }
  
  if (userProgress.achievements.includes('excellent')) {
    const excellentBadge = document.getElementById('excellentBadge');
    if (excellentBadge) {
      excellentBadge.classList.remove('locked');
      excellentBadge.classList.add('unlocked');
    }
  }
  
  if (userProgress.achievements.includes('star')) {
    const starBadge = document.getElementById('starBadge');
    if (starBadge) {
      starBadge.classList.remove('locked');
      starBadge.classList.add('unlocked');
    }
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

const editProfileBtn = document.getElementById('editProfileBtn');
if (editProfileBtn) {
  editProfileBtn.addEventListener('click', function() {
    showEditProfileModal();
  });
}

let cropperInstance = null;

function setupAvatarUpload() {
  const avatarInput = document.getElementById('avatarInput');
  const avatarUploadBtn = document.getElementById('avatarUploadBtn');
  const profileAvatarDiv = document.getElementById('profileAvatar');
  
  if (avatarUploadBtn && avatarInput && profileAvatarDiv) {
    avatarUploadBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      avatarInput.click();
    });
    
    profileAvatarDiv.addEventListener('click', function(e) {
      if (e.target.id !== 'avatarUploadBtn') {
        avatarInput.click();
      }
    });
    
    avatarInput.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (file) {
        if (file.size > 10 * 1024 * 1024) {
          alert('Caod Says: الصورة كبيرة جداً! اختر صورة أقل من 10MB ❌');
          return;
        }
        
        if (!file.type.startsWith('image/')) {
          alert('Caod Says: الملف المختار ليس صورة! ❌');
          return;
        }
        
        showCropModal(file);
      }
      e.target.value = '';
    });
  }
}

function showCropModal(file) {
  const modal = document.createElement('div');
  modal.id = 'cropModal';
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.92);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.3s;
    padding: 20px;
  `;
  
  const container = document.createElement('div');
  container.style.cssText = `
    background: white;
    border-radius: 25px;
    max-width: 800px;
    width: 100%;
    max-height: 95vh;
    display: flex;
    flex-direction: column;
    box-shadow: 0 20px 60px rgba(0,0,0,0.8);
    overflow: hidden;
  `;
  
  const header = document.createElement('div');
  header.style.cssText = `
    padding: 25px 35px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;
  
  const title = document.createElement('h2');
  title.innerHTML = '✂️ قص وتعديل الصورة';
  title.style.cssText = 'margin: 0; font-size: 26px; font-weight: 700;';
  
  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = '✖';
  closeBtn.style.cssText = `
    background: rgba(255, 255, 255, 0.2);
    border: none;
    font-size: 24px;
    color: white;
    cursor: pointer;
    padding: 5px 12px;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    line-height: 1;
    transition: all 0.3s;
  `;
  closeBtn.onmouseover = () => {
    closeBtn.style.background = 'rgba(255, 255, 255, 0.3)';
    closeBtn.style.transform = 'rotate(90deg)';
  };
  closeBtn.onmouseout = () => {
    closeBtn.style.background = 'rgba(255, 255, 255, 0.2)';
    closeBtn.style.transform = 'rotate(0deg)';
  };
  
  const content = document.createElement('div');
  content.style.cssText = `
    padding: 35px;
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 25px;
  `;
  
  const imageContainer = document.createElement('div');
  imageContainer.style.cssText = `
    flex: 1;
    min-height: 300px;
    max-height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    border-radius: 15px;
    overflow: hidden;
    border: 3px dashed #dee2e6;
    position: relative;
  `;
  
  const img = document.createElement('img');
  img.style.cssText = 'max-width: 100%; max-height: 100%; display: block;';
  
  const hint = document.createElement('div');
  hint.style.cssText = `
    text-align: center;
    color: #6c757d;
    font-size: 15px;
    margin-top: 15px;
  `;
  hint.innerHTML = '💡 استخدم الماوس للسحب والتكبير، أو الأزرار للتحكم الدقيق';
  
  const controls = document.createElement('div');
  controls.style.cssText = `
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 12px;
  `;
  
  const createControlBtn = (icon, text, color) => {
    const btn = document.createElement('button');
    btn.innerHTML = `${icon} ${text}`;
    btn.style.cssText = `
      padding: 14px 20px;
      background: ${color};
      color: white;
      border: none;
      border-radius: 12px;
      cursor: pointer;
      font-size: 15px;
      font-weight: 600;
      transition: all 0.3s;
      box-shadow: 0 4px 12px ${color}33;
    `;
    btn.onmouseover = () => {
      btn.style.transform = 'translateY(-2px)';
      btn.style.boxShadow = `0 6px 20px ${color}55`;
    };
    btn.onmouseout = () => {
      btn.style.transform = 'translateY(0)';
      btn.style.boxShadow = `0 4px 12px ${color}33`;
    };
    return btn;
  };
  
  const zoomInBtn = createControlBtn('🔍+', 'تكبير', '#28a745');
  const zoomOutBtn = createControlBtn('🔍−', 'تصغير', '#6c757d');
  const rotateLeftBtn = createControlBtn('↶', 'تدوير يسار', '#17a2b8');
  const rotateRightBtn = createControlBtn('↷', 'تدوير يمين', '#17a2b8');
  const flipHBtn = createControlBtn('⇄', 'قلب أفقي', '#ffc107');
  const resetBtn = createControlBtn('↺', 'إعادة ضبط', '#dc3545');
  
  const footer = document.createElement('div');
  footer.style.cssText = `
    padding: 25px 35px;
    background: #f8f9fa;
    display: flex;
    gap: 15px;
    justify-content: center;
  `;
  
  const cropBtn = document.createElement('button');
  cropBtn.innerHTML = '✂️ حفظ الصورة';
  cropBtn.style.cssText = `
    padding: 18px 50px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 15px;
    cursor: pointer;
    font-size: 19px;
    font-weight: 700;
    transition: all 0.3s;
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
  `;
  cropBtn.onmouseover = () => {
    cropBtn.style.transform = 'translateY(-3px) scale(1.05)';
    cropBtn.style.boxShadow = '0 12px 30px rgba(102, 126, 234, 0.6)';
  };
  cropBtn.onmouseout = () => {
    cropBtn.style.transform = 'translateY(0) scale(1)';
    cropBtn.style.boxShadow = '0 8px 20px rgba(102, 126, 234, 0.4)';
  };
  
  const cancelBtn = document.createElement('button');
  cancelBtn.innerHTML = '✖ إلغاء';
  cancelBtn.style.cssText = `
    padding: 18px 50px;
    background: #6c757d;
    color: white;
    border: none;
    border-radius: 15px;
    cursor: pointer;
    font-size: 19px;
    font-weight: 700;
    transition: all 0.3s;
  `;
  cancelBtn.onmouseover = () => cancelBtn.style.transform = 'translateY(-3px)';
  cancelBtn.onmouseout = () => cancelBtn.style.transform = 'translateY(0)';
  
  const reader = new FileReader();
  reader.onload = function(e) {
    img.src = e.target.result;
    
    img.onload = function() {
      if (typeof Cropper === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.js';
        script.onload = () => initCropper();
        document.head.appendChild(script);
      } else {
        initCropper();
      }
      
      function initCropper() {
        cropperInstance = new Cropper(img, {
          aspectRatio: 1,
          viewMode: 2,
          dragMode: 'move',
          autoCropArea: 0.9,
          restore: false,
          guides: true,
          center: true,
          highlight: true,
          cropBoxMovable: true,
          cropBoxResizable: true,
          toggleDragModeOnDblclick: false,
          responsive: true,
          background: true,
          modal: true,
          zoomOnWheel: true,
          wheelZoomRatio: 0.1,
        });
        
        let flipH = 1;
        
        zoomInBtn.onclick = () => cropperInstance.zoom(0.1);
        zoomOutBtn.onclick = () => cropperInstance.zoom(-0.1);
        rotateLeftBtn.onclick = () => cropperInstance.rotate(-90);
        rotateRightBtn.onclick = () => cropperInstance.rotate(90);
        flipHBtn.onclick = () => {
          flipH = flipH * -1;
          cropperInstance.scaleX(flipH);
        };
        resetBtn.onclick = () => {
          cropperInstance.reset();
          flipH = 1;
        };
      }
    };
  };
  
  cropBtn.onclick = function() {
    if (cropperInstance) {
      cropBtn.disabled = true;
      cropBtn.innerHTML = '⏳ جاري الحفظ...';
      cropBtn.style.opacity = '0.7';
      
      setTimeout(() => {
        const canvas = cropperInstance.getCroppedCanvas({
          width: 400,
          height: 400,
          imageSmoothingEnabled: true,
          imageSmoothingQuality: 'high',
        });
        
        const croppedDataUrl = canvas.toDataURL('image/jpeg', 0.92);
        
        saveAvatar(croppedDataUrl);
        
        cropperInstance.destroy();
        cropperInstance = null;
        document.body.removeChild(modal);
      }, 300);
    }
  };
  
  const closeModal = () => {
    if (cropperInstance) {
      cropperInstance.destroy();
      cropperInstance = null;
    }
    modal.style.animation = 'fadeOut 0.3s';
    setTimeout(() => document.body.removeChild(modal), 300);
  };
  
  cancelBtn.onclick = closeModal;
  closeBtn.onclick = closeModal;
  
  reader.readAsDataURL(file);
  
  header.appendChild(title);
  header.appendChild(closeBtn);
  
  imageContainer.appendChild(img);
  
  controls.appendChild(zoomInBtn);
  controls.appendChild(zoomOutBtn);
  controls.appendChild(rotateLeftBtn);
  controls.appendChild(rotateRightBtn);
  controls.appendChild(flipHBtn);
  controls.appendChild(resetBtn);
  
  content.appendChild(imageContainer);
  content.appendChild(hint);
  content.appendChild(controls);
  
  footer.appendChild(cropBtn);
  footer.appendChild(cancelBtn);
  
  container.appendChild(header);
  container.appendChild(content);
  container.appendChild(footer);
  
  modal.appendChild(container);
  document.body.appendChild(modal);
}

function saveAvatar(imageData) {
  currentUser.avatar = imageData;
  
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const userIndex = users.findIndex(u => u.username === currentUser.username);
  
  if (userIndex !== -1) {
    users[userIndex].avatar = imageData;
    localStorage.setItem('users', JSON.stringify(users));
  }
  
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  
  loadProfileData();
  setupAvatarUpload();
  
  const successMsg = document.createElement('div');
  successMsg.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 30px 50px;
    border-radius: 20px;
    font-size: 20px;
    font-weight: 600;
    z-index: 10001;
    box-shadow: 0 10px 40px rgba(0,0,0,0.3);
    animation: successPop 0.5s;
  `;
  successMsg.innerHTML = '✅ تم تحديث صورة الملف الشخصي بنجاح!';
  document.body.appendChild(successMsg);
  
  setTimeout(() => {
    successMsg.style.animation = 'fadeOut 0.3s';
    setTimeout(() => document.body.removeChild(successMsg), 300);
  }, 2000);
}

setupAvatarUpload();

function showEditProfileModal() {
  const newName = prompt('Caod Says: أدخل اسمك الجديد:', currentUser.fullname || currentUser.username);
  
  if (newName && newName.trim()) {
    currentUser.fullname = newName.trim();
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(u => u.username === currentUser.username);
    
    if (userIndex !== -1) {
      users[userIndex].fullname = newName.trim();
      localStorage.setItem('users', JSON.stringify(users));
    }
    
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    alert('Caod Says: تم تحديث الملف الشخصي بنجاح! ✅');
    
    loadProfileData();
    setupAvatarUpload();
  }
}

const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
  }
  
  @keyframes fadeOut {
    from { opacity: 1; transform: scale(1); }
    to { opacity: 0; transform: scale(0.9); }
  }
  
  @keyframes successPop {
    0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
    70% { transform: translate(-50%, -50%) scale(1.1); }
    100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
  }
`;
document.head.appendChild(style);
