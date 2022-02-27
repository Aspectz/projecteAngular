import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IComment } from 'src/app/interfaces/i-comment';
import { ICommunity } from 'src/app/interfaces/i-community';
import { IPost } from 'src/app/interfaces/i-post';
import { FileUploadService } from 'src/app/services/file-upload/file-upload.service';
import { LoginService } from 'src/app/services/login/login.service';
import { PostsService } from 'src/app/services/posts/posts.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css'],
})
export class PostFormComponent implements OnInit {
  constructor(
    private userService: UsersService,
    private fileUploadService: FileUploadService,
    private postsService: PostsService,
    private loginService: LoginService,
    private router: Router
  ) {}

  communities: string[] | undefined;

  file: any | undefined;
  isLogged: boolean = false;
  selectedOption: string | undefined;
  titlePost: string | undefined;

  //toast
  hasError: boolean = false;
  errorMsg: string = '';

  ngOnInit(): void {
    this.isLogged = this.loginService.isLogged();
    this.loginService.logged.subscribe((log) => {
      this.isLogged = log;
    });

    if (this.isLogged) {
      this.userService
        .getUser(localStorage.getItem('localId')!)
        .subscribe((user) => {
          this.communities = user.communities
            ? Object.values(user.communities)
            : undefined;
          return user;
        });
    }
  }

  getFile(file: any) {
    this.file = file.target.files[0];
  }

  submit() {
    if (this.isLogged) {
      if (this.file) {
        let fileType = this.file.type.split('/')[0];
        this.fileUploadService.upload(this.file, fileType).subscribe((rs) => {
          let newPost: IPost = {
            community: this.selectedOption!,
            author: localStorage.getItem('nickname')!,
            file: rs.url,
            title: this.titlePost!,
            type: fileType,
            votes: { totalVotes: 0 },
          };

          this.postsService.createPost(newPost).subscribe((newPost) => {
            this.router.navigate([`/communities/${this.selectedOption}/posts/${newPost['name']}}`]);
            return newPost;
          });

          return rs;
        });
      }else{
        this.hasError=true;
        this.errorMsg="You must choose a file!";
        this.errorTimeOut();
      }
    } else {
      this.hasError = true;
      this.errorMsg = 'You must be logged to create a post!';
      this.errorTimeOut();
    }
  }
  errorTimeOut(){
    setTimeout(() => {
      this.hasError=false;
    },5000);
  }
}
