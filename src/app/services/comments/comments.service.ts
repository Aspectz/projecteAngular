import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, Subject } from 'rxjs';
import { IComment } from 'src/app/interfaces/i-comment';


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

  createComment(idPost:string,idComm:string,comment:IComment):Observable<{[key: string]:string}>{
    
    
    let date = new Date();
      let dateFormat = [
        date.getDate(),
        date.getMonth() + 1,
        date.getFullYear(),
      ].join("/");
      let newURL=`${this.url}/${idComm}/posts/${idPost}/comments.json?auth=${localStorage.getItem("IDToken")}`;
    
      comment.date=dateFormat;
      
    return this.http.post<{[key: string]:string}>(newURL,JSON.stringify(comment));
    
  }

  deleteComment(idCom:string,idPost:string,idComment:string):Observable<any>{
    return this.http.delete(`${this.url}/${idCom}/posts/${idPost}/comments/${idComment}.json?auth=${localStorage.getItem('IDToken')}`);
  }

}
