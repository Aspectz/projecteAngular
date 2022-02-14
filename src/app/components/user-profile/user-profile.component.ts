import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-options',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  nickname:string="";



  constructor(private router: ActivatedRoute) { }

  

  ngOnInit(): void {
    this.router.params.subscribe(param=>{

      this.nickname=param['idUser'];

      return param;
    })
  }

}
