/**
 * Genera las imágenes Open Graph (1200×630) de cada página con Playwright (plantillas HTML → PNG).
 * Uso: npm run og   (= node scripts/generate-og-images.mjs)   · también lo ejecuta `npm run brand`.
 *
 * Salidas (fuente PNG sin pérdida; Astro las publica como JPEG 1200×630 optimizado vía getImage, ver src/lib/images.ts):
 *   - public/og-default.png                     → home y páginas sin OG propia (nombre fijo por convención)
 *   - src/assets/og/<nombre-descriptivo>-og.png → una por página / caso (importadas en src/data/og.ts y src/data/projects.ts)
 *
 * Línea visual (v2): negro + dorado, logo oficial K «NTOS en sello» (design/logo/final/logo-horizontal.svg), Inter Variable
 * incrustada, titular ≥ 64 px, propuesta de valor corta, BOTÓN DORADO con la llamada a la acción y nithios.com.
 * Zona segura 1080×560 (los chats y redes recortan los bordes); ningún texto < 26 px. Ver docs/SEO-GEO.md › Imágenes.
 * Las capturas salen de src/assets/portfolio/**; la ilustración de Krystal se captura de dist/ (si existe, tras
 * `npm run build`) en design/og/krystal-ilustracion-agenda-y-videollamada.png y se reutiliza si no hay dist/.
 *
 * Página nueva: añade una entrada a `pages` (out + plantilla), ejecuta `npm run og`, importa el PNG en src/data/og.ts
 * con su alt y pasa `ogImage`/`ogImageAlt` a BaseLayout (docs/SEO-GEO.md › Imágenes Open Graph).
 *
 * AUTOMÁTICAS (sin trabajo manual): una OG por cada servicio específico (src/data/servicios/*.ts, cargados con Vite SSR para
 * respetar import.meta.glob y el alias @/) → nithios-<slug>-colombia-og.png, y una por cada guía (frontmatter + «## » de
 * src/content/guias/*.md) → <slug>-guia-nithios-og.png. src/data/og.ts las recoge solas (misma convención de nombres).
 * Filtro: `npm run og -- --only=guia,cto` genera solo las salidas cuyo nombre contenga alguno de esos textos
 * (útil para redactores: `npm run og -- --only=auto` = solo servicios específicos y guías).
 * REGLAS: nada de nombres de cliente en los casos anonimizados, nada de logos de terceros, solo copy confirmado en src/data.
 */
import sharp from 'sharp';
import http from 'node:http';
import { existsSync } from 'node:fs';
import { readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { readdir } from 'node:fs/promises';
import { parse as parseYaml } from 'yaml';

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
const esc = (t = '') => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
/** Título escapado con un fragmento literal en dorado (<em>). */
const hl = (text, part) => {
  if (!part || !text.includes(part)) return esc(text);
  const i = text.indexOf(part);
  return esc(text.slice(0, i)) + '<em>' + esc(part) + '</em>' + esc(text.slice(i + part.length));
};
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

// ---------- plantilla base (v2: titular + propuesta de valor + botón de llamada a la acción) ----------
/*
 * Retícula 1200×630 con ZONA SEGURA 1080×560 (x 60–1140, y 35–595): WhatsApp, LinkedIn y X recortan los bordes.
 * Columna de texto x 72–700: logo K (arriba), eyebrow 26 px, titular 64–80 px (máx. 3 líneas, se ajusta solo),
 * propuesta de valor 30 px (máx. 2 líneas) y botón dorado con la llamada a la acción (34 px, abajo).
 * Visual a la derecha (captura, foto o panel con textos ≥ 26 px). nithios.com arriba a la derecha (alineado con el logo). Nada < 26 px.
 * El script fitCopy() reduce el titular hasta 64 px y recorta la propuesta si no cabe; avisa si aun así se desborda.
 */
const css = `
@font-face{font-family:'InterOG';src:url(data:font/woff2;base64,${font}) format('woff2');font-weight:100 900;font-display:block}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1200px;height:630px;background:#000;overflow:hidden}
body{position:relative;font-family:'InterOG',system-ui,sans-serif;font-optical-sizing:auto;color:#f7f3ea;-webkit-font-smoothing:antialiased}
.halo{position:absolute;inset:0;background:radial-gradient(60% 85% at 88% -5%,rgba(212,175,55,.28),transparent 62%),radial-gradient(45% 55% at -5% 105%,rgba(212,175,55,.14),transparent 70%)}
.grid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px);background-size:60px 60px;mask-image:radial-gradient(80% 80% at 75% 20%,#000,transparent 75%)}
.logo{position:absolute;left:72px;top:56px;height:52px;z-index:4}
.logo svg{height:52px;width:auto;display:block}
.copy{position:absolute;left:72px;top:134px;height:330px;width:var(--copy-w,620px);display:flex;flex-direction:column;justify-content:flex-start;z-index:4}
.copy>*{flex:none}
.eyebrow{font-size:26px;font-weight:650;letter-spacing:.1em;text-transform:uppercase;color:#e2c15c;margin-bottom:18px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
h1{font-size:var(--h1,76px);line-height:1.02;font-weight:700;letter-spacing:-.04em;text-wrap:balance}
h1 em{font-style:normal;background:linear-gradient(100deg,#f6e7b0 0%,#d9b443 45%,#b48c32 75%,#efd685 100%);-webkit-background-clip:text;background-clip:text;color:transparent}
.sub{margin-top:18px;font-size:30px;line-height:1.28;font-weight:500;color:#d2cbbf;letter-spacing:-.015em;text-wrap:pretty;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.cta{position:absolute;left:72px;top:486px;z-index:5;display:inline-flex;align-items:center;gap:16px;height:82px;padding:0 40px 0 36px;border-radius:999px;
  background:linear-gradient(135deg,#f6e3a0 0%,#dcb648 48%,#b98f2e 100%);color:#0a0a0a;font-size:34px;font-weight:750;letter-spacing:-.02em;white-space:nowrap;
  box-shadow:0 18px 50px rgba(212,175,55,.32),inset 0 1px 0 rgba(255,255,255,.55)}
.cta svg{width:34px;height:34px;flex:none}
.url{position:absolute;right:72px;top:62px;z-index:5;font-size:28px;font-weight:600;color:#cfc8bc;letter-spacing:-.01em;display:flex;align-items:center;gap:14px}
.url i{display:block;width:40px;height:2px;background:linear-gradient(90deg,rgba(212,175,55,0),rgba(212,175,55,.9))}
.visual{position:absolute;z-index:2}
.fade{position:absolute;inset:0;z-index:3;pointer-events:none;background:linear-gradient(90deg,#000 0%,rgba(0,0,0,.92) 52%,rgba(0,0,0,.25) 72%,rgba(0,0,0,0) 85%),linear-gradient(0deg,rgba(0,0,0,.85) 0%,rgba(0,0,0,0) 30%)}
.frame{position:absolute;border-radius:18px;border:1.5px solid rgba(212,175,55,.45);background:#0d0d0d;overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.7),0 0 90px rgba(212,175,55,.12)}
.frame .bar{height:34px;display:flex;align-items:center;gap:8px;padding:0 16px;background:#141414;border-bottom:1px solid rgba(255,255,255,.07)}
.frame .bar b{width:11px;height:11px;border-radius:50%;background:#3a3a3a}
.frame img{display:block;width:100%;height:calc(100% - 34px);object-fit:cover;object-position:left top}
.glass{background:linear-gradient(180deg,rgba(255,255,255,.075),rgba(255,255,255,.025));border:1.5px solid rgba(255,255,255,.11);border-radius:22px}
.panel{position:absolute;left:744px;top:132px;width:396px;max-height:440px;overflow:hidden;padding:24px 28px;z-index:4}
.panel small{display:block;font-size:26px;font-weight:650;letter-spacing:.08em;color:#e2c15c}
.panel ul{list-style:none;margin-top:8px;display:flex;flex-direction:column}
.panel li{display:flex;align-items:flex-start;gap:16px;padding:13px 0;font-size:27px;font-weight:600;line-height:1.18;letter-spacing:-.02em;border-top:1px solid rgba(255,255,255,.1)}
.panel li:first-child{border-top:0}
.panel li span{flex:none;margin-top:1px;width:32px;height:32px;border-radius:50%;display:grid;place-items:center;color:#0a0a0a;background:linear-gradient(135deg,#f3e2a6,#c9a24b)}
.panel li span svg{width:18px;height:18px}
.panel li b{font-weight:600;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
`;
const arrow =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>';
const waIcon =
  '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.2a9.8 9.8 0 0 0-8.4 14.9L2.2 21.8l4.8-1.3A9.8 9.8 0 1 0 12 2.2Zm0 17.8a8 8 0 0 1-4.1-1.1l-.3-.2-2.8.8.8-2.7-.2-.3A8 8 0 1 1 12 20Zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8 1c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11.2 11.2 0 0 0 4.3 3.8c1.6.7 2.2.8 3 .6a2.6 2.6 0 0 0 1.7-1.2 2.1 2.1 0 0 0 .1-1.2c0-.1-.2-.2-.5-.3Z"/></svg>';
const check = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12.5 4.5 4.5L19 7"/></svg>';

/** Ajusta el titular (80 → 64 px) y recorta la propuesta de valor si no caben en la caja de texto. */
const fitScript = `<script>
(async()=>{await document.fonts.ready;const c=document.querySelector('.copy');if(!c)return;const h=c.querySelector('h1'),s=c.querySelector('.sub');
let fs=parseFloat(getComputedStyle(h).fontSize);const over=()=>c.scrollHeight>c.clientHeight+1;
const lines=()=>Math.round(h.getBoundingClientRect().height/(parseFloat(getComputedStyle(h).fontSize)*1.02));
while((over()||lines()>3)&&fs>64){fs-=2;h.style.fontSize=fs+'px';}
if(over()&&s){s.style.webkitLineClamp='1';} if(over()&&s){s.remove();}
const used=[...c.children].reduce((a,el)=>Math.max(a,el.offsetTop+el.offsetHeight),0);c.style.paddingTop=Math.max(0,(c.clientHeight-used)/2)+'px';
document.body.dataset.fit=(over()||lines()>3)?'overflow':'ok';document.body.dataset.h1=fs+'px/'+lines()+'l';})();
</script>`;

/**
 * Tarjeta OG estándar. `cta` = texto del botón (sin flecha). `wa`: botón con ícono de WhatsApp.
 * `visual`: HTML del lado derecho (captura enmarcada, foto o panel). `fade`: velo para que el texto se lea sobre la captura.
 */
const card = ({ eyebrow, title, sub, cta, wa = false, visual = '', fade = false, extra = '', vars = '' }) =>
  `<!doctype html><html lang="es-CO"><head><meta charset="utf-8"><style>${css}${extra}</style></head><body style="${vars}">` +
  `<div class="halo"></div><div class="grid"></div>${visual}${fade ? '<div class="fade"></div>' : ''}` +
  `<div class="logo">${logo}</div>` +
  `<div class="copy">${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ''}<h1>${title}</h1>${sub ? `<p class="sub">${sub}</p>` : ''}</div>` +
  `<div class="cta">${wa ? waIcon : ''}<span>${cta}</span>${arrow}</div>` +
  `<div class="url"><i></i>nithios.com</div>${fitScript}</body></html>`;

const frame = (src, style) => `<div class="frame visual" style="${style}"><div class="bar"><b></b><b></b><b></b></div><img src="${src}" alt=""></div>`;
const panel = (label, items, numbered = false) =>
  `<div class="panel glass"><small>${label}</small><ul>${items
    .slice(0, 4)
    .map((t, i) => `<li><span>${numbered ? `<em style="font-style:normal;font-size:16px;font-weight:750">${i + 1}</em>` : check}</span><b>${esc(t)}</b></li>`)
    .join('')}</ul></div>`;

/** Caso de portafolio: captura que sangra por la derecha bajo un velo, texto a la izquierda y botón «Ver el caso». */
const caseCard = ({ eyebrow, name, sub, visual, cta = 'Ver el caso' }) =>
  card({ eyebrow, title: name, sub, cta, visual: frame(visual, 'left:560px;top:112px;width:760px;height:450px'), fade: true });

const defaultHtml = card({
  eyebrow: 'Empresa de tecnología · Colombia',
  title: 'Consultoría tecnológica y <em>software a medida</em>',
  sub: 'Te ayudamos a decidir qué tecnología adoptar y a construirla.',
  cta: 'Hablemos por WhatsApp',
  wa: true,
  vars: '--copy-w:1000px',
});

const S = {
  dragon: (n) => shot('dragon-global-trade', n),
  log: (n) => shot('plataforma-logistica-acero', n),
  tra: (n) => shot('plataforma-transporte-audiovisual', n),
  chelato: (n) => shot('chelato-toons', n),
};

// ---------- datos de páginas automáticas ----------
const lineLabels = { consultoria: 'Consultoría', desarrollo: 'Desarrollo a medida', ambas: 'Consultoría + desarrollo' };

/** Servicios específicos validados por src/data/servicios/index.ts (Vite SSR: import.meta.glob + alias @/). */
async function loadServicePages() {
  const { createServer } = await import('vite');
  const server = await createServer({
    root,
    configFile: false,
    logLevel: 'error',
    appType: 'custom',
    server: { middlewareMode: true, hmr: false, watch: null },
    resolve: { alias: { '@': r('src') } },
    optimizeDeps: { noDiscovery: true, include: [] },
  });
  try {
    return (await server.ssrLoadModule('/src/data/servicios/index.ts')).servicePages;
  } finally {
    await server.close();
  }
}

/** Guías: frontmatter (YAML) + h2 del cuerpo + minutos de lectura (misma regla que src/lib/guias.ts). */
async function loadGuides() {
  const dir = r('src', 'content', 'guias');
  if (!existsSync(dir)) return [];
  const out = [];
  for (const f of (await readdir(dir)).filter((x) => x.endsWith('.md') && !x.startsWith('_')).sort()) {
    const raw = await readFile(path.join(dir, f), 'utf8');
    const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
    if (!m) throw new Error(`Guía sin frontmatter: ${f}`);
    const data = parseYaml(m[1]);
    const body = m[2];
    const words = body.replace(/```[\s\S]*?```/g, ' ').replace(/[#>*_`|~\-[\]()!]/g, ' ').split(/\s+/).filter(Boolean).length;
    const h2 = [...body.matchAll(/^##\s+(.+?)\s*$/gm)].map((x) => x[1].replace(/[*_`]/g, '').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1'));
    out.push({ slug: f.replace(/\.md$/, ''), ...data, h2, minutes: data.readingMinutes ?? Math.max(1, Math.ceil(words / 200)) });
  }
  return out;
}

/** Titular de la OG de un servicio: su nombre, con la última palabra en dorado. */
const goldLast = (t) => {
  const i = t.lastIndexOf(' ');
  return i < 0 ? `<em>${esc(t)}</em>` : `${esc(t.slice(0, i))} <em>${esc(t.slice(i + 1))}</em>`;
};
/** Titular de una guía: el seoTitle sin « | Nithios», con lo que sigue a «:» (o la última palabra) en dorado. */
const guideTitle = (g) => {
  const t = (g.seoTitle ?? g.title).replace(/\s*\|\s*Nithios$/, '');
  const i = t.indexOf(': ');
  return i > 0 ? `${esc(t.slice(0, i + 1))} <em>${esc(t.slice(i + 2))}</em>` : goldLast(t);
};

function servicePageTemplate(p) {
  return card({
    vars: '--copy-w:640px',
    eyebrow: `Servicio · ${esc(lineLabels[p.parent])}`,
    title: goldLast(p.name),
    sub: esc(p.ogTagline),
    cta: esc(p.ogCta ?? 'Hablemos por WhatsApp'),
    wa: !p.ogCta,
    visual: panel('QUÉ INCLUYE', p.sections.includes.items.map((x) => x.title)),
  });
}

function guideTemplate(g) {
  return card({
    vars: '--copy-w:640px',
    eyebrow: `Guía · ${g.minutes} min de lectura`,
    title: guideTitle(g),
    sub: '',
    cta: 'Lee la guía',
    visual: panel('EN ESTA GUÍA', g.h2, true),
  });
}

async function buildAutoPages() {
  const services = await loadServicePages();
  const guides = await loadGuides();
  return [
    ...services.map((p) => ({ out: `nithios-${p.slug}-colombia-og.png`, html: servicePageTemplate(p), auto: true })),
    ...guides.map((g) => ({ out: `${g.slug}-guia-nithios-og.png`, html: guideTemplate(g), auto: true })),
  ];
}

async function buildPages() {
  const dragonTablero = await img(S.dragon('tablero-comercio-internacional'));
  const logPanel = await img(S.log('panel-de-control'));
  const traTorre = await img(S.tra('torre-de-control'));
  const chelatoTabla = await img(S.chelato('tabla-de-puntajes-en-vivo'));
  const chelatoFin = await img(S.chelato('fin-de-partida-y-ranking'), 500);
  const krystal = await img(KRYSTAL_VISUAL);
  const photo = await img(r('src', 'assets', 'ceo', 'jonathan-osorio-ceo-nithios.jpg'), 900);

  return [
    { out: r('public', 'og-default.png'), html: defaultHtml },
    {
      out: 'nithios-servicios-consultoria-y-desarrollo-de-software-og.png',
      html: card({
        eyebrow: 'Servicios',
        title: 'Tecnología que <em>mejora tus procesos</em>',
        sub: 'Consultoría para decidir y desarrollo a medida para construir.',
        cta: 'Hablemos por WhatsApp',
        wa: true,
        visual: panel('DOS LÍNEAS', ['Consultoría tecnológica', 'Software a medida', 'CTO externo y junta directiva', 'IA y automatización']),
      }),
    },
    {
      out: 'nithios-consultoria-tecnologica-colombia-og.png',
      html: card({
        eyebrow: 'Consultoría tecnológica',
        title: 'Decide mejor qué <em>tecnología adoptar</em>',
        sub: 'Diagnóstico, plan y acompañamiento en toda Colombia.',
        cta: 'Hablemos por WhatsApp',
        wa: true,
        visual: panel('CÓMO TRABAJAMOS', ['Conversación inicial', 'Diagnóstico', 'Plan y recomendaciones', 'Implementación acompañada'], true),
      }),
    },
    {
      out: 'nithios-desarrollo-de-software-a-medida-colombia-og.png',
      html: card({
        eyebrow: 'Desarrollo a medida',
        title: 'Software hecho para tu operación, <em>no al revés</em>',
        sub: 'Plataformas web, apps móviles e IA.',
        cta: 'Hablemos por WhatsApp',
        wa: true,
        visual: frame(dragonTablero, 'left:600px;top:112px;width:720px;height:450px'),
        fade: true,
      }),
    },
    {
      out: 'nithios-portafolio-software-a-medida-og.png',
      html: card({
        eyebrow: 'Portafolio',
        title: 'Software que <em>diseñamos y construimos</em>',
        sub: 'Un juego en línea y plataformas a medida.',
        cta: 'Ver el portafolio',
        visual:
          `<div class="visual" style="left:600px;top:112px;display:grid;grid-template-columns:330px 330px;gap:18px">` +
          [chelatoTabla, dragonTablero, logPanel, traTorre].map((s) => frame(s, 'position:relative;width:330px;height:236px')).join('') +
          `</div>`,
        fade: true,
      }),
    },
    {
      out: 'jonathan-osorio-ceo-fundador-nithios-og.png',
      html: card({
        vars: '--copy-w:600px;--h1:80px',
        extra: `.photo{position:absolute;right:0;top:0;width:640px;height:630px;z-index:2;background:url(${photo}) center 22%/cover no-repeat;
          mask-image:linear-gradient(90deg,transparent 0%,#000 42%);-webkit-mask-image:linear-gradient(90deg,transparent 0%,#000 42%)}
          .photo::after{content:'';position:absolute;inset:0;background:linear-gradient(0deg,rgba(0,0,0,.85) 0%,transparent 35%)}`,
        eyebrow: 'CEO y Fundador · Nithios',
        title: 'Jonathan <em>Osorio</em>',
        sub: 'Liderazgo tecnológico con visión de negocio.',
        cta: 'Agenda una conversación',
        visual: `<div class="photo"></div>`,
      }),
    },
    {
      out: 'nithios-contacto-whatsapp-og.png',
      html: card({
        eyebrow: 'Contacto',
        title: 'Hablemos por <em>WhatsApp</em>',
        sub: '+57 305 302 7559 · Atención remota en toda Colombia.',
        cta: 'Escríbenos ahora',
        wa: true,
        extra: `.chat{position:absolute;left:760px;top:118px;width:380px;padding:24px 26px 28px;z-index:4}
          .chat header{display:flex;align-items:center;gap:14px;padding-bottom:16px;border-bottom:1px solid rgba(255,255,255,.1)}
          .chat header span{width:52px;height:52px;border-radius:50%;background:#0a0a0a;border:1.5px solid rgba(212,175,55,.55);display:grid;place-items:center}
          .chat header span svg{width:34px;height:auto}
          .chat header strong{font-size:28px;font-weight:650}
          .msg{margin:22px 0 0 auto;padding:16px 20px;border-radius:20px 20px 4px 20px;font-size:27px;line-height:1.3;font-weight:550;color:#0d0d0d;background:linear-gradient(135deg,#f3e2a6,#d4af37)}`,
        visual: `<div class="chat glass"><header><span>${logo.replace(/viewBox="[^"]+"/, 'viewBox="3 3 58 58"')}</span><strong>Nithios</strong></header>
          <p class="msg">Hola Nithios, quiero contarles sobre un proyecto para mi empresa.</p></div>`,
      }),
    },
    {
      out: 'nithios-guias-de-tecnologia-para-empresas-og.png',
      html: card({
        eyebrow: 'Guías',
        title: 'Guías para <em>decidir mejor</em> sobre tecnología',
        sub: 'Criterios y preguntas, sin tecnicismos.',
        cta: 'Lee las guías',
        visual: panel('TEMAS', ['Software a medida', 'CTO externo', 'Inteligencia artificial', 'Transformación digital']),
      }),
    },
    {
      out: 'nithios-politica-de-privacidad-datos-personales-og.png',
      html: card({
        eyebrow: 'Ley 1581 de 2012',
        title: 'Política de <em>privacidad</em>',
        sub: 'Qué datos tratamos, para qué y cómo ejercer tus derechos.',
        cta: 'Lee la política',
        visual: panel('EN POCAS PALABRAS', ['Sin cookies ni analítica', 'Datos solo para responderte', 'Nunca vendemos tus datos']),
      }),
    },
    {
      out: 'nithios-preguntas-frecuentes-og.png',
      html: card({
        eyebrow: 'Preguntas frecuentes',
        title: 'Respuestas claras <em>antes de empezar</em>',
        sub: 'Costos, tiempos, cobertura y cómo trabajamos.',
        cta: 'Lee las respuestas',
        visual: panel('PREGUNTAS', ['¿Qué hace Nithios?', '¿En qué ciudades trabajan?', '¿Cuánto cuesta un proyecto?', '¿Cómo empiezo?']),
      }),
    },
    {
      // Chelato Toons: producto en línea y abierto. Sin personajes (propiedad de terceros): tabla de puntajes + fin de partida.
      out: 'chelato-toons-videojuego-activacion-de-marca-og.png',
      html: card({
        eyebrow: 'Caso · En línea',
        title: 'Chelato <em>Toons</em>',
        sub: 'Videojuego web para activación de marca, abierto para jugar.',
        cta: 'Ver el caso',
        extra: `.phone{position:absolute;left:968px;top:128px;width:190px;padding:8px;border-radius:32px;background:#161616;border:1.5px solid rgba(212,175,55,.45);box-shadow:0 30px 80px rgba(0,0,0,.8);z-index:4}
          .phone div{border-radius:25px;overflow:hidden;background:#000;padding-top:16px}.phone img{display:block;width:100%}`,
        visual: frame(chelatoTabla, 'left:560px;top:112px;width:760px;height:450px') + `<div class="phone"><div><img src="${chelatoFin}" alt=""></div></div>`,
        fade: true,
      }),
    },
    {
      out: 'dragon-global-trade-plataforma-comercio-internacional-og.png',
      html: caseCard({ eyebrow: 'Caso · Prototipo', name: 'Dragon Global <em>Trade</em>', sub: 'Plataforma de comercio internacional en 5 idiomas.', visual: dragonTablero }),
    },
    {
      out: 'plataforma-logistica-acero-pedidos-rutas-y-despachos-og.png',
      html: caseCard({ eyebrow: 'Caso · Prototipo', name: 'Plataforma logística <em>para acero</em>', sub: 'Pedidos, rutas y despachos: de la bodega a la obra.', visual: logPanel }),
    },
    {
      out: 'plataforma-transporte-audiovisual-operacion-de-rodajes-og.png',
      html: caseCard({ eyebrow: 'Caso · Prototipo', name: 'Transporte <em>audiovisual</em>', sub: 'Cada servicio de rodaje, del pedido al pago.', visual: traTorre }),
    },
    {
      out: 'krystal-software-consultorios-psicologicos-og.png',
      html: caseCard({ eyebrow: 'Caso de portafolio', name: '<em>Krystal</em>', sub: 'Software para consultorios psicológicos.', visual: krystal }),
    },
  ];
}

// ---------- render ----------
const onlyArg = process.argv.find((a) => a.startsWith('--only='));
const only = onlyArg ? onlyArg.slice(7).split(',').filter(Boolean) : null;
const wanted = (job) => !only || only.some((o) => (o === 'auto' ? job.auto : job.out.includes(o)));

const browser = await chromium.launch();
try {
  // La captura de Krystal solo hace falta para las OG manuales (portafolio y Krystal).
  if (!only || only.some((o) => /krystal|portafolio/.test(o))) await captureKrystal(browser);
  await mkdir(OUT_DIR, { recursive: true });
  const tab = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  const manual = only && only.every((o) => o === 'auto') ? [] : await buildPages();
  const jobs = [...manual, ...(await buildAutoPages())].filter(wanted);
  if (!jobs.length) console.warn('Ninguna OG coincide con', only);
  for (const { out, html } of jobs) {
    await tab.setContent(html, { waitUntil: 'load' });
    if (process.env.OG_DEBUG && out.includes(process.env.OG_DEBUG)) console.log(await tab.evaluate(() => [...document.querySelectorAll('.copy, .copy > *')].map((e) => `${e.className||e.tagName} top=${e.getBoundingClientRect().top|0} h=${e.getBoundingClientRect().height|0} pad=${e.style.paddingTop}`)));
    await tab.waitForFunction(() => document.body.dataset.fit, null, { timeout: 5000 }).catch(() => {});
    const fit = await tab.evaluate(() => [document.body.dataset.fit, document.body.dataset.h1]);
    if (fit[0] === 'overflow') console.warn(`⚠ ${out}: el texto no cabe en la caja (${fit[1]}); acorta el titular o la propuesta`);
    const png = await sharp(await tab.screenshot({ type: 'png' })).png({ compressionLevel: 9 }).toBuffer();
    const file = path.isAbsolute(out) ? out : path.join(OUT_DIR, out);
    await writeFile(file, png);
    console.log(`OG ${path.relative(root, file)} (${Math.round(png.length / 1024)} KB fuente · titular ${fit[1]})`);
  }
} finally {
  await browser.close();
}
