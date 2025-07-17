"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePaymentUseCase = void 0;
class CreatePaymentUseCase {
    constructor(mpService) {
        this.mpService = mpService;
    }
    async execute(reservationId) {
        return this.mpService.createPreference({ reservationId });
    }
}
exports.CreatePaymentUseCase = CreatePaymentUseCase;
