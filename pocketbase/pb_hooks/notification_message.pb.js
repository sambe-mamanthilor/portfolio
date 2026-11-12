/// <reference path="../pb_data/types.d.ts" />

/**
 * Notification par e-mail à chaque nouveau message du formulaire de contact.
 *
 * Un "hook" est un bout de code que PocketBase exécute tout seul quand un
 * événement se produit. Ici : juste après l'enregistrement d'un message
 * dans la collection "messages", PocketBase m'envoie un e-mail.
 *
 * Le message est TOUJOURS enregistré, même si l'e-mail ne part pas
 * (le hook s'exécute après l'enregistrement). Il reste donc visible
 * dans l'administration : https://api.maman-sambe.fr/_/
 *
 * Pré-requis : un serveur d'envoi (SMTP) réglé dans l'administration,
 * Settings > Mail settings.
 */
onRecordAfterCreateSuccess((e) => {
  // Les fonctions doivent être déclarées DANS le hook : PocketBase
  // n'a pas accès à ce qui est écrit en dehors.
  const echapper = (texte) =>
    String(texte ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  const OBJETS = { alternance: "une alternance", stage: "un stage", projet: "un projet web", autre: "autre chose" };

  const r = e.record;
  const nom = `${r.getString("prenom")} ${r.getString("nom")}`.trim();
  const objet = OBJETS[r.getString("objet")] || "un message";

  try {
    const reglages = e.app.settings().meta;
    const mail = new MailerMessage({
      from: { address: reglages.senderAddress, name: reglages.senderName },
      to: [{ address: "mamansambe47@gmail.com" }],
      // "Répondre" dans ma messagerie répond directement à la personne
      headers: { "Reply-To": r.getString("email") },
      subject: `Portfolio : nouveau message de ${nom} (${objet})`,
      html: `
        <p><strong>${echapper(nom)}</strong> vous contacte pour <strong>${echapper(objet)}</strong>.</p>
        <p>E-mail : ${echapper(r.getString("email"))}<br>
           Téléphone : ${echapper(r.getString("telephone")) || "non indiqué"}</p>
        <p style="white-space:pre-line;border-left:3px solid #35c3ea;padding-left:12px">${echapper(r.getString("message"))}</p>
        <p><a href="https://api.maman-sambe.fr/_/#/collections?collection=messages">Voir tous les messages</a></p>
      `,
    });
    e.app.newMailClient().send(mail);
  } catch (err) {
    // L'e-mail n'est pas parti (SMTP mal réglé…) : on le note dans les logs,
    // le message reste enregistré.
    e.app.logger().error("Notification de message non envoyée", "erreur", String(err));
  }

  e.next();
}, "messages");
