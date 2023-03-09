import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../services/user-auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  

  constructor(
    private userAuthService: UserAuthService,
  ) { }
  
  ngOnInit(): void {
  }
  
  public userName = this.userAuthService.getUserName();
  public email = this.userAuthService.getEmail();
  public role = this.userAuthService.getRoles();
  public phoneNo = this.userAuthService.getPhone();
  
}
