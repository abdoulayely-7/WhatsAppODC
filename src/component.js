
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

export function btnActive(activeBtn) {
    [btnMessage, btnArchives, btnGroupes, btnDiffusion].forEach(btn => {
        btn.style.backgroundColor = (btn === activeBtn) ? '#e0b44B' : '';
    });
}
export function contactElement(contact) {
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
export function contactDiffusionElement(contact) {
    const li = document.createElement('li');
    li.className = "flex items-center p-2 rounded-xl gap-3 hover:bg-gray-200";

    li.innerHTML = `
        <!-- Avatar -->
        <div class="w-14 h-14 flex justify-center items-center bg-gray-400 rounded-full">
            <p class="text-xm font-bold text-white">${contact.avatar}</p>
        </div>

        <!-- Nom -->
        <div class="flex flex-col flex-1">
            <span class="font-bold">${contact.prenom} ${contact.nom}</span>
        </div>

        <!-- Checkbox -->
        <div class="ml-auto">
            <input type="checkbox" class="w-5 h-5 text-green-500 rounded">
        </div>
    `;

    return li;
}

export function afficherArchives() {
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

export function genererHeader(contact) {
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
export function genererZoneMessages() {
    return `
        <div id="discussion-messages" class="flex flex-col flex-1 overflow-y-auto px-4 py-2 space-y-4"></div>
    `;
}

export function afficherMessages(contact) {
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
        messageContainer.scrollTop = messageContainer.scrollHeight;

    });
}

export function genererFormulaire() {
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

