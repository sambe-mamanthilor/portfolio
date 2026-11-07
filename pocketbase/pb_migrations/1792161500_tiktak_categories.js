/// <reference path="../pb_data/types.d.ts" />

/**
 * Migration : TiK•TaK dans deux catégories, « Développement web » et
 * « Design & UX » (story map, maquette Figma, nudges marketing).
 */
migrate((app) => {
  try {
    const projet = app.findFirstRecordByData("projets", "slug", "tiktak");
    const id = (slug) => app.findFirstRecordByData("categories", "slug", slug).id;
    projet.set("categorie", [id("dev"), id("design")]);
    app.save(projet);
  } catch (e) {}
}, (app) => {
  try {
    const projet = app.findFirstRecordByData("projets", "slug", "tiktak");
    projet.set("categorie", [app.findFirstRecordByData("categories", "slug", "dev").id]);
    app.save(projet);
  } catch (e) {}
});
