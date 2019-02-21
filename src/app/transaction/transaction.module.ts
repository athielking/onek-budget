import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { TransactionHeaderComponent } from './transaction-header.component';
import { TransactionListComponent } from './transaction-list.component';
import { TransactionService } from './transaction.service';
import { CategoriesService } from './categories.service';
import { TransactionStore } from './transaction.store';
import { CategoriesStore } from './categories.store';

@NgModule({
  declarations: [
    TransactionListComponent,
    TransactionHeaderComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  providers: [
      TransactionService,
      CategoriesService,
      TransactionStore,
      CategoriesStore
  ],
  bootstrap: [],
  exports: [
    TransactionListComponent
  ]
})
export class TransactionModule { }
