import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { BackdropService } from './shared/services/backdrop.service';
import { UserService } from './user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'whatspool-frontend';
  showBackdrop = false;
  subscription = new Subscription();

  constructor(
    private backdropService: BackdropService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userService.autoLogin();

    this.subscription = this.backdropService.showBackdrop.subscribe(
      (shouldShow: boolean) => {
        this.showBackdrop = shouldShow;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
