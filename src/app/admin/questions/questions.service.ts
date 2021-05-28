import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { MyHttpService } from '../../shared/services/my-http.service';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class QuestionsService {
  constructor(private http: HttpClient, private myHttp: MyHttpService) {}

  deleteQuestions(type: string) {
    return this.http
      .delete<{ msg: string }>(
        environment.whatsPoolApiUrl + 'questions/' + type
      )
      .pipe(catchError(this.myHttp.handleErr));
  }
}
