import { Component, Input, OnInit } from '@angular/core';
import { IComment } from 'src/app/interfaces/i-comment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input() comments? : IComment;
  constructor() { }

  

  ngOnInit(): void {
  }

}
