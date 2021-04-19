import { Component } from '@angular/core';

import { QuestionsService } from './questions.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})
export class QuestionsComponent {
  isLoading!: boolean;
  successMsg!: string;
  errMsg!: string;

  constructor(private queService: QuestionsService) {}

  onDeleteQuestions() {
    this.isLoading = true;
    this.queService.deleteQuestions().subscribe(
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
}
