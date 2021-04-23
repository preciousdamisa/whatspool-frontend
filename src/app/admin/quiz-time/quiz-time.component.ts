import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { QuizTimeResponseData, QuizTimeService } from './quiz-time.service';
import { DateTranslator } from '../../shared/utils/date-translator';

@Component({
  selector: './app-quiz-time',
  templateUrl: './quiz-time.component.html',
  styleUrls: ['./quiz-time.component.css'],
})
export class QuizTimeComponent implements OnDestroy {
  subscription!: Subscription;
  isLoading = false;
  errMsg = '';
  showSuccessDialog = false;
  quizTime!: QuizTimeResponseData;

  constructor(private quizTimeService: QuizTimeService) {}

  onSubmit(form: NgForm) {    
    const date = form.value['date'];
    const time = form.value['time'];

    const quizTime = date + 'T' + time + ':00.000Z';

    this.isLoading = true;
    this.subscription = this.quizTimeService.setQuizTime(quizTime).subscribe(
      (res: QuizTimeResponseData) => {
        this.quizTime = res;
        this.isLoading = false;
        this.showSuccessDialog = true;
      },
      (errMsg) => {
        this.errMsg = errMsg;
        this.isLoading = false;
      }
    );
  }

  getQuizTime() {
    return {
      time: DateTranslator.readableString(this.quizTime.newQuizTime),
      duration: this.quizTime.duration,
    };
  }

  onSuccess(form: NgForm) {
    form.reset();
    this.showSuccessDialog = false;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
