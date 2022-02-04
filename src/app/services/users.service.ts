import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IsActiveMatchOptions } from '@angular/router';
import { map, Observable } from 'rxjs';
import { IUserBD, IUserFirebaseAuth } from '../interfaces/i-user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  
  url="https://projectjs-b6bfe-default-rtdb.europe-west1.firebasedatabase.app/users"

  constructor(private http:HttpClient) { }


  getUser(nick:string):Observable<IUserBD>{
    let newUrl=`${this.url}/4hW7nPlU2ZgJooADcVSPm83F5DL2.json`;
    
    return this.http.get<IUserBD>(newUrl).pipe(
      map( s=>{
        return s;
      })
    );

  }


 /* getUser(nick:string):Observable<any>{
  
    return this.http.get<IUserBD>("  https://projectjs-b6bfe-default-rtdb.europe-west1.firebasedatabase.app/users.json").pipe(
     map( d => Object.entries(d)),
     map( x =>  x.map( ps => {
  
      let newUrl=`${this.url}/${ps[0]}.json`;
      
      return this.http.get<IUserBD>(newUrl).pipe(
        map( s=> { 
          return s;} )
      )
    
    })));
  }*/
  /*
  
   map(usuarios => { return Object.entries(usuarios)}),
        map(usuariosArray => usuariosArray.map(post => {
          
          return post[1].nickname==nick;
          
           }
      )));
  
  */ 
  
  
  createUser(user:IUserBD,id:string){
    return this.http.put<IUserBD>(`${this.url}/${id}.json?auth=${localStorage.getItem("IDToken")}`,JSON.stringify(user));

  }

}
