import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, exhaustMap } from 'rxjs/operators';

import { MyHttpService } from '../../shared/services/my-http.service';
import { Winner } from '../winners/winner.model';
import { environment } from '../../../environments/environment';

export class QuizTime {
  constructor(
    public startTime: number,
    public endTime: number,
    public duration: number,
    public remainingTime: number
  ) {}
}

@Injectable({ providedIn: 'root' })
export class QuizService {
  constructor(private http: HttpClient, private myHttpService: MyHttpService) {}

  checkQuizStatus() {
    return this.http.get(environment.whatspoolApiUrl + 'competitors').pipe(
      exhaustMap(() => {
        return this.http.get(environment.whatspoolApiUrl + 'start-quiz');
      })
    );
  }

  getCompetitor() {
    return this.myHttpService.http?.get('competitors');
  }

  getQuestion(questionNo: number) {
    return this.myHttpService.http?.get('questions/' + questionNo);
  }

  startQuiz() {
    return this.myHttpService.http?.get('start-quiz');
  }

  submitAnswer(competitorId: string, questionNumber: number, ans: string) {
    return this.myHttpService.http?.post('submit', {
      competitorId,
      questionNumber,
      ans,
    });
  }

  getWinners() {
    return this.http
      .get<{
        haveWinners: boolean;
        firstPlaceWinners: [Winner];
        secondPlaceWinners: [Winner];
        thirdPlaceWinners: [Winner];
        fourthPlaceWinners: [Winner];
        fifthPlaceWinners: [Winner];
      }>(environment.whatspoolApiUrl + 'winners')
      .pipe(catchError(this.myHttpService.handleErr));
  }
}
