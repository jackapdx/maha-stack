import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="px-6 py-20">
      <div class="mx-auto max-w-2xl">
        <a routerLink="/" class="inline-flex items-center gap-1.5 text-xs text-surface-400 hover:text-surface-600 transition-colors mb-10">
          ← Back to home
        </a>

        <h1 class="text-3xl font-bold tracking-tight text-surface-900">About</h1>
        <p class="mt-3 text-sm leading-relaxed text-surface-400">
          Built with the Maha-Grand stack — Angular 21 + NestJS 11, zoneless, Nx-powered.
        </p>

        <div class="mt-10 space-y-8">
          <div class="rounded-xl border border-surface-200/60 bg-white p-6 shadow-sm">
            <h2 class="text-sm font-semibold text-surface-900">Stack</h2>
            <div class="mt-3 flex flex-wrap gap-2">
              <span class="rounded-md bg-surface-100 px-2.5 py-1 text-xs font-medium text-surface-600">Angular 21</span>
              <span class="rounded-md bg-surface-100 px-2.5 py-1 text-xs font-medium text-surface-600">NestJS 11</span>
              <span class="rounded-md bg-surface-100 px-2.5 py-1 text-xs font-medium text-surface-600">tRPC</span>
              <span class="rounded-md bg-surface-100 px-2.5 py-1 text-xs font-medium text-surface-600">Zod</span>
              <span class="rounded-md bg-surface-100 px-2.5 py-1 text-xs font-medium text-surface-600">Zoneless</span>
              <span class="rounded-md bg-surface-100 px-2.5 py-1 text-xs font-medium text-surface-600">Nx</span>
            </div>
          </div>

          <div class="rounded-xl border border-surface-200/60 bg-white p-6 shadow-sm">
            <h2 class="text-sm font-semibold text-surface-900">Architect</h2>
            <p class="mt-1.5 text-sm text-surface-400">Architect</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class AboutComponent {}
