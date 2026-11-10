/**
 * Version anglaise du site : les outils communs.
 *
 * Principe :
 *  - le français est la langue par défaut, sans préfixe : /projets
 *  - l'anglais a le préfixe /en : /en/projets
 *  - chaque page est écrite UNE seule fois (dossier src/pages/[...lang]/) ;
 *    Astro la génère deux fois, une par langue.
 *  - dans le code, on écrit les deux langues côte à côte avec tr() :
 *        tr(lang, 'Mes projets', 'My projects')
 *    C'est plus simple à relire qu'un grand dictionnaire séparé.
 *  - pour PocketBase, chaque texte a un champ anglais terminé par "_en"
 *    (titre_en, resume_en…). champ() prend l'anglais s'il existe,
 *    sinon le français : une traduction manquante ne casse jamais la page.
 */
export type Lang = 'fr' | 'en';

/** Langue de la page en cours (Astro la déduit de l'URL : /en/… = anglais). */
export function langue(astro: { currentLocale?: string }): Lang {
  return astro.currentLocale === 'en' ? 'en' : 'fr';
}

/** Choisit le texte selon la langue. */
export function tr<T>(lang: Lang, fr: T, en: T): T {
  return lang === 'en' ? en : fr;
}

/** Ajoute le préfixe /en aux liens internes en anglais. Ex. lien('en', '/projets') → '/en/projets' */
export function lien(lang: Lang, chemin: string): string {
  if (lang === 'fr' || /^(https?:|mailto:|tel:|#)/.test(chemin)) return chemin;
  return chemin === '/' ? '/en/' : `/en${chemin}`;
}

/** Même page dans l'autre langue (pour le bouton FR | EN et les balises hreflang). */
export function autreLangue(chemin: string): { lang: Lang; href: string } {
  if (chemin === '/en' || chemin.startsWith('/en/')) {
    return { lang: 'fr', href: chemin.replace(/^\/en/, '') || '/' };
  }
  return { lang: 'en', href: chemin === '/' ? '/en/' : `/en${chemin}` };
}

/** Texte venant de PocketBase : la version "_en" en anglais si elle est remplie, sinon le français. */
export function champ<T extends object>(record: T, nom: string, lang: Lang): any {
  const r = record as Record<string, any>;
  if (lang === 'en') {
    const en = r[`${nom}_en`];
    const vide = en == null || en === '' || (Array.isArray(en) && en.length === 0);
    if (!vide) return en;
  }
  return r[nom];
}

/** À exporter tel quel par chaque page : génère la version française et la version anglaise. */
export function cheminsLangues() {
  return [{ params: { lang: undefined } }, { params: { lang: 'en' } }];
}
