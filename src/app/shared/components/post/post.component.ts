import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from 'src/app/core/models/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() post: Post;
  @Input() toggleComments: boolean;
  @Input() toggleCommentsText: string;
  @Input() hideShowCommentsButton: boolean = false;

  @Output() itemClick: EventEmitter<Post> = new EventEmitter();
  @Output() showCommentsClick: EventEmitter<Post> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onPostClick() {
    this.itemClick.emit(this.post);
  }

  onShowCommentsClick(event: MouseEvent) {
    event.stopPropagation();
    this.showCommentsClick.emit(this.post);
  }
}
