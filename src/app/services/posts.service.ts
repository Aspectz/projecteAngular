import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IPost } from '../interfaces/i-post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  url='https://projectjs-b6bfe-default-rtdb.europe-west1.firebasedatabase.app/communities/';
  
  constructor(private http:HttpClient) { }

  getPosts(comm:string):Observable<IPost[]>{
    return this.http.get<{[key:string]:IPost}>(`${this.url}${comm}.json`).pipe(
      map(communityObj => { console.log(communityObj);
       return Object.entries(communityObj['posts'])}),
      map(communityArray => communityArray.map(post => { post[1].id = post[0];
      return post[1] })));
  }
  
  getPost(comm:string,post:string):Observable<IPost>{

    console.log(comm,post);
    

    return this.http.get<IPost>(`${this.url}${comm}/posts/${post}.json`).pipe(
      map(p=>{ 
       return p})
    );
  }

}  
