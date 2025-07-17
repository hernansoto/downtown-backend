// src/application/use-cases/find-events-by-type.use-case.ts
import { Injectable } from '@nestjs/common';
import { EventRepository } from '../../domain/repositories/event.repository';
import { Event } from '../../domain/entities/event.entity';

@Injectable()
export class FindEventsByTypeUseCase {
  constructor(private readonly repository: EventRepository) {}

  async execute(type: string): Promise<Event[]> {
    return this.repository.findByType(type);
  }
}
