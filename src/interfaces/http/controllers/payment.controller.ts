import { Body, Controller, Post } from '@nestjs/common';
import { CreatePaymentDto } from '../../../application/dtos/create-payment.dto';
import { CreatePaymentUseCase } from '../../../application/use-cases/create-payment.use-case';
import { MercadoPagoService } from '../../../infrastructure/external/mercadopago/mercadopago.service';

@Controller('payments')
export class PaymentController {
  private readonly useCase: CreatePaymentUseCase;

  constructor(private readonly mpService: MercadoPagoService) {
    this.useCase = new CreatePaymentUseCase(this.mpService);
  }

  @Post()
  async createPayment(@Body() dto: CreatePaymentDto) {
    const preference = await this.useCase.execute(dto.reservationId);
    return { init_point: preference.init_point };
  }
}
