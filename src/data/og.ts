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
    alt: 'Servicios de Nithios: «Tecnología que mejora tus procesos», sus líneas de servicio y el botón Hablemos por WhatsApp',
  },
  '/servicios/consultoria-tecnologica/': {
    src: consultoria,
    alt: 'Consultoría tecnológica de Nithios: «Decide mejor qué tecnología adoptar», los cuatro pasos y el botón de WhatsApp',
  },
  '/servicios/desarrollo-de-software-a-medida/': {
    src: desarrollo,
    alt: 'Desarrollo de software a medida de Nithios: «Software hecho para tu operación, no al revés» junto a un prototipo',
  },
  '/portafolio/': {
    src: portafolio,
    alt: 'Portafolio de Nithios: «Software que diseñamos y construimos» con capturas de cuatro casos y el botón Ver el portafolio',
  },
  '/jonathan-osorio/': {
    src: ceo,
    alt: 'Retrato en blanco y negro de Jonathan Osorio, CEO y Fundador de Nithios, con el botón Agenda una conversación',
  },
  '/contacto/': {
    src: contacto,
    alt: 'Contacto de Nithios: «Hablemos por WhatsApp», el número +57 305 302 7559 y un mensaje de ejemplo',
  },
  '/guias/': {
    src: guias,
    alt: 'Guías de Nithios para decidir mejor sobre tecnología: software a medida, CTO externo, IA y transformación digital',
  },
  '/politica-de-privacidad/': {
    src: privacidad,
    alt: 'Política de privacidad de Nithios según la Ley 1581 de 2012: sin cookies ni analítica y datos solo para responderte',
  },
  '/preguntas-frecuentes/': {
    src: preguntas,
    alt: 'Preguntas frecuentes de Nithios: «Respuestas claras antes de empezar» y cuatro preguntas habituales',
  },
} satisfies Record<string, PageOg>;

export type PageOgPath = keyof typeof pageOg;

/**
 * og:description de las páginas fijas (≤ 125 car., con gancho, frase completa). Las vistas previas sociales muestran
 * ~125 car. en móvil; la meta description (140–160) sigue siendo la de buscadores. Servicios específicos, guías y casos
 * llevan la suya en su propio dato (`ogDescription`). BaseLayout la toma de aquí por `path`.
 */
export const pageSocial = {
  '/': 'Consultoría tecnológica y desarrollo de software a medida para empresas de toda Colombia. Cuéntanos tu proyecto.',
  '/servicios/': 'Consultoría para decidir qué tecnología adoptar y desarrollo a medida para construirla. Elige por dónde empezar.',
  '/servicios/consultoria-tecnologica/':
    'Decide qué tecnología adoptar, en qué orden y cómo implementarla, con un diagnóstico y un plan claros para tu empresa.',
  '/servicios/desarrollo-de-software-a-medida/':
    'Plataformas web, apps móviles y sistemas de gestión hechos para tu operación. Desarrollo a medida en toda Colombia.',
  '/portafolio/': 'Un videojuego en línea para una marca, prototipos de comercio exterior, logística y transporte, y software para consultorios.',
  '/guias/': 'Guías claras para decidir sobre software a medida, CTO externo, inteligencia artificial y transformación digital.',
  '/jonathan-osorio/': 'CTO y líder de innovación con casi 20 años en retail, educación y servicios. Conoce al CEO y Fundador de Nithios.',
  '/contacto/': 'Escríbenos por WhatsApp al +57 305 302 7559 y cuéntanos tu proyecto. Atención remota para empresas de toda Colombia.',
  '/preguntas-frecuentes/': 'Qué hace Nithios, cómo trabaja, cuánto cuesta un proyecto y cómo empezar: respuestas claras antes de escribirnos.',
  '/politica-de-privacidad/': 'Sin cookies ni analítica: qué datos tratamos cuando nos escribes, para qué los usamos y cómo ejercer tus derechos.',
} satisfies Record<string, string>;

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

export const servicePageOgAlt = (name: string) =>
  clampAlt(`${name}, servicio de Nithios en Colombia: lo que incluye y el botón para escribir por WhatsApp`);

export const guideOgAlt = (title: string) => clampAlt(`Guía de Nithios: «${title}», los temas que cubre y el botón Lee la guía`);
