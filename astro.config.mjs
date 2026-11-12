// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // URL publique du site : sert aux balises canonical, Open Graph et au sitemap.
  site: 'https://portfolio.maman-sambe.fr',

  // Internationalisation préparée dès maintenant (version anglaise plus tard).
  // Le français est la langue par défaut et n'a pas de préfixe : /projets
  // L'anglais aura le préfixe /en : /en/projets
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  // Tailwind 4 s'intègre directement à Vite (l'outil qui compile Astro).
  // Plus besoin de PostCSS ni de tailwind.config.mjs.
  vite: {
    plugins: [tailwindcss()],

    // Configuration PostCSS vide, écrite ici volontairement.
    // Sans elle, Vite cherche un fichier postcss.config dans les dossiers
    // PARENTS du projet, et en trouve un ancien (Tailwind 3) dans
    // C:\Users\maman\portfolio. Une config "inline" stoppe cette recherche.
    css: {
      postcss: {
        plugins: [],
      },
    },
  },
});
