import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IVote } from 'src/app/interfaces/i-vote';
@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {


  @Input() upvotes : number | undefined=0;
  constructor() { }

  //userVote=new BehaviorSubject<>();

  ngOnInit(): void {
  }



  upvote(){
    console.log("upvote");
    
  }

  downvote(){
    console.log("downvote");
    
  }

}
