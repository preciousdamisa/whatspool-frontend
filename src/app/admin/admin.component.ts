import { Component, OnInit } from '@angular/core';

import { UserService } from '../user/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  isAdmin: boolean | undefined;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.isAdmin = this.userService.getUser()?.isAdmin;
  }
}
