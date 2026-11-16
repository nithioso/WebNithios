# Decisión de logo — Nithios

## Logo oficial: K · «NTOS en sello» (elegido por el usuario)
Moneda de oro = la **O**; dentro va tallada (calada) la ligadura **NT** de G sin cambiar su dibujo; un solo corte dibuja la **S**:
entra por el canto arriba a la derecha, rodea la NT, baja por la diagonal de la N y sale abajo a la izquierda, partiendo la moneda
en dos piezas (una «C» de luz y el resto en sombra). Concepto, construcción y límites en `v3/ntos-sello/rationale.md`.
Nota: el propio rationale recomendaba conservar G como símbolo; el usuario eligió K como logo principal («cambiemos todo por esa opción»).

### Historial de propuestas (letras)
| Letra | Propuesta | Carpeta | Estado |
|---|---|---|---|
| A | Monograma «N partida» | `monograma/` (v1), `v2/monograma/` (v2; integrado en `monograma/final-v2/`) | Fue oficial (v1, ganador del jurado); archivado |
| B | Gema (símbolo facetado) | `simbolo/` (v1), `v2/gema/` | Archivado |
| C | Wordmark (i con diamante) | `wordmark/` | Descartado |
| D | Sello | `v2/sello/` | Archivado (su lógica luz/sombra inspira K) |
| E | Clásico | `v2/clasico/` | Descartado |
| F | Trazo continuo | `v2/trazo/` | Descartado |
| G | Ligadura NT | `v2/nt-ligadura/` (+ `final-g/` con los SVG y PNG que estuvieron publicados) | Fue oficial; reemplazado por K |
| H | NT emblema | `v2/nt-emblema/` | Archivado |
| I | NTOS en bloque 2×2 | `v3/ntos-bloque/` | Archivado |
| J | NTOS ligadura lineal | `v3/ntos-lineal/` | Archivado |
| **K** | **NTOS en sello** | **`v3/ntos-sello/`** | **OFICIAL** |
Contact sheets: `propuestas.png` (v1), `v2/propuestas-v2.png`, `v2/propuestas-v3.png`, `v3/propuestas-ntos.png`.

### Archivos oficiales
`final/` se deriva de `v3/ntos-sello/` con `node design/logo/v3/ntos-sello/derive-final.mjs` (conserva los nombres que esperan los scripts):
`mark.svg` (símbolo neg., moneda R 28, corte 2,4u), `mark-pos.svg`, `mark-mono.svg`, `logo-horizontal.svg` (neg.), `logo-horizontal-pos.svg`,
`logo-vertical.svg`, `logo-vertical-pos.svg`, `logo-mono.svg` (horizontal currentColor), `wordmark.svg` (NITHIOS, idéntico al de G),
`app-icon.svg` (contenedor redondeado, moneda R 26,5 con corte óptico de 3u), `app-icon-square.svg` (a sangre, moneda al 72 %, apple-touch)
y `app-icon-maskable.svg` (a sangre, moneda al 66 % dentro del círculo seguro del 80 %).
**Integración:** `src/components/Logo.astro` (paths inline, negativo; en `sm`/`md` usa el corte óptico del app-icon escalado a R 28, en `lg`/`xl` el fino),
`npm run brand` (`scripts/generate-brand-assets.mjs` → favicon.svg/.ico, apple-touch-icon, icon-192/512, icon-maskable-512; luego
`scripts/generate-og-images.mjs` → og-default.png y todas las OG) y `npm run kit` (`scripts/build-brand-kit.mjs` → `design/brand-kit/`).
**Límites conocidos:** la NT ocupa ~55 % del diámetro (≈60 % del tamaño que tenía en G): pierde impacto en pequeño. La S solo se descubre
desde ~64 px; a 32 px aguantan N, T y el anillo (con corte óptico); a 16 px es una moneda con una marca oscura. La pieza de luz en «C»
puede leerse como «C·NT» o ©. El corte fino (2,4u) roza el «trazo fino»: por debajo de ~48 px usa siempre el corte óptico.
**Pendiente legal:** búsqueda de antecedentes marcarios del sello K en SIC Colombia / WIPO antes de registrar (docs/PENDIENTES.md).

## Antecedente: G · «Ligadura NT» (fue oficial, archivado en v2/nt-ligadura/)
N y T fundidas en un bloque; el asta derecha de la N es el asta de la T y la barra de la T sale en voladizo. Sus archivos de `final/`
(con `app-icon-square`/`maskable`) y los íconos/OG que se publicaron están en `v2/nt-ligadura/final-g/` (`publicados/`).
Límites que tenía: a 16 px el canal desaparecía (una «N» con bandera); la T se distinguía desde ~32 px.

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
