import { Component, OnInit, HostListener } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { FormGroup, FormControl } from '@angular/forms';
import { TransactionType, isDigitKey, SPACE } from 'src/app/shared/constants';
import { CategoriesStore } from './categories.store';

@Component({
  styleUrls: ['./add-record-renderer.component.scss']
})
export abstract class AddRecordRendererComponent implements ICellRendererAngularComp, OnInit {

  public initialState: any;
  public form: FormGroup;

  public transactionTypes: string[] = Object.keys(TransactionType);
  public subCategories: string[] = [];
  public minorMap: Map<string, string[]>;

  public params: any;

  private operators = ['.', '(', ')', '*', '-', '+', '/'];
  constructor(public categoriesStore: CategoriesStore) {
    this.form = this.initFormGroup();
  }

  agInit(params: any): void {
    this.params = params;
  }

  ngOnInit() {
    this.initialState = this.form.value;
  }

  @HostListener('dblclick', ['$event'])
  onDoubleClick(event) {
    event.stopPropagation();
    this.toggleTransactionForm(true);
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event) {
    event.stopPropagation();
  }

  refresh(): boolean {
    return false;
  }

  private toggleTransactionForm(expanded: boolean) {
    this.params.context.parent.togglePinnedDiv(expanded);
  }

  protected onKeyPress(event) {
    const key = event.keyCode;

    if ( key ===  SPACE) {
      return;
    }

    if (!event.shiftKey && isDigitKey(key)) {
      return;
    }

    if (this.operators.findIndex( o => o === event.key) >= 0 ) {
      return;
    }

    event.preventDefault();
  }

  protected subscribeCategoryChanges( formControl: FormControl) {
    formControl.valueChanges.subscribe( value => {
      this.categoriesStore.setMajorCategory(value);
    });
  }

  protected subscribeSimpleEvaluator(formControl: FormControl) {
    formControl.valueChanges.subscribe( (value) => {

      if (!value || typeof(value) === 'number') {
        return;
      }

      let result = 0;
      const match = value.match(/^(\d+(\.\d?\d?)?)( *[-\(\)\+\*\/]? *(\d+(\.\d?\d?)?))*$/);
      if ( match && match.length > 0) {
        result = eval(value);
        this.form.controls.amount.patchValue(result);
      }
    });
  }

  protected abstract initFormGroup(): FormGroup;
  protected abstract onSubmit();
}
