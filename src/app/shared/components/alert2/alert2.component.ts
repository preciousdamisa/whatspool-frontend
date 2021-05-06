import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert2',
  templateUrl: './alert2.component.html',
})
export class Alert2Component {
  @Output() dismiss = new EventEmitter<void>();
  // Specified using vh (Viewport Height).
  @Input() distanceFromTop!: string;

  onDismiss() {
    this.dismiss.emit();
  }
}
