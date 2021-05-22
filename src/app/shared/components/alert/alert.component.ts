import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
})
export class AlertComponent {
  @Input() title!: string;
  @Input() message!: string;
  @Input() distanceFromTop = '30vh';
  @Output() dismiss = new EventEmitter<void>();

  onDismiss() {
    this.dismiss.emit();
  }
}
