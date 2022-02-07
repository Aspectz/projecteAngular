import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Subject } from 'rxjs';
import { IComment } from '../interfaces/i-comment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http : HttpClient) { }


  newCommentSub = new Subject<IComment>();


  url="https://projectjs-b6bfe-default-rtdb.europe-west1.firebasedatabase.app/communities"
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  createComment(idPost:string,idComm:string,comment:string){
    
    
    let date = new Date();
      let dateFormat = [
        date.getDate(),
        date.getMonth() + 1,
        date.getFullYear(),
      ].join("/");
      console.log(idPost,idComm,comment);
      
      let newURL=`${this.url}/${idComm}/posts/${idPost}/comments.json?auth=${localStorage.getItem("IDToken")}`;
    

    let newComment : IComment= { "comment" : comment , "date":dateFormat,"user":localStorage.getItem("nickname")!.toString() }
   
   
    
    
    this.http.post(newURL,JSON.stringify(newComment)).subscribe(data=>{
      this.newCommentSub.next(newComment);
     return data});
    
    
  

  }

}
