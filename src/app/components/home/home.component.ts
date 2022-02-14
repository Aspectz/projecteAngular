import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICommunity } from 'src/app/interfaces/i-community';
import { IPost } from 'src/app/interfaces/i-post';
import { CommunitiesService } from 'src/app/services/communities/communities.service';
import { PostsService } from 'src/app/services/posts/posts.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  communities: ICommunity[] = [];
  posts_aux:IPost[][]=[];
  posts?: IPost[] | undefined;
  
  hasError:boolean=false;
  errorMsg:string="";

  constructor(private communitiesService:CommunitiesService, private postsService:PostsService,private router:ActivatedRoute) { }

  ngOnInit(): void {
    
   this.getPosts();
    
  }
  getPosts(){
    this.communitiesService.getCommunities().subscribe(datos=>{
      this.communities=Object.values(datos);
      for(let comm of this.communities){
        
        if(comm.posts)
          this.postsService.getPosts(comm.name).subscribe(posts=>{
            this.posts_aux.push(posts);
            this.posts=this.posts_aux?.flat();
            
            
          })  
        }
        
        
    });  
    
    
  }
  getError(error:any){
    
    this.hasError=error.value;
    this.errorMsg=error.error;
    
    setTimeout(() => {
      this.hasError=false;
    },5000);
    
    
  }

}

