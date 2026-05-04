import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  template: `
    <div class="min-h-screen flex flex-col bg-surface-50">
      <app-navbar [appName]="appName()" [menuItems]="menuItems()" />
      <main class="flex-grow pt-16">
        <router-outlet />
      </main>
      <app-footer [appName]="appName()" [year]="currentYear()" />
    </div>
  `,
  styles: [],
})
export class AppComponent {
  appName = signal('prototype-grand');
  menuItems = signal([
    { label: 'Home', route: '/' },
    { label: 'About', route: '/about' },
  ]);
  currentYear = computed(() => new Date().getFullYear());
}
