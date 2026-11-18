/**
 * Plan du site pour les moteurs de recherche : /sitemap.xml
 * Généré au build, comme les pages : la liste des projets vient de PocketBase,
 * donc un projet ajouté dans le back-office entre automatiquement dans le plan.
 * Chaque page existe en français (sans préfixe) et en anglais (/en).
 */
import type { APIRoute } from 'astro';
import { getProjets } from '../lib/pocketbase';

export const GET: APIRoute = async ({ site }) => {
  const base = (site?.href ?? 'https://portfolio.maman-sambe.fr/').replace(/\/$/, '');
  const projets = await getProjets();

  const chemins = [
    '/', '/a-propos/', '/projets/', '/contact/', '/mentions-legales/',
    ...projets.map((p) => `/projets/${p.slug}/`),
  ];

  // Une entrée par page, avec le lien vers sa version dans l'autre langue (hreflang)
  const urls = chemins.map((c) => {
    const fr = base + c;
    const en = base + '/en' + c;
    const alternates =
      `    <xhtml:link rel="alternate" hreflang="fr" href="${fr}"/>\n` +
      `    <xhtml:link rel="alternate" hreflang="en" href="${en}"/>`;
    return `  <url>\n    <loc>${fr}</loc>\n${alternates}\n  </url>\n  <url>\n    <loc>${en}</loc>\n${alternates}\n  </url>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
