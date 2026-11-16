/**
 * Imágenes Open Graph (1200×630) por página + su texto alternativo (og:image:alt / twitter:image:alt).
 * Las PNG se generan con `npm run og` (scripts/generate-og-images.mjs) y Astro las publica como JPEG optimizado
 * (`pageOgImage()` en src/lib/images.ts). Los casos de portafolio llevan la suya en projects.ts (`ogImage`).
 * Home y páginas sin entrada usan public/og-default.png (`site.defaultOgImage` + `site.defaultOgImageAlt`).
 * Alt: qué muestra la imagen + contexto, natural y ≤ ~140 caracteres.
 */
import type { ImageMetadata } from 'astro';
import servicios from '@/assets/og/nithios-servicios-consultoria-y-desarrollo-de-software-og.png';
import consultoria from '@/assets/og/nithios-consultoria-tecnologica-colombia-og.png';
import desarrollo from '@/assets/og/nithios-desarrollo-de-software-a-medida-colombia-og.png';
import portafolio from '@/assets/og/nithios-portafolio-software-a-medida-og.png';
import ceo from '@/assets/og/jonathan-osorio-ceo-fundador-nithios-og.png';
import contacto from '@/assets/og/nithios-contacto-whatsapp-og.png';
import preguntas from '@/assets/og/nithios-preguntas-frecuentes-og.png';

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
    alt: 'Portafolio de Nithios: capturas de Dragon Global Trade, la plataforma logística, la de transporte audiovisual y Krystal',
  },
  '/jonathan-osorio/': {
    src: ceo,
    alt: 'Retrato en blanco y negro de Jonathan Osorio junto a su nombre y el cargo CEO y Fundador de Nithios',
  },
  '/contacto/': {
    src: contacto,
    alt: 'Contacto de Nithios por WhatsApp: mensaje de ejemplo y el número +57 305 302 7559',
  },
  '/preguntas-frecuentes/': {
    src: preguntas,
    alt: 'Preguntas frecuentes de Nithios sobre consultoría tecnológica y desarrollo de software a medida',
  },
} satisfies Record<string, PageOg>;

export type PageOgPath = keyof typeof pageOg;
