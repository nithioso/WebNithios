/**
 * Utilidades de la colección `guias` (src/content/guias/*.md · esquema en src/content.config.ts).
 * getGuides() valida que cada archivo esté registrado en src/data/mapa-contenido.ts y ordena por fecha.
 */
import { getCollection, type CollectionEntry } from 'astro:content';
import { guideSlugs } from '@/data/mapa-contenido';

export type Guide = CollectionEntry<'guias'>;

export const guidePath = (slug: string) => `/guias/${slug}/`;

let cache: Promise<Guide[]> | undefined;
const order = (id: string) => (guideSlugs as readonly string[]).indexOf(id);

/** Todas las guías publicadas, de la más reciente a la más antigua (a igual fecha, en el orden de guideSlugs: el mismo de public/llms.txt). */
export function getGuides(): Promise<Guide[]> {
  cache ??= getCollection('guias').then((all) => {
    for (const g of all) {
      if (!(guideSlugs as readonly string[]).includes(g.id))
        throw new Error(`[guias] src/content/guias/${g.id}.md: slug no registrado en src/data/mapa-contenido.ts (guideSlugs).`);
    }
    return all.sort(
      (a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime() || order(a.id) - order(b.id),
    );
  });
  return cache;
}

export async function getGuide(slug: string): Promise<Guide | undefined> {
  return (await getGuides()).find((g) => g.id === slug);
}

/** Palabras del cuerpo Markdown (sin sintaxis). */
export function wordCount(body = ''): number {
  return body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/[#>*_`|~\-[\]()!]/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
}

/** Minutos de lectura: el del frontmatter o palabras/200 hacia arriba. */
export function readingMinutes(g: Guide): number {
  return g.data.readingMinutes ?? Math.max(1, Math.ceil(wordCount(g.body) / 200));
}

/** Fecha legible en es-CO («17 de noviembre de 2026»), en UTC para que no cambie de día. */
export function formatDate(d: Date): string {
  return new Intl.DateTimeFormat('es-CO', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(d);
}

/** AAAA-MM-DD para <time datetime> y JSON-LD. */
export const isoDate = (d: Date) => d.toISOString().slice(0, 10);

/**
 * Mejora el HTML renderizado de una guía (sin plugins de Markdown: Astro 7 usa Sätteri por defecto). En cada <table>:
 *  - los <th> del encabezado llevan scope="col" y la primera celda de cada fila del cuerpo pasa a <th scope="row">
 *    (encabezado de fila: los lectores de pantalla anuncian «fila × columna»);
 *  - copia el texto de los <th> del encabezado a `data-label` de las celdas de su columna, para que en móvil cada fila
 *    se lea como tarjeta («Etiqueta: valor», ver .prose-guia);
 *  - añade aria-label con el texto del h2/h3 anterior (contexto de la tabla) y roles ARIA explícitos (con display:block
 *    algunos lectores de pantalla pierden la semántica de tabla).
 */
export function enhanceGuideHtml(html: string): string {
  const strip = (s: string) => s.replace(/<[^>]+>/g, '').replace(/"/g, '&quot;').trim();
  return html.replace(/<table[\s\S]*?<\/table>/g, (table, offset: number) => {
    const before = html.slice(0, offset);
    const heading = [...before.matchAll(/<h[23]\b[^>]*>([\s\S]*?)<\/h[23]>/g)].at(-1)?.[1];
    const thead = table.match(/<thead[\s\S]*?<\/thead>/)?.[0] ?? '';
    const labels = [...thead.matchAll(/<th\b[^>]*>([\s\S]*?)<\/th>/g)].map((m) => strip(m[1]));
    let out = table.replace(/<thead[\s\S]*?<\/thead>/, (h) =>
      h.replace(/<tr\b/g, '<tr role="row"').replace(/<th\b/g, '<th scope="col" role="columnheader"'),
    );
    out = out.replace(/<tbody[\s\S]*?<\/tbody>/, (body) =>
      body.replace(/<tr\b[^>]*>([\s\S]*?)<\/tr>/g, (_tr, cells: string) => {
        let i = 0;
        const row = cells.replace(/<td\b([^>]*)>([\s\S]*?)<\/td>/g, (_c, attrs: string, inner: string) => {
          const label = labels[i];
          const first = i++ === 0;
          const data = label ? ` data-label="${label}"` : '';
          return first ? `<th scope="row" role="rowheader"${attrs}${data}>${inner}</th>` : `<td role="cell"${attrs}${data}>${inner}</td>`;
        });
        return `<tr role="row">${row}</tr>`;
      }),
    );
    out = out
      .replace(/<table\b/, `<table role="table"${heading ? ` aria-label="${strip(heading)}"` : ''}`)
      .replace(/<thead\b/, '<thead role="rowgroup"')
      .replace(/<tbody\b/, '<tbody role="rowgroup"');
    return out;
  });
}
