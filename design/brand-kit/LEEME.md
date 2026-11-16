# Kit gráfico Nithios — logo «Ligadura NT»

Generado con `node scripts/build-brand-kit.mjs` desde `design/logo/v2/nt-ligadura/` (fuente única). No edites estos archivos a mano: cambia la fuente y regenera.

## Qué usar en cada caso
| Necesidad | Carpeta | Archivo recomendado |
|---|---|---|
| Imprenta, bordado, rotulación, gran formato | `01-vectores/` | PDF o SVG (vectorial, escala sin límite) |
| Web, presentaciones, documentos | `02-png-transparente/` | PNG sin fondo en el tamaño más cercano |
| Imagen lista con fondo y área de respeto | `03-png-con-fondo/` | PNG sobre negro o marfil |
| Sitio web y apps | `04-favicon-app/` | `favicon.svg`, `favicon.ico`, íconos 16–1024 px, maskable |
| Perfiles y portadas | `05-redes-sociales/` | Perfil 1080, post 1080×1350, compartir 1200×630, portadas LinkedIn/X, historia |
| Impresión sin vector disponible | `06-impresion-alta/` | PNG de 4096–6000 px (≈ 50 cm a 300 ppp) + los PDF |

## Versiones
- **Formas:** `simbolo` (1:1), `horizontal`, `vertical`.
- **negativo:** oro + wordmark marfil, para fondos oscuros (uso principal de la marca).
- **positivo:** oro profundo + wordmark tinta, para fondos claros.
- **mono-negro / mono-blanco:** una sola tinta (sellos, grabado, fax, bordado, marcas de agua).

## Colores
| Uso | HEX | RGB |
|---|---|---|
| Negro de marca | `#000000` (superficies `#0a0a0a`) | 0, 0, 0 |
| Oro (degradado negativo) | `#f3e2a6` → `#d4af37` → `#9a7628` | 243,226,166 → 212,175,55 → 154,118,40 |
| Oro profundo (positivo) | `#a8842f` → `#6f561c` | 168,132,47 → 111,86,28 |
| Marfil (texto sobre oscuro / fondo claro) | `#f5f1e8` | 245, 241, 232 |
| Tinta (texto sobre claro) | `#0a0a0a` | 10, 10, 10 |

Los archivos están en RGB (sRGB). Para imprenta, la equivalencia CMYK o una tinta metálica/foil (Pantone) debe definirse con el impresor sobre prueba física: NO hay valores CMYK/Pantone oficiales todavía.

## Reglas de uso
- **Área de respeto:** deja libre alrededor del logo al menos el ancho del asta de la N.
- **Tamaño mínimo:** símbolo 16 px en pantalla (usa `04-favicon-app/`, que tiene corte óptico para tamaños pequeños) y ~8 mm impreso; horizontal ≥ 120 px / 25 mm de ancho.
- **Fondos:** negativo solo sobre fondos oscuros; positivo sobre claros; sobre fotos o colores usa mono-blanco o mono-negro.
- **No:** deformar, rotar, cambiar colores, añadir sombras/contornos, recomponer símbolo y texto, ni colocar el oro sobre fondos de bajo contraste.

## Pendiente
Búsqueda de antecedentes marcarios (SIC Colombia y WIPO) antes de registrar la marca.
