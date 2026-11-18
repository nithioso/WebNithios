# Sistema de diseño Nithios

Lujo sobrio: negro profundo, superficies carbón, dorado como acento (máx. 1–2 acentos dorados por vista), mucho aire,
tipografía grande y ajustada (Inter Variable), hairlines, vidrio sutil, reveals suaves.

## Tokens (`src/styles/global.css` → utilidades Tailwind)
| Grupo | Tokens / utilidades |
|---|---|
| Negros | `ink-950` #000 · `ink-900` #050505 · `ink-850` #0a0a0a · `ink-800` #111 · `ink-700` #161616 · `ink-600` #1d1d1f · `ink-500` #2a2a2c |
| Texto | `pearl` #f5f1e8 (principal) · `mist` #b3ada3 (secundario, 8.4:1) · `smoke` #8f8a82 (terciario, 5.6:1) |
| Dorado | `gold-100…900` (base `gold-500` #d4af37, `gold-600` #c9a24b). Texto dorado legible: `gold-300/400` |
| Líneas | `line` (blanco 9%) · `line-strong` (16%) · `line-gold` (dorado 35%) → `border-line`, `divide-line`… |
| Tipo display | `text-display-2xl` · `-xl` · `-lg` · `-md` · `-sm` (fluidos, tracking negativo) · `text-lead` |
| Otros | `rounded-(--radius-card)` (1.75rem) · `shadow-gold` · `shadow-soft` · `ease-(--ease-apple)` · `animate-shimmer/float/glow` · `font-display` |

## Utilidades de marca
`container-x` (max 80rem, gutter 20px) · `container-narrow` (52rem) · `text-gold` (texto degradado metálico) ·
`text-gold-shimmer` (brillo de una sola pasada, 1 por vista) · `bg-gold` · `glass` · `glass-strong` · `hairline` / `hairline-t` / `hairline-b` ·
`gold-ring` (borde degradado 1px, usa ::before) · `glow-gold` (halo radial superior) · `grid-lines` (rejilla tenue con máscara) ·
`noise` (grano, usa ::after) · `eyebrow` (sobretítulo dorado en mayúsculas) · `prose-nithios` (texto largo) · `link-underline` (solo enlaces sueltos: breadcrumbs, índices) ·
`prose-guia` (prosa editorial de las guías: medida ~68 car. (columna `max-w-[40rem]`), h2 con filete y `scroll-margin`, enlaces con el mismo estilo que `link-inline`,
listas con punto/número dorado, tablas con `th scope=col/row` + `aria-label` que en móvil se vuelven tarjetas «Etiqueta: valor» gracias a `data-label` de `enhanceGuideHtml()`, blockquote, code, hr) ·
`link-inline` (enlace DENTRO de un párrafo: subrayado dorado siempre visible, WCAG 1.4.1; nunca `link-underline` en un párrafo).
Reveal: atributo `data-reveal` (`""`=sube, `fade`, `scale`, `blur`) + `style="--reveal-delay:120ms"`. NO usarlo en el hero (sobre el pliegue / LCP):
ahí va `.hero-in` (+ `hero-in-1…4` para escalonar), animación CSS pura sin JS. Si el módulo del observer no corre, `reveal-failsafe`
muestra todo a los 2,5 s (`<html>` sin `.reveal-ready`).
Movimiento: todas las animaciones decorativas son finitas (WCAG 2.2.2): shimmer 1 vez, glow 2, partículas/órbitas del HomeHero 1–2,
FAB de WhatsApp `animate-ping-soft` (3 pulsos), punto «en vivo» de KrystalMockup `animate-pulse-soft` (3 pulsos). No uses `animate-ping`/`animate-pulse`
de Tailwind (infinitas) ni combines `motion-safe:animate-*` con `[animation-*]` sin la variante (el atajo `animation` los pisa): crea un token finito en `@theme`.
Comprobación: `document.getAnimations().filter(a => a.effect.getTiming().iterations === Infinity)` debe dar `[]`.
Tipografía: se conserva la variante `opsz` de Inter (≈73 KB vs 48 KB de `wght`) porque el eje óptico da el ajuste fino de los titulares
display; respaldo `Inter Fallback` (Arial con métricas ajustadas) para evitar CLS mientras carga.
Íconos repetidos (`SPRITE_ICONS` en `src/lib/icons.ts`) se sirven con `<use>` desde `IconSprite.astro` (en BaseLayout).

## Componentes (`src/components`)
Todos aceptan `class`. Importa con `@/components/X.astro`.

### BaseLayout (`@/layouts/BaseLayout.astro`)
Props: `title`, `description`, `path`, `ogImage?`, `ogImageAlt?`, `ogImageWidth?`/`ogImageHeight?` (por defecto 1200×630), `ogType?`, `jsonLd?: object[]`, `noindex?`, `breadcrumbs?: Crumb[]`,
`pageType?` (`'AboutPage'|'ContactPage'|'FAQPage'|'CollectionPage'|'ProfilePage'`…), `mainEntityId?`, `whatsappMessage?`. Slot `head`.
Incluye Header, Footer, WhatsAppFab, skip link, `<main id="contenido">`. El contenido de la página empieza bajo el header fijo: usa `PageHero` (ya compensa `--header-h`).

### PageHero — hero de páginas internas (contiene el `<h1>`)
Props: `title`, `titleHtml?`, `eyebrow?`, `intro?`, `breadcrumbs?: Crumb[]`, `whatsappMessage?: string | false`, `ctaLabel?`,
`secondary?: {label, href}`, `align?: 'left'|'center'`, `size?: 'md'|'lg'`. Slot: extra bajo los CTA.
Slot `aside` (opcional): visual a la derecha en ≥lg (`grid-cols-[1.1fr_0.9fr]`), oculto en móvil; en servicios va `<ServiceHeroArt slot="aside">`.
`align="center"` en /contacto/ y /preguntas-frecuentes/ (centra también el slot: usa `justify-center` en flex).
```astro
<PageHero eyebrow="Portafolio" title="Software que ya construimos" titleHtml='Software que <span class="text-gold">ya construimos</span>'
  intro="…" breadcrumbs={[{ name: 'Portafolio', path: '/portafolio/' }]} whatsappMessage="Hola…" secondary={{ label: 'Servicios', href: '/servicios/' }} />
```

### Section
Props: `id?`, `eyebrow?`, `title?`, `titleHtml?`, `intro?`, `headingLevel?` ('h2'), `align?`, `tone?: 'default'|'raised'|'glow'`,
`spacing?: 'none'|'sm'|'md'|'lg'`, `width?: 'default'|'narrow'|'full'`, `titleSize?: 'md'|'lg'|'xl'`, `ariaLabel?`. Slots: default, `actions`.
```astro
<Section id="proceso" eyebrow="Método" title="Así trabajamos" intro="…" tone="raised">
  <ol class="grid gap-5 md:grid-cols-4">…</ol>
  <Fragment slot="actions"><WhatsAppButton /></Fragment>
</Section>
```

### Card — bento/listados
Props: `title?`, `text?`, `eyebrow?`, `icon?: IconName`, `href?` (toda la tarjeta clicable, un solo enlace), `tone?: 'glass'|'solid'|'gold'|'outline'`,
`headingLevel?` ('h3'), `size?: 'sm'|'md'|'lg'`, `revealDelay?` (ms; -1 desactiva). Slots: default, `footer`.
```astro
<div class="grid gap-5 md:grid-cols-3">
  <Card class="md:col-span-2" tone="gold" size="lg" icon="spark" title="IA aplicada" text="…" />
  <Card icon="lock" title="Seguridad" text="…" revealDelay={100} />
</div>
```

### ProjectCard
Props: `project: Project`, `size?: 'md'|'lg'`, `headingLevel?`, `revealDelay?`. Visual: `<ProjectArt variant="card">`. Categoría + chip "Prototipo" bajo la imagen.
```astro
{sortedProjects.map((p, i) => <ProjectCard project={p} revealDelay={i * 100} />)}
```

### Button
Props: `href?` (sin href → `<button>`), `variant?: 'gold'|'glass'|'outline'|'ghost'|'link'`, `size?: 'sm'|'md'|'lg'` (≥44px),
`icon?`, `iconRight?`, `external?` (auto para http/https), `ariaLabel?`, `type?`, `fullWidth?`, `data-*`.
Ojo: no pases `hidden`/`sm:inline-flex` en `class` (choca con `inline-flex`); envuelve en un div.
```astro
<Button href="/portafolio/" variant="glass" iconRight="arrow-right">Ver portafolio</Button>
```

### WhatsAppButton — CTA principal
Props: `message?`, `label?` ('Hablemos por WhatsApp'), `size?`, `variant?: 'gold'|'glass'|'outline'`, `fullWidth?`.
```astro
<WhatsAppButton message="Hola Nithios, quiero cotizar una app" size="lg" />
```

### CtaBand — cierre de página
Props: `title?`, `text?`, `message?`, `ctaLabel?`, `secondary?: {label, href}`, `headingLevel?`, `id?` ('hablemos').
```astro
<CtaBand message={s.whatsappMessage} secondary={{ label: 'Ver portafolio', href: '/portafolio/' }} />
```

### FaqList — acordeón `<details>` sin JS
Props: `items: Faq[]`, `openFirst?` (`headingLevel` obsoleto: la pregunta es texto en `<summary>`, no encabezado). JSON-LD aparte y solo una vez por pregunta en el sitio: `jsonLd={[faqPage(items, path)]}`.

### Breadcrumbs
Props: `items: Crumb[]` (sin "Inicio"; se antepone). PageHero ya lo renderiza si le pasas `breadcrumbs`.

### Reveal
Props: `as?` (tag, 'div'), `effect?: 'up'|'fade'|'scale'|'blur'`, `delay?` (ms), `id?`.
```astro
<Reveal as="li" effect="scale" delay={150}>…</Reveal>
```

### Icon
Props: `name: IconName`, `size?` (24), `label?` (si falta → aria-hidden), `strokeWidth?`. Nombres en `src/lib/icons.ts`
(arrow-right, arrow-up-right, arrow-left, chevron-down/right, menu, close, plus, check, check-circle, external, compass, code, search, route,
spark, sparkle, layers, workflow, users, target, bolt, chart, shield, lock, browser, phone, grid, plug, video, globe, map-pin, calendar,
message, database, cpu, translate, contrast, truck, cart, briefcase, folder, id, heart, clipboard, key, clock, quote, award, graduation, whatsapp).

### Logo (oficial: K · «NTOS en sello» — ver design/logo/DECISION.md)
Props: `size?: 'sm'|'md'|'lg'|'xl'` (diámetro de la moneda 36/40/50/68 px; header `sm`, footer `md`), `variant?: 'full'|'mark'|'wordmark'`, `tone?: 'gold'|'mono'`, `href?`, `class?`.
SVG inline, sin fuente: moneda de oro (la O) con la ligadura NT calada y un corte en S que la parte en dos piezas (luz arriba a la izquierda, sombra el resto)
+ wordmark NITHIOS en marfil (pearl), mayúsculas a 0,38 del diámetro, centradas con la moneda y a 13u del canto. Ids de degradado únicos por instancia (header + footer en la misma página).
`sm`/`md` usan el arte con corte óptico de `app-icon.svg` (≈3,2u) para que la NT respire en el header; `lg`/`xl`, el corte fino de 2,4u.
Fuente de verdad: los SVG de `design/logo/final/` (derivados de `design/logo/v3/ntos-sello/` con `derive-final.mjs`: mark, mark-pos, mark-mono, logo-horizontal(-pos), logo-vertical(-pos),
logo-mono, wordmark, app-icon, app-icon-square, app-icon-maskable). Si cambia la geometría: actualiza v3/ntos-sello/, deriva final/, copia los paths a Logo.astro y ejecuta `npm run brand` y `npm run kit`.
Zona de respeto: ¼ del diámetro. Tamaño mínimo: moneda 24 px con corte óptico (la NT se lee desde ~24–32 px; la S se descubre desde ~64 px; a 16 px es una moneda con una marca oscura), horizontal 32 px de alto.
Sobre fondos claros usa `tone="mono"` o los SVG `-pos`. La NT es un hueco: deja ver el fondo.

### Header / Footer / WhatsAppFab / Seo
Incluidos por BaseLayout. Header: `path`, `whatsappMessage?`. Footer: `whatsappMessage?`. WhatsAppFab: `message?`.
Seo: `title`, `description`, `path`, `ogImage?`, `ogImageAlt?`, `ogImageWidth?`/`ogImageHeight?` (por defecto 1200×630), `ogType?`, `noindex?`, `jsonLd?` (documento completo).

### Componentes de página (específicos)
- **HomeHero** — hero de la home (contiene el `<h1>`), visual SVG/CSS (eclipse dorado). Sin props.
- **ServiceDetailContent** — cuerpo de las páginas de detalle de servicio. Props: `service: Service`, `detail: ServiceDetail`, `breadcrumbs: Crumb[]`.
- **CeoPortrait** — foto de `ceo.photo` con `<Image priority>` o monograma «JO» + isotipo NT en marco premium (respaldo si no hay foto). Props: `size?: 'sm'|'lg'`, `class?`.
- **ContactForm** — arma el mensaje y abre wa.me (sin JS: GET a wa.me + enlace de respaldo; no guarda datos). Props: `class?`.
- **BrowserFrame** — marco de navegador para capturas (slot). Props: `label?`, `glow?`, `class?`.
- **PhoneFrame** — marco de teléfono para capturas verticales de móvil (slot; barra de estado propia para que la isla no tape la captura). Props: `glow?`, `class?` (el ancho lo da el contenedor).
- **ProjectArt** — ÚNICA selección de visual de un proyecto: `cover` → `illustration` (mapa `illustrations = { krystal: KrystalMockup }`) → monograma.
  Props: `project`, `variant?: 'card'|'frame'`, `widths?` ([640,960,1280,1920]), `sizes?` (móvil 160vw card / 165vw frame, por el recorte ampliado), `priority?`.
  Nueva ilustración: componente + entrada en `illustrations` + valor en `Project['illustration']`.
- **ProjectVisual** — `ProjectArt variant="frame"` dentro de BrowserFrame (+ PhoneFrame superpuesto abajo a la derecha si hay `coverPhone`; barra con el dominio de `liveUrl`). Props: `project`, `priority?`, `glow?`, `sizes?`, `class?`.
- **ProjectGallery** — galería de `ProjectImage[]`; cada captura enlaza al archivo completo (lupa + «Toca la imagen para ampliarla» en móvil). Capturas de escritorio en BrowserFrame (1.ª a todo el ancho + 2 columnas);
  capturas verticales (`frame: 'phone'` o proporción vertical) en una fila centrada de PhoneFrame (2 / 3 / 5 por fila). Props: `images`, `label?`, `class?`.
- **ProjectCard** — tarjeta de proyecto. Props: `project`, `size?`, `headingLevel?`, `revealDelay?`, `wide?` (horizontal en ≥lg; con `lg:col-span-2`: la home lo usa en el 1.er proyecto si el total es impar, sin huérfanos), `class?`.
  Chip de estado: «Prototipo» o `statusLabel` («En línea») si `status: 'en-produccion'`.
- **ServiceHeroArt** — tile de vidrio con borde dorado (ícono + entregables reales) para el `aside` de PageHero. Props: `items: {icon, title, points}[]`, `pointsLabel?`.
- **PortfolioShowcase** — fila de proyecto en /portafolio/ (alterna lado por `index`). Props: `project`, `index?`, `headingLevel?`, `class?`.
- **ServicePageContent** — cuerpo completo de un servicio específico (hero → qué es → para quién → problemas → qué incluye (bento sin huecos 3–7)
  → señales → proceso → entregables (+ tecnologías) → cuándo NO conviene → casos → guías → FAQ → relacionados → CtaBand). Props: `page: ServicePage`, `breadcrumbs`.
  Rejillas sin huérfanas con `gridFor(n)`/`gridFor2(n)` de `src/lib/grid.ts` (5 ítems → 3 + 2 anchas en lg). Señales = situaciones hipotéticas
  (eyebrow «¿Te suena?», ícono `check-circle`, SIN comillas «»: nunca deben parecer testimonios). Problemas: carrusel en móvil (`data-scroller`).
  `whatIs.paragraphs` y las respuestas de FAQ admiten enlaces internos `[texto](/ruta/)` (`linkifyHtml` de `src/lib/text.ts`).
- **GuideCard** — tarjeta de guía (un solo enlace, «Guía · N min de lectura»). Props: `guide: GuideLink`, `size?: 'md'|'lg'`, `headingLevel?`, `revealDelay?`, `class?`. Siempre muestra `summary` (3 líneas; 4 en `lg`).
- **GuidesBlock** — sección «Guías» (3 GuideCard + «Ver todas las guías») para home, `/servicios/` y líneas. Props: `set: FeaturedGuidesKey` (slugs y textos en `src/data/guias.ts › featuredGuides`), `id?`, `tone?`. No se pinta si ninguna guía existe.
- **Página de guía** (`pages/guias/[slug].astro`): hero `size="md"` con meta (autor Nithios, fechas, minutos), bloque «Respuesta corta» (`gold-ring glass-strong`),
  índice de contenidos (móvil: `<details>`; ≥lg: lateral fijo con `aria-current` de la sección visible), prosa `.prose-guia`, FAQ, nota editorial, relacionados, CtaBand.
  El título del índice lateral es un `<p>` (no h2) y su CTA es `variant="outline"` (máx. 1–2 acentos dorados por vista). /guias/ usa bento de 6 columnas sin huecos.
- **KrystalMockup** — ilustración CSS rotulada «Ilustración conceptual» (no es captura). Props: `class?`.

Nota Button: en móvil (<sm) el texto puede partir en dos líneas (`text-balance`); desde `sm` es `whitespace-nowrap`. Mantén las etiquetas de
botones lg ≤ ~24 caracteres para que quepan en una línea a 390 px (p. ej. «Habla con Jonathan», «Abrir WhatsApp directo»). Botones de formulario: `<Button type="submit">`, nunca copiar clases.
FAB móvil: `html { scroll-padding-bottom: 6rem }` y `<summary>` de FaqList con `max-md:pr-14` para no quedar bajo el botón.
Carruseles móviles: atributo `data-scroller="<etiqueta>"` + `<ScrollerSync />` en el componente; su script les pone `tabindex/role=region/aria-label` solo si desplazan.

## Patrones recomendados
- Hero de home: `text-display-2xl`, palabra clave con `text-gold`, `glow-gold` + `grid-lines` de fondo, CTA dorado + glass.
- Bento: `grid gap-5 md:grid-cols-6` con Cards de `md:col-span-2/3/4`; una sola `tone="gold"` por grilla.
- Secciones alternas: `tone="default"` y `tone="raised"`; cierre siempre con `CtaBand`.
- Listas con viñeta dorada: `<Icon name="check" class="text-gold-400" />` + texto `text-mist`.
