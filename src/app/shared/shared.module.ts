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

@NgModule({
  declarations: [
    AddTransactionRendererComponent,
    DateEditorComponent,
    DateRendererComponent,
    SelectEditorComponent,
    AutocompleteEditorComponent,
    CurrencyRendererComponent,
    StatusRendererComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    AgGridModule.withComponents([
      AddTransactionRendererComponent,
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
    StatusRendererComponent
  ]
})
export class SharedModule { }
