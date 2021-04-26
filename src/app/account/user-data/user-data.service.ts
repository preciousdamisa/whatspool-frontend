import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { MyHttpService } from '../../shared/services/my-http.service';
import { environment } from '../../../environments/environment';
import { UserService } from '../../user/user.service';

export interface AccountBalance {
  balance: number;
  referralBonus: number;
}

@Injectable({ providedIn: 'root' })
export class UserDataService {
  constructor(
    private http: HttpClient,
    private myHttp: MyHttpService,
    private userService: UserService
  ) {}

  getAccBalance() {
    return this.http
      .get<AccountBalance>(
        environment.whatspoolApiUrl +
          `users/${this.userService.getUser()?.id}/balance`
      )
      .pipe(catchError(this.myHttp.handleErr));
  }
}
