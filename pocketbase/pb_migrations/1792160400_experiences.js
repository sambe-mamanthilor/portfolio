/// <reference path="../pb_data/types.d.ts" />

/**
 * Migration : collection "experiences" (stages, emplois, engagement associatif).
 *
 * Deux champs de date différents, volontairement :
 *  - "periode" : le texte AFFICHÉ sur le site ("Été 2024", "Depuis octobre 2026"),
 *    pour ne pas inventer des jours précis qu'on ne connaît pas ;
 *  - "date_debut" : une vraie date, qui sert uniquement à TRIER
 *    les expériences de la plus récente à la plus ancienne.
 */

const EXPERIENCES = [
  {
    poste: "Adjointe au pôle communication",
    structure: "AESBM — Association des Étudiants Sénégalais de Belfort-Montbéliard",
    lieu: "Belfort-Montbéliard, France",
    type: "associatif",
    periode: "Depuis octobre 2026",
    date_debut: "2026-10-01 00:00:00.000Z",
    en_cours: true,
    description: "<p>Communication de l'association sur ses réseaux sociaux (Instagram, TikTok), au service de ses événements et de ses partenaires, dont BNP Paribas et le CROUS.</p>",
    ordre: 1,
  },
  {
    poste: "Agent administratif (stage)",
    structure: "Loum Consulting",
    lieu: "Dakar, Sénégal",
    type: "stage",
    periode: "Août 2025",
    date_debut: "2025-08-01 00:00:00.000Z",
    en_cours: false,
    description: "<p>Gestion documentaire, structuration des données administratives et organisation des informations. Une mission qui m'a permis de développer une méthodologie rigoureuse, essentielle pour l'architecture de données et la gestion de projets web.</p>",
    ordre: 2,
  },
  {
    poste: "Employée polyvalente (CDI)",
    structure: "Proco Confection",
    lieu: "Dakar, Sénégal",
    type: "emploi",
    periode: "Été 2024",
    date_debut: "2024-07-01 00:00:00.000Z",
    en_cours: false,
    description: "<p>Participation aux étapes de la chaîne de production : étiquetage, préparation et contrôle qualité. Une expérience de terrain qui a renforcé ma précision, mon sens du détail, le respect des cahiers des charges et le travail en équipe sous contrainte de temps.</p>",
    ordre: 3,
  },
];

migrate((app) => {
  const experiences = new Collection({
    type: "base",
    name: "experiences",
    listRule: "publie = true",
    viewRule: "publie = true",
    createRule: null,
    updateRule: null,
    deleteRule: null,
    fields: [
      { type: "text", name: "poste", required: true, max: 120, presentable: true },
      { type: "text", name: "structure", required: true, max: 150 },
      { type: "text", name: "lieu", max: 100 },
      {
        type: "select",
        name: "type",
        maxSelect: 1,
        values: ["stage", "emploi", "alternance", "associatif", "freelance"],
      },
      { type: "text", name: "periode", max: 60 },       // texte affiché
      { type: "date", name: "date_debut" },               // sert au tri
      { type: "bool", name: "en_cours" },
      { type: "editor", name: "description", convertURLs: false },
      {
        type: "file",
        name: "logo",
        maxSelect: 1,
        maxSize: 500000,
        mimeTypes: ["image/svg+xml", "image/png", "image/webp", "image/jpeg"],
      },
      { type: "text", name: "logo_alt", max: 150 },
      { type: "number", name: "ordre", onlyInt: true, min: 0 },
      { type: "bool", name: "publie" },
    ],
  });
  app.save(experiences);

  for (const data of EXPERIENCES) {
    const record = new Record(experiences);
    record.load({ ...data, publie: true });
    app.save(record);
  }
}, (app) => {
  app.delete(app.findCollectionByNameOrId("experiences"));
});
