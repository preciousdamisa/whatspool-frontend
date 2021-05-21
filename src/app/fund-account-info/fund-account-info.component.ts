import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import {
  FundAccountInfo,
  FundAccountInfoService,
} from './fund-acount-info.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-fund-account-info',
  templateUrl: './fund-account-info.component.html',
  styleUrls: ['./fund-account-info.component.css'],
})
export class FundAccountInfoComponent implements OnDestroy {
  supportLineOne = environment.whatspoolSupportLineOne;
  subs: Subscription;
  loading = false;
  response: FundAccountInfo;
  showAlert = false;

  constructor(private fundAccInfoService: FundAccountInfoService) {}

  onSubmit(form: NgForm) {
    this.loading = true;
    this.subs = this.fundAccInfoService
      .initFunding(form.value.amount.toString())
      .subscribe(
        (res: FundAccountInfo) => {
          this.response = res;
          this.loading = false;
          this.showAlert = true;
        },
        (errMsg) => {
          this.loading = false;
        }
      );
  }

  onDismiss() {
    this.showAlert = false;
  }

  ngOnDestroy() {
    if (this.subs) this.subs.unsubscribe();
  }
}
