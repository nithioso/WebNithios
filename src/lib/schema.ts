/**
 * Builders de datos estructurados JSON-LD (schema.org).
 * BaseLayout inyecta SIEMPRE organization() + website() + person() + webPage().
 * Las páginas agregan lo específico vía la prop `jsonLd` de BaseLayout.
 * REGLA: nada de aggregateRating, reviews, address ni datos no confirmados.
 */
import { site, absoluteUrl, waLink, cities } from '@/data/site';
import { services, type Service } from '@/data/services';
import type { Project } from '@/data/projects';
import { ceo, ceoPage, ceoCurrentRole } from '@/data/ceo';
import type { Faq } from '@/data/faqs';
import { servicePages, servicePagePath, type ServicePage } from '@/data/servicios';
import { lineSlugByParent } from '@/data/mapa-contenido';
import { stripLinks } from '@/lib/text';

export type JsonLd = Record<string, unknown>;

/** IDs estables para enlazar nodos entre sí. */
export const ids = {
  organization: `${site.url}/#organization`,
  website: `${site.url}/#website`,
  person: `${absoluteUrl(ceo.path)}#person`,
  logo: `${site.url}/#logo`,
  webpage: (path: string) => `${absoluteUrl(path)}#webpage`,
  breadcrumb: (path: string) => `${absoluteUrl(path)}#breadcrumb`,
  service: (path: string) => `${absoluteUrl(path)}#service`,
  project: (path: string) => `${absoluteUrl(path)}#software`,
  faq: (path: string) => `${absoluteUrl(path)}#faq`,
  article: (path: string) => `${absoluteUrl(path)}#article`,
};

const areaServed = [
  { '@type': 'Country', name: 'Colombia' },
  ...cities.map((name) => ({ '@type': 'City', name, containedInPlace: { '@type': 'Country', name: 'Colombia' } })),
];

/** Organization + ProfessionalService (sin dirección física). */
export function organization(): JsonLd {
  return {
    '@type': ['Organization', 'ProfessionalService'],
    '@id': ids.organization,
    name: site.name,
    url: site.url,
    description: site.description,
    slogan: site.tagline,
    logo: {
      '@type': 'ImageObject',
      '@id': ids.logo,
      url: absoluteUrl('/icon-512.png'),
      width: 512,
      height: 512,
      caption: site.name,
    },
    image: absoluteUrl(site.defaultOgImage),
    founder: { '@id': ids.person },
    areaServed,
    knowsLanguage: ['es-CO'],
    telephone: site.whatsapp.e164,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        telephone: site.whatsapp.e164,
        url: waLink(),
        availableLanguage: ['Spanish'],
        areaServed: 'CO',
      },
    ],
    knowsAbout: [
      'Consultoría tecnológica',
      'Transformación digital',
      'Desarrollo de software a medida',
      'Desarrollo de aplicaciones web',
      'Desarrollo de aplicaciones móviles',
      'Inteligencia artificial para empresas',
      'Automatización de procesos',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servicios de Nithios',
      itemListElement: [...services.map((s) => s.path), ...servicePages.map((p) => servicePagePath(p.slug))].map((path) => ({
        '@type': 'Offer',
        itemOffered: { '@id': ids.service(path) },
      })),
    },
  };
}

export function website(): JsonLd {
  return {
    '@type': 'WebSite',
    '@id': ids.website,
    url: site.url,
    name: site.name,
    description: site.description,
    inLanguage: site.lang,
    publisher: { '@id': ids.organization },
  };
}

export interface WebPageInput {
  path: string;
  title: string;
  description: string;
  /** Tipo específico: 'WebPage' | 'AboutPage' | 'ContactPage' | 'FAQPage' | 'CollectionPage' | 'ProfilePage' */
  type?: string | string[];
  image?: string;
  /** Si la página tiene breadcrumbs (enlaza el nodo BreadcrumbList). */
  hasBreadcrumb?: boolean;
  /** @id de la entidad principal de la página (servicio, persona, proyecto…). */
  mainEntityId?: string;
  /** @id del tema de la página. Por defecto la organización (ProfilePage → persona). */
  aboutId?: string;
}

export function webPage(input: WebPageInput): JsonLd {
  const url = absoluteUrl(input.path);
  return stripUndefined({
    '@type': input.type ?? 'WebPage',
    '@id': ids.webpage(input.path),
    url,
    name: input.title,
    description: input.description,
    inLanguage: site.lang,
    isPartOf: { '@id': ids.website },
    about: { '@id': input.aboutId ?? (isProfile(input.type) ? ids.person : ids.organization) },
    primaryImageOfPage: input.image ? { '@type': 'ImageObject', url: absoluteUrl(input.image) } : undefined,
    breadcrumb: input.hasBreadcrumb ? { '@id': ids.breadcrumb(input.path) } : undefined,
    mainEntity: input.mainEntityId ? { '@id': input.mainEntityId } : undefined,
  });
}

/**
 * Person: Jonathan Osorio. Solo incluye arrays si tienen datos reales. `image`: URL optimizada (src/lib/images.ts).
 * Reglas del usuario: SIN fechas y SIN nombres de empleadores (no hay worksFor de terceros; el cargo vigente
 * fuera de Nithios se publica solo como Occupation). alumniOf = instituciones de formación (sí se nombran).
 */
/**
 * Person compacto (resto de páginas): mismo @id que el completo, que solo se publica en /jonathan-osorio/.
 * Los buscadores unen ambos nodos por @id; así no se repiten ~5 KB de JSON-LD en cada página.
 */
export function personRef(image?: string): JsonLd {
  return stripUndefined({
    '@type': 'Person',
    '@id': ids.person,
    name: ceo.fullName,
    jobTitle: `${ceo.jobTitle} de ${ceo.company}`,
    url: absoluteUrl(ceo.path),
    image: image ? absoluteUrl(image) : undefined,
    worksFor: { '@id': ids.organization },
  });
}

/** Person completo (solo en la página del CEO; en las demás va personRef). */
export function person(image?: string): JsonLd {
  const occupations = [
    { name: `${ceo.jobTitle} de ${ceo.company}`, description: ceoPage.trajectory.nithios.text },
    ...(ceoCurrentRole ? [{ name: ceoCurrentRole.role, description: ceoCurrentRole.achievements[0] }] : []),
  ];
  return stripUndefined({
    '@type': 'Person',
    '@id': ids.person,
    name: ceo.fullName,
    alternateName: ceo.name !== ceo.fullName ? ceo.name : undefined,
    givenName: ceo.givenName,
    familyName: ceo.familyNames,
    jobTitle: occupations.map((o) => o.name),
    hasOccupation: occupations.map((o) => ({
      '@type': 'Occupation',
      name: o.name,
      description: o.description,
      occupationLocation: { '@type': 'Country', name: ceo.location.country },
    })),
    disambiguatingDescription: `${ceo.professionalHeadline}. ${ceo.credentialsSummary}.`,
    // Solo la ciudad de residencia de la persona; la empresa no publica dirección.
    homeLocation: {
      '@type': 'Place',
      name: `${ceo.location.locality}, ${ceo.location.region}, ${ceo.location.country}`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: ceo.location.locality,
        addressRegion: ceo.location.region,
        addressCountry: ceo.location.countryCode,
      },
    },
    knowsLanguage: ceo.languages.length
      ? ceo.languages.map((l) => ({ '@type': 'Language', name: l.name, alternateName: l.code }))
      : undefined,
    // Antecedentes de gobierno (pasados) en la descripción: `affiliation` no expresa tiempo por sí solo.
    description: [ceo.summary, ...ceo.governance.map((g) => g.statement)].join(' '),
    url: absoluteUrl(ceo.path),
    image: image ? absoluteUrl(image) : undefined,
    worksFor: { '@id': ids.organization },
    // Pertenencia PASADA a una junta (Asociación Drupal Colombia): `affiliation` y no `memberOf` (que se lee como vigente);
    // sin roleName ni fechas (no confirmados).
    affiliation: ceo.governance.length
      ? ceo.governance.map((g) => stripUndefined({ '@type': 'Organization', name: g.organization, url: g.url }))
      : undefined,
    knowsAbout: [...new Set([...ceo.focusAreas, ...ceo.knowsAbout])],
    alumniOf: ceo.education.length
      ? [...new Set(ceo.education.map((e) => e.institution))].map((name) => {
          const e = ceo.education.find((x) => x.institution === name);
          return stripUndefined({
            '@type': 'EducationalOrganization',
            name,
            address: e?.locality
              ? { '@type': 'PostalAddress', addressLocality: e.locality, addressCountry: ceo.location.countryCode }
              : undefined,
          });
        })
      : undefined,
    hasCredential: [
      ...ceo.education.map((e) => ({
        '@type': 'EducationalOccupationalCredential',
        name: e.degree,
        credentialCategory: 'degree',
        recognizedBy: { '@type': 'EducationalOrganization', name: e.institution },
      })),
      ...ceo.certifications.map((c) => ({
        '@type': 'EducationalOccupationalCredential',
        name: c.name,
        credentialCategory: 'certificate',
        recognizedBy: { '@type': 'Organization', name: c.issuer },
      })),
    ],
    sameAs: ceo.sameAs.length ? ceo.sameAs : undefined,
    // Servicios que presta personalmente (p. ej. miembro de junta directiva): oferta vigente, no un cargo actual en una junta.
    makesOffer: ceoServices.length
      ? ceoServices.map((sp) => ({
          '@type': 'Offer',
          name: sp.name,
          description: sp.summary,
          url: absoluteUrl(servicePagePath(sp.slug)),
          itemOffered: { '@id': ids.service(servicePagePath(sp.slug)) },
          areaServed: { '@type': 'Country', name: 'Colombia' },
        }))
      : undefined,
  });
}

/** Servicios específicos que presta personalmente el CEO (`providedByCeo`). */
const ceoServices = servicePages.filter((sp) => sp.providedByCeo);

/** Service por línea de servicio. */
export function service(s: Service): JsonLd {
  return {
    '@type': 'Service',
    '@id': ids.service(s.path),
    name: s.name,
    serviceType: s.shortName,
    description: s.summary,
    url: absoluteUrl(s.path),
    provider: { '@id': ids.organization },
    areaServed,
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: waLink(s.whatsappMessage),
      servicePhone: { '@type': 'ContactPoint', telephone: site.whatsapp.e164, contactType: 'sales' },
      availableLanguage: 'Spanish',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: s.name,
      itemListElement: s.capabilities.map((c) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: c.title, description: c.text },
      })),
    },
  };
}

/**
 * Service de un servicio específico (/servicios/<slug>/). `isRelatedTo` enlaza la(s) línea(s) madre.
 * Sin offers con precio (no hay precios publicados).
 */
export function servicePageNode(p: ServicePage): JsonLd {
  const path = servicePagePath(p.slug);
  const lines =
    p.parent === 'ambas' ? Object.values(lineSlugByParent) : [lineSlugByParent[p.parent]];
  return {
    '@type': 'Service',
    '@id': ids.service(path),
    name: p.name,
    alternateName: p.h1,
    serviceType: p.name,
    description: p.summary,
    url: absoluteUrl(path),
    // Servicio prestado personalmente por el CEO: la Person también figura como proveedor (sin afirmar cargos vigentes en juntas).
    provider: p.providedByCeo ? [{ '@id': ids.organization }, { '@id': ids.person }] : { '@id': ids.organization },
    areaServed,
    audience: { '@type': 'BusinessAudience', audienceType: 'Empresas en Colombia' },
    isRelatedTo: lines.map((slug) => ({ '@id': ids.service(`/servicios/${slug}/`) })),
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: waLink(p.whatsappMessage),
      servicePhone: { '@type': 'ContactPoint', telephone: site.whatsapp.e164, contactType: 'sales' },
      availableLanguage: 'Spanish',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `Servicios incluidos: ${p.name}`,
      itemListElement: p.sections.includes.items.map((c) => ({
        '@type': 'Offer',
        offeredBy: { '@id': ids.organization },
        itemOffered: { '@type': 'Service', name: c.title, description: c.text },
      })),
    },
  };
}

export interface ArticleInput {
  path: string;
  headline: string;
  description: string;
  abstract: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  keywords: string[];
  wordCount: number;
  minutes: number;
  /** Rutas de los servicios relacionados (→ about). */
  aboutPaths: string[];
}

/** Artículo de la sección Guías. Autor y editor = la organización Nithios (no una persona). */
export function article(a: ArticleInput): JsonLd {
  return stripUndefined({
    '@type': 'Article',
    '@id': ids.article(a.path),
    headline: a.headline,
    description: a.description,
    abstract: a.abstract,
    url: absoluteUrl(a.path),
    inLanguage: site.lang,
    datePublished: a.datePublished,
    dateModified: a.dateModified ?? a.datePublished,
    author: { '@id': ids.organization },
    publisher: { '@id': ids.organization },
    mainEntityOfPage: { '@id': ids.webpage(a.path) },
    isPartOf: { '@id': ids.website },
    image: a.image ? absoluteUrl(a.image) : undefined,
    keywords: a.keywords.join(', '),
    articleSection: 'Guías',
    wordCount: a.wordCount,
    timeRequired: `PT${a.minutes}M`,
    about: a.aboutPaths.length ? a.aboutPaths.map((p) => ({ '@id': ids.service(p) })) : undefined,
    spatialCoverage: { '@type': 'Country', name: 'Colombia' },
  });
}

export function allServices(): JsonLd[] {
  return services.map(service);
}

/**
 * CreativeWork por caso del portafolio. NO SoftwareApplication: Google lo trata como rich result que exige
 * offers + aggregateRating/review (datos que no existen) y los casos de comercio internacional, logística y transporte son prototipos de interfaz.
 * `image`: URL optimizada (projectOgImage), nunca el original.
 */
export function projectWork(p: Project, image?: string): JsonLd {
  return stripUndefined({
    '@type': 'CreativeWork',
    '@id': ids.project(p.path),
    name: p.name,
    description: p.summary,
    url: absoluteUrl(p.path),
    inLanguage: p.languages.map(languageCode).filter(Boolean),
    creator: { '@id': ids.organization },
    author: { '@id': ids.organization },
    genre: p.category,
    keywords: [...p.highlights, ...p.stack],
    // Producto en línea: su dominio público identifica la obra (p. ej. chelato.nithios.com).
    sameAs: p.liveUrl,
    abstract: `${p.headline} Funcionalidades: ${p.features.map((f) => f.title).join(', ')}.`,
    image: image ? absoluteUrl(image) : undefined,
    creativeWorkStatus: p.status === 'sin-especificar' ? undefined : p.statusLabel,
  });
}

/** ItemList para listados (portafolio, servicios). */
export function itemList(items: { name: string; path: string }[], name?: string): JsonLd {
  return stripUndefined({
    '@type': 'ItemList',
    name,
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      url: absoluteUrl(it.path),
    })),
  });
}

/** FAQPage. Pasa `path` para fijar el @id. */
export function faqPage(items: Pick<Faq, 'question' | 'answer'>[], path = '/preguntas-frecuentes/'): JsonLd {
  return {
    '@type': 'FAQPage',
    '@id': ids.faq(path),
    inLanguage: site.lang,
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: stripLinks(f.answer) },
    })),
  };
}

export interface Crumb {
  name: string;
  path: string;
}

/** BreadcrumbList. `items` NO incluye "Inicio": se agrega automáticamente. */
export function breadcrumbList(items: Crumb[], path: string): JsonLd {
  const all: Crumb[] = [{ name: 'Inicio', path: '/' }, ...items];
  return {
    '@type': 'BreadcrumbList',
    '@id': ids.breadcrumb(path),
    itemListElement: all.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

/** Une nodos en un único documento @graph. */
export function graph(nodes: JsonLd[]): JsonLd {
  return { '@context': 'https://schema.org', '@graph': nodes };
}

/* ------------------------------------------------------------------ */
function isProfile(type: WebPageInput['type']): boolean {
  return Array.isArray(type) ? type.includes('ProfilePage') : type === 'ProfilePage';
}

function languageCode(lang: string): string {
  const map: Record<string, string> = {
    Español: 'es',
    Inglés: 'en',
    Chino: 'zh',
    Portugués: 'pt',
    Francés: 'fr',
  };
  return map[lang] ?? '';
}

function stripUndefined<T extends Record<string, unknown>>(obj: T): T {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined)) as T;
}
