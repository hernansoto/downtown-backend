"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MercadoPagoService = void 0;
const common_1 = require("@nestjs/common");
const mercadopago_1 = require("mercadopago");
let MercadoPagoService = class MercadoPagoService {
    constructor() {
        this.mp = new mercadopago_1.MercadoPagoConfig({
            accessToken: process.env.MP_ACCESS_TOKEN,
        });
    }
    async createPreference({ reservationId }) {
        const preference = {
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
        const preferenceClient = new mercadopago_1.Preference(this.mp);
        const result = await preferenceClient.create({ body: preference });
        return result;
    }
    async getPaymentById(paymentId) {
        const paymentClient = new mercadopago_1.Payment(this.mp);
        const result = await paymentClient.get({ id: paymentId });
        return result;
    }
};
exports.MercadoPagoService = MercadoPagoService;
exports.MercadoPagoService = MercadoPagoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], MercadoPagoService);
