import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, mergeMap, Observable, throwError } from 'rxjs';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { UsersService } from '../users/users.service';
import { IUserBD, IUserFirebaseAuth } from 'src/app/interfaces/i-user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginUrl="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCQfKFKhNmRnUKNFUXRxIpywZct5hclFCM"
  private registerUrl="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCQfKFKhNmRnUKNFUXRxIpywZct5hclFCM"

  logged=new BehaviorSubject<boolean>(false);


  

  constructor(private http:HttpClient,private userService: UsersService) {
  
    
    this.isLogged() ? this.logged.next(true) : this.logged.next(false);
    

   }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };


  saveLoginData(localId:string,email:string,nickname:string,idToken:string,expiresIn:string){

      let data=new Date();
      
      let expires=data.getTime()+parseInt(expiresIn)*1000;
      
      localStorage.setItem("localId", localId);
      localStorage.setItem("email", email);
      localStorage.setItem("nickname", nickname);
      localStorage.setItem("IDToken", idToken);
      localStorage.setItem("expiresIn",expires.toString());
  }


  isLogged():boolean{
    let expiresIn=localStorage.getItem("expiresIn");
    let now=new Date();
    
    if(expiresIn){
      if(parseInt(expiresIn)>now.getTime()){
        return true;  
      }
      this.logout();
      return false;
    }    
      return false;

  }


  login(data:IUserFirebaseAuth):Observable<IUserFirebaseAuth>{
    let usuario={...data,returnSecureToken : true};
    
    return this.http.post<{email:string,idToken:string,localId:string,displayName:string,expiresIn:string}>(this.loginUrl,JSON.stringify(usuario),this.httpOptions).pipe(
      map(response=>{
          //console.log("log response"+response);
          this.saveLoginData(response.localId,response.email,response.displayName,response.idToken,response.expiresIn);
          this.logged.next(true);
          return usuario;
      }),
      catchError((resp:HttpErrorResponse)=> throwError(()=>{
        return resp.error.error.message;}
      ))
    )
  }

  
  register(userAuth:IUserFirebaseAuth,userDb:IUserBD):Observable<IUserBD>{
    let usuario={...userAuth,returnSecureToken : true,displayName:userDb.nickname}

    return this.http.post<{email:string,idToken:string,localId:string,displayName:string,expiresIn:string}>(this.registerUrl,JSON.stringify(usuario),this.httpOptions).pipe(
      mergeMap(response=>{
        this.saveLoginData(response.localId,response.email,response.displayName,response.idToken,response.expiresIn);
        this.logged.next(true);
        
        return this.userService.createUser(userDb,response.localId);;
      }),
      catchError((resp:HttpErrorResponse)=>throwError(()=>new Error(`Error de registro: ${resp.message}`)))
    )
  }  



  logout(){
    localStorage.removeItem("localId");
    localStorage.removeItem("email");
    localStorage.removeItem("nickname");
    localStorage.removeItem("IDToken");
    localStorage.removeItem("expiresIn");
    this.logged.next(false);
  }


}
