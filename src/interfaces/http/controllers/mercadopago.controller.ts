// src/interfaces/http/controllers/mercadopago.controller.ts
import {
  Controller,
  Post,
  Body,
  Req,
  Res,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { MercadoPagoService } from '../../../infrastructure/external/mercadopago/mercadopago.service';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { Request, Response } from 'express';

@Controller('mercadopago')
export class MercadoPagoController {
  constructor(
    private readonly mpService: MercadoPagoService,
    private readonly prisma: PrismaService,
  ) {}

  @Post('webhook')
  @HttpCode(HttpStatus.OK)
  async handleWebhook(@Req() req: Request, @Res() res: Response) {
    const { query } = req;

    // Confirmamos que es un pago
    if (query.type === 'payment') {
      const paymentId = query['data.id'] as string;

      const payment = await this.mpService.getPaymentById(paymentId);

      if (payment.status === 'approved') {
        const reservationId = payment.external_reference;

        await this.prisma.reservation.update({
          where: { id: reservationId },
          data: { status: 'confirmed' },
        });

        console.log(`✅ Reserva ${reservationId} confirmada automáticamente.`);
      }
    }

    res.sendStatus(200);
  }
}
