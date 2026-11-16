/**
 * Builders de datos estructurados JSON-LD (schema.org).
 * BaseLayout inyecta SIEMPRE organization() + website() + person() + webPage().
 * Las páginas agregan lo específico vía la prop `jsonLd` de BaseLayout.
 * REGLA: nada de aggregateRating, reviews, address ni datos no confirmados.
 */
import { site, absoluteUrl, waLink, cities } from '@/data/site';
import { services, type Service } from '@/data/services';
import type { Project } from '@/data/projects';
import { ceo } from '@/data/ceo';
import type { Faq } from '@/data/faqs';

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
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@id': ids.service(s.path) },
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

/** Person: Jonathan Osorio. Solo incluye arrays si tienen datos reales. `image`: URL optimizada (src/lib/images.ts). */
/** Códigos BCP 47 de los idiomas que se publican en `ceo.languages`. */
const languageCodes: Record<string, string> = { Español: 'es', Inglés: 'en' };

export function person(image?: string): JsonLd {
  return stripUndefined({
    '@type': 'Person',
    '@id': ids.person,
    name: ceo.fullName,
    alternateName: ceo.name !== ceo.fullName ? ceo.name : undefined,
    givenName: ceo.givenName,
    familyName: ceo.familyNames,
    jobTitle: ceo.jobTitle,
    disambiguatingDescription: ceo.professionalHeadline || undefined,
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
      ? ceo.languages.map((name) => ({ '@type': 'Language', name, alternateName: languageCodes[name] }))
      : undefined,
    description: ceo.summary,
    url: absoluteUrl(ceo.path),
    image: image ? absoluteUrl(image) : undefined,
    worksFor: { '@id': ids.organization },
    knowsAbout: ceo.focusAreas,
    alumniOf: ceo.education.length
      ? ceo.education.map((e) => ({ '@type': 'EducationalOrganization', name: e.institution }))
      : undefined,
    hasCredential: ceo.certifications.length
      ? ceo.certifications.map((c) => ({
          '@type': 'EducationalOccupationalCredential',
          name: c.name,
          credentialCategory: 'certificate',
          recognizedBy: { '@type': 'Organization', name: c.issuer },
          dateCreated: c.isoDate,
        }))
      : undefined,
    sameAs: ceo.sameAs.length ? ceo.sameAs : undefined,
  });
}

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

export function allServices(): JsonLd[] {
  return services.map(service);
}

/**
 * CreativeWork por caso del portafolio. NO SoftwareApplication: Google lo trata como rich result que exige
 * offers + aggregateRating/review (datos que no existen) y Dragon es un prototipo de interfaz.
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
    keywords: [...p.highlights, ...p.stack].join(', '),
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
export function faqPage(items: Faq[], path = '/preguntas-frecuentes/'): JsonLd {
  return {
    '@type': 'FAQPage',
    '@id': ids.faq(path),
    inLanguage: site.lang,
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
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
