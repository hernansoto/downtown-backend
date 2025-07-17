"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListReservationsUseCase = void 0;
class ListReservationsUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute() {
        return this.repository.findAll();
    }
}
exports.ListReservationsUseCase = ListReservationsUseCase;
