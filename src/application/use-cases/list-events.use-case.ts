import { EventRepository } from '../../domain/repositories/event.repository';
import { Event } from '../../domain/entities/event.entity';

export class ListEventsUseCase {
  constructor(private readonly eventRepository: EventRepository) {}

  async execute(): Promise<Event[]> {
    return this.eventRepository.findAll();
  }
}