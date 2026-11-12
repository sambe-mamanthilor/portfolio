/**
 * Petites fonctions de mise en forme réutilisées dans les pages.
 * Chacune reçoit la langue ("fr" par défaut, ou "en").
 */
import type { Lang } from '../i18n';

const LOCALES = { fr: 'fr-FR', en: 'en-GB' } as const;
const moisAnnee = (lang: Lang) => new Intl.DateTimeFormat(LOCALES[lang], { month: 'long', year: 'numeric', timeZone: 'UTC' });
const mois = (lang: Lang) => new Intl.DateTimeFormat(LOCALES[lang], { month: 'long', timeZone: 'UTC' });

/** Transforme une date PocketBase ("2026-03-01 00:00:00.000Z") en objet Date. */
function versDate(valeur: string | undefined): Date | null {
  if (!valeur) return null;
  const date = new Date(valeur.replace(' ', 'T'));
  return Number.isNaN(date.getTime()) ? null : date;
}

/**
 * Période lisible à partir de deux dates :
 *  - "mars – juin 2026" / "March – June 2026" (même année)
 *  - "septembre 2025 – janvier 2026" (années différentes)
 *  - "octobre 2026" (même mois ou pas de date de fin)
 */
export function formatPeriode(debut?: string, fin?: string, lang: Lang = 'fr'): string {
  const d = versDate(debut);
  const f = versDate(fin);
  if (!d) return '';
  if (!f) return moisAnnee(lang).format(d);

  const memeAnnee = d.getUTCFullYear() === f.getUTCFullYear();
  const memeMois = memeAnnee && d.getUTCMonth() === f.getUTCMonth();

  if (memeMois) return moisAnnee(lang).format(d);
  if (memeAnnee) return `${mois(lang).format(d)} – ${moisAnnee(lang).format(f)}`;
  return `${moisAnnee(lang).format(d)} – ${moisAnnee(lang).format(f)}`;
}

/** "Individuel", "Binôme" ou "Équipe de 3".
 *  On n'écrit pas « Projet individuel » : au BUT, la plupart des réalisations
 *  sont des SAÉ, pas des projets (le mot « projet » est réservé aux 2 projets
 *  de semestre de chaque année). */
export function formatEquipe(cadre: string, taille?: number, lang: Lang = 'fr'): string {
  const en = lang === 'en';
  if (cadre === 'individuel' || taille === 1) return en ? 'Solo' : 'Individuel';
  if (taille === 2) return en ? 'Pair' : 'Binôme';
  if (taille && taille > 2) return en ? `Team of ${taille}` : `Équipe de ${taille}`;
  if (cadre === 'collectif') return en ? 'Team' : 'En équipe';
  return '';
}

/** Libellé lisible du type de projet. */
export function formatType(type: string, lang: Lang = 'fr'): string {
  const libelles: Record<Lang, Record<string, string>> = {
    fr: {
      sae: 'Mise en situation professionnelle (SAÉ)',
      // Les 2 projets de l'année du BUT MMI : individuel au semestre 1, collectif au semestre 2
      projet: 'Projet de semestre du BUT MMI',
      personnel: 'Projet personnel',
      professionnel: 'Projet professionnel',
      cours: 'Travail de cours',
    },
    en: {
      sae: 'Professional simulation project (SAÉ)',
      projet: 'Semester project (BUT MMI degree)',
      personnel: 'Personal project',
      professionnel: 'Professional project',
      cours: 'Coursework',
    },
  };
  return libelles[lang][type] ?? '';
}
