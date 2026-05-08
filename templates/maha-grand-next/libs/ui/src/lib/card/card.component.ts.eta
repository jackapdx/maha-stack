import { Component, input } from '@angular/core';

@Component({
  selector: 'ui-card',
  standalone: true,
  template: `
    <div class="mha-card">
      @if (header()) {
        <div class="mha-card-header">
          <div class="flex items-center justify-between">
            <h3 class="mha-card-title">{{ header() }}</h3>
            <ng-content select="[card-actions]"></ng-content>
          </div>
          @if (subtitle()) {
            <p class="mha-card-subtitle">{{ subtitle() }}</p>
          }
        </div>
      }
      <div class="mha-card-body">
        <ng-content></ng-content>
      </div>
      @if (footer()) {
        <div class="mha-card-footer">
          <div class="flex items-center justify-between">
            <span class="text-sm text-surface-500">{{ footer() }}</span>
            <ng-content select="[card-footer-actions]"></ng-content>
          </div>
        </div>
      }
    </div>
  `,
  styles: [],
})
export class CardComponent {
  header = input<string>();
  subtitle = input<string>();
  footer = input<string>();
}
