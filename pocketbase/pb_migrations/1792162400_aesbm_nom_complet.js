/// <reference path="../pb_data/types.d.ts" />

/**
 * Migration : sous le titre de l'AESBM, on n'affiche plus que le nom de
 * l'association (« Association des Étudiants Sénégalais de Belfort-Montbéliard »).
 * - structure = nom complet, lieu vidé ;
 * - la ligne « nom complet » ajoutée en haut de la description est retirée ;
 * - le logo est enregistré dans PocketBase (champ "logo"), car le site ne peut
 *   plus le retrouver à partir du premier mot du nom.
 */
const NOM = "Association des Étudiants Sénégalais de Belfort-Montbéliard";
const INTRO = "<p>Association des Étudiants Sénégalais de Belfort-Montbéliard</p>";

migrate((app) => {
  try {
    const xp = app.findFirstRecordByData("experiences", "structure", "AESBM");
    xp.set("structure", NOM);
    xp.set("lieu", "");
    xp.set("description", xp.getString("description").replace(INTRO, ""));
    try {
      const chemin = `${app.dataDir()}/../../src/assets/images/logos/aesbm.png`;
      xp.set("logo", $filesystem.fileFromPath(chemin));
    } catch (e) {}
    app.save(xp);
  } catch (e) {}
}, (app) => {
  try {
    const xp = app.findFirstRecordByData("experiences", "structure", NOM);
    xp.set("structure", "AESBM");
    xp.set("lieu", "Belfort-Montbéliard");
    xp.set("description", INTRO + xp.getString("description"));
    xp.set("logo", null);
    app.save(xp);
  } catch (e) {}
});
