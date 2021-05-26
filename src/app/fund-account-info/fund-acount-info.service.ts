import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, timeout } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { MyHttpService } from '../shared/services/my-http.service';
import { UserService } from '../user/user.service';

export interface FundAccountInfo {
  data: {
    access_code: string;
    authorization_url: string;
    reference: string;
  };
  message: string;
  status: boolean;
}

@Injectable({ providedIn: 'root' })
export class FundAccountInfoService {
  constructor(
    private http: HttpClient,
    private myHttp: MyHttpService,
    private userService: UserService
  ) {}

  initFunding(amount: string) {
    const user = this.userService.getUser()!;

    const fundInfo = {
      amount,
      email: user.email,
      phone: user.phone,
      name: `${user.firstName} ${user.lastName}`,
      userId: user.id,
    };

    return this.http
      .post<FundAccountInfo>(
        environment.whatsPoolApiUrl + 'init-funding',
        fundInfo
      )
      .pipe(timeout(10000), catchError(this.myHttp.handleErr));
  }
}
