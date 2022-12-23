import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { PostsService } from 'src/app/core/services/posts/posts.service';
import { UsersService } from 'src/app/core/services/users.service';
import { PostContainerComponent } from './post-container.component';
import { Post } from 'src/app/core/models/post';
import { User } from 'src/app/core/models/user';
import { Comment } from 'src/app/core/models/comment';

describe('PostContainerComponent', () => {
  let component: PostContainerComponent;
  let postsService: PostsService;
  let usersService: UsersService;
  let route: ActivatedRoute;
  let httpMock: HttpTestingController;

  const data: { user: User; post: Post; comments: Comment[] } = {
    user: { id: 1, name: 'User 1' } as User,
    post: { id: 1, userId: 1, title: 'Post 1', body: 'Body of post 1' },
    comments: [
      {
        id: 1,
        postId: 1,
        name: 'Comment 1',
        email: 'comment1@example.com',
        body: 'Body of comment 1',
      },
    ],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        PostsService,
        UsersService,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 1 }),
          },
        },
      ],
      declarations: [PostContainerComponent],
    });

    component = TestBed.inject(PostContainerComponent);
    postsService = TestBed.inject(PostsService);
    usersService = TestBed.inject(UsersService);
    route = TestBed.inject(ActivatedRoute);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call initPostPage', () => {
      spyOn(component, 'initPostPage');
      component.ngOnInit();
      expect(component.initPostPage).toHaveBeenCalled();
    });
  });

  describe('initDataWhenRecived', () => {
    it('should initialize the data when it is received', () => {
      component.initDataWhenRecived(data);

      expect(component.isLoading).toBeFalse();
      expect(component.post).toEqual(data.post);
      expect(component.post.name).toEqual(data.post.name);
      expect(component.comments).toEqual(data.comments);
    });
  });
});
