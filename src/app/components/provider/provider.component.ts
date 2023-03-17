import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})
export class ProviderComponent implements OnInit {

  constructor(
    private userAuthService: UserAuthService,
  ) { }
  
  public userName = this.userAuthService.getUserName();
  
  ngOnInit(): void {
  }
  
}

