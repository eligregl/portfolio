import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from '../models/post.model';

@Injectable({ providedIn: 'root' })
export class BlogService {
  private http = inject(HttpClient);

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>('posts/posts.json').pipe(
      map(posts => posts.sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
      ))
    );
  }

  getPostContent(slug: string): Observable<string> {
    return this.http.get(`posts/${slug}.md`, { responseType: 'text' });
  }
}
