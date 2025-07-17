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
exports.EventController = void 0;
const common_1 = require("@nestjs/common");
const event_prisma_repository_1 = require("../../../infrastructure/database/prisma/event.prisma-repository");
const prisma_service_1 = require("../../../infrastructure/database/prisma/prisma.service");
const list_events_use_case_1 = require("../../../application/use-cases/list-events.use-case");
const create_event_use_case_1 = require("../../../application/use-cases/create-event.use-case");
const create_event_dto_1 = require("../../../application/dtos/create-event.dto");
const auth_guard_1 = require("../guards/auth.guard");
const roles_guard_1 = require("../guards/roles.guard");
const roles_decorator_1 = require("../decorators/roles.decorator");
const find_events_by_type_use_case_1 = require("../../../application/use-cases/find-events-by-type.use-case");
let EventController = class EventController {
    constructor(prisma) {
        this.prisma = prisma;
        const repository = new event_prisma_repository_1.EventPrismaRepository(this.prisma);
        this.listUseCase = new list_events_use_case_1.ListEventsUseCase(repository);
        this.createUseCase = new create_event_use_case_1.CreateEventUseCase(repository);
        this.findByTypeUseCase = new find_events_by_type_use_case_1.FindEventsByTypeUseCase(repository);
    }
    async getAllEvents(type) {
        const events = type
            ? await this.findByTypeUseCase.execute(type)
            : await this.listUseCase.execute();
        return events.map(event => ({
            id: event.id,
            title: event.title,
            description: event.description,
            date: event.date,
            type: event.type,
            imageUrl: event.imageUrl,
        }));
    }
    async createEvent(dto) {
        const event = await this.createUseCase.execute(dto);
        return {
            id: event.id,
            title: event.title,
            description: event.description,
            date: event.date,
            type: event.type,
            imageUrl: event.imageUrl,
        };
    }
};
exports.EventController = EventController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "getAllEvents", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_event_dto_1.CreateEventDto]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "createEvent", null);
exports.EventController = EventController = __decorate([
    (0, common_1.Controller)('events'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EventController);
