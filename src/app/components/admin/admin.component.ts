import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../services/user-auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(
    private userAuthService: UserAuthService,
  ) { }
  
  public currentDate: Date;
  public userName = this.userAuthService.getUserName();

  ngOnInit() {}

  
}

