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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MercadoPagoController = void 0;
// src/interfaces/http/controllers/mercadopago.controller.ts
const common_1 = require("@nestjs/common");
const mercadopago_service_1 = require("../../../infrastructure/external/mercadopago/mercadopago.service");
const prisma_service_1 = require("../../../infrastructure/database/prisma/prisma.service");
let MercadoPagoController = class MercadoPagoController {
    constructor(mpService, prisma) {
        this.mpService = mpService;
        this.prisma = prisma;
    }
    async handleWebhook(req, res) {
        const { query } = req;
        // Confirmamos que es un pago
        if (query.type === 'payment') {
            const paymentId = query['data.id'];
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
};
exports.MercadoPagoController = MercadoPagoController;
__decorate([
    (0, common_1.Post)('webhook'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MercadoPagoController.prototype, "handleWebhook", null);
exports.MercadoPagoController = MercadoPagoController = __decorate([
    (0, common_1.Controller)('mercadopago'),
    __metadata("design:paramtypes", [mercadopago_service_1.MercadoPagoService,
        prisma_service_1.PrismaService])
], MercadoPagoController);
