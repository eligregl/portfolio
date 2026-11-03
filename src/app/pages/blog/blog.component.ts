import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { Post } from '../../models/post.model';
import { formatearFecha } from '../../utils/fecha';

const PAGE_SIZE = 6;

@Component({
    selector: 'app-blog',
    imports: [RouterLink],
    templateUrl: './blog.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
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

  formatDate = formatearFecha;
}
