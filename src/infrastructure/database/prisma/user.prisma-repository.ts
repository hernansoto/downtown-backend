import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { User } from '../../../domain/entities/user.entity';

@Injectable()
export class UserPrismaRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    const created = await this.prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role
      }
    });

    return new User(
      created.id,
      created.name,
      created.email,
      created.password,
      created.role,
      created.createdAt
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const found = await this.prisma.user.findUnique({ where: { email } });
    if (!found) return null;

    return new User(
      found.id,
      found.name,
      found.email,
      found.password,
      found.role,
      found.createdAt
    );
  }

  async findById(id: string): Promise<User | null> {
    const found = await this.prisma.user.findUnique({ where: { id } });
    if (!found) return null;

    return new User(
      found.id,
      found.name,
      found.email,
      found.password,
      found.role,
      found.createdAt
    );
  }
}
