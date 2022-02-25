import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICommunity } from 'src/app/interfaces/i-community';
import { IPost } from 'src/app/interfaces/i-post';
import { IUserBD } from 'src/app/interfaces/i-user';
import { PostsService } from 'src/app/services/posts/posts.service';
import { UsersService } from 'src/app/services/users/users.service';



@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit {

  posts_aux:IPost[][]=[];
  posts?: IPost[] | undefined;
  commName?:string|undefined;
  hasError:boolean=false;
  errorMsg:string="";
  user?:IUserBD;
  followsComm:boolean|undefined;
  filterText:string="";
  constructor(private router:ActivatedRoute, private postsService: PostsService ,private userService: UsersService) { }

  ngOnInit(): void {
    
    this.postsService.searchEvent.subscribe(data=>this.filterText=data);

    this.router.params.subscribe( param=>{
        this.commName=param['idCom'];
        this.postsService.getPosts(param['idCom']).subscribe(posts=>{
          this.posts_aux.push(posts);
              this.posts=this.posts_aux?.flat();              
              this.userService.getUser(localStorage.getItem('localId')!).subscribe( user => {
                this.user=user;
                if(user)
                  this.followsComm=this.checkIfUserFollowsCommunity(user,param['idCom']);
                return user;}
              );
             
  } )
  })
}

  getError(error:any){
    
    this.hasError=error.value;
    this.errorMsg=error.error;
    
    setTimeout(() => {
      this.hasError=false;
    },5000); 
  }

  checkIfUserFollowsCommunity(user:IUserBD,community:ICommunity):boolean{
    if(user.communities){
        return Object.values(user.communities).includes(community);
    }
      return false;
  }
  followOrUnfollow(){
    if(this.followsComm){
      this.userService.deleteUserCommunity(localStorage.getItem("localId")!,this.commName!).subscribe( resp=>{
        this.followsComm=!this.followsComm;
        return resp;
      } );
    }else{
      this.userService.createUserCommunity(localStorage.getItem("localId")!,this.commName!).subscribe(resp=>{
        this.followsComm=!this.followsComm;
        return resp;
      })
    }
    
  }

}
