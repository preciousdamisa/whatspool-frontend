import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { MyHttpService } from '../../shared/services/my-http.service';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class QuestionsService {
  constructor(private http: HttpClient, private myHttp: MyHttpService) {}

  deleteQuestions() {
    return this.http
      .delete(environment.whatspoolApiUrl + 'questions')
      .pipe(catchError(this.myHttp.handleErr));
  }
}