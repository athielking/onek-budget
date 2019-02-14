import { Component, OnInit, EventEmitter, HostListener } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { TransactionType, DIGIT_0, DIGIT_9, isDigitKey, SPACE } from 'src/app/shared/constants';
import { CategoriesStore } from '../categories.store';
import { TransactionService } from '../transaction.service';
import { Transaction } from 'src/app/models/transaction.model';
import { TransactionStore } from '../transaction.store';

@Component({
  selector: 'okb-add-transaction-renderer',
  templateUrl: './add-transaction-renderer.component.html',
  styleUrls: ['./add-transaction-renderer.component.scss']
})
export class AddTransactionRendererComponent implements ICellRendererAngularComp, OnInit {

  public initialState: any;
  public form = new FormGroup({
    date: new FormControl(moment()),
    payee: new FormControl(''),
    amount: new FormControl(null,
    {
      updateOn: 'blur',
      validators: [Validators.required]
    }),
    type: new FormControl(TransactionType.Optional),
    majorcategory: new FormControl(''),
    subcategory: new FormControl('')
  });

  public transactionTypes: string[] = Object.keys(TransactionType);
  public subCategories: string[] = [];
  public minorMap: Map<string, string[]>;

  public params: any;

  private operators = ['.', '(', ')', '*', '-', '+', '/'];
  constructor(public categoriesStore: CategoriesStore,
              public transactionStore: TransactionStore) { }

  agInit(params: any): void {
    this.params = params;
  }

  ngOnInit() {
    this.initialState = this.form.value;

     // this.categoriesStore.minorCategories$.subscribe(m => this.minorMap = m);

    this.form.controls.majorcategory.valueChanges.subscribe( value => {
      this.categoriesStore.setMajorCategory(value);

      // if ( this.minorMap.has(value) ) {
      //   this.subCategories = this.minorMap.get(value);
      // }
    });

    this.form.controls.amount.valueChanges.subscribe( (value) => {

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

  @HostListener('dblclick', ['$event'])
  onDoubleClick(event) {
    event.stopPropagation();
    this.toggleTransactionForm(true);
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event) {
    event.stopPropagation();
  }

  onKeyPress(event) {
    const key = event.keyCode;

    if ( key ===  SPACE) {
      return;
    }

    if (!event.shiftKey && isDigitKey(key)) {
      return;
    }

    if (this.operators.findIndex( o => o === event.key) > 0 ) {
      return;
    }

    event.preventDefault();
  }

  refresh(): boolean {
    return false;
  }

  toggleTransactionForm(expanded: boolean) {
    this.params.context.parent.togglePinnedDiv(expanded);
  }

  onSubmit() {
    this.transactionStore.addTransaction(new Transaction(this.form.value));
    this.form.reset(this.initialState);
  }
}
