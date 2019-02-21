import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Transaction } from '../models/transaction.model';
import { ColSpanParams } from 'ag-grid-community';
import { TransactionType, BACKSPACE, DELETE } from '../shared/constants';
import { CategoriesStore } from './categories.store';
import { TransactionStore } from './transaction.store';
import { AgGridHelper } from '../shared/ag-grid.helper';

@Component({
  selector: 'okb-transaction-list',
  templateUrl: './transaction-list.component.html'
})
export class TransactionListComponent implements OnInit {

  columnDefs = this.getGridView();
  frameworkComponents = AgGridHelper.getFrameworkComponents();

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

  onCellValueChanged(params) {
    this.transactionStore.queueChange(params.data['_id'], {[params.colDef.field]: params.newValue});
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
          suppressKeyboardEvent: AgGridHelper.suppressKeyboardEvent
        },
        {headerName: 'Paid To', field: 'payee', editable: true, width: 200, suppressKeyboardEvent: AgGridHelper.suppressKeyboardEvent},
        {
          headerName: 'Amount',
          field: 'amount',
          editable: true,
          width: 200,
          cellClassRules: {
            'income-transaction' : 'x > 0',
            'spent-transaction' : 'x < 0'
          },
          cellRenderer: 'currencyRenderer',
          suppressKeyboardEvent: AgGridHelper.suppressKeyboardEvent
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
          suppressKeyboardEvent: AgGridHelper.suppressKeyboardEvent
        },
        {
          headerName: 'Major Category',
          field: 'category',
          editable: true,
          width: 160,
          cellEditor: 'autocompleteEditor',
          cellEditorParams: {
            valuesFn: (rowData) => this.categoriesStore.majorCategories$,
            valueChanged: (value) => this.categoriesStore.setMajorCategory(value)
          },
          suppressKeyboardEvent: AgGridHelper.suppressKeyboardEvent
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
          suppressKeyboardEvent: AgGridHelper.suppressKeyboardEvent
        },
        {
          field: 'status',
          editable: false,
          width: 60,
          cellRenderer: 'statusRenderer',
          suppressKeyboardEvent: AgGridHelper.suppressKeyboardEvent
        },
    ];
  }

  private getColSpan(params: ColSpanParams): number {
    if (params.node.rowPinned === 'top') {
      return 7;
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

}
