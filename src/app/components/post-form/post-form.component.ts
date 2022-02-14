import { Component, OnInit } from '@angular/core';
import { IComment } from 'src/app/interfaces/i-comment';
import { ICommunity } from 'src/app/interfaces/i-community';
import { IPost } from 'src/app/interfaces/i-post';
import { FileUploadService } from 'src/app/services/file-upload/file-upload.service';
import { PostsService } from 'src/app/services/posts/posts.service';
import { UsersService } from 'src/app/services/users/users.service';




@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {

  constructor(private userService: UsersService,private fileUploadService:FileUploadService,private postsService: PostsService) { }

  communities:ICommunity[]|undefined;

  file:any | undefined;

  selectedOption:string|undefined;
  titlePost:string|undefined;
  ngOnInit(): void {
    this.userService.getUser(localStorage.getItem('localId')!).subscribe(user=>{
      this.communities=user.communities ? Object.values(user.communities) : undefined;
      return user;
    })
  }

  getFile(file:any){
    this.file=file.target.files[0];
    
  
  }

  submit(){
    
    let fileType=this.file.type.split("/")[0];

    this.fileUploadService.upload(this.file,fileType).subscribe(
     rs=> { 
       
       
      let newPost:IPost ={ "community" : this.selectedOption! , "author" : localStorage.getItem("nickname")!, "file":rs.url, "title" : this.titlePost! , "type":fileType };
    
      this.postsService.createPost(newPost).subscribe( newPost => {
        console.log(newPost);
        return newPost;
      })
    
      return rs;} 
  );
  }



}
