import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsContainerComponent } from './posts-container/posts-container.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PostsRoutingModule } from './posts-routing.module';
import { FormsModule } from '@angular/forms';
import { PostCommentsComponent } from './post-comments/post-comments.component';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [PostsContainerComponent, PostCommentsComponent],
  imports: [
    CommonModule,
    PostsRoutingModule,
    SharedModule,
    FormsModule,
    ScrollingModule,
  ],
})
export class PostsModule {}
