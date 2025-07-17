import { User } from '../entities/user.entity';

export interface UserRepository {
  create(user: Omit<User, 'id' | 'createdAt'>): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
}
