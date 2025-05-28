import './index.css'
import { CONTACTS } from './const'
import { GROUPES } from './const'

import { createIcons, icons } from 'lucide'

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
const nameMenu = document.querySelector("#nom-menu")
let contactActif = null;



createIcons({ icons });


btnMessage.addEventListener('click', () => {
    btnMessage.style.backgroundColor = '#e0b44B'
    afficherContact()
});








function btnActive(activeBtn) {
    [btnMessage, btnArchives, btnGroupes].forEach(btn => {
        btn.style.backgroundColor = (btn === activeBtn) ? '#e0b44B' : '';
    });
}
function contactElement(contact) {
    const li = document.createElement('li');
    li.className = "contact-click flex items-center p-2 rounded-xl gap-3 hover:bg-gray-200 cursor-pointer";
    li.innerHTML = `
        <div  class="w-14 h-14 flex justify-center items-center  bg-gray-400 rounded-full">
            <p class="text-xm font-bold text-white">${contact.avatar}</p>
        </div>
        <div class="flex mt-1 flex-col flex-1">
            <span class="font-bold">${contact.prenom} ${contact.nom}</span>
            <span class="font-sm  text-slate-800">${contact.telephone}</span>
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
function activerContact(li, contact) {
    li.addEventListener("click", () => {
        document.querySelectorAll(".contact-click").forEach(el => {
            el.classList.remove("bg-gray-200");
        });
        li.classList.add("bg-gray-200");
        contactActif = contact;
        afficherHeaderDiscussion(contact);
    });
}

function afficherContact() {
    nameMenu.className = "text-green-500 text-2xl font-bold"
    nameMenu.textContent = "Discussion"
    btnActive(btnMessage);
    liste.innerHTML = '';
    CONTACTS
        .filter(contact => !contact.archive)
        .forEach(contact => {
            const li = contactElement(contact);
            activerContact(li, contact);
            liste.appendChild(li);
        });
}

function afficherHeaderDiscussion(contact) {

    const header = document.getElementById("discussion-header");
    header.innerHTML = `
        
        <div  class="w-10 h-10 flex justify-center items-center  bg-gray-400 rounded-full">
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
    `;

    header.classList.remove("hidden");

    header.querySelector(".archive-btn").addEventListener("click", () => {
        const confirmer = confirm(`Archiver ${contact.prenom} ${contact.nom} ?`);
        if (confirmer) {
            contact.archive = true;
            afficherContact();
            header.innerHTML = `<p class="text-center w-full text-red-500 font-semibold">Contact archivé</p>`;
            setTimeout(() => header.classList.add("hidden"), 1500);
        }
    });
}



function afficherArchives() {
    nameMenu.className = "text-green-500 text-2xl font-bold"
    nameMenu.textContent = "Liste des contacts archivés"
    btnActive(btnArchives);
    liste.innerHTML = '';
    CONTACTS
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
                afficherArchives();
            });

            liste.appendChild(li);
        });
}

btnArchives.addEventListener("click", () => {
    afficherArchives();
});



afficherContact()

// todo 
function afficherGroupes() {
    nameMenu.className = "text-green-500 text-2xl font-bold"
    nameMenu.textContent = "Liste des groupes"
    btnActive(btnGroupes)
    liste.innerHTML = '';

    // const p = document.createElement('p');
    // p.className = "text-[#42CB41] text-xl font-bold";
    // p.textContent = "Liste des groupes ";
    // liste.appendChild(p);

    GROUPES.forEach(groupe => {
        const li = document.createElement('li');
        li.className = "group-click flex gap-3 p-2 rounded-xl hover:bg-gray-200";

        // Calcul du nombre de membres
        const nbMembres = groupe.membres.length;
        // <span class="font-sm">${groupe.message}</span>

        li.innerHTML = `
            <img src="${groupe.avatar}" alt="discussion" class="w-14 h-14 rounded-full">
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

        liste.appendChild(li);
    });
}

btnGroupes.addEventListener("click", () => {
    console.log("showBtnAddGroup", showBtnAddGroup);

    showBtnAddGroup.classList.remove("hidden");
    afficherGroupes();
});

//FIXME--------------------------------------------------------- ajout de contact----------------------------------------------

function genererNomUnique(prenom, nom) {
    let compteur = 1;
    let nomExistant = true;
    let prenomUnique = prenom;
    let nomUnique = nom;
    while (nomExistant) {
        const existe = CONTACTS.some(c =>
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
    } else if (CONTACTS.some(c => c.telephone === telephone)) {
        erreurs.telephone = "Ce numéro existe déjà.";
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

const fermerSidebar = () => {
    sidebar.classList.add("-translate-x-full");
    formAjout.reset();
}
btnAnnuler.addEventListener("click", fermerSidebar);
btnFermer.addEventListener("click", fermerSidebar);
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

    CONTACTS.unshift(nouveauContact);
    afficherContact();
    afficherErreurs({});
    fermerSidebar();
});


btnNouveauContact.addEventListener("click", () => {
    sidebar.classList.remove("-translate-x-full");
    const inputNom = document.querySelector('#nom-contact')
    inputNom.focus()
});

// [btnFermer, btnAnnuler].forEach(btn => {
//     btn.addEventListener("click", () => {
//         sidebar.classList.add("-translate-x-full");
//     });
// });


btnShowFormGroupe.addEventListener("click", () => {
    sidebarAjoutGroupe.classList.remove("-translate-x-full");
    listeContact();
});

btnCancelGroupe.addEventListener("click", () => {
    sidebarAjoutGroupe.classList.add("-translate-x-full");
});

function listeContact() {
    const ul = document.getElementById("liste-checkbox-contacts");
    ul.innerHTML = '';

    CONTACTS.forEach(contact => {
        const li = document.createElement("li");
        li.className = "flex items-center gap-3";
        li.innerHTML = `
            <input type="checkbox" value="${contact.id}" class="form-checkbox w-4 h-4 accent-green-500">
            <div  class="w-14 h-14 flex justify-center items-center  bg-gray-400 rounded-full">
                <p class="text-xm font-bold text-white">${contact.avatar}</p>
            </div>
            <span class="font-medium">${contact.nom}</span>
            `;
        ul.appendChild(li);
    });
}

function validerGroupe(nom, membres) {
    const erreurs = {};

    if (!nom) {
        erreurs.nom = "Le nom est obligatoire.";
    }

    if (membres.length < 3) {
        erreurs.membres = "Veuillez sélectionner au moins 2 membres (hors vous).";
    }

    return erreurs;
}


function afficherErreursGroupe(erreurs) {
    const inputNom = document.getElementById("groupe-nom");
    const erreurNom = document.getElementById("erreur-groupe-nom");
    const erreurMembres = document.getElementById("erreur-groupe-membres");

    if (erreurs.nom) {
        inputNom.classList.add("border-red-500");
        erreurNom.textContent = erreurs.nom;
    } else {
        inputNom.classList.remove("border-red-500");
        erreurNom.textContent = "";
    }

    if (erreurs.membres) {
        erreurMembres.textContent = erreurs.membres;
    } else {
        erreurMembres.textContent = "";
    }
}


formGroup.addEventListener("submit", (e) => {
    e.preventDefault();

    const nom = document.getElementById("groupe-nom").value.trim();
    const description = document.getElementById("groupe-description").value.trim();

    const checkedInputs = document.querySelectorAll("#liste-checkbox-contacts input[type='checkbox']:checked");
    let membres = Array.from(checkedInputs).map(input => parseInt(input.value));

    if (!membres.includes(utilisateurActif.id)) {
        membres.unshift(utilisateurActif.id);
    }

    if (!nom || membres.length < 3) {
        alert("Veuillez entrer un nom et sélectionner au moins 2 membre.");
        return;
    }

    const nouveauGroupe = {
        id: Date.now(),
        nom,
        description,
        message: "Nouveau groupe créé",
        messages: [],
        heure: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        nonLus: 0,
        membres,
        avatar: "https://i.pravatar.cc/40?u=" + Date.now()
    };

    GROUPES.unshift(nouveauGroupe);
    console.log(nouveauGroupe);

    formGroup.reset();
    sidebarAjoutGroupe.classList.add("-translate-x-full");

    afficherGroupes();
});



const utilisateurActif = {
    id: 0, // à adapter selon ton système réel
    nom: "Admin",
    prenom: "Moi"
};
