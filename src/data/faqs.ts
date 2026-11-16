/**
 * Preguntas frecuentes de compradores en Colombia.
 * Respuestas directas (primera frase = respuesta citable por motores de IA),
 * honestas y sin precios, plazos ni garantías inventadas.
 */
export type FaqCategory = 'general' | 'consultoria' | 'desarrollo' | 'proceso';

export interface Faq {
  question: string;
  answer: string;
  category: FaqCategory;
}

export const faqCategories: Record<FaqCategory, string> = {
  general: 'Sobre Nithios',
  consultoria: 'Consultoría tecnológica',
  desarrollo: 'Desarrollo de software',
  proceso: 'Cómo trabajamos',
};

export const faqs: Faq[] = [
  {
    category: 'general',
    question: '¿Qué hace Nithios?',
    answer:
      'Nithios es una empresa de tecnología colombiana con dos líneas de servicio: asesoría y consultoría tecnológica para empresas que quieren adoptar tecnología y mejorar sus procesos, y desarrollo de software a medida con nuevas tecnologías, como plataformas web, aplicaciones móviles, sistemas de gestión y soluciones con inteligencia artificial.',
  },
  {
    category: 'general',
    question: '¿En qué ciudades de Colombia trabajan?',
    answer:
      'Atendemos de forma remota a empresas de cualquier ciudad de Colombia, como Bogotá, Medellín, Cali, Barranquilla, Bucaramanga, Cartagena o Pereira, y coordinamos reuniones, avances y entregas en línea.',
  },
  {
    category: 'general',
    question: '¿Con qué tipo de empresas trabajan?',
    answer:
      'Trabajamos con todo tipo de empresas, de cualquier tamaño y sector, que quieran usar la tecnología para mejorar sus procesos. Lo importante no es el tamaño de la organización sino tener un problema de negocio claro que la tecnología pueda resolver.',
  },
  {
    category: 'general',
    question: '¿Quién está detrás de Nithios?',
    answer:
      'Nithios fue fundada y es liderada por Jonathan Osorio, su CEO y Fundador, un alto ejecutivo de tecnología con casi 20 años de experiencia en diferentes sectores y una amplia formación académica.',
  },
  {
    category: 'consultoria',
    question: '¿Qué es una consultoría tecnológica y para qué le sirve a mi empresa?',
    answer:
      'Una consultoría tecnológica es un acompañamiento experto para decidir qué tecnología adoptar, en qué orden y cómo implementarla para mejorar los procesos de tu empresa. Sirve para invertir con dirección: diagnosticar la operación actual, priorizar oportunidades y evitar compras o desarrollos que no resuelven el problema real.',
  },
  {
    category: 'consultoria',
    question: '¿Cómo empiezo la transformación digital de mi empresa?',
    answer:
      'La transformación digital empieza por un diagnóstico de procesos, no por comprar software. Primero se identifica dónde se pierde tiempo, dinero o información; luego se define una hoja de ruta por etapas con objetivos medibles; y finalmente se implementan las soluciones, empezando por las de mayor impacto.',
  },
  {
    category: 'consultoria',
    question: '¿Pueden ayudarnos a usar inteligencia artificial en la empresa?',
    answer:
      'Sí. Te ayudamos a identificar casos de uso de inteligencia artificial que tengan sentido para tu operación, como automatizar tareas repetitivas, analizar información o mejorar la atención, evaluamos su viabilidad y, si conviene, desarrollamos e integramos la solución en tus procesos.',
  },
  {
    category: 'consultoria',
    question: '¿Me conviene un software comercial o un desarrollo a medida?',
    answer:
      'Depende de qué tan particulares sean tus procesos. Si una solución comercial cubre bien tu operación, suele ser la opción más rápida; si te obliga a cambiar tu forma de trabajar o a usar varias herramientas desconectadas, un desarrollo a medida puede ser la mejor inversión. En la consultoría evaluamos ambas alternativas contigo.',
  },
  {
    category: 'desarrollo',
    question: '¿Qué tipo de software desarrollan?',
    answer:
      'Desarrollamos aplicativos a la medida de todo tipo: plataformas y aplicaciones web, aplicaciones móviles para Android e iOS, sistemas de gestión empresarial, portales, integraciones entre sistemas y soluciones con inteligencia artificial. Ejemplos de nuestro trabajo son Dragon Global Trade y Krystal.',
  },
  {
    category: 'desarrollo',
    question: '¿Con qué tecnologías trabajan?',
    answer:
      'Trabajamos con tecnologías modernas y elegimos el stack según cada proyecto. Por ejemplo, Krystal está construida con React, TypeScript, Tailwind CSS, Node.js, Express, Prisma, PostgreSQL, WebRTC y Socket.io, y está preparada para Android e iOS con Capacitor.',
  },
  {
    category: 'desarrollo',
    question: '¿Cómo cuidan la seguridad del software que desarrollan?',
    answer:
      'Incorporamos la seguridad desde el diseño: autenticación segura, control de acceso por roles y permisos, validación y sanitización de datos, limitación de peticiones y cabeceras de seguridad, entre otras buenas prácticas que se definen según los riesgos de cada proyecto.',
  },
  {
    category: 'desarrollo',
    question: '¿Pueden desarrollar una aplicación que funcione en web y en celular?',
    answer:
      'Sí. Podemos construir una aplicación web responsive que se adapte a cualquier pantalla y prepararla para publicarse como aplicación de Android e iOS, compartiendo gran parte del código, como hicimos con Krystal mediante Capacitor.',
  },
  {
    category: 'proceso',
    question: '¿Cuánto cuesta un proyecto con Nithios?',
    answer:
      'El costo depende del alcance, la complejidad y los tiempos de cada proyecto, por eso no manejamos precios genéricos. Escríbenos por WhatsApp, cuéntanos qué necesitas y te preparamos una propuesta con alcance, etapas y valor ajustados a tu caso.',
  },
  {
    category: 'proceso',
    question: '¿Cuánto tiempo tarda desarrollar un software a la medida?',
    answer:
      'El tiempo depende del alcance y de la cantidad de funcionalidades. Trabajamos por entregas incrementales, de modo que puedes ver y validar avances funcionales durante el proyecto en lugar de esperar hasta el final. El cronograma se define en la propuesta.',
  },
  {
    category: 'proceso',
    question: '¿Cómo es el proceso para empezar un proyecto?',
    answer:
      'Empieza con una conversación por WhatsApp en la que nos cuentas tu necesidad. Luego entendemos a fondo tu contexto, definimos el alcance y te presentamos una propuesta. Una vez aprobada, avanzamos por etapas: diseño, desarrollo iterativo con revisiones y lanzamiento acompañado.',
  },
  {
    category: 'proceso',
    question: '¿Cómo puedo contactar a Nithios?',
    answer:
      'Por ahora atendemos por WhatsApp en el +57 305 302 7559. Escríbenos contándonos brevemente tu empresa y lo que quieres lograr, y te respondemos para coordinar los siguientes pasos.',
  },
];

export function faqsByCategory(category: FaqCategory): Faq[] {
  return faqs.filter((f) => f.category === category);
}
