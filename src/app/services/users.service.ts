import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserBD, IUserFirebaseAuth } from '../interfaces/i-user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  
  url="https://projectjs-b6bfe-default-rtdb.europe-west1.firebasedatabase.app/users"

  constructor(private http:HttpClient) { }


  
  createUser(user:IUserBD,id:string){
    return this.http.put<IUserBD>(`${this.url}/${id}.json?auth=${localStorage.getItem("IDToken")}`,JSON.stringify(user));

  }

}
