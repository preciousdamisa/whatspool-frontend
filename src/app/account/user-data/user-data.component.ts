import { Component, OnInit } from '@angular/core';

import { User } from '../../user/user.model';
import { UserService } from '../../user/user.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css'],
})
export class UserDataComponent implements OnInit {
  user!: User | null;
  isLinkCopied = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();
  }

  copyRefLinkToClipboard(el: HTMLInputElement) {
    console.log(el);
    el.select();
    document.execCommand('copy');
    this.isLinkCopied = true;

    setTimeout(() => {
      this.isLinkCopied = false;
    }, 2000);
  }

  getRefLink() {
    return `${environment}/signup?refCode=${this.user?.firstName}-${this.user?.referralCode}`;
  }
}
