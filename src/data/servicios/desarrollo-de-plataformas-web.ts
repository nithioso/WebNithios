/**
 * /servicios/desarrollo-de-plataformas-web/ — servicio específico (línea desarrollo).
 * Contrato: docs/CONTENIDO.md. Sin cifras, precios, plazos, clientes ni resultados inventados.
 * Comercio internacional, logística y transporte audiovisual: prototipos navegables con datos ficticios (nunca productos en producción).
 */
import type { ServicePage } from './types';

export default {
  slug: 'desarrollo-de-plataformas-web',
  parent: 'desarrollo',
  order: 1,
  name: 'Plataformas web a medida',
  icon: 'browser',
  eyebrow: 'Plataformas web · Desarrollo',
  h1: 'Desarrollo de plataformas web y sistemas de gestión a medida',
  h1Highlight: 'sistemas de gestión a medida',
  summary:
    'Desarrollamos plataformas web y sistemas de gestión a medida que reúnen la operación de tu empresa en un solo lugar, con roles, permisos, reportes e integraciones con tus sistemas.',
  seoTitle: 'Desarrollo de plataformas web a medida',
  seoDescription:
    'Desarrollo de plataformas web y sistemas de gestión a medida en Colombia: módulos, roles, reportes e integraciones para ordenar tu operación. Hablemos.',
  ogDescription: 'Plataformas web y sistemas de gestión a la medida: módulos, roles, tableros e integraciones para tu operación.',
  ogTagline: 'Sistemas de gestión web hechos a tu medida',
  intro:
    'Una plataforma web a medida es un sistema de navegador hecho para los procesos de tu empresa, para que la operación salga de hojas de cálculo y chats. En Nithios las desarrollamos de forma remota para empresas de toda Colombia.',

  sections: {
    whatIs: {
      title: '¿Qué es una plataforma web a medida?',
      answer:
        'Una plataforma web a medida es un software que tus equipos usan desde el navegador, en computador o celular, construido para los procesos, los roles y los datos de tu empresa, y no adaptado desde un producto genérico.',
      paragraphs: [
        'No es lo mismo que una página web. Una página web informa y atrae visitantes; una plataforma web hace trabajo: registra pedidos, asigna tareas, controla inventarios, aprueba solicitudes o calcula liquidaciones. Por eso tiene usuarios con contraseña, permisos según el rol de cada persona, una base de datos propia y reglas de negocio que reflejan cómo opera tu empresa.',
        'Los sistemas de gestión a medida son el caso más común: un CRM para la relación con clientes, un sistema de pedidos y despachos, un portal para proveedores o una herramienta para coordinar personal en campo. A menudo conviven con un ERP o un software contable que ya existe, y la plataforma se conecta con ellos en lugar de reemplazarlos.',
        'Que sea web tiene ventajas prácticas: no hay que instalar nada, se actualiza para todos al mismo tiempo y funciona en cualquier equipo con navegador. Si una parte de la operación necesita una app instalable, por ejemplo para trabajar sin señal, puede complementarse con una aplicación móvil que comparte el mismo backend.',
      ],
    },

    audience: {
      title: '¿Para qué empresas tiene sentido una plataforma web a medida?',
      intro: 'Suele encajar cuando la operación ya creció más que las herramientas con las que se maneja.',
      items: [
        'Empresas que coordinan su operación con hojas de cálculo compartidas, correos y grupos de chat, y ya no saben cuál es la versión correcta de la información.',
        'Pymes y empresas medianas con procesos propios que los programas genéricos no cubren sin forzar la forma de trabajar.',
        'Organizaciones con varias áreas, sedes o perfiles de usuario que necesitan ver y hacer cosas distintas sobre los mismos datos.',
        'Empresas que necesitan un portal para que sus clientes, proveedores o aliados consulten, carguen documentos o hagan solicitudes.',
        'Compañías que ya tienen un sistema, pero lo complementan con tareas manuales porque no cubre un proceso clave.',
        'Emprendimientos que van a lanzar un producto digital de uso en el navegador y quieren empezar por una primera versión acotada.',
      ],
    },

    problems: {
      title: 'Problemas que resuelve una plataforma web a medida',
      intro: 'El síntoma suele ser el mismo: mucha gente ocupada moviendo información de un lugar a otro.',
      items: [
        {
          icon: 'grid',
          title: 'La operación vive en hojas de cálculo',
          text: 'Archivos con versiones distintas, fórmulas que solo entiende una persona y datos que se sobrescriben. Funciona hasta que la empresa crece y el archivo se vuelve el cuello de botella de todos.',
        },
        {
          icon: 'database',
          title: 'Información duplicada entre áreas',
          text: 'Ventas, operación y administración registran lo mismo en lugares distintos y las cifras no cuadran. Una plataforma registra el dato una sola vez y lo comparte con quien lo necesita.',
        },
        {
          icon: 'chart',
          title: 'Sin visibilidad del estado real',
          text: 'Para saber en qué va un pedido, un proyecto o una solicitud hay que preguntarle a alguien. Los tableros y reportes muestran el estado al momento, sin esperar el informe de fin de mes.',
        },
        {
          icon: 'key',
          title: 'Todos ven todo, o nadie sabe quién cambió qué',
          text: 'Archivos compartidos sin control de acceso ni historial. Los roles, los permisos y la trazabilidad protegen la información y permiten saber quién hizo cada cambio y cuándo.',
        },
        {
          icon: 'plug',
          title: 'Sistemas que no se hablan',
          text: 'El software contable, la tienda en línea y las herramientas de cada área funcionan por separado y alguien exporta e importa archivos para unirlos. Las integraciones eliminan ese trabajo manual.',
        },
        {
          icon: 'workflow',
          title: 'Procesos que dependen de la memoria',
          text: 'Aprobaciones, recordatorios y seguimientos que ocurren solo si alguien se acuerda. Una plataforma convierte esos pasos en flujos con responsables, estados y alertas, y deja de importar quién está de vacaciones.',
        },
      ],
    },

    includes: {
      title: '¿Qué incluye el desarrollo de una plataforma web?',
      intro: 'Cada plataforma es distinta, pero estos son los componentes que construimos en la mayoría de los proyectos.',
      items: [
        {
          icon: 'route',
          title: 'Levantamiento de procesos y alcance',
          text: 'Entendemos cómo fluye hoy la información, quién hace cada paso y dónde se pierde tiempo. Con eso definimos los módulos y lo que entra en la primera versión.',
          points: ['Mapa del proceso actual', 'Módulos priorizados', 'Criterios de aceptación por entrega'],
        },
        {
          icon: 'sparkle',
          title: 'Prototipo navegable y diseño de interfaz',
          text: 'Diseñamos las pantallas y los flujos en un prototipo que tu equipo puede recorrer antes del desarrollo, con un sistema de diseño coherente para que muchos módulos se sientan como una sola herramienta.',
        },
        {
          icon: 'layers',
          title: 'Módulos de gestión',
          text: 'Construimos los módulos que tu operación necesita, como pedidos, inventario, proyectos, terceros o aprobaciones, sobre una base de datos única y bien estructurada.',
        },
        {
          icon: 'key',
          title: 'Usuarios, roles y permisos',
          text: 'Cada persona entra con su usuario y ve solo lo que le corresponde según su rol. Las acciones importantes quedan registradas para auditoría y trazabilidad.',
        },
        {
          icon: 'chart',
          title: 'Tableros y reportes',
          text: 'Indicadores y reportes pensados para las decisiones que toma tu gerencia, con la información al día y la posibilidad de exportarla cuando se necesite.',
        },
        {
          icon: 'plug',
          title: 'Integraciones con tus sistemas',
          text: 'Conectamos la plataforma con el software contable, el ERP, la facturación u otras herramientas que ya usas, mediante sus API o los mecanismos que ofrezcan.',
        },
      ],
    },

    process: {
      title: '¿Cómo desarrollamos tu plataforma web?',
      intro: 'Construimos por entregas que puedes usar y revisar, para que el sistema crezca con la operación y no a sus espaldas.',
      items: [
        {
          title: 'Conversación inicial',
          text: 'Nos cuentas por WhatsApp o en una llamada cómo opera tu empresa, qué herramientas usan hoy y qué te gustaría resolver primero. Con eso evaluamos si una plataforma a medida tiene sentido para tu caso.',
        },
        {
          title: 'Descubrimiento y alcance',
          text: 'Recorremos los procesos con las personas que los ejecutan, revisamos los sistemas existentes y definimos módulos, roles, integraciones y la primera versión que vale la pena construir.',
        },
        {
          title: 'Prototipo navegable',
          text: 'Diseñamos los flujos principales en un prototipo que tu equipo puede recorrer y comentar. Así se validan las decisiones de diseño antes de invertir en desarrollo.',
        },
        {
          title: 'Desarrollo por entregas',
          text: 'Construimos módulo por módulo, con entregas que tu equipo prueba en un ambiente de pruebas, revisión de calidad en cada iteración y ajustes según lo que aparece en el uso.',
        },
        {
          title: 'Puesta en marcha y evolución',
          text: 'Acompañamos la migración de datos, la capacitación y la salida a producción, y planeamos contigo los siguientes módulos y mejoras según el uso real de la plataforma.',
        },
      ],
    },

    deliverables: {
      title: '¿Qué entregables recibes?',
      intro: 'Además del software funcionando, el proyecto deja documentación y accesos que quedan en tu empresa.',
      items: [
        { title: 'Documento de alcance y procesos', text: 'Procesos, módulos, roles e integraciones acordados, con los criterios de aceptación de cada entrega.' },
        { title: 'Prototipo navegable', text: 'Los flujos principales de la plataforma validados con tu equipo antes del desarrollo.' },
        { title: 'Plataforma web funcional', text: 'El sistema publicado y en uso, con sus módulos, usuarios, roles y permisos, accesible desde el navegador en computador y celular.' },
        { title: 'Integraciones configuradas', text: 'Las conexiones con tus sistemas documentadas: qué datos viajan, en qué dirección y qué pasa si una falla.' },
        { title: 'Código fuente y accesos', text: 'Repositorio, base de datos y credenciales de infraestructura entregados según lo acordado, para que tu empresa no dependa de una sola persona.' },
        { title: 'Documentación y capacitación', text: 'Guía técnica de la arquitectura y del despliegue, y capacitación a los usuarios y administradores de la plataforma.' },
      ],
    },

    signals: {
      title: 'Señales de que tu empresa necesita una plataforma web',
      intro: 'Si varias de estas frases describen tu día a día, es probable que la operación ya necesite su propio sistema.',
      items: [
        'Tenemos un Excel tan grande que solo una persona sabe cómo funciona.',
        'Para saber en qué va un pedido tenemos que preguntar por el chat.',
        'Cada área tiene sus cifras y en el comité nunca coinciden.',
        'Probamos varios programas, pero ninguno se ajusta a cómo trabajamos.',
        'Nuestros clientes y proveedores nos escriben todo el tiempo para pedir información que ya tenemos.',
        'Pasamos datos a mano entre el sistema contable y nuestras hojas de cálculo.',
      ],
    },

    notAFit: {
      title: '¿Cuándo NO te conviene una plataforma web a medida?',
      intro: 'Un desarrollo a medida es una inversión importante. Estos son los casos en los que te recomendamos otro camino.',
      items: [
        {
          title: 'Si un software comercial ya cubre tu proceso',
          text: 'Para procesos estándar, como contabilidad o nómina, suele ser mejor adoptar una herramienta existente y, si hace falta, integrarla. Te ayudamos a compararlo con criterios claros.',
        },
        {
          title: 'Si lo que necesitas es una página web informativa',
          text: 'Para presentar tu empresa y recibir contactos no hace falta una plataforma con usuarios y base de datos. Un sitio web bien hecho resuelve ese objetivo con menos inversión.',
        },
        {
          title: 'Si el proceso cambia cada semana',
          text: 'Cuando la forma de trabajar todavía no se estabiliza, conviene ordenarla primero con consultoría tecnológica o probarla con herramientas simples, y construir cuando haya claridad.',
        },
        {
          title: 'Si no habrá nadie del lado de tu empresa',
          text: 'Una plataforma a medida necesita a alguien que conozca la operación, valide las entregas y tome decisiones. Sin esa persona, el riesgo de construir lo que no se necesita crece mucho.',
        },
      ],
    },

    technologies: {
      title: 'Tecnologías para plataformas web',
      intro: 'Elegimos tecnologías probadas, con comunidad amplia y fáciles de mantener, para que la plataforma no dependa de un único proveedor.',
      items: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express', 'Prisma', 'PostgreSQL', 'Socket.io', 'API REST', 'Arquitectura en la nube'],
      note: 'La tecnología se ajusta al proyecto y a quién lo va a mantener; si tu empresa ya tiene un estándar, lo tenemos en cuenta.',
    },
  },

  faqs: [
    {
      question: '¿Qué diferencia hay entre una página web y una plataforma web?',
      answer:
        'Una página web presenta información y recibe visitantes; una plataforma web es un software con usuarios, permisos y una base de datos que ejecuta procesos de tu empresa, como pedidos, aprobaciones o inventarios. Por eso una plataforma requiere más análisis, desarrollo y mantenimiento, y se justifica cuando hay una operación que ordenar.',
    },
    {
      question: '¿De qué depende el costo de una plataforma web a medida?',
      answer:
        'Depende del número de módulos y de reglas de negocio, de cuántos perfiles de usuario hay, de las integraciones con otros sistemas, de la migración de datos existentes y de las exigencias de seguridad y disponibilidad. Por eso definimos primero el alcance y una primera versión acotada, y con eso preparamos una propuesta que puedas comparar con otras.',
    },
    {
      question: '¿Puedo empezar con pocos módulos y agregar más después?',
      answer:
        'Sí, y casi siempre es lo recomendable. Empezar por los módulos que resuelven el problema más costoso permite usar la plataforma pronto, aprender del uso real y decidir los siguientes con información. Para que eso funcione, la arquitectura y la base de datos se diseñan desde el inicio pensando en crecer.',
    },
    {
      question: '¿Dónde se aloja una plataforma web y quién la administra?',
      answer:
        'Normalmente se aloja en un proveedor de nube, en cuentas que conviene que estén a nombre de tu empresa. La administración técnica, como copias de seguridad, actualizaciones y monitoreo, puede quedar en tu equipo o en un acuerdo de soporte. Lo definimos por escrito antes de la salida a producción para que nadie asuma que el otro se encarga.',
    },
    {
      question: '¿Cómo se protegen los datos personales en una plataforma web?',
      answer:
        'Se protegen desde el diseño: acceso con usuario individual, roles y permisos mínimos, cifrado en el transporte, registro de acciones, copias de seguridad y validación de los datos que entran. Si la plataforma trata datos personales, también debe cumplir la normativa colombiana de protección de datos personales.',
    },
    {
      question: '¿Una plataforma web puede reemplazar las hojas de cálculo que usamos hoy?',
      answer:
        'Sí, en la mayoría de los casos, y sin perder lo que sí funciona. Analizamos qué hace cada hoja, qué fórmulas y validaciones contiene y quién la usa, y llevamos esa lógica a la plataforma con una base de datos única. La información histórica se migra y la exportación a Excel se puede mantener para quien la necesite.',
    },
  ],

  related: {
    services: ['desarrollo-de-aplicaciones-moviles', 'automatizacion-de-procesos', 'modernizacion-de-sistemas'],
    guides: [
      'software-a-medida-vs-software-empaquetado',
      'cuanto-cuesta-desarrollar-software-a-medida-en-colombia',
      'como-elegir-una-empresa-de-desarrollo-de-software-en-colombia',
    ],
    projects: ['plataforma-comercio-internacional', 'software-itsm-mesa-de-servicio'],
  },

  cta: {
    title: '¿Tu operación ya necesita su propio sistema?',
    text: 'Cuéntanos por WhatsApp cómo trabaja tu empresa hoy y qué te gustaría ordenar. Te ayudamos a definir si conviene una plataforma a medida y por dónde empezar.',
  },
  whatsappMessage: 'Hola Nithios, quiero desarrollar una plataforma web a medida para mi empresa.',
  keywords: [
    'desarrollo de plataformas web a medida',
    'desarrollo de plataformas web Colombia',
    'sistema de gestión a medida',
    'desarrollo de aplicaciones web empresariales',
    'software de gestión web para empresas',
    'empresa de desarrollo web Medellín',
    'desarrollo de sistemas web Bogotá',
  ],
} satisfies ServicePage;
