import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import {
  FundAccountService,
  FundAccountResponseData,
} from './fund-account.service';

@Component({
  selector: 'app-fund-account',
  templateUrl: './fund-account.component.html',
  styleUrls: ['./fund-account.component.css'],
})
export class FundAccountComponent implements OnInit {
  isLoading = false;
  errMsg = '';
  fundInfo!: FundAccountResponseData | null;

  constructor(private fundAccService: FundAccountService) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    const { phone, amount } = form.value;

    this.isLoading = true;
    this.fundAccService.fundAccount(phone, amount).subscribe(
      (res: FundAccountResponseData) => {
        form.reset({ phone: form.value.phone, amount: 0 });
        this.fundInfo = res;
        console.log(res);
        this.isLoading = false;
      },
      (errMsg) => {
        this.errMsg = errMsg;
        this.isLoading = false;
      }
    );
  }

  get successMsg() {
    return `Account with ${this.fundInfo?.phone} has been funded with #${this.fundInfo?.amount}`;
  }

  onDismissAlert(form: NgForm) {
    this.fundInfo = null;
    this.errMsg = '';
    form.reset();
  }
}
