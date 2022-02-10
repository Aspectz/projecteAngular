import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPost } from 'src/app/interfaces/i-post';
import { IVote } from 'src/app/interfaces/i-vote';
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

  numberComments:number=0;
  comment :string='';
  comments : any ;
  
  //error
  hasError:boolean=false;
  errorMsg:string="";

  ngOnInit(): void {

    this.isLogged=this.login.isLogged();
    this.login.logged.subscribe(log=>this.isLogged=log);
    
    this.commentService.newCommentSub.subscribe( data=>{ 
      this.postService.getPost(this.idComm,this.id).subscribe(data=>{
        this.comments=data.comments;
        this.comments=  this.comments==undefined ? undefined : Object.values(this.comments);
        this.numberComments=this.comments ? Object.entries(this.comments).length : 0;
      });
     return data;
    });

    this.router.params.subscribe(params=>{
      
        
        this.postService.getPost(params['idCom'],params['id']).subscribe(data=>{ 
          this.idComm=params['idCom'];
          this.id=params['id'];
          this.post=data;
          this.comments=this.post.comments;
          
          this.comments= this.comments==undefined ? undefined : Object.values(this.comments);
          this.numberComments=this.comments ? Object.entries(this.comments).length : 0;
        });
    });
  }


  newComment(){
    this.commentService.createComment(this.id,this.idComm,this.comment);
    this.comment="";
  }

  getError(error:any){
    this.hasError=error.value;
    this.errorMsg=error.error;

    setTimeout(() => {
      this.hasError=false;
    },5000);

  }


}
