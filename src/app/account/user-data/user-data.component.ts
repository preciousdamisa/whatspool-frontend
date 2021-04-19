import { Component, OnInit } from '@angular/core';
import { User } from '../../user/user.model';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css'],
})
export class UserDataComponent implements OnInit {
  user!: User | null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();
  }
}
