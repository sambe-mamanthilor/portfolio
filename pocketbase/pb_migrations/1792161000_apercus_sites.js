/// <reference path="../pb_data/types.d.ts" />

/**
 * Migration : captures d'écran des 4 sites, ajoutées dans "galerie"
 * pour l'aperçu au survol des cartes projets.
 *
 * Les images (déjà allégées en JPG) sont dans le projet :
 *   src/assets/images/captures/<slug-du-projet>/site-1-<slug>.jpg, site-2…
 * On les retrouve à partir du dossier de PocketBase (pocketbase/pb_data),
 * en remontant de deux niveaux jusqu'à la racine du projet.
 *
 * "+galerie" les place AVANT les images déjà présentes : au survol, on voit
 * d'abord le site, puis le reste (ex. la carte des températures d'Années chaudes).
 *
 * Sécurités : pas de doublon si la migration est rejouée (on vérifie les
 * fichiers "site_…" déjà présents), et une image absente est ignorée.
 */
const CAPTURES = {
  "cielixir": 3,
  "annees-chaudes": 3,
  "festival-musique": 3,
  "empreintes-invisibles": 2,
};

migrate((app) => {
  const dossier = `${app.dataDir()}/../../src/assets/images/captures`;

  for (const slug in CAPTURES) {
    let projet;
    try {
      projet = app.findFirstRecordByData("projets", "slug", slug);
    } catch (e) {
      continue;
    }

    const dejaLa = projet.get("galerie").some((nom) => nom.startsWith("site_"));
    if (dejaLa) continue;

    const fichiers = [];
    for (let i = 1; i <= CAPTURES[slug]; i++) {
      try {
        fichiers.push($filesystem.fileFromPath(`${dossier}/${slug}/site-${i}-${slug}.jpg`));
      } catch (e) {
        // image introuvable : ignorée
      }
    }
    if (fichiers.length === 0) continue;

    projet.set("+galerie", fichiers);
    app.save(projet);
  }
}, (app) => {
  // Retour en arrière : on retire seulement les captures "site_…".
  for (const slug in CAPTURES) {
    try {
      const projet = app.findFirstRecordByData("projets", "slug", slug);
      const captures = projet.get("galerie").filter((nom) => nom.startsWith("site_"));
      projet.set("galerie-", captures);
      app.save(projet);
    } catch (e) {}
  }
});
