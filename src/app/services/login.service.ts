import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { IUser } from '../interfaces/i-user';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginUrl="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCQfKFKhNmRnUKNFUXRxIpywZct5hclFCM"
  private registerUrl="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCQfKFKhNmRnUKNFUXRxIpywZct5hclFCM"

  constructor(private http:HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };



  login(data:IUser):Observable<IUser>{
    let usuario={...data,returnSecureToken : true};
    delete usuario.nickname;    
    return this.http.post<{email:string,idToken:string}>(this.loginUrl,JSON.stringify(usuario),this.httpOptions).pipe(
      map(response=>{

        return usuario}),
      catchError((resp:HttpErrorResponse)=> throwError(()=> new Error(`Error de Login: ${resp.message}`)))
    )
  }
  


}
