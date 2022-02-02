import { Component, OnInit } from '@angular/core';
import {  IUserFirebaseAuth } from 'src/app/interfaces/i-user';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email='';
  public password=''

  constructor(private loginService : LoginService, private router:Router) {}

  ngOnInit(): void {
  }

  submit():void{
    let usuario:IUserFirebaseAuth={email:this.email,password:this.password};
    this.loginService.login(usuario).subscribe({
      next:user=>{
        this.router.navigate(['/home']);
      }
    });
  }

}
