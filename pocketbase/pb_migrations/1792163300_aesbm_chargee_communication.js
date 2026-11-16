/// <reference path="../pb_data/types.d.ts" />

/**
 * Migration : expérience AESBM alignée sur le CV.
 *  - poste : « Chargée de communication » (au lieu de « Adjointe au pôle communication ») ;
 *  - réseaux sociaux : ajout de YouTube.
 */
const AVANT = {
  poste: "Adjointe au pôle communication",
  poste_en: "Deputy communications officer",
  reseaux: "Gestion des réseaux sociaux : Instagram et TikTok",
  reseaux_en: "Managing social media: Instagram and TikTok",
};
const APRES = {
  poste: "Chargée de communication",
  poste_en: "Communications officer",
  reseaux: "Gestion des réseaux sociaux : Instagram, TikTok et YouTube",
  reseaux_en: "Managing social media: Instagram, TikTok and YouTube",
};

function appliquer(app, de, vers) {
  try {
    const xp = app.findFirstRecordByFilter("experiences", "structure ~ 'Sénégalais'");
    xp.set("poste", vers.poste);
    xp.set("poste_en", vers.poste_en);
    xp.set("description", xp.getString("description").replace(de.reseaux, vers.reseaux));
    xp.set("description_en", xp.getString("description_en").replace(de.reseaux_en, vers.reseaux_en));
    app.save(xp);
  } catch (e) {}
}

migrate((app) => appliquer(app, AVANT, APRES), (app) => appliquer(app, APRES, AVANT));
