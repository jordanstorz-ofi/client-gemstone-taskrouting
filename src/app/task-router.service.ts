import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { Subject } from 'rxjs/subject';
import { WorkerDetail } from './worker-detail';
import { WorkerReservations } from './worker-reservations';
import { Task } from './task';
import { TaskAttributes } from './task-attributes';
import { Gemstone } from './gemstone';
import { Reservation } from './reservation';

@Injectable()
export class TaskRouterService {

  private workers: any[] = [];
  workerReady_: Subject<any>;
  workerReservations_: Subject<WorkerReservations>;
  
  constructor() {
    this.workerReady_ = new Subject<any>();
    this.workerReservations_ = new Subject<WorkerReservations>();
   }

  getWorkerDetail(workerCapability: string): void {
      const worker = new window["Twilio"].TaskRouter.Worker(workerCapability);
      console.log('new Tw worker:::::');
      console.log(worker);
      this.workers.push(worker);
      this.registerStreams(worker);
      this.fetchReservationsByWorkerSid(worker.workerSid)
    }

  registerStreams(worker: any): void {
    worker.on('ready', detail => {
      console.log('workerDETAIL""""""');
      
      this.workerReady_.next(detail);
    })
  }

  fetchReservationsByWorkerSid(workerSid: string): void {
    console.log(workerSid);
    
    const targetWorker = 
      this.workers.filter(worker => worker.workerSid == workerSid)[0];

    targetWorker.fetchReservations((error, response) => {
      if (error) return;
      const reservations = response.data.map(rD => {
        return {
          task: {
            taskSid: rD.task.sid,
            taskAttributes: {
              level: rD.task.attributes.level,
              gemstone: {
                id: rD.task.attributes.Diamond.DiamondId,
                hexColor: rD.task.attributes.Diamond.HexColor
              } as Gemstone,
            } as TaskAttributes,
          } as Task,
        } as Reservation
      })
      this.workerReservations_.next({
        workerSid: workerSid,
        reservations
      });
    });
  }
}
