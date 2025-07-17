import { UserRepository } from '../../domain/repositories/user.repository';
import { RegisterUserDto } from '../dtos/register-user.dto';
import { User } from '../../domain/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export class RegisterUserUseCase {
  constructor(private readonly repository: UserRepository) {}

  async execute(dto: RegisterUserDto): Promise<User> {
    const existing = await this.repository.findByEmail(dto.email);
    if (existing) throw new Error('Email ya registrado');

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const now = new Date();

    const user = new User(
        uuidv4(),
        dto.name,
        dto.email,
        hashedPassword,
        dto.role ?? 'CLIENT', // ← usa el rol si viene, o 'CLIENT' por default
        now
    );

    return this.repository.create({
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role
    });
  }
}
