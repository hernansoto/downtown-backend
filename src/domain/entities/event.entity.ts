export class Event {
  constructor(
    public readonly id: string,
    public title: string,
    public description: string,
    public date: Date,
    public type: string,
    public imageUrl: string | null,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}