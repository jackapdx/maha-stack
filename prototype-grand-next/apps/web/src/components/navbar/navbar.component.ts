import { Component, input } from "@angular/core";

@Component({
  selector: 'app-navbar',
  standalone: true,
  template: `
    <header class="sticky top-0 z-50 border-b border-surface-200/60 bg-surface-50/80 backdrop-blur-xl">
      <div class="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <span class="text-sm font-semibold tracking-tight text-surface-900">{{ appName() }}</span>
        <a
          href="https://github.com/jackapdx/maha-stack"
          class="text-xs text-surface-400 transition-colors hover:text-surface-600"
        >
          GitHub
        </a>
      </div>
    </header>
  `,
  styles: [],
})
export class NavbarComponent {
  appName = input.required<string>();
}
