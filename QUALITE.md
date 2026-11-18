# Checklist qualité — Portfolio S3

Ce fichier répond au point 6 du sujet. Pour chacun des quatre domaines (accessibilité, sobriété et performance, référencement, conformité juridique), j'ai retenu les critères qui comptent **pour mon site**. Pour chaque critère, j'indique ce que j'ai vérifié, comment, et ce que j'ai corrigé.

## Ce qui compte dans mon cas

Mon site a quatre particularités qui déterminent les contrôles :

- **Il est généré à l'avance.** Astro construit toutes les pages au moment du build, à partir de PocketBase. Le visiteur reçoit du HTML déjà prêt, sans appel à la base de données. Le temps de chargement dépend donc surtout du poids des images et du CSS.
- **Il contient beaucoup d'images de projets**, stockées dans PocketBase. C'est le principal poste de poids.
- **Il a un formulaire de contact** qui enregistre des données personnelles sur mon serveur. Il est donc soumis au RGPD.
- **Il existe en deux langues** (FR / EN). Le référencement doit indiquer aux moteurs de recherche quelle page correspond à quelle langue.

## Outils et méthode

| Outil | Pour quoi |
|---|---|
| Lighthouse (Chrome), profil mobile | Scores des quatre domaines, mesures de vitesse (LCP, CLS), poids des pages |
| axe-core (utilisé par Lighthouse) | Tests automatiques d'accessibilité : contrastes, noms des liens et boutons, formulaires |
| Script Playwright | Débordement horizontal à 320, 768 et 1280 px ; un seul `h1` par page ; attribut `alt` sur toutes les images |
| Clavier seul (Tab, Entrée, Échap) | Ordre de navigation, focus visible, lien d'évitement |
| Lecture du code et du HTML généré | Balises SEO, `lang`, `hreflang`, mentions légales |

Pages testées : Accueil, À propos, Projets, un projet (TiK•TaK), Contact, Mentions légales, Accueil en anglais.

Les tests ont été faits le 18/11/2026 sur le build de production (`npm run build`), servi avec compression gzip comme sur Netlify. À refaire sur le site en ligne avant la soutenance (Lighthouse dans les outils de développement de Chrome) pour noter les chiffres réels.

## Résultats Lighthouse (mobile, après corrections)

| Page | Performance | Accessibilité | Bonnes pratiques | SEO | LCP | CLS |
|---|---|---|---|---|---|---|
| Accueil | 82 | 100 | 100 | 100 | 4,8 s | 0,002 |
| À propos | 100 | 100 | 100 | 100 | 0,9 s | 0 |
| Projets | 92 | 100 | 100 | 100 | 3,3 s | 0 |
| Projet TiK•TaK | 97 | 100 | 100 | 100 | 2,6 s | 0,034 |
| Contact | 99 | 100 | 100 | 100 | 2,0 s | 0 |
| Mentions légales | 100 | 100 | 100 | 100 | 0,9 s | 0,001 |
| Accueil (EN) | 86 | 100 | 100 | 100 | — | — |

---

## 1. Accessibilité

| Critère | Vérification | Résultat / correction |
|---|---|---|
| Contraste du texte (4,5:1 minimum) | Lighthouse / axe sur chaque page | ❌ → ✅ Les petits libellés « Mon rôle », « Cadre », « Équipe », « Période » de la page projet étaient à 4,07:1 (`#0b7fa3` sur `#e6f4f8`). La couleur `accent` du thème clair passe à `#0a7598` (4,65:1) : différence presque invisible, contraste conforme. |
| Contraste des boutons | Calcul du ratio pendant le développement | ❌ → ✅ Le texte blanc sur le cyan `#0ea3cd` était à 2,94:1 ; il est passé en bleu nuit. |
| Nom accessible des liens | Lighthouse (`label-content-name-mismatch`) | ❌ → ✅ Le logo affiche « MTS », mais son nom accessible était « Accueil – Maman Thilor SAMBE ». Une personne qui pilote le site à la voix dit ce qu'elle voit (« MTS ») : le nom devient « MTS – Accueil, Maman Thilor SAMBE ». |
| Langue de la page | HTML généré | ✅ `lang="fr"` / `lang="en"` selon la version. |
| Structure des titres | Script : un seul `h1` par page ; Lighthouse : ordre des titres | ✅ Un `h1` sur chaque page testée, pas de niveau sauté. |
| Images | Script : `alt` présent sur toutes les images | ✅ 0 image sans `alt`. Les images décoratives ont `alt=""`, les captures de projets ont un texte descriptif saisi dans PocketBase. |
| Navigation au clavier | Test à la main | ✅ Le premier Tab affiche « Aller au contenu ». Le menu mobile s'ouvre avec Entrée et se ferme avec Échap (`aria-expanded` passe à `true` puis `false`). |
| Formulaire | Lighthouse + lecture du HTML | ✅ Chaque champ a un `<label>` relié. Testé : un champ vide affiche le texte « Merci de compléter ce champ. » et passe en `aria-invalid="true"` (l'erreur n'est pas signalée que par la couleur). |
| Animations | Lecture du code | ✅ L'animation d'ouverture, le carrousel, les cartes projets et les aperçus d'appareils tiennent compte de `prefers-reduced-motion` (réglage « réduire les animations » du système). |
| Responsive / zoom | Script à 320, 768 et 1280 px | ✅ Aucun débordement horizontal, même à 320 px. |

## 2. Sobriété et performance

| Critère | Vérification | Résultat / correction |
|---|---|---|
| Pages générées à l'avance | Architecture | ✅ Pas de base de données interrogée à chaque visite : moins de calcul serveur et un affichage rapide. |
| Polices | Onglet Réseau | ✅ Inter et Playfair Display sont auto-hébergées en `woff2` (pas de Google Fonts : pas d'appel externe, pas de transfert de données). |
| Images | Lighthouse (« image delivery ») + script | ✅ Lazy loading sur les images sous la ligne de flottaison, `width` / `height` renseignés pour éviter les décalages (CLS ≤ 0,034). Les miniatures sont demandées en 400×225 ou 800×450 à PocketBase. ⚠️ Exception : les 4 captures de l'aperçu « trois appareils » (page projet) n'ont pas de `width` / `height` ; elles sont dans un cadre de taille fixe, donc sans décalage mesuré. |
| Poids des pages | Lighthouse (« total byte weight ») | ⚠️ De 140 Ko (Mentions) à environ 1,4 Mo (Accueil) et 3 Mo (Projets). Le poids vient des captures de projets. Les miniatures n'ont pas été générées sur mon PocketBase de test (il renvoyait les originaux) : à vérifier sur le site en ligne. Si le poids reste élevé, je compresserai les captures avant de les remettre dans le back-office. |
| CSS | Taille du fichier | ✅ 270 Ko brut, mais 35 Ko une fois compressé par Netlify. |
| Scripts | Lighthouse (TBT) | ✅ 0 ms de blocage : très peu de JavaScript (menu, carrousel, formulaire). |
| Traceurs | Lecture du code + liste des cookies | ✅ Aucun outil de mesure d'audience, aucun cookie. |
| Point faible restant | Lighthouse Accueil | ⚠️ LCP mobile de 4,8 s sur l'accueil (simulation 4G lente). Cause probable : l'animation d'ouverture et les images de la page d'accueil (à confirmer sur le site en ligne). Les autres pages sont entre 0,9 et 3,3 s. |

## 3. Référencement

| Critère | Vérification | Résultat / correction |
|---|---|---|
| Titre unique par page | HTML généré | ✅ Exemple : « TiK•TaK — configurateur de montres \| Maman Thilor SAMBE ». |
| Meta description | HTML généré | ✅ Une description par page, en français et en anglais. |
| URL canonique | HTML généré | ✅ `<link rel="canonical">` sur chaque page. |
| Deux langues | HTML généré | ✅ Liens `hreflang` fr / en / x-default : Google sait quelle version montrer. |
| Partage sur les réseaux | HTML généré | ✅ Balises Open Graph (titre, description, image) pour un bel aperçu sur LinkedIn. |
| Plan du site | Test de `/sitemap.xml` | ❌ → ✅ Il n'existait pas. Ajout de `src/pages/sitemap.xml.ts`, généré au build avec toutes les pages FR et EN (30 adresses), y compris chaque projet de PocketBase. Vérifié : chaque adresse correspond à une page existante. |
| robots.txt | Test de `/robots.txt` | ❌ → ✅ Il n'existait pas. Ajout de `public/robots.txt`, qui autorise l'exploration et indique le sitemap. |
| HTML sémantique | Lecture du code | ✅ `header`, `nav`, `main`, `section` avec titre, `footer`, et listes pour les projets. |

## 4. Conformité juridique

| Critère | Vérification | Résultat / correction |
|---|---|---|
| Mentions légales (LCEN) | Lecture de la page | ✅ Éditrice, contact et directrice de la publication sont indiqués. |
| Hébergeur | Comparaison avec mon vrai déploiement | ❌ → ✅ La page indiquait Infomaniak pour tout. En réalité, le site est hébergé par **Netlify, Inc.** (adresse ajoutée), la base de données sur le **VPS de l'IUT Nord Franche-Comté**, et seul le **nom de domaine** est chez Infomaniak. Les trois sont maintenant indiqués. |
| Formulaire (RGPD) | Lecture du formulaire et des mentions | ✅ Consentement obligatoire avant l'envoi, avec un lien vers les mentions légales. Je ne collecte que le nécessaire (téléphone facultatif). Les mentions indiquent le but, la durée de conservation (12 mois) et la façon d'exercer ses droits. |
| Anti-spam sans traceur | Lecture du code | ✅ Un champ caché (« pot de miel ») plutôt qu'un reCAPTCHA Google, qui déposerait des cookies. |
| Cookies | Navigation automatisée (Playwright) puis liste des cookies | ✅ 0 cookie déposé : pas de bandeau nécessaire. |
| Droits sur les contenus | Relecture des projets | ✅ Les projets en équipe citent ma binôme (Ruslana Budniak), et les marques et logos sont mentionnés comme appartenant à leurs propriétaires. Les visuels sont mes réalisations ou des captures de mes projets. |

---

## À refaire le jour de la soutenance

- [ ] Lighthouse sur le site en ligne (Accueil + Projets) : noter les vrais chiffres dans le tableau.
- [ ] Vérifier que les miniatures PocketBase sont bien plus légères que les originaux (onglet Réseau, page Projets).
- [ ] Ouvrir `https://portfolio.maman-sambe.fr/sitemap.xml` et `/robots.txt`.
