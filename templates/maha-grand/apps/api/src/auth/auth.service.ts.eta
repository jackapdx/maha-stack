import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  role: 'user' | 'admin';
}

export interface AuthResponse {
  user: Omit<User, 'password'>;
  token: string;
}

@Injectable()
export class AuthService {
  private users: User[] = [
    {
      id: '1',
      email: 'demo@example.com',
      name: 'Demo User',
      password: '$2b$10$YourHashedPasswordHere',
      role: 'user',
    },
  ];

  constructor(private readonly jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<Omit<User, 'password'> | null> {
    const user = this.users.find(u => u.email === email);
    
    if (!user) {
      return null;
    }
    
    // In a real app, you would compare with bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return null;
    }
    
    const { password: _, ...result } = user;
    return result;
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    const user = await this.validateUser(email, password);
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);
    
    return {
      user,
      token,
    };
  }

  async register(email: string, password: string, name: string): Promise<AuthResponse> {
    const existingUser = this.users.find(u => u.email === email);
    
    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: User = {
      id: String(this.users.length + 1),
      email,
      name,
      password: hashedPassword,
      role: 'user',
    };
    
    this.users.push(newUser);
    
    const payload = { sub: newUser.id, email: newUser.email, role: newUser.role };
    const token = this.jwtService.sign(payload);
    
    const { password: _, ...userWithoutPassword } = newUser;
    
    return {
      user: userWithoutPassword,
      token,
    };
  }
}