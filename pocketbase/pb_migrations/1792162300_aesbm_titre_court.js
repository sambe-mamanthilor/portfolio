/// <reference path="../pb_data/types.d.ts" />

/**
 * Migration : ligne de l'AESBM raccourcie.
 * Avant : « Engagement associatif · AESBM — Association des Étudiants Sénégalais
 *          de Belfort-Montbéliard · Belfort-Montbéliard, France »
 * Après : « Engagement associatif · AESBM · Belfort-Montbéliard »
 * Le nom complet de l'association passe en première ligne de la description.
 */
const NOM_LONG = "AESBM — Association des Étudiants Sénégalais de Belfort-Montbéliard";
const INTRO = "<p>Association des Étudiants Sénégalais de Belfort-Montbéliard</p>";

migrate((app) => {
  try {
    const xp = app.findFirstRecordByData("experiences", "structure", NOM_LONG);
    xp.set("structure", "AESBM");
    xp.set("lieu", "Belfort-Montbéliard");
    xp.set("description", INTRO + xp.getString("description"));
    app.save(xp);
  } catch (e) {}
}, (app) => {
  try {
    const xp = app.findFirstRecordByData("experiences", "structure", "AESBM");
    xp.set("structure", NOM_LONG);
    xp.set("lieu", "Belfort-Montbéliard, France");
    xp.set("description", xp.getString("description").replace(INTRO, ""));
    app.save(xp);
  } catch (e) {}
});
