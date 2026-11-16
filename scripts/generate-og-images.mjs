/**
 * Genera las imágenes Open Graph (1200×630) de cada página con Playwright (plantillas HTML → PNG).
 * Uso: npm run og   (= node scripts/generate-og-images.mjs)   · también lo ejecuta `npm run brand`.
 *
 * Salidas (fuente PNG sin pérdida; Astro las publica como JPEG 1200×630 optimizado vía getImage, ver src/lib/images.ts):
 *   - public/og-default.png                     → home y páginas sin OG propia (nombre fijo por convención)
 *   - src/assets/og/<nombre-descriptivo>-og.png → una por página / caso (importadas en src/data/og.ts y src/data/projects.ts)
 *
 * Línea visual: negro + dorado, logo oficial «Ligadura NT» (design/logo/final/logo-horizontal.svg),
 * Inter Variable del proyecto (incrustada desde @fontsource-variable/inter) y pie con nithios.com.
 * Las capturas salen de src/assets/portfolio/**; la ilustración de Krystal se captura de dist/ (si existe, tras
 * `npm run build`) en design/og/krystal-ilustracion-agenda-y-videollamada.png y se reutiliza si no hay dist/.
 *
 * Página nueva: añade una entrada a `pages` (out + plantilla), ejecuta `npm run og`, importa el PNG en src/data/og.ts
 * con su alt y pasa `ogImage`/`ogImageAlt` a BaseLayout (docs/SEO-GEO.md › Imágenes Open Graph).
 * REGLAS: nada de nombres de cliente en los casos anonimizados, nada de logos de terceros, solo copy confirmado en src/data.
 */
import sharp from 'sharp';
import http from 'node:http';
import { existsSync } from 'node:fs';
import { readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const r = (...p) => path.join(root, ...p);
const OUT_DIR = r('src', 'assets', 'og');
const KRYSTAL_VISUAL = r('design', 'og', 'krystal-ilustracion-agenda-y-videollamada.png');

let chromium;
try {
  ({ chromium } = await import(process.env.PLAYWRIGHT_MODULE ?? 'playwright'));
} catch {
  console.warn('Playwright no disponible: no se generan las OG (define PLAYWRIGHT_MODULE).');
  process.exit(0);
}

// ---------- recursos ----------
const logo = (await readFile(r('design', 'logo', 'final', 'logo-horizontal.svg'), 'utf8')).replace(/<title>.*?<\/title>/, '');
const font = (await readFile(r('node_modules', '@fontsource-variable', 'inter', 'files', 'inter-latin-opsz-normal.woff2'))).toString('base64');
const mime = { '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg' };
/** Data URI reducido (máx. `w` px de ancho) para que la plantilla cargue rápido. */
async function img(file, w = 1600) {
  const buf = await sharp(file).resize({ width: w, withoutEnlargement: true }).webp({ quality: 90 }).toBuffer();
  return `data:${mime['.webp']};base64,${buf.toString('base64')}`;
}
const shot = (slug, name) => r('src', 'assets', 'portfolio', slug, `${slug}-${name}.webp`);

// ---------- captura de la ilustración de Krystal desde dist/ ----------
async function captureKrystal(browser) {
  const dist = r('dist');
  if (!existsSync(path.join(dist, 'portafolio', 'krystal', 'index.html'))) {
    if (!existsSync(KRYSTAL_VISUAL)) throw new Error('Falta la ilustración de Krystal: ejecuta `npm run build` y luego `npm run og`.');
    console.log('dist/ no existe: se reutiliza', path.relative(root, KRYSTAL_VISUAL));
    return;
  }
  const server = http.createServer(async (req, res) => {
    let p = path.join(dist, decodeURIComponent(new URL(req.url, 'http://x').pathname));
    try {
      if ((await stat(p)).isDirectory()) p = path.join(p, 'index.html');
      const ext = path.extname(p);
      const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', ...mime };
      res.writeHead(200, { 'content-type': types[ext] ?? 'application/octet-stream' });
      res.end(await readFile(p));
    } catch {
      res.writeHead(404).end();
    }
  });
  await new Promise((ok) => server.listen(0, '127.0.0.1', ok));
  const { port } = server.address();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 2, reducedMotion: 'reduce' });
  await page.goto(`http://127.0.0.1:${port}/portafolio/krystal/`, { waitUntil: 'networkidle' });
  const el = page.locator('[role="img"][aria-label^="Ilustración conceptual de Krystal"]').first();
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await mkdir(path.dirname(KRYSTAL_VISUAL), { recursive: true });
  await writeFile(KRYSTAL_VISUAL, await sharp(await el.screenshot({ type: 'png' })).png({ compressionLevel: 9 }).toBuffer());
  await page.close();
  server.close();
  console.log('Ilustración de Krystal capturada:', path.relative(root, KRYSTAL_VISUAL));
}

// ---------- plantilla base ----------
const css = `
@font-face{font-family:'InterOG';src:url(data:font/woff2;base64,${font}) format('woff2');font-weight:100 900;font-display:block}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1200px;height:630px;background:#000;overflow:hidden}
body{position:relative;font-family:'InterOG',system-ui,sans-serif;font-optical-sizing:auto;color:#f5f1e8;-webkit-font-smoothing:antialiased}
.halo{position:absolute;inset:0;background:radial-gradient(70% 90% at 82% -10%,rgba(212,175,55,.24),transparent 60%),radial-gradient(50% 60% at 0% 110%,rgba(212,175,55,.10),transparent 70%)}
.grid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px);background-size:60px 60px;mask-image:radial-gradient(80% 80% at 70% 20%,#000,transparent 75%)}
.logo{position:absolute;left:72px;top:64px;height:44px;z-index:3}
.logo svg{height:44px;width:auto;display:block}
.copy{position:absolute;left:72px;top:150px;bottom:120px;width:var(--copy-w,520px);display:flex;flex-direction:column;justify-content:center;z-index:3}
.eyebrow{font-size:19px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:#d9b64a;margin-bottom:20px}
h1{font-size:var(--h1,58px);line-height:1.04;font-weight:650;letter-spacing:-.035em;text-wrap:balance}
h1 em{font-style:normal;background:linear-gradient(100deg,#f3e2a6 0%,#d4af37 45%,#a8842f 75%,#ead27c 100%);-webkit-background-clip:text;background-clip:text;color:transparent}
.sub{margin-top:22px;font-size:25px;line-height:1.35;color:#b9b2a6;letter-spacing:-.01em;text-wrap:pretty}
.foot{position:absolute;left:72px;bottom:56px;font-size:22px;font-weight:550;color:#b3ada3;letter-spacing:-.01em;z-index:3;display:flex;align-items:center;gap:14px}
.foot i{display:block;width:44px;height:1px;background:linear-gradient(90deg,rgba(212,175,55,.9),rgba(212,175,55,0))}
.frame{position:absolute;border-radius:16px;border:1px solid rgba(212,175,55,.38);background:#0d0d0d;overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.7),0 0 90px rgba(212,175,55,.10)}
.frame .bar{height:30px;display:flex;align-items:center;gap:7px;padding:0 14px;background:#141414;border-bottom:1px solid rgba(255,255,255,.07)}
.frame .bar b{width:9px;height:9px;border-radius:50%;background:#3a3a3a}
.frame .bar span{margin-left:12px;font-size:12.5px;color:#9a948a;letter-spacing:.01em}
.frame img{display:block;width:100%;height:calc(100% - 30px);object-fit:cover;object-position:left top}
.glass{background:linear-gradient(180deg,rgba(255,255,255,.06),rgba(255,255,255,.02));border:1px solid rgba(255,255,255,.09);border-radius:18px}
`;
const page = ({ body, extra = '', vars = '', halo = true }) =>
  `<!doctype html><html lang="es-CO"><head><meta charset="utf-8"><style>${css}${extra}</style></head><body style="${vars}">${halo ? '<div class="halo"></div><div class="grid"></div>' : ''}<div class="logo">${logo}</div>${body}</body></html>`;
const copy = ({ eyebrow, title, sub }) =>
  `<div class="copy">${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ''}<h1>${title}</h1>${sub ? `<p class="sub">${sub}</p>` : ''}</div><div class="foot"><i></i>nithios.com</div>`;
const frame = (src, label, style) => `<div class="frame" style="${style}"><div class="bar"><b></b><b></b><b></b><span>${label}</span></div><img src="${src}" alt=""></div>`;

// ---------- plantillas ----------
/** Caso de portafolio: texto a la izquierda, visual enmarcado que sangra por la derecha. */
async function caseTemplate({ name, sub, eyebrow, visual, label, h1 = '62px' }) {
  return page({
    vars: `--copy-w:470px;--h1:${h1}`,
    body: copy({ eyebrow, title: name, sub }) + frame(visual, label, 'left:590px;top:96px;width:720px;height:440px'),
  });
}

const defaultHtml = page({
  extra: `.copy{top:170px;width:1000px;justify-content:flex-start}h1{font-size:70px;max-width:960px}
  .rule{position:absolute;left:72px;right:72px;bottom:118px;height:1px;background:linear-gradient(90deg,rgba(212,175,55,0),rgba(212,175,55,.7),rgba(212,175,55,0))}
  .wa{position:absolute;right:72px;bottom:56px;font-size:22px;font-weight:550;color:#b3ada3}.wa b{color:#e0c05a;font-weight:600}`,
  body:
    copy({ title: 'Consultoría tecnológica y <em>desarrollo de software a medida</em> en Colombia' }) +
    '<div class="rule"></div><div class="wa">Hablemos por WhatsApp · <b>+57 305 302 7559</b></div>',
});

const S = {
  dragon: (n) => shot('dragon-global-trade', n),
  log: (n) => shot('plataforma-logistica-acero', n),
  tra: (n) => shot('plataforma-transporte-audiovisual', n),
};

async function buildPages() {
  const dragonTablero = await img(S.dragon('tablero-comercio-internacional'));
  const logPanel = await img(S.log('panel-de-control'));
  const logCargue = await img(S.log('optimizacion-de-cargue'));
  const traTorre = await img(S.tra('torre-de-control'));
  const krystal = await img(KRYSTAL_VISUAL);
  const photo = await img(r('src', 'assets', 'ceo', 'jonathan-osorio-ceo-nithios.jpg'), 900);
  const proto = 'Prototipo navegable · datos ficticios';

  const steps = (items) =>
    items.map((t, i) => `<li><span>${String(i + 1).padStart(2, '0')}</span>${t}</li>`).join('');

  return [
    { out: r('public', 'og-default.png'), html: defaultHtml },
    {
      out: 'nithios-servicios-consultoria-y-desarrollo-de-software-og.png',
      html: page({
        vars: '--copy-w:520px',
        extra: `.cards{position:absolute;left:640px;top:118px;width:488px;display:flex;flex-direction:column;gap:22px}
        .card{padding:30px 32px}.card small{display:block;font-size:15px;font-weight:600;letter-spacing:.14em;color:#d9b64a}
        .card strong{display:block;margin-top:12px;font-size:30px;font-weight:620;letter-spacing:-.02em}
        .card p{margin-top:8px;font-size:19.5px;line-height:1.35;color:#b0a99d}
        .card.gold{border-color:rgba(212,175,55,.45);background:linear-gradient(180deg,rgba(212,175,55,.13),rgba(212,175,55,.03))}`,
        body:
          copy({ eyebrow: 'Servicios', title: 'Tecnología que <em>mejora tus procesos</em>', sub: 'Dos líneas de servicio, un solo equipo de principio a fin.' }) +
          `<div class="cards"><div class="card glass gold"><small>01 · CONSULTORÍA</small><strong>Consultoría tecnológica</strong><p>Decide mejor qué tecnología adoptar y cómo hacerla rendir.</p></div>
           <div class="card glass"><small>02 · DESARROLLO</small><strong>Software a medida</strong><p>Software hecho para tu operación, no al revés.</p></div></div>`,
      }),
    },
    {
      out: 'nithios-consultoria-tecnologica-colombia-og.png',
      html: page({
        vars: '--copy-w:540px;--h1:56px',
        extra: `.plan{position:absolute;left:668px;top:112px;width:460px;padding:30px 34px}
        .plan small{font-size:15px;font-weight:600;letter-spacing:.14em;color:#d9b64a}
        .plan ol{list-style:none;margin-top:18px;display:flex;flex-direction:column}
        .plan li{display:flex;align-items:center;gap:18px;padding:17px 0;font-size:23px;font-weight:550;letter-spacing:-.015em;border-top:1px solid rgba(255,255,255,.08)}
        .plan li:first-child{border-top:0}
        .plan li span{flex:none;width:44px;height:44px;border-radius:50%;display:grid;place-items:center;font-size:16px;font-weight:650;color:#0a0a0a;background:linear-gradient(135deg,#f3e2a6,#c9a24b)}
        .plan li:not(:first-child) span{background:transparent;color:#e0c05a;border:1px solid rgba(212,175,55,.5)}`,
        body:
          copy({ eyebrow: 'Consultoría tecnológica', title: 'Decide mejor qué tecnología adoptar y <em>cómo hacerla rendir</em>', sub: 'Para empresas de toda Colombia.' }) +
          `<div class="plan glass"><small>CÓMO TRABAJAMOS</small><ol>${steps(['Conversación inicial', 'Diagnóstico', 'Plan y recomendaciones', 'Implementación acompañada'])}</ol></div>`,
      }),
    },
    {
      out: 'nithios-desarrollo-de-software-a-medida-colombia-og.png',
      html: page({
        vars: '--copy-w:500px;--h1:58px',
        body:
          copy({ eyebrow: 'Desarrollo de software a medida', title: 'Software hecho para tu operación, <em>no al revés</em>', sub: 'Plataformas web, apps móviles, sistemas de gestión e IA.' }) +
          frame(dragonTablero, proto, 'left:640px;top:84px;width:660px;height:400px;opacity:.9') +
          frame(logCargue, proto, 'left:600px;top:300px;width:560px;height:340px'),
      }),
    },
    {
      out: 'nithios-portafolio-software-a-medida-og.png',
      html: page({
        vars: '--copy-w:480px;--h1:58px',
        extra: `.mosaic{position:absolute;left:600px;top:70px;display:grid;grid-template-columns:330px 330px;gap:18px}
        .mosaic .frame{position:relative}`,
        body:
          copy({ eyebrow: 'Portafolio', title: 'Software que <em>diseñamos y desarrollamos</em>', sub: 'Comercio internacional, logística, transporte y consultorios psicológicos.' }) +
          `<div class="mosaic">${[
            [dragonTablero, 'Dragon Global Trade'],
            [logPanel, 'Logística para acero'],
            [traTorre, 'Transporte audiovisual'],
            [krystal, 'Krystal · ilustración'],
          ]
            .map(([s, l]) => frame(s, l, 'width:330px;height:236px'))
            .join('')}</div>`,
      }),
    },
    {
      out: 'jonathan-osorio-ceo-fundador-nithios-og.png',
      html: page({
        vars: '--copy-w:560px;--h1:76px',
        extra: `.photo{position:absolute;right:0;top:0;width:620px;height:630px;background:url(${photo}) center 22%/cover no-repeat;
          mask-image:linear-gradient(90deg,transparent 0%,#000 38%);-webkit-mask-image:linear-gradient(90deg,transparent 0%,#000 38%)}
        .photo::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,transparent 70%,rgba(0,0,0,.6))}
        .role{display:inline-flex;margin-top:26px;align-items:center;gap:12px;font-size:23px;font-weight:600;color:#e0c05a;padding:12px 20px;border:1px solid rgba(212,175,55,.4);border-radius:999px;background:rgba(212,175,55,.08);align-self:flex-start}`,
        body:
          `<div class="photo"></div>` +
          `<div class="copy"><h1>Jonathan <em>Osorio</em></h1><p class="role">CEO y Fundador · Nithios</p><p class="sub">Liderazgo tecnológico con visión de negocio.</p></div><div class="foot"><i></i>nithios.com</div>`,
      }),
    },
    {
      out: 'nithios-contacto-whatsapp-og.png',
      html: page({
        vars: '--copy-w:520px;--h1:64px',
        extra: `.chat{position:absolute;left:660px;top:118px;width:468px;padding:26px 28px 30px}
        .chat header{display:flex;align-items:center;gap:14px;padding-bottom:18px;border-bottom:1px solid rgba(255,255,255,.08)}
        .chat header span{width:46px;height:46px;border-radius:50%;background:#0a0a0a;border:1px solid rgba(212,175,55,.5);display:grid;place-items:center}
        .chat header span svg{width:30px;height:auto}
        .chat header strong{font-size:21px;font-weight:620}.chat header em{display:block;font-style:normal;font-size:16px;color:#9a948a;margin-top:2px}
        .msg{margin:24px 0 0 auto;max-width:360px;padding:16px 20px;border-radius:18px 18px 4px 18px;font-size:20px;line-height:1.38;color:#0d0d0d;background:linear-gradient(135deg,#f3e2a6,#d4af37)}
        .num{margin-top:26px;font-size:34px;font-weight:650;letter-spacing:-.02em;color:#f5f1e8;text-align:center}
        .num small{display:block;font-size:15px;font-weight:600;letter-spacing:.14em;color:#d9b64a;margin-bottom:6px}`,
        body:
          copy({ eyebrow: 'Contacto', title: 'Hablemos por <em>WhatsApp</em>', sub: 'Cuéntanos tu proyecto. Atención remota en toda Colombia.' }) +
          `<div class="chat glass"><header><span>${logo.replace(/viewBox="[^"]+"/, 'viewBox="4 6 56 52"')}</span><div><strong>Nithios</strong><em>WhatsApp</em></div></header>
          <p class="msg">Hola Nithios, quiero contarles sobre un proyecto de tecnología para mi empresa.</p>
          <p class="num"><small>ÚNICO CANAL DE CONTACTO</small>+57 305 302 7559</p></div>`,
      }),
    },
    {
      out: 'nithios-preguntas-frecuentes-og.png',
      html: page({
        vars: '--copy-w:500px;--h1:58px',
        extra: `.faq{position:absolute;left:630px;top:112px;width:500px;display:flex;flex-direction:column;gap:16px}
        .q{display:flex;align-items:center;justify-content:space-between;gap:18px;padding:22px 24px;font-size:21.5px;font-weight:560;line-height:1.3;letter-spacing:-.015em}
        .q span{flex:none;width:34px;height:34px;border-radius:50%;border:1px solid rgba(212,175,55,.5);color:#e0c05a;display:grid;place-items:center;font-size:22px;font-weight:400}
        .q.open{border-color:rgba(212,175,55,.45);background:linear-gradient(180deg,rgba(212,175,55,.12),rgba(212,175,55,.03))}`,
        body:
          copy({ eyebrow: 'Preguntas frecuentes', title: 'Respuestas claras <em>antes de empezar</em>', sub: 'Sobre consultoría tecnológica y desarrollo de software a medida.' }) +
          `<div class="faq">${[
            '¿Qué hace Nithios?',
            '¿En qué ciudades de Colombia trabajan?',
            '¿Pueden ayudarnos a usar inteligencia artificial en la empresa?',
            '¿Cómo empiezo la transformación digital de mi empresa?',
          ]
            .map((q, i) => `<div class="q glass${i === 0 ? ' open' : ''}">${q}<span>${i === 0 ? '−' : '+'}</span></div>`)
            .join('')}</div>`,
      }),
    },
    {
      out: 'dragon-global-trade-plataforma-comercio-internacional-og.png',
      html: await caseTemplate({
        eyebrow: 'Caso de portafolio · Prototipo',
        name: 'Dragon Global <em>Trade</em>',
        sub: 'Plataforma de gestión de comercio internacional: comercial, compras, logística y proyectos.',
        visual: dragonTablero,
        label: proto,
      }),
    },
    {
      out: 'plataforma-logistica-acero-pedidos-rutas-y-despachos-og.png',
      html: await caseTemplate({
        eyebrow: 'Caso de portafolio · Prototipo',
        name: 'Plataforma logística <em>para acero</em>',
        sub: 'Pedidos, rutas, cargue y despachos: de la bodega a la obra.',
        visual: logPanel,
        label: proto,
        h1: '54px',
      }),
    },
    {
      out: 'plataforma-transporte-audiovisual-operacion-de-rodajes-og.png',
      html: await caseTemplate({
        eyebrow: 'Caso de portafolio · Prototipo',
        name: 'Plataforma de transporte <em>audiovisual</em>',
        sub: 'Transporte especial para producciones: cada servicio de rodaje, del pedido al pago.',
        visual: traTorre,
        label: proto,
        h1: '50px',
      }),
    },
    {
      out: 'krystal-software-consultorios-psicologicos-og.png',
      html: await caseTemplate({
        eyebrow: 'Caso de portafolio',
        name: 'Krystal',
        sub: 'Software para consultorios psicológicos: agenda, videollamadas e historia clínica.',
        visual: krystal,
        label: 'Ilustración conceptual',
        h1: '76px',
      }),
    },
  ];
}

// ---------- render ----------
const browser = await chromium.launch();
try {
  await captureKrystal(browser);
  await mkdir(OUT_DIR, { recursive: true });
  const tab = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  for (const { out, html } of await buildPages()) {
    await tab.setContent(html, { waitUntil: 'load' });
    await tab.evaluate(() => document.fonts.ready);
    const png = await sharp(await tab.screenshot({ type: 'png' })).png({ compressionLevel: 9 }).toBuffer();
    const file = path.isAbsolute(out) ? out : path.join(OUT_DIR, out);
    await writeFile(file, png);
    console.log(`OG ${path.relative(root, file)} (${Math.round(png.length / 1024)} KB fuente)`);
  }
} finally {
  await browser.close();
}
