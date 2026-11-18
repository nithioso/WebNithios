/**
 * Registro de slugs del mapa de contenido (servicios específicos, guías, líneas y casos).
 * Sirve para dos cosas:
 *  1. Tipar el enlazado interno (`related` de los servicios, `relatedServices`/`relatedGuides` de las guías):
 *     un slug mal escrito es un error de TypeScript (`npm run check`) y de zod (`npm run build`).
 *  2. Permitir enlazar páginas PLANIFICADAS que aún no existen: si el archivo todavía no está escrito, el enlace
 *     simplemente no se muestra; aparece solo cuando se publica la página. Así los redactores pueden trabajar en paralelo.
 * Para añadir una página nueva al mapa: agrega aquí su slug y luego crea su archivo (ver docs/CONTENIDO.md).
 * Sin alias `@/`: este módulo también lo importa src/content.config.ts.
 */

/** Las dos líneas de servicio (páginas estáticas de src/pages/servicios/). */
export const lineSlugs = ['consultoria-tecnologica', 'desarrollo-de-software-a-medida'] as const;
export type LineSlug = (typeof lineSlugs)[number];

/** Servicios específicos: /servicios/<slug>/ (src/data/servicios/<slug>.ts). */
export const servicePageSlugs = [
  'cto-externo',
  'inteligencia-artificial-para-empresas',
  'automatizacion-de-procesos',
  'desarrollo-de-aplicaciones-moviles',
  'desarrollo-de-plataformas-web',
  'modernizacion-de-sistemas',
  'miembro-de-junta-directiva-tecnologia',
] as const;
export type ServicePageSlug = (typeof servicePageSlugs)[number];

/** Cualquier página de servicio (línea o específica). */
export const anyServiceSlugs = [...lineSlugs, ...servicePageSlugs] as const;
export type AnyServiceSlug = (typeof anyServiceSlugs)[number];

/** Guías: /guias/<slug>/ (src/content/guias/<slug>.md). */
export const guideSlugs = [
  'cuanto-cuesta-desarrollar-software-a-medida-en-colombia',
  'software-a-medida-vs-software-empaquetado',
  'que-es-un-cto-externo',
  'como-empezar-con-inteligencia-artificial-en-tu-empresa',
  'como-elegir-una-empresa-de-desarrollo-de-software-en-colombia',
  'transformacion-digital-para-pymes-por-donde-empezar',
] as const;
export type GuideSlug = (typeof guideSlugs)[number];

/** Casos del portafolio (src/data/projects.ts). */
export const projectSlugs = ['chelato-toons', 'dragon-global-trade', 'plataforma-logistica-acero', 'plataforma-transporte-audiovisual', 'krystal'] as const;
export type ProjectSlug = (typeof projectSlugs)[number];

/** Línea a la que pertenece un servicio específico. 'ambas' = consultoría + desarrollo. */
export type ServiceLine = 'consultoria' | 'desarrollo' | 'ambas';

/** Slug de la página de cada línea. */
export const lineSlugByParent = {
  consultoria: 'consultoria-tecnologica',
  desarrollo: 'desarrollo-de-software-a-medida',
} as const satisfies Record<Exclude<ServiceLine, 'ambas'>, LineSlug>;

/** Etiquetas de agrupación (índice /servicios/, eyebrows). */
export const lineLabels: Record<ServiceLine, string> = {
  consultoria: 'Consultoría tecnológica',
  desarrollo: 'Desarrollo de software a medida',
  ambas: 'Consultoría + desarrollo',
};
