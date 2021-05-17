import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { CompetitorsService } from './competitors.service';

@Component({
  selector: 'app-competitors',
  templateUrl: './competitors.component.html',
  styleUrls: ['./competitors.component.css'],
})
export class CompetitorsComponent implements OnInit, OnDestroy {
  isDeleting = false;
  isFetching = false;
  successMsg!: string;
  errMsg!: string;
  showForm = false;
  competitorsCount!: number;
  subscription!: Subscription;

  constructor(private competitorsService: CompetitorsService) {}

  ngOnInit() {
    this.getCompetitorsCount();
  }

  getCompetitorsCount() {
    this.isFetching = true;
    this.competitorsService
      .getCompetitorsCount()
      .then((res) => {
        this.competitorsCount = res.data.count;
        this.isFetching = false;
      })
      .catch((ex) => {
        this.isFetching = false;
        console.log(ex);
      });
  }

  onDelete(form: NgForm) {
    const formData = form.value;

    if (formData.confirmDelete !== 'Delete') return;

    this.isDeleting = true;
    this.subscription = this.competitorsService.deleteCompetitors().subscribe(
      (res) => {
        console.log(res);
        this.isDeleting = false;
        this.competitorsCount = 0;
        this.successMsg = 'Competitors deleted Successfully!';
        form.reset();
      },
      (errMsg) => {
        this.isDeleting = false;
        this.errMsg = errMsg;
      }
    );
  }

  onDismiss() {
    this.successMsg = '';
    this.showForm = false;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
