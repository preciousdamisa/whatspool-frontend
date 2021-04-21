import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { User } from '../../user/user.model';
import { AccountService } from '../account.service';
import { Win } from './win.model';
import { DateTranslator } from '../../shared/utils/date-translator';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
})
export class StatisticsComponent implements OnInit, OnDestroy {
  isLoading = false;
  user!: User;
  wins: Win[] = [];
  errMsg = '';
  subscription!: Subscription;

  constructor(private accService: AccountService) {}

  ngOnInit(): void {
    this.getWins();
  }

  getWins() {
    this.isLoading = true;
    this.accService.fetchCurrentUser().subscribe(
      (res) => {
        this.wins = this.createWins(res.wins);
        this.isLoading = false;
      },
      (errMsg) => {
        this.errMsg = errMsg;
        this.isLoading = false;
      }
    );
  }

  createWins(wins: Win[]) {
    const modifiedWins: Win[] = [];
    for (let win of wins) {
      modifiedWins.unshift(
        new Win(win.pos, DateTranslator.readableString(win.date))
      );
    }

    return modifiedWins;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
