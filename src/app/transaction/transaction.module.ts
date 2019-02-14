import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { AgGridModule } from 'ag-grid-angular';
import { TransactionListComponent } from './transaction-list.component';
import { AddTransactionRendererComponent } from './grid/add-transaction-renderer.component';
import { DateEditorComponent } from './grid/date-editor.component';
import { TransactionService } from './transaction.service';
import { SelectEditorComponent } from './grid/select-editor.component';
import { AutocompleteEditorComponent } from './grid/autocomplete-editor.component';
import { DateRendererComponent } from './grid/date-renderer.component';
import { CurrencyRendererComponent } from './grid/currency-renderer.component';
import { TransactionHeaderComponent } from './transaction-header.component';
import { CategoriesService } from './categories.service';
import { TransactionStore } from './transaction.store';
import { CategoriesStore } from './categories.store';


@NgModule({
  declarations: [
    TransactionListComponent,
    AddTransactionRendererComponent,
    DateEditorComponent,
    DateRendererComponent,
    SelectEditorComponent,
    AutocompleteEditorComponent,
    CurrencyRendererComponent,
    TransactionHeaderComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    AgGridModule.withComponents([
        AddTransactionRendererComponent,
        DateRendererComponent,
        DateEditorComponent,
        SelectEditorComponent,
        AutocompleteEditorComponent,
        CurrencyRendererComponent
    ]),
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
