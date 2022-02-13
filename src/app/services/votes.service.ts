import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, switchMap } from 'rxjs';
import { IVote } from '../interfaces/i-vote';

@Injectable({
  providedIn: 'root'
})
export class VotesService {

  url="https://projectjs-b6bfe-default-rtdb.europe-west1.firebasedatabase.app/communities/"
  
  userVote : boolean | null;
  

  constructor(private http:HttpClient) {
    this.userVote=null;
   }


  getVotes(idCom:string,idPost:string):Observable<IVote[]>{
    return this.http.get<IVote[]>(`${this.url}/${idCom}/posts/${idPost}/votes.json`).pipe(
      map(d=>{
        return d;
      })
    );
  }


  deleteVote(idComm:string,idPost:string,idVote:string):Observable<any>{
    let deleteUrl=`${this.url}${idComm}/posts/${idPost}/votes/${idVote}.json?auth=${localStorage.getItem("IDToken")}`;
    return this.http.delete(deleteUrl);

  }


  vote(voteType:string,votedUser:boolean | null,idComm:string,idPost:string,idVote?:string,):Observable<boolean | null>{
    
    this.userVote=votedUser;
    

    let upvoteUrl=`${this.url}${idComm}/posts/${idPost}/votes`;
  
    let vote:IVote= { "user":localStorage.getItem("nickname")!.toString(),"type":voteType }

    
    if(this.userVote==null){
      return this.http.post(`${upvoteUrl}.json?auth=${localStorage.getItem("IDToken")}`,JSON.stringify(vote)).pipe(
        switchMap((response)=> of(voteType=="upvote" ? true : false)));
     
    }
    else if(this.userVote){
      if(voteType=="upvote")
         return this.deleteVote(idComm,idPost,idVote!).pipe(switchMap((response)=>  of(null)));
      return this.http.put(`${upvoteUrl}/${idVote!}.json?auth=${localStorage.getItem("IDToken")}`,JSON.stringify(vote)).pipe( switchMap((resp)=>of(false)))
      
    }
    else if(!this.userVote){
      if(voteType=="upvote")
       return this.http.put(`${upvoteUrl}/${idVote!}.json?auth=${localStorage.getItem("IDToken")}`,JSON.stringify(vote)).pipe(switchMap((resp)=>of(true)))
       return this.deleteVote(idComm,idPost,idVote!).pipe(switchMap((response)=> of(null)));
    }
    return new Observable<any>();
  }

  
}
