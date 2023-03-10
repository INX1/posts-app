import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostContainerComponent } from './post-container/post-container.component';

const routes: Routes = [
    {
        path: '',
        component: PostContainerComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PostRoutingModule {}
