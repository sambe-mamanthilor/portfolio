/// <reference path="../pb_data/types.d.ts" />

/**
 * Migration : Olyvia n'est plus un projet phare de l'accueil.
 * Il reste 3 projets phares : TiK•TaK, Années chaudes et Cielixir.
 * (Olyvia reste visible sur la page Projets.)
 */
migrate((app) => {
  try {
    const p = app.findFirstRecordByData("projets", "slug", "olyvia");
    p.set("mis_en_avant", false);
    app.save(p);
  } catch (e) {}
}, (app) => {
  try {
    const p = app.findFirstRecordByData("projets", "slug", "olyvia");
    p.set("mis_en_avant", true);
    app.save(p);
  } catch (e) {}
});
