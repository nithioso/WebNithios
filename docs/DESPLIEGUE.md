# Despliegue

## Producción — https://nithios.com (Hostinger, cuenta que tiene el dominio `nithios.com`)
- Sitio estático en `public_html` del sitio `nithios.com` (usuario de hosting `u483677541`, orden `1006659401`).
- **Hoy es manual** (la cuenta de Hostinger no tiene GitHub conectado):
  1. `npm ci && npm run build` (debe pasar sin warnings; el postbuild valida la CSP).
  2. Empaquetar `dist/` en un zip con nombre nuevo (incluye `.htaccess`): `cd dist && zip -qr <ruta>/nithios-prod-<fecha>.zip .`
  3. Conector Hostinger: `hosting_files_generate-upload-url` (username + domain) → subir el zip por TUS (POST + PATCH con `X-Auth` y `X-Auth-Rest`) → `hosting_websites_deploy-static-site-archive` con `archive_path` = nombre del zip. **Reemplaza todo `public_html`.**
  4. Verificar: `https://nithios.com/` 200, `http://` y `www.` → 301 a `https://nithios.com/`, ruta inexistente → 404, cabeceras (HSTS, CSP, nosniff, X-Frame-Options), `sitemap-index.xml`, `robots.txt`, `llms.txt`.
- **Para automatizar:** conectar GitHub en hPanel (Websites → Manage → Advanced → Git) y usar `hosting_deploy` (type `nodejs`, appType `astro`, outputDirectory `dist`, buildScript `build`); cada push desplegará solo.

## Vista previa — https://nithioso.github.io/WebNithios/
- Workflow `.github/workflows/pages-preview.yml` en cada push; `scripts/pages-preview.mjs` adapta rutas a `/WebNithios` y pone `noindex`.

## Subdominios en la misma cuenta de Hostinger
- `chelato.nithios.com` → alias (dominio aparcado) del sitio `orangered-gnat-824659.hostingersite.com`, donde vive el juego Chelato Toons (código aparte; no está en este repo). La dirección temporal redirige 301 al subdominio conservando ruta y `?token=` (regla al final de su `.htaccess`). Los QR deben generarse con `https://chelato.nithios.com/` como URL base.
- `dragon.nithios.com` → sitio propio con el prototipo Dragon Global Trade.
