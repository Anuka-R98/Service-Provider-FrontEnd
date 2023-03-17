import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

import { UserAuthService } from 'src/app/services/user-auth.service';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../model/User';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  user = new FormGroup({

    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20)
    ]),
    email: new FormControl('', [
      Validators.required, 
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(12),
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,30}$')
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(12),
      this.matchPassword.bind(this)
    ]),
    phoneNo: new FormControl('', [
      Validators.required, 
      Validators.pattern(/^\d{10}$/)
    ]),
    role: new FormControl('user', Validators.required)

  });

   // custom validator function
  matchPassword(control: AbstractControl) {
    const password = control.root.get('password');
    const confirmPassword = control.value;
    if (password && confirmPassword && password.value !== confirmPassword) {
      return { mismatchedPasswords: true };
    }
    return null;
  }

  @Input() user1: User;
  user2: any;
  role1: any = ['ROLE_SERVCIE_PROVIDER'];
  role2: any = ['ROLE_USER'];
  role3: any = ['ROLE_ADMIN'];

  showAlert = false;

  constructor(
    private userService: UserService,
    public userAuthService: UserAuthService,
    private toastr: ToastrService,
    public router: Router,
  ) {}
    
  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges) {
    this.user2 = this.user1;
  }

  saveUser() {
    if (this.userAuthService.roleMatch(['ROLE_ADMIN'])) {
      this.updateUserByAdmin();
    } else {
      this.updateUserbyUser();
    }
  }

  updateUserByAdmin() {

    if (this.user.valid) {
      const existingUser: User = {
          username : this.user.value.username,
          email : this.user.value.email,
          password : this.user.value.password,
          phoneNo : this.user.value.phoneNo,
          roles : [this.user.value.role],
      };

        this.userService.updateUserByAdmin(existingUser, this.user1.id).subscribe((response) => {
          console.log(existingUser);
          console.log(response);
            this.showAlert = true;
            this.toastr.success(`User updated successfully!`, 'Success');
          },error => {
            this.toastr.error('Error updating user!', 'Error')
            console.log(error)});
    }
  }
  
  updateUserbyUser() {
    
    if (this.user.valid) {
      const existingUser = new User();
      
      // if (this.user1.roles == 'ROLE_SERVICE_PROVIDER') {
      //   existingUser.roles = ['provider'];
      // } else {
      //   existingUser.roles = ['user'];
      // }
      
      (existingUser.username = this.user.value.username),
      (existingUser.email = this.user.value.email),
      (existingUser.password = this.user.value.password),
      (existingUser.phoneNo = this.user.value.phoneNo),
      
      this.userService
        .updateUser(existingUser, this.user1.id).subscribe((response) => {
          console.log(existingUser);
          console.log(response);
          this.showAlert = true;
          this.toastr.success(`User updated successfully!`, 'Success');
          this.logout();
        },error => {
          this.toastr.error('Error updating user!', 'Error')
          console.log(error)});
    }
  }

  public logout() {
    this.userAuthService.clear();
    // this.router.navigate(['/login']);
    // this.toastr.warning('Logging Out !');
  }

}
