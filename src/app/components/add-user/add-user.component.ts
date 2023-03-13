import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

import { UserAuthService } from '../../services/user-auth.service';
import { User } from '../../model/User'
import { UserService } from './../../services/user.service'; 
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

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

  showAlert = false;
  constructor(
    private userAuthService: UserAuthService,
    private userService : UserService,
    private toastr: ToastrService,
  ) {}
  ngOnInit(): void {}

  saveUser() {
    if (this.userAuthService.roleMatch(['ROLE_ADMIN'])) {
      this.addUserByAdmin();
    } else {
      alert("Unauthorized ! Only admin can add users !");
    }
  }

  closeAlert() {
    this.showAlert = false;
  }

  addUserByAdmin() {
    if (this.user.valid) {
      const newUser: User = {
        username: this.user.value.username,
        email: this.user.value.email,
        password: this.user.value.password,
        phoneNo: this.user.value.phoneNo,
        roles: [this.user.value.role],
      };
      
      this.userService.createUser(newUser).subscribe((response: any) => {
        console.log(newUser);
        this.showAlert = true;
        const createdUser = response;
        this.toastr.success(`User ${createdUser.username} created successfully!`, 'Success');
      }, error => {
        this.toastr.error('Error creating user!', 'Error');
        console.log(error);
      });

    } else {
      this.toastr.error('User details are invalid !', 'Error');
    }
  }
}
