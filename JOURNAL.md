# Journal de bord — Portfolio S3

Ce que j'ai fait chaque semaine, ce qui a bloqué et ce que j'ai décidé.

Petite précision : les commits de mars à septembre, c'est mon ancien portfolio (Astro + Tailwind 3, tout écrit en dur dans le code). La vraie refonte du S3 commence mi-octobre, après la soutenance maquette.

## Semaine du 12 au 18 octobre

J'ai commencé par reprendre ma maquette finale et regarder mon ancien code pour voir ce que je pouvais garder. Pas grand-chose au final : les contenus étaient tous en dur et il n'y avait pas de base de données.

J'ai créé une branche `refonte` pour ne pas casser le site qui était déjà en ligne pendant que je travaillais.

Je suis passée à Tailwind 4 avec daisyUI 5, et j'ai créé mon thème « mts » avec les couleurs de ma maquette Figma. J'ai aussi mis les polices (Inter et Playfair Display) directement dans le site au lieu de passer par Google Fonts.

Ce qui a coincé : le texte blanc sur le cyan de mon bouton du footer n'était pas assez contrasté (2,94:1, il faut au moins 4,5). Et certaines images faisaient jusqu'à 7 Mo, beaucoup trop.

J'ai décidé de mettre tous mes projets dans PocketBase, avec une vraie étude de cas pour chacun, et d'héberger la base sur mon VPS.

## Semaine du 19 au 25 octobre

J'ai installé PocketBase et créé la structure de ma base : les catégories, les outils, les projets et les étapes de chaque projet. J'ai rempli les catégories et les outils, puis j'ai ajouté mes projets et une collection pour mes expériences (stage, jobs, association).

J'ai choisi de toujours modifier la base avec des migrations, pas à la main dans l'interface. Comme ça, ma base en local et celle du VPS restent pareilles.

J'ai ajouté les « étapes » parce que le sujet demande de montrer le processus de chaque projet, pas seulement le résultat.

## Semaine du 26 octobre au 1er novembre

J'ai relié Astro à PocketBase. Maintenant, quand je lance le build, le site va chercher mes projets dans la base et crée une page pour chacun tout seul.

Ce qui a coincé : si PocketBase ne répond pas, le build plante. J'ai dû mettre l'adresse de la base dans une variable d'environnement (`POCKETBASE_URL`).

J'ai gardé un site statique : les pages sont créées une fois au build. C'est plus rapide pour le visiteur, et même si ma base tombe, le site reste en ligne.

## Semaine du 2 au 8 novembre

Grosse semaine : j'ai refait toutes les pages d'après ma maquette (accueil, à propos, projets, page projet, contact). J'ai découpé le site en composants pour réutiliser le header, le footer, les cartes projets et le carrousel de compétences.

Le problème, c'est que j'ai beaucoup de projets, et le sujet dit bien « trois projets présentés en profondeur, pas six survolés ». J'ai donc mis trois projets phares sur l'accueil (TiK•TaK, Les années chaudes et Cielixir), et les autres restent dans la page Projets.

## Semaine du 9 au 15 novembre

J'ai ajouté la version anglaise de tout le site (`/en`). Pour le sélecteur de langue, j'ai hésité entre plusieurs versions et j'ai choisi un globe avec FR | EN.

J'ai écrit mes études de cas (contexte, mon rôle, le processus, les choix techniques, les difficultés) et ajouté SQLite et l'IA dans mes compétences. En relisant, j'ai corrigé plusieurs erreurs : certains projets étaient présentés comme des SAÉ alors que c'étaient des projets de semestre, mon rôle à l'AESBM n'était pas le bon, et j'ai ajouté le nom de ma binôme, Ruslana Budniak, sur nos projets communs.

Ensuite, mise en ligne : le site sur Netlify et PocketBase sur le VPS de l'IUT en HTTPS (`api.maman-sambe.fr`). Ça n'a pas marché du premier coup. Mon push est parti sur la branche `refonte` au lieu de `main`, les images n'étaient pas sur le VPS (je les ai copiées avec `scp`), et un déploiement Netlify a échoué parce que PocketBase était tombé à ce moment-là.

## Semaine du 16 au 18 novembre

J'ai remis le dégradé de ma maquette dans les zones sombres. Le premier rendu faisait flou, donc j'ai choisi une version plus douce.

J'ai fait en sorte que PocketBase redémarre tout seul sur le VPS (service `systemd`). Maintenant, je reçois aussi un mail à chaque message envoyé avec le formulaire de contact.

J'ai remplacé le favicon d'Astro par mon logo MTS.

Je me suis rendu compte que mon code ne suivait pas vraiment la grille qu'on a apprise l'an dernier. Je l'ai remis sur 12 colonnes avec 32 px d'écart, et j'ai mis la maquette Figma à jour pour qu'elle corresponde : pages ordinateur, plus les pages mobiles sur 4 colonnes, que je n'avais pas faites.

Pour finir, j'ai fait le contrôle qualité (`QUALITE.md`). J'ai découvert que mes mentions légales étaient fausses : j'avais mis Infomaniak comme hébergeur, alors que le site est sur Netlify et la base sur le VPS (Infomaniak, c'est seulement le nom de domaine). J'ai aussi corrigé un contraste trop faible sur la page projet, et ajouté le `sitemap.xml` et le `robots.txt` qui manquaient.

## Mes réseaux

J'ai choisi LinkedIn parce que c'est là que les recruteurs que je vise (alternance et stage, en France et en Suisse) vont me chercher en premier.

J'ai pris GitHub en deuxième parce que je veux travailler dans le développement web : un recruteur technique peut y voir mon code, et le dépôt de mon portfolio est public.

Les deux renvoient vers mon portfolio, et mon portfolio renvoie vers les deux. Comme ça, j'ai le même message partout.

Sur LinkedIn, j'ai ajouté mes projets, mon nouveau poste de chargée de communication à l'AESBM, mes expériences et mes nouvelles compétences. J'ai aussi publié un post pour annoncer la mise en ligne de mon nouveau portfolio.
