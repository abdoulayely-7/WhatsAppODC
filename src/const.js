export const CONTACTS = [
    {
        id: 1,
        nom: "Ndiaye",
        prenom: "Maman",
        telephone: "773795383",
        heure: "22:13",
        nonLus: 0,
        avatar: "MN",
        messages: [
            { type: 'recu', texte: "Bonjour pape", heure: "22:13" },
            { type: 'envoye', texte: "Salut maman ", heure: "22:14" }
        ],
        archive: false

    },
    {
        id: 1,
        nom: "Diop",
        prenom: "Khass",
        telephone: "773795383",
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
export const UTILISATEURS = [
    {
        id: 1,
        nom: "Ly",
        prenom: "Abdou",
        email: "pape@exemple.com",
        motDePasse: "1234",
        avatar: "PD",
        contacts: [
            {
                id: 1,
                nom: "Diop",
                prenom: "Khass",
                telephone: "773795383",
                heure: "22:13",
                nonLus: 3,
                avatar: "KD",
                messages: [
                    { type: 'recu', texte: "fils", heure: "22:13" },
                    { type: 'envoye', texte: "oui tete ", heure: "22:17" }
                ],
                archive: false

            },
        ],
        groupes: [
            {
                id: 1,
                nom: "Famille",
                description: "Groupe familial",
                message: "Bonjour",
                messages: [],
                heure: "18:47",
                nonLus: 0,
                membres: [
                    { id: 1, role: "admin" },
                    { id: 3, role: "membre" }
                ],
                avatar: "F",

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
                avatar: "A"
            },
        ]
    },

    {
        id: 2,
        nom: "Dieng",
        prenom: "Pape",
        email: "pape",
        motDePasse: "passer",
        avatar: "PD",
        contacts: [
            {
                id: 1,
                nom: "ndiaye",
                prenom: "fatou",
                telephone: "775711611",
                heure: "22:13",
                nonLus: 3,
                avatar: "ND",
                messages: [
                    { type: 'recu', texte: "fils", heure: "22:13" },
                    { type: 'envoye', texte: "oui tete ", heure: "22:17" }
                ],
                archive: false

            },
        ],
        groupes: [
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
                avatar: "T",

            },
            {
                id: 2,
                nom: "Foot",
                description: "Nos bons moments",
                message: "Bonsoir",
                messages: [
                    { type: 'recu', texte: "salut groupe", heure: "22:13", expediteurId: 1 },
                    { type: 'envoye', texte: "oui cv groupe ", heure: "22:17" },
                    {
                        type: "recu",
                        texte: "Coucou tout le monde",
                        heure: "12:00",
                        expediteurId: 1 // L'expéditeur est l'utilisateur avec id: 2
                    }

                ],
                heure: "18:47",
                nonLus: 5,
                membres: [
                    { id: 2, role: "admin" },
                    { id: 3, role: "membre" }
                ],
                avatar: "FL"
            },
        ]
    },
    {
        id: 3,
        nom: "Diop",
        prenom: "Bara",
        email: "pape@exemple.com",
        motDePasse: "1234",
        avatar: "PD",
        contacts: [],
        groupes: []
    },

];


