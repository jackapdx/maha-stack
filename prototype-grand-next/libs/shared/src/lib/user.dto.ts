import { z } from 'zod';

// Common constants
export const UserRole = {
  USER: 'user',
  ADMIN: 'admin',
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];

// User DTOs
export const CreateUserDto = z.object({
  email: z.string().email().min(1, 'Email is required'),
  name: z.string().min(1, 'Name is required').max(100, 'Name must be 100 characters or less'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum([UserRole.USER, UserRole.ADMIN]).default(UserRole.USER),
});

export type CreateUserDto = z.infer<typeof CreateUserDto>;

export const UpdateUserDto = CreateUserDto.partial().omit({ password: true });
export type UpdateUserDto = z.infer<typeof UpdateUserDto>;

export const UserResponseDto = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string(),
  role: z.enum([UserRole.USER, UserRole.ADMIN]),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type UserResponseDto = z.infer<typeof UserResponseDto>;

// Auth DTOs
export const LoginDto = z.object({
  email: z.string().email().min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required'),
});

export type LoginDto = z.infer<typeof LoginDto>;

export const AuthResponseDto = z.object({
  user: UserResponseDto,
  token: z.string(),
  expiresIn: z.string(),
});

export type AuthResponseDto = z.infer<typeof AuthResponseDto>;

// Query DTOs
export const PaginationDto = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(20),
  search: z.string().optional(),
});

export type PaginationDto = z.infer<typeof PaginationDto>;

export const PaginatedResponseDto = <T extends z.ZodTypeAny>(schema: T) =>
  z.object({
    items: z.array(schema),
    total: z.number().int().positive(),
    page: z.number().int().positive(),
    limit: z.number().int().positive(),
    totalPages: z.number().int().positive(),
  });

// Validation helpers
export const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validatePassword = (password: string): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (password.length < 6) {
    errors.push('Password must be at least 6 characters');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
};
