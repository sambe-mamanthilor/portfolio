/// <reference path="../pb_data/types.d.ts" />

/**
 * Migration : l'emploi chez Proco Confection était un CDD d'été (pas un CDI).
 */
migrate((app) => {
  try {
    const xp = app.findFirstRecordByData("experiences", "structure", "Proco Confection");
    xp.set("poste", "Employée polyvalente (CDD d’été)");
    app.save(xp);
  } catch (e) {}
}, (app) => {
  try {
    const xp = app.findFirstRecordByData("experiences", "structure", "Proco Confection");
    xp.set("poste", "Employée polyvalente (CDI)");
    app.save(xp);
  } catch (e) {}
});
