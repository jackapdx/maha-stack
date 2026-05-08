import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from './trpc/trpc.router';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS
  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:4200',
    credentials: true,
  });
  
  // Global pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  
  // Global filters
  app.useGlobalFilters(new GlobalExceptionFilter());
  
  // Global interceptors
  app.useGlobalInterceptors(new LoggingInterceptor());
  
  // tRPC endpoint
  app.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      router: appRouter,
    }),
  );

  app.setGlobalPrefix('api/v1');
  
  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  console.log(`🚀 API server running on http://localhost:${port}`);
  console.log(`🔧 tRPC endpoint available at http://localhost:${port}/trpc`);
  console.log(`📚 API documentation at http://localhost:${port}/api/v1`);
}
bootstrap();
