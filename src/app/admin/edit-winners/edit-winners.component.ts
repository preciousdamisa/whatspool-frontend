import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { EditWinnersService } from './edit-winners.service';

@Component({
  selector: 'app-edit-winners',
  templateUrl: './edit-winners.component.html',
  styleUrls: ['./edit-winners.component.css'],
})
export class EditWinnersComponent implements OnInit, OnDestroy {
  isDeleting = false;
  isFetching = false;
  successMsg!: string;
  errMsg!: string;
  winnersCount!: number;
  subscription!: Subscription;

  constructor(private editWinnersService: EditWinnersService) {}

  ngOnInit() {
    this.getWinnersCount();
  }

  getWinnersCount() {
    this.isFetching = true;
    this.editWinnersService
      .getWinnersCount()
      .then((res) => {
        this.winnersCount = res.data.count;
        this.isFetching = false;
      })
      .catch((ex) => {
        this.isFetching = false;
        console.log(ex);
      });
  }

  onDeleteWinners() {
    this.isDeleting = true;
    this.subscription = this.editWinnersService.deleteWinners().subscribe(
      (res) => {
        this.winnersCount = 0;
        this.isDeleting = false;
        this.successMsg = 'Winners deleted Successfully!';
      },
      (errMsg) => {
        this.isDeleting = false;
        this.errMsg = errMsg;
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
