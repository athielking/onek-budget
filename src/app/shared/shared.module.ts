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
import { RouterModule } from '@angular/router';
import { TemplateStore } from './template.store';
import { TemplateService } from 'ag-grid-community';
import { DeletePromptComponent } from './dialog/delete-prompt.component';
import { LinkComponent } from './dialog/link.component';
import { LinkStore } from './link.store';

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
    DeletePromptComponent,
    LinkComponent
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
  providers: [StorageService, CategoriesService, CategoriesStore, TemplateStore, TemplateService, LinkStore],
  entryComponents: [DeletePromptComponent, LinkComponent],
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
  ]
})
export class SharedModule { }
