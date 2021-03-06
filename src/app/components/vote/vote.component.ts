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
    
    this.votesCount=this.votes?.totalVotes ? this.votes.totalVotes : 0;
    this.hasVoted = this.whathasVoted();
   
  }

  whathasVoted(): boolean | null {

    let voted = null;
    if (this.votes != undefined && localStorage.getItem('localId') ) {
      Object.entries(this.votes).map((vote) => {
        if(vote[0]==localStorage.getItem('localId') && vote[0]!="totalVotes"){
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
        
        if(vote[0]!="totalVotes"){
          this.votesCount =
            vote[1].type == 'upvote'
              ? (this.votesCount += 1)
              : (this.votesCount -= 1);
          }
      });
      
    }
  }
  refreshVotes() {
    this.voteService.getVotes(this.community!, this.post!).subscribe((data) => {
      
      
      this.votes = data;
      this.whathasVoted();
      this.getVoteCount();
    

      this.voteService.changeVoteCount(this.votesCount,this.community!,this.post!).subscribe(d => d);
        return data;
    });
  }

  getClassDown(): string {
    return this.hasVoted == false ? 'downVote' : '';
  }

  getClassUp(): string {
    return this.hasVoted ? 'upVote' : '';
  }

  voteTest(voteType: string) {
    if (localStorage.getItem('nickname')) {
      this.voteService
        .vote(voteType, this.hasVoted, this.community!, this.post!)
        .subscribe((data) => {
          this.hasVoted = data;

          this.refreshVotes();
          
          
          return data;
        });
    }else{
      this.sendError.emit({"value":true,"error":"You must be logged to vote"})
    }
  }
}
