import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  isAdding = false;
  isToggling = false;
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

  onSubmit(form: NgForm) {
    this.isAdding = true;
    this.editWinnersService.addWinner(form.value).subscribe(
      (res) => {
        this.isAdding = false;
        this.successMsg = 'Winner added successfully!';

        form.reset();
        this.getWinnersCount();
      },
      (errMsg) => {
        this.isAdding = false;
        this.errMsg = errMsg;
      }
    );
  }

  onToggleShowWinners(form: NgForm) {
    const { showWinners } = form.value;
    let show: boolean = false;
    if (showWinners === 'show') {
      show = true;
    }

    this.isToggling = true;
    this.editWinnersService.toggleShowWinners(show).subscribe(
      (res) => {
        this.successMsg = res.msg;
        this.isToggling = false;
      },
      (errMsg) => {
        this.errMsg = errMsg;
        this.isToggling = false;
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
