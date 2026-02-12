// Modal for selecting Frontend or Backend
function showLanguagesFilterModal() {
  // Check if modal already exists and remove it
  const existingModal = document.getElementById('languagesFilterModal');
  if (existingModal) {
    existingModal.remove();
  }

  const modalHTML = `
    <div id="languagesFilterModal" class="modal-overlay">
      <div class="modal-content">
        <h2>اختر مسارك 🚀</h2>
        <p>هل تريد تعلم Front End أم Backend؟</p>
        
        <div class="options-grid">
          <div class="option-card frontend-option" onclick="selectFrontend()">
            <div class="option-icon">🎨</div>
            <h3>Front End</h3>
            <p>بناء الواجهات الجميلة والتفاعلية</p>
            <ul>
              <li>HTML</li>
              <li>CSS</li>
              <li>JavaScript</li>
              <li>React</li>
            </ul>
          </div>
          
          <div class="option-card backend-option" onclick="selectBackend()">
            <div class="option-icon">⚙️</div>
            <h3>Back End</h3>
            <p>بناء الخوادم والقواعد البيانات</p>
            <ul>
              <li>Python</li>
              <li>Java</li>
              <li>PHP</li>
              <li>Node.js</li>
            </ul>
          </div>
        </div>
        
        <button class="close-modal-btn" onclick="closeLanguagesFilterModal()">✕</button>
      </div>
    </div>
  `;

  // Add modal styles
  const styleHTML = `
    <style id="languagesFilterModalStyle">
      .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        direction: rtl;
      }

      .modal-content {
        background: white;
        border-radius: 25px;
        padding: 50px 40px;
        max-width: 900px;
        width: 95%;
        box-shadow: 0 30px 80px rgba(0, 0, 0, 0.3);
        position: relative;
        animation: slideUp 0.4s ease;
      }

      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(50px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .modal-content h2 {
        text-align: center;
        font-size: 40px;
        color: #2c3e50;
        margin-bottom: 15px;
      }

      .modal-content > p {
        text-align: center;
        font-size: 18px;
        color: #7f8c8d;
        margin-bottom: 40px;
      }

      .options-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 30px;
        margin-bottom: 30px;
      }

      @media (max-width: 768px) {
        .options-grid {
          grid-template-columns: 1fr;
        }
      }

      .option-card {
        background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        border-radius: 20px;
        padding: 40px 30px;
        text-align: center;
        cursor: pointer;
        transition: all 0.3s ease;
        border: 3px solid transparent;
      }

      .option-card:hover {
        transform: translateY(-10px);
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
      }

      .frontend-option:hover {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-color: #667eea;
      }

      .backend-option:hover {
        background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        border-color: #f5576c;
      }

      .option-card:hover h3,
      .option-card:hover p,
      .option-card:hover ul {
        color: white;
      }

      .option-icon {
        font-size: 60px;
        margin-bottom: 20px;
        display: block;
      }

      .option-card h3 {
        font-size: 28px;
        color: #2c3e50;
        margin-bottom: 10px;
        transition: color 0.3s;
      }

      .option-card p {
        font-size: 16px;
        color: #7f8c8d;
        margin-bottom: 20px;
        transition: color 0.3s;
      }

      .option-card ul {
        list-style: none;
        padding: 0;
        margin: 0;
        transition: color 0.3s;
      }

      .option-card ul li {
        padding: 8px 0;
        color: #555;
        font-size: 15px;
        font-weight: 500;
      }

      .option-card ul li::before {
        content: "✓ ";
        color: #4caf50;
        margin-left: 10px;
        font-weight: bold;
      }

      .close-modal-btn {
        position: absolute;
        top: 15px;
        left: 15px;
        width: 40px;
        height: 40px;
        border: none;
        background: #ecf0f1;
        color: #2c3e50;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        transition: all 0.3s;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .close-modal-btn:hover {
        background: #e74c3c;
        color: white;
      }
    </style>
  `;

  // Inject modal into DOM
  document.body.insertAdjacentHTML('beforeend', styleHTML);
  document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function selectFrontend() {
  window.location.href = 'frontend-languages.html';
}

function selectBackend() {
  window.location.href = 'backend-languages.html';
}

function closeLanguagesFilterModal() {
  const modal = document.getElementById('languagesFilterModal');
  const style = document.getElementById('languagesFilterModalStyle');
  if (modal) modal.remove();
  if (style) style.remove();
}
