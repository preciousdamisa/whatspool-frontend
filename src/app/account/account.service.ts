import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../user/user.model';
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { MyHttpService } from '../shared/services/my-http.service';

@Injectable({ providedIn: 'root' })
export class AccountService {
  constructor(private http: HttpClient, private myHttp: MyHttpService) {}

  fetchCurrentUser() {
    return this.http
      .get<User>(environment.whatspoolApiUrl + 'users/me')
      .pipe(catchError(this.myHttp.handleErr));
  }
}
