# Decisión de logo — Nithios

## Logo oficial: G · «Ligadura NT» (elegido por el usuario)
Historial: **v1** monograma «N partida» (ganador del jurado, abajo) → refinado v2 → **rondas v2** (design/logo/v2/, contact sheets
`propuestas-v2.png` y `propuestas-v3.png`) → el usuario elige **G «Ligadura NT»** (`v2/nt-ligadura/`, concepto en su `rationale.md`):
N y T fundidas en un bloque; el asta derecha de la N es el asta de la T y la barra de la T sale en voladizo.
Archivadas en `v2/`: las propuestas A, B, D y H (carpetas `monograma/`, `gema/`, `sello/`, `nt-emblema/`) y las descartadas E «Clásico» (`clasico/`) y F «Trazo continuo» (`trazo/`);
el monograma «N partida» integrado hasta ahora queda en `monograma/final-v2/` (con su `build-logo.mjs`, ya fuera de la tubería,
y el OG de Krystal anterior `krystal-og-monograma.png`).

**Archivos oficiales** (`final/`, copia literal de `v2/nt-ligadura/` + derivados): `mark.svg` (símbolo neg.), `mark-pos.svg`, `mark-mono.svg`,
`logo-horizontal.svg` (neg.), `logo-horizontal-pos.svg`, `logo-vertical.svg`, `logo-vertical-pos.svg`, `logo-mono.svg` (horizontal currentColor),
`wordmark.svg`, `app-icon.svg` (contenedor redondeado, canal óptico 2,8u para tamaños pequeños), `app-icon-square.svg` (a sangre, apple-touch)
y `app-icon-maskable.svg` (a sangre, símbolo al 66 % dentro del círculo seguro del 80 %).
**Integración:** `src/components/Logo.astro` (paths inline, negativo) y `npm run brand` (`scripts/generate-brand-assets.mjs`) → favicon.svg/.ico,
apple-touch-icon, icon-192/512, icon-maskable-512 y og-default.png en /public. `src/assets/portfolio/krystal/og.png` se actualizó con el nuevo logo.
**Límites conocidos:** a 16 px el canal desaparece (se lee una «N» con bandera); la T se distingue desde ~32 px. El wordmark es ligero frente
al símbolo macizo (contraste deliberado; candidato a versión semibold).
**Pendiente legal:** búsqueda de antecedentes marcarios del monograma «NT» en SIC Colombia / WIPO antes de registrar (docs/PENDIENTES.md).

---

## Histórico v1 — monograma «N partida» (reemplazado)

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

## Refinamiento v2 del monograma (archivado en monograma/final-v2/)
- **Injerto del Símbolo:** dos facetas de luz — pieza izquierda iluminada (#f3e2a6→#c9a24b), derecha en
  sombra (#d4af37→#9a7628). El corte se lee como un quiebre de luz y gana contraste en tamaños pequeños.
- **Corte 3,6u → 4,2u** (rejilla 64): visible desde 32 px (≈2 px); a 16 px queda una N sólida legible.
- **Wordmark peso 2,4u → 2,8u** y altura de mayúscula = ½ de la N: deja de ser hairline en el header.
- **Separación N–texto 18u → 13u** (≈0,38 h): el bloque horizontal se percibe como una unidad.
- Marfil del wordmark alineado al token `pearl` #f5f1e8.
- Pendiente legal: búsqueda en marcas registradas (SIC Colombia / WIPO) antes de registrar (ver docs/PENDIENTES.md).

## Archivos del monograma (histórico)
`monograma/final-v2/build-logo.mjs` (fuente de verdad de la geometría) → `mark.svg`, `app-icon.svg`, `app-icon-square.svg`,
`logo-horizontal.svg`, `logo-mono.svg`, `wordmark.svg`; PNG de referencia `icon-512.png`, `apple-touch-icon.png`,
`og-default.png`. Integración: `src/components/Logo.astro` y `scripts/generate-brand-assets.mjs` → /public.
Candidatos descartados conservados en `monograma/`, `simbolo/`, `wordmark/`.
