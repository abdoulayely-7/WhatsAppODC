import { UTILISATEURS } from './const.js';

document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim(); 

  const user = UTILISATEURS.find(u => u.email === username && u.motDePasse === password);

  if (user) {
    localStorage.setItem("connectedUserId", user.id);
    window.location.href = "/";
  } else {
    alert("Identifiants invalides !");
  }
});
