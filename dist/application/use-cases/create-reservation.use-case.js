"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateReservationUseCase = void 0;
const reservation_entity_1 = require("../../domain/entities/reservation.entity");
const uuid_1 = require("uuid");
class CreateReservationUseCase {
    constructor(reservationRepository) {
        this.reservationRepository = reservationRepository;
    }
    async execute(dto) {
        const existing = await this.reservationRepository.findByDateAndTime(new Date(dto.date), dto.time);
        if (existing) {
            throw new Error('Turno no disponible para esa fecha y hora');
        }
        const now = new Date();
        const reservation = new reservation_entity_1.Reservation((0, uuid_1.v4)(), new Date(dto.date), dto.time, 'pending', now, now);
        return this.reservationRepository.create({
            date: reservation.date,
            time: reservation.time,
            status: reservation.status,
        });
    }
}
exports.CreateReservationUseCase = CreateReservationUseCase;
