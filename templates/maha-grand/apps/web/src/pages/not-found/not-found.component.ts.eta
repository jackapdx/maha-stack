import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="flex min-h-[70vh] flex-col items-center justify-center px-6">
      <div class="mx-auto max-w-sm text-center">
        <div class="text-4xl mb-6">🔍</div>
        <h1 class="text-2xl font-bold tracking-tight text-surface-900">Page not found</h1>
        <p class="mt-2 text-sm text-surface-400">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div class="mt-8">
          <a routerLink="/" class="inline-flex items-center justify-center rounded-lg border border-surface-200/60 bg-white px-4 py-2 text-sm font-medium text-surface-600 shadow-sm transition-all hover:shadow-md hover:text-surface-900">
            ← Back to home
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class NotFoundComponent {}
