import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { BackdropService } from '../shared/services/backdrop.service';
import { NavDrawerService } from '../shared/services/nav-drawer.service';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  isAdmin: boolean | undefined;
  openDrawer = false;
  drawerSub = new Subscription();
  userSub = new Subscription();

  constructor(
    private drawerService: NavDrawerService,
    private backdropService: BackdropService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.drawerSub = this.drawerService.openDrawer.subscribe(
      (open: boolean) => {
        this.openDrawer = open;
      }
    );

    this.isLoggedIn = !!this.userService.getUser();
    this.isAdmin = this.userService.getUser()?.isAdmin;

    this.userSub = this.userService.userSubj.subscribe((user) => {
      this.isLoggedIn = !!user;
      this.isAdmin = user?.isAdmin;
    });
  }

  onOpenDrawer() {
    this.backdropService.showBackdrop.next(true);
    this.openDrawer = true;
  }

  onCloseDrawer() {
    this.backdropService.showBackdrop.next(false);
    this.openDrawer = false;
  }

  onLogout() {
    this.userService.logout();
    this.onCloseDrawer();
  }

  ngOnDestroy() {
    this.drawerSub.unsubscribe();
    this.userSub.unsubscribe();
  }
}
