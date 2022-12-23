import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comment } from 'src/app/core/models/comment';
import { Observable } from 'rxjs';
import { Post } from 'src/app/core/models/post';
import { PostsService } from 'src/app/core/services/posts/posts.service';

@Component({
  selector: 'app-post-comments',
  templateUrl: './post-comments.component.html',
  styleUrls: ['./post-comments.component.scss'],
})
export class PostCommentsComponent implements OnInit {
  @Input() post: Post;
  @Output() itemClick: EventEmitter<Post> = new EventEmitter();
  comments$: Observable<Comment[]>;
  toggleComments = false;
  toggleCommentsText = 'Show comments';

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {}

  showComments(post: Post) {
    this.toggleComments = !this.toggleComments;
    this.toggleCommentsTextButton()
    this.comments$ = this.postsService.getComments(post.id);
  }

  toggleCommentsTextButton() {
    this.toggleComments
      ? (this.toggleCommentsText = 'Hide comments')
      : (this.toggleCommentsText = 'Show comemnts');
  }

  onPostClick() {
    this.itemClick.emit(this.post);
  }
}
