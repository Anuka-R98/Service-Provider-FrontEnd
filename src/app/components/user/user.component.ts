import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  message;
  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService
    ) { }

  ngOnInit(): void {
    this.forUser();
  }
  public userName = this.userAuthService.getUserName();
  forUser() {
    this.userService.forUser().subscribe(
      (response) => {
        console.log(response);
        this.message = response;
      }, 
      (error)=>{
        console.log(error);
      }
    );
  }
}
