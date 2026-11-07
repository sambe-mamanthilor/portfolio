/**
 * Petites fonctions de mise en forme réutilisées dans les pages.
 */

const moisAnnee = new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric', timeZone: 'UTC' });
const mois = new Intl.DateTimeFormat('fr-FR', { month: 'long', timeZone: 'UTC' });

/** Transforme une date PocketBase ("2026-03-01 00:00:00.000Z") en objet Date. */
function versDate(valeur: string | undefined): Date | null {
  if (!valeur) return null;
  const date = new Date(valeur.replace(' ', 'T'));
  return Number.isNaN(date.getTime()) ? null : date;
}

/**
 * Période lisible à partir de deux dates :
 *  - "mars – juin 2026" (même année)
 *  - "septembre 2025 – janvier 2026" (années différentes)
 *  - "octobre 2026" (même mois ou pas de date de fin)
 */
export function formatPeriode(debut?: string, fin?: string): string {
  const d = versDate(debut);
  const f = versDate(fin);
  if (!d) return '';
  if (!f) return moisAnnee.format(d);

  const memeAnnee = d.getUTCFullYear() === f.getUTCFullYear();
  const memeMois = memeAnnee && d.getUTCMonth() === f.getUTCMonth();

  if (memeMois) return moisAnnee.format(d);
  if (memeAnnee) return `${mois.format(d)} – ${moisAnnee.format(f)}`;
  return `${moisAnnee.format(d)} – ${moisAnnee.format(f)}`;
}

/** "Individuel", "Binôme" ou "Équipe de 3". */
export function formatEquipe(cadre: string, taille?: number): string {
  if (cadre === 'individuel' || taille === 1) return 'Projet individuel';
  if (taille === 2) return 'Binôme';
  if (taille && taille > 2) return `Équipe de ${taille}`;
  return cadre === 'collectif' ? 'Projet en équipe' : '';
}

/** Libellé lisible du type de projet. */
export function formatType(type: string): string {
  const libelles: Record<string, string> = {
    sae: 'SAÉ (projet universitaire)',
    personnel: 'Projet personnel',
    professionnel: 'Projet professionnel',
    cours: 'Travail de cours',
  };
  return libelles[type] ?? '';
}
