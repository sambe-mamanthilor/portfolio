# Journal de bord — Portfolio S3

Une dizaine de lignes par semaine : ce que j'ai fait, ce qui a coincé, ce que j'ai décidé.

## Semaine du 12 au 18 octobre 2026

**Fait**
- Analyse de la maquette finale et de l'ancien code (Astro + Tailwind 3, contenus en dur, pas de base de données).
- Création de la branche `refonte` pour garder le site actuel en ligne pendant la reconstruction.
- Migration vers Tailwind CSS 4 et daisyUI 5 ; thème « mts » construit à partir des couleurs Figma.
- Polices auto-hébergées (Inter, Playfair Display) au lieu de Google Fonts.

**Ce qui a coincé**
- Le texte blanc sur le cyan du bouton footer ne respecte pas le contraste WCAG (2,94:1).
- Images très lourdes dans `public/` (jusqu'à 7 Mo).

**Décisions**
- Tous les projets seront gérés dans PocketBase (back-office), avec une étude de cas par projet.
- Déploiement du site et de PocketBase sur mon VPS.
- Écarts avec la maquette notés ici plutôt que refaits dans Figma.
