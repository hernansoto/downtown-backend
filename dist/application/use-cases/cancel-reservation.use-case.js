"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CancelReservationUseCase = void 0;
class CancelReservationUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(id) {
        const reservation = await this.repository.findById(id);
        if (!reservation) {
            throw new Error('Reserva no encontrada');
        }
        if (reservation.status === 'cancelled') {
            throw new Error('La reserva ya está cancelada');
        }
        reservation.status = 'cancelled';
        return this.repository.updateStatus(id, 'cancelled');
    }
}
exports.CancelReservationUseCase = CancelReservationUseCase;
