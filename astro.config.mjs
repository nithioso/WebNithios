// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site: 'https://nithios.com',
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
