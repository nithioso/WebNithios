# Analítica: Google Tag Manager + GA4 con Consent Mode v2

Contenedor: **`GTM-TQBGPNW3`** (`src/data/site.ts › gtmId`). Vacío ⇒ no se carga nada, no hay banner ni enlace «Preferencias de cookies».
Fuentes oficiales consultadas (nov 2026): instalación de Tag Manager (support.google.com/tagmanager/answer/14847097),
modo de consentimiento (developers.google.com/tag-platform/security/guides/consent), CSP de Tag Manager
(developers.google.com/tag-platform/security/guides/csp) y SPA con GTM (developers.google.com/analytics/devguides/collection/ga4/measure-spa-gtm).

## Arquitectura
| Pieza | Qué hace |
|---|---|
| `src/scripts/analytics.ts` | Módulo externo importado desde un `<script>` de `BaseLayout` (sin `<script>` en línea: la CSP no cambia de hash). Se evalúa **una vez por documento** (ClientRouter no lo reejecuta; además hay guarda `window.__nithiosAnalytics`). |
| `src/components/ConsentBanner.astro` | Banner propio (region no modal, `transition:persist`), textos en `src/data/privacy.ts › cookieBanner`. |
| Footer | Enlace permanente «Preferencias de cookies» (`[data-consent-open]`): con JS reabre el banner; sin JS lleva a `/politica-de-privacidad/#cookies`. |
| `public/.htaccess` | CSP ampliada con los dominios de Google (tabla abajo). |
| `scripts/verify-analytics.mjs` | `npm run verify:analytics` (ver «Verificación»). |

**Orden en `window.dataLayer`** (lo comprueba `verify:analytics` ejecutando el módulo publicado):
1. `gtag('consent','default',{ad_storage, ad_user_data, ad_personalization, analytics_storage: 'denied', wait_for_update: 500})` + `gtag('set','ads_data_redaction',true)`.
2. Si hay decisión guardada (`localStorage['nithios-consent']` = `{v:1, analytics:'granted'|'denied', ts}`, leído con try/catch): `gtag('consent','update', …)`.
3. `{ 'gtm.start', event: 'gtm.js' }` (lo mismo que empuja el snippet oficial).
4. `page_view` de la carga inicial.
5. **Después** de `load` + `requestIdleCallback` (máx. 3 s) se inyecta `https://www.googletagmanager.com/gtm.js?id=GTM-TQBGPNW3` (async). No compite con el LCP.

**Consentimiento:** «Aceptar» ⇒ `analytics_storage: 'granted'`. Los tres parámetros publicitarios (`ad_storage`, `ad_user_data`,
`ad_personalization`) quedan **siempre `denied`**: el sitio no hace publicidad. «Rechazar» (o retirar desde el footer) ⇒ `denied` y se
borran las cookies `_ga`, `_ga_<ID>` del dominio. El módulo empuja además `{event:'consent_update', consent_analytics}`.
Es Consent Mode **avanzado**: GTM carga siempre y, sin consentimiento, GA4 envía avisos sin cookies (`gcs=G100`); la política de privacidad
lo explica. Si prefieres el modo **básico** (nada antes de aceptar), en cada etiqueta de GA de GTM: Configuración avanzada → Configuración de
consentimiento → «Requerir consentimiento adicional para que se active la etiqueta» → `analytics_storage`, y ajusta la sección 4 de la política.

**Dónde NO se carga:** cualquier host distinto de `nithios.com` / `www.nithios.com` (`site.analyticsHosts`): localhost, `npm run preview`,
la vista previa de GitHub Pages… Allí no existe `dataLayer` ni se pide gtm.js. En `npm run dev` el banner se muestra (para diseñarlo) pero no se mide.

## Eventos del dataLayer
| Evento | Cuándo | Parámetros |
|---|---|---|
| `page_view` | Carga inicial y cada navegación del ClientRouter (`astro:page-load` tras `astro:after-swap`; nunca dos veces la carga inicial; atrás/adelante cuenta) | `page_location` (URL absoluta), `page_path`, `page_title` |
| `whatsapp_click` | Clic (o clic central) en cualquier enlace a `https://wa.me/573053027559…`, incluido el que abre el formulario | `page_path`, `link_location` |
| `outbound_click` | Clic en enlace `http(s)` a otro dominio que NO sea WhatsApp (p. ej. LinkedIn, Chelato Toons) | `page_path`, `link_url` (sin query), `link_domain`, `link_location` |
| `contact_form_submit` | Envío VÁLIDO del formulario de `/contacto/` (evento `nithios:contact-form-submit` de `ContactForm`) | `page_path`, `form_id` (`contact-form`), `service` (servicio elegido o `(sin especificar)`). Nunca nombre, empresa ni mensaje. |
| `consent_update` | Al aceptar o rechazar en el banner | `consent_analytics` (`granted`/`denied`) |

`link_location` sale de `data-wa-location` (prop `location` de `WhatsAppButton`): `header`, `menu-movil`, `hero`, `cta-band`, `footer`,
`footer-telefono`, `fab`, `formulario` (envío y enlace «Abre WhatsApp aquí»), `formulario-respaldo`, `contacto-canal`. Sin atributo se usa el
`id` de la `<section>` contenedora (p. ej. `perfil`, `hablemos`) o el landmark (`header`/`footer`/`contenido`).
Un envío del formulario produce `contact_form_submit` **y** `whatsapp_click` (`link_location=formulario`).

## CSP (`public/.htaccess`)
Variante oficial «GA4 sin funciones de Ads» + «modo de vista previa». Sin nonce ni `'unsafe-inline'`/`'unsafe-eval'` en `script-src`
porque el contenedor lo inyecta un módulo propio.
| Directiva | Dominio añadido | Por qué |
|---|---|---|
| `script-src` | `https://www.googletagmanager.com` | gtm.js (y gtag/js si una etiqueta lo pide) |
| `script-src` | `https://tagmanager.google.com` | Vista previa / Tag Assistant |
| `img-src` | `https://www.googletagmanager.com`, `https://*.google-analytics.com` | píxeles de GTM y de GA4 |
| `img-src` | `https://ssl.gstatic.com`, `https://www.gstatic.com` | Vista previa |
| `connect-src` | `https://www.googletagmanager.com`, `https://*.google-analytics.com` (`region1.google-analytics.com/g/collect`…), `https://*.google.com` (`www.google.com/g/collect`, `analytics.google.com`) | envío de hits de GA4 (verificado: GA4 usa `www.google.com/g/collect`) |
| `style-src` | `https://www.googletagmanager.com`, `https://tagmanager.google.com`, `https://fonts.googleapis.com` | insignia de la vista previa |
| `font-src` | `https://fonts.gstatic.com` | Vista previa |

No se añadieron `*.g.doubleclick.net`, `pagead2.googlesyndication.com`, `google.<TLD>` regionales (p. ej. `www.google.com.co`) ni `frame-src`:
solo hacen falta con funciones de Ads / Google Signals, que están desactivados. Si algún día se activan, hay que añadirlos uno por uno.
**Por diseño NO funcionan:** etiquetas «HTML personalizado» (scripts en línea) y variables «JavaScript personalizado» (necesitan
`'unsafe-eval'`). Usa plantillas de la Galería de plantillas de la comunidad o etiquetas nativas. Cualquier etiqueta de otro proveedor exige
ampliar la CSP a propósito (y actualizar la política de privacidad).

## Configuración paso a paso (el usuario, en las interfaces de Google)
**Estado detectado (20 nov 2026, descargando el gtm.js publicado):** el contenedor ya trae la configuración de Google Analytics para el ID de
medición **`G-JF8YP2TR0V`** que se activa en todas las páginas, con Medición mejorada (vistas de página por historial, clics salientes,
formularios, desplazamiento, búsqueda en el sitio, video, descargas) y **recopilación automática de datos proporcionados por el usuario**
(correo/teléfono/dirección). Confirma que ese ID es tu propiedad y aplica los pasos de abajo para no duplicar ni recoger datos de más.

### A. Google Analytics 4 (analytics.google.com → Administrar)
1. **Propiedad y flujo.** Si `G-JF8YP2TR0V` es tuya: Administrar → Recopilación y modificación de datos → Flujos de datos → el flujo web de
   `https://nithios.com`. Si no existe: Administrar → Crear → Propiedad (zona horaria Colombia, moneda COP) → flujo **Web** `https://nithios.com`
   → copia el **ID de medición `G-…`** y úsalo en todos los pasos de GTM.
2. **Medición mejorada** (en el flujo → ícono ⚙):
   - Vistas de página → «Mostrar configuración avanzada» → **desmarca «Cambios de página basados en eventos del historial del navegador»**
     (el `page_view` lo envía el sitio; si no, cada navegación cuenta doble).
   - **Desactiva «Clics salientes»** (los cubren `whatsapp_click` y `outbound_click`) e **«Interacciones con formularios»** (lo cubre
     `contact_form_submit`). Desplazamientos y descargas pueden quedar activos. Guarda.
3. **Recopilación de datos proporcionados por el usuario** (Administrar → Recopilación de datos): **desactívala**. El sitio no hace publicidad,
   `ad_user_data` siempre va en `denied` y la política no la contempla. **Google Signals**: déjalo desactivado.
4. **Retención de datos** (Administrar → Recopilación de datos → Retención): elige 2 o 14 meses (decisión tuya; anótala en la política si cambias).
5. **Dimensiones personalizadas** (Administrar → Definiciones personalizadas → Crear dimensiones personalizadas, alcance **Evento**):
   `link_location` («Ubicación del enlace»), `service` («Servicio del formulario»). (`link_url` y `link_domain` ya existen como dimensiones predefinidas.)
6. **Evento clave (conversión):** Administrar → Visualización de datos → Eventos clave → **Nuevo evento clave** → `whatsapp_click`
   (y, si quieres, `contact_form_submit`). También puedes marcarlo con la estrella en Administrar → Eventos cuando ya aparezca.

### B. Google Tag Manager (tagmanager.google.com → contenedor `GTM-TQBGPNW3`)
1. **Variables integradas:** Variables → Configurar → activa *Page URL*, *Page Path*, *Page Hostname*, *Event*.
2. **Variables de capa de datos** (Variables → Nueva → Configuración de la variable → **Variable de capa de datos**, versión 2), una por fila:
   `DLV - page_location` → `page_location` · `DLV - page_title` → `page_title` · `DLV - page_path` → `page_path` ·
   `DLV - link_location` → `link_location` · `DLV - link_url` → `link_url` · `DLV - link_domain` → `link_domain` · `DLV - service` → `service`.
3. **Activadores** (Activadores → Nuevo → **Evento personalizado**, «Todos los eventos personalizados»):
   `CE - page_view` (nombre del evento `page_view`) · `CE - whatsapp_click` · `CE - outbound_click` · `CE - contact_form_submit`.
   Usa además el integrado **Initialization - All Pages** («Inicialización: todas las páginas»). No uses «Cambio de historial».
4. **Etiqueta de Google** (Etiquetas): abre la etiqueta de Google existente con `G-JF8YP2TR0V`; si no hay ninguna, Nueva → **Etiqueta de Google**
   → ID de la etiqueta `G-…`. En «Configuración» añade el parámetro **`send_page_view` = `false`** (evita el page_view automático; lo envía la
   etiqueta del paso 5). Activador: **Initialization - All Pages**. Consentimiento: «No se requiere consentimiento adicional» (Consent Mode
   ya gobierna `analytics_storage`).
5. **Etiquetas de evento** (Nueva → **Google Analytics: evento de GA4**, ID de medición `G-…`):
   | Etiqueta | Nombre del evento | Parámetros del evento | Activador |
   |---|---|---|---|
   | `GA4 - page_view` | `page_view` | `page_location` = `{{DLV - page_location}}`, `page_title` = `{{DLV - page_title}}` | `CE - page_view` |
   | `GA4 - whatsapp_click` | `whatsapp_click` | `link_location` = `{{DLV - link_location}}` | `CE - whatsapp_click` |
   | `GA4 - outbound_click` | `outbound_click` | `link_url`, `link_domain`, `link_location` (sus DLV) | `CE - outbound_click` |
   | `GA4 - contact_form_submit` | `contact_form_submit` | `service` = `{{DLV - service}}` | `CE - contact_form_submit` |
   No crees etiquetas «HTML personalizado» ni variables «JavaScript personalizado» (la CSP las bloquea).
6. **Vista previa / depuración:** botón **Vista previa** → URL `https://nithios.com/` → Conectar. Comprueba en Tag Assistant:
   `Consent` con todo en *Denied* al inicio; tras **Aceptar**, `analytics_storage: Granted`; un `page_view` por página al navegar
   (Servicios → Portafolio → atrás); `whatsapp_click` al pulsar el botón dorado con `link_location`; ninguna etiqueta duplicada.
   En GA4: Administrar → **DebugView** (la vista previa activa el modo depuración) e Informes → **Tiempo real**.
   La vista previa solo funciona en nithios.com (en otros hosts el sitio no carga GTM a propósito).
7. **Publicar:** **Enviar** → nombre de versión (p. ej. «Consent Mode v2 + eventos del sitio») → **Publicar**.
   Vuelve a GA4 a las 24–48 h para marcar eventos clave que aún no aparecían.

## Verificación
- `npm run verify:analytics` (tras el build): módulo presente en todas las páginas, banner y enlace en todas, sin snippet en línea ni
  `<noscript>`; EJECUTA el módulo publicado con un DOM simulado y comprueba el orden (consent default → [update] → gtm.js → page_view →
  inyección tras `load`), el ID, que no carga en localhost/vistas previas, la CSP y que no queden frases «sin cookies/analítica».
- Pruebas manuales/Playwright realizadas (nov 2026): banner, aceptar/rechazar persistentes, borrado de `_ga`, `page_view` por navegación,
  `whatsapp_click`/`outbound_click`/`contact_form_submit`, foco y teclado, 0 violaciones de CSP y 0 errores de consola con el contenedor real.
- Rendimiento: gtm.js pesa ~180 KB transferidos y se carga tras `load`; Lighthouse móvil de la home 98–99 antes y 99 después (TBT 0 → ~100 ms, LCP y CLS sin cambio).
