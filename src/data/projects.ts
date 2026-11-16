/**
 * Portafolio de Nithios (data-driven).
 * Agregar un proyecto = agregar un objeto a `projects`. Las rutas
 * /portafolio/<slug>/ las genera la página dinámica a partir de este arreglo.
 * REGLA: solo hechos confirmados. Sin clientes, cifras ni resultados inventados.
 */
import type { ImageMetadata } from 'astro';
import type { IconName } from '@/lib/icons';
import type { Faq } from '@/data/faqs';
import dragonTablero from '@/assets/portfolio/dragon/tablero.webp';
import dragonCotizaciones from '@/assets/portfolio/dragon/cotizaciones.webp';
import dragonContenedores from '@/assets/portfolio/dragon/contenedores.webp';
import dragonProyectos from '@/assets/portfolio/dragon/proyectos.webp';
import dragonRoles from '@/assets/portfolio/dragon/roles-y-permisos.webp';
import dragonTableroChino from '@/assets/portfolio/dragon/tablero-chino.webp';
import krystalOg from '@/assets/portfolio/krystal/og.png';

/** 'sin-especificar' cuando el estado real no está confirmado (ver docs/PENDIENTES.md). */
export type ProjectStatus = 'prototipo' | 'en-desarrollo' | 'en-produccion' | 'sin-especificar';

export interface ProjectFeature {
  title: string;
  text: string;
  icon: IconName;
}

/** Captura real del producto (astro:assets). */
export interface ProjectImage {
  src: ImageMetadata;
  /** Texto alternativo descriptivo (qué se ve, no solo el nombre). */
  alt: string;
  /** Pie de foto visible. */
  caption: string;
}

/** Punto de valor (beneficio esperado, sin métricas inventadas). */
export interface ProjectValue {
  title: string;
  text: string;
  icon: IconName;
}

export interface Project {
  slug: string;
  path: string;
  name: string;
  /** Frase corta de posicionamiento. */
  tagline: string;
  /** Categoría legible ("Comercio internacional", "Salud mental"…). Ficha y badge. */
  category: string;
  /** Segunda línea del <h1> del caso, alineada con la intención del seoTitle (en minúscula tras los dos puntos). */
  h1Subtitle: string;
  /** Resumen de 1–2 frases (tarjetas, meta, schema). */
  summary: string;
  seoTitle: string;
  seoDescription: string;
  /** Párrafos de descripción del caso. */
  description: string[];
  status: ProjectStatus;
  statusLabel: string;
  /** Módulos / capacidades principales. */
  features: ProjectFeature[];
  /** Puntos destacados breves (chips o lista). */
  highlights: string[];
  /** Plataformas en las que funciona. */
  platforms: string[];
  /** Idiomas de la interfaz. */
  languages: string[];
  /** Tecnologías (vacío si no está confirmado). */
  stack: string[];
  /** Medidas de seguridad (vacío si no está confirmado). */
  security: string[];
  /** Línea de servicio relacionada (slug de services.ts). */
  serviceSlug: string;
  /** Imagen de portada optimizable con astro:assets (pendiente: ver docs/PENDIENTES.md). */
  cover?: ImageMetadata;
  coverAlt?: string;
  /** Monograma para el arte generativo cuando no hay imagen. */
  monogram: string;
  /** Imagen OG 1200×630 cuando no hay `cover` (p. ej. render de la ilustración). Alt en `ogImageAlt`. */
  ogImage?: ImageMetadata;
  ogImageAlt?: string;
  featured: boolean;
  /** Orden de aparición (menor primero). */
  order: number;
  whatsappMessage: string;
  /* ---- Página de caso (/portafolio/<slug>/) ---- */
  /** Titular corto de alto impacto para el hero del caso. */
  headline: string;
  /** El reto: qué problema de negocio resuelve este tipo de software. */
  challenge: string;
  /** La solución: cómo lo resuelve (párrafos). */
  solution: string[];
  /** Valor que aporta / resultado esperado (sin cifras inventadas). */
  value: ProjectValue[];
  /** Aviso honesto sobre el estado (p. ej. prototipo con datos ficticios). Vacío = no se muestra. */
  statusNote: string;
  /** Capturas reales. Vacío = se usa `illustration` o el arte con monograma. */
  images: ProjectImage[];
  /** Ilustración conceptual (no captura) cuando aún no hay imágenes reales. */
  illustration?: 'krystal';
  /** Preguntas y respuestas del caso (GEO). Vacío = se oculta. */
  faqs: Faq[];
}

export const projects: Project[] = [
  {
    slug: 'dragon-global-trade',
    path: '/portafolio/dragon-global-trade/',
    name: 'Dragon Global Trade',
    tagline: 'Prototipo de una plataforma integral para comercio internacional.',
    category: 'Comercio internacional',
    h1Subtitle: 'software de gestión de comercio internacional',
    summary:
      'Prototipo navegable de una plataforma de gestión de comercio internacional con módulos comercial, compras, logística, proyectos, terceros y datos maestros, interfaz en 5 idiomas y tema claro/oscuro.',
    seoTitle: 'Dragon Global Trade: software de comercio exterior',
    seoDescription:
      'Dragon Global Trade, plataforma de comercio internacional diseñada por Nithios: comercial, compras, logística, proyectos y terceros en 5 idiomas. Ver prototipo.',
    description: [
      'Dragon Global Trade es el prototipo de una plataforma de gestión de comercio internacional diseñada para reunir en un solo lugar la operación comercial, las compras, la logística y los proyectos de una empresa que compra y vende entre países.',
      'Está pensada para organizar la información de clientes y proveedores, los datos maestros y la colaboración entre equipos, con control de acceso por roles para que cada persona vea y gestione solo lo que le corresponde.',
      'Su interfaz multiidioma en español, inglés, chino, portugués y francés está pensada para equipos y contrapartes en distintos países, y se apoya en un sistema de diseño propio con tema claro y oscuro.',
    ],
    status: 'prototipo',
    statusLabel: 'Prototipo navegable de interfaz con datos de demostración',
    features: [
      { title: 'Comercial', text: 'Gestión de la operación comercial y de la relación con clientes.', icon: 'briefcase' },
      { title: 'Compras', text: 'Seguimiento del proceso de compras con proveedores.', icon: 'cart' },
      { title: 'Logística', text: 'Control de la operación logística del comercio internacional.', icon: 'truck' },
      { title: 'Proyectos', text: 'Organización de proyectos y su avance.', icon: 'folder' },
      { title: 'Terceros', text: 'Gestión centralizada de clientes y proveedores.', icon: 'users' },
      { title: 'Datos maestros', text: 'Información base unificada y consistente para toda la operación.', icon: 'database' },
      { title: 'Colaboración', text: 'Trabajo coordinado entre áreas y equipos.', icon: 'message' },
      { title: 'Control de acceso por roles', text: 'Permisos según el rol de cada usuario.', icon: 'key' },
    ],
    highlights: [
      'Interfaz en 5 idiomas: español, inglés, chino, portugués y francés',
      'Sistema de diseño propio',
      'Tema claro y oscuro',
      'Control de acceso por roles',
    ],
    platforms: ['Web'],
    languages: ['Español', 'Inglés', 'Chino', 'Portugués', 'Francés'],
    stack: [],
    security: ['Control de acceso por roles'],
    serviceSlug: 'desarrollo-de-software-a-medida',
    monogram: 'D',
    featured: true,
    order: 1,
    whatsappMessage: 'Hola Nithios, vi Dragon Global Trade y quiero una plataforma similar para mi empresa.',
    cover: dragonTablero,
    coverAlt:
      'Tablero de Dragon Global Trade en tema oscuro: tareas que requieren atención y gráfico de proyectos activos por fase, con datos de demostración.',
    headline: 'Todo tu comercio internacional, en una sola pantalla.',
    challenge:
      'Una empresa que importa y exporta suele repartir su operación entre hojas de cálculo, correos y chats: la cotización vive en un archivo, la orden al proveedor en otro y el estado del contenedor en la memoria de alguien. El resultado es información duplicada, decisiones lentas y poca visibilidad de lo que pasa entre países.',
    solution: [
      'Dragon Global Trade está diseñada para centralizar la operación de punta a punta. Cada área trabaja en su módulo —comercial, compras, logística y proyectos— sobre los mismos datos maestros de clientes, proveedores y productos, así que la información se registra una sola vez y fluye entre equipos.',
      'El control de acceso por roles define qué puede ver y hacer cada persona, y el módulo de colaboración mantiene a todos alineados alrededor de cada proyecto. La interfaz cambia entre español, inglés, chino, portugués y francés, pensada para equipos y contrapartes en distintos países.',
      'Creamos un sistema de diseño propio, con tema claro y oscuro, para que una plataforma con muchos módulos se sienta coherente, legible y fácil de aprender.',
    ],
    value: [
      { title: 'Una sola fuente de verdad', text: 'Clientes, proveedores, productos y proyectos viven en un mismo lugar, sin versiones paralelas.', icon: 'database' },
      { title: 'Visibilidad de la operación', text: 'Tableros que muestran qué requiere atención y en qué etapa está cada proyecto.', icon: 'chart' },
      { title: 'Equipos en varios idiomas', text: 'Cada persona usa la plataforma en su idioma, sin traducir a mano.', icon: 'translate' },
      { title: 'Acceso con criterio', text: 'Cada rol ve y gestiona solo lo que le corresponde.', icon: 'shield' },
    ],
    statusNote:
      'Dragon Global Trade es un prototipo navegable de interfaz. Las empresas, personas, códigos y cifras que aparecen en las capturas son datos ficticios de demostración.',
    images: [
      {
        src: dragonTablero,
        alt: 'Tablero principal de Dragon Global Trade: lista de pendientes priorizados y gráfico de barras de proyectos activos por fase.',
        caption: 'Tablero: lo que conviene resolver primero y el avance de los proyectos por fase.',
      },
      {
        src: dragonCotizaciones,
        alt: 'Módulo comercial de Dragon Global Trade: indicadores de cotizaciones por estado y tabla de cotizaciones con cliente, proyecto, estado y total.',
        caption: 'Comercial: cotizaciones por estado, desde el borrador hasta la aprobación.',
      },
      {
        src: dragonContenedores,
        alt: 'Módulo de logística de Dragon Global Trade: indicadores de contenedores y tabla con tipo, modalidad, estado, ocupación, ruta y fecha estimada de llegada.',
        caption: 'Logística: seguimiento de contenedores, ocupación, ruta y fecha estimada de llegada.',
      },
      {
        src: dragonProyectos,
        alt: 'Módulo de proyectos de Dragon Global Trade: indicadores de avance, filtros por etapa y gráfico de proyectos por etapa.',
        caption: 'Proyectos: cada operación organizada por etapas, con alertas de tareas vencidas.',
      },
      {
        src: dragonRoles,
        alt: 'Pantalla de roles y permisos de Dragon Global Trade: lista de roles con número de permisos y matriz de permisos por módulo.',
        caption: 'Seguridad: roles y permisos por módulo para controlar quién ve y hace qué.',
      },
      {
        src: dragonTableroChino,
        alt: 'Tablero de Dragon Global Trade con la interfaz en chino simplificado, mostrando el cambio de idioma de la plataforma.',
        caption: 'Multiidioma: el mismo tablero con la interfaz en chino.',
      },
    ],
    faqs: [
      {
        category: 'desarrollo',
        question: '¿Qué es Dragon Global Trade?',
        answer:
          'Dragon Global Trade es una plataforma de gestión de comercio internacional diseñada por Nithios. Reúne los módulos comercial, compras, logística, proyectos, terceros (clientes y proveedores), datos maestros y colaboración, con control de acceso por roles e interfaz en cinco idiomas.',
      },
      {
        category: 'desarrollo',
        question: '¿Dragon Global Trade ya está en producción?',
        answer:
          'No. Hoy es un prototipo navegable de interfaz con datos de demostración: permite recorrer los módulos y validar la experiencia antes de construir el sistema completo. Es la forma en que recomendamos empezar un software de este tamaño.',
      },
      {
        category: 'desarrollo',
        question: '¿Nithios puede construir una plataforma similar para mi empresa de importación o exportación?',
        answer:
          'Sí. Desarrollamos software a medida para empresas en toda Colombia. Partimos de tus procesos —cotizar, comprar, despachar, hacer seguimiento— y diseñamos los módulos, roles e idiomas que tu operación necesita. Escríbenos por WhatsApp y lo revisamos contigo.',
      },
    ],
  },
  {
    slug: 'krystal',
    path: '/portafolio/krystal/',
    name: 'Krystal',
    tagline: 'El consultorio psicológico, completo y en línea.',
    category: 'Salud mental y atención remota',
    h1Subtitle: 'software para consultorios psicológicos y atención remota',
    summary:
      'Aplicación web responsive para gestionar un consultorio psicológico y la atención remota: agenda, videollamadas integradas, historia clínica, roles y permisos, preparada para Android e iOS.',
    seoTitle: 'Krystal: software para consultorio psicológico',
    seoDescription:
      'Krystal, app de Nithios para consultorios psicológicos: agenda, videollamadas WebRTC, historia clínica y roles. Web responsive, lista para Android e iOS.',
    description: [
      'Krystal es una aplicación web responsive para la gestión de un consultorio psicológico y la atención remota de pacientes. Reúne en una sola herramienta la agenda, las sesiones por videollamada y la información clínica.',
      'Incluye agendamiento de citas con calendario, videollamadas integradas con WebRTC, gestión de clientes y pacientes con su historia clínica, y administración de usuarios con roles y permisos granulares.',
      'Cada perfil —administrador, terapeuta y recepcionista— tiene su propio panel. La interfaz está disponible en español e inglés y la aplicación está preparada para Android e iOS mediante Capacitor.',
      'La seguridad es parte del diseño: autenticación con JWT, límite de peticiones, cabeceras de seguridad, y validación y sanitización de los datos.',
    ],
    status: 'sin-especificar',
    statusLabel: 'Aplicación web responsive, preparada para Android e iOS',
    features: [
      { title: 'Agenda de citas', text: 'Agendamiento con calendario para organizar las sesiones.', icon: 'calendar' },
      { title: 'Videollamadas integradas', text: 'Sesiones remotas dentro de la plataforma con WebRTC.', icon: 'video' },
      { title: 'Historia clínica', text: 'Gestión de clientes y pacientes con su historia clínica.', icon: 'clipboard' },
      { title: 'Roles y permisos granulares', text: 'Usuarios con permisos detallados según su función.', icon: 'key' },
      { title: 'Paneles por rol', text: 'Paneles para administrador, terapeuta y recepcionista.', icon: 'chart' },
      { title: 'Multiidioma', text: 'Interfaz en español e inglés.', icon: 'translate' },
      { title: 'Lista para móviles', text: 'Preparada para Android e iOS con Capacitor.', icon: 'phone' },
    ],
    highlights: [
      'Videollamadas WebRTC integradas',
      'Historia clínica y gestión de pacientes',
      'Paneles por rol: administrador, terapeuta y recepcionista',
      'Español e inglés',
      'Preparada para Android e iOS',
    ],
    platforms: ['Web responsive', 'Preparada para Android e iOS'],
    languages: ['Español', 'Inglés'],
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express', 'Prisma', 'PostgreSQL', 'WebRTC', 'Socket.io', 'Capacitor'],
    security: ['Autenticación con JWT', 'Límite de peticiones (rate limiting)', 'Cabeceras de seguridad', 'Validación y sanitización de datos', 'Roles y permisos granulares'],
    serviceSlug: 'desarrollo-de-software-a-medida',
    monogram: 'K',
    ogImage: krystalOg,
    ogImageAlt: 'Krystal, aplicación de Nithios para consultorios psicológicos: agenda, videollamadas e historia clínica',
    featured: true,
    order: 2,
    whatsappMessage: 'Hola Nithios, vi Krystal y quiero una aplicación a la medida para mi consultorio o empresa.',
    headline: 'Agenda, consulta y seguimiento, en una sola app.',
    challenge:
      'Un consultorio psicológico que atiende de forma presencial y remota suele depender de varias herramientas sueltas: una agenda, una plataforma de videollamadas externa, carpetas con la historia clínica y mensajes para confirmar citas. Eso fragmenta la información sensible de los pacientes y le resta tiempo a lo importante: la atención.',
    solution: [
      'Krystal integra el ciclo completo de atención en una aplicación web responsive. La recepción agenda las citas en un calendario, el terapeuta atiende la sesión por videollamada dentro de la misma plataforma y registra la información en la historia clínica del paciente.',
      'Cada perfil —administrador, terapeuta y recepcionista— entra a su propio panel, con roles y permisos granulares que limitan el acceso a la información según la función de cada persona. La interfaz está en español e inglés.',
      'La aplicación está construida con React, TypeScript y Tailwind CSS en el frontend, y Node.js, Express, Prisma y PostgreSQL en el backend. Las videollamadas usan WebRTC y Socket.io, y gracias a Capacitor está preparada para publicarse en Android e iOS.',
    ],
    value: [
      { title: 'Todo en un solo lugar', text: 'Agenda, videollamadas e historia clínica sin saltar entre herramientas.', icon: 'layers' },
      { title: 'Atención remota integrada', text: 'Las sesiones ocurren dentro de la plataforma, con WebRTC.', icon: 'video' },
      { title: 'Información protegida', text: 'Permisos granulares, autenticación segura, límite de peticiones y validación de datos.', icon: 'lock' },
      { title: 'Lista para crecer', text: 'De la web a Android e iOS con la misma base de código.', icon: 'phone' },
    ],
    statusNote: '',
    images: [],
    illustration: 'krystal',
    faqs: [
      {
        category: 'desarrollo',
        question: '¿Qué es Krystal?',
        answer:
          'Krystal es una aplicación web responsive desarrollada por Nithios para gestionar un consultorio psicológico y la atención remota: agendamiento de citas con calendario, videollamadas integradas con WebRTC, historia clínica, roles y permisos granulares y paneles para administrador, terapeuta y recepcionista.',
      },
      {
        category: 'desarrollo',
        question: '¿Con qué tecnologías está construida Krystal?',
        answer:
          'Krystal usa React, TypeScript y Tailwind CSS en el frontend; Node.js, Express, Prisma y PostgreSQL en el backend; WebRTC y Socket.io para las videollamadas, y Capacitor para llevarla a Android e iOS.',
      },
      {
        category: 'desarrollo',
        question: '¿Pueden desarrollar una app similar para mi consultorio, clínica o IPS en Colombia?',
        answer:
          'Sí. Desarrollamos aplicaciones a la medida para el sector salud y cualquier otro sector, con atención remota en toda Colombia. Definimos contigo los flujos de agenda, atención y registro que necesitas, y los roles de tu equipo. Escríbenos por WhatsApp para empezar.',
      },
    ],
  },
];

/** Proyectos ordenados por `order`. */
export const sortedProjects: Project[] = [...projects].sort((a, b) => a.order - b.order);

/** Preguntas y respuestas del índice del portafolio (GEO). */
export const portfolioFaqs: Faq[] = [
  {
    category: 'desarrollo',
    question: '¿Qué tipo de software desarrolla Nithios?',
    answer:
      'Nithios desarrolla software a medida con nuevas tecnologías: plataformas web de gestión, aplicaciones móviles, sistemas internos y soluciones con inteligencia artificial. En este portafolio verás dos ejemplos: Dragon Global Trade, para comercio internacional, y Krystal, para consultorios psicológicos con atención remota.',
  },
  {
    category: 'desarrollo',
    question: '¿Nithios trabaja con empresas fuera de Bogotá o Medellín?',
    answer:
      'Sí. Trabajamos de forma remota con empresas de toda Colombia, incluidas Bogotá, Medellín, Cali, Barranquilla, Bucaramanga, Cartagena y Pereira. Todo el proceso, desde el diagnóstico hasta la entrega, se coordina en línea.',
  },
  {
    category: 'proceso',
    question: '¿Cómo empiezo un proyecto de software a medida con Nithios?',
    answer:
      'Escríbenos por WhatsApp al +57 305 302 7559 y cuéntanos qué proceso quieres mejorar. Con esa conversación entendemos tu necesidad y te proponemos el siguiente paso, que puede ser una consultoría para definir el alcance o un prototipo navegable como el de Dragon Global Trade.',
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
