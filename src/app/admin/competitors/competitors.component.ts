import { Component, OnDestroy, OnInit } from '@angular/core';
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

  onDeleteCompetitors() {
    this.isDeleting = true;
    this.subscription = this.competitorsService.deleteCompetitors().subscribe(
      (res) => {
        this.isDeleting = false;
        this.competitorsCount = 0;
        this.successMsg = 'Competitors deleted Successfully!';
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
