import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { User } from '../../user/user.model';
import { UserService } from '../../user/user.service';
import { RegisterService } from './register.service';
import { environment } from '../../../environments/environment';
import { QuizService } from '../quiz/quiz.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  types = ['Select Type', 'Gen', 'Music', 'Sports'];
  quizStartTime: string;
  subscription!: Subscription;
  isLoading = false;
  showAlert = false;
  errMsg = '';
  user!: User | null;

  constructor(
    private router: Router,
    private userService: UserService,
    private registerService: RegisterService,
    private quizService: QuizService
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();
  }

  onSubmit(form: NgForm) {
    const { firstName, lastName, email, phone, type } = form.value;
    this.quizStartTime = this.quizService.getStartTime(type);

    const regInfo = {
      userId: this.user?.id,
      firstName,
      lastName,
      email,
      phone,
      type,
      amount: 100,
      purpose: 'WhatsPool registration.',
    };

    this.isLoading = true;
    this.subscription = this.registerService.register(regInfo).subscribe(
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

  onDismissAlert() {
    this.showAlert = false;
    this.router.navigate(['']);
  }

  ngOnDestroy() {
    this.showAlert = false;
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
