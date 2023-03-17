import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from '../../services/user-auth.service';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {}

  login(loginForm: NgForm) {

    this.userService.login(loginForm.value).subscribe(
      (response: any) => {
        this.userAuthService.setRoles(response.roles);
        this.userAuthService.setToken(response.token);
        this.userAuthService.setId(response.id);
        this.userAuthService.setUserName(response.username);
        this.userAuthService.setEmail(response.email);
        this.userAuthService.setPhone(response.phoneNo);
        
        const role = response.roles[0];
        if (role === 'ROLE_ADMIN') {
          this.router.navigate(['/admin']);
          this.toastr.success('Login successful!', 'Welcome Admin');
        } else if (role === 'ROLE_SERVICE_PROVIDER') {
          this.router.navigate(['/provider']);
          this.toastr.success('Login successful!', 'Welcome Service Provider');
        } else {
          this.router.navigate(['/user']);
          this.toastr.success('Login successful!', 'Welcome User');
        }
      },
      (error) => {
        console.log(error);
        this.toastr.error('Login failed!', 'Error');
      }
    );
  }
}
