import { Component, ViewChild, AfterViewChecked } from '@angular/core';
import { AgEditorComponent } from 'ag-grid-angular';
import { ICellEditorParams } from 'ag-grid-community';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { Moment } from 'moment';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'okb-date-editor',
  template: `
  <div class="ag-theme-material ag-cell ag-cell-inline-editing ag-ltr ag-cell-focus">
    <mat-form-field style="width: 120px; bottom: 12px;">
      <input #dateInput matInput [formControl]="dateControl" [matDatepicker]="picker" (focus)="onFocus($event)" autofocus/>
      <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
      <mat-datepicker #picker></mat-datepicker>
    </mat-form-field>
  </div>
  `
})
export class DateEditorComponent implements AgEditorComponent, AfterViewChecked {

  private dateControl = new FormControl(null);
  private params: ICellEditorParams;

  @ViewChild('picker', {read: MatDatepicker})
  private picker: MatDatepicker<Moment>;

  @ViewChild('dateInput', {read: MatInput})
  private dateInput: MatInput;

  agInit(params: ICellEditorParams) {
    this.params = params;
    this.dateControl.setValue(params.value);
  }


  ngAfterViewChecked() {
    setTimeout(() => this.dateInput.focus());
  }

  getValue() {
    return this.dateControl.value;
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

  onFocus(event) {
    event.target.select();
  }
}
