import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';

import { CoreModule } from '../core/core.module';
import { StorageService } from './storage.service';
import { AddTransactionRendererComponent } from './add-transaction-renderer.component';
import { DateEditorComponent } from './date-editor.component';
import { SelectEditorComponent } from './select-editor.component';
import { AutocompleteEditorComponent } from './autocomplete-editor.component';
import { DateRendererComponent } from './date-renderer.component';
import { CurrencyRendererComponent } from './currency-renderer.component';
import { StatusRendererComponent } from './status-renderer.component';
import { CategoriesStore } from './categories.store';
import { CategoriesService } from './categories.service';
import { AddTemplateRendererComponent } from './add-template-renderer.component';
import { TotalSpendSaveComponent } from './total-spend-save.component';
import { TypeSummaryComponent } from './type-summary.component';
import { TemplateTransactionComponent } from './template-transaction.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AddTransactionRendererComponent,
    AddTemplateRendererComponent,
    DateEditorComponent,
    DateRendererComponent,
    SelectEditorComponent,
    AutocompleteEditorComponent,
    CurrencyRendererComponent,
    StatusRendererComponent,
    TotalSpendSaveComponent,
    TypeSummaryComponent,
    TemplateTransactionComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule,
    AgGridModule.withComponents([
      AddTransactionRendererComponent,
      AddTemplateRendererComponent,
      DateRendererComponent,
      DateEditorComponent,
      SelectEditorComponent,
      AutocompleteEditorComponent,
      CurrencyRendererComponent,
      StatusRendererComponent
  ]),
  ],
  providers: [StorageService, CategoriesService, CategoriesStore],
  bootstrap: [],
  exports: [
    CoreModule,
    AgGridModule,
    AddTransactionRendererComponent,
    DateEditorComponent,
    DateRendererComponent,
    SelectEditorComponent,
    AutocompleteEditorComponent,
    CurrencyRendererComponent,
    StatusRendererComponent,
    TotalSpendSaveComponent,
    TypeSummaryComponent,
    TemplateTransactionComponent
  ]
})
export class SharedModule { }
