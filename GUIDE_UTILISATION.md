# 🎨 Portfolio Maman SAMBE - Guide Complet

## ✅ Votre portfolio est prêt!

Félicitations! Votre portfolio moderne, responsive et facilement modifiable est maintenant opérationnel! 🚀

### 🌍 Accéder à votre portfolio

**En développement :**
```
http://localhost:4321/
```

**Pages disponibles :**
- `/` - Accueil avec hero section et projets en vedette
- `/about` - À propos de vous
- `/skills` - Vos compétences par catégorie
- `/projects` - Tous vos projets
- `/education` - Formation et expérience
- `/passions` - Vos centres d'intérêt
- `/contact` - Page de contact

---

## 📝 Comment modifier votre portfolio

### **Option 1 : Modifier les données (RECOMMANDÉ)**

Tout votre contenu est dans un fichier JSON centralissé :

```
src/data/portfolio.json
```

**Vous pouvez facilement modifier :**
- Vos informations personnelles
- Vos compétences (ajouter/supprimer/réorganiser)
- Vos projets (ajouter de nouveaux projets)
- Votre formation
- Votre expérience
- Vos intérêts/passions

Le portfolio se mettra à jour automatiquement!

**Structure du fichier `portfolio.json` :**

```json
{
  "personal": { /* Infos personnelles */ },
  "skills": [ /* Compétences par catégorie */ ],
  "projects": [ /* Vos projets */ ],
  "education": [ /* Formation */ ],
  "experience": [ /* Expérience pro */ ],
  "interests": [ /* Passions */ ]
}
```

### **Option 2 : Modifier les pages (approche avancée)**

Les pages se trouvent dans :
```
src/pages/
├── index.astro (Accueil)
├── about.astro (À propos)
├── skills.astro (Compétences)
├── projects.astro (Projets)
├── education.astro (Formation)
├── passions.astro (Passions)
└── contact.astro (Contact)
```

### **Option 3 : Modifier les composants**

Les composants réutilisables se trouvent dans :
```
src/components/
├── Header.astro (Navigation)
├── Footer.astro (Pied de page)
└── ProjectCard.astro (Carte projet)
```

---

## 🎨 Personnalisation

### Palette de couleurs

Les couleurs sont définies dans `tailwind.config.mjs` :

```javascript
colors: {
  primary: '#E75480',      // Rose vif
  secondary: '#A855F7',    // Violet
  accent: '#06B6D4',       // Cyan
  dark: '#1F2937',         // Gris foncé
  light: '#F9FAFB',        // Blanc cassé
  border: '#FCE7F3',       // Rose pâle
}
```

Pour changer les couleurs :
1. Ouvrez `tailwind.config.mjs`
2. Modifiez les codes HEX

### Font personnalisée

Actuellement utilise "Inter". Pour changer :
1. Modifiez `tailwind.config.mjs`
2. Changez l'import Google Fonts dans `src/layouts/Layout.astro`

---

## 📊 Ajouter des projets

**Dans `src/data/portfolio.json`, section `projects` :**

```json
{
  "id": "mon-projet",
  "title": "Mon Projet",
  "description": "Description courte",
  "longDescription": "Description longue",
  "image": "/images/projects/mon-projet.jpg",
  "tags": ["HTML", "CSS", "JavaScript"],
  "technologies": ["HTML5", "CSS3"],
  "link": "https://exemple.com",
  "github": "https://github.com/example",
  "date": "2024",
  "category": "Web"
}
```

Puis c'est automatique! La page projets se mettra à jour.

---

## 🚀 Commandes disponibles

```bash
# Démarrer le serveur de développement
npm run dev

# Compiler pour la production
npm run build

# Prévisualiser la build
npm run preview

# Vérifier les types TypeScript
npm run check
```

---

## 📁 Structure du projet

```
portfolio/
├── src/
│   ├── data/
│   │   └── portfolio.json (VOS DONNÉES!)
│   ├── pages/
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── skills.astro
│   │   ├── projects.astro
│   │   ├── education.astro
│   │   ├── passions.astro
│   │   └── contact.astro
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   └── ProjectCard.astro
│   ├── layouts/
│   │   └── Layout.astro
│   └── styles/
│       └── global.css
├── public/
│   └── images/ (Ajouter vos images ici)
├── tailwind.config.mjs (Couleurs & theming)
├── postcss.config.mjs
├── astro.config.mjs
└── package.json
```

---

## 🖼️ Ajouter des images

1. Créez des dossiers dans `public/images/` :
   - `public/images/profile.jpg` - Votre photo de profil
   - `public/images/projects/` - Images des projets
   - `public/images/skills/` - Icons des skills

2. Dans `portfolio.json`, référencez-les :
   ```json
   "image": "/images/projects/mon-projet.jpg"
   ```

---

## 📱 Responsive Design

Le portfolio est entièrement responsive:
- **Mobile** : < 640px
- **Tablet** : 640px - 1024px
- **Desktop** : > 1024px

Les breakpoints Tailwind utilisés:
- `sm:` (640px)
- `md:` (768px)
- `lg:` (1024px)

---

## 🌐 Déploiement

### Déployer sur Netlify (Recommandé)

1. Poussez votre code sur GitHub
2. Connectez Netlify à votre repo GitHub
3. Netlify déploiera automatiquement à chaque push

**Configuration Netlify:**
- Build command: `npm run build`
- Publish directory: `dist`

### Déployer sur Vercel

1. Connectez votre GitHub à Vercel
2. Vercel détectera Astro automatiquement
3. C'est prêt!

### Déployer manuellement

```bash
npm run build
# Poussez le dossier `dist/` sur votre hébergement
```

---

## 🎯 Prochaines étapes

### À faire :
- [ ] Ajouter vos images de profil et projets dans `public/images/`
- [ ] Mettre à jour `portfolio.json` avec vos vrais données
- [ ] Tester sur mobile/tablet/desktop
- [ ] Demander du feedback à quelqu'un
- [ ] Déployer en production

### Optionnel :
- [ ] Changer la palette de couleurs
- [ ] Ajouter un blog avec Astro Content Collections
- [ ] Intégrer un formulaire de contact (Formspree, EmailJS, etc)
- [ ] Ajouter de l'analytics (Google Analytics, Plausible)
- [ ] Ajouter un sitemap et robots.txt

---

## 🔧 Dépannage

### Le portfolio ne s'affiche pas?
- Vérifiez que le serveur dev est lancé : `npm run dev`
- Allez à `http://localhost:4321/`

### Les changements ne s'appliquent pas?
- Les fichiers `.astro` se rechargent automatiquement
- Pour `portfolio.json`, rafraîchissez la page (Ctrl+R ou Cmd+R)

### Comment ajouter une nouvelle page?
- Créez un fichier `.astro` dans `src/pages/`
- Importez `Layout` et utilisez-le
- La route sera automatiquement créée!

---

## 📞 Support

Pour des questions sur :
- **Astro** : https://docs.astro.build/
- **TailwindCSS** : https://tailwindcss.com/docs
- **Deployment** : https://docs.astro.build/en/guides/deploy/

---

## 🎉 Vous êtes prêt!

Votre portfolio est:
✅ **Responsive** - Fonctionne sur tous les appareils  
✅ **Moderne** - Technologies actuelles (Astro, TailwindCSS)  
✅ **Modifiable** - Facile de mettre à jour vos données  
✅ **Déployable** - Prêt pour Netlify, Vercel, etc.  
✅ **Performant** - Chargement ultra-rapide  

Bonne chance dans votre parcours! 🚀
