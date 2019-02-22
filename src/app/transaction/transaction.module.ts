import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { TransactionHeaderComponent } from './transaction-header.component';
import { TransactionListComponent } from './transaction-list.component';
import { TransactionService } from './transaction.service';
import { TransactionStore } from './transaction.store';


@NgModule({
  declarations: [
    TransactionListComponent,
    TransactionHeaderComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component: TransactionListComponent }
    ])
  ],
  providers: [
      TransactionService,
      TransactionStore
  ],
  bootstrap: [],
  exports: [
    TransactionListComponent
  ]
})
export class TransactionModule { }
