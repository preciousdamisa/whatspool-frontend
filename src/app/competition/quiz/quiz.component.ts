import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { QuizService, QuizTime, whatsPoolType } from './quiz.service';
import { Competitor } from './../competitor.model';
import { Question } from '../../shared/models/question.model';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnDestroy {
  whatsPoolType = whatsPoolType();
  hasStarted = false;
  isLoading = false;
  isSubmitting = false;
  competitor!: Competitor;
  question!: Question;
  quizRemainingTime!: number;
  quizEndTime!: number;
  intervalId!: any;
  timeoutId!: any;

  constructor(private quizService: QuizService, private router: Router) {}

  async onStartQuiz() {
    this.hasStarted = true;
    this.isLoading = true;

    try {
      let res = await this.quizService.getCompetitor();

      this.competitor = new Competitor(
        res.data.id,
        res.data.user,
        res.data.currentQuestionNumber,
        res.data.type,
        res.data.score
      );

      if (this.competitor.currentQuestionNumber > 10) {
        this.router.navigate([
          '/competition/completion/' + this.competitor.score,
        ]);
      } else {
        res = await this.quizService.getQuestion(
          this.competitor.currentQuestionNumber
        );

        this.question = new Question(
          res.data.que,
          res.data.optA,
          res.data.optB,
          res.data.optC,
          res.data.optD,
          res.data.optE,
          res.data.no,
          res.data.type
        );

        res = await this.quizService.startQuiz();
        const quizTime = new QuizTime(
          res.data.startTime,
          res.data.endTime,
          res.data.duration
        );

        this.setTimer(quizTime);
      }
    } catch (err) {
      console.log(err);
    }

    this.isLoading = false;
  }

  setTimer(quizTime: QuizTime) {
    // Set remaining time here first, because setInterval would
    // only set it after one (1) second, causing it to be undefined
    // in the places that it's used, like the timeout function and
    // in the template.
    this.quizEndTime = quizTime.startTime + quizTime.duration;
    this.quizRemainingTime = this.quizEndTime - new Date().getTime();

    this.intervalId = setInterval(() => {
      this.quizRemainingTime = this.quizEndTime - new Date().getTime();
    }, 1000);

    this.timeoutId = setTimeout(() => {
      clearInterval(this.intervalId);
    }, this.quizRemainingTime);
  }

  async onSubmit(data: { answer: string }) {
    if (new Date() > new Date(this.quizEndTime)) {
      this.router.navigate([
        '/competition/completion/' + this.competitor.score,
      ]);

      return;
    }

    this.isSubmitting = true;

    try {
      await this.quizService.submitAnswer(
        this.competitor.id,
        this.competitor.currentQuestionNumber,
        data.answer,
        this.whatsPoolType
      );

      // Clear the current interval and timeout,
      // before calling onStartQuiz(), which sets them again.
      this.clearTimers();
      this.isSubmitting = false;
      this.onStartQuiz();
    } catch (err) {
      this.isSubmitting = false;
      console.log(err);
    }
  }

  getRemainingTime() {
    const secondsPerMinute = 60;

    let seconds = this.quizRemainingTime / 1000;

    const minutes = Math.floor(seconds / secondsPerMinute);

    seconds = seconds % secondsPerMinute;

    seconds = Math.floor(seconds);

    return { minutes, seconds };
  }

  clearTimers() {
    clearInterval(this.intervalId);
    clearTimeout(this.timeoutId);
  }

  getSubmitBtnText() {
    return this.competitor.currentQuestionNumber === 10
      ? 'Submit'
      : 'Next Question';
  }

  ngOnDestroy() {
    if (this.intervalId) {
      this.clearTimers();
    }
  }
}
