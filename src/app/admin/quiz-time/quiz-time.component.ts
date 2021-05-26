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
  types = ['Select Type', 'Gen', 'Music', 'Sports'];
  subscription!: Subscription;
  loading = false;
  successMsg = '';
  errMsg = '';
  showAlert = false;
  quizTime: QuizTimeResponseData;

  constructor(private quizTimeService: QuizTimeService) {}

  onSubmit(form: NgForm) {
    const date = form.value['date'];
    const time = form.value['time'];
    const type = form.value['type'];

    const quizTime = { time: date + 'T' + time + ':00.000Z', type };

    this.loading = true;
    this.subscription = this.quizTimeService.setQuizTime(quizTime).subscribe(
      (res: QuizTimeResponseData) => {
        this.quizTime = res;
        this.loading = false;
        this.successMsg = `Next quiz time is: ${DateTranslator.readableString(
          this.quizTime.newQuizTime
        )}`;
        this.showAlert = true;
      },
      (errMsg) => {
        this.errMsg = errMsg;
        this.loading = false;
        this.showAlert = true;
      }
    );
  }

  onSuccess(form: NgForm) {
    form.reset();
    this.showAlert = false;
  }

  onDismiss() {
    this.showAlert = false;
    this.errMsg = '';
    this.successMsg = '';
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
