/**
 * Formatea una fecha "AAAA-MM-DD" de posts.json en español.
 *
 * `new Date('2026-04-21')` interpreta la cadena como medianoche UTC.
 * En Colombia (UTC-5) eso cae el día anterior a las 7 p. m., así que
 * la fecha se mostraba corrida un día. Aquí se construye la fecha con
 * los componentes locales para que el día sea siempre el escrito.
 */
export function formatearFecha(fecha: string): string {
  const [anio, mes, dia] = fecha.split('-').map(Number);
  return new Date(anio, mes - 1, dia).toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
