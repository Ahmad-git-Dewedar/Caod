let users = JSON.parse(localStorage.getItem("users")) || [];

const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const user = users.find(
      (u) => (u.username === username || u.email === username) && u.password === password,
    );

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      alert("Caod Says: مرحباً بعودتك! 🎉");
      window.location.href = "../pages/welcome.html";
    } else {
      alert("Caod Says: اسم المستخدم أو كلمة المرور غير صحيحة ❌");
    }
  });

  const togglePassword = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("password");

  if (togglePassword && passwordInput) {
    togglePassword.addEventListener("click", function() {
      const type = passwordInput.type === "password" ? "text" : "password";
      passwordInput.type = type;
      
      const icon = this.querySelector(".password-toggle__icon");
      icon.textContent = type === "password" ? "👁️" : "🙈";
    });
  }
}

if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const fullname = document.getElementById("fullname").value;
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const age = document.getElementById("age").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
      alert("Caod Says: كلمتا المرور غير متطابقتين ❌");
      return;
    }

    if (age < 8 || age > 14) {
      alert("Caod Says: العمر يجب أن يكون بين 8 و 14 سنة ❌");
      return;
    }

    if (users.some((u) => u.username === username)) {
      alert("Caod Says: اسم المستخدم موجود بالفعل ❌");
      return;
    }

    if (users.some((u) => u.email === email)) {
      alert("Caod Says: البريد الإلكتروني مستخدم بالفعل ❌");
      return;
    }

    const newUser = { fullname, username, email, age, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    alert(`Caod Says: مرحباً ${fullname}! تم إنشاء حسابك بنجاح 🎉`);
    window.location.href = "../pages/welcome.html";
  });

  const togglePassword = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("password");

  if (togglePassword && passwordInput) {
    togglePassword.addEventListener("click", function() {
      const type = passwordInput.type === "password" ? "text" : "password";
      passwordInput.type = type;
      
      const icon = this.querySelector(".password-toggle__icon");
      icon.textContent = type === "password" ? "👁️" : "🙈";
    });
  }

  const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");
  const confirmPasswordInput = document.getElementById("confirmPassword");

  if (toggleConfirmPassword && confirmPasswordInput) {
    toggleConfirmPassword.addEventListener("click", function() {
      const type = confirmPasswordInput.type === "password" ? "text" : "password";
      confirmPasswordInput.type = type;
      
      const icon = this.querySelector(".password-toggle__icon");
      icon.textContent = type === "password" ? "👁️" : "🙈";
    });
  }
}

