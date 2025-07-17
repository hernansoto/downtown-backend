export class Reservation {
  constructor(
    public readonly id: string,
    public date: Date,
    public time: string,
    public status: 'pending' | 'confirmed' | 'cancelled',
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}