/**
 * /servicios/inteligencia-artificial-para-empresas/ — adopción de IA aplicada (consultoría + desarrollo).
 * Contrato: docs/CONTENIDO.md. Sin cifras, precios, plazos, clientes ni resultados inventados.
 */
import type { ServicePage } from './types';

export default {
  slug: 'inteligencia-artificial-para-empresas',
  parent: 'ambas',
  order: 1,
  name: 'Inteligencia artificial para empresas',
  icon: 'spark',
  eyebrow: 'IA aplicada · Consultoría + desarrollo',
  h1: 'Inteligencia artificial para empresas en Colombia, aplicada a tu operación',
  h1Highlight: 'aplicada a tu operación',
  summary:
    'Te ayudamos a encontrar dónde la inteligencia artificial aporta valor real en tu empresa, a probarlo con tus propios datos y a integrarlo a tus procesos y sistemas con control y seguridad.',
  seoTitle: 'Inteligencia artificial para empresas en Colombia',
  seoDescription:
    'Inteligencia artificial para empresas en Colombia: casos de uso con sentido de negocio, pruebas con tus datos e integración segura a tus procesos. Hablemos.',
  intro:
    'La inteligencia artificial para empresas es usar modelos de IA en tareas concretas: clasificar documentos, responder consultas o extraer datos. En Nithios acompañamos a empresas de toda Colombia, de forma remota, del primer caso de uso a su integración.',

  sections: {
    whatIs: {
      title: '¿Qué es la inteligencia artificial aplicada a empresas?',
      answer:
        'Es incorporar capacidades de inteligencia artificial a procesos concretos de una empresa, con un objetivo medible, datos propios y personas responsables de revisar los resultados, en lugar de usar la IA como una herramienta suelta o un experimento aislado.',
      paragraphs: [
        'Usar un asistente de chat de forma individual es útil, pero no es lo mismo que adoptar IA en la empresa. La adopción ocurre cuando una tarea del negocio cambia: una solicitud que antes se leía y clasificaba a mano ahora llega clasificada, una respuesta que antes había que buscar en varios documentos ahora la propone un asistente citando la fuente, y una persona revisa y decide en lugar de transcribir.',
        'Por eso el servicio combina nuestras dos líneas. La parte de consultoría responde dónde aplicar la IA, qué riesgos tiene y cómo medir si funciona. La parte de desarrollo la conecta con tus sistemas, tus datos y tus flujos de trabajo, con permisos, registros y un responsable humano en los pasos que lo requieren.',
        'También implica aceptar los límites de la tecnología. Los modelos actuales pueden equivocarse con seguridad aparente, dependen de la calidad de la información que reciben y no reemplazan el criterio de tu equipo. Un buen proyecto de IA diseña desde el inicio cómo detectar y corregir esos errores, y quién responde cuando ocurren.',
      ],
    },

    audience: {
      title: '¿Para qué empresas tiene sentido la inteligencia artificial?',
      intro: 'No hace falta ser una empresa de tecnología. Hace falta tener un proceso con volumen, información y reglas que se puedan describir.',
      items: [
        'Empresas de servicios que reciben muchas solicitudes, correos o mensajes y pierden tiempo leyéndolos, clasificándolos y enrutándolos.',
        'Áreas administrativas que extraen a mano datos de facturas, órdenes, formularios o contratos para pasarlos a otro sistema.',
        'Organizaciones con mucho conocimiento repartido en manuales, políticas y documentos que nadie encuentra cuando lo necesita.',
        'Equipos comerciales o de atención que repiten las mismas respuestas y quieren apoyo para redactarlas sin perder el tono ni la precisión.',
        'Gerencias que ya probaron herramientas de IA de forma individual y ahora quieren llevarlas a un proceso con control, seguridad y medición.',
        'Empresas que van a desarrollar o renovar un software y quieren que incluya funciones de IA desde el diseño, no como un añadido posterior.',
      ],
    },

    problems: {
      title: 'Problemas que resuelve la inteligencia artificial en tu empresa',
      intro: 'La IA rinde mejor en tareas de lectura, clasificación y redacción que hoy consumen horas de personas capaces.',
      items: [
        {
          icon: 'clipboard',
          title: 'Datos que se transcriben a mano',
          text: 'Facturas, órdenes de compra, formularios y soportes llegan en PDF o en foto y alguien los digita en otro sistema. La IA puede extraer esos datos y dejarlos listos para que una persona los valide.',
        },
        {
          icon: 'message',
          title: 'Solicitudes que nadie alcanza a leer',
          text: 'Correos, mensajes y tickets se acumulan sin clasificar y las urgencias se pierden entre lo rutinario. Un modelo puede leerlos, identificar el tema y la prioridad, y enviarlos al responsable correcto.',
        },
        {
          icon: 'search',
          title: 'Conocimiento difícil de encontrar',
          text: 'Las respuestas existen en manuales, procedimientos o contratos, pero buscarlas toma tiempo y depende de quién sepa dónde están. Un asistente interno puede responder citando el documento de origen.',
        },
        {
          icon: 'spark',
          title: 'Pruebas de IA que no pasan del piloto',
          text: 'Se hicieron demostraciones llamativas, pero nunca llegaron a la operación porque no había datos preparados, integración con los sistemas ni una forma clara de medir si funcionaban.',
        },
        {
          icon: 'shield',
          title: 'Uso de IA sin reglas',
          text: 'Cada persona usa la herramienta que quiere y pega información de clientes o de la empresa sin saber a dónde va. Hace falta una política sencilla y herramientas aprobadas antes de que eso se convierta en un riesgo.',
        },
        {
          icon: 'chart',
          title: 'Información que no se analiza',
          text: 'Encuestas, comentarios de clientes o reportes de campo en texto libre que nadie alcanza a leer completos. La IA puede resumirlos y agrupar temas para que la gerencia decida con más contexto.',
        },
      ],
    },

    includes: {
      title: '¿Qué incluye el servicio de inteligencia artificial para empresas?',
      intro: 'Puedes contratar solo la parte de consultoría o el recorrido completo, desde la idea hasta la solución en operación.',
      items: [
        {
          icon: 'target',
          title: 'Identificación y priorización de casos de uso',
          text: 'Revisamos tus procesos con las personas que los operan y elegimos los casos donde la IA tiene más probabilidad de aportar, con un criterio explícito de impacto, riesgo y factibilidad.',
          points: ['Mapa de oportunidades por proceso', 'Criterios de impacto, riesgo y datos', 'Primer caso de uso recomendado'],
        },
        {
          icon: 'database',
          title: 'Revisión de datos y viabilidad',
          text: 'Verificamos si la información necesaria existe, en qué formato está, quién puede acceder a ella y qué hay que preparar antes de construir.',
          points: ['Fuentes y calidad de los datos', 'Restricciones de privacidad'],
        },
        {
          icon: 'bolt',
          title: 'Prueba de concepto acotada',
          text: 'Construimos una prueba pequeña con tus datos y casos reales de tu operación, con criterios de éxito acordados antes de empezar, para decidir con evidencia si vale la pena seguir.',
        },
        {
          icon: 'plug',
          title: 'Integración con tus sistemas',
          text: 'Conectamos la solución con el software que ya usas o la incorporamos en una plataforma a medida, para que la IA trabaje dentro del flujo y no en una ventana aparte.',
        },
        {
          icon: 'shield',
          title: 'Gobierno, seguridad y privacidad',
          text: 'Definimos qué datos pueden usarse, con qué proveedores, quién revisa los resultados y cómo se registran las decisiones, en línea con la protección de datos personales.',
        },
        {
          icon: 'users',
          title: 'Adopción y medición',
          text: 'Acompañamos a tu equipo en el cambio de forma de trabajar, ajustamos instrucciones y reglas con el uso diario y medimos si la tarea realmente mejoró.',
        },
      ],
    },

    process: {
      title: '¿Cómo trabajamos un proyecto de inteligencia artificial?',
      intro: 'Avanzamos por etapas cortas y decides en cada una si continuar, ajustar o detenerte.',
      items: [
        {
          title: 'Conversación inicial',
          text: 'Nos escribes por WhatsApp y nos cuentas qué tarea te gustaría mejorar, qué has probado y qué información manejas. Con eso te decimos con franqueza si la IA es una buena opción para ese problema.',
        },
        {
          title: 'Diagnóstico de procesos y datos',
          text: 'Analizamos el proceso paso a paso, los volúmenes, los errores frecuentes y los datos disponibles. Identificamos dónde la IA ayuda y dónde basta con una regla o una automatización sencilla.',
        },
        {
          title: 'Prueba con criterios de éxito',
          text: 'Acordamos qué significa que funcione y lo probamos con ejemplos reales de tu operación. Revisamos aciertos y errores contigo, sin maquillar los resultados.',
        },
        {
          title: 'Integración y puesta en marcha',
          text: 'Si la prueba convence, la llevamos a producción: integración con tus sistemas, permisos, revisión humana donde corresponde, registros y capacitación del equipo que la va a usar.',
        },
        {
          title: 'Seguimiento y mejora',
          text: 'Monitoreamos la calidad de las respuestas, los costos de uso y la adopción. Ajustamos instrucciones, datos y reglas, y decidimos contigo cuál es el siguiente caso de uso.',
        },
      ],
    },

    deliverables: {
      title: '¿Qué entregables recibes?',
      intro: 'Cada etapa deja algo concreto que tu empresa conserva, aunque decidas no avanzar a la siguiente.',
      items: [
        { title: 'Mapa de casos de uso priorizados', text: 'Oportunidades de IA por proceso, con su impacto esperado, sus riesgos, los datos que requieren y el orden recomendado.' },
        { title: 'Informe de viabilidad de datos', text: 'Qué información existe, en qué estado está, qué falta preparar y qué restricciones de privacidad aplican.' },
        { title: 'Prueba de concepto evaluada', text: 'Una solución funcional sobre un caso acotado, con los resultados frente a los criterios de éxito acordados y una recomendación clara.' },
        { title: 'Solución integrada en producción', text: 'La funcionalidad de IA conectada a tus sistemas, con permisos, revisión humana y registro de las respuestas que genera.' },
        { title: 'Política de uso de IA', text: 'Reglas sencillas sobre qué herramientas se usan, qué información no se comparte y quién responde por los resultados.' },
        { title: 'Documentación y capacitación', text: 'Cómo funciona la solución, cómo ajustarla y qué hacer cuando se equivoca, explicado para el equipo que la usa a diario.' },
      ],
    },

    signals: {
      title: 'Señales de que tu empresa está lista para usar inteligencia artificial',
      intro: 'Si varias de estas frases se escuchan en tu empresa, hay una oportunidad concreta que vale la pena evaluar.',
      items: [
        'Tenemos a una persona dedicada casi todo el día a pasar datos de documentos a un sistema.',
        'Recibimos muchas solicitudes y no alcanzamos a clasificarlas antes de que alguien se queje.',
        'La respuesta está en algún manual, pero siempre terminamos preguntándole a la misma persona.',
        'Ya usamos IA cada uno por su lado, pero no sabemos qué información se está compartiendo.',
        'Hicimos una demostración que gustó mucho, pero nunca la pudimos conectar con nuestro sistema.',
        'Queremos que el software que vamos a construir aproveche la IA, pero no sabemos en qué partes.',
      ],
    },

    notAFit: {
      title: '¿Cuándo NO te conviene un proyecto de inteligencia artificial?',
      intro: 'La IA no es la respuesta para todo. En estos casos te recomendamos otro camino.',
      items: [
        {
          title: 'Si el proceso se resuelve con reglas fijas',
          text: 'Cuando la tarea siempre sigue los mismos pasos y no requiere interpretar texto o imágenes, una automatización de procesos tradicional es más barata, más predecible y más fácil de mantener.',
        },
        {
          title: 'Si todavía no existe la información',
          text: 'Si los datos están en papel, incompletos o repartidos sin orden, el primer paso es digitalizar y organizar. Una plataforma web a medida o la consultoría tecnológica suelen ser el punto de partida correcto.',
        },
        {
          title: 'Si un error no admite revisión humana',
          text: 'En decisiones donde una equivocación es grave y no hay quién valide el resultado, la IA no debe decidir sola. Puede apoyar el análisis, pero la decisión final debe quedar en una persona.',
        },
        {
          title: 'Si el objetivo es solo decir que se usa IA',
          text: 'Sin un problema concreto ni una forma de medir el resultado, el proyecto termina en una demostración. En ese caso conviene empezar por un diagnóstico o por un CTO externo que ordene prioridades.',
        },
      ],
    },

    technologies: {
      title: 'Capacidades y tecnologías de referencia',
      intro: 'Elegimos el modelo y el proveedor según tu caso, tus datos y tus restricciones, no al revés.',
      items: [
        'Modelos de lenguaje (LLM)',
        'Búsqueda semántica sobre documentos (RAG)',
        'Extracción de datos de documentos',
        'Clasificación y resumen de texto',
        'Integración por API',
        'Node.js',
        'TypeScript',
        'PostgreSQL',
      ],
      note: 'RAG (generación aumentada por recuperación) es la técnica que permite que un asistente responda a partir de tus propios documentos y cite de dónde sacó cada respuesta.',
    },
  },

  faqs: [
    {
      question: '¿Qué tareas de una empresa se pueden apoyar con inteligencia artificial?',
      answer:
        'Las que implican leer, clasificar, resumir, extraer o redactar información con cierta variedad. Por ejemplo: extraer datos de facturas o formularios, clasificar correos y solicitudes, responder preguntas internas a partir de manuales o preparar borradores de respuestas. Las tareas que siguen siempre las mismas reglas suelen resolverse mejor con una automatización tradicional.',
    },
    {
      question: '¿Necesito muchos datos para usar inteligencia artificial en mi empresa?',
      answer:
        'No siempre. Muchos casos de uso actuales aprovechan modelos ya entrenados y solo necesitan tus documentos, ejemplos representativos y reglas claras. Lo que sí necesitas es información accesible, organizada y con permisos definidos. Por eso revisamos la viabilidad de los datos antes de construir cualquier solución.',
    },
    {
      question: '¿Es seguro usar la información de mi empresa con herramientas de IA?',
      answer:
        'Puede serlo si se diseña con cuidado. Hay que elegir proveedores y configuraciones que no usen tus datos para entrenar sus modelos, limitar qué información se envía, controlar accesos y registrar el uso. Si hay datos personales, el tratamiento debe cumplir la normativa colombiana de protección de datos personales; lo revisamos contigo desde el diseño.',
    },
    {
      question: '¿La inteligencia artificial va a reemplazar a mi equipo?',
      answer:
        'En los proyectos que proponemos, no: la IA se encarga de la parte repetitiva de una tarea y la persona revisa, corrige y decide. El objetivo es que tu equipo dedique su tiempo a lo que requiere criterio. Además, sin la experiencia de quienes conocen el proceso es muy difícil saber si la IA está respondiendo bien.',
    },
    {
      question: '¿Qué pasa si la inteligencia artificial se equivoca?',
      answer:
        'Se equivocará en algunos casos, y la solución debe estar diseñada para eso. Definimos en qué pasos interviene una persona, mostramos de dónde sale cada respuesta cuando es posible, registramos los resultados y revisamos los errores para ajustar instrucciones, datos o reglas. Si un caso no admite errores, la IA solo apoya y no decide.',
    },
    {
      question: '¿Pueden integrar inteligencia artificial en el software que ya tenemos?',
      answer:
        'En muchos casos sí, siempre que el sistema permita conectarse por API (una interfaz para que dos programas intercambien datos), por exportaciones o por base de datos. Primero revisamos cómo está construido y qué permite. Si no es viable, evaluamos contigo una capa intermedia o una plataforma a medida que se integre con lo existente.',
    },
  ],

  related: {
    services: ['automatizacion-de-procesos', 'cto-externo', 'desarrollo-de-plataformas-web'],
    guides: ['como-empezar-con-inteligencia-artificial-en-tu-empresa', 'transformacion-digital-para-pymes-por-donde-empezar'],
    projects: [],
  },

  cta: {
    title: '¿Dónde podría ayudarle la IA a tu empresa?',
    text: 'Cuéntanos por WhatsApp qué tarea te consume más tiempo. Te decimos con franqueza si la inteligencia artificial es la mejor forma de resolverla.',
  },
  whatsappMessage: 'Hola Nithios, quiero evaluar cómo usar inteligencia artificial en mi empresa.',
  keywords: [
    'inteligencia artificial para empresas',
    'inteligencia artificial para empresas en Colombia',
    'implementar IA en mi empresa',
    'consultoría en inteligencia artificial',
    'desarrollo de soluciones con IA',
    'IA aplicada a procesos',
    'asistente de IA para empresas',
  ],
} satisfies ServicePage;
