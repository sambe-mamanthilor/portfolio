/// <reference path="../pb_data/types.d.ts" />

/**
 * Migration : descriptions des expériences présentées en liste à puces
 * (ce que j'y ai fait, une action par ligne), plus lisibles pour un recruteur.
 * AESBM : ajout du site web de l'association, que je conçois et développe.
 */
const DESCRIPTIONS = {
  "AESBM — Association des Étudiants Sénégalais de Belfort-Montbéliard":
    "<ul>" +
    "<li>Conception et développement du site web de l’association (en cours)</li>" +
    "<li>Gestion des réseaux sociaux : Instagram et TikTok</li>" +
    "<li>Mise en avant des événements et des partenaires, dont BNP Paribas et le CROUS</li>" +
    "</ul>",
  "Loum Consulting":
    "<ul>" +
    "<li>Classement, saisie et organisation de documents administratifs</li>" +
    "<li>Gestion et mise à jour des bases de données internes</li>" +
    "<li>Maintien d’un environnement de travail structuré et organisé</li>" +
    "</ul>",
  "Proco Confection":
    "<ul>" +
    "<li>Étiquetage, comptage et emballage de pièces textiles</li>" +
    "<li>Opérations de sérigraphie</li>" +
    "<li>Application des consignes de qualité et des règles d’hygiène sur la chaîne de production</li>" +
    "</ul>",
};

const ANCIENNES = {
  "AESBM — Association des Étudiants Sénégalais de Belfort-Montbéliard":
    "<p>Communication de l'association sur ses réseaux sociaux (Instagram, TikTok), au service de ses événements et de ses partenaires, dont BNP Paribas et le CROUS.</p>",
  "Loum Consulting":
    "<p>Gestion documentaire, structuration des données administratives et organisation des informations. Une mission qui m'a permis de développer une méthodologie rigoureuse, essentielle pour l'architecture de données et la gestion de projets web.</p>",
  "Proco Confection":
    "<p>Participation aux étapes de la chaîne de production : étiquetage, préparation et contrôle qualité. Une expérience de terrain qui a renforcé ma précision, mon sens du détail, le respect des cahiers des charges et le travail en équipe sous contrainte de temps.</p>",
};

function appliquer(app, textes) {
  for (const [structure, html] of Object.entries(textes)) {
    try {
      const xp = app.findFirstRecordByData("experiences", "structure", structure);
      xp.set("description", html);
      app.save(xp);
    } catch (e) {}
  }
}

migrate((app) => appliquer(app, DESCRIPTIONS), (app) => appliquer(app, ANCIENNES));
