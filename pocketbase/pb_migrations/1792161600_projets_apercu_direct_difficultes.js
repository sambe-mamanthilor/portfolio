/// <reference path="../pb_data/types.d.ts" />

/**
 * Migration : deux nouveaux champs pour la page projet.
 *
 * 1. "apercu_en_direct" (case à cocher) : le site du projet peut-il être
 *    affiché EN DIRECT dans la page (iframe) ? Certains hébergeurs l'interdisent
 *    (en-tête X-Frame-Options) : on ne coche que ceux qui ont été testés.
 *    Testé le 5/11/2026 : TiK•TaK, Années chaudes, Cielixir, Festival → OK ;
 *    Empreintes invisibles → bloqué (on affiche ses captures à la place).
 *
 * 2. "difficultes" (JSON) : le tableau « Problème / Cause / Solution ».
 *    Format : [{ "probleme": "...", "cause": "...", "solution": "..." }, ...]
 *    Rempli ici pour TiK•TaK (fiche portfolio validée) et Années chaudes
 *    (problème déjà décrit dans ses choix techniques). Les autres projets
 *    restent vides : la section ne s'affiche pas tant qu'ils sont vides.
 */
const EN_DIRECT = ["tiktak", "annees-chaudes", "cielixir", "festival-musique"];

const DIFFICULTES = {
  "tiktak": [
    { probleme: "Les montres d'une même page se « volaient » leurs couleurs et dégradés", cause: "Le SVG fourni réutilise les mêmes classes et identifiants dans chaque copie", solution: "Renommer classes et identifiants pour chaque montre afin que chaque SVG soit indépendant" },
    { probleme: "L'IA pouvait proposer des composants qui n'existent pas", cause: "Réponse en texte libre", solution: "Schéma JSON qui n'accepte que les identifiants de la base, plus une solution de secours" },
    { probleme: "Le site redirigeait vers un autre de mes projets, avec une erreur de certificat", cause: "Le serveur Apache utilisait la configuration d'un autre site", solution: "Hôte virtuel dédié au projet, puis certificat HTTPS" },
    { probleme: "Le service ne démarrait pas", cause: "Chemin de Bun incorrect dans le fichier systemd", solution: "Corriger le chemin et recharger le service" },
    { probleme: "Le mode sombre était « tout noir »", cause: "Fonds presque identiques, montres noires invisibles", solution: "Palette brun anthracite à plusieurs niveaux, halo autour des montres" },
    { probleme: "La vue au poignet n'était pas crédible", cause: "Simple bande de couleur pour le bras", solution: "Main dessinée en SVG, teints de peau, bracelet coupé aux bords du poignet" },
  ],
  "annees-chaudes": [
    { probleme: "La légende en dégradé faisait planter la génération du site", cause: "Les graphiques sont dessinés côté serveur avec JSDOM, qui n'a pas de canvas", solution: "Remplacer le dégradé par une légende en 4 classes, plus lisible" },
  ],
};

migrate((app) => {
  const projets = app.findCollectionByNameOrId("projets");
  projets.fields.add(new BoolField({ name: "apercu_en_direct" }));
  projets.fields.add(new JSONField({ name: "difficultes", maxSize: 20000 }));
  app.save(projets);

  for (const slug of EN_DIRECT) {
    try {
      const p = app.findFirstRecordByData("projets", "slug", slug);
      p.set("apercu_en_direct", true);
      app.save(p);
    } catch (e) {}
  }
  for (const slug in DIFFICULTES) {
    try {
      const p = app.findFirstRecordByData("projets", "slug", slug);
      p.set("difficultes", DIFFICULTES[slug]);
      app.save(p);
    } catch (e) {}
  }
}, (app) => {
  const projets = app.findCollectionByNameOrId("projets");
  projets.fields.removeByName("apercu_en_direct");
  projets.fields.removeByName("difficultes");
  app.save(projets);
});
