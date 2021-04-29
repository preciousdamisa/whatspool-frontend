import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { UserService } from '../user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  isAdmin: boolean | undefined;
  openNav = false;
  drawerSub = new Subscription();
  userSub = new Subscription();

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.isLoggedIn = !!this.userService.getUser();
    this.isAdmin = this.userService.getUser()?.isAdmin;

    this.userSub = this.userService.userSubj.subscribe((user) => {
      this.isLoggedIn = !!user;
      this.isAdmin = user?.isAdmin;
    });
  }

  onOpenNav() {
    this.openNav = true;
  }

  onCloseNav() {
    this.openNav = false;
  }

  onLogout() {
    this.userService.logout();
    this.onCloseNav();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
