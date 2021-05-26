import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

import { MyHttpService } from 'src/app/shared/services/my-http.service';
import { environment } from './../../../environments/environment';

export interface QuizTimeResponseData {
  newQuizTime: string;
  duration: number;
}

@Injectable({ providedIn: 'root' })
export class QuizTimeService {
  constructor(private http: HttpClient, private myHttp: MyHttpService) {}

  setQuizTime(quizTime: { time: string; type: string }) {
    return this.http
      .put<QuizTimeResponseData>(environment.whatsPoolApiUrl + 'quiz-time', {
        time: quizTime.time,
        type: quizTime.type,
      })
      .pipe(catchError(this.myHttp.handleErr));
  }
}
