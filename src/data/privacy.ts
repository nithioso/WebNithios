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
  /** Enlaces externos verificados (se muestran como lista al final de la sección). */
  links?: { label: string; href: string }[];
}

export const privacyPolicy = {
  path: '/politica-de-privacidad/',
  seoTitle: 'Política de privacidad y datos personales',
  seoDescription:
    'Cómo Nithios trata tus datos según la Ley 1581 de 2012: analítica de Google solo si la aceptas, contacto por WhatsApp y tus derechos como titular.',
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
    'Solo si lo aceptas, medimos el uso del sitio con Google Analytics (a través de Google Tag Manager). Sin publicidad, y puedes cambiar tu decisión cuando quieras.',
    'El formulario de contacto no envía tu nombre, tu empresa ni tu mensaje a ningún servidor: solo prepara un mensaje que tú decides enviar por WhatsApp.',
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
        'Navegar por este sitio no requiere que entregues datos personales. No hacemos publicidad ni perfiles publicitarios, y la analítica con cookies solo se activa si la aceptas (sección «Cookies y analítica»).',
        'Tratamos únicamente los datos que tú decides compartirnos al escribirnos por WhatsApp, que pueden incluir:',
      ],
      list: [
        'Nombre y, si lo indicas, cargo y empresa.',
        'Ciudad y número de teléfono asociado a tu cuenta de WhatsApp.',
        'El contenido de tus mensajes y la información de tu proyecto que quieras compartir.',
      ],
      after: [
        'El formulario de la página de contacto funciona por completo en tu navegador: compone el texto y abre WhatsApp. No almacena ni transmite tus datos a nuestros servidores; la analítica solo registra que se usó y el servicio elegido (sección «Cookies y analítica»).',
        'Como cualquier sitio web, el servidor de alojamiento puede generar registros técnicos de acceso (por ejemplo, dirección IP, navegador y página solicitada) con fines de seguridad y funcionamiento. No los usamos para identificarte ni para perfilarte.',
      ],
    },
    {
      id: 'cookies',
      title: '4. Cookies y analítica',
      paragraphs: [
        'Usamos Google Analytics, un servicio de Google que cargamos a través de Google Tag Manager, para entender de forma agregada cómo se usa el sitio y mejorarlo. Medimos:',
      ],
      list: [
        'Páginas visitadas, su título y desde dónde llegaste (por ejemplo, un buscador o un enlace).',
        'Datos técnicos de la visita que Google Analytics recoge: tipo de dispositivo, navegador y ubicación aproximada (país o ciudad).',
        'Clics en los botones de WhatsApp (y en qué parte de la página están), clics en enlaces a otros sitios y el envío del formulario de contacto, del que solo registramos el servicio elegido, nunca tu nombre, tu empresa ni tu mensaje.',
      ],
      after: [
        'La base es tu consentimiento. Al entrar, todos los permisos de Google empiezan en «denegado» y no se guardan cookies de analítica. Solo si eliges «Aceptar» en el aviso de cookies, Google Analytics guarda en tu navegador sus propias cookies (como _ga) para distinguir visitas. Los permisos de publicidad y de personalización de anuncios quedan siempre denegados.',
        'Mientras no aceptes, por el funcionamiento del modo de consentimiento de Google, el sitio puede enviar a Google avisos que no usan cookies (por ejemplo, que se cargó una página y el estado de tu consentimiento), que Google usa de forma agregada para estimar el uso del sitio.',
        'Puedes cambiar o retirar tu decisión en cualquier momento con el enlace «Preferencias de cookies», al pie de cada página. Si la retiras, dejamos de usar cookies de analítica y borramos las de Google Analytics de este sitio. Tu decisión se guarda en el almacenamiento local de tu navegador (no es una cookie) para no volver a preguntarte en cada página.',
        'Google trata esta información conforme a sus propias condiciones y políticas, que te recomendamos consultar, y puede almacenarla en servidores ubicados fuera de Colombia:',
      ],
      links: [
        { label: 'Política de privacidad de Google', href: 'https://policies.google.com/privacy?hl=es-419' },
        {
          label: 'De qué manera Google usa la información de sitios o apps que utilizan sus servicios',
          href: 'https://policies.google.com/technologies/partner-sites?hl=es-419',
        },
      ],
    },
    {
      id: 'finalidades',
      title: '5. Para qué usamos tus datos',
      list: [
        'Responder tus mensajes, consultas y solicitudes.',
        'Si aceptas la analítica, medir de forma agregada el uso del sitio para mejorar sus contenidos.',
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
      title: '6. WhatsApp como canal de contacto',
      paragraphs: [
        'Nuestro canal de atención es WhatsApp, un servicio prestado por un tercero. Al usarlo, tus mensajes también son tratados por ese proveedor conforme a sus propias condiciones y políticas de privacidad, que te recomendamos consultar. Ese tratamiento puede implicar el almacenamiento de información en servidores ubicados fuera de Colombia.',
      ],
    },
    {
      id: 'autorizacion',
      title: '7. Autorización',
      paragraphs: [
        'Al escribirnos voluntariamente y compartir tus datos, nos autorizas a tratarlos para las finalidades descritas en esta política. Puedes revocar esa autorización en cualquier momento, salvo cuando exista un deber legal o contractual de conservarlos.',
        'La analítica con cookies se basa en la autorización que das al elegir «Aceptar» en el aviso de cookies; la revocas con «Preferencias de cookies».',
      ],
    },
    {
      id: 'derechos',
      title: '8. Tus derechos como titular',
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
      title: '9. Cómo ejercer tus derechos',
      paragraphs: [
        `Escríbenos por WhatsApp al ${site.whatsapp.display} indicando tu nombre, el derecho que quieres ejercer y los datos a los que se refiere tu solicitud. Podremos pedirte información adicional para verificar tu identidad.`,
        'Atendemos las consultas en un máximo de diez (10) días hábiles y los reclamos en un máximo de quince (15) días hábiles, contados desde su recibo, con las prórrogas previstas en los artículos 14 y 15 de la Ley 1581 de 2012.',
      ],
    },
    {
      id: 'seguridad',
      title: '10. Seguridad y conservación',
      paragraphs: [
        'Aplicamos medidas razonables para proteger tus datos contra acceso no autorizado, pérdida o uso indebido. Conservamos la información solo durante el tiempo necesario para cumplir las finalidades descritas y las obligaciones legales aplicables.',
      ],
    },
    {
      id: 'menores',
      title: '11. Niñas, niños y adolescentes',
      paragraphs: [
        'Nuestros servicios están dirigidos a empresas y profesionales. No recolectamos de forma intencional datos de menores de edad.',
      ],
    },
    {
      id: 'cambios',
      title: '12. Cambios a esta política',
      paragraphs: [
        'Podemos actualizar esta política para reflejar cambios legales o en nuestros servicios. La versión vigente siempre estará publicada en esta página.',
      ],
    },
  ] satisfies PolicySection[],
};

/**
 * Banner de consentimiento (ConsentBanner.astro) y enlace «Preferencias de cookies» del footer.
 * Solo se publica si `site.gtmId` tiene valor. PENDIENTE DE REVISIÓN LEGAL (docs/PENDIENTES.md).
 */
export const cookieBanner = {
  label: 'Aviso de cookies',
  title: 'Tu privacidad, tu decisión',
  text: 'Con tu permiso usamos Google Analytics para saber qué páginas se visitan y mejorar el sitio. Sin publicidad. Puedes cambiar tu decisión cuando quieras.',
  policyLabel: 'Política de privacidad',
  policyHref: '/politica-de-privacidad/#cookies',
  accept: 'Aceptar',
  reject: 'Rechazar',
  /** Enlace permanente del footer para reabrir el banner. */
  preferencesLabel: 'Preferencias de cookies',
  status: {
    granted: 'Decisión actual: aceptaste la analítica.',
    denied: 'Decisión actual: rechazaste la analítica.',
  },
  saved: {
    granted: 'Listo: aceptaste la analítica. Puedes cambiarlo en «Preferencias de cookies», al pie de la página.',
    denied: 'Listo: rechazaste la analítica. Puedes cambiarlo en «Preferencias de cookies», al pie de la página.',
  },
} as const;

