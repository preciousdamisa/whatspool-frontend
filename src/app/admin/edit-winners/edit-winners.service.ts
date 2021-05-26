import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { MyHttpService } from '../../shared/services/my-http.service';
import { environment } from '../../../environments/environment';

export interface WinnersCount {
  genWinnersCount: number;
  musicWinnersCount: number;
  sportsWinnersCount: number;
}

@Injectable({ providedIn: 'root' })
export class EditWinnersService {
  constructor(private http: HttpClient, private myHttp: MyHttpService) {}

  deleteWinners() {
    return this.http
      .delete(environment.whatsPoolApiUrl + 'winners/all')
      .pipe(catchError(this.myHttp.handleErr));
  }

  getWinnersCount() {
    return this.myHttp.http.get<WinnersCount>(
      environment.whatsPoolApiUrl + 'winners/count'
    );
  }

  addWinner(data: { firstName: string; lastName: string }) {
    return this.http
      .post(environment.whatsPoolApiUrl + 'winners', data)
      .pipe(catchError(this.myHttp.handleErr));
  }

  toggleShowWinners(data: { show: boolean; type: string }) {
    return this.http
      .put<{ msg: string }>(environment.whatsPoolApiUrl + 'winners', data)
      .pipe(catchError(this.myHttp.handleErr));
  }
}
