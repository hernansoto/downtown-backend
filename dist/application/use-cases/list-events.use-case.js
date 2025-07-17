"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListEventsUseCase = void 0;
class ListEventsUseCase {
    constructor(eventRepository) {
        this.eventRepository = eventRepository;
    }
    async execute() {
        return this.eventRepository.findAll();
    }
}
exports.ListEventsUseCase = ListEventsUseCase;
