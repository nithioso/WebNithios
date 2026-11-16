/**
 * Genera los recursos de marca estáticos en /public a partir de design/logo/final/*.svg
 * (logo oficial G · «Ligadura NT»; los SVG de final/ son la fuente de verdad, copiados de design/logo/v2/nt-ligadura/):
 *   favicon.svg, favicon.ico (16/32/48), apple-touch-icon.png (180), icon-192.png, icon-512.png,
 *   icon-maskable-512.png y og-default.png (1200×630, renderizado con Playwright + Inter Display).
 *   - app-icon.svg          → contenedor redondeado, canal óptico 2,8u (favicon, ícono "any")
 *   - app-icon-square.svg   → a sangre, mismo arte (apple-touch: iOS redondea las esquinas)
 *   - app-icon-maskable.svg → a sangre, símbolo al 66 % dentro del círculo seguro del 80 % (maskable)
 *   - logo-horizontal.svg   → OG
 * Uso: npm run brand   (= node scripts/generate-brand-assets.mjs)
 * Playwright: usa el paquete `playwright` si está instalado o la ruta en PLAYWRIGHT_MODULE.
 * Si no hay Playwright, genera los íconos y omite el OG (con aviso).
 */
import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pub = (...p) => path.join(root, 'public', ...p);
const fin = (f) => readFile(path.join(root, 'design', 'logo', 'final', f), 'utf8');

const appIcon = await fin('app-icon.svg'); // contenedor redondeado (favicon, íconos "any")
const square = await fin('app-icon-square.svg'); // a sangre (apple-touch)
const maskable = await fin('app-icon-maskable.svg'); // a sangre con zona segura (maskable)
const horizontal = await fin('logo-horizontal.svg');

const png = (svg, size) =>
  sharp(Buffer.from(svg), { density: Math.max(72, (size / 64) * 72 * 2) })
    .resize(size, size)
    .png({ compressionLevel: 9 })
    .toBuffer();

/** Empaqueta PNGs en un .ico (formato PNG-in-ICO). */
function pngsToIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  const dir = Buffer.alloc(16 * images.length);
  let offset = 6 + dir.length;
  images.forEach(({ size, buf }, i) => {
    const o = i * 16;
    dir.writeUInt8(size >= 256 ? 0 : size, o);
    dir.writeUInt8(size >= 256 ? 0 : size, o + 1);
    dir.writeUInt16LE(1, o + 4);
    dir.writeUInt16LE(32, o + 6);
    dir.writeUInt32LE(buf.length, o + 8);
    dir.writeUInt32LE(offset, o + 12);
    offset += buf.length;
  });
  return Buffer.concat([header, dir, ...images.map((i) => i.buf)]);
}

await writeFile(pub('favicon.svg'), appIcon.replace(/<title>.*?<\/title>/, ''));
await writeFile(pub('apple-touch-icon.png'), await png(square, 180));
await writeFile(pub('icon-192.png'), await png(appIcon, 192));
await writeFile(pub('icon-512.png'), await png(appIcon, 512));
await writeFile(pub('icon-maskable-512.png'), await png(maskable, 512));
await writeFile(
  pub('favicon.ico'),
  pngsToIco(await Promise.all([16, 32, 48].map(async (size) => ({ size, buf: await png(appIcon, size) })))),
);
console.log('Íconos generados en /public');

// ---------- OG 1200×630 ----------
const ogHtml = `<!doctype html><html lang="es-CO"><head><meta charset="utf-8"><style>
*{margin:0;box-sizing:border-box}
html,body{width:1200px;height:630px;background:#000;overflow:hidden}
body{position:relative;font-family:'Inter Display','Inter',system-ui,sans-serif;color:#f5f1e8;padding:84px 96px}
.halo{position:absolute;inset:0;background:radial-gradient(70% 90% at 82% -10%,rgba(212,175,55,.26),transparent 60%),radial-gradient(50% 60% at 0% 110%,rgba(212,175,55,.10),transparent 70%)}
.grid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px);background-size:60px 60px;mask-image:radial-gradient(80% 80% at 70% 20%,#000,transparent 75%)}
.logo{position:relative;height:56px}
.logo svg{height:56px;width:auto;display:block}
h1{position:relative;margin-top:92px;font-size:70px;line-height:1.04;font-weight:600;letter-spacing:-.035em;max-width:960px}
h1 em{font-style:normal;background:linear-gradient(100deg,#f3e2a6 0%,#d4af37 45%,#a8842f 75%,#ead27c 100%);-webkit-background-clip:text;background-clip:text;color:transparent}
.rule{position:absolute;left:96px;right:96px;bottom:118px;height:1px;background:linear-gradient(90deg,rgba(212,175,55,0),rgba(212,175,55,.7),rgba(212,175,55,0))}
.foot{position:absolute;left:96px;right:96px;bottom:64px;display:flex;justify-content:space-between;font-family:'Inter',sans-serif;font-size:24px;font-weight:500;color:#b3ada3;letter-spacing:-.01em}
.foot b{color:#e0c05a;font-weight:600}
</style></head><body><div class="halo"></div><div class="grid"></div>
<div class="logo">${horizontal}</div>
<h1>Consultoría tecnológica y <em>desarrollo de software a medida</em> en Colombia</h1>
<div class="rule"></div>
<div class="foot"><span>nithios.com</span><span>Hablemos por WhatsApp · <b>+57 305 302 7559</b></span></div>
</body></html>`;

let chromium;
try {
  ({ chromium } = await import(process.env.PLAYWRIGHT_MODULE ?? 'playwright'));
} catch {
  console.warn('Playwright no disponible: se omite og-default.png (define PLAYWRIGHT_MODULE).');
}
if (chromium) {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  await page.setContent(ogHtml, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  const shot = await page.screenshot({ type: 'png' });
  await browser.close();
  await writeFile(pub('og-default.png'), await sharp(shot).png({ compressionLevel: 9, palette: false }).toBuffer());
  console.log('OG generado: public/og-default.png');
}
