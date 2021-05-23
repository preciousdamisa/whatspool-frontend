import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

import { QuizService } from '../quiz/quiz.service';
import { Winner } from './winner.model';

@Component({
  selector: 'app-winners',
  templateUrl: './winners.component.html',
  styleUrls: ['./winners.component.css'],
})
export class WinnersComponent implements OnInit {
  isLoading = false;
  subscription!: Subscription;
  quizDate!: number | undefined;
  haveWinners = false;
  firstPlaceWinners: Winner[] = [];
  secondPlaceWinners: Winner[] = [];
  thirdPlaceWinners: Winner[] = [];
  errMsg = '';

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.quizService.getWinners().subscribe(
      (res) => {
        if (res.haveWinners) {
          this.quizDate = res.firstPlaceWinners[0].createdAt;

          this.haveWinners = res.haveWinners;
          this.firstPlaceWinners = this.createWinners(res.firstPlaceWinners);
          this.secondPlaceWinners = this.createWinners(res.secondPlaceWinners);
          this.thirdPlaceWinners = this.createWinners(res.thirdPlaceWinners);
        }

        this.isLoading = false;
      },
      (errMsg) => {
        this.isLoading = false;
        this.errMsg = errMsg;
        console.log(errMsg);
      }
    );
  }

  createWinners(fetchedWinners: [Winner]) {
    const winners: Winner[] = [];

    for (let winner of fetchedWinners) {
      winners.push(new Winner(winner.firstName, winner.lastName));
    }

    return winners;
  }

  getQuizDate() {
    {
      return `Winners from ${moment(this.quizDate).format('dddd')}, ${moment(
        this.quizDate
      ).format('MMMM Do YYYY')}.`;
    }
  }
}
