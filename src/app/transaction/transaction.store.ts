import { Injectable } from '@angular/core';
import { Transaction } from '../models/transaction.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { TransactionService } from './transaction.service';
import { map, filter } from 'rxjs/operators';
import { StorageService } from '../shared/storage.service';
import { StorageKeys } from '../shared/constants';
import * as moment from 'moment';
import { Moment } from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TransactionStore {

  private _transactions: BehaviorSubject<Transaction[]> = new BehaviorSubject([]);
  public transactions$: Observable<Transaction[]>;

  constructor(private transactionService: TransactionService,
              private storageService: StorageService) {

    this.transactions$ = this._transactions.asObservable().pipe(
      map(values => values.sort((a: Transaction, b: Transaction) => a.date > b.date ? -1 : a.date < b.date ? 1 : 0 )));

    this.storageService.itemChanged.pipe(
      filter(key => key === StorageKeys.viewDate),
      map(key => moment(storageService.getItem(key, true)))
    ).subscribe( date => this.getTransactions(date));
  }

  public getTransactions(viewDate?: Moment) {
    if (!viewDate) {
      viewDate = moment();
    }

    this.transactionService.getTransactions(viewDate).subscribe( data => this._transactions.next(data) );
  }

  public addTransaction(transaction: Transaction) {
    const values = this._transactions.getValue();

    this._transactions.next([...values, transaction]);

    this.transactionService.addTransaction(transaction).subscribe( (result: any) => {
      transaction._id = result['_id'];
      this._transactions.next([...values, transaction]);
    });
  }
}
