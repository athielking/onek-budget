import { Injectable } from '@angular/core';
import { Transaction } from '../models/transaction.model';
import { BehaviorSubject, Observable, forkJoin } from 'rxjs';
import { TransactionService } from './transaction.service';
import { map, filter } from 'rxjs/operators';
import { StorageService } from '../shared/storage.service';
import { StorageKeys, TransactionStatus } from '../shared/constants';
import * as moment from 'moment';
import { Moment } from 'moment';
import { strict } from 'assert';

@Injectable({
  providedIn: 'root'
})
export class TransactionStore {

  private _transactions: BehaviorSubject<Transaction[]> = new BehaviorSubject([]);
  public transactions$: Observable<Transaction[]>;

  private _changes: Map<string, any>;
  private _changeDebounce = 5000;
  private _changeTimer;

  constructor(private transactionService: TransactionService,
              private storageService: StorageService) {

    this._changes = new Map<string, any>();

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

  public queueChange(id: string, changes: any) {
    if (this._changeTimer) {
      clearTimeout(this._changeTimer);
    }

    this.setStatus(id, TransactionStatus.Pending);

    if (this._changes.has(id)) {
      const existing = this._changes.get(id);
      changes = Object.assign(existing, changes);
    }

    this._changes.set(id, changes);

    this._changeTimer = setTimeout(() => {
      forkJoin(Array.from(this._changes.entries()).map( kvp => this.transactionService.patchTransaction(kvp[0], kvp[1])))
      .subscribe(result => {
        this._changes.clear();
        clearTimeout(this._changeTimer);

        result.forEach( tran => this.setStatus(tran._id, TransactionStatus.Success ));
      });
    }, this._changeDebounce);
  }

  private setStatus(id: string, status: TransactionStatus) {
    const values = this._transactions.getValue();
    const transaction = values.find( t => t._id === id);

    transaction._status = status;

    this._transactions.next([...values]);
  }
}
