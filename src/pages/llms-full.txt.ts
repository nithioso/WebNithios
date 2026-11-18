/**
 * /llms-full.txt — versión COMPLETA del sitio en Markdown limpio para modelos de lenguaje (GEO).
 * Se GENERA en el build desde src/data y src/content/guias: no se edita a mano (el resumen corto es public/llms.txt).
 * Solo publica lo que ya está en la web (mismas reglas anti-alucinación; casos anonimizados; CEO sin fechas ni empleadores).
 */
import type { APIRoute } from 'astro';
import { site, cities, coverage, absoluteUrl } from '@/data/site';
import { services } from '@/data/services';
import { serviceDetails } from '@/data/service-details';
import { servicePages, servicePagePath } from '@/data/servicios';
import { sortedProjects } from '@/data/projects';
import { faqs, faqCategories, type FaqCategory } from '@/data/faqs';
import { ceo } from '@/data/ceo';
import { getGuides, guidePath, formatDate } from '@/lib/guias';
import { lineLabels } from '@/data/mapa-contenido';

const list = (items: readonly string[]) => items.map((x) => `- ${x}`).join('\n');
const titled = (items: readonly { title: string; text: string }[]) => list(items.map((x) => `**${x.title}.** ${x.text}`));
const qa = (items: readonly { question: string; answer: string }[]) => items.map((f) => `### ${f.question}\n\n${f.answer}`).join('\n\n');
/** Enlaces internos del Markdown de las guías → URL absolutas. */
const absLinks = (md: string) => md.replace(/\]\((\/[^)\s]*)\)/g, (_, p: string) => `](${absoluteUrl(p)})`);

export const GET: APIRoute = async () => {
  const out: string[] = [];
  const push = (...s: string[]) => out.push(...s, '');

  push(
    `# ${site.name} — contenido completo`,
    `> ${site.description} Se dirige desde Medellín y atiende de forma remota a empresas de toda Colombia. Único canal de contacto: WhatsApp ${site.whatsapp.display} (https://wa.me/${site.whatsapp.number}).`,
    `Este archivo se genera automáticamente con el contenido publicado en ${site.url}. Resumen corto: ${absoluteUrl('/llms.txt')}.`,
  );

  push(
    '## Datos clave',
    list([
      `Nombre: ${site.name}`,
      `Sitio oficial: ${site.url}`,
      'Tipo: empresa de tecnología (consultoría tecnológica y desarrollo de software a medida)',
      `País: ${site.country}`,
      `Cobertura: ${coverage.long}`,
      'Sin dirección física publicada; atención 100 % remota',
      `CEO y Fundador: ${ceo.fullName} (${absoluteUrl(ceo.path)})`,
      `Contacto: WhatsApp ${site.whatsapp.display}`,
      'Precios: no publica precios genéricos; cada propuesta se ajusta al alcance del caso',
      'Privacidad: el sitio no usa cookies ni analítica',
    ]),
  );

  /* ---------- Líneas de servicio ---------- */
  push('## Líneas de servicio');
  for (const s of services) {
    const d = serviceDetails.find((x) => x.slug === s.slug);
    push(`### ${s.name}`, `URL: ${absoluteUrl(s.path)}`, s.intro.join('\n\n'));
    if (d) {
      push(`#### ${d.whatIs.question}`, d.whatIs.answer, d.whatIs.paragraphs.join('\n\n'));
      push('#### Qué incluye', titled(d.inclusions));
      push('#### Proceso', d.process.map((p, i) => `${i + 1}. **${p.title}.** ${p.text}`).join('\n'));
      push('#### Entregables', titled(d.deliverables));
      if (d.faqs.length) push('#### Preguntas frecuentes', qa(d.faqs).replace(/^### /gm, '##### '));
    } else {
      push('#### Qué incluye', titled(s.capabilities));
    }
  }

  /* ---------- Servicios específicos ---------- */
  push('## Servicios específicos');
  for (const p of servicePages) {
    const s = p.sections;
    push(
      `### ${p.name}`,
      `URL: ${absoluteUrl(servicePagePath(p.slug))} · Línea: ${lineLabels[p.parent]}`,
      `**${p.h1}.** ${p.intro}`,
      `#### ${s.whatIs.title}`,
      s.whatIs.answer,
      s.whatIs.paragraphs.join('\n\n'),
      ...(s.profile
        ? [`#### ${s.profile.title}`, ...(s.profile.intro ? [s.profile.intro] : []), titled(s.profile.items), `Perfil completo: ${absoluteUrl(s.profile.link.href)}`]
        : []),
      ...(s.modalities
        ? [
            `#### ${s.modalities.title}`,
            ...(s.modalities.intro ? [s.modalities.intro] : []),
            list(s.modalities.items.map((x) => `**${x.title}.** ${x.text} Cuándo conviene: ${x.when}`)),
          ]
        : []),
      `#### ${s.audience.title}`,
      ...(s.audience.intro ? [s.audience.intro] : []),
      list(s.audience.items),
      `#### ${s.problems.title}`,
      titled(s.problems.items),
      `#### ${s.includes.title}`,
      list(s.includes.items.map((x) => `**${x.title}.** ${x.text}${x.points?.length ? ` (${x.points.join('; ')})` : ''}`)),
      `#### ${s.process.title}`,
      s.process.items.map((x, i) => `${i + 1}. **${x.title}.** ${x.text}`).join('\n'),
      `#### ${s.deliverables.title}`,
      titled(s.deliverables.items),
      `#### ${s.signals.title}`,
      list(s.signals.items),
      `#### ${s.notAFit.title}`,
      titled(s.notAFit.items),
    );
    if (s.technologies) push(`#### ${s.technologies.title}`, s.technologies.items.join(', ') + '.', ...(s.technologies.note ? [s.technologies.note] : []));
    push('#### Preguntas frecuentes', qa(p.faqs).replace(/^### /gm, '##### '));
  }

  /* ---------- Guías ---------- */
  push('## Guías');
  for (const g of await getGuides()) {
    const d = g.data;
    push(
      `### ${d.title}`,
      `URL: ${absoluteUrl(guidePath(g.id))} · Autor: equipo de ${site.name} · Publicada: ${formatDate(d.publishedAt)}${d.updatedAt ? ` · Actualizada: ${formatDate(d.updatedAt)}` : ''}`,
      `**Respuesta corta.** ${d.summary}`,
      // Sube un nivel los encabezados del cuerpo (## → ####) para que encajen bajo la guía.
      absLinks(g.body ?? '').trim().replace(/^(#{2,4}) /gm, (_, h: string) => `${'#'.repeat(Math.min(h.length + 2, 6))} `),
      '#### Preguntas frecuentes',
      qa(d.faqs).replace(/^### /gm, '##### '),
    );
  }

  /* ---------- Portafolio ---------- */
  push(
    '## Portafolio',
    'Chelato Toons es un producto en línea (videojuego web para una activación de marca; el nombre de la empresa se reserva). La plataforma de comercio internacional, la plataforma logística para acero y la plataforma de transporte audiovisual son prototipos navegables de interfaz con datos ficticios; los nombres de los clientes de los tres casos anonimizados se reservan por confidencialidad.',
  );
  for (const p of sortedProjects) {
    push(
      `### ${p.name}`,
      `URL: ${absoluteUrl(p.path)} · Categoría: ${p.category} · Estado: ${p.statusLabel}`,
      p.description.join('\n\n'),
      `**El reto.** ${p.challenge}`,
      `**Funcionalidades.**\n${titled(p.features)}`,
      ...(p.platforms.length ? [`Plataformas: ${p.platforms.join(', ')}.`] : []),
      ...(p.languages.length ? [`Idiomas de la interfaz: ${p.languages.join(', ')}.`] : []),
      ...(p.stack.length ? [`Tecnologías: ${p.stack.join(', ')}.`] : []),
      ...(p.security.length ? [`Seguridad: ${p.security.join('; ')}.`] : []),
      ...(p.statusNote ? [p.statusNote] : []),
    );
  }

  /* ---------- CEO ---------- */
  push(
    `## ${ceo.fullName}, ${ceo.jobTitle} de ${site.name}`,
    `URL: ${absoluteUrl(ceo.path)}`,
    ceo.bio.join('\n\n'),
    '### Resultados de su trayectoria',
    list(ceo.highlights.map((h) => `**${h.value} ${h.label}.** ${h.context}`)),
    '### Formación',
    list(ceo.education.map((e) => `${e.degree} — ${e.institution}`)),
    ...(ceo.certifications.length ? ['### Certificaciones', list(ceo.certifications.map((c) => `${c.name} — ${c.issuer}`))] : []),
    '### Idiomas',
    list(ceo.languages.map((l) => l.name)),
  );

  /* ---------- Preguntas frecuentes generales ---------- */
  push('## Preguntas frecuentes');
  for (const cat of Object.keys(faqCategories) as FaqCategory[]) {
    const items = faqs.filter((f) => f.category === cat);
    if (items.length) push(`### ${faqCategories[cat]}`, qa(items).replace(/^### /gm, '#### '));
  }

  push(
    '## Contacto',
    `WhatsApp ${site.whatsapp.display} — https://wa.me/${site.whatsapp.number} · Página de contacto: ${absoluteUrl('/contacto/')}`,
    `Ciudades atendidas de forma remota: ${cities.join(', ')} y cualquier otra ciudad de Colombia.`,
  );

  // absLinks también sobre FAQs y párrafos de src/data, que pueden llevar enlaces internos en Markdown.
  const body = absLinks(out.join('\n\n')).replace(/\n{3,}/g, '\n\n').trim() + '\n';
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
