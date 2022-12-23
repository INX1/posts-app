import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './components/post/post.component';
import { CommentComponent } from './components/comment/comment.component';
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    PostComponent,
    CommentComponent,
    SearchFilterPipe,
    LoadingSpinnerComponent,
  ],
  imports: [CommonModule],
  exports: [
    PostComponent,
    CommentComponent,
    SearchFilterPipe,
    LoadingSpinnerComponent,
  ],
})
export class SharedModule {}
