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
    public duration: number
  ) {}
}

export function whatsPoolType() {
  return localStorage.getItem('whatsPoolType');
}

type WhatsPoolType = 'Gen' | 'Music' | 'Sports';

@Injectable({ providedIn: 'root' })
export class QuizService {
  constructor(private http: HttpClient, private myHttpService: MyHttpService) {}

  checkQuizStatus(type: string) {
    return this.http
      .get(environment.whatsPoolApiUrl + 'competitors/' + type)
      .pipe(
        exhaustMap(() => {
          return this.http.get(
            environment.whatsPoolApiUrl + 'start-quiz/' + whatsPoolType()
          );
        })
      );
  }

  getCompetitor() {
    console.log(whatsPoolType());
    return this.myHttpService.http?.get('competitors/' + whatsPoolType());
  }

  getQuestion(questionNo: number) {
    return this.myHttpService.http?.get(
      `questions/${whatsPoolType()}/${questionNo}`
    );
  }

  startQuiz() {
    return this.myHttpService.http?.get<QuizTime>(
      'start-quiz/' + whatsPoolType()
    );
  }

  submitAnswer(
    competitorId: string,
    questionNumber: number,
    ans: string,
    type: string | null
  ) {
    return this.myHttpService.http?.post('submit', {
      competitorId,
      questionNumber,
      ans,
      type,
    });
  }

  getWinners(type: string) {
    return this.http
      .get<{
        haveWinners: boolean;
        firstPlaceWinners: [Winner];
        secondPlaceWinners: [Winner];
        thirdPlaceWinners: [Winner];
        fourthPlaceWinners: [Winner];
        fifthPlaceWinners: [Winner];
      }>(environment.whatsPoolApiUrl + 'winners/' + type)
      .pipe(catchError(this.myHttpService.handleErr));
  }

  getStartTime(type?: WhatsPoolType) {
    let startTime = environment.whatsPoolGenStartTime;
    let typeOfWhatsPool = type || whatsPoolType();

    if (typeOfWhatsPool === 'Music') {
      startTime = environment.whatsPoolMusicStartTime;
    } else if (typeOfWhatsPool === 'Sports') {
      startTime = environment.whatsPoolSportsStartTime;
    }

    return startTime;
  }

  getEndTime(type?: WhatsPoolType) {
    let startTime = environment.whatsPoolGenEndTime;
    let typeOfWhatsPool = type || whatsPoolType();

    if (typeOfWhatsPool === 'Music') {
      startTime = environment.whatsPoolMusicEndTime;
    } else if (typeOfWhatsPool === 'Sports') {
      startTime = environment.whatsPoolSportsEndTime;
    }

    return startTime;
  }
}
