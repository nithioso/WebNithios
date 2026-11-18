/**
 * Servicios específicos (/servicios/<slug>/). Reúne automáticamente cada src/data/servicios/<slug>.ts
 * (import.meta.glob eager): añadir un archivo basta para publicar la página, listarla en /servicios/ y en su
 * línea, y generar su OG con `npm run og`. Valida longitudes y estructura en el build (errores claros).
 * Contrato: docs/CONTENIDO.md.
 */
import { lineSlugs, lineSlugByParent, servicePageSlugs, type LineSlug, type ServiceLine } from '@/data/mapa-contenido';
import type { ServicePage } from './types';

export type * from './types';

const modules = import.meta.glob<{ default: ServicePage }>(['./*.ts', '!./index.ts', '!./types.ts'], { eager: true });

const SUFFIX = ' | Nithios';
const fullTitle = (t: string) => (t.includes('Nithios') ? t : t + SUFFIX);

function validate(file: string, p: ServicePage): void {
  const errs: string[] = [];
  const fileSlug = file.replace(/^\.\//, '').replace(/\.ts$/, '');
  if (p.slug !== fileSlug) errs.push(`slug «${p.slug}» ≠ nombre de archivo «${fileSlug}»`);
  if (!(servicePageSlugs as readonly string[]).includes(p.slug)) errs.push('slug no registrado en src/data/mapa-contenido.ts');
  if ((lineSlugs as readonly string[]).includes(p.slug)) errs.push('el slug choca con una página de línea');
  if (fullTitle(p.seoTitle).length > 60) errs.push(`seoTitle > 60 car. con sufijo (${fullTitle(p.seoTitle).length})`);
  const d = p.seoDescription.length;
  if (d < 140 || d > 160) errs.push(`seoDescription fuera de 140–160 car. (${d})`);
  if (p.ogDescription.length > 125) errs.push(`ogDescription > 125 car. (${p.ogDescription.length})`);
  if (p.ogTagline.length > 60) errs.push(`ogTagline > 60 car. (${p.ogTagline.length})`);
  if (p.ogCta && p.ogCta.length > 34) errs.push(`ogCta > 34 car. (${p.ogCta.length})`);
  if (p.h1Highlight && !p.h1.includes(p.h1Highlight)) errs.push('h1Highlight no es un fragmento literal de h1');
  if (p.faqs.length < 5 || p.faqs.length > 6) errs.push(`faqs debe tener 5–6 preguntas (${p.faqs.length})`);
  if (p.ogAlt && p.ogAlt.length > 140) errs.push(`ogAlt > 140 car. (${p.ogAlt.length})`);
  const s = p.sections;
  const min: [string, number, number][] = [
    ['audience', s.audience.items.length, 3],
    ['problems', s.problems.items.length, 3],
    ['includes', s.includes.items.length, 3],
    ['process', s.process.items.length, 3],
    ['deliverables', s.deliverables.items.length, 3],
    ['signals', s.signals.items.length, 3],
    ['notAFit', s.notAFit.items.length, 2],
  ];
  for (const [k, n, m] of min) if (n < m) errs.push(`sections.${k} necesita al menos ${m} ítems (${n})`);
  if (errs.length) throw new Error(`[servicios] src/data/servicios/${fileSlug}.ts:\n  - ${errs.join('\n  - ')}`);
}

const groupOrder: Record<ServiceLine, number> = { consultoria: 0, desarrollo: 1, ambas: 2 };

/** Todos los servicios específicos publicados, ordenados por grupo y `order`. */
export const servicePages: ServicePage[] = Object.entries(modules)
  .map(([file, mod]) => {
    validate(file, mod.default);
    return mod.default;
  })
  .sort((a, b) => groupOrder[a.parent] - groupOrder[b.parent] || a.order - b.order || a.name.localeCompare(b.name, 'es'));

/** Ruta pública de un servicio específico. */
export const servicePagePath = (slug: string) => `/servicios/${slug}/`;

export function getServicePage(slug: string): ServicePage | undefined {
  return servicePages.find((p) => p.slug === slug);
}

/** Servicios específicos de un grupo exacto (consultoria | desarrollo | ambas). */
export function servicePagesByParent(parent: ServiceLine): ServicePage[] {
  return servicePages.filter((p) => p.parent === parent);
}

/** Servicios específicos que pertenecen a una página de línea (incluye los de 'ambas'). */
export function servicePagesForLine(line: LineSlug): ServicePage[] {
  return servicePages.filter((p) => p.parent === 'ambas' || lineSlugByParent[p.parent] === line);
}

/** Grupos para listados (/servicios/): solo los que tienen servicios. */
export function servicePageGroups(): { parent: ServiceLine; items: ServicePage[] }[] {
  return (['consultoria', 'desarrollo', 'ambas'] as const)
    .map((parent) => ({ parent, items: servicePagesByParent(parent) }))
    .filter((g) => g.items.length > 0);
}
