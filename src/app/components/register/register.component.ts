import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { IUserBD, IUserFirebaseAuth } from 'src/app/interfaces/i-user';
import { LoginService } from 'src/app/services/login.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;


  passwordError: boolean = false;
  constructor(
    private registerService: LoginService,
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UsersService
  ) {
    this.crearForm();
  }

  createValidator(): ValidatorFn {
    return (control: AbstractControl): {[key:string]:any }|null => {
      return this.userService.checkNickName(control.value).pipe(
        map((result: IUserBD) => {   
         return Object.entries(result).length==0 ? null : {isInvalid: true}})
      );
    };
  }


  ngOnInit(): void {
    
  }

  crearForm() {
    this.registerForm = this.formBuilder.group({
      nickname: ['', [Validators.required],[this.createValidator()]],
      email: ['',[Validators.required, Validators.email]],
      password: [''],
      password2: [''],
    });
  }

  
  inputsValidos(campo:string,error:string):string{
    if(this.registerForm.get(campo)!.hasError(error) && this.registerForm.get(campo)!.touched){
      return "is-invalid"
    }
    if(!this.registerForm.get(campo)!.hasError(error) && this.registerForm.get(campo)!.touched){
      return "is-valid";
    }
    return "";

  }


  submit(): void {
    let usuario: IUserFirebaseAuth = {
      email: this.registerForm.get("email")?.value ,
      password: this.registerForm.get("password")?.value ,
    };
    let userDb: IUserBD = { nickname: this.registerForm.get("nickname")?.value };

    if (this.registerForm.get("password")?.value != this.registerForm.get("password2")?.value) {
      this.passwordError = true;
    } else {
      this.registerService.register(usuario, userDb).subscribe({
        next: (user) => {
          this.router.navigate(['/home']);
        },
      });
    }
  }
}
