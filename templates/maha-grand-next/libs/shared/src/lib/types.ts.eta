// API Response Types
export interface ApiResponse<T = unknown> {
  data?: T;
  error?: ApiError;
  success: boolean;
  timestamp: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  isActive: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export type UserRole = 'user' | 'admin' | 'moderator';

export interface UserProfile extends User {
  bio?: string;
  location?: string;
  website?: string;
  socialLinks?: SocialLinks;
}

export interface SocialLinks {
  github?: string;
  twitter?: string;
  linkedin?: string;
  website?: string;
}

// Auth Types
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
}

export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData extends LoginCredentials {
  name: string;
  confirmPassword: string;
}

// Health Check Types
export interface HealthCheck {
  status: 'healthy' | 'degraded' | 'unhealthy';
  uptime: number;
  timestamp: string;
  services: Record<string, ServiceHealth>;
}

export interface ServiceHealth {
  status: 'up' | 'down' | 'degraded';
  latency?: number;
  error?: string;
}

// Application Types
export interface AppConfig {
  environment: 'development' | 'staging' | 'production';
  version: string;
  apiUrl: string;
  appName: string;
  features: Record<string, boolean>;
}

export interface FeatureFlag {
  name: string;
  description: string;
  enabled: boolean;
  environments: string[];
}

// Notification Types
export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date | string;
  data?: Record<string, unknown>;
}

// File Types
export interface FileUpload {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  uploadedAt: Date | string;
}

// Form Types
export interface FormField<T = unknown> {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'checkbox' | 'textarea';
  value: T;
  required: boolean;
  disabled?: boolean;
  placeholder?: string;
  options?: Array<{ label: string; value: string }>;
  validation?: {
    pattern?: RegExp;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    custom?: (value: T) => string | null;
  };
  error?: string;
}

// Event Types
export interface AppEvent {
  type: string;
  payload: unknown;
  timestamp: string;
  source: string;
}

// tRPC Types
export type TrpcRouter = {
  [key: string]: {
    query?: (input: unknown) => Promise<unknown>;
    mutation?: (input: unknown) => Promise<unknown>;
  };
};

// Utility Types
export type ValueOf<T> = T[keyof T];

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

export type DeepReadonly<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
};

// Promise Types
export type AsyncResult<T, E = Error> = Promise<Result<T, E>>;

export type Result<T, E = Error> = 
  | { success: true; data: T }
  | { success: false; error: E };

export async function withResult<T, E = Error>(
  promise: Promise<T>
): Promise<Result<T, E>> {
  try {
    const data = await promise;
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error as E };
  }
}

// React Hook Types (for frontend compatibility)
export interface UseQueryResult<T> {
  data: T | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => void;
}

export interface UseMutationResult<T, V> {
  mutate: (variables: V) => Promise<T>;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  isSuccess: boolean;
  reset: () => void;
}