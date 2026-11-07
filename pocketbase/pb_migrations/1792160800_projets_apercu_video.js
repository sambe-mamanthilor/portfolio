/// <reference path="../pb_data/types.d.ts" />

/**
 * Migration : champ "apercu_video" sur les projets.
 *
 * Une courte vidéo MUETTE (5 à 10 s, en boucle) jouée au survol de la
 * carte : idéal pour les sites, avec une capture du parcours utilisateur
 * sur la meilleure page. Formats web : MP4 (H.264) ou WebM, 15 Mo max.
 *
 * Projets sans vidéo : déposer 2 à 4 images dans "galerie" ; elles
 * défilent au survol à la place.
 */
migrate((app) => {
  const projets = app.findCollectionByNameOrId("projets");
  projets.fields.add(new FileField({
    name: "apercu_video",
    maxSelect: 1,
    maxSize: 15000000,
    mimeTypes: ["video/mp4", "video/webm"],
  }));
  app.save(projets);
}, (app) => {
  const projets = app.findCollectionByNameOrId("projets");
  projets.fields.removeByName("apercu_video");
  app.save(projets);
});
