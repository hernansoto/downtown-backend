import { UserRepository } from '../../domain/repositories/user.repository';
import { LoginUserDto } from '../dtos/login-user.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User } from '../../domain/entities/user.entity';

export class LoginUserUseCase {
  constructor(
    private readonly repository: UserRepository,
    private readonly jwtSecret: string
  ) {}

  async execute(dto: LoginUserDto): Promise<{ token: string; user: Omit<User, 'password'> }> {
    const user = await this.repository.findByEmail(dto.email);
    if (!user) throw new Error('Usuario no encontrado');

    const passwordMatch = await bcrypt.compare(dto.password, user.password);
    if (!passwordMatch) throw new Error('Contraseña incorrecta');

    const token = jwt.sign(
      { sub: user.id, email: user.email, role: user.role },
      this.jwtSecret,
      { expiresIn: '2h' }
    );

    const { password, ...userWithoutPassword } = user;
    return { token, user: userWithoutPassword };
  }
}
