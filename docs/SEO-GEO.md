# SEO + GEO (Generative Engine Optimization)

Objetivo: que cualquier empresa o persona en Colombia que busque consultoría tecnológica o desarrollo de software
a medida (en Google, Bing o en asistentes de IA como ChatGPT, Claude, Perplexity, Gemini o Copilot) encuentre a Nithios,
lo entienda en una frase y escriba por WhatsApp.

## Estrategia
1. **Entidad clara**: Nithios = empresa de tecnología colombiana, 2 servicios, CEO Jonathan Osorio, cobertura Colombia remota,
   contacto WhatsApp. Se repite igual en copy, JSON-LD (`@graph` con @id estables), `llms.txt` y metadatos.
2. **Una intención por página** (tabla abajo). Sin canibalizar: cada URL apunta a su keyword principal.
3. **Respuestas citables**: primera frase de cada bloque responde sola ("Nithios es…", "Puedes contactar a Nithios por…").
4. **Enlazado interno denso**: servicios ↔ portafolio ↔ FAQ ↔ contacto ↔ fundador; anclas descriptivas.
5. **Técnico impecable**: estático, JS mínimo, cero CLS, HTTPS, canonical con slash final, sitemap, robots abiertos a IA.
6. **Cero datos falsos** (ver CLAUDE.md). La confianza se construye con método, claridad y casos reales.

## Palabras clave por página
| Ruta | Keyword principal | Secundarias / intención |
|---|---|---|
| `/` | empresa de tecnología en Colombia | consultoría tecnológica y desarrollo de software a medida, transformación digital para empresas |
| `/servicios/` | servicios de tecnología para empresas | consultoría + desarrollo, cuál necesito |
| `/servicios/consultoria-tecnologica/` | consultoría tecnológica en Colombia | asesoría tecnológica para empresas, transformación digital, diagnóstico tecnológico, hoja de ruta tecnológica (la IA se enlaza a su servicio y a su guía; no se optimiza aquí) |
| `/servicios/desarrollo-de-software-a-medida/` | desarrollo de software a medida en Colombia | empresa de desarrollo de software Bogotá/Medellín, aplicaciones web y móviles, apps a la medida |
| `/servicios/cto-externo/` | CTO externo en Colombia | CTO por horas, CTO fraccional, director de tecnología por horas, CTO as a service |
| `/servicios/inteligencia-artificial-para-empresas/` | inteligencia artificial para empresas en Colombia | implementar IA en la empresa, consultoría en IA, casos de uso de IA |
| `/servicios/automatizacion-de-procesos/` | automatización de procesos empresariales | automatizar procesos, integración de sistemas, RPA/low-code (genérico) |
| `/servicios/desarrollo-de-aplicaciones-moviles/` | desarrollo de aplicaciones móviles en Colombia | apps a medida iOS y Android, empresa de desarrollo de apps |
| `/servicios/desarrollo-de-plataformas-web/` | desarrollo de plataformas web a medida | sistemas de gestión web, software de gestión a la medida |
| `/servicios/modernizacion-de-sistemas/` | modernización de sistemas legacy | migración de software heredado, migración de datos, renovar sistema |
| `/guias/` | guías de tecnología para empresas | software a medida, CTO externo, IA, transformación digital |
| `/guias/que-es-un-cto-externo/` | qué es un CTO externo | qué hace un CTO, cuándo contratar un CTO (intención informativa; «CTO por horas» y «CTO fraccional» son del servicio; la guía enlaza al servicio para el «cuándo no» y el proceso, sin repetirlos) |
| `/guias/cuanto-cuesta-desarrollar-software-a-medida-en-colombia/` | cuánto cuesta desarrollar software a medida en Colombia | precio de software a medida (se responde con factores, SIN cifras), cotización de software |
| `/guias/software-a-medida-vs-software-empaquetado/` | software a medida vs software empaquetado | comprar o desarrollar software, software enlatado |
| `/guias/como-empezar-con-inteligencia-artificial-en-tu-empresa/` | cómo empezar con inteligencia artificial en tu empresa | primer caso de uso de IA, IA para pymes |
| `/guias/como-elegir-una-empresa-de-desarrollo-de-software-en-colombia/` | cómo elegir una empresa de desarrollo de software | criterios para elegir proveedor de software, preguntas a un proveedor de software, propiedad del código (intención INFORMATIVA; la comercial «empresa de desarrollo de software en Colombia/Bogotá/Medellín» es de `/servicios/desarrollo-de-software-a-medida/`) |
| `/guias/transformacion-digital-para-pymes-por-donde-empezar/` | transformación digital para pymes | por dónde empezar la transformación digital, digitalizar una pyme |
| `/portafolio/` | portafolio de desarrollo de software | casos, plataformas desarrolladas |
| `/portafolio/dragon-global-trade/` | plataforma de gestión de comercio internacional | software comercio exterior, multiidioma |
| `/portafolio/krystal/` | software para consultorio psicológico | agenda de citas, videollamadas, historia clínica |
| `/jonathan-osorio/` | Jonathan Osorio | CEO y Fundador de Nithios, ejecutivo de tecnología |
| `/contacto/` | contactar empresa de software en Colombia | cotizar software, WhatsApp Nithios |
| `/preguntas-frecuentes/` | preguntas sobre consultoría tecnológica y desarrollo de software | cuánto cuesta, cuánto tarda, cómo empezar transformación digital (respuestas breves que enlazan a la guía de cada tema) |
| `/politica-de-privacidad/` | política de privacidad Nithios | Ley 1581 de 2012 |

Las `keywords` de cada servicio en `services.ts` guían el copy (no se imprimen como meta keywords: Google las ignora).

**Anti-canibalización.** Cada intención tiene UNA URL dueña (tabla de arriba). Las demás páginas que tocan el tema responden en 1–2 frases
y enlazan a la dueña: FAQs de las líneas → servicio específico; FAQs generales → guía; guía ↔ servicio con enlaces cruzados (la guía
explica el concepto; el servicio, cómo lo hace Nithios). Las respuestas de FAQ admiten enlaces internos en Markdown (`[texto](/ruta/)`):
FaqList los pinta y el JSON-LD FAQPage los reduce a texto plano. Normas o leyes: solo con enlace a la fuente verificada; en guías y
servicios se habla de «la normativa colombiana de protección de datos personales» con enlace a `/politica-de-privacidad/`.

## Reglas por página
- `title` ≤ 60 car. (Seo añade " | Nithios" si no contiene "Nithios"); `description` 140–160 car. El build imprime `[seo]` si no cumple.
- Un `<h1>` (PageHero). Jerarquía h2/h3 sin saltos. `path` con slash final = canonical absoluto.
- Emitido automáticamente por BaseLayout/Seo: canonical, robots (max-snippet:-1, max-image-preview:large), hreflang `es-CO` + `x-default`,
  OG (1200×630 `public/og-default.png` por defecto), Twitter, `geo.region=CO`, `geo.placename=Colombia`, `lang="es-CO"`,
  JSON-LD @graph (Organization+ProfessionalService, WebSite, Person, WebPage).
- Servicios específicos: `servicePageNode(p)` + `faqPage(p.faqs, path)` (automático en `[slug].astro`). Guías: `article(...)` (Article, author y publisher =
  Organization, datePublished/dateModified, wordCount, timeRequired, about → servicios) + `faqPage` + `og:type=article` y `article:published_time`.
- Agregar por página: `breadcrumbs` (→ BreadcrumbList), y en `jsonLd`: `service(s)` en servicios, `projectWork(p, image?)` (CreativeWork, no SoftwareApplication: evita el rich result que exige offers/rating) en casos,
  `itemList(...)` en listados, `faqPage(faqs, path)` donde haya FAQ visible. `pageType` adecuado (ContactPage, CollectionPage, ProfilePage, AboutPage).
- FAQ: `/preguntas-frecuentes/` usa WebPage + nodo FAQPage (`mainEntityId={ids.faq(path)}`) para no duplicar dos FAQPage con @id distintos.
  Google limita hoy los rich results de FAQ a sitios de gobierno/salud, pero el marcado sigue siendo útil para Bing y motores de IA.
- `/contacto/`: `pageType="ContactPage"`, `mainEntityId` = Organization (que ya tiene `contactPoint` WhatsApp).
- Prohibido en schema: aggregateRating, review, address, priceRange, openingHours, sameAs no confirmados.

## Redacción GEO (motores de IA)
- Primera frase de cada bloque = respuesta directa y autocontenida.
- Preguntas como subtítulos (h2/h3) con respuesta inmediata en 40–60 palabras (FAQ, bloque "¿Cómo contacto a Nithios?").
- Entidades explícitas: Nithios (dirigida desde Medellín, cobertura nacional remota), Jonathan Osorio Correa (CEO y Fundador; sameAs LinkedIn), Colombia + ciudades,
  Dragon Global Trade, plataforma logística para acero y plataforma de transporte audiovisual (anonimizadas), Krystal, tecnologías.
- Intenciones objetivo: "consultoría tecnológica en Colombia", "desarrollo de software a medida en Colombia",
  "empresa de desarrollo de software Bogotá/Medellín", "transformación digital para empresas", "inteligencia artificial para empresas".
- Ciudades: mención natural ("atendemos de forma remota empresas en Bogotá, Medellín…"); nunca dirección ni "oficina en".

## Archivos técnicos
- `public/robots.txt`: permite todo + buscadores y bots de IA explícitos (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot,
  Claude-User, PerplexityBot, Google-Extended, GoogleOther, Applebot-Extended, Amazonbot, meta-externalagent, MistralAI-User, CCBot…). Sitemap `/sitemap-index.xml`.
- `public/llms.txt`: resumen citable (entidad, servicios, servicios específicos, guías, portafolio, FAQ breves, URLs; una línea por página). **Actualizar al agregar proyectos o páginas.**
- `/llms-full.txt` (`src/pages/llms-full.txt.ts`): contenido completo en Markdown limpio, GENERADO en cada build desde `src/data` y `src/content/guias`
  (no se edita a mano). Enlazado desde `llms.txt` (sección Optional) y comentado en `robots.txt`.
- Sitemap: `@astrojs/sitemap` (excluye 404) con **sitemap de imágenes**: `serialize` lee cada página de `dist/` y añade un `<image:image>` por imagen de contenido (`<img>` en `<main>` con alt no vacío; `verify:images` lo comprueba). SIN `<lastmod>` (la fecha del build no es una modificación real; Google descarta lastmod poco fiable). Si se quiere, usar fechas reales por página. `<link rel="sitemap">` en el head.
- FAQPage: cada pregunta se marca UNA sola vez en todo el sitio. Las generales (`faqs.ts`) solo en `/preguntas-frecuentes/`;
  la home y `/servicios/` muestran el acordeón sin JSON-LD. Servicios, casos y portafolio marcan solo sus preguntas propias.
- 404: `noindex`, sin canonical ni nodo WebPage. `/jonathan-osorio/`: `og:type=profile` y ProfilePage con `about` → Person.
- OG de casos: `projectOgImage(p)` (`src/lib/images.ts`): `ogImage` del proyecto (render 1200×630 de `npm run og`) o, si falta, `getImage()` de la captura `cover`; misma URL optimizada en `image` del JSON-LD (nunca el original). Foto del CEO: `ceoPhotoUrl()`.
- Hechos en JSON-LD: idioma de atención solo español (`knowsLanguage: ['es-CO']`); Person sin nacionalidad; `knowsAbout`
  del CEO = solo áreas derivadas de las líneas de servicio.
- `public/.well-known/security.txt`: NO se publica hasta tener un correo real de contacto de seguridad.

## Imágenes: Open Graph, nombres y textos alternativos
- **OG propia por página (1200×630)**: home → `public/og-default.png` (alt `site.defaultOgImageAlt`); servicios, consultoría, desarrollo,
  portafolio, CEO, contacto y FAQ → `src/data/og.ts` (`pageOgImage(path)`); cada caso → `ogImage`/`ogImageAlt` en `projects.ts`.
  Privacidad y 404 usan og-default. Astro publica cada PNG como JPEG 1200×630 (q88, < 110 KB) con el nombre base + hash.
- **Generación reproducible**: `npm run og` (`scripts/generate-og-images.mjs`, Playwright + sharp; también lo corre `npm run brand`).
  Plantillas HTML con el logo oficial de `design/logo/final/`, Inter Variable del proyecto incrustada, negro/dorado y pie `nithios.com`.
  La ilustración de Krystal se captura de `dist/` (ejecuta `npm run build` antes si cambió `KrystalMockup`) en `design/og/`.
- **OG automáticas**: servicios específicos (`nithios-<slug>-colombia-og.png`, plantilla «Qué incluye») y guías (`<slug>-guia-nithios-og.png`,
  plantilla «En esta guía» con los `## `) se generan desde los datos con `npm run og` (o `npm run og -- --only=auto`); `src/data/og.ts` las recoge con
  import.meta.glob y el alt se genera del título (`ogAlt` lo sobrescribe). Si falta el PNG, el build avisa `[og]` y usa og-default.
- **OG de una página nueva**: 1) añade una entrada a `buildPages()` del script (`out: '<palabras-clave>-og.png'` + plantilla `page()`/`copy()`
  o `caseTemplate()`, solo con copy de `src/data`); 2) `npm run og` y MIRA el PNG; 3) impórtalo en `src/data/og.ts` con su `alt`
  (proyecto: `ogImage` + `ogImageAlt` en `projects.ts`); 4) en la página `const og = await pageOgImage('<ruta>')` y
  `ogImage={og.src} ogImageAlt={og.alt}` en BaseLayout; 5) `npm run build && npm run verify:images`.
- **Nombres de archivo** (lo que se publica en `/_astro/` es nombre base + hash): minúsculas, sin tildes, con guiones, con la palabra
  clave y el contexto: `<proyecto|marca>-<qué-muestra>.<ext>` (p. ej. `dragon-global-trade-modulo-comercial-cotizaciones.webp`,
  `plataforma-logistica-acero-seguimiento-de-ruta.webp`, `jonathan-osorio-ceo-nithios.jpg`, `nithios-consultoria-tecnologica-colombia-og.png`).
  Nunca genéricos (`og.png`, `tablero.webp`, `foto.jpg`). Casos anonimizados: solo el nombre genérico del caso, jamás el del cliente.
  Conservan su nombre por convención: `favicon.*`, `apple-touch-icon.png`, `icon-*.png`, `site.webmanifest`, `og-default.png`.
- **Textos alternativos**: toda imagen de contenido (capturas, retrato, ilustraciones informativas) lleva alt descriptivo, natural y
  ≤ ~140 caracteres (qué muestra + contexto, sin relleno de keywords), definido en `src/data`. Solo lo decorativo lleva `alt=""`
  (+ `aria-hidden`). En la galería el alt va en la `<img>` y el enlace añade un texto `sr-only` («se abre en una pestaña nueva»).
- **Verificación**: `npm run verify:images` (tras el build) comprueba og:image única/existente/1200×630/≤ 200 KB con alt, `<img>` sin
  alt o de contenido con alt vacío o largo, nombres genéricos y que las URL de imagen del JSON-LD existan en `dist/`.

## Seguridad y `.htaccess` (Hostinger, Apache/LiteSpeed)
- Slash final + HTTPS + apex en un solo 301 cuando existe `/ruta/index.html`; `/ruta/index.html` → `/ruta/` (301, con `THE_REQUEST`);
  HTTPS + `www`→apex en un solo 301 (contempla `X-Forwarded-Proto`), bloqueo de archivos ocultos (salvo `/.well-known/`),
  `ErrorDocument 404/403 /404.html`.
- Cabeceras: HSTS `max-age=31536000` sin includeSubDomains (activar solo con SSL emitido; includeSubDomains/preload en docs/PENDIENTES.md),
  `X-Content-Type-Options`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` restrictiva, `X-Frame-Options: DENY` +
  `frame-ancestors 'none'`, COOP `same-origin`.
- Caché: HTML/XML/TXT `max-age=0, must-revalidate`; `/_astro/*` (nombres con hash) 1 año `immutable` vía `public/_astro/.htaccess`
  (Astro lo copia a `dist/_astro/`; funciona igual en Apache y LiteSpeed). Verificar tras desplegar: `curl -sI https://nithios.com/_astro/<archivo>.css`;
  imágenes de `public/` 30 días. Compresión brotli/deflate si el módulo existe.
- **CSP — decisión**: CSP por cabecera en `.htaccess`, **no** el soporte nativo `security.csp` de Astro, porque:
  1. Astro documenta que `security.csp` **no es compatible con `<ClientRouter />`**. Se mantiene ClientRouter porque el brief pide
     "View Transitions de Astro" (costo: ~14 KB de JS sin comprimir por página + patrón `astro:page-load`). Alternativa evaluada:
     `@view-transition { navigation: auto; }` (CSS, 0 KB, Chrome/Edge 126+ y Safari 18.2+) si algún día se prioriza JS cero.
  2. En sitios estáticos Astro la emite como `<meta http-equiv>`, que no admite `frame-ancestors` ni reportes.
  3. El build emite **un solo script inline** (`<script is:inline>` de BaseLayout que añade `.js` a `<html>`); el resto son módulos
     externos (`vite.build.assetsInlineLimit: 0`). Por eso `script-src 'self' 'sha256-…'` sin `'unsafe-inline'`. Si ese hash no coincide,
     el script se bloquea y el sitio sigue funcionando (sin `.js` no se ocultan los reveals): fallo seguro.
  4. `style-src` mantiene `'unsafe-inline'` por los atributos `style="--reveal-delay:…"`/`--i` y los estilos que inyecta ClientRouter.
     Astro no incrusta hojas (`inlineStylesheets: 'never'`). Pasar los delays a `data-reveal-delay` no permitiría quitar `'unsafe-inline'`
     mientras exista ClientRouter, así que se pospone.
  5. El JSON-LD (`type="application/ld+json"`) no se ejecuta y no necesita hash.
  6. `form-action` permite `https://wa.me` y `https://api.whatsapp.com` (respaldo sin JS del formulario de contacto).
  **`npm run build` ejecuta `postbuild` → `scripts/csp-hashes.mjs` y falla si un hash no está en la CSP** (copia el que marque `FALTA`).

## Checklist de publicación
1. `npm run build` sin avisos `[seo]`/`[og]` (incluye la verificación de hashes CSP); `npm run check` sin errores; `npm run verify:links` OK.
2. Subir `dist/` a `public_html` de Hostinger (incluye `.htaccess`). Activar SSL (Let's Encrypt) para `nithios.com` y `www.nithios.com`.
3. Probar: `http://` y `www.` redirigen a `https://nithios.com/`; `/contacto` → `/contacto/`; una URL inexistente muestra la 404 con estado 404;
   cabeceras en https://securityheaders.com y consola del navegador sin errores de CSP; formulario de contacto abre WhatsApp.
4. **Google Search Console**: propiedad de *dominio* `nithios.com` verificada por registro DNS TXT (en el DNS de Hostinger);
   enviar `https://nithios.com/sitemap-index.xml`; inspeccionar y solicitar indexación de `/`, servicios y portafolio.
   Al publicar páginas nuevas (servicios específicos y guías): inspeccionar y solicitar indexación de cada URL y revisar «Páginas» y «Mejoras» (FAQ, breadcrumbs).
5. **Bing Webmaster Tools**: importar desde Search Console (o verificar por DNS/CNAME); enviar el sitemap. Bing alimenta a Copilot y a
   varios motores de IA.
5b. **IndexNow** (Bing, Yandex, Seznam…): generar una clave en Bing Webmaster, publicarla como `public/<clave>.txt` y, tras cada despliegue,
   enviar las URL nuevas o cambiadas (`POST https://api.indexnow.org/indexnow` con `host`, `key` y `urlList`). Sitio estático: se hace a mano o con un script; no hay plugin.
6. **Google Business Profile**: crear el perfil como *empresa de servicios sin ubicación física* (ocultar dirección) con área de servicio
   Colombia y ciudades principales, categoría p. ej. "Consultor informático" / "Empresa de software", teléfono WhatsApp y sitio web.
   Solo con datos reales; la verificación la exige Google.
7. Validar datos estructurados: https://search.google.com/test/rich-results y https://validator.schema.org (sin errores).
8. `npm run verify:images` sin errores. Probar previsualizaciones OG (WhatsApp, LinkedIn Post Inspector) y PageSpeed Insights (móvil) con Core Web Vitals en verde.
9. **Página de empresa en LinkedIn** de Nithios (nombre, logo oficial, sitio, sector, «Colombia» sin dirección). Cuando exista, agregar su URL
   (y la del Perfil de Negocio de Google) a `sameAs` de `organization()` y a `llms.txt`. LinkedIn de Jonathan ya está en `ceo.sameAs`.
10. Revisar `https://nithios.com/llms.txt` y `/llms-full.txt` publicados (texto plano UTF-8) y el sitemap de imágenes en Search Console.

## Cómo agregar una página
1. Contenido en `src/data/` (nuevo archivo o entrada); nunca hardcodeado.
2. `src/pages/<ruta>.astro` con `BaseLayout` (`title`, `description` 140–160, `path` con slash final, `breadcrumbs`, `pageType`, `jsonLd`, `whatsappMessage`),
   `PageHero` (único h1) y `CtaBand` al cierre.
3. Enlazarla desde al menos 2 páginas relacionadas y, si es principal, desde `nav`/`legalNav` en `site.ts`.
4. Añadirla a `public/llms.txt` y a la tabla de keywords de este documento. El sitemap (con imágenes) y `llms-full.txt` se actualizan solos
   (si la página tiene contenido propio fuera de `src/data/servicios` y las guías, añádela al endpoint `src/pages/llms-full.txt.ts`).
5. Imagen OG propia: ver «Imágenes: Open Graph, nombres y textos alternativos».
6. Nuevo proyecto de portafolio: una entrada en `projects.ts` con su `ogImage` (`npm run og`) (+ línea en `llms.txt`).
