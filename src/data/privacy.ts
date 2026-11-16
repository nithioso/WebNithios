/**
 * Política de privacidad y tratamiento de datos personales (Ley 1581 de 2012, Colombia).
 * PENDIENTE DE REVISIÓN LEGAL (docs/PENDIENTES.md).
 * - `controller.legalName` / `controller.nit` vacíos ⇒ la página no los muestra. NO inventarlos.
 * - `lastUpdated` vacío ⇒ no se muestra fecha. Completar al publicar la versión revisada (formato '16 de noviembre de 2026').
 */
import { site } from './site';

export interface PolicySection {
  id: string;
  title: string;
  paragraphs?: string[];
  list?: string[];
  /** Párrafos que van después de la lista. */
  after?: string[];
}

export const privacyPolicy = {
  path: '/politica-de-privacidad/',
  seoTitle: 'Política de privacidad y datos personales',
  seoDescription:
    'Cómo Nithios trata tus datos personales conforme a la Ley 1581 de 2012: sin cookies ni analítica, contacto solo por WhatsApp y tus derechos como titular.',
  heroEyebrow: 'Legal',
  heroTitle: 'Política de privacidad',
  intro:
    'Tu información es tuya. Esta política explica, en lenguaje claro, qué datos tratamos, para qué y cómo puedes ejercer tus derechos como titular según la ley colombiana.',
  whatsappMessage: 'Hola Nithios, tengo una consulta sobre el tratamiento de mis datos personales.',
  lastUpdated: '',

  controller: {
    /** Razón social exacta (pendiente). */
    legalName: '',
    /** NIT (pendiente). */
    nit: '',
    tradeName: site.name,
    website: site.url,
    whatsapp: site.whatsapp.display,
  },

  summary: [
    'Este sitio no usa cookies, ni herramientas de analítica, ni píxeles de seguimiento.',
    'El formulario de contacto no envía datos a ningún servidor: solo prepara un mensaje que tú decides enviar por WhatsApp.',
    'Usamos tus datos únicamente para responderte y gestionar la relación comercial que solicites.',
    'Nunca vendemos ni cedemos tus datos personales a terceros con fines comerciales.',
  ],

  sections: [
    {
      id: 'responsable',
      title: '1. Responsable del tratamiento',
      paragraphs: [
        `El responsable del tratamiento de los datos personales recogidos a través de ${site.domain} y de nuestros canales de contacto es ${site.name}, empresa de tecnología colombiana. Para cualquier asunto relacionado con tus datos puedes escribirnos por WhatsApp al ${site.whatsapp.display}.`,
      ],
    },
    {
      id: 'marco-legal',
      title: '2. Marco legal',
      paragraphs: [
        'Esta política se rige por la Ley Estatutaria 1581 de 2012 de protección de datos personales, sus decretos reglamentarios (incorporados en el Decreto Único 1074 de 2015) y las demás normas colombianas aplicables.',
      ],
    },
    {
      id: 'datos',
      title: '3. Qué datos tratamos',
      paragraphs: [
        'Navegar por este sitio no requiere que entregues datos personales. No usamos cookies, analítica, publicidad ni seguimiento de ningún tipo.',
        'Tratamos únicamente los datos que tú decides compartirnos al escribirnos por WhatsApp, que pueden incluir:',
      ],
      list: [
        'Nombre y, si lo indicas, cargo y empresa.',
        'Ciudad y número de teléfono asociado a tu cuenta de WhatsApp.',
        'El contenido de tus mensajes y la información de tu proyecto que quieras compartir.',
      ],
      after: [
        'El formulario de la página de contacto funciona por completo en tu navegador: compone el texto y abre WhatsApp. No almacena ni transmite tus datos a nuestros servidores.',
        'Como cualquier sitio web, el servidor de alojamiento puede generar registros técnicos de acceso (por ejemplo, dirección IP, navegador y página solicitada) con fines de seguridad y funcionamiento. No los usamos para identificarte ni para perfilarte.',
      ],
    },
    {
      id: 'finalidades',
      title: '4. Para qué usamos tus datos',
      list: [
        'Responder tus mensajes, consultas y solicitudes.',
        'Entender tu necesidad y preparar propuestas de consultoría tecnológica o desarrollo de software a medida.',
        'Gestionar la relación precontractual y contractual que acuerdes con nosotros.',
        'Atender las consultas y reclamos que presentes sobre tus datos personales.',
        'Cumplir obligaciones legales aplicables.',
      ],
      after: [
        'No usamos tus datos para fines distintos a los informados sin tu autorización previa, y no los vendemos ni los cedemos a terceros con fines comerciales.',
      ],
    },
    {
      id: 'whatsapp',
      title: '5. WhatsApp como canal de contacto',
      paragraphs: [
        'Nuestro canal de atención es WhatsApp, un servicio prestado por un tercero. Al usarlo, tus mensajes también son tratados por ese proveedor conforme a sus propias condiciones y políticas de privacidad, que te recomendamos consultar. Ese tratamiento puede implicar el almacenamiento de información en servidores ubicados fuera de Colombia.',
      ],
    },
    {
      id: 'autorizacion',
      title: '6. Autorización',
      paragraphs: [
        'Al escribirnos voluntariamente y compartir tus datos, nos autorizas a tratarlos para las finalidades descritas en esta política. Puedes revocar esa autorización en cualquier momento, salvo cuando exista un deber legal o contractual de conservarlos.',
      ],
    },
    {
      id: 'derechos',
      title: '7. Tus derechos como titular',
      paragraphs: ['De acuerdo con el artículo 8 de la Ley 1581 de 2012, tienes derecho a:'],
      list: [
        'Conocer, actualizar y rectificar tus datos personales.',
        'Solicitar prueba de la autorización otorgada.',
        'Ser informado sobre el uso que se ha dado a tus datos.',
        'Presentar quejas ante la Superintendencia de Industria y Comercio (SIC) por infracciones a la ley, una vez agotado el trámite de consulta o reclamo ante nosotros.',
        'Revocar la autorización y solicitar la supresión de tus datos cuando no se respeten los principios, derechos y garantías legales.',
        'Acceder de forma gratuita a tus datos personales.',
      ],
    },
    {
      id: 'consultas-reclamos',
      title: '8. Cómo ejercer tus derechos',
      paragraphs: [
        `Escríbenos por WhatsApp al ${site.whatsapp.display} indicando tu nombre, el derecho que quieres ejercer y los datos a los que se refiere tu solicitud. Podremos pedirte información adicional para verificar tu identidad.`,
        'Atendemos las consultas en un máximo de diez (10) días hábiles y los reclamos en un máximo de quince (15) días hábiles, contados desde su recibo, con las prórrogas previstas en los artículos 14 y 15 de la Ley 1581 de 2012.',
      ],
    },
    {
      id: 'seguridad',
      title: '9. Seguridad y conservación',
      paragraphs: [
        'Aplicamos medidas razonables para proteger tus datos contra acceso no autorizado, pérdida o uso indebido. Conservamos la información solo durante el tiempo necesario para cumplir las finalidades descritas y las obligaciones legales aplicables.',
      ],
    },
    {
      id: 'menores',
      title: '10. Niñas, niños y adolescentes',
      paragraphs: [
        'Nuestros servicios están dirigidos a empresas y profesionales. No recolectamos de forma intencional datos de menores de edad.',
      ],
    },
    {
      id: 'cambios',
      title: '11. Cambios a esta política',
      paragraphs: [
        'Podemos actualizar esta política para reflejar cambios legales o en nuestros servicios. La versión vigente siempre estará publicada en esta página.',
      ],
    },
  ] satisfies PolicySection[],
};
