import { Component, ViewChild, AfterViewChecked } from '@angular/core';
import { AgEditorComponent } from 'ag-grid-angular';
import { FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ColDef } from 'ag-grid-community';
import { KEY_DOWN, KEY_UP } from 'src/app/shared/constants';
import { Observable } from 'rxjs';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'okb-autocomplete-editor',
  template: `
  <div class="ag-theme-material ag-cell ag-cell-inline-editing ag-ltr ag-cell-focus">
    <mat-form-field style="width: 160px; bottom: 12px;">
      <input
        #textInput
        type="text"
        matInput
        [placeholder]="colDef.headerName"
        [formControl]="textControl"
        [matAutocomplete]="auto"
        (focus)="onFocus($event)"
        (keydown)="onKeyDown($event)"
      />
      <mat-autocomplete #auto="matAutocomplete">
        <mat-option *ngFor="let item of (items$ | async)" [value]="item">{{item}}</mat-option>
      </mat-autocomplete >
    </mat-form-field>
  </div>
  `
})
export class AutocompleteEditorComponent implements AgEditorComponent, AfterViewChecked {
  public items$: Observable<any>;

  private textControl = new FormControl('');
  private params: any;
  private colDef: ColDef;

  @ViewChild('textInput', {read: MatInput})
  private input: MatInput;

  agInit(params: any) {
    this.params = params;
    this.colDef = params.column.getColDef();
    this.items$ = params.valuesFn(params.node.data);
    this.textControl.setValue(params.value);

    this.textControl.valueChanges.subscribe( value => {
      if ( params.valueChanged ) {
        params.valueChanged(value);
      }
    });
  }

  ngAfterViewChecked() {
    setTimeout(() => {
      this.input.focus();
    });
  }

  getValue() {
    return this.textControl.value;
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

  onFocus(event) {
    event.target.select();
  }
}
