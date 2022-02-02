import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUserBD, IUserFirebaseAuth } from 'src/app/interfaces/i-user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  email: string = '';
  password: string = '';
  password2: string = '';
  nickname: string = '';

  passwordError: boolean = false;
  constructor(private registerService: LoginService, private router: Router) {}

  ngOnInit(): void {}

  submit(): void {
    let usuario: IUserFirebaseAuth = { email: this.email, password: this.password };
    let userDb:IUserBD={nickname:this.nickname}

    if (this.password != this.password2) {
      this.passwordError = true;
    } else {
      console.log("antes");
      
      this.registerService.register(usuario,userDb).subscribe({
        next: (user) => {
          this.router.navigate(['/home']);
        },
      });
      console.log("dps");
      
    }
  }
}
