/**
 * Verifica el enlazado interno sobre dist/ (ejecutar tras `npm run build`):  npm run verify:links
 *   - Todo href interno («/ruta/…») apunta a una página o archivo que existe en dist/.
 *   - Las rutas de página llevan slash final (convención del sitio).
 *   - Los fragmentos «#id» (en la misma página o en otra) existen como id en la página destino.
 * Útil sobre todo para el Markdown de las guías, donde los enlaces se escriben a mano.
 * Sale con código 1 si algo falla.
 */
import { readdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
if (!existsSync(dist)) {
  console.error('No existe dist/: ejecuta `npm run build` primero.');
  process.exit(1);
}

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}

const pages = await walk(dist);
const routeOf = (file) => '/' + path.relative(dist, file).replace(/index\.html$/, '').replace(/\\/g, '/');
const idsCache = new Map();
const htmlOf = new Map();
for (const f of pages) htmlOf.set(routeOf(f), await readFile(f, 'utf8'));
const idsOf = (route) => {
  if (!idsCache.has(route)) {
    const html = htmlOf.get(route) ?? '';
    idsCache.set(route, new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
  }
  return idsCache.get(route);
};

const errors = [];
let count = 0;
for (const [route, html] of htmlOf) {
  for (const m of html.matchAll(/<a\b[^>]*\shref="([^"]+)"/g)) {
    const href = m[1].replace(/&amp;/g, '&');
    if (/^(https?:|mailto:|tel:|\/\/)/.test(href)) continue;
    count++;
    const [pathPart, hash] = href.split('#');
    const target = pathPart === '' ? route : pathPart.split('?')[0];
    if (!target.startsWith('/')) {
      errors.push(`${route}: enlace relativo «${href}» (usa rutas absolutas «/…/»)`);
      continue;
    }
    const isFile = /\.[a-z0-9]+$/i.test(target);
    if (!isFile && !target.endsWith('/')) errors.push(`${route}: «${href}» sin slash final`);
    const exists = isFile ? existsSync(path.join(dist, decodeURIComponent(target))) : htmlOf.has(target.endsWith('/') ? target : target + '/');
    if (!exists) {
      errors.push(`${route}: «${href}» no existe en dist/`);
      continue;
    }
    if (hash && !isFile && !idsOf(target.endsWith('/') ? target : target + '/').has(decodeURIComponent(hash)))
      errors.push(`${route}: «${href}» → el id «#${hash}» no existe en la página destino`);
  }
}

if (errors.length) {
  console.error(`✗ ${errors.length} enlace(s) interno(s) con problemas:\n  - ${[...new Set(errors)].join('\n  - ')}`);
  process.exit(1);
}
console.log(`✓ ${count} enlaces internos verificados en ${pages.length} páginas.`);
