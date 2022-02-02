import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ICommunity } from '../interfaces/i-community';
import { IPost } from '../interfaces/i-post';

@Injectable({
  providedIn: 'root'
})
export class CommunitiesService {
  
  urlCommunities:string="https://projectjs-b6bfe-default-rtdb.europe-west1.firebasedatabase.app/.json";
  constructor(private http:HttpClient) {
   }

   getCommunities():Observable<ICommunity[]>{
    return this.http.get<{communities:ICommunity[]}>(this.urlCommunities).pipe( map(resp=>{ 
      return resp.communities}));
   }

}
