/**
 * Rejillas de tarjetas SIN huérfanas según la cantidad de ítems (servicios específicos, guías).
 * Las clases van completas y literales para que Tailwind las detecte.
 *  1 → ancho limitado · 2 y 4 → 2 columnas · 3 y 6 → 3 columnas (en md la 3.ª ocupa la fila) ·
 *  5 → 3 + 2 tarjetas anchas en lg (6 columnas), y en md la última ocupa la fila.
 * <div class:list={['grid gap-5', gridFor(items.length)]}>
 */
const md: Record<number, string> = {
  1: 'max-w-2xl',
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-2 lg:grid-cols-3 md:max-lg:[&>*:last-child]:col-span-2',
  4: 'md:grid-cols-2',
  5: 'md:grid-cols-2 lg:grid-cols-6 lg:[&>*]:col-span-2 lg:[&>*:nth-child(n+4)]:col-span-3 md:max-lg:[&>*:last-child]:col-span-2',
  6: 'md:grid-cols-2 lg:grid-cols-3',
};
/** Igual que `md`, pero la rejilla de 2 columnas empieza en sm (tarjetas de problemas). */
const sm: Record<number, string> = {
  1: 'max-w-2xl',
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3 sm:max-lg:[&>*:last-child]:col-span-2',
  4: 'sm:grid-cols-2',
  5: 'sm:grid-cols-2 lg:grid-cols-6 lg:[&>*]:col-span-2 lg:[&>*:nth-child(n+4)]:col-span-3 sm:max-lg:[&>*:last-child]:col-span-2',
  6: 'sm:grid-cols-2 lg:grid-cols-3',
};

export const gridFor = (n: number, from: 'md' | 'sm' = 'md'): string =>
  (from === 'sm' ? sm : md)[n] ?? (from === 'sm' ? 'sm:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-3');

/** Listas de 2 columnas (perfiles «Para quién»): con cantidad impar, el último ítem ocupa la fila. */
export const gridFor2 = (n: number): string =>
  n % 2 === 1 ? 'md:grid-cols-2 md:[&>*:last-child]:col-span-2' : 'md:grid-cols-2';
