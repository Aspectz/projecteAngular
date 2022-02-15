import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, switchMap } from 'rxjs';
import { IGeneralVotes, IVote } from 'src/app/interfaces/i-vote';

@Injectable({
  providedIn: 'root',
})
export class VotesService {
  url =
    'https://projectjs-b6bfe-default-rtdb.europe-west1.firebasedatabase.app/communities/';

  userVote: boolean | null;
//FERO AMB OUTPUT I EVENT EMITTER

  hasVotedSubject = new BehaviorSubject<boolean | null>(null);
  voteCountSubject=new BehaviorSubject<number>(0);
  constructor(private http: HttpClient) {
    this.userVote = null;
  }

  getVotes(idCom: string, idPost: string): Observable<IGeneralVotes> {
    return this.http
      .get<IGeneralVotes>(`${this.url}/${idCom}/posts/${idPost}/votes.json`)
      .pipe(
        map((d) => {
          return d;
        })
      );
  }

  deleteVote(idComm: string, idPost: string, idVote: string): Observable<any> {
    let deleteUrl = `${
      this.url
    }${idComm}/posts/${idPost}/votes/${idVote}.json?auth=${localStorage.getItem(
      'IDToken'
    )}`;
    return this.http.delete(deleteUrl);
  }

  changeVoteCount(votecount: number, idComm: string, idPost: string) {
   
    console.log("Change "+votecount);
    
    
    return this.http.put(
      `${
        this.url
      }${idComm}/posts/${idPost}/votes/totalVotes.json?auth=${localStorage.getItem(
        'IDToken'
      )}`,
      votecount
    );
  }

  vote(
    voteType: string,
    votedUser: boolean | null,
    idComm: string,
    idPost: string,
    votecount: number
  ) {
    this.userVote = votedUser;

    let upvoteUrl = `${this.url}${idComm}/posts/${idPost}/votes`;

    let vote: IVote = {
      user: localStorage.getItem('nickname')!.toString(),
      type: voteType,
    };

    let localId = localStorage.getItem('localId');

   // console.log('Votat antes ' + this.userVote);
   // console.log('votat ara ' + voteType);

   console.log("VOTECOUNT ANTES"+votecount);
    if (this.userVote == null) {
      return this.http.put(`${upvoteUrl}/${localId}.json?auth=${localStorage.getItem('IDToken')}`,JSON.stringify(vote)  )
        .pipe(
          map((response) => {
            this.changeVoteCount( voteType == 'upvote' ? votecount+=1 : votecount-=1,idComm,idPost).subscribe((resp) => {
              
              
              this.hasVotedSubject.next(voteType == 'upvote' ? true : false);
              this.voteCountSubject.next(Number(resp));
              return resp;
            });
            return response;
          })
        );
    } 
    else if (this.userVote) {
      if (voteType == 'upvote')//-- null
        return this.deleteVote(idComm, idPost, localId!).pipe(
         map(resp=>{
          this.changeVoteCount(votecount-=1,idComm,idPost).subscribe((resp)=>{
            this.hasVotedSubject.next(null);
            this.voteCountSubject.next(Number(resp));
            return resp;
          })  
           return resp;
         })
        );
      return this.http//-2 false
        .put(
          `${upvoteUrl}/${localId!}.json?auth=${localStorage.getItem(
            'IDToken'
          )}`,
          JSON.stringify(vote)
        )
        .pipe(
          map(resp=>{
            console.log("Prechange"+votecount);
            this.changeVoteCount(votecount-=2,idComm,idPost).subscribe(resp=>{
              this.hasVotedSubject.next(false)
              this.voteCountSubject.next(Number(resp));;
              return resp;
            })
            return resp;
          })
        );
    } else if (!this.userVote) {
      if (voteType == 'upvote')//+2 true
        return this.http
          .put(
            `${upvoteUrl}/${localId!}.json?auth=${localStorage.getItem(
              'IDToken'
            )}`,
            JSON.stringify(vote)
          )
          .pipe(
            map(resp=>{
              console.log("Prechange"+votecount);
              
              this.changeVoteCount(votecount+=2,idComm,idPost).subscribe(resp=>{
                this.hasVotedSubject.next(true);
                this.voteCountSubject.next(Number(resp));
              })
              return resp;
            })
          );
      return this.deleteVote(idComm, idPost, localId!).pipe(//-1 null
        map(resp=>{
          this.changeVoteCount(votecount+=1,idComm,idPost).subscribe(resp=>
            {this.hasVotedSubject.next(null)
            this.voteCountSubject.next(Number(resp));}
            );
        })
      );
    }
    return new Observable<any>();
  }
}
