import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { User } from '../../user/user.model';
import { UserService } from '../../user/user.service';
import { environment } from '../../../environments/environment';
import { BackdropService } from '../../shared/services/backdrop.service';
import { UserDataService, AccountBalance } from './user-data.service';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css'],
})
export class UserDataComponent implements OnInit, OnDestroy {
  user!: User | null;
  isLinkCopied = false;
  showModal = false;
  accBalance!: AccountBalance;
  subscription!: Subscription;
  isLoading = false;

  constructor(
    private userService: UserService,
    private backdropService: BackdropService,
    private userDataService: UserDataService
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();

    this.isLoading = true;
    this.subscription = this.userDataService.getAccBalance().subscribe(
      (res) => {
        this.accBalance = res;
        this.isLoading = false;
      },
      (err) => {
        console.log(err);
        this.isLoading = false;
      }
    );
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
    this.subscription.unsubscribe();
  }
}
