/// <reference path="../pb_data/types.d.ts" />

/**
 * Migration : ma binôme, Ruslana Budniak, est citée sur les deux projets
 * réalisés avec elle (Années chaudes et Cielixir).
 */
const NOM = "Ruslana Budniak";
const CHANGEMENTS = [
  ["annees-chaudes", "role", "En binôme :", `En binôme avec ${NOM} :`],
  ["cielixir", "role", "Cheffe de projet :", `Cheffe de projet, en binôme avec ${NOM} :`],
];
const ETAPE_AVANT = "créée avec ma binôme.</p>";
const ETAPE_APRES = `créée avec ma binôme, ${NOM}.</p>`;

function appliquer(app, sens) {
  for (const [slug, champ, avant, apres] of CHANGEMENTS) {
    try {
      const p = app.findFirstRecordByData("projets", "slug", slug);
      p.set(champ, sens ? p.getString(champ).replace(avant, apres) : p.getString(champ).replace(apres, avant));
      app.save(p);
    } catch (e) {}
  }
  try {
    const projet = app.findFirstRecordByData("projets", "slug", "annees-chaudes");
    for (const e of app.findRecordsByFilter("etapes", "projet = {:id}", "", 0, 0, { id: projet.id })) {
      const d = e.getString("description");
      const nouveau = sens ? d.replace(ETAPE_AVANT, ETAPE_APRES) : d.replace(ETAPE_APRES, ETAPE_AVANT);
      if (nouveau !== d) { e.set("description", nouveau); app.save(e); }
    }
  } catch (e) {}
}

migrate((app) => appliquer(app, true), (app) => appliquer(app, false));
