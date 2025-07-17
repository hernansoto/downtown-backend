// src/application/use-cases/list-available-times.use-case.ts
import { ReservationRepository } from '../../domain/repositories/reservation.repository';

export class ListAvailableTimesUseCase {
  constructor(private readonly repository: ReservationRepository) {}

  async execute(date: string): Promise<string[]> {
    const reserved = await this.repository.findByDate(date);
    const reservedTimes = reserved.map(r => r.time);

    const allTimes = [
      '10:00', '11:00', '12:00', '13:00',
      '14:00', '15:00', '16:00', '17:00',
      '18:00', '19:00', '20:00', '21:00',
      '22:00', '23:00',
    ];

    return allTimes.filter(time => !reservedTimes.includes(time));
  }
}
