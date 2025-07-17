"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reservation = void 0;
class Reservation {
    constructor(id, date, time, status, createdAt, updatedAt) {
        this.id = id;
        this.date = date;
        this.time = time;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
exports.Reservation = Reservation;
