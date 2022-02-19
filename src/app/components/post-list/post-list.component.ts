import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IPost } from 'src/app/interfaces/i-post';

@Component({
  selector: '  app-posts',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {


  @Input() post? : IPost;

  @Output() error =new EventEmitter<any>();
  

  

  numberComments:number=0;

  constructor() { }

  ngOnInit(): void {
    this.numberComments=this.post?.comments ? Object.entries(this.post.comments!).length : 0;
    
    
  }

  //Send error to homeComponent
  sendError(error:any){
    this.error.emit(error);
    
  }

}
