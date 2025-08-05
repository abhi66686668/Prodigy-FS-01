document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;

  // ======== REGISTRATION PAGE ========
  if (path.includes("register.html")) {
    const registerForm = document.getElementById("register-form");
    const messageEl = document.getElementById("register-message");

    registerForm?.addEventListener("submit", (e) => {
      e.preventDefault();
      messageEl.textContent = "";
      messageEl.className = "message";

      const name = document.getElementById("name").value.trim();
      const secondName = document.getElementById("secondName").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const address = document.getElementById("address").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      if (!name || !secondName || !phone || !address || !email || !password) {
        return showError(messageEl, "Please fill out all fields");
      }

      if (!validateEmail(email)) {
        return showError(messageEl, "Please enter a valid email address");
      }

      if (password.length < 6) {
        return showError(messageEl, "Password must be at least 6 characters");
      }

      const users = JSON.parse(localStorage.getItem("users")) || [];

      if (users.some(u => u.email === email)) {
        return showError(messageEl, "Email already registered");
      }

      const user = { name, secondName, phone, address, email, password };
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));

      showSuccess(messageEl, "Registration successful! Redirecting to login...");
      setTimeout(() => window.location.href = "login.html", 1500);
    });
  }

  // ======== LOGIN PAGE ========
  if (path.includes("login.html")) {
    const loginForm = document.getElementById("login-form");
    const messageEl = document.getElementById("login-message");

    loginForm?.addEventListener("submit", (e) => {
      e.preventDefault();
      messageEl.textContent = "";
      messageEl.className = "message";

      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      if (!email || !password) {
        return showError(messageEl, "Please enter both email and password");
      }

      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find(u => u.email === email && u.password === password);

      if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        showSuccess(messageEl, "Login successful! Redirecting to dashboard...");
        setTimeout(() => window.location.href = "dashboard.html", 1500);
      } else {
        showError(messageEl, "Invalid email or password");
      }
    });
  }

  // ======== DASHBOARD PAGE ========
  if (path.includes("dashboard.html")) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const welcomeMessage = document.getElementById("welcome-message");

    if (!currentUser) {
      window.location.href = "login.html";
      return;
    }

    if (welcomeMessage) {
      welcomeMessage.textContent = `Welcome, ${currentUser.name} ${currentUser.secondName}!`;
    }

    const logoutBtn = document.getElementById("logout-btn");
    logoutBtn?.addEventListener("click", () => {
      localStorage.removeItem("currentUser");
      window.location.href = "login.html";
    });
  }

  // ======== Utility Functions ========
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function showError(element, message) {
    element.textContent = message;
    element.classList.remove("success-message");
    element.classList.add("error-message");
  }

  function showSuccess(element, message) {
    element.textContent = message;
    element.classList.remove("error-message");
    element.classList.add("success-message");
  }
});


