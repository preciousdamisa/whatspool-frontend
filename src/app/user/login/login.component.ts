import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  supportLineOne = environment.whatsPoolSupportLineOne;
  isLoading = false;
  errMsg = '';
  defaultEmail = '';
  formData = {
    email: '',
    password: '',
  };

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    const currentUserEmail = localStorage.getItem('email');
    if (currentUserEmail) {
      this.defaultEmail = currentUserEmail;
    }
  }

  onSubmit(loginForm: NgForm) {
    const { email, password } = loginForm.value;
    this.formData.email = email;
    this.formData.password = password;

    this.isLoading = true;
    this.userService.login(email, password).subscribe(
      (res) => {
        this.isLoading = false;
        this.router.navigate(['']);
      },
      (errMsg) => {
        this.isLoading = false;
        this.errMsg = errMsg;
      }
    );
  }

  onDismissAlert() {
    this.errMsg = '';
  }
}
