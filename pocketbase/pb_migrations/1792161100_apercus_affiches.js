/// <reference path="../pb_data/types.d.ts" />

/**
 * Migration : affiches "Les visages de Montbéliard".
 *
 * Images (JPG allégés) dans src/assets/images/captures/visages-de-montbeliard/,
 * nommées affiche-1-…, affiche-2-…, affiche-3-…
 * Chaque affiche présente est ajoutée à la galerie ; une affiche absente
 * est simplement ignorée. La première trouvée devient la couverture si le
 * projet n'en a pas encore.
 */
const SLUG = "visages-de-montbeliard";

const TEXTES_ALT = {
  1: "Affiche « L'héritage des hauteurs » : le château de Montbéliard illustré en vectoriel sous un grand soleil.",
  2: "Affiche « Entre pierre & ciel » : la tour Art nouveau de Montbéliard, coupole verte, sur un ciel bleu.",
  3: "Affiche « Mémoire de pierre » : façade d'un bâtiment historique de Montbéliard sous un ciel pastel.",
};

migrate((app) => {
  let projet;
  try {
    projet = app.findFirstRecordByData("projets", "slug", SLUG);
  } catch (e) {
    return;
  }
  if (projet.get("galerie").length > 0) return;

  const dossier = `${app.dataDir()}/../../src/assets/images/captures/${SLUG}`;
  const fichiers = [];
  let premiere = 0;

  for (let i = 1; i <= 3; i++) {
    try {
      fichiers.push($filesystem.fileFromPath(`${dossier}/affiche-${i}-${SLUG}.jpg`));
      if (!premiere) premiere = i;
    } catch (e) {
      // affiche absente : ignorée
    }
  }
  if (fichiers.length === 0) return;

  projet.set("galerie+", fichiers);

  if (!projet.get("couverture")) {
    projet.set("couverture", $filesystem.fileFromPath(`${dossier}/affiche-${premiere}-${SLUG}.jpg`));
    projet.set("couverture_alt", TEXTES_ALT[premiere]);
  }

  app.save(projet);
}, (app) => {
  try {
    const projet = app.findFirstRecordByData("projets", "slug", SLUG);
    projet.set("galerie", []);
    app.save(projet);
  } catch (e) {}
});
