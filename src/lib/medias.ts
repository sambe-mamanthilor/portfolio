/**
 * Images locales du site.
 *
 * Les images importées depuis src/assets sont optimisées par Astro au build :
 * conversion en WebP, redimensionnement, attributs width/height automatiques
 * (évite que la page "saute" pendant le chargement).
 *
 * Les couvertures des projets viennent normalement de PocketBase.
 * Tant qu'elles n'y sont pas déposées, on affiche ces images de secours.
 */
import type { ImageMetadata } from 'astro';

import cielixir from '../assets/images/projets/cielixir.png';
import olyvia from '../assets/images/projets/olyvia.jpg';
import elm from '../assets/images/projets/elm.png';
import festival from '../assets/images/projets/festival.png';
import alice from '../assets/images/projets/alice-recoque.png';
import microTrottoir from '../assets/images/projets/micro-trottoir.png';

import logoLoum from '../assets/images/logos/loum.png';
import logoProco from '../assets/images/logos/proco.png';
import logoAesbm from '../assets/images/logos/aesbm.png';
import logoMmi from '../assets/images/logos/mmi.png';
import logoEpb from '../assets/images/logos/epb.jpeg';

/**
 * Logos de secours des expériences, par premier mot (en minuscules)
 * du nom de la structure : "Loum Consulting" → "loum".
 */
export const LOGOS_SECOURS: Record<string, ImageMetadata> = {
  'loum': logoLoum,
  'proco': logoProco,
  'aesbm': logoAesbm,
};

/** Logos des établissements (section Parcours). */
export const LOGOS_ECOLES = {
  mmi: logoMmi,
  epb: logoEpb,
};

/** Image de secours par slug de projet. */
export const COUVERTURES_SECOURS: Record<string, ImageMetadata> = {
  'cielixir': cielixir,
  'olyvia': olyvia,
  'elm-design': elm,
  'festival-musique': festival,
  'empreintes-invisibles': alice,
  'micro-trottoir': microTrottoir,
};

import iconeHtml from '../assets/images/outils/html.svg';
import iconeCss from '../assets/images/outils/css.svg';
import iconeJavascript from '../assets/images/outils/javascript.png';
import iconeAstro from '../assets/images/outils/astro.png';
import iconeTailwind from '../assets/images/outils/tailwind.png';
import iconePocketbase from '../assets/images/outils/pocketbase.png';
import iconeFigma from '../assets/images/outils/figma.png';
import iconeCanva from '../assets/images/outils/canva.png';
import iconeDavinci from '../assets/images/outils/davinci.png';
import iconeMiro from '../assets/images/outils/miro.png';
import iconeGithub from '../assets/images/outils/github.png';
import iconeNetlify from '../assets/images/outils/netlify.png';
import iconeVps from '../assets/images/outils/vps.png';

/**
 * Icônes des outils, par slug de l'outil.
 * Un outil sans icône s'affiche simplement avec son nom.
 */
export const ICONES_OUTILS: Record<string, ImageMetadata> = {
  'html': iconeHtml,
  'css': iconeCss,
  'javascript': iconeJavascript,
  'astro': iconeAstro,
  'tailwind': iconeTailwind,
  'pocketbase': iconePocketbase,
  'figma': iconeFigma,
  'canva': iconeCanva,
  'davinci-resolve': iconeDavinci,
  'miro': iconeMiro,
  'git': iconeGithub,
  'netlify': iconeNetlify,
  'vps': iconeVps,
};
