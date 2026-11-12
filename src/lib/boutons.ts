/**
 * Les 2 types de boutons du site (et seulement 2) :
 *  - "principal"  : plein, couleur principale (cyan en zone sombre, bleu en zone claire)
 *    → l'action la plus importante d'un bloc ;
 *  - "secondaire" : contour de la couleur principale, fond transparent
 *    → l'action alternative, à côté d'un bouton principal, ou une action discrète.
 * Deux tailles possibles : "normal" (par défaut) et "petit" (cartes, filtres, footer).
 *
 * On écrit les classes Tailwind/daisyUI une seule fois ici, puis dans les pages :
 *   <a href="/projets" class={bouton('principal')}>Voir mes projets</a>
 * Si on veut changer le style des boutons, on ne modifie que ce fichier.
 */
type TypeBouton = 'principal' | 'secondaire';
type TailleBouton = 'normal' | 'petit';

const FORME = 'btn h-auto rounded-[20px] font-semibold';
const TYPES: Record<TypeBouton, string> = {
  principal: 'btn-primary',
  secondaire: 'btn-outline btn-primary',
};
const TAILLES: Record<TailleBouton, string> = {
  normal: 'px-[22px] py-3.5 text-lg',
  petit: 'btn-sm px-4 py-1.5 text-sm',
};

export function bouton(type: TypeBouton, taille: TailleBouton = 'normal'): string {
  return `${FORME} ${TYPES[type]} ${TAILLES[taille]}`;
}
