import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { QuizService } from '../quiz/quiz.service';

@Component({
  selector: 'app-check-quiz-status',
  templateUrl: './check-quiz-status.component.html',
  styleUrls: ['./check-quiz-status.component.css'],
})
export class CheckQuizStatusComponent implements OnDestroy {
  isLoading = false;
  subscription!: Subscription;

  constructor(private quizService: QuizService, private router: Router) {}

  onCheckCompetitionStatus() {
    this.isLoading = true;
    this.subscription = this.quizService.checkQuizStatus().subscribe(
      () => {
        this.isLoading = false;
        // Quiz has started
        this.router.navigate(['/competition/quiz']);
      },
      (err: HttpErrorResponse) => {
        if (err.status === 404 && err.error === 'USER_NOT_REGISTERED') {
          this.router.navigate(['/competition/register']);
        } else if (err.status === 400 && err.error.msg === 'NOT_YET_TIME') {
          this.router.navigate(['/competition/not-yet-time']);
        } else if (err.status === 400 && err.error.msg === 'QUIZ_HAS_ENDED') {
          this.router.navigate(['/competition/has-ended']);
        } else {
          // Internal server error.
          console.log('Internal server error');
        }

        this.isLoading = false;
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
