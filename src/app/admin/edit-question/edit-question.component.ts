import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Question } from 'src/app/shared/models/question.model';
import { Subscription } from 'rxjs';

import { EditQuestionService } from './edit-question.service';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css'],
})
export class EditQuestionComponent implements OnInit, OnDestroy {
  subjects = ['Maths', 'English', 'General', 'Current Affairs'];
  isLoading = false;
  questionInfo!: Question | null;
  nextQuestionNo!: number;
  errMsg = '';
  subscription!: Subscription;

  constructor(private addQueService: EditQuestionService) {}

  ngOnInit(): void {
    this.getQuestionsCount();
  }

  async getQuestionsCount() {
    this.addQueService
      .getQuestionCount()
      .then((res) => {
        const count = res.data.count;
        if (count === 10) {
          this.nextQuestionNo = count;
          return;
        } else {
          this.nextQuestionNo = count + 1;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onSubmit(form: NgForm) {
    this.isLoading = true;
    this.subscription = this.addQueService.addQuestion(form.value).subscribe(
      (res) => {
        this.isLoading = false;
        this.questionInfo = res;
      },
      (errMsg) => {
        this.isLoading = false;
        this.errMsg = errMsg;
      }
    );
  }

  onSuccess(form: NgForm) {
    form.reset();
    this.getQuestionsCount();
    this.questionInfo = null;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
