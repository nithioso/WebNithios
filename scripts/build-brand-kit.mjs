// Genera el KIT GRÁFICO de Nithios (logo oficial K · «NTOS en sello») en design/brand-kit/.
// Fuente única: design/logo/v3/ntos-sello/*.svg (solo paths). Uso: npm run kit
// Salida: vectores (SVG + PDF), PNG transparentes y con fondo, favicon/app, redes e impresión.
import { chromium } from 'playwright';
import { mkdir, readFile, writeFile, rm, copyFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const SRC = join(root, 'design/logo/v3/ntos-sello');
const OUT = join(root, 'design/brand-kit');
const BLACK = '#000000';
const IVORY = '#f5f1e8';
const INK = '#0a0a0a';

const read = (f) => readFile(join(SRC, f), 'utf8');
/** Versión a una tinta: sustituye todo relleno/trazo (incluidos degradados) por un color plano. */
const flat = (svg, color) =>
  svg
    .replace(/<defs>[\s\S]*?<\/defs>/g, '')
    .replace(/\b(fill|stroke)="(?!none)[^"]*"/g, `$1="${color}"`)
    .replace(/\b(fill|stroke):\s*(?!none)[^;"]+/g, `$1:${color}`)
    .replace(/currentColor/g, color);
const box = (svg) => svg.match(/viewBox="([^"]+)"/)[1].split(/\s+/).map(Number);
const dataUri = (svg) => 'data:image/svg+xml;base64,' + Buffer.from(svg).toString('base64');

// ---- Fuentes ---------------------------------------------------------------
const src = {
  simbolo: { negativo: await read('symbol-neg.svg'), positivo: await read('symbol-pos.svg') },
  horizontal: { negativo: await read('horizontal-neg.svg'), positivo: await read('horizontal-pos.svg') },
  vertical: { negativo: await read('vertical-neg.svg'), positivo: await read('vertical-pos.svg') },
};
for (const k of Object.keys(src)) {
  src[k]['mono-negro'] = flat(src[k].positivo, INK);
  src[k]['mono-blanco'] = flat(src[k].positivo, '#ffffff');
}
const appIcon = await read('app-icon.svg');
const bgOf = (variant) => (variant === 'negativo' || variant === 'mono-blanco' ? BLACK : IVORY);

// Limpia solo las carpetas generadas: LEEME.md se mantiene (se edita a mano).
for (const d of ['01-vectores', '02-png-transparente', '03-png-con-fondo', '04-favicon-app', '05-redes-sociales', '06-impresion-alta'])
  await rm(join(OUT, d), { recursive: true, force: true });
const dir = async (d) => (await mkdir(join(OUT, d), { recursive: true }), join(OUT, d));

const browser = await chromium.launch();
const page = await browser.newPage();

/** Renderiza un SVG centrado en un lienzo w×h. bg=null → transparente. scale = fracción del lienzo que ocupa. */
async function png(svg, file, { w, h, bg = null, scale = 1, radius = 0 }) {
  const [, , vw, vh] = box(svg);
  const fit = Math.min((w * scale) / vw, (h * scale) / vh);
  await page.setViewportSize({ width: w, height: h });
  await page.setContent(
    `<body style="margin:0;width:${w}px;height:${h}px;display:flex;align-items:center;justify-content:center;background:${bg ?? 'transparent'};border-radius:${radius}px;overflow:hidden">
     <img style="width:${vw * fit}px;height:${vh * fit}px" src="${dataUri(svg)}"></body>`,
  );
  await page.screenshot({ path: file, omitBackground: !bg });
}
/** PDF vectorial del tamaño exacto del arte (para imprenta). */
async function pdf(svg, file) {
  const [, , vw, vh] = box(svg);
  const k = 8; // 1 unidad = 8 px CSS → PDF de tamaño cómodo; es vectorial, escala sin pérdida
  await page.setContent(`<body style="margin:0"><img style="display:block;width:${vw * k}px;height:${vh * k}px" src="${dataUri(svg)}"></body>`);
  await page.pdf({ path: file, width: `${vw * k}px`, height: `${vh * k}px`, printBackground: false, pageRanges: '1' });
}

// ---- 01 Vectores (SVG + PDF) ----------------------------------------------
const vec = await dir('01-vectores');
for (const [shape, variants] of Object.entries(src))
  for (const [variant, svg] of Object.entries(variants)) {
    await writeFile(join(vec, `nithios-${shape}-${variant}.svg`), svg);
    await pdf(svg, join(vec, `nithios-${shape}-${variant}.pdf`));
  }

// ---- 02 PNG transparentes --------------------------------------------------
const trans = await dir('02-png-transparente');
const widths = { simbolo: [256, 512, 1024, 2048], horizontal: [800, 1600, 3200], vertical: [600, 1200, 2400] };
for (const [shape, variants] of Object.entries(src))
  for (const [variant, svg] of Object.entries(variants)) {
    const [, , vw, vh] = box(svg);
    for (const w of widths[shape]) await png(svg, join(trans, `nithios-${shape}-${variant}-${w}px.png`), { w, h: Math.round((w * vh) / vw) });
  }

// ---- 03 PNG con fondo (con área de respeto) --------------------------------
const solid = await dir('03-png-con-fondo');
const canvases = { simbolo: [2048, 2048, 0.5], horizontal: [3000, 1500, 0.62], vertical: [2000, 2500, 0.56] };
for (const [shape, variants] of Object.entries(src))
  for (const [variant, svg] of Object.entries(variants)) {
    const [w, h, scale] = canvases[shape];
    await png(svg, join(solid, `nithios-${shape}-${variant}-fondo.png`), { w, h, bg: bgOf(variant), scale });
  }

// ---- 04 Favicon y app ------------------------------------------------------
const fav = await dir('04-favicon-app');
await writeFile(join(fav, 'favicon.svg'), appIcon);
const icoPngs = [];
for (const s of [16, 32, 48, 64, 96, 180, 192, 256, 512, 1024]) {
  const file = join(fav, s === 180 ? 'apple-touch-icon-180.png' : `icono-${s}.png`);
  await png(appIcon, file, { w: s, h: s });
  if (s <= 48) icoPngs.push({ s, buf: await readFile(file) });
}
// Maskable (Android): moneda al ~66 % sobre fondo a sangre, dentro del círculo seguro del 80 %.
await png(src.simbolo.negativo, join(fav, 'icono-maskable-512.png'), { w: 512, h: 512, bg: INK, scale: 0.68 });
// favicon.ico multirresolución (PNG embebidos 16/32/48).
{
  const head = Buffer.alloc(6 + 16 * icoPngs.length);
  head.writeUInt16LE(0, 0); head.writeUInt16LE(1, 2); head.writeUInt16LE(icoPngs.length, 4);
  let offset = head.length;
  icoPngs.forEach(({ s, buf }, i) => {
    const e = 6 + 16 * i;
    head.writeUInt8(s, e); head.writeUInt8(s, e + 1); head.writeUInt8(0, e + 2); head.writeUInt8(0, e + 3);
    head.writeUInt16LE(1, e + 4); head.writeUInt16LE(32, e + 6); head.writeUInt32LE(buf.length, e + 8); head.writeUInt32LE(offset, e + 12);
    offset += buf.length;
  });
  await writeFile(join(fav, 'favicon.ico'), Buffer.concat([head, ...icoPngs.map((p) => p.buf)]));
}

// ---- 05 Redes sociales -----------------------------------------------------
const social = await dir('05-redes-sociales');
await png(src.simbolo.negativo, join(social, 'perfil-1080-oscuro.png'), { w: 1080, h: 1080, bg: BLACK, scale: 0.52 });
await png(src.simbolo.positivo, join(social, 'perfil-1080-claro.png'), { w: 1080, h: 1080, bg: IVORY, scale: 0.52 });
await png(src.vertical.negativo, join(social, 'post-1080x1350-oscuro.png'), { w: 1080, h: 1350, bg: BLACK, scale: 0.5 });
await png(src.horizontal.negativo, join(social, 'compartir-1200x630-oscuro.png'), { w: 1200, h: 630, bg: BLACK, scale: 0.6 });
await png(src.horizontal.negativo, join(social, 'linkedin-portada-1584x396-oscuro.png'), { w: 1584, h: 396, bg: BLACK, scale: 0.42 });
await png(src.horizontal.negativo, join(social, 'x-portada-1500x500-oscuro.png'), { w: 1500, h: 500, bg: BLACK, scale: 0.42 });
await png(src.vertical.negativo, join(social, 'historia-1080x1920-oscuro.png'), { w: 1080, h: 1920, bg: BLACK, scale: 0.5 });

// ---- 06 Impresión (alta resolución) ----------------------------------------
// Los PDF/SVG de 01-vectores son el formato preferido de imprenta. Estos PNG cubren usos sin vector:
// 6000 px ≈ 50 cm a 300 ppp.
const print = await dir('06-impresion-alta');
for (const [shape, w] of [['horizontal', 6000], ['vertical', 4500], ['simbolo', 4096]])
  for (const variant of ['positivo', 'negativo', 'mono-negro', 'mono-blanco']) {
    const svg = src[shape][variant];
    const [, , vw, vh] = box(svg);
    await png(svg, join(print, `nithios-${shape}-${variant}-${w}px.png`), { w, h: Math.round((w * vh) / vw) });
    await copyFile(join(vec, `nithios-${shape}-${variant}.pdf`), join(print, `nithios-${shape}-${variant}.pdf`));
  }

await browser.close();
console.log('Kit gráfico generado en design/brand-kit/');
