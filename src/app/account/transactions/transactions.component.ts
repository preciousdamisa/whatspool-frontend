import { Component, OnInit, OnDestroy } from '@angular/core';

import { Transaction } from './transaction.model';
import { TransactionService } from './transactions.service';
import { Subscription } from 'rxjs';
import { DateTranslator } from '../../shared/utils/date-translator';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent implements OnInit, OnDestroy {
  isLoading = false;
  transactions: Transaction[] = [];
  errMsg = '';
  subscription!: Subscription;

  constructor(private transactionsService: TransactionService) {}

  ngOnInit(): void {
    this.getTransactions();
  }

  getTransactions() {
    this.isLoading = true;
    this.transactionsService.getTransactions().subscribe(
      (res: Transaction[]) => {
        this.transactions = this.createTransactions(res);
        this.isLoading = false;
      },
      (errMsg) => {
        this.errMsg = errMsg;
        this.isLoading = false;
      }
    );
  }

  createTransactions(transactions: Transaction[]) {
    const modifiedTransactions: Transaction[] = [];
    for (let transaction of transactions) {
      modifiedTransactions.unshift(
        new Transaction(
          transaction.amount,
          transaction.purpose,
          transaction.sender,
          transaction.receiver,
          transaction.msg,
          DateTranslator.readableString(transaction.createdAt)
        )
      );
    }

    return modifiedTransactions;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
