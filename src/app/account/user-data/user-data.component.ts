import { Component, OnInit, OnDestroy } from '@angular/core';

import { User } from '../../user/user.model';
import { UserService } from '../../user/user.service';
import { environment } from '../../../environments/environment';
import { BackdropService } from '../../shared/services/backdrop.service';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css'],
})
export class UserDataComponent implements OnInit, OnDestroy {
  user!: User | null;
  isLinkCopied = false;
  showModal = false;

  constructor(
    private userService: UserService,
    private backdropService: BackdropService
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();
  }

  copyRefLinkToClipboard(el: HTMLInputElement) {
    el.select();
    document.execCommand('copy');
    this.isLinkCopied = true;

    setTimeout(() => {
      this.isLinkCopied = false;
    }, 2000);
  }

  getRefLink() {
    return `${environment.whatspoolApiUrl}signup?refCode=${this.user?.firstName}-${this.user?.referralCode}`;
  }

  onShowModal() {
    this.backdropService.showBackdrop.next(true);
    this.showModal = true;
  }

  onCloseModal() {
    this.backdropService.showBackdrop.next(false);
    this.showModal = false;
  }

  ngOnDestroy() {
    this.onCloseModal();
  }
}
