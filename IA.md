# Déclaration d'usage de l'intelligence artificielle

Conformément au cahier des charges du projet individuel S3, ce fichier déclare chaque outil d'IA utilisé : à quelle étape, pour quoi faire, et ce que j'ai modifié, corrigé ou rejeté dans ce qu'il a produit.

## Outils utilisés

| Outil | Étape | Usage |
|---|---|---|
| Claude (Anthropic) | Refonte technique (oct. 2026 →) | Accompagnement façon « développeuse senior » : analyse de la maquette, architecture, écriture du code avec explication de chaque fichier, relecture qualité |
| Figma AI | Maquette | À compléter |

## Journal détaillé

### 16/10/2026 — Cadrage et migration Tailwind 4 / daisyUI

- **Demande** : analyser la maquette Figma, l'ancien code et le sujet ; migrer le projet de Tailwind 3 vers Tailwind 4 + daisyUI 5.
- **Produit par l'IA** : `astro.config.mjs`, `src/styles/global.css` (thème daisyUI « mts »), `src/layouts/Layout.astro`.
- **Ce que j'ai décidé / modifié** : choix de la stack (Astro, Tailwind, daisyUI, PocketBase) ; *à compléter avec mes propres modifications*.
- **Ce que l'IA a relevé et que j'ai accepté** : contraste insuffisant du texte blanc sur le cyan `#0ea3cd` (2,94:1) → texte bleu nuit ; polices auto-hébergées au lieu de Google Fonts.
- **Ce que je sais expliquer** : *à compléter après les questions de compréhension*.
