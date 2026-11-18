/**
 * /servicios/modernizacion-de-sistemas/ — modernización de software heredado (legacy) y migraciones.
 * Contrato: docs/CONTENIDO.md. Sin cifras, precios, plazos, clientes ni resultados inventados.
 */
import type { ServicePage } from './types';

export default {
  slug: 'modernizacion-de-sistemas',
  parent: 'ambas',
  order: 3,
  name: 'Modernización de sistemas',
  icon: 'layers',
  eyebrow: 'Modernización · Consultoría + desarrollo',
  h1: 'Modernización de sistemas legacy y migraciones sin frenar tu operación',
  h1Highlight: 'sin frenar tu operación',
  summary:
    'Renovamos software heredado por etapas: diagnosticamos el sistema, decidimos qué conservar, qué reconstruir y qué reemplazar, y migramos datos e integraciones cuidando la continuidad de tu empresa.',
  seoTitle: 'Modernización de sistemas legacy en Colombia',
  seoDescription:
    'Modernización de sistemas legacy en Colombia: renovamos y migramos software heredado por etapas, sin frenar tu operación y protegiendo tus datos. Hablemos.',
  ogDescription: 'Renueva tu software heredado por etapas, migra tus datos y conecta tus sistemas sin frenar la operación.',
  ogTagline: 'Renueva tu software sin frenar la operación',
  intro:
    'La modernización de sistemas lleva un software heredado (legacy) a una base segura y mantenible, renovándolo por partes, migrándolo o reemplazándolo. En Nithios la hacemos de forma remota para empresas de toda Colombia, por etapas y sin frenar la operación.',

  sections: {
    whatIs: {
      title: '¿Qué es la modernización de sistemas legacy?',
      answer:
        'Modernizar un sistema legacy es transformar un software que ya cumple una función crítica, pero se volvió costoso, riesgoso o lento de cambiar, en uno que tu empresa pueda mantener y hacer crecer, conservando las reglas de negocio y los datos que valen.',
      paragraphs: [
        'Un sistema no es legacy por su edad, sino por su situación: nadie lo entiende del todo, cada cambio da miedo, depende de una persona o de un proveedor que ya no está, corre en tecnología sin soporte o no se puede conectar con nada. Muchas veces, además, ese sistema guarda años de conocimiento del negocio que no está escrito en ningún otro lugar.',
        'Por eso modernizar no siempre significa reescribir desde cero. Hay varios caminos posibles: mover el sistema a una infraestructura actual, exponer sus datos mediante una API (una interfaz para que otros programas se conecten) para integrarlo, reemplazar módulos uno a uno, cambiar parte de la funcionalidad por un software comercial o, cuando de verdad se justifica, construir uno nuevo. Elegir bien entre esas opciones es la mitad del trabajo.',
        'La otra mitad es ejecutar sin interrumpir la operación. Una migración bien hecha avanza por etapas verificables, convive un tiempo con el sistema anterior, migra los datos con pruebas de cuadre y tiene un plan para volver atrás si algo falla. El objetivo no es estrenar tecnología, sino recuperar la capacidad de cambiar el software al ritmo que pide el negocio.',
      ],
    },

    audience: {
      title: '¿Para qué empresas es la modernización de sistemas?',
      intro: 'Suele encajar cuando el software que sostiene la operación se volvió un freno, pero apagarlo no es una opción.',
      items: [
        'Empresas que operan sobre un sistema hecho a medida hace tiempo, que funciona, pero que nadie se atreve a modificar.',
        'Organizaciones cuyo proveedor original desapareció, dejó de dar soporte o es la única persona que entiende el código.',
        'Áreas que sostienen procesos críticos en hojas de cálculo complejas, macros o bases de datos de escritorio que ya no dan abasto.',
        'Compañías con un software instalado en un servidor propio que quieren pasarlo a la nube o volverlo accesible desde cualquier lugar.',
        'Empresas que necesitan conectar un sistema antiguo con herramientas nuevas, como comercio electrónico, apps móviles o inteligencia artificial.',
        'Gerencias que deben decidir si renovar, reemplazar o integrar un sistema y quieren un análisis independiente antes de invertir.',
      ],
    },

    problems: {
      title: 'Problemas que resuelve la modernización de sistemas',
      intro: 'El costo de un sistema heredado rara vez aparece en una factura: aparece en lo que la empresa deja de poder hacer.',
      items: [
        {
          icon: 'users',
          title: 'Conocimiento en una sola cabeza',
          text: 'Solo una persona, interna o externa, sabe cómo funciona el sistema. Si se va o se enferma, la empresa queda expuesta, y cada cambio depende de su disponibilidad y de sus condiciones.',
        },
        {
          icon: 'clock',
          title: 'Cambios lentos y riesgosos',
          text: 'Un ajuste que parece sencillo toma semanas y rompe otra cosa. Sin pruebas ni documentación, el equipo prefiere no tocar nada y el negocio termina adaptándose al software, en lugar de lo contrario.',
        },
        {
          icon: 'shield',
          title: 'Tecnología sin soporte',
          text: 'Lenguajes, sistemas operativos o bases de datos que ya no reciben actualizaciones de seguridad. El sistema sigue funcionando, pero acumula vulnerabilidades que nadie está corrigiendo y que son difíciles de auditar.',
        },
        {
          icon: 'plug',
          title: 'Islas que no se integran',
          text: 'El sistema no tiene forma de hablar con otras herramientas. La información se copia a mano entre plataformas, se duplica, se desactualiza y nadie sabe cuál es la versión correcta de un dato.',
        },
        {
          icon: 'database',
          title: 'Datos atrapados',
          text: 'La información histórica de la empresa vive en formatos cerrados o en tablas que solo entiende el sistema. Sacar un informe nuevo o analizar tendencias se vuelve un proyecto en sí mismo.',
        },
        {
          icon: 'globe',
          title: 'Acceso limitado',
          text: 'El software solo funciona en un computador de la oficina, por escritorio remoto o en un navegador antiguo. El trabajo remoto, la operación en campo y el uso desde el celular quedan por fuera.',
        },
      ],
    },

    includes: {
      title: '¿Qué incluye la modernización de sistemas?',
      intro: 'Cubrimos desde la decisión de qué hacer con el sistema hasta la migración y la puesta en marcha de la nueva versión.',
      items: [
        {
          icon: 'search',
          title: 'Diagnóstico del sistema actual',
          text: 'Entendemos qué hace realmente el sistema, quién lo usa, con qué se conecta, dónde están los datos y qué riesgos tiene hoy. Es la base para decidir sin adivinar.',
          points: [
            'Inventario de funciones y reglas de negocio',
            'Mapa de datos e integraciones',
            'Riesgos de seguridad y continuidad',
            'Partes que conviene conservar',
          ],
        },
        {
          icon: 'route',
          title: 'Estrategia de modernización',
          text: 'Comparamos los caminos posibles, desde mantener e integrar hasta reemplazar o reconstruir, con criterios explícitos de riesgo, costo y beneficio para tu caso.',
        },
        {
          icon: 'code',
          title: 'Renovación por etapas',
          text: 'Reconstruimos el sistema módulo a módulo para que el nuevo vaya asumiendo funciones mientras el anterior sigue operando, en lugar de un gran cambio de un solo día.',
        },
        {
          icon: 'database',
          title: 'Migración de datos',
          text: 'Limpiamos, transformamos y trasladamos la información con pruebas de cuadre entre el sistema anterior y el nuevo, para que nada se pierda ni cambie de significado en el camino.',
        },
        {
          icon: 'plug',
          title: 'Integraciones y APIs',
          text: 'Abrimos el sistema, nuevo o heredado, para que se conecte con tus otras herramientas de forma segura y documentada, y deje de depender de copiar y pegar.',
        },
        {
          icon: 'browser',
          title: 'Nueva experiencia de uso',
          text: 'Rediseñamos las pantallas pensando en cómo trabaja tu equipo hoy: acceso desde el navegador o el celular, menos pasos y la información que cada rol necesita a la vista.',
        },
      ],
    },

    process: {
      title: '¿Cómo modernizamos un sistema sin detener tu operación?',
      intro: 'Primero entendemos lo que existe; después cambiamos lo justo, en pasos que se pueden verificar y revertir.',
      items: [
        {
          title: 'Conversación inicial',
          text: 'Nos cuentas por WhatsApp o en una llamada qué sistema tienen, qué problemas les causa y qué tan crítico es para la operación. Con eso evaluamos si conviene un diagnóstico formal.',
        },
        {
          title: 'Diagnóstico y levantamiento',
          text: 'Revisamos el código, la base de datos, la infraestructura y las integraciones, y hablamos con quienes usan el sistema a diario. Documentamos lo que hace, incluidas las reglas que nadie había escrito.',
        },
        {
          title: 'Decisión y plan por etapas',
          text: 'Presentamos las alternativas con sus riesgos y te recomendamos una. Si decides avanzar, la dividimos en etapas con alcance, criterios de aceptación y un plan de reversión para cada una.',
        },
        {
          title: 'Ejecución y convivencia',
          text: 'Construimos y migramos etapa por etapa. Durante un tiempo el sistema nuevo y el anterior conviven, y comparamos resultados hasta confirmar que la parte modernizada se comporta como debe.',
        },
        {
          title: 'Salida del sistema anterior',
          text: 'Cuando cada función ya opera en la nueva versión, retiramos la anterior de forma ordenada, conservamos el histórico necesario y dejamos documentación para que tu equipo o cualquier proveedor pueda mantenerla.',
        },
      ],
    },

    deliverables: {
      title: '¿Qué entregables recibes?',
      intro: 'La modernización deja software funcionando y también el conocimiento que antes no estaba escrito.',
      items: [
        { title: 'Informe de diagnóstico', text: 'Qué hace el sistema, en qué estado está, qué riesgos tiene y qué partes vale la pena conservar, explicado en lenguaje de negocio.' },
        { title: 'Documento de estrategia', text: 'Alternativas evaluadas, la recomendada y su porqué, con el plan dividido en etapas y sus criterios de aceptación.' },
        { title: 'Inventario de reglas de negocio', text: 'Las reglas que el sistema aplicaba en silencio, descritas por escrito para que no se pierdan en la migración.' },
        { title: 'Software modernizado', text: 'El código fuente de cada etapa, versionado y desplegado, con su configuración y las instrucciones para ponerlo en marcha.' },
        { title: 'Datos migrados y verificados', text: 'La información trasladada al sistema nuevo junto con los scripts de migración y las pruebas de cuadre que respaldan su integridad.' },
        { title: 'Documentación técnica y de operación', text: 'Arquitectura, integraciones, respaldos y procedimientos básicos, para que el sistema no vuelva a depender de una sola persona.' },
      ],
    },

    signals: {
      title: 'Señales de que tu sistema necesita modernizarse',
      intro: 'Si varias de estas frases se escuchan en tu empresa, el sistema ya está cobrando más de lo que parece.',
      items: [
        'Eso no lo toquen, que el sistema se cae.',
        'El único que sabe cómo funciona es el ingeniero que lo hizo, y ya casi no responde.',
        'Para sacar ese informe toca exportar a Excel y cruzar tres archivos a mano.',
        'Solo se puede usar desde el computador de la oficina.',
        'Queremos vender en línea o tener una app, pero el sistema no se deja conectar.',
        'Nos dijeron que hay que hacerlo todo de nuevo, pero no sabemos si es cierto.',
      ],
    },

    notAFit: {
      title: '¿Cuándo NO te conviene modernizar tu sistema?',
      intro: 'Modernizar es una inversión seria. Hay casos en los que otra decisión te sirve más.',
      items: [
        {
          title: 'Si el sistema funciona y no frena nada',
          text: 'Que un software sea antiguo no basta. Si es estable, seguro, tiene quién lo mantenga y no limita el negocio, lo sensato es cuidarlo y revisar sus riesgos, no reemplazarlo.',
        },
        {
          title: 'Si ya existe un software comercial que cubre tu proceso',
          text: 'Cuando el proceso es estándar, como la contabilidad o la nómina, migrar a un producto comercial suele ser mejor que reconstruir. Te ayudamos a elegirlo y a migrar los datos desde la consultoría tecnológica.',
        },
        {
          title: 'Si el proceso de negocio todavía no está claro',
          text: 'Modernizar un proceso desordenado solo produce un desorden más moderno. Primero conviene definir cómo debe funcionar la operación; para eso sirve un diagnóstico o un CTO externo.',
        },
        {
          title: 'Si esperas cambiarlo todo en un solo paso',
          text: 'Los reemplazos totales de un día para otro concentran el riesgo. Si la empresa no puede convivir un tiempo con dos sistemas, conviene replantear el alcance antes de empezar.',
        },
      ],
    },

    technologies: {
      title: 'Tecnologías y técnicas de referencia',
      intro: 'Elegimos tecnologías probadas y fáciles de mantener, para que la versión moderna no se convierta en el próximo sistema legacy.',
      items: [
        'Migración por etapas',
        'API REST',
        'Arquitectura en la nube',
        'PostgreSQL',
        'Node.js',
        'TypeScript',
        'React',
        'Pruebas automatizadas',
        'DevOps',
      ],
      note: 'La tecnología de destino se decide según tu equipo, tu proveedor y quién mantendrá el sistema; si tu empresa ya tiene un estándar, lo respetamos.',
    },
  },

  faqs: [
    {
      question: '¿Qué es un sistema legacy?',
      answer:
        'Un sistema legacy o heredado es un software que sigue cumpliendo una función importante, pero que se volvió difícil o riesgoso de mantener: tecnología sin soporte, poca documentación, dependencia de una persona o imposibilidad de integrarse. No lo define la edad, sino cuánto le cuesta a la empresa cambiarlo o confiar en él.',
    },
    {
      question: '¿Es mejor reescribir el sistema desde cero o modernizarlo por partes?',
      answer:
        'En la mayoría de los casos conviene avanzar por partes, porque reduce el riesgo y permite verificar cada paso. Reescribir desde cero tiene sentido cuando el sistema es pequeño, la tecnología no tiene salida o las reglas de negocio cambiaron tanto que conservar lo anterior no aporta. La decisión debe salir de un diagnóstico, no de una preferencia.',
    },
    {
      question: '¿Mi operación se detiene durante la migración?',
      answer:
        'No debería. Una modernización bien planeada hace que el sistema nuevo y el anterior convivan mientras se valida cada etapa, y deja para el final una ventana corta y programada para el cambio definitivo de cada función. Siempre se prepara un plan para volver a la versión anterior si algo no se comporta como se esperaba.',
    },
    {
      question: '¿Qué pasa con los datos históricos al modernizar un sistema?',
      answer:
        'Se conservan los que tienen valor para el negocio o que la empresa debe guardar. Antes de migrar se define qué información pasa al sistema nuevo, cuál se archiva consultable y cuál se depura; luego se traslada con pruebas de cuadre que comparan registros y totales entre ambos sistemas, de modo que puedas confiar en lo migrado.',
    },
    {
      question: '¿Pueden modernizar un sistema si no tenemos el código fuente ni documentación?',
      answer:
        'Depende de qué tan accesible sea lo que existe. Si hay acceso a la base de datos y al sistema en funcionamiento, se puede reconstruir su comportamiento observando cómo se usa, revisando los datos y documentando las reglas con quienes lo operan. El diagnóstico inicial te dice con honestidad qué es viable y qué riesgos implica.',
    },
    {
      question: '¿Cuánto tiempo toma modernizar un sistema?',
      answer:
        'Depende del tamaño del sistema, la calidad de sus datos, el número de integraciones y la estrategia elegida, por eso no damos un plazo antes del diagnóstico. Lo que sí hacemos es dividir el trabajo en etapas con entregables propios, de modo que tu empresa empiece a ver resultados sin esperar a que todo el proyecto termine.',
    },
  ],

  related: {
    services: ['cto-externo', 'desarrollo-de-plataformas-web', 'automatizacion-de-procesos'],
    guides: [
      'software-a-medida-vs-software-empaquetado',
      'transformacion-digital-para-pymes-por-donde-empezar',
      'cuanto-cuesta-desarrollar-software-a-medida-en-colombia',
    ],
    projects: [],
  },

  cta: {
    title: '¿Tu sistema actual ya no da más?',
    text: 'Cuéntanos por WhatsApp qué sistema tienen y qué les está frenando. Te ayudamos a saber si conviene modernizarlo, integrarlo o dejarlo como está.',
  },
  whatsappMessage: 'Hola Nithios, tenemos un sistema antiguo y queremos saber si conviene modernizarlo.',
  keywords: [
    'modernización de sistemas',
    'modernización de sistemas legacy',
    'migración de software',
    'modernizar software heredado',
    'migración de sistemas Colombia',
    'reemplazo de sistema antiguo',
    'migración a la nube',
  ],
} satisfies ServicePage;
