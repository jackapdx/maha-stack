import { Component, input } from "@angular/core";

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="border-t border-surface-200/60 bg-white">
      <div class="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <span class="text-xs text-surface-400">
          © {{ year() }} {{ appName() }}
        </span>
        <span class="text-xs text-surface-300">
          Maha Stack &middot; MIT
        </span>
      </div>
    </footer>
  `,
  styles: [],
})
export class FooterComponent {
  appName = input.required<string>();
  year = input.required<number>();
}
