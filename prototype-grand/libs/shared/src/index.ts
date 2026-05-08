// User DTOs — export everything except UserRole to avoid collision with types.ts
export {
  CreateUserDto,
  UpdateUserDto,
  UserResponseDto,
  LoginDto,
  AuthResponseDto,
  PaginationDto,
  PaginatedResponseDto,
  validateEmail,
  validatePassword,
} from './lib/user.dto';
export type {
  CreateUserDto as CreateUserDtoType,
  UpdateUserDto as UpdateUserDtoType,
  UserResponseDto as UserResponseDtoType,
  LoginDto as LoginDtoType,
  AuthResponseDto as AuthResponseDtoType,
  PaginationDto as PaginationDtoType,
} from './lib/user.dto';

// Error DTOs
export * from './lib/error.dto';

// Utility
export * from './lib/utility';

// Types — selectively export, omitting UserRole (which comes from user.dto.ts)
export type {
  ApiResponse,
  ApiError,
  PaginatedResponse,
  User,
  UserProfile,
  SocialLinks,
  AuthTokens,
  AuthResponse,
  LoginCredentials,
  RegisterData,
  HealthCheck,
  ServiceHealth,
  AppConfig,
  FeatureFlag,
  Notification,
  FileUpload,
  FormField,
  AppEvent,
  TrpcRouter,
  ValueOf,
  PartialBy,
  RequiredBy,
  DeepReadonly,
  AsyncResult,
  Result,
  UseQueryResult,
  UseMutationResult,
} from './lib/types';
export { withResult } from './lib/types';

// UserRole — preferred from user.dto.ts (Zod-compatible)
export { UserRole } from './lib/user.dto';
export type { UserRole as UserRoleType } from './lib/user.dto';
