import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-alert2',
  templateUrl: './alert2.component.html',
})
export class Alert2Component {
  @Output() dismiss = new EventEmitter<void>();

  onDismiss() {
    this.dismiss.emit();
  }
}
