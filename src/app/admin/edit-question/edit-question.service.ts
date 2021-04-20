import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { Question } from '../../shared/models/question.model';

import { MyHttpService } from '../../shared/services/my-http.service';

@Injectable({ providedIn: 'root' })
export class EditQuestionService {
  constructor(private http: HttpClient, private myHttp: MyHttpService) {}

  addQuestion(question: Question) {
    return this.http
      .post<Question>(environment.whatspoolApiUrl + 'questions', question)
      .pipe(catchError(this.myHttp.handleErr));
  }

  getQuestionCount() {
    return this.myHttp.http.get(
      environment.whatspoolApiUrl + 'questions/count'
    );
  }
}
