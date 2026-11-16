# Nithios — sitio web (nithios.com)

Sitio estático premium (negro/dorado, estilo Apple) para Nithios, empresa de tecnología colombiana:
consultoría tecnológica + desarrollo de software a medida. Idioma es-CO, tuteo profesional.

## Stack
Astro 7 (output estático, `trailingSlash: 'always'`, `build.format: 'directory'`) · Tailwind CSS 4 (`@tailwindcss/vite`, tokens en `@theme`) ·
`@astrojs/sitemap` · TypeScript strict (TS 6; `@astrojs/check` aún no soporta TS 7) · Inter Variable autoalojada (fontsource) ·
`<ClientRouter />` (View Transitions). Sin frameworks de UI, sin CDNs, sin analytics, sin cookies. Hosting: Hostinger estático (`public/.htaccess`).

## Comandos
- `npm run dev` · `npm run build` (debe pasar sin warnings) · `npm run preview` · `npm run check` (0 errores)
- `npm run build` ejecuta `postbuild` (`scripts/csp-hashes.mjs`): falla si cambias un `<script is:inline>` y no actualizas su hash en la CSP de `public/.htaccess`.
- `npm run brand` → regenera SVG del logo, favicon, íconos PWA y `public/og-default.png` (sharp + Playwright, ambos en devDependencies).

## Mapa de archivos
- `src/data/` — FUENTE ÚNICA de contenido: `site.ts` (site, waLink(), absoluteUrl(), nav, cities, coverage), `services.ts` + `service-details.ts`, `projects.ts` (+ portfolioFaqs), `ceo.ts` (+ ceoPage), `faqs.ts`, `contact.ts`, `privacy.ts`.
- Páginas: todas las rutas del mapa están hechas (ver docs/ARQUITECTURA.md). Capturas del portafolio en `src/assets/portfolio/<slug>/`.
- `src/lib/schema.ts` — builders JSON-LD · `src/lib/icons.ts` — set de íconos (`IconName`).
- `src/layouts/BaseLayout.astro` — head SEO, header, footer, FAB, reveal. Todas las páginas lo usan.
- `src/components/` — ver docs/DISENO.md (props + ejemplos de cada uno).
- `src/styles/global.css` — tokens y utilidades de marca.
- `docs/ARQUITECTURA.md` · `docs/DISENO.md` · `docs/SEO-GEO.md` · `docs/PENDIENTES.md`.

## Convenciones
- Rutas internas SIEMPRE con slash final (`/servicios/`). `path` de BaseLayout igual a la ruta.
- Un solo `<h1>` por página (PageHero lo contiene). Title ≤60 car. (se añade " | Nithios" si falta), description 140–160 car. (el build avisa por consola).
- CTA principal: "Hablemos por WhatsApp" con `<WhatsAppButton message="…">` y mensaje contextual por página; pásalo también como `whatsappMessage` a BaseLayout.
- Contenido nuevo → en `src/data/`, nunca hardcodeado en páginas. Nuevo proyecto = nueva entrada en `projects.ts`.
- Imágenes con `astro:assets` (`<Image>`), en `src/assets/`. Nada de imágenes remotas.
- Clases de layout (`hidden`, `sm:block`) en un wrapper, no en `class` de Button (conflicto con `inline-flex`).
- JS: solo `<script>` procesados por Astro (se emiten como módulos externos; `assetsInlineLimit: 0`), inicializados en `astro:page-load` y con AbortController si añaden listeners globales.
- Hero (sobre el pliegue): `.hero-in`, nunca `data-reveal`. Animaciones decorativas finitas.
- Copy: nunca presentar Dragon como producto terminado (es prototipo); nada de "clientes", "procesos reales" ni dominios no confirmados.
- Accesibilidad: foco visible (en enlaces-tarjeta: `focus-visible:after:*`, en ese orden), targets ≥44px (`min-h-11`), `aria-current`, textos alternativos, respeta `prefers-reduced-motion`.

## REGLAS ANTI-ALUCINACIÓN (críticas)
PROHIBIDO inventar: clientes, testimonios, cifras, premios, certificaciones, empleadores, cargos previos, títulos, fechas,
direcciones, correos, redes sociales, precios, logos de terceros, ratings. Único contacto: WhatsApp +57 305 302 7559.
No hay dirección física. Si falta un dato, deja el campo vacío en `src/data` (la UI debe ocultar la sección) y anótalo en `docs/PENDIENTES.md`.
