/// <reference path="../pb_data/types.d.ts" />

/**
 * Migration : contenu des projets du portfolio.
 *
 * Ce que fait cette migration :
 *  1. ajoute un champ "dossier" (PDF téléchargeable) à la collection projets ;
 *  2. ajoute deux outils manquants (TypeScript, Observable Plot) ;
 *  3. crée les 9 projets et les étapes de leur frise.
 *
 * Les IMAGES et PDF ne sont pas ici : ils s'ajoutent dans le back-office
 * (glisser-déposer dans les champs couverture, galerie, dossier).
 *
 * Les champs "editor" contiennent du HTML simple (<p>, <ul>, <strong>) :
 * c'est le format qu'utilise l'éditeur de texte de PocketBase.
 */

const NOUVEAUX_OUTILS = [
  { nom: "TypeScript", slug: "typescript", type: "langage", afficher_competences: true },
  { nom: "Observable Plot", slug: "observable-plot", type: "framework", afficher_competences: true },
];

const PROJETS = [
  {
    slug: "cielixir",
    titre: "Cielixir",
    resume: "Application web qui recommande une boisson selon la météo en temps réel, les envies et le profil de l'utilisateur.",
    categorie: "dev",
    type_projet: "sae",
    cadre: "collectif",
    taille_equipe: 2,
    role: "Cheffe de projet : coordination, planification des livrables et suivi jusqu'à la soutenance. Conception UX/UI et développement de l'application, de la landing page et des pages légales.",
    date_debut: "2026-03-01 00:00:00.000Z",
    date_fin: "2026-06-05 00:00:00.000Z",
    contexte: "<p>Projet collectif du BUT MMI, mené par périodes avec un livrable à chaque étape. L'objectif : créer une expérience fluide et personnalisée, capable d'interroger une API météo externe et de filtrer une base de boissons selon les choix de l'utilisateur.</p>",
    objectifs: "<ul><li>Recommander une boisson adaptée à la météo et aux envies</li><li>Proposer une expérience personnalisée (comptes, favoris, historique)</li><li>Livrer une application en ligne et une landing page de promotion</li></ul>",
    choix_techniques: "<ul><li><strong>Astro</strong> pour un site rapide, découpé en composants</li><li><strong>PocketBase</strong> pour les comptes, les favoris et l'historique</li><li><strong>API Open-Meteo</strong>, gratuite et sans clé, couplée à la géolocalisation et à une recherche par ville</li><li><strong>Tailwind CSS</strong> pour l'interface</li></ul>",
    resultat: "<p>Une application en ligne et fonctionnelle : météo en temps réel, quiz en 3 questions, catalogue en 9 catégories, comptes utilisateurs, favoris et historique, landing page et pages légales complètes.</p>",
    outils: ["astro", "tailwind", "javascript", "pocketbase", "open-meteo", "figma", "jira", "git"],
    lien_demo: "https://cielixir.ruslanabudniak.fr/landing/",
    lien_github: "https://github.com/MMI-NFC-2025/projet-co-s2-2026-projet-17-cuptail",
    mis_en_avant: true,
    ordre: 1,
    publie: true,
    etapes: [
      ["Concept", "Analyse du marché, des besoins et définition du concept : une recommandation de boissons selon la météo et la géolocalisation."],
      ["Soutenance concept", "Présentation et défense du concept devant le jury."],
      ["Étude et maquettage", "Arborescence, wireframes et prototype interactif sur Figma : détection météo, fiches boissons, filtres, favoris et historique."],
      ["Soutenance maquette", "Défense des choix UX/UI et intégration des retours du jury."],
      ["Développement", "Application web responsive : API météo en temps réel, géolocalisation, filtres, favoris et historique stockés dans PocketBase."],
      ["Soutenance finale", "Démonstration en direct de l'application et bilan de la gestion de projet."],
    ],
  },
  {
    slug: "annees-chaudes",
    titre: "Alors, les années chaudes sont-elles devenues la norme ?",
    resume: "Data storytelling sur l'évolution des températures maximales à Montbéliard et en Bourgogne-Franche-Comté depuis 1959, à partir de l'open data Météo-France.",
    categorie: "dev",
    type_projet: "sae",
    cadre: "collectif",
    taille_equipe: 2,
    role: "Projet en binôme : conception du récit et des visualisations, développement du site Astro, mise en ligne (Netlify, domaine sur Infomaniak) et publication de la réutilisation sur data.gouv.fr.",
    date_debut: "2026-10-01 00:00:00.000Z",
    date_fin: "2026-10-31 00:00:00.000Z",
    contexte: "<p>SAÉ 303 du BUT MMI, défi « Changement climatique » de l'Open Data University. La question : les années chaudes sont-elles devenues la norme à Montbéliard ? Ce réchauffement est-il local ou régional, et touche-t-il toutes les saisons de la même façon ?</p>",
    objectifs: "<ul><li>Exploiter des données publiques fiables (Météo-France, séries homogénéisées)</li><li>Raconter une histoire claire en 4 temps et 5 visualisations</li><li>Publier un site accessible et une réutilisation sur data.gouv.fr</li></ul>",
    choix_techniques: "<ul><li><strong>Graphiques dessinés au build</strong> et livrés en SVG, sans JavaScript, pour la performance ; seul le graphique interactif est dessiné dans le navigateur</li><li><strong>Fonctions paramétrées</strong> : chaque visualisation reçoit ses données, et les titres sont calculés à partir des données (aucun chiffre écrit à la main)</li><li><strong>Accessibilité</strong> : figure/figcaption, aria-label, infobulles utilisables au clavier, thème clair et sombre</li><li><strong>Problème résolu</strong> : la légende en dégradé plantait côté serveur (JSDOM n'a pas de canvas) ; remplacée par une légende en 4 classes, plus lisible</li></ul>",
    resultat: "<p>Un site en ligne, un notebook Observable, un dépôt GitHub public et une réutilisation publiée sur data.gouv.fr. Message clé : les 28 stations de la région se sont toutes réchauffées (+1,19 à +1,58 °C), et l'été comme le printemps se réchauffent environ trois fois plus que l'automne.</p>",
    outils: ["astro", "tailwind", "typescript", "observable-plot", "git", "netlify"],
    lien_demo: "https://sae303-groupe5.maman-sambe.fr/",
    lien_github: "https://github.com/sambe-mamanthilor/sae303",
    mis_en_avant: true,
    ordre: 2,
    publie: true,
    etapes: [
      ["Contexte", "Anomalies annuelles des températures maximales à Montbéliard depuis 1959 : les années chaudes se multiplient."],
      ["Exploration régionale", "Carte des 28 stations de Bourgogne-Franche-Comté : toutes se sont réchauffées, Montbéliard n'est pas un cas isolé."],
      ["Exploration saisonnière", "Comparaison par saison : l'été et le printemps se réchauffent environ trois fois plus que l'automne."],
      ["Révélation et ouverture", "Graphique interactif mois par mois, puis mise en regard des températures et des précipitations."],
    ],
  },
  {
    slug: "olyvia",
    titre: "Olyvia",
    resume: "Concept d'application qui accompagne les femmes pendant la préménopause et la ménopause : suivi personnalisé, ressources fiables et espace d'échange bienveillant.",
    categorie: "design",
    type_projet: "sae",
    cadre: "collectif",
    taille_equipe: 3,
    role: "Intervieweuse lors des 6 entretiens utilisateurs, puis création, intégration et hébergement du site WordPress.",
    date_debut: "2026-05-20 00:00:00.000Z",
    date_fin: "2026-06-28 00:00:00.000Z",
    contexte: "<p>SAÉ 201-202 mêlant recherche utilisateur, stratégie de communication et création numérique, autour d'un public encore peu pris en compte par les outils numériques.</p>",
    objectifs: "<ul><li>Comprendre les besoins réels de la cible par des entretiens</li><li>Concevoir une identité et un site adaptés à ce public</li><li>Produire un publireportage à partir des témoignages recueillis</li></ul>",
    choix_techniques: "<ul><li><strong>WordPress</strong> hébergé sur Infomaniak, thème <strong>Astra</strong> pour une interface claire</li><li><strong>Polylang</strong> pour la version bilingue français/anglais</li><li><strong>Yoast SEO</strong> pour le référencement, <strong>WP Super Cache</strong> et <strong>Smush</strong> pour la performance</li><li><strong>Wordfence</strong> et <strong>Really Simple Security</strong> pour la sécurité</li></ul>",
    resultat: "<p>Un site WordPress bilingue, une étude utilisateur complète (6 entretiens, analyses qualitative et quantitative) et un publireportage construit à partir de vrais témoignages.</p>",
    outils: ["wordpress", "figma", "davinci-resolve", "trello", "miro"],
    lien_demo: "",
    lien_github: "",
    mis_en_avant: true,
    ordre: 3,
    publie: true,
    etapes: [
      ["Recherche documentaire", "Analyse du sujet, de la cible et de la concurrence."],
      ["Entretiens utilisateurs", "6 entretiens avec des femmes de 42 à 74 ans, menés dans un cadre bienveillant et anonyme."],
      ["Analyse", "Synthèse des besoins : informations fiables, conseils pratiques, témoignages, simplicité et confidentialité."],
      ["Identité et maquettes", "Identité visuelle, logo et maquettes Figma."],
      ["Site et vidéo", "Création du site WordPress bilingue et réalisation du publireportage."],
    ],
  },
  {
    slug: "la-cimade",
    titre: "La Cimade : refonte d'identité visuelle",
    resume: "Refonte du logo et de l'identité visuelle d'une association de défense des droits des personnes migrantes : moderniser son image en gardant ses valeurs d'union et de solidarité.",
    categorie: "design",
    type_projet: "",
    cadre: "individuel",
    taille_equipe: 1,
    role: "Conception complète de l'identité : audit, benchmark, axes créatifs, logo, charte graphique et déclinaisons.",
    date_debut: "2026-01-20 00:00:00.000Z",
    date_fin: "2026-03-16 00:00:00.000Z",
    contexte: "<p>La Cimade avait une identité militante forte, mais un graphisme vieillissant, une lisibilité variable selon les supports et un système graphique limité. L'objectif : moderniser son image sans perdre ce qui fait sa force.</p>",
    objectifs: "<ul><li>Conserver l'engagement et la dimension humaine</li><li>Éviter le graphisme trop institutionnel et les symboles clichés</li><li>Construire un système graphique cohérent</li></ul>",
    choix_techniques: "<ul><li><strong>Rouge #B22727</strong> pour l'engagement et la mobilisation, <strong>noir</strong> pour le sérieux et la stabilité</li><li><strong>Inter</strong> pour une lisibilité optimale sur tous les supports</li><li>Tests de lisibilité en petit, moyen et grand format, et règles d'usages interdits</li></ul>",
    resultat: "<p>Un logo fondé sur l'idée d'union (des mains assemblées au cœur du nom) et sa charte, déclinés en post et story Instagram, affiche A3, bannière web et slides de présentation.</p>",
    outils: ["figma", "canva"],
    lien_demo: "",
    lien_github: "",
    mis_en_avant: false,
    ordre: 4,
    publie: true,
    etapes: [
      ["Audit", "Analyse du logo existant : forces, faiblesses, couleurs et typographie."],
      ["Benchmark", "Étude des identités de France Terre d'Asile et d'Amnesty International."],
      ["Axes créatifs", "Deux pistes, l'Union et la Revendication, et un anti-axe : la communication institutionnelle froide."],
      ["Recherches", "Croquis à la main puis explorations numériques."],
      ["Logo et charte", "Choix de l'axe Union, logo final, couleurs, typographie, règles d'usage et déclinaisons."],
    ],
  },
  {
    slug: "elm-design",
    titre: "Elm Design : création d'une agence de design",
    resume: "Création complète d'une agence fictive de design graphique et de communication visuelle à Pontarlier, du positionnement à l'identité visuelle et à la stratégie de lancement.",
    categorie: "design",
    type_projet: "sae",
    cadre: "collectif",
    taille_equipe: 3,
    role: "Project Manager. Conception du logo, des affiches et de l'ensemble de l'identité visuelle de l'agence, avec ses déclinaisons réseaux sociaux et print.",
    date_debut: "2025-12-01 00:00:00.000Z",
    date_fin: "2025-12-19 00:00:00.000Z",
    contexte: "<p>SAÉ 106 : imaginer une entreprise de design crédible, de son positionnement à sa stratégie de communication, et la présenter en anglais devant un jury.</p>",
    objectifs: "<ul><li>Définir un positionnement clair : « Design, differently »</li><li>Créer une identité visuelle élégante, simple, stable et moderne</li><li>Construire un plan de lancement réaliste</li></ul>",
    choix_techniques: "<ul><li><strong>Trello</strong> pour organiser l'équipe et suivre les délais</li><li><strong>Statut SAS</strong> pour la responsabilité limitée et la souplesse de gouvernance</li><li><strong>Stratégie sur 3 mois</strong> : visibilité, engagement puis conversion, avec un concours « logo offert »</li></ul>",
    resultat: "<p>Une identité complète déclinée en post et story Instagram, bannière Facebook et LinkedIn, carte de visite, flyer et affiche, présentée en anglais.</p>",
    outils: ["canva", "trello", "figma"],
    lien_demo: "",
    lien_github: "",
    mis_en_avant: false,
    ordre: 5,
    publie: true,
    etapes: [
      ["Positionnement", "Services, valeurs et signature de l'agence."],
      ["Identité visuelle", "Logo, couleurs et déclinaisons autour de quatre mots : élégance, simplicité, stabilité, modernité."],
      ["Organisation", "Gestion de projet sur Trello, workflow, budget et choix du statut juridique."],
      ["Stratégie de lancement", "Plan de communication sur 3 mois et soutenance en anglais."],
    ],
  },
  {
    slug: "festival-musique",
    titre: "Festival de musique : de l'audit au site web",
    resume: "De l'analyse d'un festival existant à la création d'un concept retenu parmi les 7 meilleurs de la promo, jusqu'au développement du site de La Fanfa'Comtoise.",
    categorie: "dev",
    type_projet: "sae",
    cadre: "",
    taille_equipe: null,
    role: "Audit, création du concept « Les Rives du Territoire » et de sa stratégie de communication, puis maquette, prototype et intégration du site de La Fanfa'Comtoise.",
    date_debut: "2025-09-01 00:00:00.000Z",
    date_fin: "",
    contexte: "<p>Suite de SAÉ du premier semestre autour d'un festival de musique dans le Nord Franche-Comté : analyser, imaginer, puis réaliser.</p>",
    objectifs: "<ul><li>Analyser la communication d'un festival existant</li><li>Créer son propre festival et sa stratégie de communication numérique</li><li>Concevoir et développer un site responsive</li></ul>",
    choix_techniques: "<ul><li><strong>HTML, CSS et JavaScript</strong> sans framework</li><li><strong>Carrousel</strong> et <strong>menu mobile</strong> accessibles (navigation nommée, boutons libellés)</li><li>Programme téléchargeable en PDF</li></ul>",
    resultat: "<p>Un concept de festival retenu parmi les 7 meilleurs projets de la promotion, puis un site responsive en ligne pour La Fanfa'Comtoise.</p>",
    outils: ["html", "css", "javascript", "figma", "canva"],
    lien_demo: "https://lafanfacomtoise.maman-sambe.fr/",
    lien_github: "",
    mis_en_avant: false,
    ordre: 6,
    publie: true,
    etapes: [
      ["Audit", "Analyse de la communication web d'un festival existant (SAÉ 101)."],
      ["Stratégie", "Création du festival « Les Rives du Territoire » : positionnement, cible et plan de communication numérique (SAÉ 102)."],
      ["Sélection", "Concept retenu parmi les 7 meilleurs projets de la promotion."],
      ["Maquette et prototype", "Conception du site de La Fanfa'Comtoise, un autre concept sélectionné."],
      ["Développement", "Intégration du site responsive : carrousel, menu mobile et programme téléchargeable."],
    ],
  },
  {
    slug: "empreintes-invisibles",
    titre: "Les empreintes invisibles de la science",
    resume: "Site de vulgarisation consacré à Alice Recoque, pionnière française de l'informatique et de l'IA, et à l'effet Matilda.",
    categorie: "dev",
    type_projet: "",
    cadre: "individuel",
    taille_equipe: 1,
    role: "Conception et réalisation complètes : recherche, dossier de communication bilingue, maquette et développement du site.",
    date_debut: "2025-09-01 00:00:00.000Z",
    date_fin: "2025-10-24 00:00:00.000Z",
    contexte: "<p>Premier projet individuel du BUT MMI : rendre visible une femme scientifique oubliée et sensibiliser aux inégalités de reconnaissance dans les sciences.</p>",
    objectifs: "<ul><li>Site mobile-first et bilingue français/anglais</li><li>Score EcoIndex A</li><li>5 contenus principaux et 8 articles secondaires</li></ul>",
    choix_techniques: "<ul><li><strong>HTML, CSS et JavaScript</strong>, conception mobile-first</li><li>Sobriété numérique : images légères et animations sobres</li><li>Démarche documentée : GANTT, SWOT, DEEPLIST, persona, arborescence, storyboard</li></ul>",
    resultat: "<p>Un site bilingue en ligne (frise des femmes scientifiques, galerie de films, glossaire, contact) et un dossier de communication complet en français et en anglais.</p>",
    outils: ["html", "css", "javascript", "miro"],
    lien_demo: "https://empreintes-invisibles-de-la-science.maman-sambe.fr/",
    lien_github: "",
    mis_en_avant: false,
    ordre: 7,
    publie: true,
    etapes: [],
  },
  {
    slug: "micro-trottoir",
    titre: "Micro-trottoir : le marché de Noël de Montbéliard",
    resume: "Reportage vidéo bilingue réalisé au marché de Noël de Montbéliard : tournage, traduction, doublage et montage.",
    categorie: "audiovisuel",
    type_projet: "sae",
    cadre: "collectif",
    taille_equipe: 2,
    role: "Tournage (cadre, prise de son, autorisations de droit à l'image), traduction en anglais et doublage, introduction et conclusion en français, compte rendu.",
    date_debut: "2025-12-01 00:00:00.000Z",
    date_fin: "2025-12-19 00:00:00.000Z",
    contexte: "<p>SAÉ 104 : réaliser un micro-trottoir vidéo autour de la question « Que pensez-vous du marché de Noël de Montbéliard ? », avec une version bilingue.</p>",
    objectifs: "<ul><li>Maîtriser le tournage en extérieur (cadre, son, lumière)</li><li>Respecter le droit à l'image</li><li>Produire une version bilingue français/anglais</li></ul>",
    choix_techniques: "<ul><li>Caméra JVC, micro main Rode Reporter, câble XLR, casque</li><li>Son PCM non compressé, balance des blancs, mise au point manuelle</li><li>Montage et doublage sur <strong>DaVinci Resolve</strong></li></ul>",
    resultat: "<p>Un micro-trottoir monté en version française et anglaise, malgré un cadrage manuel sans repères et une prise de son en extérieur.</p>",
    outils: ["davinci-resolve"],
    lien_demo: "",
    lien_github: "",
    mis_en_avant: false,
    ordre: 8,
    publie: false, // en attente de la vidéo finale
    etapes: [
      ["Préparation", "Réservation du matériel et réglages : son PCM, balance des blancs, mise au point."],
      ["Tournage", "Interviews de passants, mise en confiance et autorisations de droit à l'image signées."],
      ["Post-production", "Transcription, traduction en anglais, doublage et montage sur DaVinci Resolve."],
    ],
  },
  {
    slug: "visages-de-montbeliard",
    titre: "Les visages de Montbéliard",
    resume: "Série de trois affiches illustrées en vectoriel qui mettent en valeur les bâtiments emblématiques de Montbéliard.",
    categorie: "design",
    type_projet: "cours",
    cadre: "individuel",
    taille_equipe: 1,
    role: "Conception et illustration complètes de la série.",
    date_debut: "2026-04-01 00:00:00.000Z",
    date_fin: "2026-05-25 00:00:00.000Z",
    contexte: "<p>TP de Culture artistique : représenter les bâtiments emblématiques de Montbéliard dans une série d'affiches pour le Pays de Montbéliard Tourisme.</p>",
    objectifs: "<ul><li>Illustrer des bâtiments réels en vectoriel</li><li>Penser une série cohérente : une couleur et une accroche par affiche</li></ul>",
    choix_techniques: "<ul><li>Illustration vectorielle sur <strong>Affinity</strong> à partir de photos de référence</li><li>Trois accroches : « L'héritage des hauteurs », « Entre pierre & ciel », « Mémoire de pierre »</li></ul>",
    resultat: "<p>Une série de trois affiches déclinées autour du sous-titre « Les visages de Montbéliard ».</p>",
    outils: ["affinity"],
    lien_demo: "",
    lien_github: "",
    mis_en_avant: false,
    ordre: 9,
    publie: true,
    etapes: [],
  },
];

migrate((app) => {
  // 1. Champ "dossier" : un PDF téléchargeable par projet
  const colProjets = app.findCollectionByNameOrId("projets");
  colProjets.fields.add(new FileField({
    name: "dossier",
    maxSelect: 1,
    maxSize: 15000000, // 15 Mo max : compresser les PDF avant de les déposer
    mimeTypes: ["application/pdf"],
  }));
  app.save(colProjets);

  // 2. Outils manquants
  const colOutils = app.findCollectionByNameOrId("outils");
  for (const data of NOUVEAUX_OUTILS) {
    const record = new Record(colOutils);
    record.load(data);
    app.save(record);
  }

  // Petites fonctions utilitaires : retrouver un id à partir d'un slug
  const idCategorie = (slug) => app.findFirstRecordByData("categories", "slug", slug).id;
  const idOutil = (slug) => app.findFirstRecordByData("outils", "slug", slug).id;

  // 3. Projets et étapes
  const colEtapes = app.findCollectionByNameOrId("etapes");

  for (const p of PROJETS) {
    const { etapes, categorie, outils, ...champs } = p;

    const projet = new Record(colProjets);
    projet.load(champs);
    projet.set("categorie", idCategorie(categorie));
    projet.set("outils", outils.map(idOutil));
    app.save(projet);

    etapes.forEach(([titre, description], index) => {
      const etape = new Record(colEtapes);
      etape.load({
        projet: projet.id,
        titre,
        description: `<p>${description}</p>`,
        ordre: index + 1,
      });
      app.save(etape);
    });
  }
}, (app) => {
  // Retour en arrière : supprimer les projets (leurs étapes partent
  // avec eux grâce à cascadeDelete), les deux outils et le champ dossier.
  for (const { slug } of PROJETS) {
    const record = app.findFirstRecordByData("projets", "slug", slug);
    app.delete(record);
  }
  for (const { slug } of NOUVEAUX_OUTILS) {
    app.delete(app.findFirstRecordByData("outils", "slug", slug));
  }
  const colProjets = app.findCollectionByNameOrId("projets");
  colProjets.fields.removeByName("dossier");
  app.save(colProjets);
});
