import { Reservation } from '../entities/reservation.entity';

export interface ReservationRepository {
  create(reservation: Omit<Reservation, 'id' | 'createdAt' | 'updatedAt'>): Promise<Reservation>;
  findByDateAndTime(date: Date, time: string): Promise<Reservation | null>;
  findAll(): Promise<Reservation[]>;
  findById(id: string): Promise<Reservation | null>;
  updateStatus(id: string, status: 'pending' | 'confirmed' | 'cancelled'): Promise<Reservation>;
  findByDate(date: string): Promise<Reservation[]>;
}