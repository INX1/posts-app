import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostContainerComponent } from './post-container/post-container.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PostRoutingModule } from './post-routing.module';

@NgModule({
  declarations: [PostContainerComponent],
  imports: [CommonModule, PostRoutingModule, SharedModule],
})
export class PostModule {}
