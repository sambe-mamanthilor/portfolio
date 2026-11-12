/// <reference path="../pb_data/types.d.ts" />

/**
 * Migration : ajustement des contenus des projets.
 *  1. Micro-trottoir : le résultat parle de ce qui a été livré (plus d'excuse).
 *  2. « Ce que j'en retiens » (champ recul) pour les 3 projets phares.
 *  3. TiK•TaK : résumé plus fluide.
 *  4. Festival : projet individuel, en novembre 2025, sur 5 jours.
 * Le « down » remet les anciennes valeurs.
 */
const NOUVEAU = {
  "micro-trottoir": {
    resultat: "<p>Un micro-trottoir monté en deux versions, française et anglaise, avec les autorisations de droit à l'image des personnes interrogées.</p>",
  },
  "tiktak": {
    resume: "Configurateur de montres en ligne : on compose sa montre en 5 étapes ou on la décrit en une phrase à l'IA, puis on l'enregistre et on la commande.",
    recul: "<p>Commencer par la story map et le parcours utilisateur m'a fait gagner du temps sur l'interface : je savais quoi construire avant d'ouvrir Figma.</p><p>En 4 jours, j'ai appris à prioriser : d'abord les fonctions essentielles et la mise en ligne, ensuite les finitions.</p>",
  },
  "annees-chaudes": {
    recul: "<p>Les données ne parlent pas seules : il faut choisir un message, puis construire chaque graphique pour le servir.</p><p>J'ai aussi pris l'habitude de calculer chaque chiffre à partir des données plutôt que de l'écrire à la main : le site reste juste si les données changent.</p>",
  },
  "cielixir": {
    recul: "<p>Être cheffe de projet m'a appris à découper le travail en livrables et à anticiper les retards plutôt que les subir.</p><p>Si c'était à refaire, je mettrais en place plus tôt la relecture du code entre nous deux.</p>",
  },
  "festival-musique": {
    cadre: "individuel",
    taille_equipe: 1,
    date_debut: "2025-11-03 00:00:00.000Z",
    date_fin: "2025-11-07 00:00:00.000Z",
  },
};

function appliquer(app, valeurs) {
  for (const [slug, champs] of Object.entries(valeurs)) {
    try {
      const p = app.findFirstRecordByData("projets", "slug", slug);
      for (const [champ, valeur] of Object.entries(champs)) p.set(champ, valeur);
      app.save(p);
    } catch (e) {}
  }
}

migrate((app) => {
  appliquer(app, NOUVEAU);
}, (app) => {
  appliquer(app, {
    "micro-trottoir": { resultat: "<p>Un micro-trottoir monté en version française et anglaise, malgré un cadrage manuel sans repères et une prise de son en extérieur.</p>" },
    "tiktak": { resume: "Un configurateur de montres où l'on crée sa montre en 5 étapes ou en une phrase, grâce à l'IA, puis on l'enregistre et on la commande.", recul: "" },
    "annees-chaudes": { recul: "" },
    "cielixir": { recul: "" },
    "festival-musique": { cadre: "", taille_equipe: 0, date_debut: "2025-09-01 00:00:00.000Z", date_fin: "" },
  });
});
