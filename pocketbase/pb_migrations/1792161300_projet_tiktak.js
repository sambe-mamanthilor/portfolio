/// <reference path="../pb_data/types.d.ts" />

/**
 * Migration : ajout du projet TiK•TaK (SAÉ 301), d'après la fiche portfolio
 * validée. Ajoute aussi les outils SQLite et Bun s'ils n'existent pas.
 *
 * Volontairement laissés vides (à compléter dans le back-office) :
 *  - date_fin : la fiche indique seulement « octobre – novembre 2026 » ;
 *  - lien_github : à ajouter seulement si le dépôt est public ;
 *  - couverture et galerie : captures du site à faire (mode clair et sombre).
 */
const NOUVEAUX_OUTILS = [
  { nom: "SQLite", slug: "sqlite", type: "backend", afficher_competences: true },
  { nom: "Bun", slug: "bun", type: "backend", afficher_competences: true },
];

const PROJET = {
  slug: "tiktak",
  titre: "TiK•TaK — configurateur de montres",
  resume: "Un configurateur de montres où l'on crée sa montre en 5 étapes ou en une phrase, grâce à l'IA, puis on l'enregistre et on la commande.",
  type_projet: "sae",
  cadre: "individuel",
  taille_equipe: 1,
  role: "Projet individuel, de la story map à la mise en ligne : UX/UI design (Figma), base de données, développement full-stack et déploiement sur un serveur Linux.",
  date_debut: "2026-10-01 00:00:00.000Z",
  contexte: "<p>SAÉ 301 « Concevoir et développer une expérience utilisateur » du BUT MMI. Le sujet : créer le configurateur en ligne d'une marque de montres fictive, TiK•TaK (fabrication française, style minimaliste, cible 25-40 ans), et impliquer l'utilisateur dans la création de son modèle.</p>",
  objectifs: "<ul><li>Composer, personnaliser, enregistrer et commander sa montre ; retrouver, modifier et supprimer ses créations ; suivre ses commandes</li><li>Configurer une montre en langage naturel grâce à une IA</li><li>Atteindre 3 % de conversion dans les 6 mois grâce à 6 nudges marketing, chacun relié à un biais cognitif</li><li>Mettre le site en ligne sur un serveur, avec connexion Google</li></ul>",
  choix_techniques: "<ul><li><strong>Parcours avant interface</strong> : story map, charte graphique, puis maquette Figma ordinateur et mobile</li><li><strong>L'IA plutôt qu'un quiz</strong> : un bloc IA avec exemples cliquables remplace un quiz de trois écrans</li><li><strong>IA encadrée</strong> : sa réponse suit un schéma JSON qui n'accepte que les composants réels de la base, elle ne peut pas inventer de produit</li><li><strong>Sécurité</strong> : validation avec Zod, prix recalculé par le serveur, protection IDOR, limite d'appels à l'IA</li><li><strong>Montre en SVG</strong> générée par une seule fonction, côté serveur et navigateur, avec identifiants uniques pour afficher plusieurs montres sur une page</li></ul>",
  resultat: "<p>Un site en ligne et bilingue (français et anglais) : configurateur en 5 étapes avec aperçu en direct, vue « au poignet », création par l'IA, comptes Google ou e-mail, « Mes montres », commandes et historique, mode sombre. Hébergé sur le VPS de l'IUT en HTTPS, avec déploiement automatique à chaque push grâce à GitHub Actions.</p>",
  outils: ["astro", "tailwind", "typescript", "bun", "sqlite", "figma", "git", "vps"],
  lien_demo: "https://tiktak.maman-sambe.fr",
  mis_en_avant: true,
  ordre: 0,
  publie: true,
  etapes: [
    ["Story map", "Les étapes de l'utilisateur, de la découverte à la commande, et les tâches de chaque étape."],
    ["Charte et maquette", "Charte rose poudré sur fond crème, thèmes clair et sombre, maquette Figma ordinateur et mobile."],
    ["Nudges marketing", "Objectif SMART de 3 % de conversion et 6 nudges reliés à des biais cognitifs (effet IKEA, preuve sociale…)."],
    ["Base de données", "MCD et MLD sous Looping, base SQLite et 17 requêtes SQL."],
    ["Développement", "Site Astro rendu côté serveur avec Bun : configurateur SVG, IA, connexion Google, commandes, sécurité."],
    ["Mise en ligne", "VPS Linux, Apache, HTTPS Let's Encrypt, service systemd et déploiement continu avec GitHub Actions."],
  ],
};

migrate((app) => {
  // 1. Outils manquants (seulement s'ils n'existent pas déjà)
  const colOutils = app.findCollectionByNameOrId("outils");
  for (const data of NOUVEAUX_OUTILS) {
    try {
      app.findFirstRecordByData("outils", "slug", data.slug);
    } catch (e) {
      const record = new Record(colOutils);
      record.load(data);
      app.save(record);
    }
  }

  // 2. Le projet (on ne le recrée pas s'il existe déjà)
  try {
    app.findFirstRecordByData("projets", "slug", PROJET.slug);
    return;
  } catch (e) {}

  const { etapes, outils, ...champs } = PROJET;
  const projet = new Record(app.findCollectionByNameOrId("projets"));
  projet.load(champs);
  projet.set("categorie", app.findFirstRecordByData("categories", "slug", "dev").id);
  projet.set("outils", outils.map((slug) => app.findFirstRecordByData("outils", "slug", slug).id));
  app.save(projet);

  // 3. Les étapes de la frise
  const colEtapes = app.findCollectionByNameOrId("etapes");
  etapes.forEach(([titre, description], index) => {
    const etape = new Record(colEtapes);
    etape.load({ projet: projet.id, titre, description: `<p>${description}</p>`, ordre: index + 1 });
    app.save(etape);
  });
}, (app) => {
  // Retour en arrière : supprimer le projet (ses étapes partent avec lui)
  try {
    app.delete(app.findFirstRecordByData("projets", "slug", PROJET.slug));
  } catch (e) {}
});
