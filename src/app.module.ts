import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ReservationController } from './interfaces/http/controllers/reservation.controller';
import { EventController } from './interfaces/http/controllers/event.controller';
import { AuthController } from './interfaces/http/controllers/auth.controller';
import { PaymentController } from './interfaces/http/controllers/payment.controller';
import { PrismaService } from './infrastructure/database/prisma/prisma.service';
import { MercadoPagoService } from './infrastructure/external/mercadopago/mercadopago.service';
import { MercadoPagoController } from './interfaces/http/controllers/mercadopago.controller';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [
    AuthController,
    ReservationController,
    EventController,
    PaymentController,
    MercadoPagoController
  ],
  providers: [
    PrismaService,
    MercadoPagoService,
  ],
})
export class AppModule {}
