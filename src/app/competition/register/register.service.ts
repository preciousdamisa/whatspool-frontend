import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { MyHttpService } from '../../shared/services/my-http.service';
import { environment } from '../../../environments/environment';

export interface RegInfo {
  userId: string | undefined;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  type: string;
  amount: number;
  purpose: string;
}

@Injectable({ providedIn: 'root' })
export class RegisterService {
  constructor(private http: HttpClient, private myHttpService: MyHttpService) {}

  register(regInfo: RegInfo) {
    return this.http
      .post(environment.whatsPoolApiUrl + 'competitors', regInfo)
      .pipe(catchError(this.myHttpService.handleErr));
  }
}
