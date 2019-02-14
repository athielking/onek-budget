import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, shareReplay, filter } from 'rxjs/operators';
import { Transaction } from '../models/transaction.model';
import { TransactionType } from '../shared/constants';
import * as moment from 'moment';
import { Moment } from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private serviceUri = 'https://api.myjson.com/bins/za91w';
  constructor(private httpClient: HttpClient) { }

  public getTransactions( viewDate: Moment ) {
    return this.httpClient.get(this.serviceUri).pipe(
      map( (data: Object[]) => data.map( el => new Transaction({
        account: el['account'],
        amount: +el['amount'],
         date: moment(el['date'], 'MM/DD/YYYY'),
        description: el['description'],
        id: el['id'],
        majorcategory: el['majorcategory'],
        subcategory: el['subcategory'],
        payee: el['payee'],
        type: <TransactionType>el['type']
      })).filter( trans => trans.date.month === viewDate.month))
    );
  }

  public addTransaction(transaction: Transaction) {
    return this.httpClient.post(this.serviceUri, transaction).pipe(shareReplay());
  }
}
