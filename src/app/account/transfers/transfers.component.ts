import { Component, OnInit, OnDestroy } from '@angular/core';

import { Transfer } from './transfer.model';
import { TransfersService } from './transfers.service';
import { Subscription } from 'rxjs';
import { DateTranslator } from '../../shared/utils/date-translator';

@Component({
  selector: 'app-transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.css'],
})
export class TransfersComponent implements OnInit, OnDestroy {
  isLoading = false;
  transfers: Transfer[] = [];
  errMsg = '';
  subscription!: Subscription;

  constructor(private transfersService: TransfersService) {}

  ngOnInit(): void {
    this.getTransfers();
  }

  getTransfers() {
    this.isLoading = true;
    this.transfersService.getTransfers().subscribe(
      (res: Transfer[]) => {        
        this.transfers = this.createTransfers(res);
        this.isLoading = false;
      },
      (errMsg) => {
        this.errMsg = errMsg;
        this.isLoading = false;
      }
    );
  }

  createTransfers(transfers: Transfer[]) {
    const modifiedTransfers: Transfer[] = [];
    for (let transfer of transfers) {
      modifiedTransfers.unshift(
        new Transfer(
          transfer.user,
          transfer.phone,
          transfer.amount,
          transfer.desc,
          transfer.msg,
          transfer.mode,
          DateTranslator.readableString(transfer.createdAt)
        )
      );
    }

    return modifiedTransfers;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
