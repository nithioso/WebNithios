// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const SITE = 'https://nithios.com';
const DIST = fileURLToPath(new URL('./dist/', import.meta.url));

/**
 * Imágenes de CONTENIDO de una página ya generada (para <image:image> del sitemap): <img> dentro de <main> con alt no
 * vacío (las decorativas alt="" se excluyen), rasterizadas y locales, sin duplicados. Se lee el HTML de dist/ porque
 * serialize corre en astro:build:done, con las páginas ya escritas.
 * @param {string} url
 * @returns {Promise<{ url: string }[]>}
 */
async function contentImages(url) {
  const { pathname } = new URL(url);
  let html;
  try {
    html = await readFile(`${DIST}${pathname.replace(/^\//, '')}index.html`, 'utf8');
  } catch {
    return [];
  }
  const main = html.match(/<main[\s\S]*?<\/main>/)?.[0] ?? '';
  const out = new Set();
  for (const tag of main.match(/<img\b[^>]*>/g) ?? []) {
    const src = tag.match(/\ssrc="([^"]+)"/)?.[1];
    const alt = tag.match(/\salt="([^"]*)"/)?.[1] ?? '';
    if (!src || !alt.trim() || !/\.(webp|jpe?g|png|avif)(\?|$)/i.test(src) || /^(data:|https?:)/.test(src)) continue;
    out.add(new URL(src.replace(/&amp;/g, '&'), SITE).href);
  }
  return [...out].map((u) => ({ url: u }));
}


// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site: SITE,
  trailingSlash: 'always',
  output: 'static',
  build: {
    format: 'directory',
    // assetsInlineLimit: 0 hace que 'auto' nunca incruste CSS; se deja explícito.
    inlineStylesheets: 'never',
  },
  // Navegación casi instantánea: precarga cada enlace interno al pasar el cursor / enfocar.
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
      // Sin <lastmod>: la fecha del build no es una señal de modificación real y Google la descarta.
      // Sitemap de imágenes: <image:image><image:loc> por cada imagen de contenido de la página (ver contentImages).
      namespaces: { news: false, video: false, xhtml: false, image: true },
      serialize: async (item) => {
        const img = await contentImages(item.url);
        return img.length ? { ...item, img } : item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    build: {
      // Scripts siempre como módulos externos: se ejecutan una sola vez con <ClientRouter />
      // (los módulos inline se re-ejecutan en cada navegación) y cumplen la CSP de .htaccess.
      assetsInlineLimit: 0,
    },
  },
});
