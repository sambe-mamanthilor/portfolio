/// <reference path="../pb_data/types.d.ts" />

/**
 * Migration : « SAÉ » est expliqué dans chaque contexte de projet.
 * Un recruteur hors BUT ne connaît pas ce sigle : on écrit d'abord
 * « mise en situation professionnelle », puis le numéro de SAÉ entre parenthèses.
 */
const REMPLACEMENTS = [
  ["SAÉ 301 « Concevoir et développer une expérience utilisateur » du BUT MMI.",
   "Mise en situation professionnelle du BUT MMI (SAÉ 301) : « Concevoir et développer une expérience utilisateur »."],
  ["SAÉ 303 du BUT MMI,", "Mise en situation professionnelle du BUT MMI (SAÉ 303),"],
  ["SAÉ 201-202 mêlant", "Mise en situation professionnelle (SAÉ 201-202) mêlant"],
  ["SAÉ 106 :", "Mise en situation professionnelle (SAÉ 106) :"],
  ["SAÉ 104 :", "Mise en situation professionnelle (SAÉ 104) :"],
  ["Suite de SAÉ du premier semestre", "Suite de mises en situation professionnelles (SAÉ) du premier semestre"],
];

function remplacer(app, sens) {
  const projets = app.findAllRecords("projets");
  for (const p of projets) {
    let texte = p.getString("contexte");
    const avant = texte;
    for (const [ancien, nouveau] of REMPLACEMENTS) {
      texte = sens ? texte.split(ancien).join(nouveau) : texte.split(nouveau).join(ancien);
    }
    if (texte !== avant) {
      p.set("contexte", texte);
      app.save(p);
    }
  }
}

migrate((app) => remplacer(app, true), (app) => remplacer(app, false));
