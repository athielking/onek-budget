import { Component, OnInit, ViewChild, ElementRef, Renderer2, HostListener, QueryList, ViewChildren, AfterViewInit } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { Transaction } from '../models/transaction.model';
import { AddTransactionRendererComponent } from './grid/add-transaction-renderer.component';
import { ColSpanParams } from 'ag-grid-community';
import { TransactionService } from './transaction.service';
import { DateEditorComponent } from './grid/date-editor.component';
import { TransactionType, BACKSPACE, DELETE } from '../shared/constants';
import { SelectEditorComponent } from './grid/select-editor.component';
import { AutocompleteEditorComponent } from './grid/autocomplete-editor.component';
import { CategoriesStore } from './categories.store';
import { DateRendererComponent } from './grid/date-renderer.component';
import { CurrencyRendererComponent } from './grid/currency-renderer.component';
import { rendererTypeName } from '@angular/compiler';
import { TransactionStore } from './transaction.store';


@Component({
  selector: 'okb-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {

  columnDefs = this.getGridView();
  frameworkComponents = this.getFrameworkComponents();
  rowData: Observable<Transaction[]>;
  newTransactionData: Transaction[] = [];
  context = { parent: this };

  private gridApi;
  private columnApi;

  constructor(private transactionStore: TransactionStore,
              private categoriesStore: CategoriesStore,
              private domRef: ElementRef,
              private renderer: Renderer2) {}

  onGridReady(params) {

    this.gridApi = params.api;
    this.columnApi = params.columnApi;
  }
  ngOnInit() {

    this.newTransactionData = [
      new Transaction()
    ];

    this.rowData = this.transactionStore.transactions$;
    this.transactionStore.getTransactions();
    this.categoriesStore.loadCategories();
  }

  private getGridView() {
    return [
        {
          headerName: 'Date',
          field: 'date',
          editable: true,
          width: 120,
          colSpan: this.getColSpan,
          pinnedRowCellRenderer: 'addTransaction',
          cellEditor: 'dateEditor',
          cellRenderer: 'dateRenderer',
          suppressKeyboardEvent: this.suppressKeyboardEvent
        },
        {headerName: 'Paid To', field: 'payee', editable: true, width: 200, suppressKeyboardEvent: this.suppressKeyboardEvent},
        {
          headerName: 'Amount',
          field: 'amount',
          editable: true,
          width: 200,
          cellClassRules: {
            'rag-green' : 'x > 0',
            'rag-red' : 'x < 0'
          },
          cellRenderer: 'currencyRenderer',
          suppressKeyboardEvent: this.suppressKeyboardEvent
        },
        {
          headerName: 'Type',
          field: 'type',
          editable: true,
          width: 120,
          cellEditor: 'selectEditor',
          cellEditorParams: {
            valuesFn: (rowData) => of(Object.keys(TransactionType))
          },
          suppressKeyboardEvent: this.suppressKeyboardEvent
        },
        {
          headerName: 'Major Category',
          field: 'majorcategory',
          editable: true,
          width: 160,
          cellEditor: 'autocompleteEditor',
          cellEditorParams: {
            valuesFn: (rowData) => this.categoriesStore.majorCategories$,
            valueChanged: (value) => this.categoriesStore.setMajorCategory(value)
          },
          suppressKeyboardEvent: this.suppressKeyboardEvent
        },
        {
          headerName: 'Minor Category',
          field: 'subcategory',
          editable: true,
          width: 160,
          cellEditor: 'autocompleteEditor',
          cellEditorParams: {
            valuesFn: (rowData) => this.categoriesStore.minorCategory$
          },
          suppressKeyboardEvent: this.suppressKeyboardEvent
        },
    ];
  }

  private getFrameworkComponents() {
    return {
          addTransaction : AddTransactionRendererComponent,
          dateRenderer: DateRendererComponent,
          dateEditor: DateEditorComponent,
          selectEditor: SelectEditorComponent,
          autocompleteEditor: AutocompleteEditorComponent,
          currencyRenderer: CurrencyRendererComponent,
      };
  }

  private getColSpan(params: ColSpanParams): number {
    if (params.node.rowPinned === 'top') {
      return 6;
    }

    return 1;
  }

  public getRowHeight(params) {
    if (params.node.rowPinned) {
      return 0;
    }

    return 48;
  }

  public togglePinnedDiv(expanded: boolean) {
    const pinnedHeader = this.domRef.nativeElement.querySelectorAll('.ag-floating-top');
    if (expanded) {
      this.renderer.setStyle(pinnedHeader[0], 'height', '200px');
      this.renderer.setStyle(pinnedHeader[0], 'display', 'inherit');
    } else {
      this.renderer.setStyle(pinnedHeader[0], 'height', '0px');
    }

    const pinnedNode = this.gridApi.getPinnedTopRow(0);
    pinnedNode.setRowHeight(expanded ? 198 : 0);

    this.gridApi.onRowHeightChanged();
  }

  private suppressKeyboardEvent(params) {
    return params.event.keyCode === BACKSPACE ||
      params.event.keyCode === DELETE;
  }
}
