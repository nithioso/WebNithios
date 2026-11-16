# Decisión de logo — Nithios

Jurado: render con Playwright a 16/32/64/512 px, sobre blanco y en un header simulado sobre negro
(contact sheets en el scratchpad de la sesión). Escala 1–10.

| Criterio | Monograma | Símbolo (gema) | Wordmark (i diamante) |
|---|---|---|---|
| Distintividad | 7 | 8 | 6 |
| Legibilidad en pequeño (16/32 px) | 9 | 7 | 8 |
| Elegancia premium negro/dorado | 8 | 9 | 6 |
| Versatilidad (mono, horizontal, ícono) | 9 | 7 | 7 |
| Calidad técnica del SVG | 9 | 8 | 7 |
| **Total /50** | **42** | 39 | 34 |

**Ganador: Monograma («N partida»).** La N se lee como inicial de la marca a cualquier tamaño, el corte
perpendicular a la diagonal cuenta la historia de las dos líneas (consultoría + desarrollo) unidas, y es
solo paths sólidos (sin filtros ni texto). Símbolo: el más lujoso, pero a 16 px se lee como ◀▶ (controles
multimedia) y pierde las facetas en monocromo. Wordmark: idea simpática, pero el dorado queda relegado a
un punto y la «n» geométrica es genérica.

## Refinamiento v2 (design/logo/final/)
- **Injerto del Símbolo:** dos facetas de luz — pieza izquierda iluminada (#f3e2a6→#c9a24b), derecha en
  sombra (#d4af37→#9a7628). El corte se lee como un quiebre de luz y gana contraste en tamaños pequeños.
- **Corte 3,6u → 4,2u** (rejilla 64): visible desde 32 px (≈2 px); a 16 px queda una N sólida legible.
- **Wordmark peso 2,4u → 2,8u** y altura de mayúscula = ½ de la N: deja de ser hairline en el header.
- **Separación N–texto 18u → 13u** (≈0,38 h): el bloque horizontal se percibe como una unidad.
- Marfil del wordmark alineado al token `pearl` #f5f1e8.
- Pendiente legal: búsqueda en marcas registradas (SIC Colombia / WIPO) antes de registrar (ver docs/PENDIENTES.md).

## Archivos
`final/build-logo.mjs` (fuente de verdad de la geometría) → `mark.svg`, `app-icon.svg`, `app-icon-square.svg`,
`logo-horizontal.svg`, `logo-mono.svg`, `wordmark.svg`; PNG de referencia `icon-512.png`, `apple-touch-icon.png`,
`og-default.png`. Integración: `src/components/Logo.astro` y `scripts/generate-brand-assets.mjs` → /public.
Candidatos descartados conservados en `monograma/`, `simbolo/`, `wordmark/`.
