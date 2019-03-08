import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { TransactionType} from 'src/app/shared/constants';
import { CategoriesStore } from '../categories.store';
import { Transaction } from 'src/app/models/transaction.model';
import { TransactionStore } from '../../transaction/transaction.store';
import { AddRecordRendererComponent } from './add-record-renderer.component';

@Component({
  selector: 'okb-add-transaction-renderer',
  templateUrl: './add-transaction-renderer.component.html',
  styleUrls: ['./add-record-renderer.component.scss']
})
export class AddTransactionRendererComponent extends AddRecordRendererComponent implements OnInit {

  constructor(public categoriesStore: CategoriesStore,
              public transactionStore: TransactionStore) {
    super(categoriesStore);
  }

  ngOnInit() {
    super.ngOnInit();

    this.subscribeCategoryChanges(<FormControl>this.form.controls.category);
    this.subscribeSimpleEvaluator(<FormControl>this.form.controls.amount);
  }

  onSubmit() {
    const tran = new Transaction(this.form.value);
    tran.amount = Math.abs(tran.amount);

    if ( tran.type !== TransactionType.Income) {
      tran.amount *= -1;
    }

    this.transactionStore.addTransaction(tran);
    this.form.reset(this.initialState);
  }

  initFormGroup() {
    return new FormGroup({
      date: new FormControl(moment()),
      payee: new FormControl(''),
      amount: new FormControl(null,
      {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      type: new FormControl(TransactionType.Optional),
      category: new FormControl(''),
      subcategory: new FormControl('')
    });
  }
}
