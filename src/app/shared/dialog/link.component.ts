import { Component, OnInit, Inject } from '@angular/core';
import { LinkStore } from '../link.store';
import { Observable } from 'rxjs';
import { Transaction } from 'src/app/models/transaction.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'okb-link',
  templateUrl: './link.component.html',
  styles: []
})
export class LinkComponent {

  public unMatched$: Observable<Transaction[]>;
  public selected: string;

  private tranId: string;

  constructor(private linkStore: LinkStore,
              private dialogRef: MatDialogRef<LinkComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any) {
    this.unMatched$ = this.linkStore.unMatched$;

    if (this.data) {
      this.tranId = this.data.tranId ? this.data.tranId : undefined;
    }
  }

  public linkSelected() {
    this.linkStore.linkTransaction(this.selected, this.tranId);
  }
}
