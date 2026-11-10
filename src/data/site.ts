/**
 * Informations générales du site, utilisées sur plusieurs pages
 * (header, footer, contact, SEO). Les modifier ici les met à jour partout.
 *
 * Pourquoi pas dans PocketBase ? Ces infos changent très rarement et
 * structurent le site : les garder dans le code évite une requête de plus
 * et garantit qu'elles sont toujours présentes, même sans base.
 */
export const SITE = {
  nom: 'Maman Thilor SAMBE',
  prenom: 'Maman Thilor',
  nomFamille: 'SAMBE',
  initiales: 'MTS',
  // Textes en deux langues : SITE.accroche.fr / SITE.accroche.en
  accroche: {
    fr: 'Développeuse web & UX/UI · étudiante en BUT MMI',
    en: 'Web developer & UX/UI designer · BUT MMI student',
  },
  recherche: {
    fr: 'En recherche d’alternance dès janvier 2027 ou de stage dès fin mars 2027',
    en: 'Looking for a work-study position from January 2027 or an internship from late March 2027',
  },
  email: 'mamansambe47@gmail.com',
  telephone: '06 78 64 38 05',
  telephoneLien: '+33678643805',
  ville: 'Montbéliard, France',
  linkedin: 'https://www.linkedin.com/in/maman-thilor-sambe-996592389/',
  github: 'https://github.com/sambe-mamanthilor',
  cv: '/documents/cv_Maman-Thilor_Sambe_but_mmi.pdf',
} as const;

/** Liens de la navigation principale (header). Le préfixe /en est ajouté en anglais. */
export const NAVIGATION = [
  { href: '/', label: { fr: 'Accueil', en: 'Home' } },
  { href: '/a-propos', label: { fr: 'À propos', en: 'About' } },
  { href: '/projets', label: { fr: 'Projets', en: 'Projects' } },
  { href: '/contact', label: { fr: 'Contact', en: 'Contact' } },
] as const;
