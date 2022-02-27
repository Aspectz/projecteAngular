import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ICommunity } from 'src/app/interfaces/i-community';
import { CommunitiesService } from 'src/app/services/communities/communities.service';
import { LoginService } from 'src/app/services/login/login.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-community-form',
  templateUrl: './community-form.component.html',
  styleUrls: ['./community-form.component.css'],
})
export class CommunityFormComponent implements OnInit {
  communityForm!: FormGroup;

  communityExists: boolean | undefined;

  isLogged: boolean = false;

  //toast
  hasError: boolean = false;
  errorMsg: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private communityService: CommunitiesService,
    private userService: UsersService,
    private router: Router,
    private loginService: LoginService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.isLogged = this.loginService.isLogged();
    this.loginService.logged.subscribe((log) => {
      this.isLogged = log;
    });
  }

  createForm() {
    this.communityForm = this.formBuilder.group({
      communityTitle: ['', Validators.required],
    });
  }

  checkCommunityName() {
    let title = this.communityForm.get('communityTitle')!.value;
    if (this.isLogged) {
      this.communityService.getCommunityByName(title).subscribe((community) => {
        if (community) this.communityExists = true;
        else {
          this.communityExists = false;
          let newCommunity: ICommunity = {
            name: title,
            author: localStorage.getItem('nickname')!,
          };
          this.communityService.createCommunity(newCommunity).subscribe({
            next: (community) => {
              this.userService
                .createUserCommunity(
                  localStorage.getItem('localId')!,
                  newCommunity.name
                )
                .subscribe((newComm) => {
                  this.router.navigate([`/communities/${newComm}`]);
                  return newComm;
                });
            },
          });
        }
      });
    } else {
      this.hasError=true;
      this.errorMsg="You must be logged to create a community!";
      setTimeout(() => {
        this.hasError=false;
      },5000);
    }
  }
}
