import { Component, input } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="bg-white border-t border-surface-200 py-8 px-4 mt-auto">
      <div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-2 text-sm text-surface-500">
          <span class="text-maha-600">🔱</span>
          © {{ year() }} {{ appName() }} — MIT License
        </div>
        <div class="flex items-center gap-6 text-sm text-surface-400">
          <a href="#" class="hover:text-surface-600 transition-all">GitHub</a>
          <a href="#" class="hover:text-surface-600 transition-all">npm</a>
          <a href="#" class="hover:text-surface-600 transition-all">Docs</a>
        </div>
      </div>
    </footer>
  `,
  styles: [],
})
export class FooterComponent {
  appName = input.required<string>();
  year = input.required<number>();
}
