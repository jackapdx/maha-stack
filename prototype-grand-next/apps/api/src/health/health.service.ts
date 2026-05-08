import { Injectable } from '@nestjs/common';
import { HealthResponse } from './health.controller';

@Injectable()
export class HealthService {
  private readonly startTime = Date.now();

  getHealth(): HealthResponse {
    const memoryUsage = process.memoryUsage();
    
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: Date.now() - this.startTime,
      memory: {
        rss: Math.round(memoryUsage.rss / 1024 / 1024),
        heapTotal: Math.round(memoryUsage.heapTotal / 1024 / 1024),
        heapUsed: Math.round(memoryUsage.heapUsed / 1024 / 1024),
        external: Math.round(memoryUsage.external / 1024 / 1024),
      },
      database: 'connected', // In a real app, check actual database connection
    };
  }
}