# Pendientes (datos reales que faltan — NO inventar)

## Jonathan Osorio (`src/data/ceo.ts`)
La página `/jonathan-osorio/` oculta cada bloque mientras su campo esté vacío. Formato exacto de cada entrada:
- [ ] **Foto profesional** (vertical 4:5, mín. 1040×1300 px, fondo oscuro ideal). Guardar en `src/assets/ceo/jonathan-osorio.jpg` y en `ceo.ts`:
  `import photo from '@/assets/ceo/jonathan-osorio.jpg';` → `photo: photo,`. `CeoPortrait.astro` reemplaza solo el monograma «JO» por la foto optimizada y `person(await ceoPhotoUrl())` (BaseLayout) añade al JSON-LD la versión optimizada 1200 px JPEG, nunca el original.
- [ ] **Trayectoria** (`experience`, más reciente primero):
  `{ role: 'Cargo', organization: 'Empresa', period: '2018 – 2024', sector: 'Sector (opcional)', description: 'Qué lideró (opcional)', achievements: ['Logro verificable (opcional)'] }`
- [ ] **Sectores** (`sectors`): `['Banca', 'Retail', …]` — solo sectores reales en los que trabajó.
- [ ] **Estudios** (`education`): `{ degree: 'Título', institution: 'Universidad', period: '2005 – 2010 (opcional)', description: 'opcional' }` → alimenta `alumniOf` en JSON-LD.
- [ ] **Certificaciones** (`certifications`): `{ name: 'Nombre', issuer: 'Entidad emisora', year: '2023 (opcional)' }` → `hasCredential` en JSON-LD.
- [ ] **Logros verificables** (`achievements`): `['Frase corta y comprobable']`.
- [ ] **Cita aprobada por él** (`quote`): texto literal; se muestra atribuida a Jonathan. Hoy solo hay una frase de postura atribuida a Nithios (`ceoPage.vision.statement`).
- [ ] **Validar áreas de especialidad de Jonathan** (hoy `focusAreas` solo lista lo derivado de las líneas de servicio; antes figuraban
  arquitectura de software, ciberseguridad y dirección de equipos, retiradas por no estar confirmadas).
- [ ] **Nacionalidad** (solo si se quiere publicar): añadir campo en `ceo.ts` y `nationality` en `person()`.
- [ ] **Rol de Jonathan en cada proyecto** (¿participa desde la primera conversación? ¿lideró Dragon/Krystal?). Hasta confirmarlo, el copy
  NO le atribuye participación personal ni habla de «su equipo» o «su sello» (ronda 2: se retiraron esas frases de `/jonathan-osorio/` y `/servicios/`).
- [ ] **Cargos de liderazgo previos**: el copy dice solo «casi 20 años de experiencia en diferentes sectores» (sin «liderando iniciativas»). Si se confirma, ampliar en `ceo.ts`.
- [ ] **Perfiles públicos** (`sameAs`): `['https://www.linkedin.com/in/…']` → refuerza la entidad Person en buscadores/IA.

## Portafolio (`src/data/projects.ts`)
- [ ] Más proyectos (el usuario los enviará). Cada uno = un objeto en `projects` con todos los campos del tipo `Project`
  (`headline`, `challenge`, `solution[]`, `value[]`, `statusNote`, `images[]`, `faqs[]`); la página `/portafolio/<slug>/` se genera sola.
- [x] Capturas de Dragon Global Trade: 6 capturas reales del prototipo (tema oscuro, 2880×1800 WebP) en `src/assets/portfolio/dragon/`,
  tomadas del prototipo estático con datos ficticios de demostración (la página lo aclara en `statusNote`). Regenerar si cambia el prototipo.
- [ ] Capturas reales de Krystal: hoy se muestra una ilustración conceptual en CSS (`illustration: 'krystal'`, `KrystalMockup.astro`).
  Para publicarlas: guardar 4–6 capturas (1440×900 @2x, tema oscuro si existe; agenda, videollamada, historia clínica, dashboards por rol)
  en `src/assets/portfolio/krystal/`, importarlas en `projects.ts`, llenar `images: [{ src, alt, caption }]` y `cover` (+ `coverAlt`).
  La primera captura que sea `cover` no se repite en la galería. Al llegar, regenerar `src/assets/portfolio/krystal/og.png` (hoy render de la
  ilustración conceptual, 1200×630) o quitar `ogImage` para usar la captura `cover`.
- [ ] Estado real de Krystal (hoy `status: 'sin-especificar'`).
- [ ] Stack tecnológico de Dragon Global Trade (hoy vacío).
- [ ] Autorización para mencionar clientes/resultados (si aplica).

## Empresa
- [ ] **Confirmar oferta "CTO externo" y "ciberseguridad"** como servicios propios. Hoy: "Acompañamiento estratégico continuo" dentro de
  consultoría y "Protección de la información" como criterio transversal, sin sección ni FAQ propias.
- [ ] ¿Atención en inglés? Hoy JSON-LD y llms.txt dicen solo español; si se confirma, actualizar `schema.ts` y `public/llms.txt` a la vez.
- [ ] ¿Dominio público de Dragon / Krystal? Si existe, añadir campo opcional `url` en `projects.ts` (el marco de navegador hoy muestra solo el nombre).
- [x] Logo definitivo: monograma «N partida» v2 (design/logo/DECISION.md). Pendiente solo la búsqueda de marca (abajo).
- [ ] Razón social / NIT, correo, redes sociales (no publicar hasta confirmar).
- [ ] Política de propiedad intelectual y entrega de código fuente (para FAQ).
- [ ] Responsable y datos de contacto para la política de privacidad (Ley 1581 de 2012).
- [ ] Horario de atención por WhatsApp.
- [ ] Alta en Google Business Profile / Search Console / Bing Webmaster tras publicar.

- Logo: verificar disponibilidad del monograma «N partida» en SIC Colombia / WIPO antes de registrar la marca (design/logo/DECISION.md).

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
