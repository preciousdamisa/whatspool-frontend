import { Component } from '@angular/core';

import { QuizService } from '../competition/quiz/quiz.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private quizService: QuizService) {}

  onCompete() {
    this.quizService.checkQuizStatus();
  }

  showAlert = false;

  onShowAlert() {
    this.showAlert = true;
  }

  onDismissAlert() {
    this.showAlert = false;
  }
}
