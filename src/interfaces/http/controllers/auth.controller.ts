import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserDto } from '../../../application/dtos/register-user.dto';
import { LoginUserDto } from '../../../application/dtos/login-user.dto';
import { RegisterUserUseCase } from '../../../application/use-cases/register-user.use-case';
import { LoginUserUseCase } from '../../../application/use-cases/login-user.use-case';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { UserPrismaRepository } from '../../../infrastructure/database/prisma/user.prisma-repository';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecreta';

@Controller('auth')
export class AuthController {
  private readonly registerUseCase: RegisterUserUseCase;
  private readonly loginUseCase: LoginUserUseCase;

  constructor(private readonly prisma: PrismaService) {
    const userRepo = new UserPrismaRepository(this.prisma);
    this.registerUseCase = new RegisterUserUseCase(userRepo);
    this.loginUseCase = new LoginUserUseCase(userRepo, JWT_SECRET);
  }

  @Post('register')
  async register(@Body() dto: RegisterUserDto) {
    const user = await this.registerUseCase.execute(dto);
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt
    };
  }

  @Post('login')
  async login(@Body() dto: LoginUserDto) {
    const result = await this.loginUseCase.execute(dto);
    return result;
  }
}
