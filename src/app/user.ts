import { WorkerDetail } from './worker-detail';
import { Reservation } from './reservation';

export interface User {
    UserId: number;
    Username: string;
    workerDetail: WorkerDetail;
    reservations: Reservation[];
}
