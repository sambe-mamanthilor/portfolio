/// <reference path="../pb_data/types.d.ts" />

/**
 * Migration : distinguer les « projets de semestre » des SAÉ.
 * Au BUT MMI, chaque année compte 2 projets : un individuel au semestre 1
 * (Les empreintes invisibles de la science) et un collectif au semestre 2
 * (Cielixir). Toutes les autres réalisations sont des SAÉ ou des TP.
 *  - nouvelle valeur "projet" dans le champ type_projet ;
 *  - Empreintes invisibles et Cielixir passent en "projet" ;
 *  - les rôles ne commencent plus par « Projet individuel / Projet en binôme ».
 */
const ROLES = [
  ["tiktak", "Projet individuel, de la story map", "De la story map"],
  ["annees-chaudes", "Projet en binôme :", "En binôme :"],
];

migrate((app) => {
  const projets = app.findCollectionByNameOrId("projets");
  const champ = projets.fields.getByName("type_projet");
  if (!champ.values.includes("projet")) {
    champ.values = [...champ.values, "projet"];
    app.save(projets);
  }
  for (const slug of ["empreintes-invisibles", "cielixir"]) {
    try {
      const p = app.findFirstRecordByData("projets", "slug", slug);
      p.set("type_projet", "projet");
      app.save(p);
    } catch (e) {}
  }
  for (const [slug, ancien, nouveau] of ROLES) {
    try {
      const p = app.findFirstRecordByData("projets", "slug", slug);
      p.set("role", p.getString("role").replace(ancien, nouveau));
      app.save(p);
    } catch (e) {}
  }
}, (app) => {
  for (const [slug, ancien, nouveau] of ROLES) {
    try {
      const p = app.findFirstRecordByData("projets", "slug", slug);
      p.set("role", p.getString("role").replace(nouveau, ancien));
      app.save(p);
    } catch (e) {}
  }
  try {
    const p = app.findFirstRecordByData("projets", "slug", "cielixir");
    p.set("type_projet", "sae");
    app.save(p);
  } catch (e) {}
  try {
    const p = app.findFirstRecordByData("projets", "slug", "empreintes-invisibles");
    p.set("type_projet", "");
    app.save(p);
  } catch (e) {}
});
