# Guide d'utilisation de mon portfolio

Ce guide me sert d'aide-mémoire : comment je lance mon site, où se trouve chaque chose, et comment je le mets à jour.

## Ce que j'utilise

- **Astro 6** : génère toutes les pages au moment du build (site statique).
- **Tailwind CSS 4 et daisyUI 5** : mise en page et composants, avec mon thème « mts » (clair) et « mts-nuit » (sombre).
- **PocketBase** : ma base de données et mon back-office (projets, expériences, messages du formulaire).
- **Netlify** : héberge le site et le reconstruit à chaque push sur GitHub.
- **Le VPS de l'IUT** : fait tourner PocketBase à l'adresse `https://api.maman-sambe.fr`.

## Lancer le site sur mon ordinateur

1. Dans le fichier `.env`, je mets l'adresse de ma base :
   ```
   POCKETBASE_URL=https://api.maman-sambe.fr
   ```
2. Je lance :
   ```bash
   npm install      # la première fois seulement
   npm run dev      # site sur http://localhost:4321
   ```

Autres commandes :

```bash
npm run build    # construit le site dans dist/
npm run preview  # affiche la version construite
```

## Les pages

| Adresse | Page |
|---|---|
| `/` | Accueil (couverture, projets phares, compétences, à propos, contact) |
| `/a-propos/` | Parcours, expériences et passions |
| `/projets/` | Tous mes projets, avec recherche et filtres |
| `/projets/[slug]/` | Étude de cas d'un projet (une page créée par projet) |
| `/contact/` | Formulaire de contact par étapes |
| `/mentions-legales/` | Mentions légales |
| `/en/...` | Les mêmes pages en anglais |

## Où se trouve chaque chose

```
src/
├── pages/        les adresses du site (fichiers courts qui appellent une vue)
├── vues/         le contenu des pages, partagé entre le français et l'anglais
├── components/   les morceaux réutilisables (en-tête, pied de page, cartes, carrousel…)
├── layouts/      le gabarit commun (balises <head>, SEO, favicon)
├── lib/          la connexion à PocketBase, les boutons, les formats de date
├── i18n/         la fonction tr() qui choisit le texte selon la langue
├── data/         les infos fixes du site et la liste des logiciels
└── styles/       global.css : mon thème, mes couleurs, la grille

pocketbase/
├── pb_migrations/  la structure de ma base, écrite en code
└── pb_hooks/       l'envoi d'un e-mail à chaque message reçu
```

## Ajouter ou modifier un projet

1. Je me connecte au back-office : `https://api.maman-sambe.fr/_/`
2. J'ajoute ou je modifie le projet dans la collection `projets`.
3. Je relance la construction du site : soit je fais un push, soit dans Netlify je vais dans **Deploys**, puis **Trigger deploy**.

La nouvelle page est créée toute seule grâce à `getStaticPaths` dans `src/pages/projets/[slug].astro`.

Pour changer la structure de la base (ajouter un champ, par exemple), j'écris une migration dans `pocketbase/pb_migrations/` au lieu de le faire à la main. Comme ça, ma base locale et celle du VPS restent identiques.

## Changer les couleurs ou les polices

Tout est dans `src/styles/global.css` : les couleurs des thèmes « mts » et « mts-nuit », et les polices Inter et Playfair Display, installées dans le projet (pas de Google Fonts).

## Les messages du formulaire de contact

- Chaque message est enregistré dans la collection `messages` de PocketBase.
- Je reçois un e-mail à chaque nouveau message, grâce au fichier `pocketbase/pb_hooks/notification_message.pb.js`.

## Mettre en ligne

Je fais un push sur la branche `main` :

```bash
git add .
git commit -m "Ce que j'ai changé"
git push
```

Netlify reconstruit et publie le site tout seul en une à deux minutes.

## Si quelque chose ne marche pas

- **`npm run dev` plante :** je vérifie que `POCKETBASE_URL` est bien rempli dans `.env` et que `https://api.maman-sambe.fr` répond.
- **Les images d'un projet ne s'affichent pas :** je vérifie qu'elles sont bien dans PocketBase sur le VPS.
- **Un déploiement Netlify échoue :** je regarde le journal dans Netlify. Si PocketBase était coupé à ce moment-là, je relance le déploiement.

## Documentation

- Astro : https://docs.astro.build/
- Tailwind CSS : https://tailwindcss.com/docs
- daisyUI : https://daisyui.com/
- PocketBase : https://pocketbase.io/docs/
