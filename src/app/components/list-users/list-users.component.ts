import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../model/User';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  userList!: User[];

  searchTerm: string = '';

  editingUser: any = {
    id: '',
    username: '',
    email: '',
    password: '',
    phoneNo: '',
    roles: [],
  };
  
  deletingUserid: any;
  deleteModel = document.getElementById('deleteModal');

  constructor(
    private userService: UserService,
    private toastr: ToastrService
    ) {}

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList() {
    this.userService.getUsers().subscribe((response: any) => {
      this.userList = response;
    });
  }

  deleteUser() {
    this.userService.deleteUser(this.deletingUserid).subscribe((response) => {
      console.log(response);
    });
    this.toastr.success('User Deleted successfully!', 'Success');
    this.getUserList();
  }

  onclickDelete(id: string) {
    this.deletingUserid = id;
  }

  public isUserOrProvider(user: any): boolean {
    const hasRoleUser = user.roles.find(role => role.name === 'ROLE_USER');
    const hasRoleProvider = user.roles.find(role => role.name === 'ROLE_SERVICE_PROVIDER');
    return hasRoleUser || hasRoleProvider;
  }
  
  onclickEdit(user: User) {
      (this.editingUser.id = user.id);
      (this.editingUser.username = user.username),
      (this.editingUser.password = user.password),
      (this.editingUser.email = user.email),
      (this.editingUser.phoneNo = user.phoneNo),
      (this.editingUser.roles = user.roles)
  }

}
