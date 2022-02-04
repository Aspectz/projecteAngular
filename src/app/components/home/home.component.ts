import { Component, OnInit } from '@angular/core';
import { ICommunity } from 'src/app/interfaces/i-community';
import { IPost } from 'src/app/interfaces/i-post';
import { CommunitiesService } from 'src/app/services/communities.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  communities: ICommunity[] = [];
  posts_aux:IPost[][]=[];
  posts?: IPost[] | undefined;
  constructor(private communitiesService:CommunitiesService, private postsService:PostsService) { }

  ngOnInit(): void {
    this.communitiesService.getCommunities().subscribe(datos=>{
      
      this.communities=Object.values(datos);
      for(let comm of this.communities){
          this.postsService.getPosts(comm.name).subscribe(posts=>{
            this.posts_aux.push(posts);
            this.posts=this.posts_aux?.flat();
              
          })  
        }
    });  
  }
}
