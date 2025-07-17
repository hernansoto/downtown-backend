import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { EventRepository } from '../../../domain/repositories/event.repository';
import { Event } from '../../../domain/entities/event.entity';

@Injectable()
export class EventPrismaRepository implements EventRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Event[]> {
    const events = await this.prisma.event.findMany({
      orderBy: { date: 'asc' }
    });

    interface PrismaEvent {
      id: string;
      title: string;
      description: string;
      date: Date;
      type: string;
      imageUrl: string;
      createdAt: Date;
      updatedAt: Date;
    }

    return events.map((event: PrismaEvent) => new Event(
      event.id,
      event.title,
      event.description,
      event.date,
      event.type,
      event.imageUrl,
      event.createdAt,
      event.updatedAt
    ));
  }
  async create(event: Event): Promise<Event> {
  const created = await this.prisma.event.create({
    data: {
      id: event.id,
      title: event.title,
      description: event.description,
      date: event.date,
      type: event.type,
      imageUrl: event.imageUrl,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt
    }
  });

  return new Event(
    created.id,
    created.title,
    created.description,
    created.date,
    created.type,
    created.imageUrl,
    created.createdAt,
    created.updatedAt
  );
}

  async findByType(type: string): Promise<Event[]> {
    const events = await this.prisma.event.findMany({
      where: { type },
      orderBy: { date: 'asc' },
    });

    interface PrismaEvent {
      id: string;
      title: string;
      description: string;
      date: Date;
      type: string;
      imageUrl: string;
      createdAt: Date;
      updatedAt: Date;
    }

    return events.map((event: PrismaEvent) => new Event(
      event.id,
      event.title,
      event.description,
      event.date,
      event.type,
      event.imageUrl,
      event.createdAt,
      event.updatedAt
    ));
  }

}