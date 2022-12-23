import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/core/models/post';
import { Comment } from 'src/app/core/models/comment';


@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private postsUrl: string ='https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postsUrl);
  }

  getPost(postId: number): Observable<Post> {
    return this.http.get<Post>(`${this.postsUrl}/${postId}`);
  }

  getComments(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.postsUrl}/${postId}/comments`);
  }
}
