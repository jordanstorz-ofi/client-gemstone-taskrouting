import { Task } from './task';

export interface Reservation {
    task: Task;
    workerSid: string;
}
