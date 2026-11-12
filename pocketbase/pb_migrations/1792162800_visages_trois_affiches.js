/// <reference path="../pb_data/types.d.ts" />

/**
 * Migration : les 3 affiches « Les visages de Montbéliard » dans la galerie
 * (jusqu'ici seule l'affiche 2 y était), dans l'ordre 1, 2, 3,
 * et un résultat qui dit ce que montre chaque affiche.
 * Images : src/assets/images/captures/visages-de-montbeliard/affiche-N-….jpg
 */
const SLUG = "visages-de-montbeliard";
const RESULTAT_NOUVEAU =
  "<p>Une série de trois affiches réunies sous le sous-titre « Les visages de Montbéliard » :</p>" +
  "<ul>" +
  "<li><strong>L'héritage des hauteurs</strong> : le château de Montbéliard</li>" +
  "<li><strong>Entre pierre &amp; ciel</strong> : l'immeuble Art nouveau à coupole « Lion Peugeot »</li>" +
  "<li><strong>Mémoire de pierre</strong> : la façade d'un bâtiment historique de la ville</li>" +
  "</ul>";
const RESULTAT_ANCIEN = "<p>Une série de trois affiches déclinées autour du sous-titre « Les visages de Montbéliard ».</p>";

migrate((app) => {
  let projet;
  try {
    projet = app.findFirstRecordByData("projets", "slug", SLUG);
  } catch (e) {
    return;
  }
  const dossier = `${app.dataDir()}/../../src/assets/images/captures/${SLUG}`;
  const deja = projet.get("galerie").join(" ");

  // "+galerie" ajoute au début, "galerie+" à la fin : on obtient 1, 2, 3
  if (!/affiche.1/.test(deja)) {
    try { projet.set("+galerie", [$filesystem.fileFromPath(`${dossier}/affiche-1-${SLUG}.jpg`)]); } catch (e) {}
  }
  if (!/affiche.3/.test(deja)) {
    try { projet.set("galerie+", [$filesystem.fileFromPath(`${dossier}/affiche-3-${SLUG}.jpg`)]); } catch (e) {}
  }
  projet.set("resultat", RESULTAT_NOUVEAU);
  app.save(projet);
}, (app) => {
  try {
    const projet = app.findFirstRecordByData("projets", "slug", SLUG);
    projet.set("galerie", projet.get("galerie").filter((f) => !/affiche.[13]/.test(f)));
    projet.set("resultat", RESULTAT_ANCIEN);
    app.save(projet);
  } catch (e) {}
});
