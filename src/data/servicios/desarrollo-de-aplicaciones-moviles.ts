/**
 * /servicios/desarrollo-de-aplicaciones-moviles/ — servicio específico (línea desarrollo).
 * Contrato: docs/CONTENIDO.md. Sin cifras, precios, plazos, clientes ni resultados inventados.
 * Krystal: preparada para Android e iOS con Capacitor (no afirmar que está publicada en tiendas).
 * Logística y transporte audiovisual: prototipos navegables con datos ficticios.
 */
import type { ServicePage } from './types';

export default {
  slug: 'desarrollo-de-aplicaciones-moviles',
  parent: 'desarrollo',
  order: 2,
  name: 'Aplicaciones móviles',
  icon: 'phone',
  eyebrow: 'Aplicaciones móviles · Desarrollo',
  h1: 'Desarrollo de aplicaciones móviles a medida para iOS y Android',
  h1Highlight: 'para iOS y Android',
  summary:
    'Diseñamos y desarrollamos apps móviles a medida para Android e iOS, conectadas con tus sistemas, desde la definición del alcance hasta la publicación en las tiendas y su evolución.',
  seoTitle: 'Desarrollo de apps móviles en Colombia',
  seoDescription:
    'Desarrollo de aplicaciones móviles a medida en Colombia para iOS y Android: alcance claro, prototipo, integración con tus sistemas y publicación. Hablemos.',
  intro:
    'El desarrollo de aplicaciones móviles a medida es crear una app para Android e iOS alrededor de los procesos, los usuarios y los sistemas de tu empresa. En Nithios lo hacemos de forma remota para empresas de toda Colombia.',

  sections: {
    whatIs: {
      title: '¿Qué es el desarrollo de aplicaciones móviles a medida?',
      answer:
        'Es el proceso de crear una aplicación para celulares y tabletas, que se instala desde Google Play o la App Store, diseñada específicamente para las tareas, los usuarios y los datos de una empresa, y conectada con los sistemas que esa empresa ya usa.',
      paragraphs: [
        'Una app a medida no es solo una pantalla bonita en el celular. Detrás casi siempre hay un servidor (backend) que guarda la información, controla quién puede ver qué y se comunica con otros sistemas, como un ERP, un software contable o una plataforma web. Por eso, diseñar una app es diseñar también cómo viajan y se protegen los datos.',
        'Hay varias formas de construirla. Una app nativa se escribe por separado para Android y para iOS; una app multiplataforma comparte buena parte del código entre ambos sistemas; y una aplicación web preparada para móviles puede empaquetarse como app para Android e iOS con herramientas como Capacitor; así está preparada [Krystal](/portafolio/krystal/), nuestro caso para consultorios psicológicos. Cada opción tiene ventajas según lo que la app necesite del teléfono.',
        'La decisión importante no es la tecnología, sino el uso: quién va a abrir la app, en qué momento, con qué conexión y para hacer qué. Un vendedor que toma pedidos en la calle, un conductor que registra una entrega o un paciente que entra a su cita necesitan cosas distintas, y la app debe responder a eso antes que a una moda.',
      ],
    },

    audience: {
      title: '¿Para qué empresas tiene sentido una app móvil a medida?',
      intro: 'Una app instalable se justifica cuando el trabajo ocurre lejos del escritorio o cuando el celular aporta algo que el navegador no da.',
      items: [
        'Empresas con personal en campo, como vendedores, técnicos, conductores o inspectores, que hoy reportan por chat, por llamada o en papel.',
        'Negocios de servicios que quieren que sus usuarios agenden, paguen, consulten o hagan seguimiento desde el celular con una experiencia propia.',
        'Compañías que ya tienen una plataforma web o un sistema interno y necesitan llevar una parte de esa operación al teléfono.',
        'Emprendimientos que van a lanzar un producto digital cuyo uso principal ocurre en el móvil y necesitan validarlo antes de invertir en todo.',
        'Organizaciones que necesitan usar funciones del dispositivo, como cámara, ubicación, notificaciones o trabajo sin conexión, de forma confiable.',
      ],
    },

    problems: {
      title: 'Problemas que resuelve una app móvil a medida',
      intro: 'Una buena app quita pasos, errores y llamadas. Si no hace ninguna de esas tres cosas, probablemente no hace falta.',
      items: [
        {
          icon: 'message',
          title: 'Operación en campo que se reporta por chat',
          text: 'Fotos, firmas y novedades llegan por mensajes sueltos y alguien debe pasarlas a mano a un sistema. Una app captura el dato una sola vez, en el lugar donde ocurre, con su evidencia y su hora.',
        },
        {
          icon: 'clipboard',
          title: 'Formularios en papel y digitación doble',
          text: 'Inspecciones, órdenes de servicio o pedidos que se llenan en papel y luego se transcriben. Además del tiempo perdido, cada transcripción es una oportunidad de error que nadie detecta a tiempo.',
        },
        {
          icon: 'users',
          title: 'Usuarios que dependen de llamar para todo',
          text: 'Si tus usuarios tienen que escribir o llamar para agendar, consultar un estado o hacer una solicitud simple, tu equipo dedica horas a tareas que una app bien diseñada resuelve por autoservicio.',
        },
        {
          icon: 'plug',
          title: 'Una app que no habla con tus sistemas',
          text: 'Apps genéricas que obligan a exportar e importar archivos para que la información llegue al sistema principal. La integración es lo que convierte una app en parte de la operación y no en otra isla de datos.',
        },
        {
          icon: 'layers',
          title: 'Una app que nadie puede mantener',
          text: 'Proyectos entregados sin documentación, sin acceso al código ni a las cuentas de las tiendas, que se vuelven imposibles de actualizar cuando cambian los sistemas operativos o se va el proveedor.',
        },
      ],
    },

    includes: {
      title: '¿Qué incluye el desarrollo de una app móvil?',
      intro: 'Una app que se usa de verdad es más que el código del teléfono. Estos son los frentes que cubre el servicio.',
      items: [
        {
          icon: 'target',
          title: 'Definición del alcance y del uso',
          text: 'Antes de diseñar pantallas definimos quién usa la app, para qué, en qué contexto y qué debe pasar con cada dato. Con eso se decide qué entra en la primera versión y qué puede esperar.',
          points: ['Usuarios y escenarios de uso', 'Funciones de la primera versión', 'App, web o ambas: decisión argumentada'],
        },
        {
          icon: 'sparkle',
          title: 'Diseño de la experiencia y prototipo',
          text: 'Diseñamos las pantallas y los flujos pensando en el uso real del celular: una mano, sol, prisa o mala señal. El prototipo navegable permite validar con usuarios antes de programar.',
        },
        {
          icon: 'phone',
          title: 'Desarrollo para Android e iOS',
          text: 'Construimos la app con el enfoque que mejor se ajuste al caso, compartiendo código entre plataformas cuando tiene sentido y usando las funciones del dispositivo que la operación necesita.',
        },
        {
          icon: 'database',
          title: 'Backend, panel de administración e integraciones',
          text: 'Desarrollamos el servidor que guarda los datos, el panel web desde donde tu equipo administra la información y las conexiones con los sistemas que ya usas.',
        },
        {
          icon: 'shield',
          title: 'Seguridad y protección de datos',
          text: 'Autenticación, roles y permisos, validación de datos y manejo cuidadoso de la información personal, considerando las obligaciones de protección de datos en Colombia desde el diseño.',
        },
        {
          icon: 'globe',
          title: 'Publicación en tiendas y evolución',
          text: 'Preparamos la app para la revisión de Google Play y la App Store, te acompañamos en la publicación y planeamos con tu equipo las mejoras y actualizaciones siguientes.',
        },
      ],
    },

    process: {
      title: '¿Cómo desarrollamos tu aplicación móvil?',
      intro: 'Trabajamos por etapas cortas y verificables, para que veas la app crecer y puedas corregir el rumbo a tiempo.',
      items: [
        {
          title: 'Conversación inicial',
          text: 'Nos cuentas por WhatsApp o en una llamada qué quieres resolver, quién usaría la app y con qué sistemas debe conectarse. Desde esa primera conversación te decimos si una app es el camino o si hay una opción más sencilla.',
        },
        {
          title: 'Descubrimiento y alcance',
          text: 'Entendemos el proceso, hablamos con quienes van a usar la app y definimos el alcance de la primera versión, las integraciones y los criterios con los que se va a aceptar cada entrega.',
        },
        {
          title: 'Prototipo navegable',
          text: 'Diseñamos los flujos principales en un prototipo que puedes recorrer en el celular. Es el momento más barato para cambiar de opinión, y lo usamos para validar antes de escribir código.',
        },
        {
          title: 'Desarrollo por entregas',
          text: 'Construimos la app, el backend y el panel en entregas incrementales que puedes instalar y probar, con revisión de calidad en cada iteración y pruebas en dispositivos Android e iOS.',
        },
        {
          title: 'Publicación y evolución',
          text: 'Preparamos los materiales y la configuración para las tiendas, acompañamos la publicación y la puesta en marcha, y planeamos las mejoras según el uso real de la app.',
        },
      ],
    },

    deliverables: {
      title: '¿Qué recibes al terminar el proyecto?',
      intro: 'Lo que se construye debe quedar en manos de tu empresa, documentado y listo para seguir evolucionando.',
      items: [
        { title: 'Documento de alcance', text: 'Usuarios, funciones, integraciones y criterios de aceptación de la primera versión, escritos en lenguaje de negocio.' },
        { title: 'Prototipo navegable', text: 'Los flujos principales de la app validados antes del desarrollo, útiles también para presentar el proyecto a tu equipo o a inversionistas.' },
        { title: 'App para Android e iOS', text: 'La aplicación funcional, probada en dispositivos reales y preparada para su publicación en Google Play y la App Store.' },
        { title: 'Backend y panel de administración', text: 'El servidor, la base de datos y el panel web con roles y permisos desde donde tu equipo gestiona la información.' },
        { title: 'Código fuente y accesos', text: 'Repositorio del código, credenciales y cuentas entregadas según lo acordado, para que tu empresa no dependa de una sola persona.' },
        { title: 'Documentación técnica', text: 'Cómo está construida la app, cómo se despliega una nueva versión y cómo se conectan sus integraciones.' },
      ],
    },

    signals: {
      title: 'Señales de que tu empresa necesita una app móvil',
      intro: 'Si varias de estas frases suenan conocidas, vale la pena evaluar una app, o al menos una versión móvil de tu operación.',
      items: [
        'Nuestro equipo en campo nos manda fotos y reportes por chat y alguien los digita al final del día.',
        'Los clientes nos llaman solo para preguntar en qué va su solicitud.',
        'Tenemos una plataforma web, pero en el celular es incómoda y la gente no la usa.',
        'Necesitamos que la app funcione aunque se caiga la señal en la obra, en la carretera o en la finca.',
        'Probamos una app genérica y terminamos adaptando el proceso a ella, en vez de al revés.',
        'Tenemos una app que nadie se atreve a actualizar porque el proveedor ya no está.',
      ],
    },

    notAFit: {
      title: '¿Cuándo NO te conviene desarrollar una app móvil?',
      intro: 'Una app es una inversión que hay que mantener. Estas son las situaciones en las que te recomendamos otro camino.',
      items: [
        {
          title: 'Si tus usuarios entrarían muy de vez en cuando',
          text: 'Pocas personas instalan una app para usarla un par de veces. En ese caso suele funcionar mejor una plataforma web responsive, que se abre desde un enlace y no requiere instalación.',
        },
        {
          title: 'Si el proceso todavía no está claro',
          text: 'Una app no ordena un proceso que nadie ha definido; lo digitaliza tal como está. Primero conviene ordenarlo, y para eso sirve la consultoría tecnológica antes del desarrollo.',
        },
        {
          title: 'Si ya existe una aplicación que hace lo que necesitas',
          text: 'Si una herramienta comercial cubre tu caso sin forzar el proceso, suele ser más rápido y económico adoptarla. Te ayudamos a compararla honestamente con un desarrollo a medida.',
        },
        {
          title: 'Si nadie va a cuidar la app después del lanzamiento',
          text: 'Los sistemas operativos y las reglas de las tiendas cambian, y una app sin mantenimiento se degrada. Si no hay presupuesto ni responsable para su evolución, es mejor replantear el alcance.',
        },
      ],
    },

    technologies: {
      title: 'Tecnologías para apps móviles',
      intro: 'Elegimos la tecnología según lo que la app necesita del dispositivo, el equipo que la mantendrá y los sistemas con los que debe hablar.',
      items: ['Android', 'iOS', 'Capacitor', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'WebRTC', 'Aplicaciones web progresivas (PWA)'],
      note: 'Cuando el caso exige un desarrollo nativo o un enfoque distinto, lo evaluamos y te explicamos por qué.',
    },
  },

  faqs: [
    {
      question: '¿Mi empresa necesita una app móvil o le basta con una aplicación web?',
      answer:
        'Necesitas una app instalable cuando tus usuarios la abren con frecuencia, cuando debe funcionar sin conexión o cuando usa a fondo funciones del teléfono como cámara, ubicación o notificaciones. Si el uso es ocasional, una aplicación web responsive suele bastar y es más fácil de mantener. Lo revisamos contigo antes de proponer cualquier desarrollo.',
    },
    {
      question: '¿De qué depende el costo de desarrollar una app móvil en Colombia?',
      answer:
        'Depende sobre todo del número de funciones y de perfiles de usuario, de las integraciones con otros sistemas, de si se necesita backend y panel de administración, del trabajo sin conexión y de las exigencias de seguridad. Por eso no hay un precio de lista: definimos primero el alcance y con eso preparamos una propuesta que puedas comparar con otras.',
    },
    {
      question: '¿A nombre de quién quedan publicadas la app y sus cuentas en las tiendas?',
      answer:
        'Lo recomendable es que la app se publique en cuentas de desarrollador de Google Play y de la App Store a nombre de tu empresa, y que tu empresa conserve el control de esas cuentas. Así la app sigue siendo tuya aunque cambies de proveedor. Lo dejamos acordado por escrito al inicio del proyecto.',
    },
    {
      question: '¿Una app puede funcionar sin conexión a internet?',
      answer:
        'Sí, si se diseña para eso desde el principio. La app guarda la información en el dispositivo mientras no hay señal y la sincroniza cuando vuelve la conexión, resolviendo qué pasa si dos personas modifican el mismo dato. Es una decisión de arquitectura que conviene tomar al definir el alcance, no al final.',
    },
    {
      question: '¿Qué pasa con la app cuando Apple o Google actualizan sus sistemas operativos?',
      answer:
        'Hay que revisarla y, a veces, ajustarla. Las nuevas versiones de Android e iOS y los cambios en las reglas de las tiendas pueden exigir actualizaciones para que la app siga funcionando y publicada. Por eso planeamos con tu empresa cómo será el mantenimiento desde antes del lanzamiento, no cuando aparece el problema.',
    },
    {
      question: '¿Pueden continuar una app móvil que empezó otro proveedor?',
      answer:
        'Sí, si tenemos acceso al código fuente, a las cuentas de las tiendas y a la infraestructura. Primero hacemos una revisión técnica para entender cómo está construida, qué riesgos tiene y si conviene continuarla, corregirla o rehacer partes. Te entregamos esa evaluación por escrito antes de comprometer cualquier desarrollo.',
    },
  ],

  related: {
    services: ['desarrollo-de-plataformas-web', 'automatizacion-de-procesos', 'inteligencia-artificial-para-empresas'],
    guides: [
      'cuanto-cuesta-desarrollar-software-a-medida-en-colombia',
      'como-elegir-una-empresa-de-desarrollo-de-software-en-colombia',
      'software-a-medida-vs-software-empaquetado',
    ],
    projects: ['krystal', 'plataforma-logistica-acero'],
  },

  cta: {
    title: '¿Tienes en mente una app para tu empresa?',
    text: 'Cuéntanos por WhatsApp quién la usaría y qué debe resolver. Te decimos con honestidad si una app es el mejor camino o si otra opción te sirve mejor.',
  },
  whatsappMessage: 'Hola Nithios, quiero desarrollar una aplicación móvil para mi empresa.',
  keywords: [
    'desarrollo de aplicaciones móviles Colombia',
    'desarrollo de apps a medida',
    'empresa de desarrollo de apps',
    'desarrollo de apps iOS y Android',
    'crear una app para mi empresa',
    'desarrollo de aplicaciones móviles Medellín',
    'desarrollo de aplicaciones móviles Bogotá',
  ],
} satisfies ServicePage;
