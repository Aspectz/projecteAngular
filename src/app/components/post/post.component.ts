import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';
import { IComment } from 'src/app/interfaces/i-comment';
import { IPost } from 'src/app/interfaces/i-post';
import { CommentsService } from 'src/app/services/comments/comments.service';
import { LoginService } from 'src/app/services/login/login.service';
import { PostsService } from 'src/app/services/posts/posts.service';





@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor(private router : ActivatedRoute,private postService:PostsService,private login: LoginService,private commentService : CommentsService,private navigateRouter:Router) { }

  isLogged:boolean=false;

  post :IPost | undefined;

  idComm:string="";
  postId:string="";

  numberComments:number=0;
  comment :string='';
  comments : IComment[]=[];
  
  isAuthor:boolean=false;
  //error
  hasError:boolean=false;
  errorMsg:string="";

  ngOnInit(): void {

    
    this.isLogged=this.login.isLogged();

    this.login.logged.subscribe(log=>this.isLogged=log);


    this.commentService.newCommentSub.subscribe( data=>{ 
      this.comments.push(data);
      this.numberComments=this.comments ? Object.entries(this.comments).length : 0;
     return data;
    });

    this.router.params.subscribe(params=>{
        this.getPost(params['idCom'],params['id']);
    });
  }


  newComment(){
    let newComment : IComment= { "comment" : this.comment ,"user":localStorage.getItem("nickname")!.toString() }
    this.commentService.createComment(this.postId,this.idComm,newComment).subscribe(d=>{
      newComment.id=d['name']
      this.commentService.newCommentSub.next(newComment);
      this.comment="";
    })
  }

  getError(error:any){
    this.hasError=error.value;
    this.errorMsg=error.error;

    setTimeout(() => {
      this.hasError=false;
    },5000);

  }
  deletePost(){

    if(confirm("Are you sure do u want to delete this post?")){
      this.postService.deletePost(this.post!.community,this.postId).subscribe(d=>
        this.navigateRouter.navigate([`/communities/${this.post?.community}`])  
      );
    }
   
  }
  getPost(idCom:string,idPost:string){
    this.postService.getPost(idCom,idPost).subscribe(data=>{       
      this.idComm=idCom;
      this.postId=idPost;
      this.post=data;
      this.isAuthor=this.post?.author==localStorage.getItem('nickname') ? true : false;
      this.comments=this.post?.comments! ?  this.post?.comments!: [];

        this.comments=Object.entries(this.comments).map(cmm=>{
          cmm[1].id=cmm[0];
          return cmm[1];
          }
        )
      this.numberComments=this.comments ? Object.entries(this.comments).length : 0;
    });
  }


}
