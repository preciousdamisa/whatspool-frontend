import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { EditWinnersService, WinnersCount } from './edit-winners.service';

@Component({
  selector: 'app-edit-winners',
  templateUrl: './edit-winners.component.html',
  styleUrls: ['./edit-winners.component.css'],
})
export class EditWinnersComponent implements OnInit, OnDestroy {
  types = ['Select Type', 'Gen', 'Music', 'Sports'];
  deleting = false;
  showForm = false;
  fetching = false;
  adding = false;
  toggling = false;
  showAlert = false;
  successMsg!: string;
  errMsg!: string;
  winnersCount: WinnersCount = {
    genWinnersCount: 0,
    musicWinnersCount: 0,
    sportsWinnersCount: 0,
  };
  subscription!: Subscription;

  constructor(private editWinnersService: EditWinnersService) {}

  ngOnInit() {
    this.getWinnersCount();
  }

  getWinnersCount() {
    this.fetching = true;
    this.editWinnersService
      .getWinnersCount()
      .then((res) => {
        console.log(res.data);
        this.winnersCount = {
          genWinnersCount: res.data.genWinnersCount,
          musicWinnersCount: res.data.musicWinnersCount,
          sportsWinnersCount: res.data.sportsWinnersCount,
        };

        this.fetching = false;
      })
      .catch((ex) => {
        this.fetching = false;
        console.log(ex);
      });
  }

  onDelete(form: NgForm, whatsPoolType: string) {
    const formData = form.value;

    if (formData.confirmDelete !== 'Delete') return;

    this.deleting = true;
    this.subscription = this.editWinnersService
      .deleteWinners(whatsPoolType)
      .subscribe(
        (res) => {
          this.getWinnersCount();
          this.deleting = false;
          this.successMsg = res.msg;
          form.reset();
        },
        (errMsg) => {
          this.deleting = false;
          this.errMsg = errMsg;
        }
      );
  }

  onDismiss() {
    this.successMsg = '';
    this.showForm = false;
  }

  onSubmit(form: NgForm) {
    this.adding = true;
    this.editWinnersService.addWinner(form.value).subscribe(
      (res) => {
        this.adding = false;
        this.successMsg = 'Winner added successfully!';

        form.reset();
        this.getWinnersCount();
      },
      (errMsg) => {
        this.adding = false;
        this.errMsg = errMsg;
      }
    );
  }

  onToggleShowWinners(form: NgForm) {
    const { showWinners, type } = form.value;
    let show: boolean = false;
    if (showWinners === 'show') {
      show = true;
    }

    this.toggling = true;
    this.editWinnersService.toggleShowWinners({ show, type }).subscribe(
      (res) => {
        this.successMsg = res.msg;
        this.toggling = false;
        this.showAlert = true;
      },
      (errMsg) => {
        this.errMsg = errMsg;
        this.toggling = false;
        this.showAlert = true;
      }
    );
  }

  onSuccessfulToggle() {
    this.showAlert = false;
    this.errMsg = '';
    this.successMsg = '';
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
