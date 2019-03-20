import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp, AgEditorComponent, ICellEditorAngularComp } from 'ag-grid-angular';
import { TransactionStatus } from 'src/app/shared/constants';
import { TransactionStore } from 'src/app/transaction/transaction.store';
import { MatDialog } from '@angular/material';
import { DeletePromptComponent } from '../dialog/delete-prompt.component';
import { LinkComponent } from '../dialog/link.component';
import { LinkStore } from '../link.store';

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

  constructor(private transactionStore: TransactionStore,
              private linkStore: LinkStore,
              private dialog: MatDialog) { }

  agInit(params: any): void {
    this.params = params;
  }

  linkTransaction() {
    const ref = this.dialog.open(LinkComponent, {
      data: {tranId: this.params.node.data._id}
    });

    ref.afterClosed().subscribe( result => {
      if (!result) {
        return;
      }

      this.params.value = ref.componentInstance.selected;
    });
  }

  unlinkTransaction() {
    this.linkStore.unlinkTransaction(this.params.node.data._id);
    this.params.api.refreshCells({rowNodes: [this.params.node]});

    this.params.value = undefined;
  }

  deleteTransaction() {

    const ref = this.dialog.open(DeletePromptComponent, {
      data: {
        recordType: 'Transaction'
      }
    });

    ref.afterClosed().subscribe( result => {
      if (result) {
        this.transactionStore.deleteTransaction(this.params.node.data._id);
      }
    });
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
