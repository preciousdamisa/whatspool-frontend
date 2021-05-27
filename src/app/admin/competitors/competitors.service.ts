import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { MyHttpService } from './../../shared/services/my-http.service';
import { environment } from '../../../environments/environment';

export interface CompetitorsCount {
  genCompetitorsCount: number;
  musicCompetitorsCount: number;
  sportsCompetitorsCount: number;
}

@Injectable({ providedIn: 'root' })
export class CompetitorsService {
  constructor(private http: HttpClient, private myHttp: MyHttpService) {}

  deleteCompetitors() {
    return this.http
      .delete(environment.whatsPoolApiUrl + 'competitors')
      .pipe(catchError(this.myHttp.handleErr));
  }

  getCompetitorsCount() {
    return this.http.get<CompetitorsCount>(
      environment.whatsPoolApiUrl + `competitors/count`
    );
  }
}
