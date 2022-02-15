import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IGeneralVotes, IVote } from 'src/app/interfaces/i-vote';
import { VotesService } from 'src/app/services/votes/votes.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css'],
})
export class VoteComponent implements OnInit {
  @Input() votes?: IGeneralVotes | undefined;
  @Input() community: string | undefined;
  @Input() post: string | undefined;

  @Output() sendError=new EventEmitter<any>();
  constructor(private voteService: VotesService) {}

  votesCount: number = 0;

  hasVoted: boolean | null = null;

  ngOnInit(): void {
    console.log("VVotos"); 
    console.log(this.votes);
    

    //this.getVoteCount();
    this.hasVoted = this.whathasVoted();
    this.votesCount=this.votes?.totalVotes ? this.votes.totalVotes : 0;

  console.log("votesvcount "+this.votesCount);
  

    this.voteService.hasVotedSubject.next(this.hasVoted);
    this.voteService.hasVotedSubject.subscribe(newValue=>{      
      this.hasVoted=newValue});
    this.voteService.voteCountSubject.next(this.votesCount)
    this.voteService.voteCountSubject.subscribe(newValue=>{
      console.log("newValue "+newValue);
      
      this.votesCount=newValue;
    })
  }

  whathasVoted(): boolean | null {
    let voted = null;
    if (this.votes != undefined) {
      Object.entries(this.votes).map((vote) => {
        if (vote[1].user == localStorage.getItem('nickname')) {
          voted = vote[1].type == 'upvote' ? true : false;
        }
      });
    }    
    return voted;
  }
  //TODO: refrescar al logout

  getVoteCount() {
    
   
    
    this.votesCount = 0;
    if (this.votes != undefined) {
      
      
      Object.entries(this.votes).map((vote) => {
        if(vote[1].type)
          this.votesCount =vote[1].type == 'upvote'? (this.votesCount += 1) : (this.votesCount -= 1);
      });
    }
    
    
    
    
    
  }
  refreshVotes() {
    this.voteService.getVotes(this.community!, this.post!).subscribe((data) => {
      
      this.votes = data;
      console.log("newvotes",this.votes);
      
      this.getVoteCount();
      
      
      return data;
    });
  }

  getClassDown(): string {
    return this.hasVoted == false ? 'downVote' : '';
  }

  getClassUp(): string {
    //console.log("entra despres "+this.hasVoted);
    
    return this.hasVoted ? 'upVote' : '';
  }

  voteTest(voteType: string) {
    if (localStorage.getItem('nickname')) {
      this.voteService
        .vote(voteType, this.hasVoted, this.community!, this.post!,this.votesCount)
        .subscribe((data) => {
          console.log("cambiao");
          
          //this.refreshVotes();
              
          return data;
        });
    }else{
      this.sendError.emit({"value":true,"error":"You must be logged to vote"})
    }
  }
}
