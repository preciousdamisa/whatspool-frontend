import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-yet-time',
  templateUrl: './not-yet-time.component.html',
  styleUrls: ['./not-yet-time.component.css'],
})
export class NotYetTimeComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}
}
