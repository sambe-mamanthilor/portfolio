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
  accroche: 'Développeuse web & UX/UI · étudiante en BUT MMI',
  recherche: 'En recherche d’alternance dès janvier 2027 ou de stage dès fin mars 2027',
  email: 'mamansambe47@gmail.com',
  telephone: '06 78 64 38 05',
  telephoneLien: '+33678643805',
  ville: 'Montbéliard, France',
  linkedin: 'https://www.linkedin.com/in/maman-thilor-sambe-996592389/',
  github: 'https://github.com/sambe-mamanthilor',
  cv: '/documents/cv_Maman-Thilor_Sambe_but_mmi.pdf',
} as const;

/** Liens de la navigation principale (header). */
export const NAVIGATION = [
  { href: '/', label: 'Accueil' },
  { href: '/a-propos', label: 'À propos' },
  { href: '/projets', label: 'Projets' },
  { href: '/contact', label: 'Contact' },
] as const;
