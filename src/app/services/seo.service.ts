import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

export const SITIO_URL = 'https://eligreg.com';
const NOMBRE = 'Eligreg López';
const IMAGEN_POR_DEFECTO = 'images/yo.jpg';

export interface DatosSeo {
  /** Título de la página. Se le agrega " — Eligreg López" salvo en la portada. */
  titulo: string;
  descripcion: string;
  /** Ruta sin dominio, por ejemplo "/escritura/quienes-piensan". */
  ruta: string;
  /** Ruta relativa a public/, por ejemplo "images/yo.jpg". */
  imagen?: string;
  tipo?: 'website' | 'article';
  /** Fecha AAAA-MM-DD, solo para artículos. */
  fecha?: string;
}

/**
 * Escribe el <title>, la descripción, la URL canónica y las etiquetas
 * Open Graph y Twitter de cada página. Con el prerender, estas etiquetas
 * quedan en el HTML estático y son las que leen Google, LinkedIn y WhatsApp
 * al generar la vista previa de un enlace.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private title = inject(Title);
  private meta = inject(Meta);
  private document = inject(DOCUMENT);

  actualizar(datos: DatosSeo): void {
    const tituloCompleto = datos.ruta === '/'
      ? datos.titulo
      : `${datos.titulo} — ${NOMBRE}`;
    const url = `${SITIO_URL}${datos.ruta === '/' ? '' : datos.ruta}`;
    const imagen = `${SITIO_URL}/${datos.imagen || IMAGEN_POR_DEFECTO}`;
    const tipo = datos.tipo ?? 'website';

    this.title.setTitle(tituloCompleto);

    this.etiqueta('name', 'description', datos.descripcion);
    this.etiqueta('property', 'og:site_name', NOMBRE);
    this.etiqueta('property', 'og:locale', 'es_CO');
    this.etiqueta('property', 'og:type', tipo);
    this.etiqueta('property', 'og:title', datos.titulo);
    this.etiqueta('property', 'og:description', datos.descripcion);
    this.etiqueta('property', 'og:url', url);
    this.etiqueta('property', 'og:image', imagen);
    this.etiqueta('name', 'twitter:card', 'summary_large_image');
    this.etiqueta('name', 'twitter:title', datos.titulo);
    this.etiqueta('name', 'twitter:description', datos.descripcion);
    this.etiqueta('name', 'twitter:image', imagen);

    if (tipo === 'article' && datos.fecha) {
      this.etiqueta('property', 'article:published_time', datos.fecha);
      this.etiqueta('property', 'article:author', NOMBRE);
    } else {
      this.meta.removeTag("property='article:published_time'");
      this.meta.removeTag("property='article:author'");
    }

    this.canonica(url);
  }

  private etiqueta(atributo: 'name' | 'property', clave: string, valor: string): void {
    this.meta.updateTag({ [atributo]: clave, content: valor }, `${atributo}='${clave}'`);
  }

  private canonica(url: string): void {
    let link = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
