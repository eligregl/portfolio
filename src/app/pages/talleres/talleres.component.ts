import { Component } from '@angular/core';
import { TALLERES, Taller } from './talleres.data';

const CORREO = 'eligregl@gmail.com';
const PREFIJO_WOMPI = 'https://checkout.wompi.co/';

@Component({
  selector: 'app-talleres',
  standalone: true,
  templateUrl: './talleres.component.html',
  styleUrl: './talleres.component.css'
})
export class TalleresComponent {
  readonly talleres = TALLERES;
  readonly correoTaller = `mailto:${CORREO}?subject=${encodeURIComponent('Taller para mi equipo')}`;

  /** Solo se acepta un link que apunte al checkout de Wompi. */
  enlacePago(t: Taller): string | null {
    return t.enlacePago?.startsWith(PREFIJO_WOMPI) ? t.enlacePago : null;
  }

  precio(t: Taller): string {
    if (t.gratis) return 'Gratis';
    if (t.precio) return t.precio;
    if (t.precioCop == null) return '';
    const miles = String(t.precioCop).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `$${miles} COP`;
  }

  correoReserva(t: Taller): string {
    const asunto = `${t.gratis ? 'Inscripción' : 'Reserva'}: ${t.titulo}`;
    return `mailto:${CORREO}?subject=${encodeURIComponent(asunto)}`;
  }
}
