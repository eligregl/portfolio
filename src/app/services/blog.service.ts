import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from '../models/post.model';

@Injectable({ providedIn: 'root' })
export class BlogService {
  private http = inject(HttpClient);

  /** Del más reciente al más antiguo. Las fechas AAAA-MM-DD se ordenan como texto. */
  static ordenar(posts: Post[]): Post[] {
    return [...posts].sort((a, b) => b.date.localeCompare(a.date));
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>('posts/posts.json').pipe(
      map(posts => BlogService.ordenar(posts))
    );
  }

  getPostContent(slug: string): Observable<string> {
    return this.http.get(`posts/${slug}.md`, { responseType: 'text' });
  }
}
