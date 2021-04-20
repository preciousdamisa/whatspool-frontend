import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

import { MyHttpService } from '../../shared/services/my-http.service';
import { environment } from '../../../environments/environment';

export interface FundAccountResponseData {
  user: string;
  phone: string;
  amount: number;
  desc: string;
  transferId: string;
  mode: string;
  msg: string;
}

@Injectable({ providedIn: 'root' })
export class FundAccountService {
  constructor(private http: HttpClient, private myHttpService: MyHttpService) {}

  fundAccount(phone: string, amount: number) {
    return this.http
      .post<FundAccountResponseData>(environment.whatspoolApiUrl + 'manual-fund', {
        phone,
        amount,
      })
      .pipe(catchError(this.myHttpService.handleErr));
  }
}
