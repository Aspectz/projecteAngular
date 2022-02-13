import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IsActiveMatchOptions } from '@angular/router';
import { EMPTY, map, mergeMap, Observable, of } from 'rxjs';
import { ICommunity } from '../interfaces/i-community';
import { IUserBD, IUserFirebaseAuth } from '../interfaces/i-user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  
  url="https://projectjs-b6bfe-default-rtdb.europe-west1.firebasedatabase.app/users"

  constructor(private http:HttpClient) { }

  
  getUsers():Observable<IUserBD[]>{
    return this.http.get<{  [key:string]: IUserBD}>(this.url+".json")
    .pipe(
      map(  userObject=> Object.entries(userObject)),
      map( userArray=> userArray.map(s=>  {  
        return s[1]}   
        ))
      );
  }

  checkNickName(nick:string):Observable<IUserBD>{
    return this.http.get<IUserBD>(`${this.url}.json?orderBy="nickname"&equalTo="${nick}"`).pipe(
      map(user=>{ 
       return user 
      })
    );
  }

  getUser(id:string):Observable<IUserBD>{
    return this.http.get<IUserBD>(`${this.url}/${id}.json`).pipe( map( user => user));
  }
  createUser(user:IUserBD,id:string){
    return this.http.put<IUserBD>(`${this.url}/${id}.json?auth=${localStorage.getItem("IDToken")}`,JSON.stringify(user));
  }

  deleteUserCommunity(user:string,community:string):Observable<ICommunity[]>{
    return this.http.delete<ICommunity[]>(`${this.url}/${user}/communities/${community}.json?auth=${localStorage.getItem("IDToken")}`);
  }
  createUserCommunity(user:string,communityId:string):Observable<ICommunity[]>{
    return this.http.put<ICommunity[]>(`${this.url}/${user}/communities/${communityId}.json?auth=${localStorage.getItem("IDToken")}`,JSON.stringify(communityId));
  }


}
