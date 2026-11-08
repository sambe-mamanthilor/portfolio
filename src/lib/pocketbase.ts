/**
 * Connexion à PocketBase : le seul fichier du site qui parle à la base.
 *
 * Toutes les pages passent par les fonctions ci-dessous au lieu d'appeler
 * PocketBase directement. Avantage : si la base change (nom d'un champ,
 * adresse du serveur), on corrige ICI, et tout le site suit.
 *
 * Quand ces fonctions s'exécutent-elles ?
 * Au moment du BUILD (npm run build), pas dans le navigateur du visiteur.
 * Astro récupère les données, génère des pages HTML statiques, et le
 * visiteur reçoit du HTML déjà prêt : rapide, bon pour le SEO, et le site
 * reste consultable même si PocketBase est arrêté.
 */
import PocketBase from 'pocketbase';

// ------------------------------------------------------------------
// Connexion
// ------------------------------------------------------------------

// L'adresse vient du fichier .env (jamais écrite en dur dans le code) :
// en local http://127.0.0.1:8090, en production l'adresse du VPS.
const POCKETBASE_URL = import.meta.env.POCKETBASE_URL ?? 'http://127.0.0.1:8090';

export const pb = new PocketBase(POCKETBASE_URL);

// Par défaut, le SDK annule une requête si une autre identique part juste
// après. Pendant le build, Astro génère plusieurs pages en même temps :
// on désactive ce comportement pour qu'aucune requête ne soit annulée.
pb.autoCancellation(false);

// ------------------------------------------------------------------
// Types : la forme des données, pour que l'éditeur nous aide
// (autocomplétion, erreur si on se trompe de nom de champ)
// ------------------------------------------------------------------

/** Champs présents sur toutes les fiches PocketBase. */
interface BaseRecord {
  id: string;
  collectionId: string;
  collectionName: string;
}

export interface Categorie extends BaseRecord {
  nom: string;
  slug: string;
  ordre: number;
}

export interface Outil extends BaseRecord {
  nom: string;
  slug: string;
  type: 'langage' | 'framework' | 'backend' | 'cms' | 'design' | 'audiovisuel' | 'gestion' | 'deploiement' | '';
  icone: string;
  afficher_competences: boolean;
}

export interface Difficulte {
  probleme: string;
  cause: string;
  solution: string;
}

export interface Projet extends BaseRecord {
  titre: string;
  slug: string;
  /** Titre plus court, affiché sur la carte projet (sinon on prend "titre") */
  titre_court?: string;
  resume: string;
  categorie: string[];
  type_projet: 'sae' | 'personnel' | 'professionnel' | 'cours' | '';
  cadre: 'individuel' | 'collectif' | '';
  taille_equipe: number;
  role: string;
  date_debut: string;
  date_fin: string;
  contexte: string;
  objectifs: string;
  choix_techniques: string;
  resultat: string;
  outils: string[];
  couverture: string;
  couverture_alt: string;
  galerie: string[];
  /** Courte vidéo muette jouée au survol de la carte (facultatif) */
  apercu_video?: string;
  /** true si le site peut s'afficher en direct dans la page projet (iframe) */
  apercu_en_direct?: boolean;
  /** Appareils de l'aperçu : "trio" (MacBook + iPad + iPhone) ou "mobile" (iPhone seul) */
  format_apercu?: 'trio' | 'mobile' | '';
  /** Captures au format téléphone, pour l'iPhone quand le site n'est pas en direct */
  captures_mobile?: string[];
  /** Tableau « Problème / Cause / Solution » de la page projet */
  difficultes?: Difficulte[] | null;
  dossier: string;
  lien_demo: string;
  lien_github: string;
  lien_video: string;
  mis_en_avant: boolean;
  ordre: number;
  // "expand" : les catégories et outils complets, joints à la requête
  expand?: {
    categorie?: Categorie[];
    outils?: Outil[];
  };
}

export interface Etape extends BaseRecord {
  projet: string;
  titre: string;
  description: string;
  date: string;
  ordre: number;
  image: string;
  image_alt: string;
}

export interface Experience extends BaseRecord {
  poste: string;
  structure: string;
  lieu: string;
  type: 'stage' | 'emploi' | 'alternance' | 'associatif' | 'freelance' | '';
  periode: string;
  date_debut: string;
  en_cours: boolean;
  description: string;
  logo: string;
  logo_alt: string;
  ordre: number;
}

// ------------------------------------------------------------------
// Fonctions de lecture
// ------------------------------------------------------------------

// "expand" demande à PocketBase de remplacer les ids des relations
// par les fiches complètes : une seule requête au lieu de plusieurs.
const EXPAND_PROJET = 'categorie,outils';

/** Toutes les catégories, dans l'ordre choisi dans le back-office. */
export function getCategories() {
  return pb.collection('categories').getFullList<Categorie>({ sort: 'ordre' });
}

/**
 * Tous les projets publiés.
 * Le filtre "publié" n'est pas écrit ici : il est déjà appliqué par la
 * règle d'accès de la collection (listRule: "publie = true").
 */
// Tri chronologique, du plus récent au plus ancien : "-" = ordre décroissant.
// "ordre" ne sert plus qu'à départager deux projets commencés le même jour.
const TRI_CHRONO = '-date_debut,ordre';

export function getProjets() {
  return pb.collection('projets').getFullList<Projet>({
    sort: TRI_CHRONO,
    expand: EXPAND_PROJET,
  });
}

/** Les projets mis en avant sur la page d'accueil. */
export function getProjetsMisEnAvant() {
  return pb.collection('projets').getFullList<Projet>({
    filter: 'mis_en_avant = true',
    sort: TRI_CHRONO,
    expand: EXPAND_PROJET,
  });
}

/** Un projet à partir de son slug (ex. "cielixir"). */
export function getProjet(slug: string) {
  // pb.filter() insère la valeur de façon sécurisée (comme une requête
  // préparée en SQL) : on ne colle jamais une variable dans un filtre.
  return pb.collection('projets').getFirstListItem<Projet>(
    pb.filter('slug = {:slug}', { slug }),
    { expand: EXPAND_PROJET },
  );
}

/** Les étapes de la frise d'un projet, dans l'ordre. */
export function getEtapes(projetId: string) {
  return pb.collection('etapes').getFullList<Etape>({
    filter: pb.filter('projet = {:projetId}', { projetId }),
    sort: 'ordre',
  });
}

/** Les expériences, de la plus récente à la plus ancienne. */
export function getExperiences() {
  return pb.collection('experiences').getFullList<Experience>({
    sort: '-date_debut',
  });
}

/** Les outils à afficher dans la section Compétences, groupés par type. */
export function getCompetences() {
  return pb.collection('outils').getFullList<Outil>({
    filter: 'afficher_competences = true',
    sort: 'type,nom',
  });
}

// ------------------------------------------------------------------
// Fichiers (images, PDF)
// ------------------------------------------------------------------

/**
 * Adresse d'un fichier stocké dans PocketBase.
 * @param thumb taille de miniature déclarée dans la collection
 *              (ex. "400x225"), pour charger une image plus légère.
 */
export function fileUrl(
  record: BaseRecord,
  filename: string | undefined,
  thumb?: string,
): string | undefined {
  if (!filename) return undefined;
  return pb.files.getURL(record, filename, thumb ? { thumb } : {});
}
