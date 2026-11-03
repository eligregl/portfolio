import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { Post } from '../../models/post.model';

@Component({
    selector: 'app-home',
    imports: [RouterLink],
    templateUrl: './home.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  private blogService = inject(BlogService);
  recentPosts: Post[] = [];

  ngOnInit() {
    this.blogService.getPosts().subscribe(posts => {
      this.recentPosts = posts.slice(0, 3);
    });
  }
}
