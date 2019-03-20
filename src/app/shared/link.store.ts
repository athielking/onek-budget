import { Injectable } from '@angular/core';
import { Transaction } from '../models/transaction.model';
import { Observable, combineLatest } from 'rxjs';
import { TemplateStore } from './template.store';
import { TransactionStore } from '../transaction/transaction.store';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LinkStore {

  public unMatched$: Observable<Transaction[]>;
  public loading$: Observable<boolean>;

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

  public loadTransactionsAndTemplates() {
    this.templateStore.getTemplates();
    this.transactionStore.getTransactions();
  }

  public addTransactionFromTemplate(temp: Transaction) {
    const newTran = new Transaction({
      templateId: temp._id,
      amount: temp.amount,
      category: temp.category,
      date: temp.date,
      payee: temp.payee,
      subcategory: temp.subcategory,
      type: temp.type
    });

    this.transactionStore.addTransaction(newTran);
  }

  public linkTransaction(id: string, tranId: string) {
    this.transactionStore.patchTransaction(tranId, {templateId: id});
  }

  public unlinkTransaction(tranId: string) {
    this.transactionStore.patchTransaction(tranId, {templateId: undefined});
  }
}
