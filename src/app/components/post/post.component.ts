import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPost } from 'src/app/interfaces/i-post';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor(private router : ActivatedRoute,private postService:PostsService) { }

  post :IPost | undefined;

  ngOnInit(): void {


    this.router.params.subscribe(params=>{
        
        this.postService.getPost(params['idCom'],params['id']).subscribe(data=>{ this.post=data});
      
    });
  }

}
