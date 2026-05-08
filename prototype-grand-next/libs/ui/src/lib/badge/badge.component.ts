import { Component, input } from '@angular/core';

export type BadgeVariant =
  | 'default'
  | 'primary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'outline';
export type BadgeSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ui-badge',
  standalone: true,
  template: `
    <span [class]="getBadgeClasses()">
      <ng-content></ng-content>
    </span>
  `,
  styles: [],
})
export class BadgeComponent {
  variant = input<BadgeVariant>('default');
  size = input<BadgeSize>('md');
  dot = input(false);

  getBadgeClasses(): string {
    const dotClass = this.dot() ? 'mha-badge-dot' : '';
    return ['mha-badge', `mha-badge-${this.size()}`, `mha-badge-${this.variant()}`, dotClass].join(' ');
  }
}
