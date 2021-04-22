import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../../user/user.model';
import { UserService } from '../../user/user.service';
import { RegisterService } from './register.service';
import { BackdropService } from '../../shared/services/backdrop.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  isLoading = false;
  showModal = false;
  errMsg = '';
  user!: User | null;

  constructor(
    private router: Router,
    private userService: UserService,
    private registerService: RegisterService,
    private backdropService: BackdropService
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();
  }

  onSubmit(form: NgForm) {
    const { firstName, lastName, email, phone } = form.value;

    const regInfo = {
      userId: this.user?.id,
      firstName,
      lastName,
      email,
      phone,
      amount: 100,
      purpose: 'WhatsPool registration.',
    };

    this.isLoading = true;
    this.registerService.register(regInfo).subscribe(
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

  onCloseModal() {
    this.showModal = false;
    this.backdropService.showBackdrop.next(false);
    this.router.navigate(['']);
  }

  ngOnDestroy() {
    this.showModal = false;
    this.backdropService.showBackdrop.next(false);
  }
}
