# Pendientes (datos reales que faltan — NO inventar)

## Jonathan Osorio (`src/data/ceo.ts`)
**Estado (nov 2026):** hoja de vida integrada desde el PDF del usuario, SIN fechas y con EMPLEADORES ANONIMIZADOS (regla del usuario: nunca nombrar empleadores ni sus marcas en `src/` ni `public/`; sí se nombran instituciones de formación y certificadoras). No publicar correo ni teléfono personal. Si en el futuro se autorizan fechas: añadirlas a `ExperienceItem` y `hasCredential`. Los ítems de abajo sobre aportar el LinkedIn/cargos quedan resueltos; sigue pendiente la cita aprobada (`ceo.quote`).

Ya publicado (fuente: vista pública de https://www.linkedin.com/in/jonathan-osorio-correa): nombre completo Jonathan Osorio Correa,
ubicación Medellín (Antioquia), titular «CTO/CIO y consultor en Estrategia TI», idiomas español e inglés (sin nivel), Universidad Pontificia
Bolivariana 2022 – actualidad (sin programa) y 6 certificaciones (SMAC, SPOAC, SFC, NoSQL, ChatGPT Empresarial, Data Cabling System). Experiencia: «casi 20 años» (indicación del usuario).
- [ ] **El usuario debe aportar el PDF o el texto completo de su LinkedIn** (la vista pública no muestra cargos, empresas ni títulos): con eso se llenan
  `experience`, `sectors`, el `degree` de la UPB y cualquier otro estudio.

La página `/jonathan-osorio/` oculta cada bloque mientras su campo esté vacío. Formato exacto de cada entrada:
- [x] **Foto profesional** (publicada nov 2026: `src/assets/ceo/jonathan-osorio-ceo-nithios.jpg`, retrato B/N recortado a 4:5) (vertical 4:5, mín. 1040×1300 px, fondo oscuro ideal). Guardar en `src/assets/ceo/jonathan-osorio-ceo-nithios.jpg` y en `ceo.ts`:
  `import photo from '@/assets/ceo/jonathan-osorio-ceo-nithios.jpg';` → `photo: photo,`. `CeoPortrait.astro` reemplaza solo el monograma «JO» por la foto optimizada y `person(await ceoPhotoUrl())` (BaseLayout) añade al JSON-LD la versión optimizada 1200 px JPEG, nunca el original.
- [ ] **Trayectoria** (`experience`, más reciente primero):
  `{ role: 'Cargo', organization: 'Empresa', period: '2018 – 2024', sector: 'Sector (opcional)', description: 'Qué lideró (opcional)', achievements: ['Logro verificable (opcional)'] }`
- [ ] **Sectores** (`sectors`): `['Banca', 'Retail', …]` — solo sectores reales en los que trabajó.
- [ ] **Título/programa en la UPB** y otros estudios (`education`): `{ degree: 'Título', institution: 'Universidad', period: '2005 – 2010 (opcional)', description: 'opcional' }` → `alumniOf` en JSON-LD. Hoy la UPB va sin `degree`.
- [x] **Certificaciones** (`certifications`): `{ name, issuer, date: 'Enero de 2018', isoDate: '2018-01' }` → `hasCredential` en JSON-LD. Agregar las que falten con el PDF.
- [ ] **Logros verificables** (`achievements`): `['Frase corta y comprobable']`.
- [ ] **Cita aprobada por él** (`quote`): texto literal; se muestra atribuida a Jonathan. Hoy solo hay una frase de postura atribuida a Nithios (`ceoPage.vision.statement`).
- [ ] **Validar áreas de especialidad de Jonathan** (hoy `focusAreas` solo lista lo derivado de las líneas de servicio; antes figuraban
  arquitectura de software, ciberseguridad y dirección de equipos, retiradas por no estar confirmadas).
- [ ] **Nacionalidad** (solo si se quiere publicar): añadir campo en `ceo.ts` y `nationality` en `person()`.
- [ ] **Rol de Jonathan en cada proyecto** (¿participa desde la primera conversación? ¿lideró el caso de comercio internacional o Krystal?). Hasta confirmarlo, el copy
  NO le atribuye participación personal ni habla de «su equipo» o «su sello» (ronda 2: se retiraron esas frases de `/jonathan-osorio/` y `/servicios/`).
- [ ] **Cargos de liderazgo previos**: el copy dice solo «casi 20 años de experiencia en diferentes sectores» (sin «liderando iniciativas»). Si se confirma, ampliar en `ceo.ts`.
- [x] **Perfiles públicos** (`sameAs`): LinkedIn publicado (JSON-LD + enlace visible en la ficha ejecutiva).
- [x] Nivel de idiomas: NO se publica (decisión del usuario, nov 2026). `ceo.languages` solo lleva nombre y código.
- [ ] ¿Dónde se fundó Nithios? NO confirmado: el sitio solo dice que Jonathan está radicado en Medellín y que Nithios se dirige desde allí
  (se retiraron «nace en Medellín» del FAQ del portafolio y «Desde Medellín fundó Nithios» de la ficha del CEO). Sin dirección física.

## Portafolio (`src/data/projects.ts`)
- [ ] Más proyectos (el usuario los enviará). Cada uno = un objeto en `projects` con todos los campos del tipo `Project`
  (`headline`, `challenge`, `solution[]`, `value[]`, `statusNote`, `images[]`, `faqs[]`); la página `/portafolio/<slug>/` se genera sola.
- [x] **Casos anonimizados (decisión del usuario).** NOTA INTERNA — no copiar estos nombres a `src/` ni `public/`:
  | Caso público (slug) | Repo / prototipo de origen | Cliente real |
  |---|---|---|
  | `plataforma-comercio-internacional` («Plataforma de comercio internacional») | `nithioso/dragon-global-trade-prototipo` (subdominio `dragon.nithios.com`) | Dragon Global Trade (DGT; importaciones y exportaciones desde China hacia todo el mundo) |
  | `plataforma-logistica-acero` («Plataforma logística para acero») | `nithioso/armetales` | Armetales |
  | `plataforma-transporte-audiovisual` («Plataforma de transporte audiovisual») | `nithioso/lsto-propuestas-diseno/lystrax-propuesta-unificada.html` | L&STO GROUP S.A.S. (producto «LYSTRAX CONNECT») |
  En el sitio no aparecen esos nombres (ni en textos, alt, JSON-LD, WhatsApp, llms.txt, rutas ni nombres de archivo); `statusNote` y las FAQ dicen
  que el nombre se reserva por confidencialidad. Las 18 capturas (tema oscuro, 1440×900 @2x → 2880×1800 WebP q80) están en
  `src/assets/portfolio/plataforma-comercio-internacional/`, `.../plataforma-logistica-acero/` y `.../plataforma-transporte-audiovisual/`. Al capturarlas con Playwright se ocultaron los logos
  y se reemplazaron en el DOM (TreeWalker) las marcas por «Plataforma logística» / «Plataforma de operación» / «Empresa operadora», la sede
  propia por «CEDI Principal», el ERP de terceros por «ERP», y toda razón social ficticia de terceros (constructoras, ferreterías, depósitos,
  productoras, aliados) por genéricos («Constructora A», «Productora A», «Aliado B»…). Si se recapturan, repetir ese tratamiento y revisar cada imagen.
  Comercio internacional (nov 2026): capturas del prototipo servido en local (superadmin, tema oscuro; la del idioma con locale `zh`), logo oculto,
  marca → «Plataforma de comercio», razones sociales propias → «Empresa Colombia»/«Empresa China»/«Empresa aliada» (y la razón social china → 贸易公司),
  clientes ficticios → «Cliente A…H», proveedores → «Proveedor A…K» / 供应商 A…K, dominio de correos de demo → `demo.example`.
  Comprobación: `grep -riE "armetal|lystrax|l&st|lsto|CONNECT|dragon|\bdgt\b" src public dist` debe dar 0 (salvo la directiva CSP `connect-src`).
- [ ] **Exposición fuera del sitio (decisión del usuario pendiente):** el subdominio público `dragon.nithios.com` y el repo público
  `nithioso/dragon-global-trade-prototipo` siguen mostrando el nombre del cliente (título, logo, `<meta description>`, datos de demo). El sitio no enlaza
  ninguno de los dos. Opciones: renombrar/privatizar el repo, anonimizar el prototipo o retirar el subdominio.
- [ ] Casos anonimizados: stack definitivo (hoy vacío), estado real más allá del prototipo y, si algún día se autoriza, publicar el nombre.
  Las URL antiguas (`/portafolio/<nombre-del-cliente>/`) no tienen redirección a propósito (evita exponer el nombre en `.htaccess`).
- [x] Capturas del caso de comercio internacional: 6 capturas anonimizadas (ver arriba) en `src/assets/portfolio/plataforma-comercio-internacional/`
  (`plataforma-comercio-internacional-<pantalla>.webp`). La URL antigua del caso queda en 404 a propósito (sin redirección que exponga el nombre).
- [ ] Capturas reales de Krystal: hoy se muestra una ilustración conceptual en CSS (`illustration: 'krystal'`, `KrystalMockup.astro`).
  Para publicarlas: guardar 4–6 capturas (1440×900 @2x, tema oscuro si existe; agenda, videollamada, historia clínica, dashboards por rol)
  en `src/assets/portfolio/krystal/`, importarlas en `projects.ts`, llenar `images: [{ src, alt, caption }]` y `cover` (+ `coverAlt`).
  La primera captura que sea `cover` no se repite en la galería. Nombres `krystal-<pantalla>.webp`. Al llegar, cambiar la
  plantilla de Krystal en `scripts/generate-og-images.mjs` para usar la captura `cover` y ejecutar `npm run og`.
- [ ] Estado real de Krystal (hoy `status: 'sin-especificar'`).
- [x] **Chelato Toons** (`chelato-toons`, producto EN LÍNEA en https://chelato.nithios.com): videojuego web de naves para una activación de marca
  de una empresa de micheladas (NO nombrar a la empresa en `src/` ni `public/`; en el sitio: «una marca de micheladas»). Hechos verificados en los
  archivos públicos del juego (index.html, config.js, js/game.js, js/net/api.js). 6 capturas reales en `src/assets/portfolio/chelato-toons/`
  (5 móviles iPhone 14 1170×1992 + tabla de puntajes de escritorio 2880×1800), tomadas de una copia local con `mock: true` (modo sin servidor).
  PROPIEDAD INTELECTUAL: los héroes y villanos del juego son personajes reconocibles de caricaturas de terceros → NO se publican: no se capturó la
  selección de héroe y los sprites se sustituyeron por PNG transparentes al capturar (la partida muestra solo HUD, disparos y fondo).
  Los nombres y puntajes de las capturas son datos de prueba (lo aclara `statusNote`). Si se recaptura, repetir ese tratamiento.
- [x] Chelato Toons ABIERTO sin código QR (nov 2026, indicación del usuario): el sitio dice que nació con acceso por QR para la activación y,
  terminado el evento, quedó abierto en chelato.nithios.com. [ ] Confirmar que el juego en producción ya no pide código (hoy lo decide su `config.js`/backend).
- [ ] **Seguridad (fuera de este repo)**: `https://chelato.nithios.com/config.js` es público y sus comentarios nombran el proveedor de hosting y
  el backend; limpiarlos en el repo del juego. En este sitio ya no se nombra el proveedor (`verify:seo` lo comprueba).
- [ ] Chelato Toons: confirmar si se puede mencionar el nombre de la marca, fechas o resultados de la campaña (hoy no se publica ninguno) y si
  los personajes tienen licencia (mientras no se confirme, seguir sin mostrarlos ni nombrarlos).
- [ ] Stack tecnológico del caso de comercio internacional (hoy vacío).
- [ ] Autorización para mencionar clientes/resultados (si aplica).

## Empresa
- [ ] **Confirmar oferta "CTO externo" y "ciberseguridad"** como servicios propios. Hoy: "Acompañamiento estratégico continuo" dentro de
  consultoría y "Protección de la información" como criterio transversal, sin sección ni FAQ propias.
- [ ] ¿Atención en inglés? Hoy JSON-LD y llms.txt dicen solo español; si se confirma, actualizar `schema.ts` y `public/llms.txt` a la vez.
- [ ] ¿Dominio público del caso de comercio internacional / Krystal? Si existe, añadir campo opcional `url` en `projects.ts` (el marco de navegador hoy muestra solo el nombre).
- [x] Logo definitivo: K · «NTOS en sello» (elegido por el usuario; reemplaza a G «Ligadura NT», archivado en design/logo/v2/nt-ligadura/; design/logo/DECISION.md). Integrado en sitio, favicon/íconos, OG y kit gráfico. Pendiente solo la búsqueda de marca (abajo).
  Límites conocidos: la S se descubre desde ~64 px; a 32 px aguantan N, T y el anillo (con corte óptico); a 16 px es una moneda con una marca oscura. La pieza de luz en «C» podría leerse como «C·NT» o ©.
- [ ] Razón social / NIT, correo, redes sociales (no publicar hasta confirmar).
- [ ] Política de propiedad intelectual y entrega de código fuente (para FAQ).
- [ ] Responsable y datos de contacto para la política de privacidad (Ley 1581 de 2012).
- [ ] Horario de atención por WhatsApp.
- [ ] Alta en Google Business Profile / Search Console / Bing Webmaster tras publicar.

- [ ] **Logo: búsqueda de antecedentes marcarios** del sello K «NTOS en sello» (moneda con NT calada y corte en S) en SIC Colombia y WIPO (Global Brand Database, clases 9, 35 y 42; incluir búsqueda figurativa/Viena de monedas y sellos circulares) antes de registrar la marca; los monogramas «NT» son frecuentes y la «C» de luz puede confundirse con © (design/logo/DECISION.md).

## Miembro de junta directiva (`src/data/servicios/miembro-de-junta-directiva-tecnologia.ts`) — CONFIRMAR CON EL USUARIO
- [x] **Experiencia previa en juntas** — RESUELTO: ha sido miembro de la junta directiva de la Asociación Drupal Colombia (`ceo.ts › governance`,
  ficha, bloque de junta, FAQ, perfil del servicio, JSON-LD `affiliation`, llms.txt). En pasado; no afirmar otras juntas ni membresía actual.
- [ ] (Opcional) **Periodo y cargo** en la junta de la Asociación Drupal Colombia, solo si el usuario quiere publicarlos (hoy: sin fechas ni cargo).
- [x] **Modalidades que realmente ofrece** — RESUELTO: las cuatro (miembro independiente, asesor permanente, comité de tecnología,
  sesiones puntuales) en `sections.modalities` con «Cuándo conviene».
- [ ] **¿Lo presta él personalmente?** (hoy sí: `providedByCeo: true`, Person como provider en JSON-LD). ¿Presencial en otras ciudades o solo remoto?
- [ ] **Política de conflicto de interés** (FAQ «¿Puede Nithios venderle servicios a una empresa en cuya junta participa Jonathan?»): hoy dice
  que se declara y se acuerda con la junta; confirmar la regla real. Honorarios, plazos y requisitos legales: no se publican (no confirmados).
- [ ] Revisión del texto por Jonathan antes de promocionar la URL (LinkedIn, Search Console).

## Guías y servicios específicos (SEO/GEO)
- [ ] **Revisión del CEO antes de producción** de las 6 guías (`src/content/guias/`) y de los 6 servicios específicos (`src/data/servicios/`):
  exactitud, tono y que no prometan nada que Nithios no ofrezca. Decidir si las guías se firman con su nombre (hoy autor = Organization
  Nithios; si las firma, cambiar `author` en `article()` de `src/lib/schema.ts` a `{ '@id': ids.person }` y mostrar la firma en la plantilla).
- [ ] **Perfiles de empresa para `sameAs`**: página de empresa en LinkedIn y Perfil de Negocio de Google (sin dirección). Cuando existan,
  añadirlos a `organization().sameAs` y a `public/llms.txt`. No inventar URL.
- [ ] Confirmar como servicios propios los 5 nuevos (IA, automatización, apps móviles, plataformas web, modernización): la UI ya los publica.
- [ ] IndexNow: crear la clave y el envío tras cada despliegue (docs/SEO-GEO.md › Checklist).

## Contacto, privacidad y técnico (`src/data/privacy.ts`, `public/.htaccess`)
- [ ] **Revisión legal** de `/politica-de-privacidad/` (Ley 1581 de 2012 y Decreto 1074 de 2015) por un abogado.
- [ ] Razón social y NIT del responsable → `privacyPolicy.controller.legalName` / `nit` (vacíos ⇒ no se muestran).
- [ ] Fecha de la versión revisada → `privacyPolicy.lastUpdated` (vacía ⇒ no se muestra).
- [ ] Evaluar si se requiere registro de bases de datos ante la SIC (RNBD) según el tipo de sociedad y activos.
- [ ] Correo real de contacto ⇒ habilitar `public/.well-known/security.txt` (hoy no se publica).
- [ ] HSTS: hoy `max-age=31536000` solo para el dominio raíz (activar con el SSL ya emitido). Tras verificar HTTPS en todos los subdominios
  (webmail., staging…) añadir `includeSubDomains`; `preload` solo después y registrando en hstspreload.org.
- [ ] (Opcional) `<lastmod>` del sitemap con fechas reales por página (campo `updatedAt` en src/data o `git log -1 --format=%cI`); hoy se omite.
- [ ] Tras desplegar: confirmar `Cache-Control: … immutable` en `/_astro/*` (`curl -sI`) y las redirecciones de un solo salto.

- [x] **Regla de conflicto de interés (servicio de junta):** el usuario eligió la versión flexible (nov 2026): el conflicto se declara y se maneja según las reglas de cada junta, sin ejemplos ni compromisos de exclusión de Nithios como proveedor.
