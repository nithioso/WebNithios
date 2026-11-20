/**
 * Analítica: Google Tag Manager + Google Consent Mode v2 (docs/ANALITICA.md).
 * Se importa desde un <script> de BaseLayout (módulo externo: cumple la CSP sin hashes nuevos).
 * Con <ClientRouter /> el módulo se evalúa UNA vez por documento; las navegaciones se siguen con astro:after-swap/page-load.
 *
 * Orden garantizado en window.dataLayer (lo comprueba `npm run verify:analytics`):
 *   1. consent default (todo «denied», wait_for_update)  2. consent update con la decisión guardada (si existe)
 *   3. {event:'gtm.js'}  4. page_view de la carga inicial  …y SOLO después, diferido tras `load` + idle, se inyecta gtm.js.
 * Nada de esto ocurre si `site.gtmId` está vacío o el host no está en `site.analyticsHosts` (localhost, vistas previas).
 */
import { site } from '@/data/site';

export type ConsentChoice = 'granted' | 'denied';

declare global {
  interface Window {
    dataLayer?: unknown[];
    __nithiosAnalytics?: boolean;
  }
}

export const CONSENT_KEY = 'nithios-consent';
const CONSENT_VERSION = 1;
const GTM_ORIGIN = 'https://www.googletagmanager.com';
const WA_PREFIX = `https://wa.me/${site.whatsapp.number}`;

/** ¿Se mide en este host? (producción: nithios.com / www.nithios.com). */
export function analyticsEnabled(): boolean {
  return Boolean(site.gtmId) && (site.analyticsHosts as readonly string[]).includes(location.hostname);
}

/** Decisión guardada o null. Nunca lanza (modo privado, almacenamiento bloqueado). */
export function readConsent(): ConsentChoice | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const v = JSON.parse(raw) as { v?: number; analytics?: string };
    return v?.v === CONSENT_VERSION && (v.analytics === 'granted' || v.analytics === 'denied') ? v.analytics : null;
  } catch {
    return null;
  }
}

function storeConsent(choice: ConsentChoice): void {
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ v: CONSENT_VERSION, analytics: choice, ts: new Date().toISOString() }));
  } catch {
    /* sin almacenamiento: la decisión vale solo para esta visita */
  }
}

/**
 * gtag() mínimo: empuja el objeto `arguments` (no un array), que es lo que GTM interpreta como comando de consentimiento.
 * El parámetro rest solo existe para el tipado.
 */
function gtag(..._args: unknown[]): void {
  (window.dataLayer = window.dataLayer || []).push(arguments);
}

function push(data: Record<string, unknown>): void {
  (window.dataLayer = window.dataLayer || []).push(data);
}

/** Solo analítica: los parámetros publicitarios quedan siempre «denied» (el sitio no hace publicidad). */
function consentState(choice: ConsentChoice) {
  return { analytics_storage: choice, ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' } as const;
}

/** Al retirar el consentimiento borra las cookies propias de Google Analytics (_ga, _ga_<ID>) del dominio. */
function clearGaCookies(): void {
  const host = location.hostname.replace(/^www\./, '');
  for (const part of document.cookie.split(';')) {
    const name = part.split('=')[0].trim();
    if (!/^_ga(_|$)|^_gid$|^_gat/.test(name)) continue;
    for (const domain of ['', `; domain=${host}`, `; domain=.${host}`]) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain}`;
    }
  }
}

/** Guarda y aplica la decisión del banner. Lo usa ConsentBanner. */
export function saveConsent(choice: ConsentChoice): void {
  storeConsent(choice);
  if (!analyticsEnabled()) return;
  gtag('consent', 'update', consentState(choice));
  push({ event: 'consent_update', consent_analytics: choice });
  if (choice === 'denied') clearGaCookies();
}

/* ---------------- eventos ---------------- */

function pageView(): void {
  push({
    event: 'page_view',
    page_location: location.href,
    page_path: location.pathname,
    page_title: document.title,
  });
}

/** link_location: data-wa-location más cercano; si no, id de la sección o el landmark (header/footer/main). */
function linkLocation(a: HTMLElement): string {
  const tagged = a.closest<HTMLElement>('[data-wa-location]')?.dataset.waLocation;
  if (tagged) return tagged;
  const section = a.closest<HTMLElement>('section[id]')?.id;
  if (section) return section;
  if (a.closest('header')) return 'header';
  if (a.closest('footer')) return 'footer';
  return a.closest('main') ? 'contenido' : 'otro';
}

function onLinkClick(event: MouseEvent): void {
  if (event.type === 'auxclick' && event.button !== 1) return;
  const a = (event.target as Element | null)?.closest?.<HTMLAnchorElement>('a[href]');
  if (!a) return;
  let url: URL;
  try {
    url = new URL(a.href, location.href);
  } catch {
    return;
  }
  if (a.href.startsWith(WA_PREFIX)) {
    push({ event: 'whatsapp_click', page_path: location.pathname, link_location: linkLocation(a) });
    return;
  }
  if (/^https?:$/.test(url.protocol) && url.hostname !== location.hostname) {
    push({
      event: 'outbound_click',
      page_path: location.pathname,
      link_url: url.origin + url.pathname,
      link_domain: url.hostname,
      link_location: linkLocation(a),
    });
  }
}

/* ---------------- carga diferida de GTM ---------------- */

function injectGtm(): void {
  if (document.querySelector(`script[src^="${GTM_ORIGIN}/gtm.js"]`)) return;
  const s = document.createElement('script');
  s.async = true;
  s.src = `${GTM_ORIGIN}/gtm.js?id=${encodeURIComponent(site.gtmId)}`;
  document.head.appendChild(s);
}

/** Tras `load` y en un momento ocioso: no compite con el LCP ni con la hidratación de la página. */
function scheduleGtm(): void {
  const idle = () =>
    'requestIdleCallback' in window ? window.requestIdleCallback(injectGtm, { timeout: 3000 }) : setTimeout(injectGtm, 1);
  if (document.readyState === 'complete') idle();
  else window.addEventListener('load', idle, { once: true });
}

function init(): void {
  if (window.__nithiosAnalytics || !analyticsEnabled()) return;
  window.__nithiosAnalytics = true;

  // 1) Consentimiento por defecto ANTES de cualquier otra cosa (Consent Mode v2: los 4 parámetros).
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    wait_for_update: 500,
  });
  gtag('set', 'ads_data_redaction', true);
  // 2) Decisión guardada en una visita anterior.
  const saved = readConsent();
  if (saved) gtag('consent', 'update', consentState(saved));
  // 3) Arranque del contenedor (equivale al snippet oficial; el archivo se descarga después).
  push({ 'gtm.start': Date.now(), event: 'gtm.js' });
  // 4) page_view de la carga inicial. Las navegaciones del ClientRouter empujan el suyo en astro:page-load
  //    solo si hubo intercambio de documento (astro:after-swap): así la carga inicial no se cuenta dos veces.
  pageView();
  let swapped = false;
  document.addEventListener('astro:after-swap', () => (swapped = true));
  document.addEventListener('astro:page-load', () => {
    if (!swapped) return;
    swapped = false;
    pageView();
  });

  // Delegación global (una sola vez por documento: no necesita AbortController).
  document.addEventListener('click', onLinkClick, { capture: true });
  document.addEventListener('auxclick', onLinkClick, { capture: true });
  document.addEventListener('nithios:contact-form-submit', (e) => {
    const detail = (e as CustomEvent<{ service?: string }>).detail ?? {};
    push({ event: 'contact_form_submit', page_path: location.pathname, form_id: 'contact-form', service: detail.service || '(sin especificar)' });
  });

  scheduleGtm();
}

init();
