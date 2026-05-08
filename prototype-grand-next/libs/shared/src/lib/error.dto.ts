import { z } from 'zod';

export const ErrorCode = {
  // HTTP Status based errors
  BAD_REQUEST: 'BAD_REQUEST',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  CONFLICT: 'CONFLICT',
  UNPROCESSABLE_ENTITY: 'UNPROCESSABLE_ENTITY',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
  
  // Domain specific errors
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  DATABASE_ERROR: 'DATABASE_ERROR',
  AUTH_ERROR: 'AUTH_ERROR',
  RATE_LIMIT_ERROR: 'RATE_LIMIT_ERROR',
  PERMISSION_ERROR: 'PERMISSION_ERROR',
} as const;

export type ErrorCode = typeof ErrorCode[keyof typeof ErrorCode];

export const ErrorResponseDto = z.object({
  statusCode: z.number(),
  code: z.nativeEnum(ErrorCode),
  message: z.string(),
  timestamp: z.string().datetime(),
  path: z.string(),
  method: z.string(),
  errors: z.array(z.object({
    field: z.string().optional(),
    message: z.string(),
  })).optional(),
});

export type ErrorResponseDto = z.infer<typeof ErrorResponseDto>;

// Error factory functions
export function createErrorResponse(
  statusCode: number,
  code: ErrorCode,
  message: string,
  path: string,
  method: string,
  errors?: { field?: string; message: string }[]
): ErrorResponseDto {
  return {
    statusCode,
    code,
    message,
    timestamp: new Date().toISOString(),
    path,
    method,
    errors,
  };
}

// Common error responses
export const Errors = {
  badRequest: (message: string, path: string, method: string) =>
    createErrorResponse(400, ErrorCode.BAD_REQUEST, message, path, method),
  
  unauthorized: (message: string, path: string, method: string) =>
    createErrorResponse(401, ErrorCode.UNAUTHORIZED, message, path, method),
  
  forbidden: (message: string, path: string, method: string) =>
    createErrorResponse(403, ErrorCode.FORBIDDEN, message, path, method),
  
  notFound: (message: string, path: string, method: string) =>
    createErrorResponse(404, ErrorCode.NOT_FOUND, message, path, method),
  
  conflict: (message: string, path: string, method: string) =>
    createErrorResponse(409, ErrorCode.CONFLICT, message, path, method),
  
  validationError: (errors: { field?: string; message: string }[], path: string, method: string) =>
    createErrorResponse(422, ErrorCode.VALIDATION_ERROR, 'Validation failed', path, method, errors),
  
  internalServerError: (path: string, method: string) =>
    createErrorResponse(500, ErrorCode.INTERNAL_SERVER_ERROR, 'Internal server error', path, method),
};

// Type-safe error handling
export class AppError extends Error {
  constructor(
    public statusCode: number,
    public code: ErrorCode,
    message: string,
    public path?: string,
    public method?: string,
    public errors?: { field?: string; message: string }[]
  ) {
    super(message);
    this.name = 'AppError';
  }

  toErrorResponse(): ErrorResponseDto {
    return createErrorResponse(
      this.statusCode,
      this.code,
      this.message,
      this.path || '',
      this.method || '',
      this.errors
    );
  }
}