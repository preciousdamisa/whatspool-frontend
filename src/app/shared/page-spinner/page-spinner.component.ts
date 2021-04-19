import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-spinner',
  template: `<div class="spinner">
    <div class="cube1"></div>
    <div class="cube2"></div>
  </div>`,
  styleUrls: ['./page-spinner.component.css'],
})
export class PageSpinnerComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
