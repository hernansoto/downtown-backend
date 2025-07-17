import { EventRepository } from '../../domain/repositories/event.repository';
import { CreateEventDto } from '../dtos/create-event.dto';
import { Event } from '../../domain/entities/event.entity';
import { v4 as uuidv4 } from 'uuid';

export class CreateEventUseCase {
  constructor(private readonly repository: EventRepository) {}

  async execute(dto: CreateEventDto): Promise<Event> {
    const now = new Date();
    const event = new Event(
      uuidv4(),
      dto.title,
      dto.description,
      new Date(dto.date),
      dto.type,
      dto.imageUrl ?? null,
      now,
      now
    );

    return this.repository.create(event);
  }
}
