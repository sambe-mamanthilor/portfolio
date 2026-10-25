/// <reference path="../pb_data/types.d.ts" />

/**
 * Migration : catégorie "Communication digitale" + plusieurs catégories par projet.
 *
 * Un projet peut toucher plusieurs domaines (ex. Festival = dev + communication).
 * On passe donc le champ "categorie" d'une relation simple (maxSelect: 1)
 * à une relation multiple (maxSelect: 4). PocketBase convertit
 * automatiquement les valeurs existantes en liste.
 */

// Catégories de chaque projet, dans l'ordre d'importance (la 1re = principale)
const CATEGORIES_PAR_PROJET = {
  "cielixir": ["dev", "design"],
  "annees-chaudes": ["dev"],
  "olyvia": ["design", "communication"],
  "la-cimade": ["design"],
  "elm-design": ["design", "communication"],
  "festival-musique": ["dev", "communication"],
  "empreintes-invisibles": ["dev"],
  "micro-trottoir": ["audiovisuel"],
  "visages-de-montbeliard": ["design"],
};

migrate((app) => {
  // 1. Nouvelle catégorie
  const colCategories = app.findCollectionByNameOrId("categories");
  const com = new Record(colCategories);
  com.load({ nom: "Communication digitale", slug: "communication", ordre: 4 });
  app.save(com);

  // 2. Relation multiple
  const colProjets = app.findCollectionByNameOrId("projets");
  colProjets.fields.getByName("categorie").maxSelect = 4;
  app.save(colProjets);

  // 3. Nouvelles catégories des projets
  const idCategorie = (slug) => app.findFirstRecordByData("categories", "slug", slug).id;
  for (const [slug, cats] of Object.entries(CATEGORIES_PAR_PROJET)) {
    const projet = app.findFirstRecordByData("projets", "slug", slug);
    projet.set("categorie", cats.map(idCategorie));
    app.save(projet);
  }
}, (app) => {
  // Retour en arrière : on garde uniquement la 1re catégorie de chaque projet
  const idCategorie = (slug) => app.findFirstRecordByData("categories", "slug", slug).id;
  for (const [slug, cats] of Object.entries(CATEGORIES_PAR_PROJET)) {
    const projet = app.findFirstRecordByData("projets", "slug", slug);
    projet.set("categorie", [idCategorie(cats[0])]);
    app.save(projet);
  }
  const colProjets = app.findCollectionByNameOrId("projets");
  colProjets.fields.getByName("categorie").maxSelect = 1;
  app.save(colProjets);

  app.delete(app.findFirstRecordByData("categories", "slug", "communication"));
});
