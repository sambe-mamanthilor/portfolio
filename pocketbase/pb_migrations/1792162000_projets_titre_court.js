/// <reference path="../pb_data/types.d.ts" />

/**
 * Migration : nouveau champ "titre_court" (facultatif) dans "projets".
 * Il sert sur les cartes projets quand le vrai titre est trop long.
 * La page du projet garde toujours le titre complet.
 */
migrate((app) => {
  const projets = app.findCollectionByNameOrId("projets");
  if (!projets.fields.getByName("titre_court")) {
    projets.fields.add(new TextField({ name: "titre_court", max: 80 }));
    app.save(projets);
  }
  try {
    const p = app.findFirstRecordByData("projets", "slug", "annees-chaudes");
    p.set("titre_court", "Les années chaudes – Data visualisation");
    app.save(p);
  } catch (e) {}
}, (app) => {
  const projets = app.findCollectionByNameOrId("projets");
  if (projets.fields.getByName("titre_court")) {
    projets.fields.removeByName("titre_court");
    app.save(projets);
  }
});
