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
- `npm run brand` → regenera favicon e íconos PWA desde los SVG de `design/logo/final/` (logo oficial K «NTOS en sello», derivados de `design/logo/v3/ntos-sello/`; sharp + Playwright, ambos en devDependencies) y luego corre `npm run og`.
- `npm run kit` → regenera el kit gráfico `design/brand-kit/` (vectores, PNG, favicon/app, redes, impresión) desde `design/logo/v3/ntos-sello/`.
- `npm run og` → regenera las OG 1200×630 (`public/og-default.png` + `src/assets/og/*-og.png`, incluidas las automáticas de servicios específicos y guías; solo esas: `npm run og -- --only=auto`) · `npm run verify:images` → auditoría de OG, alt y nombres sobre `dist/` · `npm run verify:links` → enlaces internos y anclas sobre `dist/`.

## Mapa de archivos
- `src/data/` — FUENTE ÚNICA de contenido: `site.ts` (site, waLink(), absoluteUrl(), nav, cities, coverage), `services.ts` + `service-details.ts`, `projects.ts` (+ portfolioFaqs), `ceo.ts` (+ ceoPage), `faqs.ts`, `contact.ts`, `privacy.ts`, `og.ts` (OG por página + alt).
- Páginas: todas las rutas del mapa están hechas (ver docs/ARQUITECTURA.md). Portafolio: Chelato Toons (videojuego web EN LÍNEA en chelato.nithios.com para
  «una marca de micheladas» —nunca nombrar a la empresa—; capturas móviles en `PhoneFrame` SIN personajes, que son de terceros), Dragon Global Trade, «Plataforma logística para acero»,
  «Plataforma de transporte audiovisual» (capturas reales 2880×1800 WebP en `src/assets/portfolio/<slug>/`) y Krystal (ilustración conceptual).
  Los casos de logística y transporte están ANONIMIZADOS: nunca escribir en `src/` ni `public/` el nombre del cliente ni de su producto (correspondencia interna en docs/PENDIENTES.md).
- Servicios específicos: un archivo por página en `src/data/servicios/<slug>.ts` (tipo `ServicePage`) → `/servicios/<slug>/` automático.
  Guías: `src/content/guias/<slug>.md` (esquema zod en `src/content.config.ts`) → `/guias/<slug>/`. Slugs registrados en `src/data/mapa-contenido.ts`.
  Contrato de redacción OBLIGATORIO: `docs/CONTENIDO.md` (referencias: `cto-externo.ts` y `que-es-un-cto-externo.md`).
  Hechos (6+6): IA, automatización, apps móviles, plataformas web, modernización, CTO externo · costo, a medida vs empaquetado, CTO externo, IA, elegir proveedor, pymes.
- Enlazado: guías destacadas en home/`/servicios/`/líneas → `src/data/guias.ts › featuredGuides` (`GuidesBlock`); casos → servicios: `projects.ts › relatedServicePages`.
- GEO: `public/llms.txt` (a mano, una línea por página) · `/llms-full.txt` GENERADO por `src/pages/llms-full.txt.ts` (no editar a mano) · sitemap con `<image:image>` (serialize en `astro.config.mjs`).
- `src/lib/schema.ts` — builders JSON-LD · `src/lib/icons.ts` — set de íconos (`IconName`).
- `src/layouts/BaseLayout.astro` — head SEO, header, footer, FAB, reveal. Todas las páginas lo usan.
- `src/components/` — ver docs/DISENO.md (props + ejemplos de cada uno).
- `src/styles/global.css` — tokens y utilidades de marca.
- `docs/ARQUITECTURA.md` · `docs/DISENO.md` · `docs/SEO-GEO.md` · `docs/CONTENIDO.md` · `docs/PENDIENTES.md`.

## Convenciones
- Rutas internas SIEMPRE con slash final (`/servicios/`). `path` de BaseLayout igual a la ruta.
- Un solo `<h1>` por página (PageHero lo contiene). Title ≤60 car. (se añade " | Nithios" si falta), description 140–160 car. (el build avisa por consola).
- CTA principal: "Hablemos por WhatsApp" con `<WhatsAppButton message="…">` y mensaje contextual por página; pásalo también como `whatsappMessage` a BaseLayout.
- Contenido nuevo → en `src/data/`, nunca hardcodeado en páginas. Nuevo proyecto = nueva entrada en `projects.ts`.
- Imágenes con `astro:assets` (`<Image>`), en `src/assets/`. Nada de imágenes remotas.
- Peso del HTML: logo dorado sm/md e íconos repetidos van por `<use>` al sprite (`IconSprite.astro`); trazo de íconos en `.ico` (no añadir atributos fill/stroke a `Icon`); Person completo solo en `/jonathan-osorio/`.
- Imágenes SEO: nombre descriptivo en minúsculas sin tildes con guiones (`<proyecto>-<qué-muestra>.webp`, nunca `tablero.webp`), alt descriptivo ≤140 car. en `src/data` (alt="" solo decorativas) y OG propia por página (`src/data/og.ts` + `npm run og`; ver docs/SEO-GEO.md).
- Clases de layout (`hidden`, `sm:block`) en un wrapper, no en `class` de Button (conflicto con `inline-flex`).
- JS: solo `<script>` procesados por Astro (se emiten como módulos externos; `assetsInlineLimit: 0`), inicializados en `astro:page-load` y con AbortController si añaden listeners globales.
- Hero (sobre el pliegue): `.hero-in`, nunca `data-reveal`. Animaciones decorativas finitas.
- Copy: Chelato Toons es el único producto en línea (sin cifras, fechas ni resultados de campaña). Nunca presentar Dragon ni los casos de logística y transporte como productos terminados (son prototipos navegables con datos ficticios); nada de "clientes",
  "procesos reales" ni dominios no confirmados. No usar logos de terceros (en las capturas se oculta el logo del cliente).
- CEO: hoja de vida SIN fechas y con empleadores ANONIMIZADOS (descriptores en `ceo.ts`); nunca nombrar empleadores ni sus marcas, ni correo/teléfono personal.
- Medellín: Jonathan está radicado allí y Nithios se dirige desde Medellín (NO afirmar que la empresa 'nació' o fue 'fundada' en Medellín: no está confirmado). La empresa NO publica dirección; cobertura nacional remota.
- Accesibilidad: foco visible (en enlaces-tarjeta: `focus-visible:after:*`, en ese orden), targets ≥44px (`min-h-11`), `aria-current`, textos alternativos, respeta `prefers-reduced-motion`.

## REGLAS ANTI-ALUCINACIÓN (críticas)
PROHIBIDO inventar: clientes, testimonios, cifras, premios, certificaciones, empleadores, cargos previos, títulos, fechas,
direcciones, correos, redes sociales, precios, logos de terceros, ratings. Único contacto: WhatsApp +57 305 302 7559.
No hay dirección física. Si falta un dato, deja el campo vacío en `src/data` (la UI debe ocultar la sección) y anótalo en `docs/PENDIENTES.md`.
