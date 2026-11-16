// Adapta dist/ para la VISTA PREVIA en GitHub Pages (https://<usuario>.github.io/<repo>/).
// El sitio usa rutas absolutas desde la raíz ("/servicios/") porque en producción vive en
// https://nithios.com/. En Pages se sirve bajo un subdirectorio, así que aquí:
//   1. se antepone la base (p. ej. "/WebNithios") a toda ruta absoluta de HTML, CSS y manifest;
//   2. se marca cada página como noindex (la vista previa no debe competir con nithios.com).
// Uso: PAGES_BASE=/WebNithios node scripts/pages-preview.mjs   (solo lo ejecuta el workflow de Pages)
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, extname } from 'node:path';

const base = (process.env.PAGES_BASE || '').replace(/\/+$/, '');
if (!/^\/[\w.-]+$/.test(base)) {
  console.error('PAGES_BASE inválida (esperado "/NombreRepo"):', JSON.stringify(base));
  process.exit(1);
}
const dist = new URL('../dist/', import.meta.url).pathname;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else yield path;
  }
}

// "/x" → "/base/x"; deja intactas "//host", rutas ya prefijadas y URLs absolutas.
const prefix = (url) =>
  url.startsWith('/') && !url.startsWith('//') && !url.startsWith(base + '/') && url !== base
    ? base + url
    : url;

function rewriteHtml(html) {
  let out = html
    .replace(/\b(href|src|action|poster)="(\/[^"]*)"/g, (_, attr, url) => `${attr}="${prefix(url)}"`)
    .replace(/\b(srcset|imagesrcset)="([^"]*)"/g, (_, attr, value) => {
      const items = value.split(',').map((item) => {
        const [url, ...rest] = item.trim().split(/\s+/);
        return [prefix(url), ...rest].join(' ');
      });
      return `${attr}="${items.join(', ')}"`;
    });
  const robots = '<meta name="robots" content="noindex, nofollow">';
  out = /<meta name="robots"[^>]*>/.test(out)
    ? out.replace(/<meta name="robots"[^>]*>/, robots)
    : out.replace(/<head([^>]*)>/, `<head$1>${robots}`);
  return out;
}

const rewriteCss = (css) =>
  css.replace(/url\((['"]?)(\/[^)'"]+)\1\)/g, (_, quote, url) => `url(${quote}${prefix(url)}${quote})`);

const rewriteManifest = (json) => json.replace(/"(\/[^"]*)"/g, (_, url) => `"${prefix(url)}"`);

let count = 0;
for await (const file of walk(dist)) {
  const ext = extname(file);
  const rewrite =
    ext === '.html' ? rewriteHtml : ext === '.css' ? rewriteCss : ext === '.webmanifest' ? rewriteManifest : null;
  if (!rewrite) continue;
  const before = await readFile(file, 'utf8');
  const after = rewrite(before);
  if (after !== before) {
    await writeFile(file, after);
    count++;
  }
}
// Pages no debe pasar dist/ por Jekyll (ignora carpetas que empiezan por "_", como _astro/).
await writeFile(join(dist, '.nojekyll'), '');
console.log(`Vista previa de Pages: base "${base}" aplicada a ${count} archivos; noindex activado.`);
