import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

export interface NavItem {
  label: string;
  route: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <nav class="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-surface-200">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a routerLink="/" class="flex items-center gap-2 text-lg font-bold text-surface-900">
          <span class="text-maha-600">🔱</span>
          {{ appName() }}
        </a>
        <div class="flex items-center gap-6">
          @for (item of menuItems(); track item.route) {
            <a
              [routerLink]="item.route"
              class="text-sm text-surface-600 hover:text-maha-700 transition-all"
              routerLinkActive="text-maha-700 font-medium"
              [routerLinkActiveOptions]="{ exact: true }"
            >
              {{ item.label }}
            </a>
          }
          <a routerLink="/dashboard" class="mha-btn mha-btn-primary mha-btn-sm">
            Get Started
          </a>
        </div>
      </div>
    </nav>
  `,
  styles: [],
})
export class NavbarComponent {
  appName = input.required<string>();
  menuItems = input.required<NavItem[]>();
}
