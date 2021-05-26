import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { QuizService } from '../quiz/quiz.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-completion',
  templateUrl: './completion.component.html',
  styleUrls: ['./completion.component.css'],
})
export class CompletionComponent implements OnInit {
  score!: number;
  endTime: string;
  numberOfWinners = environment.numberOfWinners;
  numberOfWinnersSpeltOut = environment.numberOfWinnersSpeltOut;

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService
  ) {}

  ngOnInit(): void {
    this.score = this.route.snapshot.params['score'];
    this.endTime = this.quizService.getEndTime();
  }
}
