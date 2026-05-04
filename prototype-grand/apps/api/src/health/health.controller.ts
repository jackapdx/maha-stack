import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';

export interface HealthResponse {
  status: 'ok' | 'error';
  timestamp: string;
  uptime: number;
  memory: {
    rss: number;
    heapTotal: number;
    heapUsed: number;
    external: number;
  };
  database: 'connected' | 'disconnected';
}

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  getHealth(): HealthResponse {
    return this.healthService.getHealth();
  }

  @Get('live')
  getLiveness(): { status: 'ok' } {
    return { status: 'ok' };
  }

  @Get('ready')
  getReadiness(): { status: 'ready' } {
    return { status: 'ready' };
  }
}