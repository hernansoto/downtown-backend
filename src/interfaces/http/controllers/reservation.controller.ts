import { Body, Controller, Get, Post, Param, Patch, Query, BadRequestException } from '@nestjs/common';
import { CreateReservationUseCase } from '../../../application/use-cases/create-reservation.use-case';
import { ListReservationsUseCase } from '../../../application/use-cases/list-reservations.use-case';
import { CancelReservationUseCase } from '../../../application/use-cases/cancel-reservation.use-case';
import { ListAvailableTimesUseCase } from '../../../application/use-cases/list-available-times.use-case';
import { CreateReservationDto } from '../../../application/dtos/create-reservation.dto';
import { ReservationPrismaRepository } from '../../../infrastructure/database/prisma/reservation.prisma-repository';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';

@Controller('reservations')
export class ReservationController {
  private readonly createUseCase: CreateReservationUseCase;
  private readonly listUseCase: ListReservationsUseCase;
  private readonly cancelUseCase: CancelReservationUseCase;
  private readonly availableUseCase: ListAvailableTimesUseCase;

  constructor(private readonly prisma: PrismaService) {
    const repository = new ReservationPrismaRepository(this.prisma);
    this.createUseCase = new CreateReservationUseCase(repository);
    this.listUseCase = new ListReservationsUseCase(repository);
    this.cancelUseCase = new CancelReservationUseCase(repository);
    this.availableUseCase = new ListAvailableTimesUseCase(repository);
  }

  @Post()
  async createReservation(@Body() dto: CreateReservationDto) {
    const reservation = await this.createUseCase.execute(dto);
    return {
      id: reservation.id,
      date: reservation.date,
      time: reservation.time,
      status: reservation.status,
    };
  }

  @Get()
  async getAllReservations() {
    const reservations = await this.listUseCase.execute();
    return reservations.map(r => ({
      id: r.id,
      date: r.date,
      time: r.time,
      status: r.status
    }));
  }

  @Patch(':id/cancel')
  async cancelReservation(@Param('id') id: string) {
    try {
      const reservation = await this.cancelUseCase.execute(id);
      return {
        id: reservation.id,
        status: reservation.status,
        date: reservation.date,
        time: reservation.time
      };
    } catch (err) {
      return {
        error: err instanceof Error ? err.message : 'An unknown error occurred'
      };
    }
  }

  @Get('available')
  async getAvailableTimes(@Query('date') date: string) {
    if (!date) {
      throw new BadRequestException('Missing date parameter (YYYY-MM-DD)');
    }
    const times = await this.availableUseCase.execute(date);
    return { available: times };
  }
}
