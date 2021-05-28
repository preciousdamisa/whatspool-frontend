import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

import { QuestionsService } from './questions.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})
export class QuestionsComponent implements OnDestroy {
  types = ['Select Type', 'Gen', 'Music', 'Sports'];
  isDeleting!: boolean;
  successMsg!: string;
  errMsg!: string;
  showForm = false;
  subscription!: Subscription;

  constructor(private queService: QuestionsService) {}

  onDelete(form: NgForm, whatsPoolType: string) {
    const formData = form.value;

    if (formData.confirmDelete !== 'Delete') return;

    this.isDeleting = true;
    this.subscription = this.queService
      .deleteQuestions(whatsPoolType)
      .subscribe(
        (res) => {
          form.reset();
          this.successMsg = res.msg;
          this.isDeleting = false;
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
