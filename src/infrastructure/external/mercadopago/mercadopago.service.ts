import { Injectable } from '@nestjs/common';
import { MercadoPagoConfig, Preference, Payment as PaymentClient } from 'mercadopago';
import type { PreferenceRequest } from 'mercadopago/dist/clients/preference/commonTypes';
import type { PaymentResponse } from 'mercadopago/dist/clients/payment/commonTypes';

@Injectable()
export class MercadoPagoService {
  private readonly mp: MercadoPagoConfig;

  constructor() {
    this.mp = new MercadoPagoConfig({
      accessToken: process.env.MP_ACCESS_TOKEN!,
    });
  }

  async createPreference({ reservationId }: { reservationId: string }) {
    const preference: PreferenceRequest = {
      items: [
        {
          id: 'reserva-downtown-basket',
          title: 'Reserva Downtown Basket',
          quantity: 1,
          currency_id: 'ARS',
          unit_price: 35000,
        },
      ],
      external_reference: reservationId,
      notification_url: 'https://webhook.site/test', // Cambiar luego por tu endpoint real
      back_urls: {
        success: 'https://www.google.com',
        failure: 'https://www.google.com',
        pending: 'https://www.google.com',
      },
      auto_return: 'approved',
    };

    const preferenceClient = new Preference(this.mp);
    const result = await preferenceClient.create({ body: preference });
    return result;
  }

  async getPaymentById(paymentId: string): Promise<PaymentResponse> {
    const paymentClient = new PaymentClient(this.mp);
    const result = await paymentClient.get({ id: paymentId });
    return result;
  }
}
