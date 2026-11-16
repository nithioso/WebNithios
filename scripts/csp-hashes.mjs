#!/usr/bin/env node
/**
 * Lista los hashes SHA-256 de los <script> inline ejecutables de dist/**\/*.html
 * (ignora JSON-LD y scripts con src) y verifica que estén en la CSP de public/.htaccess.
 * Uso: npm run build && node scripts/csp-hashes.mjs   (sale con código 1 si falta alguno)
 */
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname;
const HTACCESS = new URL('../public/.htaccess', import.meta.url).pathname;

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* walk(p);
    else if (p.endsWith('.html')) yield p;
  }
}

const hashes = new Map();
const re = /<script\b([^>]*)>([\s\S]*?)<\/script>/g;
for (const file of walk(DIST)) {
  const html = readFileSync(file, 'utf8');
  for (const [, attrs, body] of html.matchAll(re)) {
    if (/\bsrc=/.test(attrs) || /type="application\/ld\+json"/.test(attrs) || !body.trim()) continue;
    const h = `'sha256-${createHash('sha256').update(body, 'utf8').digest('base64')}'`;
    hashes.set(h, (hashes.get(h) ?? 0) + 1);
  }
}

const csp = readFileSync(HTACCESS, 'utf8');
let missing = 0;
for (const [h, count] of hashes) {
  const ok = csp.includes(h);
  if (!ok) missing++;
  console.log(`${ok ? 'OK     ' : 'FALTA  '} ${h}  (${count} páginas)`);
}
if (!hashes.size) console.log('Sin scripts inline: script-src puede quedar solo en \'self\'.');
process.exit(missing ? 1 : 0);
