export class RegisterUserDto {
  name!: string;
  email!: string;
  password!: string;
  role?: 'ADMIN' | 'CLIENT';
}
