/**
 * Tipo de una página de SERVICIO ESPECÍFICO (/servicios/<slug>/).
 * Un archivo por página en src/data/servicios/<slug>.ts que hace `export default { … } satisfies ServicePage;`.
 * src/data/servicios/index.ts los reúne solo (import.meta.glob) y los valida en el build.
 * Contrato completo (longitudes, tono, veracidad, enlazado): docs/CONTENIDO.md.
 */
import type { IconName } from '@/lib/icons';
import type { GuideSlug, AnyServiceSlug, ProjectSlug, ServiceLine, ServicePageSlug } from '@/data/mapa-contenido';

/** Ítem con título y texto (tarjetas, filas). */
export interface TitledText {
  title: string;
  text: string;
}

/** Ítem con ícono (tarjetas de problemas / qué incluye). */
export interface IconItem extends TitledText {
  icon: IconName;
}

/** Bloque con encabezado propio (h2) e intro opcional. */
export interface Block<T> {
  /** h2 de la sección. Preferible en forma de pregunta o afirmación concreta (≤ ~70 car.). */
  title: string;
  /** 1–2 frases bajo el h2 (opcional). */
  intro?: string;
  items: T[];
}

export interface ServicePageFaq {
  question: string;
  /** Respuesta directa: la primera frase responde sola (40–90 palabras). */
  answer: string;
}

export interface ServicePageSections {
  /** «¿Qué es…?»: `answer` = definición citable (1–2 frases); `paragraphs` = 2–3 párrafos de desarrollo. */
  whatIs: { title: string; answer: string; paragraphs: string[] };
  /** Para quién es (4–6 perfiles concretos, una frase cada uno). */
  audience: Block<string>;
  /** Problemas que resuelve (3–6 tarjetas). */
  problems: Block<IconItem>;
  /** Qué incluye (4–7 componentes; `points` opcional 2–4 viñetas cortas). La primera tarjeta es la destacada. */
  includes: Block<IconItem & { points?: string[] }>;
  /** Cómo trabajamos (4–6 pasos en orden). */
  process: Block<TitledText>;
  /** Entregables concretos (4–7). */
  deliverables: Block<TitledText>;
  /** Señales de que lo necesitas (4–7 frases en primera persona del cliente o descriptivas). */
  signals: Block<string>;
  /** Cuándo NO conviene (3–5 casos honestos, con la alternativa recomendada en `text`). */
  notAFit: Block<TitledText>;
  /** Tecnologías o herramientas de referencia (opcional; solo genéricas o ya presentes en src/data). */
  technologies?: Block<string> & { note?: string };
}

/** Enlazado interno. Slugs tipados (src/data/mapa-contenido.ts); los planificados que aún no existen se omiten solos. */
export interface ServicePageRelated {
  /** Otros servicios (específicos o líneas). 2–4. La línea madre se enlaza sola: no hace falta repetirla. */
  services?: AnyServiceSlug[];
  /** Guías relacionadas. 1–3. */
  guides?: GuideSlug[];
  /** Casos del portafolio pertinentes (solo si de verdad ilustran el servicio). 0–2. */
  projects?: ProjectSlug[];
}

export interface ServicePage {
  /** = nombre del archivo sin .ts = segmento de la URL. */
  slug: ServicePageSlug;
  /** Línea madre: consultoría, desarrollo o ambas (agrupa en /servicios/ y en la página de la línea). */
  parent: ServiceLine;
  /** Orden dentro de su grupo en los listados (menor primero). */
  order: number;
  /** Nombre corto (menús, tarjetas, breadcrumb, OG). ≤ 40 car. Ej.: «CTO externo». */
  name: string;
  icon: IconName;
  /** Sobretítulo del hero (≤ 40 car.). */
  eyebrow: string;
  /** <h1> (≤ 80 car.). Incluye la keyword principal. */
  h1: string;
  /** Fragmento LITERAL de `h1` que se pinta en dorado (opcional). */
  h1Highlight?: string;
  /** 1–2 frases para tarjetas, Service.description y OG (≤ 200 car.). */
  summary: string;
  /** <title>: ≤ 60 car. contando « | Nithios» si no incluye «Nithios». */
  seoTitle: string;
  /** Meta description: 140–160 car. */
  seoDescription: string;
  /** Respuesta directa y citable de 2–3 frases (hero). La 1.ª frase define el servicio y menciona a Nithios y Colombia. */
  intro: string;
  sections: ServicePageSections;
  /** 5–6 preguntas propias de este servicio (no repetir las de faqs.ts ni las de otra página). */
  faqs: ServicePageFaq[];
  related: ServicePageRelated;
  /** Mensaje prellenado de WhatsApp, contextual («Hola Nithios, …»). */
  whatsappMessage: string;
  /** Keywords objetivo (no se imprimen; guían el copy y docs/SEO-GEO.md). 4–8. */
  keywords: string[];
  /** Banda de cierre (opcional; hay un texto genérico por defecto). title ≤ 60 car., text 1–2 frases. */
  cta?: { title: string; text: string };
  /** Alt de la imagen OG (opcional; por defecto se genera de `name` y `h1`). ≤ 140 car. */
  ogAlt?: string;
}
