import { Injectable, NotFoundException } from '@nestjs/common';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: '1',
      email: 'demo@example.com',
      name: 'Demo User',
      role: 'user',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    },
    {
      id: '2',
      email: 'admin@example.com',
      name: 'Admin User',
      role: 'admin',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    },
  ];

  findAll(): User[] {
    return this.users;
  }

  findOne(id: string): User {
    const user = this.users.find(u => u.id === id);
    
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    
    return user;
  }

  findByEmail(email: string): User | undefined {
    return this.users.find(u => u.email === email);
  }

  create(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): User {
    const newUser: User = {
      ...userData,
      id: String(this.users.length + 1),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    this.users.push(newUser);
    return newUser;
  }

  update(id: string, updateData: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>): User {
    const userIndex = this.users.findIndex(u => u.id === id);
    
    if (userIndex === -1) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    
    this.users[userIndex] = {
      ...this.users[userIndex],
      ...updateData,
      updatedAt: new Date(),
    };
    
    return this.users[userIndex];
  }

  delete(id: string): void {
    const userIndex = this.users.findIndex(u => u.id === id);
    
    if (userIndex === -1) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    
    this.users.splice(userIndex, 1);
  }
}