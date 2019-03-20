import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { TransactionHeaderComponent } from './transaction-header.component';
import { TransactionListComponent } from './transaction-list.component';
import { TransactionService } from './transaction.service';
import { TransactionStore } from './transaction.store';
import { AuthGuard } from '../core/auth.guard';
import { TransactionSummaryService } from './transaction-summary.service';
import { TransactionSummaryStore } from './transaction-summary.store';
import { TotalSpendSaveComponent } from './widgets/total-spend-save.component';
import { TypeSummaryComponent } from './widgets/type-summary.component';
import { TemplateTransactionComponent } from './widgets/template-transaction.component';

@NgModule({
  declarations: [
    TransactionListComponent,
    TransactionHeaderComponent,
    TemplateTransactionComponent,
    TotalSpendSaveComponent,
    TypeSummaryComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component: TransactionListComponent, canActivate: [AuthGuard] }
    ])
  ],
  providers: [
      TransactionService,
      TransactionStore,
      TransactionSummaryService,
      TransactionSummaryStore,
  ],
  bootstrap: [],
  exports: [
    TransactionListComponent
  ]
})
export class TransactionModule { }
