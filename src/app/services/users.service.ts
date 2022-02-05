import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IsActiveMatchOptions } from '@angular/router';
import { map, mergeMap, Observable } from 'rxjs';
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
        console.log(user);
        
       return user 
      })
    );
  }

  getUser(id:string):Observable<IUserBD[]>{
    return this.http.get<IUserBD[]>(`${this.url}/${id}.json`).pipe( map( user => user));
  }


  
  createUser(user:IUserBD,id:string){
    return this.http.put<IUserBD>(`${this.url}/${id}.json?auth=${localStorage.getItem("IDToken")}`,JSON.stringify(user));

  }

}
