"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEventUseCase = void 0;
const event_entity_1 = require("../../domain/entities/event.entity");
const uuid_1 = require("uuid");
class CreateEventUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(dto) {
        var _a;
        const now = new Date();
        const event = new event_entity_1.Event((0, uuid_1.v4)(), dto.title, dto.description, new Date(dto.date), dto.type, (_a = dto.imageUrl) !== null && _a !== void 0 ? _a : null, now, now);
        return this.repository.create(event);
    }
}
exports.CreateEventUseCase = CreateEventUseCase;
