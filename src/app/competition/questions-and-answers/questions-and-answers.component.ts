import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Question } from '../../shared/models/question.model';
import { QuestionsAndAnswersService } from './questions-and-answers.service';

@Component({
  selector: 'app-questions-and-answers',
  templateUrl: './questions-and-answers.component.html',
  styleUrls: ['./questions-and-answers.component.css'],
})
export class QuestionsAndAnswersComponent implements OnInit {
  isLoading = false;
  subscription!: Subscription;
  questionsAndAnswers: Question[] = [];
  errMsg!: string;

  constructor(private qnaService: QuestionsAndAnswersService) {}

  ngOnInit(): void {
    this.qnaService.getQuestionsAndAnswers().subscribe(
      (res: Question[]) => {
        console.log(res);
      },
      (errMsg) => {}
    );
  }
}
