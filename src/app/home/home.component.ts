import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

import { QuizService } from '../competition/quiz/quiz.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private quizService: QuizService, private router: Router) {}

  onCompete() {
    this.router.navigateByUrl('competition/check-quiz-status');
  }

  showAlert = false;

  onShowAlert() {
    this.showAlert = true;
  }

  onDismissAlert() {
    this.showAlert = false;
  }
}
