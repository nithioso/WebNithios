# Contrato de contenido: servicios específicos y guías

Este documento es la referencia OBLIGATORIA para redactar páginas de servicio específico (`/servicios/<slug>/`) y guías
(`/guias/<slug>/`). Léelo junto con `CLAUDE.md` (reglas anti-alucinación). Archivos de referencia de tono y profundidad:

- Servicio: `src/data/servicios/cto-externo.ts`
- Guía: `src/content/guias/que-es-un-cto-externo.md`

Imítalos en estructura, extensión y tono. No toques plantillas, componentes ni estilos: todo sale de los datos.

## 0. Mapa y slugs (no se inventan)

Los slugs están registrados en `src/data/mapa-contenido.ts`. Solo se escriben archivos para slugs registrados:

| Tipo | Slug | Línea (`parent`) |
|---|---|---|
| Servicio | `cto-externo` (hecho) | `consultoria` |
| Servicio | `inteligencia-artificial-para-empresas` | `ambas` |
| Servicio | `automatizacion-de-procesos` | `ambas` |
| Servicio | `desarrollo-de-aplicaciones-moviles` | `desarrollo` |
| Servicio | `desarrollo-de-plataformas-web` | `desarrollo` |
| Servicio | `modernizacion-de-sistemas` | `ambas` |
| Servicio | `miembro-de-junta-directiva-tecnologia` (Jonathan Osorio como candidato a junta; `providedByCeo`) | `consultoria` |
| Guía | `cuanto-cuesta-desarrollar-software-a-medida-en-colombia` | — |
| Guía | `software-a-medida-vs-software-empaquetado` | — |
| Guía | `que-es-un-cto-externo` (hecha) | — |
| Guía | `como-empezar-con-inteligencia-artificial-en-tu-empresa` | — |
| Guía | `como-elegir-una-empresa-de-desarrollo-de-software-en-colombia` | — |
| Guía | `transformacion-digital-para-pymes-por-donde-empezar` | — |

Líneas existentes (también enlazables): `consultoria-tecnologica`, `desarrollo-de-software-a-medida`.
Casos: `chelato-toons`, `dragon-global-trade`, `plataforma-logistica-acero`, `plataforma-transporte-audiovisual`, `krystal`.

**Enlaces a páginas planificadas que aún no existen**: en los campos tipados (`related`, `relatedServices`, `relatedGuides`)
puedes usar cualquier slug registrado; si la página todavía no está publicada, el enlace se omite solo y aparece cuando exista.
En el CUERPO Markdown de una guía, en cambio, el enlace es literal: solo enlaza páginas existentes o de este mapa
(se publican todas juntas) y verifica con `npm run verify:links`.

## 1. Servicio específico — `src/data/servicios/<slug>.ts`

Un archivo por página. Basta con crearlo: la ruta, el listado en `/servicios/`, el listado en la página de su línea,
el footer, el JSON-LD (Service + FAQPage + BreadcrumbList) y la OG (`npm run og`) se generan solos.

```ts
import type { ServicePage } from './types';
export default { /* … */ } satisfies ServicePage;
```

Solo se permite `import type` (el script de OG carga el archivo con Vite; no importes valores de otros módulos).

### Campos y longitudes (el build FALLA si no se cumplen las marcadas con ✱)

| Campo | Regla |
|---|---|
| `slug` ✱ | = nombre del archivo; registrado en `mapa-contenido.ts` |
| `parent` | `'consultoria' \| 'desarrollo' \| 'ambas'` (ver tabla de la sección 0) |
| `order` | orden dentro de su grupo (1, 2, 3…) |
| `name` | nombre corto ≤ 40 car. (menús, tarjetas, breadcrumb, OG). Ej.: «Automatización de procesos» |
| `icon` | un `IconName` de `src/lib/icons.ts` (compass, spark, workflow, phone, browser, layers, bolt, cpu, code…) |
| `eyebrow` | ≤ 40 car. Formato: `«<Nombre> · <Línea>»` (Consultoría / Desarrollo / Consultoría + desarrollo) |
| `h1` | ≤ 80 car., con la keyword principal al inicio. Ej.: «Automatización de procesos empresariales en Colombia» |
| `h1Highlight` ✱ | fragmento LITERAL del h1 que va en dorado (opcional, 2–5 palabras, idealmente el final) |
| `summary` | 1–2 frases, ≤ 200 car. Se usa en tarjetas, Service.description y enlaces relacionados |
| `seoTitle` ✱ | ≤ 60 car. contando « \| Nithios» (se añade si no aparece «Nithios») |
| `seoDescription` ✱ | 140–160 car. Keyword + Colombia + beneficio + llamada suave («Hablemos.») |
| `ogDescription` ✱ | ≤ 125 car., frase completa con gancho: og:description de las vistas previas en WhatsApp/LinkedIn/X (≠ seoDescription) |
| `ogTagline` ✱ | ≤ 60 car.: propuesta de valor que se imprime en la imagen OG bajo el nombre |
| `ogCta` | opcional ≤ 34 car.: texto del botón de la imagen OG (por defecto «Hablemos por WhatsApp») |
| `ctaLabel` / `heroSecondary` | opcionales: texto del botón de WhatsApp (hero y cierre) y botón secundario del hero (por defecto «Leer la guía») |
| `providedByCeo` | `true` solo si lo presta Jonathan en persona (JSON-LD: provider = Organization + Person, y `makesOffer` en la Person) |
| `intro` | 2–3 frases. 1.ª frase = definición citable que nombra el servicio; 2.ª menciona Nithios + «empresas de toda Colombia» + «de forma remota» |
| `sections.whatIs` | `title` (pregunta «¿Qué es…?»), `answer` (1–2 frases autocontenidas), `paragraphs` (2–3 párrafos de 50–90 palabras) |
| `sections.profile` | opcional: perfil de quien presta el servicio (3–6 `{icon,title,text}` SOLO con hechos de `ceo.ts`, sin fechas ni empleadores) + `link` al perfil. Se pinta tras «Qué es» |
| `sections.audience` ✱ | `title`, `intro?`, `items`: 4–6 perfiles (una frase cada uno, ≥ 3) |
| `sections.problems` ✱ | 3–6 `{icon, title (≤ 45 car.), text (25–45 palabras)}` |
| `sections.includes` ✱ | 4–7 `{icon, title, text, points?}`; la 1.ª es la destacada (con 2–4 `points`). 6 ítems = rejilla perfecta |
| `sections.process` ✱ | 4–6 pasos `{title, text}` en orden; el 1.º siempre es la conversación inicial por WhatsApp |
| `sections.deliverables` ✱ | 4–7 `{title, text}` concretos y verificables (documentos, software, configuraciones) |
| `sections.signals` ✱ | 4–6 frases (citas «…» en voz del cliente, como en cto-externo) |
| `sections.notAFit` ✱ | 3–4 `{title, text}`: casos honestos en que NO conviene + la alternativa (enlazable por nombre) |
| `sections.technologies` | opcional: `title`, `intro?`, `items` (chips), `note?`. Solo tecnologías genéricas o ya presentes en `src/data` |
| `faqs` ✱ | 5–6 `{question, answer}`. Respuesta 40–90 palabras, la 1.ª frase responde sola |
| `related` | `services` (2–4 slugs; la línea madre se añade sola), `guides` (1–3), `projects` (0–2, solo si ilustran de verdad) |
| `cta` | opcional `{title ≤ 60 car., text 1–2 frases}` para la banda de cierre |
| `whatsappMessage` | «Hola Nithios, …» contextual al servicio (≤ 110 car.) |
| `keywords` | 4–8 búsquedas objetivo (no se imprimen) |
| `ogAlt` | opcional ≤ 140 car.; por defecto se genera de `name` + `h1` |

Extensión objetivo: **≥ 900 palabras útiles** sumando todos los textos (cto-externo ≈ 2000).

Los `title` de sección son h2: preferiblemente preguntas naturales que incluyan el nombre del servicio
(«¿Qué incluye la automatización de procesos?», «Señales de que tu empresa necesita…», «¿Cuándo NO te conviene…?»).

## 2. Guía — `src/content/guias/<slug>.md`

Basta con crear el archivo: la página, el índice `/guias/`, el JSON-LD (Article con autor y editor = Organization Nithios,
FAQPage, BreadcrumbList), el índice de contenidos y la OG (`npm run og`) se generan solos. El esquema zod
(`src/content.config.ts`) hace FALLAR el build si el frontmatter no cumple.

```md
---
title: '¿Pregunta o titular con la keyword?'          # h1, 10–90 car.
seoTitle: 'Titular corto con keyword'                # ≤ 60 car. contando « | Nithios»
description: '…'                                      # 140–160 car.
ogDescription: '…'                                    # ≤ 125 car., frase completa (vistas previas sociales)
summary: '…'                                          # «Respuesta corta»: 2–4 frases, 120–450 car., responde sola
publishedAt: 2026-11-17                               # fecha de las guías iniciales
# updatedAt: AAAA-MM-DD                               # solo si hubo un cambio real de contenido
# readingMinutes: 6                                   # OMITIR: se calcula (palabras / 200)
keywords: [ … ]                                       # 3–10
relatedServices: [ … ]                                # 1–4 slugs de servicio (líneas o específicos)
relatedGuides: [ … ]                                  # 0–3 slugs de guía
relatedProjects: [ … ]                                # 0–2 slugs de caso (opcional)
faqs:                                                 # 3–6; respuesta ≥ 80 car. (40–90 palabras)
  - question: '¿…?'
    answer: '…'
# whatsappMessage: 'Hola Nithios, …'                  # opcional; por defecto menciona la guía
---
```

### Cuerpo Markdown

- **1000–1400 palabras**. Sin `# ` (h1): empieza con 1 párrafo de contexto y luego `## ` (h2). El build falla si hay un h1.
- 6–8 secciones `## ` (forman el índice de contenidos y la OG; ≤ 60 car. cada una, sin enlaces ni negritas en el título).
  `### ` solo dentro de una sección larga.
- Primera frase de cada sección = respuesta directa a su título (citable por IA).
- Recursos disponibles y ya estilizados: párrafos, **negritas** (2–4 por sección, máx.), *cursiva*, listas `-` y `1.`,
  tablas GFM (máx. 4 columnas, textos cortos; en móvil se desplazan), `> cita`, `---`, enlaces.
- Cierre: un párrafo que enlaza al servicio de Nithios correspondiente y a `/contacto/` (como en la guía de referencia).
- Enlaces internos: rutas absolutas con slash final (`/servicios/cto-externo/`). 3–6 por guía, con ancla descriptiva
  («[desarrollo de software a medida](/servicios/desarrollo-de-software-a-medida/)», nunca «aquí»).
- Enlaces externos: solo a fuentes verificadas (ver Veracidad). No enlaces a competidores ni a herramientas comerciales.

## 3. Tono y estilo

- Español de Colombia, **tuteo profesional** («tu empresa», «te ayudamos»). Nada de voseo ni «usted».
- Claro, sobrio, sin tecnicismos innecesarios; si usas un término (MVP, API, ERP, legacy), explícalo en la misma frase.
- Frases cortas. Párrafos de 2–4 frases. Sin relleno («en el mundo actual», «hoy más que nunca»), sin superlativos vacíos
  («el mejor», «líderes», «de clase mundial»), sin emojis, sin signos de exclamación.
- «Nosotros» = Nithios. Autor de las guías: la organización («el equipo de Nithios»). **No** atribuyas guías a Jonathan Osorio
  ni digas que una persona las revisó.
- Vende con criterio: método, preguntas correctas, factores, señales y cuándo NO conviene. El cliente debe salir sabiendo más
  aunque no nos contrate.
- Ejemplos: solo **genéricos y claramente hipotéticos** («una distribuidora que…», «imagina una empresa de servicios que…»).

## 4. Veracidad (crítica — ver CLAUDE.md)

PROHIBIDO inventar: cifras, porcentajes, precios, rangos de costo, plazos típicos («en 3 meses»), estadísticas de mercado,
clientes, testimonios, casos, premios, certificaciones, alianzas, herramientas «que usamos» no confirmadas, garantías.

- Costos y plazos: se explican por **factores** («depende del alcance, las integraciones…») y por cómo pedir una cotización
  comparable. Nunca un número.
- Leyes, normas o estudios: solo si verificas la fuente oficial (WebSearch/WebFetch) y la enlazas. Ante la duda, omite.
  Ya verificada en el sitio: Ley 1581 de 2012 (protección de datos personales).
- Hechos de Nithios permitidos (están en `src/data/`): dos líneas de servicio; proceso de trabajo; contacto único WhatsApp
  +57 305 302 7559; cobertura remota en toda Colombia, dirigida desde Medellín (no «fundada en» ni «oficina en»);
  portafolio de 5 casos (Chelato Toons, videojuego web EN LÍNEA y hoy ABIERTO (nació con acceso por QR para una activación de marca) de «una marca de micheladas», sin nombrar a la empresa;
  Dragon Global Trade, plataforma logística para acero y plataforma de transporte audiovisual son
  **prototipos navegables con datos ficticios**; Krystal); Jonathan Osorio, CEO y Fundador, con los logros anonimizados de
  `ceo.ts` (sin fechas ni empleadores).
- Casos anonimizados: nunca el nombre del cliente ni de su producto. No presentes los prototipos como productos en producción.
- Prohibido: «clientes», «casos de éxito», «procesos reales», «más de N proyectos», dominios no confirmados, logos de terceros.
- Prohibido nombrar el proveedor de hosting en lo público (seguridad). Idiomas del CEO SIN nivel. Junta directiva: disponibilidad,
  nunca afirmar que Jonathan es o ha sido miembro de una junta.

## 5. Enlazado interno (cada página)

- Servicio: `related.services` 2–4 (complementarios, no solo la línea), `related.guides` 1–3 (la guía homónima primero:
  alimenta el botón «Leer la guía» del hero), `related.projects` solo si el caso ilustra ese servicio
  (p. ej. logística → automatización/plataformas web; Krystal → apps móviles/plataformas web; Dragon → plataformas web).
- Guía: `relatedServices` 1–3 (el servicio específico primero), `relatedGuides` 2–3, cuerpo con 3–6 enlaces internos.
- Ancla = nombre del destino o su keyword, nunca «clic aquí». Una URL no se enlaza dos veces en la misma sección.

## 6. FAQ (cada pregunta una sola vez en todo el sitio)

No repitas preguntas de `src/data/faqs.ts`, de `service-details.ts`, de otro servicio ni de otra guía (cada una se marca
como FAQPage). Revisa: `grep -rh "question" src/data src/content`. Formula preguntas reales de compradores en Colombia.

## 7. SEO por página

- Una keyword principal por URL; sin canibalizar (servicio = intención comercial «CTO externo en Colombia»;
  guía = intención informativa «qué es un CTO externo»).
- Keyword principal en: `h1`/`title`, `seoTitle`, `seoDescription`, `intro`/`summary`, primer h2 y alguna FAQ.
- Ciudades: mención natural y opcional («Bogotá, Medellín, Cali…»), nunca «oficina en».

## 8. Verificación antes de entregar

```bash
npm run og -- --only=auto   # genera las OG de servicios específicos y guías (mira el PNG en src/assets/og/)
npm run build               # 0 avisos [seo]/[og]; falla si el frontmatter o el .ts no cumplen
npm run check               # 0 errores (slugs tipados)
npm run verify:links        # enlaces internos y anclas existentes
npm run verify:images       # OG única 1200×630 con alt en cada página
npm run verify:seo          # metadatos, og:description ≤ 125, JSON-LD, sitemap, llms, enlazado (docs/SEO-GEO.md)
```

Al terminar todas las páginas: añadirlas a `public/llms.txt` y a la tabla de keywords de `docs/SEO-GEO.md`.
Mira la OG generada a tamaño completo y a ~400 px: titular y botón deben leerse (la CTA en la imagen no la verifica ningún script).
