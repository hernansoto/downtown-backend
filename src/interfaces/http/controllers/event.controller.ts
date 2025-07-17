import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { EventPrismaRepository } from '../../../infrastructure/database/prisma/event.prisma-repository';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { ListEventsUseCase } from '../../../application/use-cases/list-events.use-case';
import { CreateEventUseCase } from '../../../application/use-cases/create-event.use-case';
import { CreateEventDto } from '../../../application/dtos/create-event.dto';
import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { FindEventsByTypeUseCase } from '../../../application/use-cases/find-events-by-type.use-case';

@Controller('events')
export class EventController {
  private readonly listUseCase: ListEventsUseCase;
  private readonly createUseCase: CreateEventUseCase;
  private readonly findByTypeUseCase: FindEventsByTypeUseCase;

  constructor(private readonly prisma: PrismaService) {
    const repository = new EventPrismaRepository(this.prisma);
    this.listUseCase = new ListEventsUseCase(repository);
    this.createUseCase = new CreateEventUseCase(repository);
    this.findByTypeUseCase = new FindEventsByTypeUseCase(repository);
  }

  @Get()
  async getAllEvents(@Query('type') type?: string) {
    const events = type
      ? await this.findByTypeUseCase.execute(type)
      : await this.listUseCase.execute();

    return events.map(event => ({
      id: event.id,
      title: event.title,
      description: event.description,
      date: event.date,
      type: event.type,
      imageUrl: event.imageUrl,
    }));
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post()
  async createEvent(@Body() dto: CreateEventDto) {
    const event = await this.createUseCase.execute(dto);
    return {
      id: event.id,
      title: event.title,
      description: event.description,
      date: event.date,
      type: event.type,
      imageUrl: event.imageUrl,
    };
  }
}
