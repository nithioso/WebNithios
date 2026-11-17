/**
 * Colecciones de contenido (Astro 7, Content Layer).
 * guias: src/content/guias/<slug>.md → /guias/<slug>/ (el id es el nombre del archivo).
 * El esquema zod es el contrato del frontmatter: si algo no cumple, el build falla con el campo exacto.
 * Contrato completo (longitudes, tono, veracidad, enlazado): docs/CONTENIDO.md.
 */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { anyServiceSlugs, guideSlugs, projectSlugs } from './data/mapa-contenido';

const SUFFIX = ' | Nithios';

const guias = defineCollection({
  loader: glob({ pattern: '[^_]*.md', base: './src/content/guias' }),
  schema: z
    .object({
      /** <h1> y titular del artículo (≤ 90 car.). Puede ser una pregunta. */
      title: z.string().min(10).max(90),
      /** <title>: ≤ 60 car. contando « | Nithios» si no lo incluye. */
      seoTitle: z
        .string()
        .refine((t) => (t.includes('Nithios') ? t : t + SUFFIX).length <= 60, 'seoTitle > 60 car. contando « | Nithios»'),
      /** Meta description: 140–160 car. */
      description: z.string().min(140, 'description < 140 car.').max(160, 'description > 160 car.'),
      /** «Respuesta corta» destacada al inicio: 2–4 frases que responden la pregunta del título por sí solas (≤ 450 car.). */
      summary: z.string().min(120).max(450),
      /** Fechas ISO (AAAA-MM-DD). updatedAt solo si hubo un cambio real de contenido. */
      publishedAt: z.coerce.date(),
      updatedAt: z.coerce.date().optional(),
      /** Minutos de lectura. Si se omite se calcula (palabras / 200, redondeado hacia arriba). */
      readingMinutes: z.number().int().min(1).max(30).optional(),
      /** 4–8 keywords objetivo (no se imprimen como meta). */
      keywords: z.array(z.string()).min(3).max(10),
      /** 1–3 servicios (líneas o específicos) a los que lleva la guía. */
      relatedServices: z.array(z.enum(anyServiceSlugs)).min(1).max(4),
      /** 0–3 guías relacionadas. */
      relatedGuides: z.array(z.enum(guideSlugs)).max(3).default([]),
      /** 0–2 casos del portafolio pertinentes. */
      relatedProjects: z.array(z.enum(projectSlugs)).max(2).default([]),
      /** 3–6 preguntas propias (no repetir las de faqs.ts, servicios u otras guías). */
      faqs: z
        .array(z.object({ question: z.string().min(10), answer: z.string().min(80) }))
        .min(3)
        .max(6),
      /** Mensaje prellenado de WhatsApp contextual (opcional). */
      whatsappMessage: z.string().optional(),
      /** Alt de la OG (opcional, ≤ 140 car.; por defecto se genera del título). */
      ogAlt: z.string().max(140).optional(),
    })
    .refine((g) => !g.updatedAt || g.updatedAt >= g.publishedAt, { message: 'updatedAt anterior a publishedAt', path: ['updatedAt'] }),
});

export const collections = { guias };
