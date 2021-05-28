import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { NgForm } from '@angular/forms';

import { QuizService } from '../quiz/quiz.service';
import { Winner } from './winner.model';

@Component({
  selector: 'app-winners',
  templateUrl: './winners.component.html',
  styleUrls: ['./winners.component.css'],
})
export class WinnersComponent {
  types = ['Select Type', 'Gen', 'Music', 'Sports'];
  loading = false;
  subscription!: Subscription;
  quizDate!: number | undefined;
  haveWinners = false;
  firstPlaceWinners: Winner[] = [];
  secondPlaceWinners: Winner[] = [];
  thirdPlaceWinners: Winner[] = [];
  errMsg = '';
  triedFetching = false;

  constructor(private quizService: QuizService) {}

  onSubmit(form: NgForm) {
    this.loading = true;
    this.quizService.getWinners(form.value.type).subscribe(
      (res) => {
        this.triedFetching = true;

        // Clear previous winners, just in case there are no winners for the
        // new winners type selection.
        this.firstPlaceWinners = [];
        this.secondPlaceWinners = [];
        this.thirdPlaceWinners = [];

        if (res.haveWinners) {
          this.quizDate = res.firstPlaceWinners[0].createdAt;

          this.haveWinners = res.haveWinners;
          this.firstPlaceWinners = this.createWinners(res.firstPlaceWinners);
          this.secondPlaceWinners = this.createWinners(res.secondPlaceWinners);
          this.thirdPlaceWinners = this.createWinners(res.thirdPlaceWinners);
        }

        this.loading = false;
      },
      (errMsg) => {
        this.triedFetching = true;
        this.loading = false;
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
