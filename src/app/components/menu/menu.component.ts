import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { PostsService } from 'src/app/services/posts/posts.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  
  isLogged:boolean=false;
  nickname:string | undefined;
  @Output() out=new EventEmitter<string>();

  searchText:string="";

  constructor(private login: LoginService,private router:Router,private postService: PostsService) { }


  ngOnInit(): void {
    this.isLogged=this.login.isLogged();
    this.login.logged.subscribe(log=> { 
      this.isLogged=log; 
      this.nickname=this.isLogged ? localStorage.getItem("nickname")!: "" });        
  }

  searchByPostTitle(){
    this.postService.searchEvent.next(this.searchText);
  }

  
  changeTheme(event:any){
    document.body.classList.toggle("dark-theme");
  }

  logout(){
    this.login.logout();
    
  }

}
