import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { MyHttpService } from './../../shared/services/my-http.service';

@Injectable({ providedIn: 'root' })
export class QuestionsService {
  constructor(private http: HttpClient, private myHttp: MyHttpService) {}

  deleteQuestions() {
    return this.http
      .delete('http://localhost:4000/api/questions')
      .pipe(catchError(this.myHttp.handleErr));
  }
}
