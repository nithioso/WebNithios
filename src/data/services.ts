/**
 * Líneas de servicio de Nithios.
 * Copy redactado a partir de los hechos del brief: sin cifras, clientes ni precios inventados.
 */
import type { IconName } from '@/lib/icons';

export interface Benefit {
  title: string;
  text: string;
  icon?: IconName;
}

export interface ProcessStep {
  title: string;
  text: string;
}

export interface ServiceCapability {
  title: string;
  text: string;
  icon: IconName;
}

export interface Service {
  slug: string;
  path: string;
  /** Nombre comercial completo (h1 de la página del servicio). */
  name: string;
  /** Nombre corto para menús, tarjetas y breadcrumbs. */
  shortName: string;
  icon: IconName;
  /** Frase de valor corta (titular). */
  headline: string;
  /** Resumen de 1–2 frases (tarjetas, meta y schema). */
  summary: string;
  /** Meta title (≤60 car.) y description (140–160 car.) sugeridos para la página. */
  seoTitle: string;
  seoDescription: string;
  /** Párrafos introductorios. */
  intro: string[];
  /** Para quién es. */
  idealFor: string[];
  capabilities: ServiceCapability[];
  benefits: Benefit[];
  process: ProcessStep[];
  deliverables: string[];
  /** Tecnologías o ámbitos de referencia (solo hechos/ámbitos generales). */
  technologies?: string[];
  /** Términos de búsqueda objetivo (no se muestran; guían el copy). */
  keywords: string[];
  whatsappMessage: string;
}

export const services: Service[] = [
  {
    slug: 'consultoria-tecnologica',
    path: '/servicios/consultoria-tecnologica/',
    name: 'Consultoría tecnológica para empresas',
    shortName: 'Consultoría tecnológica',
    icon: 'compass',
    headline: 'Decide mejor qué tecnología adoptar y cómo hacerla rendir.',
    summary:
      'Asesoría y consultoría tecnológica para empresas de cualquier tamaño y sector que quieren adoptar tecnología para mejorar sus procesos, con un plan claro y realista.',
    seoTitle: 'Consultoría tecnológica en Colombia | Nithios',
    seoDescription:
      'Consultoría tecnológica para empresas en Colombia: diagnóstico de procesos, hoja de ruta de transformación digital, IA y selección de tecnología. Hablemos.',
    intro: [
      'Adoptar tecnología no consiste en comprar herramientas: consiste en resolver problemas concretos del negocio. En Nithios te acompañamos a entender dónde están los cuellos de botella de tus procesos, qué tecnología tiene sentido para tu empresa y en qué orden conviene implementarla.',
      'Trabajamos con empresas de todo tipo y tamaño en Colombia que quieren digitalizar procesos, automatizar tareas repetitivas, aprovechar sus datos o incorporar inteligencia artificial sin improvisar ni desperdiciar presupuesto.',
    ],
    idealFor: [
      'Empresas que operan con hojas de cálculo, correos y procesos manuales que ya no escalan.',
      'Gerencias que necesitan una hoja de ruta de transformación digital con prioridades claras.',
      'Equipos que quieren evaluar inteligencia artificial y automatización con criterio de negocio.',
      'Organizaciones que deben elegir entre software comercial y desarrollo a medida.',
    ],
    capabilities: [
      {
        title: 'Diagnóstico de procesos',
        text: 'Mapeamos cómo trabaja hoy tu empresa, identificamos reprocesos, tiempos muertos y riesgos, y priorizamos lo que más impacto genera.',
        icon: 'search',
      },
      {
        title: 'Hoja de ruta de transformación digital',
        text: 'Convertimos el diagnóstico en un plan por etapas, con objetivos, dependencias y criterios de éxito medibles para cada fase.',
        icon: 'route',
      },
      {
        title: 'Inteligencia artificial aplicada',
        text: 'Identificamos casos de uso reales de IA para tu operación —atención, análisis de información, automatización— y evaluamos su viabilidad.',
        icon: 'spark',
      },
      {
        title: 'Selección y arquitectura de tecnología',
        text: 'Comparamos alternativas, definimos la arquitectura adecuada y te ayudamos a decidir entre adoptar una solución existente o construir a la medida.',
        icon: 'layers',
      },
      {
        title: 'Automatización e integración',
        text: 'Diseñamos cómo conectar tus sistemas y automatizar flujos para que la información circule sin doble digitación.',
        icon: 'workflow',
      },
      {
        title: 'Acompañamiento en la adopción',
        text: 'Te acompañamos en la implementación para que la tecnología se use de verdad: definición de roles, gestión del cambio y seguimiento.',
        icon: 'users',
      },
    ],
    benefits: [
      {
        title: 'Inversión con dirección',
        text: 'Cada peso invertido en tecnología responde a un objetivo de negocio, no a una moda.',
        icon: 'target',
      },
      {
        title: 'Procesos más ágiles',
        text: 'Menos tareas manuales, menos errores y más tiempo de tu equipo para lo que genera valor.',
        icon: 'bolt',
      },
      {
        title: 'Decisiones con información',
        text: 'Datos organizados y disponibles para decidir con evidencia y no por intuición.',
        icon: 'chart',
      },
      {
        title: 'Un aliado con visión ejecutiva',
        text: 'Liderazgo con casi 20 años de experiencia en tecnología en diferentes sectores, al servicio de tu estrategia.',
        icon: 'shield',
      },
    ],
    process: [
      {
        title: 'Conversación inicial',
        text: 'Nos cuentas tu contexto, tus objetivos y los dolores de tu operación. Definimos el alcance de la consultoría.',
      },
      {
        title: 'Diagnóstico',
        text: 'Analizamos procesos, sistemas y datos actuales junto con tu equipo para entender la situación real.',
      },
      {
        title: 'Plan y recomendaciones',
        text: 'Entregamos una hoja de ruta priorizada, con alternativas tecnológicas, riesgos y próximos pasos concretos.',
      },
      {
        title: 'Implementación acompañada',
        text: 'Si lo decides, ejecutamos o acompañamos la implementación, incluido el desarrollo a la medida cuando se requiere.',
      },
    ],
    deliverables: [
      'Diagnóstico de procesos y sistemas actuales',
      'Hoja de ruta de transformación digital priorizada por etapas',
      'Recomendación de tecnologías y arquitectura',
      'Identificación de casos de uso de inteligencia artificial y automatización',
      'Plan de implementación y acompañamiento',
    ],
    keywords: [
      'consultoría tecnológica en Colombia',
      'asesoría tecnológica para empresas',
      'transformación digital para empresas',
      'inteligencia artificial para empresas',
      'consultoría de transformación digital Bogotá',
      'consultoría TI Medellín',
    ],
    whatsappMessage: 'Hola Nithios, quiero información sobre la consultoría tecnológica para mi empresa.',
  },
  {
    slug: 'desarrollo-de-software-a-medida',
    path: '/servicios/desarrollo-de-software-a-medida/',
    name: 'Desarrollo de software a medida',
    shortName: 'Desarrollo a medida',
    icon: 'code',
    headline: 'Software hecho para tu operación, no al revés.',
    summary:
      'Desarrollo de aplicativos a la medida con nuevas tecnologías: plataformas web, aplicaciones móviles, sistemas de gestión e inteligencia artificial, diseñados alrededor de tus procesos.',
    seoTitle: 'Desarrollo de software a medida en Colombia | Nithios',
    seoDescription:
      'Desarrollo de software a medida en Colombia: plataformas web, apps móviles, sistemas de gestión e IA con tecnologías modernas, seguras y escalables. Cotiza.',
    intro: [
      'Cuando el software comercial obliga a tu empresa a cambiar su forma de trabajar, es momento de construir una solución propia. En Nithios desarrollamos aplicativos a la medida que se ajustan a tus procesos, se integran con lo que ya usas y crecen con tu negocio.',
      'Trabajamos por etapas: antes de escribir el código definitivo validamos flujos y pantallas con un prototipo navegable, y después entregamos versiones incrementales que puedes revisar, probar y ajustar con tu equipo.',
    ],
    idealFor: [
      'Empresas cuyos procesos no encajan en un software genérico.',
      'Negocios que quieren lanzar una plataforma o aplicación como producto propio.',
      'Organizaciones que necesitan centralizar información dispersa en varios sistemas.',
      'Equipos que buscan incorporar inteligencia artificial en sus aplicaciones.',
    ],
    capabilities: [
      {
        title: 'Plataformas y aplicaciones web',
        text: 'Sistemas web responsive, rápidos y seguros: portales, plataformas transaccionales y herramientas internas.',
        icon: 'browser',
      },
      {
        title: 'Aplicaciones móviles',
        text: 'Aplicaciones para Android e iOS, incluidas soluciones híbridas que comparten base de código con la versión web.',
        icon: 'phone',
      },
      {
        title: 'Sistemas de gestión a la medida',
        text: 'Módulos comerciales, de compras, logística, proyectos o atención, con roles y permisos ajustados a tu organización.',
        icon: 'grid',
      },
      {
        title: 'Inteligencia artificial',
        text: 'Funcionalidades con IA integradas a tus flujos: asistentes, clasificación y análisis de información, automatización inteligente.',
        icon: 'spark',
      },
      {
        title: 'Integraciones y APIs',
        text: 'Conectamos tu software con otros sistemas mediante APIs para que los datos fluyan sin reprocesos.',
        icon: 'plug',
      },
      {
        title: 'Comunicación en tiempo real',
        text: 'Videollamadas, notificaciones y colaboración en tiempo real cuando tu operación lo requiere.',
        icon: 'video',
      },
    ],
    benefits: [
      {
        title: 'Se adapta a tu proceso',
        text: 'Cada pantalla y cada flujo responde a cómo trabaja tu equipo, sin funciones que sobran ni que faltan.',
        icon: 'target',
      },
      {
        title: 'Seguridad desde el diseño',
        text: 'Autenticación, control de acceso por roles, validación de datos y buenas prácticas de seguridad desde el primer día.',
        icon: 'lock',
      },
      {
        title: 'Escalable y mantenible',
        text: 'Arquitectura y código pensados para crecer, evolucionar y mantenerse en el tiempo.',
        icon: 'layers',
      },
      {
        title: 'Experiencia premium',
        text: 'Interfaces claras y cuidadas que tu equipo y tus clientes disfrutan usar, en computador y en celular.',
        icon: 'sparkle',
      },
    ],
    process: [
      {
        title: 'Descubrimiento',
        text: 'Entendemos el problema, los usuarios y los procesos. Definimos alcance, prioridades y criterios de éxito.',
      },
      {
        title: 'Diseño de experiencia',
        text: 'Diseñamos flujos e interfaces y validamos con prototipos navegables antes de escribir el código definitivo.',
      },
      {
        title: 'Desarrollo iterativo',
        text: 'Construimos por entregas incrementales que puedes revisar, con pruebas y control de calidad en cada iteración.',
      },
      {
        title: 'Lanzamiento y evolución',
        text: 'Publicamos, acompañamos la puesta en marcha y seguimos mejorando el producto según el uso real.',
      },
    ],
    deliverables: [
      'Prototipo navegable de la interfaz',
      'Aplicación web y/o móvil funcional',
      'Panel de administración con roles y permisos',
      'Integraciones con los sistemas que ya utilizas',
      'Documentación técnica y acompañamiento en la puesta en marcha',
    ],
    technologies: [
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Node.js',
      'Express',
      'Prisma',
      'PostgreSQL',
      'WebRTC',
      'Socket.io',
      'Capacitor',
    ],
    keywords: [
      'desarrollo de software a medida en Colombia',
      'empresa de desarrollo de software Bogotá',
      'empresa de desarrollo de software Medellín',
      'desarrollo de aplicaciones web y móviles',
      'desarrollo de aplicaciones con inteligencia artificial',
      'software a la medida para empresas',
    ],
    whatsappMessage: 'Hola Nithios, quiero cotizar el desarrollo de un software a la medida.',
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
