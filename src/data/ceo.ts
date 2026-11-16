/**
 * Perfil del CEO y Fundador.
 * REGLA ANTI-ALUCINACIÓN: solo datos confirmados. Fuentes: hoja de vida entregada por Jonathan (cargos, logros, formación,
 * habilidades, idiomas) + vista pública de LinkedIn (certificaciones y sameAs).
 * REGLAS DEL USUARIO (prevalecen):
 *  - SIN FECHAS en ninguna parte: ni años, ni periodos, ni duraciones (se conserva solo «casi 20 años» de experiencia total).
 *  - EMPLEADORES ANONIMIZADOS: nunca el nombre de una empresa o institución donde trabajó ni marcas que la identifiquen;
 *    solo los descriptores aprobados. Las instituciones de FORMACIÓN y las entidades certificadoras sí se nombran.
 *  - Sin correo ni teléfono personal (único contacto: WhatsApp de Nithios).
 * Foto y cita siguen VACÍAS hasta recibirlas (la UI oculta cada sección vacía). Ver docs/PENDIENTES.md.
 */
import type { ImageMetadata } from 'astro';
import type { IconName } from '@/lib/icons';
import photo from '@/assets/ceo/jonathan-osorio.jpg';

export interface ExperienceItem {
  role: string;
  /** Descriptor anonimizado de la organización (nunca su nombre). */
  organization: string;
  /** Cargo vigente (se marca como «Actual»). */
  current?: boolean;
  achievements: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  locality?: string;
}

export interface CertificationItem {
  name: string;
  issuer: string;
}

export interface CeoHighlight {
  /** Cifra tal como aparece en la hoja de vida. */
  value: string;
  /** Qué mide la cifra. */
  label: string;
  /** Contexto anonimizado. */
  context: string;
}

export interface CeoLanguage {
  name: string;
  /** Código BCP 47 (JSON-LD). */
  code: string;
  level: string;
}

export interface CompetencyGroup {
  title: string;
  icon: IconName;
  items: string[];
}

export interface CeoLocation {
  locality: string;
  region: string;
  country: string;
  countryCode: string;
}

export interface Ceo {
  /** Nombre corto de uso en el sitio. */
  name: string;
  /** Nombre completo (JSON-LD, ficha). */
  fullName: string;
  givenName: string;
  /** Primer apellido (titular de la página). */
  familyName: string;
  /** Apellidos completos (JSON-LD). */
  familyNames: string;
  /** Cómo se describe profesionalmente (hoja de vida). */
  professionalHeadline: string;
  /** Títulos profesionales (hoja de vida). */
  credentialsSummary: string;
  /** Ciudad de residencia (solo para la Person; la empresa no publica dirección). */
  location: CeoLocation;
  languages: CeoLanguage[];
  jobTitle: string;
  company: string;
  path: string;
  /** Experiencia expresada tal como está confirmada (no cambiar «casi 20 años»). */
  experienceSummary: string;
  /** Titular para el hero de la página. */
  headline: string;
  /** Resumen corto (home, schema, tarjetas). */
  summary: string;
  /** Párrafos de biografía (hoja de vida + visión de Nithios). bio[1] se usa también en la home. */
  bio: string[];
  /** Cita / visión atribuible. Vacía hasta que el CEO la apruebe. */
  quote: string;
  /** Áreas de liderazgo dentro de Nithios (home). */
  focusAreas: string[];
  /** Temas de dominio (JSON-LD knowsAbout). */
  knowsAbout: string[];
  /** Cifras reales de la hoja de vida, con contexto anonimizado. */
  highlights: CeoHighlight[];
  /** Trayectoria: del cargo más reciente al más antiguo, sin fechas y con empleadores anonimizados. */
  experience: ExperienceItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
  competencies: CompetencyGroup[];
  /** URLs de perfiles públicos verificados. */
  sameAs: string[];
  /** Perfil de LinkedIn (enlace visible). */
  linkedin?: string;
  photo?: ImageMetadata;
  photoAlt?: string;
  seoTitle: string;
  seoDescription: string;
  whatsappMessage: string;
}

export const ceo: Ceo = {
  name: 'Jonathan Osorio',
  fullName: 'Jonathan Osorio Correa',
  givenName: 'Jonathan',
  familyName: 'Osorio',
  familyNames: 'Osorio Correa',
  professionalHeadline: 'CTO, director y líder de innovación y tecnología',
  credentialsSummary: 'Ingeniero de Sistemas y Especialista en Gerencia de TI',
  location: { locality: 'Medellín', region: 'Antioquia', country: 'Colombia', countryCode: 'CO' },
  languages: [
    { name: 'Español', code: 'es', level: 'Nativo' },
    { name: 'Inglés', code: 'en', level: 'B2' },
  ],
  jobTitle: 'CEO y Fundador',
  company: 'Nithios',
  path: '/jonathan-osorio/',
  experienceSummary: 'Casi 20 años de experiencia en diferentes sectores',
  headline: 'Liderazgo tecnológico con visión de negocio.',
  summary:
    'Jonathan Osorio Correa es el CEO y Fundador de Nithios. Ingeniero de Sistemas y Especialista en Gerencia de TI, es un CTO y líder de innovación con casi 20 años de experiencia en retail, educación y servicios.',
  bio: [
    'Jonathan Osorio Correa es el CEO y Fundador de Nithios. Ingeniero de Sistemas y Especialista en Gerencia de TI, es un CTO, director y líder de innovación y tecnología con casi 20 años de experiencia. Ha liderado la innovación, la estrategia y las plataformas core de organizaciones de retail, educación y servicios, alineando la visión de negocio con una ejecución operativa de alto impacto.',
    'Esa trayectoria le permite conectar dos mundos que muchas veces no se hablan: la estrategia de negocio y la ejecución técnica. Por eso fundó Nithios, una empresa de tecnología colombiana que acompaña a las organizaciones desde la decisión de qué tecnología adoptar hasta la construcción del software que la hace realidad.',
    'Su fortaleza está en dirigir equipos multidisciplinarios con delivery ágil para cumplir OKR financieros y técnicos, elevando la productividad y el time-to-value con inteligencia artificial, DevOps, Agile, ITIL, COBIT y TOGAF. Ha dirigido roadmaps de CRM, CDP, MDM, CMS, web, LMS, apps y e-commerce, y ha modernizado infraestructura y tecnología. En sus roles recientes logró eficiencias operativas del 25 al 30 % mediante estandarización, analítica y automatización, optimizando costos y experiencias digitales.',
    'Está radicado en Medellín, Antioquia, y desde allí dirige Nithios para empresas de toda Colombia, con atención remota. Bajo su liderazgo, Nithios trabaja en dos líneas complementarias: la asesoría y consultoría tecnológica para empresas que quieren mejorar sus procesos, y el desarrollo de aplicativos a la medida con nuevas tecnologías.',
  ],
  quote: '',
  /** Líneas de servicio + «Estrategia de TI». Se muestran en la home. */
  focusAreas: [
    'Estrategia de TI',
    'Consultoría tecnológica',
    'Transformación digital',
    'Desarrollo de software a la medida',
    'Inteligencia artificial aplicada a empresas',
  ],
  knowsAbout: [
    'Estrategia de TI',
    'Gerencia de TI',
    'Transformación digital',
    'Inteligencia artificial',
    'Analítica de datos',
    'Automatización de procesos',
    'Infraestructura local y en la nube',
    'Kubernetes',
    'Redes',
    'Ciberseguridad',
    'Arquitectura empresarial',
    'Desarrollo de software',
    'E-commerce',
    'CRM',
    'CDP',
    'MDM',
    'Marketing digital',
    'Salesforce',
    'SAP',
    'ITIL',
    'COBIT',
    'TOGAF',
    'Scrum',
    'Lean',
    'Agile',
    'DevOps',
  ],
  highlights: [
    {
      value: '+45 %',
      label: 'en eficiencia y control',
      context: 'Migración del ERP académico y financiero de una universidad pionera en educación virtual.',
    },
    {
      value: '36 %',
      label: 'de reducción mensual en la nube',
      context: 'Optimización de Kubernetes con automatización, observabilidad y auto-sizing: eficiencia acumulada del 32 % anual.',
    },
    {
      value: '+40 %',
      label: 'en ventas',
      context: 'App móvil B2B para el canal tradicional (tienda a tienda) de una empresa líder en producción alimenticia.',
    },
    {
      value: '35 %',
      label: 'más de ROI',
      context: 'Soluciones digitales para la cuenta de un operador líder de telecomunicaciones.',
    },
    {
      value: '+25 %',
      label: 'de reducción en tiempos',
      context: 'Capa única de integración para servicios transversales de la empresa líder del retail en Colombia.',
    },
    {
      value: '24',
      label: 'portales corporativos',
      context: 'Estandarizados en Drupal con un modelo de gobierno, en la empresa líder del retail en Colombia.',
    },
  ],
  experience: [
    {
      role: 'CTO | Director de Tecnología',
      organization: 'Institución de educación superior en Medellín',
      current: true,
      achievements: [
        'Dirige la estrategia de innovación y tecnología al servicio de la educación, la rentabilidad financiera y los objetivos estratégicos de la institución.',
        'Lidera la ciberseguridad, las metodologías y los marcos tecnológicos, con una cultura de mejora continua.',
        'Impulsa la mejora de procesos, la automatización y la modernización con analítica de datos e inteligencia artificial.',
      ],
    },
    {
      role: 'Docente de Cátedra, Facultad de Ingeniería',
      organization: 'Universidad colombiana pionera en educación virtual',
      achievements: [
        'Formó a estudiantes de programas de posgrado en infraestructura orientada a servicios.',
        'Actualizó más del 20 % de los contenidos de los programas y mejoró la calificación de satisfacción de los estudiantes.',
      ],
    },
    {
      role: 'Director de Tecnología',
      organization: 'Universidad colombiana pionera en educación virtual',
      achievements: [
        'Ejerció el liderazgo estratégico, táctico y operativo de la tecnología, asegurando la continuidad del negocio y sus indicadores bajo marcos de la industria tecnológica y educativa.',
        'Lideró la migración del ERP académico y financiero, con mejoras superiores al 45 % en eficiencia y control.',
        'Optimizó la nube Kubernetes con automatización, observabilidad y auto-sizing: reducciones del 36 % mensual y una eficiencia acumulada del 32 % anual.',
      ],
    },
    {
      role: 'Jefe de Soluciones TI',
      organization: 'Empresa líder del retail en Colombia',
      achievements: [
        'Implementó la OC Ágil integrando DevOps e ITIL, con despliegues automatizados en Azure, y adoptó OpenTelemetry para ganar observabilidad, trazabilidad y detección temprana, con un mejor MTTR.',
        'Creó una capa única de integración para servicios transversales, como el programa de fidelización de alcance nacional, con APIs y microservicios en .NET: reducciones superiores al 25 % en tiempos.',
        'Hizo evolucionar los aplicativos core (CRM, CDP, MDM, CMS, apps y e-commerce) con capacidades de inteligencia artificial.',
      ],
    },
    {
      role: 'Jefe de Canales Digitales',
      organization:
        'Multinacional de consultoría tecnológica, a cargo de la cuenta de un operador líder de telecomunicaciones',
      achievements: [
        'Lideró la cuenta del operador e incrementó su ROI en un 35 % con soluciones digitales de CRM, CDP, MAD y BI en GCP.',
        'Diseñó estrategias digitales que aumentaron un 35 % las conversiones en línea y optimizó la experiencia de usuario a partir del CDP.',
      ],
    },
    {
      role: 'Jefe de Aplicaciones Martech',
      organization: 'Empresa líder en producción alimenticia en América',
      achievements: [
        'Actuó como business partner de TI para el área de Mercadeo.',
        'Definió la arquitectura y el desarrollo de la app móvil B2B para el canal tradicional (tienda a tienda), con un incremento de ventas superior al 40 %.',
        'Lideró la migración del e-commerce y los tableros de BI comerciales con Flutter, Adobe Commerce y SAP.',
      ],
    },
    {
      role: 'Habilitador Omnicanal (Líder de proyectos TI)',
      organization: 'Empresa líder del retail en Colombia',
      achievements: [
        'Desarrolló, lideró y lanzó la primera app de la cadena y de su marca de supermercados, con Xamarin Forms y ATG.',
        'Estandarizó 24 portales web corporativos en Drupal bajo un modelo de gobierno.',
        'Diseñó la arquitectura y desarrolló el primer e-commerce de su operación de telefonía móvil, mientras impulsaba la cultura ágil con Scrum, Kanban y Scale.',
      ],
    },
    {
      role: 'Desarrollador Líder',
      organization: 'Gremio empresarial del comercio en Antioquia',
      achievements: [
        'Renovó la arquitectura y el desarrollo del score crediticio del servicio de información comercial del gremio, y automatizó los informes de ventas.',
        'Construyó los portales web corporativos del gremio en Drupal y definió el modelo de mantenimiento de infraestructura: AIX, Oracle, firewall y seguridad.',
      ],
    },
    {
      role: 'Product Owner Web / App',
      organization: 'Fundación empresarial del sector de servicios públicos',
      achievements: [
        'Lideró la biblioteca digital en línea y la app móvil de una red de bibliotecas.',
        'Migró el portal de SharePoint a Drupal, con mejoras de SEO y UX, sobre una infraestructura en AWS con seguridad y monitoreo que optimizó los costos en un 25 %.',
      ],
    },
    {
      role: 'Líder de estrategia SEO',
      organization: 'Agencia de marketing digital en Medellín',
      achievements: [
        'Posicionó palabras clave en Google y desarrolló LMS y portales educativos con Moodle, además de portales con Joomla y WordPress.',
      ],
    },
  ],
  education: [
    { degree: 'Especialista en Gerencia de TI', institution: 'Universidad Pontificia Bolivariana', locality: 'Medellín' },
    { degree: 'Ingeniero de Sistemas', institution: 'Universidad Salazar y Herrera', locality: 'Medellín' },
    { degree: 'Tecnólogo en Sistemas', institution: 'Universidad Autónoma de las Américas', locality: 'Medellín' },
    { degree: 'Técnico en Sistemas', institution: 'CESDE', locality: 'Medellín' },
  ],
  certifications: [
    { name: 'Scrum Master Accredited Certification (SMAC)', issuer: 'International Scrum Institute' },
    { name: 'Scrum Product Owner Accredited Certification (SPOAC)', issuer: 'International Scrum Institute' },
    { name: 'Scrum Fundamentals Certified (SFC)', issuer: 'SCRUMstudy' },
    { name: 'Data Cabling System (cableado estructurado y redes)', issuer: 'Furukawa' },
    { name: 'Curso de Base de Datos NoSQL', issuer: 'Platzi' },
    { name: 'Curso de ChatGPT Empresarial', issuer: 'Platzi' },
  ],
  competencies: [
    {
      title: 'Marcos y metodologías',
      icon: 'workflow',
      items: ['ITIL', 'COBIT', 'TOGAF', 'Scrum', 'Lean', 'Agile', 'DevOps'],
    },
    {
      title: 'Dominios tecnológicos',
      icon: 'cpu',
      items: [
        'Inteligencia artificial',
        'Nube e infraestructura',
        'Redes',
        'Arquitectura',
        'Desarrollo de software',
        'E-commerce',
        'CRM, CDP y MDM',
        'Marketing digital',
        'Salesforce',
        'SAP',
      ],
    },
    {
      title: 'Habilidades directivas',
      icon: 'users',
      items: ['Liderazgo', 'Negociación', 'Estrategia', 'Visión de negocio', 'Actitud proactiva', 'Adaptabilidad al cambio'],
    },
    {
      title: 'Sectores',
      icon: 'briefcase',
      items: [
        'Retail',
        'Educación',
        'Servicios',
        'Telecomunicaciones',
        'Consumo masivo',
        'Gremial y crédito',
        'Fundaciones y servicios públicos',
        'Marketing digital',
      ],
    },
  ],
  sameAs: ['https://www.linkedin.com/in/jonathan-osorio-correa'],
  linkedin: 'https://www.linkedin.com/in/jonathan-osorio-correa',
  photo: photo,
  photoAlt: 'Jonathan Osorio, CEO y Fundador de Nithios',
  seoTitle: 'Jonathan Osorio: CEO de Nithios y líder en tecnología',
  seoDescription:
    'Jonathan Osorio, CEO de Nithios: Ingeniero de Sistemas y Especialista en Gerencia de TI con casi 20 años liderando tecnología en retail, educación y servicios.',
  whatsappMessage: 'Hola Jonathan, quiero conversar sobre un proyecto de tecnología para mi empresa.',
};

/** Cargo vigente fuera de Nithios (primer elemento marcado `current`). */
export const ceoCurrentRole = ceo.experience.find((e) => e.current);

/* ------------------------------------------------------------------ */
/* Contenido editorial de /jonathan-osorio/                            */
/* Sin fechas ni nombres de empleadores (ver reglas en la cabecera).   */
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
    'CTO, director y líder de innovación y tecnología, con casi 20 años de experiencia en retail, educación y servicios. Desde Medellín dirige Nithios para que las empresas colombianas tomen mejores decisiones tecnológicas y las conviertan en software que funciona.',
  /** Datos de la ficha ejecutiva (solo hechos confirmados). */
  facts: [
    { label: 'Cargo', value: 'CEO y Fundador de Nithios' },
    { label: 'Perfil', value: 'CTO y líder de innovación y tecnología' },
    { label: 'Formación', value: 'Ingeniero de Sistemas · Especialista en Gerencia de TI' },
    { label: 'Experiencia', value: 'Casi 20 años en retail, educación y servicios' },
    { label: 'Ubicación', value: 'Medellín, Antioquia, Colombia' },
    { label: 'Idiomas', value: 'Español nativo · Inglés B2' },
  ],
  profileTitle: 'Un ejecutivo que habla el idioma del negocio y el de la tecnología.',
  highlights: {
    title: 'Resultados que hablan por sí solos.',
    intro:
      'Algunas cifras de su trayectoria como líder de tecnología. Las organizaciones se describen sin nombrarlas, por confidencialidad.',
  },
  trajectory: {
    title: 'Una carrera construida entre la estrategia y la ejecución.',
    intro:
      'Del liderazgo de estrategia SEO a la dirección de tecnología, pasando por retail, consumo masivo, telecomunicaciones y educación. Hoy combina su rol como CTO con la dirección de Nithios.',
    /** Nodo inicial de la línea de tiempo: su rol en Nithios. */
    nithios: {
      role: 'CEO y Fundador',
      text: 'Dirige la estrategia de Nithios y sus dos líneas de servicio: consultoría tecnológica y desarrollo de software a medida para empresas de toda Colombia.',
    },
  },
  education: {
    title: 'Formación sólida, de la técnica a la gerencia.',
    intro:
      'Una ruta académica completa en sistemas, de técnico a especialista en Gerencia de TI, respaldada por certificaciones en metodologías ágiles, redes y tecnologías emergentes.',
  },
  competencies: {
    title: 'Competencias que combinan gestión, tecnología y negocio.',
    intro:
      'Marcos de gobierno y entrega, dominios tecnológicos y habilidades directivas que hoy pone al servicio de los proyectos de Nithios.',
  },
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
  /** Preguntas directas para buscadores y motores de IA (solo hechos confirmados, sin fechas ni empleadores). */
  qa: [
    {
      question: '¿Quién es Jonathan Osorio?',
      answer:
        'Jonathan Osorio Correa es el CEO y Fundador de Nithios, empresa de tecnología colombiana dirigida desde Medellín. Es Ingeniero de Sistemas y Especialista en Gerencia de TI, y un CTO y líder de innovación con casi 20 años de experiencia en retail, educación y servicios.',
    },
    {
      question: '¿Cuál es la experiencia de Jonathan Osorio?',
      answer:
        'Ha sido CTO y Director de Tecnología en educación superior, Jefe de Soluciones TI y líder de proyectos omnicanal en la empresa líder del retail en Colombia, Jefe de Canales Digitales en una multinacional de consultoría tecnológica y Jefe de Aplicaciones Martech en una empresa líder en producción alimenticia. Entre sus resultados: mejoras superiores al 45 % en eficiencia y control con la migración de un ERP, un 36 % de reducción mensual en la nube y un incremento de ventas superior al 40 % con una app B2B.',
    },
    {
      question: '¿Qué formación tiene Jonathan Osorio?',
      answer:
        'Es Especialista en Gerencia de TI de la Universidad Pontificia Bolivariana, Ingeniero de Sistemas de la Universidad Salazar y Herrera, Tecnólogo en Sistemas de la Universidad Autónoma de las Américas y Técnico en Sistemas de CESDE, todas en Medellín.',
    },
    {
      question: '¿Qué certificaciones tiene Jonathan Osorio?',
      answer:
        'Tiene las certificaciones Scrum Master Accredited Certification (SMAC) y Scrum Product Owner Accredited Certification (SPOAC) del International Scrum Institute, Scrum Fundamentals Certified (SFC) de SCRUMstudy y Data Cabling System (cableado estructurado y redes) de Furukawa, además de los cursos de Base de Datos NoSQL y ChatGPT Empresarial de Platzi.',
    },
    {
      question: '¿Qué hace Jonathan Osorio en Nithios?',
      answer:
        'Como CEO y Fundador, dirige la estrategia de Nithios y sus dos líneas de servicio: la asesoría y consultoría tecnológica para empresas que quieren mejorar sus procesos, y el desarrollo de software a medida con nuevas tecnologías. Aporta su experiencia en ITIL, COBIT, TOGAF, Scrum, DevOps e inteligencia artificial.',
    },
    {
      question: '¿Cómo puedo hablar con Jonathan Osorio sobre un proyecto?',
      answer:
        'Puedes escribir al WhatsApp de Nithios, +57 305 302 7559, contando brevemente qué quieres lograr. Jonathan vive en Medellín y la atención es remota para empresas de toda Colombia, desde Bogotá hasta Cali, Barranquilla o Bucaramanga.',
    },
  ] satisfies CeoQa[],
};
