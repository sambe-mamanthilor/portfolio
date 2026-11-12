/// <reference path="../pb_data/types.d.ts" />

/**
 * Migration : TiK•TaK — vraies dates et images.
 *  - SAÉ menée en 4 jours, du lundi 2 au jeudi 5 novembre 2026 ;
 *  - couverture = page d'accueil du site ;
 *  - galerie (aperçu au survol) = accueil, configurateur, mes montres, commande.
 * Images : src/assets/images/captures/tiktak/site-1-tiktak.jpg à site-4-tiktak.jpg
 */
migrate((app) => {
  let projet;
  try {
    projet = app.findFirstRecordByData("projets", "slug", "tiktak");
  } catch (e) {
    return;
  }

  projet.set("date_debut", "2026-11-02 00:00:00.000Z");
  projet.set("date_fin", "2026-11-05 00:00:00.000Z");

  const dossier = `${app.dataDir()}/../../src/assets/images/captures/tiktak`;
  const fichiers = [];
  for (let i = 1; i <= 4; i++) {
    try {
      fichiers.push($filesystem.fileFromPath(`${dossier}/site-${i}-tiktak.jpg`));
    } catch (e) {}
  }

  if (fichiers.length > 0 && projet.get("galerie").length === 0) {
    projet.set("galerie+", fichiers);
  }
  if (!projet.get("couverture")) {
    try {
      projet.set("couverture", $filesystem.fileFromPath(`${dossier}/site-1-tiktak.jpg`));
      projet.set(
        "couverture_alt",
        "Page d'accueil de TiK•TaK : le titre « Le temps, à votre image. » à côté d'une montre noire au cadran rond, sur fond crème."
      );
    } catch (e) {}
  }

  app.save(projet);
}, (app) => {
  try {
    const projet = app.findFirstRecordByData("projets", "slug", "tiktak");
    projet.set("date_debut", "2026-10-01 00:00:00.000Z");
    projet.set("date_fin", "");
    projet.set("galerie", []);
    projet.set("couverture", null);
    projet.set("couverture_alt", "");
    app.save(projet);
  } catch (e) {}
});
