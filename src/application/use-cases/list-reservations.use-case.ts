import { ReservationRepository } from '../../domain/repositories/reservation.repository';
import { Reservation } from '../../domain/entities/reservation.entity';

export class ListReservationsUseCase {
  constructor(private readonly repository: ReservationRepository) {}

  async execute(): Promise<Reservation[]> {
    return this.repository.findAll();
  }
}
