/** Utilidades de texto para plantillas. */

export function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/** Título con un fragmento literal en dorado (`<span class="text-gold">`). Escapa todo lo demás. */
export function highlightHtml(text: string, highlight?: string): string | undefined {
  if (!highlight || !text.includes(highlight)) return undefined;
  const i = text.indexOf(highlight);
  return `${escapeHtml(text.slice(0, i))}<span class="text-gold">${escapeHtml(highlight)}</span>${escapeHtml(text.slice(i + highlight.length))}`;
}

/** Enlaces Markdown internos `[texto](/ruta/)` dentro de textos de src/data (solo rutas que empiezan por «/»). */
const MD_LINK = /\[([^\]]+)\]\((\/[^)\s]*)\)/g;

/**
 * Texto de src/data con enlaces internos en Markdown → HTML seguro (escapa todo y convierte solo `[texto](/ruta/)`
 * en `<a class="link-inline">`). Úsalo con `set:html` en FAQs y párrafos que puedan llevar enlaces.
 */
export function linkifyHtml(text: string): string {
  let out = '';
  let last = 0;
  for (const m of text.matchAll(MD_LINK)) {
    out += escapeHtml(text.slice(last, m.index)) + `<a class="link-inline" href="${escapeHtml(m[2])}">${escapeHtml(m[1])}</a>`;
    last = m.index! + m[0].length;
  }
  return out + escapeHtml(text.slice(last));
}

/** Límite de og:description (vistas previas en WhatsApp, LinkedIn, X y Facebook muestran ~125 car. en móvil). */
export const OG_DESCRIPTION_MAX = 125;

/**
 * Descripción social (og:description) a partir de la meta description cuando la página no define `ogDescription`:
 * frases completas que quepan en 125 car.; si la primera frase ya es más larga, corta en la última pausa natural
 * (coma, dos puntos, punto y coma, raya) y cierra con punto; nunca corta palabras.
 */
export function socialDescription(text: string, max = OG_DESCRIPTION_MAX): string {
  const t = stripLinks(text).trim();
  if (t.length <= max) return t;
  const sentences = t.match(/[^.!?]+[.!?]+(\s|$)/g) ?? [];
  let out = '';
  for (const s of sentences) {
    if ((out + s).trim().length > max) break;
    out += s;
  }
  if (out.trim()) return out.trim();
  const head = t.slice(0, max);
  const cut = Math.max(head.lastIndexOf(', '), head.lastIndexOf(': '), head.lastIndexOf('; '), head.lastIndexOf(' — '));
  if (cut > 60) return head.slice(0, cut).trim() + '.';
  return head.slice(0, head.lastIndexOf(' ')).replace(/[,:;]$/, '') + '…';
}

/** og:title: el title sin « | Nithios» cuando el completo pasa de ~55 car. (las tarjetas sociales lo truncan). */
export function socialTitle(title: string, max = 55): string {
  return title.length > max ? title.replace(/\s*\|\s*Nithios$/, '') : title;
}

/** Quita la sintaxis de enlace Markdown y deja solo el texto (JSON-LD, meta, OG). */
export const stripLinks = (text: string) => text.replace(MD_LINK, '$1');
