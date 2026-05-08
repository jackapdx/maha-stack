import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request, Response } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const startTime = Date.now();
    
    const { method, url, ip } = request;
    
    console.log(`[${new Date().toISOString()}] ${method} ${url} - ${ip} - Request started`);
    
    return next.handle().pipe(
      tap({
        next: () => {
          const duration = Date.now() - startTime;
          console.log(`[${new Date().toISOString()}] ${method} ${url} - ${response.statusCode} - ${duration}ms - Request completed`);
        },
        error: (error) => {
          const duration = Date.now() - startTime;
          console.error(`[${new Date().toISOString()}] ${method} ${url} - ${response.statusCode} - ${duration}ms - Request failed: ${error.message}`);
        },
      }),
    );
  }
}