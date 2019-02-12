import { Component, ViewChild, AfterViewChecked } from '@angular/core';
import { AgEditorComponent } from 'ag-grid-angular';
import { FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ColDef } from 'ag-grid-community';
import { KEY_DOWN, KEY_UP } from 'src/app/shared/constants';
import { Observable } from 'rxjs';

@Component({
  selector: 'okb-select-editor',
  template: `
  <div class="ag-theme-material ag-cell ag-cell-inline-editing ag-ltr ag-cell-focus">
    <mat-form-field style="width: 120px; bottom: 12px;">
      <mat-select #select [placeholder]="colDef.headerName" [formControl]="selectControl" (keydown)="onKeyDown($event)" >
        <mat-option *ngFor="let item of (items$ | async)" [value]="item">{{item}}</mat-option>
      </mat-select>
    </mat-form-field>
  </div>
  `
})
export class SelectEditorComponent implements AgEditorComponent, AfterViewChecked {
  public items$: Observable<string[]>;

  private selectControl = new FormControl('');
  private params: any;
  private colDef: ColDef;

  @ViewChild('select', {read: MatSelect})
  private select: MatSelect;

  agInit(params: any) {
    this.params = params;
    this.colDef = params.column.getColDef();
    this.items$ = params.valuesFn(params.node.data);
    this.selectControl.setValue(params.value);
  }

  ngAfterViewChecked() {
    setTimeout(() => {
      this.select.focus();
    });
  }

  getValue() {
    return this.selectControl.value;
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

  onKeyDown(event) {
    const keyCode = event.keyCode;

    if ( keyCode === KEY_DOWN || keyCode === KEY_UP) {
      event.stopPropagation();
    }
  }
}
