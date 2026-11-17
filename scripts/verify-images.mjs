/**
 * Auditoría SEO de imágenes sobre dist/ (ejecutar tras `npm run build`):  npm run verify:images
 *   (a) og:image de cada página: existe en dist, mide 1200×630, coincide con og:image:width/height, tiene og:image:alt
 *       y es única (solo home, privacidad y 404 pueden usar og-default.png).
 *   (b) <img>: ninguna sin atributo alt; alt="" solo en imágenes decorativas (fuera de las carpetas de contenido);
 *       alt de contenido ≤ 140 caracteres.
 *   (c) nombres de archivo de imagen descriptivos (src/assets, public y dist/_astro): minúsculas, sin tildes, con guiones,
 *       nunca un nombre genérico (og, tablero, image, foto…) sin contexto.
 *   (d) JSON-LD: toda URL de imagen (image, logo, primaryImageOfPage…) apunta a un archivo que existe en dist.
 * Sale con código 1 si algo falla.
 */
import sharp from 'sharp';
import { readdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const SITE = 'https://nithios.com';
const DEFAULT_OG_OK = new Set(['/', '/404/']);
const CONVENTION = /^(favicon|apple-touch-icon|icon-\d+|icon-maskable-\d+|og-default)$/;
const GENERIC = /^(og|tablero|image|imagen|img|foto|photo|picture|captura|screenshot|cover|portada|banner|hero|logo|reportes?|dashboard|thumb|\d+)$/;
const IMG_EXT = /\.(png|jpe?g|webp|avif|gif|svg)$/i;
const CONTENT_IMG = /\/_astro\/(dragon-global-trade|plataforma-|jonathan-osorio|krystal)/;

const errors = [];
const fail = (m) => errors.push(m);

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else out.push(p);
  }
  return out;
}
const attr = (tag, name) => {
  const m = tag.match(new RegExp(`\\s${name}\\s*=\\s*("([^"]*)"|'([^']*)')`, 'i'));
  return m ? (m[2] ?? m[3]) : undefined;
};
const meta = (html, prop) => {
  for (const t of html.match(/<meta\b[^>]*>/gi) ?? []) if (attr(t, 'property') === prop || attr(t, 'name') === prop) return attr(t, 'content');
};
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const toDist = (url) => path.join(dist, decodeURIComponent(new URL(url, SITE).pathname));

const files = await walk(dist);
const pages = files.filter((f) => f.endsWith('.html'));
const ogUse = new Map();
let imgCount = 0;
let decorative = 0;
const report = [];

for (const file of pages) {
  const html = await readFile(file, 'utf8');
  const route = '/' + path.relative(dist, file).replace(/index\.html$/, '').replace(/404\.html$/, '404/');

  // (a) Open Graph
  const og = meta(html, 'og:image');
  const alt = meta(html, 'og:image:alt');
  if (!og) fail(`${route}: sin og:image`);
  else {
    const f = toDist(og);
    if (!existsSync(f)) fail(`${route}: og:image no existe en dist (${og})`);
    else {
      const { width, height } = await sharp(f).metadata();
      if (width !== 1200 || height !== 630) fail(`${route}: og:image mide ${width}×${height} (${og})`);
      if (meta(html, 'og:image:width') !== String(width) || meta(html, 'og:image:height') !== String(height))
        fail(`${route}: og:image:width/height no coinciden con el archivo`);
      const kb = Math.round((await readFile(f)).length / 1024);
      if (kb > 200) fail(`${route}: og:image pesa ${kb} KB (> 200 KB)`);
      report.push(`${route.padEnd(48)} ${path.basename(f).padEnd(78)} ${String(kb).padStart(3)} KB`);
    }
    if (!alt || alt.trim().length < 20) fail(`${route}: og:image:alt vacío o pobre`);
    // X/Twitter usa og:* como respaldo: twitter:image es opcional, pero si existe debe coincidir.
    const tw = meta(html, 'twitter:image');
    if (tw && tw !== og) fail(`${route}: twitter:image distinto de og:image`);
    if (meta(html, 'twitter:card') !== 'summary_large_image') fail(`${route}: falta twitter:card summary_large_image`);
    const key = new URL(og).pathname;
    ogUse.set(key, [...(ogUse.get(key) ?? []), route]);
  }

  // (b) textos alternativos
  for (const tag of html.match(/<img\b[^>]*>/gi) ?? []) {
    imgCount++;
    const src = attr(tag, 'src') ?? '';
    const a = attr(tag, 'alt');
    if (a === undefined) fail(`${route}: <img> sin atributo alt (${src})`);
    else if (a.trim() === '') {
      if (CONTENT_IMG.test(src)) fail(`${route}: imagen de contenido con alt vacío (${src})`);
      else decorative++;
    } else if (CONTENT_IMG.test(src) && decode(a).length > 140) fail(`${route}: alt de ${path.basename(src)} > 140 car. (${decode(a).length})`);
  }

  // (d) JSON-LD
  for (const m of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    const urls = [];
    const visit = (v, k) => {
      if (typeof v === 'string') {
        if (/^(image|logo|url|contentUrl|thumbnailUrl)$/.test(k ?? '') && v.startsWith(SITE) && IMG_EXT.test(v)) urls.push(v);
      } else if (Array.isArray(v)) v.forEach((x) => visit(x, k));
      else if (v && typeof v === 'object') for (const [kk, vv] of Object.entries(v)) visit(vv, kk);
    };
    visit(JSON.parse(m[1]));
    for (const u of urls) if (!existsSync(toDist(u))) fail(`${route}: JSON-LD apunta a una imagen inexistente (${u})`);
  }
}

for (const [img, routes] of ogUse) {
  if (routes.length < 2) continue;
  const extra = routes.filter((r) => !(img === '/og-default.png' && DEFAULT_OG_OK.has(r)));
  if (extra.length) fail(`og:image compartida ${img}: ${routes.join(', ')}`);
}

// (e) sitemap de imágenes: cada <image:loc> existe en dist/ y cada página con imágenes de contenido (alt no vacío,
// dentro de <main>) las declara en su <url>.
{
  const smFiles = files.filter((f) => /sitemap-\d+\.xml$/.test(f));
  if (!smFiles.length) fail('sin sitemap-N.xml en dist/');
  let declared = 0;
  for (const f of smFiles) {
    const xml = await readFile(f, 'utf8');
    for (const u of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
      const loc = u[1].match(/<loc>([^<]+)<\/loc>/)?.[1] ?? '';
      const imgs = [...u[1].matchAll(/<image:loc>([^<]+)<\/image:loc>/g)].map((x) => x[1]);
      declared += imgs.length;
      for (const i of imgs) if (!existsSync(toDist(i))) fail(`sitemap: ${loc} declara una imagen inexistente (${i})`);
      const page = toDist(loc.endsWith('/') ? loc + 'index.html' : loc);
      if (!existsSync(page)) continue;
      const main = (await readFile(page, 'utf8')).match(/<main[\s\S]*?<\/main>/)?.[0] ?? '';
      const content = (main.match(/<img\b[^>]*>/gi) ?? []).filter((t) => (attr(t, 'alt') ?? '').trim() && CONTENT_IMG.test(attr(t, 'src') ?? ''));
      if (content.length && !imgs.length) fail(`sitemap: ${loc} tiene imágenes de contenido y no las declara (image:image)`);
    }
  }
  console.log(`Sitemap de imágenes: ${declared} <image:loc> verificados.`);
}

// (c) nombres de archivo
const nameChecks = [
  ...(await walk(path.join(root, 'src', 'assets'))),
  ...(await walk(path.join(root, 'public'))),
  ...files.filter((f) => f.includes(`${path.sep}_astro${path.sep}`)),
].filter((f) => IMG_EXT.test(f));
for (const f of nameChecks) {
  const base = path.basename(f).split('.')[0];
  if (CONVENTION.test(base)) continue;
  if (!/^[a-z0-9]+(-[a-z0-9]+)+$/.test(base)) fail(`nombre no descriptivo o con mayúsculas/tildes: ${path.relative(root, f)}`);
  if (GENERIC.test(base) || base.split('-').length < 3) fail(`nombre de imagen genérico: ${path.relative(root, f)}`);
}

console.log('og:image por página:\n' + report.join('\n'));
console.log(`\n${pages.length} páginas · ${imgCount} <img> (${decorative} decorativas con alt="") · ${nameChecks.length} archivos de imagen revisados`);
if (errors.length) {
  console.error(`\n✗ ${errors.length} problema(s):\n- ` + errors.join('\n- '));
  process.exit(1);
}
console.log('✓ Auditoría de imágenes OK');
