import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

import { MyHttpService } from './../../shared/services/my-http.service';
import { environment } from './../../../environments/environment';
import { Transaction } from './transaction.model';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  constructor(private http: HttpClient, private myHttp: MyHttpService) {}

  getTransactions() {
    return this.http
      .get<Transaction[]>(environment.whatsPoolApiUrl + 'transactions')
      .pipe(catchError(this.myHttp.handleErr));
  }
}
