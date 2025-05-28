export const CONTACTS = [
    {
        id: 1,
        nom: "Ndiaye",
        prenom:"Maman",
        telephone: "773795383",
        heure: "22:13",
        nonLus: 0,
        avatar: "MN",
        messages: [
            { type: 'recu', texte: "Bonjour", heure: "22:13" },
            { type: 'envoye', texte: "Salut Bob ", heure: "22:14" }
        ],
        archive: false

    },
    {
        id: 1,
        nom: "Diop",
        prenom:"Khass",
        telephone: "773795383",
        heure: "22:13",
        nonLus: 0,
        avatar: "KD",
        messages: [
            { type: 'recu', texte: "Bonjour", heure: "22:13" },
            { type: 'envoye', texte: "Salut Bob ", heure: "22:17" }
        ],
        archive: false

    },
];
export const GROUPES = [
    {
        id: 1,
        nom: "Famille",
        description: "Groupe familial",
        message: "Bonjour",
        messages: [],
        heure: "18:47",
        nonLus: 0,
        membres: [1, 2],
        avatar: "https://i.pravatar.cc/40?u=2",

    },
    {
        id: 2,
        nom: "Amis",
        description: "Nos bons moments",
        message: "Bonsoir",
        messages: [],
        heure: "18:47",
        nonLus: 5,
        membres: [2],
        avatar: "https://i.pravatar.cc/40?u=2"
    },

];

