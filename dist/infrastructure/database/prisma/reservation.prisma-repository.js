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
exports.ReservationPrismaRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("./prisma.service");
const reservation_entity_1 = require("../../../domain/entities/reservation.entity");
let ReservationPrismaRepository = class ReservationPrismaRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const created = await this.prisma.reservation.create({
            data: {
                date: data.date,
                time: data.time,
                status: data.status,
            },
        });
        return new reservation_entity_1.Reservation(created.id, created.date, created.time, created.status, created.createdAt, created.updatedAt);
    }
    async findByDateAndTime(date, time) {
        const found = await this.prisma.reservation.findFirst({
            where: {
                date: date,
                time: time,
            },
        });
        if (!found)
            return null;
        return new reservation_entity_1.Reservation(found.id, found.date, found.time, found.status, found.createdAt, found.updatedAt);
    }
    async findAll() {
        const rows = await this.prisma.reservation.findMany({
            orderBy: { date: 'asc' }
        });
        return rows.map((r) => new reservation_entity_1.Reservation(r.id, r.date, r.time, r.status, r.createdAt, r.updatedAt));
    }
    async findById(id) {
        const found = await this.prisma.reservation.findUnique({ where: { id } });
        if (!found)
            return null;
        return new reservation_entity_1.Reservation(found.id, found.date, found.time, found.status, found.createdAt, found.updatedAt);
    }
    async updateStatus(id, status) {
        const updated = await this.prisma.reservation.update({
            where: { id },
            data: { status }
        });
        return new reservation_entity_1.Reservation(updated.id, updated.date, updated.time, updated.status, updated.createdAt, updated.updatedAt);
    }
    async findByDate(date) {
        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) {
            throw new Error('Invalid date format. Expected YYYY-MM-DD');
        }
        // Esto compara solo la fecha, sin hora
        const start = new Date(parsedDate);
        start.setHours(0, 0, 0, 0);
        const end = new Date(parsedDate);
        end.setHours(23, 59, 59, 999);
        const results = await this.prisma.reservation.findMany({
            where: {
                date: {
                    gte: start,
                    lte: end,
                },
            },
        });
        return results.map((r) => new reservation_entity_1.Reservation(r.id, r.date, r.time, r.status, r.createdAt, r.updatedAt));
    }
};
exports.ReservationPrismaRepository = ReservationPrismaRepository;
exports.ReservationPrismaRepository = ReservationPrismaRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReservationPrismaRepository);
