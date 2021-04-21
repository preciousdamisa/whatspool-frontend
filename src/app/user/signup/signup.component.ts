import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  isLoading = false;
  errMsg = '';
  signupForm = new FormGroup({});
  formData = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
  };

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.signupForm = new FormGroup({
      firstName: new FormControl('Precious', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(25),
      ]),
      lastName: new FormControl('Damisa', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(25),
      ]),
      phone: new FormControl('09111111111', [
        Validators.required,
        this.charLength,
      ]),
      email: new FormControl('test@gmail.com', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('55555', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(250),
      ]),
      confirmPassword: new FormControl('55555', [
        Validators.required,
        this.samePasswords.bind(this),
      ]),
    });
  }

  get firstName() {
    return this.signupForm.get('firstName') as FormControl;
  }

  get lastName() {
    return this.signupForm.get('lastName') as FormControl;
  }

  get phone() {
    return this.signupForm.get('phone') as FormControl;
  }

  get email() {
    return this.signupForm.get('email') as FormControl;
  }

  get password() {
    return this.signupForm.get('password') as FormControl;
  }

  get confirmPassword() {
    return this.signupForm.get('confirmPassword') as FormControl;
  }

  samePasswords(control: FormControl): { [k: string]: boolean } | null {
    if (control.value !== this.signupForm.get('password')?.value) {
      return { passwordsMustBeSame: true };
    }
    return null;
  }

  charLength(control: FormControl): { [k: string]: boolean } | null {
    if (control.value?.length !== 11) {
      return { charLengthMustBeEleven: true };
    }
    return null;
  }

  onSubmit() {
    const {
      firstName,
      lastName,
      phone,
      email,
      password,
    } = this.signupForm.value;
    this.formData.firstName = firstName;
    this.formData.lastName = lastName;
    this.formData.phone = phone;
    this.formData.email = email;
    this.formData.password = password;

    this.isLoading = true;
    this.userService
      .signup(firstName, lastName, phone, email, password)
      .subscribe(
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
}
