/// <reference path="../pb_data/types.d.ts" />

/**
 * Migration : ajoute le champ "objet" à la collection "messages".
 * Il enregistre la réponse à la question "Vous me contactez pour…"
 * du formulaire plein écran, pour trier les messages d'un coup d'œil
 * dans le back-office (alternance, stage, projet, autre).
 */
migrate((app) => {
  const messages = app.findCollectionByNameOrId("messages");
  messages.fields.add(new SelectField({
    name: "objet",
    values: ["alternance", "stage", "projet", "autre"],
    maxSelect: 1,
  }));
  app.save(messages);
}, (app) => {
  const messages = app.findCollectionByNameOrId("messages");
  messages.fields.removeByName("objet");
  app.save(messages);
});
