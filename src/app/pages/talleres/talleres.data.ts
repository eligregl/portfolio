/**
 * Catálogo de talleres. Es el único archivo que hay que editar para
 * publicar, cambiar o cerrar un taller.
 *
 * Cómo activar el pago con Wompi en un taller:
 *   1. En el dashboard de Wompi crea un "Link de pago" con el monto del taller.
 *   2. Copia la URL (empieza por https://checkout.wompi.co/l/).
 *   3. Pégala en `enlacePago` y escribe el monto en `precioCop`.
 *
 * Mientras `enlacePago` esté vacío, el botón abre un correo para reservar.
 * No hay llaves ni secretos en este archivo: el link de pago es público.
 */
export interface Taller {
  /** Se usa como ancla: /talleres#<id> */
  id: string;
  titulo: string;
  /** A quién va dirigido. */
  publico: string;
  descripcion: string;
  /** Texto libre, por ejemplo "Miércoles 12 de noviembre, 6 p. m. (Colombia)". */
  fecha?: string;
  /** Texto libre, por ejemplo "En línea, por Google Meet". */
  formato?: string;
  /** Precio en pesos colombianos. Sin puntos: 120000. */
  precioCop?: number;
  /** El taller no cuesta. El botón abre un correo de inscripción. */
  gratis?: boolean;
  /** URL del link de pago de Wompi. */
  enlacePago?: string;
}

export const TALLERES: Taller[] = [
  {
    id: 'ia-sin-perder-el-criterio',
    titulo: 'Cómo usar la IA sin perder el criterio técnico',
    publico: 'Equipos y profesionales de tecnología que usan IA a diario',
    descripcion:
      'Escribes más rápido y piensas con menos profundidad. El taller trabaja con casos ' +
      'reales del equipo para recuperar el análisis que la herramienta te ahorra y que no ' +
      'deberías delegar. Lo dicté con Venezolanas in Tech.',
  },
  {
    id: 'escribir-la-grieta',
    titulo: 'Escribir la grieta',
    publico: 'Todo público, mayores de edad',
    descripcion:
      'Taller de escritura expresiva: un espacio seguro y guiado para procesar las ' +
      'emociones a través de la escritura. La segunda edición fue el 28 de octubre.',
    formato: 'En línea, por Google Meet',
    gratis: true,
  },
];
