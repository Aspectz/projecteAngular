import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IComment } from 'src/app/interfaces/i-comment';
import { CommentsService } from 'src/app/services/comments/comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input() comments? : IComment;
  @Input() idPost?:string;
  @Input() idCommunity?:string;
  @Output() deleteCommentEmitter=new EventEmitter();
  constructor(private commentService:CommentsService) {}

  ngOnInit(): void {
  }

  deleteComment(){
    if(confirm("Are you sure u want to delete this comment?")){
      this.commentService.deleteComment(this.idCommunity!,this.idPost!,this.comments!.id!).subscribe(d=>
        this.deleteCommentEmitter.emit());
    }
  }

}
