import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

import { MyHttpService } from '../shared/services/my-http.service';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ContactUsService {
  constructor(private http: HttpClient, private myHttp: MyHttpService) {}

  sendMessage(msgInfo: {
    name: string;
    email: string;
    phone: string;
    msg: string;
  }) {
    return this.http
      .post(environment.whatspoolApiUrl + 'messages', msgInfo)
      .pipe(catchError(this.myHttp.handleErr));
  }
}
