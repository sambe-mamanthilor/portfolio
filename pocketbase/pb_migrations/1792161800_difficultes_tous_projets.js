/// <reference path="../pb_data/types.d.ts" />

/**
 * Migration : difficultés (« bug → fix ») pour les projets qui n'en avaient pas.
 * Rédigées à partir des contraintes et outils de chaque projet ; à relire et
 * ajuster dans le back-office si un point ne correspond pas à ton vécu.
 * Années chaudes : un point ajouté à celui qui existait déjà.
 * Ne remplace jamais un tableau déjà rempli (sauf Années chaudes, complété).
 */
const DIFFICULTES = {
  "cielixir": [
    { probleme: "La recommandation ne marchait pas quand la position était refusée", cause: "Certains navigateurs ou visiteurs bloquent la géolocalisation", solution: "Recherche de ville ajoutée en secours de la géolocalisation" },
    { probleme: "Les favoris et l'historique devaient rester privés", cause: "Sans règles, chaque compte pouvait lire les données des autres", solution: "Règles d'accès PocketBase : chacun ne voit que ses propres enregistrements" },
    { probleme: "Tenir un livrable à chaque période en binôme", cause: "Beaucoup de tâches en parallèle et des échéances rapprochées", solution: "Découpage en sprints et suivi des tâches sur Jira" },
  ],
  "festival-musique": [
    { probleme: "Le menu ne tenait pas sur petit écran", cause: "Trop de liens pour une seule ligne sur mobile", solution: "Menu burger en JavaScript, ouvert et fermé au clic" },
    { probleme: "Le carrousel se cassait d'une taille d'écran à l'autre", cause: "Largeurs d'images fixées en pixels", solution: "Largeurs en pourcentage et images adaptatives" },
  ],
  "empreintes-invisibles": [
    { probleme: "Atteindre la note EcoIndex A", cause: "Images trop lourdes pour une page légère", solution: "Images compressées et redimensionnées, aucun framework superflu" },
    { probleme: "Proposer tout le site en français et en anglais", cause: "Chaque page existait en une seule langue", solution: "Pages séparées /fr/ et /en/, avec un bouton pour changer de langue" },
  ],
  "olyvia": [
    { probleme: "Rendre le site bilingue sous WordPress", cause: "Le thème ne gère qu'une langue par défaut", solution: "Extension Polylang : pages et menus traduits, sélecteur de langue" },
    { probleme: "Le site était lent à charger", cause: "Images lourdes et pages générées à chaque visite", solution: "Images optimisées avec Smush et mise en cache avec WP Super Cache" },
    { probleme: "Protéger les personnes interrogées", cause: "Les entretiens contenaient des informations personnelles", solution: "Réponses anonymisées avant l'analyse et la publication" },
  ],
  "la-cimade": [
    { probleme: "Choisir une direction parmi plusieurs idées", cause: "Deux axes forts : l'union et la revendication", solution: "Benchmark, anti-axe et croquis pour comparer, puis choix de l'union" },
    { probleme: "Les mains du logo devenaient illisibles en petit", cause: "Trop de détails pour un avatar ou une icône", solution: "Formes simplifiées et tests de lisibilité à plusieurs tailles" },
  ],
  "elm-design": [
    { probleme: "Présenter le projet en anglais", cause: "Vocabulaire du design et du marketing peu pratiqué à l'oral", solution: "Lexique préparé et répétitions de la soutenance en équipe" },
    { probleme: "Garder une identité cohérente sur tous les supports", cause: "Beaucoup de formats : réseaux sociaux, carte de visite, flyer, affiche", solution: "Charte graphique avec règles de couleurs, typographies et marges" },
  ],
  "visages-de-montbeliard": [
    { probleme: "Les bâtiments étaient trop détaillés à dessiner", cause: "Façades riches en ornements et en fenêtres", solution: "Simplification en formes géométriques vectorielles" },
    { probleme: "Faire des 3 affiches une vraie série", cause: "Chaque bâtiment a ses propres couleurs et proportions", solution: "Palette, typographie et mise en page communes aux trois affiches" },
  ],
  "micro-trottoir": [
    { probleme: "Le son était couvert par le bruit du marché", cause: "Tournage en extérieur, au milieu de la foule", solution: "Micro Rode Reporter tenu près de la personne interrogée" },
    { probleme: "Le doublage anglais ne collait pas aux images", cause: "Une phrase traduite n'a pas la même durée qu'en français", solution: "Traduction raccourcie pour respecter le rythme de chaque réponse" },
    { probleme: "Filmer des passants en respectant leurs droits", cause: "Le droit à l'image impose leur accord", solution: "Autorisations demandées avant chaque prise" },
  ],
};

const AJOUT_ANNEES_CHAUDES = {
  probleme: "Rendre les graphiques compréhensibles sans la vue",
  cause: "Un graphique SVG seul n'est pas lu par les lecteurs d'écran",
  solution: "Balises figure, descriptions aria-label et infobulles accessibles au clavier",
};

migrate((app) => {
  for (const slug in DIFFICULTES) {
    try {
      const p = app.findFirstRecordByData("projets", "slug", slug);
      // getString() renvoie le JSON du champ sous forme de texte ("" ou "null" s'il est vide)
      const actuel = p.getString("difficultes");
      if (actuel && actuel !== "null" && actuel !== "[]") continue;
      p.set("difficultes", DIFFICULTES[slug]);
      app.save(p);
    } catch (e) {}
  }
  try {
    const p = app.findFirstRecordByData("projets", "slug", "annees-chaudes");
    const texte = p.getString("difficultes");
    const liste = texte && texte !== "null" ? JSON.parse(texte) : [];
    if (!liste.some((d) => d.probleme === AJOUT_ANNEES_CHAUDES.probleme)) {
      liste.push(AJOUT_ANNEES_CHAUDES);
      p.set("difficultes", liste);
      app.save(p);
    }
  } catch (e) {}
}, (app) => {
  for (const slug in DIFFICULTES) {
    try {
      const p = app.findFirstRecordByData("projets", "slug", slug);
      p.set("difficultes", null);
      app.save(p);
    } catch (e) {}
  }
});
