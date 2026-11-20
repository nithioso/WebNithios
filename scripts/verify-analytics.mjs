/**
 * Verificación de la analítica (GTM + Consent Mode v2) sobre dist/, tras `npm run build`:  npm run verify:analytics
 * Ver docs/ANALITICA.md. Sale con código 1 si algo falla.
 *
 * 1. Presencia: cada página HTML carga (directa o transitivamente) el módulo de analítica, publica el banner
 *    (#consent-banner) y el enlace «Preferencias de cookies» ([data-consent-open]); ninguna trae el snippet de GTM
 *    en línea ni el <noscript> con iframe (la CSP no lo permite).
 * 2. Comportamiento (se EJECUTA el módulo publicado en Node con un DOM mínimo simulado):
 *    - en nithios.com: dataLayer[0] = consent default con ad_storage, ad_user_data, ad_personalization y analytics_storage
 *      en «denied» + wait_for_update, ANTES del evento gtm.js y de inyectar gtm.js; la inyección espera a `load`;
 *      con decisión guardada, el consent update va antes de gtm.js; un page_view inicial (uno solo).
 *    - en localhost / vista previa: no crea dataLayer ni inyecta nada.
 *    - el ID inyectado = `gtmId` de src/data/site.ts.
 * 3. CSP (public/.htaccess): script-src permite www.googletagmanager.com sin 'unsafe-inline' ni 'unsafe-eval';
 *    img-src y connect-src con los dominios de la guía oficial (GA4 sin funciones de Ads).
 * 4. Honestidad: ninguna afirmación «sin cookies» / «no usa analítica» en lo publicado (dist/) ni en src/;
 *    la política nombra Google Analytics y Google Tag Manager, enlaza la política de Google y explica cómo retirar el consentimiento.
 */
import { readdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const astroDir = path.join(dist, '_astro');
const errors = [];
const fail = (m) => errors.push(m);

if (!existsSync(dist)) {
  console.error('No existe dist/: ejecuta `npm run build` primero.');
  process.exit(1);
}

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else out.push(p);
  }
  return out;
}

const siteTs = await readFile(path.join(root, 'src/data/site.ts'), 'utf8');
const gtmId = siteTs.match(/gtmId:\s*'([^']*)'/)?.[1] ?? '';

/* ---------- módulos JS y grafo de imports ---------- */
const jsFiles = (await readdir(astroDir)).filter((f) => f.endsWith('.js'));
const js = new Map();
for (const f of jsFiles) js.set(f, await readFile(path.join(astroDir, f), 'utf8'));
const importsOf = (src) => [...src.matchAll(/(?:from|import)\s*["'`]\.\/([^"'`]+\.js)["'`]/g)].map((m) => m[1]);
const analyticsFile = jsFiles.find((f) => js.get(f).includes('googletagmanager.com') && js.get(f).includes('consent'));
if (gtmId && !analyticsFile) fail('No se encontró el módulo de analítica en dist/_astro (¿falta el import en BaseLayout?)');
const reaches = (file, seen = new Set()) => {
  if (file === analyticsFile) return true;
  if (seen.has(file) || !js.has(file)) return false;
  seen.add(file);
  return importsOf(js.get(file)).some((d) => reaches(d, seen));
};

/* ---------- 1. Presencia por página ---------- */
const pages = (await walk(dist)).filter((f) => f.endsWith('.html'));
for (const f of pages) {
  const rel = '/' + path.relative(dist, f).replace(/\\/g, '/');
  const html = await readFile(f, 'utf8');
  if (/googletagmanager\.com\/ns\.html|<noscript>[^<]*<iframe/i.test(html)) fail(`${rel}: <noscript> con iframe de GTM (la CSP lo bloquea)`);
  if (/<script\b(?![^>]*\bsrc=)[^>]*>[^<]*(googletagmanager|gtm\.start|dataLayer)/i.test(html)) fail(`${rel}: snippet de GTM en línea (debe ir en el módulo)`);
  if (!gtmId) continue;
  const srcs = [...html.matchAll(/<script\b[^>]*\bsrc="\/_astro\/([^"]+\.js)"/g)].map((m) => m[1]);
  if (!srcs.some((s) => reaches(s))) fail(`${rel}: no carga el módulo de analítica`);
  if (!html.includes('id="consent-banner"')) fail(`${rel}: falta el banner de consentimiento`);
  if (!/data-consent-open/.test(html)) fail(`${rel}: falta el enlace «Preferencias de cookies»`);
}

/* ---------- 2. Comportamiento del módulo publicado ---------- */
async function simulate({ hostname, saved, readyState = 'loading' }) {
  const listeners = {};
  const injected = [];
  const store = new Map(saved ? [['nithios-consent', JSON.stringify({ v: 1, analytics: saved })]] : []);
  const win = {
    addEventListener: (t, fn) => ((listeners['win:' + t] ??= []).push(fn)),
    requestIdleCallback: (fn) => fn(),
  };
  const doc = {
    readyState,
    title: 'Prueba',
    cookie: '',
    addEventListener: (t, fn) => ((listeners['doc:' + t] ??= []).push(fn)),
    querySelector: () => null,
    getElementById: () => null,
    createElement: () => ({}),
    head: { appendChild: (el) => injected.push({ src: el.src, async: el.async, dataLayerLength: win.dataLayer?.length ?? 0 }) },
  };
  const g = globalThis;
  const prev = { window: g.window, document: g.document, location: g.location, localStorage: g.localStorage };
  Object.assign(win, { document: doc });
  g.window = win;
  g.document = doc;
  g.location = { hostname, href: `https://${hostname}/servicios/`, pathname: '/servicios/' };
  g.localStorage = { getItem: (k) => store.get(k) ?? null, setItem: (k, v) => store.set(k, v) };
  try {
    // Query única: Node vuelve a evaluar el módulo en cada simulación.
    await import(pathToFileURL(path.join(astroDir, analyticsFile)).href + `?sim=${hostname}-${saved}-${Math.random()}`);
    const beforeLoad = injected.length;
    for (const fn of listeners['win:load'] ?? []) fn();
    return { dataLayer: win.dataLayer, injected, beforeLoad };
  } finally {
    Object.assign(g, prev);
  }
}
const args = (e) => (e && typeof e === 'object' && !Array.isArray(e) && typeof e.length === 'number' ? Array.from(e) : null);

if (gtmId && analyticsFile) {
  const r = await simulate({ hostname: 'nithios.com' });
  const dl = r.dataLayer ?? [];
  const first = args(dl[0]);
  if (!first || first[0] !== 'consent' || first[1] !== 'default') fail('dataLayer[0] no es gtag("consent","default",…)');
  else {
    for (const k of ['ad_storage', 'ad_user_data', 'ad_personalization', 'analytics_storage'])
      if (first[2]?.[k] !== 'denied') fail(`consent default: ${k} ≠ denied`);
    if (!(first[2]?.wait_for_update > 0)) fail('consent default sin wait_for_update');
  }
  const iGtm = dl.findIndex((e) => e?.event === 'gtm.js');
  if (iGtm <= 0) fail('falta el evento gtm.js después del consent default');
  if (dl.filter((e) => e?.event === 'page_view').length !== 1) fail('la carga inicial debe empujar exactamente un page_view');
  if (r.beforeLoad) fail('gtm.js se inyecta antes de `load` (debe ser diferido)');
  if (r.injected.length !== 1) fail(`gtm.js inyectado ${r.injected.length} veces tras load (se espera 1)`);
  else {
    const inj = r.injected[0];
    if (inj.src !== `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`) fail(`URL de GTM inesperada: ${inj.src}`);
    if (!inj.async) fail('gtm.js sin async');
    if (inj.dataLayerLength < 2) fail('gtm.js se inyecta antes del consent default');
  }
  const s = await simulate({ hostname: 'www.nithios.com', saved: 'granted', readyState: 'complete' });
  const d2 = s.dataLayer ?? [];
  const iUpd = d2.findIndex((e) => args(e)?.[1] === 'update');
  const iG2 = d2.findIndex((e) => e?.event === 'gtm.js');
  if (iUpd < 1 || args(d2[iUpd])[2]?.analytics_storage !== 'granted' || iUpd > iG2) fail('decisión guardada: falta consent update granted antes de gtm.js');
  if (args(d2[iUpd])?.[2]?.ad_storage !== 'denied') fail('consent update: ad_storage debe seguir denied');
  if (s.injected.length !== 1) fail('con document.readyState=complete, gtm.js debe inyectarse una vez');
  for (const host of ['localhost', 'nithioso.github.io', 'nithios-preview.example']) {
    const l = await simulate({ hostname: host });
    if (l.dataLayer || l.injected.length) fail(`${host}: no debe crear dataLayer ni cargar GTM`);
  }
}

/* ---------- 3. CSP ---------- */
const htaccess = await readFile(path.join(root, 'public/.htaccess'), 'utf8');
const cspLine = htaccess.match(/Content-Security-Policy "([^"]+)"/)?.[1] ?? '';
const directive = (name) => (cspLine.match(new RegExp(`(?:^|;)\\s*${name}\\s+([^;]+)`))?.[1] ?? '').trim().split(/\s+/);
const need = {
  'script-src': ['https://www.googletagmanager.com'],
  'img-src': ['https://www.googletagmanager.com', 'https://*.google-analytics.com'],
  'connect-src': ['https://www.googletagmanager.com', 'https://*.google-analytics.com', 'https://*.google.com'],
};
if (!cspLine) fail('public/.htaccess sin Content-Security-Policy');
const scriptSrc = directive('script-src');
for (const bad of ["'unsafe-inline'", "'unsafe-eval'", "'strict-dynamic'", 'https:', '*']) if (scriptSrc.includes(bad)) fail(`CSP script-src no debe incluir ${bad}`);
if (gtmId) for (const [d, hosts] of Object.entries(need)) for (const h of hosts) if (!directive(d).includes(h)) fail(`CSP ${d} sin ${h}`);
if (!gtmId && /google/.test(cspLine)) fail('gtmId vacío pero la CSP aún permite dominios de Google: quítalos');
// Toda URL absoluta que el módulo use debe estar permitida por script-src.
if (analyticsFile) for (const m of js.get(analyticsFile).matchAll(/https:\/\/([a-z0-9.-]+)\//g)) {
  const origin = `https://${m[1]}`;
  if (origin !== 'https://wa.me' && !scriptSrc.includes(origin)) fail(`el módulo usa ${origin}, que no está en script-src`);
}

/* ---------- 4. Honestidad del contenido ---------- */
const NO_COOKIES = /sin cookies|no usa(?:mos)? cookies|no utiliza(?:mos)? cookies|ni analítica|sin analítica|no usa(?:mos)? (?:herramientas de )?analítica|sin rastreadores|sin seguimiento de ningún tipo|no usa(?:mos)? cookies, analítica/i;
const published = [...pages, path.join(dist, 'llms.txt'), path.join(dist, 'llms-full.txt')].filter(existsSync);
for (const f of published) {
  const t = (await readFile(f, 'utf8')).replace(/<script[\s\S]*?<\/script>/gi, '');
  const m = t.match(NO_COOKIES);
  if (gtmId && m) fail(`${path.relative(dist, f)}: afirma «${m[0]}» pero el sitio usa Google Analytics con consentimiento`);
}
for (const f of (await walk(path.join(root, 'src'))).filter((x) => /\.(ts|astro|md)$/.test(x))) {
  const m = (await readFile(f, 'utf8')).match(NO_COOKIES);
  if (gtmId && m) fail(`${path.relative(root, f)}: afirma «${m[0]}»`);
}
if (gtmId) {
  const policy = await readFile(path.join(dist, 'politica-de-privacidad/index.html'), 'utf8').catch(() => '');
  for (const [re, what] of [
    [/Google Analytics/, 'nombrar Google Analytics'],
    [/Google Tag Manager/, 'nombrar Google Tag Manager'],
    [/id="cookies"/, 'tener la sección #cookies'],
    [/href="https:\/\/policies\.google\.com\/privacy[^"]*"/, 'enlazar la política de privacidad de Google'],
    [/Preferencias de cookies/, 'explicar cómo retirar el consentimiento («Preferencias de cookies»)'],
    [/consentimiento/, 'indicar que la base es el consentimiento'],
  ])
    if (!re.test(policy)) fail(`/politica-de-privacidad/: debe ${what}`);
}

/* ---------- salida ---------- */
if (errors.length) {
  console.error(`✗ verify:analytics — ${errors.length} problema(s):\n  - ${[...new Set(errors)].join('\n  - ')}`);
  process.exit(1);
}
console.log(
  gtmId
    ? `✓ verify:analytics OK — ${gtmId} en ${pages.length} páginas (módulo ${analyticsFile}), consent default antes de gtm.js, carga diferida, ` +
        'sin carga fuera de producción, CSP coherente y sin afirmaciones «sin cookies».'
    : '✓ verify:analytics OK — gtmId vacío: sin analítica.',
);
