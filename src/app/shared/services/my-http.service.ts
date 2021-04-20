import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

import axios from 'axios';
import { UserService } from 'src/app/user/user.service';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MyHttpService {
  constructor(private userService: UserService) {}
  get http() {
    const token = this.userService.getUser()?.token;
    return axios.create({
      baseURL: environment.whatspoolApiUrl,
      headers: { 'x-auth-token': token },
    });
  }

  handleErr(err: HttpErrorResponse) {
    let errMsg = 'An error occured. Please check your internet connection';
    if (err.error) {
      errMsg = err.error;
    }
    return throwError(errMsg);
  }
}
