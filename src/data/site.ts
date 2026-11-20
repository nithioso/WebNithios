/**
 * Datos globales del sitio. Fuente única de verdad para nombre, URL,
 * contacto (WhatsApp), navegación y cobertura.
 * REGLA: no agregar correos, direcciones, redes ni cifras que no estén confirmados.
 */

export const site = {
  name: 'Nithios',
  url: 'https://nithios.com',
  domain: 'nithios.com',
  lang: 'es-CO',
  locale: 'es_CO',
  country: 'Colombia',
  countryCode: 'CO',
  tagline: 'Consultoría tecnológica y desarrollo de software a medida en Colombia',
  description:
    'Nithios es una empresa de tecnología colombiana: consultoría tecnológica para adoptar tecnología y mejorar procesos, y desarrollo de software a medida con nuevas tecnologías.',
  /** Imagen Open Graph por defecto (1200×630) en /public. */
  defaultOgImage: '/og-default.png',
  /** Texto alternativo de og-default.png (qué muestra la imagen). */
  defaultOgImageAlt:
    'Logo de Nithios, «Consultoría tecnológica y software a medida» en dorado sobre negro y el botón Hablemos por WhatsApp',
  themeColor: '#000000',
  /**
   * Contenedor de Google Tag Manager (docs/ANALITICA.md). Vacío ⇒ no se carga GTM, no hay banner de cookies
   * ni enlace «Preferencias de cookies». Solo se carga en los hosts de `analyticsHosts` (nunca en localhost ni vistas previas).
   */
  gtmId: 'GTM-TQBGPNW3',
  analyticsHosts: ['nithios.com', 'www.nithios.com'],
  founder: 'Jonathan Osorio',
  whatsapp: {
    /** Formato E.164 sin '+', usado por wa.me */
    number: '573053027559',
    e164: '+573053027559',
    display: '+57 305 302 7559',
    defaultMessage: 'Hola Nithios, quiero hablar sobre un proyecto de tecnología para mi empresa.',
  },
} as const;

/**
 * Genera un enlace de WhatsApp con mensaje prellenado y codificado.
 * @example waLink('Hola, quiero una consultoría tecnológica')
 */
export function waLink(message: string = site.whatsapp.defaultMessage): string {
  return `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

/** Construye la URL absoluta canónica de una ruta interna ('/servicios/' → 'https://nithios.com/servicios/'). */
export function absoluteUrl(path: string = '/'): string {
  return new URL(path, site.url).toString();
}

export interface NavItem {
  label: string;
  href: string;
  /** Texto descriptivo opcional para lectores de pantalla o menús enriquecidos. */
  description?: string;
}

/** Navegación principal (Header y menú móvil). */
export const nav: NavItem[] = [
  { label: 'Servicios', href: '/servicios/', description: 'Consultoría tecnológica y desarrollo a medida' },
  { label: 'Portafolio', href: '/portafolio/', description: 'Plataformas y aplicaciones desarrolladas' },
  { label: 'Guías', href: '/guias/', description: 'Guías para decidir mejor sobre tecnología' },
  { label: 'Fundador', href: '/jonathan-osorio/', description: 'Jonathan Osorio, CEO y Fundador' },
  { label: 'Preguntas', href: '/preguntas-frecuentes/', description: 'Respuestas claras antes de empezar' },
  { label: 'Contacto', href: '/contacto/', description: 'Hablemos por WhatsApp' },
];

/** Enlaces legales / secundarios (Footer). */
export const legalNav: NavItem[] = [
  { label: 'Política de privacidad', href: '/politica-de-privacidad/' },
];

/** Ciudades que se mencionan de forma natural. Cobertura: toda Colombia, atención remota. */
export const cities = [
  'Bogotá',
  'Medellín',
  'Cali',
  'Barranquilla',
  'Bucaramanga',
  'Cartagena',
  'Pereira',
] as const;

export type City = (typeof cities)[number];

/** Texto estándar de cobertura (dirección desde Medellín, cobertura nacional remota). */
export const coverage = {
  short: 'Atención remota en toda Colombia',
  long: `Trabajamos desde Medellín y atendemos de forma remota a empresas de toda Colombia: ${cities.join(', ')} y cualquier otra ciudad.`,
} as const;
