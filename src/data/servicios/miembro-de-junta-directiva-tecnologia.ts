/**
 * /servicios/miembro-de-junta-directiva-tecnologia/ — Jonathan Osorio como miembro o asesor de junta directiva
 * con enfoque tecnológico (Board Member). Contrato: docs/CONTENIDO.md.
 * VERACIDAD: el perfil usa SOLO hechos de src/data/ceo.ts (sin fechas ni empleadores). Único antecedente de junta confirmado:
 * ha sido miembro de la junta directiva de la Asociación Drupal Colombia (pasado, sin fechas ni cargo; no afirmar otras juntas,
 * juntas de empresas ni membresía actual). Modalidades CONFIRMADAS por el usuario (las cuatro de `modalities`).
 * Sin cifras de honorarios, plazos, requisitos legales ni normas citadas.
 * Diferencia con /servicios/cto-externo/: el CTO externo DIRIGE y ejecuta; el miembro de junta GOBIERNA, supervisa y aconseja.
 */
import type { ServicePage } from './types';

export default {
  slug: 'miembro-de-junta-directiva-tecnologia',
  parent: 'consultoria',
  order: 2,
  name: 'Miembro de junta en tecnología',
  icon: 'award',
  eyebrow: 'Junta directiva · Consultoría',
  h1: 'Miembro de junta directiva experto en tecnología: Jonathan Osorio',
  h1Highlight: 'Jonathan Osorio',
  summary:
    'Jonathan Osorio, CEO de Nithios, como miembro independiente o asesor de tu junta directiva: criterio tecnológico para la estrategia, las inversiones digitales y el riesgo.',
  seoTitle: 'Miembro de junta directiva experto en tecnología',
  seoDescription:
    'Jonathan Osorio como miembro de junta directiva o Board Member experto en tecnología: estrategia digital, riesgo, ciberseguridad e IA en Colombia. Hablemos.',
  ogDescription: 'Criterio tecnológico en tu junta directiva: Jonathan Osorio como Board Member para estrategia digital, riesgo e IA.',
  ogTagline: 'Criterio tecnológico en tu junta directiva',
  ogCta: 'Propón a Jonathan para tu junta',
  intro:
    'Un miembro de junta directiva experto en tecnología es un consejero que aporta criterio tecnológico al máximo órgano de gobierno de la empresa: supervisa la estrategia digital, las inversiones y el riesgo, sin operar. En Nithios proponemos para ese rol a Jonathan Osorio, que ha sido miembro de la junta directiva de la Asociación Drupal Colombia, como miembro independiente, asesor permanente, integrante de un comité de tecnología o para sesiones puntuales, en empresas de toda Colombia y de forma remota.',

  sections: {
    whatIs: {
      title: '¿Qué es un miembro de junta directiva experto en tecnología?',
      answer:
        'Es un integrante o asesor de la junta directiva cuyo aporte principal es el criterio tecnológico: ayuda a la junta a entender, cuestionar y supervisar las decisiones de tecnología que presenta la gerencia, sin asumir funciones ejecutivas.',
      paragraphs: [
        'En muchas juntas hay perfiles financieros, legales y comerciales, pero nadie que pueda evaluar con propiedad un proyecto de software, una inversión en la nube, un plan de ciberseguridad o una propuesta de inteligencia artificial. El resultado es que la tecnología se aprueba por confianza o se pospone por desconfianza, y en ambos casos la junta pierde control sobre una parte cada vez mayor del negocio.',
        'El aporte de un consejero con enfoque tecnológico es de gobierno corporativo de TI: hacer las preguntas correctas, pedir la información adecuada, alertar sobre riesgos y verificar que la tecnología esté alineada con la estrategia. No dirige equipos ni proveedores. Si lo que necesitas es alguien que asuma la dirección de tecnología día a día, el servicio indicado es el de [CTO externo](/servicios/cto-externo/).',
        'Para este rol, Nithios propone a [Jonathan Osorio Correa](/jonathan-osorio/), su CEO y Fundador: un CTO, director y líder de innovación y tecnología con casi 20 años de experiencia en retail, educación y servicios. Lleva a la mesa dos miradas: la de quien ha presentado y ejecutado la estrategia de tecnología ante la alta dirección y la de quien ya se ha sentado en una junta directiva, como miembro de la junta de la Asociación Drupal Colombia.',
      ],
    },

    profile: {
      title: '¿Por qué Jonathan Osorio para tu junta directiva?',
      intro:
        'Su perfil combina experiencia en junta directiva, dirección de tecnología, marcos de gobierno de TI y visión de negocio. Estos son los hechos de su trayectoria que respaldan la postulación.',
      items: [
        {
          icon: 'award',
          title: 'Experiencia en junta directiva',
          text: 'Ha sido miembro de la junta directiva de la Asociación Drupal Colombia: conoce el trabajo de una junta desde la mesa, no solo desde la gerencia.',
        },
        {
          icon: 'briefcase',
          title: 'Casi 20 años dirigiendo tecnología',
          text: 'CTO, director y líder de innovación en retail, educación y servicios. Hoy, como CTO de una institución de educación superior, dirige su estrategia de innovación y tecnología.',
        },
        {
          icon: 'workflow',
          title: 'Marcos de gobierno de TI',
          text: 'Trabaja con COBIT, ITIL y TOGAF, además de Scrum y DevOps: el lenguaje con el que se gobierna, se gestiona y se audita la tecnología.',
        },
        {
          icon: 'shield',
          title: 'Ciberseguridad y continuidad',
          text: 'Lidera la ciberseguridad, las metodologías y los marcos tecnológicos, y ha asegurado la continuidad del negocio y sus indicadores bajo marcos de la industria.',
        },
        {
          icon: 'chart',
          title: 'Resultados medibles',
          text: 'Mejoras superiores al 45 % en eficiencia y control con la migración de un ERP y un 36 % de reducción mensual en costos de nube, entre otros logros.',
        },
        {
          icon: 'graduation',
          title: 'Formación en gerencia de TI',
          text: 'Especialista en Gerencia de TI de la Universidad Pontificia Bolivariana e Ingeniero de Sistemas. Habla español e inglés.',
        },
      ],
      link: { label: 'Ver la hoja de vida de Jonathan Osorio', href: '/jonathan-osorio/' },
    },

    modalities: {
      title: '¿En qué modalidades participa Jonathan Osorio en tu junta?',
      intro: 'Cuatro formas de sumar criterio tecnológico a tu junta directiva. Elegimos la adecuada contigo, según tus estatutos y lo que la junta necesita.',
      items: [
        {
          icon: 'award',
          title: 'Miembro independiente de junta',
          text: 'Integra la junta directiva como miembro independiente, con el alcance que definan los estatutos de tu empresa.',
          when: 'la junta quiere sumar de forma estable un perfil tecnológico independiente, por ejemplo al profesionalizarse.',
        },
        {
          icon: 'compass',
          title: 'Asesor permanente de la junta',
          text: 'Participa en las sesiones como consejero en tecnología, sin ser miembro formal de la junta.',
          when: 'los estatutos no prevén un nuevo miembro o la junta prefiere empezar con un rol consultivo.',
        },
        {
          icon: 'users',
          title: 'Comité de tecnología',
          text: 'Integra el comité de tecnología o de riesgos de la junta, o ayuda a crearlo, y lleva sus conclusiones a la junta plena.',
          when: 'la tecnología pesa en la estrategia y sus temas ya no caben en la agenda ordinaria de la junta.',
        },
        {
          icon: 'calendar',
          title: 'Sesiones puntuales',
          text: 'Acompaña a la junta en sesiones específicas para analizar un tema o una decisión de tecnología concreta.',
          when: 'hay una decisión puntual: aprobar un ERP, una plataforma propia, un proyecto de IA o un contrato crítico.',
        },
      ],
    },

    audience: {
      title: '¿Qué juntas directivas necesitan un experto en tecnología?',
      intro: 'Suele encajar cuando la tecnología ya define el rumbo del negocio, pero la junta no tiene cómo evaluarla.',
      items: [
        'Empresas familiares que están profesionalizando su junta directiva y quieren sumar un perfil independiente en tecnología.',
        'Pymes y empresas medianas en crecimiento cuya estrategia depende cada vez más del software, los datos y los canales digitales.',
        'Juntas con perfiles financieros, legales o comerciales que necesitan criterio técnico para evaluar lo que presenta la gerencia.',
        'Empresas que van a aprobar una inversión tecnológica importante, como un ERP, una plataforma propia o un proyecto de IA.',
        'Organizaciones que quieren crear un comité de tecnología o de riesgos con un integrante que conozca el tema a fondo.',
        'Juntas preocupadas por la ciberseguridad y la continuidad del negocio que no saben qué deberían estar supervisando.',
      ],
    },

    problems: {
      title: 'Problemas que resuelve un experto en tecnología en la junta',
      intro: 'El problema rara vez es la tecnología en sí: es que la junta no tiene cómo gobernarla.',
      items: [
        {
          icon: 'search',
          title: 'Se aprueba tecnología sin poder evaluarla',
          text: 'La gerencia presenta un proyecto de software o una inversión en la nube y la junta no sabe qué preguntar. Termina aprobando por confianza o aplazando por desconfianza.',
        },
        {
          icon: 'shield',
          title: 'El riesgo tecnológico no está en la agenda',
          text: 'Ciberataques, caídas de sistemas, pérdida de datos o dependencia de un solo proveedor rara vez llegan a la junta hasta que ya ocurrieron y cuestan dinero y reputación.',
        },
        {
          icon: 'chart',
          title: 'Inversiones digitales sin seguimiento',
          text: 'Se aprueba un presupuesto de tecnología, pero nadie verifica después si el proyecto entregó lo prometido. La junta no tiene indicadores claros para hacer seguimiento.',
        },
        {
          icon: 'route',
          title: 'Estrategia y tecnología por caminos distintos',
          text: 'El plan estratégico habla de crecer, digitalizar o abrir canales, pero la tecnología que se compra y se construye no está pensada para sostener ese plan.',
        },
        {
          icon: 'spark',
          title: 'Presión por la inteligencia artificial',
          text: 'Accionistas y equipos preguntan por la IA y la junta necesita una postura clara: dónde puede aportar valor, qué riesgos tiene con los datos y cómo supervisarla.',
        },
        {
          icon: 'users',
          title: 'Proveedores críticos sin contrapeso',
          text: 'Cuando la operación depende de un proveedor de software o de nube, la junta necesita a alguien que pueda leer esa relación con independencia y señalar los riesgos.',
        },
      ],
    },

    includes: {
      title: '¿Qué aporta un asesor de junta directiva en tecnología?',
      intro: 'El alcance se define con la presidencia de la junta, pero estos son los frentes en los que se concentra el aporte.',
      items: [
        {
          icon: 'compass',
          title: 'Criterio tecnológico en la estrategia',
          text: 'Revisión del plan estratégico desde la tecnología: qué capacidades exige, qué riesgos implica y qué decisiones tecnológicas lo sostienen o lo frenan.',
          points: [
            'Lectura tecnológica del plan estratégico',
            'Preguntas clave a la gerencia en cada sesión',
            'Prioridades alineadas con el negocio',
          ],
        },
        {
          icon: 'chart',
          title: 'Supervisión de inversiones en tecnología',
          text: 'Análisis de los proyectos que se llevan a la junta: alcance, alternativas, riesgos y cómo se medirá el resultado antes y después de aprobarlos.',
        },
        {
          icon: 'shield',
          title: 'Riesgo tecnológico y ciberseguridad',
          text: 'Que la junta conozca los riesgos de tecnología relevantes, pida los planes de respuesta adecuados y haga seguimiento a su avance.',
        },
        {
          icon: 'spark',
          title: 'Inteligencia artificial con gobierno',
          text: 'Postura de la junta frente a la IA: dónde explorarla, con qué reglas sobre datos y confidencialidad y cómo evaluar los resultados.',
        },
        {
          icon: 'briefcase',
          title: 'Proyectos y proveedores críticos',
          text: 'Concepto independiente sobre los proyectos y contratos de tecnología de mayor impacto, sin intereses comerciales en la decisión.',
        },
        {
          icon: 'users',
          title: 'Comité de tecnología',
          text: 'Apoyo para crear o dirigir un comité de tecnología de la junta: alcance, agenda, información que debe recibir y cómo reporta a la junta.',
        },
      ],
    },

    process: {
      title: '¿Cómo trabaja Jonathan Osorio con tu junta directiva?',
      intro: 'Empezamos por entender cómo funciona tu junta y qué espera de un perfil tecnológico.',
      items: [
        {
          title: 'Conversación inicial',
          text: 'Nos escribes por WhatsApp y conversamos sobre tu empresa, cómo funciona hoy la junta y qué esperan del rol. Con eso vemos si la postulación tiene sentido.',
        },
        {
          title: 'Encuentro con la presidencia',
          text: 'Jonathan se reúne con quien preside la junta y con la gerencia para conocer la estrategia, los temas de tecnología pendientes y las reglas de la junta. Se revisan también posibles conflictos de interés.',
        },
        {
          title: 'Rol y modalidad',
          text: 'Elegimos una de las cuatro modalidades: miembro independiente, asesor permanente, comité de tecnología o sesiones puntuales. Acordamos también la confidencialidad y la información previa a cada sesión.',
        },
        {
          title: 'Preparación de cada sesión',
          text: 'Antes de cada reunión, Jonathan lee el material, identifica los temas de tecnología y prepara preguntas y observaciones concretas para la discusión.',
        },
        {
          title: 'Participación y seguimiento',
          text: 'Participa en las sesiones, deja por escrito sus recomendaciones y hace seguimiento a los compromisos de tecnología que la junta acuerda con la gerencia.',
        },
        {
          title: 'Evaluación periódica',
          text: 'Revisamos con la presidencia si el aporte es el esperado y si la modalidad sigue siendo la adecuada para el momento de la empresa.',
        },
      ],
    },

    deliverables: {
      title: '¿Qué entregables recibe la junta directiva?',
      intro: 'Además de la participación en las sesiones, el rol deja documentos que la junta puede consultar y usar.',
      items: [
        { title: 'Lectura tecnológica de la estrategia', text: 'Documento breve con las capacidades, riesgos y decisiones de tecnología que implica el plan estratégico de la empresa.' },
        { title: 'Observaciones por sesión', text: 'Preguntas, alertas y recomendaciones por escrito sobre los temas de tecnología de cada reunión de junta.' },
        { title: 'Mapa de riesgos tecnológicos', text: 'Los riesgos de tecnología relevantes para la junta, con su posible impacto y lo que conviene pedir a la gerencia.' },
        { title: 'Indicadores de tecnología para la junta', text: 'Propuesta de los pocos indicadores que la junta debería revisar para supervisar proyectos, seguridad y continuidad.' },
        { title: 'Concepto sobre inversiones', text: 'Opinión independiente sobre los proyectos y contratos de tecnología de mayor impacto antes de que la junta decida.' },
        { title: 'Agenda de tecnología de la junta', text: 'Qué temas de tecnología debería revisar la junta a lo largo del año y con qué información.' },
      ],
    },

    signals: {
      title: 'Señales de que tu junta directiva necesita un experto en tecnología',
      intro: 'Si en tu junta se oyen varias de estas frases, probablemente falta un perfil tecnológico en la mesa.',
      items: [
        '«La gerencia nos presenta proyectos de tecnología y nadie en la junta sabe qué preguntar.»',
        '«Aprobamos un sistema nuevo y todavía no sabemos si dio el resultado que esperábamos.»',
        '«Nos preocupa un ciberataque, pero el tema nunca llega a la junta.»',
        '«Somos una empresa familiar y queremos profesionalizar la junta con perfiles independientes.»',
        '«Todos hablan de inteligencia artificial y necesitamos una postura clara, no una moda.»',
        '«Dependemos de un proveedor de tecnología y no tenemos cómo evaluar esa relación.»',
      ],
    },

    notAFit: {
      title: '¿Cuándo NO te conviene un miembro de junta experto en tecnología?',
      intro: 'Preferimos decírtelo desde el principio: hay situaciones en las que otra opción te sirve mejor.',
      items: [
        {
          title: 'Si necesitas que alguien dirija la tecnología',
          text: 'Un miembro de junta supervisa y aconseja; no dirige equipos ni proveedores. Si te falta quien tome y ejecute las decisiones de tecnología, lo indicado es un CTO externo.',
        },
        {
          title: 'Si buscas un diagnóstico puntual',
          text: 'Si lo que necesitas es una evaluación de tu situación tecnológica y una hoja de ruta, la consultoría tecnológica lo resuelve sin un rol permanente en la junta.',
        },
        {
          title: 'Si la junta no sesiona ni recibe información',
          text: 'Sin reuniones regulares y sin información previa, cualquier consejero aporta poco. Primero conviene ordenar el funcionamiento de la junta.',
        },
        {
          title: 'Si lo que buscas es que te construyan el software',
          text: 'Un consejero no desarrolla. Si el proyecto ya está definido, lo que necesitas es un equipo de desarrollo de software a medida.',
        },
      ],
    },

    technologies: {
      title: 'Marcos de gobierno y gestión de referencia',
      intro: 'Jonathan aplica marcos reconocidos de gobierno y gestión de tecnología en la medida justa para cada empresa.',
      items: ['COBIT', 'ITIL', 'TOGAF', 'Scrum y gestión ágil', 'DevOps', 'Ciberseguridad', 'Inteligencia artificial aplicada'],
      note: 'No se trata de llenar la junta de marcos y siglas, sino de darle las preguntas y los indicadores para gobernar la tecnología.',
    },
  },

  faqs: [
    {
      question: '¿En qué se diferencia un miembro de junta experto en tecnología de un CTO externo?',
      answer:
        'El miembro de junta gobierna y supervisa; el CTO externo dirige y ejecuta. El consejero participa en las sesiones de la junta, cuestiona y aconseja sobre las decisiones de tecnología que presenta la gerencia, pero no maneja equipos ni proveedores. El [CTO externo](/servicios/cto-externo/) asume la dirección de tecnología con dedicación parcial y responde ante la gerencia.',
    },
    {
      question: '¿Qué significa Board Member y es lo mismo que miembro de junta directiva?',
      answer:
        'Sí, Board Member es el término en inglés para miembro de junta directiva o consejero. Un Board Member con enfoque tecnológico es el integrante que aporta criterio sobre estrategia digital, ciberseguridad, datos e inteligencia artificial. El término también se usa para asesores permanentes de la junta que participan en las sesiones sin ser miembros formales.',
    },
    {
      question: '¿Jonathan Osorio puede participar como miembro independiente de nuestra junta?',
      answer:
        'Sí. Es una de las cuatro modalidades que ofrece, junto con asesor permanente de la junta, comité de tecnología y sesiones puntuales, y ya ha sido miembro de la junta directiva de la Asociación Drupal Colombia. Antes de aceptar revisamos juntos tus estatutos y que no existan vínculos que comprometan su independencia. Jonathan está radicado en Medellín y participa de forma remota con empresas de toda Colombia.',
    },
    {
      question: '¿Qué es un comité de tecnología de la junta directiva y cuándo conviene crearlo?',
      answer:
        'Es un grupo de la junta dedicado a supervisar con más detalle los temas de tecnología, como proyectos, seguridad y riesgos, y a llevar a la junta plena conclusiones claras. Conviene cuando la tecnología pesa en la estrategia y los temas no caben en la agenda ordinaria. Un integrante experto ayuda a definir su alcance, su agenda y la información que debe recibir.',
    },
    {
      question: '¿Puede Nithios venderle servicios a una empresa en cuya junta participa Jonathan?',
      answer:
        'Cualquier posible conflicto de interés se declara desde el inicio y se maneja según las reglas de gobierno corporativo de cada junta. Lo conversamos con la presidencia antes de aceptar el rol, para que quede claro cómo se procede en cada caso.',
    },
    {
      question: '¿Cómo se maneja la confidencialidad de la información de la junta directiva?',
      answer:
        'Con un acuerdo de confidencialidad firmado antes de recibir cualquier información y con las reglas de manejo que tenga tu junta. El material de las sesiones se usa solo para preparar el aporte al rol, no se comparte con terceros y se gestiona con accesos individuales. Si tu empresa no tiene reglas claras para esto, ayudar a definirlas es parte del aporte.',
    },
  ],

  related: {
    services: ['cto-externo', 'inteligencia-artificial-para-empresas', 'modernizacion-de-sistemas'],
    guides: [
      'que-es-un-cto-externo',
      'como-empezar-con-inteligencia-artificial-en-tu-empresa',
      'transformacion-digital-para-pymes-por-donde-empezar',
    ],
    projects: [],
  },

  cta: {
    title: 'Propón a Jonathan Osorio para tu junta directiva',
    text: 'Cuéntanos por WhatsApp cómo funciona tu junta y qué esperan de un perfil tecnológico. Conversamos con la presidencia y definimos si la postulación tiene sentido.',
  },
  ctaLabel: 'Proponer a Jonathan Osorio para tu junta directiva',
  heroSecondary: { label: 'Conocer a Jonathan Osorio', href: '/jonathan-osorio/' },
  providedByCeo: true,
  whatsappMessage: 'Hola Nithios, quiero proponer a Jonathan Osorio como miembro de la junta directiva de mi empresa.',
  keywords: [
    'miembro de junta directiva experto en tecnología',
    'asesor de junta directiva en tecnología',
    'consejero independiente tecnología',
    'Board Member tecnología',
    'gobierno corporativo de TI',
    'comité de tecnología junta directiva',
    'miembro independiente de junta directiva Colombia',
  ],
  ogAlt: 'Miembro de junta en tecnología, servicio de Nithios: lo que aporta a la junta y el botón Propón a Jonathan para tu junta',
} satisfies ServicePage;
