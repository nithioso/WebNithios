/**
 * Imágenes derivadas (OG y JSON-LD) generadas con astro:assets, nunca el original sin optimizar.
 * getImage deduplica: la misma llamada en varias páginas emite un solo archivo.
 */
import { getImage } from 'astro:assets';
import type { Project } from '@/data/projects';
import { ceo } from '@/data/ceo';

export interface OgImage {
  src: string;
  width: number;
  height: number;
  alt?: string;
}

/** OG 1200×630 del caso: `ogImage` (render) o la captura `cover`. Undefined si no hay ninguna. */
export async function projectOgImage(p: Project): Promise<OgImage | undefined> {
  const src = p.ogImage ?? p.cover;
  if (!src) return undefined;
  const img = await getImage({ src, width: 1200, height: 630, fit: 'cover', position: 'top', format: 'jpeg', quality: 82 });
  return {
    src: img.src,
    width: Number(img.attributes.width ?? 1200),
    height: Number(img.attributes.height ?? 630),
    alt: p.ogImage ? p.ogImageAlt : p.coverAlt,
  };
}

/** Foto del CEO optimizada (1200 px, JPEG) para JSON-LD y og:image. Undefined mientras no haya foto. */
export async function ceoPhotoUrl(): Promise<string | undefined> {
  if (!ceo.photo) return undefined;
  return (await getImage({ src: ceo.photo, width: 1200, format: 'jpeg', quality: 82 })).src;
}
