import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { BackdropService } from '../shared/services/backdrop.service';
import { ContactUsService } from './contact-us.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
})
export class ContactUsComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  isLoading = false;
  showModal = false;
  errMsg = '';
  user!: User | null;

  constructor(
    private userService: UserService,
    private backdropService: BackdropService,
    private contactService: ContactUsService
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();
  }

  onSubmit(form: NgForm) {
    const { firstName, lastName, email, phone, message } = form.value;

    const msgInfo = {
      name: firstName + ' ' + lastName,
      email,
      phone,
      msg: message,
    };

    console.log(msgInfo);

    this.isLoading = true;
    this.subscription = this.contactService.sendMessage(msgInfo).subscribe(
      (res) => {
        this.isLoading = false;
        this.backdropService.showBackdrop.next(true);
        this.showModal = true;
      },
      (errMsg) => {
        this.errMsg = errMsg;
        this.isLoading = false;
      }
    );
  }

  getNameOfUser() {
    return this.user?.firstName + ' ' + this.user?.lastName;
  }

  onCloseModal(form: NgForm) {
    this.showModal = false;
    this.backdropService.showBackdrop.next(false);
    form.reset();
  }

  ngOnDestroy() {
    this.showModal = false;
    this.backdropService.showBackdrop.next(false);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
