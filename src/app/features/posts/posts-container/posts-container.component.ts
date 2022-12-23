import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, map, Observable } from 'rxjs';
import { Post } from 'src/app/core/models/post';
import { Comment } from 'src/app/core/models/comment';
import { PostsService } from 'src/app/core/services/posts/posts.service';
import { UsersService } from 'src/app/core/services/users/users.service';

@Component({
  selector: 'app-posts-container',
  templateUrl: './posts-container.component.html',
  styleUrls: ['./posts-container.component.scss'],
})
export class PostsContainerComponent implements OnInit {
  searchTerm: string = '';
  posts$: Observable<Post[]>;
  comments$: Observable<Comment[]>;

  constructor(
    private postsService: PostsService,
    private usersService: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.posts$ = forkJoin({
      posts: this.postsService.getPosts(),
      users: this.usersService.getUsers(),
    }).pipe(
      map((data) => {
        return data.posts.map((post) => ({
          ...post,
          name: data.users.find((user) => user.id === post.userId)?.name,
        }));
      })
    );
  }

  openPostInNewWindow(post: Post) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/post/${post.id}`])
    );

    window.open(url, '_blank');
  }
}
