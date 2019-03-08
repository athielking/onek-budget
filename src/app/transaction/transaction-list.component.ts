import { Component, OnInit, ElementRef, Renderer2, HostBinding } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Transaction } from '../models/transaction.model';
import { TransactionType, StorageKeys } from '../shared/constants';
import { CategoriesStore } from '../shared/categories.store';
import { TransactionStore } from './transaction.store';
import { AgGridHelper } from '../shared/grid/ag-grid.helper';
import { StorageService } from '../shared/storage.service';

import * as moment from 'moment';
import { SummaryStore } from '../shared/summary.store';

@Component({
  selector: 'okb-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
})
export class TransactionListComponent implements OnInit {

  columnDefs = this.getGridView();
  frameworkComponents = AgGridHelper.getFrameworkComponents();

  rowData: Observable<Transaction[]>;
  newTransactionData: Transaction[] = [];
  context = { parent: this };

  private gridApi;
  private columnApi;

  @HostBinding('style.width') get width() { return '100%'; }

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
          colSpan: AgGridHelper.getColSpan,
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
          field: 'templateId',
          editable: false,
          width: 60,
          cellRenderer: 'statusRenderer',
          suppressKeyboardEvent: AgGridHelper.suppressKeyboardEvent
        },
    ];
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
