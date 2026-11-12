/// <reference path="../pb_data/types.d.ts" />

/**
 * Migration : collection "messages" pour le formulaire de contact.
 *
 * Règles d'accès :
 *  - createRule = ""  : n'importe quel visiteur peut ENVOYER un message ;
 *  - list / view / update / delete = null : seule l'administratrice
 *    peut LIRE ou gérer les messages (dans le back-office).
 * Un visiteur ne peut donc jamais lire les messages des autres.
 */
migrate((app) => {
  const messages = new Collection({
    type: "base",
    name: "messages",
    listRule: null,
    viewRule: null,
    createRule: "",
    updateRule: null,
    deleteRule: null,
    fields: [
      { type: "text", name: "prenom", required: true, max: 80 },
      { type: "text", name: "nom", required: true, max: 80 },
      { type: "email", name: "email", required: true },
      { type: "text", name: "telephone", max: 30 },
      { type: "text", name: "message", required: true, min: 10, max: 5000 },
      // Consentement RGPD obligatoire : un bool "required" doit valoir true
      { type: "bool", name: "consentement", required: true },
      { type: "bool", name: "traite" }, // à cocher quand tu as répondu
      { type: "autodate", name: "created", onCreate: true, onUpdate: false },
    ],
  });
  app.save(messages);
}, (app) => {
  app.delete(app.findCollectionByNameOrId("messages"));
});
