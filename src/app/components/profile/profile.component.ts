import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { UserAuthService } from '../../services/user-auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  user: User;

  constructor(
    private userAuthService: UserAuthService,
  ) { }
  
  ngOnInit(): void {
    // create new User object and assign values
    this.user = new User();
    this.user.username = this.userAuthService.getUserName();
    this.user.email = this.userAuthService.getEmail();
    this.user.phoneNo = this.userAuthService.getPhone();
    this.user.id = this.userAuthService.getId();
    this.user.roles = this.userAuthService.getRoles();
  }
  
  public username = this.userAuthService.getUserName();
  public email = this.userAuthService.getEmail();
  public role = this.userAuthService.getRoles();
  public phoneNo = this.userAuthService.getPhone();
  
}
