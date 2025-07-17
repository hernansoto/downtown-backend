import { ReservationRepository } from '../../domain/repositories/reservation.repository';
import { CreateReservationDto } from '../dtos/create-reservation.dto';
import { Reservation } from '../../domain/entities/reservation.entity';
import { v4 as uuidv4 } from 'uuid';

export class CreateReservationUseCase {
  constructor(private readonly reservationRepository: ReservationRepository) {}

  async execute(dto: CreateReservationDto): Promise<Reservation> {
    const existing = await this.reservationRepository.findByDateAndTime(new Date(dto.date), dto.time);
    if (existing) {
      throw new Error('Turno no disponible para esa fecha y hora');
    }

    const now = new Date();
    const reservation = new Reservation(
      uuidv4(),
      new Date(dto.date),
      dto.time,
      'pending',
      now,
      now
    );

    return this.reservationRepository.create({
      date: reservation.date,
      time: reservation.time,
      status: reservation.status,
    });
  }
}