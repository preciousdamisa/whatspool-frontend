import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { MyHttpService } from '../../shared/services/my-http.service';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class RegisterService {
  constructor(private http: HttpClient, private myHttpService: MyHttpService) {}

  register(regInfo: {
    userId: string | undefined;
    firstName: any;
    lastName: any;
    email: any;
    phone: any;
    amount: number;
    purpose: string;
  }) {
    return this.http
      .post(environment.whatspoolApiUrl + 'competitors', regInfo)
      .pipe(catchError(this.myHttpService.handleErr));
  }
}
