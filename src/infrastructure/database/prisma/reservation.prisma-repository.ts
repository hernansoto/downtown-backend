import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ReservationRepository } from '../../../domain/repositories/reservation.repository';
import { Reservation } from '../../../domain/entities/reservation.entity';

@Injectable()
export class ReservationPrismaRepository implements ReservationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Omit<Reservation, 'id' | 'createdAt' | 'updatedAt'>): Promise<Reservation> {
    const created = await this.prisma.reservation.create({
      data: {
        date: data.date,
        time: data.time,
        status: data.status,
      },
    });

    return new Reservation(
      created.id,
      created.date,
      created.time,
      created.status as 'pending' | 'confirmed' | 'cancelled',
      created.createdAt,
      created.updatedAt
    );
  }

  async findByDateAndTime(date: Date, time: string): Promise<Reservation | null> {
    const found = await this.prisma.reservation.findFirst({
      where: {
        date: date,
        time: time,
      },
    });

    if (!found) return null;

    return new Reservation(
      found.id,
      found.date,
      found.time,
      found.status as 'pending' | 'confirmed' | 'cancelled',
      found.createdAt,
      found.updatedAt
    );
  }
  async findAll(): Promise<Reservation[]> {
    const rows = await this.prisma.reservation.findMany({
      orderBy: { date: 'asc' }
    });

    interface ReservationRow {
      id: string;
      date: Date;
      time: string;
      status: 'pending' | 'confirmed' | 'cancelled' | string;
      createdAt: Date;
      updatedAt: Date;
    }

    return rows.map((r: ReservationRow) => new Reservation(
      r.id,
      r.date,
      r.time,
      r.status as 'pending' | 'confirmed' | 'cancelled',
      r.createdAt,
      r.updatedAt
    ));
 }
 async findById(id: string): Promise<Reservation | null> {
  const found = await this.prisma.reservation.findUnique({ where: { id } });
  if (!found) return null;
  return new Reservation(
    found.id,
    found.date,
    found.time,
    found.status as 'pending' | 'confirmed' | 'cancelled',
    found.createdAt,
    found.updatedAt
  );
}

async updateStatus(id: string, status: 'pending' | 'confirmed' | 'cancelled'): Promise<Reservation> {
  const updated = await this.prisma.reservation.update({
    where: { id },
    data: { status }
  });

  return new Reservation(
    updated.id,
    updated.date,
    updated.time,
    updated.status as 'pending' | 'confirmed' | 'cancelled',
    updated.createdAt,
    updated.updatedAt
  );
}
async findByDate(date: string): Promise<Reservation[]> {
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    throw new Error('Invalid date format. Expected YYYY-MM-DD');
  }

  // Esto compara solo la fecha, sin hora
  const start = new Date(parsedDate);
  start.setHours(0, 0, 0, 0);

  const end = new Date(parsedDate);
  end.setHours(23, 59, 59, 999);

  const results = await this.prisma.reservation.findMany({
    where: {
      date: {
        gte: start,
        lte: end,
      },
    },
  });

  interface ReservationRow {
    id: string;
    date: Date;
    time: string;
    status: 'pending' | 'confirmed' | 'cancelled' | string;
    createdAt: Date;
    updatedAt: Date;
  }

  return results.map((r: ReservationRow) => new Reservation(
    r.id,
    r.date,
    r.time,
    r.status as 'pending' | 'confirmed' | 'cancelled',
    r.createdAt,
    r.updatedAt
  ));
}


}