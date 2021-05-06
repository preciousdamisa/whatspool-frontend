import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { AccountComponent } from './account.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { TransfersComponent } from './transfers/transfers.component';
import { UserDataComponent } from './user-data/user-data.component';

import { AuthGuardService } from '../user/auth-guard.service';

@NgModule({
  declarations: [
    AccountComponent,
    TransactionsComponent,
    UserDataComponent,
    TransfersComponent,
    StatisticsComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: 'account',
        component: AccountComponent,
        canActivate: [AuthGuardService],
      },
    ]),
  ],
})
export class AccountModule {}
