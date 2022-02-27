import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ICommunity } from 'src/app/interfaces/i-community';



@Injectable({
  providedIn: 'root'
})
export class CommunitiesService {
  
  urlCommunities:string="https://projectjs-b6bfe-default-rtdb.europe-west1.firebasedatabase.app/.json";
  urlCommunity:string="https://projectjs-b6bfe-default-rtdb.europe-west1.firebasedatabase.app/communities"
  constructor(private http:HttpClient) {
   }

   getCommunities():Observable<ICommunity[]>{
    return this.http.get<{communities:ICommunity[]}>(this.urlCommunities).pipe( map(resp=>{ 
      return resp.communities}));
   }
   getCommunityByName(name:string):Observable<ICommunity>{
     return this.http.get<ICommunity>(`${this.urlCommunity}/${name}.json`);
  }

  createCommunity(community:ICommunity):Observable<ICommunity>{
    return this.http.put<ICommunity>(`${this.urlCommunity}/${community.name}.json?auth=${localStorage.getItem('IDToken')}`,JSON.stringify(community));
  }
  deleteCommunity(idCommunity:string):Observable<any>{
    return this.http.delete(`${this.urlCommunity}/${idCommunity}.json?auth=${localStorage.getItem('IDToken')}`);
  }

  

}
