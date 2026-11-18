# Déclaration d'usage de l'intelligence artificielle

Conformément au cahier des charges du projet individuel S3, ce fichier déclare chaque outil d'IA utilisé : à quelle étape, pour quoi faire, et ce que j'ai modifié, corrigé ou rejeté dans ce qu'il a produit.

## Outils utilisés

| Outil | Étape | Usage |
|---|---|---|
| Claude (Anthropic) | Refonte technique (oct. → nov. 2026) | Accompagnement façon « développeuse senior » : analyse de la maquette, architecture, écriture du code avec explication de chaque fichier, relecture qualité |
| Claude (Anthropic) | Base de données et déploiement | Schéma et migrations PocketBase, connexion Astro ↔ PocketBase, mise en ligne sur le VPS et Netlify (commandes expliquées, exécutées par moi) |
| Claude (Anthropic) | Contenus | Reformulation des fiches projets à partir de mes informations, traduction anglaise |
| Claude (Anthropic) | Maquette | Reconstruction dans Figma des pages du site final, à côté de ma maquette d'origine (conservée) |

## Journal détaillé

### 16/10/2026 — Cadrage et migration Tailwind 4 / daisyUI

- **Demande** : analyser la maquette Figma, l'ancien code et le sujet ; migrer le projet de Tailwind 3 vers Tailwind 4 + daisyUI 5.
- **Produit par l'IA** : `astro.config.mjs`, `src/styles/global.css` (thème daisyUI « mts »), `src/layouts/Layout.astro`.
- **Ce que j'ai décidé / modifié** : choix de la stack (Astro, Tailwind, daisyUI, PocketBase) ; je voulais garder Astro, que j'utilisais déjà, et ajouter une base de données pour ne plus écrire mes projets en dur.
- **Ce que l'IA a relevé et que j'ai accepté** : contraste insuffisant du texte blanc sur le cyan `#0ea3cd` (2,94:1) → texte bleu nuit ; polices auto-hébergées au lieu de Google Fonts.
- **Ce que je sais expliquer** : Tailwind 4 se configure directement dans le CSS avec `@theme`, sans fichier `tailwind.config` ; daisyUI me donne des composants (boutons, cartes) que j'ai adaptés avec mes couleurs dans le thème « mts » ; les polices sont dans le site, donc aucune donnée n'est envoyée à Google.

### 19/10 → 29/10/2026 — PocketBase et connexion au site

- **Demande** : passer d'un site aux contenus écrits en dur à un back-office ; une fiche par projet.
- **Produit par l'IA** : migrations PocketBase (schéma `categories`, `outils`, `projets`, `etapes`, `experiences`, `messages`), données de référence, `src/lib/pocketbase.ts`.
- **Ce que j'ai décidé / modifié** : PocketBase plutôt qu'un CMS ; contenu de chaque projet fourni par moi (cadre, rôle, outils, dates).
- **Ce que je sais expliquer** : une migration, c'est un fichier qui décrit les changements de la base, comme un commit pour la base de données ; au moment du build, `src/lib/pocketbase.ts` va chercher mes projets dans PocketBase, et `getStaticPaths` crée une page pour chaque projet.

### 07/11 → 12/11/2026 — Refonte des pages, contenus et version anglaise

- **Demande** : recoder toutes les pages d'après la maquette, rédiger les études de cas, ajouter une version anglaise.
- **Produit par l'IA** : composants Astro (`src/components/`), pages partagées FR/EN (`src/vues/`), système de traduction (`src/i18n/`), textes des projets, traduction anglaise.
- **Ce que j'ai corrigé** (l'IA s'était trompée ou ne savait pas) :
  - les projets de semestre ne sont pas des SAÉ ; le festival de musique est une SAÉ ; ajout d'une explication de ce qu'est une SAÉ pour les recruteurs ;
  - contexte réel de La Cimade (TP, mise en situation professionnelle), des Visages de Montbéliard (individuel, 5 jours) et du processus des Années chaudes (données, Observable, Netlify, data.gouv) ;
  - ma binôme est citée par son nom (Ruslana Budniak) sur les projets faits ensemble ;
  - mon rôle à l'AESBM : « Chargée de communication », avec YouTube ;
  - hébergeur des mentions légales : Infomaniak (corrigé ensuite le 18/11 : Infomaniak gère seulement le nom de domaine).
- **Ce que j'ai rejeté** : les peintures ajoutées en décoration (pas assez belles, retirées) ; le premier sélecteur de langue (j'ai choisi la proposition C : globe + FR | EN).
- **Ce que j'ai demandé en plus** : deux types de boutons seulement ; une section sombre au milieu des pages À propos et Projet ; l'animation d'ouverture (photo puis nom tapé au clavier), en donnant deux sites en référence ; les cartes SQLite et IA dans mes compétences ; mon nouveau CV.
- **Bug corrigé** : l'animation du carrousel de compétences était cassée par une ligne de code mal placée par l'IA.
- **Ce que je sais expliquer** : une page FR et sa page EN utilisent la même « vue » dans `src/vues/`, et la fonction `tr()` choisit le texte selon la langue ; les composants me permettent d'écrire une seule fois le header, le footer ou une carte projet et de les réutiliser partout.

### 12/11 → 17/11/2026 — Mise en ligne

- **Demande** : mettre en ligne le site et la base de données.
- **Produit par l'IA** : explications et commandes pour le service PocketBase (systemd), Apache et le certificat HTTPS de `api.maman-sambe.fr`, variables d'environnement Netlify ; script d'e-mail à chaque message du formulaire (`pocketbase/pb_hooks/`).
- **Ce que j'ai fait moi-même** : connexion SSH au VPS, exécution des commandes, copie des fichiers, réglage de l'envoi d'e-mails ; les mots de passe ont toujours été saisis par moi.
- **Problèmes rencontrés** : mon push était parti sur la branche `refonte` au lieu de `main` ; les images de PocketBase n'avaient pas été copiées sur le VPS (repéré par l'IA, corrigé par une copie `scp`) ; une panne passagère de PocketBase a bloqué un déploiement Netlify.
- **Ce que je sais expliquer** : le site est sur Netlify, qui le reconstruit à chaque push ; PocketBase tourne sur le VPS comme service `systemd`, donc il redémarre tout seul ; Apache redirige `api.maman-sambe.fr` vers PocketBase avec le certificat HTTPS ; à chaque nouveau message, le hook m'envoie un e-mail.

### 15/11 → 17/11/2026 — Dégradé des zones sombres et maquette Figma

- **Ce que j'ai repéré** : l'IA avait oublié le dégradé de ma maquette dans les zones sombres. Une fois ajouté, je l'ai trouvé trop clair (effet « flou ») : l'IA m'a montré 3 intensités et j'ai choisi la plus douce (`#1b2a4a`), qui reprend la teinte du pied de page.
- **Maquette** : l'IA a reconstruit les 5 pages du site dans Figma à côté de ma maquette d'origine, que j'ai demandé de garder intacte.
- **Erreurs de l'IA corrigées** : icônes LinkedIn / GitHub mal dessinées dans Figma, texte de recherche coupé sur deux lignes.

### 18/11/2026 — Grille, maquette mobile et contrôle qualité

- **Demande** : respecter la grille vue en 1re année, faire la maquette mobile, vérifier que tout respecte le sujet.
- **Produit par l'IA** : classes de grille 12 colonnes dans 4 pages ; pages ordinateur et mobiles (grille de 4 colonnes) dans Figma ; tests Lighthouse, axe et Playwright ; brouillons de `QUALITE.md` et de ce journal à partir de l'historique Git ; `src/pages/sitemap.xml.ts` et `public/robots.txt`.
- **Problèmes trouvés par les tests et corrigés** : contraste des petits libellés de la page projet (4,07:1 → 4,65:1), nom accessible du logo, sitemap et robots.txt absents, hébergeurs faux dans les mentions légales.
- **Ce que j'ai vérifié / modifié** : j'ai demandé que le journal soit réécrit avec mes mots, parce que la première version ressemblait trop à un texte d'IA ; j'ai donné ce que j'ai mis à jour sur LinkedIn (projets, poste de chargée de communication, expériences, compétences, post de lancement) ; j'ai vérifié dans Figma que la grille correspond au code avant de faire le push.
- **Limites** : l'IA n'a pas pu tester le site en ligne (accès bloqué depuis son environnement) ; les mesures viennent du build de production en local. Je refais Lighthouse sur le site en ligne.

## Ce que je dois savoir expliquer avant la soutenance

Le jury tire au sort une portion du code. Pour chaque fichier, je coche quand je sais l'expliquer sans aide :

- [ ] `src/layouts/Layout.astro` : structure commune, balises SEO, thème clair / sombre
- [ ] `src/lib/pocketbase.ts` : comment le site récupère les projets au moment du build
- [ ] `src/pages/projets/[slug].astro` : `getStaticPaths`, une page générée par projet
- [ ] `src/i18n/index.ts` : comment marche la version anglaise
- [ ] `src/components/Header.astro` : menu, sélecteur de langue, accessibilité
- [ ] `src/components/HeroCouverture.astro` : l'animation d'ouverture et `prefers-reduced-motion`
- [ ] `src/components/CarrouselCompetences.astro` : le carrousel en JavaScript
- [ ] `src/styles/global.css` : thème daisyUI, `@theme`, classe `.zone-nuit`
- [ ] `pocketbase/pb_migrations/` : ce qu'est une migration
- [ ] `pocketbase/pb_hooks/notification_message.pb.js` : l'e-mail envoyé à chaque message
