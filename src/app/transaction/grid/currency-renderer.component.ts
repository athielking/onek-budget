import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'okb-date-renderer',
  template: `
  <div class="flex-row reverse">
    <div>{{ params.value | number:'1.2-2' }}<div>
  </div>
  `
})
export class CurrencyRendererComponent implements ICellRendererAngularComp {

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
