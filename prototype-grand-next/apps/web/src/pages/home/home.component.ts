import { Component, signal, computed, OnDestroy } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="flex min-h-[75vh] flex-col items-center justify-center px-6 py-24">
      <div class="mx-auto max-w-xl text-center">
        <!-- Status badge -->
        <div class="mb-8 inline-flex items-center gap-2 rounded-full border border-surface-200/60 bg-white px-4 py-1.5 text-xs text-surface-500 shadow-sm">
          <span class="relative flex size-2">
            @if (apiStatus() === 'checking') {
              <span class="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 bg-amber-400"></span>
              <span class="relative inline-flex size-2 rounded-full bg-amber-400"></span>
            } @else if (apiStatus() === 'online') {
              <span class="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 bg-green-500"></span>
              <span class="relative inline-flex size-2 rounded-full bg-green-500"></span>
            } @else {
              <span class="relative inline-flex size-2 rounded-full bg-red-400"></span>
            }
          </span>
          {{ statusLabel() }}
        </div>

        <h1 class="text-4xl font-bold tracking-tight text-surface-900 sm:text-5xl">
          {{ projectName }}
        </h1>
        <p class="mt-4 text-base leading-relaxed text-surface-400">
          Generated from the Maha stack. Performance-optimized, AI-native, production-ready.
        </p>

        <!-- Stack pills -->
        <div class="mt-10 flex flex-wrap items-center justify-center gap-2">
          @for (s of stacks; track s.name) {
            <span class="inline-flex items-center gap-1.5 rounded-md border border-surface-200/60 bg-white px-3 py-1.5 text-xs font-medium text-surface-500 shadow-sm transition-shadow hover:shadow-md">
              <span class="text-sm">{{ s.icon }}</span>
              {{ s.name }}
            </span>
          }
        </div>
      </div>
    </section>

    <!-- Divider -->
    <div class="mx-auto max-w-5xl px-6">
      <div class="border-t border-surface-200/60"></div>
    </div>

    <!-- Getting Started -->
    <section class="px-6 py-20">
      <div class="mx-auto max-w-5xl">
        <div class="grid gap-6 sm:grid-cols-3">
          <div class="rounded-xl border border-surface-200/60 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
            <div class="mb-3 flex size-10 items-center justify-center rounded-lg border border-surface-200/60 bg-surface-50 text-lg">
              🚀
            </div>
            <h3 class="text-sm font-semibold text-surface-900">Start dev</h3>
            <p class="mt-1.5 text-xs leading-relaxed text-surface-400">
              Run <code class="rounded bg-surface-100 px-1.5 py-0.5 font-mono text-surface-600">pnpm run dev</code> to launch the full stack.
            </p>
          </div>
          <div class="rounded-xl border border-surface-200/60 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
            <div class="mb-3 flex size-10 items-center justify-center rounded-lg border border-surface-200/60 bg-surface-50 text-lg">
              🔌
            </div>
            <h3 class="text-sm font-semibold text-surface-900">Add a module</h3>
            <p class="mt-1.5 text-xs leading-relaxed text-surface-400">
              Generate a NestJS module with <code class="rounded bg-surface-100 px-1.5 py-0.5 font-mono text-surface-600">pnpm nx g @nestjs/schematics:module</code>
            </p>
          </div>
          <div class="rounded-xl border border-surface-200/60 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
            <div class="mb-3 flex size-10 items-center justify-center rounded-lg border border-surface-200/60 bg-surface-50 text-lg">
              📦
            </div>
            <h3 class="text-sm font-semibold text-surface-900">Design tokens</h3>
            <p class="mt-1.5 text-xs leading-relaxed text-surface-400">
              Edit shared tokens in <code class="rounded bg-surface-100 px-1.5 py-0.5 font-mono text-surface-600">libs/design-tokens/</code>
            </p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [],
})
export class HomeComponent implements OnDestroy {
  projectName = 'prototype-grand-next';

  stacks = [
    { name: 'Angular 21', icon: '🅰️' },
    { name: 'NestJS 11', icon: '🛡️' },
    { name: 'tRPC', icon: '🔗' },
    { name: 'Zod', icon: '📐' },
    { name: 'Zoneless', icon: '⚡' },
    { name: 'Nx', icon: '🏗️' },
  ];

  apiStatus = signal<'checking' | 'online' | 'offline'>('checking');
  statusLabel = computed(() => ({
    checking: 'Checking…',
    online: 'All systems operational',
    offline: 'Could not connect',
  }[this.apiStatus()]));

  private abortController: AbortController | null = null;

  constructor() {
    this.abortController = new AbortController();
    fetch('/api/trpc/health', { signal: this.abortController.signal })
      .then((r) => r.ok ? this.apiStatus.set('online') : this.apiStatus.set('offline'))
      .catch(() => this.apiStatus.set('offline'));
  }

  ngOnDestroy() {
    this.abortController?.abort();
  }
}
