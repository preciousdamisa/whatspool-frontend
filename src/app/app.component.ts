import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { UserService } from './user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'whatspool-frontend';
  subscription = new Subscription();

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.autoLogin();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
