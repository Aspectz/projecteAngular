import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IPost } from '../interfaces/i-post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  
  
  constructor(private http:HttpClient) { }

  getPosts(url:string):Observable<IPost[]>{
    return this.http.get<{[key:string]:IPost}>(url).pipe(
      map(communityObj => Object.entries(communityObj['posts'])),
      map(communityArray => communityArray.map(post => { post[1].id = post[0];
      return post[1] })));
  }
  

}  
