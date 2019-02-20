import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { TransactionStatus } from 'src/app/shared/constants';

@Component({
  selector: 'okb-status-renderer',
  template: `
  <div class="flex-column flex" style="height: 100%">
    <div class="flex-column flex flex-center alert"
      [ngClass]="statusClass"
      style="border: 0px; color: rgba(0,0,0,0); background: rgba(0,0,0,0)">
        <div class="alert-icon-wrapper">
          <clr-icon *ngIf="params.value === status.Success || !params.value" class="alert-icon" shape="check-circle"></clr-icon>
          <clr-icon *ngIf="params.value === status.Pending" class="alert-icon" shape="switch"></clr-icon>
          <clr-icon *ngIf="params.value === status.Error" class="alert-icon" shape="exclamation-circle"></clr-icon>
        </div>
    </div>
  </div>
  `
})
export class StatusRendererComponent implements ICellRendererAngularComp {

  public shape: string;
  public statusClass: string;

  public params: any;
  public style: string;

  public status = TransactionStatus;

  constructor() { }

  agInit(params: any): void {
    this.params = params;

    this.shape = 'check-circle';
    this.statusClass = 'alert-success';

    if (params.value === TransactionStatus.Pending) {
      this.shape = 'switch';
      this.statusClass = 'alert-info';
    }

    if (params.value === TransactionStatus.Error) {
      this.shape = 'exclamation-circle';
      this.statusClass = 'alert-error';
    }
  }

  refresh(): boolean {
    return false;
  }
}
