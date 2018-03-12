import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { Subject } from 'rxjs/subject';
import { ConfigService } from './config.service';
import { User } from './user';


@Injectable()
export class UserService {

  private userPath = '/users';
  userStore: User[];

  users_: Subject<User>;
  userStoreUpdated_: Subject<Boolean>;

  constructor(
    private _http: HttpClient,
    private _config: ConfigService
  ) { 
    this.users_ = new Subject<User>();
    this.userStoreUpdated_ = new Subject<Boolean>();
  }

  getUsers() : void {
    const requestStr = 
      `${this._config.apiDomain}${this.userPath}`;

    this._http.get<User[]>(requestStr)
      .subscribe((responseUsers : User[]) => {
        this.userStore = responseUsers;
        this.userStoreUpdated_.next(true);
      });
  }
}
