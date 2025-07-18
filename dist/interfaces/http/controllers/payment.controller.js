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
exports.PaymentController = void 0;
const common_1 = require("@nestjs/common");
const create_payment_dto_1 = require("../../../application/dtos/create-payment.dto");
const create_payment_use_case_1 = require("../../../application/use-cases/create-payment.use-case");
const mercadopago_service_1 = require("../../../infrastructure/external/mercadopago/mercadopago.service");
let PaymentController = class PaymentController {
    constructor(mpService) {
        this.mpService = mpService;
        this.useCase = new create_payment_use_case_1.CreatePaymentUseCase(this.mpService);
    }
    async createPayment(dto) {
        const preference = await this.useCase.execute(dto.reservationId);
        return { init_point: preference.init_point };
    }
};
exports.PaymentController = PaymentController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_payment_dto_1.CreatePaymentDto]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "createPayment", null);
exports.PaymentController = PaymentController = __decorate([
    (0, common_1.Controller)('payments'),
    __metadata("design:paramtypes", [mercadopago_service_1.MercadoPagoService])
], PaymentController);
