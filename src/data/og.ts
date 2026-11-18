/**
 * Imágenes Open Graph (1200×630) por página + su texto alternativo (og:image:alt / twitter:image:alt).
 * Las PNG se generan con `npm run og` (scripts/generate-og-images.mjs) y Astro las publica como JPEG optimizado
 * (`pageOgImage()` en src/lib/images.ts). Los casos de portafolio llevan la suya en projects.ts (`ogImage`).
 * Home y páginas sin entrada usan public/og-default.png (`site.defaultOgImage` + `site.defaultOgImageAlt`).
 * Alt: qué muestra la imagen + contexto, natural y ≤ ~140 caracteres.
 *
 * Servicios específicos y guías: OG AUTOMÁTICA. `npm run og` las genera a partir de src/data/servicios/*.ts y
 * src/content/guias/*.md con los nombres de `servicePageOgFile()` / `guideOgFile()` (el script usa la misma convención),
 * y aquí se recogen con import.meta.glob: no hay que importar nada a mano. Alt por defecto generado del título.
 */
import type { ImageMetadata } from 'astro';
import servicios from '@/assets/og/nithios-servicios-consultoria-y-desarrollo-de-software-og.png';
import consultoria from '@/assets/og/nithios-consultoria-tecnologica-colombia-og.png';
import desarrollo from '@/assets/og/nithios-desarrollo-de-software-a-medida-colombia-og.png';
import portafolio from '@/assets/og/nithios-portafolio-software-a-medida-og.png';
import ceo from '@/assets/og/jonathan-osorio-ceo-fundador-nithios-og.png';
import contacto from '@/assets/og/nithios-contacto-whatsapp-og.png';
import preguntas from '@/assets/og/nithios-preguntas-frecuentes-og.png';
import guias from '@/assets/og/nithios-guias-de-tecnologia-para-empresas-og.png';
import privacidad from '@/assets/og/nithios-politica-de-privacidad-datos-personales-og.png';

export interface PageOg {
  src: ImageMetadata;
  alt: string;
}

/** Clave = ruta de la página (igual a `path` de BaseLayout). */
export const pageOg = {
  '/servicios/': {
    src: servicios,
    alt: 'Servicios de Nithios: tarjetas de consultoría tecnológica y desarrollo de software a medida sobre fondo negro y dorado',
  },
  '/servicios/consultoria-tecnologica/': {
    src: consultoria,
    alt: 'Consultoría tecnológica de Nithios: los cuatro pasos de trabajo, de la conversación inicial a la implementación acompañada',
  },
  '/servicios/desarrollo-de-software-a-medida/': {
    src: desarrollo,
    alt: 'Desarrollo de software a medida de Nithios: capturas de prototipos de comercio internacional y de optimización de cargue',
  },
  '/portafolio/': {
    src: portafolio,
    alt: 'Portafolio de Nithios: capturas de Chelato Toons, Dragon Global Trade, la plataforma logística y la de transporte audiovisual',
  },
  '/jonathan-osorio/': {
    src: ceo,
    alt: 'Retrato en blanco y negro de Jonathan Osorio junto a su nombre y el cargo CEO y Fundador de Nithios',
  },
  '/contacto/': {
    src: contacto,
    alt: 'Contacto de Nithios por WhatsApp: mensaje de ejemplo y el número +57 305 302 7559',
  },
  '/guias/': {
    src: guias,
    alt: 'Guías de Nithios para decidir mejor sobre tecnología: software a medida, CTO externo, IA y transformación digital',
  },
  '/politica-de-privacidad/': {
    src: privacidad,
    alt: 'Política de privacidad de Nithios según la Ley 1581 de 2012: sin cookies ni analítica y datos usados solo para responderte',
  },
  '/preguntas-frecuentes/': {
    src: preguntas,
    alt: 'Preguntas frecuentes de Nithios sobre consultoría tecnológica y desarrollo de software a medida',
  },
} satisfies Record<string, PageOg>;

export type PageOgPath = keyof typeof pageOg;

/* ---------- OG automáticas (servicios específicos y guías) ---------- */

/** Convención de nombre (debe coincidir con scripts/generate-og-images.mjs). */
export const servicePageOgFile = (slug: string) => `nithios-${slug}-colombia-og.png`;
export const guideOgFile = (slug: string) => `${slug}-guia-nithios-og.png`;

const generatedOg = import.meta.glob<{ default: ImageMetadata }>('/src/assets/og/*-og.png', { eager: true });

/** PNG generado por `npm run og` (undefined si aún no se ha generado). */
export function generatedOgImage(file: string): ImageMetadata | undefined {
  return generatedOg[`/src/assets/og/${file}`]?.default;
}

/** Recorta un alt a ≤ 140 car. sin cortar palabras. */
export function clampAlt(text: string, max = 140): string {
  if (text.length <= max) return text;
  return text.slice(0, max - 1).replace(/\s+\S*$/, '') + '…';
}

export const servicePageOgAlt = (name: string, h1: string) =>
  clampAlt(`${name}, servicio de Nithios en Colombia: «${h1}» y lo que incluye, en dorado sobre negro`);

export const guideOgAlt = (title: string) => clampAlt(`Guía de Nithios: «${title}» y los temas que cubre, en dorado sobre negro`);
