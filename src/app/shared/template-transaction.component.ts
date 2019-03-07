import { Component, OnInit, Input } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { Transaction } from '../models/transaction.model';
import { TransactionStore } from '../transaction/transaction.store';
import { TemplateStore } from '../template/template.store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'okb-template-transaction',
  templateUrl: './template-transaction.component.html'
})
export class TemplateTransactionComponent implements OnInit {

  @Input() summaryType: String;
  public unMatched$: Observable<Transaction[]>;
  public loading$: Observable<boolean>;

  public gainLoss = 0;

  constructor(private templateStore: TemplateStore,
              private transactionStore: TransactionStore) {

    this.loading$ = templateStore.templateTransactionsLoading$;
    this.unMatched$ = combineLatest(this.templateStore.templateTransactions$, this.transactionStore.transactions$)
    .pipe(map(result => {
      const temp = result[0];
      const trans = result[1];

      const unmatched: Transaction[] = [];
      temp.forEach( t => {
        if ( !trans.find( r => r.templateId === t._id) ) {
          unmatched.push(t);
        }
      });

      return unmatched;
    }));
  }

  ngOnInit() {
    this.templateStore.getTemplates();
    this.transactionStore.getTransactions();
  }

}
