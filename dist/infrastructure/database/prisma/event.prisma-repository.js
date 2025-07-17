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
exports.EventPrismaRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("./prisma.service");
const event_entity_1 = require("../../../domain/entities/event.entity");
let EventPrismaRepository = class EventPrismaRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        const events = await this.prisma.event.findMany({
            orderBy: { date: 'asc' }
        });
        return events.map(event => new event_entity_1.Event(event.id, event.title, event.description, event.date, event.type, event.imageUrl, event.createdAt, event.updatedAt));
    }
    async create(event) {
        const created = await this.prisma.event.create({
            data: {
                id: event.id,
                title: event.title,
                description: event.description,
                date: event.date,
                type: event.type,
                imageUrl: event.imageUrl,
                createdAt: event.createdAt,
                updatedAt: event.updatedAt
            }
        });
        return new event_entity_1.Event(created.id, created.title, created.description, created.date, created.type, created.imageUrl, created.createdAt, created.updatedAt);
    }
    async findByType(type) {
        const events = await this.prisma.event.findMany({
            where: { type },
            orderBy: { date: 'asc' },
        });
        return events.map(event => new event_entity_1.Event(event.id, event.title, event.description, event.date, event.type, event.imageUrl, event.createdAt, event.updatedAt));
    }
};
exports.EventPrismaRepository = EventPrismaRepository;
exports.EventPrismaRepository = EventPrismaRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EventPrismaRepository);
