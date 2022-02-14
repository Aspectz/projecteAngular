import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ICommunity } from 'src/app/interfaces/i-community';
import { CommunitiesService } from 'src/app/services/communities/communities.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-community-form',
  templateUrl: './community-form.component.html',
  styleUrls: ['./community-form.component.css']
})
export class CommunityFormComponent implements OnInit{
  communityForm!: FormGroup;

  communityExists:boolean|undefined;



  constructor(private formBuilder: FormBuilder,private communityService:CommunitiesService,private userService:UsersService,private router:Router) { 

    this.createForm();
  }

  ngOnInit(): void {
  }


  createForm(){
    this.communityForm = this.formBuilder.group({
      communityTitle: ['', Validators.required],
    });
  }

  checkCommunityName(){
    let title=this.communityForm.get('communityTitle')!.value;
     this.communityService.getCommunityByName(title).subscribe(community=>{
      if(community) this.communityExists=true;
      else{
        this.communityExists=false;
        let newCommunity:ICommunity={ "name": title };
        this.communityService.createCommunity(newCommunity).subscribe({
          next:(community)=>{
            this.userService.createUserCommunity(localStorage.getItem("localId")!,newCommunity.name).subscribe(newComm=>{
              this.router.navigate([`/communities/${newComm}`]);
              return newComm});
          }
        });
      }
    })
  }

  




}
