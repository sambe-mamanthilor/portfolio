/// <reference path="../pb_data/types.d.ts" />

/**
 * Migration : publie le projet "Micro-trottoir" pour que le filtre
 * "Audiovisuel" apparaisse sur la page Projets.
 *
 * Pourquoi : la page n'affiche que les catégories qui ont au moins un
 * projet PUBLIÉ (sinon le filtre donnerait "0 projet"). Micro-trottoir
 * est le seul projet audiovisuel et il était masqué en attendant la vidéo.
 * Le lien vers la vidéo pourra être ajouté plus tard dans le back-office
 * (champ lien_video). Pour le remasquer : décocher "publie".
 */
migrate((app) => {
  const projet = app.findFirstRecordByData("projets", "slug", "micro-trottoir");
  projet.set("publie", true);
  app.save(projet);
}, (app) => {
  const projet = app.findFirstRecordByData("projets", "slug", "micro-trottoir");
  projet.set("publie", false);
  app.save(projet);
});
