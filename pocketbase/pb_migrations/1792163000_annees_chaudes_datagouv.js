/// <reference path="../pb_data/types.d.ts" />

/**
 * Migration : nom et lien de la réutilisation publiée sur data.gouv.fr
 * (projet Années chaudes), dans l'étape 6 du processus et dans le résultat.
 */
const URL = "https://www.data.gouv.fr/reuses/evolution-des-temperatures-maximales-a-montbeliard-et-en-bourgogne-franche-comte-depuis-1959";
const NOM = "Évolution des températures maximales à Montbéliard et en Bourgogne-Franche-Comté depuis 1959";
const LIEN = `<a href="${URL}" target="_blank" rel="noopener noreferrer">« ${NOM} »</a>`;

const ETAPE_AVANT = "<p>Publication du site comme réutilisation officielle des données sur data.gouv.fr, au nom de l'organisation créée avec ma binôme.</p>";
const ETAPE_APRES = `<p>Publication du site comme réutilisation officielle des données sur data.gouv.fr : ${LIEN}, au nom de notre organisation « SAÉ 303 — Groupe 5 », créée avec ma binôme.</p>`;

const RESULTAT_AVANT = "une réutilisation publiée sur data.gouv.fr.";
const RESULTAT_APRES = `une réutilisation publiée sur data.gouv.fr, ${LIEN}.`;

function appliquer(app, avant, apres, etapeAvant, etapeApres) {
  const projet = app.findFirstRecordByData("projets", "slug", "annees-chaudes");
  projet.set("resultat", projet.getString("resultat").replace(avant, apres));
  app.save(projet);
  for (const e of app.findRecordsByFilter("etapes", "projet = {:id}", "", 0, 0, { id: projet.id })) {
    if (e.getString("description") === etapeAvant) {
      e.set("description", etapeApres);
      app.save(e);
    }
  }
}

migrate(
  (app) => { try { appliquer(app, RESULTAT_AVANT, RESULTAT_APRES, ETAPE_AVANT, ETAPE_APRES); } catch (e) {} },
  (app) => { try { appliquer(app, RESULTAT_APRES, RESULTAT_AVANT, ETAPE_APRES, ETAPE_AVANT); } catch (e) {} },
);
