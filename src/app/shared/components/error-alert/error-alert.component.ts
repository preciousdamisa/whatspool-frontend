import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-error-alert',
  templateUrl: './error-alert.component.html',
})
export class ErrorAlertComponent {
  @Input() message!: string;
  // Specified using vh (Viewport Height).
  @Input() distanceFromTop!: string;
  @Output() dismiss = new EventEmitter<void>();

  onDismiss() {
    this.dismiss.emit();
  }
}
