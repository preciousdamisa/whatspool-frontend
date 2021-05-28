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

  deleteCompetitors(type: string) {
    return this.http
      .delete<{ msg: string }>(
        environment.whatsPoolApiUrl + 'competitors/' + type
      )
      .pipe(catchError(this.myHttp.handleErr));
  }

  getCompetitorsCount() {
    return this.http.get<CompetitorsCount>(
      environment.whatsPoolApiUrl + `competitors/count`
    );
  }
}
