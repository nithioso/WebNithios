/**
 * Genera los SVG finales del logo Nithios (monograma refinado v2) en design/logo/final/.
 * Uso: node design/logo/final/build-logo.mjs
 * Geometría en rejilla 64. N partida por un corte perpendicular a la diagonal (centro 32,32).
 */
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const dir = path.dirname(fileURLToPath(import.meta.url));
const r = (n) => +n.toFixed(2);

// ---------- Isotipo ----------
const CUT = 4.2; // ancho del corte (v1: 3.6) → visible desde 32 px
const k = (CUT / 2) * Math.SQRT2; // desplazamiento en x+y
const cL = 64 - k, cR = 64 + k;
// Pieza izquierda: asta 14–21 + diagonal entre y=x-6 (exterior) e y=x+6 (interior)
const left = `M14 49V15H21L${r((cL + 6) / 2)} ${r((cL - 6) / 2)}L${r((cL - 6) / 2)} ${r((cL + 6) / 2)}L21 27V49Z`;
const right = `M50 15V49H43L${r((cR - 6) / 2)} ${r((cR + 6) / 2)}L${r((cR + 6) / 2)} ${r((cR - 6) / 2)}L43 37V15Z`;
export const MARK = { left, right, viewBox: '14 15 36 34' };

// Dos facetas de luz (injerto del concepto «Símbolo»): pieza izquierda iluminada, derecha en sombra.
const gradDefs = (p) => `<linearGradient id="${p}-l" x1="14" y1="15" x2="34" y2="49" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f3e2a6"/><stop offset=".55" stop-color="#d9b64a"/><stop offset="1" stop-color="#c9a24b"/></linearGradient><linearGradient id="${p}-r" x1="30" y1="15" x2="50" y2="49" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#d4af37"/><stop offset=".6" stop-color="#b8902f"/><stop offset="1" stop-color="#9a7628"/></linearGradient>`;
const markPaths = (p, mono) =>
  mono ? `<path fill="currentColor" d="${left}${right}"/>` : `<path fill="url(#${p}-l)" d="${left}"/><path fill="url(#${p}-r)" d="${right}"/>`;

// ---------- Wordmark (mayúsculas geométricas, altura de mayúscula 17u, y 23.5–40.5) ----------
const W = 2.8; // peso (v1: 2.4) → no se vuelve hairline en el header
const T = 23.5, B = 40.5, MID = 32;
const stem = (cx) => `M${r(cx - W / 2)} ${T}H${r(cx + W / 2)}V${B}H${r(cx - W / 2)}Z`;
const d = 3.41 * (W / 2.4);
const N = `M54 ${T}H${r(54 + W)}V${B}H54ZM${r(68.62 - W)} ${T}H68.62V${B}H${r(68.62 - W)}ZM54 ${T}H${r(54 + d)}L68.62 ${B}H${r(68.62 - d)}Z`;
const Tt = `M83.42 ${T}H97.02V${r(T + W)}H83.42Z` + stem(90.22).replace(`${T}`, `${r(T + W)}`);
const H = `M103.22 ${T}H${r(103.22 + W)}V${B}H103.22ZM${r(117.5 - W)} ${T}H117.5V${B}H${r(117.5 - W)}ZM103.22 ${r(MID - W / 2)}H117.5V${r(MID + W / 2)}H103.22Z`;
const ro = 8.85, ri = r(8.85 - W * 1.05), ox = 140.8, oy = 32.35;
const O = `M${r(ox - ro)} ${oy}A${ro} ${ro} 0 1 0 ${r(ox + ro)} ${oy}A${ro} ${ro} 0 1 0 ${r(ox - ro)} ${oy}ZM${r(ox - ri)} ${oy}A${ri} ${ri} 0 1 1 ${r(ox + ri)} ${oy}A${ri} ${ri} 0 1 1 ${r(ox - ri)} ${oy}Z`;
const WORD_FILL = N + stem(76.02) + Tt + H + stem(124.9) + O;
const WORD_S = 'M165.39 25.76A4.92 3.8 0 1 0 161.62 32A4.92 3.8 0 1 1 157.85 38.24';
export const WORD = { fill: WORD_FILL, s: WORD_S, weight: W, viewBox: '53.6 22.9 115.6 18.9' };
const wordPaths = (color) => `<path fill="${color}" d="${WORD_FILL}"/><path fill="none" stroke="${color}" stroke-width="${W}" d="${WORD_S}"/>`;

const svg = (vb, body, label = true) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}"${label ? ' role="img" aria-label="Nithios"' : ''}>${label ? '<title>Nithios</title>' : ''}${body}</svg>\n`;

const files = {
  // Isotipo sin contenedor (fondos oscuros)
  'mark.svg': svg('14 15 36 34', `<defs>${gradDefs('nm')}</defs>${markPaths('nm')}`),
  // Ícono de app / favicon: contenedor negro redondeado
  'app-icon.svg': svg('0 0 64 64', `<defs>${gradDefs('ni')}</defs><rect width="64" height="64" rx="14" fill="#0a0a0a"/>${markPaths('ni')}`),
  // Ícono a sangre (apple-touch, maskable): cuadrado negro completo
  'app-icon-square.svg': svg('0 0 64 64', `<defs>${gradDefs('ns')}</defs><rect width="64" height="64" fill="#000"/>${markPaths('ns')}`),
  // Horizontal: N dorada + wordmark marfil (transparente, para fondo negro). N desplazada -9u: separación N–texto 13u (≈0,38 de la altura).
  'logo-horizontal.svg': svg('5 15 164.2 34', `<defs>${gradDefs('nh')}</defs><g transform="translate(-9 0)">${markPaths('nh')}</g>${wordPaths('#f5f1e8')}`),
  'logo-mono.svg': svg('5 15 164.2 34', `<g transform="translate(-9 0)">${markPaths('', true)}</g>${wordPaths('currentColor')}`),
  'wordmark.svg': svg('53.6 22.9 115.6 18.9', wordPaths('#f5f1e8')),
};
for (const [f, c] of Object.entries(files)) await writeFile(path.join(dir, f), c);
console.log(JSON.stringify({ left, right }, null, 1));
