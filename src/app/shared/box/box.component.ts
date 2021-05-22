import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css'],
})
export class BoxComponent implements OnInit {
  @Input() iconInfo: string;
  @Input() title: string;
  @Input() subtitle: string;
  @Input() classes: string;
  baseClass = 'box ';

  ngOnInit() {
    if (this.classes) {
      this.baseClass += this.classes;
    }
  }
}