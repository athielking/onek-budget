import { Injectable } from '@angular/core';
import { Transaction } from '../models/transaction.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { TransactionService } from './transaction.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TransactionStore {

  private _transactions: BehaviorSubject<Transaction[]> = new BehaviorSubject([]);
  public transactions$: Observable<Transaction[]>;

  constructor(private transactionService: TransactionService) {
    this.transactions$ = this._transactions.asObservable().pipe(
      map(values => values.sort((a: Transaction, b: Transaction) => a.date > b.date ? -1 : a.date < b.date ? 1 : 0 )));
  }

  public getTransactions() {
    this.transactionService.getTransactions().subscribe( data => this._transactions.next(data) );
  }

  public addTransaction(transaction: Transaction) {
    let value = this._transactions.getValue();

    value = [...value, transaction];
    this._transactions.next(value);
  }
}
