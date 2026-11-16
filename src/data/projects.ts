/**
 * Portafolio de Nithios (data-driven).
 * Agregar un proyecto = agregar un objeto a `projects`. Las rutas
 * /portafolio/<slug>/ las genera la página dinámica a partir de este arreglo.
 * REGLA: solo hechos confirmados. Sin clientes, cifras ni resultados inventados.
 */
import type { ImageMetadata } from 'astro';
import type { IconName } from '@/lib/icons';
import type { Faq } from '@/data/faqs';
// OG 1200×630 de cada caso: generadas con `npm run og` (scripts/generate-og-images.mjs).
import dragonOg from '@/assets/og/dragon-global-trade-plataforma-comercio-internacional-og.png';
import logisticaOg from '@/assets/og/plataforma-logistica-acero-pedidos-rutas-y-despachos-og.png';
import transporteOg from '@/assets/og/plataforma-transporte-audiovisual-operacion-de-rodajes-og.png';
import krystalOg from '@/assets/og/krystal-software-consultorios-psicologicos-og.png';
import dragonTablero from '@/assets/portfolio/dragon-global-trade/dragon-global-trade-tablero-comercio-internacional.webp';
import dragonCotizaciones from '@/assets/portfolio/dragon-global-trade/dragon-global-trade-modulo-comercial-cotizaciones.webp';
import dragonContenedores from '@/assets/portfolio/dragon-global-trade/dragon-global-trade-logistica-de-contenedores.webp';
import dragonProyectos from '@/assets/portfolio/dragon-global-trade/dragon-global-trade-proyectos-por-etapa.webp';
import dragonRoles from '@/assets/portfolio/dragon-global-trade/dragon-global-trade-roles-y-permisos.webp';
import dragonTableroChino from '@/assets/portfolio/dragon-global-trade/dragon-global-trade-interfaz-en-chino.webp';
import logisticaTablero from '@/assets/portfolio/plataforma-logistica-acero/plataforma-logistica-acero-panel-de-control.webp';
import logisticaCargue from '@/assets/portfolio/plataforma-logistica-acero/plataforma-logistica-acero-optimizacion-de-cargue.webp';
import logisticaSeguimiento from '@/assets/portfolio/plataforma-logistica-acero/plataforma-logistica-acero-seguimiento-de-ruta.webp';
import logisticaConductores from '@/assets/portfolio/plataforma-logistica-acero/plataforma-logistica-acero-app-de-conductores.webp';
import logisticaBodegas from '@/assets/portfolio/plataforma-logistica-acero/plataforma-logistica-acero-bodegas-wms.webp';
import logisticaReportes from '@/assets/portfolio/plataforma-logistica-acero/plataforma-logistica-acero-reportes-e-indicadores.webp';
import transporteTorre from '@/assets/portfolio/plataforma-transporte-audiovisual/plataforma-transporte-audiovisual-torre-de-control.webp';
import transporteAcceso from '@/assets/portfolio/plataforma-transporte-audiovisual/plataforma-transporte-audiovisual-acceso-por-perfil.webp';
import transporteJornada from '@/assets/portfolio/plataforma-transporte-audiovisual/plataforma-transporte-audiovisual-jornada-del-conductor.webp';
import transporteTrailers from '@/assets/portfolio/plataforma-transporte-audiovisual/plataforma-transporte-audiovisual-coordinacion-de-trailers.webp';
import transporteTaller from '@/assets/portfolio/plataforma-transporte-audiovisual/plataforma-transporte-audiovisual-taller-y-mantenimiento.webp';
import transporteReportes from '@/assets/portfolio/plataforma-transporte-audiovisual/plataforma-transporte-audiovisual-reportes-de-operacion.webp';

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
  /**
   * Nombre para usar dentro de una frase ("Qué incluye …", "una solución como …"), con artículo
   * y en minúscula cuando `name` es descriptivo (casos anonimizados). Vacío = se usa `name`.
   */
  nameInSentence?: string;
  /** Etiqueta corta para menús y pie de página (una línea). Vacío = se usa `name`. */
  shortName?: string;
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
  /** Imagen OG 1200×630 del caso (render de `npm run og`; si falta se recorta `cover`). Alt en `ogImageAlt`. */
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
      'Tablero de Dragon Global Trade en tema oscuro: tareas por atender y gráfico de proyectos activos por fase, con datos de demostración.',
    ogImage: dragonOg,
    ogImageAlt:
      'Dragon Global Trade, caso de portafolio de Nithios: tablero del prototipo de gestión de comercio internacional',
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
        alt: 'Módulo comercial de Dragon Global Trade: cotizaciones por estado y tabla con cliente, proyecto, estado y total de cada cotización.',
        caption: 'Comercial: cotizaciones por estado, desde el borrador hasta la aprobación.',
      },
      {
        src: dragonContenedores,
        alt: 'Logística en Dragon Global Trade: indicadores de contenedores y tabla con modalidad, estado, ocupación, ruta y fecha estimada de llegada.',
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
    slug: 'plataforma-logistica-acero',
    path: '/portafolio/plataforma-logistica-acero/',
    name: 'Plataforma logística para acero',
    nameInSentence: 'la plataforma logística para acero',
    shortName: 'Logística para acero',
    tagline: 'Prototipo de una plataforma logística de pedidos, rutas y despachos para el sector del acero.',
    category: 'Logística y distribución',
    h1Subtitle: 'pedidos, rutas y despachos de punta a punta',
    summary:
      'Prototipo navegable de una plataforma logística para una empresa de distribución de acero: del pedido a la entrega con evidencia, pasando por reservas, planeación, motor de rutas, optimización de cargue, bodegas WMS y seguimiento en mapa.',
    seoTitle: 'Software de logística y despachos para acero',
    seoDescription:
      'Plataforma logística diseñada por Nithios para distribución de acero: pedidos, reservas, motor de rutas, cargue, bodegas WMS y entregas con evidencia.',
    description: [
      'Este caso es el prototipo navegable de una plataforma logística para una empresa de distribución de acero. Su propósito cabe en una frase: de la bodega a la obra. Cada pedido recorre el mismo flujo —pedido, reserva, ruta, cargue, despacho y entrega con evidencia— en una sola herramienta.',
      'El prototipo reúne 27 módulos funcionales y 241 historias de usuario: panel de control, pedidos, reservas de inventario, planeación logística, motor de rutas lógicas, parametrización de rutas y vehículos, optimización de cargue, bodegas WMS, inventario y conteos cíclicos, recepción y preparación de pedidos, despachos, seguimiento de ruta, app de conductores, evidencias, novedades y devoluciones, notificaciones, integraciones, reportes e indicadores, auditoría y trazabilidad, usuarios y roles, y maestros de clientes y productos.',
      'La seguridad se ve desde el inicio de sesión: la sesión se cierra por inactividad, el acceso se bloquea tras varios intentos fallidos y las contraseñas siguen una política de complejidad. Dentro, los permisos se definen por rol, módulo y acción.',
    ],
    status: 'prototipo',
    statusLabel: 'Prototipo navegable de interfaz con datos de demostración',
    features: [
      { title: 'Pedidos y reservas', text: 'Pedidos con su estado y reserva de inventario que descuenta lo comprometido antes de despachar.', icon: 'clipboard' },
      { title: 'Planeación logística', text: 'Tablero de pedidos del día con peso y volumen consolidados frente a los vehículos disponibles.', icon: 'calendar' },
      { title: 'Motor de rutas lógicas', text: 'Ordena las paradas para recorrer menos kilómetros respetando ventanas horarias, capacidad y restricciones de circulación.', icon: 'route' },
      { title: 'Optimización de cargue', text: 'Plano de cargue del vehículo por orden de entrega, con control de peso, volumen y compatibilidad de carrocería.', icon: 'layers' },
      { title: 'Bodegas WMS', text: 'Plano de bodega por niveles, ubicaciones, ocupación, inventario y conteos cíclicos.', icon: 'grid' },
      { title: 'Despachos y seguimiento', text: 'Órdenes de despacho y seguimiento en mapa de cada vehículo, con avance por parada y alertas.', icon: 'truck' },
      { title: 'App de conductores y evidencias', text: 'Jornada del conductor paso a paso y entrega con foto, firma del receptor y coordenadas.', icon: 'phone' },
      { title: 'Indicadores y auditoría', text: 'Reportes de cumplimiento de entregas con meta y tendencia, y trazabilidad de cada cambio.', icon: 'chart' },
    ],
    highlights: [
      'Flujo completo: pedido, reserva, ruta, cargue, despacho y entrega',
      'Motor de rutas y optimización de cargue',
      'Seguimiento de ruta en mapa y app de conductores',
      '27 módulos y 241 historias de usuario',
      'Tema claro y oscuro',
    ],
    platforms: ['Web', 'Vista móvil para conductores'],
    languages: ['Español'],
    stack: [],
    security: [
      'Cierre de sesión por inactividad',
      'Bloqueo de acceso por intentos fallidos',
      'Política de contraseñas y recuperación con enlace temporal',
      'Roles y permisos por módulo y acción',
      'Auditoría y trazabilidad de cambios',
    ],
    serviceSlug: 'desarrollo-de-software-a-medida',
    monogram: 'L',
    featured: true,
    order: 2,
    whatsappMessage: 'Hola Nithios, vi el caso de la plataforma logística para acero y quiero una plataforma logística a la medida para mi empresa.',
    cover: logisticaTablero,
    coverAlt:
      'Panel de control de la plataforma logística para acero: pedidos, carga y vehículos, mapa por ruta y alertas, con datos ficticios.',
    ogImage: logisticaOg,
    ogImageAlt:
      'Plataforma logística para acero, caso de Nithios: panel de control del prototipo con mapa de rutas y alertas',
    headline: 'De la bodega a la obra, cada pedido bajo control.',
    challenge:
      'En una empresa que distribuye acero, cada despacho depende de muchas decisiones: si hay inventario para reservar, qué vehículo alcanza para el peso, en qué orden visitar a los clientes, cómo cargar el camión y cómo probar que la entrega se hizo. Cuando esas decisiones viven en hojas de cálculo, llamadas y papeles, se pierden kilómetros, se cargan vehículos de más o de menos y nadie sabe con certeza dónde está cada pedido.',
    solution: [
      'La plataforma está diseñada para seguir cada pedido de punta a punta. El pedido entra, se valida contra el inventario y se reserva; la planeación agrupa la carga del día frente a los vehículos disponibles, y el motor de rutas ordena las paradas para recorrer menos kilómetros respetando ventanas horarias, capacidad y restricciones de circulación.',
      'Antes de salir, la optimización de cargue muestra en un plano qué pedido va dónde y en qué orden, y bloquea el cierre si hay incompatibilidades. En la calle, la torre de control sigue cada vehículo en el mapa y el conductor registra su jornada y las evidencias de entrega: foto, firma del receptor y coordenadas.',
      'La bodega tiene su propio frente —ubicaciones, ocupación, preparación de pedidos, inventario y conteos cíclicos—, y todo queda medido en reportes de cumplimiento y en un registro de auditoría. El prototipo simula además las integraciones con los sistemas existentes de la empresa.',
    ],
    value: [
      { title: 'Trazabilidad de punta a punta', text: 'Cada pedido se puede seguir desde la reserva hasta la evidencia de entrega.', icon: 'route' },
      { title: 'Mejor uso de la flota', text: 'Rutas ordenadas y cargues planeados según peso, volumen y restricciones.', icon: 'truck' },
      { title: 'Entregas con prueba', text: 'Foto, firma y coordenadas en cada entrega, desde el teléfono del conductor.', icon: 'check-circle' },
      { title: 'Decisiones con datos', text: 'Indicadores de cumplimiento con meta y tendencia, y auditoría de cada cambio.', icon: 'chart' },
    ],
    statusNote:
      'Es un prototipo navegable de interfaz. El nombre de la empresa para la que se diseñó se reserva por confidencialidad. Los clientes, pedidos, vehículos, personas y cifras que aparecen en las capturas son datos ficticios de demostración, y las integraciones con otros sistemas están simuladas.',
    images: [
      {
        src: logisticaTablero,
        alt: 'Panel de control logístico: pedidos pendientes, carga por despachar, vehículos y cumplimiento, con mapa operativo por ruta y alertas.',
        caption: 'Panel de control: la operación del día, el mapa por ruta y las alertas que requieren acción.',
      },
      {
        src: logisticaCargue,
        alt: 'Optimización de cargue: plano del vehículo con los pedidos en orden de entrega, uso de peso y volumen y alerta de cargue incompatible.',
        caption: 'Optimización de cargue: qué pedido va dónde, en qué orden, y si cabe sin sobrepasar peso ni volumen.',
      },
      {
        src: logisticaSeguimiento,
        alt: 'Seguimiento de ruta: alertas activas, despachos en ruta con avance por parada y mapa con la posición de cada vehículo.',
        caption: 'Seguimiento de ruta: cada vehículo en el mapa, con su avance por parada y alertas de desvío.',
      },
      {
        src: logisticaConductores,
        alt: 'App de conductores en vista de teléfono: ruta asignada con paradas, carga y kilómetros, junto al recorrido de la jornada en siete pasos.',
        caption: 'App de conductores: la jornada paso a paso, de la ruta asignada a las evidencias de entrega.',
      },
      {
        src: logisticaBodegas,
        alt: 'Gestión de bodegas: indicadores de posiciones y ocupación y plano de la bodega por zonas, pasillos y racks.',
        caption: 'Bodegas WMS: plano por niveles, ubicaciones y ocupación de cada posición.',
      },
      {
        src: logisticaReportes,
        alt: 'Reportes e indicadores: indicador de entregas completas y a tiempo con meta, gráfico de tendencia de 30 días e indicadores operativos.',
        caption: 'Reportes e indicadores: cumplimiento de entregas con meta y tendencia.',
      },
    ],
    faqs: [
      {
        category: 'desarrollo',
        question: '¿Qué es la plataforma logística para acero?',
        answer:
          'Es una plataforma logística de pedidos, rutas y despachos diseñada por Nithios para una empresa de distribución de acero, cuyo nombre se reserva por confidencialidad. Cubre el flujo completo —pedido, reserva, ruta, cargue, despacho y entrega con evidencia— con módulos de planeación, motor de rutas, optimización de cargue, bodegas WMS, inventario, app de conductores, reportes y auditoría.',
      },
      {
        category: 'desarrollo',
        question: '¿La plataforma logística para acero ya está en producción?',
        answer:
          'No. Hoy es un prototipo navegable de interfaz con datos de ejemplo: permite recorrer las pantallas y validar el alcance —27 módulos y 241 historias de usuario— antes de construir el sistema definitivo.',
      },
      {
        category: 'desarrollo',
        question: '¿Nithios puede desarrollar un software de logística y rutas para mi empresa?',
        answer:
          'Sí. Desarrollamos software a medida para empresas de distribución, transporte y manufactura en toda Colombia. Partimos de tu operación —pedidos, inventario, flota y entregas— y diseñamos los módulos y roles que necesitas. Escríbenos por WhatsApp y lo revisamos contigo.',
      },
    ],
  },
  {
    slug: 'plataforma-transporte-audiovisual',
    path: '/portafolio/plataforma-transporte-audiovisual/',
    name: 'Plataforma de transporte audiovisual',
    nameInSentence: 'la plataforma de transporte audiovisual',
    shortName: 'Transporte audiovisual',
    tagline: 'Prototipo de una plataforma de transporte especial para producciones audiovisuales.',
    category: 'Transporte especial y producción audiovisual',
    h1Subtitle: 'operación de transporte para rodajes y producciones',
    summary:
      'Prototipo navegable de una plataforma de operación de transporte especial para producciones audiovisuales: trece superficies y doce perfiles de acceso, de la torre de control a la tesorería, en tema claro y oscuro, escritorio y móvil.',
    seoTitle: 'Software de transporte para producción audiovisual',
    seoDescription:
      'Plataforma de Nithios para transporte especial en producciones audiovisuales: torre de control, jornadas con firma en set, trailers, taller y pagos.',
    description: [
      'Este caso es el prototipo navegable de una plataforma de operación de transporte especial para producciones audiovisuales: vehículos, conductores, trailers, camerinos y equipos que una empresa de transporte pone al servicio de rodajes y producciones.',
      'Reúne trece superficies y doce perfiles de acceso —coordinador operativo, conductor, coordinador de trailers y equipos, coordinador de mantenimientos, personal sin vehículo, cliente o productora, analistas de documentación, liquidación y contabilidad, tesorería, gerencia y administrador—, y cada perfil ve solo lo que le corresponde.',
      'Cubre la asignación de servicios desde una torre de control, la jornada en campo con firma del responsable en set, la coordinación de trailers, el taller, la habilitación documental de aliados, la liquidación, el frente administrativo y financiero, la tesorería con dispersión de pagos, los reportes y los parámetros de la plataforma. Funciona en tema claro y oscuro, en escritorio y en móvil.',
    ],
    status: 'prototipo',
    statusLabel: 'Prototipo navegable de interfaz con datos de demostración',
    features: [
      { title: 'Torre de control y despacho', text: 'Servicios del día, alarmas y propuesta de candidatos para cada servicio, con el motivo de los descartados.', icon: 'target' },
      { title: 'Jornada con firma en set', text: 'El conductor registra su jornada, novedades con evidencia y la firma del responsable en set, incluso sin conexión.', icon: 'phone' },
      { title: 'Portal de la productora', text: 'El cliente sigue sus servicios, pide nuevos y recibe alternativas cuando el recurso no alcanza.', icon: 'browser' },
      { title: 'Trailers y equipos', text: 'Orden del día, enganches, alistamientos y conflictos de programación en un solo tablero.', icon: 'truck' },
      { title: 'Taller y mantenimiento', text: 'Solicitudes, órdenes de trabajo, inventario de repuestos y compras por autorizar.', icon: 'cpu' },
      { title: 'Aliados y documentación', text: 'Habilitación documental con vigencias, revisión de soportes y documento de transporte especial.', icon: 'id' },
      { title: 'Liquidación y finanzas', text: 'Conciliación con clientes y proveedores, liquidación por corte, tarifas y cartera.', icon: 'database' },
      { title: 'Tesorería y reportes', text: 'Programación de pagos con archivo de dispersión, indicadores de la operación y parámetros.', icon: 'chart' },
    ],
    highlights: [
      'Trece superficies y doce perfiles de acceso',
      'Jornada en campo con firma del responsable en set',
      'De la torre de control a la tesorería',
      'Tema claro y oscuro, escritorio y móvil',
    ],
    platforms: ['Web', 'Vista móvil'],
    languages: ['Español'],
    stack: [],
    security: [
      'Acceso por perfil: doce perfiles, cada uno con sus superficies',
      'Segregación de funciones en las acciones sensibles',
      'Portal del cliente aislado por proyecto',
      'Log de auditoría',
    ],
    serviceSlug: 'desarrollo-de-software-a-medida',
    monogram: 'T',
    featured: true,
    order: 3,
    whatsappMessage: 'Hola Nithios, vi el caso de la plataforma de transporte audiovisual y quiero una plataforma de operación a la medida para mi empresa.',
    cover: transporteTorre,
    coverAlt:
      'Torre de control de la plataforma de transporte audiovisual: servicios del día, alarmas y candidatos propuestos, con datos ficticios.',
    ogImage: transporteOg,
    ogImageAlt:
      'Plataforma de transporte audiovisual, caso de Nithios: torre de control del prototipo con servicios y candidatos',
    headline: 'Cada servicio de rodaje, del pedido al pago.',
    challenge:
      'Una empresa de transporte especial para producciones audiovisuales coordina a diario vehículos, conductores, trailers y personal en locaciones distintas, con jornadas largas que cambian sobre la marcha. Si la asignación se hace por chat, la firma del servicio queda en papel y la liquidación se arma a mano, aparecen recursos duplicados, servicios sin soporte, pagos retenidos y poca visibilidad para la productora.',
    solution: [
      'La plataforma está diseñada para que quien pide el servicio y quien lo presta se encuentren en un solo lugar. La torre de control propone qué recursos pueden atender cada servicio y explica por qué descarta a los demás; los aliados declaran hasta cuándo están disponibles, y la productora sabe al pedir si el recurso alcanza y recibe alternativas.',
      'En campo, el conductor y el personal sin vehículo registran su jornada paso a paso —checklist, llegada a locación, novedades con fotografía y cierre— y el responsable en set firma el servicio en el teléfono. Trailers, taller y habilitación documental tienen su propio frente, con el estado de cada activo.',
      'Esa operación firmada alimenta la liquidación, la conciliación con clientes y proveedores, el frente financiero y la tesorería, que programa los pagos y genera el archivo de dispersión. Doce perfiles de acceso separan qué ve y qué decide cada área.',
    ],
    value: [
      { title: 'Asignación con criterio', text: 'Candidatos propuestos por continuidad y cumplimiento, con el motivo de cada descarte.', icon: 'target' },
      { title: 'Servicios con soporte', text: 'Jornada, novedades y firma en set registradas desde el teléfono, no en papel.', icon: 'check-circle' },
      { title: 'Del servicio al pago', text: 'La operación firmada fluye a la liquidación, la conciliación y la dispersión de pagos.', icon: 'workflow' },
      { title: 'Cada área en lo suyo', text: 'Doce perfiles de acceso con segregación de funciones y auditoría.', icon: 'shield' },
    ],
    statusNote:
      'Es un prototipo navegable de interfaz. El nombre de la empresa para la que se diseñó se reserva por confidencialidad. Las empresas, producciones, personas, placas y cifras que aparecen en las capturas son datos ficticios de demostración.',
    images: [
      {
        src: transporteTorre,
        alt: 'Torre de control y despacho: servicios de hoy, liquidaciones retenidas y alarmas, con candidatos por continuidad, cumplimiento y costo.',
        caption: 'Torre de control: los candidatos propuestos para cada servicio, con continuidad, cumplimiento y costo.',
      },
      {
        src: transporteAcceso,
        alt: 'Pantalla de acceso por perfil: perfiles agrupados en operación, cliente, control y finanzas, dirección y administración.',
        caption: 'Acceso por perfil: doce perfiles, cada uno con sus propias superficies.',
      },
      {
        src: transporteJornada,
        alt: 'Jornada del conductor: horas de disponibilidad, hora extra, novedades, estado de la firma en set y línea de tiempo de la jornada.',
        caption: 'Jornada del conductor: línea de tiempo del servicio, novedades con evidencia y firma del responsable en set.',
      },
      {
        src: transporteTrailers,
        alt: 'Coordinación de trailers: trailers listos, enganches confirmados, personal en jornada, conflictos y orden del día con sus movimientos.',
        caption: 'Trailers y equipos: la orden del día con enganches, entregas y conflictos de programación.',
      },
      {
        src: transporteTaller,
        alt: 'Taller y mantenimiento: solicitudes sin orden de trabajo, órdenes abiertas, repuestos en el mínimo y compras por autorizar.',
        caption: 'Taller: solicitudes, órdenes de trabajo, repuestos y compras en un mismo tablero.',
      },
      {
        src: transporteReportes,
        alt: 'Reportes de la operación de transporte: demanda atendida, líneas sin cubrir, tiempo de asignación y continuidad, con detalle de solicitudes.',
        caption: 'Reportes: indicadores para saber si la operación cumple lo que se pidió.',
      },
    ],
    faqs: [
      {
        category: 'desarrollo',
        question: '¿Qué es la plataforma de transporte audiovisual?',
        answer:
          'Es una plataforma de operación de transporte especial para producciones audiovisuales, diseñada por Nithios para una empresa del sector cuyo nombre se reserva por confidencialidad. Cubre la torre de control y el despacho, la jornada del conductor con firma en set, trailers, taller, documentación de aliados, liquidación, finanzas, tesorería, reportes y parámetros, con doce perfiles de acceso.',
      },
      {
        category: 'desarrollo',
        question: '¿La plataforma de transporte audiovisual ya está en producción?',
        answer:
          'No. Hoy es un prototipo navegable de interfaz con datos de demostración, en tema claro y oscuro y en vista de escritorio y móvil, pensado para validar la experiencia de cada perfil antes de construir el sistema.',
      },
      {
        category: 'desarrollo',
        question: '¿Pueden desarrollar una plataforma de operación similar para mi empresa de transporte?',
        answer:
          'Sí. Desarrollamos software a medida para empresas de transporte y servicios en toda Colombia. Definimos contigo los perfiles, la operación en campo y el flujo hasta la liquidación y el pago. Escríbenos por WhatsApp para empezar.',
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
    ogImageAlt: 'Krystal, caso de portafolio de Nithios: ilustración conceptual de agenda semanal y videollamada para consultorios psicológicos',
    featured: true,
    order: 4,
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
      'Nithios desarrolla software a medida con nuevas tecnologías: plataformas web de gestión, aplicaciones móviles, sistemas internos y soluciones con inteligencia artificial. En este portafolio verás cuatro ejemplos: Dragon Global Trade, para comercio internacional; una plataforma logística de pedidos, rutas y despachos para la distribución de acero; una plataforma de operación de transporte especial para producciones audiovisuales, y Krystal, para consultorios psicológicos con atención remota.',
  },
  {
    category: 'desarrollo',
    question: '¿Nithios trabaja con empresas fuera de Medellín?',
    answer:
      'Sí. Nithios se dirige desde Medellín y trabaja de forma remota con empresas de toda Colombia, incluidas Bogotá, Cali, Barranquilla, Bucaramanga, Cartagena y Pereira. Todo el proceso, desde el diagnóstico hasta la entrega, se coordina en línea.',
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
