import { MercadoPagoService } from '../../infrastructure/external/mercadopago/mercadopago.service';

export class CreatePaymentUseCase {
  constructor(private readonly mpService: MercadoPagoService) {}

  async execute(reservationId: string) {
    return this.mpService.createPreference({ reservationId });
  }
}
