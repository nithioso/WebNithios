/**
 * Genera los recursos de marca estáticos en /public a partir de design/logo/final/*.svg
 * (logo oficial G · «Ligadura NT»; los SVG de final/ son la fuente de verdad, copiados de design/logo/v2/nt-ligadura/):
 *   favicon.svg, favicon.ico (16/32/48), apple-touch-icon.png (180), icon-192.png, icon-512.png,
 *   icon-maskable-512.png. Las OG 1200×630 salen de scripts/generate-og-images.mjs (`npm run brand` lo ejecuta después).
 *   - app-icon.svg          → contenedor redondeado, canal óptico 2,8u (favicon, ícono "any")
 *   - app-icon-square.svg   → a sangre, mismo arte (apple-touch: iOS redondea las esquinas)
 *   - app-icon-maskable.svg → a sangre, símbolo al 66 % dentro del círculo seguro del 80 % (maskable)
 * Uso: npm run brand   (= node scripts/generate-brand-assets.mjs)
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
// La OG (public/og-default.png y las de cada página) la genera scripts/generate-og-images.mjs (`npm run og`; `npm run brand` lo encadena).
