/**
 * Auditoría SEO/GEO técnica sobre dist/ (ejecutar tras `npm run build`):  npm run verify:seo
 * Contra producción (mismas comprobaciones por página, leyendo las URL del sitemap publicado):
 *   npm run verify:seo -- --remote=https://nithios.com
 *
 * 1. Por página: <title> (≤ 60, único, sin vacío), meta description (140–160, única), un solo <h1>, jerarquía de
 *    encabezados sin saltos (h2→h4 no), html lang="es-CO", canonical absoluto = URL con slash final, meta robots indexable,
 *    hreflang es-CO + x-default = canonical, Open Graph completo (og:type, og:title ≤ 60, og:description ≤ 125 —convención
 *    del sitio para vistas previas en chats/redes—, og:url = canonical, og:image absoluta 1200×630 con og:image:alt,
 *    og:locale, og:site_name), twitter:card, BreadcrumbList en toda página salvo la home.
 * 2. JSON-LD: cada bloque parsea; @context schema.org; cada nodo con @type; @id únicos en la página; toda referencia
 *    {"@id"} resuelve a un nodo publicado en alguna página del sitio; propiedades mínimas por tipo (Organization, WebSite,
 *    WebPage, BreadcrumbList —el último ítem = canonical—, Service, Article —fechas ISO, author, publisher, image—,
 *    FAQPage, Person, CreativeWork, ItemList); propiedades PROHIBIDAS (aggregateRating, review, priceRange,
 *    openingHours, address de la organización); cada pregunta FAQPage una sola vez en todo el sitio.
 * 4. Rastreo: sitemap = exactamente las páginas indexables (sin 404 ni noindex, todas con slash final y existentes);
 *    robots.txt con Sitemap y sin bloquear el sitio; llms.txt enlaza cada página indexable; llms-full.txt cubre servicios,
 *    guías y casos; profundidad de clic ≤ 3 desde la home; ≥ 3 enlaces entrantes CONTEXTUALES (dentro de <main>, desde
 *    otras páginas); anclas no genéricas («aquí», «clic aquí», «leer más», «ver más» a secas); 404 con noindex y sin canonical.
 *    Seguridad del contenido: ninguna mención del proveedor de hosting en lo publicado.
 * La imagen OG con llamada a la acción (botón dorado) NO se puede verificar automáticamente: ver docs/SEO-GEO.md › Imágenes.
 * Sale con código 1 si algo falla (los avisos «⚠» no hacen fallar).
 */
import sharp from 'sharp';
import { readdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const SITE = 'https://nithios.com';
const remoteArg = process.argv.find((a) => a.startsWith('--remote='));
const REMOTE = remoteArg ? remoteArg.slice(9).replace(/\/$/, '') : null;

const errors = [];
const warnings = [];
const fail = (m) => errors.push(m);
const warn = (m) => warnings.push(m);

/* ---------- carga de páginas ---------- */
async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else out.push(p);
  }
  return out;
}
async function fetchText(url) {
  const res = await fetch(url, { redirect: 'manual', headers: { 'user-agent': 'nithios-verify-seo' } });
  return { status: res.status, text: res.status === 200 ? await res.text() : '' };
}
const BASE = REMOTE ?? SITE;
/** Lee un archivo publicado (dist/ o producción). */
async function readPublished(p) {
  if (REMOTE) return (await fetchText(REMOTE + p)).text;
  const f = path.join(dist, p);
  return existsSync(f) ? readFile(f, 'utf8') : '';
}

const pages = new Map(); // ruta → html
if (REMOTE) {
  const index = await readPublished('/sitemap-index.xml');
  const maps = [...index.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  for (const sm of maps) {
    const xml = (await fetchText(sm.replace(SITE, REMOTE))).text;
    for (const m of xml.matchAll(/<url>\s*<loc>([^<]+)<\/loc>/g)) {
      const route = new URL(m[1]).pathname;
      const { status, text } = await fetchText(REMOTE + route);
      if (status !== 200) fail(`${route}: el sitemap la lista pero responde ${status}`);
      else pages.set(route, text);
    }
  }
  const nf = await fetch(REMOTE + '/verify-seo-no-existe/', { redirect: 'manual' });
  if (nf.status !== 404) fail(`URL inexistente responde ${nf.status} (se espera 404)`);
  pages.set('/404/', await nf.text());
} else {
  if (!existsSync(dist)) {
    console.error('No existe dist/: ejecuta `npm run build` primero.');
    process.exit(1);
  }
  for (const f of (await walk(dist)).filter((x) => x.endsWith('.html'))) {
    const rel = path.relative(dist, f).replace(/\\/g, '/');
    const route = rel === '404.html' ? '/404/' : '/' + rel.replace(/index\.html$/, '');
    pages.set(route, await readFile(f, 'utf8'));
  }
}

/* ---------- utilidades HTML ---------- */
const decode = (s = '') =>
  s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&#x27;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ');
const attr = (tag, name) => {
  const m = tag.match(new RegExp(`\\s${name}\\s*=\\s*("([^"]*)"|'([^']*)')`, 'i'));
  return m ? decode(m[2] ?? m[3]) : undefined;
};
const metaTags = (html) => html.match(/<meta\b[^>]*>/gi) ?? [];
const meta = (html, key) => {
  for (const t of metaTags(html)) if (attr(t, 'property') === key || attr(t, 'name') === key) return attr(t, 'content');
  return undefined;
};
const linkRel = (html, rel, extra) =>
  (html.match(/<link\b[^>]*>/gi) ?? []).filter((t) => attr(t, 'rel') === rel && (!extra || extra(t)));
const text = (s) => decode(s.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
const mainOf = (html) => html.match(/<main[\s\S]*?<\/main>/i)?.[0] ?? '';

/* ---------- 1. Metadatos por página ---------- */
const titles = new Map();
const descs = new Map();
const indexable = new Set();
const ldByRoute = new Map();
const globalIds = new Set();

for (const [route, html] of pages) {
  const is404 = route === '/404/';
  const canonicalUrl = SITE + route;
  const robots = meta(html, 'robots') ?? '';
  const noindex = /noindex/i.test(robots);

  if (!/<html[^>]*\slang="es-CO"/.test(html)) fail(`${route}: <html lang> ≠ es-CO`);
  const title = text(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? '');
  if (!title) fail(`${route}: sin <title>`);
  else if (title.length > 60) fail(`${route}: title > 60 car. (${title.length}) «${title}»`);
  const desc = meta(html, 'description') ?? '';
  if (!is404 && (desc.length < 140 || desc.length > 160)) fail(`${route}: description fuera de 140–160 (${desc.length})`);

  const h1s = html.match(/<h1\b/gi) ?? [];
  if (h1s.length !== 1) fail(`${route}: ${h1s.length} <h1> (debe haber 1)`);
  let prev = 0;
  for (const m of html.matchAll(/<h([1-6])\b/gi)) {
    const lvl = Number(m[1]);
    if (prev && lvl > prev + 1) {
      fail(`${route}: salto de encabezado h${prev} → h${lvl}`);
      break;
    }
    prev = lvl;
  }

  if (is404) {
    if (!noindex) fail('404: falta noindex');
    if (linkRel(html, 'canonical').length) fail('404: no debe tener canonical');
    continue;
  }
  if (noindex) {
    warn(`${route}: noindex`);
    continue;
  }
  indexable.add(route);
  if (titles.has(title)) fail(`${route}: title duplicado con ${titles.get(title)}`);
  titles.set(title, route);
  if (descs.has(desc)) fail(`${route}: description duplicada con ${descs.get(desc)}`);
  descs.set(desc, route);

  if (!/index,\s*follow/.test(robots) || !/max-image-preview:large/.test(robots)) fail(`${route}: meta robots «${robots}»`);
  const canon = linkRel(html, 'canonical').map((t) => attr(t, 'href'));
  if (canon.length !== 1 || canon[0] !== canonicalUrl) fail(`${route}: canonical «${canon.join(', ')}» ≠ ${canonicalUrl}`);
  for (const lang of ['es-CO', 'x-default']) {
    const h = linkRel(html, 'alternate', (t) => attr(t, 'hreflang') === lang).map((t) => attr(t, 'href'));
    if (h[0] !== canonicalUrl) fail(`${route}: hreflang ${lang} ausente o ≠ canonical`);
  }

  const og = (k) => meta(html, k);
  for (const k of ['og:type', 'og:title', 'og:description', 'og:url', 'og:image', 'og:image:alt', 'og:image:width', 'og:image:height', 'og:locale', 'og:site_name'])
    if (!og(k)) fail(`${route}: falta ${k}`);
  if ((og('og:title') ?? '').length > 60) fail(`${route}: og:title > 60 (${og('og:title').length})`);
  const ogd = og('og:description') ?? '';
  if (ogd.length > 125) fail(`${route}: og:description > 125 car. (${ogd.length}) — usa ogDescription`);
  if (ogd && !/[.?!»)]$/.test(ogd)) warn(`${route}: og:description no termina en frase completa «${ogd.slice(-30)}»`);
  if (og('og:url') !== canonicalUrl) fail(`${route}: og:url ≠ canonical`);
  if (og('og:locale') !== 'es_CO') fail(`${route}: og:locale ≠ es_CO`);
  if (og('og:image:width') !== '1200' || og('og:image:height') !== '630') fail(`${route}: og:image no declara 1200×630`);
  const ogImg = og('og:image') ?? '';
  if (!ogImg.startsWith(SITE + '/')) fail(`${route}: og:image no es absoluta en ${SITE}`);
  else if (!REMOTE) {
    const file = path.join(dist, decodeURIComponent(new URL(ogImg).pathname));
    if (!existsSync(file)) fail(`${route}: og:image no existe en dist (${ogImg})`);
    else {
      const m = await sharp(file).metadata();
      if (m.width !== 1200 || m.height !== 630) fail(`${route}: og:image mide ${m.width}×${m.height}`);
    }
  }
  if (meta(html, 'twitter:card') !== 'summary_large_image') fail(`${route}: twitter:card ≠ summary_large_image`);

  /* JSON-LD */
  const blocks = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].map((m) => m[1]);
  if (!blocks.length) fail(`${route}: sin JSON-LD`);
  const nodes = [];
  for (const b of blocks) {
    let doc;
    try {
      doc = JSON.parse(b);
    } catch (e) {
      fail(`${route}: JSON-LD no parsea (${e.message})`);
      continue;
    }
    if (doc['@context'] !== 'https://schema.org') fail(`${route}: @context ≠ https://schema.org`);
    nodes.push(...(doc['@graph'] ?? [doc]));
  }
  ldByRoute.set(route, nodes);
  const seen = new Set();
  for (const n of nodes) {
    if (!n['@type']) fail(`${route}: nodo JSON-LD sin @type`);
    if (n['@id']) {
      if (seen.has(n['@id'])) fail(`${route}: @id duplicado ${n['@id']}`);
      seen.add(n['@id']);
      globalIds.add(n['@id']);
    }
  }
  const types = (n) => [].concat(n['@type']);
  const has = (t) => nodes.filter((n) => types(n).includes(t));
  if (route !== '/' && !has('BreadcrumbList').length) fail(`${route}: sin BreadcrumbList`);
  if (!/class="[^"]*breadcrumb|aria-label="(Migas|Ruta|Breadcrumb)/i.test(html) && route !== '/') warn(`${route}: breadcrumb visible no detectado`);
}

/* ---------- 2. Validación de tipos JSON-LD ---------- */
const FORBIDDEN = ['aggregateRating', 'review', 'priceRange', 'openingHours', 'openingHoursSpecification'];
const ISO = /^\d{4}-\d{2}-\d{2}(T[\d:.]+(Z|[+-]\d{2}:\d{2})?)?$/;
const required = {
  Organization: ['name', 'url', 'logo', 'contactPoint', 'areaServed'],
  WebSite: ['name', 'url', 'publisher', 'inLanguage'],
  WebPage: ['url', 'name', 'isPartOf', 'inLanguage'],
  BreadcrumbList: ['itemListElement'],
  Service: ['name', 'description', 'provider', 'areaServed', 'url'],
  Article: ['headline', 'datePublished', 'dateModified', 'author', 'publisher', 'image', 'mainEntityOfPage'],
  FAQPage: ['mainEntity'],
  Person: ['name', 'url'],
  CreativeWork: ['name', 'description', 'url', 'creator'],
  ItemList: ['itemListElement'],
};
const faqSeen = new Map();
function walkRefs(v, out) {
  if (Array.isArray(v)) v.forEach((x) => walkRefs(x, out));
  else if (v && typeof v === 'object') {
    const keys = Object.keys(v);
    if (keys.length === 1 && keys[0] === '@id') out.push(v['@id']);
    else for (const k of keys) walkRefs(v[k], out);
  }
}
function findKey(v, key, out = []) {
  if (Array.isArray(v)) v.forEach((x) => findKey(x, key, out));
  else if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) (k === key ? out.push(x) : null, findKey(x, key, out));
  return out;
}
for (const [route, nodes] of ldByRoute) {
  for (const n of nodes) {
    const ts = [].concat(n['@type']);
    for (const t of ts) {
      const base = /Page$/.test(t) && t !== 'FAQPage' ? 'WebPage' : t;
      for (const k of required[base] ?? []) if (n[k] === undefined || n[k] === '') fail(`${route}: ${t} sin «${k}»`);
    }
    for (const k of FORBIDDEN) if (findKey(n, k).length) fail(`${route}: propiedad prohibida «${k}» en ${ts.join('/')}`);
    if (ts.includes('Organization') && n.address) fail(`${route}: la organización no publica dirección`);
    if (ts.includes('Organization')) {
      const areas = [].concat(n.areaServed ?? []);
      if (!areas.some((a) => a?.name === 'Colombia')) fail(`${route}: Organization.areaServed sin Colombia`);
      if (!n.knowsAbout?.length) fail(`${route}: Organization sin knowsAbout`);
    }
    if (ts.includes('Article')) {
      for (const k of ['datePublished', 'dateModified']) if (!ISO.test(n[k] ?? '')) fail(`${route}: Article.${k} no es ISO 8601 («${n[k]}»)`);
      if (n.dateModified < n.datePublished) fail(`${route}: dateModified anterior a datePublished`);
      if ((n.headline ?? '').length > 110) fail(`${route}: Article.headline > 110 car.`);
    }
    if (ts.includes('BreadcrumbList')) {
      const items = n.itemListElement ?? [];
      items.forEach((it, i) => {
        if (it.position !== i + 1 || !it.name || !it.item) fail(`${route}: BreadcrumbList ítem ${i + 1} incompleto`);
      });
      if (items.at(-1)?.item !== SITE + route) fail(`${route}: el último ítem del BreadcrumbList ≠ URL de la página`);
    }
    if (ts.includes('FAQPage')) {
      for (const q of n.mainEntity ?? []) {
        if (q['@type'] !== 'Question' || !q.name || q.acceptedAnswer?.['@type'] !== 'Answer' || !q.acceptedAnswer?.text)
          fail(`${route}: Question incompleta en FAQPage`);
        if (/\]\(\//.test(q.acceptedAnswer?.text ?? '')) fail(`${route}: respuesta FAQ con Markdown sin convertir`);
        const key = q.name.trim().toLowerCase();
        if (faqSeen.has(key) && faqSeen.get(key) !== route) fail(`FAQ repetida «${q.name}» en ${route} y ${faqSeen.get(key)}`);
        faqSeen.set(key, route);
      }
    }
    const refs = [];
    walkRefs(n, refs);
    for (const id of refs) if (!globalIds.has(id)) fail(`${route}: referencia @id sin nodo publicado: ${id}`);
  }
}
// Coherencia de entidades: la organización y la persona deben ser idénticas en todas las páginas.
const orgJson = new Set();
for (const nodes of ldByRoute.values()) {
  const org = nodes.find((n) => [].concat(n['@type']).includes('Organization'));
  if (org) orgJson.add(JSON.stringify(org));
}
if (orgJson.size > 1) fail(`Organization distinta entre páginas (${orgJson.size} variantes): debe ser idéntica`);

/* ---------- 4. Rastreo e indexación ---------- */
const sitemapIndex = await readPublished('/sitemap-index.xml');
const smUrls = [];
for (const m of sitemapIndex.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  const xml = await readPublished(new URL(m[1]).pathname);
  for (const u of xml.matchAll(/<url>\s*<loc>([^<]+)<\/loc>/g)) smUrls.push(u[1]);
}
if (!smUrls.length) fail('sitemap vacío o ilegible');
const smRoutes = new Set(smUrls.map((u) => new URL(u).pathname));
for (const u of smUrls) if (!u.startsWith(SITE + '/') || !u.endsWith('/')) fail(`sitemap: URL sin dominio canónico o sin slash final: ${u}`);
for (const r of indexable) if (!smRoutes.has(r)) fail(`sitemap: falta ${r}`);
for (const r of smRoutes) if (!indexable.has(r)) fail(`sitemap: incluye ${r}, que no es indexable o no existe`);

const robotsTxt = await readPublished('/robots.txt');
if (!/^Sitemap:\s*https:\/\/nithios\.com\/sitemap-index\.xml/m.test(robotsTxt)) fail('robots.txt sin Sitemap');
if (/^Disallow:\s*\/\s*$/m.test(robotsTxt)) fail('robots.txt bloquea el sitio (Disallow: /)');
for (const bot of ['Googlebot', 'Bingbot', 'GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Google-Extended', 'Applebot-Extended'])
  if (!new RegExp(`^User-agent:\\s*${bot}\\s*$`, 'm').test(robotsTxt)) fail(`robots.txt sin «User-agent: ${bot}»`);

const llms = await readPublished('/llms.txt');
const llmsFull = await readPublished('/llms-full.txt');
for (const r of indexable) {
  if (!llms.includes(SITE + r + ')') && !llms.includes(SITE + r + ' ')) {
    if (!llms.includes(`(${SITE}${r})`)) fail(`llms.txt no enlaza ${r}`);
  }
  if (/^\/(servicios|guias|portafolio)\/[^/]+\/$/.test(r) && !llmsFull.includes(SITE + r)) fail(`llms-full.txt no cubre ${r}`);
}

// Enlaces internos: grafo completo (profundidad) y enlaces contextuales (dentro de <main>, desde otras páginas).
const hrefs = (html) =>
  [...html.matchAll(/<a\b[^>]*\shref="([^"#?]*)[^"]*"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ href: decode(m[1]), label: text(m[2]), tag: m[0] }))
    .map((l) => ({ ...l, href: l.href.startsWith(SITE) ? l.href.slice(SITE.length) : l.href }))
    .filter((l) => l.href.startsWith('/') && !/\.[a-z0-9]+$/i.test(l.href));
const inbound = new Map([...indexable].map((r) => [r, new Set()]));
const graph = new Map();
const GENERIC = /^(aqu[ií]|clic aqu[ií]|haz clic aqu[ií]|click aqu[ií]|leer m[aá]s|ver m[aá]s|m[aá]s|este enlace|link|enlace)$/i;
for (const [route, html] of pages) {
  if (route === '/404/') continue;
  graph.set(route, new Set(hrefs(html).map((l) => l.href)));
  for (const l of hrefs(mainOf(html))) {
    if (l.href !== route && inbound.has(l.href)) inbound.get(l.href).add(route);
    const label = l.label || attr(l.tag, 'aria-label') || '';
    if (GENERIC.test(label.trim())) fail(`${route}: ancla genérica «${label}» → ${l.href}`);
  }
}
const depth = new Map([['/', 0]]);
const queue = ['/'];
while (queue.length) {
  const cur = queue.shift();
  for (const next of graph.get(cur) ?? []) if (!depth.has(next) && graph.has(next)) (depth.set(next, depth.get(cur) + 1), queue.push(next));
}
for (const r of indexable) {
  if (!depth.has(r)) fail(`${r}: huérfana (no alcanzable desde la home)`);
  else if (depth.get(r) > 3) fail(`${r}: a ${depth.get(r)} clics de la home (máx. 3)`);
  const n = inbound.get(r).size;
  if (r !== '/' && n < 3) fail(`${r}: solo ${n} página(s) la enlazan desde el contenido (mín. 3)`);
}

// Seguridad del contenido publicado: ningún proveedor de hosting nombrado.
for (const [route, html] of pages) if (/hostinger/i.test(html)) fail(`${route}: menciona el proveedor de hosting`);
for (const [f, t] of [['llms.txt', llms], ['llms-full.txt', llmsFull], ['robots.txt', robotsTxt]]) if (/hostinger/i.test(t)) fail(`${f}: menciona el proveedor de hosting`);

/* ---------- salida ---------- */
for (const w of warnings) console.warn(`⚠ ${w}`);
if (errors.length) {
  console.error(`✗ verify:seo — ${errors.length} problema(s):\n  - ${[...new Set(errors)].join('\n  - ')}`);
  process.exit(1);
}
const minIn = Math.min(...[...inbound].filter(([r]) => r !== '/').map(([, s]) => s.size));
console.log(
  `✓ verify:seo OK (${REMOTE ?? 'dist/'}) — ${indexable.size} páginas indexables, ${smUrls.length} URL en el sitemap, ` +
    `${globalIds.size} @id, ${faqSeen.size} preguntas FAQ únicas, profundidad máx. ${Math.max(...depth.values())}, ` +
    `enlaces contextuales entrantes mín. ${minIn}.`,
);
