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

/** Quita la sintaxis de enlace Markdown y deja solo el texto (JSON-LD, meta, OG). */
export const stripLinks = (text: string) => text.replace(MD_LINK, '$1');
