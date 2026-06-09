import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { Post } from '../../models/post.model';

const PAGE_SIZE = 6;

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit {
  private blogService = inject(BlogService);

  allPosts: Post[] = [];
  visibleCount = PAGE_SIZE;

  get visiblePosts(): Post[] {
    return this.allPosts.slice(0, this.visibleCount);
  }

  get hasMore(): boolean {
    return this.visibleCount < this.allPosts.length;
  }

  ngOnInit() {
    this.blogService.getPosts().subscribe(posts => {
      this.allPosts = posts;
    });
  }

  loadMore() {
    this.visibleCount += PAGE_SIZE;
  }

  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('es-CO', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  }
}
