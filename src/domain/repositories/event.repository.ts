import { Event } from '../entities/event.entity';


export interface EventRepository {
  findAll(): Promise<Event[]>;
  create(event: Event): Promise<Event>;
  findByType(type: string): Promise<Event[]>;
}