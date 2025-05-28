import {CONTACTS, GROUPES} from "./const.js";

export function createElement(tag, props = {}, content = "") {
    const el = document.createElement(tag);

    const fragment = document.createDocumentFragment();
    if (typeof tag !== "string") return null;
    // Gestion de v-if
    if ('vIf' in props && !props.vIf) return null;

    // Gestion de v-for (retourne un fragment)
    if ('vFor' in props) {
        const { each, render } = props.vFor;

        console.log(render)
        each.forEach((item) => {
            const child = render(item);
            if (child instanceof Node) {
                fragment.appendChild(child);
            }
        });
        // return fragment;
    }


    for (const key in props) {
        const value = props[key];

        // Classes
        if (key === "class" || key === "className") {
            el.className = Array.isArray(value) ? value.join(" ") : value;
        }

        // Événements
        else if (key.startsWith("on") && typeof value === "function") {
            const eventName = key.slice(2).toLowerCase();
            el.addEventListener(eventName, value);
        }

        // v-show => toggle `display: none`
        else if (key === "vShow") {
            el.style.display = value ? "" : "none";
        }

        // vIf et vFor
        else if (key === "vIf" || key === "vFor") {
            continue;
        }

        // :attr => dynamic binding
        else if (key.startsWith(":")) {
            const realAttr = key.slice(1);
            el.setAttribute(realAttr, value);
        }

        // style objet
        else if (key === "style" && typeof value === "object") {
            Object.assign(el.style, value);
        }

        // Attribut HTML classique
        else {
            el.setAttribute(key, value);
        }
    }

    // Contenu : string | Node | array
    if (Array.isArray(content)) {
        content.forEach(item => {
            if (typeof item === "string") {
                el.appendChild(document.createTextNode(item));
            } else if (item instanceof Node) {
                el.appendChild(item);
            }
        });
    } else if (typeof content === "string" || typeof content === "number") {
        el.textContent = content;
        // el.appendChild(document.createTextNode(content));
    } else if (content instanceof Node) {
        el.appendChild(content);
    }

    // Méthodes pour chaînage
    el.addElement = function (tag, props = {}, content = "") {
        const newEl = createElement(tag, props, content);
        this.appendChild(newEl);
        return this;
    };
    el.addNode = function (node) {
        this.appendChild(node);
        return this;
    };

    return el.addNode(fragment);
}


export const sidebar = createElement("div", {
    id: "sidebar-ajout",
    class: [
        "fixed", "top-0", "left-0", "h-full", "w-[400px]", "bg-white", "shadow-lg",
        "p-6", "z-50", "transform", "-translate-x-full", "transition-transform", "duration-300"
    ]
}, [

    // --- Header ---
    createElement("div", { class: "flex justify-between items-center mb-4" }, [
        createElement("h2", { class: "text-xl font-bold" }, "Ajouter un contact"),
        createElement("button", {
            id: "btn-fermer",
            class: "text-gray-500 text-2xl",
            onclick: () => sidebar.classList.add("-translate-x-full")
        }, "x")
    ]),

    // --- Formulaire ---
    createElement("form", {
        id: "form-ajout",
        class: "space-y-4",
        onsubmit: (e) => {
            e.preventDefault();
            console.log("Formulaire soumis !");
            sidebar.classList.add("-translate-x-full");
        }
    }, [

        // Champ Nom
        createElement("div", {}, [
            createElement("label", { class: "block text-sm font-medium text-gray-700" }, "Nom"),
            createElement("input", {
                name: "nom",
                required: true,
                type: "text",
                class: "w-full mt-1 p-2 border border-gray-300 rounded"
            })
        ]),

        // Champ Avatar
        createElement("div", {}, [
            createElement("label", { class: "block text-sm font-medium text-gray-700" }, "Avatar (URL)"),
            createElement("input", {
                name: "avatar",
                placeholder: "https://...",
                type: "file",
                class: "w-full mt-1 p-2 border border-gray-300 rounded"
            })
        ]),

        // Champ Message
        createElement("div", {}, [
            createElement("label", { class: "block text-sm font-medium text-gray-700" }, "Message"),
            createElement("input", {
                name: "message",
                type: "text",
                class: "w-full mt-1 p-2 border border-gray-300 rounded"
            })
        ]),

        // Boutons
        createElement("div", { class: "flex justify-end gap-3 mt-6" }, [
            createElement("button", {
                type: "button",
                id: "btn-annuler",
                class: "text-gray-600 hover:underline",
                onclick: () => sidebar.classList.add("-translate-x-full")
            }, "Annuler"),
            createElement("button", {
                type: "submit",
                class: "bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            }, "Ajouter")
        ])
    ])
]);

// dans le main
// import { sidebar } from './component.js';
//
// document.body.appendChild(sidebar);
//
//
// document.addEventListener("DOMContentLoaded", () => {
//     const btnNouveau = document.getElementById("btn-nouveau");
//     if (btnNouveau) {
//         btnNouveau.addEventListener("click", () => {
//             sidebar.classList.remove("-translate-x-full");
//         });
//     }
// });


// function afficherGroupes() {
//     liste.innerHTML = '';
//     GROUPES.forEach(groupe => {
//         const li = document.createElement('li');
//         li.className = "p-4 border border-gray-300 rounded-md bg-white";
//
//         const membres = groupe.membres.map(id => {
//             const contact = CONTACTS.find(c => c.id === id);
//             return contact ? `<li class="text-sm text-gray-600">${contact.nom}</li>` : '';
//         }).join('');
//
//         li.innerHTML = `
//       <h3 class="text-lg font-bold text-gray-800">${groupe.nom}</h3>
//       <p class="text-sm text-gray-500 mb-2">${groupe.description}</p>
//       <ul class="ml-4 list-disc">${membres}</ul>
//     `;
//
//         liste.appendChild(li);
//     });
// }