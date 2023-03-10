import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

import { UserAuthService } from 'src/app/services/user-auth.service';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../model/User';
import { ToastrService } from 'ngx-toastr';


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
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    this.user2 = this.user1;
  }

  saveUser() {
    console.log(this.user1.roles[0].name);
    if (this.userAuthService.roleMatch(['ROLE_ADMIN'])) {
      this.updateUserByAdmin();
    } else {
      this.updateUserbyUser();
    }
  }

  updateUserByAdmin() {
    if (this.user.valid) {

      const userObject = new User();

      (userObject.username = this.user1.username);
      (userObject.email = this.user1.email);
      (userObject.password = this.user1.password);
      (userObject.phoneNo = this.user1.phoneNo);
      (userObject.roles = [this.user.value.role]);
  
        this.userService.updateUserByAdmin(userObject, this.user1.id).subscribe((response) => {
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

      const userObject = new User();
      (userObject.username = this.user1.username);
      (userObject.email = this.user1.email);
      (userObject.password = this.user1.password);
      (userObject.phoneNo = this.user1.phoneNo);
      (userObject.roles = [this.user.value.role]);
      
      this.userService
        .updateUser(userObject, this.user1.id).subscribe((response) => {
          
          this.showAlert = true;
          this.toastr.success(`User updated successfully!`, 'Success');
        },error => {
          this.toastr.error('Error updating user!', 'Error')
          console.log(error)});
    }
  }

}
