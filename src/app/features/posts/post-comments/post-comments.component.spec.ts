import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PostCommentsComponent } from './post-comments.component';
import { PostsService } from 'src/app/core/services/posts/posts.service';
import { Post } from 'src/app/core/models/post';
import { of } from 'rxjs';

describe('PostCommentsComponent', () => {
  let component: PostCommentsComponent;
  let postsService: PostsService;
  const post: Post = {
    id: 1,
    userId: 1,
    title: 'Post 1',
    body: 'Body of post 1',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [PostCommentsComponent],
      providers: [PostsService],
    });

    component = TestBed.inject(PostCommentsComponent);
    postsService = TestBed.inject(PostsService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('showComments', () => {
    it('should show the comments for the given post', () => {
      const spy = spyOn(postsService, 'getComments').and.returnValue(of([]));
      const spyToggleCommentsTextButton = spyOn(component, 'toggleCommentsTextButton');

      component.showComments(post);

      expect(spy).toHaveBeenCalledWith(1);
      expect(component.toggleComments).toBeTrue();
      expect(component.toggleCommentsText).toEqual('Hide comments');

      component.showComments(post);

      expect(spyToggleCommentsTextButton).toHaveBeenCalled();
      expect(component.toggleComments).toBeFalse();
      expect(component.toggleCommentsText).toEqual('Show comments');
    });
  });

  describe('onPostClick', () => {
    it('should emit the post on itemClick', () => {
      component.post = post;

      const spy = spyOn(component.itemClick, 'emit').and.callThrough();
      component.onPostClick();

      expect(spy).toHaveBeenCalledWith(post);
    });
  });
});
