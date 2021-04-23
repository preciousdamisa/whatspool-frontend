import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

import axios from 'axios';
import { environment } from '../../../environments/environment';
import { User } from '../../user/user.model';

@Injectable({ providedIn: 'root' })
export class MyHttpService {
  get http() {
    // If saved user data is not found, due to the fact that it's been
    // deleted or for some other reason. Then using the string "'Error'"
    // would cause the application to be put in a bad state. As a user can't
    // be created and his/her token used for authentication.
    // An error message should be shown to the user when this happens, and the
    // user should be directed to the login page (TO BE IMPLEMENTED).
    const userData = localStorage.getItem('userData') || 'Error';
    const token = User.fromJson(JSON.parse(userData)).token;

    return axios.create({
      baseURL: environment.whatspoolApiUrl,
      headers: { 'x-auth-token': token },
    });
  }

  handleErr(err: HttpErrorResponse) {
    console.log(err);
    let errMsg = 'An error occured. Please check your internet connection';
    if (typeof err.error === 'string') {
      errMsg = err.error;
    }
    return throwError(errMsg);
  }
}
