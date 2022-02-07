import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPost } from 'src/app/interfaces/i-post';
import { CommentsService } from 'src/app/services/comments.service';
import { LoginService } from 'src/app/services/login.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor(private router : ActivatedRoute,private postService:PostsService,private login: LoginService,private commentService : CommentsService) { }

  isLogged:boolean=false;

  post :IPost | undefined;

  idComm:string="";
  id:string="";
  
  comment :string='';

  comments : any ;

  ngOnInit(): void {

    this.isLogged=this.login.isLogged();
    this.login.logged.subscribe(log=>this.isLogged=log);
    
    this.commentService.newCommentSub.subscribe( data=>{ 
      
      this.postService.getPost(this.idComm,this.id).subscribe(data=>{
        this.comments=data.comments;
        this.comments=  this.comments==undefined ? undefined : Object.values(this.comments);
      });

     return data}  )

    this.router.params.subscribe(params=>{
        
        this.postService.getPost(params['idCom'],params['id']).subscribe(data=>{ 
          this.idComm=params['idCom'];
          this.id=params['id'];
          this.post=data;
          this.comments=this.post.comments;
          this.comments=  this.comments==undefined ? undefined : Object.values(this.comments);
        });
    });
  }


  newComment(){
    this.commentService.createComment(this.id,this.idComm,this.comment);
    this.comment="";
  }


}
