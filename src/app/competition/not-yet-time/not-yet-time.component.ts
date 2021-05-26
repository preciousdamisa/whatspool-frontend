import { Component } from '@angular/core';

import { QuizService, whatsPoolType } from '../quiz/quiz.service';

@Component({
  selector: 'app-not-yet-time',
  templateUrl: './not-yet-time.component.html',
  styleUrls: ['./not-yet-time.component.css'],
})
export class NotYetTimeComponent {
  whatsPoolType = whatsPoolType();
  startTime = this.quizService.getStartTime();
  endTime = this.quizService.getEndTime();

  constructor(private quizService: QuizService) {}
}
