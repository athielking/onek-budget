import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';

import { CoreModule } from '../core/core.module';
import { StorageService } from './storage.service';
import { AddTransactionRendererComponent } from './grid/add-transaction-renderer.component';
import { DateEditorComponent } from './grid/date-editor.component';
import { SelectEditorComponent } from './grid/select-editor.component';
import { AutocompleteEditorComponent } from './grid/autocomplete-editor.component';
import { DateRendererComponent } from './grid/date-renderer.component';
import { CurrencyRendererComponent } from './grid/currency-renderer.component';
import { StatusRendererComponent } from './grid/status-renderer.component';
import { CategoriesStore } from './categories.store';
import { CategoriesService } from './categories.service';
import { AddTemplateRendererComponent } from './grid/add-template-renderer.component';
import { TotalSpendSaveComponent } from './total-spend-save.component';
import { TypeSummaryComponent } from './type-summary.component';
import { TemplateTransactionComponent } from './template-transaction.component';
import { RouterModule } from '@angular/router';
import { TemplateStore } from './template.store';
import { TemplateService } from 'ag-grid-community';
import { SummaryStore } from './summary.store';
import { SummaryService } from './summary.service';

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
  providers: [StorageService, CategoriesService, CategoriesStore, TemplateStore, TemplateService, SummaryStore, SummaryService],
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
