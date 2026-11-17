/**
 * Contenido extendido de las páginas de servicios (/servicios/ y sus detalles).
 * Complementa `services.ts` (que sigue siendo la fuente de nombre, SEO, intro, beneficios y tecnologías).
 * REGLA: solo hechos del brief. Sin clientes, cifras, plazos, precios ni garantías inventadas.
 * Los sectores son ámbitos de aplicación posibles, NO clientes atendidos.
 */
import type { IconName } from '@/lib/icons';
import type { Faq } from '@/data/faqs';

export interface ServiceProblem {
  title: string;
  text: string;
  icon: IconName;
}

export interface ServiceInclusion {
  title: string;
  text: string;
  icon: IconName;
  points: string[];
}

export interface ServiceStep {
  title: string;
  text: string;
}

export interface ServiceDeliverable {
  title: string;
  text: string;
}

export interface ServiceSector {
  name: string;
  text: string;
  icon: IconName;
  /** Caso del portafolio relacionado (slug de projects.ts), si existe. */
  projectSlug?: string;
}

export interface ServiceDetail {
  slug: string;
  /** h1 con marcado dorado (texto equivalente a `service.name`). */
  heroTitleHtml: string;
  heroEyebrow: string;
  /** Títulos h2 de las secciones (con palabras clave). */
  headings: {
    audience: string;
    problems: string;
    inclusions: string;
    process: string;
    deliverables: string;
    sectors: string;
    portfolio: string;
  };
  /** Pregunta-respuesta citable (GEO): "¿Qué es…?" */
  whatIs: { question: string; answer: string; paragraphs: string[] };
  /** Intro de la sección "Para quién". */
  audienceIntro: string;
  problems: ServiceProblem[];
  inclusionsIntro: string;
  inclusions: ServiceInclusion[];
  /** Guía citable adicional (GEO), tras "¿Qué es…?". Opcional. */
  guide?: { eyebrow: string; title: string; answer: string; paragraphs: string[] };
  /** Bloque destacado (IA para empresas / MVP). */
  spotlight: { eyebrow: string; title: string; paragraphs: string[]; points: string[] };
  processIntro: string;
  process: ServiceStep[];
  deliverablesIntro: string;
  deliverables: ServiceDeliverable[];
  sectorsIntro: string;
  sectors: ServiceSector[];
  /** Cómo se relacionan los casos del portafolio con este servicio. */
  portfolioIntro: string;
  /** Slugs de projects.ts a mostrar; vacío = todos los relacionados por serviceSlug. */
  projectSlugs: string[];
  coverageTitle: string;
  coverageText: string;
  faqs: Faq[];
  /** Puente hacia el otro servicio. */
  crossSell: { slug: string; title: string; text: string };
  cta: { title: string; text: string };
}

export const serviceDetails: ServiceDetail[] = [
  /* ------------------------------------------------------------------ */
  {
    slug: 'consultoria-tecnologica',
    heroEyebrow: 'Consultoría tecnológica en Colombia',
    heroTitleHtml: 'Consultoría tecnológica <span class="text-gold">para empresas</span>',
    headings: {
      audience: '¿Para quién es la consultoría tecnológica?',
      problems: 'Si esto te suena, podemos ayudarte.',
      inclusions: 'Qué incluye nuestra consultoría tecnológica',
      process: 'Así trabajamos la consultoría, paso a paso.',
      deliverables: 'Lo que recibes al final.',
      sectors: 'Consultoría para cualquier sector.',
      portfolio: 'De la estrategia al software.',
    },
    whatIs: {
      question: '¿Qué es la consultoría tecnológica?',
      answer:
        'La consultoría tecnológica es un acompañamiento experto que ayuda a una empresa a decidir qué tecnología adoptar, en qué orden y cómo implementarla para mejorar sus procesos. En Nithios la enfocamos en resultados de negocio: menos reprocesos, información confiable y decisiones de inversión con dirección.',
      paragraphs: [
        'Muchas empresas en Colombia compran software, contratan desarrollos o prueban herramientas de inteligencia artificial sin un diagnóstico previo. El resultado suele ser el mismo: sistemas que no se hablan entre sí, licencias que nadie usa y equipos que vuelven a la hoja de cálculo. La consultoría tecnológica existe para evitar ese desgaste.',
        'Nuestro trabajo empieza por entender cómo opera tu empresa hoy, dónde se pierde tiempo, dinero o información, y qué objetivos quieres alcanzar. Con esa claridad diseñamos una hoja de ruta de transformación digital por etapas, recomendamos la tecnología adecuada —sea una solución existente o un desarrollo a la medida— y, si lo decides, te acompañamos en la implementación hasta que la tecnología se use de verdad.',
      ],
    },
    audienceIntro:
      'La consultoría tecnológica sirve a empresas de cualquier tamaño y sector. Lo que importa no es cuántas personas trabajan en tu organización, sino tener procesos que quieres mejorar y la decisión de hacerlo con método.',
    problems: [
      {
        title: 'Procesos manuales que ya no escalan',
        text: 'Hojas de cálculo, correos y aprobaciones en papel que funcionaban con pocos clientes y hoy frenan el crecimiento.',
        icon: 'clock',
      },
      {
        title: 'Sistemas que no se hablan',
        text: 'Información duplicada en varias herramientas, doble digitación y reportes que nunca cuadran.',
        icon: 'plug',
      },
      {
        title: 'Tecnología comprada que nadie usa',
        text: 'Licencias y plataformas adquiridas sin un plan de adopción que terminan abandonadas.',
        icon: 'layers',
      },
      {
        title: 'Decisiones sin datos confiables',
        text: 'La gerencia decide por intuición porque la información está dispersa, desactualizada o incompleta.',
        icon: 'chart',
      },
      {
        title: 'Riesgos de seguridad sin gestionar',
        text: 'Accesos sin control, datos sensibles expuestos y ninguna política clara para proteger la información.',
        icon: 'shield',
      },
      {
        title: 'Presión por adoptar IA sin un rumbo',
        text: 'Se habla de inteligencia artificial en cada reunión, pero nadie sabe por dónde empezar ni qué esperar.',
        icon: 'spark',
      },
    ],
    inclusionsIntro:
      'Cada consultoría se ajusta a tu contexto. Estos son los frentes que cubrimos; puedes empezar por uno o abordarlos de forma integral.',
    inclusions: [
      {
        title: 'Diagnóstico tecnológico',
        text: 'Una radiografía honesta de tus procesos, sistemas, datos y equipo para saber exactamente dónde estás y qué te está costando la forma actual de trabajar.',
        icon: 'search',
        points: [
          'Mapeo de procesos clave y sus cuellos de botella',
          'Inventario de sistemas, integraciones y datos',
          'Priorización por impacto y esfuerzo',
        ],
      },
      {
        title: 'Hoja de ruta de transformación digital',
        text: 'El diagnóstico se convierte en un plan por etapas con objetivos, dependencias y criterios de éxito medibles.',
        icon: 'route',
        points: ['Fases con objetivos claros', 'Logros rápidos primero', 'Riesgos y dependencias visibles'],
      },
      {
        title: 'Selección de tecnología y proveedores',
        text: 'Comparamos alternativas con criterios objetivos y te ayudamos a decidir entre adoptar una solución existente o construir a la medida.',
        icon: 'target',
        points: ['Criterios de evaluación', 'Comparativo de opciones', 'Apoyo en la revisión de propuestas'],
      },
      {
        title: 'Arquitectura tecnológica',
        text: 'Definimos cómo deben encajar tus sistemas, datos e integraciones para crecer sin rehacer todo cada año.',
        icon: 'layers',
        points: ['Arquitectura objetivo', 'Estrategia de integración', 'Escalabilidad y mantenimiento'],
      },
      {
        title: 'Protección de la información',
        text: 'Cada recomendación tiene en cuenta cómo se protege tu información, con medidas proporcionales a tu operación.',
        icon: 'lock',
        points: ['Control de accesos y roles', 'Cuidado de los datos sensibles', 'Buenas prácticas para el equipo'],
      },
      {
        title: 'Adopción de IA y automatización',
        text: 'Identificamos casos de uso de inteligencia artificial y automatización con sentido de negocio, evaluamos su viabilidad y definimos cómo integrarlos a tu operación.',
        icon: 'spark',
        points: ['Casos de uso priorizados', 'Automatización de tareas repetitivas', 'Integración con tus procesos'],
      },
      {
        title: 'Acompañamiento estratégico continuo',
        text: 'Seguimos a tu lado después del diagnóstico para que las decisiones de tecnología se tomen con criterio y la hoja de ruta avance.',
        icon: 'users',
        points: ['Apoyo a la gerencia en decisiones tecnológicas', 'Seguimiento de proveedores y proyectos', 'Gestión del cambio'],
      },
    ],
    guide: {
      eyebrow: 'Transformación digital',
      title: 'Transformación digital para empresas: por dónde empezar',
      answer:
        'La transformación digital de una empresa empieza por sus procesos, no por el software. El primer paso es identificar los dos o tres procesos que más tiempo, dinero o información hacen perder; el segundo, decidir qué tecnología los mejora y en qué orden; el tercero, implementarla por etapas y medir su adopción.',
      paragraphs: [
        'Intentar digitalizarlo todo al mismo tiempo suele terminar en proyectos largos, equipos cansados y herramientas a medio usar. Por eso en Nithios recomendamos empezar por un diagnóstico corto y enfocado: qué procesos duelen más, qué información falta para decidir y qué sistemas ya tienes que se pueden aprovechar.',
        'Con esa claridad se arma una hoja de ruta por fases, con logros rápidos al inicio que generan confianza y financian las siguientes etapas. Cada fase tiene un objetivo de negocio y una forma concreta de medir si la tecnología se está usando de verdad.',
      ],
    },
    spotlight: {
      eyebrow: 'Inteligencia artificial',
      title: 'Inteligencia artificial para empresas en Colombia',
      paragraphs: [
        'Una empresa en Colombia puede empezar a usar inteligencia artificial sin grandes inversiones: primero identifica tareas repetitivas o decisiones que dependen de mucha información, luego prueba un caso de uso acotado con datos propios y, si funciona, lo integra a sus procesos. La clave está en escoger bien el primer caso.',
        'En la consultoría evaluamos dónde la IA aporta valor real en tu operación —atención a clientes, clasificación de documentos, análisis de información, automatización de tareas— y dónde todavía no conviene. Así inviertes en casos con sentido de negocio y no en experimentos que se quedan en una presentación.',
        'Nithios es liderada por Jonathan Osorio, CEO y Fundador, un alto ejecutivo de tecnología con casi 20 años de experiencia en diferentes sectores. Esa trayectoria se traduce en preguntas correctas, decisiones con contexto y menos dinero invertido en caminos que no llevan a ningún lado.',
      ],
      points: [
        'Casos de uso de IA priorizados por impacto y viabilidad',
        'Revisión de los datos disponibles para cada caso',
        'Prueba acotada antes de invertir a escala',
        'Integración con tus procesos y sistemas actuales',
      ],
    },
    processIntro:
      'Un método claro, de la primera conversación a la implementación. Sabes en todo momento qué estamos haciendo, por qué y qué viene después.',
    process: [
      {
        title: 'Conversación inicial',
        text: 'Nos escribes por WhatsApp, conversamos sobre tu contexto, objetivos y dolores, y definimos juntos el alcance de la consultoría.',
      },
      {
        title: 'Inmersión y diagnóstico',
        text: 'Revisamos con tu equipo procesos, sistemas y datos para entender la situación real, no la que dicen los manuales.',
      },
      {
        title: 'Análisis y priorización',
        text: 'Ordenamos las oportunidades por impacto y esfuerzo, y evaluamos alternativas tecnológicas para cada una.',
      },
      {
        title: 'Hoja de ruta y recomendaciones',
        text: 'Te entregamos un plan por etapas con tecnologías recomendadas, arquitectura, riesgos y próximos pasos concretos.',
      },
      {
        title: 'Implementación acompañada',
        text: 'Si lo decides, ejecutamos o acompañamos la implementación, incluido el desarrollo a la medida cuando hace falta.',
      },
      {
        title: 'Seguimiento y ajuste',
        text: 'Medimos la adopción frente a los criterios de éxito definidos y ajustamos el plan con lo aprendido.',
      },
    ],
    deliverablesIntro: 'Sales de la consultoría con documentos accionables, no con presentaciones que se olvidan en una carpeta.',
    deliverables: [
      {
        title: 'Diagnóstico de procesos y sistemas',
        text: 'Estado actual de tu operación, hallazgos principales y oportunidades priorizadas.',
      },
      {
        title: 'Hoja de ruta de transformación digital',
        text: 'Plan por etapas con objetivos, dependencias y criterios de éxito para cada fase.',
      },
      {
        title: 'Recomendación de tecnologías y arquitectura',
        text: 'Qué adoptar, qué construir, cómo se integra y por qué, con alternativas comparadas.',
      },
      {
        title: 'Casos de uso de IA y automatización',
        text: 'Oportunidades concretas de inteligencia artificial y automatización evaluadas por viabilidad.',
      },
      {
        title: 'Plan de implementación y acompañamiento',
        text: 'Responsables, secuencia y forma de medir la adopción para que el plan se ejecute.',
      },
    ],
    sectorsIntro:
      'Trabajamos con todo tipo de empresas. Jonathan Osorio suma casi 20 años de experiencia en tecnología en diferentes sectores, y el método es el mismo en todos: entender el proceso antes de proponer la herramienta. Estos son algunos ámbitos donde la consultoría tecnológica genera impacto:',
    sectors: [
      { name: 'Comercio exterior y logística', text: 'Trazabilidad de operaciones, compras y proveedores en varios países.', icon: 'globe', projectSlug: 'dragon-global-trade' },
      { name: 'Salud y bienestar', text: 'Agendas, atención remota e información sensible bien protegida.', icon: 'heart', projectSlug: 'krystal' },
      { name: 'Servicios profesionales', text: 'Gestión de clientes, proyectos y conocimiento del equipo.', icon: 'briefcase' },
      { name: 'Comercio y distribución', text: 'Ventas, inventarios y atención conectados en un mismo flujo.', icon: 'cart' },
      { name: 'Industria y manufactura', text: 'Procesos operativos medibles y datos para decidir a tiempo.', icon: 'cpu' },
      { name: 'Educación y formación', text: 'Plataformas, contenidos y seguimiento de estudiantes en línea.', icon: 'graduation' },
    ],
    portfolioIntro:
      'Una buena consultoría muchas veces termina en software. Estos son ejemplos de plataformas que Nithios ha diseñado y desarrollado.',
    projectSlugs: [],
    coverageTitle: 'Consultoría tecnológica en toda Colombia',
    coverageText:
      'Atendemos de forma remota empresas en toda Colombia. Si buscas consultoría tecnológica en Bogotá, asesoría de transformación digital en Medellín o un aliado de tecnología en Cali, Barranquilla, Bucaramanga, Cartagena o Pereira, trabajamos contigo con reuniones en línea, tableros compartidos y entregas digitales, con la misma cercanía que si estuviéramos en tu oficina.',
    faqs: [
      {
        category: 'consultoria',
        question: '¿Qué incluye un diagnóstico tecnológico?',
        answer:
          'Un diagnóstico tecnológico incluye el mapeo de tus procesos clave, el inventario de sistemas, integraciones y datos, la identificación de cuellos de botella y riesgos, y una lista de oportunidades priorizadas por impacto y esfuerzo. Es la base para construir la hoja de ruta de transformación digital.',
      },
      {
        category: 'consultoria',
        question: '¿La consultoría tecnológica incluye inteligencia artificial?',
        answer:
          'Sí, como parte del diagnóstico y de la hoja de ruta: identificamos en qué procesos la IA puede aportar y con qué datos y riesgos. La implementación la detallamos en [inteligencia artificial para empresas](/servicios/inteligencia-artificial-para-empresas/) y la guía [cómo empezar con IA en tu empresa](/guias/como-empezar-con-inteligencia-artificial-en-tu-empresa/).',
      },
      {
        category: 'consultoria',
        question: '¿La consultoría tecnológica sirve para pymes o solo para grandes empresas?',
        answer:
          'Sirve para empresas de cualquier tamaño. En una pyme la consultoría evita inversiones equivocadas que pesan mucho en el presupuesto; en una empresa grande ordena prioridades entre muchas iniciativas. El alcance se ajusta a tu realidad y a tus objetivos.',
      },
      {
        category: 'consultoria',
        question: '¿Nos ayudan a elegir proveedores de software?',
        answer:
          'Sí. Definimos contigo los criterios de evaluación, comparamos alternativas, te apoyamos en la revisión de propuestas y te ayudamos a decidir si conviene adoptar una solución existente o desarrollar a la medida, siempre en función de tus procesos y objetivos.',
      },
      {
        category: 'consultoria',
        question: '¿La consultoría tiene en cuenta la seguridad de la información?',
        answer:
          'Sí. Cada recomendación considera cómo se controlan los accesos, cómo se protegen los datos sensibles y qué prácticas sigue tu equipo, para que la tecnología que adoptes no abra riesgos nuevos en tu operación.',
      },
      {
        category: 'consultoria',
        question: '¿Qué pasa cuando termina la consultoría?',
        answer:
          'Te quedas con una hoja de ruta clara y accionable. Puedes ejecutarla con tu equipo o tus proveedores, o pedirnos que acompañemos la implementación, incluido el desarrollo de software a la medida cuando la mejor solución no existe en el mercado.',
      },
    ],
    crossSell: {
      slug: 'desarrollo-de-software-a-medida',
      title: '¿La mejor solución aún no existe? La construimos.',
      text: 'Cuando la hoja de ruta indica que ningún software comercial se ajusta a tu operación, el mismo equipo que hizo el diagnóstico diseña y desarrolla la solución a la medida.',
    },
    cta: {
      title: 'Convierte la tecnología en una ventaja, no en un gasto.',
      text: 'Cuéntanos qué procesos quieres mejorar. Te respondemos por WhatsApp para entender tu contexto y proponerte el siguiente paso.',
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'desarrollo-de-software-a-medida',
    heroEyebrow: 'Desarrollo de software en Colombia',
    heroTitleHtml: 'Desarrollo de software <span class="text-gold">a medida</span>',
    headings: {
      audience: '¿Cuándo conviene un software a medida?',
      problems: 'Problemas que resolvemos con software.',
      inclusions: 'Qué desarrollamos a la medida',
      process: 'Del primer boceto al lanzamiento.',
      deliverables: 'Lo que recibes con tu software.',
      sectors: 'Software para cualquier industria.',
      portfolio: 'Software que diseñamos y desarrollamos.',
    },
    whatIs: {
      question: '¿Qué es el desarrollo de software a medida?',
      answer:
        'El desarrollo de software a medida es la creación de aplicaciones diseñadas específicamente para los procesos, usuarios y objetivos de una empresa, en lugar de adaptar la empresa a un programa genérico. En Nithios construimos plataformas web, apps móviles, sistemas de gestión y soluciones con inteligencia artificial con tecnologías modernas.',
      paragraphs: [
        'El software comercial resuelve problemas comunes, pero rara vez se ajusta a lo que hace única a tu operación. Cuando tu equipo termina usando cuatro herramientas desconectadas, exportando datos a hojas de cálculo o cambiando procesos que funcionaban bien solo para encajar en un programa, un desarrollo a medida suele ser la mejor inversión.',
        'Un aplicativo a la medida es tuyo en su lógica: cada pantalla, flujo, rol y reporte responde a cómo trabaja tu empresa. Se integra con los sistemas que ya usas, crece al ritmo de tu negocio y se convierte en un activo diferenciador. Lo diseñamos con una experiencia de usuario cuidada, seguridad desde el primer día y una arquitectura pensada para evolucionar.',
      ],
    },
    audienceIntro:
      'El desarrollo a medida tiene sentido cuando tu forma de operar es una ventaja que no quieres sacrificar, o cuando quieres lanzar un producto digital propio.',
    problems: [
      {
        title: 'El software genérico no se ajusta',
        text: 'Tu equipo adapta su trabajo a la herramienta, con atajos y reprocesos que nadie documenta.',
        icon: 'grid',
      },
      {
        title: 'Información dispersa en varias herramientas',
        text: 'Clientes en un lado, operación en otro y reportes armados a mano cada mes.',
        icon: 'database',
      },
      {
        title: 'Sistemas antiguos que frenan',
        text: 'Aplicaciones lentas, difíciles de mantener o imposibles de usar desde el celular.',
        icon: 'clock',
      },
      {
        title: 'Una idea de producto sin validar',
        text: 'Quieres lanzar una plataforma o app propia y necesitas probarla en el mercado sin construirlo todo de una vez.',
        icon: 'sparkle',
      },
      {
        title: 'Atención y servicio que no escalan',
        text: 'Agendas, solicitudes y comunicaciones que dependen de llamadas y mensajes sueltos.',
        icon: 'message',
      },
      {
        title: 'Datos sensibles sin control de acceso',
        text: 'Todos ven todo, no hay roles definidos y la información crítica queda expuesta.',
        icon: 'lock',
      },
    ],
    inclusionsIntro:
      'Desarrollamos aplicativos a la medida de todo tipo. Estas son las soluciones que construimos, solas o combinadas en una misma plataforma.',
    inclusions: [
      {
        title: 'Aplicaciones web',
        text: 'Plataformas web responsive, rápidas y seguras: portales de clientes, plataformas transaccionales, herramientas internas y paneles de administración.',
        icon: 'browser',
        points: ['Funcionan en cualquier pantalla', 'Paneles con roles y permisos', 'Interfaces claras y cuidadas'],
      },
      {
        title: 'Aplicaciones móviles',
        text: 'Apps para Android e iOS, incluidas soluciones híbridas que comparten base de código con la versión web.',
        icon: 'phone',
        points: ['Android e iOS', 'Código compartido con la web', 'Experiencia nativa en el celular'],
      },
      {
        title: 'Plataformas empresariales',
        text: 'Sistemas de gestión con módulos comerciales, de compras, logística, proyectos o atención, ajustados a tu organización.',
        icon: 'grid',
        points: ['Módulos a tu medida', 'Datos maestros unificados', 'Control de acceso por roles'],
      },
      {
        title: 'Integraciones y APIs',
        text: 'Conectamos tu software con otros sistemas para que los datos fluyan sin doble digitación.',
        icon: 'plug',
        points: ['APIs propias y de terceros', 'Sincronización de datos', 'Menos reprocesos'],
      },
      {
        title: 'Soluciones con IA',
        text: 'Inteligencia artificial integrada a tus flujos: asistentes, clasificación y análisis de información, automatización inteligente.',
        icon: 'spark',
        points: ['Asistentes inteligentes', 'Análisis de información', 'Automatización de tareas'],
      },
      {
        title: 'Modernización de sistemas',
        text: 'Llevamos aplicaciones antiguas a tecnologías actuales, con mejor experiencia, seguridad y mantenibilidad, cuidando la continuidad de tu operación.',
        icon: 'workflow',
        points: ['Migración por etapas', 'Nueva interfaz web y móvil', 'Arquitectura mantenible'],
      },
      {
        title: 'MVPs y productos digitales',
        text: 'Lanzamos la primera versión funcional de tu producto con lo esencial para validarlo con usuarios reales y decidir con evidencia.',
        icon: 'bolt',
        points: ['Alcance enfocado', 'Prototipo navegable primero', 'Base lista para crecer'],
      },
    ],
    spotlight: {
      eyebrow: 'MVP',
      title: 'Empieza pequeño. Valida rápido. Crece con evidencia.',
      paragraphs: [
        'Un MVP —producto mínimo viable— es la primera versión de tu software con las funciones esenciales para resolver el problema principal. Te permite ponerlo en manos de usuarios reales, aprender de su uso y decidir en qué invertir después, en lugar de construir durante meses algo que nadie ha probado.',
        'Antes de escribir el código definitivo diseñamos un prototipo navegable para validar flujos e interfaces. Así lo hicimos con Dragon Global Trade, cuya interfaz se construyó como prototipo navegable con datos de demostración para recorrer la experiencia completa antes del desarrollo.',
      ],
      points: [
        'Alcance enfocado en el problema principal',
        'Prototipo navegable para validar antes de construir',
        'Entregas incrementales que puedes revisar',
        'Arquitectura preparada para crecer',
      ],
    },
    processIntro:
      'Desarrollo iterativo con entregas que puedes ver y validar. Nada de cajas negras ni sorpresas al final.',
    process: [
      {
        title: 'Descubrimiento',
        text: 'Entendemos el problema, los usuarios y los procesos. Definimos alcance, prioridades y criterios de éxito.',
      },
      {
        title: 'Arquitectura y plan',
        text: 'Elegimos el stack adecuado, diseñamos la arquitectura y organizamos el trabajo en entregas incrementales.',
      },
      {
        title: 'Diseño de experiencia',
        text: 'Diseñamos flujos e interfaces y los validamos con un prototipo navegable antes del código definitivo.',
      },
      {
        title: 'Desarrollo iterativo',
        text: 'Construimos por entregas que puedes revisar, con control de calidad en cada iteración.',
      },
      {
        title: 'Pruebas y seguridad',
        text: 'Verificamos funcionalidad, rendimiento y controles de seguridad como autenticación, roles y validación de datos.',
      },
      {
        title: 'Lanzamiento y evolución',
        text: 'Publicamos, acompañamos la puesta en marcha y seguimos mejorando el producto según el uso real.',
      },
    ],
    deliverablesIntro: 'Recibes software funcionando y todo lo necesario para operarlo y hacerlo crecer.',
    deliverables: [
      {
        title: 'Prototipo navegable de la interfaz',
        text: 'Para validar flujos y diseño con tu equipo antes de construir.',
      },
      {
        title: 'Aplicación web y/o móvil funcional',
        text: 'Lista para que tus usuarios trabajen con ella, en computador y en celular.',
      },
      {
        title: 'Panel de administración con roles y permisos',
        text: 'Cada usuario ve y gestiona solo lo que le corresponde.',
      },
      {
        title: 'Integraciones con tus sistemas',
        text: 'Conexión con las herramientas que ya utilizas para evitar doble digitación.',
      },
      {
        title: 'Documentación y puesta en marcha',
        text: 'Documentación técnica y acompañamiento durante el lanzamiento.',
      },
    ],
    sectorsIntro:
      'Desarrollamos software para todo tipo de empresas. Nuestro portafolio incluye plataformas para comercio internacional y salud mental; estos son algunos ámbitos donde un desarrollo a medida marca la diferencia:',
    sectors: [
      { name: 'Comercio exterior y logística', text: 'Operación comercial, compras y logística en una sola plataforma.', icon: 'truck', projectSlug: 'dragon-global-trade' },
      { name: 'Salud y bienestar', text: 'Consultorios, agendas, videollamadas e historia clínica.', icon: 'heart', projectSlug: 'krystal' },
      { name: 'Servicios profesionales', text: 'Portales de clientes, gestión de proyectos y flujos de aprobación.', icon: 'briefcase' },
      { name: 'Comercio y distribución', text: 'Pedidos, inventarios y atención integrados.', icon: 'cart' },
      { name: 'Educación y formación', text: 'Plataformas de aprendizaje y seguimiento en línea.', icon: 'graduation' },
      { name: 'Industria y operaciones', text: 'Control de procesos, datos operativos y tableros de gestión.', icon: 'cpu' },
    ],
    portfolioIntro:
      'Así se ve nuestro trabajo: plataformas que Nithios ha diseñado y desarrollado, con experiencia de usuario cuidada y seguridad desde el diseño.',
    projectSlugs: [],
    coverageTitle: 'Empresa de desarrollo de software en Bogotá, Medellín y toda Colombia',
    coverageText:
      'Si buscas una empresa de desarrollo de software en Bogotá, Medellín, Cali, Barranquilla, Bucaramanga, Cartagena o Pereira, trabajamos contigo de forma remota en todo el país. Coordinamos reuniones, revisiones de avance y entregas en línea, para que veas tu software tomar forma sin importar en qué ciudad esté tu equipo.',
    faqs: [
      {
        category: 'desarrollo',
        question: '¿Qué es un MVP y por qué conviene empezar por ahí?',
        answer:
          'Un MVP o producto mínimo viable es la primera versión de un software con las funciones esenciales para resolver el problema principal. Conviene porque permite validar la idea con usuarios reales, aprender de su uso y decidir con evidencia en qué invertir después, reduciendo el riesgo del proyecto.',
      },
      {
        category: 'desarrollo',
        question: '¿Pueden modernizar un sistema que ya tenemos?',
        answer:
          'Sí. Definimos qué conservar y qué reconstruir, y lo renovamos por etapas sin frenar tu operación. Lo explicamos en detalle en [modernización de sistemas legacy](/servicios/modernizacion-de-sistemas/).',
      },
      {
        category: 'desarrollo',
        question: '¿El nuevo software se puede integrar con los sistemas que ya usamos?',
        answer:
          'En la mayoría de los casos, sí. Integramos el software a la medida con otros sistemas mediante APIs u otros mecanismos de intercambio de datos, según lo que permita cada herramienta, para que la información fluya sin doble digitación.',
      },
      {
        category: 'desarrollo',
        question: '¿Desarrollan aplicaciones nativas o híbridas?',
        answer:
          'Elegimos según lo que la app necesite del teléfono: nativa, multiplataforma o una aplicación web preparada para Android e iOS, como Krystal con Capacitor. Ver [desarrollo de aplicaciones móviles](/servicios/desarrollo-de-aplicaciones-moviles/).',
      },
      {
        category: 'desarrollo',
        question: '¿Cómo participa mi equipo durante el desarrollo?',
        answer:
          'Tu equipo participa en los momentos clave: en el descubrimiento nos cuenta cómo trabaja, valida el prototipo navegable y revisa cada entrega incremental. Así el software se ajusta a la operación real y no hay sorpresas al final.',
      },
      {
        category: 'desarrollo',
        question: '¿Qué pasa después del lanzamiento?',
        answer:
          'Acompañamos la puesta en marcha y seguimos mejorando el producto según el uso real. El software a medida es un activo que evoluciona con tu negocio, y definimos contigo cómo continuar con nuevas funciones y mejoras.',
      },
    ],
    crossSell: {
      slug: 'consultoria-tecnologica',
      title: '¿Aún no sabes qué construir? Empieza por la estrategia.',
      text: 'Si no tienes claro qué software necesitas o si conviene comprar o desarrollar, la consultoría tecnológica te da un diagnóstico y una hoja de ruta antes de invertir.',
    },
    cta: {
      title: 'Tu software, construido alrededor de tu operación.',
      text: 'Cuéntanos qué quieres construir. Te respondemos por WhatsApp para entender tu idea y proponerte cómo llevarla a producción.',
    },
  },
];

export function getServiceDetail(slug: string): ServiceDetail | undefined {
  return serviceDetails.find((d) => d.slug === slug);
}

/* ------------------------------------------------------------------ */
/** Contenido de la página índice /servicios/. */
export const servicesHub = {
  seoTitle: 'Servicios de tecnología para empresas | Nithios',
  seoDescription:
    'Consultoría tecnológica y desarrollo de software a medida para empresas en Colombia: estrategia, transformación digital, apps web, móviles e IA. Hablemos.',
  heroEyebrow: 'Servicios de tecnología en Colombia',
  heroTitleHtml: 'Consultoría tecnológica y <span class="text-gold">software a medida</span>',
  heroTitle: 'Consultoría tecnológica y software a medida',
  intro:
    'Nithios ofrece dos servicios para empresas en Colombia: consultoría tecnológica para decidir qué tecnología adoptar y cómo, y desarrollo de software a medida para construir las soluciones que tu operación necesita.',
  whatsappMessage: 'Hola Nithios, quiero saber qué servicio de tecnología le conviene a mi empresa.',
  overview: {
    question: '¿Qué servicios ofrece Nithios?',
    answer:
      'Nithios ofrece asesoría y consultoría tecnológica para todo tipo de empresas que quieren adoptar tecnología y mejorar sus procesos, y desarrollo de software a medida con nuevas tecnologías: plataformas web, aplicaciones móviles, sistemas de gestión, integraciones y soluciones con inteligencia artificial.',
  },
  chooser: [
    {
      slug: 'consultoria-tecnologica',
      title: 'Empieza por la consultoría si…',
      points: [
        'Sabes que tus procesos pueden mejorar, pero no por dónde empezar.',
        'Debes decidir entre comprar software o desarrollarlo.',
        'Quieres adoptar inteligencia artificial con criterio de negocio.',
        'Necesitas acompañamiento estratégico continuo en tecnología.',
      ],
    },
    {
      slug: 'desarrollo-de-software-a-medida',
      title: 'Ve directo al desarrollo si…',
      points: [
        'Ya tienes claro el problema y la solución que necesitas.',
        'Ningún software comercial se ajusta a tu operación.',
        'Quieres lanzar una plataforma o app como producto propio.',
        'Tu sistema actual necesita modernizarse.',
      ],
    },
  ],
  journey: [
    { title: 'Diagnóstico', text: 'Entendemos tus procesos y dónde está el valor.', icon: 'search' as IconName },
    { title: 'Hoja de ruta', text: 'Priorizamos qué adoptar, qué construir y en qué orden.', icon: 'route' as IconName },
    { title: 'Diseño y desarrollo', text: 'Construimos el software a la medida por entregas.', icon: 'code' as IconName },
    { title: 'Adopción y evolución', text: 'Acompañamos el uso real y seguimos mejorando.', icon: 'chart' as IconName },
  ],
  journeyText:
    'Los dos servicios se complementan. Puedes contratarlos por separado o recorrer el camino completo con un solo equipo: quien entiende tu operación es quien diseña y construye la solución, sin pérdidas de información entre consultores y desarrolladores.',
  faqQuestions: [
    '¿Qué es una consultoría tecnológica y para qué le sirve a mi empresa?',
    '¿Me conviene un software comercial o un desarrollo a medida?',
    '¿Qué tipo de software desarrollan?',
    '¿En qué ciudades de Colombia trabajan?',
    '¿Cuánto cuesta un proyecto con Nithios?',
  ],
  cta: {
    title: '¿No sabes por cuál empezar? Hablemos.',
    text: 'Cuéntanos tu situación en un mensaje. Te ayudamos a identificar si necesitas consultoría, desarrollo o ambos.',
  },
};
