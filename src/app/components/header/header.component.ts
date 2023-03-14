import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../../services/user-auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public currentDate: Date;

  constructor(
    public router: Router,
    public userAuthService: UserAuthService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
  }

  public isLoggedIn() {
    return this.userAuthService.isLoggedIn();
  }

  public logout() {
    this.userAuthService.clear();
    this.router.navigate(['/home']);
    this.toastr.warning('Logged Out!');
  }

}

