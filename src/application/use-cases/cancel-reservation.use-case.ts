import { ReservationRepository } from '../../domain/repositories/reservation.repository';
import { Reservation } from '../../domain/entities/reservation.entity';

export class CancelReservationUseCase {
  constructor(private readonly repository: ReservationRepository) {}

  async execute(id: string): Promise<Reservation> {
    const reservation = await this.repository.findById(id);
    if (!reservation) {
      throw new Error('Reserva no encontrada');
    }

    if (reservation.status === 'cancelled') {
      throw new Error('La reserva ya está cancelada');
    }

    reservation.status = 'cancelled';
    return this.repository.updateStatus(id, 'cancelled');
  }
}
