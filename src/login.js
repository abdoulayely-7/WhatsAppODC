// À faire une seule fois pour initialiser
import { CONTACTS } from "./const.js";





// Initialiser CONTACTS dans le localStorage **uniquement s’il n’existe pas déjà**
if (!localStorage.getItem("contacts")) {
  // const utilisateurExemple = {
  //   id: Date.now(),
  //   nom: "Dupont",
  //   prenom: "Jean",
  //   telephone: "99",
  //   contacts: [],
  //   groupes: []
  // };
  localStorage.setItem("contacts", JSON.stringify(CONTACTS));
}


document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const usernameNumber = document.getElementById("usernameNumber").value.trim();

  const allUsers = JSON.parse(localStorage.getItem("contacts")) || [];
  const user = allUsers.find(u => u.telephone === usernameNumber);


  if (user) {
    localStorage.setItem("connectedUserId", user.id);
    localStorage.setItem("connectedUser", JSON.stringify(user));
    window.location.href = "/";
  } else {
    alert("Identifiants invalides !");
  }
});
