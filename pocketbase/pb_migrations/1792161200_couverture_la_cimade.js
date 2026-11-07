/// <reference path="../pb_data/types.d.ts" />

/**
 * Migration : couverture de La Cimade = page "Choix final du logo"
 * du dossier (Canva, page 12), avec le logo rendu plus net.
 * Image : src/assets/images/captures/couverture-la-cimade.jpg
 */
migrate((app) => {
  let projet;
  try {
    projet = app.findFirstRecordByData("projets", "slug", "la-cimade");
  } catch (e) {
    return;
  }
  try {
    const image = $filesystem.fileFromPath(
      `${app.dataDir()}/../../src/assets/images/captures/couverture-la-cimade.jpg`
    );
    projet.set("couverture", image);
    projet.set(
      "couverture_alt",
      "Logo final de La Cimade : le mot « Cimade » dont le A est formé de quatre mains qui se tiennent, symbole d'entraide, en noir et rouge."
    );
    app.save(projet);
  } catch (e) {
    // image introuvable : on ne change rien
  }
}, (app) => {
  try {
    const projet = app.findFirstRecordByData("projets", "slug", "la-cimade");
    projet.set("couverture", null);
    projet.set("couverture_alt", "");
    app.save(projet);
  } catch (e) {}
});
