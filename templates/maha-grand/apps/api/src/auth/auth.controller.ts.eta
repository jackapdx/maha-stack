import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService, AuthResponse } from './auth.service';

interface LoginDto {
  email: string;
  password: string;
}

interface RegisterDto extends LoginDto {
  name: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto): Promise<AuthResponse> {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto): Promise<AuthResponse> {
    return this.authService.register(registerDto.email, registerDto.password, registerDto.name);
  }

  @Post('me')
  @HttpCode(HttpStatus.OK)
  async getCurrentUser(): Promise<{ id: string; email: string; name: string; role: string }> {
    return {
      id: '1',
      email: 'demo@example.com',
      name: 'Demo User',
      role: 'user',
    };
  }
}