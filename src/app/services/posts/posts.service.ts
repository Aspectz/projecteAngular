import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IPost } from 'src/app/interfaces/i-post';
import { IGeneralVotes } from 'src/app/interfaces/i-vote';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  url =
    'https://projectjs-b6bfe-default-rtdb.europe-west1.firebasedatabase.app/communities/';

  constructor(private http: HttpClient) {}

  getPosts(comm: string): Observable<IPost[]> {
    return this.http
      .get<{ [key: string]: IPost }>(`${this.url}${comm}.json`)
      .pipe(
        map((communityObj) => {
            return Object.entries(communityObj['posts']);
        }),
        map((communityArray) =>
          communityArray.map((post) => {
            post[1].id = post[0];
            
            
            return post[1];
          })
        )
      );
  }

  getPost(comm: string, post: string): Observable<IPost> {
    

    return this.http.get<IPost>(`${this.url}${comm}/posts/${post}.json`).pipe(
      map((p) => {
        return p;
      })
    );
  }

  createPost(post:IPost):Observable<IPost>{
    return this.http.post<IPost>(`${this.url}/${post.community}/posts.json?auth=${localStorage.getItem("IDToken")}`,JSON.stringify(post));
  }
}
