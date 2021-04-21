import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-in-page-spinner',
  template: `<div class="spinner">
    <div class="bounce1"></div>
    <div class="bounce2"></div>
    <div class="bounce3"></div>
  </div>`,
  styleUrls: ['./in-page-spinner.component.css'],
})
export class InPageSpinnerComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
