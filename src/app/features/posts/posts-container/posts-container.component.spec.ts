import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { PostsContainerComponent } from './posts-container.component';
import { PostsService } from 'src/app/core/services/posts/posts.service';
import { UsersService } from 'src/app/core/services/users/users.service';
import { Post } from 'src/app/core/models/post';

describe('PostsContainerComponent', () => {
  let component: PostsContainerComponent;
  let postsService: PostsService;
  let usersService: UsersService;
  let router: Router;
  const post: Post = {
    id: 1,
    userId: 1,
    title: 'Post 1',
    body: 'Body of post 1',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [PostsContainerComponent],
      providers: [PostsService, UsersService],
    });

    component = TestBed.inject(PostsContainerComponent);
    postsService = TestBed.inject(PostsService);
    usersService = TestBed.inject(UsersService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('openPostInNewWindow', () => {
    it('should open the post in a new window', () => {
      const spy = spyOn(window, 'open').and.callThrough();

      component.openPostInNewWindow(post);

      const expectedUrl = router.serializeUrl(
        router.createUrlTree([`/post/1`])
      );
      expect(spy).toHaveBeenCalledWith(expectedUrl, '_blank');
    });
  });
});
