import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { PostsService } from './posts.service';
import { Post } from 'src/app/core/models/post';
import { Comment } from 'src/app/core/models/comment';

describe('PostsService', () => {
  let service: PostsService;
  let httpMock: HttpTestingController;
  const dummyPosts: Post[] = [
    { id: 1, userId: 1, title: 'Post 1', body: 'Body of post 1' },
    { id: 2, userId: 3, title: 'Post 2', body: 'Body of post 2' },
  ];
  const dummyComments: Comment[] = [
    {
      id: 1,
      postId: 1,
      name: 'Comment 1',
      email: 'comment1@example.com',
      body: 'Body of comment 1',
    },
    {
      id: 2,
      postId: 3,
      name: 'Comment 2',
      email: 'comment2@example.com',
      body: 'Body of comment 2',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostsService],
    });

    service = TestBed.inject(PostsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getPosts', () => {
    it('should return an Observable of Post[]', () => {
      service.getPosts().subscribe((posts) => {
        expect(posts).toEqual(dummyPosts);
      });

      const req = httpMock.expectOne(
        `https://jsonplaceholder.typicode.com/posts`
      );
      expect(req.request.method).toBe('GET');
      req.flush(dummyPosts);
    });
  });

  describe('getPost', () => {
    it('should return an Observable of Post', () => {
      const postId = 1;

      service.getPost(postId).subscribe((post) => {
        expect(post).toEqual(dummyPosts[0]);
      });

      const req = httpMock.expectOne(
        `https://jsonplaceholder.typicode.com/posts/1`
      );
      expect(req.request.method).toBe('GET');
      req.flush(dummyPosts[0]);
    });
  });

  describe('getComments', () => {
    it('should return an Observable of Comment[]', () => {
      const postId = 1;

      service.getComments(postId).subscribe((comments) => {
        expect(comments).toEqual(dummyComments);
      });

      const req = httpMock.expectOne(
        `https://jsonplaceholder.typicode.com/posts/1/comments`
      );
      expect(req.request.method).toBe('GET');
      req.flush(dummyComments);
    });
  });
});
