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
exports.ReservationController = void 0;
const common_1 = require("@nestjs/common");
const create_reservation_use_case_1 = require("../../../application/use-cases/create-reservation.use-case");
const list_reservations_use_case_1 = require("../../../application/use-cases/list-reservations.use-case");
const cancel_reservation_use_case_1 = require("../../../application/use-cases/cancel-reservation.use-case");
const list_available_times_use_case_1 = require("../../../application/use-cases/list-available-times.use-case");
const create_reservation_dto_1 = require("../../../application/dtos/create-reservation.dto");
const reservation_prisma_repository_1 = require("../../../infrastructure/database/prisma/reservation.prisma-repository");
const prisma_service_1 = require("../../../infrastructure/database/prisma/prisma.service");
let ReservationController = class ReservationController {
    constructor(prisma) {
        this.prisma = prisma;
        const repository = new reservation_prisma_repository_1.ReservationPrismaRepository(this.prisma);
        this.createUseCase = new create_reservation_use_case_1.CreateReservationUseCase(repository);
        this.listUseCase = new list_reservations_use_case_1.ListReservationsUseCase(repository);
        this.cancelUseCase = new cancel_reservation_use_case_1.CancelReservationUseCase(repository);
        this.availableUseCase = new list_available_times_use_case_1.ListAvailableTimesUseCase(repository);
    }
    async createReservation(dto) {
        const reservation = await this.createUseCase.execute(dto);
        return {
            id: reservation.id,
            date: reservation.date,
            time: reservation.time,
            status: reservation.status,
        };
    }
    async getAllReservations() {
        const reservations = await this.listUseCase.execute();
        return reservations.map(r => ({
            id: r.id,
            date: r.date,
            time: r.time,
            status: r.status
        }));
    }
    async cancelReservation(id) {
        try {
            const reservation = await this.cancelUseCase.execute(id);
            return {
                id: reservation.id,
                status: reservation.status,
                date: reservation.date,
                time: reservation.time
            };
        }
        catch (err) {
            return {
                error: err instanceof Error ? err.message : 'An unknown error occurred'
            };
        }
    }
    async getAvailableTimes(date) {
        if (!date) {
            throw new common_1.BadRequestException('Missing date parameter (YYYY-MM-DD)');
        }
        const times = await this.availableUseCase.execute(date);
        return { available: times };
    }
};
exports.ReservationController = ReservationController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_reservation_dto_1.CreateReservationDto]),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "createReservation", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "getAllReservations", null);
__decorate([
    (0, common_1.Patch)(':id/cancel'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "cancelReservation", null);
__decorate([
    (0, common_1.Get)('available'),
    __param(0, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "getAvailableTimes", null);
exports.ReservationController = ReservationController = __decorate([
    (0, common_1.Controller)('reservations'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReservationController);
