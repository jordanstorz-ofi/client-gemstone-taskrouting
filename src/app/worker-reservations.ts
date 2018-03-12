import { Reservation } from './reservation';

export interface WorkerReservations {
    workerSid: string;
    reservations: Reservation[];
}
