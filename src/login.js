// import { CONTACTS } from "./const.js";
import "./index.css";


if (!localStorage.getItem("contacts")) {

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
