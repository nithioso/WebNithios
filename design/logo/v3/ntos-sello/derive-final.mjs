// Deriva design/logo/final/*.svg (logo oficial K · «NTOS en sello») desde design/logo/v3/ntos-sello/.
// Uso (una vez, o si cambia el arte fuente): node design/logo/v3/ntos-sello/derive-final.mjs && npm run brand
// final/ conserva los nombres que esperan scripts/generate-brand-assets.mjs y scripts/generate-og-images.mjs.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';

const here = new URL('.', import.meta.url).pathname;
const OUT = join(here, '../../final');
const read = (f) => readFile(join(here, f), 'utf8');
/** Renombra los ids de degradado para que cada archivo de final/ tenga los suyos. */
const ids = (svg, tag) => svg.replace(/nth-ntos-[a-z]+-([ab])/g, `nth-k-${tag}-$1`);

const symNeg = await read('symbol-neg.svg');
const app = await read('app-icon.svg');
const horNeg = await read('horizontal-neg.svg');

// Piezas de la moneda con corte óptico (3u) y sus degradados, del app-icon (sin el contenedor redondeado).
const appDefs = app.match(/<defs>[\s\S]*?<\/defs>/)[0];
const appCoin = [...app.matchAll(/<path fill="url\([^"]+\)" d="[^"]+"\/>/g)].map((m) => m[0]).join('');
/** Ícono a sangre: fondo negro + moneda óptica escalada desde el centro (32,32). */
const bleed = (tag, k) =>
  ids(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="Nithios"><title>Nithios</title>${appDefs}` +
      `<rect width="64" height="64" fill="#000"/><g transform="translate(${+(32 - 32 * k).toFixed(3)} ${+(32 - 32 * k).toFixed(3)}) scale(${k})">${appCoin}</g></svg>`,
    tag,
  );

const files = {
  'mark.svg': ids(symNeg, 'ns'),
  'mark-pos.svg': ids(await read('symbol-pos.svg'), 'ps'),
  'mark-mono.svg': await read('mono.svg'),
  'logo-horizontal.svg': ids(horNeg, 'nh'),
  'logo-horizontal-pos.svg': ids(await read('horizontal-pos.svg'), 'ph'),
  'logo-vertical.svg': ids(await read('vertical-neg.svg'), 'nv'),
  'logo-vertical-pos.svg': ids(await read('vertical-pos.svg'), 'pv'),
  // Horizontal a una tinta (currentColor).
  'logo-mono.svg': horNeg.replace(/<defs>[\s\S]*?<\/defs>/, '').replace(/fill="[^"]+"/g, 'fill="currentColor"'),
  // Wordmark NITHIOS: idéntico al de «Ligadura NT» (mismo path que en horizontal-neg.svg).
  'wordmark.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1.4 126 22.8" role="img" aria-label="Nithios"><title>Nithios</title><path fill="#f5f1e8" d="${horNeg.match(/transform="translate\(73 21\.4\) scale\(1\.06\)" d="([^"]+)"/)[1]}"/></svg>`,
  // Contenedor redondeado, moneda R 26,5 y corte óptico de 3u (favicon, íconos «any»).
  'app-icon.svg': ids(app, 'ai'),
  // A sangre para apple-touch (iOS redondea las esquinas): moneda al 72 % del lado.
  'app-icon-square.svg': bleed('sq', 0.87),
  // Maskable: moneda R ≈ 21 (66 % del lado), dentro del círculo seguro del 80 % (R 25,6).
  'app-icon-maskable.svg': bleed('mk', 0.8),
};

await mkdir(OUT, { recursive: true });
for (const [f, svg] of Object.entries(files)) await writeFile(join(OUT, f), svg);
console.log('design/logo/final/ actualizado:', Object.keys(files).join(', '));
