import { Component, Input, OnInit } from '@angular/core';
import { IComment } from 'src/app/interfaces/i-comment';
import { IPost } from 'src/app/interfaces/i-post';

@Component({
  selector: '  app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {


  @Input() post? : IPost;

  

  constructor() { }

  ngOnInit(): void {
  }

  upvotes(){
    //Necessitarem un output i input per als votos
    
    
  }

}
