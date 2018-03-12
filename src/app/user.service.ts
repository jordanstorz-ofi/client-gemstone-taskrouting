import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { Subject } from 'rxjs/subject';
import { ConfigService } from './config.service';
import { User } from './user';
import { Reservation } from './reservation';
import { DtoUser } from './dto-user';
import { WorkerDetail } from './worker-detail';
import { TaskRouterService } from './task-router.service';


@Injectable()
export class UserService {

  private userPath = '/users';
  userStore: User[];

  users_: Subject<User>;
  userStoreUpdated_: Subject<Boolean>;

  constructor(
    private _http: HttpClient,
    private _config: ConfigService,
    private _taskRouterService: TaskRouterService
  ) { 
    this.users_ = new Subject<User>();
    this.userStoreUpdated_ = new Subject<Boolean>();
    this.activateSubscriptions();
  }

  activateSubscriptions() {
    this._taskRouterService.workerReady_.subscribe(twWorker =>{
      console.log('worker details gotten');
      
      const workerDetail: WorkerDetail = {
        workerSid: twWorker.sid,
        friendlyName: twWorker.friendlyName,
        activityName: twWorker.activityName,
        available: twWorker.available
      } as WorkerDetail;

      this._updateUserWithWorkerDetail(workerDetail);
    })

    this._taskRouterService.workerReservations_.subscribe(wR => {
      const { workerSid, reservations } = wR;
      this._updateWorkerReservations(workerSid, reservations);
    })
  }

  getUsers() : void {
    const requestStr = 
      `${this._config.apiDomain}${this.userPath}`;

    this._http.get<DtoUser[]>(requestStr)
      .subscribe((responseUsers : DtoUser[]) => {
        this.userStore = 
          responseUsers.map(responseUser => {
            return {
              Username: responseUser.Username,
              UserId: responseUser.UserId,
              workerDetail: {
                workerSid: responseUser.WorkerSid
              }
            } as User;
          });
        this.userStoreUpdated_.next(true);
      });
  }

  loginUser(userId: number) : void {
    const requestStr =
      `${this._config.apiDomain}${this.userPath}/login`;

    const requestBody = userId;

    this._http.post<any>(requestStr, requestBody)
      .subscribe(response => {
        const responseCapability = response.capability;
        this._updateUserWithCapability(userId, responseCapability);
        this._taskRouterService.getWorkerDetail(responseCapability);
      });
  }

  _updateUserWithWorkerDetail(workerDetail: WorkerDetail): void {
    const targetUser =
      this.userStore.filter(user => 
          user.workerDetail.workerSid == workerDetail.workerSid)[0];
    
    targetUser.workerDetail = workerDetail;
  }

  _updateUserWithCapability(userId: number, capability: string) {
    const targetUser = 
      this.userStore.filter(user => user.UserId == userId)[0];

    if (!targetUser.workerDetail) {
      targetUser.workerDetail = {} as WorkerDetail;
    }

    targetUser.workerDetail.capability = capability;
  }
  
  _updateWorkerReservations(workerSid: string, reservations: Reservation[]){
    const targetUser =
      this.userStore.filter(user => 
          user.workerDetail.workerSid == workerSid)[0];
    
    targetUser.reservations = reservations;
  }
}
