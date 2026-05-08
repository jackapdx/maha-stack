import { z } from 'zod';

// Type utilities
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type Maybe<T> = T | null | undefined;

export type DeepPartial<T> = T extends object ? {
  [P in keyof T]?: DeepPartial<T[P]>;
} : T;

export type WithId<T> = T & { id: string };
export type WithTimestamps<T> = T & {
  createdAt: Date | string;
  updatedAt: Date | string;
};

// String utilities
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function truncate(str: string, length: number, suffix = '...'): string {
  if (str.length <= length) return str;
  return str.slice(0, length - suffix.length) + suffix;
}

// Date utilities
export function formatDate(date: Date | string, format = 'en-US'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString(format, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatRelativeTime(date: Date | string): string {
  const now = new Date();
  const past = typeof date === 'string' ? new Date(date) : date;
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)} weeks ago`;
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`;
  return `${Math.floor(diffInSeconds / 31536000)} years ago`;
}

// Validation utilities
export function createValidator<T extends z.ZodTypeAny>(schema: T) {
  return (data: unknown): data is z.infer<T> => {
    try {
      schema.parse(data);
      return true;
    } catch {
      return false;
    }
  };
}

// HTTP utilities
export async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeout = 10000
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

export async function safeJsonParse<T>(text: string): Promise<{ data?: T; error?: string }> {
  try {
    const data = JSON.parse(text) as T;
    return { data };
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Invalid JSON' };
  }
}

// Environment utilities
export function getEnv(key: string, defaultValue?: string): string {
  // @ts-ignore
  const value = typeof process !== 'undefined' ? process.env[key] : undefined;
  
  if (value === undefined) {
    if (defaultValue === undefined) {
      throw new Error(`Environment variable ${key} is not set`);
    }
    return defaultValue;
  }
  
  return value;
}

export function isProduction(): boolean {
  // @ts-ignore
  return typeof process !== 'undefined' && process.env.NODE_ENV === 'production';
}

export function isDevelopment(): boolean {
  // In a shared library, we can't reliably detect environment
  // Return false by default - applications should set their own environment detection
  return false;
}

// UUID utilities
export function generateUuid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function validateUuid(uuid: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(uuid);
}

// Logging utilities
export class Logger {
  static info(message: string, ...args: unknown[]): void {
    console.log(`[INFO] ${new Date().toISOString()} - ${message}`, ...args);
  }
  
  static warn(message: string, ...args: unknown[]): void {
    console.warn(`[WARN] ${new Date().toISOString()} - ${message}`, ...args);
  }
  
  static error(message: string, ...args: unknown[]): void {
    console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, ...args);
  }
  
  static debug(message: string, ...args: unknown[]): void {
    // Debug logging - can be filtered by log level in production
    console.debug(`[DEBUG] ${new Date().toISOString()} - ${message}`, ...args);
  }
}