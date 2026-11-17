/**
 * Textos de la página índice /guias/. Las guías en sí viven en src/content/guias/*.md (docs/CONTENIDO.md).
 */
import type { GuideSlug } from './mapa-contenido';
export const guidesHub = {
  seoTitle: 'Guías de tecnología para empresas en Colombia',
  seoDescription:
    'Guías de Nithios para decidir mejor sobre tecnología: software a medida, CTO externo, inteligencia artificial y transformación digital en empresas de Colombia.',
  eyebrow: 'Guías',
  title: 'Guías para decidir mejor sobre tecnología',
  titleHighlight: 'decidir mejor',
  intro:
    'Respuestas claras a las preguntas que se hace una empresa antes de invertir en tecnología: qué opción conviene, qué preguntar, qué factores pesan y por dónde empezar. Sin tecnicismos innecesarios y sin promesas vacías.',
  listTitle: 'Todas las guías',
  listIntro: 'Cada guía empieza con una respuesta corta y termina con preguntas frecuentes, para que encuentres rápido lo que buscas.',
  whatsappMessage: 'Hola Nithios, leí sus guías y quiero hablar sobre la tecnología de mi empresa.',
  cta: {
    title: '¿Prefieres conversarlo?',
    text: 'Si tu pregunta no está en las guías, escríbenos por WhatsApp. Te ayudamos a ordenar el problema y a decidir el siguiente paso.',
  },
} as const;

/**
 * Guías destacadas fuera de /guias/ (bloque «Guías» de la home, /servicios/ y las páginas de línea).
 * Slugs tipados: si una guía aún no existe, simplemente no aparece.
 */
export const featuredGuides = {
  home: {
    title: 'Guías para decidir mejor sobre tecnología',
    intro: 'Antes de invertir, conviene tener claros los factores, las opciones y las preguntas correctas. Estas guías te ayudan aunque no trabajes con nosotros.',
    slugs: [
      'cuanto-cuesta-desarrollar-software-a-medida-en-colombia',
      'software-a-medida-vs-software-empaquetado',
      'como-empezar-con-inteligencia-artificial-en-tu-empresa',
    ],
  },
  servicios: {
    title: 'Guías para elegir bien el servicio',
    intro: 'Qué preguntar, qué factores pesan y cuándo conviene cada opción, explicado sin tecnicismos.',
    slugs: [
      'como-elegir-una-empresa-de-desarrollo-de-software-en-colombia',
      'que-es-un-cto-externo',
      'transformacion-digital-para-pymes-por-donde-empezar',
    ],
  },
  'consultoria-tecnologica': {
    title: 'Guías sobre consultoría y dirección de tecnología',
    intro: 'Para ordenar decisiones antes de contratar: por dónde empezar y qué tipo de acompañamiento necesitas.',
    slugs: [
      'que-es-un-cto-externo',
      'transformacion-digital-para-pymes-por-donde-empezar',
      'como-empezar-con-inteligencia-artificial-en-tu-empresa',
    ],
  },
  'desarrollo-de-software-a-medida': {
    title: 'Guías sobre desarrollo de software a medida',
    intro: 'Qué mueve el costo, cuándo conviene construir a la medida y cómo elegir con quién hacerlo.',
    slugs: [
      'cuanto-cuesta-desarrollar-software-a-medida-en-colombia',
      'software-a-medida-vs-software-empaquetado',
      'como-elegir-una-empresa-de-desarrollo-de-software-en-colombia',
    ],
  },
} as const satisfies Record<string, { title: string; intro: string; slugs: readonly GuideSlug[] }>;

export type FeaturedGuidesKey = keyof typeof featuredGuides;
