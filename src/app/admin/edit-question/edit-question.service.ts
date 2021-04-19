import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

import { Question } from '../../shared/models/question.model';

import { MyHttpService } from '../../shared/services/my-http.service';

@Injectable({ providedIn: 'root' })
export class EditQuestionService {
  constructor(private http: HttpClient, private myHttpService: MyHttpService) {}

  addQuestion(question: Question) {
    return this.http
      .post<Question>('http://localhost:4000/api/questions', question)
      .pipe(catchError(this.myHttpService.handleErr));
  }

  getQuestionCount() {
    return this.myHttpService.http.get('questions/count');
  }
}
