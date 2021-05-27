import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { Question } from '../../shared/models/question.model';
import { MyHttpService } from '../../shared/services/my-http.service';

export interface QuestionsCount {
  genQuestionsCount: 0;
  musicQuestionsCount: 0;
  sportsQuestionsCount: 0;
}

@Injectable({ providedIn: 'root' })
export class EditQuestionService {
  constructor(private http: HttpClient, private myHttp: MyHttpService) {}

  addQuestion(question: Question) {
    return this.http
      .post<Question>(environment.whatsPoolApiUrl + 'questions', question)
      .pipe(catchError(this.myHttp.handleErr));
  }

  getQuestionsCount() {
    return this.http.get<QuestionsCount>(
      environment.whatsPoolApiUrl + 'questions/count'
    );
  }
}
