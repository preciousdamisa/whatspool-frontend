import { Component } from '@angular/core';

import { QuizService, whatsPoolType } from '../quiz/quiz.service';

@Component({
  selector: 'app-has-ended',
  templateUrl: './has-ended.component.html',
  styleUrls: ['./has-ended.component.css'],
})
export class HasEndedComponent {
  constructor(private quizService: QuizService) {}
  whatsPoolType = whatsPoolType();
  startTime = this.quizService.getStartTime();
  endTime = this.quizService.getEndTime();
}
