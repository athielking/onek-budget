import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp, AgEditorComponent, ICellEditorAngularComp } from 'ag-grid-angular';
import { TransactionStatus } from 'src/app/shared/constants';
import { TransactionStore } from 'src/app/transaction/transaction.store';

@Component({
  selector: 'okb-status-renderer',
  templateUrl: './status-renderer.component.html'
})
export class StatusRendererComponent implements ICellRendererAngularComp, ICellEditorAngularComp {

  public shape: string;
  public statusClass: string;

  public params: any;
  public style: string;

  public status = TransactionStatus;

  constructor(private transactionStore: TransactionStore) { }

  agInit(params: any): void {
    this.params = params;
  }

  linkTransaction() {
  }

  unlinkTransaction() {

  }

  deleteTransaction() {
    console.log(this.params.node.data);
  }

  refresh(): boolean {
    return false;
  }

  getValue() {
    return this.params.value;
  }

  isPopup() {
    return true;
  }

  isCancelBeforeStart() {
    return false;
  }

  isCancelAfterEnd() {
    return false;
  }
}
