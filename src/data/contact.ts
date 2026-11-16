/**
 * Contenido de /contacto/ y /preguntas-frecuentes/.
 * REGLA: sin tiempos de respuesta, horarios, correos ni direcciones no confirmados.
 */
import { services } from './services';

export interface ContactStep {
  title: string;
  text: string;
}

export interface ServiceOption {
  value: string;
  label: string;
}

export const contactPage = {
  path: '/contacto/',
  seoTitle: 'Contacto Nithios: consultoría y software en Colombia',
  seoDescription:
    'Escríbele a Nithios por WhatsApp y cuéntanos tu proyecto: consultoría tecnológica o desarrollo de software a medida para empresas en toda Colombia.',
  heroEyebrow: 'Contacto',
  heroTitle: 'Contacta a Nithios por WhatsApp',
  heroTitleHtml: 'Contacta a Nithios <span class="text-gold">por WhatsApp</span>',
  intro:
    'Cuéntanos qué quieres lograr. Una conversación por WhatsApp es el primer paso. Nos cuentas tu reto, entendemos tu contexto y te proponemos el camino más claro: consultoría tecnológica, desarrollo de software a medida o ambos.',
  whatsappMessage: 'Hola Nithios, quiero contarles sobre un proyecto de tecnología para mi empresa.',

  form: {
    title: 'Escríbenos en un minuto',
    intro:
      'Completa estos datos y prepararemos el mensaje por ti. Al enviarlo se abre WhatsApp con todo listo: solo revisas y presionas enviar.',
    submitLabel: 'Continuar en WhatsApp',
    privacyNote:
      'Este formulario no guarda ni envía tus datos a ningún servidor. Solo arma el mensaje en tu navegador; tú decides si lo envías desde WhatsApp.',
    noJsNote:
      'Tu navegador tiene JavaScript desactivado: al enviar, abriremos WhatsApp solo con el texto de tu mensaje. Incluye en él tu nombre y tu empresa.',
    fallbackLabel: 'Abrir WhatsApp directo',
  },

  /** Opciones del campo "servicio de interés" (se derivan de services.ts + opción abierta). */
  serviceOptions: [
    ...services.map((s) => ({ value: s.shortName, label: s.shortName })),
    { value: 'Consultoría y desarrollo', label: 'Ambos: consultoría y desarrollo' },
    { value: 'Aún no lo tengo claro', label: 'Aún no lo tengo claro' },
  ] satisfies ServiceOption[],

  stepsTitle: 'Qué pasa después de escribirnos',
  stepsIntro:
    'Un proceso simple y transparente, pensado para que tomes decisiones con información, no con suposiciones.',
  steps: [
    {
      title: 'Nos escribes por WhatsApp',
      text: 'Nos cuentas en pocas líneas quién eres, qué hace tu empresa y qué quieres mejorar o construir. No necesitas tener todo definido.',
    },
    {
      title: 'Te respondemos y escuchamos',
      text: 'Te contactamos por el mismo chat para entender tu contexto, tus procesos y el resultado que esperas, y coordinamos una conversación más a fondo si hace falta.',
    },
    {
      title: 'Definimos el alcance contigo',
      text: 'Aterrizamos objetivos, prioridades y restricciones. Si conviene consultoría, desarrollo a medida o una combinación, te lo decimos con claridad.',
    },
    {
      title: 'Recibes una propuesta clara',
      text: 'Te presentamos una propuesta con alcance, etapas y valor ajustados a tu caso, para que decidas con toda la información sobre la mesa.',
    },
  ] satisfies ContactStep[],

  coverageTitle: 'Atención remota para empresas de toda Colombia',
  coverageText:
    'Trabajamos de forma remota con organizaciones de cualquier ciudad del país. Reuniones, avances y entregas se coordinan en línea, para que la distancia nunca sea un obstáculo para tu proyecto.',

  /** Bloque pregunta→respuesta citable (GEO). */
  answerTitle: '¿Cómo contacto a Nithios?',
  answer:
    'Puedes contactar a Nithios por WhatsApp en el +57 305 302 7559. Es nuestro canal único de atención por ahora: escríbenos tu nombre, tu empresa y lo que quieres lograr, y te respondemos para coordinar los siguientes pasos. Atendemos de forma remota a empresas en toda Colombia.',

  ctaTitle: 'Tu próximo proyecto empieza con un mensaje.',
  ctaText:
    'Consultoría tecnológica para decidir con claridad y desarrollo de software a medida para ejecutar. Escríbenos y hablemos de tu caso.',
};

export const faqPageContent = {
  path: '/preguntas-frecuentes/',
  seoTitle: 'Preguntas frecuentes sobre consultoría y software',
  seoDescription:
    'Resolvemos tus dudas sobre consultoría tecnológica, desarrollo de software a medida, costos, tiempos y forma de trabajo de Nithios con empresas en Colombia.',
  heroEyebrow: 'Preguntas frecuentes',
  heroTitle: 'Preguntas frecuentes sobre consultoría y desarrollo de software',
  heroTitleHtml: 'Preguntas frecuentes sobre <span class="text-gold">consultoría y desarrollo de software</span>',
  intro:
    'Respuestas claras antes de empezar. Reunimos las preguntas que más nos hacen las empresas colombianas sobre consultoría tecnológica, desarrollo de software a medida, inteligencia artificial y nuestra forma de trabajar.',
  whatsappMessage: 'Hola Nithios, leí sus preguntas frecuentes y tengo una duda sobre mi proyecto.',
  tocLabel: 'Temas',
  ctaTitle: '¿Tu pregunta no está aquí?',
  ctaText:
    'Escríbenos por WhatsApp y te respondemos directamente, pensando en el caso concreto de tu empresa.',
};
