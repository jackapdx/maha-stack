import { bootstrapApplication } from '@angular/platform-browser';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { provideTrpcClient } from './trpc.service';

bootstrapApplication(AppComponent, {
  providers: [
    
    provideZonelessChangeDetection(),
    
    provideRouter(routes),
    provideTrpcClient(),
  ],
}).catch((err) => console.error(err));
