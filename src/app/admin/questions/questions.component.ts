import { Component, OnDestroy } from '@angular/core';

import { QuestionsService } from './questions.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})
export class QuestionsComponent implements OnDestroy {
  isLoading!: boolean;
  successMsg!: string;
  errMsg!: string;
  subscription!: Subscription;

  constructor(private queService: QuestionsService) {}

  onDeleteQuestions() {
    this.isLoading = true;
    this.subscription = this.queService.deleteQuestions().subscribe(
      (res) => {
        this.successMsg = 'Questions deleted Successfully!';
        this.isLoading = false;
      },
      (errMsg) => {
        this.isLoading = false;
        this.errMsg = errMsg;
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
