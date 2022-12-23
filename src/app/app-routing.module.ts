import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/posts/posts.module').then((m) => m.PostsModule),
  },
  {
    path: 'posts',
    loadChildren: () =>
      import('./features/posts/posts.module').then((m) => m.PostsModule),
  },
  {
    path: 'post/:id',
    loadChildren: () =>
      import('./features/post/post.module').then((m) => m.PostModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
