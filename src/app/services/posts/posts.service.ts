import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { IPost } from 'src/app/interfaces/i-post';



@Injectable({
  providedIn: 'root',
})
export class PostsService {
  url =
    'https://projectjs-b6bfe-default-rtdb.europe-west1.firebasedatabase.app/communities/';

  
  searchEvent=new BehaviorSubject<string>("");


  constructor(private http: HttpClient) {}

  
  getTransformedPosts(posts:IPost[]):IPost[]{
   return Object.entries(posts).map((communityObj) => {
    communityObj[1].id=communityObj[0];
    return communityObj[1];
   });
  }


  //Its not necessary to do 2 calls to the API if I've alreadygot the full community before.
 /* getPosts(comm: string): Observable<IPost[]> {
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
  }*/

  getPost(comm: string, post: string): Observable<IPost> {
    return this.http.get<IPost>(`${this.url}${comm}/posts/${post}.json`);
  }

  createPost(post:IPost):Observable<IPost>{
    return this.http.post<IPost>(`${this.url}/${post.community}/posts.json?auth=${localStorage.getItem("IDToken")}`,JSON.stringify(post));
  }
  deletePost(communityId:string,postId:string):Observable<any>{

    let deleteUrl=`${this.url}${communityId}/posts/${postId}.json?auth=${localStorage.getItem('IDToken')}`;
    return this.http.delete(deleteUrl);
  }
}
