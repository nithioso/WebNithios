# Arquitectura

## Estructura
```
astro.config.mjs        site https://nithios.com · trailingSlash 'always' · sitemap (excluye 404) · tailwind vite · assetsInlineLimit 0
public/                 .htaccess, robots.txt, llms.txt, site.webmanifest, favicon.*, apple-touch-icon.png, icon-192/512.png, icon-maskable-512.png, og-default.png
scripts/generate-brand-assets.mjs   genera favicon/íconos (sharp) y encadena las OG
scripts/generate-og-images.mjs      npm run og: OG 1200×630 por página (Playwright) → public/og-default.png + src/assets/og/*-og.png
scripts/verify-images.mjs           npm run verify:images: auditoría de og:image, alt y nombres de imagen sobre dist/
scripts/csp-hashes.mjs   postbuild: verifica los hashes sha256 de los <script is:inline> contra la CSP de public/.htaccess; falla el build si falta alguno
design/logo/            exploración y logo oficial «Ligadura NT» (DECISION.md, final/*.svg → npm run brand; v2/ y monograma/ = archivo)
src/
  data/                 contenido tipado (fuente única)
  lib/schema.ts         JSON-LD builders · lib/images.ts imágenes OG/JSON-LD optimizadas · lib/icons.ts íconos
  layouts/BaseLayout.astro
  components/           UI (docs/DISENO.md)
  styles/global.css     tokens @theme + utilidades
  pages/                rutas (ver mapa)
```

## Mapa de rutas (todas con slash final)
| Ruta | Archivo | Estado |
|---|---|---|
| `/` | `pages/index.astro` + `components/HomeHero.astro` | hecha |
| `/servicios/` | `pages/servicios/index.astro` (contenido en `servicesHub`) | hecha |
| `/servicios/consultoria-tecnologica/` · `/servicios/desarrollo-de-software-a-medida/` | archivos sueltos en `pages/servicios/` → `components/ServiceDetailContent.astro` + `data/service-details.ts` | hechas |
| `/portafolio/` | `pages/portafolio/index.astro` | hecha |
| `/portafolio/<slug>/` | `pages/portafolio/[slug].astro` (getStaticPaths desde `projects`) | hechas (dragon-global-trade, plataforma-logistica-acero, plataforma-transporte-audiovisual, krystal; los dos del medio están anonimizados, ver docs/PENDIENTES.md) |
| `/jonathan-osorio/` | `pages/jonathan-osorio.astro` + `components/CeoPortrait.astro` | hecha |
| `/contacto/` · `/preguntas-frecuentes/` · `/politica-de-privacidad/` | `pages/*.astro` (+ `components/ContactForm.astro`) | hechas |
| 404 | `pages/404.astro` | hecha |

## Datos (`src/data`)
- **site.ts** (`coverage.long`: «Trabajamos desde Medellín…»; no afirmar que Nithios nació o se fundó allí): `site` (name, url, lang `es-CO`, locale, tagline, description, defaultOgImage, whatsapp{number,e164,display,defaultMessage}),
  `waLink(msg?)`, `absoluteUrl(path)`, `nav: NavItem[]`, `legalNav`, `cities` (7), `coverage{short,long}`.
- **services.ts**: `Service` {slug, path, name, shortName, icon, headline, summary, seoTitle, seoDescription, intro[], idealFor[],
  capabilities[{title,text,icon}], benefits[{title,text,icon}], process[{title,text}], deliverables[], technologies?, keywords[], whatsappMessage}.
  `services`, `getService(slug)`.
- **projects.ts**: `Project` {slug, path, name, tagline, category, summary, seoTitle, seoDescription, description[], status, statusLabel,
  features[{title,text,icon}], highlights[], platforms[], languages[], stack[], security[], serviceSlug, cover?, coverAlt?, monogram,
  h1Subtitle (2.ª línea del h1, alineada con seoTitle), ogImage?/ogImageAlt? (OG 1200×630 sin cover), featured, order, whatsappMessage}. `projects`, `sortedProjects`, `getProject(slug)`.
  Status `'sin-especificar'` = no confirmado (no mostrar badge de estado como hecho).
- **ceo.ts**: `ceo` {name, fullName 'Jonathan Osorio Correa', givenName, familyName, familyNames, professionalHeadline, location{locality,region,country,countryCode},
  languages[], jobTitle 'CEO y Fundador', company, path, experienceSummary, headline, summary, bio[], quote (''), focusAreas[], sectors[], experience[],
  education[{degree?, institution, period?}], certifications[{name, issuer, date?, isoDate?}], achievements[], sameAs[], linkedin?, photo?, photoAlt, seoTitle,
  seoDescription, whatsappMessage}. Arrays vacíos/strings vacíos ⇒ la página OCULTA la sección. Sin `degree` se muestra solo institución y periodo.
  Fuente de ubicación, idiomas, formación, certificaciones y LinkedIn: vista pública de su LinkedIn.
- **service-details.ts**: `serviceDetails`, `getServiceDetail(slug)` (contenido largo de cada servicio: qué es, problemas, incluye,
  bloque destacado, proceso 6 pasos, entregables, sectores, FAQ propias, CTA) y `servicesHub` (página `/servicios/`).
- **contact.ts**: `contactPage`, `faqPageContent` (textos de /contacto/ y /preguntas-frecuentes/).
- **privacy.ts**: política Ley 1581 de 2012; razón social, NIT y `lastUpdated` vacíos ⇒ no se muestran (ver PENDIENTES).
- **ceo.ts** también exporta `ceoPage` (textos de /jonathan-osorio/) y los tipos `CeoBlock`, `CeoQa`.
- **projects.ts** también: `headline`, `challenge`, `solution[]`, `value[]`, `statusNote`, `images[]` (`ProjectImage`), `illustration?`,
  `faqs[]` por proyecto y `portfolioFaqs`. Capturas en `src/assets/portfolio/<slug>/<slug>-<pantalla>.webp`; OG en `src/assets/og/` (páginas: `src/data/og.ts`).
- **faqs.ts**: `Faq` {question, answer, category}; `faqs` (16), `faqCategories`, `faqsByCategory(cat)`.

## JSON-LD (`src/lib/schema.ts`)
BaseLayout siempre emite un `@graph` con `organization()` (Organization+ProfessionalService, areaServed Colombia + ciudades,
contactPoint WhatsApp, sin address), `website()`, `person()` (Person con fullName, homeLocation Medellín, knowsLanguage, alumniOf, hasCredential, sameAs LinkedIn) y `webPage({...})`; más `breadcrumbList()` si recibe `breadcrumbs`,
más los nodos de la prop `jsonLd`.
Builders: `service(s)`, `allServices()`, `projectWork(p, image?)` (CreativeWork), `person(image?)`, `itemList(items, name?)`, `faqPage(faqs, path?)`,
`breadcrumbList(crumbs, path)` ("Inicio" se antepone), `webPage(input)`, `graph(nodes)`, `ids` (`ids.service(path)`, `ids.project(path)`, `ids.person`…).

## Plantilla de página
```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import PageHero from '@/components/PageHero.astro';
import CtaBand from '@/components/CtaBand.astro';
import { getService } from '@/data/services';
import { service, ids } from '@/lib/schema';
const s = getService('consultoria-tecnologica')!;
const crumbs = [{ name: 'Servicios', path: '/servicios/' }, { name: s.shortName, path: s.path }];
---
<BaseLayout title={s.seoTitle} description={s.seoDescription} path={s.path} breadcrumbs={crumbs}
  jsonLd={[service(s)]} mainEntityId={ids.service(s.path)} whatsappMessage={s.whatsappMessage}>
  <PageHero eyebrow="Servicios" title={s.name} intro={s.intro[0]} breadcrumbs={crumbs} whatsappMessage={s.whatsappMessage} />
  …secciones…
  <CtaBand message={s.whatsappMessage} />
</BaseLayout>
```

## JS en cliente
- `BaseLayout`: observador de scroll-reveal (`[data-reveal]` → `.is-visible`, añade `.reveal-ready` a `<html>`), en `astro:page-load`. Incluye `IconSprite`.
- `WhatsAppFab`: en móvil se oculta mientras el hero está visible (IntersectionObserver). `Header`: menú móvil modal (`inert` en main/footer/FAB).
- `Header`: menú móvil + estado `is-scrolled`, con AbortController por navegación.
- Inline en `<head>`: añade clase `js` a `<html>` (sin JS el contenido no se oculta).
