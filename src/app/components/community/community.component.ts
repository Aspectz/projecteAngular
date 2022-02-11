import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPost } from 'src/app/interfaces/i-post';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit {

  posts_aux:IPost[][]=[];
  posts?: IPost[] | undefined;
  
  hasError:boolean=false;
  errorMsg:string="";
  constructor(private router:ActivatedRoute, private postsService: PostsService ) { }

  ngOnInit(): void {
    this.router.params.subscribe( param=>{
        this.postsService.getPosts(param['idCom']).subscribe(posts=>{
          this.posts_aux.push(posts);
              this.posts=this.posts_aux?.flat();
        })
  } )
  }

  getError(error:any){
    
    this.hasError=error.value;
    this.errorMsg=error.error;
    
    setTimeout(() => {
      this.hasError=false;
    },5000);
    
    
  }

}
