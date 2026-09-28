import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { Post } from '../models/post.model';
import { BlogService } from './blog.service';

/**
 * Durante el prerender no hay servidor web que responda a
 * "posts/posts.json", así que esta versión lee los archivos
 * directamente de public/posts. Solo se usa en el build.
 */
@Injectable()
export class BlogServiceServidor extends BlogService {
  private carpeta = join(process.cwd(), 'public', 'posts');

  override getPosts(): Observable<Post[]> {
    const posts: Post[] = JSON.parse(readFileSync(join(this.carpeta, 'posts.json'), 'utf-8'));
    return of(BlogService.ordenar(posts));
  }

  override getPostContent(slug: string): Observable<string> {
    return of(readFileSync(join(this.carpeta, `${slug}.md`), 'utf-8'));
  }
}
