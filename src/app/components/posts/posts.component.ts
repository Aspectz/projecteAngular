import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IComment } from 'src/app/interfaces/i-comment';
import { IPost } from 'src/app/interfaces/i-post';

@Component({
  selector: '  app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {


  @Input() post? : IPost;

  @Output() refreshVotes =new EventEmitter<any>();
  
  numberComments:number=0;

  constructor() { }

  ngOnInit(): void {
    
      this.numberComments=this.post?.comments ? Object.entries(this.post.comments!).length : 0;
    
    
  }

}
