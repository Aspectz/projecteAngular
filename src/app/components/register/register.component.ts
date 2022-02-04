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

  email: string = '';
  password: string = '';
  password2: string = '';
  nickname: string = '';

  passwordError: boolean = false;
  constructor(
    private registerService: LoginService,
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UsersService
  ) {
    this.crearForm();
  }

  /*validadorNickName(): ValidatorFn {
    let size: Number;
    return (nick: AbstractControl): { [key: string]: any } | null => {
      if (nick.value) {

        this.userService
          .getUser(nick.value)
          .subscribe((nombres) => { console.log(nombres);
           size = new Set(nombres).size; console.log(size);
           }
           );
          console.log("size:",size);
        return size < 1 ? { valid: 'valid' } : null;
      } else {
        return null;
      }
    };
  }
  

  createValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<any> => {
      return this.userService.getNickNames(control.value).pipe(
        map((result: Boolean[]) => result ? null : {invalidAsync: true})
      );
    };
  }*/

  provar() {
    this.userService.getUser("pruebas").subscribe(d => {console.log(d);
    ;return d});
    
  }

  ngOnInit(): void {
    this.provar();
  }

  crearForm() {
    this.registerForm = this.formBuilder.group({
      nickname: ['nickname',[ Validators.required]],
      email: ['email'],
      password: ['password'],
      password2: ['password2'],
    });
  }

  submit(): void {
    let usuario: IUserFirebaseAuth = {
      email: this.email,
      password: this.password,
    };
    let userDb: IUserBD = { nickname: this.nickname };

    if (this.password != this.password2) {
      this.passwordError = true;
    } else {
      console.log('antes');

      this.registerService.register(usuario, userDb).subscribe({
        next: (user) => {
          this.router.navigate(['/home']);
        },
      });
    }
  }
}
