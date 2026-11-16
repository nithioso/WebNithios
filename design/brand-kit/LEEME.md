# Kit gráfico Nithios — logo K · «NTOS en sello»

Moneda de oro (la **O**) con la ligadura **NT** tallada dentro y un corte en **S** que la parte en dos piezas: luz arriba a la
izquierda y sombra en el resto. La NT es un hueco: deja ver el fondo. Concepto completo en `design/logo/v3/ntos-sello/rationale.md`.

Generado con `npm run kit` (`scripts/build-brand-kit.mjs`) desde `design/logo/v3/ntos-sello/` (fuente única). No edites estos archivos a mano:
cambia la fuente y regenera (este LEEME se conserva).

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
- **Formas:** `simbolo` (la moneda, 1:1), `horizontal`, `vertical`.
- **negativo:** oro + wordmark marfil, para fondos oscuros (uso principal de la marca).
- **positivo:** oro profundo + wordmark tinta, para fondos claros.
- **mono-negro / mono-blanco:** una sola tinta (sellos, lacre, grabado, bordado, marcas de agua). La NT y el corte quedan calados.
- **Ícono de app (`04-favicon-app/`):** moneda R 26,5 con **corte óptico de 3u** (en vez de 2,4u) dentro de un contenedor negro redondeado.

## Colores (tomados de los SVG)
| Uso | HEX | RGB |
|---|---|---|
| Negro de marca / contenedor del ícono | `#000000` / `#0a0a0a` | 0, 0, 0 / 10, 10, 10 |
| Oro luz — pieza «C» (negativo) | `#f3e2a6` → `#e0bf5c` → `#c9a03f` | 243,226,166 → 224,191,92 → 201,160,63 |
| Oro sombra — resto de la moneda (negativo) | `#d4af37` → `#b8913a` → `#9a7628` | 212,175,55 → 184,145,58 → 154,118,40 |
| Oro profundo luz (positivo) | `#a8842f` → `#9a782a` → `#8c6c25` | 168,132,47 → 154,120,42 → 140,108,37 |
| Oro profundo sombra (positivo) | `#8f6e26` → `#7f6221` → `#6f561c` | 143,110,38 → 127,98,33 → 111,86,28 |
| Marfil (wordmark sobre oscuro / fondo claro) | `#f5f1e8` | 245, 241, 232 |
| Tinta (wordmark sobre claro) | `#0a0a0a` | 10, 10, 10 |

Oro de una sola tinta (si el soporte no admite degradado): `#d4af37` sobre oscuro, `#9a782a` sobre claro.
Los archivos están en RGB (sRGB). Para imprenta, la equivalencia CMYK o una tinta metálica/foil (Pantone) debe definirse con el impresor sobre prueba física: NO hay valores CMYK/Pantone oficiales todavía.

## Tamaños mínimos (realistas para este símbolo)
La NT ocupa ~55 % del diámetro de la moneda, así que el símbolo necesita más tamaño que un monograma macizo.
| Diámetro de la moneda | Qué se lee | Qué usar |
|---|---|---|
| ≥ 64 px · ≥ 15 mm | Moneda, NT, corte y la S completa | Cualquier versión |
| 40–64 px · 10–15 mm | NT clara y el corte; la S ya no se descubre | Cualquier versión (en pantalla, mejor el ícono con corte óptico por debajo de 48 px) |
| 24–40 px · 6–10 mm | NT legible solo con el **corte óptico** | `04-favicon-app/` (o el header del sitio, que usa el mismo arte) |
| 16–24 px | Una moneda con una marca oscura: la NT se intuye | Solo favicon (`favicon.ico`/`favicon.svg`) |
| < 16 px · < 6 mm | — | No usar el símbolo: usa el wordmark NITHIOS |
Horizontal: ≥ 120 px / 30 mm de ancho (moneda ≥ 32 px). Vertical: ≥ 90 px / 25 mm de ancho. Impreso, el corte fino (2,4u) pide ≥ 15 mm de diámetro; por debajo usa el ícono con corte óptico.

## Reglas de uso
- **Área de respeto:** deja libre alrededor del logo al menos ¼ del diámetro de la moneda.
- **Fondos:** negativo solo sobre fondos oscuros; positivo sobre claros; sobre fotos o colores usa mono-blanco o mono-negro. Como la NT está calada, el fondo se ve a través de ella: evita fondos con textura detrás de la moneda.
- **No:** deformar, rotar (el corte en S tiene dirección), cambiar colores, rellenar la NT, añadir sombras/contornos, recomponer símbolo y texto, ni colocar el oro sobre fondos de bajo contraste.

## Pendiente
Búsqueda de antecedentes marcarios del sello K (SIC Colombia y WIPO) antes de registrar la marca (ver docs/PENDIENTES.md).
