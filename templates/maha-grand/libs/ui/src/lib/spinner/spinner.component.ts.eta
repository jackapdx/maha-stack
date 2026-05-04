import { Component, input } from '@angular/core';

export type SpinnerSize = 'sm' | 'md' | 'lg' | 'xl';
export type SpinnerColor = 'primary' | 'secondary' | 'success' | 'danger' | 'warning';

const colorToVariant: Record<SpinnerColor, string> = {
  primary: '',
  secondary: 'mha-spinner-secondary',
  success: 'mha-spinner-success',
  danger: 'mha-spinner-danger',
  warning: 'mha-spinner-warning',
};

@Component({
  selector: 'ui-spinner',
  standalone: true,
  template: `
    <div [class]="center() ? 'flex justify-center' : 'inline-block'" role="status">
      <svg [class]="'mha-spinner mha-spinner-' + size() + ' ' + variantClass()" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      @if (text()) {
        <span class="sr-only">{{ text() }}</span>
      }
    </div>
  `,
  styles: [],
})
export class SpinnerComponent {
  size = input<SpinnerSize>('md');
  color = input<SpinnerColor>('primary');
  text = input<string>();
  center = input(false);

  variantClass(): string {
    return colorToVariant[this.color()];
  }
}
