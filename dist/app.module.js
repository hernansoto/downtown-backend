"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const reservation_controller_1 = require("./interfaces/http/controllers/reservation.controller");
const event_controller_1 = require("./interfaces/http/controllers/event.controller");
const auth_controller_1 = require("./interfaces/http/controllers/auth.controller");
const payment_controller_1 = require("./interfaces/http/controllers/payment.controller");
const prisma_service_1 = require("./infrastructure/database/prisma/prisma.service");
const mercadopago_service_1 = require("./infrastructure/external/mercadopago/mercadopago.service");
const mercadopago_controller_1 = require("./interfaces/http/controllers/mercadopago.controller");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
        ],
        controllers: [
            auth_controller_1.AuthController,
            reservation_controller_1.ReservationController,
            event_controller_1.EventController,
            payment_controller_1.PaymentController,
            mercadopago_controller_1.MercadoPagoController
        ],
        providers: [
            prisma_service_1.PrismaService,
            mercadopago_service_1.MercadoPagoService,
        ],
    })
], AppModule);
