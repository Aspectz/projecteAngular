import { Component, OnInit } from '@angular/core';
import {  IUserFirebaseAuth } from 'src/app/interfaces/i-user';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //DIU Q EXISTIRA AMB EL !
  public loginForm!:FormGroup;
  private email='';
  private password=''

  public emailError:string|undefined;
  public passwdError:string|undefined;

  constructor(private loginService : LoginService, private router:Router,private formBuilder: FormBuilder) {
    this.crearForm();
  }

  ngOnInit(): void {
  }

  submit():void{
    let usuario:IUserFirebaseAuth={email:this.loginForm.get("email")?.value,password:this.loginForm.get("password")?.value};
    
    this.loginService.login(usuario).subscribe({ 
           
      next:user=>{
        this.router.navigate(['/home']);
      },
      error:error=>{
         this.emailError=undefined;
         this.passwdError=undefined;
        if(error=="INVALID_PASSWORD") this.passwdError=error;
        else if(error=="EMAIL_NOT_FOUND") this.emailError=error;
        
      }

    });
  }


//Asi es faria el validador personalitzat

  crearForm(){
    this.loginForm=this.formBuilder.group({
      email:['playrust@yopmail.com',[Validators.required,Validators.email]],
      password:['playrust',[Validators.required,]]
    });
  }
  get emailNotValid(){
    if(this.loginForm.get('email')?.invalid && this.loginForm.get('email')?.touched){
      return "is-invalid"
    }
    if(this.loginForm.get('email')?.valid && this.loginForm.get('email')?.touched){
      return "is-valid";
    }
    return "";
  }

}
