// public/login.bundle.js

export const CONTACTS = [
    {

        id: 1,
        nom: "Diop",
        prenom: "Khass",
        telephone: "77",
        heure: "22:13",
        nonLus: 3,
        avatar: "KD",
        messages: [
            { type: 'recu', texte: "fils", heure: "22:13" },
            { type: 'envoye', texte: "oui tete ", heure: "22:17" }
        ],
        archive: false

    },

    {
        id: 2,
        nom: "Diop",
        prenom: "Khass",
        telephone: "775711611",
        heure: "22:13",
        nonLus: 0,
        avatar: "KD",
        messages: [
            { type: 'recu', texte: "fils", heure: "22:13" },
            { type: 'envoye', texte: "oui boy ", heure: "22:17" }
        ],
        archive: false

    },
];
export const GROUPES = [
    {
        id: 2,
        nom: "Foot",
        description: "Groupe foot",
        message: "Bonjour",
        messages: [],
        heure: "18:47",
        nonLus: 0,
        membres: [
            { id: 2, role: "admin" },
            { id: 1, role: "membre" }
        ],
        vatar: "T",

    },
    {
        id: 1,
        nom: "Travail",
        description: "Groupe familial",
        message: "Bonjour",
        messages: [],
        heure: "18:47",
        nonLus: 0,
        membres: [
            { id: 2, role: "admin" },
            { id: 1, role: "membre" }
        ],
        vatar: "T",
    },

];

if (!localStorage.getItem("contacts")) {
  localStorage.setItem("contacts", JSON.stringify(CONTACTS));
}

document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const usernameNumber = document.getElementById("usernameNumber").value.trim();
  const allUsers = JSON.parse(localStorage.getItem("contacts")) || [];
  const user = allUsers.find((u) => u.telephone === usernameNumber);

  if (user) {
    localStorage.setItem("connectedUserId", user.id);
    localStorage.setItem("connectedUser", JSON.stringify(user));
    window.location.href = "/";
  } else {
    alert("Identifiants invalides !");
  }
});
