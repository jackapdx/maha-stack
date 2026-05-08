import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ui-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [type]="type()"
      [disabled]="disabled()"
      [class]="getButtonClasses()"
      (click)="onClick.emit($event)"
    >
      @if (loading()) {
        <span class="inline-flex items-center gap-2">
          <svg class="mha-spinner mha-spinner-sm" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
          </svg>
          {{ loadingText() }}
        </span>
      }
      @if (!loading()) {
        <ng-content></ng-content>
      }
    </button>
  `,
  styles: [],
})
export class ButtonComponent {
  type = input<'button' | 'submit' | 'reset'>('button');
  variant = input<ButtonVariant>('primary');
  size = input<ButtonSize>('md');
  disabled = input(false);
  loading = input(false);
  loadingText = input('Loading...');
  fullWidth = input(false);

  onClick = output<MouseEvent>();

  getButtonClasses(): string {
    const variantMap: Record<ButtonVariant, string> = {
      primary: 'mha-btn-primary',
      secondary: 'mha-btn-secondary',
      outline: 'mha-btn-outline',
      ghost: 'mha-btn-ghost',
      danger: 'mha-btn-danger',
    };

    const widthClass = this.fullWidth() ? 'w-full' : '';

    return ['mha-btn', variantMap[this.variant()], `mha-btn-${this.size()}`, widthClass].join(' ');
  }
}
