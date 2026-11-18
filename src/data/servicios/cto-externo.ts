/**
 * /servicios/cto-externo/ — ARCHIVO DE REFERENCIA de tono, profundidad y estructura para los servicios específicos.
 * Contrato: docs/CONTENIDO.md. Sin cifras, precios, plazos, clientes ni resultados inventados.
 */
import type { ServicePage } from './types';

export default {
  slug: 'cto-externo',
  parent: 'consultoria',
  order: 1,
  name: 'CTO externo',
  icon: 'compass',
  eyebrow: 'CTO externo · Consultoría',
  h1: 'CTO externo para tu empresa: dirección de tecnología por horas',
  h1Highlight: 'dirección de tecnología por horas',
  summary:
    'Dirección de tecnología a tiempo parcial: un CTO externo que decide contigo qué construir, con quién y en qué orden, y supervisa la ejecución sin que tengas que contratar un CTO de planta.',
  seoTitle: 'CTO externo en Colombia: dirección de tecnología',
  seoDescription:
    'CTO externo para empresas en Colombia: dirección de tecnología por horas para priorizar inversiones, supervisar proveedores y decidir con criterio. Hablemos.',
  ogDescription: 'Un director de tecnología por horas que prioriza inversiones y supervisa proveedores, sin contratar un CTO de planta.',
  ogTagline: 'Dirección de tecnología sin un CTO de planta',
  intro:
    'Un CTO externo es un director de tecnología con dedicación parcial que prioriza inversiones, supervisa proveedores y responde ante la gerencia. En Nithios lo ofrecemos de forma remota a empresas de toda Colombia.',

  sections: {
    whatIs: {
      title: '¿Cómo funciona el servicio de CTO externo de Nithios?',
      answer:
        'Asumimos la dirección de tecnología de tu empresa con una dedicación parcial y acordada: decidimos contigo, hacemos seguimiento y respondemos ante la gerencia, sin que tengas que crear un cargo de planta.',
      paragraphs: [
        'Está pensado para empresas que necesitan criterio técnico de nivel directivo, pero todavía no justifican, o no encuentran, un CTO de tiempo completo. Si quieres la explicación general del rol, lee [qué es un CTO externo y cuándo lo necesita tu empresa](/guias/que-es-un-cto-externo/).',
        'La diferencia con un consultor tradicional está en la responsabilidad. Un consultor entrega un diagnóstico o una recomendación y se va; un CTO externo se sienta en la mesa de decisiones, participa en el comité o en las reuniones de gerencia, hace seguimiento a lo que se acordó y responde por la coherencia de la tecnología de la empresa a lo largo del tiempo.',
        'La diferencia con un proveedor de desarrollo también es clara: el CTO externo no vende horas de programación ni defiende un producto. Su trabajo es representar los intereses de tu empresa frente a proveedores, plataformas y equipos, incluido cuando la mejor decisión es no construir nada o comprar una herramienta que ya existe.',
        'En la práctica, el rol se adapta a tu etapa: en una empresa que apenas empieza a digitalizarse se concentra en ordenar prioridades y elegir bien; en una que ya tiene software propio, en arquitectura, seguridad, calidad y gestión del equipo o del proveedor; y en una que prepara un proyecto grande, en definir el alcance y vigilar la ejecución.',
        'Un CTO externo tampoco es un consejero de la junta directiva: dirige y ejecuta la tecnología junto a la gerencia. Si lo que tu empresa necesita es criterio tecnológico en el máximo órgano de gobierno, sin funciones ejecutivas, el servicio indicado es el de [miembro de junta directiva experto en tecnología](/servicios/miembro-de-junta-directiva-tecnologia/).',
        'Nithios está dirigida por [Jonathan Osorio Correa](/jonathan-osorio/), CEO y Fundador, con trayectoria como CTO y líder de innovación en organizaciones de retail, educación y servicios.',
      ],
    },

    audience: {
      title: '¿Para qué empresas tiene sentido un CTO externo?',
      intro: 'Suele encajar cuando la tecnología ya pesa en el negocio, pero nadie en la organización tiene el rol de dirigirla.',
      items: [
        'Pymes y empresas medianas que dependen cada vez más de software, pero no tienen a nadie con perfil directivo en tecnología.',
        'Gerencias que van a invertir en un desarrollo a medida o en una plataforma y quieren a alguien de su lado que defina el alcance y supervise al proveedor.',
        'Empresas con un equipo técnico pequeño o un desarrollador interno que necesita dirección, estándares y alguien con quien tomar decisiones de arquitectura.',
        'Organizaciones que heredaron sistemas difíciles de mantener y deben decidir si modernizarlos, reemplazarlos o integrarlos.',
        'Emprendimientos que construyen un producto digital y necesitan criterio técnico desde el inicio, antes de contratar un CTO de planta.',
        'Compañías en una transición: el responsable de tecnología se fue y hace falta continuidad mientras se define el reemplazo.',
      ],
    },

    problems: {
      title: 'Problemas que resuelve un CTO externo',
      intro: 'Casi nunca el problema es la falta de herramientas: es la falta de alguien que decida con criterio y haga seguimiento.',
      items: [
        {
          icon: 'route',
          title: 'Decisiones de tecnología sin dueño',
          text: 'Cada área compra o contrata por su cuenta y nadie mira el conjunto. El resultado son herramientas que no se hablan, licencias duplicadas y datos repartidos en varios lugares.',
        },
        {
          icon: 'users',
          title: 'Dependencia total del proveedor',
          text: 'Cuando solo el proveedor entiende el sistema, cualquier cambio cuesta lo que él diga y tarda lo que él diga. Un CTO externo equilibra esa relación y te devuelve el control.',
        },
        {
          icon: 'target',
          title: 'Proyectos que no terminan',
          text: 'Alcances difusos, prioridades que cambian cada semana y entregas que no se pueden verificar. Hace falta alguien que traduzca el negocio en requisitos claros y que sepa revisar lo que se entrega.',
        },
        {
          icon: 'layers',
          title: 'Sistemas heredados que frenan la operación',
          text: 'Software antiguo que nadie se atreve a tocar, integraciones manuales y reprocesos. La pregunta no es solo cómo arreglarlo, sino qué conviene hacer primero y qué se puede dejar como está.',
        },
        {
          icon: 'shield',
          title: 'Riesgos que nadie está mirando',
          text: 'Accesos sin control, copias de seguridad que nunca se han probado, contraseñas compartidas o datos personales sin un tratamiento claro. Son riesgos silenciosos hasta el día en que dejan de serlo.',
        },
        {
          icon: 'spark',
          title: 'Presión por adoptar inteligencia artificial',
          text: 'Todos hablan de IA, pero no es evidente dónde aporta valor real en tu empresa. Un CTO externo separa los casos de uso con retorno de las modas y define cómo probarlos con bajo riesgo.',
        },
      ],
    },

    includes: {
      title: '¿Qué incluye el servicio de CTO externo?',
      intro: 'El alcance se ajusta a tu empresa, pero estos son los frentes que normalmente asume la dirección de tecnología.',
      items: [
        {
          icon: 'compass',
          title: 'Estrategia y hoja de ruta tecnológica',
          text: 'Alineamos la tecnología con los objetivos del negocio y los convertimos en una hoja de ruta priorizada que la gerencia puede entender, financiar y seguir.',
          points: ['Prioridades por impacto y esfuerzo', 'Qué hacer ahora, después y nunca', 'Revisión periódica con la gerencia'],
        },
        {
          icon: 'search',
          title: 'Decisiones de compra o desarrollo',
          text: 'Evaluamos si conviene software comercial, desarrollo a medida o una combinación, con criterios explícitos y comparables.',
          points: ['Criterios de evaluación escritos', 'Comparación de alternativas'],
        },
        {
          icon: 'briefcase',
          title: 'Gestión de proveedores',
          text: 'Preparamos solicitudes de propuesta claras, comparamos ofertas en igualdad de condiciones y hacemos seguimiento técnico a lo que se contrata.',
          points: ['Alcances y criterios de aceptación', 'Revisión de entregas'],
        },
        {
          icon: 'layers',
          title: 'Arquitectura y calidad',
          text: 'Definimos cómo deben encajar los sistemas, las integraciones y los datos, y establecemos estándares mínimos de calidad para que el software se pueda mantener.',
        },
        {
          icon: 'shield',
          title: 'Seguridad y continuidad',
          text: 'Revisamos accesos, respaldos, gestión de contraseñas y tratamiento de datos, y proponemos un plan de mejoras proporcional al tamaño de tu empresa.',
        },
        {
          icon: 'users',
          title: 'Acompañamiento al equipo',
          text: 'Orientamos a tu equipo técnico o a tus desarrolladores en prácticas, prioridades y decisiones de diseño, y apoyamos la definición de perfiles cuando necesites contratar.',
        },
      ],
    },

    process: {
      title: '¿Cómo trabajamos como CTO externo?',
      intro: 'Empezamos por entender tu negocio, no por recomendar herramientas.',
      items: [
        {
          title: 'Conversación inicial',
          text: 'Nos cuentas tu situación por WhatsApp o en una llamada: qué tecnología usan hoy, qué te preocupa y qué decisiones tienes pendientes. Con eso evaluamos si el servicio tiene sentido para tu caso.',
        },
        {
          title: 'Diagnóstico de arranque',
          text: 'Revisamos sistemas, proveedores, contratos, riesgos y la forma en que trabaja tu equipo. Hablamos con las personas que usan la tecnología todos los días, no solo con la gerencia.',
        },
        {
          title: 'Hoja de ruta y acuerdos',
          text: 'Presentamos prioridades, riesgos y una hoja de ruta. Acordamos contigo la dedicación, los espacios de seguimiento y los temas en los que el CTO externo tendrá la última palabra técnica.',
        },
        {
          title: 'Dirección continua',
          text: 'Participamos en las reuniones clave, revisamos entregas, tomamos decisiones técnicas con tu equipo y hacemos seguimiento a proveedores y proyectos, de forma remota.',
        },
        {
          title: 'Revisión y ajuste',
          text: 'Revisamos periódicamente qué avanzó, qué cambió en el negocio y si la dedicación sigue siendo la adecuada. El objetivo es que tu empresa gane autonomía, no que dependa de nosotros.',
        },
      ],
    },

    deliverables: {
      title: '¿Qué entregables recibes?',
      intro: 'Además del acompañamiento continuo, el servicio deja documentos concretos que quedan en tu empresa.',
      items: [
        { title: 'Diagnóstico tecnológico', text: 'Estado actual de sistemas, proveedores, riesgos y capacidades del equipo, explicado en lenguaje de negocio.' },
        { title: 'Hoja de ruta priorizada', text: 'Iniciativas ordenadas por impacto, esfuerzo y dependencias, con lo que conviene hacer primero y lo que conviene descartar.' },
        { title: 'Mapa de arquitectura', text: 'Cómo se conectan tus sistemas, dónde viven los datos y qué integraciones existen o hacen falta.' },
        { title: 'Criterios para proveedores', text: 'Plantillas de alcance, criterios de evaluación y de aceptación para contratar y recibir software con menos sorpresas.' },
        { title: 'Plan de seguridad y continuidad', text: 'Mejoras priorizadas en accesos, respaldos y protección de datos, proporcionales a tu tamaño y a tu riesgo.' },
        { title: 'Registro de decisiones', text: 'Las decisiones técnicas importantes quedan documentadas con su porqué, para que cualquier persona que llegue después entienda el contexto.' },
      ],
    },

    signals: {
      title: 'Señales de que tu empresa necesita un CTO externo',
      intro: 'Si te identificas con varias de estas frases, probablemente te falta dirección de tecnología, no más herramientas.',
      items: [
        'Vamos a invertir en un software importante y no tenemos a nadie que sepa evaluar las propuestas.',
        'Nuestro proveedor dice que todo está bien, pero no tenemos cómo comprobarlo.',
        'Cada área usa sus propias herramientas y la información no cuadra entre ellas.',
        'El sistema que tenemos ya no da más, pero no sabemos si arreglarlo o cambiarlo.',
        'Tenemos un desarrollador muy bueno, pero está solo tomando decisiones que deberían ser de la gerencia.',
        'Queremos usar inteligencia artificial y no sabemos por dónde empezar sin perder plata.',
      ],
    },

    notAFit: {
      title: '¿Cuándo NO te conviene un CTO externo?',
      intro: 'Preferimos decírtelo desde el principio: hay situaciones en las que otra opción te sirve mejor.',
      items: [
        {
          title: 'Si solo necesitas que te construyan algo ya definido',
          text: 'Si el alcance está claro y validado, lo que necesitas es un buen equipo de desarrollo de software a medida, no dirección de tecnología.',
        },
        {
          title: 'Si tu necesidad es soporte técnico del día a día',
          text: 'Instalar equipos, resolver fallas de impresoras o administrar cuentas de correo es trabajo de mesa de ayuda. Un CTO externo puede ayudarte a organizarlo, pero no a reemplazarlo.',
        },
        {
          title: 'Si la tecnología es el núcleo y necesitas dedicación total',
          text: 'Cuando el producto digital es el negocio y el equipo técnico crece rápido, necesitas un CTO de tiempo completo. Un CTO externo puede acompañar la transición y ayudarte a definir el perfil.',
        },
        {
          title: 'Si la gerencia no va a participar',
          text: 'La dirección de tecnología funciona cuando se sienta con quien toma las decisiones. Sin ese espacio, el servicio pierde la mitad de su valor.',
        },
      ],
    },

    technologies: {
      title: 'Marcos y prácticas de referencia',
      intro: 'Aplicamos prácticas reconocidas de gestión de tecnología en la medida justa para el tamaño de tu empresa.',
      items: ['Scrum y gestión ágil', 'DevOps', 'ITIL', 'COBIT', 'TOGAF', 'Arquitectura en la nube', 'Inteligencia artificial aplicada'],
      note: 'No se trata de llenar tu empresa de procesos, sino de tomar de cada marco lo que te ayuda a decidir y a operar mejor.',
    },
  },

  faqs: [
    {
      question: '¿Cuál es la diferencia entre un CTO externo y un CTO de tiempo completo?',
      answer:
        'La diferencia principal es la dedicación: el CTO externo asume las responsabilidades de dirección de tecnología con un tiempo parcial y acordado, mientras que el CTO de planta se dedica por completo a la empresa. El externo tiene sentido cuando necesitas criterio directivo, pero el volumen de trabajo todavía no justifica un cargo de tiempo completo.',
    },
    {
      question: '¿Un CTO externo reemplaza a mi proveedor de desarrollo?',
      answer:
        'No. El CTO externo dirige y supervisa; el proveedor construye. Su papel es representar los intereses de tu empresa: definir qué se necesita, evaluar propuestas, revisar entregas y asegurarse de que el software sea mantenible. Si en algún momento conviene que Nithios desarrolle, lo planteamos con transparencia y como una decisión aparte.',
    },
    {
      question: '¿Cuánto tiempo dedica un CTO externo a mi empresa?',
      answer:
        'Depende de tu etapa y de los proyectos en curso, por eso no hay una dedicación estándar. La acordamos después del diagnóstico de arranque, según las decisiones pendientes y el seguimiento que necesites, y la revisamos periódicamente para ajustarla a lo que está pasando en tu empresa.',
    },
    {
      question: '¿El CTO externo puede trabajar de forma remota con empresas fuera de Medellín?',
      answer:
        'Sí. Nithios se dirige desde Medellín y trabaja de forma remota con empresas de toda Colombia, como Bogotá, Cali, Barranquilla o Bucaramanga. Las reuniones de seguimiento, las revisiones de entregas y la comunicación con tu equipo y tus proveedores se hacen por videollamada y canales digitales.',
    },
    {
      question: '¿Un CTO externo tiene acceso a la información confidencial de mi empresa?',
      answer:
        'Tiene el acceso que tú definas y que sea necesario para cumplir su rol. Lo recomendable es acordarlo por escrito desde el inicio, con acuerdos de confidencialidad, accesos individuales y con permisos mínimos, y un registro de quién puede ver qué. Esa misma disciplina es parte de lo que un CTO externo ayuda a instalar.',
    },
    {
      question: '¿Qué pasa cuando mi empresa ya necesite un CTO de planta?',
      answer:
        'Es una buena noticia y una salida natural del servicio. El CTO externo puede ayudarte a definir el perfil, participar en la evaluación técnica de candidatos y hacer el empalme, de modo que la persona que llegue reciba la hoja de ruta, la arquitectura y el registro de decisiones documentados.',
    },
  ],

  related: {
    services: ['modernizacion-de-sistemas', 'inteligencia-artificial-para-empresas', 'miembro-de-junta-directiva-tecnologia'],
    guides: [
      'que-es-un-cto-externo',
      'como-elegir-una-empresa-de-desarrollo-de-software-en-colombia',
      'transformacion-digital-para-pymes-por-donde-empezar',
    ],
    projects: [],
  },

  cta: {
    title: '¿Tu empresa necesita dirección de tecnología?',
    text: 'Cuéntanos por WhatsApp qué decisiones tienes pendientes. Te ayudamos a saber si un CTO externo es lo que necesitas o si otra opción te sirve mejor.',
  },
  whatsappMessage: 'Hola Nithios, quiero saber si un CTO externo le sirve a mi empresa.',
  keywords: [
    'CTO externo',
    'CTO externo Colombia',
    'CTO por horas',
    'CTO fraccional',
    'director de tecnología por horas',
    'CTO as a service',
    'dirección de tecnología para pymes',
  ],
} satisfies ServicePage;
