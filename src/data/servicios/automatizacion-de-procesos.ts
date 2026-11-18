/**
 * /servicios/automatizacion-de-procesos/ — automatización de procesos empresariales (consultoría + desarrollo).
 * Contrato: docs/CONTENIDO.md. Sin cifras, precios, plazos, clientes ni resultados inventados.
 */
import type { ServicePage } from './types';

export default {
  slug: 'automatizacion-de-procesos',
  parent: 'ambas',
  order: 2,
  name: 'Automatización de procesos',
  icon: 'workflow',
  eyebrow: 'Automatizar · Consultoría + desarrollo',
  h1: 'Automatización de procesos empresariales: menos tareas repetitivas',
  h1Highlight: 'menos tareas repetitivas',
  summary:
    'Identificamos las tareas manuales que más tiempo y errores le cuestan a tu empresa, rediseñamos el proceso y lo automatizamos conectando tus sistemas para que la información circule sola.',
  seoTitle: 'Automatización de procesos en Colombia',
  seoDescription:
    'Automatización de procesos empresariales en Colombia: conectamos tus sistemas y eliminamos la doble digitación y las tareas repetitivas con control. Hablemos.',
  ogDescription: 'Menos tareas repetitivas y sistemas que se hablan: automatizamos los procesos de tu empresa a la medida.',
  ogTagline: 'Menos tareas repetitivas, sistemas conectados',
  intro:
    'La automatización de procesos usa software para que las tareas repetitivas y basadas en reglas se ejecuten solas. En Nithios la hacemos de forma remota para empresas de toda Colombia: primero ordenamos el proceso, después lo automatizamos.',

  sections: {
    whatIs: {
      title: '¿Qué es la automatización de procesos empresariales?',
      answer:
        'Es el diseño y la construcción de flujos de trabajo en los que el software ejecuta, sin intervención manual, los pasos repetitivos y basados en reglas de un proceso, y deja a las personas las decisiones, las excepciones y la relación con clientes y proveedores.',
      paragraphs: [
        'Un proceso automatizado no es simplemente un proceso con más tecnología. Es uno en el que la información se captura una sola vez y viaja sola a donde se necesita: el pedido que entra por la web aparece en el sistema de inventario, la factura aprobada llega a contabilidad y el cliente recibe el aviso de despacho sin que nadie lo escriba a mano.',
        'Automatizar un proceso desordenado solo produce errores más rápido. Por eso empezamos por entender cómo funciona hoy, quién hace cada paso, dónde se generan reprocesos y qué reglas existen de verdad, aunque nunca se hayan escrito. Muchas veces la primera mejora es simplificar o eliminar pasos antes de automatizar el resto.',
        'Según el caso, la automatización puede ser una integración entre dos sistemas que ya tienes, un flujo configurado en una herramienta existente o un desarrollo a medida cuando las herramientas disponibles no alcanzan. Cuando el proceso requiere leer documentos o interpretar texto libre, se puede complementar con inteligencia artificial.',
      ],
    },

    audience: {
      title: '¿Qué empresas se benefician de automatizar procesos?',
      intro: 'Cualquier empresa con tareas que se repiten a diario y que dependen de copiar, revisar o avisar a mano.',
      items: [
        'Empresas que digitan la misma información en dos o más sistemas, como pedidos, facturas o datos de clientes.',
        'Áreas administrativas y financieras que dedican buena parte del mes a conciliar, consolidar reportes o perseguir aprobaciones.',
        'Distribuidoras, comercializadoras y empresas logísticas que coordinan pedidos, inventario y despachos con hojas de cálculo y mensajes.',
        'Empresas de servicios que hacen seguimiento manual a solicitudes, citas, contratos o renovaciones y olvidan pasos por falta de recordatorios.',
        'Organizaciones en crecimiento cuyo volumen de operaciones ya no se puede atender contratando más personas para tareas repetitivas.',
        'Gerencias que no tienen visibilidad del estado de sus procesos porque la información vive en correos y archivos personales.',
      ],
    },

    problems: {
      title: 'Problemas que resuelve la automatización de procesos',
      intro: 'El costo de un proceso manual rara vez se ve en una sola tarea: se acumula en reprocesos, demoras y errores.',
      items: [
        {
          icon: 'layers',
          title: 'Doble digitación entre sistemas',
          text: 'Los mismos datos se escriben en la web, en el sistema contable y en una hoja de cálculo. Cada copia es una oportunidad de error y una hora que no se dedica a algo más valioso.',
        },
        {
          icon: 'clock',
          title: 'Aprobaciones que se quedan quietas',
          text: 'Solicitudes, compras o descuentos esperan la firma de alguien que no sabe que tiene algo pendiente. Un flujo automatizado avisa, recuerda y escala cuando el tiempo se cumple.',
        },
        {
          icon: 'clipboard',
          title: 'Reportes armados a mano',
          text: 'Cada semana alguien descarga archivos de varios sistemas, los pega, los cuadra y los envía. Cuando por fin llegan a la gerencia, los datos ya están desactualizados.',
        },
        {
          icon: 'message',
          title: 'Clientes que preguntan por el estado',
          text: 'El cliente escribe para saber cómo va su pedido porque nadie le avisa. Los avisos automáticos en cada etapa reducen esas consultas y mejoran la experiencia sin carga adicional para tu equipo.',
        },
        {
          icon: 'users',
          title: 'Procesos que dependen de una persona',
          text: 'Solo una persona sabe cómo se hace el cierre o el despacho, y cuando falta, todo se detiene. Automatizar obliga a documentar las reglas y reduce esa dependencia.',
        },
        {
          icon: 'shield',
          title: 'Errores difíciles de rastrear',
          text: 'Cuando algo sale mal, nadie sabe en qué paso ocurrió ni quién hizo el cambio. Un proceso automatizado deja registro de cada acción y facilita encontrar el origen del problema.',
        },
      ],
    },

    includes: {
      title: '¿Qué incluye la automatización de procesos?',
      intro: 'El servicio cubre desde el análisis del proceso hasta la automatización funcionando y monitoreada.',
      items: [
        {
          icon: 'search',
          title: 'Levantamiento y rediseño del proceso',
          text: 'Documentamos cómo funciona hoy el proceso con quienes lo ejecutan, identificamos reprocesos y pasos innecesarios y proponemos una versión más simple antes de automatizar.',
          points: ['Mapa del proceso actual', 'Reglas y excepciones escritas', 'Proceso rediseñado y validado'],
        },
        {
          icon: 'target',
          title: 'Priorización de automatizaciones',
          text: 'Ordenamos las oportunidades según el esfuerzo que ahorran, el riesgo de error que reducen y la complejidad técnica de cada una.',
          points: ['Logros rápidos primero', 'Dependencias identificadas'],
        },
        {
          icon: 'plug',
          title: 'Integración entre sistemas',
          text: 'Conectamos el software que ya usas por API, webhooks (avisos automáticos que un sistema envía a otro cuando ocurre algo) o intercambio de archivos, para que los datos viajen sin copiarlos.',
        },
        {
          icon: 'code',
          title: 'Desarrollo a medida cuando hace falta',
          text: 'Si ninguna herramienta resuelve el flujo, construimos el componente necesario: un servicio de integración, un portal de solicitudes o un módulo de aprobaciones.',
        },
        {
          icon: 'spark',
          title: 'Automatización con inteligencia artificial',
          text: 'Cuando el proceso requiere leer documentos, clasificar mensajes o interpretar texto libre, incorporamos IA con revisión humana en los pasos sensibles.',
        },
        {
          icon: 'chart',
          title: 'Monitoreo, alertas y trazabilidad',
          text: 'Cada automatización deja registro de lo que hizo y avisa cuando algo falla, para que el proceso no se detenga en silencio.',
        },
      ],
    },

    process: {
      title: '¿Cómo automatizamos un proceso?',
      intro: 'Automatizamos por partes, empezando por lo que más alivio da y con menos riesgo.',
      items: [
        {
          title: 'Conversación inicial',
          text: 'Nos escribes por WhatsApp y nos cuentas qué proceso te quita más tiempo, qué sistemas usas y qué has intentado. Con eso te decimos si la automatización es el camino y por dónde empezaríamos.',
        },
        {
          title: 'Levantamiento del proceso',
          text: 'Recorremos el proceso con las personas que lo ejecutan, revisamos los sistemas involucrados y escribimos las reglas, las excepciones y los puntos donde hoy se pierde tiempo o información.',
        },
        {
          title: 'Diseño y priorización',
          text: 'Proponemos el proceso rediseñado y la lista de automatizaciones en orden, con lo que se resuelve configurando herramientas existentes y lo que requiere desarrollo.',
        },
        {
          title: 'Construcción y pruebas',
          text: 'Implementamos por etapas y probamos con casos reales de tu operación, incluidas las excepciones. Nada pasa a operación sin que tu equipo lo haya validado.',
        },
        {
          title: 'Puesta en marcha y seguimiento',
          text: 'Activamos la automatización, capacitamos a quienes la usan y vigilamos los primeros ciclos. Ajustamos reglas y alertas, y decidimos contigo cuál es el siguiente proceso.',
        },
      ],
    },

    deliverables: {
      title: '¿Qué entregables recibes?',
      intro: 'Al final no solo tienes procesos automatizados: tienes el proceso documentado y bajo tu control.',
      items: [
        { title: 'Mapa del proceso actual y rediseñado', text: 'El antes y el después del proceso, con responsables, reglas, excepciones y puntos de control.' },
        { title: 'Inventario de automatizaciones priorizado', text: 'Las oportunidades identificadas, ordenadas por beneficio, riesgo y esfuerzo, con lo que conviene hacer ahora y lo que puede esperar.' },
        { title: 'Automatizaciones en operación', text: 'Los flujos, integraciones y desarrollos funcionando sobre tus sistemas, probados con casos reales y validados por tu equipo.' },
        { title: 'Panel de monitoreo y alertas', text: 'Una forma sencilla de ver qué se ejecutó, qué falló y qué requiere atención de una persona.' },
        { title: 'Documentación técnica y de operación', text: 'Cómo funciona cada automatización, qué credenciales y permisos usa, y qué hacer si un sistema cambia o falla.' },
        { title: 'Capacitación del equipo', text: 'Sesiones para que las personas sepan qué cambió en su trabajo, cómo atender las excepciones y a quién acudir.' },
      ],
    },

    signals: {
      title: 'Señales de que tu empresa necesita automatizar procesos',
      intro: 'Si estas frases te suenan conocidas, hay tiempo y errores que se pueden recuperar.',
      items: [
        'Pasamos los pedidos de la tienda en línea al sistema uno por uno.',
        'El informe de los lunes nos toma toda la mañana armarlo.',
        'Las compras se demoran porque las aprobaciones se pierden en el correo.',
        'Cuando la persona de facturación sale a vacaciones, nadie sabe cómo hacer el cierre.',
        'Los clientes nos escriben a cada rato para saber en qué va su pedido.',
        'Cada vez que crecemos, la solución es contratar a alguien más para digitar.',
      ],
    },

    notAFit: {
      title: '¿Cuándo NO te conviene automatizar un proceso?',
      intro: 'Automatizar no siempre es el primer paso. En estos casos te sugerimos otra ruta.',
      items: [
        {
          title: 'Si el proceso cambia todo el tiempo',
          text: 'Cuando las reglas todavía se están definiendo, automatizar congela algo que no está maduro. Primero conviene estabilizar el proceso, con apoyo de la consultoría tecnológica si hace falta.',
        },
        {
          title: 'Si la tarea ocurre muy pocas veces',
          text: 'Una tarea que se hace de vez en cuando y toma poco tiempo rara vez justifica construir y mantener una automatización. Una buena plantilla o una lista de verificación pueden ser suficientes.',
        },
        {
          title: 'Si los sistemas actuales no se pueden conectar',
          text: 'Cuando el software que usas no permite integraciones y está llegando a su límite, automatizar alrededor de él es un parche. Conviene evaluar primero una modernización de sistemas.',
        },
        {
          title: 'Si lo que falta es un sistema central',
          text: 'Si la operación vive en hojas de cálculo y mensajes, automatizar cada pedazo por separado complica las cosas. Una plataforma web a medida que concentre el proceso suele ser la mejor base.',
        },
      ],
    },

    technologies: {
      title: 'Herramientas y técnicas de referencia',
      intro: 'Elegimos lo más simple que resuelva el proceso: configurar antes que desarrollar, y desarrollar solo cuando aporta.',
      items: [
        'Integraciones por API',
        'Webhooks',
        'Tareas programadas',
        'Plataformas de automatización low-code',
        'Node.js',
        'TypeScript',
        'PostgreSQL',
        'Inteligencia artificial aplicada',
      ],
      note: 'Low-code se refiere a herramientas que permiten armar flujos con poca programación. Son útiles para empezar; cuando el proceso es crítico o complejo, un desarrollo a medida suele dar más control.',
    },
  },

  faqs: [
    {
      question: '¿Qué procesos de una empresa se pueden automatizar?',
      answer:
        'Los que se repiten con frecuencia y siguen reglas que se pueden describir. Por ejemplo: pasar pedidos de un canal de venta al sistema de inventario, enviar avisos al cliente en cada etapa, generar documentos a partir de plantillas, consolidar reportes o enrutar aprobaciones. Si el proceso depende de leer documentos o mensajes variados, se puede complementar con inteligencia artificial.',
    },
    {
      question: '¿Cuál es la diferencia entre automatizar un proceso y usar inteligencia artificial?',
      answer:
        'La automatización tradicional ejecuta pasos con reglas fijas: si pasa esto, haz aquello. La inteligencia artificial se usa cuando una tarea requiere interpretar algo variable, como el contenido de un correo o de una factura escaneada. Muchas soluciones combinan ambas: la IA interpreta y la automatización ejecuta el resto del flujo con reglas claras.',
    },
    {
      question: '¿Puedo automatizar procesos con el software que ya tengo?',
      answer:
        'Con frecuencia sí. Muchos sistemas contables, comerciales y de gestión permiten conectarse por API, enviar avisos o intercambiar archivos. Lo primero es revisar qué permite cada uno. Cuando un sistema no ofrece ninguna forma de integración, evaluamos alternativas como una capa intermedia, un cambio de herramienta o una modernización.',
    },
    {
      question: '¿Es mejor usar una herramienta de automatización o hacer un desarrollo a medida?',
      answer:
        'Depende del proceso. Las herramientas de automatización existentes sirven bien para flujos sencillos entre aplicaciones populares y se implementan más rápido. El desarrollo a medida conviene cuando el proceso es crítico, tiene muchas excepciones, maneja datos sensibles o los costos de las licencias crecen con el volumen. En el diagnóstico te mostramos ambas opciones con sus pros y contras.',
    },
    {
      question: '¿Qué pasa si una automatización falla?',
      answer:
        'Debe avisar y no fallar en silencio. Diseñamos cada automatización con registros de lo que ejecutó, alertas cuando algo no sale como se espera y un procedimiento claro para que una persona retome el caso. También dejamos documentado qué revisar cuando un sistema conectado cambia, que es una de las causas más comunes de fallas.',
    },
    {
      question: '¿Automatizar procesos significa reducir personal?',
      answer:
        'No necesariamente, y no es el enfoque que proponemos. El objetivo es que las personas dejen de copiar datos y perseguir aprobaciones para dedicarse a atender clientes, resolver excepciones y mejorar el negocio. En empresas que crecen, automatizar permite atender más volumen sin que la operación se vuelva inmanejable.',
    },
  ],

  related: {
    services: ['inteligencia-artificial-para-empresas', 'desarrollo-de-plataformas-web', 'modernizacion-de-sistemas'],
    guides: [
      'transformacion-digital-para-pymes-por-donde-empezar',
      'software-a-medida-vs-software-empaquetado',
      'como-empezar-con-inteligencia-artificial-en-tu-empresa',
    ],
    projects: ['plataforma-logistica-acero'],
  },

  cta: {
    title: '¿Qué proceso te gustaría dejar de hacer a mano?',
    text: 'Cuéntanos por WhatsApp qué tarea se repite todos los días en tu empresa. Te ayudamos a ver si conviene automatizarla y por dónde empezar.',
  },
  whatsappMessage: 'Hola Nithios, quiero automatizar un proceso de mi empresa.',
  keywords: [
    'automatización de procesos',
    'automatización de procesos empresariales',
    'automatización de procesos en Colombia',
    'automatizar procesos de una empresa',
    'integración de sistemas',
    'automatización de tareas repetitivas',
    'eliminar doble digitación',
  ],
} satisfies ServicePage;
