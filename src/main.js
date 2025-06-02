import './index.css'
import { CONTACTS, GROUPES } from './const'
import { createIcons, icons } from 'lucide'


// Vérifie la connexion
const userId = parseInt(localStorage.getItem("connectedUserId"));
let connectedUser = JSON.parse(localStorage.getItem("connectedUser"));


// console.log (connectedUser.nom)

if (!userId || !connectedUser) {
    window.location.href = "/login.html";
    
}

// Assure que les données sont présentes dans connectedUser
if (!connectedUser.contacts) connectedUser.contacts = [];
if (!connectedUser.groupes) connectedUser.groupes = [];

const btnLogout = document.getElementById("btn-logout");
btnLogout.addEventListener("click", () => {
    sauvegarderUtilisateur();  // on enregistre avant de quitter
    localStorage.removeItem("connectedUserId");
    localStorage.removeItem("connectedUser");
    window.location.href = "/login.html";
});







const liste = document.querySelector('#liste-contactes')
const btnNouveauContact = document.querySelector("#btn-nouveau-contact");
const btnFermer = document.querySelector("#btn-fermer");
const btnAnnuler = document.querySelector("#btn-annuler");
const sidebar = document.querySelector("#sidebar-ajout");
const formAjout = document.querySelector("#form-ajout")
const formGroup = document.querySelector("#form-groupe")
const btnGroupes = document.querySelector("#btn-groups");
const showBtnAddGroup = document.querySelector("#show-btn-add-group")
const btnShowFormGroupe = document.getElementById("show-btn-add-group");
const sidebarAjoutGroupe = document.getElementById("sidebar-ajout-groupe");
const btnCancelGroupe = document.getElementById("cancel-groupe");
const btnArchives = document.querySelector("#btn-archives");
const btnMessage = document.querySelector("#btn-msg");
const btnDiffusion = document.querySelector("#diffusion");
const nameMenu = document.querySelector("#nom-menu")
let contactActif = null;
let brouillons = JSON.parse(localStorage.getItem("brouillons")) || {};




createIcons({ icons });

function sauvegarderUtilisateur() {
    // Sauvegarder dans connectedUser (comme avant)
    localStorage.setItem("connectedUser", JSON.stringify(connectedUser));

    // Mettre à jour la version dans "contacts"
    const allUsers = JSON.parse(localStorage.getItem("contacts")) || [];
    const index = allUsers.findIndex(u => u.id === connectedUser.id);

    if (index !== -1) {
        allUsers[index] = connectedUser;
    } else {
        allUsers.push(connectedUser);
    }

    localStorage.setItem("contacts", JSON.stringify(allUsers));
}



function sauvegarderBrouillon(contact) {
    const input = document.querySelector("#message-input");

    // Recharger la valeur sauvegardée s'il y en a une
    if (brouillons[contact.id]) {
        input.value = brouillons[contact.id];
    }

    // Sauvegarder la nouvelle valeur à chaque frappe
    input.addEventListener("input", () => {
        brouillons[contact.id] = input.value;
        localStorage.setItem("brouillons", JSON.stringify(brouillons));
    });
}



btnMessage.addEventListener('click', () => {
    btnMessage.style.backgroundColor = '#e0b44B'
    afficherContact()
});

function btnActive(activeBtn) {
    [btnMessage, btnArchives, btnGroupes, btnDiffusion].forEach(btn => {
        btn.style.backgroundColor = (btn === activeBtn) ? '#e0b44B' : '';
    });
}

function contactElement(contact) {
    const li = document.createElement('li');
    const messages = contact.messages || [];
    const dernierMessage = messages.length > 0 ? messages[messages.length - 1].texte : ""

    li.className = "contact-click flex items-center p-2 rounded-xl gap-3 hover:bg-gray-200 cursor-pointer";
    li.innerHTML = `
        <div  class="w-14 h-14 flex justify-center items-center  bg-gray-400 rounded-full">
            <p class="text-xm font-bold text-white">${contact.avatar}</p>
        </div>
        <div class="flex mt-1 flex-col flex-1">
            <span class="font-bold">${contact.prenom} ${contact.nom}</span>
            <span class="font-sm  text-slate-800">${dernierMessage}</span>
        </div>
        <div class="ml-auto">
            <p class="text-xm text-gray-400">${contact.heure}</p>
            ${contact.nonLus > 0 ? `
                <span class="bg-green-500 ml-3 text-gray-900 text-[15px] font-bold px-2 py-0.5 rounded-full">
                    ${contact.nonLus}
                </span>` : ''}
        
        </div>
    `;
    return li;
}


const inputRecherche = document.getElementById("recherche");

inputRecherche.addEventListener("input", () => {
    const terme = inputRecherche.value.trim().toLowerCase();
    afficherContactFiltre(terme);
});

function afficherContactFiltre(recherche) {
    nameMenu.className = "text-green-500 text-2xl font-bold";
    nameMenu.textContent = "Discussion";
    btnActive(btnMessage);

    let contacts = connectedUser.contacts.filter(c => !c.archive);

    if (recherche && recherche !== "*") {
        contacts = contacts.filter(contact => {
            const nomComplet = `${contact.prenom} ${contact.nom}`.toLowerCase();
            const telephone = contact.telephone.toLowerCase();
            return nomComplet.includes(recherche) || telephone.includes(recherche);
        });
    } else if (recherche === "*") {
        contacts.sort((a, b) => {
            const nomA = `${a.prenom} ${a.nom}`.toLowerCase();
            const nomB = `${b.prenom} ${b.nom}`.toLowerCase();
            return nomA.localeCompare(nomB);
        });
    }

    liste.innerHTML = '';

    contacts.forEach(contact => {
        const li = contactElement(contact);
        activerContact(li, contact);
        liste.appendChild(li);
    });
}

// diffusion
document.getElementById("diffusion").addEventListener("click", afficherListeDiffusion);
function contactDiffusionElement(contact) {
    const li = document.createElement('li');
    li.className = "flex items-center p-2 rounded-xl gap-3 hover:bg-gray-200";

    li.innerHTML = `
        <div class="w-14 h-14 flex justify-center items-center bg-gray-400 rounded-full">
            <p class="text-xm font-bold text-white">${contact.avatar}</p>
        </div>

        <div class="flex flex-col flex-1">
            <span class="font-bold">${contact.prenom} ${contact.nom}</span>
            <span class="font-bold">${contact.telephone} </span>

        </div>

        <div class="ml-auto">
            <input type="checkbox" class="w-5 h-5 text-green-500 rounded">
        </div>
    `;

    return li;
}
function afficherListeDiffusion() {
    nameMenu.className = "text-green-500 text-2xl font-bold";
    nameMenu.textContent = "Diffusion";
    btnActive(document.getElementById("diffusion"));

    liste.innerHTML = '';

    connectedUser.contacts
        .filter(c => !c.archive)
        .forEach(contact => {
            const li = contactDiffusionElement(contact);
            liste.appendChild(li);
        });
}

// liste des contact
function afficherContact() {
    nameMenu.className = "text-green-500 text-2xl font-bold"
    nameMenu.textContent = "Discussion"
    btnActive(btnMessage);
    liste.innerHTML = '';
    connectedUser.contacts
        .filter(contact => !contact.archive)
        .forEach(contact => {
            const li = contactElement(contact);
            activerContact(li, contact);
            liste.appendChild(li);
        });
}

//  affiche la confirmation  de l archivage d un contact
function showConfirmation(message, callback) {
    const modal = document.getElementById("custom-confirm");
    const text = document.getElementById("confirm-text");
    const btnYes = document.getElementById("btn-confirm-yes");
    const btnNo = document.getElementById("btn-confirm-no");

    text.textContent = message;
    modal.classList.remove("hidden");

    const cleanUp = () => {
        modal.classList.add("hidden");
        btnYes.replaceWith(btnYes.cloneNode(true));
        btnNo.replaceWith(btnNo.cloneNode(true));
    };

    btnYes.addEventListener("click", () => {
        cleanUp();
        callback(true);
    });

    btnNo.addEventListener("click", () => {
        cleanUp();
        callback(false);
    });
}
// activer un contact au click pour voir ses discussions
function activerContact(li, contact) {
    li.addEventListener("click", () => {
        document.querySelectorAll(".contact-click").forEach(el => {
            el.classList.remove("bg-gray-200");
        });
        li.classList.add("bg-gray-200");
        contactActif = contact;
        afficherPageDiscussion(contact);
    });
    sauvegarderUtilisateur();
}

function genererHeader(contact) {
    return `
        <div id="discussion-header" class="flex gap-3 border-b border-white p-2">
            <div class="w-10 h-10 flex justify-center items-center bg-gray-400 rounded-full">
                <p class="text-xm font-bold text-white">${contact.avatar}</p>
            </div>
            <div class="flex flex-col">
                <span class="font-bold">${contact.prenom} ${contact.nom}</span>
                <span class="text-sm text-green-600">en ligne</span>
            </div>
            <div class="flex gap-5 ml-auto">
                <div class="w-10 h-10 flex items-center justify-center border-2 border-orange-500 rounded-full">
                    <i class="fa-solid fa-delete-left text-orange-500"></i>
                </div>
                <div class="w-10 h-10 flex items-center justify-center border-2 border-gray-500 rounded-full archive-btn" data-id="${contact.id}">
                    <i class="fas fa-archive text-gray-500 text-xl cursor-pointer"></i>
                </div>
                <div class="w-10 h-10 flex items-center justify-center border-2 border-black rounded-full">
                    <i class="fa-solid fa-square text-black"></i>
                </div>
                <div class="w-10 h-10 flex items-center justify-center border-2 border-red-500 rounded-full">
                    <i class="fa-solid fa-trash text-xl text-red-500"></i>
                </div>
            </div>
        </div>
    `;
}
function initialiserBoutonsDiscussion(contact) {
    const archiveBtn = document.querySelector(".archive-btn");
    if (!archiveBtn) return;

    archiveBtn.addEventListener("click", () => {
        showConfirmation(`Archiver ${contact.prenom} ${contact.nom} ?`, (confirmer) => {
            if (confirmer) {
                contact.archive = true;
                afficherContact();
                const discussion = document.getElementById("discussion");
                discussion.innerHTML = `<p class="text-center w-full text-red-500 font-semibold">Contact archivé</p>`;
                setTimeout(() => discussion.innerHTML = "", 1500);
            }
        });
    });
}

function genererZoneMessages() {
    return `
        <div id="discussion-messages" class="flex flex-col flex-1 overflow-y-auto px-4 py-2 space-y-4"></div>
    `;
}

function genererFormulaire() {
    return `
        <form id="form-envoi-message" class="w-full flex mb-1 bg-section p-4 gap-2">
            <input id="message-input" type="text"
                class="w-full pl-5 pr-12 py-2 rounded-2xl bg-gray-200 text-black focus:outline-none" />
            <button type="submit" class="w-10 h-10 flex items-center justify-center rounded-full bg-green-500">
                <i data-lucide="arrow-right" class="text-white cursor-pointer"></i>
            </button>
        </form>
    `;
}


function afficherPageDiscussion(contact) {
    const discussion = document.getElementById("discussion");
    discussion.innerHTML = `
        ${genererHeader(contact)}
        ${genererZoneMessages()}
        ${genererFormulaire()}
    `;
    initialiserBoutonsDiscussion(contact);
    createIcons({ icons });
    sauvegarderBrouillon(contact);
    afficherMessages(contact);
    EnvoyerMessage(contact);
    sauvegarderUtilisateur()
}

function EnvoyerMessage(contact) {
    const form = document.getElementById("form-envoi-message");
    const input = document.getElementById("message-input");

    if (!form || !input) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const texte = input.value.trim();
        if (!texte) return;

        const nouveauMessage = {
            type: "envoye",
            texte: texte,
            heure: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        contact.messages.push(nouveauMessage);
        sauvegarderUtilisateur();
        input.value = "";
        delete brouillons[contact.id];
        afficherMessages(contact);
        afficherContact()

    });
}

function afficherMessages(contact) {
    const messageContainer = document.getElementById("discussion-messages");
    messageContainer.innerHTML = "";

    contact.messages.forEach(msg => {
        const div = document.createElement("div");

        if (msg.type === 'envoye') {
            div.className = "bg-[#42CB41] p-2 rounded-lg shadow-xl text-white max-w-xs self-end rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl rounded-br-none";
            div.innerHTML = `
                <div class="flex justify-between items-end text-[#004600] gap-3">
                    <p>${msg.texte}</p>
                    <span class="text-xs text-gray-300 whitespace-nowrap">${msg.heure}</span>
                    <i data-lucide="check-check" class="w-3 h-3  -ml-2"></i>
                </div>
            `;
        } else {
            div.className = "flex flex-col shadow-xl justify-between bg-white max-w-xs self-start p-2 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl rounded-bl-none";
            div.innerHTML = `
                <div class="flex items-end gap-2">
                    <p>${msg.texte}</p>
                    <span class="text-xs text-black">${msg.heure}</span>
                    <i data-lucide="check" class="w-3 h-3  -ml-1"></i>
                </div>
            `;
        }
        createIcons({ icons });

        messageContainer.appendChild(div);
        messageContainer.scrollTop = messageContainer.scrollHeight

        // sauvegarderBrouillon(contact)
        sauvegarderUtilisateur();


    });
}



// afficher les contact archiver
function afficherArchives() {
    nameMenu.className = "text-green-500 text-2xl font-bold"
    nameMenu.textContent = "Liste des contacts archivés"
    btnActive(btnArchives);
    liste.innerHTML = '';
    connectedUser.contacts
        .filter(contact => contact.archive)
        .forEach(contact => {

            const li = document.createElement('li');
            li.className = "archived-contact flex gap-3";

            li.innerHTML = `
            <div  class="w-14 h-14 flex justify-center items-center  bg-gray-400 rounded-full">
            <p class="text-xm font-bold text-white">${contact.avatar}</p>
            </div>
            <div class="flex flex-col flex-1">
            <span class="font-medium">${contact.prenom} ${contact.nom}</span>
            <span class="font-sm">${contact.telephone}</span>
            </div>
            <div class="ml-auto flex gap-2 items-center">
            <p class="text-xm text-gray-400">${contact.heure}</p>
            <i class="fas fa-rotate-left cursor-pointer text-blue-500" title="Désarchiver" data-id="${contact.id}"></i>
            </div>
        `;

            li.querySelector("i.fas.fa-rotate-left").addEventListener("click", () => {
                contact.archive = false;
                sauvegarderUtilisateur();
                afficherArchives();
            });

            liste.appendChild(li);
        });
}
btnArchives.addEventListener("click", () => {
    afficherArchives();
});

afficherContact()

function groupElement(groupe) {
    const li = document.createElement('li');
    li.className = "group-click flex gap-3 p-2 rounded-xl hover:bg-gray-200";

    // Calcul du nombre de membres
    const nbMembres = groupe.membres.length;
    // <span class="font-sm">${groupe.message}</span>

    li.innerHTML = `
            <div class="w-10 h-10 flex justify-center items-center bg-gray-400 rounded-full">
                <p class="text-xm font-bold text-white">${groupe.avatar}</p>
            </div>
            <div class="flex flex-col flex-1">
                <span class="font-medium">${groupe.nom}</span>
                <span class="text-sm text-gray-700">${nbMembres} membre${nbMembres > 1 ? 's' : ''} - Admin : Vous</span>
            </div>
            <div class="ml-auto">
                <p class="text-xm text-gray-400">${groupe.heure}</p>
                ${groupe.nonLus > 0 ? `
                    <span class="bg-green-500 ml-3 text-gray-900 text-[15px] font-bold px-2 py-0.5 rounded-full">
                        ${groupe.nonLus}
                    </span>` : ''}
            </div>
        `;

    return li;
}

// 
function activerGroupe(li, groupe) {
    li.addEventListener("click", () => {
        document.querySelectorAll(".group-click").forEach(el => {
            el.classList.remove("bg-gray-200");
        });
        li.classList.add("bg-gray-200");
        afficherGroupDiscussion(groupe);
        // console.log(groupe.nom);

    });
}

function genererGroupHeader(groupe, connectedUserId) {
    const membresNoms = groupe.membres.map(membre => {
        const utilisateur = connectedUser.contacts.find(u => u.id === membre.id);
        if (!utilisateur) return '';

        if (membre.id === connectedUserId && membre.role === 'admin') {
            return 'Admin : Vous';
        }

        const roleLabel = membre.role === 'admin' ? 'Admin' : 'Membre';
        return `${roleLabel} : ${utilisateur.prenom} ${utilisateur.nom}`;
    }).join(', ');

    return `
        <div id="discussion-header" class="flex flex-col gap-2 border-b border-white p-2">
            <div class="flex gap-3 items-center">
                <div class="w-10 h-10 flex justify-center items-center bg-gray-400 rounded-full">
                    <p class="text-xm font-bold text-white">${groupe.avatar}</p>
                </div>
                <div class="flex flex-col">
                    <span class="font-bold">${groupe.nom}</span>
                    <span class="text-sm text-green-600">en ligne</span>
                </div>
                <div class="flex gap-5 ml-auto">
                    <div class="w-10 h-10 flex items-center justify-center border-2 border-orange-500 rounded-full">
                        <i class="fa-solid fa-delete-left text-orange-500"></i>
                    </div>
                    <div class="w-10 h-10 flex items-center justify-center border-2 border-gray-500 rounded-full archive-btn" data-id="${groupe.id}">
                        <i class="fas fa-archive text-gray-500 text-xl cursor-pointer"></i>
                    </div>
                    <div class="w-10 h-10 flex items-center justify-center border-2 border-black rounded-full">
                        <i class="fa-solid fa-square text-black"></i>
                    </div>
                    <div class="w-10 h-10 flex items-center justify-center border-2 border-red-500 rounded-full">
                        <i class="fa-solid fa-trash text-xl text-red-500"></i>
                    </div>
                </div>
            </div>
            <div class="text-sm text-gray-500 italic pl-12">
                ${membresNoms}
            </div>
        </div>
    `;
}

function afficherGroupDiscussion(groupe) {
    const discussion = document.getElementById("discussion");
    const connectedUserId = parseInt(localStorage.getItem("connectedUserId"));
    discussion.innerHTML = `
        ${genererGroupHeader(groupe, connectedUserId)}
        ${genererZoneMessages()}
        ${genererFormulaire()}
    `;
    // initialiserBoutonsDiscussion(contact);
    createIcons({ icons });
    afficherGroupeMessages(groupe);
    EnvoiGroupMessage(groupe);
}

function EnvoiGroupMessage(groupe) {
    const form = document.getElementById("form-envoi-message");
    const input = document.getElementById("message-input");

    if (!form || !input) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const texte = input.value.trim();
        if (!texte) return;

        const nouveauMessage = {
            type: "envoye",
            texte: texte,
            heure: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            expediteurId: connectedUser.id
        };

        groupe.messages.push(nouveauMessage);
        sauvegarderUtilisateur();
        input.value = "";
        delete brouillons[groupe.id];
        afficherGroupeMessages(groupe);

    });
}



function afficherGroupeMessages(groupe) {
    const messageContainer = document.getElementById("discussion-messages");
    messageContainer.innerHTML = "";

    groupe.messages.forEach(msg => {
        const div = document.createElement("div");

        if (msg.type === 'envoye') {
            div.className = "bg-[#42CB41] p-2 rounded-lg shadow-xl text-white max-w-xs self-end rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl rounded-br-none";
            div.innerHTML = `
                <div class="flex justify-between items-end text-[#004600] gap-3">
                    <p>${msg.texte}</p>
                    <span class="text-xs text-gray-300 whitespace-nowrap">${msg.heure}</span>
                    <i data-lucide="check-check" class="w-3 h-3  -ml-2"></i>
                </div>
            `;
        } else {
            let nomExpediteur = "Inconnu";
            if (msg.expediteurId !== undefined) {
                const expediteur = UTILISATEURS.find(user => user.id === msg.expediteurId);
                if (expediteur) {
                    nomExpediteur = expediteur.prenom;
                }
            }

            div.className = "flex flex-col shadow-xl justify-between bg-white max-w-xs self-start p-2 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl rounded-bl-none";
            div.innerHTML = `
                <p class="border-b w-fit text-sm border-black font-bold">${nomExpediteur}</p>
                <div class="flex items-end gap-2">
                    <p>${msg.texte}</p>
                    <span class="text-xs text-black">${msg.heure}</span>
                    <i data-lucide="check" class="w-3 h-3  -ml-1"></i>
                </div>
            `;
        }

        messageContainer.appendChild(div);

    });
    createIcons({ icons });
    messageContainer.scrollTop = messageContainer.scrollHeight;
    sauvegarderBrouillon(groupe)
    sauvegarderUtilisateur();
}


function afficherGroupes() {
    nameMenu.className = "text-green-500 text-2xl font-bold"
    nameMenu.textContent = "Liste des groupes"
    btnActive(btnGroupes)
    liste.innerHTML = '';

    connectedUser.groupes
        .forEach(groupe => {
            const li = groupElement(groupe)
            activerGroupe(li, groupe)
            liste.appendChild(li);
        });
}

btnGroupes.addEventListener("click", () => {
    showBtnAddGroup.classList.remove("hidden");
    afficherGroupes();
});

// ajout contact
function genererNomUnique(prenom, nom) {
    let compteur = 1;
    let nomExistant = true;
    let prenomUnique = prenom;
    let nomUnique = nom;
    while (nomExistant) {
        const existe = connectedUser.contacts.some(c =>
            c.prenom === prenomUnique && c.nom === nomUnique
        );
        if (existe) {
            compteur++;
            prenomUnique = `${prenom}`;
            nomUnique = `${nom}${compteur}`;
        } else {
            nomExistant = false;
        }
    }
    return { prenom: prenomUnique, nom: nomUnique };
}
function estNumeroValide(telephone) {
    return /^\d+$/.test(telephone);
}

function validerContact(nom, prenom, telephone) {
    const erreurs = {};

    if (!nom) erreurs.nom = "Le nom est obligatoire.";
    if (!prenom) erreurs.prenom = "Le prénom est obligatoire.";
    if (!telephone) {
        erreurs.telephone = "Le numéro est obligatoire.";
    } else if (!estNumeroValide(telephone)) {
        erreurs.telephone = "Le numéro ne doit contenir que des chiffres.";
    } else if (connectedUser.contacts.some(c => c.telephone === telephone)) {
        erreurs.telephone = `Ce numéro existe deja.`;
    }

    return erreurs;
}

function ValidationTelephone() {
    const input = document.querySelector("#telephone-contact");
    const divErreur = document.querySelector("#erreur-telephone");

    input.addEventListener("input", () => {
        const valeur = input.value.trim();

        if (!estNumeroValide(valeur) && valeur !== "") {
            input.classList.add("border-red-500");
            divErreur.textContent = "Seuls les chiffres sont autorisés.";
        } else {
            input.classList.remove("border-red-500");
            divErreur.textContent = "";
        }
    });
}

ValidationTelephone()

function afficherErreurs(erreurs) {
    const champs = ['nom', 'prenom', 'telephone'];

    champs.forEach(champ => {
        const input = document.querySelector(`#${champ}-contact`);
        const divErreur = document.querySelector(`#erreur-${champ}`);

        if (erreurs[champ]) {
            input.classList.add("border-red-500");
            divErreur.textContent = erreurs[champ];
        } else {
            input.classList.remove("border-red-500");
            divErreur.textContent = "";
        }
    });
}

const fermerSidebar = (sidebar, form) => {
    sidebar.classList.add("-translate-x-full");
    form.reset();
}
btnAnnuler.addEventListener("click", () => fermerSidebar(sidebar, formAjout));
btnFermer.addEventListener("click", () => fermerSidebar(sidebar, formAjout));

formAjout.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputNom = document.querySelector("#nom-contact");
    const inputPrenom = document.querySelector("#prenom-contact");
    const inputNumero = document.querySelector("#telephone-contact");

    const nom = inputNom.value.trim();
    const prenom = inputPrenom.value.trim();
    const numero = inputNumero.value.trim();

    const erreurs = validerContact(nom, prenom, numero);
    afficherErreurs(erreurs);

    if (Object.keys(erreurs).length > 0) return;

    const { prenom: prenomFinal, nom: nomFinal } = genererNomUnique(prenom, nom);
    const avatar = prenomFinal[0] + nomFinal[0];

    const nouveauContact = {
        id: Date.now(),
        nom: nomFinal,
        prenom: prenomFinal,
        telephone: numero,
        heure: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        nonLus: 0,
        avatar: avatar.toUpperCase(),
        messages: [],
        archive: false
    };

    connectedUser.contacts
        .unshift(nouveauContact);
    sauvegarderUtilisateur();
    afficherContact();
    afficherErreurs({});
    fermerSidebar(sidebar, formAjout);
});


btnNouveauContact.addEventListener("click", () => {
    sidebar.classList.remove("-translate-x-full");
    const inputNom = document.querySelector('#nom-contact')
    inputNom.focus()
});

btnShowFormGroupe.addEventListener("click", () => {
    sidebarAjoutGroupe.classList.remove("-translate-x-full");
    const inputNom = document.querySelector('#groupe-nom')
    inputNom.focus()
    listeContact();
});

function listeContact() {
    const ul = document.getElementById("liste-checkbox-contacts");
    ul.innerHTML = '';

    connectedUser.contacts
        .forEach(contact => {
            const li = document.createElement("li");
            li.className = "flex items-center gap-3";
            li.innerHTML = `
                <input type="checkbox" value="${contact.id}" class="form-checkbox w-4 h-4 accent-green-500">
                <div  class="w-14 h-14 flex justify-center items-center  bg-gray-400 rounded-full">
                    <p class="text-xm font-bold text-white">${contact.avatar}</p>
                </div>
                <span class="font-medium">${contact.prenom} ${contact.nom}</span>
                `;
            ul.appendChild(li);
        });
}

function genererNomGroupeUnique(nom) {
    let compteur = 1;
    let nomUnique = nom;
    let existe = true;

    while (existe) {
        existe = connectedUser.groupes
            .some(g => g.nom === nomUnique);
        if (existe) {
            compteur++;
            nomUnique = `${nom}${compteur}`;
        }
    }

    return nomUnique;
}

function validerGroupe(nom, membres) {
    const erreurs = {};
    if (!nom) erreurs.nom = "Le nom du groupe est obligatoire.";
    if (membres.length < 3) erreurs.membres = "Sélectionnez au moins 2 membres (hors vous).";
    return erreurs;
}

function afficherErreursGroupe(erreurs) {
    const inputNom = document.getElementById("groupe-nom");
    const divNomErreur = document.getElementById("erreur-nom-groupe") || creerDivErreur(inputNom, "erreur-nom-groupe");

    if (erreurs.nom) {
        inputNom.classList.add("border-red-500");
        divNomErreur.textContent = erreurs.nom;
    } else {
        inputNom.classList.remove("border-red-500");
        divNomErreur.textContent = "";
    }

    const listeCheckbox = document.getElementById("liste-checkbox-contacts");
    const divMembresErreur = document.getElementById("erreur-membres-groupe") || creerDivErreur(listeCheckbox, "erreur-membres-groupe");

    if (erreurs.membres) {
        divMembresErreur.textContent = erreurs.membres;
        listeCheckbox.classList.add("border-red-500");
    } else {
        divMembresErreur.textContent = "";
        listeCheckbox.classList.remove("border-red-500");
    }
}

function creerDivErreur(afterElement, id) {
    const div = document.createElement("div");
    div.className = "text-red-500 text-sm mt-1";
    div.id = id;
    afterElement.parentNode.appendChild(div);
    return div;
}

btnCancelGroupe.addEventListener("click", () => fermerSidebar(sidebarAjoutGroupe, formGroup));


formGroup.addEventListener("submit", (e) => {
    e.preventDefault();

    const nomSaisi = document.getElementById("groupe-nom").value.trim();
    const description = document.getElementById("groupe-description").value.trim();
    const checkedInputs = document.querySelectorAll("#liste-checkbox-contacts input[type='checkbox']:checked");

    let membresIds = Array.from(checkedInputs).map(input => parseInt(input.value));

    if (!membresIds.includes(userId)) {
        membresIds.unshift(userId);
    }

    const erreurs = validerGroupe(nomSaisi, membresIds);
    afficherErreursGroupe(erreurs);

    if (Object.keys(erreurs).length > 0) return;

    const nomUnique = genererNomGroupeUnique(nomSaisi);
    const avatar = nomUnique[0]
    let membres = membresIds.map(id => ({
        id: id,
        role: id === connectedUser.id ? "admin" : "membre"
    })
    )
    console.log(membres);


    const nouveauGroupe = {
        id: Date.now(),
        nom: nomUnique,
        description: description,
        message: "Nouveau groupe créé",
        messages: [],
        heure: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        nonLus: 0,
        membres: membres,
        avatar: avatar,
        expediteurId: connectedUser.id
    };

    connectedUser.groupes
        .unshift(nouveauGroupe);
    sauvegarderUtilisateur();
    afficherGroupes();
    fermerSidebar(sidebarAjoutGroupe, formGroup)
});


