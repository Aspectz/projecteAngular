import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  
  isLogged:boolean=false;
  nickname:string | undefined;
  constructor(private login: LoginService) { }


  ngOnInit(): void {
    this.isLogged=this.login.isLogged();
    this.login.logged.subscribe(log=> {
    ;this.isLogged=log; this.nickname=this.isLogged ? localStorage.getItem("nickname")!: "" }); 
    
       
  }


  logout(){
    this.login.logout();
  }

}
