/**
 * Perfil del CEO y Fundador.
 * REGLA ANTI-ALUCINACIÓN: experiencia, educación, certificaciones, sectores,
 * logros, foto y perfiles sociales quedan VACÍOS hasta recibir datos reales.
 * La UI debe ocultar cada sección cuyo arreglo esté vacío. Ver docs/PENDIENTES.md.
 */
import type { ImageMetadata } from 'astro';
import type { IconName } from '@/lib/icons';

export interface ExperienceItem {
  role: string;
  organization: string;
  /** Texto libre del periodo, ej. "2015 – 2020". */
  period: string;
  sector?: string;
  description?: string;
  achievements?: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period?: string;
  description?: string;
}

export interface CertificationItem {
  name: string;
  issuer: string;
  year?: string;
}

export interface Ceo {
  name: string;
  givenName: string;
  familyName: string;
  jobTitle: string;
  company: string;
  path: string;
  /** Experiencia expresada tal como está confirmada. */
  experienceSummary: string;
  /** Titular para el hero de la página. */
  headline: string;
  /** Resumen corto (meta, schema, tarjetas). */
  summary: string;
  /** Párrafos de biografía (solo hechos confirmados + visión de Nithios). */
  bio: string[];
  /** Cita / visión atribuible. Vacía hasta que el CEO la apruebe. */
  quote: string;
  /** Áreas de liderazgo dentro de Nithios (derivadas de las líneas de servicio). */
  focusAreas: string[];
  /** Sectores en los que ha trabajado: PENDIENTE. */
  sectors: string[];
  experience: ExperienceItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
  /** Logros verificables: PENDIENTE. */
  achievements: string[];
  /** URLs de perfiles públicos (LinkedIn, etc.): PENDIENTE. */
  sameAs: string[];
  photo?: ImageMetadata;
  photoAlt?: string;
  seoTitle: string;
  seoDescription: string;
  whatsappMessage: string;
}

export const ceo: Ceo = {
  name: 'Jonathan Osorio',
  givenName: 'Jonathan',
  familyName: 'Osorio',
  jobTitle: 'CEO y Fundador',
  company: 'Nithios',
  path: '/jonathan-osorio/',
  experienceSummary: 'Casi 20 años de experiencia en diferentes sectores',
  headline: 'Liderazgo tecnológico con visión de negocio.',
  summary:
    'Jonathan Osorio es el CEO y Fundador de Nithios. Alto ejecutivo de tecnología con casi 20 años de experiencia en diferentes sectores y una amplia formación académica.',
  bio: [
    'Jonathan Osorio es el CEO y Fundador de Nithios. Es un alto ejecutivo de tecnología con casi 20 años de experiencia en diferentes sectores y una amplia formación académica que respalda su visión estratégica.',
    'Esa trayectoria le permite conectar dos mundos que muchas veces no se hablan: la estrategia de negocio y la ejecución técnica. Por eso fundó Nithios, una empresa de tecnología colombiana que acompaña a las organizaciones desde la decisión de qué tecnología adoptar hasta la construcción del software que la hace realidad.',
    'Bajo su liderazgo, Nithios trabaja en dos líneas complementarias: la asesoría y consultoría tecnológica para empresas que quieren mejorar sus procesos, y el desarrollo de aplicativos a la medida con nuevas tecnologías.',
  ],
  quote: '',
  /** Solo lo derivado de las líneas de servicio. Especialidades personales: PENDIENTE (docs/PENDIENTES.md). */
  focusAreas: [
    'Consultoría tecnológica',
    'Transformación digital',
    'Desarrollo de software a la medida',
    'Inteligencia artificial aplicada a empresas',
  ],
  sectors: [],
  experience: [],
  education: [],
  certifications: [],
  achievements: [],
  sameAs: [],
  photo: undefined,
  photoAlt: 'Jonathan Osorio, CEO y Fundador de Nithios',
  seoTitle: 'Jonathan Osorio, CEO y Fundador de Nithios',
  seoDescription:
    'Conoce a Jonathan Osorio, CEO y Fundador de Nithios: alto ejecutivo de tecnología con casi 20 años de experiencia en diferentes sectores y amplia formación.',
  whatsappMessage: 'Hola Jonathan, quiero conversar sobre un proyecto de tecnología para mi empresa.',
};

/* ------------------------------------------------------------------ */
/* Contenido editorial de /jonathan-osorio/                            */
/* Formulado como enfoque y postura de Nithios: sin cifras, empleadores */
/* ni logros no confirmados.                                           */
/* ------------------------------------------------------------------ */
export interface CeoBlock {
  title: string;
  text: string;
  icon?: IconName;
}

export interface CeoQa {
  question: string;
  answer: string;
}

export const ceoPage = {
  heroIntro:
    'Alto ejecutivo de tecnología con casi 20 años de experiencia en diferentes sectores. Fundó Nithios para que las empresas colombianas tomen mejores decisiones tecnológicas y las conviertan en software que funciona.',
  /** Datos de la ficha ejecutiva (solo hechos confirmados). */
  facts: [
    { label: 'Cargo', value: 'CEO y Fundador de Nithios' },
    { label: 'Experiencia', value: 'Casi 20 años en tecnología' },
    { label: 'Trayectoria', value: 'Diferentes sectores de la economía' },
    { label: 'Formación', value: 'Amplia formación académica' },
    { label: 'Cobertura', value: 'Empresas en toda Colombia' },
  ],
  profileTitle: 'Un ejecutivo que habla el idioma del negocio y el de la tecnología.',
  vision: {
    title: 'La tecnología vale por lo que mejora.',
    intro:
      'La filosofía de liderazgo de Jonathan Osorio es la misma que define a Nithios: primero entender el negocio, después elegir la tecnología. Estos son los principios con los que dirige cada proyecto.',
    principles: [
      {
        icon: 'target',
        title: 'Negocio antes que herramienta',
        text: 'Ninguna tecnología se recomienda por moda. Se parte del proceso que hay que mejorar, del resultado que se espera y de la realidad de cada empresa.',
      },
      {
        icon: 'compass',
        title: 'Claridad para decidir',
        text: 'Explicar sin tecnicismos qué conviene, qué cuesta en esfuerzo y qué riesgo implica cada camino, para que la dirección decida con información.',
      },
      {
        icon: 'shield',
        title: 'Calidad y seguridad desde el diseño',
        text: 'La seguridad, el rendimiento y la mantenibilidad no se agregan al final: se piensan desde la arquitectura del primer día.',
      },
      {
        icon: 'users',
        title: 'Compromiso de principio a fin',
        text: 'Acompañar desde el diagnóstico hasta la puesta en marcha, con comunicación directa y avances visibles en cada etapa.',
      },
    ] satisfies CeoBlock[],
    /** Postura institucional de Nithios (no es una cita atribuida a una persona). */
    statement:
      'Creemos que la transformación digital no empieza con software: empieza con una buena pregunta sobre el negocio. Nuestro trabajo es encontrar la respuesta correcta y construirla bien.',
  },
  domains: {
    title: 'Las áreas que lidera Nithios.',
    intro:
      'Bajo la dirección de Jonathan Osorio, Nithios concentra su trabajo en cuatro frentes que dan forma a su oferta de consultoría tecnológica y desarrollo de software a medida.',
    items: [
      {
        icon: 'compass',
        title: 'Estrategia tecnológica',
        text: 'Hojas de ruta que alinean la inversión en tecnología con los objetivos de la empresa y priorizan lo que genera valor primero.',
      },
      {
        icon: 'workflow',
        title: 'Transformación digital',
        text: 'Digitalización y automatización de procesos para que los equipos trabajen con menos fricción y más visibilidad.',
      },
      {
        icon: 'spark',
        title: 'Inteligencia artificial aplicada',
        text: 'Identificar dónde la IA aporta valor real en una empresa y llevarla a casos de uso concretos, medibles y responsables.',
      },
      {
        icon: 'layers',
        title: 'Desarrollo de software a la medida',
        text: 'Aplicativos web, móviles y plataformas construidos alrededor de los procesos de cada empresa, modulares y pensados para crecer.',
      },
    ] satisfies CeoBlock[],
  },
  method: {
    title: 'Así trabaja Nithios con cada empresa.',
    intro:
      'En Nithios, cada proyecto sigue un método claro desde la primera conversación. El objetivo es simple: que sepas qué hacer, por qué y cómo se va a construir.',
    steps: [
      {
        title: 'Escuchar el negocio',
        text: 'Una conversación para entender tus procesos, tus metas y lo que hoy te frena. Sin compromiso y sin jerga técnica.',
      },
      {
        title: 'Diagnosticar con criterio',
        text: 'Analizar tu situación tecnológica y definir qué conviene adoptar, mejorar o construir, con prioridades claras.',
      },
      {
        title: 'Diseñar la solución',
        text: 'Proponer el camino: consultoría para tomar decisiones o desarrollo a la medida para construir la herramienta que necesitas.',
      },
      {
        title: 'Acompañar la ejecución',
        text: 'Cuidar que lo acordado se entregue con calidad, con avances visibles y comunicación directa durante todo el proyecto.',
      },
    ] satisfies CeoBlock[],
  },
  /** Preguntas directas para buscadores y motores de IA (solo hechos confirmados). */
  qa: [
    {
      question: '¿Quién es Jonathan Osorio?',
      answer:
        'Jonathan Osorio es el CEO y Fundador de Nithios, empresa de tecnología colombiana. Es un alto ejecutivo de tecnología con casi 20 años de experiencia en diferentes sectores y una amplia formación académica.',
    },
    {
      question: '¿Qué hace Jonathan Osorio en Nithios?',
      answer:
        'Como CEO y Fundador, dirige la estrategia de Nithios y sus dos líneas de servicio: la asesoría y consultoría tecnológica para empresas que quieren mejorar sus procesos, y el desarrollo de software a medida con nuevas tecnologías.',
    },
    {
      question: '¿Cómo puedo hablar con Jonathan Osorio sobre un proyecto?',
      answer:
        'Puedes escribir al WhatsApp de Nithios, +57 305 302 7559, contando brevemente qué quieres lograr. La atención es remota para empresas de toda Colombia, desde Bogotá y Medellín hasta Cali, Barranquilla o Bucaramanga.',
    },
  ] satisfies CeoQa[],
};
