/**
 * Catálogo de talleres. Es el único archivo que hay que editar para
 * publicar, cambiar o cerrar un taller.
 *
 * Cómo activar el pago con Wompi en un taller:
 *   1. En el dashboard de Wompi crea un "Link de pago" con el monto del taller.
 *   2. Copia la URL (empieza por https://checkout.wompi.co/l/).
 *   3. Pégala en `enlacePago` y escribe el monto en `precioCop`.
 *
 * `formulario` (opcional) agrega un botón "Dejar mis datos" que lleva a un formulario de Google.
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
  /** Precio en texto libre, para otra moneda. Tiene prioridad sobre `precioCop`. */
  precio?: string;
  /** El taller no cuesta. El botón abre un correo de inscripción. */
  gratis?: boolean;
  /** URL del link de pago de Wompi. */
  enlacePago?: string;
  /** Formulario de Google para dejar datos o mostrar interés. */
  formulario?: string;
}

export const TALLERES: Taller[] = [
  {
    id: 'lectores-con-criterio',
    titulo: 'Club de lectura: Lectores con criterio',
    publico: 'Cualquier persona que quiera leer en compañía, sepa o no de tecnología',
    descripcion:
      'Un club mensual de libros que piensan la tecnología, el poder y la vida ' +
      'contemporánea, con ficción y ensayo por turnos. Antes de cada sesión recibes una guía ' +
      'de lectura con cinco preguntas, y entre sesiones la conversación sigue en un grupo de WhatsApp.',
    formato: 'Una sesión mensual de 75 minutos, por Google Meet, el último sábado del mes',
    fecha: 'Sábado 28 de noviembre. Libro: El caballero inexistente, de Italo Calvino',
    precio: '5 USD por puesto',
    enlacePago: 'https://checkout.wompi.co/l/VPOS_aWIBf0',
    formulario: 'https://forms.gle/a3Lq5cW1btAP7UGv5',
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
