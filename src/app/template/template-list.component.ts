import { Component, OnInit, ElementRef, Renderer2, HostBinding } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Template } from '../models/template.model';
import { TransactionType } from '../shared/constants';
import { CategoriesStore } from '../shared/categories.store';
import { TemplateStore } from '../shared/template.store';
import { AgGridHelper } from '../shared/grid/ag-grid.helper';

@Component({
  selector: 'okb-template-list',
  templateUrl: './template-list.component.html'
})
export class TemplateListComponent implements OnInit {

  columnDefs = this.getGridView();
  frameworkComponents = AgGridHelper.getFrameworkComponents();

  rowData: Observable<Template[]>;
  newTransactionData: Template[] = [];
  context = { parent: this };

  private gridApi;
  private columnApi;

  @HostBinding('style.width') get width() { return '100%'; }

  constructor(private templateStore: TemplateStore,
              private categoriesStore: CategoriesStore,
              private domRef: ElementRef,
              private renderer: Renderer2) {}

  onGridReady(params) {

    this.gridApi = params.api;
    this.columnApi = params.columnApi;
  }

  onCellValueChanged(params) {
    this.templateStore.queueChange(params.data['_id'], {[params.colDef.field]: params.newValue});
  }

  ngOnInit() {

    this.newTransactionData = [
      new Template()
    ];

    this.rowData = this.templateStore.templates$;
    this.templateStore.getTemplates();
    this.categoriesStore.loadCategories();
  }

  private getGridView() {
    return [
        {
          headerName: 'Day of Month',
          field: 'day',
          editable: true,
          width: 145,
          colSpan: AgGridHelper.getColSpan,
          pinnedRowCellRenderer: 'addTemplate',
          suppressKeyboardEvent: AgGridHelper.suppressKeyboardEvent
        },
        {
          headerName: 'Recurs Every',
          field: 'recur',
          editable: true,
          width: 145,
          suppressKeyboardEvent: AgGridHelper.suppressKeyboardEvent
        },
        {
          headerName: 'Period',
          field: 'recurrencePeriod',
          editable: true,
          width: 135,
          cellEditor: 'selectEditor',
          cellEditorParams: {
            valuesFn: (rowData) => of(['months', 'weeks', 'days'])
          },
          suppressKeyboardEvent: AgGridHelper.suppressKeyboardEvent
        },
        {
          headerName: 'Paid To',
          field: 'payee',
          editable: true,
          width: 180,
          suppressKeyboardEvent: AgGridHelper.suppressKeyboardEvent},
        {
          headerName: 'Amount',
          field: 'amount',
          editable: true,
          width: 180,
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
        }
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
      this.renderer.setStyle(pinnedHeader[0], 'height', '220px');
      this.renderer.setStyle(pinnedHeader[0], 'display', 'inherit');
    } else {
      this.renderer.setStyle(pinnedHeader[0], 'height', '0px');
    }

    const pinnedNode = this.gridApi.getPinnedTopRow(0);
    pinnedNode.setRowHeight(expanded ? 218 : 0);

    this.gridApi.onRowHeightChanged();
  }

}
