/// <reference path="../pb_data/types.d.ts" />

/**
 * Migration :
 *  - Années chaudes : le « Processus complet » raconte la vraie démarche de la SAÉ
 *    (données → Observable → site → mise en ligne → data.gouv.fr) au lieu des
 *    4 temps du récit ;
 *  - La Cimade : cadre « Mise en situation professionnelle (SAÉ) » ;
 *  - Les visages de Montbéliard : « Mémoire de pierre » = le second bâtiment du château.
 */
const ETAPES = [
  ["Recherche des données",
   "<p>Recherche de jeux de données publics et fiables sur le climat : les séries homogénéisées de Météo-France (températures et précipitations mensuelles depuis 1959).</p>"],
  ["Analyse et nettoyage",
   "<p>Analyse des données, puis nettoyage : sélection des stations, des périodes et des mesures fiables, pour comparer ce qui est comparable.</p>"],
  ["Étude et graphiques sur Observable",
   "<p>Données chargées dans un notebook Observable pour les étudier, tester les hypothèses et construire les graphiques avec Observable Plot.</p>"],
  ["Intégration du site web",
   "<p>Intégration d'un site Astro qui présente le contexte, la démarche et les résultats : les graphiques et la carte des 28 stations de la région.</p>"],
  ["Mise en ligne",
   "<p>Déploiement sur Netlify, sur mon nom de domaine (maman-sambe.fr).</p>"],
  ["Publication sur data.gouv.fr",
   "<p>Publication du site comme réutilisation officielle des données sur data.gouv.fr, au nom de l'organisation créée avec ma binôme.</p>"],
];

const ANCIENNES = [
  ["Contexte", "<p>Anomalies annuelles des températures maximales à Montbéliard depuis 1959 : les années chaudes se multiplient.</p>"],
  ["Exploration régionale", "<p>Carte des 28 stations de Bourgogne-Franche-Comté : toutes se sont réchauffées, Montbéliard n'est pas un cas isolé.</p>"],
  ["Exploration saisonnière", "<p>Comparaison par saison : l'été et le printemps se réchauffent environ trois fois plus que l'automne.</p>"],
  ["Révélation et ouverture", "<p>Graphique interactif mois par mois, puis mise en regard des températures et des précipitations.</p>"],
];

const VISAGES_AVANT = "<li><strong>Mémoire de pierre</strong> : la façade d'un bâtiment historique de la ville</li>";
const VISAGES_APRES = "<li><strong>Mémoire de pierre</strong> : le second bâtiment du château, à l'arrière</li>";

function remplacerEtapes(app, liste) {
  const projet = app.findFirstRecordByData("projets", "slug", "annees-chaudes");
  for (const e of app.findRecordsByFilter("etapes", "projet = {:id}", "", 0, 0, { id: projet.id })) {
    app.delete(e);
  }
  const collection = app.findCollectionByNameOrId("etapes");
  liste.forEach(([titre, description], i) => {
    const e = new Record(collection);
    e.set("projet", projet.id);
    e.set("titre", titre);
    e.set("description", description);
    e.set("ordre", i + 1);
    app.save(e);
  });
}

function changer(app, slug, champ, avant, apres) {
  try {
    const p = app.findFirstRecordByData("projets", "slug", slug);
    p.set(champ, p.getString(champ).replace(avant, apres));
    app.save(p);
  } catch (e) {}
}

migrate((app) => {
  try { remplacerEtapes(app, ETAPES); } catch (e) {}
  try {
    const p = app.findFirstRecordByData("projets", "slug", "la-cimade");
    p.set("type_projet", "sae");
    app.save(p);
  } catch (e) {}
  changer(app, "visages-de-montbeliard", "resultat", VISAGES_AVANT, VISAGES_APRES);
}, (app) => {
  try { remplacerEtapes(app, ANCIENNES); } catch (e) {}
  try {
    const p = app.findFirstRecordByData("projets", "slug", "la-cimade");
    p.set("type_projet", "");
    app.save(p);
  } catch (e) {}
  changer(app, "visages-de-montbeliard", "resultat", VISAGES_APRES, VISAGES_AVANT);
});
