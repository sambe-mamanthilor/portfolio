/// <reference path="../pb_data/types.d.ts" />

/**
 * Migration : le mot « Agile » apparaît sur la page Cielixir.
 * Les recruteurs cherchent ce mot tel quel : on l'écrit dans le contexte,
 * dans le rôle et dans la solution « sprints / Jira ».
 */
const TEXTES = [
  ["contexte",
   "Projet collectif du BUT MMI, mené par périodes avec un livrable à chaque étape.",
   "Projet collectif du BUT MMI, mené en méthode Agile : des sprints, avec un livrable à chaque étape."],
  ["contexte_en",
   "Semester team project of the BUT MMI degree, run in phases with a deliverable at each stage.",
   "Semester team project of the BUT MMI degree, run with an Agile method: sprints, with a deliverable at each stage."],
  ["role",
   "coordination, planification des livrables",
   "coordination en méthode Agile (sprints et tâches suivis sur Jira), planification des livrables"],
  ["role_en",
   "coordination, deliverable planning",
   "Agile coordination (sprints and tasks tracked in Jira), deliverable planning"],
];
const SOLUTIONS = [
  ["difficultes", "Découpage en sprints et suivi des tâches sur Jira",
   "Méthode Agile : travail découpé en sprints, tâches suivies sur Jira"],
  ["difficultes_en", "Work split into sprints and tasks tracked in Jira",
   "Agile method: work split into sprints, tasks tracked in Jira"],
];

function appliquer(app, sens) {
  try {
    const p = app.findFirstRecordByData("projets", "slug", "cielixir");
    for (const [champ, avant, apres] of TEXTES) {
      const [de, vers] = sens ? [avant, apres] : [apres, avant];
      p.set(champ, p.getString(champ).replace(de, vers));
    }
    // "difficultes" est une liste JSON : on la relit, on modifie la bonne solution
    for (const [champ, avant, apres] of SOLUTIONS) {
      const [de, vers] = sens ? [avant, apres] : [apres, avant];
      // getString() donne le texte JSON brut du champ ; JSON.parse le transforme en liste
      const liste = JSON.parse(p.getString(champ) || "[]");
      for (const d of liste) if (d.solution === de) d.solution = vers;
      p.set(champ, liste);
    }
    app.save(p);
  } catch (e) {}
}

migrate((app) => appliquer(app, true), (app) => appliquer(app, false));
