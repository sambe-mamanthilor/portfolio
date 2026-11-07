/// <reference path="../pb_data/types.d.ts" />

/**
 * Migration : choix des appareils de l'aperçu, et captures mobiles.
 *
 * 1. "format_apercu" (liste) :
 *      - "trio"   (par défaut, si vide) : MacBook + iPad + iPhone ;
 *      - "mobile" : un seul iPhone, pour les sites ou applications pensés
 *        d'abord pour mobile.
 * 2. "captures_mobile" (fichiers) : captures au format téléphone (390 px de
 *    large), affichées dans l'iPhone quand le site ne peut pas être chargé
 *    en direct.
 *
 * Empreintes invisibles : site mobile first → format "mobile", avec 3 captures
 * (accueil, Alice Recoque, glossaire), faites le 6/11/2026 à 390 px de large.
 * Images : src/assets/images/captures/empreintes-invisibles/mobile-1…3-….jpg
 */
migrate((app) => {
  const projets = app.findCollectionByNameOrId("projets");
  projets.fields.add(new SelectField({ name: "format_apercu", maxSelect: 1, values: ["trio", "mobile"] }));
  projets.fields.add(new FileField({
    name: "captures_mobile",
    maxSelect: 8,
    maxSize: 5000000,
    mimeTypes: ["image/jpeg", "image/png", "image/webp"],
  }));
  app.save(projets);

  try {
    const p = app.findFirstRecordByData("projets", "slug", "empreintes-invisibles");
    p.set("format_apercu", "mobile");
    const dossier = `${app.dataDir()}/../../src/assets/images/captures/empreintes-invisibles`;
    const fichiers = [];
    for (let i = 1; i <= 3; i++) {
      try {
        fichiers.push($filesystem.fileFromPath(`${dossier}/mobile-${i}-empreintes-invisibles.jpg`));
      } catch (e) {}
    }
    if (fichiers.length > 0) p.set("captures_mobile", fichiers);
    app.save(p);
  } catch (e) {}
}, (app) => {
  const projets = app.findCollectionByNameOrId("projets");
  projets.fields.removeByName("format_apercu");
  projets.fields.removeByName("captures_mobile");
  app.save(projets);
});
