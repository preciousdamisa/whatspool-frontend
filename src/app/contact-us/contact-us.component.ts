import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { ContactUsService } from './contact-us.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
})
export class ContactUsComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  isLoading = false;
  showAlert = false;
  errMsg = '';
  user!: User | null;

  constructor(
    private userService: UserService,
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

    this.isLoading = true;
    this.subscription = this.contactService.sendMessage(msgInfo).subscribe(
      (res) => {
        this.isLoading = false;
        this.showAlert = true;
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

  onDismissAlert(form: NgForm) {
    this.showAlert = false;
    form.reset();
  }

  ngOnDestroy() {
    this.showAlert = false;
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
