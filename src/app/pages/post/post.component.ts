import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';
import { BlogService } from '../../services/blog.service';
import { SeoService } from '../../services/seo.service';
import { Post } from '../../models/post.model';
import { formatearFecha } from '../../utils/fecha';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private blogService = inject(BlogService);
  private sanitizer = inject(DomSanitizer);
  private seo = inject(SeoService);

  post = signal<Post | null>(null);
  content = signal<SafeHtml>('');
  loading = signal(true);

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug') ?? '';

    this.blogService.getPosts().subscribe(posts => {
      const found = posts.find(p => p.slug === slug) ?? null;
      this.post.set(found);

      // Si el slug no está en posts.json no se pide el .md: Vercel
      // devolvería index.html y se pintaría la portada dentro del post.
      if (!found) {
        this.loading.set(false);
        return;
      }

      this.seo.actualizar({
        titulo: found.title,
        descripcion: found.summary,
        ruta: `/escritura/${found.slug}`,
        imagen: found.image || undefined,
        tipo: 'article',
        fecha: found.date,
      });

      this.blogService.getPostContent(slug).subscribe({
        next: markdown => {
          const html = marked.parse(markdown) as string;
          this.content.set(this.sanitizer.bypassSecurityTrustHtml(html));
          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
        }
      });
    });
  }

  formatDate = formatearFecha;
}
