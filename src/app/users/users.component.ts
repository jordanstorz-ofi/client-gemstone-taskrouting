import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  constructor(
    private _userService: UserService
  ) { }

  ngOnInit() {
    this.activateSubscriptions();
    this._userService.getUsers();
  }

  activateSubscriptions() : void {
    this._userService.userStoreUpdated_.subscribe(isUpdated => {
      if (isUpdated) {
        this.users = this._userService.userStore;
      }
    });
  }

  onLogin(id): void{
    this._userService.loginUser(id);
  }

}
