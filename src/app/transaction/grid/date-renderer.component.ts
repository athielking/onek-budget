import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'okb-date-renderer',
  template: `
  <div>
    {{ params.value | date:'MM/dd/yyyy' }}
  </div>
  `
})
export class DateRendererComponent implements ICellRendererAngularComp {

  public params: any;
  public style: string;

  constructor() { }

  agInit(params: any): void {
    this.params = params;
  }

  refresh(): boolean {
    return false;
  }
}
