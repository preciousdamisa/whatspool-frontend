import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { MyHttpService } from '../../shared/services/my-http.service';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class EditWinnersService {
  constructor(private http: HttpClient, private myHttp: MyHttpService) {}

  deleteWinners() {
    return this.http
      .delete(environment.whatspoolApiUrl + 'winners/all')
      .pipe(catchError(this.myHttp.handleErr));
  }

  getWinnersCount() {
    return this.myHttp.http.get(environment.whatspoolApiUrl + 'winners/count');
  }
}
