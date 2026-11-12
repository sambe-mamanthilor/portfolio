/// <reference path="../pb_data/types.d.ts" />

/**
 * Migration : ajoute les images d'aperçu (survol des cartes projets)
 * dans le champ "galerie" de chaque projet.
 *
 * Les images viennent du dossier Téléchargements\apercus-portfolio,
 * rangées dans un sous-dossier par projet (le nom = le slug du projet).
 * Années chaudes reçoit aussi sa première image comme couverture,
 * seulement si aucune couverture n'est déjà déposée.
 *
 * Sécurités :
 *  - "galerie+" AJOUTE les images à celles déjà présentes (n'efface rien) ;
 *  - un projet qui a déjà des images dans sa galerie est laissé tel quel
 *    (évite les doublons) ;
 *  - une image introuvable est simplement ignorée : la migration ne bloque
 *    pas le démarrage de PocketBase (utile sur le futur serveur, où ce
 *    dossier n'existera pas — les images seront déjà dans pb_data).
 */
const DOSSIER = "C:/Users/maman/Downloads/apercus-portfolio";

const APERCUS = {
  "la-cimade": 4,
  "elm-design": 3,
  "olyvia": 3,
  "annees-chaudes": 1,
  "micro-trottoir": 1,
};

migrate((app) => {
  for (const slug in APERCUS) {
    let projet;
    try {
      projet = app.findFirstRecordByData("projets", "slug", slug);
    } catch (e) {
      continue; // projet absent de la base : on passe au suivant
    }
    if (projet.get("galerie").length > 0) continue;

    const fichiers = [];
    for (let i = 1; i <= APERCUS[slug]; i++) {
      try {
        fichiers.push($filesystem.fileFromPath(`${DOSSIER}/${slug}/${i}-${slug}.jpg`));
      } catch (e) {
        // image introuvable : ignorée
      }
    }
    if (fichiers.length === 0) continue;

    projet.set("galerie+", fichiers);

    if (slug === "annees-chaudes" && !projet.get("couverture")) {
      projet.set("couverture", $filesystem.fileFromPath(`${DOSSIER}/${slug}/1-${slug}.jpg`));
      projet.set(
        "couverture_alt",
        "Carte de la Bourgogne-Franche-Comté : évolution de la température maximale moyenne dans 28 stations météo, de +1,19 à +1,58 °C entre 1961-1990 et 1991-2020."
      );
    }

    app.save(projet);
  }
}, (app) => {
  // Retour en arrière : on vide la galerie des projets concernés.
  for (const slug in APERCUS) {
    try {
      const projet = app.findFirstRecordByData("projets", "slug", slug);
      projet.set("galerie", []);
      app.save(projet);
    } catch (e) {}
  }
});
