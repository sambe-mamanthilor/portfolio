/// <reference path="../pb_data/types.d.ts" />

/**
 * Migration : données de départ (catégories et outils).
 *
 * Ce sont des données "de référence" : elles changent rarement et
 * doivent être identiques en local et sur le VPS. Les mettre dans une
 * migration évite de les ressaisir à la main sur chaque serveur.
 *
 * Les PROJETS, eux, seront saisis dans le back-office : c'est du contenu.
 */

const CATEGORIES = [
  { nom: "Développement web", slug: "dev", ordre: 1 },
  { nom: "Design & UX", slug: "design", ordre: 2 },
  { nom: "Audiovisuel", slug: "audiovisuel", ordre: 3 },
];

// afficher_competences : true = visible dans la section "Compétences"
const OUTILS = [
  // Langages
  { nom: "HTML", slug: "html", type: "langage", afficher_competences: true },
  { nom: "CSS", slug: "css", type: "langage", afficher_competences: true },
  { nom: "JavaScript", slug: "javascript", type: "langage", afficher_competences: true },
  // Frameworks
  { nom: "Astro", slug: "astro", type: "framework", afficher_competences: true },
  { nom: "Tailwind CSS", slug: "tailwind", type: "framework", afficher_competences: true },
  // Back-end
  { nom: "PocketBase", slug: "pocketbase", type: "backend", afficher_competences: true },
  { nom: "API Open-Meteo", slug: "open-meteo", type: "backend", afficher_competences: false },
  // CMS
  { nom: "WordPress", slug: "wordpress", type: "cms", afficher_competences: true },
  // Design
  { nom: "Figma", slug: "figma", type: "design", afficher_competences: true },
  { nom: "Affinity", slug: "affinity", type: "design", afficher_competences: true },
  { nom: "Canva", slug: "canva", type: "design", afficher_competences: true },
  // Audiovisuel
  { nom: "DaVinci Resolve", slug: "davinci-resolve", type: "audiovisuel", afficher_competences: true },
  // Gestion de projet
  { nom: "Miro", slug: "miro", type: "gestion", afficher_competences: true },
  { nom: "Trello", slug: "trello", type: "gestion", afficher_competences: false },
  { nom: "Jira", slug: "jira", type: "gestion", afficher_competences: false },
  // Déploiement
  { nom: "Git & GitHub", slug: "git", type: "deploiement", afficher_competences: true },
  { nom: "Netlify", slug: "netlify", type: "deploiement", afficher_competences: true },
  { nom: "VPS Linux", slug: "vps", type: "deploiement", afficher_competences: true },
];

migrate((app) => {
  const colCategories = app.findCollectionByNameOrId("categories");
  for (const data of CATEGORIES) {
    const record = new Record(colCategories);
    record.load(data); // remplit les champs à partir de l'objet
    app.save(record);
  }

  const colOutils = app.findCollectionByNameOrId("outils");
  for (const data of OUTILS) {
    const record = new Record(colOutils);
    record.load(data);
    app.save(record);
  }
}, (app) => {
  // Retour en arrière : on supprime uniquement les lignes créées ici,
  // retrouvées grâce à leur slug.
  for (const { slug } of OUTILS) {
    const record = app.findFirstRecordByData("outils", "slug", slug);
    app.delete(record);
  }
  for (const { slug } of CATEGORIES) {
    const record = app.findFirstRecordByData("categories", "slug", slug);
    app.delete(record);
  }
});
