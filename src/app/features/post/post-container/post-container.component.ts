import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first, forkJoin, of, switchMap } from 'rxjs';
import { Post } from 'src/app/core/models/post';
import { PostsService } from 'src/app/core/services/posts/posts.service';
import { Comment } from 'src/app/core/models/comment';
import { UsersService } from 'src/app/core/services/users/users.service';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-post-container',
  templateUrl: './post-container.component.html',
  styleUrls: ['./post-container.component.scss'],
})
export class PostContainerComponent implements OnInit {
  postId: number;
  post: Post;
  comments: Comment[];
  isLoading: boolean;

  constructor(
    private postsService: PostsService,
    private usersService: UsersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initPostPage();
  }

  initPostPage() {
    this.isLoading = true;
    this.route.params
      .pipe(
        switchMap((params) => {
          const postId = params['id'];
          return forkJoin({
            post: this.postsService.getPost(postId),
            comments: this.postsService.getComments(postId),
          });
        }),
        switchMap((postComments) => {
          return forkJoin({
            user: this.usersService.getUser(postComments.post.userId),
            post: of(postComments.post),
            comments: of(postComments.comments),
          });
        }),
        first()
      )
      .subscribe((data) => {
        this.initDataWhenRecived(data);
      });
  }

  initDataWhenRecived(data: { user: User; post: Post; comments: Comment[] }) {
    this.isLoading = false;
    this.post = data.post;
    this.post.name = data.user.name;
    this.comments = data.comments;
  }
}
