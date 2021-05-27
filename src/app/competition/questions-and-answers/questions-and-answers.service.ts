import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { MyHttpService } from '../../shared/services/my-http.service';
import { Question } from '../../shared/models/question.model';
import { whatsPoolType } from '../quiz/quiz.service';

@Injectable({
  providedIn: 'root',
})
export class QuestionsAndAnswersService {
  constructor(private http: HttpClient, private myHttp: MyHttpService) {}

  getQuestionsAndAnswers() {
    return this.http
      .get<Question[]>(
        environment.whatsPoolApiUrl +
          `questions/${whatsPoolType()}/questions-and-answers`
      )
      .pipe(catchError(this.myHttp.handleErr));
  }
}
