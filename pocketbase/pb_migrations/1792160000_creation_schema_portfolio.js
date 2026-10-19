/// <reference path="../pb_data/types.d.ts" />

/**
 * Migration : création du schéma de la base du portfolio.
 *
 * Une migration est un fichier qui DÉCRIT la structure de la base.
 * Au démarrage, PocketBase exécute les migrations qu'il n'a pas encore
 * appliquées. Résultat : la même base en local et sur le VPS, et la
 * structure versionnée dans Git.
 *
 * Deux fonctions :
 *  - la première ("up") crée les collections ;
 *  - la seconde ("down") les supprime, pour pouvoir revenir en arrière.
 *
 * Règles d'accès (API rules) :
 *  - ""   (chaîne vide) = lecture publique, tout le monde peut lire ;
 *  - null               = réservé aux administrateurs (toi, dans le back-office).
 */

migrate((app) => {
  // ---------------------------------------------------------------
  // 1. CATEGORIES : Dev, Design / UX, Audiovisuel (filtre des projets)
  // ---------------------------------------------------------------
  const categories = new Collection({
    type: "base",
    name: "categories",
    listRule: "",
    viewRule: "",
    createRule: null,
    updateRule: null,
    deleteRule: null,
    fields: [
      { type: "text", name: "nom", required: true, max: 50, presentable: true },
      // slug = version "propre" du nom, utilisée dans les URL et les filtres
      { type: "text", name: "slug", required: true, max: 50, pattern: "^[a-z0-9-]+$" },
      { type: "number", name: "ordre", onlyInt: true, min: 0 },
    ],
    indexes: [
      "CREATE UNIQUE INDEX idx_categories_slug ON categories (slug)",
    ],
  });
  app.save(categories);

  // ---------------------------------------------------------------
  // 2. OUTILS : chaque technologie écrite une seule fois,
  //    puis reliée aux projets (et réutilisée pour les compétences)
  // ---------------------------------------------------------------
  const outils = new Collection({
    type: "base",
    name: "outils",
    listRule: "",
    viewRule: "",
    createRule: null,
    updateRule: null,
    deleteRule: null,
    fields: [
      { type: "text", name: "nom", required: true, max: 60, presentable: true },
      { type: "text", name: "slug", required: true, max: 60, pattern: "^[a-z0-9-]+$" },
      {
        type: "select",
        name: "type",
        maxSelect: 1,
        values: ["langage", "framework", "backend", "cms", "design", "audiovisuel", "gestion", "deploiement"],
      },
      {
        type: "file",
        name: "icone",
        maxSelect: 1,
        maxSize: 200000, // 200 Ko max : une icône doit rester légère
        mimeTypes: ["image/svg+xml", "image/png", "image/webp"],
      },
      // Afficher ou non cet outil dans la section "Compétences"
      { type: "bool", name: "afficher_competences" },
    ],
    indexes: [
      "CREATE UNIQUE INDEX idx_outils_slug ON outils (slug)",
    ],
  });
  app.save(outils);

  // ---------------------------------------------------------------
  // 3. PROJETS : la collection principale (une étude de cas par projet)
  // ---------------------------------------------------------------
  const imagesAcceptees = ["image/jpeg", "image/png", "image/webp", "image/avif"];

  const projets = new Collection({
    type: "base",
    name: "projets",
    // Le public ne voit QUE les projets marqués "publié".
    listRule: "publie = true",
    viewRule: "publie = true",
    createRule: null,
    updateRule: null,
    deleteRule: null,
    fields: [
      // --- Identité ---
      { type: "text", name: "titre", required: true, max: 120, presentable: true },
      { type: "text", name: "slug", required: true, max: 80, pattern: "^[a-z0-9-]+$" },
      { type: "text", name: "resume", required: true, max: 220 }, // texte des cartes
      {
        type: "relation",
        name: "categorie",
        required: true,
        maxSelect: 1,
        collectionId: categories.id, // lien vers la collection créée plus haut
        cascadeDelete: false,
      },

      // --- Cadre ---
      {
        type: "select",
        name: "type_projet",
        maxSelect: 1,
        values: ["sae", "personnel", "professionnel", "cours"],
      },
      { type: "select", name: "cadre", maxSelect: 1, values: ["individuel", "collectif"] },
      { type: "number", name: "taille_equipe", onlyInt: true, min: 1 },
      { type: "text", name: "role", max: 300 },
      { type: "date", name: "date_debut" },
      { type: "date", name: "date_fin" },

      // --- Étude de cas (exigences du sujet S3) ---
      // "editor" = texte riche (gras, listes, liens) saisi dans le back-office
      { type: "editor", name: "contexte", convertURLs: false },
      { type: "editor", name: "objectifs", convertURLs: false },
      { type: "editor", name: "choix_techniques", convertURLs: false },
      { type: "editor", name: "resultat", convertURLs: false },
      { type: "editor", name: "recul", convertURLs: false }, // "ce que je referais"
      {
        type: "relation",
        name: "outils",
        maxSelect: 30,
        collectionId: outils.id,
        cascadeDelete: false,
      },

      // --- Médias ---
      {
        type: "file",
        name: "couverture",
        maxSelect: 1,
        maxSize: 5000000,
        mimeTypes: imagesAcceptees,
        // Miniatures générées automatiquement par PocketBase :
        // on chargera la petite version sur les cartes (performance).
        thumbs: ["800x450", "400x225"],
      },
      // Texte alternatif de l'image : obligatoire pour l'accessibilité
      { type: "text", name: "couverture_alt", max: 200 },
      {
        type: "file",
        name: "galerie",
        maxSelect: 20,
        maxSize: 5000000,
        mimeTypes: imagesAcceptees,
        thumbs: ["800x450"],
      },
      { type: "url", name: "lien_demo" },
      { type: "url", name: "lien_github" },
      { type: "url", name: "lien_video" },

      // --- Affichage ---
      { type: "bool", name: "mis_en_avant" }, // affiché sur l'accueil
      { type: "number", name: "ordre", onlyInt: true, min: 0 },
      { type: "bool", name: "publie" },

      // Dates système de création / modification
      { type: "autodate", name: "created", onCreate: true, onUpdate: false },
      { type: "autodate", name: "updated", onCreate: true, onUpdate: true },
    ],
    indexes: [
      "CREATE UNIQUE INDEX idx_projets_slug ON projets (slug)",
    ],
  });
  app.save(projets);

  // ---------------------------------------------------------------
  // 4. ETAPES : la frise chronologique du processus de chaque projet
  // ---------------------------------------------------------------
  const etapes = new Collection({
    type: "base",
    name: "etapes",
    // Une étape n'est visible que si son projet est publié.
    listRule: "projet.publie = true",
    viewRule: "projet.publie = true",
    createRule: null,
    updateRule: null,
    deleteRule: null,
    fields: [
      {
        type: "relation",
        name: "projet",
        required: true,
        maxSelect: 1,
        collectionId: projets.id,
        // Si on supprime un projet, ses étapes sont supprimées avec lui.
        cascadeDelete: true,
      },
      { type: "text", name: "titre", required: true, max: 100, presentable: true },
      { type: "editor", name: "description", convertURLs: false },
      { type: "date", name: "date" },
      { type: "number", name: "ordre", onlyInt: true, min: 0 },
      {
        type: "file",
        name: "image",
        maxSelect: 1,
        maxSize: 5000000,
        mimeTypes: imagesAcceptees,
        thumbs: ["800x450"],
      },
      { type: "text", name: "image_alt", max: 200 },
    ],
    indexes: [
      "CREATE INDEX idx_etapes_projet_ordre ON etapes (projet, ordre)",
    ],
  });
  app.save(etapes);

}, (app) => {
  // Retour en arrière : suppression dans l'ordre inverse des dépendances
  // (les étapes dépendent des projets, qui dépendent des catégories et outils).
  for (const nom of ["etapes", "projets", "outils", "categories"]) {
    app.delete(app.findCollectionByNameOrId(nom));
  }
});
