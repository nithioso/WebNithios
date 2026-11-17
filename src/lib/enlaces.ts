/**
 * Resolución del enlazado interno entre servicios (líneas + específicos), guías y casos.
 * Los slugs vienen tipados de src/data/mapa-contenido.ts; si una página planificada aún no existe, se omite sin error
 * (el enlace aparece solo cuando se publique).
 */
import type { IconName } from '@/lib/icons';
import { getService } from '@/data/services';
import { getServicePage, servicePagePath } from '@/data/servicios';
import { getProject, type Project } from '@/data/projects';
import { getGuide, guidePath, readingMinutes } from '@/lib/guias';

export interface ServiceLink {
  slug: string;
  name: string;
  path: string;
  summary: string;
  icon: IconName;
  /** true = página de línea (consultoría o desarrollo). */
  isLine: boolean;
}

export interface GuideLink {
  slug: string;
  title: string;
  path: string;
  summary: string;
  description: string;
  minutes: number;
}

/** Servicio (línea o específico) por slug, como enlace. */
export function serviceLink(slug: string): ServiceLink | undefined {
  const line = getService(slug);
  if (line) return { slug, name: line.shortName, path: line.path, summary: line.summary, icon: line.icon, isLine: true };
  const p = getServicePage(slug);
  if (p) return { slug, name: p.name, path: servicePagePath(p.slug), summary: p.summary, icon: p.icon, isLine: false };
  return undefined;
}

export function serviceLinks(slugs: readonly string[] = []): ServiceLink[] {
  return [...new Set(slugs)].map(serviceLink).filter((x): x is ServiceLink => Boolean(x));
}

export async function guideLinks(slugs: readonly string[] = []): Promise<GuideLink[]> {
  const out: GuideLink[] = [];
  for (const slug of new Set(slugs)) {
    const g = await getGuide(slug);
    if (g)
      out.push({
        slug,
        title: g.data.title,
        path: guidePath(g.id),
        summary: g.data.summary,
        description: g.data.description,
        minutes: readingMinutes(g),
      });
  }
  return out;
}

export function projectLinks(slugs: readonly string[] = []): Project[] {
  return [...new Set(slugs)].map((s) => getProject(s)).filter((p): p is Project => Boolean(p));
}
