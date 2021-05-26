import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

import { MyHttpService } from './../../shared/services/my-http.service';
import { environment } from './../../../environments/environment';
import { Transfer } from './transfer.model';

@Injectable({ providedIn: 'root' })
export class TransfersService {
  constructor(private http: HttpClient, private myHttp: MyHttpService) {}

  getTransfers() {
    return this.http
      .get<Transfer[]>(environment.whatsPoolApiUrl + 'transfers')
      .pipe(catchError(this.myHttp.handleErr));
  }
}
