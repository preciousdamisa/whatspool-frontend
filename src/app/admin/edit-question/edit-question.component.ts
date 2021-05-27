import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Question } from '../../shared/models/question.model';
import { Subscription } from 'rxjs';

import { EditQuestionService, QuestionsCount } from './edit-question.service';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css'],
})
export class EditQuestionComponent implements OnInit, OnDestroy {
  types = ['Select Type', 'Gen', 'Music', 'Sports'];
  isLoading = false;
  questionInfo!: Question | null;
  nextQuestionNo!: number;
  questionsCount: QuestionsCount = {
    genQuestionsCount: 0,
    musicQuestionsCount: 0,
    sportsQuestionsCount: 0,
  };
  errMsg = '';
  subscription!: Subscription;

  constructor(private addQueService: EditQuestionService) {}

  ngOnInit(): void {
    this.getQuestionsCount();
  }

  getQuestionsCount() {
    this.addQueService.getQuestionsCount().subscribe(
      (res) => {
        this.questionsCount = res;
      },
      (err) => {
        console.log(err);
      }
    );
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

  onDismissAlert(form: NgForm) {
    form.reset();
    this.errMsg = '';
    this.questionInfo = null;
    this.getQuestionsCount();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
